/**
 * Centralized site configuration.
 * Change NEXT_PUBLIC_SITE_URL in your .env to update the domain everywhere.
 * Defaults to https://thetaxcalc.com for local development.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://thetaxcalc.com';

export const SITE_NAME = 'TheTaxCalc';

export const SITE_DESCRIPTION =
  'Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment.';

/** Helper to build absolute URLs */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
