---
title: 脑洞
date: 2026-08-29 00:00:00
---

> 一些天马行空的想象，奇奇怪怪的想法，都放在这里。

<!-- 脑洞卡片墙：两列布局，每张卡片点击后可展开成独立的全屏页面 -->

<div class="bw-grid">

<!-- 卡片 1：听宇宙声音 -->
<div class="bw-card bw-card-cosmos" data-bw-open="cosmos" role="button" tabindex="0" title="听宇宙声音">
<div class="bw-card-art">
<span class="bw-star bw-star-1"></span>
<span class="bw-star bw-star-2"></span>
<span class="bw-star bw-star-3"></span>
<span class="bw-star bw-star-4"></span>
<span class="bw-planet"></span>
</div>
<div class="bw-card-body">
<span class="bw-card-tag">宇宙电台</span>
<h3 class="bw-card-title">听宇宙声音</h3>
<p class="bw-card-desc">深空的低频、脉冲星的信号、太阳风与引力波……把耳朵贴近星空，听听宇宙在说些什么。</p>
<span class="bw-card-open">进入收听 <i></i></span>
</div>
</div>

<!-- 占位卡片：敬请期待 -->
<div class="bw-card bw-card-soon" aria-disabled="true">
<div class="bw-card-art">
<span class="bw-soon-icon">✧</span>
</div>
<div class="bw-card-body">
<span class="bw-card-tag">待解锁</span>
<h3 class="bw-card-title">更多脑洞</h3>
<p class="bw-card-desc">正在酝酿中……下一个奇思妙想很快就会出现。</p>
</div>
</div>

</div>

<!-- 全屏模态容器（JS 动态填充并挂到 body，避免主题容器 transform 影响 fixed 定位） -->
<div class="bw-modal-root" id="bwModalRoot"></div>

<script>
/* ===== 脑洞页：宇宙声音全屏播放器 ===== */
(function () {
  var root = document.getElementById('bwModalRoot');
  if (!root) return;

  /* --- 打开/关闭模态 --- */
  function openCosmos() {
    var m = document.createElement('div');
    m.className = 'bw-modal bw-cosmos';
    m.innerHTML =
      '<div class="bw-modal-backdrop" data-close></div>' +
      '<div class="bw-modal-panel">' +
        '<button class="bw-modal-close" type="button" data-close aria-label="关闭">✕</button>' +
        '<h2 class="bw-modal-title">宇宙声音</h2>' +
        '<p class="bw-modal-sub">选择一段宇宙电波，闭上眼睛聆听</p>' +
        '<div class="bw-cosmos-sky">' +
          '<span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span>' +
          '<span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span>' +
          '<span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span>' +
          '<span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span>' +
        '</div>' +
        '<div class="bw-cosmos-options">' +
          '<button class="bw-cosmo-opt" type="button" data-sound="deep">深空低频</button>' +
          '<button class="bw-cosmo-opt" type="button" data-sound="pulsar">脉冲星</button>' +
          '<button class="bw-cosmo-opt" type="button" data-sound="solar">太阳风</button>' +
          '<button class="bw-cosmo-opt" type="button" data-sound="wave">引力波</button>' +
          '<button class="bw-cosmo-opt" type="button" data-sound="jupiter">木星电波</button>' +
        '</div>' +
        '<div class="bw-cosmos-status">未播放 · 点击上方选项开始</div>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    m.querySelectorAll('.bw-cosmo-opt').forEach(function (btn) {
      btn.addEventListener('click', function () { playSound(m, btn); });
    });
  }
  function closeModal(m) {
    stopAll();
    if (m && m.parentNode) m.parentNode.removeChild(m);
    document.body.classList.remove('bw-modal-open');
  }

  /* --- Web Audio 宇宙噪音合成（程序合成，零音频文件） --- */
  var actx = null;
  var master = null;    /* 共享主输出 */
  var analyser = null;  /* 频谱分析:驱动星空律动 */
  var activeNodes = null;
  var vizRaf = null;    /* 律动动画循环 */
  var vizTarget = { sky: null, stars: [] };
  var freqData = null;
  /* 页面卸载兜底:确保任何方式退出都停止声音 */
  window.addEventListener('pagehide', stopAll);
  window.addEventListener('beforeunload', stopAll);
  function ensureCtx() {
    if (!actx) {
      actx = new (window.AudioContext || window.webkitAudioContext)();
      master = actx.createGain(); master.gain.value = 1;
      analyser = actx.createAnalyser(); analyser.fftSize = 256;
      master.connect(analyser);
      analyser.connect(actx.destination);
      freqData = new Uint8Array(analyser.frequencyBinCount);
    }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }
  function stopAll() {
    if (activeNodes) {
      try {
        activeNodes.forEach(function (n) {
          /* interval id:clearInterval; 其它:stop+disconnect */
          if (typeof n === 'number') { clearInterval(n); return; }
          try { n.stop && n.stop(); } catch (e) {}
          try { n.disconnect(); } catch (e) {}
        });
      } catch (e) {}
      activeNodes = null;
    }
    /* 停止律动循环并复位画面 */
    if (vizRaf) { cancelAnimationFrame(vizRaf); vizRaf = null; }
    if (vizTarget.sky) {
      vizTarget.sky.style.removeProperty('--pulse');
      vizTarget.sky.style.removeProperty('--shimmer');
    }
    vizTarget = { sky: null, stars: [] };
  }
  /* 律动循环:读频谱 → 驱动星星闪烁速度 + 光晕呼吸 */
  function vizLoop() {
    vizRaf = requestAnimationFrame(vizLoop);
    if (!analyser || !freqData) return;
    analyser.getByteFrequencyData(freqData);
    var len = freqData.length;
    if (!len) return;
    /* 低频能量(前1/4) → 光晕呼吸 */
    var lo = Math.max(1, Math.floor(len * 0.25));
    var sumLo = 0, sumAll = 0, i;
    for (i = 0; i < len; i++) { sumAll += freqData[i]; if (i < lo) sumLo += freqData[i]; }
    var pulse = sumLo / lo / 255;
    var shimmer = sumAll / len / 255;
    var sky = vizTarget.sky;
    if (sky) {
      sky.style.setProperty('--pulse', pulse.toFixed(3));
      sky.style.setProperty('--shimmer', shimmer.toFixed(3));
    }
    /* 星星:能量越高闪烁越快 */
    var dur = Math.max(0.6, 3 - shimmer * 2.2);
    var stars = vizTarget.stars;
    for (i = 0; i < stars.length; i++) {
      if (stars[i] && stars[i].style) stars[i].style.animationDuration = dur.toFixed(2) + 's';
    }
  }
  function noiseBuffer(ctx, type) {
    var len = ctx.sampleRate * 2;
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var d = buf.getChannelData(0);
    var last = 0;
    for (var i = 0; i < len; i++) {
      var w = Math.random() * 2 - 1;
      if (type === 'pink') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      else d[i] = w;
    }
    return buf;
  }
  function connectToOut(node) {
    var g = actx.createGain();
    g.gain.value = 0.22;
    node.connect(g);
    g.connect(master);
    return g;
  }
  var presets = {
    /* 深空低频：粉噪声 + 低通 + 缓慢起伏 */
    deep: function () {
      var nodes = [];
      var src = actx.createBufferSource();
      src.buffer = noiseBuffer(actx, 'pink');
      src.loop = true;
      var lp = actx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 420;
      var lfo = actx.createOscillator();
      lfo.frequency.value = 0.08;
      var lfoGain = actx.createGain(); lfoGain.gain.value = 150;
      lfo.connect(lfoGain); lfoGain.connect(lp.frequency);
      src.connect(lp);
      var out = connectToOut(lp);
      src.start(); lfo.start();
      nodes = [src, lp, lfo, lfoGain, out];
      return nodes;
    },
    /* 脉冲星：规律的哔哔脉冲 */
    pulsar: function () {
      var nodes = [];
      var timer = setInterval(function () {
        if (!actx) return;
        var osc = actx.createOscillator();
        osc.type = 'sine';
        var t = actx.currentTime;
        osc.frequency.setValueAtTime(1200 + Math.random() * 600, t);
        var g = actx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.18, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(g); g.connect(master);
        osc.start(t); osc.stop(t + 0.15);
      }, 900);
      nodes = [timer];
      return nodes;
    },
    /* 太阳风：白噪声 + 高通 + 飘忽起伏 */
    solar: function () {
      var nodes = [];
      var src = actx.createBufferSource();
      src.buffer = noiseBuffer(actx, 'white');
      src.loop = true;
      var hp = actx.createBiquadFilter();
      hp.type = 'highpass'; hp.frequency.value = 1800;
      var bp = actx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 4200; bp.Q.value = 0.6;
      var lfo = actx.createOscillator(); lfo.frequency.value = 0.05;
      var lfoGain = actx.createGain(); lfoGain.gain.value = 0.25;
      lfo.connect(lfoGain); lfoGain.connect(bp.frequency);
      src.connect(hp); hp.connect(bp);
      var out = connectToOut(bp);
      src.start(); lfo.start();
      nodes = [src, hp, bp, lfo, lfoGain, out];
      return nodes;
    },
    /* 引力波：极低频嗡嗡上下扫频 */
    wave: function () {
      var nodes = [];
      var osc = actx.createOscillator(); osc.type = 'sine';
      osc.frequency.value = 45;
      var lfo = actx.createOscillator(); lfo.frequency.value = 0.06;
      var lfoGain = actx.createGain(); lfoGain.gain.value = 38;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      var out = connectToOut(osc);
      osc.start(); lfo.start();
      nodes = [osc, lfo, lfoGain, out];
      return nodes;
    },
    /* 木星电波：锯齿波 + 带通扫描（科幻感啁啾） */
    jupiter: function () {
      var nodes = [];
      var osc = actx.createOscillator(); osc.type = 'sawtooth'; osc.frequency.value = 330;
      var bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 18; bp.frequency.value = 1800;
      var lfo = actx.createOscillator(); lfo.frequency.value = 0.2;
      var lfoGain = actx.createGain(); lfoGain.gain.value = 1500;
      lfo.connect(lfoGain); lfoGain.connect(bp.frequency);
      osc.connect(bp);
      var out = connectToOut(bp);
      osc.start(); lfo.start();
      nodes = [osc, bp, lfo, lfoGain, out];
      return nodes;
    }
  };

  function playSound(m, btn) {
    var key = btn.getAttribute('data-sound');
    var ctx = ensureCtx();
    stopAll();
    var nodes = presets[key]();
    activeNodes = nodes;
    m.querySelectorAll('.bw-cosmo-opt').forEach(function (b) { b.classList.remove('is-on'); });
    btn.classList.add('is-on');
    var status = m.querySelector('.bw-cosmos-status');
    if (status) status.textContent = '正在播放 · ' + btn.textContent.trim();
    /* 绑定律动目标并启动频谱循环 */
    vizTarget = {
      sky: m.querySelector('.bw-cosmos-sky'),
      stars: Array.prototype.slice.call(m.querySelectorAll('.bw-cosmos-star'))
    };
    if (!vizRaf) vizLoop();
  }

  /* --- 卡片点击打开 --- */
  document.querySelectorAll('.bw-card[data-bw-open]').forEach(function (card) {
    function open() { openCosmos(); }
    card.addEventListener('click', open);
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
})();
</script>
