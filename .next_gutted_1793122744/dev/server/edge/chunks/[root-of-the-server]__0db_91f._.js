(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__0db_91f._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/lib/auth.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSessionToken",
    ()=>createSessionToken,
    "getCookieName",
    ()=>getCookieName,
    "getCookieOptions",
    ()=>getCookieOptions,
    "validatePassword",
    ()=>validatePassword,
    "verifySessionToken",
    ()=>verifySessionToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/sign.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [middleware-edge] (ecmascript)");
;
// ─── Configuration ──────────────────────────────────────────────────────────
// FAIL-CLOSED credentials: with no env var set there is NO valid admin
// password and NO valid signing key — login refuses and session cookies never
// verify. (These previously fell back to hardcoded values, which are public
// knowledge in the public repo — anyone could log into the admin panel.)
// Set ADMIN_PASSWORD + JWT_SECRET in Cloudflare Pages → Settings →
// Environment variables (Production), then make a new deployment.
const JWT_SECRET_KEY = process.env.JWT_SECRET || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const COOKIE_NAME = 'thetaxcalc_admin_session';
const SESSION_DURATION = '24h';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
// Derive a secret key from the environment variable
function getSecretKey() {
    return new TextEncoder().encode(JWT_SECRET_KEY);
}
async function createSessionToken() {
    if (!JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET is not configured — set it in Cloudflare Pages environment variables and redeploy.');
    }
    const secret = getSecretKey();
    const token = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SignJWT"]({
        role: 'admin'
    }).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setExpirationTime(SESSION_DURATION).sign(secret);
    return token;
}
async function verifySessionToken(token) {
    if (!JWT_SECRET_KEY) return null; // fail-closed: no secret configured → no valid sessions
    try {
        const secret = getSecretKey();
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret);
        if (payload.role === 'admin') {
            return payload;
        }
        return null;
    } catch  {
        return null;
    }
}
function validatePassword(password) {
    // Length guard: an unset ADMIN_PASSWORD ('') must never match empty input.
    return ADMIN_PASSWORD.length > 0 && password === ADMIN_PASSWORD;
}
function getCookieName() {
    return COOKIE_NAME;
}
function getCookieOptions() {
    return {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24
    };
}
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [middleware-edge] (ecmascript)");
;
;
const runtime = 'experimental-edge';
// Routes that require admin authentication
const PROTECTED_ROUTES = [
    '/admin'
];
// API routes that require admin authentication (mutations & admin-only data)
const PROTECTED_API_ROUTES = [
    '/api/admin',
    '/api/auth/verify'
];
// API routes where only mutations (POST, PUT, DELETE) require admin auth
const MUTATION_PROTECTED_API_ROUTES = [
    '/api/blog',
    '/api/ads',
    '/api/settings',
    '/api/links'
];
// Public API routes (no auth needed)
const PUBLIC_API_ROUTES = [
    '/api/auth/login',
    '/api/auth/logout',
    '/api/track'
];
// NOTE: /api/seed was removed from public routes.
// It now requires admin auth (covered by MUTATION_PROTECTED_API_ROUTES below).
// Add it to mutation-protected routes:
const SEED_PROTECTED = [
    '/api/seed'
];
async function middleware(request) {
    const { pathname } = request.nextUrl;
    // Skip static files and Next.js internals
    if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.includes('.') // static files with extensions
    ) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // ─── Markdown for AI Agents ─────────────────────────────────────────
    // Served ONLY on an explicit ?format=markdown URL — NEVER via Accept
    // header negotiation. Why: Cloudflare's edge cache key is the URL only
    // (the Accept header is ignored), so when markdown was negotiated on the
    // same URL as HTML, any AI agent's request cached the markdown variant
    // at the edge and regular browsers then saw raw markdown instead of the
    // site for up to an hour (observed in production — zone cache rules even
    // rewrote `private, no-store` into a cacheable response). A distinct URL
    // gives a distinct cache key: the plain URL can now ONLY ever serve HTML.
    // Agents wanting markdown follow the service-doc Link headers (/llms.txt)
    // or use ?format=markdown directly.
    const wantsMarkdown = request.nextUrl.searchParams.get('format') === 'markdown';
    if (wantsMarkdown && !pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.includes('.')) {
        // Generate markdown version of the page
        const baseUrl = 'https://thetaxcalc.com';
        const markdownMap = {
            '/': `# TheTaxCalc — Free 2026 Tax Calculator

> Free, accurate, no-sign-up tax calculators for US taxpayers, covering all 50 states.

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
| 10% | $0 – $12,400 |
| 12% | $12,401 – $50,400 |
| 22% | $50,401 – $105,700 |
| 24% | $105,701 – $201,775 |
| 32% | $201,776 – $256,225 |
| 35% | $256,226 – $640,600 |
| 37% | Over $640,600 |

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

## State Sales Tax Rates (Top 10 by combined rate)

| State | State Rate | Avg Combined |
|-------|-----------|-------------|
| Louisiana | 5.00% | 9.56% |
| Tennessee | 7.00% | 9.56% |
| Arkansas | 6.50% | 9.47% |
| Washington | 6.50% | 9.41% |
| Alabama | 4.00% | 9.24% |
| Oklahoma | 4.50% | 8.87% |
| Illinois | 6.25% | 8.86% |
| California | 7.25% | 8.82% |
| Kansas | 6.50% | 8.70% |
| New York | 4.00% | 8.52% |

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

Visit https://thetaxcalc.com/about for the full page.`
        };
        const markdownContent = markdownMap[pathname];
        if (markdownContent) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](markdownContent, {
                status: 200,
                headers: {
                    'Content-Type': 'text/markdown; charset=utf-8',
                    // Safe to cache: this URL (?format=markdown) is a distinct cache
                    // key from the HTML page, so it can never poison the HTML variant.
                    'Cache-Control': 'public, max-age=3600',
                    // Keep markdown variants out of the index (HTML page is canonical).
                    'X-Robots-Tag': 'noindex, follow'
                }
            });
        }
    }
    // ─── SEO Redirects ────────────────────────────────────────────────────
    if (pathname === '/self-employment-calculator') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/self-employment-tax-calculator', request.url), 301);
    }
    // /tax-calculator → /paycheck-calculator (generic "tax calculator" searches)
    if (pathname === '/tax-calculator') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/paycheck-calculator', request.url), 301);
    }
    // /income-tax-calculator → /paycheck-calculator
    if (pathname === '/income-tax-calculator') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/paycheck-calculator', request.url), 301);
    }
    // /yr → /paycheck-calculator (truncated URL found in GSC)
    if (pathname === '/yr') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/paycheck-calculator', request.url), 301);
    }
    // ─── Common calculator naming variant redirects ────────────────────────────
    const CALCULATOR_REDIRECTS = {
        '/paycheck-tax-calculator': '/paycheck-calculator',
        '/salary-calculator': '/paycheck-calculator',
        '/take-home-pay-calculator': '/paycheck-calculator',
        '/net-pay-calculator': '/paycheck-calculator',
        '/after-tax-calculator': '/paycheck-calculator',
        '/wage-calculator': '/paycheck-calculator',
        // Legacy hourly URL now has a dedicated, more relevant destination.
        '/hourly-calculator': '/hourly-to-salary-calculator',
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
        '/irs-calculator': '/irs-withholding-calculator',
        '/amortization-calculator': '/mortgage-calculator',
        '/loan-calculator': '/mortgage-calculator',
        '/interest-calculator': '/mortgage-calculator',
        // NOTE: '/calculators' previously 301'd to /paycheck-calculator because no
        // page existed there. A real /calculators hub page now serves that URL —
        // the legacy redirect was removed so the directory resolves to a 200.
        '/tools': '/paycheck-calculator',
        '/faq': '/glossary',
        '/help': '/glossary',
        '/support': '/about',
        '/sitemap': '/sitemap.xml',
        '/feed': '/feed.xml',
        '/rss': '/feed.xml'
    };
    if (CALCULATOR_REDIRECTS[pathname]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(CALCULATOR_REDIRECTS[pathname], request.url), 301);
    }
    // ─── State short name redirects (non-greedy regex) ─────────────────────────
    const stateSuffixMatch = pathname.match(/^\/([a-z-]+?)-(income-tax|tax-rate|paycheck|tax)$/);
    if (stateSuffixMatch) {
        const stateName = stateSuffixMatch[1];
        const STATE_NAMES = [
            'alabama',
            'alaska',
            'arizona',
            'arkansas',
            'california',
            'colorado',
            'connecticut',
            'delaware',
            'florida',
            'georgia',
            'hawaii',
            'idaho',
            'illinois',
            'indiana',
            'iowa',
            'kansas',
            'kentucky',
            'louisiana',
            'maine',
            'maryland',
            'massachusetts',
            'michigan',
            'minnesota',
            'mississippi',
            'missouri',
            'montana',
            'nebraska',
            'nevada',
            'new-hampshire',
            'new-jersey',
            'new-mexico',
            'new-york',
            'north-carolina',
            'north-dakota',
            'ohio',
            'oklahoma',
            'oregon',
            'pennsylvania',
            'rhode-island',
            'south-carolina',
            'south-dakota',
            'tennessee',
            'texas',
            'utah',
            'vermont',
            'virginia',
            'washington',
            'west-virginia',
            'wisconsin',
            'wyoming'
        ];
        if (STATE_NAMES.includes(stateName)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`/${stateName}-tax-calculator`, request.url), 301);
        }
    }
    // ─── Blog URL redirects ────────────────────────────────────────────────────
    const BLOG_REDIRECTS = {
        '/blog/tax-brackets-2026': '/blog/2026-federal-tax-brackets-explained',
        '/blog/tax-refund-calculator': '/blog/tax-refund-questions-2026',
        '/blog/income-tax-guide': '/blog/how-much-tax-will-i-owe-2026',
        '/blog/state-tax-comparison': '/blog/florida-vs-texas-tax-comparison',
        '/blog/tax-tips': '/blog/2026-federal-tax-brackets-explained'
    };
    if (BLOG_REDIRECTS[pathname]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(BLOG_REDIRECTS[pathname], request.url), 301);
    }
    // ─── {search_term_string} template URL redirect ────────────────────────────
    const searchParams = request.nextUrl.searchParams;
    if (searchParams.has('q') && searchParams.get('q')?.includes('{search_term_string}')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(pathname, request.url), 301);
    }
    // ─── Bot redirect: strip query params for calculator URLs ──────────────────
    const CALCULATOR_PATHS_WITH_PARAMS = [
        '/property-tax-calculator',
        '/sales-tax-calculator',
        '/paycheck-calculator',
        '/illinois-tax-calculator',
        '/texas-tax-calculator',
        '/florida-tax-calculator',
        '/california-tax-calculator',
        '/new-york-tax-calculator',
        '/georgia-tax-calculator',
        '/virginia-tax-calculator',
        '/north-carolina-tax-calculator',
        '/pennsylvania-tax-calculator',
        '/ohio-tax-calculator',
        '/michigan-tax-calculator',
        '/new-jersey-tax-calculator',
        '/colorado-tax-calculator',
        '/arizona-tax-calculator',
        '/washington-tax-calculator',
        '/massachusetts-tax-calculator',
        '/indiana-tax-calculator',
        '/tennessee-tax-calculator',
        '/missouri-tax-calculator',
        '/maryland-tax-calculator',
        '/wisconsin-tax-calculator',
        '/minnesota-tax-calculator',
        '/oregon-tax-calculator'
    ];
    const userAgent = request.headers.get('user-agent') || '';
    const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|telegrambot|whatsapp|applebot/i.test(userAgent);
    if (isBot && CALCULATOR_PATHS_WITH_PARAMS.includes(pathname) && searchParams.toString().length > 0) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(pathname, request.url), 301);
    }
    // ─── Blog short URL redirects (prevent 404s) ───────────────────────────────
    const BLOG_SHORT_REDIRECTS = {
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
        '/sep-ira-solo-401k-guide-2026': '/blog/sep-ira-solo-401k-guide-2026',
        '/blog/why-texas': '/blog/why-texas-has-no-income-tax',
        '/blog/florida-vs-texas': '/blog/florida-vs-texas-tax-comparison',
        '/blog/illinois-income': '/blog/illinois-income-tax-guide-2026',
        '/blog/california-tax': '/blog/california-tax-guide-2026',
        '/blog/texas-tax': '/blog/texas-tax-guide-2026',
        '/blog/new-york-tax': '/blog/new-york-tax-guide-2026',
        '/blog/washington-tax': '/blog/washington-tax-guide-2026'
    };
    if (BLOG_SHORT_REDIRECTS[pathname]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(BLOG_SHORT_REDIRECTS[pathname], request.url), 301);
    }
    // ─── Calculator short URL redirects ────────────────────────────────────────
    const CALC_SHORT_REDIRECTS = {
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
        '/tax-estimate': '/tax-refund-calculator'
    };
    if (CALC_SHORT_REDIRECTS[pathname]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(CALC_SHORT_REDIRECTS[pathname], request.url), 301);
    }
    // ─── Salary legacy URL redirect (/salary/85000 → /salary/85000-after-taxes) ───
    // 301 redirect legacy salary URLs to new canonical URL pattern
    // instead of serving the page with a canonical tag (which causes duplicate content warnings)
    const salaryMatch = pathname.match(/^\/salary\/(\d+)$/);
    if (salaryMatch) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`/salary/${salaryMatch[1]}-after-taxes`, request.url), 301);
    }
    // ─── Sales-tax legacy slug redirects (/sales-tax-calculator/newjersey → new-jersey) ───
    // Canonical slugs are hyphenated (derived from the state name). Old
    // non-hyphenated links (blog posts, external backlinks) get a 301 so their
    // link equity transfers to the canonical URL.
    const SALES_TAX_LEGACY_SLUGS = {
        newhampshire: 'new-hampshire',
        newjersey: 'new-jersey',
        newmexico: 'new-mexico',
        newyork: 'new-york',
        northcarolina: 'north-carolina',
        northdakota: 'north-dakota',
        rhodeisland: 'rhode-island',
        southcarolina: 'south-carolina',
        southdakota: 'south-dakota',
        westvirginia: 'west-virginia',
        districtofcolumbia: 'district-of-columbia'
    };
    const salesTaxSlugMatch = pathname.match(/^\/sales-tax-calculator\/([a-z]+)$/);
    if (salesTaxSlugMatch && SALES_TAX_LEGACY_SLUGS[salesTaxSlugMatch[1]]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`/sales-tax-calculator/${SALES_TAX_LEGACY_SLUGS[salesTaxSlugMatch[1]]}`, request.url), 301);
    }
    // ─── State name redirects (/state → /state-tax-calculator) ───
    // Catches broken links where state name is used without -tax-calculator suffix
    const STATE_SLUGS = [
        'alabama',
        'alaska',
        'arizona',
        'arkansas',
        'california',
        'colorado',
        'connecticut',
        'delaware',
        'florida',
        'georgia',
        'hawaii',
        'idaho',
        'illinois',
        'indiana',
        'iowa',
        'kansas',
        'kentucky',
        'louisiana',
        'maine',
        'maryland',
        'massachusetts',
        'michigan',
        'minnesota',
        'mississippi',
        'missouri',
        'montana',
        'nebraska',
        'nevada',
        'new-hampshire',
        'new-jersey',
        'new-mexico',
        'new-york',
        'north-carolina',
        'north-dakota',
        'ohio',
        'oklahoma',
        'oregon',
        'pennsylvania',
        'rhode-island',
        'south-carolina',
        'south-dakota',
        'tennessee',
        'texas',
        'utah',
        'vermont',
        'virginia',
        'washington',
        'west-virginia',
        'wisconsin',
        'wyoming'
    ];
    if (STATE_SLUGS.includes(pathname.slice(1))) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`${pathname}-tax-calculator`, request.url), 301);
    }
    // /contact → /about (no standalone contact page; /about has author bios + editorial policy)
    if (pathname === '/contact' || pathname === '/contact-us') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/about', request.url), 301);
    }
    // ─── Check embed mode ─────────────────────────────────────────────────────
    const isEmbed = request.nextUrl.searchParams.get('embed') === '1';
    // ─── Security Headers (applied to all responses) ────────────────────────
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
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
        '</sitemap.xml>; rel="service-doc"'
    ].join(', '));
    // Cache for HTML pages — CDN edge caching for Cloudflare Pages
    // Must delete Next.js default Cache-Control (max-age=0) before setting ours,
    // otherwise Next.js overwrites it AFTER middleware runs on Cloudflare Pages.
    // 1-hour edge TTL + stale-while-revalidate: content fixes propagate quickly
    // (a 30-day s-maxage made corrected pages invisible to Google for a month).
    const isHtmlPage = !pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.startsWith('/admin') && !pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt|css|js|woff2?|ttf|eot)$/);
    if (isHtmlPage) {
        response.headers.delete('Cache-Control');
        response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=604800');
    }
    // Check if this is a public API route (always allow)
    if (PUBLIC_API_ROUTES.some((route)=>pathname.startsWith(route))) {
        return response;
    }
    // Check if this is a protected page route (like /admin)
    const isProtectedPage = PROTECTED_ROUTES.some((route)=>pathname.startsWith(route));
    // Check if this is a fully protected API route
    const isProtectedApi = PROTECTED_API_ROUTES.some((route)=>pathname.startsWith(route));
    // Check if this is a mutation-protected API route
    const isMutationProtected = MUTATION_PROTECTED_API_ROUTES.some((route)=>pathname.startsWith(route));
    const isMutation = [
        'POST',
        'PUT',
        'DELETE',
        'PATCH'
    ].includes(request.method);
    // Check if this is the seed route (admin-only after security hardening)
    const isSeedRoute = SEED_PROTECTED.some((route)=>pathname.startsWith(route));
    // Determine if this route needs authentication
    const needsAuth = isProtectedPage || isProtectedApi || isMutationProtected && isMutation || isSeedRoute;
    if (!needsAuth) {
        return response;
    }
    // Verify the session token
    const token = request.cookies.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCookieName"])())?.value;
    if (!token) {
        // For API routes, return 401 JSON
        if (pathname.startsWith('/api/')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Authentication required'
            }, {
                status: 401
            });
        }
        // For page routes, let the page load — the AdminGate component will handle the UI
        return response;
    }
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["verifySessionToken"])(token);
    if (!session) {
        // Invalid/expired token
        if (pathname.startsWith('/api/')) {
            const unauthorizedResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid or expired session'
            }, {
                status: 401
            });
            // Clear the invalid cookie
            unauthorizedResponse.cookies.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCookieName"])(), '', {
                httpOnly: true,
                secure: ("TURBOPACK compile-time value", "development") === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 0
            });
            return unauthorizedResponse;
        }
        // For page routes, clear cookie and let AdminGate handle it
        response.cookies.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCookieName"])(), '', {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 0
        });
        return response;
    }
    // Valid session — proceed
    return response;
}
const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0db_91f._.js.map