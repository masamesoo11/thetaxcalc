(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/tax-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/finance-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tax-config.ts [app-client] (ecmascript)");
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
    const stdDeduction = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].standardDeductionsByFiling[filingStatus] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].standardDeduction;
    const brackets = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].bracketsByFiling[filingStatus] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].brackets;
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
    const taxableIncome = Math.max(0, annualGross - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].standardDeduction);
    return taxableIncome * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].estimateBaseline;
}
function calculateFICA(annualGross, filingStatus = 'single') {
    // Social Security: 6.2% up to wage cap
    const ssWages = Math.min(annualGross, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FICA_2026"].socialSecurityWageCap);
    const socialSecurity = ssWages * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FICA_2026"].socialSecurityRate;
    // Medicare: 1.45% on all wages + 0.9% additional above threshold
    // Married filing jointly has a higher threshold ($250K vs $200K)
    const medicare = annualGross * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FICA_2026"].medicareRate;
    const threshold = filingStatus === 'married' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FICA_2026"].additionalMedicareThresholdMFJ : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FICA_2026"].additionalMedicareThreshold;
    const additionalMedicare = annualGross > threshold ? (annualGross - threshold) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FICA_2026"].additionalMedicareRate : 0;
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
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_PROFILES"][stateKey];
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
    const brackets = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NYC_TAX_2026"].brackets[filingStatus] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NYC_TAX_2026"].brackets.single;
    // NYC tax is on NYS taxable income (after NYS standard deduction)
    // For simplicity, we apply on gross - NYS standard deduction
    const nysDeduction = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_PROFILES"].newyork?.standardDeductionsByFiling?.[filingStatus] ?? 8100;
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
    const stateProfile = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_PROFILES"][stateKey] || null;
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
    const brackets = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].bracketsByFiling[filingStatus] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEDERAL_TAX_2026"].brackets;
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
function calculateTexasCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 45000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXAS_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateFloridaCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 48000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FLORIDA_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateWashingtonCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 48000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WASHINGTON_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateCaliforniaCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 55000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CALIFORNIA_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateNewYorkCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 52000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEWYORK_COST_OF_LIVING"].averageHomeValue
    };
}
function calculateTennesseeCostOfLiving(homeValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averageHomeValue, estimatedAnnualSpending = 42000) {
    const annualPropertyTax = homeValue * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averagePropertyTaxRate;
    const estimatedSalesTaxBurden = estimatedAnnualSpending * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averageSalesTaxRate;
    return {
        annualPropertyTax: roundCurrency(annualPropertyTax),
        monthlyPropertyTax: roundCurrency(annualPropertyTax / 12),
        estimatedSalesTaxBurden: roundCurrency(estimatedSalesTaxBurden),
        totalAnnualBurden: roundCurrency(annualPropertyTax + estimatedSalesTaxBurden),
        totalMonthlyBurden: roundCurrency((annualPropertyTax + estimatedSalesTaxBurden) / 12),
        propertyTaxRate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averagePropertyTaxRate,
        avgHomeValue: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TENNESSEE_COST_OF_LIVING"].averageHomeValue
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/salary-calculations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/finance-utils.ts [app-client] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}
function fmtFull(amount) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function calculateSalaryTakeHome(salary, filingStatus = 'single', nycResident = false) {
    const federalTax = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateFederalTax"])(salary, filingStatus);
    const fica = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateFICA"])(salary, filingStatus);
    const states = STATE_KEYS.map((stateKey)=>{
        const stateTax = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateStateTax"])(salary, stateKey, filingStatus);
        // NYC tax only applies to New York State residents who live in NYC
        const nycTax = stateKey === 'newyork' && nycResident ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateNYCTax"])(salary, filingStatus) : 0;
        const totalDeductions = federalTax + fica.total + stateTax + nycTax;
        const netAnnual = salary - totalDeductions;
        const effectiveTaxRate = salary > 0 ? totalDeductions / salary : 0;
        return {
            stateKey,
            stateName: STATE_LABELS[stateKey]?.name ?? stateKey,
            stateAbbr: STATE_LABELS[stateKey]?.abbr ?? stateKey.toUpperCase().slice(0, 2),
            grossAnnual: salary,
            federalTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(federalTax),
            ficaTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(fica.total),
            ficaSS: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(fica.socialSecurity),
            ficaMedicare: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(fica.medicare + fica.additionalMedicare),
            stateTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(stateTax),
            nycTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(nycTax),
            totalDeductions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(totalDeductions),
            netAnnual: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(netAnnual),
            effectiveTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(effectiveTaxRate * 100) / 100,
            netMonthly: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(netAnnual / 12),
            netBiweekly: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(netAnnual / 26),
            netWeekly: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(netAnnual / 52)
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
    const txMonthly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(txNet / 12);
    const caMonthly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(caNet / 12);
    faqs.push({
        question: `How much is ${formatted} monthly after taxes?`,
        answer: `On a ${formatted} salary, your monthly take-home pay is approximately ${fmt(txMonthly)} in Texas (no state tax) and ${fmt(caMonthly)} in California. In Texas, your bi-weekly paycheck would be about ${fmt((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundCurrency"])(txNet / 26))}. These numbers assume single filing status with the standard deduction and no pre-tax contributions like 401(k) or HSA.`
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/hero-calculator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroCalculator",
    ()=>HeroCalculator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * HeroCalculator — the live take-home-pay calculator embedded in the homepage
 * hero (A+ redesign, Task 32). Reuses the site's REAL calculation engine
 * (calculateSalaryTakeHome) so the math is identical to /paycheck-calculator —
 * no drifted mockup math. Client-side only; zero API calls.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$salary$2d$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/salary-calculations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calculator.js [app-client] (ecmascript) <export default as Calculator>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const PERIODS = [
    {
        key: 'annual',
        label: 'Per year',
        divisor: 1
    },
    {
        key: 'monthly',
        label: 'Per month',
        divisor: 12
    },
    {
        key: 'biweekly',
        label: 'Per 2 weeks',
        divisor: 26
    },
    {
        key: 'weekly',
        label: 'Per week',
        divisor: 52
    }
];
const FILING_STATUSES = [
    {
        key: 'single',
        label: 'Single'
    },
    {
        key: 'married',
        label: 'Married'
    },
    {
        key: 'head_of_household',
        label: 'Head of Household'
    }
];
function usd(amount) {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
}
function HeroCalculator() {
    _s();
    const [salaryInput, setSalaryInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('75000');
    const [stateKey, setStateKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('illinois');
    const [filingStatus, setFilingStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('single');
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('monthly');
    const salary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroCalculator.useMemo[salary]": ()=>{
            const n = Number(salaryInput.replace(/[^0-9.]/g, ''));
            return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100_000_000) : 0;
        }
    }["HeroCalculator.useMemo[salary]"], [
        salaryInput
    ]);
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroCalculator.useMemo[result]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$salary$2d$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateSalaryTakeHome"])(salary, filingStatus)
    }["HeroCalculator.useMemo[result]"], [
        salary,
        filingStatus
    ]);
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroCalculator.useMemo[state]": ()=>result.states.find({
                "HeroCalculator.useMemo[state]": (s)=>s.stateKey === stateKey
            }["HeroCalculator.useMemo[state]"]) ?? result.states[0]
    }["HeroCalculator.useMemo[state]"], [
        result,
        stateKey
    ]);
    const periodDef = PERIODS.find((p)=>p.key === period) ?? PERIODS[1];
    const div = periodDef.divisor;
    const breakdown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroCalculator.useMemo[breakdown]": ()=>{
            if (!state || salary <= 0) return null;
            return [
                {
                    label: 'Federal income tax',
                    value: state.federalTax / div
                },
                {
                    label: 'Social Security (6.2%)',
                    value: state.ficaSS / div
                },
                {
                    label: 'Medicare (1.45%)',
                    value: state.ficaMedicare / div
                },
                {
                    label: `${state.stateName} state income tax`,
                    value: state.stateTax / div,
                    zeroNote: state.stateTax === 0 ? 'No state income tax' : undefined
                },
                {
                    label: 'Total deductions',
                    value: state.totalDeductions / div,
                    strong: true
                }
            ];
        }
    }["HeroCalculator.useMemo[breakdown]"], [
        state,
        div,
        salary
    ]);
    const net = state ? state.netAnnual / div : 0;
    const effective = state ? state.effectiveTaxRate : 0;
    const gross = salary / div;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative rounded-2xl border border-[#e7e0d0] bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_8px_32px_-8px_rgba(138,106,36,0.12)]",
        "aria-label": "Live paycheck calculator",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716c]",
                                children: "Annual salary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#a8a29e]",
                                        children: "$"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        inputMode: "decimal",
                                        value: salaryInput,
                                        onChange: (e)=>setSalaryInput(e.target.value),
                                        className: "w-full rounded-lg border border-[#e7e0d0] bg-[#fafaf9] py-2.5 pl-7 pr-3 text-sm font-semibold text-[#1c1917] outline-none transition focus:border-[#b08d3e] focus:ring-2 focus:ring-[#b08d3e]/20",
                                        placeholder: "75,000",
                                        "aria-label": "Annual salary in dollars"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716c]",
                                children: "State"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: stateKey,
                                onChange: (e)=>setStateKey(e.target.value),
                                className: "w-full appearance-none rounded-lg border border-[#e7e0d0] bg-[#fafaf9] px-3 py-2.5 text-sm font-semibold text-[#1c1917] outline-none transition focus:border-[#b08d3e] focus:ring-2 focus:ring-[#b08d3e]/20",
                                "aria-label": "Your state",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$salary$2d$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_KEYS"].map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: key,
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$salary$2d$calculations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_LABELS"][key]?.name ?? key
                                    }, key, false, {
                                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716c]",
                                children: "Filing status"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex overflow-hidden rounded-lg border border-[#e7e0d0] bg-[#fafaf9] p-0.5",
                                role: "radiogroup",
                                "aria-label": "Filing status",
                                children: FILING_STATUSES.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        role: "radio",
                                        "aria-checked": filingStatus === f.key,
                                        onClick: ()=>setFilingStatus(f.key),
                                        className: `flex-1 rounded-md px-2 py-2 text-xs font-semibold transition ${filingStatus === f.key ? 'bg-[#1c1917] text-white shadow-sm' : 'text-[#78716c] hover:text-[#1c1917]'}`,
                                        children: f.label
                                    }, f.key, false, {
                                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block sm:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-[#78716c]",
                                children: "Pay period"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: period,
                                onChange: (e)=>setPeriod(e.target.value),
                                className: "w-full appearance-none rounded-lg border border-[#e7e0d0] bg-[#fafaf9] px-3 py-2.5 text-sm font-semibold text-[#1c1917] outline-none transition focus:border-[#b08d3e] focus:ring-2 focus:ring-[#b08d3e]/20",
                                "aria-label": "Pay period",
                                children: PERIODS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: p.key,
                                        children: p.label
                                    }, p.key, false, {
                                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/hero-calculator.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 rounded-xl border border-[#b08d3e]/25 bg-gradient-to-b from-[#faf5e9] to-white p-4 sm:p-5",
                "aria-live": "polite",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wider text-[#8a6a24]",
                        children: [
                            "You take home",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-normal normal-case tracking-normal text-[#78716c]",
                                children: [
                                    "(",
                                    periodDef.label.toLowerCase().replace('per ', ''),
                                    ", after tax)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-4xl font-bold tracking-tight text-[#1c1917]",
                        children: [
                            salary > 0 ? usd(Math.round(net)) : usd(0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 align-middle text-sm font-semibold text-[#8a6a24]",
                                children: [
                                    "from ",
                                    usd(Math.round(gross)),
                                    " gross"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    breakdown && salary > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 space-y-2 border-t border-[#b08d3e]/20 pt-3 text-sm",
                        children: [
                            breakdown.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex items-baseline justify-between gap-3 ${row.strong ? 'pt-2 border-t border-dashed border-[#e7e0d0] mt-2' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: row.strong ? 'text-sm font-semibold text-[#1c1917]' : 'text-[#78716c]',
                                            children: [
                                                row.label,
                                                row.zeroNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1.5 rounded-full bg-[#b08d3e]/10 px-2 py-0.5 text-[10px] font-semibold text-[#8a6a24]",
                                                    children: row.zeroNote
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/home/hero-calculator.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/home/hero-calculator.tsx",
                                            lineNumber: 205,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `shrink-0 tabular-nums ${row.strong ? 'font-bold text-[#1c1917]' : 'font-medium text-[#57534e]'}`,
                                            children: [
                                                "−",
                                                usd(Math.round(row.value))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/home/hero-calculator.tsx",
                                            lineNumber: 219,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, row.label, true, {
                                    fileName: "[project]/src/components/home/hero-calculator.tsx",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline justify-between gap-3 pt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#78716c]",
                                        children: "Effective tax rate"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                                        lineNumber: 231,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 font-semibold tabular-nums text-[#8a6a24]",
                                        children: [
                                            effective.toFixed(2),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/hero-calculator.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                prefetch: false,
                href: "/paycheck-calculator",
                className: "group mt-4 flex items-center justify-between gap-2 rounded-xl bg-[#1c1917] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8a6a24]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/hero-calculator.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this),
                            "Add 401(k), HSA & see all 50 states"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                        className: "h-4 w-4 transition-transform group-hover:translate-x-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/hero-calculator.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/hero-calculator.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/hero-calculator.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(HeroCalculator, "THpM6P7mxv5l4CT3e1EYr3U5PGY=");
_c = HeroCalculator;
var _c;
__turbopack_context__.k.register(_c, "HeroCalculator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/calculator-browser.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CalculatorBrowser",
    ()=>CalculatorBrowser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * CalculatorBrowser — category-filtered calculator cards for the homepage (A+).
 * ALL cards are always rendered in the SSR DOM (visibility toggled via CSS
 * classes only) so every internal link stays crawlable; the pill bar is a
 * pure presentation-layer filter, per the Task 31 SEO guardrails.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-client] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/piggy-bank.js [app-client] (ecmascript) <export default as PiggyBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-client] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ticket.js [app-client] (ecmascript) <export default as Ticket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ICONS = {
    DollarSign: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
    MapPin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
    Home: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
    PiggyBank: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__["PiggyBank"],
    ArrowRightLeft: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"],
    TrendingUp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
    Shield: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
    Receipt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"],
    Clock: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
    Gift: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"],
    Building: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
    Ticket: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__["Ticket"],
    FileText: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
};
function CalculatorBrowser({ cards }) {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('featured');
    const categories = [
        {
            key: 'featured',
            label: 'Featured'
        },
        {
            key: 'all',
            label: `All ${cards.length}`
        },
        {
            key: 'paycheck',
            label: 'Paychecks & Income'
        },
        {
            key: 'state',
            label: 'State Calculators'
        },
        {
            key: 'finance',
            label: 'Finance & Retirement'
        },
        {
            key: 'business',
            label: 'Business & Special'
        }
    ];
    const isVisible = (card)=>active === 'all' || (active === 'featured' ? card.featured === true : card.category === active);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap justify-center gap-2",
                role: "tablist",
                "aria-label": "Calculator categories",
                children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        role: "tab",
                        "aria-selected": active === cat.key,
                        onClick: ()=>setActive(cat.key),
                        className: `rounded-full border px-4 py-2 text-sm font-semibold transition ${active === cat.key ? 'border-[#8a6a24] bg-[#1c1917] text-white shadow-sm' : 'border-[#e7e0d0] bg-white text-[#57534e] hover:border-[#b08d3e]/50 hover:text-[#8a6a24]'}`,
                        children: cat.label
                    }, cat.key, false, {
                        fileName: "[project]/src/components/home/calculator-browser.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/home/calculator-browser.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                children: cards.map((card)=>{
                    const Icon = ICONS[card.icon] ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        prefetch: false,
                        href: card.href,
                        className: `group flex flex-col gap-3 rounded-2xl border border-[#e7e0d0] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#b08d3e]/50 hover:shadow-[0_8px_24px_-8px_rgba(138,106,36,0.18)] ${isVisible(card) ? '' : 'hidden'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-11 w-11 items-center justify-center rounded-xl bg-[#faf5e9] text-[#8a6a24]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/calculator-browser.tsx",
                                            lineNumber: 118,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/calculator-browser.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-[#faf5e9] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]",
                                        children: card.badge
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/calculator-browser.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/calculator-browser.tsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base font-semibold text-[#1c1917] transition-colors group-hover:text-[#8a6a24]",
                                        children: card.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/calculator-browser.tsx",
                                        lineNumber: 126,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1.5 text-sm leading-relaxed text-[#57534e]",
                                        children: card.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/calculator-browser.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/calculator-browser.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6a24] transition-all group-hover:gap-3",
                                children: [
                                    "Try Calculator",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/calculator-browser.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/calculator-browser.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this)
                        ]
                    }, card.href, true, {
                        fileName: "[project]/src/components/home/calculator-browser.tsx",
                        lineNumber: 108,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/home/calculator-browser.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/calculator-browser.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(CalculatorBrowser, "F9hGhWR8OSILa7sXn2LFbKg5iew=");
_c = CalculatorBrowser;
var _c;
__turbopack_context__.k.register(_c, "CalculatorBrowser");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/states-tax-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatesTaxTable",
    ()=>StatesTaxTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * StatesTaxTable — searchable 50-state tax table for the homepage (A+).
 * Replaces the old 50-tile link grid with a denser, searchable table.
 * ALL 50 rows are always rendered in the SSR DOM (search filters via CSS
 * classes only) so every /sales-tax-calculator/{state} internal link stays
 * crawlable — Task 31 SEO guardrail.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function StatesTaxTable({ rows }) {
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const q = query.trim().toLowerCase();
    const visibleCount = rows.filter((r)=>r.name.toLowerCase().includes(q)).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a8a29e]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/states-tax-table.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "search",
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                placeholder: "Search your state…",
                                "aria-label": "Search states",
                                className: "w-full rounded-full border border-[#e7e0d0] bg-white py-3 pl-10 pr-4 text-sm font-medium text-[#1c1917] outline-none transition placeholder:text-[#a8a29e] focus:border-[#b08d3e] focus:ring-2 focus:ring-[#b08d3e]/20"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/states-tax-table.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/states-tax-table.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[#78716c]",
                        "aria-live": "polite",
                        children: q ? `${visibleCount} state${visibleCount === 1 ? '' : 's'} match “${query.trim()}”` : 'All 50 states — combined state + average local sales tax'
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/states-tax-table.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/states-tax-table.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 overflow-hidden rounded-2xl border border-[#e7e0d0] bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-96 overflow-y-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "sticky top-0 z-10 bg-[#fafaf9]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-[#e7e0d0] text-left text-xs font-semibold uppercase tracking-wider text-[#78716c]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            className: "px-4 py-3",
                                            children: "State"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/states-tax-table.tsx",
                                            lineNumber: 56,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            className: "px-4 py-3",
                                            children: "Income tax"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/states-tax-table.tsx",
                                            lineNumber: 57,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            className: "hidden px-4 py-3 sm:table-cell",
                                            children: "Avg sales tax"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/states-tax-table.tsx",
                                            lineNumber: 58,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            className: "px-4 py-3 text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Open state page"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                lineNumber: 60,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/states-tax-table.tsx",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/home/states-tax-table.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/states-tax-table.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: rows.map((row)=>{
                                    const visible = row.name.toLowerCase().includes(q);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: `border-b border-[#f0ece3] last:border-0 transition-colors hover:bg-[#faf5e9] ${visible ? '' : 'hidden'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 font-semibold text-[#1c1917]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    prefetch: false,
                                                    href: `/sales-tax-calculator/${row.slug}`,
                                                    className: "transition-colors hover:text-[#8a6a24] hover:underline",
                                                    children: row.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                lineNumber: 74,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: row.isNoIncomeTax ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full bg-[#b08d3e]/10 px-2 py-0.5 text-xs font-semibold text-[#8a6a24]",
                                                    children: "0% — none"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#57534e]",
                                                    children: row.incomeTaxRate
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                lineNumber: 83,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "hidden px-4 py-3 tabular-nums text-[#57534e] sm:table-cell",
                                                children: row.salesTaxCombined
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                lineNumber: 92,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    prefetch: false,
                                                    href: `/sales-tax-calculator/${row.slug}`,
                                                    "aria-label": `Open ${row.name} sales tax calculator`,
                                                    className: "inline-flex items-center gap-1 text-xs font-semibold text-[#8a6a24] hover:underline",
                                                    children: [
                                                        "Open",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/states-tax-table.tsx",
                                                lineNumber: 95,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, row.key, true, {
                                        fileName: "[project]/src/components/home/states-tax-table.tsx",
                                        lineNumber: 68,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/states-tax-table.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/states-tax-table.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/states-tax-table.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/home/states-tax-table.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/states-tax-table.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(StatesTaxTable, "qO/HZodsWTfJhuzZtdaxiosei2U=");
_c = StatesTaxTable;
var _c;
__turbopack_context__.k.register(_c, "StatesTaxTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1l-mtqq._.js.map