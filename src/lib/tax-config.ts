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
    personalExemption: 2925,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Illinois imposes a flat state income tax of 4.95% with a personal exemption of $2,925 per person for 2025-2026. Unlike most states, Illinois does not offer a standard deduction; instead, the personal exemption reduces taxable income before the flat rate is applied.',
    effectiveDate: '2026-01-01',
    personalExemptionsByFiling: {
      single: 2925,
      married: 5850,
      head_of_household: 2925,
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
    standardDeduction: 8000,
    hasIncomeTax: true,
    description:
      'New York has a progressive state income tax with brackets from 3.9% to 10.9% for 2026. New York City residents pay an additional city income tax (3.078% to 3.876%). Combined with high property taxes and cost of living, New York has one of the highest overall tax burdens in the U.S.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 8500, rate: 0.039 },
      { min: 8500, max: 11700, rate: 0.044 },
      { min: 11700, max: 13900, rate: 0.0515 },
      { min: 13900, max: 80650, rate: 0.054 },
      { min: 80650, max: 215400, rate: 0.059 },
      { min: 215400, max: 1077550, rate: 0.0685 },
      { min: 1077550, max: 5000000, rate: 0.0965 },
      { min: 5000000, max: 25000000, rate: 0.103 },
      { min: 25000000, max: null, rate: 0.109 },
    ],
    standardDeductionsByFiling: {
      single: 8000,
      married: 16050,
      head_of_household: 11200,
    },
  },
  georgia: {
    name: 'Georgia',
    abbreviation: 'GA',
    incomeTaxRate: 0.0499,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 15000,
    hasIncomeTax: true,
    description:
      'Georgia taxes wages at a flat 4.99% state income tax rate for 2026 — HB 463 cut the rate from 5.19% retroactive to January 1, 2026 (5.49% applied in 2024). The standard deduction is $15,000 for single filers ($30,000 married filing jointly) and dependents get a $5,000 deduction each. Georgia has no personal exemption for the taxpayer and no local income taxes.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 15000,
      married: 30000,
      head_of_household: 15000,
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
    standardDeduction: 16100,
    hasIncomeTax: true,
    description:
      'Arizona has a flat state income tax of 2.5% for 2026. The state previously used a progressive bracket system but transitioned to a flat rate. Arizona subtracts the federal standard deduction ($16,100 single / $32,200 joint for 2026) and uses federal adjusted gross income as the starting point for state tax calculations.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
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
    incomeTaxRate: 0.053,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Idaho taxes income at 5.3% for 2026 (cut from 5.695% in 2024), with a small 0% band on the first $4,811 of taxable income (single; about $9,622 married filing jointly and head of household). Idaho uses the federal standard deduction ($16,100 single / $32,200 joint for 2026) and offers a grocery tax credit.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 4811, rate: 0.0 },
      { min: 4811, max: null, rate: 0.053 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
    },
  },

  indiana: {
    name: 'Indiana',
    abbreviation: 'IN',
    incomeTaxRate: 0.0295,
    incomeTaxType: 'flat',
    personalExemption: 1000,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Indiana has a flat state income tax of 2.95% for 2026 (down from 3.0% in 2025 and 3.05% in 2024, per Indiana Departmental Notice #1). Indiana does not offer a standard deduction but provides exemptions of $1,000 per person. The state also allows county income taxes (averaging 1.5-2%) which vary by county of residence.',
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
    incomeTaxRate: 0.035,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Kentucky has a flat state income tax of 3.5% for 2026, down from 4% in 2025 (per the KY Department of Revenue 2026 withholding formula). Kentucky uses federal adjusted gross income as its starting point. Kentucky offers a standard deduction of $3,360 for single filers ($6,720 married filing jointly). Most counties also levy a local occupational tax of roughly 1-2% on wages.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 3360,
      married: 6720,
      head_of_household: 3360,
    },
  },

  michigan: {
    name: 'Michigan',
    abbreviation: 'MI',
    incomeTaxRate: 0.0425,
    incomeTaxType: 'flat',
    personalExemption: 5900,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Michigan has a flat state income tax of 4.25% for 2026. Michigan offers a personal exemption of $5,900 per person and does not have a standard deduction. The city of Detroit and some other Michigan cities levy additional city income taxes.',
    effectiveDate: '2026-01-01',
    personalExemptionsByFiling: {
      single: 5900,
      married: 11800,
      head_of_household: 5900,
    },
  },

  mississippi: {
    name: 'Mississippi',
    abbreviation: 'MS',
    incomeTaxRate: 0.04,
    incomeTaxType: 'progressive',
    personalExemption: 6000,
    standardDeduction: 2300,
    hasIncomeTax: true,
    description:
      'Mississippi taxes income at a flat 4% for 2026, with the first $10,000 of taxable income exempt (0% bracket). The rate was 4.4% in 2025 and 4.7% in 2024 — the state finished phasing out its lower brackets in 2025. Mississippi offers a standard deduction and personal exemptions.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 10000, rate: 0.0 },
      { min: 10000, max: null, rate: 0.04 },
    ],
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
    incomeTaxRate: 0.0399,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 12750,
    hasIncomeTax: true,
    description:
      'North Carolina has a flat state income tax of 3.99% for 2026, down from 4.25% in 2025 and 4.5% in 2024 (per the NC Department of Revenue rate schedule). The state offers a standard deduction but no personal exemption. North Carolina uses federal adjusted gross income as the starting point.',
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
    incomeTaxRate: 0.0445,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Utah has a flat state income tax of 4.45% for 2026 — S.B. 60 (2026 session) cut the rate from 4.65% with retrospective operation for taxable years beginning on or after January 1, 2026. Utah uses a taxpayer credit of up to about 6% of the federal standard deduction instead of a state standard deduction, phasing down at higher incomes.',
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
      'Arkansas has a progressive state income tax for 2026 with a top rate of 3.9% (down from 4.4% in 2024). The first $5,599 of taxable income is taxed at 0%, then 2% up to $11,199, 3% up to $15,999, 3.4% up to $26,399, and 3.9% above. Arkansas offers a standard deduction of $2,470 for single filers ($4,940 married filing jointly) and a small per-exemption personal credit.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 5599, rate: 0.0 },
      { min: 5599, max: 11199, rate: 0.02 },
      { min: 11199, max: 15999, rate: 0.03 },
      { min: 15999, max: 26399, rate: 0.034 },
      { min: 26399, max: null, rate: 0.039 },
    ],
    standardDeductionsByFiling: {
      single: 2470,
      married: 4940,
      head_of_household: 2470,
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
      'Connecticut has a progressive state income tax with brackets from 2% to 6.99% for 2026 (the first $10,000 of taxable income has been taxed at 2% since 2024). Connecticut does not offer a standard deduction or personal exemption. The state uses federal adjusted gross income as its starting point. Connecticut also has a property tax credit of up to $300 for eligible residents.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 10000, rate: 0.02 },
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
      'Delaware has a progressive state income tax for 2026 from 0% to 6.6%: the first $2,000 of taxable income is exempt, then 2.2% up to $5,000, 3.9% up to $10,000, 4.8% up to $20,000, 5.2% up to $25,000, 5.55% up to $60,000, and 6.6% above. Delaware offers a standard deduction and personal credits, and has no state or local sales tax.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 2000, rate: 0.0 },
      { min: 2000, max: 5000, rate: 0.022 },
      { min: 5000, max: 10000, rate: 0.039 },
      { min: 10000, max: 20000, rate: 0.048 },
      { min: 20000, max: 25000, rate: 0.052 },
      { min: 25000, max: 60000, rate: 0.0555 },
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
    incomeTaxRate: 0.038,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Iowa has a flat state income tax of 3.8% for 2026 — all levels of taxable individual income are subject to this single rate (per the Iowa Department of Revenue). Iowa allows the federal standard deduction ($16,100 single / $32,200 joint for 2026). The rate is scheduled to fall further in future years.',
    effectiveDate: '2026-01-01',
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
    personalExemption: 9160,
    standardDeduction: 12765,
    hasIncomeTax: true,
    description:
      'Kansas has a two-bracket state income tax for 2026: 5.2% on taxable income up to $23,000 and 5.58% above (the 2024 tax law lowered these from 5.2%/5.7%). Kansas offers a standard deduction of $12,765 for single filers ($26,560 married filing jointly) and a personal exemption of $9,160.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 23000, rate: 0.052 },
      { min: 23000, max: null, rate: 0.0558 },
    ],
    standardDeductionsByFiling: {
      single: 12765,
      married: 26560,
      head_of_household: 15340,
    },
    personalExemptionsByFiling: {
      single: 9160,
      married: 18320,
      head_of_household: 9160,
    },
  },

  louisiana: {
    name: 'Louisiana',
    abbreviation: 'LA',
    incomeTaxRate: 0.03,
    incomeTaxType: 'flat',
    personalExemption: 0,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Louisiana taxes net income at a flat 3% for 2026 (the flat rate took effect in 2025, replacing the old 1.85%-4.75% bracket system, per LRS 47:32). The standard deduction is $12,875 for single filers ($25,750 married filing jointly), plus a $4,500 deduction per dependent.',
    effectiveDate: '2026-01-01',
    standardDeductionsByFiling: {
      single: 12875,
      married: 25750,
      head_of_household: 25750,
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
      'Maryland has a progressive state income tax for 2026 with brackets from 2% to 6.5% — two new top brackets (6.25% and 6.5%) apply from tax year 2025. Maryland counties add a local income tax of 2.25% to 3.2% on top of the state tax. The state offers a standard deduction and personal exemptions.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1000, max: 2000, rate: 0.03 },
      { min: 2000, max: 3000, rate: 0.04 },
      { min: 3000, max: 100000, rate: 0.0475 },
      { min: 100000, max: 125000, rate: 0.05 },
      { min: 125000, max: 150000, rate: 0.0525 },
      { min: 150000, max: 250000, rate: 0.055 },
      { min: 250000, max: 500000, rate: 0.0575 },
      { min: 500000, max: 1000000, rate: 0.0625 },
      { min: 1000000, max: null, rate: 0.065 },
    ],
    standardDeductionsByFiling: {
      single: 3350,
      married: 6700,
      head_of_household: 3350,
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
      'Missouri has a progressive state income tax for 2026: the first $1,348 of taxable income is taxed at 0%, then rates step up by 0.5% for every $1,348-wide band from 2% to 4.5%, with a top rate of 4.7% above $9,436 (down from 4.8% in 2024). Missouri uses the federal standard deduction ($16,100 single / $32,200 joint for 2026).',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 1348, rate: 0.0 },
      { min: 1348, max: 2696, rate: 0.02 },
      { min: 2696, max: 4044, rate: 0.025 },
      { min: 4044, max: 5392, rate: 0.03 },
      { min: 5392, max: 6740, rate: 0.035 },
      { min: 6740, max: 8088, rate: 0.04 },
      { min: 8088, max: 9436, rate: 0.045 },
      { min: 9436, max: null, rate: 0.047 },
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
    standardDeduction: 16100,
    hasIncomeTax: true,
    description:
      'Montana taxes ordinary income for 2026 at 4.7% up to $47,500 of taxable income (single; $95,000 married filing jointly) and 5.65% above, under the two-rate structure of HB 337. Montana\'s 2026 withholding applies the federal standard deduction ($16,100 single / $32,200 joint). Montana has no general sales tax.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 47500, rate: 0.047 },
      { min: 47500, max: null, rate: 0.0565 },
    ],
    standardDeductionsByFiling: {
      single: 16100,
      married: 32200,
      head_of_household: 24150,
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
      'Nebraska has a progressive state income tax for 2026: 2.46% on the first $4,130 of taxable income, 3.51% up to $24,760, and 4.55% above (the top rate was 5.84% in 2024). Nebraska\'s standard deduction is $8,850 for single filers ($17,700 married filing jointly) and each personal exemption is worth $176.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 4130, rate: 0.0246 },
      { min: 4130, max: 24760, rate: 0.0351 },
      { min: 24760, max: null, rate: 0.0455 },
    ],
    standardDeductionsByFiling: {
      single: 8850,
      married: 17700,
      head_of_household: 12950,
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
      'New Jersey has a progressive state income tax with brackets from 1.4% to 10.75% for 2026, making it one of the highest top rates in the nation. New Jersey does not offer a standard deduction but provides personal exemptions. The state also has high property taxes, averaging the highest in the nation.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20000, max: 35000, rate: 0.0175 },
      { min: 35000, max: 40000, rate: 0.035 },
      { min: 40000, max: 75000, rate: 0.05525 },
      { min: 75000, max: 500000, rate: 0.0637 },
      { min: 500000, max: 1000000, rate: 0.0897 },
      { min: 1000000, max: null, rate: 0.1075 },
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
      'New Mexico has a progressive state income tax for 2026 with brackets from 1.5% to 5.9% (rates lowered for 2025 by HB 252). New Mexico uses federal adjusted gross income as its starting point and applies the federal standard deduction. The state offers various credits and exemptions.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 5500, rate: 0.015 },
      { min: 5500, max: 16500, rate: 0.032 },
      { min: 16500, max: 33500, rate: 0.043 },
      { min: 33500, max: 66500, rate: 0.047 },
      { min: 66500, max: 210000, rate: 0.049 },
      { min: 210000, max: null, rate: 0.059 },
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
      'North Dakota taxes income for 2026 with a 0% bracket up to $48,475 of taxable income (single; about $80,975 married filing jointly), then 1.95% up to $244,825 and 2.5% above — among the lowest state income tax rates in the nation. North Dakota uses federal taxable income as its starting point.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 48475, rate: 0.0 },
      { min: 48475, max: 244825, rate: 0.0195 },
      { min: 244825, max: null, rate: 0.025 },
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
    incomeTaxRate: 0.0275,
    incomeTaxType: 'progressive',
    personalExemption: 2400,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Ohio taxes income for 2026 at a top rate of 2.75% (cut from 3.5% in 2024 and 3.99% before that, per HB 96). The first $26,050 of taxable income is taxed at 0%; above that the statutory schedule is $332 plus 2.75% of the excess. Personal and dependent exemptions ($2,400 each at low incomes, phasing down to $1,900) further reduce taxable income.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 26050, rate: 0.0 },
      { min: 26050, max: null, rate: 0.0275 },
    ],
    personalExemptionsByFiling: {
      single: 2400,
      married: 4800,
      head_of_household: 2400,
    },
  },

  oklahoma: {
    name: 'Oklahoma',
    abbreviation: 'OK',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 1000,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'Oklahoma has a progressive state income tax for 2026: 0% on the first $3,750 of taxable income, 2.5% up to $4,900, 3.5% up to $7,200, and 4.5% above (HB 2764 replaced the old ladder that topped out at 4.75%). Oklahoma offers a standard deduction of $7,350 for single filers and a $1,000 personal exemption; the rate may fall automatically in future years if revenue targets are met.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 3750, rate: 0.0 },
      { min: 3750, max: 4900, rate: 0.025 },
      { min: 4900, max: 7200, rate: 0.035 },
      { min: 7200, max: null, rate: 0.045 },
    ],
    standardDeductionsByFiling: {
      single: 7350,
      married: 14700,
      head_of_household: 10350,
    },
    personalExemptionsByFiling: {
      single: 1000,
      married: 2000,
      head_of_household: 1000,
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
      'South Carolina has a progressive state income tax for 2026: the first $3,640 of taxable income is exempt (0%), 3% up to $18,230, and 6% above — the top rate finished its step-down from 7% to 6% in 2025. South Carolina uses the federal standard deduction ($16,100 single / $32,200 joint for 2026).',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 3640, rate: 0.0 },
      { min: 3640, max: 18230, rate: 0.03 },
      { min: 18230, max: null, rate: 0.06 },
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
    personalExemption: 2000,
    standardDeduction: 0,
    hasIncomeTax: true,
    description:
      'West Virginia has a progressive state income tax for 2026 with brackets from 2.11% to 4.58% (SB 392, enacted retroactive to January 1, 2026). West Virginia has no standard deduction; instead each personal exemption is worth $2,000.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 10000, rate: 0.0211 },
      { min: 10000, max: 25000, rate: 0.0281 },
      { min: 25000, max: 40000, rate: 0.0316 },
      { min: 40000, max: 60000, rate: 0.0422 },
      { min: 60000, max: null, rate: 0.0458 },
    ],
    personalExemptionsByFiling: {
      single: 2000,
      married: 4000,
      head_of_household: 2000,
    },
  },

  wisconsin: {
    name: 'Wisconsin',
    abbreviation: 'WI',
    incomeTaxRate: 0,
    incomeTaxType: 'progressive',
    personalExemption: 0,
    standardDeduction: 13560,
    hasIncomeTax: true,
    description:
      'Wisconsin has a progressive state income tax for 2026: 3.5% up to $14,680 of taxable income, 4.4% up to $50,480, 5.3% up to $323,290, and 7.65% above (rates lowered from 3.54%/4.65%/6.27%/7.65%). Wisconsin uses a sliding standard deduction of up to $13,560 for single filers that begins phasing out at $19,550 of income.',
    effectiveDate: '2026-01-01',
    brackets: [
      { min: 0, max: 14680, rate: 0.035 },
      { min: 14680, max: 50480, rate: 0.044 },
      { min: 50480, max: 323290, rate: 0.053 },
      { min: 323290, max: null, rate: 0.0765 },
    ],
    standardDeductionsByFiling: {
      single: 13560,
      married: 25110,
      head_of_household: 17520,
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

export const WASHINGTON_COST_OF_LIVING = {
  averagePropertyTaxRate: 0.0093, // 0.93% average effective rate
  averageSalesTaxRate: 0.094, // 6.5% state + avg local (~9.4% combined)
  averageHomeValue: 520000,
  averageAnnualPropertyTax: 4836,
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

export const TENNESSEE_COST_OF_LIVING = {
  averagePropertyTaxRate: 0.0064,
  averageSalesTaxRate: 0.0956, // 7% state + avg local
  averageHomeValue: 270000,
  averageAnnualPropertyTax: 1728,
};

export type PayFrequency = 'annual' | 'monthly' | 'biweekly' | 'weekly' | 'hourly';

export const PAY_FREQUENCY_MULTIPLIERS: Record<PayFrequency, (annual: number) => number> = {
  annual: (annual) => annual,
  monthly: (annual) => annual / 12,
  biweekly: (annual) => annual / 26,
  weekly: (annual) => annual / 52,
  hourly: (annual) => annual / 2080,
};
