'use client';

import dynamic from 'next/dynamic';

const HourlyClientPage = dynamic(
  () => import('./hourly-client-page').then((m) => ({ default: m.HourlyClientPage })),
  { ssr: false }
);

export function DynamicHourlyPage({ rate }: { rate: number }) {
  return <HourlyClientPage rate={rate} />;
}
