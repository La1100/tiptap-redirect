/* Blue Gym · stranice: /bluegym/<teretana>, /bluegym/<teretana>/<sprava>, /bluegym/<teretana>/uprava */
(function () {
  'use strict';
  var G = window.BG, S = window.BG_SPRAVE, GR = window.BG_GRUPE, R = window.BGRig;
  var app = document.getElementById('app'), root = document.documentElement;
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
      sets: 'serije', reps: 'ponavljanja', rest: 'odmora', works: 'Radi:', pause: 'Zaustavi animaciju', play: 'Pokreni animaciju', speed: 'Brzina',
      ask: 'Nisi siguran? Pitaj trenera, rado će ti pokazati.', back: 'Sprave',
      openTill: 'Otvoreno do ', opensAt: 'Danas od ', closedToday: 'Danas zatvoreno', tomorrow: 'sutra od ', closedNow: 'Zatvoreno',
      call: 'Nazovi', all: 'Sve sprave', review: 'Ocijeni nas na Googleu', reviewSub: 'Tvoja ocjena pomaže drugima da nas pronađu.',
      choose: 'Odaberi teretanu', intro: 'Na spravama su kartice. Prisloni mobitel na karticu i vidi kako se sprava pravilno koristi.',
      hours: 'Radno vrijeme', made: 'Upute na spravama: ', other: 'EN', otherLabel: 'English',
      dark: 'Uključi tamni način', light: 'Uključi svijetli način',
      report: 'Prijavi kvar', reportSub: 'Sprava ne radi kako treba? Javi upravi.', cancel: 'Odustani', whatWrong: 'Što ne radi?',
      notePh: 'Opiši ukratko (nije obavezno)', send: 'Pošalji prijavu', goesTo: 'Prijava ide upravi teretane.',
      thanks: 'Hvala!', sent: 'Uprava je obaviještena. Dok se kvar ne popravi, sprava je označena i za ostale članove.', doneBtn: 'Gotovo',
      reported: 'Prijavljen kvar', reportedSub: 'Uprava je obaviještena.', tag: 'Prijavljen kvar',
      upr: 'Prijave kvarova', open: 'Otvoreno', fixed: 'Riješeno', markFixed: 'Označi kao riješeno',
      emptyOpen: 'Sve sprave rade', emptyOpenSub: 'Kad član prijavi kvar s kartice na spravi, prijava će se pojaviti ovdje.', emptyFixed: 'Još nema riješenih prijava.',
      reportedAt: 'Prijavljeno ', fixedAt: 'Riješeno ', now: 'upravo sada', min: 'prije {n} min', hrs: 'prije {n} h', yday: 'jučer',
      days: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota']
    },
    en: {
      ok: 'Correct', bad: 'Common mistake', setup: 'Set up', how: 'How to do it', watch: 'Watch out for', start: 'To start',
      sets: 'sets', reps: 'reps', rest: 'rest', works: 'Works:', pause: 'Pause animation', play: 'Play animation', speed: 'Speed',
      ask: 'Not sure? Ask a trainer, they’re happy to show you.', back: 'Machines',
      openTill: 'Open until ', opensAt: 'Today from ', closedToday: 'Closed today', tomorrow: 'tomorrow from ', closedNow: 'Closed',
      call: 'Call', all: 'All machines', review: 'Rate us on Google', reviewSub: 'Your rating helps others find us.',
      choose: 'Choose your gym', intro: 'Every machine has a card. Tap it with your phone to see how the machine is used correctly.',
      hours: 'Opening hours', made: 'Machine guides by ', other: 'HR', otherLabel: 'Hrvatski',
      dark: 'Switch to dark mode', light: 'Switch to light mode',
      report: 'Report a problem', reportSub: 'Machine not working right? Let the staff know.', cancel: 'Cancel', whatWrong: 'What’s wrong?',
      notePh: 'Add a short note (optional)', send: 'Send report', goesTo: 'Your report goes to the gym staff.',
      thanks: 'Thank you!', sent: 'The staff has been notified. Until it’s fixed, other members will see this machine is reported.', doneBtn: 'Done',
      reported: 'Problem reported', reportedSub: 'The staff has been notified.', tag: 'Reported',
      upr: 'Problem reports', open: 'Open', fixed: 'Fixed', markFixed: 'Mark as fixed',
      emptyOpen: 'All machines working', emptyOpenSub: 'When a member reports a problem from a machine card, it will show up here.', emptyFixed: 'No fixed reports yet.',
      reportedAt: 'Reported ', fixedAt: 'Fixed ', now: 'just now', min: '{n} min ago', hrs: '{n} h ago', yday: 'yesterday',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  };
  var ISSUES = [
    { id: 'zapinje', hr: 'Zapinje ili se teško pomiče', en: 'Sticks or moves roughly' },
    { id: 'sajla', only: 'stack', hr: 'Sajla ili kolotura', en: 'Cable or pulley' },
    { id: 'klin', only: 'stack', hr: 'Nedostaje klin za težinu', en: 'Weight pin is missing' },
    { id: 'kocnica', only: 'plates', hr: 'Sigurnosne kočnice', en: 'Safety stops' },
    { id: 'jastuk', hr: 'Sjedalo, jastučić ili ručka', en: 'Seat, pad or handle' },
    { id: 'opasno', hr: 'Oštećeno ili opasno', en: 'Damaged or unsafe' },
    { id: 'ostalo', hr: 'Nešto drugo', en: 'Something else' }
  ];
  function t(k) { return T[lang][k]; }
  function tx(o) { return o == null ? '' : typeof o === 'string' ? o : (o[lang] || o.hr); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hh(h) { return h + ':00'; }
  function issue(id) { for (var i = 0; i < ISSUES.length; i++) if (ISSUES[i].id === id) return tx(ISSUES[i]); return ''; }

  function ico(d, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; }
  var I = {
    back: ico('<path d="M15 5l-7 7 7 7"/>'),
    chev: '<svg class="chev" viewBox="0 0 9 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 1.5l6 6-6 6"/></svg>',
    moon: ico('<path d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6Z"/>'),
    sun: ico('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/>'),
    wrench: ico('<path d="M14.2 4.4a4.6 4.6 0 0 0 5.4 5.4l-1.9 1.9a4.6 4.6 0 0 1-4.9 1L6.5 19a2.1 2.1 0 0 1-3-3l6.3-6.3a4.6 4.6 0 0 1 1-4.9Z"/>'),
    check: ico('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    x: ico('<path d="M7 7l10 10M17 7L7 17"/>'),
    pin: ico('<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>'),
    phone: ico('<path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.4 16.4 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"/>'),
    clock: ico('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    gym: ico('<path d="M6.5 8v8M3.5 10v4M17.5 8v8M20.5 10v4M6.5 12h11"/>'),
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2l2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.4 2.8 1-6L3.3 9.6l6-.9Z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.6" height="12" rx="1.2" fill="currentColor"/><rect x="9.4" y="2" width="3.6" height="12" rx="1.2" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 2.4v11.2a.8.8 0 0 0 1.2.7l9-5.6a.8.8 0 0 0 0-1.4l-9-5.6a.8.8 0 0 0-1.2.7Z" fill="currentColor"/></svg>'
  };
  var LOGO = '<svg viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="#007AFF"/><path d="M6 11.5v5M9 9.5v9M19 9.5v9M22 11.5v5M9 14h10" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>';

  // ---------- tema ----------
  var mq = window.matchMedia && matchMedia('(prefers-color-scheme: dark)');
  function isDark() { return root.getAttribute('data-theme') === 'dark'; }
  function applyTheme(d) {
    root.setAttribute('data-theme', d ? 'dark' : 'light');
    var m = document.querySelector('meta[name=theme-color]');
    if (m) m.setAttribute('content', d ? '#232325' : '#F2F2F7');
    var b = app.querySelector('.theme');
    if (b) { b.innerHTML = d ? I.sun : I.moon; b.setAttribute('aria-label', d ? t('light') : t('dark')); }
  }
  applyTheme(store.get('bg_theme') ? store.get('bg_theme') === 'dark' : !!(mq && mq.matches));
  if (mq && mq.addEventListener) mq.addEventListener('change', function (e) { if (!store.get('bg_theme')) applyTheme(e.matches); });

  // ---------- prijave kvarova (demo: spremljeno na ovom uređaju) ----------
  var KV = {
    key: 'bg_kvarovi',
    all: function () { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch (e) { return []; } },
    save: function (l) { store.set(this.key, JSON.stringify(l.slice(0, 200))); },
    add: function (r) { var l = this.all(); l.unshift(r); this.save(l); },
    open: function (loc, id) { return this.all().filter(function (r) { return r.loc === loc && (!id || r.machine === id) && !r.done; }); },
    resolve: function (rid) { var l = this.all(); l.forEach(function (r) { if (r.id === rid && !r.done) r.done = Date.now(); }); this.save(l); }
  };
  function ago(ts) {
    var m = Math.floor((Date.now() - ts) / 60000);
    if (m < 1) return t('now');
    if (m < 60) return t('min').replace('{n}', m);
    var h = Math.floor(m / 60);
    if (h < 24) return t('hrs').replace('{n}', h);
    if (h < 48) return t('yday');
    var d = new Date(ts); return d.getDate() + '. ' + (d.getMonth() + 1) + '.';
  }

  // ---------- radno vrijeme ----------
  function status(L, now) {
    now = now || new Date();
    var d = now.getDay(), h = now.getHours() + now.getMinutes() / 60, today = L.hours[d];
    if (today && h >= today[0] && h < today[1]) return { open: true, text: t('openTill') + hh(today[1]) };
    if (today && h < today[0]) return { open: false, text: t('opensAt') + hh(today[0]) };
    var tm = L.hours[(d + 1) % 7];
    return { open: false, text: (today ? t('closedNow') : t('closedToday')) + (tm ? ', ' + t('tomorrow') + hh(tm[0]) : '') };
  }

  // ---------- zajednički dijelovi ----------
  function navBar(left, title) {
    return '<header class="nav"><div class="nav-in"><div class="nav-l">' + left + '</div>' +
      '<span class="nav-t" aria-hidden="true">' + esc(title) + '</span>' +
      '<div class="nav-r"><button class="nav-b theme" type="button"></button>' +
      '<button class="nav-b lang" type="button" lang="' + (lang === 'hr' ? 'en' : 'hr') + '" aria-label="' + t('otherLabel') + '">' + t('other') + '</button></div></div></header>';
  }
  function brand(L) { return '<a class="brand" href="/bluegym/' + L.id + '">' + LOGO + '<span class="bt">Blue Gym <span>' + esc(L.short) + '</span></span></a>'; }
  function backTo(L) { return '<a class="nav-back" href="/bluegym/' + L.id + '">' + I.back + t('back') + '</a>'; }

  function gymBlock(L, withAll) {
    var st = status(L), parts = L.address.split(', '), city = parts.pop(), street = parts.join(', ');
    return '<section class="gym"><h2 class="sh">' + esc(L.name) + '</h2><div class="group">' +
      '<div class="row"><span class="ic ' + (st.open ? 'ic-g' : '') + '" style="' + (st.open ? '' : 'background:var(--label3)') + '">' + I.clock + '</span><span class="tx"><b>' + esc(st.text) + '</b></span></div>' +
      '<a class="row" href="' + L.maps + '" target="_blank" rel="noopener"><span class="ic ic-b">' + I.pin + '</span><span class="tx"><b>' + esc(street) + '</b><small>' + esc(city) + '</small></span>' + I.chev + '</a>' +
      (L.phone ? '<a class="row" href="tel:' + L.phone.replace(/\s/g, '') + '"><span class="ic ic-g">' + I.phone + '</span><span class="tx"><b>' + t('call') + '</b><small>' + esc(L.phone) + '</small></span>' + I.chev + '</a>' : '') +
      (withAll ? '<a class="row" href="/bluegym/' + L.id + '"><span class="ic ic-b">' + I.gym + '</span><span class="tx"><b>' + t('all') + '</b></span>' + I.chev + '</a>' : '') +
      '</div><a class="btn rev" href="' + L.review + '" target="_blank" rel="noopener">' + I.star + t('review') + '</a>' +
      '<p class="foot">' + t('reviewSub') + '<br>' + t('made') + '<a href="https://tiptapreviews.com" target="_blank" rel="noopener">TipTap</a></p></section>';
  }

  var io = null;
  function chrome(rerender) {
    var navEl = app.querySelector('.nav'), h1 = app.querySelector('.lt');
    applyTheme(isDark());
    app.querySelector('.theme').onclick = function () { var d = !isDark(); store.set('bg_theme', d ? 'dark' : 'light'); applyTheme(d); };
    app.querySelector('.lang').onclick = function () { lang = lang === 'hr' ? 'en' : 'hr'; store.set('bg_lang', lang); root.lang = lang; rerender(); };
    if (io) io.disconnect();
    if (h1 && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(function (es) { navEl.classList.toggle('show-t', !es[0].isIntersecting); }, { rootMargin: '-52px 0px 0px 0px' });
      io.observe(h1);
    }
    onScroll();
  }
  function onScroll() { var n = app.querySelector('.nav'); if (n) n.classList.toggle('is-scrolled', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- sprava ----------
  var scene = null, current = null;
  function noticeHTML(loc, id) {
    var o = KV.open(loc, id);
    if (!o.length) return '';
    return '<div class="notice" role="status"><span class="ic ic-o">' + I.wrench + '</span><span><b>' + t('reported') + '</b><small>' + t('reportedSub') + ' ' + esc(issue(o[0].issue)) + '.</small></span></div>';
  }
  function fmtS(v) { return String(Math.round(v * 10) / 10).replace('.', lang === 'hr' ? ',' : '.') + ' s'; }
  function phasesHTML(m, mode) {
    var tm = R.tempo(m.anim, mode);
    return ['up', 'hold', 'down', 'rest'].map(function (ph, i) {
      var c = m.cues[mode][ph][lang] || m.cues[mode][ph].hr;
      return '<li class="ph" data-ph="' + ph + '"><span class="n">' + (i + 1) + '</span><span class="t">' + esc(c[0]) + '</span><span class="b">' + esc(c[1]) + '</span>' +
        (mode === 'ok' ? '<span class="s">' + fmtS(tm[i]) + '</span>' : '') + '<i class="bar"></i></li>';
    }).join('');
  }

  function machine(loc, id) {
    var m = S[id], L = G.locations[loc];
    current = { page: 'machine', loc: loc, id: id };
    document.title = tx(m.name) + ' · ' + L.name;
    var setup = m.setup.map(function (x, i) { return '<li data-pin="' + (i + 1) + '"><span class="n">' + (i + 1) + '</span><span>' + esc(tx(x)) + '</span></li>'; }).join('');
    var how = m.steps.map(function (x, i) { return '<li><span class="n">' + (i + 1) + '</span><span>' + esc(tx(x)) + '</span></li>'; }).join('');
    var watch = m.watch.map(function (x) { return '<li><span class="n">' + I.x + '</span><span>' + esc(tx(x)) + '</span></li>'; }).join('');
    var speed = store.get('bg_speed') === '0.5' ? .5 : 1;
    app.innerHTML = navBar(backTo(L), tx(m.name)) +
      '<main class="wrap">' +
      '<h1 class="lt">' + esc(tx(m.name)) + '</h1>' +
      '<p class="lead">' + esc(tx(m.lead)) + '</p>' +
      '<div class="notice-slot">' + noticeHTML(loc, id) + '</div>' +
      '<section class="demo">' +
      '<div class="seg" data-i="0" role="radiogroup" aria-label="' + t('ok') + ' / ' + t('bad') + '">' +
      '<button type="button" role="radio" aria-checked="true" data-mode="ok">' + t('ok') + '</button>' +
      '<button type="button" role="radio" aria-checked="false" data-mode="bad">' + t('bad') + '</button></div>' +
      '<div class="stage"></div>' +
      '<div class="ctl"><button class="pp" type="button"></button>' +
      '<div class="spd"><span>' + t('speed') + '</span><div class="seg mini" data-i="' + (speed === 1 ? 0 : 1) + '" role="radiogroup" aria-label="' + t('speed') + '">' +
      '<button type="button" role="radio" aria-checked="' + (speed === 1) + '" data-s="1">1×</button>' +
      '<button type="button" role="radio" aria-checked="' + (speed !== 1) + '" data-s="0.5">' + (lang === 'hr' ? '0,5×' : '0.5×') + '</button></div></div></div>' +
      '<ol class="phases">' + phasesHTML(m, 'ok') + '</ol>' +
      '<p class="mus"><span class="sw" aria-hidden="true"></span><span><b>' + t('works') + '</b> ' + esc(tx(m.muscles)) + '</span></p>' +
      '</section>' +
      '<div class="group report"><button class="row rep-open" type="button"><span class="ic ic-o">' + I.wrench + '</span><span class="tx"><b>' + t('report') + '</b><small>' + t('reportSub') + '</small></span>' + I.chev + '</button></div>' +
      '<h2 class="sh">' + t('setup') + '</h2><ol class="list setup">' + setup + '</ol>' +
      '<h2 class="sh">' + t('how') + '</h2><ol class="list how">' + how + '</ol>' +
      '<h2 class="sh">' + t('watch') + '</h2><ul class="list watch">' + watch + '</ul>' +
      '<h2 class="sh">' + t('start') + '</h2><section class="plan"><div class="nums">' +
      '<div><b>' + m.plan.sets + '</b><span>' + t('sets') + '</span></div>' +
      '<div><b>' + m.plan.reps + '</b><span>' + t('reps') + '</span></div>' +
      '<div><b>' + m.plan.rest + '</b><span>' + t('rest') + '</span></div></div>' +
      '<p>' + esc(tx(m.plan.tip)) + '</p></section>' +
      '<p class="ask">' + t('ask') + '</p>' +
      gymBlock(L, true) +
      '</main>';

    var demo = app.querySelector('.demo'), list = demo.querySelector('.phases'), pp = demo.querySelector('.pp'), rows, onRow = null;
    var wantPlay = !reduce;
    function setPP(on) { pp.innerHTML = on ? I.pause : I.play; pp.setAttribute('aria-label', on ? t('pause') : t('play')); }
    function grabRows() {
      rows = Array.prototype.slice.call(list.querySelectorAll('.ph')); onRow = null;
      rows.forEach(function (r, i) {
        r.setAttribute('role', 'button'); r.setAttribute('tabindex', '0');
        r.onclick = r.onkeydown = function (e) {
          if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
          if (e.type === 'keydown') e.preventDefault();
          var tm = R.tempo(m.anim, scene.mode), st = 0;
          for (var k = 0; k < i; k++) st += tm[k];
          scene.t = st + .001; scene.ph = null; scene.tick(0);
          if (!wantPlay) { wantPlay = true; scene.play(); setPP(true); }
        };
      });
    }
    grabRows();
    if (scene) scene.pause();
    scene = new R.Scene(demo.querySelector('.stage'), m.anim, {
      label: tx(m.label),
      onCue: function (ph) {
        rows.forEach(function (r) {
          var on = r.getAttribute('data-ph') === ph;
          r.classList.toggle('is-on', on);
          if (on) onRow = r.querySelector('.bar'); else r.querySelector('.bar').style.transform = 'scaleX(0)';
        });
      },
      onProg: function (ph, f) { if (onRow) onRow.style.transform = 'scaleX(' + f.toFixed(3) + ')'; }
    });
    scene.speed = speed;
    scene.setMode('ok');
    window.__bgScene = scene;
    if (wantPlay) scene.play(); else { scene.t = R.tempo(m.anim, 'ok')[0] * .9; scene.tick(0); }
    setPP(wantPlay);
    pp.onclick = function () { wantPlay = !wantPlay; if (wantPlay) scene.play(); else scene.pause(); setPP(wantPlay); };
    var modeSeg = demo.querySelector('.seg:not(.mini)');
    modeSeg.querySelectorAll('button').forEach(function (b, i) {
      b.onclick = function () {
        var mode = b.getAttribute('data-mode');
        modeSeg.setAttribute('data-i', i);
        modeSeg.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        demo.classList.toggle('is-bad', mode === 'bad');
        list.innerHTML = phasesHTML(m, mode); grabRows();
        scene.setMode(mode);
        if (!wantPlay) { wantPlay = true; scene.play(); setPP(true); }
      };
    });
    var spSeg = demo.querySelector('.seg.mini');
    spSeg.querySelectorAll('button').forEach(function (b, i) {
      b.onclick = function () {
        spSeg.setAttribute('data-i', i);
        spSeg.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        scene.speed = +b.getAttribute('data-s'); store.set('bg_speed', b.getAttribute('data-s'));
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
    app.querySelector('.rep-open').onclick = function () { openReport(loc, id); };
    document.onvisibilitychange = function () { if (document.hidden) scene.pause(); else if (wantPlay) scene.play(); };
    chrome(function () { machine(loc, id); });
  }

  // ---------- list za prijavu kvara ----------
  function openReport(loc, id) {
    var m = S[id], L = G.locations[loc], kind = m.kind || 'stack', pick = null, last = document.activeElement;
    var opts = ISSUES.filter(function (o) { return !o.only || o.only === kind; });
    var bg = document.createElement('div'), sh = document.createElement('div');
    bg.className = 'sheet-bg'; sh.className = 'sheet';
    sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-modal', 'true'); sh.setAttribute('aria-labelledby', 'sh-t');
    sh.innerHTML = '<div class="grab" aria-hidden="true"></div><div class="sh-nav"><button class="sh-x" type="button">' + t('cancel') + '</button><b id="sh-t">' + t('report') + '</b><span></span></div>' +
      '<div class="sh-body"><p class="sh-sub">' + esc(tx(m.name)) + ', ' + esc(L.name) + '</p>' +
      '<p class="sh-h">' + t('whatWrong') + '</p>' +
      '<ul class="opts" role="radiogroup" aria-label="' + t('whatWrong') + '">' + opts.map(function (o) {
        return '<li><button class="opt" type="button" role="radio" aria-checked="false" data-id="' + o.id + '"><span>' + esc(tx(o)) + '</span>' + I.check.replace('class="i"', 'class="i ck"') + '</button></li>';
      }).join('') + '</ul>' +
      '<textarea class="note" maxlength="300" rows="3" placeholder="' + t('notePh') + '" aria-label="' + t('notePh') + '"></textarea>' +
      '<button class="btn send" type="button" disabled>' + t('send') + '</button>' +
      '<p class="sh-foot">' + t('goesTo') + '</p></div>';
    document.body.appendChild(bg); document.body.appendChild(sh);
    root.style.overflow = 'hidden';
    requestAnimationFrame(function () { requestAnimationFrame(function () { bg.classList.add('is-open'); sh.classList.add('is-open'); }); });
    function close() {
      bg.classList.remove('is-open'); sh.classList.remove('is-open'); root.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { bg.remove(); sh.remove(); }, reduce ? 0 : 450);
      if (last && last.focus) last.focus();
      refreshNotice();
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    bg.onclick = close;
    sh.querySelector('.sh-x').onclick = close;
    var send = sh.querySelector('.send');
    sh.querySelectorAll('.opt').forEach(function (b) {
      b.onclick = function () {
        pick = b.getAttribute('data-id');
        sh.querySelectorAll('.opt').forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        send.disabled = false;
      };
    });
    send.onclick = function () {
      if (!pick) return;
      KV.add({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), loc: loc, machine: id, issue: pick, note: sh.querySelector('.note').value.trim().slice(0, 300), t: Date.now(), done: null });
      sh.querySelector('.sh-nav').innerHTML = '<span></span><b id="sh-t">' + t('report') + '</b><span></span>';
      sh.querySelector('.sh-body').innerHTML = '<div class="done"><div class="big">' + I.check + '</div><h3>' + t('thanks') + '</h3><p>' + t('sent') + '</p>' +
        '<button class="btn plain fin" type="button">' + t('doneBtn') + '</button></div>';
      var fin = sh.querySelector('.fin'); fin.onclick = close; fin.focus();
      refreshNotice();
    };
    setTimeout(function () { var f = sh.querySelector('.opt'); if (f) f.focus({ preventScroll: true }); }, 60);
  }
  function refreshNotice() {
    if (current && current.page === 'machine') {
      var slot = app.querySelector('.notice-slot');
      if (slot) slot.innerHTML = noticeHTML(current.loc, current.id);
    }
  }

  // ---------- teretana ----------
  function machinesFor(loc) { return (G.machines[loc] || Object.keys(S)).filter(function (id) { return S[id]; }); }
  function gym(loc) {
    var L = G.locations[loc], st = status(L), ids = machinesFor(loc), now = new Date().getDay();
    current = { page: 'gym', loc: loc };
    if (scene) { scene.pause(); scene = null; }
    document.title = L.name;
    var groups = GR.map(function (g) {
      var items = ids.filter(function (id) { return S[id].group === g.id; });
      if (!items.length) return '';
      return '<h2 class="sh">' + esc(tx(g.name)) + '</h2><div class="group">' + items.map(function (id) {
        var rep = KV.open(loc, id).length;
        return '<a class="it" href="/bluegym/' + loc + '/' + id + '"><span class="th" data-id="' + id + '"></span><span class="tx"><b>' + esc(tx(S[id].name)) + '</b><small>' + esc(tx(S[id].muscles)) + '</small>' +
          (rep ? '<span class="tag">' + t('tag') + '</span>' : '') + '</span>' + I.chev + '</a>';
      }).join('') + '</div>';
    }).join('');
    var week = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
      var h = L.hours[d];
      return '<li' + (d === now ? ' class="is-today"' : '') + '><span>' + T[lang].days[d] + '</span><span>' + (h ? hh(h[0]) + '–' + hh(h[1]) : '—') + '</span></li>';
    }).join('');
    app.innerHTML = navBar(brand(L), L.name) +
      '<main class="wrap home"><h1 class="lt">' + esc(L.name) + '</h1>' +
      '<p class="status' + (st.open ? '' : ' is-closed') + '"><i></i>' + esc(st.text) + '</p>' +
      '<p class="intro">' + t('intro') + '</p>' + groups +
      '<h2 class="sh">' + t('hours') + '</h2><ul class="week">' + week + '</ul>' +
      gymBlock(L, false).replace('<h2 class="sh">' + esc(L.name) + '</h2>', '<div style="height:12px"></div>') +
      '</main>';
    app.querySelectorAll('.th').forEach(function (h) { R.still(h, S[h.getAttribute('data-id')].anim, .55, 72 / 58); });
    chrome(function () { gym(loc); });
  }

  // ---------- uprava: prijave kvarova ----------
  var uprTimer = null;
  function uprava(loc, tab) {
    var L = G.locations[loc], all = KV.all().filter(function (r) { return r.loc === loc && S[r.machine]; });
    var open = all.filter(function (r) { return !r.done; }), fixed = all.filter(function (r) { return r.done; }).sort(function (a, b) { return b.done - a.done; });
    tab = tab || 'open';
    current = { page: 'uprava', loc: loc, tab: tab };
    if (scene) { scene.pause(); scene = null; }
    document.title = t('upr') + ' · ' + L.name;
    var list = tab === 'open' ? open : fixed;
    var rows = list.map(function (r) {
      return '<div class="rep"><span class="th" data-id="' + r.machine + '"></span><span class="tx"><b>' + esc(tx(S[r.machine].name)) + '</b>' +
        '<span class="is">' + esc(issue(r.issue)) + '</span>' + (r.note ? '<span class="nt">„' + esc(r.note) + '“</span>' : '') +
        '<span class="tm">' + (r.done ? t('fixedAt') + ago(r.done) : t('reportedAt') + ago(r.t)) + '</span>' +
        (r.done ? '' : '<button class="fix" type="button" data-rid="' + r.id + '">' + I.check + t('markFixed') + '</button>') + '</span></div>';
    }).join('');
    var empty = tab === 'open'
      ? '<div class="empty"><div class="ic ic-g">' + I.check + '</div><b>' + t('emptyOpen') + '</b><p style="margin:6px 0 0">' + t('emptyOpenSub') + '</p></div>'
      : '<div class="empty"><p style="margin:0">' + t('emptyFixed') + '</p></div>';
    app.innerHTML = navBar(brand(L), t('upr')) +
      '<main class="wrap"><h1 class="lt">' + t('upr') + '</h1><p class="lead">' + esc(L.name) + '</p>' +
      '<div class="seg tabs" data-i="' + (tab === 'open' ? 0 : 1) + '" role="tablist">' +
      '<button type="button" role="tab" aria-selected="' + (tab === 'open') + '" aria-checked="' + (tab === 'open') + '" data-tab="open">' + t('open') + ' (' + open.length + ')</button>' +
      '<button type="button" role="tab" aria-selected="' + (tab !== 'open') + '" aria-checked="' + (tab !== 'open') + '" data-tab="fixed">' + t('fixed') + ' (' + fixed.length + ')</button></div>' +
      '<div class="group">' + (rows || empty) + '</div>' +
      '<p class="foot">' + t('made') + '<a href="https://tiptapreviews.com" target="_blank" rel="noopener">TipTap</a></p></main>';
    app.querySelectorAll('.th').forEach(function (h) { R.still(h, S[h.getAttribute('data-id')].anim, .55, 72 / 58); });
    app.querySelectorAll('.seg.tabs button').forEach(function (b) { b.onclick = function () { uprava(loc, b.getAttribute('data-tab')); }; });
    app.querySelectorAll('.fix').forEach(function (b) { b.onclick = function () { KV.resolve(b.getAttribute('data-rid')); uprava(loc, tab); }; });
    clearInterval(uprTimer);
    uprTimer = setInterval(function () { if (current.page === 'uprava') uprava(loc, current.tab); }, 30000);
    chrome(function () { uprava(loc, tab); });
  }

  // promjene s druge kartice preglednika (npr. član prijavi kvar, uprava ga vidi)
  window.addEventListener('storage', function (e) {
    if (e.key !== KV.key || !current) return;
    if (current.page === 'machine') refreshNotice();
    else if (current.page === 'gym') gym(current.loc);
    else if (current.page === 'uprava') uprava(current.loc, current.tab);
  });

  function pick() {
    current = { page: 'pick' };
    document.title = 'Blue Gym · Osijek';
    app.innerHTML = navBar('<span class="brand">' + LOGO + '<span class="bt">Blue Gym</span></span>', 'Blue Gym') + '<main class="wrap"><h1 class="lt">Blue Gym</h1><p class="lead">' + t('choose') + '</p><div class="group">' +
      (G.active || G.order).map(function (k) { var L = G.locations[k]; return '<a class="row" href="/bluegym/' + k + '"><span class="ic ic-b">' + I.gym + '</span><span class="tx"><b>' + esc(L.short) + '</b><small>' + esc(L.address) + '</small></span>' + I.chev + '</a>'; }).join('') +
      '</div></main>';
    chrome(pick);
  }

  root.lang = lang;
  var act = G.active || G.order;
  var parts = location.pathname.replace(/^\/bluegym\/?/, '').split('/').filter(Boolean);
  var loc = act.indexOf(parts[0]) >= 0 ? parts[0] : null;
  var rest = loc || G.locations[parts[0]] ? parts.slice(1) : parts;
  if (!loc && act.length === 1) {
    loc = act[0];
    var sub = rest[0] && (S[rest[0]] || rest[0] === 'uprava') ? '/' + rest[0] : '';
    var want = '/bluegym/' + loc + sub;
    if (location.pathname !== want && history.replaceState) history.replaceState(null, '', want + location.search);
  }
  if (loc && rest[0] === 'uprava') uprava(loc);
  else if (loc && rest[0] && S[rest[0]]) machine(loc, rest[0]);
  else if (loc) gym(loc);
  else pick();
})();
