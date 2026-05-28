export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * POST /api/seed
 * Seed the database with initial data.
 * Only creates records that don't already exist.
 */

// --- Seed data: Ad slots ---

const adSlots = [
  {
    name: 'Header Banner',
    position: 'header-banner',
    adType: 'adsense',
    adCode: '<!-- AdSense header banner -->',
    isActive: true,
  },
  {
    name: 'After Calculator',
    position: 'after-calculator',
    adType: 'adsense',
    adCode: '<!-- AdSense after calculator -->',
    isActive: true,
  },
  {
    name: 'Sidebar',
    position: 'sidebar',
    adType: 'adsense',
    adCode: '<!-- AdSense sidebar -->',
    isActive: true,
  },
  {
    name: 'Footer Banner',
    position: 'footer-banner',
    adType: 'adsense',
    adCode: '<!-- AdSense footer banner -->',
    isActive: false,
  },
];

// --- Seed data: Site settings ---

const siteSettings = [
  {
    key: 'site_name',
    value: 'TheTaxCalc',
  },
  {
    key: 'site_description',
    value: 'Free tax calculators and guides to help you understand your paycheck, state taxes, and financial planning. Accurate, up-to-date tax information for all 50 states.',
  },
  {
    key: 'ga_tracking_id',
    value: '',
  },
];

// --- Seed data: External links ---

const externalLinks = [
  {
    label: 'IRS Official Website',
    url: 'https://www.irs.gov',
    category: 'government',
    isActive: true,
    sortOrder: 1,
  },
  {
    label: 'Tax Foundation',
    url: 'https://taxfoundation.org',
    category: 'resource',
    isActive: true,
    sortOrder: 2,
  },
  {
    label: 'Illinois Department of Revenue',
    url: 'https://www2.illinois.gov/rev',
    category: 'state-revenue',
    isActive: true,
    sortOrder: 3,
  },
  {
    label: 'Texas Comptroller of Public Accounts',
    url: 'https://comptroller.texas.gov',
    category: 'state-revenue',
    isActive: true,
    sortOrder: 4,
  },
  {
    label: 'Florida Department of Revenue',
    url: 'https://floridarevenue.com',
    category: 'state-revenue',
    isActive: true,
    sortOrder: 5,
  },
  {
    label: 'California Franchise Tax Board',
    url: 'https://www.ftb.ca.gov',
    category: 'state-revenue',
    isActive: true,
    sortOrder: 6,
  },
];

export async function POST() {
  try {
    // Dynamic import to keep blog content out of the initial bundle
    const { blogPosts } = await import('@/data/seed-blog-posts');

    const results = {
      posts: { created: 0, updated: 0 },
      ads: { created: 0, skipped: 0 },
      settings: { created: 0, skipped: 0 },
      links: { created: 0, skipped: 0 },
    };

    // Seed blog posts (check by slug, update if exists)
    for (const postData of blogPosts) {
      const existing = await db.post.findUnique({ where: { slug: postData.slug } });
      if (existing) {
        await db.post.update({ where: { slug: postData.slug }, data: postData });
        results.posts.updated++;
      } else {
        await db.post.create({ data: postData });
        results.posts.created++;
      }
    }

    // Seed ad slots (check by position)
    for (const adData of adSlots) {
      const existing = await db.adSlot.findUnique({ where: { position: adData.position } });
      if (existing) {
        results.ads.skipped++;
      } else {
        await db.adSlot.create({ data: adData });
        results.ads.created++;
      }
    }

    // Seed site settings (check by key)
    for (const settingData of siteSettings) {
      const existing = await db.siteSetting.findUnique({ where: { key: settingData.key } });
      if (existing) {
        results.settings.skipped++;
      } else {
        await db.siteSetting.create({ data: settingData });
        results.settings.created++;
      }
    }

    // Seed external links (check by url)
    for (const linkData of externalLinks) {
      const existing = await db.externalLink.findFirst({ where: { url: linkData.url } });
      if (existing) {
        results.links.skipped++;
      } else {
        await db.externalLink.create({ data: linkData });
        results.links.created++;
      }
    }

    return NextResponse.json({
      message: 'Seed completed successfully',
      results,
    }, { status: 201 });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
