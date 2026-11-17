// Service Worker for Memorijal d.o.o. offline emergency resilience (Hardened Static-Only Policy)
const CACHE_NAME = 'memorijal-offline-v2';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/offline.html',
  '/assets/branding/emblem-crest.svg',
  '/favicon.ico',
  '/site.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // 1. Immediately bypass all non-GET requests (POST, PUT, DELETE, etc.)
  if (request.method !== 'GET') {
    return;
  }

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // 2. Bypass cross-origin API calls, analytics, and any URL containing query strings or user state
  if (url.origin !== self.location.origin || url.search) {
    return;
  }

  // 3. Navigation requests: network-first, falling back to /offline.html when offline (never caching dynamic HTML user state)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return (
          cachedResponse ||
          new Response('Offline emergency line: +382 68 934 904', {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          })
        );
      })
    );
    return;
  }

  // 4. Strictly cache only immutable static assets (/assets/*, /offline.html, favicons/fonts)
  const isImmutableAsset =
    url.pathname.startsWith('/assets/') ||
    STATIC_ASSETS.includes(url.pathname) ||
    request.destination === 'font';

  if (isImmutableAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networked = fetch(request)
          .then((response) => {
            if (response && response.status === 200 && response.type === 'basic') {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
          .catch(() => cached);
        return cached || networked;
      })
    );
  }
});
