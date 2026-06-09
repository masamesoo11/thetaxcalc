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
  INCOME_TAX_FAQS,
  TAX_CALC_FAQS,
} from '@/lib/faq-data';
import { SITE_URL } from '@/lib/site-config';
import { getAuthorForCalculator, authorToJsonLd } from '@/lib/authors';

// ─── JSON-LD FAQ Helper ─────────────────────────────────────────────────────────

export function faqsToJsonLd(faqs: { question: string; answer: string }[], id?: string) {
  return {
    ...(id ? { '@id': id } : {}),
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

// ─── Shared Schema Fragments ─────────────────────────────────────────────────

/** BreadcrumbList for calculator pages — with @id for proper graph linking
 *  Google: "Don't include the item property for the last item (current page)" */
function breadcrumbJsonLd(id: string, position2Name: string, _position2Url: string) {
  return {
    '@id': id,
    '@type': 'BreadcrumbList' as const,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: position2Name },
    ],
  };
}

/**
 * WebApplication for calculator pages.
 * Uses @id reference for author and publisher to avoid duplication.
 */
function webAppJsonLd(id: string, name: string, urlPath: string, authorId: string) {
  return {
    '@id': id,
    '@type': 'WebApplication' as const,
    name,
    url: `${SITE_URL}${urlPath}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
    },
    author: { '@id': authorId },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/**
 * WebPage for calculator pages.
 * Uses @id reference for author to avoid duplication.
 */
function webPageJsonLd(id: string, name: string, urlPath: string, description: string, authorId: string) {
  return {
    '@id': id,
    '@type': 'WebPage' as const,
    url: `${SITE_URL}${urlPath}`,
    name,
    description,
    inLanguage: 'en-US',
    dateModified: '2026-01-15',
    author: { '@id': authorId },
    reviewedBy: { '@id': authorId },
  };
}

/**
 * Dataset for tax rate data.
 * Uses @id reference to Organization from layout.tsx.
 * License points to Creative Commons (valid for Google Dataset Search).
 * PropertyValue.value uses QuantitativeValue for numeric data.
 */
function datasetJsonLd(id: string, name: string, description: string, variables: { name: string; value: string; unitText?: string }[]) {
  return {
    '@id': id,
    '@type': 'Dataset' as const,
    name,
    description,
    creator: { '@id': `${SITE_URL}/#organization` },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    variableMeasured: variables.map((v) => {
      const prop: Record<string, unknown> = {
        '@type': 'PropertyValue',
        name: v.name,
      };
      // If value looks like a plain number, emit it as Number (not String)
      const numVal = Number(v.value);
      if (!isNaN(numVal) && v.value.trim() !== '') {
        prop.value = numVal;
      } else {
        prop.value = v.value;
      }
      if (v.unitText) prop.unitText = v.unitText;
      return prop;
    }),
  };
}

// ─── JSON-LD Schema Generators ───────────────────────────────────────────────

function getHomeJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/paycheck-calculator#author`;
  const baseId = `${SITE_URL}/paycheck-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${baseId}#webpage`,
        '@type': 'WebPage',
        name: 'Paycheck Calculator — Federal, FICA & State Tax Take-Home Pay',
        description:
          'Free 2026 paycheck calculator. Instantly compute your take-home pay after federal tax, FICA (Social Security + Medicare), and state income tax deductions.',
        url: baseId,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
        author: { '@id': authorId },
        publisher: { '@id': `${SITE_URL}/#organization` },
        breadcrumb: { '@id': `${baseId}#breadcrumb` },
      },
      {
        '@id': `${baseId}#breadcrumb`,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Paycheck Calculator' },
        ],
      },
      {
        '@id': `${baseId}#software`,
        '@type': 'SoftwareApplication',
        name: 'TheTaxCalc Paycheck Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@id': `${baseId}#howto`,
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
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(HOME_FAQS, `${baseId}#faq`),
    ],
  };
}

function getIllinoisJsonLd() {
  const author = getAuthorForCalculator('illinois');
  const authorId = `${SITE_URL}/illinois-tax-calculator#author`;
  const baseId = `${SITE_URL}/illinois-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Illinois Paycheck Calculator 2026', '/illinois-tax-calculator', 'Free Illinois paycheck calculator with 4.95% flat state income tax for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Illinois Paycheck Calculator', '/illinois-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Illinois Paycheck Calculator 2026', '/illinois-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Illinois Tax Rates', 'Key Illinois tax rates and federal brackets for 2026 paycheck calculations.', [
        { name: 'Illinois Flat Tax Rate', value: '4.95', unitText: 'percent' },
        { name: 'Illinois Personal Exemption', value: '2775', unitText: 'USD' },
        { name: 'Federal Standard Deduction (Single)', value: '16100', unitText: 'USD' },
        { name: 'Social Security Wage Cap', value: '184500', unitText: 'USD' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(ILLINOIS_FAQS, `${baseId}#faq`),
    ],
  };
}

function getTexasJsonLd() {
  const author = getAuthorForCalculator('texas');
  const authorId = `${SITE_URL}/texas-tax-calculator#author`;
  const baseId = `${SITE_URL}/texas-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Texas Paycheck Calculator 2026', '/texas-tax-calculator', 'Free Texas paycheck calculator — no state income tax, only federal and FICA deductions for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Texas Paycheck Calculator', '/texas-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Texas Paycheck Calculator 2026', '/texas-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Texas Tax & Cost of Living Data', 'Texas tax rates and cost of living data for 2026, including property and sales tax information.', [
        { name: 'Texas State Income Tax Rate', value: '0', unitText: 'percent' },
        { name: 'Texas Average Effective Property Tax Rate', value: '1.71', unitText: 'percent' },
        { name: 'Texas Average Combined Sales Tax Rate', value: '8.2', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(TEXAS_FAQS, `${baseId}#faq`),
    ],
  };
}

function getFloridaJsonLd() {
  const author = getAuthorForCalculator('florida');
  const authorId = `${SITE_URL}/florida-tax-calculator#author`;
  const baseId = `${SITE_URL}/florida-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Florida Paycheck Calculator 2026', '/florida-tax-calculator', 'Free Florida paycheck calculator — no state income tax, only federal and FICA deductions for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Florida Paycheck Calculator', '/florida-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Florida Paycheck Calculator 2026', '/florida-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Florida Tax & Cost of Living Data', 'Florida tax rates and cost of living data for 2026, including property and sales tax information.', [
        { name: 'Florida State Income Tax Rate', value: '0', unitText: 'percent' },
        { name: 'Florida Average Effective Property Tax Rate', value: '0.86', unitText: 'percent' },
        { name: 'Florida Average Combined Sales Tax Rate', value: '7.0', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(FLORIDA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getCaliforniaJsonLd() {
  const author = getAuthorForCalculator('california');
  const authorId = `${SITE_URL}/california-tax-calculator#author`;
  const baseId = `${SITE_URL}/california-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'California Paycheck Calculator 2026', '/california-tax-calculator', 'Free California paycheck calculator with progressive state income tax (1%–13.3%) for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'California Paycheck Calculator', '/california-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'California Paycheck Calculator 2026', '/california-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 California Tax Rates', 'Key California tax rates including progressive income tax brackets for 2026.', [
        { name: 'California Top Marginal Tax Rate', value: '13.3', unitText: 'percent' },
        { name: 'California Standard Deduction (Single)', value: '6083', unitText: 'USD' },
        { name: 'California Average Combined Sales Tax', value: '8.82', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(CALIFORNIA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getNewYorkJsonLd() {
  const author = getAuthorForCalculator('newyork');
  const authorId = `${SITE_URL}/new-york-tax-calculator#author`;
  const baseId = `${SITE_URL}/new-york-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'New York Paycheck Calculator 2026', '/new-york-tax-calculator', 'Free New York paycheck calculator with progressive state tax (4%–10.9%) and NYC city tax for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'New York Paycheck Calculator', '/new-york-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'New York Paycheck Calculator 2026', '/new-york-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 New York Tax Rates', 'Key New York tax rates including progressive income tax brackets and NYC tax for 2026.', [
        { name: 'New York Top Marginal Tax Rate', value: '10.9', unitText: 'percent' },
        { name: 'New York Standard Deduction (Single)', value: '8100', unitText: 'USD' },
        { name: 'NYC Income Tax Rate (low)', value: '3.078', unitText: 'percent' },
        { name: 'NYC Income Tax Rate (high)', value: '3.876', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(NEWYORK_FAQS, `${baseId}#faq`),
    ],
  };
}

function getMortgageJsonLd() {
  const author = getAuthorForCalculator('mortgage');
  const authorId = `${SITE_URL}/mortgage-calculator#author`;
  const baseId = `${SITE_URL}/mortgage-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Mortgage Calculator with Extra Payments', '/mortgage-calculator', 'Free mortgage calculator with extra payments, amortization schedule, and payoff date for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Mortgage Calculator', '/mortgage-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Mortgage Calculator with Extra Payments', '/mortgage-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(MORTGAGE_FAQS, `${baseId}#faq`),
    ],
  };
}

function getRetirementJsonLd() {
  const author = getAuthorForCalculator('retirement');
  const authorId = `${SITE_URL}/401k-retirement-calculator#author`;
  const baseId = `${SITE_URL}/401k-retirement-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, '401(k) Retirement Projection Calculator 2026', '/401k-retirement-calculator', 'Free 401(k) retirement projection calculator with employer match, contribution limits, and growth estimates for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, '401(k) Retirement Projection', '/401k-retirement-calculator'),
      webAppJsonLd(`${baseId}#webapp`, '401(k) Retirement Projection Calculator 2026', '/401k-retirement-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(RETIREMENT_FAQS, `${baseId}#faq`),
    ],
  };
}

function getRelocationJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/relocation-calculator#author`;
  const baseId = `${SITE_URL}/relocation-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Salary Relocation Calculator 2026', '/relocation-calculator', 'Free salary relocation calculator — compare take-home pay across states for your 2026 move.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Salary Relocation Calculator', '/relocation-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Salary Relocation Calculator 2026', '/relocation-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(RELOCATION_FAQS, `${baseId}#faq`),
    ],
  };
}

function getCapitalGainsJsonLd() {
  const author = getAuthorForCalculator('capital-gains');
  const authorId = `${SITE_URL}/capital-gains-calculator#author`;
  const baseId = `${SITE_URL}/capital-gains-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Capital Gains Tax Calculator 2026', '/capital-gains-calculator', 'Free capital gains tax calculator with short-term and long-term rates for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Capital Gains Tax Calculator', '/capital-gains-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Capital Gains Tax Calculator 2026', '/capital-gains-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(CAPITAL_GAINS_FAQS, `${baseId}#faq`),
    ],
  };
}

function getSelfEmploymentJsonLd() {
  const author = getAuthorForCalculator('self-employment');
  const authorId = `${SITE_URL}/self-employment-tax-calculator#author`;
  const baseId = `${SITE_URL}/self-employment-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Self-Employment Tax Calculator 2026', '/self-employment-tax-calculator', 'Free self-employment tax calculator with 15.3% SE tax, quarterly estimates, and deductions for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Self-Employment Tax Calculator', '/self-employment-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Self-Employment Tax Calculator 2026', '/self-employment-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(SELF_EMPLOYMENT_FAQS, `${baseId}#faq`),
    ],
  };
}

function getTaxRefundJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/tax-refund-calculator#author`;
  const baseId = `${SITE_URL}/tax-refund-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Tax Refund Calculator 2026', '/tax-refund-calculator', 'Free tax refund calculator — estimate your 2026 refund based on withholdings, deductions, and credits.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Tax Refund Calculator', '/tax-refund-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Tax Refund Calculator 2026', '/tax-refund-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Tax Refund Key Rates', 'Key tax refund rates, deductions, and credit amounts for 2026 tax filing.', [
        { name: 'Standard Deduction (Single)', value: '16100', unitText: 'USD' },
        { name: 'Standard Deduction (Married)', value: '32200', unitText: 'USD' },
        { name: 'Child Tax Credit', value: '2000', unitText: 'USD' },
        { name: 'Refundable CTC Portion', value: '1700', unitText: 'USD' },
        { name: 'EIC Maximum (3+ children)', value: '7430', unitText: 'USD' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(TAX_REFUND_FAQS, `${baseId}#faq`),
    ],
  };
}

function getSalesTaxJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/sales-tax-calculator#author`;
  const baseId = `${SITE_URL}/sales-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Sales Tax Calculator 2026', '/sales-tax-calculator', 'Free sales tax calculator with combined state and local rates for all 50 US states for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Sales Tax Calculator', '/sales-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Sales Tax Calculator 2026', '/sales-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 US Sales Tax Rates', 'Combined state and local sales tax rates for all 50 US states for 2026.', [
        { name: 'Average US Combined Rate', value: '6.6', unitText: 'percent' },
        { name: 'Highest Combined Rate', value: '9.56', unitText: 'percent' },
        { name: 'No Sales Tax States Count', value: '5', unitText: 'states' },
        { name: 'California Combined Rate', value: '8.82', unitText: 'percent' },
        { name: 'Texas Combined Rate', value: '8.20', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(SALES_TAX_FAQS, `${baseId}#faq`),
    ],
  };
}

function getOvertimeJsonLd() {
  const author = getAuthorForCalculator('overtime');
  const authorId = `${SITE_URL}/overtime-tax-calculator#author`;
  const baseId = `${SITE_URL}/overtime-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Overtime Tax Calculator 2026', '/overtime-tax-calculator', 'Free overtime tax calculator with federal OT exemption under the One Big Beautiful Bill Act for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Overtime Tax Calculator', '/overtime-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Overtime Tax Calculator 2026', '/overtime-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Overtime Tax Data', 'Federal overtime tax data and FICA rates for 2026 under the One Big Beautiful Bill Act.', [
        { name: 'Federal Overtime Multiplier', value: '1.5', unitText: 'x' },
        { name: 'FICA Rate', value: '7.65', unitText: 'percent' },
        { name: 'Effective OT Tax Rate (low)', value: '25', unitText: 'percent' },
        { name: 'Effective OT Tax Rate (high)', value: '35', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(OVERTIME_FAQS, `${baseId}#faq`),
    ],
  };
}

function getGeorgiaJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/georgia-tax-calculator#author`;
  const baseId = `${SITE_URL}/georgia-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Georgia Tax Calculator 2026', '/georgia-tax-calculator', 'Free Georgia paycheck calculator with 5.49% flat state income tax for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Georgia Tax Calculator', '/georgia-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Georgia Tax Calculator 2026', '/georgia-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Georgia Tax Rates', 'Key Georgia tax rates and federal brackets for 2026 paycheck calculations.', [
        { name: 'Georgia Flat Tax Rate', value: '5.49', unitText: 'percent' },
        { name: 'Georgia Standard Deduction (Single)', value: '5400', unitText: 'USD' },
        { name: 'Georgia Standard Deduction (Married)', value: '7100', unitText: 'USD' },
        { name: 'Federal Standard Deduction (Single)', value: '16100', unitText: 'USD' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(GEORGIA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getLotteryJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/lottery-tax-calculator#author`;
  const baseId = `${SITE_URL}/lottery-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Lottery Tax Calculator 2026', '/lottery-tax-calculator', 'Free lottery tax calculator — federal and state withholding rates on lottery winnings for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Lottery Tax Calculator', '/lottery-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Lottery Tax Calculator 2026', '/lottery-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Lottery Tax Rates', 'Federal and state tax withholding rates for lottery winnings in 2026.', [
        { name: 'Federal Withholding Rate', value: '24', unitText: 'percent' },
        { name: 'Top Federal Marginal Rate', value: '37', unitText: 'percent' },
        { name: 'States with No Lottery Tax', value: '10', unitText: 'states' },
        { name: 'Average State Lottery Tax (low)', value: '4', unitText: 'percent' },
        { name: 'Average State Lottery Tax (high)', value: '8', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(LOTTERY_TAX_FAQS, `${baseId}#faq`),
    ],
  };
}

function getIrsWithholdingJsonLd() {
  const author = getAuthorForCalculator('irs-withholding');
  const authorId = `${SITE_URL}/irs-withholding-calculator#author`;
  const baseId = `${SITE_URL}/irs-withholding-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'IRS Withholding Calculator 2026', '/irs-withholding-calculator', 'Free IRS withholding calculator — optimize your W-4 allowances and avoid underpayment penalties for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'IRS Withholding Calculator', '/irs-withholding-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'IRS Withholding Calculator 2026', '/irs-withholding-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 IRS Withholding Data', 'Federal withholding rates and W-4 optimization data for 2026 based on IRS Publication 15-T.', [
        { name: 'Standard Deduction (Single)', value: '16100', unitText: 'USD' },
        { name: 'Standard Deduction (Married)', value: '32200', unitText: 'USD' },
        { name: 'Child Tax Credit', value: '2000', unitText: 'USD' },
        { name: 'Underpayment Penalty Threshold', value: '90', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(IRS_WITHHOLDING_FAQS, `${baseId}#faq`),
    ],
  };
}

function getPropertyTaxJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/property-tax-calculator#author`;
  const baseId = `${SITE_URL}/property-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Property Tax Calculator 2026', '/property-tax-calculator', 'Free property tax calculator with average effective rates for all 50 US states for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Property Tax Calculator', '/property-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Property Tax Calculator 2026', '/property-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 US Property Tax Rates', 'Average effective property tax rates for all 50 US states for 2026.', [
        { name: 'US Average Effective Rate', value: '1.1', unitText: 'percent' },
        { name: 'Highest Rate (NJ)', value: '2.49', unitText: 'percent' },
        { name: 'Lowest Rate (HI)', value: '0.29', unitText: 'percent' },
        { name: 'TX Average Rate', value: '1.71', unitText: 'percent' },
        { name: 'FL Average Rate', value: '0.86', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(PROPERTY_TAX_FAQS, `${baseId}#faq`),
    ],
  };
}

function getBonusTaxJsonLd() {
  const author = getAuthorForCalculator('bonus-tax');
  const authorId = `${SITE_URL}/bonus-tax-calculator#author`;
  const baseId = `${SITE_URL}/bonus-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Bonus Tax Calculator 2026', '/bonus-tax-calculator', 'Free bonus tax calculator with supplemental withholding rates (22% flat and aggregate method) for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Bonus Tax Calculator', '/bonus-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Bonus Tax Calculator 2026', '/bonus-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Bonus Tax Rates', 'Supplemental wage tax rates for 2026 including flat rate and aggregate methods.', [
        { name: 'Federal Flat Withholding Rate', value: '22', unitText: 'percent' },
        { name: 'FICA Rate', value: '7.65', unitText: 'percent' },
        { name: 'Supplemental Rate Threshold', value: '1000000', unitText: 'USD' },
        { name: 'Rate Above Threshold', value: '37', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(BONUS_TAX_FAQS, `${baseId}#faq`),
    ],
  };
}

function getVirginiaJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/virginia-tax-calculator#author`;
  const baseId = `${SITE_URL}/virginia-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Virginia Paycheck Calculator 2026', '/virginia-tax-calculator', 'Free Virginia paycheck calculator with progressive state income tax (2%–5.75%) for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Virginia Tax Calculator', '/virginia-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Virginia Paycheck Calculator 2026', '/virginia-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Virginia Tax Rates', 'Key Virginia tax rates including progressive income tax brackets for 2026.', [
        { name: 'Virginia Top Marginal Rate', value: '5.75', unitText: 'percent' },
        { name: 'Virginia Lowest Rate', value: '2', unitText: 'percent' },
        { name: 'Virginia Standard Deduction (Single)', value: '8000', unitText: 'USD' },
        { name: 'Virginia Standard Deduction (Married)', value: '16000', unitText: 'USD' },
        { name: 'Virginia Tax Brackets Count', value: '4', unitText: 'brackets' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(VIRGINIA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getIncomeTaxJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/income-tax-calculator#author`;
  const baseId = `${SITE_URL}/income-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Income Tax Calculator 2026', '/income-tax-calculator', 'Free federal income tax calculator with progressive brackets (10%–37%), standard deductions, and FICA for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Income Tax Calculator', '/income-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Income Tax Calculator 2026', '/income-tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Federal Income Tax Data', 'Federal income tax brackets, standard deductions, and FICA rates for 2026.', [
        { name: 'Federal Tax Brackets', value: '10', unitText: 'percent' },
        { name: 'Federal Top Marginal Rate', value: '37', unitText: 'percent' },
        { name: 'Standard Deduction (Single)', value: '16100', unitText: 'USD' },
        { name: 'Standard Deduction (Married)', value: '32200', unitText: 'USD' },
        { name: 'Social Security Wage Cap', value: '184500', unitText: 'USD' },
        { name: 'FICA Rate', value: '7.65', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(INCOME_TAX_FAQS, `${baseId}#faq`),
    ],
  };
}

function getTaxCalcJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/tax-calculator#author`;
  const baseId = `${SITE_URL}/tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Tax Calculator 2026', '/tax-calculator', 'Free tax calculator — estimate your total federal and state tax burden with brackets, FICA, and deductions for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Tax Calculator', '/tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Tax Calculator 2026', '/tax-calculator', authorId),
      datasetJsonLd(`${baseId}#dataset`, '2026 Tax Rate Data', 'Federal and state tax rate data for 2026 paycheck calculations.', [
        { name: 'Federal Tax Brackets', value: '10', unitText: 'percent' },
        { name: 'Federal Top Marginal Rate', value: '37', unitText: 'percent' },
        { name: 'FICA Rate', value: '7.65', unitText: 'percent' },
        { name: 'IL Flat Rate', value: '4.95', unitText: 'percent' },
        { name: 'CA Top Rate', value: '13.3', unitText: 'percent' },
      ]),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(TAX_CALC_FAQS, `${baseId}#faq`),
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
    case 'income-tax': return getIncomeTaxJsonLd();
    case 'tax-calc': return getTaxCalcJsonLd();
    default: return getHomeJsonLd();
  }
}
