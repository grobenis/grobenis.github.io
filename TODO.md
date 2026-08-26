# 待办事项

## 未完成

### [ ] 部署 Umami 自建统计（替代不蒜子/51.la）
- **状态**：博客端埋点框架已就绪，服务器端未部署，暂不启用
- **背景**：原页脚的不蒜子统计（PV/UV 数值异常：UV>PV）与 51.la 脚本已移除，`busuanzi.enable` 已设为 false
- **博客端已完成**：
  - `themes/ayer/layout/_partial/after-footer.ejs` 已加入 Umami 埋点注入逻辑（`theme.umami` 配置开启后自动加载 script.js）
  - `_config.ayer.yml` 中已有 `umami` 配置块（当前 `enable: false`）
- **待做（需要 VPS + Docker）**：
  1. 准备一台 Linux VPS，安装 Docker + Docker Compose
  2. 用 `ghcr.io/umami-software/umami:postgresql-latest` + `postgres:15-alpine` 启动（参考当时给出的 docker-compose.yml）
  3. 首次访问 `http://IP:3000`，默认账号 `admin` / 密码 `umami`（登录后立即改密码）
  4. Settings → Websites 创建站点（域名填 `https://grobenis.github.io`），拿到 `script.js` 地址和 `website-id`
  5. 修改 `_config.ayer.yml`：`umami.enable: true`，填入 `script_url` 与 `website_id`
  6. 可选：给 3000 端口配 Nginx/Caddy 反向代理启用 HTTPS
  7. 重新 `hexo generate && hexo deploy`，push source 分支
- **注意**：Umami 的 `script.js` 跨域加载无限制，无需同源

## 已完成

- （暂无历史待办，此处可累积后续完成项）
