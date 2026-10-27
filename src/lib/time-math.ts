/**
 * Time Card + Payroll pure-math library.
 *
 * Two responsibilities:
 *   1. Timesheet math - clock in/out times to decimal hours, weekly overtime
 *      splits (FLSA: over 40 h/week at 1.5x), and gross pay.
 *   2. Payroll-run math - per-period FICA (employee + employer halves),
 *      FUTA / SUTA allocations, and a simplified federal withholding estimate.
 *
 * Tax figures come from the site's own config (src/lib/tax-config) and are
 * never duplicated here:
 *   - Social Security 6.2% capped at the 2026 wage base ($184,500)
 *   - Medicare 1.45% (no cap) + 0.9% additional Medicare above $200K
 *     (employee only - employers never match the extra 0.9%)
 *   - 2026 federal brackets + single-filer standard deduction ($16,100)
 *
 * Only FUTA / SUTA constants live here (they are not part of tax-config):
 *   - FUTA effective rate 0.6% on the first $7,000 per employee per year
 *   - SUTA is caller-supplied (default wage base $9,500)
 */

import { FICA_2026, FEDERAL_TAX_2026 } from './tax-config';

// ─── Constants ────────────────────────────────────────────────────────────────

/** FLSA weekly overtime threshold: 40 hours = 2,400 minutes. */
export const FEDERAL_OT_WEEK_MINUTES = 40 * 60;

/** FLSA default overtime multiplier (time and a half). */
export const DEFAULT_OT_MULTIPLIER = 1.5;

/** Effective FUTA rate: 6.0% minus the 5.4% credit for timely state unemployment = 0.6%. */
export const FUTA_EFFECTIVE_RATE = 0.006;

/** FUTA wage base: only the first $7,000 of each employee's wages are taxed (max $42/yr). */
export const FUTA_WAGE_BASE = 7000;

/** Default SUTA wage base. Typical state bases run $7,000-$67,500; check your state notice. */
export const DEFAULT_SUTA_WAGE_BASE = 9500;

// ─── Time parsing + display helpers ──────────────────────────────────────────

/**
 * Parse an "HH:MM" 24-hour string into minutes since midnight.
 * Returns null for empty or malformed input.
 */
export function parseTimeToMinutes(hhmm: string): number | null {
  if (!hhmm || typeof hhmm !== 'string') return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return hours * 60 + minutes;
}

/** Convert worked minutes to decimal hours (450 min -> 7.5). */
export function minutesToDecimalHours(minutes: number): number {
  return Math.max(0, minutes) / 60;
}

/** Format decimal hours for display (7.75 -> "7h 45m"). */
export function decimalToHM(decimalHours: number): string {
  const totalMinutes = Math.round(Math.max(0, decimalHours) * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/** Format worked minutes as an h:mm clock total (2250 min -> "37:30"). */
export function minutesToHM(minutes: number): string {
  const total = Math.max(0, Math.round(minutes));
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h}:${String(m).padStart(2, '0')}`;
}

// ─── Timesheet math ──────────────────────────────────────────────────────────

/**
 * Worked minutes for one day from clock in/out strings.
 *
 * - Overnight shifts (end before start, e.g. 22:00 -> 06:00) roll the end
 *   time forward 24 h, so a graveyard shift counts 8.00 h, never negative.
 * - Unpaid break minutes are subtracted and clamped to the shift span.
 * - Empty or invalid times yield 0. Identical start and end also yield 0.
 */
export function dayWorkedMinutes(
  startHHMM: string,
  endHHMM: string,
  breakMinutes = 0,
): number {
  const start = parseTimeToMinutes(startHHMM);
  const end = parseTimeToMinutes(endHHMM);
  if (start === null || end === null) return 0;
  let span = end - start;
  if (span < 0) span += 24 * 60; // overnight shift crossed midnight
  const unpaidBreak = Math.max(0, Math.min(breakMinutes, span));
  return Math.max(0, span - unpaidBreak);
}

/** One day of a time card: raw clock strings plus the unpaid break length. */
export interface TimeCardDayInput {
  start: string;
  end: string;
  breakMinutes?: number;
}

/** Weekly minute totals split into regular and overtime buckets. */
export interface WeekTotals {
  totalMinutes: number;
  regularMinutes: number;
  overtimeMinutes: number;
}

/**
 * Weekly totals for a Mon-Sun time card.
 *
 * Overtime = every minute past the federal 40 h/week threshold (FLSA).
 * California daily-overtime rules (1.5x over 8 h/day, 2x over 12 h) are NOT
 * applied - this uses the federal weekly standard only.
 */
export function weekTotals(days: TimeCardDayInput[]): WeekTotals {
  let totalMinutes = 0;
  for (const day of days) {
    totalMinutes += dayWorkedMinutes(day.start, day.end, day.breakMinutes ?? 0);
  }
  const overtimeMinutes = Math.max(0, totalMinutes - FEDERAL_OT_WEEK_MINUTES);
  return {
    totalMinutes,
    regularMinutes: totalMinutes - overtimeMinutes,
    overtimeMinutes,
  };
}

/** Gross-pay split between regular hours and overtime hours. */
export interface GrossPayBreakdown {
  regularPay: number;
  overtimePay: number;
  total: number;
}

/**
 * Gross pay from weekly minute totals.
 * Overtime is paid at rate x otMultiplier (default 1.5x per the FLSA).
 */
export function grossPay(
  regularMinutes: number,
  overtimeMinutes: number,
  hourlyRate: number,
  otMultiplier = DEFAULT_OT_MULTIPLIER,
): GrossPayBreakdown {
  const rate = Math.max(0, hourlyRate);
  const multiplier = Math.max(0, otMultiplier);
  const regularPay = minutesToDecimalHours(regularMinutes) * rate;
  const overtimePay = minutesToDecimalHours(overtimeMinutes) * rate * multiplier;
  return { regularPay, overtimePay, total: regularPay + overtimePay };
}

// ─── FICA (employee + employer halves) ────────────────────────────────────────

/** FICA split into the employee half and the employer match. */
export interface FicaBreakdown {
  employeeSocialSecurity: number;
  employeeMedicare: number;
  employeeAdditionalMedicare: number;
  employeeTotal: number;
  employerSocialSecurity: number;
  employerMedicare: number;
  employerTotal: number;
}

/**
 * FICA on annual gross wages, both halves.
 *
 * Both halves share the same rates from FICA_2026: Social Security 6.2%
 * capped at the 2026 wage base, Medicare 1.45% uncapped. The 0.9% additional
 * Medicare tax above $200,000 is withheld from the EMPLOYEE only - employers
 * never match it.
 */
export function ficaEmployee(annualGross: number): FicaBreakdown {
  const gross = Math.max(0, annualGross);
  const ssWages = Math.min(gross, FICA_2026.socialSecurityWageCap);
  const employeeSocialSecurity = ssWages * FICA_2026.socialSecurityRate;
  const employeeMedicare = gross * FICA_2026.medicareRate;
  const overThreshold = Math.max(0, gross - FICA_2026.additionalMedicareThreshold);
  const employeeAdditionalMedicare = overThreshold * FICA_2026.additionalMedicareRate;
  return {
    employeeSocialSecurity,
    employeeMedicare,
    employeeAdditionalMedicare,
    employeeTotal:
      employeeSocialSecurity + employeeMedicare + employeeAdditionalMedicare,
    employerSocialSecurity: employeeSocialSecurity,
    employerMedicare: employeeMedicare,
    employerTotal: employeeSocialSecurity + employeeMedicare,
  };
}

/**
 * Simplified federal income-tax estimate for withholding displays:
 * single filer, 2026 standard deduction, 2026 brackets (all from
 * FEDERAL_TAX_2026). No credits, no pre-tax deductions, no state tax.
 */
export function federalIncomeTaxEstimate(annualGross: number): number {
  const std =
    FEDERAL_TAX_2026.standardDeductionsByFiling.single ??
    FEDERAL_TAX_2026.standardDeduction;
  const brackets =
    FEDERAL_TAX_2026.bracketsByFiling.single ?? FEDERAL_TAX_2026.brackets;
  const taxable = Math.max(0, annualGross - std);
  if (taxable === 0) return 0;
  let tax = 0;
  let remaining = taxable;
  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const width = bracket.max === null ? remaining : bracket.max - bracket.min;
    const inBracket = Math.min(remaining, width);
    tax += inBracket * bracket.rate;
    remaining -= inBracket;
  }
  return tax;
}

// ─── Unemployment taxes (FUTA / SUTA) ─────────────────────────────────────────

/**
 * Effective FUTA per employee per year: 0.6% of the first $7,000 of wages
 * (6.0% headline rate minus the 5.4% credit for paying state unemployment).
 * Maximum $42 per employee per year.
 */
export function futa(annualGross: number): number {
  return (
    Math.min(Math.max(0, annualGross), FUTA_WAGE_BASE) * FUTA_EFFECTIVE_RATE
  );
}

/**
 * SUTA per employee per year: sutaRatePct is a PERCENT (3.0 = 3.0%) applied
 * to the first sutaWageBase of wages. Rates and bases vary by state and by
 * the employer's experience rating.
 */
export function suta(
  annualGross: number,
  sutaRatePct: number,
  sutaWageBase = DEFAULT_SUTA_WAGE_BASE,
): number {
  const base = Math.max(0, sutaWageBase);
  const rate = Math.max(0, sutaRatePct) / 100;
  return Math.min(Math.max(0, annualGross), base) * rate;
}

// ─── Payroll run (per-period view) ────────────────────────────────────────────

/** Optional employer-side knobs for a payroll run. */
export interface PayrollRunOptions {
  /** SUTA rate in percent (3.0 = 3%). Default 3.0. */
  sutaRatePct?: number;
  /** SUTA wage base. Default $9,500. */
  sutaWageBase?: number;
  /** Workers' comp premium in percent of wages (1.0 = 1%). Default 0. */
  workersCompPct?: number;
  /** Employer-paid benefits in dollars per month. Default 0. */
  benefitsPerMonth?: number;
}

/** One payroll period, from the employer's seat. */
export interface PayrollRunResult {
  periodsPerYear: number;
  annualGross: number;
  /** Gross wages for this period. */
  periodGross: number;
  /** Employee Social Security withheld this period (6.2%, capped). */
  employeeSocialSecurity: number;
  /** Employee Medicare withheld this period (1.45%, uncapped). */
  employeeMedicare: number;
  /** Employee additional Medicare this period (0.9% above $200K annual). */
  employeeAdditionalMedicare: number;
  /** Total employee-side FICA this period. */
  employeeFica: number;
  /** Employer FICA match this period (6.2% + 1.45%, never the 0.9%). */
  employerFica: number;
  /** Simplified federal withholding estimate this period (single filer). */
  federalIncomeTax: number;
  /** Estimated employee net this period (gross - FICA - federal estimate). */
  employeeNet: number;
  /** FUTA allocation this period (annual cost / periods). */
  employerFuta: number;
  /** SUTA allocation this period (annual cost / periods). */
  employerSuta: number;
  /** Workers' comp allocation this period. */
  employerWorkersComp: number;
  /** Benefits allocation this period (monthly amount x 12 / periods). */
  employerBenefits: number;
  /** Total employer cost this period (gross + every employer-side cost). */
  employerTotalPerPeriod: number;
  /** Total employer cost per year. */
  employerAnnualCost: number;
  /** Employer add-ons as a fraction of gross (0.092 = 9.2%). */
  markupPct: number;
}

/**
 * Run one payroll period on annualized wages.
 *
 * Every annual cost (FICA match, FUTA, SUTA, workers' comp, benefits) is
 * divided evenly across payPeriodsPerYear so wage caps and thresholds are
 * applied at the annual level first - the way payroll systems actually do it.
 * All figures are unrounded floats; round only at display time.
 */
export function payrollRun(
  annualGross: number,
  payPeriodsPerYear: number,
  options?: PayrollRunOptions,
): PayrollRunResult {
  const gross = Math.max(0, annualGross);
  const periods = Math.max(1, Math.round(payPeriodsPerYear));
  const {
    sutaRatePct = 3.0,
    sutaWageBase = DEFAULT_SUTA_WAGE_BASE,
    workersCompPct = 0,
    benefitsPerMonth = 0,
  } = options ?? {};

  const fica = ficaEmployee(gross);
  const annualFederalIncomeTax = federalIncomeTaxEstimate(gross);
  const annualFuta = futa(gross);
  const annualSuta = suta(gross, sutaRatePct, sutaWageBase);
  const annualWorkersComp = (gross * Math.max(0, workersCompPct)) / 100;
  const annualBenefits = Math.max(0, benefitsPerMonth) * 12;

  const periodGross = gross / periods;
  const employeeSocialSecurity = fica.employeeSocialSecurity / periods;
  const employeeMedicare = fica.employeeMedicare / periods;
  const employeeAdditionalMedicare = fica.employeeAdditionalMedicare / periods;
  const employeeFica = fica.employeeTotal / periods;
  const employerFica = fica.employerTotal / periods;
  const federalIncomeTax = annualFederalIncomeTax / periods;
  const employerFuta = annualFuta / periods;
  const employerSuta = annualSuta / periods;
  const employerWorkersComp = annualWorkersComp / periods;
  const employerBenefits = annualBenefits / periods;
  const employerTotalPerPeriod =
    periodGross +
    employerFica +
    employerFuta +
    employerSuta +
    employerWorkersComp +
    employerBenefits;
  const markupPct =
    periodGross > 0 ? (employerTotalPerPeriod - periodGross) / periodGross : 0;

  return {
    periodsPerYear: periods,
    annualGross: gross,
    periodGross,
    employeeSocialSecurity,
    employeeMedicare,
    employeeAdditionalMedicare,
    employeeFica,
    employerFica,
    federalIncomeTax,
    employeeNet: periodGross - employeeFica - federalIncomeTax,
    employerFuta,
    employerSuta,
    employerWorkersComp,
    employerBenefits,
    employerTotalPerPeriod,
    employerAnnualCost: employerTotalPerPeriod * periods,
    markupPct,
  };
}
