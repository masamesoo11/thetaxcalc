
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.2";globalThis.nextVersion = "16.1.3";
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
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
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
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
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

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream({
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

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__cfc6ad0d._.js
var require_root_of_the_server_cfc6ad0d = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__cfc6ad0d._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__cfc6ad0d._.js", 51615, (e, r, o) => {
      r.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, r, o) => {
      r.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 35825, (e, r, o) => {
      self._ENTRIES ||= {};
      let n = Promise.resolve().then(() => e.i(58217));
      n.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(n, { get(e2, r2) {
        if ("then" === r2) return (r3, o3) => e2.then(r3, o3);
        let o2 = (...o3) => e2.then((e3) => (0, e3[r2])(...o3));
        return o2.then = (o3, n2) => e2.then((e3) => e3[r2]).then(o3, n2), o2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/node_modules_next_dist_95e2512a._.js
var require_node_modules_next_dist_95e2512a = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_95e2512a._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_95e2512a._.js", 28042, (e, t, r) => {
      "use strict";
      var a = Object.defineProperty, n = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, s = {}, l = { RequestCookies: () => g, ResponseCookies: () => m, parseCookie: () => d, parseSetCookie: () => p, stringifyCookie: () => u };
      for (var c in l) a(s, c, { get: l[c], enumerable: true });
      function u(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), a2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? a2 : `${a2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [a2, n2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(a2, decodeURIComponent(null != n2 ? n2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function p(e2) {
        if (!e2) return;
        let [[t2, r2], ...a2] = d(e2), { domain: n2, expires: o2, httponly: i2, maxage: s2, path: l2, samesite: c2, secure: u2, partitioned: p2, priority: g2 } = Object.fromEntries(a2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m2, b, y = { name: t2, value: decodeURIComponent(r2), domain: n2, ...o2 && { expires: new Date(o2) }, ...i2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...c2 && { sameSite: h.includes(m2 = (m2 = c2).toLowerCase()) ? m2 : void 0 }, ...u2 && { secure: true }, ...g2 && { priority: f.includes(b = (b = g2).toLowerCase()) ? b : void 0 }, ...p2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in y) y[t3] && (e3[t3] = y[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of o(t2)) i.call(e2, l2) || l2 === r2 || a(e2, l2, { get: () => t2[l2], enumerable: !(s2 = n(t2, l2)) || s2.enumerable });
        return e2;
      })(a({}, "__esModule", { value: true }), s);
      var h = ["strict", "lax", "none"], f = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let a2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === a2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, a2 = this._parsed;
          return a2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(a2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, m = class {
        constructor(e2) {
          var t2, r2, a2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const n2 = null != (a2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? a2 : [];
          for (const e3 of Array.isArray(n2) ? n2 : function(e4) {
            if (!e4) return [];
            var t3, r3, a3, n3, o2, i2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, o2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (a3 = s2, s2 += 1, l2(), n3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (o2 = true, s2 = n3, i2.push(e4.substring(t3, a3)), t3 = s2) : s2 = a3 + 1;
              } else s2 += 1;
              (!o2 || s2 >= e4.length) && i2.push(e4.substring(t3, e4.length));
            }
            return i2;
          }(n2)) {
            const t3 = p(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let a2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === a2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, a2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, n2 = this._parsed;
          return n2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...a2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          }(n2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, a, n, o, i;
        var s, l, c, u, d, p, h, f, g, m, b, y, v, w, _, x, S = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let a2 = r3(223), n2 = r3(172), o2 = r3(930), i2 = "context", s2 = new a2.NoopContextManager();
          class l2 {
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, n2.registerGlobal)(i2, e3, o2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...a3) {
              return this._getContextManager().with(e3, t3, r4, ...a3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, n2.getGlobal)(i2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(i2, o2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let a2 = r3(56), n2 = r3(912), o2 = r3(957), i2 = r3(172);
          class s2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, i2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: o2.DiagLogLevel.INFO }) => {
                var a3, s3, l2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (a3 = e5.stack) ? a3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, i2.getGlobal)("diag"), u2 = (0, n2.createLogLevelDiagLogger)(null != (s3 = r4.logLevel) ? s3 : o2.DiagLogLevel.INFO, e4);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e5}`), u2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, i2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, i2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new a2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
          }
          t2.DiagAPI = s2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let a2 = r3(660), n2 = r3(172), o2 = r3(930), i2 = "metrics";
          class s2 {
            static getInstance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, n2.registerGlobal)(i2, e3, o2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(i2) || a2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, n2.unregisterGlobal)(i2, o2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = s2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let a2 = r3(172), n2 = r3(874), o2 = r3(194), i2 = r3(277), s2 = r3(369), l2 = r3(930), c2 = "propagation", u2 = new n2.NoopTextMapPropagator();
          class d2 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = i2.getBaggage, this.getActiveBaggage = i2.getActiveBaggage, this.setBaggage = i2.setBaggage, this.deleteBaggage = i2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, a2.registerGlobal)(c2, e3, l2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = o2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = o2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, a2.unregisterGlobal)(c2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, a2.getGlobal)(c2) || u2;
            }
          }
          t2.PropagationAPI = d2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let a2 = r3(172), n2 = r3(846), o2 = r3(139), i2 = r3(607), s2 = r3(930), l2 = "trace";
          class c2 {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = o2.wrapSpanContext, this.isSpanContextValid = o2.isSpanContextValid, this.deleteSpan = i2.deleteSpan, this.getSpan = i2.getSpan, this.getActiveSpan = i2.getActiveSpan, this.getSpanContext = i2.getSpanContext, this.setSpan = i2.setSpan, this.setSpanContext = i2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, a2.registerGlobal)(l2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, a2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, a2.unregisterGlobal)(l2, s2.DiagAPI.instance()), this._proxyTracerProvider = new n2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = c2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let a2 = r3(491), n2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function o2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t2.getBaggage = o2, t2.getActiveBaggage = function() {
            return o2(a2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(n2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(n2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let a2 = new r3(this._entries);
              return a2._entries.set(e3, t3), a2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let a2 = r3(930), n2 = r3(993), o2 = r3(830), i2 = a2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (i2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: o2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let a2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return a2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...a3) {
              return t3.call(r4, ...a3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, a2) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.set(e4, a2), n2;
              }, t3.deleteValue = (e4) => {
                let a2 = new r3(t3._currentContext);
                return a2._currentContext.delete(e4), a2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let a2 = r3(172);
          function n2(e3, t3, r4) {
            let n3 = (0, a2.getGlobal)("diag");
            if (n3) return r4.unshift(t3), n3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let a2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, a3) {
              let n2 = t3[r5];
              return "function" == typeof n2 && e3 >= a3 ? n2.bind(t3) : function() {
              };
            }
            return e3 < a2.DiagLogLevel.NONE ? e3 = a2.DiagLogLevel.NONE : e3 > a2.DiagLogLevel.ALL && (e3 = a2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", a2.DiagLogLevel.ERROR), warn: r4("warn", a2.DiagLogLevel.WARN), info: r4("info", a2.DiagLogLevel.INFO), debug: r4("debug", a2.DiagLogLevel.DEBUG), verbose: r4("verbose", a2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let a2 = r3(200), n2 = r3(521), o2 = r3(130), i2 = n2.VERSION.split(".")[0], s2 = Symbol.for(`opentelemetry.js.api.${i2}`), l2 = a2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, a3 = false) {
            var o3;
            let i3 = l2[s2] = null != (o3 = l2[s2]) ? o3 : { version: n2.VERSION };
            if (!a3 && i3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (i3.version !== n2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${i3.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return i3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let a3 = null == (t3 = l2[s2]) ? void 0 : t3.version;
            if (a3 && (0, o2.isCompatible)(a3)) return null == (r4 = l2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r4 = l2[s2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let a2 = r3(521), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function o2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), a3 = e3.match(n2);
            if (!a3) return () => false;
            let o3 = { major: +a3[1], minor: +a3[2], patch: +a3[3], prerelease: a3[4] };
            if (null != o3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function i2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let a4 = e4.match(n2);
              if (!a4) return i2(e4);
              let s2 = { major: +a4[1], minor: +a4[2], patch: +a4[3], prerelease: a4[4] };
              if (null != s2.prerelease || o3.major !== s2.major) return i2(e4);
              if (0 === o3.major) return o3.minor === s2.minor && o3.patch <= s2.patch ? (t3.add(e4), true) : i2(e4);
              return o3.minor <= s2.minor ? (t3.add(e4), true) : i2(e4);
            };
          }
          t2._makeCompatibilityCheck = o2, t2.isCompatible = o2(a2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class a2 {
          }
          t2.NoopMetric = a2;
          class n2 extends a2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = n2;
          class o2 extends a2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = o2;
          class i2 extends a2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = i2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class l2 extends s2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class c2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = c2;
          class u2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new n2(), t2.NOOP_HISTOGRAM_METRIC = new i2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new o2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let a2 = r3(102);
          class n2 {
            getMeter(e3, t3, r4) {
              return a2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = n2, t2.NOOP_METER_PROVIDER = new n2();
        }, 200: function(e2, t2, r3) {
          var a2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, a3) {
            void 0 === a3 && (a3 = r4), Object.defineProperty(e3, a3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, a3) {
            void 0 === a3 && (a3 = r4), e3[a3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || a2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var a2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, a3) {
            void 0 === a3 && (a3 = r4), Object.defineProperty(e3, a3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, a3) {
            void 0 === a3 && (a3 = r4), e3[a3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || a2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let a2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = a2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let a2 = r3(491), n2 = r3(607), o2 = r3(403), i2 = r3(139), s2 = a2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var a3;
              if (null == t3 ? void 0 : t3.root) return new o2.NonRecordingSpan();
              let l2 = r4 && (0, n2.getSpanContext)(r4);
              return "object" == typeof (a3 = l2) && "string" == typeof a3.spanId && "string" == typeof a3.traceId && "number" == typeof a3.traceFlags && (0, i2.isSpanContextValid)(l2) ? new o2.NonRecordingSpan(l2) : new o2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, a3) {
              let o3, i3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (o3 = t3, l2 = r4) : (o3 = t3, i3 = r4, l2 = a3);
              let c2 = null != i3 ? i3 : s2.active(), u2 = this.startSpan(e3, o3, c2), d2 = (0, n2.setSpan)(c2, u2);
              return s2.with(d2, l2, void 0, u2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let a2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new a2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let a2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, a3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = a3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, a3) {
              let n2 = this._getTracer();
              return Reflect.apply(n2.startActiveSpan, n2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : a2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let a2 = r3(125), n2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var n3;
              return null != (n3 = this.getDelegateTracer(e3, t3, r4)) ? n3 : new a2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : n2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var a3;
              return null == (a3 = this._delegate) ? void 0 : a3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let a2 = r3(780), n2 = r3(403), o2 = r3(491), i2 = (0, a2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(i2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(i2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(o2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(i2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new n2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let a2 = r3(564);
          class n2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), n3 = r4.indexOf("=");
                if (-1 !== n3) {
                  let o2 = r4.slice(0, n3), i2 = r4.slice(n3 + 1, t3.length);
                  (0, a2.validateKey)(o2) && (0, a2.validateValue)(i2) && e4.set(o2, i2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new n2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = n2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", a2 = `[a-z]${r3}{0,255}`, n2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, o2 = RegExp(`^(?:${a2}|${n2})$`), i2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return o2.test(e3);
          }, t2.validateValue = function(e3) {
            return i2.test(e3) && !s2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let a2 = r3(325);
          t2.createTraceState = function(e3) {
            return new a2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let a2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: a2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let a2 = r3(476), n2 = r3(403), o2 = /^([0-9a-f]{32})$/i, i2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return o2.test(e3) && e3 !== a2.INVALID_TRACEID;
          }
          function l2(e3) {
            return i2.test(e3) && e3 !== a2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new n2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, E = {};
        function C(e2) {
          var t2 = E[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = E[e2] = { exports: {} }, a2 = true;
          try {
            S[e2].call(r3.exports, r3, r3.exports, C), a2 = false;
          } finally {
            a2 && delete E[e2];
          }
          return r3.exports;
        }
        C.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var R = {};
        Object.defineProperty(R, "__esModule", { value: true }), R.trace = R.propagation = R.metrics = R.diag = R.context = R.INVALID_SPAN_CONTEXT = R.INVALID_TRACEID = R.INVALID_SPANID = R.isValidSpanId = R.isValidTraceId = R.isSpanContextValid = R.createTraceState = R.TraceFlags = R.SpanStatusCode = R.SpanKind = R.SamplingDecision = R.ProxyTracerProvider = R.ProxyTracer = R.defaultTextMapSetter = R.defaultTextMapGetter = R.ValueType = R.createNoopMeter = R.DiagLogLevel = R.DiagConsoleLogger = R.ROOT_CONTEXT = R.createContextKey = R.baggageEntryMetadataFromString = void 0, s = C(369), Object.defineProperty(R, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), l = C(780), Object.defineProperty(R, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(R, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = C(972), Object.defineProperty(R, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), u = C(957), Object.defineProperty(R, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = C(102), Object.defineProperty(R, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), p = C(901), Object.defineProperty(R, "ValueType", { enumerable: true, get: function() {
          return p.ValueType;
        } }), h = C(194), Object.defineProperty(R, "defaultTextMapGetter", { enumerable: true, get: function() {
          return h.defaultTextMapGetter;
        } }), Object.defineProperty(R, "defaultTextMapSetter", { enumerable: true, get: function() {
          return h.defaultTextMapSetter;
        } }), f = C(125), Object.defineProperty(R, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = C(846), Object.defineProperty(R, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = C(996), Object.defineProperty(R, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), b = C(357), Object.defineProperty(R, "SpanKind", { enumerable: true, get: function() {
          return b.SpanKind;
        } }), y = C(847), Object.defineProperty(R, "SpanStatusCode", { enumerable: true, get: function() {
          return y.SpanStatusCode;
        } }), v = C(475), Object.defineProperty(R, "TraceFlags", { enumerable: true, get: function() {
          return v.TraceFlags;
        } }), w = C(98), Object.defineProperty(R, "createTraceState", { enumerable: true, get: function() {
          return w.createTraceState;
        } }), _ = C(139), Object.defineProperty(R, "isSpanContextValid", { enumerable: true, get: function() {
          return _.isSpanContextValid;
        } }), Object.defineProperty(R, "isValidTraceId", { enumerable: true, get: function() {
          return _.isValidTraceId;
        } }), Object.defineProperty(R, "isValidSpanId", { enumerable: true, get: function() {
          return _.isValidSpanId;
        } }), x = C(476), Object.defineProperty(R, "INVALID_SPANID", { enumerable: true, get: function() {
          return x.INVALID_SPANID;
        } }), Object.defineProperty(R, "INVALID_TRACEID", { enumerable: true, get: function() {
          return x.INVALID_TRACEID;
        } }), Object.defineProperty(R, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return x.INVALID_SPAN_CONTEXT;
        } }), r2 = C(67), Object.defineProperty(R, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), a = C(506), Object.defineProperty(R, "diag", { enumerable: true, get: function() {
          return a.diag;
        } }), n = C(886), Object.defineProperty(R, "metrics", { enumerable: true, get: function() {
          return n.metrics;
        } }), o = C(939), Object.defineProperty(R, "propagation", { enumerable: true, get: function() {
          return o.propagation;
        } }), i = C(845), Object.defineProperty(R, "trace", { enumerable: true, get: function() {
          return i.trace;
        } }), R.default = { context: r2.context, diag: a.diag, metrics: n.metrics, propagation: o.propagation, trace: i.trace }, t.exports = R;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, a, n, o = {};
        o.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var n2 = {}, o2 = t2.split(a), i = (r3 || {}).decode || e2, s = 0; s < o2.length; s++) {
            var l = o2[s], c = l.indexOf("=");
            if (!(c < 0)) {
              var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == n2[u] && (n2[u] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, i));
            }
          }
          return n2;
        }, o.serialize = function(e3, t2, a2) {
          var o2 = a2 || {}, i = o2.encode || r2;
          if ("function" != typeof i) throw TypeError("option encode is invalid");
          if (!n.test(e3)) throw TypeError("argument name is invalid");
          var s = i(t2);
          if (s && !n.test(s)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + s;
          if (null != o2.maxAge) {
            var c = o2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (o2.domain) {
            if (!n.test(o2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + o2.domain;
          }
          if (o2.path) {
            if (!n.test(o2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + o2.path;
          }
          if (o2.expires) {
            if ("function" != typeof o2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + o2.expires.toUTCString();
          }
          if (o2.httpOnly && (l += "; HttpOnly"), o2.secure && (l += "; Secure"), o2.sameSite) switch ("string" == typeof o2.sameSite ? o2.sameSite.toLowerCase() : o2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, a = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = o;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, a, n, o;
        var i = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function a2() {
          }
          function n2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function o2(e4, t3, a3, o3, i3) {
            if ("function" != typeof a3) throw TypeError("The listener must be a function");
            var s3 = new n2(a3, o3 || e4, i3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], s3] : e4._events[l2].push(s3) : (e4._events[l2] = s3, e4._eventsCount++), e4;
          }
          function i2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new a2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new a2(), this._eventsCount = 0;
          }
          Object.create && (a2.prototype = /* @__PURE__ */ Object.create(null), new a2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, a3, n3 = [];
            if (0 === this._eventsCount) return n3;
            for (a3 in e4 = this._events) t2.call(e4, a3) && n3.push(r3 ? a3.slice(1) : a3);
            return Object.getOwnPropertySymbols ? n3.concat(Object.getOwnPropertySymbols(e4)) : n3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, a3 = this._events[t3];
            if (!a3) return [];
            if (a3.fn) return [a3.fn];
            for (var n3 = 0, o3 = a3.length, i3 = Array(o3); n3 < o3; n3++) i3[n3] = a3[n3].fn;
            return i3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, a3 = this._events[t3];
            return a3 ? a3.fn ? 1 : a3.length : 0;
          }, s2.prototype.emit = function(e4, t3, a3, n3, o3, i3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var l2, c2, u = this._events[s3], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, a3), true;
                case 4:
                  return u.fn.call(u.context, t3, a3, n3), true;
                case 5:
                  return u.fn.call(u.context, t3, a3, n3, o3), true;
                case 6:
                  return u.fn.call(u.context, t3, a3, n3, o3, i3), true;
              }
              for (c2 = 1, l2 = Array(d - 1); c2 < d; c2++) l2[c2 - 1] = arguments[c2];
              u.fn.apply(u.context, l2);
            } else {
              var p, h = u.length;
              for (c2 = 0; c2 < h; c2++) switch (u[c2].once && this.removeListener(e4, u[c2].fn, void 0, true), d) {
                case 1:
                  u[c2].fn.call(u[c2].context);
                  break;
                case 2:
                  u[c2].fn.call(u[c2].context, t3);
                  break;
                case 3:
                  u[c2].fn.call(u[c2].context, t3, a3);
                  break;
                case 4:
                  u[c2].fn.call(u[c2].context, t3, a3, n3);
                  break;
                default:
                  if (!l2) for (p = 1, l2 = Array(d - 1); p < d; p++) l2[p - 1] = arguments[p];
                  u[c2].fn.apply(u[c2].context, l2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return o2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return o2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, a3, n3) {
            var o3 = r3 ? r3 + e4 : e4;
            if (!this._events[o3]) return this;
            if (!t3) return i2(this, o3), this;
            var s3 = this._events[o3];
            if (s3.fn) s3.fn !== t3 || n3 && !s3.once || a3 && s3.context !== a3 || i2(this, o3);
            else {
              for (var l2 = 0, c2 = [], u = s3.length; l2 < u; l2++) (s3[l2].fn !== t3 || n3 && !s3[l2].once || a3 && s3[l2].context !== a3) && c2.push(s3[l2]);
              c2.length ? this._events[o3] = 1 === c2.length ? c2[0] : c2 : i2(this, o3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && i2(this, t3)) : (this._events = new a2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let a2 = 0, n2 = e4.length;
            for (; n2 > 0; ) {
              let o2 = n2 / 2 | 0, i2 = a2 + o2;
              0 >= r3(e4[i2], t3) ? (a2 = ++i2, n2 -= o2 + 1) : n2 = o2;
            }
            return a2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let a2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let n2 = a2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(n2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let a2 = r3(213);
          class n2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let o2 = (e4, t3, r4) => new Promise((o3, i2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void o3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  o3(r4());
                } catch (e5) {
                  i2(e5);
                }
                return;
              }
              let a3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new n2(a3);
              "function" == typeof e4.cancel && e4.cancel(), i2(s3);
            }, t3);
            a2(e4.then(o3, i2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = o2, e3.exports.default = o2, e3.exports.TimeoutError = n2;
        } }, s = {};
        function l(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, a2 = true;
          try {
            i[e3](r3, r3.exports, l), a2 = false;
          } finally {
            a2 && delete s[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(993), r2 = l(816), a = l(821), n = () => {
        }, o = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, o2, i2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = n, this._resolveIdle = n, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: a.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (i2 = null == (o2 = e3.interval) ? void 0 : o2.toString()) ? i2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = n, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = n, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((a2, n2) => {
              let i2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let i3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && n2(o);
                  });
                  a2(await i3);
                } catch (e4) {
                  n2(e4);
                }
                this._next();
              };
              this._queue.enqueue(i2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = c;
      })();
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var a = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return s;
      } };
      for (var n in a) Object.defineProperty(r, n, { enumerable: true, get: a[n] });
      let o = new (e.r(78500)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let a2 = t2.url(e2);
        return { url: a2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let a2 = i(e2, t2);
        return a2 ? o.run(a2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = o.getStore();
        return r2 || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var a = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { handleFetch: function() {
        return c;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return s;
      } };
      for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
      let i = e.r(25085), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: n2, headers: o2, body: i2, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: p, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(o2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: i2 ? a.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: p, referrerPolicy: h } };
      }
      async function c(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: n2, proxyPort: o2 } = r2, c2 = await l(n2, t2), u2 = await e2(`http://localhost:${o2}`, { method: "POST", body: JSON.stringify(c2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u2.json(), { api: p } = d;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: n3 } = e3.response;
              return new Response(n3 ? a.Buffer.from(n3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(d);
          default:
            return p;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var a2;
          return (null == r2 || null == (a2 = r2.next) ? void 0 : a2.internal) ? t2(e2, r2) : c(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var a = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var n in a) Object.defineProperty(r, n, { enumerable: true, get: a[n] });
      let o = e.r(25085), i = e.r(28325);
      function s() {
        return (0, i.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, o.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    }, 64445, (e, t, r) => {
      var a = { 226: function(t2, r2) {
        !function(a2, n2) {
          "use strict";
          var o2 = "function", i = "undefined", s = "object", l = "string", c = "major", u = "model", d = "name", p = "type", h = "vendor", f = "version", g = "architecture", m = "console", b = "mobile", y = "tablet", v = "smarttv", w = "wearable", _ = "embedded", x = "Amazon", S = "Apple", E = "ASUS", C = "BlackBerry", R = "Browser", T = "Chrome", O = "Firefox", P = "Google", k = "Huawei", A = "Microsoft", N = "Motorola", I = "Opera", M = "Samsung", L = "Sharp", j = "Sony", D = "Xiaomi", $ = "Zebra", U = "Facebook", W = "Chromium OS", q = "Mac OS", H = function(e2, t3) {
            var r3 = {};
            for (var a3 in e2) t3[a3] && t3[a3].length % 2 == 0 ? r3[a3] = t3[a3].concat(e2[a3]) : r3[a3] = e2[a3];
            return r3;
          }, B = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, V = function(e2, t3) {
            return typeof e2 === l && -1 !== K(t3).indexOf(K(e2));
          }, K = function(e2) {
            return e2.toLowerCase();
          }, G = function(e2, t3) {
            if (typeof e2 === l) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === i ? e2 : e2.substring(0, 350);
          }, F = function(e2, t3) {
            for (var r3, a3, n3, i2, l2, c2, u2 = 0; u2 < t3.length && !l2; ) {
              var d2 = t3[u2], p2 = t3[u2 + 1];
              for (r3 = a3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (n3 = 0; n3 < p2.length; n3++) c2 = l2[++a3], typeof (i2 = p2[n3]) === s && i2.length > 0 ? 2 === i2.length ? typeof i2[1] == o2 ? this[i2[0]] = i2[1].call(this, c2) : this[i2[0]] = i2[1] : 3 === i2.length ? typeof i2[1] !== o2 || i2[1].exec && i2[1].test ? this[i2[0]] = c2 ? c2.replace(i2[1], i2[2]) : void 0 : this[i2[0]] = c2 ? i2[1].call(this, c2, i2[2]) : void 0 : 4 === i2.length && (this[i2[0]] = c2 ? i2[3].call(this, c2.replace(i2[1], i2[2])) : void 0) : this[i2] = c2 || void 0;
              u2 += 2;
            }
          }, z = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === s && t3[r3].length > 0) {
              for (var a3 = 0; a3 < t3[r3].length; a3++) if (V(t3[r3][a3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (V(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, J = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, f], [/opios[\/ ]+([\w\.]+)/i], [f, [d, I + " Mini"]], [/\bopr\/([\w\.]+)/i], [f, [d, I]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [d, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [d, "UC" + R]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [f, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [f, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [d, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure " + R], f], [/\bfocus\/([\w\.]+)/i], [f, [d, O + " Focus"]], [/\bopt\/([\w\.]+)/i], [f, [d, I + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [f, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [d, I + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [f, [d, "MIUI " + R]], [/fxios\/([-\w\.]+)/i], [f, [d, O]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 " + R]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 " + R], f], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, f], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, U], f], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [d, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [d, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [d, T + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, T + " WebView"], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [d, "Android " + R]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [f, z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [d, O + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [d, f], [/(cobalt)\/([\w\.]+)/i], [d, [f, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[g, "amd64"]], [/(ia32(?=;))/i], [[g, K]], [/((?:i[346]|x)86)[;\)]/i], [[g, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[g, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[g, "armhf"]], [/windows (ce|mobile); ppc;/i], [[g, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[g, /ower/, "", K]], [/(sun4\w)[;\)]/i], [[g, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[g, K]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [h, M], [p, y]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [h, M], [p, b]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [h, S], [p, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [h, S], [p, y]], [/(macintosh);/i], [u, [h, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [h, L], [p, b]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [h, k], [p, y]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [h, k], [p, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [h, D], [p, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [h, D], [p, y]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [h, "OPPO"], [p, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [h, "Vivo"], [p, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [h, "Realme"], [p, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [h, N], [p, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [h, N], [p, y]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [h, "LG"], [p, y]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [h, "LG"], [p, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [h, "Lenovo"], [p, y]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [h, "Nokia"], [p, b]], [/(pixel c)\b/i], [u, [h, P], [p, y]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [h, P], [p, b]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [h, j], [p, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [h, j], [p, y]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [h, "OnePlus"], [p, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [h, x], [p, y]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [h, x], [p, b]], [/(playbook);[-\w\),; ]+(rim)/i], [u, h, [p, y]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [h, C], [p, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [h, E], [p, y]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [h, E], [p, b]], [/(nexus 9)/i], [u, [h, "HTC"], [p, y]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [u, /_/g, " "], [p, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [h, "Acer"], [p, y]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [h, "Meizu"], [p, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, u, [p, b]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, u, [p, y]], [/(surface duo)/i], [u, [h, A], [p, y]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [h, "Fairphone"], [p, b]], [/(u304aa)/i], [u, [h, "AT&T"], [p, b]], [/\bsie-(\w*)/i], [u, [h, "Siemens"], [p, b]], [/\b(rct\w+) b/i], [u, [h, "RCA"], [p, y]], [/\b(venue[\d ]{2,7}) b/i], [u, [h, "Dell"], [p, y]], [/\b(q(?:mv|ta)\w+) b/i], [u, [h, "Verizon"], [p, y]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [h, "Barnes & Noble"], [p, y]], [/\b(tm\d{3}\w+) b/i], [u, [h, "NuVision"], [p, y]], [/\b(k88) b/i], [u, [h, "ZTE"], [p, y]], [/\b(nx\d{3}j) b/i], [u, [h, "ZTE"], [p, b]], [/\b(gen\d{3}) b.+49h/i], [u, [h, "Swiss"], [p, b]], [/\b(zur\d{3}) b/i], [u, [h, "Swiss"], [p, y]], [/\b((zeki)?tb.*\b) b/i], [u, [h, "Zeki"], [p, y]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], u, [p, y]], [/\b(ns-?\w{0,9}) b/i], [u, [h, "Insignia"], [p, y]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [h, "NextBook"], [p, y]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], u, [p, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], u, [p, b]], [/\b(ph-1) /i], [u, [h, "Essential"], [p, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [h, "Envizen"], [p, y]], [/\b(trio[-\w\. ]+) b/i], [u, [h, "MachSpeed"], [p, y]], [/\btu_(1491) b/i], [u, [h, "Rotor"], [p, y]], [/(shield[\w ]+) b/i], [u, [h, "Nvidia"], [p, y]], [/(sprint) (\w+)/i], [h, u, [p, b]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [h, A], [p, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [h, $], [p, y]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [h, $], [p, b]], [/smart-tv.+(samsung)/i], [h, [p, v]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [h, M], [p, v]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, "LG"], [p, v]], [/(apple) ?tv/i], [h, [u, S + " TV"], [p, v]], [/crkey/i], [[u, T + "cast"], [h, P], [p, v]], [/droid.+aft(\w)( bui|\))/i], [u, [h, x], [p, v]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [h, L], [p, v]], [/(bravia[\w ]+)( bui|\))/i], [u, [h, j], [p, v]], [/(mitv-\w{5}) bui/i], [u, [h, D], [p, v]], [/Hbbtv.*(technisat) (.*);/i], [h, u, [p, v]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[h, G], [u, G], [p, v]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[p, v]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, u, [p, m]], [/droid.+; (shield) bui/i], [u, [h, "Nvidia"], [p, m]], [/(playstation [345portablevi]+)/i], [u, [h, j], [p, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [h, A], [p, m]], [/((pebble))app/i], [h, u, [p, w]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [h, S], [p, w]], [/droid.+; (glass) \d/i], [u, [h, P], [p, w]], [/droid.+; (wt63?0{2,3})\)/i], [u, [h, $], [p, w]], [/(quest( 2| pro)?)/i], [u, [h, U], [p, w]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [p, _]], [/(aeobc)\b/i], [u, [h, x], [p, _]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [p, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [p, y]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[p, y]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[p, b]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [h, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [d, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, d]], os: [[/microsoft (windows) (vista|xp)/i], [d, f], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [f, z, J]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [f, z, J]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, q], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, f], [/\(bb(10);/i], [f, [d, C]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [d, O + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [d, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [d, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [d, T + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[d, W], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, f], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [d, f]] }, Y = function(e2, t3) {
            if (typeof e2 === s && (t3 = e2, e2 = void 0), !(this instanceof Y)) return new Y(e2, t3).getResult();
            var r3 = typeof a2 !== i && a2.navigator ? a2.navigator : void 0, n3 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), m2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, v2 = t3 ? H(X, t3) : X, w2 = r3 && r3.userAgent == n3;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[d] = void 0, t4[f] = void 0, F.call(t4, n3, v2.browser), t4[c] = typeof (e3 = t4[f]) === l ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, w2 && r3 && r3.brave && typeof r3.brave.isBrave == o2 && (t4[d] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[g] = void 0, F.call(e3, n3, v2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[h] = void 0, e3[u] = void 0, e3[p] = void 0, F.call(e3, n3, v2.device), w2 && !e3[p] && m2 && m2.mobile && (e3[p] = b), w2 && "Macintosh" == e3[u] && r3 && typeof r3.standalone !== i && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[u] = "iPad", e3[p] = y), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[d] = void 0, e3[f] = void 0, F.call(e3, n3, v2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[d] = void 0, e3[f] = void 0, F.call(e3, n3, v2.os), w2 && !e3[d] && m2 && "Unknown" != m2.platform && (e3[d] = m2.platform.replace(/chrome os/i, W).replace(/macos/i, q)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return n3;
            }, this.setUA = function(e3) {
              return n3 = typeof e3 === l && e3.length > 350 ? G(e3, 350) : e3, this;
            }, this.setUA(n3), this;
          };
          if (Y.VERSION = "1.0.35", Y.BROWSER = B([d, f, c]), Y.CPU = B([g]), Y.DEVICE = B([u, h, p, m, b, v, y, w, _]), Y.ENGINE = Y.OS = B([d, f]), typeof r2 !== i) t2.exports && (r2 = t2.exports = Y), r2.UAParser = Y;
          else if (typeof define === o2 && define.amd) e.r, void 0 !== Y && e.v(Y);
          else typeof a2 !== i && (a2.UAParser = Y);
          var Q = typeof a2 !== i && (a2.jQuery || a2.Zepto);
          if (Q && !Q.ua) {
            var Z = new Y();
            Q.ua = Z.getResult(), Q.ua.get = function() {
              return Z.getUA();
            }, Q.ua.set = function(e2) {
              Z.setUA(e2);
              var t3 = Z.getResult();
              for (var r3 in t3) Q.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, n = {};
      function o(e2) {
        var t2 = n[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = n[e2] = { exports: {} }, i = true;
        try {
          a[e2].call(r2.exports, r2, r2.exports, o), i = false;
        } finally {
          i && delete n[e2];
        }
        return r2.exports;
      }
      o.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = o(226);
    }, 8946, (e, t, r) => {
      "use strict";
      var a = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var o = Array.isArray;
      function i() {
      }
      var s = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), p = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), b = Symbol.for("react.view_transition"), y = Symbol.iterator, v = Object.prototype.hasOwnProperty, w = Object.assign;
      function _(e2, t2, r2) {
        var a2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== a2 ? a2 : null, props: r2 };
      }
      function x(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var S = /\/+/g;
      function E(e2, t2) {
        var r2, a2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, a2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return a2[e3];
        })) : t2.toString(36);
      }
      function C(e2, t2, r2) {
        if (null == e2) return e2;
        var a2 = [], c2 = 0;
        return !function e3(t3, r3, a3, c3, u2) {
          var d2, p2, h2, f2 = typeof t3;
          ("undefined" === f2 || "boolean" === f2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (f2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case l:
                  m2 = true;
                  break;
                case g:
                  return e3((m2 = t3._init)(t3._payload), r3, a3, c3, u2);
              }
          }
          if (m2) return u2 = u2(t3), m2 = "" === c3 ? "." + E(t3, 0) : c3, o(u2) ? (a3 = "", null != m2 && (a3 = m2.replace(S, "$&/") + "/"), e3(u2, r3, a3, "", function(e4) {
            return e4;
          })) : null != u2 && (x(u2) && (d2 = u2, p2 = a3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(S, "$&/") + "/") + m2, u2 = _(d2.type, p2, d2.props)), r3.push(u2)), 1;
          m2 = 0;
          var b2 = "" === c3 ? "." : c3 + ":";
          if (o(t3)) for (var v2 = 0; v2 < t3.length; v2++) f2 = b2 + E(c3 = t3[v2], v2), m2 += e3(c3, r3, a3, f2, u2);
          else if ("function" == typeof (v2 = null === (h2 = t3) || "object" != typeof h2 ? null : "function" == typeof (h2 = y && h2[y] || h2["@@iterator"]) ? h2 : null)) for (t3 = v2.call(t3), v2 = 0; !(c3 = t3.next()).done; ) f2 = b2 + E(c3 = c3.value, v2++), m2 += e3(c3, r3, a3, f2, u2);
          else if ("object" === f2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(i, i) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, a3, c3, u2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, a2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), a2;
      }
      function R(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function T() {
        return /* @__PURE__ */ new WeakMap();
      }
      function O() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = m, r.Children = { map: C, forEach: function(e2, t2, r2) {
        C(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return C(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return C(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!x(e2)) throw Error(n(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = d, r.StrictMode = u, r.Suspense = h, r.ViewTransition = b, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, r.cache = function(e2) {
        return function() {
          var t2 = a.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(T);
          void 0 === (t2 = r2.get(e2)) && (t2 = O(), r2.set(e2, t2)), r2 = 0;
          for (var n2 = arguments.length; r2 < n2; r2++) {
            var o2 = arguments[r2];
            if ("function" == typeof o2 || "object" == typeof o2 && null !== o2) {
              var i2 = t2.o;
              null === i2 && (t2.o = i2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = i2.get(o2)) && (t2 = O(), i2.set(o2, t2));
            } else null === (i2 = t2.p) && (t2.p = i2 = /* @__PURE__ */ new Map()), void 0 === (t2 = i2.get(o2)) && (t2 = O(), i2.set(o2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = a.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(n(267, e2));
        var a2 = w({}, e2.props), o2 = e2.key;
        if (null != t2) for (i2 in void 0 !== t2.key && (o2 = "" + t2.key), t2) v.call(t2, i2) && "key" !== i2 && "__self" !== i2 && "__source" !== i2 && ("ref" !== i2 || void 0 !== t2.ref) && (a2[i2] = t2[i2]);
        var i2 = arguments.length - 2;
        if (1 === i2) a2.children = r2;
        else if (1 < i2) {
          for (var s2 = Array(i2), l2 = 0; l2 < i2; l2++) s2[l2] = arguments[l2 + 2];
          a2.children = s2;
        }
        return _(e2.type, o2, a2);
      }, r.createElement = function(e2, t2, r2) {
        var a2, n2 = {}, o2 = null;
        if (null != t2) for (a2 in void 0 !== t2.key && (o2 = "" + t2.key), t2) v.call(t2, a2) && "key" !== a2 && "__self" !== a2 && "__source" !== a2 && (n2[a2] = t2[a2]);
        var i2 = arguments.length - 2;
        if (1 === i2) n2.children = r2;
        else if (1 < i2) {
          for (var s2 = Array(i2), l2 = 0; l2 < i2; l2++) s2[l2] = arguments[l2 + 2];
          n2.children = s2;
        }
        if (e2 && e2.defaultProps) for (a2 in i2 = e2.defaultProps) void 0 === n2[a2] && (n2[a2] = i2[a2]);
        return _(e2, o2, n2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: p, render: e2 };
      }, r.isValidElement = x, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: R };
      }, r.memo = function(e2, t2) {
        return { $$typeof: f, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return a.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return a.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return a.H.useId();
      }, r.useMemo = function(e2, t2) {
        return a.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-f93b9fd4-20251217";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 58217, (e) => {
      "use strict";
      let t, r, a;
      async function n() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      let o = null;
      async function i() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        o || (o = n());
        let e10 = await o;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function s(...e10) {
        let t7 = await n();
        try {
          var r2;
          await (null == t7 || null == (r2 = t7.onRequestError) ? void 0 : r2.call(t7, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let l = null;
      function c() {
        return l || (l = i()), l;
      }
      function u(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t7 = new Proxy(function() {
          }, { get(t8, r2) {
            if ("then" === r2) return {};
            throw Object.defineProperty(Error(u(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(u(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r2, a2, n2) {
            if ("function" == typeof n2[0]) return n2[0](t7);
            throw Object.defineProperty(Error(u(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t7 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      c();
      class d extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class p extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class h extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let f = "_N_T_", g = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function m(e10) {
        var t7, r2, a2, n2, o2, i2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t7 = s2, o2 = false; l2(); ) if ("," === (r2 = e10.charAt(s2))) {
            for (a2 = s2, s2 += 1, l2(), n2 = s2; s2 < e10.length && "=" !== (r2 = e10.charAt(s2)) && ";" !== r2 && "," !== r2; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (o2 = true, s2 = n2, i2.push(e10.substring(t7, a2)), t7 = s2) : s2 = a2 + 1;
          } else s2 += 1;
          (!o2 || s2 >= e10.length) && i2.push(e10.substring(t7, e10.length));
        }
        return i2;
      }
      function b(e10) {
        let t7 = {}, r2 = [];
        if (e10) for (let [a2, n2] of e10.entries()) "set-cookie" === a2.toLowerCase() ? (r2.push(...m(n2)), t7[a2] = 1 === r2.length ? r2[0] : r2) : t7[a2] = n2;
        return t7;
      }
      function y(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t7) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t7 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...g, GROUP: { builtinReact: [g.reactServerComponents, g.actionBrowser], serverOnly: [g.reactServerComponents, g.actionBrowser, g.instrument, g.middleware], neutralTarget: [g.apiNode, g.apiEdge], clientOnly: [g.serverSideRendering, g.appPagesBrowser], bundled: [g.reactServerComponents, g.actionBrowser, g.serverSideRendering, g.appPagesBrowser, g.shared, g.instrument, g.middleware], appPages: [g.reactServerComponents, g.serverSideRendering, g.appPagesBrowser, g.actionBrowser] } });
      let v = Symbol("response"), w = Symbol("passThrough"), _ = Symbol("waitUntil");
      class x {
        constructor(e10, t7) {
          this[w] = false, this[_] = t7 ? { kind: "external", function: t7 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[v] || (this[v] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[w] = true;
        }
        waitUntil(e10) {
          if ("external" === this[_].kind) return (0, this[_].function)(e10);
          this[_].promises.push(e10);
        }
      }
      class S extends x {
        constructor(e10) {
          var t7;
          super(e10.request, null == (t7 = e10.context) ? void 0 : t7.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function E(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function C(e10) {
        let t7 = e10.indexOf("#"), r2 = e10.indexOf("?"), a2 = r2 > -1 && (t7 < 0 || r2 < t7);
        return a2 || t7 > -1 ? { pathname: e10.substring(0, a2 ? r2 : t7), query: a2 ? e10.substring(r2, t7 > -1 ? t7 : void 0) : "", hash: t7 > -1 ? e10.slice(t7) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function R(e10, t7) {
        if (!e10.startsWith("/") || !t7) return e10;
        let { pathname: r2, query: a2, hash: n2 } = C(e10);
        return `${t7}${r2}${a2}${n2}`;
      }
      function T(e10, t7) {
        if (!e10.startsWith("/") || !t7) return e10;
        let { pathname: r2, query: a2, hash: n2 } = C(e10);
        return `${r2}${t7}${a2}${n2}`;
      }
      function O(e10, t7) {
        if ("string" != typeof e10) return false;
        let { pathname: r2 } = C(e10);
        return r2 === t7 || r2.startsWith(t7 + "/");
      }
      let P = /* @__PURE__ */ new WeakMap();
      function k(e10, t7) {
        let r2;
        if (!t7) return { pathname: e10 };
        let a2 = P.get(t7);
        a2 || (a2 = t7.map((e11) => e11.toLowerCase()), P.set(t7, a2));
        let n2 = e10.split("/", 2);
        if (!n2[1]) return { pathname: e10 };
        let o2 = n2[1].toLowerCase(), i2 = a2.indexOf(o2);
        return i2 < 0 ? { pathname: e10 } : (r2 = t7[i2], { pathname: e10 = e10.slice(r2.length + 1) || "/", detectedLocale: r2 });
      }
      let A = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function N(e10, t7) {
        return new URL(String(e10).replace(A, "localhost"), t7 && String(t7).replace(A, "localhost"));
      }
      let I = Symbol("NextURLInternal");
      class M {
        constructor(e10, t7, r2) {
          let a2, n2;
          "object" == typeof t7 && "pathname" in t7 || "string" == typeof t7 ? (a2 = t7, n2 = r2 || {}) : n2 = r2 || t7 || {}, this[I] = { url: N(e10, a2 ?? n2.base), options: n2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t7, r2, a2, n2;
          let o2 = function(e11, t8) {
            let { basePath: r3, i18n: a3, trailingSlash: n3 } = t8.nextConfig ?? {}, o3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : n3 };
            r3 && O(o3.pathname, r3) && (o3.pathname = function(e12, t9) {
              if (!O(e12, t9)) return e12;
              let r4 = e12.slice(t9.length);
              return r4.startsWith("/") ? r4 : `/${r4}`;
            }(o3.pathname, r3), o3.basePath = r3);
            let i3 = o3.pathname;
            if (o3.pathname.startsWith("/_next/data/") && o3.pathname.endsWith(".json")) {
              let e12 = o3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              o3.buildId = e12[0], i3 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t8.parseData && (o3.pathname = i3);
            }
            if (a3) {
              let e12 = t8.i18nProvider ? t8.i18nProvider.analyze(o3.pathname) : k(o3.pathname, a3.locales);
              o3.locale = e12.detectedLocale, o3.pathname = e12.pathname ?? o3.pathname, !e12.detectedLocale && o3.buildId && (e12 = t8.i18nProvider ? t8.i18nProvider.analyze(i3) : k(i3, a3.locales)).detectedLocale && (o3.locale = e12.detectedLocale);
            }
            return o3;
          }(this[I].url.pathname, { nextConfig: this[I].options.nextConfig, parseData: true, i18nProvider: this[I].options.i18nProvider }), i2 = function(e11, t8) {
            let r3;
            if (t8?.host && !Array.isArray(t8.host)) r3 = t8.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r3 = e11.hostname;
            }
            return r3.toLowerCase();
          }(this[I].url, this[I].options.headers);
          this[I].domainLocale = this[I].options.i18nProvider ? this[I].options.i18nProvider.detectDomainLocale(i2) : function(e11, t8, r3) {
            if (e11) {
              for (let a3 of (r3 && (r3 = r3.toLowerCase()), e11)) if (t8 === a3.domain?.split(":", 1)[0].toLowerCase() || r3 === a3.defaultLocale.toLowerCase() || a3.locales?.some((e12) => e12.toLowerCase() === r3)) return a3;
            }
          }(null == (t7 = this[I].options.nextConfig) || null == (e10 = t7.i18n) ? void 0 : e10.domains, i2);
          let s2 = (null == (r2 = this[I].domainLocale) ? void 0 : r2.defaultLocale) || (null == (n2 = this[I].options.nextConfig) || null == (a2 = n2.i18n) ? void 0 : a2.defaultLocale);
          this[I].url.pathname = o2.pathname, this[I].defaultLocale = s2, this[I].basePath = o2.basePath ?? "", this[I].buildId = o2.buildId, this[I].locale = o2.locale ?? s2, this[I].trailingSlash = o2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t7;
          return t7 = function(e11, t8, r2, a2) {
            if (!t8 || t8 === r2) return e11;
            let n2 = e11.toLowerCase();
            return !a2 && (O(n2, "/api") || O(n2, `/${t8.toLowerCase()}`)) ? e11 : R(e11, `/${t8}`);
          }((e10 = { basePath: this[I].basePath, buildId: this[I].buildId, defaultLocale: this[I].options.forceLocale ? void 0 : this[I].defaultLocale, locale: this[I].locale, pathname: this[I].url.pathname, trailingSlash: this[I].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t7 = E(t7)), e10.buildId && (t7 = T(R(t7, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t7 = R(t7, e10.basePath), !e10.buildId && e10.trailingSlash ? t7.endsWith("/") ? t7 : T(t7, "/") : E(t7);
        }
        formatSearch() {
          return this[I].url.search;
        }
        get buildId() {
          return this[I].buildId;
        }
        set buildId(e10) {
          this[I].buildId = e10;
        }
        get locale() {
          return this[I].locale ?? "";
        }
        set locale(e10) {
          var t7, r2;
          if (!this[I].locale || !(null == (r2 = this[I].options.nextConfig) || null == (t7 = r2.i18n) ? void 0 : t7.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[I].locale = e10;
        }
        get defaultLocale() {
          return this[I].defaultLocale;
        }
        get domainLocale() {
          return this[I].domainLocale;
        }
        get searchParams() {
          return this[I].url.searchParams;
        }
        get host() {
          return this[I].url.host;
        }
        set host(e10) {
          this[I].url.host = e10;
        }
        get hostname() {
          return this[I].url.hostname;
        }
        set hostname(e10) {
          this[I].url.hostname = e10;
        }
        get port() {
          return this[I].url.port;
        }
        set port(e10) {
          this[I].url.port = e10;
        }
        get protocol() {
          return this[I].url.protocol;
        }
        set protocol(e10) {
          this[I].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t7 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t7}${this.hash}`;
        }
        set href(e10) {
          this[I].url = N(e10), this.analyze();
        }
        get origin() {
          return this[I].url.origin;
        }
        get pathname() {
          return this[I].url.pathname;
        }
        set pathname(e10) {
          this[I].url.pathname = e10;
        }
        get hash() {
          return this[I].url.hash;
        }
        set hash(e10) {
          this[I].url.hash = e10;
        }
        get search() {
          return this[I].url.search;
        }
        set search(e10) {
          this[I].url.search = e10;
        }
        get password() {
          return this[I].url.password;
        }
        set password(e10) {
          this[I].url.password = e10;
        }
        get username() {
          return this[I].url.username;
        }
        set username(e10) {
          this[I].url.username = e10;
        }
        get basePath() {
          return this[I].basePath;
        }
        set basePath(e10) {
          this[I].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new M(String(this), this[I].options);
        }
      }
      var L, j, D, $, U, W, q, H, B, V, K, G, F = e.i(28042);
      let z = Symbol("internal request");
      class J extends Request {
        constructor(e10, t7 = {}) {
          const r2 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          y(r2), e10 instanceof Request ? super(e10, t7) : super(r2, t7);
          const a2 = new M(r2, { headers: b(this.headers), nextConfig: t7.nextConfig });
          this[z] = { cookies: new F.RequestCookies(this.headers), nextUrl: a2, url: a2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[z].cookies;
        }
        get nextUrl() {
          return this[z].nextUrl;
        }
        get page() {
          throw new p();
        }
        get ua() {
          throw new h();
        }
        get url() {
          return this[z].url;
        }
      }
      class X {
        static get(e10, t7, r2) {
          let a2 = Reflect.get(e10, t7, r2);
          return "function" == typeof a2 ? a2.bind(e10) : a2;
        }
        static set(e10, t7, r2, a2) {
          return Reflect.set(e10, t7, r2, a2);
        }
        static has(e10, t7) {
          return Reflect.has(e10, t7);
        }
        static deleteProperty(e10, t7) {
          return Reflect.deleteProperty(e10, t7);
        }
      }
      let Y = Symbol("internal response"), Q = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function Z(e10, t7) {
        var r2;
        if (null == e10 || null == (r2 = e10.request) ? void 0 : r2.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r3 = [];
          for (let [a2, n2] of e10.request.headers) t7.set("x-middleware-request-" + a2, n2), r3.push(a2);
          t7.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class ee extends Response {
        constructor(e10, t7 = {}) {
          super(e10, t7);
          const r2 = this.headers, a2 = new Proxy(new F.ResponseCookies(r2), { get(e11, a3, n2) {
            switch (a3) {
              case "delete":
              case "set":
                return (...n3) => {
                  let o2 = Reflect.apply(e11[a3], e11, n3), i2 = new Headers(r2);
                  return o2 instanceof F.ResponseCookies && r2.set("x-middleware-set-cookie", o2.getAll().map((e12) => (0, F.stringifyCookie)(e12)).join(",")), Z(t7, i2), o2;
                };
              default:
                return X.get(e11, a3, n2);
            }
          } });
          this[Y] = { cookies: a2, url: t7.url ? new M(t7.url, { headers: b(r2), nextConfig: t7.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[Y].cookies;
        }
        static json(e10, t7) {
          let r2 = Response.json(e10, t7);
          return new ee(r2.body, r2);
        }
        static redirect(e10, t7) {
          let r2 = "number" == typeof t7 ? t7 : (null == t7 ? void 0 : t7.status) ?? 307;
          if (!Q.has(r2)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let a2 = "object" == typeof t7 ? t7 : {}, n2 = new Headers(null == a2 ? void 0 : a2.headers);
          return n2.set("Location", y(e10)), new ee(null, { ...a2, headers: n2, status: r2 });
        }
        static rewrite(e10, t7) {
          let r2 = new Headers(null == t7 ? void 0 : t7.headers);
          return r2.set("x-middleware-rewrite", y(e10)), Z(t7, r2), new ee(null, { ...t7, headers: r2 });
        }
        static next(e10) {
          let t7 = new Headers(null == e10 ? void 0 : e10.headers);
          return t7.set("x-middleware-next", "1"), Z(e10, t7), new ee(null, { ...e10, headers: t7 });
        }
      }
      function et(e10, t7) {
        let r2 = "string" == typeof t7 ? new URL(t7) : t7, a2 = new URL(e10, t7), n2 = a2.origin === r2.origin;
        return { url: n2 ? a2.toString().slice(r2.origin.length) : a2.toString(), isRelative: n2 };
      }
      let er = "next-router-prefetch", ea = ["rsc", "next-router-state-tree", er, "next-hmr-refresh", "next-router-segment-prefetch"], en = "_rsc";
      class eo extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eo();
        }
      }
      class ei extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t7, r2, a2) {
            if ("symbol" == typeof r2) return X.get(t7, r2, a2);
            let n2 = r2.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            if (void 0 !== o2) return X.get(t7, o2, a2);
          }, set(t7, r2, a2, n2) {
            if ("symbol" == typeof r2) return X.set(t7, r2, a2, n2);
            let o2 = r2.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === o2);
            return X.set(t7, i2 ?? r2, a2, n2);
          }, has(t7, r2) {
            if ("symbol" == typeof r2) return X.has(t7, r2);
            let a2 = r2.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return void 0 !== n2 && X.has(t7, n2);
          }, deleteProperty(t7, r2) {
            if ("symbol" == typeof r2) return X.deleteProperty(t7, r2);
            let a2 = r2.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return void 0 === n2 || X.deleteProperty(t7, n2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t7, r2) {
            switch (t7) {
              case "append":
              case "delete":
              case "set":
                return eo.callable;
              default:
                return X.get(e11, t7, r2);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new ei(e10);
        }
        append(e10, t7) {
          let r2 = this.headers[e10];
          "string" == typeof r2 ? this.headers[e10] = [r2, t7] : Array.isArray(r2) ? r2.push(t7) : this.headers[e10] = t7;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t7 = this.headers[e10];
          return void 0 !== t7 ? this.merge(t7) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t7) {
          this.headers[e10] = t7;
        }
        forEach(e10, t7) {
          for (let [r2, a2] of this.entries()) e10.call(t7, a2, r2, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t7 = e10.toLowerCase(), r2 = this.get(t7);
            yield [t7, r2];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t7 = e10.toLowerCase();
            yield t7;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t7 = this.get(e10);
            yield t7;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let es = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class el {
        disable() {
          throw es;
        }
        getStore() {
        }
        run() {
          throw es;
        }
        exit() {
          throw es;
        }
        enterWith() {
          throw es;
        }
        static bind(e10) {
          return e10;
        }
      }
      let ec = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      function eu() {
        return ec ? new ec() : new el();
      }
      let ed = eu();
      class ep extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new ep();
        }
      }
      class eh {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t7, r2) {
            switch (t7) {
              case "clear":
              case "delete":
              case "set":
                return ep.callable;
              default:
                return X.get(e11, t7, r2);
            }
          } });
        }
      }
      let ef = Symbol.for("next.mutated.cookies");
      class eg {
        static wrap(e10, t7) {
          let r2 = new F.ResponseCookies(new Headers());
          for (let t8 of e10.getAll()) r2.set(t8);
          let a2 = [], n2 = /* @__PURE__ */ new Set(), o2 = () => {
            let e11 = ed.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), a2 = r2.getAll().filter((e12) => n2.has(e12.name)), t7) {
              let e12 = [];
              for (let t8 of a2) {
                let r3 = new F.ResponseCookies(new Headers());
                r3.set(t8), e12.push(r3.toString());
              }
              t7(e12);
            }
          }, i2 = new Proxy(r2, { get(e11, t8, r3) {
            switch (t8) {
              case ef:
                return a2;
              case "delete":
                return function(...t9) {
                  n2.add("string" == typeof t9[0] ? t9[0] : t9[0].name);
                  try {
                    return e11.delete(...t9), i2;
                  } finally {
                    o2();
                  }
                };
              case "set":
                return function(...t9) {
                  n2.add("string" == typeof t9[0] ? t9[0] : t9[0].name);
                  try {
                    return e11.set(...t9), i2;
                  } finally {
                    o2();
                  }
                };
              default:
                return X.get(e11, t8, r3);
            }
          } });
          return i2;
        }
      }
      function em(e10, t7) {
        if ("action" !== e10.phase) throw new ep();
      }
      var eb = ((L = eb || {}).handleRequest = "BaseServer.handleRequest", L.run = "BaseServer.run", L.pipe = "BaseServer.pipe", L.getStaticHTML = "BaseServer.getStaticHTML", L.render = "BaseServer.render", L.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", L.renderToResponse = "BaseServer.renderToResponse", L.renderToHTML = "BaseServer.renderToHTML", L.renderError = "BaseServer.renderError", L.renderErrorToResponse = "BaseServer.renderErrorToResponse", L.renderErrorToHTML = "BaseServer.renderErrorToHTML", L.render404 = "BaseServer.render404", L), ey = ((j = ey || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", j.loadComponents = "LoadComponents.loadComponents", j), ev = ((D = ev || {}).getRequestHandler = "NextServer.getRequestHandler", D.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", D.getServer = "NextServer.getServer", D.getServerRequestHandler = "NextServer.getServerRequestHandler", D.createServer = "createServer.createServer", D), ew = (($ = ew || {}).compression = "NextNodeServer.compression", $.getBuildId = "NextNodeServer.getBuildId", $.createComponentTree = "NextNodeServer.createComponentTree", $.clientComponentLoading = "NextNodeServer.clientComponentLoading", $.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", $.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", $.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", $.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", $.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", $.sendRenderResult = "NextNodeServer.sendRenderResult", $.proxyRequest = "NextNodeServer.proxyRequest", $.runApi = "NextNodeServer.runApi", $.render = "NextNodeServer.render", $.renderHTML = "NextNodeServer.renderHTML", $.imageOptimizer = "NextNodeServer.imageOptimizer", $.getPagePath = "NextNodeServer.getPagePath", $.getRoutesManifest = "NextNodeServer.getRoutesManifest", $.findPageComponents = "NextNodeServer.findPageComponents", $.getFontManifest = "NextNodeServer.getFontManifest", $.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", $.getRequestHandler = "NextNodeServer.getRequestHandler", $.renderToHTML = "NextNodeServer.renderToHTML", $.renderError = "NextNodeServer.renderError", $.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", $.render404 = "NextNodeServer.render404", $.startResponse = "NextNodeServer.startResponse", $.route = "route", $.onProxyReq = "onProxyReq", $.apiResolver = "apiResolver", $.internalFetch = "internalFetch", $), e_ = ((U = e_ || {}).startServer = "startServer.startServer", U), ex = ((W = ex || {}).getServerSideProps = "Render.getServerSideProps", W.getStaticProps = "Render.getStaticProps", W.renderToString = "Render.renderToString", W.renderDocument = "Render.renderDocument", W.createBodyResult = "Render.createBodyResult", W), eS = ((q = eS || {}).renderToString = "AppRender.renderToString", q.renderToReadableStream = "AppRender.renderToReadableStream", q.getBodyResult = "AppRender.getBodyResult", q.fetch = "AppRender.fetch", q), eE = ((H = eE || {}).executeRoute = "Router.executeRoute", H), eC = ((B = eC || {}).runHandler = "Node.runHandler", B), eR = ((V = eR || {}).runHandler = "AppRouteRouteHandlers.runHandler", V), eT = ((K = eT || {}).generateMetadata = "ResolveMetadata.generateMetadata", K.generateViewport = "ResolveMetadata.generateViewport", K), eO = ((G = eO || {}).execute = "Middleware.execute", G);
      let eP = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), ek = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eA(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eN = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eI, propagation: eM, trace: eL, SpanStatusCode: ej, SpanKind: eD, ROOT_CONTEXT: e$ } = t = e.r(59110);
      class eU extends Error {
        constructor(e10, t7) {
          super(), this.bubble = e10, this.result = t7;
        }
      }
      let eW = (e10, t7) => {
        "object" == typeof t7 && null !== t7 && t7 instanceof eU && t7.bubble ? e10.setAttribute("next.bubble", true) : (t7 && (e10.recordException(t7), e10.setAttribute("error.type", t7.name)), e10.setStatus({ code: ej.ERROR, message: null == t7 ? void 0 : t7.message })), e10.end();
      }, eq = /* @__PURE__ */ new Map(), eH = t.createContextKey("next.rootSpanId"), eB = 0, eV = { set(e10, t7, r2) {
        e10.push({ key: t7, value: r2 });
      } }, eK = (a = new class e {
        getTracerInstance() {
          return eL.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eI;
        }
        getTracePropagationData() {
          let e10 = eI.active(), t7 = [];
          return eM.inject(e10, t7, eV), t7;
        }
        getActiveScopeSpan() {
          return eL.getSpan(null == eI ? void 0 : eI.active());
        }
        withPropagatedContext(e10, t7, r2) {
          let a2 = eI.active();
          if (eL.getSpanContext(a2)) return t7();
          let n2 = eM.extract(a2, e10, r2);
          return eI.with(n2, t7);
        }
        trace(...e10) {
          let [t7, r2, a2] = e10, { fn: n2, options: o2 } = "function" == typeof r2 ? { fn: r2, options: {} } : { fn: a2, options: { ...r2 } }, i2 = o2.spanName ?? t7;
          if (!eP.has(t7) && "1" !== process.env.NEXT_OTEL_VERBOSE || o2.hideSpan) return n2();
          let s2 = this.getSpanContext((null == o2 ? void 0 : o2.parentSpan) ?? this.getActiveScopeSpan());
          s2 || (s2 = (null == eI ? void 0 : eI.active()) ?? e$);
          let l2 = s2.getValue(eH), c2 = "number" != typeof l2 || !eq.has(l2), u2 = eB++;
          return o2.attributes = { "next.span_name": i2, "next.span_type": t7, ...o2.attributes }, eI.with(s2.setValue(eH, u2), () => this.getTracerInstance().startActiveSpan(i2, o2, (e11) => {
            let r3;
            eN && t7 && ek.has(t7) && (r3 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let a3 = false, i3 = () => {
              !a3 && (a3 = true, eq.delete(u2), r3 && performance.measure(`${eN}:next-${(t7.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r3, end: performance.now() }));
            };
            if (c2 && eq.set(u2, new Map(Object.entries(o2.attributes ?? {}))), n2.length > 1) try {
              return n2(e11, (t8) => eW(e11, t8));
            } catch (t8) {
              throw eW(e11, t8), t8;
            } finally {
              i3();
            }
            try {
              let t8 = n2(e11);
              if (eA(t8)) return t8.then((t9) => (e11.end(), t9)).catch((t9) => {
                throw eW(e11, t9), t9;
              }).finally(i3);
              return e11.end(), i3(), t8;
            } catch (t8) {
              throw eW(e11, t8), i3(), t8;
            }
          }));
        }
        wrap(...e10) {
          let t7 = this, [r2, a2, n2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eP.has(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = a2;
            "function" == typeof e11 && "function" == typeof n2 && (e11 = e11.apply(this, arguments));
            let o2 = arguments.length - 1, i2 = arguments[o2];
            if ("function" != typeof i2) return t7.trace(r2, e11, () => n2.apply(this, arguments));
            {
              let a3 = t7.getContext().bind(eI.active(), i2);
              return t7.trace(r2, e11, (e12, t8) => (arguments[o2] = function(e13) {
                return null == t8 || t8(e13), a3.apply(this, arguments);
              }, n2.apply(this, arguments)));
            }
          } : n2;
        }
        startSpan(...e10) {
          let [t7, r2] = e10, a2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t7, r2, a2);
        }
        getSpanContext(e10) {
          return e10 ? eL.setSpan(eI.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eI.active().getValue(eH);
          return eq.get(e10);
        }
        setRootSpanAttribute(e10, t7) {
          let r2 = eI.active().getValue(eH), a2 = eq.get(r2);
          a2 && !a2.has(e10) && a2.set(e10, t7);
        }
        withSpan(e10, t7) {
          let r2 = eL.setSpan(eI.active(), e10);
          return eI.with(r2, t7);
        }
      }(), () => a), eG = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eG);
      class eF {
        constructor(e10, t7, r2, a2) {
          var n2;
          const o2 = e10 && function(e11, t8) {
            let r3 = ei.from(e11.headers);
            return { isOnDemandRevalidate: r3.get("x-prerender-revalidate") === t8.previewModeId, revalidateOnlyGenerated: r3.has("x-prerender-revalidate-if-generated") };
          }(t7, e10).isOnDemandRevalidate, i2 = null == (n2 = r2.get(eG)) ? void 0 : n2.value;
          this._isEnabled = !!(!o2 && i2 && e10 && i2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = a2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eG, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eG, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function ez(e10, t7) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r2 = e10.headers["x-middleware-set-cookie"], a2 = new Headers();
          for (let e11 of m(r2)) a2.append("set-cookie", e11);
          for (let e11 of new F.ResponseCookies(a2).getAll()) t7.set(e11);
        }
      }
      let eJ = eu();
      class eX extends Error {
        constructor(e10, t7) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t7), this.name = "InvariantError";
        }
      }
      var eY = e.i(99734);
      e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let eQ = Symbol.for("@next/cache-handlers-map"), eZ = Symbol.for("@next/cache-handlers-set"), e0 = globalThis;
      function e1() {
        if (e0[eQ]) return e0[eQ].entries();
      }
      async function e2(e10, t7) {
        if (!e10) return t7();
        let r2 = e6(e10);
        try {
          return await t7();
        } finally {
          var a2, n2;
          let t8, o2, i2 = (a2 = r2, n2 = e6(e10), t8 = new Set(a2.pendingRevalidatedTags.map((e11) => {
            let t9 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t9}`;
          })), o2 = new Set(a2.pendingRevalidateWrites), { pendingRevalidatedTags: n2.pendingRevalidatedTags.filter((e11) => {
            let r3 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t8.has(`${e11.tag}:${r3}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(n2.pendingRevalidates).filter(([e11]) => !(e11 in a2.pendingRevalidates))), pendingRevalidateWrites: n2.pendingRevalidateWrites.filter((e11) => !o2.has(e11)) });
          await e5(e10, i2);
        }
      }
      function e6(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function e4(e10, t7, r2) {
        if (0 === e10.length) return;
        let a2 = function() {
          if (e0[eZ]) return e0[eZ].values();
        }(), n2 = [], o2 = /* @__PURE__ */ new Map();
        for (let t8 of e10) {
          let e11, r3 = t8.profile;
          for (let [t9] of o2) if ("string" == typeof t9 && "string" == typeof r3 && t9 === r3 || "object" == typeof t9 && "object" == typeof r3 && JSON.stringify(t9) === JSON.stringify(r3) || t9 === r3) {
            e11 = t9;
            break;
          }
          let a3 = e11 || r3;
          o2.has(a3) || o2.set(a3, []), o2.get(a3).push(t8.tag);
        }
        for (let [e11, s2] of o2) {
          let o3;
          if (e11) {
            let t8;
            if ("object" == typeof e11) t8 = e11;
            else if ("string" == typeof e11) {
              var i2;
              if (!(t8 = null == r2 || null == (i2 = r2.cacheLifeProfiles) ? void 0 : i2[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t8 && (o3 = { expire: t8.expire });
          }
          for (let t8 of a2 || []) e11 ? n2.push(null == t8.updateTags ? void 0 : t8.updateTags.call(t8, s2, o3)) : n2.push(null == t8.updateTags ? void 0 : t8.updateTags.call(t8, s2));
          t7 && n2.push(t7.revalidateTag(s2, o3));
        }
        await Promise.all(n2);
      }
      async function e5(e10, t7) {
        let r2 = (null == t7 ? void 0 : t7.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], a2 = (null == t7 ? void 0 : t7.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, n2 = (null == t7 ? void 0 : t7.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([e4(r2, e10.incrementalCache, e10), ...Object.values(a2), ...n2]);
      }
      let e3 = eu();
      class e9 {
        constructor({ waitUntil: e10, onClose: t7, onTaskError: r2 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t7, this.onTaskError = r2, this.callbackQueue = new eY.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eA(e10)) this.waitUntil || e8(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          var t7;
          this.waitUntil || e8();
          let r2 = eJ.getStore();
          r2 && this.workUnitStores.add(r2);
          let a2 = e3.getStore(), n2 = a2 ? a2.rootTaskSpawnPhase : null == r2 ? void 0 : r2.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let o2 = (t7 = async () => {
            try {
              await e3.run({ rootTaskSpawnPhase: n2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, ec ? ec.bind(t7) : el.bind(t7));
          this.callbackQueue.add(o2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = ed.getStore();
          if (!e10) throw Object.defineProperty(new eX("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return e2(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t7) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t7), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t7);
          } catch (e11) {
            console.error(Object.defineProperty(new eX("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function e8() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function e7(e10) {
        let t7, r2 = { then: (a2, n2) => (t7 || (t7 = Promise.resolve(e10())), t7.then((e11) => {
          r2.value = e11;
        }).catch(() => {
        }), t7.then(a2, n2)) };
        return r2;
      }
      class te {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function tt() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tr = Symbol.for("@next/request-context");
      async function ta(e10, t7, r2) {
        let a2 = /* @__PURE__ */ new Set();
        for (let t8 of ((e11) => {
          let t9 = ["/layout"];
          if (e11.startsWith("/")) {
            let r3 = e11.split("/");
            for (let e12 = 1; e12 < r3.length + 1; e12++) {
              let a3 = r3.slice(0, e12).join("/");
              a3 && (a3.endsWith("/page") || a3.endsWith("/route") || (a3 = `${a3}${!a3.endsWith("/") ? "/" : ""}layout`), t9.push(a3));
            }
          }
          return t9;
        })(e10)) t8 = `${f}${t8}`, a2.add(t8);
        if (t7.pathname && (!r2 || 0 === r2.size)) {
          let e11 = `${f}${t7.pathname}`;
          a2.add(e11);
        }
        a2.has(`${f}/`) && a2.add(`${f}/index`), a2.has(`${f}/index`) && a2.add(`${f}/`);
        let n2 = Array.from(a2);
        return { tags: n2, expirationsByCacheKind: function(e11) {
          let t8 = /* @__PURE__ */ new Map(), r3 = e1();
          if (r3) for (let [a3, n3] of r3) "getExpiration" in n3 && t8.set(a3, e7(async () => n3.getExpiration(e11)));
          return t8;
        }(n2) };
      }
      class tn extends J {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new d({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let to = { keys: (e10) => Array.from(e10.keys()), get: (e10, t7) => e10.get(t7) ?? void 0 }, ti = (e10, t7) => eK().withPropagatedContext(e10.headers, t7, to), ts = false;
      async function tl(t7) {
        var r2, a2, n2, o2;
        let i2, s2, l2, u2, d2;
        !function() {
          if (!ts && (ts = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t8, wrapRequestHandler: r3 } = e.r(94165);
            t8(), ti = r3(ti);
          }
        }(), await c();
        let p2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t7.request.url = t7.request.url.replace(/\.rsc($|\?)/, "$1");
        let h2 = t7.bypassNextUrl ? new URL(t7.request.url) : new M(t7.request.url, { headers: t7.request.headers, nextConfig: t7.request.nextConfig });
        for (let e10 of [...h2.searchParams.keys()]) {
          let t8 = h2.searchParams.getAll(e10), r3 = function(e11) {
            for (let t9 of ["nxtP", "nxtI"]) if (e11 !== t9 && e11.startsWith(t9)) return e11.substring(t9.length);
            return null;
          }(e10);
          if (r3) {
            for (let e11 of (h2.searchParams.delete(r3), t8)) h2.searchParams.append(r3, e11);
            h2.searchParams.delete(e10);
          }
        }
        let f2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in h2 && (f2 = h2.buildId || "", h2.buildId = "");
        let g2 = function(e10) {
          let t8 = new Headers();
          for (let [r3, a3] of Object.entries(e10)) for (let e11 of Array.isArray(a3) ? a3 : [a3]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t8.append(r3, e11));
          return t8;
        }(t7.request.headers), m2 = g2.has("x-nextjs-data"), b2 = "1" === g2.get("rsc");
        m2 && "/index" === h2.pathname && (h2.pathname = "/");
        let y2 = /* @__PURE__ */ new Map();
        if (!p2) for (let e10 of ea) {
          let t8 = g2.get(e10);
          null !== t8 && (y2.set(e10, t8), g2.delete(e10));
        }
        let v2 = h2.searchParams.get(en), w2 = new tn({ page: t7.page, input: ((u2 = (l2 = "string" == typeof h2) ? new URL(h2) : h2).searchParams.delete(en), l2 ? u2.toString() : u2).toString(), init: { body: t7.request.body, headers: g2, method: t7.request.method, nextConfig: t7.request.nextConfig, signal: t7.request.signal } });
        m2 && Object.defineProperty(w2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t7.IncrementalCache && (globalThis.__incrementalCache = new t7.IncrementalCache({ CurCacheHandler: t7.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t7.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: tt() }) }));
        let x2 = t7.request.waitUntil ?? (null == (r2 = null == (d2 = globalThis[tr]) ? void 0 : d2.get()) ? void 0 : r2.waitUntil), E2 = new S({ request: w2, page: t7.page, context: x2 ? { waitUntil: x2 } : void 0 });
        if ((i2 = await ti(w2, () => {
          if ("/middleware" === t7.page || "/src/middleware" === t7.page || "/proxy" === t7.page || "/src/proxy" === t7.page) {
            let e10 = E2.waitUntil.bind(E2), r3 = new te();
            return eK().trace(eO.execute, { spanName: `middleware ${w2.method}`, attributes: { "http.target": w2.nextUrl.pathname, "http.method": w2.method } }, async () => {
              try {
                var a3, n3, o3, i3, l3, c2;
                let u3 = tt(), d3 = await ta("/", w2.nextUrl, null), p3 = (l3 = w2.nextUrl, c2 = (e11) => {
                  s2 = e11;
                }, function(e11, t8, r4, a4, n4, o4, i4, s3, l4, c3, u4, d4) {
                  function p4(e12) {
                    r4 && r4.setHeader("Set-Cookie", e12);
                  }
                  let h4 = {};
                  return { type: "request", phase: e11, implicitTags: o4, url: { pathname: a4.pathname, search: a4.search ?? "" }, rootParams: n4, get headers() {
                    return h4.headers || (h4.headers = function(e12) {
                      let t9 = ei.from(e12);
                      for (let e13 of ea) t9.delete(e13);
                      return ei.seal(t9);
                    }(t8.headers)), h4.headers;
                  }, get cookies() {
                    if (!h4.cookies) {
                      let e12 = new F.RequestCookies(ei.from(t8.headers));
                      ez(t8, e12), h4.cookies = eh.seal(e12);
                    }
                    return h4.cookies;
                  }, set cookies(value) {
                    h4.cookies = value;
                  }, get mutableCookies() {
                    if (!h4.mutableCookies) {
                      var f3, g3;
                      let e12, a5 = (f3 = t8.headers, g3 = i4 || (r4 ? p4 : void 0), e12 = new F.RequestCookies(ei.from(f3)), eg.wrap(e12, g3));
                      ez(t8, a5), h4.mutableCookies = a5;
                    }
                    return h4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!h4.userspaceMutableCookies) {
                      var m3;
                      let e12;
                      m3 = this, h4.userspaceMutableCookies = e12 = new Proxy(m3.mutableCookies, { get(t9, r5, a5) {
                        switch (r5) {
                          case "delete":
                            return function(...r6) {
                              return em(m3, "cookies().delete"), t9.delete(...r6), e12;
                            };
                          case "set":
                            return function(...r6) {
                              return em(m3, "cookies().set"), t9.set(...r6), e12;
                            };
                          default:
                            return X.get(t9, r5, a5);
                        }
                      } });
                    }
                    return h4.userspaceMutableCookies;
                  }, get draftMode() {
                    return h4.draftMode || (h4.draftMode = new eF(l4, t8, this.cookies, this.mutableCookies)), h4.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: c3, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                }("action", w2, void 0, l3, {}, d3, c2, null, u3, false, void 0, null)), h3 = function({ page: e11, renderOpts: t8, isPrefetchRequest: r4, buildId: a4, previouslyRevalidatedTags: n4, nonce: o4 }) {
                  var i4;
                  let s3 = !t8.shouldWaitOnAllReady && !t8.supportsDynamicResponse && !t8.isDraftMode && !t8.isPossibleServerAction, l4 = t8.dev ?? false, c3 = l4 || s3 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), u4 = { isStaticGeneration: s3, page: e11, route: (i4 = e11.split("/").reduce((e12, t9, r5, a5) => t9 ? "(" === t9[0] && t9.endsWith(")") || "@" === t9[0] || ("page" === t9 || "route" === t9) && r5 === a5.length - 1 ? e12 : `${e12}/${t9}` : e12, "")).startsWith("/") ? i4 : `/${i4}`, incrementalCache: t8.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t8.cacheLifeProfiles, isBuildTimePrerendering: t8.nextExport, hasReadableErrorStacks: t8.hasReadableErrorStacks, fetchCache: t8.fetchCache, isOnDemandRevalidate: t8.isOnDemandRevalidate, isDraftMode: t8.isDraftMode, isPrefetchRequest: r4, buildId: a4, reactLoadableManifest: (null == t8 ? void 0 : t8.reactLoadableManifest) || {}, assetPrefix: (null == t8 ? void 0 : t8.assetPrefix) || "", nonce: o4, afterContext: function(e12) {
                    let { waitUntil: t9, onClose: r5, onAfterTaskError: a5 } = e12;
                    return new e9({ waitUntil: t9, onClose: r5, onTaskError: a5 });
                  }(t8), cacheComponentsEnabled: t8.cacheComponents, dev: l4, previouslyRevalidatedTags: n4, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t9 = e1();
                    if (t9) for (let [r5, a5] of t9) "refreshTags" in a5 && e12.set(r5, e7(async () => a5.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: ec ? ec.snapshot() : function(e12, ...t9) {
                    return e12(...t9);
                  }, shouldTrackFetchMetrics: c3, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t8.store = u4, u4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (n3 = t7.request.nextConfig) || null == (a3 = n3.experimental) ? void 0 : a3.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (i3 = t7.request.nextConfig) || null == (o3 = i3.experimental) ? void 0 : o3.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r3.onClose.bind(r3), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === w2.headers.get(er), buildId: f2 ?? "", previouslyRevalidatedTags: [] });
                return await ed.run(h3, () => eJ.run(p3, t7.handler, w2, E2));
              } finally {
                setTimeout(() => {
                  r3.dispatchClose();
                }, 0);
              }
            });
          }
          return t7.handler(w2, E2);
        })) && !(i2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        i2 && s2 && i2.headers.set("set-cookie", s2);
        let C2 = null == i2 ? void 0 : i2.headers.get("x-middleware-rewrite");
        if (i2 && C2 && (b2 || !p2)) {
          let e10 = new M(C2, { forceLocale: true, headers: t7.request.headers, nextConfig: t7.request.nextConfig });
          p2 || e10.host !== w2.nextUrl.host || (e10.buildId = f2 || e10.buildId, i2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r3, isRelative: s3 } = et(e10.toString(), h2.toString());
          !p2 && m2 && i2.headers.set("x-nextjs-rewrite", r3);
          let l3 = !s3 && (null == (o2 = t7.request.nextConfig) || null == (n2 = o2.experimental) || null == (a2 = n2.clientParamParsingOrigins) ? void 0 : a2.some((t8) => new RegExp(t8).test(e10.origin)));
          b2 && (s3 || l3) && (h2.pathname !== e10.pathname && i2.headers.set("x-nextjs-rewritten-path", e10.pathname), h2.search !== e10.search && i2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (i2 && C2 && b2 && v2) {
          let e10 = new URL(C2);
          e10.searchParams.has(en) || (e10.searchParams.set(en, v2), i2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let R2 = null == i2 ? void 0 : i2.headers.get("Location");
        if (i2 && R2 && !p2) {
          let e10 = new M(R2, { forceLocale: false, headers: t7.request.headers, nextConfig: t7.request.nextConfig });
          i2 = new Response(i2.body, i2), e10.host === h2.host && (e10.buildId = f2 || e10.buildId, i2.headers.set("Location", et(e10, h2).url)), m2 && (i2.headers.delete("Location"), i2.headers.set("x-nextjs-redirect", et(e10.toString(), h2.toString()).url));
        }
        let T2 = i2 || ee.next(), O2 = T2.headers.get("x-middleware-override-headers"), P2 = [];
        if (O2) {
          for (let [e10, t8] of y2) T2.headers.set(`x-middleware-request-${e10}`, t8), P2.push(e10);
          P2.length > 0 && T2.headers.set("x-middleware-override-headers", O2 + "," + P2.join(","));
        }
        return { response: T2, waitUntil: ("internal" === E2[_].kind ? Promise.all(E2[_].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: w2.fetchMetrics };
      }
      e.i(64445), "u" < typeof URLPattern || URLPattern;
      var tc = e.i(40049);
      if (/* @__PURE__ */ new WeakMap(), tc.default.unstable_postpone, false === ("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("needs to bail out of prerendering at this point because it used") && "Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)`), RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`), e.s([], 85835), e.i(85835);
      let tu = new TextEncoder(), td = new TextDecoder();
      function tp(e10) {
        let t7 = new Uint8Array(e10.length);
        for (let r2 = 0; r2 < e10.length; r2++) {
          let a2 = e10.charCodeAt(r2);
          if (a2 > 127) throw TypeError("non-ASCII string encountered in encode()");
          t7[r2] = a2;
        }
        return t7;
      }
      function th(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e10 ? e10 : td.decode(e10), { alphabet: "base64url" });
        let t7 = e10;
        t7 instanceof Uint8Array && (t7 = td.decode(t7)), t7 = t7.replace(/-/g, "+").replace(/_/g, "/");
        try {
          var r2 = t7;
          if (Uint8Array.fromBase64) return Uint8Array.fromBase64(r2);
          let e11 = atob(r2), a2 = new Uint8Array(e11.length);
          for (let t8 = 0; t8 < e11.length; t8++) a2[t8] = e11.charCodeAt(t8);
          return a2;
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }
      class tf extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t7) {
          super(e10, t7), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class tg extends tf {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t7, r2 = "unspecified", a2 = "unspecified") {
          super(e10, { cause: { claim: r2, reason: a2, payload: t7 } }), this.claim = r2, this.reason = a2, this.payload = t7;
        }
      }
      class tm extends tf {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t7, r2 = "unspecified", a2 = "unspecified") {
          super(e10, { cause: { claim: r2, reason: a2, payload: t7 } }), this.claim = r2, this.reason = a2, this.payload = t7;
        }
      }
      class tb extends tf {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class ty extends tf {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class tv extends tf {
        static code = "ERR_JWS_INVALID";
        code = "ERR_JWS_INVALID";
      }
      class tw extends tf {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class t_ extends tf {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(e10 = "multiple matching keys found in the JSON Web Key Set", t7) {
          super(e10, t7);
        }
      }
      class tx extends tf {
        static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        constructor(e10 = "signature verification failed", t7) {
          super(e10, t7);
        }
      }
      let tS = (e10, t7 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${t7} must be ${e10}`);
      function tE(e10, t7) {
        if (parseInt(e10.hash.name.slice(4), 10) !== t7) throw tS(`SHA-${t7}`, "algorithm.hash");
      }
      function tC(e10, t7, ...r2) {
        if ((r2 = r2.filter(Boolean)).length > 2) {
          let t8 = r2.pop();
          e10 += `one of type ${r2.join(", ")}, or ${t8}.`;
        } else 2 === r2.length ? e10 += `one of type ${r2[0]} or ${r2[1]}.` : e10 += `of type ${r2[0]}.`;
        return null == t7 ? e10 += ` Received ${t7}` : "function" == typeof t7 && t7.name ? e10 += ` Received function ${t7.name}` : "object" == typeof t7 && null != t7 && t7.constructor?.name && (e10 += ` Received an instance of ${t7.constructor.name}`), e10;
      }
      let tR = (e10, t7, ...r2) => tC(`Key for the ${e10} algorithm must be `, t7, ...r2);
      async function tT(e10, t7, r2) {
        if (t7 instanceof Uint8Array) {
          if (!e10.startsWith("HS")) throw TypeError(((e11, ...t8) => tC("Key must be ", e11, ...t8))(t7, "CryptoKey", "KeyObject", "JSON Web Key"));
          return crypto.subtle.importKey("raw", t7, { hash: `SHA-${e10.slice(-3)}`, name: "HMAC" }, false, [r2]);
        }
        return !function(e11, t8, r3) {
          switch (t8) {
            case "HS256":
            case "HS384":
            case "HS512":
              if ("HMAC" !== e11.algorithm.name) throw tS("HMAC");
              tE(e11.algorithm, parseInt(t8.slice(2), 10));
              break;
            case "RS256":
            case "RS384":
            case "RS512":
              if ("RSASSA-PKCS1-v1_5" !== e11.algorithm.name) throw tS("RSASSA-PKCS1-v1_5");
              tE(e11.algorithm, parseInt(t8.slice(2), 10));
              break;
            case "PS256":
            case "PS384":
            case "PS512":
              if ("RSA-PSS" !== e11.algorithm.name) throw tS("RSA-PSS");
              tE(e11.algorithm, parseInt(t8.slice(2), 10));
              break;
            case "Ed25519":
            case "EdDSA":
              if ("Ed25519" !== e11.algorithm.name) throw tS("Ed25519");
              break;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              let a2;
              if (a2 = e11.algorithm, a2.name !== t8) throw tS(t8);
              break;
            case "ES256":
            case "ES384":
            case "ES512": {
              if ("ECDSA" !== e11.algorithm.name) throw tS("ECDSA");
              let r4 = function(e12) {
                switch (e12) {
                  case "ES256":
                    return "P-256";
                  case "ES384":
                    return "P-384";
                  case "ES512":
                    return "P-521";
                  default:
                    throw Error("unreachable");
                }
              }(t8);
              if (e11.algorithm.namedCurve !== r4) throw tS(r4, "algorithm.namedCurve");
              break;
            }
            default:
              throw TypeError("CryptoKey does not support this operation");
          }
          if (r3 && !e11.usages.includes(r3)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${r3}.`);
        }(t7, e10, r2), t7;
      }
      async function tO(e10, t7, r2, a2) {
        let n2 = await tT(e10, t7, "verify");
        !function(e11, t8) {
          if (e11.startsWith("RS") || e11.startsWith("PS")) {
            let { modulusLength: r3 } = t8.algorithm;
            if ("number" != typeof r3 || r3 < 2048) throw TypeError(`${e11} requires key modulusLength to be 2048 bits or larger`);
          }
        }(e10, n2);
        let o2 = function(e11, t8) {
          let r3 = `SHA-${e11.slice(-3)}`;
          switch (e11) {
            case "HS256":
            case "HS384":
            case "HS512":
              return { hash: r3, name: "HMAC" };
            case "PS256":
            case "PS384":
            case "PS512":
              return { hash: r3, name: "RSA-PSS", saltLength: parseInt(e11.slice(-3), 10) >> 3 };
            case "RS256":
            case "RS384":
            case "RS512":
              return { hash: r3, name: "RSASSA-PKCS1-v1_5" };
            case "ES256":
            case "ES384":
            case "ES512":
              return { hash: r3, name: "ECDSA", namedCurve: t8.namedCurve };
            case "Ed25519":
            case "EdDSA":
              return { name: "Ed25519" };
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              return { name: e11 };
            default:
              throw new ty(`alg ${e11} is not supported either by JOSE or your javascript runtime`);
          }
        }(e10, n2.algorithm);
        try {
          return await crypto.subtle.verify(o2, n2, r2, a2);
        } catch {
          return false;
        }
      }
      function tP(e10, t7, r2) {
        try {
          return th(e10);
        } catch {
          throw new r2(`Failed to base64url decode the ${t7}`);
        }
      }
      function tk(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t7 = e10;
        for (; null !== Object.getPrototypeOf(t7); ) t7 = Object.getPrototypeOf(t7);
        return Object.getPrototypeOf(e10) === t7;
      }
      Symbol();
      let tA = (e10) => tk(e10) && "string" == typeof e10.kty, tN = (e10) => {
        if (e10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return e10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, tI = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", tM = (e10) => tN(e10) || tI(e10), tL = (e10) => e10?.[Symbol.toStringTag], tj = (e10, t7, r2) => {
        if (void 0 !== t7.use) {
          let e11;
          switch (r2) {
            case "sign":
            case "verify":
              e11 = "sig";
              break;
            case "encrypt":
            case "decrypt":
              e11 = "enc";
          }
          if (t7.use !== e11) throw TypeError(`Invalid key for this operation, its "use" must be "${e11}" when present`);
        }
        if (void 0 !== t7.alg && t7.alg !== e10) throw TypeError(`Invalid key for this operation, its "alg" must be "${e10}" when present`);
        if (Array.isArray(t7.key_ops)) {
          let a2;
          switch (true) {
            case ("sign" === r2 || "verify" === r2):
            case "dir" === e10:
            case e10.includes("CBC-HS"):
              a2 = r2;
              break;
            case e10.startsWith("PBES2"):
              a2 = "deriveBits";
              break;
            case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e10):
              a2 = !e10.includes("GCM") && e10.endsWith("KW") ? "encrypt" === r2 ? "wrapKey" : "unwrapKey" : r2;
              break;
            case ("encrypt" === r2 && e10.startsWith("RSA")):
              a2 = "wrapKey";
              break;
            case "decrypt" === r2:
              a2 = e10.startsWith("RSA") ? "unwrapKey" : "deriveBits";
          }
          if (a2 && t7.key_ops?.includes?.(a2) === false) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${a2}" when present`);
        }
        return true;
      }, tD = 'Invalid or unsupported JWK "alg" (Algorithm) Parameter value';
      async function t$(e10) {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t7, keyUsages: r2 } = function(e11) {
          let t8, r3;
          switch (e11.kty) {
            case "AKP":
              switch (e11.alg) {
                case "ML-DSA-44":
                case "ML-DSA-65":
                case "ML-DSA-87":
                  t8 = { name: e11.alg }, r3 = e11.priv ? ["sign"] : ["verify"];
                  break;
                default:
                  throw new ty(tD);
              }
              break;
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t8 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t8 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t8 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r3 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new ty(tD);
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                case "ES384":
                case "ES512":
                  t8 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[e11.alg] }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t8 = { name: "ECDH", namedCurve: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new ty(tD);
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                case "EdDSA":
                  t8 = { name: "Ed25519" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t8 = { name: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new ty(tD);
              }
              break;
            default:
              throw new ty('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t8, keyUsages: r3 };
        }(e10), a2 = { ...e10 };
        return "AKP" !== a2.kty && delete a2.alg, delete a2.use, crypto.subtle.importKey("jwk", a2, t7, e10.ext ?? (!e10.d && !e10.priv), e10.key_ops ?? r2);
      }
      let tU = "given KeyObject instance cannot be used for this algorithm", tW = async (e10, t7, a2, n2 = false) => {
        let o2 = (r ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (o2?.[a2]) return o2[a2];
        let i2 = await t$({ ...t7, alg: a2 });
        return n2 && Object.freeze(e10), o2 ? o2[a2] = i2 : r.set(e10, { [a2]: i2 }), i2;
      };
      async function tq(e10, t7) {
        if (e10 instanceof Uint8Array || tN(e10)) return e10;
        if (tI(e10)) {
          if ("secret" === e10.type) return e10.export();
          if ("toCryptoKey" in e10 && "function" == typeof e10.toCryptoKey) try {
            return ((e11, t8) => {
              let a3, n2 = (r ||= /* @__PURE__ */ new WeakMap()).get(e11);
              if (n2?.[t8]) return n2[t8];
              let o2 = "public" === e11.type, i2 = !!o2;
              if ("x25519" === e11.asymmetricKeyType) {
                switch (t8) {
                  case "ECDH-ES":
                  case "ECDH-ES+A128KW":
                  case "ECDH-ES+A192KW":
                  case "ECDH-ES+A256KW":
                    break;
                  default:
                    throw TypeError(tU);
                }
                a3 = e11.toCryptoKey(e11.asymmetricKeyType, i2, o2 ? [] : ["deriveBits"]);
              }
              if ("ed25519" === e11.asymmetricKeyType) {
                if ("EdDSA" !== t8 && "Ed25519" !== t8) throw TypeError(tU);
                a3 = e11.toCryptoKey(e11.asymmetricKeyType, i2, [o2 ? "verify" : "sign"]);
              }
              switch (e11.asymmetricKeyType) {
                case "ml-dsa-44":
                case "ml-dsa-65":
                case "ml-dsa-87":
                  if (t8 !== e11.asymmetricKeyType.toUpperCase()) throw TypeError(tU);
                  a3 = e11.toCryptoKey(e11.asymmetricKeyType, i2, [o2 ? "verify" : "sign"]);
              }
              if ("rsa" === e11.asymmetricKeyType) {
                let r2;
                switch (t8) {
                  case "RSA-OAEP":
                    r2 = "SHA-1";
                    break;
                  case "RS256":
                  case "PS256":
                  case "RSA-OAEP-256":
                    r2 = "SHA-256";
                    break;
                  case "RS384":
                  case "PS384":
                  case "RSA-OAEP-384":
                    r2 = "SHA-384";
                    break;
                  case "RS512":
                  case "PS512":
                  case "RSA-OAEP-512":
                    r2 = "SHA-512";
                    break;
                  default:
                    throw TypeError(tU);
                }
                if (t8.startsWith("RSA-OAEP")) return e11.toCryptoKey({ name: "RSA-OAEP", hash: r2 }, i2, o2 ? ["encrypt"] : ["decrypt"]);
                a3 = e11.toCryptoKey({ name: t8.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: r2 }, i2, [o2 ? "verify" : "sign"]);
              }
              if ("ec" === e11.asymmetricKeyType) {
                let r2 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(e11.asymmetricKeyDetails?.namedCurve);
                if (!r2) throw TypeError(tU);
                let n3 = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
                n3[t8] && r2 === n3[t8] && (a3 = e11.toCryptoKey({ name: "ECDSA", namedCurve: r2 }, i2, [o2 ? "verify" : "sign"])), t8.startsWith("ECDH-ES") && (a3 = e11.toCryptoKey({ name: "ECDH", namedCurve: r2 }, i2, o2 ? [] : ["deriveBits"]));
              }
              if (!a3) throw TypeError(tU);
              return n2 ? n2[t8] = a3 : r.set(e11, { [t8]: a3 }), a3;
            })(e10, t7);
          } catch (e11) {
            if (e11 instanceof TypeError) throw e11;
          }
          let a2 = e10.export({ format: "jwk" });
          return tW(e10, a2, t7);
        }
        if (tA(e10)) return e10.k ? th(e10.k) : tW(e10, e10, t7, true);
        throw Error("unreachable");
      }
      async function tH(e10, t7, r2) {
        if (!tk(e10)) throw new tv("Flattened JWS must be an object");
        if (void 0 === e10.protected && void 0 === e10.header) throw new tv('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new tv("JWS Protected Header incorrect type");
        if (void 0 === e10.payload) throw new tv("JWS Payload missing");
        if ("string" != typeof e10.signature) throw new tv("JWS Signature missing or incorrect type");
        if (void 0 !== e10.header && !tk(e10.header)) throw new tv("JWS Unprotected Header incorrect type");
        let a2 = {};
        if (e10.protected) try {
          let t8 = th(e10.protected);
          a2 = JSON.parse(td.decode(t8));
        } catch {
          throw new tv("JWS Protected Header is invalid");
        }
        if (!function(...e11) {
          let t8, r3 = e11.filter(Boolean);
          if (0 === r3.length || 1 === r3.length) return true;
          for (let e12 of r3) {
            let r4 = Object.keys(e12);
            if (!t8 || 0 === t8.size) {
              t8 = new Set(r4);
              continue;
            }
            for (let e13 of r4) {
              if (t8.has(e13)) return false;
              t8.add(e13);
            }
          }
          return true;
        }(a2, e10.header)) throw new tv("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let n2 = { ...a2, ...e10.header }, o2 = function(e11, t8, r3, a3, n3) {
          let o3;
          if (void 0 !== n3.crit && a3?.crit === void 0) throw new e11('"crit" (Critical) Header Parameter MUST be integrity protected');
          if (!a3 || void 0 === a3.crit) return /* @__PURE__ */ new Set();
          if (!Array.isArray(a3.crit) || 0 === a3.crit.length || a3.crit.some((e12) => "string" != typeof e12 || 0 === e12.length)) throw new e11('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
          for (let i3 of (o3 = void 0 !== r3 ? new Map([...Object.entries(r3), ...t8.entries()]) : t8, a3.crit)) {
            if (!o3.has(i3)) throw new ty(`Extension Header Parameter "${i3}" is not recognized`);
            if (void 0 === n3[i3]) throw new e11(`Extension Header Parameter "${i3}" is missing`);
            if (o3.get(i3) && void 0 === a3[i3]) throw new e11(`Extension Header Parameter "${i3}" MUST be integrity protected`);
          }
          return new Set(a3.crit);
        }(tv, /* @__PURE__ */ new Map([["b64", true]]), r2?.crit, a2, n2), i2 = true;
        if (o2.has("b64") && "boolean" != typeof (i2 = a2.b64)) throw new tv('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: s2 } = n2;
        if ("string" != typeof s2 || !s2) throw new tv('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let l2 = r2 && function(e11, t8) {
          if (void 0 !== t8 && (!Array.isArray(t8) || t8.some((e12) => "string" != typeof e12))) throw TypeError(`"${e11}" option must be an array of strings`);
          if (t8) return new Set(t8);
        }("algorithms", r2.algorithms);
        if (l2 && !l2.has(s2)) throw new tb('"alg" (Algorithm) Header Parameter value not allowed');
        if (i2) {
          if ("string" != typeof e10.payload) throw new tv("JWS Payload must be a string");
        } else if ("string" != typeof e10.payload && !(e10.payload instanceof Uint8Array)) throw new tv("JWS Payload must be a string or an Uint8Array instance");
        let c2 = false;
        "function" == typeof t7 && (t7 = await t7(a2, e10), c2 = true);
        var u2 = t7, d2 = "verify";
        switch (s2.substring(0, 2)) {
          case "A1":
          case "A2":
          case "di":
          case "HS":
          case "PB":
            ((e11, t8, r3) => {
              if (!(t8 instanceof Uint8Array)) {
                if (tA(t8)) {
                  if ("oct" === t8.kty && "string" == typeof t8.k && tj(e11, t8, r3)) return;
                  throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
                }
                if (!tM(t8)) throw TypeError(tR(e11, t8, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
                if ("secret" !== t8.type) throw TypeError(`${tL(t8)} instances for symmetric algorithms must be of type "secret"`);
              }
            })(s2, u2, d2);
            break;
          default:
            ((e11, t8, r3) => {
              if (tA(t8)) switch (r3) {
                case "decrypt":
                case "sign":
                  if ("oct" !== t8.kty && ("AKP" === t8.kty && "string" == typeof t8.priv || "string" == typeof t8.d) && tj(e11, t8, r3)) return;
                  throw TypeError("JSON Web Key for this operation must be a private JWK");
                case "encrypt":
                case "verify":
                  if ("oct" !== t8.kty && void 0 === t8.d && void 0 === t8.priv && tj(e11, t8, r3)) return;
                  throw TypeError("JSON Web Key for this operation must be a public JWK");
              }
              if (!tM(t8)) throw TypeError(tR(e11, t8, "CryptoKey", "KeyObject", "JSON Web Key"));
              if ("secret" === t8.type) throw TypeError(`${tL(t8)} instances for asymmetric algorithms must not be of type "secret"`);
              if ("public" === t8.type) switch (r3) {
                case "sign":
                  throw TypeError(`${tL(t8)} instances for asymmetric algorithm signing must be of type "private"`);
                case "decrypt":
                  throw TypeError(`${tL(t8)} instances for asymmetric algorithm decryption must be of type "private"`);
              }
              if ("private" === t8.type) switch (r3) {
                case "verify":
                  throw TypeError(`${tL(t8)} instances for asymmetric algorithm verifying must be of type "public"`);
                case "encrypt":
                  throw TypeError(`${tL(t8)} instances for asymmetric algorithm encryption must be of type "public"`);
              }
            })(s2, u2, d2);
        }
        let p2 = function(...e11) {
          let t8 = new Uint8Array(e11.reduce((e12, { length: t9 }) => e12 + t9, 0)), r3 = 0;
          for (let a3 of e11) t8.set(a3, r3), r3 += a3.length;
          return t8;
        }(void 0 !== e10.protected ? tp(e10.protected) : new Uint8Array(), tp("."), "string" == typeof e10.payload ? i2 ? tp(e10.payload) : tu.encode(e10.payload) : e10.payload), h2 = tP(e10.signature, "signature", tv), f2 = await tq(t7, s2);
        if (!await tO(s2, f2, h2, p2)) throw new tx();
        let g2 = { payload: i2 ? tP(e10.payload, "payload", tv) : "string" == typeof e10.payload ? tu.encode(e10.payload) : e10.payload };
        return (void 0 !== e10.protected && (g2.protectedHeader = a2), void 0 !== e10.header && (g2.unprotectedHeader = e10.header), c2) ? { ...g2, key: f2 } : g2;
      }
      async function tB(e10, t7, r2) {
        if (e10 instanceof Uint8Array && (e10 = td.decode(e10)), "string" != typeof e10) throw new tv("Compact JWS must be a string or Uint8Array");
        let { 0: a2, 1: n2, 2: o2, length: i2 } = e10.split(".");
        if (3 !== i2) throw new tv("Invalid Compact JWS");
        let s2 = await tH({ payload: n2, protected: a2, signature: o2 }, t7, r2), l2 = { payload: s2.payload, protectedHeader: s2.protectedHeader };
        return "function" == typeof t7 ? { ...l2, key: s2.key } : l2;
      }
      let tV = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      function tK(e10) {
        let t7, r2 = tV.exec(e10);
        if (!r2 || r2[4] && r2[1]) throw TypeError("Invalid time period format");
        let a2 = parseFloat(r2[2]);
        switch (r2[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t7 = Math.round(a2);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t7 = Math.round(60 * a2);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t7 = Math.round(3600 * a2);
            break;
          case "day":
          case "days":
          case "d":
            t7 = Math.round(86400 * a2);
            break;
          case "week":
          case "weeks":
          case "w":
            t7 = Math.round(604800 * a2);
            break;
          default:
            t7 = Math.round(31557600 * a2);
        }
        return "-" === r2[1] || "ago" === r2[4] ? -t7 : t7;
      }
      let tG = (e10) => e10.includes("/") ? e10.toLowerCase() : `application/${e10.toLowerCase()}`;
      async function tF(e10, t7, r2) {
        let a2 = await tB(e10, t7, r2);
        if (a2.protectedHeader.crit?.includes("b64") && false === a2.protectedHeader.b64) throw new tw("JWTs MUST NOT use unencoded payload");
        let n2 = { payload: function(e11, t8, r3 = {}) {
          var a3, n3;
          let o2, i2;
          try {
            o2 = JSON.parse(td.decode(t8));
          } catch {
          }
          if (!tk(o2)) throw new tw("JWT Claims Set must be a top-level JSON object");
          let { typ: s2 } = r3;
          if (s2 && ("string" != typeof e11.typ || tG(e11.typ) !== tG(s2))) throw new tg('unexpected "typ" JWT header value', o2, "typ", "check_failed");
          let { requiredClaims: l2 = [], issuer: c2, subject: u2, audience: d2, maxTokenAge: p2 } = r3, h2 = [...l2];
          for (let e12 of (void 0 !== p2 && h2.push("iat"), void 0 !== d2 && h2.push("aud"), void 0 !== u2 && h2.push("sub"), void 0 !== c2 && h2.push("iss"), new Set(h2.reverse()))) if (!(e12 in o2)) throw new tg(`missing required "${e12}" claim`, o2, e12, "missing");
          if (c2 && !(Array.isArray(c2) ? c2 : [c2]).includes(o2.iss)) throw new tg('unexpected "iss" claim value', o2, "iss", "check_failed");
          if (u2 && o2.sub !== u2) throw new tg('unexpected "sub" claim value', o2, "sub", "check_failed");
          if (d2 && (a3 = o2.aud, n3 = "string" == typeof d2 ? [d2] : d2, "string" == typeof a3 ? !n3.includes(a3) : !(Array.isArray(a3) && n3.some(Set.prototype.has.bind(new Set(a3)))))) throw new tg('unexpected "aud" claim value', o2, "aud", "check_failed");
          switch (typeof r3.clockTolerance) {
            case "string":
              i2 = tK(r3.clockTolerance);
              break;
            case "number":
              i2 = r3.clockTolerance;
              break;
            case "undefined":
              i2 = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          let { currentDate: f2 } = r3, g2 = Math.floor((f2 || /* @__PURE__ */ new Date()).getTime() / 1e3);
          if ((void 0 !== o2.iat || p2) && "number" != typeof o2.iat) throw new tg('"iat" claim must be a number', o2, "iat", "invalid");
          if (void 0 !== o2.nbf) {
            if ("number" != typeof o2.nbf) throw new tg('"nbf" claim must be a number', o2, "nbf", "invalid");
            if (o2.nbf > g2 + i2) throw new tg('"nbf" claim timestamp check failed', o2, "nbf", "check_failed");
          }
          if (void 0 !== o2.exp) {
            if ("number" != typeof o2.exp) throw new tg('"exp" claim must be a number', o2, "exp", "invalid");
            if (o2.exp <= g2 - i2) throw new tm('"exp" claim timestamp check failed', o2, "exp", "check_failed");
          }
          if (p2) {
            let e12 = g2 - o2.iat;
            if (e12 - i2 > ("number" == typeof p2 ? p2 : tK(p2))) throw new tm('"iat" claim timestamp check failed (too far in the past)', o2, "iat", "check_failed");
            if (e12 < 0 - i2) throw new tg('"iat" claim timestamp check failed (it should be in the past)', o2, "iat", "check_failed");
          }
          return o2;
        }(a2.protectedHeader, a2.payload, r2), protectedHeader: a2.protectedHeader };
        return "function" == typeof t7 ? { ...n2, key: a2.key } : n2;
      }
      let tz = process.env.JWT_SECRET || (() => {
        throw Error("JWT_SECRET environment variable is required. Set it in .env (NEVER commit to git).");
      })();
      async function tJ(e10) {
        try {
          let t7 = new TextEncoder().encode(tz), { payload: r2 } = await tF(e10, t7);
          if ("admin" === r2.role) return r2;
          return null;
        } catch {
          return null;
        }
      }
      function tX() {
        return "thetaxcalc_admin_session";
      }
      process.env.ADMIN_PASSWORD || (() => {
        throw Error("ADMIN_PASSWORD environment variable is required. Set it in .env (NEVER commit to git).");
      })();
      let tY = ["/admin"], tQ = ["/api/admin", "/api/auth/verify"], tZ = ["/api/blog", "/api/ads", "/api/settings", "/api/links"], t0 = ["/api/auth/login", "/api/auth/logout", "/api/track"], t1 = ["/api/seed"];
      async function t2(e10) {
        let { pathname: t7 } = e10.nextUrl;
        if (t7.startsWith("/_next") || t7.startsWith("/static") || t7.includes(".")) return ee.next();
        if ((e10.headers.get("accept") || "").includes("text/markdown") && !t7.startsWith("/_next") && !t7.startsWith("/api") && !t7.includes(".")) {
          let e11 = { "/": `# TheTaxCalc \u2014 Free 2026 Tax Calculator

> Free, accurate, no-sign-up tax calculators for US taxpayers. 64 calculators covering all 50 states.

## Key Tools

- [Paycheck Calculator](/paycheck-calculator) \u2014 Calculate take-home pay after federal, FICA & state taxes
- [Sales Tax Calculator](/sales-tax-calculator) \u2014 All 50 US states with combined state + local rates
- [Lottery Tax Calculator](/lottery-tax-calculator) \u2014 How much you keep after federal + state taxes
- [Self-Employment Tax Calculator](/self-employment-tax-calculator) \u2014 15.3% SE tax + quarterly estimates
- [Property Tax Calculator](/property-tax-calculator) \u2014 Compare property taxes across all 50 states
- [401(k) Retirement Calculator](/401k-retirement-calculator) \u2014 Projected balance with employer match
- [Capital Gains Calculator](/capital-gains-calculator) \u2014 Short-term & long-term rates
- [Mortgage Calculator](/mortgage-calculator) \u2014 Payment, amortization & extra payments

## State Tax Calculators (50 states)

- [California Tax Calculator](/california-tax-calculator) \u2014 1%\u201313.3% progressive
- [Texas Tax Calculator](/texas-tax-calculator) \u2014 0% income tax
- [Florida Tax Calculator](/florida-tax-calculator) \u2014 0% income tax
- [New York Tax Calculator](/new-york-tax-calculator) \u2014 4%\u201310.9% + NYC tax
- [Illinois Tax Calculator](/illinois-tax-calculator) \u2014 4.95% flat tax

## Compare States

- [California vs New York](/compare/california-vs-new-york)
- [Texas vs Florida](/compare/texas-vs-florida)
- [Illinois vs Texas](/compare/illinois-vs-texas)

## Resources

- [Federal Tax Brackets 2026](/federal-tax-brackets)
- [Tax Blog](/blog)
- [About TheTaxCalc](/about)
- [Methodology](/methodology)

## Author

Rachel Mitchell, CPA

Visit https://thetaxcalc.com for full interactive calculators.`, "/paycheck-calculator": `# Free Paycheck Calculator 2026

Calculate your take-home pay after federal, FICA & state taxes.

## How It Works

1. Enter your salary (annual, monthly, bi-weekly, weekly, or hourly)
2. Select your state (IL, TX, FL, CA, NY, and more)
3. Choose filing status (Single, Married, Head of Household)
4. Add pre-tax deductions (401k, HSA)
5. View instant results

## 2026 Federal Tax Brackets (Single)

| Rate | Income Range |
|------|-------------|
| 10% | $0 \u2013 $11,925 |
| 12% | $11,926 \u2013 $48,475 |
| 22% | $48,476 \u2013 $103,350 |
| 24% | $103,351 \u2013 $197,300 |
| 32% | $197,301 \u2013 $250,525 |
| 35% | $250,526 \u2013 $626,350 |
| 37% | Over $626,350 |

## FICA Taxes

- Social Security: 6.2% (up to $184,500)
- Medicare: 1.45% (no limit)

Visit https://thetaxcalc.com/paycheck-calculator for the interactive calculator.`, "/sales-tax-calculator": `# Sales Tax Calculator 2026 \u2014 All 50 States

Calculate combined state + local sales tax for any US state.

## Features

- Forward calculator: Add sales tax to a price
- Reverse calculator: Remove tax from a total
- Car sales tax calculator
- IRS sales tax deduction estimator
- All 50 states with local rates

## State Sales Tax Rates (Top 10)

| State | State Rate | Avg Combined |
|-------|-----------|-------------|
| California | 7.25% | 8.82% |
| Indiana | 7.00% | 7.00% |
| Tennessee | 7.00% | 9.55% |
| Arkansas | 6.50% | 9.47% |
| Washington | 6.50% | 9.59% |
| Louisiana | 4.45% | 9.56% |
| Alabama | 4.00% | 9.24% |
| Oklahoma | 4.50% | 8.95% |
| New York | 4.00% | 8.52% |
| Texas | 6.25% | 8.19% |

Visit https://thetaxcalc.com/sales-tax-calculator for the interactive calculator.`, "/lottery-tax-calculator": `# Lottery Tax Calculator 2026

How much tax do you pay on lottery winnings?

## Quick Answer

A $1M jackpot nets approximately $510,000 after 24% federal + state taxes.

## How Lottery Tax Works

- Federal withholding: 24% (automatic)
- Federal tax bill: Up to 37% (top bracket)
- State tax: Varies by state (0% in TX/FL, up to 13.3% in CA)
- Lump sum vs annuity: Different tax implications

## State-by-State Lottery Tax

| State | Tax Rate | $1M Take-Home |
|-------|---------|--------------|
| Texas | 0% | ~$630,000 |
| Florida | 0% | ~$630,000 |
| California | 0% state | ~$630,000 |
| New York | 10.9% | ~$520,000 |
| Illinois | 4.95% | ~$560,000 |

Visit https://thetaxcalc.com/lottery-tax-calculator for the interactive calculator.`, "/blog": `# Tax Blog \u2014 2026 Guides, Tips & News

Expert tax guides, state comparisons, and financial tips updated for 2026.

## Featured Articles

- [2026 Federal Tax Brackets Explained](/blog/2026-federal-tax-brackets-explained)
- [Federal Tax Brackets 2026 Guide](/blog/federal-tax-brackets-2026-guide)
- [California Tax Guide 2026](/blog/california-tax-guide-2026)
- [Texas Tax Guide 2026](/blog/texas-tax-guide-2026)
- [New York Tax Guide 2026](/blog/new-york-tax-guide-2026)
- [Washington Tax Guide 2026](/blog/washington-tax-guide-2026)
- [1099 Taxes: How Much Freelancers Really Owe](/blog/1099-tax-guide-self-employed-2026)
- [DoorDash Taxes: Complete Guide for Drivers](/blog/doordash-taxes-guide-2026)
- [How Bonuses Are Taxed in 2026](/blog/how-bonuses-are-taxed-2026)
- [Florida vs Texas Tax Comparison](/blog/florida-vs-texas-tax-comparison)

Visit https://thetaxcalc.com/blog for the full blog.`, "/about": `# About TheTaxCalc

Free 2026 tax calculators built for real people.

## Our Mission

We built these calculators so you can see exactly where your money goes \u2014 federal tax, FICA, and state taxes all broken down line by line. No guesswork, no surprises.

## Author

**Rachel Mitchell, CPA** \u2014 Licensed Certified Public Accountant with expertise in federal and state tax law.

## Data Sources

- IRS publications (Pub 15-T, tax brackets, inflation adjustments)
- State revenue departments
- Tax Foundation
- All calculations based on 2026 tax year data

## Contact

- Website: https://thetaxcalc.com
- Author: Rachel Mitchell, CPA

Visit https://thetaxcalc.com/about for the full page.` }[t7];
          if (e11) return new ee(e11, { status: 200, headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
        }
        if ("/self-employment-calculator" === t7) return ee.redirect(new URL("/self-employment-tax-calculator", e10.url), 301);
        if ("/tax-calculator" === t7 || "/income-tax-calculator" === t7 || "/yr" === t7) return ee.redirect(new URL("/paycheck-calculator", e10.url), 301);
        let r2 = { "/paycheck-tax-calculator": "/paycheck-calculator", "/salary-calculator": "/paycheck-calculator", "/take-home-pay-calculator": "/paycheck-calculator", "/net-pay-calculator": "/paycheck-calculator", "/after-tax-calculator": "/paycheck-calculator", "/wage-calculator": "/paycheck-calculator", "/hourly-calculator": "/paycheck-calculator", "/w4-calculator": "/irs-withholding-calculator", "/withholding-calculator": "/irs-withholding-calculator", "/tax-estimate-calculator": "/tax-refund-calculator", "/tax-return-calculator": "/tax-refund-calculator", "/state-tax-calculator": "/paycheck-calculator", "/federal-tax-calculator": "/paycheck-calculator", "/compare/california-vs-texas": "/compare/texas-vs-california", "/compare/florida-vs-texas": "/compare/texas-vs-florida", "/compare/new-york-vs-texas": "/compare/texas-vs-new-york", "/compare/new-york-vs-florida": "/compare/florida-vs-new-york", "/compare/new-york-vs-california": "/compare/california-vs-new-york", "/compare/texas-vs-illinois": "/compare/illinois-vs-texas", "/compare/florida-vs-illinois": "/compare/illinois-vs-florida", "/compare/california-vs-illinois": "/compare/illinois-vs-california", "/compare/new-york-vs-illinois": "/compare/illinois-vs-new-york", "/ss-calculator": "/paycheck-calculator", "/medicare-calculator": "/paycheck-calculator", "/fica-calculator": "/paycheck-calculator", "/social-security-calculator": "/paycheck-calculator", "/ira-calculator": "/401k-retirement-calculator", "/roth-ira-calculator": "/401k-retirement-calculator", "/hsa-calculator": "/401k-retirement-calculator", "/fsa-calculator": "/401k-retirement-calculator", "/401k-calculator": "/401k-retirement-calculator", "/401-calculator": "/401k-retirement-calculator", "/retirement-calculator": "/401k-retirement-calculator", "/pension-calculator": "/401k-retirement-calculator", "/annuity-calculator": "/401k-retirement-calculator", "/w-4-calculator": "/irs-withholding-calculator", "/w4-calculator": "/irs-withholding-calculator", "/withholding-calculator": "/irs-withholding-calculator", "/irs-calculator": "/irs-withholding-calculator", "/amortization-calculator": "/mortgage-calculator", "/loan-calculator": "/mortgage-calculator", "/interest-calculator": "/mortgage-calculator", "/calculators": "/paycheck-calculator", "/tools": "/paycheck-calculator", "/faq": "/glossary", "/help": "/glossary", "/support": "/about", "/sitemap": "/sitemap.xml", "/feed": "/feed.xml", "/rss": "/feed.xml" };
        if (r2[t7]) return ee.redirect(new URL(r2[t7], e10.url), 301);
        let a2 = t7.match(/^\/([a-z-]+?)-(income-tax|tax-rate|paycheck|tax)$/);
        if (a2) {
          let t8 = a2[1];
          if (["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new-hampshire", "new-jersey", "new-mexico", "new-york", "north-carolina", "north-dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode-island", "south-carolina", "south-dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west-virginia", "wisconsin", "wyoming"].includes(t8)) return ee.redirect(new URL(`/${t8}-tax-calculator`, e10.url), 301);
        }
        let n2 = { "/blog/tax-brackets-2026": "/blog/2026-federal-tax-brackets-explained", "/blog/tax-refund-calculator": "/blog/tax-refund-questions-2026", "/blog/income-tax-guide": "/blog/how-much-tax-will-i-owe-2026", "/blog/state-tax-comparison": "/blog/florida-vs-texas-tax-comparison", "/blog/tax-tips": "/blog/2026-federal-tax-brackets-explained", "/blog/2026-federal-tax-refund-estimator-guide": "/blog/tax-refund-questions-2026", "/blog/how-to-calculate-federal-tax-refund-2026": "/blog/tax-refund-questions-2026", "/blog/2026-paycheck-take-home-pay-guide": "/blog/take-home-pay-calculator-guide-2026", "/blog/1099-vs-w2-take-home-pay-comparison-2026": "/blog/1099-tax-guide-self-employed-2026" };
        if (n2[t7]) return ee.redirect(new URL(n2[t7], e10.url), 301);
        let o2 = e10.nextUrl.searchParams;
        if (o2.has("q") && o2.get("q")?.includes("{search_term_string}")) return ee.redirect(new URL(t7, e10.url), 301);
        let i2 = e10.headers.get("user-agent") || "";
        if (/googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|telegrambot|whatsapp|applebot/i.test(i2) && ["/property-tax-calculator", "/sales-tax-calculator", "/paycheck-calculator", "/illinois-tax-calculator", "/texas-tax-calculator", "/florida-tax-calculator", "/california-tax-calculator", "/new-york-tax-calculator", "/georgia-tax-calculator", "/virginia-tax-calculator", "/north-carolina-tax-calculator", "/pennsylvania-tax-calculator", "/ohio-tax-calculator", "/michigan-tax-calculator", "/new-jersey-tax-calculator", "/colorado-tax-calculator", "/arizona-tax-calculator", "/washington-tax-calculator", "/massachusetts-tax-calculator", "/indiana-tax-calculator", "/tennessee-tax-calculator", "/missouri-tax-calculator", "/maryland-tax-calculator", "/wisconsin-tax-calculator", "/minnesota-tax-calculator", "/oregon-tax-calculator"].includes(t7) && o2.toString().length > 0) return ee.redirect(new URL(t7, e10.url), 301);
        let s2 = { "/blog/retirement-tax-planning": "/blog/retirement-tax-planning-guide-2026", "/blog/401k-withdrawal": "/blog/401k-withdrawal-tax-guide-2026", "/blog/inheritance-tax": "/blog/inheritance-tax-guide-2026", "/blog/social-security-tax": "/blog/social-security-tax-questions-2026", "/blog/tax-questions": "/blog/tax-questions-answered-2026", "/blog/tax-refund-questions": "/blog/tax-refund-questions-2026", "/blog/federal-tax-brackets": "/blog/2026-federal-tax-brackets-explained", "/blog/sales-tax-guide": "/blog/sales-tax-by-state-guide-2026", "/blog/property-tax-guide": "/blog/property-tax-by-state-guide-2026", "/blog/lottery-tax": "/blog/lottery-tax-guide-2026", "/blog/self-employment-tax": "/blog/1099-tax-guide-self-employed-2026", "/blog/doordash-taxes": "/blog/doordash-taxes-guide-2026", "/blog/1099-tax": "/blog/1099-tax-guide-self-employed-2026", "/blog/w4-guide": "/blog/irs-withholding-w4-guide-2026", "/blog/overtime-tax": "/blog/no-tax-on-overtime-guide-2026", "/blog/bonus-tax": "/blog/how-bonuses-are-taxed-2026", "/blog/irs-withholding": "/blog/irs-withholding-w4-guide-2026", "/blog/how-fica-taxes": "/blog/how-fica-taxes-work-2026", "/blog/how-bonuses": "/blog/how-bonuses-are-taxed-2026", "/blog/no-tax-overtime": "/blog/no-tax-on-overtime-guide-2026", "/blog/sep-ira": "/blog/sep-ira-solo-401k-guide-2026", "/blog/why-texas": "/blog/why-texas-has-no-income-tax", "/blog/florida-vs-texas": "/blog/florida-vs-texas-tax-comparison", "/blog/illinois-income": "/blog/illinois-income-tax-guide-2026", "/blog/california-tax": "/blog/california-tax-guide-2026", "/blog/texas-tax": "/blog/texas-tax-guide-2026", "/blog/new-york-tax": "/blog/new-york-tax-guide-2026", "/blog/washington-tax": "/blog/washington-tax-guide-2026" };
        if (s2[t7]) return ee.redirect(new URL(s2[t7], e10.url), 301);
        let l2 = { "/tax": "/paycheck-calculator", "/taxes": "/paycheck-calculator", "/paycheck": "/paycheck-calculator", "/income-tax": "/paycheck-calculator", "/state-tax": "/paycheck-calculator", "/refund-calculator": "/tax-refund-calculator", "/mortgage": "/mortgage-calculator", "/401k": "/401k-retirement-calculator", "/retirement": "/401k-retirement-calculator", "/capital-gains": "/capital-gains-calculator", "/self-employment": "/self-employment-tax-calculator", "/sales-tax": "/sales-tax-calculator", "/property-tax": "/property-tax-calculator", "/bonus-calculator": "/bonus-tax-calculator", "/overtime": "/overtime-tax-calculator", "/lottery": "/lottery-tax-calculator", "/relocation": "/relocation-calculator", "/withholding": "/irs-withholding-calculator", "/w4": "/irs-withholding-calculator", "/irs": "/irs-withholding-calculator", "/federal-tax": "/federal-tax-brackets", "/tax-estimate": "/tax-refund-calculator" };
        if (l2[t7]) return ee.redirect(new URL(l2[t7], e10.url), 301);
        let c2 = t7.match(/^\/salary\/(\d+)$/);
        if (c2) return ee.redirect(new URL(`/salary/${c2[1]}-after-taxes`, e10.url), 301);
        if (["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new-hampshire", "new-jersey", "new-mexico", "new-york", "north-carolina", "north-dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode-island", "south-carolina", "south-dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west-virginia", "wisconsin", "wyoming"].includes(t7.slice(1))) return ee.redirect(new URL(`${t7}-tax-calculator`, e10.url), 301);
        if ("/contact" === t7 || "/contact-us" === t7) return ee.redirect(new URL("/about", e10.url), 301);
        let u2 = "1" === e10.nextUrl.searchParams.get("embed"), d2 = ee.next();
        d2.headers.set("X-Content-Type-Options", "nosniff"), u2 ? d2.headers.set("X-Frame-Options", "ALLOWALL") : d2.headers.set("X-Frame-Options", "DENY"), d2.headers.set("Referrer-Policy", "strict-origin-when-cross-origin"), d2.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()"), d2.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
        let p2 = "https://*.googletagmanager.com https://*.google-analytics.com https://www.google.com https://www.gstatic.com https://ssl.gstatic.com https://tagmanager.google.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://analytics.ahrefs.com", h2 = "https://fonts.googleapis.com https://tagmanager.google.com https://googletagmanager.com";
        if (d2.headers.set("Content-Security-Policy", `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' ${p2}; script-src-elem 'self' 'unsafe-inline' ${p2}; script-src-attr 'self' 'unsafe-inline' ${p2}; style-src 'self' 'unsafe-inline' ${h2}; style-src-elem 'self' 'unsafe-inline' ${h2}; img-src 'self' data: https://*.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net https://*.google.com https://www.gstatic.com https://ssl.gstatic.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googleadservices.com https://analytics.ahrefs.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://stats.g.doubleclick.net https://analytics.ahrefs.com; frame-src https://www.googletagmanager.com https://*.g.doubleclick.net https://td.doubleclick.net https://googleads.g.doubleclick.net; worker-src 'self' blob:; child-src 'self' https://www.googletagmanager.com; ${u2 ? "frame-ancestors *" : "frame-ancestors 'none'"}; base-uri 'self'; form-action 'self';`), d2.headers.set("Content-Signal", "ai-train=yes, search=yes, ai-input=yes"), o2.has("q") && !o2.get("q")?.includes("{search_term_string}") && d2.headers.set("X-Robots-Tag", "noindex, follow"), d2.headers.set("Link", '</.well-known/api-catalog>; rel="service-doc", </.well-known/agent-skills/index.json>; rel="service-doc", </.well-known/mcp/server-card.json>; rel="service-doc", </.well-known/oauth-authorization-server>; rel="service-doc", </.well-known/oauth-protected-resource>; rel="service-doc", </.well-known/openid-configuration>; rel="service-doc", </llms.txt>; rel="service-doc", </auth.md>; rel="service-doc", </sitemap.xml>; rel="service-doc"'), t7.startsWith("/_next") || t7.startsWith("/api") || t7.startsWith("/admin") || t7.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt|css|js|woff2?|ttf|eot)$/) || (d2.headers.delete("Cache-Control"), d2.headers.set("Cache-Control", "public, max-age=3600, s-maxage=2592000, stale-while-revalidate=31536000")), t0.some((e11) => t7.startsWith(e11))) return d2;
        let f2 = tY.some((e11) => t7.startsWith(e11)), g2 = tQ.some((e11) => t7.startsWith(e11)), m2 = tZ.some((e11) => t7.startsWith(e11)), b2 = ["POST", "PUT", "DELETE", "PATCH"].includes(e10.method), y2 = t1.some((e11) => t7.startsWith(e11));
        if (!(f2 || g2 || m2 && b2 || y2)) return d2;
        let v2 = e10.cookies.get(tX())?.value;
        if (!v2) return t7.startsWith("/api/") ? ee.json({ error: "Authentication required" }, { status: 401 }) : d2;
        if (!await tJ(v2)) {
          if (t7.startsWith("/api/")) {
            let e11 = ee.json({ error: "Invalid or expired session" }, { status: 401 });
            return e11.cookies.set(tX(), "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 }), e11;
          }
          d2.cookies.set(tX(), "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
        }
        return d2;
      }
      e.s(["config", 0, { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)"] }, "middleware", () => t2, "runtime", 0, "experimental-edge"], 96592);
      var t6 = e.i(96592);
      Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 });
      let t4 = { ...t6 }, t5 = "/middleware", t3 = t4.middleware || t4.default;
      if ("function" != typeof t3) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${t5}" must export a function named \`middleware\` or a default function.`);
      e.s(["default", 0, (e10) => tl({ ...e10, page: t5, handler: async (...e11) => {
        try {
          return await t3(...e11);
        } catch (n2) {
          let t7 = e11[0], r2 = new URL(t7.url), a2 = r2.pathname + r2.search;
          throw await s(n2, { path: a2, method: t7.method, headers: Object.fromEntries(t7.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), n2;
        }
      } })], 58217);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_e42258fc.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_e42258fc = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_e42258fc.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_e42258fc.js", { otherChunks: ["chunks/[root-of-the-server]__cfc6ad0d._.js", "chunks/node_modules_next_dist_95e2512a._.js"], runtimeModuleIds: [35825] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = /* @__PURE__ */ new WeakMap();
      function r(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let n = r.prototype, o = Object.prototype.hasOwnProperty, u = "u" > typeof Symbol && Symbol.toStringTag;
      function l(e2, t2, r2) {
        o.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function i(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = s(t2), e2[t2] = r2), r2;
      }
      function s(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function a(e2, t2) {
        l(e2, "__esModule", { value: true }), u && l(e2, u, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) l(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? l(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : l(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      n.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = i(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, a(n2, e2);
      }, n.j = function(e2, r2) {
        var n2, u2;
        let l2, s2, a2;
        null != r2 ? s2 = (l2 = i(this.c, r2)).exports : (l2 = this.m, s2 = this.e);
        let c2 = (n2 = l2, u2 = s2, (a2 = t.get(n2)) || (t.set(n2, a2 = []), n2.exports = n2.namespaceObject = new Proxy(u2, { get(e3, t2) {
          if (o.call(e3, t2) || "default" === t2 || "__esModule" === t2) return Reflect.get(e3, t2);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t2);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t2 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t2.includes(r3) || t2.push(r3);
          return t2;
        } })), a2);
        "object" == typeof e2 && null !== e2 && c2.push(e2);
      }, n.v = function(e2, t2) {
        (null != t2 ? i(this.c, t2) : this.m).exports = e2;
      }, n.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? i(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let c = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, f = [null, c({}), c([]), c(c)];
      function d(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !f.includes(t3); t3 = c(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), a(t2, n2), t2;
      }
      function p(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function h(e2) {
        let t2 = N(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = d(r2, p(r2), r2 && r2.__esModule);
      }
      function m(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function b(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function y() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      n.i = h, n.A = function(e2) {
        return this.r(e2)(h.bind(this));
      }, n.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, n.r = function(e2) {
        return N(e2, this.m).exports;
      }, n.f = function(e2) {
        function t2(t3) {
          if (t3 = m(t3), o.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = m(t3), o.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let O = Symbol("turbopack queues"), g = Symbol("turbopack exports"), w = Symbol("turbopack error");
      function _(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      n.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = y(), s2 = Object.assign(i2, { [g]: r2.exports, [O]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), s2.catch(() => {
          });
        } }), a2 = { get: () => s2, set(e3) {
          e3 !== s2 && (s2[g] = e3);
        } };
        Object.defineProperty(r2, "exports", a2), Object.defineProperty(r2, "namespaceObject", a2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (O in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [g]: {}, [O]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[g] = e5, _(t4);
                }, (e5) => {
                  r4[w] = e5, _(t4);
                }), r4;
              }
            }
            return { [g]: e4, [O]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[w]) throw e4[w];
            return e4[g];
          }), { promise: u3, resolve: l3 } = y(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function s3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[O](s3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(s2[w] = e3) : u2(s2[g]), _(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let C = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function j(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      C.prototype = URL.prototype, n.U = C, n.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, n.g = globalThis;
      let k = r.prototype;
      var U, R = ((U = R || {})[U.Runtime = 0] = "Runtime", U[U.Parent = 1] = "Parent", U[U.Update = 2] = "Update", U);
      let P = /* @__PURE__ */ new Map();
      n.M = P;
      let v = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map();
      async function $(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return M(e2, t2, A(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!P.has(e3) || v.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => T.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) T.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = M(e2, t2, A(n3));
            T.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = M(e2, t2, A(r2.path)), l2)) T.has(o3) || T.set(o3, n2);
        }
        for (let e3 of o2) v.has(e3) || v.set(e3, n2);
        await n2;
      }
      k.l = function(e2) {
        return $(1, this.m.id, e2);
      };
      let x = Promise.resolve(void 0), E = /* @__PURE__ */ new WeakMap();
      function M(t2, r2, n2) {
        let o2 = e.loadChunkCached(t2, n2), u2 = E.get(o2);
        if (void 0 === u2) {
          let e2 = E.set.bind(E, o2, x);
          u2 = o2.then(e2).catch((e3) => {
            let o3;
            switch (t2) {
              case 0:
                o3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case 1:
                o3 = `from module ${r2}`;
                break;
              case 2:
                o3 = "from an HMR update";
                break;
              default:
                j(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let u3 = Error(`Failed to load chunk ${n2} ${o3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw u3.name = "ChunkLoadError", u3;
          }), E.set(o2, u2);
        }
        return u2;
      }
      function A(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      k.L = function(e2) {
        return M(1, this.m.id, e2);
      }, k.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, k.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, k.b = function(e2) {
        let t2 = new Blob([`self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_CHUNK_SUFFIX = ${JSON.stringify("")};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(e2.reverse().map(A), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`], { type: "text/javascript" });
        return URL.createObjectURL(t2);
      };
      let K = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      n.w = function(t2, r2, n2) {
        return e.loadWebAssembly(1, this.m.id, t2, r2, n2);
      }, n.u = function(t2, r2) {
        return e.loadWebAssemblyModule(1, this.m.id, t2, r2);
      };
      let S = {};
      n.c = S;
      let N = (e2, t2) => {
        let r2 = S[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return q(e2, R.Parent, t2.id);
      };
      function q(e2, t2, n2) {
        let o2 = P.get(e2);
        if ("function" != typeof o2) throw Error(function(e3, t3, r2) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r2}`;
              break;
            case 1:
              n3 = `because it was required from module ${r2}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              j(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, n2));
        let u2 = s(e2), l2 = u2.exports;
        S[e2] = u2;
        let i2 = new r(u2, l2);
        try {
          o2(i2, u2, l2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && d(u2.exports, u2.namespaceObject), u2;
      }
      function L(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          let t3 = decodeURIComponent(("u" > typeof TURBOPACK_NEXT_CHUNK_URLS ? TURBOPACK_NEXT_CHUNK_URLS.pop() : e2.getAttribute("src")).replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3, r3, n3) {
          let o2 = 1;
          for (; o2 < e2.length; ) {
            let t4 = e2[o2], n4 = o2 + 1;
            for (; n4 < e2.length && "function" != typeof e2[n4]; ) n4++;
            if (n4 === e2.length) throw Error("malformed chunk format, expected a factory function");
            if (!r3.has(t4)) {
              let u2 = e2[n4];
              for (Object.defineProperty(u2, "name", { value: "module evaluation" }); o2 < n4; o2++) t4 = e2[o2], r3.set(t4, u2);
            }
            o2 = n4 + 1;
          }
        }(t2, 0, P)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : d(n2, p(n2), true);
      }
      n.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? d(t2.default, p(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), n.x = B, e = { registerChunk(e2, t2) {
        I.add(e2), function(e3) {
          let t3 = W.get(e3);
          if (null != t3) {
            for (let r2 of t3) r2.requiredChunks.delete(e3), 0 === r2.requiredChunks.size && F(r2.runtimeModuleIds, r2.chunkPath);
            W.delete(e3);
          }
        }(e2), null != t2 && (0 === t2.otherChunks.length ? F(t2.runtimeModuleIds, e2) : function(e3, t3, r2) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r2, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = b(e4);
            if (I.has(t4)) continue;
            n2.add(t4);
            let r3 = W.get(t4);
            null == r3 && (r3 = /* @__PURE__ */ new Set(), W.set(t4, r3)), r3.add(o2);
          }
          0 === o2.requiredChunks.size && F(o2.runtimeModuleIds, o2.chunkPath);
        }(e2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = b(e3), K.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await H(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => H(r2, n2) };
      let I = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Map();
      function F(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = S[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          q(t3, R.Runtime, e3);
        }(t2, r2);
      }
      async function H(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let X = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: L }, X.forEach(L);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*))(\\\\.json)?[\\/#\\?]?$"] }];
    require_root_of_the_server_cfc6ad0d();
    require_node_modules_next_dist_95e2512a();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_e42258fc();
  }
});

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

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

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
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "distDir": ".next", "cacheComponents": false, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "assetPrefix": "", "output": "standalone", "trailingSlash": false, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": true }, "reactMaxHeadersLength": 6e3, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "basePath": "", "expireTime": 31536e3, "generateEtags": true, "poweredByHeader": true, "cacheHandlers": {}, "cacheMaxMemorySize": 52428800, "compress": true, "i18n": null, "httpAgentOptions": { "keepAlive": true }, "pageExtensions": ["tsx", "ts", "jsx", "js"], "useFileSystemPublicRoutes": true, "experimental": { "ppr": false, "staleTimes": { "dynamic": 0, "static": 300 }, "dynamicOnHover": false, "inlineCss": false, "authInterrupts": false, "fetchCacheKeyPrefix": "", "isrFlushToDisk": true, "optimizeCss": false, "nextScriptWorkers": false, "disableOptimizedLoading": false, "largePageDataBytes": 128e3, "serverComponentsHmrCache": true, "caseSensitiveRoutes": false, "validateRSCRequestHeaders": false, "useSkewCookie": false, "preloadEntriesOnStart": true, "hideLogsAfterAbort": false, "removeUncaughtErrorAndRejectionListeners": false, "imgOptConcurrency": null, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "imgOptTimeoutInSeconds": 7, "proxyClientMaxBodySize": 10485760, "trustHostHeader": false, "isExperimentalCompile": false }, "skipTrailingSlashRedirect": false, "serverExternalPackages": [] };
var BuildId = "DHHyHh_Ff3S5PG3AajNLG";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/settings", "regex": "^/admin/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/settings(?:/)?$" }, { "page": "/api", "regex": "^/api(?:/)?$", "routeKeys": {}, "namedRegex": "^/api(?:/)?$" }, { "page": "/api/admin/db-status", "regex": "^/api/admin/db\\-status(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/db\\-status(?:/)?$" }, { "page": "/api/admin/seed-db", "regex": "^/api/admin/seed\\-db(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/seed\\-db(?:/)?$" }, { "page": "/api/admin/stats", "regex": "^/api/admin/stats(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/stats(?:/)?$" }, { "page": "/api/ads", "regex": "^/api/ads(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/ads(?:/)?$" }, { "page": "/api/auth/login", "regex": "^/api/auth/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/login(?:/)?$" }, { "page": "/api/auth/logout", "regex": "^/api/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/logout(?:/)?$" }, { "page": "/api/auth/verify", "regex": "^/api/auth/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/verify(?:/)?$" }, { "page": "/api/blog", "regex": "^/api/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/blog(?:/)?$" }, { "page": "/api/indexnow", "regex": "^/api/indexnow(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/indexnow(?:/)?$" }, { "page": "/api/links", "regex": "^/api/links(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/links(?:/)?$" }, { "page": "/api/ping-search-engines", "regex": "^/api/ping\\-search\\-engines(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/ping\\-search\\-engines(?:/)?$" }, { "page": "/api/seed", "regex": "^/api/seed(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/seed(?:/)?$" }, { "page": "/api/settings", "regex": "^/api/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/settings(?:/)?$" }, { "page": "/api/track", "regex": "^/api/track(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/track(?:/)?$" }, { "page": "/apple-icon", "regex": "^/apple\\-icon(?:/)?$", "routeKeys": {}, "namedRegex": "^/apple\\-icon(?:/)?$" }, { "page": "/blog", "regex": "^/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/blog(?:/)?$" }, { "page": "/compare", "regex": "^/compare(?:/)?$", "routeKeys": {}, "namedRegex": "^/compare(?:/)?$" }, { "page": "/federal-tax-brackets", "regex": "^/federal\\-tax\\-brackets(?:/)?$", "routeKeys": {}, "namedRegex": "^/federal\\-tax\\-brackets(?:/)?$" }, { "page": "/feed.xml", "regex": "^/feed\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/feed\\.xml(?:/)?$" }, { "page": "/freefile-irs", "regex": "^/freefile\\-irs(?:/)?$", "routeKeys": {}, "namedRegex": "^/freefile\\-irs(?:/)?$" }, { "page": "/glossary", "regex": "^/glossary(?:/)?$", "routeKeys": {}, "namedRegex": "^/glossary(?:/)?$" }, { "page": "/home-sale-tax-calculator", "regex": "^/home\\-sale\\-tax\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/home\\-sale\\-tax\\-calculator(?:/)?$" }, { "page": "/icon", "regex": "^/icon(?:/)?$", "routeKeys": {}, "namedRegex": "^/icon(?:/)?$" }, { "page": "/job-offer-comparison-calculator", "regex": "^/job\\-offer\\-comparison\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/job\\-offer\\-comparison\\-calculator(?:/)?$" }, { "page": "/methodology", "regex": "^/methodology(?:/)?$", "routeKeys": {}, "namedRegex": "^/methodology(?:/)?$" }, { "page": "/mortgage-calculator", "regex": "^/mortgage\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/mortgage\\-calculator(?:/)?$" }, { "page": "/obbba-tax-calculator", "regex": "^/obbba\\-tax\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/obbba\\-tax\\-calculator(?:/)?$" }, { "page": "/opengraph-image", "regex": "^/opengraph\\-image(?:/)?$", "routeKeys": {}, "namedRegex": "^/opengraph\\-image(?:/)?$" }, { "page": "/paycheck-difference-calculator", "regex": "^/paycheck\\-difference\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/paycheck\\-difference\\-calculator(?:/)?$" }, { "page": "/privacy", "regex": "^/privacy(?:/)?$", "routeKeys": {}, "namedRegex": "^/privacy(?:/)?$" }, { "page": "/research", "regex": "^/research(?:/)?$", "routeKeys": {}, "namedRegex": "^/research(?:/)?$" }, { "page": "/resources", "regex": "^/resources(?:/)?$", "routeKeys": {}, "namedRegex": "^/resources(?:/)?$" }, { "page": "/salary", "regex": "^/salary(?:/)?$", "routeKeys": {}, "namedRegex": "^/salary(?:/)?$" }, { "page": "/salary-comparison-calculator", "regex": "^/salary\\-comparison\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/salary\\-comparison\\-calculator(?:/)?$" }, { "page": "/sales-tax-calculator", "regex": "^/sales\\-tax\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/sales\\-tax\\-calculator(?:/)?$" }, { "page": "/scholarship", "regex": "^/scholarship(?:/)?$", "routeKeys": {}, "namedRegex": "^/scholarship(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }, { "page": "/smartasset-alternative", "regex": "^/smartasset\\-alternative(?:/)?$", "routeKeys": {}, "namedRegex": "^/smartasset\\-alternative(?:/)?$" }, { "page": "/tax-data", "regex": "^/tax\\-data(?:/)?$", "routeKeys": {}, "namedRegex": "^/tax\\-data(?:/)?$" }, { "page": "/tax-professionals", "regex": "^/tax\\-professionals(?:/)?$", "routeKeys": {}, "namedRegex": "^/tax\\-professionals(?:/)?$" }, { "page": "/terms", "regex": "^/terms(?:/)?$", "routeKeys": {}, "namedRegex": "^/terms(?:/)?$" }, { "page": "/widgets", "regex": "^/widgets(?:/)?$", "routeKeys": {}, "namedRegex": "^/widgets(?:/)?$" }], "dynamic": [{ "page": "/api/ads/[id]", "regex": "^/api/ads/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/ads/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/blog/[slug]", "regex": "^/api/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/api/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/api/links/[id]", "regex": "^/api/links/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/links/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/blog/[slug]", "regex": "^/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/compare/[states]", "regex": "^/compare/([^/]+?)(?:/)?$", "routeKeys": { "nxtPstates": "nxtPstates" }, "namedRegex": "^/compare/(?<nxtPstates>[^/]+?)(?:/)?$" }, { "page": "/research/[slug]", "regex": "^/research/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/research/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/salary/[amount]", "regex": "^/salary/([^/]+?)(?:/)?$", "routeKeys": { "nxtPamount": "nxtPamount" }, "namedRegex": "^/salary/(?<nxtPamount>[^/]+?)(?:/)?$" }, { "page": "/sales-tax-calculator/[state]", "regex": "^/sales\\-tax\\-calculator/([^/]+?)(?:/)?$", "routeKeys": { "nxtPstate": "nxtPstate" }, "namedRegex": "^/sales\\-tax\\-calculator/(?<nxtPstate>[^/]+?)(?:/)?$" }, { "page": "/[calculator]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPcalculator": "nxtPcalculator" }, "namedRegex": "^/(?<nxtPcalculator>[^/]+?)(?:/)?$" }, { "page": "/[calculator]/opengraph-image", "regex": "^/([^/]+?)/opengraph\\-image(?:/)?$", "routeKeys": { "nxtPcalculator": "nxtPcalculator" }, "namedRegex": "^/(?<nxtPcalculator>[^/]+?)/opengraph\\-image(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/401k-retirement-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/401k-retirement-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/alabama-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/alabama-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/alaska-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/alaska-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/arizona-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/arizona-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/arkansas-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/arkansas-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/bonus-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/bonus-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/california-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/california-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/capital-gains-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/capital-gains-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/chicago-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/chicago-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/colorado-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/colorado-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/connecticut-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/connecticut-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/delaware-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/delaware-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/employee-cost-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/employee-cost-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/florida-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/florida-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/georgia-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/georgia-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/hawaii-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/hawaii-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/idaho-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/idaho-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/illinois-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/illinois-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/indiana-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/indiana-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/iowa-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/iowa-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/irs-withholding-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/irs-withholding-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/kansas-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/kansas-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/kentucky-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/kentucky-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/los-angeles-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/los-angeles-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/lottery-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/lottery-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/louisiana-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/louisiana-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/maine-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/maine-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/maryland-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/maryland-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/massachusetts-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/massachusetts-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/michigan-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/michigan-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/minnesota-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/minnesota-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/mississippi-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/mississippi-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/missouri-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/missouri-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/montana-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/montana-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/mortgage-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/mortgage-calculator", "dataRoute": "/mortgage-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/nebraska-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/nebraska-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/nevada-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/nevada-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-hampshire-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-hampshire-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-jersey-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-jersey-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-mexico-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-mexico-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-york-city-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-york-city-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/new-york-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/new-york-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/north-carolina-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/north-carolina-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/north-dakota-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/north-dakota-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/ohio-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/ohio-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/oklahoma-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/oklahoma-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/oregon-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/oregon-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/overtime-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/overtime-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/paycheck-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/paycheck-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/pennsylvania-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/pennsylvania-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/property-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/property-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/relocation-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/relocation-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/rhode-island-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/rhode-island-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/sales-tax-calculator", "dataRoute": "/sales-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/self-employment-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/self-employment-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/south-carolina-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/south-carolina-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/south-dakota-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/south-dakota-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tax-refund-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/tax-refund-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tennessee-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/tennessee-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/texas-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/texas-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/utah-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/utah-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/vermont-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/vermont-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/virginia-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/virginia-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/washington-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/washington-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/west-virginia-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/west-virginia-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/wisconsin-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/wisconsin-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/wyoming-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/[calculator]", "dataRoute": "/wyoming-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/about": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/about", "dataRoute": "/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin", "dataRoute": "/admin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/settings": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/settings", "dataRoute": "/admin/settings.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/1099-tax-guide-self-employed-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/1099-tax-guide-self-employed-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/2026-federal-tax-brackets-explained": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/2026-federal-tax-brackets-explained.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/2026-self-employed-tax-refund-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/2026-self-employed-tax-refund-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/2026-w2-tax-refund-calculator-guide": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/2026-w2-tax-refund-calculator-guide.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/401k-withdrawal-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/401k-withdrawal-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/401k-withdrawal-tax-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/401k-withdrawal-tax-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/alameda-county-property-tax-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/alameda-county-property-tax-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/amended-tax-return-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/amended-tax-return-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/best-tax-preparer-near-me-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/best-tax-preparer-near-me-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/brian-kemp-income-tax-rebates-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/brian-kemp-income-tax-rebates-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/california-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/california-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/doordash-taxes-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/doordash-taxes-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/federal-income-tax-rate-calculator-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/federal-income-tax-rate-calculator-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/federal-tax-brackets-2026-guide": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/federal-tax-brackets-2026-guide.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/florida-vs-texas-tax-comparison": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/florida-vs-texas-tax-comparison.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/free-tax-calculator-no-signup-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/free-tax-calculator-no-signup-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/hourly-wage-after-tax-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/hourly-wage-after-tax-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/how-bonuses-are-taxed-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/how-bonuses-are-taxed-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/how-fica-taxes-work-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/how-fica-taxes-work-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/how-much-tax-will-i-owe-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/how-much-tax-will-i-owe-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/illinois-income-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/illinois-income-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/inheritance-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/inheritance-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/inheritance-tax-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/inheritance-tax-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/irs-tax-refund-schedule-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/irs-tax-refund-schedule-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/irs-withholding-w4-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/irs-withholding-w4-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/lottery-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/lottery-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/new-york-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/new-york-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/no-tax-on-overtime-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/no-tax-on-overtime-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/oasdi-tax-explained-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/oasdi-tax-explained-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/obbba-tax-refund-impact-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/obbba-tax-refund-impact-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/property-tax-by-state-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/property-tax-by-state-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/rd-tax-credit-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/rd-tax-credit-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/retirement-tax-planning-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/retirement-tax-planning-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/reverse-sales-tax-calculator-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/reverse-sales-tax-calculator-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/robux-tax-calculator-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/robux-tax-calculator-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/sales-tax-by-state-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/sales-tax-by-state-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/sep-ira-solo-401k-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/sep-ira-solo-401k-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/social-security-tax-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/social-security-tax-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/spreadsheet-formula-to-calculate-income-tax-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/spreadsheet-formula-to-calculate-income-tax-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/take-home-pay-calculator-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/take-home-pay-calculator-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/tax-questions-answered-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/tax-questions-answered-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/tax-refund-questions-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/tax-refund-questions-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/texas-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/texas-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/turbotax-lawsuit-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/turbotax-lawsuit-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/washington-tax-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/washington-tax-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/what-is-taxable-income-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/what-is-taxable-income-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/why-texas-has-no-income-tax": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog/[slug]", "dataRoute": "/blog/why-texas-has-no-income-tax.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog", "dataRoute": "/blog.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/california-vs-new-york": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/california-vs-new-york.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/florida-vs-california": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/florida-vs-california.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/florida-vs-new-york": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/florida-vs-new-york.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/illinois-vs-california": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/illinois-vs-california.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/illinois-vs-florida": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/illinois-vs-florida.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/illinois-vs-new-york": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/illinois-vs-new-york.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/illinois-vs-texas": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/illinois-vs-texas.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/texas-vs-california": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/texas-vs-california.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/texas-vs-florida": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/texas-vs-florida.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/texas-vs-new-york": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/compare/[states]", "dataRoute": "/compare/texas-vs-new-york.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/compare", "dataRoute": "/compare.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/federal-tax-brackets": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/federal-tax-brackets", "dataRoute": "/federal-tax-brackets.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/freefile-irs": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/freefile-irs", "dataRoute": "/freefile-irs.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/glossary": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/glossary", "dataRoute": "/glossary.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/home-sale-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/home-sale-tax-calculator", "dataRoute": "/home-sale-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/job-offer-comparison-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/job-offer-comparison-calculator", "dataRoute": "/job-offer-comparison-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/methodology": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/methodology", "dataRoute": "/methodology.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/obbba-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/obbba-tax-calculator", "dataRoute": "/obbba-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/paycheck-difference-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/paycheck-difference-calculator", "dataRoute": "/paycheck-difference-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/privacy": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/privacy", "dataRoute": "/privacy.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/2026-state-tax-burden": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/2026-state-tax-burden.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/best-states-for-remote-workers-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/best-states-for-remote-workers-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/child-tax-credit-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/child-tax-credit-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/property-tax-by-state-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/property-tax-by-state-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/salary-needed-to-live-comfortably-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/salary-needed-to-live-comfortably-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/tax-refund-statistics-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/[slug]", "dataRoute": "/research/tax-refund-statistics-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research", "dataRoute": "/research.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/resources": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/resources", "dataRoute": "/resources.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary-comparison-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/salary-comparison-calculator", "dataRoute": "/salary-comparison-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/100000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/100000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/100000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/100000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/110000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/110000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/110000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/110000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/120000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/120000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/120000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/120000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/130000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/130000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/130000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/130000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/140000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/140000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/140000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/140000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/150000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/150000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/150000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/150000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/175000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/175000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/175000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/175000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/200000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/200000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/200000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/200000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/250000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/250000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/250000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/250000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/30000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/30000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/30000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/30000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/300000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/300000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/300000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/300000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/35000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/35000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/35000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/35000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/40000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/40000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/40000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/40000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/400000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/400000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/400000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/400000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/45000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/45000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/45000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/45000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/50000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/50000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/50000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/50000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/500000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/500000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/500000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/500000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/55000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/55000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/55000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/55000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/60000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/60000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/60000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/60000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/65000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/65000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/65000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/65000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/70000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/70000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/70000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/70000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/75000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/75000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/75000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/75000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/80000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/80000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/80000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/80000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/85000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/85000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/85000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/85000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/90000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/90000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/90000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/90000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/95000": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/95000.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/95000-after-taxes": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/salary/[amount]", "dataRoute": "/salary/95000-after-taxes.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/salary", "dataRoute": "/salary.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/alabama": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/alabama.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/alaska": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/alaska.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/arizona": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/arizona.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/arkansas": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/arkansas.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/california": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/california.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/colorado": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/colorado.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/connecticut": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/connecticut.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/delaware": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/delaware.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/florida": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/florida.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/georgia": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/georgia.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/hawaii": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/hawaii.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/idaho": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/idaho.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/illinois": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/illinois.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/indiana": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/indiana.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/iowa": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/iowa.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/kansas": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/kansas.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/kentucky": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/kentucky.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/louisiana": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/louisiana.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/maine": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/maine.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/maryland": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/maryland.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/massachusetts": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/massachusetts.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/michigan": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/michigan.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/minnesota": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/minnesota.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/mississippi": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/mississippi.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/missouri": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/missouri.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/montana": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/montana.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/nebraska": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/nebraska.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/nevada": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/nevada.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/newhampshire": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/newhampshire.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/newjersey": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/newjersey.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/newmexico": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/newmexico.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/newyork": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/newyork.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/northcarolina": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/northcarolina.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/northdakota": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/northdakota.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/ohio": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/ohio.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/oklahoma": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/oklahoma.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/oregon": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/oregon.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/pennsylvania": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/pennsylvania.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/rhodeisland": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/rhodeisland.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/southcarolina": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/southcarolina.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/southdakota": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/southdakota.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/tennessee": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/tennessee.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/texas": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/texas.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/utah": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/utah.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/vermont": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/vermont.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/virginia": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/virginia.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/washington": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/washington.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/westvirginia": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/westvirginia.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/wisconsin": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/wisconsin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/wyoming": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sales-tax-calculator/[state]", "dataRoute": "/sales-tax-calculator/wyoming.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/scholarship": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/scholarship", "dataRoute": "/scholarship.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/smartasset-alternative": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/smartasset-alternative", "dataRoute": "/smartasset-alternative.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tax-data": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/tax-data", "dataRoute": "/tax-data.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tax-professionals": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/tax-professionals", "dataRoute": "/tax-professionals.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/terms": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/terms", "dataRoute": "/terms.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/widgets": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/widgets", "dataRoute": "/widgets.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": { "/[calculator]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/([^/]+?)(?:/)?$", "dataRoute": "/[calculator].rsc", "fallback": null, "fallbackRouteParams": [], "dataRouteRegex": "^/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog/[slug]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/blog/([^/]+?)(?:/)?$", "dataRoute": "/blog/[slug].rsc", "fallback": null, "fallbackRouteParams": [], "dataRouteRegex": "^/blog/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare/[states]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/compare/([^/]+?)(?:/)?$", "dataRoute": "/compare/[states].rsc", "fallback": false, "fallbackRouteParams": [], "dataRouteRegex": "^/compare/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/[slug]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/research/([^/]+?)(?:/)?$", "dataRoute": "/research/[slug].rsc", "fallback": null, "fallbackRouteParams": [], "dataRouteRegex": "^/research/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary/[amount]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/salary/([^/]+?)(?:/)?$", "dataRoute": "/salary/[amount].rsc", "fallback": false, "fallbackRouteParams": [], "dataRouteRegex": "^/salary/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator/[state]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/sales\\-tax\\-calculator/([^/]+?)(?:/)?$", "dataRoute": "/sales-tax-calculator/[state].rsc", "fallback": false, "fallbackRouteParams": [], "dataRouteRegex": "^/sales\\-tax\\-calculator/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "notFoundRoutes": [], "preview": { "previewModeId": "e27f29412d99f5f4805640032ffbe79f", "previewModeSigningKey": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138", "previewModeEncryptionKey": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__cfc6ad0d._.js", "server/edge/chunks/node_modules_next_dist_95e2512a._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_e42258fc.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } } }, "sortedMiddleware": ["/"], "functions": { "/[calculator]/opengraph-image/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/[calculator]/opengraph-image/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_[calculator]_opengraph-image_route_actions_2853f641.js", "server/edge/chunks/[root-of-the-server]__ab5148c6._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_calculator-routes_ts_7199c030._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0f75c5f1.js"], "name": "app/[calculator]/opengraph-image/route", "page": "/[calculator]/opengraph-image/route", "matchers": [{ "regexp": "^/(?P<nxtPcalculator>[^/]+?)/opengraph-image(?:/)?$", "originalSource": "/[calculator]/opengraph-image" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/admin/db-status/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/db-status/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_db-status_route_actions_95ec4087.js", "server/edge/chunks/[root-of-the-server]__48e60a4b._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_7df55839.js"], "name": "app/api/admin/db-status/route", "page": "/api/admin/db-status/route", "matchers": [{ "regexp": "^/api/admin/db-status(?:/)?$", "originalSource": "/api/admin/db-status" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/admin/seed-db/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/seed-db/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_seed-db_route_actions_b25752ff.js", "server/edge/chunks/[root-of-the-server]__342a8256._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_bc68ccae.js"], "name": "app/api/admin/seed-db/route", "page": "/api/admin/seed-db/route", "matchers": [{ "regexp": "^/api/admin/seed-db(?:/)?$", "originalSource": "/api/admin/seed-db" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/admin/stats/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/stats/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_stats_route_actions_8cf16d9f.js", "server/edge/chunks/[root-of-the-server]__ac52a9ad._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_ef249a77.js"], "name": "app/api/admin/stats/route", "page": "/api/admin/stats/route", "matchers": [{ "regexp": "^/api/admin/stats(?:/)?$", "originalSource": "/api/admin/stats" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/ads/[id]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/ads/[id]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_ads_[id]_route_actions_e6603297.js", "server/edge/chunks/[root-of-the-server]__094c29aa._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_39478c0a.js"], "name": "app/api/ads/[id]/route", "page": "/api/ads/[id]/route", "matchers": [{ "regexp": "^/api/ads/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/api/ads/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/ads/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/ads/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_ads_route_actions_d7e2770a.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/[root-of-the-server]__f2eb8c23._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_ed609ccd.js"], "name": "app/api/ads/route", "page": "/api/ads/route", "matchers": [{ "regexp": "^/api/ads(?:/)?$", "originalSource": "/api/ads" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/auth/login/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/login/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_login_route_actions_1d2c0e30.js", "server/edge/chunks/[root-of-the-server]__914dc13f._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_5b6d2d91.js"], "name": "app/api/auth/login/route", "page": "/api/auth/login/route", "matchers": [{ "regexp": "^/api/auth/login(?:/)?$", "originalSource": "/api/auth/login" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/auth/logout/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/logout/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_logout_route_actions_165a006f.js", "server/edge/chunks/[root-of-the-server]__62a0383f._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_19cee914.js"], "name": "app/api/auth/logout/route", "page": "/api/auth/logout/route", "matchers": [{ "regexp": "^/api/auth/logout(?:/)?$", "originalSource": "/api/auth/logout" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/auth/verify/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/verify/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_verify_route_actions_44d57928.js", "server/edge/chunks/[root-of-the-server]__1a1d42c7._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_a54b43b3.js"], "name": "app/api/auth/verify/route", "page": "/api/auth/verify/route", "matchers": [{ "regexp": "^/api/auth/verify(?:/)?$", "originalSource": "/api/auth/verify" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/blog/[slug]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/blog/[slug]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_blog_[slug]_route_actions_d27ac498.js", "server/edge/chunks/[root-of-the-server]__fe5bb938._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_741604d3.js"], "name": "app/api/blog/[slug]/route", "page": "/api/blog/[slug]/route", "matchers": [{ "regexp": "^/api/blog/(?P<nxtPslug>[^/]+?)(?:/)?$", "originalSource": "/api/blog/[slug]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/blog/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/blog/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_blog_route_actions_b43091c1.js", "server/edge/chunks/[root-of-the-server]__adb6a46b._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_bbb16de2.js"], "name": "app/api/blog/route", "page": "/api/blog/route", "matchers": [{ "regexp": "^/api/blog(?:/)?$", "originalSource": "/api/blog" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/indexnow/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/indexnow/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_indexnow_route_actions_e95a0d92.js", "server/edge/chunks/[root-of-the-server]__f9d9d48c._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_4d76d002.js", "server/edge/chunks/src_lib_calculator-routes_ts_7199c030._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_77498897.js"], "name": "app/api/indexnow/route", "page": "/api/indexnow/route", "matchers": [{ "regexp": "^/api/indexnow(?:/)?$", "originalSource": "/api/indexnow" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/links/[id]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/links/[id]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_links_[id]_route_actions_2c4f7cf6.js", "server/edge/chunks/[root-of-the-server]__3f168991._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_030172aa.js"], "name": "app/api/links/[id]/route", "page": "/api/links/[id]/route", "matchers": [{ "regexp": "^/api/links/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/api/links/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/links/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/links/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_links_route_actions_c7da0871.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/[root-of-the-server]__55ee2134._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_7f840e6f.js"], "name": "app/api/links/route", "page": "/api/links/route", "matchers": [{ "regexp": "^/api/links(?:/)?$", "originalSource": "/api/links" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/ping-search-engines/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/ping-search-engines/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_ping-search-engines_route_actions_44b939bb.js", "server/edge/chunks/[root-of-the-server]__c8704db7._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/src_lib_auth_ts_a6da42a4._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_4a9b10a7.js"], "name": "app/api/ping-search-engines/route", "page": "/api/ping-search-engines/route", "matchers": [{ "regexp": "^/api/ping-search-engines(?:/)?$", "originalSource": "/api/ping-search-engines" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_route_actions_ff157ba0.js", "server/edge/chunks/[root-of-the-server]__604b579e._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_6675f0ce.js"], "name": "app/api/route", "page": "/api/route", "matchers": [{ "regexp": "^/api(?:/)?$", "originalSource": "/api" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/seed/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/seed/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_seed_route_actions_27658aa0.js", "server/edge/chunks/[root-of-the-server]__8dd33c78._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_5c742a3f.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_97f63d91.js"], "name": "app/api/seed/route", "page": "/api/seed/route", "matchers": [{ "regexp": "^/api/seed(?:/)?$", "originalSource": "/api/seed" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/settings/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/settings/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_settings_route_actions_26007c96.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/[root-of-the-server]__ac76dffa._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_bdf0ee1e.js"], "name": "app/api/settings/route", "page": "/api/settings/route", "matchers": [{ "regexp": "^/api/settings(?:/)?$", "originalSource": "/api/settings" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/api/track/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/track/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_track_route_actions_f1b7e9cf.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/[root-of-the-server]__69c5fd3c._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_c7ea2f61.js"], "name": "app/api/track/route", "page": "/api/track/route", "matchers": [{ "regexp": "^/api/track(?:/)?$", "originalSource": "/api/track" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/apple-icon/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/apple-icon/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_apple-icon_route_actions_24ecdbff.js", "server/edge/chunks/[root-of-the-server]__3c08fbf7._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_a76704e1.js"], "name": "app/apple-icon/route", "page": "/apple-icon/route", "matchers": [{ "regexp": "^/apple-icon(?:/)?$", "originalSource": "/apple-icon" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/feed.xml/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/feed.xml/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_feed_xml_route_actions_bec217a0.js", "server/edge/chunks/[root-of-the-server]__6e159577._.js", "server/edge/chunks/src_lib_blog-index_ts_c5840de3._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/src_lib_calculator-routes_ts_7199c030._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_24a5c82a.js"], "name": "app/feed.xml/route", "page": "/feed.xml/route", "matchers": [{ "regexp": "^/feed\\.xml(?:/)?$", "originalSource": "/feed.xml" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/icon/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/icon/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_icon_route_actions_6c46f2f4.js", "server/edge/chunks/[root-of-the-server]__3a7fd026._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1524bd8c.js"], "name": "app/icon/route", "page": "/icon/route", "matchers": [{ "regexp": "^/icon(?:/)?$", "originalSource": "/icon" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } }, "/opengraph-image/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/opengraph-image/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_opengraph-image_route_actions_238d033d.js", "server/edge/chunks/[root-of-the-server]__9506cfda._.js", "server/edge/chunks/node_modules_next_dist_13a201d3._.js", "server/edge/chunks/node_modules_next_dist_08a05ffc._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_96825c7c.js"], "name": "app/opengraph-image/route", "page": "/opengraph-image/route", "matchers": [{ "regexp": "^/opengraph-image(?:/)?$", "originalSource": "/opengraph-image" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DHHyHh_Ff3S5PG3AajNLG", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "fdblvLzOKlopIsjbx6MyaKPpAw88zIzRVzPw55bC8h0=", "__NEXT_PREVIEW_MODE_ID": "e27f29412d99f5f4805640032ffbe79f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "0a9970003b2ff77928495d6dca80f1f37f172191993141a1b1e2a4915a8e5057", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "81c1e44554f694deed07e3a8ac2e34ed04e255df1ab4ac64f029d099ad0d1138" } } } };
var AppPathRoutesManifest = { "/[calculator]/opengraph-image/route": "/[calculator]/opengraph-image", "/[calculator]/page": "/[calculator]", "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/about/page": "/about", "/admin/page": "/admin", "/admin/settings/page": "/admin/settings", "/api/admin/db-status/route": "/api/admin/db-status", "/api/admin/seed-db/route": "/api/admin/seed-db", "/api/admin/stats/route": "/api/admin/stats", "/api/ads/[id]/route": "/api/ads/[id]", "/api/ads/route": "/api/ads", "/api/auth/login/route": "/api/auth/login", "/api/auth/logout/route": "/api/auth/logout", "/api/auth/verify/route": "/api/auth/verify", "/api/blog/[slug]/route": "/api/blog/[slug]", "/api/blog/route": "/api/blog", "/api/indexnow/route": "/api/indexnow", "/api/links/[id]/route": "/api/links/[id]", "/api/links/route": "/api/links", "/api/ping-search-engines/route": "/api/ping-search-engines", "/api/route": "/api", "/api/seed/route": "/api/seed", "/api/settings/route": "/api/settings", "/api/track/route": "/api/track", "/apple-icon/route": "/apple-icon", "/blog/[slug]/page": "/blog/[slug]", "/blog/page": "/blog", "/compare/[states]/page": "/compare/[states]", "/compare/page": "/compare", "/federal-tax-brackets/page": "/federal-tax-brackets", "/feed.xml/route": "/feed.xml", "/freefile-irs/page": "/freefile-irs", "/glossary/page": "/glossary", "/home-sale-tax-calculator/page": "/home-sale-tax-calculator", "/icon/route": "/icon", "/job-offer-comparison-calculator/page": "/job-offer-comparison-calculator", "/methodology/page": "/methodology", "/mortgage-calculator/page": "/mortgage-calculator", "/obbba-tax-calculator/page": "/obbba-tax-calculator", "/opengraph-image/route": "/opengraph-image", "/page": "/", "/paycheck-difference-calculator/page": "/paycheck-difference-calculator", "/privacy/page": "/privacy", "/research/[slug]/page": "/research/[slug]", "/research/page": "/research", "/resources/page": "/resources", "/salary-comparison-calculator/page": "/salary-comparison-calculator", "/salary/[amount]/page": "/salary/[amount]", "/salary/page": "/salary", "/sales-tax-calculator/[state]/page": "/sales-tax-calculator/[state]", "/sales-tax-calculator/page": "/sales-tax-calculator", "/scholarship/page": "/scholarship", "/sitemap.xml/route": "/sitemap.xml", "/smartasset-alternative/page": "/smartasset-alternative", "/tax-data/page": "/tax-data", "/tax-professionals/page": "/tax-professionals", "/terms/page": "/terms", "/widgets/page": "/widgets" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/[calculator]/opengraph-image": {}, "/api": {}, "/api/admin/db-status": {}, "/api/admin/seed-db": {}, "/api/admin/stats": {}, "/api/ads": {}, "/api/ads/[id]": {}, "/api/auth/login": {}, "/api/auth/logout": {}, "/api/auth/verify": {}, "/api/blog": {}, "/api/blog/[slug]": {}, "/api/indexnow": {}, "/api/links": {}, "/api/links/[id]": {}, "/api/ping-search-engines": {}, "/api/seed": {}, "/api/settings": {}, "/api/track": {}, "/apple-icon": {}, "/feed.xml": {}, "/icon": {}, "/opengraph-image": {} } };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream2 } from "node:stream/web";

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
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
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
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
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
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
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
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream2({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(localizedPath, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
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
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
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

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
