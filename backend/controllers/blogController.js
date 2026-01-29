import { validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
export const getBlogPosts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  // Build query
  let query = { published: true };

  // Filter by category if provided
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Filter by tag if provided
  if (req.query.tag) {
    query.tags = { $in: [req.query.tag] };
  }

  // Search by title or content
  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { content: { $regex: req.query.search, $options: 'i' } },
      { excerpt: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  // Execute query
  const posts = await BlogPost.find(query)
    .populate('author', 'email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(startIndex);

  // Get total count for pagination
  const total = await BlogPost.countDocuments(query);

  // Pagination info
  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalPosts: total,
    hasNext: page * limit < total,
    hasPrev: page > 1
  };

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    data: posts
  });
});

// @desc    Get single blog post
// @route   GET /api/blog/:slug
// @access  Public
export const getBlogPost = asyncHandler(async (req, res, next) => {
  const post = await BlogPost.findOne({
    slug: req.params.slug,
    published: true
  }).populate('author', 'email');

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // Increment view count
  post.views += 1;
  await post.save();

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private (Admin)
export const createBlogPost = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400));
  }

  // Add author to req.body
  req.body.author = req.user.id;

  // Create slug from title
  if (req.body.title && !req.body.slug) {
    req.body.slug = req.body.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  const post = await BlogPost.create(req.body);

  res.status(201).json({
    success: true,
    data: post
  });
});

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private (Admin)
export const updateBlogPost = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400));
  }

  let post = await BlogPost.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // Make sure user is post owner or admin
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to update this post', 401));
  }

  // Update slug if title changed
  if (req.body.title && req.body.title !== post.title) {
    req.body.slug = req.body.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private (Admin)
export const deleteBlogPost = asyncHandler(async (req, res, next) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // Make sure user is post owner or admin
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to delete this post', 401));
  }

  await BlogPost.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get blog posts by tag
// @route   GET /api/blog/tag/:tag
// @access  Public
export const getBlogPostsByTag = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const posts = await BlogPost.find({
    tags: { $in: [req.params.tag] },
    published: true
  })
    .populate('author', 'email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(startIndex);

  const total = await BlogPost.countDocuments({
    tags: { $in: [req.params.tag] },
    published: true
  });

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalPosts: total,
    hasNext: page * limit < total,
    hasPrev: page > 1
  };

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    data: posts
  });
});

// @desc    Get blog posts by category
// @route   GET /api/blog/category/:category
// @access  Public
export const getBlogPostsByCategory = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const posts = await BlogPost.find({
    category: req.params.category,
    published: true
  })
    .populate('author', 'email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(startIndex);

  const total = await BlogPost.countDocuments({
    category: req.params.category,
    published: true
  });

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalPosts: total,
    hasNext: page * limit < total,
    hasPrev: page > 1
  };

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    data: posts
  });
});
