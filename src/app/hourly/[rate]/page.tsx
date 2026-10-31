import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/site-config';
import {
  formatRate,
  getRateTier,
  isLegacyRateSlug,
  isValidHourlyRate,
  rateToSlug,
  slugToRate,
} from '@/lib/hourly-calculations';
import { DynamicHourlyPage } from './dynamic-hourly-page';
import { RateHero, RateSSRContent, generateRateFaqs, getRateSeoText } from './hourly-ssr-content';
import { HourlyChart } from './hourly-chart';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ISR: Revalidate every 24 hours — enables Cloudflare CDN edge caching
export const revalidate = 86400;

export const dynamicParams = true; // Allow on-demand generation for other valid rates (5–500)

export function generateStaticParams() {
  // Only pre-generate the top 8 rates to reduce build time
  const topRates = [15, 17, 18, 20, 21, 25, 30, 40];
  return topRates.map((rate) => ({ rate: rateToSlug(rate) }));
}

// ─── Per-Page Metadata (tier-differentiated titles & descriptions) ───────────

const TIER_TITLE_SUFFIX: Record<ReturnType<typeof getRateTier>, string> = {
  entry: 'Is It a Livable Wage?',
  core: 'Full-Time & Part-Time Pay',
  standard: 'Salary Equivalent & Net Pay',
  professional: 'After-Tax Pay by State',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ rate: string }>;
}): Promise<Metadata> {
  const { rate: rateStr } = await params;
  const rate = slugToRate(rateStr);
  if (!rate || !isValidHourlyRate(rate)) return { title: 'Rate Not Found' };

  const rateLabel = formatRate(rate);
  const baseUrl = SITE_URL;
  // Always use the SEO-friendly canonical URL
  const canonicalSlug = rateToSlug(rate);
  const canonicalPath = `/hourly/${canonicalSlug}`;

  // Tier-specific description & keywords — titles/descriptions vary
  // meaningfully between the four rate tiers (entry/core/standard/professional).
  const seo = getRateSeoText(rate);
  const titleSuffix = TIER_TITLE_SUFFIX[getRateTier(rate)];

  const title = `${rateLabel} an Hour Is How Much a Year in 2026? — ${titleSuffix}`;

  return {
    title: { absolute: title },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'TheTaxCalc Editorial Team' }],
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
    },
    openGraph: {
      title,
      description: seo.description,
      url: `${baseUrl}${canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: `${rateLabel} an Hour — How Much a Year in 2026?` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: seo.description,
      images: [`${baseUrl}/opengraph-image.png`],
    },
  };
}

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

function generateJsonLd(rate: number, description: string, webAppDescription: string) {
  const rateLabel = formatRate(rate);
  // Tier-varied FAQ set — matches the visible SSR FAQ section, so the
  // FAQPage schema is unique per rate tier instead of templated.
  const faqs = generateRateFaqs(rate);
  const slug = rateToSlug(rate);
  const path = `/hourly/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${SITE_URL}${path}#breadcrumb`,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Hourly to Salary Calculator', item: `${SITE_URL}/hourly-to-salary-calculator` },
          { '@type': 'ListItem', position: 3, name: `${rateLabel} an Hour` },
        ],
      },
      {
        '@id': `${SITE_URL}${path}#webpage`,
        '@type': 'WebPage',
        name: `${rateLabel} an Hour Is How Much a Year in 2026?`,
        description,
        url: `${SITE_URL}${path}`,
        inLanguage: 'en-US',
        dateModified: '2026-10-27',
        author: { '@id': `${SITE_URL}${path}#author` },
        reviewedBy: { '@id': `${SITE_URL}${path}#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@id': `${SITE_URL}${path}#author`,
        ...authorToJsonLd(getCalculatorAuthor()),
      },
      {
        '@id': `${SITE_URL}${path}#faq`,
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
      {
        '@id': `${SITE_URL}${path}#software`,
        '@type': 'WebApplication',
        name: `${rateLabel} an Hour to Yearly Salary Calculator 2026`,
        description: webAppDescription,
        url: `${SITE_URL}${path}`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: 0,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}${path}`,
        },
        author: { '@id': `${SITE_URL}${path}#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}

// ─── Server Component Page ────────────────────────────────────────────────────

export default async function HourlyRatePage({
  params,
}: {
  params: Promise<{ rate: string }>;
}) {
  const { rate: rateStr } = await params;
  const rate = slugToRate(rateStr);

  if (!rate || !isValidHourlyRate(rate)) {
    notFound();
  }

  const seo = getRateSeoText(rate);
  const jsonLd = generateJsonLd(rate, seo.description, seo.webAppDescription);
  const canonicalSlug = rateToSlug(rate);
  const isLegacy = isLegacyRateSlug(rateStr);
  const rateLabel = formatRate(rate);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* If this is a legacy URL, add a meta refresh to the canonical URL for bots that don't follow canonical */}
      {isLegacy && (
        <link rel="canonical" href={`${SITE_URL}/hourly/${canonicalSlug}`} />
      )}

      {/* H1 — Server-rendered for SEO (client component uses ssr:false) */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {rateLabel} an Hour Is How Much a Year in 2026?
        </h1>
      </div>

      {/* Hero quick-answer — server-rendered above the interactive widget */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <RateHero rate={rate} />
      </div>

      {/* Interactive Client Component — hours, filing status & state take-home */}
      <DynamicHourlyPage rate={rate} />

      {/* ─── Server-Rendered SEO Chart (SVG bar chart) ───────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HourlyChart rate={rate} />
      </div>

      {/* ─── Server-Rendered SEO Content (tier-based unique article) ──────── */}
      <RateSSRContent rate={rate} />

      {/* ─── Author Attribution (E-E-A-T) ──────────────────────── */}
      <section className="border-t border-border/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthorBioCard authorId="editorial-team" />
        </div>
      </section>
    </>
  );
}
