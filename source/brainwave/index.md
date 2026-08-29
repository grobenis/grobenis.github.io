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
    var open = { cosmos: openCosmos, galaxy: openGalaxy, dolls: openDolls }[mode] || openCosmos;
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
  var DOLL_IMG = function (prompt) {
    return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' +
      encodeURIComponent(prompt) + '&image_size=square';
  };
  /* 每只娃娃：名字 + 悄悄话 + AI 图 prompt */
  var DOLLS = [
    { name: '糯米', line: '今天的烦恼，都被我卷进小肚皮里啦。', prompt: 'one cute plush teddy bear, caramel cream color, round chubby body, soft woolly texture, big glossy eyes, tiny blush cheeks, studio product shot, pastel pink background' },
    { name: '奶糖', line: '耳朵这么长，是为了偷偷接住你的好消息。', prompt: 'one fluffy white plush bunny with soft pink inner ears, cute rounded shape, big sparkling eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '布丁', line: '呼噜呼噜，把你的不开心都呼噜走。', prompt: 'one round orange tabby plush kitten, chubby round face, closed happy eyes, sweet smile, soft plush fur, studio product shot, pastel pink background' },
    { name: '橙子', line: '尾巴藏不住开心，就让它摇啊摇。', prompt: 'one cute plush fox with big fluffy orange tail, cream belly, big adorable eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '棉花', line: '软绵绵的，最适合在你难过时靠一靠。', prompt: 'one fluffy woolly plush lamb with cloudlike curly wool, gentle closed eyes, sweet smile, studio product shot, pastel pink background' },
    { name: '豆丁', line: '别看我小，我可是恐龙里的勇敢担当！', prompt: 'one cute green plush baby dinosaur, round chubby body, tiny arms, big shiny eyes, adorable smile, studio product shot, pastel pink background' }
  ];

  function openDolls() {
    var m = document.createElement('div');
    m.className = 'bw-modal bw-dolls';
    m.innerHTML =
      '<div class="bw-modal-backdrop" data-close></div>' +
      '<div class="bw-modal-panel bw-dolls-panel">' +
        '<button class="bw-modal-close" type="button" data-close aria-label="关闭">✕</button>' +
        '<h2 class="bw-modal-title">娃娃墙</h2>' +
        '<p class="bw-modal-sub">点一只娃娃，听听它藏着的悄悄话</p>' +
        '<div class="bw-dolls-wall" id="dollsWall"></div>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    renderDolls(m);
  }

  function renderDolls(m) {
    var wall = m.querySelector('#dollsWall');
    wall.innerHTML = '';
    DOLLS.forEach(function (doll, i) {
      var d = document.createElement('div');
      d.className = 'bw-doll';
      d.style.animationDelay = (i * 0.08) + 's';
      d.setAttribute('role', 'button');
      d.setAttribute('tabindex', '0');
      d.innerHTML =
        '<span class="bw-doll-hang"></span>' +
        '<img class="bw-doll-img" src="' + DOLL_IMG(doll.prompt) + '" alt="' + doll.name + '" loading="lazy" />' +
        '<span class="bw-doll-name">' + doll.name + '</span>';
      var click = function () { showDollPop(m, doll); };
      d.addEventListener('click', click);
      d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDollPop(m, doll); } });
      wall.appendChild(d);
    });
  }

  /* 点击娃娃的悄悄话弹窗 */
  function showDollPop(m, doll) {
    var old = m.querySelector('.bw-doll-pop');
    if (old) old.parentNode.removeChild(old);
    var pop = document.createElement('div');
    pop.className = 'bw-doll-pop';
    pop.innerHTML =
      '<span class="bw-doll-pop-name">✿ ' + doll.name + '</span>' +
      '<span class="bw-doll-pop-line">' + doll.line + '</span>' +
      '<button class="bw-doll-pop-x" type="button" title="关闭">✕</button>';
    m.appendChild(pop);
    pop.querySelector('.bw-doll-pop-x').addEventListener('click', function () {
      if (pop.parentNode) pop.parentNode.removeChild(pop);
    });
  }
})();
</script>
