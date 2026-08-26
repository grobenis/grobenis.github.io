// 精简 tags：删除无意义标签、合并重复/错误标签
const fs = require('fs');
const path = require('path');

const postsDir = 'd:/Blog/source/_posts';

// 合并映射：旧标签 → 新标签
const MAP = {
  'Androd': '安卓',
  'opencv': 'OpenCV',
  'Nerf': 'NeRF',
  'Work': '工作',
  'String': '字符串',
  '堆': '优先队列',
  '图像': '图像处理',
  '层次聚类': '聚类',
  'ORBSLAM': 'ORB-SLAM2',
  'ORBSLAM2': 'ORB-SLAM2',
  'C': 'C++',
  '笔试': '面试',
  '求职': '面试',
  'LeeCode': 'LeetCode',
};

// 删除（无意义/太泛）
const REMOVE = new Set([
  '刷题', '每日打卡', '学习', '开发', '特性', '综述',
  '优化', '初始化', '代码阅读', '数字计算，计算几何',
]);

let report = [];
let totalChanged = 0;

for (const file of fs.readdirSync(postsDir)) {
  if (!file.endsWith('.md')) continue;
  const p = path.join(postsDir, file);
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  let tagIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^tags:/.test(lines[i])) { tagIdx = i; break; }
    if (i > 0 && /^---\s*$/.test(lines[i])) break;
  }
  if (tagIdx === -1) continue;

  const raw = lines[tagIdx].replace(/^tags:\s*/, '').trim();
  if (!raw) continue;

  let tags = [];
  if (raw.startsWith('[')) {
    tags = raw.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
  } else {
    tags = [raw];
  }

  const before = tags.slice();
  const seen = new Set();
  const after = [];
  let changed = false;

  for (const t of tags) {
    let tag = MAP[t] !== undefined ? MAP[t] : t;
    if (REMOVE.has(t)) { changed = true; continue; }
    if (seen.has(tag)) { changed = true; continue; } // 去重
    seen.add(tag);
    after.push(tag);
  }

  if (changed || after.join(',') !== before.join(',')) {
    if (after.length === 0) {
      // 标签清空：删除 tags 行
      lines.splice(tagIdx, 1);
      report.push(`${file}: 删除全部标签 [${before.join(',')}]`);
    } else {
      lines[tagIdx] = 'tags: [' + after.join(', ') + ']';
      report.push(`${file}: [${before.join(',')}] -> [${after.join(',')}]`);
    }
    fs.writeFileSync(p, lines.join('\n'), 'utf8');
    totalChanged++;
  }
}

fs.writeFileSync('d:/Blog/tags-report.txt',
  '修改文件数: ' + totalChanged + '\n\n' + report.join('\n'), 'utf8');
console.log('完成，共修改 ' + totalChanged + ' 个文件');
