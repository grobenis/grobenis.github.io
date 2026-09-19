'use strict';

// =============================================================================
// 私人空间页密码注入
// -----------------------------------------------------------------------------
// 目标：让「页面密码」不必以明文形式出现在任何进入公开仓库的文件里。
//
// 来源优先级：
//   1. 环境变量 PRIVATE_PAGE_PASSWORD（CI 里由 GitHub Secret 提供）
//   2. 页面 front-matter 里的 password（本地预览时用）
//
// 为什么不直接把带密码的 index.md 提交进公开仓库：即使构建产物是加密的，
// 提交明文 markdown 也等于公开了要保护的内容本身。所以明文源码只存在于
// 本机与私有仓库 grobenis/blog-private，公开仓库只有加密后的 HTML。
//
// 注意：
//   * hexo 会并行渲染多个页面，这里只读写当前 data 对象，不用模块级状态。
//   * 过滤器只在文件被“重新处理”时运行；改了本文件或换 env 后要验证效果，
//     需先 `hexo clean`，否则 hexo 会跳过未变动文件、沿用上次渲染结果。
// =============================================================================

const rPrivatePage = /^private\//;

hexo.extend.filter.register('before_post_render', (data) => {
  if (!data || typeof data.source !== 'string') return;
  if (!rPrivatePage.test(data.source)) return;
  const fromEnv = process.env.PRIVATE_PAGE_PASSWORD;
  if (fromEnv === undefined || fromEnv === '') return;
  data.password = fromEnv;
  return data;
}, 5);
