/**
 * Public Accuracy Verification Suite — TheTaxCalc Engine
 *
 * THE MOAT: most tax sites ask you to trust their (often rented) experts.
 * We publish our verification math instead. Every case below was
 * hand-derived on paper from the cited IRS / SSA / state publications,
 * independent of our engine. The /accuracy-report page runs the live
 * engine against these values and publishes the results to anyone.
 *
 * Derivation rules used (tax year 2026):
 *   Federal: IRS Rev. Proc. 2025-32 brackets + OBBBA standard deductions
 *            ($16,100 single / $32,200 MFJ / $24,150 HoH).
 *            Tax = Σ (portion of taxable income in bracket × rate), where
 *            taxable income = max(0, gross − standard deduction).
 *   FICA:    OASDI 6.2% up to the 2026 SSA wage base ($184,500);
 *            Medicare 1.45% on all wages; +0.9% above $200K (single)
 *            or $250K (MFJ). Employer side excluded (take-home math).
 *   States:  CA/NY progressive brackets with each state's standard
 *            deduction; IL flat 4.95% after the $2,925 personal
 *            exemption; TX/FL constitutionally zero income tax.
 *
 * If a check ever fails, the site is wrong until it passes — the badge
 * rendered sitewide via AuthorBioCard links to the published report.
 */

import {
  calculateFederalTax,
  calculateFICA,
  calculateStateTax,
  calculatePaycheck,
} from '../finance-utils';

// ─── Types ──────────────────────────────────────────────────────────────────

export type VerificationCategory = 'federal' | 'fica' | 'state' | 'integration';

export interface VerificationCase {
  id: string;
  category: VerificationCategory;
  title: string;
  inputSummary: string;
  /** Primary source a reader can open to re-derive the expected value. */
  source: string;
  /** Step-by-step paper math, so anyone can audit the auditor. */
  derivation: string;
  /** Runs the production engine. Pure — no side effects. */
  run: () => number;
  /** Hand-computed expected value (in dollars unless noted). */
  expected: number;
  /** Absolute tolerance in the case's unit ($ or rate). */
  tolerance: number;
  unit: 'usd' | 'rate';
}

export interface VerificationResult {
  case: VerificationCase;
  actual: number;
  passed: boolean;
  delta: number;
}

export interface SuiteSummary {
  total: number;
  passed: number;
  failed: number;
  lastVerified: string;
  taxYear: number;
}

// The suite is deterministic; this stamps the most recent full manual
// re-derivation of every expected value (kept in sync with methodology).
export const LAST_VERIFIED = '2026-10-31';
export const TAX_YEAR = 2026;

// ─── Golden Cases — Federal (Rev. Proc. 2025-32) ────────────────────────────

const federalCases: VerificationCase[] = [
  {
    id: 'FED-001',
    category: 'federal',
    title: 'Gross below the standard deduction → zero tax',
    inputSummary: '$15,000 gross · Single · standard deduction',
    source: 'IRS Rev. Proc. 2025-32 (standard deduction $16,100, Single)',
    derivation:
      'Taxable income = $15,000 − $16,100 = $0 (floored at zero). No bracket is entered. Tax = $0.00.',
    run: () => calculateFederalTax(15000, 'single'),
    expected: 0,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FED-002',
    category: 'federal',
    title: 'Second bracket (12%) — $30,000 Single',
    inputSummary: '$30,000 gross · Single · standard deduction',
    source: 'IRS Rev. Proc. 2025-32 (10% to $12,400; 12% to $50,400)',
    derivation:
      'Taxable = $30,000 − $16,100 = $13,900. ' +
      '10% × $12,400 = $1,240.00; 12% × ($13,900 − $12,400 = $1,500) = $180.00. ' +
      'Total = $1,420.00.',
    run: () => calculateFederalTax(30000, 'single'),
    expected: 1420,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FED-003',
    category: 'federal',
    title: 'Mid 12% bracket — $50,000 Single',
    inputSummary: '$50,000 gross · Single · standard deduction',
    source: 'IRS Rev. Proc. 2025-32',
    derivation:
      'Taxable = $33,900. 10% × $12,400 = $1,240.00; 12% × $21,500 = $2,580.00. Total = $3,820.00.',
    run: () => calculateFederalTax(50000, 'single'),
    expected: 3820,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FED-004',
    category: 'federal',
    title: 'Third bracket (22%) — $75,000 Single',
    inputSummary: '$75,000 gross · Single · standard deduction',
    source: 'IRS Rev. Proc. 2025-32 (22% starts at $50,400)',
    derivation:
      'Taxable = $58,900. $1,240.00 + $4,560.00 (12% × $38,000) + 22% × ($58,900 − $50,400 = $8,500) = $1,870.00. ' +
      'Total = $7,670.00.',
    run: () => calculateFederalTax(75000, 'single'),
    expected: 7670,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FED-005',
    category: 'federal',
    title: 'Deep 22% bracket — $100,000 Single',
    inputSummary: '$100,000 gross · Single · standard deduction',
    source: 'IRS Rev. Proc. 2025-32',
    derivation:
      'Taxable = $83,900. $1,240.00 + $4,560.00 + 22% × $33,500 = $7,370.00. Total = $13,170.00.',
    run: () => calculateFederalTax(100000, 'single'),
    expected: 13170,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FED-006',
    category: 'federal',
    title: 'Fourth bracket (24%) — $200,000 Single',
    inputSummary: '$200,000 gross · Single · standard deduction',
    source: 'IRS Rev. Proc. 2025-32 (24% band $105,700–$201,775)',
    derivation:
      'Taxable = $183,900. $1,240.00 + $4,560.00 + 22% × $55,300 = $12,166.00 + 24% × $78,200 = $18,768.00. ' +
      'Total = $36,734.00.',
    run: () => calculateFederalTax(200000, 'single'),
    expected: 36734,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FED-007',
    category: 'federal',
    title: 'Top bracket (37%) — $1,000,000 Single',
    inputSummary: '$1,000,000 gross · Single · standard deduction',
    source: 'IRS Rev. Proc. 2025-32 (37% above $640,600)',
    derivation:
      'Taxable = $983,900. Bands: $1,240.00 + $4,560.00 + $12,166.00 + $23,058.00 (24% × $96,075) + ' +
      '$17,424.00 (32% × $54,450) + $134,531.25 (35% × $384,375) + $127,021.00 (37% × $343,300). ' +
      'Total = $320,000.25.',
    run: () => calculateFederalTax(1000000, 'single'),
    expected: 320000.25,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FED-008',
    category: 'federal',
    title: 'Married filing jointly — $150,000 MFJ',
    inputSummary: '$150,000 gross · MFJ · standard deduction',
    source: 'IRS Rev. Proc. 2025-32 (MFJ: $32,200 deduction; 22% starts at $100,800)',
    derivation:
      'Taxable = $150,000 − $32,200 = $117,800. 10% × $24,800 = $2,480.00; 12% × $76,000 = $9,120.00; ' +
      '22% × $17,000 = $3,740.00. Total = $15,340.00.',
    run: () => calculateFederalTax(150000, 'married'),
    expected: 15340,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FED-009',
    category: 'federal',
    title: 'Head of household — $80,000 HoH',
    inputSummary: '$80,000 gross · Head of Household · standard deduction',
    source: 'IRS Rev. Proc. 2025-32 (HoH: $24,150 deduction; 12% to $67,450)',
    derivation:
      'Taxable = $80,000 − $24,150 = $55,850. 10% × $17,700 = $1,770.00; 12% × $38,150 = $4,578.00. ' +
      'Below the $67,450 22% threshold. Total = $6,348.00.',
    run: () => calculateFederalTax(80000, 'head_of_household'),
    expected: 6348,
    tolerance: 0.01,
    unit: 'usd',
  },
];

// ─── Golden Cases — FICA (SSA 2026 wage base) ────────────────────────────────

const ficaCases: VerificationCase[] = [
  {
    id: 'FICA-001',
    category: 'fica',
    title: 'Typical wage — $75,000 Single',
    inputSummary: '$75,000 wages · employee share only',
    source: 'SSA 2026 fact sheet: OASDI 6.2% (base $184,500); Medicare 1.45%',
    derivation:
      'Social Security = 6.2% × $75,000 = $4,650.00. Medicare = 1.45% × $75,000 = $1,087.50. ' +
      'No additional Medicare (below $200K). Total = $5,737.50.',
    run: () => calculateFICA(75000, 'single').total,
    expected: 5737.5,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FICA-002',
    category: 'fica',
    title: 'Exactly at the wage base — $184,500',
    inputSummary: '$184,500 wages · employee share only',
    source: 'SSA 2026 fact sheet (wage base $184,500)',
    derivation:
      'SS = 6.2% × $184,500 = $11,439.00 (cap reached — nothing above is taxed for SS). ' +
      'Medicare = 1.45% × $184,500 = $2,675.25. Total = $14,114.25.',
    run: () => calculateFICA(184500, 'single').total,
    expected: 14114.25,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FICA-003',
    category: 'fica',
    title: 'Exactly at the surtax threshold — $200,000 Single',
    inputSummary: '$200,000 wages · employee share only',
    source: 'IRC §3101(b)(2) (0.9% above $200K, not indexed)',
    derivation:
      'SS = $11,439.00 (capped). Medicare = 1.45% × $200,000 = $2,900.00. Additional 0.9% applies only ' +
      'ABOVE $200,000 → $0 at exactly $200,000. Total = $14,339.00.',
    run: () => calculateFICA(200000, 'single').total,
    expected: 14339,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FICA-004',
    category: 'fica',
    title: 'Surtax + cap — $300,000 Single',
    inputSummary: '$300,000 wages · employee share only',
    source: 'SSA 2026 fact sheet + IRC §3101(b)(2)',
    derivation:
      'SS = $11,439.00 (cap). Medicare = $4,350.00. Additional = 0.9% × ($300,000 − $200,000) = $900.00. ' +
      'Total = $16,689.00.',
    run: () => calculateFICA(300000, 'single').total,
    expected: 16689,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'FICA-005',
    category: 'fica',
    title: 'MFJ surtax threshold — $500,000 Married',
    inputSummary: '$500,000 wages · MFJ · employee share only',
    source: 'IRC §3101(b)(2) (MFJ threshold $250,000)',
    derivation:
      'SS = $11,439.00 (cap). Medicare = 1.45% × $500,000 = $7,250.00. Additional = 0.9% × ($500,000 − $250,000) = $2,250.00. ' +
      'Total = $20,939.00.',
    run: () => calculateFICA(500000, 'married').total,
    expected: 20939,
    tolerance: 0.01,
    unit: 'usd',
  },
];

// ─── Golden Cases — State engines ────────────────────────────────────────────

const stateCases: VerificationCase[] = [
  {
    id: 'ST-IL-001',
    category: 'state',
    title: 'Illinois flat tax — $75,000 Single',
    inputSummary: '$75,000 gross · IL (flat 4.95%, $2,925 exemption)',
    source: 'IL Income Tax Act (35 ILCS 5/203) — 4.95% + personal exemption',
    derivation:
      'IL has no standard deduction. Taxable = $75,000 − $2,925 = $72,075. Tax = 4.95% × $72,075 = $3,567.71.',
    run: () => calculateStateTax(75000, 'illinois', 'single'),
    expected: 3567.71,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'ST-CA-001',
    category: 'state',
    title: 'California progressive — $100,000 Single',
    inputSummary: '$100,000 gross · CA (std. deduction $6,083)',
    source: 'CA FTB 2026 bracket schedule (1% → 13.3%)',
    derivation:
      'Taxable = $93,917. 1%×$10,412=$104.12; 2%×$14,272=$285.44; 4%×$14,275=$571.00; 6%×$15,422=$925.32; ' +
      '8%×$13,969=$1,117.52; 9.3%×$25,567=$2,377.73. Total = $5,381.13.',
    run: () => calculateStateTax(100000, 'california', 'single'),
    expected: 5381.13,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'ST-CA-002',
    category: 'state',
    title: 'California top-bracket territory — $250,000 Single',
    inputSummary: '$250,000 gross · CA (std. deduction $6,083)',
    source: 'CA FTB 2026 bracket schedule (9.3% to $349,137)',
    derivation:
      'Taxable = $243,917. Brackets through 8% = $3,003.40; 9.3% × ($243,917 − $68,350 = $175,567) = $16,327.73. ' +
      'Total = $19,331.13.',
    run: () => calculateStateTax(250000, 'california', 'single'),
    expected: 19331.13,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'ST-NY-001',
    category: 'state',
    title: 'New York progressive — $75,000 Single',
    inputSummary: '$75,000 gross · NY (std. deduction $8,000)',
    source: 'NYS DTF 2026 rate schedule (3.9% → 10.9%)',
    derivation:
      'Taxable = $67,000. 3.9%×$8,500=$331.50; 4.4%×$3,200=$140.80; 5.15%×$2,200=$113.30; ' +
      '5.4%×$53,100=$2,867.40. Total = $3,453.00.',
    run: () => calculateStateTax(75000, 'newyork', 'single'),
    expected: 3453,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'ST-TX-001',
    category: 'state',
    title: 'Texas — zero income tax at any income',
    inputSummary: '$100,000 gross · TX',
    source: 'TX Constitution Art. 8 §24 (no state income tax)',
    derivation: 'Texas levies no personal income tax. Tax = $0.00 at every income level.',
    run: () => calculateStateTax(100000, 'texas', 'single'),
    expected: 0,
    tolerance: 0.01,
    unit: 'usd',
  },
  {
    id: 'ST-FL-001',
    category: 'state',
    title: 'Florida — zero income tax at any income',
    inputSummary: '$100,000 gross · FL',
    source: 'FL Constitution Art. VII §11 (no state income tax)',
    derivation: 'Florida levies no personal income tax. Tax = $0.00 at every income level.',
    run: () => calculateStateTax(100000, 'florida', 'single'),
    expected: 0,
    tolerance: 0.01,
    unit: 'usd',
  },
];

// ─── Golden Cases — Full paycheck integration ────────────────────────────────

const integrationCases: VerificationCase[] = [
  {
    id: 'INT-001',
    category: 'integration',
    title: 'High-tax state: $75,000 Single in California (monthly)',
    inputSummary: '$75,000 · Single · CA · monthly pay · no pre-tax deductions',
    source: 'Rev. Proc. 2025-32 + SSA 2026 + CA FTB 2026 (composite)',
    derivation:
      'Federal $7,670.00 + FICA $5,737.50 + CA $3,056.13 (taxable $68,917) = $16,463.63 total. ' +
      'Net annual = $58,536.37 → $4,878.03/month.',
    run: () => calculatePaycheck({
      annualSalary: 75000, payFrequency: 'monthly', hoursPerWeek: 40,
      retirement401k: 0, hsaContribution: 0, stateKey: 'california', filingStatus: 'single',
    }).netAnnual,
    expected: 58536.37,
    tolerance: 0.02,
    unit: 'usd',
  },
  {
    id: 'INT-002',
    category: 'integration',
    title: 'Zero-tax state: $60,000 Married in Texas (biweekly)',
    inputSummary: '$60,000 · MFJ · TX · biweekly pay · no pre-tax deductions',
    source: 'Rev. Proc. 2025-32 + SSA 2026 (composite)',
    derivation:
      'Federal (taxable $27,800) = $2,840.00 + FICA $4,590.00 + TX $0 = $7,430.00. ' +
      'Net annual = $52,570.00 → $2,021.92 per biweekly paycheck.',
    run: () => calculatePaycheck({
      annualSalary: 60000, payFrequency: 'biweekly', hoursPerWeek: 40,
      retirement401k: 0, hsaContribution: 0, stateKey: 'texas', filingStatus: 'married',
    }).netPerPeriod,
    expected: 2021.92,
    tolerance: 0.02,
    unit: 'usd',
  },
  {
    id: 'INT-003',
    category: 'integration',
    title: 'Flat-tax state: $95,000 Single in Illinois (monthly)',
    inputSummary: '$95,000 · Single · IL · monthly pay · no pre-tax deductions',
    source: 'Rev. Proc. 2025-32 + SSA 2026 + 35 ILCS 5/203 (composite)',
    derivation:
      'Federal $12,070.00 + FICA $7,267.50 + IL $4,557.71 = $23,895.21. ' +
      'Net annual = $71,104.79 → $5,925.40/month.',
    run: () => calculatePaycheck({
      annualSalary: 95000, payFrequency: 'monthly', hoursPerWeek: 40,
      retirement401k: 0, hsaContribution: 0, stateKey: 'illinois', filingStatus: 'single',
    }).netPerPeriod,
    expected: 5925.4,
    tolerance: 0.02,
    unit: 'usd',
  },
  {
    id: 'INT-004',
    category: 'integration',
    title: 'High-cost state: $120,000 Single in New York (monthly)',
    inputSummary: '$120,000 · Single · NY · monthly pay · no pre-tax deductions',
    source: 'Rev. Proc. 2025-32 + SSA 2026 + NYS DTF 2026 (composite)',
    derivation:
      'Federal $17,570.00 + FICA $9,180.00 + NY $6,039.75 = $32,789.75. ' +
      'Net annual = $87,210.25 → $7,267.52/month.',
    run: () => calculatePaycheck({
      annualSalary: 120000, payFrequency: 'monthly', hoursPerWeek: 40,
      retirement401k: 0, hsaContribution: 0, stateKey: 'newyork', filingStatus: 'single',
    }).netPerPeriod,
    expected: 7267.52,
    tolerance: 0.02,
    unit: 'usd',
  },
  {
    id: 'INT-005',
    category: 'integration',
    title: 'Effective-rate sanity: $75,000 Single in CA',
    inputSummary: '$75,000 · Single · CA — total tax ÷ gross',
    source: 'Derived from INT-001 components',
    derivation: '($7,670.00 + $5,737.50 + $3,056.13) ÷ $75,000 = 21.95% effective rate.',
    run: () => calculatePaycheck({
      annualSalary: 75000, payFrequency: 'monthly', hoursPerWeek: 40,
      retirement401k: 0, hsaContribution: 0, stateKey: 'california', filingStatus: 'single',
    }).effectiveTaxRate,
    expected: 0.2195,
    tolerance: 0.0005,
    unit: 'rate',
  },
];

// ─── Suite assembly & runner ─────────────────────────────────────────────────

export const VERIFICATION_CASES: VerificationCase[] = [
  ...federalCases,
  ...ficaCases,
  ...stateCases,
  ...integrationCases,
];

/** Runs every case against the live engine. Pure & deterministic. */
export function runVerificationSuite(): VerificationResult[] {
  return VERIFICATION_CASES.map((testCase) => {
    const actual = testCase.run();
    const delta = Math.abs(actual - testCase.expected);
    return {
      case: testCase,
      actual,
      delta,
      passed: delta <= testCase.tolerance,
    };
  });
}

/** Stamped summary for badges/JSON-LD — executes the suite. */
export function getSuiteSummary(results: VerificationResult[]): SuiteSummary {
  const passed = results.filter((r) => r.passed).length;
  return {
    total: results.length,
    passed,
    failed: results.length - passed,
    lastVerified: LAST_VERIFIED,
    taxYear: TAX_YEAR,
  };
}
