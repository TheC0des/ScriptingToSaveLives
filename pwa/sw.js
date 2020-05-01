const staticCacheName = 's2sl-pwa';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/faq/index.html',
  '/donate/index.html',
  '/code/index.html',
  '/about/index.html',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
  'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
  'https://code.jquery.com/jquery-3.3.1.slim.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
  'https://cdn.glitch.com/8faceb1e-d174-438f-91d5-8835cbbc3765%2Fcode-1557582_1280.jpg?v=1587042906390',
  'https://cdn.glitch.com/8faceb1e-d174-438f-91d5-8835cbbc3765%2Fdownload.jpeg?v=1587042730643',
  'https://cdn.glitch.com/8faceb1e-d174-438f-91d5-8835cbbc3765%2Fbloomberg-chart-charts-finance-1520777.jpg?v=1587042664190',
  'https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.woff2',
  'https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-brands-400.woff2',
  'https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-solid-900.woff2',
  'https://use.fontawesome.com/releases/v5.7.2/webfonts/fa-brands-400.woff2',
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});