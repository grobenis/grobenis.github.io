// 修复脚本 v2：去掉前导斜杠
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('image-failures.json', 'utf8'));

function readMd(slug) { const p = path.join('source/_posts', slug + '.md'); return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null; }
function writeMd(slug, c) { fs.writeFileSync(path.join('source/_posts', slug + '.md'), c); }
function listDir(d) { return fs.existsSync(d) ? fs.readdirSync(d) : []; }

const fixes = [];
const unfixable = [];

for (const post of data) {
  const slug = post.slug;
  const md = readMd(slug);
  if (!md) continue;
  const sameNameDir = path.join('source/_posts', slug);
  const imagesDir = path.join('source/images', slug);
  const sameNameFiles = listDir(sameNameDir);
  const imagesFiles = listDir(imagesDir);
  const assetsFiles = listDir('source/_posts/assets');
  let newMd = md;
  let postChanged = false;

  for (const fail of post.fails) {
    if (fail.code !== 404 && fail.code !== 0) continue;
    const decodedSrc = decodeURIComponent(fail.src);

    // 模式 A: /<slug>/X 或 <slug>/X  →  X
    const slugPathRe = new RegExp('(^|/)' + slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/([^)\\s]+)');
    let m = decodedSrc.match(slugPathRe);
    if (m) {
      const x = m[2];
      const found = sameNameFiles.find(f => f === x);
      if (found) {
        // 找 markdown 里所有同路径的引用
        const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // 匹配各种写法: ![...](/slug/x), ![alt](slug/x), ![alt](<slug/x>), <img src="slug/x">
        const patterns = [
          new RegExp('!\\[[^\\]]*\\]\\(' + escapedSlug + '/' + x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)', 'g'),
          new RegExp('!\\[[^\\]]*\\]\\(/' + escapedSlug + '/' + x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)', 'g'),
          new RegExp('<img\\s+[^>]*src=["\']' + escapedSlug + '/' + x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\']', 'g'),
        ];
        let changed = false;
        for (const p of patterns) {
          if (p.test(newMd)) {
            newMd = newMd.replace(p, (match) => {
              if (match.startsWith('<img')) {
                return match.replace(/src=["'][^"']+["']/, `src="${found}"`);
              }
              return `![](${found})`;
            });
            changed = true;
          }
        }
        if (changed) {
          fixes.push({ slug, type: 'A:rel', from: `${slug}/${x}`, to: `![](${found})` });
          postChanged = true;
          continue;
        }
        unfixable.push({ slug, src: fail.src, reason: '找到图但 markdown 里搜不到引用: ' + x });
        continue;
      }
      unfixable.push({ slug, src: fail.src, reason: '同目录无文件: ' + x });
      continue;
    }

    // 模式 B: /images/<slug>/X
    m = decodedSrc.match(/(^|\/)images\/([^/]+)\/([^)\\s]+)/);
    if (m) {
      const dirSlug = m[2];
      const x = m[3];
      // 看同名资源目录
      const foundInPost = sameNameFiles.find(f => f === x);
      if (foundInPost) {
        const escImg = 'images/' + dirSlug + '/' + x;
        const patterns = [
          new RegExp('!\\[[^\\]]*\\]\\(' + escImg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)', 'g'),
          new RegExp('!\\[[^\\]]*\\]\\(/' + escImg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)', 'g'),
        ];
        let changed = false;
        for (const p of patterns) {
          if (p.test(newMd)) { newMd = newMd.replace(p, `![](${foundInPost})`); changed = true; }
        }
        if (changed) {
          fixes.push({ slug, type: 'B:images→rel', from: `/images/${dirSlug}/${x}`, to: `![](${foundInPost})` });
          postChanged = true;
          continue;
        }
      }
      // 看 source/images/<dirSlug>
      const foundInImages = imagesFiles.find(f => f === x);
      if (foundInImages) {
        // 保持原样
        unfixable.push({ slug, src: fail.src, reason: 'KEEP - 在 source/images/ 但有 404，需重建' });
        continue;
      }
      unfixable.push({ slug, src: fail.src, reason: '/images/slug/X 在两处都无' });
      continue;
    }

    // 模式 C: /aseets/X 拼写 → /assets/X
    m = decodedSrc.match(/(^|\/)aseets\/([^)\\s]+)/);
    if (m) {
      const x = m[2];
      const found = assetsFiles.find(f => f === x);
      if (found) {
        const pat = new RegExp('!\\[[^\\]]*\\]\\((?:/)?aseets/' + x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)', 'g');
        if (pat.test(newMd)) {
          newMd = newMd.replace(pat, `![](/assets/${x})`);
          fixes.push({ slug, type: 'C:aseets→assets', from: `aseets/${x}`, to: `/assets/${x}` });
          postChanged = true;
          continue;
        }
      }
      unfixable.push({ slug, src: fail.src, reason: '/aseets/ 拼写且 source/_posts/assets/ 也无此图' });
      continue;
    }

    // 远程图床
    if (/^https:\/\//.test(decodedSrc)) {
      unfixable.push({ slug, src: fail.src, reason: '远程图床（用户处理）' });
      continue;
    }
    unfixable.push({ slug, src: fail.src, reason: '其他 - 待人工检查' });
  }

  if (postChanged) writeMd(slug, newMd);
}

console.log('=== 自动修复 ===');
const groups = {};
for (const f of fixes) (groups[f.type] = groups[f.type] || []).push(f);
for (const [k, v] of Object.entries(groups)) {
  console.log(`\n[${k}] ${v.length}`);
  v.slice(0, 4).forEach(f => console.log(`  ${f.slug} | ${f.from} → ${f.to}`));
  if (v.length > 4) console.log(`  ... ${v.length - 4} more`);
}

console.log('\n=== 未能修复 ===');
const unfixGroups = {};
for (const u of unfixable) (unfixGroups[u.reason] = unfixGroups[u.reason] || []).push(u);
for (const [k, v] of Object.entries(unfixGroups)) {
  console.log(`  [${k}] ${v.length}`);
  v.slice(0, 2).forEach(u => console.log(`    ${u.slug} | ${u.src}`));
}

fs.writeFileSync('unfixable.json', JSON.stringify(unfixable, null, 2));
console.log(`\n总计：自动修复 ${fixes.length} 处，未修复 ${unfixable.length} 处`);
