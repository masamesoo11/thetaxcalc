/**
 * @deprecated This file is dead code. The canonical JSON-LD source is `@/app/[calculator]/_jsonld.ts`.
 * This file contains bugs (wrong breadcrumb names, incorrect URL mappings, duplicate FAQPage entries)
 * and should not be used. Kept for reference only.
 */

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
  OVERTIME_FAQS,
  GEORGIA_FAQS,
  LOTTERY_TAX_FAQS,
  IRS_WITHHOLDING_FAQS,
  PROPERTY_TAX_FAQS,
  BONUS_TAX_FAQS,
  VIRGINIA_FAQS,
} from '@/lib/faq-data';
import { SITE_URL } from '@/lib/site-config';
import { getAuthorForCalculator, authorToJsonLd } from '@/lib/authors';

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
  const author = getAuthorForCalculator('home');
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
        author: authorToJsonLd(author),
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
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
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
      authorToJsonLd(author),
      faqsToJsonLd(HOME_FAQS),
    ],
  };
}

function getIllinoisJsonLd() {
  const author = getAuthorForCalculator('illinois');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Illinois Paycheck Calculator', item: `${SITE_URL}/illinois-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Illinois Paycheck Calculator 2026', url: `${SITE_URL}/illinois-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Illinois Tax Rates', description: 'Key Illinois tax rates and federal brackets for 2026 paycheck calculations.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Illinois Flat Tax Rate', value: '4.95', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Illinois Personal Exemption', value: '2775', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Federal Standard Deduction (Single)', value: '16100', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Social Security Wage Cap', value: '184500', unitText: 'USD' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(ILLINOIS_FAQS),
    ],
  };
}

function getTexasJsonLd() {
  const author = getAuthorForCalculator('texas');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Texas Paycheck Calculator', item: `${SITE_URL}/texas-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Texas Paycheck Calculator 2026', url: `${SITE_URL}/texas-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Texas Tax & Cost of Living Data', description: 'Texas tax rates and cost of living data for 2026, including property and sales tax information.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Texas State Income Tax Rate', value: '0', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Texas Average Effective Property Tax Rate', value: '1.71', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Texas Average Combined Sales Tax Rate', value: '8.2', unitText: 'percent' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(TEXAS_FAQS),
    ],
  };
}

function getFloridaJsonLd() {
  const author = getAuthorForCalculator('florida');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Florida Paycheck Calculator', item: `${SITE_URL}/florida-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Florida Paycheck Calculator 2026', url: `${SITE_URL}/florida-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Florida Tax & Cost of Living Data', description: 'Florida tax rates and cost of living data for 2026, including property and sales tax information.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Florida State Income Tax Rate', value: '0', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Florida Average Effective Property Tax Rate', value: '0.86', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Florida Average Combined Sales Tax Rate', value: '7.0', unitText: 'percent' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(FLORIDA_FAQS),
    ],
  };
}

function getCaliforniaJsonLd() {
  const author = getAuthorForCalculator('california');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'California Paycheck Calculator', item: `${SITE_URL}/california-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'California Paycheck Calculator 2026', url: `${SITE_URL}/california-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 California Tax Rates', description: 'Key California tax rates including progressive income tax brackets for 2026.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'California Top Marginal Tax Rate', value: '13.3', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'California Standard Deduction (Single)', value: '6083', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'California Average Combined Sales Tax', value: '8.82', unitText: 'percent' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(CALIFORNIA_FAQS),
    ],
  };
}

function getNewYorkJsonLd() {
  const author = getAuthorForCalculator('newyork');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'New York Paycheck Calculator', item: `${SITE_URL}/new-york-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'New York Paycheck Calculator 2026', url: `${SITE_URL}/new-york-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 New York Tax Rates', description: 'Key New York tax rates including progressive income tax brackets and NYC tax for 2026.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'New York Top Marginal Tax Rate', value: '10.9', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'New York Standard Deduction (Single)', value: '8100', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'NYC Income Tax Rate Low', value: '3.078', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'NYC Income Tax Rate High', value: '3.876', unitText: 'percent' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(NEWYORK_FAQS),
    ],
  };
}

function getMortgageJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator', item: `${SITE_URL}/mortgage-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Mortgage Calculator with Extra Payments', url: `${SITE_URL}/mortgage-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      authorToJsonLd(author),
      faqsToJsonLd(MORTGAGE_FAQS),
    ],
  };
}

function getRetirementJsonLd() {
  const author = getAuthorForCalculator('retirement');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: '401(k) Retirement Projection', item: `${SITE_URL}/401k-retirement-calculator` },
      ]},
      { '@type': 'WebApplication', name: '401(k) Retirement Projection Calculator 2026', url: `${SITE_URL}/401k-retirement-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      authorToJsonLd(author),
      faqsToJsonLd(RETIREMENT_FAQS),
    ],
  };
}

function getRelocationJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Salary Relocation Calculator', item: `${SITE_URL}/relocation-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Salary Relocation Calculator 2026', url: `${SITE_URL}/relocation-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      authorToJsonLd(author),
      faqsToJsonLd(RELOCATION_FAQS),
    ],
  };
}

function getCapitalGainsJsonLd() {
  const author = getAuthorForCalculator('capital-gains');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Capital Gains Tax Calculator', item: `${SITE_URL}/capital-gains-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Capital Gains Tax Calculator 2026', url: `${SITE_URL}/capital-gains-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      authorToJsonLd(author),
      faqsToJsonLd(CAPITAL_GAINS_FAQS),
    ],
  };
}

function getSelfEmploymentJsonLd() {
  const author = getAuthorForCalculator('self-employment');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Self-Employment Tax Calculator', item: `${SITE_URL}/self-employment-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Self-Employment Tax Calculator 2026', url: `${SITE_URL}/self-employment-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      authorToJsonLd(author),
      faqsToJsonLd(SELF_EMPLOYMENT_FAQS),
    ],
  };
}

function getSalesTaxJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Sales Tax Calculator', item: `${SITE_URL}/sales-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Sales Tax Calculator 2026', url: `${SITE_URL}/sales-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 US State Sales Tax Rates', description: 'Combined state and local sales tax rates for all 50 US states for 2026.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Highest Combined Rate', value: '9.56', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'No Sales Tax States', value: '5' },
        { '@type': 'PropertyValue', name: 'US Average Combined Rate', value: '6.6', unitText: 'percent' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(SALES_TAX_FAQS),
    ],
  };
}

function getIncomeTaxJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Income Tax Calculator', item: `${SITE_URL}/income-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Income Tax Calculator 2026', url: `${SITE_URL}/income-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Federal Income Tax Data', description: 'Federal income tax brackets, standard deductions, and FICA rates for 2026.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Federal Tax Brackets', value: '10 - 37', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Standard Deduction (Single)', value: '16100', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Standard Deduction (Married)', value: '32200', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Social Security Wage Cap', value: '184500', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'FICA Rate', value: '7.65', unitText: 'percent' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(INCOME_TAX_FAQS),
    ],
  };
}

function getTaxCalcJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Tax Calculator', item: `${SITE_URL}/tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Tax Calculator 2026', url: `${SITE_URL}/tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Tax Rate Data', description: 'Federal and state tax rate data for 2026 paycheck calculations.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Federal Tax Brackets', value: '10 - 37', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'FICA Rate', value: '7.65', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'States Covered', value: '5' },
        { '@type': 'PropertyValue', name: 'IL Flat Rate', value: '4.95', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'CA Top Rate', value: '13.3', unitText: 'percent' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(TAX_CALC_FAQS),
    ],
  };
}

function getTaxRefundJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Tax Refund Calculator', item: `${SITE_URL}/tax-refund-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Tax Refund Calculator 2026', url: `${SITE_URL}/tax-refund-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Tax Refund Key Rates', description: 'Key tax refund rates, deductions, and credit amounts for 2026 tax filing.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Standard Deduction (Single)', value: '16100', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Standard Deduction (Married)', value: '32200', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Child Tax Credit', value: '2000', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Refundable CTC Portion', value: '1700', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'EIC Maximum (3+ children)', value: '7430', unitText: 'USD' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(TAX_REFUND_FAQS),
    ],
  };
}

function getOvertimeJsonLd() {
  const author = getAuthorForCalculator('overtime');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Overtime Tax Calculator', item: `${SITE_URL}/overtime-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Overtime Tax Calculator 2026', url: `${SITE_URL}/overtime-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Overtime Tax Data', description: 'Federal overtime tax exemption data and FICA rates for 2026 under the One Big Beautiful Bill Act.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'OT FICA Rate', value: '7.65', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'OT Multiplier', value: '1.5' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(OVERTIME_FAQS),
    ],
  };
}

function getGeorgiaJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Georgia Paycheck Calculator', item: `${SITE_URL}/georgia-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Georgia Paycheck Calculator 2026', url: `${SITE_URL}/georgia-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Georgia Tax Rates', description: 'Key Georgia tax rates and federal brackets for 2026 paycheck calculations.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Georgia Flat Tax Rate', value: '5.49', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Georgia Standard Deduction (Single)', value: '5400', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Federal Standard Deduction (Single)', value: '16100', unitText: 'USD' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(GEORGIA_FAQS),
    ],
  };
}

function getLotteryJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Lottery Tax Calculator', item: `${SITE_URL}/lottery-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Lottery Tax Calculator 2026', url: `${SITE_URL}/lottery-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Lottery Tax Rates', description: 'Federal and state tax withholding rates for lottery winnings in 2026.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Federal Withholding Rate', value: '24', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Top Marginal Federal Rate', value: '37', unitText: 'percent' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(LOTTERY_TAX_FAQS),
    ],
  };
}

function getIrsWithholdingJsonLd() {
  const author = getAuthorForCalculator('irs-withholding');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'IRS Withholding Calculator', item: `${SITE_URL}/irs-withholding-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'IRS Withholding Calculator 2026', url: `${SITE_URL}/irs-withholding-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 IRS Withholding Data', description: 'Federal withholding rates and W-4 optimization data for 2026 based on IRS Publication 15-T.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Standard Deduction (Single)', value: '16100', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Standard Deduction (Married)', value: '32200', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Child Tax Credit', value: '2000', unitText: 'USD' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(IRS_WITHHOLDING_FAQS),
    ],
  };
}

function getPropertyTaxJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Property Tax Calculator', item: `${SITE_URL}/property-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Property Tax Calculator 2026', url: `${SITE_URL}/property-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 US Property Tax Rates', description: 'Average effective property tax rates for all 50 US states for 2026.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Highest Rate', value: '2.23', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Lowest Rate', value: '0.27', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'US Average', value: '1.1', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'States Covered', value: '50' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(PROPERTY_TAX_FAQS),
    ],
  };
}

function getBonusTaxJsonLd() {
  const author = getAuthorForCalculator('bonus-tax');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Bonus Tax Calculator', item: `${SITE_URL}/bonus-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Bonus Tax Calculator 2026', url: `${SITE_URL}/bonus-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Bonus Tax Rates', description: 'Supplemental wage tax rates for 2026 including flat rate and aggregate methods.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Flat Supplemental Rate', value: '22', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Flat Rate Threshold', value: '1000000', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Rate Above Threshold', value: '37', unitText: 'percent' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(BONUS_TAX_FAQS),
    ],
  };
}

function getVirginiaJsonLd() {
  const author = getAuthorForCalculator('home');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Virginia Paycheck Calculator', item: `${SITE_URL}/virginia-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Virginia Paycheck Calculator 2026', url: `${SITE_URL}/virginia-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: authorToJsonLd(author) },
      { '@type': 'Dataset', name: '2026 Virginia Tax Rates', description: 'Key Virginia tax rates including progressive income tax brackets for 2026.', creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL }, license: 'https://creativecommons.org/licenses/by/4.0/', variableMeasured: [
        { '@type': 'PropertyValue', name: 'Virginia Tax Brackets Low', value: '2', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Virginia Tax Brackets High', value: '5.75', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Virginia Standard Deduction (Single)', value: '8000', unitText: 'USD' },
        { '@type': 'PropertyValue', name: 'Federal Standard Deduction (Single)', value: '16100', unitText: 'USD' },
      ]},
      authorToJsonLd(author),
      faqsToJsonLd(VIRGINIA_FAQS),
    ],
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getCalculatorJsonLd(type: string): object {
  switch (type) {
    case 'home': return getHomeJsonLd();
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
