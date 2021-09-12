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
                workbox.precaching.precacheAndRoute([{"revision":"580bf41d89e2141c9f2dd10b7f127db5","url":"index.html"},{"revision":"da9fd36499958b244f0b423960d3e4d4","url":"logo192.png"},{"revision":"8cd820b49afd8001abf6f94e40481cb6","url":"logo512.png"},{"revision":"b74c5a1d8eac891bc46462eba105bec9","url":"static/css/main.5fab38fa.chunk.css"},{"revision":"52e5ffa6f87a8d0b57705fe4633a6571","url":"static/js/2.0b2d6e93.chunk.js"},{"revision":"69fea11bfdc667f2ae33e202f6b0cdc9","url":"static/js/3.09bd8990.chunk.js"},{"revision":"d47201006bfeca1f135349209bd99ac1","url":"static/js/main.56ca708d.chunk.js"},{"revision":"3cb7eddd0a15b17a96712063045b06dc","url":"static/js/runtime-main.ec0f1d2a.js"}]);
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