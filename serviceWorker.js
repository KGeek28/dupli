this.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v3').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/assets/js/alpine.min.js',
                '/assets/js/index.js',
                '/assets/styles/index.css',
                '/404.html'
            ])
        })
    )
})

this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).catch(() => {
            return fetch(event.request).then(res => {
                return caches.open('v1').then(cache => {
                    cache.put(event.request, res.clone())
                    return res
                })
            })
        }).catch(() => {
            return caches.match('/404.html')
        })
    )
})

this.addEventListener('activate', event => {
    var cacheWhileList = ['v2']

    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (cacheWhileList.indexOf(key) === -1) {
                    return caches.delete(key)
                }
            }))
        })
    )
})