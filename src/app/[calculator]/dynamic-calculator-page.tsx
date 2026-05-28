'use client';

import dynamic from 'next/dynamic';

const CalculatorClientPage = dynamic(
  () => import('./calculator-client-page').then((m) => ({ default: m.CalculatorClientPage })),
  { ssr: false }
);

export function DynamicCalculatorPage({ componentKey }: { componentKey: string }) {
  return <CalculatorClientPage componentKey={componentKey} />;
}
