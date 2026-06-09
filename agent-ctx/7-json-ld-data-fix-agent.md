# Task 7: JSON-LD & Data Fix Agent

## Task
Fix JSON-LD and data errors in `/src/app/tax-data/page.tsx`

## Changes Made

### Data Fixes (2025 → 2026 values)
1. SS Wage Cap: $176,100 → $184,500 (per SSA)
2. SS Max Employee Tax: $10,918.20 → $11,439.00 (6.2% × $184,500)
3. SE Max SS Tax: $20,157.80 → $22,878.00 (12.4% × $184,500)
4. Standard Deduction Single: $15,000 → $16,100
5. Standard Deduction MFJ: $30,000 → $32,200
6. Standard Deduction HOH: $22,500 → $24,150
7. Standard Deduction MFS: $15,000 → $16,100
8. Additional (Age 65+ or Blind): $1,600/$1,300 → $2,000/$1,600
9. Quick Stats SS Wage Base: $176,100 → $184,500
10. Max SS Tax card: $10,918 → $11,439
11. FAQ SS wage base answer: updated both $176,100 and $10,918.20 references

### JSON-LD Fixes
1. Added `author: { '@id': '${SITE_URL}/tax-data#author' }` to WebPage schema
2. Added Person schema entry in @graph with `@id: '${SITE_URL}/tax-data#author'` using `authorToJsonLd(getCalculatorAuthor())`
3. BreadcrumbList verified correct (2 items, position 2 = current page, item omitted correctly)
4. dateModified already present ('2026-01-15')

### Metadata Fix
- Changed authors from 'TheTaxCalc' to 'Rachel Mitchell, CPA'

## File Modified
- `/src/app/tax-data/page.tsx`

## Verification
- Lint passes cleanly (0 errors in file)
