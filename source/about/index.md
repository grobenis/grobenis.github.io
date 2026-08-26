---
title: 关于
date: 2020-03-20 18:28:43
type: about
layout: "about"
---

你好，我是**郭犇**，一名专注于 **SLAM / 计算机视觉** 方向的工程师。

> 曾梦想仗剑走天涯，看一看世界的繁华。

## 关于我

- 研究方向：视觉 SLAM、多传感器融合、三维重建
- 常用技术：C++、Python、ROS、OpenCV、Eigen、G2O、Ceres
- 兴趣驱动：喜欢从算法原理追到工程落地，也享受把学到的知识整理成文章的过程

## 关于博客

这个博客用于记录自己在学习中遇到的有趣难题、学习过程，偶尔也写写随笔感悟、读书笔记，主要包括四类内容：

1. 技术难题
2. 学习记录
3. 随心感想
4. 读书笔记

## 技术领域

- **SLAM**：ORB-SLAM、VINS-mono、激光 SLAM、回环检测、图优化、后端优化
- **计算机视觉**：特征点检测、相机标定、立体匹配、目标检测
- **工程实践**：C++ 开发、ROS、CMake、算法与面试题

## 联系我

- GitHub：[grobenis](https://github.com/grobenis)
- CSDN：[GuoBen\_](https://blog.csdn.net/GuoBen_)
- 邮箱：[guoben@buaa.edu.cn](mailto:guoben@buaa.edu.cn)

## 关于本站

本站使用 [Hexo](https://hexo.io) 搭建，[Ayer](https://github.com/Shen-Yu/hexo-theme-ayer) 主题，部署于 GitHub Pages。

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
