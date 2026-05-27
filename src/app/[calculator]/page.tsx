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
import { db } from '@/lib/db';
import { SITE_URL } from '@/lib/site-config';

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

  const baseUrl = SITE_URL;

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
          'Look at your pay stub sometime. That number at the bottom — the one that actually hits your bank — is way smaller than the number at the top. This calculator tells you why, line by line. All withholding calculations follow <a href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer">IRS Publication 15-T</a>.',
          'Here\'s what comes out of every paycheck. Federal tax uses progressive brackets from 10% up to 37%, with standard deductions of $15,000 (single) or $30,000 (married). Then <a href="https://www.irs.gov/taxtopics/tc751" target="_blank" rel="noopener noreferrer">FICA</a>: 6.2% for Social Security on income up to $176,100, and 1.45% for Medicare on everything. Make over $200,000? Add another 0.9% Medicare surtax on the amount above that.',
          'My buddy in Chicago and I compared stubs once. Same salary, same filing status. He walked away with about $3,800 less for the year because Illinois takes 4.95% and my state takes nothing. That\'s when it hit me — state tax is not a small factor. We cover five states here: Illinois at 4.95% flat, Texas at 0%, Florida at 0%, California at 1%–13.3% progressive, and New York at 4%–10.9% plus a potential NYC tax.',
          'A couple things that help soften the blow:\n- 401(k) contributions reduce taxable income at both federal and state level\n- HSA contributions do the same\n- These pre-tax deductions are basically a discount on your tax bill',
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
          { slug: 'california-tax-calculator', label: 'California Calculator' },
        ],
      };
    case 'illinois':
      return {
        howItWorks: [
          '<a href="https://www2.illinois.gov/rev/" target="_blank" rel="noopener noreferrer">4.95%</a>. That\'s it. One flat rate for every Illinois resident, whether you pull in $30K or $300K. No brackets to figure out, no guessing which rate applies. Honestly, it\'s kinda nice not having to navigate a bracket system — even if 4.95% isn\'t exactly cheap compared to the zero-tax states. You get a $2,775 personal exemption for 2026 that comes off the top, so on a $75,000 salary you\'re taxed on $72,225, which comes out to $3,575.14 in state tax. The math is easy to check. My cousin moved from Chicago to Austin last year and he said the state tax savings alone covered his moving costs within about 8 months.',
          'On top of Illinois tax you\'ve got the federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. 401(k) contributions are your friend here — they reduce taxable income at both the federal and state level, so every dollar you put in saves you money twice.',
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
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
        ],
      };
    case 'texas':
      return {
        howItWorks: [
          'Zero. That\'s the Texas income tax rate. Not "close to zero" or "effectively zero." Actually zero. The Texas Constitution bans a state income tax, so this isn\'t changing.',
          'Your only deductions are federal tax and FICA. Federal uses the 2026 progressive brackets (10%–37%) with standard deductions, plus 6.2% Social Security up to $176,100 and 1.45% Medicare on everything. No state line item on your pay stub. Period.',
          'I talk to people who moved from California or New York and they can\'t get over how much more shows up in their bank account on the same salary. A $100K earner in Texas takes home roughly $79,000. Same salary in California? More like $71,000. That\'s an $8,000 difference from state tax alone.',
          'But Texas gets you elsewhere. <a href="https://comptroller.texas.gov/" target="_blank" rel="noopener noreferrer">Property taxes</a> average about 1.71% of home value — on a $300,000 house that\'s roughly $5,130 a year. That\'s among the highest in the country. Sales tax runs around 8.2% combined with local add-ons. The income tax savings are real, but the full picture is more complicated than "Texas has no income tax so it\'s cheaper."',
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
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
        ],
      };
    case 'florida':
      return {
        howItWorks: [
          'Florida: zero state income tax, just like Texas. But the property tax picture is completely different, and that\'s where Florida pulls ahead for a lot of people.',
          'Your paycheck deductions in Florida are federal tax only (2026 progressive brackets with standard deductions) plus FICA at 7.65% combined. No state tax, no local wage tax, nothing extra. Someone making $100K in Florida takes home thousands more per year than the same salary in Illinois, California, or New York.',
          'Here\'s where Florida really wins though:\n- Average effective <a href="https://floridarevenue.com/" target="_blank" rel="noopener noreferrer">property tax rate</a> of just 0.86% (Texas is ~1.71%)\n- Homestead Exemption knocks up to $50,000 off your home\'s assessed value\n- On a $300,000 home: roughly $2,580 property tax in Florida vs $5,130 in Texas',
          'I think Florida wins for retirees. And it\'s not even close. Social Security benefits, 401(k) distributions, IRA withdrawals, pensions — all completely tax-free at the state level. Add in the Homestead Exemption keeping property taxes low, and your fixed income stretches a lot further than in most states.',
          'Florida funds government through a 6% state sales tax (averaging 7% with local surtaxes) and tourism taxes. Visitors pay a big chunk of the bill, which is a nice perk for residents. No estate tax, no inheritance tax either.',
          'Bottom line — if you\'re comparing zero-tax states, Florida tends to beat Texas for homeowners and retirees. Run both calculators and see the difference.',
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
          'California has the highest state income tax in the country. Top rate is 13.3%, and it starts at $698,271 of taxable income for single filers. Even at a modest salary you\'re probably paying 6%–9.3% to the state. I won\'t pretend that doesn\'t sting.',
          'The state uses <a href="https://www.ftb.ca.gov/" target="_blank" rel="noopener noreferrer">nine progressive brackets</a>. Standard deduction for 2026 is $6,083 (single) or $12,166 (married). After that deduction, each slice of your income gets its own rate — 1% on the first $10,099, climbing all the way to 13.3% above $698,271. Same principle as federal brackets: only the income within each bracket gets that rate. On top of this, you\'re paying federal progressive brackets with the $15,000 standard deduction, plus FICA at 7.65%. Pre-tax deductions like 401(k) contributions are huge in California because they cut your taxable income at both federal and state level. At 13.3% for high earners, that state deduction is worth a lot.',
          'One thing that catches people off guard: California property taxes are actually pretty reasonable. Average effective rate around 0.71%. Proposition 13 caps annual assessed value increases at 2%, so your tax bill doesn\'t spiral even if your home\'s market value goes crazy. Of course, when the median house costs $800K, even a low rate gives you a hefty bill. And at least Social Security benefits aren\'t taxed by the state.',
          'A coworker of mine was offered a $130K job in San Francisco and almost took it without running the numbers. California state tax alone on that salary is roughly $8,500. The same job in Texas? $0 state tax. That\'s not chump change. Do the math before you accept that offer.',
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
          'New York takes a lot out of your paycheck. <a href="https://www.tax.ny.gov/" target="_blank" rel="noopener noreferrer">State income tax</a> runs from 4% to 10.9% across nine brackets, and if you live in NYC, there\'s an additional city tax (3.078%–3.876%) on top. NYC residents face the highest combined state and local income tax in the US.',
          'NY\'s standard deduction is $8,100 for single filers, $16,200 for married filing jointly — actually higher than California\'s, which is something. The top 10.9% rate doesn\'t kick in until $25,000,000 of taxable income, so most earners are in the 6%–8% range.',
          'That NYC tax though. If you live in any of the five boroughs, the city takes an additional 3.078%–3.876%. On $100,000, that\'s roughly $3,400 that people in literally any other US city don\'t pay. I\'ve seen friends reconsider job offers after factoring in the city tax. It\'s a toggle in this calculator for a reason — it makes a huge difference.',
          'One bright spot: New York doesn\'t tax Social Security, and excludes up to $20,000 of retirement income (pensions, 401(k), IRA) for taxpayers 59½ and older. Property taxes average 1.62% and combined sales tax is about 8.52%. Not great. But also not the worst part about living here.',
          'Winner for lowest total tax burden? Not New York, obviously. But if you\'re here for the career or the city, at least you can see exactly what it costs you.',
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
          'Your monthly mortgage payment comes from a formula: M = P × [r(1+r)^n] / [(1+r)^n - 1]. P is the loan amount, r is the monthly rate (annual rate ÷ 12), and n is total payments (years × 12). It spits out a fixed payment that pays off every penny by the end of the term. Simple enough. What surprises people is how that payment breaks down. On a 30-year, $280,000 loan at 6.5%, your first payment is roughly 86% interest and only 14% principal. You feel like you\'re treading water. By year 15 it\'s about 50/50, and in the final years nearly everything goes to principal. My brother bought his first house in 2019 and called me panicked after seeing his first amortization statement — "I\'m basically just paying interest!" Yeah. That\'s how it works at first. Stick with it.',
          'Extra payments go 100% toward principal. Every dollar you add saves you interest for the remaining life of the loan. Adding $200/month extra on that $280K loan at 6.5% saves roughly $76,856 in interest and pays it off more than 5 years early. Compound interest working for you instead of against you, for once.',
          'We generate a full amortization schedule — month by month, principal vs interest, remaining balance. For a detailed walkthrough, check the <a href="https://www.consumerfinance.gov/owning-a-home/mortgage-closing-checklist/" target="_blank" rel="noopener noreferrer">CFPB mortgage closing checklist</a>. Key things to keep in mind:\n- Recommended housing cost ratio: no more than 28% of gross income\n- 20% down payment avoids PMI entirely\n- Common loan terms are 15, 20, or 30 years\n- Even small extra payments make a big difference over 30 years',
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
          'Start early. That\'s the whole game with retirement savings. This calculator estimates your 401(k) balance at retirement based on contributions, employer match, expected returns, and years left to save. The earlier you begin, the less you need to put in each year.',
          'The math is future value of a series. Each year\'s contribution grows at your assumed annual return for every remaining year until retirement. Year 1 grows for the full period. Year 10 grows for 10 fewer years. Add it all up — that\'s your projected balance. The concept is straightforward. The results can be surprising. Someone who starts at 25 and contributes $500/month with a 7% return ends up with roughly $1.2 million by 65. Start at 35 with the same contributions? About $567,000. Ten years of delay costs you over $600K. That\'s compound growth for you — brutal if you\'re late, powerful if you\'re early.',
          'The employer match is free money. Typical structure: 50% match up to 6% of salary. Make $100K, contribute 6% ($6,000), employer adds $3,000. If you\'re not contributing enough to get the full match, you\'re throwing away thousands every year.',
          'For 2026, the <a href="https://www.irs.gov/newsroom/401k-limit-increases-to-23500" target="_blank" rel="noopener noreferrer">401(k) contribution limit is $23,500</a>. Catch-up contribution for ages 50+ is another $7,500. Ages 60-63 get an even bigger catch-up of $11,250. The calculator defaults to 7% annual return, which is a reasonable long-term assumption for a diversified stock portfolio. Real returns bounce around — up 20% some years, down 15% others — but 7% is a solid planning number over decades.',
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
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
        ],
      };
    case 'relocation':
      return {
        howItWorks: [
          'My sister got a job offer in San Francisco that paid $15,000 more than her Chicago salary. Sounded great until she ran the numbers. After California state tax and higher housing costs, she\'d actually have less money left over. That\'s exactly what this calculator prevents. It tells you the salary you\'d need in a new state to match your current take-home pay.',
          'How it works: first we calculate your current take-home after federal tax, FICA, and your state\'s income tax. Then we figure out what gross salary in the target state would give you the same net pay, accounting for that state\'s tax rates and deductions.',
          'Let\'s look at a real example. $100,000 in Texas (0% state tax) gets you roughly $79,000 take-home. To end up with the same $79,000 in California, you\'d need to earn about $120,000–$125,000. California\'s progressive income tax eats an extra $5,000–$8,000 that Texas doesn\'t touch. That\'s a car payment, a vacation, or a decent chunk of retirement savings — just gone to state tax.',
          'This tool focuses on income tax differences. But look, income tax isn\'t the whole story:\n- Property taxes: Texas is brutal (~1.71%), California is surprisingly mild (~0.71%)\n- Sales taxes vary significantly by state and city\n- Housing costs are the big one — $1,500/month in Houston can be $3,000 in San Francisco\nCheck our state comparison pages for the full picture.',
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
          'How long you hold an investment changes everything about the tax bill. Short-term gains (held a year or less) get taxed as ordinary income — up to 37%. Long-term gains (held more than a year) qualify for <a href="https://www.irs.gov/taxtopics/tc409" target="_blank" rel="noopener noreferrer">0%, 15%, or 20%</a>. On a $50,000 gain, the difference between short-term and long-term rates can be thousands of dollars.',
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
        ],
      };
    case 'self-employment':
      return {
        howItWorks: [
          '15.3%. That\'s the <a href="https://www.irs.gov/taxtopics/tc554" target="_blank" rel="noopener noreferrer">self-employment tax rate</a>, and if you just went freelance, it\'s probably higher than you expected. It covers both halves of Social Security (12.4%) and Medicare (2.9%) — the half your employer used to pay plus the half that always came out of your paycheck. Nobody warned me about this when I started consulting. It\'s a punch in the wallet.',
          'Here\'s a small relief: you don\'t pay 15.3% on 100% of your income. It\'s calculated on 92.35% of your net business income, which roughly accounts for the employer-half deduction that W-2 workers get automatically. So on $100,000 of net SE income, the tax base is $92,350 and the SE tax comes to roughly $14,130. Still hurts, but less than you might have feared at first glance. And you can deduct half of your SE tax ($7,065 in this example) as an above-the-line deduction. It doesn\'t reduce the SE tax itself, but it lowers your AGI, which means less federal and state income tax. Every bit counts.',
          'Quick reference for what you\'re dealing with:\n- Social Security portion: 12.4% on income up to $176,100\n- Medicare portion: 2.9% on everything, no cap\n- Additional Medicare: 0.9% on income above $200,000\n- Half of SE tax is deductible above the line',
          'Quarterly estimated payments. This is where new freelancers get into trouble. You have to send the IRS money four times a year — April 15, June 15, September 15, January 15 — or face penalties. The safe harbor is paying at least 100% of last year\'s tax liability (110% if your AGI was over $150,000) or 90% of this year\'s. We estimate those quarterly amounts so there are no ugly surprises in April. Seriously, don\'t skip estimated payments. The penalties aren\'t worth it.',
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

  // Fetch related blog posts
  const blogSlugs = CALCULATOR_BLOG_SLUGS[config.jsonLdType] ?? [];
  let relatedPosts: { slug: string; title: string; excerpt: string | null }[] = [];
  if (blogSlugs.length > 0) {
    try {
      relatedPosts = await db.post.findMany({
        where: {
          slug: { in: blogSlugs },
          published: true,
        },
        select: {
          slug: true,
          title: true,
          excerpt: true,
        },
      });
    } catch {
      // DB not available during build — skip related posts
    }
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
              <p key={i} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br/>') }} />
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

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Related Articles
            </h2>
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
