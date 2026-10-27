import { createClient } from '@libsql/client';

const TURSO_URL = 'libsql://thetaxcalc-deploy-masamesoo11.aws-us-east-1.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzk5NDE4OTMsImlkIjoiMDE5ZTZjY2QtNmEwMS03OGQ3LTk1NGYtMWQ2YjFhODc5NjdmIiwicmlkIjoiMGMyZDNmYjUtNzE4Mi00OTcwLTgzMjEtOTE2NmMxNjcwM2JkIn0.1hF4-3L8W8pt8W2_50Hb9n6Kn4jSYxnNAgeCxa1nWEQ2XWfrxUTRK92CPDXs3zIog4erbCyWl_036AUxH7jNDg';

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

const NOW = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');

async function seed() {
  console.log('Seeding Turso database...');

  // Create admin user
  const existingUser = await client.execute({ sql: 'SELECT id FROM User WHERE email = ?', args: ['admin@thetaxcalc.com'] });
  if (existingUser.rows.length === 0) {
    await client.execute({
      sql: 'INSERT INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      args: ['admin_001', 'admin@thetaxcalc.com', 'Admin', 'admin', NOW, NOW],
    });
    console.log('✅ Admin user created');
  } else {
    console.log('⏭️ Admin user already exists');
  }

  // Create blog posts
  const posts = [
    {
      id: 'post_001',
      title: '2026 Federal Tax Brackets Explained',
      slug: '2026-federal-tax-brackets-explained',
      excerpt: 'Complete guide to the 2026 federal income tax brackets, standard deductions, and how to calculate your effective tax rate.',
      category: 'tax-guide',
      tags: 'federal,tax brackets,2026,income tax',
      published: 1,
      featured: 1,
      metaTitle: '2026 Federal Tax Brackets Explained | TheTaxCalc',
      metaDesc: 'Understand the 2026 federal income tax brackets, marginal vs effective rates, and standard deductions.',
      content: 'The US has a progressive tax system. Your income gets taxed in layers - only the dollars above each threshold get the higher rate. For 2026, single filers: 10% up to $11,600, 12% from $11,601-$47,150, 22% from $47,151-$100,525, 24% from $100,526-$191,950, 32% from $191,951-$243,725, 35% from $243,726-$609,350, and 37% above $609,350. Standard deduction is $15,000 for single filers.',
    },
    {
      id: 'post_002',
      title: 'Illinois Income Tax Guide 2026',
      slug: 'illinois-income-tax-guide-2026',
      excerpt: 'Everything you need to know about Illinois income tax in 2026, including the flat tax rate and personal exemptions.',
      category: 'state-tax',
      tags: 'illinois,income tax,flat tax,2026,state tax',
      published: 1,
      featured: 1,
      metaTitle: 'Illinois Income Tax Guide 2026 | TheTaxCalc',
      metaDesc: 'Complete guide to Illinois income tax for 2026. Flat tax rate, personal exemptions, and property taxes.',
      content: 'Illinois has a flat income tax rate of 4.95% for 2026. Personal exemptions are $2,775 for single filers and $5,550 for married filing jointly. Property taxes are the second-highest in the country at around 2.08% average effective rate. Sales tax is 6.25% state plus local add-ons. The one big win: Illinois does not tax retirement income at all.',
    },
    {
      id: 'post_003',
      title: 'Why Texas Has No Income Tax',
      slug: 'why-texas-has-no-income-tax',
      excerpt: 'How Texas funds its government without a personal income tax, and what it means for residents.',
      category: 'state-tax',
      tags: 'texas,no income tax,property tax,state tax,2026',
      published: 1,
      featured: 0,
      metaTitle: 'Why Texas Has No Income Tax | TheTaxCalc',
      metaDesc: 'Discover how Texas operates without a personal income tax and the trade-offs in higher property taxes.',
      content: 'Texas has no personal income tax because the state Constitution forbids it. Revenue comes from sales tax (6.25% state rate), property taxes (1.60% average effective rate, 6th highest nationally), franchise tax on businesses, and severance taxes on oil and gas. The trade-off: no income tax but high property taxes. Great for high earners and retirees, harder on homeowners with modest incomes.',
    },
    {
      id: 'post_004',
      title: 'Florida vs Texas Tax Comparison',
      slug: 'florida-vs-texas-tax-comparison',
      excerpt: 'A detailed comparison of the tax structures in Florida and Texas — two popular no-income-tax states.',
      category: 'comparison',
      tags: 'florida,texas,tax comparison,no income tax,relocation',
      published: 1,
      featured: 1,
      metaTitle: 'Florida vs Texas Tax Comparison 2026 | TheTaxCalc',
      metaDesc: 'Compare Florida and Texas tax structures: income tax, property tax, sales tax, and overall tax burden.',
      content: 'Both Florida and Texas have no personal income tax. Florida has lower property taxes (0.86% vs 1.60%) with a homestead exemption and Save Our Homes cap. Texas has slightly lower sales tax. But Florida homeowners insurance is much higher ($3,000-$6,000+ more per year). For a $100k earner: Florida total state/local tax ~$5,300, Texas ~$8,400. Florida better for homebuyers, Texas better for renters.',
    },
    {
      id: 'post_005',
      title: 'How FICA Taxes Work in 2026',
      slug: 'how-fica-taxes-work-2026',
      excerpt: 'Understanding FICA taxes (Social Security and Medicare) in 2026 — what you pay and what your employer pays.',
      category: 'tax-guide',
      tags: 'FICA,social security,medicare,payroll tax,2026',
      published: 1,
      featured: 0,
      metaTitle: 'How FICA Taxes Work in 2026 | TheTaxCalc',
      metaDesc: 'Complete guide to FICA taxes in 2026. Social Security and Medicare withholding, wage bases, and self-employment tax.',
      content: 'FICA funds Social Security (6.2% up to $184,500 wage base) and Medicare (1.45% with no cap). Total employee rate is 7.65%. Above $200,000, additional 0.9% Medicare tax applies. Self-employed pay both halves = 15.3%. You can deduct half of self-employment tax. FICA is mandatory and separate from income tax.',
    },
  ];

  for (const post of posts) {
    const existing = await client.execute({ sql: 'SELECT id FROM Post WHERE slug = ?', args: [post.slug] });
    if (existing.rows.length === 0) {
      await client.execute({
        sql: `INSERT INTO Post (id, title, slug, excerpt, content, category, tags, published, featured, metaTitle, metaDesc, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [post.id, post.title, post.slug, post.excerpt, post.content, post.category, post.tags, post.published, post.featured, post.metaTitle, post.metaDesc, NOW, NOW],
      });
      console.log(`✅ Post created: ${post.title}`);
    } else {
      console.log(`⏭️ Post already exists: ${post.title}`);
    }
  }

  // Create ad slots
  const adSlots = [
    { id: 'ad_001', name: 'Header Banner', position: 'header-banner', adType: 'adsense', adCode: '<!-- AdSense header banner -->', isActive: 1 },
    { id: 'ad_002', name: 'After Calculator', position: 'after-calculator', adType: 'adsense', adCode: '<!-- AdSense after calculator -->', isActive: 1 },
    { id: 'ad_003', name: 'Sidebar', position: 'sidebar', adType: 'adsense', adCode: '<!-- AdSense sidebar -->', isActive: 1 },
    { id: 'ad_004', name: 'Footer Banner', position: 'footer-banner', adType: 'adsense', adCode: '<!-- AdSense footer banner -->', isActive: 0 },
  ];

  for (const ad of adSlots) {
    const existing = await client.execute({ sql: 'SELECT id FROM AdSlot WHERE position = ?', args: [ad.position] });
    if (existing.rows.length === 0) {
      await client.execute({
        sql: `INSERT INTO AdSlot (id, name, position, adType, adCode, isActive, impressions, clicks, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, ?)`,
        args: [ad.id, ad.name, ad.position, ad.adType, ad.adCode, ad.isActive, NOW, NOW],
      });
      console.log(`✅ Ad slot created: ${ad.name}`);
    } else {
      console.log(`⏭️ Ad slot already exists: ${ad.name}`);
    }
  }

  // Create site settings
  const settings = [
    { id: 'setting_001', key: 'site_name', value: 'TheTaxCalc' },
    { id: 'setting_002', key: 'site_description', value: 'Free 2026 tax calculators and guides to help you understand your paycheck, state taxes, and financial planning.' },
    { id: 'setting_003', key: 'ga_tracking_id', value: '' },
  ];

  for (const setting of settings) {
    const existing = await client.execute({ sql: 'SELECT id FROM SiteSetting WHERE key = ?', args: [setting.key] });
    if (existing.rows.length === 0) {
      await client.execute({
        sql: `INSERT INTO SiteSetting (id, key, value) VALUES (?, ?, ?)`,
        args: [setting.id, setting.key, setting.value],
      });
      console.log(`✅ Setting created: ${setting.key}`);
    } else {
      console.log(`⏭️ Setting already exists: ${setting.key}`);
    }
  }

  // Create external links
  const links = [
    { id: 'link_001', label: 'IRS Official Website', url: 'https://www.irs.gov', category: 'government', isActive: 1, sortOrder: 1 },
    { id: 'link_002', label: 'Tax Foundation', url: 'https://taxfoundation.org', category: 'resource', isActive: 1, sortOrder: 2 },
    { id: 'link_003', label: 'Illinois Department of Revenue', url: 'https://www2.illinois.gov/rev', category: 'state-revenue', isActive: 1, sortOrder: 3 },
    { id: 'link_004', label: 'Texas Comptroller of Public Accounts', url: 'https://comptroller.texas.gov', category: 'state-revenue', isActive: 1, sortOrder: 4 },
    { id: 'link_005', label: 'Florida Department of Revenue', url: 'https://floridarevenue.com', category: 'state-revenue', isActive: 1, sortOrder: 5 },
    { id: 'link_006', label: 'California Franchise Tax Board', url: 'https://www.ftb.ca.gov', category: 'state-revenue', isActive: 1, sortOrder: 6 },
  ];

  for (const link of links) {
    const existing = await client.execute({ sql: 'SELECT id FROM ExternalLink WHERE url = ?', args: [link.url] });
    if (existing.rows.length === 0) {
      await client.execute({
        sql: `INSERT INTO ExternalLink (id, label, url, category, isActive, sortOrder, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [link.id, link.label, link.url, link.category, link.isActive, link.sortOrder, NOW, NOW],
      });
      console.log(`✅ Link created: ${link.label}`);
    } else {
      console.log(`⏭️ Link already exists: ${link.label}`);
    }
  }

  console.log('\n🎉 Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
