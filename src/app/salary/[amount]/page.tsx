import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/site-config';
import {
  SALARY_AMOUNTS,
  isValidSalaryAmount,
  slugToSalary,
  formatSalary,
} from '@/lib/salary-calculations';
import { DynamicSalaryPage } from './dynamic-salary-page';

// ─── Static Generation ────────────────────────────────────────────────────────

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
  if (!salary) return { title: 'Salary Not Found | TheTaxCalc' };

  const formatted = formatSalary(salary);
  const baseUrl = SITE_URL;
  const path = `/salary/${amountStr}`;

  const title = `${formatted} After Tax in 2026 — Take-Home Pay by State`;
  const description = `See your take-home pay on a ${formatted} salary in 2026. Compare net pay across Illinois, Texas, Florida, California, and New York after federal tax, FICA, and state income tax.`;

  return {
    title,
    description,
    keywords: [
      `${formatted} after tax`,
      `${formatted} take home pay`,
      `${formatted} salary after tax`,
      `${formatted} net pay`,
      `${formatted} paycheck`,
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
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

  return <DynamicSalaryPage amountStr={amountStr} />;
}
