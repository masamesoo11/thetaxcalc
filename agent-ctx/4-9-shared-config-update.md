# Task 4-9: Shared Config Update for 8 New States

## Task Description
Update 6 shared configuration files to add 8 new state tax calculators: Massachusetts, Indiana, Tennessee, Missouri, Maryland, Wisconsin, Minnesota, Oregon.

## Work Log

### Files Modified

1. **src/lib/calculator-routes.ts**
   - Added 8 new route entries BEFORE the Virginia entry
   - Each entry includes: slug, title, description, h1, metaTitle, metaDesc, keywords, componentKey, category, breadcrumbLabel, ogTitle, ogDescription, canonicalPath, jsonLdType
   - Massachusetts: componentKey='massachusetts', slug='massachusetts-tax-calculator', 5% flat / 9% over $1M
   - Indiana: componentKey='indiana', slug='indiana-tax-calculator', 3.05% flat
   - Tennessee: componentKey='tennessee', slug='tennessee-tax-calculator', 0% income tax
   - Missouri: componentKey='missouri', slug='missouri-tax-calculator', 2%-4.8% progressive
   - Maryland: componentKey='maryland', slug='maryland-tax-calculator', 2%-5.75% + county
   - Wisconsin: componentKey='wisconsin', slug='wisconsin-tax-calculator', 3.54%-7.65%
   - Minnesota: componentKey='minnesota', slug='minnesota-tax-calculator', 5.35%-9.85%
   - Oregon: componentKey='oregon', slug='oregon-tax-calculator', 4.75%-9.9%, no sales tax

2. **src/app/[calculator]/calculator-client-page.tsx**
   - Added 8 dynamic imports for calculator components
   - Added 8 switch cases in CalculatorClientPage function

3. **src/app/[calculator]/_jsonld.ts**
   - Added 8 FAQ imports from @/lib/faq-data
   - Added 8 JSON-LD generator functions (getMassachusettsJsonLd, getIndianaJsonLd, etc.)
   - Added 8 switch cases in getJsonLdForType function

4. **src/app/[calculator]/_content.ts**
   - Added 8 FAQ imports from @/lib/faq-data
   - Added 8 content entries with howItWorks, keyRates, faqs, relatedCalculators for each state
   - Each state has 4 paragraphs of howItWorks content with relevant links

5. **src/app/[calculator]/page.tsx**
   - Added 8 blog slug entries in CALCULATOR_BLOG_SLUGS
   - Expanded getOtherStates to include all 23 states (15 existing + 8 new)
   - Added 8 FAQ heading cases in getFaqHeading function
   - Added 8 getNextSteps cases with state-specific comparison links
   - Updated "Compare with Other States" array to include all 23 state keys

6. **src/components/finance/header.tsx**
   - Added 8 items to "By State" category in CALC_CATEGORIES
   - Added 8 entries to KEY_TO_ICON map (all using MapPin icon)

### Verification
- All 8 FAQ constants verified to exist in @/lib/faq-data (MASSACHUSETTS_FAQS, INDIANA_FAQS, TENNESSEE_FAQS, MISSOURI_FAQS, MARYLAND_FAQS, WISCONSIN_FAQS, MINNESOTA_FAQS, OREGON_FAQS)
- ESLint passed with zero errors on all 6 modified files

## Summary
- All 6 shared configuration files updated with 8 new state calculator entries
- Total states with dedicated calculators: 23 (up from 15)
- Zero lint errors introduced
- All existing functionality preserved
