'use strict';

// =============================================================================
// 关于页数据源：构建期产出 /about-feed.json
// -----------------------------------------------------------------------------
// 关于页最后一屏要显示「共 N 篇 / 起止年份 / 最近更新 / 高频标签」。这几个数字
// 每发一篇就会变，写死在 md 里必然越放越旧，所以挪到构建期算好，页面在浏览器
// 里 fetch 一次 —— 代价是多一个 <2KB 的请求，换掉的是「关于页的数字永远比归档
// 页旧一截」这个注定会发生的错。
//
// 输出只有聚合结果和最近几篇的标题/日期/链接，不含正文，所以不做加密处理，
// 与 search.xml 同级公开。
//
// 页面侧还留了一份服务端写死的兜底数字：fetch 失败（离线、被拦截、部署时
// 文件没跟上）或浏览器禁用 JS 时显示它，不会出现空白的统计区。
// =============================================================================

var RECENT_N = 4; // 与第 5 屏 `head -4 ~/posts` 的行数保持一致
var TOP_TAG_N = 8;

// hexo 的 Tag 上有 length 这个虚拟字段（关联文章数），但不同版本行为不一致。
// 与其猜，不如直接从文章反推 —— 反正这里本来就要遍历 posts。顺带保证标签的
// 计数口径与标签云页完全一致。
function countByName(posts, field) {
  var map = Object.create(null);
  posts.forEach(function (post) {
    var list = post[field];
    if (!list || typeof list.each !== 'function') return;
    list.each(function (item) {
      if (item && item.name) map[item.name] = (map[item.name] || 0) + 1;
    });
  });
  return map;
}

function topN(map, n) {
  return Object.keys(map)
    .map(function (name) {
      return { name: name, count: map[name] };
    })
    .sort(function (a, b) {
      // 计数相同时按名称排，避免每次构建顺序抖动（构建产物应该是确定的）
      return b.count - a.count || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    })
    .slice(0, n);
}

hexo.extend.generator.register('about-feed', function (locals) {
  var posts = locals.posts.sort('-date').toArray();
  if (!posts.length) return;

  var newest = posts[0];
  var oldest = posts[posts.length - 1];

  var payload = {
    generated: new Date().toISOString().slice(0, 10),
    posts: posts.length,
    // 分类与标签都从文章反推，不用 locals.categories.length —— 后者把没有
    // 文章的空分类也算进去（实测 20），而 /categories/ 页只列有文章的 17 个。
    // 关于页和分类页对不上会比数字本身旧更扎眼。
    categories: Object.keys(countByName(posts, 'categories')).length,
    tags: Object.keys(countByName(posts, 'tags')).length,
    since: oldest.date.format('YYYY'),
    until: newest.date.format('YYYY'),
    updated: newest.date.format('YYYY-MM-DD'),
    topTags: topN(countByName(posts, 'tags'), TOP_TAG_N),
    recent: posts.slice(0, RECENT_N).map(function (post) {
      return {
        title: post.title || '(无标题)',
        date: post.date.format('YYYY-MM-DD'),
        url: '/' + post.path,
      };
    }),
  };

  return {
    path: 'about-feed.json',
    data: JSON.stringify(payload),
  };
});
