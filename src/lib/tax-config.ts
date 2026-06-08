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
  additionalMedicareThreshold: number; // $200,000 (single) - statutory, not indexed
  additionalMedicareThresholdMFJ: number; // $250,000 (married filing jointly) - statutory
  socialSecurityWageCap: number; // $184,500 for 2026
  totalRate: number; // 0.0765
}

export interface FederalTaxConfig {
  estimateBaseline: number; // 0.12 average effective rate estimate
  standardDeduction: number; // $16,100 single for 2026
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
  additionalMedicareThreshold: 200000, // Statutory threshold, not indexed for inflation
  additionalMedicareThresholdMFJ: 250000, // Married Filing Jointly threshold
  socialSecurityWageCap: 184500, // 2026 SS wage base per SSA (updated from $176,100 in 2025)
  totalRate: 0.0765,
};

export const FEDERAL_TAX_2026: FederalTaxConfig = {
  estimateBaseline: 0.12,
  // 2026 Standard Deductions per IRS Rev. Proc. 2025-32 (OBBBA boosted)
  standardDeduction: 16100,
  standardDeductionsByFiling: {
    single: 16100,
    married: 32200,
    head_of_household: 24150,
  },
  // Default brackets (single) - 2026 IRS inflation-adjusted per Rev. Proc. 2025-32
  brackets: [
    { min: 0, max: 12400, rate: 0.10 },
    { min: 12400, max: 50400, rate: 0.12 },
    { min: 50400, max: 105700, rate: 0.22 },
    { min: 105700, max: 201775, rate: 0.24 },
    { min: 201775, max: 256225, rate: 0.32 },
    { min: 256225, max: 640600, rate: 0.35 },
    { min: 640600, max: null, rate: 0.37 },
  ],
  bracketsByFiling: {
    single: [
      { min: 0, max: 12400, rate: 0.10 },
      { min: 12400, max: 50400, rate: 0.12 },
      { min: 50400, max: 105700, rate: 0.22 },
      { min: 105700, max: 201775, rate: 0.24 },
      { min: 201775, max: 256225, rate: 0.32 },
      { min: 256225, max: 640600, rate: 0.35 },
      { min: 640600, max: null, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 24800, rate: 0.10 },
      { min: 24800, max: 100800, rate: 0.12 },
      { min: 100800, max: 211400, rate: 0.22 },
      { min: 211400, max: 403550, rate: 0.24 },
      { min: 403550, max: 512450, rate: 0.32 },
      { min: 512450, max: 768700, rate: 0.35 },
      { min: 768700, max: null, rate: 0.37 },
    ],
    head_of_household: [
      { min: 0, max: 17700, rate: 0.10 },
      { min: 17700, max: 67450, rate: 0.12 },
      { min: 67450, max: 105700, rate: 0.22 },
      { min: 105700, max: 201750, rate: 0.24 },
      { min: 201750, max: 256200, rate: 0.32 },
      { min: 256200, max: 640600, rate: 0.35 },
      { min: 640600, max: null, rate: 0.37 },
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
  georgia: {
    name: 'Georgia',
    abbreviation: 'GA',
    incomeTaxRate: 0.0549,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 5400,
    hasIncomeTax: true,
    description:
      'Georgia has a progressive state income tax with a top rate of 5.49% as of 2026. Georgia recently transitioned from a graduated bracket system to a flat 5.49% rate starting in 2024, which continues through 2026. The state offers a standard deduction and personal exemptions.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: null, rate: 0.0549 },
    ],
    standardDeductionsByFiling: {
      single: 5400,
      married: 7100,
      head_of_household: 5400,
    },
    personalExemptionsByFiling: {
      single: 2700,
      married: 5400,
      head_of_household: 2700,
    },
  },
  virginia: {
    name: 'Virginia',
    abbreviation: 'VA',
    incomeTaxRate: 0.02,
    incomeTaxType: 'progressive',
    personalExemption: 930,
    standardDeduction: 8300,
    hasIncomeTax: true,
    description:
      'Virginia has a progressive state income tax with brackets from 2% to 5.75% as of 2026. Virginia offers a standard deduction and a personal exemption of $930 per person. The state also provides a sales tax rate of 5.3% (4.3% state + 1% local) and moderate property taxes.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 3000, rate: 0.02 },
      { min: 3000, max: 5000, rate: 0.03 },
      { min: 5000, max: 17000, rate: 0.05 },
      { min: 17000, max: null, rate: 0.0575 },
    ],
    standardDeductionsByFiling: {
      single: 8300,
      married: 16600,
      head_of_household: 8300,
    },
    personalExemptionsByFiling: {
      single: 930,
      married: 1860,
      head_of_household: 930,
    },
  },

  // ─── No-Income-Tax States ─────────────────────────────────────────────────

  alaska: {
    name: 'Alaska',
    abbreviation: 'AK',
    incomeTaxRate: 0,
    incomeTaxType: 'none',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: false,
    description:
      'Alaska has no state income tax and no state sales tax. The state funds government services primarily through oil revenues and the Permanent Fund Dividend, which pays residents an annual distribution. Local municipalities may impose local sales taxes.',
    effectiveDate: '2026-01-01',
  },

  nevada: {
    name: 'Nevada',
    abbreviation: 'NV',
    incomeTaxRate: 0,
    incomeTaxType: 'none',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: false,
    description:
      'Nevada has no state income tax. The state generates revenue through sales tax (6.85% state rate plus local option taxes) and gaming taxes. Nevada is a popular destination for those seeking to minimize their income tax burden.',
    effectiveDate: '2026-01-01',
  },

  southdakota: {
    name: 'South Dakota',
    abbreviation: 'SD',
    incomeTaxRate: 0,
    incomeTaxType: 'none',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: false,
    description:
      'South Dakota has no state income tax. The state relies on sales tax (4.5% state rate plus local taxes) and other revenue sources. South Dakota is considered one of the most tax-friendly states for residents.',
    effectiveDate: '2026-01-01',
  },

  wyoming: {
    name: 'Wyoming',
    abbreviation: 'WY',
    incomeTaxRate: 0,
    incomeTaxType: 'none',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: false,
    description:
      'Wyoming has no state income tax. The state funds government through sales tax (4% state rate plus local option) and mineral extraction revenues. Wyoming also has relatively low property taxes compared to the national average.',
    effectiveDate: '2026-01-01',
  },

  washington: {
    name: 'Washington',
    abbreviation: 'WA',
    incomeTaxRate: 0,
    incomeTaxType: 'none',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: false,
    description:
      'Washington has no state income tax on wages and salaries. The state levies a 7% capital gains tax on long-term gains above $270,000, but this does not apply to wage income. Washington relies on sales tax (6.5% state plus local) and B&O taxes.',
    effectiveDate: '2026-01-01',
  },

  tennessee: {
    name: 'Tennessee',
    abbreviation: 'TN',
    incomeTaxRate: 0,
    incomeTaxType: 'none',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: false,
    description:
      'Tennessee has no state income tax on wages. The Hall tax on dividends and interest was fully eliminated as of January 1, 2021. Tennessee relies on sales tax (7% state rate, one of the highest in the nation, plus local option taxes up to 2.75%).',
    effectiveDate: '2026-01-01',
  },

  newhampshire: {
    name: 'New Hampshire',
    abbreviation: 'NH',
    incomeTaxRate: 0,
    incomeTaxType: 'none',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: false,
    description:
      'New Hampshire has no state income tax on wages and salaries. The state previously taxed dividends and interest income but phased this out completely by 2025. New Hampshire has no sales tax either, relying on property taxes and business taxes.',
    effectiveDate: '2026-01-01',
  },

  // ─── Flat Income Tax States ───────────────────────────────────────────────

  arizona: {
    name: 'Arizona',
    abbreviation: 'AZ',
    incomeTaxRate: 0.025,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 14600,
    hasIncomeTax: true,
    description:
      'Arizona has a flat state income tax of 2.5% as of 2026. The state previously used a progressive bracket system but transitioned to a flat rate. Arizona offers a standard deduction and uses federal adjusted gross income as the starting point for state tax calculations.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 14600,
      married: 29200,
      head_of_household: 21900,
    },
  },

  colorado: {
    name: 'Colorado',
    abbreviation: 'CO',
    incomeTaxRate: 0.044,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Colorado has a flat state income tax of 4.4% as of 2026. Colorado uses federal taxable income as its starting point, meaning the federal standard deduction is effectively applied before the state rate. The flat rate has gradually decreased from 4.63% in recent years.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  idaho: {
    name: 'Idaho',
    abbreviation: 'ID',
    incomeTaxRate: 0.05695,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Idaho has a flat state income tax of 5.695% as of 2026. Idaho uses federal taxable income as its starting point, so the federal standard deduction is effectively applied. Idaho also offers a grocery tax credit and other targeted deductions.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  indiana: {
    name: 'Indiana',
    abbreviation: 'IN',
    incomeTaxRate: 0.0305,
    incomeTaxType: 'flat',
    personalExemption: 1000,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Indiana has a flat state income tax of 3.05% as of 2026. Indiana does not offer a standard deduction but provides personal exemptions of $1,000 or more per person. The state also allows county income taxes (averaging 1.5-2%) which vary by county of residence.',
    effectiveDate: '2026-01-01',
    personalExemptionsByFiling: {
      single: 1000,
      married: 2000,
      head_of_household: 1000,
    },
  },

  kentucky: {
    name: 'Kentucky',
    abbreviation: 'KY',
    incomeTaxRate: 0.04,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Kentucky has a flat state income tax of 4% as of 2026. Kentucky uses federal adjusted gross income as its starting point, so the federal standard deduction is not directly applied at the state level. Kentucky offers a standard deduction of $3,160 for single filers.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 3160,
      married: 6320,
      head_of_household: 3160,
    },
  },

  michigan: {
    name: 'Michigan',
    abbreviation: 'MI',
    incomeTaxRate: 0.0425,
    incomeTaxType: 'flat',
    personalExemption: 5500,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Michigan has a flat state income tax of 4.25% as of 2026. Michigan offers a personal exemption of $5,500 per person and does not have a standard deduction. The city of Detroit and some other Michigan cities levy additional city income taxes.',
    effectiveDate: '2026-01-01',
    personalExemptionsByFiling: {
      single: 5500,
      married: 11000,
      head_of_household: 5500,
    },
  },

  mississippi: {
    name: 'Mississippi',
    abbreviation: 'MS',
    incomeTaxRate: 0.047,
    incomeTaxType: 'flat',
    personalExemption: 6000,
    standardDeduction: 2300,
    hasIncomeTax: true,
    description:
      'Mississippi has a flat state income tax of 4.7% on income above $10,000 for single filers as of 2026. The state has been gradually phasing out its lower brackets. Mississippi offers a standard deduction and personal exemptions.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 2300,
      married: 4600,
      head_of_household: 3400,
    },
    personalExemptionsByFiling: {
      single: 6000,
      married: 12000,
      head_of_household: 6000,
    },
  },

  northcarolina: {
    name: 'North Carolina',
    abbreviation: 'NC',
    incomeTaxRate: 0.045,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 12750,
    hasIncomeTax: true,
    description:
      'North Carolina has a flat state income tax of 4.5% as of 2026, down from higher rates in previous years. The state offers a standard deduction but no personal exemption. North Carolina uses federal adjusted gross income as the starting point.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 12750,
      married: 25500,
      head_of_household: 19125,
    },
  },

  pennsylvania: {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    incomeTaxRate: 0.0307,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Pennsylvania has a flat state income tax of 3.07% as of 2026. Pennsylvania does not offer a standard deduction or personal exemptions at the state level. Some Pennsylvania municipalities and school districts also levy local earned income taxes (typically 1-2%).',
    effectiveDate: '2026-01-01',
  },

  utah: {
    name: 'Utah',
    abbreviation: 'UT',
    incomeTaxRate: 0.0465,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Utah has a flat state income tax of 4.65% as of 2026. Utah uses a personal credit system rather than a standard deduction. The state provides a taxpayer credit of up to 6% of federal standard deduction amounts, effectively reducing the tax burden for lower-income filers.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  // ─── Progressive Income Tax States ────────────────────────────────────────

  alabama: {
    name: 'Alabama',
    abbreviation: 'AL',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 1500,
    standardDeduction: 3000,
    hasIncomeTax: true,
    description:
      'Alabama has a progressive state income tax with brackets from 2% to 5% as of 2026. Alabama offers a standard deduction that varies by income level and a personal exemption of $1,500 per person. The state also allows federal income tax deduction on state returns.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 500, rate: 0.02 },
      { min: 500, max: 3000, rate: 0.04 },
      { min: 3000, max: null, rate: 0.05 },
    ],
    standardDeductionsByFiling: {
      single: 3000,
      married: 7500,
      head_of_household: 5250,
    },
    personalExemptionsByFiling: {
      single: 1500,
      married: 3000,
      head_of_household: 1500,
    },
  },

  arkansas: {
    name: 'Arkansas',
    abbreviation: 'AR',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 2620,
    hasIncomeTax: true,
    description:
      'Arkansas has a progressive state income tax with brackets from 2% to 4.4% as of 2026. Arkansas has been reducing its top rate in recent years. The state offers a standard deduction and personal credit based on filing status.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 5100, rate: 0.02 },
      { min: 5100, max: 10200, rate: 0.03 },
      { min: 10200, max: 15300, rate: 0.034 },
      { min: 15300, max: 25500, rate: 0.037 },
      { min: 25500, max: 89500, rate: 0.04 },
      { min: 89500, max: null, rate: 0.044 },
    ],
    standardDeductionsByFiling: {
      single: 2620,
      married: 5240,
      head_of_household: 4320,
    },
  },

  connecticut: {
    name: 'Connecticut',
    abbreviation: 'CT',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Connecticut has a progressive state income tax with brackets from 3% to 6.99% as of 2026. Connecticut does not offer a standard deduction or personal exemption. The state uses federal adjusted gross income as its starting point. Connecticut also has a property tax credit of up to $300 for eligible residents.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 10000, rate: 0.03 },
      { min: 10000, max: 50000, rate: 0.05 },
      { min: 50000, max: 100000, rate: 0.055 },
      { min: 100000, max: 200000, rate: 0.06 },
      { min: 200000, max: 250000, rate: 0.065 },
      { min: 250000, max: 500000, rate: 0.069 },
      { min: 500000, max: null, rate: 0.0699 },
    ],
  },

  delaware: {
    name: 'Delaware',
    abbreviation: 'DE',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 3250,
    hasIncomeTax: true,
    description:
      'Delaware has a progressive state income tax with brackets from 2.2% to 6.6% as of 2026. Delaware offers a standard deduction and personal credits. Despite its small size, Delaware has a relatively high top tax rate but no state or local sales tax.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 2000, rate: 0.022 },
      { min: 2000, max: 5000, rate: 0.039 },
      { min: 5000, max: 10000, rate: 0.048 },
      { min: 10000, max: 20000, rate: 0.052 },
      { min: 20000, max: 25000, rate: 0.055 },
      { min: 25000, max: 60000, rate: 0.066 },
      { min: 60000, max: null, rate: 0.066 },
    ],
    standardDeductionsByFiling: {
      single: 3250,
      married: 6500,
      head_of_household: 5125,
    },
  },

  hawaii: {
    name: 'Hawaii',
    abbreviation: 'HI',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 2200,
    hasIncomeTax: true,
    description:
      'Hawaii has a progressive state income tax with brackets from 1.4% to 11% as of 2026, making it one of the highest-taxed states for top earners. Hawaii offers a standard deduction and personal exemptions. The state also has a general excise tax (GET) of 4-4.5% that applies broadly.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 2400, rate: 0.014 },
      { min: 2400, max: 4800, rate: 0.032 },
      { min: 4800, max: 9600, rate: 0.055 },
      { min: 9600, max: 14400, rate: 0.064 },
      { min: 14400, max: 19200, rate: 0.068 },
      { min: 19200, max: 24000, rate: 0.072 },
      { min: 24000, max: 36000, rate: 0.076 },
      { min: 36000, max: 48000, rate: 0.079 },
      { min: 48000, max: 150000, rate: 0.082 },
      { min: 150000, max: 175000, rate: 0.09 },
      { min: 175000, max: 200000, rate: 0.10 },
      { min: 200000, max: null, rate: 0.11 },
    ],
    standardDeductionsByFiling: {
      single: 2200,
      married: 4400,
      head_of_household: 3212,
    },
  },

  iowa: {
    name: 'Iowa',
    abbreviation: 'IA',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Iowa has a progressive state income tax that is transitioning to a flat rate. For 2026, Iowa uses a graduated system with an effective rate of approximately 5.7%. Iowa uses federal taxable income as its starting point. The state has been gradually simplifying its tax code.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 6225, rate: 0.044 },
      { min: 6225, max: 12450, rate: 0.0482 },
      { min: 12450, max: 24900, rate: 0.0528 },
      { min: 24900, max: 34950, rate: 0.0563 },
      { min: 34950, max: 49800, rate: 0.0596 },
      { min: 49800, max: null, rate: 0.057 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  kansas: {
    name: 'Kansas',
    abbreviation: 'KS',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 3500,
    hasIncomeTax: true,
    description:
      'Kansas has a progressive state income tax with brackets from 3.1% to 5.7% as of 2026. Kansas offers a standard deduction and personal exemptions. The state uses federal adjusted gross income as its starting point.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 15000, rate: 0.031 },
      { min: 15000, max: 30000, rate: 0.0525 },
      { min: 30000, max: null, rate: 0.057 },
    ],
    standardDeductionsByFiling: {
      single: 3500,
      married: 8000,
      head_of_household: 5750,
    },
  },

  louisiana: {
    name: 'Louisiana',
    abbreviation: 'LA',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Louisiana has a progressive state income tax with brackets from 1.85% to 4.75% as of 2026. Louisiana uses federal taxable income as its starting point, so the federal standard deduction is effectively applied. Louisiana also allows a federal tax deduction on state returns.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 12500, rate: 0.0185 },
      { min: 12500, max: 50000, rate: 0.0185 },
      { min: 50000, max: null, rate: 0.0475 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  maine: {
    name: 'Maine',
    abbreviation: 'ME',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 14600,
    hasIncomeTax: true,
    description:
      'Maine has a progressive state income tax with brackets from 5.8% to 7.15% as of 2026. Maine offers a standard deduction and personal exemptions. The state conforms closely to the federal tax code and uses federal adjusted gross income as its starting point.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 24700, rate: 0.058 },
      { min: 24700, max: 55300, rate: 0.0675 },
      { min: 55300, max: null, rate: 0.0715 },
    ],
    standardDeductionsByFiling: {
      single: 14600,
      married: 29200,
      head_of_household: 21900,
    },
  },

  maryland: {
    name: 'Maryland',
    abbreviation: 'MD',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 3200,
    standardDeduction: 2400,
    hasIncomeTax: true,
    description:
      'Maryland has a progressive state income tax with brackets from 2% to 5.75% as of 2026. Maryland also imposes county income taxes that range from about 2.25% to 3.28%, bringing the combined top rate to over 9%. The state offers a standard deduction and personal exemptions.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1000, max: 2000, rate: 0.03 },
      { min: 2000, max: 3000, rate: 0.04 },
      { min: 3000, max: 150000, rate: 0.0475 },
      { min: 150000, max: 175000, rate: 0.05 },
      { min: 175000, max: 225000, rate: 0.0525 },
      { min: 225000, max: 300000, rate: 0.055 },
      { min: 300000, max: null, rate: 0.0575 },
    ],
    standardDeductionsByFiling: {
      single: 2400,
      married: 4800,
      head_of_household: 2400,
    },
    personalExemptionsByFiling: {
      single: 3200,
      married: 6400,
      head_of_household: 3200,
    },
  },

  massachusetts: {
    name: 'Massachusetts',
    abbreviation: 'MA',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Massachusetts has a flat state income tax of 5% on most income, plus a 4% surtax (millionaire\'s tax) on income exceeding $1 million as of 2026, for an effective top rate of 9%. Massachusetts does not offer a standard deduction. The state has traditionally been a flat-tax state with the recent addition of the high-income surtax.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 1000000, rate: 0.05 },
      { min: 1000000, max: null, rate: 0.09 },
    ],
  },

  minnesota: {
    name: 'Minnesota',
    abbreviation: 'MN',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 14575,
    hasIncomeTax: true,
    description:
      'Minnesota has a progressive state income tax with brackets from 5.35% to 9.85% as of 2026, making it one of the highest top rates in the nation. Minnesota offers a standard deduction and personal exemptions. The state also provides various credits including a working family credit.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 30570, rate: 0.0535 },
      { min: 30570, max: 126780, rate: 0.068 },
      { min: 126780, max: 210260, rate: 0.0785 },
      { min: 210260, max: null, rate: 0.0985 },
    ],
    standardDeductionsByFiling: {
      single: 14575,
      married: 29150,
      head_of_household: 21850,
    },
  },

  missouri: {
    name: 'Missouri',
    abbreviation: 'MO',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Missouri has a progressive state income tax with brackets from 2% to 4.8% as of 2026. Missouri uses federal taxable income as its starting point, so the federal standard deduction is effectively applied. Missouri has been gradually reducing its top rate in recent years.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 1157, rate: 0.02 },
      { min: 1157, max: 2314, rate: 0.025 },
      { min: 2314, max: 3471, rate: 0.03 },
      { min: 3471, max: 4628, rate: 0.035 },
      { min: 4628, max: 5785, rate: 0.04 },
      { min: 5785, max: 6942, rate: 0.045 },
      { min: 6942, max: 8099, rate: 0.048 },
      { min: 8099, max: null, rate: 0.048 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  montana: {
    name: 'Montana',
    abbreviation: 'MT',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 5510,
    hasIncomeTax: true,
    description:
      'Montana has a progressive state income tax with brackets from 1% to 5.9% as of 2026. Montana offers a standard deduction and personal exemptions. The state has no general sales tax, making it unique among states with income tax.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 3600, rate: 0.01 },
      { min: 3600, max: 6600, rate: 0.02 },
      { min: 6600, max: 10100, rate: 0.03 },
      { min: 10100, max: 13600, rate: 0.04 },
      { min: 13600, max: 17600, rate: 0.05 },
      { min: 17600, max: null, rate: 0.059 },
    ],
    standardDeductionsByFiling: {
      single: 5510,
      married: 11020,
      head_of_household: 5510,
    },
  },

  nebraska: {
    name: 'Nebraska',
    abbreviation: 'NE',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Nebraska has a progressive state income tax with brackets from 2.46% to 5.84% as of 2026. Nebraska uses federal adjusted gross income as its starting point and the federal standard deduction is not directly applied. Nebraska has been gradually reducing its top rate.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 3770, rate: 0.0246 },
      { min: 3770, max: 22670, rate: 0.0351 },
      { min: 22670, max: 35990, rate: 0.0501 },
      { min: 35990, max: null, rate: 0.0584 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  newjersey: {
    name: 'New Jersey',
    abbreviation: 'NJ',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'New Jersey has a progressive state income tax with brackets from 1.4% to 10.75% as of 2026, making it one of the highest top rates in the nation. New Jersey does not offer a standard deduction but provides personal exemptions. The state also has high property taxes, averaging the highest in the nation.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20000, max: 35000, rate: 0.0175 },
      { min: 35000, max: 40000, rate: 0.0245 },
      { min: 40000, max: 75000, rate: 0.035 },
      { min: 75000, max: 500000, rate: 0.05525 },
      { min: 500000, max: 5000000, rate: 0.0637 },
      { min: 5000000, max: null, rate: 0.1075 },
    ],
    personalExemptionsByFiling: {
      single: 1000,
      married: 2000,
      head_of_household: 1000,
    },
  },

  newmexico: {
    name: 'New Mexico',
    abbreviation: 'NM',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'New Mexico has a progressive state income tax with brackets from 1.7% to 5.9% as of 2026. New Mexico uses federal adjusted gross income as its starting point. The state has been gradually adjusting its bracket structure and offers various credits and exemptions.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 5501, rate: 0.017 },
      { min: 5501, max: 11001, rate: 0.032 },
      { min: 11001, max: 16001, rate: 0.047 },
      { min: 16001, max: 210001, rate: 0.049 },
      { min: 210001, max: 260001, rate: 0.059 },
      { min: 260001, max: null, rate: 0.059 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  northdakota: {
    name: 'North Dakota',
    abbreviation: 'ND',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'North Dakota has a progressive state income tax with brackets from 1.1% to 2.5% as of 2026, making it one of the lowest state income tax rates in the nation. North Dakota uses federal taxable income as its starting point. The state has been gradually reducing its rates.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 41550, rate: 0.011 },
      { min: 41550, max: 100300, rate: 0.0204 },
      { min: 100300, max: null, rate: 0.025 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  ohio: {
    name: 'Ohio',
    abbreviation: 'OH',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Ohio has a progressive state income tax with brackets from 2.765% to 3.99% as of 2026. Ohio uses federal adjusted gross income as its starting point and does not offer a standard deduction. The state has been gradually reducing its rates in recent years.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 26050, rate: 0.0 },
      { min: 26050, max: 46100, rate: 0.02765 },
      { min: 46100, max: 92150, rate: 0.03226 },
      { min: 92150, max: 115300, rate: 0.03688 },
      { min: 115300, max: null, rate: 0.0399 },
    ],
  },

  oklahoma: {
    name: 'Oklahoma',
    abbreviation: 'OK',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Oklahoma has a progressive state income tax with brackets from 0.25% to 4.75% as of 2026. Oklahoma uses federal adjusted gross income as its starting point. The state offers a standard deduction and personal exemptions. Oklahoma has been gradually reducing its top rate.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 1000, rate: 0.0025 },
      { min: 1000, max: 2500, rate: 0.0075 },
      { min: 2500, max: 3750, rate: 0.0125 },
      { min: 3750, max: 4900, rate: 0.0175 },
      { min: 4900, max: 7200, rate: 0.0225 },
      { min: 7200, max: 8700, rate: 0.03 },
      { min: 8700, max: 10300, rate: 0.035 },
      { min: 10300, max: 12200, rate: 0.04 },
      { min: 12200, max: null, rate: 0.0475 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  oregon: {
    name: 'Oregon',
    abbreviation: 'OR',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 2605,
    hasIncomeTax: true,
    description:
      'Oregon has a progressive state income tax with brackets from 4.75% to 9.9% as of 2026, making it one of the highest top rates in the nation. Oregon offers a standard deduction and has no state sales tax. The state also imposes a kicker refund when revenues exceed projections.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 3750, rate: 0.0475 },
      { min: 3750, max: 9450, rate: 0.0675 },
      { min: 9450, max: 125000, rate: 0.0875 },
      { min: 125000, max: null, rate: 0.099 },
    ],
    standardDeductionsByFiling: {
      single: 2605,
      married: 5210,
      head_of_household: 5210,
    },
  },

  rhodeisland: {
    name: 'Rhode Island',
    abbreviation: 'RI',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Rhode Island has a progressive state income tax with brackets from 3.75% to 5.99% as of 2026. Rhode Island uses federal adjusted gross income as its starting point. The state does not offer a standard deduction but provides a personal exemption and various credits.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 68200, rate: 0.0375 },
      { min: 68200, max: 155900, rate: 0.0475 },
      { min: 155900, max: null, rate: 0.0599 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  southcarolina: {
    name: 'South Carolina',
    abbreviation: 'SC',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'South Carolina has a progressive state income tax with a top rate of 6.4% as of 2026. The first $3,200 of taxable income is exempt (0% rate). South Carolina uses federal taxable income as its starting point. The state has been gradually reducing its top rate.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 3200, rate: 0.0 },
      { min: 3200, max: 16040, rate: 0.03 },
      { min: 16040, max: null, rate: 0.064 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  vermont: {
    name: 'Vermont',
    abbreviation: 'VT',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 6500,
    hasIncomeTax: true,
    description:
      'Vermont has a progressive state income tax with brackets from 3.35% to 8.75% as of 2026. Vermont offers a standard deduction and personal exemptions. The state also provides various credits including an earned income tax credit equal to 38% of the federal EITC.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 42600, rate: 0.0335 },
      { min: 42600, max: 103200, rate: 0.066 },
      { min: 103200, max: 213150, rate: 0.076 },
      { min: 213150, max: null, rate: 0.0875 },
    ],
    standardDeductionsByFiling: {
      single: 6500,
      married: 13000,
      head_of_household: 9750,
    },
  },

  westvirginia: {
    name: 'West Virginia',
    abbreviation: 'WV',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'West Virginia has a progressive state income tax with brackets from 3% to 5.12% as of 2026. West Virginia uses federal adjusted gross income as its starting point. The state has been gradually reducing its income tax rates and has discussed potential further reductions.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 10000, rate: 0.03 },
      { min: 10000, max: 25000, rate: 0.04 },
      { min: 25000, max: 40000, rate: 0.045 },
      { min: 40000, max: 60000, rate: 0.06 },
      { min: 60000, max: null, rate: 0.0512 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  wisconsin: {
    name: 'Wisconsin',
    abbreviation: 'WI',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 13010,
    hasIncomeTax: true,
    description:
      'Wisconsin has a progressive state income tax with brackets from 3.5% to 7.65% as of 2026. Wisconsin offers a standard deduction that phases out at higher incomes and personal exemptions. The state uses federal adjusted gross income as its starting point.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 13010, rate: 0.035 },
      { min: 13010, max: 26020, rate: 0.04 },
      { min: 26020, max: 286260, rate: 0.053 },
      { min: 286260, max: null, rate: 0.0765 },
    ],
    standardDeductionsByFiling: {
      single: 13010,
      married: 26020,
      head_of_household: 16780,
    },
  },
};

export const GEORGIA_COST_OF_LIVING = {
  averagePropertyTaxRate: 0.0092,
  averageSalesTaxRate: 0.0735, // 4% state + avg local
  averageHomeValue: 285000,
  averageAnnualPropertyTax: 2622,
};

export const VIRGINIA_COST_OF_LIVING = {
  averagePropertyTaxRate: 0.0082,
  averageSalesTaxRate: 0.053, // 4.3% state + 1% local
  averageHomeValue: 365000,
  averageAnnualPropertyTax: 2993,
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

// ─── NYC City Income Tax (2026) ──────────────────────────────────────────────
// NYC residents pay additional city income tax on top of NYS tax
export const NYC_TAX_2026 = {
  brackets: {
    single: [
      { min: 0, max: 12000, rate: 0.03078 },
      { min: 12000, max: 25000, rate: 0.03762 },
      { min: 25000, max: 50000, rate: 0.03834 },
      { min: 50000, max: null, rate: 0.03876 },
    ],
    married: [
      { min: 0, max: 21600, rate: 0.03078 },
      { min: 21600, max: 45000, rate: 0.03762 },
      { min: 45000, max: 90000, rate: 0.03834 },
      { min: 90000, max: null, rate: 0.03876 },
    ],
    head_of_household: [
      { min: 0, max: 14400, rate: 0.03078 },
      { min: 14400, max: 30000, rate: 0.03762 },
      { min: 30000, max: 60000, rate: 0.03834 },
      { min: 60000, max: null, rate: 0.03876 },
    ],
  },
  standardDeduction: 0, // NYC uses NYS standard deduction
};

export type PayFrequency = 'annual' | 'monthly' | 'biweekly' | 'weekly' | 'hourly';

export const PAY_FREQUENCY_MULTIPLIERS: Record<PayFrequency, (annual: number) => number> = {
  annual: (annual) => annual,
  monthly: (annual) => annual / 12,
  biweekly: (annual) => annual / 26,
  weekly: (annual) => annual / 52,
  hourly: (annual) => annual / 2080,
};
