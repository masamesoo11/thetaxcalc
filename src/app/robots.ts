import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

// Force static generation at build time for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // AI crawlers — allow full access (generates backlinks/mentions)
        // No disallow needed — these bots don't need /api/ or /admin/
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'YouBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      {
        // Social media crawlers — need full access for link previews
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        // Catch-all for ALL bots including Googlebot and Bingbot
        // NOTE: Do NOT add separate Googlebot/Bingbot groups with the same rules.
        // Per Google's robots.txt spec, if a bot has its own specific group,
        // it ignores the wildcard (*) group entirely, which causes a
        // "Warning — rule ignored by Googlebot" in Search Console.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
