const cacheName = "troys-desktop";
const resourcesToPrecache = [
  "/",
  "index.html"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(resourcesToPrecache)));
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request) || fetch(event.request));
});