import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/site-config';
import {
  SALARY_AMOUNTS,
  calculateSalaryTakeHome,
  generateFAQs,
  isValidSalaryAmount,
  slugToSalary,
  salaryToSlug,
  isLegacySalarySlug,
  formatSalary,
  fmt,
} from '@/lib/salary-calculations';
import { calculateFederalTax, calculateFICA } from '@/lib/finance-utils';
import { DynamicSalaryPage } from './dynamic-salary-page';
import { SalarySSRContent } from './salary-ssr-content';
import { SalaryChart } from './salary-chart';
import { getCalculatorAuthor, authorToJsonLd } from '@/lib/authors';
import { AuthorBioCard } from '@/components/finance/author-bio-card';

// ISR: Revalidate every 24 hours — enables Cloudflare CDN edge caching
export const revalidate = 86400;

export const dynamicParams = false;

export function generateStaticParams() {
  return SALARY_AMOUNTS.map((amount) => ({ amount: String(amount) }));
}

// ─── Per-Page Metadata ────────────────────────────────────────────────────────

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

  // Calculate Texas take-home for the meta description (no state tax = highest)
  const federalTax = calculateFederalTax(salary, 'single');
  const fica = calculateFICA(salary, 'single');
  const txTakeHome = salary - federalTax - fica.total;

  const title = `${formatted} After Taxes 2026 — Take-Home Pay by State`;
  const description = `${formatted} after taxes in 2026? In Texas, you keep ~${fmt(txTakeHome)} (0% state tax). See take-home pay by state — TX, CA, NY, FL & more. Free calculator.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${formatted} after tax`,
      `${formatted} take home pay`,
      `${formatted} salary after tax`,
      `${formatted} net pay`,
      `${formatted} paycheck`,
      `${formatted} after tax california`,
      `${formatted} after tax texas`,
      `${formatted} after tax new york`,
      `${formatted} after tax illinois`,
      `${formatted} after tax florida`,
      'salary calculator 2026',
      'take home pay calculator',
    ],
    authors: [{ name: 'Rachel Mitchell, CPA' }],
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: `${formatted} After Tax in 2026 — Take-Home Pay` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/opengraph-image.png`],
    },
  };
}

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

function generateJsonLd(salary: number) {
  const calc = calculateSalaryTakeHome(salary);
  const formatted = formatSalary(salary);
  const faqs = generateFAQs(salary);
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
        description: `Calculate your take-home pay on a ${formatted} salary in 2026. Compare net pay across all 50 states.`,
        url: `${SITE_URL}${path}`,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
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
        description: `Calculate ${formatted} take-home pay after federal, FICA, and state income tax. Compare net pay across all 50 states for the 2026 tax year.`,
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

  const jsonLd = generateJsonLd(salary);
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

      {/* ─── Server-Rendered SEO Content (~1000 words) ──────────────────────── */}
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
