import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

// Force static generation at build time for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Single catch-all rule for ALL bots including Googlebot, Bingbot, and AI crawlers.
        // Previously we had separate User-Agent groups for each AI bot (GPTBot, ClaudeBot, etc.)
        // but Googlebot ignores rules for other user-agents, causing "rule ignored" warnings
        // in Google Search Console. Since all bots get the same Allow: / anyway, a single
        // catch-all group is cleaner and warning-free.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
