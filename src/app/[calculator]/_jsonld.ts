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
 * SoftwareApplication for calculator pages.
 * Uses @id reference for author and publisher to avoid duplication.
 * Google only supports SoftwareApplication (not WebApplication) for rich results.
 */
function webAppJsonLd(id: string, name: string, urlPath: string, authorId: string) {
  return {
    '@id': id,
    '@type': 'SoftwareApplication' as const,
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
  };
}

function howToJsonLd(id: string, name: string, steps: { name: string; text: string }[]) {
  return {
    '@id': id,
    '@type': 'HowTo' as const,
    name,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
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
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
      },
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your Take-Home Pay', [
        { name: 'Enter Gross Salary', text: 'Input your annual, monthly, bi-weekly, weekly, or hourly salary' },
        { name: 'Select State', text: 'Choose your state: IL (4.95%), TX (0%), FL (0%), CA (1%–13.3%), NY (4%–10.9%), or GA (5.49%)' },
        { name: 'Choose Filing Status', text: 'Select Single, Married Filing Jointly, or Head of Household' },
        { name: 'Add Pre-Tax Deductions', text: 'Enter 401(k) and HSA contributions to reduce taxable income' },
        { name: 'View Instant Results', text: 'See your net take-home pay, effective tax rate, and full deduction breakdown' },
      ]),
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your Illinois Take-Home Pay', [
        { name: 'Enter Gross Salary', text: 'Input your annual or periodic gross income' },
        { name: 'Choose Filing Status', text: 'Select Single, Married, or Head of Household for federal and Illinois tax' },
        { name: 'Add 401(k) and HSA', text: 'Pre-tax deductions reduce both federal and Illinois taxable income' },
        { name: 'View Results', text: 'See take-home pay after 4.95% flat Illinois tax, federal tax, and FICA' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your Texas Take-Home Pay', [
        { name: 'Enter Gross Salary', text: 'Input your annual or periodic gross income' },
        { name: 'Choose Filing Status', text: 'Select Single, Married, or Head of Household' },
        { name: 'Add Pre-Tax Deductions', text: 'Enter 401(k) and HSA contributions' },
        { name: 'View Results', text: 'See take-home pay after federal tax and FICA only — Texas has 0% state income tax' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your Florida Take-Home Pay', [
        { name: 'Enter Gross Salary', text: 'Input your annual or periodic gross income' },
        { name: 'Choose Filing Status', text: 'Select Single, Married, or Head of Household' },
        { name: 'Add Pre-Tax Deductions', text: 'Enter 401(k) and HSA contributions' },
        { name: 'View Results', text: 'See take-home pay after federal tax and FICA only — Florida has 0% state income tax' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your California Take-Home Pay', [
        { name: 'Enter Gross Salary', text: 'Input your annual or periodic gross income' },
        { name: 'Choose Filing Status', text: 'Select Single, Married, or Head of Household for both federal and California tax' },
        { name: 'Add Pre-Tax Deductions', text: '401(k) and HSA reduce taxable income at both federal and state level' },
        { name: 'View Results', text: 'See take-home pay after California progressive tax (1%–13.3%), federal tax, and FICA' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your New York Take-Home Pay', [
        { name: 'Enter Gross Salary', text: 'Input your annual or periodic gross income' },
        { name: 'Choose Filing Status', text: 'Select Single, Married, or Head of Household' },
        { name: 'Toggle NYC Resident', text: 'Enable if you live in any of the five boroughs for additional city tax (3.1%–3.9%)' },
        { name: 'View Results', text: 'See take-home pay after NY state tax (4%–10.9%), optional NYC tax, federal tax, and FICA' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your Mortgage Payment', [
        { name: 'Enter Loan Amount', text: 'Input the total mortgage principal' },
        { name: 'Set Interest Rate and Term', text: 'Enter the annual rate and choose 15, 20, or 30 years' },
        { name: 'Add Extra Payments', text: 'Optional: enter monthly extra payments to see payoff savings' },
        { name: 'View Amortization', text: 'See monthly payment breakdown, total interest, and payoff date' },
      ]),
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
      howToJsonLd(`${baseId}#howto`, 'How to Project Your 401(k) Balance', [
        { name: 'Enter Current Age and Retirement Age', text: 'Set your timeline for retirement savings' },
        { name: 'Input Annual Contributions', text: 'Enter your 401(k) contribution amount (2026 limit: $23,500)' },
        { name: 'Add Employer Match', text: 'Enter employer match percentage (e.g., 50% match on 6% of salary)' },
        { name: 'Set Expected Return', text: 'Choose an assumed annual return rate (default: 7%)' },
        { name: 'View Projection', text: 'See your projected 401(k) balance at retirement with compound growth' },
      ]),
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
      howToJsonLd(`${baseId}#howto`, 'How to Compare Salary Between States', [
        { name: 'Enter Current Salary and State', text: 'Input your current gross salary and state of residence' },
        { name: 'Select Target State', text: 'Choose the state you\'re considering moving to' },
        { name: 'View Comparison', text: 'See side-by-side take-home pay and equivalent salary in the target state' },
        { name: 'Evaluate Total Tax Burden', text: 'Compare income tax, property tax, and sales tax between states' },
      ]),
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Capital Gains Tax', [
        { name: 'Enter Capital Gain Amount', text: 'Input the total profit from your investment sale' },
        { name: 'Select Holding Period', text: 'Choose short-term (≤1 year) or long-term (>1 year)' },
        { name: 'Enter Ordinary Income', text: 'Input your other taxable income to determine your capital gains bracket' },
        { name: 'View Results', text: 'See tax owed at 0%/15%/20% long-term or ordinary rates, plus any 3.8% NIIT' },
      ]),
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Self-Employment Tax', [
        { name: 'Enter Net Business Income', text: 'Input your total self-employment income after business expenses' },
        { name: 'Choose Filing Status', text: 'Select your federal filing status' },
        { name: 'View SE Tax Breakdown', text: 'See 15.3% SE tax on 92.35% of income, plus half deduction' },
        { name: 'Get Quarterly Estimates', text: 'See estimated quarterly tax payment amounts (April, June, September, January)' },
      ]),
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
      howToJsonLd(`${baseId}#howto`, 'How to Estimate Your Tax Refund', [
        { name: 'Enter Total Income', text: 'Input your gross annual income from all sources' },
        { name: 'Enter Withholding Amount', text: 'Input total federal and state tax already withheld from paychecks' },
        { name: 'Add Deductions and Credits', text: 'Enter itemized deductions, Child Tax Credit, and Earned Income Credit' },
        { name: 'View Refund Estimate', text: 'See your estimated refund or amount owed for 2026' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Sales Tax', [
        { name: 'Enter Purchase Amount', text: 'Input the price of the item or service' },
        { name: 'Select State', text: 'Choose your state for the combined state and local tax rate' },
        { name: 'View Results', text: 'See sales tax amount and total cost, or use reverse calculation' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate After-Tax Overtime Pay', [
        { name: 'Enter Regular Hourly Rate', text: 'Input your base hourly wage' },
        { name: 'Enter Overtime Hours', text: 'Input the number of OT hours worked per week' },
        { name: 'Choose Filing Status and State', text: 'Select for accurate federal and state tax calculation' },
        { name: 'View After-Tax OT Pay', text: 'See your OT earnings at 1.5x rate after all taxes are deducted' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your Georgia Take-Home Pay', [
        { name: 'Enter Gross Salary', text: 'Input your annual or periodic gross income' },
        { name: 'Choose Filing Status', text: 'Select Single, Married, or Head of Household' },
        { name: 'Add Pre-Tax Deductions', text: 'Enter 401(k) and HSA contributions' },
        { name: 'View Results', text: 'See take-home pay after Georgia 5.49% flat tax, federal tax, and FICA' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate After-Tax Lottery Winnings', [
        { name: 'Enter Winnings Amount', text: 'Input the total lottery or prize winnings' },
        { name: 'Select State', text: 'Choose your state for applicable state tax rate' },
        { name: 'Choose Payout Type', text: 'Select lump sum or annuity payment option' },
        { name: 'View After-Tax Payout', text: 'See your actual take-home after 24% federal withholding and state taxes' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Federal Withholding', [
        { name: 'Enter Gross Pay', text: 'Input your periodic gross income (per paycheck)' },
        { name: 'Choose Filing Status', text: 'Select your W-4 filing status' },
        { name: 'Add Dependents and Deductions', text: 'Enter number of dependents and pre-tax deductions' },
        { name: 'View Withholding Amount', text: 'See recommended federal withholding per paycheck and W-4 adjustments' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Property Tax', [
        { name: 'Enter Home Value', text: 'Input the assessed or market value of the property' },
        { name: 'Select State', text: 'Choose your state for the average effective property tax rate' },
        { name: 'Apply Exemptions', text: 'Add homestead or senior exemptions if applicable' },
        { name: 'View Annual Tax', text: 'See your estimated annual property tax amount' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate After-Tax Bonus Pay', [
        { name: 'Enter Bonus Amount', text: 'Input the total bonus or supplemental pay' },
        { name: 'Choose Tax Method', text: 'Select 22% flat supplemental rate or aggregate method' },
        { name: 'Select State', text: 'Choose your state for applicable state tax' },
        { name: 'View After-Tax Bonus', text: 'See your actual take-home bonus after all taxes' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your Virginia Take-Home Pay', [
        { name: 'Enter Gross Salary', text: 'Input your annual or periodic gross income' },
        { name: 'Choose Filing Status', text: 'Select Single, Married, or Head of Household' },
        { name: 'Add Pre-Tax Deductions', text: 'Enter 401(k) and HSA contributions' },
        { name: 'View Results', text: 'See take-home pay after Virginia progressive tax (2%–5.75%), federal tax, and FICA' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Federal Income Tax', [
        { name: 'Enter Taxable Income', text: 'Input your gross income minus any adjustments' },
        { name: 'Choose Filing Status', text: 'Select Single, Married Filing Jointly, or Head of Household' },
        { name: 'Apply Standard Deduction', text: 'Use $16,100 (single), $32,200 (married), or $24,150 (HOH)' },
        { name: 'View Tax Breakdown', text: 'See tax owed at each bracket rate from 10% to 37%, plus FICA' },
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
      howToJsonLd(`${baseId}#howto`, 'How to Calculate Your Total Tax Burden', [
        { name: 'Enter Total Income', text: 'Input your gross annual income' },
        { name: 'Choose Filing Status and State', text: 'Select for federal brackets and state tax calculation' },
        { name: 'Add Deductions', text: 'Enter standard or itemized deductions and pre-tax contributions' },
        { name: 'View Total Tax Burden', text: 'See combined federal, FICA, and state tax with effective rate' },
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
