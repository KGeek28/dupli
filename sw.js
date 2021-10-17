const cache_name = "dupliv1"

self.addEventListener('install', event => {
    event.waitUntil(
        self.skipWaiting(),
        
        caches.open(cache_name).then(cache => {
            return cache.addAll([
                '/',
                '/assets/images/dupli.png',
                '/assets/images/dupli192.png',
                '/assets/js/index.js',
                '/favicon.ico',
                '/manifest.json',
                '/404.html'
            ])
        })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        self.clients.claim()
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {

                fetch(event.request).then(res => {
                    if (res.ok) {
                        caches.open(cache_name).then(cache => {
                            cache.add(event.request)
                        })
                    }
                })

                return response
            } else {
                if (event.request.destination == 'document') {
                    return caches.match('/404.html')
                } else {
                    return fetch(event.request).then(res => {
                        if (!res.ok) {
                            throw new TypeError('[SW] Ressource not found')
                        }
                        caches.open(cache_name).then(cache => {
                            cache.add(event.request)
                        })
                    })
                }
            }
        })
    )
})