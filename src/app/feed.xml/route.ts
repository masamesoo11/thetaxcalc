import { CALCULATOR_ROUTES } from '@/lib/calculator-routes';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const baseUrl = 'https://taxyield.io';
  const now = new Date().toISOString();

  // Fetch blog posts
  let blogItems = '';
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      select: { slug: true, title: true, excerpt: true, createdAt: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    for (const post of posts) {
      const pubDate = (post.updatedAt || post.createdAt || new Date()).toISOString();
      const description = post.excerpt || `Read ${post.title} on TaxYield.io`;
      blogItems += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    }
  } catch {
    // Database not available — skip blog posts
  }

  // Calculator items
  let calcItems = '';
  for (const route of CALCULATOR_ROUTES) {
    calcItems += `
    <item>
      <title><![CDATA[${route.title}]]></title>
      <link>${baseUrl}${route.canonicalPath}</link>
      <guid isPermaLink="true">${baseUrl}${route.canonicalPath}</guid>
      <description><![CDATA[${route.metaDesc}]]></description>
      <pubDate>${now}</pubDate>
    </item>`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TaxYield.io — Free 2026 Tax Calculators</title>
    <link>${baseUrl}</link>
    <description>Free 2026 paycheck, mortgage, 401(k), capital gains, and self-employment tax calculators for IL, TX, FL, CA, NY.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <copyright>Copyright ${new Date().getFullYear()} TaxYield.io</copyright>
    <managingEditor>info@taxyield.io (TaxYield.io)</managingEditor>
    <webMaster>info@taxyield.io (TaxYield.io)</webMaster>${blogItems}${calcItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
