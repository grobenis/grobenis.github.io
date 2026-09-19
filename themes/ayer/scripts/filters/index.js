'use strict';

const metaGeneratorPath = './meta_generator';

module.exports = hexo => {
  /* const {
    filter
  } = hexo.extend; */
  // filter.register('after_render:html', require('./meta_generator'));
};

// 保持过滤器最先执行
// meta_generator 现在需要读站点/主题配置，所以以工厂形式传入 hexo 实例
hexo.extend.filter.register('after_render:html', require(metaGeneratorPath)(hexo), 1);
