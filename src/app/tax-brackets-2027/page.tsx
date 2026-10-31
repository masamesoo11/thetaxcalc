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
  AlertTriangle,
  Scale,
  PiggyBank,
  Clock,
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
  BRACKETS_2027_PROJECTED,
  STANDARD_DEDUCTION_2027_PROJECTED,
  PROJECTION_FACTOR,
  SENSITIVITY_FACTOR,
  CCPI_MONTHLY,
  CCPI_WINDOW_NOTE,
  OFFICIAL_RELEASE_EXPECTED,
  PROJECTION_PUBLISHED,
  usd,
  bracketRangeLabel,
  cumulativeTaxAtBracketStart,
} from '@/lib/tax-brackets-2027';

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: { absolute: '2027 Tax Brackets (Projected) — Estimated Federal Rates & Standard Deduction' },
  description:
    'Projected 2027 federal tax brackets for all four filing statuses, computed with the IRS\u2019s own chained-CPI methodology ahead of the official November 2026 release. Updated the day the IRS publishes.',
  keywords: [
    '2027 tax brackets',
    'projected 2027 tax brackets',
    '2027 federal tax brackets',
    '2027 tax brackets estimate',
    '2027 standard deduction',
    '2027 tax rates',
    '2027 irs brackets prediction',
    '2027 inflation adjustment tax',
  ],
  authors: [{ name: 'TheTaxCalc Editorial Team' }],
  alternates: {
    canonical: `${SITE_URL}/tax-brackets-2027`,
  },
  openGraph: {
    title: '2027 Tax Brackets (Projected) — Estimated Federal Rates',
    description:
      'Projected 2027 federal tax brackets and standard deduction, computed with the IRS\u2019s chained-CPI methodology.',
    url: `${SITE_URL}/tax-brackets-2027`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: '2027 Projected Federal Tax Brackets' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2027 Tax Brackets (Projected) — Estimated Federal Rates',
    description:
      'Projected 2027 federal tax brackets and standard deduction, computed with the IRS\u2019s chained-CPI methodology.',
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
    note: 'Unmarried or legally separated filers.',
  },
  {
    key: 'married',
    title: 'Married Filing Jointly',
    note: 'Couples combining income on one return. The best deal for most households.',
  },
  {
    key: 'headOfHousehold',
    title: 'Head of Household',
    note: 'Unmarried taxpayers paying more than half the cost of keeping a home for a qualifying dependent.',
  },
  {
    key: 'marriedSeparate',
    title: 'Married Filing Separately',
    note: 'Mirrors single brackets, except the 37% threshold is half the joint one.',
  },
];

const rateColor = (rate: number): string => {
  if (rate <= 10) return 'bg-emerald-600/15 text-emerald-600 border-emerald-500/20';
  if (rate <= 12) return 'bg-teal-500/15 text-teal-400 border-teal-500/20';
  if (rate <= 22) return 'bg-amber-500/15 text-amber-700 border-amber-500/20';
  if (rate <= 24) return 'bg-orange-500/15 text-orange-700 border-orange-500/20';
  if (rate <= 32) return 'bg-rose-500/15 text-rose-700 border-rose-500/20';
  if (rate <= 35) return 'bg-red-500/15 text-red-600 border-red-500/20';
  return 'bg-red-600/20 text-red-600 border-red-500/30';
};

// ─── FAQs (visible section + JSON-LD share this array) ─────────────────────────

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Are these 2027 tax brackets official?',
    a: 'No. The numbers on this page are projections published ahead of the IRS release. The official 2027 inflation adjustments arrive in an IRS revenue procedure, expected early-to-mid November 2026, and we will update every number on this page the same day they publish. Until then, treat these figures as planning estimates computed from published inflation data.',
  },
  {
    q: 'How accurate are the projections?',
    a: 'They are built with the same math the IRS uses: the chained CPI-U 12-month averages ending August 2026 versus August 2025, applied to each official 2026 threshold, then rounded to the nearest $25 ($50 for the standard deduction). Because every input index value through August 2026 has already been published, the main uncertainty is only in how the IRS handles the missing October 2025 data point. Our sensitivity check (dropping that month entirely) moves thresholds by at most one $25 rounding step.',
  },
  {
    q: 'What is chained CPI, and why does the IRS use it?',
    a: 'The chained CPI-U (C-CPI-U) measures inflation while accounting for the way consumers substitute cheaper goods when prices rise. Since the 2018 tax year, the IRS has indexed brackets and the standard deduction by the 12-month average of this index rather than headline CPI, which makes annual adjustments slightly smaller. The full monthly index values used for these projections are shown in the methodology table above.',
  },
  {
    q: 'When do the 2027 brackets take effect?',
    a: 'January 1, 2027. The 2027 brackets apply to income earned during calendar year 2027, which is filed in spring 2028. They do not affect your 2026 return at all — but they do matter for year-end moves in December 2026, like deferring a bonus or invoice into January.',
  },
  {
    q: 'What is the projected 2027 standard deduction?',
    a: `${usd(STANDARD_DEDUCTION_2027_PROJECTED.single)} for single and married filing separately, ${usd(STANDARD_DEDUCTION_2027_PROJECTED.married)} for married filing jointly, and ${usd(STANDARD_DEDUCTION_2027_PROJECTED.headOfHousehold)} for head of household — up from $16,100, $32,200, and $24,150 in 2026.`,
  },
  {
    q: 'Why is there no October 2025 inflation number in the methodology table?',
    a: 'The October 2025 CPI report was cancelled during the federal government shutdown, so the Bureau of Labor Statistics never published a C-CPI-U value for that month. We interpolate it as the midpoint of September and November 2025 (180.131) — the most neutral treatment available — and the sensitivity factor shows the alternative approach changes thresholds by at most about $25.',
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
        { '@type': 'ListItem', position: 3, name: '2027 Tax Brackets (Projected)' },
      ],
    },
    {
      '@id': `${SITE_URL}/tax-brackets-2027#webpage`,
      '@type': 'WebPage',
      name: '2027 Tax Brackets (Projected) — Estimated Federal Rates & Standard Deduction',
      description:
        'Projected 2027 federal tax brackets for all four filing statuses, computed with the IRS\u2019s own chained-CPI methodology ahead of the official November 2026 release.',
      url: `${SITE_URL}/tax-brackets-2027`,
      inLanguage: 'en-US',
      dateModified: PROJECTION_PUBLISHED,
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
  const single2027 = BRACKETS_2027_PROJECTED.single;
  const mfj2027 = BRACKETS_2027_PROJECTED.married;
  const pctUp = ((PROJECTION_FACTOR - 1) * 100).toFixed(2);

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
            <span className="text-foreground font-medium">2027 (Projected)</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/25 px-4 py-1.5 text-sm text-amber-700 mb-6">
            <Clock className="h-3.5 w-3.5" />
            Projections — official IRS numbers expected {OFFICIAL_RELEASE_EXPECTED}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            2027 <span className="gradient-text">Federal Tax Brackets</span> (Projected)
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
            The IRS won&apos;t publish the official 2027 brackets until November 2026 — but every
            inflation input it needs is <strong className="text-foreground">already published</strong>.
            We applied the IRS&apos;s own adjustment methodology to the official 2026 thresholds, so
            you can plan year-end moves now instead of waiting. Thresholds are projected to rise{' '}
            <strong className="text-foreground">{pctUp}%</strong>, and we&apos;ll swap in the
            official numbers the day they land.
          </p>

          <div className="mt-6 premium-card p-5 flex items-start gap-3 max-w-3xl">
            <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Read this first:</strong> these are estimates, not
              IRS numbers. They&apos;re built for planning — December bonus timing, Roth conversion
              headroom, withholding checks. Don&apos;t file anything with them. The official revenue
              procedure is expected {OFFICIAL_RELEASE_EXPECTED}, and this page updates same-day.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Projected 2027 Standard Deduction ─────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Projected 2027 <span className="gradient-text">Standard Deduction</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Rounded to the nearest $50, the way the IRS does it. The 2026 official amounts are
              shown for comparison.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                status: 'Single / MFS',
                proj: usd(STANDARD_DEDUCTION_2027_PROJECTED.single),
                prev: usd(FEDERAL_TAX_2026.standardDeductionsByFiling.single),
                icon: PiggyBank,
                color: 'from-emerald-600/20 to-teal-600/10',
                accent: 'text-emerald-600',
              },
              {
                status: 'Married Filing Jointly',
                proj: usd(STANDARD_DEDUCTION_2027_PROJECTED.married),
                prev: usd(FEDERAL_TAX_2026.standardDeductionsByFiling.married),
                icon: TrendingUp,
                color: 'from-teal-600/20 to-emerald-600/10',
                accent: 'text-teal-400',
              },
              {
                status: 'Head of Household',
                proj: usd(STANDARD_DEDUCTION_2027_PROJECTED.headOfHousehold),
                prev: usd(FEDERAL_TAX_2026.standardDeductionsByFiling.head_of_household),
                icon: Scale,
                color: 'from-amber-600/20 to-yellow-600/10',
                accent: 'text-amber-700',
              },
              {
                status: 'Projected increase',
                proj: `+${pctUp}%`,
                prev: 'chained CPI-U',
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
                  <p className="mt-1 text-2xl font-bold text-foreground">{item.proj}</p>
                  <p className="mt-1 text-sm text-muted-foreground">2026 official: {item.prev}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Projected 2027 Bracket Tables ─────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Projected 2027 Brackets by <span className="gradient-text">Filing Status</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Seven brackets — 10% to 37% — for every filing status, thresholds rounded to the
              nearest $25 per IRS convention. All four tables are fully visible; no clicking required.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {STATUS_SECTIONS.map((sec) => {
              const brackets = BRACKETS_2027_PROJECTED[sec.key];
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
                              {taxOnLower > 0 ? usd(taxOnLower) : '—'}
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
              2026 Official vs <span className="gradient-text">2027 Projected</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Where each bracket starts and ends for single and joint filers, side by side.
            </p>
          </div>

          <div className="premium-card p-4 sm:p-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/20 hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-semibold">Rate</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Single 2026 (official)</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Single 2027 (projected)</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Joint 2026 (official)</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Joint 2027 (projected)</TableHead>
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

      {/* ─── Methodology ────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              How We <span className="gradient-text">Projected</span> These Numbers
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              No guesswork — the same recipe the IRS uses for its annual revenue procedure, applied
              to data that is already published.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="premium-card p-6">
              <ol className="space-y-4 list-decimal list-inside text-sm text-muted-foreground leading-relaxed">
                <li>
                  Take the <strong className="text-foreground">official 2026 thresholds</strong> from
                  IRS Rev. Proc. 2025-32 (the same numbers that power our{' '}
                  <Link href="/federal-tax-brackets" className="text-emerald-600 hover:text-emerald-500 underline">
                    2026 brackets page
                  </Link>
                  ).
                </li>
                <li>
                  Compute the 12-month average of the <strong className="text-foreground">chained
                  CPI-U</strong> (BLS series SUUR0000SA0) for Sep 2024–Aug 2025 and for
                  Sep 2025–Aug 2026.
                </li>
                <li>
                  Divide: the ratio is{' '}
                  <strong className="text-foreground">{PROJECTION_FACTOR.toFixed(6)}</strong> (a{' '}
                  {pctUp}% increase). {CCPI_WINDOW_NOTE}.
                </li>
                <li>
                  Multiply every 2026 threshold by that factor, then round: bracket thresholds to
                  the <strong className="text-foreground">nearest $25</strong>, standard deduction
                  to the <strong className="text-foreground">nearest $50</strong> — the IRS&apos;s
                  documented rounding rules.
                </li>
              </ol>
              <div className="mt-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/15">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-amber-700">Sensitivity check:</strong> the October 2025
                  index value was never published (shutdown-canceled CPI report). Interpolating it
                  gives factor {PROJECTION_FACTOR.toFixed(6)}; dropping the month from both windows
                  gives {SENSITIVITY_FACTOR.toFixed(6)} — a difference of roughly{' '}
                  $25–$50 on any single threshold.
                </p>
              </div>
            </div>

            <div className="premium-card p-6">
              <h3 className="text-base font-semibold text-foreground mb-1">
                C-CPI-U monthly values used (all items, U.S. city average)
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                BLS series SUUR0000SA0 · retrieved {PROJECTION_PUBLISHED} · unadjusted index
              </p>
              <div className="max-h-96 overflow-y-auto pr-2">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/20 hover:bg-transparent">
                      <TableHead className="text-muted-foreground font-semibold">Month</TableHead>
                      <TableHead className="text-right text-muted-foreground font-semibold">Index</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CCPI_MONTHLY.map((m) => (
                      <TableRow key={m.period} className={`border-border/10 ${m.note ? 'bg-amber-500/5' : ''}`}>
                        <TableCell className="text-muted-foreground">
                          {m.period}
                          {m.note ? <span className="ml-2 text-[10px] uppercase tracking-wide text-amber-700">{m.note}</span> : null}
                        </TableCell>
                        <TableCell className="text-right text-foreground tabular-nums">
                          {m.value?.toFixed(3) ?? '—'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
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
              Four moves that make sense between now and January, using the projected 2027 room.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: 'Defer income into 2027',
                body: `Every threshold moves up about ${pctUp}%. A single filer gets ${usd(single2027[1].min)} of income in the 10% bracket next year (vs ${usd(single2026[1].min)} in 2026) and the 22% bracket starts at ${usd(single2027[2].min)} (vs ${usd(single2026[2].min)}). If a bonus or a big invoice can slip from December into January, it lands in slightly wider brackets.`,
                icon: Clock,
              },
              {
                title: 'Check Roth conversion headroom',
                body: `Converting traditional IRA funds to a Roth fills your lowest brackets first. Filling a single filer's 10% and 12% brackets in 2027 means up to ${usd(single2027[2].min)} of taxable income before the 22% rate starts — about ${usd(single2027[2].min - single2026[2].min)} more room than 2026.`,
                icon: PiggyBank,
              },
              {
                title: 'Tune your withholding',
                body: `The standard deduction rising to ${usd(STANDARD_DEDUCTION_2027_PROJECTED.single)} (single) means slightly less tax per paycheck in 2027 for the same salary. Run your numbers through our paycheck calculator in January to keep withholding accurate — or check it now against your current W-4.`,
                icon: Calculator,
              },
              {
                title: 'Bunch deductions while they count',
                body: `Itemizers on the edge should compare: does the deduction land better in tax year 2026 or 2027? The brackets moved ~${pctUp}%, so a deduction delayed to January offsets income taxed in slightly higher-threshold brackets — worth checking if you're near a bracket boundary.`,
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
              Common questions about the projected 2027 federal income tax brackets
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
