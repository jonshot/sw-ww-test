const VERSION = 'v1_';
const CONTENT_CACHE = VERSION + 'content';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CONTENT_CACHE).then((cache) => {
      return cache.addAll([
        '/',
        '/default.js',
        '/page2.html',
        '/page2.js',
        '/response.json',
        '/placeholder.png',
        'https://i1.adis.ws/i/Amplience/pic-masthead2400-shutterstock359568800-mid-HQ?qlt=75&w=600&h=267&crop={50%-300},{50%-133.5},600,267'
      ]).catch(err => console.log('Error', err));
    }));
});

self.addEventListener('activate', (event) => {

});

self.addEventListener('fetch', (event) => {
  let params = event.request.url.split('?');
  let serveJson = params.length > 1;

  if (serveJson && event.request.url.startsWith(event.request.referrer)) {
    event.respondWith(fetch(new Request('/response.json')));
    return;
  }
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        console.log('cached response', response);
        return response || fetch(new Request(event.request.url)).then((response) => {
          return caches.open(CONTENT_CACHE).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
      .catch(() => {
        // caches.match('/placeholder.png');
      })
  );
});

self.addEventListener('message', (event) => {
  let channel = new MessageChannel();
  clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage(event.data, [channel.port2]));
  });
});