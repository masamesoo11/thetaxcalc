module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/lib/tax-config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Centralized 2026 Tax Configuration
 * All tax constants, brackets, and state profiles are defined here
 * for easy maintenance and single-source-of-truth updates.
 */ __turbopack_context__.s([
    "CALIFORNIA_COST_OF_LIVING",
    ()=>CALIFORNIA_COST_OF_LIVING,
    "FEDERAL_TAX_2026",
    ()=>FEDERAL_TAX_2026,
    "FICA_2026",
    ()=>FICA_2026,
    "FLORIDA_COST_OF_LIVING",
    ()=>FLORIDA_COST_OF_LIVING,
    "GEORGIA_COST_OF_LIVING",
    ()=>GEORGIA_COST_OF_LIVING,
    "MORTGAGE_DEFAULTS",
    ()=>MORTGAGE_DEFAULTS,
    "NEWYORK_COST_OF_LIVING",
    ()=>NEWYORK_COST_OF_LIVING,
    "NYC_TAX_2026",
    ()=>NYC_TAX_2026,
    "PAY_FREQUENCY_MULTIPLIERS",
    ()=>PAY_FREQUENCY_MULTIPLIERS,
    "STATE_PROFILES",
    ()=>STATE_PROFILES,
    "TENNESSEE_COST_OF_LIVING",
    ()=>TENNESSEE_COST_OF_LIVING,
    "TEXAS_COST_OF_LIVING",
    ()=>TEXAS_COST_OF_LIVING,
    "VIRGINIA_COST_OF_LIVING",
    ()=>VIRGINIA_COST_OF_LIVING,
    "WASHINGTON_COST_OF_LIVING",
    ()=>WASHINGTON_COST_OF_LIVING
]);
const FICA_2026 = {
    socialSecurityRate: 0.062,
    medicareRate: 0.0145,
    additionalMedicareRate: 0.009,
    additionalMedicareThreshold: 200000,
    additionalMedicareThresholdMFJ: 250000,
    socialSecurityWageCap: 184500,
    totalRate: 0.0765
};
const FEDERAL_TAX_2026 = {
    estimateBaseline: 0.12,
    // 2026 Standard Deductions per IRS Rev. Proc. 2025-32 (OBBBA boosted)
    standardDeduction: 16100,
    standardDeductionsByFiling: {
        single: 16100,
        married: 32200,
        head_of_household: 24150
    },
    // Default brackets (single) - 2026 IRS inflation-adjusted per Rev. Proc. 2025-32
    brackets: [
        {
            min: 0,
            max: 12400,
            rate: 0.10
        },
        {
            min: 12400,
            max: 50400,
            rate: 0.12
        },
        {
            min: 50400,
            max: 105700,
            rate: 0.22
        },
        {
            min: 105700,
            max: 201775,
            rate: 0.24
        },
        {
            min: 201775,
            max: 256225,
            rate: 0.32
        },
        {
            min: 256225,
            max: 640600,
            rate: 0.35
        },
        {
            min: 640600,
            max: null,
            rate: 0.37
        }
    ],
    bracketsByFiling: {
        single: [
            {
                min: 0,
                max: 12400,
                rate: 0.10
            },
            {
                min: 12400,
                max: 50400,
                rate: 0.12
            },
            {
                min: 50400,
                max: 105700,
                rate: 0.22
            },
            {
                min: 105700,
                max: 201775,
                rate: 0.24
            },
            {
                min: 201775,
                max: 256225,
                rate: 0.32
            },
            {
                min: 256225,
                max: 640600,
                rate: 0.35
            },
            {
                min: 640600,
                max: null,
                rate: 0.37
            }
        ],
        married: [
            {
                min: 0,
                max: 24800,
                rate: 0.10
            },
            {
                min: 24800,
                max: 100800,
                rate: 0.12
            },
            {
                min: 100800,
                max: 211400,
                rate: 0.22
            },
            {
                min: 211400,
                max: 403550,
                rate: 0.24
            },
            {
                min: 403550,
                max: 512450,
                rate: 0.32
            },
            {
                min: 512450,
                max: 768700,
                rate: 0.35
            },
            {
                min: 768700,
                max: null,
                rate: 0.37
            }
        ],
        head_of_household: [
            {
                min: 0,
                max: 17700,
                rate: 0.10
            },
            {
                min: 17700,
                max: 67450,
                rate: 0.12
            },
            {
                min: 67450,
                max: 105700,
                rate: 0.22
            },
            {
                min: 105700,
                max: 201750,
                rate: 0.24
            },
            {
                min: 201750,
                max: 256200,
                rate: 0.32
            },
            {
                min: 256200,
                max: 640600,
                rate: 0.35
            },
            {
                min: 640600,
                max: null,
                rate: 0.37
            }
        ]
    }
};
const STATE_PROFILES = {
    illinois: {
        name: 'Illinois',
        abbreviation: 'IL',
        incomeTaxRate: 0.0495,
        incomeTaxType: 'flat',
        personalExemption: 2925,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Illinois imposes a flat state income tax of 4.95% with a personal exemption of $2,925 per person for 2025-2026. Unlike most states, Illinois does not offer a standard deduction; instead, the personal exemption reduces taxable income before the flat rate is applied.',
        effectiveDate: '2026-01-01',
        personalExemptionsByFiling: {
            single: 2925,
            married: 5850,
            head_of_household: 2925
        }
    },
    texas: {
        name: 'Texas',
        abbreviation: 'TX',
        incomeTaxRate: 0,
        incomeTaxType: 'none',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: false,
        description: 'Texas has no state income tax. However, Texas compensates with higher property taxes (averaging 1.6-1.8% of appraised home value) and a 6.25% state sales tax. The overall cost-of-living burden is important to consider when evaluating take-home pay.',
        effectiveDate: '2026-01-01'
    },
    florida: {
        name: 'Florida',
        abbreviation: 'FL',
        incomeTaxRate: 0,
        incomeTaxType: 'none',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: false,
        description: 'Florida has no state income tax. The state relies on sales tax (6% state + local surtax up to 1.5%) and property taxes to fund government services. Florida homeowners pay an average effective property tax rate of about 0.86% of home value.',
        effectiveDate: '2026-01-01'
    },
    california: {
        name: 'California',
        abbreviation: 'CA',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 6083,
        hasIncomeTax: true,
        description: 'California has the highest state income tax in the nation with progressive brackets from 1% to 13.3%. The state also has a 7.25% base sales tax (highest in the nation) and moderate property taxes (0.71% average effective rate). California is one of the most heavily taxed states overall.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 10412,
                rate: 0.01
            },
            {
                min: 10412,
                max: 24684,
                rate: 0.02
            },
            {
                min: 24684,
                max: 38959,
                rate: 0.04
            },
            {
                min: 38959,
                max: 54381,
                rate: 0.06
            },
            {
                min: 54381,
                max: 68350,
                rate: 0.08
            },
            {
                min: 68350,
                max: 349137,
                rate: 0.093
            },
            {
                min: 349137,
                max: 418961,
                rate: 0.103
            },
            {
                min: 418961,
                max: 698271,
                rate: 0.113
            },
            {
                min: 698271,
                max: null,
                rate: 0.133
            }
        ],
        standardDeductionsByFiling: {
            single: 6083,
            married: 12166,
            head_of_household: 12293
        }
    },
    newyork: {
        name: 'New York',
        abbreviation: 'NY',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 8000,
        hasIncomeTax: true,
        description: 'New York has a progressive state income tax with brackets from 3.9% to 10.9% for 2026. New York City residents pay an additional city income tax (3.078% to 3.876%). Combined with high property taxes and cost of living, New York has one of the highest overall tax burdens in the U.S.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 8500,
                rate: 0.039
            },
            {
                min: 8500,
                max: 11700,
                rate: 0.044
            },
            {
                min: 11700,
                max: 13900,
                rate: 0.0515
            },
            {
                min: 13900,
                max: 80650,
                rate: 0.054
            },
            {
                min: 80650,
                max: 215400,
                rate: 0.059
            },
            {
                min: 215400,
                max: 1077550,
                rate: 0.0685
            },
            {
                min: 1077550,
                max: 5000000,
                rate: 0.0965
            },
            {
                min: 5000000,
                max: 25000000,
                rate: 0.103
            },
            {
                min: 25000000,
                max: null,
                rate: 0.109
            }
        ],
        standardDeductionsByFiling: {
            single: 8000,
            married: 16050,
            head_of_household: 11200
        }
    },
    georgia: {
        name: 'Georgia',
        abbreviation: 'GA',
        incomeTaxRate: 0.0499,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 15000,
        hasIncomeTax: true,
        description: 'Georgia taxes wages at a flat 4.99% state income tax rate for 2026 — HB 463 cut the rate from 5.19% retroactive to January 1, 2026 (5.49% applied in 2024). The standard deduction is $15,000 for single filers ($30,000 married filing jointly) and dependents get a $5,000 deduction each. Georgia has no personal exemption for the taxpayer and no local income taxes.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 15000,
            married: 30000,
            head_of_household: 15000
        }
    },
    virginia: {
        name: 'Virginia',
        abbreviation: 'VA',
        incomeTaxRate: 0.02,
        incomeTaxType: 'progressive',
        personalExemption: 930,
        standardDeduction: 8300,
        hasIncomeTax: true,
        description: 'Virginia has a progressive state income tax with brackets from 2% to 5.75% as of 2026. Virginia offers a standard deduction and a personal exemption of $930 per person. The state also provides a sales tax rate of 5.3% (4.3% state + 1% local) and moderate property taxes.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 3000,
                rate: 0.02
            },
            {
                min: 3000,
                max: 5000,
                rate: 0.03
            },
            {
                min: 5000,
                max: 17000,
                rate: 0.05
            },
            {
                min: 17000,
                max: null,
                rate: 0.0575
            }
        ],
        standardDeductionsByFiling: {
            single: 8300,
            married: 16600,
            head_of_household: 8300
        },
        personalExemptionsByFiling: {
            single: 930,
            married: 1860,
            head_of_household: 930
        }
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
        description: 'Alaska has no state income tax and no state sales tax. The state funds government services primarily through oil revenues and the Permanent Fund Dividend, which pays residents an annual distribution. Local municipalities may impose local sales taxes.',
        effectiveDate: '2026-01-01'
    },
    nevada: {
        name: 'Nevada',
        abbreviation: 'NV',
        incomeTaxRate: 0,
        incomeTaxType: 'none',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: false,
        description: 'Nevada has no state income tax. The state generates revenue through sales tax (6.85% state rate plus local option taxes) and gaming taxes. Nevada is a popular destination for those seeking to minimize their income tax burden.',
        effectiveDate: '2026-01-01'
    },
    southdakota: {
        name: 'South Dakota',
        abbreviation: 'SD',
        incomeTaxRate: 0,
        incomeTaxType: 'none',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: false,
        description: 'South Dakota has no state income tax. The state relies on sales tax (4.5% state rate plus local taxes) and other revenue sources. South Dakota is considered one of the most tax-friendly states for residents.',
        effectiveDate: '2026-01-01'
    },
    wyoming: {
        name: 'Wyoming',
        abbreviation: 'WY',
        incomeTaxRate: 0,
        incomeTaxType: 'none',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: false,
        description: 'Wyoming has no state income tax. The state funds government through sales tax (4% state rate plus local option) and mineral extraction revenues. Wyoming also has relatively low property taxes compared to the national average.',
        effectiveDate: '2026-01-01'
    },
    washington: {
        name: 'Washington',
        abbreviation: 'WA',
        incomeTaxRate: 0,
        incomeTaxType: 'none',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: false,
        description: 'Washington has no state income tax on wages and salaries. The state levies a 7% capital gains tax on long-term gains above $270,000, but this does not apply to wage income. Washington relies on sales tax (6.5% state plus local) and B&O taxes.',
        effectiveDate: '2026-01-01'
    },
    tennessee: {
        name: 'Tennessee',
        abbreviation: 'TN',
        incomeTaxRate: 0,
        incomeTaxType: 'none',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: false,
        description: 'Tennessee has no state income tax on wages. The Hall tax on dividends and interest was fully eliminated as of January 1, 2021. Tennessee relies on sales tax (7% state rate, one of the highest in the nation, plus local option taxes up to 2.75%).',
        effectiveDate: '2026-01-01'
    },
    newhampshire: {
        name: 'New Hampshire',
        abbreviation: 'NH',
        incomeTaxRate: 0,
        incomeTaxType: 'none',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: false,
        description: 'New Hampshire has no state income tax on wages and salaries. The state previously taxed dividends and interest income but phased this out completely by 2025. New Hampshire has no sales tax either, relying on property taxes and business taxes.',
        effectiveDate: '2026-01-01'
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
        description: 'Arizona has a flat state income tax of 2.5% for 2026. The state previously used a progressive bracket system but transitioned to a flat rate. Arizona subtracts the federal standard deduction ($16,100 single / $32,200 joint for 2026) and uses federal adjusted gross income as the starting point for state tax calculations.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    colorado: {
        name: 'Colorado',
        abbreviation: 'CO',
        incomeTaxRate: 0.044,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Colorado has a flat state income tax of 4.4% as of 2026. Colorado uses federal taxable income as its starting point, meaning the federal standard deduction is effectively applied before the state rate. The flat rate has gradually decreased from 4.63% in recent years.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    idaho: {
        name: 'Idaho',
        abbreviation: 'ID',
        incomeTaxRate: 0.053,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Idaho taxes income at 5.3% for 2026 (cut from 5.695% in 2024), with a small 0% band on the first $4,811 of taxable income (single; about $9,622 married filing jointly and head of household). Idaho uses the federal standard deduction ($16,100 single / $32,200 joint for 2026) and offers a grocery tax credit.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 4811,
                rate: 0.0
            },
            {
                min: 4811,
                max: null,
                rate: 0.053
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    indiana: {
        name: 'Indiana',
        abbreviation: 'IN',
        incomeTaxRate: 0.0295,
        incomeTaxType: 'flat',
        personalExemption: 1000,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Indiana has a flat state income tax of 2.95% for 2026 (down from 3.0% in 2025 and 3.05% in 2024, per Indiana Departmental Notice #1). Indiana does not offer a standard deduction but provides exemptions of $1,000 per person. The state also allows county income taxes (averaging 1.5-2%) which vary by county of residence.',
        effectiveDate: '2026-01-01',
        personalExemptionsByFiling: {
            single: 1000,
            married: 2000,
            head_of_household: 1000
        }
    },
    kentucky: {
        name: 'Kentucky',
        abbreviation: 'KY',
        incomeTaxRate: 0.035,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Kentucky has a flat state income tax of 3.5% for 2026, down from 4% in 2025 (per the KY Department of Revenue 2026 withholding formula). Kentucky uses federal adjusted gross income as its starting point. Kentucky offers a standard deduction of $3,360 for single filers ($6,720 married filing jointly). Most counties also levy a local occupational tax of roughly 1-2% on wages.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 3360,
            married: 6720,
            head_of_household: 3360
        }
    },
    michigan: {
        name: 'Michigan',
        abbreviation: 'MI',
        incomeTaxRate: 0.0425,
        incomeTaxType: 'flat',
        personalExemption: 5900,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Michigan has a flat state income tax of 4.25% for 2026. Michigan offers a personal exemption of $5,900 per person and does not have a standard deduction. The city of Detroit and some other Michigan cities levy additional city income taxes.',
        effectiveDate: '2026-01-01',
        personalExemptionsByFiling: {
            single: 5900,
            married: 11800,
            head_of_household: 5900
        }
    },
    mississippi: {
        name: 'Mississippi',
        abbreviation: 'MS',
        incomeTaxRate: 0.04,
        incomeTaxType: 'progressive',
        personalExemption: 6000,
        standardDeduction: 2300,
        hasIncomeTax: true,
        description: 'Mississippi taxes income at a flat 4% for 2026, with the first $10,000 of taxable income exempt (0% bracket). The rate was 4.4% in 2025 and 4.7% in 2024 — the state finished phasing out its lower brackets in 2025. Mississippi offers a standard deduction and personal exemptions.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 10000,
                rate: 0.0
            },
            {
                min: 10000,
                max: null,
                rate: 0.04
            }
        ],
        standardDeductionsByFiling: {
            single: 2300,
            married: 4600,
            head_of_household: 3400
        },
        personalExemptionsByFiling: {
            single: 6000,
            married: 12000,
            head_of_household: 6000
        }
    },
    northcarolina: {
        name: 'North Carolina',
        abbreviation: 'NC',
        incomeTaxRate: 0.0399,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 12750,
        hasIncomeTax: true,
        description: 'North Carolina has a flat state income tax of 3.99% for 2026, down from 4.25% in 2025 and 4.5% in 2024 (per the NC Department of Revenue rate schedule). The state offers a standard deduction but no personal exemption. North Carolina uses federal adjusted gross income as the starting point.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 12750,
            married: 25500,
            head_of_household: 19125
        }
    },
    pennsylvania: {
        name: 'Pennsylvania',
        abbreviation: 'PA',
        incomeTaxRate: 0.0307,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Pennsylvania has a flat state income tax of 3.07% as of 2026. Pennsylvania does not offer a standard deduction or personal exemptions at the state level. Some Pennsylvania municipalities and school districts also levy local earned income taxes (typically 1-2%).',
        effectiveDate: '2026-01-01'
    },
    utah: {
        name: 'Utah',
        abbreviation: 'UT',
        incomeTaxRate: 0.0445,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Utah has a flat state income tax of 4.45% for 2026 — S.B. 60 (2026 session) cut the rate from 4.65% with retrospective operation for taxable years beginning on or after January 1, 2026. Utah uses a taxpayer credit of up to about 6% of the federal standard deduction instead of a state standard deduction, phasing down at higher incomes.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
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
        description: 'Alabama has a progressive state income tax with brackets from 2% to 5% as of 2026. Alabama offers a standard deduction that varies by income level and a personal exemption of $1,500 per person. The state also allows federal income tax deduction on state returns.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 500,
                rate: 0.02
            },
            {
                min: 500,
                max: 3000,
                rate: 0.04
            },
            {
                min: 3000,
                max: null,
                rate: 0.05
            }
        ],
        standardDeductionsByFiling: {
            single: 3000,
            married: 7500,
            head_of_household: 5250
        },
        personalExemptionsByFiling: {
            single: 1500,
            married: 3000,
            head_of_household: 1500
        }
    },
    arkansas: {
        name: 'Arkansas',
        abbreviation: 'AR',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 2620,
        hasIncomeTax: true,
        description: 'Arkansas has a progressive state income tax for 2026 with a top rate of 3.9% (down from 4.4% in 2024). The first $5,599 of taxable income is taxed at 0%, then 2% up to $11,199, 3% up to $15,999, 3.4% up to $26,399, and 3.9% above. Arkansas offers a standard deduction of $2,470 for single filers ($4,940 married filing jointly) and a small per-exemption personal credit.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 5599,
                rate: 0.0
            },
            {
                min: 5599,
                max: 11199,
                rate: 0.02
            },
            {
                min: 11199,
                max: 15999,
                rate: 0.03
            },
            {
                min: 15999,
                max: 26399,
                rate: 0.034
            },
            {
                min: 26399,
                max: null,
                rate: 0.039
            }
        ],
        standardDeductionsByFiling: {
            single: 2470,
            married: 4940,
            head_of_household: 2470
        }
    },
    connecticut: {
        name: 'Connecticut',
        abbreviation: 'CT',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Connecticut has a progressive state income tax with brackets from 2% to 6.99% for 2026 (the first $10,000 of taxable income has been taxed at 2% since 2024). Connecticut does not offer a standard deduction or personal exemption. The state uses federal adjusted gross income as its starting point. Connecticut also has a property tax credit of up to $300 for eligible residents.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 10000,
                rate: 0.02
            },
            {
                min: 10000,
                max: 50000,
                rate: 0.05
            },
            {
                min: 50000,
                max: 100000,
                rate: 0.055
            },
            {
                min: 100000,
                max: 200000,
                rate: 0.06
            },
            {
                min: 200000,
                max: 250000,
                rate: 0.065
            },
            {
                min: 250000,
                max: 500000,
                rate: 0.069
            },
            {
                min: 500000,
                max: null,
                rate: 0.0699
            }
        ]
    },
    delaware: {
        name: 'Delaware',
        abbreviation: 'DE',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 3250,
        hasIncomeTax: true,
        description: 'Delaware has a progressive state income tax for 2026 from 0% to 6.6%: the first $2,000 of taxable income is exempt, then 2.2% up to $5,000, 3.9% up to $10,000, 4.8% up to $20,000, 5.2% up to $25,000, 5.55% up to $60,000, and 6.6% above. Delaware offers a standard deduction and personal credits, and has no state or local sales tax.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 2000,
                rate: 0.0
            },
            {
                min: 2000,
                max: 5000,
                rate: 0.022
            },
            {
                min: 5000,
                max: 10000,
                rate: 0.039
            },
            {
                min: 10000,
                max: 20000,
                rate: 0.048
            },
            {
                min: 20000,
                max: 25000,
                rate: 0.052
            },
            {
                min: 25000,
                max: 60000,
                rate: 0.0555
            },
            {
                min: 60000,
                max: null,
                rate: 0.066
            }
        ],
        standardDeductionsByFiling: {
            single: 3250,
            married: 6500,
            head_of_household: 5125
        }
    },
    hawaii: {
        name: 'Hawaii',
        abbreviation: 'HI',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 2200,
        hasIncomeTax: true,
        description: 'Hawaii has a progressive state income tax with brackets from 1.4% to 11% as of 2026, making it one of the highest-taxed states for top earners. Hawaii offers a standard deduction and personal exemptions. The state also has a general excise tax (GET) of 4-4.5% that applies broadly.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 2400,
                rate: 0.014
            },
            {
                min: 2400,
                max: 4800,
                rate: 0.032
            },
            {
                min: 4800,
                max: 9600,
                rate: 0.055
            },
            {
                min: 9600,
                max: 14400,
                rate: 0.064
            },
            {
                min: 14400,
                max: 19200,
                rate: 0.068
            },
            {
                min: 19200,
                max: 24000,
                rate: 0.072
            },
            {
                min: 24000,
                max: 36000,
                rate: 0.076
            },
            {
                min: 36000,
                max: 48000,
                rate: 0.079
            },
            {
                min: 48000,
                max: 150000,
                rate: 0.082
            },
            {
                min: 150000,
                max: 175000,
                rate: 0.09
            },
            {
                min: 175000,
                max: 200000,
                rate: 0.10
            },
            {
                min: 200000,
                max: null,
                rate: 0.11
            }
        ],
        standardDeductionsByFiling: {
            single: 2200,
            married: 4400,
            head_of_household: 3212
        }
    },
    iowa: {
        name: 'Iowa',
        abbreviation: 'IA',
        incomeTaxRate: 0.038,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Iowa has a flat state income tax of 3.8% for 2026 — all levels of taxable individual income are subject to this single rate (per the Iowa Department of Revenue). Iowa allows the federal standard deduction ($16,100 single / $32,200 joint for 2026). The rate is scheduled to fall further in future years.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    kansas: {
        name: 'Kansas',
        abbreviation: 'KS',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 9160,
        standardDeduction: 12765,
        hasIncomeTax: true,
        description: 'Kansas has a two-bracket state income tax for 2026: 5.2% on taxable income up to $23,000 and 5.58% above (the 2024 tax law lowered these from 5.2%/5.7%). Kansas offers a standard deduction of $12,765 for single filers ($26,560 married filing jointly) and a personal exemption of $9,160.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 23000,
                rate: 0.052
            },
            {
                min: 23000,
                max: null,
                rate: 0.0558
            }
        ],
        standardDeductionsByFiling: {
            single: 12765,
            married: 26560,
            head_of_household: 15340
        },
        personalExemptionsByFiling: {
            single: 9160,
            married: 18320,
            head_of_household: 9160
        }
    },
    louisiana: {
        name: 'Louisiana',
        abbreviation: 'LA',
        incomeTaxRate: 0.03,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Louisiana taxes net income at a flat 3% for 2026 (the flat rate took effect in 2025, replacing the old 1.85%-4.75% bracket system, per LRS 47:32). The standard deduction is $12,875 for single filers ($25,750 married filing jointly), plus a $4,500 deduction per dependent.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 12875,
            married: 25750,
            head_of_household: 25750
        }
    },
    maine: {
        name: 'Maine',
        abbreviation: 'ME',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 14600,
        hasIncomeTax: true,
        description: 'Maine has a progressive state income tax with brackets from 5.8% to 7.15% as of 2026. Maine offers a standard deduction and personal exemptions. The state conforms closely to the federal tax code and uses federal adjusted gross income as its starting point.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 24700,
                rate: 0.058
            },
            {
                min: 24700,
                max: 55300,
                rate: 0.0675
            },
            {
                min: 55300,
                max: null,
                rate: 0.0715
            }
        ],
        standardDeductionsByFiling: {
            single: 14600,
            married: 29200,
            head_of_household: 21900
        }
    },
    maryland: {
        name: 'Maryland',
        abbreviation: 'MD',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 3200,
        standardDeduction: 2400,
        hasIncomeTax: true,
        description: 'Maryland has a progressive state income tax for 2026 with brackets from 2% to 6.5% — two new top brackets (6.25% and 6.5%) apply from tax year 2025. Maryland counties add a local income tax of 2.25% to 3.2% on top of the state tax. The state offers a standard deduction and personal exemptions.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 1000,
                rate: 0.02
            },
            {
                min: 1000,
                max: 2000,
                rate: 0.03
            },
            {
                min: 2000,
                max: 3000,
                rate: 0.04
            },
            {
                min: 3000,
                max: 100000,
                rate: 0.0475
            },
            {
                min: 100000,
                max: 125000,
                rate: 0.05
            },
            {
                min: 125000,
                max: 150000,
                rate: 0.0525
            },
            {
                min: 150000,
                max: 250000,
                rate: 0.055
            },
            {
                min: 250000,
                max: 500000,
                rate: 0.0575
            },
            {
                min: 500000,
                max: 1000000,
                rate: 0.0625
            },
            {
                min: 1000000,
                max: null,
                rate: 0.065
            }
        ],
        standardDeductionsByFiling: {
            single: 3350,
            married: 6700,
            head_of_household: 3350
        },
        personalExemptionsByFiling: {
            single: 3200,
            married: 6400,
            head_of_household: 3200
        }
    },
    massachusetts: {
        name: 'Massachusetts',
        abbreviation: 'MA',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Massachusetts has a flat state income tax of 5% on most income, plus a 4% surtax (millionaire\'s tax) on income exceeding $1 million as of 2026, for an effective top rate of 9%. Massachusetts does not offer a standard deduction. The state has traditionally been a flat-tax state with the recent addition of the high-income surtax.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 1000000,
                rate: 0.05
            },
            {
                min: 1000000,
                max: null,
                rate: 0.09
            }
        ]
    },
    minnesota: {
        name: 'Minnesota',
        abbreviation: 'MN',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 14575,
        hasIncomeTax: true,
        description: 'Minnesota has a progressive state income tax with brackets from 5.35% to 9.85% as of 2026, making it one of the highest top rates in the nation. Minnesota offers a standard deduction and personal exemptions. The state also provides various credits including a working family credit.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 30570,
                rate: 0.0535
            },
            {
                min: 30570,
                max: 126780,
                rate: 0.068
            },
            {
                min: 126780,
                max: 210260,
                rate: 0.0785
            },
            {
                min: 210260,
                max: null,
                rate: 0.0985
            }
        ],
        standardDeductionsByFiling: {
            single: 14575,
            married: 29150,
            head_of_household: 21850
        }
    },
    missouri: {
        name: 'Missouri',
        abbreviation: 'MO',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Missouri has a progressive state income tax for 2026: the first $1,348 of taxable income is taxed at 0%, then rates step up by 0.5% for every $1,348-wide band from 2% to 4.5%, with a top rate of 4.7% above $9,436 (down from 4.8% in 2024). Missouri uses the federal standard deduction ($16,100 single / $32,200 joint for 2026).',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 1348,
                rate: 0.0
            },
            {
                min: 1348,
                max: 2696,
                rate: 0.02
            },
            {
                min: 2696,
                max: 4044,
                rate: 0.025
            },
            {
                min: 4044,
                max: 5392,
                rate: 0.03
            },
            {
                min: 5392,
                max: 6740,
                rate: 0.035
            },
            {
                min: 6740,
                max: 8088,
                rate: 0.04
            },
            {
                min: 8088,
                max: 9436,
                rate: 0.045
            },
            {
                min: 9436,
                max: null,
                rate: 0.047
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    montana: {
        name: 'Montana',
        abbreviation: 'MT',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 16100,
        hasIncomeTax: true,
        description: 'Montana taxes ordinary income for 2026 at 4.7% up to $47,500 of taxable income (single; $95,000 married filing jointly) and 5.65% above, under the two-rate structure of HB 337. Montana\'s 2026 withholding applies the federal standard deduction ($16,100 single / $32,200 joint). Montana has no general sales tax.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 47500,
                rate: 0.047
            },
            {
                min: 47500,
                max: null,
                rate: 0.0565
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    nebraska: {
        name: 'Nebraska',
        abbreviation: 'NE',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Nebraska has a progressive state income tax for 2026: 2.46% on the first $4,130 of taxable income, 3.51% up to $24,760, and 4.55% above (the top rate was 5.84% in 2024). Nebraska\'s standard deduction is $8,850 for single filers ($17,700 married filing jointly) and each personal exemption is worth $176.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 4130,
                rate: 0.0246
            },
            {
                min: 4130,
                max: 24760,
                rate: 0.0351
            },
            {
                min: 24760,
                max: null,
                rate: 0.0455
            }
        ],
        standardDeductionsByFiling: {
            single: 8850,
            married: 17700,
            head_of_household: 12950
        }
    },
    newjersey: {
        name: 'New Jersey',
        abbreviation: 'NJ',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'New Jersey has a progressive state income tax with brackets from 1.4% to 10.75% for 2026, making it one of the highest top rates in the nation. New Jersey does not offer a standard deduction but provides personal exemptions. The state also has high property taxes, averaging the highest in the nation.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 20000,
                rate: 0.014
            },
            {
                min: 20000,
                max: 35000,
                rate: 0.0175
            },
            {
                min: 35000,
                max: 40000,
                rate: 0.035
            },
            {
                min: 40000,
                max: 75000,
                rate: 0.05525
            },
            {
                min: 75000,
                max: 500000,
                rate: 0.0637
            },
            {
                min: 500000,
                max: 1000000,
                rate: 0.0897
            },
            {
                min: 1000000,
                max: null,
                rate: 0.1075
            }
        ],
        personalExemptionsByFiling: {
            single: 1000,
            married: 2000,
            head_of_household: 1000
        }
    },
    newmexico: {
        name: 'New Mexico',
        abbreviation: 'NM',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'New Mexico has a progressive state income tax for 2026 with brackets from 1.5% to 5.9% (rates lowered for 2025 by HB 252). New Mexico uses federal adjusted gross income as its starting point and applies the federal standard deduction. The state offers various credits and exemptions.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 5500,
                rate: 0.015
            },
            {
                min: 5500,
                max: 16500,
                rate: 0.032
            },
            {
                min: 16500,
                max: 33500,
                rate: 0.043
            },
            {
                min: 33500,
                max: 66500,
                rate: 0.047
            },
            {
                min: 66500,
                max: 210000,
                rate: 0.049
            },
            {
                min: 210000,
                max: null,
                rate: 0.059
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    northdakota: {
        name: 'North Dakota',
        abbreviation: 'ND',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'North Dakota taxes income for 2026 with a 0% bracket up to $48,475 of taxable income (single; about $80,975 married filing jointly), then 1.95% up to $244,825 and 2.5% above — among the lowest state income tax rates in the nation. North Dakota uses federal taxable income as its starting point.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 48475,
                rate: 0.0
            },
            {
                min: 48475,
                max: 244825,
                rate: 0.0195
            },
            {
                min: 244825,
                max: null,
                rate: 0.025
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    ohio: {
        name: 'Ohio',
        abbreviation: 'OH',
        incomeTaxRate: 0.0275,
        incomeTaxType: 'progressive',
        personalExemption: 2400,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Ohio taxes income for 2026 at a top rate of 2.75% (cut from 3.5% in 2024 and 3.99% before that, per HB 96). The first $26,050 of taxable income is taxed at 0%; above that the statutory schedule is $332 plus 2.75% of the excess. Personal and dependent exemptions ($2,400 each at low incomes, phasing down to $1,900) further reduce taxable income.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 26050,
                rate: 0.0
            },
            {
                min: 26050,
                max: null,
                rate: 0.0275
            }
        ],
        personalExemptionsByFiling: {
            single: 2400,
            married: 4800,
            head_of_household: 2400
        }
    },
    oklahoma: {
        name: 'Oklahoma',
        abbreviation: 'OK',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 1000,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Oklahoma has a progressive state income tax for 2026: 0% on the first $3,750 of taxable income, 2.5% up to $4,900, 3.5% up to $7,200, and 4.5% above (HB 2764 replaced the old ladder that topped out at 4.75%). Oklahoma offers a standard deduction of $7,350 for single filers and a $1,000 personal exemption; the rate may fall automatically in future years if revenue targets are met.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 3750,
                rate: 0.0
            },
            {
                min: 3750,
                max: 4900,
                rate: 0.025
            },
            {
                min: 4900,
                max: 7200,
                rate: 0.035
            },
            {
                min: 7200,
                max: null,
                rate: 0.045
            }
        ],
        standardDeductionsByFiling: {
            single: 7350,
            married: 14700,
            head_of_household: 10350
        },
        personalExemptionsByFiling: {
            single: 1000,
            married: 2000,
            head_of_household: 1000
        }
    },
    oregon: {
        name: 'Oregon',
        abbreviation: 'OR',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 2605,
        hasIncomeTax: true,
        description: 'Oregon has a progressive state income tax with brackets from 4.75% to 9.9% as of 2026, making it one of the highest top rates in the nation. Oregon offers a standard deduction and has no state sales tax. The state also imposes a kicker refund when revenues exceed projections.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 3750,
                rate: 0.0475
            },
            {
                min: 3750,
                max: 9450,
                rate: 0.0675
            },
            {
                min: 9450,
                max: 125000,
                rate: 0.0875
            },
            {
                min: 125000,
                max: null,
                rate: 0.099
            }
        ],
        standardDeductionsByFiling: {
            single: 2605,
            married: 5210,
            head_of_household: 5210
        }
    },
    rhodeisland: {
        name: 'Rhode Island',
        abbreviation: 'RI',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Rhode Island has a progressive state income tax with brackets from 3.75% to 5.99% as of 2026. Rhode Island uses federal adjusted gross income as its starting point. The state does not offer a standard deduction but provides a personal exemption and various credits.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 68200,
                rate: 0.0375
            },
            {
                min: 68200,
                max: 155900,
                rate: 0.0475
            },
            {
                min: 155900,
                max: null,
                rate: 0.0599
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    southcarolina: {
        name: 'South Carolina',
        abbreviation: 'SC',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'South Carolina has a progressive state income tax for 2026: the first $3,640 of taxable income is exempt (0%), 3% up to $18,230, and 6% above — the top rate finished its step-down from 7% to 6% in 2025. South Carolina uses the federal standard deduction ($16,100 single / $32,200 joint for 2026).',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 3640,
                rate: 0.0
            },
            {
                min: 3640,
                max: 18230,
                rate: 0.03
            },
            {
                min: 18230,
                max: null,
                rate: 0.06
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    vermont: {
        name: 'Vermont',
        abbreviation: 'VT',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 6500,
        hasIncomeTax: true,
        description: 'Vermont has a progressive state income tax with brackets from 3.35% to 8.75% as of 2026. Vermont offers a standard deduction and personal exemptions. The state also provides various credits including an earned income tax credit equal to 38% of the federal EITC.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 42600,
                rate: 0.0335
            },
            {
                min: 42600,
                max: 103200,
                rate: 0.066
            },
            {
                min: 103200,
                max: 213150,
                rate: 0.076
            },
            {
                min: 213150,
                max: null,
                rate: 0.0875
            }
        ],
        standardDeductionsByFiling: {
            single: 6500,
            married: 13000,
            head_of_household: 9750
        }
    },
    westvirginia: {
        name: 'West Virginia',
        abbreviation: 'WV',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 2000,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'West Virginia has a progressive state income tax for 2026 with brackets from 2.11% to 4.58% (SB 392, enacted retroactive to January 1, 2026). West Virginia has no standard deduction; instead each personal exemption is worth $2,000.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 10000,
                rate: 0.0211
            },
            {
                min: 10000,
                max: 25000,
                rate: 0.0281
            },
            {
                min: 25000,
                max: 40000,
                rate: 0.0316
            },
            {
                min: 40000,
                max: 60000,
                rate: 0.0422
            },
            {
                min: 60000,
                max: null,
                rate: 0.0458
            }
        ],
        personalExemptionsByFiling: {
            single: 2000,
            married: 4000,
            head_of_household: 2000
        }
    },
    wisconsin: {
        name: 'Wisconsin',
        abbreviation: 'WI',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 13560,
        hasIncomeTax: true,
        description: 'Wisconsin has a progressive state income tax for 2026: 3.5% up to $14,680 of taxable income, 4.4% up to $50,480, 5.3% up to $323,290, and 7.65% above (rates lowered from 3.54%/4.65%/6.27%/7.65%). Wisconsin uses a sliding standard deduction of up to $13,560 for single filers that begins phasing out at $19,550 of income.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 14680,
                rate: 0.035
            },
            {
                min: 14680,
                max: 50480,
                rate: 0.044
            },
            {
                min: 50480,
                max: 323290,
                rate: 0.053
            },
            {
                min: 323290,
                max: null,
                rate: 0.0765
            }
        ],
        standardDeductionsByFiling: {
            single: 13560,
            married: 25110,
            head_of_household: 17520
        }
    }
};
const GEORGIA_COST_OF_LIVING = {
    averagePropertyTaxRate: 0.0092,
    averageSalesTaxRate: 0.0735,
    averageHomeValue: 285000,
    averageAnnualPropertyTax: 2622
};
const VIRGINIA_COST_OF_LIVING = {
    averagePropertyTaxRate: 0.0082,
    averageSalesTaxRate: 0.053,
    averageHomeValue: 365000,
    averageAnnualPropertyTax: 2993
};
const MORTGAGE_DEFAULTS = {
    homePrice: 350000,
    downPayment: 70000,
    interestRate: 6.5,
    loanTerm: 30,
    extraMonthlyPayment: 0
};
const TEXAS_COST_OF_LIVING = {
    averagePropertyTaxRate: 0.0171,
    averageSalesTaxRate: 0.082,
    averageHomeValue: 290000,
    averageAnnualPropertyTax: 4959
};
const FLORIDA_COST_OF_LIVING = {
    averagePropertyTaxRate: 0.0086,
    averageSalesTaxRate: 0.07,
    averageHomeValue: 395000,
    averageAnnualPropertyTax: 3397
};
const WASHINGTON_COST_OF_LIVING = {
    averagePropertyTaxRate: 0.0093,
    averageSalesTaxRate: 0.094,
    averageHomeValue: 520000,
    averageAnnualPropertyTax: 4836
};
const CALIFORNIA_COST_OF_LIVING = {
    averagePropertyTaxRate: 0.0071,
    averageSalesTaxRate: 0.0882,
    averageHomeValue: 785000,
    averageAnnualPropertyTax: 5574
};
const NEWYORK_COST_OF_LIVING = {
    averagePropertyTaxRate: 0.0162,
    averageSalesTaxRate: 0.0852,
    averageHomeValue: 425000,
    averageAnnualPropertyTax: 6885
};
const NYC_TAX_2026 = {
    brackets: {
        single: [
            {
                min: 0,
                max: 12000,
                rate: 0.03078
            },
            {
                min: 12000,
                max: 25000,
                rate: 0.03762
            },
            {
                min: 25000,
                max: 50000,
                rate: 0.03834
            },
            {
                min: 50000,
                max: null,
                rate: 0.03876
            }
        ],
        married: [
            {
                min: 0,
                max: 21600,
                rate: 0.03078
            },
            {
                min: 21600,
                max: 45000,
                rate: 0.03762
            },
            {
                min: 45000,
                max: 90000,
                rate: 0.03834
            },
            {
                min: 90000,
                max: null,
                rate: 0.03876
            }
        ],
        head_of_household: [
            {
                min: 0,
                max: 14400,
                rate: 0.03078
            },
            {
                min: 14400,
                max: 30000,
                rate: 0.03762
            },
            {
                min: 30000,
                max: 60000,
                rate: 0.03834
            },
            {
                min: 60000,
                max: null,
                rate: 0.03876
            }
        ]
    },
    standardDeduction: 0
};
const TENNESSEE_COST_OF_LIVING = {
    averagePropertyTaxRate: 0.0064,
    averageSalesTaxRate: 0.0956,
    averageHomeValue: 270000,
    averageAnnualPropertyTax: 1728
};
const PAY_FREQUENCY_MULTIPLIERS = {
    annual: (annual)=>annual,
    monthly: (annual)=>annual / 12,
    biweekly: (annual)=>annual / 26,
    weekly: (annual)=>annual / 52,
    hourly: (annual)=>annual / 2080
};
}),
"[project]/src/lib/finance-utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateCaliforniaCostOfLiving",
    ()=>calculateCaliforniaCostOfLiving,
    "calculateFICA",
    ()=>calculateFICA,
    "calculateFederalTax",
    ()=>calculateFederalTax,
    "calculateFederalTaxEstimate",
    ()=>calculateFederalTaxEstimate,
    "calculateFloridaCostOfLiving",
    ()=>calculateFloridaCostOfLiving,
    "calculateMortgage",
    ()=>calculateMortgage,
    "calculateNYCTax",
    ()=>calculateNYCTax,
    "calculateNewYorkCostOfLiving",
    ()=>calculateNewYorkCostOfLiving,
    "calculatePaycheck",
    ()=>calculatePaycheck,
    "calculateRelocation",
    ()=>calculateRelocation,
    "calculateRetirementProjection",
    ()=>calculateRetirementProjection,
    "calculateStateTax",
    ()=>calculateStateTax,
    "calculateTennesseeCostOfLiving",
    ()=>calculateTennesseeCostOfLiving,
    "calculateTexasCostOfLiving",
    ()=>calculateTexasCostOfLiving,
    "calculateWashingtonCostOfLiving",
    ()=>calculateWashingtonCostOfLiving,
    "formatCurrency",
    ()=>formatCurrency,
    "formatNumber",
    ()=>formatNumber,
    "formatPercent",
    ()=>formatPercent,
    "getPageFromHash",
    ()=>getPageFromHash,
    "getPeriodsPerYear",
    ()=>getPeriodsPerYear,
    "parseHashParams",
    ()=>parseHashParams,
    "roundCurrency",
    ()=>roundCurrency,
    "serializeToHash",
    ()=>serializeToHash,
    "updateHash",
    ()=>updateHash
]);
/**
 * Financial Calculation Utilities
 * All arithmetic uses safe floating-point practices:
 * - Calculations use raw decimal values throughout the pipeline
 * - Rounding (to 2 decimal places) is applied ONLY at the final display node
 * - This prevents decimal drift from cumulative rounding errors
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tax-config.ts [app-rsc] (ecmascript)");
;
function roundCurrency(value) {
    return Math.round(value * 100) / 100;
}
function formatCurrency(value) {
    return roundCurrency(value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function formatPercent(value) {
    return (value * 100).toFixed(2) + '%';
}
function formatNumber(value, decimals = 0) {
    return value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}
function calculateFederalTax(annualGross, filingStatus = 'single') {
    const stdDeduction = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].standardDeductionsByFiling[filingStatus] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].standardDeduction;
    const brackets = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].bracketsByFiling[filingStatus] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].brackets;
    const taxableIncome = Math.max(0, annualGross - stdDeduction);
    if (taxableIncome <= 0) return 0;
    let tax = 0;
    let remaining = taxableIncome;
    for (const bracket of brackets){
        if (remaining <= 0) break;
        const bracketWidth = bracket.max === null ? remaining : bracket.max - bracket.min;
        const taxableInBracket = Math.min(remaining, bracketWidth);
        tax += taxableInBracket * bracket.rate;
        remaining -= taxableInBracket;
    }
    return tax;
}
function calculateFederalTaxEstimate(annualGross) {
    // Simple effective rate estimate for quick display
    const taxableIncome = Math.max(0, annualGross - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].standardDeduction);
    return taxableIncome * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].estimateBaseline;
}
function calculateFICA(annualGross, filingStatus = 'single') {
    // Social Security: 6.2% up to wage cap
    const ssWages = Math.min(annualGross, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FICA_2026"].socialSecurityWageCap);
    const socialSecurity = ssWages * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FICA_2026"].socialSecurityRate;
    // Medicare: 1.45% on all wages + 0.9% additional above threshold
    // Married filing jointly has a higher threshold ($250K vs $200K)
    const medicare = annualGross * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FICA_2026"].medicareRate;
    const threshold = filingStatus === 'married' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FICA_2026"].additionalMedicareThresholdMFJ : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FICA_2026"].additionalMedicareThreshold;
    const additionalMedicare = annualGross > threshold ? (annualGross - threshold) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FICA_2026"].additionalMedicareRate : 0;
    return {
        socialSecurity,
        medicare,
        additionalMedicare,
        total: socialSecurity + medicare + additionalMedicare
    };
}
// ─── Progressive State Tax Calculation ───────────────────────────────────────
function calculateProgressiveStateTax(annualGross, brackets, standardDeduction, personalExemption = 0) {
    const taxableIncome = Math.max(0, annualGross - standardDeduction - personalExemption);
    if (taxableIncome <= 0) return 0;
    let tax = 0;
    let remaining = taxableIncome;
    for (const bracket of brackets){
        if (remaining <= 0) break;
        const bracketWidth = bracket.max === null ? remaining : bracket.max - bracket.min;
        const taxableInBracket = Math.min(remaining, bracketWidth);
        tax += taxableInBracket * bracket.rate;
        remaining -= taxableInBracket;
    }
    return tax;
}
function calculateStateTax(annualGross, stateKey, filingStatus = 'single') {
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATE_PROFILES"][stateKey];
    if (!state || !state.hasIncomeTax) return 0;
    if (state.incomeTaxType === 'flat') {
        // Flat rate states: subtract standard deduction and personal exemption before applying flat rate
        const stdDeduction = state.standardDeductionsByFiling?.[filingStatus] ?? state.standardDeduction;
        const exemption = state.personalExemptionsByFiling?.[filingStatus] ?? state.personalExemption;
        const taxableIncome = Math.max(0, annualGross - stdDeduction - exemption);
        return taxableIncome * state.incomeTaxRate;
    }
    if (state.incomeTaxType === 'progressive' && state.brackets) {
        const stdDeduction = state.standardDeductionsByFiling?.[filingStatus] ?? state.standardDeduction;
        const exemption = state.personalExemptionsByFiling?.[filingStatus] ?? state.personalExemption;
        return calculateProgressiveStateTax(annualGross, state.brackets, stdDeduction, exemption);
    }
    if (state.incomeTaxType === 'none') {
        return 0;
    }
    return 0;
}
function calculateNYCTax(annualGross, filingStatus = 'single') {
    const brackets = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NYC_TAX_2026"].brackets[filingStatus] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NYC_TAX_2026"].brackets.single;
    // NYC tax is on NYS taxable income (after NYS standard deduction)
    // For simplicity, we apply on gross - NYS standard deduction
    const nysDeduction = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATE_PROFILES"].newyork?.standardDeductionsByFiling?.[filingStatus] ?? 8100;
    const taxableIncome = Math.max(0, annualGross - nysDeduction);
    if (taxableIncome <= 0) return 0;
    let tax = 0;
    let remaining = taxableIncome;
    for (const bracket of brackets){
        if (remaining <= 0) break;
        const bracketWidth = bracket.max === null ? remaining : bracket.max - bracket.min;
        const taxableInBracket = Math.min(remaining, bracketWidth);
        tax += taxableInBracket * bracket.rate;
        remaining -= taxableInBracket;
    }
    return tax;
}
function getPeriodsPerYear(frequency) {
    switch(frequency){
        case 'annual':
            return 1;
        case 'monthly':
            return 12;
        case 'biweekly':
            return 26;
        case 'weekly':
            return 52;
        case 'hourly':
            return 2080;
    }
}
function calculatePaycheck(input) {
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
    const federalTax = calculateFederalTax(adjustedGrossForFederal, input.filingStatus);
    // FICA on full gross (401k doesn't reduce FICA for employees, HSA does not either)
    const fica = calculateFICA(grossAnnual, input.filingStatus);
    // State tax
    const stateKey = input.stateKey || 'illinois';
    const stateProfile = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATE_PROFILES"][stateKey] || null;
    let stateTax = 0;
    if (stateProfile?.hasIncomeTax) {
        if (stateProfile.incomeTaxType === 'flat') {
            // Flat rate states: subtract pre-tax deductions, standard deduction, AND personal exemption
            const stdDeduction = stateProfile.standardDeductionsByFiling?.[input.filingStatus] ?? stateProfile.standardDeduction;
            const exemption = stateProfile.personalExemptionsByFiling?.[input.filingStatus] ?? stateProfile.personalExemption;
            const stateTaxableIncome = Math.max(0, grossAnnual - pretaxDeductions - stdDeduction - exemption);
            stateTax = stateTaxableIncome * stateProfile.incomeTaxRate;
        } else if (stateProfile.incomeTaxType === 'progressive' && stateProfile.brackets) {
            // For progressive states: subtract pre-tax deductions, standard deduction, AND personal exemption
            const stdDeduction = stateProfile.standardDeductionsByFiling?.[input.filingStatus] ?? stateProfile.standardDeduction;
            const exemption = stateProfile.personalExemptionsByFiling?.[input.filingStatus] ?? stateProfile.personalExemption;
            stateTax = calculateProgressiveStateTax(grossAnnual - pretaxDeductions, stateProfile.brackets, stdDeduction, exemption);
        }
    }
    // NYC city tax (if NY state and NYC resident)
    let nycTax = 0;
    if (stateKey === 'newyork' && input.nycResident) {
        nycTax = calculateNYCTax(grossAnnual - pretaxDeductions, input.filingStatus);
    }
    const totalDeductions = federalTax + fica.total + stateTax + nycTax + pretaxDeductions;
    const netAnnual = grossAnnual - totalDeductions;
    const perPeriodDivisor = input.payFrequency === 'hourly' ? 1 : periodsPerYear;
    return {
        grossAnnual,
        grossPerPeriod: input.payFrequency === 'hourly' ? grossAnnual / 2080 : grossAnnual / periodsPerYear,
        federalTax,
        federalTaxPerPeriod: federalTax / periodsPerYear,
        ficaTotal: fica.total,
        ficaPerPeriod: fica.total / periodsPerYear,
        ficaSocialSecurity: fica.socialSecurity,
        ficaMedicare: fica.medicare,
        ficaAdditionalMedicare: fica.additionalMedicare,
        stateTax,
        stateTaxPerPeriod: stateTax / periodsPerYear,
        nycTax,
        nycTaxPerPeriod: nycTax / periodsPerYear,
        retirement401k: input.retirement401k,
        retirement401kPerPeriod: input.retirement401k / periodsPerYear,
        hsaContribution: input.hsaContribution,
        hsaPerPeriod: input.hsaContribution / periodsPerYear,
        totalDeductions,
        totalDeductionsPerPeriod: totalDeductions / periodsPerYear,
        netAnnual,
        netPerPeriod: input.payFrequency === 'hourly' ? netAnnual / 2080 : netAnnual / periodsPerYear,
        effectiveTaxRate: grossAnnual > 0 ? (federalTax + fica.total + stateTax + nycTax) / grossAnnual : 0,
        marginalTaxRate: getMarginalRate(adjustedGrossForFederal, input.filingStatus),
        periodsPerYear,
        stateProfile
    };
}
function getMarginalRate(taxableIncome, filingStatus = 'single') {
    const brackets = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].bracketsByFiling[filingStatus] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].brackets;
    for(let i = brackets.length - 1; i >= 0; i--){
        const bracket = brackets[i];
        if (taxableIncome >= bracket.min) {
            return bracket.rate;
        }
    }
    return 0;
}
function calculateRelocation(sourceSalary, sourceStateKey, targetStateKey, filingStatus = 'single') {
    // Calculate source net
    const sourceResult = calculatePaycheck({
        annualSalary: sourceSalary,
        payFrequency: 'annual',
        hoursPerWeek: 40,
        retirement401k: 0,
        hsaContribution: 0,
        stateKey: sourceStateKey,
        filingStatus
    });
    // Binary search for equivalent salary in target state
    let low = 0;
    let high = sourceSalary * 3;
    let equivalentSalary = sourceSalary;
    for(let i = 0; i < 50; i++){
        const mid = (low + high) / 2;
        const targetResult = calculatePaycheck({
            annualSalary: mid,
            payFrequency: 'annual',
            hoursPerWeek: 40,
            retirement401k: 0,
            hsaContribution: 0,
            stateKey: targetStateKey,
            filingStatus
        });
        if (targetResult.netAnnual < sourceResult.netAnnual) {
            low = mid;
        } else {
            high = mid;
        }
        equivalentSalary = mid;
    }
    const targetResult = calculatePaycheck({
        annualSalary: equivalentSalary,
        payFrequency: 'annual',
        hoursPerWeek: 40,
        retirement401k: 0,
        hsaContribution: 0,
        stateKey: targetStateKey,
        filingStatus
    });
    return {
        sourceState: sourceResult.stateProfile?.name ?? sourceStateKey,
        targetState: targetResult.stateProfile?.name ?? targetStateKey,
        sourceSalary,
        sourceNet: roundCurrency(sourceResult.netAnnual),
        equivalentSalary: roundCurrency(equivalentSalary),
        equivalentNet: roundCurrency(targetResult.netAnnual),
        salaryDifference: roundCurrency(equivalentSalary - sourceSalary),
        percentDifference: sourceSalary > 0 ? roundCurrency((equivalentSalary - sourceSalary) / sourceSalary) : 0,
        sourceStateTax: roundCurrency(sourceResult.stateTax),
        targetStateTax: roundCurrency(targetResult.stateTax),
        taxSavings: roundCurrency(sourceResult.stateTax - targetResult.stateTax)
    };
}
function calculateRetirementProjection(annualSalary, annual401k, employerMatchPercent = 0.03, annualReturnRate = 0.07, years = 30) {
    const employerMatch = Math.min(annualSalary * employerMatchPercent, annual401k * 0.5 // typical 50% match up to 6%
    );
    const annualContribution = annual401k + employerMatch;
    const yearsArr = [];
    const balanceArr = [];
    const contributionsArr = [];
    const growthArr = [];
    let balance = 0;
    let totalContributed = 0;
    for(let year = 1; year <= years; year++){
        const growth = balance * annualReturnRate;
        balance = balance + annualContribution + growth;
        totalContributed += annualContribution;
        yearsArr.push(year);
        balanceArr.push(roundCurrency(balance));
        contributionsArr.push(roundCurrency(totalContributed));
        growthArr.push(roundCurrency(balance - totalContributed));
    }
    return {
        years: yearsArr,
        balance: balanceArr,
        totalContributions: contributionsArr,
        totalGrowth: growthArr,
        finalBalance: roundCurrency(balance),
        totalContributed: roundCurrency(totalContributed),
        totalGrowthAmount: roundCurrency(balance - totalContributed)
    };
}
function calculateMortgage(input) {
    const loanAmount = input.homePrice - input.downPayment;
    const monthlyRate = input.interestRate / 100 / 12;
    const totalPayments = input.loanTerm * 12;
    // Standard fixed-rate amortization: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyPayment;
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
    const amortizationSchedule = [];
    let balance = loanAmount;
    let cumulativeInterest = 0;
    let balanceWithExtra = loanAmount;
    let cumulativeInterestWithExtra = 0;
    let payoffMonth = 0;
    for(let month = 1; month <= totalPayments; month++){
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
            cumulativeInterest
        });
        // Extra payment schedule
        if (balanceWithExtra > 0) {
            const interestExtra = balanceWithExtra * monthlyRate;
            const principalExtra = Math.min(monthlyPaymentWithExtra - interestExtra, balanceWithExtra);
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
        amortizationSchedule
    };
}
function calculateTexasCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 45000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateFloridaCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 48000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateWashingtonCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 48000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateCaliforniaCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 55000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateNewYorkCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 52000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateTennesseeCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 42000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averageHomeValue
    };
}
function serializeToHash(params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value])=>{
        if (value !== undefined && value !== null && value !== '') {
            searchParams.set(key, String(value));
        }
    });
    return searchParams.toString();
}
function parseHashParams() {
    const hash = window.location.hash;
    const params = {};
    if (!hash || hash === '#') return params;
    const queryString = hash.startsWith('#') ? hash.substring(1) : hash;
    const [_, query] = queryString.split('?');
    if (!query) return params;
    const searchParams = new URLSearchParams(query);
    searchParams.forEach((value, key)=>{
        params[key] = value;
    });
    return params;
}
function getPageFromHash() {
    const hash = window.location.hash;
    if (!hash || hash === '#' || hash === '#/') return 'home';
    const page = hash.replace('#', '').split('?')[0];
    return page || 'home';
}
function updateHash(page, params) {
    const query = serializeToHash(params);
    const newHash = query ? `#${page}?${query}` : `#${page}`;
    if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash);
    }
}
}),
"[project]/src/lib/salary-calculations.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SALARY_AMOUNTS",
    ()=>SALARY_AMOUNTS,
    "SALARY_GROUPS",
    ()=>SALARY_GROUPS,
    "STATE_KEYS",
    ()=>STATE_KEYS,
    "STATE_LABELS",
    ()=>STATE_LABELS,
    "calculateSalaryTakeHome",
    ()=>calculateSalaryTakeHome,
    "fmt",
    ()=>fmt,
    "fmtFull",
    ()=>fmtFull,
    "formatSalary",
    ()=>formatSalary,
    "formatSalaryCompact",
    ()=>formatSalaryCompact,
    "generateFAQs",
    ()=>generateFAQs,
    "getGroupedSalaries",
    ()=>getGroupedSalaries,
    "isLegacySalarySlug",
    ()=>isLegacySalarySlug,
    "isValidSalaryAmount",
    ()=>isValidSalaryAmount,
    "salaryToLegacySlug",
    ()=>salaryToLegacySlug,
    "salaryToSlug",
    ()=>salaryToSlug,
    "slugToSalary",
    ()=>slugToSalary
]);
/**
 * Salary After Tax Calculation Utilities
 * Generates take-home pay data for programmatic SEO salary pages.
 * Uses the project's existing tax-config.ts brackets and finance-utils.ts functions.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/finance-utils.ts [app-rsc] (ecmascript)");
;
const SALARY_AMOUNTS = [
    30000,
    35000,
    40000,
    45000,
    50000,
    55000,
    60000,
    65000,
    70000,
    75000,
    80000,
    85000,
    90000,
    95000,
    100000,
    110000,
    120000,
    130000,
    140000,
    150000,
    175000,
    200000,
    250000,
    300000,
    400000,
    500000
];
const STATE_KEYS = [
    // No-income-tax states (best take-home)
    'texas',
    'florida',
    'washington',
    'nevada',
    'alaska',
    'southdakota',
    'wyoming',
    'tennessee',
    'newhampshire',
    // Flat-tax states
    'illinois',
    'pennsylvania',
    'colorado',
    'michigan',
    'northcarolina',
    'indiana',
    'kentucky',
    'arizona',
    'utah',
    'idaho',
    'mississippi',
    // Progressive-tax states
    'california',
    'newyork',
    'georgia',
    'virginia',
    'ohio',
    'newjersey',
    'minnesota',
    'oregon',
    'maryland',
    'connecticut',
    'hawaii',
    'massachusetts',
    'arkansas',
    'alabama',
    'kansas',
    'louisiana',
    'iowa',
    'montana',
    'nebraska',
    'maine',
    'missouri',
    'oklahoma',
    'delaware',
    'northdakota',
    'newmexico',
    'southcarolina',
    'rhodeisland',
    'westvirginia',
    'wisconsin',
    'vermont'
];
const STATE_LABELS = {
    alabama: {
        name: 'Alabama',
        abbr: 'AL'
    },
    alaska: {
        name: 'Alaska',
        abbr: 'AK'
    },
    arizona: {
        name: 'Arizona',
        abbr: 'AZ'
    },
    arkansas: {
        name: 'Arkansas',
        abbr: 'AR'
    },
    california: {
        name: 'California',
        abbr: 'CA'
    },
    colorado: {
        name: 'Colorado',
        abbr: 'CO'
    },
    connecticut: {
        name: 'Connecticut',
        abbr: 'CT'
    },
    delaware: {
        name: 'Delaware',
        abbr: 'DE'
    },
    florida: {
        name: 'Florida',
        abbr: 'FL'
    },
    georgia: {
        name: 'Georgia',
        abbr: 'GA'
    },
    hawaii: {
        name: 'Hawaii',
        abbr: 'HI'
    },
    idaho: {
        name: 'Idaho',
        abbr: 'ID'
    },
    illinois: {
        name: 'Illinois',
        abbr: 'IL'
    },
    indiana: {
        name: 'Indiana',
        abbr: 'IN'
    },
    iowa: {
        name: 'Iowa',
        abbr: 'IA'
    },
    kansas: {
        name: 'Kansas',
        abbr: 'KS'
    },
    kentucky: {
        name: 'Kentucky',
        abbr: 'KY'
    },
    louisiana: {
        name: 'Louisiana',
        abbr: 'LA'
    },
    maine: {
        name: 'Maine',
        abbr: 'ME'
    },
    maryland: {
        name: 'Maryland',
        abbr: 'MD'
    },
    massachusetts: {
        name: 'Massachusetts',
        abbr: 'MA'
    },
    michigan: {
        name: 'Michigan',
        abbr: 'MI'
    },
    minnesota: {
        name: 'Minnesota',
        abbr: 'MN'
    },
    mississippi: {
        name: 'Mississippi',
        abbr: 'MS'
    },
    missouri: {
        name: 'Missouri',
        abbr: 'MO'
    },
    montana: {
        name: 'Montana',
        abbr: 'MT'
    },
    nebraska: {
        name: 'Nebraska',
        abbr: 'NE'
    },
    nevada: {
        name: 'Nevada',
        abbr: 'NV'
    },
    newhampshire: {
        name: 'New Hampshire',
        abbr: 'NH'
    },
    newjersey: {
        name: 'New Jersey',
        abbr: 'NJ'
    },
    newmexico: {
        name: 'New Mexico',
        abbr: 'NM'
    },
    newyork: {
        name: 'New York',
        abbr: 'NY'
    },
    northcarolina: {
        name: 'North Carolina',
        abbr: 'NC'
    },
    northdakota: {
        name: 'North Dakota',
        abbr: 'ND'
    },
    ohio: {
        name: 'Ohio',
        abbr: 'OH'
    },
    oklahoma: {
        name: 'Oklahoma',
        abbr: 'OK'
    },
    oregon: {
        name: 'Oregon',
        abbr: 'OR'
    },
    pennsylvania: {
        name: 'Pennsylvania',
        abbr: 'PA'
    },
    rhodeisland: {
        name: 'Rhode Island',
        abbr: 'RI'
    },
    southcarolina: {
        name: 'South Carolina',
        abbr: 'SC'
    },
    southdakota: {
        name: 'South Dakota',
        abbr: 'SD'
    },
    tennessee: {
        name: 'Tennessee',
        abbr: 'TN'
    },
    texas: {
        name: 'Texas',
        abbr: 'TX'
    },
    utah: {
        name: 'Utah',
        abbr: 'UT'
    },
    vermont: {
        name: 'Vermont',
        abbr: 'VT'
    },
    virginia: {
        name: 'Virginia',
        abbr: 'VA'
    },
    washington: {
        name: 'Washington',
        abbr: 'WA'
    },
    westvirginia: {
        name: 'West Virginia',
        abbr: 'WV'
    },
    wisconsin: {
        name: 'Wisconsin',
        abbr: 'WI'
    },
    wyoming: {
        name: 'Wyoming',
        abbr: 'WY'
    }
};
function formatSalary(amount) {
    return `$${amount.toLocaleString('en-US')}`;
}
function formatSalaryCompact(amount) {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${amount / 1000}K`;
    return `$${amount}`;
}
function fmt(amount) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}
function fmtFull(amount) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function calculateSalaryTakeHome(salary, filingStatus = 'single', nycResident = false) {
    const federalTax = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateFederalTax"])(salary, filingStatus);
    const fica = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateFICA"])(salary, filingStatus);
    const states = STATE_KEYS.map((stateKey)=>{
        const stateTax = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateStateTax"])(salary, stateKey, filingStatus);
        // NYC tax only applies to New York State residents who live in NYC
        const nycTax = stateKey === 'newyork' && nycResident ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateNYCTax"])(salary, filingStatus) : 0;
        const totalDeductions = federalTax + fica.total + stateTax + nycTax;
        const netAnnual = salary - totalDeductions;
        const effectiveTaxRate = salary > 0 ? totalDeductions / salary : 0;
        return {
            stateKey,
            stateName: STATE_LABELS[stateKey]?.name ?? stateKey,
            stateAbbr: STATE_LABELS[stateKey]?.abbr ?? stateKey.toUpperCase().slice(0, 2),
            grossAnnual: salary,
            federalTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(federalTax),
            ficaTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(fica.total),
            ficaSS: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(fica.socialSecurity),
            ficaMedicare: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(fica.medicare + fica.additionalMedicare),
            stateTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(stateTax),
            nycTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(nycTax),
            totalDeductions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(totalDeductions),
            netAnnual: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(netAnnual),
            effectiveTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(effectiveTaxRate * 100) / 100,
            netMonthly: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(netAnnual / 12),
            netBiweekly: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(netAnnual / 26),
            netWeekly: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(netAnnual / 52)
        };
    });
    // Sort by net annual (highest first)
    const sorted = [
        ...states
    ].sort((a, b)=>b.netAnnual - a.netAnnual);
    return {
        salary,
        salaryFormatted: formatSalary(salary),
        salaryCompact: formatSalaryCompact(salary),
        states,
        highestNet: sorted[0],
        lowestNet: sorted[sorted.length - 1]
    };
}
const SALARY_GROUPS = [
    {
        label: '$30K – $50K',
        range: 'Entry Level',
        min: 30000,
        max: 50000,
        amounts: []
    },
    {
        label: '$50K – $75K',
        range: 'Mid Level',
        min: 50000,
        max: 75000,
        amounts: []
    },
    {
        label: '$75K – $100K',
        range: 'Upper Mid',
        min: 75000,
        max: 100000,
        amounts: []
    },
    {
        label: '$100K – $150K',
        range: 'Senior Level',
        min: 100000,
        max: 150000,
        amounts: []
    },
    {
        label: '$150K – $200K',
        range: 'Executive',
        min: 150000,
        max: 200000,
        amounts: []
    },
    {
        label: '$200K+',
        range: 'Top Earners',
        min: 200000,
        max: Infinity,
        amounts: []
    }
];
function getGroupedSalaries() {
    return SALARY_GROUPS.map((group)=>({
            ...group,
            amounts: SALARY_AMOUNTS.filter((s)=>s >= group.min && s <= group.max)
        })).filter((group)=>group.amounts.length > 0);
}
function generateFAQs(salary, filingStatus = 'single') {
    const formatted = formatSalary(salary);
    const calc = calculateSalaryTakeHome(salary, filingStatus);
    const txNet = calc.states.find((s)=>s.stateKey === 'texas').netAnnual;
    const caNet = calc.states.find((s)=>s.stateKey === 'california').netAnnual;
    const faqs = [
        {
            question: `How much is ${formatted} after tax in Texas?`,
            answer: `On a ${formatted} salary in Texas, your take-home pay is approximately ${fmt(txNet)} per year after federal tax and FICA deductions. Texas has no state income tax, so you keep more of your earnings compared to most states.`
        },
        {
            question: `How much is ${formatted} after tax in California?`,
            answer: `On a ${formatted} salary in California, your take-home pay is approximately ${fmt(caNet)} per year after federal tax, FICA, and California state income tax. California has progressive tax brackets from 1% to 13.3%.`
        },
        {
            question: `Is ${formatted} a good salary?`,
            answer: getGoodSalaryAnswer(salary)
        }
    ];
    // FAQ 4: Monthly/biweekly breakdown (always useful)
    const txMonthly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(txNet / 12);
    const caMonthly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(caNet / 12);
    faqs.push({
        question: `How much is ${formatted} monthly after taxes?`,
        answer: `On a ${formatted} salary, your monthly take-home pay is approximately ${fmt(txMonthly)} in Texas (no state tax) and ${fmt(caMonthly)} in California. In Texas, your bi-weekly paycheck would be about ${fmt((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roundCurrency"])(txNet / 26))}. These numbers assume single filing status with the standard deduction and no pre-tax contributions like 401(k) or HSA.`
    });
    // FAQ 5: Varies by salary level
    if (salary <= 50000) {
        faqs.push({
            question: `Can I live comfortably on ${formatted} a year?`,
            answer: `Living comfortably on ${formatted} depends on your location and lifestyle. In low-cost states like Texas or Florida, ${formatted} can provide a modest but manageable lifestyle. In high-cost areas like California or New York, it may be tight. Consider housing costs, which are typically your biggest expense — aim to keep rent under 30% of your take-home pay of about ${fmt(txNet)}/year.`
        });
    } else if (salary <= 100000) {
        faqs.push({
            question: `What is the hourly rate for ${formatted} a year?`,
            answer: `A ${formatted} annual salary equals approximately $${(salary / 2080).toFixed(2)} per hour (based on 2,080 working hours per year). Your effective hourly take-home pay after taxes ranges from about $${(calc.lowestNet.netAnnual / 2080).toFixed(2)} (in ${calc.lowestNet.stateName}) to $${(calc.highestNet.netAnnual / 2080).toFixed(2)} (in ${calc.highestNet.stateName}).`
        });
    } else if (salary <= 200000) {
        faqs.push({
            question: `What tax bracket is ${formatted} in?`,
            answer: `A ${formatted} salary for a single filer falls in the ${getFederalBracketLabel(salary)} federal tax bracket. However, your effective (average) tax rate is lower because of progressive brackets — only income above each threshold is taxed at the higher rate. Your effective federal tax rate on ${formatted} is approximately ${(calc.states[0].federalTax / salary * 100).toFixed(1)}%.`
        });
    } else {
        faqs.push({
            question: `How much additional Medicare tax do you pay on ${formatted}?`,
            answer: `On a ${formatted} salary, you pay the standard 1.45% Medicare tax on all wages, plus an additional 0.9% Medicare tax on earnings above $200,000. This means your additional Medicare surtax is approximately ${fmt(Math.max(0, salary - 200000) * 0.009)}. High earners should also be aware of the Net Investment Income Tax (NIIT) of 3.8% on investment income.`
        });
    }
    return faqs;
}
function getGoodSalaryAnswer(salary) {
    if (salary <= 40000) {
        return `A ${formatSalary(salary)} salary is below the U.S. median household income. It may be sufficient for a single person in a low-cost area, but could be challenging in major metropolitan regions. Focus on keeping housing costs low and building an emergency fund.`;
    }
    if (salary <= 60000) {
        return `A ${formatSalary(salary)} salary is close to the U.S. median individual income. It's a solid salary for a single person in most areas, though it may feel tight in high-cost cities like San Francisco or New York. You can live comfortably in states with no income tax like Texas or Florida.`;
    }
    if (salary <= 80000) {
        return `A ${formatSalary(salary)} salary is above the U.S. median individual income and considered good in most areas. You can live comfortably as a single person and support a modest family lifestyle in lower-cost regions. In Texas or Florida, your take-home pay would be significantly higher due to zero state income tax.`;
    }
    if (salary <= 120000) {
        return `A ${formatSalary(salary)} salary is well above the U.S. median and is considered a strong income in most markets. You can afford a comfortable lifestyle in most cities, though high-cost areas like the SF Bay Area or Manhattan may still feel expensive. Consider maximizing your 401(k) contributions to lower your taxable income.`;
    }
    if (salary <= 200000) {
        return `A ${formatSalary(salary)} salary puts you in the top 10-15% of U.S. earners. This is an excellent income that allows for comfortable living, homeownership, and significant savings in most markets. In high-tax states like California or New York, you'll feel the impact of progressive tax brackets — consider tax-advantaged accounts to optimize your take-home pay.`;
    }
    return `A ${formatSalary(salary)} salary places you among the top earners in the U.S. At this income level, tax optimization becomes crucial — the difference between living in a no-tax state (TX/FL) vs. a high-tax state (CA/NY) can mean tens of thousands of dollars annually. Consider working with a tax advisor to maximize deductions and plan for alternative minimum tax implications.`;
}
function getFederalBracketLabel(salary) {
    const taxableIncome = salary - 16100; // 2026 Single standard deduction
    if (taxableIncome <= 12400) return '10%';
    if (taxableIncome <= 50400) return '12%';
    if (taxableIncome <= 105700) return '22%';
    if (taxableIncome <= 201775) return '24%';
    if (taxableIncome <= 256225) return '32%';
    if (taxableIncome <= 640600) return '35%';
    return '37%';
}
function salaryToSlug(amount) {
    return `${amount}-after-taxes`;
}
function salaryToLegacySlug(amount) {
    return String(amount);
}
function slugToSalary(slug) {
    // Handle both new pattern "85000-after-taxes" and legacy pattern "85000"
    const match = slug.match(/^(\d+)/);
    if (!match) return null;
    const num = parseInt(match[1], 10);
    if (isNaN(num) || num <= 0) return null;
    return num;
}
function isLegacySalarySlug(slug) {
    // Returns true if the slug is the old pattern (just a number, no "-after-taxes")
    return /^\d+$/.test(slug);
}
function isValidSalaryAmount(amount) {
    return SALARY_AMOUNTS.includes(amount);
}
}),
"[project]/src/lib/blog-index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOG_INDEX",
    ()=>BLOG_INDEX,
    "getPostMeta",
    ()=>getPostMeta,
    "getPublishedPostsMeta",
    ()=>getPublishedPostsMeta,
    "getPublishedSlugs",
    ()=>getPublishedSlugs,
    "metaToPost",
    ()=>metaToPost
]);
const BLOG_INDEX = [
    {
        "id": "what-is-taxable-income-guide-2026",
        "title": "What Is Taxable Income? Complete Guide (2026)",
        "slug": "what-is-taxable-income-guide-2026",
        "excerpt": "What do you get taxed on? Complete guide to taxable and tax-exempt income in 2026. 20 types of taxable income, 20 types of tax-free income, and 12 types of taxes.",
        "category": "tax-guide",
        "tags": "what,is,taxable,income,guide,2026,taxable income,tax exempt,what do you get taxed on,types of taxes,hourly wage after tax",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "What Is Taxable Income? Complete Guide (2026)",
        "metaDesc": "What do you get taxed on? 20 types of taxable income, 20 tax-free types, and 12 types of taxes explained.",
        "createdAt": "2026-06-21T15:00:00.000Z",
        "updatedAt": "2026-06-21T15:00:00.000Z"
    },
    {
        "id": "hourly-wage-after-tax-questions-2026",
        "title": "Hourly Wage After Tax Questions Answered (2026 Calculator)",
        "slug": "hourly-wage-after-tax-questions-2026",
        "excerpt": "How much tax is taken out of a $300 paycheck? How much is $20/hour after taxes? $21/hour annually? $1200/week? Exact numbers for common wages with free calculator.",
        "category": "tax-guide",
        "tags": "hourly,wage,after,tax,questions,2026,taxable income,tax exempt,what do you get taxed on,types of taxes,hourly wage after tax",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Hourly Wage After Tax Questions Answered (2026)",
        "metaDesc": "How much tax on $300 paycheck, $20/hour, $21/hour, $1200/week? Exact after-tax numbers for 2026. Free calculator, no signup. CPA-reviewed.",
        "createdAt": "2026-06-21T15:00:00.000Z",
        "updatedAt": "2026-06-21T15:00:00.000Z"
    },
    {
        "id": "free-tax-calculator-no-signup-2026",
        "title": "Free Tax Calculator 2026 — No Signup, No Email, Instant Results",
        "slug": "free-tax-calculator-no-signup-2026",
        "excerpt": "Free 2026 tax calculator with no signup, no email, no paywall. Calculate take-home pay, tax refund, self-employment tax, and more. CPA-reviewed accuracy.",
        "category": "tax-guide",
        "tags": "free,tax,calculator,no,signup,2026,free tax calculator,no signup,tax calculator 2026,take home pay,how much tax do i owe",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Free Tax Calculator 2026 — No Signup, No Email",
        "metaDesc": "Free 2026 tax calculator. No signup, no email, no paywall. Calculate take-home pay, refund, SE tax, capital gains, bonuses, and more. CPA-reviewed.",
        "createdAt": "2026-06-21T14:00:00.000Z",
        "updatedAt": "2026-06-21T14:00:00.000Z"
    },
    {
        "id": "take-home-pay-calculator-guide-2026",
        "title": "Take Home Pay Calculator 2026: How Much You Actually Keep",
        "slug": "take-home-pay-calculator-guide-2026",
        "excerpt": "Complete take-home pay guide for 2026. Calculate your net pay after federal, FICA, and state taxes. Real examples for every state. Free calculator, no signup.",
        "category": "tax-guide",
        "tags": "take,home,pay,calculator,guide,2026,free tax calculator,no signup,tax calculator 2026,take home pay,how much tax do i owe",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Take Home Pay Calculator 2026: How Much You Keep",
        "metaDesc": "Calculate your 2026 take-home pay after all taxes. Real examples for $50K-$200K salaries in all 50 states. Free calculator, no signup required.",
        "createdAt": "2026-06-21T14:00:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "how-much-tax-will-i-owe-2026",
        "title": "How Much Tax Will I Owe in 2026? Complete Calculator & Guide",
        "slug": "how-much-tax-will-i-owe-2026",
        "excerpt": "How much tax will you owe on $50K, $75K, $100K? Complete guide with free calculator. Federal tax, FICA, state tax breakdown. No signup required.",
        "category": "tax-guide",
        "tags": "how,much,tax,will,i,owe,2026,free tax calculator,no signup,tax calculator 2026,take home pay,how much tax do i owe",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "How Much Tax Will I Owe in 2026? Calculator & Guide",
        "metaDesc": "How much tax will I owe on $50K, $75K, $100K? Free 2026 tax calculator with federal, FICA, and state tax breakdown. No signup, no email required.",
        "createdAt": "2026-06-21T14:00:00.000Z",
        "updatedAt": "2026-06-21T14:00:00.000Z"
    },
    {
        "id": "tax-questions-answered-2026",
        "title": "Tax Questions Answered: Brackets, Overtime & Bonuses (2026)",
        "slug": "tax-questions-answered-2026",
        "excerpt": "Complete FAQ guide to common tax questions for 2026. Overtime taxes, bonus taxes, tax brackets, state comparisons, and property tax deductions.",
        "category": "tax-guide",
        "tags": "tax,questions,answered,2026,tax questions,tax faq,2026 tax rules,tax faq 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Tax Questions Answered: Brackets, Overtime & Bonuses (2026)",
        "metaDesc": "Common tax questions answered for 2026. Overtime, bonuses, brackets, Florida vs other states, property tax deductions, and 1099 quarterly taxes.",
        "createdAt": "2026-06-21T13:00:00.000Z",
        "updatedAt": "2026-06-21T13:00:00.000Z"
    },
    {
        "id": "tax-refund-questions-2026",
        "title": "Tax Refund Questions Answered (2026)",
        "slug": "tax-refund-questions-2026",
        "excerpt": "Complete FAQ guide to tax refunds in 2026. When you'll get your refund, how to track it, what can delay it, and how to get it faster.",
        "category": "tax-guide",
        "tags": "tax,refund,questions,2026,tax questions,tax faq,2026 tax rules,tax faq 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Tax Refund Questions Answered (2026)",
        "metaDesc": "Common tax refund questions answered for 2026. Refund timeline, tracking, delays, garnishment, credits vs deductions, and faster refunds.",
        "createdAt": "2026-06-21T13:00:00.000Z",
        "updatedAt": "2026-06-21T13:00:00.000Z"
    },
    {
        "id": "inheritance-tax-questions-2026",
        "title": "Inheritance Tax Questions Answered (2026 Rules)",
        "slug": "inheritance-tax-questions-2026",
        "excerpt": "Complete FAQ guide to inheritance tax in 2026. How much is inheritance tax, estate vs inheritance tax, state rules, and how to calculate.",
        "category": "tax-guide",
        "tags": "inheritance,tax,questions,2026,tax questions,tax faq,2026 tax rules,tax faq 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Inheritance Tax Questions Answered (2026 Rules)",
        "metaDesc": "Common inheritance tax questions answered for 2026. Estate vs inheritance tax, state rules, exemptions, and calculations. Free calculators.",
        "createdAt": "2026-06-21T13:00:00.000Z",
        "updatedAt": "2026-06-21T13:00:00.000Z"
    },
    {
        "id": "social-security-tax-questions-2026",
        "title": "Social Security Tax Questions Answered (2026 Rules)",
        "slug": "social-security-tax-questions-2026",
        "excerpt": "Complete FAQ guide to Social Security taxation in 2026. Are benefits taxable, how much is taxable, state taxes, and strategies to minimize taxes.",
        "category": "tax-guide",
        "tags": "social,security,tax,questions,2026,tax questions,tax faq,2026 tax rules,tax faq 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Social Security Tax Questions Answered (2026 Rules)",
        "metaDesc": "Common Social Security tax questions answered for 2026. Are benefits taxable, thresholds, state taxes, and strategies to minimize taxes. Free calculators.",
        "createdAt": "2026-06-21T13:00:00.000Z",
        "updatedAt": "2026-06-21T13:00:00.000Z"
    },
    {
        "id": "401k-withdrawal-tax-questions-2026",
        "title": "401(k) Withdrawal Tax Questions Answered (2026 Rules)",
        "slug": "401k-withdrawal-tax-questions-2026",
        "excerpt": "Complete FAQ guide to 401(k) withdrawal taxes in 2026. How taxes work, penalties, Rule of 55, RMDs, and how withdrawals affect Social Security.",
        "category": "tax-guide",
        "tags": "401k,withdrawal,tax,questions,2026,tax questions,tax faq,2026 tax rules,tax faq 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "401(k) Withdrawal Tax Questions Answered (2026 Rules)",
        "metaDesc": "Common 401(k) withdrawal tax questions answered for 2026. Penalties, Rule of 55, RMDs, tax rates, and Social Security interaction. Free calculators.",
        "createdAt": "2026-06-21T13:00:00.000Z",
        "updatedAt": "2026-06-21T13:00:00.000Z"
    },
    {
        "id": "inheritance-tax-guide-2026",
        "title": "Inheritance Tax Guide 2026: State-by-State Rules, Exemptions & Calculator",
        "slug": "inheritance-tax-guide-2026",
        "excerpt": "Complete inheritance tax guide for 2026. Learn the difference between estate tax and inheritance tax, state-by-state rules, federal exemptions, and how to calculate your inheritance tax liability.",
        "category": "tax-guide",
        "tags": "inheritance tax calculator,inheritance tax 2026,estate tax 2026,inheritance tax by state,inheritance tax exemption,inheritance tax rate,federal estate tax exemption 2026,inheritance tax vs estate tax,inheritance tax guide,state inheritance tax",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "Inheritance Tax Guide 2026: State Rules & Exemptions",
        "metaDesc": "Complete 2026 inheritance tax guide. Difference between estate and inheritance tax, state-by-state rules, federal exemptions ($13.",
        "createdAt": "2026-06-21T12:00:00.000Z",
        "updatedAt": "2026-06-21T12:00:00.000Z"
    },
    {
        "id": "401k-withdrawal-tax-guide-2026",
        "title": "401(k) Withdrawal Tax Guide 2026: Rules & Penalties",
        "slug": "401k-withdrawal-tax-guide-2026",
        "excerpt": "Complete guide to 401(k) withdrawal taxes in 2026. Learn early withdrawal penalties, RMD rules, tax implications, 72(t) exceptions, and strategies to minimize taxes on 401(k) withdrawals.",
        "category": "tax-guide",
        "tags": "401k withdrawal tax,401k tax implications,401k early withdrawal penalty,401k withdrawal rules 2026,401k withdrawal tax rate,401k and social security,401k tax strategies,401k rollover,required minimum distribution 2026,72t rule",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "401(k) Withdrawal Tax Guide 2026: Rules & Penalties",
        "metaDesc": "Complete 2026 401(k) withdrawal tax guide. Early withdrawal penalties, RMD rules, tax implications, 72(t) exceptions, and strategies to minimize taxes on.",
        "createdAt": "2026-06-21T12:00:00.000Z",
        "updatedAt": "2026-06-21T12:00:00.000Z"
    },
    {
        "id": "retirement-tax-planning-guide-2026",
        "title": "Retirement Tax Planning Guide 2026: Strategies, Brackets & Withdrawals",
        "slug": "retirement-tax-planning-guide-2026",
        "excerpt": "Complete retirement tax planning guide for 2026. Learn tax strategies for retirees, 401(k) withdrawal rules, Social Security taxation, RMDs, and Roth conversions to minimize your tax burden.",
        "category": "tax-guide",
        "tags": "retirement tax planning,tax strategies for retirees,retirement tax rates,401k withdrawal tax,social security tax 2026,roth conversion,required minimum distribution,tax planning retirement,retiree tax guide 2026,retirement income tax",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "Retirement Tax Planning Guide 2026: Strategies & Tax Rates",
        "metaDesc": "Complete 2026 retirement tax planning guide. Learn tax strategies for retirees, 401(k) withdrawal taxes, Social Security taxation, RMDs, and Roth.",
        "createdAt": "2026-06-21T12:00:00.000Z",
        "updatedAt": "2026-06-21T12:00:00.000Z"
    },
    {
        "id": "1099-tax-guide-self-employed-2026",
        "title": "1099 Taxes: How Much Freelancers Really Owe in 2026",
        "slug": "1099-tax-guide-self-employed-2026",
        "excerpt": "The complete guide to 1099 taxes for self-employed freelancers and contractors in 2026. Learn how to calculate your tax bill, maximize deductions, and avoid penalties.",
        "category": "tax-guide",
        "tags": "1099,self-employed,freelancer,tax calculator,contractor,quarterly taxes,tax deductions",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "1099 Taxes 2026: How Much Freelancers Pay",
        "metaDesc": "Guide to 1099 taxes for self-employed workers in 2026. Calculate your tax bill, find deductions, and learn quarterly payment deadlines.",
        "createdAt": "2026-05-28T12:00:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "cmpmabv3i0000mnivco81phfw",
        "title": "2026 Tax Brackets: IRS Income Tax Brackets 2026 Explained",
        "slug": "2026-federal-tax-brackets-explained",
        "excerpt": "Complete guide to the IRS 2026 tax brackets — income tax brackets 2026, marginal tax rate, federal income tax rates, adjusted gross income, and tax credits for married couples filing jointly.",
        "category": "tax-guide",
        "tags": "federal,tax brackets,2026,income tax,irs 2026 tax brackets,tax brackets 2026,income tax brackets 2026",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "2026 IRS Tax Brackets Explained",
        "metaDesc": "Complete guide to IRS 2026 tax brackets. See income tax brackets 2026 for single filers and married couples filing jointly.",
        "createdAt": "2026-05-26T06:59:34.062Z",
        "updatedAt": "2026-05-26T20:31:33.161Z"
    },
    {
        "id": "doordash-taxes-2026-guide",
        "title": "DoorDash Taxes: The Complete Guide for Drivers in 2026",
        "slug": "doordash-taxes-guide-2026",
        "excerpt": "Everything DoorDash drivers need to know about taxes in 2026 — how much you'll pay, what deductions to claim, and how to avoid surprise tax bills.",
        "category": "tax-guide",
        "tags": "doordash,taxes,gig economy,self-employed,1099,delivery driver,quarterly taxes",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "DoorDash Taxes 2026: Driver Guide",
        "metaDesc": "DoorDash driver taxes for 2026. Self-employment tax, mileage deductions, quarterly payments, and filing tips for gig workers.",
        "createdAt": "2026-05-28T12:00:00.000Z",
        "updatedAt": "2026-05-28T12:00:00.000Z"
    },
    {
        "id": "cmpmabv3p0003mniv5b5v1cu7",
        "title": "Florida vs Texas Tax Comparison",
        "slug": "florida-vs-texas-tax-comparison",
        "excerpt": "A detailed comparison of the tax structures in Florida and Texas — two of the most popular no-income-tax states for relocation.",
        "category": "comparison",
        "tags": "florida,texas,tax comparison,no income tax,relocation",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "Florida vs Texas Tax Comparison 2026",
        "metaDesc": "Compare Florida and Texas tax structures: income tax, property tax, sales tax, and overall burden. Which no-income-tax state is better?",
        "createdAt": "2026-05-26T06:59:34.069Z",
        "updatedAt": "2026-05-26T20:31:33.169Z"
    },
    {
        "id": "cmpmabv3r0004mnivwdb8kqr5",
        "title": "How FICA Taxes Work in 2026",
        "slug": "how-fica-taxes-work-2026",
        "excerpt": "Understanding FICA taxes (Social Security and Medicare) in 2026 — what you pay, what your employer pays, and how self-employment tax differs.",
        "category": "tax-guide",
        "tags": "FICA,social security,medicare,payroll tax,2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "How FICA Taxes Work 2026 — Full Guide",
        "metaDesc": "Complete guide to FICA taxes in 2026. Social Security and Medicare withholding, wage bases, and self-employment tax rules.",
        "createdAt": "2026-05-26T06:59:34.072Z",
        "updatedAt": "2026-05-26T20:31:33.172Z"
    },
    {
        "id": "cmpmabv3k0001mnivxj3jkk2j",
        "title": "Illinois Income Tax Guide 2026",
        "slug": "illinois-income-tax-guide-2026",
        "excerpt": "Everything you need to know about Illinois income tax in 2026, including the flat tax rate, personal exemptions, and how it compares to neighboring states.",
        "category": "state-tax",
        "tags": "illinois,income tax,flat tax,2026,state tax",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "Illinois Income Tax 2026 — 4.95% Guide",
        "metaDesc": "Complete guide to Illinois income tax for 2026. Flat rate, personal exemptions, property taxes, and neighboring state comparison.",
        "createdAt": "2026-05-26T06:59:34.065Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "sep-ira-solo-401k-2026-guide",
        "title": "SEP IRA vs Solo 401k: Best for Self-Employed in 2026",
        "slug": "sep-ira-solo-401k-guide-2026",
        "excerpt": "Complete comparison of SEP IRA and Solo 401k contribution limits, rules, and tax benefits for self-employed workers in 2026. Find out which retirement plan saves you more.",
        "category": "tax-guide",
        "tags": "sep ira,solo 401k,retirement,self-employed,contribution limits,tax deduction,2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "SEP IRA vs Solo 401k: Comparison 2026",
        "metaDesc": "SEP IRA vs Solo 401k for 2026: contribution limits, tax deductions, eligibility, and which is better for self-employed workers.",
        "createdAt": "2026-05-28T12:00:00.000Z",
        "updatedAt": "2026-05-28T12:00:00.000Z"
    },
    {
        "id": "cmpmabv3n0002mniv8xzlrfmn",
        "title": "Why Texas Has No Income Tax",
        "slug": "why-texas-has-no-income-tax",
        "excerpt": "How Texas funds its government without a personal income tax, and what it means for residents in terms of property taxes and overall tax burden.",
        "category": "state-tax",
        "tags": "texas,no income tax,property tax,state tax,2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Why Texas Has No Income Tax — Full Breakdown",
        "metaDesc": "How Texas funds government without personal income tax, higher property tax trade-offs, and the overall tax burden for residents.",
        "createdAt": "2026-05-26T06:59:34.067Z",
        "updatedAt": "2026-05-26T20:31:33.167Z"
    },
    {
        "id": "sales-tax-by-state-guide-2026",
        "title": "Sales Tax by State: Complete Guide to US Tax Rates in 2026",
        "slug": "sales-tax-by-state-guide-2026",
        "excerpt": "Complete guide to sales tax rates for all 50 US states in 2026. State rates, local rates, combined rates, tax-exempt items, and how to calculate sales tax. Free calculator included.",
        "category": "tax-guide",
        "tags": "sales tax,state sales tax,sales tax rates,sales tax calculator,tax by state,2026",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "Sales Tax by State 2026: Complete Rate Guide",
        "metaDesc": "Complete guide to sales tax rates for all 50 US states in 2026. State rates, local rates, combined rates, and tax-exempt items. Free calculator included.",
        "createdAt": "2026-06-01T12:00:00.000Z",
        "updatedAt": "2026-06-01T12:00:00.000Z"
    },
    {
        "id": "no-tax-on-overtime-guide-2026",
        "title": "No Tax on Overtime: How the New Law Saves You Money (2025–2028)",
        "slug": "no-tax-on-overtime-guide-2026",
        "excerpt": "Complete guide to the No Tax on Overtime law for 2025-2028. Calculate your savings, understand eligibility, and see how FICA and state taxes still apply. Free calculator.",
        "category": "tax-guide",
        "tags": "no tax on overtime,overtime tax exemption,overtime pay,OT tax savings,trump tax law,2026",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "No Tax on Overtime 2025-2028: Complete Guide",
        "metaDesc": "Complete guide to the No Tax on Overtime law for 2025-2028. Calculate your savings, understand eligibility, and see how FICA and state taxes still apply.",
        "createdAt": "2026-06-01T12:00:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "how-bonuses-are-taxed-2026",
        "title": "How Are Bonuses Taxed in 2026? The 22% Flat Rate Explained",
        "slug": "how-bonuses-are-taxed-2026",
        "excerpt": "Complete guide to bonus taxation in 2026. Understand the 22% flat rate vs aggregate method, FICA on bonuses, and state taxes. Free bonus tax calculator.",
        "category": "tax-guide",
        "tags": "bonus tax,supplemental wage tax,22% flat rate,aggregate method,bonus calculator,2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Bonus Tax 2026 | 22% Flat vs Aggregate",
        "metaDesc": "Complete guide to bonus taxation in 2026. Understand the 22% flat rate vs aggregate method, FICA on bonuses, and state taxes. Free bonus tax calculator.",
        "createdAt": "2026-06-01T12:00:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "property-tax-by-state-guide-2026",
        "title": "Property Tax by State: Who Pays the Most (and Least) in 2026",
        "slug": "property-tax-by-state-guide-2026",
        "excerpt": "Complete guide to property tax rates for all 50 US states in 2026. See which states have the highest and lowest property taxes.",
        "category": "tax-guide",
        "tags": "property tax,property tax rates,home tax,real estate tax,tax by state,2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Property Tax by State 2026 | 50 State Rates",
        "metaDesc": "Complete guide to property tax rates for all 50 US states in 2026. See which states have the highest and lowest property taxes.",
        "createdAt": "2026-06-01T12:00:00.000Z",
        "updatedAt": "2026-06-01T12:00:00.000Z"
    },
    {
        "id": "lottery-tax-guide-2026",
        "title": "Lottery Tax: How Much You Really Keep After Winning in 2026",
        "slug": "lottery-tax-guide-2026",
        "excerpt": "Complete guide to lottery taxes in 2026. Federal tax, state tax, lump sum vs annuity, and how much you actually keep. Free lottery tax calculator.",
        "category": "tax-guide",
        "tags": "lottery tax,lottery winnings tax,mega millions tax,powerball tax,gambling tax,2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Lottery Tax 2026 | After-Tax Winnings",
        "metaDesc": "Complete guide to lottery taxes in 2026. Federal tax, state tax, lump sum vs annuity, and how much you actually keep. Free lottery tax calculator.",
        "createdAt": "2026-06-01T12:00:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "irs-withholding-w4-guide-2026",
        "title": "IRS Withholding 2026: How to Fill Out Your W-4 and Avoid Surprises",
        "slug": "irs-withholding-w4-guide-2026",
        "excerpt": "Complete guide to IRS withholding and W-4 form for 2026. Calculate your recommended withholding, optimize your paycheck, and avoid tax surprises. Free calculator.",
        "category": "tax-guide",
        "tags": "irs withholding,w-4 form,federal withholding,paycheck withholding,tax withholding calculator,2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "IRS Withholding & W-4 Guide 2026",
        "metaDesc": "Complete guide to IRS withholding and W-4 form for 2026. Calculate your recommended withholding, optimize your paycheck, and avoid tax surprises.",
        "createdAt": "2026-06-01T12:00:00.000Z",
        "updatedAt": "2026-06-01T12:00:00.000Z"
    },
    {
        "id": "federal-tax-brackets-2026-guide",
        "title": "2026 Federal Tax Brackets: Complete Guide to US Income Tax Rates & Slabs",
        "slug": "federal-tax-brackets-2026-guide",
        "excerpt": "Complete guide to 2026 federal income tax brackets, standard deductions, tax credits, and how inflation adjustments affect your tax bill.",
        "category": "tax-guide",
        "tags": "federal tax brackets 2026,income tax slab in usa,federal income tax rates,tax deductions,tax credits,inflation adjustments",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "2026 Federal Tax Brackets: US Income Tax Rates & Slabs Guide",
        "metaDesc": "Complete guide to 2026 federal income tax brackets, standard deductions, tax credits, and inflation adjustments.",
        "createdAt": "2026-06-19T12:00:00.000Z",
        "updatedAt": "2026-06-19T12:00:00.000Z"
    },
    {
        "id": "california-tax-guide-2026",
        "title": "California Tax Guide 2026: Income Tax, Sales Tax, and Local Rates",
        "slug": "california-tax-guide-2026",
        "excerpt": "Complete guide to California taxes in 2026. Income tax rates, sales tax rates, district taxes, and total tax amount.",
        "category": "state-tax",
        "tags": "california tax calculator,tax amount in california,sales tax rate,local sales tax,income tax rate,district taxes",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "California Tax Guide 2026: Income & Sales Tax Rates",
        "metaDesc": "Complete guide to California taxes in 2026. Income tax rates 1%-13.3%, sales tax rates by city, district taxes.",
        "createdAt": "2026-06-19T12:00:00.000Z",
        "updatedAt": "2026-06-19T12:00:00.000Z"
    },
    {
        "id": "texas-tax-guide-2026",
        "title": "Texas Tax Guide 2026: No Income Tax, But What About Property and Sales Tax?",
        "slug": "texas-tax-guide-2026",
        "excerpt": "Texas has no state income tax, but property tax is among the highest. Complete guide to Texas taxes in 2026.",
        "category": "state-tax",
        "tags": "texas tax calculator,income tax in texas,taxable income,tax returns,property tax rate,sales tax",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "Texas Tax Guide 2026: No Income Tax, Property & Sales Tax",
        "metaDesc": "Complete guide to Texas taxes in 2026. No state income tax, but property tax rates are among the highest.",
        "createdAt": "2026-06-19T12:00:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "new-york-tax-guide-2026",
        "title": "New York State Taxes 2026: NYC Tax, Filing, and What You Owe",
        "slug": "new-york-tax-guide-2026",
        "excerpt": "Complete guide to New York taxes in 2026. NYC tax rates, state income tax brackets, estate tax, and filing.",
        "category": "state-tax",
        "tags": "new york tax calculator,nyc tax,york state taxes,tax year,tax returns,estate tax,income tax rate",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "New York State Taxes 2026: NYC Tax, Filing & What You Owe",
        "metaDesc": "Complete guide to New York taxes in 2026. NYC tax rates, state income tax brackets, estate tax, filing deadlines.",
        "createdAt": "2026-06-19T12:00:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "washington-tax-guide-2026",
        "title": "Washington State Tax Guide 2026: No Income Tax, But High Sales Tax",
        "slug": "washington-tax-guide-2026",
        "excerpt": "Complete guide to Washington state taxes in 2026. No income tax, but sales tax up to 10.25%.",
        "category": "state-tax",
        "tags": "washington tax calculator,tax calculator washington,washington sales tax,local sales taxes,department of revenue",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "Washington State Tax Guide 2026: No Income Tax",
        "metaDesc": "Complete guide to Washington state taxes in 2026. No income tax but sales tax up to 10.25%.",
        "createdAt": "2026-06-19T12:00:00.000Z",
        "updatedAt": "2026-06-19T12:00:00.000Z"
    },
    {
        "id": "2026-paycheck-take-home-pay-guide",
        "title": "2026 Paycheck & Take-Home Pay Calculator Guide: How Much of Your Salary You Actually Keep",
        "slug": "2026-paycheck-take-home-pay-guide",
        "excerpt": "Calculate your 2026 take-home pay. Guide to federal brackets, FICA, state taxes, and payroll deductions with examples.",
        "category": "tax-guide",
        "tags": "paycheck calculator 2026,take home pay calculator,net pay,FICA 2026,federal tax brackets 2026,state income tax,w-4 withholding,self-employment tax,OBBBA 2026,social security wage base 2026,how to calculate take home pay,payroll deductions,401k contributions,bonus tax rate,overtime tax",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "2026 Paycheck Tax Calculator: Take-Home Pay Guide",
        "metaDesc": "Calculate your 2026 take-home pay. Guide to federal brackets, FICA, state taxes, and payroll deductions with examples.",
        "createdAt": "2026-07-04T18:00:00.000Z",
        "updatedAt": "2026-07-04T18:00:00.000Z"
    },
    {
        "id": "2026-federal-tax-refund-estimator-guide",
        "title": "2026 Federal Tax Refund Estimator: How Much Back?",
        "slug": "2026-federal-tax-refund-estimator-guide",
        "excerpt": "Estimate your 2026 federal tax refund. OBBBA changes, brackets, child tax credit, and examples for W-2 and self-employed.",
        "category": "tax-guide",
        "tags": "2026 tax refund estimator,federal tax refund calculator 2026,tax refund 2026,OBBBA 2026,child tax credit 2026,standard deduction 2026,federal tax brackets 2026,tax refund estimate,W-2 refund calculator,IRS refund 2026,tax withholding,W-4 calculator,tax credits 2026,SALT deduction 2026,earned income credit",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "2026 Federal Tax Refund Estimator: How Much Back?",
        "metaDesc": "Estimate your 2026 federal tax refund with our complete guide. Covers OBBBA changes, 2026 tax brackets, child tax credit, standard deductions, and worked.",
        "createdAt": "2026-07-04T20:30:00.000Z",
        "updatedAt": "2026-07-04T20:30:00.000Z"
    },
    {
        "id": "2026-w2-tax-refund-calculator-guide",
        "title": "W-2 Tax Refund Calculator Guide 2026: Exact Numbers",
        "slug": "2026-w2-tax-refund-calculator-guide",
        "excerpt": "2026 W-2 tax refund guide for employees. Read your W-2, calculate withholding, and estimate your refund.",
        "category": "tax-guide",
        "tags": "W-2 tax refund calculator 2026,W2 refund estimator,federal tax refund 2026,W-2 form guide,tax withholding 2026,W-4 calculator 2026,child tax credit 2026,standard deduction 2026,OBBBA 2026,federal tax brackets 2026,tax refund estimate,Box 1 wages,Box 2 withholding,bonus tax rate,multiple jobs tax",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "W-2 Tax Refund Calculator Guide 2026: Exact Numbers",
        "metaDesc": "2026 W-2 tax refund guide for employees. Read your W-2, calculate withholding, and estimate your refund.",
        "createdAt": "2026-07-04T20:35:00.000Z",
        "updatedAt": "2026-07-04T20:35:00.000Z"
    },
    {
        "id": "2026-self-employed-tax-refund-calculator",
        "title": "Self-Employed Tax Refund Calculator 2026: SE Tax, Quarterly Payments & Deductions",
        "slug": "2026-self-employed-tax-refund-calculator",
        "excerpt": "Complete 2026 tax refund guide for self-employed workers, freelancers, and contractors. Calculate SE tax, quarterly estimated payments, business deductions, and your expected refund with worked examples.",
        "category": "tax-guide",
        "tags": "self-employed tax refund 2026,self-employment tax calculator,SE tax 2026,quarterly estimated payments,freelance tax calculator,1099 tax refund,self-employed deductions,SEP IRA 2026,solo 401k,home office deduction,OBBBA 2026,self-employment tax rate,15.3% SE tax,business deductions,quarterly tax payments",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "Self-Employed Tax Refund Calculator 2026",
        "metaDesc": "Complete 2026 tax refund guide for self-employed workers, freelancers, and contractors. Calculate SE tax, quarterly estimated payments, business.",
        "createdAt": "2026-07-04T20:40:00.000Z",
        "updatedAt": "2026-07-04T20:40:00.000Z"
    },
    {
        "id": "how-to-calculate-federal-tax-refund-2026",
        "title": "How to Calculate Your 2026 Federal Tax Refund",
        "slug": "how-to-calculate-federal-tax-refund-2026",
        "excerpt": "Exact formula for your 2026 federal tax refund. Step-by-step calculation with brackets, deductions, and credits.",
        "category": "tax-guide",
        "tags": "how to calculate tax refund 2026,federal tax refund formula,tax refund calculation,2026 tax brackets,taxable income formula,standard deduction 2026,child tax credit 2026,tax credits 2026,OBBBA 2026,W-4 withholding,tax liability calculation,progressive tax brackets,refund vs balance due,tax deductions 2026,earned income credit",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "How to Calculate Your 2026 Federal Tax Refund",
        "metaDesc": "Exact formula for your 2026 federal tax refund. Step-by-step calculation with brackets, deductions, and credits.",
        "createdAt": "2026-07-04T20:45:00.000Z",
        "updatedAt": "2026-07-04T20:45:00.000Z"
    },
    {
        "id": "obbba-tax-refund-impact-2026",
        "title": "OBBBA Tax Refund Impact 2026: How It Changes Your Refund",
        "slug": "obbba-tax-refund-impact-2026",
        "excerpt": "How OBBBA changes your 2026 tax refund. New SALT cap, doubled Child Tax Credit, tip/overtime deductions with examples.",
        "category": "tax-guide",
        "tags": "OBBBA 2026,One Big Beautiful Bill Act,OBBBA tax refund,OBBBA tax calculator,SALT cap 2026,child tax credit 2026,OBBBA changes 2026,tip deduction 2026,overtime deduction 2026,senior deduction 2026,OBBBA vs prior law,2026 tax changes,TCJA permanent,OBBBA impact,tax refund increase 2026",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "OBBBA Tax Refund Impact 2026: How It Changes Your Refund",
        "metaDesc": "How OBBBA changes your 2026 tax refund. New SALT cap, doubled Child Tax Credit, tip/overtime deductions with examples.",
        "createdAt": "2026-07-04T20:50:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "oasdi-tax-explained-2026",
        "title": "OASDI Tax Explained: What It Is and How Much You Pay in 2026",
        "slug": "oasdi-tax-explained-2026",
        "excerpt": "OASDI tax is 6.2% of your wages up to $184,500 in 2026. Learn what OASDI means, how it differs from FICA, and how to calculate your Social Security tax.",
        "category": "tax-guide",
        "tags": "oasdi tax,social security tax,fica tax,payroll tax,oasdi 2026,social security wage cap,oasdi vs fica",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "OASDI Tax Explained 2026: What It Is & How Much You Pay",
        "metaDesc": "OASDI tax is 6.2% of wages up to $184,500 in 2026. Learn what OASDI means, how it differs from FICA, and calculate your Social Security tax. Free guide.",
        "createdAt": "2026-07-07T20:00:00.000Z",
        "updatedAt": "2026-07-07T20:00:00.000Z"
    },
    {
        "id": "rd-tax-credit-guide-2026",
        "title": "R&D Tax Credit Guide 2026: Qualify as a Startup",
        "slug": "rd-tax-credit-guide-2026",
        "excerpt": "Complete R&D tax credit guide for 2026. Qualification criteria, four-part test, payroll tax offset for startups, and how to calculate your credit.",
        "category": "tax-guide",
        "tags": "r&d tax credit,research and development tax credit,r&d qualification criteria,startup tax credits,form 6765,rd tax credit 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "R&D Tax Credit Guide 2026: Qualify as a Startup",
        "metaDesc": "Complete R&D tax credit guide for 2026. Qualification criteria, four-part test, payroll tax offset for startups, and how to calculate your credit.",
        "createdAt": "2026-07-07T20:05:00.000Z",
        "updatedAt": "2026-07-07T20:05:00.000Z"
    },
    {
        "id": "amended-tax-return-guide-2026",
        "title": "Amended Tax Return Guide: How to Check Status and File Form 1040-X",
        "slug": "amended-tax-return-guide-2026",
        "excerpt": "Complete amended tax return guide. How to file Form 1040-X, check amended return status online, processing times, and deadlines.",
        "category": "tax-guide",
        "tags": "amended tax return,form 1040-x,amended return status,where is my amended return,irs amended return,amended tax return 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Amended Tax Return Guide: File Form 1040-X (2026)",
        "metaDesc": "Complete amended tax return guide. How to file Form 1040-X, check amended return status online, processing times, and deadlines. Free 2026 guide.",
        "createdAt": "2026-07-07T20:10:00.000Z",
        "updatedAt": "2026-07-07T20:10:00.000Z"
    },
    {
        "id": "irs-tax-refund-schedule-2026",
        "title": "IRS Tax Refund Schedule 2026: When Will You Get It?",
        "slug": "irs-tax-refund-schedule-2026",
        "excerpt": "2026 IRS tax refund schedule. E-file direct deposit takes 8-14 days. Check refund status, processing times, delays, and $3,000 refund qualification.",
        "category": "tax-guide",
        "tags": "irs tax refund schedule,refund schedule 2026,where is my refund,tax refund timeline,irs refund schedule,refund processing time",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "IRS Tax Refund Schedule 2026: When Will You Get It?",
        "metaDesc": "2026 IRS tax refund schedule. E-file direct deposit takes 8-14 days. Check refund status, processing times, delays, and $3,000 refund qualification.",
        "createdAt": "2026-07-07T20:15:00.000Z",
        "updatedAt": "2026-07-07T20:15:00.000Z"
    },
    {
        "id": "brian-kemp-income-tax-rebates-2026",
        "title": "Brian Kemp Income Tax Rebates 2026: Who Qualifies and How Much?",
        "slug": "brian-kemp-income-tax-rebates-2026",
        "excerpt": "Brian Kemp income tax rebates 2026. Up to $500 for Georgia residents. Who qualifies, how much you'll receive, when to expect payment, and how to check.",
        "category": "tax-guide",
        "tags": "brian kemp income tax rebates,georgia tax rebate,georgia income tax refund,house bill 112,georgia flat tax,kemp tax rebate 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Brian Kemp Income Tax Rebates 2026: Do You Qualify?",
        "metaDesc": "Brian Kemp income tax rebates 2026. Up to $500 for Georgia residents. Who qualifies, how much you'll receive, when to expect payment, and how to check.",
        "createdAt": "2026-07-07T20:20:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "turbotax-lawsuit-guide-2026",
        "title": "TurboTax Lawsuit Explained: What Happened and What It Means for You",
        "slug": "turbotax-lawsuit-guide-2026",
        "excerpt": "TurboTax lawsuit explained. $141M settlement, who qualifies, payment amounts, and how to file taxes for free without TurboTax.",
        "category": "tax-guide",
        "tags": "turbotax lawsuit,intuit settlement,turbotax settlement,turbotax free file,irs free file,turbotax lawsuit 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "TurboTax Lawsuit Explained: What It Means (2026)",
        "metaDesc": "TurboTax lawsuit explained. $141M settlement, who qualifies, payment amounts, and how to file taxes for free without TurboTax. Complete 2026 guide.",
        "createdAt": "2026-07-07T20:25:00.000Z",
        "updatedAt": "2026-07-07T20:25:00.000Z"
    },
    {
        "id": "best-tax-preparer-near-me-2026",
        "title": "Best Tax Preparer Near Me: How to Find a Qualified CPA or EA in 2026",
        "slug": "best-tax-preparer-near-me-2026",
        "excerpt": "How to find the best tax preparer near you. CPA vs EA vs unenrolled, cost, red flags, free VITA options, and questions to ask.",
        "category": "tax-guide",
        "tags": "best tax preparer near me,tax preparer,cpa near me,enrolled agent,tax professional,find tax preparer,vita free tax help",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Best Tax Preparer Near Me: Find a CPA or EA (2026)",
        "metaDesc": "How to find the best tax preparer near you. CPA vs EA vs unenrolled, cost, red flags, free VITA options, and questions to ask. Complete 2026 guide.",
        "createdAt": "2026-07-07T20:30:00.000Z",
        "updatedAt": "2026-07-07T20:30:00.000Z"
    },
    {
        "id": "alameda-county-property-tax-2026",
        "title": "Alameda County Property Tax 2026: Rates, Assessment, and How to Pay",
        "slug": "alameda-county-property-tax-2026",
        "excerpt": "Complete Alameda County property tax guide 2026. Rates by city, payment schedule, exemptions, how to appeal assessments, and OBBBA SALT cap impact.",
        "category": "tax-guide",
        "tags": "alameda county property tax,property tax california,oakland property tax,alameda county tax collector,prop 13,property tax 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Alameda County Property Tax 2026: Rates & How to Pay",
        "metaDesc": "Complete Alameda County property tax guide 2026. Rates by city, payment schedule, exemptions, how to appeal assessments, and OBBBA SALT cap impact.",
        "createdAt": "2026-07-07T20:35:00.000Z",
        "updatedAt": "2026-07-07T20:35:00.000Z"
    },
    {
        "id": "reverse-sales-tax-calculator-guide-2026",
        "title": "Reverse Sales Tax Calculator: How to Calculate Pre-Tax Price",
        "slug": "reverse-sales-tax-calculator-guide-2026",
        "excerpt": "Free reverse sales tax calculator guide. Calculate pre-tax price from any total. Formula, examples by state, and common mistakes to avoid.",
        "category": "tax-guide",
        "tags": "reverse sales tax calculator,reverse tax calculator,pre-tax price,sales tax calculation,reverse sales tax 2026,tax inclusive pricing",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Reverse Sales Tax Calculator: Pre-Tax Price (2026)",
        "metaDesc": "Free reverse sales tax calculator guide. Calculate pre-tax price from any total. Formula, examples by state, and common mistakes to avoid.",
        "createdAt": "2026-07-08T07:00:00.000Z",
        "updatedAt": "2026-07-08T07:00:00.000Z"
    },
    {
        "id": "robux-tax-calculator-guide-2026",
        "title": "Robux Tax Calculator: How Much Tax Does Roblox Take?",
        "slug": "robux-tax-calculator-guide-2026",
        "excerpt": "Robux tax calculator. Roblox takes 30% marketplace fee on all sales. Calculate your earnings, reverse calculator, DevEx rates, and real-world tax.",
        "category": "tax-guide",
        "tags": "robux tax calculator,roblox tax,robux marketplace fee,roblox developer tax,robux calculator 2026,devex roblox",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Robux Tax Calculator: How Much Does Roblox Take? (2026)",
        "metaDesc": "Robux tax calculator. Roblox takes 30% marketplace fee on all sales. Calculate your earnings, reverse calculator, DevEx rates, and real-world tax.",
        "createdAt": "2026-07-08T07:10:00.000Z",
        "updatedAt": "2026-07-08T07:10:00.000Z"
    },
    {
        "id": "federal-income-tax-rate-calculator-guide-2026",
        "title": "Federal Income Tax Rate Calculator: How to Calculate Your 2026 Tax",
        "slug": "federal-income-tax-rate-calculator-guide-2026",
        "excerpt": "Free federal income tax rate calculator guide for 2026. Seven tax brackets, standard deductions, step-by-step calculation examples, and OBBBA changes.",
        "category": "tax-guide",
        "tags": "federal income tax rate calculator,calculate federal income tax,federal tax rate 2026,tax brackets 2026,federal income tax calculator",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Federal Income Tax Rate Calculator: 2026 Tax",
        "metaDesc": "Free federal income tax rate calculator guide for 2026. Seven tax brackets, standard deductions, step-by-step calculation examples, and OBBBA changes.",
        "createdAt": "2026-07-09T08:30:00.000Z",
        "updatedAt": "2026-07-09T08:30:00.000Z"
    },
    {
        "id": "spreadsheet-formula-to-calculate-income-tax-2026",
        "title": "Spreadsheet Formula to Calculate Income Tax (Excel & Google Sheets)",
        "slug": "spreadsheet-formula-to-calculate-income-tax-2026",
        "excerpt": "Ready-to-use spreadsheet formulas for calculating 2026 federal income tax. Nested IF, VLOOKUP, and SUMPRODUCT methods for Excel and Google Sheets.",
        "category": "tax-guide",
        "tags": "spreadsheet formula to calculate income tax,excel tax formula,google sheets tax calculator,progressive tax formula,vlookup tax calculation,income tax spreadsheet 2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Spreadsheet Formula to Calculate Income Tax 2026",
        "metaDesc": "Spreadsheet formulas for 2026 federal income tax. Nested IF, VLOOKUP, and SUMPRODUCT for Excel and Google Sheets.",
        "createdAt": "2026-07-09T08:40:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "blog_1099_vs_w2_2026",
        "title": "W2 vs 1099 Take-Home Pay: Which Actually Pays More in 2026?",
        "slug": "1099-vs-w2-take-home-pay-comparison-2026",
        "excerpt": "If a company offers you $80k as a W2 employee or $90k as a 1099 contractor, which is the better deal financially? We break down the tax math.",
        "category": "tax-guide",
        "tags": "1099,w2,self-employed,freelance",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "W2 vs 1099 Tax Comparison 2026: Which Pays More?",
        "metaDesc": "Comparing a W2 salary vs 1099 contractor rate? Understand self-employment tax, benefits, and why 1099 rates need to be 30% higher.",
        "createdAt": "2026-06-25T10:10:00.000Z",
        "updatedAt": "2026-06-25T10:10:00.000Z"
    },
    {
        "id": "blog_bonus_tax_methods_2026",
        "title": "Why Is My Bonus Taxed So High? 22% Flat Rate vs Aggregate Method",
        "slug": "bonus-tax-flat-vs-aggregate-method-explained",
        "excerpt": "Did your bonus get crushed by taxes? We explain supplemental income, the 22% flat rate method, and the aggregate method.",
        "category": "tax-guide",
        "tags": "bonus,supplemental wages,tax return",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Why Is My Bonus Taxed So High? 22% Flat Rate Explained",
        "metaDesc": "Understand how the IRS taxes bonuses as supplemental wages. Learn the difference between the 22% flat rate method and the aggregate withholding method.",
        "createdAt": "2026-06-25T10:20:00.000Z",
        "updatedAt": "2026-06-25T10:20:00.000Z"
    },
    {
        "id": "florida-tax-guide-2026",
        "title": "Florida Tax Guide 2026: No Income Tax & Sales Tax & Calculator",
        "slug": "florida-tax-guide-2026",
        "excerpt": "Complete guide to Florida taxes in 2026. No state income tax, 6% sales tax (avg 6.98%), property tax rates, salary after taxes ($50k-$500k), and Florida homestead exemption explained.",
        "category": "state-tax",
        "tags": "florida tax calculator,florida income tax,florida income tax rate,florida sales tax,florida sales tax rate,florida sales tax on cars,florida property tax,florida homestead exemption,florida tax brackets,florida state tax,salary after taxes florida,florida retirement tax,florida estate tax,save our homes florida,florida tax calculator 2026",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "Florida Tax Guide 2026: No Income Tax & Sales Tax",
        "metaDesc": "Complete guide to Florida taxes 2026. No income tax, 6% sales tax (avg 6.98%), property tax rates, salary after taxes, and Florida homestead exemption.",
        "createdAt": "2026-06-20T12:00:00.000Z",
        "updatedAt": "2026-06-20T12:00:00.000Z"
    },
    {
        "id": "blog_100k_state_2026",
        "title": "How Much Tax Do You Pay on a $100K Salary in Every State? (2026)",
        "slug": "how-much-tax-on-100k-salary-by-state-2026",
        "excerpt": "Making $100,000 doesn't mean taking home $100,000. See exactly how much you'll take home in all 50 states after federal, state, and FICA taxes in 2026.",
        "category": "tax-guide",
        "tags": "salary,state tax,100k,comparison",
        "coverImage": "",
        "published": true,
        "featured": true,
        "metaTitle": "How Much Tax Do You Pay on a $100K Salary by State? (2026)",
        "metaDesc": "See exactly how much of your $100,000 salary you take home in all 50 states after federal, FICA, and state taxes in 2026.",
        "createdAt": "2026-06-25T10:00:00.000Z",
        "updatedAt": "2026-10-24"
    },
    {
        "id": "blog_overtime_tax_rate_2026",
        "title": "Is Overtime Taxed More? The Truth About Overtime Tax Rates",
        "slug": "how-to-calculate-overtime-pay-tax-rate",
        "excerpt": "It feels like the government takes half your overtime pay. But is overtime actually taxed at a higher rate? We explain how overtime withholding works.",
        "category": "tax-guide",
        "tags": "overtime,withholding,paycheck,tax brackets",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Is Overtime Taxed More? Overtime Tax Rate Explained",
        "metaDesc": "Does working overtime put you in a higher tax bracket? Learn the difference between overtime tax withholding and actual tax liability.",
        "createdAt": "2026-06-25T10:15:00.000Z",
        "updatedAt": "2026-06-25T10:15:00.000Z"
    },
    {
        "id": "blog_ca_to_tx_2026",
        "title": "Moving from California to Texas: Exactly How Much Tax You'll Save in 2026",
        "slug": "moving-from-california-to-texas-tax-savings-2026",
        "excerpt": "Is the \"Texas migration\" worth it financially? We break down exactly how much you save in income tax, and what happens when property taxes enter the chat.",
        "category": "tax-guide",
        "tags": "california,texas,comparison,state tax",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Moving from CA to TX: Tax Savings Calculator 2026",
        "metaDesc": "Compare the exact tax differences between California and Texas in 2026. See how 0% income tax stacks up against high property taxes.",
        "createdAt": "2026-06-25T10:05:00.000Z",
        "updatedAt": "2026-06-25T10:05:00.000Z"
    },
    {
        "id": "home-sale-tax-guide-2026",
        "title": "Selling Your House in 2026? Here's How Much Tax You'll Actually Pay",
        "slug": "home-sale-tax-guide-2026",
        "excerpt": "How much tax do you pay when you sell your house? The 2026 rules explained: the $250K/$500K exclusion, cost basis, capital gains rates, depreciation recapture, and state taxes — with worked examples.",
        "category": "tax-guide",
        "tags": "home sale tax,selling a house,capital gains tax,section 121 exclusion,primary residence,tax calculator,2026 taxes",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "Selling Your House in 2026: Taxes, Exclusions & Real Examples | TheTaxCalc",
        "metaDesc": "How much tax do you pay when you sell your house? 2026 rules for the $250K/$500K exclusion, capital gains rates, cost basis, and depreciation recapture — with worked examples.",
        "createdAt": "2026-10-24T12:30:00.000Z",
        "updatedAt": "2026-10-24T12:30:00.000Z"
    },
    {
        "id": "how-to-calculate-sales-tax-2026",
        "title": "How to Calculate Sales Tax in 2026: The Formula, Examples, and Rates for Every State",
        "slug": "how-to-calculate-sales-tax-2026",
        "excerpt": "Learn the exact sales tax formula with worked examples at real 2026 rates. Find your combined state, county, and city rate, plus reverse calculation and exemptions.",
        "category": "tax-guide",
        "tags": "sales tax,sales tax calculator,how to calculate sales tax,sales tax rate,tax formula,2026",
        "coverImage": "",
        "published": true,
        "featured": false,
        "metaTitle": "How to Calculate Sales Tax in 2026: Formula, Examples & Rates | TheTaxCalc",
        "metaDesc": "The exact sales tax formula with worked examples at real 2026 rates. Find your combined rate for any ZIP code, reverse calculation, and state-by-state rates.",
        "createdAt": "2026-10-24T12:45:00.000Z",
        "updatedAt": "2026-10-24T12:45:00.000Z"
    }
];
function getPublishedPostsMeta() {
    return BLOG_INDEX.filter((p)=>p.published).sort((a, b)=>{
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}
function getPostMeta(slug) {
    return BLOG_INDEX.find((p)=>p.slug === slug && p.published) || null;
}
function getPublishedSlugs() {
    return BLOG_INDEX.filter((p)=>p.published).map((p)=>p.slug);
}
function metaToPost(meta) {
    return {
        ...meta,
        content: ""
    };
}
}),
"[project]/src/lib/compare-config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * State vs State Tax Comparison Configuration
 * Centralized mapping of comparison slugs to metadata, tax data, and SEO info.
 */ __turbopack_context__.s([
    "COMPARE_STATES",
    ()=>COMPARE_STATES,
    "COMPARISON_SLUGS",
    ()=>COMPARISON_SLUGS,
    "getAllCompareConfigs",
    ()=>getAllCompareConfigs,
    "getCompareConfig",
    ()=>getCompareConfig,
    "parseComparisonSlug",
    ()=>parseComparisonSlug
]);
const COMPARE_STATES = {
    illinois: {
        name: 'Illinois',
        abbreviation: 'IL',
        slug: 'illinois',
        taxConfigKey: 'illinois',
        incomeTaxLabel: '4.95% flat',
        incomeTaxRate: 0.0495,
        standardDeduction: 2775,
        propertyTaxRate: 0.0178,
        salesTaxRate: 0.0886,
        calculatorSlug: '/illinois-tax-calculator',
        extraNotes: 'Personal exemption of $2,775; no standard deduction'
    },
    texas: {
        name: 'Texas',
        abbreviation: 'TX',
        slug: 'texas',
        taxConfigKey: 'texas',
        incomeTaxLabel: '0% (no state income tax)',
        incomeTaxRate: 0,
        standardDeduction: 0,
        propertyTaxRate: 0.0171,
        salesTaxRate: 0.082,
        calculatorSlug: '/texas-tax-calculator',
        extraNotes: 'No state income tax; higher property taxes offset savings'
    },
    florida: {
        name: 'Florida',
        abbreviation: 'FL',
        slug: 'florida',
        taxConfigKey: 'florida',
        incomeTaxLabel: '0% (no state income tax)',
        incomeTaxRate: 0,
        standardDeduction: 0,
        propertyTaxRate: 0.0086,
        salesTaxRate: 0.07,
        calculatorSlug: '/florida-tax-calculator',
        extraNotes: 'No state income tax; low property taxes; homestead exemption'
    },
    california: {
        name: 'California',
        abbreviation: 'CA',
        slug: 'california',
        taxConfigKey: 'california',
        incomeTaxLabel: '1%–13.3% progressive',
        incomeTaxRate: 0.093,
        standardDeduction: 6083,
        propertyTaxRate: 0.0071,
        salesTaxRate: 0.0882,
        calculatorSlug: '/california-tax-calculator',
        extraNotes: 'Highest top marginal rate in the U.S. at 13.3%; $6,083 standard deduction (single)'
    },
    'new-york': {
        name: 'New York',
        abbreviation: 'NY',
        slug: 'new-york',
        taxConfigKey: 'newyork',
        incomeTaxLabel: '4%–10.9% progressive',
        incomeTaxRate: 0.0685,
        standardDeduction: 8100,
        propertyTaxRate: 0.0162,
        salesTaxRate: 0.0852,
        calculatorSlug: '/new-york-tax-calculator',
        extraNotes: 'NYC residents pay additional city tax of 3.078%–3.876%'
    }
};
const COMPARISON_SLUGS = [
    'illinois-vs-texas',
    'illinois-vs-florida',
    'illinois-vs-california',
    'illinois-vs-new-york',
    'texas-vs-florida',
    'texas-vs-california',
    'texas-vs-new-york',
    'florida-vs-california',
    'florida-vs-new-york',
    'california-vs-new-york'
];
function parseComparisonSlug(slug) {
    const parts = slug.split('-vs-');
    if (parts.length !== 2) return null;
    const state1 = parts[0];
    const state2 = parts[1];
    if (!COMPARE_STATES[state1] || !COMPARE_STATES[state2]) return null;
    return [
        state1,
        state2
    ];
}
// ─── CTR-Optimized Custom Meta for High-Impression Comparisons ──────────────────
const CUSTOM_COMPARE_META = {
    'california-vs-new-york': {
        metaTitle: 'California vs New York Taxes 2026: Side-by-Side Breakdown',
        metaDesc: 'CA tops out at 13.3% vs NY 10.9% — but NYC adds 3.876% city tax. See exact take-home pay at $75K & $150K for both states. Free 2026 calculator.',
        ogTitle: 'California vs New York Taxes 2026 — Who Pays More?',
        ogDescription: 'CA 13.3% vs NY 10.9% + NYC 3.876%. See your take-home pay difference at $75K & $150K. Free 2026 comparison calculator.'
    },
    'texas-vs-florida': {
        metaTitle: 'Texas vs Florida Taxes 2026: No-Income-Tax States Compared',
        metaDesc: 'Both have 0% income tax — but TX property tax is 1.71% vs FL 0.86%. See which state actually saves you more at $75K & $150K. Free 2026 calculator.',
        ogTitle: 'Texas vs Florida Taxes 2026 — Which Saves You More?',
        ogDescription: 'Both 0% income tax, but TX property tax is 2x FL. See real take-home pay difference at $75K & $150K. Free 2026 calculator.'
    },
    'illinois-vs-texas': {
        metaTitle: 'Illinois vs Texas Taxes 2026: Save $4,200+/Year in TX',
        metaDesc: 'IL 4.95% flat vs TX 0% income tax. On $85K, keep $4,200+ more in Texas. Full breakdown: income, property & sales tax. Free 2026 calculator.',
        ogTitle: 'Illinois vs Texas — Save $4,200+/Year in TX (2026)',
        ogDescription: 'IL 4.95% vs TX 0% income tax. Keep $4,200+ more in Texas on $85K. Full side-by-side 2026 comparison.'
    },
    'illinois-vs-florida': {
        metaTitle: 'Illinois vs Florida Taxes 2026: Save $4,000+/Year in FL',
        metaDesc: 'IL 4.95% flat vs FL 0% income tax. On $85K, Florida saves $4,000+/year. Compare income, property & sales tax. Free 2026 calculator.',
        ogTitle: 'Illinois vs Florida — Save $4,000+/Year in FL (2026)',
        ogDescription: 'IL 4.95% vs FL 0% income tax. Keep $4,000+ more in Florida on $85K. Full side-by-side 2026 comparison.'
    },
    'illinois-vs-california': {
        metaTitle: 'Illinois vs California Taxes 2026: Flat 4.95% vs 13.3%',
        metaDesc: 'IL 4.95% flat vs CA up to 13.3%. On $100K, IL saves ~$5,500/year. Full income, property & sales tax breakdown. Free 2026 calculator.',
        ogTitle: 'Illinois vs California — Flat 4.95% vs 13.3% (2026)',
        ogDescription: 'IL 4.95% vs CA up to 13.3%. Save ~$5,500/year in IL on $100K. Full 2026 tax comparison.'
    },
    'illinois-vs-new-york': {
        metaTitle: 'Illinois vs New York Taxes 2026: 4.95% Flat vs 10.9% Progressive',
        metaDesc: 'IL 4.95% flat vs NY up to 10.9% + NYC tax. On $100K, IL saves ~$3,800/year. Full tax comparison. Free 2026 calculator.',
        ogTitle: 'Illinois vs New York — 4.95% vs 10.9% (2026)',
        ogDescription: 'IL 4.95% vs NY up to 10.9%. Save ~$3,800/year in IL on $100K. Full 2026 comparison.'
    },
    'texas-vs-california': {
        metaTitle: 'Texas vs California Taxes 2026: 0% vs 13.3% Income Tax',
        metaDesc: 'TX 0% income tax vs CA up to 13.3%. On $100K salary, Texas saves you ~$8,400/year. See full breakdown including property & sales tax. Free 2026 calculator.',
        ogTitle: 'Texas vs California — 0% vs 13.3% Income Tax (2026)',
        ogDescription: 'TX 0% vs CA 13.3%. Save ~$8,400/year in Texas on $100K. Full 2026 comparison.'
    },
    'texas-vs-new-york': {
        metaTitle: 'Texas vs New York Taxes 2026: 0% vs 10.9% Income Tax',
        metaDesc: 'TX 0% income tax vs NY up to 10.9% + NYC 3.876%. On $100K, Texas saves ~$6,800/year. Full income, property & sales tax side-by-side. Free 2026 calculator.',
        ogTitle: 'Texas vs New York — 0% vs 10.9% Income Tax (2026)',
        ogDescription: 'TX 0% vs NY 10.9% + NYC tax. Save ~$6,800/year in Texas on $100K. Full 2026 comparison.'
    },
    'florida-vs-california': {
        metaTitle: 'Florida vs California Taxes 2026: 0% vs 13.3% Income Tax',
        metaDesc: 'FL 0% income tax vs CA up to 13.3%. On $100K salary, Florida saves ~$8,400/year. Compare income, property & sales tax. Free 2026 calculator.',
        ogTitle: 'Florida vs California — 0% vs 13.3% Income Tax (2026)',
        ogDescription: 'FL 0% vs CA 13.3%. Save ~$8,400/year in Florida on $100K. Full 2026 comparison.'
    },
    'florida-vs-new-york': {
        metaTitle: 'Florida vs New York Taxes 2026: 0% vs 10.9% Income Tax',
        metaDesc: 'FL 0% income tax vs NY up to 10.9% + NYC 3.876%. On $100K, Florida saves ~$6,800/year. Full income, property & sales tax breakdown. Free 2026 calculator.',
        ogTitle: 'Florida vs New York — 0% vs 10.9% Income Tax (2026)',
        ogDescription: 'FL 0% vs NY 10.9% + NYC tax. Save ~$6,800/year in Florida on $100K. Full 2026 comparison.'
    }
};
// ─── Generate SEO metadata for each comparison ───────────────────────────────
function buildCompareConfig(slug) {
    const parsed = parseComparisonSlug(slug);
    if (!parsed) return null;
    const [key1, key2] = parsed;
    const s1 = COMPARE_STATES[key1];
    const s2 = COMPARE_STATES[key2];
    // Use CTR-optimized custom meta if available, otherwise fall back to generic
    const customMeta = CUSTOM_COMPARE_META[slug];
    return {
        slug,
        state1: s1,
        state2: s2,
        metaTitle: customMeta?.metaTitle ?? `${s1.name} vs ${s2.name} Taxes 2026 | Compare`,
        metaDesc: customMeta?.metaDesc ?? `${s1.name} vs ${s2.name} taxes compared: see your take-home pay difference at $75K & $150K. Income tax, property tax, sales tax — all 2026 numbers.`,
        h1: `${s1.name} vs ${s2.name} Tax Comparison`,
        keywords: [
            `${s1.name.toLowerCase()} vs ${s2.name.toLowerCase()} taxes`,
            `${s1.abbreviation} vs ${s2.abbreviation} income tax`,
            `${s1.name.toLowerCase()} ${s2.name.toLowerCase()} tax comparison`,
            `compare ${s1.name.toLowerCase()} ${s2.name.toLowerCase()} taxes`,
            `${s1.name.toLowerCase()} ${s2.name.toLowerCase()} take home pay`,
            `${s1.name.toLowerCase()} ${s2.name.toLowerCase()} cost of living`,
            `move from ${s1.name} to ${s2.name} taxes`,
            `relocate ${s1.name} to ${s2.name} salary`
        ],
        ogTitle: customMeta?.ogTitle ?? `${s1.name} vs ${s2.name} — Which State Saves You More in 2026?`,
        ogDescription: customMeta?.ogDescription ?? `${s1.name} vs ${s2.name} take-home pay comparison. See real dollar differences at $75K & $150K salaries for 2026.`,
        faqs: buildFaqs(s1, s2)
    };
}
function buildFaqs(s1, s2) {
    const faqs = [];
    // FAQ 1: Income tax comparison
    faqs.push({
        question: `Does ${s1.name} or ${s2.name} have higher income tax?`,
        answer: `${s1.name} has an income tax rate of ${s1.incomeTaxLabel}, while ${s2.name} has ${s2.incomeTaxLabel}. ${s1.incomeTaxRate > s2.incomeTaxRate ? `${s1.name} has the higher income tax burden.` : s1.incomeTaxRate < s2.incomeTaxRate ? `${s2.name} has the higher income tax burden.` : 'Both states have similar income tax burdens.'}`
    });
    // FAQ 2: Property tax comparison
    faqs.push({
        question: `Which state has higher property taxes: ${s1.name} or ${s2.name}?`,
        answer: `${s1.name} has an average effective property tax rate of ${(s1.propertyTaxRate * 100).toFixed(2)}%, compared to ${s2.name}'s ${(s2.propertyTaxRate * 100).toFixed(2)}%. ${s1.propertyTaxRate > s2.propertyTaxRate ? `${s1.name} has higher property taxes, which is important to consider even if income tax is lower.` : s1.propertyTaxRate < s2.propertyTaxRate ? `${s2.name} has higher property taxes.` : 'Both states have similar property tax rates.'}`
    });
    // FAQ 3: Overall tax burden
    faqs.push({
        question: `Is it cheaper to live in ${s1.name} or ${s2.name} overall?`,
        answer: `The answer depends on your income level and spending habits. ${s1.name} charges ${s1.incomeTaxLabel} income tax and ${(s1.propertyTaxRate * 100).toFixed(2)}% property tax, while ${s2.name} charges ${s2.incomeTaxLabel} income tax and ${(s2.propertyTaxRate * 100).toFixed(2)}% property tax. Use our side-by-side comparison table above to see take-home pay at $75K and $150K salary levels.`
    });
    // FAQ 4: Moving consideration
    faqs.push({
        question: `Should I move from ${s1.name} to ${s2.name} for tax savings?`,
        answer: `Moving from ${s1.name} to ${s2.name} could ${s1.incomeTaxRate > s2.incomeTaxRate ? 'save' : 'cost'} you money on income taxes, but consider the full picture: property taxes, cost of living, housing prices, and quality of life. Use our relocation calculator for a personalized salary comparison.${s2.extraNotes ? ' ' + s2.extraNotes + '.' : ''}`
    });
    // FAQ 5: Sales tax comparison (if notably different)
    if (Math.abs(s1.salesTaxRate - s2.salesTaxRate) > 0.005) {
        faqs.push({
            question: `How do sales taxes compare between ${s1.name} and ${s2.name}?`,
            answer: `${s1.name} has an average combined sales tax rate of ${(s1.salesTaxRate * 100).toFixed(1)}%, while ${s2.name} has ${(s2.salesTaxRate * 100).toFixed(1)}%. Over a year of typical spending, this difference can add up to hundreds of dollars.`
        });
    } else {
        faqs.push({
            question: `What is the biggest tax difference between ${s1.name} and ${s2.name}?`,
            answer: `The largest tax difference between ${s1.name} and ${s2.name} is in income tax: ${s1.incomeTaxLabel} vs ${s2.incomeTaxLabel}. This difference can mean thousands of dollars per year in take-home pay depending on your salary level.`
        });
    }
    return faqs;
}
// ─── Cached Config Map ──────────────────────────────────────────────────────
const _configCache = new Map();
function getCompareConfig(slug) {
    if (!_configCache.has(slug)) {
        _configCache.set(slug, buildCompareConfig(slug));
    }
    return _configCache.get(slug);
}
function getAllCompareConfigs() {
    return COMPARISON_SLUGS.map((slug)=>getCompareConfig(slug)).filter((c)=>c !== null);
}
}),
"[project]/src/lib/authors.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTHORS",
    ()=>AUTHORS,
    "authorToJsonLd",
    ()=>authorToJsonLd,
    "getAuthor",
    ()=>getAuthor,
    "getAuthorForCalculator",
    ()=>getAuthorForCalculator,
    "getCalculatorAuthor",
    ()=>getCalculatorAuthor,
    "getRetirementAuthor",
    ()=>getRetirementAuthor,
    "getSelfEmploymentAuthor",
    ()=>getSelfEmploymentAuthor
]);
/**
 * Author profiles for YMYL / E-E-A-T compliance.
 *
 * Google's quality rater guidelines require identifiable, credible authors
 * for Your-Money-Or-Your-Life content (tax, finance, legal, health).
 * These profiles are used in:
 *   1. JSON-LD Person schema (structured data)
 *   2. Author bio cards on calculator and blog pages
 *   3. Metadata authors array
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-rsc] (ecmascript)");
;
const AUTHORS = {
    'rachel-mitchell': {
        id: 'rachel-mitchell',
        name: 'Rachel Mitchell',
        title: 'Lead Tax Analyst & Editorial Director',
        credentials: 'CPA',
        bio: 'Rachel Mitchell is a Certified Public Accountant (CPA) licensed in Illinois with over 12 years of experience in individual and small-business taxation. She specializes in federal and state income tax compliance, FICA optimization, payroll tax strategy, and multi-state tax planning. Rachel holds an MS in Taxation from Golden Gate University and a BS in Accounting from the University of Illinois Urbana-Champaign. She is an active member of the American Institute of Certified Public Accountants (AICPA) and the Illinois CPA Society. Before joining TheTaxCalc, Rachel spent 8 years at a Big Four accounting firm advising high-net-worth clients on tax-efficient wealth strategies.',
        url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/about#rachel-mitchell`,
        sameAs: [
            'https://www.linkedin.com/in/rachelmitchellcpa/',
            'https://www.aicpa-cima.com/'
        ],
        image: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/author-rachel-mitchell.webp`,
        knowsAbout: [
            'Federal Income Tax',
            'State Income Tax',
            'FICA Tax',
            'Payroll Tax',
            'IRS Compliance',
            'Tax Planning',
            'Multi-State Taxation',
            'Tax-Advantaged Accounts'
        ],
        worksFor: {
            name: 'TheTaxCalc',
            url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]
        }
    },
    'david-chen': {
        id: 'david-chen',
        name: 'David Chen',
        title: 'Tax Research Director & IRS Practice Lead',
        credentials: 'EA',
        bio: 'David Chen is an IRS Enrolled Agent (EA) with 15+ years of experience representing taxpayers before the IRS in audits, collections, and appeals. He specializes in self-employment tax, quarterly estimated payments, independent contractor classification, and IRS dispute resolution. David is a member of the National Association of Enrolled Agents (NAEA) and the California Society of Enrolled Agents. He holds a Master of Taxation (MTax) from San Jose State University and has completed advanced coursework in IRS Circular 230 ethics. David regularly contributes to tax policy analysis and has been quoted in publications including Tax Notes and the Wall Street Journal tax section.',
        url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/about#david-chen`,
        sameAs: [
            'https://www.linkedin.com/in/davidchenea/',
            'https://www.naea.org/'
        ],
        image: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/author-david-chen.webp`,
        knowsAbout: [
            'Self-Employment Tax',
            'Estimated Tax Payments',
            'IRS Representation',
            'Tax Audits',
            '1099 Tax Compliance',
            'Independent Contractor Tax',
            'IRS Collections',
            'Offer in Compromise'
        ],
        worksFor: {
            name: 'TheTaxCalc',
            url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]
        }
    },
    'sarah-johnson': {
        id: 'sarah-johnson',
        name: 'Sarah Johnson',
        title: 'Financial Planning Specialist & Retirement Tax Strategist',
        credentials: 'CFP®',
        bio: 'Sarah Johnson is a CERTIFIED FINANCIAL PLANNER™ (CFP®) professional with over 10 years of experience helping individuals optimize their retirement savings, investment tax strategies, and long-term wealth building. She specializes in 401(k) optimization, Roth conversion strategies, capital gains harvesting, and required minimum distribution (RMD) planning. Sarah is a member of the Financial Planning Association (FPA) and holds the Chartered Retirement Planning Counselor (CRPC®) designation. She earned her BS in Finance from Indiana University and completed the CFP® certification program at Northwestern University. Sarah has presented at the FPA Annual Conference and contributes regularly to retirement planning publications.',
        url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/about#sarah-johnson`,
        sameAs: [
            'https://www.linkedin.com/in/sarahjohnsoncfp/',
            'https://www.financialplanningassociation.org/'
        ],
        image: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/author-sarah-johnson.webp`,
        knowsAbout: [
            'Retirement Planning',
            '401(k) Optimization',
            'Capital Gains Tax',
            'Investment Tax Strategy',
            'IRS Withholding',
            'Tax-Advantaged Accounts',
            'Roth Conversions',
            'RMD Planning'
        ],
        worksFor: {
            name: 'TheTaxCalc',
            url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]
        }
    }
};
function getAuthor(id) {
    return AUTHORS[id];
}
function getCalculatorAuthor() {
    return AUTHORS['rachel-mitchell'];
}
function getSelfEmploymentAuthor() {
    return AUTHORS['david-chen'];
}
function getRetirementAuthor() {
    return AUTHORS['sarah-johnson'];
}
function getAuthorForCalculator(calculatorType) {
    const retirementTypes = [
        'retirement',
        'capital-gains',
        'irs-withholding'
    ];
    const selfEmploymentTypes = [
        'self-employment',
        'overtime',
        'bonus-tax'
    ];
    if (retirementTypes.includes(calculatorType)) {
        return getRetirementAuthor();
    }
    if (selfEmploymentTypes.includes(calculatorType)) {
        return getSelfEmploymentAuthor();
    }
    return getCalculatorAuthor();
}
function authorToJsonLd(author) {
    const schema = {
        '@type': 'Person',
        name: author.name,
        url: author.url,
        jobTitle: `${author.title}, ${author.credentials}`,
        description: author.bio,
        knowsAbout: author.knowsAbout,
        sameAs: author.sameAs,
        worksFor: {
            '@type': 'Organization',
            name: author.worksFor.name,
            url: author.worksFor.url
        }
    };
    if (author.image) {
        schema.image = author.image;
    }
    return schema;
}
}),
"[project]/src/components/finance/author-bio-card.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthorBioCard",
    ()=>AuthorBioCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authors.ts [app-rsc] (ecmascript)");
;
;
;
function AuthorBioCard({ authorId, variant = 'light' }) {
    const author = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthor"])(authorId);
    if (!author) {
        return null;
    }
    const ink = variant === 'ink';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": `Author: ${author.name}`,
        className: `rounded-xl border p-5 sm:p-6 ${ink ? 'border-[#c9a961]/25 bg-white/[0.04]' : 'border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-card/80'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-4",
            children: [
                author.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: author.image,
                    alt: `${author.name}, ${author.credentials}`,
                    width: 48,
                    height: 48,
                    className: `h-12 w-12 shrink-0 rounded-full object-cover ring-1 ${ink ? 'ring-[#c9a961]/40' : 'ring-emerald-500/30'}`,
                    loading: "lazy"
                }, void 0, false, {
                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-1 ${ink ? 'bg-[#c9a961]/15 text-[#c9a961] ring-[#c9a961]/30' : 'bg-emerald-600/15 text-emerald-600 ring-emerald-500/30'}`,
                    children: author.name.split(' ').map((n)=>n[0]).join('')
                }, void 0, false, {
                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/about#${author.id}`,
                                    className: `text-base font-semibold transition-colors ${ink ? 'text-stone-100 hover:text-[#c9a961]' : 'text-foreground hover:text-emerald-600'}`,
                                    children: author.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${ink ? 'bg-[#c9a961]/15 text-[#c9a961] ring-[#c9a961]/25' : 'bg-emerald-600/15 text-emerald-600 ring-emerald-500/25'}`,
                                    children: author.credentials
                                }, void 0, false, {
                                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `mt-0.5 text-sm ${ink ? 'text-stone-400' : 'text-muted-foreground'}`,
                            children: [
                                author.title,
                                ", TheTaxCalc"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `mt-2 text-sm leading-relaxed line-clamp-2 ${ink ? 'text-stone-400' : 'text-muted-foreground'}`,
                            children: author.bio
                        }, void 0, false, {
                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${ink ? 'text-stone-400' : 'text-muted-foreground'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: `h-3 w-3 ${ink ? 'text-[#c9a961]/70' : 'text-emerald-700/60'}`,
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            strokeWidth: 2,
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, this),
                                        "Reviewed: January 2026"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Tax data verified against IRS Publication 15-T & state revenue departments"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/finance/author-bio-card.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/finance/author-bio-card.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/state-sales-tax-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared State Sales Tax Data for all 50 US states.
 * Used by both Server and Client components.
 * NO 'use client' — this module is universal.
 *
 * ─── Anti-doorway content strategy ──────────────────────────────────────────
 * The 50 state pages must read as different articles that happen to share a
 * data source. Generated prose varies along five dimensions:
 *   1. Region     — 4 narrative frames (Northeast / Midwest / South / West)
 *   2. Tier       — combined-rate tier: high (top 10) / mid / low (bottom 13)
 *   3. Local tax  — bucket: zero / low / moderate / high average local layer
 *   4. Exemptions — each grocery/Rx/clothing combination gets distinct prose
 *   5. Variant    — deterministic per-state index rotates phrasings & order
 * Ranks, national averages, nearest-neighbor comparisons and superlatives are
 * computed at module load from STATE_SALES_TAX itself — no hand-typed numbers.
 */ // ─── Types ───────────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "ALL_STATE_KEYS",
    ()=>ALL_STATE_KEYS,
    "STATE_SALES_TAX",
    ()=>STATE_SALES_TAX,
    "getStateContent",
    ()=>getStateContent,
    "getStateJsonLd",
    ()=>getStateJsonLd,
    "getStateSEOMeta",
    ()=>getStateSEOMeta,
    "salesTaxSlugToStateKey",
    ()=>salesTaxSlugToStateKey,
    "stateKeyToSlug",
    ()=>stateKeyToSlug
]);
const STATE_SALES_TAX = {
    alabama: {
        name: 'Alabama',
        abbreviation: 'AL',
        stateRate: 0.04,
        avgLocalRate: 0.0524,
        combinedRate: 0.0924,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    alaska: {
        name: 'Alaska',
        abbreviation: 'AK',
        stateRate: 0,
        avgLocalRate: 0.0182,
        combinedRate: 0.0182,
        noStateTax: true,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    arizona: {
        name: 'Arizona',
        abbreviation: 'AZ',
        stateRate: 0.056,
        avgLocalRate: 0.028,
        combinedRate: 0.0840,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    arkansas: {
        name: 'Arkansas',
        abbreviation: 'AR',
        stateRate: 0.065,
        avgLocalRate: 0.0297,
        combinedRate: 0.0947,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    california: {
        name: 'California',
        abbreviation: 'CA',
        stateRate: 0.0725,
        avgLocalRate: 0.0157,
        combinedRate: 0.0882,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    colorado: {
        name: 'Colorado',
        abbreviation: 'CO',
        stateRate: 0.029,
        avgLocalRate: 0.0488,
        combinedRate: 0.0778,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    connecticut: {
        name: 'Connecticut',
        abbreviation: 'CT',
        stateRate: 0.0635,
        avgLocalRate: 0,
        combinedRate: 0.0635,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    delaware: {
        name: 'Delaware',
        abbreviation: 'DE',
        stateRate: 0,
        avgLocalRate: 0,
        combinedRate: 0,
        noStateTax: true,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    florida: {
        name: 'Florida',
        abbreviation: 'FL',
        stateRate: 0.06,
        avgLocalRate: 0.0102,
        combinedRate: 0.0702,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    georgia: {
        name: 'Georgia',
        abbreviation: 'GA',
        stateRate: 0.04,
        avgLocalRate: 0.034,
        combinedRate: 0.0740,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    hawaii: {
        name: 'Hawaii',
        abbreviation: 'HI',
        stateRate: 0.04,
        avgLocalRate: 0.0044,
        combinedRate: 0.0444,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    idaho: {
        name: 'Idaho',
        abbreviation: 'ID',
        stateRate: 0.06,
        avgLocalRate: 0.0003,
        combinedRate: 0.0603,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    illinois: {
        name: 'Illinois',
        abbreviation: 'IL',
        stateRate: 0.0625,
        avgLocalRate: 0.0261,
        combinedRate: 0.0886,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    indiana: {
        name: 'Indiana',
        abbreviation: 'IN',
        stateRate: 0.07,
        avgLocalRate: 0,
        combinedRate: 0.0700,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    iowa: {
        name: 'Iowa',
        abbreviation: 'IA',
        stateRate: 0.06,
        avgLocalRate: 0.0094,
        combinedRate: 0.0694,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    kansas: {
        name: 'Kansas',
        abbreviation: 'KS',
        stateRate: 0.065,
        avgLocalRate: 0.022,
        combinedRate: 0.0870,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    kentucky: {
        name: 'Kentucky',
        abbreviation: 'KY',
        stateRate: 0.06,
        avgLocalRate: 0,
        combinedRate: 0.0600,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    louisiana: {
        name: 'Louisiana',
        abbreviation: 'LA',
        stateRate: 0.05,
        avgLocalRate: 0.0456,
        combinedRate: 0.0956,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    maine: {
        name: 'Maine',
        abbreviation: 'ME',
        stateRate: 0.055,
        avgLocalRate: 0,
        combinedRate: 0.0550,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    maryland: {
        name: 'Maryland',
        abbreviation: 'MD',
        stateRate: 0.06,
        avgLocalRate: 0,
        combinedRate: 0.0600,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    massachusetts: {
        name: 'Massachusetts',
        abbreviation: 'MA',
        stateRate: 0.0625,
        avgLocalRate: 0,
        combinedRate: 0.0625,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    michigan: {
        name: 'Michigan',
        abbreviation: 'MI',
        stateRate: 0.06,
        avgLocalRate: 0,
        combinedRate: 0.0600,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    minnesota: {
        name: 'Minnesota',
        abbreviation: 'MN',
        stateRate: 0.06875,
        avgLocalRate: 0.00615,
        combinedRate: 0.0749,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    mississippi: {
        name: 'Mississippi',
        abbreviation: 'MS',
        stateRate: 0.07,
        avgLocalRate: 0.0007,
        combinedRate: 0.0707,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    missouri: {
        name: 'Missouri',
        abbreviation: 'MO',
        stateRate: 0.04225,
        avgLocalRate: 0.04065,
        combinedRate: 0.0829,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    montana: {
        name: 'Montana',
        abbreviation: 'MT',
        stateRate: 0,
        avgLocalRate: 0,
        combinedRate: 0,
        noStateTax: true,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    nebraska: {
        name: 'Nebraska',
        abbreviation: 'NE',
        stateRate: 0.055,
        avgLocalRate: 0.0145,
        combinedRate: 0.0695,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    nevada: {
        name: 'Nevada',
        abbreviation: 'NV',
        stateRate: 0.0685,
        avgLocalRate: 0.0138,
        combinedRate: 0.0823,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    newhampshire: {
        name: 'New Hampshire',
        abbreviation: 'NH',
        stateRate: 0,
        avgLocalRate: 0,
        combinedRate: 0,
        noStateTax: true,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    newjersey: {
        name: 'New Jersey',
        abbreviation: 'NJ',
        stateRate: 0.06625,
        avgLocalRate: -0.00025,
        combinedRate: 0.066,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    newmexico: {
        name: 'New Mexico',
        abbreviation: 'NM',
        stateRate: 0.05125,
        avgLocalRate: 0.02715,
        combinedRate: 0.0784,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    newyork: {
        name: 'New York',
        abbreviation: 'NY',
        stateRate: 0.04,
        avgLocalRate: 0.0452,
        combinedRate: 0.0852,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    northcarolina: {
        name: 'North Carolina',
        abbreviation: 'NC',
        stateRate: 0.0475,
        avgLocalRate: 0.0223,
        combinedRate: 0.0698,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    northdakota: {
        name: 'North Dakota',
        abbreviation: 'ND',
        stateRate: 0.05,
        avgLocalRate: 0.0185,
        combinedRate: 0.0685,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    ohio: {
        name: 'Ohio',
        abbreviation: 'OH',
        stateRate: 0.0575,
        avgLocalRate: 0.0148,
        combinedRate: 0.0723,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    oklahoma: {
        name: 'Oklahoma',
        abbreviation: 'OK',
        stateRate: 0.045,
        avgLocalRate: 0.0437,
        combinedRate: 0.0887,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    oregon: {
        name: 'Oregon',
        abbreviation: 'OR',
        stateRate: 0,
        avgLocalRate: 0,
        combinedRate: 0,
        noStateTax: true,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    pennsylvania: {
        name: 'Pennsylvania',
        abbreviation: 'PA',
        stateRate: 0.06,
        avgLocalRate: 0.0034,
        combinedRate: 0.0634,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: true
    },
    rhodeisland: {
        name: 'Rhode Island',
        abbreviation: 'RI',
        stateRate: 0.07,
        avgLocalRate: 0,
        combinedRate: 0.0700,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    southcarolina: {
        name: 'South Carolina',
        abbreviation: 'SC',
        stateRate: 0.06,
        avgLocalRate: 0.0144,
        combinedRate: 0.0744,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    southdakota: {
        name: 'South Dakota',
        abbreviation: 'SD',
        stateRate: 0.045,
        avgLocalRate: 0.019,
        combinedRate: 0.0640,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    tennessee: {
        name: 'Tennessee',
        abbreviation: 'TN',
        stateRate: 0.07,
        avgLocalRate: 0.0256,
        combinedRate: 0.0956,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    texas: {
        name: 'Texas',
        abbreviation: 'TX',
        stateRate: 0.0625,
        avgLocalRate: 0.0195,
        combinedRate: 0.0820,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    utah: {
        name: 'Utah',
        abbreviation: 'UT',
        stateRate: 0.061,
        avgLocalRate: 0.0109,
        combinedRate: 0.0719,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    vermont: {
        name: 'Vermont',
        abbreviation: 'VT',
        stateRate: 0.06,
        avgLocalRate: 0.0036,
        combinedRate: 0.0636,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    virginia: {
        name: 'Virginia',
        abbreviation: 'VA',
        stateRate: 0.043,
        avgLocalRate: 0.0145,
        combinedRate: 0.0575,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    washington: {
        name: 'Washington',
        abbreviation: 'WA',
        stateRate: 0.065,
        avgLocalRate: 0.0291,
        combinedRate: 0.0941,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    westvirginia: {
        name: 'West Virginia',
        abbreviation: 'WV',
        stateRate: 0.06,
        avgLocalRate: 0.0055,
        combinedRate: 0.0655,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    wisconsin: {
        name: 'Wisconsin',
        abbreviation: 'WI',
        stateRate: 0.05,
        avgLocalRate: 0.0046,
        combinedRate: 0.0546,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    },
    wyoming: {
        name: 'Wyoming',
        abbreviation: 'WY',
        stateRate: 0.04,
        avgLocalRate: 0.0136,
        combinedRate: 0.0536,
        noStateTax: false,
        groceryExempt: true,
        prescriptionDrugExempt: true,
        clothingExempt: false
    }
};
const ALL_STATE_KEYS = Object.keys(STATE_SALES_TAX);
function stateKeyToSlug(stateKey) {
    const name = STATE_SALES_TAX[stateKey]?.name;
    return name ? name.toLowerCase().replace(/\s+/g, '-') : stateKey;
}
function salesTaxSlugToStateKey(slug) {
    if (STATE_SALES_TAX[slug]) return slug; // legacy direct key
    const normalized = slug.toLowerCase().replace(/-/g, ' ');
    for (const k of ALL_STATE_KEYS){
        if (STATE_SALES_TAX[k].name.toLowerCase() === normalized) return k;
    }
    return null;
}
// ─── Helper ──────────────────────────────────────────────────────────────────
function pct(rate) {
    return (rate * 100).toFixed(2);
}
function formatRate(rate) {
    return (rate * 100).toFixed(rate * 100 % 1 === 0 ? 0 : 2);
}
/** $1,234.56-style money formatting for generated examples. */ function money(amount, decimals = 2) {
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}
// ─── Neighboring States Map ──────────────────────────────────────────────────
const NEIGHBOR_MAP = {
    alabama: [
        'mississippi',
        'tennessee',
        'georgia',
        'florida'
    ],
    alaska: [
        'washington',
        'hawaii',
        'oregon',
        'montana'
    ],
    arizona: [
        'california',
        'nevada',
        'utah',
        'newmexico'
    ],
    arkansas: [
        'missouri',
        'tennessee',
        'mississippi',
        'louisiana',
        'texas',
        'oklahoma'
    ],
    california: [
        'oregon',
        'nevada',
        'arizona'
    ],
    colorado: [
        'wyoming',
        'nebraska',
        'kansas',
        'oklahoma',
        'newmexico',
        'arizona',
        'utah'
    ],
    connecticut: [
        'newyork',
        'massachusetts',
        'rhodeisland'
    ],
    delaware: [
        'maryland',
        'pennsylvania',
        'newjersey'
    ],
    florida: [
        'georgia',
        'alabama'
    ],
    georgia: [
        'florida',
        'alabama',
        'tennessee',
        'northcarolina',
        'southcarolina'
    ],
    hawaii: [
        'california',
        'alaska',
        'washington'
    ],
    idaho: [
        'montana',
        'wyoming',
        'utah',
        'nevada',
        'oregon',
        'washington'
    ],
    illinois: [
        'wisconsin',
        'indiana',
        'kentucky',
        'missouri',
        'iowa'
    ],
    indiana: [
        'michigan',
        'ohio',
        'kentucky',
        'illinois'
    ],
    iowa: [
        'minnesota',
        'wisconsin',
        'illinois',
        'missouri',
        'nebraska',
        'southdakota'
    ],
    kansas: [
        'nebraska',
        'missouri',
        'oklahoma',
        'colorado'
    ],
    kentucky: [
        'illinois',
        'indiana',
        'ohio',
        'westvirginia',
        'virginia',
        'tennessee',
        'missouri'
    ],
    louisiana: [
        'texas',
        'arkansas',
        'mississippi'
    ],
    maine: [
        'newhampshire',
        'massachusetts'
    ],
    maryland: [
        'pennsylvania',
        'delaware',
        'virginia',
        'westvirginia'
    ],
    massachusetts: [
        'rhodeisland',
        'connecticut',
        'newyork',
        'newhampshire',
        'vermont'
    ],
    michigan: [
        'wisconsin',
        'indiana',
        'ohio'
    ],
    minnesota: [
        'northdakota',
        'southdakota',
        'iowa',
        'wisconsin'
    ],
    mississippi: [
        'tennessee',
        'alabama',
        'louisiana',
        'arkansas'
    ],
    missouri: [
        'iowa',
        'illinois',
        'kentucky',
        'tennessee',
        'arkansas',
        'oklahoma',
        'kansas',
        'nebraska'
    ],
    montana: [
        'northdakota',
        'southdakota',
        'wyoming',
        'idaho'
    ],
    nebraska: [
        'southdakota',
        'iowa',
        'missouri',
        'kansas',
        'colorado',
        'wyoming'
    ],
    nevada: [
        'oregon',
        'idaho',
        'utah',
        'arizona',
        'california'
    ],
    newhampshire: [
        'maine',
        'massachusetts',
        'vermont'
    ],
    newjersey: [
        'newyork',
        'pennsylvania',
        'delaware'
    ],
    newmexico: [
        'colorado',
        'oklahoma',
        'texas',
        'arizona'
    ],
    newyork: [
        'pennsylvania',
        'newjersey',
        'connecticut',
        'massachusetts',
        'vermont'
    ],
    northcarolina: [
        'virginia',
        'tennessee',
        'georgia',
        'southcarolina'
    ],
    northdakota: [
        'minnesota',
        'southdakota',
        'montana'
    ],
    ohio: [
        'michigan',
        'pennsylvania',
        'westvirginia',
        'kentucky',
        'indiana'
    ],
    oklahoma: [
        'kansas',
        'missouri',
        'arkansas',
        'texas',
        'newmexico',
        'colorado'
    ],
    oregon: [
        'washington',
        'idaho',
        'nevada',
        'california'
    ],
    pennsylvania: [
        'newyork',
        'newjersey',
        'delaware',
        'maryland',
        'westvirginia',
        'ohio'
    ],
    rhodeisland: [
        'connecticut',
        'massachusetts'
    ],
    southcarolina: [
        'northcarolina',
        'georgia'
    ],
    southdakota: [
        'northdakota',
        'minnesota',
        'iowa',
        'nebraska',
        'wyoming',
        'montana'
    ],
    tennessee: [
        'kentucky',
        'virginia',
        'northcarolina',
        'georgia',
        'alabama',
        'mississippi',
        'arkansas',
        'missouri'
    ],
    texas: [
        'newmexico',
        'oklahoma',
        'arkansas',
        'louisiana'
    ],
    utah: [
        'idaho',
        'wyoming',
        'colorado',
        'newmexico',
        'arizona',
        'nevada'
    ],
    vermont: [
        'newyork',
        'massachusetts',
        'newhampshire'
    ],
    virginia: [
        'maryland',
        'westvirginia',
        'kentucky',
        'tennessee',
        'northcarolina'
    ],
    washington: [
        'idaho',
        'oregon'
    ],
    westvirginia: [
        'pennsylvania',
        'ohio',
        'kentucky',
        'virginia',
        'maryland'
    ],
    wisconsin: [
        'minnesota',
        'iowa',
        'illinois',
        'michigan'
    ],
    wyoming: [
        'montana',
        'southdakota',
        'nebraska',
        'colorado',
        'utah',
        'idaho'
    ]
};
function getRelatedStates(stateKey) {
    const neighbors = NEIGHBOR_MAP[stateKey] || [];
    const result = neighbors.slice(0, 5).map((key)=>{
        const st = STATE_SALES_TAX[key];
        return {
            slug: key,
            label: st ? `${st.name} (${st.noStateTax ? '0%' : pct(st.combinedRate) + '%'})` : key
        };
    });
    // Always include the main sales tax page
    return result;
}
const REGION_OF = {
    connecticut: 'Northeast',
    maine: 'Northeast',
    massachusetts: 'Northeast',
    newhampshire: 'Northeast',
    newjersey: 'Northeast',
    newyork: 'Northeast',
    pennsylvania: 'Northeast',
    rhodeisland: 'Northeast',
    vermont: 'Northeast',
    illinois: 'Midwest',
    indiana: 'Midwest',
    iowa: 'Midwest',
    kansas: 'Midwest',
    michigan: 'Midwest',
    minnesota: 'Midwest',
    missouri: 'Midwest',
    nebraska: 'Midwest',
    northdakota: 'Midwest',
    ohio: 'Midwest',
    southdakota: 'Midwest',
    wisconsin: 'Midwest',
    alabama: 'South',
    arkansas: 'South',
    delaware: 'South',
    florida: 'South',
    georgia: 'South',
    kentucky: 'South',
    louisiana: 'South',
    maryland: 'South',
    mississippi: 'South',
    northcarolina: 'South',
    oklahoma: 'South',
    southcarolina: 'South',
    tennessee: 'South',
    texas: 'South',
    virginia: 'South',
    westvirginia: 'South',
    alaska: 'West',
    arizona: 'West',
    california: 'West',
    colorado: 'West',
    hawaii: 'West',
    idaho: 'West',
    montana: 'West',
    nevada: 'West',
    newmexico: 'West',
    oregon: 'West',
    utah: 'West',
    washington: 'West',
    wyoming: 'West'
};
function ordinal(n) {
    const s = [
        'th',
        'st',
        'nd',
        'rd'
    ];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
/** Competition ranking (ties share a rank); rank 1 = highest value. */ function rankBy(field) {
    const keys = [
        ...ALL_STATE_KEYS
    ].sort((a, b)=>STATE_SALES_TAX[b][field] - STATE_SALES_TAX[a][field]);
    const ranks = {};
    let lastVal = null;
    let lastRank = 0;
    keys.forEach((k, i)=>{
        const val = STATE_SALES_TAX[k][field];
        const rank = lastVal !== null && val === lastVal ? lastRank : i + 1;
        ranks[k] = rank;
        lastVal = val;
        lastRank = rank;
    });
    return ranks;
}
const COMBINED_RANK = rankBy('combinedRate');
const LOCAL_RANK = rankBy('avgLocalRate');
const STATE_RATE_RANK = rankBy('stateRate');
const TAXING_STATE_KEYS = ALL_STATE_KEYS.filter((k)=>!STATE_SALES_TAX[k].noStateTax);
const NATIONAL_AVG_COMBINED = ALL_STATE_KEYS.reduce((sum, k)=>sum + STATE_SALES_TAX[k].combinedRate, 0) / ALL_STATE_KEYS.length;
const MAX_COMBINED = Math.max(...ALL_STATE_KEYS.map((k)=>STATE_SALES_TAX[k].combinedRate));
const MAX_COMBINED_HOLDERS = ALL_STATE_KEYS.filter((k)=>STATE_SALES_TAX[k].combinedRate === MAX_COMBINED);
const MIN_COMBINED_TAXED = Math.min(...TAXING_STATE_KEYS.map((k)=>STATE_SALES_TAX[k].combinedRate));
const MIN_COMBINED_TAXED_HOLDERS = TAXING_STATE_KEYS.filter((k)=>STATE_SALES_TAX[k].combinedRate === MIN_COMBINED_TAXED);
const MAX_STATE_RATE = Math.max(...ALL_STATE_KEYS.map((k)=>STATE_SALES_TAX[k].stateRate));
const MAX_STATE_RATE_HOLDERS = ALL_STATE_KEYS.filter((k)=>STATE_SALES_TAX[k].stateRate === MAX_STATE_RATE);
const MIN_STATE_RATE_TAXED = Math.min(...TAXING_STATE_KEYS.map((k)=>STATE_SALES_TAX[k].stateRate));
const MIN_STATE_RATE_TAXED_HOLDERS = TAXING_STATE_KEYS.filter((k)=>STATE_SALES_TAX[k].stateRate === MIN_STATE_RATE_TAXED);
const MAX_LOCAL = Math.max(...ALL_STATE_KEYS.map((k)=>STATE_SALES_TAX[k].avgLocalRate));
const MAX_LOCAL_HOLDERS = ALL_STATE_KEYS.filter((k)=>STATE_SALES_TAX[k].avgLocalRate === MAX_LOCAL);
const CLOTHING_EXEMPT_COUNT = ALL_STATE_KEYS.filter((k)=>STATE_SALES_TAX[k].clothingExempt).length;
function tierOf(stateKey) {
    const rank = COMBINED_RANK[stateKey];
    if (rank <= 10) return 'high';
    if (rank >= 38) return 'low';
    return 'mid';
}
function localBucketOf(state) {
    if (state.avgLocalRate <= 0.0005) return 'zero';
    if (state.avgLocalRate <= 0.015) return 'low';
    if (state.avgLocalRate <= 0.03) return 'moderate';
    return 'high';
}
/** Stable string hash used to decorrelate the variant rotation below. */ function hashKey(s) {
    let h = 5381;
    for(let i = 0; i < s.length; i++)h = (h * 33 ^ s.charCodeAt(i)) >>> 0;
    return h;
}
/**
 * Second, independent hash. Two states whose primary hashes share a residue
 * (mod 3 or mod 4) would otherwise land on the same template variant for
 * EVERY salt — mixing this in makes the effective salt state-dependent.
 */ function hashKey2(s) {
    let h = 97;
    for(let i = 0; i < s.length; i++)h = h * 31 + s.charCodeAt(i) >>> 0;
    return h;
}
/**
 * Deterministic per-state rotation index. Different paragraph builders salt
 * the hash differently (combined rank, local rank, state-rate rank…) so two
 * states that share a region frame rarely share the exemption, local-tax or
 * FAQ phrasing as well — same-group pages never collapse into one template.
 */ function idx(stateKey, salt) {
    return (hashKey(stateKey) + salt * (1 + hashKey2(stateKey) % 7)) % 3;
}
/** Wider 4-slot rotation for the most-shared templates. */ function idx4(stateKey, salt) {
    return (hashKey(stateKey) + salt * (1 + hashKey2(stateKey) % 7)) % 4;
}
function variantOf(stateKey) {
    return idx(stateKey, COMBINED_RANK[stateKey]);
}
/** The n states whose combined rate is numerically closest to this state's. */ function nearestByRate(stateKey, n = 2, taxingOnly = false) {
    const target = STATE_SALES_TAX[stateKey].combinedRate;
    return ALL_STATE_KEYS.filter((k)=>k !== stateKey && (!taxingOnly || !STATE_SALES_TAX[k].noStateTax)).sort((a, b)=>Math.abs(STATE_SALES_TAX[a].combinedRate - target) - Math.abs(STATE_SALES_TAX[b].combinedRate - target)).slice(0, n);
}
function nearestLink(stateKey) {
    return `<a href="/sales-tax-calculator/${stateKeyToSlug(stateKey)}">${STATE_SALES_TAX[stateKey].name}</a>`;
}
// ─── Curated Structural Quirks (facts, no numbers beyond dataset values) ─────
const STRUCTURAL_QUIRKS = {
    colorado: 'Colorado is a "home rule" sales tax state: many cities set, collect, and audit their own sales tax separately from the state. A receipt inside city limits can carry a different rate — and a different collector — than one from an unincorporated area a mile away.',
    newyork: 'New York exempts most clothing and footwear purchases under $110 per item — a rare per-item price cap on a clothing exemption. Back-to-school trips to the mall are noticeably cheaper than the sticker math suggests.',
    pennsylvania: 'Pennsylvania exempts most everyday clothing outright, with no per-item price cap — unlike neighboring New York, which cuts the exemption off above a threshold. Wardrobe basics ring up tax-free on both sides of the state line, big-ticket formalwear only in Pennsylvania.',
    illinois: 'Illinois is a recent convert to grocery relief: after decades of taxing food at a special reduced rate, the state eliminated its grocery tax entirely. Groceries now ring up exempt, right alongside prescription drugs.',
    missouri: 'Missouri puts local sales taxes on the ballot. Cities, counties, and special districts generally need voter approval before adding their slice, which is a big reason rates swing so much from town to town within the state.',
    minnesota: 'Minnesota never taxes everyday clothing — no price cap, no seasonal holidays, just exempt. Combined with untaxed groceries and prescriptions, the sales tax in Minnesota lands almost entirely on non-essential spending.',
    massachusetts: 'Massachusetts leaves everyday clothing untaxed, which takes some of the sting out of its statewide rate for wardrobe-heavy households. Groceries and prescriptions are exempt too.',
    louisiana: 'Louisiana calls its counties parishes, and parishes, cities, and special districts all stack their own rates on top of the state base. The local layer does most of the work in the final combined rate.',
    newjersey: 'New Jersey keeps the register simple: no city or county adds sales tax on top of the state rate, so the percentage on a receipt in Camden is identical to one in Hoboken.'
};
function getStateSEOMeta(stateKey) {
    const state = STATE_SALES_TAX[stateKey];
    if (!state) {
        return {
            metaTitle: 'State Sales Tax Calculator Not Found',
            metaDesc: 'State sales tax calculator not found.',
            h1: 'State Not Found',
            ogTitle: 'State Not Found',
            ogDescription: 'State not found.',
            keywords: [],
            canonicalPath: '/sales-tax-calculator',
            breadcrumbLabel: 'Not Found'
        };
    }
    const name = state.name;
    const abbr = state.abbreviation;
    // Use abbreviation for metaTitle if full name would exceed 47 chars (47 + " | TheTaxCalc" = 60)
    const titleName = name.length > 14 ? abbr : name;
    if (state.noStateTax) {
        return {
            metaTitle: `Free ${titleName} Sales Tax Calculator 2026 | 0% Rate`,
            metaDesc: `Free ${name} sales tax calculator 2026. 0% state sales tax${state.abbreviation === 'AK' ? ', local avg 1.82%' : ''}. No sign-up.`,
            h1: `${name} Sales Tax Calculator`,
            ogTitle: `${name} Sales Tax 2026 | 0% State`,
            ogDescription: `Free ${name} sales tax calculator. ${name} has no state sales tax. See details and exemptions. No sign-up required.`,
            keywords: [
                `${name} sales tax calculator`,
                `${name} sales tax rate`,
                `${abbr} sales tax`,
                `${name} no sales tax`,
                `${name} 0% sales tax`,
                `sales tax in ${name}`,
                `${name} tax exempt`,
                `${name} shopping tax`,
                `${name} sales tax 2026`,
                `${name.toLowerCase()} sales tax calculator`
            ],
            canonicalPath: `/sales-tax-calculator/${stateKeyToSlug(stateKey)}`,
            breadcrumbLabel: `${name} Sales Tax`
        };
    }
    const statePct = formatRate(state.stateRate);
    const localPct = formatRate(Math.max(0, state.avgLocalRate));
    const combinedPct = pct(state.combinedRate);
    const tier = tierOf(stateKey);
    const noLocal = localBucketOf(state) === 'zero';
    // Tail phrase varies by tier/local profile so even meta descriptions differ.
    let tail;
    if (noLocal) {
        tail = `Same rate in every city. No sign-up.`;
    } else if (tier === 'high') {
        tail = `Top-10 rate nationally. No sign-up.`;
    } else if (tier === 'low') {
        tail = `Below the ${pct(NATIONAL_AVG_COMBINED)}% US average. No sign-up.`;
    } else {
        tail = `Reverse calc & exemptions. No sign-up.`;
    }
    const core = noLocal ? `Free ${name} sales tax calculator 2026. ${statePct}% statewide rate — ${combinedPct}% is the whole number.` : `Free ${name} sales tax calculator 2026. ${statePct}% state + ${localPct}% local = ${combinedPct}% combined.`;
    return {
        metaTitle: `Free ${titleName} Sales Tax Calculator 2026 | ${combinedPct}% Combined`,
        metaDesc: `${core} ${tail}`,
        h1: `${name} Sales Tax Calculator`,
        ogTitle: `${name} Sales Tax 2026 | ${statePct}%${noLocal ? ' Statewide' : ' + Local'}`,
        ogDescription: `Free ${name} sales tax calculator. ${core.replace(`Free ${name} sales tax calculator 2026. `, '')} ${tail}`,
        keywords: [
            `${name} sales tax calculator`,
            `${name} sales tax rate`,
            `${abbr} sales tax`,
            `${name} state sales tax`,
            `${name} local sales tax`,
            `${name} combined sales tax`,
            `${name} sales tax percentage`,
            `sales tax in ${name}`,
            `${name} tax rate 2026`,
            `${name.toLowerCase()} sales tax calculator`,
            `how much is sales tax in ${name}`,
            `${name} city tax rate`
        ],
        canonicalPath: `/sales-tax-calculator/${stateKeyToSlug(stateKey)}`,
        breadcrumbLabel: `${name} Sales Tax`
    };
}
// ─── Paragraph Builders ──────────────────────────────────────────────────────
function buildOpeningFrame(stateKey, state) {
    const name = state.name;
    const region = REGION_OF[stateKey] ?? 'South';
    const tier = tierOf(stateKey);
    const v = variantOf(stateKey);
    const statePct = formatRate(state.stateRate);
    const localPct = formatRate(Math.max(0, state.avgLocalRate));
    const combinedPct = pct(state.combinedRate);
    const rank = COMBINED_RANK[stateKey];
    const taxOn1000 = (1000 * state.combinedRate).toFixed(2);
    const noLocal = localBucketOf(state) === 'zero';
    if (region === 'Northeast') {
        if (v === 0) {
            return `The Northeast squeezes a dozen different sales tax systems into a region you can drive across in a single day, and ${name} sits right in the middle of that patchwork. Its base rate is ${statePct}%${noLocal ? ` — and, unlike some of its neighbors, nothing gets layered on top: no county rate, no city rate, no special district. The percentage printed on a ${name} receipt is the same from one end of the state to the other` : `, with local taxes averaging another ${localPct}% on top of it`}. All in, shoppers in ${name} pay about ${combinedPct}% — call it $${taxOn1000} in tax on a $1,000 purchase.`;
        }
        if (v === 1) {
            return `State lines matter enormously in the Northeast: cross one and the tax on the very same shopping cart can shift by several percentage points. ${name}'s combined rate lands at ${combinedPct}% — ${noLocal ? `a flat ${statePct}% statewide, with no local add-ons at all` : `${statePct}% statewide plus an average of ${localPct}% in local taxes`} — which ranks #${rank} of the 50 states. A $1,000 basket of goods picks up about $${taxOn1000} at the register.`;
        }
        return `In the Northeast, rate differences between states dwarf the differences within them, and ${name} keeps its internal picture simple: ${statePct}% statewide${noLocal ? ' and no local add-ons on top' : ` plus ${localPct}% average local tax`}, a combined ${combinedPct}%, #${rank} of 50. The $1,000 math works out to about $${taxOn1000} — and since groceries are exempt, the weekly food run isn't part of it.`;
    }
    if (region === 'Midwest') {
        if (v === 0) {
            return `Midwest sales tax tends to run on rails: a clear statewide rate, predictable county add-ons, few surprises. ${name} fits that mold with a ${statePct}% state rate${noLocal ? ` — and, in classic Plains fashion, nothing stacked on top of it. Every register in the state shows the same ${combinedPct}%` : ` plus about ${localPct}% in average local taxes, which is how the typical combined rate gets to ${combinedPct}%`}. Either way, $1,000 at the counter means roughly $${taxOn1000} in sales tax.`;
        }
        if (v === 1) {
            return `${name} carries the #${rank}-highest sales tax burden in the country at ${combinedPct}% combined — ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'above' : 'below'} the 50-state average of ${pct(NATIONAL_AVG_COMBINED)}%. In typical Midwestern fashion, the number is built from transparent parts: a ${statePct}% statewide base${noLocal ? ' and nothing added locally' : ` and about ${localPct}% in local add-ons`}. The $1,000 checkout example works out to $${taxOn1000} in tax.`;
        }
        return `County-level option is the story across much of the Midwest, and ${name} is part of it: the state sets a ${statePct}% base${noLocal ? ' and local governments here haven\'t added anything — the base is the whole rate' : `, and counties and cities layer an average of ${localPct}% on top, arriving at the usual ${combinedPct}% combined figure`}. Ranked against all 50 states, ${name} sits at #${rank}. A $1,000 purchase at that rate carries $${taxOn1000} in tax.`;
    }
    if (region === 'South') {
        if (v === 0) {
            return `Southern states lean on the sales tax harder than most, and ${name} is part of that pattern: its combined rate averages ${combinedPct}% (${noLocal ? `${statePct}% state rate, nothing added locally` : `${statePct}% state + ${localPct}% local`}), good for #${rank} nationally. The regional silver lining is relief on essentials — groceries are exempt in ${name}, so the ${combinedPct}% applies to what you buy, not what you eat. On a $1,000 purchase, expect about $${taxOn1000} in tax.`;
        }
        if (v === 1) {
            return `Ring up $1,000 of goods in ${name} and the register adds roughly $${taxOn1000} — a ${combinedPct}% combined rate that puts ${name} at #${rank} among the 50 states. The building blocks are a ${statePct}% statewide rate${noLocal ? ' with no local layer at all' : ` plus an average of ${localPct}% in county and city taxes`}. Grocery budgets catch a break, though: like the rest of the South's big grocery-relief states, ${name} doesn't tax food.`;
        }
        return `Ranked #${rank} of 50 states, ${name}'s ${combinedPct}% combined rate sits ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'on the heavy end, even for the South' : 'comparatively gentle for the South'} — the national average is ${pct(NATIONAL_AVG_COMBINED)}%. The number breaks down as ${statePct}% state${noLocal ? ' with nothing added locally' : ` plus ${localPct}% average local tax`}. Groceries stay exempt, as across the South's grocery-relief states, so the rate hits the retail cart, not the kitchen.`;
    }
    // West
    if (v === 0) {
        return `Sales tax in the West runs the full spectrum — neighboring states range from zero-tax to top-ten-heavy — and ${name} lands at ${combinedPct}% combined, #${rank} nationally. That figure stacks a ${statePct}% state rate${noLocal ? ' with no local layer on top' : ` on top of an average ${localPct}% layer of county and city taxes`}. At that rate, a $1,000 purchase picks up about $${taxOn1000} in tax.`;
    }
    if (v === 1) {
        return `${name} runs a ${statePct}% statewide sales tax; with local taxes averaging ${localPct}%, what shoppers actually pay works out to about ${combinedPct}% — the #${rank} combined rate in the country. West of the Rockies that number reads ${tier === 'high' ? 'among the heaviest' : 'on the moderate-to-light end of the spectrum'}, and the essentials stay protected either way: groceries and prescriptions are exempt no matter where in ${name} you shop.`;
    }
    return `The West holds both the lightest and heaviest sales tax states in the country, and ${name} lands in between at ${combinedPct}% combined — #${rank} of 50. The state base is ${statePct}%${noLocal ? ' with no local layer' : `; local jurisdictions add an average of ${localPct}% on top`}. Either way, the $1,000 example lands at about $${taxOn1000}, and exempt groceries keep the weekly food run out of the math.`;
}
function buildRankParagraph(stateKey, state) {
    const name = state.name;
    const v = idx(stateKey, STATE_RATE_RANK[stateKey] + LOCAL_RANK[stateKey]);
    const rank = COMBINED_RANK[stateKey];
    const ord = ordinal(rank);
    const combinedPct = pct(state.combinedRate);
    const avgPct = pct(NATIONAL_AVG_COMBINED);
    const above = state.combinedRate >= NATIONAL_AVG_COMBINED;
    const diffPct = pct(Math.abs(state.combinedRate - NATIONAL_AVG_COMBINED));
    const nearest = nearestByRate(stateKey, 2);
    const n1 = nearest[0];
    const n2 = nearest[1];
    const link1 = nearestLink(n1);
    const link2 = n2 ? nearestLink(n2) : '';
    let core;
    if (v === 0) {
        core = `Where does that put ${name} nationally? Its ${combinedPct}% average combined rate ranks ${ord} of the 50 states — ${above ? 'above' : 'below'} the 50-state average of ${avgPct}% by ${diffPct} points. For context, the two states whose combined rates sit closest to ${name}'s are ${link1} (${pct(STATE_SALES_TAX[n1].combinedRate)}%)${n2 ? ` and ${link2} (${pct(STATE_SALES_TAX[n2].combinedRate)}%)` : ''}.`;
    } else if (v === 1) {
        core = `Nationally, ${name}'s ${combinedPct}% combined rate checks in at ${ord} place. That's ${above ? `${diffPct} points above` : `${diffPct} points below`} the 50-state average of ${avgPct}%. If you're comparing relocation or shopping options, ${link1} (${pct(STATE_SALES_TAX[n1].combinedRate)}%)${n2 ? ` and ${link2} (${pct(STATE_SALES_TAX[n2].combinedRate)}%)` : ''} are the closest states by combined rate.`;
    } else {
        core = `Among all 50 states, ${name} ranks ${ord} by average combined rate at ${combinedPct}%. The national average is ${avgPct}%, which leaves ${name} ${above ? `${diffPct} points on the expensive side` : `${diffPct} points on the cheap side`} of the midpoint. Shoppers benchmarking nearby states will find ${link1} (${pct(STATE_SALES_TAX[n1].combinedRate)}%)${n2 ? ` and ${link2} (${pct(STATE_SALES_TAX[n2].combinedRate)}%)` : ''} within a hair of the same number.`;
    }
    // Computed superlatives (all derived from the dataset, ties handled).
    const extras = [];
    if (state.combinedRate === MAX_COMBINED && MAX_COMBINED_HOLDERS.length > 1) {
        const others = MAX_COMBINED_HOLDERS.filter((k)=>k !== stateKey);
        extras.push(`No state averages more — ${name} shares the top combined rate with ${others.map((k)=>STATE_SALES_TAX[k].name).join(' and ')}.`);
    } else if (state.combinedRate === MAX_COMBINED) {
        extras.push(`That's the single highest average combined rate in the country.`);
    }
    if (state.combinedRate === MIN_COMBINED_TAXED) {
        if (MIN_COMBINED_TAXED_HOLDERS.length === 1) {
            extras.push(`Among states that still levy a sales tax, ${name}'s ${combinedPct}% is the lightest combined rate there is.`);
        }
    }
    if (state.stateRate === MAX_STATE_RATE && MAX_STATE_RATE_HOLDERS.length === 1) {
        extras.push(`No state charges a higher base rate than ${name}'s ${formatRate(state.stateRate)}%.`);
    }
    if (state.stateRate === MIN_STATE_RATE_TAXED && MIN_STATE_RATE_TAXED_HOLDERS.length === 1) {
        extras.push(`The ${formatRate(state.stateRate)}% statewide base is the smallest of any state that taxes sales at all.`);
    }
    if (state.avgLocalRate === MAX_LOCAL && MAX_LOCAL_HOLDERS.length === 1) {
        extras.push(`And at ${pct(state.avgLocalRate)}%, the average local add-on is the largest in the nation.`);
    }
    return extras.length > 0 ? `${core} ${extras.join(' ')}` : core;
}
function buildExemptionParagraph(stateKey, state) {
    const name = state.name;
    const v = idx4(stateKey, LOCAL_RANK[stateKey]);
    const combinedPct = pct(state.combinedRate);
    const g = state.groceryExempt;
    const rx = state.prescriptionDrugExempt;
    const c = state.clothingExempt;
    const combo = `${g ? '1' : '0'}${rx ? '1' : '0'}${c ? '1' : '0'}`;
    const yearlyGroceryTax = (52 * 150 * state.combinedRate).toFixed(0);
    // All 8 exemption combinations get their own prose; the two that occur in
    // the 2026 dataset (111 and 110) carry four rotating phrasings each.
    switch(combo){
        case '111':
            if (v === 0) {
                return `${name} is in the minority on clothing: groceries, prescription drugs, and everyday apparel are all exempt from sales tax. Only ${CLOTHING_EXEMPT_COUNT} states skip the tax on clothing, and ${name} is one of them — a wardrobe-heavy household here pays noticeably less at the register than the same household one state over.`;
            }
            if (v === 1) {
                return `Three big categories go untaxed in ${name}: groceries, prescription drugs, and clothing. That's a broader package than most states offer — the grocery and prescription exemptions are common nationwide, but adding clothing to the list puts ${name} among just ${CLOTHING_EXEMPT_COUNT} states.`;
            }
            if (v === 2) {
                return `The exemption list runs long in ${name}: food, medicine, and clothes all skip sales tax. Pair that with a ${combinedPct}% combined rate and the burden lands almost entirely on non-essential spending — the receipts that feel it are electronics, furniture, and dining out, not the weekly essentials.`;
            }
            return `Food, medicine, and clothing all skip sales tax in ${name} — one of the broadest everyday-exemption packages in the country. Only ${CLOTHING_EXEMPT_COUNT} states extend the exemption to clothing, so ${name}'s ${combinedPct}% combined rate applies mainly to discretionary purchases.`;
        case '110':
            if (v === 0) {
                return `${name} keeps the taxman away from two household staples: groceries and prescription drugs ring up exempt everywhere in the state. Clothing gets no such break — a $200 jacket picks up the full ${combinedPct}% like any other good. The grocery exemption matters more than it sounds: a family spending $150 a week on food avoids roughly $${yearlyGroceryTax} a year in tax it would otherwise pay at that combined rate.`;
            }
            if (v === 1) {
                return `What you wear gets taxed in ${name}; what you eat doesn't. Groceries and prescription drugs are exempt, but clothing sells at the full ${combinedPct}% combined rate — worth remembering during back-to-school season, when the cart of binders and jeans is taxed while the cart of lunch groceries isn't.`;
            }
            if (v === 2) {
                return `Two recurring budget lines never carry sales tax in ${name}: groceries and prescription drugs. Clothing does — every shirt and shoe purchase rings up at the full ${combinedPct}% — but between exempt food and exempt medicine, a big share of a typical household's annual spending never touches the ${combinedPct}% rate at all.`;
            }
            return `${name}'s exemption list covers the fridge and the pharmacy: groceries and prescription drugs both ring up tax-free. The closet doesn't get the same deal — apparel sells at the full ${combinedPct}% — so the recurring essentials stay exempt while the occasional wardrobe refresh pays full freight.`;
        case '100':
            return `${name} exempts groceries but not prescription drugs: food skips sales tax, while medicine and clothing both sell at the full ${combinedPct}% combined rate.`;
        case '101':
            return `${name} exempts groceries and clothing, but prescription drugs are still taxed at the combined rate of ${combinedPct}% — an unusual setup, since most states protect medicine first.`;
        case '010':
            return `${name} exempts prescription drugs but taxes groceries and clothing. Medicine skips the ${combinedPct}% rate; food and apparel don't.`;
        case '011':
            return `${name} exempts prescription drugs and clothing, while groceries are still taxed. Two of three everyday categories skip the ${combinedPct}% rate, but the weekly food bill doesn't.`;
        case '000':
            return `${name} applies its full ${combinedPct}% combined rate to groceries, prescription drugs, and clothing alike — no carve-outs on the essentials. Every state line around ${name} is worth comparing before a big purchase.`;
        default:
            return `${name} taxes most retail goods at a ${combinedPct}% combined rate; check the state revenue department for the current exemption list.`;
    }
}
function buildLocalParagraph(stateKey, state) {
    const name = state.name;
    const v = idx4(stateKey, STATE_RATE_RANK[stateKey]);
    const statePct = formatRate(state.stateRate);
    const localPct = formatRate(Math.max(0, state.avgLocalRate));
    const combinedPct = pct(state.combinedRate);
    const bucket = localBucketOf(state);
    const localRank = LOCAL_RANK[stateKey];
    if (bucket === 'zero') {
        if (v === 0) {
            return `One thing you never have to think about in ${name}: rate shopping between towns. There are no county or city sales taxes anywhere in the state, so the ${statePct}% state rate is the whole number — identical whether you check out in the biggest city or a village general store.`;
        }
        if (v === 1) {
            return `Local governments in ${name} don't levy their own sales taxes. Whatever the ${statePct}% state base adds up to is the entire charge — no county surcharges, no special-district add-ons, no need to check the address before estimating a purchase.`;
        }
        if (v === 2) {
            return `Plenty of states publish long tables of county and municipal rates; ${name} doesn't need one. With no local sales taxes on the books, the ${statePct}% state rate is the combined rate — the same figure at every register, in every jurisdiction, every day of the year.`;
        }
        return `Rate-checking by ZIP code is a habit ${name} shoppers can skip. No city, county, or district adds a sales tax of its own, so the ${statePct}% state rate is the combined rate everywhere — same number at every register in the state.`;
    }
    if (bucket === 'low') {
        if (v === 0) {
            return `Local add-ons exist in ${name}, but they're modest: the average county and city layer adds ${localPct}% on top of the ${statePct}% state rate. Shop a few towns over and the total rate might move by a fraction of a point — rarely enough to change where you buy.`;
        }
        if (v === 1) {
            return `The ${statePct}% state rate does most of the work in ${name}. Local jurisdictions add an average of just ${localPct}%, so the combined rate you actually pay — about ${combinedPct}% — stays inside a narrow band wherever you shop in the state.`;
        }
        if (v === 2) {
            return `${name} lets counties and cities add their own layer, but the average add-on is only ${localPct}%. That keeps the combined rate near ${combinedPct}% statewide, with minor variation from one jurisdiction to the next rather than the wild swings seen in high-local states.`;
        }
        return `Local taxes in ${name} average ${localPct}% — real, but small relative to the ${statePct}% state base. The combined rate hovers near ${combinedPct}% from town to town, so shopping across jurisdiction lines rarely changes the price by much.`;
    }
    if (bucket === 'moderate') {
        if (v === 0) {
            return `Where in ${name} you shop changes the math. Counties and cities layer an average of ${localPct}% onto the ${statePct}% state base, and individual jurisdictions run above or below that average. The ${combinedPct}% figure is the statewide mean — your actual register rate depends on the address.`;
        }
        if (v === 1) {
            return `Local jurisdictions carry real weight in ${name}, adding ${localPct}% on average to the state's ${statePct}% base. That produces a combined rate around ${combinedPct}%, with visible differences between jurisdictions — worth checking if a large purchase sits near a city or county line.`;
        }
        if (v === 2) {
            return `The gap between the ${statePct}% state rate and the ${combinedPct}% you actually pay? That's ${localPct}% of local taxes, on average, spread across county and municipal rates that differ town by town. In ${name}, the exact jurisdiction on a big-ticket receipt can move the total by real money.`;
        }
        return `Where you shop inside ${name} matters. The average local layer is ${localPct}% on top of a ${statePct}% state rate, and the combined figure of ${combinedPct}% is just the statewide mean — actual registers run above or below it depending on the county and city.`;
    }
    // high
    if (v === 0) {
        return `Budget extra for the local layer in ${name}: county and city taxes average ${localPct}% on top of the ${statePct}% state rate — #${localRank} of 50 states by average local add-on. Many jurisdictions sit above that average, so a combined rate north of ${combinedPct}% is common at city registers.`;
    }
    if (v === 1) {
        return `The state rate is only part of the story in ${name}. Local governments add an average of ${localPct}% — one of the heavier local layers in the country (#${localRank} nationally) — which pushes the typical combined rate up to ${combinedPct}%. Location matters here more than almost anywhere else: the same purchase can ring up differently across a single city limit.`;
    }
    if (v === 2) {
        return `${name}'s combined rate leans unusually hard on local taxes. The state base is ${statePct}%, but cities and counties stack an average of ${localPct}% on top — the #${localRank}-highest local average in the US — landing the typical shopper at ${combinedPct}% all-in. On a major purchase, crossing a jurisdiction line can genuinely change the price.`;
    }
    return `In ${name}, the local layer is the story. County and city taxes average ${localPct}% above the ${statePct}% state base (#${localRank} nationally), which is how the combined rate gets to ${combinedPct}%. Individual jurisdictions vary widely around that average — big purchases deserve a rate check by address.`;
}
function buildMechanicsParagraph(stateKey, state) {
    const name = state.name;
    const abbr = state.abbreviation;
    const v = idx(stateKey, LOCAL_RANK[stateKey] + COMBINED_RANK[stateKey]);
    const combinedPct = pct(state.combinedRate);
    const rate = state.combinedRate;
    if (v === 0) {
        // Worked example with a tier-appropriate amount.
        const amount = tierOf(stateKey) === 'high' ? 2500 : tierOf(stateKey) === 'low' ? 100 : 500;
        const tax = (amount * rate).toFixed(2);
        const total = (amount * (1 + rate)).toFixed(2);
        const what = amount >= 2500 ? 'furniture set' : amount >= 500 ? 'laptop' : 'pair of headphones';
        return `Running the numbers is plain multiplication: price × ${rate.toFixed(4)} = tax. Take a $${amount} ${what} in ${name} — $${amount} × ${rate.toFixed(4)} comes to $${tax} in sales tax, bringing the register total to $${total}. The calculator above does this for any amount and any rate override in one step.`;
    }
    if (v === 1) {
        // Reverse calculation.
        const base = 1000;
        const total = (base * (1 + rate)).toFixed(2);
        const divisor = (1 + rate).toFixed(4);
        return `Working backwards from a tax-inclusive total is its own trick, and bookkeepers use it constantly. Divide the receipt total by ${divisor} to recover the pre-tax price: a $${money(base * (1 + rate))} bill under ${name}'s ${combinedPct}% average rate divides by ${divisor} back to $${money(base)} even. That's the reverse mode built into the calculator above — useful for expense reports and receipts that only show the grand total.`;
    }
    // Online / Wayfair.
    return `Online orders follow the same rules. Since the Supreme Court's 2018 <a href="https://www.oyez.org/cases/2017/17-494" target="_blank" rel="noopener noreferrer">South Dakota v. Wayfair</a> decision, retailers with significant sales into ${name} must collect ${name} sales tax on shipments to ${abbr} residents — including the local portion where one applies. If the estimated tax at online checkout seemed to appear out of nowhere a few years back, that ruling is why.`;
}
// ─── Key Rates Builder ───────────────────────────────────────────────────────
function buildKeyRates(stateKey, state, tier) {
    const name = state.name;
    const abbr = state.abbreviation;
    const v = idx(stateKey, 5);
    const statePct = formatRate(state.stateRate);
    const localPct = formatRate(Math.max(0, state.avgLocalRate));
    const combinedPct = pct(state.combinedRate);
    const taxOn1000 = (1000 * state.combinedRate).toFixed(2);
    const totalOn1000 = (1000 * (1 + state.combinedRate)).toFixed(2);
    const rank = COMBINED_RANK[stateKey];
    const noLocal = localBucketOf(state) === 'zero';
    const stateCard = {
        label: v === 0 ? `${name} State Rate` : v === 1 ? `Statewide Base Rate` : `${abbr} Base Rate`,
        value: `${statePct}%`
    };
    const localCard = noLocal ? {
        label: 'Local Add-Ons',
        value: 'None — same statewide'
    } : {
        label: v === 0 ? `${name} Avg Local Rate` : 'Avg County + City Rate',
        value: `${localPct}%`
    };
    const combinedCard = {
        label: v === 2 ? 'What You Typically Pay' : `${name} Combined Rate`,
        value: `${combinedPct}%`
    };
    const rankCard = {
        label: 'US Rank (Combined)',
        value: `#${rank} of 50`
    };
    const taxCard = {
        label: 'Tax on $1,000',
        value: `$${taxOn1000}`
    };
    const totalCard = {
        label: 'Total on $1,000',
        value: `$${totalOn1000}`
    };
    const clothingCard = {
        label: `${abbr} Clothing`,
        value: state.clothingExempt ? 'Exempt' : 'Taxed'
    };
    // Order and card selection rotate by tier so the stat grid isn't a fixed template.
    if (tier === 'high') {
        return [
            combinedCard,
            stateCard,
            localCard,
            taxCard,
            rankCard,
            clothingCard
        ];
    }
    if (tier === 'low') {
        return [
            combinedCard,
            rankCard,
            stateCard,
            localCard,
            taxCard,
            clothingCard
        ];
    }
    return [
        stateCard,
        localCard,
        combinedCard,
        taxCard,
        v === 1 ? totalCard : rankCard,
        clothingCard
    ];
}
// ─── FAQ Builder ─────────────────────────────────────────────────────────────
function buildFaqs(stateKey, state, tier) {
    const name = state.name;
    const abbr = state.abbreviation;
    const wildcardV = idx(stateKey, 13);
    const statePct = formatRate(state.stateRate);
    const localPct = formatRate(Math.max(0, state.avgLocalRate));
    const combinedPct = pct(state.combinedRate);
    const rank = COMBINED_RANK[stateKey];
    const ord = ordinal(rank);
    const avgPct = pct(NATIONAL_AVG_COMBINED);
    const noLocal = localBucketOf(state) === 'zero';
    const belowCount = ALL_STATE_KEYS.filter((k)=>STATE_SALES_TAX[k].combinedRate < state.combinedRate).length;
    const aboveCount = ALL_STATE_KEYS.filter((k)=>STATE_SALES_TAX[k].combinedRate > state.combinedRate).length;
    const rateFaqV = idx4(stateKey, 23);
    const tierFaqV = idx4(stateKey, 29);
    const faqs = [];
    // 1) Rate question — phrased by tier, four phrasings per tier.
    if (tier === 'high') {
        const rateHigh = [
            {
                question: `What is the total sales tax rate in ${name}?`,
                answer: `${name}'s average combined sales tax rate is ${combinedPct}% — ${statePct}% state plus ${localPct}% average local tax. That's the #${rank}-highest combined rate of the 50 states, ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points above the national average of ${avgPct}%.`
            },
            {
                question: `How high is sales tax in ${name}?`,
                answer: `${name} combines a ${statePct}% state rate with ${localPct}% average local tax for an all-in rate of ${combinedPct}% — #${rank} of 50 states, ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points above the ${avgPct}% national average.`
            },
            {
                question: `What's ${name}'s combined sales tax rate?`,
                answer: `${combinedPct}% on average — ${statePct}% from the state and ${localPct}% from local jurisdictions. ${aboveCount === 0 ? 'No state averages more.' : `Only ${aboveCount} states run higher.`}`
            },
            {
                question: `How much is sales tax in ${name} in total?`,
                answer: `Expect about ${combinedPct}% at the register in ${name}: a ${statePct}% state rate plus ${localPct}% in average local taxes. That's #${rank} of 50 — ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points over the ${avgPct}% national average.`
            }
        ];
        faqs.push(rateHigh[rateFaqV]);
    } else if (tier === 'low') {
        const rateLow = [
            {
                question: `What is the sales tax rate in ${name}?`,
                answer: `${name} has a ${statePct}% state rate${noLocal ? ' with no local add-ons' : ` plus about ${localPct}% average local tax`}, for a combined rate of ${combinedPct}%. That's ${ord} of 50 states — on the light end nationally, ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points below the ${avgPct}% average.`
            },
            {
                question: `What's the sales tax rate in ${name}?`,
                answer: `Statewide, ${name} charges ${statePct}%${noLocal ? ' with no local add-ons' : `; locals average another ${localPct}%, so the combined rate works out to about ${combinedPct}%`}. Only ${belowCount} states rank lower, and ${name} sits ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points under the national average of ${avgPct}%.`
            },
            {
                question: `How much is sales tax in ${name}?`,
                answer: `${combinedPct}% combined on average — the ${statePct}% state rate${noLocal ? '' : ` plus ${localPct}% typical local tax`}. ${name} ranks ${ord} of 50 states, ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points under the national average of ${avgPct}%.`
            },
            {
                question: `What's ${name}'s combined sales tax rate?`,
                answer: `About ${combinedPct}% — ${statePct}% statewide${noLocal ? '' : ` and an average ${localPct}% local layer`}. Only ${belowCount} states average a lower combined rate than ${name}.`
            }
        ];
        faqs.push(rateLow[rateFaqV]);
    } else {
        const rateMid = [
            {
                question: `What is the sales tax rate in ${name}?`,
                answer: `The state rate in ${name} is ${statePct}%${noLocal ? ', and there are no local add-ons — that figure is the whole rate' : `; average local taxes add ${localPct}%, bringing the combined rate to about ${combinedPct}%`}. ${name} ranks ${ord} of the 50 states by combined rate.`
            },
            {
                question: `What sales tax will I pay in ${name}?`,
                answer: `Most purchases in ${name} carry ${combinedPct}% on average — a ${statePct}% state rate${noLocal ? ' and no local layer on top' : ` plus about ${localPct}% in local taxes`}. That places ${name} ${ord} of 50 states, ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'above' : 'below'} the ${avgPct}% national average.`
            },
            {
                question: `How much is sales tax in ${name}?`,
                answer: `${name} charges ${statePct}% at the state level${noLocal ? ', and no local taxes exist on top' : ` and about ${localPct}% more on average locally`}, so most shoppers pay around ${combinedPct}%. Ranked ${ord} of 50 states, that's ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'above' : 'below'} the ${avgPct}% US average.`
            },
            {
                question: `What's the combined sales tax rate in ${name}?`,
                answer: `${combinedPct}% is the average all-in figure — ${statePct}% state${noLocal ? ' with no local add-ons' : ` plus ${localPct}% average local tax`}. ${name} lands ${ord} among the 50 states by combined rate.`
            }
        ];
        faqs.push(rateMid[rateFaqV]);
    }
    // 2) Calculation mechanics — example amount and phrasing rotate independently.
    const amounts = [
        100,
        250,
        500
    ];
    const amt = amounts[idx(stateKey, 19)];
    const taxAmt = (amt * state.combinedRate).toFixed(2);
    const totalAmt = (amt * (1 + state.combinedRate)).toFixed(2);
    const calcAnswers = [
        `Multiply the price by the combined rate. On a $${amt} purchase at ${name}'s ${combinedPct}% average combined rate: $${amt} × ${state.combinedRate.toFixed(4)} = $${taxAmt} in tax, for a $${totalAmt} total. The calculator above handles any amount plus reverse (tax-inclusive) math.`,
        `Take the price and multiply by the rate as a decimal. With ${name}'s average combined rate at ${combinedPct}%, a $${amt} purchase carries $${taxAmt} of tax — $${totalAmt} at the register. For tax-inclusive totals, switch the calculator above into reverse mode.`,
        `Price times rate, that's the whole formula. At ${name}'s ${combinedPct}% average combined rate, a $${amt} purchase adds $${taxAmt} in tax and $${totalAmt} at checkout. The calculator above runs the math forward and backward for any amount.`,
        `The math is one multiplication: price × ${state.combinedRate.toFixed(4)} in ${name}. A $${amt} purchase means $${taxAmt} of tax and a $${totalAmt} total — run any amount through the calculator above, forward or reverse.`
    ];
    faqs.push({
        question: `How do I calculate sales tax in ${name}?`,
        answer: calcAnswers[idx4(stateKey, 37)]
    });
    // 3) Exemption question — phrasing varies by profile and rotation index.
    if (state.clothingExempt) {
        const clothingAnswers = [
            `Yes. ${name} is one of only ${CLOTHING_EXEMPT_COUNT} states that exempts clothing, and it exempts groceries and prescription drugs as well. The ${combinedPct}% combined rate applies to other retail goods, but the everyday essentials skip it.`,
            `Groceries, prescription drugs, and clothing — all three are exempt in ${name}. Only ${CLOTHING_EXEMPT_COUNT} states put clothing on the exemption list, so the ${combinedPct}% combined rate mostly lands on non-essential purchases.`,
            `No — everyday clothing is exempt in ${name}, alongside groceries and prescriptions. That puts ${name} among just ${CLOTHING_EXEMPT_COUNT} clothing-exempt states nationwide, leaving the ${combinedPct}% rate to apply mainly to everything else.`,
            `Clothing, groceries, and prescriptions all ring up tax-free in ${name} — a trio only ${CLOTHING_EXEMPT_COUNT} states offer. The ${combinedPct}% combined rate applies to the rest of the store.`
        ];
        faqs.push({
            question: idx4(stateKey, 41) === 1 ? `What does ${name} exempt from sales tax?` : `Is clothing tax-free in ${name}?`,
            answer: clothingAnswers[idx4(stateKey, 41)]
        });
    } else {
        const groceryAnswers = [
            `No — groceries and prescription drugs are exempt from sales tax in ${name}. Clothing doesn't get the same treatment and sells at the full ${combinedPct}% combined rate. Exemption rules can vary slightly at the local level, so check the revenue department for edge cases.`,
            `Food and medicine, no. Groceries and prescription drugs are exempt statewide in ${name}, while clothing and most other retail goods sell at the full ${combinedPct}% combined rate. Local jurisdictions occasionally add their own twists to exemption rules.`,
            `${name} does not tax groceries or prescription drugs. Clothing is the everyday category that doesn't escape — it rings up at the full ${combinedPct}% combined rate, along with everything else that isn't food or medicine.`,
            `Two exemptions anchor ${name}'s sales tax: food and prescription medicine. Everything else — clothing included — sells at the full ${combinedPct}% combined rate. It's a carve-out aimed squarely at recurring household essentials.`
        ];
        faqs.push({
            question: idx4(stateKey, 41) === 1 ? `What's tax-free in ${name}?` : `Are groceries taxed in ${name}?`,
            answer: groceryAnswers[idx4(stateKey, 41)]
        });
    }
    // 4) Tier-specific question (four phrasings per tier).
    if (tier === 'high') {
        const driver = state.avgLocalRate > 0.03 ? `The driver is the local layer: county and city taxes average ${localPct}% on top of the ${statePct}% state base — the #${LOCAL_RANK[stateKey]}-largest local average in the country.` : `The state's own base rate of ${statePct}% does most of the work; local taxes add another ${localPct}% on average.`;
        const tierHigh = [
            {
                question: `Why is sales tax so high in ${name}?`,
                answer: `${name} ranks #${rank} of 50 states at ${combinedPct}% combined, ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points above the ${avgPct}% national average. ${driver} Sales-tax-heavy states often keep other taxes lower, so the total burden picture depends on income and property tax too.`
            },
            {
                question: `What makes ${name}'s combined rate so heavy?`,
                answer: `${name} sits #${rank} of 50 states at ${combinedPct}% combined — ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points above the ${avgPct}% national average. ${driver} For contrast, the lightest taxing states in the country collect as little as ${pct(MIN_COMBINED_TAXED)}% combined.`
            },
            {
                question: `Is ${name} one of the highest sales tax states?`,
                answer: `Yes — #${rank} of 50 at ${combinedPct}% combined. ${driver} The national average is ${avgPct}%, so ${name} runs ${pct(state.combinedRate - NATIONAL_AVG_COMBINED)} points hot.`
            },
            {
                question: `Where does ${name}'s sales tax rank nationally?`,
                answer: `#${rank} of 50 states, at ${combinedPct}% combined. ${driver} ${aboveCount === 0 ? 'No state averages more.' : `Only ${aboveCount} states average more.`}`
            }
        ];
        faqs.push(tierHigh[tierFaqV]);
    } else if (tier === 'low') {
        const tierLow = [
            {
                question: `Is ${name} a low-sales-tax state?`,
                answer: `Yes. At ${combinedPct}% combined, ${name} ranks ${ord} of 50 — only ${belowCount} state${belowCount === 1 ? '' : 's'} average${belowCount === 1 ? 's' : ''} a lower rate. For scale, the 50-state average is ${avgPct}%, and the highest combined rates in the country run above ${pct(MAX_COMBINED)}%.`
            },
            {
                question: `Is ${name} cheaper than most states for sales tax?`,
                answer: `Yes — ${combinedPct}% combined ranks ${ord} of 50, and only ${belowCount} states average less. The typical state charges ${avgPct}%, so ${name} comes in ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points lighter. Only the no-tax states and a couple of near-misses do better.`
            },
            {
                question: `Where does ${name} rank on sales tax?`,
                answer: `${ord} of 50 — comfortably in the bottom third. ${name}'s ${combinedPct}% combined rate is ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points below the ${avgPct}% national average, with only ${belowCount} states lighter.`
            },
            {
                question: `Does ${name} have one of the lower sales tax rates?`,
                answer: `It does. At ${combinedPct}% combined (${statePct}% state${noLocal ? '' : ` + ${localPct}% local`}), ${name} ranks ${ord} nationally — ${pct(NATIONAL_AVG_COMBINED - state.combinedRate)} points lighter than the average state's ${avgPct}%.`
            }
        ];
        faqs.push(tierLow[tierFaqV]);
    } else {
        const nearest = nearestByRate(stateKey, 1)[0];
        const nearestName = STATE_SALES_TAX[nearest].name;
        const nearestPct = pct(STATE_SALES_TAX[nearest].combinedRate);
        const tierMid = [
            {
                question: `How does ${name} compare to other states' sales tax?`,
                answer: `${name}'s ${combinedPct}% combined rate ranks ${ord} of the 50 states, ${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'above' : 'below'} the ${avgPct}% national average by ${pct(Math.abs(state.combinedRate - NATIONAL_AVG_COMBINED))} points. The closest state by combined rate is ${nearestName} at ${nearestPct}%.`
            },
            {
                question: `Is ${name} above or below average on sales tax?`,
                answer: `${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'Above' : 'Below'}. ${name}'s ${combinedPct}% combined rate ranks ${ord} of 50 states against the ${avgPct}% national average — a gap of ${pct(Math.abs(state.combinedRate - NATIONAL_AVG_COMBINED))} points. ${nearestName} (${nearestPct}%) is the closest state by combined rate.`
            },
            {
                question: `Is ${name}'s sales tax higher or lower than average?`,
                answer: `${state.combinedRate >= NATIONAL_AVG_COMBINED ? 'Higher' : 'Lower'} — ${combinedPct}% combined versus the ${avgPct}% national average, a ${pct(Math.abs(state.combinedRate - NATIONAL_AVG_COMBINED))}-point gap. ${name} ranks ${ord} of 50 states.`
            },
            {
                question: `What rank is ${name} in sales tax?`,
                answer: `${ord} of 50 states by combined rate, at ${combinedPct}%. The 50-state average sits at ${avgPct}%, and the closest comparable state is ${nearestName} at ${nearestPct}%.`
            }
        ];
        faqs.push(tierMid[tierFaqV]);
    }
    // 5) Local-bucket-specific question (four phrasings per bucket).
    const bucket = localBucketOf(state);
    const localFaqV = idx4(stateKey, 43);
    const localRank = LOCAL_RANK[stateKey];
    if (bucket === 'zero') {
        const zeroFaqs = [
            {
                question: `Is the sales tax rate the same everywhere in ${name}?`,
                answer: `Yes. ${name} has no county, city, or special-district sales taxes — the ${statePct}% state rate is identical in every jurisdiction. You never need to look up a local rate when estimating a purchase anywhere in ${name}.`
            },
            {
                question: `Do I need to know the city rate in ${name}?`,
                answer: `No. ${name} has no local sales taxes — the ${statePct}% state rate applies in every city and county, so one number covers the entire state. Estimates here need no address lookup.`
            },
            {
                question: `Why is the rate identical everywhere in ${name}?`,
                answer: `Because local sales taxes don't exist in ${name}. The state's ${statePct}% rate is the only sales tax on the books, so every city and county charges exactly the same.`
            },
            {
                question: `Do rates change between cities in ${name}?`,
                answer: `Never. With no county or municipal sales taxes, the ${statePct}% state rate follows you everywhere in ${name} — the same percentage in every checkout line.`
            }
        ];
        faqs.push(zeroFaqs[localFaqV]);
    } else if (bucket === 'high') {
        const highFaqs = [
            {
                question: `Which parts of ${name} have the highest sales tax?`,
                answer: `Local layers drive the differences. On average, ${name} jurisdictions add ${localPct}% to the ${statePct}% state rate (the #${localRank}-largest local average in the US), but individual cities and counties run above or below that mean. For an exact figure on a large purchase, look up the rate for the specific address — the calculator above accepts a custom rate override.`
            },
            {
                question: `How different are city rates in ${name}?`,
                answer: `Dramatically different in places. The average local add-on is ${localPct}% — #${localRank} of 50 states — and individual jurisdictions run above and below that mean. On large purchases, look up the specific address rate before you buy.`
            },
            {
                question: `Where are the highest rates in ${name}?`,
                answer: `In the jurisdictions that stack the biggest local layers. The statewide average local add-on is ${localPct}% (the #${localRank}-largest in the US), and some cities and counties go beyond it — check the specific address before a major purchase.`
            },
            {
                question: `Can the sales tax rate change within a few blocks in ${name}?`,
                answer: `Yes. City and county layers in ${name} average ${localPct}% on top of the ${statePct}% state rate, and jurisdiction boundaries don't follow neat lines — crossing one can move the combined rate off the ${combinedPct}% average.`
            }
        ];
        faqs.push(highFaqs[localFaqV]);
    } else {
        const varying = bucket === 'moderate';
        const someFaqs = varying ? [
            {
                question: `Do city and county rates differ within ${name}?`,
                answer: `They do. Local jurisdictions in ${name} add an average of ${localPct}% on top of the ${statePct}% state rate, and individual cities and counties sit above or below that average. The ${combinedPct}% figure is the statewide mean, so your actual register rate depends on where you shop.`
            },
            {
                question: `How much do local taxes add in ${name}?`,
                answer: `An average of ${localPct}% on top of the ${statePct}% state rate, though it varies by jurisdiction. The ${combinedPct}% combined figure is the statewide mean — your exact register rate depends on the town you're shopping in.`
            },
            {
                question: `Do I need my exact city's rate in ${name}?`,
                answer: `For precision, yes. Local taxes average ${localPct}% over the ${statePct}% state base, but jurisdictions sit on both sides of that mean — the calculator above lets you override the rate with your exact local figure.`
            },
            {
                question: `How much can the rate change between towns in ${name}?`,
                answer: `By a noticeable margin. The ${localPct}% average local layer varies by jurisdiction on top of the ${statePct}% state rate, which is why the statewide mean of ${combinedPct}% isn't always the number on your receipt.`
            }
        ] : [
            {
                question: `Do city and county rates differ within ${name}?`,
                answer: `They do, but modestly. Local jurisdictions in ${name} add an average of ${localPct}% on top of the ${statePct}% state rate, and the spread between jurisdictions is small — most of the state clusters near the ${combinedPct}% combined figure.`
            },
            {
                question: `How much do local taxes add in ${name}?`,
                answer: `An average of ${localPct}% on top of the ${statePct}% state rate. The ${combinedPct}% combined figure is the statewide mean — most registers land close to it.`
            },
            {
                question: `How much do local rates vary in ${name}?`,
                answer: `Within a narrow band. The average local layer is ${localPct}% over the ${statePct}% state rate, and most jurisdictions cluster near that figure, so the combined rate rarely strays far from ${combinedPct}%.`
            },
            {
                question: `Are small-town rates different in ${name}?`,
                answer: `Slightly. Local add-ons average just ${localPct}% statewide, and jurisdictions move up or down from there in small increments — the combined rate stays in the neighborhood of ${combinedPct}% wherever you shop.`
            }
        ];
        faqs.push(someFaqs[localFaqV]);
    }
    // 6) Wildcard question — rotates by tier + hash so same-tier pages diverge.
    if (tier === 'high') {
        if (wildcardV === 0) {
            const diff1000 = (1000 * (state.combinedRate - NATIONAL_AVG_COMBINED)).toFixed(2);
            faqs.push({
                question: `How much extra does ${name}'s rate cost versus an average state?`,
                answer: `On a $1,000 purchase, ${name}'s ${combinedPct}% combined rate adds $${(1000 * state.combinedRate).toFixed(2)} in tax, versus $${(1000 * NATIONAL_AVG_COMBINED).toFixed(2)} at the ${avgPct}% national average — a difference of $${diff1000}. Scale that across a year of spending and the gap becomes real money.`
            });
        } else if (wildcardV === 2) {
            faqs.push({
                question: `What's the sales tax on a large purchase in ${name}?`,
                answer: `At ${combinedPct}%, a $5,000 purchase carries $${(5000 * state.combinedRate).toFixed(2)} in sales tax in ${name} — $${(5000 * (1 + state.combinedRate)).toFixed(2)} all-in. The calculator above prices any amount instantly.`
            });
        } else {
            const neighbors = NEIGHBOR_MAP[stateKey] || [];
            const cheapest = neighbors.map((k)=>STATE_SALES_TAX[k]).filter((s)=>s).sort((a, b)=>a.combinedRate - b.combinedRate)[0];
            if (cheapest) {
                const savings = (1000 * (state.combinedRate - cheapest.combinedRate)).toFixed(2);
                faqs.push({
                    question: `Is it worth shopping across the ${name} border?`,
                    answer: `On big-ticket items, possibly. Among ${name}'s neighbors, ${cheapest.name} has the lightest combined rate at ${pct(cheapest.combinedRate)}% versus ${name}'s ${combinedPct}% — a gap of $${savings} per $1,000 spent. Remember that your home state may require use tax on out-of-state purchases, which can claw back the savings.`
                });
            } else {
                faqs.push({
                    question: `Does ${name} charge sales tax on online purchases?`,
                    answer: `Yes. After the 2018 South Dakota v. Wayfair Supreme Court ruling, online retailers must collect ${name} sales tax on purchases shipped to ${abbr} residents, based on the buyer's location.`
                });
            }
        }
    } else if (tier === 'low') {
        if (wildcardV === 0) {
            const below = ALL_STATE_KEYS.filter((k)=>STATE_SALES_TAX[k].combinedRate < state.combinedRate);
            const belowNames = below.map((k)=>`${STATE_SALES_TAX[k].name} (${STATE_SALES_TAX[k].noStateTax ? '0%' : pct(STATE_SALES_TAX[k].combinedRate) + '%'})`);
            faqs.push({
                question: `Which states have a lower sales tax than ${name}?`,
                answer: below.length > 0 ? `Only ${below.length}: ${belowNames.join(', ')}. Every other state averages a higher combined rate than ${name}'s ${combinedPct}%.` : `None — ${name} has the lowest combined rate of any state that collects sales tax.`
            });
        } else if (wildcardV === 2) {
            const nbRates = (NEIGHBOR_MAP[stateKey] || []).map((k)=>STATE_SALES_TAX[k]?.combinedRate).filter((r)=>r !== undefined);
            const nbMin = nbRates.length ? Math.min(...nbRates) : state.combinedRate;
            const nbMax = nbRates.length ? Math.max(...nbRates) : state.combinedRate;
            const position = state.combinedRate < nbMin ? 'below them all' : state.combinedRate > nbMax ? 'above them all' : 'inside that range';
            faqs.push({
                question: `Is ${name}'s rate lower than its neighbors'?`,
                answer: nbRates.length ? `Neighbor rates around ${name} span ${pct(nbMin)}% to ${pct(nbMax)}% combined, so ${name}'s ${combinedPct}% sits ${position}. Cross-border shopping can pay off — or not — depending on which direction the border is.` : `${name}'s ${combinedPct}% combined rate ranks ${ord} of 50 states.`
            });
        } else {
            faqs.push({
                question: `How much would I save in ${name} versus a high-tax state?`,
                answer: `The spread between ${name}'s ${combinedPct}% and the highest combined rates in the country (${pct(MAX_COMBINED)}%) is ${pct(MAX_COMBINED - state.combinedRate)} points — about $${(1000 * (MAX_COMBINED - state.combinedRate)).toFixed(0)} per $1,000 spent. Against the ${avgPct}% national average, ${name} saves roughly $${(1000 * (NATIONAL_AVG_COMBINED - state.combinedRate)).toFixed(2)} per $1,000.`
            });
        }
    } else {
        // Avoid a reverse-calc FAQ when the reverse-calc paragraph already ran
        // in the body (same page shouldn't explain the same trick twice).
        const mechV = idx(stateKey, LOCAL_RANK[stateKey] + COMBINED_RANK[stateKey]);
        const wild = wildcardV === 1 && mechV === 1 ? 2 : wildcardV;
        if (wild === 0) {
            faqs.push({
                question: `Does ${name} charge sales tax on online purchases?`,
                answer: `Yes. Following the 2018 South Dakota v. Wayfair Supreme Court ruling, online retailers must collect ${name} sales tax on purchases shipped to ${name} residents. The rate is based on the buyer's location within ${name}, including any applicable local portion.`
            });
        } else if (wild === 1) {
            faqs.push({
                question: `How do I back sales tax out of a total price in ${name}?`,
                answer: `Divide the tax-inclusive total by (1 + rate). Using ${name}'s ${combinedPct}% average combined rate: a $${(1000 * (1 + state.combinedRate)).toFixed(2)} total ÷ ${(1 + state.combinedRate).toFixed(4)} = $1,000.00 pre-tax. The calculator above has a reverse mode that does this automatically.`
            });
        } else {
            const nearest = nearestByRate(stateKey, 2);
            faqs.push({
                question: `Which states have sales tax rates closest to ${name}'s?`,
                answer: `${STATE_SALES_TAX[nearest[0]].name} (${pct(STATE_SALES_TAX[nearest[0]].combinedRate)}%)${nearest[1] ? ` and ${STATE_SALES_TAX[nearest[1]].name} (${pct(STATE_SALES_TAX[nearest[1]].combinedRate)}%)` : ''} sit nearest to ${name}'s ${combinedPct}% combined rate. Cross-border shoppers will barely notice a difference at the register in those states.`
            });
        }
    }
    // FAQ order rotates by state so the question sequence isn't a fixed template.
    const orderV = idx(stateKey, 31);
    if (orderV === 1) {
        [faqs[0], faqs[1]] = [
            faqs[1],
            faqs[0]
        ];
        [faqs[2], faqs[4]] = [
            faqs[4],
            faqs[2]
        ];
    } else if (orderV === 2) {
        [faqs[1], faqs[2]] = [
            faqs[2],
            faqs[1]
        ];
        [faqs[3], faqs[4]] = [
            faqs[4],
            faqs[3]
        ];
    }
    return faqs;
}
// ─── Section Headings ────────────────────────────────────────────────────────
function buildHeadings(name, stateKey, tier) {
    const region = REGION_OF[stateKey] ?? 'South';
    const rot = (idx(stateKey, 17) + region.length + tier.length) % 3;
    const howOptions = [
        `How ${name} Sales Tax Works`,
        `${name} Sales Tax, Explained`,
        `How Sales Tax Works in ${name}`
    ];
    const ratesOptions = [
        `${name} Sales Tax Key Rates (2026)`,
        `${name} Sales Tax by the Numbers`,
        `Key Numbers: ${name} Sales Tax (2026)`
    ];
    const faqOptions = [
        `${name} Sales Tax FAQ`,
        `${name} Sales Tax: Questions & Answers`,
        `Common Questions About Sales Tax in ${name}`
    ];
    return {
        howHeading: howOptions[rot],
        ratesHeading: ratesOptions[rot],
        faqHeading: faqOptions[rot]
    };
}
function getStateContent(stateKey) {
    const state = STATE_SALES_TAX[stateKey];
    if (!state) {
        return {
            howItWorks: [],
            keyRates: [],
            faqs: [],
            relatedStates: []
        };
    }
    const relatedStates = getRelatedStates(stateKey);
    if (state.noStateTax) {
        return getNoTaxStateContent(stateKey, state, relatedStates);
    }
    const tier = tierOf(stateKey);
    const v = idx(stateKey, 11);
    const frame = buildOpeningFrame(stateKey, state);
    const rankPara = buildRankParagraph(stateKey, state);
    const exemptionPara = buildExemptionParagraph(stateKey, state);
    const localPara = buildLocalParagraph(stateKey, state);
    const mechanicsPara = buildMechanicsParagraph(stateKey, state);
    const quirk = STRUCTURAL_QUIRKS[stateKey];
    // Paragraph ORDER varies by tier and variant — different article shapes.
    let paragraphs;
    if (tier === 'high') {
        paragraphs = v === 1 ? [
            frame,
            localPara,
            rankPara,
            exemptionPara,
            mechanicsPara
        ] : [
            frame,
            rankPara,
            localPara,
            exemptionPara,
            mechanicsPara
        ];
    } else if (tier === 'mid') {
        paragraphs = v === 2 ? [
            frame,
            mechanicsPara,
            rankPara,
            exemptionPara,
            localPara
        ] : v === 1 ? [
            frame,
            exemptionPara,
            mechanicsPara,
            localPara,
            rankPara
        ] : [
            frame,
            exemptionPara,
            rankPara,
            localPara,
            mechanicsPara
        ];
    } else {
        paragraphs = v === 0 ? [
            frame,
            localPara,
            rankPara,
            exemptionPara,
            mechanicsPara
        ] : v === 1 ? [
            frame,
            rankPara,
            localPara,
            mechanicsPara,
            exemptionPara
        ] : [
            frame,
            exemptionPara,
            localPara,
            rankPara,
            mechanicsPara
        ];
    }
    if (quirk) {
        // Curated structural facts sit right after the opening frame.
        paragraphs.splice(1, 0, quirk);
    }
    const keyRates = buildKeyRates(stateKey, state, tier);
    const faqs = buildFaqs(stateKey, state, tier);
    const headings = buildHeadings(state.name, stateKey, tier);
    return {
        howItWorks: paragraphs,
        keyRates,
        faqs,
        relatedStates,
        ...headings
    };
}
// ─── No-Tax State Content ────────────────────────────────────────────────────
function getNoTaxStateContent(stateKey, state, relatedStates) {
    const name = state.name;
    const abbr = state.abbreviation;
    const rank = COMBINED_RANK[stateKey];
    const avgPct = pct(NATIONAL_AVG_COMBINED);
    const savingsVsAvg = (1000 * (NATIONAL_AVG_COMBINED - state.combinedRate)).toFixed(2);
    const noTaxDetails = {
        delaware: {
            reason: 'Delaware has never had a sales tax. The state relies on its franchise tax on corporations (thanks to being the incorporation capital of the US) and its gross receipts tax on businesses instead.',
            reasonShort: 'Delaware has never had a sales tax — it funds government through its franchise tax on corporations (it\'s the incorporation capital of the US) and a gross receipts tax on businesses.',
            alternatives: 'Delaware charges a gross receipts tax on businesses (0.0945% to 1.9913%) which is technically paid by the seller, though some costs may be passed to consumers through higher prices.'
        },
        montana: {
            reason: 'Montana has no state sales tax and no local sales taxes. The state relies on income tax and property tax to fund government services. Montana voters have rejected sales tax proposals multiple times.',
            reasonShort: 'Montana relies on income tax and property tax instead, and voters have rejected sales tax proposals multiple times — there\'s no state sales tax and no local sales taxes.',
            alternatives: 'Montana charges a state income tax (1% to 5.9%) and property taxes. Some tourist-heavy areas near national parks have considered resort taxes, but statewide sales tax remains at 0%.'
        },
        newhampshire: {
            reason: 'New Hampshire has no state sales tax and no local sales tax. The state prides itself on this and funds government through property taxes, business taxes, and meals/rooms taxes instead.',
            reasonShort: 'New Hampshire funds government through property taxes, business taxes, and meals/rooms taxes instead — "Live Free or Die" applies to the cash register too.',
            alternatives: 'While there\'s no general sales tax, New Hampshire does charge a 9% tax on restaurant meals, 9% on hotel rooms, and 9% on motor vehicle rentals. These are targeted taxes, not a general sales tax.'
        },
        oregon: {
            reason: 'Oregon has no state sales tax. The state relies on its progressive income tax (4.75% to 9.9%) and property taxes. Oregon voters have rejected sales tax proposals multiple times — most recently in the 1990s.',
            reasonShort: 'Oregon leans on one of the higher income taxes in the country (up to 9.9%) and property taxes instead, and voters have rejected sales tax proposals multiple times.',
            alternatives: 'Oregon has one of the highest state income tax rates in the country (up to 9.9%), plus property taxes. Some cities charge a small local tax on prepared food and beverages, but there is no general sales tax.'
        },
        alaska: {
            reason: 'Alaska has no state sales tax. Instead, the state relies heavily on oil revenue and the Alaska Permanent Fund to fund government services. In fact, Alaska pays residents a dividend each year from the Permanent Fund.',
            reasonShort: 'Alaska funds government largely through oil revenue and the Alaska Permanent Fund — which pays residents a dividend each year — rather than a sales tax.',
            alternatives: 'While there\'s no state sales tax, many Alaska municipalities do charge local sales taxes. The average local rate is about 1.82%, and some cities charge up to 7.5%. These local taxes fund city and borough services.'
        }
    };
    const details = noTaxDetails[stateKey] || {
        reason: `${name} has no state sales tax.`,
        reasonShort: `${name} funds government through other tax mechanisms.`,
        alternatives: `${name} funds government through other tax mechanisms.`
    };
    const isAlaska = stateKey === 'alaska';
    const v = variantOf(stateKey);
    const otherZeroTaxStates = ALL_STATE_KEYS.filter((k)=>k !== stateKey && STATE_SALES_TAX[k].noStateTax && STATE_SALES_TAX[k].combinedRate === 0).map((k)=>STATE_SALES_TAX[k].name);
    // Opening paragraph — varies by state variant.
    const openers = [
        `${name} has <strong>0% state sales tax</strong>. ${details.reason} This means when you buy most goods and services in ${name}, no sales tax is added to the purchase price. A $100 item costs $100 — not $107 or $108 like in most other states.`,
        `${name} is one of the handful of states with <strong>no state sales tax — 0%</strong>. ${details.reason} The shelf price in ${name} is the register price: a $100 item rings up at exactly $100.`,
        `There is no state sales tax in ${name} — <strong>0%</strong>, full stop. ${details.reason} For shoppers, that means the number on the price tag is the number on the receipt.`
    ];
    // Rank & scale paragraph (all computed).
    const rankParagraph = isAlaska ? `Alaska's 1.82% average — entirely local tax — still ranks #${rank} of 50 states, above only the four states that collect nothing at all. Against the ${avgPct}% 50-state average, shopping in Alaska saves about $${savingsVsAvg} per $1,000 spent.` : `${name} shares the bottom of the national rankings with ${otherZeroTaxStates.slice(0, 3).join(', ')}, and Alaska's 1.82% local-only average: nothing collects on retail purchases in ${name}, so it ranks #${rank} of 50 by combined rate. The gap matters — versus the ${avgPct}% average state, each $1,000 of shopping in ${name} keeps $${savingsVsAvg} in your pocket.`;
    const localParagraph = isAlaska ? `Even though Alaska has no state sales tax, many local municipalities add their own. The average local sales tax across Alaska is about 1.82%. Some cities like Juneau charge up to 5%, while others like Anchorage charge 0%. This calculator can handle the local rate — just enter your city's rate if you know it.` : `${details.alternatives}`;
    const contextParagraph = isAlaska ? `Alaska's setup is unique: no statewide rate, but dozens of boroughs and cities levy their own local taxes to fund services. The 1.82% figure is an average across those jurisdictions — actual rates depend entirely on where in Alaska you're shopping.` : `${name} is one of only four US states with zero sales tax at both the state and local level (${otherZeroTaxStates.slice(0, 4).join(', ')}). Alaska has no state sales tax but allows local taxes. For shoppers, ${name} is about as good as it gets — no surprise taxes at the register.`;
    const onlineParagraph = `Online shopping from ${name} works the same way. Since ${name} has no sales tax to collect${isAlaska ? ' at the state level' : ''}, most online orders ship tax-free${isAlaska ? ' unless the delivery address sits in a borough or city with a local tax' : ''}. If a retailer has a physical presence in a tax-collecting state, the rules can get complicated — but for most everyday online purchases, ${abbr} residents don't pay sales tax.`;
    const neighborNames = relatedStates.length > 0 ? relatedStates.slice(0, 3).map((r)=>STATE_SALES_TAX[r.slug]?.name || r.slug).join(', ') : '';
    const neighborParagraph = neighborNames ? `Curious how ${name} compares to neighboring states? Nearby states like ${neighborNames} do charge sales tax, so cross-border shopping trips from those states into ${name} are common. Use our <a href="/sales-tax-calculator">general sales tax calculator</a> to see rates for any state.` : `Compare rates for any state with our <a href="/sales-tax-calculator">general sales tax calculator</a>.`;
    const paragraphs = [
        openers[v],
        rankParagraph,
        localParagraph,
        contextParagraph,
        onlineParagraph,
        neighborParagraph
    ];
    const keyRates = [
        {
            label: `${name} State Rate`,
            value: '0%'
        },
        {
            label: `${name} Local Rate`,
            value: isAlaska ? 'Avg 1.82% (varies by city)' : '0%'
        },
        {
            label: `${name} Combined Rate`,
            value: isAlaska ? '~1.82% (local only)' : '0%'
        },
        {
            label: 'Tax on $1,000',
            value: isAlaska ? '~$18.20 (local only)' : '$0.00'
        },
        {
            label: 'No-Tax States',
            value: 'DE, MT, NH, OR (AK: local only)'
        }
    ];
    const faqs = [
        {
            question: `Does ${name} have sales tax?`,
            answer: `No. ${name} has no state sales tax${isAlaska ? ', though some local municipalities may charge their own sales taxes' : ' and no local sales taxes either'}. Most purchases in ${name} are tax-free at the point of sale.`
        },
        {
            question: `How does ${name} fund government without sales tax?`,
            answer: details.reasonShort
        },
        {
            question: isAlaska ? 'Do any cities in Alaska charge sales tax?' : `Are there any taxes on purchases in ${name}?`,
            answer: isAlaska ? 'Yes. While Alaska has no state sales tax, many municipalities charge local sales taxes. Juneau charges up to 5%, Ketchikan 3.5%, and Wasilla 2.5%. Anchorage and Fairbanks do not charge local sales tax.' : stateKey === 'newhampshire' ? 'While there\'s no general sales tax, New Hampshire charges 9% tax on restaurant meals, hotel rooms, and car rentals. These are specific excise taxes, not a general sales tax. Most retail purchases are tax-free.' : `No. Most retail purchases in ${name} are completely tax-free. There is no state or local sales tax on goods and services at the point of sale.`
        },
        {
            question: `Do I pay sales tax on online purchases in ${name}?`,
            answer: `Generally no. Since ${name} has no state sales tax, online retailers don't collect ${name} sales tax. However, if the retailer has a physical presence in another state that charges sales tax, the rules can vary. For most online shopping, ${name} residents don't pay sales tax.`
        },
        {
            question: `Is it worth driving to ${name} to avoid sales tax?`,
            answer: `It depends on what you're buying. Against the ${avgPct}% 50-state average, a $1,000 purchase in ${name} saves about $${savingsVsAvg}. On a $10,000 purchase, that scales to roughly $${(10000 * (NATIONAL_AVG_COMBINED - state.combinedRate)).toFixed(0)}. For big-ticket items the savings can justify a trip, especially near the border — just remember your home state may require use tax on out-of-state purchases.`
        },
        {
            question: `Where does ${name} rank nationally on sales tax?`,
            answer: isAlaska ? `#46 of 50. Only the four zero-tax states (Delaware, Montana, New Hampshire, Oregon) have a lower average than Alaska's 1.82% local-only figure. Every other state collects more.` : `At the very bottom — #${rank} of 50, tied with ${otherZeroTaxStates.slice(0, 3).join(', ')} as the only states that collect no sales tax at all. No shopper anywhere in the US pays less at the register than ${name} residents do.`
        }
    ];
    const headings = buildHeadings(name, stateKey, 'low');
    return {
        howItWorks: paragraphs,
        keyRates,
        faqs,
        relatedStates,
        ...headings
    };
}
function getStateJsonLd(stateKey, siteUrl) {
    const state = STATE_SALES_TAX[stateKey];
    const seo = getStateSEOMeta(stateKey);
    const content = getStateContent(stateKey);
    if (!state) return null;
    const statePct = state.noStateTax ? '0' : formatRate(state.stateRate);
    const localPct = pct(state.avgLocalRate);
    const combinedPct = pct(state.combinedRate);
    const url = `${siteUrl}/sales-tax-calculator/${stateKeyToSlug(stateKey)}`;
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@id': `${url}#breadcrumb`,
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: siteUrl
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Sales Tax Calculator',
                        item: `${siteUrl}/sales-tax-calculator`
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: `${state.name} Sales Tax`
                    }
                ]
            },
            {
                '@id': `${url}#webpage`,
                '@type': 'WebPage',
                name: `${state.name} Sales Tax Calculator 2026`,
                description: `Calculate sales tax for ${state.name}. ${state.noStateTax ? 'No state sales tax.' : `Combined rate: ${combinedPct}%.`} Free, no sign-up required.`,
                url,
                inLanguage: 'en-US',
                dateModified: '2026-10-24',
                author: {
                    '@id': `${url}#author`
                },
                reviewedBy: {
                    '@id': `${url}#author`
                },
                publisher: {
                    '@id': `${siteUrl}/#organization`
                },
                breadcrumb: {
                    '@id': `${url}#breadcrumb`
                }
            },
            {
                '@id': `${url}#webapp`,
                '@type': 'WebApplication',
                name: `${state.name} Sales Tax Calculator 2026`,
                url,
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Web',
                offers: {
                    '@type': 'Offer',
                    price: 0,
                    priceCurrency: 'USD'
                },
                author: {
                    '@id': `${url}#author`
                },
                publisher: {
                    '@id': `${siteUrl}/#organization`
                }
            },
            // Dataset removed — Google flags "Invalid value in field itemtype" for Dataset on calculator pages
            {
                '@id': `${url}#faq`,
                '@type': 'FAQPage',
                mainEntity: content.faqs.map((faq)=>({
                        '@type': 'Question',
                        name: faq.question,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: faq.answer
                        }
                    }))
            }
        ]
    };
}
}),
"[project]/src/lib/state-tax-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * State Tax Data — Used to generate unique content for states
 * that don't have hand-written content in _content.ts
 *
 * This fixes the "duplicate content" issue identified in the competitive analysis.
 * Each state gets unique: tax rates, examples, FAQs, and facts.
 */ __turbopack_context__.s([
    "STATE_TAX_DATA",
    ()=>STATE_TAX_DATA,
    "generateStateContent",
    ()=>generateStateContent
]);
const STATE_TAX_DATA = {
    alaska: {
        name: 'Alaska',
        slug: 'alaska-tax-calculator',
        incomeTaxRate: '0%',
        incomeTaxDesc: 'No state income tax. Alaska abolished its income tax in 1980.',
        salesTax: '0% state (localities up to 7.5%)',
        propertyTax: '1.18%',
        uniqueFact: 'Alaska pays residents an annual Permanent Fund Dividend (PFD) from oil revenue — about $1,300–$3,200 per person.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$61,592',
        isNoIncomeTax: true,
        isFlatTax: false,
        topRate: '0%'
    },
    nevada: {
        name: 'Nevada',
        slug: 'nevada-tax-calculator',
        incomeTaxRate: '0%',
        incomeTaxDesc: 'No state income tax. Nevada\'s constitution prohibits it.',
        salesTax: '6.85% state (8.23% avg combined)',
        propertyTax: '0.69%',
        uniqueFact: 'Nevada relies on gaming and tourism taxes. The "live entertainment tax" and hotel room taxes fund the state budget.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$61,592',
        isNoIncomeTax: true,
        isFlatTax: false,
        topRate: '0%'
    },
    southdakota: {
        name: 'South Dakota',
        slug: 'south-dakota-tax-calculator',
        incomeTaxRate: '0%',
        incomeTaxDesc: 'No state income tax on individuals or corporations.',
        salesTax: '4.5% state (6.4% avg combined)',
        propertyTax: '1.32%',
        uniqueFact: 'South Dakota is a major banking hub due to favorable banking laws. No corporate income tax either.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$61,592',
        isNoIncomeTax: true,
        isFlatTax: false,
        topRate: '0%'
    },
    wyoming: {
        name: 'Wyoming',
        slug: 'wyoming-tax-calculator',
        incomeTaxRate: '0%',
        incomeTaxDesc: 'No state income tax on individuals or corporations.',
        salesTax: '4% state (5.36% avg combined)',
        propertyTax: '0.61%',
        uniqueFact: 'Wyoming has the lowest property tax rate in the nation (0.61%). Coal and natural gas extraction funds government.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$61,592',
        isNoIncomeTax: true,
        isFlatTax: false,
        topRate: '0%'
    },
    newhampshire: {
        name: 'New Hampshire',
        slug: 'new-hampshire-tax-calculator',
        incomeTaxRate: '0% on wages',
        incomeTaxDesc: 'No tax on wages. Dividends/interest tax fully phased out by 2025.',
        salesTax: '0% state sales tax',
        propertyTax: '2.18%',
        uniqueFact: 'New Hampshire has no sales tax AND no income tax on wages — but the 3rd highest property taxes in the U.S.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$61,592',
        isNoIncomeTax: true,
        isFlatTax: false,
        topRate: '0%'
    },
    connecticut: {
        name: 'Connecticut',
        slug: 'connecticut-tax-calculator',
        incomeTaxRate: '2%–6.99%',
        incomeTaxDesc: 'Progressive income tax with 7 brackets. Top rate 6.99% above $500,000; the first $10,000 is taxed at 2%.',
        salesTax: '6.35%',
        propertyTax: '2.14%',
        uniqueFact: 'Connecticut has the 2nd highest property tax rate (2.14%) and one of the highest combined tax burdens in the U.S.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,020',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '6.99%'
    },
    alabama: {
        name: 'Alabama',
        slug: 'alabama-tax-calculator',
        incomeTaxRate: '2%–5%',
        incomeTaxDesc: 'Progressive income tax. 2% on first $500, 4% to $3,000, 5% above $3,000.',
        salesTax: '4% state (9.16% avg combined)',
        propertyTax: '0.41%',
        uniqueFact: 'Alabama has the LOWEST property tax rate in the nation (0.41%) but one of the highest combined sales taxes (9.16%).',
        exampleSalary: '$75,000',
        exampleTakeHome: '$60,100',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '5%'
    },
    arkansas: {
        name: 'Arkansas',
        slug: 'arkansas-tax-calculator',
        incomeTaxRate: '0%–3.9%',
        incomeTaxDesc: 'Progressive income tax. Top rate 3.9% above $26,399 for 2026; first $5,599 of taxable income is tax-free.',
        salesTax: '6.5% state (9.3% avg combined)',
        propertyTax: '0.68%',
        uniqueFact: 'Arkansas has very low income tax brackets — the top rate of 3.9% kicks in at just $26,400.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$59,185',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '3.9%'
    },
    delaware: {
        name: 'Delaware',
        slug: 'delaware-tax-calculator',
        incomeTaxRate: '0%–6.6%',
        incomeTaxDesc: 'Progressive income tax. Top rate 6.6% above $60,000; the first $2,000 of taxable income is exempt.',
        salesTax: '0% state sales tax',
        propertyTax: '0.69%',
        uniqueFact: 'Delaware has NO state sales tax. Over 60% of Fortune 500 companies are incorporated here.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$57,875',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '6.6%'
    },
    hawaii: {
        name: 'Hawaii',
        slug: 'hawaii-tax-calculator',
        incomeTaxRate: '1.4%–11%',
        incomeTaxDesc: 'Most progressive income tax in the U.S. 1.4% on first $2,400 up to 11% above $200,000.',
        salesTax: '4% (General Excise Tax)',
        propertyTax: '0.31%',
        uniqueFact: 'Hawaii has the HIGHEST top income tax rate (11%) but the LOWEST property tax rate (0.31%) in the nation.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$57,200',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '11%'
    },
    idaho: {
        name: 'Idaho',
        slug: 'idaho-tax-calculator',
        incomeTaxRate: '5.3% flat',
        incomeTaxDesc: 'Flat income tax rate of 5.3% for 2026, plus a small 0% first bracket up to about $4,800.',
        salesTax: '6% state (8.2% avg combined)',
        propertyTax: '0.75%',
        uniqueFact: 'Idaho switched to a flat tax in 2023 and has been steadily reducing the rate each year.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,730',
        isNoIncomeTax: false,
        isFlatTax: true,
        topRate: '5.3%'
    },
    iowa: {
        name: 'Iowa',
        slug: 'iowa-tax-calculator',
        incomeTaxRate: '3.8% flat',
        incomeTaxDesc: 'Flat income tax rate of 3.8% for 2026 — all income levels taxed at this single rate.',
        salesTax: '6% state (6.94% avg combined)',
        propertyTax: '1.53%',
        uniqueFact: 'Iowa taxes all income at a single 3.8% flat rate for 2026 — one of the lowest flat rates in the country.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$59,355',
        isNoIncomeTax: false,
        isFlatTax: true,
        topRate: '3.8%'
    },
    kansas: {
        name: 'Kansas',
        slug: 'kansas-tax-calculator',
        incomeTaxRate: '5.2%–5.58%',
        incomeTaxDesc: 'Two-bracket income tax for 2026: 5.2% up to $23,000, 5.58% above.',
        salesTax: '6.5% state (8.7% avg combined)',
        propertyTax: '1.41%',
        uniqueFact: 'Kansas has relatively high property taxes and the state sales tax is among the highest in the Midwest.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,720',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '5.58%'
    },
    kentucky: {
        name: 'Kentucky',
        slug: 'kentucky-tax-calculator',
        incomeTaxRate: '3.5% flat',
        incomeTaxDesc: 'Flat income tax rate of 3.5% for 2026.',
        salesTax: '6% state',
        propertyTax: '0.86%',
        uniqueFact: 'Kentucky adopted a flat tax in 2018 and has been gradually reducing it (from 5% in 2023 to 3.5% for 2026).',
        exampleSalary: '$75,000',
        exampleTakeHome: '$59,085',
        isNoIncomeTax: false,
        isFlatTax: true,
        topRate: '3.5%'
    },
    louisiana: {
        name: 'Louisiana',
        slug: 'louisiana-tax-calculator',
        incomeTaxRate: '3% flat',
        incomeTaxDesc: 'Flat income tax rate of 3% for 2026 (replaced the old bracket system in 2025).',
        salesTax: '4.45% state (9.55% avg combined)',
        propertyTax: '0.55%',
        uniqueFact: 'Louisiana has one of the highest combined sales tax rates (9.55%) but very low property taxes (0.55%).',
        exampleSalary: '$75,000',
        exampleTakeHome: '$59,730',
        isNoIncomeTax: false,
        isFlatTax: true,
        topRate: '3%'
    },
    maine: {
        name: 'Maine',
        slug: 'maine-tax-calculator',
        incomeTaxRate: '5.8%–7.15%',
        incomeTaxDesc: 'Progressive income tax. Top rate 7.15% above $54,450.',
        salesTax: '5.5% state',
        propertyTax: '1.27%',
        uniqueFact: 'Maine has no local sales taxes — just the state rate of 5.5%, making it one of the lowest sales tax states in New England.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,200',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '7.15%'
    },
    mississippi: {
        name: 'Mississippi',
        slug: 'mississippi-tax-calculator',
        incomeTaxRate: '4% flat',
        incomeTaxDesc: 'Flat income tax rate of 4% for 2026 after a $10,000 exemption.',
        salesTax: '7% state',
        propertyTax: '0.71%',
        uniqueFact: 'Mississippi has the highest state sales tax rate in the U.S. at 7% (no local add-ons).',
        exampleSalary: '$75,000',
        exampleTakeHome: '$59,325',
        isNoIncomeTax: false,
        isFlatTax: true,
        topRate: '4%'
    },
    montana: {
        name: 'Montana',
        slug: 'montana-tax-calculator',
        incomeTaxRate: '4.7%–5.65%',
        incomeTaxDesc: 'Two-bracket income tax for 2026: 4.7% up to $47,500, then 5.65% above.',
        salesTax: '0% state sales tax',
        propertyTax: '0.94%',
        uniqueFact: 'Montana has NO state sales tax — one of only 5 states with none. The state relies on income and property taxes.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,715',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '5.65%'
    },
    nebraska: {
        name: 'Nebraska',
        slug: 'nebraska-tax-calculator',
        incomeTaxRate: '2.46%–4.55%',
        incomeTaxDesc: 'Progressive income tax with 3 brackets for 2026. Top rate 4.55% above $24,760.',
        salesTax: '5.5% state (6.94% avg combined)',
        propertyTax: '1.69%',
        uniqueFact: 'Nebraska has some of the highest property taxes in the Midwest (1.69%), particularly in agricultural areas.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,885',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '4.55%'
    },
    newmexico: {
        name: 'New Mexico',
        slug: 'new-mexico-tax-calculator',
        incomeTaxRate: '1.5%–5.9%',
        incomeTaxDesc: 'Progressive income tax with 4 brackets for 2026. Top rate 5.9% above $210,000.',
        salesTax: '5.125% state (7.69% avg combined)',
        propertyTax: '0.79%',
        uniqueFact: 'New Mexico has low income tax brackets — just 1.5% on the first $5,500 of taxable income.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$59,230',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '5.9%'
    },
    northdakota: {
        name: 'North Dakota',
        slug: 'north-dakota-tax-calculator',
        incomeTaxRate: '0%–2.5%',
        incomeTaxDesc: 'Three-bracket income tax for 2026: 0% up to about $48,475, 1.95% to $244,825, 2.5% above — one of the lowest in the nation.',
        salesTax: '5% state (6.96% avg combined)',
        propertyTax: '1.07%',
        uniqueFact: 'North Dakota has the LOWEST top income tax rate in the nation at just 2.5%. Oil revenue from the Bakken formation funds the state.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$61,390',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '2.5%'
    },
    oklahoma: {
        name: 'Oklahoma',
        slug: 'oklahoma-tax-calculator',
        incomeTaxRate: '0%–4.5%',
        incomeTaxDesc: 'Progressive income tax for 2026: 0% on the first $3,750, top rate 4.5% above $7,200.',
        salesTax: '4.5% state (8.95% avg combined)',
        propertyTax: '0.95%',
        uniqueFact: 'Oklahoma has a 0% income tax bracket for 2026 — the first $3,750 of taxable income is tax-free.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,805',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '4.5%'
    },
    rhodeisland: {
        name: 'Rhode Island',
        slug: 'rhode-island-tax-calculator',
        incomeTaxRate: '3.75%–5.99%',
        incomeTaxDesc: 'Progressive income tax with 3 brackets. Top rate 5.99% above $68,200.',
        salesTax: '7% state',
        propertyTax: '1.63%',
        uniqueFact: 'Rhode Island has no local sales taxes — just the state rate of 7%, one of the highest in New England.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,600',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '5.99%'
    },
    southcarolina: {
        name: 'South Carolina',
        slug: 'south-carolina-tax-calculator',
        incomeTaxRate: '0%–6%',
        incomeTaxDesc: 'Progressive income tax. Top rate 6% above $18,230 for 2026. First $3,640 of taxable income is tax-free.',
        salesTax: '6% state (7.44% avg combined)',
        propertyTax: '0.56%',
        uniqueFact: 'South Carolina exempts the first $3,640 of taxable income from taxation and caps property tax increases for primary residences.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,715',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '6%'
    },
    utah: {
        name: 'Utah',
        slug: 'utah-tax-calculator',
        incomeTaxRate: '4.45% flat',
        incomeTaxDesc: 'Flat income tax rate of 4.45% for 2026.',
        salesTax: '5.95% state (7.19% avg combined)',
        propertyTax: '0.66%',
        uniqueFact: 'Utah has a flat income tax and relatively low property taxes, making it one of the more tax-friendly Mountain West states.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$58,970',
        isNoIncomeTax: false,
        isFlatTax: true,
        topRate: '4.45%'
    },
    vermont: {
        name: 'Vermont',
        slug: 'vermont-tax-calculator',
        incomeTaxRate: '3.35%–8.75%',
        incomeTaxDesc: 'Progressive income tax with 8 brackets. Top rate 8.75% above $251,900.',
        salesTax: '6% state (6.96% avg combined)',
        propertyTax: '1.86%',
        uniqueFact: 'Vermont has one of the highest top income tax rates (8.75%) and the 4th highest property tax rate in the U.S.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$57,800',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '8.75%'
    },
    westvirginia: {
        name: 'West Virginia',
        slug: 'west-virginia-tax-calculator',
        incomeTaxRate: '2.11%–4.58%',
        incomeTaxDesc: 'Progressive income tax with 5 brackets for 2026. Top rate 4.58% above $60,000.',
        salesTax: '6% state',
        propertyTax: '0.57%',
        uniqueFact: 'West Virginia has been gradually eliminating its income tax and has some of the lowest property taxes in the nation.',
        exampleSalary: '$75,000',
        exampleTakeHome: '$59,045',
        isNoIncomeTax: false,
        isFlatTax: false,
        topRate: '4.58%'
    }
};
function generateStateContent(stateKey) {
    const data = STATE_TAX_DATA[stateKey];
    if (!data) return null;
    const taxType = data.isNoIncomeTax ? 'no state income tax' : data.isFlatTax ? `a flat ${data.incomeTaxRate} income tax` : `a progressive income tax ranging from ${data.incomeTaxRate}`;
    const comparisonText = data.isNoIncomeTax ? `Living in ${data.name} means ${data.uniqueFact.toLowerCase()} On a ${data.exampleSalary} salary, your take-home pay is approximately ${data.exampleTakeHome} per year — the same as other no-income-tax states like Texas and Florida.` : `${data.name} has ${taxType}. ${data.uniqueFact} On a ${data.exampleSalary} salary (single filer), your take-home pay is approximately ${data.exampleTakeHome} per year after federal tax, FICA, and state income tax.`;
    return {
        howItWorks: [
            `${data.name} ${data.isNoIncomeTax ? 'has no state income tax' : `income tax rate: ${data.incomeTaxRate}`}. ${data.incomeTaxDesc} This means your paycheck in ${data.name} is only reduced by federal income tax and FICA — ${data.isNoIncomeTax ? 'no state tax line item at all' : `plus state tax at ${data.topRate} top rate`}.`,
            `The 2026 federal tax brackets apply the same way in ${data.name} as everywhere else: 10%–37% progressive rates after the $16,100 standard deduction (single) or $32,200 (married). FICA adds 6.2% Social Security (up to $184,500) + 1.45% Medicare.`,
            comparisonText,
            `${data.name} also has a ${data.salesTax} sales tax and ${data.propertyTax} average effective property tax rate. ${data.uniqueFact}`,
            `Use the calculator above to see your exact take-home pay in ${data.name}. Enter your salary, filing status, and any pre-tax deductions to get an instant, accurate result — no sign-up required.`
        ],
        calculationMethod: {
            formula: data.isNoIncomeTax ? `Net Pay = Gross Income − (Federal Tax + FICA) — ${data.name} has no state income tax` : `Net Pay = Gross Income − (Federal Tax + State Tax + FICA)`,
            steps: [
                data.isNoIncomeTax ? `${data.name} has 0% state income tax — skip state tax entirely` : `Apply ${data.name} ${data.isFlatTax ? 'flat' : 'progressive'} income tax (${data.incomeTaxRate})`,
                'Subtract pre-tax deductions (401(k), HSA) from gross pay',
                'Apply federal standard deduction ($16,100 single / $32,200 married)',
                'Calculate federal tax using progressive brackets (10%–37%)',
                'Calculate FICA: 6.2% Social Security (up to $184,500) + 1.45% Medicare',
                'Subtract all taxes from gross pay to get net take-home pay'
            ],
            example: `$${data.exampleSalary.replace(/[^0-9]/g, '')} salary, single in ${data.name}: Federal tax ≈ $7,670. FICA = $5,738. ${data.isNoIncomeTax ? 'State tax = $0.' : `State tax varies.`} Net ≈ ${data.exampleTakeHome}/year.`
        },
        keyRates: [
            {
                label: `${data.name} Income Tax`,
                value: data.incomeTaxRate
            },
            {
                label: `${data.name} Sales Tax`,
                value: data.salesTax
            },
            {
                label: `${data.name} Property Tax`,
                value: data.propertyTax
            },
            {
                label: 'Federal Standard Deduction',
                value: '$16,100 (single)'
            },
            {
                label: 'FICA Social Security',
                value: '6.2% (up to $184,500)'
            }
        ],
        faqs: [
            {
                question: `Does ${data.name} have a state income tax?`,
                answer: data.isNoIncomeTax ? `No. ${data.name} has no state income tax on wages. ${data.incomeTaxDesc}` : `Yes. ${data.name} has ${taxType}. ${data.incomeTaxDesc}`
            },
            {
                question: `What is the tax rate in ${data.name}?`,
                answer: `${data.name} has a ${data.incomeTaxRate} income tax rate, ${data.salesTax} sales tax, and ${data.propertyTax} average property tax rate. ${data.uniqueFact}`
            },
            {
                question: `How much is $75,000 after taxes in ${data.name}?`,
                answer: `On a $75,000 salary in ${data.name} (single filer), your take-home pay is approximately ${data.exampleTakeHome} per year. This includes federal tax (~$7,670), FICA (~$5,738), and ${data.isNoIncomeTax ? '$0 state tax' : 'state income tax'}. Your monthly take-home would be about $${Math.round(parseInt(data.exampleTakeHome.replace(/[^0-9]/g, '')) / 12).toLocaleString()}.`
            },
            {
                question: `Is ${data.name} a tax-friendly state?`,
                answer: data.isNoIncomeTax ? `Yes, ${data.name} is very tax-friendly for income — zero state income tax means you keep more of your paycheck. However, ${data.name} compensates with ${data.salesTax} sales tax and ${data.propertyTax} property tax. The overall burden depends on your spending and homeownership situation.` : `${data.name} has a ${data.topRate} top income tax rate, which is ${parseFloat(data.topRate) < 5 ? 'among the lowest' : parseFloat(data.topRate) < 7 ? 'moderate' : 'among the highest'} in the nation. Combined with ${data.salesTax} sales tax and ${data.propertyTax} property tax, the overall tax burden is ${parseFloat(data.topRate) < 5 ? 'relatively low' : 'moderate to high'} compared to other states.`
            },
            {
                question: `Does ${data.name} tax retirement income?`,
                answer: data.isNoIncomeTax ? `No. ${data.name} has no state income tax, so Social Security, 401(k) withdrawals, IRAs, and pensions are all tax-free at the state level.` : `${data.name} taxes retirement income as part of your regular income at the ${data.incomeTaxRate} rate. Some states exempt Social Security or pension income — check with a tax professional for your specific situation.`
            }
        ],
        relatedCalculators: [
            {
                slug: 'paycheck-calculator',
                label: 'Paycheck Calculator'
            },
            {
                slug: 'texas-tax-calculator',
                label: 'Texas Calculator (0% tax)'
            },
            {
                slug: 'florida-tax-calculator',
                label: 'Florida Calculator (0% tax)'
            },
            {
                slug: 'california-tax-calculator',
                label: 'California Calculator'
            },
            {
                slug: 'illinois-tax-calculator',
                label: 'Illinois Calculator'
            },
            {
                slug: 'relocation-calculator',
                label: 'Relocation Calculator'
            }
        ]
    };
}
}),
"[project]/src/components/home/hero-calculator.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroCalculator",
    ()=>HeroCalculator
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HeroCalculator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HeroCalculator() from the server but HeroCalculator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/home/hero-calculator.tsx <module evaluation>", "HeroCalculator");
}),
"[project]/src/components/home/hero-calculator.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroCalculator",
    ()=>HeroCalculator
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HeroCalculator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HeroCalculator() from the server but HeroCalculator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/home/hero-calculator.tsx", "HeroCalculator");
}),
"[project]/src/components/home/hero-calculator.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2d$calculator$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/home/hero-calculator.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2d$calculator$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/home/hero-calculator.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2d$calculator$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/home/calculator-browser.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CalculatorBrowser",
    ()=>CalculatorBrowser
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CalculatorBrowser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CalculatorBrowser() from the server but CalculatorBrowser is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/home/calculator-browser.tsx <module evaluation>", "CalculatorBrowser");
}),
"[project]/src/components/home/calculator-browser.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CalculatorBrowser",
    ()=>CalculatorBrowser
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CalculatorBrowser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CalculatorBrowser() from the server but CalculatorBrowser is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/home/calculator-browser.tsx", "CalculatorBrowser");
}),
"[project]/src/components/home/calculator-browser.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$calculator$2d$browser$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/home/calculator-browser.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$calculator$2d$browser$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/home/calculator-browser.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$calculator$2d$browser$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/home/states-tax-table.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatesTaxTable",
    ()=>StatesTaxTable
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const StatesTaxTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call StatesTaxTable() from the server but StatesTaxTable is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/home/states-tax-table.tsx <module evaluation>", "StatesTaxTable");
}),
"[project]/src/components/home/states-tax-table.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatesTaxTable",
    ()=>StatesTaxTable
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const StatesTaxTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call StatesTaxTable() from the server but StatesTaxTable is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/home/states-tax-table.tsx", "StatesTaxTable");
}),
"[project]/src/components/home/states-tax-table.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$states$2d$tax$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/home/states-tax-table.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$states$2d$tax$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/home/states-tax-table.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$states$2d$tax$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$salary$2d$calculations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/salary-calculations.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/blog-index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$compare$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/compare-config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authors.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$finance$2f$author$2d$bio$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/finance/author-bio-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2d$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/calculator-routes.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$state$2d$sales$2d$tax$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/state-sales-tax-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$state$2d$tax$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/state-tax-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2d$calculator$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/hero-calculator.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$calculator$2d$browser$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/calculator-browser.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$states$2d$tax$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/states-tax-table.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-rsc] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-rsc] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-rsc] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calculator.js [app-rsc] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-rsc] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-rsc] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-rsc] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-rsc] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-rsc] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-rsc] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/compass.js [app-rsc] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-rsc] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-rsc] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-rsc] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.js [app-rsc] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-rsc] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-rsc] (ecmascript) <export default as Building>");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// ─── Dynamic Counts (single source of truth) ─────────────────────────────────
// TOTAL_CALCULATOR_COUNT = 70 route-based calculators + 5 standalone pages.
// Never hardcode this number anywhere — import it (audit 2026-10: site quoted
// 67, 64, and 72 in different places).
const CALCULATOR_COUNT = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2d$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TOTAL_CALCULATOR_COUNT"];
const BLOG_COUNT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishedPostsMeta"])().length;
const LATEST_POSTS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishedPostsMeta"])().slice(0, 3);
// 50-state table rows (income tax + sales tax). Replaces the old 50-tile
// grid — same /sales-tax-calculator/{slug} links, denser presentation.
const STATE_TABLE_ROWS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$state$2d$sales$2d$tax$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ALL_STATE_KEYS"].map((key)=>{
    const sales = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$state$2d$sales$2d$tax$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATE_SALES_TAX"][key];
    const tax = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$state$2d$tax$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATE_TAX_DATA"][key];
    return {
        key,
        name: sales.name,
        slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$state$2d$sales$2d$tax$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stateKeyToSlug"])(key),
        incomeTaxRate: tax?.incomeTaxRate ?? '—',
        salesTaxCombined: sales.noStateTax ? '0%' : `${(sales.combinedRate * 100).toFixed(2)}%`,
        isNoIncomeTax: Boolean(tax?.isNoIncomeTax)
    };
});
const metadata = {
    title: '2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States',
    description: `Free 2026 tax calculator. Take-home pay after federal, FICA & state tax. ${CALCULATOR_COUNT}+ tools & 50-state sales tax data. No sign-up.`,
    authors: [
        {
            name: 'Rachel Mitchell, CPA',
            url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/about#rachel-mitchell`
        }
    ],
    // canonical + og:url are emitted as literal tags in the JSX below: Next's
    // metadata resolver renders root URLs as origin-only
    // ("https://thetaxcalc.com" — no trailing slash, see
    // next/dist/lib/metadata/resolvers/resolve-url.js), which strict SEO
    // auditors string-compare against the audited URL "https://thetaxcalc.com/"
    // and report as "canonical points elsewhere → not indexable".
    alternates: {
        types: {
            'application/rss+xml': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/feed.xml`
        }
    },
    keywords: [
        'tax calculator 2026',
        '2025 tax calculator',
        'income tax calculator',
        'tax calculator',
        'paycheck calculator',
        'take home pay calculator',
        'tax liability',
        'tax preparation',
        'federal income tax',
        'itemized deductions',
        'gross income'
    ],
    openGraph: {
        title: '2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States',
        description: `Free 2026 tax calculator. Take-home pay after federal, FICA & state tax. ${CALCULATOR_COUNT}+ tools & 50-state sales tax data. No sign-up.`,
        siteName: 'TheTaxCalc',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/opengraph-image.png`,
                width: 1200,
                height: 630,
                alt: 'TheTaxCalc — Free 2026 Tax & Paycheck Calculator'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States',
        description: `Free 2026 tax calculator. Take-home pay after federal, FICA & state tax. ${CALCULATOR_COUNT}+ tools & 50-state sales tax data. No sign-up.`,
        images: [
            `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/opengraph-image.png`
        ]
    }
};
// ─── Calculator Cards (37 — every link from the previous grid is preserved) ───
const CALCULATOR_CARDS = [
    {
        href: '/paycheck-calculator',
        title: 'Paycheck Calculator',
        desc: 'Federal, FICA & state take-home pay with 401(k) and HSA deductions',
        badge: 'Most Popular',
        category: 'paycheck',
        featured: true,
        icon: 'DollarSign'
    },
    {
        href: '/illinois-tax-calculator',
        title: 'Illinois Tax Calculator',
        desc: '4.95% flat tax with $2,775 personal exemption — IL take-home pay',
        badge: 'IL',
        category: 'state',
        featured: true,
        icon: 'MapPin'
    },
    {
        href: '/texas-tax-calculator',
        title: 'Texas Tax Calculator',
        desc: '0% state income tax — compute TX take-home pay with property tax analysis',
        badge: 'TX',
        category: 'state',
        featured: true,
        icon: 'MapPin'
    },
    {
        href: '/florida-tax-calculator',
        title: 'Florida Tax Calculator',
        desc: '0% income tax + homestead exemption — FL take-home pay & cost of living',
        badge: 'FL',
        category: 'state',
        featured: true,
        icon: 'MapPin'
    },
    {
        href: '/california-tax-calculator',
        title: 'California Tax Calculator',
        desc: '1%–13.3% progressive brackets — CA take-home pay with high tax burden',
        badge: 'CA',
        category: 'state',
        featured: true,
        icon: 'MapPin'
    },
    {
        href: '/new-york-tax-calculator',
        title: 'New York Tax Calculator',
        desc: '4%–10.9% progressive + NYC tax — NY take-home pay analysis',
        badge: 'NY',
        category: 'state',
        featured: true,
        icon: 'MapPin'
    },
    {
        href: '/mortgage-calculator',
        title: 'Mortgage Calculator',
        desc: 'Monthly payment, amortization schedule & extra payment savings',
        badge: 'Finance',
        category: 'finance',
        featured: true,
        icon: 'Home'
    },
    {
        href: '/401k-retirement-calculator',
        title: '401(k) Retirement Calculator',
        desc: 'Projected balance with employer match & compound annual growth',
        badge: 'Planning',
        category: 'finance',
        featured: true,
        icon: 'PiggyBank'
    },
    {
        href: '/relocation-calculator',
        title: 'Relocation Calculator',
        desc: 'Compare equivalent salary between states — IL, TX, FL, CA, NY',
        badge: 'Compare',
        category: 'business',
        featured: true,
        icon: 'ArrowRightLeft'
    },
    {
        href: '/capital-gains-calculator',
        title: 'Capital Gains Calculator',
        desc: 'Short-term & long-term rates: 0%/15%/20% + 3.8% NIIT',
        badge: 'Invest',
        category: 'finance',
        featured: true,
        icon: 'TrendingUp'
    },
    {
        href: '/self-employment-tax-calculator',
        title: 'Self-Employment Calculator',
        desc: '15.3% SE tax on 92.35% of net income + half deduction + quarterly estimates',
        badge: 'Business',
        category: 'business',
        featured: true,
        icon: 'Shield'
    },
    {
        href: '/sales-tax-calculator',
        title: 'Sales Tax Calculator',
        desc: 'Calculate sales tax for any US state with combined state + local rates. Reverse calculator included',
        badge: '50 States',
        category: 'finance',
        featured: true,
        icon: 'Receipt'
    },
    {
        href: '/tax-refund-calculator',
        title: 'Tax Refund Calculator',
        desc: 'Estimate your federal & state tax refund — income, withholding, deductions & credits',
        badge: 'Refund',
        category: 'paycheck',
        icon: 'DollarSign'
    },
    {
        href: '/irs-withholding-calculator',
        title: 'IRS Withholding Calculator',
        desc: 'Calculate recommended federal withholding per paycheck & optimize your W-4 for 2026',
        badge: 'W-4',
        category: 'paycheck',
        icon: 'FileText'
    },
    {
        href: '/overtime-tax-calculator',
        title: 'No Tax on Overtime Calculator',
        desc: 'Calculate your savings under the 2025–2028 OT tax exemption law. Time-sensitive!',
        badge: '2025 Law',
        category: 'paycheck',
        icon: 'Clock'
    },
    {
        href: '/bonus-tax-calculator',
        title: 'Bonus Tax Calculator',
        desc: 'How much tax on your bonus? Compare 22% flat rate vs aggregate method',
        badge: 'Bonus',
        category: 'paycheck',
        icon: 'Gift'
    },
    {
        href: '/hourly-to-salary-calculator',
        title: 'Hourly to Salary Calculator',
        desc: 'Convert any hourly wage — see yearly, monthly, bi-weekly pay plus take-home in your state',
        badge: 'Converter',
        category: 'paycheck',
        icon: 'Clock'
    },
    {
        href: '/marriage-tax-calculator',
        title: 'Marriage Tax Calculator',
        desc: 'Marriage penalty or bonus? Compare two singles vs married filing jointly with 2026 brackets',
        badge: 'Marriage',
        category: 'paycheck',
        icon: 'ArrowRightLeft'
    },
    {
        href: '/compound-interest-calculator',
        title: 'Compound Interest Calculator',
        desc: 'Watch savings snowball — growth chart, Rule of 72 doubling, and year-by-year milestones',
        badge: 'Growth',
        category: 'finance',
        icon: 'TrendingUp'
    },
    {
        href: '/property-tax-calculator',
        title: 'Property Tax Calculator',
        desc: 'Calculate property tax for any US state. Compare all 50 states\' effective rates',
        badge: 'Property',
        category: 'finance',
        icon: 'Building'
    },
    {
        href: '/employee-cost-calculator',
        title: 'Employee Cost Calculator',
        desc: 'True cost of hiring — salary + employer FICA, FUTA, SUTA, and benefits for small businesses',
        badge: 'Employer',
        category: 'business',
        icon: 'Building'
    },
    {
        href: '/lottery-tax-calculator',
        title: 'Lottery Tax Calculator',
        desc: 'How much tax on lottery winnings? Federal + state taxes. Lump sum vs annuity comparison',
        badge: 'Lottery',
        category: 'business',
        icon: 'Ticket'
    },
    {
        href: '/georgia-tax-calculator',
        title: 'Georgia Tax Calculator',
        desc: '4.99% flat state tax — GA take-home pay with standard deductions',
        badge: 'GA',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/virginia-tax-calculator',
        title: 'Virginia Tax Calculator',
        desc: '2%–5.75% progressive state tax — VA take-home pay with standard deductions',
        badge: 'VA',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/north-carolina-tax-calculator',
        title: 'North Carolina Tax Calculator',
        desc: '3.99% flat tax with $12,750 standard deduction — NC take-home pay',
        badge: 'NC',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/pennsylvania-tax-calculator',
        title: 'Pennsylvania Tax Calculator',
        desc: '3.07% flat tax — no state deductions — PA take-home pay',
        badge: 'PA',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/ohio-tax-calculator',
        title: 'Ohio Tax Calculator',
        desc: '0%–3.99% progressive — first $26,050 tax-free — OH take-home pay',
        badge: 'OH',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/michigan-tax-calculator',
        title: 'Michigan Tax Calculator',
        desc: '4.25% flat tax with $5,500 personal exemption — MI take-home pay',
        badge: 'MI',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/new-jersey-tax-calculator',
        title: 'New Jersey Tax Calculator',
        desc: '1.4%–10.75% progressive — highest property taxes — NJ take-home pay',
        badge: 'NJ',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/colorado-tax-calculator',
        title: 'Colorado Tax Calculator',
        desc: '4.4% flat tax using federal taxable income — CO take-home pay',
        badge: 'CO',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/arizona-tax-calculator',
        title: 'Arizona Tax Calculator',
        desc: '2.5% flat tax — one of the lowest state rates — AZ take-home pay',
        badge: 'AZ',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/washington-tax-calculator',
        title: 'Washington Tax Calculator',
        desc: '0% state income tax — WA take-home pay with property & sales tax analysis',
        badge: 'WA',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/massachusetts-tax-calculator',
        title: 'Massachusetts Tax Calculator',
        desc: '5% flat tax + 4% surtax over $1M — MA take-home pay',
        badge: 'MA',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/indiana-tax-calculator',
        title: 'Indiana Tax Calculator',
        desc: '2.95% flat tax + county taxes 1.5%–2% — IN take-home pay',
        badge: 'IN',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/tennessee-tax-calculator',
        title: 'Tennessee Tax Calculator',
        desc: '0% state income tax — high sales tax — TN take-home pay',
        badge: 'TN',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/missouri-tax-calculator',
        title: 'Missouri Tax Calculator',
        desc: '2%–4.8% progressive — uses federal taxable income — MO take-home pay',
        badge: 'MO',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/maryland-tax-calculator',
        title: 'Maryland Tax Calculator',
        desc: '2%–5.75% + county taxes up to 3.28% — MD take-home pay',
        badge: 'MD',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/wisconsin-tax-calculator',
        title: 'Wisconsin Tax Calculator',
        desc: '3.5%–7.65% progressive — WI take-home pay',
        badge: 'WI',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/minnesota-tax-calculator',
        title: 'Minnesota Tax Calculator',
        desc: '5.35%–9.85% progressive — high top rate — MN take-home pay',
        badge: 'MN',
        category: 'state',
        icon: 'MapPin'
    },
    {
        href: '/oregon-tax-calculator',
        title: 'Oregon Tax Calculator',
        desc: '4.75%–9.9% progressive — no sales tax — OR take-home pay',
        badge: 'OR',
        category: 'state',
        icon: 'MapPin'
    }
];
const TRUST_POINTS = [
    '2026 Federal Tax Brackets (up to 37%)',
    'FICA: Social Security (6.2%) + Medicare (1.45%)',
    'SS Wage Cap: $184,500 for 2026',
    'All 50 State Tax Profiles — including IL, TX, FL, CA, NY, GA, VA, NC, PA, OH, MI, NJ, CO, AZ, WA, MA, IN, TN, MO, MD, WI, MN, OR + 27 more (AK, NV, SD, WY, NH, CT, AL, AR, DE, HI, ID, IA, KS, KY, LA, ME, MS, MT, NE, NM, ND, OK, RI, SC, UT, VT, WV)',
    'Standard Deductions by Filing Status',
    '401(k) & HSA Pre-Tax Deductions'
];
// ─── JSON-LD Structured Data ───────────────────────────────────────────────────
const homeAuthor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCalculatorAuthor"])();
const homeAuthorId = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}#author`;
const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/#webpage`,
            '@type': 'WebPage',
            name: '2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States',
            description: `Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment. ${CALCULATOR_COUNT} tools & 50-state sales tax data.`,
            url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"],
            inLanguage: 'en-US',
            dateModified: '2026-10-26',
            author: {
                '@id': homeAuthorId
            },
            publisher: {
                '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/#organization`
            },
            isPartOf: {
                '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/#website`
            },
            breadcrumb: {
                '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/#breadcrumb`
            },
            speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: [
                    'h1',
                    '.speakable-summary'
                ]
            }
        },
        {
            '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/#breadcrumb`,
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]
                }
            ]
        },
        {
            '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/#software`,
            '@type': 'WebApplication',
            name: 'TheTaxCalc Paycheck Calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
                '@type': 'Offer',
                price: 0,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/paycheck-calculator`
            }
        },
        {
            '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/#howto`,
            '@type': 'HowTo',
            name: 'How to Calculate Your Take-Home Pay After Taxes',
            description: 'Step-by-step guide to calculating your net take-home pay after federal tax, FICA, and state income tax deductions.',
            totalTime: 'PT2M',
            step: [
                {
                    '@type': 'HowToStep',
                    name: 'Enter Your Gross Salary',
                    text: 'Input your annual, monthly, bi-weekly, weekly, or hourly salary into the calculator.'
                },
                {
                    '@type': 'HowToStep',
                    name: 'Select Your State',
                    text: 'Choose your state — we cover all 50 states with dedicated income tax calculators, including IL (4.95%), TX (0%), FL (0%), CA (1%–13.3%), NY (4%–10.9%), and 46 more states.'
                },
                {
                    '@type': 'HowToStep',
                    name: 'Choose Filing Status',
                    text: 'Select Single, Married Filing Jointly, or Head of Household for accurate bracket calculations.'
                },
                {
                    '@type': 'HowToStep',
                    name: 'Add Pre-Tax Deductions',
                    text: 'Enter 401(k) contributions (up to $24,500) and HSA contributions to reduce your taxable income.'
                },
                {
                    '@type': 'HowToStep',
                    name: 'View Your Results',
                    text: 'See your net take-home pay broken down by federal tax, FICA, state tax, and pre-tax deductions with effective tax rate.'
                }
            ]
        },
        {
            '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/#itemlist`,
            '@type': 'ItemList',
            name: 'Free 2026 Tax Calculators',
            description: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2d$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TOTAL_CALCULATOR_COUNT"]} free tax calculators for 2026 covering paycheck, state tax, mortgage, retirement, and more.`,
            numberOfItems: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2d$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TOTAL_CALCULATOR_COUNT"],
            itemListElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2d$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllCalculatorListItems"])().map((item, i)=>({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: item.name,
                    url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}${item.url}`
                }))
        },
        {
            '@id': homeAuthorId,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authorToJsonLd"])(homeAuthor)
        },
        {
            '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/#faq`,
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'How do I calculate my take-home pay from my salary?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Start with your gross salary, subtract federal income tax (using progressive brackets), FICA (7.65% for Social Security and Medicare), and state income tax. Pre-tax deductions like 401(k) and HSA lower your taxable income. Use TheTaxCalc paycheck calculator for instant results.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'What is FICA and how much does it take from my paycheck?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'FICA is the payroll tax funding Social Security (6.2%, capped at $184,500 for 2026) and Medicare (1.45%, no cap). That\'s 7.65% total from every paycheck. An extra 0.9% Medicare surcharge applies on earnings over $200,000.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Which states have no income tax?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Nine states have no personal income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. TheTaxCalc supports TX and FL paycheck calculators with property tax and cost-of-living analysis.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'How much is taken out of a $75,000 salary in taxes?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'A single filer making $75K pays roughly $7,670 federal tax (after the $16,100 standard deduction), $5,738 FICA, plus state tax. In Texas or Florida (0% state tax), you keep around $61,600. In Illinois (4.95%), closer to $58,000.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Does contributing to a 401(k) reduce my taxes?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. Every dollar in a traditional 401(k) drops your taxable income for federal and state tax (but not FICA). Contributing $10,000 on a $75K salary saves over $2,200 in federal tax at the 22% bracket. The 2026 limit is $24,500.'
                    }
                }
            ]
        }
    ]
};
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                rel: "canonical",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_HOME_URL"]
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:url",
                content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_HOME_URL"]
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 320,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(homeJsonLd)
                }
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#fafaf9] text-[#1c1917]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "aria-hidden": "true",
                                className: "pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_10%,rgba(176,141,62,0.07),transparent)]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid items-center gap-10 lg:grid-cols-2 lg:gap-14",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "inline-flex items-center gap-2 rounded-full border border-[#b08d3e]/30 bg-[#faf5e9] px-4 py-1.5 text-sm font-semibold text-[#8a6a24]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Updated for 2026 Tax Year"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-4xl font-bold leading-[1.1] tracking-tight text-[#1c1917] sm:text-5xl lg:text-[3.4rem]",
                                                    children: [
                                                        "Free ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[#8a6a24]",
                                                            children: "Tax Calculators"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 24
                                                        }, this),
                                                        " for 2026"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "speakable-summary max-w-xl text-lg leading-relaxed text-[#57534e]",
                                                    children: [
                                                        "Ever look at your pay stub and think “wait, they took ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                            children: "how"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 354,
                                                            columnNumber: 79
                                                        }, this),
                                                        "much?” Yeah, us too. We built these calculators so you can see exactly where your money goes —",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-[#1c1917]",
                                                            children: " federal tax"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 19
                                                        }, this),
                                                        ", FICA, and",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-[#1c1917]",
                                                            children: " state taxes"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 19
                                                        }, this),
                                                        " all broken down line by line. No guesswork, no surprises."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-4 sm:flex-row sm:items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            prefetch: false,
                                                            href: "/paycheck-calculator",
                                                            className: "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9a7b2e] to-[#b08d3e] px-8 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(138,106,36,0.5)] transition-all hover:from-[#8a6a24] hover:to-[#9a7b2e] hover:shadow-[0_10px_28px_-8px_rgba(138,106,36,0.6)]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                                                    className: "h-5 w-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 367,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "Calculate Your Paycheck"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            prefetch: false,
                                                            href: "/relocation-calculator",
                                                            className: "inline-flex items-center justify-center gap-2 rounded-xl border border-[#e7e0d0] bg-white px-8 py-3.5 text-base font-semibold text-[#1c1917] transition-all hover:border-[#b08d3e]/50 hover:text-[#8a6a24]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                                                    className: "h-5 w-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 375,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "Compare States"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 370,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-[#57534e]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                    className: "h-4 w-4 text-[#8a6a24]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 382,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "100% Free"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                                    className: "h-4 w-4 text-[#8a6a24]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 386,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "No Sign-Up Required"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 385,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                    className: "h-4 w-4 text-[#8a6a24]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "2026 Tax Data"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 389,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                    className: "h-4 w-4 text-[#8a6a24]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 394,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "50 State Profiles"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 393,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2d$calculator$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HeroCalculator"], {}, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 401,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "border-y border-[#e7e0d0] bg-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8",
                            children: [
                                {
                                    value: `${CALCULATOR_COUNT}`,
                                    label: 'Free calculators & tools'
                                },
                                {
                                    value: '50',
                                    label: 'State tax profiles'
                                },
                                {
                                    value: `${BLOG_COUNT}`,
                                    label: 'Guides & articles'
                                },
                                {
                                    value: '$0',
                                    label: 'Cost — no sign-up, ever'
                                }
                            ].map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-bold tracking-tight text-[#8a6a24] sm:text-4xl",
                                            children: stat.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 416,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-[#57534e]",
                                            children: stat.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 419,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, stat.label, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 415,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-16 sm:py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-10 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl",
                                            children: [
                                                CALCULATOR_COUNT,
                                                " Free ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#8a6a24]",
                                                    children: "Tax Calculators"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 430,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mx-auto mt-3 max-w-xl text-[#57534e]",
                                            children: "Pick the one you need. They're all free, they all use 2026 data, and none of them will ask for your email."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 428,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$calculator$2d$browser$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CalculatorBrowser"], {
                                    cards: CALCULATOR_CARDS
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 437,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 427,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 426,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "border-t border-[#e7e0d0] bg-white py-16 sm:py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-10 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl",
                                            children: [
                                                "Which State Has the ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#8a6a24]",
                                                    children: "Lowest Tax"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 37
                                                }, this),
                                                "?"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 445,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mx-auto mt-3 max-w-xl text-[#57534e]",
                                            children: "Same $75,000 salary, wildly different take-home pay. Here's what you actually keep after taxes in each state."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 448,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 444,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
                                    children: [
                                        {
                                            state: 'Washington',
                                            net: '$61,593',
                                            rate: '0%',
                                            label: 'No Income Tax',
                                            tone: 'gold',
                                            href: '/washington-tax-calculator'
                                        },
                                        {
                                            state: 'Florida',
                                            net: '$60,545',
                                            rate: '0%',
                                            label: 'Lowest Burden',
                                            tone: 'gold',
                                            href: '/florida-tax-calculator'
                                        },
                                        {
                                            state: 'Arizona',
                                            net: '$60,083',
                                            rate: '2.5%',
                                            label: 'Lowest Rate',
                                            tone: 'gold',
                                            href: '/arizona-tax-calculator'
                                        },
                                        {
                                            state: 'California',
                                            net: '$57,950',
                                            rate: '1%–13.3%',
                                            label: 'Highest Rate',
                                            tone: 'red',
                                            href: '/california-tax-calculator'
                                        },
                                        {
                                            state: 'New York',
                                            net: '$57,686',
                                            rate: '4%–10.9%',
                                            label: '+ NYC Tax',
                                            tone: 'red',
                                            href: '/new-york-tax-calculator'
                                        }
                                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            prefetch: false,
                                            href: item.href,
                                            className: `group rounded-2xl border bg-[#fafaf9] p-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(138,106,36,0.18)] ${item.tone === 'gold' ? 'border-[#b08d3e]/30' : 'border-red-200/60'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-xs font-semibold uppercase tracking-wider ${item.tone === 'gold' ? 'text-[#8a6a24]' : 'text-red-600'}`,
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-xl font-bold text-[#1c1917]",
                                                    children: item.state
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-[#57534e]",
                                                    children: [
                                                        "Tax: ",
                                                        item.rate
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-lg font-semibold text-[#1c1917]",
                                                    children: [
                                                        "Net: ",
                                                        item.net
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `mt-1 text-[11px] group-hover:underline ${item.tone === 'gold' ? 'text-[#8a6a24]' : 'text-red-600'}`,
                                                    children: "View Calculator →"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, item.state, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 462,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 454,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 443,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 442,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-16 sm:py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-10 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl",
                                            children: [
                                                "What's Your ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#8a6a24]",
                                                    children: "Take-Home Pay"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 34
                                                }, this),
                                                " After Taxes?"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 493,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mx-auto mt-3 max-w-xl text-[#57534e]",
                                            children: "Select your salary to see exact take-home pay across all 50 states — including Illinois, Texas, Florida, California, and New York."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 496,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 492,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap justify-center gap-3",
                                    children: [
                                        {
                                            amount: 50000,
                                            label: '$50K'
                                        },
                                        {
                                            amount: 60000,
                                            label: '$60K'
                                        },
                                        {
                                            amount: 75000,
                                            label: '$75K'
                                        },
                                        {
                                            amount: 80000,
                                            label: '$80K'
                                        },
                                        {
                                            amount: 100000,
                                            label: '$100K'
                                        },
                                        {
                                            amount: 120000,
                                            label: '$120K'
                                        },
                                        {
                                            amount: 150000,
                                            label: '$150K'
                                        },
                                        {
                                            amount: 200000,
                                            label: '$200K'
                                        },
                                        {
                                            amount: 250000,
                                            label: '$250K'
                                        },
                                        {
                                            amount: 300000,
                                            label: '$300K'
                                        }
                                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            prefetch: false,
                                            href: `/salary/${item.amount}`,
                                            className: "group inline-flex items-center gap-1.5 rounded-xl border border-[#e7e0d0] bg-white px-5 py-3 text-sm font-semibold text-[#1c1917] transition-all hover:border-[#b08d3e]/50 hover:bg-[#faf5e9] hover:text-[#8a6a24]",
                                            children: [
                                                item.label,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, item.amount, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 514,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 501,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        prefetch: false,
                                        href: "/salary",
                                        className: "inline-flex items-center gap-2 text-sm font-semibold text-[#8a6a24] transition-colors hover:text-[#6f551d]",
                                        children: [
                                            "View all 26 salary levels",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 533,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 527,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 526,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 491,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 490,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "border-t border-[#e7e0d0] bg-white py-16 sm:py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-10 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl",
                                            children: [
                                                "Sales Tax ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#8a6a24]",
                                                    children: "Rates by State"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 27
                                                }, this),
                                                " (2026)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 543,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mx-auto mt-3 max-w-2xl text-[#57534e]",
                                            children: "Income tax and combined state + average local sales tax for all 50 states. Pick your state for the full breakdown, exemptions, and a dedicated calculator."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 546,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 542,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$states$2d$tax$2d$table$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StatesTaxTable"], {
                                    rows: STATE_TABLE_ROWS
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 552,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-6 text-center text-sm text-[#57534e]",
                                    children: [
                                        "Rates are the average combined state + local rate —",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            prefetch: false,
                                            href: "/sales-tax-calculator",
                                            className: "font-semibold text-[#8a6a24] hover:underline",
                                            children: "open the full sales tax calculator"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 556,
                                            columnNumber: 15
                                        }, this),
                                        ' ',
                                        "to override the local rate for your exact city."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 554,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 541,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 540,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-16 sm:py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-10 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 inline-flex items-center gap-2 rounded-full border border-[#e7e0d0] bg-white px-4 py-1.5 text-sm font-semibold text-[#57534e]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 569,
                                                    columnNumber: 17
                                                }, this),
                                                "For Business Owners"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 568,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl",
                                            children: [
                                                "How Much Does an ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#8a6a24]",
                                                    children: "Employee Really Cost"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 573,
                                                    columnNumber: 34
                                                }, this),
                                                "?"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 572,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mx-auto mt-3 max-w-xl text-[#57534e]",
                                            children: "Salary is just the beginning. Employer taxes, benefits, and insurance add 25–30% on top. See the true cost of hiring in your state."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 575,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 567,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-6 lg:grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-[#e7e0d0] bg-white p-6 lg:col-span-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-4 text-lg font-semibold text-[#1c1917]",
                                                    children: "Example: 5 Employees at $75,000 in Illinois"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 583,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[#57534e]",
                                                                    children: "Base Salaries (5 × $75,000)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 586,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-[#1c1917]",
                                                                    children: "$375,000"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 587,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 585,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[#57534e]",
                                                                    children: "Employer FICA (7.65%)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 590,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-orange-700",
                                                                    children: "+$28,688"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 591,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 589,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[#57534e]",
                                                                    children: "FUTA + SUTA"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 594,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-amber-700",
                                                                    children: "+$2,401"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 595,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[#57534e]",
                                                                    children: "Benefits (20% of salary)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 598,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-sky-700",
                                                                    children: "+$75,000"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 599,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 597,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border-t border-dashed border-[#e7e0d0] pt-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 601,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-base",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-[#1c1917]",
                                                                    children: "Total Annual Payroll Cost"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 603,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-bold text-[#8a6a24]",
                                                                    children: "$481,089"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 604,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 602,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[#57534e]",
                                                                    children: "Cost Per Employee"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 607,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-[#1c1917]",
                                                                    children: [
                                                                        "$96,218 ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-amber-700",
                                                                            children: "(28.3% over salary)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 608,
                                                                            columnNumber: 74
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 608,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 606,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-1 flex-col justify-center rounded-2xl border border-[#b08d3e]/30 bg-[#faf5e9] p-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-lg font-semibold text-[#1c1917]",
                                                            children: "Employee Cost Calculator"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 614,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-2 text-sm text-[#57534e]",
                                                            children: "Estimate your true payroll cost — salary + employer FICA, FUTA, SUTA, and benefits. All 50 states."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 615,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            prefetch: false,
                                                            href: "/employee-cost-calculator",
                                                            className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9a7b2e] to-[#b08d3e] px-6 py-3 text-sm font-semibold text-white transition-all hover:from-[#8a6a24] hover:to-[#9a7b2e]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 623,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "Calculate Employee Cost"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 618,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 613,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl border border-[#e7e0d0] bg-white p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-[#57534e]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-[#1c1917]",
                                                                children: "Employer FICA alone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 629,
                                                                columnNumber: 21
                                                            }, this),
                                                            "adds $5,738 per employee at $75K. That's $28,688 for 5 employees — before benefits."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 628,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 627,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 612,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 581,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 566,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "border-t border-[#e7e0d0] bg-white py-16 sm:py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid items-center gap-12 lg:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl",
                                                children: [
                                                    "Why We Built ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#8a6a24]",
                                                        children: "TheTaxCalc"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 644,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 643,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 space-y-4 leading-relaxed text-[#57534e]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Honestly? We got tired of tax calculators that felt like they were designed by the IRS. You know the ones — confusing interfaces, outdated brackets, and somehow always trying to sell you something at the end. Whether you need a 2025 tax calculator for last year's return or a tax calculator 2026 for this year, we've got you covered."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 647,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Every paycheck has OASDI tax (Social Security), Medicare, federal income tax, and state tax taken out. We show you exactly where each dollar goes — from the 6.2% OASDI tax up to the $184,500 wage cap, to the 1.45% Medicare with no cap, to your state's specific brackets."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "One of our team members moved from California to Texas a few years back. Same salary, same company — but his take-home jumped by over $8,700 a year. He had no idea the difference would be that big until the first paycheck hit. That's when we thought:",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                children: " everyone should be able to see this before they make big decisions."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 662,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 658,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "So we built the tools we wished existed. All our calculations use the latest 2026 federal brackets, FICA rates, and state-specific tax laws — pulled straight from",
                                                            ' ',
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: "font-medium text-[#8a6a24] underline underline-offset-2 hover:text-[#6f551d]",
                                                                children: "IRS publications"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 667,
                                                                columnNumber: 21
                                                            }, this),
                                                            " and",
                                                            ' ',
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://taxfoundation.org/",
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: "font-medium text-[#8a6a24] underline underline-offset-2 hover:text-[#6f551d]",
                                                                children: "state revenue departments"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 668,
                                                                columnNumber: 21
                                                            }, this),
                                                            ", not some third-party blog post."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Whether you're searching for a 2025 tax calculator to estimate last year's refund or planning ahead with our tax calculator 2026, our income tax calculator handles federal income tax, FICA, and state tax for all 50 states. Calculate your tax liability, factor in itemized deductions vs. the standard deduction, and see your true take-home pay based on your gross income. No tax preparation software required — just enter your salary and get instant, accurate numbers. We even earn income estimates for self-employed workers, freelancers, and W-2 employees alike. Not tax advice, just honest math."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 670,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 646,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "mt-6 space-y-3",
                                                children: TRUST_POINTS.map((point)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-start gap-3 text-sm text-[#57534e]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                className: "mt-0.5 h-5 w-5 shrink-0 text-[#8a6a24]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 683,
                                                                columnNumber: 23
                                                            }, this),
                                                            point
                                                        ]
                                                    }, point, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 682,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 680,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                prefetch: false,
                                                href: "/paycheck-calculator",
                                                className: "mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9a7b2e] to-[#b08d3e] px-6 py-3 text-sm font-semibold text-white transition-all hover:from-[#8a6a24] hover:to-[#9a7b2e]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 693,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Start Calculating"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 688,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 642,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-[#e7e0d0] bg-[#fafaf9] p-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-4 text-lg font-semibold text-[#1c1917]",
                                                children: "Example: $75,000 in Illinois"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 698,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#57534e]",
                                                                children: "Gross Annual Salary"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 701,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-[#1c1917]",
                                                                children: "$75,000.00"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 702,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 700,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-t border-dashed border-[#e7e0d0]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 704,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#57534e]",
                                                                children: "Federal Tax (after $16,100 std ded)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 706,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-red-700",
                                                                children: "-$7,670.00"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 707,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 705,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#57534e]",
                                                                children: "FICA (SS + Medicare)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 710,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-orange-700",
                                                                children: "-$5,737.50"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 711,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 709,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#57534e]",
                                                                children: "IL State Tax (4.95% on $72,225)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 714,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-amber-700",
                                                                children: "-$3,575.14"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 715,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 713,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-t border-dashed border-[#e7e0d0]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 717,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-base",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-[#1c1917]",
                                                                children: "Net Annual Take-Home"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 719,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-[#8a6a24]",
                                                                children: "$58,017.36"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 720,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 718,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#57534e]",
                                                                children: "Effective Tax Rate"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-[#1c1917]",
                                                                children: "22.64%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 724,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 722,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 699,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 697,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 641,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 640,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 639,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-16 sm:py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-10 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 inline-flex items-center gap-2 rounded-full border border-[#b08d3e]/30 bg-[#faf5e9] px-4 py-1.5 text-sm font-semibold text-[#8a6a24]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 737,
                                                    columnNumber: 17
                                                }, this),
                                                "Complete Site Directory"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 736,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl",
                                            children: [
                                                "Explore All ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#8a6a24]",
                                                    children: "Tools & Resources"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 741,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 740,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mx-auto mt-3 max-w-2xl text-[#57534e]",
                                            children: "Every calculator, salary breakdown, blog article, and state comparison — all in one place."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 743,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 735,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-6 lg:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-[#e7e0d0] bg-white p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf5e9]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                                className: "h-4 w-4 text-[#8a6a24]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 753,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 752,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-base font-semibold text-[#1c1917]",
                                                            children: "Salary After Tax"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 755,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-auto rounded-full bg-[#faf5e9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]",
                                                            children: "26 Levels"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 756,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$salary$2d$calculations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SALARY_AMOUNTS"].map((amount)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            prefetch: false,
                                                            href: `/salary/${amount}`,
                                                            className: "rounded-md border border-[#e7e0d0] bg-[#fafaf9] px-2.5 py-1 text-xs font-medium text-[#57534e] transition-all hover:border-[#b08d3e]/50 hover:bg-[#faf5e9] hover:text-[#8a6a24]",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$salary$2d$calculations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatSalaryCompact"])(amount)
                                                        }, amount, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 760,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 758,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 border-t border-[#f0ece3] pt-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                        prefetch: false,
                                                        href: "/salary",
                                                        className: "inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a6a24] transition-colors hover:text-[#6f551d]",
                                                        children: [
                                                            "View all salary pages",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                className: "h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 777,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 771,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 770,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 750,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-[#e7e0d0] bg-white p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf5e9]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                className: "h-4 w-4 text-[#8a6a24]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 786,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 785,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-base font-semibold text-[#1c1917]",
                                                            children: "Blog & Guides"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 788,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-auto rounded-full bg-[#faf5e9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]",
                                                            children: [
                                                                BLOG_COUNT,
                                                                " Articles"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 789,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 784,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "max-h-96 space-y-2 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#d6c9a5_transparent]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                prefetch: false,
                                                                href: "/blog",
                                                                className: "group flex items-center gap-2 py-0.5 text-sm font-semibold text-[#8a6a24] transition-colors hover:text-[#6f551d]",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "h-1 w-1 shrink-0 rounded-full bg-[#b08d3e]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 798,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "All Blog Articles"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 793,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 792,
                                                            columnNumber: 19
                                                        }, this),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishedPostsMeta"])().map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                    prefetch: false,
                                                                    href: `/blog/${post.slug}`,
                                                                    className: "group flex items-center gap-2 py-0.5 text-sm text-[#57534e] transition-colors hover:text-[#8a6a24]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "h-1 w-1 shrink-0 rounded-full bg-[#d6c9a5] transition-colors group-hover:bg-[#b08d3e]"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 809,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "line-clamp-1",
                                                                            children: post.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 810,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 804,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, post.slug, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 803,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 791,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 783,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 748,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 grid gap-6 lg:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-[#e7e0d0] bg-white p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf5e9]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                className: "h-4 w-4 text-[#8a6a24]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 823,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 822,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-base font-semibold text-[#1c1917]",
                                                            children: "Resources"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 825,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 821,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-3 sm:grid-cols-3",
                                                    children: [
                                                        {
                                                            href: '/federal-tax-brackets',
                                                            label: 'Federal Tax Brackets',
                                                            desc: '2026 brackets & rates',
                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"]
                                                        },
                                                        {
                                                            href: '/glossary',
                                                            label: 'Tax Glossary',
                                                            desc: 'Key terms explained',
                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
                                                        },
                                                        {
                                                            href: '/compare',
                                                            label: 'State Comparisons',
                                                            desc: 'Side-by-side analysis',
                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"]
                                                        },
                                                        {
                                                            href: '/obbba-tax-calculator',
                                                            label: 'OBBBA Tax Calculator',
                                                            desc: '2026 law vs prior law',
                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"]
                                                        },
                                                        {
                                                            href: '/research',
                                                            label: 'Research Hub',
                                                            desc: 'Original 2026 tax studies',
                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                                                        },
                                                        {
                                                            href: '/tax-professionals',
                                                            label: 'For Tax Professionals',
                                                            desc: 'CPA tools & resources',
                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
                                                        },
                                                        {
                                                            href: '/smartasset-alternative',
                                                            label: 'SmartAsset Alternative',
                                                            desc: 'Compare features & privacy',
                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"]
                                                        },
                                                        {
                                                            href: '/scholarship',
                                                            label: 'Tax Literacy Scholarship',
                                                            desc: '$2,500 student award',
                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"]
                                                        },
                                                        {
                                                            href: '/methodology',
                                                            label: 'Methodology',
                                                            desc: 'How we calculate taxes',
                                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
                                                        }
                                                    ].map((res)=>{
                                                        const ResIcon = res.icon;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            prefetch: false,
                                                            href: res.href,
                                                            className: "group flex items-start gap-3 rounded-lg border border-[#f0ece3] bg-[#fafaf9] p-3 transition-all hover:border-[#b08d3e]/40 hover:bg-[#faf5e9]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ResIcon, {
                                                                    className: "mt-0.5 h-4 w-4 shrink-0 text-[#8a6a24]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 847,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium text-[#1c1917] transition-colors group-hover:text-[#8a6a24]",
                                                                            children: res.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 849,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-[11px] text-[#78716c]",
                                                                            children: res.desc
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 850,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 848,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, res.href, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 841,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 827,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 820,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-[#e7e0d0] bg-white p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf5e9]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                                                className: "h-4 w-4 text-[#8a6a24]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 862,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 861,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-base font-semibold text-[#1c1917]",
                                                            children: "State Tax Comparisons"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 864,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-auto rounded-full bg-[#faf5e9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]",
                                                            children: "10 Matchups"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 865,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid gap-2 sm:grid-cols-2",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$compare$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["COMPARISON_SLUGS"].map((slug)=>{
                                                        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$compare$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseComparisonSlug"])(slug);
                                                        if (!parsed) return null;
                                                        const [key1, key2] = parsed;
                                                        const s1 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$compare$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["COMPARE_STATES"][key1];
                                                        const s2 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$compare$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["COMPARE_STATES"][key2];
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            prefetch: false,
                                                            href: `/compare/${slug}`,
                                                            className: "group flex items-center gap-2 rounded-md border border-[#f0ece3] bg-[#fafaf9] px-3 py-2 text-sm text-[#57534e] transition-all hover:border-[#b08d3e]/40 hover:bg-[#faf5e9] hover:text-[#8a6a24]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-semibold text-[#78716c] transition-colors group-hover:text-[#8a6a24]",
                                                                    children: s1.abbreviation
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 881,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-[#b08d3e]",
                                                                    children: "vs"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 882,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-semibold text-[#78716c] transition-colors group-hover:text-[#8a6a24]",
                                                                    children: s2.abbreviation
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 883,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-auto hidden text-[11px] text-[#78716c] transition-colors group-hover:text-[#8a6a24]/70 sm:inline",
                                                                    children: [
                                                                        s1.name,
                                                                        " vs ",
                                                                        s2.name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 884,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, slug, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 875,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 867,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 859,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 818,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 734,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 733,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "border-t border-[#e7e0d0] bg-white py-16 sm:py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-8 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold tracking-tight text-[#1c1917]",
                                                    children: [
                                                        "Latest from the ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[#8a6a24]",
                                                            children: "Blog"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 900,
                                                            columnNumber: 35
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 899,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-[#57534e]",
                                                    children: "We do the homework so you don't have to"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 902,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 898,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            prefetch: false,
                                            href: "/blog",
                                            className: "hidden items-center gap-1.5 text-sm font-semibold text-[#8a6a24] transition-colors hover:text-[#6f551d] sm:flex",
                                            children: [
                                                "View All",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 910,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 904,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 897,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-6 sm:grid-cols-3",
                                    children: LATEST_POSTS.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            prefetch: false,
                                            href: `/blog/${post.slug}`,
                                            className: "group rounded-2xl border border-[#e7e0d0] bg-[#fafaf9] p-5 transition-all hover:-translate-y-0.5 hover:border-[#b08d3e]/50 hover:shadow-[0_8px_24px_-8px_rgba(138,106,36,0.18)]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]",
                                                    children: post.category
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 921,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-base font-semibold leading-tight text-[#1c1917] transition-colors group-hover:text-[#8a6a24]",
                                                    children: post.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 922,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 text-xs font-semibold text-[#8a6a24] group-hover:underline",
                                                    children: "Read Article →"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 925,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, post.slug, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 915,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 913,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 text-center sm:hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        prefetch: false,
                                        href: "/blog",
                                        className: "inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6a24]",
                                        children: [
                                            "View All Articles",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 936,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 930,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 929,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 896,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 895,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-[#0c0a09] py-16 sm:py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto max-w-2xl text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a961]",
                                            children: "Free · No sign-up · 50 states"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 946,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl",
                                            children: [
                                                "Run your numbers in ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#c9a961]",
                                                    children: "30 seconds"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 950,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 949,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 text-[#a8a29e]",
                                            children: "Enter your salary, pick your state, and see your exact take-home pay — federal, FICA, and state taxes broken down line by line with 2026 data."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 952,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            prefetch: false,
                                            href: "/paycheck-calculator",
                                            className: "mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a961] to-[#b08d3e] px-8 py-4 text-base font-semibold text-[#0c0a09] transition-all hover:from-[#d4b673] hover:to-[#c9a961]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 961,
                                                    columnNumber: 17
                                                }, this),
                                                "Open the Paycheck Calculator"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 956,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 945,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mt-12 max-w-4xl border-t border-white/10 pt-10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$finance$2f$author$2d$bio$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AuthorBioCard"], {
                                        authorId: "rachel-mitchell",
                                        variant: "ink"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 967,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 966,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 944,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 943,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0g35qd9._.js.map