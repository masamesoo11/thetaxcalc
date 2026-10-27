/**
 * Pure math for the savings & investment calculator group:
 * cd-calculator, investment-calculator, interest-calculator.
 *
 * Conventions:
 * - Rates arrive as plain percentages: 4.25 means 4.25% per year.
 * - All functions are pure and dependency-free (no React, no I/O).
 * - Rounding is NOT applied here; display code rounds at the final node.
 * - Negative inputs are clamped to 0 so a stray minus sign can never
 *   produce a negative "balance".
 *
 * Accuracy notes:
 * - CD math uses APY directly. APY (Annual Percentage Yield) already
 *   embeds the bank's compounding frequency (Truth in Savings Act: APY =
 *   (1 + r/n)^n - 1), so the effective annual growth factor is simply
 *   (1 + APY) per year. Applying an extra compounding frequency to an
 *   APY would double-count compounding.
 * - Compound projections use the standard closed-form annuity formula
 *   with contributions credited at the end of each month.
 */

// ─── Interest modes (interest-calculator) ─────────────────────────────────────

export type InterestMode = 'simple' | 'annually' | 'quarterly' | 'monthly' | 'daily';

/** Compounding periods per year; 0 = simple (no compounding). */
export function compoundsPerYearFor(mode: InterestMode): number {
  switch (mode) {
    case 'simple':
      return 0;
    case 'annually':
      return 1;
    case 'quarterly':
      return 4;
    case 'monthly':
      return 12;
    case 'daily':
      return 365;
  }
}

export const INTEREST_MODE_OPTIONS: { value: InterestMode; label: string }[] = [
  { value: 'simple', label: 'Simple (no compounding)' },
  { value: 'annually', label: 'Annually' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'daily', label: 'Daily (365/yr)' },
];

// ─── Core simple / compound formulas ────────────────────────────────────────

/**
 * Compound future value of a lump sum:
 *   A = P * (1 + r/n)^(n*t)
 */
export function compoundFV(
  principal: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear: number
): number {
  const p = Math.max(0, principal);
  const t = Math.max(0, years);
  const n = Math.max(1, Math.round(compoundsPerYear));
  const r = annualRatePct / 100;
  return p * Math.pow(1 + r / n, n * t);
}

/**
 * Simple interest total (principal + interest):
 *   A = P * (1 + r*t)
 */
export function simpleInterestTotal(
  principal: number,
  annualRatePct: number,
  years: number
): number {
  const p = Math.max(0, principal);
  const t = Math.max(0, years);
  return p * (1 + (annualRatePct / 100) * t);
}

/**
 * Simple interest only:
 *   I = P * r * t
 */
export function simpleInterestOnly(
  principal: number,
  annualRatePct: number,
  years: number
): number {
  return simpleInterestTotal(principal, annualRatePct, years) - Math.max(0, principal);
}

export interface YearInterestRow {
  year: number;
  /** Interest credited during that year. */
  interest: number;
  /** All interest from day one through the end of that year. */
  cumulativeInterest: number;
  /** Balance at the end of that year. */
  balance: number;
}

/**
 * Year-by-year interest schedule for either simple or compound mode.
 *
 * - simple: every year earns P*r; balance grows linearly.
 * - compound modes: balance_y = P*(1+r/n)^(n*y); the year's interest is
 *   the balance delta (interest on interest included).
 */
export function cumulativeInterestByYear(
  principal: number,
  annualRatePct: number,
  years: number,
  mode: InterestMode
): YearInterestRow[] {
  const p = Math.max(0, principal);
  const r = annualRatePct / 100;
  const total = Math.max(0, Math.min(100, Math.round(years)));
  const rows: YearInterestRow[] = [];

  if (mode === 'simple') {
    let cumulative = 0;
    for (let y = 1; y <= total; y++) {
      const yearInterest = p * r;
      cumulative += yearInterest;
      rows.push({
        year: y,
        interest: yearInterest,
        cumulativeInterest: cumulative,
        balance: p + cumulative,
      });
    }
    return rows;
  }

  const n = compoundsPerYearFor(mode);
  let prevBalance = p;
  for (let y = 1; y <= total; y++) {
    const balance = p * Math.pow(1 + r / n, n * y);
    const yearInterest = balance - prevBalance;
    prevBalance = balance;
    rows.push({
      year: y,
      interest: yearInterest,
      cumulativeInterest: balance - p,
      balance,
    });
  }
  return rows;
}

// ─── CD math ─────────────────────────────────────────────────────────────────

export interface CdMaturityResult {
  /** Value of the CD on its maturity date. */
  maturityValue: number;
  /** maturityValue - deposit. */
  totalInterest: number;
  /** totalInterest / months — a smoothing metric, not what is paid monthly. */
  averageMonthlyInterest: number;
}

/**
 * CD maturity value from an APY quote.
 *
 *   FV = deposit * (1 + APY)^(months/12)
 *
 * APY already embeds the bank's internal compounding frequency (monthly and
 * daily are the common ones), so the quoted APY IS the effective annual
 * growth rate. Raising (1 + APY) to (months/12) handles partial years
 * exactly — a 6-month CD at 4% APY grows by a factor of 1.04^(0.5).
 */
export function cdMaturity(deposit: number, apyPct: number, months: number): CdMaturityResult {
  const d = Math.max(0, deposit);
  const m = Math.max(0, months);
  const apy = apyPct / 100;
  const maturityValue = d * Math.pow(1 + apy, m / 12);
  const totalInterest = maturityValue - d;
  return {
    maturityValue,
    totalInterest,
    averageMonthlyInterest: m > 0 ? totalInterest / m : 0,
  };
}

/** Balance of a CD at an arbitrary month milestone (for growth charts). */
export function cdBalanceAtMonth(deposit: number, apyPct: number, months: number): number {
  return cdMaturity(deposit, apyPct, months).maturityValue;
}

// ─── Investment math (annuity + fee drag + inflation) ─────────────────────────

/**
 * Future value with an initial lump sum plus end-of-month contributions,
 * compounded monthly:
 *
 *   FV = P*(1+i)^m + PMT * [((1+i)^m - 1) / i]
 *
 * where i = annualReturn/100/12 and m = years*12.
 */
export function annuityFV(
  principal: number,
  monthlyContribution: number,
  annualReturnPct: number,
  years: number
): number {
  const p = Math.max(0, principal);
  const pmt = Math.max(0, monthlyContribution);
  const m = Math.max(0, Math.round(years * 12));
  const i = annualReturnPct / 100 / 12;
  if (m === 0) return p;
  if (i === 0) return p + pmt * m;
  const growth = Math.pow(1 + i, m);
  return p * growth + pmt * ((growth - 1) / i);
}

export interface FeeDragResult {
  /** Gross return minus the fee (what your money actually earns). */
  netReturnPct: number;
  /** Balance after `years` earning the net return. */
  balanceWithFee: number;
  /** Balance after `years` earning the full gross return (zero-fee fund). */
  balanceNoFee: number;
  /** balanceNoFee - balanceWithFee: the fee's lifetime cost in dollars. */
  feeCost: number;
  /** Everything you put in: principal + monthly contributions. */
  totalContributed: number;
}

/**
 * Fee drag: project the same savings plan at the gross return and at the
 * net return (gross - fee). The difference is what fees silently consume.
 *
 * Fees compound against you exactly the way returns compound for you: a
 * 1% fee reduces every year's growth by ~1 percentage point, and the
 * shortfall itself earns nothing thereafter.
 */
export function feeDrag(
  principal: number,
  monthlyContribution: number,
  grossReturnPct: number,
  feePct: number,
  years: number
): FeeDragResult {
  const netReturnPct = grossReturnPct - feePct;
  const balanceNoFee = annuityFV(principal, monthlyContribution, grossReturnPct, years);
  const balanceWithFee = annuityFV(principal, monthlyContribution, netReturnPct, years);
  const totalContributed =
    Math.max(0, principal) + Math.max(0, monthlyContribution) * Math.max(0, Math.round(years * 12));
  return {
    netReturnPct,
    balanceWithFee,
    balanceNoFee,
    feeCost: balanceNoFee - balanceWithFee,
    totalContributed,
  };
}

/**
 * Convert a future nominal amount into today's dollars:
 *
 *   real = nominal / (1 + inflation)^years
 */
export function inflationAdjust(
  value: number,
  inflationPct: number,
  years: number
): number {
  const infl = Math.max(0, inflationPct) / 100;
  const t = Math.max(0, years);
  return value / Math.pow(1 + infl, t);
}
