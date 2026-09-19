'use strict';

// =============================================================================
// <meta name="generator"> 注入
// -----------------------------------------------------------------------------
// 上游 ayer 主题这里有两个问题（本仓库已修）：
//   1. 硬编码输出 hexo-theme-yilia-plus —— ayer 派生自 yilia-plus，这行是
//      上游遗留的复制粘贴，写的不是本站实际在用的主题；
//   2. 开关读的是 scripts/default_config.js 里写死的 true，导致站点
//      _config.yml 里的 meta_generator 完全不生效，想关也关不掉。
//
// 现在：主题名取站点配置的 theme（回退主题配置 / 'ayer'）；开关与 hexo 内核
// 读同一个键，改一处即可整体生效。想彻底去掉这行，在 _config.yml 里写
// meta_generator: false。
//
// 注：这是对 themes/ayer/ 内文件的修改（偏离「只改 _config.ayer.yml」的约定），
// 因为该开关此前没有任何从站点配置到达的路径。升级主题时需重新应用。
// =============================================================================

const defaultConfig = require('../default_config');

// 开关来源：优先站点 _config.yml 的 meta_generator，其次主题配置，最后默认值。
//
// 为什么以站点配置为准：`meta_generator` 同时也是 **hexo 内核**的开关
// （内核会补一条 <meta name="generator" content="Hexo x.y.z">）。若主题这边
// 单独关掉、站点那边还是 true，结果不是“没有 generator”，而是变成内核那条，
// 反而多暴露一个框架版本号。两边读同一个键，才能一关就干净。
//
// 关闭方式：在 _config.yml 写 meta_generator: false（主题与内核两条同时消失）。
// 注意 _config.ayer.yml 是主题配置，改那里的同名键不会影响本站点这个键。
function resolveEnabled(hexo) {
  const site = hexo.config && hexo.config.meta_generator;
  if (typeof site === 'boolean') return site;
  const theme = hexo.theme && hexo.theme.config;
  if (theme && typeof theme.meta_generator === 'boolean') return theme.meta_generator;
  return defaultConfig.meta_generator;
}

function resolveThemeName(hexo) {
  const candidates = [
    hexo.config && hexo.config.theme,
    hexo.theme && hexo.theme.config && hexo.theme.config.theme,
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim();
  }
  return 'ayer';
}

module.exports = function createMetaGenerator(hexo) {
  return function hexoMetaGeneratorInject(data) {
    if (!resolveEnabled(hexo)) return;
    if (!data || data.match(/<meta\s+name=['|"]?generator['|"]?/i)) return;

    const tag = `\n  <meta name="generator" content="${resolveThemeName(hexo)}">`;
    return data.replace('</title>', '</title>' + tag);
  };
};
