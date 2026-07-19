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
        personalExemption: 2775,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Illinois imposes a flat state income tax of 4.95% with a personal exemption of $2,775 per person. Unlike most states, Illinois does not offer a standard deduction; instead, the personal exemption reduces taxable income before the flat rate is applied.',
        effectiveDate: '2026-01-01',
        personalExemptionsByFiling: {
            single: 2775,
            married: 5550,
            head_of_household: 2775
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
        standardDeduction: 8100,
        hasIncomeTax: true,
        description: 'New York has a progressive state income tax with brackets from 4% to 10.9% as of 2026. New York City residents pay an additional city income tax (3.078% to 3.876%). Combined with high property taxes and cost of living, New York has one of the highest overall tax burdens in the U.S.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 8500,
                rate: 0.04
            },
            {
                min: 8500,
                max: 11700,
                rate: 0.045
            },
            {
                min: 11700,
                max: 13900,
                rate: 0.0525
            },
            {
                min: 13900,
                max: 80650,
                rate: 0.055
            },
            {
                min: 80650,
                max: 215400,
                rate: 0.06
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
            single: 8100,
            married: 16200,
            head_of_household: 11200
        }
    },
    georgia: {
        name: 'Georgia',
        abbreviation: 'GA',
        incomeTaxRate: 0.0549,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 5400,
        hasIncomeTax: true,
        description: 'Georgia has a progressive state income tax with a top rate of 5.49% as of 2026. Georgia recently transitioned from a graduated bracket system to a flat 5.49% rate starting in 2024, which continues through 2026. The state offers a standard deduction and personal exemptions.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: null,
                rate: 0.0549
            }
        ],
        standardDeductionsByFiling: {
            single: 5400,
            married: 7100,
            head_of_household: 5400
        },
        personalExemptionsByFiling: {
            single: 2700,
            married: 5400,
            head_of_household: 2700
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
        standardDeduction: 14600,
        hasIncomeTax: true,
        description: 'Arizona has a flat state income tax of 2.5% as of 2026. The state previously used a progressive bracket system but transitioned to a flat rate. Arizona offers a standard deduction and uses federal adjusted gross income as the starting point for state tax calculations.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 14600,
            married: 29200,
            head_of_household: 21900
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
        incomeTaxRate: 0.05695,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Idaho has a flat state income tax of 5.695% as of 2026. Idaho uses federal taxable income as its starting point, so the federal standard deduction is effectively applied. Idaho also offers a grocery tax credit and other targeted deductions.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    indiana: {
        name: 'Indiana',
        abbreviation: 'IN',
        incomeTaxRate: 0.0305,
        incomeTaxType: 'flat',
        personalExemption: 1000,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Indiana has a flat state income tax of 3.05% as of 2026. Indiana does not offer a standard deduction but provides personal exemptions of $1,000 or more per person. The state also allows county income taxes (averaging 1.5-2%) which vary by county of residence.',
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
        incomeTaxRate: 0.04,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Kentucky has a flat state income tax of 4% as of 2026. Kentucky uses federal adjusted gross income as its starting point, so the federal standard deduction is not directly applied at the state level. Kentucky offers a standard deduction of $3,160 for single filers.',
        effectiveDate: '2026-01-01',
        standardDeductionsByFiling: {
            single: 3160,
            married: 6320,
            head_of_household: 3160
        }
    },
    michigan: {
        name: 'Michigan',
        abbreviation: 'MI',
        incomeTaxRate: 0.0425,
        incomeTaxType: 'flat',
        personalExemption: 5500,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Michigan has a flat state income tax of 4.25% as of 2026. Michigan offers a personal exemption of $5,500 per person and does not have a standard deduction. The city of Detroit and some other Michigan cities levy additional city income taxes.',
        effectiveDate: '2026-01-01',
        personalExemptionsByFiling: {
            single: 5500,
            married: 11000,
            head_of_household: 5500
        }
    },
    mississippi: {
        name: 'Mississippi',
        abbreviation: 'MS',
        incomeTaxRate: 0.047,
        incomeTaxType: 'flat',
        personalExemption: 6000,
        standardDeduction: 2300,
        hasIncomeTax: true,
        description: 'Mississippi has a flat state income tax of 4.7% on income above $10,000 for single filers as of 2026. The state has been gradually phasing out its lower brackets. Mississippi offers a standard deduction and personal exemptions.',
        effectiveDate: '2026-01-01',
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
        incomeTaxRate: 0.045,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 12750,
        hasIncomeTax: true,
        description: 'North Carolina has a flat state income tax of 4.5% as of 2026, down from higher rates in previous years. The state offers a standard deduction but no personal exemption. North Carolina uses federal adjusted gross income as the starting point.',
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
        incomeTaxRate: 0.0465,
        incomeTaxType: 'flat',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Utah has a flat state income tax of 4.65% as of 2026. Utah uses a personal credit system rather than a standard deduction. The state provides a taxpayer credit of up to 6% of federal standard deduction amounts, effectively reducing the tax burden for lower-income filers.',
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
        description: 'Arkansas has a progressive state income tax with brackets from 2% to 4.4% as of 2026. Arkansas has been reducing its top rate in recent years. The state offers a standard deduction and personal credit based on filing status.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 5100,
                rate: 0.02
            },
            {
                min: 5100,
                max: 10200,
                rate: 0.03
            },
            {
                min: 10200,
                max: 15300,
                rate: 0.034
            },
            {
                min: 15300,
                max: 25500,
                rate: 0.037
            },
            {
                min: 25500,
                max: 89500,
                rate: 0.04
            },
            {
                min: 89500,
                max: null,
                rate: 0.044
            }
        ],
        standardDeductionsByFiling: {
            single: 2620,
            married: 5240,
            head_of_household: 4320
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
        description: 'Connecticut has a progressive state income tax with brackets from 3% to 6.99% as of 2026. Connecticut does not offer a standard deduction or personal exemption. The state uses federal adjusted gross income as its starting point. Connecticut also has a property tax credit of up to $300 for eligible residents.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 10000,
                rate: 0.03
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
        description: 'Delaware has a progressive state income tax with brackets from 2.2% to 6.6% as of 2026. Delaware offers a standard deduction and personal credits. Despite its small size, Delaware has a relatively high top tax rate but no state or local sales tax.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 2000,
                rate: 0.022
            },
            {
                min: 2000,
                max: 5000,
                rate: 0.039
            },
            {
                min: 5000,
                max: 10000,
                rate: 0.048
            },
            {
                min: 10000,
                max: 20000,
                rate: 0.052
            },
            {
                min: 20000,
                max: 25000,
                rate: 0.055
            },
            {
                min: 25000,
                max: 60000,
                rate: 0.066
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
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Iowa has a progressive state income tax that is transitioning to a flat rate. For 2026, Iowa uses a graduated system with an effective rate of approximately 5.7%. Iowa uses federal taxable income as its starting point. The state has been gradually simplifying its tax code.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 6225,
                rate: 0.044
            },
            {
                min: 6225,
                max: 12450,
                rate: 0.0482
            },
            {
                min: 12450,
                max: 24900,
                rate: 0.0528
            },
            {
                min: 24900,
                max: 34950,
                rate: 0.0563
            },
            {
                min: 34950,
                max: 49800,
                rate: 0.0596
            },
            {
                min: 49800,
                max: null,
                rate: 0.057
            }
        ],
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
        personalExemption: 0,
        standardDeduction: 3500,
        hasIncomeTax: true,
        description: 'Kansas has a progressive state income tax with brackets from 3.1% to 5.7% as of 2026. Kansas offers a standard deduction and personal exemptions. The state uses federal adjusted gross income as its starting point.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 15000,
                rate: 0.031
            },
            {
                min: 15000,
                max: 30000,
                rate: 0.0525
            },
            {
                min: 30000,
                max: null,
                rate: 0.057
            }
        ],
        standardDeductionsByFiling: {
            single: 3500,
            married: 8000,
            head_of_household: 5750
        }
    },
    louisiana: {
        name: 'Louisiana',
        abbreviation: 'LA',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Louisiana has a progressive state income tax with brackets from 1.85% to 4.75% as of 2026. Louisiana uses federal taxable income as its starting point, so the federal standard deduction is effectively applied. Louisiana also allows a federal tax deduction on state returns.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 12500,
                rate: 0.0185
            },
            {
                min: 12500,
                max: 50000,
                rate: 0.0185
            },
            {
                min: 50000,
                max: null,
                rate: 0.0475
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
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
        description: 'Maryland has a progressive state income tax with brackets from 2% to 5.75% as of 2026. Maryland also imposes county income taxes that range from about 2.25% to 3.28%, bringing the combined top rate to over 9%. The state offers a standard deduction and personal exemptions.',
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
                max: 150000,
                rate: 0.0475
            },
            {
                min: 150000,
                max: 175000,
                rate: 0.05
            },
            {
                min: 175000,
                max: 225000,
                rate: 0.0525
            },
            {
                min: 225000,
                max: 300000,
                rate: 0.055
            },
            {
                min: 300000,
                max: null,
                rate: 0.0575
            }
        ],
        standardDeductionsByFiling: {
            single: 2400,
            married: 4800,
            head_of_household: 2400
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
        description: 'Missouri has a progressive state income tax with brackets from 2% to 4.8% as of 2026. Missouri uses federal taxable income as its starting point, so the federal standard deduction is effectively applied. Missouri has been gradually reducing its top rate in recent years.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 1157,
                rate: 0.02
            },
            {
                min: 1157,
                max: 2314,
                rate: 0.025
            },
            {
                min: 2314,
                max: 3471,
                rate: 0.03
            },
            {
                min: 3471,
                max: 4628,
                rate: 0.035
            },
            {
                min: 4628,
                max: 5785,
                rate: 0.04
            },
            {
                min: 5785,
                max: 6942,
                rate: 0.045
            },
            {
                min: 6942,
                max: 8099,
                rate: 0.048
            },
            {
                min: 8099,
                max: null,
                rate: 0.048
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
        standardDeduction: 5510,
        hasIncomeTax: true,
        description: 'Montana has a progressive state income tax with brackets from 1% to 5.9% as of 2026. Montana offers a standard deduction and personal exemptions. The state has no general sales tax, making it unique among states with income tax.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 3600,
                rate: 0.01
            },
            {
                min: 3600,
                max: 6600,
                rate: 0.02
            },
            {
                min: 6600,
                max: 10100,
                rate: 0.03
            },
            {
                min: 10100,
                max: 13600,
                rate: 0.04
            },
            {
                min: 13600,
                max: 17600,
                rate: 0.05
            },
            {
                min: 17600,
                max: null,
                rate: 0.059
            }
        ],
        standardDeductionsByFiling: {
            single: 5510,
            married: 11020,
            head_of_household: 5510
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
        description: 'Nebraska has a progressive state income tax with brackets from 2.46% to 5.84% as of 2026. Nebraska uses federal adjusted gross income as its starting point and the federal standard deduction is not directly applied. Nebraska has been gradually reducing its top rate.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 3770,
                rate: 0.0246
            },
            {
                min: 3770,
                max: 22670,
                rate: 0.0351
            },
            {
                min: 22670,
                max: 35990,
                rate: 0.0501
            },
            {
                min: 35990,
                max: null,
                rate: 0.0584
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
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
        description: 'New Jersey has a progressive state income tax with brackets from 1.4% to 10.75% as of 2026, making it one of the highest top rates in the nation. New Jersey does not offer a standard deduction but provides personal exemptions. The state also has high property taxes, averaging the highest in the nation.',
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
                rate: 0.0245
            },
            {
                min: 40000,
                max: 75000,
                rate: 0.035
            },
            {
                min: 75000,
                max: 500000,
                rate: 0.05525
            },
            {
                min: 500000,
                max: 5000000,
                rate: 0.0637
            },
            {
                min: 5000000,
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
        description: 'New Mexico has a progressive state income tax with brackets from 1.7% to 5.9% as of 2026. New Mexico uses federal adjusted gross income as its starting point. The state has been gradually adjusting its bracket structure and offers various credits and exemptions.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 5501,
                rate: 0.017
            },
            {
                min: 5501,
                max: 11001,
                rate: 0.032
            },
            {
                min: 11001,
                max: 16001,
                rate: 0.047
            },
            {
                min: 16001,
                max: 210001,
                rate: 0.049
            },
            {
                min: 210001,
                max: 260001,
                rate: 0.059
            },
            {
                min: 260001,
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
        description: 'North Dakota has a progressive state income tax with brackets from 1.1% to 2.5% as of 2026, making it one of the lowest state income tax rates in the nation. North Dakota uses federal taxable income as its starting point. The state has been gradually reducing its rates.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 41550,
                rate: 0.011
            },
            {
                min: 41550,
                max: 100300,
                rate: 0.0204
            },
            {
                min: 100300,
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
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Ohio has a progressive state income tax with brackets from 2.765% to 3.99% as of 2026. Ohio uses federal adjusted gross income as its starting point and does not offer a standard deduction. The state has been gradually reducing its rates in recent years.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 26050,
                rate: 0.0
            },
            {
                min: 26050,
                max: 46100,
                rate: 0.02765
            },
            {
                min: 46100,
                max: 92150,
                rate: 0.03226
            },
            {
                min: 92150,
                max: 115300,
                rate: 0.03688
            },
            {
                min: 115300,
                max: null,
                rate: 0.0399
            }
        ]
    },
    oklahoma: {
        name: 'Oklahoma',
        abbreviation: 'OK',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'Oklahoma has a progressive state income tax with brackets from 0.25% to 4.75% as of 2026. Oklahoma uses federal adjusted gross income as its starting point. The state offers a standard deduction and personal exemptions. Oklahoma has been gradually reducing its top rate.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 1000,
                rate: 0.0025
            },
            {
                min: 1000,
                max: 2500,
                rate: 0.0075
            },
            {
                min: 2500,
                max: 3750,
                rate: 0.0125
            },
            {
                min: 3750,
                max: 4900,
                rate: 0.0175
            },
            {
                min: 4900,
                max: 7200,
                rate: 0.0225
            },
            {
                min: 7200,
                max: 8700,
                rate: 0.03
            },
            {
                min: 8700,
                max: 10300,
                rate: 0.035
            },
            {
                min: 10300,
                max: 12200,
                rate: 0.04
            },
            {
                min: 12200,
                max: null,
                rate: 0.0475
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
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
        description: 'South Carolina has a progressive state income tax with a top rate of 6.4% as of 2026. The first $3,200 of taxable income is exempt (0% rate). South Carolina uses federal taxable income as its starting point. The state has been gradually reducing its top rate.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 3200,
                rate: 0.0
            },
            {
                min: 3200,
                max: 16040,
                rate: 0.03
            },
            {
                min: 16040,
                max: null,
                rate: 0.064
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
        personalExemption: 0,
        standardDeduction: 0,
        hasIncomeTax: true,
        description: 'West Virginia has a progressive state income tax with brackets from 3% to 5.12% as of 2026. West Virginia uses federal adjusted gross income as its starting point. The state has been gradually reducing its income tax rates and has discussed potential further reductions.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 10000,
                rate: 0.03
            },
            {
                min: 10000,
                max: 25000,
                rate: 0.04
            },
            {
                min: 25000,
                max: 40000,
                rate: 0.045
            },
            {
                min: 40000,
                max: 60000,
                rate: 0.06
            },
            {
                min: 60000,
                max: null,
                rate: 0.0512
            }
        ],
        standardDeductionsByFiling: {
            single: 16100,
            married: 32200,
            head_of_household: 24150
        }
    },
    wisconsin: {
        name: 'Wisconsin',
        abbreviation: 'WI',
        incomeTaxRate: 0,
        incomeTaxType: 'progressive',
        personalExemption: 0,
        standardDeduction: 12990,
        hasIncomeTax: true,
        description: 'Wisconsin has a progressive state income tax with brackets from 3.54% to 7.65% as of 2026. Wisconsin offers a standard deduction that varies by filing status and income level.',
        effectiveDate: '2026-01-01',
        brackets: [
            {
                min: 0,
                max: 12620,
                rate: 0.0354
            },
            {
                min: 12620,
                max: 25240,
                rate: 0.0465
            },
            {
                min: 25240,
                max: 276270,
                rate: 0.0627
            },
            {
                min: 276270,
                max: null,
                rate: 0.0765
            }
        ],
        standardDeductionsByFiling: {
            single: 12990,
            married: 24070,
            head_of_household: 18340
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
        "updatedAt": "2026-06-21T14:00:00.000Z"
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
        "updatedAt": "2026-05-28T12:00:00.000Z"
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
        "updatedAt": "2026-05-26T20:31:33.164Z"
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
        "updatedAt": "2026-06-01T12:00:00.000Z"
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
        "updatedAt": "2026-06-01T12:00:00.000Z"
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
        "updatedAt": "2026-06-01T12:00:00.000Z"
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
        "updatedAt": "2026-06-19T12:00:00.000Z"
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
        "updatedAt": "2026-06-19T12:00:00.000Z"
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
        "updatedAt": "2026-07-04T20:50:00.000Z"
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
        "updatedAt": "2026-07-07T20:20:00.000Z"
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
        "updatedAt": "2026-07-09T08:40:00.000Z"
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
        "updatedAt": "2026-06-25T10:00:00.000Z"
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
function AuthorBioCard({ authorId }) {
    const author = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthor"])(authorId);
    if (!author) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": `Author: ${author.name}`,
        className: "rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-card/80 p-5 sm:p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-4",
            children: [
                author.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: author.image,
                    alt: `${author.name}, ${author.credentials}`,
                    width: 48,
                    height: 48,
                    className: "h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-emerald-500/30",
                    loading: "lazy"
                }, void 0, false, {
                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/30",
                    children: author.name.split(' ').map((n)=>n[0]).join('')
                }, void 0, false, {
                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                    lineNumber: 40,
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
                                    className: "text-base font-semibold text-foreground hover:text-emerald-400 transition-colors",
                                    children: author.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25",
                                    children: author.credentials
                                }, void 0, false, {
                                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-0.5 text-sm text-muted-foreground",
                            children: [
                                author.title,
                                ", TheTaxCalc"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2",
                            children: author.bio
                        }, void 0, false, {
                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-3 w-3 text-emerald-500/60",
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
                                                lineNumber: 83,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        "Reviewed: January 2026"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Tax data verified against IRS Publication 15-T & state revenue departments"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/finance/author-bio-card.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/finance/author-bio-card.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/finance/author-bio-card.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/finance/author-bio-card.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/calculator-routes.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Calculator Route Configuration
 * Centralized mapping of calculator slugs to metadata, components, and SEO data.
 * This is the single source of truth for all calculator routes.
 */ __turbopack_context__.s([
    "CALCULATOR_ROUTES",
    ()=>CALCULATOR_ROUTES,
    "COMPONENT_KEY_TO_SLUG",
    ()=>COMPONENT_KEY_TO_SLUG,
    "SLUG_TO_CONFIG",
    ()=>SLUG_TO_CONFIG,
    "getCalculatorSlugs",
    ()=>getCalculatorSlugs
]);
const CALCULATOR_ROUTES = [
    {
        slug: 'paycheck-calculator',
        title: 'Free 2026 Paycheck Calculator — Federal, FICA & State Tax',
        description: 'Free paycheck tax calculator for 2026. Calculate take-home pay after federal, FICA & state taxes. No sign-up required. Supports IL, TX, FL, CA, NY with 401(k) and HSA deductions.',
        h1: 'Free Paycheck Calculator',
        metaTitle: 'Free Paycheck Calculator 2026 | After-Tax Take-Home Pay',
        metaDesc: 'Free paycheck tax calculator for 2026. Calculate take-home pay after federal, FICA & state taxes. No sign-up. Covers IL, TX, FL, CA, NY.',
        keywords: [
            'free paycheck tax calculator',
            'free tax calculator for paycheck',
            'free tax calculator federal and state',
            'free tax calculator for 2026',
            'take home pay calculator',
            'salary calculator',
            'after tax salary',
            'net pay calculator',
            '2026 paycheck calculator',
            'FICA calculator',
            'federal tax calculator',
            'free tax calculator no sign up',
            'free tax calculator online'
        ],
        componentKey: 'home',
        category: 'paycheck',
        breadcrumbLabel: 'Paycheck Calculator',
        ogTitle: 'Free Paycheck Calculator 2026 | After-Tax Take-Home Pay',
        ogDescription: 'Free paycheck tax calculator for 2026. Take-home pay after federal, FICA & state taxes. No sign-up. IL, TX, FL, CA, NY.',
        canonicalPath: '/paycheck-calculator',
        jsonLdType: 'home'
    },
    {
        slug: 'illinois-tax-calculator',
        title: 'Free Illinois Tax Calculator 2026 — 4.95% Flat Tax',
        description: 'Free Illinois tax calculator for 2026. Calculate take-home pay after 4.95% flat state tax, $2,775 personal exemption, federal tax & FICA. No sign-up.',
        h1: 'Free Illinois Tax Calculator',
        metaTitle: 'Illinois Tax Calculator 2026: $75K = $57,880 Take-Home',
        metaDesc: 'IL flat 4.95% income tax. On $75K, take home ~$57,880. Calculate your exact Illinois after-tax pay. Free 2026 calculator, no sign-up.',
        keywords: [
            'free Illinois tax calculator',
            'Illinois tax calculator',
            'IL paycheck calculator',
            'Illinois income tax',
            'Illinois 4.95% tax',
            'Illinois take home pay',
            'Illinois personal exemption',
            'Illinois salary calculator',
            'free tax calculator for 2026',
            'IL state tax 2026'
        ],
        componentKey: 'illinois',
        category: 'paycheck',
        breadcrumbLabel: 'Illinois',
        ogTitle: 'Illinois Tax Calculator 2026 — 4.95% Flat, $75K = $57,880 Take-Home',
        ogDescription: 'IL flat 4.95%. On $75K, take home ~$57,880. Calculate your exact Illinois after-tax pay. Free 2026 calculator.',
        canonicalPath: '/illinois-tax-calculator',
        jsonLdType: 'illinois'
    },
    {
        slug: 'texas-tax-calculator',
        title: '0% Income Tax — Texas Tax Calculator 2026',
        description: 'Free Texas tax calculator for 2026. Calculate take-home pay with 0% state income tax. Includes federal tax, FICA, property tax analysis & cost-of-living. No sign-up.',
        h1: 'Free Texas Tax Calculator — No Income Tax in TX',
        metaTitle: 'Texas Tax Calculator 2026: No Income Tax, $75K Take-Home',
        metaDesc: 'Texas has 0% state income tax. On $75K, keep $61,592. Calculate your exact TX take-home pay. Free 2026 calculator, no sign-up.',
        keywords: [
            'free Texas tax calculator',
            'Texas tax calculator',
            'TX paycheck calculator',
            'Texas no income tax',
            'Texas take home pay',
            'Texas salary calculator',
            'Texas property tax',
            'Texas cost of living',
            'free tax calculator for 2026',
            'TX state tax 2026'
        ],
        componentKey: 'texas',
        category: 'paycheck',
        breadcrumbLabel: 'Texas',
        ogTitle: 'Texas Tax Calculator 2026 — 0% Income Tax, $75K = $61,592 Take-Home',
        ogDescription: 'TX has 0% state income tax. On $75K, keep $61,592. Calculate your exact Texas after-tax pay. Free 2026 calculator.',
        canonicalPath: '/texas-tax-calculator',
        jsonLdType: 'texas'
    },
    {
        slug: 'florida-tax-calculator',
        title: '0% Income Tax — Florida Tax Calculator 2026',
        description: 'Free Florida tax calculator for 2026. Calculate take-home pay with 0% state income tax. Includes homestead exemption, property tax & cost-of-living. No sign-up.',
        h1: 'Free Florida Tax Calculator',
        metaTitle: 'Florida Tax Calculator 2026: $75K = $61,592 Take-Home',
        metaDesc: 'Florida has 0% state income tax. On $75K salary, you keep $61,592 after federal & FICA. Calculate your exact FL take-home pay. Free 2026 calculator, no sign-up.',
        keywords: [
            'free Florida tax calculator',
            'Florida tax calculator',
            'FL paycheck calculator',
            'Florida no income tax',
            'Florida take home pay',
            'Florida salary calculator',
            'Florida homestead exemption',
            'Florida property tax',
            'free tax calculator for 2026',
            'FL state tax 2026'
        ],
        componentKey: 'florida',
        category: 'paycheck',
        breadcrumbLabel: 'Florida',
        ogTitle: 'Florida Tax Calculator 2026 — 0% Income Tax, $75K = $61,592 Take-Home',
        ogDescription: 'FL has 0% state income tax. On $75K, keep $61,592. Calculate your exact Florida after-tax pay. Free 2026 calculator.',
        canonicalPath: '/florida-tax-calculator',
        jsonLdType: 'florida'
    },
    {
        slug: 'california-tax-calculator',
        title: 'California Tax Calculator 2026 | 1-13.3% Progressive',
        description: 'Free California tax calculator for 2026. Calculate take-home pay after progressive state tax (1%–13.3%), federal tax & FICA. No sign-up. 401(k) and HSA deductions.',
        h1: 'Free California Tax Calculator — Tax Amount in CA',
        metaTitle: 'California Tax Calculator 2026: $75K = $54,849 Take-Home',
        metaDesc: 'CA charges up to 13.3% state tax. On $75K salary, you take home ~$54,849. Calculate your exact California take-home pay after state, federal & FICA tax. Free 2026 calculator, no sign-up.',
        keywords: [
            'free California tax calculator',
            'California tax calculator',
            'CA paycheck calculator',
            'California income tax',
            'California 13.3% tax',
            'California take home pay',
            'California salary calculator',
            'CA progressive tax',
            'free tax calculator for 2026',
            'California state tax 2026'
        ],
        componentKey: 'california',
        category: 'paycheck',
        breadcrumbLabel: 'California',
        ogTitle: 'California Tax Calculator 2026 — $75K = $54,849 Take-Home',
        ogDescription: 'CA 13.3% max rate. On $75K, take home ~$54,849. Calculate your exact California after-tax pay. Free 2026 calculator.',
        canonicalPath: '/california-tax-calculator',
        jsonLdType: 'california'
    },
    {
        slug: 'new-york-tax-calculator',
        title: 'Free New York Tax Calculator — NYC Tax Rates 2026 — 4% to 10.9% + NYC Tax',
        description: 'Free New York tax calculator for 2026. Calculate take-home pay after progressive state tax (4%–10.9%), NYC tax, federal tax & FICA. No sign-up.',
        h1: 'Free New York Tax Calculator — NYC Tax Rates',
        metaTitle: 'New York Tax Calculator 2026: $75K = $55,413 Take-Home',
        metaDesc: 'NY charges up to 10.9% + NYC tax. On $75K salary, you take home ~$55,413. Calculate your exact NY take-home pay after state, federal & FICA tax. Free 2026 calculator, no sign-up.',
        keywords: [
            'free New York tax calculator',
            'free tax calculator new york',
            'free tax calculator nyc',
            'NY paycheck calculator',
            'New York income tax',
            'NYC tax calculator',
            'New York take home pay',
            'New York salary calculator',
            'NY progressive tax',
            'free tax calculator for 2026',
            'New York state tax 2026'
        ],
        componentKey: 'newyork',
        category: 'paycheck',
        breadcrumbLabel: 'New York',
        ogTitle: 'New York Tax Calculator 2026 — $75K = $55,413 Take-Home',
        ogDescription: 'NY up to 10.9% + NYC tax. On $75K, take home ~$55,413. Calculate your exact NY after-tax pay. Free 2026 calculator.',
        canonicalPath: '/new-york-tax-calculator',
        jsonLdType: 'newyork'
    },
    {
        slug: 'mortgage-calculator',
        title: 'Mortgage Calculator 2026 | Payment & Amortization',
        description: 'Free mortgage calculator with extra payments, amortization schedule, and payoff comparison. Calculate monthly payment using M = P × [r(1+r)^n] / [(1+r)^n - 1]. No sign-up.',
        h1: 'Free Mortgage Calculator',
        metaTitle: 'Free Mortgage Calculator 2026 | Payment & Amortization',
        metaDesc: 'Free mortgage calculator with extra payments, amortization & payoff comparison. No sign-up. Calculate monthly payment and interest.',
        keywords: [
            'free mortgage calculator',
            'mortgage calculator',
            'home loan calculator',
            'amortization calculator',
            'mortgage payment calculator',
            'extra payment calculator',
            'mortgage payoff',
            'monthly mortgage payment',
            'mortgage interest calculator'
        ],
        componentKey: 'mortgage',
        category: 'mortgage',
        breadcrumbLabel: 'Mortgage',
        ogTitle: 'Mortgage Calculator 2026 — Amortization & Extra Payments',
        ogDescription: 'Free mortgage calculator. Monthly payment, amortization & extra payment savings. No sign-up.',
        canonicalPath: '/mortgage-calculator',
        jsonLdType: 'mortgage'
    },
    {
        slug: '401k-retirement-calculator',
        title: 'Free 401(k) Retirement Calculator 2026 — Projection & Growth',
        description: 'Free 401(k) retirement calculator for 2026. Project your balance with employer match, compound growth & annual contributions. No sign-up. Visual charts included.',
        h1: 'Free 401(k) Calculator',
        metaTitle: 'Free 401(k) Calculator 2026 | Retirement Projections',
        metaDesc: 'Free 401(k) calculator 2026. Project balance with employer match & compound growth. No sign-up. Visual charts included.',
        keywords: [
            'free 401k calculator',
            '401k calculator',
            'retirement calculator',
            '401k projection',
            'retirement savings calculator',
            '401k growth calculator',
            'employer match calculator',
            'retirement planning',
            'compound growth calculator',
            'free tax calculator for 2026'
        ],
        componentKey: 'retirement',
        category: 'retirement',
        breadcrumbLabel: '401(k)',
        ogTitle: '401(k) Calculator 2026 — Projection & Compound Growth',
        ogDescription: 'Free 401(k) calculator. Project balance with employer match & compound growth. No sign-up.',
        canonicalPath: '/401k-retirement-calculator',
        jsonLdType: 'retirement'
    },
    {
        slug: 'relocation-calculator',
        title: 'Relocation Calculator 2026 | Compare Take-Home',
        description: 'Free relocation salary calculator for 2026. Compare take-home pay in IL, TX, FL, CA, NY. Find the salary you need to maintain your lifestyle. No sign-up.',
        h1: 'Free Relocation Calculator',
        metaTitle: 'Free Relocation Tax Calculator 2026 — Compare Take-Home Pay',
        metaDesc: 'Free relocation calculator 2026. Compare take-home pay in IL, TX, FL, CA, NY. No sign-up. Find equivalent salary by state.',
        keywords: [
            'free relocation calculator',
            'relocation calculator',
            'salary comparison by state',
            'cost of living calculator',
            'move calculator',
            'salary equivalent calculator',
            'state tax comparison',
            'relocation salary calculator',
            'moving salary calculator',
            'free tax calculator for 2026'
        ],
        componentKey: 'relocation',
        category: 'paycheck',
        breadcrumbLabel: 'Relocate',
        ogTitle: 'Relocation Calculator 2026 — Compare Take-Home Pay',
        ogDescription: 'Free relocation calculator. Compare take-home pay in IL, TX, FL, CA, NY. No sign-up.',
        canonicalPath: '/relocation-calculator',
        jsonLdType: 'relocation'
    },
    {
        slug: 'capital-gains-calculator',
        title: 'Capital Gains Calculator 2026 | Short & Long',
        description: 'Free capital gains tax calculator for 2026. Calculate short-term (up to 37%) and long-term (0%, 15%, 20% + 3.8% NIIT) rates. No sign-up. Strategies included.',
        h1: 'Free Capital Gains Calculator',
        metaTitle: 'Free Capital Gains Tax Calculator 2026 | Short & Long-Term',
        metaDesc: 'Free capital gains tax calculator 2026. Short-term (up to 37%) & long-term (0%/15%/20% + NIIT). No sign-up.',
        keywords: [
            'free capital gains calculator',
            'capital gains calculator',
            'capital gains tax',
            'long term capital gains',
            'short term capital gains',
            'NIIT calculator',
            'investment tax calculator',
            'stock tax calculator',
            'crypto tax calculator',
            'free tax calculator for 2026'
        ],
        componentKey: 'capital-gains',
        category: 'investment',
        breadcrumbLabel: 'Capital Gains',
        ogTitle: 'Capital Gains Calculator 2026 — Short & Long-Term',
        ogDescription: 'Free capital gains calculator. Short-term up to 37%, long-term 0%/15%/20% + NIIT. No sign-up.',
        canonicalPath: '/capital-gains-calculator',
        jsonLdType: 'capital-gains'
    },
    {
        slug: 'self-employment-tax-calculator',
        title: 'Self-Employment Tax Calculator 2026 | 15.3% SE + 1099',
        description: 'Free self-employment tax calculator for 2026. Calculate SE tax (15.3% on 92.35% of net income), half deduction, quarterly estimates, 1099 & federal + state tax. No sign-up.',
        h1: 'Free Self-Employment Tax Calculator — 1099 & SE Tax',
        metaTitle: 'Free Self-Employment Tax Calculator 2026 — 1099 & SE Tax',
        metaDesc: 'Free 2026 self-employment tax calculator. 15.3% SE tax on 92.35% of net income, half deduction, quarterly estimates. See real take-home pay.',
        keywords: [
            'free self employment tax calculator',
            'free tax calculator for self employed',
            'free tax calculator for 1099',
            'SE tax calculator',
            'self employed tax',
            '15.3% self employment tax',
            'quarterly estimated tax',
            'freelance tax calculator',
            '1099 tax calculator',
            'self employment tax rate 2026',
            'free tax calculator for 2026'
        ],
        componentKey: 'self-employment',
        category: 'business',
        breadcrumbLabel: 'Self-Employment',
        ogTitle: 'Free Self-Employment Tax Calculator 2026 — 1099 & SE Tax',
        ogDescription: 'Free 2026 self-employment tax calculator. 15.3% SE tax on 92.35% of net income, half deduction, quarterly estimates. See real take-home pay.',
        canonicalPath: '/self-employment-tax-calculator',
        jsonLdType: 'self-employment'
    },
    {
        slug: 'sales-tax-calculator',
        title: 'Free Sales Tax Calculator 2026 — All 50 States & Reverse Tax',
        description: 'Free sales tax calculator for 2026. Calculate sales tax for any US state with combined rates. Includes reverse sales tax calculator. No sign-up required.',
        h1: 'Free Sales Tax Calculator — All 50 States & Reverse',
        metaTitle: 'Free Sales Tax Calculator 2026 — All 50 States + Reverse Tax',
        metaDesc: 'Free 2026 sales tax calculator for all 50 US states. Calculate combined state + local sales tax, reverse tax from total, car sales tax & IRS deductions. No sign-up.',
        keywords: [
            'free sales tax calculator',
            'sales tax calculator',
            'reverse sales tax calculator',
            'sales tax by state',
            'calculate sales tax',
            'sales tax rate',
            'state sales tax rates 2026',
            'sales tax percentage',
            'combined sales tax rate',
            'free tax calculator for 2026',
            'online sales tax calculator'
        ],
        componentKey: 'sales-tax',
        category: 'paycheck',
        breadcrumbLabel: 'Sales Tax Calculator',
        ogTitle: 'Free Sales Tax Calculator 2026 — All 50 States + Reverse Tax',
        ogDescription: 'Free 2026 sales tax calculator for all 50 US states. Combined state + local rates, reverse tax, car sales tax & IRS deductions. No sign-up.',
        canonicalPath: '/sales-tax-calculator',
        jsonLdType: 'sales-tax'
    },
    {
        slug: 'tax-refund-calculator',
        title: 'Tax Refund Calculator 2026 | Federal & State',
        description: 'Free tax refund calculator for 2026. Estimate your federal and state tax refund based on income, withholding, deductions, and credits. No sign-up required.',
        h1: 'Free Tax Refund Calculator',
        metaTitle: 'Free Tax Refund Calculator 2026 — Estimate Your Refund',
        metaDesc: 'Free tax refund calculator 2026. Estimate your federal and state refund based on income, withholding, deductions & credits. No sign-up required.',
        keywords: [
            'free tax refund calculator',
            'tax refund calculator',
            'tax refund calculator 2026',
            'free tax calculator for 2026',
            'free tax estimator with deductions',
            'tax return calculator',
            'federal refund calculator',
            'state tax refund calculator',
            'free tax calculator federal and state',
            'tax refund estimator',
            'free tax calculator with dependents',
            'irs refund calculator',
            'free tax refund calculator 2026',
            'tax refund calculator with itemized deductions',
            'child tax credit calculator',
            'earned income credit calculator'
        ],
        componentKey: 'tax-refund',
        category: 'paycheck',
        breadcrumbLabel: 'Tax Refund Calculator',
        ogTitle: 'Tax Refund Calculator 2026 — Estimate Your Refund',
        ogDescription: 'Free tax refund calculator 2026. Estimate your federal and state refund. No sign-up required.',
        canonicalPath: '/tax-refund-calculator',
        jsonLdType: 'tax-refund'
    },
    {
        slug: 'overtime-tax-calculator',
        title: 'Free Overtime Tax Calculator 2026 — After-Tax OT Pay',
        description: 'Free overtime tax calculator for 2026. Calculate your after-tax overtime pay at 1.5x rate. See how much OT you actually keep after federal, FICA & state taxes. No sign-up.',
        h1: 'Free Overtime Tax Calculator',
        metaTitle: 'Free Overtime Tax Calculator 2026 — After-Tax OT Pay',
        metaDesc: 'Free overtime tax calculator 2026. Calculate after-tax overtime pay at 1.5x rate. Federal, FICA & state taxes included. No sign-up required.',
        keywords: [
            'free overtime tax calculator',
            'overtime tax calculator',
            'overtime pay calculator',
            'overtime calculator 2026',
            'after tax overtime pay',
            'overtime tax rate',
            '1.5x overtime calculator',
            'time and a half calculator',
            'overtime take home pay',
            'how much overtime is taxed',
            'no tax on overtime calculator',
            'free tax calculator for 2026'
        ],
        componentKey: 'overtime',
        category: 'paycheck',
        breadcrumbLabel: 'Overtime Tax',
        ogTitle: 'Overtime Tax Calculator 2026 — After-Tax OT Pay',
        ogDescription: 'Free overtime tax calculator 2026. Calculate after-tax overtime pay. Federal, FICA & state taxes. No sign-up.',
        canonicalPath: '/overtime-tax-calculator',
        jsonLdType: 'overtime'
    },
    {
        slug: 'georgia-tax-calculator',
        title: 'Georgia Tax Calculator 2026 — 5.49% Flat Tax',
        description: 'How much do you keep after Georgia 5.49% flat tax? Calculate your 2026 take-home pay after state, federal & FICA taxes. Instant results, no sign-up.',
        h1: 'Free Georgia Tax Calculator — 5.49% Flat Tax',
        metaTitle: 'Georgia Tax Calculator 2026 — 5.49% Flat | $75K = $60,083',
        metaDesc: 'GA flat 5.49% income tax. On $75K salary you keep ~$60,083. Calculate your exact Georgia 2026 take-home pay after state, federal & FICA. Free, no sign-up.',
        keywords: [
            'free Georgia tax calculator',
            'Georgia tax calculator',
            'GA paycheck calculator',
            'Georgia income tax',
            'Georgia 5.49% tax',
            'Georgia take home pay',
            'Georgia salary calculator',
            'Georgia flat tax rate',
            'free tax calculator for 2026',
            'GA state tax 2026'
        ],
        componentKey: 'georgia',
        category: 'paycheck',
        breadcrumbLabel: 'Georgia',
        ogTitle: 'Georgia Tax Calculator 2026 — 5.49% Flat | $75K = $60,083',
        ogDescription: 'GA flat 5.49% income tax. On $75K salary you keep ~$60,083. Calculate your exact Georgia 2026 take-home pay. Free, no sign-up.',
        canonicalPath: '/georgia-tax-calculator',
        jsonLdType: 'georgia'
    },
    {
        slug: 'lottery-tax-calculator',
        title: 'Lottery Tax Calculator 2026 | $1M Jackpot = $510K Take-Home',
        description: 'Free lottery calculator and lottery tax calculator. A $1M jackpot pays only ~$510K after federal 24% withholding + state taxes. Calculate your real Powerball or Mega Millions payout after all taxes. No sign-up.',
        h1: 'Free Lottery Tax Calculator — Powerball & Mega Millions',
        metaTitle: 'Free Lottery Tax Calculator 2026 — Powerball Payout',
        metaDesc: 'Free lottery calculator and lottery tax calculator. See your actual Powerball & Mega Millions payout after 24% federal + state taxes on taxable income. Jackpot amounts, tax return impact, federal and state taxes, financial advisors guidance.',
        keywords: [
            'lottery calculator',
            'lottery tax calculator',
            'lottery winnings tax',
            'lottery tax rate',
            'after tax lottery winnings',
            'powerball tax calculator',
            'mega millions tax calculator',
            'lottery withholding rate',
            'free tax calculator for 2026',
            'lottery payout calculator'
        ],
        componentKey: 'lottery',
        category: 'investment',
        breadcrumbLabel: 'Lottery Tax',
        ogTitle: 'Free Lottery Tax Calculator 2026 — Powerball & Mega Millions',
        ogDescription: 'A $1M lottery jackpot pays only ~$510K after 24% federal + state taxes. See your actual Powerball & Mega Millions payout. Free, no sign-up.',
        canonicalPath: '/lottery-tax-calculator',
        jsonLdType: 'lottery'
    },
    {
        slug: 'irs-withholding-calculator',
        title: 'Free IRS Withholding Calculator 2026 — W-4 Optimization',
        description: 'Free IRS withholding calculator for 2026. Optimize your W-4 to avoid owing taxes or overpaying. Based on IRS Publication 15-T. No sign-up.',
        h1: 'Free IRS Withholding Calculator — Optimize Your W-4',
        metaTitle: 'Free IRS Withholding Calculator 2026 — W-4 Optimization Tool',
        metaDesc: 'Free IRS W-4 withholding calculator 2026. Find your exact federal withholding per paycheck to avoid penalties & overpayment. Based on IRS Pub 15-T.',
        keywords: [
            'free IRS withholding calculator',
            'IRS withholding calculator',
            'W-4 calculator',
            'withholding calculator 2026',
            'tax withholding estimator',
            'W-4 optimization',
            'paycheck withholding calculator',
            'IRS tax withholding',
            'free tax calculator for 2026',
            'federal withholding calculator',
            'adjust W-4 allowances',
            'IRS Publication 15-T'
        ],
        componentKey: 'irs-withholding',
        category: 'paycheck',
        breadcrumbLabel: 'IRS Withholding',
        ogTitle: 'Free IRS Withholding Calculator 2026 — W-4 Optimization Tool',
        ogDescription: 'Free IRS W-4 withholding calculator 2026. Find your exact federal withholding per paycheck to avoid penalties & overpayment. Based on IRS Pub 15-T.',
        canonicalPath: '/irs-withholding-calculator',
        jsonLdType: 'irs-withholding'
    },
    {
        slug: 'property-tax-calculator',
        title: 'Free Property Tax Calculator 2026 — All 50 States',
        description: 'Free property tax calculator for 2026. Calculate annual property tax for any US state with average effective rates. Includes homestead exemptions. No sign-up.',
        h1: 'Free Property Tax Calculator',
        metaTitle: 'Free Property Tax Calculator 2026 — Cost by State',
        metaDesc: '$500K home in AZ = ~$6,750/year property tax. Same home in NJ = ~$14,250. Calculate your annual property tax by state & home value. Free 2026 calculator, all 50 states.',
        keywords: [
            'free property tax calculator',
            'property tax calculator',
            'property tax by state',
            'home property tax calculator',
            'property tax rate',
            'property tax estimator',
            'real estate tax calculator',
            'annual property tax',
            'free tax calculator for 2026',
            'property tax comparison by state'
        ],
        componentKey: 'property-tax',
        category: 'mortgage',
        breadcrumbLabel: 'Property Tax',
        ogTitle: 'Property Tax Calculator 2026 — Annual Cost by State',
        ogDescription: '$500K in AZ = ~$6,750/yr. $500K in NJ = ~$14,250/yr. Calculate your property tax by state. Free 2026 calculator.',
        canonicalPath: '/property-tax-calculator',
        jsonLdType: 'property-tax'
    },
    {
        slug: 'bonus-tax-calculator',
        title: 'Bonus Tax Calculator 2026 — $5K Bonus = $3,400 Take-Home',
        description: 'Your $5K bonus may only be $3,400 after taxes. Compare 22% flat vs aggregate method and see your real take-home. Free, instant, no sign-up.',
        h1: 'Free Bonus Tax Calculator — 22% Flat vs Aggregate',
        metaTitle: 'Free Bonus Tax Calculator 2026 — 22% Flat vs Aggregate',
        metaDesc: 'A $5K bonus nets only ~$3,400 after 22% federal + FICA + state taxes. Compare flat vs aggregate method & see your real after-tax bonus. Free 2026 tool.',
        keywords: [
            'free bonus tax calculator',
            'bonus tax calculator',
            'bonus tax rate',
            'supplemental wage calculator',
            '22% bonus tax',
            'aggregate method bonus',
            'after tax bonus calculator',
            'year end bonus tax',
            'free tax calculator for 2026',
            'bonus withholding calculator'
        ],
        componentKey: 'bonus-tax',
        category: 'business',
        breadcrumbLabel: 'Bonus Tax',
        ogTitle: 'Free Bonus Tax Calculator 2026 — 22% Flat vs Aggregate',
        ogDescription: 'A $5K bonus nets only ~$3,400 after 22% federal + FICA + state taxes. Compare flat vs aggregate method & see your real after-tax bonus. Free 2026 tool.',
        canonicalPath: '/bonus-tax-calculator',
        jsonLdType: 'bonus-tax'
    },
    {
        slug: 'north-carolina-tax-calculator',
        title: 'North Carolina Tax Calculator 2026 | 4.5% Flat Rate',
        description: 'Calculate your 2026 North Carolina take-home pay after 4.5% flat state tax, federal tax & FICA. Standard deduction $12,750. No sign-up.',
        h1: 'Free North Carolina Tax Calculator',
        metaTitle: 'NC Tax Calculator 2026 | 4.5% Flat',
        metaDesc: 'Free North Carolina tax calculator 2026. Take-home pay after 4.5% flat tax and $12,750 standard deduction. No sign-up.',
        keywords: [
            'free North Carolina tax calculator',
            'North Carolina tax calculator',
            'NC paycheck calculator',
            'North Carolina income tax',
            'North Carolina 4.5% tax',
            'North Carolina take home pay',
            'North Carolina salary calculator',
            'NC flat tax rate',
            'free tax calculator for 2026',
            'NC state tax 2026'
        ],
        componentKey: 'northcarolina',
        category: 'paycheck',
        breadcrumbLabel: 'North Carolina',
        ogTitle: 'North Carolina Tax Calculator 2026 — 4.5% Flat Rate',
        ogDescription: 'Free North Carolina tax calculator. Take-home pay after 4.5% flat state tax and federal tax. No sign-up. 2026 data.',
        canonicalPath: '/north-carolina-tax-calculator',
        jsonLdType: 'northcarolina'
    },
    {
        slug: 'pennsylvania-tax-calculator',
        title: 'Pennsylvania Tax Calculator 2026 | 3.07% Flat Rate',
        description: 'Calculate your 2026 Pennsylvania take-home pay after 3.07% flat state tax, federal tax & FICA. No state deductions. No sign-up.',
        h1: 'Free Pennsylvania Tax Calculator',
        metaTitle: 'PA Tax Calculator 2026 | 3.07% Flat',
        metaDesc: 'Free Pennsylvania tax calculator 2026. Take-home pay after 3.07% flat tax. No state deductions. No sign-up.',
        keywords: [
            'free Pennsylvania tax calculator',
            'Pennsylvania tax calculator',
            'PA paycheck calculator',
            'Pennsylvania income tax',
            'Pennsylvania 3.07% tax',
            'Pennsylvania take home pay',
            'Pennsylvania salary calculator',
            'PA flat tax rate',
            'free tax calculator for 2026',
            'PA state tax 2026'
        ],
        componentKey: 'pennsylvania',
        category: 'paycheck',
        breadcrumbLabel: 'Pennsylvania',
        ogTitle: 'Pennsylvania Tax Calculator 2026 — 3.07% Flat Rate',
        ogDescription: 'Free Pennsylvania tax calculator. Take-home pay after 3.07% flat state tax. No sign-up. 2026 data.',
        canonicalPath: '/pennsylvania-tax-calculator',
        jsonLdType: 'pennsylvania'
    },
    {
        slug: 'ohio-tax-calculator',
        title: 'Ohio Tax Calculator 2026 | 0% to 3.99% Progressive',
        description: 'Calculate your 2026 Ohio take-home pay after progressive state tax (0%–3.99%), federal tax & FICA. First $26,050 tax-free. No sign-up.',
        h1: 'Free Ohio Tax Calculator',
        metaTitle: 'OH Tax Calculator 2026 | 0-3.99%',
        metaDesc: 'Free Ohio tax calculator 2026. Take-home pay after progressive tax (0%–3.99%). First $26,050 tax-free. No sign-up.',
        keywords: [
            'free Ohio tax calculator',
            'Ohio tax calculator',
            'OH paycheck calculator',
            'Ohio income tax',
            'Ohio 3.99% tax',
            'Ohio take home pay',
            'Ohio salary calculator',
            'Ohio progressive tax',
            'free tax calculator for 2026',
            'Ohio state tax 2026'
        ],
        componentKey: 'ohio',
        category: 'paycheck',
        breadcrumbLabel: 'Ohio',
        ogTitle: 'Ohio Tax Calculator 2026 — 0% to 3.99% Progressive',
        ogDescription: 'Free Ohio tax calculator. Take-home pay after progressive tax (0%–3.99%). No sign-up. 2026 data.',
        canonicalPath: '/ohio-tax-calculator',
        jsonLdType: 'ohio'
    },
    {
        slug: 'michigan-tax-calculator',
        title: 'Michigan Tax Calculator 2026 | 4.25% Flat Rate',
        description: 'Calculate your 2026 Michigan take-home pay after 4.25% flat state tax, federal tax & FICA. $5,500 personal exemption. No sign-up.',
        h1: 'Free Michigan Tax Calculator',
        metaTitle: 'MI Tax Calculator 2026 | 4.25% Flat',
        metaDesc: 'Free Michigan tax calculator 2026. Take-home pay after 4.25% flat tax and $5,500 personal exemption. No sign-up.',
        keywords: [
            'free Michigan tax calculator',
            'Michigan tax calculator',
            'MI paycheck calculator',
            'Michigan income tax',
            'Michigan 4.25% tax',
            'Michigan take home pay',
            'Michigan salary calculator',
            'Michigan flat tax rate',
            'free tax calculator for 2026',
            'MI state tax 2026'
        ],
        componentKey: 'michigan',
        category: 'paycheck',
        breadcrumbLabel: 'Michigan',
        ogTitle: 'Michigan Tax Calculator 2026 — 4.25% Flat Rate',
        ogDescription: 'Free Michigan tax calculator. Take-home pay after 4.25% flat state tax and federal tax. No sign-up. 2026 data.',
        canonicalPath: '/michigan-tax-calculator',
        jsonLdType: 'michigan'
    },
    {
        slug: 'new-jersey-tax-calculator',
        title: 'New Jersey Tax Calculator 2026 | 1.4% to 10.75%',
        description: 'Calculate your 2026 New Jersey take-home pay after progressive state tax (1.4%–10.75%), federal tax & FICA. No sign-up.',
        h1: 'Free New Jersey Tax Calculator',
        metaTitle: 'NJ Tax Calculator 2026 | 1.4-10.75%',
        metaDesc: 'Free New Jersey tax calculator 2026. Take-home pay after progressive tax (1.4%–10.75%). No sign-up.',
        keywords: [
            'free New Jersey tax calculator',
            'New Jersey tax calculator',
            'NJ paycheck calculator',
            'New Jersey income tax',
            'New Jersey 10.75% tax',
            'New Jersey take home pay',
            'New Jersey salary calculator',
            'NJ progressive tax',
            'free tax calculator for 2026',
            'NJ state tax 2026'
        ],
        componentKey: 'newjersey',
        category: 'paycheck',
        breadcrumbLabel: 'New Jersey',
        ogTitle: 'New Jersey Tax Calculator 2026 — 1.4% to 10.75%',
        ogDescription: 'Free New Jersey tax calculator. Take-home pay after progressive tax (1.4%–10.75%). No sign-up. 2026 data.',
        canonicalPath: '/new-jersey-tax-calculator',
        jsonLdType: 'newjersey'
    },
    {
        slug: 'colorado-tax-calculator',
        title: 'Colorado Tax Calculator 2026 | 4.4% Flat Rate',
        description: 'Calculate your 2026 Colorado take-home pay after 4.4% flat state tax, federal tax & FICA. Uses federal taxable income. No sign-up.',
        h1: 'Free Colorado Tax Calculator',
        metaTitle: 'CO Tax Calculator 2026 | 4.4% Flat',
        metaDesc: 'Free Colorado tax calculator 2026. Take-home pay after 4.4% flat tax. Uses federal taxable income. No sign-up.',
        keywords: [
            'free Colorado tax calculator',
            'Colorado tax calculator',
            'CO paycheck calculator',
            'Colorado income tax',
            'Colorado 4.4% tax',
            'Colorado take home pay',
            'Colorado salary calculator',
            'Colorado flat tax rate',
            'free tax calculator for 2026',
            'CO state tax 2026'
        ],
        componentKey: 'colorado',
        category: 'paycheck',
        breadcrumbLabel: 'Colorado',
        ogTitle: 'Colorado Tax Calculator 2026 — 4.4% Flat Rate',
        ogDescription: 'Free Colorado tax calculator. Take-home pay after 4.4% flat state tax and federal tax. No sign-up. 2026 data.',
        canonicalPath: '/colorado-tax-calculator',
        jsonLdType: 'colorado'
    },
    {
        slug: 'arizona-tax-calculator',
        title: 'Arizona Tax Calculator 2026 | 2.5% Flat Rate',
        description: 'Calculate your 2026 Arizona take-home pay after 2.5% flat state tax, federal tax & FICA. One of the lowest state rates. No sign-up.',
        h1: 'Free Arizona Tax Calculator',
        metaTitle: 'Arizona Income Tax 2026: 2.5% Flat Rate — Free Calculator',
        metaDesc: 'Arizona charges just 2.5% flat income tax — one of the lowest rates in the US. On $75K that\'s ~$1,875. Calculate your exact AZ take-home pay. Free 2026 calculator, no sign-up.',
        keywords: [
            'free Arizona tax calculator',
            'Arizona tax calculator',
            'AZ paycheck calculator',
            'Arizona income tax',
            'Arizona 2.5% tax',
            'Arizona take home pay',
            'Arizona salary calculator',
            'Arizona flat tax rate',
            'free tax calculator for 2026',
            'AZ state tax 2026'
        ],
        componentKey: 'arizona',
        category: 'paycheck',
        breadcrumbLabel: 'Arizona',
        ogTitle: 'Arizona Income Tax 2026 — 2.5% Flat Rate Calculator',
        ogDescription: 'AZ flat 2.5% = ~$1,875 on $75K. One of the lowest state rates. Free 2026 calculator, no sign-up.',
        canonicalPath: '/arizona-tax-calculator',
        jsonLdType: 'arizona'
    },
    {
        slug: 'washington-tax-calculator',
        title: 'Washington Tax Calculator 2026: No Income Tax in WA',
        description: 'Free Washington tax calculator for 2026. Calculate take-home pay with 0% state income tax. Includes property tax & sales tax analysis. No sign-up.',
        h1: 'Free Washington Tax Calculator — Tax Calculator WA',
        metaTitle: 'Washington Tax Calculator 2026: No Income Tax in WA',
        metaDesc: 'Free Washington tax calculator 2026. Take-home pay with 0% state tax. Property & sales tax analysis. No sign-up.',
        keywords: [
            'free Washington tax calculator',
            'Washington tax calculator',
            'WA paycheck calculator',
            'Washington no income tax',
            'Washington take home pay',
            'Washington salary calculator',
            'Washington property tax',
            'Washington sales tax',
            'free tax calculator for 2026',
            'WA state tax 2026'
        ],
        componentKey: 'washington',
        category: 'paycheck',
        breadcrumbLabel: 'Washington',
        ogTitle: 'Washington Tax Calculator 2026: No Income Tax in WA',
        ogDescription: 'Free Washington tax calculator. Take-home pay with 0% state tax. Property & sales tax. No sign-up.',
        canonicalPath: '/washington-tax-calculator',
        jsonLdType: 'washington'
    },
    {
        slug: 'massachusetts-tax-calculator',
        title: 'Massachusetts Tax Calculator 2026 | 5% Flat & 9% Surtax',
        description: 'Calculate your 2026 Massachusetts take-home pay after 5% flat state tax (9% surtax over $1M), federal tax & FICA. No sign-up.',
        h1: 'Free Massachusetts Tax Calculator',
        metaTitle: 'Massachusetts Tax Calculator 2026 | 5% Flat & 9% Surtax',
        metaDesc: 'Free Massachusetts tax calculator 2026. Take-home pay after 5% flat tax and 9% surtax over $1M. No sign-up.',
        keywords: [
            'free Massachusetts tax calculator',
            'Massachusetts tax calculator',
            'MA paycheck calculator',
            'Massachusetts income tax',
            'Massachusetts 5% tax',
            'Massachusetts 9% surtax',
            'Massachusetts take home pay',
            'Massachusetts salary calculator',
            'MA flat tax rate',
            'free tax calculator for 2026',
            'MA state tax 2026'
        ],
        componentKey: 'massachusetts',
        category: 'paycheck',
        breadcrumbLabel: 'Massachusetts',
        ogTitle: 'Massachusetts Tax Calculator 2026 — 5% Flat & 9% Surtax',
        ogDescription: 'Free Massachusetts tax calculator. Take-home pay after 5% flat state tax and 9% surtax over $1M. No sign-up. 2026 data.',
        canonicalPath: '/massachusetts-tax-calculator',
        jsonLdType: 'massachusetts'
    },
    {
        slug: 'indiana-tax-calculator',
        title: 'Indiana Tax Calculator 2026 | 3.05% Flat Rate',
        description: 'Calculate your 2026 Indiana take-home pay after 3.05% flat state tax, federal tax & FICA. No sign-up.',
        h1: 'Free Indiana Tax Calculator',
        metaTitle: 'Indiana Tax Calculator 2026 | 3.05% Flat Rate',
        metaDesc: 'Free Indiana tax calculator 2026. Take-home pay after 3.05% flat tax. No sign-up.',
        keywords: [
            'free Indiana tax calculator',
            'Indiana tax calculator',
            'IN paycheck calculator',
            'Indiana income tax',
            'Indiana 3.05% tax',
            'Indiana take home pay',
            'Indiana salary calculator',
            'IN flat tax rate',
            'free tax calculator for 2026',
            'IN state tax 2026'
        ],
        componentKey: 'indiana',
        category: 'paycheck',
        breadcrumbLabel: 'Indiana',
        ogTitle: 'Indiana Tax Calculator 2026 — 3.05% Flat Rate',
        ogDescription: 'Free Indiana tax calculator. Take-home pay after 3.05% flat state tax. No sign-up. 2026 data.',
        canonicalPath: '/indiana-tax-calculator',
        jsonLdType: 'indiana'
    },
    {
        slug: 'tennessee-tax-calculator',
        title: '0% Income Tax — Tennessee Tax Calculator 2026',
        description: 'Free Tennessee tax calculator for 2026. Calculate take-home pay with 0% state income tax. Includes property tax & sales tax analysis. No sign-up.',
        h1: 'Free Tennessee Tax Calculator',
        metaTitle: '0% Income Tax — Tennessee Tax Calculator 2026',
        metaDesc: 'Free Tennessee tax calculator 2026. Take-home pay with 0% state tax. Property & sales tax analysis. No sign-up.',
        keywords: [
            'free Tennessee tax calculator',
            'Tennessee tax calculator',
            'TN paycheck calculator',
            'Tennessee no income tax',
            'Tennessee take home pay',
            'Tennessee salary calculator',
            'Tennessee property tax',
            'Tennessee sales tax',
            'free tax calculator for 2026',
            'TN state tax 2026'
        ],
        componentKey: 'tennessee',
        category: 'paycheck',
        breadcrumbLabel: 'Tennessee',
        ogTitle: '0% Income Tax — Tennessee Tax Calculator 2026',
        ogDescription: 'Free Tennessee tax calculator. Take-home pay with 0% state tax. Property & sales tax. No sign-up.',
        canonicalPath: '/tennessee-tax-calculator',
        jsonLdType: 'tennessee'
    },
    {
        slug: 'missouri-tax-calculator',
        title: 'Missouri Tax Calculator 2026 | 2-4.8% Rate',
        description: 'Calculate your 2026 Missouri take-home pay after progressive state tax (2%–4.8%), federal tax & FICA. No sign-up.',
        h1: 'Free Missouri Tax Calculator',
        metaTitle: 'Missouri Tax Calculator 2026 | 2-4.8% Rate',
        metaDesc: 'Free Missouri tax calculator 2026. Take-home pay after progressive tax (2%–4.8%). No sign-up.',
        keywords: [
            'free Missouri tax calculator',
            'Missouri tax calculator',
            'MO paycheck calculator',
            'Missouri income tax',
            'Missouri 4.8% tax',
            'Missouri take home pay',
            'Missouri salary calculator',
            'MO progressive tax',
            'free tax calculator for 2026',
            'MO state tax 2026'
        ],
        componentKey: 'missouri',
        category: 'paycheck',
        breadcrumbLabel: 'Missouri',
        ogTitle: 'Missouri Tax Calculator 2026 — 2%-4.8% Progressive',
        ogDescription: 'Free Missouri tax calculator. Take-home pay after progressive tax (2%–4.8%). No sign-up. 2026 data.',
        canonicalPath: '/missouri-tax-calculator',
        jsonLdType: 'missouri'
    },
    {
        slug: 'maryland-tax-calculator',
        title: 'Maryland Tax Calculator 2026 | 2-5.75% + County Tax',
        description: 'Calculate your 2026 Maryland take-home pay after progressive state tax (2%–5.75%) plus county taxes, federal tax & FICA. No sign-up.',
        h1: 'Free Maryland Tax Calculator',
        metaTitle: 'Maryland Tax Calculator 2026 | 2-5.75% + County Tax',
        metaDesc: 'Free Maryland tax calculator 2026. Take-home pay after progressive tax (2%–5.75%) plus county taxes. No sign-up.',
        keywords: [
            'free Maryland tax calculator',
            'Maryland tax calculator',
            'MD paycheck calculator',
            'Maryland income tax',
            'Maryland 5.75% tax',
            'Maryland take home pay',
            'Maryland salary calculator',
            'Maryland county tax',
            'free tax calculator for 2026',
            'MD state tax 2026'
        ],
        componentKey: 'maryland',
        category: 'paycheck',
        breadcrumbLabel: 'Maryland',
        ogTitle: 'Maryland Tax Calculator 2026 — 2%-5.75% + County Tax',
        ogDescription: 'Free Maryland tax calculator. Take-home pay after progressive tax (2%–5.75%) plus county taxes. No sign-up. 2026 data.',
        canonicalPath: '/maryland-tax-calculator',
        jsonLdType: 'maryland'
    },
    {
        slug: 'wisconsin-tax-calculator',
        title: 'Wisconsin Tax Calculator 2026 | 3.54-7.65%',
        description: 'Calculate your 2026 Wisconsin take-home pay after progressive state tax (3.54%–7.65%), federal tax & FICA. No sign-up.',
        h1: 'Free Wisconsin Tax Calculator',
        metaTitle: 'Wisconsin Tax Calculator 2026 | 3.54-7.65%',
        metaDesc: 'Free Wisconsin tax calculator 2026. Take-home pay after progressive tax (3.54%–7.65%). No sign-up.',
        keywords: [
            'free Wisconsin tax calculator',
            'Wisconsin tax calculator',
            'WI paycheck calculator',
            'Wisconsin income tax',
            'Wisconsin 7.65% tax',
            'Wisconsin take home pay',
            'Wisconsin salary calculator',
            'WI progressive tax',
            'free tax calculator for 2026',
            'WI state tax 2026'
        ],
        componentKey: 'wisconsin',
        category: 'paycheck',
        breadcrumbLabel: 'Wisconsin',
        ogTitle: 'Wisconsin Tax Calculator 2026 — 3.54%-7.65% Progressive',
        ogDescription: 'Free Wisconsin tax calculator. Take-home pay after progressive tax (3.54%–7.65%). No sign-up. 2026 data.',
        canonicalPath: '/wisconsin-tax-calculator',
        jsonLdType: 'wisconsin'
    },
    {
        slug: 'minnesota-tax-calculator',
        title: 'Minnesota Tax Calculator 2026 | 5.35-9.85%',
        description: 'Calculate your 2026 Minnesota take-home pay after progressive state tax (5.35%–9.85%), federal tax & FICA. No sign-up.',
        h1: 'Free Minnesota Tax Calculator',
        metaTitle: 'Minnesota Tax Calculator 2026 | 5.35-9.85%',
        metaDesc: 'Free Minnesota tax calculator 2026. Take-home pay after progressive tax (5.35%–9.85%). No sign-up.',
        keywords: [
            'free Minnesota tax calculator',
            'Minnesota tax calculator',
            'MN paycheck calculator',
            'Minnesota income tax',
            'Minnesota 9.85% tax',
            'Minnesota take home pay',
            'Minnesota salary calculator',
            'MN progressive tax',
            'free tax calculator for 2026',
            'MN state tax 2026'
        ],
        componentKey: 'minnesota',
        category: 'paycheck',
        breadcrumbLabel: 'Minnesota',
        ogTitle: 'Minnesota Tax Calculator 2026 — 5.35%-9.85% Progressive',
        ogDescription: 'Free Minnesota tax calculator. Take-home pay after progressive tax (5.35%–9.85%). No sign-up. 2026 data.',
        canonicalPath: '/minnesota-tax-calculator',
        jsonLdType: 'minnesota'
    },
    {
        slug: 'oregon-tax-calculator',
        title: 'Oregon Tax Calculator 2026 | 4.75-9.9% Rate',
        description: 'Calculate your 2026 Oregon take-home pay after progressive state tax (4.75%–9.9%), federal tax & FICA. No sales tax. No sign-up.',
        h1: 'Free Oregon Tax Calculator',
        metaTitle: 'Oregon Tax Calculator 2026 | 4.75-9.9% Rate',
        metaDesc: 'Free Oregon tax calculator 2026. Take-home pay after progressive tax (4.75%–9.9%). No sales tax. No sign-up.',
        keywords: [
            'free Oregon tax calculator',
            'Oregon tax calculator',
            'OR paycheck calculator',
            'Oregon income tax',
            'Oregon 9.9% tax',
            'Oregon take home pay',
            'Oregon salary calculator',
            'Oregon no sales tax',
            'free tax calculator for 2026',
            'OR state tax 2026'
        ],
        componentKey: 'oregon',
        category: 'paycheck',
        breadcrumbLabel: 'Oregon',
        ogTitle: 'Oregon Tax Calculator 2026 — 4.75%-9.9% Progressive',
        ogDescription: 'Free Oregon tax calculator. Take-home pay after progressive tax (4.75%–9.9%). No sales tax. No sign-up. 2026 data.',
        canonicalPath: '/oregon-tax-calculator',
        jsonLdType: 'oregon'
    },
    {
        slug: 'virginia-tax-calculator',
        title: 'Virginia Tax Calculator 2026 | 2-5.75% Rate',
        description: 'Calculate your 2026 Virginia take-home pay after progressive state tax (2%–5.75%), federal tax & FICA. See real numbers instantly. No sign-up.',
        h1: 'Free Virginia Tax Calculator',
        metaTitle: 'VA Tax Calculator 2026 | 2-5.75% Rate',
        metaDesc: 'Calculate 2026 Virginia take-home after 2%-5.75% state tax, federal & FICA. See real numbers instantly. No sign-up.',
        keywords: [
            'free Virginia tax calculator',
            'Virginia tax calculator',
            'VA paycheck calculator',
            'Virginia income tax',
            'Virginia 5.75% tax',
            'Virginia take home pay',
            'Virginia salary calculator',
            'VA progressive tax',
            'free tax calculator for 2026',
            'VA state tax 2026'
        ],
        componentKey: 'virginia',
        category: 'paycheck',
        breadcrumbLabel: 'Virginia',
        ogTitle: 'Virginia Tax Calculator 2026 — 2%-5.75% Progressive',
        ogDescription: 'Free Virginia tax calculator. Take-home pay after progressive tax (2%–5.75%). No sign-up. 2026 data.',
        canonicalPath: '/virginia-tax-calculator',
        jsonLdType: 'virginia'
    },
    // ─── Missing State Calculators (27 states) ──────────────────────────────
    {
        slug: 'alaska-tax-calculator',
        title: '0% Income Tax — Alaska Tax Calculator 2026',
        description: 'Free Alaska tax calculator for 2026. Calculate take-home pay with 0% state income tax and no state sales tax. No sign-up.',
        h1: 'Free Alaska Tax Calculator',
        metaTitle: '0% Income Tax — Alaska Tax Calculator 2026',
        metaDesc: 'Free Alaska tax calculator 2026. Take-home pay with 0% state tax and no sales tax. No sign-up required.',
        keywords: [
            'free Alaska tax calculator',
            'Alaska tax calculator',
            'AK paycheck calculator',
            'Alaska no income tax',
            'Alaska take home pay',
            'Alaska salary calculator',
            'free tax calculator for 2026',
            'AK state tax 2026'
        ],
        componentKey: 'alaska',
        category: 'paycheck',
        breadcrumbLabel: 'Alaska',
        ogTitle: '0% Income Tax — Alaska Tax Calculator 2026',
        ogDescription: 'Free Alaska tax calculator. Take-home pay with 0% state tax. No sign-up. 2026 data.',
        canonicalPath: '/alaska-tax-calculator',
        jsonLdType: 'alaska'
    },
    {
        slug: 'nevada-tax-calculator',
        title: '0% Income Tax — Nevada Tax Calculator 2026',
        description: 'Free Nevada tax calculator for 2026. Calculate take-home pay with 0% state income tax. No sign-up.',
        h1: 'Free Nevada Tax Calculator',
        metaTitle: '0% Income Tax — Nevada Tax Calculator 2026',
        metaDesc: 'Free Nevada tax calculator 2026. Take-home pay with 0% state tax. No sign-up required.',
        keywords: [
            'free Nevada tax calculator',
            'Nevada tax calculator',
            'NV paycheck calculator',
            'Nevada no income tax',
            'Nevada take home pay',
            'Nevada salary calculator',
            'free tax calculator for 2026',
            'NV state tax 2026'
        ],
        componentKey: 'nevada',
        category: 'paycheck',
        breadcrumbLabel: 'Nevada',
        ogTitle: '0% Income Tax — Nevada Tax Calculator 2026',
        ogDescription: 'Free Nevada tax calculator. Take-home pay with 0% state tax. No sign-up. 2026 data.',
        canonicalPath: '/nevada-tax-calculator',
        jsonLdType: 'nevada'
    },
    {
        slug: 'south-dakota-tax-calculator',
        title: '0% Income Tax — South Dakota Tax Calculator 2026',
        description: 'Free South Dakota tax calculator for 2026. Calculate take-home pay with 0% state income tax. No sign-up.',
        h1: 'Free South Dakota Tax Calculator',
        metaTitle: '0% Income Tax — South Dakota Tax Calculator 2026',
        metaDesc: 'Free South Dakota tax calculator 2026. Take-home pay with 0% state tax. No sign-up required.',
        keywords: [
            'free South Dakota tax calculator',
            'South Dakota tax calculator',
            'SD paycheck calculator',
            'South Dakota no income tax',
            'South Dakota take home pay',
            'South Dakota salary calculator',
            'free tax calculator for 2026',
            'SD state tax 2026'
        ],
        componentKey: 'southdakota',
        category: 'paycheck',
        breadcrumbLabel: 'South Dakota',
        ogTitle: '0% Income Tax — South Dakota Tax Calculator 2026',
        ogDescription: 'Free South Dakota tax calculator. Take-home pay with 0% state tax. No sign-up. 2026 data.',
        canonicalPath: '/south-dakota-tax-calculator',
        jsonLdType: 'southdakota'
    },
    {
        slug: 'wyoming-tax-calculator',
        title: '0% Income Tax — Wyoming Tax Calculator 2026',
        description: 'Free Wyoming tax calculator for 2026. Calculate take-home pay with 0% state income tax. No sign-up.',
        h1: 'Free Wyoming Tax Calculator',
        metaTitle: '0% Income Tax — Wyoming Tax Calculator 2026',
        metaDesc: 'Free Wyoming tax calculator 2026. Take-home pay with 0% state tax. No sign-up required.',
        keywords: [
            'free Wyoming tax calculator',
            'Wyoming tax calculator',
            'WY paycheck calculator',
            'Wyoming no income tax',
            'Wyoming take home pay',
            'Wyoming salary calculator',
            'free tax calculator for 2026',
            'WY state tax 2026'
        ],
        componentKey: 'wyoming',
        category: 'paycheck',
        breadcrumbLabel: 'Wyoming',
        ogTitle: '0% Income Tax — Wyoming Tax Calculator 2026',
        ogDescription: 'Free Wyoming tax calculator. Take-home pay with 0% state tax. No sign-up. 2026 data.',
        canonicalPath: '/wyoming-tax-calculator',
        jsonLdType: 'wyoming'
    },
    {
        slug: 'new-hampshire-tax-calculator',
        title: '0% Income Tax — New Hampshire Tax Calculator 2026',
        description: 'Free New Hampshire tax calculator for 2026. Calculate take-home pay with 0% state income tax and no sales tax. No sign-up.',
        h1: 'Free New Hampshire Tax Calculator',
        metaTitle: '0% Income Tax — New Hampshire Tax Calculator 2026',
        metaDesc: 'Free New Hampshire tax calculator 2026. Take-home pay with 0% state tax and no sales tax. No sign-up required.',
        keywords: [
            'free New Hampshire tax calculator',
            'New Hampshire tax calculator',
            'NH paycheck calculator',
            'New Hampshire no income tax',
            'New Hampshire take home pay',
            'New Hampshire salary calculator',
            'free tax calculator for 2026',
            'NH state tax 2026'
        ],
        componentKey: 'newhampshire',
        category: 'paycheck',
        breadcrumbLabel: 'New Hampshire',
        ogTitle: '0% Income Tax — New Hampshire Tax Calculator 2026',
        ogDescription: 'Free New Hampshire tax calculator. Take-home pay with 0% state tax. No sign-up. 2026 data.',
        canonicalPath: '/new-hampshire-tax-calculator',
        jsonLdType: 'newhampshire'
    },
    {
        slug: 'idaho-tax-calculator',
        title: 'Idaho Tax Calculator 2026 | 5.695% Flat Rate',
        description: 'Calculate your 2026 Idaho take-home pay after 5.695% flat state tax, federal tax & FICA. No sign-up.',
        h1: 'Free Idaho Tax Calculator',
        metaTitle: 'ID Tax Calculator 2026 | 5.695% Flat',
        metaDesc: 'Free Idaho tax calculator 2026. Take-home pay after 5.695% flat tax. No sign-up.',
        keywords: [
            'free Idaho tax calculator',
            'Idaho tax calculator',
            'ID paycheck calculator',
            'Idaho income tax',
            'Idaho 5.695% tax',
            'Idaho take home pay',
            'Idaho salary calculator',
            'Idaho flat tax rate',
            'free tax calculator for 2026',
            'ID state tax 2026'
        ],
        componentKey: 'idaho',
        category: 'paycheck',
        breadcrumbLabel: 'Idaho',
        ogTitle: 'Idaho Tax Calculator 2026 — 5.695% Flat Rate',
        ogDescription: 'Free Idaho tax calculator. Take-home pay after 5.695% flat state tax. No sign-up. 2026 data.',
        canonicalPath: '/idaho-tax-calculator',
        jsonLdType: 'idaho'
    },
    {
        slug: 'kentucky-tax-calculator',
        title: 'Kentucky Tax Calculator 2026 | 4% Flat Rate',
        description: 'Calculate your 2026 Kentucky take-home pay after 4% flat state tax, federal tax & FICA. No sign-up.',
        h1: 'Free Kentucky Tax Calculator',
        metaTitle: 'KY Tax Calculator 2026 | 4% Flat',
        metaDesc: 'Free Kentucky tax calculator 2026. Take-home pay after 4% flat tax. No sign-up.',
        keywords: [
            'free Kentucky tax calculator',
            'Kentucky tax calculator',
            'KY paycheck calculator',
            'Kentucky income tax',
            'Kentucky 4% tax',
            'Kentucky take home pay',
            'Kentucky salary calculator',
            'Kentucky flat tax rate',
            'free tax calculator for 2026',
            'KY state tax 2026'
        ],
        componentKey: 'kentucky',
        category: 'paycheck',
        breadcrumbLabel: 'Kentucky',
        ogTitle: 'Kentucky Tax Calculator 2026 — 4% Flat Rate',
        ogDescription: 'Free Kentucky tax calculator. Take-home pay after 4% flat state tax. No sign-up. 2026 data.',
        canonicalPath: '/kentucky-tax-calculator',
        jsonLdType: 'kentucky'
    },
    {
        slug: 'mississippi-tax-calculator',
        title: 'Mississippi Tax Calculator 2026 | 4.7% Flat Rate',
        description: 'Calculate your 2026 Mississippi take-home pay after 4.7% flat state tax, federal tax & FICA. No sign-up.',
        h1: 'Free Mississippi Tax Calculator',
        metaTitle: 'MS Tax Calculator 2026 | 4.7% Flat',
        metaDesc: 'Free Mississippi tax calculator 2026. Take-home pay after 4.7% flat tax. No sign-up.',
        keywords: [
            'free Mississippi tax calculator',
            'Mississippi tax calculator',
            'MS paycheck calculator',
            'Mississippi income tax',
            'Mississippi 4.7% tax',
            'Mississippi take home pay',
            'Mississippi salary calculator',
            'free tax calculator for 2026',
            'MS state tax 2026'
        ],
        componentKey: 'mississippi',
        category: 'paycheck',
        breadcrumbLabel: 'Mississippi',
        ogTitle: 'Mississippi Tax Calculator 2026 — 4.7% Flat Rate',
        ogDescription: 'Free Mississippi tax calculator. Take-home pay after 4.7% flat state tax. No sign-up. 2026 data.',
        canonicalPath: '/mississippi-tax-calculator',
        jsonLdType: 'mississippi'
    },
    {
        slug: 'utah-tax-calculator',
        title: 'Utah Tax Calculator 2026 | 4.65% Flat Rate',
        description: 'Calculate your 2026 Utah take-home pay after 4.65% flat state tax, federal tax & FICA. No sign-up.',
        h1: 'Free Utah Tax Calculator',
        metaTitle: 'UT Tax Calculator 2026 | 4.65% Flat',
        metaDesc: 'Free Utah tax calculator 2026. Take-home pay after 4.65% flat tax. No sign-up.',
        keywords: [
            'free Utah tax calculator',
            'Utah tax calculator',
            'UT paycheck calculator',
            'Utah income tax',
            'Utah 4.65% tax',
            'Utah take home pay',
            'Utah salary calculator',
            'Utah flat tax rate',
            'free tax calculator for 2026',
            'UT state tax 2026'
        ],
        componentKey: 'utah',
        category: 'paycheck',
        breadcrumbLabel: 'Utah',
        ogTitle: 'Utah Tax Calculator 2026 — 4.65% Flat Rate',
        ogDescription: 'Free Utah tax calculator. Take-home pay after 4.65% flat state tax. No sign-up. 2026 data.',
        canonicalPath: '/utah-tax-calculator',
        jsonLdType: 'utah'
    },
    {
        slug: 'alabama-tax-calculator',
        title: 'Alabama Tax Calculator 2026 | 2-5% Progressive',
        description: 'Calculate your 2026 Alabama take-home pay after progressive state tax (2%–5%), federal tax & FICA. No sign-up.',
        h1: 'Free Alabama Tax Calculator',
        metaTitle: 'Alabama Tax Calculator 2026: 2-5% Progressive',
        metaDesc: 'Free Alabama tax calculator 2026. Take-home pay after progressive tax (2%–5%). No sign-up.',
        keywords: [
            'free Alabama tax calculator',
            'Alabama tax calculator',
            'AL paycheck calculator',
            'Alabama income tax',
            'Alabama 5% tax',
            'Alabama take home pay',
            'Alabama salary calculator',
            'free tax calculator for 2026',
            'AL state tax 2026'
        ],
        componentKey: 'alabama',
        category: 'paycheck',
        breadcrumbLabel: 'Alabama',
        ogTitle: 'Alabama Tax Calculator 2026 — 2%-5% Progressive',
        ogDescription: 'Free Alabama tax calculator. Take-home pay after progressive tax (2%–5%). No sign-up. 2026 data.',
        canonicalPath: '/alabama-tax-calculator',
        jsonLdType: 'alabama'
    },
    {
        slug: 'arkansas-tax-calculator',
        title: 'Arkansas Tax Calculator 2026 | 2-4.4% Progressive',
        description: 'Calculate your 2026 Arkansas take-home pay after progressive state tax (2%–4.4%), federal tax & FICA. No sign-up.',
        h1: 'Free Arkansas Tax Calculator',
        metaTitle: 'AR Tax Calculator 2026 | 2-4.4%',
        metaDesc: 'Free Arkansas tax calculator 2026. Take-home pay after progressive tax (2%–4.4%). No sign-up.',
        keywords: [
            'free Arkansas tax calculator',
            'Arkansas tax calculator',
            'AR paycheck calculator',
            'Arkansas income tax',
            'Arkansas 4.4% tax',
            'Arkansas take home pay',
            'Arkansas salary calculator',
            'free tax calculator for 2026',
            'AR state tax 2026'
        ],
        componentKey: 'arkansas',
        category: 'paycheck',
        breadcrumbLabel: 'Arkansas',
        ogTitle: 'Arkansas Tax Calculator 2026 — 2%-4.4% Progressive',
        ogDescription: 'Free Arkansas tax calculator. Take-home pay after progressive tax (2%–4.4%). No sign-up. 2026 data.',
        canonicalPath: '/arkansas-tax-calculator',
        jsonLdType: 'arkansas'
    },
    {
        slug: 'connecticut-tax-calculator',
        title: 'Connecticut Tax Calculator 2026 | 3-6.99% Progressive',
        description: 'Calculate your 2026 Connecticut take-home pay after progressive state tax (3%–6.99%), federal tax & FICA. No sign-up.',
        h1: 'Free Connecticut Tax Calculator',
        metaTitle: 'CT Tax Calculator 2026 | 3-6.99%',
        metaDesc: 'Free Connecticut tax calculator 2026. Take-home pay after progressive tax (3%–6.99%). No sign-up.',
        keywords: [
            'free Connecticut tax calculator',
            'Connecticut tax calculator',
            'CT paycheck calculator',
            'Connecticut income tax',
            'Connecticut 6.99% tax',
            'Connecticut take home pay',
            'Connecticut salary calculator',
            'free tax calculator for 2026',
            'CT state tax 2026'
        ],
        componentKey: 'connecticut',
        category: 'paycheck',
        breadcrumbLabel: 'Connecticut',
        ogTitle: 'Connecticut Tax Calculator 2026 — 3%-6.99% Progressive',
        ogDescription: 'Free Connecticut tax calculator. Take-home pay after progressive tax (3%–6.99%). No sign-up. 2026 data.',
        canonicalPath: '/connecticut-tax-calculator',
        jsonLdType: 'connecticut'
    },
    {
        slug: 'delaware-tax-calculator',
        title: 'Delaware Tax Calculator 2026 | 2.2-6.6% Progressive',
        description: 'Calculate your 2026 Delaware take-home pay after progressive state tax (2.2%–6.6%), federal tax & FICA. No sign-up.',
        h1: 'Free Delaware Tax Calculator',
        metaTitle: 'DE Tax Calculator 2026 | 2.2-6.6%',
        metaDesc: 'Free Delaware tax calculator 2026. Take-home pay after progressive tax (2.2%–6.6%). No sign-up.',
        keywords: [
            'free Delaware tax calculator',
            'Delaware tax calculator',
            'DE paycheck calculator',
            'Delaware income tax',
            'Delaware 6.6% tax',
            'Delaware take home pay',
            'Delaware salary calculator',
            'free tax calculator for 2026',
            'DE state tax 2026'
        ],
        componentKey: 'delaware',
        category: 'paycheck',
        breadcrumbLabel: 'Delaware',
        ogTitle: 'Delaware Tax Calculator 2026 — 2.2%-6.6% Progressive',
        ogDescription: 'Free Delaware tax calculator. Take-home pay after progressive tax (2.2%–6.6%). No sign-up. 2026 data.',
        canonicalPath: '/delaware-tax-calculator',
        jsonLdType: 'delaware'
    },
    {
        slug: 'hawaii-tax-calculator',
        title: 'Hawaii Tax Calculator 2026 | 1.4-11% Progressive',
        description: 'Calculate your 2026 Hawaii take-home pay after progressive state tax (1.4%–11%), federal tax & FICA. No sign-up.',
        h1: 'Free Hawaii Tax Calculator',
        metaTitle: 'HI Tax Calculator 2026 | 1.4-11%',
        metaDesc: 'Free Hawaii tax calculator 2026. Take-home pay after progressive tax (1.4%–11%). No sign-up.',
        keywords: [
            'free Hawaii tax calculator',
            'Hawaii tax calculator',
            'HI paycheck calculator',
            'Hawaii income tax',
            'Hawaii 11% tax',
            'Hawaii take home pay',
            'Hawaii salary calculator',
            'free tax calculator for 2026',
            'HI state tax 2026'
        ],
        componentKey: 'hawaii',
        category: 'paycheck',
        breadcrumbLabel: 'Hawaii',
        ogTitle: 'Hawaii Tax Calculator 2026 — 1.4%-11% Progressive',
        ogDescription: 'Free Hawaii tax calculator. Take-home pay after progressive tax (1.4%–11%). No sign-up. 2026 data.',
        canonicalPath: '/hawaii-tax-calculator',
        jsonLdType: 'hawaii'
    },
    {
        slug: 'iowa-tax-calculator',
        title: 'Iowa Tax Calculator 2026 | 4.4-5.96% Progressive',
        description: 'Calculate your 2026 Iowa take-home pay after progressive state tax (4.4%–5.96%), federal tax & FICA. No sign-up.',
        h1: 'Free Iowa Tax Calculator',
        metaTitle: 'IA Tax Calculator 2026 | 4.4-5.96%',
        metaDesc: 'Free Iowa tax calculator 2026. Take-home pay after progressive tax (4.4%–5.96%). No sign-up.',
        keywords: [
            'free Iowa tax calculator',
            'Iowa tax calculator',
            'IA paycheck calculator',
            'Iowa income tax',
            'Iowa take home pay',
            'Iowa salary calculator',
            'free tax calculator for 2026',
            'IA state tax 2026'
        ],
        componentKey: 'iowa',
        category: 'paycheck',
        breadcrumbLabel: 'Iowa',
        ogTitle: 'Iowa Tax Calculator 2026 — 4.4%-5.96% Progressive',
        ogDescription: 'Free Iowa tax calculator. Take-home pay after progressive tax. No sign-up. 2026 data.',
        canonicalPath: '/iowa-tax-calculator',
        jsonLdType: 'iowa'
    },
    {
        slug: 'kansas-tax-calculator',
        title: 'Kansas Tax Calculator 2026 | 3.1-5.7% Progressive',
        description: 'Calculate your 2026 Kansas take-home pay after progressive state tax (3.1%–5.7%), federal tax & FICA. No sign-up.',
        h1: 'Free Kansas Tax Calculator',
        metaTitle: 'KS Tax Calculator 2026 | 3.1-5.7%',
        metaDesc: 'Free Kansas tax calculator 2026. Take-home pay after progressive tax (3.1%–5.7%). No sign-up.',
        keywords: [
            'free Kansas tax calculator',
            'Kansas tax calculator',
            'KS paycheck calculator',
            'Kansas income tax',
            'Kansas 5.7% tax',
            'Kansas take home pay',
            'Kansas salary calculator',
            'free tax calculator for 2026',
            'KS state tax 2026'
        ],
        componentKey: 'kansas',
        category: 'paycheck',
        breadcrumbLabel: 'Kansas',
        ogTitle: 'Kansas Tax Calculator 2026 — 3.1%-5.7% Progressive',
        ogDescription: 'Free Kansas tax calculator. Take-home pay after progressive tax (3.1%–5.7%). No sign-up. 2026 data.',
        canonicalPath: '/kansas-tax-calculator',
        jsonLdType: 'kansas'
    },
    {
        slug: 'louisiana-tax-calculator',
        title: 'Louisiana Tax Calculator 2026 | 1.85-4.75% Progressive',
        description: 'Calculate your 2026 Louisiana take-home pay after progressive state tax (1.85%–4.75%), federal tax & FICA. No sign-up.',
        h1: 'Free Louisiana Tax Calculator',
        metaTitle: 'LA Tax Calculator 2026 | 1.85-4.75%',
        metaDesc: 'Free Louisiana tax calculator 2026. Take-home pay after progressive tax (1.85%–4.75%). No sign-up.',
        keywords: [
            'free Louisiana tax calculator',
            'Louisiana tax calculator',
            'LA paycheck calculator',
            'Louisiana income tax',
            'Louisiana 4.75% tax',
            'Louisiana take home pay',
            'Louisiana salary calculator',
            'free tax calculator for 2026',
            'LA state tax 2026'
        ],
        componentKey: 'louisiana',
        category: 'paycheck',
        breadcrumbLabel: 'Louisiana',
        ogTitle: 'Louisiana Tax Calculator 2026 — 1.85%-4.75% Progressive',
        ogDescription: 'Free Louisiana tax calculator. Take-home pay after progressive tax (1.85%–4.75%). No sign-up. 2026 data.',
        canonicalPath: '/louisiana-tax-calculator',
        jsonLdType: 'louisiana'
    },
    {
        slug: 'maine-tax-calculator',
        title: 'Maine Tax Calculator 2026 | 5.8-7.15% Progressive',
        description: 'Calculate your 2026 Maine take-home pay after progressive state tax (5.8%–7.15%), federal tax & FICA. No sign-up.',
        h1: 'Free Maine Tax Calculator',
        metaTitle: 'ME Tax Calculator 2026 | 5.8-7.15%',
        metaDesc: 'Free Maine tax calculator 2026. Take-home pay after progressive tax (5.8%–7.15%). No sign-up.',
        keywords: [
            'free Maine tax calculator',
            'Maine tax calculator',
            'ME paycheck calculator',
            'Maine income tax',
            'Maine 7.15% tax',
            'Maine take home pay',
            'Maine salary calculator',
            'free tax calculator for 2026',
            'ME state tax 2026'
        ],
        componentKey: 'maine',
        category: 'paycheck',
        breadcrumbLabel: 'Maine',
        ogTitle: 'Maine Tax Calculator 2026 — 5.8%-7.15% Progressive',
        ogDescription: 'Free Maine tax calculator. Take-home pay after progressive tax (5.8%–7.15%). No sign-up. 2026 data.',
        canonicalPath: '/maine-tax-calculator',
        jsonLdType: 'maine'
    },
    {
        slug: 'montana-tax-calculator',
        title: 'Montana Tax Calculator 2026 | 1-5.9% Progressive',
        description: 'Calculate your 2026 Montana take-home pay after progressive state tax (1%–5.9%), federal tax & FICA. No sales tax. No sign-up.',
        h1: 'Free Montana Tax Calculator',
        metaTitle: 'MT Tax Calculator 2026 | 1-5.9%',
        metaDesc: 'Free Montana tax calculator 2026. Take-home pay after progressive tax (1%–5.9%). No sales tax. No sign-up.',
        keywords: [
            'free Montana tax calculator',
            'Montana tax calculator',
            'MT paycheck calculator',
            'Montana income tax',
            'Montana 5.9% tax',
            'Montana take home pay',
            'Montana salary calculator',
            'Montana no sales tax',
            'free tax calculator for 2026',
            'MT state tax 2026'
        ],
        componentKey: 'montana',
        category: 'paycheck',
        breadcrumbLabel: 'Montana',
        ogTitle: 'Montana Tax Calculator 2026 — 1%-5.9% Progressive',
        ogDescription: 'Free Montana tax calculator. Take-home pay after progressive tax (1%–5.9%). No sign-up. 2026 data.',
        canonicalPath: '/montana-tax-calculator',
        jsonLdType: 'montana'
    },
    {
        slug: 'nebraska-tax-calculator',
        title: 'Nebraska Tax Calculator 2026 | 2.46-5.84% Progressive',
        description: 'Calculate your 2026 Nebraska take-home pay after progressive state tax (2.46%–5.84%), federal tax & FICA. No sign-up.',
        h1: 'Free Nebraska Tax Calculator',
        metaTitle: 'NE Tax Calculator 2026 | 2.46-5.84%',
        metaDesc: 'Free Nebraska tax calculator 2026. Take-home pay after progressive tax (2.46%–5.84%). No sign-up.',
        keywords: [
            'free Nebraska tax calculator',
            'Nebraska tax calculator',
            'NE paycheck calculator',
            'Nebraska income tax',
            'Nebraska 5.84% tax',
            'Nebraska take home pay',
            'Nebraska salary calculator',
            'free tax calculator for 2026',
            'NE state tax 2026'
        ],
        componentKey: 'nebraska',
        category: 'paycheck',
        breadcrumbLabel: 'Nebraska',
        ogTitle: 'Nebraska Tax Calculator 2026 — 2.46%-5.84% Progressive',
        ogDescription: 'Free Nebraska tax calculator. Take-home pay after progressive tax (2.46%–5.84%). No sign-up. 2026 data.',
        canonicalPath: '/nebraska-tax-calculator',
        jsonLdType: 'nebraska'
    },
    {
        slug: 'new-mexico-tax-calculator',
        title: 'New Mexico Tax Calculator 2026 | 1.7-5.9% Progressive',
        description: 'Calculate your 2026 New Mexico take-home pay after progressive state tax (1.7%–5.9%), federal tax & FICA. No sign-up.',
        h1: 'Free New Mexico Tax Calculator',
        metaTitle: 'NM Tax Calculator 2026 | 1.7-5.9%',
        metaDesc: 'Free New Mexico tax calculator 2026. Take-home pay after progressive tax (1.7%–5.9%). No sign-up.',
        keywords: [
            'free New Mexico tax calculator',
            'New Mexico tax calculator',
            'NM paycheck calculator',
            'New Mexico income tax',
            'New Mexico 5.9% tax',
            'New Mexico take home pay',
            'New Mexico salary calculator',
            'free tax calculator for 2026',
            'NM state tax 2026'
        ],
        componentKey: 'newmexico',
        category: 'paycheck',
        breadcrumbLabel: 'New Mexico',
        ogTitle: 'New Mexico Tax Calculator 2026 — 1.7%-5.9% Progressive',
        ogDescription: 'Free New Mexico tax calculator. Take-home pay after progressive tax (1.7%–5.9%). No sign-up. 2026 data.',
        canonicalPath: '/new-mexico-tax-calculator',
        jsonLdType: 'newmexico'
    },
    {
        slug: 'north-dakota-tax-calculator',
        title: 'North Dakota Tax Calculator 2026 | 1.1-2.5% Progressive',
        description: 'Calculate your 2026 North Dakota take-home pay after progressive state tax (1.1%–2.5%), federal tax & FICA. No sign-up.',
        h1: 'Free North Dakota Tax Calculator',
        metaTitle: 'ND Tax Calculator 2026 | 1.1-2.5%',
        metaDesc: 'Free North Dakota tax calculator 2026. Take-home pay after progressive tax (1.1%–2.5%). No sign-up.',
        keywords: [
            'free North Dakota tax calculator',
            'North Dakota tax calculator',
            'ND paycheck calculator',
            'North Dakota income tax',
            'North Dakota 2.5% tax',
            'North Dakota take home pay',
            'North Dakota salary calculator',
            'free tax calculator for 2026',
            'ND state tax 2026'
        ],
        componentKey: 'northdakota',
        category: 'paycheck',
        breadcrumbLabel: 'North Dakota',
        ogTitle: 'North Dakota Tax Calculator 2026 — 1.1%-2.5% Progressive',
        ogDescription: 'Free North Dakota tax calculator. Take-home pay after progressive tax (1.1%–2.5%). No sign-up. 2026 data.',
        canonicalPath: '/north-dakota-tax-calculator',
        jsonLdType: 'northdakota'
    },
    {
        slug: 'oklahoma-tax-calculator',
        title: 'Oklahoma Tax Calculator 2026 | 0.25-4.75% Progressive',
        description: 'Calculate your 2026 Oklahoma take-home pay after progressive state tax (0.25%–4.75%), federal tax & FICA. No sign-up.',
        h1: 'Free Oklahoma Tax Calculator',
        metaTitle: 'OK Tax Calculator 2026 | 0.25-4.75%',
        metaDesc: 'Free Oklahoma tax calculator 2026. Take-home pay after progressive tax (0.25%–4.75%). No sign-up.',
        keywords: [
            'free Oklahoma tax calculator',
            'Oklahoma tax calculator',
            'OK paycheck calculator',
            'Oklahoma income tax',
            'Oklahoma 4.75% tax',
            'Oklahoma take home pay',
            'Oklahoma salary calculator',
            'free tax calculator for 2026',
            'OK state tax 2026'
        ],
        componentKey: 'oklahoma',
        category: 'paycheck',
        breadcrumbLabel: 'Oklahoma',
        ogTitle: 'Oklahoma Tax Calculator 2026 — 0.25%-4.75% Progressive',
        ogDescription: 'Free Oklahoma tax calculator. Take-home pay after progressive tax (0.25%–4.75%). No sign-up. 2026 data.',
        canonicalPath: '/oklahoma-tax-calculator',
        jsonLdType: 'oklahoma'
    },
    {
        slug: 'rhode-island-tax-calculator',
        title: 'Rhode Island Tax Calculator 2026 | 3.75-5.99% Progressive',
        description: 'Calculate your 2026 Rhode Island take-home pay after progressive state tax (3.75%–5.99%), federal tax & FICA. No sign-up.',
        h1: 'Free Rhode Island Tax Calculator',
        metaTitle: 'RI Tax Calculator 2026 | 3.75-5.99%',
        metaDesc: 'Free Rhode Island tax calculator 2026. Take-home pay after progressive tax (3.75%–5.99%). No sign-up.',
        keywords: [
            'free Rhode Island tax calculator',
            'Rhode Island tax calculator',
            'RI paycheck calculator',
            'Rhode Island income tax',
            'Rhode Island 5.99% tax',
            'Rhode Island take home pay',
            'Rhode Island salary calculator',
            'free tax calculator for 2026',
            'RI state tax 2026'
        ],
        componentKey: 'rhodeisland',
        category: 'paycheck',
        breadcrumbLabel: 'Rhode Island',
        ogTitle: 'Rhode Island Tax Calculator 2026 — 3.75%-5.99% Progressive',
        ogDescription: 'Free Rhode Island tax calculator. Take-home pay after progressive tax (3.75%–5.99%). No sign-up. 2026 data.',
        canonicalPath: '/rhode-island-tax-calculator',
        jsonLdType: 'rhodeisland'
    },
    {
        slug: 'south-carolina-tax-calculator',
        title: 'South Carolina Tax Calculator 2026 | 0-6.4% Progressive',
        description: 'Calculate your 2026 South Carolina take-home pay after progressive state tax (up to 6.4%), federal tax & FICA. No sign-up.',
        h1: 'Free South Carolina Tax Calculator',
        metaTitle: 'SC Tax Calculator 2026 | 0-6.4%',
        metaDesc: 'Free South Carolina tax calculator 2026. Take-home pay after progressive tax (up to 6.4%). No sign-up.',
        keywords: [
            'free South Carolina tax calculator',
            'South Carolina tax calculator',
            'SC paycheck calculator',
            'South Carolina income tax',
            'South Carolina 6.4% tax',
            'South Carolina take home pay',
            'South Carolina salary calculator',
            'free tax calculator for 2026',
            'SC state tax 2026'
        ],
        componentKey: 'southcarolina',
        category: 'paycheck',
        breadcrumbLabel: 'South Carolina',
        ogTitle: 'South Carolina Tax Calculator 2026 — Up to 6.4% Progressive',
        ogDescription: 'Free South Carolina tax calculator. Take-home pay after progressive tax (up to 6.4%). No sign-up. 2026 data.',
        canonicalPath: '/south-carolina-tax-calculator',
        jsonLdType: 'southcarolina'
    },
    {
        slug: 'vermont-tax-calculator',
        title: 'Vermont Tax Calculator 2026 | 3.35-8.75% Progressive',
        description: 'Calculate your 2026 Vermont take-home pay after progressive state tax (3.35%–8.75%), federal tax & FICA. No sign-up.',
        h1: 'Free Vermont Tax Calculator',
        metaTitle: 'VT Tax Calculator 2026 | 3.35-8.75%',
        metaDesc: 'Free Vermont tax calculator 2026. Take-home pay after progressive tax (3.35%–8.75%). No sign-up.',
        keywords: [
            'free Vermont tax calculator',
            'Vermont tax calculator',
            'VT paycheck calculator',
            'Vermont income tax',
            'Vermont 8.75% tax',
            'Vermont take home pay',
            'Vermont salary calculator',
            'free tax calculator for 2026',
            'VT state tax 2026'
        ],
        componentKey: 'vermont',
        category: 'paycheck',
        breadcrumbLabel: 'Vermont',
        ogTitle: 'Vermont Tax Calculator 2026 — 3.35%-8.75% Progressive',
        ogDescription: 'Free Vermont tax calculator. Take-home pay after progressive tax (3.35%–8.75%). No sign-up. 2026 data.',
        canonicalPath: '/vermont-tax-calculator',
        jsonLdType: 'vermont'
    },
    {
        slug: 'employee-cost-calculator',
        title: 'Employee Cost Calculator 2026 — True Cost of Hiring | Salary + Employer Taxes + Benefits',
        description: 'Free 2026 employee cost calculator for US small businesses. Estimate total payroll cost including salary, employer taxes (FICA, FUTA, SUTA), and benefits. No signup.',
        h1: 'Employee Cost Calculator (Total Payroll Cost)',
        metaTitle: 'Free Employee Cost Calculator 2026 — True Cost of Hiring',
        metaDesc: 'Free 2026 employee cost calculator. Estimate total payroll cost including salary, employer FICA, FUTA, SUTA, and benefits. For 1–49 employees. No signup.',
        keywords: [
            'employee cost calculator',
            'true cost of hiring',
            'employer payroll tax calculator',
            'cost per employee calculator',
            'small business payroll cost',
            'employer FICA calculator',
            'how much does an employee cost',
            'payroll tax calculator for employers',
            'total employee cost',
            'employer tax calculator 2026'
        ],
        componentKey: 'employee-cost',
        category: 'business',
        breadcrumbLabel: 'Employee Cost Calculator',
        ogTitle: 'Employee Cost Calculator 2026 — True Cost of Hiring',
        ogDescription: 'Free 2026 employee cost calculator. Estimate total payroll cost — salary + employer taxes + benefits. No signup.',
        canonicalPath: '/employee-cost-calculator',
        jsonLdType: 'employee-cost'
    },
    {
        slug: 'west-virginia-tax-calculator',
        title: 'West Virginia Tax Calculator 2026 | 3-5.12% Progressive',
        description: 'Calculate your 2026 West Virginia take-home pay after progressive state tax (3%–5.12%), federal tax & FICA. No sign-up.',
        h1: 'Free West Virginia Tax Calculator',
        metaTitle: 'WV Tax Calculator 2026 | 3-5.12%',
        metaDesc: 'Free West Virginia tax calculator 2026. Take-home pay after progressive tax (3%–5.12%). No sign-up.',
        keywords: [
            'free West Virginia tax calculator',
            'West Virginia tax calculator',
            'WV paycheck calculator',
            'West Virginia income tax',
            'West Virginia 5.12% tax',
            'West Virginia take home pay',
            'West Virginia salary calculator',
            'free tax calculator for 2026',
            'WV state tax 2026'
        ],
        componentKey: 'westvirginia',
        category: 'paycheck',
        breadcrumbLabel: 'West Virginia',
        ogTitle: 'West Virginia Tax Calculator 2026 — 3%-5.12% Progressive',
        ogDescription: 'Free West Virginia tax calculator. Take-home pay after progressive tax (3%–5.12%). No sign-up. 2026 data.',
        canonicalPath: '/west-virginia-tax-calculator',
        jsonLdType: 'westvirginia'
    },
    {
        slug: 'new-york-city-tax-calculator',
        title: 'New York City Tax Calculator 2026 | Local Tax Rates',
        description: 'Calculate your 2026 NYC take-home pay after federal, state, and local city taxes (3.078% - 3.876%). See your exact take-home pay.',
        h1: 'Free NYC Tax Calculator',
        metaTitle: 'NYC Tax Calculator 2026 | Calculate Local Taxes',
        metaDesc: 'Free New York City tax calculator 2026. Take-home pay after federal, NY state, and NYC local taxes. No sign-up.',
        keywords: [
            'NYC tax calculator',
            'New York City tax calculator',
            'NYC local tax',
            'NYC paycheck calculator',
            'NYC take home pay',
            'NYC salary calculator',
            'New York City local tax 2026'
        ],
        componentKey: 'nyc',
        category: 'paycheck',
        breadcrumbLabel: 'New York City',
        ogTitle: 'NYC Tax Calculator 2026 — Local City Taxes Included',
        ogDescription: 'Free NYC tax calculator. Take-home pay after federal, NY state, and NYC local taxes (3.078% - 3.876%). 2026 data.',
        canonicalPath: '/new-york-tax-calculator',
        jsonLdType: 'nyc'
    },
    {
        slug: 'los-angeles-tax-calculator',
        title: 'Los Angeles Tax Calculator 2026 | California Take-Home',
        description: 'Calculate your 2026 Los Angeles take-home pay after federal, California state taxes, and FICA. No sign-up.',
        h1: 'Free Los Angeles Tax Calculator',
        metaTitle: 'Los Angeles Tax Calculator 2026 | LA Take-Home Pay',
        metaDesc: 'Free Los Angeles tax calculator 2026. Calculate your true take-home pay in LA after all California state and federal taxes. No sign-up.',
        keywords: [
            'LA tax calculator',
            'Los Angeles tax calculator',
            'LA paycheck calculator',
            'Los Angeles take home pay',
            'LA salary calculator',
            'California tax LA'
        ],
        componentKey: 'la',
        category: 'paycheck',
        breadcrumbLabel: 'Los Angeles',
        ogTitle: 'Los Angeles Tax Calculator 2026',
        ogDescription: 'Free Los Angeles tax calculator. Take-home pay after federal and California state taxes. 2026 data.',
        canonicalPath: '/los-angeles-tax-calculator',
        jsonLdType: 'la'
    },
    {
        slug: 'chicago-tax-calculator',
        title: 'Chicago Tax Calculator 2026 | Illinois Take-Home Pay',
        description: 'Calculate your 2026 Chicago take-home pay after federal, Illinois state taxes (4.95% flat), and FICA. No sign-up.',
        h1: 'Free Chicago Tax Calculator',
        metaTitle: 'Chicago Tax Calculator 2026 | Illinois Take-Home',
        metaDesc: 'Free Chicago tax calculator 2026. Take-home pay after federal, Illinois 4.95% state tax, and FICA. No sign-up.',
        keywords: [
            'Chicago tax calculator',
            'Chicago paycheck calculator',
            'Chicago take home pay',
            'Chicago salary calculator',
            'Illinois tax Chicago'
        ],
        componentKey: 'chicago',
        category: 'paycheck',
        breadcrumbLabel: 'Chicago',
        ogTitle: 'Chicago Tax Calculator 2026',
        ogDescription: 'Free Chicago tax calculator. Take-home pay after federal and Illinois state taxes. 2026 data.',
        canonicalPath: '/chicago-tax-calculator',
        jsonLdType: 'chicago'
    }
];
const COMPONENT_KEY_TO_SLUG = Object.fromEntries(CALCULATOR_ROUTES.map((r)=>[
        r.componentKey,
        r.slug
    ]));
const SLUG_TO_CONFIG = Object.fromEntries(CALCULATOR_ROUTES.map((r)=>[
        r.slug,
        r
    ]));
function getCalculatorSlugs() {
    return CALCULATOR_ROUTES.map((r)=>r.slug);
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-rsc] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-rsc] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-rsc] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/piggy-bank.js [app-rsc] (ecmascript) <export default as PiggyBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-rsc] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-rsc] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-rsc] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calculator.js [app-rsc] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-rsc] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-rsc] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-rsc] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-rsc] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-rsc] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-rsc] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-rsc] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/compass.js [app-rsc] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-rsc] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-rsc] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-rsc] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.js [app-rsc] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/receipt.js [app-rsc] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-rsc] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-rsc] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ticket.js [app-rsc] (ecmascript) <export default as Ticket>");
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
const CALCULATOR_COUNT = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2d$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CALCULATOR_ROUTES"].length;
const BLOG_COUNT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishedPostsMeta"])().length;
const LATEST_POSTS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishedPostsMeta"])().slice(0, 3);
const metadata = {
    title: '2026 Tax Calculator — Paycheck & Take-Home Pay | 50 States',
    description: `Free 2026 tax calculator. Take-home pay after federal, FICA & state tax. ${CALCULATOR_COUNT}+ tools & 50-state sales tax data. No sign-up.`,
    authors: [
        {
            name: 'Rachel Mitchell, CPA',
            url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}/about#rachel-mitchell`
        }
    ],
    alternates: {
        canonical: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_HOME_URL"],
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
        url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_HOME_URL"],
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
// ─── Calculator Data ──────────────────────────────────────────────────────────
const CALCULATOR_CARDS = [
    {
        href: '/paycheck-calculator',
        title: 'Paycheck Calculator',
        desc: 'Federal, FICA & state take-home pay with 401(k) and HSA deductions',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
        badge: 'Most Popular',
        badgeColor: 'bg-emerald-500/20 text-emerald-400',
        gradient: 'from-emerald-600/20 to-teal-600/10'
    },
    {
        href: '/illinois-tax-calculator',
        title: 'Illinois Tax Calculator',
        desc: '4.95% flat tax with $2,775 personal exemption — IL take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'IL',
        badgeColor: 'bg-blue-500/20 text-blue-400',
        gradient: 'from-blue-600/20 to-indigo-600/10'
    },
    {
        href: '/texas-tax-calculator',
        title: 'Texas Tax Calculator',
        desc: '0% state income tax — compute TX take-home pay with property tax analysis',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'TX',
        badgeColor: 'bg-red-500/20 text-red-400',
        gradient: 'from-red-600/20 to-orange-600/10'
    },
    {
        href: '/florida-tax-calculator',
        title: 'Florida Tax Calculator',
        desc: '0% income tax + homestead exemption — FL take-home pay & cost of living',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'FL',
        badgeColor: 'bg-amber-500/20 text-amber-400',
        gradient: 'from-amber-600/20 to-yellow-600/10'
    },
    {
        href: '/california-tax-calculator',
        title: 'California Tax Calculator',
        desc: '1%–13.3% progressive brackets — CA take-home pay with high tax burden',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'CA',
        badgeColor: 'bg-violet-500/20 text-violet-400',
        gradient: 'from-violet-600/20 to-purple-600/10'
    },
    {
        href: '/new-york-tax-calculator',
        title: 'New York Tax Calculator',
        desc: '4%–10.9% progressive + NYC tax — NY take-home pay analysis',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'NY',
        badgeColor: 'bg-cyan-500/20 text-cyan-400',
        gradient: 'from-cyan-600/20 to-sky-600/10'
    },
    {
        href: '/mortgage-calculator',
        title: 'Mortgage Calculator',
        desc: 'Monthly payment, amortization schedule & extra payment savings',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
        badge: 'Finance',
        badgeColor: 'bg-rose-500/20 text-rose-400',
        gradient: 'from-rose-600/20 to-pink-600/10'
    },
    {
        href: '/401k-retirement-calculator',
        title: '401(k) Retirement Calculator',
        desc: 'Projected balance with employer match & compound annual growth',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__["PiggyBank"],
        badge: 'Planning',
        badgeColor: 'bg-teal-500/20 text-teal-400',
        gradient: 'from-teal-600/20 to-emerald-600/10'
    },
    {
        href: '/relocation-calculator',
        title: 'Relocation Calculator',
        desc: 'Compare equivalent salary between states — IL, TX, FL, CA, NY',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"],
        badge: 'Compare',
        badgeColor: 'bg-sky-500/20 text-sky-400',
        gradient: 'from-sky-600/20 to-blue-600/10'
    },
    {
        href: '/capital-gains-calculator',
        title: 'Capital Gains Calculator',
        desc: 'Short-term & long-term rates: 0%/15%/20% + 3.8% NIIT',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
        badge: 'Invest',
        badgeColor: 'bg-orange-500/20 text-orange-400',
        gradient: 'from-orange-600/20 to-amber-600/10'
    },
    {
        href: '/self-employment-tax-calculator',
        title: 'Self-Employment Calculator',
        desc: '15.3% SE tax on 92.35% of net income + half deduction + quarterly estimates',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        badge: 'Business',
        badgeColor: 'bg-lime-500/20 text-lime-400',
        gradient: 'from-lime-600/20 to-green-600/10'
    },
    {
        href: '/tax-refund-calculator',
        title: 'Tax Refund Calculator',
        desc: 'Estimate your federal & state tax refund — income, withholding, deductions & credits',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
        badge: 'Refund',
        badgeColor: 'bg-emerald-500/20 text-emerald-400',
        gradient: 'from-emerald-600/20 to-green-600/10'
    },
    {
        href: '/irs-withholding-calculator',
        title: 'IRS Withholding Calculator',
        desc: 'Calculate recommended federal withholding per paycheck & optimize your W-4 for 2026',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        badge: 'W-4',
        badgeColor: 'bg-cyan-500/20 text-cyan-400',
        gradient: 'from-cyan-600/20 to-teal-600/10'
    },
    {
        href: '/sales-tax-calculator',
        title: 'Sales Tax Calculator',
        desc: 'Calculate sales tax for any US state with combined state + local rates. Reverse calculator included',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"],
        badge: '500K/mo',
        badgeColor: 'bg-emerald-500/20 text-emerald-400',
        gradient: 'from-emerald-600/20 to-green-600/10'
    },
    {
        href: '/overtime-tax-calculator',
        title: 'No Tax on Overtime Calculator',
        desc: 'Calculate your savings under the 2025–2028 OT tax exemption law. Time-sensitive!',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        badge: '2025 Law',
        badgeColor: 'bg-amber-500/20 text-amber-400',
        gradient: 'from-amber-600/20 to-yellow-600/10'
    },
    {
        href: '/bonus-tax-calculator',
        title: 'Bonus Tax Calculator',
        desc: 'How much tax on your bonus? Compare 22% flat rate vs aggregate method',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"],
        badge: 'Bonus',
        badgeColor: 'bg-pink-500/20 text-pink-400',
        gradient: 'from-pink-600/20 to-rose-600/10'
    },
    {
        href: '/property-tax-calculator',
        title: 'Property Tax Calculator',
        desc: 'Calculate property tax for any US state. Compare all 50 states\' effective rates',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
        badge: 'Property',
        badgeColor: 'bg-stone-500/20 text-stone-400',
        gradient: 'from-stone-600/20 to-neutral-600/10'
    },
    {
        href: '/employee-cost-calculator',
        title: 'Employee Cost Calculator',
        desc: 'True cost of hiring — salary + employer FICA, FUTA, SUTA, and benefits for small businesses',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
        badge: 'Employer',
        badgeColor: 'bg-blue-500/20 text-blue-400',
        gradient: 'from-blue-600/20 to-indigo-600/10'
    },
    {
        href: '/lottery-tax-calculator',
        title: 'Lottery Tax Calculator',
        desc: 'How much tax on lottery winnings? Federal + state taxes. Lump sum vs annuity comparison',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__["Ticket"],
        badge: 'Lottery',
        badgeColor: 'bg-purple-500/20 text-purple-400',
        gradient: 'from-purple-600/20 to-violet-600/10'
    },
    {
        href: '/georgia-tax-calculator',
        title: 'Georgia Tax Calculator',
        desc: '5.49% flat state tax — GA take-home pay with standard deductions',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'GA',
        badgeColor: 'bg-red-500/20 text-red-400',
        gradient: 'from-red-600/20 to-orange-600/10'
    },
    {
        href: '/virginia-tax-calculator',
        title: 'Virginia Tax Calculator',
        desc: '2%–5.75% progressive state tax — VA take-home pay with standard deductions',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'VA',
        badgeColor: 'bg-blue-500/20 text-blue-400',
        gradient: 'from-blue-600/20 to-indigo-600/10'
    },
    {
        href: '/north-carolina-tax-calculator',
        title: 'North Carolina Tax Calculator',
        desc: '4.5% flat tax with $12,750 standard deduction — NC take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'NC',
        badgeColor: 'bg-blue-500/20 text-blue-400',
        gradient: 'from-blue-600/20 to-cyan-600/10'
    },
    {
        href: '/pennsylvania-tax-calculator',
        title: 'Pennsylvania Tax Calculator',
        desc: '3.07% flat tax — no state deductions — PA take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'PA',
        badgeColor: 'bg-stone-500/20 text-stone-400',
        gradient: 'from-stone-600/20 to-neutral-600/10'
    },
    {
        href: '/ohio-tax-calculator',
        title: 'Ohio Tax Calculator',
        desc: '0%–3.99% progressive — first $26,050 tax-free — OH take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'OH',
        badgeColor: 'bg-red-500/20 text-red-400',
        gradient: 'from-red-600/20 to-gray-600/10'
    },
    {
        href: '/michigan-tax-calculator',
        title: 'Michigan Tax Calculator',
        desc: '4.25% flat tax with $5,500 personal exemption — MI take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'MI',
        badgeColor: 'bg-amber-500/20 text-amber-400',
        gradient: 'from-amber-600/20 to-yellow-600/10'
    },
    {
        href: '/new-jersey-tax-calculator',
        title: 'New Jersey Tax Calculator',
        desc: '1.4%–10.75% progressive — highest property taxes — NJ take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'NJ',
        badgeColor: 'bg-violet-500/20 text-violet-400',
        gradient: 'from-violet-600/20 to-purple-600/10'
    },
    {
        href: '/colorado-tax-calculator',
        title: 'Colorado Tax Calculator',
        desc: '4.4% flat tax using federal taxable income — CO take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'CO',
        badgeColor: 'bg-sky-500/20 text-sky-400',
        gradient: 'from-sky-600/20 to-blue-600/10'
    },
    {
        href: '/arizona-tax-calculator',
        title: 'Arizona Tax Calculator',
        desc: '2.5% flat tax — one of the lowest state rates — AZ take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'AZ',
        badgeColor: 'bg-orange-500/20 text-orange-400',
        gradient: 'from-orange-600/20 to-red-600/10'
    },
    {
        href: '/washington-tax-calculator',
        title: 'Washington Tax Calculator',
        desc: '0% state income tax — WA take-home pay with property & sales tax analysis',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'WA',
        badgeColor: 'bg-emerald-500/20 text-emerald-400',
        gradient: 'from-emerald-600/20 to-teal-600/10'
    },
    {
        href: '/massachusetts-tax-calculator',
        title: 'Massachusetts Tax Calculator',
        desc: '5% flat tax + 4% surtax over $1M — MA take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'MA',
        badgeColor: 'bg-sky-500/20 text-sky-400',
        gradient: 'from-sky-600/20 to-blue-600/10'
    },
    {
        href: '/indiana-tax-calculator',
        title: 'Indiana Tax Calculator',
        desc: '3.05% flat tax + county taxes 1.5%–2% — IN take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'IN',
        badgeColor: 'bg-amber-500/20 text-amber-400',
        gradient: 'from-amber-600/20 to-yellow-600/10'
    },
    {
        href: '/tennessee-tax-calculator',
        title: 'Tennessee Tax Calculator',
        desc: '0% state income tax — high sales tax — TN take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'TN',
        badgeColor: 'bg-emerald-500/20 text-emerald-400',
        gradient: 'from-emerald-600/20 to-teal-600/10'
    },
    {
        href: '/missouri-tax-calculator',
        title: 'Missouri Tax Calculator',
        desc: '2%–4.8% progressive — uses federal taxable income — MO take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'MO',
        badgeColor: 'bg-amber-500/20 text-amber-400',
        gradient: 'from-amber-600/20 to-red-600/10'
    },
    {
        href: '/maryland-tax-calculator',
        title: 'Maryland Tax Calculator',
        desc: '2%–5.75% + county taxes up to 3.28% — MD take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'MD',
        badgeColor: 'bg-sky-500/20 text-sky-400',
        gradient: 'from-sky-600/20 to-red-600/10'
    },
    {
        href: '/wisconsin-tax-calculator',
        title: 'Wisconsin Tax Calculator',
        desc: '3.54%–7.65% progressive — WI take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'WI',
        badgeColor: 'bg-amber-500/20 text-amber-400',
        gradient: 'from-amber-600/20 to-green-600/10'
    },
    {
        href: '/minnesota-tax-calculator',
        title: 'Minnesota Tax Calculator',
        desc: '5.35%–9.85% progressive — high top rate — MN take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'MN',
        badgeColor: 'bg-sky-500/20 text-sky-400',
        gradient: 'from-sky-600/20 to-purple-600/10'
    },
    {
        href: '/oregon-tax-calculator',
        title: 'Oregon Tax Calculator',
        desc: '4.75%–9.9% progressive — no sales tax — OR take-home pay',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
        badge: 'OR',
        badgeColor: 'bg-emerald-500/20 text-emerald-400',
        gradient: 'from-emerald-600/20 to-sky-600/10'
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
            dateModified: '2026-06-14',
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
            description: `${CALCULATOR_COUNT} free tax calculators for 2026 covering paycheck, state tax, mortgage, retirement, and more.`,
            numberOfItems: CALCULATOR_COUNT,
            itemListElement: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2d$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CALCULATOR_ROUTES"].map((route, i)=>({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: route.breadcrumbLabel,
                    url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"]}${route.canonicalPath}`
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(homeJsonLd)
                }
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 582,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "main-content",
                className: "relative overflow-hidden py-16 sm:py-24 bg-mesh-hero",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 593,
                                        columnNumber: 15
                                    }, this),
                                    "Updated for 2026 Tax Year"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 592,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl",
                                children: [
                                    "Free ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "gradient-text",
                                        children: "Tax Calculators"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 599,
                                        columnNumber: 20
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 600,
                                        columnNumber: 15
                                    }, this),
                                    "for 2026"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 598,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "speakable-summary mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed",
                                children: [
                                    "Ever look at your pay stub and think “wait, they took ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        children: "how"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 606,
                                        columnNumber: 75
                                    }, this),
                                    "much?” Yeah, us too. We built these calculators so you can see exactly where your money goes —",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-foreground",
                                        children: " federal tax"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 608,
                                        columnNumber: 15
                                    }, this),
                                    ", FICA, and",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-foreground",
                                        children: " state taxes"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 609,
                                        columnNumber: 15
                                    }, this),
                                    " all broken down line by line. No guesswork, no surprises."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 605,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row items-center justify-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        prefetch: false,
                                        href: "/paycheck-calculator",
                                        className: "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 620,
                                                columnNumber: 17
                                            }, this),
                                            "Calculate Your Paycheck"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        prefetch: false,
                                        href: "/relocation-calculator",
                                        className: "inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted/30 transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 628,
                                                columnNumber: 17
                                            }, this),
                                            "Compare States"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 623,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 614,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                className: "h-4 w-4 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 636,
                                                columnNumber: 17
                                            }, this),
                                            "100% Free"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 635,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                className: "h-4 w-4 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 640,
                                                columnNumber: 17
                                            }, this),
                                            "No Sign-Up Required"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                className: "h-4 w-4 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 644,
                                                columnNumber: 17
                                            }, this),
                                            "2026 Tax Data"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                className: "h-4 w-4 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 648,
                                                columnNumber: 17
                                            }, this),
                                            "50 State Profiles"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 647,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 634,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 590,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 589,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 588,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-10 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-foreground",
                                    children: [
                                        CALCULATOR_COUNT,
                                        " Free ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gradient-text",
                                            children: "Tax Calculators"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 661,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 660,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-muted-foreground max-w-xl mx-auto",
                                    children: "Pick the one you need. They're all free, they all use 2026 data, and none of them will ask for your email."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 663,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 659,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
                            children: CALCULATOR_CARDS.map((card)=>{
                                const Icon = card.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: card.href,
                                    className: "group premium-card hover-lift p-6 flex flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        className: "h-6 w-6 text-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 682,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 681,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 ${card.badgeColor}`,
                                                    children: card.badge
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 684,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 680,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors",
                                                    children: card.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 691,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1.5 text-sm text-muted-foreground leading-relaxed",
                                                    children: card.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 690,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-auto flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all",
                                            children: [
                                                "Try Calculator",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-4 w-4"
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
                                        }, this)
                                    ]
                                }, card.href, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 673,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 669,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 658,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 657,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 border-t border-border/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-foreground",
                                    children: [
                                        "Which State Has the ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gradient-text",
                                            children: "Lowest Tax"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 716,
                                            columnNumber: 35
                                        }, this),
                                        "?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 715,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-muted-foreground max-w-xl mx-auto",
                                    children: "Same $75,000 salary, wildly different take-home pay. Here's what you actually keep after taxes in each state."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 718,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 714,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
                            children: [
                                {
                                    state: 'Washington',
                                    net: '$61,593',
                                    rate: '0%',
                                    label: 'No Income Tax',
                                    color: 'emerald',
                                    href: '/washington-tax-calculator'
                                },
                                {
                                    state: 'Florida',
                                    net: '$60,545',
                                    rate: '0%',
                                    label: 'Lowest Burden',
                                    color: 'emerald',
                                    href: '/florida-tax-calculator'
                                },
                                {
                                    state: 'Arizona',
                                    net: '$60,083',
                                    rate: '2.5%',
                                    label: 'Lowest Rate',
                                    color: 'emerald',
                                    href: '/arizona-tax-calculator'
                                },
                                {
                                    state: 'California',
                                    net: '$57,950',
                                    rate: '1%–13.3%',
                                    label: 'Highest Rate',
                                    color: 'red',
                                    href: '/california-tax-calculator'
                                },
                                {
                                    state: 'New York',
                                    net: '$57,686',
                                    rate: '4%–10.9%',
                                    label: '+ NYC Tax',
                                    color: 'red',
                                    href: '/new-york-tax-calculator'
                                }
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: item.href,
                                    className: `group rounded-xl border border-border/30 bg-card/50 p-5 text-center transition-all hover-lift ${item.color === 'emerald' ? 'hover:border-emerald-500/30' : item.color === 'amber' ? 'hover:border-amber-500/30' : 'hover:border-red-500/30'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-xs uppercase tracking-wider ${item.color === 'emerald' ? 'text-emerald-400' : item.color === 'amber' ? 'text-amber-400' : 'text-red-400'}`,
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 740,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xl font-bold text-foreground",
                                            children: item.state
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 745,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-muted-foreground",
                                            children: [
                                                "Tax: ",
                                                item.rate
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 746,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-lg font-semibold text-foreground",
                                            children: [
                                                "Net: ",
                                                item.net
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 747,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-[11px] text-emerald-400 group-hover:underline",
                                            children: "View Calculator →"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 748,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.state, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 732,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 724,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 713,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 712,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 border-t border-border/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-foreground",
                                    children: [
                                        "What's Your ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gradient-text",
                                            children: "Take-Home Pay"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 760,
                                            columnNumber: 32
                                        }, this),
                                        " After Taxes?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 759,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-muted-foreground max-w-xl mx-auto",
                                    children: "Select your salary to see exact take-home pay across all 50 states — including Illinois, Texas, Florida, California, and New York."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 762,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 758,
                            columnNumber: 11
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
                                    className: "group inline-flex items-center gap-1.5 rounded-xl border border-border/30 bg-card/50 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400",
                                    children: [
                                        item.label,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 787,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.amount, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 780,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 767,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                prefetch: false,
                                href: "/salary",
                                className: "inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors",
                                children: [
                                    "View all 26 salary levels",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 799,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 793,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 792,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 757,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 756,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 border-t border-border/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-sm text-blue-400 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 810,
                                            columnNumber: 15
                                        }, this),
                                        "For Business Owners"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 809,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-foreground",
                                    children: [
                                        "How Much Does an ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gradient-text",
                                            children: "Employee Really Cost"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 814,
                                            columnNumber: 32
                                        }, this),
                                        "?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 813,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-muted-foreground max-w-xl mx-auto",
                                    children: "Salary is just the beginning. Employer taxes, benefits, and insurance add 25–30% on top. See the true cost of hiring in your state."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 816,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 808,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 lg:grid-cols-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-2 rounded-xl border border-border/30 bg-card/50 p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-semibold text-foreground mb-4",
                                            children: "Example: 5 Employees at $75,000 in Illinois"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 824,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground",
                                                            children: "Base Salaries (5 × $75,000)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 827,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-foreground",
                                                            children: "$375,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 828,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 826,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground",
                                                            children: "Employer FICA (7.65%)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 831,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-orange-400",
                                                            children: "+$28,688"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 832,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 830,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground",
                                                            children: "FUTA + SUTA"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 835,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-amber-400",
                                                            children: "+$2,401"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 836,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 834,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground",
                                                            children: "Benefits (20% of salary)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 839,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-blue-400",
                                                            children: "+$75,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 838,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "divider-glow"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 842,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-base",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-foreground",
                                                            children: "Total Annual Payroll Cost"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 844,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-emerald-400",
                                                            children: "$481,089"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 845,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 843,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground",
                                                            children: "Cost Per Employee"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 848,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-foreground",
                                                            children: [
                                                                "$96,218 ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-amber-400",
                                                                    children: "(28.3% over salary)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 849,
                                                                    columnNumber: 73
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 849,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 847,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 825,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 823,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 flex-1 flex flex-col justify-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-lg font-semibold text-foreground",
                                                    children: "Employee Cost Calculator"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 855,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-sm text-muted-foreground",
                                                    children: "Estimate your true payroll cost — salary + employer FICA, FUTA, SUTA, and benefits. All 50 states."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 856,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    prefetch: false,
                                                    href: "/employee-cost-calculator",
                                                    className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 864,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Calculate Employee Cost"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 859,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 854,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-border/30 bg-card/50 p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-foreground font-medium",
                                                        children: "Employer FICA alone"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 870,
                                                        columnNumber: 19
                                                    }, this),
                                                    "adds $5,738 per employee at $75K. That's $28,688 for 5 employees — before benefits."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 869,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 868,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 853,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 822,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 807,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 806,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 border-t border-border/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-12 lg:grid-cols-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold text-foreground",
                                        children: [
                                            "Why We Built ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "gradient-text",
                                                children: "TheTaxCalc"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 885,
                                                columnNumber: 30
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 884,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-muted-foreground leading-relaxed space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Honestly? We got tired of tax calculators that felt like they were designed by the IRS. You know the ones — confusing interfaces, outdated brackets, and somehow always trying to sell you something at the end. Whether you need a 2025 tax calculator for last year's return or a tax calculator 2026 for this year, we've got you covered."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 888,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Every paycheck has OASDI tax (Social Security), Medicare, federal income tax, and state tax taken out. We show you exactly where each dollar goes — from the 6.2% OASDI tax up to the $184,500 wage cap, to the 1.45% Medicare with no cap, to your state's specific brackets."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 894,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "One of our team members moved from California to Texas a few years back. Same salary, same company — but his take-home jumped by over $8,700 a year. He had no idea the difference would be that big until the first paycheck hit. That's when we thought:",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        children: " everyone should be able to see this before they make big decisions."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 903,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 899,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "So we built the tools we wished existed. All our calculations use the latest 2026 federal brackets, FICA rates, and state-specific tax laws — pulled straight from",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "text-emerald-400 hover:text-emerald-300 underline underline-offset-2",
                                                        children: "IRS publications"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 908,
                                                        columnNumber: 19
                                                    }, this),
                                                    " and",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://taxfoundation.org/",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "text-emerald-400 hover:text-emerald-300 underline underline-offset-2",
                                                        children: "state revenue departments"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 909,
                                                        columnNumber: 19
                                                    }, this),
                                                    ", not some third-party blog post."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 905,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Whether you're searching for a 2025 tax calculator to estimate last year's refund or planning ahead with our tax calculator 2026, our income tax calculator handles federal income tax, FICA, and state tax for all 50 states. Calculate your tax liability, factor in itemized deductions vs. the standard deduction, and see your true take-home pay based on your gross income. No tax preparation software required — just enter your salary and get instant, accurate numbers. We even earn income estimates for self-employed workers, freelancers, and W-2 employees alike. Not tax advice, just honest math."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 911,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 887,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-6 space-y-3",
                                        children: TRUST_POINTS.map((point)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start gap-3 text-sm text-muted-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "h-5 w-5 text-emerald-400 shrink-0 mt-0.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 924,
                                                        columnNumber: 21
                                                    }, this),
                                                    point
                                                ]
                                            }, point, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 923,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 921,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        prefetch: false,
                                        href: "/paycheck-calculator",
                                        className: "mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 934,
                                                columnNumber: 17
                                            }, this),
                                            "Start Calculating"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 929,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 883,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-border/30 bg-card/50 p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-semibold text-foreground mb-4",
                                        children: "Example: $75,000 in Illinois"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 939,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Gross Annual Salary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 942,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-foreground",
                                                        children: "$75,000.00"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 943,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 941,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "divider-glow"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 945,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Federal Tax (after $16,100 std ded)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 947,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-400",
                                                        children: "-$7,670.00"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 948,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 946,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "FICA (SS + Medicare)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 951,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-orange-400",
                                                        children: "-$5,737.50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 950,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "IL State Tax (4.95% on $72,225)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 955,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-amber-400",
                                                        children: "-$3,575.14"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 956,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 954,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "divider-glow"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 958,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-base",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-foreground",
                                                        children: "Net Annual Take-Home"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 960,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-emerald-400",
                                                        children: "$58,017.36"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 961,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 959,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Effective Tax Rate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 964,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-foreground",
                                                        children: "22.64%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 965,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 963,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 940,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 938,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 882,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 881,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 880,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 border-t border-border/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 978,
                                            columnNumber: 15
                                        }, this),
                                        "Complete Site Directory"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 977,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-foreground",
                                    children: [
                                        "Explore All ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gradient-text",
                                            children: "Tools & Resources"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 982,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 981,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-muted-foreground max-w-2xl mx-auto",
                                    children: "Every calculator, salary breakdown, blog article, and state comparison — all in one place."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 984,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 976,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 lg:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-border/30 bg-card/50 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                        className: "h-4 w-4 text-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 994,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 993,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base font-semibold text-foreground",
                                                    children: "Salary After Tax"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 996,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-auto text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5",
                                                    children: "26 Levels"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 997,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 992,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-1.5",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$salary$2d$calculations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SALARY_AMOUNTS"].map((amount)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    prefetch: false,
                                                    href: `/salary/${amount}`,
                                                    className: "inline-flex items-center rounded-md border border-border/30 bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$salary$2d$calculations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatSalaryCompact"])(amount)
                                                }, amount, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1001,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 999,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 pt-3 border-t border-border/20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                prefetch: false,
                                                href: "/salary",
                                                className: "inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors",
                                                children: [
                                                    "View all salary pages",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        className: "h-3 w-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1018,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1012,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1011,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 991,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-border/30 bg-card/50 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                        className: "h-4 w-4 text-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1027,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1026,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base font-semibold text-foreground",
                                                    children: "Blog & Guides"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1029,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-auto text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5",
                                                    children: [
                                                        BLOG_COUNT,
                                                        " Articles"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1030,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1025,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                        prefetch: false,
                                                        href: "/blog",
                                                        className: "group flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors py-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "h-1 w-1 rounded-full bg-emerald-400 shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 1039,
                                                                columnNumber: 21
                                                            }, this),
                                                            "All Blog Articles"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1034,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1033,
                                                    columnNumber: 17
                                                }, this),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishedPostsMeta"])().map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            prefetch: false,
                                                            href: `/blog/${post.slug}`,
                                                            className: "group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors py-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1050,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "line-clamp-1",
                                                                    children: post.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1051,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1045,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, post.slug, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1044,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1032,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1024,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 989,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 lg:grid-cols-2 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-border/30 bg-card/50 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                        className: "h-4 w-4 text-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1065,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1064,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base font-semibold text-foreground",
                                                    children: "Resources"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1067,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1063,
                                            columnNumber: 15
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
                                                    className: "group flex items-start gap-3 rounded-lg border border-border/20 bg-background/30 p-3 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ResIcon, {
                                                            className: "h-4 w-4 text-emerald-400 mt-0.5 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1089,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors",
                                                                    children: res.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1091,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[11px] text-muted-foreground",
                                                                    children: res.desc
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1092,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1090,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, res.href, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1083,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1069,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1062,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-border/30 bg-card/50 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                                        className: "h-4 w-4 text-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1103,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base font-semibold text-foreground",
                                                    children: "State Tax Comparisons"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1106,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-auto text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5",
                                                    children: "10 Matchups"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1107,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1102,
                                            columnNumber: 15
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
                                                    className: "group flex items-center gap-2 rounded-md border border-border/20 bg-background/30 px-3 py-2 text-sm text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-semibold text-foreground/70 group-hover:text-emerald-400 transition-colors",
                                                            children: s1.abbreviation
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1123,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-emerald-500/60",
                                                            children: "vs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1124,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-semibold text-foreground/70 group-hover:text-emerald-400 transition-colors",
                                                            children: s2.abbreviation
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1125,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-auto text-[11px] text-muted-foreground group-hover:text-emerald-400/70 transition-colors hidden sm:inline",
                                                            children: [
                                                                s1.name,
                                                                " vs ",
                                                                s2.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1126,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, slug, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1117,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1109,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1101,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1060,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 975,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 974,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 border-t border-border/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-foreground",
                                    children: [
                                        "Featured ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gradient-text",
                                            children: "Resources"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1141,
                                            columnNumber: 24
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1140,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-muted-foreground max-w-xl mx-auto",
                                    children: "Free tools and original research to help you understand the 2026 tax landscape."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1139,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: "/obbba-tax-calculator",
                                    className: "group rounded-xl border border-border/30 bg-card/50 p-6 hover:border-emerald-500/30 hover-lift transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                            className: "h-8 w-8 text-emerald-400 mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1153,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors",
                                            children: "OBBBA Tax Calculator"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1154,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-muted-foreground",
                                            children: "Compare your 2026 taxes under the One Big Beautiful Bill Act vs prior law. See SALT cap, Child Tax Credit, and tip deduction savings."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1157,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all",
                                            children: [
                                                "Try it now ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1161,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1160,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: "/research",
                                    className: "group rounded-xl border border-border/30 bg-card/50 p-6 hover:border-emerald-500/30 hover-lift transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            className: "h-8 w-8 text-emerald-400 mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1169,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors",
                                            children: "2026 Tax Research Hub"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1170,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-muted-foreground",
                                            children: "Original studies: state tax burden rankings, best states for remote workers, child tax credit guide, property tax by state, and tax refund statistics."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1173,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all",
                                            children: [
                                                "Browse research ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1177,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1176,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: "/scholarship",
                                    className: "group rounded-xl border border-border/30 bg-card/50 p-6 hover:border-emerald-500/30 hover-lift transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                            className: "h-8 w-8 text-emerald-400 mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1185,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors",
                                            children: "$2,500 Student Scholarship"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1186,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-muted-foreground",
                                            children: "TheTaxCalc awards $2,500 annually to finance, accounting, economics, or tax students. Free to apply. Deadline May 31, 2026."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1189,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all",
                                            children: [
                                                "Apply now ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1193,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1192,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1180,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: "/tax-professionals",
                                    className: "group rounded-xl border border-border/30 bg-card/50 p-6 hover:border-emerald-500/30 hover-lift transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                            className: "h-8 w-8 text-emerald-400 mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1201,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors",
                                            children: "For Tax Professionals"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1202,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-muted-foreground",
                                            children: "Free CPA and EA tools: embeddable widgets, 2026 federal and state tax data, methodology, and client-ready calculators. No cost, no sign-up."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1205,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all",
                                            children: [
                                                "Professional tools ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1209,
                                                    columnNumber: 36
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1208,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: "/smartasset-alternative",
                                    className: "group rounded-xl border border-border/30 bg-card/50 p-6 hover:border-emerald-500/30 hover-lift transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                            className: "h-8 w-8 text-emerald-400 mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1217,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors",
                                            children: "SmartAsset Alternative"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1218,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-muted-foreground",
                                            children: "A free, no-sign-up SmartAsset alternative. Paycheck, mortgage, retirement, and tax calculators for all 50 states — no paywall, no data collection."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1221,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all",
                                            children: [
                                                "Compare features ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1225,
                                                    columnNumber: 34
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1224,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1212,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: "/methodology",
                                    className: "group rounded-xl border border-border/30 bg-card/50 p-6 hover:border-emerald-500/30 hover-lift transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                            className: "h-8 w-8 text-emerald-400 mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1233,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors",
                                            children: "How We Calculate Taxes"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1234,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-muted-foreground",
                                            children: "Our methodology: 2026 federal brackets, FICA rates, state tax laws, and standard deductions — all sourced from IRS publications and state revenue departments."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1237,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all",
                                            children: [
                                                "Read methodology ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1241,
                                                    columnNumber: 34
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1240,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1228,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1147,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1138,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 border-t border-border/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-foreground",
                                            children: [
                                                "Latest from the ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-emerald-400",
                                                    children: "Blog"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1254,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1253,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-muted-foreground",
                                            children: "We do the homework so you don't have to"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1256,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1252,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: "/blog",
                                    className: "hidden sm:flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors",
                                    children: [
                                        "View All",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1264,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1258,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1251,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 sm:grid-cols-3",
                            children: LATEST_POSTS.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    prefetch: false,
                                    href: `/blog/${post.slug}`,
                                    className: "group rounded-xl border border-border/30 bg-card/50 p-5 transition-all hover:border-emerald-500/30 hover-lift",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-semibold uppercase tracking-wider text-emerald-400",
                                            children: post.category
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1275,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-base font-semibold text-foreground group-hover:text-emerald-400 transition-colors leading-tight",
                                            children: post.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1276,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-xs text-emerald-400 group-hover:underline",
                                            children: "Read Article →"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1279,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, post.slug, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1269,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1267,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 text-center sm:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                prefetch: false,
                                href: "/blog",
                                className: "inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400",
                                children: [
                                    "View All Articles",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1290,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1284,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1283,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1250,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12 border-t border-border/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$finance$2f$author$2d$bio$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AuthorBioCard"], {
                        authorId: "rachel-mitchell"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1299,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1298,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1297,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1frrpkd._.js.map