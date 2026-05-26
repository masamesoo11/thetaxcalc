# Task 2 — Compare States Agent

## Task
Create State vs State Tax Comparison pages targeting massive search volume like "illinois vs texas taxes", "florida vs california taxes"

## Files Created
- `/src/lib/compare-config.ts` — Comparison configuration with 5 state data objects, 10 slugs, FAQ builder
- `/src/app/compare/page.tsx` — Landing page listing all 10 comparisons
- `/src/app/compare/[states]/page.tsx` — Dynamic comparison page with full SEO

## Files Modified
- `/src/app/sitemap.ts` — Added /compare and /compare/{slug} entries
- `/src/components/finance/header.tsx` — Added "Compare" nav link (desktop + mobile)
- `/src/components/finance/footer.tsx` — Added "Compare States" links

## Key Decisions
- Used `taxConfigKey` field in CompareStateData to handle the mapping between URL slugs ('new-york') and STATE_PROFILES keys ('newyork')
- All take-home pay calculations use `calculatePaycheck()` from finance-utils for accuracy
- FAQ content is dynamically generated per comparison using the state data
- Green highlighting in comparison table indicates lower tax burden / higher take-home pay
- Server Components throughout, no client-side JS needed for comparison pages

## Lint Status
✅ Zero errors
