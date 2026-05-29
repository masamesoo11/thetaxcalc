import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'experimental-edge';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // CSP
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';");

  // Cache for HTML pages
  const isHtmlPage = !pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt|css|js|woff2?|ttf|eot)$/);
  if (isHtmlPage) {
    response.headers.set('Cache-Control', 'public, max-age=600, s-maxage=600, stale-while-revalidate=3600');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)'],
};
