import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import {
  runVerificationSuite,
  getSuiteSummary,
  LAST_VERIFIED,
  type VerificationResult,
} from '@/lib/accuracy/verification-suite';
import { CheckCircle2, XCircle, ShieldCheck, ExternalLink, BookOpen, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accuracy Report: 25/25 Engine Checks Passed — Public Verification',
  description:
    'TheTaxCalc publishes its own verification math: 25 hand-derived test cases from IRS Rev. Proc. 2025-32, SSA 2026 data, and state revenue codes, run against our live calculator engine. Anyone can audit the results.',
  alternates: { canonical: `${SITE_URL}/accuracy-report` },
  openGraph: {
    title: 'Accuracy Report — Publicly Verifiable Tax Engine Checks',
    description:
      '25 hand-derived test cases from IRS and state sources, run against our live engine. Audit our math.',
    url: `${SITE_URL}/accuracy-report`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'TheTaxCalc Accuracy Report' }],
  },
};

const CATEGORY_META: Record<string, { label: string; blurb: string }> = {
  federal: {
    label: 'Federal Income Tax',
    blurb: 'Progressive bracket math against IRS Rev. Proc. 2025-32, across all four filing statuses.',
  },
  fica: {
    label: 'FICA (Social Security & Medicare)',
    blurb: 'Employee-share payroll taxes, the 2026 wage base, and the 0.9% additional Medicare surtax.',
  },
  state: {
    label: 'State Income Tax',
    blurb: 'Progressive, flat, and zero-tax state engines against each state’s published schedule.',
  },
  integration: {
    label: 'Full Paycheck Integration',
    blurb: 'End-to-end take-home pay: federal + FICA + state stacked together, per pay period.',
  },
};

function formatUsd(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatValue(result: VerificationResult): string {
  return result.case.unit === 'rate'
    ? `${(result.actual * 100).toFixed(2)}%`
    : formatUsd(result.actual);
}

function CaseRow({ result }: { result: VerificationResult }) {
  const { case: c } = result;
  return (
    <details className="group border-b border-border/40 last:border-0">
      <summary className="flex cursor-pointer list-none items-start gap-3 py-3.5 transition-colors hover:bg-muted/20 sm:items-center">
        {result.passed ? (
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 sm:mt-0" aria-label="Passed" />
        ) : (
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 sm:mt-0" aria-label="Failed" />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{c.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{c.inputSummary}</p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="font-mono text-sm text-foreground">{formatValue(result)}</p>
          <p className="text-[11px] text-muted-foreground">
            {c.id} · <span className={result.passed ? 'text-emerald-700' : 'text-red-700 font-semibold'}>
              {result.passed ? 'PASS' : `FAIL (Δ ${formatUsd(result.delta)})`}
            </span>
          </p>
        </div>
      </summary>
      <div className="space-y-3 pb-4 pl-8 pr-2 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Source</p>
          <p className="mt-1 text-muted-foreground">{c.source}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hand derivation (paper math)</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">{c.derivation}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 rounded-lg border border-border/30 bg-card/60 p-3 font-mono text-xs">
          <span className="text-muted-foreground">expected: <span className="text-foreground">{c.unit === 'rate' ? `${(c.expected * 100).toFixed(2)}%` : formatUsd(c.expected)}</span></span>
          <span className="text-muted-foreground">engine: <span className="text-foreground">{formatValue(result)}</span></span>
          <span className="text-muted-foreground">tolerance: <span className="text-foreground">{c.unit === 'rate' ? '±0.05%' : '±$0.01'}</span></span>
        </div>
      </div>
    </details>
  );
}

export default function AccuracyReportPage() {
  // Deterministic, pure functions — runs the full suite on every render.
  const results = runVerificationSuite();
  const summary = getSuiteSummary(results);
  const allPassed = summary.failed === 0;
  const categories = ['federal', 'fica', 'state', 'integration'] as const;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Accuracy Report' },
        ],
      },
      {
        '@type': 'WebPage',
        name: 'TheTaxCalc Accuracy Report',
        description: `Publicly verifiable accuracy checks for TheTaxCalc's tax calculation engine. ${summary.passed} of ${summary.total} hand-derived test cases passed.`,
        url: `${SITE_URL}/accuracy-report`,
        inLanguage: 'en-US',
        dateModified: LAST_VERIFIED,
        isAccessibleForFree: true,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Dataset',
        name: 'TheTaxCalc Verification Suite — Tax Year 2026',
        description:
          '25 hand-derived test cases covering federal income tax (Rev. Proc. 2025-32), FICA (SSA 2026 wage base), and state income tax engines, with step-by-step derivations and primary-source citations.',
        url: `${SITE_URL}/accuracy-report`,
        creator: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
        temporalCoverage: '2026',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        variableMeasured: `${summary.passed}/${summary.total} checks passed`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-foreground">Accuracy Report</span>
      </nav>

      {/* ─── Header ─────────────────────────────────────────────────── */}
      <header>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Published verification · Tax year {summary.taxYear}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Accuracy Report
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Most tax sites ask you to trust their experts. We publish our math instead.
          Every case below was <strong className="text-foreground">hand-derived on paper</strong> from
          the cited IRS, SSA, and state publications — independent of our code — then run against the
          live calculator engine that powers every page on this site. Open any case, check our
          arithmetic, and audit the auditor.
        </p>
      </header>

      {/* ─── Verdict banner ─────────────────────────────────────────── */}
      <div
        role="status"
        aria-live="polite"
        className={`mt-8 rounded-2xl border p-6 sm:p-8 ${
          allPassed
            ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-card'
            : 'border-red-500/30 bg-gradient-to-br from-red-500/10 to-card'
        }`}
      >
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Latest run</p>
            <p className={`mt-1 text-4xl font-black tracking-tight sm:text-5xl ${allPassed ? 'text-emerald-700' : 'text-red-700'}`}>
              {summary.passed}/{summary.total}
              <span className="ml-2 text-lg font-semibold text-muted-foreground">checks passed</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {allPassed ? (
                <>Engine output matches every hand-derived value within ±$0.01 (±0.05% for rates). Last full re-derivation: <time dateTime={LAST_VERIFIED}>October 31, 2026</time>.</>
              ) : (
                <>{summary.failed} check{summary.failed > 1 ? 's' : ''} currently failing — the affected calculator{summary.failed > 1 ? 's are' : ' is'} wrong until fixed. Corrections are logged on our <Link href="/editorial-standards#correction-log" className="text-emerald-700 underline underline-offset-2">correction log</Link>.</>
              )}
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-3 text-center sm:grid-cols-1">
            <div className="rounded-xl border border-border/30 bg-card/70 px-4 py-2">
              <p className="text-lg font-bold text-foreground">{summary.taxYear}</p>
              <p className="text-[11px] text-muted-foreground">tax year</p>
            </div>
            <div className="rounded-xl border border-border/30 bg-card/70 px-4 py-2">
              <p className="text-lg font-bold text-foreground">100%</p>
              <p className="text-[11px] text-muted-foreground">open math</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Protocol ───────────────────────────────────────────────── */}
      <section aria-labelledby="protocol" className="mt-12">
        <h2 id="protocol" className="flex items-center gap-2 text-2xl font-bold text-foreground">
          <BookOpen className="h-5 w-5 text-emerald-700" aria-hidden="true" />
          How this works
        </h2>
        <ol className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600/15 text-xs font-bold text-emerald-700">1</span>
            <span><strong className="text-foreground">Derive on paper.</strong> Each expected value is computed by hand from the primary publication — IRS Rev. Proc. 2025-32 for federal brackets and standard deductions, the SSA 2026 fact sheet for the wage base, and each state&rsquo;s own rate schedule — without touching our engine.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600/15 text-xs font-bold text-emerald-700">2</span>
            <span><strong className="text-foreground">Run the engine.</strong> The production functions that power the site&rsquo;s calculators — <code className="rounded bg-muted/50 px-1 py-0.5 text-xs">calculateFederalTax</code>, <code className="rounded bg-muted/50 px-1 py-0.5 text-xs">calculateFICA</code>, <code className="rounded bg-muted/50 px-1 py-0.5 text-xs">calculateStateTax</code>, <code className="rounded bg-muted/50 px-1 py-0.5 text-xs">calculatePaycheck</code> — execute each case live on this page.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600/15 text-xs font-bold text-emerald-700">3</span>
            <span><strong className="text-foreground">Compare in the open.</strong> Both numbers are printed side by side with the full step-by-step derivation, so you can re-do the math yourself in under a minute per case.</span>
          </li>
        </ol>
        <div className="mt-5 rounded-xl border border-border/30 bg-card/50 p-4 text-sm leading-relaxed text-muted-foreground">
          <p className="flex items-start gap-2">
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <span>
              <strong className="text-foreground">What this is not.</strong> These checks verify our math
              against published rates — they are not tax advice, and they deliberately exclude
              situation-specific items (itemized deductions, credits, multi-state work, local taxes
              outside NYC). Our calculators produce planning estimates, not filed returns. See the{' '}
              <Link href="/methodology" className="text-emerald-700 underline underline-offset-2">full methodology</Link> for
              every assumption and edge case we make.
            </span>
          </p>
        </div>
      </section>

      {/* ─── Results by category ────────────────────────────────────── */}
      {categories.map((cat) => {
        const catResults = results.filter((r) => r.case.category === cat);
        const catPassed = catResults.filter((r) => r.passed).length;
        return (
          <section key={cat} aria-labelledby={`cat-${cat}`} className="mt-12">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={`cat-${cat}`} className="text-2xl font-bold text-foreground">
                {CATEGORY_META[cat].label}
              </h2>
              <p className={`text-sm font-semibold ${catPassed === catResults.length ? 'text-emerald-700' : 'text-red-700'}`}>
                {catPassed}/{catResults.length} passed
              </p>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">{CATEGORY_META[cat].blurb}</p>
            <div className="rounded-xl border border-border/40 bg-card/60 px-4 sm:px-5">
              {catResults.map((result) => (
                <CaseRow key={result.case.id} result={result} />
              ))}
            </div>
          </section>
        );
      })}

      {/* ─── Sources ────────────────────────────────────────────────── */}
      <section aria-labelledby="sources" className="mt-12">
        <h2 id="sources" className="text-2xl font-bold text-foreground">Primary sources</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Every derivation above traces to one of these documents. Click through and check us.
        </p>
        <ul className="mt-4 space-y-2.5 text-sm">
          {[
            { label: 'IRS Revenue Procedure 2025-32 — 2026 inflation adjustments (brackets & standard deductions)', href: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf' },
            { label: 'IRS Publication 15-T — Federal Income Tax Withholding Methods', href: 'https://www.irs.gov/publications/p15t' },
            { label: 'SSA 2026 Fact Sheet — Social Security wage base & COLA', href: 'https://www.ssa.gov/oact/cola/colafacts.html' },
            { label: 'California FTB — 2026 personal income tax rate schedules', href: 'https://www.ftb.ca.gov/forms/2026/2026-540-calculations.shtml' },
            { label: 'New York State DTF — 2026 income tax rate schedules', href: 'https://www.tax.ny.gov/pit/file/tax-tables-and-schedules.htm' },
            { label: 'Illinois Income Tax Act (35 ILCS 5) — flat rate & exemption', href: 'https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=620' },
            { label: 'Texas Constitution Art. 8 §24 — prohibition on income tax', href: 'https://statutes.capitol.texas.gov/Docs/CN/htm/CN.8.htm' },
          ].map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1.5 text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-800"
              >
                {s.label}
                <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Cross-links ────────────────────────────────────────────── */}
      <section aria-label="Related" className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/methodology"
          className="group rounded-xl border border-border/40 bg-card/60 p-5 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5"
        >
          <p className="font-semibold text-foreground group-hover:text-emerald-700">Full methodology →</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Every rate we use, every assumption we make, and the edge cases these checks don&rsquo;t cover.
          </p>
        </Link>
        <Link
          href="/editorial-standards"
          className="group rounded-xl border border-border/40 bg-card/60 p-5 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5"
        >
          <p className="font-semibold text-foreground group-hover:text-emerald-700">Editorial standards →</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Who maintains this site, our update and correction policies, and the public correction log.
          </p>
        </Link>
      </section>
    </div>
  );
}
