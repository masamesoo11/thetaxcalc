import { MetadataRoute } from 'next';
import { CALCULATOR_ROUTES } from '@/lib/calculator-routes';
import { SALARY_AMOUNTS, salaryToSlug } from '@/lib/salary-calculations';
import { COMPARISON_SLUGS } from '@/lib/compare-config';
import { getPublishedPostsMeta } from '@/lib/blog-index';
import { SITE_URL } from '@/lib/site-config';
import { ALL_STATE_KEYS } from '@/lib/state-sales-tax-data';



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  // Updated dates — Google prefers consistent lastModified values
  const taxYearUpdate = '2026-01-01'; // Tax year 2026 data effective date
  const siteUpdate = '2026-06-14';    // Latest site content update

  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: siteUpdate, changeFrequency: 'weekly', priority: 1.0 },
  ];

  // Calculator pages
  for (const route of CALCULATOR_ROUTES) {
    const priority = route.category === 'paycheck' ? 0.95 : route.category === 'mortgage' ? 0.9 : 0.85;
    entries.push({ url: `${baseUrl}${route.canonicalPath}`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority });
  }

  // 50 state sales tax pages
  for (const stateKey of ALL_STATE_KEYS) {
    entries.push({ url: `${baseUrl}/sales-tax-calculator/${stateKey}`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.82 });
  }

  entries.push({ url: `${baseUrl}/salary`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.9 });

  // Salary pages — use new SEO-friendly URL pattern: /salary/85000-after-taxes
  for (const amount of SALARY_AMOUNTS) {
    entries.push({ url: `${baseUrl}/salary/${salaryToSlug(amount)}`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.8 });
  }

  entries.push({ url: `${baseUrl}/glossary`, lastModified: siteUpdate, changeFrequency: 'monthly', priority: 0.85 });
  entries.push({ url: `${baseUrl}/federal-tax-brackets`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.95 });
  entries.push({ url: `${baseUrl}/freefile-irs`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.95 });
  entries.push({ url: `${baseUrl}/home-sale-tax-calculator`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.95 });
  entries.push({ url: `${baseUrl}/about`, lastModified: siteUpdate, changeFrequency: 'monthly', priority: 0.7 });
  entries.push({ url: `${baseUrl}/tax-data`, lastModified: siteUpdate, changeFrequency: 'monthly', priority: 0.9 });
  entries.push({ url: `${baseUrl}/widgets`, lastModified: siteUpdate, changeFrequency: 'monthly', priority: 0.85 });
  entries.push({ url: `${baseUrl}/methodology`, lastModified: siteUpdate, changeFrequency: 'monthly', priority: 0.6 });
  entries.push({ url: `${baseUrl}/salary-comparison-calculator`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.92 });
  entries.push({ url: `${baseUrl}/job-offer-comparison-calculator`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.92 });
  entries.push({ url: `${baseUrl}/paycheck-difference-calculator`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.92 });

  for (const path of ['/privacy', '/terms']) {
    entries.push({ url: `${baseUrl}${path}`, lastModified: siteUpdate, changeFrequency: 'yearly', priority: 0.3 });
  }

  entries.push({ url: `${baseUrl}/compare`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.9 });

  for (const slug of COMPARISON_SLUGS) {
    entries.push({ url: `${baseUrl}/compare/${slug}`, lastModified: taxYearUpdate, changeFrequency: 'monthly', priority: 0.88 });
  }

  entries.push({ url: `${baseUrl}/blog`, lastModified: siteUpdate, changeFrequency: 'weekly', priority: 0.8 });

  // Blog posts from static index — use actual post dates
  const posts = getPublishedPostsMeta();
  for (const post of posts) {
    entries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.createdAt || siteUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
