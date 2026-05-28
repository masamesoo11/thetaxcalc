import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SLUG_TO_CONFIG, getCalculatorSlugs } from '@/lib/calculator-routes';
import { DynamicCalculatorPage } from './dynamic-calculator-page';
import { SITE_URL } from '@/lib/site-config';
import { getCalculatorContent } from '@/lib/calculator-content-data';
import { getCalculatorJsonLd } from '@/lib/calculator-jsonld';

// ─── Static Generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getCalculatorSlugs().map((slug) => ({ calculator: slug }));
}

// ─── Per-Page Metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ calculator: string }>;
}): Promise<Metadata> {
  const { calculator } = await params;
  const config = SLUG_TO_CONFIG[calculator];

  if (!config) {
    return { title: 'Calculator Not Found | TheTaxCalc' };
  }

  const baseUrl = SITE_URL;

  return {
    title: config.metaTitle,
    description: config.metaDesc,
    keywords: config.keywords,
    authors: [{ name: 'TheTaxCalc' }],
    alternates: {
      canonical: `${baseUrl}${config.canonicalPath}`,
      languages: {
        'en-US': `${baseUrl}${config.canonicalPath}`,
        'x-default': `${baseUrl}${config.canonicalPath}`,
      },
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      url: `${baseUrl}${config.canonicalPath}`,
      siteName: 'TheTaxCalc',
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

// ─── Server Component Page ────────────────────────────────────────────────────

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ calculator: string }>;
}) {
  const { calculator } = await params;
  const config = SLUG_TO_CONFIG[calculator];

  if (!config) {
    notFound();
  }

  // Fetch content data server-side (no 'use client' needed)
  const content = getCalculatorContent(config.jsonLdType);
  const jsonLd = getCalculatorJsonLd(config.jsonLdType);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb — Semantic HTML for SEO */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-foreground font-medium">{config.breadcrumbLabel}</span>
      </nav>

      {/* H1 — Semantic for SEO */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {config.h1}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          {config.description}
        </p>
      </div>

      {/* Client-Side Calculator Form only (dynamically loaded, no SSR) */}
      <DynamicCalculatorPage componentKey={config.componentKey} />

      {/* ─── Server-Side Content for SEO ─────────────────────────────────── */}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {content.howItWorks.length > 0 && (
        <div className="mt-12 space-y-10">
          {/* How This Calculator Works */}
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How This <span className="gradient-text">Calculator</span> Works
            </h2>
            <div className="space-y-4">
              {content.howItWorks.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br/>') }}
                />
              ))}
            </div>
          </section>

          {/* Key Rates & Data */}
          {content.keyRates.length > 0 && (
            <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Key <span className="gradient-text">Rates</span> &amp; Data for 2026
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {content.keyRates.map((rate) => (
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

          {/* Frequently Asked Questions — using <details>/<summary> like the home page */}
          {content.faqs.length > 0 && (
            <section className="py-8 border-t border-border/20">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-foreground">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
              </div>
              <div className="space-y-4 max-w-3xl mx-auto">
                {content.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-base font-semibold text-foreground hover:text-emerald-400 transition-colors list-none">
                      <span>{faq.question}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
                    </summary>
                    <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Calculators */}
          {content.relatedCalculators.length > 0 && (
            <section className="py-8 border-t border-border/20">
              <div className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Related <span className="gradient-text">Calculators</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {content.relatedCalculators.map((calc) => (
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
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
