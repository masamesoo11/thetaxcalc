globalThis.monorepoPackagePath = "";globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.2";globalThis.nextVersion = "16.1.3";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod3) => function __require2() {
  return mod3 || (0, cb[__getOwnPropNames(cb)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod3, secondTarget) => (__copyProps(target, mod3, "default"), secondTarget && __copyProps(secondTarget, mod3, "default"));
var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target,
  mod3
));
var __toCommonJS = (mod3) => __copyProps(__defProp({}, "__esModule", { value: true }), mod3);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var IgnorableError;
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
    IgnorableError = class extends Error {
      __openNextInternal = true;
      canIgnore = true;
      logLevel = 0;
      constructor(message) {
        super(message);
        this.name = "IgnorableError";
      }
    };
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var parseHeaders, convertHeader;
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
    parseHeaders = (headers) => {
      const result = {};
      if (!headers) {
        return result;
      }
      for (const [key, value] of Object.entries(headers)) {
        if (value === void 0) {
          continue;
        }
        const keyLower = key.toLowerCase();
        if (keyLower === "location" && Array.isArray(value)) {
          if (value.length === 1 || value[0] === value[1]) {
            result[keyLower] = value[0];
          } else {
            warn("Multiple different values for Location header found. Using the last one");
            result[keyLower] = value[value.length - 1];
          }
          continue;
        }
        result[keyLower] = convertHeader(value);
      }
      return result;
    };
    convertHeader = (header) => {
      if (typeof header === "string") {
        return header;
      }
      if (Array.isArray(header)) {
        return header.join(",");
      }
      return String(header);
    };
  }
});

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
var config_exports = {};
__export(config_exports, {
  AppPathRoutesManifest: () => AppPathRoutesManifest,
  AppPathsManifest: () => AppPathsManifest,
  AppPathsManifestKeys: () => AppPathsManifestKeys,
  BuildId: () => BuildId,
  ConfigHeaders: () => ConfigHeaders,
  FunctionsConfigManifest: () => FunctionsConfigManifest,
  HtmlPages: () => HtmlPages,
  MiddlewareManifest: () => MiddlewareManifest,
  NEXT_DIR: () => NEXT_DIR,
  NextConfig: () => NextConfig,
  OPEN_NEXT_DIR: () => OPEN_NEXT_DIR,
  PagesManifest: () => PagesManifest,
  PrerenderManifest: () => PrerenderManifest,
  RoutesManifest: () => RoutesManifest
});
import path from "node:path";
var NEXT_DIR, OPEN_NEXT_DIR, NextConfig, BuildId, HtmlPages, RoutesManifest, ConfigHeaders, PrerenderManifest, AppPathsManifestKeys, MiddlewareManifest, AppPathsManifest, AppPathRoutesManifest, FunctionsConfigManifest, PagesManifest;
var init_config = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/config/index.js"() {
    init_logger();
    globalThis.__dirname ??= "";
    NEXT_DIR = path.join(__dirname, ".next");
    OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
    debug({ NEXT_DIR, OPEN_NEXT_DIR });
    NextConfig = { "distDir": ".next", "cacheComponents": false, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "assetPrefix": "", "output": "standalone", "trailingSlash": false, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": true }, "reactMaxHeadersLength": 6e3, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "basePath": "", "expireTime": 31536e3, "generateEtags": true, "poweredByHeader": true, "cacheHandlers": {}, "cacheMaxMemorySize": 52428800, "compress": true, "i18n": null, "httpAgentOptions": { "keepAlive": true }, "pageExtensions": ["tsx", "ts", "jsx", "js"], "useFileSystemPublicRoutes": true, "experimental": { "ppr": false, "staleTimes": { "dynamic": 0, "static": 300 }, "dynamicOnHover": false, "inlineCss": false, "authInterrupts": false, "fetchCacheKeyPrefix": "", "isrFlushToDisk": true, "optimizeCss": false, "nextScriptWorkers": false, "disableOptimizedLoading": false, "largePageDataBytes": 128e3, "serverComponentsHmrCache": true, "caseSensitiveRoutes": false, "validateRSCRequestHeaders": false, "useSkewCookie": false, "preloadEntriesOnStart": true, "hideLogsAfterAbort": false, "removeUncaughtErrorAndRejectionListeners": false, "imgOptConcurrency": null, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "imgOptTimeoutInSeconds": 7, "proxyClientMaxBodySize": 10485760, "trustHostHeader": false, "isExperimentalCompile": false }, "skipTrailingSlashRedirect": false, "serverExternalPackages": [] };
    BuildId = "DHHyHh_Ff3S5PG3AajNLG";
    HtmlPages = ["/404", "/500"];
    RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/settings", "regex": "^/admin/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/settings(?:/)?$" }, { "page": "/api", "regex": "^/api(?:/)?$", "routeKeys": {}, "namedRegex": "^/api(?:/)?$" }, { "page": "/api/admin/db-status", "regex": "^/api/admin/db\\-status(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/db\\-status(?:/)?$" }, { "page": "/api/admin/seed-db", "regex": "^/api/admin/seed\\-db(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/seed\\-db(?:/)?$" }, { "page": "/api/admin/stats", "regex": "^/api/admin/stats(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/stats(?:/)?$" }, { "page": "/api/ads", "regex": "^/api/ads(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/ads(?:/)?$" }, { "page": "/api/auth/login", "regex": "^/api/auth/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/login(?:/)?$" }, { "page": "/api/auth/logout", "regex": "^/api/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/logout(?:/)?$" }, { "page": "/api/auth/verify", "regex": "^/api/auth/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/verify(?:/)?$" }, { "page": "/api/blog", "regex": "^/api/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/blog(?:/)?$" }, { "page": "/api/indexnow", "regex": "^/api/indexnow(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/indexnow(?:/)?$" }, { "page": "/api/links", "regex": "^/api/links(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/links(?:/)?$" }, { "page": "/api/ping-search-engines", "regex": "^/api/ping\\-search\\-engines(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/ping\\-search\\-engines(?:/)?$" }, { "page": "/api/seed", "regex": "^/api/seed(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/seed(?:/)?$" }, { "page": "/api/settings", "regex": "^/api/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/settings(?:/)?$" }, { "page": "/api/track", "regex": "^/api/track(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/track(?:/)?$" }, { "page": "/apple-icon", "regex": "^/apple\\-icon(?:/)?$", "routeKeys": {}, "namedRegex": "^/apple\\-icon(?:/)?$" }, { "page": "/blog", "regex": "^/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/blog(?:/)?$" }, { "page": "/compare", "regex": "^/compare(?:/)?$", "routeKeys": {}, "namedRegex": "^/compare(?:/)?$" }, { "page": "/federal-tax-brackets", "regex": "^/federal\\-tax\\-brackets(?:/)?$", "routeKeys": {}, "namedRegex": "^/federal\\-tax\\-brackets(?:/)?$" }, { "page": "/feed.xml", "regex": "^/feed\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/feed\\.xml(?:/)?$" }, { "page": "/freefile-irs", "regex": "^/freefile\\-irs(?:/)?$", "routeKeys": {}, "namedRegex": "^/freefile\\-irs(?:/)?$" }, { "page": "/glossary", "regex": "^/glossary(?:/)?$", "routeKeys": {}, "namedRegex": "^/glossary(?:/)?$" }, { "page": "/home-sale-tax-calculator", "regex": "^/home\\-sale\\-tax\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/home\\-sale\\-tax\\-calculator(?:/)?$" }, { "page": "/icon", "regex": "^/icon(?:/)?$", "routeKeys": {}, "namedRegex": "^/icon(?:/)?$" }, { "page": "/job-offer-comparison-calculator", "regex": "^/job\\-offer\\-comparison\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/job\\-offer\\-comparison\\-calculator(?:/)?$" }, { "page": "/methodology", "regex": "^/methodology(?:/)?$", "routeKeys": {}, "namedRegex": "^/methodology(?:/)?$" }, { "page": "/mortgage-calculator", "regex": "^/mortgage\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/mortgage\\-calculator(?:/)?$" }, { "page": "/obbba-tax-calculator", "regex": "^/obbba\\-tax\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/obbba\\-tax\\-calculator(?:/)?$" }, { "page": "/opengraph-image", "regex": "^/opengraph\\-image(?:/)?$", "routeKeys": {}, "namedRegex": "^/opengraph\\-image(?:/)?$" }, { "page": "/paycheck-difference-calculator", "regex": "^/paycheck\\-difference\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/paycheck\\-difference\\-calculator(?:/)?$" }, { "page": "/privacy", "regex": "^/privacy(?:/)?$", "routeKeys": {}, "namedRegex": "^/privacy(?:/)?$" }, { "page": "/research", "regex": "^/research(?:/)?$", "routeKeys": {}, "namedRegex": "^/research(?:/)?$" }, { "page": "/resources", "regex": "^/resources(?:/)?$", "routeKeys": {}, "namedRegex": "^/resources(?:/)?$" }, { "page": "/salary", "regex": "^/salary(?:/)?$", "routeKeys": {}, "namedRegex": "^/salary(?:/)?$" }, { "page": "/salary-comparison-calculator", "regex": "^/salary\\-comparison\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/salary\\-comparison\\-calculator(?:/)?$" }, { "page": "/sales-tax-calculator", "regex": "^/sales\\-tax\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/sales\\-tax\\-calculator(?:/)?$" }, { "page": "/scholarship", "regex": "^/scholarship(?:/)?$", "routeKeys": {}, "namedRegex": "^/scholarship(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }, { "page": "/smartasset-alternative", "regex": "^/smartasset\\-alternative(?:/)?$", "routeKeys": {}, "namedRegex": "^/smartasset\\-alternative(?:/)?$" }, { "page": "/tax-data", "regex": "^/tax\\-data(?:/)?$", "routeKeys": {}, "namedRegex": "^/tax\\-data(?:/)?$" }, { "page": "/tax-professionals", "regex": "^/tax\\-professionals(?:/)?$", "routeKeys": {}, "namedRegex": "^/tax\\-professionals(?:/)?$" }, { "page": "/terms", "regex": "^/terms(?:/)?$", "routeKeys": {}, "namedRegex": "^/terms(?:/)?$" }, { "page": "/widgets", "regex": "^/widgets(?:/)?$", "routeKeys": {}, "namedRegex": "^/widgets(?:/)?$" }], "dynamic": [{ "page": "/api/ads/[id]", "regex": "^/api/ads/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/ads/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/blog/[slug]", "regex": "^/api/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/api/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/api/links/[id]", "regex": "^/api/links/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/links/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/blog/[slug]", "regex": "^/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/compare/[states]", "regex": "^/compare/([^/]+?)(?:/)?$", "routeKeys": { "nxtPstates": "nxtPstates" }, "namedRegex": "^/compare/(?<nxtPstates>[^/]+?)(?:/)?$" }, { "page": "/research/[slug]", "regex": "^/research/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/research/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/salary/[amount]", "regex": "^/salary/([^/]+?)(?:/)?$", "routeKeys": { "nxtPamount": "nxtPamount" }, "namedRegex": "^/salary/(?<nxtPamount>[^/]+?)(?:/)?$" }, { "page": "/sales-tax-calculator/[state]", "regex": "^/sales\\-tax\\-calculator/([^/]+?)(?:/)?$", "routeKeys": { "nxtPstate": "nxtPstate" }, "namedRegex": "^/sales\\-tax\\-calculator/(?<nxtPstate>[^/]+?)(?:/)?$" }, { "page": "/[calculator]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPcalculator": "nxtPcalculator" }, "namedRegex": "^/(?<nxtPcalculator>[^/]+?)(?:/)?$" }, { "page": "/[calculator]/opengraph-image", "regex": "^/([^/]+?)/opengraph\\-image(?:/)?$", "routeKeys": { "nxtPcalculator": "nxtPcalculator" }, "namedRegex": "^/(?<nxtPcalculator>[^/]+?)/opengraph\\-image(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
    ConfigHeaders = [];
    PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/401k-retirement-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/401k-retirement-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/alabama-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/alabama-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/alaska-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/alaska-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/arizona-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/arizona-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/arkansas-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/arkansas-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/bonus-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/bonus-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/california-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/california-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/capital-gains-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/capital-gains-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/chicago-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/chicago-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/colorado-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/colorado-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/connecticut-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/connecticut-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/delaware-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/delaware-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/employee-cost-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/employee-cost-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/florida-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/florida-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/georgia-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/georgia-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/hawaii-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/hawaii-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/idaho-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/idaho-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/illinois-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/illinois-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/indiana-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/indiana-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/iowa-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/iowa-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/irs-withholding-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/irs-withholding-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/kansas-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/kansas-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/kentucky-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/kentucky-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/los-angeles-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/los-angeles-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/lottery-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/lottery-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/louisiana-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/louisiana-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/maine-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/maine-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/maryland-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/maryland-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/massachusetts-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/massachusetts-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/michigan-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/michigan-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/minnesota-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/minnesota-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/mississippi-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/mississippi-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/missouri-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/missouri-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/montana-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/montana-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/mortgage-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/mortgage-calculator", "dataRoute": "/mortgage-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/nebraska-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/nebraska-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/nevada-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/nevada-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-hampshire-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-hampshire-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-jersey-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-jersey-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-mexico-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-mexico-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-york-city-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-york-city-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-york-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-york-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/north-carolina-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/north-carolina-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/north-dakota-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/north-dakota-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/ohio-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/ohio-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/oklahoma-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/oklahoma-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/oregon-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/oregon-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/overtime-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/overtime-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/paycheck-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/paycheck-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/pennsylvania-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/pennsylvania-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/property-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/property-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/relocation-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/relocation-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/rhode-island-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/rhode-island-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/sales-tax-calculator", "dataRoute": "/sales-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/self-employment-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/self-employment-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/south-carolina-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/south-carolina-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/south-dakota-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/south-dakota-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tax-refund-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/tax-refund-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tennessee-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/tennessee-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/texas-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/texas-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/utah-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/utah-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/vermont-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/vermont-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/virginia-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/virginia-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/washington-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/washington-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/west-virginia-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/west-virginia-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/wisconsin-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/wisconsin-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/wyoming-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/wyoming-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/about": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/about", "dataRoute": "/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin", "dataRoute": "/admin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/settings": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/settings", "dataRoute": "/admin/settings.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/1099-tax-guide-self-employed-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/1099-tax-guide-self-employed-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/2026-federal-tax-brackets-explained": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/2026-federal-tax-brackets-explained.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/2026-self-employed-tax-refund-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/2026-self-employed-tax-refund-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/2026-w2-tax-refund-calculator-guide": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/2026-w2-tax-refund-calculator-guide.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/401k-withdrawal-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/401k-withdrawal-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/401k-withdrawal-tax-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/401k-withdrawal-tax-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/alameda-county-property-tax-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/alameda-county-property-tax-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/amended-tax-return-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/amended-tax-return-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/best-tax-preparer-near-me-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/best-tax-preparer-near-me-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/brian-kemp-income-tax-rebates-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/brian-kemp-income-tax-rebates-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/california-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/california-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/doordash-taxes-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/doordash-taxes-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/federal-income-tax-rate-calculator-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/federal-income-tax-rate-calculator-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/federal-tax-brackets-2026-guide": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/federal-tax-brackets-2026-guide.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/florida-vs-texas-tax-comparison": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/florida-vs-texas-tax-comparison.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/free-tax-calculator-no-signup-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/free-tax-calculator-no-signup-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/hourly-wage-after-tax-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/hourly-wage-after-tax-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/how-bonuses-are-taxed-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/how-bonuses-are-taxed-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/how-fica-taxes-work-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/how-fica-taxes-work-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/how-much-tax-will-i-owe-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/how-much-tax-will-i-owe-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/illinois-income-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/illinois-income-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/inheritance-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/inheritance-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/inheritance-tax-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/inheritance-tax-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/irs-tax-refund-schedule-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/irs-tax-refund-schedule-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/irs-withholding-w4-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/irs-withholding-w4-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/lottery-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/lottery-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/new-york-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/new-york-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/no-tax-on-overtime-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/no-tax-on-overtime-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/oasdi-tax-explained-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/oasdi-tax-explained-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/obbba-tax-refund-impact-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/obbba-tax-refund-impact-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/property-tax-by-state-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/property-tax-by-state-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/rd-tax-credit-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/rd-tax-credit-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/retirement-tax-planning-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/retirement-tax-planning-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/reverse-sales-tax-calculator-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/reverse-sales-tax-calculator-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/robux-tax-calculator-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/robux-tax-calculator-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/sales-tax-by-state-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/sales-tax-by-state-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/sep-ira-solo-401k-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/sep-ira-solo-401k-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/social-security-tax-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/social-security-tax-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/spreadsheet-formula-to-calculate-income-tax-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/spreadsheet-formula-to-calculate-income-tax-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/take-home-pay-calculator-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/take-home-pay-calculator-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/tax-questions-answered-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/tax-questions-answered-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/tax-refund-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/tax-refund-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/texas-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/texas-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/turbotax-lawsuit-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/turbotax-lawsuit-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/washington-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/washington-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/what-is-taxable-income-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/what-is-taxable-income-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/why-texas-has-no-income-tax": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/why-texas-has-no-income-tax.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog", "dataRoute": "/blog.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/california-vs-new-york": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/california-vs-new-york.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/florida-vs-california": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/florida-vs-california.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/florida-vs-new-york": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/florida-vs-new-york.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/illinois-vs-california": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/illinois-vs-california.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/illinois-vs-florida": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/illinois-vs-florida.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/illinois-vs-new-york": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/illinois-vs-new-york.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/illinois-vs-texas": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/illinois-vs-texas.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/texas-vs-california": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/texas-vs-california.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/texas-vs-florida": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/texas-vs-florida.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/texas-vs-new-york": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/texas-vs-new-york.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/compare", "dataRoute": "/compare.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/federal-tax-brackets": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/federal-tax-brackets", "dataRoute": "/federal-tax-brackets.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/freefile-irs": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/freefile-irs", "dataRoute": "/freefile-irs.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/glossary": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/glossary", "dataRoute": "/glossary.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/home-sale-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/home-sale-tax-calculator", "dataRoute": "/home-sale-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/job-offer-comparison-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/job-offer-comparison-calculator", "dataRoute": "/job-offer-comparison-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/methodology": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/methodology", "dataRoute": "/methodology.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/obbba-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/obbba-tax-calculator", "dataRoute": "/obbba-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/paycheck-difference-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/paycheck-difference-calculator", "dataRoute": "/paycheck-difference-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/privacy": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/privacy", "dataRoute": "/privacy.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/2026-state-tax-burden": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/2026-state-tax-burden.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/best-states-for-remote-workers-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/best-states-for-remote-workers-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/child-tax-credit-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/child-tax-credit-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/property-tax-by-state-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/property-tax-by-state-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/salary-needed-to-live-comfortably-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/salary-needed-to-live-comfortably-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/tax-refund-statistics-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/tax-refund-statistics-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research", "dataRoute": "/research.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/resources": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/resources", "dataRoute": "/resources.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary-comparison-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/salary-comparison-calculator", "dataRoute": "/salary-comparison-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/100000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/100000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/100000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/100000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/110000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/110000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/110000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/110000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/120000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/120000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/120000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/120000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/130000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/130000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/130000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/130000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/140000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/140000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/140000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/140000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/150000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/150000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/150000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/150000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/175000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/175000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/175000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/175000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/200000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/200000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/200000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/200000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/250000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/250000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/250000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/250000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/30000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/30000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/30000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/30000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/300000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/300000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/300000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/300000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/35000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/35000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/35000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/35000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/40000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/40000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/40000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/40000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/400000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/400000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/400000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/400000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/45000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/45000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/45000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/45000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/50000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/50000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/50000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/50000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/500000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/500000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/500000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/500000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/55000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/55000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/55000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/55000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/60000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/60000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/60000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/60000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/65000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/65000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/65000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/65000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/70000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/70000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/70000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/70000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/75000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/75000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/75000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/75000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/80000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/80000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/80000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/80000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/85000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/85000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/85000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/85000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/90000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/90000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/90000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/90000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/95000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/95000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/95000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/95000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/salary", "dataRoute": "/salary.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/alabama": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/alabama.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/alaska": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/alaska.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/arizona": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/arizona.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/arkansas": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/arkansas.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/california": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/california.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/colorado": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/colorado.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/connecticut": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/connecticut.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/delaware": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/delaware.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/florida": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/florida.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/georgia": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/georgia.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/hawaii": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/hawaii.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/idaho": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/idaho.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/illinois": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/illinois.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/indiana": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/indiana.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/iowa": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/iowa.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/kansas": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/kansas.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/kentucky": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/kentucky.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/louisiana": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/louisiana.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/maine": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/maine.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/maryland": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/maryland.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/massachusetts": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/massachusetts.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/michigan": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/michigan.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/minnesota": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/minnesota.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/mississippi": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/mississippi.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/missouri": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/missouri.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/montana": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/montana.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/nebraska": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/nebraska.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/nevada": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/nevada.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/newhampshire": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/newhampshire.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/newjersey": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/newjersey.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/newmexico": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/newmexico.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/newyork": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/newyork.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/northcarolina": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/northcarolina.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/northdakota": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/northdakota.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/ohio": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/ohio.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/oklahoma": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/oklahoma.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/oregon": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/oregon.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/pennsylvania": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/pennsylvania.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/rhodeisland": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/rhodeisland.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/southcarolina": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/southcarolina.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/southdakota": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/southdakota.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/tennessee": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/tennessee.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/texas": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/texas.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/utah": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/utah.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/vermont": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/vermont.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/virginia": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/virginia.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/washington": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/washington.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/westvirginia": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/westvirginia.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/wisconsin": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/wisconsin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/wyoming": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/wyoming.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/scholarship": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/scholarship", "dataRoute": "/scholarship.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/smartasset-alternative": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/smartasset-alternative", "dataRoute": "/smartasset-alternative.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tax-data": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/tax-data", "dataRoute": "/tax-data.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tax-professionals": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/tax-professionals", "dataRoute": "/tax-professionals.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/terms": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/terms", "dataRoute": "/terms.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/widgets": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/widgets", "dataRoute": "/widgets.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": { "/[calculator]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/([^/]+?)(?:/)?$", "dataRoute": "/[calculator].rsc", "fallback": null, "fallbackRouteParams": [], "dataRouteRegex": "^/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/[slug]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/blog/([^/]+?)(?:/)?$", "dataRoute": "/blog/[slug].rsc", "fallback": null, "fallbackRouteParams": [], "dataRouteRegex": "^/blog/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/[states]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/compare/([^/]+?)(?:/)?$", "dataRoute": "/compare/[states].rsc", "fallback": false, "fallbackRouteParams": [], "dataRouteRegex": "^/compare/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/[slug]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/research/([^/]+?)(?:/)?$", "dataRoute": "/research/[slug].rsc", "fallback": null, "fallbackRouteParams": [], "dataRouteRegex": "^/research/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/[amount]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/salary/([^/]+?)(?:/)?$", "dataRoute": "/salary/[amount].rsc", "fallback": false, "fallbackRouteParams": [], "dataRouteRegex": "^/salary/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/[state]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/sales\\-tax\\-calculator/([^/]+?)(?:/)?$", "dataRoute": "/sales-tax-calculator/[state].rsc", "fallback": false, "fallbackRouteParams": [], "dataRouteRegex": "^/sales\\-tax\\-calculator/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "notFoundRoutes": [], "preview": { "previewModeId": "e27f29412d99f5f4805640032ffbe79f", "previewModeSigningKey": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138", "previewModeEncryptionKey": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057" } };
    AppPathsManifestKeys = ["/[calculator]/opengraph-image/route", "/[calculator]", "/_global-error", "/_not-found", "/about", "/admin", "/admin/settings", "/api/admin/db-status/route", "/api/admin/seed-db/route", "/api/admin/stats/route", "/api/ads/[id]/route", "/api/ads/route", "/api/auth/login/route", "/api/auth/logout/route", "/api/auth/verify/route", "/api/blog/[slug]/route", "/api/blog/route", "/api/indexnow/route", "/api/links/[id]/route", "/api/links/route", "/api/ping-search-engines/route", "/api/route", "/api/seed/route", "/api/settings/route", "/api/track/route", "/apple-icon/route", "/blog/[slug]", "/blog", "/compare/[states]", "/compare", "/federal-tax-brackets", "/feed.xml/route", "/freefile-irs", "/glossary", "/home-sale-tax-calculator", "/icon/route", "/job-offer-comparison-calculator", "/methodology", "/mortgage-calculator", "/obbba-tax-calculator", "/opengraph-image/route", "/", "/paycheck-difference-calculator", "/privacy", "/research/[slug]", "/research", "/resources", "/salary-comparison-calculator", "/salary/[amount]", "/salary", "/sales-tax-calculator/[state]", "/sales-tax-calculator", "/scholarship", "/sitemap.xml/route", "/smartasset-alternative", "/tax-data", "/tax-professionals", "/terms", "/widgets"];
    MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__cfc6ad0d._.js", "server/edge/chunks/node_modules_next_dist_95e2512a._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_e42258fc.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } } }, "sortedMiddleware": ["/"], "functions": { "/[calculator]/opengraph-image/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/[calculator]/opengraph-image/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_[calculator]_opengraph-image_route_actions_2853f641.js", "server/edge/chunks/[root-of-the-server]__ab5148c6._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_calculator-routes_ts_7199c030._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0f75c5f1.js"], "name": "app/[calculator]/opengraph-image/route", "page": "/[calculator]/opengraph-image/route", "matchers": [{ "regexp": "^/(?P<nxtPcalculator>[^/]+?)/opengraph-image(?:/)?$", "originalSource": "/[calculator]/opengraph-image" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/admin/db-status/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/db-status/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_db-status_route_actions_95ec4087.js", "server/edge/chunks/[root-of-the-server]__48e60a4b._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_7df55839.js"], "name": "app/api/admin/db-status/route", "page": "/api/admin/db-status/route", "matchers": [{ "regexp": "^/api/admin/db-status(?:/)?$", "originalSource": "/api/admin/db-status" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/admin/seed-db/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/seed-db/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_seed-db_route_actions_b25752ff.js", "server/edge/chunks/[root-of-the-server]__342a8256._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_bc68ccae.js"], "name": "app/api/admin/seed-db/route", "page": "/api/admin/seed-db/route", "matchers": [{ "regexp": "^/api/admin/seed-db(?:/)?$", "originalSource": "/api/admin/seed-db" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/admin/stats/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/stats/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_stats_route_actions_8cf16d9f.js", "server/edge/chunks/[root-of-the-server]__ac52a9ad._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_ef249a77.js"], "name": "app/api/admin/stats/route", "page": "/api/admin/stats/route", "matchers": [{ "regexp": "^/api/admin/stats(?:/)?$", "originalSource": "/api/admin/stats" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/ads/[id]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/ads/[id]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_ads_[id]_route_actions_e6603297.js", "server/edge/chunks/[root-of-the-server]__094c29aa._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_39478c0a.js"], "name": "app/api/ads/[id]/route", "page": "/api/ads/[id]/route", "matchers": [{ "regexp": "^/api/ads/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/api/ads/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/ads/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/ads/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_ads_route_actions_d7e2770a.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/[root-of-the-server]__f2eb8c23._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_ed609ccd.js"], "name": "app/api/ads/route", "page": "/api/ads/route", "matchers": [{ "regexp": "^/api/ads(?:/)?$", "originalSource": "/api/ads" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/auth/login/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/login/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_login_route_actions_1d2c0e30.js", "server/edge/chunks/[root-of-the-server]__914dc13f._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_5b6d2d91.js"], "name": "app/api/auth/login/route", "page": "/api/auth/login/route", "matchers": [{ "regexp": "^/api/auth/login(?:/)?$", "originalSource": "/api/auth/login" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/auth/logout/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/logout/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_logout_route_actions_165a006f.js", "server/edge/chunks/[root-of-the-server]__62a0383f._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_19cee914.js"], "name": "app/api/auth/logout/route", "page": "/api/auth/logout/route", "matchers": [{ "regexp": "^/api/auth/logout(?:/)?$", "originalSource": "/api/auth/logout" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/auth/verify/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/verify/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_verify_route_actions_44d57928.js", "server/edge/chunks/[root-of-the-server]__1a1d42c7._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_a54b43b3.js"], "name": "app/api/auth/verify/route", "page": "/api/auth/verify/route", "matchers": [{ "regexp": "^/api/auth/verify(?:/)?$", "originalSource": "/api/auth/verify" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/blog/[slug]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/blog/[slug]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_blog_[slug]_route_actions_d27ac498.js", "server/edge/chunks/[root-of-the-server]__fe5bb938._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_741604d3.js"], "name": "app/api/blog/[slug]/route", "page": "/api/blog/[slug]/route", "matchers": [{ "regexp": "^/api/blog/(?P<nxtPslug>[^/]+?)(?:/)?$", "originalSource": "/api/blog/[slug]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/blog/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/blog/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_blog_route_actions_b43091c1.js", "server/edge/chunks/[root-of-the-server]__adb6a46b._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_bbb16de2.js"], "name": "app/api/blog/route", "page": "/api/blog/route", "matchers": [{ "regexp": "^/api/blog(?:/)?$", "originalSource": "/api/blog" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/indexnow/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/indexnow/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_indexnow_route_actions_e95a0d92.js", "server/edge/chunks/[root-of-the-server]__f9d9d48c._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_4d76d002.js", "server/edge/chunks/src_lib_calculator-routes_ts_7199c030._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_77498897.js"], "name": "app/api/indexnow/route", "page": "/api/indexnow/route", "matchers": [{ "regexp": "^/api/indexnow(?:/)?$", "originalSource": "/api/indexnow" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/links/[id]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/links/[id]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_links_[id]_route_actions_2c4f7cf6.js", "server/edge/chunks/[root-of-the-server]__3f168991._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_030172aa.js"], "name": "app/api/links/[id]/route", "page": "/api/links/[id]/route", "matchers": [{ "regexp": "^/api/links/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/api/links/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/links/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/links/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_links_route_actions_c7da0871.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/[root-of-the-server]__55ee2134._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_7f840e6f.js"], "name": "app/api/links/route", "page": "/api/links/route", "matchers": [{ "regexp": "^/api/links(?:/)?$", "originalSource": "/api/links" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/ping-search-engines/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/ping-search-engines/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_ping-search-engines_route_actions_44b939bb.js", "server/edge/chunks/[root-of-the-server]__c8704db7._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_4a9b10a7.js"], "name": "app/api/ping-search-engines/route", "page": "/api/ping-search-engines/route", "matchers": [{ "regexp": "^/api/ping-search-engines(?:/)?$", "originalSource": "/api/ping-search-engines" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_route_actions_ff157ba0.js", "server/edge/chunks/[root-of-the-server]__604b579e._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_6675f0ce.js"], "name": "app/api/route", "page": "/api/route", "matchers": [{ "regexp": "^/api(?:/)?$", "originalSource": "/api" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/seed/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/seed/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_seed_route_actions_27658aa0.js", "server/edge/chunks/[root-of-the-server]__8dd33c78._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_5c742a3f.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_97f63d91.js"], "name": "app/api/seed/route", "page": "/api/seed/route", "matchers": [{ "regexp": "^/api/seed(?:/)?$", "originalSource": "/api/seed" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/settings/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/settings/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_settings_route_actions_26007c96.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/[root-of-the-server]__ac76dffa._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_bdf0ee1e.js"], "name": "app/api/settings/route", "page": "/api/settings/route", "matchers": [{ "regexp": "^/api/settings(?:/)?$", "originalSource": "/api/settings" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/track/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/track/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_track_route_actions_f1b7e9cf.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/[root-of-the-server]__69c5fd3c._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_c7ea2f61.js"], "name": "app/api/track/route", "page": "/api/track/route", "matchers": [{ "regexp": "^/api/track(?:/)?$", "originalSource": "/api/track" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/apple-icon/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/apple-icon/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_apple-icon_route_actions_24ecdbff.js", "server/edge/chunks/[root-of-the-server]__3c08fbf7._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_a76704e1.js"], "name": "app/apple-icon/route", "page": "/apple-icon/route", "matchers": [{ "regexp": "^/apple-icon(?:/)?$", "originalSource": "/apple-icon" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/feed.xml/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/feed.xml/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_feed_xml_route_actions_bec217a0.js", "server/edge/chunks/[root-of-the-server]__6e159577._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/src_lib_calculator-routes_ts_7199c030._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_24a5c82a.js"], "name": "app/feed.xml/route", "page": "/feed.xml/route", "matchers": [{ "regexp": "^/feed\\.xml(?:/)?$", "originalSource": "/feed.xml" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/icon/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/icon/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_icon_route_actions_6c46f2f4.js", "server/edge/chunks/[root-of-the-server]__3a7fd026._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1524bd8c.js"], "name": "app/icon/route", "page": "/icon/route", "matchers": [{ "regexp": "^/icon(?:/)?$", "originalSource": "/icon" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/opengraph-image/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/opengraph-image/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_opengraph-image_route_actions_238d033d.js", "server/edge/chunks/[root-of-the-server]__9506cfda._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_96825c7c.js"], "name": "app/opengraph-image/route", "page": "/opengraph-image/route", "matchers": [{ "regexp": "^/opengraph-image(?:/)?$", "originalSource": "/opengraph-image" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } } } };
    AppPathsManifest = { "/[calculator]/opengraph-image/route": "app-edge-has-no-entrypoint", "/[calculator]/page": "app/[calculator]/page.js", "/_global-error/page": "app/_global-error/page.js", "/_not-found/page": "app/_not-found/page.js", "/about/page": "app/about/page.js", "/admin/page": "app/admin/page.js", "/admin/settings/page": "app/admin/settings/page.js", "/api/admin/db-status/route": "app-edge-has-no-entrypoint", "/api/admin/seed-db/route": "app-edge-has-no-entrypoint", "/api/admin/stats/route": "app-edge-has-no-entrypoint", "/api/ads/[id]/route": "app-edge-has-no-entrypoint", "/api/ads/route": "app-edge-has-no-entrypoint", "/api/auth/login/route": "app-edge-has-no-entrypoint", "/api/auth/logout/route": "app-edge-has-no-entrypoint", "/api/auth/verify/route": "app-edge-has-no-entrypoint", "/api/blog/[slug]/route": "app-edge-has-no-entrypoint", "/api/blog/route": "app-edge-has-no-entrypoint", "/api/indexnow/route": "app-edge-has-no-entrypoint", "/api/links/[id]/route": "app-edge-has-no-entrypoint", "/api/links/route": "app-edge-has-no-entrypoint", "/api/ping-search-engines/route": "app-edge-has-no-entrypoint", "/api/route": "app-edge-has-no-entrypoint", "/api/seed/route": "app-edge-has-no-entrypoint", "/api/settings/route": "app-edge-has-no-entrypoint", "/api/track/route": "app-edge-has-no-entrypoint", "/apple-icon/route": "app-edge-has-no-entrypoint", "/blog/[slug]/page": "app/blog/[slug]/page.js", "/blog/page": "app/blog/page.js", "/compare/[states]/page": "app/compare/[states]/page.js", "/compare/page": "app/compare/page.js", "/federal-tax-brackets/page": "app/federal-tax-brackets/page.js", "/feed.xml/route": "app-edge-has-no-entrypoint", "/freefile-irs/page": "app/freefile-irs/page.js", "/glossary/page": "app/glossary/page.js", "/home-sale-tax-calculator/page": "app/home-sale-tax-calculator/page.js", "/icon/route": "app-edge-has-no-entrypoint", "/job-offer-comparison-calculator/page": "app/job-offer-comparison-calculator/page.js", "/methodology/page": "app/methodology/page.js", "/mortgage-calculator/page": "app/mortgage-calculator/page.js", "/obbba-tax-calculator/page": "app/obbba-tax-calculator/page.js", "/opengraph-image/route": "app-edge-has-no-entrypoint", "/page": "app/page.js", "/paycheck-difference-calculator/page": "app/paycheck-difference-calculator/page.js", "/privacy/page": "app/privacy/page.js", "/research/[slug]/page": "app/research/[slug]/page.js", "/research/page": "app/research/page.js", "/resources/page": "app/resources/page.js", "/salary-comparison-calculator/page": "app/salary-comparison-calculator/page.js", "/salary/[amount]/page": "app/salary/[amount]/page.js", "/salary/page": "app/salary/page.js", "/sales-tax-calculator/[state]/page": "app/sales-tax-calculator/[state]/page.js", "/sales-tax-calculator/page": "app/sales-tax-calculator/page.js", "/scholarship/page": "app/scholarship/page.js", "/sitemap.xml/route": "app/sitemap.xml/route.js", "/smartasset-alternative/page": "app/smartasset-alternative/page.js", "/tax-data/page": "app/tax-data/page.js", "/tax-professionals/page": "app/tax-professionals/page.js", "/terms/page": "app/terms/page.js", "/widgets/page": "app/widgets/page.js" };
    AppPathRoutesManifest = { "/[calculator]/opengraph-image/route": "/[calculator]/opengraph-image", "/[calculator]/page": "/[calculator]", "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/about/page": "/about", "/admin/page": "/admin", "/admin/settings/page": "/admin/settings", "/api/admin/db-status/route": "/api/admin/db-status", "/api/admin/seed-db/route": "/api/admin/seed-db", "/api/admin/stats/route": "/api/admin/stats", "/api/ads/[id]/route": "/api/ads/[id]", "/api/ads/route": "/api/ads", "/api/auth/login/route": "/api/auth/login", "/api/auth/logout/route": "/api/auth/logout", "/api/auth/verify/route": "/api/auth/verify", "/api/blog/[slug]/route": "/api/blog/[slug]", "/api/blog/route": "/api/blog", "/api/indexnow/route": "/api/indexnow", "/api/links/[id]/route": "/api/links/[id]", "/api/links/route": "/api/links", "/api/ping-search-engines/route": "/api/ping-search-engines", "/api/route": "/api", "/api/seed/route": "/api/seed", "/api/settings/route": "/api/settings", "/api/track/route": "/api/track", "/apple-icon/route": "/apple-icon", "/blog/[slug]/page": "/blog/[slug]", "/blog/page": "/blog", "/compare/[states]/page": "/compare/[states]", "/compare/page": "/compare", "/federal-tax-brackets/page": "/federal-tax-brackets", "/feed.xml/route": "/feed.xml", "/freefile-irs/page": "/freefile-irs", "/glossary/page": "/glossary", "/home-sale-tax-calculator/page": "/home-sale-tax-calculator", "/icon/route": "/icon", "/job-offer-comparison-calculator/page": "/job-offer-comparison-calculator", "/methodology/page": "/methodology", "/mortgage-calculator/page": "/mortgage-calculator", "/obbba-tax-calculator/page": "/obbba-tax-calculator", "/opengraph-image/route": "/opengraph-image", "/page": "/", "/paycheck-difference-calculator/page": "/paycheck-difference-calculator", "/privacy/page": "/privacy", "/research/[slug]/page": "/research/[slug]", "/research/page": "/research", "/resources/page": "/resources", "/salary-comparison-calculator/page": "/salary-comparison-calculator", "/salary/[amount]/page": "/salary/[amount]", "/salary/page": "/salary", "/sales-tax-calculator/[state]/page": "/sales-tax-calculator/[state]", "/sales-tax-calculator/page": "/sales-tax-calculator", "/scholarship/page": "/scholarship", "/sitemap.xml/route": "/sitemap.xml", "/smartasset-alternative/page": "/smartasset-alternative", "/tax-data/page": "/tax-data", "/tax-professionals/page": "/tax-professionals", "/terms/page": "/terms", "/widgets/page": "/widgets" };
    FunctionsConfigManifest = { "version": 1, "functions": { "/[calculator]/opengraph-image": {}, "/api": {}, "/api/admin/db-status": {}, "/api/admin/seed-db": {}, "/api/admin/stats": {}, "/api/ads": {}, "/api/ads/[id]": {}, "/api/auth/login": {}, "/api/auth/logout": {}, "/api/auth/verify": {}, "/api/blog": {}, "/api/blog/[slug]": {}, "/api/indexnow": {}, "/api/links": {}, "/api/links/[id]": {}, "/api/ping-search-engines": {}, "/api/seed": {}, "/api/settings": {}, "/api/track": {}, "/apple-icon": {}, "/feed.xml": {}, "/icon": {}, "/opengraph-image": {} } };
    PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
    process.env.NEXT_BUILD_ID = BuildId;
    process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
    process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;
  }
});

// node-built-in-modules:node:module
var node_module_exports = {};
import * as node_module_star from "node:module";
var init_node_module = __esm({
  "node-built-in-modules:node:module"() {
    __reExport(node_module_exports, node_module_star);
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-node.js
var cloudflare_node_exports = {};
__export(cloudflare_node_exports, {
  default: () => cloudflare_node_default
});
import { Writable } from "node:stream";
var NULL_BODY_STATUSES2, handler, cloudflare_node_default;
var init_cloudflare_node = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-node.js"() {
    NULL_BODY_STATUSES2 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    handler = async (handler3, converter2) => async (request, env, ctx, abortSignal) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const url = new URL(request.url);
      const { promise: promiseResponse, resolve: resolveResponse } = Promise.withResolvers();
      const streamCreator = {
        writeHeaders(prelude) {
          const { statusCode, cookies, headers } = prelude;
          const responseHeaders = new Headers(headers);
          for (const cookie of cookies) {
            responseHeaders.append("Set-Cookie", cookie);
          }
          if (url.hostname === "localhost") {
            responseHeaders.set("Content-Encoding", "identity");
          }
          if (NULL_BODY_STATUSES2.has(statusCode)) {
            const response2 = new Response(null, {
              status: statusCode,
              headers: responseHeaders
            });
            resolveResponse(response2);
            return new Writable({
              write(chunk, encoding, callback) {
                callback();
              }
            });
          }
          let controller;
          const readable = new ReadableStream({
            start(c) {
              controller = c;
            }
          });
          const response = new Response(readable, {
            status: statusCode,
            headers: responseHeaders
          });
          resolveResponse(response);
          return new Writable({
            write(chunk, encoding, callback) {
              try {
                controller.enqueue(chunk);
              } catch (e) {
                return callback(e);
              }
              callback();
            },
            final(callback) {
              controller.close();
              callback();
            },
            destroy(error2, callback) {
              if (error2) {
                controller.error(error2);
              } else {
                try {
                  controller.close();
                } catch {
                }
              }
              callback(error2);
            }
          });
        },
        // This is for passing along the original abort signal from the initial Request you retrieve in your worker
        // Ensures that the response we pass to NextServer is aborted if the request is aborted
        // By doing this `request.signal.onabort` will work in route handlers
        abortSignal,
        // There is no need to retain the chunks that were pushed to the response stream.
        retainChunks: false
      };
      ctx.waitUntil(handler3(internalEvent, {
        streamCreator,
        waitUntil: ctx.waitUntil.bind(ctx)
      }));
      return promiseResponse;
    };
    cloudflare_node_default = {
      wrapper: handler,
      name: "cloudflare-node",
      supportStreaming: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/tagCache/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var dummyTagCache, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/tagCache/dummy.js"() {
    dummyTagCache = {
      name: "dummy",
      mode: "original",
      getByPath: async () => {
        return [];
      },
      getByTag: async () => {
        return [];
      },
      getLastModified: async (_, lastModified) => {
        return lastModified ?? Date.now();
      },
      writeTags: async () => {
        return;
      },
      isStale: async (_path) => {
        return false;
      }
    };
    dummy_default = dummyTagCache;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/queue/direct.js
var direct_exports = {};
__export(direct_exports, {
  default: () => direct_default
});
var queue, direct_default;
var init_direct = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/queue/direct.js"() {
    queue = {
      name: "dev-queue",
      send: async (message) => {
        const prerenderManifest = (await Promise.resolve().then(() => (init_config(), config_exports))).PrerenderManifest;
        const { host, url } = message.MessageBody;
        const protocol = host.includes("localhost") ? "http" : "https";
        const revalidateId = prerenderManifest.preview.previewModeId;
        await globalThis.internalFetch(`${protocol}://${host}${url}`, {
          method: "HEAD",
          headers: {
            "x-prerender-revalidate": revalidateId,
            "x-isr": "1"
          }
        });
      }
    };
    direct_default = queue;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/incrementalCache/dummy.js
var dummy_exports2 = {};
__export(dummy_exports2, {
  default: () => dummy_default2
});
var dummyIncrementalCache, dummy_default2;
var init_dummy2 = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/incrementalCache/dummy.js"() {
    init_error();
    dummyIncrementalCache = {
      name: "dummy",
      get: async () => {
        throw new IgnorableError('"Dummy" cache does not cache anything');
      },
      set: async () => {
        throw new IgnorableError('"Dummy" cache does not cache anything');
      },
      delete: async () => {
        throw new IgnorableError('"Dummy" cache does not cache anything');
      }
    };
    dummy_default2 = dummyIncrementalCache;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports3 = {};
__export(dummy_exports3, {
  default: () => dummy_default3
});
var resolver, dummy_default3;
var init_dummy3 = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default3 = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/cdnInvalidation/dummy.js
var dummy_exports4 = {};
__export(dummy_exports4, {
  default: () => dummy_default4
});
var dummy_default4;
var init_dummy4 = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/cdnInvalidation/dummy.js"() {
    dummy_default4 = {
      name: "dummy",
      invalidatePaths: (_) => {
        return Promise.resolve();
      }
    };
  }
});

// node_modules/@opennextjs/aws/dist/core/createMainHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/adapters/util.js
function setNodeEnv() {
  const processEnv = process.env;
  processEnv.NODE_ENV = process.env.NODE_ENV ?? "production";
}
function generateUniqueId() {
  return Math.random().toString(36).slice(2, 8);
}

// node_modules/@opennextjs/aws/dist/core/requestHandler.js
import { AsyncLocalStorage } from "node:async_hooks";

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";
var SET_COOKIE_HEADER = "set-cookie";
var CANNOT_BE_USED = "This cannot be used in OpenNext";
var OpenNextNodeResponse = class extends Transform {
  fixHeadersFn;
  onEnd;
  streamCreator;
  initialHeaders;
  statusCode;
  statusMessage = "";
  headers = {};
  headersSent = false;
  _chunks = [];
  headersAlreadyFixed = false;
  _cookies = [];
  responseStream;
  bodyLength = 0;
  // To comply with the ServerResponse interface :
  strictContentLength = false;
  assignSocket(_socket) {
    throw new Error(CANNOT_BE_USED);
  }
  detachSocket(_socket) {
    throw new Error(CANNOT_BE_USED);
  }
  // We might have to revisit those 3 in the future
  writeContinue(_callback) {
    throw new Error(CANNOT_BE_USED);
  }
  writeEarlyHints(_hints, _callback) {
    throw new Error(CANNOT_BE_USED);
  }
  writeProcessing() {
    throw new Error(CANNOT_BE_USED);
  }
  /**
   * This is a dummy request object to comply with the ServerResponse interface
   * It will never be defined
   */
  req;
  chunkedEncoding = false;
  shouldKeepAlive = true;
  useChunkedEncodingByDefault = true;
  sendDate = false;
  connection = null;
  socket = null;
  setTimeout(_msecs, _callback) {
    throw new Error(CANNOT_BE_USED);
  }
  addTrailers(_headers) {
    throw new Error(CANNOT_BE_USED);
  }
  constructor(fixHeadersFn, onEnd, streamCreator, initialHeaders, statusCode) {
    super();
    this.fixHeadersFn = fixHeadersFn;
    this.onEnd = onEnd;
    this.streamCreator = streamCreator;
    this.initialHeaders = initialHeaders;
    if (statusCode && Number.isInteger(statusCode) && statusCode >= 100 && statusCode <= 599) {
      this.statusCode = statusCode;
    }
    streamCreator?.abortSignal?.addEventListener("abort", () => {
      this.destroy();
    });
  }
  // Necessary for next 12
  // We might have to implement all the methods here
  get originalResponse() {
    return this;
  }
  get finished() {
    return this.responseStream ? this.responseStream?.writableFinished : this.writableFinished;
  }
  setHeader(name, value) {
    const key = name.toLowerCase();
    if (key === SET_COOKIE_HEADER) {
      if (Array.isArray(value)) {
        this._cookies = value;
      } else {
        this._cookies = [value];
      }
    }
    this.headers[key] = value;
    return this;
  }
  removeHeader(name) {
    const key = name.toLowerCase();
    if (key === SET_COOKIE_HEADER) {
      this._cookies = [];
    } else {
      delete this.headers[key];
    }
    return this;
  }
  hasHeader(name) {
    const key = name.toLowerCase();
    if (key === SET_COOKIE_HEADER) {
      return this._cookies.length > 0;
    }
    return this.headers[key] !== void 0;
  }
  getHeaders() {
    return this.headers;
  }
  getHeader(name) {
    return this.headers[name.toLowerCase()];
  }
  getHeaderNames() {
    return Object.keys(this.headers);
  }
  // Only used directly in next@14+
  flushHeaders() {
    this.headersSent = true;
    const mergeHeadersPriority = globalThis.__openNextAls?.getStore()?.mergeHeadersPriority ?? "middleware";
    if (this.initialHeaders) {
      this.headers = mergeHeadersPriority === "middleware" ? {
        ...this.headers,
        ...this.initialHeaders
      } : {
        ...this.initialHeaders,
        ...this.headers
      };
      const initialCookies = parseSetCookieHeader(this.initialHeaders[SET_COOKIE_HEADER]?.toString());
      this._cookies = mergeHeadersPriority === "middleware" ? [...this._cookies, ...initialCookies] : [...initialCookies, ...this._cookies];
    }
    this.fixHeaders(this.headers);
    this.fixHeadersForError();
    this.headers[SET_COOKIE_HEADER] = this._cookies;
    const parsedHeaders = parseHeaders(this.headers);
    delete parsedHeaders[SET_COOKIE_HEADER];
    if (this.streamCreator) {
      this.responseStream = this.streamCreator?.writeHeaders({
        statusCode: this.statusCode ?? 200,
        cookies: this._cookies,
        headers: parsedHeaders
      });
      this.pipe(this.responseStream);
    }
  }
  appendHeader(name, value) {
    const key = name.toLowerCase();
    if (!this.hasHeader(key)) {
      return this.setHeader(key, value);
    }
    const existingHeader = this.getHeader(key);
    const toAppend = Array.isArray(value) ? value : [value];
    const newValue = Array.isArray(existingHeader) ? [...existingHeader, ...toAppend] : [existingHeader, ...toAppend];
    return this.setHeader(key, newValue);
  }
  writeHead(statusCode, statusMessage, headers) {
    let _headers = headers;
    let _statusMessage;
    if (typeof statusMessage === "string") {
      _statusMessage = statusMessage;
    } else {
      _headers = statusMessage;
    }
    const finalHeaders = this.headers;
    if (_headers) {
      if (Array.isArray(_headers)) {
        for (let i = 0; i < _headers.length; i += 2) {
          finalHeaders[_headers[i]] = _headers[i + 1];
        }
      } else {
        for (const key of Object.keys(_headers)) {
          finalHeaders[key] = _headers[key];
        }
      }
    }
    this.statusCode = statusCode;
    if (headers) {
      this.headers = finalHeaders;
    }
    this.flushHeaders();
    return this;
  }
  /**
   * OpenNext specific method
   */
  fixHeaders(headers) {
    if (this.headersAlreadyFixed) {
      return;
    }
    this.fixHeadersFn(headers);
    this.headersAlreadyFixed = true;
  }
  getFixedHeaders() {
    this.fixHeaders(this.headers);
    this.fixHeadersForError();
    this.headers[SET_COOKIE_HEADER] = this._cookies;
    return this.headers;
  }
  getBody() {
    return Buffer.concat(this._chunks);
  }
  _internalWrite(chunk, encoding) {
    const buffer = encoding === "buffer" ? chunk : Buffer.from(chunk, encoding);
    this.bodyLength += buffer.length;
    if (this.streamCreator?.retainChunks !== false) {
      this._chunks.push(buffer);
    }
    this.push(buffer);
    this.streamCreator?.onWrite?.();
  }
  _transform(chunk, encoding, callback) {
    if (!this.headersSent) {
      this.flushHeaders();
    }
    this._internalWrite(chunk, encoding);
    callback();
  }
  _flush(callback) {
    if (!this.headersSent) {
      this.flushHeaders();
    }
    globalThis.__openNextAls?.getStore()?.pendingPromiseRunner.add(this.onEnd(this.headers));
    this.streamCreator?.onFinish?.(this.bodyLength);
    if (this.bodyLength === 0 && // We use an env variable here because not all aws account have the same behavior
    // On some aws accounts the response will hang if the body is empty
    // We are modifying the response body here, this is not a good practice
    process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
      debug('Force writing "SOMETHING" to the response body');
      this.push("SOMETHING");
    }
    callback();
  }
  /**
   * New method in Node 18.15+
   * There are probably not used right now in Next.js, but better be safe than sorry
   */
  setHeaders(headers) {
    headers.forEach((value, key) => {
      this.setHeader(key, Array.isArray(value) ? value : value.toString());
    });
    return this;
  }
  /**
   * Next specific methods
   * On earlier versions of next.js, those methods are mandatory to make everything work
   */
  get sent() {
    return this.finished || this.headersSent;
  }
  getHeaderValues(name) {
    const values = this.getHeader(name);
    if (values === void 0)
      return void 0;
    return (Array.isArray(values) ? values : [values]).map((value) => value.toString());
  }
  send() {
    for (const chunk of this._chunks) {
      this.write(chunk);
    }
    this.end();
  }
  body(value) {
    this.write(value);
    return this;
  }
  onClose(callback) {
    this.on("close", callback);
  }
  redirect(destination, statusCode) {
    this.setHeader("Location", destination);
    this.statusCode = statusCode;
    if (statusCode === 308) {
      this.setHeader("Refresh", `0;url=${destination}`);
    }
    return this;
  }
  // For some reason, next returns the 500 error page with some cache-control headers
  // We need to fix that
  fixHeadersForError() {
    if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
      return;
    }
    if (this.statusCode === 404 || this.statusCode === 500) {
      this.headers["cache-control"] = "private, no-cache, no-store, max-age=0, must-revalidate";
    }
  }
};

// node_modules/@opennextjs/aws/dist/http/request.js
import http from "node:http";
var IncomingMessage = class extends http.IncomingMessage {
  constructor({ method, url, headers, body, remoteAddress }) {
    super({
      encrypted: true,
      readable: false,
      remoteAddress,
      address: () => ({ port: 443 }),
      end: Function.prototype,
      destroy: Function.prototype
    });
    if (body) {
      headers["content-length"] ??= String(Buffer.byteLength(body));
    }
    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: "1.1",
      httpVersionMajor: "1",
      httpVersionMinor: "1",
      method,
      headers,
      body,
      url
    });
    this._read = () => {
      this.push(body);
      this.push(null);
    };
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/core/requestHandler.js
init_config();
init_logger();

// node_modules/@opennextjs/aws/dist/core/patchAsyncStorage.js
var mod = (init_node_module(), __toCommonJS(node_module_exports));
var resolveFilename = mod._resolveFilename;

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
init_config();
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_config();
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path2) {
  return NextConfig.i18n?.locales.includes(path2.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function constructNextUrl(baseUrl, path2) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path2}`, baseUrl);
  return url.href;
}
function convertRes(res) {
  const statusCode = res.statusCode || 200;
  const headers = parseHeaders(res.getFixedHeaders());
  const isBase64Encoded = isBinaryContentType(headers["content-type"]) || !!headers["content-encoding"];
  const body = new ReadableStream3({
    pull(controller) {
      if (!res._chunks || res._chunks.length === 0) {
        controller.close();
        return;
      }
      controller.enqueue(res._chunks.shift());
    }
  });
  return {
    type: "core",
    statusCode,
    headers,
    body,
    isBase64Encoded
  };
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function convertToQuery(querystring) {
  if (!querystring)
    return {};
  const query = new URLSearchParams(querystring);
  const queryObject = {};
  for (const key of query.keys()) {
    const queries = query.getAll(key);
    queryObject[key] = queries.length > 1 ? queries : queries[0];
  }
  return queryObject;
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function fixCacheHeaderForHtmlPages(internalEvent, headers) {
  if (internalEvent.rawPath === "/404" || internalEvent.rawPath === "/500") {
    if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
      return;
    }
    headers[CommonHeaders.CACHE_CONTROL] = "private, no-cache, no-store, max-age=0, must-revalidate";
    return;
  }
  const localizedPath = localizePath(internalEvent);
  if (HtmlPages.includes(localizedPath) && !internalEvent.headers["x-middleware-prefetch"]) {
    headers[CommonHeaders.CACHE_CONTROL] = "public, max-age=0, s-maxage=31536000, must-revalidate";
  }
}
function fixSWRCacheHeader(headers) {
  let cacheControl = headers[CommonHeaders.CACHE_CONTROL];
  if (!cacheControl)
    return;
  if (Array.isArray(cacheControl)) {
    cacheControl = cacheControl.join(",");
  }
  if (typeof cacheControl !== "string")
    return;
  headers[CommonHeaders.CACHE_CONTROL] = cacheControl.replace(/\bstale-while-revalidate(?!=)/, "stale-while-revalidate=2592000");
}
function addOpenNextHeader(headers) {
  if (NextConfig.poweredByHeader) {
    headers["X-OpenNext"] = "1";
  }
  if (globalThis.openNextDebug) {
    headers["X-OpenNext-Version"] = globalThis.openNextVersion;
  }
  if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
    headers["X-OpenNext-RequestId"] = globalThis.__openNextAls.getStore()?.requestId;
  }
}
async function revalidateIfRequired(host, rawPath, headers, req) {
  if (headers[CommonHeaders.NEXT_CACHE] === "STALE") {
    const internalMeta = req?.[Symbol.for("NextInternalRequestMeta")];
    const revalidateUrl = internalMeta?._nextDidRewrite ? rawPath.startsWith("/_next/data/") ? `/_next/data/${BuildId}${internalMeta?._nextRewroteUrl}.json` : internalMeta?._nextRewroteUrl : rawPath;
    try {
      const hash = (str) => crypto.createHash("md5").update(str).digest("hex");
      const lastModified = globalThis.__openNextAls.getStore()?.lastModified ?? 0;
      const eTag = `${headers.etag ?? headers.ETag ?? ""}`;
      await globalThis.queue.send({
        MessageBody: { host, url: revalidateUrl, eTag, lastModified },
        MessageDeduplicationId: hash(`${rawPath}-${lastModified}-${eTag}`),
        MessageGroupId: generateMessageGroupId(rawPath)
      });
    } catch (e) {
      error(`Failed to revalidate stale page ${rawPath}`, e);
    }
  }
}
function fixISRHeaders(headers) {
  const sMaxAgeRegex = /s-maxage=(\d+)/;
  const match = headers[CommonHeaders.CACHE_CONTROL]?.match(sMaxAgeRegex);
  const sMaxAge = match ? Number.parseInt(match[1]) : void 0;
  if (!sMaxAge) {
    return;
  }
  if (headers[CommonHeaders.NEXT_CACHE] === "REVALIDATED") {
    headers[CommonHeaders.CACHE_CONTROL] = "private, no-cache, no-store, max-age=0, must-revalidate";
    return;
  }
  const _lastModified = globalThis.__openNextAls.getStore()?.lastModified ?? 0;
  if (headers[CommonHeaders.NEXT_CACHE] === "HIT" && _lastModified > 0) {
    debug("cache-control", headers[CommonHeaders.CACHE_CONTROL], _lastModified, Date.now());
    if (sMaxAge && sMaxAge !== 31536e3) {
      const age = Math.round((Date.now() - _lastModified) / 1e3);
      const remainingTtl = Math.max(sMaxAge - age, 1);
      headers[CommonHeaders.CACHE_CONTROL] = `s-maxage=${remainingTtl}, stale-while-revalidate=2592000`;
    }
  }
  if (headers[CommonHeaders.NEXT_CACHE] !== "STALE")
    return;
  headers[CommonHeaders.CACHE_CONTROL] = "s-maxage=2, stale-while-revalidate=2592000";
}
function createServerResponse(routingResult, headers, responseStream) {
  const internalEvent = routingResult.internalEvent;
  return new OpenNextNodeResponse((_headers) => {
    fixCacheHeaderForHtmlPages(internalEvent, _headers);
    fixSWRCacheHeader(_headers);
    addOpenNextHeader(_headers);
    fixISRHeaders(_headers);
  }, async (_headers) => {
    await revalidateIfRequired(internalEvent.headers.host, internalEvent.rawPath, _headers);
    await invalidateCDNOnRequest(routingResult, _headers);
  }, responseStream, headers, routingResult.rewriteStatusCode);
}
async function invalidateCDNOnRequest(params, headers) {
  const { internalEvent, resolvedRoutes, initialURL } = params;
  const initialPath = new URL(initialURL).pathname;
  const isIsrRevalidation = internalEvent.headers["x-isr"] === "1";
  if (!isIsrRevalidation && headers[CommonHeaders.NEXT_CACHE] === "REVALIDATED") {
    await globalThis.cdnInvalidationHandler.invalidatePaths([
      {
        initialPath,
        rawPath: internalEvent.rawPath,
        resolvedRoutes
      }
    ]);
  }
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_config();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_config();
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_config();
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
init_config();
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path2) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path2));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_config();
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;

// node_modules/@opennextjs/aws/dist/core/util.js
init_config();
init_logger();
import NextServer from "next/dist/server/next-server.js";

// node_modules/@opennextjs/aws/dist/core/require-hooks.js
init_logger();
var mod2 = (init_node_module(), __toCommonJS(node_module_exports));
var resolveFilename2 = mod2._resolveFilename;

// node_modules/@opennextjs/aws/dist/core/util.js
var cacheHandlerPath = __require.resolve("./cache.cjs");
var composableCacheHandlerPath = __require.resolve("./composable-cache.cjs");
var nextServer = new NextServer.default({
  conf: {
    ...NextConfig,
    // Next.js compression should be disabled because of a bug in the bundled
    // `compression` package — https://github.com/vercel/next.js/issues/11669
    compress: false,
    // By default, Next.js uses local disk to store ISR cache. We will use
    // our own cache handler to store the cache on S3.
    //#override stableIncrementalCache
    cacheHandler: cacheHandlerPath,
    cacheMaxMemorySize: 0,
    // We need to disable memory cache
    //#endOverride
    experimental: {
      ...NextConfig.experimental,
      // This uses the request.headers.host as the URL
      // https://github.com/vercel/next.js/blob/canary/packages/next/src/server/next-server.ts#L1749-L1754
      //#override trustHostHeader
      trustHostHeader: true,
      //#endOverride
      //#override composableCache
      cacheHandlers: {
        default: composableCacheHandlerPath
      }
      //#endOverride
    }
  },
  customServer: false,
  dev: false,
  dir: __dirname
});
var routesLoaded = false;
globalThis.__next_route_preloader = async (stage) => {
  if (routesLoaded) {
    return;
  }
  const thisFunction = globalThis.fnName ? globalThis.openNextConfig.functions[globalThis.fnName] : globalThis.openNextConfig.default;
  const routePreloadingBehavior = thisFunction?.routePreloadingBehavior ?? "none";
  if (routePreloadingBehavior === "none") {
    routesLoaded = true;
    return;
  }
  if (!("unstable_preloadEntries" in nextServer)) {
    debug("The current version of Next.js does not support route preloading. Skipping route preloading.");
    routesLoaded = true;
    return;
  }
  if (stage === "waitUntil" && routePreloadingBehavior === "withWaitUntil") {
    const waitUntil = globalThis.__openNextAls.getStore()?.waitUntil;
    if (!waitUntil) {
      error("You've tried to use the 'withWaitUntil' route preloading behavior, but the 'waitUntil' function is not available.");
      routesLoaded = true;
      return;
    }
    debug("Preloading entries with waitUntil");
    waitUntil?.(nextServer.unstable_preloadEntries());
    routesLoaded = true;
  } else if (stage === "start" && routePreloadingBehavior === "onStart" || stage === "warmerEvent" && routePreloadingBehavior === "onWarmerEvent" || stage === "onDemand") {
    const startTimestamp = Date.now();
    debug("Preloading entries");
    await nextServer.unstable_preloadEntries();
    debug("Preloading entries took", Date.now() - startTimestamp, "ms");
    routesLoaded = true;
  }
};
var requestHandler = (metadata) => "getRequestHandlerWithMetadata" in nextServer ? nextServer.getRequestHandlerWithMetadata(metadata) : nextServer.getRequestHandler();

// node_modules/@opennextjs/aws/dist/core/requestHandler.js
globalThis.__openNextAls = new AsyncLocalStorage();
async function openNextHandler(internalEvent, options) {
  const initialHeaders = internalEvent.headers;
  const requestId = globalThis.openNextConfig.middleware?.external ? internalEvent.headers[INTERNAL_EVENT_REQUEST_ID] : Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: initialHeaders["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    await globalThis.__next_route_preloader("waitUntil");
    if (initialHeaders["x-forwarded-host"]) {
      initialHeaders.host = initialHeaders["x-forwarded-host"];
    }
    debug("internalEvent", internalEvent);
    const internalHeaders = {
      initialPath: initialHeaders[INTERNAL_HEADER_INITIAL_URL] ?? internalEvent.rawPath,
      resolvedRoutes: initialHeaders[INTERNAL_HEADER_RESOLVED_ROUTES] ? JSON.parse(initialHeaders[INTERNAL_HEADER_RESOLVED_ROUTES]) : [],
      rewriteStatusCode: Number.parseInt(initialHeaders[INTERNAL_HEADER_REWRITE_STATUS_CODE])
    };
    let routingResult = {
      internalEvent,
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      initialURL: internalEvent.url,
      ...internalHeaders
    };
    const headers = "type" in routingResult ? routingResult.headers : routingResult.internalEvent.headers;
    const overwrittenResponseHeaders = {};
    for (const [rawKey, value] of Object.entries(headers)) {
      if (!rawKey.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        continue;
      }
      const key = rawKey.slice(MIDDLEWARE_HEADER_PREFIX_LEN);
      if (key !== "x-middleware-set-cookie") {
        overwrittenResponseHeaders[key] = value;
      }
      headers[key] = value;
      delete headers[rawKey];
    }
    if ("isExternalRewrite" in routingResult && routingResult.isExternalRewrite === true) {
      try {
        routingResult = await globalThis.proxyExternalRequest.proxy(routingResult.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        routingResult = {
          internalEvent: {
            type: "core",
            rawPath: "/500",
            method: "GET",
            headers: {},
            url: constructNextUrl(internalEvent.url, "/500"),
            query: {},
            cookies: {},
            remoteAddress: ""
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          isISR: false,
          origin: false,
          initialURL: internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if ("type" in routingResult) {
      if (options?.streamCreator) {
        const response = createServerResponse({
          internalEvent,
          isExternalRewrite: false,
          isISR: false,
          resolvedRoutes: [],
          origin: false,
          initialURL: internalEvent.url
        }, routingResult.headers, options.streamCreator);
        response.statusCode = routingResult.statusCode;
        response.flushHeaders();
        const [bodyToConsume, bodyToReturn] = routingResult.body.tee();
        for await (const chunk of bodyToConsume) {
          response.write(chunk);
        }
        response.end();
        routingResult.body = bodyToReturn;
      }
      return routingResult;
    }
    const preprocessedEvent = routingResult.internalEvent;
    debug("preprocessedEvent", preprocessedEvent);
    const { search, pathname, hash } = new URL(preprocessedEvent.url);
    const reqProps = {
      method: preprocessedEvent.method,
      url: `${pathname}${search}${hash}`,
      //WORKAROUND: We pass this header to the serverless function to mimic a prefetch request which will not trigger revalidation since we handle revalidation differently
      // There is 3 way we can handle revalidation:
      // 1. We could just let the revalidation go as normal, but due to race conditions the revalidation will be unreliable
      // 2. We could alter the lastModified time of our cache to make next believe that the cache is fresh, but this could cause issues with stale data since the cdn will cache the stale data as if it was fresh
      // 3. OUR CHOICE: We could pass a purpose prefetch header to the serverless function to make next believe that the request is a prefetch request and not trigger revalidation (This could potentially break in the future if next changes the behavior of prefetch requests)
      headers: {
        ...headers
      },
      body: preprocessedEvent.body,
      remoteAddress: preprocessedEvent.remoteAddress
    };
    const mergeHeadersPriority = globalThis.openNextConfig.dangerous?.headersAndCookiesPriority ? globalThis.openNextConfig.dangerous.headersAndCookiesPriority(preprocessedEvent) : "middleware";
    const store = globalThis.__openNextAls.getStore();
    if (store) {
      store.mergeHeadersPriority = mergeHeadersPriority;
    }
    const req = new IncomingMessage(reqProps);
    const res = createServerResponse(routingResult, overwrittenResponseHeaders, options?.streamCreator);
    await processRequest(req, res, routingResult);
    const { statusCode, headers: responseHeaders, isBase64Encoded, body } = convertRes(res);
    const internalResult = {
      type: internalEvent.type,
      statusCode,
      headers: responseHeaders,
      body,
      isBase64Encoded
    };
    return internalResult;
  });
}
async function processRequest(req, res, routingResult) {
  delete req.body;
  const initialURL = new URL(
    // We always assume that only the routing layer can set this header.
    routingResult.internalEvent.headers[INTERNAL_HEADER_INITIAL_URL] ?? routingResult.initialURL
  );
  let invokeStatus;
  if (routingResult.internalEvent.rawPath === "/500") {
    invokeStatus = 500;
  } else if (routingResult.internalEvent.rawPath === "/404") {
    invokeStatus = 404;
  }
  const requestMetadata = {
    isNextDataReq: routingResult.internalEvent.query.__nextDataReq === "1",
    initURL: routingResult.initialURL,
    initQuery: convertToQuery(initialURL.search),
    initProtocol: initialURL.protocol,
    defaultLocale: NextConfig.i18n?.defaultLocale,
    locale: routingResult.locale,
    middlewareInvoke: false,
    // By setting invokePath and invokeQuery we can bypass some of the routing logic in Next.js
    invokePath: routingResult.internalEvent.rawPath,
    invokeQuery: routingResult.internalEvent.query,
    // invokeStatus is only used for error pages
    invokeStatus
  };
  try {
    req.url = initialURL.pathname + convertToQueryString(routingResult.internalEvent.query);
    await requestHandler(requestMetadata)(req, res);
  } catch (e) {
    if (e.constructor.name === "NoFallbackError") {
      await handleNoFallbackError(req, res, routingResult, requestMetadata);
    } else {
      error("NextJS request failed.", e);
      await tryRenderError("500", res, routingResult.internalEvent);
    }
  }
}
async function handleNoFallbackError(req, res, routingResult, metadata, index = 1) {
  if (index >= 5) {
    await tryRenderError("500", res, routingResult.internalEvent);
    return;
  }
  if (index >= routingResult.resolvedRoutes.length) {
    await tryRenderError("404", res, routingResult.internalEvent);
    return;
  }
  try {
    await requestHandler({
      ...routingResult,
      invokeOutput: routingResult.resolvedRoutes[index].route,
      ...metadata
    })(req, res);
  } catch (e) {
    if (e.constructor.name === "NoFallbackError") {
      await handleNoFallbackError(req, res, routingResult, metadata, index + 1);
    } else {
      error("NextJS request failed.", e);
      await tryRenderError("500", res, routingResult.internalEvent);
    }
  }
}
async function tryRenderError(type, res, internalEvent) {
  try {
    const _req = new IncomingMessage({
      method: "GET",
      url: `/${type}`,
      headers: internalEvent.headers,
      body: internalEvent.body,
      remoteAddress: internalEvent.remoteAddress
    });
    const requestMetadata = {
      // By setting invokePath and invokeQuery we can bypass some of the routing logic in Next.js
      invokePath: type === "404" ? "/404" : "/500",
      invokeStatus: type === "404" ? 404 : 500,
      middlewareInvoke: false
    };
    await requestHandler(requestMetadata)(_req, res);
  } catch (e) {
    error("NextJS request failed.", e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      message: "Server failed to respond.",
      details: e
    }, null, 2));
  }
}

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_node(), cloudflare_node_exports));
  return m_1.default;
}
async function resolveTagCache(tagCache) {
  if (typeof tagCache === "function") {
    return tagCache();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveQueue(queue2) {
  if (typeof queue2 === "function") {
    return queue2();
  }
  const m_1 = await Promise.resolve().then(() => (init_direct(), direct_exports));
  return m_1.default;
}
async function resolveIncrementalCache(incrementalCache) {
  if (typeof incrementalCache === "function") {
    return incrementalCache();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy2(), dummy_exports2));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy3(), dummy_exports3));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}
async function resolveCdnInvalidation(cdnInvalidation) {
  if (typeof cdnInvalidation === "function") {
    return cdnInvalidation();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy4(), dummy_exports4));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createMainHandler.js
async function createMainHandler() {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  const thisFunction = globalThis.fnName ? config.functions[globalThis.fnName] : config.default;
  globalThis.serverId = generateUniqueId();
  globalThis.openNextConfig = config;
  await globalThis.__next_route_preloader("start");
  globalThis.queue = await resolveQueue(thisFunction.override?.queue);
  globalThis.incrementalCache = await resolveIncrementalCache(thisFunction.override?.incrementalCache);
  globalThis.tagCache = await resolveTagCache(thisFunction.override?.tagCache);
  if (config.middleware?.external !== true) {
    globalThis.assetResolver = await resolveAssetResolver(globalThis.openNextConfig.middleware?.assetResolver);
  }
  globalThis.proxyExternalRequest = await resolveProxyRequest(thisFunction.override?.proxyExternalRequest);
  globalThis.cdnInvalidationHandler = await resolveCdnInvalidation(thisFunction.override?.cdnInvalidation);
  const converter2 = await resolveConverter(thisFunction.override?.converter);
  const { wrapper, name } = await resolveWrapper(thisFunction.override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(openNextHandler, converter2);
}

// node_modules/@opennextjs/aws/dist/adapters/server-adapter.js
setNodeEnv();
setNextjsServerWorkingDirectory();
globalThis.internalFetch = fetch;
var handler2 = await createMainHandler();
function setNextjsServerWorkingDirectory() {
  process.chdir(__dirname);
}
export {
  handler2 as handler
};
