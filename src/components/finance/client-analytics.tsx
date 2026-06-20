'use client';

import { useEffect, useRef } from 'react';
import { getSettings } from '@/lib/settings-store';

/**
 * ClientAnalytics — Reads GA & AdSense IDs from localStorage
 * (set via the admin panel) and injects the scripts dynamically.
 *
 * Also falls back to NEXT_PUBLIC_GA_MEASUREMENT_ID env var.
 */
export function ClientAnalytics() {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;
    injectedRef.current = true;

    const settings = getSettings();
    const gaId = settings.ga_tracking_id || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const adsenseId = settings.adsense_client_id;

    // ─── Google Analytics ──────────────────────────────────────
    if (gaId && gaId.trim() !== '') {
      // Avoid duplicate GA scripts
      if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
        const scriptSrc = document.createElement('script');
        scriptSrc.async = true;
        scriptSrc.setAttribute('data-cfasync', 'false'); // Bypass Cloudflare Rocket Loader
        scriptSrc.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(scriptSrc);

        const scriptInit = document.createElement('script');
        scriptInit.setAttribute('data-cfasync', 'false'); // Bypass Cloudflare Rocket Loader
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
    }

    // ─── Google AdSense ───────────────────────────────────────
    if (adsenseId && adsenseId.trim() !== '') {
      // Avoid duplicate AdSense scripts
      if (!document.querySelector('script[data-adsense-client]')) {
        const adsenseScript = document.createElement('script');
        adsenseScript.async = true;
        adsenseScript.crossOrigin = 'anonymous';
        adsenseScript.setAttribute('data-cfasync', 'false'); // Bypass Cloudflare Rocket Loader
        adsenseScript.setAttribute('data-adsense-client', adsenseId);
        adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
        document.head.appendChild(adsenseScript);

        console.log('[Analytics] AdSense loaded:', adsenseId);
      }
    }
  }, []);

  return null;
}
