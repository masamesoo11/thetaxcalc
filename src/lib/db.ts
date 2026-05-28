/**
 * Lightweight database client for Cloudflare Pages edge runtime.
 * Uses @libsql/client/web (HTTP-only, no WASM) instead of Prisma
 * to keep the Worker bundle under 3 MiB.
 */
import { createClient, type Client } from '@libsql/client/web';

const globalForDb = globalThis as unknown as { _tursoClient: Client | undefined };

function getDbClient(): Client {
  if (globalForDb._tursoClient) return globalForDb._tursoClient;

  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error('TURSO_DATABASE_URL or DATABASE_URL environment variable is required');
  }

  const client = createClient({ url, authToken });
  if (process.env.NODE_ENV !== 'production') {
    globalForDb._tursoClient = client;
  }
  return client;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toBool(val: unknown): boolean {
  return val === 1 || val === true || val === '1';
}

function toNull(val: unknown): unknown {
  return val === null || val === undefined ? null : val;
}

function toDate(val: unknown): Date | null {
  if (!val || typeof val !== 'string') return null;
  return new Date(val);
}

/** Map a raw DB row to camelCase Post shape */
function mapPost(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: toNull(row.excerpt) as string | null,
    content: toNull(row.content) as string,
    category: (row.category as string) || 'tax-guide',
    tags: (row.tags as string) || '',
    coverImage: toNull(row.coverImage) as string | null,
    published: toBool(row.published),
    featured: toBool(row.featured),
    authorId: toNull(row.authorId) as string | null,
    metaTitle: toNull(row.metaTitle) as string | null,
    metaDesc: toNull(row.metaDesc) as string | null,
    createdAt: toDate(row.createdAt),
    updatedAt: toDate(row.updatedAt),
  };
}

function mapAdSlot(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    name: row.name as string,
    position: row.position as string,
    adType: (row.adType as string) || 'adsense',
    adCode: (row.adCode as string) || '',
    isActive: toBool(row.isActive),
    impressions: (row.impressions as number) || 0,
    clicks: (row.clicks as number) || 0,
    createdAt: toDate(row.createdAt),
    updatedAt: toDate(row.updatedAt),
  };
}

function mapSiteSetting(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    key: row.key as string,
    value: (row.value as string) || '',
  };
}

function mapCalculatorUsage(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    calculator: row.calculator as string,
    count: (row.count as number) || 0,
    date: row.date as string,
    createdAt: toDate(row.createdAt),
    updatedAt: toDate(row.updatedAt),
  };
}

function mapExternalLink(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    label: row.label as string,
    url: row.url as string,
    category: (row.category as string) || 'resource',
    isActive: toBool(row.isActive),
    sortOrder: (row.sortOrder as number) || 0,
    createdAt: toDate(row.createdAt),
    updatedAt: toDate(row.updatedAt),
  };
}

function buildWhereClause(where: Record<string, unknown>, tableAlias = '') {
  const prefix = tableAlias ? `${tableAlias}.` : '';
  const conditions: string[] = [];
  const args: Record<string, unknown> = {};
  let paramIdx = 0;

  for (const [key, value] of Object.entries(where)) {
    if (value === undefined) continue;
    const paramName = `p${paramIdx++}`;

    if (typeof value === 'boolean') {
      conditions.push(`${prefix}"${key}" = ${value ? 1 : 0}`);
    } else if (value === null) {
      conditions.push(`${prefix}"${key}" IS NULL`);
    } else {
      conditions.push(`${prefix}"${key}" = $${paramName}`);
      args[paramName] = value;
    }
  }

  return {
    sql: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    args,
  };
}

// ─── Post Model ───────────────────────────────────────────────────────────────

const post = {
  async findMany(opts: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, string>;
    select?: Record<string, boolean>;
    take?: number;
    skip?: number;
  } = {}) {
    const client = getDbClient();
    const { where, orderBy, take, skip } = opts;

    const { sql: whereSql, args } = buildWhereClause(where || {});
    let sql = `SELECT * FROM "Post" ${whereSql}`;

    if (orderBy) {
      const [field, direction] = Object.entries(orderBy)[0];
      const dir = (direction as string).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      sql += ` ORDER BY "${field}" ${dir}`;
    }

    if (skip) sql += ` OFFSET ${skip}`;
    if (take) sql += ` LIMIT ${take}`;

    const result = await client.execute({ sql, args });
    return result.rows.map((row) => mapPost(row as Record<string, unknown>));
  },

  async findUnique(opts: { where: { id?: string; slug?: string } }) {
    const client = getDbClient();
    const { id, slug } = opts.where;

    let sql: string;
    let args: Record<string, unknown>;

    if (slug !== undefined) {
      sql = `SELECT * FROM "Post" WHERE "slug" = $p0 LIMIT 1`;
      args = { p0: slug };
    } else {
      sql = `SELECT * FROM "Post" WHERE "id" = $p0 LIMIT 1`;
      args = { p0: id };
    }

    const result = await client.execute({ sql, args });
    if (result.rows.length === 0) return null;
    return mapPost(result.rows[0] as Record<string, unknown>);
  },

  async findFirst(opts: { where: Record<string, unknown> } = { where: {} }) {
    const client = getDbClient();
    const { sql: whereSql, args } = buildWhereClause(opts.where);
    const sql = `SELECT * FROM "Post" ${whereSql} LIMIT 1`;
    const result = await client.execute({ sql, args });
    if (result.rows.length === 0) return null;
    return mapPost(result.rows[0] as Record<string, unknown>);
  },

  async create(opts: { data: Record<string, unknown> }) {
    const client = getDbClient();
    const data = opts.data;
    const fields = Object.keys(data).filter((k) => data[k] !== undefined);
    const values = fields.map((k) => data[k]);
    const placeholders = fields.map((_, i) => `$p${i}`).join(', ');
    const colNames = fields.map((f) => `"${f}"`).join(', ');

    const sql = `INSERT INTO "Post" (${colNames}) VALUES (${placeholders}) RETURNING *`;
    const args: Record<string, unknown> = {};
    fields.forEach((f, i) => { args[`p${i}`] = data[f]; });

    const result = await client.execute({ sql, args });
    return mapPost(result.rows[0] as Record<string, unknown>);
  },

  async update(opts: { where: { id?: string; slug?: string }; data: Record<string, unknown> }) {
    const client = getDbClient();
    const { id, slug } = opts.where;
    const data = opts.data;

    const fields = Object.keys(data).filter((k) => data[k] !== undefined);
    const setClauses = fields.map((f, i) => `"${f}" = $sp${i}`);
    const setArgs: Record<string, unknown> = {};
    fields.forEach((f, i) => {
      const val = data[f];
      // Handle Prisma-style { increment: N }
      if (val && typeof val === 'object' && 'increment' in (val as Record<string, unknown>)) {
        setClauses[i] = `"${f}" = "${f}" + ${(val as Record<string, unknown>).increment as number}`;
      } else {
        setArgs[`sp${i}`] = val;
      }
    });

    const whereKey = slug !== undefined ? 'slug' : 'id';
    const whereVal = slug !== undefined ? slug : id;

    const sql = `UPDATE "Post" SET ${setClauses.join(', ')}, "updatedAt" = datetime('now') WHERE "${whereKey}" = $wp0 RETURNING *`;
    const args = { ...setArgs, wp0: whereVal };

    const result = await client.execute({ sql, args });
    return mapPost(result.rows[0] as Record<string, unknown>);
  },

  async delete(opts: { where: { id?: string; slug?: string } }) {
    const client = getDbClient();
    const { id, slug } = opts.where;
    const whereKey = slug !== undefined ? 'slug' : 'id';
    const whereVal = slug !== undefined ? slug : id;

    const sql = `DELETE FROM "Post" WHERE "${whereKey}" = $p0 RETURNING *`;
    const result = await client.execute({ sql, args: { p0: whereVal } });
    if (result.rows.length === 0) return null;
    return mapPost(result.rows[0] as Record<string, unknown>);
  },

  async count(opts: { where?: Record<string, unknown> } = {}) {
    const client = getDbClient();
    const { sql: whereSql, args } = buildWhereClause(opts.where || {});
    const sql = `SELECT COUNT(*) as cnt FROM "Post" ${whereSql}`;
    const result = await client.execute({ sql, args });
    return (result.rows[0] as Record<string, unknown>).cnt as number;
  },
};

// ─── AdSlot Model ─────────────────────────────────────────────────────────────

const adSlot = {
  async findMany(opts: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, string>;
    take?: number;
  } = {}) {
    const client = getDbClient();
    const { where, orderBy, take } = opts;

    const { sql: whereSql, args } = buildWhereClause(where || {});
    let sql = `SELECT * FROM "AdSlot" ${whereSql}`;

    if (orderBy) {
      const [field, direction] = Object.entries(orderBy)[0];
      const dir = (direction as string).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      sql += ` ORDER BY "${field}" ${dir}`;
    }

    if (take) sql += ` LIMIT ${take}`;

    const result = await client.execute({ sql, args });
    return result.rows.map((row) => mapAdSlot(row as Record<string, unknown>));
  },

  async findUnique(opts: { where: { id?: string; position?: string } }) {
    const client = getDbClient();
    const { id, position } = opts.where;

    let sql: string;
    let args: Record<string, unknown>;

    if (position !== undefined) {
      sql = `SELECT * FROM "AdSlot" WHERE "position" = $p0 LIMIT 1`;
      args = { p0: position };
    } else {
      sql = `SELECT * FROM "AdSlot" WHERE "id" = $p0 LIMIT 1`;
      args = { p0: id };
    }

    const result = await client.execute({ sql, args });
    if (result.rows.length === 0) return null;
    return mapAdSlot(result.rows[0] as Record<string, unknown>);
  },

  async create(opts: { data: Record<string, unknown> }) {
    const client = getDbClient();
    const data = opts.data;
    const fields = Object.keys(data).filter((k) => data[k] !== undefined);
    const colNames = fields.map((f) => `"${f}"`).join(', ');
    const placeholders = fields.map((_, i) => `$p${i}`).join(', ');
    const args: Record<string, unknown> = {};
    fields.forEach((f, i) => { args[`p${i}`] = data[f]; });

    const sql = `INSERT INTO "AdSlot" (${colNames}) VALUES (${placeholders}) RETURNING *`;
    const result = await client.execute({ sql, args });
    return mapAdSlot(result.rows[0] as Record<string, unknown>);
  },

  async update(opts: { where: { id?: string; position?: string }; data: Record<string, unknown> }) {
    const client = getDbClient();
    const { id, position } = opts.where;
    const data = opts.data;

    const fields = Object.keys(data).filter((k) => data[k] !== undefined);
    const setClauses = fields.map((f, i) => `"${f}" = $sp${i}`);
    const setArgs: Record<string, unknown> = {};
    fields.forEach((f, i) => {
      const val = data[f];
      if (val && typeof val === 'object' && 'increment' in (val as Record<string, unknown>)) {
        setClauses[i] = `"${f}" = "${f}" + ${(val as Record<string, unknown>).increment as number}`;
      } else {
        setArgs[`sp${i}`] = val;
      }
    });

    const whereKey = position !== undefined ? 'position' : 'id';
    const whereVal = position !== undefined ? position : id;

    const sql = `UPDATE "AdSlot" SET ${setClauses.join(', ')}, "updatedAt" = datetime('now') WHERE "${whereKey}" = $wp0 RETURNING *`;
    const args = { ...setArgs, wp0: whereVal };

    const result = await client.execute({ sql, args });
    return mapAdSlot(result.rows[0] as Record<string, unknown>);
  },

  async delete(opts: { where: { id?: string } }) {
    const client = getDbClient();
    const sql = `DELETE FROM "AdSlot" WHERE "id" = $p0 RETURNING *`;
    const result = await client.execute({ sql, args: { p0: opts.where.id } });
    if (result.rows.length === 0) return null;
    return mapAdSlot(result.rows[0] as Record<string, unknown>);
  },

  async count(opts: { where?: Record<string, unknown> } = {}) {
    const client = getDbClient();
    const { sql: whereSql, args } = buildWhereClause(opts.where || {});
    const sql = `SELECT COUNT(*) as cnt FROM "AdSlot" ${whereSql}`;
    const result = await client.execute({ sql, args });
    return (result.rows[0] as Record<string, unknown>).cnt as number;
  },
};

// ─── SiteSetting Model ────────────────────────────────────────────────────────

const siteSetting = {
  async findMany() {
    const client = getDbClient();
    const result = await client.execute(`SELECT * FROM "SiteSetting"`);
    return result.rows.map((row) => mapSiteSetting(row as Record<string, unknown>));
  },

  async findUnique(opts: { where: { key: string } }) {
    const client = getDbClient();
    const sql = `SELECT * FROM "SiteSetting" WHERE "key" = $p0 LIMIT 1`;
    const result = await client.execute({ sql, args: { p0: opts.where.key } });
    if (result.rows.length === 0) return null;
    return mapSiteSetting(result.rows[0] as Record<string, unknown>);
  },

  async upsert(opts: { where: { key: string }; update: { value: string }; create: { key: string; value: string } }) {
    const client = getDbClient();
    const { key, value } = { key: opts.where.key, value: opts.update.value };

    // Check if exists
    const existing = await siteSetting.findUnique({ where: { key } });
    if (existing) {
      const sql = `UPDATE "SiteSetting" SET "value" = $p0 WHERE "key" = $p1 RETURNING *`;
      const result = await client.execute({ sql, args: { p0: value, p1: key } });
      return mapSiteSetting(result.rows[0] as Record<string, unknown>);
    } else {
      const sql = `INSERT INTO "SiteSetting" ("key", "value") VALUES ($p0, $p1) RETURNING *`;
      const result = await client.execute({ sql, args: { p0: key, p1: value } });
      return mapSiteSetting(result.rows[0] as Record<string, unknown>);
    }
  },

  async create(opts: { data: { key: string; value: string } }) {
    const client = getDbClient();
    const sql = `INSERT INTO "SiteSetting" ("key", "value") VALUES ($p0, $p1) RETURNING *`;
    const result = await client.execute({ sql, args: { p0: opts.data.key, p1: opts.data.value } });
    return mapSiteSetting(result.rows[0] as Record<string, unknown>);
  },
};

// ─── CalculatorUsage Model ────────────────────────────────────────────────────

const calculatorUsage = {
  async count(opts: { where?: Record<string, unknown> } = {}) {
    const client = getDbClient();
    const { sql: whereSql, args } = buildWhereClause(opts.where || {});
    const sql = `SELECT COUNT(*) as cnt FROM "CalculatorUsage" ${whereSql}`;
    const result = await client.execute({ sql, args });
    return (result.rows[0] as Record<string, unknown>).cnt as number;
  },

  async upsert(opts: {
    where: { calculator_date: { calculator: string; date: string } };
    update: { count?: { increment: number } };
    create: { calculator: string; date: string; count: number };
  }) {
    const client = getDbClient();
    const { calculator, date } = opts.where.calculator_date;

    // Check if exists
    const checkSql = `SELECT * FROM "CalculatorUsage" WHERE "calculator" = $p0 AND "date" = $p1 LIMIT 1`;
    const existing = await client.execute({ sql: checkSql, args: { p0: calculator, p1: date } });

    if (existing.rows.length > 0) {
      const incrementBy = opts.update.count?.increment || 1;
      const sql = `UPDATE "CalculatorUsage" SET "count" = "count" + $p0, "updatedAt" = datetime('now') WHERE "calculator" = $p1 AND "date" = $p2 RETURNING *`;
      const result = await client.execute({ sql, args: { p0: incrementBy, p1: calculator, p2: date } });
      return mapCalculatorUsage(result.rows[0] as Record<string, unknown>);
    } else {
      const sql = `INSERT INTO "CalculatorUsage" ("calculator", "date", "count") VALUES ($p0, $p1, $p2) RETURNING *`;
      const result = await client.execute({ sql, args: { p0: calculator, p1: date, p2: opts.create.count } });
      return mapCalculatorUsage(result.rows[0] as Record<string, unknown>);
    }
  },

  async groupBy(opts: {
    by: string[];
    _sum: Record<string, boolean>;
    orderBy: Record<string, unknown>;
    take?: number;
  }) {
    const client = getDbClient();
    const byCol = opts.by[0]; // e.g. 'calculator'
    const sumCol = Object.keys(opts._sum)[0]; // e.g. 'count'

    let sql = `SELECT "${byCol}" as calculator, SUM("${sumCol}") as total FROM "CalculatorUsage" GROUP BY "${byCol}"`;

    // Handle orderBy
    if (opts.orderBy) {
      const orderByKey = Object.keys(opts.orderBy)[0];
      if (orderByKey === '_sum') {
        const innerDir = Object.values(opts.orderBy._sum as Record<string, string>)[0] as string;
        sql += ` ORDER BY total ${innerDir.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`;
      }
    }

    if (opts.take) sql += ` LIMIT ${opts.take}`;

    const result = await client.execute(sql);
    return result.rows.map((row) => ({
      calculator: (row as Record<string, unknown>).calculator as string,
      _sum: { count: (row as Record<string, unknown>).total as number },
    }));
  },

  async aggregate(opts: { _sum: Record<string, boolean> }) {
    const client = getDbClient();
    const sumCol = Object.keys(opts._sum)[0];
    const sql = `SELECT SUM("${sumCol}") as total FROM "CalculatorUsage"`;
    const result = await client.execute(sql);
    return {
      _sum: { count: ((result.rows[0] as Record<string, unknown>).total as number) || 0 },
    };
  },
};

// ─── ExternalLink Model ──────────────────────────────────────────────────────

const externalLink = {
  async findMany(opts: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, string>[];
    take?: number;
  } = {}) {
    const client = getDbClient();
    const { where, orderBy, take } = opts;

    const { sql: whereSql, args } = buildWhereClause(where || {});
    let sql = `SELECT * FROM "ExternalLink" ${whereSql}`;

    if (orderBy && orderBy.length > 0) {
      const orderClauses = orderBy.map((o) => {
        const [field, direction] = Object.entries(o)[0];
        return `"${field}" ${direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`;
      });
      sql += ` ORDER BY ${orderClauses.join(', ')}`;
    }

    if (take) sql += ` LIMIT ${take}`;

    const result = await client.execute({ sql, args });
    return result.rows.map((row) => mapExternalLink(row as Record<string, unknown>));
  },

  async findUnique(opts: { where: { id: string } }) {
    const client = getDbClient();
    const sql = `SELECT * FROM "ExternalLink" WHERE "id" = $p0 LIMIT 1`;
    const result = await client.execute({ sql, args: { p0: opts.where.id } });
    if (result.rows.length === 0) return null;
    return mapExternalLink(result.rows[0] as Record<string, unknown>);
  },

  async findFirst(opts: { where: Record<string, unknown> } = { where: {} }) {
    const client = getDbClient();
    const { sql: whereSql, args } = buildWhereClause(opts.where);
    const sql = `SELECT * FROM "ExternalLink" ${whereSql} LIMIT 1`;
    const result = await client.execute({ sql, args });
    if (result.rows.length === 0) return null;
    return mapExternalLink(result.rows[0] as Record<string, unknown>);
  },

  async create(opts: { data: Record<string, unknown> }) {
    const client = getDbClient();
    const data = opts.data;
    const fields = Object.keys(data).filter((k) => data[k] !== undefined);
    const colNames = fields.map((f) => `"${f}"`).join(', ');
    const placeholders = fields.map((_, i) => `$p${i}`).join(', ');
    const args: Record<string, unknown> = {};
    fields.forEach((f, i) => { args[`p${i}`] = data[f]; });

    const sql = `INSERT INTO "ExternalLink" (${colNames}) VALUES (${placeholders}) RETURNING *`;
    const result = await client.execute({ sql, args });
    return mapExternalLink(result.rows[0] as Record<string, unknown>);
  },

  async update(opts: { where: { id: string }; data: Record<string, unknown> }) {
    const client = getDbClient();
    const data = opts.data;

    const fields = Object.keys(data).filter((k) => data[k] !== undefined);
    const setClauses = fields.map((f, i) => `"${f}" = $sp${i}`);
    const setArgs: Record<string, unknown> = {};
    fields.forEach((f, i) => { setArgs[`sp${i}`] = data[f]; });

    const sql = `UPDATE "ExternalLink" SET ${setClauses.join(', ')}, "updatedAt" = datetime('now') WHERE "id" = $wp0 RETURNING *`;
    const args = { ...setArgs, wp0: opts.where.id };

    const result = await client.execute({ sql, args });
    return mapExternalLink(result.rows[0] as Record<string, unknown>);
  },

  async delete(opts: { where: { id: string } }) {
    const client = getDbClient();
    const sql = `DELETE FROM "ExternalLink" WHERE "id" = $p0 RETURNING *`;
    const result = await client.execute({ sql, args: { p0: opts.where.id } });
    if (result.rows.length === 0) return null;
    return mapExternalLink(result.rows[0] as Record<string, unknown>);
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const db = {
  post,
  adSlot,
  siteSetting,
  calculatorUsage,
  externalLink,
};
