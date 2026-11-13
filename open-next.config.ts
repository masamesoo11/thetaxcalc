import type { OpenNextConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      // ISR: serve prerendered pages from Workers static assets instead of
      // re-rendering them on every request. The previous "dummy" cache made
      // every ISR page (all ~93 calculators, salary fleet, hourly rates…)
      // render server-side on every hit => CPU storms => 503s under load.
      // NOTE: this cache is read-only — on-demand renders are not persisted
      // (set() logs an error and no-ops), so non-prerendered pages still
      // render per request. Long-term ISR (durable across isolates) needs
      // the KV/R2 incremental cache — see worklog for the upgrade path.
      incrementalCache: () => staticAssetsIncrementalCache,
      tagCache: "dummy",
      queue: "direct",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: () => staticAssetsIncrementalCache,
      tagCache: "dummy",
      queue: "direct",
    },
  },
};

export default config;
