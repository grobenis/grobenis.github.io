---
title: 音乐
date: 2020-03-20 18:28:43
share: false
---

<!-- 顶部仅保留品牌徽章，引用语和标题靠 CSS 隐藏 -->
<div class="tv-page-mark">
<span class="tv-page-mark-eyebrow">GroTV · LIVE MUSIC ROOM</span>
</div>

<div class="music-stage">

<!-- 怀旧拉线吊灯:电视关闭时可拉动切换整页氛围 -->
<div class="pull-lamp" id="pullLamp">
<div class="lamp-cord"></div>
<div class="lamp-head">
<div class="lamp-shade"></div>
<div class="lamp-bulb" id="lampBulb"></div>
</div>
<div class="lamp-pull" id="lampPull">
<div class="lamp-chain"></div>
<div class="lamp-ball"></div>
</div>
</div>

<div class="tv-set" id="tvSet">

<!-- 左上品牌铭牌 -->
<div class="tv-brand">
<span class="tv-brand-mark">GroTV</span>
<span class="tv-brand-sub">FM STEREO · 1986</span>
</div>

<!-- VHF 兔耳天线 -->
<div class="tv-antennas">
<div class="tv-antenna"></div>
<div class="tv-antenna"></div>
<div class="tv-antenna-base"></div>
</div>

<!-- 主机 -->
<div class="tv-body">

<!-- 显示屏 -->
<div class="tv-screen-frame">
<div class="tv-screen">

<!-- 动态舞台（CRT 内容区） -->
<div class="lyric-stage">

<!-- 10 张专属 CRT 场景图，由 JS 切歌时同步切换 -->
<div class="lyric-scene is-active" data-scene="1" data-bg-crt="crt-01-zengjingdeni.jpg">
<div class="crt-particles" data-particles="warm"></div>
</div>
<div class="lyric-scene" data-scene="2" data-bg-crt="crt-02-xiaochou.jpg">
<div class="crt-particles" data-particles="cool"></div>
</div>
<div class="lyric-scene" data-scene="3" data-bg-crt="crt-03-daoxiang.jpg">
<div class="crt-particles" data-particles="dawn"></div>
</div>
<div class="lyric-scene" data-scene="4" data-bg-crt="crt-04-qingtian.jpg">
<div class="crt-particles" data-particles="warm"></div>
</div>
<div class="lyric-scene" data-scene="5" data-bg-crt="crt-05-qingmingyushang.jpg">
<div class="crt-particles" data-particles="cool"></div>
</div>
<div class="lyric-scene" data-scene="6" data-bg-crt="crt-06-qinghuaci.jpg">
<div class="crt-particles" data-particles="dawn"></div>
</div>
<div class="lyric-scene" data-scene="7" data-bg-crt="crt-07-luzhouyue.jpg">
<div class="crt-particles" data-particles="cool"></div>
</div>
<div class="lyric-scene" data-scene="8" data-bg-crt="crt-08-gaobaiqiqui.jpg">
<div class="crt-particles" data-particles="warm"></div>
</div>
<div class="lyric-scene" data-scene="9" data-bg-crt="crt-09-yasugongshang.jpg">
<div class="crt-particles" data-particles="dawn"></div>
</div>
<div class="lyric-scene" data-scene="10" data-bg-crt="crt-10-chengfu.jpg">
<div class="crt-particles" data-particles="cool"></div>
</div>

<div class="lyric-stage-overlay"></div>

<!-- CRT 扫描线 + 屏幕反光 + 雪花点 -->
<div class="tv-scanlines"></div>
<div class="tv-screen-glare"></div>
<div class="tv-snow"></div>

<!-- 换台扫描动画：左右两条白线快速扫过 -->
<div class="tv-channel-scan"></div>

<!-- 信号干扰条纹：偶发短暂出现 -->
<div class="tv-signal-glitch"></div>

<!-- 无信号画面：电视关闭后短暂显示 -->
<div class="tv-no-signal" id="tvNoSignal">
  <div class="tns-text">NO SIGNAL</div>
  <div class="tns-snow"></div>
</div>

<!-- 屏幕小剧场：点击下方控件触发（黑胶/麦克风/磁带/CD/霓虹） -->
<div class="theater-stage">
<div class="theater-dim"></div>
<div class="theater theater-vinyl"><span class="th-vinyl-disc"></span><span class="th-label th-vinyl-label">VINYL · 33⅓</span></div>
<div class="theater theater-mic"><span class="th-mic-scan th-mic-scan-1"></span><span class="th-mic-scan th-mic-scan-2"></span><span class="th-mic-scan th-mic-scan-3"></span><span class="th-label th-mic-label">GROTV · ON AIR</span></div>
<div class="theater theater-cassette"><span class="th-cassette-reel th-cassette-reel-1"></span><span class="th-cassette-reel th-cassette-reel-2"></span><span class="th-label th-cassette-label">REW · ▶ ◀</span></div>
<div class="theater theater-cd"><span class="th-cd-disc"></span><span class="th-cd-ray"></span><span class="th-label th-cd-label">CD · 44.1kHz</span></div>
<div class="theater theater-neon"><span class="th-neon-bar th-neon-bar-1">NEON</span><span class="th-neon-bar th-neon-bar-2">MUSIC</span><span class="th-neon-bar th-neon-bar-3">1986</span></div>
</div>

<!-- 歌词卡（玻璃磨砂） -->
<div class="lyric-cards">
<div class="lyric-card is-active" data-scene="1" data-bg-crt="crt-01-zengjingdeni.jpg">
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

<div class="lyric-card" data-scene="2" data-bg-crt="crt-02-xiaochou.jpg">
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

<div class="lyric-card" data-scene="3" data-bg-crt="crt-03-daoxiang.jpg">
<div class="lyric-card-header">
<span class="lyric-num">03</span>
<h3>稻香</h3>
<span class="lyric-singer">周杰伦</span>
</div>
<div class="lyric-card-body">
<p>对这个世界如果你有太多的抱怨</p>
<p>跌倒了就不敢继续往前走</p>
<p>为什么人要这么的脆弱 堕落</p>
<p>请你打开电视看看</p>
<p>多少人为生命在努力勇敢的走下去</p>
<p>我们是不是该知足</p>
<p>珍惜一切 就算没有拥有</p>
<p>还记得你说家是唯一的城堡</p>
<p>随着稻香河流继续奔跑</p>
<p>微微笑 小时候的梦我知道</p>
<p>不要哭让萤火虫带着你逃跑</p>
<p>乡间的歌谣永远的依靠</p>
<p>回家吧 回到最初的美好</p>
</div>
</div>

<!-- 第 4 首:晴天(周杰伦) - 场景 3 清晓 -->
<div class="lyric-card" data-scene="4" data-bg-crt="crt-04-qingtian.jpg">
<div class="lyric-card-header">
<span class="lyric-num">04</span>
<h3>晴天</h3>
<span class="lyric-singer">周杰伦</span>
</div>
<div class="lyric-card-body">
<p>故事的小黄花</p>
<p>从出生那年就飘着</p>
<p>童年的荡秋千</p>
<p>随记忆一直晃到现在</p>
<p>吹着前奏 望着天空</p>
<p>我想起花瓣试着掉落</p>
<p>为你翘课的那一天</p>
<p>花落的那一天</p>
<p>教室的那一间</p>
<p>我怎么看不见</p>
<p>消失的下雨天</p>
<p>我好想再淋一遍</p>
<p>没想到失去的勇气我还留着</p>
<p>好想再问一遍</p>
<p>你会等待还是离开</p>
</div>
</div>

<!-- 第 5 首:清明雨上(许嵩) - 场景 2 深夜 -->
<div class="lyric-card" data-scene="5" data-bg-crt="crt-05-qingmingyushang.jpg">
<div class="lyric-card-header">
<span class="lyric-num">05</span>
<h3>清明雨上</h3>
<span class="lyric-singer">许嵩</span>
</div>
<div class="lyric-card-body">
<p>窗透初晓 日照西厢</p>
<p>一缕青丝随风飘扬</p>
<p>谁的轻抚 散发了忧伤</p>
<p>那朵蔷薇 落满一地</p>
<p>剪不断 的红烛 映窗棂</p>
<p>化不开的愁绪 绕指柔</p>
<p>我等的人 他在多远的未来</p>
<p>那年雨声 落满西湖白堤</p>
<p>折菊寄到你身旁</p>
<p>把那过往 写在纸上</p>
<p>因为一个人 倾一座城</p>
<p>后来 再后来</p>
<p>又是一个人</p>
</div>
</div>

<!-- 第 6 首:青花瓷(周杰伦) - 场景 1 黄昏 -->
<div class="lyric-card" data-scene="6" data-bg-crt="crt-06-qinghuaci.jpg">
<div class="lyric-card-header">
<span class="lyric-num">06</span>
<h3>青花瓷</h3>
<span class="lyric-singer">周杰伦</span>
</div>
<div class="lyric-card-body">
<p>素胚勾勒出青花笔锋浓转淡</p>
<p>瓶身描绘的牡丹一如你初妆</p>
<p>冉冉檀香透过窗心事我了然</p>
<p>宣纸上走笔至此搁一半</p>
<p>釉色渲染仕女图韵味被私藏</p>
<p>而你嫣然的一笑如含苞待放</p>
<p>你的美一缕飘散</p>
<p>去到我去不了的地方</p>
<p>天青色等烟雨</p>
<p>而我在等你</p>
<p>炊烟袅袅升起</p>
<p>隔江千万里</p>
<p>在瓶底书刻你名字</p>
<p>犹如美丽的徽章</p>
</div>
</div>

<!-- 第 7 首:庐州月(许嵩) - 场景 2 深夜 -->
<div class="lyric-card" data-scene="7" data-bg-crt="crt-07-luzhouyue.jpg">
<div class="lyric-card-header">
<span class="lyric-num">07</span>
<h3>庐州月</h3>
<span class="lyric-singer">许嵩</span>
</div>
<div class="lyric-card-body">
<p>落花怅惘 流水潺潺</p>
<p>心事如青丝般缠绕</p>
<p>轻叹一声 谁的挂念</p>
<p>牵挂着那座小城</p>
<p>月光把谁的身影</p>
<p>刻在谁心上</p>
<p>往事一如昨夜的月光</p>
<p>温柔而哀伤</p>
<p>一缕青丝 几分牵挂</p>
<p>把思念寄到何方</p>
<p>我独自走在</p>
<p>这熟悉的雨巷</p>
<p>怀抱着月光</p>
<p>在思念的角落游荡</p>
</div>
</div>

<!-- 第 8 首:告白气球(周杰伦) - 场景 3 清晓 -->
<div class="lyric-card" data-scene="8" data-bg-crt="crt-08-gaobaiqiqui.jpg">
<div class="lyric-card-header">
<span class="lyric-num">08</span>
<h3>告白气球</h3>
<span class="lyric-singer">周杰伦</span>
</div>
<div class="lyric-card-body">
<p>塞纳河畔 左岸的咖啡</p>
<p>我手一杯 品尝你的美</p>
<p>留下唇印的嘴</p>
<p>花店玫瑰 名字写错谁</p>
<p>告白气球 风吹到对街</p>
<p>微笑在天上飞</p>
<p>你说 你有点难追</p>
<p>想让别人知 道我是谁</p>
<p>想要和你 一起吹吹风</p>
<p>想要送你 红色气球</p>
<p>牵着你的手 走过这条街</p>
<p>想要带你去浪漫的土耳其</p>
</div>
</div>

<!-- 第 9 首:雅俗共赏(许嵩) - 场景 3 清晓 -->
<div class="lyric-card" data-scene="9" data-bg-crt="crt-09-yasugongshang.jpg">
<div class="lyric-card-header">
<span class="lyric-num">09</span>
<h3>雅俗共赏</h3>
<span class="lyric-singer">许嵩</span>
</div>
<div class="lyric-card-body">
<p>几笔墨 勾勒写意山水</p>
<p>我自诩 风雅之人</p>
<p>不入凡尘的执念</p>
<p>却也难免落了俗套</p>
<p>你一言 我一语</p>
<p>皆是这世间 百态的浮光</p>
<p>有人正 襟危坐</p>
<p>有人嬉笑怒骂</p>
<p>千般面孔 一出戏</p>
<p>何必论 谁高雅</p>
<p>且共我 举杯饮</p>
<p>杯中月 杯中影</p>
<p>俗与雅 本无界</p>
<p>何须分 彼此</p>
</div>
</div>

<!-- 第 10 首:城府(许嵩) - 场景 2 深夜 -->
<div class="lyric-card" data-scene="10" data-bg-crt="crt-10-chengfu.jpg">
<div class="lyric-card-header">
<span class="lyric-num">10</span>
<h3>城府</h3>
<span class="lyric-singer">许嵩</span>
</div>
<div class="lyric-card-body">
<p>你的城府那么深</p>
<p>我却那么单纯</p>
<p>从没看清过你的眼神</p>
<p>像个孩子般被你骗</p>
<p>也许这故事</p>
<p>本来就是个错误</p>
<p>只是我太执着</p>
<p>不愿意去承认</p>
<p>时间让你学会了</p>
<p>不动声色的沉默</p>
<p>而我却还在</p>
<p>原地傻傻地等候</p>
<p>以为总有一天</p>
<p>你会回头</p>
</div>
</div>

</div>
</div>

<!-- 隐藏频道画面 -->
<div class="tv-hidden-screen" id="tvHiddenScreen">
  <div class="ths-grid"></div>
  <div class="ths-msg">SECRET CH 11 · UNLOCKED</div>
  <div class="ths-hint">在 5 秒内连按 CH 5 次再次关闭</div>
</div>

<!-- 频道号窗 -->
<div class="tv-channel">CH <span id="tvChannelNum">01</span></div>
</div>

<!-- 屏幕四周的金属包边 -->
<div class="tv-screen-bezel"></div>
</div>

<!-- 控制面板(屏幕下方) -->
<div class="tv-panel">
<div class="tv-panel-left">
<div class="tv-speaker"></div>
<div class="tv-speaker"></div>
<div class="tv-speaker"></div>
<div class="tv-speaker"></div>
</div>

<div class="tv-panel-right">
<span class="tv-knob-wrap">
<button class="tv-knob tv-knob-ch" id="tvKnobCh" type="button" aria-label="切换频道">
<span class="tv-knob-marks"></span>
<span class="tv-knob-pointer"></span>
</button>
<span class="tv-knob-label">CH</span>
</span>

<span class="tv-knob-wrap">
<button class="tv-knob tv-knob-vol" id="tvKnobVol" type="button" aria-label="音量">
<span class="tv-knob-marks"></span>
<span class="tv-knob-pointer"></span>
</button>
<span class="tv-knob-label">VOL</span>
</span>

<div class="tv-buttons">
<button class="tv-btn" id="tvBtnPrev" type="button" aria-label="上一首">
<span class="tv-btn-icon">&#9198;</span>
</button>
<button class="tv-btn tv-btn-play" id="tvBtnPlay" type="button" aria-label="播放/暂停">
<span class="tv-btn-icon">&#9654;</span>
</button>
<button class="tv-btn" id="tvBtnNext" type="button" aria-label="下一首">
<span class="tv-btn-icon">&#9197;</span>
</button>
</div>

<button class="tv-power-btn" id="tvPowerBtn" type="button" aria-label="电源开关" title="电源开关">
<span class="tv-power-led" id="tvPowerLed"></span>
</button>

</div>
</div>

</div>

<!-- 电视柜阴影 -->
<div class="tv-stand"></div>

</div>

<!-- 下方装饰横排:唱片 / 麦克风 / 磁带 / CD / 霓虹 / 海报 -->
<div class="deco-row">
  <div class="deco-candle" id="decoCandle" title="旧蜡烛">
    <div class="candle-body">
      <div class="candle-wick"></div>
      <div class="candle-flame" id="candleFlame"></div>
    </div>
    <div class="candle-drip"></div>
  </div>
  <div class="deco-vinyl" id="decoVinyl" title="黑胶唱片"></div>
  <div class="deco-mic" id="decoMic" title="复古麦克风">
    <div class="mic-head"></div>
    <div class="mic-stem"></div>
    <div class="mic-base"></div>
  </div>
  <div class="deco-cassette" id="decoCassette" title="老式磁带">
    <div class="reel-l" style="left:16px;"></div>
    <div class="reel-r" style="right:16px;"></div>
  </div>
  <div class="deco-cd shine" id="decoCd" title="CD 光盘">
  </div>
  <div class="deco-neon" id="decoNeon" title="霓虹招牌">MUSIC</div>
  <div class="deco-poster" id="decoPoster" title="复古海报">
    <div class="poster-title">FM 87.7</div>
    <div class="poster-line">LIVE FROM</div>
    <div class="poster-line">GROBENIS STUDIO</div>
    <div class="poster-line">1986 — ∞</div>
    <div class="poster-stars">★ ★ ★ ★ ★</div>
  </div>
</div>

<!-- 彩蛋弹窗 -->
<div class="easter-modal" id="easterModal">
  <div class="easter-modal-panel">
    <div class="easter-modal-head">
      <span class="easter-modal-icon" id="easterModalIcon">🎵</span>
      <button class="easter-modal-close" id="easterModalClose">✕</button>
    </div>
    <div class="easter-modal-title" id="easterModalTitle">小彩蛋</div>
    <div class="easter-modal-text" id="easterModalText"></div>
  </div>
</div>

<!-- 全屋烛光明暗层(纯黑氛围点燃蜡烛后出现) -->
<div class="candle-glow"></div>

<!-- CD 解锁场景:点击出现一台大电视,屏幕为黑 -->
<div class="cd-tv" id="cdWatch">
  <span class="cdtv-antenna"></span>
  <div class="cdtv-screen"></div>
  <span class="cdtv-leg"></span>
</div>

<!-- 终章:点击MUSIC点亮屏幕,弹出酷炫 I🩷U 字样 -->
<div class="finale-text" id="finaleText">I <span class="fv-heart">🩷</span> U</div>

</div><!-- /.music-stage -->

<script>
/* 锁定整页滚动 - 只让 TV 内歌词卡片可滚,其他区域全部禁止 */
(function () {
  if (!document.body.className || !/page-scene-/.test(document.body.className)) return;
  var SCROLLABLE = '.lyric-card-body';
  function inScrollable(target) {
    return target && target.closest && target.closest(SCROLLABLE);
  }
  function stopIfOutside(e) {
    if (!inScrollable(e.target)) e.preventDefault();
  }
  ['wheel', 'mousewheel', 'DOMMouseScroll', 'touchmove'].forEach(function (evt) {
    document.addEventListener(evt, stopIfOutside, { passive: false });
  });
  // 键盘上下方向键 / PgUp / PgDn / Home / End / 空格 也禁(焦点不在歌词卡时)
  document.addEventListener('keydown', function (e) {
    var blocked = [33, 34, 35, 36, 37, 38, 39, 40, 32];
    if (blocked.indexOf(e.keyCode) > -1 && !inScrollable(e.target)) e.preventDefault();
  }, { passive: false });
})();
(function () {
  var cards = document.querySelectorAll('.lyric-card');
  var chNum = document.getElementById('tvChannelNum');
  var knobCh = document.getElementById('tvKnobCh');
  var btnPrev = document.getElementById('tvBtnPrev');
  var btnNext = document.getElementById('tvBtnNext');
  var btnPlay = document.getElementById('tvBtnPlay');
  var powerLed = document.getElementById('tvPowerLed');
  var scenes = document.querySelectorAll('.lyric-scene');
  var scrollHint = document.getElementById('lyricScrollHint');
  if (!cards.length) return;
  var idx = 0;

  // 外圈氛围与 CRT 同色系：每首歌 body.page-bg-N（N 与 data-scene 一致）
  function applyPageScene(n) {
    var i, old;
    for (i = 1; i <= 10; i++) {
      old = 'page-bg-' + i;
      if (document.body.classList.contains(old)) document.body.classList.remove(old);
    }
    document.body.classList.remove('page-scene-sunset', 'page-scene-night', 'page-scene-dawn');
    if (n >= 1 && n <= 10) document.body.classList.add('page-bg-' + n);
  }

  function show(n, dir) {
    if (!cards.length) return;
    var nextIdx = ((n % cards.length) + cards.length) % cards.length;
    if (nextIdx === idx) return;
    var cur = cards[idx];
    idx = nextIdx;
    var nextCard = cards[idx];
    if (!nextCard) { idx = 0; return; }
    if (cur) cur.classList.remove('is-active');
    nextCard.classList.add('is-active', dir === 'next' ? 'slide-in-right' : 'slide-in-left');

    var sceneIdx = parseInt(nextCard.getAttribute('data-scene'), 10) || 1;
    scenes.forEach(function (s) {
      s.classList.toggle('is-active', parseInt(s.getAttribute('data-scene'), 10) === sceneIdx);
    });

    // 同步整页背景场景
    applyPageScene(sceneIdx);

    if (chNum) chNum.textContent = (idx + 1).toString().padStart(2, '0');

    // 旋钮视觉旋转：挡位与歌曲数目相同(每首 = 360°/歌曲数)
    if (knobCh) {
      knobCh.style.setProperty('--tv-rot', (idx * (360 / cards.length)) + 'deg');
    }

    // 换台扫描线闪烁
    if (window._tvFlashChannel) window._tvFlashChannel();
    // 旋钮咔哒音效
    if (window._sfxKnob) try { window._sfxKnob(); } catch (e) {}

    // 重置新卡片的滚动位置
    var nextBody = nextCard.querySelector('.lyric-card-body');
    if (nextBody) {
      nextBody.scrollTop = 0;
      updateScrollHint(nextBody);
    }

    setTimeout(function () {
      nextCard.classList.remove('slide-in-right', 'slide-in-left');
    }, 450);
  }

  // 滚动提示：到底部时隐藏
  function updateScrollHint(body) {
    if (!scrollHint) return;
    var atBottom = body.scrollHeight - body.scrollTop - body.clientHeight < 4;
    if (atBottom) {
      scrollHint.classList.add('is-hidden');
    } else {
      scrollHint.classList.remove('is-hidden');
    }
  }

  btnPrev.addEventListener('click', function () { console.log('[lyrics] prev', {idx: idx, len: cards.length}); show(idx - 1, 'prev'); });
  btnNext.addEventListener('click', function () { console.log('[lyrics] next', {idx: idx, len: cards.length}); show(idx + 1, 'next'); });
  if (knobCh) {
    knobCh.addEventListener('click', function () { show(idx + 1, 'next'); tapCh(); });
  }

  /* 扫频声绑定到所有切歌动作 */
  var origShow = show;
  show = function (n, dir) {
    if (window._sfxChannelTune) try { window._sfxChannelTune(); } catch (e) {}
    return origShow(n, dir);
  };

  /* 隐藏频道:连按CH 5次(5秒内)进入神秘画面 */
  var chTap = [];
  var hiddenEl = document.getElementById('tvHiddenScreen');
  function showHidden() {
    if (!hiddenEl) return;
    hiddenEl.classList.add('is-on');
    if (chNum) chNum.textContent = '11';
    if (window._sfxGlitch) try { window._sfxGlitch(); } catch (e) {}
  }
  function hideHidden() {
    if (hiddenEl) hiddenEl.classList.remove('is-on');
    if (chNum) chNum.textContent = (idx + 1).toString().padStart(2, '0');
  }
  function tapCh() {
    var now = Date.now();
    chTap = chTap.filter(function (t) { return now - t < 5000; });
    chTap.push(now);
    if (chTap.length >= 5) {
      chTap = [];
      if (hiddenEl && hiddenEl.classList.contains('is-on')) hideHidden(); else showHidden();
    }
  }

  /* 双击屏幕:神秘闪屏 */
  var screen = document.querySelector('.tv-screen');
  if (screen) {
    screen.addEventListener('dblclick', function (e) {
      /* 在已解锁时也能触发,CD/MUSIC 那台电视除外(避免冲突) */
      var flash = document.createElement('div');
      flash.className = 'tv-secret-flash';
      flash.style.left = e.clientX + 'px';
      flash.style.top  = e.clientY + 'px';
      document.body.appendChild(flash);
      if (window._sfxGlitch) try { window._sfxGlitch(); } catch (e) {}
      setTimeout(function () { if (flash.parentNode) flash.remove(); }, 900);
    });
  }

  /* ===== 复古电视强化：换台扫描线 + 信号干扰 + 无信号 + 音量旋钮 ===== */
  (function () {
    var scanEl = document.querySelector('.tv-channel-scan');
    var glitchEl = document.querySelector('.tv-signal-glitch');
    var noSignalEl = document.getElementById('tvNoSignal');
    var volEl = document.getElementById('tvKnobVol');
    var audio = document.querySelector('audio');

    /* 暴露给 show() 使用 */
    window._tvFlashChannel = function () {
      if (!scanEl) return;
      scanEl.classList.remove('is-on');
      void scanEl.offsetWidth; /* restart */
      scanEl.classList.add('is-on');
    };

    /* 随机干扰：每 8~18 秒短暂抖动一次 */
    setInterval(function () {
      if (document.hidden) return;
      if (Math.random() < 0.4 && glitchEl) {
        glitchEl.classList.remove('is-on');
        void glitchEl.offsetWidth;
        glitchEl.classList.add('is-on');
        if (window._sfxGlitch) try { window._sfxGlitch(); } catch (e) {}
      }
    }, 9000);

    /* 旋钮旋转：CH 已在原 show() 中设置。VOL 旋钮点击循环 0..4 */
    if (volEl) {
      volEl.style.setProperty('--vol-rot', '0deg');
      volEl.addEventListener('click', function () {
        var cur = parseInt(volEl.getAttribute('data-vol') || '0', 10);
        var next = (cur + 1) % 5;
        volEl.setAttribute('data-vol', next);
        volEl.style.setProperty('--vol-rot', (next * 72) + 'deg');
        if (audio) audio.volume = next / 4; /* 0/0.25/0.5/0.75/1 */
        /* 拨动音效(若存在) */
        if (window._sfxKnob) try { window._sfxKnob(); } catch (e) {}
      });
      /* 初始化音量 */
      if (audio) audio.volume = 0.75;
    }

    /* 暴露：电视关闭时短暂显示无信号画面 */
    window._tvNoSignalOn = function () {
      if (!noSignalEl) return;
      noSignalEl.classList.remove('is-on');
      void noSignalEl.offsetWidth;
      noSignalEl.classList.add('is-on');
      setTimeout(function () { noSignalEl.classList.remove('is-on'); }, 1800);
    };
    window._tvNoSignalOff = function () {
      if (noSignalEl) noSignalEl.classList.remove('is-on');
    };
  })();

  // 初始化页面背景场景
  applyPageScene(parseInt(cards[idx].getAttribute('data-scene'), 10) || 1);

  // 初始卡片绑定滚动监听
  cards.forEach(function (c) {
    var b = c.querySelector('.lyric-card-body');
    if (b) {
      b.addEventListener('scroll', function () { updateScrollHint(b); });
      updateScrollHint(b);
    }
  });

  // 移动端左右滑动切歌（横向位移显著才触发,避免与歌词上下滚动冲突）
  (function () {
    var stage = document.querySelector('.lyric-stage');
    if (!stage) return;
    var startX = 0, startY = 0, tracking = false;
    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { tracking = false; return; }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      // 水平滑行 >=60px 且明显比纵向位移大才算切歌
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx > 0) show(idx - 1, 'prev'); else show(idx + 1, 'next');
    }, { passive: true });
    stage.addEventListener('touchcancel', function () { tracking = false; });
  })();

  // 播放/暂停按钮（与现有 music.ejs 联动）
  if (btnPlay) {
    var audio = document.querySelector('audio');
    if (audio) {
      var setIcon = function () {
        var icon = btnPlay.querySelector('.tv-btn-icon');
        if (!icon) return;
        icon.innerHTML = audio.paused ? '&#9654;' : '&#10074;&#10074;';
      };
      btnPlay.addEventListener('click', function () {
        if (audio.paused) audio.play(); else audio.pause();
      });
      audio.addEventListener('play', setIcon);
      audio.addEventListener('pause', setIcon);
      audio.addEventListener('ended', setIcon);
      setIcon();
      // 播放中点亮电源灯
      audio.addEventListener('play', function () { powerLed.classList.add('is-on'); });
      audio.addEventListener('pause', function () { powerLed.classList.remove('is-on'); });
      audio.addEventListener('ended', function () { powerLed.classList.remove('is-on'); });
    }
  }

  // 动态生成粒子（每种氛围不同颜色 + 节奏）
  function spawnParticles(host, kind) {
    var palette;
    if (kind === 'warm') {
      palette = ['#ffb56b', '#ffd58a', '#ff8c4a'];
    } else if (kind === 'cool') {
      palette = ['#cfd8ff', '#a4b4ff', '#e8eeff'];
    } else {
      palette = ['#ffe7c2', '#ffd5a8', '#fff5e1'];
    }
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 60; i++) {
      var p = document.createElement('span');
      p.className = 'lyric-particle';
      var size = 1 + Math.random() * 2.5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (Math.random() * 100) + '%';
      p.style.top = (Math.random() * 100) + '%';
      p.style.animationDelay = (Math.random() * 12).toFixed(2) + 's';
      p.style.animationDuration = (10 + Math.random() * 14).toFixed(2) + 's';
      p.style.opacity = (0.35 + Math.random() * 0.5).toFixed(2);
      var c = palette[Math.floor(Math.random() * palette.length)];
      p.style.background = c;
      p.style.boxShadow = '0 0 6px ' + c;
      frag.appendChild(p);
    }
    host.appendChild(frag);
  }
  document.querySelectorAll('.crt-particles').forEach(function (el) {
    spawnParticles(el, el.getAttribute('data-particles'));
  });
})();

/* ===== 装饰件交互:海报弹窗 + 其余控件触发屏幕小剧场 ===== */
(function () {
  var modal = document.getElementById('easterModal');
  if (!modal) return;
  var iconEl = document.getElementById('easterModalIcon');
  var titleEl = document.getElementById('easterModalTitle');
  var textEl = document.getElementById('easterModalText');
  var closeBtn = document.getElementById('easterModalClose');
  var opened = false;

  /* 控件 -> 对应剧场 */
  var theaters = {
    'deco-vinyl':    'theater-vinyl',
    'deco-mic':      'theater-mic',
    'deco-cassette': 'theater-cassette',
    'deco-cd':       'theater-cd',
    'deco-neon':     'theater-neon'
  };
  var theaterTimer = null;
  var activeTheater = null;

  function playTheater(key) {
    var target = document.querySelector('.theater.' + theaters[key]);
    if (!target) return;
    /* 隐藏上一个剧场 */
    if (activeTheater && activeTheater !== target) {
      activeTheater.classList.remove('is-on');
    }
    activeTheater = target;
    target.classList.add('is-on');
    /* 自动淡出 */
    if (theaterTimer) clearTimeout(theaterTimer);
    theaterTimer = setTimeout(function () {
      target.classList.remove('is-on');
      if (activeTheater === target) activeTheater = null;
    }, 4200);
  }

  /* 海报弹窗文案 */
  var posterEgg = {
    icon: '🖼️',
    title: '海报揭谜',
    text: '你把海报翻过来，背面用铅笔写着：找到这个小房间里的每一样东西，就能拼出完整的 1986。'
  };

  function openPoster() {
    iconEl.textContent = posterEgg.icon;
    titleEl.textContent = posterEgg.title;
    textEl.textContent = posterEgg.text;
    modal.classList.add('is-open');
    opened = true;
  }

  function closeModal() {
    modal.classList.remove('is-open');
    opened = false;
  }

  document.querySelectorAll('.deco-row > div').forEach(function (el) {
    var cls = el.className.split(' ')[0].trim();
    /* 海报:弹窗;其余:触发屏幕小剧场 */
    if (cls === 'deco-poster') {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function () {
        if (opened) { closeModal(); return; }
        openPoster();
      });
    } else if (theaters[cls]) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function () {
        if (opened) closeModal();
        playTheater(cls);
      });
    }
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
})();

/* ===== 电视电源开关 + 拉线吊灯氛围 + 蜡烛联动 ===== */
(function () {
  var tv = document.getElementById('tvSet');
  if (!tv) tv = document.querySelector('.tv-set');
  var powerBtn = document.getElementById('tvPowerBtn');
  var led = document.getElementById('tvPowerLed');
  var on = true;

  /* 七种氛围顺序(黑色在最后) */
  var LAMPS = ['white', 'yellow', 'pink', 'grey', 'blue', 'warm', 'black'];
  var lampIdx = -1; /* -1 表示未拉起(电视开着,氛围随歌曲) */
  var pull = document.getElementById('lampPull');

  /* 全局房间状态:供蜡烛模块读取/联动 */
  window.roomState = {
    get isBlack() { return document.body.classList.contains('lamp-black'); },
    extinguish: function () { /* 每离开黑色氛围时调用 */ }
  };

  function clearLamp() {
    for (var i = 0; i < LAMPS.length; i++) {
      document.body.classList.remove('lamp-' + LAMPS[i]);
    }
  }

  function setLamp(idx) {
    clearLamp();
    if (idx >= 0 && idx < LAMPS.length) {
      document.body.classList.add('lamp-' + LAMPS[idx]);
    }
    /* 非黑色氛围则熄灭蜡烛并清空彩蛋特效 */
    if (LAMPS[idx] !== 'black') {
      extinguishCandle();
      if (window.clearRoomFx) window.clearRoomFx();
    }
  }

  function setPower(state) {
    on = state;
    tv.classList.toggle('is-off', !on);
    if (led) led.classList.toggle('is-on', on);
    /* 电视开启:恢复歌曲氛围;电视关闭:拉起初盏灯 */
    if (on) {
      lampIdx = -1;
      clearLamp();
      extinguishCandle();
      if (window.clearRoomFx) window.clearRoomFx();
      if (window._tvNoSignalOff) window._tvNoSignalOff();
    } else {
      lampIdx = 0;
      setLamp(0);
      if (window._tvNoSignalOn) window._tvNoSignalOn();
    }
  }

  if (pull) {
    pull.addEventListener('click', function () {
      /* 只有电视关闭时才允许拉绳换氛围 */
      if (on) return;
      lampIdx = (lampIdx + 1) % LAMPS.length;
      setLamp(lampIdx);
    });
  }

  if (powerBtn && tv) {
    powerBtn.addEventListener('click', function () {
      setPower(!on);
      if (window._sfxPowerOn) try { window._sfxPowerOn(); } catch (e) {}
    });
    setPower(true);
  }
})();

/* ===== 蜡烛:电视关闭 + 黑色氛围下点燃,烛光照亮全屋 ===== */
function extinguishCandle() {
  var candle = document.getElementById('decoCandle');
  var glow = document.querySelector('.candle-glow');
  if (candle) candle.classList.remove('is-lit');
  if (glow) glow.classList.remove('is-on');
}
(function () {
  var candle = document.getElementById('decoCandle');
  var glow = document.querySelector('.candle-glow');
  if (!candle) return;
  candle.addEventListener('click', function () {
    /* 仅电视关闭 + 黑色氛围时点燃 */
    if (!(window.roomState && window.roomState.isBlack)) return;
    var lit = candle.classList.toggle('is-lit');
    if (glow) glow.classList.toggle('is-on', lit);
  });
})();

/* ===== 彩蛋持续特效:黑胶=闪光粒子 / 麦克风=气球 / 磁带=花瓣 =====
   前置:纯黑氛围 + 蜡烛点燃;点击一次持续生成,再点停下,可同时叠加
   序列:点过前三个后再点CD→小人看电视;最后点MUSIC→电视机弹出I♥你+漂浮心形气泡 */
(function () {
  var FX = { vinyl: null, mic: null, cassette: null };
  var seen = { vinyl: false, mic: false, cassette: false, cd: false };
  var cdTimer = null, finaleTimer = null;
  var TYPE = { vinyl: 'spark', mic: 'balloon', cassette: 'petal' };

  function canFx() {
    var candle = document.getElementById('decoCandle');
    return !!(window.roomState && window.roomState.isBlack) && candle && candle.classList.contains('is-lit');
  }
  function clearFx(type) {
    var all = document.querySelectorAll('.fx-particle[data-fx="' + type + '"]');
    for (var i = 0; i < all.length; i++) if (all[i].parentNode) all[i].parentNode.removeChild(all[i]);
  }
  function stopFx(id) {
    if (FX[id]) { clearInterval(FX[id]); FX[id] = null; }
    clearFx(TYPE[id]);
  }
  function centerOf(id) {
    var el = document.getElementById(id), r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  function makeP(node, type) {
    node.className += ' fx-particle fx-' + type;
    node.setAttribute('data-fx', type);
    document.body.appendChild(node);
    return node;
  }
  /* 闪光粒子:粉色/白色,放大并铺满全屏,从画面下部浪漫上飘 */
  function spawnSparks() {
    var vw = window.innerWidth || 800;
    var vh = window.innerHeight || 600;
    var colors = ['#ffb3d9', '#ffffff', '#ffd6ea', '#ff9fc9', '#fff2f8'];
    var n = 5;
    for (var i = 0; i < n; i++) {
      var size = 7 + Math.random() * 16;
      var x = Math.random() * vw;
      var y = vh * (0.45 + Math.random() * 0.5);
      var dx = (Math.random() - 0.5) * 180;
      var dy = -(vh * 0.5 + Math.random() * vh * 0.5);
      var dur = 2.6 + Math.random() * 2.2;
      var p = document.createElement('div');
      p.style.cssText = '--cc1:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
        '--dx:' + dx + 'px;--dy:' + dy + 'px;--fdur:' + dur + 's;' +
        'width:' + size + 'px;height:' + size + 'px;' +
        'left:' + x + 'px;top:' + y + 'px;';
      makeP(p, 'spark');
      (function (el, d) { setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, d * 1000 + 300); })(p, dur);
    }
  }
  /* 花瓣:从屏幕顶部飘落 */
  function spawnPetals() {
    var size = 10 + Math.random() * 8;
    var dx = 14 + Math.random() * 36;
    var rot = 90 + Math.random() * 200;
    var dur = 4.5 + Math.random() * 2.5;
    var p = document.createElement('div');
    p.style.cssText = '--dx:' + dx + 'px;--rot:' + rot + 'deg;--fdur:' + dur + 's;' +
      'width:' + size + 'px;height:' + Math.round(size * 0.72) + 'px;' +
      'left:' + (Math.random() * (window.innerWidth || 800)) + 'px;top:-30px;';
    makeP(p, 'petal');
    setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, dur * 1000 + 400);
  }

  /* 前三个控件:开/关各不相同(可同时叠加) */
  function toggle(id, spawn, interval) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', function () {
      if (!canFx()) return;
      seen[id.replace('deco', '').toLowerCase()] = true;
      if (FX[id]) { stopFx(id); /* 关闭黑胶底噪 */ if (id === 'decoVinyl' && window._sfxVinylStop) try { window._sfxVinylStop(); } catch (e) {} return; }
      spawn();
      FX[id] = setInterval(spawn, interval);
      /* 黑胶底噪启动 */
      if (id === 'decoVinyl' && window._sfxVinylStart) try { window._sfxVinylStart(); } catch (e) {}
    });
    el.style.cursor = 'pointer';
  }
  toggle('decoVinyl', spawnSparks, 260);
  toggle('decoCassette', spawnPetals, 700);

  /* 黑胶拖动:按住拖拽 → 唱片旋转 + 沙沙声 */
  (function () {
    var v = document.getElementById('decoVinyl');
    if (!v) return;
    v.style.cursor = 'grab';
    var drag = null, lastT = 0;
    v.addEventListener('pointerdown', function (e) {
      drag = { x: e.clientX, y: e.clientY, rot: 0, speed: 0 };
      v.style.cursor = 'grabbing';
      v.setPointerCapture(e.pointerId);
      if (window._sfxVinylStart) try { window._sfxVinylStart(); } catch (err) {}
      lastT = performance.now();
    });
    v.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      var dy = e.clientY - drag.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var ang = Math.atan2(dy, dx) * 57.2958;
      drag.rot += ang - (drag.lastAng || ang);
      drag.lastAng = ang;
      var now = performance.now();
      drag.speed = dist / Math.max(1, now - lastT);
      lastT = now;
      v.style.setProperty('--drag-rot', drag.rot + 'deg');
      v.style.transform = 'rotate(' + drag.rot + 'deg)';
      drag.x = e.clientX; drag.y = e.clientY;
    });
    function endDrag(e) {
      if (!drag) return;
      v.style.cursor = 'grab';
      /* 惯性:松手后缓慢减速停止 */
      var stopTimer = setInterval(function () {
        drag.speed *= 0.92;
        drag.rot += drag.speed * 6;
        v.style.transform = 'rotate(' + drag.rot + 'deg)';
        if (drag.speed < 0.05) {
          clearInterval(stopTimer);
          if (window._sfxVinylStop) try { window._sfxVinylStop(); } catch (err) {}
        }
      }, 16);
      drag = null;
    }
    v.addEventListener('pointerup', endDrag);
    v.addEventListener('pointercancel', endDrag);
  })();

  /* 麦克风:气球特效已移除,仅计入解锁进度(seen.mic) */
  var micEl = document.getElementById('decoMic');
  if (micEl) {
    micEl.style.cursor = 'pointer';
    micEl.addEventListener('click', function () { if (canFx()) seen.mic = true; });
  }

  /* CD:解锁条件=黑胶/麦克风/磁带都点过一次;点击出现一台黑屏大电视(可重复开关) */
  var cd = document.getElementById('decoCd');
  if (cd) {
    cd.style.cursor = 'pointer';
    cd.addEventListener('click', function () {
      if (!canFx()) return;
      if (!(seen.vinyl && seen.mic && seen.cassette)) return;
      seen.cd = true;
      hideFinale();
      var cw = document.getElementById('cdWatch');
      if (!cw) return;
      cw.classList.toggle('is-on');
    });
  }

  /* 心形 / 气泡:终章漂浮 */
  function spawnHeart() {
    var size = 15 + Math.random() * 18;
    var h = document.createElement('div');
    h.className = 'fx-heart';
    h.textContent = '\u2665';
    h.style.cssText = 'left:' + (Math.random() * (window.innerWidth - 60)) + 'px;' +
      'top:' + (72 + Math.random() * 12) + 'vh;font-size:' + size + 'px;' +
      '--dx:' + ((Math.random() - 0.5) * 140) + 'px;--dy:-' + (62 + Math.random() * 40) + 'vh;' +
      '--rot:' + ((Math.random() - 0.5) * 60) + 'deg;--fdur:' + (4 + Math.random() * 3) + 's;';
    makeP(h, 'heart');
    setTimeout(function () { if (h.parentNode) h.parentNode.removeChild(h); }, 8000);
  }
  function spawnBubble() {
    var size = 8 + Math.random() * 14;
    var b = document.createElement('div');
    b.className = 'fx-bubble';
    b.style.cssText = 'left:' + (Math.random() * window.innerWidth) + 'px;' +
      'top:' + (70 + Math.random() * 14) + 'vh;width:' + size + 'px;height:' + size + 'px;' +
      '--dx:' + ((Math.random() - 0.5) * 120) + 'px;--dy:-' + (58 + Math.random() * 40) + 'vh;' +
      '--rot:' + ((Math.random() - 0.5) * 40) + 'deg;--fdur:' + (4 + Math.random() * 3) + 's;';
    makeP(b, 'bubble');
    setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 8000);
  }
  function hideFinale() {
    if (finaleTimer) { clearInterval(finaleTimer); finaleTimer = null; }
    var ft = document.getElementById('finaleText');
    if (ft) ft.classList.remove('is-on');
    clearFx('heart');
    clearFx('bubble');
  }
  /* MUSIC(霓虹):终章。点亮黑屏大电视,弹出I♥你发光字样 + 全页心形气泡 */
  var neon = document.getElementById('decoNeon');
  if (neon) {
    neon.style.cursor = 'pointer';
    neon.addEventListener('click', function () {
      if (!canFx()) return;
      if (!seen.cd) return; /* 需先触发过CD场景 */
      var ft = document.getElementById('finaleText');
      if (!ft) return;
      if (ft.classList.contains('is-on')) { hideFinale(); return; }
      var cw = document.getElementById('cdWatch');
      if (cw) cw.classList.add('is-on'); /* 大电视点亮 */
      seen.finale = true; /* 字样已显示,解锁海报 */
      clearFx('spark'); clearFx('balloon'); clearFx('petal');
      ft.classList.add('is-on');
      spawnHeart();
      spawnBubble();
      finaleTimer = setInterval(function () {
        spawnHeart();
        if (Math.random() < 0.65) spawnBubble();
      }, 420);
    });
  }

  /* 海报:触发CD(出现字样)后,点击海报弹出随机小情话海报 */
  var LINES = [
    '你是我生命里最亮的星光。',
    '所有的温柔都只想给你。',
    '遇见你，是我最好的幸运。',
    '把世间的美好都攒成一份，送给你。',
    '你一笑，我的世界就亮了。'
  ];
  var posterEl = null;
  var poster = document.getElementById('decoPoster');
  if (poster) {
    poster.style.cursor = 'pointer';
    poster.addEventListener('click', function () {
      if (!canFx()) return;
      if (!seen.finale) return; /* 需先点击唱片显示出字样(I🩷U)后 */
      if (posterEl) { posterEl.remove(); posterEl = null; return; }
      var line = LINES[Math.floor(Math.random() * LINES.length)];
      var pc = document.createElement('div');
      pc.className = 'poster-card';
      pc.innerHTML = '<button type="button" class="pc-close">✕</button>' +
        '<div class="pc-title">G r o v e 情 话</div>' +
        '<div class="pc-text">' + line + '</div>';
      posterEl = pc;
      document.body.appendChild(pc);
      pc.querySelector('.pc-close').addEventListener('click', function (ev) { ev.stopPropagation(); pc.remove(); posterEl = null; });
      pc.addEventListener('click', function (ev) { if (ev.target === pc) { pc.remove(); posterEl = null; } });
    });
  }

  /* 离开黑色氛围/开电视时清空全部 */
  window.clearRoomFx = function () {
    for (var k in FX) if (FX[k]) { clearInterval(FX[k]); FX[k] = null; }
    clearFx('spark'); clearFx('balloon'); clearFx('petal'); clearFx('heart'); clearFx('bubble');
    if (cdTimer) { clearTimeout(cdTimer); cdTimer = null; }
    if (finaleTimer) { clearInterval(finaleTimer); finaleTimer = null; }
    var cw = document.getElementById('cdWatch');
    if (cw) cw.classList.remove('is-on');
    var ft = document.getElementById('finaleText');
    if (ft) ft.classList.remove('is-on');
    if (posterEl) { posterEl.remove(); posterEl = null; }
    if (window._sfxVinylStop) { try { window._sfxVinylStop(); } catch (e) {} }
    if (window._tvNoSignalOff) window._tvNoSignalOff();
  };
})();

/* ===== 复古音效（程序合成，无需音频文件） ===== */
(function () {
  var AC = window.AudioContext || window.webkitAudioContext;
  var ctx = null;
  function ensure() {
    if (!ctx) { try { ctx = new AC(); } catch (e) {} }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  /* 用户首次点击即激活(WebAudio 自动播放策略) */
  document.addEventListener('pointerdown', function once() {
    ensure();
    document.removeEventListener('pointerdown', once, true);
  }, true);

  /* 特效音互斥:同一时间只允许一个特效音在响,新触发自动停掉前一个 */
  var activeStop = null;
  function releaseSfx() {
    if (activeStop) {
      var fn = activeStop; activeStop = null;
      try { fn(); } catch (e) {}
    }
  }
  window._sfxRelease = releaseSfx;

  function tone(freq, dur, type, vol) {
    var c = ensure(); if (!c) return;
    var o = c.createOscillator(); var g = c.createGain();
    o.type = type || 'square'; o.frequency.value = freq;
    g.gain.value = 0; o.connect(g); g.connect(c.destination);
    var t = c.currentTime;
    g.gain.linearRampToValueAtTime(vol || 0.06, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.02);
  }

  /* 旋钮咔哒(触发前先停掉其它特效音) */
  window._sfxKnob = function () {
    releaseSfx();
    tone(820, 0.04, 'square', 0.04);
    setTimeout(function () { tone(560, 0.05, 'square', 0.03); }, 30);
  };

  /* 频道扫频声(触发前先停掉其它特效音) */
  window._sfxChannelTune = function () {
    releaseSfx();
    var c = ensure(); if (!c) return;
    var o = c.createOscillator(); var g = c.createGain();
    o.type = 'sawtooth'; o.connect(g); g.connect(c.destination);
    var t = c.currentTime;
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(0.05, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    o.frequency.setValueAtTime(110, t);
    o.frequency.exponentialRampToValueAtTime(1800, t + 0.4);
    o.start(t); o.stop(t + 0.6);
  };

  /* 黑胶底噪（白噪声）—— 唯一持续特效音,注册到互斥管理器 */
  var noiseSrc = null;
  window._sfxVinylStart = function () {
    var c = ensure(); if (!c) return;
    releaseSfx(); /* 互斥:先停掉其它特效音 */
    if (noiseSrc) return;
    var bufSize = 2 * c.sampleRate;
    var buf = c.createBuffer(1, bufSize, c.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    noiseSrc = c.createBufferSource();
    noiseSrc.buffer = buf; noiseSrc.loop = true;
    var filter = c.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 1400;
    var g = c.createGain(); g.gain.value = 0;
    noiseSrc.connect(filter); filter.connect(g); g.connect(c.destination);
    noiseSrc.start();
    g.gain.linearRampToValueAtTime(0.04, c.currentTime + 0.4);
    var stopVinyl = function () {
      if (!noiseSrc || !c) return;
      try {
        var g2 = noiseSrc._gainNode || null;
        g.gain.cancelScheduledValues(c.currentTime);
        g.gain.linearRampToValueAtTime(0, c.currentTime + 0.3);
        setTimeout(function () { try { noiseSrc.stop(); } catch (e) {} noiseSrc = null; }, 350);
      } catch (e) { noiseSrc = null; }
      if (activeStop === stopVinyl) activeStop = null;
      if (window._sfxVinylStop === stopVinyl) window._sfxVinylStop = null;
    };
    window._sfxVinylStop = stopVinyl;
    activeStop = stopVinyl;
  };
  window._sfxVinylStop = null;

  /* 电视开机"嗡"声(触发前先停掉其它特效音) */
  window._sfxPowerOn = function () {
    releaseSfx();
    var c = ensure(); if (!c) return;
    var o = c.createOscillator(); var g = c.createGain();
    o.type = 'sine'; o.connect(g); g.connect(c.destination);
    var t = c.currentTime;
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(0.05, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    o.frequency.setValueAtTime(60, t);
    o.frequency.exponentialRampToValueAtTime(220, t + 0.4);
    o.start(t); o.stop(t + 0.5);
  };

  /* 信号干扰"咔嗒"(触发前先停掉其它特效音) */
  window._sfxGlitch = function () {
    releaseSfx();
    tone(160, 0.04, 'sawtooth', 0.05);
    setTimeout(function () { tone(220, 0.04, 'sawtooth', 0.04); }, 35);
  };
})();

/* ===== 环境联动：时间感知 / 整点彩蛋 ===== */
(function () {
  /* 整点整刻时间胶囊:显示在频道号窗 */
  var HOUR_NOTES = [
    '00:00', '新的一天,愿你安眠。',
    '01:00', '夜深了,记得喝水。',
    '02:00', '还有人在听歌吗?',
    '03:00', '世界的另一端,有人醒来。',
    '04:00', '黎明前最安静的时刻。',
    '05:00', '天快亮了。',
    '06:00', '清晨好,新的开始。',
    '07:00', '上班路上,戴上耳机吧。',
    '08:00', '咖啡时间。',
    '09:00', '泡一壶茶,慢慢来。',
    '10:00', '状态正佳。',
    '11:00', '快中午啦。',
    '12:00', '午饭时间,该歇歇了。',
    '13:00', '饭后小憩。',
    '14:00', '下午好。',
    '15:00', '下午茶时光。',
    '16:00', '坚持就是胜利。',
    '17:00', '快下班啦。',
    '18:00', '晚饭吃了吗?',
    '19:00', '和家人在一起真好。',
    '20:00', '今晚的月色真美。',
    '21:00', '最舒服的时间段。',
    '22:00', '该准备睡觉啦。',
    '23:00', '深夜模式已自动启动。'
  ];

  function hourNote() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if (m !== 0) return; /* 只在整点 */
    var chNum = document.getElementById('tvChannelNum');
    if (!chNum) return;
    var orig = chNum.textContent;
    chNum.textContent = (h < 10 ? '0' : '') + h + ':00';
    chNum.style.color = '#5cffd5';
    setTimeout(function () {
      chNum.textContent = orig;
      chNum.style.color = '';
    }, 4000);
  }

  /* 整点弹出的气泡文字 */
  var popup = document.createElement('div');
  popup.className = 'hour-popup';
  document.body.appendChild(popup);
  function showHourPopup() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    if (m !== 0) return;
    var msg = HOUR_NOTES[(h + 1) * 2 - 1] || '';
    if (!msg) return;
    popup.textContent = msg;
    popup.classList.remove('is-on');
    void popup.offsetWidth;
    popup.classList.add('is-on');
    setTimeout(function () { popup.classList.remove('is-on'); }, 5500);
  }

  /* 深夜自动切换:仅在电视已关闭,且 30 秒内无操作时执行 */
  var lastInteract = Date.now();
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    document.addEventListener(ev, function () { lastInteract = Date.now(); }, { passive: true });
  });
  setInterval(function () {
    var d = new Date();
    var h = d.getHours();
    var isLate = (h >= 23 || h < 5);
    if (!isLate) return;
    if (Date.now() - lastInteract < 30000) return;
    var tv = document.getElementById('tvSet');
    if (!tv || !tv.classList.contains('is-off')) return;
    /* 仅当当前不是黑色氛围时拉灯切到黑 */
    if (!document.body.classList.contains('lamp-black')) {
      var pull = document.getElementById('lampPull');
      if (pull) pull.click();
      showHourPopup();
    }
  }, 60000);

  /* 整点检查 */
  setInterval(function () {
    var d = new Date();
    var m = d.getMinutes();
    if (m === 0) {
      hourNote();
      showHourPopup();
    }
  }, 30000);

  /* 启动时立即检查一次 */
  setTimeout(function () {
    var d = new Date();
    if (d.getMinutes() < 1) { hourNote(); showHourPopup(); }
  }, 1500);
})();
</script>
