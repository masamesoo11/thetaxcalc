# FINAL-QA-RESULTS.md

Independent QA of branch `seo/full-site-optimization` → `main` (HEAD `083236b` after review fixes). Reported are **actual run results**; nothing below claims a test that did not run.

## Test results

| Check | Command | Result |
|---|---|---|
| Calculator accuracy (`npm test`) | esbuild bundle → `node --test` | **18 pass / 0 fail** (≈248 ms) |
| Title consistency audit | `scripts/audit-titles.ts` (esbuild-bundled) | **87 calculator routes + 50 sales-tax pages — ERRORS 0, WARNINGS 0** |
| TypeScript (`tsc --noEmit`) — changed files only | `npx tsc --noEmit` | **0 errors in files changed by this branch**; 45 pre-existing errors in untouched files |
| ESLint — changed files | `npx eslint` on 5 changed files | **0 errors** |
| Redirect target existence | verify script bundling `calculator-routes.ts` + static page checks | All middleware redirect targets → real pages (92 routes + static pages OK) |
| robots.ts validity | Read | Correct: allow `/`, disallow `/api/` + `/admin/`, sitemap referenced |
| Sitemap consistency | Read `sitemap-entries.ts` | Curated hourly rates only (avoids 496-page bloat); salary/compare/static entries present |
| JSON-LD home | Grep `page.tsx` | `#webpage` + `#itemlist` nodes present on homepage only (correct after layout removal) |
| Syndication generation | `node scripts/generate-syndication-content.mjs` | "wrote 59 posts (632KB)" |
| `?embed=1` middleware 301 | Static review | Removed; confirmed owner-purged cache |

## Review-fix regression checks
After `083236b` (test TS fix + doc refresh):
- `npm test` → 18/18 pass
- `tsc --noEmit` on `hourly-calculations.ts` + `calculator-accuracy.test.ts` → clean
- No other files touched by the fix commit.

## Not executed (with reasons)
- **Production `next build` in the worktree** — junctioned `node_modules` (symlink points outside the filesystem root) is rejected by Turbopack (`TurbopackInternalError`). CI/Pages builds from a clean `bun install`, and repeated live deploys confirmed the branch deploys correctly, so this is environmental, not a code defect.
- **Live HTTP crawl / PageSpeed / Rich Results** — PageSpeed API returns 429 quota; a full crawl was intentionally not repeated (external reviewer already confirmed live state on each deploy; per-branch crawl is the owner's GSC/Ahrefs action).
- **E2E browser tests** — none exist in the repo; calculator logic is covered by the 18 unit tests.
- **A11y/mobile automated scan** — not present in repo; unverified, flagged in REMAINING-ISSUES.md.