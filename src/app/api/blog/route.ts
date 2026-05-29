import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPostsMeta, getPostMeta, type BlogPost, type BlogPostMeta } from '@/lib/blog-index';
import { BLOG_CONTENT } from '@/lib/blog-content';

export const runtime = 'edge';

/** Convert BlogPostMeta to BlogPost with embedded content */
function metaToPostWithContent(meta: BlogPostMeta): BlogPost {
  const content = BLOG_CONTENT[meta.slug] || '';
  return { ...meta, content };
}

// GET /api/blog — list all posts
// ?all=true — include drafts (for admin panel) — in static mode, same as published
export async function GET(request: NextRequest) {
  try {
    const all = request.nextUrl.searchParams.get('all') === 'true';
    const metas = getPublishedPostsMeta();
    const posts = metas.map(metaToPostWithContent);
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST /api/blog — create a new post (NOT SUPPORTED in static mode)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'title, slug, and content are required' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Cannot create post: running in static mode (no database). Blog content is managed through code deploys.' },
      { status: 501 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
