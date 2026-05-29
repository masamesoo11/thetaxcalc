import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getAllPostsIncludingDrafts, createPost } from '@/lib/blog-db';

export const runtime = 'edge';

// GET /api/blog — list all posts
// ?all=true — include drafts (for admin panel)
export async function GET(request: NextRequest) {
  try {
    const all = request.nextUrl.searchParams.get('all') === 'true';
    const posts = all ? await getAllPostsIncludingDrafts() : await getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST /api/blog — create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, category, tags, metaTitle, metaDesc, featured } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'title, slug, and content are required' }, { status: 400 });
    }

    const post = {
      id: crypto.randomUUID(),
      title,
      slug,
      excerpt: excerpt || '',
      content,
      category: category || 'tax-guide',
      tags: tags || '',
      coverImage: '',
      published: true,
      featured: featured || false,
      metaTitle: metaTitle || '',
      metaDesc: metaDesc || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const created = await createPost(post);
    return NextResponse.json({ post: created }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
