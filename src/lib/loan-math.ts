/**
 * Pure loan math for the loans calculator group
 * (auto-loan, loan, personal-loan, amortization calculators).
 *
 * Every function here is pure (no I/O, no globals) and rounds to cents at the
 * row level so rendered tables always tie out exactly with rendered totals.
 *
 * Standard fixed-rate annuity formulas only:
 *   r = APR / 12 / 100                       (monthly periodic rate)
 *   M = P * [r(1+r)^n] / [(1+r)^n - 1]       (level monthly payment)
 *   if r === 0, M = P / n
 */

/** Round a value to US cents. */
export function roundCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Monthly periodic rate from a nominal APR.
 * 6.5 (percent) -> 0.0054166... (6.5 / 1200).
 * Negative APR is clamped to 0 (banks do not pay you to borrow).
 */
export function monthlyRate(aprPct: number): number {
  return Math.max(0, aprPct) / 1200;
}

/**
 * Level monthly payment for a fully amortizing fixed-rate loan.
 *
 * M = P * [r(1+r)^n] / [(1+r)^n - 1], or P / n when the rate is zero.
 * Returns 0 for a non-positive principal or term.
 */
export function monthlyPayment(principal: number, aprPct: number, termMonths: number): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  const r = monthlyRate(aprPct);
  if (r === 0) return principal / termMonths;
  const factor = Math.pow(1 + r, termMonths);
  return (principal * r * factor) / (factor - 1);
}

/** One month of an amortization schedule, rounded to cents. */
export interface AmortizationRow {
  /** 1-based payment number. */
  month: number;
  /** Total cash paid this month (interest + principal portion, cents-rounded). */
  payment: number;
  /** Interest accrued on the prior balance this month. */
  interest: number;
  /** Principal retired this month (includes any extra payment). */
  principal: number;
  /** Remaining balance after this payment (never negative). */
  balance: number;
}

/** Whole-life totals derived from the schedule rows. */
export interface AmortizationTotals {
  /** Sum of every interest amount across the schedule. */
  totalInterest: number;
  /** Sum of every payment across the schedule. */
  totalPaid: number;
  /** Number of payments actually made (<= termMonths once extras apply). */
  months: number;
  /** Payment number that retired the loan (equals months for a payoff schedule). */
  payoffMonth: number;
}

/** A full month-by-month schedule plus its whole-life totals. */
export interface AmortizationSchedule {
  rows: AmortizationRow[];
  totals: AmortizationTotals;
  /** The level payment used before any extra amount is applied. */
  basePayment: number;
}

/**
 * Build a full amortization schedule.
 *
 * The contractual payment is the exact level annuity (monthlyPayment) and
 * stays FIXED in every row (the way a bank prints a schedule); each month's
 * interest is the prior balance times the monthly rate, and whatever is left
 * of the payment retires principal. Extra monthly payments go straight to
 * principal, which shortens the loan: the schedule simply ends once the
 * balance hits zero, and the final payment is trimmed to the exact remaining
 * balance so the loan is never overpaid. The ledger is kept at full float
 * precision (totals match the closed form M x n - P exactly); components
 * round only for display.
 *
 * The loop is capped at termMonths payments (and the last allowed payment
 * always retires whatever is left, covering any drift), so a base schedule
 * always ends at exactly termMonths with a zero balance, while extras can
 * only shorten the term.
 */
export function buildAmortization(
  principal: number,
  aprPct: number,
  termMonths: number,
  extraMonthly = 0
): AmortizationSchedule {
  const rows: AmortizationRow[] = [];
  const emptyTotals: AmortizationTotals = { totalInterest: 0, totalPaid: 0, months: 0, payoffMonth: 0 };
  if (principal <= 0 || termMonths <= 0) {
    return { rows, totals: emptyTotals, basePayment: 0 };
  }

  const r = monthlyRate(aprPct);
  const base = monthlyPayment(principal, aprPct, termMonths);
  const extra = Math.max(0, extraMonthly);

  let balance = principal;
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;

  while (balance > 0.005 && month < termMonths) {
    month += 1;
    const interest = balance * r;
    // Principal is whatever the fixed payment (plus any extra) leaves after
    // interest. The floor keeps the loop moving on pathological micro-tiny
    // balances; the caps below keep it exact for normal ones.
    let principalPart = base + extra - interest;
    if (principalPart < 0.01) principalPart = 0.01;
    if (month === termMonths || principalPart >= balance) principalPart = balance;
    const rowPayment = interest + principalPart;
    balance = Math.max(0, balance - principalPart);
    totalInterest += interest;
    totalPaid += rowPayment;
    rows.push({ month, payment: rowPayment, interest, principal: principalPart, balance });
  }

  return {
    rows,
    totals: { totalInterest, totalPaid, months: month, payoffMonth: month },
    basePayment: base,
  };
}

/** One calendar-year aggregate of an amortization schedule. */
export interface YearlySummaryRow {
  /** 1-based loan year (payments 1-12 belong to year 1, etc.). */
  year: number;
  /** Interest paid during this loan year. */
  interestPaid: number;
  /** Principal retired during this loan year. */
  principalPaid: number;
  /** Balance remaining at the end of this loan year. */
  endBalance: number;
}

/**
 * Aggregate schedule rows into loan-year buckets.
 * Expects rows from buildAmortization (any tail of the schedule works too,
 * which is how the calculators show "first-year" mini tables).
 */
export function yearlySummary(rows: AmortizationRow[]): YearlySummaryRow[] {
  const years: YearlySummaryRow[] = [];
  for (const row of rows) {
    const year = Math.ceil(row.month / 12);
    let bucket = years.find((y) => y.year === year);
    if (!bucket) {
      bucket = { year, interestPaid: 0, principalPaid: 0, endBalance: 0 };
      years.push(bucket);
    }
    bucket.interestPaid += row.interest;
    bucket.principalPaid += row.principal;
    bucket.endBalance = row.balance;
  }
  return years.sort((a, b) => a.year - b.year);
}

/** Format a number as USD with the given fraction digits (default 2). */
export function formatUsd(value: number, fractionDigits = 2): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

/** Describe a month count as e.g. "5 yr 3 mo" (used for payoff comparisons). */
export function formatTerm(months: number): string {
  if (months <= 0) return '0 mo';
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearPart = years > 0 ? `${years} yr` : '';
  const monthPart = rest > 0 ? `${rest} mo` : '';
  return [yearPart, monthPart].filter(Boolean).join(' ');
}
