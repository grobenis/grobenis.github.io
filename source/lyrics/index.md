---
title: 音乐
date: 2020-03-20 18:28:43
share: false
---

> 把听到的故事，安放在这里。

<div class="lyric-slider">

<!-- 全屏动态背景层：根据当前歌曲切换 -->
<div class="lyric-stage">
  <div class="lyric-scene lyric-scene-1 is-active" data-scene="1">
    <div class="lyric-glow lyric-glow-warm"></div>
    <div class="lyric-glow lyric-glow-warm-2"></div>
    <div class="lyric-particles" data-particles="warm"></div>
  </div>
  <div class="lyric-scene lyric-scene-2" data-scene="2">
    <div class="lyric-glow lyric-glow-cool"></div>
    <div class="lyric-glow lyric-glow-cool-2"></div>
    <div class="lyric-particles" data-particles="cool"></div>
  </div>
  <div class="lyric-stage-overlay"></div>
</div>

<div class="lyric-cards">

<div class="lyric-card is-active" data-scene="1">
<div class="lyric-card-header">
<span class="lyric-num">01</span>
<h3>曾经的你</h3>
<span class="lyric-singer">许巍</span>
</div>
<div class="lyric-card-body">
<p>曾梦想仗剑走天涯</p>
<p>看一看世界的繁华</p>
<p>年少的心总有些轻狂</p>
<p>如今你四海为家</p>
<p>曾让你心疼的姑娘</p>
<p>如今已悄然无踪影</p>
<p>爱情总让你渴望又感到烦恼</p>
<p>曾让你遍体鳞伤</p>
<p>走在勇往直前的路上</p>
<p>有难过也有精彩</p>
<p>每一次难过的时候</p>
<p>就独自看一看大海</p>
<p>总想起身边走在路上的朋友</p>
<p>有多少正在疗伤</p>
<p>不知多少孤独的夜晚</p>
<p>从昨夜酒醉醒来</p>
<p>每一次难过的时候</p>
<p>就独自看一看大海</p>
<p>总想起身边走在路上的朋友</p>
<p>有多少正在醒来</p>
<p>让我们干了这杯酒</p>
<p>好男儿胸怀像大海</p>
<p>经历了人生百态世间的冷暖</p>
<p>这笑容温暖纯真</p>
</div>
</div>

<div class="lyric-card" data-scene="2">
<div class="lyric-card-header">
<span class="lyric-num">02</span>
<h3>消愁</h3>
<span class="lyric-singer">毛不易</span>
</div>
<div class="lyric-card-body">
<p>当你走进这欢乐场</p>
<p>背上所有的梦与想</p>
<p>各色的脸上各色的妆</p>
<p>没人记得你的模样</p>
<p>三巡酒过你在角落</p>
<p>固执的唱着苦涩的歌</p>
<p>听它在喧嚣里被淹没</p>
<p>你拿起酒杯对自己说</p>
<p>一杯敬朝阳</p>
<p>一杯敬月光</p>
<p>唤醒我的向往</p>
<p>温柔了寒窗</p>
<p>于是可以不回头地逆风飞翔</p>
<p>不怕心头有雨</p>
<p>眼底有霜</p>
<p>一杯敬故乡</p>
<p>一杯敬远方</p>
<p>守着我的善良</p>
<p>催着我成长</p>
<p>所以南北的路从此不再漫长</p>
<p>灵魂不再无处安放</p>
<p>一杯敬明天</p>
<p>一杯敬过往</p>
<p>支撑我的身体</p>
<p>厚重了肩膀</p>
<p>虽然从不相信所谓山高水长</p>
<p>人生苦短</p>
<p>何必念念不忘</p>
<p>一杯敬自由</p>
<p>一杯敬死亡</p>
<p>宽恕我的平凡</p>
<p>驱散了迷惘</p>
<p>好吧天亮之后总是潦草离场</p>
<p>清醒的人最荒唐</p>
</div>
</div>

</div>

<div class="lyric-controls">
<button class="lyric-prev" type="button" aria-label="上一首">&#8249;</button>
<div class="lyric-dots">
<span class="lyric-dot is-active"></span>
<span class="lyric-dot"></span>
</div>
<button class="lyric-next" type="button" aria-label="下一首">&#8250;</button>
</div>

</div>

<script>
(function () {
  var cards = document.querySelectorAll('.lyric-card');
  var dots = document.querySelectorAll('.lyric-dot');
  var prevBtn = document.querySelector('.lyric-prev');
  var nextBtn = document.querySelector('.lyric-next');
  var scenes = document.querySelectorAll('.lyric-scene');
  if (!cards.length) return;
  var idx = 0;

  function show(n, dir) {
    if (n === idx) return;
    var cur = cards[idx];
    idx = (n + cards.length) % cards.length;
    var nextCard = cards[idx];
    cur.classList.remove('is-active');
    nextCard.classList.add('is-active', dir === 'next' ? 'slide-in-right' : 'slide-in-left');
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });

    // 切换背景场景（交叉淡入）
    var sceneIdx = parseInt(nextCard.getAttribute('data-scene'), 10) || 1;
    scenes.forEach(function (s) {
      s.classList.toggle('is-active', parseInt(s.getAttribute('data-scene'), 10) === sceneIdx);
    });

    setTimeout(function () {
      nextCard.classList.remove('slide-in-right', 'slide-in-left');
    }, 450);
  }

  prevBtn.addEventListener('click', function () { show(idx - 1, 'prev'); });
  nextBtn.addEventListener('click', function () { show(idx + 1, 'next'); });
  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { show(i, i > idx ? 'next' : 'prev'); });
  });

  // 动态生成粒子（暖色 / 冷色各 60 颗）
  function spawnParticles(host, kind) {
    var warm = kind === 'warm';
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 60; i++) {
      var p = document.createElement('span');
      p.className = 'lyric-particle';
      var size = warm ? (1 + Math.random() * 3) : (1 + Math.random() * 2.5);
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (Math.random() * 100) + '%';
      p.style.top = (Math.random() * 100) + '%';
      p.style.animationDelay = (Math.random() * 12).toFixed(2) + 's';
      p.style.animationDuration = (10 + Math.random() * 14).toFixed(2) + 's';
      p.style.opacity = (0.35 + Math.random() * 0.5).toFixed(2);
      if (warm) {
        p.style.background = Math.random() > 0.5 ? '#ffb56b' : '#ffd58a';
        p.style.boxShadow = '0 0 6px rgba(255,181,107,.7)';
      } else {
        p.style.background = Math.random() > 0.5 ? '#cfd8ff' : '#a4b4ff';
        p.style.boxShadow = '0 0 6px rgba(164,180,255,.8)';
      }
      frag.appendChild(p);
    }
    host.appendChild(frag);
  }
  document.querySelectorAll('.lyric-particles').forEach(function (el) {
    spawnParticles(el, el.getAttribute('data-particles'));
  });
})();
</script>
