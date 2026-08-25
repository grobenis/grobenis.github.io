// 全面本地验证：检查所有文章的本地图片引用是否正常
const http = require('http');
const fs = require('fs');
const path = require('path');

const POSTS = path.join(process.cwd(), 'source', '_posts');

function get(url) {
  return new Promise(resolve => {
    http.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', () => resolve({ status: 0, body: '' }));
  });
}
function head(url) {
  return new Promise(resolve => {
    http.request(url, { method: 'HEAD' }, res => resolve(res.statusCode)).on('error', () => resolve(0)).end();
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
  const mdFiles = fs.readdirSync(POSTS).filter(f => f.endsWith('.md'));
  let totalPass = 0, totalFail = 0;
  const failed = [];

  for (const m of mdFiles) {
    const slug = m.replace(/\.md$/, '');
    const md = fs.readFileSync(path.join(POSTS, m), 'utf8');
    const fm = parseFrontMatter(md);
    const date = (fm.date || '').split(' ')[0];
    if (!date) continue;
    const [y, mo, d] = date.split('-');
    const articleUrl = `http://localhost:4010/${y}/${mo}/${d}/${slug}/`;

    const { body: articleHtml, status } = await get(articleUrl);
    if (status !== 200) continue;

    const imgs = [...new Set([...articleHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]))];
    let pass = 0, fail = 0;
    for (const src of imgs) {
      if (src.startsWith('http')) continue;
      if (src.startsWith('//api.qrserver.com')) continue;
      const testUrl = src.startsWith('/') ? `http://localhost:4010${src}` : `${articleUrl}${src}`;
      const code = await head(testUrl);
      if (code === 200) pass++;
      else { fail++; failed.push({ slug, src, code }); }
    }
    totalPass += pass;
    totalFail += fail;
    if (fail > 0) console.log(`[${slug}] ${pass} pass, ${fail} fail`);
  }

  console.log(`\n=== 总计：${totalPass} pass, ${totalFail} fail ===`);
  if (failed.length > 0) {
    console.log('\n失败图片详情:');
    for (const f of failed) console.log(`  ${f.slug} | ${f.code} | ${f.src}`);
  }
})();
