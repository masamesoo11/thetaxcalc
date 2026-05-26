/**
 * Centralized 2026 Tax Configuration
 * All tax constants, brackets, and state profiles are defined here
 * for easy maintenance and single-source-of-truth updates.
 */

export interface StateBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface StateProfile {
  name: string;
  abbreviation: string;
  incomeTaxRate: number; // as decimal, e.g. 0.0495 for 4.95% (used for flat/none)
  incomeTaxType: 'flat' | 'progressive' | 'none';
  personalExemption: number; // annual dollar amount
  standardDeduction: number; // annual dollar amount
  hasIncomeTax: boolean;
  description: string;
  effectiveDate: string;
  brackets?: StateBracket[]; // for progressive states
  standardDeductionsByFiling?: Record<string, number>;
  personalExemptionsByFiling?: Record<string, number>;
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
  standardDeductionsByFiling: Record<string, number>;
  brackets: FederalBracket[];
  bracketsByFiling: Record<string, FederalBracket[]>;
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
  standardDeductionsByFiling: {
    single: 15000,
    married: 30000,
    head_of_household: 22500,
  },
  brackets: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: null, rate: 0.37 },
  ],
  bracketsByFiling: {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: null, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: null, rate: 0.37 },
    ],
    head_of_household: [
      { min: 0, max: 16500, rate: 0.10 },
      { min: 16500, max: 63100, rate: 0.12 },
      { min: 63100, max: 100500, rate: 0.22 },
      { min: 100500, max: 191950, rate: 0.24 },
      { min: 191950, max: 243700, rate: 0.32 },
      { min: 243700, max: 609350, rate: 0.35 },
      { min: 609350, max: null, rate: 0.37 },
    ],
  },
};

export const STATE_PROFILES: Record<string, StateProfile> = {
  illinois: {
    name: 'Illinois',
    abbreviation: 'IL',
    incomeTaxRate: 0.0495,
    incomeTaxType: 'flat',
    personalExemption: 2775,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Illinois imposes a flat state income tax of 4.95% with a personal exemption of $2,775 per person. Unlike most states, Illinois does not offer a standard deduction; instead, the personal exemption reduces taxable income before the flat rate is applied.',
    effectiveDate: '2026-01-01',
    personalExemptionsByFiling: {
      single: 2775,
      married: 5550,
      head_of_household: 2775,
    },
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
  california: {
    name: 'California',
    abbreviation: 'CA',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 6083,
    hasIncomeTax: true,
    description:
      'California has the highest state income tax in the nation with progressive brackets from 1% to 13.3%. The state also has a 7.25% base sales tax (highest in the nation) and moderate property taxes (0.71% average effective rate). California is one of the most heavily taxed states overall.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 10412, rate: 0.01 },
      { min: 10412, max: 24684, rate: 0.02 },
      { min: 24684, max: 38959, rate: 0.04 },
      { min: 38959, max: 54381, rate: 0.06 },
      { min: 54381, max: 68350, rate: 0.08 },
      { min: 68350, max: 349137, rate: 0.093 },
      { min: 349137, max: 418961, rate: 0.103 },
      { min: 418961, max: 698271, rate: 0.113 },
      { min: 698271, max: null, rate: 0.133 },
    ],
    standardDeductionsByFiling: {
      single: 6083,
      married: 12166,
      head_of_household: 12293,
    },
  },
  newyork: {
    name: 'New York',
    abbreviation: 'NY',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 8100,
    hasIncomeTax: true,
    description:
      'New York has a progressive state income tax with brackets from 4% to 10.9% as of 2026. New York City residents pay an additional city income tax (3.078% to 3.876%). Combined with high property taxes and cost of living, New York has one of the highest overall tax burdens in the U.S.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 8500, rate: 0.04 },
      { min: 8500, max: 11700, rate: 0.045 },
      { min: 11700, max: 13900, rate: 0.0525 },
      { min: 13900, max: 80650, rate: 0.055 },
      { min: 80650, max: 215400, rate: 0.06 },
      { min: 215400, max: 1077550, rate: 0.0685 },
      { min: 1077550, max: 5000000, rate: 0.0965 },
      { min: 5000000, max: 25000000, rate: 0.103 },
      { min: 25000000, max: null, rate: 0.109 },
    ],
    standardDeductionsByFiling: {
      single: 8100,
      married: 16200,
      head_of_household: 11200,
    },
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

export const CALIFORNIA_COST_OF_LIVING = {
  averagePropertyTaxRate: 0.0071,
  averageSalesTaxRate: 0.0882, // 7.25% state + avg local
  averageHomeValue: 785000,
  averageAnnualPropertyTax: 5574,
};

export const NEWYORK_COST_OF_LIVING = {
  averagePropertyTaxRate: 0.0162,
  averageSalesTaxRate: 0.0852, // 4% state + avg local + NYC
  averageHomeValue: 425000,
  averageAnnualPropertyTax: 6885,
};

export type PayFrequency = 'annual' | 'monthly' | 'biweekly' | 'weekly' | 'hourly';

export const PAY_FREQUENCY_MULTIPLIERS: Record<PayFrequency, (annual: number) => number> = {
  annual: (annual) => annual,
  monthly: (annual) => annual / 12,
  biweekly: (annual) => annual / 26,
  weekly: (annual) => annual / 52,
  hourly: (annual) => annual / 2080,
};
