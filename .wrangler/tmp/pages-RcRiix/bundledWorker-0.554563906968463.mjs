var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../../../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../../../node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../../../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../../../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../../../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../../../node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../../../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../../../node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js/index.js
var __PRIVATE_PATH_PATTERN__ = /^\/((?:api|admin)(?:\/|$))/;
function __addHeadersToResponse__(response, pathname) {
  try {
    const isPrivate = __PRIVATE_PATH_PATTERN__.test(pathname);
    const is404 = response.status === 404;
    const newHeaders = new Headers(response.headers);
    const exposeHeaders = [
      "X-Robots-Tag",
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Referrer-Policy",
      "Permissions-Policy",
      "Strict-Transport-Security",
      "Content-Security-Policy"
    ].join(", ");
    newHeaders.set("Access-Control-Expose-Headers", exposeHeaders);
    if (isPrivate) {
      newHeaders.set("X-Robots-Tag", "noindex, nofollow");
    } else if (is404) {
      newHeaders.set("X-Robots-Tag", "noindex, follow");
    } else {
      newHeaders.set("X-Robots-Tag", "index, follow");
      newHeaders.set("X-Content-Type-Options", "nosniff");
      newHeaders.set("X-Frame-Options", "SAMEORIGIN");
      newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
      newHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
      newHeaders.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  } catch (err) {
    console.error("Header patch error:", err);
    return response;
  }
}
__name(__addHeadersToResponse__, "__addHeadersToResponse__");
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name((_, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name((_, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name((_, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[/* @__PURE__ */ Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name((_, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name((_, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name((_, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var ne = Object.create;
var U = Object.defineProperty;
var re = Object.getOwnPropertyDescriptor;
var ae = Object.getOwnPropertyNames;
var oe = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var k = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "k");
var V = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var ce = /* @__PURE__ */ __name((e, t, n, s) => {
  if (t && typeof t == "object" || typeof t == "function") for (let a of ae(t)) !ie.call(e, a) && a !== n && U(e, a, { get: /* @__PURE__ */ __name(() => t[a], "get"), enumerable: !(s = re(t, a)) || s.enumerable });
  return e;
}, "ce");
var $ = /* @__PURE__ */ __name((e, t, n) => (n = e != null ? ne(oe(e)) : {}, ce(t || !e || !e.__esModule ? U(n, "default", { value: e, enumerable: true }) : n, e)), "$");
var x;
var l = k(() => {
  x = { collectedLocales: [] };
});
var h;
var d = k(() => {
  h = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/google7bdac16b5ecbdd40\\.html$", headers: { "Content-Type": "text/html" }, continue: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\\\.json)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "2f01a4e3fefc0d73ba5d1c2480f702c3" }], middlewarePath: "middleware", middlewareRawSrc: ["/admin/:path*"], override: true }, { src: "^/(?<path>.+?)(?:/)?$", dest: "/$path.segments/$segmentPath.segment.rsc", has: [{ type: "header", key: "rsc", value: "1" }, { type: "header", key: "next-router-prefetch", value: "1" }, { type: "header", key: "next-router-segment-prefetch", value: "/(?<segmentPath>.+)" }], continue: true, override: true }, { src: "^/?$", dest: "/index.segments/$segmentPath.segment.rsc", has: [{ type: "header", key: "rsc", value: "1" }, { type: "header", key: "next-router-prefetch", value: "1" }, { type: "header", key: "next-router-segment-prefetch", value: "/(?<segmentPath>.+)" }], continue: true, override: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }, { src: "^/(?<path>.+)(?<rscSuffix>\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/$path.rsc", check: true }], rewrite: [{ src: "^/(?<path>.+)(?<rscSuffix>\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/$path.rsc", check: true, override: true }, { src: "^/api/auth/(?<nxtPnextauth>.+?)(?<rscSuffix>\\.rsc|\\.prefetch\\.rsc|\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/api/auth/[...nextauth]$rscSuffix?nxtPnextauth=$nxtPnextauth", check: true, override: true }, { src: "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$", dest: "/api/auth/[...nextauth]?nxtPnextauth=$nxtPnextauth", check: true, override: true }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|focAc_GPgvjuCU7zHWb_w)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404, headers: { "x-next-error-status": "404" } }, { src: "^/.*$", dest: "/500", status: 500, headers: { "x-next-error-status": "500" } }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 32, 48, 64, 96, 128, 256, 384], qualities: [75], remotePatterns: [], localPatterns: [{ pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$", search: "" }], minimumCacheTTL: 14400, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "404.segments/_tree.segment.rsc.json": { path: "404.segments/_tree.segment.rsc", contentType: "application/json" }, "500.rsc.json": { path: "500.rsc", contentType: "application/json" }, "500.segments/_tree.segment.rsc.json": { path: "500.segments/_tree.segment.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { slug: "nextjs", version: "16.1.3" }, crons: [] };
});
var m;
var u = k(() => {
  m = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/404.segments/_tree.segment.rsc.json": { type: "override", path: "/404.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500.rsc.json": { type: "override", path: "/500.rsc.json", headers: { "content-type": "application/json" } }, "/500.segments/_tree.segment.rsc.json": { type: "override", path: "/500.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/chunks/1627bf2f54f2038d.js": { type: "static" }, "/_next/static/chunks/1efb606a980576f4.js": { type: "static" }, "/_next/static/chunks/2f236954d6a65e12.js": { type: "static" }, "/_next/static/chunks/34d933785a17edf3.css": { type: "static" }, "/_next/static/chunks/34ebd86da5e48547.js": { type: "static" }, "/_next/static/chunks/39795fe91cc9cee9.js": { type: "static" }, "/_next/static/chunks/5adbcc7512d434f2.css": { type: "static" }, "/_next/static/chunks/771dedee3f5e1621.js": { type: "static" }, "/_next/static/chunks/897e52d0e6f2d289.js": { type: "static" }, "/_next/static/chunks/a6dad97d9634a72d.js": { type: "static" }, "/_next/static/chunks/a6dad97d9634a72d.js.map": { type: "static" }, "/_next/static/chunks/ea42b0326df0b227.js": { type: "static" }, "/_next/static/chunks/ed1a2589c7d85438.js": { type: "static" }, "/_next/static/chunks/ffdbb59d80247c9e.js": { type: "static" }, "/_next/static/chunks/turbopack-c0b21e607f3b28ad.js": { type: "static" }, "/_next/static/focAc_GPgvjuCU7zHWb_w/_buildManifest.js": { type: "static" }, "/_next/static/focAc_GPgvjuCU7zHWb_w/_clientMiddlewareManifest.json": { type: "static" }, "/_next/static/focAc_GPgvjuCU7zHWb_w/_ssgManifest.js": { type: "static" }, "/_next/static/media/4fa387ec64143e14-s.3b336396.woff2": { type: "static" }, "/_next/static/media/53b9e256198e5412-s.853d50a3.woff2": { type: "static" }, "/_next/static/media/5ce348bf30bf5439-s.56c1f21e.woff2": { type: "static" }, "/_next/static/media/6306c77e7c8268e4-s.e3369375.woff2": { type: "static" }, "/_next/static/media/7178b3e590c64307-s.55554cd0.woff2": { type: "static" }, "/_next/static/media/797e433ab948586e-s.p.29207c2f.woff2": { type: "static" }, "/_next/static/media/7d817b4c03b0c5f1-s.a40b9a8b.woff2": { type: "static" }, "/_next/static/media/8a480f0b521d4e75-s.ea323500.woff2": { type: "static" }, "/_next/static/media/bbc41e54d2fcbd21-s.fe42ddf4.woff2": { type: "static" }, "/_next/static/media/caa3a2e1cccd8315-s.p.3b6cae6d.woff2": { type: "static" }, "/_next/static/media/fef07dbb0973bf53-s.518e079e.woff2": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/google7bdac16b5ecbdd40.html": { type: "static" }, "/logo.svg": { type: "static" }, "/robots.txt": { type: "static" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/404.segments/_tree.segment.rsc": { type: "override", path: "/404.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/500.rsc": { type: "override", path: "/500.rsc.json", headers: { "content-type": "application/json" } }, "/500.segments/_tree.segment.rsc": { type: "override", path: "/500.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/_global-error.html": { type: "override", path: "/_global-error.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_global-error": { type: "override", path: "/_global-error.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_global-error.rsc": { type: "override", path: "/_global-error.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/_global-error.segments/__PAGE__.segment.rsc": { type: "override", path: "/_global-error.segments/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_full.segment.rsc": { type: "override", path: "/_global-error.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_head.segment.rsc": { type: "override", path: "/_global-error.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_index.segment.rsc": { type: "override", path: "/_global-error.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_tree.segment.rsc": { type: "override", path: "/_global-error.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.html": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found.rsc": { type: "override", path: "/_not-found.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/_not-found.segments/_full.segment.rsc": { type: "override", path: "/_not-found.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_head.segment.rsc": { type: "override", path: "/_not-found.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_index.segment.rsc": { type: "override", path: "/_not-found.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_not-found/__PAGE__.segment.rsc": { type: "override", path: "/_not-found.segments/_not-found/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_not-found.segment.rsc": { type: "override", path: "/_not-found.segments/_not-found.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_tree.segment.rsc": { type: "override", path: "/_not-found.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/login.html": { type: "override", path: "/admin/login.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/login": { type: "override", path: "/admin/login.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/login.rsc": { type: "override", path: "/admin/login.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/admin/login.segments/_full.segment.rsc": { type: "override", path: "/admin/login.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/login.segments/_head.segment.rsc": { type: "override", path: "/admin/login.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/login.segments/_index.segment.rsc": { type: "override", path: "/admin/login.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/login.segments/_tree.segment.rsc": { type: "override", path: "/admin/login.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/login.segments/admin/login/__PAGE__.segment.rsc": { type: "override", path: "/admin/login.segments/admin/login/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/login.segments/admin/login.segment.rsc": { type: "override", path: "/admin/login.segments/admin/login.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/login.segments/admin.segment.rsc": { type: "override", path: "/admin/login.segments/admin.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/login/layout,_N_T_/admin/login/page,_N_T_/admin/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.html": { type: "override", path: "/admin/settings.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/settings": { type: "override", path: "/admin/settings.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/settings.rsc": { type: "override", path: "/admin/settings.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/admin/settings.segments/_full.segment.rsc": { type: "override", path: "/admin/settings.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.segments/_head.segment.rsc": { type: "override", path: "/admin/settings.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.segments/_index.segment.rsc": { type: "override", path: "/admin/settings.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.segments/_tree.segment.rsc": { type: "override", path: "/admin/settings.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.segments/admin/settings/__PAGE__.segment.rsc": { type: "override", path: "/admin/settings.segments/admin/settings/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.segments/admin/settings.segment.rsc": { type: "override", path: "/admin/settings.segments/admin/settings.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.segments/admin.segment.rsc": { type: "override", path: "/admin/settings.segments/admin.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/index.html": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/index": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/index.rsc": { type: "override", path: "/index.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/index.segments/__PAGE__.segment.rsc": { type: "override", path: "/index.segments/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/index.segments/_full.segment.rsc": { type: "override", path: "/index.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/index.segments/_head.segment.rsc": { type: "override", path: "/index.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/index.segments/_index.segment.rsc": { type: "override", path: "/index.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/index.segments/_tree.segment.rsc": { type: "override", path: "/index.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, middleware: { type: "middleware", entrypoint: "__next-on-pages-dist__/functions/middleware.func.js" } };
});
var q = V((Ke, F) => {
  "use strict";
  l();
  d();
  u();
  function T(e, t) {
    e = String(e || "").trim();
    let n = e, s, a = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      s = e[0];
      let i = e.lastIndexOf(s);
      a += e.substring(i + 1), e = e.substring(1, i);
    }
    let r = 0;
    return e = ue(e, (i) => {
      if (/^\(\?[P<']/.test(i)) {
        let c = /^\(\?P?[<']([^>']+)[>']/.exec(i);
        if (!c) throw new Error(`Failed to extract named captures from ${JSON.stringify(i)}`);
        let p = i.substring(c[0].length, i.length - 1);
        return t && (t[r] = c[1]), r++, `(${p})`;
      }
      return i.substring(0, 3) === "(?:" || r++, i;
    }), e = e.replace(/\[:([^:]+):\]/g, (i, c) => T.characterClasses[c] || i), new T.PCRE(e, a, n, a, s);
  }
  __name(T, "T");
  function ue(e, t) {
    let n = 0, s = 0, a = false;
    for (let o = 0; o < e.length; o++) {
      let r = e[o];
      if (a) {
        a = false;
        continue;
      }
      switch (r) {
        case "(":
          s === 0 && (n = o), s++;
          break;
        case ")":
          if (s > 0 && (s--, s === 0)) {
            let i = o + 1, c = n === 0 ? "" : e.substring(0, n), p = e.substring(i), _ = String(t(e.substring(n, i)));
            e = c + _ + p, o = n;
          }
          break;
        case "\\":
          a = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(ue, "ue");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      constructor(s, a, o, r, i) {
        super(s, a), this.pcrePattern = o, this.pcreFlags = r, this.delimiter = i;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(T || (T = {}));
  T.prototype = T.PCRE.prototype;
  F.exports = T;
});
var Q = V((H) => {
  "use strict";
  l();
  d();
  u();
  H.parse = we;
  H.serialize = be;
  var ve = Object.prototype.toString, C = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function we(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var n = {}, s = t || {}, a = s.decode || Re, o = 0; o < e.length; ) {
      var r = e.indexOf("=", o);
      if (r === -1) break;
      var i = e.indexOf(";", o);
      if (i === -1) i = e.length;
      else if (i < r) {
        o = e.lastIndexOf(";", r - 1) + 1;
        continue;
      }
      var c = e.slice(o, r).trim();
      if (n[c] === void 0) {
        var p = e.slice(r + 1, i).trim();
        p.charCodeAt(0) === 34 && (p = p.slice(1, -1)), n[c] = Se(p, a);
      }
      o = i + 1;
    }
    return n;
  }
  __name(we, "we");
  function be(e, t, n) {
    var s = n || {}, a = s.encode || Pe;
    if (typeof a != "function") throw new TypeError("option encode is invalid");
    if (!C.test(e)) throw new TypeError("argument name is invalid");
    var o = a(t);
    if (o && !C.test(o)) throw new TypeError("argument val is invalid");
    var r = e + "=" + o;
    if (s.maxAge != null) {
      var i = s.maxAge - 0;
      if (isNaN(i) || !isFinite(i)) throw new TypeError("option maxAge is invalid");
      r += "; Max-Age=" + Math.floor(i);
    }
    if (s.domain) {
      if (!C.test(s.domain)) throw new TypeError("option domain is invalid");
      r += "; Domain=" + s.domain;
    }
    if (s.path) {
      if (!C.test(s.path)) throw new TypeError("option path is invalid");
      r += "; Path=" + s.path;
    }
    if (s.expires) {
      var c = s.expires;
      if (!je(c) || isNaN(c.valueOf())) throw new TypeError("option expires is invalid");
      r += "; Expires=" + c.toUTCString();
    }
    if (s.httpOnly && (r += "; HttpOnly"), s.secure && (r += "; Secure"), s.priority) {
      var p = typeof s.priority == "string" ? s.priority.toLowerCase() : s.priority;
      switch (p) {
        case "low":
          r += "; Priority=Low";
          break;
        case "medium":
          r += "; Priority=Medium";
          break;
        case "high":
          r += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (s.sameSite) {
      var _ = typeof s.sameSite == "string" ? s.sameSite.toLowerCase() : s.sameSite;
      switch (_) {
        case true:
          r += "; SameSite=Strict";
          break;
        case "lax":
          r += "; SameSite=Lax";
          break;
        case "strict":
          r += "; SameSite=Strict";
          break;
        case "none":
          r += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return r;
  }
  __name(be, "be");
  function Re(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(Re, "Re");
  function Pe(e) {
    return encodeURIComponent(e);
  }
  __name(Pe, "Pe");
  function je(e) {
    return ve.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(je, "je");
  function Se(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(Se, "Se");
});
l();
d();
u();
l();
d();
u();
l();
d();
u();
var v = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
l();
d();
u();
l();
d();
u();
l();
d();
u();
l();
d();
u();
var D = $(q());
function P(e, t, n) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let s = n ? "" : "i", a = [];
  return { match: (0, D.default)(`%${e}%${s}`, a).exec(t), captureGroupKeys: a };
}
__name(P, "P");
function w(e, t, n, { namedOnly: s } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (a, o) => {
    let r = n.indexOf(o);
    return s && r === -1 ? a : (r === -1 ? t[parseInt(o, 10)] : t[r + 1]) || "";
  });
}
__name(w, "w");
function A(e, { url: t, cookies: n, headers: s, routeDest: a }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? M(e.value, s.get(e.key), a) : { valid: s.has(e.key) };
    case "cookie": {
      let o = n[e.key];
      return o && e.value !== void 0 ? M(e.value, o, a) : { valid: o !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? M(e.value, t.searchParams.get(e.key), a) : { valid: t.searchParams.has(e.key) };
  }
}
__name(A, "A");
function M(e, t, n) {
  let { match: s, captureGroupKeys: a } = P(e, t);
  return n && s && a.length ? { valid: !!s, newRouteDest: w(n, s, a, { namedOnly: true }) } : { valid: !!s };
}
__name(M, "M");
l();
d();
u();
function G(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", v), new Request(e, { headers: t });
}
__name(G, "G");
l();
d();
u();
function f(e, t, n) {
  let s = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [a, o] of s) {
    let r = a.toLowerCase(), i = n?.match ? w(o, n.match, n.captureGroupKeys) : o;
    r === "set-cookie" ? e.append(r, i) : e.set(r, i);
  }
}
__name(f, "f");
function b(e) {
  return /^https?:\/\//.test(e);
}
__name(b, "b");
function y(e, t) {
  for (let [n, s] of t.entries()) {
    let a = /^nxtP(.+)$/.exec(n), o = /^nxtI(.+)$/.exec(n);
    a?.[1] ? (e.set(n, s), e.set(a[1], s)) : o?.[1] ? e.set(o[1], s.replace(/(\(\.+\))+/, "")) : (!e.has(n) || !!s && !e.getAll(n).includes(s)) && e.append(n, s);
  }
}
__name(y, "y");
function I(e, t) {
  let n = new URL(t, e.url);
  return y(n.searchParams, new URL(e.url).searchParams), n.pathname = n.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(n, e);
}
__name(I, "I");
function R(e) {
  return new Response(e.body, e);
}
__name(R, "R");
function L(e) {
  return e.split(",").map((t) => {
    let [n, s] = t.split(";"), a = parseFloat((s ?? "q=1").replace(/q *= */gi, ""));
    return [n.trim(), isNaN(a) ? 1 : a];
  }).sort((t, n) => n[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(L, "L");
l();
d();
u();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
async function j(e, { request: t, assetsFetcher: n, ctx: s }, { path: a, searchParams: o }) {
  let r, i = new URL(t.url);
  y(i.searchParams, o);
  let c = new Request(i, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let p = await import(e.entrypoint);
        try {
          r = await p.default(c, s);
        } catch (_) {
          let g = _;
          throw g.name === "TypeError" && g.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : _;
        }
        break;
      }
      case "override": {
        r = R(await n.fetch(I(c, e.path ?? a))), e.headers && f(r.headers, e.headers);
        break;
      }
      case "static": {
        r = await n.fetch(I(c, a));
        break;
      }
      default:
        r = new Response("Not Found", { status: 404 });
    }
  } catch (p) {
    return console.error(p), new Response("Internal Server Error", { status: 500 });
  }
  return R(r);
}
__name(j, "j");
function B(e, t) {
  let n = "^//?(?:", s = ")/(.*)$";
  return !e.startsWith(n) || !e.endsWith(s) ? false : e.slice(n.length, -s.length).split("|").every((o) => t.has(o));
}
__name(B, "B");
l();
d();
u();
function pe(e, { protocol: t, hostname: n, port: s, pathname: a }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(n).test(e.hostname) || s && !new RegExp(s).test(e.port) || a && !new RegExp(a).test(e.pathname));
}
__name(pe, "pe");
function _e(e, t) {
  if (e.method !== "GET") return;
  let { origin: n, searchParams: s } = new URL(e.url), a = s.get("url"), o = Number.parseInt(s.get("w") ?? "", 10), r = Number.parseInt(s.get("q") ?? "75", 10);
  if (!a || Number.isNaN(o) || Number.isNaN(r) || !t?.sizes?.includes(o) || r < 0 || r > 100) return;
  let i = new URL(a, n);
  if (i.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let c = a.startsWith("//"), p = a.startsWith("/") && !c;
  if (!p && !t?.domains?.includes(i.hostname) && !t?.remotePatterns?.find((N) => pe(i, N))) return;
  let _ = e.headers.get("Accept") ?? "", g = t?.formats?.find((N) => _.includes(N))?.replace("image/", "");
  return { isRelative: p, imageUrl: i, options: { width: o, quality: r, format: g } };
}
__name(_e, "_e");
function he(e, t, n) {
  let s = new Headers();
  if (n?.contentSecurityPolicy && s.set("Content-Security-Policy", n.contentSecurityPolicy), n?.contentDispositionType) {
    let o = t.pathname.split("/").pop(), r = o ? `${n.contentDispositionType}; filename="${o}"` : n.contentDispositionType;
    s.set("Content-Disposition", r);
  }
  e.headers.has("Cache-Control") || s.set("Cache-Control", `public, max-age=${n?.minimumCacheTTL ?? 60}`);
  let a = R(e);
  return f(a.headers, s), a;
}
__name(he, "he");
async function W(e, { buildOutput: t, assetsFetcher: n, imagesConfig: s }) {
  let a = _e(e, s);
  if (!a) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: o, imageUrl: r } = a, c = await (o && r.pathname in t ? n.fetch.bind(n) : fetch)(r);
  return he(c, r, s);
}
__name(W, "W");
l();
d();
u();
l();
d();
u();
l();
d();
u();
async function S(e) {
  return import(e);
}
__name(S, "S");
var me = "x-vercel-cache-tags";
var xe = "x-next-cache-soft-tags";
var ge = /* @__PURE__ */ Symbol.for("__cloudflare-request-context__");
async function J(e) {
  let t = `https://${v}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let n = new URL(e.url), s = await fe();
    if (n.pathname === "/v1/suspense-cache/revalidate") {
      let o = n.searchParams.get("tags")?.split(",") ?? [];
      for (let r of o) await s.revalidateTag(r);
      return new Response(null, { status: 200 });
    }
    let a = n.pathname.replace("/v1/suspense-cache/", "");
    if (!a.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let o = K(e, xe), r = await s.get(a, { softTags: o });
        return r ? new Response(JSON.stringify(r.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (r.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let o = globalThis[ge], r = /* @__PURE__ */ __name(async () => {
          let i = await e.json();
          i.data.tags === void 0 && (i.tags ??= K(e, me) ?? []), await s.set(a, i);
        }, "r");
        return o ? o.ctx.waitUntil(r()) : await r(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (n) {
    return console.error(n), new Response("Error handling cache request", { status: 500 });
  }
}
__name(J, "J");
async function fe() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? z("kv") : z("cache-api");
}
__name(fe, "fe");
async function z(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, n = await S(t);
  return new n.default();
}
__name(z, "z");
function K(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(K, "K");
function X() {
  globalThis[Z] || (ye(), globalThis[Z] = true);
}
__name(X, "X");
function ye() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let n = new Request(...t), s = await Te(n);
    return s || (s = await J(n), s) ? s : (Ne(n), e(n));
  };
}
__name(ye, "ye");
async function Te(e) {
  if (e.url.startsWith("blob:")) try {
    let n = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, s = (await S(n)).default, a = { async arrayBuffer() {
      return s;
    }, get body() {
      return new ReadableStream({ start(o) {
        let r = Buffer.from(s);
        o.enqueue(r), o.close();
      } });
    }, async text() {
      return Buffer.from(s).toString();
    }, async json() {
      let o = Buffer.from(s);
      return JSON.stringify(o.toString());
    }, async blob() {
      return new Blob(s);
    } };
    return a.clone = () => ({ ...a }), a;
  } catch {
  }
  return null;
}
__name(Te, "Te");
function Ne(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(Ne, "Ne");
var Z = /* @__PURE__ */ Symbol.for("next-on-pages fetch patch");
l();
d();
u();
var Y = $(Q());
var E = class {
  static {
    __name(this, "E");
  }
  constructor(t, n, s, a, o) {
    this.routes = t;
    this.output = n;
    this.reqCtx = s;
    this.url = new URL(s.request.url), this.cookies = (0, Y.parse)(s.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), y(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = o?.find((r) => r.domain === this.url.hostname), this.locales = new Set(a.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: n, checkIntercept: s }) {
    let a = P(t.src, this.path, t.caseSensitive);
    if (!a.match || t.methods && !t.methods.map((r) => r.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let o = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((r) => {
      let i = A(r, o);
      return i.newRouteDest && (o.routeDest = i.newRouteDest), !i.valid;
    }) && !t.missing?.find((r) => A(r, o).valid) && !(n && t.status !== this.status)) {
      if (s && t.dest) {
        let r = /\/(\(\.+\))+/, i = r.test(t.dest), c = r.test(this.path);
        if (i && !c) return;
      }
      return { routeMatch: a, routeDest: o.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let n = "x-middleware-override-headers", s = t.headers.get(n);
    if (s) {
      let c = new Set(s.split(",").map((p) => p.trim()));
      for (let p of c.keys()) {
        let _ = `x-middleware-request-${p}`, g = t.headers.get(_);
        this.reqCtx.request.headers.get(p) !== g && (g ? this.reqCtx.request.headers.set(p, g) : this.reqCtx.request.headers.delete(p)), t.headers.delete(_);
      }
      t.headers.delete(n);
    }
    let a = "x-middleware-rewrite", o = t.headers.get(a);
    if (o) {
      let c = new URL(o, this.url), p = this.url.hostname !== c.hostname;
      this.path = p ? `${c}` : c.pathname, y(this.searchParams, c.searchParams), t.headers.delete(a);
    }
    let r = "x-middleware-next";
    t.headers.get(r) ? t.headers.delete(r) : !o && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), f(this.reqCtx.request.headers, t.headers), f(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let n = t && this.output[t];
    if (!n || n.type !== "middleware") return this.status = 500, false;
    let s = await j(n, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), s.status === 500 ? (this.status = s.status, false) : (this.processMiddlewareResp(s), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, n, s) {
    !t.headers || (f(this.headers.normal, t.headers, { match: n, captureGroupKeys: s }), t.important && f(this.headers.important, t.headers, { match: n, captureGroupKeys: s }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, n, s) {
    if (!t.dest) return this.path;
    let a = this.path, o = t.dest;
    this.wildcardMatch && /\$wildcard/.test(o) && (o = o.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = w(o, n, s);
    let r = /\/index\.rsc$/i.test(this.path), i = /^\/(?:index)?$/i.test(a), c = /^\/__index\.prefetch\.rsc$/i.test(a);
    r && !i && !c && (this.path = a);
    let p = /\.rsc$/i.test(this.path), _ = /\.prefetch\.rsc$/i.test(this.path), g = this.path in this.output;
    p && !_ && !g && (this.path = this.path.replace(/\.rsc/i, ""));
    let N = new URL(this.path, this.url);
    return y(this.searchParams, N.searchParams), b(this.path) || (this.path = N.pathname), a;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: s, cookie: a } } = t, o = a && this.cookies[a], r = L(o ?? ""), i = L(this.reqCtx.request.headers.get("accept-language") ?? ""), _ = [...r, ...i].map((g) => s[g]).filter(Boolean)[0];
    if (_) {
      !this.path.startsWith(_) && (this.headers.normal.set("location", _), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, n) {
    return !this.locales || n !== "miss" ? t : B(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, n) {
    let s = this.getLocaleFriendlyRoute(n, t), { routeMatch: a, routeDest: o } = this.checkRouteMatch(s, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, r = { ...s, dest: o };
    if (!a?.match || r.middlewarePath && this.middlewareInvoked.includes(r.middlewarePath)) return "skip";
    let { match: i, captureGroupKeys: c } = a;
    if (this.applyRouteOverrides(r), this.applyLocaleRedirects(r), !await this.runRouteMiddleware(r.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(r, i, c), this.applyRouteStatus(r);
    let _ = this.applyRouteDest(r, i, c);
    if (r.check && !b(this.path)) if (_ === this.path) {
      if (t !== "miss") return this.checkPhase(O(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !r.continue || r.status && r.status >= 300 && r.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let n = true;
    for (let o of this.routes[t]) {
      let r = await this.checkRoute(t, o);
      if (r === "error") return "error";
      if (r === "done") {
        n = false;
        break;
      }
    }
    if (t === "hit" || b(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let o of this.locales) {
      let r = new RegExp(`/${o}(/.*)`), c = this.path.match(r)?.[1];
      if (c && c in this.output) {
        this.path = c;
        break;
      }
    }
    let s = this.path in this.output;
    if (!s && this.path.endsWith("/")) {
      let o = this.path.replace(/\/$/, "");
      s = o in this.output, s && (this.path = o);
    }
    if (t === "miss" && !s) {
      let o = !this.status || this.status < 400;
      this.status = o ? 404 : this.status;
    }
    let a = "miss";
    return s || t === "miss" || t === "error" ? a = "hit" : n && (a = O(t)), this.checkPhase(a);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let n = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), n;
  }
};
async function ee(e, t, n, s) {
  let a = new E(t.routes, n, e, s, t.wildcard), o = await te(a);
  return Ce(e, o, n);
}
__name(ee, "ee");
async function te(e, t = "none", n = false) {
  return await e.run(t) === "error" || !n && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
async function Ce(e, { path: t = "/404", status: n, headers: s, searchParams: a, body: o }, r) {
  let i = s.normal.get("location");
  if (i) {
    if (i !== s.middlewareLocation) {
      let _ = [...a.keys()].length ? `?${a.toString()}` : "";
      s.normal.set("location", `${i ?? "/"}${_}`);
    }
    return new Response(null, { status: n, headers: s.normal });
  }
  let c;
  if (o !== void 0) c = new Response(o, { status: n });
  else if (b(t)) {
    let _ = new URL(t);
    y(_.searchParams, a), c = await fetch(_, e.request);
  } else c = await j(r[t], e, { path: t, status: n, headers: s, searchParams: a });
  let p = s.normal;
  return f(p, c.headers), f(p, s.important), c = new Response(c.body, { ...c, status: n || c.status, headers: p }), c;
}
__name(Ce, "Ce");
l();
d();
u();
function se() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ee };
}
__name(se, "se");
function Ee(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let n = ke();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, n), n;
}
__name(Ee, "Ee");
function ke() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name((t, n) => e.has(n) ? e.get(n) : Reflect.get(globalThis, n), "get"), set: /* @__PURE__ */ __name((t, n, s) => Me.has(n) ? Reflect.set(globalThis, n, s) : (e.set(n, s), true), "set") });
}
__name(ke, "ke");
var Me = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Ae = Object.defineProperty;
var Ie = /* @__PURE__ */ __name((...e) => {
  let t = e[0], n = e[1], s = "__import_unsupported";
  if (!(n === s && typeof t == "object" && t !== null && s in t)) return Ae(...e);
}, "Ie");
globalThis.Object.defineProperty = Ie;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var Rs = { async fetch(e, t, n) {
  se(), X();
  let s = await __ALSes_PROMISE__;
  if (!s) {
    let r = new URL(e.url), i = await t.ASSETS.fetch(`${r.protocol}//${r.host}/cdn-cgi/errors/no-nodejs_compat.html`), c = i.ok ? i.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(c, { status: 503 });
  }
  let { envAsyncLocalStorage: a, requestContextAsyncLocalStorage: o } = s;
  return a.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: v }, async () => o.run({ env: t, ctx: n, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return W(e, { buildOutput: m, assetsFetcher: t.ASSETS, imagesConfig: h.images });
    let i = G(e);
    {
      const __res__ = await ee({ request: i, ctx: n, assetsFetcher: t.ASSETS }, h, m, x);
      const __url__ = new URL(e.url);
      return __addHeadersToResponse__(__res__, __url__.pathname);
    }
  }));
} };
export {
  Rs as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.554563906968463.mjs.map
