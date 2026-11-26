/* Blue Gym · stranice: /bluegym, /bluegym/<teretana>, /bluegym/<teretana>/<sprava> */
(function () {
  'use strict';
  var G = window.BG, S = window.BG_SPRAVE, GR = window.BG_GRUPE, R = window.BGRig;
  var app = document.getElementById('app');
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var nav = (navigator.language || 'hr').toLowerCase();
  var lang = store.get('bg_lang') || (/^(hr|bs|sr|sh)/.test(nav) ? 'hr' : 'en');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var T = {
    hr: {
      ok: 'Pravilno', bad: 'Česta greška', setup: 'Namjesti', how: 'Izvedba', watch: 'Pazi na', start: 'Za početak',
      sets: 'serije', reps: 'ponavljanja', rest: 'odmora', works: 'Radi:', pause: 'Zaustavi animaciju', play: 'Pokreni animaciju',
      ask: 'Nisi siguran? Pitaj trenera, rado će ti pokazati.',
      openTill: 'Otvoreno do ', opensAt: 'Danas od ', closedToday: 'Danas zatvoreno', tomorrow: 'Sutra od ', closedNow: 'Zatvoreno',
      call: 'Nazovi', all: 'Sve sprave', review: 'Ocijeni nas na Googleu', reviewSub: 'Tvoja ocjena pomaže drugima da nas pronađu.',
      choose: 'Odaberi teretanu', intro: 'Na spravama su kartice. Prisloni mobitel na karticu i vidi kako se sprava pravilno koristi.',
      machines: 'Sprave', hours: 'Radno vrijeme', made: 'Upute na spravama: ', other: 'English',
      days: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota']
    },
    en: {
      ok: 'Correct', bad: 'Common mistake', setup: 'Set up', how: 'How to do it', watch: 'Watch out for', start: 'To start',
      sets: 'sets', reps: 'reps', rest: 'rest', works: 'Works:', pause: 'Pause animation', play: 'Play animation',
      ask: 'Not sure? Ask a trainer, they’re happy to show you.',
      openTill: 'Open until ', opensAt: 'Today from ', closedToday: 'Closed today', tomorrow: 'Tomorrow from ', closedNow: 'Closed',
      call: 'Call', all: 'All machines', review: 'Rate us on Google', reviewSub: 'Your rating helps others find us.',
      choose: 'Choose your gym', intro: 'Every machine has a card. Tap it with your phone to see how the machine is used correctly.',
      machines: 'Machines', hours: 'Opening hours', made: 'Machine guides by ', other: 'Hrvatski',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  };
  function t(k) { return T[lang][k]; }
  function tx(o) { return o == null ? '' : typeof o === 'string' ? o : (o[lang] || o.hr); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hh(h) { return h + ':00'; }

  var LOGO = '<svg viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="8" fill="#1846D6"/><path d="M6 11.5v5M9 9.5v9M19 9.5v9M22 11.5v5M9 14h10" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>';
  var ICO = {
    pause: '<svg viewBox="0 0 16 16"><rect x="3" y="2" width="3.6" height="12" rx="1.2" fill="currentColor"/><rect x="9.4" y="2" width="3.6" height="12" rx="1.2" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 16 16"><path d="M4 2.4v11.2a.8.8 0 0 0 1.2.7l9-5.6a.8.8 0 0 0 0-1.4l-9-5.6A.8.8 0 0 0 4 2.4Z" fill="currentColor"/></svg>',
    star: '<svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="17" fill="#fff"/><path d="M17 7.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L17 22.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" fill="#1846D6"/></svg>'
  };

  // stanje radnog vremena
  function status(L, now) {
    now = now || new Date();
    var d = now.getDay(), h = now.getHours() + now.getMinutes() / 60, today = L.hours[d];
    if (today && h >= today[0] && h < today[1]) return { open: true, text: t('openTill') + hh(today[1]) };
    if (today && h < today[0]) return { open: false, text: t('opensAt') + hh(today[0]) };
    var tm = L.hours[(d + 1) % 7];
    return { open: false, text: (today ? t('closedNow') : t('closedToday')) + (tm ? ' · ' + t('tomorrow') + hh(tm[0]) : '') };
  }

  function top(loc) {
    var L = loc && G.locations[loc];
    return '<header class="top"><a class="brand" href="/bluegym' + (L ? '/' + L.id : '') + '">' + LOGO + 'Blue Gym' + (L ? ' <span>' + esc(L.short) + '</span>' : '') + '</a>' +
      '<button class="lang" type="button" lang="' + (lang === 'hr' ? 'en' : 'hr') + '">' + t('other') + '</button></header>';
  }

  function gymFooter(L, withAll) {
    var st = status(L);
    return '<footer class="gym"><div class="gym-in">' +
      (withAll ? '<h2>' + esc(L.name) + '</h2>' +
      '<p class="hrs' + (st.open ? '' : ' is-closed') + '"><i></i>' + esc(st.text) + '</p>' : '') +
      '<p class="adr"><a href="' + L.maps + '" target="_blank" rel="noopener">' + esc(L.address) + '</a></p>' +
      '<div class="acts">' + (L.phone ? '<a class="btn" href="tel:' + L.phone.replace(/\s/g, '') + '">' + t('call') + '</a>' : '') +
      (withAll ? '<a class="btn" href="/bluegym/' + L.id + '">' + t('all') + '</a>' : '') + '</div>' +
      '<a class="rev" href="' + L.review + '" target="_blank" rel="noopener">' + ICO.star + '<span><b>' + t('review') + '</b><small>' + t('reviewSub') + '</small></span></a>' +
      '</div><p class="made">' + t('made') + '<a href="https://tiptapreviews.com" target="_blank" rel="noopener">TipTap</a></p></footer>';
  }

  function bindLang(rerender) {
    var b = app.querySelector('.lang');
    if (b) b.onclick = function () { lang = lang === 'hr' ? 'en' : 'hr'; store.set('bg_lang', lang); document.documentElement.lang = lang; rerender(); };
  }

  // ---------- sprava ----------
  var scene = null;
  function machine(loc, id) {
    var m = S[id], L = G.locations[loc];
    document.title = tx(m.name) + ' · ' + L.name;
    var setup = m.setup.map(function (x, i) { return '<li data-pin="' + (i + 1) + '"><span class="n">' + (i + 1) + '</span><span>' + esc(tx(x)) + '</span></li>'; }).join('');
    var how = m.steps.map(function (x) { return '<li><span>' + esc(tx(x)) + '</span></li>'; }).join('');
    var watch = m.watch.map(function (x) { return '<li><span>' + esc(tx(x)) + '</span></li>'; }).join('');
    app.innerHTML = top(loc) +
      '<main class="m wrap">' +
      '<h1>' + esc(tx(m.name)) + '</h1>' +
      '<p class="lead">' + esc(tx(m.lead)) + '</p>' +
      '<section class="demo" data-ph="rest">' +
      '<div class="seg" role="radiogroup" aria-label="' + t('ok') + ' / ' + t('bad') + '">' +
      '<button type="button" role="radio" aria-checked="true" data-mode="ok">' + t('ok') + '</button>' +
      '<button type="button" role="radio" aria-checked="false" data-mode="bad">' + t('bad') + '</button></div>' +
      '<div class="stage"></div>' +
      '<div class="cue"><span class="cue-t" aria-live="polite"></span><span class="cue-b"></span>' +
      '<button class="pp" type="button" aria-label="' + t('pause') + '">' + ICO.pause + '</button></div>' +
      '<div class="tempo" aria-hidden="true"><i></i></div>' +
      '<p class="mus"><span class="sw" aria-hidden="true"></span><span><b>' + t('works') + '</b> ' + esc(tx(m.muscles)) + '</span></p>' +
      '</section>' +
      '<section class="blk"><h2>' + t('setup') + '</h2><ol class="setup">' + setup + '</ol></section>' +
      '<section class="blk"><h2>' + t('how') + '</h2><ol class="how">' + how + '</ol></section>' +
      '<section class="blk"><h2>' + t('watch') + '</h2><ul class="watch">' + watch + '</ul></section>' +
      '<section class="plan"><h2>' + t('start') + '</h2><div class="nums">' +
      '<div><b>' + m.plan.sets + '</b><span>' + t('sets') + '</span></div>' +
      '<div><b>' + m.plan.reps + '</b><span>' + t('reps') + '</span></div>' +
      '<div><b>' + m.plan.rest + '</b><span>' + t('rest') + '</span></div></div>' +
      '<p>' + esc(tx(m.plan.tip)) + '</p></section>' +
      '<p class="ask">' + t('ask') + '</p>' +
      '</main>' + gymFooter(L, true);

    var demo = app.querySelector('.demo'), cueT = demo.querySelector('.cue-t'), cueB = demo.querySelector('.cue-b'), bar = demo.querySelector('.tempo i');
    var pp = demo.querySelector('.pp');
    if (scene) scene.pause();
    scene = new R.Scene(demo.querySelector('.stage'), m.anim, {
      label: tx(m.label),
      onCue: function (ph, mode) {
        var c = m.cues[mode][ph][lang] || m.cues[mode][ph].hr;
        cueT.textContent = c[0]; cueB.textContent = c[1];
        demo.setAttribute('data-ph', ph);
      },
      onProg: function (ph, f) { bar.style.transform = 'scaleX(' + f.toFixed(3) + ')'; }
    });
    scene.setMode('ok');
    window.__bgScene = scene;
    function setPP(on) { pp.innerHTML = on ? ICO.pause : ICO.play; pp.setAttribute('aria-label', on ? t('pause') : t('play')); }
    var wantPlay = !reduce;
    if (wantPlay) scene.play(); else { scene.t = m.anim.tempo.ok[0] * .9; scene.tick(0); }
    setPP(wantPlay);
    pp.onclick = function () { wantPlay = !wantPlay; if (wantPlay) scene.play(); else scene.pause(); setPP(wantPlay); };
    demo.querySelectorAll('.seg button').forEach(function (b) {
      b.onclick = function () {
        demo.querySelectorAll('.seg button').forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        demo.classList.toggle('is-bad', b.getAttribute('data-mode') === 'bad');
        scene.setMode(b.getAttribute('data-mode'));
        if (!wantPlay) { wantPlay = true; scene.play(); setPP(true); }
      };
    });
    var lis = app.querySelectorAll('.setup li'), pinTimer;
    lis.forEach(function (li) {
      li.onclick = function () {
        lis.forEach(function (x) { x.classList.toggle('is-on', x === li); });
        scene.focusPin(li.getAttribute('data-pin'));
        demo.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        clearTimeout(pinTimer);
        pinTimer = setTimeout(function () { scene.focusPin(null); lis.forEach(function (x) { x.classList.remove('is-on'); }); }, 2600);
      };
    });
    document.onvisibilitychange = function () { if (document.hidden) scene.pause(); else if (wantPlay) scene.play(); };
    bindLang(function () { machine(loc, id); });
  }

  // ---------- teretana ----------
  function machinesFor(loc) {
    var list = G.machines[loc];
    return (list || Object.keys(S)).filter(function (id) { return S[id]; });
  }
  function gym(loc) {
    var L = G.locations[loc], st = status(L), ids = machinesFor(loc), now = new Date().getDay();
    document.title = L.name;
    var groups = GR.map(function (g) {
      var items = ids.filter(function (id) { return S[id].group === g.id; });
      if (!items.length) return '';
      return '<section class="grp"><h2>' + esc(tx(g.name)) + '</h2>' + items.map(function (id) {
        return '<a class="it" href="/bluegym/' + loc + '/' + id + '"><span class="th" data-id="' + id + '"></span><span><b>' + esc(tx(S[id].name)) + '</b><small>' + esc(tx(S[id].muscles)) + '</small></span></a>';
      }).join('') + '</section>';
    }).join('');
    var order = [1, 2, 3, 4, 5, 6, 0];
    var week = order.map(function (d) {
      var h = L.hours[d];
      return '<li' + (d === now ? ' class="is-today"' : '') + '><span>' + T[lang].days[d] + '</span><span>' + (h ? hh(h[0]) + '–' + hh(h[1]) : '—') + '</span></li>';
    }).join('');
    app.innerHTML = top(loc) +
      '<main class="home wrap"><h1>' + esc(L.name) + '</h1>' +
      '<p class="hrs' + (st.open ? '' : ' is-closed') + '"><i></i>' + esc(st.text) + '</p>' +
      '<p class="intro">' + t('intro') + '</p>' + groups +
      '<section class="grp"><h2>' + t('hours') + '</h2><ul class="week">' + week + '</ul></section>' +
      '</main>' + gymFooter(L, false);
    app.querySelectorAll('.th').forEach(function (h) { R.still(h, S[h.getAttribute('data-id')].anim, .55); });
    bindLang(function () { gym(loc); });
  }

  function pick() {
    document.title = 'Blue Gym · Osijek';
    app.innerHTML = top(null) + '<main class="pick wrap"><h1>Blue Gym</h1><p class="intro">' + t('choose') + '</p>' +
      (G.active || G.order).map(function (k) { var L = G.locations[k]; return '<a href="/bluegym/' + k + '"><b>' + esc(L.short) + '</b><small>' + esc(L.address) + '</small></a>'; }).join('') +
      '</main>';
    bindLang(pick);
  }

  document.documentElement.lang = lang;
  var act = G.active || G.order;
  var parts = location.pathname.replace(/^\/bluegym\/?/, '').split('/').filter(Boolean);
  var loc = act.indexOf(parts[0]) >= 0 ? parts[0] : null;
  var rest = loc || G.locations[parts[0]] ? parts.slice(1) : parts;
  if (!loc && act.length === 1) {
    loc = act[0];
    var want = '/bluegym/' + loc + (rest[0] && S[rest[0]] ? '/' + rest[0] : '');
    if (location.pathname !== want && history.replaceState) history.replaceState(null, '', want + location.search);
  }
  var id = loc && rest[0] && S[rest[0]] ? rest[0] : null;
  if (loc && id) machine(loc, id);
  else if (loc) gym(loc);
  else pick();
})();
