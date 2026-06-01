'use client';

import dynamic from 'next/dynamic';

const SalesTaxCalculator = dynamic(
  () => import('@/components/finance/sales-tax-calculator').then((mod) => mod.SalesTaxCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    ),
  }
);

interface StateSalesTaxClientPageProps {
  defaultState: string;
}

export function StateSalesTaxClientPage({ defaultState }: StateSalesTaxClientPageProps) {
  return <SalesTaxCalculator defaultState={defaultState} />;
}
