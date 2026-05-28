'use client';

import dynamic from 'next/dynamic';

const CalculatorClientPage = dynamic(
  () => import('./calculator-client-page').then((m) => ({ default: m.CalculatorClientPage })),
  { ssr: false }
);

const CalculatorContentClient = dynamic(
  () => import('./calculator-content-client').then((m) => ({ default: m.CalculatorContentClient })),
  { ssr: false }
);

export function DynamicCalculatorPage({ componentKey, jsonLdType }: { componentKey: string; jsonLdType: string }) {
  return (
    <>
      <CalculatorClientPage componentKey={componentKey} />
      <CalculatorContentClient jsonLdType={jsonLdType} />
    </>
  );
}
