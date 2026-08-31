/* ===== 脑洞页 Service Worker =====
 * 缓存策略：
 *   - brainwave.css/js：CacheFirst（永久缓存，二次秒开）
 *   - 6 张封面图、4 张季节图：CacheFirst
 *   - dolls/toys 图片：StaleWhileRevalidate
 *   - 导航请求：NetworkFirst，失败回退缓存（支持离线访问脑洞页）
 */
var CACHE_NAME = 'brainwave-v1-20260904';
var STATIC_CACHE = [
  '/brainwave/',
  '/brainwave/brainwave.css',
  '/brainwave/brainwave.js',
  // 6 张扎小人封面
  '/brainwave/images/voodoo/没担当.jpg',
  '/brainwave/images/voodoo/不高兴.jpg',
  '/brainwave/images/voodoo/小气鬼.jpg',
  '/brainwave/images/voodoo/心机鬼.jpg',
  '/brainwave/images/voodoo/窝囊废.jpg',
  '/brainwave/images/voodoo/和稀泥.jpg',
  // 4 张四季窗外景
  '/brainwave/images/seasons/spring.jpg',
  '/brainwave/images/seasons/summer.jpg',
  '/brainwave/images/seasons/autumn.jpg',
  '/brainwave/images/seasons/winter.jpg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_CACHE);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k !== CACHE_NAME;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function isStaticAsset(url) {
  return url.indexOf('/brainwave/brainwave.css') !== -1
      || url.indexOf('/brainwave/brainwave.js') !== -1
      || url.indexOf('/brainwave/images/voodoo/') !== -1
      || url.indexOf('/brainwave/images/seasons/') !== -1;
}

function isBrainwaveImage(url) {
  return url.indexOf('/brainwave/images/') !== -1;
}

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = req.url;

  // 只处理同源请求
  var sameOrigin = url.indexOf(self.location.origin) === 0;
  if (!sameOrigin) return;

  // 仅作用于脑洞页静态文件，避免污染主站
  if (url.indexOf('/brainwave/') === -1 && url.indexOf('/images/') === -1 && url.indexOf('/css/') === -1 && url.indexOf('/js/') === -1) {
    return;
  }

  // 静态资源：CacheFirst
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(req).then(function (cached) {
        if (cached) return cached;
        return fetch(req).then(function (res) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
          return res;
        });
      })
    );
    return;
  }

  // 脑洞页其他图片：StaleWhileRevalidate
  if (isBrainwaveImage(url)) {
    event.respondWith(
      caches.match(req).then(function (cached) {
        var network = fetch(req).then(function (res) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
          return res;
        }).catch(function () { return cached; });
        return cached || network;
      })
    );
    return;
  }

  // 导航请求：NetworkFirst（支持离线访问脑洞页）
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match('/brainwave/').then(function (cached) {
          return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
        });
      })
    );
  }
});