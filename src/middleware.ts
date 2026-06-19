import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, getCookieName } from '@/lib/auth';

export const runtime = 'experimental-edge';

// Routes that require admin authentication
const PROTECTED_ROUTES = ['/admin'];

// API routes that require admin authentication (mutations & admin-only data)
const PROTECTED_API_ROUTES = [
  '/api/admin',
  '/api/auth/verify',
];

// API routes where only mutations (POST, PUT, DELETE) require admin auth
const MUTATION_PROTECTED_API_ROUTES = [
  '/api/blog',
  '/api/ads',
  '/api/settings',
  '/api/links',
];

// Public API routes (no auth needed)
const PUBLIC_API_ROUTES = [
  '/api/auth/login',
  '/api/auth/logout',
  '/api/track',
];

// NOTE: /api/seed was removed from public routes.
// It now requires admin auth (covered by MUTATION_PROTECTED_API_ROUTES below).
// Add it to mutation-protected routes:
const SEED_PROTECTED = ['/api/seed'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // static files with extensions
  ) {
    return NextResponse.next();
  }

  // ─── SEO Redirects ────────────────────────────────────────────────────
  if (pathname === '/self-employment-calculator') {
    return NextResponse.redirect(
      new URL('/self-employment-tax-calculator', request.url),
      301
    );
  }

  // /tax-calculator → /paycheck-calculator (generic "tax calculator" searches)
  if (pathname === '/tax-calculator') {
    return NextResponse.redirect(
      new URL('/paycheck-calculator', request.url),
      301
    );
  }

  // /resources → /tax-data (consolidated to /tax-data which is in main nav + has interactive charts)
  if (pathname === '/resources') {
    return NextResponse.redirect(
      new URL('/tax-data', request.url),
      301
    );
  }

  // ─── Salary legacy URL redirect (/salary/85000 → /salary/85000-after-taxes) ───
  // 301 redirect legacy salary URLs to new canonical URL pattern
  // instead of serving the page with a canonical tag (which causes duplicate content warnings)
  const salaryMatch = pathname.match(/^\/salary\/(\d+)$/);
  if (salaryMatch) {
    return NextResponse.redirect(
      new URL(`/salary/${salaryMatch[1]}-after-taxes`, request.url),
      301
    );
  }

  // ─── State name redirects (/state → /state-tax-calculator) ───
  // Catches broken links where state name is used without -tax-calculator suffix
  const STATE_SLUGS = [
    'alabama', 'alaska', 'arizona', 'arkansas', 'california',
    'colorado', 'connecticut', 'delaware', 'florida', 'georgia',
    'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
    'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
    'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri',
    'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey',
    'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
    'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina',
    'south-dakota', 'tennessee', 'texas', 'utah', 'vermont',
    'virginia', 'washington', 'west-virginia', 'wisconsin', 'wyoming',
  ];
  if (STATE_SLUGS.includes(pathname.slice(1))) {
    return NextResponse.redirect(
      new URL(`${pathname}-tax-calculator`, request.url),
      301
    );
  }

  // /contact → /about (no standalone contact page; /about has author bios + editorial policy)
  if (pathname === '/contact' || pathname === '/contact-us') {
    return NextResponse.redirect(
      new URL('/about', request.url),
      301
    );
  }

  // ─── Check embed mode ─────────────────────────────────────────────────────
  const isEmbed = request.nextUrl.searchParams.get('embed') === '1';

  // ─── Security Headers (applied to all responses) ────────────────────────
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // When ?embed=1, allow iframe embedding (needed for widget embeds)
  // Otherwise, deny framing to prevent clickjacking on normal pages
  if (isEmbed) {
    response.headers.set('X-Frame-Options', 'ALLOWALL');
  } else {
    response.headers.set('X-Frame-Options', 'DENY');
  }

  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // CSP — when embed mode, allow frame-ancestors from any origin so widgets work
  const frameAncestors = isEmbed ? "frame-ancestors *" : "frame-ancestors 'none'";
  response.headers.set('Content-Security-Policy', `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com; frame-src https://googleads.g.doubleclick.net; ${frameAncestors}; base-uri 'self'; form-action 'self';`);



  // ─── AI Content Signals ────────────────────────────────────────────
  response.headers.set('Content-Signal', 'ai-train=yes, search=yes, ai-input=yes');

  // ─── AI Agent Discovery: Link Headers (RFC 8288) ────────────────────
  response.headers.set('Link', [
    '</.well-known/api-catalog>; rel="api-catalog"',
    '</.well-known/agent-skills/index.json>; rel="service-doc"',
    '</llms.txt>; rel="service-doc"',
    '</auth.md>; rel="service-doc"',
  ].join(', '));

  // Cache for HTML pages — CDN edge caching for Cloudflare Pages
  // Must delete Next.js default Cache-Control (max-age=0) before setting ours,
  // otherwise Next.js overwrites it AFTER middleware runs on Cloudflare Pages.
  const isHtmlPage = !pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.startsWith('/admin') && !pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt|css|js|woff2?|ttf|eot)$/);
  if (isHtmlPage) {
    response.headers.delete('Cache-Control');
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=2592000, stale-while-revalidate=31536000');
  }

  // Check if this is a public API route (always allow)
  if (PUBLIC_API_ROUTES.some(route => pathname.startsWith(route))) {
    return response;
  }

  // Check if this is a protected page route (like /admin)
  const isProtectedPage = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  // Check if this is a fully protected API route
  const isProtectedApi = PROTECTED_API_ROUTES.some(route => pathname.startsWith(route));

  // Check if this is a mutation-protected API route
  const isMutationProtected = MUTATION_PROTECTED_API_ROUTES.some(route => pathname.startsWith(route));
  const isMutation = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method);

  // Check if this is the seed route (admin-only after security hardening)
  const isSeedRoute = SEED_PROTECTED.some(route => pathname.startsWith(route));

  // Determine if this route needs authentication
  const needsAuth = isProtectedPage || isProtectedApi || (isMutationProtected && isMutation) || isSeedRoute;

  if (!needsAuth) {
    return response;
  }

  // Verify the session token
  const token = request.cookies.get(getCookieName())?.value;

  if (!token) {
    // For API routes, return 401 JSON
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    // For page routes, let the page load — the AdminGate component will handle the UI
    return response;
  }

  const session = await verifySessionToken(token);

  if (!session) {
    // Invalid/expired token
    if (pathname.startsWith('/api/')) {
      const unauthorizedResponse = NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
      // Clear the invalid cookie
      unauthorizedResponse.cookies.set(getCookieName(), '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      });
      return unauthorizedResponse;
    }
    // For page routes, clear cookie and let AdminGate handle it
    response.cookies.set(getCookieName(), '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    return response;
  }

  // Valid session — proceed
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)',
  ],
};
