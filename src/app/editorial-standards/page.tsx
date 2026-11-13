import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { LAST_VERIFIED } from '@/lib/accuracy/verification-suite';
import {
  UserCheck,
  RefreshCw,
  PencilLine,
  HandCoins,
  AlertTriangle,
  ShieldCheck,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { ProtectedEmail } from '@/components/finance/protected-email';

export const metadata: Metadata = {
  title: 'Editorial Standards: Authorship, Updates & Corrections',
  description:
    'TheTaxCalc editorial standards: how we author and verify tax content without rented credentials, our 48-hour update policy, public correction log, and independence from lead-generation revenue.',
  alternates: { canonical: `${SITE_URL}/editorial-standards` },
  openGraph: {
    title: 'Editorial Standards — Authorship, Updates & Corrections',
    description:
      'How TheTaxCalc authors, verifies, updates, and corrects its tax content — in public.',
    url: `${SITE_URL}/editorial-standards`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'TheTaxCalc Editorial Standards' }],
  },
};

interface LogEntry {
  date: string;
  type: 'correction' | 'update' | 'process';
  title: string;
  detail: string;
  pages?: string;
}

// Public correction & update log. Entries are added for every material
// change to rates, formulas, or content policy — including our own mistakes.
const CORRECTION_LOG: LogEntry[] = [
  {
    date: '2026-10-31',
    type: 'process',
    title: 'Published the public Accuracy Report',
    detail:
      'We now publish 25 hand-derived verification cases (federal, FICA, state, and full-paycheck integration) run live against our calculation engine, with step-by-step derivations anyone can re-check. During the initial derivation we caught and corrected a $6.00 arithmetic slip in our own paper math for the top-bracket case — the engine was right; the human was wrong. That is exactly why both are now published side by side.',
    pages: '/accuracy-report',
  },
  {
    date: '2026-10-27',
    type: 'update',
    title: 'Published projected 2027 federal brackets ahead of the IRS',
    detail:
      'The IRS had not yet released the official 2027 inflation adjustments (Rev. Proc. expected early-to-mid November 2026). We published projections computed from C-CPI-U data following the IRS indexing methodology, clearly labeled as projections, with a documented plan to replace them with official values the day they drop. One month of CPI data (October 2025) was unpublished due to the government shutdown; we interpolated it and documented the sensitivity (~$25 on the 37% threshold).',
    pages: '/tax-brackets-2027',
  },
  {
    date: '2026-10-24',
    type: 'process',
    title: 'Removed placeholder author personas',
    detail:
      'Early pages carried invented author personas with professional-sounding credentials. We removed them. Fabricated experts are a real problem in this industry — quality raters call them "rented credentials" — and a single accountable editorial team backed by published, checkable math is worth more than a fake CPA. All content is now attributed to TheTaxCalc Editorial Team, with data verification you can audit yourself rather than credentials you cannot.',
    pages: 'sitewide',
  },
  {
    date: '2026-10',
    type: 'update',
    title: 'Social Security wage base updated for 2026',
    detail:
      'The SSA 2026 fact sheet set the OASDI wage base at $184,500 (up from $176,100 in 2025). Our FICA engine, paycheck calculators, and 27 salary pages were updated within 48 hours of the announcement.',
    pages: 'all paycheck calculators',
  },
  {
    date: '2026-07',
    type: 'update',
    title: 'OBBBA standard-deduction changes incorporated',
    detail:
      'The One Big Beautiful Bill Act changed the 2026 standard deduction landscape. We updated every deduction figure to the values published in IRS Rev. Proc. 2025-32 ($16,100 single / $32,200 MFJ / $24,150 HoH) and re-verified affected calculators against the accuracy suite.',
    pages: 'all calculators',
  },
];

const LOG_BADGE: Record<LogEntry['type'], { label: string; className: string }> = {
  correction: { label: 'Correction', className: 'bg-red-500/10 text-red-700 ring-red-500/25' },
  update: { label: 'Rate update', className: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/25' },
  process: { label: 'Process change', className: 'bg-stone-500/10 text-stone-700 ring-stone-500/25' },
};

const STANDARDS = [
  {
    icon: UserCheck,
    title: '1 · Authorship: one accountable team, zero rented credentials',
    body: (
      <>
        <p>
          Every calculator, guide, and data table on TheTaxCalc is researched and maintained by a single
          named entity — the TheTaxCalc Editorial Team — not by a rotating cast of expert-sounding
          personas. You will not find a &ldquo;Chief Tax Advisor&rdquo; headshot here who cannot produce a PTIN.
        </p>
        <p className="mt-3">
          This is a deliberate choice. In the tax-content industry, invented or rented experts are common —
          and they are the single fastest way for a YMYL site to lose the trust it needs to survive. Instead
          of asking you to trust a résumé, we ask you to trust arithmetic you can check: our{' '}
          <Link href="/accuracy-report" className="font-medium text-emerald-700 underline underline-offset-2">
            Accuracy Report
          </Link>{' '}
          publishes the engine&rsquo;s output against values hand-derived from IRS and state publications, and
          our{' '}
          <Link href="/methodology" className="font-medium text-emerald-700 underline underline-offset-2">
            methodology page
          </Link>{' '}
          documents every rate and assumption with its primary source.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: '2 · Updates: 48 hours from official publication',
    body: (
      <>
        <p>
          When the IRS, SSA, or a state revenue department changes a number that affects our calculators,
          the site is updated within <strong>48 hours</strong> — and every change is logged below. The
          annual rhythm: federal inflation adjustments (Rev. Proc., typically Q4), SSA&rsquo;s October wage-base
          announcement, and each state&rsquo;s budget-season rate changes.
        </p>
        <p className="mt-3">
          Rate data that goes into our engine is stamped with the tax year it applies to, and calculator
          pages state their tax year explicitly, so you always know which rules produced your number.
        </p>
      </>
    ),
  },
  {
    icon: PencilLine,
    title: '3 · Corrections: public, fast, and logged',
    body: (
      <>
        <p>
          If you find an error — a wrong rate, a broken table, a typo that changes a meaning — report it to{' '}
          <ProtectedEmail code="contact|thetaxcalc.com" /> and we will investigate within two business days. Confirmed material errors are
          fixed and then logged in the public correction log below, describing what was wrong and what
          changed. We do not silently edit numbers.
        </p>
        <p className="mt-3">
          &ldquo;Material&rdquo; means anything that could change a calculation, a legal claim about a rate, or a
          factual statement about a tax rule. Cosmetic fixes (typos, layout) are made without a log entry.
        </p>
      </>
    ),
  },
  {
    icon: HandCoins,
    title: '4 · Independence: no lead-gen, no affiliate kickbacks, no data selling',
    body: (
      <>
        <p>
          Most &ldquo;free&rdquo; tax calculators are lead-generation funnels: your inputs become a sales lead for
          financial products, and the &ldquo;results&rdquo; page is an ad. We are structurally different:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Every calculation runs in your browser. Your salary never touches our servers.',
            'No accounts, no email walls, no “unlock your full results” upsells.',
            'No affiliate links inside or beside calculation results.',
            'We do not sell, share, or broker user data — there is no user data to sell.',
          ].map((item) => (
            <li key={item} className="flex gap-2 text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          The site is funded by unobtrusive advertising against informational (non-calculator) pages. It
          costs us very little to run precisely because we store nothing.
        </p>
      </>
    ),
  },
  {
    icon: AlertTriangle,
    title: '5 · Limitations: what we are honest about',
    body: (
      <>
        <p>
          Our tools produce planning estimates, not tax advice, and not a filed return. We deliberately
          exclude situation-specific complexity: itemized deductions, most credits, multi-state work
          arrangements, and local taxes outside New York City. Where a simplification could materially
          change your number, the calculator page says so.
        </p>
        <p className="mt-3">
          For filing your actual return, use real tax software or a licensed CPA/EA who knows your
          situation. We would rather send you away than pretend a browser tool replaces a professional.
        </p>
      </>
    ),
  },
];

export default function EditorialStandardsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Editorial Standards' },
        ],
      },
      {
        '@type': 'WebPage',
        name: 'TheTaxCalc Editorial Standards',
        description:
          'Authorship model, update policy, correction policy, and independence statement for TheTaxCalc.',
        url: `${SITE_URL}/editorial-standards`,
        inLanguage: 'en-US',
        dateModified: LAST_VERIFIED,
        isAccessibleForFree: true,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-foreground">Editorial Standards</span>
      </nav>

      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Editorial Standards
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Tax content is &ldquo;Your Money, Your Life&rdquo; content — mistakes cost readers real dollars. This
          page documents exactly how content on TheTaxCalc is authored, verified, updated, and corrected,
          including the mistakes we have already made and fixed. It is written to be audited, not skimmed.
        </p>
      </header>

      {/* ─── The five standards ─────────────────────────────────────── */}
      <div className="mt-10 space-y-10">
        {STANDARDS.map((s) => (
          <section key={s.title} aria-label={s.title.replace(/^\d+ · /, '')}>
            <h2 className="flex items-start gap-3 text-xl font-bold text-foreground sm:text-2xl">
              <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10">
                <s.icon className="h-4.5 w-4.5 text-emerald-700" aria-hidden="true" />
              </span>
              {s.title.replace(/^\d+ · /, '')}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:pl-12">
              {s.body}
            </div>
          </section>
        ))}
      </div>

      {/* ─── Public correction log ──────────────────────────────────── */}
      <section aria-labelledby="correction-log" className="mt-14">
        <h2 id="correction-log" className="text-2xl font-bold text-foreground">
          Correction &amp; update log
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every material change to rates, formulas, or editorial process — newest first. Process changes
          are listed too, including decisions we made about our own earlier mistakes.
        </p>
        <ol className="mt-6 space-y-4">
          {CORRECTION_LOG.map((entry) => {
            const badge = LOG_BADGE[entry.type];
            return (
              <li key={`${entry.date}-${entry.title}`} className="rounded-xl border border-border/40 bg-card/60 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <time dateTime={entry.date} className="font-mono text-xs font-semibold text-muted-foreground">
                    {entry.date}
                  </time>
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${badge.className}`}>
                    {badge.label}
                  </span>
                  {entry.pages ? (
                    <span className="text-xs text-muted-foreground">affected: {entry.pages}</span>
                  ) : null}
                </div>
                <h3 className="mt-2 font-semibold text-foreground">{entry.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{entry.detail}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ─── How to reach us ────────────────────────────────────────── */}
      <section
        aria-label="Report an error"
        className="mt-12 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-card p-6 sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Found an error? Be our auditor.</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Email <ProtectedEmail code="contact|thetaxcalc.com" /> — we investigate every report within two business days.
            </p>
          </div>
          <Link
            href="/accuracy-report"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-800 hover:shadow-emerald-500/30"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            View accuracy report
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
