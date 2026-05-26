import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/links/[id]
 * Return a single external link by ID.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const link = await db.externalLink.findUnique({ where: { id } });

    if (!link) {
      return NextResponse.json(
        { error: 'External link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(link);
  } catch (error) {
    console.error('Error fetching external link:', error);
    return NextResponse.json(
      { error: 'Failed to fetch external link' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/links/[id]
 * Update an external link by ID.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if link exists
    const existing = await db.externalLink.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'External link not found' },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    const allowedFields = ['label', 'url', 'category', 'isActive', 'sortOrder'];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const updated = await db.externalLink.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating external link:', error);
    return NextResponse.json(
      { error: 'Failed to update external link' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/links/[id]
 * Delete an external link by ID.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if link exists
    const existing = await db.externalLink.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'External link not found' },
        { status: 404 }
      );
    }

    await db.externalLink.delete({ where: { id } });

    return NextResponse.json({ message: 'External link deleted successfully' });
  } catch (error) {
    console.error('Error deleting external link:', error);
    return NextResponse.json(
      { error: 'Failed to delete external link' },
      { status: 500 }
    );
  }
}
