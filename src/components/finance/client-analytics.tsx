'use client';

import { useEffect, useRef } from 'react';
import { getSettings } from '@/lib/settings-store';
import { adsAllowed } from '@/lib/consent';

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
 * CONSENT GATE (Task 48 batch 5): visitors from the EEA/UK (timezone heuristic
 * set by the Consent Mode script in layout.tsx <head>) do NOT get the AdSense
 * loader at all until they accept via the consent banner. If they accept later,
 * the 'ttx-consent' event triggers the injection. Non-EEA/UK visitors are
 * unaffected (US-focused site).
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
    const injectAdSense = () => {
      if (injectedRef.current) return;
      injectedRef.current = true;

      const settings = getSettings();
      const adminId = settings.adsense_client_id?.trim() ?? '';
      const adsenseId = adminId !== '' ? adminId : FALLBACK_ADSENSE_ID;

      // ─── Google AdSense ───────────────────────────────────────
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
    };

    // ─── GDPR / UK GDPR consent gate ───────────────────────────
    // window.__ttxEEAUK / __ttxConsent are set by the Consent Mode script in
    // layout.tsx <head> — guaranteed present by hydration time.
    const w = window as unknown as { __ttxEEAUK?: boolean; __ttxConsent?: string | null };
    const isEEAUK = w.__ttxEEAUK === true;
    const consent =
      w.__ttxConsent === 'all' || w.__ttxConsent === 'essential' ? w.__ttxConsent : null;

    if (adsAllowed(isEEAUK, consent)) {
      injectAdSense();
    } else {
      // EEA/UK visitor without full consent: no ad script. If they accept via
      // the banner later, inject then. "Reject non-essential" never injects.
      const onConsent = (e: Event) => {
        const detail = (e as CustomEvent<{ value?: string }>).detail;
        if (detail?.value === 'all') {
          window.removeEventListener('ttx-consent', onConsent);
          injectAdSense();
        }
      };
      window.addEventListener('ttx-consent', onConsent);
      return () => window.removeEventListener('ttx-consent', onConsent);
    }

    // ─── GA4 is NOT loaded here — it's in layout.tsx ──────────
    // Loading GA4 twice causes duplicate page_view events and
    // artificially inflates bounce rate to 100%.
  }, []);

  return null;
}
