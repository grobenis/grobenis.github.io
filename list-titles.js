// 列出所有文章的 front matter title 与长度，供评估修改
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

for (const f of files) {
  const full = path.join(dir, f);
  const content = fs.readFileSync(full, 'utf8');
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  let title = '(无title)';
  if (m) {
    const tm = m[1].match(/^title:\s*(.+)$/m);
    if (tm) title = tm[1].trim().replace(/^["']|["']$/g, '');
  }
  console.log(`${title.length}\t${title}\t| ${f}`);
}
