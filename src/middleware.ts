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


  // ─── Markdown Negotiation for AI Agents ─────────────────────────────
  // When an AI agent sends Accept: text/markdown, return markdown instead of HTML
  const acceptHeader = request.headers.get('accept') || '';
  if (acceptHeader.includes('text/markdown') && !pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.includes('.')) {
    // Generate markdown version of the page
    const baseUrl = 'https://thetaxcalc.com';
    const markdownMap: Record<string, string> = {
      '/': `# TheTaxCalc — Free 2026 Tax Calculator

> Free, accurate, no-sign-up tax calculators for US taxpayers. 64 calculators covering all 50 states.

## Key Tools

- [Paycheck Calculator](/paycheck-calculator) — Calculate take-home pay after federal, FICA & state taxes
- [Sales Tax Calculator](/sales-tax-calculator) — All 50 US states with combined state + local rates
- [Lottery Tax Calculator](/lottery-tax-calculator) — How much you keep after federal + state taxes
- [Self-Employment Tax Calculator](/self-employment-tax-calculator) — 15.3% SE tax + quarterly estimates
- [Property Tax Calculator](/property-tax-calculator) — Compare property taxes across all 50 states
- [401(k) Retirement Calculator](/401k-retirement-calculator) — Projected balance with employer match
- [Capital Gains Calculator](/capital-gains-calculator) — Short-term & long-term rates
- [Mortgage Calculator](/mortgage-calculator) — Payment, amortization & extra payments

## State Tax Calculators (50 states)

- [California Tax Calculator](/california-tax-calculator) — 1%–13.3% progressive
- [Texas Tax Calculator](/texas-tax-calculator) — 0% income tax
- [Florida Tax Calculator](/florida-tax-calculator) — 0% income tax
- [New York Tax Calculator](/new-york-tax-calculator) — 4%–10.9% + NYC tax
- [Illinois Tax Calculator](/illinois-tax-calculator) — 4.95% flat tax

## Compare States

- [California vs New York](/compare/california-vs-new-york)
- [Texas vs Florida](/compare/texas-vs-florida)
- [Illinois vs Texas](/compare/illinois-vs-texas)

## Resources

- [Federal Tax Brackets 2026](/federal-tax-brackets)
- [Tax Blog](/blog)
- [About TheTaxCalc](/about)
- [Methodology](/methodology)

## Author

Rachel Mitchell, CPA

Visit https://thetaxcalc.com for full interactive calculators.`,
      '/paycheck-calculator': `# Free Paycheck Calculator 2026

Calculate your take-home pay after federal, FICA & state taxes.

## How It Works

1. Enter your salary (annual, monthly, bi-weekly, weekly, or hourly)
2. Select your state (IL, TX, FL, CA, NY, and more)
3. Choose filing status (Single, Married, Head of Household)
4. Add pre-tax deductions (401k, HSA)
5. View instant results

## 2026 Federal Tax Brackets (Single)

| Rate | Income Range |
|------|-------------|
| 10% | $0 – $11,925 |
| 12% | $11,926 – $48,475 |
| 22% | $48,476 – $103,350 |
| 24% | $103,351 – $197,300 |
| 32% | $197,301 – $250,525 |
| 35% | $250,526 – $626,350 |
| 37% | Over $626,350 |

## FICA Taxes

- Social Security: 6.2% (up to $176,100)
- Medicare: 1.45% (no limit)

Visit https://thetaxcalc.com/paycheck-calculator for the interactive calculator.`,
      '/sales-tax-calculator': `# Sales Tax Calculator 2026 — All 50 States

Calculate combined state + local sales tax for any US state.

## Features

- Forward calculator: Add sales tax to a price
- Reverse calculator: Remove tax from a total
- Car sales tax calculator
- IRS sales tax deduction estimator
- All 50 states with local rates

## State Sales Tax Rates (Top 10)

| State | State Rate | Avg Combined |
|-------|-----------|-------------|
| California | 7.25% | 8.82% |
| Indiana | 7.00% | 7.00% |
| Tennessee | 7.00% | 9.55% |
| Arkansas | 6.50% | 9.47% |
| Washington | 6.50% | 9.59% |
| Louisiana | 4.45% | 9.56% |
| Alabama | 4.00% | 9.24% |
| Oklahoma | 4.50% | 8.95% |
| New York | 4.00% | 8.52% |
| Texas | 6.25% | 8.19% |

Visit https://thetaxcalc.com/sales-tax-calculator for the interactive calculator.`,
      '/lottery-tax-calculator': `# Lottery Tax Calculator 2026

How much tax do you pay on lottery winnings?

## Quick Answer

A $1M jackpot nets approximately $510,000 after 24% federal + state taxes.

## How Lottery Tax Works

- Federal withholding: 24% (automatic)
- Federal tax bill: Up to 37% (top bracket)
- State tax: Varies by state (0% in TX/FL, up to 13.3% in CA)
- Lump sum vs annuity: Different tax implications

## State-by-State Lottery Tax

| State | Tax Rate | $1M Take-Home |
|-------|---------|--------------|
| Texas | 0% | ~$630,000 |
| Florida | 0% | ~$630,000 |
| California | 0% state | ~$630,000 |
| New York | 10.9% | ~$520,000 |
| Illinois | 4.95% | ~$560,000 |

Visit https://thetaxcalc.com/lottery-tax-calculator for the interactive calculator.`,
      '/blog': `# Tax Blog — 2026 Guides, Tips & News

Expert tax guides, state comparisons, and financial tips updated for 2026.

## Featured Articles

- [2026 Federal Tax Brackets Explained](/blog/2026-federal-tax-brackets-explained)
- [Federal Tax Brackets 2026 Guide](/blog/federal-tax-brackets-2026-guide)
- [California Tax Guide 2026](/blog/california-tax-guide-2026)
- [Texas Tax Guide 2026](/blog/texas-tax-guide-2026)
- [New York Tax Guide 2026](/blog/new-york-tax-guide-2026)
- [Washington Tax Guide 2026](/blog/washington-tax-guide-2026)
- [1099 Taxes: How Much Freelancers Really Owe](/blog/1099-tax-guide-self-employed-2026)
- [DoorDash Taxes: Complete Guide for Drivers](/blog/doordash-taxes-guide-2026)
- [How Bonuses Are Taxed in 2026](/blog/how-bonuses-are-taxed-2026)
- [Florida vs Texas Tax Comparison](/blog/florida-vs-texas-tax-comparison)

Visit https://thetaxcalc.com/blog for the full blog.`,
      '/about': `# About TheTaxCalc

Free 2026 tax calculators built for real people.

## Our Mission

We built these calculators so you can see exactly where your money goes — federal tax, FICA, and state taxes all broken down line by line. No guesswork, no surprises.

## Author

**Rachel Mitchell, CPA** — Licensed Certified Public Accountant with expertise in federal and state tax law.

## Data Sources

- IRS publications (Pub 15-T, tax brackets, inflation adjustments)
- State revenue departments
- Tax Foundation
- All calculations based on 2026 tax year data

## Contact

- Website: https://thetaxcalc.com
- Author: Rachel Mitchell, CPA

Visit https://thetaxcalc.com/about for the full page.`,
    };

    const markdownContent = markdownMap[pathname];
    if (markdownContent) {
      return new NextResponse(markdownContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
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
  // CSP includes all Google domains needed for GTM, GA4, and AdSense to function
  response.headers.set('Content-Security-Policy', `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.google.com https://www.gstatic.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://googleads.g.doubleclick.net; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://ssl.google-analytics.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://*.google-analytics.com; frame-src https://www.googletagmanager.com https://googleads.g.doubleclick.net https://td.doubleclick.net; ${frameAncestors}; base-uri 'self'; form-action 'self';`);



  // ─── AI Content Signals ────────────────────────────────────────────
  response.headers.set('Content-Signal', 'ai-train=yes, search=yes, ai-input=yes');

  // ─── AI Agent Discovery: Link Headers (RFC 8288) ────────────────────
  response.headers.set('Link', [
    '</.well-known/api-catalog>; rel="service-doc"',
    '</.well-known/agent-skills/index.json>; rel="service-doc"',
    '</.well-known/mcp/server-card.json>; rel="service-doc"',
    '</.well-known/oauth-authorization-server>; rel="service-doc"',
    '</.well-known/oauth-protected-resource>; rel="service-doc"',
    '</.well-known/openid-configuration>; rel="service-doc"',
    '</llms.txt>; rel="service-doc"',
    '</auth.md>; rel="service-doc"',
    '</sitemap.xml>; rel="service-doc"',
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
