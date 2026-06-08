/**
 * Sitemap Ping API Route
 * GET /api/ping-search-engines — Pings Google and Bing to notify them of sitemap updates.
 *
 * This triggers search engines to re-crawl the sitemap, which is especially useful
 * for pages that are "Discovered - currently not indexed" in Google Search Console.
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
 * @see https://www.bing.com/webmasters/help/submit-urls-to-bing-70f7b1de
 */

import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site-config';

export const runtime = 'edge';

const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

/**
 * Ping endpoints for major search engines.
 * These are official APIs that notify search engines of sitemap updates.
 */
const PING_ENDPOINTS = {
  google: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  bing: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
} as const;

interface PingResult {
  engine: string;
  status: number;
  ok: boolean;
  message: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Optional: check for a simple secret to prevent abuse
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret && secret !== process.env.PING_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 403 });
  }

  const results: PingResult[] = [];
  const errors: string[] = [];

  // Ping all search engines in parallel
  const responses = await Promise.allSettled(
    Object.entries(PING_ENDPOINTS).map(async ([engine, url]): Promise<PingResult> => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'TheTaxCalc-SitemapPing/1.0',
          },
        });

        const ok = response.ok || response.status === 200 || response.status === 202;
        let message = '';

        switch (response.status) {
          case 200:
            message = 'Sitemap ping accepted successfully.';
            break;
          case 202:
            message = 'Sitemap ping accepted for async processing.';
            break;
          case 400:
            message = 'Bad request: invalid sitemap URL.';
            break;
          case 403:
            message = 'Forbidden: sitemap URL not accessible or blocked.';
            break;
          case 429:
            message = 'Rate limited: too many pings. Try again later.';
            break;
          default:
            message = `Response: ${response.status} ${response.statusText}`;
        }

        return { engine, status: response.status, ok, message };
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown network error';
        return { engine, status: 0, ok: false, message: `Network error: ${msg}` };
      }
    })
  );

  for (const response of responses) {
    if (response.status === 'fulfilled') {
      results.push(response.value);
      if (!response.value.ok) {
        errors.push(`${response.value.engine}: ${response.value.message}`);
      }
    } else {
      results.push({
        engine: 'unknown',
        status: 0,
        ok: false,
        message: `Promise rejected: ${response.reason}`,
      });
      errors.push(`Ping failed: ${response.reason}`);
    }
  }

  const anySuccess = results.some((r) => r.ok);

  return NextResponse.json({
    success: anySuccess,
    sitemapUrl: SITEMAP_URL,
    engines: results.map((r) => ({
      name: r.engine,
      status: r.status,
      ok: r.ok,
      message: r.message,
    })),
    errors: errors.length > 0 ? errors : undefined,
    tip: 'For Google: also use the URL Inspection tool in Google Search Console to request indexing of specific pages. For Bing: use Bing Webmaster Tools Submit URLs feature.',
  }, { status: anySuccess ? 200 : 207 });
}
