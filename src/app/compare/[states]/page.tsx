import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/site-config';
import {
  getCompareConfig,
  type CompareStateData,
} from '@/lib/compare-config';
import { calculatePaycheck, formatCurrency } from '@/lib/finance-utils';
import { COMPARISON_SLUGS } from '@/lib/compare-config';
import { DynamicComparePage } from './dynamic-compare-page';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ISR: Revalidate every 24 hours — enables Cloudflare CDN edge caching
export const revalidate = 86400;

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISON_SLUGS.map((slug) => ({ states: slug }));
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

      {/* ─── Author Attribution (E-E-A-T) ──────────────────────── */}
      <section className="py-12 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthorBioCard authorId="rachel-mitchell" />
        </div>
      </section>
    </>
  );
}
