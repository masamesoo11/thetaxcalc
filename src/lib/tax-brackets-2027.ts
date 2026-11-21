/**
 * Official 2027 Federal Tax Parameters
 *
 * STATUS: OFFICIAL — IRS Revenue Procedure 2026-35 (released November 2026).
 * Primary source: https://www.irs.gov/pub/irs-drop/rp-26-35.pdf
 *
 * Covers Section 3.01 (Tax Rate Tables) and Section 3.15 (Standard Deduction)
 * for taxable years beginning in 2027 (returns filed in spring 2028).
 */

import { FederalBracket } from './tax-config';

// ─── Provenance ────────────────────────────────────────────────────────────────

export const IS_OFFICIAL_2027 = true;

export const OFFICIAL_SOURCE_CITATION = 'IRS Rev. Proc. 2026-35';
export const OFFICIAL_SOURCE_URL = 'https://www.irs.gov/pub/irs-drop/rp-26-35.pdf';
export const OFFICIAL_RELEASE_DATE = '2026-11-05';
export const OFFICIAL_UPDATED_DATE = '2026-11-20';

/** Average inflation adjustment across 2027 brackets (~3.24% over 2026). */
export const INFLATION_FACTOR_2027 = 1.03243;

// Legacy export names kept so existing imports continue to compile cleanly.
export const PROJECTION_FACTOR = INFLATION_FACTOR_2027;
export const PROJECTION_PUBLISHED = OFFICIAL_UPDATED_DATE;

// ─── Official 2027 brackets (IRS Rev. Proc. 2026-35, Section 3.01) ────────────

export interface OfficialBrackets2027 {
  single: FederalBracket[];
  married: FederalBracket[];
  headOfHousehold: FederalBracket[];
  marriedSeparate: FederalBracket[];
}

export const BRACKETS_2027_OFFICIAL: OfficialBrackets2027 = {
  // Table 3 — Unmarried Individuals (other than Surviving Spouses and Heads of Households)
  single: [
    { rate: 0.10, min: 0, max: 12800 },
    { rate: 0.12, min: 12800, max: 52025 },
    { rate: 0.22, min: 52025, max: 109125 },
    { rate: 0.24, min: 109125, max: 208325 },
    { rate: 0.32, min: 208325, max: 264550 },
    { rate: 0.35, min: 264550, max: 661375 },
    { rate: 0.37, min: 661375, max: null },
  ],
  // Table 1 — Married Individuals Filing Joint Returns and Surviving Spouses
  married: [
    { rate: 0.10, min: 0, max: 25600 },
    { rate: 0.12, min: 25600, max: 104050 },
    { rate: 0.22, min: 104050, max: 218250 },
    { rate: 0.24, min: 218250, max: 416650 },
    { rate: 0.32, min: 416650, max: 529100 },
    { rate: 0.35, min: 529100, max: 793650 },
    { rate: 0.37, min: 793650, max: null },
  ],
  // Table 2 — Heads of Households
  headOfHousehold: [
    { rate: 0.10, min: 0, max: 18250 },
    { rate: 0.12, min: 18250, max: 69650 },
    { rate: 0.22, min: 69650, max: 109100 },
    { rate: 0.24, min: 109100, max: 208300 },
    { rate: 0.32, min: 208300, max: 264550 },
    { rate: 0.35, min: 264550, max: 661350 },
    { rate: 0.37, min: 661350, max: null },
  ],
  // Table 4 — Married Individuals Filing Separate Returns
  marriedSeparate: [
    { rate: 0.10, min: 0, max: 12800 },
    { rate: 0.12, min: 12800, max: 52025 },
    { rate: 0.22, min: 52025, max: 109125 },
    { rate: 0.24, min: 109125, max: 208325 },
    { rate: 0.32, min: 208325, max: 264550 },
    { rate: 0.35, min: 264550, max: 396825 },
    { rate: 0.37, min: 396825, max: null },
  ],
};

// Backwards-compatible alias
export const BRACKETS_2027_PROJECTED = BRACKETS_2027_OFFICIAL;

// ─── Official 2027 standard deduction (IRS Rev. Proc. 2026-35, Section 3.15) ──

export interface OfficialDeductions2027 {
  single: number;
  married: number;
  headOfHousehold: number;
  marriedSeparate: number;
  additionalAgedOrBlindSingle: number;
  additionalAgedOrBlindMarried: number;
}

export const STANDARD_DEDUCTION_2027_OFFICIAL: OfficialDeductions2027 = {
  single: 16600,
  married: 33200,
  headOfHousehold: 24925,
  marriedSeparate: 16600,
  additionalAgedOrBlindSingle: 2100,
  additionalAgedOrBlindMarried: 1700,
};

// Backwards-compatible alias
export const STANDARD_DEDUCTION_2027_PROJECTED = STANDARD_DEDUCTION_2027_OFFICIAL;

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
  return Math.round(cumulative * 100) / 100;
}
