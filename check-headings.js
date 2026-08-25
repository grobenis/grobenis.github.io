// 全面体检：所有文章标题结构（排除代码块）
// 1) 任何 H1 行（无论是否唯一）——列出内容供人工判断
// 2) 空标题
// 3) 层级跳跃
// 4) 正文首标题层级 > H2
// 5) 代码块外的代码行被误判为标题（# include/define/pragma/ifndef/endif 或含代码特征）
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

const rHeading = /^(#{1,6})[ \t]*(.*)$/;
const codeLikeText = /^(include|define|pragma|ifndef|endif|undef|ifdef|error|import|using|namespace)/;
const codeChar = /[=<>{};()\[\]]|->|::/;  // 标题中含代码特征符号

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const lines = body.split(/\r?\n/);
  let inCode = false;
  const heads = [];
  lines.forEach((l, i) => {
    if (/^\s*```/.test(l)) { inCode = !inCode; return; }
    if (inCode) return;
    const m = l.match(rHeading);
    if (m) heads.push({ level: m[1].length, text: m[2].trim(), line: i + 1, raw: l });
  });

  const issues = [];

  // 空标题
  heads.filter(h => !h.text).forEach(h => issues.push(`空标题 L${h.line} ${'#'.repeat(h.level)}`));

  // H1
  const h1s = heads.filter(h => h.level === 1);
  h1s.forEach(h => issues.push(`H1滥用 L${h.line}: "${h.text.slice(0, 40)}"`));

  // 层级跳跃
  for (let i = 1; i < heads.length; i++) {
    if (heads[i].level - heads[i - 1].level > 1) {
      issues.push(`层级跳跃 L${heads[i].line}(H${heads[i].level}): "${heads[i].text.slice(0, 30)}" (前一个 L${heads[i-1].line} H${heads[i-1].level})`);
    }
  }

  // 首标题层级
  if (heads.length && heads[0].level > 2) {
    issues.push(`首标题层级过高 H${heads[0].level} L${heads[0].line}: "${heads[0].text.slice(0, 30)}"`);
  }

  // 代码行误判（代码块外）
  heads.forEach(h => {
    if (codeLikeText.test(h.text) || codeChar.test(h.text)) {
      issues.push(`疑似代码当标题 L${h.line} H${h.level}: "${h.text.slice(0, 40)}"`);
    }
  });

  if (issues.length) {
    console.log(`\n=== ${f} ===`);
    issues.forEach(x => console.log(`  ! ${x}`));
  }
}
console.log('\n=== 检查完毕 ===');
