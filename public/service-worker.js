const CACHE_NAME = 'setaraloka-v3';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      // Avoid caching '/' to prevent stale HTML with old hashed assets
      '/manifest.webmanifest',
    ]))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Never intercept non-GET requests (e.g., POST /register) to avoid CSRF/session issues
  if (req.method && req.method !== 'GET') {
    return; // allow browser to handle normally
  }
  // Always go to network for navigation/doc requests to get fresh HTML with correct hashed assets
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/'))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(response => response || fetch(req))
  );
});

// OneSignal will inject its own worker if configured
self.addEventListener('notificationclick', function(event) {
  const data = event.notification?.data || {};
  event.notification.close();
  const url = data.post_id ? '/posts/' + data.post_id : '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
