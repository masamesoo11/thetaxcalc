import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Calculator, Search } from 'lucide-react';
import { GLOSSARY_TERMS, FAQ_TERMS, getGlossaryLetters } from '@/lib/glossary-data';
import { GlossaryClient } from './glossary-client';
import { Breadcrumb } from '@/components/finance/breadcrumb';

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Tax Glossary — 2026 Tax Terms Explained | TaxYield.io',
  description:
    'Comprehensive tax glossary with 25+ terms explained for 2026. Understand FICA, standard deduction, marginal tax rate, AGI, capital gains brackets, self-employment tax, and more. Free, accurate, and easy to understand.',
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
  authors: [{ name: 'TaxYield.io' }],
  alternates: {
    canonical: 'https://taxyield.io/glossary',
    languages: {
      'en-US': 'https://taxyield.io/glossary',
      'x-default': 'https://taxyield.io/glossary',
    },
  },
  openGraph: {
    title: 'Tax Glossary — 2026 Tax Terms Explained',
    description:
      '25+ tax terms explained for 2026: FICA, standard deduction, marginal tax rate, AGI, capital gains brackets, and more. Free, accurate tax definitions.',
    url: 'https://taxyield.io/glossary',
    siteName: 'TaxYield.io',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Glossary — 2026 Tax Terms Explained | TaxYield.io',
    description:
      '25+ tax terms explained for 2026: FICA, standard deduction, marginal tax rate, AGI, and more.',
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
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taxyield.io' },
          { '@type': 'ListItem', position: 2, name: 'Tax Glossary', item: 'https://taxyield.io/glossary' },
        ],
      },
      {
        '@type': 'WebPage',
        name: 'Tax Glossary — 2026 Tax Terms Explained',
        description:
          'Comprehensive tax glossary with 25+ terms explained for 2026. Understand FICA, standard deduction, marginal tax rate, and more.',
        url: 'https://taxyield.io/glossary',
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqEntries,
      },
      {
        '@type': 'Dataset',
        name: '2026 Tax Glossary Terms',
        description: 'Definitions and 2026 figures for common U.S. tax terms.',
        variableMeasured: GLOSSARY_TERMS.map((t) => ({
          name: t.term,
          description: t.definition,
          ...(t.figure2026 ? { value: t.figure2026 } : {}),
        })),
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
              <h3 className="text-sm font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                {calc.label}
              </h3>
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

      {/* ─── SEO Bottom Content ──────────────────────────────────────────── */}
      <section className="mt-16 border-t border-border/20 pt-10">
        <div className="glass-emerald p-6 sm:p-8 rounded-2xl">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Why Bother Learning This Stuff?
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Here&apos;s the thing — tax laws change every single year, and 2026 is no exception. New brackets.
              A Social Security wage cap of $176,100. Standard deductions at $15,000 (single), $30,000 (married),
              $22,500 (HOH). If you don&apos;t know what these numbers mean, you&apos;re basically guessing at your own
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
    </div>
  );
}
