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
          'Ever look at your pay stub and wonder where all the money went? That\'s exactly why we built this calculator. It starts with your gross salary and works through every deduction — federal tax, FICA, state tax — until it reaches the number that actually hits your bank account.',
          'Here\'s how the math works. First, we apply the 2026 federal progressive tax brackets (10% through 37%) based on your filing status and the standard deductions ($15,000 for single filers, $30,000 for married filing jointly). Then FICA kicks in: Social Security takes 6.2% on income up to the $176,100 wage cap, and Medicare takes 1.45% on everything. Earning over $200,000? There\'s an extra 0.9% Medicare surtax on the amount above that threshold.',
          'Next comes state income tax, and this is where things get interesting — because the state you live in can mean thousands of dollars difference in take-home pay on the exact same salary. We cover five states: Illinois (4.95% flat — simple but not cheap), Texas (0% — yes, really), Florida (also 0%), California (1%–13.3% progressive — ouch), and New York (4%–10.9% plus a potential NYC tax on top). The good news: pre-tax deductions like 401(k) and HSA contributions reduce your taxable income before these taxes are calculated, so you save at every level.',
          'The bottom line? You\'ll see your net take-home pay broken down by every deduction, your effective tax rate (what you actually pay as a percentage), and your marginal rate (the rate on your next dollar earned). Most people are surprised by their effective rate — it\'s usually lower than they think.',
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
          'Illinois keeps things simple — one flat rate for everyone. Whether you make $30,000 or $300,000, the state takes 4.95% of your taxable income. No brackets, no guessing which rate applies to you. It\'s refreshingly straightforward, even if the rate itself isn\'t the lowest.',
          'The one break you get is the personal exemption: $2,775 per person for 2026. It comes right off the top before the 4.95% is applied. So on a $75,000 salary, you\'re taxed on $72,225 ($75,000 minus $2,775), which works out to $3,575.14 in Illinois state tax. Not nothing, but at least the math is easy to verify.',
          'On top of that, you\'ve got federal tax (progressive brackets with the standard deduction) and FICA (7.65% combined for Social Security and Medicare). Pre-tax deductions like 401(k) contributions help here because they reduce your taxable income at both the federal and state level — it\'s like getting a discount on your taxes.',
          'One thing that catches people off guard about Illinois: there\'s no state standard deduction, just that personal exemption. But here\'s a silver lining, especially if you\'re approaching retirement — Illinois doesn\'t tax Social Security benefits, 401(k) distributions, IRA withdrawals, or pension income. The property taxes are brutal, sure, but for retirees, the income tax picture is surprisingly decent.',
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
          'Zero. That\'s the Texas state income tax rate, and it\'s not changing anytime soon — a state income tax is actually banned by the Texas Constitution. So if you\'re a wage earner in Texas, your only deductions are federal tax and FICA. That\'s it.',
          'The result? Your take-home pay in Texas is higher than in most other states on the exact same salary. The calculation is straightforward: federal progressive brackets (10%–37%), the 2026 standard deductions, and FICA taxes (6.2% Social Security + 1.45% Medicare). No state tax line item on your pay stub at all.',
          'But — and this is a big but — Texas gets its money somewhere. Property taxes here are among the highest in the country, averaging about 1.71% of your home\'s value. On a $300,000 house, that\'s roughly $5,130 per year. The state sales tax is 6.25%, and combined with local add-ons, you\'re typically paying around 8.2% at the register. So the income tax savings are real, but the full picture is more nuanced.',
          'We show you the property tax and sales tax context right alongside the income tax savings because that\'s what actually matters. If you\'re renting or own a modest home, Texas is incredibly tax-efficient. But if you\'re in a $600,000 house? The property tax bill might eat into those income tax savings more than you\'d expect. Run the numbers — that\'s what this calculator is for.',
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
          'Florida and Texas both have 0% state income tax, but here\'s where they diverge: Florida\'s property taxes are roughly half of Texas\'. For homeowners, that can make Florida the better deal overall, even though both states leave your paycheck alone at the state level.',
          'Your only deductions in Florida are federal income tax (using the 2026 progressive brackets and standard deductions) and FICA taxes (7.65% combined). No state tax, no local wage tax, nothing. Compared to what someone making the same salary pays in Illinois, California, or New York, the difference is thousands of dollars per year.',
          'Florida also has something Texas doesn\'t: the Homestead Exemption. It knocks up to $50,000 off your home\'s assessed value for property tax purposes. Combined with an average effective property tax rate of just 0.86%, a Florida homeowner pays significantly less in property tax than a Texas homeowner with the same house value. For a $300,000 home, that\'s roughly $2,580 in Florida versus $5,130 in Texas.',
          'Florida funds its government through a 6% state sales tax (averaging 7% with local surtaxes) and tourism-related taxes — which visitors pay a lot of. There\'s no estate tax, no inheritance tax, and retirement income (Social Security, 401(k), IRA, pension) is completely tax-free. If you\'re retiring and comparing Florida versus Texas, Florida often comes out ahead on total tax burden.',
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
          'Let\'s just say it: California has the highest state income tax rate in the country. The top rate is 13.3%, and it kicks in at $698,271 of taxable income for single filers. Even at more modest salaries, you\'re likely paying 6%–9.3% in state tax alone. It hurts, but at least you get great weather.',
          'California uses a progressive bracket system with 9 — count them, nine — tax brackets. The standard deduction for 2026 is $6,083 (single) or $12,166 (married). After subtracting the standard deduction, each slice of your income gets taxed at a different rate, from 1% on the first $10,099 up to 13.3% on income over $698,271. It\'s a lot of brackets, but the principle is the same as the federal system: only the income within each bracket gets taxed at that rate.',
          'On top of state tax, you\'ve got the federal progressive brackets ($15,000 standard deduction for single filers) and FICA (7.65%). Pre-tax deductions like 401(k) contributions are especially valuable in California because they reduce your taxable income at both the federal and state level — and at 13.3% for high earners, that state-level deduction really adds up.',
          'Here\'s something people don\'t always realize: California\'s property taxes are actually relatively low, with an average effective rate around 0.71%. Proposition 13 caps annual assessed value increases at 2%, which protects homeowners from spiraling tax bills even as home prices soar. Of course, when the median home costs $800,000, even a low rate produces a hefty bill. And at least California doesn\'t tax your Social Security benefits.',
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
          'New York State takes a lot out of your paycheck. The state income tax runs from 4% to 10.9% across nine brackets, and if you live in New York City, there\'s an additional city tax on top (3.078%–3.876%). Add it all up, and NYC residents face the highest combined state and local income tax burden in the entire United States.',
          'The math: New York\'s standard deduction is $8,100 for single filers and $16,200 for married filing jointly — actually higher than California\'s, which is a small consolation. After the deduction, your income runs through the nine state brackets, with each portion taxed at its own rate. The top 10.9% rate doesn\'t kick in until $25,000,000 of taxable income, so most people are paying somewhere in the 6%–8% range.',
          'Now, about that NYC tax. If you live within the five boroughs, the city takes an additional 3.078%–3.876% of your income. On a $100,000 salary, that\'s roughly $3,400 that New Yorkers pay and residents of most other cities don\'t. We include the NYC tax as a toggle in this calculator because it makes a huge difference — we\'ve seen people reconsider a job offer once they factored in the city tax.',
          'One bright spot for older New Yorkers: the state doesn\'t tax Social Security benefits, and it excludes up to $20,000 of qualified retirement income (pensions, 401(k), IRA) for taxpayers aged 59½ and older. Property taxes average around 1.62%, and the combined sales tax runs about 8.52%. Not great, but not the worst part of living in New York.',
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
          'The math behind your monthly mortgage payment isn\'t complicated, but it\'s not obvious either. We use the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is your loan amount, r is the monthly interest rate (your annual rate divided by 12), and n is the total number of payments (years × 12). The result is a fixed monthly payment that pays off every penny by the end of the term.',
          'Here\'s the part that surprises people: in the early years, most of your payment goes straight to interest. On a 30-year, $280,000 loan at 6.5%, your first payment is roughly 86% interest and only 14% principal. It feels like you\'re making no progress. But stick with it — by year 15, the split is about 50/50, and by the final years, almost all of your payment goes toward principal.',
          'The extra payments feature is where things get exciting (yes, we find mortgage math exciting). Extra payments go 100% toward principal, which means every dollar you add saves you interest for the rest of the loan. Adding just $200/month extra on that $280,000 loan at 6.5%? You\'d save roughly $76,856 in interest and pay off the loan more than 5 years early. That\'s the power of compound interest working in your favor for once.',
          'We also generate a full amortization schedule so you can see exactly where every dollar goes — month by month, principal vs. interest, remaining balance. It\'s eye-opening to see the numbers laid out, especially in those first few years. Knowledge is power, and in this case, it might save you tens of thousands of dollars.',
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
          'If you\'re not thinking about retirement yet, you should be — and this calculator makes it painless. We estimate your 401(k) balance at retirement based on your annual contributions, employer match, expected annual return, and how many years you have left to save. The earlier you start, the less you have to contribute each year. It\'s not magic, it\'s compound growth.',
          'The core math is the future value of a series: each year\'s contribution grows at your assumed annual rate for every remaining year until retirement. Your year-1 contribution grows for the full period. Your year-10 contribution grows for 10 fewer years. Add them all up and you get your projected balance. Simple in concept, powerful in practice.',
          'Don\'t sleep on the employer match — it\'s literally free money. A typical structure is 50% of your contributions up to 6% of salary. So if you make $100,000 and contribute 6% ($6,000), your employer adds $3,000. If you\'re not contributing enough to capture the full match, you\'re leaving thousands of dollars on the table every year. We can\'t stress this enough: max out the match first, then worry about everything else.',
          'For 2026, you can contribute up to $23,500 to your 401(k). If you\'re 50 or older, you can add another $7,500 as a catch-up. Ages 60-63 get an even bigger catch-up of $11,250. The calculator defaults to a 7% annual return, which is a reasonable long-term average for a diversified stock portfolio. Your actual returns will bounce around — some years up 20%, some years down 15% — but 7% is a solid planning assumption over decades.',
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
          'Got a job offer in another state? Before you pack your bags, run the numbers here. This calculator tells you the salary you\'d need in the new state to match your current take-home pay — because a $100,000 salary in Texas and a $100,000 salary in California are very different things when taxes come out.',
          'The calculation is straightforward but important. Step one: we figure out your current take-home pay after federal tax, FICA, and your state\'s income tax. Step two: we calculate what gross salary in the target state would give you the same net pay, accounting for that state\'s tax rates and deductions.',
          'Let\'s make it real. If you earn $100,000 in Texas (0% state tax, take-home roughly $79,000), you\'d need to earn about $120,000–$125,000 in California to end up with the same amount in your bank account. Why? Because California\'s progressive income tax takes an extra $5,000–$8,000 from your paycheck that Texas doesn\'t. That\'s not a small difference — it\'s a car payment. Or a nice vacation. Or a decent chunk of retirement savings.',
          'Fair warning: this tool focuses on income tax differences, which is just one piece of the relocation puzzle. You should also look at property taxes (Texas is brutal, California is surprisingly mild), sales taxes, and — the big one — housing costs. A $1,500/month apartment in Houston might cost $3,000 in San Francisco. Our state comparison pages break down these additional factors side by side.',
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
          'Here\'s the deal with capital gains: how long you hold an investment makes a massive difference in how much tax you pay. Sell after a year or less? That\'s a short-term gain, taxed at your ordinary income rate — up to 37%. Hold for more than a year? That\'s a long-term gain, and you qualify for preferential rates of 0%, 15%, or 20%. The difference on a $50,000 gain can be thousands of dollars.',
          'For 2026, the 0% rate applies if your total taxable income (including the gain) is under $47,025 for single filers or $94,050 for married couples. The 15% rate covers most people, up to $518,900 (single) or $583,750 (married). Above that, it\'s 20%. Important: these brackets are based on your total taxable income, not just the gain itself. So your salary pushes you into a higher capital gains bracket.',
          'Then there\'s the Net Investment Income Tax (NIIT) — an extra 3.8% that kicks in when your modified adjusted gross income exceeds $200,000 (single) or $250,000 (married). It applies on top of the regular capital gains rate, so the effective top rate on long-term gains is actually 23.8%, not 20%. Most calculators forget to mention this. We don\'t.',
          'We also factor in your ordinary income to figure out which bracket your gains fall into, and we\'ll show you some common tax-saving strategies: tax-loss harvesting (offsetting gains with losses), holding periods (waiting that extra week for the long-term rate), and charitable giving of appreciated assets (you deduct the full value and never pay capital gains on it). Small decisions, big savings.',
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
          'If you\'re self-employed, you already know the sticker shock: that 15.3% self-employment tax on top of regular income tax. It covers both halves of Social Security (12.4%) and Medicare (2.9%) — the half your employer used to pay for you, plus the half that always came out of your paycheck. Welcome to self-employment.',
          'Here\'s a detail that catches people off guard: you don\'t pay the 15.3% on 100% of your income. It\'s calculated on 92.35% of your net business income — this adjustment approximates the employer-half deduction that W-2 employees get automatically. So on $100,000 of net SE income, the SE tax base is $92,350, and the tax comes out to roughly $14,130. Still painful, but slightly less than you might have feared.',
          'The good news: you can deduct half of your self-employment tax as an above-the-line deduction. On $14,130 of SE tax, that\'s a $7,065 deduction from your income before you calculate your income tax. It doesn\'t reduce the SE tax itself, but it lowers your AGI, which means less federal and state income tax. Every bit helps.',
          'One more thing that trips up new freelancers: quarterly estimated tax payments. You need to send the IRS money four times a year (April 15, June 15, September 15, and January 15) or face underpayment penalties. The safe harbor is paying at least 100% of last year\'s tax (110% if your AGI was over $150,000) or 90% of this year\'s tax. We estimate these quarterly amounts for you so there are no surprises come April.',
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
          'This calculator figures out your take-home pay after federal tax, FICA, and state income tax. Just enter your gross salary, pick your state and filing status, and — if you have them — add any pre-tax deductions like 401(k) or HSA contributions. The results show you exactly where your money goes.',
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
