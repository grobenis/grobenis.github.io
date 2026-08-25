---
name: "hexo-publish"
description: "一键发布本博客（Hexo）：自动 git 提交源码、hexo 重建并部署到 GitHub Pages、把源码变更推送到 source 分支云端备份。Invoke when user says 发布 / 部署 / 更新博客 / publish / deploy blog / 推送博客 after editing posts in d:\\Blog."
---

# Hexo Publish

对 `d:\Blog` 仓库执行"编辑后一键发布"：源码备份 + 重新构建 + 部署到 GitHub Pages + 推送源码到 `source` 分支。

## 适用范围

- 仓库：`d:\Blog`（Hexo + ayer 主题）
- 部署目标：`https://grobenis.github.io`（`master` 分支）
- 源码备份分支：`source`
- 主题配置：所有个人定制统一改根目录的 `_config.ayer.yml`（覆盖 `themes/ayer/_config.yml`），不要直接改主题目录里的配置
- 代理：必须使用 `http://127.0.0.1:7890`（本机 Clash）—— Hexo 部署和 git push 都需设置 `HTTPS_PROXY`

## 维护约定（重要）

1. 修改主题行为（menu / subtitle / cover / 打赏 / 音乐 / 评论 / etc.）→ 只改 `_config.ayer.yml`，**不要**改 `themes/ayer/_config.yml`
2. 想恢复某项为主题默认 → 从 `_config.ayer.yml` 删除对应键（Hexo 合并规则：缺失键回退到主题默认）
3. 升级主题源码时 → 只同步 `themes/ayer/` 内的文件，本文件不动，个人定制不丢
4. 修改后必须执行"重新构建"步骤才能生效

## 执行步骤（按顺序执行，任一步失败立即停止并报告）

### 1. 检查前置条件

- 当前目录必须在 `d:\Blog`（否则退出并提示用户先 `cd`）
- `node_modules` 存在；`hexo` 可执行
- `git` 在 PATH 中，工作区有 `origin` remote 指向 `grobenis/grobenis.github.io.git`

### 2. 拉取最新源码（避免本地与远端 source 分叉）

```powershell
$env:HTTPS_PROXY="http://127.0.0.1:7890"
git pull --rebase origin source
```

如有冲突：暂停，让用户解决后再继续。

### 3. 暂存并提交源码

- 若 `git status` 显示有未提交的改动：
  - `git add -A`
  - 让用户输入 commit 信息（默认：`chore: 同步博客源码 YYYY-MM-DD`，日期用 `Get-Date -Format yyyy-MM-dd`）
  - `git commit -m "<message>"`
- 若无改动：跳过此步，记 `skip_reason="no local changes"`

### 4. 重新构建

```powershell
npx hexo clean
npx hexo generate
```

期望：报告 `Generated: N files`，无 ERROR。失败立即停止。

### 5. 部署到 GitHub Pages（master 分支）

```powershell
$env:HTTPS_PROXY="http://127.0.0.1:7890"
npx hexo deploy
```

期望末尾出现 `INFO  Deploy done: git` 和 `To https://github.com/grobenis/grobenis.github.io.git  <old>..<new>  HEAD -> master`。失败立即停止。

### 6. 推送源码到 source 分支

```powershell
$env:HTTPS_PROXY="http://127.0.0.1:7890"
git push origin source
```

期望：`source -> source` 或 `Everything up-to-date`。失败立即停止。

### 7. 验证线上

等待 60 秒让 GitHub Pages CDN 刷新，然后用 `Invoke-WebRequest` 抓首页：

- `https://grobenis.github.io/` 返回 HTTP 200
- 若本次提交涉及删除某篇文章，首页 HTML 中**不应包含**该文章标题或 URL

把验证结果原样回显给用户。

## 输出格式

完成后用一张表格汇报：
| 步骤 | 结果 |
|------|------|
| git pull | updated/clean/error |
| 提交 | commit hash 或 "无变更" |
| hexo generate | N files |
| hexo deploy | commit hash |
| git push source | source -> source 或 up-to-date |
| 验证线上 | 200 + 关键字检查结果 |

末尾给一行总结（"✅ 全部成功" / "❌ 失败在 XX 步"）和最终的 master、source 提交 SHA。

## 常见失败处理

- **认证失败 / 403** → 提示用户提供新的 GitHub PAT（PAT 需要 `repo` 权限），存入 `cmdkey /generic:git:https://github.com /user:grobenis`
- **代理连接失败** → 提示检查 Clash 是否在 7890 端口运行
- **git pull 冲突** → 不要自动解决，列出冲突文件让用户决定
- **CDN 未刷新导致验证失败** → 提示用户手动刷浏览器（GitHub Pages 缓存可能持续 5-10 分钟）
