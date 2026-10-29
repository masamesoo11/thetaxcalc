/**
 * IndexNow API Integration
 * Submits URLs to search engines (Bing, Yandex, IndexNow) for instant indexing.
 * @see https://www.indexnow.org/documentation
 */

import { getSitemapEntries } from '@/lib/sitemap-entries';

// ─── Configuration ──────────────────────────────────────────────────────────

// Key issued by Bing Webmaster Tools for thetaxcalc.com (Oct 2026).
// Key file served at https://thetaxcalc.com/5e34d86060864b8ab89960f70671a252.txt
const INDEXNOW_KEY = '5e34d86060864b8ab89960f70671a252';
const INDEXNOW_HOST = 'thetaxcalc.com';
const INDEXNOW_KEY_LOCATION = `https://thetaxcalc.com/${INDEXNOW_KEY}.txt`;

/** IndexNow API endpoints (primary + search engine-specific) */
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
] as const;

/** Maximum URLs allowed per request */
export const MAX_URLS_PER_REQUEST = 100;

// ─── Types ──────────────────────────────────────────────────────────────────

export interface IndexNowRequestBody {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export interface IndexNowResult {
  endpoint: string;
  status: number;
  ok: boolean;
  message: string;
}

export interface SubmitResult {
  success: boolean;
  totalUrls: number;
  results: IndexNowResult[];
  errors: string[];
}

// ─── URL Validation ─────────────────────────────────────────────────────────

/**
 * Validates that a URL belongs to the thetaxcalc.com domain.
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' &&
      (parsed.hostname === 'thetaxcalc.com' || parsed.hostname === 'www.thetaxcalc.com')
    );
  } catch {
    return false;
  }
}

/**
 * Filters and validates a list of URLs, returning only those that belong to thetaxcalc.com.
 */
export function filterValidUrls(urls: string[]): string[] {
  return urls.filter(isValidUrl);
}

// ─── Core Submission ────────────────────────────────────────────────────────

/**
 * Submits a list of URLs to all IndexNow API endpoints.
 *
 * @param urls - Array of absolute URLs to submit (must belong to thetaxcalc.com)
 * @returns Results from each endpoint
 */
export async function submitToIndexNow(urls: string[]): Promise<SubmitResult> {
  // Validate URL count
  if (urls.length === 0) {
    return {
      success: false,
      totalUrls: 0,
      results: [],
      errors: ['No URLs provided for submission.'],
    };
  }

  if (urls.length > MAX_URLS_PER_REQUEST) {
    return {
      success: false,
      totalUrls: urls.length,
      results: [],
      errors: [`Too many URLs: ${urls.length}. Maximum is ${MAX_URLS_PER_REQUEST} per request.`],
    };
  }

  // Filter to only valid thetaxcalc.com URLs
  const validUrls = filterValidUrls(urls);

  if (validUrls.length === 0) {
    return {
      success: false,
      totalUrls: urls.length,
      results: [],
      errors: ['No valid thetaxcalc.com URLs found in the submission list.'],
    };
  }

  const body: IndexNowRequestBody = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: validUrls,
  };

  const results: IndexNowResult[] = [];
  const errors: string[] = [];

  // Submit to all endpoints in parallel
  const responses = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(async (endpoint): Promise<IndexNowResult> => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const ok = response.ok;
        let message = '';

        switch (response.status) {
          case 200:
            message = 'URLs submitted successfully.';
            break;
          case 202:
            message = 'URLs received and will be processed asynchronously.';
            break;
          case 400:
            message = 'Bad request: invalid format or missing required fields.';
            break;
          case 403:
            message = 'Forbidden: key does not match or key file not accessible.';
            break;
          case 422:
            message = 'Unprocessable: URLs do not belong to the host or key mismatch.';
            break;
          case 429:
            message = 'Too many requests: rate limit exceeded. Try again later.';
            break;
          default:
            message = `Unexpected response: ${response.status} ${response.statusText}`;
        }

        return { endpoint, status: response.status, ok, message };
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown error';
        return { endpoint, status: 0, ok: false, message: `Network error: ${msg}` };
      }
    })
  );

  for (const response of responses) {
    if (response.status === 'fulfilled') {
      results.push(response.value);
      if (!response.value.ok) {
        errors.push(`${response.value.endpoint}: ${response.value.message}`);
      }
    } else {
      results.push({
        endpoint: 'unknown',
        status: 0,
        ok: false,
        message: `Promise rejected: ${response.reason}`,
      });
      errors.push(`Submission failed: ${response.reason}`);
    }
  }

  const anySuccess = results.some((r) => r.ok);

  return {
    success: anySuccess,
    totalUrls: validUrls.length,
    results,
    errors,
  };
}

// ─── Sitemap-Based Submission ───────────────────────────────────────────────

/**
 * Generates the complete canonical URL inventory.
 * Single source of truth: src/lib/sitemap-entries.ts — the same function that
 * builds /sitemap.xml, so the IndexNow inventory can never drift from the
 * sitemap (a hand-maintained list here previously missed 72 sitemap URLs,
 * including the /calculators hub, the hourly section, and /research pages).
 * Used by submitAllPagesToIndexNow() to submit the full site.
 */
export function getAllSiteUrls(): string[] {
  return getSitemapEntries().map((entry) => entry.url);
}

/**
 * Submits all important site pages to IndexNow in batches.
 * Automatically splits URLs into chunks of MAX_URLS_PER_REQUEST.
 *
 * @returns Combined results from all batch submissions
 */
export async function submitAllPagesToIndexNow(): Promise<SubmitResult> {
  const allUrls = getAllSiteUrls();

  // If within single-request limit, submit all at once
  if (allUrls.length <= MAX_URLS_PER_REQUEST) {
    return submitToIndexNow(allUrls);
  }

  // Split into batches
  const batches: string[][] = [];
  for (let i = 0; i < allUrls.length; i += MAX_URLS_PER_REQUEST) {
    batches.push(allUrls.slice(i, i + MAX_URLS_PER_REQUEST));
  }

  const allResults: IndexNowResult[] = [];
  const allErrors: string[] = [];
  let totalSubmitted = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const result = await submitToIndexNow(batch);

    allResults.push(...result.results);
    allErrors.push(...result.errors);
    totalSubmitted += result.totalUrls;

    // Add a small delay between batches to respect rate limits
    if (i < batches.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return {
    success: allResults.some((r) => r.ok),
    totalUrls: totalSubmitted,
    results: allResults,
    errors: allErrors,
  };
}
