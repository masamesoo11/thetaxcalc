import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/ads/[id]
 * Return a single ad slot by ID.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ad = await db.adSlot.findUnique({ where: { id } });

    if (!ad) {
      return NextResponse.json(
        { error: 'Ad slot not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(ad);
  } catch (error) {
    console.error('Error fetching ad slot:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ad slot' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/ads/[id]
 * Update an ad slot by ID.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if ad slot exists
    const existing = await db.adSlot.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Ad slot not found' },
        { status: 404 }
      );
    }

    // If updating position, check uniqueness
    if (body.position && body.position !== existing.position) {
      const positionExists = await db.adSlot.findUnique({ where: { position: body.position } });
      if (positionExists) {
        return NextResponse.json(
          { error: `An ad slot with position "${body.position}" already exists` },
          { status: 400 }
        );
      }
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    const allowedFields = ['name', 'position', 'adType', 'adCode', 'isActive'];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const updated = await db.adSlot.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating ad slot:', error);
    return NextResponse.json(
      { error: 'Failed to update ad slot' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/ads/[id]
 * Increment impressions or clicks for an ad slot.
 * Body: { field: "impressions" | "clicks", increment?: number }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { field, increment } = body;

    // Validate field
    if (field !== 'impressions' && field !== 'clicks') {
      return NextResponse.json(
        { error: 'Field must be "impressions" or "clicks"' },
        { status: 400 }
      );
    }

    // Check if ad slot exists
    const existing = await db.adSlot.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Ad slot not found' },
        { status: 404 }
      );
    }

    const incrementBy = typeof increment === 'number' && increment > 0 ? increment : 1;

    const updated = await db.adSlot.update({
      where: { id },
      data: {
        [field]: { increment: incrementBy },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating ad slot metrics:', error);
    return NextResponse.json(
      { error: 'Failed to update ad slot metrics' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ads/[id]
 * Delete an ad slot by ID.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if ad slot exists
    const existing = await db.adSlot.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Ad slot not found' },
        { status: 404 }
      );
    }

    await db.adSlot.delete({ where: { id } });

    return NextResponse.json({ message: 'Ad slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting ad slot:', error);
    return NextResponse.json(
      { error: 'Failed to delete ad slot' },
      { status: 500 }
    );
  }
}
