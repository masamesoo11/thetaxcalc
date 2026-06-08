/**
 * IndexNow API Integration
 * Submits URLs to search engines (Bing, Yandex, IndexNow) for instant indexing.
 * @see https://www.indexnow.org/documentation
 */

import { SITE_URL } from '@/lib/site-config';
import { CALCULATOR_ROUTES } from '@/lib/calculator-routes';
import { SALARY_AMOUNTS } from '@/lib/salary-calculations';
import { COMPARISON_SLUGS } from '@/lib/compare-config';
import { ALL_STATE_KEYS } from '@/lib/state-sales-tax-data';
import { getPublishedPostsMeta } from '@/lib/blog-index';

// ─── Configuration ──────────────────────────────────────────────────────────

const INDEXNOW_KEY = 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9';
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
 * Generates a list of all important site URLs from the sitemap configuration.
 * Used by submitAllPagesToIndexNow() to submit the full site.
 */
export function getAllSiteUrls(): string[] {
  const urls: string[] = [];

  // Homepage
  urls.push(SITE_URL);

  // Calculator pages
  for (const route of CALCULATOR_ROUTES) {
    urls.push(`${SITE_URL}${route.canonicalPath}`);
  }

  // Sales Tax Calculator main page
  urls.push(`${SITE_URL}/sales-tax-calculator`);

  // 50 state sales tax pages
  for (const stateKey of ALL_STATE_KEYS) {
    urls.push(`${SITE_URL}/sales-tax-calculator/${stateKey}`);
  }

  // Salary landing page
  urls.push(`${SITE_URL}/salary`);

  // Salary amount pages
  for (const amount of SALARY_AMOUNTS) {
    urls.push(`${SITE_URL}/salary/${amount}`);
  }

  // Static content pages
  urls.push(`${SITE_URL}/glossary`);
  urls.push(`${SITE_URL}/federal-tax-brackets`);
  urls.push(`${SITE_URL}/about`);
  urls.push(`${SITE_URL}/resources`);
  urls.push(`${SITE_URL}/widgets`);
  urls.push(`${SITE_URL}/tax-data`);
  urls.push(`${SITE_URL}/privacy`);
  urls.push(`${SITE_URL}/terms`);

  // Compare pages
  urls.push(`${SITE_URL}/compare`);
  for (const slug of COMPARISON_SLUGS) {
    urls.push(`${SITE_URL}/compare/${slug}`);
  }

  // Blog pages
  urls.push(`${SITE_URL}/blog`);
  const posts = getPublishedPostsMeta();
  for (const post of posts) {
    urls.push(`${SITE_URL}/blog/${post.slug}`);
  }

  return urls;
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
