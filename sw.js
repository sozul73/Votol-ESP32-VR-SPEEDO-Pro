const CACHE_NAME = 'votol-dash-cache-v1';
const urlsToCache = [
  './',
  './votol-VR-dash.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Data (Bypass untuk selalu ambil dari jaringan jika online, pakai cache jika offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});