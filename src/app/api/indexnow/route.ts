/**
 * IndexNow API Route
 * POST /api/indexnow — Submits URLs to IndexNow search engine endpoints.
 *
 * Accepts a JSON body with either:
 * - { urls: string[] } — specific URLs to submit
 * - { all: true } — submit all important site pages
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  submitToIndexNow,
  submitAllPagesToIndexNow,
  MAX_URLS_PER_REQUEST,
  type SubmitResult,
} from '@/lib/indexnow';
import { SITE_URL } from '@/lib/site-config';
import { verifySessionToken, getCookieName } from '@/lib/auth';

export const runtime = 'edge';

// ─── POST Handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // ─── Auth required: only admin can submit URLs to IndexNow ───
  const token = request.cookies.get(getCookieName())?.value;
  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Option 1: Submit all site pages
    if (body.all === true) {
      const result = await submitAllPagesToIndexNow();
      return NextResponse.json(formatResponse(result), {
        status: result.success ? 200 : 207,
      });
    }

    // Option 2: Submit specific URLs
    const { urls } = body;

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        {
          error: 'Invalid request body. Provide { urls: string[] } or { all: true }.',
        },
        { status: 400 }
      );
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { error: 'URL list is empty. Provide at least one URL.' },
        { status: 400 }
      );
    }

    if (urls.length > MAX_URLS_PER_REQUEST) {
      return NextResponse.json(
        {
          error: `Too many URLs: ${urls.length}. Maximum is ${MAX_URLS_PER_REQUEST} per request.`,
        },
        { status: 400 }
      );
    }

    // Validate all URLs are strings
    const invalidEntries = urls.filter((u: unknown) => typeof u !== 'string');
    if (invalidEntries.length > 0) {
      return NextResponse.json(
        { error: 'All URLs must be strings.' },
        { status: 400 }
      );
    }

    // Validate URLs belong to thetaxcalc.com
    const siteDomain = new URL(SITE_URL).hostname;
    const invalidUrls = (urls as string[]).filter((url) => {
      try {
        const parsed = new URL(url);
        return parsed.hostname !== siteDomain && parsed.hostname !== `www.${siteDomain}`;
      } catch {
        return true;
      }
    });

    if (invalidUrls.length > 0) {
      return NextResponse.json(
        {
          error: `URLs must belong to ${siteDomain}. Invalid URLs: ${invalidUrls.slice(0, 5).join(', ')}${invalidUrls.length > 5 ? ` ... and ${invalidUrls.length - 5} more` : ''}`,
        },
        { status: 422 }
      );
    }

    // Submit to IndexNow
    const result = await submitToIndexNow(urls as string[]);

    return NextResponse.json(formatResponse(result), {
      status: result.success ? 200 : 207,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: `Failed to submit URLs to IndexNow: ${message}` },
      { status: 500 }
    );
  }
}

// ─── GET Handler (health check) ─────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    service: 'IndexNow API',
    host: 'thetaxcalc.com',
    keyLocation: 'https://thetaxcalc.com/d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9.txt',
    maxUrlsPerRequest: MAX_URLS_PER_REQUEST,
    endpoints: [
      'https://api.indexnow.org/IndexNow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',
    ],
    usage: {
      submitUrls: 'POST { urls: ["https://thetaxcalc.com/page1", ...] }',
      submitAll: 'POST { all: true }',
    },
  });
}

// ─── Response Formatter ─────────────────────────────────────────────────────

function formatResponse(result: SubmitResult) {
  return {
    success: result.success,
    totalUrlsSubmitted: result.totalUrls,
    endpoints: result.results.map((r) => ({
      url: r.endpoint,
      status: r.status,
      ok: r.ok,
      message: r.message,
    })),
    errors: result.errors.length > 0 ? result.errors : undefined,
  };
}
