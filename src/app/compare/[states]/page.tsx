import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRightLeft,
  ArrowRight,
  Calculator,
  TrendingDown,
  Scale,
  Home,
  DollarSign,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import {
  COMPARISON_SLUGS,
  getCompareConfig,
  type CompareStateData,
} from '@/lib/compare-config';
import { calculatePaycheck, formatCurrency } from '@/lib/finance-utils';

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams(): { states: string }[] {
  return COMPARISON_SLUGS.map((slug) => ({ states: slug }));
}

// ─── Per-Page Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ states: string }>;
}): Promise<Metadata> {
  const { states } = await params;
  const config = getCompareConfig(states);

  if (!config) {
    return { title: 'Comparison Not Found | TaxYield.io' };
  }

  const baseUrl = 'https://taxyield.io';
  const canonicalPath = `/compare/${states}`;

  return {
    title: config.metaTitle,
    description: config.metaDesc,
    keywords: config.keywords,
    authors: [{ name: 'TaxYield.io' }],
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        'en-US': `${baseUrl}${canonicalPath}`,
        'x-default': `${baseUrl}${canonicalPath}`,
      },
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      url: `${baseUrl}${canonicalPath}`,
      siteName: 'TaxYield.io',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.ogTitle,
      description: config.ogDescription,
    },
  };
}

// ─── Take-Home Calculation Helper ────────────────────────────────────────────

function getTakeHome(
  salary: number,
  stateKey: string
): { net: number; stateTax: number; federalTax: number; fica: number; effectiveRate: number } {
  const result = calculatePaycheck({
    annualSalary: salary,
    payFrequency: 'annual',
    hoursPerWeek: 40,
    retirement401k: 0,
    hsaContribution: 0,
    stateKey,
    filingStatus: 'single',
  });

  return {
    net: result.netAnnual,
    stateTax: result.stateTax,
    federalTax: result.federalTax,
    fica: result.ficaTotal,
    effectiveRate: result.effectiveTaxRate,
  };
}

// ─── JSON-LD Generator ──────────────────────────────────────────────────────

function buildJsonLd(
  slug: string,
  s1: CompareStateData,
  s2: CompareStateData,
  faqs: { question: string; answer: string }[]
) {
  const baseUrl = 'https://taxyield.io';
  const canonicalPath = `/compare/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'State Tax Comparisons', item: `${baseUrl}/compare` },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${s1.name} vs ${s2.name} Taxes`,
            item: `${baseUrl}${canonicalPath}`,
          },
        ],
      },
      {
        '@type': 'WebPage',
        name: `${s1.name} vs ${s2.name} Tax Comparison 2026`,
        description: `Side-by-side comparison of ${s1.name} and ${s2.name} taxes. Income tax, property tax, sales tax, and take-home pay analysis.`,
        url: `${baseUrl}${canonicalPath}`,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

// ─── Comparison Table Row ────────────────────────────────────────────────────

function ComparisonRow({
  label,
  icon: Icon,
  value1,
  value2,
  highlight,
}: {
  label: string;
  icon: React.ElementType;
  value1: string;
  value2: string;
  highlight?: 'left' | 'right' | 'none';
}) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 items-center py-3.5 border-b border-border/15 last:border-b-0">
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground/70" />
        <span>{label}</span>
      </div>
      <div
        className={`text-sm font-semibold text-center ${
          highlight === 'left'
            ? 'text-emerald-400'
            : highlight === 'right'
            ? ''
            : 'text-foreground'
        }`}
      >
        {value1}
      </div>
      <div
        className={`text-sm font-semibold text-center ${
          highlight === 'right'
            ? 'text-emerald-400'
            : highlight === 'left'
            ? ''
            : 'text-foreground'
        }`}
      >
        {value2}
      </div>
    </div>
  );
}

// ─── Server Component Page ───────────────────────────────────────────────────

export default async function CompareStatesPage({
  params,
}: {
  params: Promise<{ states: string }>;
}) {
  const { states } = await params;
  const config = getCompareConfig(states);

  if (!config) {
    notFound();
  }

  const { state1: s1, state2: s2, faqs } = config;

  // Use taxConfigKey for paycheck calculations (maps 'new-york' → 'newyork')
  const taxKey1 = s1.taxConfigKey;
  const taxKey2 = s2.taxConfigKey;

  // Calculate take-home pay for $75K and $150K
  const takeHome75k_1 = getTakeHome(75000, taxKey1);
  const takeHome75k_2 = getTakeHome(75000, taxKey2);
  const takeHome150k_1 = getTakeHome(150000, taxKey1);
  const takeHome150k_2 = getTakeHome(150000, taxKey2);

  // Determine which state is better at each salary
  const betterAt75k = takeHome75k_1.net >= takeHome75k_2.net ? s1.name : s2.name;
  const savingsAt75k = Math.abs(takeHome75k_1.net - takeHome75k_2.net);
  const betterAt150k = takeHome150k_1.net >= takeHome150k_2.net ? s1.name : s2.name;
  const savingsAt150k = Math.abs(takeHome150k_1.net - takeHome150k_2.net);

  // JSON-LD
  const jsonLd = buildJsonLd(states, s1, s2, faqs);

  // State key to tax config key mapping
  // The tax-config uses 'newyork' but compare-config uses 'new-york'
  // getTakeHome already uses key1/key2 from parseComparisonSlug which returns 'new-york'
  // But STATE_PROFILES uses 'newyork' as key - let me check...
  // Actually, parseComparisonSlug returns keys from COMPARE_STATES, which are 'new-york'
  // But calculatePaycheck uses STATE_PROFILES which has 'newyork' key
  // We need to convert 'new-york' to 'newyork' for the calculation
  // Wait - I already passed key1/key2 to getTakeHome which calls calculatePaycheck with stateKey
  // calculatePaycheck uses STATE_PROFILES[stateKey] which expects 'newyork' not 'new-york'
  // This means the calculations for new-york will fail! Let me handle this.

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
        <a href="/compare" className="hover:text-foreground transition-colors">Comparisons</a>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
        <span className="text-foreground font-medium">{s1.name} vs {s2.name}</span>
      </nav>

      {/* H1 + Intro */}
      <section className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-4">
          <ArrowRightLeft className="h-3.5 w-3.5" />
          2026 Tax Year
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {s1.name} vs {s2.name} <span className="gradient-text">Tax Comparison</span>
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground leading-relaxed">
          Look, if you're torn between {s1.name} and {s2.name}, you're probably wondering which one's going to take a bigger bite out of your paycheck. ({s1.incomeTaxLabel} vs {s2.incomeTaxLabel} — yeah, it matters.) We crunched the numbers at $75K and $150K so you don't have to. Spoiler: the difference might surprise you.
        </p>
      </section>

      {/* ─── Side-by-Side Comparison Table ────────────────────────────────── */}
      <section className="mb-12">
        <div className="premium-card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 items-center p-5 border-b border-border/20 bg-emerald-500/5">
            <div className="text-sm font-semibold text-muted-foreground">Tax Category</div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{s1.name}</p>
              <p className="text-xs text-muted-foreground">{s1.abbreviation}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{s2.name}</p>
              <p className="text-xs text-muted-foreground">{s2.abbreviation}</p>
            </div>
          </div>

          {/* Table Body */}
          <div className="px-5 py-2">
            <ComparisonRow
              label="State Income Tax"
              icon={DollarSign}
              value1={s1.incomeTaxLabel}
              value2={s2.incomeTaxLabel}
              highlight={
                s1.incomeTaxRate < s2.incomeTaxRate
                  ? 'left'
                  : s2.incomeTaxRate < s1.incomeTaxRate
                  ? 'right'
                  : 'none'
              }
            />
            <ComparisonRow
              label="Standard Deduction"
              icon={Calculator}
              value1={s1.standardDeduction > 0 ? `$${s1.standardDeduction.toLocaleString()}` : 'N/A'}
              value2={s2.standardDeduction > 0 ? `$${s2.standardDeduction.toLocaleString()}` : 'N/A'}
              highlight={
                s1.standardDeduction > s2.standardDeduction
                  ? 'left'
                  : s2.standardDeduction > s1.standardDeduction
                  ? 'right'
                  : 'none'
              }
            />
            <ComparisonRow
              label="Avg Property Tax"
              icon={Home}
              value1={`${(s1.propertyTaxRate * 100).toFixed(2)}%`}
              value2={`${(s2.propertyTaxRate * 100).toFixed(2)}%`}
              highlight={
                s1.propertyTaxRate < s2.propertyTaxRate
                  ? 'left'
                  : s2.propertyTaxRate < s1.propertyTaxRate
                  ? 'right'
                  : 'none'
              }
            />
            <ComparisonRow
              label="Avg Sales Tax"
              icon={ShoppingBag}
              value1={`${(s1.salesTaxRate * 100).toFixed(1)}%`}
              value2={`${(s2.salesTaxRate * 100).toFixed(1)}%`}
              highlight={
                s1.salesTaxRate < s2.salesTaxRate
                  ? 'left'
                  : s2.salesTaxRate < s1.salesTaxRate
                  ? 'right'
                  : 'none'
              }
            />
            <ComparisonRow
              label="Take-Home ($75K)"
              icon={TrendingDown}
              value1={formatCurrency(takeHome75k_1.net)}
              value2={formatCurrency(takeHome75k_2.net)}
              highlight={
                takeHome75k_1.net > takeHome75k_2.net
                  ? 'left'
                  : takeHome75k_2.net > takeHome75k_1.net
                  ? 'right'
                  : 'none'
              }
            />
            <ComparisonRow
              label="Take-Home ($150K)"
              icon={TrendingDown}
              value1={formatCurrency(takeHome150k_1.net)}
              value2={formatCurrency(takeHome150k_2.net)}
              highlight={
                takeHome150k_1.net > takeHome150k_2.net
                  ? 'left'
                  : takeHome150k_2.net > takeHome150k_1.net
                  ? 'right'
                  : 'none'
              }
            />
          </div>
        </div>

        {/* Green = lower tax / higher take-home */}
        <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Green highlight = lower tax burden or higher take-home pay
        </p>
      </section>

      {/* ─── Detailed Take-Home Breakdown ─────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Take-Home Pay <span className="gradient-text">Breakdown</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* $75K Breakdown */}
          <div className="premium-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-foreground">$75,000 Salary</h3>
            </div>
            <div className="space-y-3">
              <TakeHomeBreakdown
                stateName={s1.name}
                gross={75000}
                federalTax={takeHome75k_1.federalTax}
                fica={takeHome75k_1.fica}
                stateTax={takeHome75k_1.stateTax}
                net={takeHome75k_1.net}
                effectiveRate={takeHome75k_1.effectiveRate}
                isWinner={takeHome75k_1.net >= takeHome75k_2.net}
              />
              <div className="divider-glow" />
              <TakeHomeBreakdown
                stateName={s2.name}
                gross={75000}
                federalTax={takeHome75k_2.federalTax}
                fica={takeHome75k_2.fica}
                stateTax={takeHome75k_2.stateTax}
                net={takeHome75k_2.net}
                effectiveRate={takeHome75k_2.effectiveRate}
                isWinner={takeHome75k_2.net > takeHome75k_1.net}
              />
            </div>
            <div className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
              <p className="text-sm text-muted-foreground">
                {betterAt75k} keeps <span className="font-bold text-emerald-400">{formatCurrency(savingsAt75k)}</span> more per year
              </p>
            </div>
          </div>

          {/* $150K Breakdown */}
          <div className="premium-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-foreground">$150,000 Salary</h3>
            </div>
            <div className="space-y-3">
              <TakeHomeBreakdown
                stateName={s1.name}
                gross={150000}
                federalTax={takeHome150k_1.federalTax}
                fica={takeHome150k_1.fica}
                stateTax={takeHome150k_1.stateTax}
                net={takeHome150k_1.net}
                effectiveRate={takeHome150k_1.effectiveRate}
                isWinner={takeHome150k_1.net >= takeHome150k_2.net}
              />
              <div className="divider-glow" />
              <TakeHomeBreakdown
                stateName={s2.name}
                gross={150000}
                federalTax={takeHome150k_2.federalTax}
                fica={takeHome150k_2.fica}
                stateTax={takeHome150k_2.stateTax}
                net={takeHome150k_2.net}
                effectiveRate={takeHome150k_2.effectiveRate}
                isWinner={takeHome150k_2.net > takeHome150k_1.net}
              />
            </div>
            <div className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
              <p className="text-sm text-muted-foreground">
                {betterAt150k} keeps <span className="font-bold text-emerald-400">{formatCurrency(savingsAt150k)}</span> more per year
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Which State Is Better For You? ────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Which State Is <span className="gradient-text">Better for You</span>?
        </h2>
        <div className="premium-card p-6 space-y-4">
          {/* Income Tax Analysis */}
          <div className="flex items-start gap-3">
            {s1.incomeTaxRate <= s2.incomeTaxRate ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className="font-semibold text-foreground">Income Tax</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {s1.incomeTaxRate < s2.incomeTaxRate
                  ? `Here's where it gets real — ${s1.name} runs ${s1.incomeTaxLabel} on income tax while ${s2.name} is sitting at ${s2.incomeTaxLabel}. That's not nothing. At $75K, you'd pocket roughly ${formatCurrency(Math.abs(takeHome75k_1.stateTax - takeHome75k_2.stateTax))} more per year just by picking ${s1.name}. (That's a nice vacation. Or, you know, groceries for a few months.)`
                  : s1.incomeTaxRate > s2.incomeTaxRate
                  ? `Here's where it gets real — ${s2.name} runs ${s2.incomeTaxLabel} on income tax while ${s1.name} is sitting at ${s1.incomeTaxLabel}. At $75K, that's roughly ${formatCurrency(Math.abs(takeHome75k_1.stateTax - takeHome75k_2.stateTax))} more per year staying in ${s2.name}. That stings if you were leaning the other way.`
                  : `Honestly? Both states hit you with the same income tax rate. So at least that's one less thing to worry about.`}
              </p>
            </div>
          </div>

          <div className="divider-glow" />

          {/* Property Tax Analysis */}
          <div className="flex items-start gap-3">
            {s1.propertyTaxRate <= s2.propertyTaxRate ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className="font-semibold text-foreground">Property Tax</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {s1.propertyTaxRate < s2.propertyTaxRate
                  ? `${s1.name} property taxes sit at ${(s1.propertyTaxRate * 100).toFixed(2)}%, and ${s2.name}? ${(s2.propertyTaxRate * 100).toFixed(2)}%. On a typical $350K home, you're looking at about ${formatCurrency(350000 * s1.propertyTaxRate)} vs ${formatCurrency(350000 * s2.propertyTaxRate)} a year. That difference adds up fast — especially if you're planning to stay a while.`
                  : s1.propertyTaxRate > s2.propertyTaxRate
                  ? `Don't sleep on property taxes here. ${s2.name} comes in at ${(s2.propertyTaxRate * 100).toFixed(2)}% vs ${s1.name}'s ${(s1.propertyTaxRate * 100).toFixed(2)}%. On a $350K house? Roughly ${formatCurrency(350000 * s2.propertyTaxRate)} vs ${formatCurrency(350000 * s1.propertyTaxRate)} per year. Pretty wild how much that gap matters.`
                  : `Property tax rates are pretty similar between these two. Not much to separate them here.`}
              </p>
            </div>
          </div>

          <div className="divider-glow" />

          {/* Sales Tax Analysis */}
          <div className="flex items-start gap-3">
            {s1.salesTaxRate <= s2.salesTaxRate ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className="font-semibold text-foreground">Sales Tax</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {s1.salesTaxRate < s2.salesTaxRate
                  ? `Day-to-day spending adds up. ${s1.name} charges ${(s1.salesTaxRate * 100).toFixed(1)}% sales tax while ${s2.name} takes ${(s2.salesTaxRate * 100).toFixed(1)}%. If you're spending around $45K a year on taxable stuff, that's ${formatCurrency(45000 * s1.salesTaxRate)} vs ${formatCurrency(45000 * s2.salesTaxRate)}. Doesn't sound huge until you realize it's every single year.`
                  : s1.salesTaxRate > s2.salesTaxRate
                  ? `This one's easy — ${s2.name} at ${(s2.salesTaxRate * 100).toFixed(1)}% beats ${s1.name}'s ${(s1.salesTaxRate * 100).toFixed(1)}% on sales tax. Spend $45K a year on taxable purchases and you're looking at about ${formatCurrency(45000 * s2.salesTaxRate)} vs ${formatCurrency(45000 * s1.salesTaxRate)}. Small percentage, real dollars.`
                  : `Sales tax is a wash — both states are about the same. Moving on.`}
              </p>
            </div>
          </div>

          <div className="divider-glow" />

          {/* Extra Notes */}
          {(s1.extraNotes || s2.extraNotes) && (
            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground">Additional Considerations</h3>
                <ul className="mt-1 space-y-1.5 text-sm text-muted-foreground">
                  {s1.extraNotes && <li>&#8226; {s1.name}: {s1.extraNotes} — worth factoring in if you're on the fence.</li>}
                  {s2.extraNotes && <li>&#8226; {s2.name}: {s2.extraNotes} Don't overlook this stuff.</li>}
                </ul>
              </div>
            </div>
          )}

          <div className="divider-glow" />

          {/* Bottom Line */}
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
            <h3 className="font-semibold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Bottom Line
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              So here's the deal. On a <strong className="text-foreground">$75K</strong> salary, {betterAt75k} puts <strong className="text-foreground">{formatCurrency(savingsAt75k)}</strong> more in your pocket each year. Bump that to <strong className="text-foreground">$150K</strong> and {betterAt150k} pulls ahead by <strong className="text-foreground">{formatCurrency(savingsAt150k)}</strong>. But — and this is a big but — don't just chase the tax savings. Housing costs, insurance, and general cost of living can flip the script entirely. Run the full numbers before you pack your bags.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ───────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group premium-card overflow-hidden"
              open={i === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between p-5 text-base font-semibold text-foreground hover:text-emerald-400 transition-colors list-none">
                <span>{faq.question}</span>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ─── CTA: State Calculator Links ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Calculate Your <span className="gradient-text">Exact Take-Home Pay</span>
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Link
            href={s1.calculatorSlug}
            className="group premium-card hover-lift p-6 flex flex-col items-center gap-3 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
              <Calculator className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
              {s1.name} Tax Calculator
            </h3>
            <p className="text-sm text-muted-foreground">
              Get your personalized take-home pay with 401(k), HSA, and filing status options.
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all">
              Try {s1.name} Calculator
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href={s2.calculatorSlug}
            className="group premium-card hover-lift p-6 flex flex-col items-center gap-3 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/10">
              <Calculator className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
              {s2.name} Tax Calculator
            </h3>
            <p className="text-sm text-muted-foreground">
              Get your personalized take-home pay with 401(k), HSA, and filing status options.
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all">
              Try {s2.name} Calculator
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* ─── Relocation CTA ────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-border/30 bg-card/50 p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Thinking About Moving from {s1.name} to {s2.name}?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Before you call the movers, figure out what salary you'd actually need in {s2.name} to live the way you do now. Our Relocation Calculator does the math so you're not flying blind.
        </p>
        <Link
          href="/relocation-calculator"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
        >
          <ArrowRightLeft className="h-4 w-4" />
          Try Relocation Calculator
        </Link>
      </section>
    </div>
  );
}

// ─── Take-Home Breakdown Sub-Component ───────────────────────────────────────

function TakeHomeBreakdown({
  stateName,
  gross,
  federalTax,
  fica,
  stateTax,
  net,
  effectiveRate,
  isWinner,
}: {
  stateName: string;
  gross: number;
  federalTax: number;
  fica: number;
  stateTax: number;
  net: number;
  effectiveRate: number;
  isWinner: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-semibold text-foreground">{stateName}</h4>
        {isWinner && (
          <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 bg-emerald-500/20 text-emerald-400">
            More Take-Home
          </span>
        )}
      </div>
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gross Salary</span>
          <span className="font-medium text-foreground">{formatCurrency(gross)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Federal Tax</span>
          <span className="text-red-400">-{formatCurrency(federalTax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">FICA (SS + Medicare)</span>
          <span className="text-orange-400">-{formatCurrency(fica)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">State Tax</span>
          <span className={stateTax > 0 ? 'text-amber-400' : 'text-emerald-400'}>
            {stateTax > 0 ? `-${formatCurrency(stateTax)}` : '$0'}
          </span>
        </div>
        <div className="divider-glow" />
        <div className="flex justify-between text-base">
          <span className="font-semibold text-foreground">Net Take-Home</span>
          <span className={`font-bold ${isWinner ? 'text-emerald-400' : 'text-foreground'}`}>
            {formatCurrency(net)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Effective Tax Rate</span>
          <span className="font-medium text-foreground">{(effectiveRate * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
