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
      call: 'Nazovi', all: 'Sve sprave', review: 'Ocijeni nas na Googleu', reviewSub: 'Ocjena pomaže drugima da nas nađu.',
      choose: 'Odaberi teretanu', intro: 'Prisloni mobitel na karticu na spravi. Vidjet ćeš kako se pravilno koristi.',
      hours: 'Radno vrijeme', made: 'Upute na spravama: ', other: 'EN', otherLabel: 'English',
      dark: 'Uključi tamni način', light: 'Uključi svijetli način',
      report: 'Prijavi kvar', reportSub: 'Nešto ne radi? Javi upravi.', cancel: 'Odustani', whatWrong: 'Što ne radi?',
      notePh: 'Opiši ukratko (nije obavezno)', send: 'Pošalji prijavu', goesTo: 'Prijava ide upravi teretane.',
      thanks: 'Hvala!', sent: 'Uprava je obaviještena. Ostali će vidjeti da sprava ne radi.', doneBtn: 'Gotovo',
      reported: 'Prijavljen kvar', reportedSub: 'Uprava je obaviještena.', tag: 'Prijavljen kvar',
      upr: 'Uprava', open: 'Otvoreno', fixed: 'Riješeno', markFixed: 'Označi kao riješeno',
      emptyOpen: 'Sve sprave rade', emptyOpenSub: 'Prijave članova stižu ovdje.', emptyFixed: 'Još nema riješenih prijava.',
      reportedAt: 'Prijavljeno ', fixedAt: 'Riješeno ', now: 'upravo sada', min: 'prije {n} min', hrs: 'prije {n} h', yday: 'jučer',
      days: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
      dShort: ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'], and: ' i ',
      prices: 'Članarine', classes: 'Grupni treninzi', coach: 'Trener: ', clsMeta: '{d} u {h}, trener {c}', todayAt: 'Danas u ', live: 'Upravo traje', tomorrowAt: 'Sutra u ', at: ' u ',
      insta: 'Instagram', offerRow: 'Pogledaj ponudu', notice: 'Obavijest', validTo: 'Vrijedi do ',
      tabRep: 'Kvarovi', tabNote: 'Obavijest', noteNow: 'Članovi sada vide', noteNone: 'Trenutno nema obavijesti.',
      fromIg: 'Preuzeto s vašeg Instagrama, objava od 4. studenoga.', newNote: 'Nova obavijest', fTitle: 'Naslov', fText: 'Tekst', fUntil: 'Vrijedi do',
      fTitlePh: 'npr. Novi termin grupnog treninga', fTextPh: 'Kratko i jasno, do 200 znakova', publish: 'Objavi članovima', remove: 'Ukloni obavijest',
      noteWhere: 'Vidi se na početnoj i na svakoj spravi.', published: 'Objavljeno', fixedList: 'Riješeno',
      log: 'Moj dnevnik', last: 'Prošli put', todayL: 'Danas', weight: 'Težina', repsL: 'Ponavljanja', saveSet: 'Spremi seriju', undo: 'Poništi zadnju',
      onlyPhone: 'Sprema se samo na tvom mobitelu.', tryNext: 'Sva ponavljanja u 3 serije. Sljedeći put probaj {w}.', progress: 'Napredak',
      firstTime: 'Nakon svake serije upiši težinu. Idući put ovdje vidiš prošli trening.', lastShort: 'Zadnje: ', saved: 'Spremljeno',
      yesterday: 'jučer', daysAgo: 'prije {n} dana', minus: 'Manje', plus: 'Više',
      inOsijek: 'Blue Gym u Osijeku', here: 'Ovdje si', directions: 'Upute', showDist: 'Udaljenost', noLoc: 'Lokacija nije dostupna.',
      map: 'Karta', revQ: 'Kako ti je u Blue Gymu?'
    },
    en: {
      ok: 'Correct', bad: 'Common mistake', setup: 'Set up', how: 'How to do it', watch: 'Watch out for', start: 'To start',
      sets: 'sets', reps: 'reps', rest: 'rest', works: 'Works:', pause: 'Pause animation', play: 'Play animation', speed: 'Speed',
      ask: 'Not sure? Ask a trainer to show you.', back: 'Machines',
      openTill: 'Open until ', opensAt: 'Today from ', closedToday: 'Closed today', tomorrow: 'tomorrow from ', closedNow: 'Closed',
      call: 'Call', all: 'All machines', review: 'Rate us on Google', reviewSub: 'Your rating helps others find us.',
      choose: 'Choose your gym', intro: 'Tap your phone on a machine’s card. You’ll see how to use it correctly.',
      hours: 'Opening hours', made: 'Machine guides by ', other: 'HR', otherLabel: 'Hrvatski',
      dark: 'Switch to dark mode', light: 'Switch to light mode',
      report: 'Report a problem', reportSub: 'Something wrong? Tell the staff.', cancel: 'Cancel', whatWrong: 'What’s wrong?',
      notePh: 'Add a short note (optional)', send: 'Send report', goesTo: 'Your report goes to the gym staff.',
      thanks: 'Thank you!', sent: 'The staff has been notified. Others will see it’s reported.', doneBtn: 'Done',
      reported: 'Problem reported', reportedSub: 'The staff has been notified.', tag: 'Reported',
      upr: 'Management', open: 'Open', fixed: 'Fixed', markFixed: 'Mark as fixed',
      emptyOpen: 'All machines working', emptyOpenSub: 'Members’ reports will show up here.', emptyFixed: 'No fixed reports yet.',
      reportedAt: 'Reported ', fixedAt: 'Fixed ', now: 'just now', min: '{n} min ago', hrs: '{n} h ago', yday: 'yesterday',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], and: ' and ',
      prices: 'Memberships', classes: 'Group classes', coach: 'Coach: ', clsMeta: '{d} at {h} with {c}', todayAt: 'Today at ', live: 'Happening now', tomorrowAt: 'Tomorrow at ', at: ' at ',
      insta: 'Instagram', offerRow: 'See the offer', notice: 'Notice', validTo: 'Valid until ',
      tabRep: 'Problems', tabNote: 'Notice', noteNow: 'Members currently see', noteNone: 'No notice right now.',
      fromIg: 'Taken from your Instagram post of 4 November.', newNote: 'New notice', fTitle: 'Title', fText: 'Text', fUntil: 'Valid until',
      fTitlePh: 'e.g. New group class time', fTextPh: 'Short and clear, up to 200 characters', publish: 'Publish to members', remove: 'Remove notice',
      noteWhere: 'Shown on the home page and every machine.', published: 'Published', fixedList: 'Fixed',
      log: 'My log', last: 'Last time', todayL: 'Today', weight: 'Weight', repsL: 'Reps', saveSet: 'Save set', undo: 'Undo last',
      onlyPhone: 'Saved only on your phone.', tryNext: 'All reps in 3 sets. Next time try {w}.', progress: 'Progress',
      firstTime: 'Log the weight after each set. Next time you’ll see it here.', lastShort: 'Last: ', saved: 'Saved',
      yesterday: 'yesterday', daysAgo: '{n} days ago', minus: 'Less', plus: 'More',
      inOsijek: 'Blue Gym in Osijek', here: 'You’re here', directions: 'Directions', showDist: 'Distance', noLoc: 'Location unavailable.',
      map: 'Map', revQ: 'How’s your time at Blue Gym?'
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
  var SENT = '.lead,.intro,.ask,.plan p,.list li>span:last-child,.lg-first,.lg-sug>span,.notice small,.row small,.revc p,.promo>p,.done p,.empty p,.foot,.sh-sub';
  function splitSent(el) {
    [].slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType !== 3) return;
      var txt = n.nodeValue, re = /[.!?…]\s+(?=[A-ZČĆĐŠŽ„"(0-9])/g, parts = [], last = 0, m;
      while ((m = re.exec(txt))) { parts.push(txt.slice(last, m.index + 1)); last = m.index + m[0].length; }
      if (!parts.length) return;
      parts.push(txt.slice(last));
      var f = document.createDocumentFragment();
      parts.forEach(function (p, i) {
        if (!p) return;
        if (i) f.appendChild(document.createTextNode(' '));
        var sp = document.createElement('span'); sp.className = 'snt'; sp.textContent = p; f.appendChild(sp);
      });
      el.replaceChild(f, n);
    });
  }
  function sentAll(node) {
    if (node.nodeType !== 1) return;
    if (node.matches && node.matches(SENT)) splitSent(node);
    [].forEach.call(node.querySelectorAll(SENT), splitSent);
  }
  if (window.MutationObserver) new MutationObserver(function (ms) {
    ms.forEach(function (mu) {
      if (mu.target.nodeType === 1 && mu.target.matches && mu.target.matches(SENT)) splitSent(mu.target);
      [].forEach.call(mu.addedNodes, sentAll);
    });
  }).observe(document.body, { childList: true, subtree: true });
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
    cam: ico('<path d="M3.5 9A1.8 1.8 0 0 1 5.3 7.2h2.4L9.3 5h5.4l1.6 2.2h2.4A1.8 1.8 0 0 1 20.5 9v8.2a1.8 1.8 0 0 1-1.8 1.8H5.3a1.8 1.8 0 0 1-1.8-1.8Z"/><circle cx="12" cy="12.6" r="3.3"/>'),
    fb: ico('<path d="M7.5 10.6V19"/><path d="M14.3 6.3 13.6 10h4.9a1.8 1.8 0 0 1 1.7 2.3l-1.9 6.1a1.8 1.8 0 0 1-1.7 1.3H5.4a1.6 1.6 0 0 1-1.6-1.6v-6.3a1.6 1.6 0 0 1 1.6-1.6h2.1l2.9-5.4a2.1 2.1 0 0 1 3.9 1.5Z"/>'),
    tt: ico('<path d="M9.5 17.5V5.5l10-2v12"/><circle cx="7" cy="17.5" r="2.5"/><circle cx="17" cy="15.5" r="2.5"/>'),
    people: ico('<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/>'),
    tag: ico('<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.4 1.4 0 0 1 0 2l-6.6 6.6a1.4 1.4 0 0 1-2 0Z"/><circle cx="8" cy="8" r="1.4"/>'),
    up: ico('<path d="M4 16l5-5 4 4 7-7M15 8h5v5"/>'),
    loc: ico('<path d="M12 3.5l7.5 17-7.5-4-7.5 4Z"/>'),
    mega: ico('<path d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>'),
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

  // ---------- obavijest za članove (vlasnik je objavljuje; bez nje vrijedi akcija s Instagrama dok traje) ----------
  var OB = {
    key: 'bg_obavijest',
    raw: function () { try { return JSON.parse(localStorage.getItem(this.key)); } catch (e) { return null; } },
    get: function (L) {
      var s = this.raw(), now = Date.now();
      if (s && s.loc === L.id && s.removed) return null;
      if (s && s.loc === L.id && s.title) return s.until && now > s.until ? null : { kind: 'custom', title: s.title, text: s.text || '', until: s.until };
      var p = L.promo;
      if (p && now >= Date.parse(p.from) && now <= Date.parse(p.until)) return { kind: 'promo', promo: p, until: Date.parse(p.until) };
      return null;
    },
    set: function (o) { store.set(this.key, JSON.stringify(o)); },
    remove: function (L) { this.set({ loc: L.id, removed: true, t: Date.now() }); }
  };
  function dmy(ts) { var d = new Date(ts); return d.getDate() + '. ' + (d.getMonth() + 1) + '.'; }
  function joinList(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + t('and') + a[a.length - 1]; }

  function promoHTML(L, ob) {
    if (!ob) return '';
    if (ob.kind === 'custom') {
      return '<section class="promo"><div class="promo-h"><span class="promo-i">' + I.mega + '</span><h2>' + esc(ob.title) + '</h2></div>' +
        (ob.text ? '<p>' + esc(ob.text) + '</p>' : '') + (ob.until ? '<p class="promo-u">' + t('validTo') + dmy(ob.until) + '</p>' : '') + '</section>';
    }
    var p = ob.promo, rows = L.prices.filter(function (x) { return x.id && p.prices[x.id] != null; }).reverse().map(function (x) {
      return '<li><span>' + esc(tx(x.name)) + '</span><s>' + x.p + ' €</s><b>' + p.prices[x.id] + ' €</b></li>';
    }).join('');
    return '<section class="promo"><div class="promo-h"><span class="promo-i">' + I.tag + '</span><h2>' + esc(tx(p.title)) + '</h2></div>' +
      '<p>' + esc(tx(p.sub)) + '</p><ul>' + rows + '</ul></section>';
  }
  function nextClass(c) {
    var now = new Date(), d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
    for (var k = 0; k < 8; k++) {
      var dd = (d + k) % 7;
      if (c.days.indexOf(dd) < 0 || (k === 0 && h >= c.to)) continue;
      if (k === 0 && h >= c.from) return { text: t('live'), hot: true };
      if (k === 0) return { text: t('todayAt') + hh(c.from), hot: true };
      if (k === 1) return { text: t('tomorrowAt') + hh(c.from) };
      return { text: T[lang].days[dd] + t('at') + hh(c.from) };
    }
    return { text: '' };
  }
  function classesHTML(L) {
    if (!L.classes || !L.classes.length) return '';
    return '<h2 class="sh">' + t('classes') + '</h2><div class="group">' + L.classes.map(function (c) {
      var n = nextClass(c), days = joinList(c.days.map(function (x) { return T[lang].dShort[x]; }));
      days = days.charAt(0).toUpperCase() + days.slice(1);
      return '<div class="row cls"><span class="ic ic-b">' + I.people + '</span><span class="tx"><b>' + esc(tx(c.name)) + '</b>' +
        '<small>' + esc(t('clsMeta').replace('{d}', days).replace('{h}', hh(c.from)).replace('{c}', c.coach)) + '</small>' +
        (c.note ? '<small class="cn">' + esc(tx(c.note)) + '</small>' : '') +
        (n.text ? '<span class="when' + (n.hot ? ' hot' : '') + '">' + esc(n.text) + '</span>' : '') + '</span></div>';
    }).join('') + '</div>';
  }
  function pricesHTML(L, ob) {
    if (!L.prices) return '';
    var promo = ob && ob.kind === 'promo' ? ob.promo : null;
    return '<h2 class="sh" id="clanarine">' + t('prices') + '</h2><div class="group">' + L.prices.map(function (x) {
      var np = promo && x.id ? promo.prices[x.id] : null;
      return '<div class="row pr"><span class="tx"><b>' + esc(tx(x.name)) + '</b>' + (x.note ? '<small>' + esc(tx(x.note)) + '</small>' : '') + '</span>' +
        (np ? '<s>' + x.p + ' €</s><span class="pv hot">' + np + ' €</span>' : '<span class="pv">' + x.p + ' €</span>') + '</div>';
    }).join('') + '</div>';
  }
  function heroHTML(L, st) {
    if (!L.hero) return '<h1 class="lt">' + esc(L.name) + '</h1><p class="status' + (st.open ? '' : ' is-closed') + '"><i></i>' + esc(st.text) + '</p>';
    return '<section class="hero"><img class="hero-bg" src="' + L.hero + '" alt="">' +
      '<div class="hero-in"><img class="hero-logo" src="' + L.logo + '" alt="" width="60" height="60">' +
      '<h1 class="lt">' + esc(L.name) + '</h1><p class="hero-tag">' + esc(tx(L.tagline)) + '</p>' +
      '<p class="status' + (st.open ? '' : ' is-closed') + '"><i></i>' + esc(st.text) + '</p>' +
      (L.facts ? '<div class="facts">' + L.facts.map(function (f) { return '<span><b>' + esc(f.b) + '</b> ' + esc(tx(f.s)) + '</span>'; }).join('') + '</div>' : '') +
      '</div></section>';
  }

  // ---------- dnevnik težine (samo na ovom mobitelu) ----------
  var LOG = {
    key: 'bg_dnevnik',
    all: function () { try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch (e) { return {}; } },
    sets: function (id) { return this.all()[id] || []; },
    add: function (id, w, r) { var a = this.all(); (a[id] = a[id] || []).push({ t: Date.now(), w: w, r: r }); a[id] = a[id].slice(-400); store.set(this.key, JSON.stringify(a)); },
    undoToday: function (id) {
      var a = this.all(), l = a[id];
      if (l && l.length && dayKey(l[l.length - 1].t) === dayKey(Date.now())) { l.pop(); store.set(this.key, JSON.stringify(a)); }
    }
  };
  function dayKey(ts) { var d = new Date(ts); return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); }
  function sessions(sets) {
    var m = {}, order = [];
    sets.forEach(function (x) { var k = dayKey(x.t); if (!m[k]) { m[k] = []; order.push(k); } m[k].push(x); });
    return order.map(function (k) { return { k: k, t: m[k][0].t, sets: m[k], top: Math.max.apply(null, m[k].map(function (x) { return x.w; })) }; });
  }
  function kg(w) { return String(Math.round(w * 10) / 10).replace('.', lang === 'hr' ? ',' : '.') + ' kg'; }
  function maxReps(m) { return parseInt(String(m.plan.reps).split(/[–-]/).pop(), 10) || 12; }
  function agoDay(ts) {
    var a = new Date(); a.setHours(0, 0, 0, 0); var b = new Date(ts); b.setHours(0, 0, 0, 0);
    var d = Math.round((a - b) / 864e5);
    if (d <= 1) return t('yesterday');
    if (d < 7) return t('daysAgo').replace('{n}', d);
    return dmy(ts);
  }
  function suggest(m, prev) {
    if (!prev) return null;
    var top = prev.top, at = prev.sets.filter(function (x) { return x.w === top; }), mr = maxReps(m);
    return at.length >= 3 && at.every(function (x) { return x.r >= mr; }) ? top + (m.step || 5) : null;
  }
  function sparkHTML(ss) {
    var pts = ss.slice(-8);
    if (pts.length < 2) return '';
    var W = 300, H = 64, px = 14, py = 12, lo = Math.min.apply(null, pts.map(function (p) { return p.top; })), hi = Math.max.apply(null, pts.map(function (p) { return p.top; }));
    if (hi === lo) { hi += 1; lo -= 1; }
    var xy = pts.map(function (p, i) { return [px + i * (W - 2 * px) / (pts.length - 1), H - py - (p.top - lo) / (hi - lo) * (H - 2 * py)]; });
    var line = xy.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ');
    var dots = xy.map(function (q, i) { return '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="' + (i === xy.length - 1 ? 4.5 : 3) + '"><title>' + dmy(pts[i].t) + ': ' + kg(pts[i].top) + '</title></circle>'; }).join('');
    return '<div class="spark"><div class="lg-h"><b>' + t('progress') + '</b><span>' + kg(pts[0].top).replace(' kg', '') + ' → ' + kg(pts[pts.length - 1].top) + '</span></div>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="' + t('progress') + '"><polyline points="' + line + '"/>' + dots + '</svg></div>';
  }
  function logHTML(id, m, w, r) {
    var ss = sessions(LOG.sets(id)), today = dayKey(Date.now()), cur = null, prev = null;
    ss.forEach(function (x) { if (x.k === today) cur = x; else prev = x; });
    var sug = suggest(m, prev), last = cur ? cur.sets[cur.sets.length - 1] : prev ? prev.sets[prev.sets.length - 1] : null;
    if (w == null) w = sug || (last ? last.w : m.w0 || 20);
    if (r == null) r = last ? last.r : maxReps(m);
    function chip(x) { return '<span class="chip">' + kg(x.w).replace(' kg', '') + ' × ' + x.r + '</span>'; }
    return '<section class="log" data-w="' + w + '" data-r="' + r + '">' +
      (prev ? '<div class="lg-h"><b>' + t('last') + '</b><span>' + agoDay(prev.t) + '</span></div><div class="chips">' + prev.sets.map(chip).join('') + '</div>'
            : (cur ? '' : '<p class="lg-first">' + t('firstTime') + '</p>')) +
      (sug ? '<p class="lg-sug">' + I.up + '<span>' + t('tryNext').replace('{w}', kg(sug)) + '</span></p>' : '') +
      '<div class="lg-in">' +
      '<div class="stp" data-k="w"><span class="sl">' + t('weight') + '</span><button class="sb" type="button" data-d="-1" aria-label="' + t('minus') + '">−</button><output aria-live="polite">' + kg(w) + '</output><button class="sb" type="button" data-d="1" aria-label="' + t('plus') + '">+</button></div>' +
      '<div class="stp" data-k="r"><span class="sl">' + t('repsL') + '</span><button class="sb" type="button" data-d="-1" aria-label="' + t('minus') + '">−</button><output aria-live="polite">' + r + '</output><button class="sb" type="button" data-d="1" aria-label="' + t('plus') + '">+</button></div>' +
      '</div><button class="btn lg-save" type="button">' + t('saveSet') + '</button>' +
      (cur ? '<div class="lg-today"><div class="lg-h"><b>' + t('todayL') + '</b><button class="lg-undo" type="button">' + t('undo') + '</button></div><div class="chips">' + cur.sets.map(chip).join('') + '</div></div>' : '') +
      sparkHTML(ss) + '<p class="lg-note">' + t('onlyPhone') + '</p></section>';
  }
  function bindLog(id, m) {
    var sec = app.querySelector('.log');
    if (!sec) return;
    var w = +sec.getAttribute('data-w'), r = +sec.getAttribute('data-r');
    function redraw() { sec.outerHTML = logHTML(id, m, w, r); bindLog(id, m); }
    sec.querySelectorAll('.stp').forEach(function (st) {
      var k = st.getAttribute('data-k'), out = st.querySelector('output');
      st.querySelectorAll('.sb').forEach(function (b) {
        b.onclick = function () {
          var d = +b.getAttribute('data-d');
          if (k === 'w') { w = Math.max(0, Math.round((w + d * (m.inc || 2.5)) * 10) / 10); out.textContent = kg(w); sec.setAttribute('data-w', w); }
          else { r = Math.min(60, Math.max(1, r + d)); out.textContent = r; sec.setAttribute('data-r', r); }
        };
      });
    });
    sec.querySelector('.lg-save').onclick = function () {
      LOG.add(id, w, r);
      if (navigator.vibrate) try { navigator.vibrate(12); } catch (e) {}
      redraw(); toast(t('saved'));
    };
    var u = sec.querySelector('.lg-undo');
    if (u) u.onclick = function () { LOG.undoToday(id); redraw(); };
  }

  // ---------- ostale teretane ----------
  function distKm(a, b) {
    var R2 = Math.PI / 180, dLa = (b.lat - a.lat) * R2, dLo = (b.lng - a.lng) * R2;
    var h = Math.sin(dLa / 2) * Math.sin(dLa / 2) + Math.cos(a.lat * R2) * Math.cos(b.lat * R2) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
    return 12742 * Math.asin(Math.sqrt(h));
  }
  function fmtKm(d) { return d < 1 ? Math.round(d * 100) * 10 + ' m' : String(Math.round(d * 10) / 10).replace('.', lang === 'hr' ? ',' : '.') + ' km'; }
  var myPos = null;
  // kartice s fotografijom s Instagrama; listaju se u stranu, ova teretana je prva, ostale po udaljenosti kad je znamo
  function locsHTML(cur) {
    var ids = G.order.filter(function (k) { return k !== cur; });
    if (myPos) ids.sort(function (a, b) { return distKm(myPos, G.locations[a]) - distKm(myPos, G.locations[b]); });
    ids.unshift(cur);
    var cards = ids.map(function (k, i) {
      // "Ovdje si" dok ne znamo lokaciju ili kad je član stvarno u ovoj teretani; inače i ova dobiva udaljenost i upute
      var L = G.locations[k], st = status(L), d = myPos ? distKm(myPos, L) : 0, here = k === cur && d <= 0.5, el = here ? 'div' : 'a', parts = L.address.split(', '); parts.pop();
      return '<li class="lc-w"><' + el + ' class="lc' + (L.cover ? '' : ' no-img') + '"' + (here ? '' : ' href="' + L.route + '" target="_blank" rel="noopener"') + (L.tone ? ' style="--tone:' + L.tone + '"' : '') + '>' +
        (L.cover ? '<img class="lc-bg" src="' + L.cover + '" alt="" ' + (i ? 'loading="lazy" ' : '') + 'decoding="async">' : '<span class="lc-art" aria-hidden="true">' + I.gym + '</span>') +
        '<div class="lc-top">' + (here ? '<span class="lc-pill lc-here"><i></i>' + t('here') + '</span>' : '') +
        (myPos && !here ? '<span class="lc-pill lc-dist">' + I.loc + fmtKm(d) + '</span>' : '') + '</div>' +
        '<div class="lc-in"><h3>' + esc(L.short) + '</h3>' + (L.tag ? '<p class="lc-tag">' + esc(tx(L.tag)) + '</p>' : '') +
        '<p class="lc-st' + (st.open ? '' : ' is-closed') + '"><i></i>' + esc(st.text) + '</p>' +
        (L.feats ? '<div class="lc-feats">' + L.feats.map(function (f) { return '<span>' + esc(tx(f)) + '</span>'; }).join('') + '</div>' : '') +
        '<div class="lc-foot"><span class="lc-ad">' + esc(parts.join(', ')) + '</span>' + (here ? '' : '<span class="lc-go">' + I.loc + t('directions') + '</span>') + '</div></div>' +
        '</' + el + '></li>';
    }).join('');
    var dots = ids.length > 1 ? '<div class="lc-dots">' + ids.map(function (k, i) {
      return '<button type="button" aria-label="' + esc(G.locations[k].name) + '"' + (i ? '' : ' aria-current="true"') + '></button>';
    }).join('') + '</div>' : '';
    return '<section class="locs" aria-labelledby="poslovnice"><div class="sh-row"><h2 class="sh" id="poslovnice">' + t('inOsijek') + '</h2>' +
      (myPos || !navigator.geolocation ? '' : '<button class="sh-act dist-btn" type="button">' + I.loc + t('showDist') + '</button>') + '</div>' +
      '<ul class="lc-rail">' + cards + '</ul>' + dots + '</section>';
  }
  function bindLocs(cur) {
    var sec = app.querySelector('.locs'); if (!sec) return;
    var rail = sec.querySelector('.lc-rail'), items = [].slice.call(rail.children), dots = [].slice.call(sec.querySelectorAll('.lc-dots button'));
    var imgs = items.map(function (li) { return li.querySelector('.lc-bg'); }), active = 0, raf = 0;
    imgs.forEach(function (im) {
      if (!im) return;
      if (im.complete && im.naturalWidth) im.classList.add('is-ld');
      else {
        im.addEventListener('load', function () { im.classList.add('is-ld'); });
        im.addEventListener('error', function () { im.remove(); });
      }
    });
    function step() { return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : 1; }
    // aktivna kartica za točkice i blagi paralaksni pomak fotografije dok se lista
    function frame() {
      raf = 0;
      var s = step(), x = rail.scrollLeft, max = rail.scrollWidth - rail.clientWidth;
      var a = x >= max - 2 ? items.length - 1 : Math.max(0, Math.min(items.length - 1, Math.round(x / s)));
      if (a !== active) {
        active = a;
        dots.forEach(function (d, i) { if (i === a) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
      }
      if (!reduce) imgs.forEach(function (im, i) {
        if (!im) return;
        var off = Math.max(-1.1, Math.min(1.1, (items[i].offsetLeft - items[0].offsetLeft - x) / s));
        im.style.transform = 'translate3d(' + (-off * 6).toFixed(2) + '%,0,0)';
      });
    }
    rail.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
    frame();
    dots.forEach(function (d, i) {
      d.onclick = function () {
        var max = rail.scrollWidth - rail.clientWidth;
        rail.scrollTo({ left: Math.min(max, items[i].offsetLeft - items[0].offsetLeft), behavior: reduce ? 'auto' : 'smooth' });
      };
    });
    var b = sec.querySelector('.dist-btn');
    if (b) b.onclick = function () {
      b.disabled = true;
      navigator.geolocation.getCurrentPosition(function (p) {
        myPos = { lat: p.coords.latitude, lng: p.coords.longitude };
        var tmp = document.createElement('div'); tmp.innerHTML = locsHTML(cur);
        sec.replaceWith(tmp.firstChild); bindLocs(cur);
      }, function () { b.disabled = false; toast(t('noLoc')); }, { enableHighAccuracy: false, timeout: 9000, maximumAge: 300000 });
    };
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
  function logoImg(L, cls) { return L.logo ? '<img class="' + (cls || 'lg') + '" src="' + L.logo + '" alt="" width="28" height="28">' : LOGO; }
  function brand(L) { return '<a class="brand" href="/bluegym/' + L.id + '">' + logoImg(L) + '<span class="bt">Blue Gym <span>' + esc(L.short) + '</span></span></a>'; }
  function backTo(L) { return '<a class="nav-back" href="/bluegym/' + L.id + '">' + I.back + t('back') + '</a>'; }

  // podnožje: ime i stanje, tri gumba (karta, poziv, Instagram), ponuda i sve sprave, ocjena na Googleu, potpis
  function gymBlock(L, onMachine) {
    var st = status(L), ob = onMachine ? OB.get(L) : null;
    var acts = '<a class="act" href="' + L.maps + '" target="_blank" rel="noopener">' + I.pin + t('map') + '</a>' +
      (L.phone ? '<a class="act" href="tel:' + L.phone.replace(/\s/g, '') + '" aria-label="' + t('call') + ' ' + esc(L.phone) + '">' + I.phone + t('call') + '</a>' : '') +
      (L.instagram ? '<a class="act" href="https://www.instagram.com/' + L.instagram + '/" target="_blank" rel="noopener" aria-label="Instagram @' + esc(L.instagram) + '">' + I.cam + t('insta') + '</a>' : '') +
      (L.facebook ? '<a class="act" href="https://www.facebook.com/' + L.facebook + '/" target="_blank" rel="noopener" aria-label="Facebook: ' + esc(L.name) + '">' + I.fb + 'Facebook</a>' : '') +
      (L.tiktok ? '<a class="act" href="https://www.tiktok.com/@' + L.tiktok + '" target="_blank" rel="noopener" aria-label="TikTok @' + esc(L.tiktok) + '">' + I.tt + 'TikTok</a>' : '');
    var rows = (ob ? '<a class="row" href="/bluegym/' + L.id + (ob.kind === 'promo' ? '#clanarine' : '') + '"><span class="ic ic-o">' + (ob.kind === 'promo' ? I.tag : I.mega) + '</span><span class="tx"><b>' + esc(ob.kind === 'promo' ? tx(ob.promo.title) : ob.title) + '</b><small>' + esc(ob.kind === 'promo' ? tx(ob.promo.sub) : (ob.text || t('notice'))) + '</small></span>' + I.chev + '</a>' : '') +
      (onMachine ? '<a class="row" href="/bluegym/' + L.id + '"><span class="ic ic-b">' + I.gym + '</span><span class="tx"><b>' + t('all') + '</b></span>' + I.chev + '</a>' : '');
    return '<section class="gym"><h2 class="sh">' + esc(L.name) + '</h2>' +
      (onMachine ? '<p class="status g-st' + (st.open ? '' : ' is-closed') + '"><i></i>' + esc(st.text) + '</p>' : '') +
      '<div class="acts">' + acts + '</div>' +
      (rows ? '<div class="group g-rows">' + rows + '</div>' : '') +
      '<div class="revc"><b>' + t('revQ') + '</b><p>' + t('reviewSub') + '</p><a class="btn rev" href="' + L.review + '" target="_blank" rel="noopener">' + I.star + t('review') + '</a></div>' +
      '<footer class="sign">' + (L.logo ? '<img src="' + L.logo + '" alt="" width="44" height="44">' : '') + (L.motto ? '<p class="sign-m">' + esc(L.motto) + '</p>' : '') +
      '<p class="foot">' + t('made') + '<a href="https://tiptapreviews.com" target="_blank" rel="noopener">TipTap</a></p></footer></section>';
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
      '<h2 class="sh">' + t('log') + '</h2>' + logHTML(id, m) +
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
    bindLog(id, m);
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
  function lastTag(id) {
    var l = LOG.sets(id); if (!l.length) return '';
    var x = l[l.length - 1]; return '<span class="tag tag-b">' + t('lastShort') + kg(x.w) + ' × ' + x.r + '</span>';
  }
  function machinesFor(loc) { return (G.machines[loc] || Object.keys(S)).filter(function (id) { return S[id]; }); }
  function gym(loc) {
    var L = G.locations[loc], st = status(L), ids = machinesFor(loc), now = new Date().getDay(), ob = OB.get(L);
    current = { page: 'gym', loc: loc };
    if (scene) { scene.pause(); scene = null; }
    document.title = L.name;
    var groups = GR.map(function (g) {
      var items = ids.filter(function (id) { return S[id].group === g.id; });
      if (!items.length) return '';
      return '<h2 class="sh">' + esc(tx(g.name)) + '</h2><div class="group">' + items.map(function (id) {
        var rep = KV.open(loc, id).length;
        return '<a class="it" href="/bluegym/' + loc + '/' + id + '"><span class="th" data-id="' + id + '"></span><span class="tx"><b>' + esc(tx(S[id].name)) + '</b><small>' + esc(tx(S[id].muscles)) + '</small>' +
          (rep ? '<span class="tag">' + t('tag') + '</span>' : '') + lastTag(id) + '</span>' + I.chev + '</a>';
      }).join('') + '</div>';
    }).join('');
    var week = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
      var h = L.hours[d];
      return '<li' + (d === now ? ' class="is-today"' : '') + '><span>' + T[lang].days[d] + '</span><span>' + (h ? hh(h[0]) + '–' + hh(h[1]) : '—') + '</span></li>';
    }).join('');
    app.innerHTML = navBar(brand(L), L.name) +
      '<main class="wrap home">' + heroHTML(L, st) +
      promoHTML(L, ob) +
      '<p class="intro">' + t('intro') + '</p>' + groups +
      classesHTML(L) + pricesHTML(L, ob) +
      '<h2 class="sh">' + t('hours') + '</h2><ul class="week">' + week + '</ul>' +
      locsHTML(loc) +
      gymBlock(L, false) +
      '</main>';
    app.querySelectorAll('.th').forEach(function (h) { R.still(h, S[h.getAttribute('data-id')].anim, .55, 72 / 58); });
    bindLocs(loc);
    chrome(function () { gym(loc); });
    if (location.hash === '#clanarine') { var c = document.getElementById('clanarine'); if (c) setTimeout(function () { c.scrollIntoView(); }, 60); }
  }

  // ---------- uprava: prijave kvarova i obavijest za članove ----------
  var uprTimer = null;
  function uprava(loc, tab) {
    var L = G.locations[loc], all = KV.all().filter(function (r) { return r.loc === loc && S[r.machine]; });
    var open = all.filter(function (r) { return !r.done; }), fixed = all.filter(function (r) { return r.done; }).sort(function (a, b) { return b.done - a.done; });
    tab = tab || 'rep';
    current = { page: 'uprava', loc: loc, tab: tab };
    if (scene) { scene.pause(); scene = null; }
    document.title = t('upr') + ' · ' + L.name;
    function repRow(r) {
      return '<div class="rep"><span class="th" data-id="' + r.machine + '"></span><span class="tx"><b>' + esc(tx(S[r.machine].name)) + '</b>' +
        '<span class="is">' + esc(issue(r.issue)) + '</span>' + (r.note ? '<span class="nt">„' + esc(r.note) + '“</span>' : '') +
        '<span class="tm">' + (r.done ? t('fixedAt') + ago(r.done) : t('reportedAt') + ago(r.t)) + '</span>' +
        (r.done ? '' : '<button class="fix" type="button" data-rid="' + r.id + '">' + I.check + t('markFixed') + '</button>') + '</span></div>';
    }
    var body;
    if (tab === 'rep') {
      body = '<div class="group">' + (open.length ? open.map(repRow).join('') :
        '<div class="empty"><div class="ic ic-g">' + I.check + '</div><b>' + t('emptyOpen') + '</b><p style="margin:6px 0 0">' + t('emptyOpenSub') + '</p></div>') + '</div>' +
        (fixed.length ? '<h2 class="sh">' + t('fixedList') + '</h2><div class="group">' + fixed.slice(0, 20).map(repRow).join('') + '</div>' : '');
    } else {
      var ob = OB.get(L);
      body = '<p class="sh-h" style="margin:0 4px 8px">' + t('noteNow') + '</p>' + (ob ? promoHTML(L, ob) : '<div class="group"><div class="empty"><p style="margin:0">' + t('noteNone') + '</p></div></div>') +
        (ob && ob.kind === 'promo' ? '<p class="foot" style="margin:10px 0 0;text-align:left">' + t('fromIg') + '</p>' : '') +
        '<h2 class="sh">' + t('newNote') + '</h2><div class="group form">' +
        '<label class="fl"><span>' + t('fTitle') + '</span><input class="in n-t" maxlength="60" placeholder="' + t('fTitlePh') + '"></label>' +
        '<label class="fl"><span>' + t('fText') + '</span><textarea class="in n-x" maxlength="200" rows="3" placeholder="' + t('fTextPh') + '"></textarea></label>' +
        '<label class="fl"><span>' + t('fUntil') + '</span><input class="in n-u" type="date"></label></div>' +
        '<button class="btn n-pub" type="button" disabled style="margin-top:14px">' + t('publish') + '</button>' +
        (ob ? '<button class="btn plain n-rm" type="button" style="margin-top:10px">' + t('remove') + '</button>' : '') +
        '<p class="foot" style="margin:12px 0 0">' + t('noteWhere') + '</p>';
    }
    app.innerHTML = navBar(brand(L), t('upr')) +
      '<main class="wrap"><h1 class="lt">' + t('upr') + '</h1><p class="lead">' + esc(L.name) + '</p>' +
      '<div class="seg tabs" data-i="' + (tab === 'rep' ? 0 : 1) + '" role="tablist">' +
      '<button type="button" role="tab" aria-selected="' + (tab === 'rep') + '" aria-checked="' + (tab === 'rep') + '" data-tab="rep">' + t('tabRep') + (open.length ? ' (' + open.length + ')' : '') + '</button>' +
      '<button type="button" role="tab" aria-selected="' + (tab !== 'rep') + '" aria-checked="' + (tab !== 'rep') + '" data-tab="note">' + t('tabNote') + '</button></div>' +
      body + '<p class="foot">' + t('made') + '<a href="https://tiptapreviews.com" target="_blank" rel="noopener">TipTap</a></p></main>';
    app.querySelectorAll('.th').forEach(function (h) { R.still(h, S[h.getAttribute('data-id')].anim, .55, 72 / 58); });
    app.querySelectorAll('.seg.tabs button').forEach(function (b) { b.onclick = function () { uprava(loc, b.getAttribute('data-tab')); }; });
    app.querySelectorAll('.fix').forEach(function (b) { b.onclick = function () { KV.resolve(b.getAttribute('data-rid')); uprava(loc, tab); }; });
    var ti = app.querySelector('.n-t'), pub = app.querySelector('.n-pub'), rm = app.querySelector('.n-rm');
    if (ti) {
      ti.oninput = function () { pub.disabled = !ti.value.trim(); };
      pub.onclick = function () {
        var u = app.querySelector('.n-u').value, until = u ? new Date(u + 'T23:59:59').getTime() : null;
        OB.set({ loc: loc, title: ti.value.trim().slice(0, 60), text: app.querySelector('.n-x').value.trim().slice(0, 200), until: until, t: Date.now() });
        uprava(loc, 'note'); toast(t('published'));
      };
    }
    if (rm) rm.onclick = function () { OB.remove(L); uprava(loc, 'note'); };
    clearInterval(uprTimer);
    uprTimer = setInterval(function () { if (current.page === 'uprava' && current.tab === 'rep') uprava(loc, 'rep'); }, 30000);
    chrome(function () { uprava(loc, tab); });
  }
  function toast(msg) {
    var el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.innerHTML = I.check + '<span>' + esc(msg) + '</span>';
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-on'); });
    setTimeout(function () { el.classList.remove('is-on'); setTimeout(function () { el.remove(); }, 400); }, 1800);
  }

  // promjene s druge kartice preglednika (npr. član prijavi kvar, uprava ga vidi)
  window.addEventListener('storage', function (e) {
    if ((e.key !== KV.key && e.key !== OB.key) || !current) return;
    if (current.page === 'machine') refreshNotice();
    else if (current.page === 'gym') gym(current.loc);
    else if (current.page === 'uprava') uprava(current.loc, current.tab);
    if (e.key === OB.key && current.page === 'machine') machine(current.loc, current.id);
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
