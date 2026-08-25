// 4 篇文章标题整体提升一级（H3->H2, H4->H3, H5->H4, H6->H5），使正文从 H2 起
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'source', '_posts');
const upFiles = [
  '2022-05-31-SLAM_Feature_detecter.md',
  '2022-05-31-ORBSLAM3.md',
  '2020-04-14-OPENCV-Function.md',
  '2022-7-25-时间戳同步.md',
];

for (const f of upFiles) {
  const full = path.join(dir, f);
  const lines = fs.readFileSync(full, 'utf8').split(/\r?\n/);
  let inCode = false;
  let count = 0;
  const out = lines.map(l => {
    if (/^\s*```/.test(l)) { inCode = !inCode; return l; }
    if (inCode) return l;
    const m = l.match(/^(#{3,6})([ \t].*)?$/); // 仅 H3+ 提升
    if (m) {
      const lv = m[1].length;
      if (lv < 6) {
        count++;
        return '#'.repeat(lv - 1) + (m[2] || '');
      }
    }
    return l;
  });
  fs.writeFileSync(full, out.join('\n'), 'utf8');
  console.log(`${f}: 提升 ${count} 处标题`);
}
console.log('完成。');
