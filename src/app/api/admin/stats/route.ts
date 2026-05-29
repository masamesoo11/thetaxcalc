import { NextResponse } from 'next/server';
import { getPublishedPostsMeta, type BlogPostMeta } from '@/lib/blog-index';
import { BLOG_CONTENT } from '@/lib/blog-content';

export const runtime = 'edge';

/**
 * GET /api/admin/stats
 * Return admin dashboard statistics.
 * Uses static blog-index data (no database required).
 */

/** Convert BlogPostMeta to BlogPost with embedded content */
function metaToPostWithContent(meta: BlogPostMeta) {
  const content = BLOG_CONTENT[meta.slug] || '';
  return { ...meta, content };
}

export async function GET() {
  try {
    const metas = getPublishedPostsMeta();
    const posts = metas.map(metaToPostWithContent);

    return NextResponse.json({
      totalPosts: metas.length,
      publishedPosts: metas.length,
      totalAds: 0,
      activeAds: 0,
      totalCalculations: 0,
      recentPosts: posts.slice(0, 5).map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        published: p.published,
        createdAt: p.createdAt,
      })),
      topCalculators: [],
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}
