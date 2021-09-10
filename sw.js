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
                workbox.precaching.precacheAndRoute([{"revision":"ac8a2c772bac8854123f16134bfc5d1b","url":"index.html"},{"revision":"da9fd36499958b244f0b423960d3e4d4","url":"logo192.png"},{"revision":"8cd820b49afd8001abf6f94e40481cb6","url":"logo512.png"},{"revision":"38943ca190e1131db3e0946c63c8fc47","url":"static/css/main.fd8c58c9.chunk.css"},{"revision":"52e5ffa6f87a8d0b57705fe4633a6571","url":"static/js/2.0b2d6e93.chunk.js"},{"revision":"69fea11bfdc667f2ae33e202f6b0cdc9","url":"static/js/3.09bd8990.chunk.js"},{"revision":"1cd8b721c3b60cda3d18def86f5ed086","url":"static/js/main.201541a3.chunk.js"},{"revision":"3cb7eddd0a15b17a96712063045b06dc","url":"static/js/runtime-main.ec0f1d2a.js"}]);
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