const version = 'v1_';
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(version + 'content').then((cache) => {
    return cache.addAll([
    ]);
  }));
});

self.addEventListener('message', (msg) => {
  
});