import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

// Force static generation at build time for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // Single catch-all rule for ALL bots including Googlebot and Bingbot
      // NOTE: Do NOT add separate groups for individual bots (GPTBot, etc.)
      // Per Google's robots.txt spec, if a bot has its own specific group,
      // it ignores the wildcard (*) group entirely, which causes
      // "Warning — rule ignored by Googlebot" in Search Console.
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
