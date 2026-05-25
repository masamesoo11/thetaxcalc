/**
 * Financial Calculation Utilities
 * All arithmetic uses safe floating-point practices:
 * - Calculations use raw decimal values throughout the pipeline
 * - Rounding (to 2 decimal places) is applied ONLY at the final display node
 * - This prevents decimal drift from cumulative rounding errors
 */

import {
  FICA_2026,
  FEDERAL_TAX_2026,
  STATE_PROFILES,
  TEXAS_COST_OF_LIVING,
  FLORIDA_COST_OF_LIVING,
  type PayFrequency,
  type StateProfile,
} from './tax-config';

// ─── Safe Rounding ───────────────────────────────────────────────────────────

export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatCurrency(value: number): string {
  return roundCurrency(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercent(value: number): string {
  return (value * 100).toFixed(2) + '%';
}

export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── Federal Tax Calculation ─────────────────────────────────────────────────

export function calculateFederalTax(annualGross: number): number {
  const taxableIncome = Math.max(0, annualGross - FEDERAL_TAX_2026.standardDeduction);
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let remaining = taxableIncome;

  for (const bracket of FEDERAL_TAX_2026.brackets) {
    if (remaining <= 0) break;

    const bracketWidth = bracket.max === null ? remaining : bracket.max - bracket.min;
    const taxableInBracket = Math.min(remaining, bracketWidth);
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
  }

  return tax;
}

export function calculateFederalTaxEstimate(annualGross: number): number {
  // Simple effective rate estimate for quick display
  const taxableIncome = Math.max(0, annualGross - FEDERAL_TAX_2026.standardDeduction);
  return taxableIncome * FEDERAL_TAX_2026.estimateBaseline;
}

// ─── FICA Tax Calculation ────────────────────────────────────────────────────

export function calculateFICA(annualGross: number): {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  total: number;
} {
  // Social Security: 6.2% up to wage cap
  const ssWages = Math.min(annualGross, FICA_2026.socialSecurityWageCap);
  const socialSecurity = ssWages * FICA_2026.socialSecurityRate;

  // Medicare: 1.45% on all wages + 0.9% additional above threshold
  const medicare = annualGross * FICA_2026.medicareRate;
  const additionalMedicare =
    annualGross > FICA_2026.additionalMedicareThreshold
      ? (annualGross - FICA_2026.additionalMedicareThreshold) * FICA_2026.additionalMedicareRate
      : 0;

  return {
    socialSecurity,
    medicare,
    additionalMedicare,
    total: socialSecurity + medicare + additionalMedicare,
  };
}

// ─── State Tax Calculation ───────────────────────────────────────────────────

export function calculateStateTax(annualGross: number, stateKey: string): number {
  const state = STATE_PROFILES[stateKey];
  if (!state || !state.hasIncomeTax) return 0;

  if (state.incomeTaxType === 'flat') {
    // Illinois: subtract personal exemption before applying flat rate
    const taxableIncome = Math.max(0, annualGross - state.personalExemption);
    return taxableIncome * state.incomeTaxRate;
  }

  if (state.incomeTaxType === 'none') {
    return 0;
  }

  return 0;
}

// ─── Complete Paycheck Calculation ───────────────────────────────────────────

export interface PaycheckInput {
  annualSalary: number;
  payFrequency: PayFrequency;
  hoursPerWeek: number;
  retirement401k: number; // annual contribution
  hsaContribution: number; // annual contribution
  stateKey: string;
  filingStatus: 'single' | 'married' | 'head_of_household';
}

export interface PaycheckResult {
  grossAnnual: number;
  grossPerPeriod: number;
  federalTax: number;
  federalTaxPerPeriod: number;
  ficaTotal: number;
  ficaPerPeriod: number;
  ficaSocialSecurity: number;
  ficaMedicare: number;
  ficaAdditionalMedicare: number;
  stateTax: number;
  stateTaxPerPeriod: number;
  retirement401k: number;
  retirement401kPerPeriod: number;
  hsaContribution: number;
  hsaPerPeriod: number;
  totalDeductions: number;
  totalDeductionsPerPeriod: number;
  netAnnual: number;
  netPerPeriod: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  periodsPerYear: number;
  stateProfile: StateProfile | null;
}

export function getPeriodsPerYear(frequency: PayFrequency): number {
  switch (frequency) {
    case 'annual': return 1;
    case 'monthly': return 12;
    case 'biweekly': return 26;
    case 'weekly': return 52;
    case 'hourly': return 2080;
  }
}

export function calculatePaycheck(input: PaycheckInput): PaycheckResult {
  const periodsPerYear = getPeriodsPerYear(input.payFrequency);
  let grossAnnual = input.annualSalary;

  // If hourly, calculate annual from hourly rate
  if (input.payFrequency === 'hourly') {
    grossAnnual = input.annualSalary * input.hoursPerWeek * 52;
  }

  // Pre-tax deductions reduce taxable income for federal & state
  const pretaxDeductions = input.retirement401k + input.hsaContribution;
  const adjustedGrossForFederal = Math.max(0, grossAnnual - pretaxDeductions);

  // Federal tax on adjusted gross
  const federalTax = calculateFederalTax(adjustedGrossForFederal);

  // FICA on full gross (401k doesn't reduce FICA for employees, HSA does not either)
  const fica = calculateFICA(grossAnnual);

  // State tax (IL uses personal exemption)
  const stateKey = input.stateKey || 'illinois';
  const stateProfile = STATE_PROFILES[stateKey] || null;

  let stateTax = 0;
  if (stateProfile?.hasIncomeTax) {
    // For Illinois: subtract pre-tax deductions AND personal exemption
    const stateTaxableIncome = Math.max(
      0,
      grossAnnual - pretaxDeductions - (stateProfile.personalExemption || 0)
    );
    stateTax = stateTaxableIncome * stateProfile.incomeTaxRate;
  }

  const totalDeductions = federalTax + fica.total + stateTax + pretaxDeductions;
  const netAnnual = grossAnnual - totalDeductions;

  const perPeriodDivisor = input.payFrequency === 'hourly' ? 1 : periodsPerYear;

  return {
    grossAnnual,
    grossPerPeriod: input.payFrequency === 'hourly'
      ? grossAnnual / 2080
      : grossAnnual / periodsPerYear,
    federalTax,
    federalTaxPerPeriod: federalTax / periodsPerYear,
    ficaTotal: fica.total,
    ficaPerPeriod: fica.total / periodsPerYear,
    ficaSocialSecurity: fica.socialSecurity,
    ficaMedicare: fica.medicare,
    ficaAdditionalMedicare: fica.additionalMedicare,
    stateTax,
    stateTaxPerPeriod: stateTax / periodsPerYear,
    retirement401k: input.retirement401k,
    retirement401kPerPeriod: input.retirement401k / periodsPerYear,
    hsaContribution: input.hsaContribution,
    hsaPerPeriod: input.hsaContribution / periodsPerYear,
    totalDeductions,
    totalDeductionsPerPeriod: totalDeductions / periodsPerYear,
    netAnnual,
    netPerPeriod: input.payFrequency === 'hourly'
      ? netAnnual / 2080
      : netAnnual / periodsPerYear,
    effectiveTaxRate: grossAnnual > 0 ? (federalTax + fica.total + stateTax) / grossAnnual : 0,
    marginalTaxRate: getMarginalRate(adjustedGrossForFederal),
    periodsPerYear,
    stateProfile,
  };
}

function getMarginalRate(taxableIncome: number): number {
  for (let i = FEDERAL_TAX_2026.brackets.length - 1; i >= 0; i--) {
    const bracket = FEDERAL_TAX_2026.brackets[i];
    if (taxableIncome >= bracket.min) {
      return bracket.rate;
    }
  }
  return 0;
}

// ─── Mortgage Calculation ────────────────────────────────────────────────────

export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  interestRate: number; // annual percentage, e.g. 6.5
  loanTerm: number; // years: 15 or 30
  extraMonthlyPayment: number;
}

export interface MortgageResult {
  loanAmount: number;
  monthlyRate: number;
  totalPayments: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  totalCost: number;

  // With extra payments
  monthlyPaymentWithExtra: number;
  payoffMonths: number;
  payoffYears: number;
  totalInterestWithExtra: number;
  totalCostWithExtra: number;
  yearsSaved: number;
  interestSaved: number;

  // Amortization schedule (base)
  amortizationSchedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const loanAmount = input.homePrice - input.downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const totalPayments = input.loanTerm * 12;

  // Standard fixed-rate amortization: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalPayments;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalPayments);
    monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  const totalCost = monthlyPayment * totalPayments;
  const totalInterestPaid = totalCost - loanAmount;

  // ─── With Extra Payments ─────────────────────────────────────────────────
  const extraPayment = input.extraMonthlyPayment;
  const monthlyPaymentWithExtra = monthlyPayment + extraPayment;

  // Build amortization schedule (base) and calculate extra payment payoff
  const amortizationSchedule: AmortizationEntry[] = [];
  let balance = loanAmount;
  let cumulativeInterest = 0;
  let balanceWithExtra = loanAmount;
  let cumulativeInterestWithExtra = 0;
  let payoffMonth = 0;

  for (let month = 1; month <= totalPayments; month++) {
    // Base schedule
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
    cumulativeInterest += interestPayment;
    balance = Math.max(0, balance - principalPayment);

    amortizationSchedule.push({
      month,
      payment: principalPayment + interestPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance,
      cumulativeInterest,
    });

    // Extra payment schedule
    if (balanceWithExtra > 0) {
      const interestExtra = balanceWithExtra * monthlyRate;
      const principalExtra = Math.min(
        monthlyPaymentWithExtra - interestExtra,
        balanceWithExtra
      );
      cumulativeInterestWithExtra += interestExtra;
      balanceWithExtra = Math.max(0, balanceWithExtra - principalExtra);
      payoffMonth = month;

      if (balanceWithExtra <= 0) break;
    }
  }

  const totalInterestWithExtra = cumulativeInterestWithExtra;
  const totalCostWithExtra = loanAmount + totalInterestWithExtra;
  const yearsSaved = input.loanTerm - payoffMonth / 12;
  const interestSaved = totalInterestPaid - totalInterestWithExtra;

  return {
    loanAmount,
    monthlyRate,
    totalPayments,
    monthlyPayment: roundCurrency(monthlyPayment),
    totalInterestPaid: roundCurrency(totalInterestPaid),
    totalCost: roundCurrency(totalCost),

    monthlyPaymentWithExtra: roundCurrency(monthlyPaymentWithExtra),
    payoffMonths: payoffMonth,
    payoffYears: roundCurrency(payoffMonth / 12),
    totalInterestWithExtra: roundCurrency(totalInterestWithExtra),
    totalCostWithExtra: roundCurrency(totalCostWithExtra),
    yearsSaved: roundCurrency(yearsSaved),
    interestSaved: roundCurrency(interestSaved),

    amortizationSchedule,
  };
}

// ─── Cost of Living Calculations ─────────────────────────────────────────────

export interface CostOfLivingResult {
  annualPropertyTax: number;
  monthlyPropertyTax: number;
  estimatedSalesTaxBurden: number; // based on avg spending
  totalAnnualBurden: number;
  totalMonthlyBurden: number;
  propertyTaxRate: number;
  avgHomeValue: number;
}

export function calculateTexasCostOfLiving(
  homeValue: number = TEXAS_COST_OF_LIVING.averageHomeValue,
  estimatedAnnualSpending: number = 45000
): CostOfLivingResult {
  const annualPropertyTax = homeValue * TEXAS_COST_OF_LIVING.averagePropertyTaxRate;
  const estimatedSalesTaxBurden = estimatedAnnualSpending * TEXAS_COST_OF_LIVING.averageSalesTaxRate;

  return {
    annualPropertyTax: roundCurrency(annualPropertyTax),
    monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
    estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
    totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
    totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
    propertyTaxRate: TEXAS_COST_OF_LIVING.averagePropertyTaxRate,
    avgHomeValue: TEXAS_COST_OF_LIVING.averageHomeValue,
  };
}

export function calculateFloridaCostOfLiving(
  homeValue: number = FLORIDA_COST_OF_LIVING.averageHomeValue,
  estimatedAnnualSpending: number = 48000
): CostOfLivingResult {
  const annualPropertyTax = homeValue * FLORIDA_COST_OF_LIVING.averagePropertyTaxRate;
  const estimatedSalesTaxBurden = estimatedAnnualSpending * FLORIDA_COST_OF_LIVING.averageSalesTaxRate;

  return {
    annualPropertyTax: roundCurrency(annualPropertyTax),
    monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
    estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
    totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
    totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
    propertyTaxRate: FLORIDA_COST_OF_LIVING.averagePropertyTaxRate,
    avgHomeValue: FLORIDA_COST_OF_LIVING.averageHomeValue,
  };
}

// ─── URL Hash State Management ───────────────────────────────────────────────

export function serializeToHash(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
}

export function parseHashParams(): Record<string, string> {
  const hash = window.location.hash;
  const params: Record<string, string> = {};
  if (!hash || hash === '#') return params;

  const queryString = hash.startsWith('#') ? hash.substring(1) : hash;
  const [_, query] = queryString.split('?');
  if (!query) return params;

  const searchParams = new URLSearchParams(query);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

export function getPageFromHash(): string {
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') return 'home';
  const page = hash.replace('#', '').split('?')[0];
  return page || 'home';
}

export function updateHash(page: string, params: Record<string, string | number | boolean>) {
  const query = serializeToHash(params);
  const newHash = query ? `#${page}?${query}` : `#${page}`;
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, '', newHash);
  }
}
