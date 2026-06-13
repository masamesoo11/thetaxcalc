// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_next/static/*",
    "/favicon.ico",
    "/icon.png",
    "/apple-touch-icon.png",
    "/manifest.json",
    "/opengraph-image.png",
    "/robots.txt",
    "/sitemap.xml",
    "/feed.xml",
    "/d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9.txt"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/home/z/my-project/.wrangler/tmp/pages-RcRiix/bundledWorker-0.554563906968463.mjs";
import { isRoutingRuleMatch } from "/home/z/my-project/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/home/z/my-project/.wrangler/tmp/pages-RcRiix/bundledWorker-0.554563906968463.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=a2xcx7u6zcg.js.map
