// 格式修复：
// 1) 指定面试题库文章：正文标题整体降一级（H1->H2, ... H5->H6, H6 保持）
// 2) 全站：迭代修复标题层级跳跃（cur > prev+1 时降为 prev+1）
// 3) 全站：删除空标题行（#+ 后无内容）
// 4) 检查残留 fancybox 锚点
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

// 需要整体降级的文章（H1 滥用）
const demoteFiles = new Set([
  '2020-08-18-C-开发面试题.md',
  '2020-09-11-面试经典代码题.md',
  '2020-08-06-SLAM面试题汇总.md',
]);

const rHeading = /^(#{1,6})([ \t].*)?$/;   // 标题行
const rEmptyHeading = /^#{1,6}[ \t]*$/;     // 空标题

function processFile(f) {
  const full = path.join(dir, f);
  const lines = fs.readFileSync(full, 'utf8').split(/\r?\n/);
  let inCode = false;
  const hIdx = []; // 代码块外的标题行下标
  const lineIsCode = [];
  lines.forEach((l, i) => {
    if (/^\s*```/.test(l)) { inCode = !inCode; lineIsCode[i] = true; return; }
    lineIsCode[i] = inCode;
    if (!inCode && rHeading.test(l)) hIdx.push(i);
  });

  let changes = [];

  // 1) 整体降级
  if (demoteFiles.has(f)) {
    for (const i of hIdx) {
      const l = lines[i];
      const m = l.match(/^(#{1,6})/);
      if (!m) continue;
      const lv = m[1].length;
      if (lv < 6) {
        const nl = '#'.repeat(lv + 1) + l.slice(lv);
        lines[i] = nl;
        changes.push(`降级 L${i + 1}: ${l.slice(0, 40)} -> ${nl.slice(0, 40)}`);
      }
    }
  }

  // 3) 删除空标题行（标记为空串，最后统一过滤）
  for (const i of hIdx) {
    if (rEmptyHeading.test(lines[i])) {
      changes.push(`删空标题 L${i + 1}: "${lines[i]}"`);
      lines[i] = '\u0000DELETE\u0000';
    }
  }

  // 2) 迭代修复层级跳跃
  for (let round = 0; round < 10; round++) {
    let fixed = 0;
    const hh = [];
    lines.forEach((l, i) => {
      if (l === '\u0000DELETE\u0000' || lineIsCode[i]) return;
      const m = l.match(/^(#{1,6})/);
      if (m) hh.push({ i, lv: m[1].length, line: i + 1 });
    });
    for (let k = 1; k < hh.length; k++) {
      const prev = hh[k - 1], cur = hh[k];
      if (cur.lv > prev.lv + 1) {
        const nl = '#'.repeat(prev.lv + 1) + lines[cur.i].slice(cur.lv);
        changes.push(`跳级修复 L${cur.line}: H${cur.lv} -> H${prev.lv + 1} "${lines[cur.i].slice(cur.lv).slice(0, 30)}"`);
        lines[cur.i] = nl;
        cur.lv = prev.lv + 1;
        fixed++;
      }
    }
    if (!fixed) break;
  }

  // 4) 残留锚点检查
  let anchor = 0;
  for (const l of lines) {
    if (/<a href="#gid|#&gid=/.test(l)) { anchor++; changes.push(`残留锚点: ${l.slice(0, 50)}`); }
  }

  const out = lines.filter(l => l !== '\u0000DELETE\u0000').join('\n');
  if (changes.length) {
    fs.writeFileSync(full, out, 'utf8');
    console.log(`\n=== ${f} === (${changes.length} 处)`);
    changes.slice(0, 12).forEach(c => console.log(`  ${c}`));
    if (changes.length > 12) console.log(`  ... 共 ${changes.length} 处`);
  }
}

files.forEach(processFile);
console.log('\n完成。');
