import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/links
 * List all external links.
 * Query params:
 *   - category=xxx: filter by category
 *   - active=true: return only active links
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const activeOnly = searchParams.get('active') === 'true';

    const where: Record<string, unknown> = {};
    if (category) {
      where.category = category;
    }
    if (activeOnly) {
      where.isActive = true;
    }

    const links = await db.externalLink.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching external links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch external links' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/links
 * Create a new external link.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, url, category, isActive, sortOrder } = body;

    // Validate required fields
    if (!label || !url) {
      return NextResponse.json(
        { error: 'Label and URL are required' },
        { status: 400 }
      );
    }

    const link = await db.externalLink.create({
      data: {
        label,
        url,
        category: category || 'resource',
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error('Error creating external link:', error);
    return NextResponse.json(
      { error: 'Failed to create external link' },
      { status: 500 }
    );
  }
}
