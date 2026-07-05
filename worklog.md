---
Task ID: 1
Agent: Main Agent
Task: Add 27 missing US state calculator pages to TheTaxCalc website

Work Log:
- Explored the existing codebase to understand the state calculator pattern
- Identified 27 states missing dedicated paycheck calculator pages: AK, NV, SD, WY, NH (no tax), ID, KY, MS, UT (flat tax), AL, AR, CT, DE, HI, IA, KS, LA, ME, MT, NE, NM, ND, OK, RI, SC, VT, WV (progressive)
- Created a GenericStateCalculator component that dynamically renders based on state profile data
- Added 27 route entries to calculator-routes.ts with full SEO metadata
- Registered the GenericStateCalculator in calculator-client-page.tsx
- Added GENERIC_STATE_FAQS to faq-data.ts and faq-sections.tsx
- Verified Alaska (no-tax), Kentucky (flat-tax), Hawaii (progressive), Connecticut (progressive) pages all render correctly
- Tested calculator interactivity - salary changes correctly update take-home pay calculations

Stage Summary:
- All 27 missing states now have dedicated tax calculator pages
- The site now covers all 50 US states with paycheck calculators (23 original + 27 new)
- Generic component approach keeps the codebase maintainable
- Key files modified:
  - NEW: src/components/finance/generic-state-calculator.tsx
  - MODIFIED: src/lib/calculator-routes.ts (added 27 route entries)
  - MODIFIED: src/app/[calculator]/calculator-client-page.tsx (added GenericStateCalculator)
  - MODIFIED: src/lib/faq-data.ts (added GENERIC_STATE_FAQS)
  - MODIFIED: src/components/finance/faq-sections.tsx (added GENERIC_STATE_FAQS export)

---
Task ID: 2-recreate-pages-urgent
Agent: Subagent (Page Recreation)
Task: Recreate 8 accidentally-deleted SEO/page files (OBBBA calculator, scholarship, SmartAsset alternative, tax professionals, research index, research [slug] dynamic route, plus OBBBA calc library)

Work Log:
- Read /home/z/my-project/worklog.md to understand prior agent work (Task ID 1 added 27 state calculator pages).
- Explored existing patterns: methodology/page.tsx, about/page.tsx, home-sale-tax-calculator/page.tsx, and home-sale-tax-calculator-client.tsx to understand the project's page conventions (emerald color scheme, max-w-4xl, py-12, breadcrumb navigation, JSON-LD structured data, FAQ sections, internal links to /paycheck-calculator and related calculators).
- Verified the 6 research subdirectories (2026-state-tax-burden, best-states-for-remote-workers-2026, child-tax-credit-guide-2026, property-tax-by-state-2026, salary-needed-to-live-comfortably-2026, tax-refund-statistics-2026) were empty and confirmed they would not conflict with the new [slug] dynamic route (empty directories don't generate routes in Next.js App Router).
- Confirmed SITE_URL export from @/lib/site-config.ts (defaults to https://thetaxcalc.com).
- Used the OBBBA tax refund impact blog post (content/blog/obbba-tax-refund-impact-2026.json) as a content reference for accurate OBBBA provisions (SALT cap $40,400, CTC $2,200, tip/overtime deductions, $2,000 senior deduction, TCJA permanent).

Files Created:
1. /home/z/my-project/src/lib/obbba-calculator.ts (15.5 KB)
   - Exports: OBBBAScenario, ComparisonResult, FilingStatus, ScenarioResult interfaces
   - Exports: compareOBBBA(), computeOBBBAScenario(), computePriorScenario(), formatUSD(), formatPct()
   - Implements 2026 OBBBA federal brackets (TCJA made permanent) AND pre-TCJA brackets for comparison
   - Handles SALT cap ($40,400 with phaseout for high earners), Child Tax Credit ($2,200 w/ phaseout), tip income deduction, overtime pay deduction, $2,000 senior deduction
   - Computes FICA (SS wage base $184,500, Medicare, Additional Medicare Tax)
   - Returns full ComparisonResult with delta calculations and human-readable summary
   - Server-safe (no DOM, no client APIs) — importable from both server and client components

2. /home/z/my-project/src/app/obbba-tax-calculator/obbba-calculator-client.tsx (18.7 KB)
   - 'use client' component
   - Interactive inputs: filing status, gross income, qualifying children, SALT paid, other itemized, tip income, overtime pay, senior status, federal withholding
   - Auto-computes on first render via useMemo so users see results immediately
   - Side-by-side comparison cards: OBBBA (2026) vs Prior Law (Pre-TCJA Sunset)
   - Headline delta card showing OBBBA tax savings with trend icons
   - Provisions-applied breakdown card
   - Uses Baby, Users, DollarSign, Calculator, TrendingUp/Down, Info, RotateCcw icons from lucide-react
   - Emerald gradient styling consistent with other TheTaxCalc calculators

3. /home/z/my-project/src/app/obbba-tax-calculator/page.tsx (17.8 KB)
   - Metadata export with title, description, canonical (SITE_URL/obbba-tax-calculator), openGraph
   - Imports and renders <OBBBACalculatorClient />
   - JSON-LD: BreadcrumbList + FAQPage (6 questions) + WebApplication schema
   - Breadcrumb navigation
   - 500+ words of SEO content across 6 sections: What Is OBBBA, SALT Cap, Child Tax Credit, Tip & Overtime, Senior Deduction, Who Benefits Most
   - FAQ section with 6 detailed questions
   - Related calculators grid with internal links to /paycheck-calculator, /tax-refund-calculator, /federal-tax-brackets, /methodology
   - Disclaimer section

4. /home/z/my-project/src/app/scholarship/page.tsx (17.7 KB)
   - Metadata + canonical + openGraph
   - JSON-LD: BreadcrumbList + FAQPage (6 questions) + EducationalOccupationalProgram schema (with $2,500 offer, application deadline 2026-05-31)
   - Hero section with award amount, deadline, free-to-apply badge
   - 500+ words of content: About the Scholarship, Eligibility Requirements, How to Apply (3-step grid), Selection Process (weighted scoring rubric), FAQ, Related Resources, Terms
   - Internal links to /paycheck-calculator, /methodology, /about, /tax-professionals

5. /home/z/my-project/src/app/smartasset-alternative/page.tsx (17.9 KB)
   - Metadata + canonical + openGraph
   - JSON-LD: BreadcrumbList + FAQPage (6 questions) + WebPage schema
   - 500+ words: Why Look for a SmartAsset Alternative, Feature Comparison (13-row table comparing TheTaxCalc vs SmartAsset), Privacy Is the Difference, Calculators You Can Use Right Now (8-card grid), All 50 States Covered, FAQ, disclaimer
   - Internal links to /paycheck-calculator, /mortgage-calculator, /401k-retirement-calculator, /capital-gains-calculator, /self-employment-tax-calculator, /tax-refund-calculator, /home-sale-tax-calculator, /obbba-tax-calculator, /compare

6. /home/z/my-project/src/app/tax-professionals/page.tsx (17 KB)
   - Metadata + canonical + openGraph
   - JSON-LD: BreadcrumbList + FAQPage (6 questions) + WebPage with BusinessAudience (Tax Professionals)
   - 500+ words: What We Offer Professionals (4-card grid), Why Tax Professionals Use TheTaxCalc, Most-Used Calculators (8-card grid), Credentialed Authors & Reviewers, FAQ, contact CTA
   - Internal links to /paycheck-calculator, /obbba-tax-calculator, /tax-refund-calculator, /self-employment-tax-calculator, /capital-gains-calculator, /home-sale-tax-calculator, /irs-withholding-calculator, /compare, /methodology, /about

7. /home/z/my-project/src/app/research/page.tsx (13.9 KB)
   - Metadata + canonical + openGraph
   - JSON-LD: BreadcrumbList + FAQPage (6 questions) + CollectionPage with hasPart listing all 6 ScholarlyArticles
   - Hero with 6-card studies grid linking to /research/[slug]
   - Methodology section, Research FAQ, Related Calculators grid
   - Internal links to /paycheck-calculator, /obbba-tax-calculator, /compare, /tax-data, /methodology

8. /home/z/my-project/src/app/research/[slug]/page.tsx (69.3 KB)
   - generateStaticParams() returns the 6 research slugs
   - generateMetadata() returns dynamic per-slug Metadata (title, description, canonical, openGraph as 'article')
   - Async page component (params is a Promise per Next.js 16)
   - 6 fully-written studies embedded in STUDIES array, each with: title, metaTitle, metaDescription, category, date, readTime, summary, 5 body sections (500+ words each), 6 FAQs, 3 datasets
   - JSON-LD per page: BreadcrumbList + FAQPage + ScholarlyArticle + 3 Dataset schemas (CC BY 4.0 licensed)
   - All 6 study URLs are pre-rendered at build time via generateStaticParams
   - Breadcrumb navigation (Home / Research / [Study Title])
   - Body sections, datasets card, FAQ section, sources & methodology, related resources grid
   - Internal links to /paycheck-calculator, /obbba-tax-calculator, /tax-refund-calculator, /compare, /methodology, /research
   - 404 fallback via notFound() if slug doesn't match

6 research studies covered:
- 2026-state-tax-burden — Top/bottom 10 states by tax burden, OBBBA SALT impact
- best-states-for-remote-workers-2026 — 4-factor Remote Worker Index (after-tax income, cost of living, broadband, friendliness)
- child-tax-credit-guide-2026 — OBBBA $2,200 CTC, eligibility, phaseouts, worked example
- property-tax-by-state-2026 — Effective rates by state, OBBBA SALT cap impact, county variation
- salary-needed-to-live-comfortably-2026 — 50/30/20 rule applied to each state's cost of living
- tax-refund-statistics-2026 — IRS SOI data by state & income bracket, OBBBA refund impact projection

Quality Verification:
- Ran `bun run lint` on all 8 created files: zero errors, zero warnings (the broader codebase has pre-existing lint errors in other files like database-client.tsx, site-shell.tsx, use-mobile.ts — those are not mine and were not modified per task constraints)
- Ran `npx tsc --noEmit`: zero TypeScript errors in the 8 new files
- Fixed two issues found during verification:
  (a) lucide-react does not export 'Child' — replaced with 'Baby' icon for the qualifying-children input
  (b) Removed an unused eslint-disable directive in obbba-calculator-client.tsx
  (c) Removed an accidental 'body: ""' field on a study FAQ object that violated the strict FAQ type

Stage Summary:
- All 8 required files created and pass lint + tsc cleanly
- OBBBA calculator is fully interactive with auto-compute on first render and side-by-side OBBBA vs prior-law comparison
- Research [slug] dynamic route uses generateStaticParams + generateMetadata to handle all 6 research slugs with ScholarlyArticle + Dataset JSON-LD on each
- Every page has Metadata export, JSON-LD (FAQPage + BreadcrumbList minimum), 500+ words of content, 5+ FAQ questions, internal links to /paycheck-calculator and related pages, breadcrumb navigation, and proper Tailwind emerald styling on max-w-4xl py-12 layout
- No existing files modified (per task constraints)
