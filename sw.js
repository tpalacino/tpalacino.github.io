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
                workbox.precaching.precacheAndRoute([{"revision":"565821506a2048da613a3d7ccb31e291","url":"404.html"},{"revision":"3a2e8f8e6e40cc9d76fbc7544435a135","url":"index.html"},{"revision":"da9fd36499958b244f0b423960d3e4d4","url":"logo192.png"},{"revision":"8cd820b49afd8001abf6f94e40481cb6","url":"logo512.png"},{"revision":"de7442d004132beb0e9789539def0bf5","url":"static/css/main.4d0c65ca.chunk.css"},{"revision":"18cafa475ec5ef041700aed0471ce209","url":"static/js/2.dde504bc.chunk.js"},{"revision":"fc705197b9c0e985917471639cfe530d","url":"static/js/3.d0357653.chunk.js"},{"revision":"080180fd6275ac0262242d8ba880f987","url":"static/js/main.b7f897be.chunk.js"},{"revision":"b9373a04b5ce59c49f6f8f1e1fd6b17d","url":"static/js/runtime-main.36b5836a.js"}]);
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