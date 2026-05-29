import { NextResponse } from 'next/server';
import { getBlogStats } from '@/lib/blog-db';

export const runtime = 'edge';

// API routes use Edge runtime for Cloudflare Pages compatibility

/**
 * GET /api/admin/stats
 * Return admin dashboard statistics.
 * Uses Turso database for blog data, with JSON fallback for local dev.
 */
export async function GET() {
  try {
    const stats = await getBlogStats();

    return NextResponse.json({
      totalPosts: stats.totalPosts,
      publishedPosts: stats.publishedPosts,
      totalAds: 0,
      activeAds: 0,
      totalCalculations: 0,
      recentPosts: stats.recentPosts.map((p) => ({
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
