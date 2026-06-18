import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Googlebot — standard web crawling
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // Bingbot — standard web crawling
        userAgent: 'Bingbot',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // Google-Extended — Google's AI training crawler (Gemini)
        // Explicitly allow for AI training and AI search
        userAgent: 'Google-Extended',
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // ChatGPT-User — ChatGPT browsing and search
        userAgent: 'ChatGPT-User',
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // OAI-SearchBot — OpenAI Search (ChatGPT search results)
        userAgent: 'OAI-SearchBot',
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // GPTBot — OpenAI's AI training crawler
        userAgent: 'GPTBot',
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // PerplexityBot — Perplexity AI search
        userAgent: 'PerplexityBot',
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // Claude-Web — Anthropic's Claude web crawler
        userAgent: 'Claude-Web',
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // anthropic-ai — Anthropic's AI training crawler
        userAgent: 'anthropic-ai',
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // CCBot — Common Crawl (used by many AI training projects)
        userAgent: 'CCBot',
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        // Default — all other bots
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
