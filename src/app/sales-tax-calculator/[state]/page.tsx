import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  STATE_SALES_TAX,
  ALL_STATE_KEYS,
  getStateSEOMeta,
  getStateContent,
  getStateJsonLd,
} from '@/lib/state-sales-tax-data';
import { SITE_URL } from '@/lib/site-config';
import { StateSalesTaxClientPage } from './state-sales-tax-client';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ─── Static Params ───────────────────────────────────────────────────────────

// CRITICAL: force-static ensures pages are pre-built as static HTML at build time
// and served directly from Cloudflare CDN. Without this, @cloudflare/next-on-pages
// routes ISR pages through the Worker, which times out under crawl load
// (Connection Timeout, Status Code 0). CDN caching is handled by _headers.
export const dynamic = 'force-static';

// Only serve pre-generated state pages (50 states) — return 404 for unknown slugs
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_STATE_KEYS.map((state) => ({ state }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: stateKey } = await params;
  const stateData = STATE_SALES_TAX[stateKey];

  if (!stateData) {
    return { title: 'State Not Found' };
  }

  const seo = getStateSEOMeta(stateKey);
  const baseUrl = SITE_URL;

  return {
    title: { absolute: seo.metaTitle },
    description: seo.metaDesc,
    keywords: seo.keywords,
    authors: [{ name: `${getCalculatorAuthor().name}, ${getCalculatorAuthor().credentials}` }],
    alternates: {
      canonical: `${baseUrl}${seo.canonicalPath}`,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: `${baseUrl}${seo.canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: seo.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [`${baseUrl}/opengraph-image.png`],
    },
  };
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function StateSalesTaxPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateKey } = await params;
  const stateData = STATE_SALES_TAX[stateKey];

  if (!stateData) {
    notFound();
  }

  const seo = getStateSEOMeta(stateKey);
  const content = getStateContent(stateKey);
  const jsonLd = getStateJsonLd(stateKey, SITE_URL);
  const author = getCalculatorAuthor();

  // Inject author Person schema into JSON-LD graph
  if (jsonLd && jsonLd['@graph'] && Array.isArray(jsonLd['@graph'])) {
    jsonLd['@graph'].push({ '@id': `${SITE_URL}/sales-tax-calculator/${stateKey}#author`, ...authorToJsonLd(author) });
  }

  return (
    <main className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li className="text-muted-foreground" aria-hidden="true">/</li>
            <li>
              <Link href="/sales-tax-calculator" className="hover:text-foreground transition-colors">
                Sales Tax Calculator
              </Link>
            </li>
            <li className="text-muted-foreground" aria-hidden="true">/</li>
            <li className="text-foreground font-medium">{stateData.name}</li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {seo.h1}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
          {seo.metaDesc}
        </p>

        {/* Client Calculator Component */}
        <div className="mt-8">
          <StateSalesTaxClientPage defaultState={stateKey} />
        </div>

        {/* Server-Rendered Content for SEO */}
        {content.howItWorks.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              How {stateData.name} Sales Tax Works
            </h2>
            <div className="space-y-4 max-w-4xl">
              {content.howItWorks.map((paragraph, i) => (
                <div
                  key={i}
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Key Rates */}
        {content.keyRates.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {stateData.name} Sales Tax Key Rates (2026)
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
              {content.keyRates.map((rate) => (
                <div
                  key={rate.label}
                  className="rounded-lg border border-border/50 bg-card/80 p-4"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {rate.label}
                  </p>
                  <p className="mt-1 text-lg font-bold text-emerald-400">{rate.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {content.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {stateData.name} Sales Tax FAQ
            </h2>
            <div className="space-y-4 max-w-4xl">
              {content.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border/50 bg-card/80 p-5"
                >
                  <h3 className="text-base font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related States */}
        {content.relatedStates.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Nearby State Sales Tax Calculators
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sales-tax-calculator"
                className="inline-flex items-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                All 50 States
              </Link>
              {content.relatedStates.map((related) => (
                <Link
                  key={related.slug}
                  href={`/sales-tax-calculator/${related.slug}`}
                  className="inline-flex items-center rounded-lg border border-border/50 bg-card/80 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  {related.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All States Index */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Sales Tax by State
          </h2>
          <div className="flex flex-wrap gap-2 max-w-5xl">
            {ALL_STATE_KEYS.map((key) => {
              const s = STATE_SALES_TAX[key];
              const isActive = key === stateKey;
              return (
                <Link
                  key={key}
                  href={`/sales-tax-calculator/${key}`}
                  className={`inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-muted/30 text-muted-foreground border border-border/30 hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  {s.abbreviation} {s.noStateTax ? '0%' : `${(s.combinedRate * 100).toFixed(1)}%`}
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─── Author Attribution (E-E-A-T) ──────────────────────── */}
        <section className="py-12 border-t border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AuthorBioCard authorId="rachel-mitchell" />
          </div>
        </section>
      </div>
    </main>
  );
}
