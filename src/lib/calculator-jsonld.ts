// ─── Calculator JSON-LD Schema Generators for Server & Client Components ───────
// This file has NO 'use client' so it can be imported by both Server and Client components.

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
  SALES_TAX_FAQS,
  INCOME_TAX_FAQS,
  TAX_CALC_FAQS,
  TAX_REFUND_FAQS,
} from '@/lib/faq-data';
import { SITE_URL } from '@/lib/site-config';

// ─── JSON-LD FAQ Helper ──────────────────────────────────────────────────────

function faqsToJsonLd(faqs: { question: string; answer: string }[]) {
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

// ─── JSON-LD Schema Generators ──────────────────────────────────────────────

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
        { name: 'Federal Standard Deduction (Single)', value: '$15,000' },
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
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: "What's the difference between short-term and long-term capital gains?", acceptedAnswer: { '@type': 'Answer', text: 'Short-term gains (held ≤ 1 year) are taxed as ordinary income up to 37%. Long-term gains (held > 1 year) are taxed at preferential rates of 0%, 15%, or 20%.' } },
        { '@type': 'Question', name: 'What is the Net Investment Income Tax?', acceptedAnswer: { '@type': 'Answer', text: 'The NIIT is an additional 3.8% tax on investment income when MAGI exceeds $200,000 (single) or $250,000 (married).' } },
      ]},
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
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'What is the self-employment tax rate for 2026?', acceptedAnswer: { '@type': 'Answer', text: 'The self-employment tax rate is 15.3% on 92.35% of net business income: 12.4% for Social Security and 2.9% for Medicare.' } },
      ]},
      faqsToJsonLd(SELF_EMPLOYMENT_FAQS),
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
      { '@type': 'MathSolver', name: 'Sales Tax Math Solver', description: 'Computes sales tax amount and total price using Tax = Price × Rate, and reverse calculation using Original = Total ÷ (1 + Rate)', mathExpression: 'Tax = P × r; Total = P + Tax; Original = Total / (1 + r)' },
      { '@type': 'Dataset', name: '2026 US State Sales Tax Rates', variableMeasured: [
        { name: 'Highest Combined Rate', value: '9.56% (LA, TN)' },
        { name: 'No Sales Tax States', value: 'DE, MT, NH, OR (0%)' },
        { name: 'US Average Combined Rate', value: '~6.6%' },
      ]},
      faqsToJsonLd(SALES_TAX_FAQS),
    ],
  };
}

function getIncomeTaxJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Income Tax Calculator', item: `${SITE_URL}/income-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Income Tax Calculator 2026', url: `${SITE_URL}/income-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Federal Income Tax Solver', description: 'Computes federal income tax using progressive brackets (10%-37%) with standard deduction and filing status variants.', mathExpression: 'Tax = Σ(Bracket_i × Rate_i) where taxable_income = gross - std_deduction' },
      { '@type': 'Dataset', name: '2026 Federal Income Tax Data', variableMeasured: [
        { name: 'Federal Tax Brackets', value: '10% – 37%' },
        { name: 'Standard Deduction (Single)', value: '$15,000' },
        { name: 'Standard Deduction (Married)', value: '$30,000' },
        { name: 'Social Security Wage Cap', value: '$176,100' },
        { name: 'FICA Rate', value: '7.65%' },
      ]},
      faqsToJsonLd(INCOME_TAX_FAQS),
    ],
  };
}

function getTaxCalcJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Tax Calculator', item: `${SITE_URL}/tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Tax Calculator 2026', url: `${SITE_URL}/tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Total Tax Burden Solver', description: 'Computes total tax including federal income tax, FICA payroll tax, and state income tax for IL, TX, FL, CA, NY.', mathExpression: 'Total_Tax = Federal(gross - ded) + FICA(gross) + State(gross - state_ded)' },
      { '@type': 'Dataset', name: '2026 Tax Rate Data', variableMeasured: [
        { name: 'Federal Tax Brackets', value: '10% – 37%' },
        { name: 'FICA Rate', value: '7.65%' },
        { name: 'States Covered', value: 'IL, TX, FL, CA, NY' },
        { name: 'IL Flat Rate', value: '4.95%' },
        { name: 'CA Top Rate', value: '13.3%' },
      ]},
      faqsToJsonLd(TAX_CALC_FAQS),
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
        { name: 'Standard Deduction (Single)', value: '$15,000' },
        { name: 'Standard Deduction (Married)', value: '$30,000' },
        { name: 'Child Tax Credit', value: '$2,000 per child' },
        { name: 'Refundable CTC Portion', value: 'Up to $1,700' },
        { name: 'EIC Maximum (3+ children)', value: '$7,430' },
      ]},
      faqsToJsonLd(TAX_REFUND_FAQS),
    ],
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getCalculatorJsonLd(type: string): object {
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
    case 'sales-tax': return getSalesTaxJsonLd();
    case 'income-tax': return getIncomeTaxJsonLd();
    case 'tax-calc': return getTaxCalcJsonLd();
    case 'tax-refund': return getTaxRefundJsonLd();
    default: return getHomeJsonLd();
  }
}
