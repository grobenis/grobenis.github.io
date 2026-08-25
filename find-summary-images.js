// 扫描所有文章：找出 <!--more--> 之前（摘要区）包含图片的引用
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

const rMore = /<!-- ?more ?-->/i;
const rImgMd = /!\[[^\]]*\]\([^)]+\)/g;      // Markdown 图片
const rImgHtml = /<img[^>]+>/gi;             // HTML img

let found = 0;
for (const f of files) {
  const full = path.join(dir, f);
  const content = fs.readFileSync(full, 'utf8');
  const m = content.match(rMore);
  if (!m) continue;
  const before = content.slice(0, m.index);
  const mdImgs = before.match(rImgMd) || [];
  const htmlImgs = before.match(rImgHtml) || [];
  if (mdImgs.length + htmlImgs.length === 0) continue;
  found++;
  console.log(`\n=== ${f} (摘要区图片 ${mdImgs.length + htmlImgs.length} 张) ===`);
  mdImgs.forEach(i => console.log(`  [md]  ${i}`));
  htmlImgs.forEach(i => console.log(`  [html] ${i}`));
}
console.log(`\n共 ${found} 篇文章摘要区包含图片`);
