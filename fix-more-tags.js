// 全站统一双 more 标记：保留第一个（统一为 <!--more-->），删除其余 more 标记所在行
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

const rMoreLine = /^\s*<!--\s*more\s*-->\s*$/i;

let multiCount = 0;
for (const f of files) {
  const full = path.join(dir, f);
  const lines = fs.readFileSync(full, 'utf8').split(/\r?\n/);
  let seen = 0;
  const out = lines.map(line => {
    if (rMoreLine.test(line)) {
      seen++;
      if (seen === 1) return '<!--more-->';
      return null; // 标记删除该行
    }
    return line;
  });
  if (seen > 1) {
    const cleaned = out.filter(l => l !== null).join('\n');
    fs.writeFileSync(full, cleaned, 'utf8');
    console.log(`${f}: 清理了 ${seen} 个 more 标记 -> 保留 1 个`);
    multiCount++;
  }
}
console.log(`\n共 ${multiCount} 个文件含双/多 more 标记，已统一。`);
