/**
 * Database Client — IN-MEMORY MODE (no @libsql/client)
 *
 * Replaces the previous @libsql/client and Prisma implementations with
 * lightweight in-memory Maps. This eliminates the 1.3 MB WASM SQLite
 * engine from the Cloudflare Pages Worker bundle.
 *
 * WHY: @libsql/client bundles a WASM SQLite engine that pushes the
 * Cloudflare Pages Worker bundle over the 3 MiB limit. For a public-facing
 * tax calculator site, persistent database storage for admin features
 * (ads, settings, links, tracking) is not critical — in-memory is fine.
 *
 * The `db` export is a Proxy so that existing API routes need ZERO changes:
 *   db.adSlot.findMany({ where, orderBy })
 *   db.siteSetting.upsert({ where, update, create })
 *   db.calculatorUsage.upsert({ where: { calculator_date: … }, … })
 *   …etc.
 *
 * Data resets on each deployment/cold start, which is acceptable for
 * admin/management features on a tax calculator site.
 */

// ─── In-Memory Store Types ────────────────────────────────────────────────────

interface AdSlotRecord {
  id: string;
  name: string;
  position: string;
  adType: string;
  adCode: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

interface SiteSettingRecord {
  id: string;
  key: string;
  value: string;
}

interface CalculatorUsageRecord {
  id: string;
  calculator: string;
  count: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface ExternalLinkRecord {
  id: string;
  label: string;
  url: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface PostRecord {
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
  authorId: string | null;
  metaTitle: string;
  metaDesc: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const now = new Date().toISOString();

function uuid(): string {
  return crypto.randomUUID();
}

// ─── In-Memory Stores ─────────────────────────────────────────────────────────

const adSlotStore = new Map<string, AdSlotRecord>();
const siteSettingStore = new Map<string, SiteSettingRecord>();
const calculatorUsageStore = new Map<string, CalculatorUsageRecord>();
const externalLinkStore = new Map<string, ExternalLinkRecord>();
const userStore = new Map<string, UserRecord>();
const postStore = new Map<string, PostRecord>();

// Indexes for unique lookups
const adSlotByPosition = new Map<string, string>(); // position → id
const siteSettingByKey = new Map<string, string>(); // key → id
const calculatorUsageByCompound = new Map<string, string>(); // "calculator|date" → id

// Seed default ad slots
const defaultAdSlots: AdSlotRecord[] = [
  { id: uuid(), name: 'Header Banner', position: 'header-banner', adType: 'adsense', adCode: '<!-- AdSense header banner -->', isActive: true, impressions: 0, clicks: 0, createdAt: now, updatedAt: now },
  { id: uuid(), name: 'After Calculator', position: 'after-calculator', adType: 'adsense', adCode: '<!-- AdSense after calculator -->', isActive: true, impressions: 0, clicks: 0, createdAt: now, updatedAt: now },
  { id: uuid(), name: 'Sidebar', position: 'sidebar', adType: 'adsense', adCode: '<!-- AdSense sidebar -->', isActive: true, impressions: 0, clicks: 0, createdAt: now, updatedAt: now },
  { id: uuid(), name: 'Footer Banner', position: 'footer-banner', adType: 'adsense', adCode: '<!-- AdSense footer banner -->', isActive: false, impressions: 0, clicks: 0, createdAt: now, updatedAt: now },
];

for (const ad of defaultAdSlots) {
  adSlotStore.set(ad.id, ad);
  adSlotByPosition.set(ad.position, ad.id);
}

// Seed default settings
const defaultSettings: SiteSettingRecord[] = [
  { id: uuid(), key: 'site_name', value: 'TheTaxCalc' },
  { id: uuid(), key: 'site_description', value: 'Free tax calculators and guides to help you understand your paycheck, state taxes, and financial planning.' },
  { id: uuid(), key: 'ga_tracking_id', value: '' },
  { id: uuid(), key: 'adsense_client_id', value: '' },
];

for (const setting of defaultSettings) {
  siteSettingStore.set(setting.id, setting);
  siteSettingByKey.set(setting.key, setting.id);
}

// Seed default external links
const defaultLinks: ExternalLinkRecord[] = [
  { id: uuid(), label: 'IRS Official Website', url: 'https://www.irs.gov', category: 'government', isActive: true, sortOrder: 1, createdAt: now, updatedAt: now },
  { id: uuid(), label: 'Tax Foundation', url: 'https://taxfoundation.org', category: 'resource', isActive: true, sortOrder: 2, createdAt: now, updatedAt: now },
  { id: uuid(), label: 'Illinois Department of Revenue', url: 'https://www2.illinois.gov/rev', category: 'state-revenue', isActive: true, sortOrder: 3, createdAt: now, updatedAt: now },
  { id: uuid(), label: 'Texas Comptroller of Public Accounts', url: 'https://comptroller.texas.gov', category: 'state-revenue', isActive: true, sortOrder: 4, createdAt: now, updatedAt: now },
  { id: uuid(), label: 'Florida Department of Revenue', url: 'https://floridarevenue.com', category: 'state-revenue', isActive: true, sortOrder: 5, createdAt: now, updatedAt: now },
  { id: uuid(), label: 'California Franchise Tax Board', url: 'https://www.ftb.ca.gov', category: 'state-revenue', isActive: true, sortOrder: 6, createdAt: now, updatedAt: now },
];

for (const link of defaultLinks) {
  externalLinkStore.set(link.id, link);
}

// ─── Generic In-Memory Model Operations ───────────────────────────────────────

interface ModelStore {
  name: string;
  store: Map<string, Record<string, unknown>>;
  uniqueIndexes: Map<string, Map<string, string>>; // indexName → (indexValue → recordId)
}

function matchWhere(record: Record<string, unknown>, where: Record<string, unknown>): boolean {
  for (const [key, value] of Object.entries(where)) {
    if (value === undefined) continue;
    // Handle compound unique where (e.g., calculator_date)
    if (typeof value === 'object' && value !== null) {
      // For compound uniques, skip — handled separately
      continue;
    }
    if (record[key] !== value) return false;
  }
  return true;
}

function sortRecords(records: Record<string, unknown>[], orderBy: Record<string, string> | Array<Record<string, string>> | undefined): Record<string, unknown>[] {
  if (!orderBy) return records;

  const sortCriteria = Array.isArray(orderBy) ? orderBy : [orderBy];

  return [...records].sort((a, b) => {
    for (const criterion of sortCriteria) {
      for (const [key, dir] of Object.entries(criterion)) {
        const aVal = a[key];
        const bVal = b[key];
        let cmp = 0;
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          cmp = aVal.localeCompare(bVal);
        } else if (typeof aVal === 'number' && typeof bVal === 'number') {
          cmp = aVal - bVal;
        } else if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
          cmp = Number(aVal) - Number(bVal);
        }
        if (cmp !== 0) return dir === 'desc' ? -cmp : cmp;
      }
    }
    return 0;
  });
}

// ─── Model-Specific Operations ────────────────────────────────────────────────

// --- AdSlot ---

function adSlotFindMany(opts: { where?: Record<string, unknown>; orderBy?: Record<string, string> | Array<Record<string, string>> } = {}): AdSlotRecord[] {
  let results = Array.from(adSlotStore.values());
  if (opts.where) {
    results = results.filter(r => matchWhere(r as unknown as Record<string, unknown>, opts.where!));
  }
  if (opts.orderBy) {
    results = sortRecords(results as unknown as Record<string, unknown>[], opts.orderBy) as unknown as AdSlotRecord[];
  }
  return results;
}

function adSlotFindUnique(opts: { where: Record<string, unknown> }): AdSlotRecord | null {
  const where = opts.where;
  // Check by id
  if (where.id && typeof where.id === 'string') {
    return adSlotStore.get(where.id) || null;
  }
  // Check by position
  if (where.position && typeof where.position === 'string') {
    const id = adSlotByPosition.get(where.position);
    if (!id) return null;
    return adSlotStore.get(id) || null;
  }
  // Fallback: linear scan
  const results = adSlotFindMany({ where });
  return results[0] || null;
}

function adSlotCreate(data: Record<string, unknown>): AdSlotRecord {
  const id = (data.id as string) || uuid();
  const record: AdSlotRecord = {
    id,
    name: data.name as string,
    position: data.position as string,
    adType: (data.adType as string) || 'adsense',
    adCode: (data.adCode as string) || '',
    isActive: data.isActive as boolean ?? false,
    impressions: (data.impressions as number) || 0,
    clicks: (data.clicks as number) || 0,
    createdAt: (data.createdAt as string) || new Date().toISOString(),
    updatedAt: (data.updatedAt as string) || new Date().toISOString(),
  };

  // Check unique position
  if (adSlotByPosition.has(record.position)) {
    throw new Error(`Unique constraint failed: position "${record.position}" already exists`);
  }

  adSlotStore.set(id, record);
  adSlotByPosition.set(record.position, id);
  return record;
}

function adSlotUpdate(opts: { where: Record<string, unknown>; data: Record<string, unknown> }): AdSlotRecord {
  const existing = adSlotFindUnique({ where: opts.where });
  if (!existing) throw new Error('Record not found in ad_slots');

  // Handle position change
  if (opts.data.position && opts.data.position !== existing.position) {
    if (adSlotByPosition.has(opts.data.position as string)) {
      throw new Error(`Unique constraint failed: position "${opts.data.position}" already exists`);
    }
    adSlotByPosition.delete(existing.position);
    adSlotByPosition.set(opts.data.position as string, existing.id);
  }

  // Handle increment fields
  const updated: AdSlotRecord = { ...existing, updatedAt: new Date().toISOString() };
  for (const [key, value] of Object.entries(opts.data)) {
    if (value && typeof value === 'object' && 'increment' in (value as Record<string, unknown>)) {
      const inc = (value as { increment: number }).increment;
      (updated as Record<string, unknown>)[key] = ((existing as Record<string, unknown>)[key] as number || 0) + inc;
    } else if (key in updated) {
      (updated as Record<string, unknown>)[key] = value;
    }
  }

  adSlotStore.set(existing.id, updated);
  return updated;
}

function adSlotDelete(opts: { where: Record<string, unknown> }): AdSlotRecord {
  const existing = adSlotFindUnique({ where: opts.where });
  if (!existing) throw new Error('Record not found in ad_slots');
  adSlotStore.delete(existing.id);
  adSlotByPosition.delete(existing.position);
  return existing;
}

// --- SiteSetting ---

function siteSettingFindMany(): SiteSettingRecord[] {
  return Array.from(siteSettingStore.values());
}

function siteSettingFindUnique(opts: { where: Record<string, unknown> }): SiteSettingRecord | null {
  const where = opts.where;
  if (where.id && typeof where.id === 'string') {
    return siteSettingStore.get(where.id) || null;
  }
  if (where.key && typeof where.key === 'string') {
    const id = siteSettingByKey.get(where.key);
    if (!id) return null;
    return siteSettingStore.get(id) || null;
  }
  return null;
}

function siteSettingUpsert(opts: { where: Record<string, unknown>; update: Record<string, unknown>; create: Record<string, unknown> }): SiteSettingRecord {
  const existing = siteSettingFindUnique({ where: opts.where });
  if (existing) {
    existing.value = (opts.update.value as string) ?? existing.value;
    existing.id = existing.id; // keep id
    siteSettingStore.set(existing.id, existing);
    return existing;
  }

  // Create new
  const id = uuid();
  const key = (opts.create.key as string) || (opts.where.key as string) || '';
  const value = (opts.create.value as string) ?? '';
  const record: SiteSettingRecord = { id, key, value };
  siteSettingStore.set(id, record);
  siteSettingByKey.set(key, id);
  return record;
}

// --- CalculatorUsage ---

function calculatorUsageCompoundKey(calculator: string, date: string): string {
  return `${calculator}|${date}`;
}

function calculatorUsageUpsert(opts: { where: Record<string, unknown>; update: Record<string, unknown>; create: Record<string, unknown> }): CalculatorUsageRecord {
  let calculator: string;
  let date: string;

  const whereVal = opts.where;
  if (whereVal.calculator_date && typeof whereVal.calculator_date === 'object') {
    const cd = whereVal.calculator_date as { calculator: string; date: string };
    calculator = cd.calculator;
    date = cd.date;
  } else {
    calculator = (whereVal.calculator as string) || (opts.create.calculator as string);
    date = (whereVal.date as string) || (opts.create.date as string);
  }

  const compoundKey = calculatorUsageCompoundKey(calculator, date);
  const existingId = calculatorUsageByCompound.get(compoundKey);

  if (existingId) {
    const existing = calculatorUsageStore.get(existingId)!;
    // Handle increment
    if (opts.update.count && typeof opts.update.count === 'object' && 'increment' in (opts.update.count as Record<string, unknown>)) {
      const inc = (opts.update.count as { increment: number }).increment;
      existing.count += inc;
    }
    existing.updatedAt = new Date().toISOString();
    calculatorUsageStore.set(existingId, existing);
    return existing;
  }

  // Create new
  const id = uuid();
  const record: CalculatorUsageRecord = {
    id,
    calculator,
    count: (opts.create.count as number) || 1,
    date,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  calculatorUsageStore.set(id, record);
  calculatorUsageByCompound.set(compoundKey, id);
  return record;
}

// --- ExternalLink ---

function externalLinkFindMany(opts: { where?: Record<string, unknown>; orderBy?: Record<string, string> | Array<Record<string, string>> } = {}): ExternalLinkRecord[] {
  let results = Array.from(externalLinkStore.values());
  if (opts.where) {
    results = results.filter(r => matchWhere(r as unknown as Record<string, unknown>, opts.where!));
  }
  if (opts.orderBy) {
    results = sortRecords(results as unknown as Record<string, unknown>[], opts.orderBy) as unknown as ExternalLinkRecord[];
  }
  return results;
}

function externalLinkFindUnique(opts: { where: Record<string, unknown> }): ExternalLinkRecord | null {
  const where = opts.where;
  if (where.id && typeof where.id === 'string') {
    return externalLinkStore.get(where.id) || null;
  }
  // Fallback: linear scan
  const results = externalLinkFindMany({ where });
  return results[0] || null;
}

function externalLinkFindFirst(opts: { where?: Record<string, unknown>; orderBy?: Record<string, string> | Array<Record<string, string>> } = {}): ExternalLinkRecord | null {
  const results = externalLinkFindMany({ where: opts.where, orderBy: opts.orderBy });
  return results[0] || null;
}

function externalLinkCreate(data: Record<string, unknown>): ExternalLinkRecord {
  const id = (data.id as string) || uuid();
  const record: ExternalLinkRecord = {
    id,
    label: data.label as string,
    url: data.url as string,
    category: (data.category as string) || 'resource',
    isActive: data.isActive as boolean ?? true,
    sortOrder: (data.sortOrder as number) ?? 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  externalLinkStore.set(id, record);
  return record;
}

function externalLinkUpdate(opts: { where: Record<string, unknown>; data: Record<string, unknown> }): ExternalLinkRecord {
  const existing = externalLinkFindUnique({ where: opts.where });
  if (!existing) throw new Error('Record not found in external_links');

  const updated: ExternalLinkRecord = { ...existing, updatedAt: new Date().toISOString() };
  for (const [key, value] of Object.entries(opts.data)) {
    if (key in updated) {
      (updated as Record<string, unknown>)[key] = value;
    }
  }

  externalLinkStore.set(existing.id, updated);
  return updated;
}

function externalLinkDelete(opts: { where: Record<string, unknown> }): ExternalLinkRecord {
  const existing = externalLinkFindUnique({ where: opts.where });
  if (!existing) throw new Error('Record not found in external_links');
  externalLinkStore.delete(existing.id);
  return existing;
}

// --- User (stub) ---

function userFindMany(_opts?: Record<string, unknown>): UserRecord[] {
  return Array.from(userStore.values());
}

function userFindUnique(opts: { where: Record<string, unknown> }): UserRecord | null {
  if (opts.where.id && typeof opts.where.id === 'string') {
    return userStore.get(opts.where.id) || null;
  }
  return null;
}

// --- Post (delegated to blog-db.ts, but we provide stubs for db.post) ---

function postFindMany(opts: { where?: Record<string, unknown>; select?: Record<string, boolean>; orderBy?: Record<string, string> | Array<Record<string, string>>; take?: number } = {}): PostRecord[] {
  let results = Array.from(postStore.values());
  if (opts.where) {
    results = results.filter(r => matchWhere(r as unknown as Record<string, unknown>, opts.where!));
  }
  if (opts.orderBy) {
    results = sortRecords(results as unknown as Record<string, unknown>[], opts.orderBy) as unknown as PostRecord[];
  }
  if (opts.take) {
    results = results.slice(0, opts.take);
  }
  return results;
}

function postFindUnique(opts: { where: Record<string, unknown> }): PostRecord | null {
  const where = opts.where;
  if (where.id && typeof where.id === 'string') {
    return postStore.get(where.id) || null;
  }
  // Fallback: scan by slug
  if (where.slug) {
    for (const record of postStore.values()) {
      if (record.slug === where.slug) return record;
    }
  }
  return null;
}

function postCreate(data: Record<string, unknown>): PostRecord {
  const id = (data.id as string) || uuid();
  const record: PostRecord = {
    id,
    title: data.title as string,
    slug: data.slug as string,
    excerpt: (data.excerpt as string) || '',
    content: (data.content as string) || '',
    category: (data.category as string) || 'tax-guide',
    tags: (data.tags as string) || '',
    coverImage: (data.coverImage as string) || '',
    published: (data.published as boolean) ?? false,
    featured: (data.featured as boolean) ?? false,
    authorId: (data.authorId as string) || null,
    metaTitle: (data.metaTitle as string) || '',
    metaDesc: (data.metaDesc as string) || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  postStore.set(id, record);
  return record;
}

function postUpdate(opts: { where: Record<string, unknown>; data: Record<string, unknown> }): PostRecord {
  const existing = postFindUnique({ where: opts.where });
  if (!existing) throw new Error('Record not found in posts');

  const updated: PostRecord = { ...existing, updatedAt: new Date().toISOString() };
  for (const [key, value] of Object.entries(opts.data)) {
    if (key in updated) {
      (updated as Record<string, unknown>)[key] = value;
    }
  }

  postStore.set(existing.id, updated);
  return updated;
}

// ─── Proxy-based db Object ────────────────────────────────────────────────────

type PrismaMethod = (...args: unknown[]) => Promise<unknown>;

interface PrismaLikeModel {
  findMany: PrismaMethod;
  findUnique: PrismaMethod;
  findFirst: PrismaMethod;
  create: PrismaMethod;
  update: PrismaMethod;
  delete: PrismaMethod;
  upsert: PrismaMethod;
}

interface PrismaLikeDB {
  user: PrismaLikeModel;
  post: PrismaLikeModel;
  adSlot: PrismaLikeModel;
  siteSetting: PrismaLikeModel;
  calculatorUsage: PrismaLikeModel;
  externalLink: PrismaLikeModel;
}

function handleCall(modelName: string, method: string, ...args: unknown[]): Promise<unknown> {
  const opts = (args[0] as Record<string, unknown>) || {};

  switch (`${modelName}.${method}`) {
    // --- AdSlot ---
    case 'adSlot.findMany':
      return Promise.resolve(adSlotFindMany(opts as Parameters<typeof adSlotFindMany>[0]));
    case 'adSlot.findUnique':
      return Promise.resolve(adSlotFindUnique(opts as { where: Record<string, unknown> }));
    case 'adSlot.create':
      return Promise.resolve(adSlotCreate((opts as { data: Record<string, unknown> }).data));
    case 'adSlot.update':
      return Promise.resolve(adSlotUpdate(opts as { where: Record<string, unknown>; data: Record<string, unknown> }));
    case 'adSlot.delete':
      return Promise.resolve(adSlotDelete(opts as { where: Record<string, unknown> }));

    // --- SiteSetting ---
    case 'siteSetting.findMany':
      return Promise.resolve(siteSettingFindMany());
    case 'siteSetting.findUnique':
      return Promise.resolve(siteSettingFindUnique(opts as { where: Record<string, unknown> }));
    case 'siteSetting.upsert':
      return Promise.resolve(siteSettingUpsert(opts as { where: Record<string, unknown>; update: Record<string, unknown>; create: Record<string, unknown> }));

    // --- CalculatorUsage ---
    case 'calculatorUsage.upsert':
      return Promise.resolve(calculatorUsageUpsert(opts as { where: Record<string, unknown>; update: Record<string, unknown>; create: Record<string, unknown> }));

    // --- ExternalLink ---
    case 'externalLink.findMany':
      return Promise.resolve(externalLinkFindMany(opts as Parameters<typeof externalLinkFindMany>[0]));
    case 'externalLink.findUnique':
      return Promise.resolve(externalLinkFindUnique(opts as { where: Record<string, unknown> }));
    case 'externalLink.findFirst':
      return Promise.resolve(externalLinkFindFirst(opts as Parameters<typeof externalLinkFindFirst>[0]));
    case 'externalLink.create':
      return Promise.resolve(externalLinkCreate((opts as { data: Record<string, unknown> }).data));
    case 'externalLink.update':
      return Promise.resolve(externalLinkUpdate(opts as { where: Record<string, unknown>; data: Record<string, unknown> }));
    case 'externalLink.delete':
      return Promise.resolve(externalLinkDelete(opts as { where: Record<string, unknown> }));

    // --- User ---
    case 'user.findMany':
      return Promise.resolve(userFindMany(opts as Record<string, unknown>));
    case 'user.findUnique':
      return Promise.resolve(userFindUnique(opts as { where: Record<string, unknown> }));

    // --- Post ---
    case 'post.findMany':
      return Promise.resolve(postFindMany(opts as Parameters<typeof postFindMany>[0]));
    case 'post.findUnique':
      return Promise.resolve(postFindUnique(opts as { where: Record<string, unknown> }));
    case 'post.create':
      return Promise.resolve(postCreate((opts as { data: Record<string, unknown> }).data));
    case 'post.update':
      return Promise.resolve(postUpdate(opts as { where: Record<string, unknown>; data: Record<string, unknown> }));

    default:
      return Promise.reject(new Error(`Unknown method: ${modelName}.${method}`));
  }
}

export const db = new Proxy({} as PrismaLikeDB, {
  get(_target, model) {
    if (typeof model !== 'string') return undefined;

    return new Proxy({} as PrismaLikeModel, {
      get(_target, method) {
        if (typeof method !== 'string') return undefined;
        return (...args: unknown[]) => handleCall(model, method, ...args);
      },
    });
  },
});
