'use client';

import dynamic from 'next/dynamic';

const SalaryClientPage = dynamic(
  () => import('./salary-client-page').then((m) => ({ default: m.SalaryClientPage })),
  { ssr: false }
);

export function DynamicSalaryPage({ amountStr }: { amountStr: string }) {
  return <SalaryClientPage amountStr={amountStr} />;
}
