'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Direct import — avoids loading all 20 calculator components via CalculatorClientPage
const MortgageCalculator = dynamic(
  () => import('@/components/finance/mortgage-calculator').then((m) => ({ default: m.MortgageCalculator })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-3">
            <div className="rounded-xl border border-border/30 bg-card/50 p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-2/3" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border/30 bg-card/50 p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export function MortgageCalculatorClient() {
  return <MortgageCalculator />;
}
