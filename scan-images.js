const fs = require('fs');
const path = require('path');
const POSTS_DIR = path.join(process.cwd(), 'source', '_posts');
const posts = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const cats = { ok: 0, missing: 0, remote: 0 };
const byPost = {};
const detailMissing = [];

for (const post of posts) {
  const postPath = path.join(POSTS_DIR, post);
  const slug = post.replace(/\.md$/, '');
  const text = fs.readFileSync(postPath, 'utf8');
  const mdRe = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const htmlRe = /<img[^>]+src=["']([^"']+)["']/gi;
  const refs = new Set();
  let m;
  while ((m = mdRe.exec(text))) refs.add(m[1]);
  while ((m = htmlRe.exec(text))) refs.add(m[1]);
  for (const ref of refs) {
    if (/^(https?:|data:|\/\/)/i.test(ref)) { cats.remote++; continue; }
    const cands = [
      path.join(POSTS_DIR, ref),
      path.join(POSTS_DIR, slug, ref),
      path.join(POSTS_DIR, slug, path.basename(ref)),
      path.join(process.cwd(), 'source', 'images', ref),
      path.join(process.cwd(), 'source', 'images', slug, path.basename(ref)),
    ];
    const found = cands.find(p => p && fs.existsSync(p));
    if (found) cats.ok++;
    else {
      cats.missing++;
      byPost[slug] = (byPost[slug] || 0) + 1;
      detailMissing.push({ post: slug, ref });
    }
  }
}

console.log('=== 汇总 ===');
console.log('OK 引用（本地有图）:  ', cats.ok);
console.log('远程引用（http/data）: ', cats.remote);
console.log('MISSING（找不到）:    ', cats.missing);
console.log('\n=== 哪些文章有问题（按缺失数排序）===');
Object.entries(byPost).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  '+v+'\t'+k));
console.log('\n=== 全部缺失引用（精简）===');
detailMissing.forEach(d => console.log(d.post + ' | ' + d.ref));
