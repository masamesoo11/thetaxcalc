/**
 * TheTaxCalc service worker — PWA offline support.
 *
 * Strategy:
 *  - Navigations (HTML): network-first → cache → /offline fallback.
 *    Fresh pages always win; when the network dies mid-visit the user
 *    still gets the last-seen page (or the offline page).
 *  - Static assets (/_next/static, icons, fonts): stale-while-revalidate.
 *    These are content-hashed, so serving from cache is safe and instant.
 *  - Everything else (API, ads, analytics, third-party): network only —
 *    never cached, never intercepted.
 *
 * Registered from src/components/pwa/pwa-client.tsx (production only).
 * Bump CACHE_VERSION on any meaningful change to force a clean sweep.
 */

const CACHE_VERSION = 'ttc-v1';
const OFFLINE_URL = '/offline';
const MAX_RUNTIME_ENTRIES = 60;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll([OFFLINE_URL]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_VERSION)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin GET requests.
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never intercept API calls, feeds, sitemap or the service worker itself.
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname === '/feed.xml' ||
    url.pathname === '/sitemap.xml' ||
    url.pathname === '/sw.js' ||
    url.pathname === '/manifest.json'
  ) {
    return;
  }

  // HTML navigations — network-first with offline fallback.
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy)).catch(() => {});
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL))
            .then((cached) => cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } }))
        )
    );
    return;
  }

  // Content-hashed static assets — stale-while-revalidate.
  const isStaticAsset =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icon') ||
    url.pathname.startsWith('/apple-touch-icon') ||
    url.pathname.startsWith('/favicon') ||
    /\.(?:css|js|woff2?|png|svg|jpg|jpeg|webp|ico)$/.test(url.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches
              .open(CACHE_VERSION)
              .then((cache) => {
                cache.put(request, copy).then(() => {
                  // Trim the runtime cache so it can't grow unbounded.
                  cache.keys().then((keys) => {
                    if (keys.length > MAX_RUNTIME_ENTRIES) {
                      cache.delete(keys[0]);
                    }
                  });
                });
              })
              .catch(() => {});
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
  }

  // Everything else: default browser behavior (network only).
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
