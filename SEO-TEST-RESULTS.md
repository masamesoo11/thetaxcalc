# SEO-TEST-RESULTS.md

**Date:** 2026-11-16
**Environment:** Windows 11, PowerShell 5.1, Node v24.22.1. Tests run with esbuild bundle + `node --test` (Node 24 type-stripping can't resolve extensionless/`@/` imports).

## Calculator accuracy tests (`npm test`)
Command: `esbuild tests/calculator-accuracy.test.ts --bundle --platform=node --format=esm --outfile=dist-tests/calculator-accuracy.test.mjs && node --test dist-tests/calculator-accuracy.test.mjs`

Result: **18 pass, 0 fail** (346ms).

Covered:
- IRS constants: standard deductions ($16,100/$32,200/$24,150), all bracket thresholds (single/MFJ/HoH), SS wage base $184,500, estate/gift limits.
- Federal tax computations: $30k, $50k, $75k, $100k, $150k, $200k (single); HoH; MFJ $195k = $25,240.
- FICA caps (SS wage base, additional Medicare $200k).
- Slug validation: hourly, salary, compare.
- Texas $75k single take-home ≈ $61,592.50.
- Compare: reversed pairs → canonical via middleware/config null; all 10 canonical pairs build a config.

## Static verification
- `tsc --noEmit` → errors only in pre-existing files **not** touched by this branch: `src/app/api/ads/[id]/route.ts` (8), `src/_api_backup/*` (6), `src/lib/db.ts` (5), `src/app/api/links/[id]/route.ts` (5), `src/lib/kv-blog.ts` (3), `src/components/finance/syndication-panel.tsx` (1). **0 errors in changed files.**
- Title audit (`scripts/audit-titles.ts` via esbuild bundle): "87 calculator routes + 50 sales-tax pages … ERRORS: 0 WARNINGS: 0".
- Post-fix stale-figure scan: clean (only known false positive: Priya's `$15,700` withholding estimate in `irs-withholding-w4-guide-2026.json`).
- `node scripts/generate-syndication-content.mjs` → "wrote 59 posts (632KB)".
- Grep confirm: no `slab` matches remain in src/content; no leftover "91+" claims.

## Manual QA items
Performed where environment allowed (static/compile-level checks):
- `/compare/texas-vs-texas` → parse returns null + 404 path.
- `/hourly/25` → matches curated; `/hourly/22_5-an-hour` → 404/permanentRedirect to canonical; `/hourly/33-an-hour` → noindex for non-curated.
- `/salary/75000-foo` → not matched by anchored regex → permanentRedirect.
- `?embed=1` → no longer subject to param-strip redirect at middleware level. The previously stale Cloudflare edge-cached 301 was **purged by the owner on 2026-11-16** — intended to be live for visitors; external verification in live traffic pending deploy.

## Not verified (no access / external)
- Production build in the worktree via junctioned `node_modules` (Turbopack risk) — not executed.
- PageSpeed Insights (API 429 quota), GSC Performance, Rich Results Test, Ahrefs — no credentials.
- Live `curl` of every route — network policy in this project disallows live fetch testing from this workspace (static analysis only).

## Rollback
Full rollback: `git revert` the three batch commits (`f08b5ef`, `04c7cd9`, `e91c7fa`, `9adb1bc` in reverse order) or delete the branch/worktree. Base is `15c4f18`. No destructive git commands were used.