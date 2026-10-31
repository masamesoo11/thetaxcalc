/**
 * Contact API Route
 * POST /api/contact — public contact form submission.
 *   Anti-spam: honeypot field ("website") + per-IP rate limit (5/hour).
 *   Delivery: stored in-memory (see @/lib/contact-store) AND forwarded to
 *   CONTACT_WEBHOOK_URL when that env var is configured (persistent channel).
 * GET  /api/contact — admin-only inbox (latest messages, JSON).
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  addContactMessage,
  listContactMessages,
  contactMessageCount,
  type ContactMessageRecord,
} from '@/lib/contact-store';
import { verifySessionToken, getCookieName } from '@/lib/auth';

// ─── Validation constants ───────────────────────────────────────────────────

const TOPICS = [
  'general',
  'data-correction',
  'advertising',
  'privacy',
  'feedback',
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ─── Rate limiting (in-memory, per IP) ──────────────────────────────────────

const RATE_LIMIT = 5; // submissions
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (window.length >= RATE_LIMIT) {
    hits.set(ip, window);
    return true;
  }
  window.push(now);
  hits.set(ip, window);
  return false;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function makeId(): string {
  return `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

async function forwardToWebhook(record: ContactMessageRecord): Promise<boolean> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact',
        ...record,
      }),
      signal: AbortSignal.timeout(3000),
    });
    return res.ok;
  } catch {
    // Webhook failures never block the user-facing success path.
    return false;
  }
}

// ─── POST: public submission ────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const ip =
      request.headers.get('cf-connecting-ip') ??
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { name, email, topic, message, website } = body as Record<string, unknown>;

    // Honeypot: bots fill hidden fields. Pretend success, store nothing.
    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // ─── Validation ───
    const errors: string[] = [];
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      errors.push('Please provide your name (2-100 characters).');
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 254) {
      errors.push('Please provide a valid email address.');
    }
    if (typeof topic !== 'string' || !TOPICS.includes(topic as (typeof TOPICS)[number])) {
      errors.push('Please choose a topic.');
    }
    if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000) {
      errors.push('Your message should be between 10 and 5,000 characters.');
    }
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(' ') }, { status: 400 });
    }

    const record: ContactMessageRecord = {
      id: makeId(),
      name: (name as string).trim().slice(0, 100),
      email: (email as string).trim().slice(0, 254),
      topic: topic as string,
      message: (message as string).trim().slice(0, 5000),
      createdAt: new Date().toISOString(),
    };

    addContactMessage(record);
    void forwardToWebhook(record); // fire-and-forget: never blocks the response

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}

// ─── GET: admin inbox ───────────────────────────────────────────────────────

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(getCookieName())?.value;
  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
  }

  const limitParam = request.nextUrl.searchParams.get('limit');
  const limit = Math.min(Math.max(parseInt(limitParam ?? '100', 10) || 100, 1), 200);

  return NextResponse.json({
    total: contactMessageCount(),
    messages: listContactMessages(limit),
  });
}
