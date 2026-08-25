// 精确扫描（排除代码块）：空标题、H1 滥用、层级跳跃、代码行误判标题
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

const rHeading = /^(#{1,6})[ \t]*(.*)$/;
const rCodeLine = /^(#\s*(include|ifndef|define|endif|pragma)|#\s*[a-z])/i; // C/C++预处理/注释/指令

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const lines = body.split(/\r?\n/);
  let inCode = false;
  const headings = [];
  const codeLike = [];
  lines.forEach((l, idx) => {
    if (/^\s*```/.test(l)) { inCode = !inCode; return; }
    if (inCode) return;
    const m = l.match(rHeading);
    if (m) {
      // 判断是否疑似代码行（非标题）
      const text = m[2].trim();
      if (rCodeLine.test(l) || /^#\s*include/.test(l)) {
        codeLike.push({ line: idx + 1, level: m[1].length, text: l.trim() });
      } else {
        headings.push({ level: m[1].length, text, line: idx + 1, raw: l.trim() });
      }
    }
  });

  const problems = [];
  headings.filter(h => !h.text).forEach(h => problems.push(`空标题: L${h.line} ${'#'.repeat(h.level)}`));
  const h1 = headings.filter(h => h.level === 1);
  if (h1.length > 1) problems.push(`多个H1(${h1.length}个): ${h1.map(h => `L${h.line}`).join(',')} "${h1.map(h=>h.text.slice(0,25)).join(' | ')}"`);
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1) {
      problems.push(`层级跳跃: L${headings[i-1].line}(H${headings[i-1].level}) -> L${headings[i].line}(H${headings[i].level}) "${headings[i].text.slice(0,25)}"`);
    }
  }
  if (codeLike.length) {
    console.log(`\n=== ${f} ===`);
    console.log(`  ! 代码行被误判为标题(${codeLike.length}处):`);
    codeLike.forEach(c => console.log(`      L${c.line} ${c.text.slice(0, 60)}`));
    continue;
  }
  if (problems.length) {
    console.log(`\n=== ${f} ===`);
    problems.forEach(p => console.log(`  ! ${p}`));
  }
}
