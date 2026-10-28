/**
 * Payoff & purchasing-power math (Task 41).
 *
 * Pure functions + BLS CPI-U annual-average table backing three calculators:
 *  - /inflation-calculator     (then-vs-now CPI adjustment + forward projection)
 *  - /debt-payoff-calculator   (fixed-payment debt payoff schedule, incl. extra)
 *  - /debt-to-income-calculator (front-end / back-end DTI ratios)
 *
 * Every anchor figure quoted in the page copy was verified with
 * `bun /tmp/verify-payoff-math.ts` against this exact implementation:
 *  - $5,000 @ 22% APR, $200/mo  -> 34 months, $1,749.88 interest (payoff 2029-08)
 *  - same with +$50/mo ($250)   -> 26 months, $1,285.72 interest (saves 8 mo / $464.16)
 *  - same with +$100/mo ($300)  -> 21 months, $1,021.60 interest (saves 13 mo / $728.28)
 *  - $92/mo on the same debt    -> 310 months, $23,462.14 interest (low-payment trap)
 *  - $100 in 2000 -> 2025 CPI   -> $186.99 (cumulative +86.99%, avg 2.54%/yr)
 *  - $6,000 income, $2,300 debts -> 38.33% back-end / 25.00% front-end DTI
 */

// ─── BLS CPI-U annual averages (1913-2025) ────────────────────────────────────
// Source: U.S. Bureau of Labor Statistics, CPI-U (all items, annual average).
// 1984+ values are the three-decimal published series; the 2025 figure is the
// annual average of the published 2025 monthly indexes.
export const CPI_ANNUAL: Readonly<Record<number, number>> = {
  1913: 9.9, 1914: 10.0, 1915: 10.1, 1916: 10.9, 1917: 12.8, 1918: 15.1,
  1919: 17.3, 1920: 20.0, 1921: 17.9, 1922: 16.8, 1923: 17.1, 1924: 17.1,
  1925: 17.5, 1926: 17.7, 1927: 17.4, 1928: 17.1, 1929: 17.1, 1930: 16.7,
  1931: 15.2, 1932: 13.7, 1933: 13.0, 1934: 13.4, 1935: 13.7, 1936: 13.9,
  1937: 14.4, 1938: 14.1, 1939: 13.9, 1940: 14.0, 1941: 14.7, 1942: 16.3,
  1943: 17.3, 1944: 17.6, 1945: 18.0, 1946: 19.5, 1947: 22.3, 1948: 24.1,
  1949: 23.8, 1950: 24.1, 1951: 26.0, 1952: 26.5, 1953: 26.7, 1954: 26.9,
  1955: 26.8, 1956: 27.2, 1957: 27.9, 1958: 28.9, 1959: 29.1, 1960: 29.6,
  1961: 29.9, 1962: 30.2, 1963: 30.6, 1964: 31.0, 1965: 31.5, 1966: 32.4,
  1967: 33.4, 1968: 34.8, 1969: 36.7, 1970: 38.8, 1971: 40.5, 1972: 41.8,
  1973: 44.4, 1974: 49.3, 1975: 53.8, 1976: 56.9, 1977: 60.6, 1978: 65.2,
  1979: 72.6, 1980: 82.4, 1981: 90.9, 1982: 96.5, 1983: 99.6, 1984: 103.9,
  1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0, 1990: 130.7,
  1991: 136.2, 1992: 140.3, 1993: 144.5, 1994: 148.2, 1995: 152.4, 1996: 156.9,
  1997: 160.5, 1998: 163.0, 1999: 166.6, 2000: 172.2, 2001: 177.1, 2002: 179.9,
  2003: 184.0, 2004: 188.9, 2005: 195.3, 2006: 201.6, 2007: 207.342,
  2008: 215.303, 2009: 214.537, 2010: 218.056, 2011: 224.939, 2012: 229.594,
  2013: 232.957, 2014: 236.736, 2015: 237.017, 2016: 240.007, 2017: 245.120,
  2018: 251.107, 2019: 255.657, 2020: 258.811, 2021: 271.696, 2022: 292.655,
  2023: 304.702, 2024: 313.689, 2025: 322.0,
};

export const CPI_MIN_YEAR = 1913;
export const CPI_MAX_YEAR = 2025;

// ─── Inflation: then vs now ───────────────────────────────────────────────────

export interface InflationBetweenResult {
  adjustedValue: number;
  cumulativePct: number;
  avgAnnualPct: number;
}

/** What amount X in startYear equals in endYear dollars (CPI-U ratio). */
export function inflateBetween(
  amount: number,
  startYear: number,
  endYear: number,
): InflationBetweenResult | null {
  const cStart = CPI_ANNUAL[startYear];
  const cEnd = CPI_ANNUAL[endYear];
  if (!cStart || !cEnd) return null;
  const ratio = cEnd / cStart;
  const years = Math.abs(endYear - startYear) || 1;
  const avg = (Math.pow(ratio, 1 / years) - 1) * 100;
  return {
    adjustedValue: amount * ratio,
    cumulativePct: (ratio - 1) * 100,
    avgAnnualPct: avg,
  };
}

/** Year-by-year value curve between two years (for the SVG chart). */
export function inflationCurve(
  amount: number,
  startYear: number,
  endYear: number,
): { year: number; value: number }[] {
  const step = startYear <= endYear ? 1 : -1;
  const points: { year: number; value: number }[] = [];
  for (let y = startYear; step > 0 ? y <= endYear : y >= endYear; y += step) {
    const cpi = CPI_ANNUAL[y];
    if (!cpi) continue;
    const base = CPI_ANNUAL[startYear];
    if (!base) break;
    points.push({ year: y, value: (amount * cpi) / base });
  }
  return points;
}

// ─── Inflation: forward projection ────────────────────────────────────────────

export interface ProjectionResult {
  futureCost: number;
  purchasingPower: number;
  lossPct: number;
  curve: { year: number; value: number }[];
}

/** Future cost of today's basket at a fixed annual rate, + purchasing power. */
export function projectForward(
  amount: number,
  annualRatePct: number,
  years: number,
): ProjectionResult {
  const factor = Math.pow(1 + annualRatePct / 100, Math.max(years, 0));
  const futureCost = amount * factor;
  const purchasingPower = factor > 0 ? amount / factor : amount;
  const curve: { year: number; value: number }[] = [];
  for (let y = 0; y <= Math.max(years, 0); y++) {
    curve.push({ year: y, value: amount * Math.pow(1 + annualRatePct / 100, y) });
  }
  return {
    futureCost,
    purchasingPower,
    lossPct: (1 - purchasingPower / amount) * 100,
    curve,
  };
}

// ─── Debt payoff ──────────────────────────────────────────────────────────────

export interface PayoffRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export interface PayoffResult {
  months: number; // -1 => payment never covers interest
  totalInterest: number;
  totalPaid: number;
  firstMonthInterest: number;
  payoffYear: number;
  payoffMonthIdx: number; // 0-11
  rows: PayoffRow[];
}

export const PAYOFF_NEVER = -1;

/**
 * Month-by-month fixed-payment payoff. Interest = balance x (APR/12) each month;
 * the final payment is trimmed to the remaining balance. Returns
 * months = PAYOFF_NEVER when the payment does not exceed the first month's
 * interest (the balance would grow forever).
 */
export function payoffSchedule(
  balance: number,
  aprPct: number,
  monthlyPayment: number,
  extraMonthly = 0,
  startDate: Date = new Date(),
): PayoffResult {
  const r = aprPct / 100 / 12;
  const payment = monthlyPayment + extraMonthly;
  const firstMonthInterest = balance * r;
  const empty: PayoffResult = {
    months: PAYOFF_NEVER,
    totalInterest: 0,
    totalPaid: 0,
    firstMonthInterest,
    payoffYear: 0,
    payoffMonthIdx: 0,
    rows: [],
  };
  if (!(payment > firstMonthInterest) || balance <= 0) return empty;

  let bal = balance;
  let totalInterest = 0;
  let totalPaid = 0;
  const rows: PayoffRow[] = [];
  let month = 0;
  const cap = 1200; // 100-year hard stop (safety)

  while (bal > 0.005 && month < cap) {
    month += 1;
    const interest = bal * r;
    let principal = payment - interest;
    let paid = payment;
    if (principal >= bal) {
      principal = bal;
      paid = bal + interest;
    }
    bal = bal - principal;
    totalInterest += interest;
    totalPaid += paid;
    rows.push({ month, payment: paid, interest, principal, balance: Math.max(bal, 0) });
  }

  const payoffDate = new Date(startDate.getFullYear(), startDate.getMonth() + month, 1);
  return {
    months: month,
    totalInterest,
    totalPaid,
    firstMonthInterest,
    payoffYear: payoffDate.getFullYear(),
    payoffMonthIdx: payoffDate.getMonth(),
    rows,
  };
}

// ─── Debt-to-income ───────────────────────────────────────────────────────────

export const DTI_QM_LIMIT_PCT = 43; // Qualified-Mortgage line
export const DTI_HARD_CAP_PCT = 50; // above this, approval is rare

export type DtiClassification = 'excellent' | 'good' | 'caution' | 'high';

export interface DtiInput {
  housing: number; // mortgage/rent incl. taxes + insurance
  carLoans: number;
  creditCardMinimums: number;
  studentLoans: number;
  other: number; // child support, alimony, other installment debt
}

export interface DtiResult {
  totalDebtPayments: number;
  frontEndPct: number;
  backEndPct: number;
  classification: DtiClassification;
}

/** Back-end = all monthly debt payments / gross monthly income. */
export function debtToIncome(grossMonthlyIncome: number, input: DtiInput): DtiResult {
  const totalDebtPayments =
    input.housing + input.carLoans + input.creditCardMinimums + input.studentLoans + input.other;
  const income = Math.max(grossMonthlyIncome, 1e-9);
  const backEndPct = (totalDebtPayments / income) * 100;
  const frontEndPct = (input.housing / income) * 100;

  let classification: DtiClassification = 'excellent';
  if (backEndPct > 50) classification = 'high';
  else if (backEndPct >= 42) classification = 'caution';
  else if (backEndPct >= 37) classification = 'good';

  return { totalDebtPayments, frontEndPct, backEndPct, classification };
}
