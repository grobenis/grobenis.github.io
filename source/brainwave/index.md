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

<!-- 卡片 2：脑洞星系（点子库） -->
<div class="bw-card bw-card-galaxy" data-bw-open="galaxy" role="button" tabindex="0" title="脑洞星系">
<div class="bw-card-art">
<span class="bw-galaxy-core"></span>
<span class="bw-gstar"></span><span class="bw-gstar"></span><span class="bw-gstar"></span><span class="bw-gstar"></span><span class="bw-gstar"></span><span class="bw-gstar"></span><span class="bw-gstar"></span><span class="bw-gstar"></span>
</div>
<div class="bw-card-body">
<span class="bw-card-tag">点子库</span>
<h3 class="bw-card-title">脑洞星系</h3>
<p class="bw-card-desc">每一颗星星都是一个天马行空的想法，点亮它们，或把你的新点子挂上星空。</p>
<span class="bw-card-open">进入星系 <i></i></span>
</div>
</div>

<!-- 卡片 3：娃娃屋（娃娃墙） -->
<div class="bw-card bw-card-dolls" data-bw-open="dolls" role="button" tabindex="0" title="娃娃屋">
<div class="bw-card-art">
<span class="bw-dolls-hook"></span>
<span class="bw-dolls-thread"></span>
<span class="bw-doll-preview bw-doll-p1"></span>
<span class="bw-doll-preview bw-doll-p2"></span>
<span class="bw-doll-preview bw-doll-p3"></span>
<span class="bw-dolls-heart"></span>
</div>
<div class="bw-card-body">
<span class="bw-card-tag">娃娃屋</span>
<h3 class="bw-card-title">娃娃墙</h3>
<p class="bw-card-desc">一墙毛绒绒的小可爱。点开娃娃屋，每一只娃娃都在等一个拥抱，也藏着一句悄悄话。</p>
<span class="bw-card-open">进入娃娃屋 <i></i></span>
</div>
</div>

<!-- 卡片 4：盲盒商店 -->
<div class="bw-card bw-card-shop" data-bw-open="shop" role="button" tabindex="0" title="盲盒商店">
<div class="bw-card-art">
<span class="bw-box-glow"></span>
<span class="bw-box-lid"></span>
<span class="bw-box-body"></span>
<span class="bw-box-q">?</span>
<span class="bw-box-float bw-box-f1"></span>
<span class="bw-box-float bw-box-f2"></span>
</div>
<div class="bw-card-body">
<span class="bw-card-tag">盲盒商店</span>
<h3 class="bw-card-title">拆盲盒</h3>
<p class="bw-card-desc">摇一摇、开一开，神秘小盒子里会跳出可可爱爱的软胶小玩具。今天会开出谁呢？</p>
<span class="bw-card-open">进入商店 <i></i></span>
</div>
</div>

<!-- 卡片 5：四季窗 -->
<div class="bw-card bw-card-window" data-bw-open="window" role="button" tabindex="0" title="四季窗">
<div class="bw-card-art">
<span class="bw-win-mini">
<span class="bw-win-mini-sash bw-win-mini-sl"></span>
<span class="bw-win-mini-sash bw-win-mini-sr"></span>
</span>
<span class="bw-win-mini-float bw-win-mf1">🌸</span>
<span class="bw-win-mini-float bw-win-mf2">🍁</span>
<span class="bw-win-mini-float bw-win-mf3">❄️</span>
</div>
<div class="bw-card-body">
<span class="bw-card-tag">四季窗</span>
<h3 class="bw-card-title">推开一扇窗</h3>
<p class="bw-card-desc">窗里是房间，窗外是整年。推开木窗，春天有草地和蝴蝶，冬天有雪人和炉光。</p>
<span class="bw-card-open">推开窗户 <i></i></span>
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
    var mode = card.getAttribute('data-bw-open');
    var open = { cosmos: openCosmos, galaxy: openGalaxy, dolls: openDolls, shop: openToyShop, window: openWindow }[mode] || openCosmos;
    card.addEventListener('click', open);
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  /* ============ 脑洞星系（点子库） ============ */
  /* 默认脑洞点子 */
  var GALAXY_IDEAS = [
    { t: '天空写诗机', d: '一架无人机在云层上用烟轨写诗，抬头就能读到天空的情书。' },
    { t: '月光充电', d: '把所有路灯换成收集月光的装置，夜晚停电时也能温柔发亮。' },
    { t: '时间胶囊快递', d: '寄一封给十年后自己的信，由未来的时钟亲自签收。' },
    { t: '会飞的图书馆', d: '热气球载着旧书环游世界，每到一个城市换一批读者。' },
    { t: '声音琥珀', d: '把重要日子的声音封进琥珀，多年后摇晃就能听见那年夏天。' },
    { t: '云朵枕头', d: '采集午后的云做成枕头，失眠时躺进去就回到无忧无虑的童年。' },
    { t: '星际邮箱', d: '在屋顶立一个信箱，相信的人往里投递心事，星星替你转交。' },
    { t: '彩虹补给站', d: '雨天过后的十字路口自动洒出一道彩虹，给赶路的人一瞬的好心情。' }
  ];
  var galIdeas = loadGalIdeas();

  function loadGalIdeas() {
    try {
      var raw = localStorage.getItem('bwGalaxyIdeas');
      if (raw) { var arr = JSON.parse(raw); if (Array.isArray(arr) && arr.length) return arr; }
    } catch (e) {}
    return GALAXY_IDEAS.map(function (it, i) {
      return { id: 'g' + i, t: it.t, d: it.d, x: 14 + (i * 73) % 76, y: 18 + (i * 47) % 64 };
    });
  }
  function saveGalIdeas() { try { localStorage.setItem('bwGalaxyIdeas', JSON.stringify(galIdeas)); } catch (e) {} }

  function openGalaxy() {
    var m = document.createElement('div');
    m.className = 'bw-modal bw-galaxy';
    m.innerHTML =
      '<div class="bw-gal-bg" id="galSky"></div>' +
      '<div class="bw-modal-panel bw-galaxy-panel">' +
        '<button class="bw-modal-close" type="button" data-close title="关闭">✕</button>' +
        '<h2 class="bw-modal-title">脑洞星系</h2>' +
        '<p class="bw-modal-sub">每一颗星都是一个想法 · 点亮它们，或挂上新的脑洞</p>' +
        '<div class="bw-gal-add">' +
          '<input class="bw-gal-input" id="galInput" type="text" maxlength="18" placeholder="写下一个新的脑洞点子…" />' +
          '<button class="bw-gal-btn" id="galAddBtn" type="button">挂上星空 ✦</button>' +
        '</div>' +
        '<div class="bw-gal-tip">点击星星查看想法 · 也可在下方新增</div>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    /* 渲染全屏星系背景 */
    var sky = m.querySelector('#galSky');
    renderGalaxy(sky);
    /* 新增点子 */
    var input = m.querySelector('#galInput');
    var addBtn = m.querySelector('#galAddBtn');
    function addIdea() {
      var v = (input.value || '').trim();
      if (!v) return;
      var id = 'g' + Date.now();
      galIdeas.push({ id: id, t: v, d: '刚刚挂上星空的崭新脑洞。', x: 8 + Math.random() * 82, y: 10 + Math.random() * 72 });
      saveGalIdeas();
      input.value = '';
      renderGalaxy(sky);
    }
    addBtn.addEventListener('click', addIdea);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') addIdea(); });
  }

  function renderGalaxy(sky) {
    sky.innerHTML = '';
    var w = sky.clientWidth || 480;
    var h = sky.clientHeight || 260;
    /* 背景星点 */
    var i, bg;
    for (i = 0; i < 40; i++) {
      bg = document.createElement('span');
      bg.className = 'bw-gal-bgstar';
      bg.style.left = (Math.random() * 100) + '%';
      bg.style.top = (Math.random() * 100) + '%';
      bg.style.animationDelay = (Math.random() * 3) + 's';
      bg.style.width = bg.style.height = (Math.random() < 0.6 ? 2 : 3) + 'px';
      sky.appendChild(bg);
    }
    /* 连线(SVG):连接每颗星到最近的另一颗 */
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'bw-gal-lines');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('preserveAspectRatio', 'none');
    var used = {};
    for (i = 0; i < galIdeas.length; i++) {
      var a = galIdeas[i], best = null, bd = 1e9;
      for (var j = 0; j < galIdeas.length; j++) {
        if (i === j) continue;
        var b = galIdeas[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < bd) { bd = dist; best = j; }
      }
      if (best !== null) {
        var key = i < best ? i + '_' + best : best + '_' + i;
        if (!used[key] && bd < 45) {
          used[key] = 1;
          var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', (a.x / 100 * w)); line.setAttribute('y1', (a.y / 100 * h));
          line.setAttribute('x2', (galIdeas[best].x / 100 * w)); line.setAttribute('y2', (galIdeas[best].y / 100 * h));
          svg.appendChild(line);
        }
      }
    }
    sky.appendChild(svg);
    /* 星星 */
    for (i = 0; i < galIdeas.length; i++) {
      var it = galIdeas[i];
      var star = document.createElement('span');
      star.className = 'bw-gal-star';
      star.style.left = it.x + '%';
      star.style.top = it.y + '%';
      star.setAttribute('role', 'button');
      star.setAttribute('tabindex', '0');
      star.title = it.t;
      star.innerHTML = '<i></i>';
      star.addEventListener('click', function (idea) {
        return function () { showGalIdea(sky, idea); };
      }(it));
      star.addEventListener('keydown', function (idea) {
        return function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showGalIdea(sky, idea); } };
      }(it));
      sky.appendChild(star);
    }
  }

  /* 查看点子详情(弹出的迷你卡片,挂到模态层以盖住面板) */
  function showGalIdea(sky, idea) {
    var modal = sky.parentNode;
    var old = modal.querySelector('.bw-gal-pop');
    if (old) old.parentNode.removeChild(old);
    var pop = document.createElement('div');
    pop.className = 'bw-gal-pop';
    pop.innerHTML =
      '<span class="bw-gal-pop-t">✦ ' + idea.t + '</span>' +
      '<span class="bw-gal-pop-d">' + idea.d + '</span>' +
      '<button class="bw-gal-pop-x" type="button" title="关闭">✕</button>';
    modal.appendChild(pop);
    pop.querySelector('.bw-gal-pop-x').addEventListener('click', function () {
      if (pop.parentNode) pop.parentNode.removeChild(pop);
    });
    sky.addEventListener('click', function once(e) {
      if (e.target.closest('.bw-gal-star') || e.target.closest('.bw-gal-pop')) return;
      if (pop.parentNode) pop.parentNode.removeChild(pop);
      sky.removeEventListener('click', once);
    });
  }

  /* ============ 娃娃屋（娃娃墙） ============ */
  /* 所有 AI 配图已预生成到 source/brainwave/images/，每个数据项带 img 字段直接引用本地 */
  var IMG = function (rel) { return '/brainwave/images/' + rel; };
  /* 每只娃娃：名字 + 性格 + 喜欢的事 + 悄悄话 + AI 图 prompt（5×4=20 只） */
  var DOLLS = [
    { name: '糯米', img: IMG('dolls/糯米.jpg'), personality: '温柔爱睡', like: '抱着蜂蜜罐打盹，在你难过时递上一个抱抱', line: '今天的烦恼，都被我卷进小肚皮里啦。', prompt: 'one cute plush teddy bear, caramel cream color, round chubby body, soft woolly texture, big glossy eyes, tiny blush cheeks, studio product shot, pastel pink background' },
    { name: '奶糖', img: IMG('dolls/奶糖.jpg'), personality: '好奇又活泼', like: '收集清晨的露珠，竖起长耳朵听风里的故事', line: '耳朵这么长，是为了偷偷接住你的好消息。', prompt: 'one fluffy white plush bunny with soft pink inner ears, cute rounded shape, big sparkling eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '布丁', img: IMG('dolls/布丁.jpg'), personality: '慵懒小傲娇', like: '晒太阳打呼噜，偷看你认真写字的侧脸', line: '呼噜呼噜，把你的不开心都呼噜走。', prompt: 'one round orange tabby plush kitten, chubby round face, closed happy eyes, sweet smile, soft plush fur, studio product shot, pastel pink background' },
    { name: '橙子', img: IMG('dolls/橙子.jpg'), personality: '开朗元气', like: '追着自己的尾巴转圈，把甜橙味抱抱分给大家', line: '尾巴藏不住开心，就让它摇啊摇。', prompt: 'one cute plush fox with big fluffy orange tail, cream belly, big adorable eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '棉花', img: IMG('dolls/棉花.jpg'), personality: '软萌害羞', like: '趴在窗边数星星，把烦心事裹进云朵里', line: '软绵绵的，最适合在你难过时靠一靠。', prompt: 'one fluffy woolly plush lamb with cloudlike curly wool, gentle closed eyes, sweet smile, studio product shot, pastel pink background' },
    { name: '豆丁', img: IMG('dolls/豆丁.jpg'), personality: '勇敢又逞强', like: '假装很凶地保护大家，其实最怕被搔痒痒', line: '别看我小，我可是恐龙里的勇敢担当！', prompt: 'one cute green plush baby dinosaur, round chubby body, tiny arms, big shiny eyes, adorable smile, studio product shot, pastel pink background' },
    { name: '桃桃', img: IMG('dolls/桃桃.jpg'), personality: '甜甜软软', like: '每天给自己一个草莓味抱抱', line: '生活有点苦，但我是甜的。', prompt: 'one cute plush pink pig, round soft body, big glossy eyes, tiny blush, adorable smile, studio product shot, pastel pink background' },
    { name: '西西', img: IMG('dolls/西西.jpg'), personality: '安静心思细', like: '收藏雨后的彩虹，画进你的梦里', line: '别看我话少，我记得你所有的好。', prompt: 'one cute plush blue kitten with sleepy soft eyes, round fluffy body, tiny blush, studio product shot, pastel pink background' },
    { name: '果冻', img: IMG('dolls/果冻.jpg'), personality: '活泼呱呱', like: '下雨天跳进池塘里，和雨滴排排队', line: '生活嘛，总要蹦跶两下才过瘾。', prompt: 'one cute plush green frog, round chubby body, bright wide eyes, cheerful smile, studio product shot, pastel pink background' },
    { name: '布林', img: IMG('dolls/布林.jpg'), personality: '稳重慢悠悠', like: '冬天最暖的，是和朋友们挤在一起', line: '走得慢没关系，我不急着离开你。', prompt: 'one cute plush blue penguin, round belly, orange feet, big sparkly eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '啾啾', img: IMG('dolls/啾啾.jpg'), personality: '元气满满', like: '一天到晚对着太阳叽叽叫', line: '想把第一缕晨光，分一缕给你。', prompt: 'one cute plush yellow chick, chubby round body, bright joyful eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '麻薯', img: IMG('dolls/麻薯.jpg'), personality: '黏人小团子', like: '不知不觉就黏在你身边不想走', line: '想你了，所以把自己变成软软的。', prompt: 'one cute plush white bear, precise soft round body, glossy gentle eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '泡芙', img: IMG('dolls/泡芙.jpg'), personality: '甜到冒泡', like: '往平凡的日子里加一点奶油', line: '不开心的时候，请轻轻咬我一口。', prompt: 'one cute plush cream bunny with swirl creampuff look, round soft body, sweet sparkling eyes, studio product shot, pastel pink background' },
    { name: '曲奇', img: IMG('dolls/曲奇.jpg'), personality: '踏实可靠', like: '把难题耐心烤成脆脆的曲奇', line: '慢慢来，一切都来得及。', prompt: 'one cute plush brown bear with cookie speckles, round fluffy body, warm kind eyes, studio product shot, pastel pink background' },
    { name: '柠檬', img: IMG('dolls/柠檬.jpg'), personality: '清爽乐乐', like: '在水面划出一道道小小的涟漪', line: '酸酸的我，最配甜甜的你。', prompt: 'one cute plush yellow duck, round soft body, bright cheerful eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '松果', img: IMG('dolls/松果.jpg'), personality: '机灵爱囤', like: '把秋天的快乐都收进小口袋', line: '你给的小确幸，我都悄悄珍藏。', prompt: 'one cute plush squirrel with big fluffy tail, round chubby body, bright clever eyes, studio product shot, pastel pink background' },
    { name: '草莓', img: IMG('dolls/草莓.jpg'), personality: '软fu软fu', like: '给平凡的日子撒上一层糖霜', line: '我的心，是草莓味的。', prompt: 'one cute plush pink bear with strawberry detail, round soft body, glossy happy eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '芋泥', img: IMG('dolls/芋泥.jpg'), personality: '温柔寡言', like: '把想说的话都说得很轻很暖', line: '靠近一点，就能听见我的心跳。', prompt: 'one cute plush purple bear, round chubby body, soft gentle eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '可可', img: IMG('dolls/可可.jpg'), personality: '忠诚暖暖', like: '陪你到天亮，再送你安全回家', line: '无论多晚，都等你回来。', prompt: 'one cute plush brown puppy, round fluffy body, big faithful eyes, happy ears, studio product shot, pastel pink background' },
    { name: '蛋挞', img: IMG('dolls/蛋挞.jpg'), personality: '软糯贪嘴', like: '热爱人间烟火气与甜滋滋的味道', line: '日子这炉火，得有甜味才圆满。', prompt: 'one cute plush golden kitten, round chubby body, sunny golden fur, big sparkly eyes, studio product shot, pastel pink background' }
  ];

  /* 投喂动作表：每只娃娃专属食物 + 专属特效 + 专属动作动画 */
  var ACT = {
    '糯米': { food: '🍯', fx: '🍯', anim: 'bwA_bear' },
    '奶糖': { food: '🥕', fx: '🥕', anim: 'bwA_bunny' },
    '布丁': { food: '🐟', fx: '🐟', anim: 'bwA_cat' },
    '橙子': { food: '🍊', fx: '🍊', anim: 'bwA_fox' },
    '棉花': { food: '🍡', fx: '☁️', anim: 'bwA_lamb' },
    '豆丁': { food: '🍖', fx: '🔥', anim: 'bwA_dino' },
    '桃桃': { food: '🍎', fx: '😋', anim: 'bwA_pig' },
    '西西': { food: '🐟', fx: '💤', anim: 'bwA_catSleepy' },
    '果冻': { food: '🐌', fx: '💧', anim: 'bwA_frog' },
    '布林': { food: '🧊', fx: '❄️', anim: 'bwA_penguin' },
    '啾啾': { food: '🌽', fx: '🪶', anim: 'bwA_chick' },
    '麻薯': { food: '🍡', fx: '🫧', anim: 'bwA_sticky' },
    '泡芙': { food: '🧁', fx: '💗', anim: 'bwA_creampuff' },
    '曲奇': { food: '🍪', fx: '🤎', anim: 'bwA_cookie' },
    '柠檬': { food: '🌿', fx: '💧', anim: 'bwA_duck' },
    '松果': { food: '🌰', fx: '🍂', anim: 'bwA_squirrel' },
    '草莓': { food: '🍓', fx: '🍬', anim: 'bwA_strawberry' },
    '芋泥': { food: '🍠', fx: '🫐', anim: 'bwA_taro' },
    '可可': { food: '🦴', fx: '💛', anim: 'bwA_dog' },
    '蛋挞': { food: '🥧', fx: '🌞', anim: 'bwA_golden' },
    '彩虹': { food: '🌈', fx: '✨', anim: 'bwA_rainbow' }
  };

  /* 隐藏传说娃娃：集齐 20 只后召唤 */
  var HIDDEN = { name: '彩虹', img: IMG('dolls/彩虹.jpg'), personality: '传说级暖暖', like: '只在集齐所有伙伴时才肯现身', line: '谢谢你让20颗小星星聚在一起，愿彩虹落在你心上。', prompt: 'one magical rainbow colored plush cat, iridescent shiny fur, tiny angel wings, big sparkling starry eyes, floating gently among little golden stars, adorable, studio product shot, pastel pink background' };

  /* 盲盒商店：16 款软萌软胶玩具 + 1 款稀有隐藏 */
  /* 拆盲盒：5 大类 ×（8 普通 + 1 隐藏）= 45 款；按当前分类抽盒 */
  var CATEGORIES = [
    {
      key: 'animal', name: '软萌动物', emoji: '🐾',
      toys: [
        { name: '团子喵', img: IMG('toys/animal/团子喵.jpg'), line: '一盒软糯，喵 ~', prompt: 'one cute squishy soft-toy cat with round marshmallow body, shiny squishy vinyl texture, big glossy happy eyes, soft cream and pink color, adorable, studio product shot, pastel pink background' },
        { name: '布丁兔', img: IMG('toys/animal/布丁兔.jpg'), line: '晃一晃，身体弹一弹', prompt: 'one cute squishy pudding soft toy shaped like a little rabbit, jiggly caramel body wearing bunny ears, shiny jelly texture, adorable, studio product shot, pastel pink background' },
        { name: '云朵羊', img: IMG('toys/animal/云朵羊.jpg'), line: '软成一片云', prompt: 'one cute fluffy cloud sheep soft toy, round cotton-candy wool, sleepy happy face, soft white and pink, adorable, studio product shot, pastel pink background' },
        { name: '奶泡企鹅', img: IMG('toys/animal/奶泡企鹅.jpg'), line: '咕嘟咕嘟，冒泡泡', prompt: 'one cute squishy milky foam penguin soft toy, soft white and orange, round chubby body, happy smile, adorable, studio product shot, pastel pink background' },
        { name: '泡泡蛙', img: IMG('toys/animal/泡泡蛙.jpg'), line: '咕呱，全是泡泡', prompt: 'one cute bubble frog soft toy, soft green jelly body blowing a bubble, big round eyes, adorable, studio product shot, pastel pink background' },
        { name: '转圈猴', img: IMG('toys/animal/转圈猴.jpg'), line: '转呀转呀，头晕晕', prompt: 'one cute baby chimpanzee plush toy with big round ears and long curly tail, warm brown fur, playful grin holding a tiny banana, studio product shot, pastel pink background' },
        { name: '小麋鹿', img: IMG('toys/animal/小麋鹿.jpg'), line: '戴好小铃铛，圣诞见', prompt: 'one cute little moose soft toy, soft brown plush body with red bow and tiny bell, gentle smile, adorable, studio product shot, pastel pink background' },
        { name: '芒果鸭', img: IMG('toys/animal/芒果鸭.jpg'), line: '嘎嘎，把香甜分你一半', prompt: 'one cute mango duck soft toy, round squishy yellow body, orange beak smile, pastel green garnish, adorable, studio product shot, pastel pink background' }
      ],
      hidden: { name: '彩虹独角兽', img: IMG('toys/animal/z-彩虹独角兽.jpg'), line: '我可是传说中限定的彩虹独角兽！', prompt: 'one legendary cute rainbow unicorn squishy soft toy, iridescent pastel horn and mane, sparkling starry eyes, soft glowing body, rare legendary, studio product shot, pastel pink background' }
    },
    {
      key: 'dessert', name: '甜品甜点', emoji: '🍰',
      toys: [
        { name: '星星软糖', img: IMG('toys/dessert/星星软糖.jpg'), line: '把这一刻，沾一点甜', prompt: 'one cute translucent gummy star candy soft toy, shiny jelly texture, big sweet smile, pastel candy colors, adorable, studio product shot, pastel pink background' },
        { name: '小酸奶', img: IMG('toys/dessert/小酸奶.jpg'), line: '轻咬一口，都是奶香', prompt: 'one cute squishy yogurt cup soft toy shaped like a little bear, creamy white with berry pink lid, shiny squishy texture, big friendly eyes, adorable, studio product shot, pastel pink background' },
        { name: '奶黄包', img: IMG('toys/dessert/奶黄包.jpg'), line: '趁热咬一口，会流心哦', prompt: 'one cute custard bao soft toy shaped like a little bun, glossy soft golden yellow body, tiny steam swirl on top, plump round shape, adorable, studio product shot, pastel pink background' },
        { name: '芝士鼠', img: IMG('toys/dessert/芝士鼠.jpg'), line: '有小洞洞，也超可爱', prompt: 'one cute cheese mouse soft toy, warm yellow cheese block shaped like a little mouse, soft plush, happy face, adorable, studio product shot, pastel pink background' },
        { name: '西瓜猪', img: IMG('toys/dessert/西瓜猪.jpg'), line: '我是一个小甜甜', prompt: 'one cute watermelon pig soft toy, pink squishy pig body with green watermelon rind, big happy eyes, adorable, studio product shot, pastel pink background' },
        { name: '曲奇牛', img: IMG('toys/dessert/曲奇牛.jpg'), line: '哞 ~ 今天也很甜', prompt: 'one cute cookie cow soft toy, white cow body with chocolate cookie spots, big friendly eyes, adorable, studio product shot, pastel pink background' },
        { name: '草莓杯', img: IMG('toys/dessert/草莓杯.jpg'), line: '一勺下去，酸酸甜甜', prompt: 'one cute strawberry parfait cup soft toy, layered pink and cream body in a tiny glass cup topped with a strawberry, adorable, studio product shot, pastel pink background' },
        { name: '抹茶卷', img: IMG('toys/dessert/抹茶卷.jpg'), line: '慢慢转出来，每一层都是绿', prompt: 'one cute matcha roll cake soft toy, green and white spiral swirl, soft sponge texture, tiny cream dollop on top, adorable, studio product shot, pastel pink background' }
      ],
      hidden: { name: '小笼包国王', img: IMG('toys/dessert/z-小笼包国王.jpg'), line: '皮薄馅大，谁与争锋！', prompt: 'one regal cute steamed xiaolongbao king soft toy, plump translucent dumpling with a tiny golden crown on top, soft jelly texture, proud face, rare legendary, studio product shot, pastel pink background' }
    },
    {
      key: 'weird', name: '稀奇古怪', emoji: '🤪',
      toys: [
        { name: '咬人袜', img: IMG('toys/weird/咬人袜.jpg'), line: '「我才不是普通的袜子！」——它说', prompt: 'one cute squishy soft toy sock monster, pastel rainbow striped sock body with two tiny fangs poking out, big mischievous eyes, soft plush texture, studio product shot, pastel pink background' },
        { name: '充电菇', img: IMG('toys/weird/充电菇.jpg'), line: '电量低于 20% 时会小声哭泣', prompt: 'one cute squishy soft toy mushroom, plump rounded cap with tiny USB-C port on the belly, glowing power button, soft pastel mint and lavender body, studio product shot, pastel pink background' },
        { name: '便利贴小狗', img: IMG('toys/weird/便利贴小狗.jpg'), line: '贴在你心上请轻一点，撕下来会委屈', prompt: 'one cute squishy soft toy shaped like a sticky note, dog face drawn on it, pastel yellow paper body with a tiny adhesive strip on the back, soft plush texture, studio product shot, pastel pink background' },
        { name: '硬盘君', img: IMG('toys/weird/硬盘君.jpg'), line: '你存的都什么乱七八糟的！', prompt: 'one cute squishy soft toy shaped like a tiny 3.5 inch hard drive, grumpy cartoon face with furrowed brow, tiny arms crossed, soft mint green body, studio product shot, pastel pink background' },
        { name: '回形针乐手', img: IMG('toys/weird/回形针乐手.jpg'), line: '别小看我，旋律我都会', prompt: 'one cute squishy soft toy shaped like a silver paperclip, wearing tiny headphones, holding a music note, shiny silver plush body, studio product shot, pastel pink background' },
        { name: '空盒', img: IMG('toys/weird/空盒.jpg'), line: '买到就是赚到。赚到啥？问它', prompt: 'one cute squishy soft toy shaped like a small open box, with another smaller box inside, infinite russian doll nesting visible, pastel cream and pink striped box, studio product shot, pastel pink background' },
        { name: '午睡椒', img: IMG('toys/weird/午睡椒.jpg'), line: '再热也要冷静入睡', prompt: 'one cute squishy soft toy shaped like a tiny chili pepper, wearing a tiny sleep cap, eyes half closed yawning, soft coral red body, studio product shot, pastel pink background' },
        { name: '海苔', img: IMG('toys/weird/海苔.jpg'), line: '吃完请记得再补一片，谢谢', prompt: 'one cute squishy soft toy shaped like a tiny piece of nori seaweed, wavy and curly edges, sleepy face with one eye closed yawning, deep green body with golden edges, studio product shot, pastel pink background' }
      ],
      hidden: { name: '愤怒便利贴', img: IMG('toys/weird/z-愤怒便利贴.jpg'), line: '别再贴了别再贴了！', prompt: 'one legendary grumpy sticky note soft toy, yellow paper with an angry cartoon face, tiny arms raised in frustration, soft plush texture, rare legendary, studio product shot, pastel pink background' }
    },
    {
      key: 'fruit', name: '蔬果派对', emoji: '🍅',
      toys: [
        { name: '草莓', img: IMG('toys/fruit/草莓.jpg'), line: '红着脸说"我很甜"', prompt: 'one cute squishy soft toy strawberry, glossy red body with tiny green leaves, big happy eyes, adorable, studio product shot, pastel pink background' },
        { name: '葡萄', img: IMG('toys/fruit/葡萄.jpg'), line: '一串不够，再来一串', prompt: 'one cute squishy soft toy grape cluster, plump purple round berries, glossy jelly texture, tiny smiling face, adorable, studio product shot, pastel pink background' },
        { name: '菠萝', img: IMG('toys/fruit/菠萝.jpg'), line: '扎手归扎手，甜是真甜', prompt: 'one cute squishy soft toy pineapple, spiky green and yellow body, friendly face, soft plush texture, adorable, studio product shot, pastel pink background' },
        { name: '苹果', img: IMG('toys/fruit/苹果.jpg'), line: '一天一苹果，医生远离我', prompt: 'one cute squishy soft toy apple, glossy red round body with tiny green leaf, rosy cheek, adorable, studio product shot, pastel pink background' },
        { name: '桃子', img: IMG('toys/fruit/桃子.jpg'), line: '咬一口，汁水会跑出来', prompt: 'one cute squishy soft toy peach, fuzzy pastel pink round body with a tiny green leaf, soft plush texture, adorable, studio product shot, pastel pink background' },
        { name: '橘子', img: IMG('toys/fruit/橘子.jpg'), line: '一瓣一瓣，吃到见底', prompt: 'one cute squishy soft toy mandarin orange, segmented round body, soft plush texture, tiny smiling face, adorable, studio product shot, pastel pink background' },
        { name: '樱桃', img: IMG('toys/fruit/樱桃.jpg'), line: '我们一直是双胞胎', prompt: 'two cute squishy soft toy cherries sharing one stem, glossy red round bodies, sweet faces, adorable, studio product shot, pastel pink background' },
        { name: '芒果', img: IMG('toys/fruit/芒果.jpg'), line: '甜到忧伤', prompt: 'one cute squishy soft toy mango, plump golden yellow oval body with rosy cheeks, soft plush texture, adorable, studio product shot, pastel pink background' }
      ],
      hidden: { name: '人参果', img: IMG('toys/fruit/z-人参果.jpg'), line: '西游记里听说过我吗？三千年一开花', prompt: 'one legendary cute ginseng fruit soft toy, plump pastel pink body shaped like a chubby baby with tiny green leaves on top, glowing aura, rare legendary, studio product shot, pastel pink background' }
    },
    {
      key: 'fantasy', name: '幻想角色', emoji: '✨',
      toys: [
        { name: '仙子', img: IMG('toys/fantasy/仙子.jpg'), line: '挥挥手，洒下星尘', prompt: 'one cute squishy soft toy fairy, pastel pink flowing dress, tiny sparkly wings, holding a magic wand, adorable, studio product shot, pastel pink background' },
        { name: '精灵', img: IMG('toys/fantasy/精灵.jpg'), line: '我住在森林深处的树屋里', prompt: 'one cute squishy soft toy elf, green tunic, pointy ears, tiny wooden bow, adorable, studio product shot, pastel pink background' },
        { name: '骑士', img: IMG('toys/fantasy/骑士.jpg'), line: '我的剑只用来切蛋糕', prompt: 'one cute squishy soft toy knight, tiny silver armor, round helmet with a plume, holding a small sword, adorable, studio product shot, pastel pink background' },
        { name: '巫师', img: IMG('toys/fantasy/巫师.jpg'), line: '我挥的不是魔法，是认真', prompt: 'one cute squishy soft toy wizard, purple starry robe, pointy hat, holding a glowing wand, adorable, studio product shot, pastel pink background' },
        { name: '忍者', img: IMG('toys/fantasy/忍者.jpg'), line: '嘘——你看不见我', prompt: 'one cute squishy soft toy ninja, black outfit with face mask, tiny throwing stars, adorable, studio product shot, pastel pink background' },
        { name: '机器人', img: IMG('toys/fantasy/机器人.jpg'), line: '电量 99%，心态 0%', prompt: 'one cute squishy soft toy robot, rounded square body with antennas, glowing heart on chest, adorable, studio product shot, pastel pink background' },
        { name: '宇航员', img: IMG('toys/fantasy/宇航员.jpg'), line: '我把星星带回来了', prompt: 'one cute squishy soft toy astronaut, white spacesuit, round helmet with star reflections, floating a tiny planet, adorable, studio product shot, pastel pink background' },
        { name: '公主', img: IMG('toys/fantasy/公主.jpg'), line: '今日的皇冠也是闪闪的', prompt: 'one cute squishy soft toy princess, pastel pink ball gown, tiny golden crown, holding a heart scepter, adorable, studio product shot, pastel pink background' }
      ],
      hidden: { name: '时空旅行者', img: IMG('toys/fantasy/z-时空旅行者.jpg'), line: '我来自未来，也来自过去', prompt: 'one legendary cute time traveler soft toy, flowing cloak with clock and gear patterns, hourglass accessory, glowing aura, rare legendary, studio product shot, pastel pink background' }
    }
  ];

  /* 图鉴收藏进度持久化 */
  var COLL_KEY = 'bw_doll_coll';
  var CELE_KEY = 'bw_doll_celebrated';
  var _col = loadColl();
  function loadColl() { try { var s = localStorage.getItem(COLL_KEY); return s ? JSON.parse(s) : []; } catch (e) { return []; } }
  function saveColl(a) { try { localStorage.setItem(COLL_KEY, JSON.stringify(a)); } catch (e) {} }
  function todayIndex() { var n = new Date(); return (n.getFullYear() * 10000 + (n.getMonth() + 1) * 100 + n.getDate()) % DOLLS.length; }

  function openDolls() {
    var m = document.createElement('div');
    m.className = 'bw-modal bw-dolls';
    var t = DOLLS[todayIndex()];
    m.innerHTML =
      '<div class="bw-modal-backdrop" data-close></div>' +
      '<div class="bw-doll-petals"></div>' +
      '<div class="bw-modal-panel bw-dolls-panel">' +
        '<button class="bw-modal-close" type="button" data-close aria-label="关闭">✕</button>' +
        '<h2 class="bw-modal-title">娃娃墙</h2>' +
        '<p class="bw-modal-sub">点一只娃娃，喂它小饼干、听它说悄悄话，集齐 20 只或许有惊喜</p>' +
        '<div class="bw-dolls-top">' +
          '<div class="bw-today">' +
            '<div class="bw-today-img"><img src="' + t.img + '" alt="" loading="lazy"></div>' +
            '<div class="bw-today-body">' +
              '<span class="bw-today-tag">✦ 今日娃娃</span>' +
              '<span class="bw-today-name">' + t.name + '</span>' +
              '<p class="bw-today-line">' + t.line + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="bw-collect" title="点亮你点开过档案卡的娃娃">' +
            '<span class="bw-collect-label">图鉴收藏</span>' +
            '<span class="bw-collect-num" id="collectNum">0 / ' + DOLLS.length + '</span>' +
            '<div class="bw-collect-rail"><div class="bw-collect-fill" id="collectFill" style="width:' + (_col.length / DOLLS.length * 100) + '%"></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="bw-dolls-wall" id="dollsWall"></div>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    buildPetals(m);
    renderDolls(m);
    updateCollect(m, _col);
  }

  function buildPetals(m) {
    var layer = m.querySelector('.bw-doll-petals');
    for (var i = 0; i < 14; i++) {
      var p = document.createElement('span');
      p.className = 'bw-petal';
      p.style.left = (Math.random() * 100) + '%';
      p.style.top = (-40 - Math.random() * 30) + 'px';
      p.style.animationDelay = (Math.random() * 8) + 's';
      p.style.animationDuration = (8 + Math.random() * 6) + 's';
      p.style.fontSize = (Math.random() * 9 + 11) + 'px';
      p.textContent = Math.random() > 0.5 ? '🌸' : '✨';
      layer.appendChild(p);
    }
  }

  function renderDolls(m) {
    var wall = m.querySelector('#dollsWall');
    wall.innerHTML = '';
    DOLLS.forEach(function (doll, i) {
      var d = document.createElement('div');
      d.className = 'bw-doll';
      d.setAttribute('data-name', doll.name);
      d.style.animationDelay = (i * 0.08) + 's';
      d.setAttribute('role', 'button');
      d.setAttribute('tabindex', '0');
      d.innerHTML =
        '<span class="bw-doll-hang"></span>' +
        '<img class="bw-doll-img" src="' + doll.img + '" alt="' + doll.name + '" loading="lazy" />' +
        '<span class="bw-doll-name">' + doll.name + '</span>';
      d.querySelector('.bw-doll-img').style.animationDelay = ((i * 0.37) % 3) + 's';
      var click = function () { onDollClick(m, d, doll); };
      d.addEventListener('click', click);
      d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onDollClick(m, d, doll); } });
      wall.appendChild(d);
    });
    /* 集齐过全部娃娃后，每次打开都召唤隐藏的彩虹宝宝 */
    if (_col.length >= DOLLS.length) ensureLegend(m);
  }

  function onDollClick(m, d, doll) {
    bounceDoll(d);
    feedDoll(d, doll);
    collectDoll(m, doll);
    showDollCard(m, doll);
  }

  /* 点击娃娃时的放大弹跳动画(重触发技巧:先移除再回流,弹完恢复呼吸) */
  function bounceDoll(d) {
    d.classList.remove('is-bounce');
    void d.offsetWidth;
    d.classList.add('is-bounce');
    var t = Date.now(); d.__bt = t;
    setTimeout(function () { if (d.__bt === t) d.classList.remove('is-bounce'); }, 900);
  }

  /* 投喂彩蛋：按娃娃专属动作表，冒专属食物 + 专属特效，娃娃做专属动作 */
  function feedDoll(d, doll) {
    var a = ACT[doll && doll.name] || ACT['糯米'];
    var old = d.parentNode.querySelector('.bw-doll-yum');
    if (old) old.parentNode.removeChild(old);
    var yum = document.createElement('span');
    yum.className = 'bw-doll-yum';
    yum.innerHTML = '<i class="y-foo">' + a.food + '</i><i class="y-fx">' + a.fx + '</i>';
    d.appendChild(yum);
    d.classList.add('is-fed');
    var img = d.querySelector('.bw-doll-img');
    var cur = d.getAttribute('data-anim');
    if (cur) img.classList.remove(cur);
    void img.offsetWidth;
    img.classList.add(a.anim);
    d.setAttribute('data-anim', a.anim);
    setTimeout(function () {
      if (yum.parentNode) yum.parentNode.removeChild(yum);
      img.classList.remove(a.anim);
      d.classList.remove('is-fed');
    }, 1600);
  }

  function collectDoll(m, doll) {
    if (_col.indexOf(doll.name) === -1) {
      _col.push(doll.name);
      saveColl(_col);
      updateCollect(m, _col);
    }
  }

  function updateCollect(m, collect) {
    var num = m.querySelector('#collectNum');
    if (!num) return;
    num.textContent = collect.length + ' / ' + DOLLS.length;
    var fill = m.querySelector('#collectFill');
    if (fill) fill.style.width = (collect.length / DOLLS.length * 100) + '%';
    m.querySelectorAll('.bw-doll').forEach(function (d) {
      if (collect.indexOf(d.getAttribute('data-name')) > -1) d.classList.add('is-collected');
    });
    if (collect.length >= DOLLS.length) {
      var done = false; try { done = !!localStorage.getItem(CELE_KEY); } catch (e) {}
      if (!done) doCelebrate(m);
    }
  }

  /* 集齐全部娃娃：金色烟花 + 横幅 + 召唤隐藏的彩虹宝宝 */
  function doCelebrate(m) {
    try { localStorage.setItem(CELE_KEY, '1'); } catch (e) {}
    try { fireConfetti(m); } catch (e) {}
    var banner = document.createElement('div');
    banner.className = 'bw-doll-banner';
    banner.innerHTML = '✦ 恭喜集齐全部小星星 ✦ 彩虹宝宝被你的爱召唤而来 ✦';
    m.querySelector('.bw-dolls-panel').appendChild(banner);
    setTimeout(function () { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 4200);
    ensureLegend(m);
  }

  function ensureLegend(m) {
    var wall = m.querySelector('#dollsWall');
    if (!wall || wall.querySelector('.bw-doll-legend')) return;
    var d = document.createElement('div');
    d.className = 'bw-doll bw-doll-legend';
    d.setAttribute('data-name', '彩虹');
    d.setAttribute('role', 'button'); d.setAttribute('tabindex', '0');
    d.innerHTML =
      '<span class="bw-doll-hang"></span>' +
      '<img class="bw-doll-img" src="' + HIDDEN.img + '" alt="彩虹宝宝" loading="lazy" />' +
      '<span class="bw-doll-name">彩虹宝宝</span>';
    d.querySelector('.bw-doll-img').style.animationDelay = '0s';
    var open = function () { bounceDoll(d); feedDoll(d, HIDDEN); showDollCard(m, HIDDEN); };
    d.addEventListener('click', open);
    d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    wall.appendChild(d);
    var note = document.createElement('div');
    note.className = 'bw-doll-legend-note';
    note.textContent = '✦ 传说中集齐所有伙伴才会现身的守护小队长 ✦';
    wall.appendChild(note);
  }

  function fireConfetti(m) {
    var panel = m.querySelector('.bw-dolls-panel');
    var box = panel.getBoundingClientRect();
    var cx = box.left + box.width / 2, cy = box.top + 44;
    for (var i = 0; i < 26; i++) {
      var p = document.createElement('span');
      p.className = 'bw-confetti';
      p.textContent = Math.random() > 0.5 ? '✨' : '⭐';
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      p.style.setProperty('--dx', (Math.random() * 220 - 110) + 'px');
      p.style.setProperty('--dy', (Math.random() * 240 - 60) + 'px');
      p.style.animationDelay = (i * 0.03) + 's';
      document.body.appendChild(p);
      (function (el) { setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1800 + i * 30); })(p);
    }
  }

  /* 点击娃娃：弹出个人档案卡(名字 / 性格 / 喜欢 / 悄悄话) */
  function showDollCard(m, doll) {
    var old = m.querySelector('.bw-doll-pop');
    if (old) old.parentNode.removeChild(old);
    var pop = document.createElement('div');
    pop.className = 'bw-doll-pop bw-doll-card';
    pop.innerHTML =
      '<img class="bw-doll-card-img" src="' + doll.img + '" alt="' + doll.name + '" />' +
      '<div class="bw-doll-card-body">' +
        '<span class="bw-doll-pop-name">✿ ' + doll.name + '</span>' +
        '<div class="bw-doll-fields">' +
          '<div class="bw-doll-field"><b>性格</b><span>' + doll.personality + '</span></div>' +
          '<div class="bw-doll-field"><b>喜欢</b><span>' + doll.like + '</span></div>' +
          '<div class="bw-doll-field bw-doll-field-line"><b>悄悄话</b><span>' + doll.line + '</span></div>' +
        '</div>' +
      '</div>' +
      '<button class="bw-doll-pop-x" type="button" title="关闭">✕</button>';
    m.appendChild(pop);
    pop.querySelector('.bw-doll-pop-x').addEventListener('click', function () {
      if (pop.parentNode) pop.parentNode.removeChild(pop);
    });
  }
  /* 盲盒商店：摇盒开盖，蹦出软萌小玩具(16款+1稀有隐藏，纯随机不收藏) */
  function openToyShop() {
    var m = document.createElement('div');
    m.className = 'bw-modal bw-shop';
    var catsHtml = CATEGORIES.map(function (c, i) {
      return '<button class="bw-shop-cat' + (i === 0 ? ' is-on' : '') + '" type="button" data-cat="' + i + '" title="' + c.name + '">' +
        '<span class="bw-shop-cat-emoji">' + c.emoji + '</span>' +
        '<span class="bw-shop-cat-name">' + c.name + '</span>' +
      '</button>';
    }).join('');
    m.innerHTML =
      '<div class="bw-modal-backdrop" data-close></div>' +
      '<div class="bw-modal-panel bw-shop-panel">' +
        '<button class="bw-modal-close" type="button" data-close aria-label="关闭">✕</button>' +
        '<h2 class="bw-modal-title">盲盒商店</h2>' +
        '<p class="bw-modal-sub">5 大类 · 摇一摇、开一开 · 每类藏一只限定款</p>' +
        '<div class="bw-shop-cats" id="shopCats">' + catsHtml + '</div>' +
        '<div class="bw-shop-stage">' +
          '<div class="bw-shop-box" id="shopBox" role="button" tabindex="0" title="点我开盒">' +
            '<span class="bw-box-lid-front"></span>' +
            '<span class="bw-shop-q">?</span>' +
            '<span class="bw-shop-cat-tag" id="shopCatTag">🐾</span>' +
            '<span class="bw-shop-hint">点我开盒</span>' +
          '</div>' +
        '</div>' +
        '<div class="bw-shop-result" id="shopResult"></div>' +
        '<button class="bw-shop-again" id="shopAgain" type="button" style="display:none">再开一盒</button>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    var panel = m.querySelector('.bw-shop-panel');
    var box = m.querySelector('#shopBox');
    var stage = m.querySelector('.bw-shop-stage');
    var res = m.querySelector('#shopResult');
    var again = m.querySelector('#shopAgain');
    var catTag = m.querySelector('#shopCatTag');
    var curCat = 0;  /* 当前选中的分类下标 */

    function pick() {
      var cat = CATEGORIES[curCat];
      if (Math.random() < 0.12) return cat.hidden;
      return cat.toys[Math.floor(Math.random() * cat.toys.length)];
    }
    function openBox() {
      if (stage.style.display === 'none') return;
      box.classList.add('shaking');
      setTimeout(function () {
        stage.style.display = 'none';
        showToy(pick());
      }, 780);
    }
    function showToy(t) {
      var cat = CATEGORIES[curCat];
      var rare = t === cat.hidden;
      res.innerHTML =
        '<img class="bw-toy-img' + (rare ? ' is-rare' : '') + '" src="' + t.img + '" alt="' + t.name + '" />' +
        '<div class="bw-toy-name' + (rare ? ' is-rare' : '') + '">' + t.name + '</div>' +
        '<div class="bw-toy-cat-tag">' + cat.emoji + ' ' + cat.name + '</div>' +
        '<div class="bw-toy-line">' + t.line + '</div>';
      res.classList.add('open');
      panel.classList.toggle('rare', rare);
      again.style.display = 'inline-block';
      if (rare) {
        var b = document.createElement('div');
        b.className = 'bw-shop-rare';
        b.textContent = '✦ ' + cat.name + '限定款 ✦ ' + t.name + '出现了！';
        panel.appendChild(b);
        setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 4200);
      }
    }
    function reset() {
      stage.style.display = '';
      box.classList.remove('shaking');
      res.classList.remove('open');
      res.innerHTML = '';
      panel.classList.remove('rare');
      again.style.display = 'none';
    }
    /* 切换分类：若已经开过盒，自动重置为初始盒 */
    m.querySelectorAll('.bw-shop-cat').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-cat'), 10);
        if (idx === curCat) return;
        curCat = idx;
        m.querySelectorAll('.bw-shop-cat').forEach(function (b) { b.classList.remove('is-on'); });
        btn.classList.add('is-on');
        catTag.textContent = CATEGORIES[curCat].emoji;
        reset();
      });
    });
    box.addEventListener('click', openBox);
    box.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBox(); } });
    again.addEventListener('click', reset);
  }

  /* ============ 四季窗 ============ */
  /* AI 生成卡通窗外景（与娃娃屋同款 text_to_image 服务，首次访问触发生成，之后 CDN 直出） */
  /* WIN_IMG 已废弃：所有季节图预生成到 /images/seasons/ */
  var SEASONS = {
    spring: {
      img: IMG('seasons/spring.jpg'),
      part: '🌸',
      caption: '春天来了，柳树绿了，溪水醒了。田里的小朋友放着风筝，燕子在蓝天上唱歌。'
    },
    summer: {
      img: IMG('seasons/summer.jpg'),
      part: '☀️',
      caption: '池塘里的荷花开得正盛，青蛙在荷叶上打盹，蜻蜓点过水面，知了在柳枝上叫个不停。'
    },
    autumn: {
      img: IMG('seasons/autumn.jpg'),
      part: '🍂',
      caption: '天凉好个秋。稻田一片金黄，大雁排成行飞往南方，红红的枫叶落满小径。'
    },
    winter: {
      img: IMG('seasons/winter.jpg'),
      part: '❄️',
      caption: '大雪把屋顶盖得厚厚的，腊梅在墙角悄悄开了，雪人站在院子里，等着春天。'
    }
  };
  function openWindow() {
    var m = document.createElement('div');
    m.className = 'bw-modal bw-winmodal';
    m.innerHTML =
      '<div class="bw-modal-backdrop" data-close></div>' +
      '<div class="bw-modal-panel bw-win-panel">' +
        '<button class="bw-modal-close" type="button" data-close aria-label="关闭">✕</button>' +
        '<h2 class="bw-modal-title">四季窗</h2>' +
        '<p class="bw-modal-sub">公主屋的小窗，窗外住着春夏秋冬 · 点窗放大外景</p>' +
        '<div class="bw-room">' +
          '<div class="bw-win-frame" id="winFrame">' +
            '<div class="bw-win-scene" id="winScene"></div>' +
            '<div class="bw-win-sash bw-win-sash-l"><span class="bw-win-sash-in"></span></div>' +
            '<div class="bw-win-sash bw-win-sash-r"><span class="bw-win-sash-in"></span></div>' +
            '<div class="bw-win-sill"><span class="bw-win-sill-plant">🪴</span><span class="bw-win-sill-candle">🕯️</span></div>' +
          '</div>' +
          '<div class="bw-win-fullview" id="winFull"><img alt="" /></div>' +
          '<div class="bw-win-tabs">' +
            '<button class="bw-win-tab is-on" type="button" data-season="spring">🌱 春</button>' +
            '<button class="bw-win-tab" type="button" data-season="summer">☀️ 夏</button>' +
            '<button class="bw-win-tab" type="button" data-season="autumn">🍁 秋</button>' +
            '<button class="bw-win-tab" type="button" data-season="winter">⛄ 冬</button>' +
          '</div>' +
        '</div>' +
        '<p class="bw-win-caption" id="winCap"></p>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    var scene = m.querySelector('#winScene');
    var cap = m.querySelector('#winCap');
    var frame = m.querySelector('#winFrame');
    var full = m.querySelector('#winFull');
    var fullImg = full.querySelector('img');
    var room = frame.parentElement;
    var panel = m.querySelector('.bw-modal-panel');
    /* 把季节按钮从房间内部挪到 panel 容器内（房间 overflow:hidden 会切掉按钮），
       同时把 is-zoom class 同步到 panel，使 .is-zoom .bw-win-tabs 选择器仍能命中 */
    var tabs = room.querySelector('.bw-win-tabs');
    if (tabs) panel.appendChild(tabs);
    var curSeason = 'spring';
    var WIN_HINT = '点一点窗户，推开它，看看窗外住着谁？🪟';
    function render(key) {
      curSeason = key;
      var s = SEASONS[key];
      scene.className = 'bw-win-scene is-' + key;
      scene.innerHTML = '<img class="bw-win-view" src="' + s.img + '" alt="' + key + '" />';
      fullImg.src = s.img;
      fullImg.alt = key;
      cap.textContent = s.caption;
    }
    render('spring');
    cap.textContent = WIN_HINT;
    m.querySelectorAll('.bw-win-tab').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        m.querySelectorAll('.bw-win-tab').forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        render(b.getAttribute('data-season'));
        /* 放大画面上切季：保持放大态，直接切换外景 */
      });
    });
    /* 点窗户：放大外景（再点还原房间）；放大时窗棂淡出 */
    frame.addEventListener('click', function (e) {
      e.stopPropagation();
      /* is-zoom 同时加在 .bw-room 和 .bw-modal-panel 上：
         - .bw-room.is-zoom 让 .is-zoom .bw-win-frame::before/::after 等后代选择器命中
         - .bw-modal-panel.is-zoom 让从房间内挪出的 .bw-win-tabs 也能被 .is-zoom 命中 */
      var zoom = room.classList.toggle('is-zoom');
      panel.classList.toggle('is-zoom', zoom);
      /* 室内时显示引导文案，推开后显示季节旁白 */
      cap.textContent = zoom ? SEASONS[curSeason].caption : WIN_HINT;
    });
    /* 放大态下点击画面任意空白处也可退出，回到室内 */
    room.addEventListener('click', function () {
      if (this.classList.contains('is-zoom')) {
        this.classList.remove('is-zoom');
        panel.classList.remove('is-zoom');
        cap.textContent = WIN_HINT;
      }
    });
  }
})();
</script>
