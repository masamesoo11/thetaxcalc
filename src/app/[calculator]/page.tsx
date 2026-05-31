import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  CALCULATOR_ROUTES,
  SLUG_TO_CONFIG,
  getCalculatorSlugs,
} from '@/lib/calculator-routes';
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
  IRS_WITHHOLDING_FAQS,
  SALES_TAX_FAQS,
  OVERTIME_FAQS,
  BONUS_TAX_FAQS,
  PROPERTY_TAX_FAQS,
  LOTTERY_TAX_FAQS,
  FAQItem,
} from '@/lib/faq-data';
import { CalculatorClientPage } from './calculator-client-page';
import { getAllPosts } from '@/lib/blog-db';
import { SITE_URL } from '@/lib/site-config';

export function generateStaticParams() {
  return getCalculatorSlugs().map((slug) => ({ calculator: slug }));
}

// ─── Per-Page Metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ calculator: string }>;
}): Promise<Metadata> {
  const { calculator } = await params;
  const config = SLUG_TO_CONFIG[calculator];

  if (!config) {
    return { title: 'Calculator Not Found' };
  }

  const baseUrl = SITE_URL;

  return {
    title: config.metaTitle,
    description: config.metaDesc,
    keywords: config.keywords,
    authors: [{ name: 'TheTaxCalc' }],
    alternates: {
      canonical: `${baseUrl}${config.canonicalPath}`,
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      url: `${baseUrl}${config.canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: config.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.ogTitle,
      description: config.ogDescription,
      images: [`${baseUrl}/opengraph-image.png`],
    },
  };
}

// ─── JSON-LD FAQ Helper ─────────────────────────────────────────────────────────

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

function getIrsWithholdingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'IRS Withholding Calculator', item: `${SITE_URL}/irs-withholding-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'IRS Withholding Calculator 2026', url: `${SITE_URL}/irs-withholding-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'IRS Withholding Math Solver', description: 'Computes recommended federal withholding per paycheck using IRS Publication 15-T methodology with progressive brackets, standard deduction, and dependent credits.', mathExpression: 'WH = (FedTax((Gross - Pretax - StdDed) × brackets) - DepCredit) / PayPeriods' },
      { '@type': 'Dataset', name: '2026 Withholding Key Rates', variableMeasured: [
        { name: 'Standard Deduction (Single)', value: '$15,000' },
        { name: 'Standard Deduction (Married)', value: '$30,000' },
        { name: 'Standard Deduction (HOH)', value: '$22,500' },
        { name: 'SS Wage Cap', value: '$176,100' },
        { name: 'Additional Medicare Threshold', value: '$200,000' },
        { name: 'Dependent Credit', value: '$2,000 per dependent' },
      ]},
      faqsToJsonLd(IRS_WITHHOLDING_FAQS),
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

function getSalesTaxJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Sales Tax Calculator', item: `${SITE_URL}/sales-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Sales Tax Calculator 2026', url: `${SITE_URL}/sales-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Sales Tax Calculator', description: 'Computes sales tax amount and total cost using combined state + local rates. Also supports reverse calculation: MaxPurchase = Budget / (1 + combined_rate).', mathExpression: 'Tax = Price × (StateRate + LocalRate), Total = Price + Tax, Reverse: MaxPurchase = Budget / (1 + Rate)' },
      { '@type': 'Dataset', name: '2026 Sales Tax Key Rates', variableMeasured: [
        { name: 'California Combined Rate', value: '8.82% (7.25% state + 1.57% local)' },
        { name: 'Texas Combined Rate', value: '8.20% (6.25% state + 1.95% local)' },
        { name: 'New York Combined Rate', value: '8.52% (4% state + 4.52% local)' },
        { name: 'Florida Combined Rate', value: '7.02% (6% state + 1.02% local)' },
        { name: 'Illinois Combined Rate', value: '8.86% (6.25% state + 2.61% local)' },
        { name: 'No Sales Tax States', value: 'DE, MT, NH, OR (AK: local only)' },
      ]},
      faqsToJsonLd(SALES_TAX_FAQS),
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
      { '@type': 'MathSolver', name: 'Bonus Tax Math Solver', description: 'Computes tax on bonus using Percentage Method (flat 22% federal rate on supplemental wages) or Aggregate Method (add bonus to regular wages and tax through progressive brackets). Both include FICA and state tax.', mathExpression: 'Pct: FedTax = Bonus × 0.22; Agg: FedTax = FedTax(Salary + Bonus) - FedTax(Salary); Both: Total = FedTax + FICA(Bonus) + StateTax(Bonus)' },
      { '@type': 'Dataset', name: '2026 Bonus Tax Key Rates', variableMeasured: [
        { name: 'Supplemental Wage Rate (under $1M)', value: '22% flat' },
        { name: 'Supplemental Wage Rate (above $1M)', value: '37% on excess' },
        { name: 'FICA Social Security Rate', value: '6.2% (up to $176,100)' },
        { name: 'FICA Medicare Rate', value: '1.45% (no cap)' },
        { name: 'Additional Medicare Tax', value: '0.9% (above $200K)' },
      ]},
      faqsToJsonLd(BONUS_TAX_FAQS),
    ],
  };
}

function getLotteryTaxJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Lottery Tax Calculator', item: `${SITE_URL}/lottery-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'Lottery Tax Calculator 2026', url: `${SITE_URL}/lottery-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Lottery Tax Math Solver', description: 'Computes tax on lottery winnings: Federal tax uses progressive brackets (10%-37%) on prize amount minus standard deduction. NO FICA applies. State tax varies by state. Supports lump sum vs annuity comparison. Mandatory 24% withholding on winnings over $5,000.', mathExpression: 'Net = Prize - FedTax(Prize - StdDed) - StateTax(Prize); FICA = $0; Withholding = Prize > $5000 ? Prize × 0.24 : 0' },
      { '@type': 'Dataset', name: '2026 Lottery Tax Key Rates', variableMeasured: [
        { name: 'Federal Tax Brackets', value: '10% – 37% (progressive)' },
        { name: 'FICA on Lottery Winnings', value: '0% (NOT subject to FICA)' },
        { name: 'Mandatory Withholding Rate', value: '24% (on winnings over $5,000)' },
        { name: 'Lump Sum Cash Value', value: 'Typically 50-60% of advertised jackpot' },
        { name: 'Annuity Period', value: '30 years' },
        { name: 'No Income Tax States', value: 'TX, FL, WA, NV, WY, SD, AK, TN, NH' },
      ]},
      faqsToJsonLd(LOTTERY_TAX_FAQS),
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
      { '@type': 'MathSolver', name: 'Property Tax Calculator', description: 'Computes annual and monthly property tax using average effective rates for all 50 US states plus DC. Supports homestead exemptions and custom exemptions. Annual Tax = Home Value × Effective Rate - Exemptions.', mathExpression: 'AnnualTax = (HomeValue - Exemption) × EffectiveRate; MonthlyTax = AnnualTax / 12; BiweeklyTax = AnnualTax / 26' },
      { '@type': 'Dataset', name: '2026 Property Tax Key Rates', variableMeasured: [
        { name: 'Highest State Rate', value: 'New Jersey 2.49%' },
        { name: 'Lowest State Rate', value: 'Hawaii 0.31%' },
        { name: 'US Average Effective Rate', value: '~1.1%' },
        { name: 'Florida Homestead Exemption', value: 'Up to $50,000' },
        { name: 'States Covered', value: 'All 50 states + DC' },
      ]},
      faqsToJsonLd(PROPERTY_TAX_FAQS),
    ],
  };
}

function getOvertimeTaxJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'No Tax on Overtime Calculator', item: `${SITE_URL}/overtime-tax-calculator` },
      ]},
      { '@type': 'WebApplication', name: 'No Tax on Overtime Calculator 2025–2028', url: `${SITE_URL}/overtime-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: 'Overtime Tax Savings Solver', description: 'Computes federal income tax savings from the OT exemption: Savings = OT_Pay × Federal_Bracket_Rate, where OT_Pay = OT_Hours × Hourly_Rate × 1.5. FICA taxes (7.65%) still apply.', mathExpression: 'Savings = (OT_Hours × Rate × 1.5) × FedBracket - FICA(OT_Pay) = OT_Pay × Bracket%' },
      { '@type': 'Dataset', name: '2025–2028 Overtime Tax Exemption Key Rates', variableMeasured: [
        { name: 'Minimum OT Rate Multiplier', value: '1.5x regular rate (FLSA)' },
        { name: 'OT Exemption Period', value: '2025–2028 (tax years)' },
        { name: 'FICA Still Applies to OT', value: 'Yes (6.2% SS + 1.45% Medicare)' },
        { name: 'Federal Income Tax on OT', value: '0% (exempted)' },
        { name: 'Law Sunset Date', value: 'December 31, 2028' },
        { name: 'State Income Tax on OT', value: 'Most states still tax OT' },
      ]},
      faqsToJsonLd(OVERTIME_FAQS),
    ],
  };
}

function getJsonLdForType(type: string) {
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
    case 'irs-withholding': return getIrsWithholdingJsonLd();
    case 'sales-tax': return getSalesTaxJsonLd();
    case 'overtime-tax': return getOvertimeTaxJsonLd();
    case 'bonus-tax': return getBonusTaxJsonLd();
    case 'lottery-tax': return getLotteryTaxJsonLd();
    case 'property-tax': return getPropertyTaxJsonLd();
    default: return getHomeJsonLd();
  }
}

// ─── Calculator Content Data (Server-Rendered for SEO) ─────────────────────────

interface CalculatorContent {
  howItWorks: string[];
  keyRates: { label: string; value: string }[];
  faqs: FAQItem[];
  relatedCalculators: { slug: string; label: string }[];
}

function getCalculatorContent(type: string): CalculatorContent {
  switch (type) {
    case 'home':
      return {
        howItWorks: [
          'Look at your pay stub sometime. That number at the bottom — the one that actually hits your bank — is way smaller than the number at the top. This calculator tells you why, line by line. All withholding calculations follow <a href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer nofollow">IRS Publication 15-T</a>.',
          'Here\'s what comes out of every paycheck. Federal tax uses progressive brackets from 10% up to 37%, with standard deductions of $15,000 (single) or $30,000 (married). Then <a href="/glossary">FICA</a>: 6.2% for Social Security on income up to $176,100, and 1.45% for Medicare on everything. Make over $200,000? Add another 0.9% Medicare surtax on the amount above that.',
          'My buddy in Chicago and I compared stubs once. Same salary, same filing status. He walked away with about $3,800 less for the year because Illinois takes 4.95% and my state takes nothing. That\'s when it hit me — state tax is not a small factor. We cover five states here: Illinois at 4.95% flat, Texas at 0%, Florida at 0%, California at 1%–13.3% progressive, and New York at 4%–10.9% plus a potential NYC tax.',
          'A couple things that help soften the blow:\n- <a href="/401k-retirement-calculator">401(k) contributions</a> reduce taxable income at both federal and state level\n- HSA contributions do the same\n- These pre-tax deductions are basically a discount on your tax bill',
          'Bottom line — you\'ll see your net pay, effective tax rate, and marginal rate. Most people think their effective rate is higher than it actually is. Go ahead, see for yourself.',
        ],
        keyRates: [
          { label: 'Federal Tax Brackets', value: '10% – 37%' },
          { label: 'Standard Deduction (Single)', value: '$15,000' },
          { label: 'Social Security Rate', value: '6.2% (up to $176,100)' },
          { label: 'Medicare Rate', value: '1.45% (no cap)' },
          { label: 'Additional Medicare Tax', value: '0.9% (above $200K)' },
        ],
        faqs: HOME_FAQS,
        relatedCalculators: [
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'illinois':
      return {
        howItWorks: [
          '<a href="https://revenue.illinois.gov/" target="_blank" rel="noopener noreferrer nofollow">4.95%</a>. That\'s it. One flat rate for every Illinois resident, whether you pull in $30K or $300K. No brackets to figure out, no guessing which rate applies. Honestly, it\'s kinda nice not having to navigate a bracket system — even if 4.95% isn\'t exactly cheap compared to the zero-tax states. You get a $2,775 personal exemption for 2026 that comes off the top, so on a $75,000 salary you\'re taxed on $72,225, which comes out to $3,575.14 in state tax. The math is easy to check. My cousin moved from Chicago to Austin last year and he said the <a href="/relocation-calculator">state tax savings alone covered his moving costs</a> within about 8 months.',
          'On top of Illinois tax you\'ve got the federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. <a href="/401k-retirement-calculator">401(k) contributions</a> are your friend here — they reduce taxable income at both the federal and state level, so every dollar you put in saves you money twice.',
          'One thing people don\'t expect: Illinois has no state standard deduction, just that personal exemption. But there\'s a real silver lining if you\'re anywhere near retirement. Illinois doesn\'t touch Social Security benefits, 401(k) distributions, IRA withdrawals, or pension income. The property taxes are brutal — no argument there — but for retirees specifically, the income tax picture is honestly pretty decent.',
        ],
        keyRates: [
          { label: 'Illinois Flat Tax Rate', value: '4.95%' },
          { label: 'IL Personal Exemption', value: '$2,775' },
          { label: 'IL Avg Property Tax Rate', value: '~1.78%' },
          { label: 'IL Avg Combined Sales Tax', value: '8.86%' },
          { label: 'Social Security Wage Cap', value: '$176,100' },
        ],
        faqs: ILLINOIS_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'General Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'texas':
      return {
        howItWorks: [
          'Zero. That\'s the Texas income tax rate. Not "close to zero" or "effectively zero." Actually zero. The Texas Constitution bans a state income tax, so this isn\'t changing.',
          'Your only deductions are federal tax and FICA. Federal uses the 2026 progressive brackets (10%–37%) with standard deductions, plus 6.2% Social Security up to $176,100 and 1.45% Medicare on everything. No state line item on your pay stub. Period.',
          'I talk to people who moved from <a href="/california-tax-calculator">California</a> or <a href="/new-york-tax-calculator">New York</a> and they can\'t get over how much more shows up in their bank account on the same salary. A $100K earner in Texas takes home roughly $79,000. Same salary in California? More like $71,000. That\'s an $8,000 difference from state tax alone.',
          'But Texas gets you elsewhere. <a href="https://comptroller.texas.gov/" target="_blank" rel="noopener noreferrer nofollow">Property taxes</a> average about 1.71% of home value — on a $300,000 house that\'s roughly $5,130 a year. That\'s among the highest in the country. Sales tax runs around 8.2% combined with local add-ons. The income tax savings are real, but the full picture is more complicated than "Texas has no income tax so it\'s cheaper."',
          'If you\'re renting or own a modest home, Texas is hard to beat on taxes. But a $600K house changes the math — that property tax bill can eat into your income tax savings fast. Run the numbers. That\'s literally what this calculator is for.',
        ],
        keyRates: [
          { label: 'Texas State Income Tax', value: '0%' },
          { label: 'TX Avg Property Tax Rate', value: '~1.71%' },
          { label: 'TX Avg Combined Sales Tax', value: '8.2%' },
          { label: 'Federal Standard Deduction', value: '$15,000 (single)' },
          { label: 'Social Security Rate', value: '6.2% (up to $176,100)' },
        ],
        faqs: TEXAS_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'florida':
      return {
        howItWorks: [
          'Florida: zero state income tax, just like Texas. But the property tax picture is completely different, and that\'s where Florida pulls ahead for a lot of people.',
          'Your paycheck deductions in Florida are federal tax only (2026 progressive brackets with standard deductions) plus FICA at 7.65% combined. No state tax, no local wage tax, nothing extra. Someone making $100K in Florida takes home thousands more per year than the same salary in Illinois, California, or New York.',
          'Here\'s where Florida really wins though:\n- Average effective <a href="https://floridarevenue.com/" target="_blank" rel="noopener noreferrer nofollow">property tax rate</a> of just 0.86% (Texas is ~1.71%)\n- Homestead Exemption knocks up to $50,000 off your home\'s assessed value\n- On a $300,000 home: roughly $2,580 property tax in Florida vs $5,130 in Texas',
          'I think Florida wins for retirees. And it\'s not even close. Social Security benefits, 401(k) distributions, IRA withdrawals, pensions — all completely tax-free at the state level. Add in the Homestead Exemption keeping property taxes low, and your fixed income stretches a lot further than in most states.',
          'Florida funds government through a 6% state sales tax (averaging 7% with local surtaxes) and tourism taxes. Visitors pay a big chunk of the bill, which is a nice perk for residents. No estate tax, no inheritance tax either.',
          'Bottom line — if you\'re comparing zero-tax states, <a href="/texas-tax-calculator">Florida tends to beat Texas</a> for homeowners and retirees. Run both calculators and see the difference.',
        ],
        keyRates: [
          { label: 'Florida State Income Tax', value: '0%' },
          { label: 'FL Avg Property Tax Rate', value: '~0.86%' },
          { label: 'FL Avg Combined Sales Tax', value: '7.0%' },
          { label: 'Homestead Exemption', value: 'Up to $50,000' },
          { label: 'Federal Standard Deduction', value: '$15,000 (single)' },
        ],
        faqs: FLORIDA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'california':
      return {
        howItWorks: [
          'California has the highest state income tax in the country. Top rate is 13.3%, and it starts at $698,271 of taxable income for single filers. Even at a modest salary you\'re probably paying 6%–9.3% to the state. I won\'t pretend that doesn\'t sting.',
          'The state uses <a href="https://www.ftb.ca.gov/" target="_blank" rel="noopener noreferrer nofollow">nine progressive brackets</a>. Standard deduction for 2026 is $6,083 (single) or $12,166 (married). After that deduction, each slice of your income gets its own rate — 1% on the first $10,099, climbing all the way to 13.3% above $698,271. Same principle as federal brackets: only the income within each bracket gets that rate. On top of this, you\'re paying federal progressive brackets with the $15,000 standard deduction, plus FICA at 7.65%. Pre-tax deductions like <a href="/401k-retirement-calculator">401(k) contributions</a> are huge in California because they cut your taxable income at both federal and state level. At 13.3% for high earners, that state deduction is worth a lot.',
          'One thing that catches people off guard: California property taxes are actually pretty reasonable. Average effective rate around 0.71%. Proposition 13 caps annual assessed value increases at 2%, so your tax bill doesn\'t spiral even if your home\'s market value goes crazy. Of course, when the median house costs $800K, even a low rate gives you a hefty bill. And at least Social Security benefits aren\'t taxed by the state.',
          'A coworker of mine was offered a $130K job in San Francisco and almost took it without running the numbers. California state tax alone on that salary is roughly $8,500. The same job in <a href="/texas-tax-calculator">Texas</a>? $0 state tax. That\'s not chump change. <a href="/relocation-calculator">Do the math before you accept that offer</a>.',
        ],
        keyRates: [
          { label: 'CA Tax Brackets', value: '1% – 13.3% (9 brackets)' },
          { label: 'CA Standard Deduction (Single)', value: '$6,083' },
          { label: 'CA Top Marginal Rate Threshold', value: '$698,271 (single)' },
          { label: 'CA Avg Combined Sales Tax', value: '8.82%' },
          { label: 'CA Avg Property Tax Rate', value: '~0.71%' },
        ],
        faqs: CALIFORNIA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'newyork':
      return {
        howItWorks: [
          'New York takes a lot out of your paycheck. <a href="https://www.tax.ny.gov/" target="_blank" rel="noopener noreferrer nofollow">State income tax</a> runs from 4% to 10.9% across nine brackets, and if you live in NYC, there\'s an additional city tax (3.078%–3.876%) on top. NYC residents face the highest combined state and local income tax in the US.',
          'NY\'s standard deduction is $8,100 for single filers, $16,200 for married filing jointly — actually higher than California\'s, which is something. The top 10.9% rate doesn\'t kick in until $25,000,000 of taxable income, so most earners are in the 6%–8% range.',
          'That NYC tax though. If you live in any of the five boroughs, the city takes an additional 3.078%–3.876%. On $100,000, that\'s roughly $3,400 that people in literally any other US city don\'t pay. I\'ve seen friends reconsider job offers after factoring in the city tax. It\'s a toggle in this calculator for a reason — it makes a huge difference.',
          'One bright spot: New York doesn\'t tax Social Security, and excludes up to $20,000 of retirement income (pensions, 401(k), IRA) for taxpayers 59½ and older. Property taxes average 1.62% and combined sales tax is about 8.52%. Not great. But also not the worst part about living here.',
          'Winner for lowest total tax burden? Not New York, obviously. But if you\'re here for the career or the city, at least you can <a href="/compare">see exactly what it costs you compared to other states</a>.',
        ],
        keyRates: [
          { label: 'NY Tax Brackets', value: '4% – 10.9% (9 brackets)' },
          { label: 'NY Standard Deduction (Single)', value: '$8,100' },
          { label: 'NYC Income Tax', value: '3.078% – 3.876%' },
          { label: 'NY Avg Property Tax Rate', value: '~1.62%' },
          { label: 'NY Avg Combined Sales Tax', value: '8.52%' },
        ],
        faqs: NEWYORK_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'mortgage':
      return {
        howItWorks: [
          'Your monthly mortgage payment comes from a formula: M = P × [r(1+r)^n] / [(1+r)^n - 1]. P is the loan amount, r is the monthly rate (annual rate ÷ 12), and n is total payments (years × 12). It spits out a fixed payment that pays off every penny by the end of the term. Simple enough. What surprises people is how that payment breaks down. On a 30-year, $280,000 loan at 6.5%, your first payment is roughly 86% interest and only 14% principal. You feel like you\'re treading water. By year 15 it\'s about 50/50, and in the final years nearly everything goes to principal. My brother bought his first house in 2019 and called me panicked after seeing his first amortization statement — "I\'m basically just paying interest!" Yeah. That\'s how it works at first. Stick with it.',
          'Extra payments go 100% toward principal. Every dollar you add saves you interest for the remaining life of the loan. Adding $200/month extra on that $280K loan at 6.5% saves roughly $76,856 in interest and pays it off more than 5 years early. Compound interest working for you instead of against you, for once.',
          'We generate a full amortization schedule — month by month, principal vs interest, remaining balance. For a detailed walkthrough, check the <a href="https://www.consumerfinance.gov/owning-a-home/" target="_blank" rel="noopener noreferrer nofollow">CFPB homebuying resources</a>. Key things to keep in mind:\n- Recommended housing cost ratio: no more than 28% of gross income\n- 20% down payment avoids PMI entirely\n- Common loan terms are 15, 20, or 30 years\n- Even small extra payments make a big difference over 30 years',
        ],
        keyRates: [
          { label: 'Formula', value: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]' },
          { label: 'Common Loan Terms', value: '15, 20, or 30 years' },
          { label: 'Current Avg 30-Year Rate', value: '~6.5% (varies)' },
          { label: 'Recommended Housing Ratio', value: '≤28% of gross income' },
          { label: 'Typical Down Payment', value: '20% (avoids PMI)' },
        ],
        faqs: MORTGAGE_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'retirement':
      return {
        howItWorks: [
          'Start early. That\'s the whole game with retirement savings. This calculator estimates your 401(k) balance at retirement based on contributions, employer match, expected returns, and years left to save. The earlier you begin, the less you need to put in each year.',
          'The math is future value of a series. Each year\'s contribution grows at your assumed annual return for every remaining year until retirement. Year 1 grows for the full period. Year 10 grows for 10 fewer years. Add it all up — that\'s your projected balance. The concept is straightforward. The results can be surprising. Someone who starts at 25 and contributes $500/month with a 7% return ends up with roughly $1.2 million by 65. Start at 35 with the same contributions? About $567,000. Ten years of delay costs you over $600K. That\'s compound growth for you — brutal if you\'re late, powerful if you\'re early.',
          'The employer match is free money. Typical structure: 50% match up to 6% of salary. Make $100K, contribute 6% ($6,000), employer adds $3,000. If you\'re not contributing enough to get the full match, you\'re throwing away thousands every year.',
          'For 2026, the <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" target="_blank" rel="noopener noreferrer nofollow">401(k) contribution limit is $23,500</a>. Catch-up contribution for ages 50+ is another $7,500. Ages 60-63 get an even bigger catch-up of $11,250. The calculator defaults to 7% annual return, which is a reasonable long-term assumption for a diversified stock portfolio. Real returns bounce around — up 20% some years, down 15% others — but 7% is a solid planning number over decades.',
          'RMD age is 73. That\'s when the IRS makes you start withdrawing. But that\'s a problem for future you.',
        ],
        keyRates: [
          { label: '2026 Contribution Limit', value: '$23,500' },
          { label: 'Catch-Up (Age 50+)', value: '+$7,500' },
          { label: 'Catch-Up (Age 60-63)', value: '+$11,250' },
          { label: 'Assumed Annual Return', value: '7% (default)' },
          { label: 'RMD Age', value: '73' },
        ],
        faqs: RETIREMENT_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (retirees)' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'relocation':
      return {
        howItWorks: [
          'My sister got a job offer in San Francisco that paid $15,000 more than her Chicago salary. Sounded great until she ran the numbers. After California state tax and higher housing costs, she\'d actually have less money left over. That\'s exactly what this calculator prevents. It tells you the salary you\'d need in a new state to match your current take-home pay.',
          'How it works: first we calculate your current take-home after federal tax, FICA, and your state\'s income tax. Then we figure out what gross salary in the target state would give you the same net pay, accounting for that state\'s tax rates and deductions.',
          'Let\'s look at a real example. $100,000 in Texas (0% state tax) gets you roughly $79,000 take-home. To end up with the same $79,000 in California, you\'d need to earn about $120,000–$125,000. California\'s progressive income tax eats an extra $5,000–$8,000 that Texas doesn\'t touch. That\'s a car payment, a vacation, or a decent chunk of retirement savings — just gone to state tax.',
          'This tool focuses on income tax differences. But look, income tax isn\'t the whole story:\n- Property taxes: <a href="/texas-tax-calculator">Texas</a> is brutal (~1.71%), <a href="/california-tax-calculator">California</a> is surprisingly mild (~0.71%)\n- Sales taxes vary significantly by state and city\n- Housing costs are the big one — $1,500/month in Houston can be $3,000 in San Francisco\nCheck our <a href="/compare">state comparison pages</a> for the full picture.',
        ],
        keyRates: [
          { label: 'States Covered', value: 'IL, TX, FL, CA, NY' },
          { label: 'IL Flat Rate', value: '4.95%' },
          { label: 'TX / FL Rate', value: '0%' },
          { label: 'CA Top Rate', value: '13.3%' },
          { label: 'NY Top Rate (+ NYC)', value: '10.9% + 3.876%' },
        ],
        faqs: RELOCATION_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'capital-gains':
      return {
        howItWorks: [
          'How long you hold an investment changes everything about the tax bill. Short-term gains (held a year or less) get taxed as ordinary income — up to 37%. Long-term gains (held more than a year) qualify for <a href="https://www.irs.gov/taxtopics/tc409" target="_blank" rel="noopener noreferrer nofollow">0%, 15%, or 20%</a>. On a $50,000 gain, the difference between short-term and long-term rates can be thousands of dollars.',
          'For 2026, the 0% long-term rate applies if your total taxable income (including the gain) is under $47,025 (single) or $94,050 (married). The 15% rate covers most people, up to $518,900 (single) or $583,750 (married). Above that, it\'s 20%. These brackets are based on your total taxable income, not just the gain — so your salary can push you into a higher capital gains bracket.',
          'Don\'t forget the Net Investment Income Tax (NIIT). That\'s an extra 3.8% on top when your MAGI exceeds $200,000 (single) or $250,000 (married).',
          'A guy I know sold some stock after 11 months because he wanted the cash for a down payment. Held it just 3 more weeks and he would\'ve qualified for long-term rates. Cost him about $4,000 in extra tax. That one still stings.',
          'The effective top rate on long-term gains is 23.8% (20% + 3.8% NIIT), not the 20% most people quote. We factor in your ordinary income to figure out which bracket your gains fall into, and we show you the NIIT impact too.',
          'Common tax-saving strategies worth knowing:\n- Tax-loss harvesting: offset gains with losses to reduce your tax bill\n- Watch your holding period: sometimes waiting a few weeks saves you thousands\n- Donate appreciated assets to charity: you deduct the full value and never pay capital gains on it\nSmall decisions, big savings.',
        ],
        keyRates: [
          { label: 'Short-Term Rate', value: 'Ordinary income (up to 37%)' },
          { label: 'Long-Term Rates', value: '0% / 15% / 20%' },
          { label: 'NIIT Rate', value: '3.8% (above $200K/$250K)' },
          { label: '0% Bracket (Single)', value: 'Up to $47,025 taxable' },
          { label: 'Top Effective Rate (incl. NIIT)', value: '23.8%' },
        ],
        faqs: CAPITAL_GAINS_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'self-employment':
      return {
        howItWorks: [
          '15.3%. That\'s the <a href="https://www.irs.gov/taxtopics/tc554" target="_blank" rel="noopener noreferrer nofollow">self-employment tax rate</a>, and if you just went freelance, it\'s probably higher than you expected. It covers both halves of Social Security (12.4%) and Medicare (2.9%) — the half your employer used to pay plus the half that always came out of your paycheck. Nobody warned me about this when I started consulting. It\'s a punch in the wallet.',
          'Here\'s a small relief: you don\'t pay 15.3% on 100% of your income. It\'s calculated on 92.35% of your net business income, which roughly accounts for the employer-half deduction that W-2 workers get automatically. So on $100,000 of net SE income, the tax base is $92,350 and the SE tax comes to roughly $14,130. Still hurts, but less than you might have feared at first glance. And you can deduct half of your SE tax ($7,065 in this example) as an above-the-line deduction. It doesn\'t reduce the SE tax itself, but it lowers your AGI, which means less federal and state income tax. Every bit counts.',
          'Quick reference for what you\'re dealing with:\n- Social Security portion: 12.4% on income up to $176,100\n- Medicare portion: 2.9% on everything, no cap\n- Additional Medicare: 0.9% on income above $200,000\n- Half of SE tax is deductible above the line',
          'Quarterly estimated payments. This is where new freelancers get into trouble. You have to send the IRS money four times a year — April 15, June 15, September 15, January 15 — or face penalties. The safe harbor is paying at least 100% of last year\'s tax liability (110% if your AGI was over $150,000) or 90% of this year\'s. We estimate those quarterly amounts so there are no ugly surprises in April. Seriously, don\'t skip estimated payments. The penalties aren\'t worth it.\n\nWant to see how self-employment income compares to a W-2 salary? <a href="/salary">Check our salary after tax pages</a> to compare take-home pay at every income level across all 5 states.',
        ],
        keyRates: [
          { label: 'SE Tax Rate', value: '15.3% on 92.35% of net income' },
          { label: 'Social Security Portion', value: '12.4% (up to $176,100)' },
          { label: 'Medicare Portion', value: '2.9% (no cap)' },
          { label: 'Additional Medicare', value: '0.9% (above $200K)' },
          { label: 'Half SE Tax Deduction', value: 'Above-the-line' },
        ],
        faqs: SELF_EMPLOYMENT_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'tax-refund':
      return {
        howItWorks: [
          'Your tax refund is simply the difference between what was withheld from your paychecks throughout the year and what you actually owe in taxes. If your employer withheld more than your total tax bill, the government sends you a refund. If they withheld less, you write a check. This <a href="/tax-refund-calculator">tax refund calculator</a> helps you figure out which scenario you\'re looking at before you file.',
          'The calculation goes like this: start with your total income, subtract deductions (standard or itemized) to get taxable income, apply the federal tax brackets, subtract any credits you qualify for, and that\'s your federal tax owed. Compare it to what was already withheld. The difference is your refund — or your balance due.',
          'The standard deduction for 2026 is $15,000 (single), $30,000 (married filing jointly), or $22,500 (head of household). Most people take the standard — about 90% of taxpayers. But if you have significant mortgage interest, charitable donations, or state/local taxes (SALT, capped at $10,000), itemizing might save you more. This calculator lets you try both.',
          'Tax credits are better than deductions — they reduce your tax bill dollar for dollar, while deductions only reduce your taxable income. The <a href="https://www.irs.gov/credits-deductions/individuals/child-tax-credit" target="_blank" rel="noopener noreferrer nofollow">Child Tax Credit</a> gives you $2,000 per qualifying child (up to $1,700 refundable). The Earned Income Credit can be worth up to $7,430 for families with three or more children. These credits can turn a small refund into a big one.',
          'A quick note on refund timing: if you e-file and choose direct deposit, most refunds arrive within 21 days. Paper returns take 6–8 weeks. The IRS typically starts accepting returns in late January, and filing early usually means faster processing. Just make sure you have all your documents (W-2, 1099, etc.) before you file.',
        ],
        keyRates: [
          { label: 'Standard Deduction (Single)', value: '$15,000' },
          { label: 'Standard Deduction (Married)', value: '$30,000' },
          { label: 'Child Tax Credit', value: '$2,000/child' },
          { label: 'Refundable Portion', value: 'Up to $1,700' },
          { label: 'EIC Max (3+ children)', value: '$7,430' },
        ],
        faqs: TAX_REFUND_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
        ],
      };
    case 'irs-withholding':
      return {
        howItWorks: [
          'Your employer withholds federal income tax from every paycheck based on your W-4 settings. Too little withholding means a surprise tax bill (and possibly penalties) in April. Too much means you\'ve been giving the government an interest-free loan all year. This calculator finds the sweet spot using <a href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer nofollow">IRS Publication 15-T</a> methodology and 2026 tax brackets.',
          'Here\'s how federal withholding works: your employer takes your gross pay per paycheck, subtracts pre-tax deductions (401(k), HSA, commuter benefits), and multiplies by the number of pay periods to annualize your wages. Then they subtract the standard deduction ($15,000 single, $30,000 married, $22,500 head of household) and apply the progressive federal brackets (10%–37%). The result is divided by your pay periods to get the per-paycheck withholding amount.',
          'FICA is separate from federal income tax withholding and is not affected by your W-4. Social Security takes 6.2% of wages up to $176,100, and Medicare takes 1.45% on all wages plus 0.9% additional Medicare above $200,000 (single) or $250,000 (married). Your total paycheck deduction is federal withholding + FICA + pre-tax deductions.',
          'The modern W-4 (2020 and later) doesn\'t use allowances anymore. Instead: Step 1 is filing status, Step 2 handles multiple jobs, Step 3 claims dependents ($2,000 credit per child), and Step 4 lets you add extra withholding (4c) or report other income (4a) and deductions (4b). If you\'re under-withheld, add the extra amount to Step 4(c) — this calculator tells you exactly how much.',
          'A real example: single filer, $75,000/year, bi-weekly pay. Federal withholding should be about $335 per paycheck. If you\'re currently having $250 withheld, you\'d owe roughly $2,210 at tax time plus potential penalties. Add $85 to Step 4(c) of your W-4 and you\'re covered.',
        ],
        keyRates: [
          { label: 'Standard Deduction (Single)', value: '$15,000' },
          { label: 'Standard Deduction (Married)', value: '$30,000' },
          { label: 'SS Wage Cap', value: '$176,100' },
          { label: 'Additional Medicare', value: '0.9% above $200K/$250K' },
          { label: 'Dependent Credit', value: '$2,000 per dependent' },
        ],
        faqs: IRS_WITHHOLDING_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'sales-tax':
      return {
        howItWorks: [
          'Sales tax is a consumption tax added to the price of goods and certain services at the point of sale. The rate you pay is the <strong>combined rate</strong> — the state base rate plus any local taxes from your county, city, or special district. This calculator uses average combined rates for all 50 US states with detailed state + local breakdowns.',
          'The formula is straightforward: <strong>Tax = Purchase Price × Combined Rate</strong>. A $1,000 purchase at 8.82% combined rate (California) = $88.20 in sales tax, for a total of $1,088.20. The state portion is $72.50 (7.25%) and the average local portion is $15.70 (1.57%). Four states — <strong>Delaware, Montana, New Hampshire, and Oregon</strong> — charge 0% state sales tax. Alaska has no state sales tax but allows local taxes.',
          'Need to work backwards? The <strong>reverse sales tax formula</strong> divides the total by (1 + tax rate) to find the original price. A $1,088.20 total with 8.82% tax = $1,088.20 ÷ 1.0882 = $1,000.00 original price. This is essential for expense reports and budgeting.',
          'Many states exempt certain necessities from sales tax. <strong>Groceries</strong> are exempt in most states. <strong>Prescription drugs</strong> are exempt nearly everywhere. A few states — Connecticut, Massachusetts, Minnesota, New Jersey, New York, and Pennsylvania — also exempt <strong>clothing</strong> purchases from sales tax. This calculator handles tax-exempt items by state.',
        ],
        keyRates: [
          { label: 'CA Combined Rate', value: '8.82% (7.25% + 1.57% local)' },
          { label: 'TX Combined Rate', value: '8.20% (6.25% + 1.95% local)' },
          { label: 'NY Combined Rate', value: '8.52% (4% + 4.52% local)' },
          { label: 'FL Combined Rate', value: '7.02% (6% + 1.02% local)' },
          { label: 'IL Combined Rate', value: '8.86% (6.25% + 2.61% local)' },
          { label: 'No Sales Tax States', value: 'DE, MT, NH, OR (AK: local only)' },
        ],
        faqs: SALES_TAX_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'compare', label: 'State Comparison' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
        ],
      };
    case 'overtime-tax':
      return {
        howItWorks: [
          "The 2025 Trump tax law — officially the 'One Big Beautiful Bill Act' — created a federal income tax exemption for overtime pay. If you're a non-exempt hourly worker earning time-and-a-half for hours beyond 40 per week, that overtime pay is no longer subject to federal income tax for tax years 2025 through 2028. This calculator shows you exactly how much you save compared to the old rules where overtime was taxed like any other income.",
          "Here's the important distinction: the exemption only covers <strong>federal income tax</strong>. FICA taxes — 6.2% for Social Security (up to the $176,100 wage cap) and 1.45% for Medicare (no cap) — still apply to your overtime pay. And most states have not conformed to the federal exemption, so your state will likely still tax overtime as regular income. The nine states with no income tax (Texas, Florida, Washington, Nevada, etc.) are the exception — they don't tax any income, overtime or otherwise.",
          "The math is straightforward: your overtime pay equals overtime hours × hourly rate × 1.5. Under the old rules, that pay was added to your total income and taxed at your marginal bracket (anywhere from 10% to 37%). Under the new exemption, that portion skips federal income tax entirely. For a worker earning $30/hour with 10 weekly overtime hours in the 22% bracket, that's roughly $5,130 in annual federal tax savings. The higher your bracket and the more overtime you work, the bigger the benefit.",
          "A few things to keep in mind: the exemption applies only to FLSA-defined overtime pay (1.5x rate for hours over 40/week). Bonuses, shift differentials, and premium pay that aren't tied to the 1.5x overtime rule don't qualify. And this law sunsets after December 31, 2028 — unless Congress extends it, overtime will be fully taxable again starting in 2029.",
        ],
        keyRates: [
          { label: 'OT Federal Income Tax Rate', value: '0% (exempted 2025–2028)' },
          { label: 'Minimum OT Pay Rate', value: '1.5x regular hourly rate' },
          { label: 'FICA on Overtime', value: 'Still applies (7.65%)' },
          { label: 'Law Sunset Date', value: 'December 31, 2028' },
          { label: 'State Tax on OT', value: 'Most states still tax it' },
        ],
        faqs: OVERTIME_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'irs-withholding-calculator', label: 'IRS Withholding Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'bonus-tax':
      return {
        howItWorks: [
          "Bonuses feel great until you see the tax withholding. The IRS classifies bonuses as 'supplemental wages' — income paid in addition to your regular salary — and your employer can use one of two methods to withhold federal income tax on them. The <strong>Percentage Method</strong> applies a flat 22% rate (37% on any amount above $1 million). The <strong>Aggregate Method</strong> adds your bonus to your regular paycheck and runs the total through normal progressive brackets (10%–37%), then subtracts the tax on regular wages alone. This calculator shows you both results side by side.",
          "Here's why the method matters: a $5,000 bonus for a single filer earning $75,000 per year. Under the 22% flat method, federal withholding is $1,100. Under the aggregate method, your employer adds the bonus to one paycheck (say, $2,885 regular + $5,000 = $7,885), annualizes that ($205,010), calculates tax on the total, subtracts tax on regular wages alone, and divides by pay periods. The result could be higher or lower depending on which bracket the bonus income falls into.",
          "The flat 22% rate is a great deal if you're in the 24% bracket or above — you're paying less federal tax on the bonus than on your regular wages. But if you're in the 12% bracket, the aggregate method saves you money because your bonus gets taxed at around 12% instead of a flat 22%. At the 22% bracket, it's roughly a wash. This calculator does the math for both methods so you can see the exact difference for your situation.",
          "Regardless of which method your employer uses for federal income tax, <a href='/glossary'>FICA</a> always applies to bonuses: 6.2% for Social Security (up to the $176,100 wage cap in 2026) and 1.45% for Medicare (no cap). If your total income exceeds $200,000, add 0.9% more for the Additional Medicare Tax on wages above that threshold. State income tax also applies to bonuses — and unlike federal tax, there's no flat rate option at the state level.",
          "One common misconception: people think bonuses are 'taxed higher' than regular income. The reality is that withholding on bonuses can be higher than necessary (especially with the 22% flat method for lower-bracket earners), but when you file your tax return, the bonus is just part of your total income and gets the same bracket treatment. If too much was withheld, you get it back as a refund. The key insight: the 22% flat rate is optional for employers, and knowing which method they use helps you understand your pay stub.",
        ],
        keyRates: [
          { label: 'Supplemental Rate (under $1M)', value: '22% flat federal' },
          { label: 'Supplemental Rate (above $1M)', value: '37% on the excess' },
          { label: 'FICA — Social Security', value: '6.2% (up to $176,100)' },
          { label: 'FICA — Medicare', value: '1.45% (no cap)' },
          { label: 'Additional Medicare', value: '0.9% above $200K' },
        ],
        faqs: BONUS_TAX_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'irs-withholding-calculator', label: 'IRS Withholding Calculator' },
          { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'lottery-tax':
      return {
        howItWorks: [
          "Winning the lottery feels like a dream until you see the tax bill. Lottery winnings are taxed as <strong>ordinary income</strong> — there's no special 'lottery tax rate.' The IRS treats that jackpot the same as a massive salary, running it through the same progressive brackets from 10% to 37%. On a $1,000,000 lump sum, a single filer would owe roughly $300,000+ in federal tax alone after the $15,000 standard deduction. The effective rate typically lands around 30–33% for large prizes.",
          "Here's the biggest surprise for most winners: <strong>lottery winnings are NOT subject to FICA</strong>. No 6.2% Social Security tax, no 1.45% Medicare tax, no 0.9% Additional Medicare Tax. That's a 7.65%+ savings compared to earning the same amount as wages. On a $500,000 lump sum, that's over $38,000 you don't have to pay. This is one of the few genuine tax advantages of winning the lottery versus earning the same amount through work.",
          "The IRS requires <strong>24% mandatory federal withholding</strong> on gambling winnings over $5,000 — the lottery commission deducts this automatically before you see a dime. But 24% is just the withholding, not your actual tax. If you're in the 32%, 35%, or 37% bracket (which you probably are with a big win), you'll owe the difference when you file your return. On a $500,000 prize, 24% withholding is $120,000, but if your actual federal tax is $155,000, you'll owe an extra $35,000 at tax time. Many winners are caught off guard by this.",
          "The <strong>lump sum vs annuity</strong> decision has major tax implications. The advertised jackpot (say $1,000,000) is the annuity value — paid over 30 years. The lump sum is typically only 50–60% of that ($500,000–$600,000). With a lump sum, all income hits in one year, pushing you into the top bracket. With an annuity, each year's payment is smaller and potentially taxed at a lower rate. But the annuity also means waiting 30 years for your money and facing tax rate uncertainty. This calculator shows both scenarios so you can compare total take-home amounts.",
          "State tax makes a huge difference. Nine states have <strong>no income tax at all</strong>: Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska, Tennessee, and New Hampshire. Win in one of those states and you save thousands. California and Pennsylvania exempt in-state lottery winnings from state tax. But Illinois (4.95% flat) and New York (up to 10.9% + NYC tax) take a big cut. On a $500,000 win, the state tax difference between Texas ($0) and New York (~$40,000) is massive.",
        ],
        keyRates: [
          { label: 'Federal Tax Brackets', value: '10% – 37% (progressive)' },
          { label: 'FICA on Lottery Winnings', value: '0% (NOT subject to FICA)' },
          { label: 'Mandatory Withholding', value: '24% (on winnings over $5,000)' },
          { label: 'Lump Sum Cash Value', value: 'Typically 50–60% of jackpot' },
          { label: 'Annuity Period', value: '30 years' },
          { label: 'No Income Tax States', value: 'TX, FL, WA, NV, WY, SD, AK, TN, NH' },
        ],
        faqs: LOTTERY_TAX_FAQS,
        relatedCalculators: [
          { slug: 'bonus-tax-calculator', label: 'Bonus Tax Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
        ],
      };
    case 'property-tax':
      return {
        howItWorks: [
          "Property tax is the bill you pay for owning real estate — and depending on where you live, it can be one of your biggest annual expenses. The calculation is straightforward: your home's value multiplied by your area's effective property tax rate. A $350,000 home at 1.78% (Illinois) means $6,230 per year. Same home in Hawaii at 0.31%? Just $1,085. That's a $5,145 difference for the exact same house value. Location matters enormously.",
          "This calculator uses average <strong>effective property tax rates</strong> for all 50 states plus DC. Effective rate is the percentage of your home's market value that you actually pay in tax — it already accounts for assessment ratios, mill rates, and local adjustments. It's the most practical way to compare states because you just plug in your home value and get the real number. The actual rate you pay depends on your specific county, city, and school district, but these averages give you a solid estimate.",
          "The range across the US is staggering. <a href='https://www.nj.gov/treasury/' target='_blank' rel='noopener noreferrer nofollow'>New Jersey</a> tops the list at 2.49% — on a $400,000 home that's nearly $10,000 a year. Hawaii sits at the bottom at 0.31%. The Northeast and Midwest tend to have the highest rates, while the South and Mountain West are generally lower. But here's the thing: states with no income tax (like Texas at 1.71% and New Hampshire at 2.06%) often compensate with higher property taxes. It's a shell game — the money comes from somewhere.",
          "If you're in Florida, South Carolina, or several other states, a <strong>homestead exemption</strong> can knock thousands off your taxable value. Florida's exemption removes up to $50,000 from your assessed value, and the Save Our Homes cap limits annual assessment increases to 3%. Over a decade of rising home values, that cap saves you serious money as your taxable value falls further and further behind market value. This calculator lets you toggle homestead exemptions and add custom exemptions to see the exact impact.",
          "Bottom line: property tax is a local tax with national consequences. It affects where people choose to live, whether they can afford to stay in their homes, and how much house they can buy. A 1% rate difference on a $400K home is $4,000 a year — $333 a month. That's a car payment. Run the numbers for your state, compare it to others, and factor it into your housing budget from day one.",
        ],
        keyRates: [
          { label: 'Highest Rate', value: 'New Jersey 2.49%' },
          { label: 'Lowest Rate', value: 'Hawaii 0.31%' },
          { label: 'US Average', value: '~1.1% effective rate' },
          { label: 'FL Homestead Exemption', value: 'Up to $50,000' },
          { label: 'States Covered', value: 'All 50 states + DC' },
        ],
        faqs: PROPERTY_TAX_FAQS,
        relatedCalculators: [
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'sales-tax-calculator', label: 'Sales Tax Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    default:
      return {
        howItWorks: [
          'This calculator figures out your take-home pay after federal tax, FICA, and state income tax. Enter your gross salary, pick your state and filing status, and add any pre-tax deductions like 401(k) or HSA contributions if you have them.',
          'The results break down exactly where your money goes — every deduction, your effective tax rate, and your marginal rate. Pretty straightforward.',
        ],
        keyRates: [],
        faqs: HOME_FAQS,
        relatedCalculators: [],
      };
  }
}

// ─── Related Blog Posts by Calculator Type ────────────────────────────────────

const CALCULATOR_BLOG_SLUGS: Record<string, string[]> = {
  home: ['2026-federal-tax-brackets-explained', 'how-fica-taxes-work-2026'],
  illinois: ['illinois-income-tax-guide-2026', '2026-federal-tax-brackets-explained'],
  texas: ['why-texas-has-no-income-tax', 'florida-vs-texas-tax-comparison'],
  florida: ['florida-vs-texas-tax-comparison', 'why-texas-has-no-income-tax'],
  california: ['florida-vs-texas-tax-comparison', 'how-fica-taxes-work-2026'],
  newyork: ['how-fica-taxes-work-2026', '2026-federal-tax-brackets-explained'],
  mortgage: ['2026-federal-tax-brackets-explained'],
  retirement: ['how-fica-taxes-work-2026', '2026-federal-tax-brackets-explained'],
  relocation: ['florida-vs-texas-tax-comparison', 'why-texas-has-no-income-tax'],
  'capital-gains': ['how-fica-taxes-work-2026', '2026-federal-tax-brackets-explained'],
  'self-employment': ['how-fica-taxes-work-2026'],
};

// ─── Helper: Other States for Comparison ──────────────────────────────────────

function getOtherStates(currentState: string) {
  const states = [
    { slug: 'illinois-tax-calculator', name: 'Illinois', rate: '4.95%', key: 'illinois' },
    { slug: 'texas-tax-calculator', name: 'Texas', rate: '0%', key: 'texas' },
    { slug: 'florida-tax-calculator', name: 'Florida', rate: '0%', key: 'florida' },
    { slug: 'california-tax-calculator', name: 'California', rate: '1%–13.3%', key: 'california' },
    { slug: 'new-york-tax-calculator', name: 'New York', rate: '4%–10.9%', key: 'newyork' },
  ];
  return states.filter(s => s.key !== currentState);
}

// ─── Helper: FAQ Heading per Calculator Type ───────────────────────────────────

function getFaqHeading(type: string): string {
  switch (type) {
    case 'home': return 'Paycheck Calculator FAQ';
    case 'illinois': return 'Illinois Tax Calculator FAQ';
    case 'texas': return 'Texas Tax Calculator FAQ';
    case 'florida': return 'Florida Tax Calculator FAQ';
    case 'california': return 'California Tax Calculator FAQ';
    case 'newyork': return 'New York Tax Calculator FAQ';
    case 'mortgage': return 'Mortgage Calculator FAQ';
    case 'retirement': return '401(k) Retirement Calculator FAQ';
    case 'relocation': return 'Relocation Calculator FAQ';
    case 'capital-gains': return 'Capital Gains Tax FAQ';
    case 'self-employment': return 'Self-Employment Tax FAQ';
    case 'tax-refund': return 'Tax Refund Calculator FAQ';
    case 'irs-withholding': return 'IRS Withholding Calculator FAQ';
    case 'sales-tax': return 'Sales Tax Calculator FAQ';
    case 'overtime-tax': return 'No Tax on Overtime Calculator FAQ';
    case 'bonus-tax': return 'Bonus Tax Calculator FAQ';
    case 'lottery-tax': return 'Lottery Tax Calculator FAQ';
    case 'property-tax': return 'Property Tax Calculator FAQ';
    case 'income-tax': return 'Income Tax Calculator FAQ';
    case 'tax-calc': return 'Tax Calculator FAQ';
    default: return 'Frequently Asked Questions';
  }
}

// ─── Helper: Next Steps CTA Links ─────────────────────────────────────────────

function getNextSteps(type: string): { href: string; icon: string; title: string; description: string }[] {
  switch (type) {
    case 'home':
    case 'illinois':
    case 'texas':
    case 'florida':
    case 'california':
    case 'newyork':
      return [
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Reduce taxable income with pre-tax contributions' },
        { href: '/compare', icon: '\u{1F4CA}', title: 'Compare States', description: 'See how your take-home compares across states' },
        { href: '/self-employment-tax-calculator', icon: '\u{1F4BC}', title: 'Self-Employment Tax', description: 'Freelancer? Calculate your SE tax' },
        { href: '/salary', icon: '\u{1F4B0}', title: 'Salary After Tax', description: 'Take-home pay for every salary level' },
      ];
    case 'mortgage':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'See if you can afford the monthly payment' },
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Balance mortgage vs retirement savings' },
        { href: '/relocation-calculator', icon: '\u{1F3E0}', title: 'Relocation Calculator', description: 'Compare housing costs across states' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Tax on selling your previous home' },
      ];
    case 'retirement':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'See how 401(k) contributions affect take-home' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Tax implications of investment gains' },
        { href: '/mortgage-calculator', icon: '\u{1F3E0}', title: 'Mortgage Calculator', description: 'Will your home be paid off by retirement?' },
        { href: '/federal-tax-brackets', icon: '\u{1F4CB}', title: 'Tax Brackets 2026', description: 'Understand your marginal rate in retirement' },
      ];
    case 'capital-gains':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Your ordinary income affects capital gains rates' },
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Tax-deferred growth vs taxable gains' },
        { href: '/self-employment-tax-calculator', icon: '\u{1F4BC}', title: 'Self-Employment Tax', description: 'SE income + capital gains = higher rates?' },
        { href: '/glossary', icon: '\u{1F4D6}', title: 'Tax Glossary', description: 'Key terms: NIIT, cost basis, holding period' },
      ];
    case 'self-employment':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Compare W-2 vs 1099 take-home pay' },
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: 'Solo 401(k) Planner', description: 'Reduce SE tax with retirement contributions' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Investment income on top of SE income' },
        { href: '/blog', icon: '\u{1F4DD}', title: 'Tax Guides', description: 'Deductions, quarterly payments, and more' },
      ];
    case 'tax-refund':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'See how withholding affects your take-home' },
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Reduce your tax bill with pre-tax contributions' },
        { href: '/self-employment-tax-calculator', icon: '\u{1F4BC}', title: 'Self-Employment Tax', description: 'Estimate SE tax and quarterly payments' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Investment gains can affect your refund' },
      ];
    case 'irs-withholding':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Full take-home pay breakdown by state' },
        { href: '/tax-refund-calculator', icon: '\u{1F4B0}', title: 'Tax Refund Calculator', description: 'Estimate your refund or amount owed' },
        { href: '/401k-retirement-calculator', icon: '\u{1F3E6}', title: '401(k) Planner', description: 'Reduce withholding with pre-tax contributions' },
        { href: '/self-employment-tax-calculator', icon: '\u{1F4BC}', title: 'Self-Employment Tax', description: 'Quarterly estimated tax payments' },
      ];
    case 'relocation':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Full breakdown for any state' },
        { href: '/compare', icon: '\u{1F4CA}', title: 'State Comparison', description: 'Side-by-side tax comparison' },
        { href: '/mortgage-calculator', icon: '\u{1F3E0}', title: 'Mortgage Calculator', description: 'Housing costs in your new state' },
        { href: '/salary', icon: '\u{1F4B0}', title: 'Salary After Tax', description: 'Take-home for every salary level' },
      ];
    case 'overtime-tax':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Full take-home pay breakdown' },
        { href: '/irs-withholding-calculator', icon: '\u{1F4CB}', title: 'IRS Withholding', description: 'Optimize your W-4 for OT pay' },
        { href: '/self-employment-tax-calculator', icon: '\u{1F4BC}', title: 'Self-Employment Tax', description: 'SE tax and quarterly estimates' },
        { href: '/salary', icon: '\u{1F4B0}', title: 'Salary After Tax', description: 'Take-home pay for every salary' },
      ];
    case 'bonus-tax':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Full take-home pay breakdown by state' },
        { href: '/irs-withholding-calculator', icon: '\u{1F4CB}', title: 'IRS Withholding', description: 'Optimize your W-4 for bonus pay' },
        { href: '/tax-refund-calculator', icon: '\u{1F4B0}', title: 'Tax Refund Calculator', description: 'Bonus withholding affects your refund' },
        { href: '/self-employment-tax-calculator', icon: '\u{1F4BC}', title: 'Self-Employment Tax', description: 'SE tax and quarterly estimates' },
      ];
    case 'lottery-tax':
      return [
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'Compare with regular wage income tax' },
        { href: '/bonus-tax-calculator', icon: '\u{1F381}', title: 'Bonus Tax Calculator', description: 'Tax on supplemental wages vs lottery' },
        { href: '/capital-gains-calculator', icon: '\u{1F4C8}', title: 'Capital Gains Tax', description: 'Investment income tax rates' },
        { href: '/tax-refund-calculator', icon: '\u{1F4B0}', title: 'Tax Refund Calculator', description: 'Withholding may affect your refund' },
      ];
    case 'property-tax':
      return [
        { href: '/mortgage-calculator', icon: '\u{1F3E0}', title: 'Mortgage Calculator', description: 'Property tax is part of your monthly payment' },
        { href: '/relocation-calculator', icon: '\u{1F4CA}', title: 'Relocation Calculator', description: 'Compare total tax burden across states' },
        { href: '/paycheck-calculator', icon: '\u{1F4B5}', title: 'Paycheck Calculator', description: 'See your full take-home pay by state' },
        { href: '/sales-tax-calculator', icon: '\u{1F4B3}', title: 'Sales Tax Calculator', description: 'Another tax that varies by state' },
      ];
    default:
      return [
        { href: '/compare', icon: '\u{1F4CA}', title: 'Compare States', description: 'Side-by-side tax comparison' },
        { href: '/salary', icon: '\u{1F4B0}', title: 'Salary After Tax', description: 'Take-home pay by salary level' },
        { href: '/glossary', icon: '\u{1F4D6}', title: 'Tax Glossary', description: 'Key tax terms explained' },
        { href: '/blog', icon: '\u{1F4DD}', title: 'Tax Guides', description: 'Expert tips and guides' },
      ];
  }
}

// ─── Server Component Page ────────────────────────────────────────────────────

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ calculator: string }>;
}) {
  const { calculator } = await params;
  const config = SLUG_TO_CONFIG[calculator];

  if (!config) {
    notFound();
  }

  const jsonLd = getJsonLdForType(config.jsonLdType);
  const content = getCalculatorContent(config.jsonLdType);

  // Fetch related blog posts from KV database
  const blogSlugs = CALCULATOR_BLOG_SLUGS[config.jsonLdType] ?? [];
  let relatedPosts: { slug: string; title: string; excerpt: string | null }[] = [];
  try {
    const allPosts = await getAllPosts();
    relatedPosts = allPosts
      .filter((p) => blogSlugs.includes(p.slug))
      .map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt || null }));
  } catch {
    // KV not available — skip related posts
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data — Server Rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb — Semantic HTML for SEO */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-foreground font-medium">{config.breadcrumbLabel}</span>
      </nav>

      {/* H1 — Semantic for SEO */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {config.h1}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          {config.description}
        </p>
      </div>

      {/* Client-Side Calculator */}
      <CalculatorClientPage componentKey={config.componentKey} />

      {/* Next Steps */}
      <section className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          More {config.h1} Tools &amp; Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {getNextSteps(config.componentKey).map((step) => (
            <Link
              key={step.href}
              href={step.href}
              className="flex items-start gap-2 rounded-lg p-2 hover:bg-emerald-500/10 transition-colors"
            >
              <span>{step.icon}</span>
              <div>
                <span className="text-sm font-medium text-foreground">{step.title}</span>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Server-Rendered Content for SEO ───────────────────────────────── */}
      <div className="mt-12 space-y-10">
        {/* How This Calculator Works */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How the {config.h1} Works
          </h2>
          <div className="space-y-4">
            {content.howItWorks.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br/>') }} />
            ))}
          </div>
        </section>

        {/* Key Rates & Data */}
        {content.keyRates.length > 0 && (
          <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {config.h1} — Key Rates & Data for 2026
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.keyRates.map((rate) => (
                <div
                  key={rate.label}
                  className="rounded-lg border border-border/30 bg-card/60 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {rate.label}
                  </p>
                  <p className="text-base font-bold text-foreground">
                    {rate.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Frequently Asked Questions */}
        {content.faqs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {getFaqHeading(config.componentKey)}
            </h2>
            <div className="space-y-3">
              {content.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                    <h3 className="text-sm sm:text-base">{faq.question}</h3>
                    <svg
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Related Articles
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-lg border border-border/30 bg-card/60 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                >
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-emerald-400 transition-colors mb-1">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Calculators */}
        {content.relatedCalculators.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Related Calculators
            </p>
            <div className="flex flex-wrap gap-3">
              {content.relatedCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {calc.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Compare with Other States */}
        {['illinois', 'texas', 'florida', 'california', 'newyork'].includes(config.componentKey) && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Compare with Other States
            </p>
            <div className="flex flex-wrap gap-2">
              {getOtherStates(config.componentKey).map((state) => (
                <Link
                  key={state.slug}
                  href={`/${state.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-sm hover:bg-accent/50 transition-colors"
                >
                  {state.name}
                  <span className="text-xs text-muted-foreground">({state.rate})</span>
                </Link>
              ))}
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              >
                All State Comparisons →
              </Link>
            </div>
          </section>
        )}

        {/* Next Steps — contextual CTAs linking to salary and other tools */}
        <section className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 p-6 sm:p-8">
          <p className="text-lg font-semibold text-foreground mb-4">
            Next Steps
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/salary" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">💰</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Salary After Tax</span>
                <p className="text-xs text-muted-foreground mt-0.5">See take-home pay for $30K–$500K across all 5 states</p>
              </div>
            </Link>
            <Link href="/compare" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📊</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Compare States</span>
                <p className="text-xs text-muted-foreground mt-0.5">Side-by-side tax comparison for any two states</p>
              </div>
            </Link>
            <Link href="/relocation-calculator" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">🏠</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Relocation Calculator</span>
                <p className="text-xs text-muted-foreground mt-0.5">Salary you&apos;d need if you move to another state</p>
              </div>
            </Link>
            <Link href="/401k-retirement-calculator" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📈</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">401(k) Calculator</span>
                <p className="text-xs text-muted-foreground mt-0.5">Project your retirement savings with compound growth</p>
              </div>
            </Link>
            <Link href="/glossary" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📖</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Tax Glossary</span>
                <p className="text-xs text-muted-foreground mt-0.5">Key tax terms explained in plain English</p>
              </div>
            </Link>
            <Link href="/federal-tax-brackets" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📋</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Tax Brackets 2026</span>
                <p className="text-xs text-muted-foreground mt-0.5">Full federal bracket breakdown with examples</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Explore More Tools */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <p className="text-lg font-semibold text-foreground mb-4">
            Explore More Tools
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link href="/compare" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📊 Compare States</span>
              <span className="text-xs text-muted-foreground">Side-by-side tax comparison</span>
            </Link>
            <Link href="/salary" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">💰 Salary After Tax</span>
              <span className="text-xs text-muted-foreground">Take-home for $30K–$500K</span>
            </Link>
            <Link href="/federal-tax-brackets" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📋 Tax Brackets 2026</span>
              <span className="text-xs text-muted-foreground">Federal brackets & rates</span>
            </Link>
            <Link href="/glossary" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📖 Tax Glossary</span>
              <span className="text-xs text-muted-foreground">Key terms explained</span>
            </Link>
            <Link href="/blog" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📝 Tax Guides & Blog</span>
              <span className="text-xs text-muted-foreground">Expert tax tips & guides</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
