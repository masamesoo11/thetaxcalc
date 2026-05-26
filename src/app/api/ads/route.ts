import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/ads
 * List all ad slots.
 * Query params:
 *   - active=true: return only active ad slots
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const where: Record<string, unknown> = {};
    if (activeOnly) {
      where.isActive = true;
    }

    const ads = await db.adSlot.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(ads);
  } catch (error) {
    console.error('Error fetching ad slots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ad slots' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ads
 * Create a new ad slot.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, adType, adCode, isActive } = body;

    // Validate required fields
    if (!name || !position) {
      return NextResponse.json(
        { error: 'Name and position are required' },
        { status: 400 }
      );
    }

    // Check for position uniqueness
    const existing = await db.adSlot.findUnique({ where: { position } });
    if (existing) {
      return NextResponse.json(
        { error: `An ad slot with position "${position}" already exists` },
        { status: 400 }
      );
    }

    const ad = await db.adSlot.create({
      data: {
        name,
        position,
        adType: adType || 'adsense',
        adCode: adCode || '',
        isActive: isActive ?? false,
      },
    });

    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error('Error creating ad slot:', error);
    return NextResponse.json(
      { error: 'Failed to create ad slot' },
      { status: 500 }
    );
  }
}
