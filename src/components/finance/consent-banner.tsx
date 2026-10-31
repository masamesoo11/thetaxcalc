'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { readConsent, writeConsent, pushConsentUpdate } from '@/lib/consent';

/**
 * ConsentBanner — lightweight CMP for EEA/UK visitors (GDPR / UK GDPR).
 *
 * - Shows ONLY for visitors whose browser timezone maps to the EEA/UK
 *   (flag set by the Consent Mode script in layout.tsx <head>) AND who
 *   have not made a choice yet (ttx_consent cookie absent).
 * - "Accept all" → analytics + ads allowed (Consent Mode v2 update fires, and
 *   ClientAnalytics injects the AdSense loader on the 'ttx-consent' event).
 * - "Reject non-essential" → essential cookies only; the AdSense loader is
 *   never injected for this visitor.
 * - Choice stored 365 days; reopen anytime via the "Cookie Settings" link in
 *   the footer (window.ttxOpenConsent below).
 * - Non-EEA/UK visitors never see the banner (server snapshot = 'hidden',
 *   keeps the DOM clean for crawlers).
 *
 * Visibility is derived via useSyncExternalStore (no effect-driven setState):
 * the snapshot recomputes whenever a 'ttx-consent' event fires — i.e. on the
 * user's choice or when the footer reopens the banner.
 *
 * Task 48 batch 5 (2026-10-31) — external AdSense audit: "add a consent
 * banner for EU/UK visitors". Makes the privacy policy's existing promise
 * ("we ask for your consent before setting non-essential cookies") true.
 */

type BannerFlags = { __ttxEEAUK?: boolean; __ttxReopen?: boolean };

function subscribe(callback: () => void) {
  window.addEventListener('ttx-consent', callback);
  return () => window.removeEventListener('ttx-consent', callback);
}

function getSnapshot(): 'banner' | 'hidden' {
  const w = window as unknown as BannerFlags;
  if (w.__ttxReopen === true) return 'banner';
  if (w.__ttxEEAUK === true && readConsent() === null) return 'banner';
  return 'hidden';
}

function getServerSnapshot(): 'hidden' {
  return 'hidden';
}

export function ConsentBanner() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Footer "Cookie Settings" hook — reopen the banner on demand (dispatches
  // the event so the external-store snapshot recomputes; no local state).
  useEffect(() => {
    const w = window as unknown as { ttxOpenConsent?: () => void };
    w.ttxOpenConsent = () => {
      window.__ttxReopen = true;
      window.dispatchEvent(new Event('ttx-consent'));
    };
    return () => {
      delete w.ttxOpenConsent;
    };
  }, []);

  const choose = useCallback((value: 'all' | 'essential') => {
    writeConsent(value);
    // Clear the reopen flag BEFORE dispatching: the event listener re-reads the
    // snapshot synchronously, so the flag must already reflect the user's
    // choice or the banner would be considered "still open" and never re-render.
    window.__ttxReopen = false;
    pushConsentUpdate(value); // dispatches 'ttx-consent' → snapshot re-read
  }, []);

  if (state !== 'banner') return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-emerald-500/20 bg-white/95 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur supports-[backdrop-filter]:bg-white/90"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-3">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-[#57534e]">
            <span className="font-semibold text-[#1c1917]">Your cookie choice.</span>{' '}
            Essential cookies keep our calculators working. With your consent, analytics and
            advertising cookies (including Google AdSense) help us understand usage and keep
            every tool free. In your region (EEA/UK) we ask before setting non-essential
            cookies.{' '}
            <Link
              href="/privacy"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-600"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:items-center">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="min-h-[44px] rounded-lg border border-[#e7e0d0] bg-white px-4 py-2 text-sm font-medium text-[#44403c] transition-colors hover:border-emerald-500/40 hover:bg-[#faf5e9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="min-h-[44px] rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-emerald-600 hover:to-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
