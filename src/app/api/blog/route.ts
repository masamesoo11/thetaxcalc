import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/blog
 * List blog posts with optional filters.
 * Query params:
 *   - published=true (default): return only published posts
 *   - all=true: return all posts (for admin)
 *   - category=xxx: filter by category
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';
    const category = searchParams.get('category');

    // Build where clause
    const where: Record<string, unknown> = {};

    // If not requesting all, default to published only
    if (!all) {
      where.published = true;
    }

    // Optional category filter
    if (category) {
      where.category = category;
    }

    const posts = await db.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        tags: true,
        coverImage: true,
        published: true,
        featured: true,
        authorId: true,
        metaTitle: true,
        metaDesc: true,
        createdAt: true,
        updatedAt: true,
        // Omit content for list view to reduce payload
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blog
 * Create a new blog post.
 * Auto-generates slug from title if not provided.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, category, tags, coverImage, published, featured, authorId, metaTitle, metaDesc } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Auto-generate slug from title if not provided
    const generatedSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check for slug uniqueness
    const existing = await db.post.findUnique({ where: { slug: generatedSlug } });
    if (existing) {
      return NextResponse.json(
        { error: `A post with slug "${generatedSlug}" already exists` },
        { status: 400 }
      );
    }

    const post = await db.post.create({
      data: {
        title,
        slug: generatedSlug,
        excerpt: excerpt || null,
        content,
        category: category || 'tax-guide',
        tags: tags || '',
        coverImage: coverImage || null,
        published: published ?? false,
        featured: featured ?? false,
        authorId: authorId || null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
