// 扫描所有文章的 LaTeX 公式：找未闭合、环境不配对、left/right 不配对等问题
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

let totalIssues = 0;

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // 去掉 front matter
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const lines = body.split(/\r?\n/);

  let inCode = false;
  const issues = [];
  let dollarCount = 0;

  lines.forEach((l, i) => {
    if (/^\s*```/.test(l)) { inCode = !inCode; return; }
    if (inCode) return;
    // 忽略转义的 \$ 
    const cleaned = l.replace(/\\\$/g, '');
    // 统计 $ 数量
    const dCount = (cleaned.match(/\$/g) || []).length;
    dollarCount += dCount;

    // 检查 \begin{env} 与 \end{env} 配对（按行统计，跨行先不管，整体统计）
    const begins = (l.match(/\\begin\{([^}]+)\}/g) || []).map(x => x);
    const ends = (l.match(/\\end\{([^}]+)\}/g) || []).map(x => x);
    if (begins.length !== ends.length) {
      issues.push(`L${i+1}: \\begin 与 \\end 数量不一致 (begin:${begins.length} end:${ends.length}) "${l.trim().slice(0,50)}"`);
    }
    // 检查行内 \left 与 \right 不配对
    const lefts = (l.match(/\\left/g) || []).length;
    const rights = (l.match(/\\right/g) || []).length;
    if (lefts !== rights) {
      issues.push(`L${i+1}: \\left(${lefts}) 与 \\right(${rights}) 数量不一致 "${l.trim().slice(0,50)}"`);
    }
    // 检查 \frac 后无 {（明显错误）
    if (/\\frac(?!\{)[^_a-zA-Z{]/.test(l)) {
      issues.push(`L${i+1}: \\frac 后缺少 { "${l.trim().slice(0,50)}"`);
    }
    // 检查单独成对但公式里含未转义 & （非表格环境）
    if (/\$[^$]*&[^$]*\$/.test(l)) {
      issues.push(`L${i+1}: 行内公式含 & 对齐符 "${l.trim().slice(0,50)}"`);
    }
  });

  if (dollarCount % 2 !== 0) {
    issues.push(`全文 $ 数量为奇数(${dollarCount})，存在未闭合的行内公式`);
  }

  if (issues.length) {
    totalIssues += issues.length;
    console.log(`\n=== ${f} ===`);
    issues.slice(0, 10).forEach(x => console.log(`  ! ${x}`));
    if (issues.length > 10) console.log(`  ... 共 ${issues.length} 个问题`);
  }
}
console.log(`\n扫描完成，共 ${totalIssues} 个疑似问题`);
