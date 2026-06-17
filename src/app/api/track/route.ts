import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
export const runtime = 'edge';



/**
 * POST /api/track
 * Track calculator usage.
 * Body: { calculator: string }
 * Upserts CalculatorUsage record, incrementing the count for today's date.
 */
export async function POST(request: NextRequest) {
  try {
    // ─── Rate limiting: 30 requests per minute per IP ──────────────
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(`track:${ip}`, { limit: 30, windowMs: 60_000 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const { db } = await import('@/lib/db');
    const body = await request.json();
    const { calculator } = body;

    if (!calculator || typeof calculator !== 'string') {
      return NextResponse.json(
        { error: 'Calculator name is required' },
        { status: 400 }
      );
    }

    // Get today's date as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Upsert: create or increment count
    const usage = await db.calculatorUsage.upsert({
      where: {
        calculator_date: {
          calculator,
          date: today,
        },
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        calculator,
        date: today,
        count: 1,
      },
    });

    return NextResponse.json(usage);
  } catch (error) {
    console.error('Error tracking calculator usage:', error);
    return NextResponse.json(
      { error: 'Failed to track calculator usage' },
      { status: 500 }
    );
  }
}
