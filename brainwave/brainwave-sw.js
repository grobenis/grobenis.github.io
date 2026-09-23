/* ===== 脑洞页 Service Worker =====
 * 缓存策略：
 *   - brainwave.min.css / brainwave.min.js：CacheFirst（永久缓存，二次秒开）
 *   - 6 张封面图、4 张季节图、2 张卡面本地图：CacheFirst
 *   - dolls/toys 图片：StaleWhileRevalidate
 *   - 导航请求：NetworkFirst，失败回退缓存（支持离线访问脑洞页）
 * 注：.min.js/.min.css 是 scripts/minify-brainwave.js 的构建产物，随仓库提交。
 */
var CACHE_NAME = 'brainwave-v4-20260903';
var STATIC_CACHE = [
  '/brainwave/',
  // 构建产物（scripts/minify-brainwave.js 生成）
  '/brainwave/brainwave.min.css',
  '/brainwave/brainwave.min.js',
  // 1 张四季窗卡面小窗（本地化外链图）
  '/brainwave/images/os-window-mini.webp',
  // 1 张公主房间背景（本地化外链图）
  '/brainwave/images/os-room.webp',
  // 6 张扎小人封面
  '/brainwave/images/voodoo/没担当.webp',
  '/brainwave/images/voodoo/不高兴.webp',
  '/brainwave/images/voodoo/小气鬼.webp',
  '/brainwave/images/voodoo/心机鬼.webp',
  '/brainwave/images/voodoo/窝囊废.webp',
  '/brainwave/images/voodoo/和稀泥.webp',
  // 4 张四季窗外景
  '/brainwave/images/seasons/spring.webp',
  '/brainwave/images/seasons/summer.webp',
  '/brainwave/images/seasons/autumn.webp',
  '/brainwave/images/seasons/winter.webp'
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
  return url.indexOf('/brainwave/brainwave.min.css') !== -1
      || url.indexOf('/brainwave/brainwave.min.js') !== -1
      || url.indexOf('/brainwave/images/voodoo/') !== -1
      || url.indexOf('/brainwave/images/seasons/') !== -1
      || url.indexOf('/brainwave/images/os-') !== -1;
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