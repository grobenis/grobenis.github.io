/* ===== 脑洞页静态资源压缩（CLI，独立于 hexo 构建） =====
 *
 * 用法：node scripts/minify-brainwave.js
 * 输出：source/brainwave/brainwave.min.js / brainwave.min.css
 *       （作为静态文件提交进仓库，index.md 与 brainwave-sw.js 引用 .min 版本）
 *
 * 为何不用 hexo 的 after_generate hook：
 *   hexo 6.0.0 的 generate 控制台存在回归——after_generate 触发时机早于
 *   public/ 实际写入磁盘，filter 里读到的可能是上一轮的陈旧文件或直接不存在。
 *   因此改为构建前手动执行，产物提交进仓库，构建只做原样拷贝，避免时序问题。
 *
 * 为何需要 require.main 守卫：
 *   hexo 会把 scripts/ 下每个 .js 文件当作插件在启动时 require 一次，
 *   没有守卫时压缩逻辑会在每次 hexo generate 前被连带执行，与 source box
 *   的惰性流式拷贝竞争同一批文件。用 require.main === module 保证仅在
 *   直接以 node 运行本脚本时执行，被 hexo require 时静默空转。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const terser = require('terser');
const CleanCSS = require('clean-css');

const SRC_DIR = path.join(__dirname, '..', 'source', 'brainwave');
const JS_IN = path.join(SRC_DIR, 'brainwave.js');
const JS_OUT = path.join(SRC_DIR, 'brainwave.min.js');
const CSS_IN = path.join(SRC_DIR, 'brainwave.css');
const CSS_OUT = path.join(SRC_DIR, 'brainwave.min.css');

function human(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

async function minifyJs() {
  const code = fs.readFileSync(JS_IN, 'utf8');
  const min = await terser.minify(code, { compress: true, mangle: true });
  if (min.error) throw min.error; // terser 报错时 err 在 result.error
  fs.writeFileSync(JS_OUT, min.code, 'utf8');
  const saved = ((1 - min.code.length / code.length) * 100).toFixed(1);
  console.log(`[minify] ${path.basename(JS_IN)} ${human(code.length)} -> ${human(min.code.length)} bytes (-${saved}%)`);
}

async function minifyCss() {
  const code = fs.readFileSync(CSS_IN, 'utf8');
  const clean = new CleanCSS({ level: 2 }).minify(code);
  if (clean.errors && clean.errors.length) {
    throw new Error(clean.errors.join('; '));
  }
  fs.writeFileSync(CSS_OUT, clean.styles, 'utf8');
  const saved = ((1 - clean.styles.length / code.length) * 100).toFixed(1);
  console.log(`[minify] ${path.basename(CSS_IN)} ${human(code.length)} -> ${human(clean.styles.length)} bytes (-${saved}%)`);
}

if (require.main === module) {
  Promise.all([minifyJs(), minifyCss()])
    .then(() => console.log('[minify] done'))
    .catch((err) => {
      console.error('[minify] FAILED:', err.message);
      process.exit(1);
    });
} else {
  // 被 hexo 当插件 require 时：静默空转，不做任何事
  module.exports = {};
}