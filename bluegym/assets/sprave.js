/* Blue Gym · sprave: crtež, pokret i upute (HR/EN) */
(function () {
  'use strict';
  var R = window.BGRig, mix = R.mix, line = R.line;

  // zajednički dijelovi crteža
  function floor(L, el) { el('line', { class: 'floor', x1: 8, y1: 282, x2: 352, y2: 282 }, L.back); }
  function fr(L, el, a, b, w, lay) { return el('line', { class: 'frame', x1: a[0], y1: a[1], x2: b[0], y2: b[1], 'stroke-width': w || 6 }, L[lay || 'back']); }

  var S = {};

  S['lat-masina'] = {
    group: 'ledja',
    name: { hr: 'Lat mašina', en: 'Lat pulldown' },
    lead: { hr: 'Povlačiš šipku do prsa. Jača leđa i daje im širinu.', en: 'Pull the bar down to your chest. Builds a stronger, wider back.' },
    muscles: { hr: 'Široki leđni mišić, stražnja ramena, biceps', en: 'Lats, rear shoulders, biceps' },
    label: { hr: 'Animacija: osoba sjedi na lat mašini i povlači šipku do gornjeg dijela prsa.', en: 'Animation: a person seated at the lat pulldown pulls the bar to the upper chest.' },
    setup: [
      { hr: 'Namjesti jastučić tako da ti čvrsto drži bedra. Onda te težina ne podiže sa sjedala.', en: 'Set the knee pad so it holds your thighs firmly. Then the weight can’t lift you off the seat.' },
      { hr: 'Utakni klin ispod pločice s težinom koju želiš. Za početak uzmi manje nego što misliš.', en: 'Put the pin under the plate with the weight you want. Start lighter than you think.' },
      { hr: 'Uhvati šipku malo šire od ramena, dlanovi gledaju od tebe.', en: 'Grip the bar a little wider than your shoulders, palms facing away.' }
    ],
    steps: [
      { hr: 'Sjedni uspravno, prsa gore i lagano se nagni unatrag.', en: 'Sit tall, chest up, and lean back slightly.' },
      { hr: 'Povuci šipku do gornjeg dijela prsa. Laktovi idu dolje, uz tijelo.', en: 'Pull the bar to your upper chest. Elbows travel down, close to your body.' },
      { hr: 'Na dnu na trenutak stisni lopatice.', en: 'At the bottom, squeeze your shoulder blades for a moment.' },
      { hr: 'Polako vrati šipku gore dok se ruke skoro ne isprave.', en: 'Let the bar back up slowly until your arms are almost straight.' }
    ],
    watch: [
      { hr: 'Ljuljanje tijelom. Tada vuče težina tijela, a leđa ne rade.', en: 'Swinging your body. Your body weight does the work instead of your back.' },
      { hr: 'Povlačenje iza glave. Nepotrebno opterećuje ramena.', en: 'Pulling behind your neck. It puts needless stress on your shoulders.' },
      { hr: 'Puštanje šipke da leti gore. Utezi ne smiju lupati.', en: 'Letting the bar fly up. The plates should never slam.' }
    ],
    plan: { sets: '3', reps: '10–12', rest: '60–90 s', tip: { hr: 'Težinu biraj tako da su zadnja dva ponavljanja teška, ali i dalje čista.', en: 'Pick a weight where the last two reps are hard but still clean.' } },
    cues: {
      ok: {
        up: { hr: ['Povuci do prsa', 'izdah'], en: ['Pull to your chest', 'breathe out'] },
        hold: { hr: ['Stisni lopatice', ''], en: ['Squeeze your shoulder blades', ''] },
        down: { hr: ['Polako gore', 'udah'], en: ['Slowly back up', 'breathe in'] },
        rest: { hr: ['Ruke skoro ravne', ''], en: ['Arms almost straight', ''] }
      },
      bad: {
        up: { hr: ['Trzaj i zabacivanje', ''], en: ['Jerking and leaning back', ''] },
        hold: { hr: ['Vuče težina tijela, ne leđa', ''], en: ['Body weight does the work', ''] },
        down: { hr: ['Šipka leti gore', ''], en: ['The bar flies up', ''] },
        rest: { hr: ['Utezi lupaju', ''], en: ['The plates slam', ''] }
      }
    },
    anim: {
      view: '44 14 296 272',
      tempo: { ok: [1.5, .5, 2.6, .8], bad: [.45, .12, .5, .6] },
      muscles: [
        { on: 'torso', side: -1, t: [.34, .9], depth: 7.5 },
        { on: 'arm', seg: 'SE', side: 1, t: [.25, .8], w: 5, o: 2.4, soft: true }
      ],
      strain: [{ on: 'torso', side: -1, t: [-.06, .3], depth: 6.5 }],
      pins: [
        { n: 1, at: [158, 211], d: [20, -24] },
        { n: 2, at: function (M) { return M.stack.pin(); }, d: [-22, 12] },
        { n: 3, at: function (M, J, q) { return [q.bar[0] + 15, q.bar[1]]; }, d: [20, -12] }
      ],
      pose: function (p, mode) {
        var bad = mode === 'bad';
        var bx = bad ? mix(128, 111, p) : mix(128, 124, p), by = bad ? mix(131, 194, p) : mix(131, 180, p);
        return {
          hip: [122, 229], torso: bad ? mix(184, 226, p) : mix(184, 196, p), head: bad ? mix(-4, -14, p) : -6,
          hand: [bx, by], armPole: [70, 262], arm: .88,
          foot: [172, 277], legPole: [210, 150], footDir: 90, bar: [bx, by]
        };
      },
      build: function (L, el) {
        var M = {};
        floor(L, el);
        fr(L, el, [66, 279], [300, 279], 6);
        // toranj s utezima (osoba gleda prema njemu)
        fr(L, el, [256, 279], [256, 30], 6); fr(L, el, [298, 279], [298, 30], 6);
        el('line', { class: 'rail', x1: 266, y1: 44, x2: 266, y2: 277 }, L.back);
        el('line', { class: 'rail', x1: 288, y1: 44, x2: 288, y2: 277 }, L.back);
        // gornja greda i koloture
        fr(L, el, [302, 30], [122, 30], 7);
        fr(L, el, [130, 30], [130, 38], 3); fr(L, el, [277, 30], [277, 38], 3);
        M.stack = R.stack(L.back, 262, 277, 30, 12, 5, true);
        M.cable = el('polyline', { class: 'cable' }, L.back);
        el('circle', { class: 'pulley', cx: 130, cy: 40, r: 6 }, L.back);
        el('circle', { class: 'pulley', cx: 277, cy: 40, r: 6 }, L.back);
        // sjedalo i nosač jastučića (između nogu, iza bližnje noge)
        fr(L, el, [118, 279], [118, 246], 7);
        fr(L, el, [150, 279], [150, 219], 5);
        el('rect', { class: 'pad', x: 88, y: 237, width: 60, height: 9, rx: 4.5 }, L.back);
        el('rect', { class: 'pad', x: 142, y: 211, width: 24, height: 15, rx: 7.5 }, L.mid);
        // šipka
        M.hook = el('line', { class: 'cable' }, L.mid);
        M.bar = el('line', { class: 'bar', 'stroke-width': 5.5, 'stroke-linecap': 'round' }, L.mid);
        return M;
      },
      update: function (M, p, q) {
        var b = q.bar;
        M.stack.lift(b[1] - 131);
        M.cable.setAttribute('points', [b[0], b[1] - 3, 130, 40, 277, 40, 277, M.stack.top()].map(function (v) { return v.toFixed(1); }).join(' '));
        line(M.hook, [b[0], b[1] - 3], [b[0], b[1]]);
        line(M.bar, [b[0] - 15, b[1]], [b[0] + 15, b[1]]);
      }
    }
  };

  var GROUPS = [
    { id: 'noge', name: { hr: 'Noge', en: 'Legs' } },
    { id: 'ledja', name: { hr: 'Leđa', en: 'Back' } },
    { id: 'prsa', name: { hr: 'Prsa', en: 'Chest' } },
    { id: 'ramena', name: { hr: 'Ramena', en: 'Shoulders' } },
    { id: 'ruke', name: { hr: 'Ruke', en: 'Arms' } },
    { id: 'trbuh', name: { hr: 'Trbuh', en: 'Core' } }
  ];

  window.BG_SPRAVE = S;
  window.BG_GRUPE = GROUPS;
})();
