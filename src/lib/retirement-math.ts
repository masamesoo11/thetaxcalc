/**
 * Pure retirement-planning math shared by the Retirement Calculator
 * (sufficiency: "will I have enough?") and the Roth IRA Calculator.
 *
 * No DOM access, no client APIs -- safe to import from server or client code.
 * All functions are pure and fully typed.
 *
 * ── Conventions ──────────────────────────────────────────────────────────
 * MONTHLY COMPOUNDING: the monthly rate i = annualReturnPct / 100 / 12.
 * This is the standard "annual/12" bank statement convention (the same one
 * used by this site's compound-interest engine), NOT the effective-rate
 * conversion (1+annual)^(1/12)-1. Contributions are added at the end of each
 * month and start earning returns the following month.
 *
 * ── 2026 figures and their sources ───────────────────────────────────────
 * - 401(k) employee limit $24,500, catch-up 50+ $8,000, super catch-up ages
 *   60-63 $11,250 (OBBBA): mirrors the site's existing 401(k) tool and
 *   src/lib/tax-config.ts era values (FEDERAL_TAX_2026 / Rev. Proc. 2025-32).
 * - Social Security wage cap $184,500: src/lib/tax-config.ts FICA_2026.
 * - IRA/Roth limits and MAGI phase-out bands below: 2026 IRS COLA values
 *   (IRS Rev. Proc. 2025-32 / IR-2025 retirement plan limits). These are NOT
 *   defined in tax-config.ts, so they are declared here with this comment as
 *   their provenance: contribution limit $7,500, catch-up $1,150 for age 50+;
 *   Roth MAGI phase-out Single/HoH $150,000-$165,000, MFJ $236,000-$246,000,
 *   MFS simplified to the $10,000-$12,000 zone.
 */

// ─── 2026 limits (see provenance comment above) ─────────────────────────────

/** 2026 traditional/Roth IRA contribution limit (IRS COLA 2026). */
export const IRA_CONTRIBUTION_LIMIT_2026 = 7500;

/** 2026 IRA catch-up for age 50+ (IRS COLA 2026). */
export const IRA_CATCH_UP_2026 = 1150;

/** Filing statuses supported by the Roth phase-out logic. */
export type RothFilingStatus = 'single' | 'mfj' | 'mfs';

/** 2026 Roth MAGI phase-out bands, in MAGI dollars [lower, upper). */
export const ROTH_PHASE_OUT_2026: Record<RothFilingStatus, [number, number]> = {
  single: [150000, 165000],
  mfj: [236000, 246000],
  mfs: [10000, 12000],
};

// ─── Core formulas ──────────────────────────────────────────────────────────

/**
 * Future value of a starting balance plus level monthly contributions,
 * compounded monthly at the annual/12 rate convention.
 *
 *   FV = P x (1+i)^n + C x [((1+i)^n - 1) / i]
 *
 * where i = annualReturnPct/100/12 and n = years x 12.
 * Returns 0 or a finite non-negative number for any numeric input.
 */
export function futureValueWithMonthlyContributions(
  principal: number,
  monthlyContribution: number,
  annualReturnPct: number,
  years: number
): number {
  const p = Math.max(0, Number.isFinite(principal) ? principal : 0);
  const c = Math.max(0, Number.isFinite(monthlyContribution) ? monthlyContribution : 0);
  const y = Math.max(0, Number.isFinite(years) ? years : 0);
  const rate = Number.isFinite(annualReturnPct) ? annualReturnPct : 0;
  const i = rate / 100 / 12;
  const n = Math.round(y * 12);

  if (n <= 0) return p;
  if (i === 0) return p + c * n;

  const growth = Math.pow(1 + i, n);
  const futurePrincipal = p * growth;
  const annuity = c * ((growth - 1) / i);
  return Math.max(0, futurePrincipal + annuity);
}

/**
 * Convert a future (nominal) amount into today's purchasing power:
 *   real = value / (1 + inflationPct/100)^years
 * Also usable in reverse to inflate a today's-dollar goal into nominal terms
 * by passing a negative inflation (prefer `inflateToNominal` for clarity).
 */
export function inflationAdjust(value: number, inflationPct: number, years: number): number {
  const v = Number.isFinite(value) ? value : 0;
  const y = Math.max(0, Number.isFinite(years) ? years : 0);
  const inf = Number.isFinite(inflationPct) ? inflationPct : 0;
  const denom = Math.pow(1 + inf / 100, y);
  if (denom <= 0) return 0;
  return v / denom;
}

/**
 * Inflation-adjust (escalate) a today's-dollar target into nominal future
 * dollars: nominal = value x (1 + inflationPct/100)^years.
 */
export function inflateToNominal(value: number, inflationPct: number, years: number): number {
  return value * Math.pow(1 + inflationPct / 100, Math.max(0, years));
}

/**
 * Annual income a nest egg can sustainably support under the "4% rule"
 * (the Bengen/Trinity-style safe-withdrawal heuristic):
 *   income = nestEgg x withdrawalPct / 100
 * `withdrawalPct` defaults to 4. Pass the nest egg in the same dollar basis
 * you want the income reported in (today's or future dollars).
 */
export function fourRuleIncome(nestEgg: number, withdrawalPct = 4): number {
  const egg = Math.max(0, Number.isFinite(nestEgg) ? nestEgg : 0);
  const pct = Number.isFinite(withdrawalPct) ? withdrawalPct : 4;
  return (egg * pct) / 100;
}

/**
 * The level monthly contribution required to reach `targetNestEgg` after
 * `years`, given a starting `principal` -- the algebraic inverse of
 * futureValueWithMonthlyContributions:
 *
 *   C = (target - P x (1+i)^n) x i / ((1+i)^n - 1)
 *
 * Returns 0 when the principal alone already reaches the target, and 0 when
 * the horizon is non-positive. Never returns a negative number.
 */
export function requiredContribution(
  targetNestEgg: number,
  principal: number,
  annualReturnPct: number,
  years: number
): number {
  const target = Math.max(0, Number.isFinite(targetNestEgg) ? targetNestEgg : 0);
  const p = Math.max(0, Number.isFinite(principal) ? principal : 0);
  const y = Math.max(0, Number.isFinite(years) ? years : 0);
  const rate = Number.isFinite(annualReturnPct) ? annualReturnPct : 0;
  const i = rate / 100 / 12;
  const n = Math.round(y * 12);

  if (n <= 0) return 0;

  const needFromContributions = Math.max(0, target - futureValueWithMonthlyContributions(p, 0, rate, y));

  if (i === 0) return needFromContributions / n;

  const growth = Math.pow(1 + i, n);
  const annuityFactor = (growth - 1) / i;
  if (annuityFactor <= 0) return 0;
  return Math.max(0, needFromContributions / annuityFactor);
}

// ─── Roth IRA eligibility ───────────────────────────────────────────────────

export interface RothPhaseOutResult {
  /** Fraction of the IRA limit this filer may still contribute: 0 to 1. */
  allowedMultiplier: number;
  /** Human-readable 2026 band and status label for display. */
  phaseOutLabel: string;
  /** True when MAGI sits strictly inside the phase-out band (partial). */
  inPhaseOut: boolean;
  /** True when MAGI is at/above the band ceiling (direct contribution blocked). */
  blocked: boolean;
}

/**
 * 2026 Roth IRA MAGI phase-out test.
 *
 * Below the band: full contribution (multiplier 1). At/above the band: no
 * direct Roth contribution (multiplier 0). Inside the band the allowed
 * fraction tapers linearly: (upper - MAGI) / (upper - lower).
 *
 * Married-filing-separately is simplified to the $10,000-$12,000 taper zone
 * used for planning purposes (MFS filers who lived with their spouse at any
 * point in the year face the ~$10,000 start; see IRS Pub 590-A).
 */
export function rothPhaseOut(magi: number, filing: RothFilingStatus): RothPhaseOutResult {
  const income = Math.max(0, Number.isFinite(magi) ? magi : 0);
  const [lower, upper] = ROTH_PHASE_OUT_2026[filing];

  const bandText =
    filing === 'single'
      ? '$150,000-$165,000 for single/head-of-household filers'
      : filing === 'mfj'
        ? '$236,000-$246,000 for married filing jointly'
        : '$10,000-$12,000 for married filing separately';

  if (income < lower) {
    return {
      allowedMultiplier: 1,
      phaseOutLabel: `Full contribution allowed - your MAGI is below the 2026 phase-out band (${bandText}).`,
      inPhaseOut: false,
      blocked: false,
    };
  }
  if (income >= upper) {
    return {
      allowedMultiplier: 0,
      phaseOutLabel: `Direct Roth contribution not allowed - your MAGI is at or above the top of the 2026 phase-out band (${bandText}).`,
      inPhaseOut: false,
      blocked: true,
    };
  }
  const multiplier = (upper - income) / (upper - lower);
  return {
    allowedMultiplier: Math.max(0, Math.min(1, multiplier)),
    phaseOutLabel: `Partial contribution - your MAGI falls inside the 2026 phase-out band (${bandText}), so your limit is prorated.`,
    inPhaseOut: true,
    blocked: false,
  };
}
