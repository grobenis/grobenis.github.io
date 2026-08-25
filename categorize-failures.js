// 按失败模式分类统计 image-failures.json
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('image-failures.json', 'utf8'));

const cats = {
  '站点根相对 /slug/...（缺日期前缀）': [],
  '站点根相对 /images/slug/...': [],
  '站点根相对 /aseets/...（拼写错误）': [],
  '站点根相对 /image/...（单数 image）': [],
  '远程 zhimg.com 405': [],
  '远程 lunwenstudy 不可达': [],
  '相对路径（缺 base，code 0）': [],
  '其他': [],
};

for (const post of data) {
  for (const f of post.fails) {
    const src = decodeURIComponent(f.src);
    let key = '其他';
    if (f.code === 0) key = '相对路径（缺 base，code 0）';
    else if (/^https:\/\/pic[23]\.zhimg\.com/.test(src)) key = '远程 zhimg.com 405';
    else if (/lunwenstudy\.com/.test(src)) key = '远程 lunwenstudy 不可达';
    else if (/^\/aseets\//.test(src)) key = '站点根相对 /aseets/...（拼写错误）';
    else if (/^\/image\/[^/]/.test(src)) key = '站点根相对 /image/...（单数 image）';
    else if (/^\/images\/[^\/]+\//.test(src)) key = '站点根相对 /images/slug/...';
    else if (/^\/2020-08-06-/.test(src) || /^\/2020-03-24-/.test(src) || /^\/2020-03-26-/.test(src) || /^\/2020-03-28-/.test(src) || /^\/2020-03-30-/.test(src) || /^\/2020-04-04-/.test(src) || /^\/2020-04-23-/.test(src) || /^\/2020-05-15-/.test(src) || /^\/2020-08-18-/.test(src) || /^\/2020-08-31-/.test(src) || /^\/2020-09-14-/.test(src) || /^\/2020-09-19-/.test(src) || /^\/2021-06-19-/.test(src) || /^\/2021-07-04-/.test(src) || /^\/2022-05-31-/.test(src) || /^\/2022-7-/.test(src) || /^\/计算机网络/.test(src) || /^\/Generate-/.test(src)) {
      key = '站点根相对 /slug/...（缺日期前缀）';
    }
    cats[key].push({ post: post.slug, src, code: f.code });
  }
}

for (const [k, v] of Object.entries(cats)) {
  console.log(`\n=== ${k} (${v.length}) ===`);
  v.slice(0, 8).forEach(x => console.log(`  [${x.post}] ${x.src}`));
  if (v.length > 8) console.log(`  ... 还有 ${v.length - 8} 个`);
}
const total = Object.values(cats).reduce((s, x) => s + x.length, 0);
console.log(`\n总计: ${total}`);
