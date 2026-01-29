import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { blogSchema } from '@/lib/validations';

// GET /api/blog/[slug] - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();

    const post = await Blog.findOne({
      slug: slug,
      published: true
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });

  } catch (error) {
    console.error('Blog GET single error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[slug] - Update blog post (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // Check authentication
    const token = getTokenFromHeader(request.headers.get('authorization') || '');
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();

    const body = await request.json();

    // Validate input
    const validationResult = blogSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { title, slug: newSlug, excerpt, content, tags, published } = validationResult.data;

    // Check if new slug already exists (if changed)
    if (newSlug !== slug) {
      const existingPost = await Blog.findOne({ slug: newSlug });
      if (existingPost) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    // Find existing post first to get publishedAt
    const existingPost = await Blog.findOne({ slug: slug });

    // Update blog post
    const updatedPost = await Blog.findOneAndUpdate(
      { slug: slug },
      {
        title,
        slug: newSlug,
        excerpt,
        content,
        tags: tags || [],
        published,
        publishedAt: published && !existingPost?.publishedAt ? new Date() : existingPost?.publishedAt,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedPost
    });

  } catch (error) {
    console.error('Blog PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[slug] - Delete blog post (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // Check authentication
    const token = getTokenFromHeader(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();

    const deletedPost = await Blog.findOneAndDelete({ slug: slug });

    if (!deletedPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });

  } catch (error) {
    console.error('Blog DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
