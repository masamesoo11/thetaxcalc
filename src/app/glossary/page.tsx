import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Calculator, Search } from 'lucide-react';
import { GLOSSARY_TERMS, FAQ_TERMS, getGlossaryLetters } from '@/lib/glossary-data';
import { GlossaryClient } from './glossary-client';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { SITE_URL } from '@/lib/site-config';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Tax Glossary — 2026 Tax Terms Explained',
  description:
    'Tax glossary with 25+ terms explained for 2026. FICA, standard deduction, marginal rate, AGI, capital gains brackets, and more. Free, accurate definitions.',
  keywords: [
    'what is FICA', 'what is standard deduction', 'what is marginal tax rate',
    'tax glossary', 'tax terms explained', 'what is AGI', 'adjusted gross income',
    'tax bracket definition', 'effective tax rate', 'self-employment tax',
    'capital gains tax brackets', 'tax credit vs tax deduction', 'what is FICA tax',
    'additional medicare tax', 'HSA vs FSA', 'progressive tax',
    'withholding tax definition', 'taxable income definition',
    'estate tax exemption 2026', 'state income tax rates',
    'payroll tax explained', '2026 tax terms',
  ],
  authors: [{ name: 'Rachel Mitchell, CPA' }],
  alternates: {
    canonical: `${SITE_URL}/glossary`,
    /glossary`,    },
  },
  openGraph: {
    title: 'Tax Glossary — 2026 Tax Terms Explained',
    description:
      'Tax glossary with 25+ terms explained for 2026. FICA, standard deduction, marginal rate, AGI, capital gains brackets, and more. Free, accurate definitions.',
    url: `${SITE_URL}/glossary`,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: 'Tax Glossary 2026 — TheTaxCalc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Glossary — 2026 Tax Terms Explained',
    description:
      '25+ tax terms explained for 2026: FICA, standard deduction, marginal rate, AGI, and more.',
  },
};

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

function getGlossaryJsonLd() {
  const faqEntries = FAQ_TERMS.map((faq) => {
    const term = GLOSSARY_TERMS.find((t) => t.term === faq.term);
    return {
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: term
          ? `${term.definition}${term.figure2026 ? ` 2026: ${term.figure2026}` : ''}${term.example ? ` Example: ${term.example}` : ''}`
          : '',
      },
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${SITE_URL}/glossary#breadcrumb`,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Tax Glossary' },
        ],
      },
      {
        '@id': `${SITE_URL}/glossary#author`,
        ...authorToJsonLd(getCalculatorAuthor()),
      },
      {
        '@id': `${SITE_URL}/glossary#webpage`,
        '@type': 'WebPage',
        name: 'Tax Glossary — 2026 Tax Terms Explained',
        description:
          'Comprehensive tax glossary with 25+ terms explained for 2026. Understand FICA, standard deduction, marginal tax rate, and more.',
        url: `${SITE_URL}/glossary`,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
        author: { '@id': `${SITE_URL}/glossary#author` },
        reviewedBy: { '@id': `${SITE_URL}/glossary#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@id': `${SITE_URL}/glossary#faq`,
        '@type': 'FAQPage',
        mainEntity: faqEntries,
      },

    ],
  };
}

// ─── Related Calculator Links ─────────────────────────────────────────────────

const RELATED_CALCULATORS = [
  { href: '/paycheck-calculator', label: 'Paycheck Calculator', desc: 'Compute take-home pay after all taxes' },
  { href: '/capital-gains-calculator', label: 'Capital Gains Calculator', desc: 'Short & long-term rates + NIIT' },
  { href: '/self-employment-tax-calculator', label: 'Self-Employment Calculator', desc: '15.3% SE tax + deductions' },
  { href: '/mortgage-calculator', label: 'Mortgage Calculator', desc: 'Monthly payment & amortization' },
  { href: '/401k-retirement-calculator', label: '401(k) Calculator', desc: 'Retirement projection with match' },
  { href: '/relocation-calculator', label: 'Relocation Calculator', desc: 'Compare equivalent salary by state' },
  { href: '/illinois-tax-calculator', label: 'Illinois Calculator', desc: '4.95% flat tax take-home pay' },
  { href: '/texas-tax-calculator', label: 'Texas Calculator', desc: '0% income tax take-home pay' },
  { href: '/florida-tax-calculator', label: 'Florida Calculator', desc: '0% income tax + homestead' },
  { href: '/california-tax-calculator', label: 'California Calculator', desc: '1%–13.3% progressive brackets' },
  { href: '/new-york-tax-calculator', label: 'New York Calculator', desc: '4%–10.9% + NYC tax' },
];

// ─── Server Component Page ────────────────────────────────────────────────────

export default function GlossaryPage() {
  const jsonLd = getGlossaryJsonLd();
  const letters = getGlossaryLetters();
  const termCount = GLOSSARY_TERMS.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data — Server Rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Breadcrumb Navigation ────────────────────────────────────────── */}
      <Breadcrumb items={[{ label: 'Tax Glossary' }]} />

      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-4">
          <BookOpen className="h-3.5 w-3.5" />
          {termCount} Tax Terms Defined
        </div>

        {/* H1 — Semantic for SEO */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Tax Glossary — <span className="gradient-text">2026 Tax Terms</span> Explained
        </h1>

        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Tax jargon got you lost? Same. We broke down the terms that actually matter —{' '}
          <strong className="text-foreground">FICA</strong>,{' '}
          <strong className="text-foreground">standard deduction</strong>,{' '}
          <strong className="text-foreground">marginal rate</strong>, and more — in plain English,
          with real 2026 numbers. No accounting degree required.
        </p>

        {/* Quick Stats */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-400">
            <Calculator className="h-3.5 w-3.5" />
            {letters.length} Letters
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-400">
            <Search className="h-3.5 w-3.5" />
            Search & Filter
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-muted/30 px-3 py-1.5 text-muted-foreground">
            Updated Jan 2026
          </span>
        </div>
      </section>

      {/* ─── Client Component: Search, A-Z Nav, Term Cards ──────────────── */}
      <GlossaryClient />

      {/* ─── Related Calculators CTA ──────────────────────────────────────── */}
      <section className="mt-16 border-t border-border/20 pt-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Try Our <span className="gradient-text">Tax Calculators</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            Put these terms into practice with our free 2026 calculators — accurate, private, and no sign-up required.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED_CALCULATORS.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group premium-card hover-lift p-5 flex flex-col gap-2"
            >
              <p className="text-sm font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                {calc.label}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {calc.desc}
              </p>
              <div className="mt-auto flex items-center gap-1 text-xs font-medium text-emerald-400 group-hover:gap-2 transition-all">
                Try it
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Salary & Resources Quick Links ────────────────────────────────── */}
      <section className="mt-12 border-t border-border/20 pt-10">
        <p className="text-lg font-bold text-foreground mb-6">
          Quick Links — <span className="text-emerald-400">Salary, Comparisons & Guides</span>
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Popular Salary Pages */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Popular Salary Calculations</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { href: '/salary/50000', label: '$50K' },
                { href: '/salary/75000', label: '$75K' },
                { href: '/salary/100000', label: '$100K' },
                { href: '/salary/150000', label: '$150K' },
                { href: '/salary/200000', label: '$200K' },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="inline-flex items-center rounded-lg border border-border/50 bg-muted/20 px-3 py-1.5 text-xs font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
                >
                  {s.label} After Tax
                </Link>
              ))}
            </div>
            <Link href="/salary" className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
              View all 26 salary levels <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* State Comparisons */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Compare State Taxes</h3>
            <div className="space-y-2">
              {[
                { href: '/compare', label: 'All State Comparisons' },
                { href: '/federal-tax-brackets', label: '2026 Federal Tax Brackets' },
                { href: '/relocation-calculator', label: 'Relocation Calculator' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Blog & Guides */}
          <div className="rounded-xl border border-border/30 bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground mb-3">Tax Guides & Blog</h3>
            <div className="space-y-2">
              {[
                { href: '/blog', label: 'All Blog Articles' },
                { href: '/blog/2026-federal-tax-brackets-explained', label: '2026 Tax Brackets Explained' },
                { href: '/blog/florida-vs-texas-tax-comparison', label: 'Florida vs Texas Comparison' },
                { href: '/blog/illinois-income-tax-guide-2026', label: 'Illinois Tax Guide 2026' },
                { href: '/blog/how-fica-taxes-work-2026', label: 'How FICA Taxes Work' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEO Bottom Content ──────────────────────────────────────────── */}
      <section className="mt-16 border-t border-border/20 pt-10">
        <div className="glass-emerald p-6 sm:p-8 rounded-2xl">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Why Bother Learning This Stuff?
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Here&apos;s the thing — tax laws change every single year, and 2026 is no exception. New brackets.
              A Social Security wage cap of $184,500. Standard deductions at $16,100 (single), $32,200 (married),
              $24,150 (HOH). If you don&apos;t know what these numbers mean, you&apos;re basically guessing at your own
              finances. And guessing with the IRS? Not a great strategy.
            </p>
            <p>
              Whether you&apos;re a W-2 employee staring at your pay stub trying to figure out where all the money went,
              a freelancer drowning in quarterly estimates, or an investor trying not to get killed on capital gains —
              these terms matter. We defined them in plain language with real 2026 figures, and we linked each one
              to a calculator so you can actually use what you learn. Knowledge is power. Especially when the IRS
              is involved.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Author Attribution (E-E-A-T) ──────────────────────── */}
      <section className="py-12 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthorBioCard authorId="rachel-mitchell" />
        </div>
      </section>
    </div>
  );
}
