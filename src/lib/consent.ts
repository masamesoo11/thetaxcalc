/**
 * Consent (GDPR / UK GDPR) — shared helpers for the lightweight CMP.
 *
 * The site is US-focused, but visitors from the EEA and UK get a consent
 * banner before any non-essential cookie or ad script runs:
 *
 *   - `ttx_consent` cookie: 'all' (analytics + ads allowed) or
 *     'essential' (essential cookies only). Absent = no choice yet.
 *   - Google Consent Mode v2 defaults are set by an inline script in
 *     layout.tsx <head> BEFORE any gtag/GTM script executes:
 *     granted for non-EEA/UK visitors or when consent === 'all',
 *     denied otherwise (including "no choice yet").
 *   - The AdSense loader (ClientAnalytics) is HARD-GATED: for EEA/UK
 *     visitors it is not injected at all until consent === 'all'.
 *
 * Task 48 batch 5 (2026-10-31): built in response to the external AdSense
 * audit ("add a consent banner for EU/UK visitors") and to make the privacy
 * policy's existing cookie-banner promise true.
 */

export const CONSENT_COOKIE_NAME = 'ttx_consent';
export const CONSENT_STORAGE_DAYS = 365;

export type ConsentValue = 'all' | 'essential';

/**
 * Window contract for the consent system. The EEA/UK flag and stored consent
 * mirror are set by the inline Consent Mode script in layout.tsx <head>
 * (guaranteed present before hydration); __ttxReopen / ttxOpenConsent power
 * the footer "Cookie Settings" reopen flow.
 */
declare global {
  interface Window {
    /** EEA/UK timezone heuristic — set by the Consent Mode script in <head>. */
    __ttxEEAUK?: boolean;
    /** Stored consent mirrored on window ('all' | 'essential' | null). */
    __ttxConsent?: string | null;
    /** Reopen-request flag set by the footer "Cookie Settings" hook. */
    __ttxReopen?: boolean;
    /** Reopens the consent banner (registered by ConsentBanner). */
    ttxOpenConsent?: () => void;
  }
}

/**
 * IANA timezones covering the EEA (EU + Iceland, Norway, Liechtenstein)
 * plus the UK and its Crown dependencies. Used as a client-side region
 * heuristic: not perfect geo, but deterministic, private (no IP lookup),
 * and errs on the side of showing the banner.
 */
const EEA_UK_TIMEZONES: ReadonlySet<string> = new Set([
  // EU/EEA member states
  'Europe/Amsterdam', 'Europe/Athens', 'Europe/Berlin', 'Europe/Bratislava',
  'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest', 'Europe/Busingen',
  'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Helsinki', 'Europe/Lisbon',
  'Europe/Ljubljana', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Malta',
  'Europe/Mariehamn', 'Europe/Oslo', 'Europe/Paris', 'Europe/Prague',
  'Europe/Riga', 'Europe/Rome', 'Europe/Stockholm', 'Europe/Sofia',
  'Europe/Tallinn', 'Europe/Vaduz', 'Europe/Vienna', 'Europe/Vilnius',
  'Europe/Warsaw', 'Europe/Zagreb',
  // Cyprus
  'Asia/Nicosia', 'Asia/Famagusta',
  // Iceland + Faroe (Denmark)
  'Atlantic/Reykjavik', 'Atlantic/Faeroe',
  // Atlantic territories of ES/PT
  'Atlantic/Canary', 'Atlantic/Madeira', 'Atlantic/Azores',
  // UK + Crown dependencies
  'Europe/London', 'Europe/Belfast', 'Europe/Guernsey',
  'Europe/Isle_of_Man', 'Europe/Jersey', 'Europe/Gibraltar',
]);

/** Client-side EEA/UK heuristic based on the browser timezone. */
export function isEEAUKTimezone(timezone: string | undefined): boolean {
  if (!timezone) return false;
  return EEA_UK_TIMEZONES.has(timezone);
}

/** Get the browser timezone (client only). Returns '' when unavailable. */
export function browserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch {
    return '';
  }
}

/** Read the stored consent choice. Client only. */
export function readConsent(): ConsentValue | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${CONSENT_COOKIE_NAME}=`));
  const value = match ? decodeURIComponent(match.split('=')[1]) : '';
  return value === 'all' || value === 'essential' ? value : null;
}

/** Store the consent choice (365 days, SameSite=Lax, no PII). Client only. */
export function writeConsent(value: ConsentValue): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + CONSENT_STORAGE_DAYS * 24 * 60 * 60 * 1000);
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

/** True when ad/analytics scripts may load for THIS visitor right now. */
export function adsAllowed(isEEAUK: boolean, consent: ConsentValue | null): boolean {
  if (!isEEAUK) return true; // US-focused site: no consent needed outside EEA/UK
  return consent === 'all';
}

/**
 * Push a Consent Mode v2 update through gtag when it exists, so GA4/GTM
 * tags pick up the user's choice immediately (also fires for listeners).
 */
export function pushConsentUpdate(value: ConsentValue): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __ttxConsent?: ConsentValue;
  };
  w.__ttxConsent = value;
  const granted = value === 'all';
  const update = {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  };
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', update);
  } else if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(['consent', 'update', update]);
  }
  window.dispatchEvent(new CustomEvent('ttx-consent', { detail: { value } }));
}
