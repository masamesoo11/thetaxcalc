# Task 2b: Brand Rename Agent

## Task
Rebrand from TaxYield.io/taxyield to TheTaxCalc/thetaxcalc across all component and config files.

## Summary
- 12 files updated/created
- 23 total brand/domain replacements
- All user-visible strings updated
- No code logic changes (variable/function names preserved)

## Files Changed

| File | Replacements | Details |
|------|-------------|---------|
| header.tsx | 1 | Logo: TaxYield.io → TheTaxCalc |
| footer.tsx | 2 | Logo + copyright |
| blog-detail.tsx | 3 | JSON-LD author, publisher, byline |
| blog-list.tsx | 3 | JSON-LD name, description, H2 heading |
| blog-editor.tsx | 1 | Slug prefix domain |
| admin-dashboard.tsx | 1 | Sidebar brand label |
| admin-settings.tsx | 1 | Site name placeholder |
| admin-gate.tsx | 4 | Password (×2), session key, brand footer |
| cookie-consent.tsx | 3 | localStorage keys (×3) |
| manifest.json | 2 | name + short_name |
| wrangler.toml | 1 | Project name |
| .env.example | NEW | Created with thetaxcalc.com domain |

## Breaking Changes (for existing users)
- Cookie consent localStorage key changed → banner will show again
- Admin session key changed → existing sessions invalidated
- Admin password changed → taxyield2026 → thetaxcalc2026
