/**
 * Centralized 2026 Tax Configuration
 * All tax constants, brackets, and state profiles are defined here
 * for easy maintenance and single-source-of-truth updates.
 */

export interface StateProfile {
  name: string;
  abbreviation: string;
  incomeTaxRate: number; // as decimal, e.g. 0.0495 for 4.95%
  incomeTaxType: 'flat' | 'progressive' | 'none';
  personalExemption: number; // annual dollar amount
  standardDeduction: number; // annual dollar amount
  hasIncomeTax: boolean;
  description: string;
  effectiveDate: string;
}

export interface FICAConfig {
  socialSecurityRate: number; // 0.062
  medicareRate: number; // 0.0145
  additionalMedicareRate: number; // 0.009 above threshold
  additionalMedicareThreshold: number; // $200,000
  socialSecurityWageCap: number; // $176,100 for 2026
  totalRate: number; // 0.0765
}

export interface FederalTaxConfig {
  estimateBaseline: number; // 0.12 average effective rate estimate
  standardDeduction: number; // $15,000 single for 2026
  brackets: FederalBracket[];
}

export interface FederalBracket {
  min: number;
  max: number | null; // null = no upper limit
  rate: number;
}

export const FICA_2026: FICAConfig = {
  socialSecurityRate: 0.062,
  medicareRate: 0.0145,
  additionalMedicareRate: 0.009,
  additionalMedicareThreshold: 200000,
  socialSecurityWageCap: 176100,
  totalRate: 0.0765,
};

export const FEDERAL_TAX_2026: FederalTaxConfig = {
  estimateBaseline: 0.12,
  standardDeduction: 15000,
  brackets: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: null, rate: 0.37 },
  ],
};

export const STATE_PROFILES: Record<string, StateProfile> = {
  illinois: {
    name: 'Illinois',
    abbreviation: 'IL',
    incomeTaxRate: 0.0495,
    incomeTaxType: 'flat',
    personalExemption: 2775,
    standardDeduction: 0, // IL uses personal exemption instead
    hasIncomeTax: true,
    description:
      'Illinois imposes a flat state income tax of 4.95% with a personal exemption of $2,775 per person. Unlike most states, Illinois does not offer a standard deduction; instead, the personal exemption reduces taxable income before the flat rate is applied.',
    effectiveDate: '2026-01-01',
  },
  texas: {
    name: 'Texas',
    abbreviation: 'TX',
    incomeTaxRate: 0,
    incomeTaxType: 'none',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: false,
    description:
      'Texas has no state income tax. However, Texas compensates with higher property taxes (averaging 1.6-1.8% of appraised home value) and a 6.25% state sales tax. The overall cost-of-living burden is important to consider when evaluating take-home pay.',
    effectiveDate: '2026-01-01',
  },
  florida: {
    name: 'Florida',
    abbreviation: 'FL',
    incomeTaxRate: 0,
    incomeTaxType: 'none',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: false,
    description:
      'Florida has no state income tax. The state relies on sales tax (6% state + local surtax up to 1.5%) and property taxes to fund government services. Florida homeowners pay an average effective property tax rate of about 0.86% of home value.',
    effectiveDate: '2026-01-01',
  },
};

export const MORTGAGE_DEFAULTS = {
  homePrice: 350000,
  downPayment: 70000,
  interestRate: 6.5,
  loanTerm: 30,
  extraMonthlyPayment: 0,
};

export const TEXAS_COST_OF_LIVING = {
  averagePropertyTaxRate: 0.0171, // 1.71% average effective rate
  averageSalesTaxRate: 0.082, // 6.25% state + avg local
  averageHomeValue: 290000,
  averageAnnualPropertyTax: 4959,
};

export const FLORIDA_COST_OF_LIVING = {
  averagePropertyTaxRate: 0.0086,
  averageSalesTaxRate: 0.07, // 6% state + avg local
  averageHomeValue: 395000,
  averageAnnualPropertyTax: 3397,
};

export type PayFrequency = 'annual' | 'monthly' | 'biweekly' | 'weekly' | 'hourly';

export const PAY_FREQUENCY_MULTIPLIERS: Record<PayFrequency, (annual: number) => number> = {
  annual: (annual) => annual,
  monthly: (annual) => annual / 12,
  biweekly: (annual) => annual / 26,
  weekly: (annual) => annual / 52,
  hourly: (annual) => annual / 2080,
};
