import express from 'express';
import { body } from 'express-validator';
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostsByTag,
  getBlogPostsByCategory
} from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const createBlogPostValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters'),
  body('category')
    .isIn(['frontend', 'backend', 'devops', 'mobile', 'tutorial', 'opinion', 'news'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Tags must be an array with maximum 10 items'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Each tag must be between 2 and 30 characters'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean')
];

const updateBlogPostValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters'),
  body('category')
    .optional()
    .isIn(['frontend', 'backend', 'devops', 'mobile', 'tutorial', 'opinion', 'news'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Tags must be an array with maximum 10 items'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Each tag must be between 2 and 30 characters'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean')
];

// Public routes
router.get('/', getBlogPosts);
router.get('/tag/:tag', getBlogPostsByTag);
router.get('/category/:category', getBlogPostsByCategory);
router.get('/:slug', getBlogPost);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), createBlogPostValidation, createBlogPost);
router.put('/:id', protect, authorize('admin'), updateBlogPostValidation, updateBlogPost);
router.delete('/:id', protect, authorize('admin'), deleteBlogPost);

export default router;
