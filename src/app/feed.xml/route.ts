import { CALCULATOR_ROUTES } from '@/lib/calculator-routes';
import { getPublishedPostsMeta } from '@/lib/blog-index';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site-config';

export const runtime = 'edge';

export async function GET() {
  const posts = getPublishedPostsMeta();

  const calculatorItems = CALCULATOR_ROUTES.map(
    (route) => `    <item>
      <title>${escapeXml(route.metaTitle)}</title>
      <link>${SITE_URL}${route.canonicalPath}</link>
      <description>${escapeXml(route.metaDesc)}</description>
      <guid isPermaLink="true">${SITE_URL}${route.canonicalPath}</guid>
      <category>Tax Calculator</category>
    </item>`
  ).join('\n');

  const blogItems = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt || post.title)}</description>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <category>Tax Guide</category>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Tax Calculators &amp; Guides</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <copyright>Copyright ${new Date().getFullYear()} TheTaxCalc.com</copyright>
    <managingEditor>contact@thetaxcalc.com (TheTaxCalc)</managingEditor>
    <webMaster>contact@thetaxcalc.com (TheTaxCalc)</webMaster>
${calculatorItems}
${blogItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
