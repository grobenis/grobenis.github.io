// 检查 source/_posts 下所有 md：每个文件第一个 more 标记之前是否已插入"总结段落 + > **金句**"
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

const rMore = /<!-- ?more ?-->/i;

let ok = 0;
let issues = [];
let noMore = [];

for (const f of files) {
  const full = path.join(dir, f);
  let content;
  try {
    content = fs.readFileSync(full, 'utf8');
  } catch (e) {
    issues.push(`${f}: 读取失败 ${e.message}`);
    continue;
  }
  const m = content.match(rMore);
  if (!m) { noMore.push(f); continue; }
  const before = content.slice(0, m.index).trim();
  // 金句行
  const hasQuote = /^> \*\*.+\*\*$/m.test(before);
  // 金句行在 more 前且前面还有非空内容（总结段落）
  const lines = before.split(/\r?\n/);
  const lastLine = lines[lines.length - 1].trim();
  const hasSummary = lines.length >= 3;
  if (!hasQuote) {
    issues.push(`${f}: 缺少 "> **金句**" 引用块。more 前内容尾部: [${before.slice(-80)}]`);
  } else if (!hasSummary) {
    issues.push(`${f}: 金句前似乎没有总结段落`);
  } else {
    ok++;
  }
}

console.log(`总文件: ${files.length}`);
console.log(`正常(含引用块金句): ${ok}`);
console.log(`无 more 标记: ${noMore.length} ${noMore.join(', ')}`);
console.log(`异常: ${issues.length}`);
issues.forEach(i => console.log('  - ' + i));
