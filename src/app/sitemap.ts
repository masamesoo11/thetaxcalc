import { MetadataRoute } from 'next';
import { CALCULATOR_ROUTES } from '@/lib/calculator-routes';
import { SALARY_AMOUNTS } from '@/lib/salary-calculations';
import { COMPARISON_SLUGS } from '@/lib/compare-config';
import { getPublishedPostsMeta } from '@/lib/blog-index';
import { SITE_URL } from '@/lib/site-config';



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
  ];

  for (const route of CALCULATOR_ROUTES) {
    const priority = route.category === 'paycheck' ? 0.95 : route.category === 'mortgage' ? 0.9 : 0.85;
    entries.push({ url: `${baseUrl}${route.canonicalPath}`, lastModified: now, changeFrequency: 'monthly', priority });
  }

  entries.push({ url: `${baseUrl}/salary`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 });

  for (const amount of SALARY_AMOUNTS) {
    entries.push({ url: `${baseUrl}/salary/${amount}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 });
  }

  entries.push({ url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 });
  entries.push({ url: `${baseUrl}/federal-tax-brackets`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 });

  for (const path of ['/privacy', '/terms', '/about']) {
    entries.push({ url: `${baseUrl}${path}`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 });
  }

  entries.push({ url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 });

  for (const slug of COMPARISON_SLUGS) {
    entries.push({ url: `${baseUrl}/compare/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.88 });
  }

  entries.push({ url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 });

  // Blog posts from static index
  const posts = getPublishedPostsMeta();
  for (const post of posts) {
    entries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.createdAt || now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
