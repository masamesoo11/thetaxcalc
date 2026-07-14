'use client';

import { useEffect, useRef } from 'react';
import { getSettings } from '@/lib/settings-store';

/**
 * ClientAnalytics — Reads AdSense ID from localStorage (set via admin panel)
 * and injects the script dynamically.
 *
 * NOTE: GA4 is loaded ONCE in layout.tsx (server-side) to avoid duplicate
 * page_view events that caused 100% bounce rate in GA4.
 *
 * If you need to change GA4 settings, update NEXT_PUBLIC_GA_MEASUREMENT_ID
 * in .env or Vercel environment variables — do NOT re-add GA4 here.
 */
export function ClientAnalytics() {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;
    injectedRef.current = true;

    const settings = getSettings();
    const adsenseId = settings.adsense_client_id;

    // ─── Google AdSense ───────────────────────────────────────
    // Only AdSense is loaded here. GA4 is in layout.tsx.
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

    // ─── GA4 is NOT loaded here — it's in layout.tsx ──────────
    // Loading GA4 twice causes duplicate page_view events and
    // artificially inflates bounce rate to 100%.
  }, []);

  return null;
}
