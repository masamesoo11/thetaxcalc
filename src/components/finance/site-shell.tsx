'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { ProductHuntBanner } from './product-hunt-banner';

/**
 * Site shell that conditionally renders Header/Footer based on embed mode.
 * When ?embed=1 is in the URL, it hides navigation elements and shows
 * only the calculator content with a "Powered by TheTaxCalc" badge.
 */
function SiteShellInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get('embed') === '1';

  if (isEmbed) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 p-4">{children}</main>
        {/* Powered by badge for embeds */}
        <div className="py-2 px-4 text-center border-t border-border/20">
          <p className="text-xs text-muted-foreground">
            Powered by{' '}
            <a
              href="https://thetaxcalc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              TheTaxCalc
            </a>
            {' '}— Free 2026 Tax Calculators
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background bg-mesh">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg">
        Skip to main content
      </a>
      <ProductHuntBanner />
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-background bg-mesh">
          <main className="flex-1">{children}</main>
        </div>
      }
    >
      <SiteShellInner>{children}</SiteShellInner>
    </Suspense>
  );
}
