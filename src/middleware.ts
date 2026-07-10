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

- Social Security: 6.2% (up to $184,500)
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

  // /income-tax-calculator → /paycheck-calculator
  if (pathname === '/income-tax-calculator') {
    return NextResponse.redirect(
      new URL('/paycheck-calculator', request.url),
      301
    );
  }

  // /yr → /paycheck-calculator (truncated URL found in GSC)
  if (pathname === '/yr') {
    return NextResponse.redirect(
      new URL('/paycheck-calculator', request.url),
      301
    );
  }

  // ─── Common calculator naming variant redirects ────────────────────────────
  const CALCULATOR_REDIRECTS: Record<string, string> = {
    '/paycheck-tax-calculator': '/paycheck-calculator',
    '/salary-calculator': '/paycheck-calculator',
    '/take-home-pay-calculator': '/paycheck-calculator',
    '/net-pay-calculator': '/paycheck-calculator',
    '/after-tax-calculator': '/paycheck-calculator',
    '/wage-calculator': '/paycheck-calculator',
    '/hourly-calculator': '/paycheck-calculator',
    '/w4-calculator': '/irs-withholding-calculator',
    '/withholding-calculator': '/irs-withholding-calculator',
    '/tax-estimate-calculator': '/tax-refund-calculator',
    '/tax-return-calculator': '/tax-refund-calculator',
    '/state-tax-calculator': '/paycheck-calculator',
    '/federal-tax-calculator': '/paycheck-calculator',
    // Compare page variant redirects — handle reversed state order
    '/compare/california-vs-texas': '/compare/texas-vs-california',
    '/compare/florida-vs-texas': '/compare/texas-vs-florida',
    '/compare/new-york-vs-texas': '/compare/texas-vs-new-york',
    '/compare/new-york-vs-florida': '/compare/florida-vs-new-york',
    '/compare/new-york-vs-california': '/compare/california-vs-new-york',
    '/compare/texas-vs-illinois': '/compare/illinois-vs-texas',
    '/compare/florida-vs-illinois': '/compare/illinois-vs-florida',
    '/compare/california-vs-illinois': '/compare/illinois-vs-california',
    '/compare/new-york-vs-illinois': '/compare/illinois-vs-new-york',
    '/ss-calculator': '/paycheck-calculator',
    '/medicare-calculator': '/paycheck-calculator',
    '/fica-calculator': '/paycheck-calculator',
    '/social-security-calculator': '/paycheck-calculator',
    '/ira-calculator': '/401k-retirement-calculator',
    '/roth-ira-calculator': '/401k-retirement-calculator',
    '/hsa-calculator': '/401k-retirement-calculator',
    '/fsa-calculator': '/401k-retirement-calculator',
    '/401k-calculator': '/401k-retirement-calculator',
    '/401-calculator': '/401k-retirement-calculator',
    '/retirement-calculator': '/401k-retirement-calculator',
    '/pension-calculator': '/401k-retirement-calculator',
    '/annuity-calculator': '/401k-retirement-calculator',
    '/w-4-calculator': '/irs-withholding-calculator',
    '/w4-calculator': '/irs-withholding-calculator',
    '/withholding-calculator': '/irs-withholding-calculator',
    '/irs-calculator': '/irs-withholding-calculator',
    '/amortization-calculator': '/mortgage-calculator',
    '/loan-calculator': '/mortgage-calculator',
    '/interest-calculator': '/mortgage-calculator',
    '/calculators': '/paycheck-calculator',
    '/tools': '/paycheck-calculator',
    '/faq': '/glossary',
    '/help': '/glossary',
    '/support': '/about',
    '/sitemap': '/sitemap.xml',
    '/feed': '/feed.xml',
    '/rss': '/feed.xml',
  };

  if (CALCULATOR_REDIRECTS[pathname]) {
    return NextResponse.redirect(
      new URL(CALCULATOR_REDIRECTS[pathname], request.url),
      301
    );
  }

  // ─── State short name redirects (non-greedy regex) ─────────────────────────
  const stateSuffixMatch = pathname.match(/^\/([a-z-]+?)-(income-tax|tax-rate|paycheck|tax)$/);
  if (stateSuffixMatch) {
    const stateName = stateSuffixMatch[1];
    const STATE_NAMES = [
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
    if (STATE_NAMES.includes(stateName)) {
      return NextResponse.redirect(
        new URL(`/${stateName}-tax-calculator`, request.url),
        301
      );
    }
  }

  // ─── Blog URL redirects ────────────────────────────────────────────────────
  const BLOG_REDIRECTS: Record<string, string> = {
    '/blog/tax-brackets-2026': '/blog/2026-federal-tax-brackets-explained',
    '/blog/tax-refund-calculator': '/blog/tax-refund-questions-2026',
    '/blog/income-tax-guide': '/blog/how-much-tax-will-i-owe-2026',
    '/blog/state-tax-comparison': '/blog/florida-vs-texas-tax-comparison',
    '/blog/tax-tips': '/blog/2026-federal-tax-brackets-explained',
    // Fix broken links to unpublished articles — redirect to closest published equivalents
    '/blog/2026-federal-tax-refund-estimator-guide': '/blog/tax-refund-questions-2026',
    '/blog/how-to-calculate-federal-tax-refund-2026': '/blog/tax-refund-questions-2026',
    '/blog/2026-paycheck-take-home-pay-guide': '/blog/take-home-pay-calculator-guide-2026',
    '/blog/1099-vs-w2-take-home-pay-comparison-2026': '/blog/1099-tax-guide-self-employed-2026',
  };

  if (BLOG_REDIRECTS[pathname]) {
    return NextResponse.redirect(
      new URL(BLOG_REDIRECTS[pathname], request.url),
      301
    );
  }

  // ─── {search_term_string} template URL redirect ────────────────────────────
  const searchParams = request.nextUrl.searchParams;
  if (searchParams.has('q') && searchParams.get('q')?.includes('{search_term_string}')) {
    return NextResponse.redirect(
      new URL(pathname, request.url),
      301
    );
  }

  // ─── Bot redirect: strip query params for calculator URLs ──────────────────
  const CALCULATOR_PATHS_WITH_PARAMS = [
    '/property-tax-calculator', '/sales-tax-calculator', '/paycheck-calculator',
    '/illinois-tax-calculator', '/texas-tax-calculator', '/florida-tax-calculator',
    '/california-tax-calculator', '/new-york-tax-calculator', '/georgia-tax-calculator',
    '/virginia-tax-calculator', '/north-carolina-tax-calculator', '/pennsylvania-tax-calculator',
    '/ohio-tax-calculator', '/michigan-tax-calculator', '/new-jersey-tax-calculator',
    '/colorado-tax-calculator', '/arizona-tax-calculator', '/washington-tax-calculator',
    '/massachusetts-tax-calculator', '/indiana-tax-calculator', '/tennessee-tax-calculator',
    '/missouri-tax-calculator', '/maryland-tax-calculator', '/wisconsin-tax-calculator',
    '/minnesota-tax-calculator', '/oregon-tax-calculator',
  ];
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|telegrambot|whatsapp|applebot/i.test(userAgent);
  if (isBot && CALCULATOR_PATHS_WITH_PARAMS.includes(pathname) && searchParams.toString().length > 0) {
    return NextResponse.redirect(
      new URL(pathname, request.url),
      301
    );
  }


  // ─── Blog short URL redirects (prevent 404s) ───────────────────────────────
  const BLOG_SHORT_REDIRECTS: Record<string, string> = {
    '/blog/retirement-tax-planning': '/blog/retirement-tax-planning-guide-2026',
    '/blog/401k-withdrawal': '/blog/401k-withdrawal-tax-guide-2026',
    '/blog/inheritance-tax': '/blog/inheritance-tax-guide-2026',
    '/blog/social-security-tax': '/blog/social-security-tax-questions-2026',
    '/blog/tax-questions': '/blog/tax-questions-answered-2026',
    '/blog/tax-refund-questions': '/blog/tax-refund-questions-2026',
    '/blog/federal-tax-brackets': '/blog/2026-federal-tax-brackets-explained',
    '/blog/sales-tax-guide': '/blog/sales-tax-by-state-guide-2026',
    '/blog/property-tax-guide': '/blog/property-tax-by-state-guide-2026',
    '/blog/lottery-tax': '/blog/lottery-tax-guide-2026',
    '/blog/self-employment-tax': '/blog/1099-tax-guide-self-employed-2026',
    '/blog/doordash-taxes': '/blog/doordash-taxes-guide-2026',
    '/blog/1099-tax': '/blog/1099-tax-guide-self-employed-2026',
    '/blog/w4-guide': '/blog/irs-withholding-w4-guide-2026',
    '/blog/overtime-tax': '/blog/no-tax-on-overtime-guide-2026',
    '/blog/bonus-tax': '/blog/how-bonuses-are-taxed-2026',
    '/blog/irs-withholding': '/blog/irs-withholding-w4-guide-2026',
    '/blog/how-fica-taxes': '/blog/how-fica-taxes-work-2026',
    '/blog/how-bonuses': '/blog/how-bonuses-are-taxed-2026',
    '/blog/no-tax-overtime': '/blog/no-tax-on-overtime-guide-2026',
    '/blog/sep-ira': '/blog/sep-ira-solo-401k-guide-2026',
    '/blog/why-texas': '/blog/why-texas-has-no-income-tax',
    '/blog/florida-vs-texas': '/blog/florida-vs-texas-tax-comparison',
    '/blog/illinois-income': '/blog/illinois-income-tax-guide-2026',
    '/blog/california-tax': '/blog/california-tax-guide-2026',
    '/blog/texas-tax': '/blog/texas-tax-guide-2026',
    '/blog/new-york-tax': '/blog/new-york-tax-guide-2026',
    '/blog/washington-tax': '/blog/washington-tax-guide-2026',
  };

  if (BLOG_SHORT_REDIRECTS[pathname]) {
    return NextResponse.redirect(
      new URL(BLOG_SHORT_REDIRECTS[pathname], request.url),
      301
    );
  }

  // ─── Calculator short URL redirects ────────────────────────────────────────
  const CALC_SHORT_REDIRECTS: Record<string, string> = {
    '/tax': '/paycheck-calculator',
    '/taxes': '/paycheck-calculator',
    '/paycheck': '/paycheck-calculator',
    '/income-tax': '/paycheck-calculator',
    '/state-tax': '/paycheck-calculator',
    '/refund-calculator': '/tax-refund-calculator',
    '/mortgage': '/mortgage-calculator',
    '/401k': '/401k-retirement-calculator',
    '/retirement': '/401k-retirement-calculator',
    '/capital-gains': '/capital-gains-calculator',
    '/self-employment': '/self-employment-tax-calculator',
    '/sales-tax': '/sales-tax-calculator',
    '/property-tax': '/property-tax-calculator',
    '/bonus-calculator': '/bonus-tax-calculator',
    '/overtime': '/overtime-tax-calculator',
    '/lottery': '/lottery-tax-calculator',
    '/relocation': '/relocation-calculator',
    '/withholding': '/irs-withholding-calculator',
    '/w4': '/irs-withholding-calculator',
    '/irs': '/irs-withholding-calculator',
    '/federal-tax': '/federal-tax-brackets',
    '/tax-estimate': '/tax-refund-calculator',
  };

  if (CALC_SHORT_REDIRECTS[pathname]) {
    return NextResponse.redirect(
      new URL(CALC_SHORT_REDIRECTS[pathname], request.url),
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
  // CSP follows Google's official recommendations for GTM + GA4:
  // https://support.google.com/tagmanager/answer/10718549
  // Uses wildcards (*.googletagmanager.com, *.google-analytics.com) per Google's guidance
  const googleScripts = "https://*.googletagmanager.com https://*.google-analytics.com https://www.google.com https://www.gstatic.com https://ssl.gstatic.com https://tagmanager.google.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://analytics.ahrefs.com";
  const googleImgs = "https://*.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net https://*.google.com https://www.gstatic.com https://ssl.gstatic.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googleadservices.com https://analytics.ahrefs.com";
  const googleConnect = "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://stats.g.doubleclick.net https://analytics.ahrefs.com";
  const googleFrames = "https://www.googletagmanager.com https://*.g.doubleclick.net https://td.doubleclick.net https://googleads.g.doubleclick.net";
  const googleStyles = "https://fonts.googleapis.com https://tagmanager.google.com https://googletagmanager.com";
  response.headers.set('Content-Security-Policy', `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' ${googleScripts}; script-src-elem 'self' 'unsafe-inline' ${googleScripts}; script-src-attr 'self' 'unsafe-inline' ${googleScripts}; style-src 'self' 'unsafe-inline' ${googleStyles}; style-src-elem 'self' 'unsafe-inline' ${googleStyles}; img-src 'self' data: ${googleImgs}; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' ${googleConnect}; frame-src ${googleFrames}; worker-src 'self' blob:; child-src 'self' https://www.googletagmanager.com; ${frameAncestors}; base-uri 'self'; form-action 'self';`);



  // ─── AI Content Signals ────────────────────────────────────────────
  response.headers.set('Content-Signal', 'ai-train=yes, search=yes, ai-input=yes');

  // ─── Internal search results: noindex, follow (prevent indexation of search pages) ──
  if (searchParams.has('q') && !searchParams.get('q')?.includes('{search_term_string}')) {
    response.headers.set('X-Robots-Tag', 'noindex, follow');
  }

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
