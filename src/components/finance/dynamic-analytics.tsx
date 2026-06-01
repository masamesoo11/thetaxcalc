'use client';

import { useEffect } from 'react';

const SETTINGS_KEY = 'thetaxcalc_admin_settings';

/**
 * Client-side analytics component that reads GA & AdSense IDs from
 * localStorage (saved by the admin Settings panel) and injects the
 * corresponding scripts dynamically.
 *
 * This runs *after* hydration so the server-rendered GoogleAnalytics
 * component (which uses NEXT_PUBLIC_GA_MEASUREMENT_ID) may have already
 * injected GA — we avoid double-injection by checking window.gtag.
 */
export function DynamicAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ─── Load settings from localStorage ─────────────────────────────
    let settings: Record<string, string> = {};
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) settings = JSON.parse(raw);
    } catch {
      return;
    }

    // ─── Google Analytics ─────────────────────────────────────────────
    const gaId = settings.ga_tracking_id;
    const envGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (gaId && gaId !== envGaId) {
      // Only inject if different from what the server component already injected
      const existingScript = document.querySelector(
        `script[src="https://www.googletagmanager.com/gtag/js?id=${gaId}"]`
      );

      if (!existingScript) {
        // Inject gtag script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        // Inject gtag config
        const config = document.createElement('script');
        config.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `;
        document.head.appendChild(config);
      }
    }

    // ─── Google AdSense ───────────────────────────────────────────────
    const adsenseId = settings.adsense_client_id;

    if (adsenseId) {
      const existingAdScript = document.querySelector(
        `script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}"]`
      );

      if (!existingAdScript) {
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.crossOrigin = 'anonymous';
        adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
        document.head.appendChild(adScript);
      }
    }
  }, []);

  return null;
}
