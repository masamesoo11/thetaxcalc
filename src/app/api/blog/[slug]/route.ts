import { NextRequest, NextResponse } from 'next/server';
import { getPostMeta, type BlogPost, type BlogPostMeta } from '@/lib/blog-index';
import { BLOG_CONTENT } from '@/lib/blog-content';

export const runtime = 'edge';

/** Convert BlogPostMeta to BlogPost with embedded content */
function metaToPostWithContent(meta: BlogPostMeta): BlogPost {
  const content = BLOG_CONTENT[meta.slug] || '';
  return { ...meta, content };
}

// GET /api/blog/[slug] — get a single post (including drafts for admin)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const meta = getPostMeta(slug);
    if (!meta) {
      // Also check unpublished (BLOG_INDEX has all posts)
      const { BLOG_INDEX } = await import('@/lib/blog-index');
      const unpublished = BLOG_INDEX.find(p => p.slug === slug);
      if (!unpublished) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post: metaToPostWithContent(unpublished) });
    }
    return NextResponse.json({ post: metaToPostWithContent(meta) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT /api/blog/[slug] — update a post (NOT SUPPORTED in static mode)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // Verify post exists
    const meta = getPostMeta(slug);
    if (!meta) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Cannot update post: running in static mode (no database). Blog content is managed through code deploys.' },
      { status: 501 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/blog/[slug] — delete a post (NOT SUPPORTED in static mode)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const meta = getPostMeta(slug);
    if (!meta) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Cannot delete post: running in static mode (no database). Blog content is managed through code deploys.' },
      { status: 501 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
