import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // If Turso credentials are provided, use the libSQL adapter (for Cloudflare Pages)
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (tursoUrl) {
    try {
      const libsql = createClient({
        url: tursoUrl,
        authToken: tursoToken || undefined,
      })
      const adapter = new PrismaLibSql(libsql)
      return new PrismaClient({ adapter })
    } catch (error) {
      console.error('Failed to create Turso-backed Prisma client:', error);
      // Fall through to SQLite
    }
  }

  // Otherwise, use regular SQLite for local development
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })
}

// Lazy initialization — only create the client when first accessed
let _db: PrismaClient | undefined;

export function getDb(): PrismaClient {
  if (!_db) {
    _db = globalForPrisma.prisma ?? createPrismaClient();
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = _db;
  }
  return _db;
}

// Keep the `db` export for backward compatibility — lazily initialized via getter
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const realDb = getDb();
    const value = Reflect.get(realDb, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(realDb);
    }
    return value;
  },
});
