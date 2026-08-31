/* ===== 鑴戞礊椤碉細瀹囧畽澹伴煶鍏ㄥ睆鎾斁鍣?===== */
(function () {
  var root = document.getElementById('bwModalRoot');
  if (!root) return;

  /* --- 鎵撳紑/鍏抽棴妯℃€?--- */
  function openCosmos(e) {
    lastTrigger = (e && e.currentTarget) || null;
    var m = document.createElement('div');
    m.className = 'bw-modal bw-cosmos';
    m.innerHTML =
      '<div class="bw-modal-backdrop" data-close></div>' +
      '<div class="bw-modal-panel">' +
        '<button class="bw-modal-close" type="button" data-close aria-label="鍏抽棴">鉁?/button>' +
        '<h2 class="bw-modal-title">瀹囧畽澹伴煶</h2>' +
        '<p class="bw-modal-sub">閫夋嫨涓€娈靛畤瀹欑數娉紝闂笂鐪肩潧鑱嗗惉</p>' +
        '<div class="bw-cosmos-sky">' +
          '<span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span>' +
          '<span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span>' +
          '<span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span>' +
          '<span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span><span class="bw-cosmos-star"></span>' +
        '</div>' +
        '<div class="bw-cosmos-options">' +
          '<button class="bw-cosmo-opt" type="button" data-sound="deep">娣辩┖浣庨</button>' +
          '<button class="bw-cosmo-opt" type="button" data-sound="pulsar">鑴夊啿鏄?/button>' +
          '<button class="bw-cosmo-opt" type="button" data-sound="solar">澶槼椋?/button>' +
          '<button class="bw-cosmo-opt" type="button" data-sound="wave">寮曞姏娉?/button>' +
          '<button class="bw-cosmo-opt" type="button" data-sound="jupiter">鏈ㄦ槦鐢垫尝</button>' +
        '</div>' +
        '<div class="bw-cosmos-status">鏈挱鏀?路 鐐瑰嚮涓婃柟閫夐」寮€濮?/div>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    m.querySelectorAll('.bw-cosmo-opt').forEach(function (btn) {
      btn.addEventListener('click', function () { playSound(m, btn); });
    });
    document.addEventListener('keydown', onModalKey);
    setupModalA11y(m);
  }
  function closeModal(m) {
    stopAll();
    if (vizRaf) { cancelAnimationFrame(vizRaf); vizRaf = null; }
    if (m && m.parentNode) m.parentNode.removeChild(m);
    document.body.classList.remove('bw-modal-open');
    document.removeEventListener('keydown', onModalKey);
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      try { lastTrigger.focus(); } catch (e) {}
    }
    lastTrigger = null;
  }
  /* 模态无障碍：role/aria + 焦点移到关闭按钮 + Tab 焦点圈 */
  function setupModalA11y(m) {
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.setAttribute('tabindex', '-1');
    var closer = m.querySelector('.bw-modal-close');
    if (closer) setTimeout(function () { try { closer.focus(); } catch (e) {} }, 0);
  }
  /* 累计扎小人次数：localStorage 持久化，封面展示徽章 */
  var VO_STAT_KEY = 'bw_voodoo_stat';
  function loadVoodooStat() { try { return JSON.parse(localStorage.getItem(VO_STAT_KEY)) || {}; } catch (e) { return {}; } }
  function saveVoodooStat(o) { try { localStorage.setItem(VO_STAT_KEY, JSON.stringify(o)); } catch (e) {} }
  function bumpVoodooStat(key) {
    var o = loadVoodooStat();
    o[key] = (o[key] || 0) + 1;
    saveVoodooStat(o);
    renderVoodooStat();
  }
  function renderVoodooStat() {
    var el = document.getElementById('voodooStat');
    if (!el) return;
    var o = loadVoodooStat();
    var total = 0; for (var k in o) total += (o[k] | 0);
    if (total > 0) { el.textContent = '已扎服 ' + total + ' 次'; el.removeAttribute('hidden'); }
    else el.setAttribute('hidden', '');
  }
  renderVoodooStat();
  var lastTrigger = null;
  function onModalKey(e) {
    if (e.key === 'Escape') {
      var m = document.querySelector('.bw-modal');
      if (m) closeModal(m);
    }
  }

  /* --- Web Audio 瀹囧畽鍣煶鍚堟垚锛堢▼搴忓悎鎴愶紝闆堕煶棰戞枃浠讹級 --- */
  var actx = null;
  var master = null;    /* 鍏变韩涓昏緭鍑?*/
  var analyser = null;  /* 棰戣氨鍒嗘瀽:椹卞姩鏄熺┖寰嬪姩 */
  var activeNodes = null;
  var vizRaf = null;    /* 寰嬪姩鍔ㄧ敾寰幆 */
  var vizTarget = { sky: null, stars: [] };
  var freqData = null;
  /* 椤甸潰鍗歌浇鍏滃簳:纭繚浠讳綍鏂瑰紡閫€鍑洪兘鍋滄澹伴煶 */
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
          /* interval id:clearInterval; 鍏跺畠:stop+disconnect */
          if (typeof n === 'number') { clearInterval(n); return; }
          try { n.stop && n.stop(); } catch (e) {}
          try { n.disconnect(); } catch (e) {}
        });
      } catch (e) {}
      activeNodes = null;
    }
    /* 鍋滄寰嬪姩寰幆骞跺浣嶇敾闈?*/
    pauseViz();
    if (vizTarget.sky) {
      vizTarget.sky.style.removeProperty('--pulse');
      vizTarget.sky.style.removeProperty('--shimmer');
    }
    vizTarget = { sky: null, stars: [] };
  }
  /* 寰嬪姩寰幆:璇婚璋?鈫?椹卞姩鏄熸槦闂儊閫熷害 + 鍏夋檿鍛煎惛 */
  function vizLoop() {
    vizRaf = 0;
    if (vizPaused) return;
    vizRaf = requestAnimationFrame(vizLoop);
    if (!analyser || !freqData) return;
    analyser.getByteFrequencyData(freqData);
    var len = freqData.length;
    if (!len) return;
    /* 浣庨鑳介噺(鍓?/4) 鈫?鍏夋檿鍛煎惛 */
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
    /* 鏄熸槦:鑳介噺瓒婇珮闂儊瓒婂揩 */
    var dur = Math.max(0.6, 3 - shimmer * 2.2);
    var stars = vizTarget.stars;
    for (i = 0; i < stars.length; i++) {
      if (stars[i] && stars[i].style) stars[i].style.animationDuration = dur.toFixed(2) + 's';
    }
  }
  /* 寰嬪姩鎺у埗:椤甸潰闅愯棌鏃舵殏鍋?raf銆佸彲瑙佹椂鎭㈠;涓?stopAll 澶嶇敤鍚屼竴涓紑鍏?*/
  var vizPaused = false;
  function pauseViz() {
    vizPaused = true;
    if (vizRaf) { cancelAnimationFrame(vizRaf); vizRaf = 0; }
  }
  function resumeViz() {
    if (!vizPaused) return;
    vizPaused = false;
    if (activeNodes && analyser && freqData && !vizRaf) vizLoop();
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pauseViz(); else resumeViz();
  });
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
    /* 娣辩┖浣庨锛氱矇鍣０ + 浣庨€?+ 缂撴參璧蜂紡 */
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
    /* 鑴夊啿鏄燂細瑙勫緥鐨勫摂鍝旇剦鍐?*/
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
    /* 澶槼椋庯細鐧藉櫔澹?+ 楂橀€?+ 椋樺拷璧蜂紡 */
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
    /* 寮曞姏娉細鏋佷綆棰戝棥鍡′笂涓嬫壂棰?*/
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
    /* 鏈ㄦ槦鐢垫尝锛氶敮榻挎尝 + 甯﹂€氭壂鎻忥紙绉戝够鎰熷晛鍟撅級 */
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
    /* 再点同一个按钮：暂停当前声音 */
    if (btn.classList.contains('is-on') && activeNodes) {
      stopAll();
      m.querySelectorAll('.bw-cosmo-opt').forEach(function (b) { b.classList.remove('is-on'); });
      var status0 = m.querySelector('.bw-cosmos-status');
      if (status0) status0.textContent = '已暂停 · 点击其他选项切换';
      return;
    }
    stopAll();
    var nodes = presets[key]();
    activeNodes = nodes;
    m.querySelectorAll('.bw-cosmo-opt').forEach(function (b) { b.classList.remove('is-on'); });
    btn.classList.add('is-on');
    var status = m.querySelector('.bw-cosmos-status');
    if (status) status.textContent = '姝ｅ湪鎾斁 路 ' + btn.textContent.trim();
    /* 缁戝畾寰嬪姩鐩爣骞跺惎鍔ㄩ璋卞惊鐜?*/
    vizTarget = {
      sky: m.querySelector('.bw-cosmos-sky'),
      stars: Array.prototype.slice.call(m.querySelectorAll('.bw-cosmos-star'))
    };
    if (!vizRaf && !document.body.classList.contains('bw-reduced-motion')) vizLoop();
  }

  /* --- 减少动画：检测系统偏好，标记 body + 让 cosmos 不跑频谱循环 --- */
  (function initReducedMotion() {
    var rmq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!rmq) return;
    function apply() {
      if (rmq.matches) document.body.classList.add('bw-reduced-motion');
      else document.body.classList.remove('bw-reduced-motion');
    }
    apply();
    if (rmq.addEventListener) rmq.addEventListener('change', apply);
    else if (rmq.addListener) rmq.addListener(apply);
  })();

  /* --- 主题切换：localStorage 记忆，跟随系统 --- */
  (function initTheme() {
    var KEY = 'bw_theme';
    var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var forceDark = saved === 'dark';
    var forceLight = saved === 'light';
    function apply() {
      var useDark = forceDark || (!forceLight && prefersDark);
      document.body.classList.toggle('bw-dark', useDark && !forceLight);
      document.body.classList.toggle('bw-auto-dark', useDark && !forceLight && !saved);
    }
    apply();
    var btn = document.createElement('button');
    btn.className = 'bw-theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', '切换主题');
    btn.title = '切换主题';
    btn.textContent = (document.body.classList.contains('bw-dark') || document.body.classList.contains('bw-auto-dark')) ? '☀️' : '🌙';
    btn.addEventListener('click', function () {
      var isDark = document.body.classList.contains('bw-dark') || document.body.classList.contains('bw-auto-dark');
      if (isDark) { forceDark = false; forceLight = true; try { localStorage.setItem(KEY, 'light'); } catch (e) {} document.body.classList.remove('bw-dark', 'bw-auto-dark'); btn.textContent = '🌙'; }
      else { forceDark = true; forceLight = false; try { localStorage.setItem(KEY, 'dark'); } catch (e) {} document.body.classList.add('bw-dark'); btn.textContent = '☀️'; }
    });
    document.body.appendChild(btn);
    /* 跟随系统：用户没手动选过时，OS 切换跟着变 */
    if (!saved && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!forceLight && !forceDark) { prefersDark = e.matches; apply(); btn.textContent = (document.body.classList.contains('bw-dark')) ? '☀️' : '🌙'; }
      });
    }
  })();

  /* --- 鍗＄墖鐐瑰嚮鎵撳紑 --- */
  document.querySelectorAll('.bw-card[data-bw-open]').forEach(function (card) {
    var mode = card.getAttribute('data-bw-open');
    var open = { cosmos: openCosmos, galaxy: openGalaxy, dolls: openDolls, shop: openToyShop, window: openWindow, voodoo: openVoodoo }[mode] || openCosmos;
    card.addEventListener('click', open);
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  /* ============ 鑴戞礊鏄熺郴锛堢偣瀛愬簱锛?============ */
  /* 榛樿鑴戞礊鐐瑰瓙 */
  var GALAXY_IDEAS = [
    { t: '澶╃┖鍐欒瘲鏈?, d: '涓€鏋舵棤浜烘満鍦ㄤ簯灞備笂鐢ㄧ儫杞ㄥ啓璇楋紝鎶ご灏辫兘璇诲埌澶╃┖鐨勬儏涔︺€? },
    { t: '鏈堝厜鍏呯數', d: '鎶婃墍鏈夎矾鐏崲鎴愭敹闆嗘湀鍏夌殑瑁呯疆锛屽鏅氬仠鐢垫椂涔熻兘娓╂煍鍙戜寒銆? },
    { t: '鏃堕棿鑳跺泭蹇€?, d: '瀵勪竴灏佺粰鍗佸勾鍚庤嚜宸辩殑淇★紝鐢辨湭鏉ョ殑鏃堕挓浜茶嚜绛炬敹銆? },
    { t: '浼氶鐨勫浘涔﹂', d: '鐑皵鐞冭浇鐫€鏃т功鐜父涓栫晫锛屾瘡鍒颁竴涓煄甯傛崲涓€鎵硅鑰呫€? },
    { t: '澹伴煶鐞ョ弨', d: '鎶婇噸瑕佹棩瀛愮殑澹伴煶灏佽繘鐞ョ弨锛屽骞村悗鎽囨檭灏辫兘鍚閭ｅ勾澶忓ぉ銆? },
    { t: '浜戞湹鏋曞ご', d: '閲囬泦鍗堝悗鐨勪簯鍋氭垚鏋曞ご锛屽け鐪犳椂韬鸿繘鍘诲氨鍥炲埌鏃犲咖鏃犺檻鐨勭骞淬€? },
    { t: '鏄熼檯閭', d: '鍦ㄥ眿椤剁珛涓€涓俊绠憋紝鐩镐俊鐨勪汉寰€閲屾姇閫掑績浜嬶紝鏄熸槦鏇夸綘杞氦銆? },
    { t: '褰╄櫣琛ョ粰绔?, d: '闆ㄥぉ杩囧悗鐨勫崄瀛楄矾鍙ｈ嚜鍔ㄦ磼鍑轰竴閬撳僵铏癸紝缁欒刀璺殑浜轰竴鐬殑濂藉績鎯呫€? }
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

  function openGalaxy(e) {
    lastTrigger = (e && e.currentTarget) || null;
    var m = document.createElement('div');
    m.className = 'bw-modal bw-galaxy';
    m.innerHTML =
      '<div class="bw-gal-bg" id="galSky"></div>' +
      '<div class="bw-modal-panel bw-galaxy-panel">' +
        '<button class="bw-modal-close" type="button" data-close title="鍏抽棴">鉁?/button>' +
        '<h2 class="bw-modal-title">鑴戞礊鏄熺郴</h2>' +
        '<p class="bw-modal-sub">姣忎竴棰楁槦閮芥槸涓€涓兂娉?路 鐐逛寒瀹冧滑锛屾垨鎸備笂鏂扮殑鑴戞礊</p>' +
        '<div class="bw-gal-add">' +
          '<input class="bw-gal-input" id="galInput" type="text" maxlength="18" placeholder="鍐欎笅涓€涓柊鐨勮剳娲炵偣瀛愨€? />' +
          '<button class="bw-gal-btn" id="galAddBtn" type="button">鎸備笂鏄熺┖ 鉁?/button>' +
        '</div>' +
        '<div class="bw-gal-tip">鐐瑰嚮鏄熸槦鏌ョ湅鎯虫硶 路 涔熷彲鍦ㄤ笅鏂规柊澧?/div>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    document.addEventListener('keydown', onModalKey);
    setupModalA11y(m);
    /* 娓叉煋鍏ㄥ睆鏄熺郴鑳屾櫙 */
    var sky = m.querySelector('#galSky');
    renderGalaxy(sky);
    /* 鏂板鐐瑰瓙 */
    var input = m.querySelector('#galInput');
    var addBtn = m.querySelector('#galAddBtn');
    function addIdea() {
      var v = (input.value || '').trim();
      if (!v) return;
      var id = 'g' + Date.now();
      galIdeas.push({ id: id, t: v, d: '鍒氬垰鎸備笂鏄熺┖鐨勫喘鏂拌剳娲炪€?, x: 8 + Math.random() * 82, y: 10 + Math.random() * 72 });
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
    /* 鑳屾櫙鏄熺偣 */
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
    /* 杩炵嚎(SVG):杩炴帴姣忛鏄熷埌鏈€杩戠殑鍙︿竴棰?*/
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
    /* 鏄熸槦 */
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

  /* 鏌ョ湅鐐瑰瓙璇︽儏(寮瑰嚭鐨勮糠浣犲崱鐗?鎸傚埌妯℃€佸眰浠ョ洊浣忛潰鏉? */
  function showGalIdea(sky, idea) {
    var modal = sky.parentNode;
    var old = modal.querySelector('.bw-gal-pop');
    if (old) old.parentNode.removeChild(old);
    var pop = document.createElement('div');
    pop.className = 'bw-gal-pop';
    pop.innerHTML =
      '<span class="bw-gal-pop-t">鉁?' + idea.t + '</span>' +
      '<span class="bw-gal-pop-d">' + idea.d + '</span>' +
      '<button class="bw-gal-pop-x" type="button" title="鍏抽棴">鉁?/button>';
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

  /* ============ 濞冨▋灞嬶紙濞冨▋澧欙級 ============ */
  /* 鎵€鏈?AI 閰嶅浘宸查鐢熸垚鍒?source/brainwave/images/锛屾瘡涓暟鎹」甯?img 瀛楁鐩存帴寮曠敤鏈湴 */
  var IMG = function (rel) { return '/brainwave/images/' + rel; };
  /* 姣忓彧濞冨▋锛氬悕瀛?+ 鎬ф牸 + 鍠滄鐨勪簨 + 鎮勬倓璇?+ AI 鍥?prompt锛?脳4=20 鍙級 */
  var DOLLS = [
    { name: '绯背', img: IMG('dolls/绯背.jpg'), personality: '娓╂煍鐖辩潯', like: '鎶辩潃铚傝湝缃愭墦鐩癸紝鍦ㄤ綘闅捐繃鏃堕€掍笂涓€涓姳鎶?, line: '浠婂ぉ鐨勭儲鎭硷紝閮借鎴戝嵎杩涘皬鑲氱毊閲屽暒銆?, prompt: 'one cute plush teddy bear, caramel cream color, round chubby body, soft woolly texture, big glossy eyes, tiny blush cheeks, studio product shot, pastel pink background' },
    { name: '濂剁硸', img: IMG('dolls/濂剁硸.jpg'), personality: '濂藉鍙堟椿娉?, like: '鏀堕泦娓呮櫒鐨勯湶鐝狅紝绔栬捣闀胯€虫湹鍚閲岀殑鏁呬簨', line: '鑰虫湹杩欎箞闀匡紝鏄负浜嗗伔鍋锋帴浣忎綘鐨勫ソ娑堟伅銆?, prompt: 'one fluffy white plush bunny with soft pink inner ears, cute rounded shape, big sparkling eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '甯冧竵', img: IMG('dolls/甯冧竵.jpg'), personality: '鎱垫噿灏忓偛濞?, like: '鏅掑お闃虫墦鍛煎櫆锛屽伔鐪嬩綘璁ょ湡鍐欏瓧鐨勪晶鑴?, line: '鍛煎櫆鍛煎櫆锛屾妸浣犵殑涓嶅紑蹇冮兘鍛煎櫆璧般€?, prompt: 'one round orange tabby plush kitten, chubby round face, closed happy eyes, sweet smile, soft plush fur, studio product shot, pastel pink background' },
    { name: '姗欏瓙', img: IMG('dolls/姗欏瓙.jpg'), personality: '寮€鏈楀厓姘?, like: '杩界潃鑷繁鐨勫熬宸磋浆鍦堬紝鎶婄敎姗欏懗鎶辨姳鍒嗙粰澶у', line: '灏惧反钘忎笉浣忓紑蹇冿紝灏辫瀹冩憞鍟婃憞銆?, prompt: 'one cute plush fox with big fluffy orange tail, cream belly, big adorable eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '妫夎姳', img: IMG('dolls/妫夎姳.jpg'), personality: '杞悓瀹崇緸', like: '瓒村湪绐楄竟鏁版槦鏄燂紝鎶婄儲蹇冧簨瑁硅繘浜戞湹閲?, line: '杞坏缁电殑锛屾渶閫傚悎鍦ㄤ綘闅捐繃鏃堕潬涓€闈犮€?, prompt: 'one fluffy woolly plush lamb with cloudlike curly wool, gentle closed eyes, sweet smile, studio product shot, pastel pink background' },
    { name: '璞嗕竵', img: IMG('dolls/璞嗕竵.jpg'), personality: '鍕囨暍鍙堥€炲己', like: '鍋囪寰堝嚩鍦颁繚鎶ゅぇ瀹讹紝鍏跺疄鏈€鎬曡鎼旂棐鐥?, line: '鍒湅鎴戝皬锛屾垜鍙槸鎭愰緳閲岀殑鍕囨暍鎷呭綋锛?, prompt: 'one cute green plush baby dinosaur, round chubby body, tiny arms, big shiny eyes, adorable smile, studio product shot, pastel pink background' },
    { name: '妗冩', img: IMG('dolls/妗冩.jpg'), personality: '鐢滅敎杞蒋', like: '姣忓ぉ缁欒嚜宸变竴涓崏鑾撳懗鎶辨姳', line: '鐢熸椿鏈夌偣鑻︼紝浣嗘垜鏄敎鐨勩€?, prompt: 'one cute plush pink pig, round soft body, big glossy eyes, tiny blush, adorable smile, studio product shot, pastel pink background' },
    { name: '瑗胯タ', img: IMG('dolls/瑗胯タ.jpg'), personality: '瀹夐潤蹇冩€濈粏', like: '鏀惰棌闆ㄥ悗鐨勫僵铏癸紝鐢昏繘浣犵殑姊﹂噷', line: '鍒湅鎴戣瘽灏戯紝鎴戣寰椾綘鎵€鏈夌殑濂姐€?, prompt: 'one cute plush blue kitten with sleepy soft eyes, round fluffy body, tiny blush, studio product shot, pastel pink background' },
    { name: '鏋滃喕', img: IMG('dolls/鏋滃喕.jpg'), personality: '娲绘臣鍛卞懕', like: '涓嬮洦澶╄烦杩涙睜濉橀噷锛屽拰闆ㄦ淮鎺掓帓闃?, line: '鐢熸椿鍢涳紝鎬昏韫﹁范涓や笅鎵嶈繃鐦俱€?, prompt: 'one cute plush green frog, round chubby body, bright wide eyes, cheerful smile, studio product shot, pastel pink background' },
    { name: '甯冩灄', img: IMG('dolls/甯冩灄.jpg'), personality: '绋抽噸鎱㈡偁鎮?, like: '鍐ぉ鏈€鏆栫殑锛屾槸鍜屾湅鍙嬩滑鎸ゅ湪涓€璧?, line: '璧板緱鎱㈡病鍏崇郴锛屾垜涓嶆€ョ潃绂诲紑浣犮€?, prompt: 'one cute plush blue penguin, round belly, orange feet, big sparkly eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '鍟惧暰', img: IMG('dolls/鍟惧暰.jpg'), personality: '鍏冩皵婊℃弧', like: '涓€澶╁埌鏅氬鐫€澶槼鍙藉徑鍙?, line: '鎯虫妸绗竴缂曟櫒鍏夛紝鍒嗕竴缂曠粰浣犮€?, prompt: 'one cute plush yellow chick, chubby round body, bright joyful eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '楹昏柉', img: IMG('dolls/楹昏柉.jpg'), personality: '榛忎汉灏忓洟瀛?, like: '涓嶇煡涓嶈灏遍粡鍦ㄤ綘韬竟涓嶆兂璧?, line: '鎯充綘浜嗭紝鎵€浠ユ妸鑷繁鍙樻垚杞蒋鐨勩€?, prompt: 'one cute plush white bear, precise soft round body, glossy gentle eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '娉¤姍', img: IMG('dolls/娉¤姍.jpg'), personality: '鐢滃埌鍐掓场', like: '寰€骞冲嚒鐨勬棩瀛愰噷鍔犱竴鐐瑰ザ娌?, line: '涓嶅紑蹇冪殑鏃跺€欙紝璇疯交杞诲挰鎴戜竴鍙ｃ€?, prompt: 'one cute plush cream bunny with swirl creampuff look, round soft body, sweet sparkling eyes, studio product shot, pastel pink background' },
    { name: '鏇插', img: IMG('dolls/鏇插.jpg'), personality: '韪忓疄鍙潬', like: '鎶婇毦棰樿€愬績鐑ゆ垚鑴嗚剢鐨勬洸濂?, line: '鎱㈡參鏉ワ紝涓€鍒囬兘鏉ュ緱鍙娿€?, prompt: 'one cute plush brown bear with cookie speckles, round fluffy body, warm kind eyes, studio product shot, pastel pink background' },
    { name: '鏌犳', img: IMG('dolls/鏌犳.jpg'), personality: '娓呯埥涔愪箰', like: '鍦ㄦ按闈㈠垝鍑轰竴閬撻亾灏忓皬鐨勬稛婕?, line: '閰搁吀鐨勬垜锛屾渶閰嶇敎鐢滅殑浣犮€?, prompt: 'one cute plush yellow duck, round soft body, bright cheerful eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '鏉炬灉', img: IMG('dolls/鏉炬灉.jpg'), personality: '鏈虹伒鐖卞洡', like: '鎶婄澶╃殑蹇箰閮芥敹杩涘皬鍙ｈ', line: '浣犵粰鐨勫皬纭垢锛屾垜閮芥倓鎮勭弽钘忋€?, prompt: 'one cute plush squirrel with big fluffy tail, round chubby body, bright clever eyes, studio product shot, pastel pink background' },
    { name: '鑽夎帗', img: IMG('dolls/鑽夎帗.jpg'), personality: '杞痜u杞痜u', like: '缁欏钩鍑＄殑鏃ュ瓙鎾掍笂涓€灞傜硸闇?, line: '鎴戠殑蹇冿紝鏄崏鑾撳懗鐨勩€?, prompt: 'one cute plush pink bear with strawberry detail, round soft body, glossy happy eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '鑺嬫偿', img: IMG('dolls/鑺嬫偿.jpg'), personality: '娓╂煍瀵¤█', like: '鎶婃兂璇寸殑璇濋兘璇村緱寰堣交寰堟殩', line: '闈犺繎涓€鐐癸紝灏辫兘鍚鎴戠殑蹇冭烦銆?, prompt: 'one cute plush purple bear, round chubby body, soft gentle eyes, tiny blush, studio product shot, pastel pink background' },
    { name: '鍙彲', img: IMG('dolls/鍙彲.jpg'), personality: '蹇犺瘹鏆栨殩', like: '闄綘鍒板ぉ浜紝鍐嶉€佷綘瀹夊叏鍥炲', line: '鏃犺澶氭櫄锛岄兘绛変綘鍥炴潵銆?, prompt: 'one cute plush brown puppy, round fluffy body, big faithful eyes, happy ears, studio product shot, pastel pink background' },
    { name: '铔嬫尀', img: IMG('dolls/铔嬫尀.jpg'), personality: '杞朝璐槾', like: '鐑埍浜洪棿鐑熺伀姘斾笌鐢滄粙婊嬬殑鍛抽亾', line: '鏃ュ瓙杩欑倝鐏紝寰楁湁鐢滃懗鎵嶅渾婊°€?, prompt: 'one cute plush golden kitten, round chubby body, sunny golden fur, big sparkly eyes, studio product shot, pastel pink background' }
  ];

  /* 鎶曞杺鍔ㄤ綔琛細姣忓彧濞冨▋涓撳睘椋熺墿 + 涓撳睘鐗规晥 + 涓撳睘鍔ㄤ綔鍔ㄧ敾 */
  var ACT = {
    '绯背': { food: '馃嵂', fx: '馃嵂', anim: 'bwA_bear' },
    '濂剁硸': { food: '馃', fx: '馃', anim: 'bwA_bunny' },
    '甯冧竵': { food: '馃悷', fx: '馃悷', anim: 'bwA_cat' },
    '姗欏瓙': { food: '馃崐', fx: '馃崐', anim: 'bwA_fox' },
    '妫夎姳': { food: '馃崱', fx: '鈽侊笍', anim: 'bwA_lamb' },
    '璞嗕竵': { food: '馃崠', fx: '馃敟', anim: 'bwA_dino' },
    '妗冩': { food: '馃崕', fx: '馃構', anim: 'bwA_pig' },
    '瑗胯タ': { food: '馃悷', fx: '馃挙', anim: 'bwA_catSleepy' },
    '鏋滃喕': { food: '馃悓', fx: '馃挧', anim: 'bwA_frog' },
    '甯冩灄': { food: '馃', fx: '鉂勶笍', anim: 'bwA_penguin' },
    '鍟惧暰': { food: '馃尳', fx: '馃', anim: 'bwA_chick' },
    '楹昏柉': { food: '馃崱', fx: '馃', anim: 'bwA_sticky' },
    '娉¤姍': { food: '馃', fx: '馃挆', anim: 'bwA_creampuff' },
    '鏇插': { food: '馃崻', fx: '馃', anim: 'bwA_cookie' },
    '鏌犳': { food: '馃尶', fx: '馃挧', anim: 'bwA_duck' },
    '鏉炬灉': { food: '馃尠', fx: '馃崅', anim: 'bwA_squirrel' },
    '鑽夎帗': { food: '馃崜', fx: '馃崿', anim: 'bwA_strawberry' },
    '鑺嬫偿': { food: '馃崰', fx: '馃珢', anim: 'bwA_taro' },
    '鍙彲': { food: '馃Υ', fx: '馃挍', anim: 'bwA_dog' },
    '铔嬫尀': { food: '馃ェ', fx: '馃尀', anim: 'bwA_golden' },
    '褰╄櫣': { food: '馃寛', fx: '鉁?, anim: 'bwA_rainbow' }
  };

  /* 闅愯棌浼犺濞冨▋锛氶泦榻?20 鍙悗鍙敜 */
  var HIDDEN = { name: '褰╄櫣', img: IMG('dolls/褰╄櫣.jpg'), personality: '浼犺绾ф殩鏆?, like: '鍙湪闆嗛綈鎵€鏈変紮浼存椂鎵嶈偗鐜拌韩', line: '璋㈣阿浣犺20棰楀皬鏄熸槦鑱氬湪涓€璧凤紝鎰垮僵铏硅惤鍦ㄤ綘蹇冧笂銆?, prompt: 'one magical rainbow colored plush cat, iridescent shiny fur, tiny angel wings, big sparkling starry eyes, floating gently among little golden stars, adorable, studio product shot, pastel pink background' };

  /* 鐩茬洅鍟嗗簵锛?6 娆捐蒋钀岃蒋鑳剁帺鍏?+ 1 娆剧█鏈夐殣钘?*/
  /* 鎷嗙洸鐩掞細5 澶х被 脳锛? 鏅€?+ 1 闅愯棌锛? 45 娆撅紱鎸夊綋鍓嶅垎绫绘娊鐩?*/
  var CATEGORIES = [
    {
      key: 'animal', name: '杞悓鍔ㄧ墿', emoji: '馃惥',
      toys: [
        { name: '鍥㈠瓙鍠?, img: IMG('toys/animal/鍥㈠瓙鍠?jpg'), line: '涓€鐩掕蒋绯紝鍠?~', prompt: 'one cute squishy soft-toy cat with round marshmallow body, shiny squishy vinyl texture, big glossy happy eyes, soft cream and pink color, adorable, studio product shot, pastel pink background' },
        { name: '甯冧竵鍏?, img: IMG('toys/animal/甯冧竵鍏?jpg'), line: '鏅冧竴鏅冿紝韬綋寮逛竴寮?, prompt: 'one cute squishy pudding soft toy shaped like a little rabbit, jiggly caramel body wearing bunny ears, shiny jelly texture, adorable, studio product shot, pastel pink background' },
        { name: '浜戞湹缇?, img: IMG('toys/animal/浜戞湹缇?jpg'), line: '杞垚涓€鐗囦簯', prompt: 'one cute fluffy cloud sheep soft toy, round cotton-candy wool, sleepy happy face, soft white and pink, adorable, studio product shot, pastel pink background' },
        { name: '濂舵场浼侀箙', img: IMG('toys/animal/濂舵场浼侀箙.jpg'), line: '鍜曞槦鍜曞槦锛屽啋娉℃场', prompt: 'one cute squishy milky foam penguin soft toy, soft white and orange, round chubby body, happy smile, adorable, studio product shot, pastel pink background' },
        { name: '娉℃场铔?, img: IMG('toys/animal/娉℃场铔?jpg'), line: '鍜曞懕锛屽叏鏄场娉?, prompt: 'one cute bubble frog soft toy, soft green jelly body blowing a bubble, big round eyes, adorable, studio product shot, pastel pink background' },
        { name: '杞湀鐚?, img: IMG('toys/animal/杞湀鐚?jpg'), line: '杞憖杞憖锛屽ご鏅曟檿', prompt: 'one cute baby chimpanzee plush toy with big round ears and long curly tail, warm brown fur, playful grin holding a tiny banana, studio product shot, pastel pink background' },
        { name: '灏忛簨楣?, img: IMG('toys/animal/灏忛簨楣?jpg'), line: '鎴村ソ灏忛搩閾涳紝鍦ｈ癁瑙?, prompt: 'one cute little moose soft toy, soft brown plush body with red bow and tiny bell, gentle smile, adorable, studio product shot, pastel pink background' },
        { name: '鑺掓灉楦?, img: IMG('toys/animal/鑺掓灉楦?jpg'), line: '鍢庡槑锛屾妸棣欑敎鍒嗕綘涓€鍗?, prompt: 'one cute mango duck soft toy, round squishy yellow body, orange beak smile, pastel green garnish, adorable, studio product shot, pastel pink background' }
      ],
      hidden: { name: '褰╄櫣鐙鍏?, img: IMG('toys/animal/z-褰╄櫣鐙鍏?jpg'), line: '鎴戝彲鏄紶璇翠腑闄愬畾鐨勫僵铏圭嫭瑙掑吔锛?, prompt: 'one legendary cute rainbow unicorn squishy soft toy, iridescent pastel horn and mane, sparkling starry eyes, soft glowing body, rare legendary, studio product shot, pastel pink background' }
    },
    {
      key: 'dessert', name: '鐢滃搧鐢滅偣', emoji: '馃嵃',
      toys: [
        { name: '鏄熸槦杞硸', img: IMG('toys/dessert/鏄熸槦杞硸.jpg'), line: '鎶婅繖涓€鍒伙紝娌句竴鐐圭敎', prompt: 'one cute translucent gummy star candy soft toy, shiny jelly texture, big sweet smile, pastel candy colors, adorable, studio product shot, pastel pink background' },
        { name: '灏忛吀濂?, img: IMG('toys/dessert/灏忛吀濂?jpg'), line: '杞诲挰涓€鍙ｏ紝閮芥槸濂堕', prompt: 'one cute squishy yogurt cup soft toy shaped like a little bear, creamy white with berry pink lid, shiny squishy texture, big friendly eyes, adorable, studio product shot, pastel pink background' },
        { name: '濂堕粍鍖?, img: IMG('toys/dessert/濂堕粍鍖?jpg'), line: '瓒佺儹鍜竴鍙ｏ紝浼氭祦蹇冨摝', prompt: 'one cute custard bao soft toy shaped like a little bun, glossy soft golden yellow body, tiny steam swirl on top, plump round shape, adorable, studio product shot, pastel pink background' },
        { name: '鑺濆＋榧?, img: IMG('toys/dessert/鑺濆＋榧?jpg'), line: '鏈夊皬娲炴礊锛屼篃瓒呭彲鐖?, prompt: 'one cute cheese mouse soft toy, warm yellow cheese block shaped like a little mouse, soft plush, happy face, adorable, studio product shot, pastel pink background' },
        { name: '瑗跨摐鐚?, img: IMG('toys/dessert/瑗跨摐鐚?jpg'), line: '鎴戞槸涓€涓皬鐢滅敎', prompt: 'one cute watermelon pig soft toy, pink squishy pig body with green watermelon rind, big happy eyes, adorable, studio product shot, pastel pink background' },
        { name: '鏇插鐗?, img: IMG('toys/dessert/鏇插鐗?jpg'), line: '鍝?~ 浠婂ぉ涔熷緢鐢?, prompt: 'one cute cookie cow soft toy, white cow body with chocolate cookie spots, big friendly eyes, adorable, studio product shot, pastel pink background' },
        { name: '鑽夎帗鏉?, img: IMG('toys/dessert/鑽夎帗鏉?jpg'), line: '涓€鍕轰笅鍘伙紝閰搁吀鐢滅敎', prompt: 'one cute strawberry parfait cup soft toy, layered pink and cream body in a tiny glass cup topped with a strawberry, adorable, studio product shot, pastel pink background' },
        { name: '鎶硅尪鍗?, img: IMG('toys/dessert/鎶硅尪鍗?jpg'), line: '鎱㈡參杞嚭鏉ワ紝姣忎竴灞傞兘鏄豢', prompt: 'one cute matcha roll cake soft toy, green and white spiral swirl, soft sponge texture, tiny cream dollop on top, adorable, studio product shot, pastel pink background' }
      ],
      hidden: { name: '灏忕鍖呭浗鐜?, img: IMG('toys/dessert/z-灏忕鍖呭浗鐜?jpg'), line: '鐨杽棣呭ぇ锛岃皝涓庝簤閿嬶紒', prompt: 'one regal cute steamed xiaolongbao king soft toy, plump translucent dumpling with a tiny golden crown on top, soft jelly texture, proud face, rare legendary, studio product shot, pastel pink background' }
    },
    {
      key: 'weird', name: '绋€濂囧彜鎬?, emoji: '馃お',
      toys: [
        { name: '鍜汉琚?, img: IMG('toys/weird/鍜汉琚?jpg'), line: '銆屾垜鎵嶄笉鏄櫘閫氱殑琚滃瓙锛併€嶁€斺€斿畠璇?, prompt: 'one cute squishy soft toy sock monster, pastel rainbow striped sock body with two tiny fangs poking out, big mischievous eyes, soft plush texture, studio product shot, pastel pink background' },
        { name: '鍏呯數鑿?, img: IMG('toys/weird/鍏呯數鑿?jpg'), line: '鐢甸噺浣庝簬 20% 鏃朵細灏忓０鍝常', prompt: 'one cute squishy soft toy mushroom, plump rounded cap with tiny USB-C port on the belly, glowing power button, soft pastel mint and lavender body, studio product shot, pastel pink background' },
        { name: '渚垮埄璐村皬鐙?, img: IMG('toys/weird/渚垮埄璐村皬鐙?jpg'), line: '璐村湪浣犲績涓婅杞讳竴鐐癸紝鎾曚笅鏉ヤ細濮斿眻', prompt: 'one cute squishy soft toy shaped like a sticky note, dog face drawn on it, pastel yellow paper body with a tiny adhesive strip on the back, soft plush texture, studio product shot, pastel pink background' },
        { name: '纭洏鍚?, img: IMG('toys/weird/纭洏鍚?jpg'), line: '浣犲瓨鐨勯兘浠€涔堜贡涓冨叓绯熺殑锛?, prompt: 'one cute squishy soft toy shaped like a tiny 3.5 inch hard drive, grumpy cartoon face with furrowed brow, tiny arms crossed, soft mint green body, studio product shot, pastel pink background' },
        { name: '鍥炲舰閽堜箰鎵?, img: IMG('toys/weird/鍥炲舰閽堜箰鎵?jpg'), line: '鍒皬鐪嬫垜锛屾棆寰嬫垜閮戒細', prompt: 'one cute squishy soft toy shaped like a silver paperclip, wearing tiny headphones, holding a music note, shiny silver plush body, studio product shot, pastel pink background' },
        { name: '绌虹洅', img: IMG('toys/weird/绌虹洅.jpg'), line: '涔板埌灏辨槸璧氬埌銆傝禋鍒板暐锛熼棶瀹?, prompt: 'one cute squishy soft toy shaped like a small open box, with another smaller box inside, infinite russian doll nesting visible, pastel cream and pink striped box, studio product shot, pastel pink background' },
        { name: '鍗堢潯妞?, img: IMG('toys/weird/鍗堢潯妞?jpg'), line: '鍐嶇儹涔熻鍐烽潤鍏ョ潯', prompt: 'one cute squishy soft toy shaped like a tiny chili pepper, wearing a tiny sleep cap, eyes half closed yawning, soft coral red body, studio product shot, pastel pink background' },
        { name: '娴疯嫈', img: IMG('toys/weird/娴疯嫈.jpg'), line: '鍚冨畬璇疯寰楀啀琛ヤ竴鐗囷紝璋㈣阿', prompt: 'one cute squishy soft toy shaped like a tiny piece of nori seaweed, wavy and curly edges, sleepy face with one eye closed yawning, deep green body with golden edges, studio product shot, pastel pink background' }
      ],
      hidden: { name: '鎰ゆ€掍究鍒╄创', img: IMG('toys/weird/z-鎰ゆ€掍究鍒╄创.jpg'), line: '鍒啀璐翠簡鍒啀璐翠簡锛?, prompt: 'one legendary grumpy sticky note soft toy, yellow paper with an angry cartoon face, tiny arms raised in frustration, soft plush texture, rare legendary, studio product shot, pastel pink background' }
    },
    {
      key: 'fruit', name: '钄灉娲惧', emoji: '馃崊',
      toys: [
        { name: '鑽夎帗', img: IMG('toys/fruit/鑽夎帗.jpg'), line: '绾㈢潃鑴歌"鎴戝緢鐢?', prompt: 'one cute squishy soft toy strawberry, glossy red body with tiny green leaves, big happy eyes, adorable, studio product shot, pastel pink background' },
        { name: '钁¤悇', img: IMG('toys/fruit/钁¤悇.jpg'), line: '涓€涓蹭笉澶燂紝鍐嶆潵涓€涓?, prompt: 'one cute squishy soft toy grape cluster, plump purple round berries, glossy jelly texture, tiny smiling face, adorable, studio product shot, pastel pink background' },
        { name: '鑿犺悵', img: IMG('toys/fruit/鑿犺悵.jpg'), line: '鎵庢墜褰掓墡鎵嬶紝鐢滄槸鐪熺敎', prompt: 'one cute squishy soft toy pineapple, spiky green and yellow body, friendly face, soft plush texture, adorable, studio product shot, pastel pink background' },
        { name: '鑻规灉', img: IMG('toys/fruit/鑻规灉.jpg'), line: '涓€澶╀竴鑻规灉锛屽尰鐢熻繙绂绘垜', prompt: 'one cute squishy soft toy apple, glossy red round body with tiny green leaf, rosy cheek, adorable, studio product shot, pastel pink background' },
        { name: '妗冨瓙', img: IMG('toys/fruit/妗冨瓙.jpg'), line: '鍜竴鍙ｏ紝姹佹按浼氳窇鍑烘潵', prompt: 'one cute squishy soft toy peach, fuzzy pastel pink round body with a tiny green leaf, soft plush texture, adorable, studio product shot, pastel pink background' },
        { name: '姗樺瓙', img: IMG('toys/fruit/姗樺瓙.jpg'), line: '涓€鐡ｄ竴鐡ｏ紝鍚冨埌瑙佸簳', prompt: 'one cute squishy soft toy mandarin orange, segmented round body, soft plush texture, tiny smiling face, adorable, studio product shot, pastel pink background' },
        { name: '妯辨', img: IMG('toys/fruit/妯辨.jpg'), line: '鎴戜滑涓€鐩存槸鍙岃優鑳?, prompt: 'two cute squishy soft toy cherries sharing one stem, glossy red round bodies, sweet faces, adorable, studio product shot, pastel pink background' },
        { name: '鑺掓灉', img: IMG('toys/fruit/鑺掓灉.jpg'), line: '鐢滃埌蹇т激', prompt: 'one cute squishy soft toy mango, plump golden yellow oval body with rosy cheeks, soft plush texture, adorable, studio product shot, pastel pink background' }
      ],
      hidden: { name: '浜哄弬鏋?, img: IMG('toys/fruit/z-浜哄弬鏋?jpg'), line: '瑗挎父璁伴噷鍚杩囨垜鍚楋紵涓夊崈骞翠竴寮€鑺?, prompt: 'one legendary cute ginseng fruit soft toy, plump pastel pink body shaped like a chubby baby with tiny green leaves on top, glowing aura, rare legendary, studio product shot, pastel pink background' }
    },
    {
      key: 'fantasy', name: '骞绘兂瑙掕壊', emoji: '鉁?,
      toys: [
        { name: '浠欏瓙', img: IMG('toys/fantasy/浠欏瓙.jpg'), line: '鎸ユ尌鎵嬶紝娲掍笅鏄熷皹', prompt: 'one cute squishy soft toy fairy, pastel pink flowing dress, tiny sparkly wings, holding a magic wand, adorable, studio product shot, pastel pink background' },
        { name: '绮剧伒', img: IMG('toys/fantasy/绮剧伒.jpg'), line: '鎴戜綇鍦ㄦ．鏋楁繁澶勭殑鏍戝眿閲?, prompt: 'one cute squishy soft toy elf, green tunic, pointy ears, tiny wooden bow, adorable, studio product shot, pastel pink background' },
        { name: '楠戝＋', img: IMG('toys/fantasy/楠戝＋.jpg'), line: '鎴戠殑鍓戝彧鐢ㄦ潵鍒囪泲绯?, prompt: 'one cute squishy soft toy knight, tiny silver armor, round helmet with a plume, holding a small sword, adorable, studio product shot, pastel pink background' },
        { name: '宸笀', img: IMG('toys/fantasy/宸笀.jpg'), line: '鎴戞尌鐨勪笉鏄瓟娉曪紝鏄鐪?, prompt: 'one cute squishy soft toy wizard, purple starry robe, pointy hat, holding a glowing wand, adorable, studio product shot, pastel pink background' },
        { name: '蹇嶈€?, img: IMG('toys/fantasy/蹇嶈€?jpg'), line: '鍢樷€斺€斾綘鐪嬩笉瑙佹垜', prompt: 'one cute squishy soft toy ninja, black outfit with face mask, tiny throwing stars, adorable, studio product shot, pastel pink background' },
        { name: '鏈哄櫒浜?, img: IMG('toys/fantasy/鏈哄櫒浜?jpg'), line: '鐢甸噺 99%锛屽績鎬?0%', prompt: 'one cute squishy soft toy robot, rounded square body with antennas, glowing heart on chest, adorable, studio product shot, pastel pink background' },
        { name: '瀹囪埅鍛?, img: IMG('toys/fantasy/瀹囪埅鍛?jpg'), line: '鎴戞妸鏄熸槦甯﹀洖鏉ヤ簡', prompt: 'one cute squishy soft toy astronaut, white spacesuit, round helmet with star reflections, floating a tiny planet, adorable, studio product shot, pastel pink background' },
        { name: '鍏富', img: IMG('toys/fantasy/鍏富.jpg'), line: '浠婃棩鐨勭殗鍐犱篃鏄棯闂殑', prompt: 'one cute squishy soft toy princess, pastel pink ball gown, tiny golden crown, holding a heart scepter, adorable, studio product shot, pastel pink background' }
      ],
      hidden: { name: '鏃剁┖鏃呰鑰?, img: IMG('toys/fantasy/z-鏃剁┖鏃呰鑰?jpg'), line: '鎴戞潵鑷湭鏉ワ紝涔熸潵鑷繃鍘?, prompt: 'one legendary cute time traveler soft toy, flowing cloak with clock and gear patterns, hourglass accessory, glowing aura, rare legendary, studio product shot, pastel pink background' }
    }
  ];

  /* 鍥鹃壌鏀惰棌杩涘害鎸佷箙鍖?*/
  var COLL_KEY = 'bw_doll_coll';
  var CELE_KEY = 'bw_doll_celebrated';
  var _col = loadColl();
  function loadColl() { try { var s = localStorage.getItem(COLL_KEY); return s ? JSON.parse(s) : []; } catch (e) { return []; } }
  function saveColl(a) { try { localStorage.setItem(COLL_KEY, JSON.stringify(a)); } catch (e) {} }
  function todayIndex() { var n = new Date(); return (n.getFullYear() * 10000 + (n.getMonth() + 1) * 100 + n.getDate()) % DOLLS.length; }

  function openDolls(e) {
    lastTrigger = (e && e.currentTarget) || null;
    var m = document.createElement('div');
    m.className = 'bw-modal bw-dolls';
    var t = DOLLS[todayIndex()];
    m.innerHTML =
      '<div class="bw-modal-backdrop" data-close></div>' +
      '<div class="bw-doll-petals"></div>' +
      '<div class="bw-modal-panel bw-dolls-panel">' +
        '<button class="bw-modal-close" type="button" data-close aria-label="鍏抽棴">鉁?/button>' +
        '<h2 class="bw-modal-title">濞冨▋澧?/h2>' +
        '<p class="bw-modal-sub">鐐逛竴鍙▋濞冿紝鍠傚畠灏忛ゼ骞层€佸惉瀹冭鎮勬倓璇濓紝闆嗛綈 20 鍙垨璁告湁鎯婂枩</p>' +
        '<div class="bw-dolls-top">' +
          '<div class="bw-today">' +
            '<div class="bw-today-img"><img src="' + t.img + '" alt="" loading="lazy"></div>' +
            '<div class="bw-today-body">' +
              '<span class="bw-today-tag">鉁?浠婃棩濞冨▋</span>' +
              '<span class="bw-today-name">' + t.name + '</span>' +
              '<p class="bw-today-line">' + t.line + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="bw-collect" title="鐐逛寒浣犵偣寮€杩囨。妗堝崱鐨勫▋濞?>' +
            '<span class="bw-collect-label">鍥鹃壌鏀惰棌</span>' +
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
    document.addEventListener('keydown', onModalKey);
    setupModalA11y(m);
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
      p.textContent = Math.random() > 0.5 ? '馃尭' : '鉁?;
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
    /* 闆嗛綈杩囧叏閮ㄥ▋濞冨悗锛屾瘡娆℃墦寮€閮藉彫鍞ら殣钘忕殑褰╄櫣瀹濆疂 */
    if (_col.length >= DOLLS.length) ensureLegend(m);
  }

  function onDollClick(m, d, doll) {
    bounceDoll(d);
    feedDoll(d, doll);
    collectDoll(m, doll);
    showDollCard(m, doll);
  }

  /* 鐐瑰嚮濞冨▋鏃剁殑鏀惧ぇ寮硅烦鍔ㄧ敾(閲嶈Е鍙戞妧宸?鍏堢Щ闄ゅ啀鍥炴祦,寮瑰畬鎭㈠鍛煎惛) */
  function bounceDoll(d) {
    d.classList.remove('is-bounce');
    void d.offsetWidth;
    d.classList.add('is-bounce');
    var t = Date.now(); d.__bt = t;
    setTimeout(function () { if (d.__bt === t) d.classList.remove('is-bounce'); }, 900);
  }

  /* 鎶曞杺褰╄泲锛氭寜濞冨▋涓撳睘鍔ㄤ綔琛紝鍐掍笓灞為鐗?+ 涓撳睘鐗规晥锛屽▋濞冨仛涓撳睘鍔ㄤ綔 */
  function feedDoll(d, doll) {
    var a = ACT[doll && doll.name] || ACT['绯背'];
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

  /* 闆嗛綈鍏ㄩ儴濞冨▋锛氶噾鑹茬儫鑺?+ 妯箙 + 鍙敜闅愯棌鐨勫僵铏瑰疂瀹?*/
  function doCelebrate(m) {
    try { localStorage.setItem(CELE_KEY, '1'); } catch (e) {}
    try { fireConfetti(m); } catch (e) {}
    var banner = document.createElement('div');
    banner.className = 'bw-doll-banner';
    banner.innerHTML = '鉁?鎭枩闆嗛綈鍏ㄩ儴灏忔槦鏄?鉁?褰╄櫣瀹濆疂琚綘鐨勭埍鍙敜鑰屾潵 鉁?;
    m.querySelector('.bw-dolls-panel').appendChild(banner);
    setTimeout(function () { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 4200);
    ensureLegend(m);
  }

  function ensureLegend(m) {
    var wall = m.querySelector('#dollsWall');
    if (!wall || wall.querySelector('.bw-doll-legend')) return;
    var d = document.createElement('div');
    d.className = 'bw-doll bw-doll-legend';
    d.setAttribute('data-name', '褰╄櫣');
    d.setAttribute('role', 'button'); d.setAttribute('tabindex', '0');
    d.innerHTML =
      '<span class="bw-doll-hang"></span>' +
      '<img class="bw-doll-img" src="' + HIDDEN.img + '" alt="褰╄櫣瀹濆疂" loading="lazy" />' +
      '<span class="bw-doll-name">褰╄櫣瀹濆疂</span>';
    d.querySelector('.bw-doll-img').style.animationDelay = '0s';
    var open = function () { bounceDoll(d); feedDoll(d, HIDDEN); showDollCard(m, HIDDEN); };
    d.addEventListener('click', open);
    d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    wall.appendChild(d);
    var note = document.createElement('div');
    note.className = 'bw-doll-legend-note';
    note.textContent = '鉁?浼犺涓泦榻愭墍鏈変紮浼存墠浼氱幇韬殑瀹堟姢灏忛槦闀?鉁?;
    wall.appendChild(note);
  }

  function fireConfetti(m) {
    var panel = m.querySelector('.bw-dolls-panel');
    var box = panel.getBoundingClientRect();
    var cx = box.left + box.width / 2, cy = box.top + 44;
    for (var i = 0; i < 26; i++) {
      var p = document.createElement('span');
      p.className = 'bw-confetti';
      p.textContent = Math.random() > 0.5 ? '鉁? : '猸?;
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      p.style.setProperty('--dx', (Math.random() * 220 - 110) + 'px');
      p.style.setProperty('--dy', (Math.random() * 240 - 60) + 'px');
      p.style.animationDelay = (i * 0.03) + 's';
      document.body.appendChild(p);
      (function (el) { setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1800 + i * 30); })(p);
    }
  }

  /* 鐐瑰嚮濞冨▋锛氬脊鍑轰釜浜烘。妗堝崱(鍚嶅瓧 / 鎬ф牸 / 鍠滄 / 鎮勬倓璇? */
  function showDollCard(m, doll) {
    var old = m.querySelector('.bw-doll-pop');
    if (old) old.parentNode.removeChild(old);
    var pop = document.createElement('div');
    pop.className = 'bw-doll-pop bw-doll-card';
    pop.innerHTML =
      '<img class="bw-doll-card-img" src="' + doll.img + '" alt="' + doll.name + '" />' +
      '<div class="bw-doll-card-body">' +
        '<span class="bw-doll-pop-name">鉁?' + doll.name + '</span>' +
        '<div class="bw-doll-fields">' +
          '<div class="bw-doll-field"><b>鎬ф牸</b><span>' + doll.personality + '</span></div>' +
          '<div class="bw-doll-field"><b>鍠滄</b><span>' + doll.like + '</span></div>' +
          '<div class="bw-doll-field bw-doll-field-line"><b>鎮勬倓璇?/b><span>' + doll.line + '</span></div>' +
        '</div>' +
      '</div>' +
      '<button class="bw-doll-pop-x" type="button" title="鍏抽棴">鉁?/button>';
    m.appendChild(pop);
    pop.querySelector('.bw-doll-pop-x').addEventListener('click', function () {
      if (pop.parentNode) pop.parentNode.removeChild(pop);
    });
  }
  /* 鐩茬洅鍟嗗簵锛氭憞鐩掑紑鐩栵紝韫﹀嚭杞悓灏忕帺鍏?16娆?1绋€鏈夐殣钘忥紝绾殢鏈轰笉鏀惰棌) */
  function openToyShop(e) {
    lastTrigger = (e && e.currentTarget) || null;
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
        '<button class="bw-modal-close" type="button" data-close aria-label="鍏抽棴">鉁?/button>' +
        '<h2 class="bw-modal-title">鐩茬洅鍟嗗簵</h2>' +
        '<p class="bw-modal-sub">5 澶х被 路 鎽囦竴鎽囥€佸紑涓€寮€ 路 姣忕被钘忎竴鍙檺瀹氭</p>' +
        '<div class="bw-shop-cats" id="shopCats">' + catsHtml + '</div>' +
        '<div class="bw-shop-stage">' +
          '<div class="bw-shop-box" id="shopBox" role="button" tabindex="0" title="鐐规垜寮€鐩?>' +
            '<span class="bw-box-lid-front"></span>' +
            '<span class="bw-shop-q">?</span>' +
            '<span class="bw-shop-cat-tag" id="shopCatTag">馃惥</span>' +
            '<span class="bw-shop-hint">鐐规垜寮€鐩?/span>' +
          '</div>' +
        '</div>' +
        '<div class="bw-shop-result" id="shopResult"></div>' +
        '<button class="bw-shop-again" id="shopAgain" type="button" style="display:none">鍐嶅紑涓€鐩?/button>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    document.addEventListener('keydown', onModalKey);
    setupModalA11y(m);
    var panel = m.querySelector('.bw-shop-panel');
    var box = m.querySelector('#shopBox');
    var stage = m.querySelector('.bw-shop-stage');
    var res = m.querySelector('#shopResult');
    var again = m.querySelector('#shopAgain');
    var catTag = m.querySelector('#shopCatTag');
    var curCat = 0;  /* 褰撳墠閫変腑鐨勫垎绫讳笅鏍?*/

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
        b.textContent = '鉁?' + cat.name + '闄愬畾娆?鉁?' + t.name + '鍑虹幇浜嗭紒';
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
    /* 鍒囨崲鍒嗙被锛氳嫢宸茬粡寮€杩囩洅锛岃嚜鍔ㄩ噸缃负鍒濆鐩?*/
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
    /* 鍐嶅紑涓€鐩掞細鐩存帴閲嶇疆骞惰繘鍏ュ紑鐩掓祦绋嬶紝鏃犻渶鍐嶇偣鐩掑瓙 */
    again.addEventListener('click', function () { reset(); openBox(); });
  }

  /* ============ 鍥涘绐?============ */
  /* AI 鐢熸垚鍗￠€氱獥澶栨櫙锛堜笌濞冨▋灞嬪悓娆?text_to_image 鏈嶅姟锛岄娆¤闂Е鍙戠敓鎴愶紝涔嬪悗 CDN 鐩村嚭锛?*/
  /* WIN_IMG 宸插簾寮冿細鎵€鏈夊鑺傚浘棰勭敓鎴愬埌 /images/seasons/ */
  var SEASONS = {
    spring: {
      img: IMG('seasons/spring.jpg'),
      part: '馃尭',
      caption: '鏄ュぉ鏉ヤ簡锛屾煶鏍戠豢浜嗭紝婧按閱掍簡銆傜敯閲岀殑灏忔湅鍙嬫斁鐫€椋庣瓭锛岀嚂瀛愬湪钃濆ぉ涓婂敱姝屻€?
    },
    summer: {
      img: IMG('seasons/summer.jpg'),
      part: '鈽€锔?,
      caption: '姹犲閲岀殑鑽疯姳寮€寰楁鐩涳紝闈掕洐鍦ㄨ嵎鍙朵笂鎵撶浌锛岃溁铚撶偣杩囨按闈紝鐭ヤ簡鍦ㄦ煶鏋濅笂鍙釜涓嶅仠銆?
    },
    autumn: {
      img: IMG('seasons/autumn.jpg'),
      part: '馃崅',
      caption: '澶╁噳濂戒釜绉嬨€傜ɑ鐢颁竴鐗囬噾榛勶紝澶ч泚鎺掓垚琛岄寰€鍗楁柟锛岀孩绾㈢殑鏋彾钀芥弧灏忓緞銆?
    },
    winter: {
      img: IMG('seasons/winter.jpg'),
      part: '鉂勶笍',
      caption: '澶ч洩鎶婂眿椤剁洊寰楀帤鍘氱殑锛岃厞姊呭湪澧欒鎮勬倓寮€浜嗭紝闆汉绔欏湪闄㈠瓙閲岋紝绛夌潃鏄ュぉ銆?
    }
  };
  function openWindow(e) {
    lastTrigger = (e && e.currentTarget) || null;
    var m = document.createElement('div');
    m.className = 'bw-modal bw-winmodal';
    m.innerHTML =
      '<div class="bw-modal-backdrop" data-close></div>' +
      '<div class="bw-modal-panel bw-win-panel">' +
        '<button class="bw-modal-close" type="button" data-close aria-label="鍏抽棴">鉁?/button>' +
        '<h2 class="bw-modal-title">鍥涘绐?/h2>' +
        '<p class="bw-modal-sub">鍏富灞嬬殑灏忕獥锛岀獥澶栦綇鐫€鏄ュ绉嬪啲 路 鐐圭獥鏀惧ぇ澶栨櫙</p>' +
        '<div class="bw-room">' +
          '<div class="bw-win-frame" id="winFrame">' +
            '<div class="bw-win-scene" id="winScene"></div>' +
            '<div class="bw-win-sash bw-win-sash-l"><span class="bw-win-sash-in"></span></div>' +
            '<div class="bw-win-sash bw-win-sash-r"><span class="bw-win-sash-in"></span></div>' +
            '<div class="bw-win-sill"><span class="bw-win-sill-plant">馃</span><span class="bw-win-sill-candle">馃暞锔?/span></div>' +
          '</div>' +
          '<div class="bw-win-fullview" id="winFull"><img alt="" /></div>' +
          '<div class="bw-win-tabs">' +
            '<button class="bw-win-tab is-on" type="button" data-season="spring">馃尡 鏄?/button>' +
            '<button class="bw-win-tab" type="button" data-season="summer">鈽€锔?澶?/button>' +
            '<button class="bw-win-tab" type="button" data-season="autumn">馃崄 绉?/button>' +
            '<button class="bw-win-tab" type="button" data-season="winter">鉀?鍐?/button>' +
          '</div>' +
        '</div>' +
        '<p class="bw-win-caption" id="winCap"></p>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    document.addEventListener('keydown', onModalKey);
    setupModalA11y(m);
    var scene = m.querySelector('#winScene');
    var cap = m.querySelector('#winCap');
    var frame = m.querySelector('#winFrame');
    var full = m.querySelector('#winFull');
    var fullImg = full.querySelector('img');
    var room = frame.parentElement;
    var panel = m.querySelector('.bw-modal-panel');
    /* 鎶婂鑺傛寜閽粠鎴块棿鍐呴儴鎸埌 panel 瀹瑰櫒鍐咃紙鎴块棿 overflow:hidden 浼氬垏鎺夋寜閽級锛?
       鍚屾椂鎶?is-zoom class 鍚屾鍒?panel锛屼娇 .is-zoom .bw-win-tabs 閫夋嫨鍣ㄤ粛鑳藉懡涓?*/
    var tabs = room.querySelector('.bw-win-tabs');
    if (tabs) panel.appendChild(tabs);
    var curSeason = 'spring';
    var WIN_HINT = '鐐逛竴鐐圭獥鎴凤紝鎺ㄥ紑瀹冿紝鐪嬬湅绐楀浣忕潃璋侊紵馃獰';
    function render(key) {
      curSeason = key;
      var s = SEASONS[key];
      scene.className = 'bw-win-scene is-' + key;
      scene.innerHTML = '<img class="bw-win-view" src="' + s.img + '" alt="' + key + '" loading="lazy" decoding="async" />';
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
        /* 鏀惧ぇ鐢婚潰涓婂垏瀛ｏ細淇濇寔鏀惧ぇ鎬侊紝鐩存帴鍒囨崲澶栨櫙 */
      });
    });
    /* 鐐圭獥鎴凤細鏀惧ぇ澶栨櫙锛堝啀鐐硅繕鍘熸埧闂达級锛涙斁澶ф椂绐楁娣″嚭 */
    frame.addEventListener('click', function (e) {
      e.stopPropagation();
      /* is-zoom 鍚屾椂鍔犲湪 .bw-room 鍜?.bw-modal-panel 涓婏細
         - .bw-room.is-zoom 璁?.is-zoom .bw-win-frame::before/::after 绛夊悗浠ｉ€夋嫨鍣ㄥ懡涓?
         - .bw-modal-panel.is-zoom 璁╀粠鎴块棿鍐呮尓鍑虹殑 .bw-win-tabs 涔熻兘琚?.is-zoom 鍛戒腑 */
      var zoom = room.classList.toggle('is-zoom');
      panel.classList.toggle('is-zoom', zoom);
      /* 瀹ゅ唴鏃舵樉绀哄紩瀵兼枃妗堬紝鎺ㄥ紑鍚庢樉绀哄鑺傛梺鐧?*/
      cap.textContent = zoom ? SEASONS[curSeason].caption : WIN_HINT;
    });
    /* 鏀惧ぇ鎬佷笅鐐瑰嚮鐢婚潰浠绘剰绌虹櫧澶勪篃鍙€€鍑猴紝鍥炲埌瀹ゅ唴 */
    room.addEventListener('click', function () {
      if (this.classList.contains('is-zoom')) {
        this.classList.remove('is-zoom');
        panel.classList.remove('is-zoom');
        cap.textContent = WIN_HINT;
      }
    });
  }

  /* ============ 鎵庡皬浜猴紙瑙ｅ帇鍙帮級 ============ */
  var VO_DOLLS = [
    { k: 'shirk',  name: '娌℃媴褰?, img: IMG('voodoo/娌℃媴褰?jpg'),  acc: '馃挦', line: '宸茬敓鏁堬細TA 鐨勯攨姘歌繙鏈変汉鎶㈢潃鑳?馃嵆' },
    { k: 'grump',  name: '涓嶉珮鍏?, img: IMG('voodoo/涓嶉珮鍏?jpg'),  acc: '馃槖', line: '宸茬敓鏁堬細TA 鐨勫槾瑙掍細鍋峰伔涓婃壃 0.5 绉?馃槒' },
    { k: 'stingy', name: '灏忔皵楝?, img: IMG('voodoo/灏忔皵楝?jpg'),  acc: '馃獧', line: '宸茬敓鏁堬細TA 鐨勯挶鍖呮€诲湪鏈€闇€瑕佹椂灏戜竴寮?馃獧' },
    { k: 'sly',    name: '蹇冩満楝?, img: IMG('voodoo/蹇冩満楝?jpg'),  acc: '馃攳', line: '宸茬敓鏁堬細TA 鐨勫皬绠楃洏浠婃櫄鍏ㄨ鎵撶炕 馃М' },
    { k: 'wimp',   name: '绐濆泭搴?, img: IMG('voodoo/绐濆泭搴?jpg'),  acc: '馃ズ', line: '宸茬敓鏁堬細TA 鐨勮豹瑷€澹鍏ㄥ彉鎴愨€滀笅娆′竴瀹氣€?馃搮' },
    { k: 'mixer',  name: '鍜岀█娉?, img: IMG('voodoo/鍜岀█娉?jpg'),  acc: '馃', line: '宸茬敓鏁堬細TA 鐨勨€滃悇閫€涓€姝モ€濇案杩滈€€涓嶅埌 TA 鑷繁 馃珫' }
  ];
  var VO_LINES = [
    '宸茬敓鏁堬細TA 鐨勮瀛愭案杩滃皯涓€鍙?馃Е',
    '宸茬敓鏁堬細TA 鐨勫ザ鑼舵案杩滃仛閿欑硸搴?馃',
    '宸茬敓鏁堬細TA 鏄庡ぉ浼氬乏鑴氳俯鍙宠剼 馃Χ',
    '宸茬敓鏁堬細TA 鐨勬墜鏈虹數閲忔案杩滃崱鍦?1% 馃攱',
    '宸茬敓鏁堬細TA 鐨勫揩閫掓案杩滄櫄涓€澶?馃摝',
    '宸茬敓鏁堬細TA 寮€鍐扮鎬诲繕璁拌鎷夸粈涔?鉂勶笍',
    '宸茬敓鏁堬細TA 鐨?Wi-Fi 姘歌繙宸竴鏍?馃摱',
    '宸茬敓鏁堬細TA 浼氳铓婂瓙绮惧噯绌烘姇 馃',
    '宸茬敓鏁堬細TA 鐨勯椆閽熶細鎻愬墠涓€灏忔椂鍝?鈴?,
    '宸茬敓鏁堬細TA 鐐瑰鍗栨案杩滄病鏈夐鍏?馃ア'
  ];
  var VO_PARTS = [
    { k: 'head', label: '鑴戣' },
    { k: 'tum',  label: '鑲氬瓙' },
    { k: 'arml', label: '宸︽墜' },
    { k: 'armr', label: '鍙虫墜' }
  ];
  function openVoodoo(e) {
    lastTrigger = (e && e.currentTarget) || null;
    var m = document.createElement('div');
    m.className = 'bw-modal bw-voodoo';
    var pins = VO_PARTS.map(function (p, i) {
      return '<span class="bw-vo-pin bw-vo-pin-' + p.k + '" data-i="' + i + '" title="鎵? + p.label + '"></span>';
    }).join('');
    m.innerHTML =
      '<div class="bw-modal-backdrop" data-close></div>' +
      '<div class="bw-modal-panel bw-vo-panel">' +
        '<button class="bw-modal-close" type="button" data-close aria-label="鍏抽棴">鉁?/button>' +
        '<h2 class="bw-modal-title">鎵庡皬浜?路 瑙ｅ帇鍙?/h2>' +
        '<p class="bw-modal-sub">宸﹀彸鍒囨崲灏忎汉锛屾壘鍒版渶鍍?TA 鐨勯偅涓紝鎵庡畠锛?/p>' +
        '<div class="bw-vo-stage">' +
          '<div class="bw-vo-bubble" id="voBubble">鍏堥殢鏈轰竴浣嶅垢杩愬皬浜猴綖</div>' +
          '<button class="bw-vo-nav bw-vo-prev" type="button" aria-label="涓婁竴涓?>鈥?/button>' +
          '<div class="bw-vo-view" id="voView">' +
            '<img class="bw-vo-img" id="voImg" src="" alt="" />' +
            pins +
            '<span class="bw-vo-done-badge">宸茬敓鏁?鉁?/span>' +
          '</div>' +
          '<button class="bw-vo-nav bw-vo-next" type="button" aria-label="涓嬩竴涓?>鈥?/button>' +
          '<div class="bw-vo-prog" id="voProg"></div>' +
        '</div>' +
        '<div class="bw-vo-count" id="voCount">宸叉墡 0 / 6 涓?/div>' +
        '<button class="bw-vo-again" id="voAgain" type="button" style="display:none">鍐嶆墡涓€娆?/button>' +
        '<p class="bw-vo-note">馃Х 绾睘濞变箰 路 涓嶉拡瀵逛换浣曚汉 路 鎵庡畬姘旀秷锛屽氨鍘诲悆椤垮ソ鐨勫惂 馃嵃</p>' +
      '</div>';
    document.body.appendChild(m);
    document.body.classList.add('bw-modal-open');
    m.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(m); });
    });
    document.addEventListener('keydown', onModalKey);
    setupModalA11y(m);
    var bubble = m.querySelector('#voBubble');
    var countEl = m.querySelector('#voCount');
    var again = m.querySelector('#voAgain');
    var view = m.querySelector('#voView');
    var img = m.querySelector('#voImg');
    var prog = m.querySelector('#voProg');
    var prev = m.querySelector('.bw-vo-prev');
    var next = m.querySelector('.bw-vo-next');
    var idx = (Math.random() * VO_DOLLS.length) | 0;
    var st = VO_DOLLS.map(function () { return { pins: [], full: false }; });
    function say(txt) {
      bubble.textContent = txt;
      bubble.classList.remove('pop');
      void bubble.offsetWidth;
      bubble.classList.add('pop');
    }
    function render() {
      var s = st[idx];
      var d = VO_DOLLS[idx];
      img.src = d.img;
      img.alt = d.name;
      view.classList.toggle('full', s.full);
      view.querySelectorAll('.bw-vo-pin').forEach(function (pin) {
        var i = +pin.getAttribute('data-i');
        pin.classList.toggle('done', s.pins.indexOf(i) >= 0);
      });
      prog.textContent = s.full ? d.name + ' 路 宸叉墡鏈?鉁? : d.name + ' 路 宸叉墡 ' + s.pins.length + ' / ' + VO_PARTS.length;
      var n = st.filter(function (x) { return x.full; }).length;
      countEl.textContent = '宸叉墡 ' + n + ' / ' + VO_DOLLS.length + ' 涓?;
      if (s.full) {
        again.style.display = 'inline-block';
        again.textContent = '宸叉秷姘?路 鍐嶆墡涓€娆?;
      } else {
        again.style.display = 'none';
      }
      if (n === VO_DOLLS.length) {
        say('鍏釜鍏ㄦ墡瀹屼簡锛乀A 鐨勫潖姣涚梾閮借鎵庤窇浜嗭紝姘旀秷浜嗗悧锝炩湪');
      }
      view.classList.remove('pop');
      void view.offsetWidth;
      view.classList.add('pop');
    }
    function go(step) {
      idx = (idx + step + VO_DOLLS.length) % VO_DOLLS.length;
      var s = st[idx];
      say(s.full ? VO_DOLLS[idx].name + ' 宸茶鎵庢湇锛屾崲涓嬩竴涓惂锝? : '杩欐槸' + VO_DOLLS[idx].name + '锛屽姩鎵嬪惂锝?);
      render();
    }
    view.querySelectorAll('.bw-vo-pin').forEach(function (pin) {
      pin.addEventListener('click', function (e) {
        e.stopPropagation();
        var s = st[idx];
        var i = +pin.getAttribute('data-i');
        if (s.full) { say(VO_DOLLS[idx].name + ' 宸茬粡琚墡鏈嶅暒锛屾崲涓嬩竴涓惂锝?); return; }
        if (s.pins.indexOf(i) >= 0) { say('杩欓噷宸茬粡鎵庤繃鍟︼紝鎹竴澶勶綖'); return; }
        s.pins.push(i);
        pin.classList.add('done');
        if (s.pins.length < VO_PARTS.length) {
          say(VO_LINES[(Math.random() * VO_LINES.length) | 0]);
        } else {
          s.full = true;
          view.classList.add('full');
          bumpVoodooStat(VO_DOLLS[idx].k);
          say(VO_DOLLS[idx].line + ' 鈫?' + VO_DOLLS[idx].name + ' 琚墡鏈嶄簡锛?);
        }
        render();
      });
    });
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    again.addEventListener('click', function () {
      st.forEach(function (s) { s.pins = []; s.full = false; });
      idx = (Math.random() * VO_DOLLS.length) | 0;
      again.style.display = 'none';
      say('鏂颁竴杞紝鎸戜竴涓渶鍍?TA 鐨勫惂 馃槇');
      render();
    });
    render();
  }
})();
