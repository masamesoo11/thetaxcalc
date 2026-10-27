# Work Record — Task 39-d (Work group: time-card-calculator + payroll-calculator)

Agent: full-stack-developer (Task ID 39-d)
Date: 2026-10-27 (session after Task 38-d; round-39 parallel build)
Project: thetaxcalc.com (Next.js 16 App Router + TS + Tailwind 4 + shadcn/ui, Cloudflare Pages)

## Scope

Two NEW calculators, delivered as new files only (no wiring — orchestrator-owned):

1. `/time-card-calculator` (componentKey `time-card`) — weekly TIMESHEET tool:
   clock in/out per day, unpaid breaks, decimal hours, FLSA overtime over 40 h/week
   at 1.5x, weekly gross pay. Deliberately NOT a tax tool (distinct from
   /paycheck-calculator and /hourly-to-salary-calculator).
2. `/payroll-calculator` (componentKey `payroll`) — per-PAYCHECK payroll run from
   the employer's seat: period gross, employee deductions (FICA + estimated
   federal withholding), employer contributions (FICA match, FUTA, SUTA, workers
   comp, benefits), total employer cost per period + markup %. Complements
   /employee-cost-calculator (annual/strategic) with the stub view.

## Files created (exactly 4)

| File | Purpose |
|---|---|
| `src/lib/time-math.ts` | Shared pure-math library (timesheet + payroll run) |
| `src/components/finance/time-card-calculator.tsx` | Exports `TimeCardCalculator` |
| `src/components/finance/payroll-calculator.tsx` | Exports `PayrollCalculator` |
| `src/lib/calculators-additions/work-additions.ts` | `WORK_ROUTES`, `AdditionContentShape`, `WORK_CONTENT`, `WORK_HUB_CARDS` |

## Orchestrator wiring map (existing files — NOT touched by me)

- Append `WORK_ROUTES` (2 entries) to `CALCULATOR_ROUTES` in
  `src/lib/calculator-routes.ts`.
- In `src/app/[calculator]/calculator-client-page.tsx`: lazy-map
  componentKey `'time-card'` -> `TimeCardCalculator` and `'payroll'` ->
  `PayrollCalculator` (both from `@/components/finance/...`).
- In `src/app/[calculator]/_content.ts`: add `getCalculatorContent` cases for
  `'time-card'` and `'payroll'` returning `WORK_CONTENT['time-card']` /
  `WORK_CONTENT['payroll']` (shape matches `CalculatorContent` exactly:
  howItWorks / calculationMethod{formula,steps,example} / keyRates / faqs /
  relatedCalculators; FAQItem-shaped).
- JSON-LD (`_jsonld.ts`): add builders for jsonLdType `'time-card'` and
  `'payroll'` (WebPage + Breadcrumb + WebApplication pattern like the others).
- Hub: merge `WORK_HUB_CARDS` into `SPECIAL_CARDS` in
  `src/lib/calculators-hub-data.ts` (keys are the registry slugs; icons
  `'clock'` and `'briefcase'` already exist in the explorer ICONS map;
  categories `income` / `business`).
- Sitemap auto-grows +2 via the registry.

Fixed registry values (per brief): slugs `time-card-calculator` /
`payroll-calculator`; componentKeys `time-card` / `payroll`; jsonLdTypes
`time-card` / `payroll`; categories `paycheck` / `business`; canonicalPaths
`/time-card-calculator` / `/payroll-calculator`.

## Canonical verified examples (bun-verified against the shipped module)

Time card (defaults):
- Mon-Fri 9:00-17:00, 30-min unpaid break = 7.50 h/day = 37.50 h week = $750.00 at $20/hr
- Overnight: 22:00 -> 06:00 = 8.00 h (auto +24 h roll)
- OT week: add Sat 9:00-14:00 (5.00 h) -> 42.50 h = 40.00 regular + 2.50 OT
  -> $800.00 + $75.00 = $875.00 gross
- Brief's suggested "37.5 reg + 2.5 OT at $20" example computes to $825.00
  (= 750 + 75), NOT $800 as the brief guessed; used exact numbers in copy.

Payroll ($60,000 salary, monthly = 12 periods, SUTA 3.0%, workers comp 1.0%,
benefits $0):
- Period gross $5,000.00
- Employee FICA $382.50 ($4,590.00/yr = $3,720.00 SS + $870.00 Medicare)
- Estimated federal withholding $418.33 ($5,020.00/yr on $43,900 taxable)
- Estimated net $4,199.17 (federal-only, "filing status simplified" label)
- Employer: FICA match $382.50 + FUTA $3.50 ($42.00/yr) + SUTA $23.75
  ($285.00/yr on first $9,500) + workers comp $50.00 ($600.00/yr)
- Total employer cost $5,459.75/period = $65,517.00/yr = +9.2% over gross
  (markup is frequency-invariant; weekly run reproduces $65,517.00)
- High earner check $250,000: employee FICA $15,514.00 (SS capped at $11,439 +
  Medicare $3,625 + $450 additional), employer $15,064.00 (never the 0.9%)

## tax-config values consumed (never re-hardcoded)

Imported from `@/lib/tax-config` in `src/lib/time-math.ts` (math) and
`src/components/finance/payroll-calculator.tsx` (display strings):
- `FICA_2026.socialSecurityRate` (0.062), `socialSecurityWageCap` (184500)
- `FICA_2026.medicareRate` (0.0145), `additionalMedicareRate` (0.009),
  `additionalMedicareThreshold` (200000)
- `FEDERAL_TAX_2026.bracketsByFiling.single`, `standardDeductionsByFiling.single` (16100)

FUTA (0.6% / $7,000) and SUTA defaults ($9,500 base) are defined ONCE in
`time-math.ts` (not present in tax-config) and consumed everywhere else.

## Gates

- `bunx eslint` on all 4 files: **0 problems**. Full-project lint currently
  13 = 12 pre-existing + 1 new from SIBLING file
  `src/components/finance/amortization-calculator.tsx:68` (loans group 39-c —
  flag to orchestrator; none from my files).
- `bunx tsc --noEmit`: 0 errors in my 4 files (project's pre-existing errors
  elsewhere: db.ts, kv-blog.ts, finance-utils PayFrequency re-export class,
  sibling additions files).
- SEO: titles 57/54 chars, metaTitles 52/55 (unique, no cross-contamination vs
  the 70-route registry), descriptions 155/156, metaDescs 150/153 — all in gate.
- FAQ word counts 83-98 (gate 80-150); 7 FAQs each; 5/6 keyRates; 5 relatedCalculators each.
- No 50-state loops (dropdowns only), no recharts, no fetch, no console.log, no
  TODO, no emojis, no 50-state tables, ASCII-only code, responsive at 390px
  (day grid stacks to 1 col; no wide tables).
- Numbers verified by 66-assertion bun script (`/tmp/verify-time-math.ts`) +
  SEO/shape script (`/tmp/verify-seo.ts`) — ALL PASS.
- Dev server untouched (PID 1208, healthy); no build, no commit, no existing
  file edited; scratch scripts in /tmp only.

## Notes for subsequent agents

- `time-math.ts` is importable from client and server (pure, no directives).
- If you need FICA/withholding math in another work-group calculator, import
  `ficaEmployee` / `federalIncomeTaxEstimate` / `payrollRun` from
  `@/lib/time-math` instead of re-deriving.
- WORK_CONTENT howItWorks paragraphs contain raw `<a href="...">` links (same
  convention as `_content.ts` copy) — safe for the SSR content pipeline.
- All worklog rules honored: appended to worklog.md, never overwrote.
