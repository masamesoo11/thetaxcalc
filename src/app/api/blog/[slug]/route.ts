import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlugIncludingDraft, updatePost, deletePost } from '@/lib/blog-db';

export const runtime = 'edge';

// GET /api/blog/[slug] — get a single post (including drafts for admin)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlugIncludingDraft(slug);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT /api/blog/[slug] — update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const updated = await updatePost(slug, body);
    if (!updated) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/blog/[slug] — delete a post
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const deleted = await deletePost(slug);

    if (!deleted) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
