// 给 atom.xml 注入 xml-stylesheet 处理指令
// 让订阅源在浏览器里不再显示原始 XML，而是渲染成友好的订阅说明页（atom.xsl）
//
// 注意：不能在 after_generate 里直接改 public/ 下的文件——hexo 的 after_generate
// 触发时文件还没真正落盘（写盘发生在之后的 firstGenerate）。干净构建（hexo clean）
// 与 CI（全新 checkout）下 public/atom.xml 尚不存在，写盘会落空或随后被覆盖。
// 正确做法是改内存里的 route 数据，firstGenerate 落盘时自然带上指令。
hexo.extend.filter.register('after_generate', () => {
  const feedPath = (hexo.config.feed && hexo.config.feed.path) || 'atom.xml';
  const routeKey = hexo.route.format(feedPath);
  const stored = hexo.route.routes[routeKey];
  if (!stored || typeof stored.data !== 'string') return;

  let xml = stored.data;
  if (/xml-stylesheet/.test(xml)) return;

  xml = xml.replace(
    /<\?xml[^?]*\?>\s*/,
    (m) => m + '<?xml-stylesheet type="text/xsl" href="/atom.xsl"?>\n'
  );
  hexo.route.set(feedPath, xml);
});