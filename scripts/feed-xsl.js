// 给 atom.xml 注入 xml-stylesheet 处理指令
// 让订阅源在浏览器里不再显示原始 XML，而是渲染成友好的订阅说明页（atom.xsl）
const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('after_generate', () => {
  const feedPath = path.join(
    hexo.public_dir,
    (hexo.config.feed && hexo.config.feed.path) || 'atom.xml'
  );
  if (!fs.existsSync(feedPath)) return;
  let xml = fs.readFileSync(feedPath, 'utf8');
  if (/xml-stylesheet/.test(xml)) return;
  xml = xml.replace(
    /<\?xml[^?]*\?>\s*/,
    (m) => m + '<?xml-stylesheet type="text/xsl" href="/atom.xsl"?>\n'
  );
  fs.writeFileSync(feedPath, xml);
});