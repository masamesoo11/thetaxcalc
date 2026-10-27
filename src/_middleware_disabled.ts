import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Minimal middleware for Cloudflare Pages Edge Runtime compatibility
// Full proxy with auth is in src/_proxy_disabled.ts (not used due to CF Pages edge runtime requirement)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // SEO redirect: old/incorrect slug → correct one
  if (pathname === '/self-employment-calculator') {
    return NextResponse.redirect(
      new URL('/self-employment-tax-calculator', request.url),
      301
    );
  }

  const response = NextResponse.next();

  // Security headers for all pages
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
  );

  // Cache-Control for HTML pages (not static assets)
  const isHtmlPage =
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api') &&
    !pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt|css|js|woff2?|ttf|eot)$/);
  if (isHtmlPage) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|apple-touch-icon\\.png|logo-512\\.png|logo-512\\.webp|logo\\.svg|manifest\\.json|opengraph-image\\.png|robots\\.txt|sitemap\\.xml|feed\\.xml|d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9\\.txt|disavow\\.txt|author-).+)',
  ],
};
