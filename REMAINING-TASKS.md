# REMAINING-TASKS.md

Items that can only be done by the site owner or require external access. **Not** blockers for this branch's merge.

## Requires Cloudflare / hosting account access
1. **Purge cached 301 for `/paycheck-calculator?embed=1`** — the stale cached redirect predates `f08b5ef` and is server/edge-side. Even though the middleware no longer strips the param, Cloudflare's cache key (URL-only) may still serve the old 301 until purged.
2. **Browser Cache TTL** — Cloudflare's `Browser Cache TTL` overrides the `max-age=0` cache header on HTML; configure to respect `no-cache`/short TTL for HTML on `/paycheck-calculator` so embed fixes propagate to visitors.
3. Production build & deploy of branch `seo/full-site-optimization` on the Vercel/Cloudflare Pages side (worktree build via junctioned `node_modules` untested).

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
9. **GSC Performance + Ahrefs** sanity-check, **PageSpeed Insights** (API returns 429 quota exceeded), **Rich Results Test** on checkout of the deployed branch.
10. **CPA/EA human review** of the tax content updates (IRS-figure factual review).

## Optional future optimizations (not this branch)
- Restore `?embed=1` canonicalization via **query-param-normalized cache key** instead of removing param-strip entirely, if the product still needs the embed feature to be bot-indexable.
- Re-add `sitemap-entries.ts` lastmod accuracy (`2026-10-24` hardcoded) and priority sanity pass.
- Generate internal links from blog posts → research studies (contextual, not just global nav).