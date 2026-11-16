# SEO-CHANGES.md

Changelog of every change on branch `seo/full-site-optimization` vs base `15c4f18`.

## Batch 1 — `f08b5ef`
- **`src/middleware.ts`**
  - Removed the UA-based "strip query params for bots" block (root cause of cached 301 on `?embed=1`). Edge cache keys on URL only; `no-store` unreliable. `?embed=1` now renders the embed.
  - Added `/compare/california-vs-florida` → `/compare/florida-vs-california` 301.
  - Added `/hourly/{digits}` → `/hourly/{n}-an-hour` 301 (whole-dollar only).
- **`src/lib/compare-config.ts`** — `parseComparisonSlug` returns `null` when `state1 === state2`; `getCompareConfig` returns null unless slug in `COMPARISON_SLUGS`.
- **`src/lib/calculator-routes.ts`** — all 53 state/city routes retargeted: H1 → `"{Name} Paycheck Calculator"`, metaTitle → `"{Name} Paycheck Calculator 2026 — {hook}"` (hooks reused; hand-written overrides for CA/NY/NYC/LA/Chicago; all 46–63 chars).

## Batch 2 — `04c7cd9`
- **`src/lib/hourly-calculations.ts`** — `slugToRate` anchored `/^(\d+(?:\.\d{1,2})?)(?:-an-hour)?$/`; added `isIndexableHourlyRate()` (curated `HOURLY_RATES` only).
- **`src/lib/salary-calculations.ts`** — `slugToSalary` → `/^(\d+)(?:-after-taxes)?$/`.
- **`src/app/hourly/[rate]/page.tsx` + `src/app/salary/[amount]/page.tsx`** — non-canonical slug → `permanentRedirect(canonical)`; `robots {index:false,follow:true}` for non-curated hourly rates; `generateStaticParams` emits `salaryToSlug(amount)`; removed legacy canonical-link blocks and `isLegacy*Slug` usage.
- **`src/app/[calculator]/page.tsx`, `src/app/blog/[slug]/page.tsx`** — `robots: cond ? {…} : undefined` → spread `...(cond ? {robots:{index:false,follow:true}} : {})` so layout default applies.
- **`src/app/layout.tsx`** — removed sitewide `#webpage-home` WebPage node and unused `TOTAL_CALCULATOR_COUNT` import; claim "Trusted by thousands of users…" → "built on published IRS and state tax-agency figures."
- **Internal 301 hops fixed** — `compare-ssr-content.tsx` `/${stateSlug}` → `/${stateSlug}-tax-calculator` (both states); `_content.ts` `/louisiana` → `/louisiana-tax-calculator`; `content/blog/sales-tax-by-state-guide-2026.json` 2× `/sales-tax-calculator/newyork` → `-new-york`; regenerated syndication (59 posts, 632KB).

## Accuracy — `e91c7fa`
- 2026 IRS figures applied to `src/app/resources/page.tsx` (3 bracket tables + example prose $11,925→$12,400), `src/app/tax-data/page.tsx` (3 tables + cumulative tax column), `src/components/finance/webmcp-provider.tsx`, `src/components/finance/tax-data-client.tsx` (`BRACKET_DATA_SINGLE`, incl. `max: 626350+1` bug), `src/lib/faq-data.ts` ("$48,351 to $103,350" → "$50,401 to $105,700"), plus ~18 blog JSONs.
- `tests/calculator-accuracy.test.ts` + `package.json` `test` script; `/dist-tests/` added to `.gitignore`.

## Batch 3 — `9adb1bc`
- **`src/lib/blog-index.ts`** — federal-tax-brackets listing: title → "2026 Federal Tax Brackets: Complete Guide to US Income Tax Rates"; metaTitle → "2026 Federal Tax Brackets: US Income Tax Rates & Deductions Guide"; tag `income tax slab in usa` → `federal tax rates`.
- **`content/blog/federal-tax-brackets-2026-guide.json`** — title/metaTitle "…Rates, Slabs, 2025 Comparison…" → "…Rates, 2025 Comparison…"; tags cleaned; content header + "income tax slab in USA" → "income tax rates in the USA".
- **`src/components/finance/seo-navigation.tsx`** — new "Research & Data" link group (global nav): `/research/2026-state-tax-burden`, `/research/property-tax-by-state-2026`, `/research/salary-needed-to-live-comfortably-2026`, `/research/tax-refund-statistics-2026`, `/research/best-states-for-remote-workers-2026`, `/research/child-tax-credit-guide-2026`, `/inflation-calculator`.
- **`src/app/embed/page.tsx`** — "91+ calculators" → "91 free calculators" (exact count).
- **`src/app/federal-tax-brackets/page.tsx`** — "Slabs" removed from title/OG/Twitter/JSON-LD name (earlier partial edit committed here).
- **`src/generated/syndication-content.ts`** — regenerated.

## Docs
- Added `SEO-PROJECT-STATE.md`, `SEO-IMPLEMENTATION-REPORT.md`, `SEO-CHANGES.md`, `SEO-TEST-RESULTS.md`, `REMAINING-TASKS.md`.