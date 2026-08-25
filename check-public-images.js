// 检查 public/ 生成 HTML 中每个 <img> 引用路径，是否真实存在于 public 目录
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(process.cwd(), 'public');

function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}

function existsPublic(relUrl) {
  // relUrl like /2020/02/15/slug/image.png
  const filePath = path.join(PUBLIC, decodeURIComponent(relUrl));
  return fs.existsSync(filePath);
}

(async () => {
  const htmlFiles = walk(PUBLIC).filter(f => f.endsWith('index.html') && f.includes(path.sep + 'index.html'));
  const broken = [];
  let totalImg = 0, ok = 0;
  for (const f of htmlFiles) {
    let html = fs.readFileSync(f, 'utf8');
    // 去掉 HTML 注释块，避免注释内的 <img> 被误判
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    const imgs = [...new Set([...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]))];
    const rel = f.substring(PUBLIC.length + 1).replace(/\\/g, '/').replace(/index\.html$/, '');
    for (const src of imgs) {
      if (/^(#|\/\/|http(s)?:)/.test(src)) continue; // 绝对/远程
      totalImg++;
      if (src.startsWith('/')) {
        if (existsPublic(src)) { ok++; continue; }
        broken.push({ page: rel, src, reason: 'public 中不存在' });
      } else {
        // 相对路径: 浏览器会相对当前页面解析
        const resolved = path.posix.normalize(rel + src);
        if (existsPublic('/' + resolved)) { ok++; continue; }
        broken.push({ page: rel, src, reason: `相对路径解析后 public 中不存在 -> /${resolved}` });
      }
    }
  }
  console.log(`总图片引用(站内): ${totalImg}, OK: ${ok}, BROKEN: ${broken.length}`);
  const byPage = {};
  for (const b of broken) {
    if (!byPage[b.page]) byPage[b.page] = [];
    byPage[b.page].push(b.src);
  }
  const pages = Object.keys(byPage);
  console.log(`受影响页面数: ${pages.length}`);
  pages.sort();
  for (const p of pages) {
    console.log(`\n[${p}]`);
    byPage[p].forEach(s => console.log(`   ${s}`));
  }
  fs.writeFileSync('local-broken.json', JSON.stringify(broken, null, 2));
})();
