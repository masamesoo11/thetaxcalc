# Task 39-b Work Record — full-stack-developer (Retirement group)

Project: thetaxcalc.com (Next.js 16 App Router + TS + Tailwind 4 + shadcn/ui, deployed via Cloudflare Pages)
Scope: 2 new calculators — /retirement-calculator and /roth-ira-calculator. NEW files only; no existing file touched; no server started/stopped; no build; no commit.

## Files created (exactly 4)

1. src/lib/retirement-math.ts — pure math library:
   - futureValueWithMonthlyContributions(P, C, annualReturnPct, years): monthly rate i = annual/12 (standard bank-statement convention, documented; NOT (1+annual)^(1/12)-1); FV = P(1+i)^n + C[((1+i)^n - 1)/i], n = years*12.
   - inflationAdjust(value, inflationPct, years) = value/(1+infl)^years; plus inflateToNominal helper.
   - fourRuleIncome(nestEgg, withdrawalPct=4).
   - requiredContribution(target, principal, returnPct, years): algebraic inverse of the FV formula; clamps at 0.
   - rothPhaseOut(magi, filing): {allowedMultiplier 0..1, phaseOutLabel, inPhaseOut, blocked}; linear proration inside the band; MFS simplified to $10,000-$12,000.
   - 2026 constants: IRA_CONTRIBUTION_LIMIT_2026 7500, IRA_CATCH_UP_2026 1150, ROTH_PHASE_OUT_2026 single [150000,165000] / mfj [236000,246000] / mfs [10000,12000].
2. src/components/finance/retirement-calculator.tsx — RetirementCalculator (default export named export RetirementCalculator).
3. src/components/finance/roth-ira-calculator.tsx — RothIraCalculator (named export).
4. src/lib/calculators-additions/retirement-additions.ts — RETIREMENT_ROUTES, AdditionContentShape, RETIREMENT_CONTENT, RETIREMENT_HUB_CARDS.

## 2026 figures and provenance

- From site's own config (tax-config.ts): SS wage cap $184,500 (FICA_2026), standard deductions $16,100/$32,200/$24,150 (FEDERAL_TAX_2026).
- NOT in tax-config → 2026 IRS COLA values used per orchestrator brief, provenance-commented in retirement-math.ts: IRA/Roth limit $7,500 + $1,150 catch-up (50+); Roth MAGI phase-out Single/HoH $150,000-$165,000, MFJ $236,000-$246,000, MFS ~$10,000-$12,000; 401(k) $24,500 + $8,000 catch-up + $11,250 super catch-up (60-63, OBBBA) — matches the existing 401(k) tool's constants.

## Canonical worked examples (bun-verified against the shipped module)

Retirement calculator defaults (age 35, retire 67 → 32 years, $25,000 saved, $500/mo, 7% return, 3% inflation, $60,000 desired income):
- Nominal nest egg at 67: $947,515.45
- Today's dollars: $367,955.34
- 4% sustainable income (today's $): $14,718.21
- Verdict: Behind — shortfall $45,281.79/yr, coverage 24.5%
- 25x target: $1,500,000; required monthly contribution: $886.78 (vs current $500 → +$386.78)
- Deposits $217,000 vs growth $730,515.45
- Sensitivities verified for copy: +$100/mo → +$142,841 nominal; start at 45 → $428,416.98; 8% → $1,207,638.53; 6% → $748,550.57; 1.03^32 = 2.5751; $60k today = $154,504.97 nominal in 32y.

Roth IRA defaults (age 30, single, MAGI $120,000, $7,500/yr, 7%, withdrawal age 60 → 30 years; monthly-spread $625 model):
- Projected balance: $762,481.87; contributions $225,000; growth $537,481.87
- Taxable comparison (15% one-time on gains at withdrawal): $681,859.59 → Roth edge $80,622.28
- Phase-out: $155k single → multiplier 2/3 → $5,000 allowed; $240k MFJ → 0.6 → $4,500; $165k+ single / $246k+ MFJ / $12k+ MFS → blocked; $11k MFS → 0.5 → $3,750
- Copy sensitivities verified: 5% → $520,161.65; 9% → $1,144,214.68; catch-up 55→70 delta $30,375.55.

## Gates

- bunx eslint on all 4 new files: 0 problems (project baseline of 12 pre-existing problems in OTHER files untouched).
- bunx tsc --noEmit: 0 errors in my files. (FYI for orchestrator: sibling calculators-additions/savings-additions.ts currently has TS parse errors — not mine, not touched.)
- SEO self-check script: titles 50/51 chars; descriptions 155/156 (target 150-158); metaTitles 55/56 (audit gate 30-65, unique, no cross-contamination); metaDescs 151/153; hub descs 35/41 chars; FAQ word counts 88-109 (target 80-150); 6 howItWorks (retirement) / 5 (roth); 6 keyRates each; 6 related each; FAQs unique vs RETIREMENT_FAQS and COMPOUND_INTEREST_FAQS (sufficiency/eligibility angles only).
- No 50-state loops; no recharts (pure SVG, salary-chart language); no console.log/TODO/emoji/fetch; ASCII-clean (entities &frac12; in JSX, literal ½ only where matching existing faq-data.ts precedent); responsive at 390px (overflow-x-auto chart/table wrappers, collapsing grids, 44px touch targets).

## Integration map for the orchestrator

- componentKey -> slug: 'retirement-planning' -> /retirement-calculator; 'roth-ira' -> /roth-ira-calculator. ('retirement' key is already taken by the 401(k) tool.)
- Splices needed (existing files, orchestrator-owned): RETIREMENT_ROUTES into CALCULATOR_ROUTES; lazy map + switch case in calculator-client-page.tsx ('retirement-planning' → RetirementCalculator, 'roth-ira' → RothIraCalculator); getCalculatorContent cases for 'retirement-planning'/'roth-ira' serving RETIREMENT_CONTENT; getJsonLdForType cases for jsonLdType 'retirement-planning'/'roth-ira'; SPECIAL_CARDS merge of RETIREMENT_HUB_CARDS; sitemap +2 URLs.
- Cross-links: retirement ↔ roth-ira ↔ 401k-retirement-calculator ↔ compound-interest-calculator; retirement page copy explicitly says it COMPLEMENTS (not duplicates) the 401(k) tool.
