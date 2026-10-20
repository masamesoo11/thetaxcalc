#!/usr/bin/env node
/**
 * build-pages-deploy.mjs
 *
 * Converts the OpenNext Workers output (.open-next/) into a Cloudflare Pages
 * deployment directory with a working _worker.js (Pages advanced mode).
 *
 * WHY THIS EXISTS:
 *   @opennextjs/cloudflare 1.x produces a WORKERS-format output
 *   (worker.js + server-functions/ + assets/). Cloudflare Pages needs a
 *   Pages-format output (single _worker.js + flat static assets). Deploying
 *   the Workers output directly to Pages publishes a static-only site with
 *   NO server — every dynamic route 404s. This script performs the format
 *   conversion so `wrangler pages deploy` publishes a WORKING worker.
 *
 * USAGE (after `npx opennextjs-cloudflare build`):
 *   node scripts/build-pages-deploy.mjs
 *   npx wrangler pages deploy pages-deploy --project-name=thetaxcalc --branch=main
 *
 * Notes:
 *   - Strips the unused Durable Object exports (Pages direct upload has no
 *     DO migrations; the open-next.config.ts uses dummy/direct caches so the
 *     DO classes are never used at runtime).
 *   - Prepends a global `require` shim: Next.js server modules call
 *     `require()` dynamically at module scope (e.g. dev/browser-logs
 *     file-logger requires "fs"); the multi-module ESM worker has no
 *     `require`, so we provide one on globalThis.
 *   - Generates a _routes.json excluding top-level static files so they are
 *     served directly by Pages instead of hitting the worker.
 *   - Requires compatibility date >= 2026-05-28 with nodejs_compat flag
 *     (node:http and other builtins used by the Next.js server bundle).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const openNextDir = path.join(root, ".open-next");
const outDir = path.join(root, "pages-deploy");

if (!fs.existsSync(path.join(openNextDir, "worker.js"))) {
  console.error("✘ .open-next/worker.js not found. Run `npx opennextjs-cloudflare build` first.");
  process.exit(1);
}

// ─── 1. Clean output dir ─────────────────────────────────────────────────────
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(path.join(outDir, "_worker.js"), { recursive: true });

// ─── 2. Worker: entry (index.js) with require shim + DO exports stripped ───
const REQUIRE_SHIM = `// ─── Global require shim for workerd (Next.js CJS interop) ─────────────────
// Next.js's server loads dev/browser-logs modules that dynamically require
// node builtins (fs, module, path...) at module scope. In the multi-module
// ESM worker bundle there is no \`require\`, so we provide a global shim that
// resolves real builtins when available and a safe stub otherwise.
const __stubModule = new Proxy(function __stubFn() { return __stubModule; }, {
  get: (target, prop) => {
    if (prop === Symbol.toPrimitive) return () => "";
    if (prop === "then") return undefined;
    if (prop === "default") return __stubModule;
    return __stubModule;
  },
  apply: () => __stubModule,
});
globalThis.require = function require(id) {
  try {
    if (typeof process !== "undefined" && typeof process.getBuiltinModule === "function") {
      const nid = typeof id === "string" && id.startsWith("node:") ? id : "node:" + id;
      const m = process.getBuiltinModule(nid);
      if (m) return m;
    }
  } catch (e) { /* fall through to stub */ }
  return __stubModule;
};
`;

const workerEntry = fs
  .readFileSync(path.join(openNextDir, "worker.js"), "utf8")
  // Strip Durable Object exports/imports — unused (dummy/direct caches in
  // open-next.config.ts) and unsupported without Pages DO migrations.
  .split("\n")
  .filter(
    (line) =>
      !line.includes("durable-objects") &&
      !line.includes("DOQueueHandler") &&
      !line.includes("DOShardedTagCache") &&
      !line.includes("BucketCachePurge")
  )
  .join("\n");

fs.writeFileSync(
  path.join(outDir, "_worker.js", "index.js"),
  REQUIRE_SHIM + workerEntry
);

// ─── 3. Worker: supporting modules ──────────────────────────────────────────
for (const mod of ["cloudflare", "middleware", "server-functions", "dynamodb-provider"]) {
  const src = path.join(openNextDir, mod);
  if (fs.existsSync(src)) {
    fs.cpSync(src, path.join(outDir, "_worker.js", mod), { recursive: true });
  }
}
// Hidden .build dir (DO classes referenced by worker.js — kept for completeness
// even though the DO exports were stripped from the entry).
const buildDir = path.join(openNextDir, ".build");
if (fs.existsSync(buildDir)) {
  fs.cpSync(buildDir, path.join(outDir, "_worker.js", ".build"), { recursive: true });
}

// ─── 4. Static assets at deploy root ────────────────────────────────────────
fs.cpSync(path.join(openNextDir, "assets"), outDir, { recursive: true });
// Remove the stale next-on-pages _routes.json if present (regenerated below)
fs.rmSync(path.join(outDir, "_routes.json"), { force: true });

// ─── 5. Generate _routes.json ───────────────────────────────────────────────
const excludes = ["/_next/static/*"];
for (const f of fs.readdirSync(outDir)) {
  const p = path.join(outDir, f);
  if (fs.statSync(p).isFile() && !f.startsWith("_")) {
    excludes.push("/" + f);
  }
}
if (fs.existsSync(path.join(outDir, ".well-known"))) {
  excludes.push("/.well-known/*");
}
fs.writeFileSync(
  path.join(outDir, "_routes.json"),
  JSON.stringify({ version: 1, include: ["/*"], exclude: excludes }, null, 2)
);

console.log("✓ Pages deploy directory ready: pages-deploy/");
console.log("  Deploy with:");
console.log("  npx wrangler pages deploy pages-deploy --project-name=thetaxcalc --branch=main");
