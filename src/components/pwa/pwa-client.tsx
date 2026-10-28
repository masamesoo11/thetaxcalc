'use client';

/**
 * PWA client glue — mounts once in the root layout.
 *
 *  1. Registers /sw.js (production only, so the dev server never fights the
 *     service-worker cache during development).
 *  2. Install prompt: captures the browser's `beforeinstallprompt` event and
 *     shows a small, dismissible card — but only AFTER the visitor is
 *     engaged: a minimum dwell time AND the cookie banner resolved. Showing
 *     it immediately stacked it on top of the hero calculator (covering the
 *     "YOU TAKE HOME" result / the "Calculate Your Paycheck" CTA on mobile)
 *     alongside the cookie bar — a cluttered first-visit interface.
 *     Chrome/Edge/Samsung + Android qualify; dismissed prompts resurface
 *     after 14 days. `appinstalled` closes it for good on that device.
 *  3. iOS Safari doesn't fire beforeinstallprompt — there we show a one-line
 *     "Share → Add to Home Screen" hint instead, behind the same gate.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, Share, Plus, Smartphone, X } from 'lucide-react';

const DISMISS_KEY = 'ttc-install-dismissed-at';
const RESURFACE_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
const CONSENT_KEY = 'thetaxcalc-cookie-consent';
const REVEAL_AFTER_MS = 45_000; // visitor must dwell ≥ 45s before we interrupt
const POLL_MS = 3_000;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true
  );
}

function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document);
}

function recentlyDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return Number.isFinite(at) && Date.now() - at < RESURFACE_MS;
  } catch {
    return false;
  }
}

function persistDismissal() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    /* private mode — fine */
  }
}

function consentSettled(): boolean {
  try {
    // Cookie banner handled (accepted or declined)? Otherwise stay quiet —
    // never stack two overlays over the hero calculator.
    return localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return true; // storage unavailable — don't block the prompt forever
  }
}

export function PwaClient() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIosDevice, setIsIosDevice] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // 1. Register the service worker (production only).
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* registration failure is never user-facing */
      });
    };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, []);

  // 2. beforeinstallprompt — the standard install flow. The event is captured
  //     immediately (it only fires once); the card is revealed by gate (4).
  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // 3. iOS detection (state, so render stays pure). rAF keeps the setState
  //     outside the synchronous effect body (same pattern as CookieConsent).
  useEffect(() => {
    requestAnimationFrame(() => {
      if (isIOS() && !isStandalone() && !recentlyDismissed()) setIsIosDevice(true);
    });
  }, []);

  // 4. Engagement gate — reveal only after (a) ≥ 45s on page AND (b) the
  //     cookie banner is resolved. Polled cheaply; stopped once revealed.
  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;
    const startedAt = Date.now();
    const id = setInterval(() => {
      if (Date.now() - startedAt < REVEAL_AFTER_MS) return;
      if (!consentSettled()) return;
      if (recentlyDismissed()) {
        clearInterval(id);
        return;
      }
      setRevealed(true);
      clearInterval(id);
    }, POLL_MS);
    return () => clearInterval(id);
  }, []);

  // Installed — close forever on this device.
  useEffect(() => {
    const handler = () => setInstallEvent(null);
    window.addEventListener('appinstalled', handler);
    return () => window.removeEventListener('appinstalled', handler);
  }, []);

  const install = useCallback(async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === 'accepted') persistDismissal();
    setInstallEvent(null);
    setRevealed(false);
  }, [installEvent]);

  const dismiss = useCallback(() => {
    persistDismissal();
    setInstallEvent(null);
    setRevealed(false);
  }, []);

  const visible = revealed && (Boolean(installEvent) || isIosDevice);
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Install TheTaxCalc app"
      className="fixed inset-x-4 bottom-4 z-[95] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[340px]"
    >
      <div className="flex items-start gap-3.5 rounded-2xl border border-border/40 bg-card/95 p-4 shadow-2xl shadow-black/15 backdrop-blur-md animate-slide-up">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600/12 text-emerald-700">
          <Smartphone className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">Install TheTaxCalc</p>

          {installEvent ? (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Full-screen app icon on your home screen — works offline, no app store needed.
            </p>
          ) : (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              In Safari, tap <Share className="mx-0.5 inline h-3 w-3 -translate-y-px" />
              then <Plus className="mx-0.5 inline h-3 w-3 -translate-y-px" />
              &ldquo;Add to Home Screen&rdquo; to install the app.
            </p>
          )}

          <div className="mt-3 flex items-center gap-2">
            {installEvent && (
              <button
                type="button"
                onClick={install}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-500/20 transition-transform hover:scale-[1.03]"
              >
                <Download className="h-3.5 w-3.5" />
                Install
              </button>
            )}
            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg border border-border/50 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
            >
              {installEvent ? 'Not now' : 'Got it'}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install prompt"
          className="shrink-0 rounded-md p-1 text-muted-foreground/60 transition-colors hover:bg-muted/40 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
