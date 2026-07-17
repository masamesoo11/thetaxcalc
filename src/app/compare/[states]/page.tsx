import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/site-config';
import {
  getCompareConfig,
  type CompareStateData,
} from '@/lib/compare-config';
import { calculatePaycheck, formatCurrency } from '@/lib/finance-utils';
import { COMPARISON_SLUGS, COMPARE_STATES, parseComparisonSlug } from '@/lib/compare-config';
import Link from 'next/link';
import { DynamicComparePage } from './dynamic-compare-page';
import { CompareSSRContent, CompareCTA } from './compare-ssr-content';
import { CompareChart } from './compare-chart';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ISR: Revalidate every 24 hours — enables Cloudflare CDN edge caching
export const revalidate = 86400;

export const dynamicParams = true; // Allow on-demand generation for other comparisons

export function generateStaticParams() {
  // Only pre-generate top 4 comparisons to reduce build time
  const topComparisons = COMPARISON_SLUGS.slice(0, 4);
  return topComparisons.map((slug) => ({ states: slug }));
}

// ─── Per-Page Metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ states: string }>;
}): Promise<Metadata> {
  const { states } = await params;
  const config = getCompareConfig(states);

  if (!config) {
    return { title: 'Comparison Not Found' };
  }

  const baseUrl = SITE_URL;
  const canonicalPath = `/compare/${states}`;

  return {
    title: { absolute: config.metaTitle },
    description: config.metaDesc,
    keywords: config.keywords,
    authors: [{ name: 'Rachel Mitchell, CPA' }],
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      url: `${baseUrl}${canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: `${config.ogTitle} — TheTaxCalc` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.ogTitle,
      description: config.ogDescription,
      images: [`${baseUrl}/opengraph-image.png`],
    },
  };
}

// ─── JSON-LD Generator ──────────────────────────────────────────────────────

function buildJsonLd(
  slug: string,
  s1: CompareStateData,
  s2: CompareStateData,
  faqs: { question: string; answer: string }[]
) {
  const baseUrl = SITE_URL;
  const canonicalPath = `/compare/${slug}`;
  const authorId = `${baseUrl}${canonicalPath}#author`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${baseUrl}${canonicalPath}#breadcrumb`,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'State Tax Comparisons', item: `${baseUrl}/compare` },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${s1.name} vs ${s2.name} Taxes`,
          },
        ],
      },
      {
        '@id': `${baseUrl}${canonicalPath}#webpage`,
        '@type': 'WebPage',
        name: `${s1.name} vs ${s2.name} Tax Comparison 2026`,
        description: `Side-by-side comparison of ${s1.name} and ${s2.name} taxes. Income tax, property tax, sales tax, and take-home pay analysis.`,
        url: `${baseUrl}${canonicalPath}`,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
        author: { '@id': authorId },
        reviewedBy: { '@id': authorId },
        publisher: { '@id': `${baseUrl}/#organization` },
        breadcrumb: { '@id': `${baseUrl}${canonicalPath}#breadcrumb` },
      },
      {
        '@id': authorId,
        ...authorToJsonLd(getCalculatorAuthor()),
      },
      {
        '@id': `${baseUrl}${canonicalPath}#faq`,
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

// ─── Server Component Page ────────────────────────────────────────────────────

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
  const jsonLd = buildJsonLd(states, s1, s2, faqs);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* H1 — Server-rendered for SEO (client component uses ssr:false) */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {s1.name} vs {s2.name} <span className="gradient-text">Tax Comparison</span>
        </h1>
      </div>

      {/* Interactive Client Component with Filing Status selector */}
      <DynamicComparePage states={states} />

      {/* ─── Server-Rendered SEO Chart (SVG line chart) ───────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CompareChart config={config} />
      </div>

      {/* ─── Server-Rendered SEO Content (~800 words) ─────────────────────── */}
      <CompareSSRContent config={config} />

      {/* ─── CTA (Convert comparison visitors to calculator users) ──────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <CompareCTA
          state1Slug={config.state1.slug}
          state1Name={config.state1.name}
          state2Slug={config.state2.slug}
          state2Name={config.state2.name}
        />
      </div>

      {/* ─── More State Comparisons (Internal Links) ────────────────────── */}
      <section className="py-12 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">More State Tax Comparisons</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMPARISON_SLUGS.filter(s => s !== states).slice(0, 9).map((otherSlug) => {
              const parsed = parseComparisonSlug(otherSlug);
              if (!parsed) return null;
              const [k1, k2] = parsed;
              return (
                <Link
                  key={otherSlug}
                  href={`/compare/${otherSlug}`}
                  className="group rounded-lg border border-border/30 bg-card/50 p-4 hover:border-emerald-500/30 transition-all"
                >
                  <p className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                    {COMPARE_STATES[k1].name} vs {COMPARE_STATES[k2].name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Compare take-home pay, tax rates & cost of living</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300">
              View All State Comparisons →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Author Attribution (E-E-A-T) ──────────────────────── */}
      <section className="py-12 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthorBioCard authorId="rachel-mitchell" />
        </div>
      </section>
    </>
  );
}
