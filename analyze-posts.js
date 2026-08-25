// 分析所有文章的"合格度"：字数、行数、图片、代码块、占位标记、相似度
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

function parseFront(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = m[1];
  const get = (k) => {
    const x = fm.match(new RegExp('^' + k + ':\\s*(.+)$', 'm'));
    return x ? x[1].trim().replace(/^["']|["']$/g, '') : '';
  };
  return { title: get('title'), date: get('date'), categories: get('categories'), tags: get('tags') };
}

const rows = [];

for (const f of files) {
  const full = path.join(dir, f);
  const content = fs.readFileSync(full, 'utf8');
  const fm = parseFront(content);
  // 去掉 front matter 后的正文
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const lines = body.split(/\r?\n/);
  const nonEmptyLines = lines.filter(l => l.trim().length > 0).length;
  // 中文字符数
  const zh = (body.match(/[\u4e00-\u9fa5]/g) || []).length;
  const totalChars = body.replace(/\s/g, '').length;
  // 图片数（markdown 或 html img）
  const imgs = (body.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length + (body.match(/<img[^>]+>/gi) || []).length;
  // 代码块行数
  const codeBlocks = body.match(/```[\s\S]*?```/g) || [];
  const codeLines = codeBlocks.reduce((a, b) => a + b.split(/\r?\n/).length, 0);
  // 占位标记
  const placeholderWords = ['占位', '待补充', '未完', 'TODO', '待更新', '留待', '内容待'];
  const hitPh = placeholderWords.filter(w => body.includes(w));
  rows.push({
    f, title: fm.title, date: fm.date,
    zh, totalChars, nonEmptyLines, imgs, codeLines,
    ph: hitPh.join(','),
    bodyLen: body.length
  });
}

// 按中文字数排序输出
rows.sort((a, b) => a.zh - b.zh);
console.log('=== 按正文中文字数升序排列 ===');
for (const r of rows) {
  console.log(
    `${String(r.zh).padStart(5)} 字 | 行${String(r.nonEmptyLines).padStart(3)} | 图${String(r.imgs).padStart(2)} | 码${String(r.codeLines).padStart(4)} | 占位[${r.ph || '-'}] | ${r.title || '(无)'} | ${r.f}`
  );
}

// 相似度检测（正文纯文本按连续中文/英文词切分后做 shingle 比较）
function shingles(s, k = 5) {
  const set = new Set();
  for (let i = 0; i + k <= s.length; i++) set.add(s.slice(i, i + k));
  return set;
}
function norm(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[!\[\]\(\)<>=#*`_>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
console.log('\n=== 相似度 >= 0.7 的文章对（疑似重复/高度相似）===');
const texts = rows.map(r => ({ f: r.f, t: norm(fs.readFileSync(path.join(dir, r.f), 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---/, '')) }));
for (let i = 0; i < texts.length; i++) {
  for (let j = i + 1; j < texts.length; j++) {
    const a = shingles(texts[i].t);
    const b = shingles(texts[j].t);
    if (!a.size || !b.size) continue;
    let inter = 0;
    for (const s of a) if (b.has(s)) inter++;
    const sim = inter / (a.size + b.size - inter);
    if (sim >= 0.7) console.log(`${sim.toFixed(2)} | ${texts[i].f}  <->  ${texts[j].f}`);
  }
}
console.log('\n=== 空行比例异常（大量空行 = 内容稀疏）===');
