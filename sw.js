// ==================== SERVICE WORKER v3 ====================
const CACHE_VERSION = 'hpro-v3';
const STATIC_ASSETS = [
  './',
  'index.html',
  'style.css',
  'app.js',
  'icons.js',
  'manifest.json',
];
const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://html2canvas.hertzen.com/dist/html2canvas.min.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
];

// Install: cache all static assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // If some fail (e.g. icons don't exist yet), continue
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_VERSION)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy:
// - CDN: cache-first with fallback
// - Static: cache-first with network update
// - Other: network-first with cache fallback
self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Skip non-GET and chrome-extension
  if (e.request.method !== 'GET' || url.startsWith('chrome-extension')) return;

  const isCDN = CDN_ASSETS.some((a) => url.includes(new URL(a).hostname));

  if (isCDN) {
    // Cache-first for CDN assets
    e.respondWith(
      caches.match(e.request).then((cached) => {
        if (cached) return cached;
        return fetch(e.request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(e.request, clone));
          return res;
        }).catch(() => new Response('', { status: 408 }));
      })
    );
  } else {
    // Network-first for app files
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request).then((cached) => cached || caches.match('index.html')))
    );
  }
});
