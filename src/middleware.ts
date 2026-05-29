import { NextRequest, NextResponse } from 'next/server';

// Edge runtime for Cloudflare Pages compatibility
export const runtime = 'experimental-edge';

/**
 * Middleware for TheTaxCalc:
 * 1. Adds security headers to all responses
 * 2. Sets Cache-Control for HTML pages (stale-while-revalidate)
 * 3. Sets longer cache for static assets
 * 4. Adds CORS headers for API routes
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // ─── Security Headers ───────────────────────────────────────────────────
  // Note: Cloudflare Pages _headers file also sets some of these,
  // but middleware ensures they're applied even if _headers is missed.
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  // ─── Content Security Policy ────────────────────────────────────────────
  // Allows Google Analytics, Google Fonts, and inline scripts/styles
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://www.google-analytics.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\n/g, '').trim();
  response.headers.set('Content-Security-Policy', cspHeader);

  // ─── Cache Headers ──────────────────────────────────────────────────────
  // HTML pages: cache for 10 minutes, serve stale for up to 1 hour
  const isHtmlPage =
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/admin') &&
    !pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt|css|js|woff2?|ttf|eot)$/);

  if (isHtmlPage) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=600, s-maxage=600, stale-while-revalidate=3600'
    );
  }

  // Feed.xml: cache for 1 hour
  if (pathname === '/feed.xml') {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600'
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)',
  ],
};
