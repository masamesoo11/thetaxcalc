
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

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.2";globalThis.nextVersion = "16.2.10";
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
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
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

// .next/server/edge/chunks/[root-of-the-server]__1osrt2u._.js
var require_root_of_the_server_1osrt2u = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__1osrt2u._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__1osrt2u._.js", 51615, (e, r, o) => {
      r.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, r, o) => {
      r.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 35825, (e, r, o) => {
      self._ENTRIES ||= {};
      let t = Promise.resolve().then(() => e.i(58217));
      t.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(t, { get(e2, r2) {
        if ("then" === r2) return (r3, o3) => e2.then(r3, o3);
        let o2 = (...o3) => e2.then((e3) => (0, e3[r2])(...o3));
        return o2.then = (o3, t2) => e2.then((e3) => e3[r2]).then(o3, t2), o2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/node_modules_next_dist_0o2-izl._.js
var require_node_modules_next_dist_0o2_izl = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_0o2-izl._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_0o2-izl._.js", 74398, (e, t, r) => {
    }, 28042, (e, t, r) => {
      "use strict";
      var a = Object.defineProperty, n = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, l = { RequestCookies: () => g, ResponseCookies: () => m, parseCookie: () => d, parseSetCookie: () => h, stringifyCookie: () => u };
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
      function h(e2) {
        if (!e2) return;
        let [[t2, r2], ...a2] = d(e2), { domain: n2, expires: i2, httponly: o2, maxage: s2, path: l2, samesite: c2, secure: u2, partitioned: h2, priority: g2 } = Object.fromEntries(a2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m2, b, v = { name: t2, value: decodeURIComponent(r2), domain: n2, ...i2 && { expires: new Date(i2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...c2 && { sameSite: p.includes(m2 = (m2 = c2).toLowerCase()) ? m2 : void 0 }, ...u2 && { secure: true }, ...g2 && { priority: f.includes(b = (b = g2).toLowerCase()) ? b : void 0 }, ...h2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in v) v[t3] && (e3[t3] = v[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of i(t2)) o.call(e2, l2) || l2 === r2 || a(e2, l2, { get: () => t2[l2], enumerable: !(s2 = n(t2, l2)) || s2.enumerable });
        return e2;
      })(a({}, "__esModule", { value: true }), s);
      var p = ["strict", "lax", "none"], f = ["low", "medium", "high"], g = class {
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
            var t3, r3, a3, n3, i2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (a3 = s2, s2 += 1, l2(), n3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (i2 = true, s2 = n3, o2.push(e4.substring(t3, a3)), t3 = s2) : s2 = a3 + 1;
              } else s2 += 1;
              (!i2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(n2)) {
            const t3 = h(e3);
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
        let r2, a, n, i, o;
        var s, l, c, u, d, h, p, f, g, m, b, v, y, w, x, _, E = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let a2 = r3(223), n2 = r3(172), i2 = r3(930), o2 = "context", s2 = new a2.NoopContextManager();
          class l2 {
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, n2.registerGlobal)(o2, e3, i2.DiagAPI.instance());
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
              return (0, n2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(o2, i2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let a2 = r3(56), n2 = r3(912), i2 = r3(957), o2 = r3(172);
          class s2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var a3, s3, l2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (a3 = e5.stack) ? a3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, o2.getGlobal)("diag"), u2 = (0, n2.createLogLevelDiagLogger)(null != (s3 = r4.logLevel) ? s3 : i2.DiagLogLevel.INFO, e4);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e5}`), u2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new a2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
          }
          t2.DiagAPI = s2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let a2 = r3(660), n2 = r3(172), i2 = r3(930), o2 = "metrics";
          class s2 {
            static getInstance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, n2.registerGlobal)(o2, e3, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(o2) || a2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, n2.unregisterGlobal)(o2, i2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = s2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let a2 = r3(172), n2 = r3(874), i2 = r3(194), o2 = r3(277), s2 = r3(369), l2 = r3(930), c2 = "propagation", u2 = new n2.NoopTextMapPropagator();
          class d2 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, a2.registerGlobal)(c2, e3, l2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = i2.defaultTextMapGetter) {
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
          let a2 = r3(172), n2 = r3(846), i2 = r3(139), o2 = r3(607), s2 = r3(930), l2 = "trace";
          class c2 {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
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
          function i2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t2.getBaggage = i2, t2.getActiveBaggage = function() {
            return i2(a2.ContextAPI.getInstance().active());
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
          let a2 = r3(930), n2 = r3(993), i2 = r3(830), o2 = a2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
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
          let a2 = r3(200), n2 = r3(521), i2 = r3(130), o2 = n2.VERSION.split(".")[0], s2 = Symbol.for(`opentelemetry.js.api.${o2}`), l2 = a2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, a3 = false) {
            var i3;
            let o3 = l2[s2] = null != (i3 = l2[s2]) ? i3 : { version: n2.VERSION };
            if (!a3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== n2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let a3 = null == (t3 = l2[s2]) ? void 0 : t3.version;
            if (a3 && (0, i2.isCompatible)(a3)) return null == (r4 = l2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r4 = l2[s2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let a2 = r3(521), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), a3 = e3.match(n2);
            if (!a3) return () => false;
            let i3 = { major: +a3[1], minor: +a3[2], patch: +a3[3], prerelease: a3[4] };
            if (null != i3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let a4 = e4.match(n2);
              if (!a4) return o2(e4);
              let s2 = { major: +a4[1], minor: +a4[2], patch: +a4[3], prerelease: a4[4] };
              if (null != s2.prerelease || i3.major !== s2.major) return o2(e4);
              if (0 === i3.major) return i3.minor === s2.minor && i3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return i3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = i2, t2.isCompatible = i2(a2.VERSION);
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
          class i2 extends a2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = i2;
          class o2 extends a2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
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
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new n2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
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
          let a2 = r3(491), n2 = r3(607), i2 = r3(403), o2 = r3(139), s2 = a2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var a3;
              if (null == t3 ? void 0 : t3.root) return new i2.NonRecordingSpan();
              let l2 = r4 && (0, n2.getSpanContext)(r4);
              return "object" == typeof (a3 = l2) && "string" == typeof a3.spanId && "string" == typeof a3.traceId && "number" == typeof a3.traceFlags && (0, o2.isSpanContextValid)(l2) ? new i2.NonRecordingSpan(l2) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, a3) {
              let i3, o3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (i3 = t3, l2 = r4) : (i3 = t3, o3 = r4, l2 = a3);
              let c2 = null != o3 ? o3 : s2.active(), u2 = this.startSpan(e3, i3, c2), d2 = (0, n2.setSpan)(c2, u2);
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
          let a2 = r3(780), n2 = r3(403), i2 = r3(491), o2 = (0, a2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(i2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
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
                  let i2 = r4.slice(0, n3), o2 = r4.slice(n3 + 1, t3.length);
                  (0, a2.validateKey)(i2) && (0, a2.validateValue)(o2) && e4.set(i2, o2);
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
          let r3 = "[_0-9a-z-*/]", a2 = `[a-z]${r3}{0,255}`, n2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, i2 = RegExp(`^(?:${a2}|${n2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return i2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
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
          let a2 = r3(476), n2 = r3(403), i2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return i2.test(e3) && e3 !== a2.INVALID_TRACEID;
          }
          function l2(e3) {
            return o2.test(e3) && e3 !== a2.INVALID_SPANID;
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
        } }, S = {};
        function C(e2) {
          var t2 = S[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = S[e2] = { exports: {} }, a2 = true;
          try {
            E[e2].call(r3.exports, r3, r3.exports, C), a2 = false;
          } finally {
            a2 && delete S[e2];
          }
          return r3.exports;
        }
        C.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var T = {};
        Object.defineProperty(T, "__esModule", { value: true }), T.trace = T.propagation = T.metrics = T.diag = T.context = T.INVALID_SPAN_CONTEXT = T.INVALID_TRACEID = T.INVALID_SPANID = T.isValidSpanId = T.isValidTraceId = T.isSpanContextValid = T.createTraceState = T.TraceFlags = T.SpanStatusCode = T.SpanKind = T.SamplingDecision = T.ProxyTracerProvider = T.ProxyTracer = T.defaultTextMapSetter = T.defaultTextMapGetter = T.ValueType = T.createNoopMeter = T.DiagLogLevel = T.DiagConsoleLogger = T.ROOT_CONTEXT = T.createContextKey = T.baggageEntryMetadataFromString = void 0, s = C(369), Object.defineProperty(T, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), l = C(780), Object.defineProperty(T, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(T, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = C(972), Object.defineProperty(T, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), u = C(957), Object.defineProperty(T, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = C(102), Object.defineProperty(T, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), h = C(901), Object.defineProperty(T, "ValueType", { enumerable: true, get: function() {
          return h.ValueType;
        } }), p = C(194), Object.defineProperty(T, "defaultTextMapGetter", { enumerable: true, get: function() {
          return p.defaultTextMapGetter;
        } }), Object.defineProperty(T, "defaultTextMapSetter", { enumerable: true, get: function() {
          return p.defaultTextMapSetter;
        } }), f = C(125), Object.defineProperty(T, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = C(846), Object.defineProperty(T, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = C(996), Object.defineProperty(T, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), b = C(357), Object.defineProperty(T, "SpanKind", { enumerable: true, get: function() {
          return b.SpanKind;
        } }), v = C(847), Object.defineProperty(T, "SpanStatusCode", { enumerable: true, get: function() {
          return v.SpanStatusCode;
        } }), y = C(475), Object.defineProperty(T, "TraceFlags", { enumerable: true, get: function() {
          return y.TraceFlags;
        } }), w = C(98), Object.defineProperty(T, "createTraceState", { enumerable: true, get: function() {
          return w.createTraceState;
        } }), x = C(139), Object.defineProperty(T, "isSpanContextValid", { enumerable: true, get: function() {
          return x.isSpanContextValid;
        } }), Object.defineProperty(T, "isValidTraceId", { enumerable: true, get: function() {
          return x.isValidTraceId;
        } }), Object.defineProperty(T, "isValidSpanId", { enumerable: true, get: function() {
          return x.isValidSpanId;
        } }), _ = C(476), Object.defineProperty(T, "INVALID_SPANID", { enumerable: true, get: function() {
          return _.INVALID_SPANID;
        } }), Object.defineProperty(T, "INVALID_TRACEID", { enumerable: true, get: function() {
          return _.INVALID_TRACEID;
        } }), Object.defineProperty(T, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return _.INVALID_SPAN_CONTEXT;
        } }), r2 = C(67), Object.defineProperty(T, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), a = C(506), Object.defineProperty(T, "diag", { enumerable: true, get: function() {
          return a.diag;
        } }), n = C(886), Object.defineProperty(T, "metrics", { enumerable: true, get: function() {
          return n.metrics;
        } }), i = C(939), Object.defineProperty(T, "propagation", { enumerable: true, get: function() {
          return i.propagation;
        } }), o = C(845), Object.defineProperty(T, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), T.default = { context: r2.context, diag: a.diag, metrics: n.metrics, propagation: i.propagation, trace: o.trace }, t.exports = T;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, a, n, i = {};
        i.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var n2 = {}, i2 = t2.split(a), o = (r3 || {}).decode || e2, s = 0; s < i2.length; s++) {
            var l = i2[s], c = l.indexOf("=");
            if (!(c < 0)) {
              var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == n2[u] && (n2[u] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, o));
            }
          }
          return n2;
        }, i.serialize = function(e3, t2, a2) {
          var i2 = a2 || {}, o = i2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!n.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !n.test(s)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + s;
          if (null != i2.maxAge) {
            var c = i2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (i2.domain) {
            if (!n.test(i2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + i2.domain;
          }
          if (i2.path) {
            if (!n.test(i2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + i2.path;
          }
          if (i2.expires) {
            if ("function" != typeof i2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + i2.expires.toUTCString();
          }
          if (i2.httpOnly && (l += "; HttpOnly"), i2.secure && (l += "; Secure"), i2.sameSite) switch ("string" == typeof i2.sameSite ? i2.sameSite.toLowerCase() : i2.sameSite) {
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
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, a = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = i;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, a, n, i;
        var o = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function a2() {
          }
          function n2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function i2(e4, t3, a3, i3, o3) {
            if ("function" != typeof a3) throw TypeError("The listener must be a function");
            var s3 = new n2(a3, i3 || e4, o3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], s3] : e4._events[l2].push(s3) : (e4._events[l2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
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
            for (var n3 = 0, i3 = a3.length, o3 = Array(i3); n3 < i3; n3++) o3[n3] = a3[n3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, a3 = this._events[t3];
            return a3 ? a3.fn ? 1 : a3.length : 0;
          }, s2.prototype.emit = function(e4, t3, a3, n3, i3, o3) {
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
                  return u.fn.call(u.context, t3, a3, n3, i3), true;
                case 6:
                  return u.fn.call(u.context, t3, a3, n3, i3, o3), true;
              }
              for (c2 = 1, l2 = Array(d - 1); c2 < d; c2++) l2[c2 - 1] = arguments[c2];
              u.fn.apply(u.context, l2);
            } else {
              var h, p = u.length;
              for (c2 = 0; c2 < p; c2++) switch (u[c2].once && this.removeListener(e4, u[c2].fn, void 0, true), d) {
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
                  if (!l2) for (h = 1, l2 = Array(d - 1); h < d; h++) l2[h - 1] = arguments[h];
                  u[c2].fn.apply(u[c2].context, l2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, a3, n3) {
            var i3 = r3 ? r3 + e4 : e4;
            if (!this._events[i3]) return this;
            if (!t3) return o2(this, i3), this;
            var s3 = this._events[i3];
            if (s3.fn) s3.fn !== t3 || n3 && !s3.once || a3 && s3.context !== a3 || o2(this, i3);
            else {
              for (var l2 = 0, c2 = [], u = s3.length; l2 < u; l2++) (s3[l2].fn !== t3 || n3 && !s3[l2].once || a3 && s3[l2].context !== a3) && c2.push(s3[l2]);
              c2.length ? this._events[i3] = 1 === c2.length ? c2[0] : c2 : o2(this, i3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new a2(), this._eventsCount = 0), this;
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
              let i2 = n2 / 2 | 0, o2 = a2 + i2;
              0 >= r3(e4[o2], t3) ? (a2 = ++o2, n2 -= i2 + 1) : n2 = i2;
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
          let i2 = (e4, t3, r4) => new Promise((i3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void i3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  i3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let a3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new n2(a3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            a2(e4.then(i3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = i2, e3.exports.default = i2, e3.exports.TimeoutError = n2;
        } }, s = {};
        function l(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, a2 = true;
          try {
            o[e3](r3, r3.exports, l), a2 = false;
          } finally {
            a2 && delete s[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(993), r2 = l(816), a = l(821), n = () => {
        }, i = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, i2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = n, this._resolveIdle = n, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: a.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
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
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && n2(i);
                  });
                  a2(await o3);
                } catch (e4) {
                  n2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
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
      let i = new (e.r(78500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let a2 = t2.url(e2);
        return { url: a2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let a2 = o(e2, t2);
        return a2 ? i.run(a2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = i.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
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
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let o = e.r(25085), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: n2, headers: i2, body: o2, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? a.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function c(e2, t2) {
        let r2 = (0, o.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: n2, proxyPort: i2 } = r2, c2 = await l(n2, t2), u2 = await e2(`http://localhost:${i2}`, { method: "POST", body: JSON.stringify(c2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u2.json(), { api: h } = d;
        switch (h) {
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
            return h;
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
      let i = e.r(25085), o = e.r(28325);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }, 54846, (e, t, r) => {
      !function() {
        "use strict";
        var e2 = { 114: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, a3 = "", n = 0, i = -1, o = 0, s = 0; s <= e4.length; ++s) {
              if (s < e4.length) r4 = e4.charCodeAt(s);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (i === s - 1 || 1 === o) ;
                else if (i !== s - 1 && 2 === o) {
                  if (a3.length < 2 || 2 !== n || 46 !== a3.charCodeAt(a3.length - 1) || 46 !== a3.charCodeAt(a3.length - 2)) {
                    if (a3.length > 2) {
                      var l = a3.lastIndexOf("/");
                      if (l !== a3.length - 1) {
                        -1 === l ? (a3 = "", n = 0) : n = (a3 = a3.slice(0, l)).length - 1 - a3.lastIndexOf("/"), i = s, o = 0;
                        continue;
                      }
                    } else if (2 === a3.length || 1 === a3.length) {
                      a3 = "", n = 0, i = s, o = 0;
                      continue;
                    }
                  }
                  t3 && (a3.length > 0 ? a3 += "/.." : a3 = "..", n = 2);
                } else a3.length > 0 ? a3 += "/" + e4.slice(i + 1, s) : a3 = e4.slice(i + 1, s), n = s - i - 1;
                i = s, o = 0;
              } else 46 === r4 && -1 !== o ? ++o : o = -1;
            }
            return a3;
          }
          var a2 = { resolve: function() {
            for (var e4, a3, n = "", i = false, o = arguments.length - 1; o >= -1 && !i; o--) o >= 0 ? a3 = arguments[o] : (void 0 === e4 && (e4 = ""), a3 = e4), t2(a3), 0 !== a3.length && (n = a3 + "/" + n, i = 47 === a3.charCodeAt(0));
            if (n = r3(n, !i), i) if (n.length > 0) return "/" + n;
            else return "/";
            return n.length > 0 ? n : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var a3 = 47 === e4.charCodeAt(0), n = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !a3)).length || a3 || (e4 = "."), e4.length > 0 && n && (e4 += "/"), a3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var n = arguments[r4];
              t2(n), n.length > 0 && (void 0 === e4 ? e4 = n : e4 += "/" + n);
            }
            return void 0 === e4 ? "." : a2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = a2.resolve(e4)) === (r4 = a2.resolve(r4))) return "";
            for (var n = 1; n < e4.length && 47 === e4.charCodeAt(n); ++n) ;
            for (var i = e4.length, o = i - n, s = 1; s < r4.length && 47 === r4.charCodeAt(s); ++s) ;
            for (var l = r4.length - s, c = o < l ? o : l, u = -1, d = 0; d <= c; ++d) {
              if (d === c) {
                if (l > c) {
                  if (47 === r4.charCodeAt(s + d)) return r4.slice(s + d + 1);
                  else if (0 === d) return r4.slice(s + d);
                } else o > c && (47 === e4.charCodeAt(n + d) ? u = d : 0 === d && (u = 0));
                break;
              }
              var h = e4.charCodeAt(n + d);
              if (h !== r4.charCodeAt(s + d)) break;
              47 === h && (u = d);
            }
            var p = "";
            for (d = n + u + 1; d <= i; ++d) (d === i || 47 === e4.charCodeAt(d)) && (0 === p.length ? p += ".." : p += "/..");
            return p.length > 0 ? p + r4.slice(s + u) : (s += u, 47 === r4.charCodeAt(s) && ++s, r4.slice(s));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), a3 = 47 === r4, n = -1, i = true, o = e4.length - 1; o >= 1; --o) if (47 === (r4 = e4.charCodeAt(o))) {
              if (!i) {
                n = o;
                break;
              }
            } else i = false;
            return -1 === n ? a3 ? "/" : "." : a3 && 1 === n ? "//" : e4.slice(0, n);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var a3, n = 0, i = -1, o = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var s = r4.length - 1, l = -1;
              for (a3 = e4.length - 1; a3 >= 0; --a3) {
                var c = e4.charCodeAt(a3);
                if (47 === c) {
                  if (!o) {
                    n = a3 + 1;
                    break;
                  }
                } else -1 === l && (o = false, l = a3 + 1), s >= 0 && (c === r4.charCodeAt(s) ? -1 == --s && (i = a3) : (s = -1, i = l));
              }
              return n === i ? i = l : -1 === i && (i = e4.length), e4.slice(n, i);
            }
            for (a3 = e4.length - 1; a3 >= 0; --a3) if (47 === e4.charCodeAt(a3)) {
              if (!o) {
                n = a3 + 1;
                break;
              }
            } else -1 === i && (o = false, i = a3 + 1);
            return -1 === i ? "" : e4.slice(n, i);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, a3 = 0, n = -1, i = true, o = 0, s = e4.length - 1; s >= 0; --s) {
              var l = e4.charCodeAt(s);
              if (47 === l) {
                if (!i) {
                  a3 = s + 1;
                  break;
                }
                continue;
              }
              -1 === n && (i = false, n = s + 1), 46 === l ? -1 === r4 ? r4 = s : 1 !== o && (o = 1) : -1 !== r4 && (o = -1);
            }
            return -1 === r4 || -1 === n || 0 === o || 1 === o && r4 === n - 1 && r4 === a3 + 1 ? "" : e4.slice(r4, n);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, a3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return a3;
            var n = e4.charCodeAt(0), i = 47 === n;
            i ? (a3.root = "/", r4 = 1) : r4 = 0;
            for (var o = -1, s = 0, l = -1, c = true, u = e4.length - 1, d = 0; u >= r4; --u) {
              if (47 === (n = e4.charCodeAt(u))) {
                if (!c) {
                  s = u + 1;
                  break;
                }
                continue;
              }
              -1 === l && (c = false, l = u + 1), 46 === n ? -1 === o ? o = u : 1 !== d && (d = 1) : -1 !== o && (d = -1);
            }
            return -1 === o || -1 === l || 0 === d || 1 === d && o === l - 1 && o === s + 1 ? -1 !== l && (0 === s && i ? a3.base = a3.name = e4.slice(1, l) : a3.base = a3.name = e4.slice(s, l)) : (0 === s && i ? (a3.name = e4.slice(1, o), a3.base = e4.slice(1, l)) : (a3.name = e4.slice(s, o), a3.base = e4.slice(s, l)), a3.ext = e4.slice(o, l)), s > 0 ? a3.dir = e4.slice(0, s - 1) : i && (a3.dir = "/"), a3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          a2.posix = a2, e3.exports = a2;
        } }, r2 = {};
        function a(t2) {
          var n = r2[t2];
          if (void 0 !== n) return n.exports;
          var i = r2[t2] = { exports: {} }, o = true;
          try {
            e2[t2](i, i.exports, a), o = false;
          } finally {
            o && delete r2[t2];
          }
          return i.exports;
        }
        a.ab = "/ROOT/node_modules/next/dist/compiled/path-browserify/", t.exports = a(114);
      }();
    }, 68886, (e, t, r) => {
      t.exports = e.r(54846);
    }, 67914, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var a3 = e4[r4];
                if ("*" === a3 || "+" === a3 || "?" === a3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === a3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === a3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === a3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === a3) {
                  for (var n2 = "", i3 = r4 + 1; i3 < e4.length; ) {
                    var o3 = e4.charCodeAt(i3);
                    if (o3 >= 48 && o3 <= 57 || o3 >= 65 && o3 <= 90 || o3 >= 97 && o3 <= 122 || 95 === o3) {
                      n2 += e4[i3++];
                      continue;
                    }
                    break;
                  }
                  if (!n2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: n2 }), r4 = i3;
                  continue;
                }
                if ("(" === a3) {
                  var s3 = 1, l2 = "", i3 = r4 + 1;
                  if ("?" === e4[i3]) throw TypeError('Pattern cannot start with "?" at '.concat(i3));
                  for (; i3 < e4.length; ) {
                    if ("\\" === e4[i3]) {
                      l2 += e4[i3++] + e4[i3++];
                      continue;
                    }
                    if (")" === e4[i3]) {
                      if (0 == --s3) {
                        i3++;
                        break;
                      }
                    } else if ("(" === e4[i3] && (s3++, "?" !== e4[i3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(i3));
                    l2 += e4[i3++];
                  }
                  if (s3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = i3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            }(e3), a2 = t3.prefixes, i2 = void 0 === a2 ? "./" : a2, o2 = t3.delimiter, s2 = void 0 === o2 ? "/#?" : o2, l = [], c = 0, u = 0, d = "", h = function(e4) {
              if (u < r3.length && r3[u].type === e4) return r3[u++].value;
            }, p = function(e4) {
              var t4 = h(e4);
              if (void 0 !== t4) return t4;
              var a3 = r3[u], n2 = a3.type, i3 = a3.index;
              throw TypeError("Unexpected ".concat(n2, " at ").concat(i3, ", expected ").concat(e4));
            }, f = function() {
              for (var e4, t4 = ""; e4 = h("CHAR") || h("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, g = function(e4) {
              for (var t4 = 0; t4 < s2.length; t4++) {
                var r4 = s2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, m = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || g(r4) ? "[^".concat(n(s2), "]+?") : "(?:(?!".concat(n(r4), ")[^").concat(n(s2), "])+?");
            }; u < r3.length; ) {
              var b = h("CHAR"), v = h("NAME"), y = h("PATTERN");
              if (v || y) {
                var w = b || "";
                -1 === i2.indexOf(w) && (d += w, w = ""), d && (l.push(d), d = ""), l.push({ name: v || c++, prefix: w, suffix: "", pattern: y || m(w), modifier: h("MODIFIER") || "" });
                continue;
              }
              var x = b || h("ESCAPED_CHAR");
              if (x) {
                d += x;
                continue;
              }
              if (d && (l.push(d), d = ""), h("OPEN")) {
                var w = f(), _ = h("NAME") || "", E = h("PATTERN") || "", S = f();
                p("CLOSE"), l.push({ name: _ || (E ? c++ : ""), pattern: _ && !E ? m(w) : E, prefix: w, suffix: S, modifier: h("MODIFIER") || "" });
                continue;
              }
              p("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = i(t3), a2 = t3.encode, n2 = void 0 === a2 ? function(e4) {
              return e4;
            } : a2, o2 = t3.validate, s2 = void 0 === o2 || o2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", a3 = 0; a3 < e3.length; a3++) {
                var i2 = e3[a3];
                if ("string" == typeof i2) {
                  r4 += i2;
                  continue;
                }
                var o3 = t4 ? t4[i2.name] : void 0, c = "?" === i2.modifier || "*" === i2.modifier, u = "*" === i2.modifier || "+" === i2.modifier;
                if (Array.isArray(o3)) {
                  if (!u) throw TypeError('Expected "'.concat(i2.name, '" to not repeat, but got an array'));
                  if (0 === o3.length) {
                    if (c) continue;
                    throw TypeError('Expected "'.concat(i2.name, '" to not be empty'));
                  }
                  for (var d = 0; d < o3.length; d++) {
                    var h = n2(o3[d], i2);
                    if (s2 && !l[a3].test(h)) throw TypeError('Expected all "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(h, '"'));
                    r4 += i2.prefix + h + i2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof o3 || "number" == typeof o3) {
                  var h = n2(String(o3), i2);
                  if (s2 && !l[a3].test(h)) throw TypeError('Expected "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(h, '"'));
                  r4 += i2.prefix + h + i2.suffix;
                  continue;
                }
                if (!c) {
                  var p = u ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(i2.name, '" to be ').concat(p));
                }
              }
              return r4;
            };
          }
          function a(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var a2 = r3.decode, n2 = void 0 === a2 ? function(e4) {
              return e4;
            } : a2;
            return function(r4) {
              var a3 = e3.exec(r4);
              if (!a3) return false;
              for (var i2 = a3[0], o2 = a3.index, s2 = /* @__PURE__ */ Object.create(null), l = 1; l < a3.length; l++) !function(e4) {
                if (void 0 !== a3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? s2[r5.name] = a3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return n2(e5, r5);
                  }) : s2[r5.name] = n2(a3[e4], r5);
                }
              }(l);
              return { path: i2, index: o2, params: s2 };
            };
          }
          function n(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function i(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function o(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var a2 = r3.strict, o2 = void 0 !== a2 && a2, s2 = r3.start, l = r3.end, c = r3.encode, u = void 0 === c ? function(e4) {
              return e4;
            } : c, d = r3.delimiter, h = r3.endsWith, p = "[".concat(n(void 0 === h ? "" : h), "]|$"), f = "[".concat(n(void 0 === d ? "/#?" : d), "]"), g = void 0 === s2 || s2 ? "^" : "", m = 0; m < e3.length; m++) {
              var b = e3[m];
              if ("string" == typeof b) g += n(u(b));
              else {
                var v = n(u(b.prefix)), y = n(u(b.suffix));
                if (b.pattern) if (t3 && t3.push(b), v || y) if ("+" === b.modifier || "*" === b.modifier) {
                  var w = "*" === b.modifier ? "?" : "";
                  g += "(?:".concat(v, "((?:").concat(b.pattern, ")(?:").concat(y).concat(v, "(?:").concat(b.pattern, "))*)").concat(y, ")").concat(w);
                } else g += "(?:".concat(v, "(").concat(b.pattern, ")").concat(y, ")").concat(b.modifier);
                else {
                  if ("+" === b.modifier || "*" === b.modifier) throw TypeError('Can not repeat "'.concat(b.name, '" without a prefix and suffix'));
                  g += "(".concat(b.pattern, ")").concat(b.modifier);
                }
                else g += "(?:".concat(v).concat(y, ")").concat(b.modifier);
              }
            }
            if (void 0 === l || l) o2 || (g += "".concat(f, "?")), g += r3.endsWith ? "(?=".concat(p, ")") : "$";
            else {
              var x = e3[e3.length - 1], _ = "string" == typeof x ? f.indexOf(x[x.length - 1]) > -1 : void 0 === x;
              o2 || (g += "(?:".concat(f, "(?=").concat(p, "))?")), _ || (g += "(?=".concat(f, "|").concat(p, ")"));
            }
            return new RegExp(g, i(r3));
          }
          function s(e3, r3, a2) {
            if (e3 instanceof RegExp) {
              var n2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, c = 0, u = l.exec(e3.source); u; ) r3.push({ name: u[1] || c++, prefix: "", suffix: "", modifier: "", pattern: "" }), u = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (n2 = e3.map(function(e4) {
              return s(e4, r3, a2).source;
            }), new RegExp("(?:".concat(n2.join("|"), ")"), i(a2))) : o(t2(e3, a2), r3, a2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, a2) {
            return r2(t2(e3, a2), a2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return a(s(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = a, e2.tokensToRegexp = o, e2.pathToRegexp = s;
        })(), t.exports = e2;
      })();
    }, 64445, (e, t, r) => {
      var a = { 226: function(t2, r2) {
        !function(a2) {
          "use strict";
          var n2 = "function", i2 = "undefined", o = "object", s = "string", l = "major", c = "model", u = "name", d = "type", h = "vendor", p = "version", f = "architecture", g = "console", m = "mobile", b = "tablet", v = "smarttv", y = "wearable", w = "embedded", x = "Amazon", _ = "Apple", E = "ASUS", S = "BlackBerry", C = "Browser", T = "Chrome", R = "Firefox", P = "Google", O = "Huawei", k = "Microsoft", A = "Motorola", N = "Opera", I = "Samsung", M = "Sharp", D = "Sony", j = "Xiaomi", L = "Zebra", $ = "Facebook", U = "Chromium OS", H = "Mac OS", q = function(e2, t3) {
            var r3 = {};
            for (var a3 in e2) t3[a3] && t3[a3].length % 2 == 0 ? r3[a3] = t3[a3].concat(e2[a3]) : r3[a3] = e2[a3];
            return r3;
          }, W = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, B = function(e2, t3) {
            return typeof e2 === s && -1 !== F(t3).indexOf(F(e2));
          }, F = function(e2) {
            return e2.toLowerCase();
          }, V = function(e2, t3) {
            if (typeof e2 === s) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === i2 ? e2 : e2.substring(0, 350);
          }, K = function(e2, t3) {
            for (var r3, a3, i3, s2, l2, c2, u2 = 0; u2 < t3.length && !l2; ) {
              var d2 = t3[u2], h2 = t3[u2 + 1];
              for (r3 = a3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (i3 = 0; i3 < h2.length; i3++) c2 = l2[++a3], typeof (s2 = h2[i3]) === o && s2.length > 0 ? 2 === s2.length ? typeof s2[1] == n2 ? this[s2[0]] = s2[1].call(this, c2) : this[s2[0]] = s2[1] : 3 === s2.length ? typeof s2[1] !== n2 || s2[1].exec && s2[1].test ? this[s2[0]] = c2 ? c2.replace(s2[1], s2[2]) : void 0 : this[s2[0]] = c2 ? s2[1].call(this, c2, s2[2]) : void 0 : 4 === s2.length && (this[s2[0]] = c2 ? s2[3].call(this, c2.replace(s2[1], s2[2])) : void 0) : this[s2] = c2 || void 0;
              u2 += 2;
            }
          }, G = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var a3 = 0; a3 < t3[r3].length; a3++) if (B(t3[r3][a3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (B(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, z = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [p, [u, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [p, [u, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [u, p], [/opios[\/ ]+([\w\.]+)/i], [p, [u, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [p, [u, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [u, p], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [p, [u, "UC" + C]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [p, [u, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [p, [u, "WeChat"]], [/konqueror\/([\w\.]+)/i], [p, [u, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [p, [u, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [p, [u, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[u, /(.+)/, "$1 Secure " + C], p], [/\bfocus\/([\w\.]+)/i], [p, [u, R + " Focus"]], [/\bopt\/([\w\.]+)/i], [p, [u, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [p, [u, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [p, [u, "Dolphin"]], [/coast\/([\w\.]+)/i], [p, [u, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [p, [u, "MIUI " + C]], [/fxios\/([-\w\.]+)/i], [p, [u, R]], [/\bqihu|(qi?ho?o?|360)browser/i], [[u, "360 " + C]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[u, /(.+)/, "$1 " + C], p], [/(comodo_dragon)\/([\w\.]+)/i], [[u, /_/g, " "], p], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [u, p], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [u], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[u, $], p], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [u, p], [/\bgsa\/([\w\.]+) .*safari\//i], [p, [u, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [p, [u, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [p, [u, T + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[u, T + " WebView"], p], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [p, [u, "Android " + C]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [u, p], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [p, [u, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [p, u], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [u, [p, G, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [u, p], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[u, "Netscape"], p], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [p, [u, R + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [u, p], [/(cobalt)\/([\w\.]+)/i], [u, [p, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[f, "amd64"]], [/(ia32(?=;))/i], [[f, F]], [/((?:i[346]|x)86)[;\)]/i], [[f, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[f, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[f, "armhf"]], [/windows (ce|mobile); ppc;/i], [[f, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[f, /ower/, "", F]], [/(sun4\w)[;\)]/i], [[f, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[f, F]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [c, [h, I], [d, b]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [c, [h, I], [d, m]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [c, [h, _], [d, m]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [c, [h, _], [d, b]], [/(macintosh);/i], [c, [h, _]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [c, [h, M], [d, m]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [c, [h, O], [d, b]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [c, [h, O], [d, m]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[c, /_/g, " "], [h, j], [d, m]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[c, /_/g, " "], [h, j], [d, b]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [c, [h, "OPPO"], [d, m]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [c, [h, "Vivo"], [d, m]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [c, [h, "Realme"], [d, m]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [c, [h, A], [d, m]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [c, [h, A], [d, b]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [c, [h, "LG"], [d, b]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [c, [h, "LG"], [d, m]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [c, [h, "Lenovo"], [d, b]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[c, /_/g, " "], [h, "Nokia"], [d, m]], [/(pixel c)\b/i], [c, [h, P], [d, b]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [c, [h, P], [d, m]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [c, [h, D], [d, m]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[c, "Xperia Tablet"], [h, D], [d, b]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [c, [h, "OnePlus"], [d, m]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [c, [h, x], [d, b]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[c, /(.+)/g, "Fire Phone $1"], [h, x], [d, m]], [/(playbook);[-\w\),; ]+(rim)/i], [c, h, [d, b]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [c, [h, S], [d, m]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [c, [h, E], [d, b]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [c, [h, E], [d, m]], [/(nexus 9)/i], [c, [h, "HTC"], [d, b]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [c, /_/g, " "], [d, m]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [c, [h, "Acer"], [d, b]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [c, [h, "Meizu"], [d, m]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, c, [d, m]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, c, [d, b]], [/(surface duo)/i], [c, [h, k], [d, b]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [c, [h, "Fairphone"], [d, m]], [/(u304aa)/i], [c, [h, "AT&T"], [d, m]], [/\bsie-(\w*)/i], [c, [h, "Siemens"], [d, m]], [/\b(rct\w+) b/i], [c, [h, "RCA"], [d, b]], [/\b(venue[\d ]{2,7}) b/i], [c, [h, "Dell"], [d, b]], [/\b(q(?:mv|ta)\w+) b/i], [c, [h, "Verizon"], [d, b]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [c, [h, "Barnes & Noble"], [d, b]], [/\b(tm\d{3}\w+) b/i], [c, [h, "NuVision"], [d, b]], [/\b(k88) b/i], [c, [h, "ZTE"], [d, b]], [/\b(nx\d{3}j) b/i], [c, [h, "ZTE"], [d, m]], [/\b(gen\d{3}) b.+49h/i], [c, [h, "Swiss"], [d, m]], [/\b(zur\d{3}) b/i], [c, [h, "Swiss"], [d, b]], [/\b((zeki)?tb.*\b) b/i], [c, [h, "Zeki"], [d, b]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], c, [d, b]], [/\b(ns-?\w{0,9}) b/i], [c, [h, "Insignia"], [d, b]], [/\b((nxa|next)-?\w{0,9}) b/i], [c, [h, "NextBook"], [d, b]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], c, [d, m]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], c, [d, m]], [/\b(ph-1) /i], [c, [h, "Essential"], [d, m]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [c, [h, "Envizen"], [d, b]], [/\b(trio[-\w\. ]+) b/i], [c, [h, "MachSpeed"], [d, b]], [/\btu_(1491) b/i], [c, [h, "Rotor"], [d, b]], [/(shield[\w ]+) b/i], [c, [h, "Nvidia"], [d, b]], [/(sprint) (\w+)/i], [h, c, [d, m]], [/(kin\.[onetw]{3})/i], [[c, /\./g, " "], [h, k], [d, m]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [c, [h, L], [d, b]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [c, [h, L], [d, m]], [/smart-tv.+(samsung)/i], [h, [d, v]], [/hbbtv.+maple;(\d+)/i], [[c, /^/, "SmartTV"], [h, I], [d, v]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, "LG"], [d, v]], [/(apple) ?tv/i], [h, [c, _ + " TV"], [d, v]], [/crkey/i], [[c, T + "cast"], [h, P], [d, v]], [/droid.+aft(\w)( bui|\))/i], [c, [h, x], [d, v]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [c, [h, M], [d, v]], [/(bravia[\w ]+)( bui|\))/i], [c, [h, D], [d, v]], [/(mitv-\w{5}) bui/i], [c, [h, j], [d, v]], [/Hbbtv.*(technisat) (.*);/i], [h, c, [d, v]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[h, V], [c, V], [d, v]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, v]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, c, [d, g]], [/droid.+; (shield) bui/i], [c, [h, "Nvidia"], [d, g]], [/(playstation [345portablevi]+)/i], [c, [h, D], [d, g]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [c, [h, k], [d, g]], [/((pebble))app/i], [h, c, [d, y]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [c, [h, _], [d, y]], [/droid.+; (glass) \d/i], [c, [h, P], [d, y]], [/droid.+; (wt63?0{2,3})\)/i], [c, [h, L], [d, y]], [/(quest( 2| pro)?)/i], [c, [h, $], [d, y]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [d, w]], [/(aeobc)\b/i], [c, [h, x], [d, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [c, [d, m]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [c, [d, b]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, b]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, m]], [/(android[-\w\. ]{0,9});.+buil/i], [c, [h, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [p, [u, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [p, [u, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [u, p], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [p, u]], os: [[/microsoft (windows) (vista|xp)/i], [u, p], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [u, [p, G, z]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[u, "Windows"], [p, G, z]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[p, /_/g, "."], [u, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[u, H], [p, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [p, u], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [u, p], [/\(bb(10);/i], [p, [u, S]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [p, [u, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [p, [u, R + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [p, [u, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [p, [u, "watchOS"]], [/crkey\/([\d\.]+)/i], [p, [u, T + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[u, U], p], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [u, p], [/(sunos) ?([\w\.\d]*)/i], [[u, "Solaris"], p], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [u, p]] }, J = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof J)) return new J(e2, t3).getResult();
            var r3 = typeof a2 !== i2 && a2.navigator ? a2.navigator : void 0, g2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), v2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, y2 = t3 ? q(X, t3) : X, w2 = r3 && r3.userAgent == g2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[u] = void 0, t4[p] = void 0, K.call(t4, g2, y2.browser), t4[l] = typeof (e3 = t4[p]) === s ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, w2 && r3 && r3.brave && typeof r3.brave.isBrave == n2 && (t4[u] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[f] = void 0, K.call(e3, g2, y2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[h] = void 0, e3[c] = void 0, e3[d] = void 0, K.call(e3, g2, y2.device), w2 && !e3[d] && v2 && v2.mobile && (e3[d] = m), w2 && "Macintosh" == e3[c] && r3 && typeof r3.standalone !== i2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[c] = "iPad", e3[d] = b), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[u] = void 0, e3[p] = void 0, K.call(e3, g2, y2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[u] = void 0, e3[p] = void 0, K.call(e3, g2, y2.os), w2 && !e3[u] && v2 && "Unknown" != v2.platform && (e3[u] = v2.platform.replace(/chrome os/i, U).replace(/macos/i, H)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return g2;
            }, this.setUA = function(e3) {
              return g2 = typeof e3 === s && e3.length > 350 ? V(e3, 350) : e3, this;
            }, this.setUA(g2), this;
          };
          if (J.VERSION = "1.0.35", J.BROWSER = W([u, p, l]), J.CPU = W([f]), J.DEVICE = W([c, h, d, g, m, v, b, y, w]), J.ENGINE = J.OS = W([u, p]), typeof r2 !== i2) t2.exports && (r2 = t2.exports = J), r2.UAParser = J;
          else if (typeof define === n2 && define.amd) e.r, void 0 !== J && e.v(J);
          else typeof a2 !== i2 && (a2.UAParser = J);
          var Y = typeof a2 !== i2 && (a2.jQuery || a2.Zepto);
          if (Y && !Y.ua) {
            var Q = new J();
            Y.ua = Q.getResult(), Y.ua.get = function() {
              return Q.getUA();
            }, Y.ua.set = function(e2) {
              Q.setUA(e2);
              var t3 = Q.getResult();
              for (var r3 in t3) Y.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, n = {};
      function i(e2) {
        var t2 = n[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = n[e2] = { exports: {} }, o = true;
        try {
          a[e2].call(r2.exports, r2, r2.exports, i), o = false;
        } finally {
          o && delete n[e2];
        }
        return r2.exports;
      }
      i.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = i(226);
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
      var i = Array.isArray;
      function o() {
      }
      var s = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), b = Symbol.for("react.view_transition"), v = Symbol.iterator, y = Object.prototype.hasOwnProperty, w = Object.assign;
      function x(e2, t2, r2) {
        var a2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== a2 ? a2 : null, props: r2 };
      }
      function _(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var E = /\/+/g;
      function S(e2, t2) {
        var r2, a2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, a2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return a2[e3];
        })) : t2.toString(36);
      }
      function C(e2, t2, r2) {
        if (null == e2) return e2;
        var a2 = [], c2 = 0;
        return !function e3(t3, r3, a3, c3, u2) {
          var d2, h2, p2, f2 = typeof t3;
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
          if (m2) return u2 = u2(t3), m2 = "" === c3 ? "." + S(t3, 0) : c3, i(u2) ? (a3 = "", null != m2 && (a3 = m2.replace(E, "$&/") + "/"), e3(u2, r3, a3, "", function(e4) {
            return e4;
          })) : null != u2 && (_(u2) && (d2 = u2, h2 = a3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(E, "$&/") + "/") + m2, u2 = x(d2.type, h2, d2.props)), r3.push(u2)), 1;
          m2 = 0;
          var b2 = "" === c3 ? "." : c3 + ":";
          if (i(t3)) for (var y2 = 0; y2 < t3.length; y2++) f2 = b2 + S(c3 = t3[y2], y2), m2 += e3(c3, r3, a3, f2, u2);
          else if ("function" == typeof (y2 = null === (p2 = t3) || "object" != typeof p2 ? null : "function" == typeof (p2 = v && p2[v] || p2["@@iterator"]) ? p2 : null)) for (t3 = y2.call(t3), y2 = 0; !(c3 = t3.next()).done; ) f2 = b2 + S(c3 = c3.value, y2++), m2 += e3(c3, r3, a3, f2, u2);
          else if ("object" === f2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
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
      function T(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function R() {
        return /* @__PURE__ */ new WeakMap();
      }
      function P() {
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
        if (!_(e2)) throw Error(n(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = d, r.StrictMode = u, r.Suspense = p, r.ViewTransition = b, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, r.cache = function(e2) {
        return function() {
          var t2 = a.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(R);
          void 0 === (t2 = r2.get(e2)) && (t2 = P(), r2.set(e2, t2)), r2 = 0;
          for (var n2 = arguments.length; r2 < n2; r2++) {
            var i2 = arguments[r2];
            if ("function" == typeof i2 || "object" == typeof i2 && null !== i2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(i2)) && (t2 = P(), o2.set(i2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(i2)) && (t2 = P(), o2.set(i2, t2));
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
        var a2 = w({}, e2.props), i2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) y.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (a2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) a2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          a2.children = s2;
        }
        return x(e2.type, i2, a2);
      }, r.createElement = function(e2, t2, r2) {
        var a2, n2 = {}, i2 = null;
        if (null != t2) for (a2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) y.call(t2, a2) && "key" !== a2 && "__self" !== a2 && "__source" !== a2 && (n2[a2] = t2[a2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          n2.children = s2;
        }
        if (e2 && e2.defaultProps) for (a2 in o2 = e2.defaultProps) void 0 === n2[a2] && (n2[a2] = o2[a2]);
        return x(e2, i2, n2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: h, render: e2 };
      }, r.isValidElement = _, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: T };
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
      }, r.version = "19.3.0-canary-3f0b9e61-20260317";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 58217, (e) => {
      "use strict";
      let t, r, a, n;
      async function i() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(74398);
      let o = null;
      async function s() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        o || (o = i());
        let e10 = await o;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function l(...e10) {
        let t10 = await i();
        try {
          var r2;
          await (null == t10 || null == (r2 = t10.onRequestError) ? void 0 : r2.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let c = null;
      function u() {
        return c || (c = s()), c;
      }
      function d(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r2) {
            if ("then" === r2) return {};
            throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r2, a2, n2) {
            if ("function" == typeof n2[0]) return n2[0](t10);
            throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      u();
      class h extends Error {
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
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class f extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let g = "x-prerender-revalidate", m = ".meta", b = "x-next-cache-tags", v = "x-next-revalidated-tags", y = "_N_T_", w = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function x(e10) {
        var t10, r2, a2, n2, i2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t10 = s2, i2 = false; l2(); ) if ("," === (r2 = e10.charAt(s2))) {
            for (a2 = s2, s2 += 1, l2(), n2 = s2; s2 < e10.length && "=" !== (r2 = e10.charAt(s2)) && ";" !== r2 && "," !== r2; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (i2 = true, s2 = n2, o2.push(e10.substring(t10, a2)), t10 = s2) : s2 = a2 + 1;
          } else s2 += 1;
          (!i2 || s2 >= e10.length) && o2.push(e10.substring(t10, e10.length));
        }
        return o2;
      }
      function _(e10) {
        let t10 = {}, r2 = [];
        if (e10) for (let [a2, n2] of e10.entries()) "set-cookie" === a2.toLowerCase() ? (r2.push(...x(n2)), t10[a2] = 1 === r2.length ? r2[0] : r2) : t10[a2] = n2;
        return t10;
      }
      function E(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...w, GROUP: { builtinReact: [w.reactServerComponents, w.actionBrowser], serverOnly: [w.reactServerComponents, w.actionBrowser, w.instrument, w.middleware], neutralTarget: [w.apiNode, w.apiEdge], clientOnly: [w.serverSideRendering, w.appPagesBrowser], bundled: [w.reactServerComponents, w.actionBrowser, w.serverSideRendering, w.appPagesBrowser, w.shared, w.instrument, w.middleware], appPages: [w.reactServerComponents, w.serverSideRendering, w.appPagesBrowser, w.actionBrowser] } });
      let S = Symbol("response"), C = Symbol("passThrough"), T = Symbol("waitUntil");
      class R {
        constructor(e10, t10) {
          this[C] = false, this[T] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[S] || (this[S] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[C] = true;
        }
        waitUntil(e10) {
          if ("external" === this[T].kind) return (0, this[T].function)(e10);
          this[T].promises.push(e10);
        }
      }
      class P extends R {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function O(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function k(e10) {
        let t10 = e10.indexOf("#"), r2 = e10.indexOf("?"), a2 = r2 > -1 && (t10 < 0 || r2 < t10);
        return a2 || t10 > -1 ? { pathname: e10.substring(0, a2 ? r2 : t10), query: a2 ? e10.substring(r2, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function A(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r2, query: a2, hash: n2 } = k(e10);
        return `${t10}${r2}${a2}${n2}`;
      }
      function N(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r2, query: a2, hash: n2 } = k(e10);
        return `${r2}${t10}${a2}${n2}`;
      }
      function I(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r2 } = k(e10);
        return r2 === t10 || r2.startsWith(t10 + "/");
      }
      let M = /* @__PURE__ */ new WeakMap();
      function D(e10, t10) {
        let r2;
        if (!t10) return { pathname: e10 };
        let a2 = M.get(t10);
        a2 || (a2 = t10.map((e11) => e11.toLowerCase()), M.set(t10, a2));
        let n2 = e10.split("/", 2);
        if (!n2[1]) return { pathname: e10 };
        let i2 = n2[1].toLowerCase(), o2 = a2.indexOf(i2);
        return o2 < 0 ? { pathname: e10 } : (r2 = t10[o2], { pathname: e10 = e10.slice(r2.length + 1) || "/", detectedLocale: r2 });
      }
      let j = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function L(e10, t10) {
        let r2 = new URL(String(e10), t10 && String(t10));
        return j.test(r2.hostname) && (r2.hostname = "localhost"), r2;
      }
      let $ = Symbol("NextURLInternal");
      class U {
        constructor(e10, t10, r2) {
          let a2, n2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (a2 = t10, n2 = r2 || {}) : n2 = r2 || t10 || {}, this[$] = { url: L(e10, a2 ?? n2.base), options: n2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r2, a2, n2;
          let i2 = function(e11, t11) {
            let { basePath: r3, i18n: a3, trailingSlash: n3 } = t11.nextConfig ?? {}, i3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : n3 };
            r3 && I(i3.pathname, r3) && (i3.pathname = function(e12, t12) {
              if (!I(e12, t12)) return e12;
              let r4 = e12.slice(t12.length);
              return r4.startsWith("/") ? r4 : `/${r4}`;
            }(i3.pathname, r3), i3.basePath = r3);
            let o3 = i3.pathname;
            if (i3.pathname.startsWith("/_next/data/") && i3.pathname.endsWith(".json")) {
              let e12 = i3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              i3.buildId = e12[0], o3 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (i3.pathname = o3);
            }
            if (a3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(i3.pathname) : D(i3.pathname, a3.locales);
              i3.locale = e12.detectedLocale, i3.pathname = e12.pathname ?? i3.pathname, !e12.detectedLocale && i3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3) : D(o3, a3.locales)).detectedLocale && (i3.locale = e12.detectedLocale);
            }
            return i3;
          }(this[$].url.pathname, { nextConfig: this[$].options.nextConfig, parseData: true, i18nProvider: this[$].options.i18nProvider }), o2 = function(e11, t11) {
            let r3;
            if (t11?.host && !Array.isArray(t11.host)) r3 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r3 = e11.hostname;
            }
            return r3.toLowerCase();
          }(this[$].url, this[$].options.headers);
          this[$].domainLocale = this[$].options.i18nProvider ? this[$].options.i18nProvider.detectDomainLocale(o2) : function(e11, t11, r3) {
            if (e11) {
              for (let a3 of (r3 && (r3 = r3.toLowerCase()), e11)) if (t11 === a3.domain?.split(":", 1)[0].toLowerCase() || r3 === a3.defaultLocale.toLowerCase() || a3.locales?.some((e12) => e12.toLowerCase() === r3)) return a3;
            }
          }(null == (t10 = this[$].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o2);
          let s2 = (null == (r2 = this[$].domainLocale) ? void 0 : r2.defaultLocale) || (null == (n2 = this[$].options.nextConfig) || null == (a2 = n2.i18n) ? void 0 : a2.defaultLocale);
          this[$].url.pathname = i2.pathname, this[$].defaultLocale = s2, this[$].basePath = i2.basePath ?? "", this[$].buildId = i2.buildId, this[$].locale = i2.locale ?? s2, this[$].trailingSlash = i2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r2, a2) {
            if (!t11 || t11 === r2) return e11;
            let n2 = e11.toLowerCase();
            return !a2 && (I(n2, "/api") || I(n2, `/${t11.toLowerCase()}`)) ? e11 : A(e11, `/${t11}`);
          }((e10 = { basePath: this[$].basePath, buildId: this[$].buildId, defaultLocale: this[$].options.forceLocale ? void 0 : this[$].defaultLocale, locale: this[$].locale, pathname: this[$].url.pathname, trailingSlash: this[$].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = O(t10)), e10.buildId && (t10 = N(A(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = A(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : N(t10, "/") : O(t10);
        }
        formatSearch() {
          return this[$].url.search;
        }
        get buildId() {
          return this[$].buildId;
        }
        set buildId(e10) {
          this[$].buildId = e10;
        }
        get locale() {
          return this[$].locale ?? "";
        }
        set locale(e10) {
          var t10, r2;
          if (!this[$].locale || !(null == (r2 = this[$].options.nextConfig) || null == (t10 = r2.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[$].locale = e10;
        }
        get defaultLocale() {
          return this[$].defaultLocale;
        }
        get domainLocale() {
          return this[$].domainLocale;
        }
        get searchParams() {
          return this[$].url.searchParams;
        }
        get host() {
          return this[$].url.host;
        }
        set host(e10) {
          this[$].url.host = e10;
        }
        get hostname() {
          return this[$].url.hostname;
        }
        set hostname(e10) {
          this[$].url.hostname = e10;
        }
        get port() {
          return this[$].url.port;
        }
        set port(e10) {
          this[$].url.port = e10;
        }
        get protocol() {
          return this[$].url.protocol;
        }
        set protocol(e10) {
          this[$].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[$].url = L(e10), this.analyze();
        }
        get origin() {
          return this[$].url.origin;
        }
        get pathname() {
          return this[$].url.pathname;
        }
        set pathname(e10) {
          this[$].url.pathname = e10;
        }
        get hash() {
          return this[$].url.hash;
        }
        set hash(e10) {
          this[$].url.hash = e10;
        }
        get search() {
          return this[$].url.search;
        }
        set search(e10) {
          this[$].url.search = e10;
        }
        get password() {
          return this[$].url.password;
        }
        set password(e10) {
          this[$].url.password = e10;
        }
        get username() {
          return this[$].url.username;
        }
        set username(e10) {
          this[$].url.username = e10;
        }
        get basePath() {
          return this[$].basePath;
        }
        set basePath(e10) {
          this[$].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
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
          return new U(String(this), this[$].options);
        }
      }
      var H, q, W, B, F, V, K, G, z, X, J, Y, Q, Z, ee, et = e.i(28042);
      let er = Symbol("internal request");
      class ea extends Request {
        constructor(e10, t10 = {}) {
          const r2 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          E(r2), e10 instanceof Request ? super(e10, t10) : super(r2, t10);
          const a2 = new U(r2, { headers: _(this.headers), nextConfig: t10.nextConfig });
          this[er] = { cookies: new et.RequestCookies(this.headers), nextUrl: a2, url: a2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[er].cookies;
        }
        get nextUrl() {
          return this[er].nextUrl;
        }
        get page() {
          throw new p();
        }
        get ua() {
          throw new f();
        }
        get url() {
          return this[er].url;
        }
      }
      class en {
        static get(e10, t10, r2) {
          let a2 = Reflect.get(e10, t10, r2);
          return "function" == typeof a2 ? a2.bind(e10) : a2;
        }
        static set(e10, t10, r2, a2) {
          return Reflect.set(e10, t10, r2, a2);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let ei = Symbol("internal response"), eo = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function es(e10, t10) {
        var r2;
        if (null == e10 || null == (r2 = e10.request) ? void 0 : r2.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r3 = [];
          for (let [a2, n2] of e10.request.headers) t10.set("x-middleware-request-" + a2, n2), r3.push(a2);
          t10.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class el extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r2 = this.headers, a2 = new Proxy(new et.ResponseCookies(r2), { get(e11, a3, n2) {
            switch (a3) {
              case "delete":
              case "set":
                return (...n3) => {
                  let i2 = Reflect.apply(e11[a3], e11, n3), o2 = new Headers(r2);
                  return i2 instanceof et.ResponseCookies && r2.set("x-middleware-set-cookie", i2.getAll().map((e12) => (0, et.stringifyCookie)(e12)).join(",")), es(t10, o2), i2;
                };
              default:
                return en.get(e11, a3, n2);
            }
          } });
          this[ei] = { cookies: a2, url: t10.url ? new U(t10.url, { headers: _(r2), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[ei].cookies;
        }
        static json(e10, t10) {
          let r2 = Response.json(e10, t10);
          return new el(r2.body, r2);
        }
        static redirect(e10, t10) {
          let r2 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!eo.has(r2)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let a2 = "object" == typeof t10 ? t10 : {}, n2 = new Headers(null == a2 ? void 0 : a2.headers);
          return n2.set("Location", E(e10)), new el(null, { ...a2, headers: n2, status: r2 });
        }
        static rewrite(e10, t10) {
          let r2 = new Headers(null == t10 ? void 0 : t10.headers);
          return r2.set("x-middleware-rewrite", E(e10)), es(t10, r2), new el(null, { ...t10, headers: r2 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), es(e10, t10), new el(null, { ...e10, headers: t10 });
        }
      }
      function ec(e10, t10) {
        let r2 = "string" == typeof t10 ? new URL(t10) : t10, a2 = new URL(e10, t10), n2 = a2.origin === r2.origin;
        return { url: n2 ? a2.toString().slice(r2.origin.length) : a2.toString(), isRelative: n2 };
      }
      let eu = "next-router-prefetch", ed = ["rsc", "next-router-state-tree", eu, "next-hmr-refresh", "next-router-segment-prefetch"], eh = "_rsc";
      function ep(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function ef(e10) {
        return ep(e10.split("/").reduce((e11, t10, r2, a2) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r2 === a2.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class eg extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eg();
        }
      }
      class em extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r2, a2) {
            if ("symbol" == typeof r2) return en.get(t10, r2, a2);
            let n2 = r2.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            if (void 0 !== i2) return en.get(t10, i2, a2);
          }, set(t10, r2, a2, n2) {
            if ("symbol" == typeof r2) return en.set(t10, r2, a2, n2);
            let i2 = r2.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            return en.set(t10, o2 ?? r2, a2, n2);
          }, has(t10, r2) {
            if ("symbol" == typeof r2) return en.has(t10, r2);
            let a2 = r2.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return void 0 !== n2 && en.has(t10, n2);
          }, deleteProperty(t10, r2) {
            if ("symbol" == typeof r2) return en.deleteProperty(t10, r2);
            let a2 = r2.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return void 0 === n2 || en.deleteProperty(t10, n2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r2) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return eg.callable;
              default:
                return en.get(e11, t10, r2);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new em(e10);
        }
        append(e10, t10) {
          let r2 = this.headers[e10];
          "string" == typeof r2 ? this.headers[e10] = [r2, t10] : Array.isArray(r2) ? r2.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r2, a2] of this.entries()) e10.call(t10, a2, r2, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r2 = this.get(t10);
            yield [t10, r2];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let eb = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class ev {
        disable() {
          throw eb;
        }
        getStore() {
        }
        run() {
          throw eb;
        }
        exit() {
          throw eb;
        }
        enterWith() {
          throw eb;
        }
        static bind(e10) {
          return e10;
        }
      }
      let ey = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      function ew() {
        return ey ? new ey() : new ev();
      }
      let ex = ew();
      class e_ extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new e_();
        }
      }
      class eE {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r2) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return e_.callable;
              default:
                return en.get(e11, t10, r2);
            }
          } });
        }
      }
      let eS = Symbol.for("next.mutated.cookies");
      class eC {
        static wrap(e10, t10) {
          let r2 = new et.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r2.set(t11);
          let a2 = [], n2 = /* @__PURE__ */ new Set(), i2 = () => {
            let e11 = ex.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), a2 = r2.getAll().filter((e12) => n2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of a2) {
                let r3 = new et.ResponseCookies(new Headers());
                r3.set(t11), e12.push(r3.toString());
              }
              t10(e12);
            }
          }, o2 = new Proxy(r2, { get(e11, t11, r3) {
            switch (t11) {
              case eS:
                return a2;
              case "delete":
                return function(...t12) {
                  n2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o2;
                  } finally {
                    i2();
                  }
                };
              case "set":
                return function(...t12) {
                  n2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o2;
                  } finally {
                    i2();
                  }
                };
              default:
                return en.get(e11, t11, r3);
            }
          } });
          return o2;
        }
      }
      function eT(e10, t10) {
        if ("action" !== e10.phase) throw new e_();
      }
      var eR = ((H = eR || {}).handleRequest = "BaseServer.handleRequest", H.run = "BaseServer.run", H.pipe = "BaseServer.pipe", H.getStaticHTML = "BaseServer.getStaticHTML", H.render = "BaseServer.render", H.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", H.renderToResponse = "BaseServer.renderToResponse", H.renderToHTML = "BaseServer.renderToHTML", H.renderError = "BaseServer.renderError", H.renderErrorToResponse = "BaseServer.renderErrorToResponse", H.renderErrorToHTML = "BaseServer.renderErrorToHTML", H.render404 = "BaseServer.render404", H), eP = ((q = eP || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", q.loadComponents = "LoadComponents.loadComponents", q), eO = ((W = eO || {}).getRequestHandler = "NextServer.getRequestHandler", W.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", W.getServer = "NextServer.getServer", W.getServerRequestHandler = "NextServer.getServerRequestHandler", W.createServer = "createServer.createServer", W), ek = ((B = ek || {}).compression = "NextNodeServer.compression", B.getBuildId = "NextNodeServer.getBuildId", B.createComponentTree = "NextNodeServer.createComponentTree", B.clientComponentLoading = "NextNodeServer.clientComponentLoading", B.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", B.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", B.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", B.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", B.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", B.sendRenderResult = "NextNodeServer.sendRenderResult", B.proxyRequest = "NextNodeServer.proxyRequest", B.runApi = "NextNodeServer.runApi", B.render = "NextNodeServer.render", B.renderHTML = "NextNodeServer.renderHTML", B.imageOptimizer = "NextNodeServer.imageOptimizer", B.getPagePath = "NextNodeServer.getPagePath", B.getRoutesManifest = "NextNodeServer.getRoutesManifest", B.findPageComponents = "NextNodeServer.findPageComponents", B.getFontManifest = "NextNodeServer.getFontManifest", B.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", B.getRequestHandler = "NextNodeServer.getRequestHandler", B.renderToHTML = "NextNodeServer.renderToHTML", B.renderError = "NextNodeServer.renderError", B.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", B.render404 = "NextNodeServer.render404", B.startResponse = "NextNodeServer.startResponse", B.route = "route", B.onProxyReq = "onProxyReq", B.apiResolver = "apiResolver", B.internalFetch = "internalFetch", B), eA = ((F = eA || {}).startServer = "startServer.startServer", F), eN = ((V = eN || {}).getServerSideProps = "Render.getServerSideProps", V.getStaticProps = "Render.getStaticProps", V.renderToString = "Render.renderToString", V.renderDocument = "Render.renderDocument", V.createBodyResult = "Render.createBodyResult", V), eI = ((K = eI || {}).renderToString = "AppRender.renderToString", K.renderToReadableStream = "AppRender.renderToReadableStream", K.getBodyResult = "AppRender.getBodyResult", K.fetch = "AppRender.fetch", K), eM = ((G = eM || {}).executeRoute = "Router.executeRoute", G), eD = ((z = eD || {}).runHandler = "Node.runHandler", z), ej = ((X = ej || {}).runHandler = "AppRouteRouteHandlers.runHandler", X), eL = ((J = eL || {}).generateMetadata = "ResolveMetadata.generateMetadata", J.generateViewport = "ResolveMetadata.generateViewport", J), e$ = ((Y = e$ || {}).execute = "Middleware.execute", Y);
      let eU = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eH = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eq(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eW = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eB, propagation: eF, trace: eV, SpanStatusCode: eK, SpanKind: eG, ROOT_CONTEXT: ez } = t = e.r(59110);
      class eX extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eJ = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof eX && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eK.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eY = /* @__PURE__ */ new Map(), eQ = t.createContextKey("next.rootSpanId"), eZ = 0, e0 = { set(e10, t10, r2) {
        e10.push({ key: t10, value: r2 });
      } }, e1 = (n = new class e {
        getTracerInstance() {
          return eV.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eB;
        }
        getTracePropagationData() {
          let e10 = eB.active(), t10 = [];
          return eF.inject(e10, t10, e0), t10;
        }
        getActiveScopeSpan() {
          return eV.getSpan(null == eB ? void 0 : eB.active());
        }
        withPropagatedContext(e10, t10, r2, a2 = false) {
          let n2 = eB.active();
          if (a2) {
            let a3 = eF.extract(ez, e10, r2);
            if (eV.getSpanContext(a3)) return eB.with(a3, t10);
            let i3 = eF.extract(n2, e10, r2);
            return eB.with(i3, t10);
          }
          if (eV.getSpanContext(n2)) return t10();
          let i2 = eF.extract(n2, e10, r2);
          return eB.with(i2, t10);
        }
        trace(...e10) {
          let [t10, r2, a2] = e10, { fn: n2, options: i2 } = "function" == typeof r2 ? { fn: r2, options: {} } : { fn: a2, options: { ...r2 } }, o2 = i2.spanName ?? t10;
          if (!eU.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || i2.hideSpan) return n2();
          let s2 = this.getSpanContext((null == i2 ? void 0 : i2.parentSpan) ?? this.getActiveScopeSpan());
          s2 || (s2 = (null == eB ? void 0 : eB.active()) ?? ez);
          let l2 = s2.getValue(eQ), c2 = "number" != typeof l2 || !eY.has(l2), u2 = eZ++;
          return i2.attributes = { "next.span_name": o2, "next.span_type": t10, ...i2.attributes }, eB.with(s2.setValue(eQ, u2), () => this.getTracerInstance().startActiveSpan(o2, i2, (e11) => {
            let r3;
            eW && t10 && eH.has(t10) && (r3 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let a3 = false, o3 = () => {
              !a3 && (a3 = true, eY.delete(u2), r3 && performance.measure(`${eW}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r3, end: performance.now() }));
            };
            if (c2 && eY.set(u2, new Map(Object.entries(i2.attributes ?? {}))), n2.length > 1) try {
              return n2(e11, (t11) => eJ(e11, t11));
            } catch (t11) {
              throw eJ(e11, t11), t11;
            } finally {
              o3();
            }
            try {
              let t11 = n2(e11);
              if (eq(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw eJ(e11, t12), t12;
              }).finally(o3);
              return e11.end(), o3(), t11;
            } catch (t11) {
              throw eJ(e11, t11), o3(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r2, a2, n2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eU.has(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = a2;
            "function" == typeof e11 && "function" == typeof n2 && (e11 = e11.apply(this, arguments));
            let i2 = arguments.length - 1, o2 = arguments[i2];
            if ("function" != typeof o2) return t10.trace(r2, e11, () => n2.apply(this, arguments));
            {
              let a3 = t10.getContext().bind(eB.active(), o2);
              return t10.trace(r2, e11, (e12, t11) => (arguments[i2] = function(e13) {
                return null == t11 || t11(e13), a3.apply(this, arguments);
              }, n2.apply(this, arguments)));
            }
          } : n2;
        }
        startSpan(...e10) {
          let [t10, r2] = e10, a2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r2, a2);
        }
        getSpanContext(e10) {
          return e10 ? eV.setSpan(eB.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eB.active().getValue(eQ);
          return eY.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r2 = eB.active().getValue(eQ), a2 = eY.get(r2);
          a2 && !a2.has(e10) && a2.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r2 = eV.setSpan(eB.active(), e10);
          return eB.with(r2, t10);
        }
      }(), () => n), e2 = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(e2);
      class e4 {
        constructor(e10, t10, r2, a2) {
          var n2;
          const i2 = e10 && function(e11, t11) {
            let r3 = em.from(e11.headers);
            return { isOnDemandRevalidate: r3.get(g) === t11.previewModeId, revalidateOnlyGenerated: r3.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, o2 = null == (n2 = r2.get(e2)) ? void 0 : n2.value;
          this._isEnabled = !!(!i2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = a2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: e2, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: e2, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function e6(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r2 = e10.headers["x-middleware-set-cookie"], a2 = new Headers();
          for (let e11 of x(r2)) a2.append("set-cookie", e11);
          for (let e11 of new et.ResponseCookies(a2).getAll()) t10.set(e11);
        }
      }
      let e3 = ew();
      function e5(e10) {
        switch (e10.type) {
          case "prerender":
          case "prerender-runtime":
          case "prerender-ppr":
          case "prerender-client":
          case "validation-client":
            return e10.prerenderResumeDataCache;
          case "request":
            if (e10.prerenderResumeDataCache) return e10.prerenderResumeDataCache;
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return e10;
        }
      }
      var e9 = e.i(99734);
      class e8 extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), this.name = "InvariantError";
        }
      }
      var e7 = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let te = Symbol.for("@next/cache-handlers-map"), tt = Symbol.for("@next/cache-handlers-set"), tr = globalThis;
      function ta() {
        if (tr[te]) return tr[te].entries();
      }
      async function tn(e10, t10) {
        if (!e10) return t10();
        let r2 = ti(e10);
        try {
          return await t10();
        } finally {
          var a2, n2, i2, o2;
          let t11, s2, l2, c2, u2 = (a2 = r2, n2 = ti(e10), t11 = new Set(a2.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), s2 = new Set(a2.pendingRevalidateWrites), { pendingRevalidatedTags: n2.pendingRevalidatedTags.filter((e11) => {
            let r3 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r3}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(n2.pendingRevalidates).filter(([e11]) => !(e11 in a2.pendingRevalidates))), pendingRevalidateWrites: n2.pendingRevalidateWrites.filter((e11) => !s2.has(e11)) });
          await (i2 = e10, l2 = [], (c2 = (null == (o2 = u2) ? void 0 : o2.pendingRevalidatedTags) ?? i2.pendingRevalidatedTags ?? []).length > 0 && l2.push(to(c2, i2.incrementalCache, i2)), l2.push(...Object.values((null == o2 ? void 0 : o2.pendingRevalidates) ?? i2.pendingRevalidates ?? {})), l2.push(...(null == o2 ? void 0 : o2.pendingRevalidateWrites) ?? i2.pendingRevalidateWrites ?? []), 0 !== l2.length && Promise.all(l2).then(() => void 0));
        }
      }
      function ti(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function to(e10, t10, r2) {
        if (0 === e10.length) return;
        let a2 = function() {
          if (tr[tt]) return tr[tt].values();
        }(), n2 = [], i2 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r3 = t11.profile;
          for (let [t12] of i2) if ("string" == typeof t12 && "string" == typeof r3 && t12 === r3 || "object" == typeof t12 && "object" == typeof r3 && JSON.stringify(t12) === JSON.stringify(r3) || t12 === r3) {
            e11 = t12;
            break;
          }
          let a3 = e11 || r3;
          i2.has(a3) || i2.set(a3, []), i2.get(a3).push(t11.tag);
        }
        for (let [e11, s2] of i2) {
          let i3;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var o2;
              if (!(t11 = null == r2 || null == (o2 = r2.cacheLifeProfiles) ? void 0 : o2[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (i3 = { expire: t11.expire });
          }
          for (let t11 of a2 || []) e11 ? n2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2, i3)) : n2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2));
          t10 && n2.push(t10.revalidateTag(s2, i3));
        }
        await Promise.all(n2);
      }
      let ts = ew();
      class tl {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r2 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r2, this.callbackQueue = new e9.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eq(e10)) this.waitUntil || tc(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          var t10;
          this.waitUntil || tc();
          let r2 = e3.getStore();
          r2 && this.workUnitStores.add(r2);
          let a2 = ts.getStore(), n2 = a2 ? a2.rootTaskSpawnPhase : null == r2 ? void 0 : r2.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i2 = (t10 = async () => {
            try {
              await ts.run({ rootTaskSpawnPhase: n2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, ey ? ey.bind(t10) : ev.bind(t10));
          this.callbackQueue.add(i2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = ex.getStore();
          if (!e10) throw Object.defineProperty(new e8("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return tn(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new e8("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function tc() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function tu(e10) {
        let t10, r2 = { then: (a2, n2) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r2.value = e11;
        }).catch(() => {
        }), t10.then(a2, n2)) };
        return r2;
      }
      class td {
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
      function th() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tp = Symbol.for("@next/request-context"), tf = /[^\t\x20-\x7e]/, tg = /[^\t\x20-\x7e]+/g;
      function tm(e10) {
        return tf.test(e10) ? e10.replace(tg, (e11) => encodeURIComponent(e11)) : e10;
      }
      async function tb(e10, t10, r2) {
        let a2 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r3 = e11.split("/");
            for (let e12 = 1; e12 < r3.length + 1; e12++) {
              let a3 = r3.slice(0, e12).join("/");
              a3 && (a3.endsWith("/page") || a3.endsWith("/route") || (a3 = `${a3}${!a3.endsWith("/") ? "/" : ""}layout`), t12.push(a3));
            }
          }
          return t12;
        })(e10)) t11 = tm(`${y}${t11}`), a2.add(t11);
        if (t10 && (!r2 || 0 === r2.size)) {
          let e11 = tm(`${y}${t10}`);
          a2.add(e11);
        }
        a2.has(`${y}/`) && a2.add(`${y}/index`), a2.has(`${y}/index`) && a2.add(`${y}/`);
        let n2 = Array.from(a2);
        return { tags: n2, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r3 = ta();
          if (r3) for (let [a3, n3] of r3) "getExpiration" in n3 && t11.set(a3, tu(async () => n3.getExpiration(e11)));
          return t11;
        }(n2) };
      }
      let tv = Symbol.for("NextInternalRequestMeta");
      class ty extends ea {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let tw = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tx = (e10, t10) => e1().withPropagatedContext(e10.headers, t10, tw), t_ = false;
      async function tE(t10) {
        var r2, a2, n2, i2, o2;
        let s2, l2, c2, d2, h2;
        !function() {
          if (!t_ && (t_ = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r3 } = e.r(94165);
            t11(), tx = r3(tx);
          }
        }(), await u();
        let p2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let f2 = t10.bypassNextUrl ? new URL(t10.request.url) : new U(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...f2.searchParams.keys()]) {
          let t11 = f2.searchParams.getAll(e10), r3 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r3) {
            for (let e11 of (f2.searchParams.delete(r3), t11)) f2.searchParams.append(r3, e11);
            f2.searchParams.delete(e10);
          }
        }
        let g2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in f2 && (g2 = f2.buildId || "", f2.buildId = "");
        let m2 = function(e10) {
          let t11 = new Headers();
          for (let [r3, a3] of Object.entries(e10)) for (let e11 of Array.isArray(a3) ? a3 : [a3]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r3, e11));
          return t11;
        }(t10.request.headers), b2 = m2.has("x-nextjs-data"), v2 = "1" === m2.get("rsc");
        b2 && "/index" === f2.pathname && (f2.pathname = "/");
        let y2 = /* @__PURE__ */ new Map();
        if (!p2) for (let e10 of ed) {
          let t11 = m2.get(e10);
          null !== t11 && (y2.set(e10, t11), m2.delete(e10));
        }
        let w2 = f2.searchParams.get(eh), x2 = new ty({ page: t10.page, input: ((d2 = (c2 = "string" == typeof f2) ? new URL(f2) : f2).searchParams.delete(eh), c2 ? d2.toString() : d2).toString(), init: { body: t10.request.body, headers: m2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (o2 = t10.request.requestMeta, x2[tv] = o2), b2 && Object.defineProperty(x2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: th() }) }));
        let _2 = t10.request.waitUntil ?? (null == (r2 = null == (h2 = globalThis[tp]) ? void 0 : h2.get()) ? void 0 : r2.waitUntil), E2 = new P({ request: x2, page: t10.page, context: _2 ? { waitUntil: _2 } : void 0 });
        if ((s2 = await tx(x2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = E2.waitUntil.bind(E2), r3 = new td();
            return e1().trace(e$.execute, { spanName: `middleware ${x2.method}`, attributes: { "http.target": x2.nextUrl.pathname, "http.method": x2.method } }, async () => {
              try {
                var a3, n3, i3, o3, s3, c3;
                let u2 = th(), d3 = await tb("/", x2.nextUrl.pathname, null), h3 = (s3 = x2.nextUrl, c3 = (e11) => {
                  l2 = e11;
                }, function(e11, t11, r4, a4, n4, i4, o4, s4, l3, c4) {
                  function u3(e12) {
                    r4 && r4.setHeader("Set-Cookie", e12);
                  }
                  let d4 = {};
                  return { type: "request", phase: e11, implicitTags: i4, url: { pathname: a4.pathname, search: a4.search ?? "" }, rootParams: n4, get headers() {
                    return d4.headers || (d4.headers = function(e12) {
                      let t12 = em.from(e12);
                      for (let e13 of ed) t12.delete(e13);
                      return em.seal(t12);
                    }(t11.headers)), d4.headers;
                  }, get cookies() {
                    if (!d4.cookies) {
                      let e12 = new et.RequestCookies(em.from(t11.headers));
                      e6(t11, e12), d4.cookies = eE.seal(e12);
                    }
                    return d4.cookies;
                  }, set cookies(value) {
                    d4.cookies = value;
                  }, get mutableCookies() {
                    if (!d4.mutableCookies) {
                      var h4, p4;
                      let e12, a5 = (h4 = t11.headers, p4 = o4 || (r4 ? u3 : void 0), e12 = new et.RequestCookies(em.from(h4)), eC.wrap(e12, p4));
                      e6(t11, a5), d4.mutableCookies = a5;
                    }
                    return d4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!d4.userspaceMutableCookies) {
                      var f3;
                      let e12;
                      f3 = this, d4.userspaceMutableCookies = e12 = new Proxy(f3.mutableCookies, { get(t12, r5, a5) {
                        switch (r5) {
                          case "delete":
                            return function(...r6) {
                              return eT(f3, "cookies().delete"), t12.delete(...r6), e12;
                            };
                          case "set":
                            return function(...r6) {
                              return eT(f3, "cookies().set"), t12.set(...r6), e12;
                            };
                          default:
                            return en.get(t12, r5, a5);
                        }
                      } });
                    }
                    return d4.userspaceMutableCookies;
                  }, get draftMode() {
                    return d4.draftMode || (d4.draftMode = new e4(s4, t11, this.cookies, this.mutableCookies)), d4.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: l3, serverComponentsHmrCache: c4 || globalThis.__serverComponentsHmrCache, fallbackParams: null };
                }("action", x2, void 0, s3, {}, d3, c3, u2, false, void 0)), p3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r4, buildId: a4, deploymentId: n4, previouslyRevalidatedTags: i4, nonce: o4 }) {
                  let s4 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l3 = s4 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), c4 = { isStaticGeneration: s4, page: e11, route: ef(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r4, buildId: a4, deploymentId: n4, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: o4, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r5, onAfterTaskError: a5 } = e12;
                    return new tl({ waitUntil: t12, onClose: r5, onTaskError: a5 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, previouslyRevalidatedTags: i4, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = ta();
                    if (t12) for (let [r5, a5] of t12) "refreshTags" in a5 && e12.set(r5, tu(async () => a5.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: ey ? ey.snapshot() : function(e12, ...t12) {
                    return e12(...t12);
                  }, shouldTrackFetchMetrics: l3, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = c4, c4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (n3 = t10.request.nextConfig) || null == (a3 = n3.experimental) ? void 0 : a3.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (o3 = t10.request.nextConfig) || null == (i3 = o3.experimental) ? void 0 : i3.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r3.onClose.bind(r3), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === x2.headers.get(eu), buildId: g2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] });
                return await ex.run(p3, () => e3.run(h3, t10.handler, x2, E2));
              } finally {
                setTimeout(() => {
                  r3.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(x2, E2);
        })) && !(s2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        s2 && l2 && s2.headers.set("set-cookie", l2);
        let S2 = null == s2 ? void 0 : s2.headers.get("x-middleware-rewrite");
        if (s2 && S2 && (v2 || !p2)) {
          let e10 = new U(S2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          p2 || e10.host !== x2.nextUrl.host || (e10.buildId = g2 || e10.buildId, s2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r3, isRelative: o3 } = ec(e10.toString(), f2.toString());
          !p2 && b2 && s2.headers.set("x-nextjs-rewrite", r3);
          let l3 = !o3 && (null == (i2 = t10.request.nextConfig) || null == (n2 = i2.experimental) || null == (a2 = n2.clientParamParsingOrigins) ? void 0 : a2.some((t11) => new RegExp(t11).test(e10.origin)));
          v2 && (o3 || l3) && (f2.pathname !== e10.pathname && s2.headers.set("x-nextjs-rewritten-path", e10.pathname), f2.search !== e10.search && s2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (s2 && S2 && v2 && w2) {
          let e10 = new URL(S2);
          e10.searchParams.has(eh) || (e10.searchParams.set(eh, w2), s2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let C2 = null == s2 ? void 0 : s2.headers.get("Location");
        if (s2 && C2 && !p2) {
          let e10 = new U(C2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          s2 = new Response(s2.body, s2), e10.host === f2.host && (e10.buildId = g2 || e10.buildId, s2.headers.set("Location", ec(e10, f2).url)), b2 && (s2.headers.delete("Location"), s2.headers.set("x-nextjs-redirect", ec(e10.toString(), f2.toString()).url));
        }
        let R2 = s2 || el.next(), O2 = R2.headers.get("x-middleware-override-headers"), k2 = [];
        if (O2) {
          for (let [e10, t11] of y2) R2.headers.set(`x-middleware-request-${e10}`, t11), k2.push(e10);
          k2.length > 0 && R2.headers.set("x-middleware-override-headers", O2 + "," + k2.join(","));
        }
        return { response: R2, waitUntil: ("internal" === E2[T].kind ? Promise.all(E2[T].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: x2.fetchMetrics };
      }
      class tS {
        constructor() {
          let e10, t10;
          this.promise = new Promise((r2, a2) => {
            e10 = r2, t10 = a2;
          }), this.resolve = e10, this.reject = t10;
        }
      }
      class tC {
        constructor(e10, t10, r2) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r2;
        }
      }
      class tT {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class tR {
        constructor(e10, t10, r2) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r2, this.head = new tT(), this.tail = new tT(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r2 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10)) ?? 1;
          if (r2 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r2}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E1045", enumerable: false, configurable: true });
          if (r2 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let a2 = this.cache.get(e10);
          if (a2) a2.data = t10, this.totalSize = this.totalSize - a2.size + r2, a2.size = r2, this.moveToHead(a2);
          else {
            let a3 = new tC(e10, t10, r2);
            this.cache.set(e10, a3), this.addToHead(a3), this.totalSize += r2;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: tP, stdout: tO } = (null == (ee = globalThis) ? void 0 : ee.process) ?? {}, tk = tP && !tP.NO_COLOR && (tP.FORCE_COLOR || (null == tO ? void 0 : tO.isTTY) && !tP.CI && "dumb" !== tP.TERM), tA = (e10, t10, r2, a2) => {
        let n2 = e10.substring(0, a2) + r2, i2 = e10.substring(a2 + t10.length), o2 = i2.indexOf(t10);
        return ~o2 ? n2 + tA(i2, t10, r2, o2) : n2 + i2;
      }, tN = (e10, t10, r2 = e10) => tk ? (a2) => {
        let n2 = "" + a2, i2 = n2.indexOf(t10, e10.length);
        return ~i2 ? e10 + tA(n2, t10, r2, i2) + t10 : e10 + n2 + t10;
      } : String, tI = tN("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      tN("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), tN("\x1B[3m", "\x1B[23m"), tN("\x1B[4m", "\x1B[24m"), tN("\x1B[7m", "\x1B[27m"), tN("\x1B[8m", "\x1B[28m"), tN("\x1B[9m", "\x1B[29m"), tN("\x1B[30m", "\x1B[39m");
      let tM = tN("\x1B[31m", "\x1B[39m"), tD = tN("\x1B[32m", "\x1B[39m"), tj = tN("\x1B[33m", "\x1B[39m");
      tN("\x1B[34m", "\x1B[39m");
      let tL = tN("\x1B[35m", "\x1B[39m");
      tN("\x1B[38;2;173;127;168m", "\x1B[39m"), tN("\x1B[36m", "\x1B[39m");
      let t$ = tN("\x1B[37m", "\x1B[39m");
      tN("\x1B[90m", "\x1B[39m"), tN("\x1B[40m", "\x1B[49m"), tN("\x1B[41m", "\x1B[49m"), tN("\x1B[42m", "\x1B[49m"), tN("\x1B[43m", "\x1B[49m"), tN("\x1B[44m", "\x1B[49m"), tN("\x1B[45m", "\x1B[49m"), tN("\x1B[46m", "\x1B[49m"), tN("\x1B[47m", "\x1B[49m"), t$(tI("\u25CB")), tM(tI("\u2A2F")), tj(tI("\u26A0")), t$(tI(" ")), tD(tI("\u2713")), tL(tI("\xBB")), new tR(1e4, (e10) => e10.length), new tR(1e4, (e10) => e10.length);
      var tU = ((Q = {}).APP_PAGE = "APP_PAGE", Q.APP_ROUTE = "APP_ROUTE", Q.PAGES = "PAGES", Q.FETCH = "FETCH", Q.REDIRECT = "REDIRECT", Q.IMAGE = "IMAGE", Q), tH = ((Z = {}).APP_PAGE = "APP_PAGE", Z.APP_ROUTE = "APP_ROUTE", Z.PAGES = "PAGES", Z.FETCH = "FETCH", Z.IMAGE = "IMAGE", Z);
      function tq() {
      }
      new TextEncoder();
      let tW = new TextEncoder();
      function tB(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tW.encode(e10)), t10.close();
        } });
      }
      function tF(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tV(e10, t10) {
        let r2 = new TextDecoder("utf-8", { fatal: true }), a2 = "";
        for await (let n2 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return a2;
          a2 += r2.decode(n2, { stream: true });
        }
        return a2 + r2.decode();
      }
      let tK = "ResponseAborted";
      class tG extends Error {
        constructor(...e10) {
          super(...e10), this.name = tK;
        }
      }
      let tz = 0, tX = 0, tJ = 0;
      function tY(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === tK;
      }
      async function tQ(e10, t10, r2) {
        try {
          let a2, { errored: n2, destroyed: i2 } = t10;
          if (n2 || i2) return;
          let o2 = (a2 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || a2.abort(new tG());
          }), a2), s2 = function(e11, t11) {
            let r3 = false, a3 = new tS();
            function n3() {
              a3.resolve();
            }
            e11.on("drain", n3), e11.once("close", () => {
              e11.off("drain", n3), a3.resolve();
            });
            let i3 = new tS();
            return e11.once("finish", () => {
              i3.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!r3) {
                if (r3 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                  let e12 = function(e13 = {}) {
                    let t13 = 0 === tz ? void 0 : { clientComponentLoadStart: tz, clientComponentLoadTimes: tX, clientComponentLoadCount: tJ };
                    return e13.reset && (tz = 0, tX = 0, tJ = 0), t13;
                  }();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), e1().trace(ek.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r4 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r4 || (await a3.promise, a3 = new tS());
              } catch (t13) {
                throw e11.end(), Object.defineProperty(Error("failed to write chunk to response", { cause: t13 }), "__NEXT_ERROR_CODE", { value: "E321", enumerable: false, configurable: true });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), i3.promise;
            } });
          }(t10, r2);
          await e10.pipeTo(s2, { signal: o2.signal });
        } catch (e11) {
          if (tY(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      class tZ {
        static #e = this.EMPTY = new tZ(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new tZ(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r2, metadata: a2 }) {
          this.response = e10, this.contentType = t10, this.metadata = a2, this.waitUntil = r2;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw Object.defineProperty(new e8("dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E732", enumerable: false, configurable: true });
            return tV(this.readable);
          }
          return this.response;
        }
        get readable() {
          return null === this.response ? new ReadableStream({ start(e10) {
            e10.close();
          } }) : "string" == typeof this.response ? tB(this.response) : e7.Buffer.isBuffer(this.response) ? tF(this.response) : Array.isArray(this.response) ? function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r2 } = new TransformStream(), a2 = e10[0].pipeTo(r2, { preventClose: true }), n2 = 1;
            for (; n2 < e10.length - 1; n2++) {
              let t11 = e10[n2];
              a2 = a2.then(() => t11.pipeTo(r2, { preventClose: true }));
            }
            let i2 = e10[n2];
            return (a2 = a2.then(() => i2.pipeTo(r2))).catch(tq), t10;
          }(...this.response) : this.response;
        }
        coerce() {
          return null === this.response ? [] : "string" == typeof this.response ? [tB(this.response)] : Array.isArray(this.response) ? this.response : e7.Buffer.isBuffer(this.response) ? [tF(this.response)] : [this.response];
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (tY(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          await tQ(this.readable, e10, this.waitUntil);
        }
      }
      function t0(e10, t10) {
        if (!e10) return t10;
        let r2 = parseInt(e10, 10);
        return Number.isFinite(r2) && r2 > 0 ? r2 : t10;
      }
      t0(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), t0(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var t1 = e.i(68886);
      let t2 = /* @__PURE__ */ new Map(), t4 = (e10, t10) => {
        for (let r2 of e10) {
          let e11 = t2.get(r2), a2 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof a2 && a2 <= Date.now() && a2 > t10) return true;
        }
        return false;
      }, t6 = (e10, t10) => {
        for (let r2 of e10) {
          let e11 = t2.get(r2), a2 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof a2 && a2 > t10) return true;
        }
        return false;
      };
      class t3 {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r2 = [e10, t10, []];
          return this.tasks.push(r2), r2;
        }
        append(e10, t10) {
          let r2 = this.findOrCreateTask(t1.default.dirname(e10)), a2 = r2[1].then(() => this.fs.writeFile(e10, t10));
          a2.catch(() => {
          }), r2[2].push(a2);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function t5(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class t9 {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? t9.memoryCache ? t9.debug && console.log("FileSystemCache: memory store already initialized") : (t9.debug && console.log("FileSystemCache: using memory store for fetch cache"), t9.memoryCache = function(e11) {
            return r || (r = new tR(e11, function({ value: e12 }) {
              var t10, r2;
              if (!e12) return 25;
              if (e12.kind === tU.REDIRECT) return JSON.stringify(e12.props).length;
              if (e12.kind === tU.IMAGE) throw Object.defineProperty(Error("invariant image should not be incremental-cache"), "__NEXT_ERROR_CODE", { value: "E501", enumerable: false, configurable: true });
              if (e12.kind === tU.FETCH) return JSON.stringify(e12.data || "").length;
              if (e12.kind === tU.APP_ROUTE) return e12.body.length;
              return e12.kind === tU.APP_PAGE ? Math.max(1, e12.html.length + t5(e12.rscData) + ((null == (r2 = e12.postponed) ? void 0 : r2.length) || 0) + function(e13) {
                if (!e13) return 0;
                let t11 = 0;
                for (let [r3, a2] of e13) t11 += r3.length + t5(a2);
                return t11;
              }(e12.segmentData)) : e12.html.length + ((null == (t10 = JSON.stringify(e12.pageData)) ? void 0 : t10.length) || 0);
            })), r;
          }(e10.maxMemoryCacheSize)) : t9.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, t9.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r2 = Date.now();
          for (let a2 of e10) {
            let e11 = t2.get(a2) || {};
            if (t10) {
              let n2 = { ...e11 };
              n2.stale = r2, void 0 !== t10.expire && (n2.expired = r2 + 1e3 * t10.expire), t2.set(a2, n2);
            } else t2.set(a2, { ...e11, expired: r2 });
          }
        }
        async get(...e10) {
          var t10, r2, a2, n2, i2, o2;
          let [s2, l2] = e10, { kind: c2 } = l2, u2 = null == (t10 = t9.memoryCache) ? void 0 : t10.get(s2);
          if (t9.debug && (c2 === tH.FETCH ? console.log("FileSystemCache: get", s2, l2.tags, c2, !!u2) : console.log("FileSystemCache: get", s2, c2, !!u2)), (null == u2 || null == (r2 = u2.value) ? void 0 : r2.kind) === tU.APP_PAGE || (null == u2 || null == (a2 = u2.value) ? void 0 : a2.kind) === tU.APP_ROUTE || (null == u2 || null == (n2 = u2.value) ? void 0 : n2.kind) === tU.PAGES) {
            let e11 = null == (o2 = u2.value.headers) ? void 0 : o2[b];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && t4(t11, u2.lastModified)) return t9.debug && console.log("FileSystemCache: expired tags", t11), null;
            }
          } else if ((null == u2 || null == (i2 = u2.value) ? void 0 : i2.kind) === tU.FETCH) {
            let e11 = l2.kind === tH.FETCH ? [...l2.tags || [], ...l2.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return t9.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (t4(e11, u2.lastModified)) return t9.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          return u2 ?? null;
        }
        async set(e10, t10, r2) {
          var a2;
          if (null == (a2 = t9.memoryCache) || a2.set(e10, { value: t10, lastModified: Date.now() }), t9.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          let n2 = new t3(this.fs);
          if (t10.kind === tU.APP_ROUTE) {
            let r3 = this.getFilePath(`${e10}.body`, tH.APP_ROUTE);
            n2.append(r3, t10.body);
            let a3 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
            n2.append(r3.replace(/\.body$/, m), JSON.stringify(a3, null, 2));
          } else if (t10.kind === tU.PAGES || t10.kind === tU.APP_PAGE) {
            let a3 = t10.kind === tU.APP_PAGE, i2 = this.getFilePath(`${e10}.html`, a3 ? tH.APP_PAGE : tH.PAGES);
            if (n2.append(i2, t10.html), r2.fetchCache || r2.isFallback || r2.isRoutePPREnabled || n2.append(this.getFilePath(`${e10}${a3 ? ".rsc" : ".json"}`, a3 ? tH.APP_PAGE : tH.PAGES), a3 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === tU.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r4 = i2.replace(/\.html$/, ".segments");
                for (let [a4, i3] of t10.segmentData) {
                  e11.push(a4);
                  let t11 = r4 + a4 + ".segment.rsc";
                  n2.append(t11, i3);
                }
              }
              let r3 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0 };
              n2.append(i2.replace(/\.html$/, m), JSON.stringify(r3));
            }
          } else if (t10.kind === tU.FETCH) {
            let a3 = this.getFilePath(e10, tH.FETCH);
            n2.append(a3, JSON.stringify({ ...t10, tags: r2.fetchCache ? r2.tags : [] }));
          }
          await n2.wait();
        }
        getFilePath(e10, t10) {
          switch (t10) {
            case tH.FETCH:
              return t1.default.join(this.serverDistDir, "..", "cache", "fetch-cache", e10);
            case tH.PAGES:
              return t1.default.join(this.serverDistDir, "pages", e10);
            case tH.IMAGE:
            case tH.APP_PAGE:
            case tH.APP_ROUTE:
              return t1.default.join(this.serverDistDir, "app", e10);
            default:
              throw Object.defineProperty(Error(`Unexpected file path kind: ${t10}`), "__NEXT_ERROR_CODE", { value: "E479", enumerable: false, configurable: true });
          }
        }
      }
      let t8 = ["(..)(..)", "(.)", "(..)", "(...)"], t7 = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, re = /\/\[[^/]+\](?=\/|$)/;
      function rt(e10) {
        return e10.replace(/(?:\/index)?\/?$/, "") || "/";
      }
      class rr {
        static #e = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.prerenderManifest = e10;
        }
        get(e10) {
          let t10 = rr.cacheControls.get(e10);
          if (t10) return t10;
          let r2 = this.prerenderManifest.routes[e10];
          if (r2) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = r2;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let a2 = this.prerenderManifest.dynamicRoutes[e10];
          if (a2) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = a2;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          rr.cacheControls.set(e10, t10);
        }
        clear() {
          rr.cacheControls.clear();
        }
      }
      e.i(67914);
      class ra {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r2, minimalMode: a2, serverDistDir: n2, requestHeaders: i2, maxMemoryCacheSize: o2, getPrerenderManifest: s2, fetchCacheKeyPrefix: l2, CurCacheHandler: c2, allowedRevalidateHeaderKeys: u2 }) {
          var d2, h2, p2, f2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!c2;
          const m2 = Symbol.for("@next/cache-handlers"), b2 = globalThis;
          if (c2) ra.debug && console.log("IncrementalCache: using custom cache handler", c2.name);
          else {
            const t11 = b2[m2];
            (null == t11 ? void 0 : t11.FetchCache) ? (c2 = t11.FetchCache, ra.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && n2 && (ra.debug && console.log("IncrementalCache: using filesystem cache handler"), c2 = t9);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (o2 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = a2, this.requestHeaders = i2, this.allowedRevalidateHeaderKeys = u2, this.prerenderManifest = s2(), this.cacheControls = new rr(this.prerenderManifest), this.fetchCacheKeyPrefix = l2;
          let y2 = [];
          i2[g] === (null == (h2 = this.prerenderManifest) || null == (d2 = h2.preview) ? void 0 : d2.previewModeId) && (this.isOnDemandRevalidate = true), a2 && (y2 = this.revalidatedTags = function(e11, t11) {
            return "string" == typeof e11[v] && e11["x-next-revalidate-tag-token"] === t11 ? e11[v].split(",") : [];
          }(i2, null == (f2 = this.prerenderManifest) || null == (p2 = f2.preview) ? void 0 : p2.previewModeId)), c2 && (this.cacheHandler = new c2({ dev: t10, fs: e10, flushToDisk: r2, serverDistDir: n2, revalidatedTags: y2, maxMemoryCacheSize: o2, _requestHeaders: i2, fetchCacheKeyPrefix: l2 }));
        }
        calculateRevalidate(e10, t10, r2, a2) {
          if (r2) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let n2 = this.cacheControls.get(rt(e10)), i2 = n2 ? n2.revalidate : !a2 && 1;
          return "number" == typeof i2 ? 1e3 * i2 + t10 : i2;
        }
        _getPathname(e10, t10) {
          return t10 ? e10 : /^\/index(\/|$)/.test(e10) && !function(e11, t11 = true) {
            return (void 0 !== e11.split("/").find((e12) => t8.find((t12) => e12.startsWith(t12))) && (e11 = function(e12) {
              let t12, r2, a2;
              for (let n2 of e12.split("/")) if (r2 = t8.find((e13) => n2.startsWith(e13))) {
                [t12, a2] = e12.split(r2, 2);
                break;
              }
              if (!t12 || !r2 || !a2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", { value: "E269", enumerable: false, configurable: true });
              switch (t12 = ef(t12), r2) {
                case "(.)":
                  a2 = "/" === t12 ? `/${a2}` : t12 + "/" + a2;
                  break;
                case "(..)":
                  if ("/" === t12) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", { value: "E207", enumerable: false, configurable: true });
                  a2 = t12.split("/").slice(0, -1).concat(a2).join("/");
                  break;
                case "(...)":
                  a2 = "/" + a2;
                  break;
                case "(..)(..)":
                  let n2 = t12.split("/");
                  if (n2.length <= 2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", { value: "E486", enumerable: false, configurable: true });
                  a2 = n2.slice(0, -2).concat(a2).join("/");
                  break;
                default:
                  throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: false, configurable: true });
              }
              return { interceptingRoute: t12, interceptedRoute: a2 };
            }(e11).interceptedRoute), t11) ? re.test(e11) : t7.test(e11);
          }(e10) ? `/index${e10}` : "/" === e10 ? "/index" : ep(e10);
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (ra.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r2 } = new tS();
          return ra.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r2), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r2;
          return null == (r2 = this.cacheHandler) ? void 0 : r2.revalidateTag(e10, t10);
        }
        async generateCacheKey(e10, t10 = {}) {
          let r2 = [], a2 = new TextEncoder(), n2 = new TextDecoder();
          if (t10.body) if (t10.body instanceof Uint8Array) r2.push(n2.decode(t10.body)), t10._ogBody = t10.body;
          else if ("function" == typeof t10.body.getReader) {
            let e11 = t10.body, i3 = [];
            try {
              await e11.pipeTo(new WritableStream({ write(e12) {
                "string" == typeof e12 ? (i3.push(a2.encode(e12)), r2.push(e12)) : (i3.push(e12), r2.push(n2.decode(e12, { stream: true })));
              } })), r2.push(n2.decode());
              let o3 = i3.reduce((e12, t11) => e12 + t11.length, 0), s3 = new Uint8Array(o3), l2 = 0;
              for (let e12 of i3) s3.set(e12, l2), l2 += e12.length;
              t10._ogBody = s3;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof t10.body.keys) {
            let e11 = t10.body;
            for (let a3 of (t10._ogBody = t10.body, /* @__PURE__ */ new Set([...e11.keys()]))) {
              let t11 = e11.getAll(a3);
              r2.push(`${a3}=${(await Promise.all(t11.map(async (e12) => "string" == typeof e12 ? e12 : await e12.text()))).join(",")}`);
            }
          } else if ("function" == typeof t10.body.arrayBuffer) {
            let e11 = t10.body, a3 = await e11.arrayBuffer();
            r2.push(await e11.text()), t10._ogBody = new Blob([a3], { type: e11.type });
          } else "string" == typeof t10.body && (r2.push(t10.body), t10._ogBody = t10.body);
          let i2 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          "traceparent" in i2 && delete i2.traceparent, "tracestate" in i2 && delete i2.tracestate;
          let o2 = JSON.stringify(["v3", this.fetchCacheKeyPrefix || "", e10, t10.method, i2, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r2]);
          {
            var s2;
            let e11 = a2.encode(o2);
            return s2 = await crypto.subtle.digest("SHA-256", e11), Array.prototype.map.call(new Uint8Array(s2), (e12) => e12.toString(16).padStart(2, "0")).join("");
          }
        }
        async get(e10, t10) {
          var r2, a2, n2, i2, o2, s2, l2;
          let c2, u2;
          if (t10.kind === tH.FETCH) {
            let r3 = e3.getStore(), a3 = r3 ? function(e11) {
              switch (e11.type) {
                case "request":
                case "prerender":
                case "prerender-runtime":
                case "prerender-client":
                case "validation-client":
                  if (e11.renderResumeDataCache) return e11.renderResumeDataCache;
                case "prerender-ppr":
                  return e11.prerenderResumeDataCache ?? null;
                case "cache":
                case "private-cache":
                case "unstable-cache":
                case "prerender-legacy":
                case "generate-static-params":
                  return null;
                default:
                  return e11;
              }
            }(r3) : null;
            if (a3) {
              let r4 = a3.fetch.get(e10);
              if ((null == r4 ? void 0 : r4.kind) === tU.FETCH) {
                let a4 = ex.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r5;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == a4 || null == (r5 = a4.pendingRevalidatedTags) ? void 0 : r5.some((t12) => t12.tag === e11));
                })) return ra.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r4 };
                ra.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else ra.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else ra.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== tH.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          e10 = this._getPathname(e10, t10.kind === tH.FETCH);
          let d2 = await (null == (r2 = this.cacheHandler) ? void 0 : r2.get(e10, t10));
          if (t10.kind === tH.FETCH) {
            if (!d2) return null;
            if ((null == (n2 = d2.value) ? void 0 : n2.kind) !== tU.FETCH) throw Object.defineProperty(new e8(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (i2 = d2.value) ? void 0 : i2.kind)} instead.`), "__NEXT_ERROR_CODE", { value: "E653", enumerable: false, configurable: true });
            let r3 = ex.getStore(), a3 = [...t10.tags || [], ...t10.softTags || []];
            if (a3.some((e11) => {
              var t11, a4;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r3 || null == (a4 = r3.pendingRevalidatedTags) ? void 0 : a4.some((t12) => t12.tag === e11));
            })) return ra.debug && console.log("IncrementalCache: expired tag", e10), null;
            let o3 = e3.getStore();
            if (o3) {
              let t11 = e5(o3);
              t11 && (ra.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, d2.value));
            }
            let s3 = t10.revalidate || d2.value.revalidate, l3 = (performance.timeOrigin + performance.now() - (d2.lastModified || 0)) / 1e3 > s3, c3 = d2.value.data;
            return t4(a3, d2.lastModified) ? null : (t6(a3, d2.lastModified) && (l3 = true), { isStale: l3, value: { kind: tU.FETCH, data: c3, revalidate: s3 } });
          }
          if ((null == d2 || null == (a2 = d2.value) ? void 0 : a2.kind) === tU.FETCH) throw Object.defineProperty(new e8(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", { value: "E652", enumerable: false, configurable: true });
          let h2 = null, { isFallback: p2 } = t10, f2 = this.cacheControls.get(rt(e10));
          if ((null == d2 ? void 0 : d2.lastModified) === -1) c2 = -1, u2 = -31536e6;
          else {
            let r3 = performance.timeOrigin + performance.now(), a3 = (null == d2 ? void 0 : d2.lastModified) || r3;
            if (void 0 === (c2 = false !== (u2 = this.calculateRevalidate(e10, a3, this.dev ?? false, t10.isFallback)) && u2 < r3 || void 0) && ((null == d2 || null == (o2 = d2.value) ? void 0 : o2.kind) === tU.APP_PAGE || (null == d2 || null == (s2 = d2.value) ? void 0 : s2.kind) === tU.APP_ROUTE)) {
              let e11 = null == (l2 = d2.value.headers) ? void 0 : l2[b];
              if ("string" == typeof e11) {
                let t11 = e11.split(",");
                t11.length > 0 && (t4(t11, a3) ? c2 = -1 : t6(t11, a3) && (c2 = true));
              }
            }
          }
          return d2 && (h2 = { isStale: c2, cacheControl: f2, revalidateAfter: u2, value: d2.value, isFallback: p2 }), !d2 && this.prerenderManifest.notFoundRoutes.includes(e10) && (h2 = { isStale: c2, value: null, cacheControl: f2, revalidateAfter: u2, isFallback: p2 }, this.set(e10, h2.value, { ...t10, cacheControl: f2 })), h2;
        }
        async set(e10, t10, r2) {
          if ((null == t10 ? void 0 : t10.kind) === tU.FETCH) {
            let r3 = e3.getStore(), a3 = r3 ? e5(r3) : null;
            a3 && (ra.debug && console.log("IncrementalCache: rdc:set", e10), a3.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r2.fetchCache) return;
          e10 = this._getPathname(e10, r2.fetchCache);
          let a2 = JSON.stringify(t10).length;
          if (r2.fetchCache && a2 > 2097152 && !this.hasCustomCacheHandler && !r2.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r2.fetchUrl || e10}, items over 2MB can not be cached (${a2} bytes)`;
            if (this.dev) throw Object.defineProperty(Error(t11), "__NEXT_ERROR_CODE", { value: "E1003", enumerable: false, configurable: true });
            console.warn(t11);
            return;
          }
          try {
            var n2;
            !r2.fetchCache && r2.cacheControl && this.cacheControls.set(rt(e10), r2.cacheControl), await (null == (n2 = this.cacheHandler) ? void 0 : n2.set(e10, t10, r2));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      if (e.i(64445), e.i(40049).default.unstable_postpone, false === ("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("needs to bail out of prerendering at this point because it used") && "Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp("\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)"), RegExp("\\n\\s+at __next_metadata_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_viewport_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_outlet_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_validation_boundary__[\\n\\s]");
      let rn = new TextEncoder(), ri = new TextDecoder();
      function ro(e10) {
        let t10 = new Uint8Array(e10.length);
        for (let r2 = 0; r2 < e10.length; r2++) {
          let a2 = e10.charCodeAt(r2);
          if (a2 > 127) throw TypeError("non-ASCII string encountered in encode()");
          t10[r2] = a2;
        }
        return t10;
      }
      function rs(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e10 ? e10 : ri.decode(e10), { alphabet: "base64url" });
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = ri.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/");
        try {
          var r2 = t10;
          if (Uint8Array.fromBase64) return Uint8Array.fromBase64(r2);
          let e11 = atob(r2), a2 = new Uint8Array(e11.length);
          for (let t11 = 0; t11 < e11.length; t11++) a2[t11] = e11.charCodeAt(t11);
          return a2;
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }
      class rl extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class rc extends rl {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r2 = "unspecified", a2 = "unspecified") {
          super(e10, { cause: { claim: r2, reason: a2, payload: t10 } }), this.claim = r2, this.reason = a2, this.payload = t10;
        }
      }
      class ru extends rl {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r2 = "unspecified", a2 = "unspecified") {
          super(e10, { cause: { claim: r2, reason: a2, payload: t10 } }), this.claim = r2, this.reason = a2, this.payload = t10;
        }
      }
      class rd extends rl {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class rh extends rl {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class rp extends rl {
        static code = "ERR_JWS_INVALID";
        code = "ERR_JWS_INVALID";
      }
      class rf extends rl {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class rg extends rl {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(e10 = "multiple matching keys found in the JSON Web Key Set", t10) {
          super(e10, t10);
        }
      }
      class rm extends rl {
        static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        constructor(e10 = "signature verification failed", t10) {
          super(e10, t10);
        }
      }
      let rb = (e10, t10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      function rv(e10, t10) {
        if (parseInt(e10.hash.name.slice(4), 10) !== t10) throw rb(`SHA-${t10}`, "algorithm.hash");
      }
      function ry(e10, t10, ...r2) {
        if ((r2 = r2.filter(Boolean)).length > 2) {
          let t11 = r2.pop();
          e10 += `one of type ${r2.join(", ")}, or ${t11}.`;
        } else 2 === r2.length ? e10 += `one of type ${r2[0]} or ${r2[1]}.` : e10 += `of type ${r2[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" == typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" == typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      let rw = (e10, t10, ...r2) => ry(`Key for the ${e10} algorithm must be `, t10, ...r2);
      async function rx(e10, t10, r2) {
        if (t10 instanceof Uint8Array) {
          if (!e10.startsWith("HS")) throw TypeError(((e11, ...t11) => ry("Key must be ", e11, ...t11))(t10, "CryptoKey", "KeyObject", "JSON Web Key"));
          return crypto.subtle.importKey("raw", t10, { hash: `SHA-${e10.slice(-3)}`, name: "HMAC" }, false, [r2]);
        }
        return !function(e11, t11, r3) {
          switch (t11) {
            case "HS256":
            case "HS384":
            case "HS512":
              if ("HMAC" !== e11.algorithm.name) throw rb("HMAC");
              rv(e11.algorithm, parseInt(t11.slice(2), 10));
              break;
            case "RS256":
            case "RS384":
            case "RS512":
              if ("RSASSA-PKCS1-v1_5" !== e11.algorithm.name) throw rb("RSASSA-PKCS1-v1_5");
              rv(e11.algorithm, parseInt(t11.slice(2), 10));
              break;
            case "PS256":
            case "PS384":
            case "PS512":
              if ("RSA-PSS" !== e11.algorithm.name) throw rb("RSA-PSS");
              rv(e11.algorithm, parseInt(t11.slice(2), 10));
              break;
            case "Ed25519":
            case "EdDSA":
              if ("Ed25519" !== e11.algorithm.name) throw rb("Ed25519");
              break;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              let a2;
              if (a2 = e11.algorithm, a2.name !== t11) throw rb(t11);
              break;
            case "ES256":
            case "ES384":
            case "ES512": {
              if ("ECDSA" !== e11.algorithm.name) throw rb("ECDSA");
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
              }(t11);
              if (e11.algorithm.namedCurve !== r4) throw rb(r4, "algorithm.namedCurve");
              break;
            }
            default:
              throw TypeError("CryptoKey does not support this operation");
          }
          if (r3 && !e11.usages.includes(r3)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${r3}.`);
        }(t10, e10, r2), t10;
      }
      async function r_(e10, t10, r2, a2) {
        let n2 = await rx(e10, t10, "verify");
        !function(e11, t11) {
          if (e11.startsWith("RS") || e11.startsWith("PS")) {
            let { modulusLength: r3 } = t11.algorithm;
            if ("number" != typeof r3 || r3 < 2048) throw TypeError(`${e11} requires key modulusLength to be 2048 bits or larger`);
          }
        }(e10, n2);
        let i2 = function(e11, t11) {
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
              return { hash: r3, name: "ECDSA", namedCurve: t11.namedCurve };
            case "Ed25519":
            case "EdDSA":
              return { name: "Ed25519" };
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              return { name: e11 };
            default:
              throw new rh(`alg ${e11} is not supported either by JOSE or your javascript runtime`);
          }
        }(e10, n2.algorithm);
        try {
          return await crypto.subtle.verify(i2, n2, r2, a2);
        } catch {
          return false;
        }
      }
      function rE(e10, t10, r2) {
        try {
          return rs(e10);
        } catch {
          throw new r2(`Failed to base64url decode the ${t10}`);
        }
      }
      function rS(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t10 = e10;
        for (; null !== Object.getPrototypeOf(t10); ) t10 = Object.getPrototypeOf(t10);
        return Object.getPrototypeOf(e10) === t10;
      }
      Symbol();
      let rC = (e10) => rS(e10) && "string" == typeof e10.kty, rT = (e10) => {
        if (e10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return e10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, rR = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", rP = (e10) => rT(e10) || rR(e10), rO = (e10) => e10?.[Symbol.toStringTag], rk = (e10, t10, r2) => {
        if (void 0 !== t10.use) {
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
          if (t10.use !== e11) throw TypeError(`Invalid key for this operation, its "use" must be "${e11}" when present`);
        }
        if (void 0 !== t10.alg && t10.alg !== e10) throw TypeError(`Invalid key for this operation, its "alg" must be "${e10}" when present`);
        if (Array.isArray(t10.key_ops)) {
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
          if (a2 && t10.key_ops?.includes?.(a2) === false) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${a2}" when present`);
        }
        return true;
      }, rA = 'Invalid or unsupported JWK "alg" (Algorithm) Parameter value';
      async function rN(e10) {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t10, keyUsages: r2 } = function(e11) {
          let t11, r3;
          switch (e11.kty) {
            case "AKP":
              switch (e11.alg) {
                case "ML-DSA-44":
                case "ML-DSA-65":
                case "ML-DSA-87":
                  t11 = { name: e11.alg }, r3 = e11.priv ? ["sign"] : ["verify"];
                  break;
                default:
                  throw new rh(rA);
              }
              break;
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t11 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t11 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r3 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new rh(rA);
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                case "ES384":
                case "ES512":
                  t11 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[e11.alg] }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: "ECDH", namedCurve: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new rh(rA);
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                case "EdDSA":
                  t11 = { name: "Ed25519" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new rh(rA);
              }
              break;
            default:
              throw new rh('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t11, keyUsages: r3 };
        }(e10), a2 = { ...e10 };
        return "AKP" !== a2.kty && delete a2.alg, delete a2.use, crypto.subtle.importKey("jwk", a2, t10, e10.ext ?? (!e10.d && !e10.priv), e10.key_ops ?? r2);
      }
      let rI = "given KeyObject instance cannot be used for this algorithm", rM = async (e10, t10, r2, n2 = false) => {
        let i2 = (a ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (i2?.[r2]) return i2[r2];
        let o2 = await rN({ ...t10, alg: r2 });
        return n2 && Object.freeze(e10), i2 ? i2[r2] = o2 : a.set(e10, { [r2]: o2 }), o2;
      };
      async function rD(e10, t10) {
        if (e10 instanceof Uint8Array || rT(e10)) return e10;
        if (rR(e10)) {
          if ("secret" === e10.type) return e10.export();
          if ("toCryptoKey" in e10 && "function" == typeof e10.toCryptoKey) try {
            return ((e11, t11) => {
              let r3, n2 = (a ||= /* @__PURE__ */ new WeakMap()).get(e11);
              if (n2?.[t11]) return n2[t11];
              let i2 = "public" === e11.type, o2 = !!i2;
              if ("x25519" === e11.asymmetricKeyType) {
                switch (t11) {
                  case "ECDH-ES":
                  case "ECDH-ES+A128KW":
                  case "ECDH-ES+A192KW":
                  case "ECDH-ES+A256KW":
                    break;
                  default:
                    throw TypeError(rI);
                }
                r3 = e11.toCryptoKey(e11.asymmetricKeyType, o2, i2 ? [] : ["deriveBits"]);
              }
              if ("ed25519" === e11.asymmetricKeyType) {
                if ("EdDSA" !== t11 && "Ed25519" !== t11) throw TypeError(rI);
                r3 = e11.toCryptoKey(e11.asymmetricKeyType, o2, [i2 ? "verify" : "sign"]);
              }
              switch (e11.asymmetricKeyType) {
                case "ml-dsa-44":
                case "ml-dsa-65":
                case "ml-dsa-87":
                  if (t11 !== e11.asymmetricKeyType.toUpperCase()) throw TypeError(rI);
                  r3 = e11.toCryptoKey(e11.asymmetricKeyType, o2, [i2 ? "verify" : "sign"]);
              }
              if ("rsa" === e11.asymmetricKeyType) {
                let a2;
                switch (t11) {
                  case "RSA-OAEP":
                    a2 = "SHA-1";
                    break;
                  case "RS256":
                  case "PS256":
                  case "RSA-OAEP-256":
                    a2 = "SHA-256";
                    break;
                  case "RS384":
                  case "PS384":
                  case "RSA-OAEP-384":
                    a2 = "SHA-384";
                    break;
                  case "RS512":
                  case "PS512":
                  case "RSA-OAEP-512":
                    a2 = "SHA-512";
                    break;
                  default:
                    throw TypeError(rI);
                }
                if (t11.startsWith("RSA-OAEP")) return e11.toCryptoKey({ name: "RSA-OAEP", hash: a2 }, o2, i2 ? ["encrypt"] : ["decrypt"]);
                r3 = e11.toCryptoKey({ name: t11.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: a2 }, o2, [i2 ? "verify" : "sign"]);
              }
              if ("ec" === e11.asymmetricKeyType) {
                let a2 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(e11.asymmetricKeyDetails?.namedCurve);
                if (!a2) throw TypeError(rI);
                let n3 = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
                n3[t11] && a2 === n3[t11] && (r3 = e11.toCryptoKey({ name: "ECDSA", namedCurve: a2 }, o2, [i2 ? "verify" : "sign"])), t11.startsWith("ECDH-ES") && (r3 = e11.toCryptoKey({ name: "ECDH", namedCurve: a2 }, o2, i2 ? [] : ["deriveBits"]));
              }
              if (!r3) throw TypeError(rI);
              return n2 ? n2[t11] = r3 : a.set(e11, { [t11]: r3 }), r3;
            })(e10, t10);
          } catch (e11) {
            if (e11 instanceof TypeError) throw e11;
          }
          let r2 = e10.export({ format: "jwk" });
          return rM(e10, r2, t10);
        }
        if (rC(e10)) return e10.k ? rs(e10.k) : rM(e10, e10, t10, true);
        throw Error("unreachable");
      }
      async function rj(e10, t10, r2) {
        if (!rS(e10)) throw new rp("Flattened JWS must be an object");
        if (void 0 === e10.protected && void 0 === e10.header) throw new rp('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new rp("JWS Protected Header incorrect type");
        if (void 0 === e10.payload) throw new rp("JWS Payload missing");
        if ("string" != typeof e10.signature) throw new rp("JWS Signature missing or incorrect type");
        if (void 0 !== e10.header && !rS(e10.header)) throw new rp("JWS Unprotected Header incorrect type");
        let a2 = {};
        if (e10.protected) try {
          let t11 = rs(e10.protected);
          a2 = JSON.parse(ri.decode(t11));
        } catch {
          throw new rp("JWS Protected Header is invalid");
        }
        if (!function(...e11) {
          let t11, r3 = e11.filter(Boolean);
          if (0 === r3.length || 1 === r3.length) return true;
          for (let e12 of r3) {
            let r4 = Object.keys(e12);
            if (!t11 || 0 === t11.size) {
              t11 = new Set(r4);
              continue;
            }
            for (let e13 of r4) {
              if (t11.has(e13)) return false;
              t11.add(e13);
            }
          }
          return true;
        }(a2, e10.header)) throw new rp("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let n2 = { ...a2, ...e10.header }, i2 = function(e11, t11, r3, a3, n3) {
          let i3;
          if (void 0 !== n3.crit && a3?.crit === void 0) throw new e11('"crit" (Critical) Header Parameter MUST be integrity protected');
          if (!a3 || void 0 === a3.crit) return /* @__PURE__ */ new Set();
          if (!Array.isArray(a3.crit) || 0 === a3.crit.length || a3.crit.some((e12) => "string" != typeof e12 || 0 === e12.length)) throw new e11('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
          for (let o3 of (i3 = void 0 !== r3 ? new Map([...Object.entries(r3), ...t11.entries()]) : t11, a3.crit)) {
            if (!i3.has(o3)) throw new rh(`Extension Header Parameter "${o3}" is not recognized`);
            if (void 0 === n3[o3]) throw new e11(`Extension Header Parameter "${o3}" is missing`);
            if (i3.get(o3) && void 0 === a3[o3]) throw new e11(`Extension Header Parameter "${o3}" MUST be integrity protected`);
          }
          return new Set(a3.crit);
        }(rp, /* @__PURE__ */ new Map([["b64", true]]), r2?.crit, a2, n2), o2 = true;
        if (i2.has("b64") && "boolean" != typeof (o2 = a2.b64)) throw new rp('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: s2 } = n2;
        if ("string" != typeof s2 || !s2) throw new rp('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let l2 = r2 && function(e11, t11) {
          if (void 0 !== t11 && (!Array.isArray(t11) || t11.some((e12) => "string" != typeof e12))) throw TypeError(`"${e11}" option must be an array of strings`);
          if (t11) return new Set(t11);
        }("algorithms", r2.algorithms);
        if (l2 && !l2.has(s2)) throw new rd('"alg" (Algorithm) Header Parameter value not allowed');
        if (o2) {
          if ("string" != typeof e10.payload) throw new rp("JWS Payload must be a string");
        } else if ("string" != typeof e10.payload && !(e10.payload instanceof Uint8Array)) throw new rp("JWS Payload must be a string or an Uint8Array instance");
        let c2 = false;
        "function" == typeof t10 && (t10 = await t10(a2, e10), c2 = true);
        var u2 = t10, d2 = "verify";
        switch (s2.substring(0, 2)) {
          case "A1":
          case "A2":
          case "di":
          case "HS":
          case "PB":
            ((e11, t11, r3) => {
              if (!(t11 instanceof Uint8Array)) {
                if (rC(t11)) {
                  if ("oct" === t11.kty && "string" == typeof t11.k && rk(e11, t11, r3)) return;
                  throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
                }
                if (!rP(t11)) throw TypeError(rw(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
                if ("secret" !== t11.type) throw TypeError(`${rO(t11)} instances for symmetric algorithms must be of type "secret"`);
              }
            })(s2, u2, d2);
            break;
          default:
            ((e11, t11, r3) => {
              if (rC(t11)) switch (r3) {
                case "decrypt":
                case "sign":
                  if ("oct" !== t11.kty && ("AKP" === t11.kty && "string" == typeof t11.priv || "string" == typeof t11.d) && rk(e11, t11, r3)) return;
                  throw TypeError("JSON Web Key for this operation must be a private JWK");
                case "encrypt":
                case "verify":
                  if ("oct" !== t11.kty && void 0 === t11.d && void 0 === t11.priv && rk(e11, t11, r3)) return;
                  throw TypeError("JSON Web Key for this operation must be a public JWK");
              }
              if (!rP(t11)) throw TypeError(rw(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key"));
              if ("secret" === t11.type) throw TypeError(`${rO(t11)} instances for asymmetric algorithms must not be of type "secret"`);
              if ("public" === t11.type) switch (r3) {
                case "sign":
                  throw TypeError(`${rO(t11)} instances for asymmetric algorithm signing must be of type "private"`);
                case "decrypt":
                  throw TypeError(`${rO(t11)} instances for asymmetric algorithm decryption must be of type "private"`);
              }
              if ("private" === t11.type) switch (r3) {
                case "verify":
                  throw TypeError(`${rO(t11)} instances for asymmetric algorithm verifying must be of type "public"`);
                case "encrypt":
                  throw TypeError(`${rO(t11)} instances for asymmetric algorithm encryption must be of type "public"`);
              }
            })(s2, u2, d2);
        }
        let h2 = function(...e11) {
          let t11 = new Uint8Array(e11.reduce((e12, { length: t12 }) => e12 + t12, 0)), r3 = 0;
          for (let a3 of e11) t11.set(a3, r3), r3 += a3.length;
          return t11;
        }(void 0 !== e10.protected ? ro(e10.protected) : new Uint8Array(), ro("."), "string" == typeof e10.payload ? o2 ? ro(e10.payload) : rn.encode(e10.payload) : e10.payload), p2 = rE(e10.signature, "signature", rp), f2 = await rD(t10, s2);
        if (!await r_(s2, f2, p2, h2)) throw new rm();
        let g2 = { payload: o2 ? rE(e10.payload, "payload", rp) : "string" == typeof e10.payload ? rn.encode(e10.payload) : e10.payload };
        return (void 0 !== e10.protected && (g2.protectedHeader = a2), void 0 !== e10.header && (g2.unprotectedHeader = e10.header), c2) ? { ...g2, key: f2 } : g2;
      }
      async function rL(e10, t10, r2) {
        if (e10 instanceof Uint8Array && (e10 = ri.decode(e10)), "string" != typeof e10) throw new rp("Compact JWS must be a string or Uint8Array");
        let { 0: a2, 1: n2, 2: i2, length: o2 } = e10.split(".");
        if (3 !== o2) throw new rp("Invalid Compact JWS");
        let s2 = await rj({ payload: n2, protected: a2, signature: i2 }, t10, r2), l2 = { payload: s2.payload, protectedHeader: s2.protectedHeader };
        return "function" == typeof t10 ? { ...l2, key: s2.key } : l2;
      }
      let r$ = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      function rU(e10) {
        let t10, r2 = r$.exec(e10);
        if (!r2 || r2[4] && r2[1]) throw TypeError("Invalid time period format");
        let a2 = parseFloat(r2[2]);
        switch (r2[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t10 = Math.round(a2);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t10 = Math.round(60 * a2);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t10 = Math.round(3600 * a2);
            break;
          case "day":
          case "days":
          case "d":
            t10 = Math.round(86400 * a2);
            break;
          case "week":
          case "weeks":
          case "w":
            t10 = Math.round(604800 * a2);
            break;
          default:
            t10 = Math.round(31557600 * a2);
        }
        return "-" === r2[1] || "ago" === r2[4] ? -t10 : t10;
      }
      let rH = (e10) => e10.includes("/") ? e10.toLowerCase() : `application/${e10.toLowerCase()}`;
      async function rq(e10, t10, r2) {
        let a2 = await rL(e10, t10, r2);
        if (a2.protectedHeader.crit?.includes("b64") && false === a2.protectedHeader.b64) throw new rf("JWTs MUST NOT use unencoded payload");
        let n2 = { payload: function(e11, t11, r3 = {}) {
          var a3, n3;
          let i2, o2;
          try {
            i2 = JSON.parse(ri.decode(t11));
          } catch {
          }
          if (!rS(i2)) throw new rf("JWT Claims Set must be a top-level JSON object");
          let { typ: s2 } = r3;
          if (s2 && ("string" != typeof e11.typ || rH(e11.typ) !== rH(s2))) throw new rc('unexpected "typ" JWT header value', i2, "typ", "check_failed");
          let { requiredClaims: l2 = [], issuer: c2, subject: u2, audience: d2, maxTokenAge: h2 } = r3, p2 = [...l2];
          for (let e12 of (void 0 !== h2 && p2.push("iat"), void 0 !== d2 && p2.push("aud"), void 0 !== u2 && p2.push("sub"), void 0 !== c2 && p2.push("iss"), new Set(p2.reverse()))) if (!(e12 in i2)) throw new rc(`missing required "${e12}" claim`, i2, e12, "missing");
          if (c2 && !(Array.isArray(c2) ? c2 : [c2]).includes(i2.iss)) throw new rc('unexpected "iss" claim value', i2, "iss", "check_failed");
          if (u2 && i2.sub !== u2) throw new rc('unexpected "sub" claim value', i2, "sub", "check_failed");
          if (d2 && (a3 = i2.aud, n3 = "string" == typeof d2 ? [d2] : d2, "string" == typeof a3 ? !n3.includes(a3) : !(Array.isArray(a3) && n3.some(Set.prototype.has.bind(new Set(a3)))))) throw new rc('unexpected "aud" claim value', i2, "aud", "check_failed");
          switch (typeof r3.clockTolerance) {
            case "string":
              o2 = rU(r3.clockTolerance);
              break;
            case "number":
              o2 = r3.clockTolerance;
              break;
            case "undefined":
              o2 = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          let { currentDate: f2 } = r3, g2 = Math.floor((f2 || /* @__PURE__ */ new Date()).getTime() / 1e3);
          if ((void 0 !== i2.iat || h2) && "number" != typeof i2.iat) throw new rc('"iat" claim must be a number', i2, "iat", "invalid");
          if (void 0 !== i2.nbf) {
            if ("number" != typeof i2.nbf) throw new rc('"nbf" claim must be a number', i2, "nbf", "invalid");
            if (i2.nbf > g2 + o2) throw new rc('"nbf" claim timestamp check failed', i2, "nbf", "check_failed");
          }
          if (void 0 !== i2.exp) {
            if ("number" != typeof i2.exp) throw new rc('"exp" claim must be a number', i2, "exp", "invalid");
            if (i2.exp <= g2 - o2) throw new ru('"exp" claim timestamp check failed', i2, "exp", "check_failed");
          }
          if (h2) {
            let e12 = g2 - i2.iat;
            if (e12 - o2 > ("number" == typeof h2 ? h2 : rU(h2))) throw new ru('"iat" claim timestamp check failed (too far in the past)', i2, "iat", "check_failed");
            if (e12 < 0 - o2) throw new rc('"iat" claim timestamp check failed (it should be in the past)', i2, "iat", "check_failed");
          }
          return i2;
        }(a2.protectedHeader, a2.payload, r2), protectedHeader: a2.protectedHeader };
        return "function" == typeof t10 ? { ...n2, key: a2.key } : n2;
      }
      let rW = process.env.JWT_SECRET || "build-time-fallback-secret-not-for-production-use";
      async function rB(e10) {
        try {
          let t10 = new TextEncoder().encode(rW), { payload: r2 } = await rq(e10, t10);
          if ("admin" === r2.role) return r2;
          return null;
        } catch {
          return null;
        }
      }
      function rF() {
        return "thetaxcalc_admin_session";
      }
      process.env.ADMIN_PASSWORD, process.env.JWT_SECRET || console.warn("\u26A0\uFE0F  JWT_SECRET not set \u2014 using insecure fallback. Set JWT_SECRET in production!");
      let rV = ["/admin"], rK = ["/api/admin", "/api/auth/verify"], rG = ["/api/blog", "/api/ads", "/api/settings", "/api/links"], rz = ["/api/auth/login", "/api/auth/logout", "/api/track"], rX = ["/api/seed"];
      async function rJ(e10) {
        let { pathname: t10 } = e10.nextUrl;
        if (t10.startsWith("/_next") || t10.startsWith("/static") || t10.includes(".")) return el.next();
        if ((e10.headers.get("accept") || "").includes("text/markdown") && !t10.startsWith("/_next") && !t10.startsWith("/api") && !t10.includes(".")) {
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

Visit https://thetaxcalc.com/about for the full page.` }[t10];
          if (e11) return new el(e11, { status: 200, headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
        }
        if ("/self-employment-calculator" === t10) return el.redirect(new URL("/self-employment-tax-calculator", e10.url), 301);
        if ("/tax-calculator" === t10 || "/income-tax-calculator" === t10 || "/yr" === t10) return el.redirect(new URL("/paycheck-calculator", e10.url), 301);
        let r2 = { "/paycheck-tax-calculator": "/paycheck-calculator", "/salary-calculator": "/paycheck-calculator", "/take-home-pay-calculator": "/paycheck-calculator", "/net-pay-calculator": "/paycheck-calculator", "/after-tax-calculator": "/paycheck-calculator", "/wage-calculator": "/paycheck-calculator", "/hourly-calculator": "/paycheck-calculator", "/w4-calculator": "/irs-withholding-calculator", "/withholding-calculator": "/irs-withholding-calculator", "/tax-estimate-calculator": "/tax-refund-calculator", "/tax-return-calculator": "/tax-refund-calculator", "/state-tax-calculator": "/paycheck-calculator", "/federal-tax-calculator": "/paycheck-calculator", "/compare/california-vs-texas": "/compare/texas-vs-california", "/compare/florida-vs-texas": "/compare/texas-vs-florida", "/compare/new-york-vs-texas": "/compare/texas-vs-new-york", "/compare/new-york-vs-florida": "/compare/florida-vs-new-york", "/compare/new-york-vs-california": "/compare/california-vs-new-york", "/compare/texas-vs-illinois": "/compare/illinois-vs-texas", "/compare/florida-vs-illinois": "/compare/illinois-vs-florida", "/compare/california-vs-illinois": "/compare/illinois-vs-california", "/compare/new-york-vs-illinois": "/compare/illinois-vs-new-york", "/ss-calculator": "/paycheck-calculator", "/medicare-calculator": "/paycheck-calculator", "/fica-calculator": "/paycheck-calculator", "/social-security-calculator": "/paycheck-calculator", "/ira-calculator": "/401k-retirement-calculator", "/roth-ira-calculator": "/401k-retirement-calculator", "/hsa-calculator": "/401k-retirement-calculator", "/fsa-calculator": "/401k-retirement-calculator", "/401k-calculator": "/401k-retirement-calculator", "/401-calculator": "/401k-retirement-calculator", "/retirement-calculator": "/401k-retirement-calculator", "/pension-calculator": "/401k-retirement-calculator", "/annuity-calculator": "/401k-retirement-calculator", "/w-4-calculator": "/irs-withholding-calculator", "/irs-calculator": "/irs-withholding-calculator", "/amortization-calculator": "/mortgage-calculator", "/loan-calculator": "/mortgage-calculator", "/interest-calculator": "/mortgage-calculator", "/calculators": "/paycheck-calculator", "/tools": "/paycheck-calculator", "/faq": "/glossary", "/help": "/glossary", "/support": "/about", "/sitemap": "/sitemap.xml", "/feed": "/feed.xml", "/rss": "/feed.xml" };
        if (r2[t10]) return el.redirect(new URL(r2[t10], e10.url), 301);
        let a2 = t10.match(/^\/([a-z-]+?)-(income-tax|tax-rate|paycheck|tax)$/);
        if (a2) {
          let t11 = a2[1];
          if (["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new-hampshire", "new-jersey", "new-mexico", "new-york", "north-carolina", "north-dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode-island", "south-carolina", "south-dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west-virginia", "wisconsin", "wyoming"].includes(t11)) return el.redirect(new URL(`/${t11}-tax-calculator`, e10.url), 301);
        }
        let n2 = { "/blog/tax-brackets-2026": "/blog/2026-federal-tax-brackets-explained", "/blog/tax-refund-calculator": "/blog/tax-refund-questions-2026", "/blog/income-tax-guide": "/blog/how-much-tax-will-i-owe-2026", "/blog/state-tax-comparison": "/blog/florida-vs-texas-tax-comparison", "/blog/tax-tips": "/blog/2026-federal-tax-brackets-explained" };
        if (n2[t10]) return el.redirect(new URL(n2[t10], e10.url), 301);
        let i2 = e10.nextUrl.searchParams;
        if (i2.has("q") && i2.get("q")?.includes("{search_term_string}")) return el.redirect(new URL(t10, e10.url), 301);
        let o2 = e10.headers.get("user-agent") || "";
        if (/googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|telegrambot|whatsapp|applebot/i.test(o2) && ["/property-tax-calculator", "/sales-tax-calculator", "/paycheck-calculator", "/illinois-tax-calculator", "/texas-tax-calculator", "/florida-tax-calculator", "/california-tax-calculator", "/new-york-tax-calculator", "/georgia-tax-calculator", "/virginia-tax-calculator", "/north-carolina-tax-calculator", "/pennsylvania-tax-calculator", "/ohio-tax-calculator", "/michigan-tax-calculator", "/new-jersey-tax-calculator", "/colorado-tax-calculator", "/arizona-tax-calculator", "/washington-tax-calculator", "/massachusetts-tax-calculator", "/indiana-tax-calculator", "/tennessee-tax-calculator", "/missouri-tax-calculator", "/maryland-tax-calculator", "/wisconsin-tax-calculator", "/minnesota-tax-calculator", "/oregon-tax-calculator"].includes(t10) && i2.toString().length > 0) return el.redirect(new URL(t10, e10.url), 301);
        let s2 = { "/blog/retirement-tax-planning": "/blog/retirement-tax-planning-guide-2026", "/blog/401k-withdrawal": "/blog/401k-withdrawal-tax-guide-2026", "/blog/inheritance-tax": "/blog/inheritance-tax-guide-2026", "/blog/social-security-tax": "/blog/social-security-tax-questions-2026", "/blog/tax-questions": "/blog/tax-questions-answered-2026", "/blog/tax-refund-questions": "/blog/tax-refund-questions-2026", "/blog/federal-tax-brackets": "/blog/2026-federal-tax-brackets-explained", "/blog/sales-tax-guide": "/blog/sales-tax-by-state-guide-2026", "/blog/property-tax-guide": "/blog/property-tax-by-state-guide-2026", "/blog/lottery-tax": "/blog/lottery-tax-guide-2026", "/blog/self-employment-tax": "/blog/1099-tax-guide-self-employed-2026", "/blog/doordash-taxes": "/blog/doordash-taxes-guide-2026", "/blog/1099-tax": "/blog/1099-tax-guide-self-employed-2026", "/blog/w4-guide": "/blog/irs-withholding-w4-guide-2026", "/blog/overtime-tax": "/blog/no-tax-on-overtime-guide-2026", "/blog/bonus-tax": "/blog/how-bonuses-are-taxed-2026", "/blog/irs-withholding": "/blog/irs-withholding-w4-guide-2026", "/blog/how-fica-taxes": "/blog/how-fica-taxes-work-2026", "/blog/how-bonuses": "/blog/how-bonuses-are-taxed-2026", "/blog/no-tax-overtime": "/blog/no-tax-on-overtime-guide-2026", "/blog/sep-ira": "/blog/sep-ira-solo-401k-guide-2026", "/blog/why-texas": "/blog/why-texas-has-no-income-tax", "/blog/florida-vs-texas": "/blog/florida-vs-texas-tax-comparison", "/blog/illinois-income": "/blog/illinois-income-tax-guide-2026", "/blog/california-tax": "/blog/california-tax-guide-2026", "/blog/texas-tax": "/blog/texas-tax-guide-2026", "/blog/new-york-tax": "/blog/new-york-tax-guide-2026", "/blog/washington-tax": "/blog/washington-tax-guide-2026" };
        if (s2[t10]) return el.redirect(new URL(s2[t10], e10.url), 301);
        let l2 = { "/tax": "/paycheck-calculator", "/taxes": "/paycheck-calculator", "/paycheck": "/paycheck-calculator", "/income-tax": "/paycheck-calculator", "/state-tax": "/paycheck-calculator", "/refund-calculator": "/tax-refund-calculator", "/mortgage": "/mortgage-calculator", "/401k": "/401k-retirement-calculator", "/retirement": "/401k-retirement-calculator", "/capital-gains": "/capital-gains-calculator", "/self-employment": "/self-employment-tax-calculator", "/sales-tax": "/sales-tax-calculator", "/property-tax": "/property-tax-calculator", "/bonus-calculator": "/bonus-tax-calculator", "/overtime": "/overtime-tax-calculator", "/lottery": "/lottery-tax-calculator", "/relocation": "/relocation-calculator", "/withholding": "/irs-withholding-calculator", "/w4": "/irs-withholding-calculator", "/irs": "/irs-withholding-calculator", "/federal-tax": "/federal-tax-brackets", "/tax-estimate": "/tax-refund-calculator" };
        if (l2[t10]) return el.redirect(new URL(l2[t10], e10.url), 301);
        let c2 = t10.match(/^\/salary\/(\d+)$/);
        if (c2) return el.redirect(new URL(`/salary/${c2[1]}-after-taxes`, e10.url), 301);
        if (["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new-hampshire", "new-jersey", "new-mexico", "new-york", "north-carolina", "north-dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode-island", "south-carolina", "south-dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west-virginia", "wisconsin", "wyoming"].includes(t10.slice(1))) return el.redirect(new URL(`${t10}-tax-calculator`, e10.url), 301);
        if ("/contact" === t10 || "/contact-us" === t10) return el.redirect(new URL("/about", e10.url), 301);
        let u2 = "1" === e10.nextUrl.searchParams.get("embed"), d2 = el.next();
        d2.headers.set("X-Content-Type-Options", "nosniff"), u2 ? d2.headers.set("X-Frame-Options", "ALLOWALL") : d2.headers.set("X-Frame-Options", "DENY"), d2.headers.set("Referrer-Policy", "strict-origin-when-cross-origin"), d2.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()"), d2.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
        let h2 = "https://*.googletagmanager.com https://*.google-analytics.com https://www.google.com https://www.gstatic.com https://ssl.gstatic.com https://tagmanager.google.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://analytics.ahrefs.com", p2 = "https://fonts.googleapis.com https://tagmanager.google.com https://googletagmanager.com";
        if (d2.headers.set("Content-Security-Policy", `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' ${h2}; script-src-elem 'self' 'unsafe-inline' ${h2}; script-src-attr 'self' 'unsafe-inline' ${h2}; style-src 'self' 'unsafe-inline' ${p2}; style-src-elem 'self' 'unsafe-inline' ${p2}; img-src 'self' data: https://*.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net https://*.google.com https://www.gstatic.com https://ssl.gstatic.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googleadservices.com https://analytics.ahrefs.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://stats.g.doubleclick.net https://analytics.ahrefs.com; frame-src https://www.googletagmanager.com https://*.g.doubleclick.net https://td.doubleclick.net https://googleads.g.doubleclick.net; worker-src 'self' blob:; child-src 'self' https://www.googletagmanager.com; ${u2 ? "frame-ancestors *" : "frame-ancestors 'none'"}; base-uri 'self'; form-action 'self';`), d2.headers.set("Content-Signal", "ai-train=yes, search=yes, ai-input=yes"), i2.has("q") && !i2.get("q")?.includes("{search_term_string}") && d2.headers.set("X-Robots-Tag", "noindex, follow"), d2.headers.set("Link", '</.well-known/api-catalog>; rel="service-doc", </.well-known/agent-skills/index.json>; rel="service-doc", </.well-known/mcp/server-card.json>; rel="service-doc", </.well-known/oauth-authorization-server>; rel="service-doc", </.well-known/oauth-protected-resource>; rel="service-doc", </.well-known/openid-configuration>; rel="service-doc", </llms.txt>; rel="service-doc", </auth.md>; rel="service-doc", </sitemap.xml>; rel="service-doc"'), t10.startsWith("/_next") || t10.startsWith("/api") || t10.startsWith("/admin") || t10.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt|css|js|woff2?|ttf|eot)$/) || (d2.headers.delete("Cache-Control"), d2.headers.set("Cache-Control", "public, max-age=3600, s-maxage=2592000, stale-while-revalidate=31536000")), rz.some((e11) => t10.startsWith(e11))) return d2;
        let f2 = rV.some((e11) => t10.startsWith(e11)), g2 = rK.some((e11) => t10.startsWith(e11)), m2 = rG.some((e11) => t10.startsWith(e11)), b2 = ["POST", "PUT", "DELETE", "PATCH"].includes(e10.method), v2 = rX.some((e11) => t10.startsWith(e11));
        if (!(f2 || g2 || m2 && b2 || v2)) return d2;
        let y2 = e10.cookies.get(rF())?.value;
        if (!y2) return t10.startsWith("/api/") ? el.json({ error: "Authentication required" }, { status: 401 }) : d2;
        if (!await rB(y2)) {
          if (t10.startsWith("/api/")) {
            let e11 = el.json({ error: "Invalid or expired session" }, { status: 401 });
            return e11.cookies.set(rF(), "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 }), e11;
          }
          d2.cookies.set(rF(), "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
        }
        return d2;
      }
      e.s(["config", 0, { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)"] }, "middleware", 0, rJ, "runtime", 0, "experimental-edge"], 96592);
      let rY = { ...e.i(96592) }, rQ = "/middleware", rZ = rY.middleware || rY.default;
      if ("function" != typeof rZ) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${rQ}" must export a function named \`middleware\` or a default function.`);
      let r0 = (e10) => tE({ ...e10, IncrementalCache: ra, incrementalCacheHandler: null, page: rQ, handler: async (...e11) => {
        try {
          return await rZ(...e11);
        } catch (n2) {
          let t10 = e11[0], r2 = new URL(t10.url), a2 = r2.pathname + r2.search;
          throw await l(n2, { path: a2, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), n2;
        }
      } });
      async function r1(e10, t10) {
        let r2 = await r0({ request: { url: e10.url, method: e10.method, headers: _(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: rQ }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r2.waitUntil), r2.response;
      }
      e.s(["default", 0, r0, "handler", 0, r1], 58217);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0bjtjym = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js", { otherChunks: ["chunks/[root-of-the-server]__1osrt2u._.js", "chunks/node_modules_next_dist_0o2-izl._.js"], runtimeModuleIds: [35825] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = ["NEXT_DEPLOYMENT_ID", "NEXT_CLIENT_ASSET_SUFFIX"];
      var r, n = ((r = n || {})[r.Runtime = 0] = "Runtime", r[r.Parent = 1] = "Parent", r[r.Update = 2] = "Update", r);
      let o = /* @__PURE__ */ new WeakMap();
      function u(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let l = u.prototype, i = Object.prototype.hasOwnProperty, a = "u" > typeof Symbol && Symbol.toStringTag;
      function s(e2, t2, r2) {
        i.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function c(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = f(t2), e2[t2] = r2), r2;
      }
      function f(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function d(e2, t2) {
        s(e2, "__esModule", { value: true }), a && s(e2, a, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) s(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? s(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : s(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      function h(e2, t2) {
        (null != t2 ? c(this.c, t2) : this.m).exports = e2;
      }
      l.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = c(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, d(n2, e2);
      }, l.j = function(e2, t2) {
        var r2, n2;
        let u2, l2, a2;
        null != t2 ? l2 = (u2 = c(this.c, t2)).exports : (u2 = this.m, l2 = this.e);
        let s2 = (r2 = u2, n2 = l2, (a2 = o.get(r2)) || (o.set(r2, a2 = []), r2.exports = r2.namespaceObject = new Proxy(n2, { get(e3, t3) {
          if (i.call(e3, t3) || "default" === t3 || "__esModule" === t3) return Reflect.get(e3, t3);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t3);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t3 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t3.includes(r3) || t3.push(r3);
          return t3;
        } })), a2);
        "object" == typeof e2 && null !== e2 && s2.push(e2);
      }, l.v = h, l.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? c(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let p = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, m = [null, p({}), p([]), p(p)];
      function b(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !m.includes(t3); t3 = p(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), d(t2, n2), t2;
      }
      function y(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function g(e2) {
        let t2 = K(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = b(r2, y(r2), r2 && r2.__esModule);
      }
      function w(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function O(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function _() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      l.i = g, l.A = function(e2) {
        return this.r(e2)(g.bind(this));
      }, l.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, l.r = function(e2) {
        return K(e2, this.m).exports;
      }, l.f = function(e2) {
        function t2(t3) {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let k = Symbol("turbopack queues"), j = Symbol("turbopack exports"), C = Symbol("turbopack error");
      function P(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      l.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = _(), a2 = Object.assign(i2, { [j]: r2.exports, [k]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), a2.catch(() => {
          });
        } }), s2 = { get: () => a2, set(e3) {
          e3 !== a2 && (a2[j] = e3);
        } };
        Object.defineProperty(r2, "exports", s2), Object.defineProperty(r2, "namespaceObject", s2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (k in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [j]: {}, [k]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[j] = e5, P(t4);
                }, (e5) => {
                  r4[C] = e5, P(t4);
                }), r4;
              }
            }
            return { [j]: e4, [k]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[C]) throw e4[C];
            return e4[j];
          }), { promise: u3, resolve: l3 } = _(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function a3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[k](a3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(a2[C] = e3) : u2(a2[j]), P(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let v = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function E(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      v.prototype = URL.prototype, l.U = v, l.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, l.g = globalThis;
      let U = u.prototype, R = /* @__PURE__ */ new Map();
      l.M = R;
      let x = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map();
      async function $(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return A(e2, t2, q(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!R.has(e3) || x.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => M.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) M.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = A(e2, t2, q(n3));
            M.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = A(e2, t2, q(r2.path)), l2)) M.has(o3) || M.set(o3, n2);
        }
        for (let e3 of o2) x.has(e3) || x.set(e3, n2);
        await n2;
      }
      U.l = function(e2) {
        return $(n.Parent, this.m.id, e2);
      };
      let T = Promise.resolve(void 0), S = /* @__PURE__ */ new WeakMap();
      function A(t2, r2, o2) {
        let u2 = e.loadChunkCached(t2, o2), l2 = S.get(u2);
        if (void 0 === l2) {
          let e2 = S.set.bind(S, u2, T);
          l2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case n.Runtime:
                u3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case n.Parent:
                u3 = `from module ${r2}`;
                break;
              case n.Update:
                u3 = "from an HMR update";
                break;
              default:
                E(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let l3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw l3.name = "ChunkLoadError", l3;
          }), S.set(u2, l2);
        }
        return l2;
      }
      function q(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      U.L = function(e2) {
        return A(n.Parent, this.m.id, e2);
      }, U.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, U.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, U.q = function(e2, t2) {
        h.call(this, `${e2}`, t2);
      }, U.b = function(e2, r2, n2, o2) {
        let u2 = "SharedWorker" === e2.name, l2 = [n2.map((e3) => q(e3)).reverse(), ""];
        for (let e3 of t) l2.push(globalThis[e3]);
        let i2 = new URL(q(r2), location.origin), a2 = JSON.stringify(l2);
        return u2 ? i2.searchParams.set("params", a2) : i2.hash = "#params=" + encodeURIComponent(a2), new e2(i2, o2 ? { ...o2, type: void 0 } : void 0);
      };
      let N = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      l.w = function(t2, r2, o2) {
        return e.loadWebAssembly(n.Parent, this.m.id, t2, r2, o2);
      }, l.u = function(t2, r2) {
        return e.loadWebAssemblyModule(n.Parent, this.m.id, t2, r2);
      };
      let I = {};
      l.c = I;
      let K = (e2, t2) => {
        let r2 = I[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return L(e2, n.Parent, t2.id);
      };
      function L(e2, t2, r2) {
        let n2 = R.get(e2);
        if ("function" != typeof n2) throw Error(function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              E(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, r2));
        let o2 = f(e2), l2 = o2.exports;
        I[e2] = o2;
        let i2 = new u(o2, l2);
        try {
          n2(i2, o2, l2);
        } catch (e3) {
          throw o2.error = e3, e3;
        }
        return o2.namespaceObject && o2.exports !== o2.namespaceObject && b(o2.exports, o2.namespaceObject), o2;
      }
      function W(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let l2 = n3 ?? u2, i2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (i2 || (l2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), i2 = true), t3.set(r4, l2));
            }
            r3 = o2 + 1;
          }
        }(t2, R)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : b(n2, y(n2), true);
      }
      l.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? b(t2.default, y(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), l.x = B, e = { registerChunk(e2, t2) {
        let r2 = function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(e2);
        F.add(r2), function(e3) {
          let t3 = D.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && X(r3.runtimeModuleIds, r3.chunkPath);
            D.delete(e3);
          }
        }(r2), null != t2 && (0 === t2.otherChunks.length ? X(t2.runtimeModuleIds, r2) : function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = O(e4);
            if (F.has(t4)) continue;
            n2.add(t4);
            let r4 = D.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), D.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && X(o2.runtimeModuleIds, o2.chunkPath);
        }(r2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = O(e3), N.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await z(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => z(r2, n2) };
      let F = /* @__PURE__ */ new Set(), D = /* @__PURE__ */ new Map();
      function X(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = I[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          L(t3, n.Runtime, e3);
        }(t2, r2);
      }
      async function z(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let H = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: W }, H.forEach(W);
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
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_root_of_the_server_1osrt2u();
    require_node_modules_next_dist_0o2_izl();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_0bjtjym();
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
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": true }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": true, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": false, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/home/z/my-project", "allowedDevOrigins": ["http://127.0.0.1:3000", "http://localhost:3000", "http://0.0.0.0:3000", "http://21.0.11.18:3000", "http://21.0.12.240:3000", "http://21.0.14.80:3000", "http://21.0.16.80:3000", "http://localhost:81", "http://127.0.0.1:81"], "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "appNewScrollHandler": false, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "partialFallbacks": false, "dynamicOnHover": false, "varyParams": false, "prefetchInlining": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 1, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": false, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "/home/z/my-project" }, "distDirRoot": ".next" };
var BuildId = "CoYzXiyUkcJG_1nbCXYOa";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/settings", "regex": "^/admin/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/settings(?:/)?$" }, { "page": "/api", "regex": "^/api(?:/)?$", "routeKeys": {}, "namedRegex": "^/api(?:/)?$" }, { "page": "/api/admin/db-status", "regex": "^/api/admin/db\\-status(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/db\\-status(?:/)?$" }, { "page": "/api/admin/seed-db", "regex": "^/api/admin/seed\\-db(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/seed\\-db(?:/)?$" }, { "page": "/api/admin/stats", "regex": "^/api/admin/stats(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/stats(?:/)?$" }, { "page": "/api/ads", "regex": "^/api/ads(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/ads(?:/)?$" }, { "page": "/api/auth/login", "regex": "^/api/auth/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/login(?:/)?$" }, { "page": "/api/auth/logout", "regex": "^/api/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/logout(?:/)?$" }, { "page": "/api/auth/verify", "regex": "^/api/auth/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/verify(?:/)?$" }, { "page": "/api/blog", "regex": "^/api/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/blog(?:/)?$" }, { "page": "/api/indexnow", "regex": "^/api/indexnow(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/indexnow(?:/)?$" }, { "page": "/api/links", "regex": "^/api/links(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/links(?:/)?$" }, { "page": "/api/ping-search-engines", "regex": "^/api/ping\\-search\\-engines(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/ping\\-search\\-engines(?:/)?$" }, { "page": "/api/seed", "regex": "^/api/seed(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/seed(?:/)?$" }, { "page": "/api/settings", "regex": "^/api/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/settings(?:/)?$" }, { "page": "/api/track", "regex": "^/api/track(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/track(?:/)?$" }, { "page": "/apple-icon", "regex": "^/apple\\-icon(?:/)?$", "routeKeys": {}, "namedRegex": "^/apple\\-icon(?:/)?$" }, { "page": "/blog", "regex": "^/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/blog(?:/)?$" }, { "page": "/compare", "regex": "^/compare(?:/)?$", "routeKeys": {}, "namedRegex": "^/compare(?:/)?$" }, { "page": "/embed", "regex": "^/embed(?:/)?$", "routeKeys": {}, "namedRegex": "^/embed(?:/)?$" }, { "page": "/federal-tax-brackets", "regex": "^/federal\\-tax\\-brackets(?:/)?$", "routeKeys": {}, "namedRegex": "^/federal\\-tax\\-brackets(?:/)?$" }, { "page": "/feed.xml", "regex": "^/feed\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/feed\\.xml(?:/)?$" }, { "page": "/freefile-irs", "regex": "^/freefile\\-irs(?:/)?$", "routeKeys": {}, "namedRegex": "^/freefile\\-irs(?:/)?$" }, { "page": "/glossary", "regex": "^/glossary(?:/)?$", "routeKeys": {}, "namedRegex": "^/glossary(?:/)?$" }, { "page": "/home-sale-tax-calculator", "regex": "^/home\\-sale\\-tax\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/home\\-sale\\-tax\\-calculator(?:/)?$" }, { "page": "/icon", "regex": "^/icon(?:/)?$", "routeKeys": {}, "namedRegex": "^/icon(?:/)?$" }, { "page": "/job-offer-comparison-calculator", "regex": "^/job\\-offer\\-comparison\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/job\\-offer\\-comparison\\-calculator(?:/)?$" }, { "page": "/methodology", "regex": "^/methodology(?:/)?$", "routeKeys": {}, "namedRegex": "^/methodology(?:/)?$" }, { "page": "/mortgage-calculator", "regex": "^/mortgage\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/mortgage\\-calculator(?:/)?$" }, { "page": "/obbba-tax-calculator", "regex": "^/obbba\\-tax\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/obbba\\-tax\\-calculator(?:/)?$" }, { "page": "/opengraph-image", "regex": "^/opengraph\\-image(?:/)?$", "routeKeys": {}, "namedRegex": "^/opengraph\\-image(?:/)?$" }, { "page": "/paycheck-difference-calculator", "regex": "^/paycheck\\-difference\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/paycheck\\-difference\\-calculator(?:/)?$" }, { "page": "/privacy", "regex": "^/privacy(?:/)?$", "routeKeys": {}, "namedRegex": "^/privacy(?:/)?$" }, { "page": "/research", "regex": "^/research(?:/)?$", "routeKeys": {}, "namedRegex": "^/research(?:/)?$" }, { "page": "/research/2026-state-tax-burden", "regex": "^/research/2026\\-state\\-tax\\-burden(?:/)?$", "routeKeys": {}, "namedRegex": "^/research/2026\\-state\\-tax\\-burden(?:/)?$" }, { "page": "/research/best-states-for-remote-workers-2026", "regex": "^/research/best\\-states\\-for\\-remote\\-workers\\-2026(?:/)?$", "routeKeys": {}, "namedRegex": "^/research/best\\-states\\-for\\-remote\\-workers\\-2026(?:/)?$" }, { "page": "/research/child-tax-credit-guide-2026", "regex": "^/research/child\\-tax\\-credit\\-guide\\-2026(?:/)?$", "routeKeys": {}, "namedRegex": "^/research/child\\-tax\\-credit\\-guide\\-2026(?:/)?$" }, { "page": "/research/property-tax-by-state-2026", "regex": "^/research/property\\-tax\\-by\\-state\\-2026(?:/)?$", "routeKeys": {}, "namedRegex": "^/research/property\\-tax\\-by\\-state\\-2026(?:/)?$" }, { "page": "/research/salary-needed-to-live-comfortably-2026", "regex": "^/research/salary\\-needed\\-to\\-live\\-comfortably\\-2026(?:/)?$", "routeKeys": {}, "namedRegex": "^/research/salary\\-needed\\-to\\-live\\-comfortably\\-2026(?:/)?$" }, { "page": "/research/tax-refund-statistics-2026", "regex": "^/research/tax\\-refund\\-statistics\\-2026(?:/)?$", "routeKeys": {}, "namedRegex": "^/research/tax\\-refund\\-statistics\\-2026(?:/)?$" }, { "page": "/resources", "regex": "^/resources(?:/)?$", "routeKeys": {}, "namedRegex": "^/resources(?:/)?$" }, { "page": "/salary", "regex": "^/salary(?:/)?$", "routeKeys": {}, "namedRegex": "^/salary(?:/)?$" }, { "page": "/salary-comparison-calculator", "regex": "^/salary\\-comparison\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/salary\\-comparison\\-calculator(?:/)?$" }, { "page": "/sales-tax-calculator", "regex": "^/sales\\-tax\\-calculator(?:/)?$", "routeKeys": {}, "namedRegex": "^/sales\\-tax\\-calculator(?:/)?$" }, { "page": "/scholarship", "regex": "^/scholarship(?:/)?$", "routeKeys": {}, "namedRegex": "^/scholarship(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }, { "page": "/smartasset-alternative", "regex": "^/smartasset\\-alternative(?:/)?$", "routeKeys": {}, "namedRegex": "^/smartasset\\-alternative(?:/)?$" }, { "page": "/tax-data", "regex": "^/tax\\-data(?:/)?$", "routeKeys": {}, "namedRegex": "^/tax\\-data(?:/)?$" }, { "page": "/tax-professionals", "regex": "^/tax\\-professionals(?:/)?$", "routeKeys": {}, "namedRegex": "^/tax\\-professionals(?:/)?$" }, { "page": "/terms", "regex": "^/terms(?:/)?$", "routeKeys": {}, "namedRegex": "^/terms(?:/)?$" }, { "page": "/widgets", "regex": "^/widgets(?:/)?$", "routeKeys": {}, "namedRegex": "^/widgets(?:/)?$" }], "dynamic": [{ "page": "/api/ads/[id]", "regex": "^/api/ads/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/ads/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/blog/[slug]", "regex": "^/api/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/api/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/api/links/[id]", "regex": "^/api/links/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/links/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/blog/[slug]", "regex": "^/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/compare/[states]", "regex": "^/compare/([^/]+?)(?:/)?$", "routeKeys": { "nxtPstates": "nxtPstates" }, "namedRegex": "^/compare/(?<nxtPstates>[^/]+?)(?:/)?$" }, { "page": "/research/[slug]", "regex": "^/research/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/research/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/salary/[amount]", "regex": "^/salary/([^/]+?)(?:/)?$", "routeKeys": { "nxtPamount": "nxtPamount" }, "namedRegex": "^/salary/(?<nxtPamount>[^/]+?)(?:/)?$" }, { "page": "/sales-tax-calculator/[state]", "regex": "^/sales\\-tax\\-calculator/([^/]+?)(?:/)?$", "routeKeys": { "nxtPstate": "nxtPstate" }, "namedRegex": "^/sales\\-tax\\-calculator/(?<nxtPstate>[^/]+?)(?:/)?$" }, { "page": "/[calculator]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPcalculator": "nxtPcalculator" }, "namedRegex": "^/(?<nxtPcalculator>[^/]+?)(?:/)?$" }, { "page": "/[calculator]/opengraph-image", "regex": "^/([^/]+?)/opengraph\\-image(?:/)?$", "routeKeys": { "nxtPcalculator": "nxtPcalculator" }, "namedRegex": "^/(?<nxtPcalculator>[^/]+?)/opengraph\\-image(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/about": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/about", "dataRoute": "/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin", "dataRoute": "/admin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/settings": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/settings", "dataRoute": "/admin/settings.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog", "dataRoute": "/blog.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/compare": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/compare", "dataRoute": "/compare.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/embed": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/embed", "dataRoute": "/embed.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/federal-tax-brackets": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/federal-tax-brackets", "dataRoute": "/federal-tax-brackets.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/freefile-irs": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/freefile-irs", "dataRoute": "/freefile-irs.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/glossary": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/glossary", "dataRoute": "/glossary.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/home-sale-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/home-sale-tax-calculator", "dataRoute": "/home-sale-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/job-offer-comparison-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/job-offer-comparison-calculator", "dataRoute": "/job-offer-comparison-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/methodology": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/methodology", "dataRoute": "/methodology.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/mortgage-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/mortgage-calculator", "dataRoute": "/mortgage-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/obbba-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/obbba-tax-calculator", "dataRoute": "/obbba-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/paycheck-difference-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/paycheck-difference-calculator", "dataRoute": "/paycheck-difference-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/privacy": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/privacy", "dataRoute": "/privacy.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research", "dataRoute": "/research.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/2026-state-tax-burden": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/2026-state-tax-burden", "dataRoute": "/research/2026-state-tax-burden.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/best-states-for-remote-workers-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/best-states-for-remote-workers-2026", "dataRoute": "/research/best-states-for-remote-workers-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/child-tax-credit-guide-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/child-tax-credit-guide-2026", "dataRoute": "/research/child-tax-credit-guide-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/property-tax-by-state-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/property-tax-by-state-2026", "dataRoute": "/research/property-tax-by-state-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/salary-needed-to-live-comfortably-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/salary-needed-to-live-comfortably-2026", "dataRoute": "/research/salary-needed-to-live-comfortably-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/research/tax-refund-statistics-2026": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/research/tax-refund-statistics-2026", "dataRoute": "/research/tax-refund-statistics-2026.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/resources": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/resources", "dataRoute": "/resources.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/salary", "dataRoute": "/salary.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/salary-comparison-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/salary-comparison-calculator", "dataRoute": "/salary-comparison-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sales-tax-calculator": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/sales-tax-calculator", "dataRoute": "/sales-tax-calculator.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/scholarship": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/scholarship", "dataRoute": "/scholarship.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/smartasset-alternative": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/smartasset-alternative", "dataRoute": "/smartasset-alternative.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tax-data": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/tax-data", "dataRoute": "/tax-data.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tax-professionals": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/tax-professionals", "dataRoute": "/tax-professionals.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/terms": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/terms", "dataRoute": "/terms.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/widgets": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/widgets", "dataRoute": "/widgets.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "0889a5af8e03ce5439a47b92c35df3e7", "previewModeSigningKey": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557", "previewModeEncryptionKey": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__1osrt2u._.js", "server/edge/chunks/node_modules_next_dist_0o2-izl._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0bjtjym.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } } }, "sortedMiddleware": ["/"], "functions": { "/[calculator]/opengraph-image/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/[calculator]/opengraph-image/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_[calculator]_opengraph-image_route_actions_0c6wqr7.js", "server/edge/chunks/[root-of-the-server]__1dsapnu._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/src_lib_calculator-routes_ts_0ybvzak._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_04x3tpy.js"], "name": "app/[calculator]/opengraph-image/route", "page": "/[calculator]/opengraph-image/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_04x3tpy.js", "matchers": [{ "regexp": "^/(?P<nxtPcalculator>[^/]+?)/opengraph-image(?:/)?$", "originalSource": "/[calculator]/opengraph-image" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/admin/db-status/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/db-status/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_db-status_route_actions_17arlzc.js", "server/edge/chunks/[root-of-the-server]__0m0q3v6._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_12mwlcy.js"], "name": "app/api/admin/db-status/route", "page": "/api/admin/db-status/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_12mwlcy.js", "matchers": [{ "regexp": "^/api/admin/db-status(?:/)?$", "originalSource": "/api/admin/db-status" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/admin/seed-db/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/seed-db/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_seed-db_route_actions_1fwx_ar.js", "server/edge/chunks/[root-of-the-server]__0fsrtm7._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/src_lib_blog-index_ts_1lo_w91._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_128gijq.js"], "name": "app/api/admin/seed-db/route", "page": "/api/admin/seed-db/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_128gijq.js", "matchers": [{ "regexp": "^/api/admin/seed-db(?:/)?$", "originalSource": "/api/admin/seed-db" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/admin/stats/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/admin/stats/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_admin_stats_route_actions_14lp4om.js", "server/edge/chunks/[root-of-the-server]__1e1v69f._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/src_lib_blog-index_ts_1lo_w91._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0j0pitf.js"], "name": "app/api/admin/stats/route", "page": "/api/admin/stats/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0j0pitf.js", "matchers": [{ "regexp": "^/api/admin/stats(?:/)?$", "originalSource": "/api/admin/stats" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/ads/[id]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/ads/[id]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_ads_[id]_route_actions_1vm4gbc.js", "server/edge/chunks/[root-of-the-server]__02ur15f._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0cqr1v3.js"], "name": "app/api/ads/[id]/route", "page": "/api/ads/[id]/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0cqr1v3.js", "matchers": [{ "regexp": "^/api/ads/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/api/ads/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/ads/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/ads/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_ads_route_actions_1r7u955.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/[root-of-the-server]__1ze3kaq._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_14qhd_0.js"], "name": "app/api/ads/route", "page": "/api/ads/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_14qhd_0.js", "matchers": [{ "regexp": "^/api/ads(?:/)?$", "originalSource": "/api/ads" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/auth/login/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/login/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_login_route_actions_08uv61n.js", "server/edge/chunks/[root-of-the-server]__15xq-dk._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/src_lib_auth_ts_1cf1ckl._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0y51y68.js"], "name": "app/api/auth/login/route", "page": "/api/auth/login/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0y51y68.js", "matchers": [{ "regexp": "^/api/auth/login(?:/)?$", "originalSource": "/api/auth/login" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/auth/logout/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/logout/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_logout_route_actions_06skg_j.js", "server/edge/chunks/[root-of-the-server]__0tt_vgl._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/src_lib_auth_ts_1cf1ckl._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0a12zlj.js"], "name": "app/api/auth/logout/route", "page": "/api/auth/logout/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0a12zlj.js", "matchers": [{ "regexp": "^/api/auth/logout(?:/)?$", "originalSource": "/api/auth/logout" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/auth/verify/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/verify/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_verify_route_actions_0ku1btj.js", "server/edge/chunks/[root-of-the-server]__07xrk4i._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/src_lib_auth_ts_1cf1ckl._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1ykw2nc.js"], "name": "app/api/auth/verify/route", "page": "/api/auth/verify/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1ykw2nc.js", "matchers": [{ "regexp": "^/api/auth/verify(?:/)?$", "originalSource": "/api/auth/verify" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/blog/[slug]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/blog/[slug]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_blog_[slug]_route_actions_1plswzj.js", "server/edge/chunks/[root-of-the-server]__20ve7pj._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/src_lib_blog-index_ts_1lo_w91._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1-s4ypv.js"], "name": "app/api/blog/[slug]/route", "page": "/api/blog/[slug]/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1-s4ypv.js", "matchers": [{ "regexp": "^/api/blog/(?P<nxtPslug>[^/]+?)(?:/)?$", "originalSource": "/api/blog/[slug]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/blog/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/blog/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_blog_route_actions_1gg4822.js", "server/edge/chunks/[root-of-the-server]__1ehtoa7._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/src_lib_blog-index_ts_1lo_w91._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0t3aze0.js"], "name": "app/api/blog/route", "page": "/api/blog/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0t3aze0.js", "matchers": [{ "regexp": "^/api/blog(?:/)?$", "originalSource": "/api/blog" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/indexnow/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/indexnow/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_indexnow_route_actions_1wiaent.js", "server/edge/chunks/[root-of-the-server]__1-hocym._.js", "server/edge/chunks/src_lib_auth_ts_1cf1ckl._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_0nf3bw9.js", "server/edge/chunks/src_lib_calculator-routes_ts_0ybvzak._.js", "server/edge/chunks/src_lib_blog-index_ts_1lo_w91._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1_k-c0g.js"], "name": "app/api/indexnow/route", "page": "/api/indexnow/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1_k-c0g.js", "matchers": [{ "regexp": "^/api/indexnow(?:/)?$", "originalSource": "/api/indexnow" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/links/[id]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/links/[id]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_links_[id]_route_actions_0delomc.js", "server/edge/chunks/[root-of-the-server]__0j23bsp._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1pd4jrs.js"], "name": "app/api/links/[id]/route", "page": "/api/links/[id]/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1pd4jrs.js", "matchers": [{ "regexp": "^/api/links/(?P<nxtPid>[^/]+?)(?:/)?$", "originalSource": "/api/links/[id]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/links/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/links/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_links_route_actions_1mdtn8u.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/[root-of-the-server]__0p_9rf-._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0esu8ar.js"], "name": "app/api/links/route", "page": "/api/links/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0esu8ar.js", "matchers": [{ "regexp": "^/api/links(?:/)?$", "originalSource": "/api/links" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/ping-search-engines/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/ping-search-engines/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_ping-search-engines_route_actions_0kst70z.js", "server/edge/chunks/[root-of-the-server]__1mkjnr3._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/src_lib_auth_ts_1cf1ckl._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1xat0ht.js"], "name": "app/api/ping-search-engines/route", "page": "/api/ping-search-engines/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1xat0ht.js", "matchers": [{ "regexp": "^/api/ping-search-engines(?:/)?$", "originalSource": "/api/ping-search-engines" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_route_actions_211qpq5.js", "server/edge/chunks/[root-of-the-server]__0t37zs2._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0z-keor.js"], "name": "app/api/route", "page": "/api/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0z-keor.js", "matchers": [{ "regexp": "^/api(?:/)?$", "originalSource": "/api" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/seed/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/seed/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_seed_route_actions_0by6jgo.js", "server/edge/chunks/[root-of-the-server]__14vtvf8._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-app-route_0rz4z3g.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0v59uxi.js"], "name": "app/api/seed/route", "page": "/api/seed/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0v59uxi.js", "matchers": [{ "regexp": "^/api/seed(?:/)?$", "originalSource": "/api/seed" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/settings/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/settings/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_settings_route_actions_0bi67u9.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/[root-of-the-server]__1e3gwn7._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1gqmdgh.js"], "name": "app/api/settings/route", "page": "/api/settings/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1gqmdgh.js", "matchers": [{ "regexp": "^/api/settings(?:/)?$", "originalSource": "/api/settings" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/api/track/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/track/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_track_route_actions_1z0bg4v.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/[root-of-the-server]__0v_069r._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0v4xxdw.js"], "name": "app/api/track/route", "page": "/api/track/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_0v4xxdw.js", "matchers": [{ "regexp": "^/api/track(?:/)?$", "originalSource": "/api/track" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/apple-icon/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/apple-icon/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_apple-icon_route_actions_0b5unso.js", "server/edge/chunks/[root-of-the-server]__0i51u7m._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1diyzs_.js"], "name": "app/apple-icon/route", "page": "/apple-icon/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1diyzs_.js", "matchers": [{ "regexp": "^/apple-icon(?:/)?$", "originalSource": "/apple-icon" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/feed.xml/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/feed.xml/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_feed_xml_route_actions_1jnfkzh.js", "server/edge/chunks/[root-of-the-server]__0x9icqj._.js", "server/edge/chunks/src_lib_blog-index_ts_1lo_w91._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/src_lib_calculator-routes_ts_0ybvzak._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_028p8hq.js"], "name": "app/feed.xml/route", "page": "/feed.xml/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_028p8hq.js", "matchers": [{ "regexp": "^/feed\\.xml(?:/)?$", "originalSource": "/feed.xml" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/icon/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/icon/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_icon_route_actions_0wqs5vs.js", "server/edge/chunks/[root-of-the-server]__0hpf_f3._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1yk24fb.js"], "name": "app/icon/route", "page": "/icon/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1yk24fb.js", "matchers": [{ "regexp": "^/icon(?:/)?$", "originalSource": "/icon" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } }, "/opengraph-image/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/opengraph-image/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_opengraph-image_route_actions_0as17aw.js", "server/edge/chunks/[root-of-the-server]__170gq18._.js", "server/edge/chunks/node_modules_next_dist_1c6he51._.js", "server/edge/chunks/node_modules_next_dist_02n0dof._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1c40rtc.js"], "name": "app/opengraph-image/route", "page": "/opengraph-image/route", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1c40rtc.js", "matchers": [{ "regexp": "^/opengraph-image(?:/)?$", "originalSource": "/opengraph-image" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "CoYzXiyUkcJG_1nbCXYOa", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "z458NE2zirCggshBZvMsoC9OC0449K4s7LLNit3TM5M=", "__NEXT_PREVIEW_MODE_ID": "0889a5af8e03ce5439a47b92c35df3e7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "661ee40ed5dda83f2f24922be084779d636b7be6fbd599190dc928d2a5d8492a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "5cfbab90606f69e7c165e5cff9bd7d8eb7d6dc8dd45237fa91af49f4bd8c0557" } } } };
var AppPathRoutesManifest = { "/[calculator]/opengraph-image/route": "/[calculator]/opengraph-image", "/[calculator]/page": "/[calculator]", "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/about/page": "/about", "/admin/page": "/admin", "/admin/settings/page": "/admin/settings", "/api/admin/db-status/route": "/api/admin/db-status", "/api/admin/seed-db/route": "/api/admin/seed-db", "/api/admin/stats/route": "/api/admin/stats", "/api/ads/[id]/route": "/api/ads/[id]", "/api/ads/route": "/api/ads", "/api/auth/login/route": "/api/auth/login", "/api/auth/logout/route": "/api/auth/logout", "/api/auth/verify/route": "/api/auth/verify", "/api/blog/[slug]/route": "/api/blog/[slug]", "/api/blog/route": "/api/blog", "/api/indexnow/route": "/api/indexnow", "/api/links/[id]/route": "/api/links/[id]", "/api/links/route": "/api/links", "/api/ping-search-engines/route": "/api/ping-search-engines", "/api/route": "/api", "/api/seed/route": "/api/seed", "/api/settings/route": "/api/settings", "/api/track/route": "/api/track", "/apple-icon/route": "/apple-icon", "/blog/[slug]/page": "/blog/[slug]", "/blog/page": "/blog", "/compare/[states]/page": "/compare/[states]", "/compare/page": "/compare", "/embed/page": "/embed", "/federal-tax-brackets/page": "/federal-tax-brackets", "/feed.xml/route": "/feed.xml", "/freefile-irs/page": "/freefile-irs", "/glossary/page": "/glossary", "/home-sale-tax-calculator/page": "/home-sale-tax-calculator", "/icon/route": "/icon", "/job-offer-comparison-calculator/page": "/job-offer-comparison-calculator", "/methodology/page": "/methodology", "/mortgage-calculator/page": "/mortgage-calculator", "/obbba-tax-calculator/page": "/obbba-tax-calculator", "/opengraph-image/route": "/opengraph-image", "/page": "/", "/paycheck-difference-calculator/page": "/paycheck-difference-calculator", "/privacy/page": "/privacy", "/research/2026-state-tax-burden/page": "/research/2026-state-tax-burden", "/research/[slug]/page": "/research/[slug]", "/research/best-states-for-remote-workers-2026/page": "/research/best-states-for-remote-workers-2026", "/research/child-tax-credit-guide-2026/page": "/research/child-tax-credit-guide-2026", "/research/page": "/research", "/research/property-tax-by-state-2026/page": "/research/property-tax-by-state-2026", "/research/salary-needed-to-live-comfortably-2026/page": "/research/salary-needed-to-live-comfortably-2026", "/research/tax-refund-statistics-2026/page": "/research/tax-refund-statistics-2026", "/resources/page": "/resources", "/salary-comparison-calculator/page": "/salary-comparison-calculator", "/salary/[amount]/page": "/salary/[amount]", "/salary/page": "/salary", "/sales-tax-calculator/[state]/page": "/sales-tax-calculator/[state]", "/sales-tax-calculator/page": "/sales-tax-calculator", "/scholarship/page": "/scholarship", "/sitemap.xml/route": "/sitemap.xml", "/smartasset-alternative/page": "/smartasset-alternative", "/tax-data/page": "/tax-data", "/tax-professionals/page": "/tax-professionals", "/terms/page": "/terms", "/widgets/page": "/widgets" };
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
  return new ReadableStream3({
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
