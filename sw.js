/* 站内 Service Worker：网络优先 + 有界缓存 + 明确的离线兜底
 *
 * 与旧版（'blog-v1'）的差别，都是旧版实测会踩的坑：
 *   1. 不再无条件缓存响应 —— 旧版连 404/500 都会写进缓存；
 *   2. 跳过 Range 请求 —— 音乐播放器拖动进度会发 Range，缓存这种响应没意义；
 *   3. 缓存有上限 —— 旧版无限增长，把整站几十 MB 图片都留在 CacheStorage；
 *   4. 离线兜底不再一律返回首页 —— 旧版图片/CSS 取不到时也会拿到首页 HTML，
 *      浏览器把它当成图片解析失败，看起来像“图挂了/样式炸了”；
 *      现在导航请求给缓存页或离线页，其它资源明确回 504。
 * 缓存名带日期：改缓存策略时同步改这里，旧缓存会在 activate 阶段被清掉。
 */
var CACHE = 'blog-v2-20260919';
var MAX_ENTRIES = 150;

var OFFLINE_HTML = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>离线 · 曾是少年</title><style>' +
  'body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;' +
  'background:#1e1e1e;color:#bbb;font-family:-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;' +
  'text-align:center;padding:20px}a{color:#61a3f8;text-decoration:none}' +
  'h1{font-size:20px;color:#fff;font-weight:500;margin:0 0 12px}p{font-size:15px;line-height:1.8;color:#888;margin:0}' +
  '</style></head><body><div><h1>现在处于离线状态</h1>' +
  '<p>这个页面还没有被缓存下来。<br>联网后刷新，或先回到<a href="/">首页</a>。</p></div></body></html>';

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// 只缓存“值得缓存”的响应
function isCacheable(req, res) {
  if (!res || !res.ok) return false;              // 404/500 不入缓存
  if (res.type !== 'basic') return false;         // 跳过 opaque / CORS 响应
  if (req.headers.get('range')) return false;     // Range（音频拖动）不缓存
  return true;
}

// 超出上限时删掉最早写入的条目
function trim(cache) {
  return cache.keys().then(function (keys) {
    if (keys.length <= MAX_ENTRIES) return;
    var excess = keys.slice(0, keys.length - MAX_ENTRIES);
    return Promise.all(excess.map(function (k) { return cache.delete(k); }));
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return; // 跳过跨域 CDN

  e.respondWith(
    fetch(req).then(function (res) {
      if (isCacheable(req, res)) {
        var copy = res.clone();
        caches.open(CACHE)
          .then(function (c) { return c.put(req, copy).then(function () { return trim(c); }); })
          .catch(function () {});
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (cached) {
        if (cached) return cached;
        if (req.mode === 'navigate') {
          return caches.match('/').then(function (home) {
            return home || new Response(OFFLINE_HTML, {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          });
        }
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
