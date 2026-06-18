import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { getAuthorForCalculator, authorToJsonLd } from '@/lib/authors';
import { ShareButtons } from '@/components/finance/share-buttons';
import { LinkToUs } from '@/components/finance/link-to-us';
import { AuthorBioCard } from '@/components/finance/author-bio-card';
import { HomeSaleTaxClient } from './home-sale-tax-client';

// ─── Static generation ──────────────────────────────────────────────────────
export const dynamic = 'force-static';
export const revalidate = 86400;

// ─── Config ─────────────────────────────────────────────────────────────────
const CONFIG = {
  slug: 'home-sale-tax-calculator',
  title: 'Home Sale Tax Calculator 2026 — Capital Gains on Property',
  description: 'Free home sale tax calculator for 2026. Calculate capital gains tax on the sale of your home, rental property, or second home. Includes $250K/$500K exclusion, cost basis, and depreciation recapture. No sign-up.',
  h1: 'Home Sale Tax Calculator — Capital Gains on Property 2026',
  metaTitle: 'Home Sale Tax Calculator 2026 | Capital Gains on Property',
  metaDesc: 'Free home sale tax calculator for 2026. Calculate capital gains tax on your home, rental, or second home. $250K/$500K exclusion, cost basis, depreciation recapture. No sign-up.',
  keywords: [
    'capital gains tax calculator on sale of property',
    'home sale tax calculator',
    'capital gains on home sale calculator',
    'house sale capital gains tax calculator',
    'capital gains real estate calculator',
    'home sale capital gains calculator',
    'selling house capital gains calculator',
    'capital gains on house sale calculator',
    'capital gains calculator on home sale',
    'home sale capital gains tax calculator',
    'capital gains tax on home sale',
    'capital gains tax on sale of house',
    'how to calculate capital gains on home sale',
    'capital gains tax on property sale',
    'capital gains tax on real estate sale',
    'home sale tax exclusion calculator',
    'section 121 exclusion calculator',
    'primary residence capital gains calculator',
    'rental property capital gains calculator',
    'depreciation recapture calculator',
    'home sale cost basis calculator',
    'capital gains tax rate on home sale',
    '250000 500000 exclusion calculator',
    'sell house tax calculator',
    'property sale tax calculator',
    'real estate capital gains tax estimator',
    'home sale profit tax calculator',
    'capital gains on rental property sale',
    '1031 exchange vs sale calculator',
    'net investment income tax home sale',
    'niit home sale calculator',
    'short term vs long term capital gains home sale',
  ] as string[],
  breadcrumbLabel: 'Home Sale Tax Calculator',
  ogTitle: 'Home Sale Tax Calculator 2026 — Capital Gains on Property',
  ogDescription: 'Free home sale tax calculator. Calculate capital gains tax on your home, rental, or second home. $250K/$500K exclusion, depreciation recapture, NIIT. No sign-up required.',
  canonicalPath: '/home-sale-tax-calculator',
  snippetAnswer: 'When you sell your home, you may owe capital gains tax on the profit. If it\'s your primary residence and you\'ve lived in it for at least 2 of the last 5 years, you can exclude up to $250,000 (single) or $500,000 (married) of the gain. Any remaining gain is taxed at long-term capital gains rates of 0%, 15%, or 20%, plus a 3.8% Net Investment Income Tax if your income is high enough. Rental properties are subject to depreciation recapture at 25%.',
} as const;

// ─── Content ────────────────────────────────────────────────────────────────
const PAGE_CONTENT = {
  keyRates: [
    { label: 'Primary Residence Exclusion (Single)', value: '$250,000' },
    { label: 'Primary Residence Exclusion (MFJ)', value: '$500,000' },
    { label: 'Long-Term Capital Gains Rate', value: '0% / 15% / 20%' },
    { label: 'Depreciation Recapture Rate', value: '25%' },
    { label: 'NIIT Rate', value: '3.8%' },
    { label: 'Residency Test', value: '2 of 5 years' },
    { label: '0% Rate Threshold (Single)', value: '~$47,000 taxable income' },
    { label: '0% Rate Threshold (MFJ)', value: '~$94,000 taxable income' },
  ],
  faqs: [
    {
      question: 'How much capital gains tax will I pay when I sell my house?',
      answer: 'It depends on your profit, filing status, and how long you lived in the home. If it\'s your primary residence and you meet the 2-of-5-year test, you can exclude up to $250,000 (single) or $500,000 (married filing jointly) of the gain. Any remaining gain is taxed at long-term capital gains rates: 0%, 15%, or 20%, depending on your taxable income. High earners may also pay an additional 3.8% Net Investment Income Tax (NIIT).',
    },
    {
      question: 'What is the Section 121 primary residence exclusion?',
      answer: 'Section 121 of the Internal Revenue Code lets you exclude up to $250,000 of capital gains from the sale of your primary residence if you\'re single, or $500,000 if married filing jointly. To qualify, you must have owned and used the home as your primary residence for at least 2 of the 5 years before the sale. You can only use this exclusion once every 2 years.',
    },
    {
      question: 'What if I don\'t meet the 2-of-5-year residency test?',
      answer: 'If you don\'t meet the full 2-year residency requirement, you may qualify for a partial exclusion if the sale was due to a change in employment, health reasons, or unforeseen circumstances (like divorce or natural disaster). The partial exclusion is prorated based on the time you lived in the home. For example, if you lived there 1 year out of 5, you\'d get half the exclusion: $125,000 (single) or $250,000 (MFJ).',
    },
    {
      question: 'How is cost basis calculated for a home sale?',
      answer: 'Your cost basis is the original purchase price of the home plus the cost of capital improvements (not repairs or maintenance) minus any depreciation claimed. Capital improvements include things like a new roof, room addition, or major renovation. Routine repairs like painting or fixing a leaky faucet don\'t count. The higher your cost basis, the lower your capital gain.',
    },
    {
      question: 'What is depreciation recapture on a rental property sale?',
      answer: 'When you sell a rental property, you must "recapture" the depreciation you claimed (or could have claimed) over the years. This recaptured depreciation is taxed at a flat 25% rate, not at the regular capital gains rate. This applies even if you didn\'t actually claim depreciation on your tax returns — the IRS treats it as "allowed or allowable." Depreciation recapture is reported on Form 4797 and Schedule D.',
    },
    {
      question: 'Do I pay capital gains tax if I sell my house at a loss?',
      answer: 'If you sell your primary residence at a loss, you generally cannot deduct the loss on your tax return. The IRS does not allow you to claim a capital loss on the sale of a personal residence. However, if the property was a rental or investment property, you may be able to deduct the loss as a capital loss, subject to the usual capital loss limitations ($3,000 per year against ordinary income, with carryforward).',
    },
    {
      question: 'What is the 3.8% Net Investment Income Tax (NIIT)?',
      answer: 'The NIIT is an additional 3.8% tax on investment income (including capital gains from home sales) that applies to high-income taxpayers. It kicks in when your modified adjusted gross income (MAGI) exceeds $200,000 (single) or $250,000 (married filing jointly). The tax applies to the lesser of your net investment income or the amount your MAGI exceeds the threshold. This is on top of the regular capital gains tax.',
    },
    {
      question: 'Can I avoid capital gains tax with a 1031 exchange?',
      answer: 'A 1031 exchange (like-kind exchange) lets you defer capital gains tax by reinvesting the proceeds from the sale of an investment or rental property into a similar property. Important: 1031 exchanges do NOT apply to primary residences — only to investment and business properties. You must identify a replacement property within 45 days and close within 180 days. This defers the tax, it doesn\'t eliminate it permanently.',
    },
    {
      question: 'What counts as a capital improvement vs. a repair?',
      answer: 'Capital improvements add to your cost basis and include projects that add value, prolong the home\'s life, or adapt it to a new use — like adding a room, installing central air, replacing the roof, or finishing a basement. Repairs maintain the home in good condition but don\'t add value — like fixing a leak, repainting, or replacing a broken window. Only capital improvements increase your cost basis; repairs do not.',
    },
    {
      question: 'How does selling a second home differ from a primary residence?',
      answer: 'Second homes (vacation homes) do not qualify for the Section 121 primary residence exclusion — you\'ll pay capital gains tax on the entire gain. However, if you convert your second home to your primary residence and live in it for at least 2 of 5 years before selling, you may qualify for a partial exclusion (subject to the 5-year look-back rule for non-qualified use periods). The gain is still taxed at long-term capital gains rates.',
    },
    {
      question: 'What are the capital gains tax rates for 2026?',
      answer: 'For 2026, long-term capital gains (assets held over 1 year) are taxed at three rates: 0% for taxable income up to roughly $47,000 (single) or $94,000 (MFJ), 15% for income up to roughly $518,000 (single) or $583,000 (MFJ), and 20% for income above those thresholds. Short-term gains (assets held 1 year or less) are taxed at ordinary income rates. The 3.8% NIIT applies on top for high earners.',
    },
    {
      question: 'Do I need to report the sale of my home to the IRS?',
      answer: 'Yes, you must report the sale on your tax return using Schedule D and Form 8949, even if the entire gain is excluded under Section 121. If you receive a Form 1099-S (Proceeds from Real Estate Transactions), the IRS already knows about the sale, and failing to report it can trigger a notice. If no Form 1099-S was issued and the entire gain is excludable, you still need to report it, but you won\'t owe any tax.',
    },
  ],
  relatedCalculators: [
    { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
    { slug: 'property-tax-calculator', label: 'Property Tax Calculator' },
    { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
    { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
  ],
} as const;

// ─── JSON-LD ────────────────────────────────────────────────────────────────
const PAGE_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@id': `${SITE_URL}/home-sale-tax-calculator#breadcrumb`, '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Home Sale Tax Calculator' },
    ]},
    { '@id': `${SITE_URL}/home-sale-tax-calculator#webpage`, '@type': 'WebPage', name: 'Home Sale Tax Calculator 2026 — Capital Gains on Property', description: 'Free home sale tax calculator for 2026. Calculate capital gains tax on the sale of your home, rental property, or second home. Includes $250K/$500K exclusion, cost basis, and depreciation recapture.', url: `${SITE_URL}/home-sale-tax-calculator`, inLanguage: 'en-US', dateModified: '2026-02-15', author: { '@id': `${SITE_URL}/home-sale-tax-calculator#author` }, reviewedBy: { '@id': `${SITE_URL}/home-sale-tax-calculator#author` }, publisher: { '@id': `${SITE_URL}/#organization` }, breadcrumb: { '@id': `${SITE_URL}/home-sale-tax-calculator#breadcrumb` } },
    { '@id': `${SITE_URL}/home-sale-tax-calculator#webapp`, '@type': 'SoftwareApplication', name: 'Home Sale Tax Calculator', url: `${SITE_URL}/home-sale-tax-calculator`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' }, author: { '@id': `${SITE_URL}/home-sale-tax-calculator#author` }, publisher: { '@id': `${SITE_URL}/#organization` } },
    { '@id': `${SITE_URL}/home-sale-tax-calculator#howto`, '@type': 'HowTo', name: 'How to Calculate Capital Gains on a Home Sale', step: [
      { '@type': 'HowToStep', position: 1, name: 'Determine your cost basis', text: 'Add your purchase price to capital improvements and subtract any depreciation claimed. This gives you the adjusted cost basis of the property.' },
      { '@type': 'HowToStep', position: 2, name: 'Calculate your capital gain', text: 'Subtract your adjusted cost basis and selling costs (commissions, closing costs) from the sale price. The result is your total capital gain.' },
      { '@type': 'HowToStep', position: 3, name: 'Apply the primary residence exclusion', text: 'If you lived in the home for 2 of the last 5 years, subtract $250,000 (single) or $500,000 (MFJ) from the gain. Partial exclusion if under 2 years.' },
      { '@type': 'HowToStep', position: 4, name: 'Calculate tax on the remaining gain', text: 'Apply the long-term capital gains rate (0%, 15%, or 20%) to the taxable gain. Add 3.8% NIIT if your income exceeds $200K/$250K.' },
      { '@type': 'HowToStep', position: 5, name: 'Add depreciation recapture tax', text: 'If you claimed depreciation (rental property), multiply the accumulated depreciation by 25%. Add this to your capital gains tax for the total tax owed.' },
    ] },
    {
      '@id': `${SITE_URL}/home-sale-tax-calculator#faq`,
      '@type': 'FAQPage',
      mainEntity: PAGE_CONTENT.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

// ─── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const author = getAuthorForCalculator('home');
  return {
    title: { absolute: CONFIG.metaTitle },
    description: CONFIG.metaDesc,
    keywords: CONFIG.keywords,
    authors: [{ name: author.name, url: `${SITE_URL}/about#${author.id}` }],
    alternates: {
      canonical: `${SITE_URL}${CONFIG.canonicalPath}`,
    },
    openGraph: {
      title: CONFIG.ogTitle,
      description: CONFIG.ogDescription,
      url: `${SITE_URL}${CONFIG.canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: CONFIG.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: CONFIG.ogTitle,
      description: CONFIG.ogDescription,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default async function HomeSaleTaxCalculatorPage() {
  const author = getAuthorForCalculator('home');

  const jsonLdWithAuthor = {
    ...PAGE_JSONLD,
    '@graph': [
      ...PAGE_JSONLD['@graph'],
      {
        '@id': `${SITE_URL}/home-sale-tax-calculator#author`,
        '@type': 'Person',
        name: author.name,
        jobTitle: `${author.title}, ${author.credentials}`,
        url: `${SITE_URL}/about#${author.id}`,
        description: author.bio,
        knowsAbout: author.knowsAbout,
        sameAs: author.sameAs,
        worksFor: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
        ...(author.image ? { image: author.image } : {}),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWithAuthor) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="text-muted-foreground" aria-hidden="true">/</span>
        <span className="text-foreground font-medium">{CONFIG.breadcrumbLabel}</span>
      </nav>

      {/* Share Buttons */}
      <div className="mb-4 flex justify-center">
        <ShareButtons
          url={`${SITE_URL}${CONFIG.canonicalPath}`}
          title={CONFIG.title}
          description={CONFIG.metaDesc}
        />
      </div>

      {/* H1 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {CONFIG.h1}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          {CONFIG.description}
        </p>
        {/* Featured Snippet — Direct answer for position zero */}
        <p className="mt-3 text-sm text-foreground max-w-2xl mx-auto leading-relaxed">
          {CONFIG.snippetAnswer}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last reviewed: February 2026 &middot; By {author.name}, {author.credentials} &middot; Information verified against IRS.gov &amp; IRC Section 121
        </p>
      </div>

      {/* Quick Summary Box */}
      <div className="mb-8 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Home Sale Tax Quick Summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border/30 bg-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">Primary Residence Exclusion</p>
            <p className="text-2xl font-bold text-foreground">$250K / $500K</p>
            <p className="text-sm text-muted-foreground mt-1">$250,000 for single filers, $500,000 for married filing jointly. Must live in home 2 of last 5 years.</p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">Long-Term Capital Gains Rate</p>
            <p className="text-2xl font-bold text-foreground">0% / 15% / 20%</p>
            <p className="text-sm text-muted-foreground mt-1">Plus 3.8% NIIT for high earners. Rate depends on your taxable income level.</p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">Depreciation Recapture</p>
            <p className="text-2xl font-bold text-foreground">25%</p>
            <p className="text-sm text-muted-foreground mt-1">On accumulated depreciation for rental properties. Taxed regardless of your income bracket.</p>
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <HomeSaleTaxClient />

      {/* Server-Rendered Content for SEO */}
      <div className="mt-12 space-y-10">
        {/* How It Works — Complete Guide */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How Capital Gains Tax on a Home Sale Works — Complete Guide
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              When you sell a home for more than you paid for it, the profit is a <strong className="text-foreground">capital gain</strong>. The IRS taxes this gain, but several exclusions and rules can reduce or eliminate the tax. The biggest break is the <strong className="text-foreground">Section 121 primary residence exclusion</strong>, which lets you exclude up to $250,000 (single) or $500,000 (married filing jointly) of the gain if you meet certain conditions.
            </p>
            <p>
              The tax you owe depends on three main factors: <strong className="text-foreground">(1)</strong> whether the home was your primary residence, a rental, or a second home; <strong className="text-foreground">(2)</strong> how long you owned it (short-term vs. long-term); and <strong className="text-foreground">(3)</strong> your overall taxable income, which determines your capital gains rate. Understanding these factors is key to calculating your tax accurately.
            </p>
            <p>
              <strong className="text-foreground">Primary residence exclusion (Section 121):</strong> To qualify, you must have owned and used the home as your primary residence for at least 2 of the 5 years before the sale. The 2 years don&apos;t need to be consecutive — you just need 24 months total. You can only use this exclusion once every 2 years. If you&apos;re married filing jointly, both spouses must meet the residency requirement, but only one needs to meet the ownership requirement.
            </p>
            <p>
              <strong className="text-foreground">Cost basis calculation:</strong> Your cost basis isn&apos;t just the purchase price. It&apos;s the purchase price <em>plus</em> capital improvements <em>minus</em> any depreciation you claimed. Capital improvements are projects that add value, prolong the home&apos;s life, or adapt it to a new use — think new roof, room addition, or major kitchen renovation. Repairs and maintenance (painting, fixing leaks) don&apos;t count. Selling costs like real estate commissions and closing fees also reduce your gain.
            </p>
            <p>
              <strong className="text-foreground">Short-term vs. long-term capital gains:</strong> If you owned the home for more than one year, the gain is long-term and taxed at preferential rates (0%, 15%, or 20%). If you owned it for one year or less, it&apos;s short-term and taxed at your ordinary income rate — which can be significantly higher. Most home sales involve long-term gains since people typically own homes for years.
            </p>
            <p>
              <strong className="text-foreground">Net Investment Income Tax (NIIT):</strong> If your modified adjusted gross income (MAGI) exceeds $200,000 (single) or $250,000 (MFJ), you may owe an additional 3.8% tax on your capital gains. This tax applies to the lesser of your net investment income or the amount your MAGI exceeds the threshold. It stacks on top of the regular capital gains rate.
            </p>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Step-by-Step: How to Calculate Capital Gains on a Home Sale
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Determine your cost basis', desc: 'Start with the original purchase price, add the cost of capital improvements (new roof, room additions, major renovations), and subtract any depreciation you claimed (or could have claimed) on the property. This is your adjusted cost basis.' },
              { step: 2, title: 'Subtract cost basis from sale price', desc: 'Take the sale price and subtract your adjusted cost basis and selling costs (real estate commissions, title insurance, transfer taxes, and other closing costs). The result is your total capital gain.' },
              { step: 3, title: 'Apply the primary residence exclusion', desc: 'If the home was your primary residence and you lived there for at least 24 of the last 60 months, subtract $250,000 (single) or $500,000 (MFJ). If you lived there less than 24 months but qualify for a partial exclusion, prorate based on months lived.' },
              { step: 4, title: 'Calculate tax on the remaining gain', desc: 'Apply the appropriate long-term capital gains rate to the taxable gain: 0% if your taxable income is below ~$47K (single) / ~$94K (MFJ), 15% up to ~$518K / ~$583K, or 20% above those thresholds. Add 3.8% NIIT if your MAGI exceeds $200K / $250K.' },
              { step: 5, title: 'Add depreciation recapture tax', desc: 'If the property was ever rented out and you claimed depreciation, multiply the accumulated depreciation by 25%. Add this to your capital gains tax. The total is your overall tax on the sale.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Residence Exclusion Rules */}
        <section className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Primary Residence Exclusion Rules (Section 121)
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              The Section 121 exclusion is the single most important tax break for home sellers. Here are the rules you need to know:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 my-4">
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-emerald-400 mb-1">Exclusion Amounts</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>&#8226; <strong className="text-foreground">$250,000</strong> for single filers</li>
                  <li>&#8226; <strong className="text-foreground">$500,000</strong> for married filing jointly</li>
                  <li>&#8226; Married couples: both must meet residency test</li>
                  <li>&#8226; Only one spouse needs to meet ownership test</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-sky-400 mb-1">Qualification Requirements</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>&#8226; Own and use as primary residence for <strong className="text-foreground">2 of 5 years</strong></li>
                  <li>&#8226; The 2 years don&apos;t need to be consecutive</li>
                  <li>&#8226; Can only use exclusion <strong className="text-foreground">once every 2 years</strong></li>
                  <li>&#8226; Must report sale even if gain is fully excluded</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-amber-400 mb-1">Partial Exclusion</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>&#8226; Available if move due to health, job, or unforeseen events</li>
                  <li>&#8226; Prorated: (months lived / 24) &times; full exclusion</li>
                  <li>&#8226; IRS Safe Harbors: move &gt;50 miles for work</li>
                  <li>&#8226; Also: divorce, death of spouse, multiple births</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-red-400 mb-1">Does NOT Apply To</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>&#8226; Rental properties (never your primary residence)</li>
                  <li>&#8226; Vacation / second homes</li>
                  <li>&#8226; Home flipped in under 1 year</li>
                  <li>&#8226; Property held in a corporation or trust</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Rental Property & Second Home Sales */}
        <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Rental Property &amp; Second Home Sales
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Selling a rental property or second home is very different from selling your primary residence. Here&apos;s what you need to know:
            </p>
            <p>
              <strong className="text-foreground">Depreciation recapture at 25%:</strong> When you sell a rental property, all the depreciation you claimed (or were entitled to claim) over the years is &quot;recaptured&quot; and taxed at a flat <strong className="text-foreground">25% rate</strong>. This is separate from the regular capital gains tax. For example, if you claimed $50,000 in depreciation over 10 years, you&apos;ll owe $12,500 in recapture tax, regardless of your income bracket. This is reported on Form 4797.
            </p>
            <p>
              <strong className="text-foreground">No primary residence exclusion for pure rentals:</strong> If the property was always a rental and never your primary residence, you cannot use the Section 121 exclusion. The entire gain is taxable. However, the gain above the depreciation recapture amount is still taxed at the more favorable long-term capital gains rates.
            </p>
            <p>
              <strong className="text-foreground">1031 exchange option:</strong> Instead of paying tax on the sale of a rental property, you can defer the gain by doing a <strong className="text-foreground">1031 like-kind exchange</strong>. You must identify a replacement property within 45 days and close within 180 days. The replacement property must be an investment or business property — not a personal residence. This defers the tax; it doesn&apos;t eliminate it. When you eventually sell without a 1031 exchange, you&apos;ll owe tax on the accumulated gain.
            </p>
            <p>
              <strong className="text-foreground">Converting rental to primary residence:</strong> If you move into your rental property and use it as your primary residence for at least 2 of the 5 years before selling, you may qualify for the Section 121 exclusion. However, the IRS has a <strong className="text-foreground">5-year look-back rule</strong>: any period after 2008 where the property was not your primary residence (&quot;non-qualified use&quot;) reduces the exclusion proportionally. The depreciation recapture still applies regardless.
            </p>
          </div>
        </section>

        {/* Capital Gains Tax Rates for 2026 */}
        <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Capital Gains Tax Rates for 2026
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Long-term capital gains (assets held more than one year) are taxed at preferential rates based on your taxable income. Here are the thresholds for 2026:
            </p>
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Rate</th>
                    <th className="text-center py-3 px-3 font-semibold text-emerald-400">Single</th>
                    <th className="text-center py-3 px-3 font-semibold text-sky-400">Married Filing Jointly</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/20">
                    <td className="py-2.5 px-3 font-semibold text-emerald-400">0%</td>
                    <td className="py-2.5 px-3 text-center">Up to ~$47,000</td>
                    <td className="py-2.5 px-3 text-center">Up to ~$94,000</td>
                  </tr>
                  <tr className="border-b border-border/20">
                    <td className="py-2.5 px-3 font-semibold text-sky-400">15%</td>
                    <td className="py-2.5 px-3 text-center">~$47,000 to ~$518,000</td>
                    <td className="py-2.5 px-3 text-center">~$94,000 to ~$583,000</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-amber-400">20%</td>
                    <td className="py-2.5 px-3 text-center">Over ~$518,000</td>
                    <td className="py-2.5 px-3 text-center">Over ~$583,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong className="text-foreground">+ 3.8% NIIT for high earners:</strong> If your MAGI exceeds $200,000 (single) or $250,000 (MFJ), the Net Investment Income Tax adds 3.8% on top of your capital gains rate. So the effective maximum rate is <strong className="text-foreground">23.8%</strong> (20% + 3.8%). This applies to the lesser of your net investment income or the amount your MAGI exceeds the threshold.
            </p>
            <p>
              <strong className="text-foreground">Short-term capital gains</strong> (property held one year or less) are taxed at ordinary income rates, which range from 10% to 37%. There is no preferential treatment for short-term gains. This is why holding a property for more than one year before selling is so important for tax purposes.
            </p>
          </div>
        </section>

        {/* Key Data Box */}
        {PAGE_CONTENT.keyRates.length > 0 && (
          <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Home Sale Tax — Key Data for 2026
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PAGE_CONTENT.keyRates.map((rate) => (
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

        {/* FAQ */}
        {PAGE_CONTENT.faqs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Home Sale Tax Calculator FAQ
            </h2>
            <div className="space-y-3">
              {PAGE_CONTENT.faqs.map((faq, i) => (
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
        {PAGE_CONTENT.relatedCalculators.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Related Calculators
            </p>
            <div className="flex flex-wrap gap-3">
              {PAGE_CONTENT.relatedCalculators.map((calc) => (
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

        {/* Link to Us */}
        <div className="mt-8">
          <LinkToUs
            url={`${SITE_URL}${CONFIG.canonicalPath}`}
            title={CONFIG.title}
            slug={CONFIG.slug}
          />
        </div>

        {/* Author Bio Card */}
        <AuthorBioCard authorId={author.id} />
      </div>
    </div>
  );
}
