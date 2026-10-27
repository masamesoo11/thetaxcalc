/**
 * Projected 2027 Federal Tax Parameters
 *
 * STATUS: PROJECTIONS — published 2026-10-27, ahead of the IRS's official
 * 2027 inflation adjustments (Rev. Proc., expected early-to-mid November 2026).
 * The day the IRS publishes official numbers, replace PROJECTION provenance
 * below with the official values and flip IS_OFFICIAL_2027 to true.
 *
 * METHODOLOGY (mirrors IRS Rev. Proc. inflation-adjustment rules):
 *  1. The IRS indexes bracket thresholds and the standard deduction by the
 *     chained CPI-U (C-CPI-U) 12-month average for the 12 months ending
 *     August 31 of the prior year, compared with the 12 months ending
 *     August 31 of the current year.
 *  2. C-CPI-U (BLS series SUUR0000SA0) monthly values Sep 2024 – Aug 2026
 *     were retrieved from FRED on 2026-10-27 (see CCPI_MONTHLY below).
 *  3. October 2025 has NO published C-CPI-U value — the October 2025 CPI
 *     report was cancelled during the federal government shutdown. We
 *     interpolate it as the midpoint of Sep 2025 and Nov 2025 (180.131),
 *     which is the most neutral available treatment. Dropping the month
 *     from both windows instead yields a sensitivity factor of 1.0309 —
 *     a ~$25 difference on the 37% threshold (see SENSITIVITY_FACTOR).
 *  4. Rounding follows the IRS convention: bracket thresholds round to the
 *     nearest multiple of $25; standard deduction amounts round to the
 *     nearest multiple of $50.
 */

import { FEDERAL_TAX_2026, FederalBracket } from './tax-config';

// ─── Provenance ────────────────────────────────────────────────────────────────

export const IS_OFFICIAL_2027 = false;

/** 12-month-average C-CPI-U ratio (Sep 2025–Aug 2026) ÷ (Sep 2024–Aug 2025). */
export const PROJECTION_FACTOR = 1.030606;

/** Sensitivity check: same ratio computed over the 11 published months in each window. */
export const SENSITIVITY_FACTOR = 1.030904;

export const PROJECTION_DATA_RETRIEVED = '2026-10-27';
export const PROJECTION_PUBLISHED = '2026-10-27';
export const OFFICIAL_RELEASE_EXPECTED = 'early-to-mid November 2026 (IRS revenue procedure)';

/** C-CPI-U monthly index values used (BLS series SUUR0000SA0, all items, NSA). */
export const CCPI_MONTHLY: { period: string; value: number | null; note?: string }[] = [
  { period: '2024-09', value: 175.099 },
  { period: '2024-10', value: 175.346 },
  { period: '2024-11', value: 175.180 },
  { period: '2024-12', value: 175.219 },
  { period: '2025-01', value: 176.362 },
  { period: '2025-02', value: 177.134 },
  { period: '2025-03', value: 177.520 },
  { period: '2025-04', value: 178.081 },
  { period: '2025-05', value: 178.427 },
  { period: '2025-06', value: 178.991 },
  { period: '2025-07', value: 179.272 },
  { period: '2025-08', value: 179.839 },
  { period: '2025-09', value: 180.373 },
  // October 2025 CPI report cancelled (government shutdown) — interpolated.
  { period: '2025-10', value: 180.131, note: 'interpolated' },
  { period: '2025-11', value: 179.889 },
  { period: '2025-12', value: 179.775 },
  { period: '2026-01', value: 180.409 },
  { period: '2026-02', value: 181.258 },
  { period: '2026-03', value: 183.193 },
  { period: '2026-04', value: 184.680 },
  { period: '2026-05', value: 185.771 },
  { period: '2026-06', value: 185.172 },
  { period: '2026-07', value: 185.162 },
  { period: '2026-08', value: 185.739 },
];

export const CCPI_WINDOW_NOTE =
  'Window A (Sep 2024 – Aug 2025) average: 177.206 · Window B (Sep 2025 – Aug 2026) average: 182.629';

// ─── Rounding helpers (IRS convention) ────────────────────────────────────────

const roundToMultiple = (amount: number, multiple: number) =>
  Math.round(amount / multiple) * multiple;

const roundBracket = (amount: number) => roundToMultiple(amount, 25);
const roundDeduction = (amount: number) => roundToMultiple(amount, 50);

// ─── Projected 2027 brackets ───────────────────────────────────────────────────

export interface ProjectedBrackets2027 {
  single: FederalBracket[];
  married: FederalBracket[];
  headOfHousehold: FederalBracket[];
  marriedSeparate: FederalBracket[];
}

function projectBrackets(base: FederalBracket[], factor: number): FederalBracket[] {
  return base.map((b) => ({
    rate: b.rate,
    min: b.min === 0 ? 0 : roundBracket(b.min * factor),
    max: b.max === null ? null : roundBracket(b.max * factor),
  }));
}

function buildMfsBrackets(singleBase: FederalBracket[], mfjBase: FederalBracket[], factor: number): FederalBracket[] {
  // MFS mirrors single except the 35%→37% threshold, which is half the MFJ threshold.
  const mfjTopStart = mfjBase.find((b) => b.rate === 0.37)!.min; // 2026: $768,700
  const mfsTopStart = roundBracket((mfjTopStart / 2) * factor); // projected MFS 37% start
  return singleBase.map((b) => {
    if (b.rate === 0.35) {
      return { rate: b.rate, min: b.min === 0 ? 0 : roundBracket(b.min * factor), max: mfsTopStart };
    }
    if (b.rate === 0.37) {
      return { rate: b.rate, min: mfsTopStart, max: null };
    }
    return {
      rate: b.rate,
      min: b.min === 0 ? 0 : roundBracket(b.min * factor),
      max: b.max === null ? null : roundBracket(b.max * factor),
    };
  });
}

export const BRACKETS_2027_PROJECTED: ProjectedBrackets2027 = {
  single: projectBrackets(FEDERAL_TAX_2026.bracketsByFiling.single, PROJECTION_FACTOR),
  married: projectBrackets(FEDERAL_TAX_2026.bracketsByFiling.married, PROJECTION_FACTOR),
  headOfHousehold: projectBrackets(FEDERAL_TAX_2026.bracketsByFiling.head_of_household, PROJECTION_FACTOR),
  marriedSeparate: buildMfsBrackets(
    FEDERAL_TAX_2026.bracketsByFiling.single,
    FEDERAL_TAX_2026.bracketsByFiling.married,
    PROJECTION_FACTOR
  ),
};

// ─── Projected 2027 standard deduction ────────────────────────────────────────

export interface ProjectedDeductions2027 {
  single: number;
  married: number;
  headOfHousehold: number;
  marriedSeparate: number;
}

export const STANDARD_DEDUCTION_2027_PROJECTED: ProjectedDeductions2027 = {
  single: roundDeduction(FEDERAL_TAX_2026.standardDeductionsByFiling.single * PROJECTION_FACTOR),
  married: roundDeduction(FEDERAL_TAX_2026.standardDeductionsByFiling.married * PROJECTION_FACTOR),
  headOfHousehold: roundDeduction(FEDERAL_TAX_2026.standardDeductionsByFiling.head_of_household * PROJECTION_FACTOR),
  marriedSeparate: roundDeduction(FEDERAL_TAX_2026.standardDeductionsByFiling.single * PROJECTION_FACTOR),
};

// ─── Display helpers ──────────────────────────────────────────────────────────

export const usd = (amount: number) => `$${amount.toLocaleString('en-US')}`;

export function bracketRangeLabel(b: { min: number; max: number | null }): string {
  if (b.max === null) return `Over ${usd(b.min)}`;
  return `${b.min === 0 ? usd(0) : usd(b.min + 1)} – ${usd(b.max)}`;
}

/** Cumulative federal tax owed at the START of the bracket (per status). */
export function cumulativeTaxAtBracketStart(brackets: FederalBracket[], index: number): number {
  if (index === 0) return 0;
  let cumulative = 0;
  for (let i = 0; i < index; i++) {
    const b = brackets[i];
    const nextMin = brackets[i + 1]?.min ?? b.max;
    if (nextMin === null || nextMin === undefined) break;
    cumulative += (nextMin - b.min) * b.rate;
  }
  return Math.round(cumulative);
}
