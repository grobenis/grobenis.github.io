---
title: 关于
date: 2020-03-20 18:28:43
type: about
layout: "about"
share: false
---

<div class="about-rail">

<div class="about-station">
<h3 class="about-station-label">我是谁</h3>
<div class="about-station-body">
<div class="about-panel">
<div class="about-name">郭犇<span class="about-name-en">grobenis</span></div>
<p class="about-tagline">SLAM / 计算机视觉算法工程师 —— 让机器回答「我在哪，要去哪」。</p>
<div class="about-stats">
<div class="about-stat"><b>67</b><span>篇原创</span></div>
<div class="about-stat"><b>7</b><span>年笔耕 · 2020→2026</span></div>
<div class="about-stat"><b>3</b><span>段工程实践</span></div>
<div class="about-stat"><b>∞</b><span>未解的 bug</span></div>
</div>
<div class="about-path">
<a href="/project/">南航 · 信息与计算科学</a><i>→</i>
<a href="/project/">北航 · 虚拟现实</a><i>→</i>
<a href="/project/">小米 · 可穿戴</a><i>→</i>
<a href="/project/">纽劢 · 自动驾驶</a><i>→</i>
<span class="about-path-now">它石智航 · 空间智能</span>
</div>
</div>
</div>
</div>

<div class="about-station">
<h3 class="about-station-label">在做什么</h3>
<div class="about-station-body">
<div class="about-panel">
<ul class="about-work">
<li><b>视觉 SLAM 与多传感器融合</b><span>从 ORB-SLAM3、VINS 到工程落地的回环检测与图优化，读过也拆过源码。</span></li>
<li><b>相机标定与位姿估计</b><span>在线外部标定、多视图标定、从 ArUco 到三角标的 PnP 工程化复盘——都是踩过的坑。</span></li>
<li><b>世界模型 / 空间智能</b><span>现在的主业：让机器人不止知道自己在哪，还知道接下来会发生什么。</span></li>
</ul>
</div>
</div>
</div>

<div class="about-station">
<h3 class="about-station-label">写些什么</h3>
<div class="about-station-body">
<div class="about-panel">
<p class="about-desc">这里不放简历式的技能清单。67 篇文章都是问题驱动的：工作中卡住 → 查资料做实验 → 写成复盘。大多集中在 <a href="/archives/">学习 / SLAM / C++ / 实验</a> 四类，从归档页顶部的分类标签可以直接筛。</p>
<p class="about-desc">如果某篇帮你在深夜 debug 时省了半小时，这个博客就算没白搭。</p>
</div>
</div>
</div>

<div class="about-station">
<h3 class="about-station-label">找到我</h3>
<div class="about-station-body">
<div class="about-panel">
<ul class="about-contact">
<li><a href="https://github.com/grobenis" target="_blank" rel="noopener"><i class="ri-github-line"></i>github.com/grobenis</a></li>
<li><a href="https://blog.csdn.net/GuoBen_" target="_blank" rel="noopener"><i class="ri-customer-service-2-line"></i>CSDN · GuoBen_</a></li>
<li><a href="mailto:guoben@buaa.edu.cn"><i class="ri-mail-line"></i>guoben@buaa.edu.cn</a></li>
</ul>
</div>
</div>
</div>

</div>

<div class="about-links">
  <a href="javascript:void(0)" id="about-info-btn" title="关于本站"><i class="ri-information-line"></i><span>关于本站</span></a>
  <a href="https://cparadox.github.io/" target="_blank" rel="noopener" title="友链：仔仔的博客"><i class="ri-links-line"></i><span>友链</span></a>
  <a href="javascript:void(0)" id="about-rss-btn" title="订阅 RSS"><i class="ri-rss-line"></i><span>订阅</span></a>
</div>

<div class="about-modal" id="aboutModal">
  <div class="about-modal-card">
    <button class="about-modal-close" id="aboutModalClose" title="关闭"><i class="ri-close-line"></i></button>
    <h3>曾是少年</h3>
    <p class="about-modal-sub">曾梦想仗剑走天涯，看一看世界的繁华</p>
    <ul>
      <li>站长：郭犇（grobenis）</li>
      <li>方向：视觉 SLAM / 多传感器融合 / 三维重建</li>
      <li>框架：Hexo · Ayer 主题 · GitHub Pages</li>
    </ul>
  </div>
</div>
<div class="about-toast" id="aboutToast">RSS 订阅链接已复制</div>
<script>
(function () {
  var modal = document.getElementById('aboutModal');
  var infoBtn = document.getElementById('about-info-btn');
  var closeBtn = document.getElementById('aboutModalClose');
  var rssBtn = document.getElementById('about-rss-btn');
  var toast = document.getElementById('aboutToast');
  var timer = null;
  if (infoBtn && modal) {
    infoBtn.onclick = function () { modal.style.display = 'flex'; };
    closeBtn.onclick = function () { modal.style.display = 'none'; };
    modal.onclick = function (e) { if (e.target === modal) modal.style.display = 'none'; };
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }
  function showToast() {
    toast.style.opacity = '1';
    clearTimeout(timer);
    timer = setTimeout(function () { toast.style.opacity = '0'; }, 2000);
  }
  if (rssBtn && toast) {
    rssBtn.onclick = function () {
      var url = location.origin + '/atom.xml';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(showToast, function () { fallbackCopy(url); showToast(); });
      } else {
        fallbackCopy(url);
        showToast();
      }
    };
  }
})();
</script>
