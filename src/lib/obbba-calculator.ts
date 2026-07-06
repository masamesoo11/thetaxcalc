/**
 * OBBBA Tax Calculator Library
 * ---------------------------------------------------------------------------
 * Implements the 2026 individual income tax calculation under two scenarios:
 *   1. OBBBA (One Big Beautiful Bill Act) — the law in effect for 2026.
 *   2. Prior law — what would have applied if TCJA had sunset on 12/31/2025.
 *
 * All figures are sourced from IRS Revenue Procedure 2025-25, the SSA
 * Contribution and Benefit Base announcement, and the Joint Committee on
 * Taxation's description of OBBBA (P.L. 119-1).
 *
 * This file is server-safe (no DOM, no client APIs) so it can be imported
 * from both server components and the interactive client component.
 */

// ─── 2026 OBBBA Federal Brackets (TCJA made permanent) ────────────────────
// Source: IRS Revenue Procedure 2025-25
const OBBBA_BRACKETS = {
  single: [
    { rate: 0.10, upTo: 11925 },
    { rate: 0.12, upTo: 48475 },
    { rate: 0.22, upTo: 103350 },
    { rate: 0.24, upTo: 197300 },
    { rate: 0.32, upTo: 250525 },
    { rate: 0.35, upTo: 626350 },
    { rate: 0.37, upTo: Infinity },
  ],
  mfj: [
    { rate: 0.10, upTo: 23850 },
    { rate: 0.12, upTo: 96950 },
    { rate: 0.22, upTo: 206700 },
    { rate: 0.24, upTo: 394600 },
    { rate: 0.32, upTo: 501050 },
    { rate: 0.35, upTo: 751600 },
    { rate: 0.37, upTo: Infinity },
  ],
  hoh: [
    { rate: 0.10, upTo: 17000 },
    { rate: 0.12, upTo: 64850 },
    { rate: 0.22, upTo: 165500 },
    { rate: 0.24, upTo: 315900 },
    { rate: 0.32, upTo: 400000 },
    { rate: 0.35, upTo: 638300 },
    { rate: 0.37, upTo: Infinity },
  ],
} as const;

// ─── Pre-TCJA Brackets (would-have-been 2026 law) ─────────────────────────
// Approximated from the pre-TCJA IRC §1 as adjusted for 2026 inflation by
// the JCT and Tax Policy Center. Used only for the comparison scenario.
const PRIOR_BRACKETS = {
  single: [
    { rate: 0.10, upTo: 11000 },
    { rate: 0.15, upTo: 44725 },
    { rate: 0.25, upTo: 108075 },
    { rate: 0.28, upTo: 195450 },
    { rate: 0.33, upTo: 329800 },
    { rate: 0.35, upTo: 414200 },
    { rate: 0.396, upTo: Infinity },
  ],
  mfj: [
    { rate: 0.10, upTo: 22000 },
    { rate: 0.15, upTo: 89450 },
    { rate: 0.25, upTo: 178150 },
    { rate: 0.28, upTo: 217450 },
    { rate: 0.33, upTo: 361700 },
    { rate: 0.35, upTo: 445800 },
    { rate: 0.396, upTo: Infinity },
  ],
  hoh: [
    { rate: 0.10, upTo: 15700 },
    { rate: 0.15, upTo: 60600 },
    { rate: 0.25, upTo: 155600 },
    { rate: 0.28, upTo: 199450 },
    { rate: 0.33, upTo: 329800 },
    { rate: 0.35, upTo: 414200 },
    { rate: 0.396, upTo: Infinity },
  ],
} as const;

// ─── Standard Deductions (2026) ───────────────────────────────────────────
const OBBBA_STANDARD_DEDUCTION = {
  single: 16100,
  mfj: 32200,
  hoh: 24150,
} as const;

const PRIOR_STANDARD_DEDUCTION = {
  single: 8000,
  mfj: 16000,
  hoh: 11600,
} as const;

// Additional standard deduction for 65+ (2026, approximated)
const ADDITIONAL_SENIOR_DEDUCTION = {
  single: 1950,
  mfj: 1950, // per spouse; simplified
} as const;

// ─── OBBBA New Provisions ─────────────────────────────────────────────────
const OBBBA_CHILD_TAX_CREDIT = 2200; // per qualifying child under 17
const OBBBA_CTC_REFUNDABLE = 1700;
const OBBBA_CTC_PHASEOUT_SINGLE = 200000;
const OBBBA_CTC_PHASEOUT_MFJ = 400000;
const OBBBA_CTC_PHASEOUT_RATE = 50 / 1000; // $50 reduction per $1,000 over

const OBBBA_SALT_CAP = 40400;
const OBBBA_SALT_FLOOR = 10000;
const OBBBA_SALT_PHASEOUT_SINGLE = 500000;
const OBBBA_SALT_PHASEOUT_MFJ = 1000000;

const OBBBA_SENIOR_DEDUCTION = 2000; // additional $2,000 for 65+

const OBBBA_TIP_DEDUCTION_RATE = 1.0; // 100% of qualifying tip income
const OBBBA_OVERTIME_DEDUCTION_RATE = 1.0; // 100% of qualifying overtime

// Pre-TCJA equivalents
const PRIOR_CHILD_TAX_CREDIT = 1000;
const PRIOR_CTC_PHASEOUT_SINGLE = 75000;
const PRIOR_CTC_PHASEOUT_MFJ = 110000;
const PRIOR_PERSONAL_EXEMPTION = 5300; // per person, approximated
const PRIOR_SALT_CAP = Infinity; // no cap under pre-TCJA law

// ─── FICA (unchanged by OBBBA) ────────────────────────────────────────────
const FICA_SS_RATE = 0.062;
const FICA_MEDICARE_RATE = 0.0145;
const SS_WAGE_BASE_2026 = 184500;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
const ADDITIONAL_MEDICARE_THRESHOLD_MFJ = 250000;

// ─── Types ────────────────────────────────────────────────────────────────
export type FilingStatus = 'single' | 'mfj' | 'hoh';

export interface OBBBAScenario {
  /** Gross wages / salary (W-2 box 1 equivalent before pre-tax deductions). */
  grossIncome: number;
  /** Filing status. */
  filingStatus: FilingStatus;
  /** Number of qualifying children under 17. */
  qualifyingChildren: number;
  /** State + local taxes paid (income, property, sales) — for SALT deduction. */
  saltPaid: number;
  /** Itemized deductions EXCLUDING SALT (mortgage interest, charity, medical). */
  otherItemized: number;
  /** Qualifying tip income (traditionally tipped occupations). */
  tipIncome: number;
  /** Qualifying overtime pay (time-and-a-half over 40 hrs/week). */
  overtimePay: number;
  /** Is the taxpayer (or spouse) 65 or older? */
  isSenior: number; // 0, 1, or 2 (for MFJ both seniors)
  /** Federal income tax already withheld (for refund calculation). */
  federalWithholding: number;
}

export interface ScenarioResult {
  /** AGI after above-the-line deductions (tips, overtime). */
  agi: number;
  /** Taxable income after standard/itemized deduction. */
  taxableIncome: number;
  /** Federal income tax before credits. */
  preCreditTax: number;
  /** Child Tax Credit applied (nonrefundable + refundable). */
  childTaxCredit: number;
  /** Final federal income tax liability. */
  federalTax: number;
  /** FICA — employee share. */
  fica: number;
  /** Total federal tax (income + FICA). */
  totalFederalTax: number;
  /** Effective federal rate (income tax / gross). */
  effectiveRate: number;
  /** Marginal bracket rate. */
  marginalRate: number;
  /** Refund or balance due (withholding − liability). Positive = refund. */
  refundOrDue: number;
  /** Which standard deduction was used. */
  standardDeductionUsed: number;
  /** SALT deduction actually allowed (after cap/phaseout). */
  saltDeductionAllowed: number;
  /** Itemized vs standard flag. */
  usedItemized: boolean;
  /** Tip deduction applied. */
  tipDeduction: number;
  /** Overtime deduction applied. */
  overtimeDeduction: number;
  /** Senior deduction applied (OBBBA only). */
  seniorDeduction: number;
}

export interface ComparisonResult {
  obbba: ScenarioResult;
  prior: ScenarioResult;
  /** OBBBA federal tax minus prior federal tax (negative = OBBBA saves you money). */
  federalTaxDelta: number;
  /** Same for refund (positive = OBBBA gives larger refund). */
  refundDelta: number;
  /** Effective rate change in percentage points. */
  effectiveRateDelta: number;
  /** Human-readable summary. */
  summary: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/**
 * Format a number as USD with no decimals (suitable for tax display).
 */
export function formatUSD(value: number): string {
  const safe = Number.isFinite(value) ? value : 0;
  const sign = safe < 0 ? '-' : '';
  return `${sign}$${Math.round(Math.abs(safe)).toLocaleString('en-US')}`;
}

/**
 * Format a percentage value (pass 0.1234 to get "12.34%").
 */
export function formatPct(value: number, digits = 2): string {
  return `${(value * 100).toFixed(digits)}%`;
}

function applyBrackets(
  taxableIncome: number,
  brackets: ReadonlyArray<{ rate: number; upTo: number }>,
): { tax: number; marginalRate: number } {
  let tax = 0;
  let lastRate = 0;
  let prevCap = 0;
  for (const bracket of brackets) {
    if (taxableIncome <= prevCap) break;
    const cap = bracket.upTo;
    const slice = Math.min(taxableIncome, cap) - prevCap;
    if (slice > 0) {
      tax += slice * bracket.rate;
      lastRate = bracket.rate;
    }
    prevCap = cap;
  }
  return { tax, marginalRate: lastRate };
}

function computeFICA(grossIncome: number, filingStatus: FilingStatus): number {
  const ssTax = Math.min(grossIncome, SS_WAGE_BASE_2026) * FICA_SS_RATE;
  const medicareTax = grossIncome * FICA_MEDICARE_RATE;
  const threshold =
    filingStatus === 'mfj'
      ? ADDITIONAL_MEDICARE_THRESHOLD_MFJ
      : ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;
  const additionalMedicare =
    grossIncome > threshold ? (grossIncome - threshold) * ADDITIONAL_MEDICARE_RATE : 0;
  return ssTax + medicareTax + additionalMedicare;
}

function computeCTC(
  agi: number,
  children: number,
  filingStatus: FilingStatus,
  isOBBBA: boolean,
): number {
  const maxPerChild = isOBBBA ? OBBBA_CHILD_TAX_CREDIT : PRIOR_CHILD_TAX_CREDIT;
  const phaseout = isOBBBA
    ? filingStatus === 'mfj'
      ? OBBBA_CTC_PHASEOUT_MFJ
      : OBBBA_CTC_PHASEOUT_SINGLE
    : filingStatus === 'mfj'
      ? PRIOR_CTC_PHASEOUT_MFJ
      : PRIOR_CTC_PHASEOUT_SINGLE;
  const rate = isOBBBA ? OBBBA_CTC_PHASEOUT_RATE : 50 / 1000;
  let credit = children * maxPerChild;
  if (agi > phaseout) {
    const over = agi - phaseout;
    const reduction = Math.ceil(over / 1000) * 1000 * rate;
    credit = Math.max(0, credit - reduction);
  }
  return credit;
}

function computeSALT(
  saltPaid: number,
  agi: number,
  filingStatus: FilingStatus,
  isOBBBA: boolean,
): number {
  if (!isOBBBA) {
    // Pre-TCJA: no SALT cap (unlimited itemized deduction)
    return saltPaid;
  }
  // OBBBA: $40,400 cap with phaseout for high earners
  const phaseoutStart =
    filingStatus === 'mfj' ? OBBBA_SALT_PHASEOUT_MFJ : OBBBA_SALT_PHASEOUT_SINGLE;
  let cap = OBBBA_SALT_CAP;
  if (agi > phaseoutStart) {
    // Phaseout: linear reduction from $40,400 to $10,000 over $200K of MAGI
    const phaseoutRange = 200000;
    const over = Math.min(agi - phaseoutStart, phaseoutRange);
    const reductionRatio = over / phaseoutRange;
    cap = OBBBA_SALT_CAP - (OBBBA_SALT_CAP - OBBBA_SALT_FLOOR) * reductionRatio;
  }
  return Math.min(saltPaid, cap);
}

// ─── Public API: scenario computation ─────────────────────────────────────

export function computeOBBBAScenario(input: OBBBAScenario): ScenarioResult {
  return computeScenario(input, true);
}

export function computePriorScenario(input: OBBBAScenario): ScenarioResult {
  return computeScenario(input, false);
}

function computeScenario(input: OBBBAScenario, isOBBBA: boolean): ScenarioResult {
  const {
    grossIncome,
    filingStatus,
    qualifyingChildren,
    saltPaid,
    otherItemized,
    tipIncome,
    overtimePay,
    isSenior,
    federalWithholding,
  } = input;

  // Step 1: Above-the-line OBBBA deductions (tip + overtime)
  const tipDeduction = isOBBBA ? Math.min(tipIncome, grossIncome) * OBBBA_TIP_DEDUCTION_RATE : 0;
  const overtimeDeduction = isOBBBA
    ? Math.min(overtimePay, grossIncome) * OBBBA_OVERTIME_DEDUCTION_RATE
    : 0;

  // Step 2: AGI
  const agi = Math.max(0, grossIncome - tipDeduction - overtimeDeduction);

  // Step 3: Standard deduction (+ senior additional)
  let standardDeductionUsed = isOBBBA
    ? OBBBA_STANDARD_DEDUCTION[filingStatus]
    : PRIOR_STANDARD_DEDUCTION[filingStatus];
  if (isOBBBA) {
    standardDeductionUsed += (isSenior > 0 ? ADDITIONAL_SENIOR_DEDUCTION[filingStatus] : 0) * (isSenior === 2 ? 2 : 1);
    if (isSenior > 0) {
      standardDeductionUsed += OBBBA_SENIOR_DEDUCTION * (isSenior === 2 ? 2 : 1);
    }
  }

  // Step 4: Itemized (SALT + other) vs standard — pick the larger
  const saltDeductionAllowed = computeSALT(saltPaid, agi, filingStatus, isOBBBA);
  let itemizedTotal = saltDeductionAllowed + otherItemized;

  // Pre-TCJA: add personal exemptions (taxpayer + spouse + children)
  if (!isOBBBA) {
    const exemptionCount = filingStatus === 'mfj' ? 2 : 1;
    itemizedTotal += (exemptionCount + qualifyingChildren) * PRIOR_PERSONAL_EXEMPTION;
  }

  const usedItemized = itemizedTotal > standardDeductionUsed;
  const deductionUsed = usedItemized ? itemizedTotal : standardDeductionUsed;

  // Step 5: Taxable income
  const taxableIncome = Math.max(0, agi - deductionUsed);

  // Step 6: Bracket tax
  const brackets = isOBBBA ? OBBBA_BRACKETS[filingStatus] : PRIOR_BRACKETS[filingStatus];
  const { tax: preCreditTax, marginalRate } = applyBrackets(taxableIncome, brackets);

  // Step 7: Child Tax Credit (limited to tax liability for nonrefundable portion,
  // but for simplicity we apply the full credit since most taxpayers have enough liability)
  const rawCTC = computeCTC(agi, qualifyingChildren, filingStatus, isOBBBA);
  const childTaxCredit = isOBBBA
    ? Math.min(rawCTC, Math.max(preCreditTax, 0) + OBBBA_CTC_REFUNDABLE * qualifyingChildren)
    : Math.min(rawCTC, preCreditTax);

  // Step 8: Final federal income tax
  const federalTax = Math.max(0, preCreditTax - childTaxCredit);

  // Step 9: FICA (unchanged)
  const fica = computeFICA(grossIncome, filingStatus);

  // Step 10: Totals
  const totalFederalTax = federalTax + fica;
  const effectiveRate = grossIncome > 0 ? federalTax / grossIncome : 0;
  const refundOrDue = federalWithholding - federalTax;

  // Senior deduction tracker (OBBBA only, included in standardDeductionUsed above)
  const seniorDeduction = isOBBBA && isSenior > 0
    ? OBBBA_SENIOR_DEDUCTION * (isSenior === 2 ? 2 : 1)
    : 0;

  return {
    agi,
    taxableIncome,
    preCreditTax,
    childTaxCredit,
    federalTax,
    fica,
    totalFederalTax,
    effectiveRate,
    marginalRate,
    refundOrDue,
    standardDeductionUsed,
    saltDeductionAllowed,
    usedItemized,
    tipDeduction,
    overtimeDeduction,
    seniorDeduction,
  };
}

/**
 * Run the OBBBA-vs-prior-law comparison for a single scenario.
 */
export function compareOBBBA(input: OBBBAScenario): ComparisonResult {
  const obbba = computeOBBBAScenario(input);
  const prior = computePriorScenario(input);

  const federalTaxDelta = obbba.federalTax - prior.federalTax; // negative = OBBBA saves
  const refundDelta = obbba.refundOrDue - prior.refundOrDue; // positive = OBBBA gives larger refund
  const effectiveRateDelta = (obbba.effectiveRate - prior.effectiveRate) * 100;

  let summary: string;
  if (federalTaxDelta < -1) {
    summary = `Under OBBBA you owe ${formatUSD(Math.abs(federalTaxDelta))} less federal income tax and your refund grows by ${formatUSD(Math.max(0, refundDelta))}.`;
  } else if (federalTaxDelta > 1) {
    summary = `Under OBBBA you owe ${formatUSD(federalTaxDelta)} more federal income tax than you would have under prior law.`;
  } else {
    summary = `OBBBA produces essentially no change in your federal income tax liability for this scenario.`;
  }

  return {
    obbba,
    prior,
    federalTaxDelta,
    refundDelta,
    effectiveRateDelta,
    summary,
  };
}
