# Work Record — Task 39-c (Savings group: cd-calculator, investment-calculator, interest-calculator)

Agent: full-stack-developer
Task ID: 39-c
Date: 2026-10-27

## Scope

Build 3 new calculators for thetaxcalc.com as NEW files only (no edits to existing files — orchestrator owns wiring):
- /cd-calculator (componentKey `cd`)
- /investment-calculator (componentKey `investments`)
- /interest-calculator (componentKey `interest`)

Differentiation guardrails (vs. existing /compound-interest-calculator, /401k-retirement-calculator, /capital-gains-calculator):
- interest-calculator = SIMPLE vs COMPOUND side-by-side + cumulative-interest-by-year table (owns the "cumulative interest calculator" query)
- investment-calculator = portfolio framing: fee drag + inflation-adjusted (today's dollars) outcome
- cd-calculator = fixed-term deposit: APY/maturity/early-withdrawal/FDIC focus

## Files created (5)

1. `src/lib/savings-math.ts` — pure-math library:
   - `compoundFV(principal, annualRatePct, years, compoundsPerYear)` = P(1+r/n)^(n*t)
   - `simpleInterestTotal(principal, annualRatePct, years)` = P(1+r*t); `simpleInterestOnly` = P*r*t
   - `cumulativeInterestByYear(principal, rate, years, mode)` -> {year, interest, cumulativeInterest, balance}[] for simple | annually | quarterly | monthly | daily
   - `cdMaturity(deposit, apyPct, months)` = deposit*(1+APY)^(months/12) + totalInterest + averageMonthlyInterest (documented: APY embeds compounding — never add a frequency on top)
   - `cdBalanceAtMonth` (milestone charts), `annuityFV` (P(1+i)^m + PMT[((1+i)^m-1)/i], month-end contributions)
   - `feeDrag(principal, monthlyContribution, grossReturnPct, feePct, years)` -> {netReturnPct, balanceWithFee, balanceNoFee, feeCost, totalContributed}
   - `inflationAdjust(value, inflationPct, years)` = value/(1+i)^t
   - `INTEREST_MODE_OPTIONS`, `InterestMode` type; all functions pure, typed, clamped; rounding left to display.

2. `src/components/finance/cd-calculator.tsx` — `CdCalculator`:
   - Inputs: deposit 10000, APY 4.25%, term Select [3,6,12,18,24,36,48,60] months default 12
   - Outputs: maturity value, total interest, average monthly interest; pure-SVG milestone interest bars (candidates 3/6/12/18/24/36/48/60 filtered by term, <= 8 bars)
   - Reference cards: APY-vs-APR (4.15% APR monthly = 4.23% APY), early-withdrawal penalty (typically 3-12 months of interest, term-scaled, labeled typical), FDIC $250,000 per depositor per bank (NCUA for credit unions)
   - CD ladder strip: five 1-year tranches rolled annually vs one 5-year CD, both at the user's APY -> identical ending dollars, one tranche freed every 12 months (honest punchline: at equal APYs the ladder's value is liquidity)

3. `src/components/finance/investment-calculator.tsx` — `InvestmentCalculator`:
   - Inputs: initial 10000, monthly 500, return 7%, years 20, inflation 3%, expense-ratio slider 0-2% default 0.05%
   - Outputs: nominal balance (net of fee), inflation-adjusted balance, invested-vs-growth SVG donut, net-return line (7 - 0.05 = 6.95%)
   - FEES section (differentiator): 0.05% vs 1% fee on the same plan + lifetime difference
   - Tax note strip CTA -> /capital-gains-calculator

4. `src/components/finance/interest-calculator.tsx` — `InterestCalculator`:
   - Inputs: principal 10000, rate 5%, years 10, compounding Select [simple, annually, quarterly, monthly, daily] default monthly
   - Side-by-side cards: simple total vs compound total + highlighted compounding advantage
   - Cumulative interest by year table (simple cumulative / compound cumulative / gap / compound balance), sticky header, max-h-96 overflow-y-auto custom-scrollbar, overflow-x wrapper
   - Pure-SVG dual-line growth chart (stone dashed simple vs amber compound, end labels, legend)
   - Copy explains I = P x r x t vs A = P(1 + r/n)^(n x t)

5. `src/lib/calculators-additions/savings-additions.ts`:
   - `SAVINGS_ROUTES: CalculatorRouteConfig[]` — slugs cd-calculator / investment-calculator / interest-calculator; componentKeys cd / investments / interest; jsonLdTypes cd / investments / interest; category 'investment'; breadcrumbLabels + canonicalPaths fixed as specified; SEO lengths: titles 53/59/57, metaTitles 56/53/54, descriptions 156/154/156, metaDescs 157/156/152
   - `export interface AdditionContentShape` (mirrors CalculatorContent: howItWorks, calculationMethod{formula,steps,example}, keyRates, faqs, relatedCalculators)
   - `SAVINGS_CONTENT: Record<string, AdditionContentShape>` keyed by componentKey — 5 howItWorks paragraphs each, 6 steps each, worked examples with exact verified numbers, 6 keyRates each (typical/historical labeled), 7 FAQs each (108-132 words), 6 relatedCalculators each (allowed slugs only; interest <-> compound-interest <-> investment <-> cd cross-linked; cd links compound-interest-calculator as sibling tool)
   - `SAVINGS_HUB_CARDS` keyed by REGISTRY slug — category 'invest' all three; icons shield / trending / percent; descs 38-46 chars

## Canonical verified numbers (bun scripts, 32/32 checks pass)

CD ($10,000 at 4.25% APY):
- 12 months: maturity $10,425.00 | interest $425.00 | avg $35.42/month (the task prompt's "$10,431.08" guess was wrong — computed value used instead)
- 60 months: maturity $12,313.47 | interest $2,313.47
- Milestone interest: 3mo $104.60 | 6mo $210.29 | 12mo $425.00 | 18mo $644.23 | 24mo $868.06 | 36mo $1,329.96 | 48mo $1,811.48 | 60mo $2,313.47
- Ladder: 5 x $2,000 rolled annually = $12,313.47 (identical to single 5-yr CD); tranche freed/year $2,085.00
- APY(4.15% APR, monthly) = 4.23%; real yield (4.25% APY, 3% inflation) = 1.2%

Investment ($10,000 + $500/mo, 7% gross, 20 yrs, 0.05% fee):
- Nominal (net 6.95%): $298,875.65 | invested $130,000.00 | growth $168,875.65
- Inflation-adjusted (3%, 20y): $165,480.20 (deflator 1.03^20 = 1.806111)
- At 1% fee (net 6%): $264,122.49 -> lifetime difference 0.05% vs 1% = $34,753.16
- Zero-fee comparison: $300,850.72 (0.05% fee costs $1,975.07 vs fee-free)

Interest ($10,000 at 5% for 10 years):
- Simple: $15,000.00 total, $5,000.00 interest | Compound: annually $16,288.95 / quarterly $16,436.19 / monthly $16,470.09 / daily $16,486.65
- Compounding advantage (monthly): $1,470.09; daily beats monthly by only $16.55/decade
- Gap timeline: Y1 $11.62 | Y3 $114.72 | Y6 $490.18 | Y10 $1,470.09; Y9 compound cumulative $5,668.47 > simple's entire 10-year $5,000.00; year-10 compound interest alone $801.63
- After-tax: 4.25% APY at 22% bracket = 3.3%

## QA gates

- `bunx eslint` on all 5 new files: 0 problems (exit 0)
- `bunx tsc --noEmit`: 0 errors in new files (47 pre-existing errors are in other files: api/ads routes, _api_backup, db.ts, kv-blog, legacy calculators)
- `bun run lint`: my files add 0 findings — the amortization-calculator.tsx / loans-additions.ts findings seen in a site-wide run belong to the parallel loans-group agent's in-flight files (not touched per no-edit rule); pre-existing 12 live in layout.tsx, obbba-tax-calculator-client.tsx, site-shell.tsx
- No recharts, no fetch, no console.log, no TODO, no emojis, ASCII code (em-dash only in SEO strings per registry convention), responsive at 390px (lg: grid collapse, SVGs in overflow-x-auto with minWidth 520px, tables max-h-96 overflow-y-auto)
- FAQ word counts 108-132 (target 80-150); related slugs validated against the allowed list programmatically
- Copy labels: 2026 CD APY ranges / penalty schedules "typical", S&P ~10% nominal / ~7% real "historical"; OBBBA 1099-INT threshold $600 for interest paid starting 2026; FDIC $250K per depositor/per bank/per ownership category; 2026 401(k) elective limit $24,500 (matches site's own FAQ source); NIIT 3.8% > $200K single / $250K joint

## Orchestrator wiring map (existing files, orchestrator-owned)

1. Append `SAVINGS_ROUTES` to `CALCULATOR_ROUTES` in src/lib/calculator-routes.ts
2. calculator-client-page.tsx: lazy-map `cd` -> CdCalculator, `investments` -> InvestmentCalculator, `interest` -> InterestCalculator (+ switch cases)
3. _content.ts: `getCalculatorContent` cases 'cd' / 'investments' / 'interest' returning `SAVINGS_CONTENT[key]`
4. _jsonld.ts: builders for jsonLdType 'cd' / 'investments' / 'interest' (+ FAQPage from the same content)
5. calculators-hub-data.ts: merge `SAVINGS_HUB_CARDS` into SPECIAL_CARDS
6. Sitemap auto-grows +3 via the registry; hub count auto-derives
