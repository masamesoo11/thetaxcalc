'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy-load calculator components for better performance
const PaycheckCalculator = dynamic(
  () => import('@/components/finance/paycheck-calculator').then((m) => ({ default: m.PaycheckCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const IllinoisCalculator = dynamic(
  () => import('@/components/finance/illinois-calculator').then((m) => ({ default: m.IllinoisCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const TexasCalculator = dynamic(
  () => import('@/components/finance/texas-calculator').then((m) => ({ default: m.TexasCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const FloridaCalculator = dynamic(
  () => import('@/components/finance/florida-calculator').then((m) => ({ default: m.FloridaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const CaliforniaCalculator = dynamic(
  () => import('@/components/finance/california-calculator').then((m) => ({ default: m.CaliforniaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const NewYorkCalculator = dynamic(
  () => import('@/components/finance/newyork-calculator').then((m) => ({ default: m.NewYorkCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const MortgageCalculator = dynamic(
  () => import('@/components/finance/mortgage-calculator').then((m) => ({ default: m.MortgageCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const RetirementProjection = dynamic(
  () => import('@/components/finance/retirement-projection').then((m) => ({ default: m.RetirementProjection })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const RelocationCalculator = dynamic(
  () => import('@/components/finance/relocation-calculator').then((m) => ({ default: m.RelocationCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const CapitalGainsCalculator = dynamic(
  () => import('@/components/finance/capital-gains-calculator').then((m) => ({ default: m.CapitalGainsCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const SelfEmploymentCalculator = dynamic(
  () => import('@/components/finance/self-employment-calculator').then((m) => ({ default: m.SelfEmploymentCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);

function CalculatorSkeleton() {
  return (
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
  );
}

interface CalculatorClientPageProps {
  componentKey: string;
}

export function CalculatorClientPage({ componentKey }: CalculatorClientPageProps) {
  switch (componentKey) {
    case 'home':
      return <PaycheckCalculator />;
    case 'illinois':
      return <IllinoisCalculator />;
    case 'texas':
      return <TexasCalculator />;
    case 'florida':
      return <FloridaCalculator />;
    case 'california':
      return <CaliforniaCalculator />;
    case 'newyork':
      return <NewYorkCalculator />;
    case 'mortgage':
      return <MortgageCalculator />;
    case 'retirement':
      return <RetirementProjection />;
    case 'relocation':
      return <RelocationCalculator />;
    case 'capital-gains':
      return <CapitalGainsCalculator />;
    case 'self-employment':
      return <SelfEmploymentCalculator />;
    default:
      return <PaycheckCalculator />;
  }
}
