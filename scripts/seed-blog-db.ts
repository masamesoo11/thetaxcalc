/**
 * Seed Script — Populate Turso database with existing blog articles from JSON files.
 *
 * Usage:
 *   bun run seed:blog          # Seed from JSON files
 *   TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... bun run seed:blog
 */

import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

interface JsonBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  published: boolean;
  featured: boolean;
  metaTitle: string;
  metaDesc: string;
  createdAt: string;
  updatedAt: string;
}

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error('❌ TURSO_DATABASE_URL is not set. Please set it in .env or pass as environment variable.');
    console.error('');
    console.error('To set up Turso:');
    console.error('  1. Install: curl -sSfL https://get.tur.so/install.sh | bash');
    console.error('  2. Sign up: turso auth signup');
    console.error('  3. Create DB: turso db create thetaxcalc-blog');
    console.error('  4. Get URL: turso db show thetaxcalc-blog --url');
    console.error('  5. Get token: turso db tokens create thetaxcalc-blog');
    console.error('');
    console.error('Then add to .env:');
    console.error('  TURSO_DATABASE_URL=libsql://thetaxcalc-blog-<org>.turso.io');
    console.error('  TURSO_AUTH_TOKEN=<your-token>');
    process.exit(1);
  }

  console.log('📦 Connecting to Turso database...');
  console.log(`   URL: ${url}`);

  const db = createClient({
    url,
    authToken: authToken || undefined,
  });

  // Create table
  console.log('📋 Creating blog_posts table...');
  await db.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      category TEXT DEFAULT 'tax-guide',
      tags TEXT DEFAULT '',
      cover_image TEXT DEFAULT '',
      published INTEGER DEFAULT 0,
      featured INTEGER DEFAULT 0,
      meta_title TEXT DEFAULT '',
      meta_desc TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category)`);

  console.log('✅ Table created successfully');

  // Read JSON files
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`❌ Blog directory not found: ${BLOG_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json'));
  console.log(`\n📄 Found ${files.length} blog articles to seed:`);

  let seeded = 0;
  let skipped = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const post: JsonBlogPost = JSON.parse(raw);

    console.log(`   - ${post.slug} (${post.published ? 'published' : 'draft'})`);

    try {
      await db.execute({
        sql: `INSERT INTO blog_posts (id, title, slug, excerpt, content, category, tags, cover_image, published, featured, meta_title, meta_desc, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(slug) DO UPDATE SET
                title = excluded.title,
                excerpt = excluded.excerpt,
                content = excluded.content,
                category = excluded.category,
                tags = excluded.tags,
                cover_image = excluded.cover_image,
                published = excluded.published,
                featured = excluded.featured,
                meta_title = excluded.meta_title,
                meta_desc = excluded.meta_desc,
                updated_at = excluded.updated_at`,
        args: [
          post.id,
          post.title,
          post.slug,
          post.excerpt || '',
          post.content || '',
          post.category || 'tax-guide',
          post.tags || '',
          post.coverImage || '',
          post.published ? 1 : 0,
          post.featured ? 1 : 0,
          post.metaTitle || '',
          post.metaDesc || '',
          post.createdAt || new Date().toISOString(),
          post.updatedAt || new Date().toISOString(),
        ],
      });
      seeded++;
    } catch (error) {
      console.error(`   ❌ Failed to seed ${post.slug}:`, error);
      skipped++;
    }
  }

  // Verify
  const countResult = await db.execute('SELECT COUNT(*) as count FROM blog_posts');
  const publishedResult = await db.execute('SELECT COUNT(*) as count FROM blog_posts WHERE published = 1');
  const totalCount = (countResult.rows[0] as Record<string, unknown>)?.count as number;
  const publishedCount = (publishedResult.rows[0] as Record<string, unknown>)?.count as number;

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Seeded: ${seeded}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total posts in DB: ${totalCount}`);
  console.log(`   Published: ${publishedCount}`);
  console.log(`   Drafts: ${totalCount - publishedCount}`);

  // List all slugs
  const slugsResult = await db.execute('SELECT slug, title, published FROM blog_posts ORDER BY created_at DESC');
  console.log('\n📚 Blog posts in database:');
  for (const row of slugsResult.rows) {
    const r = row as Record<string, unknown>;
    console.log(`   ${r.published ? '🟢' : '🔴'} ${r.slug} — ${r.title}`);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
