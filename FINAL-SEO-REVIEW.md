# FINAL-SEO-REVIEW.md

Independent review of `thetaxcalc.com` SEO/technical optimization, branch `seo/full-site-optimization` (→ `main`). Review date: 2026-11-17. Reviewed the full diff `15c4f18..origin/main` (55 files, +759/−320) plus the current working tree on top.

## Scope reviewed
- `src/middleware.ts` (entire file: redirects, security headers, cache policy, embed handling, auth)
- `src/lib/calculator-routes.ts` (53 state/city title+H1 retargets), `compare-config.ts`
- `src/app/hourly/[rate]/page.tsx`, `src/app/salary/[amount]/page.tsx`, `hourly-calculations.ts`, `salary-calculations.ts`
- `src/app/[calculator]/page.tsx`, `src/app/blog/[slug]/page.tsx` (robots spread fix), `src/app/layout.tsx`
- 2026 tax-figure edits: `resources/page.tsx`, `tax-data/page.tsx`, `tax-data-client.tsx`, `webmcp-provider.tsx`, `faq-data.ts`, ~18 blog JSONs
- `editorial-review-note.tsx` (new), `seo-navigation.tsx` (Research & Data links), `federal-tax-brackets/page.tsx`, `embed/page.tsx`, `blog-index.ts`
- `src/app/robots.ts`, `src/lib/sitemap-entries.ts`, homepage JSON-LD in `page.tsx`

## Verdict by area
| Area | Verdict | Notes |
|---|---|---|
| Param-strip/`?embed=1` 301 | PASS | UA-based param-strip removed; embed now renders; CF purge confirmed by owner |
| Compare validation | PASS | `state1===state2` → null; non-canonical pairs 404; reversed pairs 301 in middleware |
| Hourly/salary slugs | PASS | Anchored regexes; non-canonical → `permanentRedirect`; legacy bare slugs 301 in middleware |
| Robots directives | PASS | Spread-fix lets layout default apply; `noindex,follow` preserved only for configured sets |
| JSON-LD | PASS | Sitewide `#webpage-home` removed; homepage declares own `#webpage` + `#itemlist` (verified `page.tsx:204-283`) |
| Internal links | PASS | `/research/*` (6) + `/inflation-calculator` now linked globally in `seo-navigation` |
| 2026 tax figures | PASS | IRS IR-2025-103 values applied consistently across tables/components/FAQ/blog |
| Redirect targets | PASS | All middleware targets resolve to real pages (92 calculator routes + static pages verified) |
| sitemap/robots | PASS | Only curated hourly rates in sitemap (avoids bloat); robots.ts sane |
| Editorial trust | PASS | Visible "How this page is produced" note on `/hourly/*` + `/salary/*` |

## Issues found & fixed during this review
1. **TS2345** in `tests/calculator-accuracy.test.ts:137` — `HOURLY_RATES.includes(33)` failed against the tuple-union type. Root cause: compiled-hourly tuple type excludes non-curated 33. Fixed with `(HOURLY_RATES as readonly number[]).includes(33)`. Semantics unchanged.
2. **Stale doc** in `src/lib/hourly-calculations.ts` — `isIndexableHourlyRate` JSDoc claimed non-curated rates are `noindex`, which contradicted the `6051163` revert decision. Rewritten to document the current "all in-range rates indexable" state and that the helper is retained as a curation hook.

## Deferred / accepted risks
- 45 pre-existing `tsc --noEmit` errors **in files this branch did not touch** (`api/ads/[id]/route.ts`, `api/links/[id]/route.ts`, `lib/db.ts`, `lib/kv-blog.ts`, `_api_backup/*`, calculator components, etc.). `typescript.ignoreBuildErrors` is set in `next.config.ts`, so the production build is unaffected; they remain a code-hygiene debt.
- Local `next build` cannot run in the worktree (junctioned `node_modules` symlink rejected by Turbopack). CI on Pages performs a clean `bun install`; verified live deploys confirm this is not a blocker.
- Cloudflare Browser Cache TTL not verified externally (servers advisory only).