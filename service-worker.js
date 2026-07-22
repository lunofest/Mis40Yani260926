const CACHE_NAME = 'cache-v35';
const RESOURCES_TO_PRECACHE = [
    '/',
    'index.html?v35',
    'css/styles.css?v35',
    'js/script.js?v35',
    'main.js?v35',
    'cache.js?v35'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(RESOURCES_TO_PRECACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    // Clean up old caches
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    // Check if the request is for an image
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    // Update the cache with the latest version of the image
                    cache.put(event.request, response.clone());
                    return response;
                }).catch(function () {
                    return caches.match(event.request).then(function (cached) {
                        return cached || new Response('', { status: 404, statusText: 'Not Found' });
                    });
                });
            })
        );
    } else {
        // For other resources, serve from cache if available, otherwise fetch from network
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            }).catch(function () {
                return fetch(event.request);
            })
        );
    }
});




/*const CACHE_NAME = 'cache-v145'; // Use a static or manually managed version
const RESOURCES_TO_PRECACHE = [
    'estilos/normalize.css?v145',
    'estilos/styles.css?v145',
    'estilos/mediaQueries.css?v145',
    'javascript/script.js?v145',
    'assets/imagenes?v145',
    'assets/imagenes/promo1.webp?v145',
    'assets/imagenes/promo2.webp?v145',
    'assets/imagenes/promo3.webp?v145',
    'assets/imagenes/promo4.webp?v145',
    'assets/imagenes/promo5.webp?v145',
    'assets/imagenes/promo6.webp?v145',
    'assets/imagenes/promo7.webp?v145',
    'assets/vectores?v143',
    // Add more resources here
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(RESOURCES_TO_PRECACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    // Clean up old caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return fetch(event.request).then(function(response) {
                // Actualizar el cache con la versión más reciente del recurso
                cache.put(event.request, response.clone());
                return response;
            }).catch(function() {
                return caches.match(event.request);
            });
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        }).catch(function() {
            return fetch(event.request);
        })
    );
});*/
