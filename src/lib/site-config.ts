/**
 * Centralized site configuration.
 * Change NEXT_PUBLIC_SITE_URL in your .env to update the domain everywhere.
 * Defaults to https://taxyield.io for local development.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://taxyield.io';

export const SITE_NAME = 'TaxYield.io';

export const SITE_DESCRIPTION =
  'Free 2026 tax calculators — paycheck, mortgage, 401(k), capital gains, and self-employment.';

/** Helper to build absolute URLs */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
