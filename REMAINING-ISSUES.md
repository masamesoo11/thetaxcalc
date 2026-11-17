# REMAINING-ISSUES.md

Open items after the final review. Split into: (A) code-level, optional; (B) owner/external; (C) testability gaps. None block the current `main` deployment.

## A. Code-level (can be done later in this repo)
1. **`isIndexableHourlyRate` is now unused by any page** (kept as a curation hook by decision). If no curation policy ever returns, consider deleting it + its test lines to reduce surface. Low priority.
2. **`isLegacyRateSlug` / `isLegacySalarySlug`** — test file still references them; they remain exported for tests but no page consumes them. Same cleanup category as #1.
3. **Sitemap lastmod constants** — `siteUpdate`/`taxYearUpdate` are static strings; they could drift from real content updates. Optional: derive from latest git commit date or content `updatedAt`.
4. **`foundingDate: "2022"`** in `layout.tsx` Organization schema — owner to verify this is the real founding year.
5. **"My friend Rachel…" anecdote** in `content/blog/why-texas-has-no-income-tax.json` (also in `src/data/seed-blog-posts.ts`) — confirm it reflects a real person or soften to a generic example.
6. **Unverified tax figures** (flagged earlier, need credentialed review, were NOT changed): LTCG thresholds in `home-sale-tax-calculator`; ND brackets (`$48,475`); 401(k) `$24,500` / IRA `$7,000`; CTC `$2,200`; W-4 couple withholding (Priya example).
7. **Junk tracked files** in the *original* clone: `dev-home2.html`, `dev-sitemap.xml` — decide remove.
8. **45 pre-existing `tsc --noEmit` errors** in files this branch never touched (API routes, `lib/db.ts`, `lib/kv-blog.ts`, `_api_backup/`, several calculator components). Mitigated by `typescript.ignoreBuildErrors`; a dedicated cleanup batch would remove them.
9. **Local-build limitation** — worktree `node_modules` is a junction; to build locally, `bun install` into a normal directory (or use the original clone's node_modules copy) and run `build:cf`. Production is unaffected.

## B. Owner / external (credentials, accounts, services)
1. **Rotate all secrets shared in chat**: GitHub PATs (fine-grained + classic), Cloudflare token, `ADMIN_PASSWORD`. None appear in any commit/report.
2. **Ghost tokens**: the GitHub credentials in the local credential store remain valid; reject them after final push (`git credential reject`).
3. **Google AdSense (pub-5542276525674040) re-application** — after: publishing disavow file, adding a real founder page (owner input), and waiting for re-crawl. Detailed in `REMAINING-TASKS.md`.
4. **Disavow file**: `C:\Users\fito1\AppData\Local\Temp\kilo\disavow-suggested.txt` (29+2 domains) — upload to Google's disavow tool (PBN dofollow set only; nofollow spam omitted by design).
5. **Ahrefs/Ahrefs API** — not available (401 with provided key). Backlink review used the Ahrefs UI export the owner pasted + local `upload/backlinks-*.csv`.

## C. Testability gaps (would need tooling not present)
1. **PageSpeed Insights** — API 429 quota; run manually once quota resets.
2. **Rich Results Test / structured-data validator on live URLs** — requires login/tool access; JSON-LD already statically verified.
3. **Mobile/a11y automated scan** — no such runner in the repo.
4. **E2E browser tests** — none; only unit tests exist.

## Rollback instructions
- Revert the review-fix commit only: `git revert 083236b`
- Revert the full SEO branch to `main` baseline: `git revert` (in order) `edab619`→`248dbbf`, or reset the branch to `ec56f8d` and re-apply docs.
- Production: each `main` push redeploys via Cloudflare Pages Git integration automatically; no manual rollback step is available other than pushing a reverting commit or using the Pages dashboard "Rollback" to a previous deployment.