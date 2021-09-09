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
                workbox.precaching.precacheAndRoute([{"revision":"ce944e586535462b12bf41f0ae42097f","url":"index.html"},{"revision":"da9fd36499958b244f0b423960d3e4d4","url":"logo192.png"},{"revision":"8cd820b49afd8001abf6f94e40481cb6","url":"logo512.png"},{"revision":"ec540491cc4807111affcc3be79bd18e","url":"static/css/main.88cdb182.chunk.css"},{"revision":"320a297e5fc0aeef911bf968fd37a3bf","url":"static/js/2.754a7bfa.chunk.js"},{"revision":"4ee67d9e94d47ee5cd2e633e8ebea796","url":"static/js/3.92336853.chunk.js"},{"revision":"7d6441aab64a7a7864cc5da70983f5d9","url":"static/js/main.bc03067a.chunk.js"},{"revision":"78925ae3b60ee524b2f2fd768ad6cb2c","url":"static/js/runtime-main.bb58e0cf.js"}]);
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