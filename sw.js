const version = '2';

try {
    if ("function" === typeof importScripts) {
        importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

        // Global workbox
        if (workbox) {
            // console.log("Workbox is loaded");

            // Disable logging
            workbox.setConfig({ debug: false });

            //`generateSW` and `generateSWString` provide the option
            // to force update an exiting service worker.
            // Since we're using `injectManifest` to build SW,
            // manually overriding the skipWaiting();
            self.addEventListener("install", event => {
                self.skipWaiting(); // Skip to activation step - taken care in serviceWorker.ts
            });

            // Manual injection point for manifest files.
            // All assets under build/ and 5MB sizes are precached.
            try {
                workbox.precaching.precacheAndRoute([{"revision":"d122ee7ad04181b49fdb124ae99b79c5","url":"404.html"},{"revision":"086b8159835a63f3299dfb8e5d32f40e","url":"index.html"},{"revision":"da9fd36499958b244f0b423960d3e4d4","url":"logo192.png"},{"revision":"8cd820b49afd8001abf6f94e40481cb6","url":"logo512.png"},{"revision":"f00a5083036c7003b07cdb3377b41378","url":"static/css/main.6548dde8.chunk.css"},{"revision":"99c6bc0772b9bdd70367061ff2b75aa9","url":"static/js/2.3a2b2a15.chunk.js"},{"revision":"fc705197b9c0e985917471639cfe530d","url":"static/js/3.d0357653.chunk.js"},{"revision":"2f0ef49159191285bfb4351f6907f66c","url":"static/js/main.5ab6cb1e.chunk.js"},{"revision":"b9373a04b5ce59c49f6f8f1e1fd6b17d","url":"static/js/runtime-main.36b5836a.js"}]);
            }
            catch (e) {
                console.error(e);
            }

            // Font caching
            workbox.routing.registerRoute(
                new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
                workbox.strategies.cacheFirst({
                    cacheName: "googleapis",
                    plugins: [
                        new workbox.expiration.Plugin({
                            maxEntries: 30,
                        }),
                    ],
                })
            );
        }
        else {
            console.error("Workbox could not be loaded. No offline support");
        }
    }
}
catch (e) {
    console.error("Unable to install service worker. Possible network error.", e);
}