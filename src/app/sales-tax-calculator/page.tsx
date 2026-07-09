import { Metadata } from 'next';
import Link from 'next/link';
import {
  STATE_SALES_TAX,
  ALL_STATE_KEYS,
} from '@/lib/state-sales-tax-data';
import { SITE_URL } from '@/lib/site-config';
import { getAuthorForCalculator, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';
import { ShareButtons } from '@/components/finance/share-buttons';
import { LinkToUs } from '@/components/finance/link-to-us';
import { SalesTaxHubClient } from './sales-tax-hub-client';

// ─── Static Generation Config ────────────────────────────────────────────────

export const dynamic = 'force-static';
export const revalidate = 86400;

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = SITE_URL;
  const author = getAuthorForCalculator('sales-tax');
  const canonicalPath = '/sales-tax-calculator';

  return {
    title: { absolute: 'Sales Tax Calculator 2026 — All 50 States + Reverse Tax Tool' },
    description:
      'Free 2026 sales tax calculator for all 50 US states. Combined state + local rates, reverse tax, car sales tax & IRS deductions. No sign-up.',
    keywords: [
      'sales tax calculator',
      'figuring sales tax',
      'retail tax calculator',
      'sales tax estimator',
      'calculator tax sales',
      'car sales tax calculator',
      'sales tax calculator by zip code',
      'reverse sales tax calculator',
      'irs sales tax calculator',
      'vehicle sales tax calculator',
      'backwards sales tax calculator',
      'online sales tax calculator',
      'lowest sales tax states',
      'automobile tax calculator',
      'automotive sales tax calculator',
      'calculating sales tax on car',
      'car sales tax estimator',
      'irs sales tax estimator',
      'sales tax rate calculator',
      'state sales tax calculator',
      'american sales tax calculator',
      'sales tax calculator by address',
      'sales tax deduction calculator',
      'car purchase tax calculator',
      'tag tax and title calculator',
      'home sale tax calculator',
      'stock sale tax calculator',
      'state and local tax calculator',
      'capital gains house calculator',
      'calculate sales tax',
      'sales tax by state',
      'how to calculate sales tax',
      'sales tax percentage',
      'calculate sales tax from total',
      'add tax to price',
      'calculate tax percentage',
      'sales tax decalculator',
      'sales tax formula',
      'how to figure sales tax',
      'price before tax calculator',
      'estimated sales tax calculator',
      'sales tax rate finder',
      'general sales tax calculator',
      'food tax calculator',
      'restaurant tax calculator',
      'purchase tax calculator',
      'tax price calculator',
      'plus tax calculator',
      'shopping calculator with tax',
      'item tax calculator',
      'determine sales tax',
      'compute sales tax',
      'tag tax and title calculator',
      'mass sales tax calculator',
      'maine sales tax calculator',
    ],
    authors: [{ name: `${author.name}, ${author.credentials}` }],
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
    },
    openGraph: {
      title: 'Sales Tax Calculator 2026 — All 50 States + Reverse Tax Tool',
      description:
        'Free 2026 sales tax calculator for all 50 US states. Combined state + local rates, reverse tax, car sales tax & IRS deductions. No sign-up.',
      url: `${baseUrl}${canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: 'Sales Tax Calculator 2026 | All 50 States',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sales Tax Calculator 2026 — All 50 States + Reverse Tax Tool',
      description:
        'Free 2026 sales tax calculator for all 50 US states. Combined state + local rates, reverse tax, car sales tax & IRS deductions. No sign-up.',
      images: [`${baseUrl}/opengraph-image.png`],
    },
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatRate(rate: number): string {
  return (rate * 100).toFixed(rate * 100 % 1 === 0 ? 0 : 2);
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function SalesTaxHubPage() {
  const author = getAuthorForCalculator('sales-tax');
  const pageUrl = `${SITE_URL}/sales-tax-calculator`;
  const pageTitle = 'Free Sales Tax Calculator -- All 50 States & Reverse Tax';

  // ─── Build sorted state data for table ────────────────────────────────
  const stateRows = ALL_STATE_KEYS.map((key) => {
    const s = STATE_SALES_TAX[key];
    return { key, ...s };
  });

  // ─── Lowest and highest tax states ────────────────────────────────────
  const taxableStates = stateRows.filter((s) => !s.noStateTax);
  const lowestStates = [...taxableStates].sort((a, b) => a.combinedRate - b.combinedRate).slice(0, 5);
  const highestStates = [...taxableStates].sort((a, b) => b.combinedRate - a.combinedRate).slice(0, 5);

  // ─── JSON-LD Structured Data ──────────────────────────────────────────
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${pageUrl}#breadcrumb`,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Sales Tax Calculator' },
        ],
      },
      {
        '@id': `${pageUrl}#webpage`,
        '@type': 'WebPage',
        name: 'Sales Tax Calculator 2026 -- All 50 States & Reverse Tax',
        description:
          'Free sales tax calculator for 2026. Calculate sales tax for all 50 US states with combined rates. Includes reverse sales tax calculator, car sales tax, IRS deduction, and tax-exempt items.',
        url: pageUrl,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
        author: { '@id': `${pageUrl}#author` },
        reviewedBy: { '@id': `${pageUrl}#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@id': `${pageUrl}#webapp`,
        '@type': 'SoftwareApplication',
        name: 'Sales Tax Calculator 2026',
        url: pageUrl,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
        author: { '@id': `${pageUrl}#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@id': `${pageUrl}#howto`,
        '@type': 'HowTo',
        name: 'How to Calculate Sales Tax',
        description:
          'Step-by-step guide to calculating sales tax on any purchase in the United States.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Identify the purchase price',
            text: 'Determine the pre-tax price of the item or service you are purchasing. This is the sticker price before any sales tax is added.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Find your state and local sales tax rate',
            text: 'Look up your state sales tax rate and any local (city, county, district) taxes that apply. The combined rate is the sum of state + local rates. Use our rate table above for all 50 states.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Check for tax-exempt categories',
            text: 'Verify whether your purchase falls under a tax-exempt category in your state. Common exemptions include groceries, prescription drugs, and clothing (in select states).',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Multiply price by the combined tax rate',
            text: 'Sales Tax = Purchase Price x Combined Tax Rate. For example, a $100 purchase at 8.25% combined rate = $100 x 0.0825 = $8.25 in sales tax.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Add the tax to get the total price',
            text: 'Total Price = Purchase Price + Sales Tax. Using the example: $100 + $8.25 = $108.25. Alternatively, Total = Purchase Price x (1 + Tax Rate).',
          },
        ],
      },
      {
        '@id': `${pageUrl}#faq`,
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate sales tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Multiply the purchase price by the combined sales tax rate (state + local). For example, a $100 purchase at 8.25% combined rate: $100 x 0.0825 = $8.25 in sales tax. Total = $108.25.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate sales tax backwards (reverse sales tax)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Divide the total amount paid by (1 + tax rate). For example, if you paid $108.25 and the tax rate is 8.25%: $108.25 / 1.0825 = $100.00 original price. The tax was $8.25.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which states have no sales tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Five states have no state sales tax: Delaware, Montana, New Hampshire, Oregon, and Alaska. However, Alaska allows local municipalities to charge their own sales taxes (average 1.82%).',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I pay sales tax on a car purchase?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, most states charge sales tax on vehicle purchases at the same rate as general purchases. Some states allow trade-in credits that reduce the taxable amount. Car sales tax is typically paid at the DMV when you register the vehicle.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I deduct sales tax on my IRS tax return?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. On Schedule A, you can choose to deduct state and local sales tax instead of state and local income tax. This is beneficial if you live in a state with no income tax (TX, FL, WA, NV, etc.). The IRS provides tables for estimated sales tax deductions, or you can use actual receipts.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the average sales tax rate in the US?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The average combined state and local sales tax rate across the US is approximately 6.5% to 7.5%, depending on the year. State rates range from 0% (DE, MT, NH, OR) to 7.25% (CA), and local rates can add 0% to over 5% on top.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are groceries subject to sales tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most states exempt groceries from state sales tax, but some tax them at a reduced rate. Only a handful of states (like Mississippi) charge full sales tax on groceries. Local taxes may still apply even when the state exempts groceries.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I pay sales tax on online purchases?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Since the 2018 South Dakota v. Wayfair Supreme Court ruling, online retailers must collect sales tax on purchases shipped to states that impose sales tax, regardless of whether the retailer has a physical presence in that state. Most online purchases now include sales tax.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a sales tax exemption?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A sales tax exemption means certain items or services are not subject to sales tax. Common exemptions include groceries, prescription drugs, clothing (in some states), manufacturing equipment, and items purchased for resale. Exemptions vary by state.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is sales tax calculated on a car with a trade-in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In most states, the trade-in value is deducted from the purchase price before calculating sales tax. For example, on a $30,000 car with a $10,000 trade-in in a state with 6% tax, you pay tax on $20,000 ($1,200) instead of $30,000 ($1,800). However, some states like California do not allow trade-in deductions for sales tax.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the IRS sales tax deduction?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The IRS allows taxpayers who itemize deductions on Schedule A to deduct state and local sales tax instead of state and local income tax. You cannot deduct both. This is especially valuable for residents of states with no income tax. You can use the IRS Sales Tax Deduction Calculator or actual receipts.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which state has the highest sales tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Louisiana has the highest average combined sales tax rate at approximately 9.56%. Tennessee (9.56%) and Arkansas (9.47%) are also among the highest. Keep in mind that combined rates include local taxes, which can vary significantly within each state.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I figure out sales tax from a total amount?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Divide the total by (1 + tax rate) to get the original price, then subtract from the total. For example, $107.00 total at 7% tax: $107 ÷ 1.07 = $100. Sales tax = $7.00.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the sales tax formula?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sales Tax = Purchase Price × Tax Rate. Total = Purchase Price × (1 + Tax Rate). Reverse: Original Price = Total Paid ÷ (1 + Tax Rate).',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate sales tax on a restaurant bill?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Multiply the bill by your combined rate (state + local + any restaurant tax). For a $50 bill at 8.5%: $50 × 0.085 = $4.25 in tax. Tip is calculated on the pre-tax amount.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I find my sales tax rate by zip code?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Sales tax rates vary by location within each state because local taxes are added on top. Check your state department of revenue for zip-code-specific rates, or use our calculator with local rate override.',
            },
          },
        ],
      },
      {
        '@id': `${pageUrl}#author`,
        ...authorToJsonLd(author),
      },
    ],
  };

  // ─── FAQ Data ─────────────────────────────────────────────────────────
  const faqs = [
    {
      question: 'How do I calculate sales tax?',
      answer: 'Multiply the purchase price by the combined sales tax rate (state + local). For example, a $100 purchase at 8.25% combined rate: $100 x 0.0825 = $8.25 in sales tax. The total you pay is $108.25. Use the calculator above to get exact numbers for any state and price.',
    },
    {
      question: 'How do I calculate sales tax backwards (reverse sales tax)?',
      answer: 'Divide the total amount paid by (1 + tax rate). For example, if you paid $108.25 total and the combined tax rate is 8.25%: $108.25 / 1.0825 = $100.00 original price. The sales tax was $8.25. Use our reverse sales tax calculator above for instant results.',
    },
    {
      question: 'Which states have no sales tax?',
      answer: 'Five states have no state sales tax: Delaware (0%), Montana (0%), New Hampshire (0%), Oregon (0%), and Alaska (0% state rate, but local municipalities can charge up to 7.5%). These no-sales-tax states are popular for large purchases, but your home state may require you to pay use tax on items brought back from tax-free states.',
    },
    {
      question: 'Do I pay sales tax on a car purchase?',
      answer: 'Yes, most states charge sales tax on vehicle purchases. The rate is typically the same as the general sales tax rate for your location. Some states allow trade-in credits that reduce the taxable amount, potentially saving you hundreds of dollars. Car sales tax is usually paid at the DMV when you register the vehicle, not at the dealership. Use our car sales tax calculator above to estimate your vehicle tax.',
    },
    {
      question: 'Can I deduct sales tax on my IRS tax return?',
      answer: 'Yes. On Schedule A (Itemized Deductions), you can choose to deduct state and local sales tax instead of state and local income tax -- but you cannot deduct both. This deduction is most beneficial for residents of states with no income tax (Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska, Tennessee, New Hampshire). The IRS provides optional sales tax tables, or you can calculate your actual sales tax paid using receipts.',
    },
    {
      question: 'What is the average sales tax rate in the US?',
      answer: 'The average combined state and local sales tax rate across the US is approximately 6.5% to 7.5%. State-level rates range from 0% (in Delaware, Montana, New Hampshire, Oregon) to 7.25% (California). When local taxes are added, combined rates can exceed 10% in some cities. Louisiana, Tennessee, and Arkansas have the highest average combined rates.',
    },
    {
      question: 'Are groceries subject to sales tax?',
      answer: 'Most states exempt groceries from state sales tax, though local taxes may still apply. A few states, like Mississippi, charge the full sales tax rate on groceries. Some states, like Illinois, charge a reduced rate (1%) on groceries. Check the tax-exempt categories in the calculator above for your specific state.',
    },
    {
      question: 'Do I pay sales tax on online purchases?',
      answer: 'Yes. Since the 2018 South Dakota v. Wayfair Supreme Court ruling, online retailers must collect sales tax on purchases shipped to states that impose sales tax, regardless of physical presence. Marketplace facilitators like Amazon, eBay, and Etsy are required to collect and remit sales tax on behalf of third-party sellers in most states.',
    },
    {
      question: 'What is a sales tax exemption?',
      answer: 'A sales tax exemption means certain items or services are not subject to sales tax. Common exemptions include groceries, prescription drugs, clothing (in some states like Minnesota, New Jersey, Pennsylvania), manufacturing equipment, and items purchased for resale. Non-profit organizations may also qualify for sales tax exemptions with proper documentation.',
    },
    {
      question: 'How is sales tax calculated on a car with a trade-in?',
      answer: 'In most states, the trade-in value reduces the taxable amount. For example, buying a $35,000 car with a $10,000 trade-in at 6% sales tax means you pay tax on $25,000 ($1,500) instead of $35,000 ($2,100) -- saving $600. However, some states like California charge sales tax on the full vehicle price regardless of trade-in. Use our car sales tax calculator above for your state.',
    },
    {
      question: 'What is the IRS sales tax deduction and who should use it?',
      answer: 'The IRS sales tax deduction allows you to deduct state and local sales tax on Schedule A instead of state and local income tax. This is especially valuable if you live in a state with no income tax (TX, FL, WA, NV, WY, SD, AK, TN, NH). You can use the IRS Sales Tax Deduction Calculator or actual receipts. The deduction is subject to the $10,000 SALT cap ($5,000 for married filing separately).',
    },
    {
      question: 'Which state has the highest sales tax?',
      answer: 'Louisiana has the highest average combined sales tax rate at approximately 9.56%, followed closely by Tennessee (9.56%) and Arkansas (9.47%). However, within any state, specific cities can have even higher rates due to local add-ons. For example, some cities in Alabama and Louisiana have combined rates exceeding 11%.',
    },
    {
      question: 'How do I figure out sales tax from a total amount?',
      answer: 'To figure out sales tax from a total, divide the total by (1 + tax rate) to get the original price, then subtract the original from the total. For example, if you paid $107.00 total at 7% tax: $107.00 ÷ 1.07 = $100.00 original price. Sales tax = $107.00 - $100.00 = $7.00. Use our reverse sales tax calculator above for instant results.',
    },
    {
      question: 'What is the sales tax formula?',
      answer: 'The sales tax formula is: Sales Tax = Purchase Price × Tax Rate. To calculate the total with tax: Total = Purchase Price × (1 + Tax Rate). For reverse calculation: Original Price = Total Paid ÷ (1 + Tax Rate). These formulas work for any state and any tax rate — just convert the percentage to a decimal (7% = 0.07).',
    },
    {
      question: 'How do I calculate sales tax on a restaurant bill?',
      answer: 'Restaurant meals are subject to the full combined sales tax rate (state + local) in all states that impose sales tax. Some cities add an additional restaurant or prepared food tax of 1-2% on top. To calculate: multiply the bill amount by your combined rate. For a $50 bill at 8.5% combined rate: $50 × 0.085 = $4.25 in tax. Tip is calculated on the pre-tax amount and is not subject to sales tax.',
    },
    {
      question: 'Can I find my sales tax rate by zip code?',
      answer: 'Yes. Sales tax rates vary by location within each state because local (city, county, district) taxes are added on top of the state rate. Two addresses in the same state can have different combined rates. Our calculator above uses the average combined rate for each state. For the most precise rate by zip code, check your state department of revenue website or use the state and local rate override feature in our calculator.',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li className="text-muted-foreground" aria-hidden="true">/</li>
            <li className="text-foreground font-medium">Sales Tax Calculator</li>
          </ol>
        </nav>

        {/* H1 + Share Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Free Sales Tax Calculator -- All 50 States &amp; Reverse Tax
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
              Calculate sales tax for any US state instantly. Includes forward calculator, reverse sales tax calculator, car/vehicle sales tax calculator, and tax-exempt category support. Free, no sign-up required.
            </p>
          </div>
          <div className="shrink-0">
            <ShareButtons
              url={pageUrl}
              title={pageTitle}
              description="Free sales tax calculator for all 50 US states. Includes reverse calculator, car sales tax, and IRS deduction info."
            />
          </div>
        </div>

        {/* Author Attribution */}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span>By</span>
          <Link
            href={`/about#${author.id}`}
            className="font-medium text-foreground hover:text-emerald-400 transition-colors"
          >
            {author.name}
          </Link>
          <span className="inline-flex items-center rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
            {author.credentials}
          </span>
          <span className="text-muted-foreground">| Reviewed January 2026</span>
        </div>

        {/* ─── Quick Summary Box ─────────────────────────────────────────── */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h2 className="text-base font-semibold text-foreground">Forward Calculator</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter a purchase price and select a state to get the exact sales tax amount, total price, and full state + local rate breakdown.
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <h2 className="text-base font-semibold text-foreground">Reverse Calculator</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Have a total receipt and need the original price before tax? Enter the total paid and state to find the pre-tax amount and tax you paid.
            </p>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h8M8 17v4h8v-4M8 17l-2-7h12l-2 7M6 10V6h12v4" />
              </svg>
              <h2 className="text-base font-semibold text-foreground">Car Sales Tax</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Calculate sales tax on a vehicle purchase with optional trade-in credit. See the taxable amount and total cost with tax for any state.
            </p>
          </div>
        </div>

        {/* ─── Client Component: Interactive Calculators ─────────────────── */}
        <div className="mt-8">
          <SalesTaxHubClient />
        </div>

        {/* ─── 50-State Sales Tax Rate Table ─────────────────────────────── */}
        <section className="mt-12" id="state-rates-table">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            50-State Sales Tax Rate Table (2026)
          </h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Combined rates include state plus average local taxes. Actual local rates vary by city and county. Click any state for a detailed calculator with local rate override.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">State</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">State Rate</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Avg Local Rate</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Combined Rate</th>
                  <th className="px-4 py-3 text-center font-semibold text-foreground">Grocery Exempt</th>
                </tr>
              </thead>
              <tbody>
                {stateRows.map((s, i) => (
                  <tr
                    key={s.key}
                    className={`border-b border-border/20 ${i % 2 === 0 ? 'bg-card/30' : 'bg-card/10'} hover:bg-muted/20 transition-colors`}
                  >
                    <td className="px-4 py-2.5">
                      <Link
                        href={`/sales-tax-calculator/${s.key}`}
                        className="font-medium text-foreground hover:text-emerald-400 transition-colors"
                      >
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">
                      {s.noStateTax ? <span className="text-emerald-400 font-medium">0%</span> : `${formatRate(s.stateRate)}%`}
                    </td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">
                      {s.avgLocalRate > 0 ? `${(s.avgLocalRate * 100).toFixed(2)}%` : <span className="text-muted-foreground/50">--</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-foreground">
                      {s.noStateTax ? <span className="text-emerald-400">0%</span> : `${(s.combinedRate * 100).toFixed(2)}%`}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {s.groceryExempt ? (
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold" aria-label="Yes">Y</span>
                      ) : (
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold" aria-label="No">N</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Rates are based on 2026 state tax data. Local rates are averages and may differ by city/county. Always verify with your state department of revenue.
          </p>
        </section>

        {/* ─── How to Calculate Sales Tax ────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How to Calculate Sales Tax
          </h2>
          <div className="space-y-6 max-w-4xl">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/25">
                1
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Identify the purchase price</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Determine the pre-tax price of the item or service you are purchasing. This is the sticker price before any sales tax is added. For example, if a television is listed at $999, the purchase price is $999.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/25">
                2
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Find your combined sales tax rate</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Look up your state sales tax rate and any local (city, county, special district) taxes that apply. The combined rate is the sum of state + local rates. For example, California has a 7.25% state rate plus an average 1.57% local rate, giving a combined rate of 8.82%. Use the rate table above for all 50 states.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/25">
                3
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Check for tax-exempt categories</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Verify whether your purchase falls under a tax-exempt category in your state. Most states exempt groceries and prescription drugs from sales tax. A few states (Minnesota, New Jersey, Pennsylvania, Vermont) also exempt clothing. If the item is exempt, the sales tax is $0.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/25">
                4
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Multiply price by the combined tax rate</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  <strong>Sales Tax = Purchase Price x Combined Tax Rate</strong>. For example, a $100 purchase at 8.25% combined rate = $100 x 0.0825 = $8.25 in sales tax. The state portion and local portion can be calculated separately: $100 x 0.06 = $6.00 state tax, $100 x 0.0225 = $2.25 local tax.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/25">
                5
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Add the tax to get the total price</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  <strong>Total Price = Purchase Price + Sales Tax</strong>. Using the example: $100 + $8.25 = $108.25. Alternatively, you can calculate the total in one step: <strong>Total = Purchase Price x (1 + Tax Rate)</strong>. $100 x 1.0825 = $108.25.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="text-sm font-semibold text-foreground mb-2">Quick Example: $1,000 Purchase in California</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Purchase Price: $1,000.00</p>
              <p>California State Rate: 7.25%</p>
              <p>Average Local Rate: 1.57%</p>
              <p>Combined Rate: 8.82%</p>
              <p>State Tax: $72.50 | Local Tax: $15.70 | Total Tax: $88.20</p>
              <p className="font-semibold text-foreground">Total Price: $1,088.20</p>
            </div>
          </div>
        </section>

        {/* ─── Figuring Sales Tax — The Complete Guide ────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Figuring Sales Tax — The Complete Guide
          </h2>
          <div className="max-w-4xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Figuring sales tax is one of the most common calculations in everyday life. Whether you are at a retail store, buying a car, or shopping online, knowing how to figure sales tax helps you understand the true cost of your purchase. Our sales tax estimator above handles the math for you — but if you want to figure it out yourself, here is everything you need to know.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-6">Sales Tax Formula</h3>
            <p>
              The sales tax formula is straightforward: <strong className="text-foreground">Sales Tax = Purchase Price × Tax Rate</strong>. To get the total price including tax: <strong className="text-foreground">Total = Purchase Price × (1 + Tax Rate)</strong>. For example, figuring sales tax on a $50 purchase at 7%: $50 × 0.07 = $3.50 in tax, for a total of $53.50.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-6">How to Figure Sales Tax on Any Purchase</h3>
            <div className="grid gap-3 sm:grid-cols-2 my-4">
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-emerald-400 mb-1">Retail Purchases</p>
                <p className="text-xs text-muted-foreground">In-store purchases automatically add sales tax at the register. The receipt shows the tax amount separately. Use our retail tax calculator above to estimate tax before you shop.</p>
              </div>
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-sky-400 mb-1">Online Shopping</p>
                <p className="text-xs text-muted-foreground">Since the 2018 Wayfair ruling, online retailers collect sales tax in most states. The tax rate is based on the delivery address, not the seller&apos;s location. Use our sales tax estimator to check your rate.</p>
              </div>
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-amber-400 mb-1">Restaurant &amp; Food</p>
                <p className="text-xs text-muted-foreground">Restaurant meals are taxable in all states that have sales tax. Some states charge an additional restaurant tax or prepared food tax on top of the general sales tax. Groceries may be exempt or taxed at a lower rate.</p>
              </div>
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-purple-400 mb-1">Vehicles &amp; Big Ticket</p>
                <p className="text-xs text-muted-foreground">Car sales tax is usually paid at the DMV. Trade-in credits may reduce the taxable amount in most states (except CA). Use our car sales tax calculator above for exact numbers.</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mt-6">Sales Tax by Purchase Type</h3>
            <p>
              Different types of purchases may have different tax rates or exemptions within the same state. Here is a quick reference:
            </p>
            <div className="overflow-x-auto rounded-lg border border-border/50 my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="px-4 py-2.5 text-left font-semibold text-foreground">Purchase Type</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-foreground">Typical Tax Treatment</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/20 bg-card/30">
                    <td className="px-4 py-2">General merchandise</td>
                    <td className="px-4 py-2">Full state + local rate</td>
                    <td className="px-4 py-2">Standard sales tax applies</td>
                  </tr>
                  <tr className="border-b border-border/20 bg-card/10">
                    <td className="px-4 py-2">Groceries / food</td>
                    <td className="px-4 py-2">Exempt or reduced in most states</td>
                    <td className="px-4 py-2">IL charges 1%; MS charges full rate</td>
                  </tr>
                  <tr className="border-b border-border/20 bg-card/30">
                    <td className="px-4 py-2">Prescription drugs</td>
                    <td className="px-4 py-2">Exempt in all states with sales tax</td>
                    <td className="px-4 py-2">OTC drugs vary by state</td>
                  </tr>
                  <tr className="border-b border-border/20 bg-card/10">
                    <td className="px-4 py-2">Clothing</td>
                    <td className="px-4 py-2">Exempt in MN, NJ, PA, VT</td>
                    <td className="px-4 py-2">NY exempts items under $110</td>
                  </tr>
                  <tr className="border-b border-border/20 bg-card/30">
                    <td className="px-4 py-2">Restaurant meals</td>
                    <td className="px-4 py-2">Full rate + possible meal tax</td>
                    <td className="px-4 py-2">Some cities add 1-2% restaurant tax</td>
                  </tr>
                  <tr className="bg-card/10">
                    <td className="px-4 py-2">Vehicles</td>
                    <td className="px-4 py-2">Full rate, trade-in may reduce</td>
                    <td className="px-4 py-2">Paid at DMV, not dealership</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              For the most accurate results, use our free sales tax estimator above. Select your state, enter the purchase price, and get instant calculations including state tax, local tax, and total price. It works as a retail tax calculator, food tax calculator, and general sales tax rate finder — all in one tool.
            </p>
          </div>
        </section>

        {/* ─── Reverse Sales Tax Calculator -- How It Works ──────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Reverse Sales Tax Calculator -- How It Works
          </h2>
          <div className="max-w-4xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A reverse sales tax calculator (also called a backwards sales tax calculator) finds the original price before tax when you only know the total amount paid. This is useful for expense reports, bookkeeping, and budgeting when you have a receipt showing only the total.
            </p>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
              <p className="text-sm font-semibold text-foreground mb-2">Reverse Sales Tax Formula</p>
              <p className="text-lg font-mono text-amber-400 mb-2">
                Original Price = Total Paid / (1 + Tax Rate)
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> You paid $1,088.20 total in California (8.82% combined rate).<br />
                Original Price = $1,088.20 / 1.0882 = $1,000.00<br />
                Sales Tax = $1,088.20 - $1,000.00 = $88.20
              </p>
            </div>
            <p>
              The reverse sales tax formula works because the total price is the original price multiplied by (1 + tax rate). By dividing the total by this factor, you reverse the calculation to find the pre-tax amount. This method is mathematically exact and works for any tax rate.
            </p>
            <p>
              Use the reverse calculator above to instantly find original prices and tax amounts for any total and any state. Simply enter the total amount you paid and select your state.
            </p>
          </div>
        </section>

        {/* ─── Car & Vehicle Sales Tax Calculator ────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Car &amp; Vehicle Sales Tax Calculator
          </h2>
          <div className="max-w-4xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Buying a car is one of the largest purchases most people make, and sales tax on a vehicle can add hundreds or thousands of dollars to the total cost. Our car sales tax calculator above estimates the sales tax on any vehicle purchase for all 50 states.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-6">How Vehicle Sales Tax Works</h3>
            <p>
              In most states, the sales tax on a vehicle purchase is calculated the same way as general sales tax: the vehicle price multiplied by the combined state and local sales tax rate. However, there are important differences to know:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-foreground">Trade-in credits:</strong> Most states (TX, FL, NY, IL, etc.) allow you to deduct the trade-in value from the purchase price before calculating sales tax. This can save you significant money -- on a $10,000 trade-in at 8% tax, that is $800 in tax savings.
              </li>
              <li>
                <strong className="text-foreground">No trade-in credit states:</strong> California and a few other states do not allow trade-in deductions for sales tax purposes. You pay tax on the full vehicle price regardless of trade-in value.
              </li>
              <li>
                <strong className="text-foreground">Registration and title fees:</strong> These are separate from sales tax and vary by state. They are typically not tax-deductible.
              </li>
              <li>
                <strong className="text-foreground">Private party purchases:</strong> Some states charge use tax instead of sales tax on private-party vehicle sales, often at the same rate.
              </li>
            </ul>
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-5">
              <p className="text-sm font-semibold text-foreground mb-2">Car Sales Tax Example</p>
              <p className="text-sm text-muted-foreground">
                Buying a $35,000 car in Texas with a $10,000 trade-in:<br />
                Taxable amount: $35,000 - $10,000 = $25,000<br />
                Texas combined rate: 8.20%<br />
                Sales tax: $25,000 x 0.0820 = $2,050.00<br />
                Total cost: $35,000 + $2,050.00 = $37,050.00
              </p>
            </div>
          </div>
        </section>

        {/* ─── IRS Sales Tax Deduction ───────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            IRS Sales Tax Deduction
          </h2>
          <div className="max-w-4xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              If you itemize deductions on your federal tax return (Schedule A), you can choose to deduct state and local sales tax instead of state and local income tax. This is known as the IRS sales tax deduction, and it can save you thousands of dollars -- especially if you live in a state with no income tax.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-4">Who Should Use the Sales Tax Deduction?</h3>
            <p>
              The sales tax deduction is most beneficial for residents of states with no income tax. These include Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska, Tennessee, and New Hampshire. Since these states do not charge income tax, deducting sales tax is almost always the better choice.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-4">How to Calculate the IRS Sales Tax Deduction</h3>
            <p>
              You have two options for calculating your sales tax deduction:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                <strong className="text-foreground">IRS Sales Tax Tables:</strong> The IRS provides optional state sales tax tables in the Schedule A instructions. These give you a standard deduction amount based on your income and state. You can add actual sales tax paid on major purchases (cars, boats, home improvements) on top of the table amount.
              </li>
              <li>
                <strong className="text-foreground">Actual Receipts:</strong> Keep all receipts throughout the year and total the actual sales tax you paid. This method is more work but may result in a larger deduction if you made significant taxable purchases.
              </li>
            </ol>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> The SALT (State and Local Tax) deduction cap is $10,000 ($5,000 if married filing separately). This means the total of your state income tax or sales tax, plus property tax, cannot exceed $10,000. Plan your deductions accordingly.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Online Sales Tax & E-Commerce ─────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Online Sales Tax &amp; E-Commerce
          </h2>
          <div className="max-w-4xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Since the landmark 2018 Supreme Court ruling in <a href="https://www.oyez.org/cases/2017/17-494" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">South Dakota v. Wayfair, Inc.</a>, states can require online retailers to collect sales tax even if the retailer has no physical presence in the state. This decision overturned the previous physical presence requirement and fundamentally changed e-commerce taxation.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-4">Marketplace Facilitator Laws</h3>
            <p>
              Most states have enacted marketplace facilitator laws that require platforms like Amazon, eBay, Etsy, and Walmart Marketplace to collect and remit sales tax on behalf of third-party sellers. This means that if you buy from a third-party seller on Amazon, Amazon is responsible for collecting the correct sales tax based on your location.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-4">Economic Nexus Thresholds</h3>
            <p>
              States establish economic nexus thresholds that determine when an out-of-state seller must begin collecting sales tax. Common thresholds include $100,000 in annual sales or 200 transactions in the state. Once a seller exceeds these thresholds, they must register with the state and collect sales tax on future sales.
            </p>
            <p>
              For consumers, the practical effect is that most online purchases now include sales tax. If you are shopping online and sales tax was not collected, you may owe use tax to your state. Use our sales tax calculator above to estimate how much tax you should have paid on tax-free online purchases.
            </p>
          </div>
        </section>

        {/* ─── Lowest & Highest Sales Tax States ─────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Lowest &amp; Highest Sales Tax States
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl">
            {/* Lowest */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/25">5</span>
                Lowest Combined Sales Tax Rates
              </h3>
              <div className="space-y-2">
                {lowestStates.map((s) => (
                  <div key={s.key} className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5">
                    <Link
                      href={`/sales-tax-calculator/${s.key}`}
                      className="text-sm font-medium text-foreground hover:text-emerald-400 transition-colors"
                    >
                      {s.name}
                    </Link>
                    <span className="text-sm font-bold text-emerald-400">{(s.combinedRate * 100).toFixed(2)}%</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Excludes states with 0% sales tax (DE, MT, NH, OR).
              </p>
            </div>
            {/* Highest */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15 text-xs font-bold text-red-400 ring-1 ring-red-500/25">5</span>
                Highest Combined Sales Tax Rates
              </h3>
              <div className="space-y-2">
                {highestStates.map((s) => (
                  <div key={s.key} className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5">
                    <Link
                      href={`/sales-tax-calculator/${s.key}`}
                      className="text-sm font-medium text-foreground hover:text-emerald-400 transition-colors"
                    >
                      {s.name}
                    </Link>
                    <span className="text-sm font-bold text-red-400">{(s.combinedRate * 100).toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* No-Tax States */}
          <div className="mt-6 max-w-4xl">
            <h3 className="text-lg font-semibold text-foreground mb-3">States with No Sales Tax</h3>
            <div className="flex flex-wrap gap-3">
              {ALL_STATE_KEYS.filter((k) => STATE_SALES_TAX[k].noStateTax).map((key) => {
                const s = STATE_SALES_TAX[key];
                return (
                  <Link
                    key={key}
                    href={`/sales-tax-calculator/${key}`}
                    className="inline-flex items-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    {s.name} (0%)
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ───────────────────────────────────────────────── */}
        <section className="mt-12" id="faq">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Sales Tax Calculator FAQ
          </h2>
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/50 bg-card/80 p-5"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── All States Index ──────────────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Sales Tax by State
          </h2>
          <p className="text-muted-foreground mb-4">
            Select a state for a detailed sales tax calculator with local rate override, reverse calculator, and tax-exempt information.
          </p>
          <div className="flex flex-wrap gap-2 max-w-5xl">
            {ALL_STATE_KEYS.map((key) => {
              const s = STATE_SALES_TAX[key];
              return (
                <Link
                  key={key}
                  href={`/sales-tax-calculator/${key}`}
                  className="inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors bg-muted/30 text-muted-foreground border border-border/30 hover:bg-muted/50 hover:text-foreground"
                >
                  {s.abbreviation} {s.noStateTax ? '0%' : `${(s.combinedRate * 100).toFixed(1)}%`}
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─── Related Calculators ───────────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Related Tax Calculators
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            {[
              { href: '/paycheck-calculator', label: 'Paycheck Calculator', desc: 'Calculate take-home pay after federal, FICA & state taxes' },
              { href: '/property-tax-calculator', label: 'Property Tax Calculator', desc: 'Estimate annual property tax for any US state' },
              { href: '/mortgage-calculator', label: 'Mortgage Calculator', desc: 'Monthly payment with amortization schedule' },
              { href: '/capital-gains-calculator', label: 'Capital Gains Calculator', desc: 'Short-term and long-term capital gains tax' },
              { href: '/irs-withholding-calculator', label: 'IRS Withholding Calculator', desc: 'Optimize your W-4 for accurate withholding' },
              { href: '/tax-refund-calculator', label: 'Tax Refund Calculator', desc: 'Estimate your federal and state tax refund' },
              { href: '/self-employment-tax-calculator', label: 'Self-Employment Tax Calculator', desc: '15.3% SE tax, quarterly estimates & deductions' },
              { href: '/relocation-calculator', label: 'Relocation Calculator', desc: 'Compare take-home pay across states' },
              { href: '/lottery-tax-calculator', label: 'Lottery Tax Calculator', desc: 'After-tax winnings with federal & state withholding' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="rounded-lg border border-border/50 bg-card/80 p-4 hover:bg-muted/20 hover:border-emerald-500/20 transition-colors"
              >
                <p className="text-sm font-semibold text-foreground">{calc.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Link To Us ────────────────────────────────────────────────── */}
        <section className="mt-12 max-w-4xl">
          <LinkToUs
            url={pageUrl}
            title="Free Sales Tax Calculator 2026 -- All 50 States"
            slug="sales-tax-calculator"
          />
        </section>

        {/* ─── Next Steps ────────────────────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Next Steps
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 max-w-4xl">
            <div className="rounded-xl border border-border/50 bg-card/80 p-5">
              <h3 className="text-base font-semibold text-foreground mb-2">Find Your State Rate</h3>
              <p className="text-sm text-muted-foreground">
                Use the state table above or select your state in the calculator to get the exact combined sales tax rate for your area. Remember that local rates vary by city and county within each state.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/80 p-5">
              <h3 className="text-base font-semibold text-foreground mb-2">Maximize Your Deductions</h3>
              <p className="text-sm text-muted-foreground">
                If you live in a no-income-tax state, make sure you are deducting sales tax on Schedule A instead of income tax. Use the IRS Sales Tax Deduction Calculator or keep receipts for major purchases.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/80 p-5">
              <h3 className="text-base font-semibold text-foreground mb-2">Plan Major Purchases</h3>
              <p className="text-sm text-muted-foreground">
                For big-ticket items like cars and appliances, even small rate differences matter. On a $50,000 vehicle, the difference between 6% and 9% sales tax is $1,500. Consider timing and location for significant savings.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Author Attribution (E-E-A-T) ──────────────────────────────── */}
        <section className="py-12 border-t border-border/20 mt-12">
          <AuthorBioCard authorId="rachel-mitchell" />
        </section>
      </div>
    </main>
  );
}
