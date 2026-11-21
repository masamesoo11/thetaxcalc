import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import {
  TrendingUp,
  Info,
  Zap,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  Calculator,
  Scale,
  PiggyBank,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FEDERAL_TAX_2026 } from '@/lib/tax-config';
import {
  BRACKETS_2027_OFFICIAL,
  STANDARD_DEDUCTION_2027_OFFICIAL,
  INFLATION_FACTOR_2027,
  OFFICIAL_SOURCE_CITATION,
  OFFICIAL_SOURCE_URL,
  OFFICIAL_UPDATED_DATE,
  usd,
  bracketRangeLabel,
  cumulativeTaxAtBracketStart,
} from '@/lib/tax-brackets-2027';

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: { absolute: '2027 Federal Tax Brackets & Standard Deduction (Official IRS)' },
  description:
    'Official 2027 federal income tax brackets and standard deductions per IRS Rev. Proc. 2026-35 for all filing statuses, compared side by side with 2026.',
  authors: [{ name: 'TheTaxCalc Editorial Team' }],
  alternates: {
    canonical: `${SITE_URL}/tax-brackets-2027`,
  },
  openGraph: {
    title: '2027 Federal Tax Brackets & Standard Deduction (Official IRS)',
    description:
      'Official 2027 federal tax brackets and standard deduction per IRS Rev. Proc. 2026-35 for single, joint, head of household, and MFS filers.',
    url: `${SITE_URL}/tax-brackets-2027`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'Official 2027 Federal Tax Brackets — IRS Rev. Proc. 2026-35' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2027 Federal Tax Brackets & Standard Deduction (Official IRS)',
    description:
      'Official 2027 federal tax brackets and standard deduction per IRS Rev. Proc. 2026-35 for all four filing statuses.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

// ─── Shared display data ──────────────────────────────────────────────────────

const STATUS_SECTIONS: {
  key: 'single' | 'married' | 'headOfHousehold' | 'marriedSeparate';
  title: string;
  note: string;
}[] = [
  {
    key: 'single',
    title: 'Single',
    note: 'Unmarried individuals (other than surviving spouses and heads of households).',
  },
  {
    key: 'married',
    title: 'Married Filing Jointly',
    note: 'Couples combining income on one return, plus qualifying surviving spouses.',
  },
  {
    key: 'headOfHousehold',
    title: 'Head of Household',
    note: 'Unmarried taxpayers paying more than half the cost of keeping a home for a qualifying dependent.',
  },
  {
    key: 'marriedSeparate',
    title: 'Married Filing Separately',
    note: 'Mirrors single brackets through 35%; the 37% bracket starts at half the joint threshold ($396,825).',
  },
];

const rateColor = (rate: number): string => {
  if (rate <= 0.10) return 'bg-emerald-600/15 text-emerald-600 border-emerald-500/20';
  if (rate <= 0.12) return 'bg-teal-500/15 text-teal-600 border-teal-500/20';
  if (rate <= 0.22) return 'bg-amber-500/15 text-amber-700 border-amber-500/20';
  if (rate <= 0.24) return 'bg-orange-500/15 text-orange-700 border-orange-500/20';
  if (rate <= 0.32) return 'bg-rose-500/15 text-rose-700 border-rose-500/20';
  if (rate <= 0.35) return 'bg-red-500/15 text-red-600 border-red-500/20';
  return 'bg-red-600/20 text-red-600 border-red-500/30';
};

const formatTaxAmount = (amount: number): string =>
  amount % 1 === 0
    ? `$${amount.toLocaleString('en-US')}`
    : `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ─── FAQs (visible section + JSON-LD share this array) ─────────────────────────

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Are these 2027 tax brackets official?',
    a: 'Yes. Every threshold and standard deduction on this page comes directly from IRS Revenue Procedure 2026-35, published in November 2026. These are the official inflation-adjusted figures for tax year 2027.',
  },
  {
    q: 'How much did the 2027 tax brackets increase over 2026?',
    a: 'Most 2027 bracket thresholds rose by roughly 3.2% compared with 2026. For single filers, the 10% bracket rises from $12,400 to $12,800, the 12% bracket tops out at $52,025 (up from $50,400), and the top 37% rate starts above $661,375 (up from $640,600).',
  },
  {
    q: 'What is the official 2027 standard deduction?',
    a: `Per IRS Rev. Proc. 2026-35, the 2027 standard deduction is ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.single)} for single and married filing separately, ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.married)} for married filing jointly, and ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.headOfHousehold)} for head of household — up from $16,100, $32,200, and $24,150 in 2026. Taxpayers age 65 or older (or blind) receive an additional ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.additionalAgedOrBlindSingle)} (single) or ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.additionalAgedOrBlindMarried)} (married).`,
  },
  {
    q: 'When do the 2027 brackets take effect?',
    a: 'January 1, 2027. The 2027 brackets apply to income earned during calendar year 2027, which is filed in spring 2028. They do not change your 2026 return (due Thursday, April 15, 2027), but they do guide December 2026 year-end tax planning.',
  },
  {
    q: 'How does the IRS calculate annual bracket adjustments?',
    a: 'Since the 2018 tax year, the IRS indexes brackets and the standard deduction using the 12-month average of the Chained Consumer Price Index for All Urban Consumers (C-CPI-U), then rounds bracket thresholds and deduction amounts per IRC Section 1(f).',
  },
  {
    q: 'Does moving into a higher 2027 tax bracket tax all my income at the higher rate?',
    a: 'No. Federal income tax is progressive: only the dollars above each bracket threshold are taxed at the higher marginal rate. Income below each threshold stays taxed at the lower rates.',
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/tax-brackets-2027#breadcrumb`,
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Federal Tax Brackets', item: `${SITE_URL}/federal-tax-brackets` },
        { '@type': 'ListItem', position: 3, name: '2027 Federal Tax Brackets' },
      ],
    },
    {
      '@id': `${SITE_URL}/tax-brackets-2027#webpage`,
      '@type': 'WebPage',
      name: '2027 Federal Tax Brackets & Standard Deduction (Official IRS)',
      description:
        'Official 2027 federal income tax brackets and standard deductions per IRS Rev. Proc. 2026-35 for all four filing statuses.',
      url: `${SITE_URL}/tax-brackets-2027`,
      inLanguage: 'en-US',
      dateModified: OFFICIAL_UPDATED_DATE,
      author: { '@id': `${SITE_URL}/tax-brackets-2027#author` },
      reviewedBy: { '@id': `${SITE_URL}/tax-brackets-2027#author` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/tax-brackets-2027#breadcrumb` },
    },
    { '@id': `${SITE_URL}/tax-brackets-2027#author`, ...authorToJsonLd(getCalculatorAuthor()) },
    {
      '@id': `${SITE_URL}/tax-brackets-2027#faq`,
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TaxBrackets2027Page() {
  const single2026 = FEDERAL_TAX_2026.bracketsByFiling.single;
  const mfj2026 = FEDERAL_TAX_2026.bracketsByFiling.married;
  const single2027 = BRACKETS_2027_OFFICIAL.single;
  const mfj2027 = BRACKETS_2027_OFFICIAL.married;
  const pctUp = ((INFLATION_FACTOR_2027 - 1) * 100).toFixed(2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-mesh-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <Link href="/federal-tax-brackets" className="hover:text-foreground transition-colors">Federal Tax Brackets</Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-foreground font-medium">2027 Tax Brackets</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 text-sm text-emerald-700 mb-6">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Official IRS Numbers — {OFFICIAL_SOURCE_CITATION} (Released November 2026)
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            2027 <span className="gradient-text">Federal Tax Brackets</span>
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
            The IRS has published the official 2027 federal income tax brackets and standard
            deductions in{' '}
            <a
              href={OFFICIAL_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-500 underline font-medium"
            >
              {OFFICIAL_SOURCE_CITATION}
            </a>
            . Thresholds increased roughly <strong className="text-foreground">{pctUp}%</strong>{' '}
            for inflation over 2026, with the standard deduction rising to{' '}
            <strong className="text-foreground">{usd(STANDARD_DEDUCTION_2027_OFFICIAL.single)}</strong>{' '}
            (single) and{' '}
            <strong className="text-foreground">{usd(STANDARD_DEDUCTION_2027_OFFICIAL.married)}</strong>{' '}
            (married filing jointly).
          </p>

          <div className="mt-6 premium-card p-5 flex items-start gap-3 max-w-3xl">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Verified against primary source:</strong> every
              bracket threshold, cumulative base tax, and standard deduction below is transcribed
              directly from{' '}
              <a
                href={OFFICIAL_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-500 underline"
              >
                IRS Revenue Procedure 2026-35 (PDF)
              </a>
              . These rates apply to income earned in calendar year 2027 (returns filed in spring 2028).
            </p>
          </div>
        </div>
      </section>

      {/* ─── Official 2027 Standard Deduction ──────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Official 2027 <span className="gradient-text">Standard Deduction</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Published in {OFFICIAL_SOURCE_CITATION}, Section 3.15. Official 2026 amounts are shown
              for comparison.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                status: 'Single / MFS',
                curr: usd(STANDARD_DEDUCTION_2027_OFFICIAL.single),
                prev: `2026: ${usd(FEDERAL_TAX_2026.standardDeductionsByFiling.single)} (+$500)`,
                icon: PiggyBank,
                color: 'from-emerald-600/20 to-teal-600/10',
                accent: 'text-emerald-600',
              },
              {
                status: 'Married Filing Jointly',
                curr: usd(STANDARD_DEDUCTION_2027_OFFICIAL.married),
                prev: `2026: ${usd(FEDERAL_TAX_2026.standardDeductionsByFiling.married)} (+$1,000)`,
                icon: TrendingUp,
                color: 'from-teal-600/20 to-emerald-600/10',
                accent: 'text-teal-600',
              },
              {
                status: 'Head of Household',
                curr: usd(STANDARD_DEDUCTION_2027_OFFICIAL.headOfHousehold),
                prev: `2026: ${usd(FEDERAL_TAX_2026.standardDeductionsByFiling.head_of_household)} (+$775)`,
                icon: Scale,
                color: 'from-amber-600/20 to-yellow-600/10',
                accent: 'text-amber-700',
              },
              {
                status: 'Age 65+ / Blind Extra',
                curr: `${usd(STANDARD_DEDUCTION_2027_OFFICIAL.additionalAgedOrBlindSingle)} / ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.additionalAgedOrBlindMarried)}`,
                prev: 'Single / Married (per spouse)',
                icon: Zap,
                color: 'from-rose-600/20 to-pink-600/10',
                accent: 'text-rose-700',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.status} className="premium-card p-6 hover-lift">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                    <Icon className={`h-5 w-5 ${item.accent}`} />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    {item.status}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{item.curr}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.prev}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Official 2027 Bracket Tables ──────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Official 2027 Brackets by <span className="gradient-text">Filing Status</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Seven progressive brackets — 10% to 37% — from {OFFICIAL_SOURCE_CITATION}, Section 3.01.
              All four filing-status tables are shown in full.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {STATUS_SECTIONS.map((sec) => {
              const brackets = BRACKETS_2027_OFFICIAL[sec.key];
              return (
                <div key={sec.key} className="premium-card p-4 sm:p-6 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">{sec.title}</h3>
                  <p className="mt-1 mb-4 text-xs text-muted-foreground">{sec.note}</p>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/20 hover:bg-transparent">
                        <TableHead className="text-muted-foreground font-semibold">Rate</TableHead>
                        <TableHead className="text-muted-foreground font-semibold">Taxable Income Range</TableHead>
                        <TableHead className="text-muted-foreground font-semibold text-right">Tax on Lower Brackets</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {brackets.map((b, i) => {
                        const taxOnLower = cumulativeTaxAtBracketStart(brackets, i);
                        return (
                          <TableRow key={b.rate} className="border-border/10 hover:bg-muted/30">
                            <TableCell>
                              <Badge variant="outline" className={`font-bold text-xs px-2.5 py-0.5 border ${rateColor(b.rate)}`}>
                                {(b.rate * 100).toFixed(0)}%
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium text-foreground">{bracketRangeLabel(b)}</TableCell>
                            <TableCell className="text-right text-muted-foreground tabular-nums">
                              {taxOnLower > 0 ? formatTaxAmount(taxOnLower) : '—'}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-muted-foreground flex items-start gap-2">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            Brackets apply to <strong>taxable income</strong> — gross income minus the standard
            deduction (or itemized deductions). Only the income inside each bracket is taxed at that
            rate.
          </p>
        </div>
      </section>

      {/* ─── 2026 vs 2027 Comparison ───────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              2026 vs <span className="gradient-text">2027 Official Brackets</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Side-by-side comparison of official IRS Rev. Proc. 2025-32 (2026) and Rev. Proc.
              2026-35 (2027) thresholds for single and joint filers.
            </p>
          </div>

          <div className="premium-card p-4 sm:p-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/20 hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-semibold">Rate</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Single 2026</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Single 2027 (official)</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Joint 2026</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Joint 2027 (official)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {single2027.map((b, i) => {
                  const s26 = single2026[i];
                  const m26 = mfj2026[i];
                  const m27 = mfj2027[i];
                  const b26 = { min: s26.min, max: s26.max };
                  const m26b = { min: m26.min, max: m26.max };
                  return (
                    <TableRow key={b.rate} className="border-border/10 hover:bg-muted/30">
                      <TableCell>
                        <Badge variant="outline" className={`font-bold text-xs px-2.5 py-0.5 border ${rateColor(b.rate)}`}>
                          {(b.rate * 100).toFixed(0)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{bracketRangeLabel(b26)}</TableCell>
                      <TableCell className="font-medium text-foreground">{bracketRangeLabel(b)}</TableCell>
                      <TableCell className="text-muted-foreground">{bracketRangeLabel(m26b)}</TableCell>
                      <TableCell className="font-medium text-foreground">{bracketRangeLabel(m27)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* ─── Primary Source & Verification ──────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Official <span className="gradient-text">IRS Source &amp; Methodology</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              How the IRS indexes annual brackets and where every number on this page is verified.
            </p>
          </div>

          <div className="premium-card p-6 max-w-4xl space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Every 2027 bracket threshold, cumulative base tax, and standard deduction on this page
              is sourced from{' '}
              <a
                href={OFFICIAL_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 underline font-medium"
              >
                {OFFICIAL_SOURCE_CITATION}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>{' '}
              (Section 3.01 for tax rate tables; Section 3.15 for the standard deduction).
            </p>
            <p>
              Under IRC Section 1(f) as amended by the TCJA and made permanent under the OBBBA, the
              IRS adjusts thresholds using the 12-month average of the{' '}
              <strong className="text-foreground">Chained CPI-U (C-CPI-U)</strong>, pushing 2027
              thresholds up by roughly <strong className="text-foreground">{pctUp}%</strong> over{' '}
              <Link href="/federal-tax-brackets" className="text-emerald-600 hover:text-emerald-500 underline">
                official 2026 brackets (Rev. Proc. 2025-32)
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ─── Planning Moves ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              What This Means for Your <span className="gradient-text">Year-End Planning</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Four practical moves between now and January using the official 2027 bracket room.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: 'Defer income into 2027',
                body: `Thresholds rose roughly ${pctUp}%. A single filer gets ${usd(single2027[1].min)} of income in the 10% bracket in 2027 (vs ${usd(single2026[1].min)} in 2026) and the 22% bracket starts above ${usd(single2027[2].min)} (vs ${usd(single2026[2].min)}). Deferring a December bonus or invoice into January puts it into slightly wider brackets.`,
                icon: Clock,
              },
              {
                title: 'Check Roth conversion headroom',
                body: `Converting traditional IRA funds to a Roth fills your lowest brackets first. Filling a single filer's 10% and 12% brackets in 2027 covers up to ${usd(single2027[2].min)} of taxable income before the 22% rate begins — ${usd(single2027[2].min - single2026[2].min)} more room than 2026.`,
                icon: PiggyBank,
              },
              {
                title: 'Tune your 2027 withholding',
                body: `The standard deduction rising to ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.single)} (single) and ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.married)} (joint) means slightly less federal tax withheld per paycheck in 2027 for the same salary. Check your W-4 in January so you neither over-withhold nor underpay.`,
                icon: Calculator,
              },
              {
                title: 'Time itemized deductions',
                body: `If you are near the standard deduction threshold, compare taking deductible expenses in 2026 versus 2027. With the higher ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.single)} / ${usd(STANDARD_DEDUCTION_2027_OFFICIAL.married)} deduction in 2027, bunching charitable gifts or state payments into one tax year can beat taking the standard deduction both years.`,
                icon: CheckCircle2,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="premium-card p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
                      <Icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              2027 Bracket <span className="gradient-text">FAQ</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Common questions about the official 2027 federal income tax brackets
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group premium-card p-5">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-foreground text-sm sm:text-base">{faq.q}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed pl-8">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-emerald p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              See What You Actually <span className="gradient-text">Take Home</span>
            </h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Brackets are just the federal piece. Our paycheck calculator layers in FICA and your
              state&apos;s income tax for a real take-home number.
            </p>
            <Link
              href="/paycheck-calculator"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
            >
              <Calculator className="h-5 w-5" />
              Try the Paycheck Calculator
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-8 border-t border-emerald-500/20 pt-6">
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <Link href="/federal-tax-brackets" className="text-muted-foreground hover:text-emerald-600 underline transition-colors">
                  Official 2026 Brackets
                </Link>
                <Link href="/obbba-tax-calculator" className="text-muted-foreground hover:text-emerald-600 underline transition-colors">
                  OBBBA Tax Calculator
                </Link>
                <Link href="/salary" className="text-muted-foreground hover:text-emerald-600 underline transition-colors">
                  Salary After Tax Explorer
                </Link>
                <Link href="/calculators" className="text-muted-foreground hover:text-emerald-600 underline transition-colors">
                  All Calculators
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Author (E-E-A-T) ──────────────────────────────────────────── */}
      <section className="py-12 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthorBioCard authorId="editorial-team" />
        </div>
      </section>
    </>
  );
}
