# Task 39-a — Loans Group (4 calculators) — Work Record

Agent: full-stack-developer (loans group)
Task ID: 39-a
Date: 2026-10-27

## Scope

Build 4 loan calculators for thetaxcalc.com as NEW files only (no edits to any existing file):
auto-loan-calculator, loan-calculator, personal-loan-calculator, amortization-calculator.
Shared pure-math library + registry/content/hub definitions module for the orchestrator to wire.

## Files created (6)

1. `src/lib/loan-math.ts` — shared pure loan math:
   - `monthlyRate(aprPct)` = APR/1200 (negative APR clamped to 0)
   - `monthlyPayment(principal, aprPct, termMonths)` — standard annuity
     `M = P x [r(1+r)^n] / [(1+r)^n - 1]`, `P/n` when r = 0, 0 for non-positive inputs
   - `buildAmortization(principal, aprPct, termMonths, extraMonthly = 0)` — full schedule
     `{ rows: {month, payment, interest, principal, balance}[], totals: {totalInterest,
     totalPaid, months, payoffMonth}, basePayment }`. Fixed contractual payment (the exact
     annuity, kept at float precision so totals equal the closed form `M*n - P`), interest =
     prior balance x r, principal = remainder + extra, final payment trimmed to the exact
     balance, loop capped at termMonths (extras shorten, never extend). Guards: 0.01 principal
     floor on pathological micro-balances, final-month full-retirement cap for rounding drift.
   - `yearlySummary(rows)` — per-loan-year `{year, interestPaid, principalPaid, endBalance}`
   - helpers `roundCents`, `formatUsd`, `formatTerm` (e.g. "23 yr 1 mo")
   - All functions pure, typed, JSDoc-documented, ASCII-only code.

2. `src/components/finance/auto-loan-calculator.tsx` — `AutoLoanCalculator`:
   price 35000 / down 3500 / trade 0 / sales-tax % 0 (editable, taxes price-minus-trade-in) /
   fees 0 / APR 6.5 / term Select [36,48,60,72,84] default 60. Amount-financed breakdown card;
   hero monthly payment; total interest (red) / total of payments / total cost incl. down;
   principal-vs-interest split bar; +$25/+$50/+$100 click-to-apply chips showing months+interest
   saved; 12-month mini schedule; pure-SVG stacked bars (interest vs principal per year);
   negative-equity/trade-in-tax explainer. Everything useMemo-live.

3. `src/components/finance/loan-calculator.tsx` — `LoanCalculator`:
   amount 25000 / APR 8 / term years (5) + extra months (0-11) / optional extra monthly (0).
   Base vs with-extra payments, payoff months both, interest saved, months saved, interest
   share of principal, first-payment interest share; yearly amortization summary table
   (max-h-96 overflow-y + overflow-x); pure-SVG balance-decay line chart (scheduled vs
   with-extra curves, gold/green, x labels always end on final year).

4. `src/components/finance/personal-loan-calculator.tsx` — `PersonalLoanCalculator`:
   amount 15000 / APR 12 / term Select [24,36,48,60,72,84] default 48 (option rows show live
   payment). Total interest/total repaid; where-the-money-goes bar; credit-band reference
   cards (Excellent ~8-12% / Good ~13-18% / Fair ~19-25% / Poor ~26-36%, labeled typical 2026
   ranges, not guarantees); 36 vs 48 vs 60 side-by-side comparison (min-w-420px, overflow-x-auto)
   with "Your term" badge; origination-fee + consolidation explainers.

5. `src/components/finance/amortization-calculator.tsx` — `AmortizationCalculator`:
   principal 300000 / APR 6.5 / term Select [10,15,20,25,30] default 30 / extra monthly Slider
   (0-1000 step 25). Full yearly amortization table (all years, DOM-capped at 30 rows via
   even sampling + final year); interest-share column shows the amortization curve; pure-SVG
   cumulative-interest chart (scheduled vs with-extra); with/without-extra comparison (interest
   saved, time saved, payoff DATES via lazily-initialized `new Date()` — safe because these
   components load through the `dynamic(..., { ssr: false })` wrapper; avoids the
   react-hooks/set-state-in-effect lint rule); front-loading explainer with live stats
   (first-payment interest share, year-1 share, crossover month, halfway-interest month).

6. `src/lib/calculators-additions/loans-additions.ts`:
   - `LOANS_ROUTES: CalculatorRouteConfig[]` (type-only import) — exact fixed values:
     auto-loan-calculator/'auto-loan'/'auto-loan', loan-calculator/'loan'/'loan',
     personal-loan-calculator/'personal-loan'/'personal-loan',
     amortization-calculator/'amortization'/'amortization'; all category 'mortgage',
     canonical paths = slug paths, breadcrumbLabels per spec, unique titles/descriptions/
     keywords/og fields targeting "auto/car loan/car payment", "loan/loan payment",
     "personal loan", "amortization" with 2026 in titles.
   - `AdditionContentShape` (local re-declaration of the content contract) + `LOANS_CONTENT`
     keyed by componentKey: 5 howItWorks paragraphs each, calculationMethod (ASCII formula
     `M = P x [r(1+r)^n] / [(1+r)^n - 1]`, 5-6 steps, worked example with exact verified
     numbers), 5-6 keyRates rows (typical 2026 APR ranges labeled as typical), 7 FAQs each
     (80-150 words, unique per page), 4-6 relatedCalculators from the allowed slug list
     (the 4 loans cross-link each other + mortgage-calculator + compound-interest +
     sales-tax/paycheck where relevant).
   - `LOANS_HUB_CARDS` keyed by registry slug, category string 'loans' (new hub category
     "Loans & Debt" to be created by orchestrator), icons 'key'/'dollar'/'receipt'/'layers',
     descs 33-42 chars.

## Accuracy verification (bun scripts, /tmp/loan-verify/*.ts)

Every number in the copy was computed from the actual loan-math.ts and cross-checked;
a final regex sweep extracted every $X,XXX.XX / percent / month-count figure from
loans-additions.ts and matched against the verified whitelist (all pass). Canonical examples:

- AUTO: $35,000 car, $3,500 down, 6.5% APR, 60 mo -> financed $31,500.00, payment $616.33,
  total interest $5,480.02, total of payments $36,980.02, total cost incl. down $40,480.02.
  First payment $170.63 interest / $445.71 principal. Chips: +$25 -> 58 mo (2 saved),
  $258.21 saved; +$50 -> 55 mo (5), $492.99; +$100 -> 51 mo (9), $903.20.
  72 mo $529.51/$6,624.92; 84 mo $467.76/$7,791.61; 84-vs-60: -$148.58/mo, +$2,311.59 interest.
  5% $594.44/$4,166.63; 9% $653.89/$7,733.29. 0% APR $525.00/mo; $3,000-rebate alternative
  (finance $28,500 @ 6.5%) costs $4,958.11 interest -> 0% wins by ~$1,958; break-even rebate
  ~$4,675. Trade-in tax: 8% on ($35,000-$5,000) = $2,400 vs $2,800.
  20% down: $28,000 -> $547.85/mo, $4,871.13 interest (saves $608.89).
  Taxed scenario: 6% tax + $500 fees -> financed $34,100 -> $667.21/mo, $5,932.34 interest.
- LOAN: $25,000 @ 8% / 60 -> $506.91/mo, $5,414.59 interest, $30,414.59 repaid. First payment
  $166.67 interest (32.9%), last $3.36. +$50 -> 54 mo/$606.86 saved; +$100 -> 49 mo/$1,089.30.
  Terms @8%: 24 $1,130.68/$2,136.37; 36 $783.41/$3,202.73; 48 $610.32/$4,295.51; 72 $438.33/
  $6,559.83; 84 $389.66/$7,731.05. Per-$1,000: 8%/60 $20.28, 12%/60 $22.24.
- PERSONAL: $15,000 @ 12% -> 24 $706.10/$1,946.45/$16,946.45; 36 $498.21/$2,935.73/$17,935.73;
  48 $395.01/$3,960.36/$18,960.36; 60 $333.67/$5,020.00/$20,020.00; 72 $293.25/$6,114.21;
  84 $264.79/$7,242.44. First payment $150.00 interest = 38.0%. 36-vs-48: +$103.21/mo, -$1,024.63
  interest; 60-vs-48: -$61.34/mo, +$1,059.64. 10% $380.44/$3,261.06; 20% $456.46/$6,909.86
  (card-vs-loan saving $2,949.50). +$50/mo on 48 -> 42 mo, saves $574.74.
- AMORTIZATION: $300,000 @ 6.5% / 360 -> $1,896.20/mo, interest $382,633.47, total $682,633.47.
  Payment 1: $1,625.00 interest (85.7%) + $271.20. Year 1: $19,401.27 interest / $3,353.18
  principal (85.3%). Crossover month 233 (yr 19.4); half of all interest paid by month 127
  (balance then $250,638.71 -> "about $250,600"); after 10y: $227,544.49 paid, $181,872.87
  interest, only $45,671.62 principal retired. Extras: +$100 -> 312 mo (4 yr early),
  saves $60,994.79; +$200 -> 277 mo (6 yr 11 mo), saves $103,448.79; +$300 -> 250 mo,
  saves $135,115.17; one-extra-payment/yr ($158.02/mo) -> 290 mo (5 yr 10 mo early),
  saves $87,257.51. 15-vs-30 @6.5%: $2,613.32 vs $1,896.20; $170,397.98 vs $382,633.47
  (diff $212,235.49). Per-$1,000: 6.5%/30yr $6.32, 7%/30yr $6.65.

## Gates

- `bunx eslint` on all 6 files -> 0 problems. (Note: task 39-c's worklog observed 2 findings
  on my in-flight amortization-calculator.tsx + loans-additions.ts — the set-state-in-effect
  pattern and an unescaped apostrophe breaking a single-quoted string; both were found and
  fixed by my own QA pass, files now clean. The date pattern was replaced with lazy
  useState initialization, valid because calculator components load with ssr:false.)
- `bunx tsc --noEmit` -> zero errors in the new files (pre-existing project errors are all in
  other files: api routes, legacy calculators, db.ts).
- audit-titles gate simulated against CALCULATOR_ROUTES: metaTitles 52-56 chars, unique,
  no cross-contamination with any existing route's title/ogTitle; metaDescs 150-155 chars;
  no state-page identity rules apply (slugs don't end in -tax-calculator).
- No 50-state loops anywhere; no console.log/TODO/emojis/fetch/recharts; charts are pure SVG
  (crawlable, dark-mode-safe fill classes, minWidth 560px inside overflow-x-auto holders);
  tables max-h-96 overflow-y-auto custom-scrollbar + overflow-x-auto; grids collapse at
  lg: breakpoints; touch targets shadcn defaults.
- Dev server untouched (was running PID 1208 per .zscripts/dev.log); no builds, no commits,
  no edits to existing files; scratch scripts in /tmp/loan-verify/.

## Orchestrator wiring map (existing files — NOT touched by this task)

1. Append `LOANS_ROUTES` entries to `CALCULATOR_ROUTES` in `src/lib/calculator-routes.ts`.
2. In `src/app/[calculator]/calculator-client-page.tsx`: lazy-map componentKey
   'auto-loan' -> AutoLoanCalculator, 'loan' -> LoanCalculator,
   'personal-loan' -> PersonalLoanCalculator, 'amortization' -> AmortizationCalculator
   (all from '@/components/finance/...', ssr:false like the existing entries).
3. `_content.ts`: serve LOANS_CONTENT by componentKey in getCalculatorContent
   ('auto-loan' | 'loan' | 'personal-loan' | 'amortization' cases) — the shape matches
   CalculatorContent structurally (howItWorks/calculationMethod/keyRates/faqs/relatedCalculators).
4. `_jsonld.ts`: add jsonLdType cases 'auto-loan', 'loan', 'personal-loan', 'amortization'.
5. `calculators-hub-data.ts`: merge LOANS_HUB_CARDS into SPECIAL_CARDS (category 'loans') and
   add 'loans' to HubCategory + HUB_CATEGORY_LABELS ("Loans & Debt") + HUB_CATEGORY_ORDER.
6. Sitemap auto-grows +4 via the registry; homepage cards optional per orchestrator.

## Key decisions

- Float-precision ledger in buildAmortization (round-at-display), matching the closed-form
  `M x n - P` exactly and the site's existing mortgage engine — the numbers quoted in copy are
  the numbers the UI renders.
- yearlySummary accumulates raw floats (no per-step rounding) so the yearly table matches
  closed-form sums; copy quotes the yearly values the table displays ($19,401.27 / $3,353.18).
- Payoff calendar dates are computed from a lazily-initialized client-side Date (ssr:false
  context) rather than useEffect+setState, keeping eslint's react-hooks rules clean and
  avoiding hydration concerns.
- APR ranges in copy are labeled "typical 2026" and approximate; nothing is presented as a
  guaranteed rate; standard annuity formulas only.
