import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/site-config';
import {
  isValidSalaryAmount,
  slugToSalary,
  salaryToSlug,
  isLegacySalarySlug,
  formatSalary,
} from '@/lib/salary-calculations';
import { DynamicSalaryPage } from './dynamic-salary-page';
import { SalarySSRContent, generateTierFaqs, getSalarySeoText } from './salary-ssr-content';
import { SalaryChart } from './salary-chart';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ISR: Revalidate every 24 hours — enables Cloudflare CDN edge caching
export const revalidate = 86400;

export const dynamicParams = true; // Allow on-demand generation for other salary amounts

export function generateStaticParams() {
  // Only pre-generate top 8 salary amounts to reduce build time
  const topSalaries = [50000, 75000, 100000, 150000, 200000];
  return topSalaries.map((amount) => ({ amount: String(amount) }));
}

// ─── Per-Page Metadata (tier-differentiated descriptions) ────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ amount: string }>;
}): Promise<Metadata> {
  const { amount: amountStr } = await params;
  const salary = slugToSalary(amountStr);
  if (!salary) return { title: 'Salary Not Found' };

  const formatted = formatSalary(salary);
  const baseUrl = SITE_URL;
  // Always use the new SEO-friendly canonical URL
  const canonicalSlug = salaryToSlug(salary);
  const canonicalPath = `/salary/${canonicalSlug}`;

  // Tier-specific description & keywords (Task 26-a: de-duplicate the 27 salary
  // pages — descriptions now vary meaningfully between salary tiers)
  const seo = getSalarySeoText(salary);

  const title = `${formatted} After Taxes 2026 — Take-Home Pay by State`;

  return {
    title: { absolute: title },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Rachel Mitchell, CPA' }],
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
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: `${formatted} After Tax in 2026 — Take-Home Pay` }],
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

function generateJsonLd(salary: number, description: string, webAppDescription: string) {
  const formatted = formatSalary(salary);
  // Tier-varied FAQ set — matches the visible SSR FAQ section, so the
  // FAQPage schema is unique per salary tier instead of templated.
  const faqs = generateTierFaqs(salary);
  const slug = salaryToSlug(salary);
  const path = `/salary/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${SITE_URL}${path}#breadcrumb`,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Salary After Tax', item: `${SITE_URL}/salary` },
          { '@type': 'ListItem', position: 3, name: `${formatted} After Tax` },
        ],
      },
      {
        '@id': `${SITE_URL}${path}#webpage`,
        '@type': 'WebPage',
        name: `${formatted} After Tax in 2026 — Take-Home Pay by State`,
        description,
        url: `${SITE_URL}${path}`,
        inLanguage: 'en-US',
        dateModified: '2026-10-24',
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
        name: `${formatted} After Tax Calculator 2026`,
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

export default async function SalaryAmountPage({
  params,
}: {
  params: Promise<{ amount: string }>;
}) {
  const { amount: amountStr } = await params;
  const salary = slugToSalary(amountStr);

  if (!salary || !isValidSalaryAmount(salary)) {
    notFound();
  }

  const seo = getSalarySeoText(salary);
  const jsonLd = generateJsonLd(salary, seo.description, seo.webAppDescription);
  const canonicalSlug = salaryToSlug(salary);
  const isLegacy = isLegacySalarySlug(amountStr);
  const salaryFormatted = formatSalary(salary);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* If this is a legacy URL, add a meta refresh to the canonical URL for bots that don't follow canonical */}
      {isLegacy && (
        <link rel="canonical" href={`${SITE_URL}/salary/${canonicalSlug}`} />
      )}

      {/* H1 — Server-rendered for SEO (client component uses ssr:false) */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {salaryFormatted} After Tax in 2026
        </h1>
      </div>

      {/* Interactive Client Component with Filing Status & NYC toggle */}
      <DynamicSalaryPage amountStr={amountStr} />

      {/* ─── Server-Rendered SEO Chart (~SVG bar chart) ───────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SalaryChart salary={salary} />
      </div>

      {/* ─── Server-Rendered SEO Content (tier-based unique article) ──────── */}
      <SalarySSRContent salary={salary} />

      {/* ─── Author Attribution (E-E-A-T) ──────────────────────── */}
      <section className="py-12 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthorBioCard authorId="rachel-mitchell" />
        </div>
      </section>
    </>
  );
}
