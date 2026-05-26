import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/admin/stats
 * Return admin dashboard statistics including:
 * - totalPosts, publishedPosts
 * - totalAds, activeAds
 * - totalCalculations
 * - recentPosts (last 5)
 * - topCalculators
 */
export async function GET() {
  try {
    // Run all count queries in parallel for performance
    const [
      totalPosts,
      publishedPosts,
      totalAds,
      activeAds,
      recentPosts,
      topCalculators,
      totalCalculationsResult,
    ] = await Promise.all([
      db.post.count(),
      db.post.count({ where: { published: true } }),
      db.adSlot.count(),
      db.adSlot.count({ where: { isActive: true } }),
      db.post.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          published: true,
          createdAt: true,
        },
      }),
      // Get top calculators by total usage count
      db.calculatorUsage.groupBy({
        by: ['calculator'],
        _sum: { count: true },
        orderBy: { _sum: { count: 'desc' } },
        take: 10,
      }),
      // Get total calculation count
      db.calculatorUsage.aggregate({
        _sum: { count: true },
      }),
    ]);

    const totalCalculations = totalCalculationsResult._sum.count || 0;

    // Format top calculators for cleaner response
    const formattedTopCalculators = topCalculators.map((item) => ({
      calculator: item.calculator,
      totalUsage: item._sum.count || 0,
    }));

    return NextResponse.json({
      totalPosts,
      publishedPosts,
      totalAds,
      activeAds,
      totalCalculations,
      recentPosts,
      topCalculators: formattedTopCalculators,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}
