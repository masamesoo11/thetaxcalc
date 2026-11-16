# REMAINING-TASKS.md

Items that can only be done by the site owner or require external access. **Not** blockers for this branch's merge.

## Requires Cloudflare / hosting account access
1. **~~Purge cached 301 for `/paycheck-calculator?embed=1`~~** — **DONE by owner on 2026-11-16.** The stale cached 301 (predating `f08b5ef`) is now purged; visits to `?embed=1` should hit the current middleware behavior. Verify once in normal traffic after deploy.
2. **~~Browser Cache TTL~~** — **Resolved by removing the broken `deploy.yml` and relying on Cloudflare Pages Git integration**, which serves fresh HTML on each deploy; no `max-age=0` override issue was observed in the reviewer's live checks. If a stale `?embed=1` response ever returns, re-check this setting.
3. **~~Production build & deploy~~** — **DONE / auto.** Pages↔GitHub integration deploys `main` on every push; reviewer and this agent confirmed live changes (`/hourly/60-an-hour` old noindex, nav inflation link) before the final noindex revert commit `6051163`. The worktree's junctioned `node_modules` is irrelevant to production (CI installs fresh). The legacy broken GitHub Actions `deploy.yml` was removed in `ec56f8d`.

## Requires owner decision / verification
4. **`foundingDate: "2022"`** in `src/app/layout.tsx` (Organization schema) — verify against actual founding, otherwise the date is a factual claim the site must stand behind.
5. **"My friend Rachel…" anecdote** in `content/blog/why-texas-has-no-income-tax.json` — first-person testimonial-style story; confirm it reflects a real person's story or consider softening to a generic example to avoid E-E-A-T/factuality questions. Same text appears in `src/data/seed-blog-posts.ts` (regenerate via seed if changed).
6. **Unverified tax figures** that were **not** changed (flagged during audit, need a credentialed reviewer):
   - Long-term capital gains thresholds in `home-sale-tax-calculator` (audit noted possible stale values).
   - North Dakota state brackets (`$48,475` threshold in ND data).
   - 401(k) limit `$24,500` and IRA `$7,000` (2026 values appear in blog copy; verify optional limits).
   - Child Tax Credit `$2,200` under OBBBA (repeated in research/child-tax-credit guide).
   - W-4 couple estimated withholding figures in `irs-withholding-w4-guide-2026.json` (Priya example).
7. **Secret rotation** — GitHub PAT and Cloudflare token were pasted earlier in the session; rotate them, plus `ADMIN_PASSWORD`. Values must never be committed; `src/lib/auth.ts` reads `ADMIN_PASSWORD` from env only.
8. **Junk tracked files** — `dev-home2.html` and `dev-sitemap.xml` are tracked in the original clone; decide to remove.

## Requires subscriptions / access
9. **~~GSC Performance sanity-check~~** — **DONE using exported XLSX** (`C:\Users\fito1\OneDrive\Desktop\مجلد جديد (6)`: Coverage + Performance-on-Search 2026-11-16) — confirmed real impressions on non-curated hourly rates, which closed the noindex decision. **Still external:** Ahrefs / PageSpeed Insights (API 429) / Rich Results Test if deeper checks are desired.
10. **CPA/EA human review** of the tax content updates (IRS-figure factual review).

## Optional future optimizations (not this branch)
- If explicit curation is ever preferred over "index all hourly rates", re-apply `robots: noindex,follow` for non-curated rates in `src/app/hourly/[rate]/page.tsx` (the helper `isIndexableHourlyRate()` still exists in `src/lib/hourly-calculations.ts`).
- Restore `?embed=1` canonicalization via **query-param-normalized cache key** instead of removing param-strip entirely, if the product still needs the embed feature to be bot-indexable.
- Re-add `sitemap-entries.ts` lastmod accuracy (`2026-10-24` hardcoded) and priority sanity pass.
- Generate internal links from blog posts → research studies (contextual, not just global nav).