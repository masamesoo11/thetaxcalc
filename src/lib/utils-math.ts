/**
 * Pure math helpers for the quick-money calculators (tip, percentage change).
 *
 * Design rules (mirrors finance-utils.ts):
 * - Functions are pure: no side effects, no rounding side channels.
 * - Raw decimal values flow through the pipeline; callers round ONLY at the
 *   display node so cumulative rounding drift cannot accumulate.
 * - Every function guards its inputs so a stray NaN/Infinity from an input
 *   field can never reach the render tree.
 */

// ─── Tip ─────────────────────────────────────────────────────────────────────

export interface TipSplitResult {
  /** Tip amount in dollars (grows when roundUp collects extra). */
  tip: number;
  /** Full amount the group pays: bill + tip. */
  total: number;
  /** Amount each person pays toward the total. */
  perPerson: number;
  /** Tip portion each person covers. */
  perPersonTip: number;
}

export interface TipSplitOptions {
  /**
   * The dollar amount the tip percentage is applied to. Defaults to `bill`.
   * For "tip on the pre-tax subtotal" pass `pretaxTipBase(bill, taxPct)`.
   */
  tipBase?: number;
}

/**
 * Split a bill with a tip across N people.
 *
 * tipSplit(50, 18, 1, false)            -> { tip: 9,    total: 59,    perPerson: 59,    perPersonTip: 9    }
 * tipSplit(100, 18, 4, false)           -> { tip: 18,   total: 118,   perPerson: 29.5, perPersonTip: 4.5   }
 * tipSplit(100, 18, 4, true)            -> { tip: 20,   total: 120,   perPerson: 30,   perPersonTip: 5     }
 *   (29.50 per person rounds up to 30.00; the extra 2.00 becomes tip)
 *
 * @param bill    Full amount charged on the check (food + any sales tax).
 * @param tipPct  Tip percentage as a number (18 means 18%). Negative rates clamp to 0.
 * @param people  Number of people splitting. Clamped to a whole number >= 1.
 * @param roundUp When true, each person's share is rounded UP to the next whole
 *                dollar and the collected extra is added to the tip.
 * @param options Optional overrides (see TipSplitOptions).
 */
export function tipSplit(
  bill: number,
  tipPct: number,
  people: number,
  roundUp: boolean,
  options?: TipSplitOptions
): TipSplitResult {
  const safeBill = Number.isFinite(bill) ? Math.max(0, bill) : 0;
  const rate = Number.isFinite(tipPct) ? Math.max(0, tipPct) : 0;
  const n = Number.isFinite(people) ? Math.max(1, Math.floor(people)) : 1;
  const base =
    options && options.tipBase !== undefined && Number.isFinite(options.tipBase)
      ? Math.max(0, options.tipBase)
      : safeBill;

  let tip = (base * rate) / 100;
  let total = safeBill + tip;
  let perPerson = total / n;
  let perPersonTip = tip / n;

  if (roundUp) {
    perPerson = Math.ceil(perPerson);
    total = perPerson * n;
    tip = total - safeBill;
    perPersonTip = tip / n;
  }

  return { tip, total, perPerson, perPersonTip };
}

/**
 * Back the pre-tax subtotal out of a bill whose total already includes sales
 * tax. Example: a $50.00 check at 8.25% tax has a $46.19 subtotal
 * (50 / 1.0825). Tipping 18% on that base leaves a $8.31 tip.
 *
 * @param bill    Total on the check (assumed to include the sales tax).
 * @param taxPct  Combined sales-tax rate as a number (8.25 means 8.25%).
 */
export function pretaxTipBase(bill: number, taxPct: number): number {
  const safeBill = Number.isFinite(bill) ? Math.max(0, bill) : 0;
  const rate = Number.isFinite(taxPct) ? Math.max(0, taxPct) : 0;
  if (rate === 0) return safeBill;
  return safeBill / (1 + rate / 100);
}

// ─── Percentages ─────────────────────────────────────────────────────────────

/**
 * x percent of y. pctOf(15, 2000) -> 300 (15% of $2,000).
 */
export function pctOf(x: number, y: number): number {
  const safeX = Number.isFinite(x) ? x : 0;
  const safeY = Number.isFinite(y) ? y : 0;
  return (safeX / 100) * safeY;
}

/**
 * Signed percent change going FROM one value TO another:
 * (to - from) / from * 100.
 *
 * pctChange(50000, 52000) -> 4        (a 4% increase)
 * pctChange(52000, 50000) -> -3.846…  (about a 3.85% decrease)
 *
 * A starting value of exactly 0 makes the change mathematically undefined;
 * this returns +Infinity / -Infinity / 0 so callers can branch (display an
 * "undefined" hint) instead of rendering NaN.
 */
export function pctChange(from: number, to: number): number {
  const safeFrom = Number.isFinite(from) ? from : 0;
  const safeTo = Number.isFinite(to) ? to : 0;
  if (safeFrom === 0) {
    if (safeTo === 0) return 0;
    return safeTo > 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  }
  return ((safeTo - safeFrom) / safeFrom) * 100;
}

/**
 * Percentage DIFFERENCE of two values, relative to their average:
 * |a - b| / ((a + b) / 2) * 100.
 *
 * Unlike pctChange this is symmetric — it does not care which value came
 * first. pctDifference(60, 50) -> 18.1818… (10 / 55 * 100).
 *
 * If both values are 0 the difference is 0.
 */
export function pctDifference(a: number, b: number): number {
  const safeA = Number.isFinite(a) ? a : 0;
  const safeB = Number.isFinite(b) ? b : 0;
  const avg = (safeA + safeB) / 2;
  if (avg === 0) return 0;
  return (Math.abs(safeA - safeB) / avg) * 100;
}

/**
 * Apply a percentage to a value.
 *
 * applyPct(25, 5, 'increase')  -> 26.25   (25 increased by 5%)
 * applyPct(25, 5, 'decrease')  -> 23.75   (25 decreased by 5%)
 * applyPct(2000, 15, 'decrease')-> 1700    (15% off 2,000)
 *
 * @param value     Starting value.
 * @param pct       Percentage as a number (5 means 5%). Negative clamps to 0.
 * @param direction 'increase' or 'decrease'.
 */
export function applyPct(
  value: number,
  pct: number,
  direction: 'increase' | 'decrease'
): number {
  const safeValue = Number.isFinite(value) ? value : 0;
  const rate = Number.isFinite(pct) ? Math.max(0, pct) : 0;
  if (direction === 'increase') {
    return safeValue * (1 + rate / 100);
  }
  return safeValue * (1 - rate / 100);
}
