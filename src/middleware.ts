import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Cloudflare Pages CDN Caching Middleware
 *
 * Problem: @cloudflare/next-on-pages sets Cache-Control: public, max-age=0, must-revalidate
 * on all pages, which prevents Cloudflare CDN from caching at the edge (cf-cache-status: DYNAMIC).
 * The _headers file does NOT override function-set headers on Cloudflare Pages.
 *
 * This middleware overrides Cache-Control for pre-rendered pages, enabling CDN edge caching.
 * Without edge caching, Screaming Frog crawl → Connection Timeout (Status Code 0).
 *
 * Routes excluded from CDN caching:
 * - /api/* (dynamic responses)
 * - /admin/* (auth-required)
 * - /_next/* (already cached by _headers)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, admin, and static assets — they have their own caching rules
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.') // static files (images, icons, etc.)
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Override Cache-Control for HTML pages — enables Cloudflare CDN edge caching
  // s-maxage=86400: CDN caches for 24 hours
  // stale-while-revalidate=604800: serve stale content while revalidating (7 days)
  response.headers.set(
    'Cache-Control',
    'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
  );

  return response;
}

export const config = {
  // Match all routes except API, admin, and Next.js internals
  matcher: [
    '/((?!api|admin|_next/static|_next/image|favicon|icon|logo|author|d4e5f6).*)',
  ],
};
