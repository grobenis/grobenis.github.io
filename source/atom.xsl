<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom">
<xsl:output method="html" encoding="utf-8" indent="yes"/>

<xsl:template match="/atom:feed">
<html lang="zh-CN">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title><xsl:value-of select="atom:title"/> · RSS</title>
  <style>
    :root { color-scheme: light dark; }
    body { max-width: 760px; margin: 48px auto; padding: 0 20px; font-family: -apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif; color: #333; background: #fff; }
    h1 { font-size: 24px; margin-bottom: 4px; }
    .sub { color: #888; margin: 0 0 16px; }
    .hint { background: #f4f4f6; border-radius: 8px; padding: 16px 18px; font-size: 14px; line-height: 1.9; color: #555; margin: 8px 0 28px; }
    .hint code { background: #e5e5ee; padding: 1px 6px; border-radius: 4px; word-break: break-all; }
    ul { list-style: none; margin: 0; padding: 0; }
    li { border-bottom: 1px solid #eee; padding: 12px 2px; }
    li a { color: #2f6fdb; text-decoration: none; font-size: 16px; }
    li a:hover { text-decoration: underline; }
    .date { color: #999; font-size: 13px; margin-left: 10px; white-space: nowrap; }
    @media (prefers-color-scheme: dark) {
      body { background: #1e1e1e; color: #cdd0d6; }
      .sub { color: #8a8f97; }
      .hint { background: #2a2a2a; color: #b8bcc2; }
      .hint code { background: #3a3a3a; }
      li { border-color: #333; }
      li a { color: #6cb2f5; }
      .date { color: #7a8088; }
    }
  </style>
</head>
<body>
  <h1><xsl:value-of select="atom:title"/></h1>
  <p class="sub"><xsl:value-of select="atom:subtitle"/></p>
  <div class="hint">
    这是一个 Atom 订阅源。请复制本页地址
    <code><xsl:value-of select="atom:link[@rel='self']/@href"/></code>
    到任意 RSS 阅读器（Feedly / Inoreader / NetNewsWire 等）订阅。以下是最近更新的文章：
  </div>
  <ul>
    <xsl:for-each select="atom:entry">
      <li>
        <a href="{atom:link[@rel='alternate']/@href}"><xsl:value-of select="atom:title"/></a>
        <span class="date"><xsl:value-of select="substring(atom:updated, 1, 10)"/></span>
      </li>
    </xsl:for-each>
  </ul>
</body>
</html>
</xsl:template>
</xsl:stylesheet>