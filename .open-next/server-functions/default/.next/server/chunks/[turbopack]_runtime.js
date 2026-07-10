const RUNTIME_PUBLIC_PATH = "server/chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "..";
const ASSET_PREFIX = "/";
/**
 * This file contains runtime types and functions that are shared between all
 * TurboPack ECMAScript runtimes.
 *
 * It will be prepended to the runtime code of each runtime.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="./runtime-types.d.ts" />
const REEXPORTED_OBJECTS = new WeakMap();
/**
 * Constructs the `__turbopack_context__` object for a module.
 */ function Context(module, exports) {
    this.m = module;
    // We need to store this here instead of accessing it from the module object to:
    // 1. Make it available to factories directly, since we rewrite `this` to
    //    `__turbopack_context__.e` in CJS modules.
    // 2. Support async modules which rewrite `module.exports` to a promise, so we
    //    can still access the original exports object from functions like
    //    `esmExport`
    // Ideally we could find a new approach for async modules and drop this property altogether.
    this.e = exports;
}
const contextPrototype = Context.prototype;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag;
function defineProp(obj, name, options) {
    if (!hasOwnProperty.call(obj, name)) Object.defineProperty(obj, name, options);
}
function getOverwrittenModule(moduleCache, id) {
    let module = moduleCache[id];
    if (!module) {
        // This is invoked when a module is merged into another module, thus it wasn't invoked via
        // instantiateModule and the cache entry wasn't created yet.
        module = createModuleObject(id);
        moduleCache[id] = module;
    }
    return module;
}
/**
 * Creates the module object. Only done here to ensure all module objects have the same shape.
 */ function createModuleObject(id) {
    return {
        exports: {},
        error: undefined,
        id,
        namespaceObject: undefined
    };
}
const BindingTag_Value = 0;
/**
 * Adds the getters to the exports object.
 */ function esm(exports, bindings) {
    defineProp(exports, '__esModule', {
        value: true
    });
    if (toStringTag) defineProp(exports, toStringTag, {
        value: 'Module'
    });
    let i = 0;
    while(i < bindings.length){
        const propName = bindings[i++];
        const tagOrFunction = bindings[i++];
        if (typeof tagOrFunction === 'number') {
            if (tagOrFunction === BindingTag_Value) {
                defineProp(exports, propName, {
                    value: bindings[i++],
                    enumerable: true,
                    writable: false
                });
            } else {
                throw new Error(`unexpected tag: ${tagOrFunction}`);
            }
        } else {
            const getterFn = tagOrFunction;
            if (typeof bindings[i] === 'function') {
                const setterFn = bindings[i++];
                defineProp(exports, propName, {
                    get: getterFn,
                    set: setterFn,
                    enumerable: true
                });
            } else {
                defineProp(exports, propName, {
                    get: getterFn,
                    enumerable: true
                });
            }
        }
    }
    Object.seal(exports);
}
/**
 * Makes the module an ESM with exports
 */ function esmExport(bindings, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    module.namespaceObject = exports;
    esm(exports, bindings);
}
contextPrototype.s = esmExport;
function ensureDynamicExports(module, exports) {
    let reexportedObjects = REEXPORTED_OBJECTS.get(module);
    if (!reexportedObjects) {
        REEXPORTED_OBJECTS.set(module, reexportedObjects = []);
        module.exports = module.namespaceObject = new Proxy(exports, {
            get (target, prop) {
                if (hasOwnProperty.call(target, prop) || prop === 'default' || prop === '__esModule') {
                    return Reflect.get(target, prop);
                }
                for (const obj of reexportedObjects){
                    const value = Reflect.get(obj, prop);
                    if (value !== undefined) return value;
                }
                return undefined;
            },
            ownKeys (target) {
                const keys = Reflect.ownKeys(target);
                for (const obj of reexportedObjects){
                    for (const key of Reflect.ownKeys(obj)){
                        if (key !== 'default' && !keys.includes(key)) keys.push(key);
                    }
                }
                return keys;
            }
        });
    }
    return reexportedObjects;
}
/**
 * Dynamically exports properties from an object
 */ function dynamicExport(object, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    const reexportedObjects = ensureDynamicExports(module, exports);
    if (typeof object === 'object' && object !== null) {
        reexportedObjects.push(object);
    }
}
contextPrototype.j = dynamicExport;
function exportValue(value, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = value;
}
contextPrototype.v = exportValue;
function exportNamespace(namespace, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = module.namespaceObject = namespace;
}
contextPrototype.n = exportNamespace;
function createGetter(obj, key) {
    return ()=>obj[key];
}
/**
 * @returns prototype of the object
 */ const getProto = Object.getPrototypeOf ? (obj)=>Object.getPrototypeOf(obj) : (obj)=>obj.__proto__;
/** Prototypes that are not expanded for exports */ const LEAF_PROTOTYPES = [
    null,
    getProto({}),
    getProto([]),
    getProto(getProto)
];
/**
 * @param raw
 * @param ns
 * @param allowExportDefault
 *   * `false`: will have the raw module as default export
 *   * `true`: will have the default property as default export
 */ function interopEsm(raw, ns, allowExportDefault) {
    const bindings = [];
    let defaultLocation = -1;
    for(let current = raw; (typeof current === 'object' || typeof current === 'function') && !LEAF_PROTOTYPES.includes(current); current = getProto(current)){
        for (const key of Object.getOwnPropertyNames(current)){
            bindings.push(key, createGetter(raw, key));
            if (defaultLocation === -1 && key === 'default') {
                defaultLocation = bindings.length - 1;
            }
        }
    }
    // this is not really correct
    // we should set the `default` getter if the imported module is a `.cjs file`
    if (!(allowExportDefault && defaultLocation >= 0)) {
        // Replace the binding with one for the namespace itself in order to preserve iteration order.
        if (defaultLocation >= 0) {
            // Replace the getter with the value
            bindings.splice(defaultLocation, 1, BindingTag_Value, raw);
        } else {
            bindings.push('default', BindingTag_Value, raw);
        }
    }
    esm(ns, bindings);
    return ns;
}
function createNS(raw) {
    if (typeof raw === 'function') {
        return function(...args) {
            return raw.apply(this, args);
        };
    } else {
        return Object.create(null);
    }
}
function esmImport(id) {
    const module = getOrInstantiateModuleFromParent(id, this.m);
    // any ES module has to have `module.namespaceObject` defined.
    if (module.namespaceObject) return module.namespaceObject;
    // only ESM can be an async module, so we don't need to worry about exports being a promise here.
    const raw = module.exports;
    return module.namespaceObject = interopEsm(raw, createNS(raw), raw && raw.__esModule);
}
contextPrototype.i = esmImport;
function asyncLoader(moduleId) {
    const loader = this.r(moduleId);
    return loader(esmImport.bind(this));
}
contextPrototype.A = asyncLoader;
// Add a simple runtime require so that environments without one can still pass
// `typeof require` CommonJS checks so that exports are correctly registered.
const runtimeRequire = // @ts-ignore
typeof require === 'function' ? require : function require1() {
    throw new Error('Unexpected use of runtime require');
};
contextPrototype.t = runtimeRequire;
function commonJsRequire(id) {
    return getOrInstantiateModuleFromParent(id, this.m).exports;
}
contextPrototype.r = commonJsRequire;
/**
 * Remove fragments and query parameters since they are never part of the context map keys
 *
 * This matches how we parse patterns at resolving time.  Arguably we should only do this for
 * strings passed to `import` but the resolve does it for `import` and `require` and so we do
 * here as well.
 */ function parseRequest(request) {
    // Per the URI spec fragments can contain `?` characters, so we should trim it off first
    // https://datatracker.ietf.org/doc/html/rfc3986#section-3.5
    const hashIndex = request.indexOf('#');
    if (hashIndex !== -1) {
        request = request.substring(0, hashIndex);
    }
    const queryIndex = request.indexOf('?');
    if (queryIndex !== -1) {
        request = request.substring(0, queryIndex);
    }
    return request;
}
/**
 * `require.context` and require/import expression runtime.
 */ function moduleContext(map) {
    function moduleContext(id) {
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].module();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    }
    moduleContext.keys = ()=>{
        return Object.keys(map);
    };
    moduleContext.resolve = (id)=>{
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].id();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    };
    moduleContext.import = async (id)=>{
        return await moduleContext(id);
    };
    return moduleContext;
}
contextPrototype.f = moduleContext;
/**
 * Returns the path of a chunk defined by its data.
 */ function getChunkPath(chunkData) {
    return typeof chunkData === 'string' ? chunkData : chunkData.path;
}
function isPromise(maybePromise) {
    return maybePromise != null && typeof maybePromise === 'object' && 'then' in maybePromise && typeof maybePromise.then === 'function';
}
function isAsyncModuleExt(obj) {
    return turbopackQueues in obj;
}
function createPromise() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        reject = rej;
        resolve = res;
    });
    return {
        promise,
        resolve: resolve,
        reject: reject
    };
}
// Load the CompressedmoduleFactories of a chunk into the `moduleFactories` Map.
// The CompressedModuleFactories format is
// - 1 or more module ids
// - a module factory function
// So walking this is a little complex but the flat structure is also fast to
// traverse, we can use `typeof` operators to distinguish the two cases.
function installCompressedModuleFactories(chunkModules, offset, moduleFactories, newModuleId) {
    let i = offset;
    while(i < chunkModules.length){
        let moduleId = chunkModules[i];
        let end = i + 1;
        // Find our factory function
        while(end < chunkModules.length && typeof chunkModules[end] !== 'function'){
            end++;
        }
        if (end === chunkModules.length) {
            throw new Error('malformed chunk format, expected a factory function');
        }
        // Each chunk item has a 'primary id' and optional additional ids. If the primary id is already
        // present we know all the additional ids are also present, so we don't need to check.
        if (!moduleFactories.has(moduleId)) {
            const moduleFactoryFn = chunkModules[end];
            applyModuleFactoryName(moduleFactoryFn);
            newModuleId?.(moduleId);
            for(; i < end; i++){
                moduleId = chunkModules[i];
                moduleFactories.set(moduleId, moduleFactoryFn);
            }
        }
        i = end + 1; // end is pointing at the last factory advance to the next id or the end of the array.
    }
}
// everything below is adapted from webpack
// https://github.com/webpack/webpack/blob/6be4065ade1e252c1d8dcba4af0f43e32af1bdc1/lib/runtime/AsyncModuleRuntimeModule.js#L13
const turbopackQueues = Symbol('turbopack queues');
const turbopackExports = Symbol('turbopack exports');
const turbopackError = Symbol('turbopack error');
function resolveQueue(queue) {
    if (queue && queue.status !== 1) {
        queue.status = 1;
        queue.forEach((fn)=>fn.queueCount--);
        queue.forEach((fn)=>fn.queueCount-- ? fn.queueCount++ : fn());
    }
}
function wrapDeps(deps) {
    return deps.map((dep)=>{
        if (dep !== null && typeof dep === 'object') {
            if (isAsyncModuleExt(dep)) return dep;
            if (isPromise(dep)) {
                const queue = Object.assign([], {
                    status: 0
                });
                const obj = {
                    [turbopackExports]: {},
                    [turbopackQueues]: (fn)=>fn(queue)
                };
                dep.then((res)=>{
                    obj[turbopackExports] = res;
                    resolveQueue(queue);
                }, (err)=>{
                    obj[turbopackError] = err;
                    resolveQueue(queue);
                });
                return obj;
            }
        }
        return {
            [turbopackExports]: dep,
            [turbopackQueues]: ()=>{}
        };
    });
}
function asyncModule(body, hasAwait) {
    const module = this.m;
    const queue = hasAwait ? Object.assign([], {
        status: -1
    }) : undefined;
    const depQueues = new Set();
    const { resolve, reject, promise: rawPromise } = createPromise();
    const promise = Object.assign(rawPromise, {
        [turbopackExports]: module.exports,
        [turbopackQueues]: (fn)=>{
            queue && fn(queue);
            depQueues.forEach(fn);
            promise['catch'](()=>{});
        }
    });
    const attributes = {
        get () {
            return promise;
        },
        set (v) {
            // Calling `esmExport` leads to this.
            if (v !== promise) {
                promise[turbopackExports] = v;
            }
        }
    };
    Object.defineProperty(module, 'exports', attributes);
    Object.defineProperty(module, 'namespaceObject', attributes);
    function handleAsyncDependencies(deps) {
        const currentDeps = wrapDeps(deps);
        const getResult = ()=>currentDeps.map((d)=>{
                if (d[turbopackError]) throw d[turbopackError];
                return d[turbopackExports];
            });
        const { promise, resolve } = createPromise();
        const fn = Object.assign(()=>resolve(getResult), {
            queueCount: 0
        });
        function fnQueue(q) {
            if (q !== queue && !depQueues.has(q)) {
                depQueues.add(q);
                if (q && q.status === 0) {
                    fn.queueCount++;
                    q.push(fn);
                }
            }
        }
        currentDeps.map((dep)=>dep[turbopackQueues](fnQueue));
        return fn.queueCount ? promise : getResult();
    }
    function asyncResult(err) {
        if (err) {
            reject(promise[turbopackError] = err);
        } else {
            resolve(promise[turbopackExports]);
        }
        resolveQueue(queue);
    }
    body(handleAsyncDependencies, asyncResult);
    if (queue && queue.status === -1) {
        queue.status = 0;
    }
}
contextPrototype.a = asyncModule;
/**
 * A pseudo "fake" URL object to resolve to its relative path.
 *
 * When UrlRewriteBehavior is set to relative, calls to the `new URL()` will construct url without base using this
 * runtime function to generate context-agnostic urls between different rendering context, i.e ssr / client to avoid
 * hydration mismatch.
 *
 * This is based on webpack's existing implementation:
 * https://github.com/webpack/webpack/blob/87660921808566ef3b8796f8df61bd79fc026108/lib/runtime/RelativeUrlRuntimeModule.js
 */ const relativeURL = function relativeURL(inputUrl) {
    const realUrl = new URL(inputUrl, 'x:/');
    const values = {};
    for(const key in realUrl)values[key] = realUrl[key];
    values.href = inputUrl;
    values.pathname = inputUrl.replace(/[?#].*/, '');
    values.origin = values.protocol = '';
    values.toString = values.toJSON = (..._args)=>inputUrl;
    for(const key in values)Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        value: values[key]
    });
};
relativeURL.prototype = URL.prototype;
contextPrototype.U = relativeURL;
/**
 * Utility function to ensure all variants of an enum are handled.
 */ function invariant(never, computeMessage) {
    throw new Error(`Invariant: ${computeMessage(never)}`);
}
/**
 * A stub function to make `require` available but non-functional in ESM.
 */ function requireStub(_moduleId) {
    throw new Error('dynamic usage of require is not supported');
}
contextPrototype.z = requireStub;
// Make `globalThis` available to the module in a way that cannot be shadowed by a local variable.
contextPrototype.g = globalThis;
function applyModuleFactoryName(factory) {
    // Give the module factory a nice name to improve stack traces.
    Object.defineProperty(factory, 'name', {
        value: 'module evaluation'
    });
}
/// <reference path="../shared/runtime-utils.ts" />
/// A 'base' utilities to support runtime can have externals.
/// Currently this is for node.js / edge runtime both.
/// If a fn requires node.js specific behavior, it should be placed in `node-external-utils` instead.
async function externalImport(id) {
    let raw;
    try {
        switch (id) {
  case "next/dist/compiled/@vercel/og/index.node.js":
    raw = await import("next/dist/compiled/@vercel/og/index.edge.js");
    break;
  default:
    raw = await import(id);
};
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (raw && raw.__esModule && raw.default && 'default' in raw.default) {
        return interopEsm(raw.default, createNS(raw), true);
    }
    return raw;
}
contextPrototype.y = externalImport;
function externalRequire(id, thunk, esm = false) {
    let raw;
    try {
        raw = thunk();
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (!esm || raw.__esModule) {
        return raw;
    }
    return interopEsm(raw, createNS(raw), true);
}
externalRequire.resolve = (id, options)=>{
    return require.resolve(id, options);
};
contextPrototype.x = externalRequire;
/* eslint-disable @typescript-eslint/no-unused-vars */ const path = require('path');
const relativePathToRuntimeRoot = path.relative(RUNTIME_PUBLIC_PATH, '.');
// Compute the relative path to the `distDir`.
const relativePathToDistRoot = path.join(relativePathToRuntimeRoot, RELATIVE_ROOT_PATH);
const RUNTIME_ROOT = path.resolve(__filename, relativePathToRuntimeRoot);
// Compute the absolute path to the root, by stripping distDir from the absolute path to this file.
const ABSOLUTE_ROOT = path.resolve(__filename, relativePathToDistRoot);
/**
 * Returns an absolute path to the given module path.
 * Module path should be relative, either path to a file or a directory.
 *
 * This fn allows to calculate an absolute path for some global static values, such as
 * `__dirname` or `import.meta.url` that Turbopack will not embeds in compile time.
 * See ImportMetaBinding::code_generation for the usage.
 */ function resolveAbsolutePath(modulePath) {
    if (modulePath) {
        return path.join(ABSOLUTE_ROOT, modulePath);
    }
    return ABSOLUTE_ROOT;
}
Context.prototype.P = resolveAbsolutePath;
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../shared/runtime-utils.ts" />
function readWebAssemblyAsResponse(path) {
    const { createReadStream } = require('fs');
    const { Readable } = require('stream');
    const stream = createReadStream(path);
    // @ts-ignore unfortunately there's a slight type mismatch with the stream.
    return new Response(Readable.toWeb(stream), {
        headers: {
            'content-type': 'application/wasm'
        }
    });
}
async function compileWebAssemblyFromPath(path) {
    const response = readWebAssemblyAsResponse(path);
    return await WebAssembly.compileStreaming(response);
}
async function instantiateWebAssemblyFromPath(path, importsObj) {
    const response = readWebAssemblyAsResponse(path);
    const { instance } = await WebAssembly.instantiateStreaming(response, importsObj);
    return instance.exports;
}
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../shared/runtime-utils.ts" />
/// <reference path="../shared-node/base-externals-utils.ts" />
/// <reference path="../shared-node/node-externals-utils.ts" />
/// <reference path="../shared-node/node-wasm-utils.ts" />
var SourceType = /*#__PURE__*/ function(SourceType) {
    /**
   * The module was instantiated because it was included in an evaluated chunk's
   * runtime.
   * SourceData is a ChunkPath.
   */ SourceType[SourceType["Runtime"] = 0] = "Runtime";
    /**
   * The module was instantiated because a parent module imported it.
   * SourceData is a ModuleId.
   */ SourceType[SourceType["Parent"] = 1] = "Parent";
    return SourceType;
}(SourceType || {});
process.env.TURBOPACK = '1';
const nodeContextPrototype = Context.prototype;
const url = require('url');
const moduleFactories = new Map();
nodeContextPrototype.M = moduleFactories;
const moduleCache = Object.create(null);
nodeContextPrototype.c = moduleCache;
/**
 * Returns an absolute path to the given module's id.
 */ function resolvePathFromModule(moduleId) {
    const exported = this.r(moduleId);
    const exportedPath = exported?.default ?? exported;
    if (typeof exportedPath !== 'string') {
        return exported;
    }
    const strippedAssetPrefix = exportedPath.slice(ASSET_PREFIX.length);
    const resolved = path.resolve(RUNTIME_ROOT, strippedAssetPrefix);
    return url.pathToFileURL(resolved).href;
}
nodeContextPrototype.R = resolvePathFromModule;
function loadRuntimeChunk(sourcePath, chunkData) {
    if (typeof chunkData === 'string') {
        loadRuntimeChunkPath(sourcePath, chunkData);
    } else {
        loadRuntimeChunkPath(sourcePath, chunkData.path);
    }
}
const loadedChunks = new Set();
const unsupportedLoadChunk = Promise.resolve(undefined);
const loadedChunk = Promise.resolve(undefined);
const chunkCache = new Map();
function clearChunkCache() {
    chunkCache.clear();
}
function loadRuntimeChunkPath(sourcePath, chunkPath) {
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return;
    }
    if (loadedChunks.has(chunkPath)) {
        return;
    }
    try {
        const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
        const chunkModules = requireChunk(chunkPath);
        installCompressedModuleFactories(chunkModules, 0, moduleFactories);
        loadedChunks.add(chunkPath);
    } catch (cause) {
        let errorMessage = `Failed to load chunk ${chunkPath}`;
        if (sourcePath) {
            errorMessage += ` from runtime for chunk ${sourcePath}`;
        }
        const error = new Error(errorMessage, {
            cause
        });
        error.name = 'ChunkLoadError';
        throw error;
    }
}
function loadChunkAsync(chunkData) {
    const chunkPath = typeof chunkData === 'string' ? chunkData : chunkData.path;
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return unsupportedLoadChunk;
    }
    let entry = chunkCache.get(chunkPath);
    if (entry === undefined) {
        try {
            // resolve to an absolute path to simplify `require` handling
            const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
            // TODO: consider switching to `import()` to enable concurrent chunk loading and async file io
            // However this is incompatible with hot reloading (since `import` doesn't use the require cache)
            const chunkModules = requireChunk(chunkPath);
            installCompressedModuleFactories(chunkModules, 0, moduleFactories);
            entry = loadedChunk;
        } catch (cause) {
            const errorMessage = `Failed to load chunk ${chunkPath} from module ${this.m.id}`;
            const error = new Error(errorMessage, {
                cause
            });
            error.name = 'ChunkLoadError';
            // Cache the failure promise, future requests will also get this same rejection
            entry = Promise.reject(error);
        }
        chunkCache.set(chunkPath, entry);
    }
    // TODO: Return an instrumented Promise that React can use instead of relying on referential equality.
    return entry;
}
contextPrototype.l = loadChunkAsync;
function loadChunkAsyncByUrl(chunkUrl) {
    const path1 = url.fileURLToPath(new URL(chunkUrl, RUNTIME_ROOT));
    return loadChunkAsync.call(this, path1);
}
contextPrototype.L = loadChunkAsyncByUrl;
async function loadWebAssembly(chunkPath, _edgeModule, imports) {
  const mod = await loadWasmChunk(chunkPath);
  const { exports } = await WebAssembly.instantiate(mod, imports);
  return exports;
}
contextPrototype.w = loadWebAssembly;
function loadWebAssemblyModule(chunkPath, _edgeModule) {
  return loadWasmChunk(chunkPath);
}
contextPrototype.u = loadWebAssemblyModule;
function getWorkerBlobURL(_chunks) {
    throw new Error('Worker blobs are not implemented yet for Node.js');
}
nodeContextPrototype.b = getWorkerBlobURL;
function instantiateModule(id, sourceType, sourceData) {
    const moduleFactory = moduleFactories.get(id);
    if (typeof moduleFactory !== 'function') {
        // This can happen if modules incorrectly handle HMR disposes/updates,
        // e.g. when they keep a `setTimeout` around which still executes old code
        // and contains e.g. a `require("something")` call.
        let instantiationReason;
        switch(sourceType){
            case 0:
                instantiationReason = `as a runtime entry of chunk ${sourceData}`;
                break;
            case 1:
                instantiationReason = `because it was required from module ${sourceData}`;
                break;
            default:
                invariant(sourceType, (sourceType)=>`Unknown source type: ${sourceType}`);
        }
        throw new Error(`Module ${id} was instantiated ${instantiationReason}, but the module factory is not available.`);
    }
    const module1 = createModuleObject(id);
    const exports = module1.exports;
    moduleCache[id] = module1;
    const context = new Context(module1, exports);
    // NOTE(alexkirsz) This can fail when the module encounters a runtime error.
    try {
        moduleFactory(context, module1, exports);
    } catch (error) {
        module1.error = error;
        throw error;
    }
    module1.loaded = true;
    if (module1.namespaceObject && module1.exports !== module1.namespaceObject) {
        // in case of a circular dependency: cjs1 -> esm2 -> cjs1
        interopEsm(module1.exports, module1.namespaceObject);
    }
    return module1;
}
/**
 * Retrieves a module from the cache, or instantiate it if it is not cached.
 */ // @ts-ignore
function getOrInstantiateModuleFromParent(id, sourceModule) {
    const module1 = moduleCache[id];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateModule(id, 1, sourceModule.id);
}
/**
 * Instantiates a runtime module.
 */ function instantiateRuntimeModule(chunkPath, moduleId) {
    return instantiateModule(moduleId, 0, chunkPath);
}
/**
 * Retrieves a module from the cache, or instantiate it as a runtime module if it is not cached.
 */ // @ts-ignore TypeScript doesn't separate this module space from the browser runtime
function getOrInstantiateRuntimeModule(chunkPath, moduleId) {
    const module1 = moduleCache[moduleId];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateRuntimeModule(chunkPath, moduleId);
}
const regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;
/**
 * Checks if a given path/URL ends with .js, optionally followed by ?query or #fragment.
 */ function isJs(chunkUrlOrPath) {
    return regexJsUrl.test(chunkUrlOrPath);
}
module.exports = (sourcePath)=>({
        m: (id)=>getOrInstantiateRuntimeModule(sourcePath, id),
        c: (chunkData)=>loadRuntimeChunk(sourcePath, chunkData)
    });


//# sourceMappingURL=%5Bturbopack%5D_runtime.js.map

  function requireChunk(chunkPath) {
    switch(chunkPath) {
      case "server/chunks/ssr/[root-of-the-server]__1690ee0d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1690ee0d._.js");
      case "server/chunks/ssr/[root-of-the-server]__75484d3b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__75484d3b._.js");
      case "server/chunks/ssr/[root-of-the-server]__7c1a3170._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__7c1a3170._.js");
      case "server/chunks/ssr/[root-of-the-server]__9e1ab064._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__9e1ab064._.js");
      case "server/chunks/ssr/[root-of-the-server]__c3edb670._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__c3edb670._.js");
      case "server/chunks/ssr/[root-of-the-server]__cd758494._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__cd758494._.js");
      case "server/chunks/ssr/[root-of-the-server]__d05732c8._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__d05732c8._.js");
      case "server/chunks/ssr/[turbopack]_runtime.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[turbopack]_runtime.js");
      case "server/chunks/ssr/_bbbe29d1._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_bbbe29d1._.js");
      case "server/chunks/ssr/_f54fa05c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_f54fa05c._.js");
      case "server/chunks/ssr/_f9a6ba08._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_f9a6ba08._.js");
      case "server/chunks/ssr/_next-internal_server_app__not-found_page_actions_554ec2bf.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__not-found_page_actions_554ec2bf.js");
      case "server/chunks/ssr/node_modules_019c4550._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_019c4550._.js");
      case "server/chunks/ssr/node_modules_next_6080062d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_6080062d._.js");
      case "server/chunks/ssr/node_modules_next_dist_2e5d1b2c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_2e5d1b2c._.js");
      case "server/chunks/ssr/node_modules_next_dist_3bd4d890._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_3bd4d890._.js");
      case "server/chunks/ssr/node_modules_next_dist_9266b807._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_9266b807._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_2fffaa3a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_2fffaa3a._.js");
      case "server/chunks/ssr/node_modules_next_dist_esm_build_templates_app-page_cd387d9f.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_esm_build_templates_app-page_cd387d9f.js");
      case "server/chunks/ssr/node_modules_next_dist_esm_eedfc1fd._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_esm_eedfc1fd._.js");
      case "server/chunks/ssr/node_modules_next_f2865b38._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_f2865b38._.js");
      case "server/chunks/ssr/src_app_apple-icon--metadata_d5c26a2b.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_apple-icon--metadata_d5c26a2b.js");
      case "server/chunks/ssr/src_app_error_tsx_22278d09._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_error_tsx_22278d09._.js");
      case "server/chunks/ssr/src_app_error_tsx_ef715cc8._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_error_tsx_ef715cc8._.js");
      case "server/chunks/ssr/src_app_global-error_tsx_aa661ba4._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_global-error_tsx_aa661ba4._.js");
      case "server/chunks/ssr/src_app_opengraph-image--metadata_8494dd1d.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_opengraph-image--metadata_8494dd1d.js");
      case "server/chunks/ssr/src_components_f5cc05db._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_f5cc05db._.js");
      case "server/chunks/ssr/[root-of-the-server]__aae3b925._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__aae3b925._.js");
      case "server/chunks/ssr/_ad2a4c12._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_ad2a4c12._.js");
      case "server/chunks/ssr/_f347a933._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_f347a933._.js");
      case "server/chunks/ssr/_next-internal_server_app_[calculator]_page_actions_3141e641.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_[calculator]_page_actions_3141e641.js");
      case "server/chunks/ssr/node_modules_@radix-ui_43b27abd._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@radix-ui_43b27abd._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_15817684.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_15817684.js");
      case "server/chunks/ssr/src_app_[calculator]_opengraph-image--metadata_4d84eb9c.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_[calculator]_opengraph-image--metadata_4d84eb9c.js");
      case "server/chunks/ssr/src_components_finance_scenario-comparison_tsx_f70e9aa9._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_finance_scenario-comparison_tsx_f70e9aa9._.js");
      case "server/chunks/ssr/src_components_ui_label_tsx_be9255eb._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_ui_label_tsx_be9255eb._.js");
      case "server/chunks/ssr/src_eee524a6._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_eee524a6._.js");
      case "server/chunks/ssr/src_lib_blog-index_ts_f68fe5fb._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_blog-index_ts_f68fe5fb._.js");
      case "server/chunks/ssr/src_lib_calculator-routes_ts_7653659f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_calculator-routes_ts_7653659f._.js");
      case "server/chunks/ssr/[root-of-the-server]__133b0a45._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__133b0a45._.js");
      case "server/chunks/ssr/[root-of-the-server]__e2369859._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e2369859._.js");
      case "server/chunks/ssr/[root-of-the-server]__f40f2b71._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__f40f2b71._.js");
      case "server/chunks/ssr/_next-internal_server_app__global-error_page_actions_75761787.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__global-error_page_actions_75761787.js");
      case "server/chunks/ssr/node_modules_next_dist_03ec2107._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_03ec2107._.js");
      case "server/chunks/ssr/[root-of-the-server]__e9058dbb._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e9058dbb._.js");
      case "server/chunks/ssr/_9f3734fe._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_9f3734fe._.js");
      case "server/chunks/ssr/_next-internal_server_app_about_page_actions_6fff35e4.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_about_page_actions_6fff35e4.js");
      case "server/chunks/ssr/src_app_about_page_tsx_2ebe742f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_about_page_tsx_2ebe742f._.js");
      case "server/chunks/ssr/src_components_finance_protected-email_tsx_b63e6a80._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_finance_protected-email_tsx_b63e6a80._.js");
      case "server/chunks/ssr/[root-of-the-server]__da3589c7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__da3589c7._.js");
      case "server/chunks/ssr/_b35e27a1._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_b35e27a1._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_page_actions_c7bd1b4f.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_page_actions_c7bd1b4f.js");
      case "server/chunks/ssr/src_app_admin_layout_tsx_9cb4d248._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_layout_tsx_9cb4d248._.js");
      case "server/chunks/ssr/src_app_admin_page_tsx_645532da._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_page_tsx_645532da._.js");
      case "server/chunks/ssr/[root-of-the-server]__fc806803._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__fc806803._.js");
      case "server/chunks/ssr/_f0637eb9._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_f0637eb9._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_settings_page_actions_d95b6266.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_settings_page_actions_d95b6266.js");
      case "server/chunks/ssr/src_app_admin_settings_page_tsx_ab516ef5._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_admin_settings_page_tsx_ab516ef5._.js");
      case "server/chunks/ssr/[root-of-the-server]__602d65a2._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__602d65a2._.js");
      case "server/chunks/ssr/[root-of-the-server]__7518fceb._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__7518fceb._.js");
      case "server/chunks/ssr/_025fcf06._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_025fcf06._.js");
      case "server/chunks/ssr/_next-internal_server_app_blog_[slug]_page_actions_ec3909d7.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_blog_[slug]_page_actions_ec3909d7.js");
      case "server/chunks/ssr/src_app_blog_[slug]_blog-toc_tsx_7dd0effe._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_blog_[slug]_blog-toc_tsx_7dd0effe._.js");
      case "server/chunks/ssr/src_app_blog_error_tsx_376ea822._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_blog_error_tsx_376ea822._.js");
      case "server/chunks/ssr/src_app_blog_error_tsx_ab462b5b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_blog_error_tsx_ab462b5b._.js");
      case "server/chunks/ssr/[root-of-the-server]__5704ab03._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__5704ab03._.js");
      case "server/chunks/ssr/_22b3864a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_22b3864a._.js");
      case "server/chunks/ssr/_next-internal_server_app_blog_page_actions_cb4aaadc.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_blog_page_actions_cb4aaadc.js");
      case "server/chunks/ssr/src_app_blog_blog-filter-client_tsx_ab974b33._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_blog_blog-filter-client_tsx_ab974b33._.js");
      case "server/chunks/ssr/[root-of-the-server]__e8310797._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e8310797._.js");
      case "server/chunks/ssr/_16563b7f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_16563b7f._.js");
      case "server/chunks/ssr/_next-internal_server_app_compare_[states]_page_actions_67799aac.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_compare_[states]_page_actions_67799aac.js");
      case "server/chunks/ssr/src_app_compare_[states]_28875425._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_compare_[states]_28875425._.js");
      case "server/chunks/ssr/src_app_compare_[states]_dynamic-compare-page_tsx_99211d0b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_compare_[states]_dynamic-compare-page_tsx_99211d0b._.js");
      case "server/chunks/ssr/src_lib_salary-calculations_ts_a7d1d629._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_salary-calculations_ts_a7d1d629._.js");
      case "server/chunks/ssr/[root-of-the-server]__a637f078._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__a637f078._.js");
      case "server/chunks/ssr/_127585d8._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_127585d8._.js");
      case "server/chunks/ssr/_next-internal_server_app_compare_page_actions_2f7490f3.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_compare_page_actions_2f7490f3.js");
      case "server/chunks/ssr/src_app_compare_page_tsx_ed74ab93._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_compare_page_tsx_ed74ab93._.js");
      case "server/chunks/ssr/[root-of-the-server]__7dd96ff7._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__7dd96ff7._.js");
      case "server/chunks/ssr/_69c52039._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_69c52039._.js");
      case "server/chunks/ssr/_74d57398._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_74d57398._.js");
      case "server/chunks/ssr/_next-internal_server_app_federal-tax-brackets_page_actions_dd62b3d7.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_federal-tax-brackets_page_actions_dd62b3d7.js");
      case "server/chunks/ssr/node_modules_@radix-ui_f49994a3._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@radix-ui_f49994a3._.js");
      case "server/chunks/ssr/src_app_federal-tax-brackets_7ea1bd2d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_federal-tax-brackets_7ea1bd2d._.js");
      case "server/chunks/ssr/src_app_federal-tax-brackets_brackets-tabs_tsx_bbd80376._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_federal-tax-brackets_brackets-tabs_tsx_bbd80376._.js");
      case "server/chunks/ssr/[root-of-the-server]__e21b1929._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e21b1929._.js");
      case "server/chunks/ssr/_97290a13._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_97290a13._.js");
      case "server/chunks/ssr/_fd44733d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_fd44733d._.js");
      case "server/chunks/ssr/_next-internal_server_app_freefile-irs_page_actions_9cd8c748.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_freefile-irs_page_actions_9cd8c748.js");
      case "server/chunks/ssr/src_app_freefile-irs_067c0d88._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_freefile-irs_067c0d88._.js");
      case "server/chunks/ssr/src_app_freefile-irs_freefile-irs-client_tsx_03d64b75._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_freefile-irs_freefile-irs-client_tsx_03d64b75._.js");
      case "server/chunks/ssr/[root-of-the-server]__cd2bbdad._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__cd2bbdad._.js");
      case "server/chunks/ssr/_088c479b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_088c479b._.js");
      case "server/chunks/ssr/_next-internal_server_app_glossary_page_actions_e6807e10.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_glossary_page_actions_e6807e10.js");
      case "server/chunks/ssr/node_modules_lucide-react_dist_esm_icons_chevron-up_6176baa6.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_lucide-react_dist_esm_icons_chevron-up_6176baa6.js");
      case "server/chunks/ssr/src_app_glossary_76b1e5fd._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_glossary_76b1e5fd._.js");
      case "server/chunks/ssr/src_app_glossary_glossary-client_tsx_1de3804f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_glossary_glossary-client_tsx_1de3804f._.js");
      case "server/chunks/ssr/[root-of-the-server]__a9dbe755._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__a9dbe755._.js");
      case "server/chunks/ssr/_936324bd._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_936324bd._.js");
      case "server/chunks/ssr/_f7ca1f0e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_f7ca1f0e._.js");
      case "server/chunks/ssr/_next-internal_server_app_home-sale-tax-calculator_page_actions_f386a581.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_home-sale-tax-calculator_page_actions_f386a581.js");
      case "server/chunks/ssr/src_app_home-sale-tax-calculator_ca46d166._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_home-sale-tax-calculator_ca46d166._.js");
      case "server/chunks/ssr/src_app_home-sale-tax-calculator_home-sale-tax-client_tsx_fd89b638._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_home-sale-tax-calculator_home-sale-tax-client_tsx_fd89b638._.js");
      case "server/chunks/ssr/[root-of-the-server]__e526ce2b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e526ce2b._.js");
      case "server/chunks/ssr/_180a4baa._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_180a4baa._.js");
      case "server/chunks/ssr/_88ceda72._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_88ceda72._.js");
      case "server/chunks/ssr/_next-internal_server_app_job-offer-comparison-calculator_page_actions_23743360.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_job-offer-comparison-calculator_page_actions_23743360.js");
      case "server/chunks/ssr/[root-of-the-server]__e0eb8bcc._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e0eb8bcc._.js");
      case "server/chunks/ssr/_95920c25._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_95920c25._.js");
      case "server/chunks/ssr/_next-internal_server_app_methodology_page_actions_f91c12f5.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_methodology_page_actions_f91c12f5.js");
      case "server/chunks/ssr/src_app_methodology_page_tsx_ad45b045._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_methodology_page_tsx_ad45b045._.js");
      case "server/chunks/ssr/_5ab3b00c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_5ab3b00c._.js");
      case "server/chunks/ssr/_9dd226af._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_9dd226af._.js");
      case "server/chunks/ssr/_next-internal_server_app_mortgage-calculator_page_actions_224522c8.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_mortgage-calculator_page_actions_224522c8.js");
      case "server/chunks/ssr/src_app_mortgage-calculator_7ba4301d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_mortgage-calculator_7ba4301d._.js");
      case "server/chunks/ssr/_4759e01f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_4759e01f._.js");
      case "server/chunks/ssr/_5da6e965._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_5da6e965._.js");
      case "server/chunks/ssr/_next-internal_server_app_obbba-tax-calculator_page_actions_96da4232.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_obbba-tax-calculator_page_actions_96da4232.js");
      case "server/chunks/ssr/src_app_obbba-tax-calculator_12ec78f6._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_obbba-tax-calculator_12ec78f6._.js");
      case "server/chunks/ssr/src_app_obbba-tax-calculator_obbba-calculator-client_tsx_679b7bc3._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_obbba-tax-calculator_obbba-calculator-client_tsx_679b7bc3._.js");
      case "server/chunks/ssr/[root-of-the-server]__24b9cc4b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__24b9cc4b._.js");
      case "server/chunks/ssr/_39b94957._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_39b94957._.js");
      case "server/chunks/ssr/_next-internal_server_app_page_actions_39d4fc33.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_page_actions_39d4fc33.js");
      case "server/chunks/ssr/src_app_page_tsx_ba0756fb._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_page_tsx_ba0756fb._.js");
      case "server/chunks/ssr/[root-of-the-server]__6d978b4d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__6d978b4d._.js");
      case "server/chunks/ssr/_45923c37._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_45923c37._.js");
      case "server/chunks/ssr/_next-internal_server_app_paycheck-difference-calculator_page_actions_ff16f473.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_paycheck-difference-calculator_page_actions_ff16f473.js");
      case "server/chunks/ssr/[root-of-the-server]__2e60a652._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2e60a652._.js");
      case "server/chunks/ssr/_c517dd17._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_c517dd17._.js");
      case "server/chunks/ssr/_next-internal_server_app_privacy_page_actions_78bfea85.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_privacy_page_actions_78bfea85.js");
      case "server/chunks/ssr/src_app_privacy_page_tsx_a92966ea._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_privacy_page_tsx_a92966ea._.js");
      case "server/chunks/ssr/[root-of-the-server]__2bc7ea59._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2bc7ea59._.js");
      case "server/chunks/ssr/_70072826._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_70072826._.js");
      case "server/chunks/ssr/_next-internal_server_app_research_[slug]_page_actions_213b8162.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_research_[slug]_page_actions_213b8162.js");
      case "server/chunks/ssr/src_app_research_[slug]_page_tsx_13008c75._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_research_[slug]_page_tsx_13008c75._.js");
      case "server/chunks/ssr/[root-of-the-server]__cf3b15ea._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__cf3b15ea._.js");
      case "server/chunks/ssr/_bd26bef0._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_bd26bef0._.js");
      case "server/chunks/ssr/_next-internal_server_app_research_page_actions_b90d9398.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_research_page_actions_b90d9398.js");
      case "server/chunks/ssr/[root-of-the-server]__7ccdeb14._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__7ccdeb14._.js");
      case "server/chunks/ssr/_3526770f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_3526770f._.js");
      case "server/chunks/ssr/_b0ea32f2._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_b0ea32f2._.js");
      case "server/chunks/ssr/_next-internal_server_app_resources_page_actions_40a14c4e.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_resources_page_actions_40a14c4e.js");
      case "server/chunks/ssr/src_3aa42d65._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_3aa42d65._.js");
      case "server/chunks/ssr/[root-of-the-server]__2dd7877b._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2dd7877b._.js");
      case "server/chunks/ssr/_efbf35d5._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_efbf35d5._.js");
      case "server/chunks/ssr/_next-internal_server_app_salary_[amount]_page_actions_cc4828f9.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_salary_[amount]_page_actions_cc4828f9.js");
      case "server/chunks/ssr/src_app_salary_[amount]_7df53094._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_salary_[amount]_7df53094._.js");
      case "server/chunks/ssr/src_app_salary_[amount]_dynamic-salary-page_tsx_8fcf9d6e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_salary_[amount]_dynamic-salary-page_tsx_8fcf9d6e._.js");
      case "server/chunks/ssr/[root-of-the-server]__5e786708._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__5e786708._.js");
      case "server/chunks/ssr/_3c0aa19c._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_3c0aa19c._.js");
      case "server/chunks/ssr/_next-internal_server_app_salary_page_actions_aa3382e0.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_salary_page_actions_aa3382e0.js");
      case "server/chunks/ssr/src_app_salary_page_tsx_2f175d35._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_salary_page_tsx_2f175d35._.js");
      case "server/chunks/ssr/[root-of-the-server]__17bd510d._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__17bd510d._.js");
      case "server/chunks/ssr/_2995cf21._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_2995cf21._.js");
      case "server/chunks/ssr/_next-internal_server_app_salary-comparison-calculator_page_actions_6253f419.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_salary-comparison-calculator_page_actions_6253f419.js");
      case "server/chunks/ssr/src_app_salary-comparison-calculator_page_tsx_7a658012._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_salary-comparison-calculator_page_tsx_7a658012._.js");
      case "server/chunks/ssr/[root-of-the-server]__3e11a5f0._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__3e11a5f0._.js");
      case "server/chunks/ssr/_091dea52._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_091dea52._.js");
      case "server/chunks/ssr/_next-internal_server_app_sales-tax-calculator_[state]_page_actions_02bccd58.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_sales-tax-calculator_[state]_page_actions_02bccd58.js");
      case "server/chunks/ssr/src_app_sales-tax-calculator_[state]_state-sales-tax-client_tsx_e10189ed._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_sales-tax-calculator_[state]_state-sales-tax-client_tsx_e10189ed._.js");
      case "server/chunks/ssr/src_lib_state-sales-tax-data_ts_ee4cb770._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_state-sales-tax-data_ts_ee4cb770._.js");
      case "server/chunks/ssr/_2af7b8f6._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_2af7b8f6._.js");
      case "server/chunks/ssr/_5709b334._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_5709b334._.js");
      case "server/chunks/ssr/_next-internal_server_app_sales-tax-calculator_page_actions_b2730fce.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_sales-tax-calculator_page_actions_b2730fce.js");
      case "server/chunks/ssr/src_app_sales-tax-calculator_e931b5c0._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_sales-tax-calculator_e931b5c0._.js");
      case "server/chunks/ssr/src_app_sales-tax-calculator_sales-tax-hub-client_tsx_969efdf5._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_sales-tax-calculator_sales-tax-hub-client_tsx_969efdf5._.js");
      case "server/chunks/ssr/src_lib_state-sales-tax-data_ts_e831c6c8._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_state-sales-tax-data_ts_e831c6c8._.js");
      case "server/chunks/ssr/[root-of-the-server]__00c169cf._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__00c169cf._.js");
      case "server/chunks/ssr/_8af4a601._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_8af4a601._.js");
      case "server/chunks/ssr/_next-internal_server_app_scholarship_page_actions_137689bf.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_scholarship_page_actions_137689bf.js");
      case "server/chunks/[externals]_next_dist_a6d89067._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[externals]_next_dist_a6d89067._.js");
      case "server/chunks/[root-of-the-server]__4f7eb69f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__4f7eb69f._.js");
      case "server/chunks/[turbopack]_runtime.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/[turbopack]_runtime.js");
      case "server/chunks/_next-internal_server_app_sitemap_xml_route_actions_12658ace.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_sitemap_xml_route_actions_12658ace.js");
      case "server/chunks/ssr/[root-of-the-server]__dbee8310._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__dbee8310._.js");
      case "server/chunks/ssr/_93e66f75._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_93e66f75._.js");
      case "server/chunks/ssr/_next-internal_server_app_smartasset-alternative_page_actions_e449128d.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_smartasset-alternative_page_actions_e449128d.js");
      case "server/chunks/ssr/[root-of-the-server]__68897b7e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__68897b7e._.js");
      case "server/chunks/ssr/_825cf462._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_825cf462._.js");
      case "server/chunks/ssr/_d26de117._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_d26de117._.js");
      case "server/chunks/ssr/_next-internal_server_app_tax-data_page_actions_40ce0f27.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_tax-data_page_actions_40ce0f27.js");
      case "server/chunks/ssr/node_modules_lucide-react_dist_esm_icons_91d44a00._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_lucide-react_dist_esm_icons_91d44a00._.js");
      case "server/chunks/ssr/src_6a8a7b11._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_6a8a7b11._.js");
      case "server/chunks/ssr/[root-of-the-server]__4e6a29bd._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__4e6a29bd._.js");
      case "server/chunks/ssr/_c61f49ac._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_c61f49ac._.js");
      case "server/chunks/ssr/_next-internal_server_app_tax-professionals_page_actions_f754f2a0.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_tax-professionals_page_actions_f754f2a0.js");
      case "server/chunks/ssr/[root-of-the-server]__86ebd8a5._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__86ebd8a5._.js");
      case "server/chunks/ssr/_00994e7e._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_00994e7e._.js");
      case "server/chunks/ssr/_next-internal_server_app_terms_page_actions_3b82705a.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_terms_page_actions_3b82705a.js");
      case "server/chunks/ssr/src_app_terms_page_tsx_798ddf0a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_terms_page_tsx_798ddf0a._.js");
      case "server/chunks/ssr/[root-of-the-server]__ecca0a7a._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__ecca0a7a._.js");
      case "server/chunks/ssr/_50d68502._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_50d68502._.js");
      case "server/chunks/ssr/_e8b2774f._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_e8b2774f._.js");
      case "server/chunks/ssr/_next-internal_server_app_widgets_page_actions_4dc52054.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_widgets_page_actions_4dc52054.js");
      case "server/chunks/ssr/src_0e31b6c0._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_0e31b6c0._.js");
      case "server/chunks/ssr/src_components_finance_4741efbb._.js": return require("/home/z/my-project/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_finance_4741efbb._.js");
      default:
        throw new Error(`Not found ${chunkPath}`);
    }
  }


  async function loadWasmChunk(chunkPath) {
    switch (chunkPath) {

      default:
        throw new Error(`Unknown wasm chunk: ${chunkPath}`);
    }
  }
