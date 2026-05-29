'use client';

import dynamic from 'next/dynamic';

// Lazy-load non-critical components to reduce initial JS bundle
const Toaster = dynamic(
  () => import('@/components/ui/toaster').then((m) => ({ default: m.Toaster })),
  { ssr: false }
);

const SeoNavigation = dynamic(
  () => import('@/components/finance/seo-navigation').then((m) => ({ default: m.SeoNavigation })),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import('@/components/finance/cookie-consent').then((m) => ({ default: m.CookieConsent })),
  { ssr: false }
);

export function DynamicProviders() {
  return (
    <>
      <SeoNavigation />
      <Toaster />
      <CookieConsent />
    </>
  );
}
