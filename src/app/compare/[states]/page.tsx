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
    title: config.metaTitle,
    description: config.metaDesc,
    keywords: config.keywords,
    authors: [{ name: 'Rachel Mitchell, CPA' }],
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
        author: authorToJsonLd(getCalculatorAuthor()),
        reviewedBy: authorToJsonLd(getCalculatorAuthor()),
      },
      authorToJsonLd(getCalculatorAuthor()),
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

      {/* Interactive Client Component with Filing Status selector */}
      <DynamicComparePage states={states} />
    </>
  );
}
