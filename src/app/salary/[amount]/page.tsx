import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/site-config';
import {
  SALARY_AMOUNTS,
  calculateSalaryTakeHome,
  generateFAQs,
  isValidSalaryAmount,
  slugToSalary,
  formatSalary,
  fmt,
} from '@/lib/salary-calculations';
import { DynamicSalaryPage } from './dynamic-salary-page';

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
  const path = `/salary/${amountStr}`;

  const title = `${formatted} After Tax 2026 — Take-Home Pay`;
  const description = `See your take-home pay on a ${formatted} salary in 2026. Compare net pay across all 50 states after federal, FICA, and state tax.`;

  return {
    title,
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
    authors: [{ name: 'TheTaxCalc' }],
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        'en-US': `${baseUrl}${path}`,
        'x-default': `${baseUrl}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: `${formatted} After Tax 2026 — TheTaxCalc` }],
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
  const path = `/salary/${salary}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Salary After Tax', item: `${SITE_URL}/salary` },
          { '@type': 'ListItem', position: 3, name: `${formatted} After Tax`, item: `${SITE_URL}${path}` },
        ],
      },
      {
        '@type': 'WebPage',
        name: `${formatted} After Tax in 2026 — Take-Home Pay by State`,
        description: `Calculate your take-home pay on a ${formatted} salary in 2026. Compare net pay across all 50 states.`,
        url: `${SITE_URL}${path}`,
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
      },
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
      {
        '@type': 'Dataset',
        name: `${formatted} Take-Home Pay by State (2026)`,
        description: `Net annual pay after federal tax, FICA, and state income tax on a ${formatted} salary for Single filer with standard deduction.`,
        variableMeasured: calc.states.map((s) => ({
          name: `Net Pay in ${s.stateName}`,
          value: fmt(s.netAnnual),
        })),
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

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Interactive Client Component with Filing Status & NYC toggle */}
      <DynamicSalaryPage amountStr={amountStr} />
    </>
  );
}
