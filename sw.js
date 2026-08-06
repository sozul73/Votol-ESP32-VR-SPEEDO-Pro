// Cache version - increment this to force update on users' browsers
const CACHE_NAME = 'votol-dash-cache-v2.3';

// Get base path for GitHub Pages compatibility
const getBasePath = () => {
  return self.location.pathname.replace(/\/sw\.js$/, '');
};

const BASE_PATH = getBasePath();

const urlsToCache = [
  BASE_PATH + '/',
  BASE_PATH + '/index.html',
  BASE_PATH + '/style.css',
  BASE_PATH + '/script.js',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/icon-192.png',
  BASE_PATH + '/icon-512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app shell in:', BASE_PATH);
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Cache failed:', err);
      })
  );
  // Force waiting service worker to become active
  self.skipWaiting();
});

// Activate - Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Stale-while-revalidate strategy with offline fallback
self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;
  
  // Don't cache external CDN requests or BLE/bluetooth requests
  if (event.request.url.includes('bluetooth') || 
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.includes('unpkg.com') ||
      event.request.url.includes('cdn.jsdelivr.net')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Fetch from network
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Cache a copy of the response (only same-origin)
        if (networkResponse && networkResponse.status === 200 && 
            new URL(event.request.url).origin === self.location.origin) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed
        if (cachedResponse) {
          return cachedResponse;
        }
        // If no cache and navigation request, return offline page
        if (event.request.mode === 'navigate') {
          return caches.match(BASE_PATH + '/index.html');
        }
        return new Response('Offline - No cached version available', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });

      // Return cached version immediately if exists, else wait for network
      return cachedResponse || fetchPromise;
    })
  );
});