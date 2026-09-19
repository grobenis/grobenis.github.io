'use strict';

// =============================================================================
// 页面级「按需加载」判定
// -----------------------------------------------------------------------------
// 主题原先在**每个**页面都加载 MathJax、justifiedGallery、PhotoSwipe，
// 而实际用得到的页面很少（实测：168 个页面全都加载 MathJax，真正含公式的
// 只有三十多篇）。这里按「这个页面到底会渲染出什么」来判断。
//
// 判定依据必须和模板保持一致，否则会漏渲染：
//   * 文章/独立页：page.content 就是最终正文
//   * 加密页：page.content 已被替换成密文容器，明文在 page.origin
//   * 首页分页：article.ejs 渲染的是 post.excerpt，没有 excerpt 时才回退 post.content
//   * 归档/标签/分类页：只渲染标题与日期（archive-post.ejs），不含正文
//     —— 所以只在 is_home() 时才去看 page.posts
//
// 判定只读取渲染期 locals，不保存跨页面状态（hexo 并行渲染多个页面）。
// =============================================================================

// 行内 $...$ / 块级 $$...$$ / \( \) / \[ \]
const rMath = /\$\$[\s\S]*?\$\$|\$[^$\r\n]{1,600}\$|\\\(|\\\[/;
const rImg = /<img[\s>]/i;

// MathJax 自身的 skipTags 就是 script/noscript/style/textarea/pre/code，
// mathjax-protect.js 也不保护代码块里的公式 —— 所以这些区域里的 "$"
// 既不会被渲染，也不该算作“本页需要 MathJax”。
// 独立页（games/brainwave 等）正文里带大段内联 <script>，不剔除会全部误判。
function stripNonProse(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code[\s\S]*?<\/code>/gi, ' ');
}

function bodyStrings(locals) {
  const page = (locals && locals.page) || {};
  const out = [];
  const push = (s) => {
    if (typeof s === 'string' && s) out.push(stripNonProse(s));
  };

  push(page.content);
  push(page.origin); // 加密页的明文
  push(page.excerpt);

  const isHome = typeof locals.is_home === 'function' && locals.is_home();
  const posts = page.posts;
  if (isHome && posts && typeof posts.each === 'function') {
    posts.each(function (post) {
      if (!post) return;
      // 与 article.ejs 的渲染分支保持一致
      if (post.excerpt) push(post.excerpt);
      else push(post.content);
    });
  }
  return out;
}

function anyMatch(locals, re) {
  return bodyStrings(locals).some(function (s) {
    return re.test(s);
  });
}

// 需要 MathJax：页面正文（或首页摘要）里真的出现了公式
hexo.extend.helper.register('need_mathjax', function () {
  return anyMatch(this, rMath);
});

// 需要 justifiedGallery：只有配了 albums 的文章才渲染 #gallery
hexo.extend.helper.register('need_justified_gallery', function () {
  const page = this.page || {};
  return !!(page.albums && page.albums.length);
});

// 需要 PhotoSwipe：正文/摘要里存在可点击放大的图片
hexo.extend.helper.register('need_photoswipe', function () {
  const page = this.page || {};
  if (page.albums && page.albums.length) return true;
  if (page.photos && page.photos.length) return true;
  return anyMatch(this, rImg);
});
