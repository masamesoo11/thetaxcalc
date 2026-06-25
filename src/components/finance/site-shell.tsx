'use client';

import { useEffect, useRef, useState } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { ProductHuntBanner } from './product-hunt-banner';
import { trackEmbedView } from '@/lib/analytics';

/**
 * Site shell that conditionally renders Header/Footer based on embed mode.
 * When ?embed=1 is in the URL, it hides navigation elements and shows
 * only the calculator content with a "Powered by TheTaxCalc" badge.
 * Also tracks embed views in GA4.
 *
 * IMPORTANT: We intentionally avoid useSearchParams() here because it triggers
 * a React Suspense boundary that prevents ALL page content (including
 * server-rendered H1s and SEO content) from appearing in the initial HTML.
 * Instead, we detect embed mode via window.location.search in useEffect,
 * which runs only on the client after hydration — preserving SSR HTML for SEO.
 */
function SiteShellInner({ children }: { children: React.ReactNode }) {
  const [isEmbed, setIsEmbed] = useState(false);
  const embedTrackedRef = useRef(false);

  useEffect(() => {
    // Detect embed mode from URL query string (client-only, no Suspense needed)
    const params = new URLSearchParams(window.location.search);
    const embed = params.get('embed') === '1';
    setIsEmbed(embed);

    // Track embed views in GA4 (fire once per page load)
    if (embed && !embedTrackedRef.current) {
      embedTrackedRef.current = true;
      const slug = window.location.pathname.replace(/^\//, '');
      trackEmbedView(slug || 'unknown');
    }
  }, []);

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
  return <SiteShellInner>{children}</SiteShellInner>;
}
