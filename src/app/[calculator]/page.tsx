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
  FAQItem,
} from '@/lib/faq-data';
import { CalculatorClientPage } from './calculator-client-page';

// ─── Static Params for Build ─────────────────────────────────────────────────

export function generateStaticParams(): { calculator: string }[] {
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
    return { title: 'Calculator Not Found | TaxYield.io' };
  }

  const baseUrl = 'https://taxyield.io';

  return {
    title: config.metaTitle,
    description: config.metaDesc,
    keywords: config.keywords,
    authors: [{ name: 'TaxYield.io' }],
    alternates: {
      canonical: `${baseUrl}${config.canonicalPath}`,
      languages: {
        'en-US': `${baseUrl}${config.canonicalPath}`,
        'x-default': `${baseUrl}${config.canonicalPath}`,
      },
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      url: `${baseUrl}${config.canonicalPath}`,
      siteName: 'TaxYield.io',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}${config.canonicalPath}/opengraph-image`,
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
      images: [`${baseUrl}${config.canonicalPath}/opengraph-image`],
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
        url: 'https://taxyield.io/paycheck-calculator',
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
            { '@type': 'ListItem', position: 2, name: 'Paycheck Calculator', item: 'https://taxyield.io/paycheck-calculator' },
          ],
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'TaxYield Paycheck Calculator',
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'Illinois Paycheck Calculator', item: 'https://taxyield.io/illinois-tax-calculator' },
      ]},
      { '@type': 'WebApplication', name: 'Illinois Paycheck Calculator 2026', url: 'https://taxyield.io/illinois-tax-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'Texas Paycheck Calculator', item: 'https://taxyield.io/texas-tax-calculator' },
      ]},
      { '@type': 'WebApplication', name: 'Texas Paycheck Calculator 2026', url: 'https://taxyield.io/texas-tax-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'Florida Paycheck Calculator', item: 'https://taxyield.io/florida-tax-calculator' },
      ]},
      { '@type': 'WebApplication', name: 'Florida Paycheck Calculator 2026', url: 'https://taxyield.io/florida-tax-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'California Paycheck Calculator', item: 'https://taxyield.io/california-tax-calculator' },
      ]},
      { '@type': 'WebApplication', name: 'California Paycheck Calculator 2026', url: 'https://taxyield.io/california-tax-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'New York Paycheck Calculator', item: 'https://taxyield.io/new-york-tax-calculator' },
      ]},
      { '@type': 'WebApplication', name: 'New York Paycheck Calculator 2026', url: 'https://taxyield.io/new-york-tax-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator', item: 'https://taxyield.io/mortgage-calculator' },
      ]},
      { '@type': 'WebApplication', name: 'Mortgage Calculator with Extra Payments', url: 'https://taxyield.io/mortgage-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: '401(k) Retirement Projection', item: 'https://taxyield.io/401k-retirement-calculator' },
      ]},
      { '@type': 'WebApplication', name: '401(k) Retirement Projection Calculator 2026', url: 'https://taxyield.io/401k-retirement-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'MathSolver', name: '401(k) Compound Growth Solver', description: 'Computes projected 401(k) balance using annual contributions + employer match with compound annual growth.', mathExpression: 'B(n) = Σ C_annual × (1 + r)^(n-i)' },
    ],
  };
}

function getRelocationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'Salary Relocation Calculator', item: 'https://taxyield.io/relocation-calculator' },
      ]},
      { '@type': 'WebApplication', name: 'Salary Relocation Calculator 2026', url: 'https://taxyield.io/relocation-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    ],
  };
}

function getCapitalGainsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'Capital Gains Tax Calculator', item: 'https://taxyield.io/capital-gains-calculator' },
      ]},
      { '@type': 'WebApplication', name: 'Capital Gains Tax Calculator 2026', url: 'https://taxyield.io/capital-gains-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        { '@type': 'ListItem', position: 2, name: 'Self-Employment Tax Calculator', item: 'https://taxyield.io/self-employment-tax-calculator' },
      ]},
      { '@type': 'WebApplication', name: 'Self-Employment Tax Calculator 2026', url: 'https://taxyield.io/self-employment-tax-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'What is the self-employment tax rate for 2026?', acceptedAnswer: { '@type': 'Answer', text: 'The self-employment tax rate is 15.3% on 92.35% of net business income: 12.4% for Social Security and 2.9% for Medicare.' } },
      ]},
      faqsToJsonLd(SELF_EMPLOYMENT_FAQS),
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
          'This paycheck calculator computes your net take-home pay after all mandatory deductions. It starts with your gross salary and applies the federal progressive tax brackets (10% through 37%) based on your filing status and the 2026 standard deductions ($15,000 for single, $30,000 for married filing jointly).',
          'Next, FICA taxes are calculated: Social Security at 6.2% on income up to the $176,100 wage cap, and Medicare at 1.45% on all wages. If your income exceeds $200,000, an Additional Medicare Tax of 0.9% applies to the excess amount.',
          'State income tax is then applied based on the state you select. You can choose from five states: Illinois (4.95% flat), Texas (0%), Florida (0%), California (1%–13.3% progressive), and New York (4%–10.9% progressive plus potential NYC tax). Pre-tax deductions like 401(k) and HSA contributions reduce your federal and state taxable income before those taxes are calculated.',
          'The final result shows your net take-home pay broken down by deduction type, your effective tax rate, and your marginal tax rate — giving you a complete picture of where your money goes.',
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
          { slug: 'california-tax-calculator', label: 'California Calculator' },
        ],
      };
    case 'illinois':
      return {
        howItWorks: [
          'The Illinois paycheck calculator computes your take-home pay after the Illinois 4.95% flat state income tax, federal tax, and FICA deductions. Unlike most states with progressive brackets, Illinois applies a single 4.95% rate to all taxable income regardless of how much you earn.',
          'Illinois provides a personal exemption of $2,775 per person for 2026, which is subtracted from your gross income before the flat tax is applied. For example, on a $75,000 salary: $75,000 minus $2,775 equals $72,225 in taxable income, resulting in Illinois state tax of $3,575.14.',
          'Your federal tax is calculated separately using the progressive bracket system with the standard deduction. FICA taxes (Social Security + Medicare) are applied to your gross income. Pre-tax deductions like 401(k) contributions reduce both your federal and Illinois taxable income.',
          'Note that Illinois does not have a standard deduction — only the personal exemption. However, Illinois does not tax Social Security benefits, 401(k) distributions, IRA withdrawals, or pension income, making it relatively favorable for retirees despite the high property taxes.',
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
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
        ],
      };
    case 'texas':
      return {
        howItWorks: [
          'The Texas paycheck calculator computes your take-home pay after federal tax and FICA deductions — with zero state income tax. Texas is one of nine U.S. states that does not levy a personal income tax on wages, which is enshrined in the Texas Constitution.',
          'Since there is no state income tax, your take-home pay in Texas is higher than in most other states at the same salary level. The calculation applies federal progressive tax brackets (10%–37%), the 2026 standard deductions, and FICA taxes (6.2% Social Security + 1.45% Medicare).',
          'However, Texas compensates for the lack of income tax with some of the highest property taxes in the nation. The average effective property tax rate is approximately 1.71%, meaning a $300,000 home generates about $5,130 per year in property taxes. Texas also has a state sales tax of 6.25% (combined with local taxes, averaging 8.2%).',
          'This calculator also shows the property tax and sales tax context for Texas, so you can evaluate your true total tax burden — not just the income tax savings. For renters or those with modest homes, Texas is very tax-efficient. For homeowners with expensive properties, the savings from 0% income tax may be partially offset by high property taxes.',
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
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
        ],
      };
    case 'florida':
      return {
        howItWorks: [
          'The Florida paycheck calculator computes your take-home pay after federal tax and FICA deductions — with zero state income tax. Like Texas, Florida does not levy a personal income tax, making it one of the most tax-friendly states for wage earners.',
          'Since there is no state income tax, your only deductions are federal income tax (using the progressive bracket system with 2026 rates and standard deductions) and FICA taxes (7.65% combined for Social Security and Medicare). This results in a higher net take-home pay compared to states like Illinois, California, or New York.',
          'Florida also offers the Homestead Exemption, which reduces the assessed value of a primary residence by up to $50,000 for property tax purposes. Combined with a relatively low average effective property tax rate of 0.86%, Florida has a significantly lower overall tax burden than Texas for homeowners, despite both states having 0% income tax.',
          'Florida relies on a 6% state sales tax (averaging 7% combined with local surtaxes) and tourism-related taxes to fund government services. There is no estate tax or inheritance tax, and retirement income including Social Security, 401(k), IRA, and pension income is not taxed.',
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
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
        ],
      };
    case 'california':
      return {
        howItWorks: [
          'The California paycheck calculator computes your take-home pay after California\'s progressive state income tax (1%–13.3%), federal tax, and FICA deductions. California has the highest top marginal state income tax rate in the nation at 13.3%, which applies to taxable income above $698,271 for single filers.',
          'California uses a progressive bracket system with 9 tax brackets. For 2026, the California standard deduction is $6,083 for single filers and $12,166 for married filing jointly. Your taxable income after the standard deduction is run through the brackets, with each portion taxed at its corresponding rate.',
          'Your federal tax is calculated separately using the federal progressive brackets and standard deduction ($15,000 single / $30,000 married). FICA taxes (7.65%) apply to your gross income. Pre-tax deductions like 401(k) contributions reduce both your federal and California taxable income.',
          'Despite the high income tax rates, California has a relatively low average effective property tax rate (~0.71%) thanks to Proposition 13, which caps annual assessed value increases at 2%. However, the high cost of housing in California means the dollar amount paid in property taxes is still significant. California does not tax Social Security benefits.',
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
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
        ],
      };
    case 'newyork':
      return {
        howItWorks: [
          'The New York paycheck calculator computes your take-home pay after New York\'s progressive state income tax (4%–10.9%), potential NYC income tax (3.078%–3.876%), federal tax, and FICA deductions. New York has one of the highest combined state and local income tax burdens in the nation.',
          'New York uses a progressive bracket system with 9 tax brackets. For 2026, the New York standard deduction is $8,100 for single filers and $16,200 for married filing jointly — higher than California\'s standard deduction. The top marginal rate of 10.9% applies to taxable income above $25,000,000.',
          'If you live in New York City, you pay an additional city income tax ranging from 3.078% to 3.876% depending on your income level. This calculator includes the NYC tax as an option. For a $100,000 salary, a NYC resident would pay approximately $3,400 in city tax on top of the state tax, resulting in the highest combined state + local income tax burden in the United States.',
          'Your federal tax is calculated separately using the progressive brackets and standard deduction. FICA taxes (7.65%) apply to gross income. New York does not tax Social Security benefits and excludes up to $20,000 of qualified retirement income from taxation for taxpayers aged 59½ and older.',
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
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
        ],
      };
    case 'mortgage':
      return {
        howItWorks: [
          'This mortgage calculator uses the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (loan term in years × 12). This formula produces a fixed monthly payment that ensures the loan is fully paid off by the end of the term.',
          'In the early years of a mortgage, most of your payment goes toward interest rather than principal. For example, on a 30-year $280,000 loan at 6.5%, your first payment allocates approximately 85.7% to interest and only 14.3% to principal. This ratio gradually shifts over the life of the loan — by year 15, it is roughly 50/50.',
          'The extra payments feature shows how additional monthly payments accelerate your payoff timeline and reduce total interest. Extra payments go directly toward reducing principal, which means every dollar saves you interest for the remaining life of the loan. Adding $200/month extra on a $280,000 loan at 6.5% can save approximately $76,856 in interest and pay off the loan 5+ years early.',
          'The amortization schedule provides a month-by-month breakdown of each payment, showing how much goes to principal vs. interest, and the remaining balance after each payment. This helps you understand exactly where your money goes over the life of the loan.',
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
        ],
      };
    case 'retirement':
      return {
        howItWorks: [
          'This 401(k) retirement projection calculator estimates your account balance at retirement based on your annual contributions, employer match percentage, expected annual return, and time horizon. It uses compound annual growth to project how your savings will accumulate over time.',
          'The core calculation uses the future value of a series: each year\'s contribution grows at the assumed annual rate for the remaining years until retirement. For example, a contribution made in year 1 grows for the full period, while a contribution made in year 10 grows for fewer years. The sum of all these future values gives your projected balance.',
          'Employer matching is a critical component. A common match structure is 50% of employee contributions up to 6% of salary. For a $100,000 salary with 6% employee contribution ($6,000), the employer adds $3,000 — essentially free money. Always contribute at least enough to capture the full employer match.',
          'The 2026 401(k) contribution limit is $23,500, with an additional $7,500 catch-up contribution for those aged 50+, and an extra $11,250 catch-up for ages 60-63. The calculator assumes a default 7% annual return, which is a common long-term stock market average, but actual returns will vary year to year.',
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
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
        ],
      };
    case 'relocation':
      return {
        howItWorks: [
          'The salary relocation calculator helps you determine the equivalent salary you need in a new state to maintain the same take-home pay you currently earn. It accounts for differences in state income tax rates, standard deductions, and FICA taxes between your current and target state.',
          'The calculation works in two steps. First, it computes your current take-home pay after federal tax, FICA, and your current state\'s income tax. Then, it determines what gross salary in the target state would produce the same net take-home pay, factoring in that state\'s income tax rates and deductions.',
          'For example, if you earn $100,000 in Texas (0% state tax, net take-home ~$79,000), the calculator determines you would need approximately $120,000–$125,000 in California to achieve the same take-home pay, because California\'s progressive income tax (1%–13.3%) takes an additional $5,000–$8,000 from your paycheck compared to Texas.',
          'This tool focuses on income tax differences. For a complete relocation decision, you should also consider property taxes, sales taxes, cost of living differences (especially housing), and quality of life factors. Our state comparison pages provide side-by-side analyses of these additional factors.',
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
          { slug: 'california-tax-calculator', label: 'California Calculator' },
        ],
      };
    case 'capital-gains':
      return {
        howItWorks: [
          'The capital gains tax calculator determines your tax liability on investment gains, distinguishing between short-term and long-term capital gains. Short-term gains (assets held for one year or less) are taxed at your ordinary income tax rate (up to 37%), while long-term gains (assets held for more than one year) benefit from preferential rates of 0%, 15%, or 20%.',
          'For 2026, the 0% long-term capital gains rate applies to taxable income up to $47,025 for single filers ($94,050 married). The 15% rate applies up to $518,900 (single) or $583,750 (married). Above those thresholds, the 20% rate applies. These brackets are based on your total taxable income, not just your capital gains.',
          'The calculator also accounts for the Net Investment Income Tax (NIIT), an additional 3.8% tax on net investment income when your modified adjusted gross income exceeds $200,000 (single) or $250,000 (married). This effectively raises the top long-term capital gains rate from 20% to 23.8%.',
          'The calculator factors in your ordinary income to determine which capital gains bracket you fall into. It also shows tax-saving strategies like tax-loss harvesting, holding periods for preferential rates, and charitable giving of appreciated assets.',
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
        ],
      };
    case 'self-employment':
      return {
        howItWorks: [
          'The self-employment tax calculator computes your total tax obligation as a self-employed individual, including the 15.3% self-employment tax, federal income tax, and applicable state income tax. The SE tax covers both the employer and employee portions of Social Security (12.4%) and Medicare (2.9%).',
          'Self-employment tax is calculated on 92.35% of your net business income — not 100%. This adjustment approximates the employer-half deduction that W-2 employees receive automatically. For example, on $100,000 of net SE income, the SE tax base is $92,350, resulting in SE tax of approximately $14,130.',
          'You can deduct half of your self-employment tax as an above-the-line deduction, which reduces your adjusted gross income (AGI) and lowers your federal and state income tax. On $14,130 of SE tax, you can deduct $7,065 from your income before calculating income tax.',
          'The calculator also estimates quarterly tax payments (due April 15, June 15, September 15, and January 15), which self-employed individuals must make to avoid underpayment penalties. To avoid penalties, you must pay at least 100% of your prior-year tax (110% if AGI exceeded $150,000) or 90% of your current-year tax.',
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
        ],
      };
    default:
      return {
        howItWorks: [
          'This calculator computes your take-home pay after federal tax, FICA, and state income tax deductions. Enter your gross salary, select your state and filing status, and optionally add pre-tax deductions like 401(k) and HSA contributions.',
        ],
        keyRates: [],
        faqs: HOME_FAQS,
        relatedCalculators: [],
      };
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data — Server Rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb — Semantic HTML for SEO */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
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

      {/* ─── Server-Rendered Content for SEO ───────────────────────────────── */}
      <div className="mt-12 space-y-10">
        {/* How This Calculator Works */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How This Calculator Works
          </h2>
          <div className="space-y-4">
            {content.howItWorks.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Key Rates & Data */}
        {content.keyRates.length > 0 && (
          <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Key Rates & Data for 2026
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
              Frequently Asked Questions
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

        {/* Related Calculators */}
        {content.relatedCalculators.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Related Calculators
            </h2>
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
      </div>
    </div>
  );
}
