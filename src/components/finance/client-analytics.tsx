'use client';

import { useEffect, useRef } from 'react';
import { getSettings } from '@/lib/settings-store';

/**
 * ClientAnalytics — Loads the AdSense script AFTER hydration.
 *
 * The loader is injected here (not statically in <head>) because the async
 * adsbygoogle.js appends its own <script> to document.head as soon as it
 * executes; when that happened mid-hydration it desynchronized React's head
 * node alignment and produced hydration-mismatch console errors (the dev
 * overlay's "1 Issue" badge) on the sitewide JSON-LD script. useEffect only
 * runs once hydration is complete, so third-party head mutations are safe.
 *
 * AdSense ID precedence: admin panel (localStorage) → NEXT_PUBLIC_ADSENSE_CLIENT_ID
 * → hardcoded production fallback. Site verification itself stays static in
 * layout.tsx (<meta name="google-adsense-account">) so crawlers always see it.
 *
 * NOTE: GA4 is loaded ONCE in layout.tsx (server-side) to avoid duplicate
 * page_view events that caused 100% bounce rate in GA4.
 *
 * If you need to change GA4 settings, update NEXT_PUBLIC_GA_MEASUREMENT_ID
 * in .env or Vercel environment variables — do NOT re-add GA4 here.
 */

const FALLBACK_ADSENSE_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-5542276525674040';

export function ClientAnalytics() {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;
    injectedRef.current = true;

    const settings = getSettings();
    const adminId = settings.adsense_client_id?.trim() ?? '';
    const adsenseId = adminId !== '' ? adminId : FALLBACK_ADSENSE_ID;

    // ─── Google AdSense ───────────────────────────────────────
    // Only AdSense is loaded here. GA4 is in layout.tsx.
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

    // ─── GA4 is NOT loaded here — it's in layout.tsx ──────────
    // Loading GA4 twice causes duplicate page_view events and
    // artificially inflates bounce rate to 100%.
  }, []);

  return null;
}
