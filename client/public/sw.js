/* DigiAds service worker — makes the site installable as an app ("Download App").
   It deliberately caches nothing: every request goes to the network, so visitors
   always see the latest content and API data is never served stale. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {
  // Network pass-through (no respondWith): the browser handles every request normally.
});
