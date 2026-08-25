// 修复图片引用 v5：统一处理所有系统性路径问题
// 规则：
//  1. 剥离开头为「本文章 slug」的前缀（markdown 与 raw HTML 两种形式）：
//     slug/f.png | ./slug/f.png | images/slug/f.png | ./images/slug/f.png  ->  f.png
//  2. 反斜杠路径 ..\images\DIR\file  ->  /images/DIR/file
//  3. 已知错误绝对路径修正
const fs = require('fs');
const path = require('path');

const POSTS = path.join(process.cwd(), 'source', '_posts');
const mdFiles = fs.readdirSync(POSTS).filter(f => f.endsWith('.md'));

const SPECIAL = {
  // 文件 -> [{ from, to, desc }] 精确替换（用于无法用通用规则处理的）
  '2020-02-15-VIO_Framework.md': [
    ['![image-20191202135710367](/image/image-20191202135710367.png)',
     '![image-20191202135710367](/images/SLAM/image-20191202135710367.png)', '错误路径 /image/ -> /images/SLAM/'],
    ['![MSCKF对协方差矩阵的增广](/images/SLAM/主流框架推导/MSCKF对协方差矩阵的增广.png)',
     '<!-- 源文件缺失，已注释 -->![MSCKF对协方差矩阵的增广](/images/SLAM/主流框架推导/MSCKF对协方差矩阵的增广.png)<!-- / -->', '源文件不存在，注释'],
    ['![image-20191202161618980](/home/guoben/ICE-BA因子图.png)',
     '<!-- 源文件缺失，已注释 -->![image-20191202161618980](/home/guoben/ICE-BA因子图.png)<!-- / -->', '源文件不存在，注释'],
  ],
  '2020-03-13-Kalman_Filter.md': [
    ['![image-20200330234714941](C:\\Users\\郭犇\\AppData\\Roaming\\Typora\\typora-user-images\\image-20200330234714941.png)',
     '<!-- 本地 Typora 路径源文件缺失，已注释 -->', '本地路径源文件不存在，注释'],
  ],
  '2020-03-14-GMM.md': [
    ['![](D:\\Project\\grobenis.github.io\\images\\HMM\\HMM_nlp.jpg)',
     '![](/images/HMM/HMM_nlp.jpg)', '本地绝对路径 -> /images/HMM/HMM_nlp.jpg'],
  ],
  '2020-08-18-C-开发面试题.md': [
    ['![image-20200818164627077](../../assets/image-20200818164627077.png)',
     '![image-20200818164627077](/assets/image-20200818164627077.png)', '相对路径 -> /assets/'],
  ],
  '2020-05-13-ORB SLAM2 双目稀疏立体匹配.md': [
    ['![image-20200515110530658](Image-blog/双目特征点匹配.png)',
     '![image-20200515110530658](双目特征点匹配.png)', 'Image-blog 图片移入本文章资源目录'],
    ['![image-20200515113540723](Image-blog/亚像素插值.png)',
     '![image-20200515113540723](亚像素插值.png)', 'Image-blog 图片移入本文章资源目录'],
  ],
};

let changed = 0;
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
for (const file of mdFiles) {
  const fp = path.join(POSTS, file);
  let text = fs.readFileSync(fp, 'utf8');
  const orig = text;
  const slug = file.replace(/\.md$/, '');

  // 1a. markdown: slug/f.png | ./slug/f.png  ->  f.png
  text = text.replace(new RegExp(`!\\[([^\\]]*)\\]\\((?:\\./)?${escapeRe(slug)}\\/([^)\\s]+)\\)`, 'g'), (m, alt, fn) => `![${alt}](${fn})`);
  // 1b. markdown: images/slug/f.png | ./images/slug/f.png  ->  f.png
  text = text.replace(new RegExp(`!\\[([^\\]]*)\\]\\((?:\\./)?images\\/${escapeRe(slug)}\\/([^)\\s]+)\\)`, 'g'), (m, alt, fn) => `![${alt}](${fn})`);
  // 1c. raw HTML: <img src="slug/f.png">  ->  <img src="f.png">
  text = text.replace(new RegExp(`(<img src=")${escapeRe(slug)}\/([^"]+)(")`, 'g'), (m, p1, fn, p3) => `${p1}${fn}${p3}`);

  // 2. 反斜杠路径 ..\images\DIR\file -> /images/DIR/file
  text = text.replace(/!\[([^\]]*)\]\(\.\.\\images\\([^\\]+)\\([^)]+)\)/g, (m, alt, dir, fn) => {
    const f = fn.replace(/\\/g, '/');
    return `![${alt}](/images/${dir}/${f})`;
  });

  // 3. 特殊替换
  if (SPECIAL[file]) {
    for (const [from, to, desc] of SPECIAL[file]) {
      if (text.includes(from)) {
        text = text.split(from).join(to);
        console.log(`[${file}] 特殊: ${desc}`);
      } else {
        console.log(`[${file}] !! 未找到特殊替换目标: ${from.slice(0, 60)}...`);
      }
    }
  }

  if (text !== orig) {
    fs.writeFileSync(fp, text);
    changed++;
    // 统计改了多少处
    console.log(`[${file}] 已修改`);
  }
}
console.log(`\n共修改 ${changed} 个文件`);
