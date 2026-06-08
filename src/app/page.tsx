import { Metadata } from 'next';
import { SITE_URL, SITE_HOME_URL } from '@/lib/site-config';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import SEOAuditDashboard from '@/components/seo-audit-dashboard';

// ─── Home Page Metadata ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Free 2026 Tax Calculator — Paycheck, Take-Home Pay & More',
  description:
    'Free 2026 tax calculator — paycheck, take-home pay after federal, FICA & state taxes. Also mortgage, 401(k), self-employment & capital gains. No sign-up.',
  alternates: {
    canonical: SITE_HOME_URL,
    languages: {
      'en-US': SITE_HOME_URL,
      'x-default': SITE_HOME_URL,
    },
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: 'TheTaxCalc — Free 2026 Tax & Paycheck Calculator',
    description:
      'Free 2026 tax calculator. Compute take-home pay after federal, FICA & state taxes for IL, TX, FL, CA, NY. No sign-up.',
    url: SITE_HOME_URL,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'TheTaxCalc — Free 2026 Tax & Paycheck Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheTaxCalc — Free 2026 Tax & Paycheck Calculator',
    description:
      'Free 2026 tax calculator. Compute take-home pay after federal, FICA & state taxes for IL, TX, FL, CA, NY. No sign-up.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

// ─── JSON-LD Structured Data ───────────────────────────────────────────────────

const homeAuthor = getCalculatorAuthor();

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'TheTaxCalc — Free 2026 Tax & Paycheck Calculator',
      description:
        'Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment. 20 tools covering 7 states.',
      url: SITE_URL,
      inLanguage: 'en-US',
      dateModified: '2026-06-06',
      author: authorToJsonLd(homeAuthor),
      reviewedBy: authorToJsonLd(homeAuthor),
      isPartOf: {
        '@type': 'WebSite',
        name: 'TheTaxCalc',
        url: SITE_URL,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        ],
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.speakable-summary'],
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'TheTaxCalc Paycheck Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '1240',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'HowTo',
      name: 'How to Calculate Your Take-Home Pay After Taxes',
      description:
        'Step-by-step guide to calculating your net take-home pay after federal tax, FICA, and state income tax deductions.',
      totalTime: 'PT2M',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Enter Your Gross Salary',
          text: 'Input your annual, monthly, bi-weekly, weekly, or hourly salary into the calculator.',
        },
        {
          '@type': 'HowToStep',
          name: 'Select Your State',
          text: 'Choose your state: IL (4.95%), TX (0%), FL (0%), CA (1%–13.3%), NY (4%–10.9%), GA (5.49%), or VA (2%–5.75%).',
        },
        {
          '@type': 'HowToStep',
          name: 'Choose Filing Status',
          text: 'Select Single, Married Filing Jointly, or Head of Household for accurate bracket calculations.',
        },
        {
          '@type': 'HowToStep',
          name: 'Add Pre-Tax Deductions',
          text: 'Enter 401(k) contributions (up to $23,500) and HSA contributions to reduce your taxable income.',
        },
        {
          '@type': 'HowToStep',
          name: 'View Your Results',
          text: 'See your net take-home pay broken down by federal tax, FICA, state tax, and pre-tax deductions with effective tax rate.',
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Free 2026 Tax Calculators',
      description: '20 free tax calculators for 2026 covering paycheck, state tax, mortgage, retirement, and more.',
      numberOfItems: 20,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Paycheck Calculator', url: `${SITE_URL}/paycheck-calculator` },
        { '@type': 'ListItem', position: 2, name: 'Illinois Tax Calculator', url: `${SITE_URL}/illinois-tax-calculator` },
        { '@type': 'ListItem', position: 3, name: 'Texas Tax Calculator', url: `${SITE_URL}/texas-tax-calculator` },
        { '@type': 'ListItem', position: 4, name: 'Florida Tax Calculator', url: `${SITE_URL}/florida-tax-calculator` },
        { '@type': 'ListItem', position: 5, name: 'California Tax Calculator', url: `${SITE_URL}/california-tax-calculator` },
        { '@type': 'ListItem', position: 6, name: 'New York Tax Calculator', url: `${SITE_URL}/new-york-tax-calculator` },
        { '@type': 'ListItem', position: 7, name: 'Georgia Tax Calculator', url: `${SITE_URL}/georgia-tax-calculator` },
        { '@type': 'ListItem', position: 8, name: 'Virginia Tax Calculator', url: `${SITE_URL}/virginia-tax-calculator` },
        { '@type': 'ListItem', position: 9, name: 'Mortgage Calculator', url: `${SITE_URL}/mortgage-calculator` },
        { '@type': 'ListItem', position: 10, name: '401(k) Retirement Calculator', url: `${SITE_URL}/401k-retirement-calculator` },
        { '@type': 'ListItem', position: 11, name: 'Capital Gains Calculator', url: `${SITE_URL}/capital-gains-calculator` },
        { '@type': 'ListItem', position: 12, name: 'Self-Employment Calculator', url: `${SITE_URL}/self-employment-tax-calculator` },
        { '@type': 'ListItem', position: 13, name: 'Tax Refund Calculator', url: `${SITE_URL}/tax-refund-calculator` },
        { '@type': 'ListItem', position: 14, name: 'IRS Withholding Calculator', url: `${SITE_URL}/irs-withholding-calculator` },
        { '@type': 'ListItem', position: 15, name: 'Sales Tax Calculator', url: `${SITE_URL}/sales-tax-calculator` },
        { '@type': 'ListItem', position: 16, name: 'Property Tax Calculator', url: `${SITE_URL}/property-tax-calculator` },
        { '@type': 'ListItem', position: 17, name: 'Overtime Tax Calculator', url: `${SITE_URL}/overtime-tax-calculator` },
        { '@type': 'ListItem', position: 18, name: 'Bonus Tax Calculator', url: `${SITE_URL}/bonus-tax-calculator` },
        { '@type': 'ListItem', position: 19, name: 'Lottery Tax Calculator', url: `${SITE_URL}/lottery-tax-calculator` },
        { '@type': 'ListItem', position: 20, name: 'Relocation Calculator', url: `${SITE_URL}/relocation-calculator` },
      ],
    },
    {
      '@type': 'Dataset',
      name: '2026 Federal Tax Brackets and Rates',
      description: 'Official 2026 federal income tax brackets, standard deductions, and FICA rates used by TheTaxCalc calculators.',
      creator: {
        '@type': 'Organization',
        name: 'TheTaxCalc',
        url: SITE_URL,
      },
      license: `${SITE_URL}/terms`,
      variableMeasured: [
        { '@type': 'PropertyValue', name: 'Federal Tax Brackets', value: '10% – 37%' },
        { '@type': 'PropertyValue', name: 'Standard Deduction (Single)', value: '$16,100' },
        { '@type': 'PropertyValue', name: 'Standard Deduction (Married)', value: '$32,200' },
        { '@type': 'PropertyValue', name: 'FICA Rate', value: '7.65%' },
        { '@type': 'PropertyValue', name: 'Social Security Wage Cap', value: '$184,500' },
        { '@type': 'PropertyValue', name: '401(k) Contribution Limit', value: '$23,500' },
      ],
    },
    authorToJsonLd(homeAuthor),
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I calculate my take-home pay from my salary?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Start with your gross salary, subtract federal income tax (using progressive brackets), FICA (7.65% for Social Security and Medicare), and state income tax. Pre-tax deductions like 401(k) and HSA lower your taxable income. Use TheTaxCalc paycheck calculator for instant results.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is FICA and how much does it take from my paycheck?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FICA is the payroll tax funding Social Security (6.2%, capped at $184,500 for 2026) and Medicare (1.45%, no cap). That\'s 7.65% total from every paycheck. An extra 0.9% Medicare surcharge applies on earnings over $200,000.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which states have no income tax?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nine states have no personal income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. TheTaxCalc supports TX and FL paycheck calculators with property tax and cost-of-living analysis.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much is taken out of a $75,000 salary in taxes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A single filer making $75K pays roughly $7,670 federal tax (after the $16,100 standard deduction), $5,738 FICA, plus state tax. In Texas or Florida (0% state tax), you keep around $61,600. In Illinois (4.95%), closer to $58,000.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does contributing to a 401(k) reduce my taxes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every dollar in a traditional 401(k) drops your taxable income for federal and state tax (but not FICA). Contributing $10,000 on a $75K salary saves over $2,200 in federal tax at the 22% bracket. The 2026 limit is $23,500.',
          },
        },
      ],
    },
  ],
};

// ─── Page Component ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <SEOAuditDashboard />
    </>
  );
}
