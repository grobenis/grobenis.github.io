// 深入分析所有图片问题的脚本
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const POSTS = path.join(ROOT, 'source', '_posts');
const IMAGES = path.join(ROOT, 'source', 'images');

// ============ 1. 检测乱码文件名 ============
function looksMojibake(s) {
  // 启发式：含 0x80-0xFF 范围但被以 UTF-8 字符串方式处理的字符
  return /[¬¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿]/.test(s) ||
         /[\u00C0-\u00DF][\u0080-\u00BF]/.test(s) ||  // 拉丁-1 序列
         /[\u00A0-\u00FF]{3,}/.test(s);  // 连续西欧字符
}

function tryDecodeMojibake(s) {
  // 尝试把 latin-1 字符当作 GBK 字节重新解释
  try {
    const buf = Buffer.from(s, 'binary');
    const decoded = buf.toString('gbk');
    if (decoded && !looksMojibake(decoded) && /[\u4e00-\u9fff]/.test(decoded)) {
      return decoded;
    }
  } catch (e) {}
  return null;
}

function walkAllFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkAllFiles(p, list);
    else list.push(p);
  }
  return list;
}

console.log('=== 1. source/images 下所有乱码文件 ===');
const imgs = walkAllFiles(IMAGES);
const mojibakeFiles = imgs.filter(f => looksMojibake(path.basename(f)));
console.log('总数:', imgs.length, '  乱码:', mojibakeFiles.length);
for (const f of mojibakeFiles) {
  const rel = path.relative(ROOT, f);
  const dec = tryDecodeMojibake(path.basename(f));
  console.log('  ' + rel + '  → ' + (dec || '(无法解码)'));
}

console.log('\n=== 2. source/_posts/ 下同名资源目录里的乱码文件 ===');
const postDirs = fs.readdirSync(POSTS, { withFileTypes: true })
  .filter(e => e.isDirectory() || e.name.endsWith('.md'));
let postMojibake = 0;
for (const d of postDirs) {
  if (!d.isDirectory()) continue;
  const p = path.join(POSTS, d.name);
  const files = walkAllFiles(p);
  for (const f of files) {
    if (looksMojibake(path.basename(f))) {
      const dec = tryDecodeMojibake(path.basename(f));
      console.log('  ' + path.relative(ROOT, f) + '  → ' + (dec || '(无法解码)'));
      postMojibake++;
    }
  }
}
console.log('  共:', postMojibake);

// ============ 3. 已知问题模式分析 ============
console.log('\n=== 3. 各类问题模式统计（从全部 markdown 引用）===');
const mdFiles = fs.readdirSync(POSTS).filter(f => f.endsWith('.md'));
const patterns = {
  '绝对路径 /images/...': 0,
  '绝对路径 /image/...': 0,
  'typora 缓存 C:\\...': 0,
  'typora 缓存 D:\\...': 0,
  'OneDrive 路径': 0,
  'Nutstore 路径': 0,
  'Linux 路径 /home/...': 0,
  'aseets 拼写错误': 0,
  '远程 http(s)': 0,
  '正常本地相对': 0,
  '其他': 0,
};
const patternSamples = {};
for (const m of mdFiles) {
  const text = fs.readFileSync(path.join(POSTS, m), 'utf8');
  const re = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let r;
  while ((r = re.exec(text))) {
    const ref = r[1];
    let key = '其他';
    if (/^https?:/.test(ref)) key = '远程 http(s)';
    else if (/^\/images\//.test(ref)) key = '绝对路径 /images/...';
    else if (/^\/image\//.test(ref)) key = '绝对路径 /image/...';
    else if (/^C:\\.*Typora/.test(ref)) key = 'typora 缓存 C:\\...';
    else if (/^D:\\/.test(ref)) key = 'typora 缓存 D:\\...';
    else if (/OneDrive/.test(ref)) key = 'OneDrive 路径';
    else if (/Nutstore/.test(ref)) key = 'Nutstore 路径';
    else if (/^\/home\//.test(ref)) key = 'Linux 路径 /home/...';
    else if (/aseets\//.test(ref)) key = 'aseets 拼写错误';
    else if (/^[\w\-\.\/]+\.(png|jpg|jpeg|gif|webp|svg)$/i.test(ref) || /^\.\//.test(ref)) key = '正常本地相对';
    patterns[key] = (patterns[key] || 0) + 1;
    if (!patternSamples[key]) patternSamples[key] = { file: m, ref };
  }
}
for (const [k, v] of Object.entries(patterns)) {
  console.log('  ' + v + '\t' + k + (patternSamples[k] ? '  例: ' + patternSamples[k].file + ' → ' + patternSamples[k].ref : ''));
}
