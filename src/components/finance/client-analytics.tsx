'use client';

import { useEffect, useRef } from 'react';

interface SiteSettings {
  ga_tracking_id?: string;
  adsense_client_id?: string;
}

/**
 * ClientAnalytics — Reads GA & AdSense IDs from the /api/settings
 * endpoint (which pulls from the in-memory DB) and injects the
 * corresponding scripts dynamically.
 *
 * Falls back to the NEXT_PUBLIC_GA_MEASUREMENT_ID env var if the
 * DB setting is empty.
 */
export function ClientAnalytics() {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;

    async function loadAnalytics() {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) return;
        const settings: SiteSettings = await res.json();

        const gaId = settings.ga_tracking_id || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
        const adsenseId = settings.adsense_client_id;

        if (injectedRef.current) return;
        injectedRef.current = true;

        // ─── Google Analytics ──────────────────────────────────────
        if (gaId && gaId.trim() !== '') {
          // gtag.js loader
          const scriptSrc = document.createElement('script');
          scriptSrc.async = true;
          scriptSrc.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
          document.head.appendChild(scriptSrc);

          // gtag init
          const scriptInit = document.createElement('script');
          scriptInit.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `;
          document.head.appendChild(scriptInit);

          console.log('[Analytics] Google Analytics loaded:', gaId);
        }

        // ─── Google AdSense ───────────────────────────────────────
        if (adsenseId && adsenseId.trim() !== '') {
          // Avoid duplicate AdSense scripts
          const existing = document.querySelector(
            'script[data-adsense-client]'
          );
          if (!existing) {
            const adsenseScript = document.createElement('script');
            adsenseScript.async = true;
            adsenseScript.crossOrigin = 'anonymous';
            adsenseScript.setAttribute(
              'data-adsense-client',
              adsenseId
            );
            adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
            document.head.appendChild(adsenseScript);

            console.log('[Analytics] AdSense loaded:', adsenseId);
          }
        }
      } catch (err) {
        console.error('[Analytics] Failed to load settings:', err);
      }
    }

    loadAnalytics();
  }, []);

  return null;
}
