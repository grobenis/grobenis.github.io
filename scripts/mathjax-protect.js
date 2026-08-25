'use strict';

// =============================================================================
// LaTeX 公式保护过滤器
// 在 Markdown 渲染之前，将 $...$ 和 $$...$$ 公式替换为占位符，避免
// hexo-renderer-marked 把公式中的 * _ \\ 等当作 Markdown 语法处理；
// 渲染完成后再把占位符恢复为原公式（并对 & < > 做 HTML 转义，保证 MathJax 可渲染）。
//
// 注意：占位符必须挂在 data 对象上（而非模块级变量），否则 hexo 并行渲染
// 多篇文章时会出现竞态覆盖。
// =============================================================================

// 渲染前：保护公式，返回 { content, placeholders }
function protect(content) {
  const placeholders = [];

  // 1. 先整体抽出代码块，公式保护不作用于代码块
  const codeBlocks = [];
  content = content.replace(/```[\s\S]*?```/g, (m) => {
    codeBlocks.push(m);
    return `@@CODEBLOCK_${codeBlocks.length - 1}@@`;
  });

  // 2. 临时隐藏转义的 \$，避免被公式匹配误伤
  content = content.replace(/\\\$/g, '\u0001ESC_DOLLAR\u0001');

  // 3. 保护块级公式 $$...$$
  content = content.replace(/\$\$([\s\S]*?)\$\$/g, (m, p1) => {
    placeholders.push('$$' + p1 + '$$');
    return `@@MJX_${placeholders.length - 1}@@`;
  });

  // 4. 保护行内公式 $...$
  content = content.replace(/\$([^$\r\n]+)\$/g, (m, p1) => {
    if (p1.indexOf('@@MJX_') === -1 && p1.indexOf('@@CODEBLOCK_') === -1) {
      placeholders.push('$' + p1 + '$');
      return `@@MJX_${placeholders.length - 1}@@`;
    }
    return m;
  });

  // 5. 恢复代码块
  content = content.replace(/@@CODEBLOCK_(\d+)@@/g, (m, i) => codeBlocks[+i]);

  // 6. 恢复转义的 \$
  content = content.replace(/\u0001ESC_DOLLAR\u0001/g, '\\$');

  return { content, placeholders };
}

// 渲染后：恢复公式（对 HTML 特殊字符做转义）
function restore(content, placeholders) {
  return content.replace(/@@MJX_(\d+)@@/g, (m, i) => {
    const formula = placeholders[+i];
    if (formula === undefined) return m;
    return formula
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  });
}

hexo.extend.filter.register('before_post_render', (data) => {
  if (!data.content) return;
  const r = protect(data.content);
  data.content = r.content;
  data._mathjaxPlaceholders = r.placeholders;
}, 1);

hexo.extend.filter.register('after_post_render', (data) => {
  if (!data.content || !Array.isArray(data._mathjaxPlaceholders)) return;
  data.content = restore(data.content, data._mathjaxPlaceholders);
}, 99);
