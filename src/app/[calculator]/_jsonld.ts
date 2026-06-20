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
  NORTHCAROLINA_FAQS,
  PENNSYLVANIA_FAQS,
  OHIO_FAQS,
  MICHIGAN_FAQS,
  NEWJERSEY_FAQS,
  COLORADO_FAQS,
  ARIZONA_FAQS,
  WASHINGTON_FAQS,
  MASSACHUSETTS_FAQS,
  INDIANA_FAQS,
  TENNESSEE_FAQS,
  MISSOURI_FAQS,
  MARYLAND_FAQS,
  WISCONSIN_FAQS,
  MINNESOTA_FAQS,
  OREGON_FAQS,
  INCOME_TAX_FAQS,
  TAX_CALC_FAQS,
  EMPLOYEE_COST_FAQS,
} from '@/lib/faq-data';
import { SITE_URL } from '@/lib/site-config';
import { getAuthorForCalculator, authorToJsonLd } from '@/lib/authors';
import { buildAggregateRating } from '@/lib/ratings';

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
 * SoftwareApplication for calculator pages.
 * Uses @id reference for author and publisher to avoid duplication.
 * Google only supports SoftwareApplication (not WebApplication) for rich results.
 * Includes AggregateRating for star ratings in search results.
 */
function webAppJsonLd(id: string, name: string, urlPath: string, authorId: string) {
  // Extract calculator slug from URL path for rating lookup
  const slug = urlPath.replace(/^\//, '').replace(/-tax-calculator$/, '-tax-calculator');
  return {
    '@id': id,
    '@type': 'SoftwareApplication' as const,
    name,
    url: `${SITE_URL}${urlPath}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${urlPath}`,
    },
    aggregateRating: buildAggregateRating(slug),
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
  };
}

// Dataset type removed — Google flags "Invalid value in field itemtype" for Dataset on
// calculator pages because they don't meet Google Dataset Search requirements.
// Key tax rate data is already displayed in the page content for SEO.

// ─── JSON-LD Schema Generators ───────────────────────────────────────────────

function getHomeJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/#author`;
  const baseId = `${SITE_URL}`;
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
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/paycheck-calculator` },
        aggregateRating: buildAggregateRating('paycheck-calculator'),
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
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(VIRGINIA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getNorthCarolinaJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/north-carolina-tax-calculator#author`;
  const baseId = `${SITE_URL}/north-carolina-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'North Carolina Tax Calculator 2026', '/north-carolina-tax-calculator', 'Free North Carolina paycheck calculator with 4.5% flat state income tax for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'North Carolina Tax Calculator', '/north-carolina-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'North Carolina Tax Calculator 2026', '/north-carolina-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(NORTHCAROLINA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getPennsylvaniaJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/pennsylvania-tax-calculator#author`;
  const baseId = `${SITE_URL}/pennsylvania-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Pennsylvania Tax Calculator 2026', '/pennsylvania-tax-calculator', 'Free Pennsylvania paycheck calculator with 3.07% flat state income tax for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Pennsylvania Tax Calculator', '/pennsylvania-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Pennsylvania Tax Calculator 2026', '/pennsylvania-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(PENNSYLVANIA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getOhioJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/ohio-tax-calculator#author`;
  const baseId = `${SITE_URL}/ohio-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Ohio Tax Calculator 2026', '/ohio-tax-calculator', 'Free Ohio paycheck calculator with progressive state income tax (0%–3.99%) for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Ohio Tax Calculator', '/ohio-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Ohio Tax Calculator 2026', '/ohio-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(OHIO_FAQS, `${baseId}#faq`),
    ],
  };
}

function getMichiganJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/michigan-tax-calculator#author`;
  const baseId = `${SITE_URL}/michigan-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Michigan Tax Calculator 2026', '/michigan-tax-calculator', 'Free Michigan paycheck calculator with 4.25% flat state income tax for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Michigan Tax Calculator', '/michigan-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Michigan Tax Calculator 2026', '/michigan-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(MICHIGAN_FAQS, `${baseId}#faq`),
    ],
  };
}

function getNewJerseyJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/new-jersey-tax-calculator#author`;
  const baseId = `${SITE_URL}/new-jersey-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'New Jersey Tax Calculator 2026', '/new-jersey-tax-calculator', 'Free New Jersey paycheck calculator with progressive state income tax (1.4%–10.75%) for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'New Jersey Tax Calculator', '/new-jersey-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'New Jersey Tax Calculator 2026', '/new-jersey-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(NEWJERSEY_FAQS, `${baseId}#faq`),
    ],
  };
}

function getColoradoJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/colorado-tax-calculator#author`;
  const baseId = `${SITE_URL}/colorado-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Colorado Tax Calculator 2026', '/colorado-tax-calculator', 'Free Colorado paycheck calculator with 4.4% flat state income tax for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Colorado Tax Calculator', '/colorado-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Colorado Tax Calculator 2026', '/colorado-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(COLORADO_FAQS, `${baseId}#faq`),
    ],
  };
}

function getArizonaJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/arizona-tax-calculator#author`;
  const baseId = `${SITE_URL}/arizona-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Arizona Tax Calculator 2026', '/arizona-tax-calculator', 'Free Arizona paycheck calculator with 2.5% flat state income tax for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Arizona Tax Calculator', '/arizona-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Arizona Tax Calculator 2026', '/arizona-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(ARIZONA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getWashingtonJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/washington-tax-calculator#author`;
  const baseId = `${SITE_URL}/washington-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Washington Tax Calculator 2026', '/washington-tax-calculator', 'Free Washington paycheck calculator — no state income tax, only federal and FICA deductions for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Washington Tax Calculator', '/washington-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Washington Tax Calculator 2026', '/washington-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(WASHINGTON_FAQS, `${baseId}#faq`),
    ],
  };
}

function getMassachusettsJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/massachusetts-tax-calculator#author`;
  const baseId = `${SITE_URL}/massachusetts-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Massachusetts Tax Calculator 2026', '/massachusetts-tax-calculator', 'Free Massachusetts paycheck calculator with 5% flat state income tax and 9% surtax over $1M for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Massachusetts Tax Calculator', '/massachusetts-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Massachusetts Tax Calculator 2026', '/massachusetts-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(MASSACHUSETTS_FAQS, `${baseId}#faq`),
    ],
  };
}

function getIndianaJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/indiana-tax-calculator#author`;
  const baseId = `${SITE_URL}/indiana-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Indiana Tax Calculator 2026', '/indiana-tax-calculator', 'Free Indiana paycheck calculator with 3.05% flat state income tax for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Indiana Tax Calculator', '/indiana-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Indiana Tax Calculator 2026', '/indiana-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(INDIANA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getTennesseeJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/tennessee-tax-calculator#author`;
  const baseId = `${SITE_URL}/tennessee-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Tennessee Tax Calculator 2026', '/tennessee-tax-calculator', 'Free Tennessee paycheck calculator — no state income tax, only federal and FICA deductions for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Tennessee Tax Calculator', '/tennessee-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Tennessee Tax Calculator 2026', '/tennessee-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(TENNESSEE_FAQS, `${baseId}#faq`),
    ],
  };
}

function getMissouriJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/missouri-tax-calculator#author`;
  const baseId = `${SITE_URL}/missouri-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Missouri Tax Calculator 2026', '/missouri-tax-calculator', 'Free Missouri paycheck calculator with progressive state income tax (2%–4.8%) for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Missouri Tax Calculator', '/missouri-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Missouri Tax Calculator 2026', '/missouri-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(MISSOURI_FAQS, `${baseId}#faq`),
    ],
  };
}

function getMarylandJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/maryland-tax-calculator#author`;
  const baseId = `${SITE_URL}/maryland-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Maryland Tax Calculator 2026', '/maryland-tax-calculator', 'Free Maryland paycheck calculator with progressive state income tax (2%–5.75%) plus county taxes for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Maryland Tax Calculator', '/maryland-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Maryland Tax Calculator 2026', '/maryland-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(MARYLAND_FAQS, `${baseId}#faq`),
    ],
  };
}

function getWisconsinJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/wisconsin-tax-calculator#author`;
  const baseId = `${SITE_URL}/wisconsin-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Wisconsin Tax Calculator 2026', '/wisconsin-tax-calculator', 'Free Wisconsin paycheck calculator with progressive state income tax (3.54%–7.65%) for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Wisconsin Tax Calculator', '/wisconsin-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Wisconsin Tax Calculator 2026', '/wisconsin-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(WISCONSIN_FAQS, `${baseId}#faq`),
    ],
  };
}

function getMinnesotaJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/minnesota-tax-calculator#author`;
  const baseId = `${SITE_URL}/minnesota-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Minnesota Tax Calculator 2026', '/minnesota-tax-calculator', 'Free Minnesota paycheck calculator with progressive state income tax (5.35%–9.85%) for 2026 take-home pay estimates.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Minnesota Tax Calculator', '/minnesota-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Minnesota Tax Calculator 2026', '/minnesota-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(MINNESOTA_FAQS, `${baseId}#faq`),
    ],
  };
}

function getOregonJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/oregon-tax-calculator#author`;
  const baseId = `${SITE_URL}/oregon-tax-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Oregon Tax Calculator 2026', '/oregon-tax-calculator', 'Free Oregon paycheck calculator with progressive state income tax (4.75%–9.9%) and no sales tax for 2026.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Oregon Tax Calculator', '/oregon-tax-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Oregon Tax Calculator 2026', '/oregon-tax-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(OREGON_FAQS, `${baseId}#faq`),
    ],
  };
}

function getEmployeeCostJsonLd() {
  const author = getAuthorForCalculator('home');
  const authorId = `${SITE_URL}/employee-cost-calculator#author`;
  const baseId = `${SITE_URL}/employee-cost-calculator`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(`${baseId}#webpage`, 'Employee Cost Calculator 2026', '/employee-cost-calculator', 'Free 2026 employee cost calculator for US small businesses. Estimate total payroll cost including salary, employer taxes, and benefits.', authorId),
      breadcrumbJsonLd(`${baseId}#breadcrumb`, 'Employee Cost Calculator', '/employee-cost-calculator'),
      webAppJsonLd(`${baseId}#webapp`, 'Employee Cost Calculator 2026', '/employee-cost-calculator', authorId),
      { '@id': authorId, ...authorToJsonLd(author) },
      faqsToJsonLd(EMPLOYEE_COST_FAQS, `${baseId}#faq`),
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
    case 'northcarolina': return getNorthCarolinaJsonLd();
    case 'pennsylvania': return getPennsylvaniaJsonLd();
    case 'ohio': return getOhioJsonLd();
    case 'michigan': return getMichiganJsonLd();
    case 'newjersey': return getNewJerseyJsonLd();
    case 'colorado': return getColoradoJsonLd();
    case 'arizona': return getArizonaJsonLd();
    case 'washington': return getWashingtonJsonLd();
    case 'massachusetts': return getMassachusettsJsonLd();
    case 'indiana': return getIndianaJsonLd();
    case 'tennessee': return getTennesseeJsonLd();
    case 'missouri': return getMissouriJsonLd();
    case 'maryland': return getMarylandJsonLd();
    case 'wisconsin': return getWisconsinJsonLd();
    case 'minnesota': return getMinnesotaJsonLd();
    case 'oregon': return getOregonJsonLd();
    case 'employee-cost': return getEmployeeCostJsonLd();
    case 'income-tax': return getIncomeTaxJsonLd();
    case 'tax-calc': return getTaxCalcJsonLd();
    default: return getHomeJsonLd();
  }
}
