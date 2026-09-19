'use strict';

// =============================================================================
// search.xml 瘦身
// -----------------------------------------------------------------------------
// hexo-generator-search 会把每篇文章的**完整正文 HTML** 塞进 search.xml。
// 实测 70 篇文章 ≈ 1.35MB，而站内搜索真正用到的只是：
//   1. 判断关键词是否出现在标题/正文里；
//   2. 在命中位置前后截约 100 字做展示。
// 也就是说整份全文 HTML 里，标签本身、以及每篇很靠后的正文都是白传的
// （首屏不会拉它，但用户一聚焦搜索框就要下完）。
//
// 这里把每条 <content> 压成纯文本并截断，保留“搜得到”的能力，
// 丢掉“把全文搬到浏览器”的开销。标题、链接不受影响。
//
// 注意：与 scripts/feed-xsl.js 同理，必须改内存里的 route 数据而不是写 public/，
// 因为 after_generate 触发时文件还没落盘，CI 全新 checkout 时更是不存在。
// =============================================================================

const LIMIT = Number(process.env.SEARCH_CONTENT_LIMIT) > 0
  ? Number(process.env.SEARCH_CONTENT_LIMIT)
  : 1200; // 每条 entry 保留的正文字符数

// 只解码不含 < > 的实体：既提升可检索性（路径里的斜杠），
// 又不会把原始 `<` 重新引入索引 —— 站内搜索是把它直接插进 innerHTML 的。
function decodeSafeEntities(s) {
  return s
    .replace(/&#x2F;/gi, '/')
    .replace(/&#47;/g, '/')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function htmlToSearchText(html) {
  return decodeSafeEntities(
    String(html)
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ') // 标签
  )
    .replace(/\s+/g, ' ')
    .trim();
}

hexo.extend.filter.register('after_generate', () => {
  const searchPath = (hexo.config.search && hexo.config.search.path) || 'search.xml';
  const routeKey = hexo.route.format(searchPath);
  const stored = hexo.route.routes[routeKey];
  if (!stored || typeof stored.data !== 'string') return;

  const before = stored.data.length;

  const xml = stored.data.replace(
    /<content([^>]*)>([\s\S]*?)<\/content>/g,
    (whole, attrs, inner) => {
      const cdata = /^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/.exec(inner);
      const raw = cdata ? cdata[1] : inner;
      let text = htmlToSearchText(raw);
      if (text.length > LIMIT) text = text.slice(0, LIMIT) + ' …';
      // CDATA 段内不允许出现 "]]>"，截断后理论上不会，但仍需保证良构
      text = text.replace(/\]\]>/g, ']] >');
      return `<content${attrs}><![CDATA[${text}]]></content>`;
    }
  );

  hexo.route.set(searchPath, xml);

  const saved = ((before - xml.length) / 1024).toFixed(0);
  hexo.log.info(
    `search.xml slimmed: ${(before / 1024).toFixed(0)} KB -> ${(xml.length / 1024).toFixed(0)} KB ` +
    `(saved ${saved} KB, per-entry limit ${LIMIT} chars)`
  );
});
