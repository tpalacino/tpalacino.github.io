const cacheName = "troys-desktop";
const resourcesToPrecache = [
  "/",
  "index.html",
  "static/js/bundle.js",
  "static/js/vendors~main.chunk.js",
  "static/js/main.chunk.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(resourcesToPrecache)));
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request) || fetch(event.request));
});