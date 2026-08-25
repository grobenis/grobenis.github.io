// 从 source/_posts 提取 date + slug 构造正确 URL，再 HEAD 检查图片
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const POSTS = path.join(process.cwd(), 'source', '_posts');
const mdFiles = fs.readdirSync(POSTS).filter(f => f.endsWith('.md'));

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data, finalUrl: res.responseUrl || url }));
    }).on('error', reject);
  });
}
function head(url) {
  return new Promise(resolve => {
    const lib = url.startsWith('https') ? https : http;
    lib.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      resolve(res.statusCode);
    }).on('error', () => resolve(0)).end();
  });
}
function parseFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  m[1].split('\n').forEach(line => {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '');
  });
  return fm;
}

(async () => {
  // 收集每篇文章 URL
  const postUrls = mdFiles.map(m => {
    const text = fs.readFileSync(path.join(POSTS, m), 'utf8');
    const fm = parseFrontMatter(text);
    const slug = m.replace(/\.md$/, '');
    const date = (fm.date || '').split(' ')[0]; // 2020-02-15
    if (!date) return null;
    const [y, mo, d] = date.split('-');
    return { file: m, slug, url: `https://grobenis.github.io/${y}/${mo}/${d}/${slug}/` };
  }).filter(Boolean);

  console.log(`共 ${postUrls.length} 篇文章，开始抓取并检查图片...\n`);

  const failList = [];
  let checked = 0;
  for (const { file, slug, url } of postUrls) {
    let r;
    try { r = await get(url); } catch (e) { console.log(`[PAGE ERROR] ${slug}: ${e.message}`); continue; }
    if (r.status !== 200) { console.log(`[PAGE ${r.status}] ${slug}: ${url}`); continue; }
    const imgs = [...new Set([...r.body.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]))];
    if (imgs.length === 0) continue;
    const fails = [];
    // 限制每篇最多检查 30 张防超时
    for (const src of imgs.slice(0, 30)) {
      const full = src.startsWith('http') ? src : 'https://grobenis.github.io' + src;
      if (full.includes('api.qrserver.com')) continue; // 跳过二维码
      const code = await head(full);
      if (code !== 200) fails.push({ src, code });
      checked++;
    }
    if (fails.length) {
      console.log(`[${slug}]  ${fails.length} 张图加载失败 (${imgs.length} 总)`);
      fails.forEach(f => console.log(`    ${f.code}  ${f.src}`));
      failList.push({ slug, fails });
    }
  }
  const total = failList.reduce((s, x) => s + x.fails.length, 0);
  console.log(`\n=== 总计：${total} 张图加载失败（已检查 ${checked} 张） ===`);
  // 输出到 JSON 供后续修复脚本使用
  fs.writeFileSync('image-failures.json', JSON.stringify(failList, null, 2));
  console.log('详情已保存到 image-failures.json');
})();
