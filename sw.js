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
                workbox.precaching.precacheAndRoute([{"revision":"dd1888d900bf68085d25112bf223a329","url":"index.html"},{"revision":"da9fd36499958b244f0b423960d3e4d4","url":"logo192.png"},{"revision":"8cd820b49afd8001abf6f94e40481cb6","url":"logo512.png"},{"revision":"644c5d67267ce5d73fd2598cfc6c0fef","url":"static/css/main.f612f586.chunk.css"},{"revision":"9a35e32846fdebbe9f0cd36c4cfcec57","url":"static/js/2.a76a99ec.chunk.js"},{"revision":"fc705197b9c0e985917471639cfe530d","url":"static/js/3.d0357653.chunk.js"},{"revision":"215ed14fd971fada8175956c7e88a247","url":"static/js/main.21a6fce9.chunk.js"},{"revision":"b9373a04b5ce59c49f6f8f1e1fd6b17d","url":"static/js/runtime-main.36b5836a.js"}]);
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