// 给正文图片补 decoding="async"
// marked.lazyload 已为正文图片加上原生 loading="lazy"，
// 这里再统一补 decoding="async"，让浏览器异步解码图片、减少主线程占用。
hexo.extend.filter.register('after_post_render', (data) => {
  ['content', 'excerpt'].forEach((key) => {
    if (typeof data[key] === 'string') {
      data[key] = data[key].replace(
        /<img\s(?![^>]*\bdecoding=)(?=[^>]*>)/g,
        '<img decoding="async" '
      );
    }
  });
  return data;
});