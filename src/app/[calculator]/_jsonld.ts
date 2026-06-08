import {
  HOME_FAQS,
  ILLINOIS_FAQS,
  TEXAS_FAQS,
  FLORIDA_FAQS,
  CALIFORNIA_FAQS,
  NEWYORK_FAQS,
  MORTGAGE_FAQS,
  CAPITAL_GAINS_FAQS,
  SELF_EMPLOYMENT_FAQS,
  RETIREMENT_FAQS,
  RELOCATION_FAQS,
  TAX_REFUND_FAQS,
  SALES_TAX_FAQS,
  OVERTIME_FAQS,
  GEORGIA_FAQS,
  LOTTERY_TAX_FAQS,
  IRS_WITHHOLDING_FAQS,
  PROPERTY_TAX_FAQS,
  BONUS_TAX_FAQS,
  VIRGINIA_FAQS,
} from '@/lib/faq-data';
import { SITE_URL } from '@/lib/site-config';

// ─── JSON-LD FAQ Helper ─────────────────────────────────────────────────────────

export function faqsToJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage' as const,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── JSON-LD Schema Generators ───────────────────────────────────────────────

function getHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Paycheck Calculator — Federal, FICA & State Tax Take-Home Pay',
        description:
          'Free 2026 paycheck calculator. Instantly compute your take-home pay after federal tax, FICA (Social Security + Medicare), and state income tax deductions.',
        url: `${SITE_URL}/paycheck-calculator`,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Paycheck Calculator', item: `${SITE_URL}/paycheck-calculator` },
          ],
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'TheTaxCalc Paycheck Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your Take-Home Pay',
        step: [
          { '@type': 'HowToStep', name: 'Enter Gross Salary', text: 'Input your annual, monthly, bi-weekly, weekly, or hourly salary' },
          { '@type': 'HowToStep', name: 'Select State', text: 'Choose IL (4.95%), TX (0%), FL (0%), CA (1%–13.3%), or NY (4%–10.9%)' },
          { '@type': 'HowToStep', name: 'Choose Filing Status', text: 'Select Single, Married, or Head of Household' },
          { '@type': 'HowToStep', name: 'Add Pre-Tax Deductions', text: 'Enter 401(k) and HSA contributions' },
          { '@type': 'HowToStep', name: 'View Instant Results', text: 'See your net take-home pay, effective tax rate, and full deduction breakdown' },
        ],
      },
      faqsToJsonLd(HOME_FAQS),
    ],
  };
}

function getIllinoisJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Illinois Paycheck Calculator', item: `${SITE_URL}/illinois-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Illinois Paycheck Calculator 2026', url: `${SITE_URL}/illinois-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Illinois Paycheck Math Solver', description: 'Computes net take-home pay: Net = Gross - Federal Tax - FICA - IL State Tax, where IL Tax = (Gross - Personal Exemption) × 4.95%', mathExpression: 'Net = G - Fed(G - StdDed) - FICA(G) - (G - Exempt) × 0.0495' },
      { '@type': 'Dataset', name: '2026 Illinois Tax Rates', variableMeasured: [
        { name: 'Illinois Flat Tax Rate', value: '4.95%' },
        { name: 'Illinois Personal Exemption', value: '$2,775' },
        { name: 'Federal Standard Deduction (Single)', value: '$16,100' },
        { name: 'Social Security Wage Cap', value: '$176,100' },
      ]},
      faqsToJsonLd(ILLINOIS_FAQS),
    ],
  };
}

function getTexasJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Texas Paycheck Calculator', item: `${SITE_URL}/texas-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Texas Paycheck Calculator 2026', url: `${SITE_URL}/texas-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Texas Paycheck Math Solver', description: 'Computes net take-home pay in Texas: Net = Gross - Federal Tax - FICA. Texas has 0% state income tax.', mathExpression: 'Net = G - Fed(G - StdDed) - FICA(G)' },
      { '@type': 'Dataset', name: '2026 Texas Tax & Cost of Living Data', variableMeasured: [
        { name: 'Texas State Income Tax Rate', value: '0%' },
        { name: 'Texas Average Effective Property Tax Rate', value: '1.71%' },
        { name: 'Texas Average Combined Sales Tax Rate', value: '8.2%' },
      ]},
      faqsToJsonLd(TEXAS_FAQS),
    ],
  };
}

function getFloridaJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Florida Paycheck Calculator', item: `${SITE_URL}/florida-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Florida Paycheck Calculator 2026', url: `${SITE_URL}/florida-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'Dataset', name: '2026 Florida Tax & Cost of Living Data', variableMeasured: [
        { name: 'Florida State Income Tax Rate', value: '0%' },
        { name: 'Florida Average Effective Property Tax Rate', value: '0.86%' },
        { name: 'Florida Average Combined Sales Tax Rate', value: '7.0%' },
      ]},
      faqsToJsonLd(FLORIDA_FAQS),
    ],
  };
}

function getCaliforniaJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'California Paycheck Calculator', item: `${SITE_URL}/california-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'California Paycheck Calculator 2026', url: `${SITE_URL}/california-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'California Paycheck Math Solver', description: 'Computes net take-home pay with CA progressive tax brackets 1%-13.3%.', mathExpression: 'Net = G - Fed(G - StdDed) - FICA(G) - CA_Progressive(G - StdDed_CA)' },
      { '@type': 'Dataset', name: '2026 California Tax Rates', variableMeasured: [
        { name: 'California Top Marginal Tax Rate', value: '13.3%' },
        { name: 'California Standard Deduction (Single)', value: '$6,083' },
        { name: 'California Average Combined Sales Tax', value: '8.82%' },
      ]},
      faqsToJsonLd(CALIFORNIA_FAQS),
    ],
  };
}

function getNewYorkJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'New York Paycheck Calculator', item: `${SITE_URL}/new-york-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'New York Paycheck Calculator 2026', url: `${SITE_URL}/new-york-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'New York Paycheck Math Solver', description: 'Computes net take-home pay with NY progressive tax brackets 4%-10.9% plus potential NYC tax.', mathExpression: 'Net = G - Fed(G - StdDed) - FICA(G) - NY_Progressive(G - StdDed_NY) - NYC_Tax' },
      { '@type': 'Dataset', name: '2026 New York Tax Rates', variableMeasured: [
        { name: 'New York Top Marginal Tax Rate', value: '10.9%' },
        { name: 'New York Standard Deduction (Single)', value: '$8,100' },
        { name: 'NYC Income Tax Rate Range', value: '3.078% - 3.876%' },
      ]},
      faqsToJsonLd(NEWYORK_FAQS),
    ],
  };
}

function getMortgageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator', item: `${SITE_URL}/mortgage-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Mortgage Calculator with Extra Payments', url: `${SITE_URL}/mortgage-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Mortgage Amortization Solver', description: 'Computes monthly payment using M = P × [r(1+r)^n] / [(1+r)^n - 1]', mathExpression: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]' },
      faqsToJsonLd(MORTGAGE_FAQS),
    ],
  };
}

function getRetirementJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: '401(k) Retirement Projection', item: `${SITE_URL}/401k-retirement-calculator` },
      ]},
      { '@type': 'WebApplication', name: '401(k) Retirement Projection Calculator 2026', url: `${SITE_URL}/401k-retirement-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: '401(k) Compound Growth Solver', description: 'Computes projected 401(k) balance using annual contributions + employer match with compound annual growth.', mathExpression: 'B(n) = Σ C_annual × (1 + r)^(n-i)' },
      faqsToJsonLd(RETIREMENT_FAQS),
    ],
  };
}

function getRelocationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Salary Relocation Calculator', item: `${SITE_URL}/relocation-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Salary Relocation Calculator 2026', url: `${SITE_URL}/relocation-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      faqsToJsonLd(RELOCATION_FAQS),
    ],
  };
}

function getCapitalGainsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Capital Gains Tax Calculator', item: `${SITE_URL}/capital-gains-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Capital Gains Tax Calculator 2026', url: `${SITE_URL}/capital-gains-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      faqsToJsonLd(CAPITAL_GAINS_FAQS),
    ],
  };
}

function getSelfEmploymentJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Self-Employment Tax Calculator', item: `${SITE_URL}/self-employment-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Self-Employment Tax Calculator 2026', url: `${SITE_URL}/self-employment-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      faqsToJsonLd(SELF_EMPLOYMENT_FAQS),
    ],
  };
}

function getTaxRefundJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Tax Refund Calculator', item: `${SITE_URL}/tax-refund-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Tax Refund Calculator 2026', url: `${SITE_URL}/tax-refund-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Tax Refund Math Solver', description: 'Computes estimated tax refund: Refund = Total Taxes Withheld - (Federal Tax Owed + State Tax Owed), where Federal Tax Owed uses progressive brackets with standard/itemized deductions and tax credits.', mathExpression: 'Refund = (Fed_Withheld + State_Withheld) - (Fed_Tax(Gross - Deduction) - Credits + State_Tax)' },
      { '@type': 'Dataset', name: '2026 Tax Refund Key Rates', variableMeasured: [
        { name: 'Standard Deduction (Single)', value: '$16,100' },
        { name: 'Standard Deduction (Married)', value: '$32,200' },
        { name: 'Child Tax Credit', value: '$2,000 per child' },
        { name: 'Refundable CTC Portion', value: 'Up to $1,700' },
        { name: 'EIC Maximum (3+ children)', value: '$7,430' },
      ]},
      faqsToJsonLd(TAX_REFUND_FAQS),
    ],
  };
}

function getSalesTaxJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Sales Tax Calculator', item: `${SITE_URL}/sales-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Sales Tax Calculator 2026', url: `${SITE_URL}/sales-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Sales Tax Math Solver', description: 'Computes sales tax amount and total price: Tax = Price × Rate, Total = Price + Tax. Reverse: Original = Total ÷ (1 + Rate).', mathExpression: 'Tax = P × R; Total = P × (1 + R); Reverse: P = Total ÷ (1 + R)' },
      { '@type': 'Dataset', name: '2026 US Sales Tax Rates', variableMeasured: [
        { name: 'Average US Combined Rate', value: '~6.6%' },
        { name: 'Highest Combined Rate', value: '9.56% (Louisiana/Tennessee)' },
        { name: 'No Sales Tax States', value: 'DE, MT, NH, OR' },
        { name: 'California Combined Rate', value: '8.82%' },
        { name: 'Texas Combined Rate', value: '8.20%' },
      ]},
      faqsToJsonLd(SALES_TAX_FAQS),
    ],
  };
}

function getOvertimeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Overtime Tax Calculator', item: `${SITE_URL}/overtime-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Overtime Tax Calculator 2026', url: `${SITE_URL}/overtime-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Overtime Tax Math Solver', description: 'Computes after-tax overtime pay: OT Pay = Hours × Rate × 1.5, After-Tax = OT Pay × (1 - Marginal Rate - FICA - State Rate).', mathExpression: 'After-Tax OT = H × R × 1.5 × (1 - Fed_Marginal - FICA - State)' },
      { '@type': 'Dataset', name: '2026 Overtime Tax Data', variableMeasured: [
        { name: 'Federal Overtime Rate', value: '1.5x (time and a half)' },
        { name: 'Federal Tax on OT', value: 'Taxed at marginal rate' },
        { name: 'FICA Rate', value: '7.65%' },
        { name: 'Effective OT Tax Rate', value: 'Typically 25%–35%' },
      ]},
      faqsToJsonLd(OVERTIME_FAQS),
    ],
  };
}

function getGeorgiaJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Georgia Tax Calculator', item: `${SITE_URL}/georgia-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Georgia Tax Calculator 2026', url: `${SITE_URL}/georgia-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Georgia Paycheck Math Solver', description: 'Computes net take-home pay: Net = Gross - Federal Tax - FICA - GA State Tax, where GA Tax = (Gross - StdDed) × 5.49%.', mathExpression: 'Net = G - Fed(G - StdDed) - FICA(G) - (G - StdDed_GA) × 0.0549' },
      { '@type': 'Dataset', name: '2026 Georgia Tax Rates', variableMeasured: [
        { name: 'Georgia Flat Tax Rate', value: '5.49%' },
        { name: 'Georgia Standard Deduction (Single)', value: '$5,400' },
        { name: 'Georgia Standard Deduction (Married)', value: '$7,100' },
        { name: 'Federal Standard Deduction (Single)', value: '$16,100' },
      ]},
      faqsToJsonLd(GEORGIA_FAQS),
    ],
  };
}

function getLotteryJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Lottery Tax Calculator', item: `${SITE_URL}/lottery-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Lottery Tax Calculator 2026', url: `${SITE_URL}/lottery-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Lottery Tax Math Solver', description: 'Computes after-tax lottery winnings: After-Tax = Winnings × (1 - Federal Rate - State Rate), where federal withholding is 24%.', mathExpression: 'After-Tax = W × (1 - 0.24 - StateRate)' },
      { '@type': 'Dataset', name: '2026 Lottery Tax Rates', variableMeasured: [
        { name: 'Federal Withholding Rate', value: '24%' },
        { name: 'Top Federal Marginal Rate', value: '37%' },
        { name: 'States with No Lottery Tax', value: 'CA, DE, FL, NH, PA, SD, TN, TX, WA, WY' },
        { name: 'Average State Lottery Tax', value: '~4%–8%' },
      ]},
      faqsToJsonLd(LOTTERY_TAX_FAQS),
    ],
  };
}

function getIrsWithholdingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'IRS Withholding Calculator', item: `${SITE_URL}/irs-withholding-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'IRS Withholding Calculator 2026', url: `${SITE_URL}/irs-withholding-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'IRS Withholding Math Solver', description: 'Computes optimal W-4 withholding: Withholding = (Annual Tax Owed - Credits) / Pay Periods, compared to current withholding.', mathExpression: 'Withholding_Period = (Tax_Owed - Credits) / N_Periods' },
      { '@type': 'Dataset', name: '2026 IRS Withholding Data', variableMeasured: [
        { name: 'Standard Deduction (Single)', value: '$16,100' },
        { name: 'Standard Deduction (Married)', value: '$32,200' },
        { name: 'Child Tax Credit', value: '$2,000 per child' },
        { name: 'Underpayment Penalty Threshold', value: '90% of tax owed or 100% of prior year' },
      ]},
      faqsToJsonLd(IRS_WITHHOLDING_FAQS),
    ],
  };
}

function getPropertyTaxJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Property Tax Calculator', item: `${SITE_URL}/property-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Property Tax Calculator 2026', url: `${SITE_URL}/property-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Property Tax Math Solver', description: 'Computes annual property tax: Tax = Assessed Value × Effective Rate. Some states apply assessment ratios.', mathExpression: 'Tax = Assessed_Value × Effective_Rate' },
      { '@type': 'Dataset', name: '2026 US Property Tax Rates', variableMeasured: [
        { name: 'US Average Effective Rate', value: '~1.1%' },
        { name: 'Highest Rate (NJ)', value: '~2.49%' },
        { name: 'Lowest Rate (HI)', value: '~0.29%' },
        { name: 'TX Average Rate', value: '~1.71%' },
        { name: 'FL Average Rate', value: '~0.86%' },
      ]},
      faqsToJsonLd(PROPERTY_TAX_FAQS),
    ],
  };
}

function getBonusTaxJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Bonus Tax Calculator', item: `${SITE_URL}/bonus-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Bonus Tax Calculator 2026', url: `${SITE_URL}/bonus-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Bonus Tax Math Solver', description: 'Computes after-tax bonus using flat 22% method or aggregate method: Flat = Bonus × (1 - 0.22 - FICA - State), Aggregate blends bonus with regular wages.', mathExpression: 'Flat: After-Tax = B × (1 - 0.22 - FICA - State); Aggregate: Tax = Progressive(Income + Bonus)' },
      { '@type': 'Dataset', name: '2026 Bonus Tax Rates', variableMeasured: [
        { name: 'Federal Flat Withholding Rate', value: '22%' },
        { name: 'FICA Rate', value: '7.65%' },
        { name: 'Bonus Under $1M Federal Rate', value: '22% flat' },
        { name: 'Bonus Over $1M Federal Rate', value: '37% flat' },
      ]},
      faqsToJsonLd(BONUS_TAX_FAQS),
    ],
  };
}

function getVirginiaJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Virginia Tax Calculator', item: `${SITE_URL}/virginia-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Virginia Tax Calculator 2026', url: `${SITE_URL}/virginia-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Virginia Paycheck Math Solver', description: 'Computes net take-home pay: Net = Gross - Federal Tax - FICA - VA State Tax, where VA Tax uses progressive brackets 2%-5.75%.', mathExpression: 'Net = G - Fed(G - StdDed) - FICA(G) - VA_Progressive(G - StdDed_VA)' },
      { '@type': 'Dataset', name: '2026 Virginia Tax Rates', variableMeasured: [
        { name: 'Virginia Top Marginal Rate', value: '5.75%' },
        { name: 'Virginia Standard Deduction (Single)', value: '$8,000' },
        { name: 'Virginia Standard Deduction (Married)', value: '$16,000' },
        { name: 'VA Tax Brackets', value: '2% – 5.75% (4 brackets)' },
      ]},
      faqsToJsonLd(VIRGINIA_FAQS),
    ],
  };
}

export function getJsonLdForType(type: string) {
  switch (type) {
    case 'illinois': return getIllinoisJsonLd();
    case 'texas': return getTexasJsonLd();
    case 'florida': return getFloridaJsonLd();
    case 'california': return getCaliforniaJsonLd();
    case 'newyork': return getNewYorkJsonLd();
    case 'mortgage': return getMortgageJsonLd();
    case 'retirement': return getRetirementJsonLd();
    case 'relocation': return getRelocationJsonLd();
    case 'capital-gains': return getCapitalGainsJsonLd();
    case 'self-employment': return getSelfEmploymentJsonLd();
    case 'tax-refund': return getTaxRefundJsonLd();
    case 'sales-tax': return getSalesTaxJsonLd();
    case 'overtime': return getOvertimeJsonLd();
    case 'georgia': return getGeorgiaJsonLd();
    case 'lottery': return getLotteryJsonLd();
    case 'irs-withholding': return getIrsWithholdingJsonLd();
    case 'property-tax': return getPropertyTaxJsonLd();
    case 'bonus-tax': return getBonusTaxJsonLd();
    case 'virginia': return getVirginiaJsonLd();
    default: return getHomeJsonLd();
  }
}
