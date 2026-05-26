import { Metadata } from 'next';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  Calculator,
  ArrowRight,
  ChevronRight,
  Info,
  Zap,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { BracketsTabs } from './brackets-tabs';

// ─── Page Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: '2026 Federal Tax Brackets — Rates, Standard Deductions & Examples | TaxYield.io',
  description:
    'Complete 2026 federal income tax brackets for Single, Married Filing Jointly, and Head of Household. Includes standard deductions, progressive tax explanation, effective vs marginal rates, and a $75,000 salary breakdown example.',
  keywords: [
    '2026 federal tax brackets',
    '2026 tax brackets',
    'federal income tax brackets 2026',
    '2026 tax rates',
    '2026 standard deduction',
    'marginal tax rate 2026',
    'effective tax rate 2026',
    'IRS tax brackets 2026',
    'progressive tax system',
    'federal tax rates by income',
    'single tax brackets 2026',
    'married filing jointly brackets 2026',
    'head of household tax brackets 2026',
    'tax bracket calculator',
    'how federal tax brackets work',
  ],
  authors: [{ name: 'TaxYield.io' }],
  alternates: {
    canonical: 'https://taxyield.io/federal-tax-brackets',
    languages: {
      'en-US': 'https://taxyield.io/federal-tax-brackets',
      'x-default': 'https://taxyield.io/federal-tax-brackets',
    },
  },
  openGraph: {
    title: '2026 Federal Tax Brackets — Rates, Standard Deductions & Examples',
    description:
      'Complete 2026 federal tax brackets for all filing statuses. Standard deductions, progressive tax explanation, and effective vs marginal rates.',
    url: 'https://taxyield.io/federal-tax-brackets',
    siteName: 'TaxYield.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 Federal Tax Brackets — Rates, Standard Deductions & Examples',
    description:
      'Complete 2026 federal tax brackets for all filing statuses. Standard deductions, progressive tax explanation, and effective vs marginal rates.',
  },
};

// ─── JSON-LD Structured Data ────────────────────────────────────────────────────

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
        {
          '@type': 'ListItem',
          position: 2,
          name: '2026 Federal Tax Brackets',
          item: 'https://taxyield.io/federal-tax-brackets',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are the 2026 federal tax brackets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 2026 federal income tax has seven brackets: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. For single filers, the brackets are $0–$11,925 (10%), $11,926–$48,475 (12%), $48,476–$103,350 (22%), $103,351–$197,300 (24%), $197,301–$250,525 (32%), $250,526–$626,350 (35%), and over $626,350 (37%). The bracket widths double for married filing jointly.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the 2026 standard deduction?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 2026 standard deduction is $15,000 for Single and Married Filing Separately, $30,000 for Married Filing Jointly, and $22,500 for Head of Household. Taxpayers age 65 or older get an additional $2,000 (single/HOH) or $1,600 per spouse (married).',
          },
        },
        {
          '@type': 'Question',
          name: 'How do progressive tax brackets work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The U.S. uses a progressive tax system where each bracket is taxed at its own rate. Only the income within a bracket is taxed at that rate — not your entire income. For example, a single filer earning $75,000 pays 10% on the first $11,925, 12% on income from $11,926 to $48,475, and 22% on income from $48,476 to $60,000 (the taxable income after the $15,000 standard deduction).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between marginal and effective tax rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your marginal tax rate is the rate applied to your last (highest) dollar of income — it is the top bracket you reach. Your effective tax rate is the total tax you owe divided by your total income, which is always lower than your marginal rate because of progressive brackets and the standard deduction.',
          },
        },
        {
          '@type': 'Question',
          name: 'Did the 2026 tax brackets change from 2025?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the IRS adjusts tax brackets annually for inflation. For 2026, bracket thresholds increased by approximately 2.8% compared to 2025. The standard deduction also increased: $15,000 (single) vs $14,600 in 2025, and $30,000 (MFJ) vs $29,200 in 2025.',
          },
        },
      ],
    },
    {
      '@type': 'Dataset',
      name: '2026 Federal Income Tax Brackets',
      description: 'Official 2026 federal tax brackets for all filing statuses with standard deductions.',
      variableMeasured: [
        { name: '10% Bracket Upper Limit (Single)', value: '$11,925' },
        { name: '12% Bracket Upper Limit (Single)', value: '$48,475' },
        { name: '22% Bracket Upper Limit (Single)', value: '$103,350' },
        { name: '24% Bracket Upper Limit (Single)', value: '$197,300' },
        { name: '32% Bracket Upper Limit (Single)', value: '$250,525' },
        { name: '35% Bracket Upper Limit (Single)', value: '$626,350' },
        { name: '37% Bracket Threshold (Single)', value: 'Over $626,350' },
        { name: 'Standard Deduction (Single)', value: '$15,000' },
        { name: 'Standard Deduction (MFJ)', value: '$30,000' },
        { name: 'Standard Deduction (HOH)', value: '$22,500' },
      ],
    },
  ],
};

// ─── FAQ Data ───────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'What are the 2026 federal tax brackets?',
    a: 'Seven brackets for 2026: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. For single filers, the ranges go from $0–$11,925 at 10% up to anything over $626,350 at 37%. Married filing jointly? The bracket widths basically double. And no — only the income within each bracket gets taxed at that rate. Your whole paycheck doesn\'t get hit with the top rate.',
  },
  {
    q: 'What is the 2026 standard deduction?',
    a: 'For 2026: $15,000 for Single and Married Filing Separately, $30,000 for Married Filing Jointly, $22,500 for Head of Household. If you\'re 65 or older, you get an extra $2,000 (single/HOH) or $1,600 per spouse (married). Most people just take the standard deduction — it\'s simpler and usually better than itemizing unless you have a ton of mortgage interest or charitable donations.',
  },
  {
    q: 'How do progressive tax brackets work?',
    a: 'Progressive means your income gets taxed in layers, not all at one rate. Take a single filer making $75,000. After the $15,000 standard deduction, taxable income is $60,000. The first $11,925 gets 10%, the chunk from $11,926 to $48,475 gets 12%, and only the remaining $11,525 gets 22%. Your total federal tax is the sum of those three pieces — not 22% of the whole thing. Big difference.',
  },
  {
    q: 'What is the difference between marginal and effective tax rates?',
    a: 'Your marginal rate is what hits your last dollar earned — it\'s your top bracket. Your effective rate is your total tax divided by your total income — the real average rate you pay. Example: a single filer at $75K has a marginal rate of 22% but an effective federal rate of about 11.6%. That\'s a massive difference, and confusing the two is why some people think a raise will cost them money. It won\'t.',
  },
  {
    q: 'Did the 2026 tax brackets change from 2025?',
    a: 'Yep. The IRS adjusts for inflation every year. For 2026, bracket thresholds went up roughly 2.8% compared to 2025. Standard deduction went from $14,600 to $15,000 (single) and $29,200 to $30,000 (married). These adjustments are supposed to prevent "bracket creep" — where inflation pushes you into a higher bracket even though your purchasing power didn\'t actually improve. Doesn\'t always work perfectly, but it helps.',
  },
  {
    q: 'What is the standard deduction for someone 65 or older?',
    a: 'For 2026, if you\'re 65+, you get an extra deduction on top of the base. Single and HOH filers get another $2,000 (so $17,000 or $24,500 total). Married filing jointly gets $1,600 per qualifying spouse — so a married couple both 65+ would deduct $33,200 ($30,000 + $1,600 + $1,600). Nice little bonus for older taxpayers.',
  },
];

// ─── $75,000 Salary Breakdown ──────────────────────────────────────────────────

const SALARY_BREAKDOWN = [
  { label: 'Gross Annual Salary', value: '$75,000.00', color: 'text-foreground' },
  { label: 'Standard Deduction (Single)', value: '−$15,000.00', color: 'text-muted-foreground', isDividerAfter: true },
  { label: 'Taxable Income', value: '$60,000.00', color: 'text-foreground font-semibold' },
  { label: '10% on first $11,925', value: '$1,192.50', color: 'text-emerald-400' },
  { label: '12% on $11,926 – $48,475', value: '$4,386.00', color: 'text-teal-400' },
  { label: '22% on $48,476 – $60,000', value: '$2,534.50', color: 'text-amber-400' },
  { label: 'Total Federal Tax', value: '$8,113.00', color: 'text-red-400 font-semibold', isDividerAfter: true },
  { label: 'Effective Federal Rate', value: '10.82%', color: 'text-foreground' },
  { label: 'Marginal Rate', value: '22%', color: 'text-foreground' },
];

// ─── Server Component Page ──────────────────────────────────────────────────────

export default function FederalTaxBracketsPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-mesh-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Federal Tax Brackets</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-6">
            <Zap className="h-3.5 w-3.5" />
            Updated for 2026 Tax Year
          </div>

          {/* H1 */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            2026 <span className="gradient-text">Federal Tax Brackets</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
            Look, tax brackets confuse almost everyone — and honestly, the IRS doesn&apos;t make it easy.
            Here are the complete 2026 brackets for every filing status, explained like a friend would
            explain them. Not a textbook. Plus a real{' '}
            <strong className="text-foreground">$75,000 salary breakdown</strong> so you can see
            how it actually works in practice.
          </p>
        </div>
      </section>

      {/* ─── 2026 Tax Brackets Table ──────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              2026 Federal <span className="gradient-text">Tax Brackets</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Pick your filing status below. These are the official IRS numbers for 2026 —
              not estimates, not last year&apos;s data. The real deal.
            </p>
          </div>

          <div className="premium-card p-4 sm:p-6">
            <BracketsTabs />
          </div>

          <p className="mt-4 text-xs text-muted-foreground flex items-start gap-2">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            Tax brackets apply to <strong>taxable income</strong>, which is your gross income minus the standard deduction (or itemized deductions). Only the income within each bracket is taxed at that rate.
          </p>
        </div>
      </section>

      {/* ─── 2026 Standard Deductions ──────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              2026 <span className="gradient-text">Standard Deductions</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              The standard deduction is basically free money — it shaves thousands off your taxable income
              before any brackets kick in. Most people take it instead of itemizing. Here are the 2026 amounts:
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                status: 'Single',
                amount: '$15,000',
                detail: 'Also applies to Married Filing Separately',
                icon: DollarSign,
                color: 'from-emerald-600/20 to-teal-600/10',
                accent: 'text-emerald-400',
              },
              {
                status: 'Married Filing Jointly',
                amount: '$30,000',
                detail: 'Also applies to Surviving Spouses',
                icon: TrendingUp,
                color: 'from-teal-600/20 to-emerald-600/10',
                accent: 'text-teal-400',
              },
              {
                status: 'Head of Household',
                amount: '$22,500',
                detail: 'For unmarried taxpayers with dependents',
                icon: Calculator,
                color: 'from-amber-600/20 to-yellow-600/10',
                accent: 'text-amber-400',
              },
              {
                status: 'Age 65+ Additional',
                amount: '$2,000 / $1,600',
                detail: '$2,000 extra (Single/HOH) · $1,600 each (Married)',
                icon: Info,
                color: 'from-rose-600/20 to-pink-600/10',
                accent: 'text-rose-400',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.status}
                  className="premium-card p-6 hover-lift"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                    <Icon className={`h-5 w-5 ${item.accent}`} />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    {item.status}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{item.amount}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              );
            })}
          </div>

          {/* Additional deduction example */}
          <div className="mt-6 premium-card p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Example:</strong> A married couple where both spouses are 65 or older
                would have a standard deduction of{' '}
                <span className="text-emerald-400 font-semibold">$33,200</span> ($30,000 base + $1,600 + $1,600).
                This reduces their taxable income before any bracket is applied.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How Progressive Tax Works ──────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Explanation */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                How <span className="gradient-text">Progressive Tax</span> Works
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The U.S. tax system is <strong className="text-foreground">progressive</strong> — which
                sounds like a political statement, but it just means your income gets taxed in layers.
                Your <em>entire income is NOT</em> taxed at your highest bracket rate. That&apos;s the
                #1 misconception we hear.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Think of it like buckets. You fill the 10% bucket first, then overflow goes into
                the 12% bucket, then the 22% bucket, and so on. Only the dollars that spill into
                a higher bucket get taxed at the higher rate. Make sense?
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Only income within each bracket range is taxed at that rate',
                  'The standard deduction removes $15,000 (single) from taxation entirely',
                  'Moving into a higher bracket only affects income above the threshold',
                  'Your total tax is the sum of tax from each bracket',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* $75,000 Breakdown Card */}
            <div className="premium-card-result p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Example: $75,000 Single Filer
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                How federal tax is calculated on a $75,000 salary for a single filer in 2026
              </p>
              <div className="space-y-3 text-sm">
                {SALARY_BREAKDOWN.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center">
                      <span className={item.color.includes('font') ? 'text-muted-foreground' : 'text-muted-foreground'}>
                        {item.label}
                      </span>
                      <span className={`font-medium tabular-nums ${item.color}`}>
                        {item.value}
                      </span>
                    </div>
                    {item.isDividerAfter && <div className="divider-glow mt-3 mb-3" />}
                  </div>
                ))}
              </div>

              {/* Visual bracket fill */}
              <div className="mt-6 space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Bracket Fill Visualization</p>
                <div className="flex rounded-lg overflow-hidden h-8 text-xs font-semibold">
                  <div className="bg-emerald-500/30 flex items-center justify-center text-emerald-300" style={{ width: '19.9%' }}>
                    10%
                  </div>
                  <div className="bg-teal-500/30 flex items-center justify-center text-teal-300" style={{ width: '60.9%' }}>
                    12%
                  </div>
                  <div className="bg-amber-500/30 flex items-center justify-center text-amber-300" style={{ width: '19.2%' }}>
                    22%
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>$0</span>
                  <span>$11,925</span>
                  <span>$48,475</span>
                  <span>$60,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Effective vs Marginal Rate ──────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Effective vs <span className="gradient-text">Marginal Rate</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              This trips up a LOT of people. Your marginal rate and effective rate are completely different
              numbers — and confusing them leads to bad decisions (like turning down a raise because you
              think you&apos;ll lose money).
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Marginal Rate Card */}
            <div className="premium-card p-6 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600/20 to-orange-600/10">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Marginal Tax Rate</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The <strong className="text-foreground">marginal rate</strong> is the tax rate on your{' '}
                <em>last dollar</em> of income — the top bracket you reach. This is the number people
                usually quote when they say &ldquo;I&apos;m in the 22% bracket.&rdquo; But it doesn&apos;t mean
                all your income is taxed at 22%.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/15">
                <p className="text-sm">
                  <span className="text-amber-400 font-semibold">Example:</span>{' '}
                  <span className="text-muted-foreground">A single filer with $60,000 taxable income has a marginal rate of{' '}
                  <strong className="text-foreground">22%</strong> — the top bracket their income reaches.</span>
                </p>
              </div>
            </div>

            {/* Effective Rate Card */}
            <div className="premium-card p-6 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
                  <Calculator className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Effective Tax Rate</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The <strong className="text-foreground">effective rate</strong> is your total federal tax divided by
                your <em>total (gross)</em> income. This is what you <em>actually</em> pay, on average.
                It&apos;s always lower than your marginal rate — usually way lower.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/15">
                <p className="text-sm">
                  <span className="text-emerald-400 font-semibold">Example:</span>{' '}
                  <span className="text-muted-foreground">Same filer: $8,113 tax ÷ $75,000 gross ={' '}
                  <strong className="text-foreground">10.82%</strong> effective rate — nearly half the marginal rate.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="mt-6 premium-card p-5">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Key Insight:</strong> Getting a raise that pushes you into
                the next bracket only affects the dollars <em>above</em> the threshold. If you&apos;re a single
                filer at $48,000 and get a $2,000 raise, only the $475 above the 12% bracket limit ($48,475)
                is taxed at 22%. The rest is still at 10% and 12%. You <em>never</em> lose money by earning more.
                We can&apos;t believe we still have to say this, but here we are.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Federal Tax Brackets <span className="gradient-text">FAQ</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Common questions about the 2026 federal income tax brackets
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group premium-card p-5"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-foreground text-sm sm:text-base">{faq.q}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed pl-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-emerald p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Calculate Your <span className="gradient-text">Take-Home Pay</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Now that you understand how federal tax brackets work, use our paycheck calculator
              to see your actual take-home pay after federal tax, FICA, and state income tax.
            </p>
            <Link
              href="/paycheck-calculator"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
            >
              <Calculator className="h-5 w-5" />
              Try the Paycheck Calculator
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* State calculator links */}
            <div className="mt-8 border-t border-emerald-500/20 pt-6">
              <p className="text-sm text-muted-foreground mb-3">See how state taxes affect your take-home:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { href: '/illinois-tax-calculator', label: 'Illinois' },
                  { href: '/texas-tax-calculator', label: 'Texas' },
                  { href: '/florida-tax-calculator', label: 'Florida' },
                  { href: '/california-tax-calculator', label: 'California' },
                  { href: '/new-york-tax-calculator', label: 'New York' },
                ].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Other useful links */}
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/salary" className="text-muted-foreground hover:text-emerald-400 underline transition-colors">
                Salary Explorer
              </Link>
              <Link href="/glossary" className="text-muted-foreground hover:text-emerald-400 underline transition-colors">
                Tax Glossary
              </Link>
              <a href="https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-400 underline transition-colors">
                IRS Brackets Page ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
