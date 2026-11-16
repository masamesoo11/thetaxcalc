# SEO-IMPLEMENTATION-REPORT.md

Scope: issues identified and fixed during the 2026 audit-driven optimization of thetaxcalc.com. This report covers what was changed, decisions taken, and what is still open.

## 1. Issues identified & fixed

### Batch 1 — Critical
| Issue | Fix |
|---|---|
| **Cached 301 on `/paycheck-calculator?embed=1`** — UA-based bot query-param strip returned 301 for `?embed=1`, and the edge cache keyed on URL only made `no-store` unreliable | Removed the whole UA-based `strip query params` block from `src/middleware.ts`; embed now renders normally. Cloudflare **still needs a manual purge** of the stale cached 301. |
| **Broken compare page for reversed slugs** | `parseComparisonSlug` returns `null` when `state1 === state2`; `getCompareConfig` returns null unless slug in `COMPARISON_SLUGS`; middleware 301s `california-vs-florida` → canonical.
| **State/city pages not targeting "paycheck calculator" intent** | All 53 state/city route H1s and metaTitles rewritten via `src/lib/calculator-routes.ts` (e.g. "Texas Paycheck Calculator 2026 — …") with hand-written overrides for CA/NY/NYC/LA/Chicago. |
| **Invalid compare pairs** | Non-canonical pairs now 404 via `notFound()`. |

### Batch 2 — Technical
| Issue | Fix |
|---|---|
| **Permissive hourly/salary slug matching** (`/hourly/22_5-an-hour`, `/salary/75000-foo`) | Anchored regexes in `src/lib/hourly-calculations.ts` / `salary-calculations.ts`; non-matching slugs `permanentRedirect` to canonical; non-curated hourly rates get `robots: noindex,follow` (curated via `HOURLY_RATES`). |
| **Sitewide `#webpage-home` JSON-LD duplicated on every page** | Removed the hardcoded WebPage node from `src/app/layout.tsx`. |
| **`robots` override bug** — `robots: cond ? {…} : undefined` uncovered default | Changed to `...(cond ? {robots:{index:false,follow:true}} : {})` in `[calculator]/page.tsx` and `blog/[slug]/page.tsx`. |
| **Internal 301 hops** (compare → state, `/louisiana`, sales-tax `newyork`) | All link targets corrected to canonical 200 URLs. |
| **Outdated claim "Trusted by thousands…"** | Replaced in layout with "built on published IRS and state tax-agency figures." |

### Batch 3 — Content / linking / E-E-A-T
| Issue | Fix |
|---|---|
| **"Slabs" terminology** in federal-tax-brackets blog JSON/POST (title, metaTitle, tags, content) and blog-index listing | Replaced with "Rates"; tags `income tax slab in usa` → `federal tax rates`; content body "income tax slab in USA" → "income tax rates in the USA". Syndication regenerated (59 posts, 632KB). |
| **Near-orphan pages**: `/research/*` (6 pages) and `/inflation-calculator` each had 1 inlink | Added a **Research & Data** link group to the global `seo-navigation.tsx` so every page links to all 6 studies + the inflation calculator. |
| **"91+ calculators" claim** — count is exactly 91 | Embed page now says "91 free calculators." |

## 2. Accuracy / correctness fixes (batch e91c7fa)
- Applied IRS **2026** figures (IR-2025-103): standard deduction $16,100/$32,200/$24,150; bracket thresholds for single/MFJ/HoH; SS wage base $184,500; estate exclusion $15M; annual gift $19,000; non-citizen spouse $194,000; HSA $4,400/$8,800; FSA $3,400; EITC max $8,231 — across `src/lib/tax-config.ts`, `resources/page.tsx`, `tax-data/page.tsx`, `webmcp-provider.tsx`, `tax-data-client.tsx` (incl. `max` 626351 bug), `faq-data.ts`, and ~18 blog JSONs.
- Added `tests/calculator-accuracy.test.ts` — 18 tests, all passing (see SEO-TEST-RESULTS.md).

## 3. Files modified (this branch vs base 15c4f18)
`src/middleware.ts` · `src/lib/calc-not-found.ts`?? (none) · `src/lib/compare-config.ts` · `src/app/compare/[states]/page.tsx` · `src/app/compare/[states]/compare-ssr-content.tsx` · `src/lib/calculator-routes.ts` · `src/app/[calculator]/page.tsx` · `src/app/blog/[slug]/page.tsx` · `src/app/layout.tsx` · `src/app/salary/[amount]/page.tsx` · `src/app/hourly/[rate]/page.tsx` · `src/lib/salary-calculations.ts` · `src/lib/hourly-calculations.ts` · `src/lib/_content.ts` · `content/blog/sales-tax-by-state-guide-2026.json` · `src/lib/faq-data.ts` · `src/app/resources/page.tsx` · `src/app/tax-data/page.tsx` · `src/components/finance/webmcp-provider.tsx` · `src/components/finance/tax-data-client.tsx` · ~18 `content/blog/*.json` · `src/lib/blog-index.ts` · `src/components/finance/seo-navigation.tsx` · `src/app/embed/page.tsx` · `src/app/federal-tax-brackets/page.tsx` · `src/generated/syndication-content.ts` · `tests/calculator-accuracy.test.ts` · `package.json` · `.gitignore` · this doc set.

## 4. Decisions taken
- Removed the embedded `?embed=1` query-strip entirely rather than patching the cache key — root cause was server/edge caching, not the embed page itself.
- Kept hash-based referral/signup routes as-is (they are share links by design, not IDOR).
- Kept `typescript.ignoreBuildErrors: true` as is; pre-existing tsc errors not in changed files are untouched (see REMAINING-TASKS.md).
- Did **not** disable browser caching globally; only the removed param-strip removed the bad redirect. Browser Cache TTL on Cloudflare still overrides `max-age=0` → owner action.

## 5. Estimated new SEO score (methodology below)
Previous audit ~ (report in original revision). This change set is a quality fix pass, not a score-calculation pass. Use GSC Performance, PageSpeed Insights, and the crawl diff for the authoritative numbers. **No ranking promises.**

**Method:** score estimates combine on-page title/bracket freshness, internal-link coverage, redirect hygiene, and robots/indexability, weighted 40/30/20/10. Actual scoring requires GSC/crawler data not available in this env (see REMAINING-TASKS).