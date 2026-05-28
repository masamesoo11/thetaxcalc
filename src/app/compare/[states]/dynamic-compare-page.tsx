'use client';

import dynamic from 'next/dynamic';

const CompareClientPage = dynamic(
  () => import('./compare-client-page').then((m) => ({ default: m.CompareClientPage })),
  { ssr: false }
);

export function DynamicComparePage({ states }: { states: string }) {
  return <CompareClientPage states={states} />;
}
