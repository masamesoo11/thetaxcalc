# Task 39-e — full-stack-developer (Utils group: tip-calculator + percentage-increase-calculator)

## Scope

Build 2 quick money calculators for thetaxcalc.com as NEW files only:

- `/tip-calculator` — bill split, tip presets, pre-tax toggle, round-up per person
- `/percentage-increase-calculator` — 4-tab percentage tool with pay-raise cross-links

No existing file touched, no build, no commit, no server start/restart, no test files inside the project (scratch scripts in `/tmp`, run with `bun`).

## Files created

| File | Purpose |
| --- | --- |
| `src/lib/utils-math.ts` | Pure math: `tipSplit`, `pretaxTipBase`, `pctOf`, `pctChange`, `pctDifference`, `applyPct` |
| `src/components/finance/tip-calculator.tsx` | `TipCalculator` client component |
| `src/components/finance/percentage-change-calculator.tsx` | `PercentageChangeCalculator` client component (4 shadcn Tabs) |
| `src/lib/calculators-additions/utils-additions.ts` | `UTILS_ROUTES` (2 registry entries), `AdditionContentShape`, `UTILS_CONTENT`, `UTILS_HUB_CARDS` |

## componentKey -> slug map

| componentKey | slug | jsonLdType | canonicalPath | category | breadcrumbLabel |
| --- | --- | --- | --- | --- | --- |
| `tip` | `tip-calculator` | `tip` | `/tip-calculator` | paycheck | Tip Calculator |
| `percentage-change` | `percentage-increase-calculator` | `percentage-change` | `/percentage-increase-calculator` | paycheck | Percentage Increase Calculator |

## Orchestrator wiring map (what I did NOT do, by design)

1. Append `UTILS_ROUTES` into `CALCULATOR_ROUTES` (calculator-routes.ts).
2. Map `tip` -> `TipCalculator`, `percentage-change` -> `PercentageChangeCalculator` in `calculator-client-page.tsx` (lazy import + switch case, same pattern as compound-interest).
3. Merge `UTILS_CONTENT` entries into the `_content.ts` switch — they are already `CalculatorContent`-shaped (howItWorks / calculationMethod / keyRates / faqs / relatedCalculators; faqs are `FAQItem[]`).
4. Merge `UTILS_HUB_CARDS` into `SPECIAL_CARDS` in calculators-hub-data.ts (category `income`, icons `receipt` / `percent`).
5. Add `getJsonLdForType` cases for jsonLdType `tip` and `percentage-change`.
6. Sitemap auto-grows from the registry (270 -> 272).

## Canonical worked examples (all verified with bun against the real lib)

Tip calculator defaults (bill $50.00, 18%, 1 person, no toggles):

- Tip = $9.00, Total = $59.00, per-person = $59.00, per-person tip = $9.00
- Quick-scan grid on $50: 10% -> $5.00/$55.00; 15% -> $7.50/$57.50; 18% -> $9.00/$59.00; 20% -> $10.00/$60.00; 25% -> $12.50/$62.50

Tip toggles (bill $100.00, 18%, 4 people):

- Plain: tip $18.00, total $118.00, $29.50 each ($4.50 tip share)
- Round-up on: $29.50 -> $30.00 each -> total $120.00, tip grows $18.00 -> $20.00 (calculator shows the +$2.00)
- Pre-tax toggle on ($100 check incl. 8.25% tax): subtotal $92.38, tax portion $7.62, 18% tip = $16.63; at 20%: $18.48 tip / $118.48 total (vs $20.00 tipping on the full check). On a $50 check: subtotal $46.19, 18% = $8.31.

Percentage calculator defaults, per tab:

- Tab 1: 25 increased by 5% = 26.25 (worked line rendered verbatim; decrease -> 23.75)
- Tab 2: 50,000 -> 52,000 = +4.00%, absolute difference 2,000, direction "Increase"; reverse trip shown as -3.85%; from-zero guarded with an "undefined" hint
- Tab 3: 60 vs 50 = 18.18% (exact 18.1818...%; gap 10, average 55); comparison note computes +20% (50->60) and -16.67% (60->50)
- Tab 4: 15% of 2,000 = 300; companion lines: 10% of 2,000 = 200; 15% off 2,000 = 1,700
- Pay-raise strip (tabs 1 + 2, next/link): "$2/hr raise on 2,080 hours = $4,160 a year before taxes" -> /hourly-to-salary-calculator + /salary

Content-module verified numbers: $120 dinner @ 20% split 4 = $24 tip / $144 total / $36 each ($6 tip share); $52,000 x 1.04 = $54,080; $1/$2/$3 per hour = $2,080/$4,160/$6,240 per year; $25->$27/hr = $52,000->$56,160 = +8%; 100 +20% = 120, 120 -20% = 96, 96->100 = +4.17%; $3,000/$52,000 = 5.77%; 7.65% of $1,000 = $76.50.

## Quality gates

- `bunx eslint src/lib/utils-math.ts src/components/finance/tip-calculator.tsx src/components/finance/percentage-change-calculator.tsx src/lib/calculators-additions/utils-additions.ts` -> 0 problems (the 12 pre-existing problems live in OTHER files and were not touched).
- `bunx tsc --noEmit` -> zero errors in the 4 new files (remaining errors are pre-existing db.ts / kv-blog.ts Cloudflare issues).
- bun import smoke test of all 4 modules: PASS (named exports resolve, no import-time errors).
- 55 numeric assertions against the real `utils-math` exports: ALL PASS.
- FAQ word counts: 7 per tool, all 97-123 words (target 80-150).
- SEO lengths: titles 53/54 chars, descriptions 155/158 chars, metaTitles 52/59 chars (gate 30-65), h1 14/51 chars, hub descs 41/38 chars.
- Tipping ranges framed as customary/typical (15-20% table service), never as official norms; the only statutory figures used are the long-standing federal tipped minimum ($2.13) and federal minimum ($7.25).
- Responsive at 390px: tabs wrap (TabsList flex-wrap), grids collapse to single column, tables scroll horizontally inside their card.
- No recharts, no fetch, no console.log, no TODO, no emojis, ASCII-safe anchors, amber/emerald accent system (never blue/indigo).

## Dev-server observation (no action taken)

The pre-running dev chain (next dev -p 3000, PID 1208, started 19:36 local) was mid cold-compile during this task (next-server in R state at ~105% CPU, health curl still not answering — the same slow-storage cold-start pattern documented in worklog Task 37). Per the hard rules I did not start, restart, or kill anything. My 4 files are not imported by any route yet, so the running app is unaffected until wiring.

## Scratch scripts (in /tmp, outside the repo)

- `/tmp/verify-39e.ts` — first-pass number verification
- `/tmp/verify-39e-seo.ts`, `-seo2.ts`, `-seo3.ts` — title/description length tuning
- `/tmp/verify-39e-faq.ts` — FAQ word counts + module integrity (imports the real additions module)
- `/tmp/verify-39e-final.ts` — 55-assertion numeric gate against the real lib exports
- `/tmp/verify-39e-import.ts` — module import smoke test
