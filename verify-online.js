// 抓取所有文章页面，提取 <img> src，HEAD 检查每个图片
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const POSTS = path.join(process.cwd(), 'source', '_posts');
const mdFiles = fs.readdirSync(POSTS).filter(f => f.endsWith('.md'));

function fetch(url) {
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
    lib.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, res => {
      resolve(res.statusCode);
    }).on('error', () => resolve(0)).on('timeout', () => resolve(0)).end();
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
  const postUrls = mdFiles.map(m => {
    const text = fs.readFileSync(path.join(POSTS, m), 'utf8');
    const fm = parseFrontMatter(text);
    const slug = m.replace(/\.md$/, '');
    const date = (fm.date || '').split(' ')[0];
    if (!date) return null;
    const [y, mo, d] = date.split('-');
    return { file: m, slug, url: `https://grobenis.github.io/${y}/${mo}/${d}/${slug}/` };
  }).filter(Boolean);

  console.log(`共 ${postUrls.length} 篇文章，开始抓取并检查图片...\n`);

  const failList = [];
  let checked = 0, ok = 0;
  for (const { file, slug, url } of postUrls) {
    let r;
    try { r = await fetch(url); } catch (e) { console.log(`[PAGE ERROR] ${slug}: ${e.message}`); continue; }
    if (r.status !== 200) { console.log(`[PAGE ${r.status}] ${slug}: ${url}`); continue; }
    const imgs = [...new Set([...r.body.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]))];
    if (imgs.length === 0) continue;
    const fails = [];
    const sample = [];
    for (const src of imgs) {
      // 跳过远程 URL
      if (src.startsWith('http') && !src.includes('grobenis.github.io')) continue;
      if (src.startsWith('//api.qrserver.com')) continue;
      const full = src.startsWith('http') ? src : 'https://grobenis.github.io' + src;
      const code = await head(full);
      checked++;
      if (code === 200) ok++;
      else { fails.push({ src, code }); }
    }
    if (fails.length) {
      console.log(`[${slug}]  ${fails.length}/${imgs.length} 张图加载失败`);
      fails.forEach(f => console.log(`    ${f.code}  ${f.src}`));
      failList.push({ slug, fails });
    }
  }
  const total = failList.reduce((s, x) => s + x.fails.length, 0);
  console.log(`\n=== 总结 ===`);
  console.log(`总检查: ${checked}, OK: ${ok}, 失败: ${total}`);
  fs.writeFileSync('online-failures.json', JSON.stringify(failList, null, 2));
  console.log(`失败清单已写入 online-failures.json`);
})();
