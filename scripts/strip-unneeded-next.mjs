#!/usr/bin/env node
/**
 * strip-unneeded-next.mjs — shrink .open-next/server-functions/default/node_modules/next
 * to ONLY the files actually required at runtime.
 *
 * WHY: Next.js's file tracing copies ~930 next-package files (16 MB) into the
 * OpenNext server bundle "just in case" (including a 4.2 MB font-metrics JSON),
 * but the Turbopack server chunks lazily require only a small subset via
 * require("next/dist/...") externals wrappers. The rest is dead weight that
 * pushes the Pages Function over the 25 MiB uncompressed limit.
 *
 * HOW: collect every "next/..." specifier referenced from the bundle
 * (chunks, handler, middleware, other node_modules), resolve each to a file
 * inside node_modules/next, then recursively follow requires found WITHIN the
 * kept files. Delete everything else. Dry-run by default; pass --apply to delete.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sfDir = path.resolve(root, ".open-next", "server-functions", "default");
const nextDir = path.join(sfDir, "node_modules", "next");

const APPLY = process.argv.includes("--apply");

if (!fs.existsSync(nextDir)) {
  console.error("✘ node_modules/next not found — run the OpenNext build first.");
  process.exit(1);
}

// Resolve specifiers exactly the way the runtime would (package.json exports aware).
const require_ = createRequire(path.join(sfDir, "noop.js"));
function resolveNextPath(spec) {
  try {
    const resolved = require_.resolve(spec, { paths: [sfDir] });
    return resolved.startsWith(nextDir + path.sep) ? resolved : null;
  } catch {
    return null;
  }
}

// 1. Collect every "next/..." specifier referenced anywhere in the bundle
//    (excluding the next package itself — handled recursively below).
const specifierRe = /["'](next\/[^"']+)["']/g;
const required = new Set();

function scanFile(filePath) {
  let src;
  try { src = fs.readFileSync(filePath, "utf8"); } catch { return; }
  if (src.length > 30_000_000) return; // safety: skip giant files
  for (const m of src.matchAll(specifierRe)) required.add(m[1]);
}

function walk(dir, cb) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, cb);
    else if (/\.(js|mjs|cjs|json)$/.test(e.name)) cb(p);
  }
}

walk(sfDir, (p) => { if (!p.startsWith(nextDir + path.sep)) scanFile(p); });

// 2. Resolve specifiers to actual files inside node_modules/next and follow
//    their own requires recursively.
const keptFiles = new Set();

function keepWithRequires(filePath) {
  if (keptFiles.has(filePath)) return;
  keptFiles.add(filePath);
  let src;
  try { src = fs.readFileSync(filePath, "utf8"); } catch { return; }
  for (const m of src.matchAll(specifierRe)) {
    const resolved = resolveNextPath(m[1]);
    if (resolved) keepWithRequires(resolved);
  }
}

let unresolved = [];
for (const spec of required) {
  const resolved = resolveNextPath(spec);
  if (resolved) keepWithRequires(resolved);
  else unresolved.push(spec);
}

// 3. Compute what would be deleted.
const allNextFiles = [];
walk(nextDir, (p) => allNextFiles.push(p));
const toDelete = allNextFiles.filter((p) => !keptFiles.has(p));

const sizeOf = (p) => { try { return fs.statSync(p).size; } catch { return 0; } };
const keptBytes = [...keptFiles].reduce((a, p) => a + sizeOf(p), 0);
const delBytes = toDelete.reduce((a, p) => a + sizeOf(p), 0);
const totalBytes = allNextFiles.reduce((a, p) => a + sizeOf(p), 0);

console.log(`next package total : ${(totalBytes / 1048576).toFixed(2)} MiB (${allNextFiles.length} files)`);
console.log(`required at runtime: ${(keptBytes / 1048576).toFixed(2)} MiB (${keptFiles.size} files)`);
console.log(`deletable          : ${(delBytes / 1048576).toFixed(2)} MiB (${toDelete.length} files)`);
if (unresolved.length) {
  console.log(`unresolved specifiers (kept package dir untouched — none deletable anyway):`);
  unresolved.slice(0, 10).forEach((u) => console.log("  ?", u));
}

// Also report the biggest deletable files for visibility.
const big = toDelete.map((p) => [sizeOf(p), p]).sort((a, b) => b[0] - a[0]).slice(0, 6);
console.log("biggest deletable files:");
big.forEach(([s, p]) => console.log(`  ${(s / 1048576).toFixed(2)} MiB  ${path.relative(nextDir, p)}`));

if (APPLY) {
  for (const p of toDelete) fs.rmSync(p);
  // Prune now-empty directories.
  const dirs = [];
  walk(nextDir, () => {});
  (function prune(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) if (e.isDirectory()) prune(path.join(dir, e.name));
    try {
      if (dir !== nextDir && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
    } catch {}
  })(nextDir);
  console.log("✓ Applied — node_modules/next stripped to runtime-required files only.");
} else {
  console.log("(dry-run — pass --apply to actually delete)");
}
