/* Blue Gym · sprave: crtež, pokret i upute (HR/EN) */
(function () {
  'use strict';
  var R = window.BGRig, mix = R.mix, line = R.line;

  // zajednički dijelovi crteža
  function floor(L, el) { el('line', { class: 'floor', x1: 8, y1: 282, x2: 352, y2: 282 }, L.back); }
  function fr(L, el, a, b, w, lay) { return el('line', { class: 'frame', x1: a[0], y1: a[1], x2: b[0], y2: b[1], 'stroke-width': w || 6 }, L[lay || 'back']); }

  function padL(L, el, a, b, w, lay) { return el('line', { class: 'padl', x1: a[0], y1: a[1], x2: b[0], y2: b[1], 'stroke-width': w || 10 }, L[lay || 'back']); }
  function poly(e, pts) { e.setAttribute('points', pts.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ')); }
  // toranj s utezima: desno (osoba gleda prema njemu) ili lijevo (iza sjedala)
  function tower(L, el, side) {
    var r = side === 'right', x0 = r ? 256 : 58, x1 = r ? 298 : 102, sx = r ? 262 : 66, w = r ? 30 : 28;
    fr(L, el, [x0, 279], [x0, 30], 6); fr(L, el, [x1, 279], [x1, 30], 6);
    el('line', { class: 'rail', x1: sx + 4, y1: 44, x2: sx + 4, y2: 277 }, L.back);
    el('line', { class: 'rail', x1: sx + w - 4, y1: 44, x2: sx + w - 4, y2: 277 }, L.back);
    fr(L, el, [x0 - 4, 30], [x1 + 4, 30], 7);
    var px = sx + w / 2;
    fr(L, el, [px, 30], [px, 38], 3);
    var st = R.stack(L.back, sx, 277, w, 12, 5, r);
    st.px = px;
    st.pulley = function () { el('circle', { class: 'pulley', cx: px, cy: 40, r: 6 }, L.back); };
    return st;
  }
  function shinPad(K, a, len, side) { var u = R.dir(a), n = [u[1] * side, -u[0] * side]; return [K[0] + u[0] * len + n[0] * 10.5, K[1] + u[1] * len + n[1] * 10.5]; }

  var S = {};

  S['lat-masina'] = {
    w0: 25, inc: 2.5, step: 5,
    group: 'ledja',
    name: { hr: 'Lat mašina', en: 'Lat pulldown' },
    lead: { hr: 'Povlačiš šipku do prsa. Jača leđa i daje im širinu.', en: 'Pull the bar down to your chest. Builds a stronger, wider back.' },
    muscles: { hr: 'Leđa, stražnja ramena, biceps', en: 'Lats, rear shoulders, biceps' },
    label: { hr: 'Animacija: osoba sjedi na lat mašini i povlači šipku do gornjeg dijela prsa.', en: 'Animation: a person seated at the lat pulldown pulls the bar to the upper chest.' },
    setup: [
      { hr: 'Jastučić čvrsto na bedra. Tada te težina ne podiže.', en: 'Pad firmly on your thighs. So the weight can’t lift you.' },
      { hr: 'Utakni klin na željenu težinu. Počni lakše nego što misliš.', en: 'Put the pin in your weight. Start lighter than you think.' },
      { hr: 'Hvat malo širi od ramena. Dlanovi gledaju od tebe.', en: 'Hands wider than shoulders. Palms face away from you.' }
    ],
    steps: [
      { hr: 'Sjedni uspravno, prsa gore. Lagano se nagni unatrag.', en: 'Sit tall, chest up. Lean back slightly.' },
      { hr: 'Povuci šipku do vrha prsa. Laktovi idu dolje, uz tijelo.', en: 'Pull to your upper chest. Elbows go down, close in.' },
      { hr: 'Na dnu stisni lopatice.', en: 'Squeeze your shoulder blades.' },
      { hr: 'Polako vrati šipku gore. Ruke se skoro isprave.', en: 'Let the bar up slowly. Arms end almost straight.' }
    ],
    watch: [
      { hr: 'Ljuljanje tijelom. Tada leđa ne rade.', en: 'Swinging your body. Then your back isn’t working.' },
      { hr: 'Povlačenje iza glave. Opterećuje ramena.', en: 'Pulling behind your neck. It strains your shoulders.' },
      { hr: 'Puštanje šipke da leti gore. Utezi ne smiju lupati.', en: 'Letting the bar fly up. Plates should never slam.' }
    ],
    plan: { sets: '3', reps: '10–12', rest: '60–90 s', tip: { hr: 'Zadnja dva ponavljanja neka budu teška. Ali i dalje čista.', en: 'The last two reps should be hard. But still clean.' } },
    cues: {
      ok: {
        up: { hr: ['Povuci do prsa', 'izdah'], en: ['Pull to chest', 'exhale'] },
        hold: { hr: ['Stisni lopatice', ''], en: ['Blades together', ''] },
        down: { hr: ['Polako gore', 'udah'], en: ['Slowly back up', 'inhale'] },
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


  // ---------- NOŽNI POTISAK (45°) ----------
  var LP = { H: [118, 236] };
  S['nozni-potisak'] = {
    w0: 40, inc: 5, step: 10,
    group: 'noge', kind: 'plates',
    name: { hr: 'Nožni potisak', en: 'Leg press' },
    lead: { hr: 'Guraš platformu nogama. Jača bedra i stražnjicu, štedi leđa.', en: 'Push the platform with your legs. Thighs and glutes, easy on the back.' },
    muscles: { hr: 'Bedra, stražnjica, stražnja loža', en: 'Quads, glutes, hamstrings' },
    label: { hr: 'Animacija: osoba na nožnom potisku gura platformu pod kutom od 45°.', en: 'Animation: a person on the 45° leg press pushes the platform.' },
    setup: [
      { hr: 'Stopala na sredinu platforme. Razmak u širini ramena.', en: 'Feet mid-platform. Shoulder-width apart.' },
      { hr: 'Leđa i križa na naslonu.', en: 'Whole back flat on the pad.' },
      { hr: 'Drži ručke uz sjedalo. Noge ispruži, otpusti kočnice. Na kraju vrati kočnice.', en: 'Hold the handles by the seat. Legs straight, release stops. Lock them again when done.' }
    ],
    steps: [
      { hr: 'Polako savij koljena do 90°.', en: 'Slowly bend knees to 90°.' },
      { hr: 'Gurni petama, uz izdah.', en: 'Push with your heels, exhale.' },
      { hr: 'Na vrhu zastani. Koljena ne zaključavaj.', en: 'Pause at the top. Don’t lock your knees.' },
      { hr: 'Koljena prate smjer prstiju.', en: 'Knees track over your toes.' }
    ],
    watch: [
      { hr: 'Zaključana koljena na vrhu. Tada sva težina ide u zglob.', en: 'Locked knees at the top. The load goes into the joint.' },
      { hr: 'Križa se odvajaju od naslona. Ne spuštaj se toliko duboko.', en: 'Lower back leaves the pad. Don’t go that deep.' },
      { hr: 'Odbijanje s dna i trzaji.', en: 'Bouncing out of the bottom.' }
    ],
    plan: { sets: '3', reps: '10–12', rest: '90 s', tip: { hr: 'Počni s malo pločica. Dodaj kad 12 ponavljanja ide čisto.', en: 'Start with a few plates. Add more when all 12 reps are clean.' } },
    cues: {
      ok: {
        up: { hr: ['Gurni petama', 'izdah'], en: ['Push with heels', 'exhale'] },
        hold: { hr: ['Koljena ne zaključavaj', ''], en: ['Don’t lock your knees', ''] },
        down: { hr: ['Polako dolje', 'udah'], en: ['Slowly down', 'inhale'] },
        rest: { hr: ['Koljena oko 90°', ''], en: ['Knees at about 90°', ''] }
      },
      bad: {
        up: { hr: ['Trzaj do kraja', ''], en: ['Jerking to lockout', ''] },
        hold: { hr: ['Zaključana koljena', ''], en: ['Knees locked', ''] },
        down: { hr: ['Pada bez kontrole', ''], en: ['Drops without control', ''] },
        rest: { hr: ['Odbijanje s dna', ''], en: ['Bouncing at the bottom', ''] }
      }
    },
    anim: {
      view: '38 96 228 210',
      muscles: [
        { on: 'leg', seg: 'HK', side: 1, t: [.15, .9], w: 6, o: 2.6 },
        { on: 'torso', side: -1, t: [-.12, .14], depth: 7, soft: true }
      ],
      strain: [{ on: 'joint', j: 'K', r: 6.5, layer: 'hlL' }],
      pins: [
        { n: 1, at: function (M, J, q) { return R.pt(LP.H, 135, q.sled + 7, -12); }, d: [8, -26] },
        { n: 2, at: R.pt(LP.H, 224, 30, -22), d: [-2, 30] },
        { n: 3, at: [117, 245], d: [26, 16] }
      ],
      pose: function (p, mode) {
        var bad = mode === 'bad', sl = bad ? mix(54, 85, p) : mix(58, 82.5, p);
        return { hip: LP.H, torso: 224, head: -26, hand: [117, 238], armPole: [100, 290], foot: R.pt(LP.H, 135, sl, 6), legPole: [96, 150], footDir: 225, sled: sl };
      },
      build: function (L, el) {
        var M = {}, H = LP.H;
        floor(L, el);
        fr(L, el, [58, 279], [262, 279], 6);
        var r0 = R.pt(H, 135, 40, 26), r1 = R.pt(H, 135, 168, 26), rm = R.pt(H, 135, 104, 26);
        fr(L, el, r0, r1, 6); fr(L, el, r1, [r1[0], 279], 6); fr(L, el, rm, [rm[0], 279], 5);
        var b0 = R.pt(H, 224, -10, -17), b1 = R.pt(H, 224, 62, -17);
        padL(L, el, b0, b1, 10);
        padL(L, el, [108, 254], [148, 248], 10);
        fr(L, el, [128, 279], [128, 254], 7); fr(L, el, [b1[0] + 4, b1[1] + 6], [b1[0] + 4, 279], 5);
        el('line', { class: 'grip', x1: 117, y1: 232, x2: 117, y2: 246, 'stroke-width': 5 }, L.mid);
        M.car = el('line', { class: 'frame', 'stroke-width': 9 }, L.back);
        M.horn = el('line', { class: 'frame', 'stroke-width': 4 }, L.back);
        M.disc = el('circle', { class: 'disc', r: 17 }, L.back);
        M.hub = el('circle', { class: 'hub', r: 4.5 }, L.back);
        M.plate = el('line', { class: 'padl', 'stroke-width': 7 }, L.mid);
        return M;
      },
      update: function (M, p, q) {
        var H = LP.H, s0 = q.sled;
        line(M.car, R.pt(H, 135, s0 + 6, 20), R.pt(H, 135, s0 + 42, 20));
        var dc = R.pt(H, 135, s0 + 27, -2);
        line(M.horn, R.pt(H, 135, s0 + 27, 18), dc);
        R.circ(M.disc, dc); R.circ(M.hub, dc);
        line(M.plate, R.pt(H, 135, s0 + 6, -20), R.pt(H, 135, s0 + 6, 22));
      }
    }
  };

  // ---------- OPRUŽANJE NOGU ----------
  var LE = { H: [120, 224] };
  LE.K = R.at(LE.H, 92, 43);
  S['opruzanje-nogu'] = {
    w0: 15, inc: 2.5, step: 2.5,
    group: 'noge',
    name: { hr: 'Opružanje nogu', en: 'Leg extension' },
    lead: { hr: 'Ispružaš noge protiv jastučića. Ciljano jača prednju stranu bedara.', en: 'Straighten your legs against the pad. Targets the front of your thighs.' },
    muscles: { hr: 'Prednja loža (kvadriceps)', en: 'Quads (front of the thigh)' },
    label: { hr: 'Animacija: osoba sjedi na spravi i ispruža noge protiv jastučića.', en: 'Animation: a seated person straightens the legs against the pad.' },
    setup: [
      { hr: 'Koljeno poravnaj s osi sprave.', en: 'Knee in line with the pivot.' },
      { hr: 'Jastučić malo iznad gležnja.', en: 'Pad just above your ankles.' },
      { hr: 'Utakni klin na željenu težinu.', en: 'Put the pin in your weight.' }
    ],
    steps: [
      { hr: 'Sjedni do kraja natrag. Uhvati ručke uz sjedalo.', en: 'Sit all the way back. Hold the handles by the seat.' },
      { hr: 'Ispruži noge, uz izdah.', en: 'Straighten your legs, exhale.' },
      { hr: 'Na vrhu stisni bedra.', en: 'Squeeze at the top.' },
      { hr: 'Polako spusti, uz udah. Utezi se ne smiju dodirnuti.', en: 'Lower slowly, inhale. Don’t let the plates touch.' }
    ],
    watch: [
      { hr: 'Trzanje nogama. Pokret mora biti kontroliran.', en: 'Kicking the weight up. Keep it controlled.' },
      { hr: 'Odizanje sa sjedala.', en: 'Hips lifting off the seat.' },
      { hr: 'Preteška težina vuče koljena.', en: 'Too much weight on the knees.' }
    ],
    plan: { sets: '3', reps: '12–15', rest: '60 s', tip: { hr: 'Lakša težina, sporiji pokret.', en: 'Lighter weight, slower movement.' } },
    cues: {
      ok: {
        up: { hr: ['Ispruži noge', 'izdah'], en: ['Straighten legs', 'exhale'] },
        hold: { hr: ['Stisni bedra', ''], en: ['Squeeze your thighs', ''] },
        down: { hr: ['Polako dolje', 'udah'], en: ['Slowly down', 'inhale'] },
        rest: { hr: ['Utezi se ne dodiruju', ''], en: ['Plates don’t touch', ''] }
      },
      bad: {
        up: { hr: ['Trzaj nogama', ''], en: ['Kicking up', ''] },
        hold: { hr: ['Bokovi se odižu', ''], en: ['Hips lift off the seat', ''] },
        down: { hr: ['Pada bez kontrole', ''], en: ['Drops without control', ''] },
        rest: { hr: ['Utezi lupaju', ''], en: ['The plates slam', ''] }
      }
    },
    anim: {
      view: '44 14 296 272',
      muscles: [{ on: 'leg', seg: 'HK', side: 1, t: [.12, .92], w: 6, o: 2.6 }],
      strain: [{ on: 'joint', j: 'K', r: 6.5, layer: 'hlL' }],
      pins: [
        { n: 1, at: function () { return [LE.K[0] - 3, LE.K[1] - 4]; }, d: [-20, -30] },
        { n: 2, at: function (M, J, q) { return shinPad(LE.K, q.shin, 34, 1); }, d: [18, 14] },
        { n: 3, at: function (M) { return M.stack.pin(); }, d: [-22, 12] }
      ],
      pose: function (p, mode) {
        var bad = mode === 'bad', a = bad ? mix(4, 90, p) : mix(6, 84, p);
        return { hip: [LE.H[0], LE.H[1] - (bad ? 4 * p : 0)], torso: bad ? mix(186, 198, p) : 186, head: -4, hand: [126, 227], armPole: [92, 200], foot: R.at(LE.K, a, 41), legPole: [170, 140], footDir: a + 95, shin: a };
      },
      build: function (L, el) {
        var M = {}, H = LE.H;
        floor(L, el);
        fr(L, el, [72, 279], [300, 279], 6);
        M.stack = tower(L, el, 'right');
        M.cable = el('polyline', { class: 'cable' }, L.back);
        M.stack.pulley();
        el('circle', { class: 'pulley', cx: 250, cy: 252, r: 5 }, L.back);
        fr(L, el, [128, 279], [128, 241], 7);
        el('rect', { class: 'pad', x: 90, y: 232, width: 76, height: 9, rx: 4.5 }, L.back);
        var b0 = R.pt(H, 186, 2, -17), b1 = R.pt(H, 186, 60, -17);
        padL(L, el, b0, b1, 10);
        fr(L, el, [b0[0] - 4, b0[1] - 4], [b0[0] - 4, 241], 5);
        el('line', { class: 'grip', x1: 127, y1: 221, x2: 127, y2: 234, 'stroke-width': 5 }, L.mid);
        M.lever = el('line', { class: 'lever', 'stroke-width': 5 }, L.back);
        M.roller = el('circle', { class: 'pad', r: 7.5 }, L.mid);
        el('circle', { class: 'axis', cx: LE.K[0], cy: LE.K[1], r: 4.5 }, L.front);
        return M;
      },
      update: function (M, p, q) {
        var K = LE.K, a = q.shin, rc = shinPad(K, a, 34, 1);
        line(M.lever, K, rc); R.circ(M.roller, rc);
        M.stack.lift((a - 6) * R.RAD * 38);
        poly(M.cable, [R.at(K, a + 180, 10), [250, 252], [250, 40], [M.stack.px, 40], [M.stack.px, M.stack.top()]]);
      }
    }
  };

  // ---------- PREGIBANJE NOGU ----------
  var LC = { H: [116, 224] };
  LC.K = R.at(LC.H, 92, 43);
  S['pregibanje-nogu'] = {
    w0: 15, inc: 2.5, step: 2.5,
    group: 'noge',
    name: { hr: 'Pregibanje nogu', en: 'Leg curl' },
    lead: { hr: 'Savijaš noge prema dolje i natrag. Jača stražnju stranu bedara.', en: 'Bend your legs down and back. Strengthens the back of your thighs.' },
    muscles: { hr: 'Stražnja loža, listovi', en: 'Hamstrings, calves' },
    label: { hr: 'Animacija: osoba sjedi na spravi i savija noge prema dolje i natrag.', en: 'Animation: a seated person bends the legs down and back against the roller.' },
    setup: [
      { hr: 'Koljeno poravnaj s osi sprave.', en: 'Knee in line with the pivot.' },
      { hr: 'Valjak malo iznad pete.', en: 'Roller just above your heels.' },
      { hr: 'Jastučić čvrsto na bedra.', en: 'Pad firmly on your thighs.' },
      { hr: 'Utakni klin na željenu težinu.', en: 'Put the pin in your weight.' }
    ],
    steps: [
      { hr: 'Sjedni uspravno, uhvati ručke.', en: 'Sit tall, hold the handles.' },
      { hr: 'Savij noge do kraja, uz izdah.', en: 'Curl all the way, exhale.' },
      { hr: 'Na dnu na trenutak zastani.', en: 'Pause at the bottom.' },
      { hr: 'Polako vrati noge, uz udah.', en: 'Return slowly, inhale.' }
    ],
    watch: [
      { hr: 'Bacanje tijela naprijed.', en: 'Throwing your body forward.' },
      { hr: 'Labav jastučić, bedra se dižu.', en: 'Loose pad, thighs lift up.' },
      { hr: 'Pola pokreta. Idi do kraja u oba smjera.', en: 'Half reps. Use the full range both ways.' }
    ],
    plan: { sets: '3', reps: '10–12', rest: '60–90 s', tip: { hr: 'Spuštanje neka traje duže od dizanja.', en: 'Lower slower than you lift.' } },
    cues: {
      ok: {
        up: { hr: ['Savij noge', 'izdah'], en: ['Bend your legs', 'exhale'] },
        hold: { hr: ['Zastani', ''], en: ['Pause', ''] },
        down: { hr: ['Polako naprijed', 'udah'], en: ['Slowly forward', 'inhale'] },
        rest: { hr: ['Noge skoro ravne', ''], en: ['Legs almost straight', ''] }
      },
      bad: {
        up: { hr: ['Trzaj tijelom', ''], en: ['Jerking your body', ''] },
        hold: { hr: ['Tijelo pomaže umjesto nogu', ''], en: ['Your body does the work', ''] },
        down: { hr: ['Noge padaju naprijed', ''], en: ['Legs drop forward', ''] },
        rest: { hr: ['Utezi lupaju', ''], en: ['The plates slam', ''] }
      }
    },
    anim: {
      view: '44 14 296 272',
      muscles: [
        { on: 'leg', seg: 'HK', side: -1, t: [.15, .9], w: 5.5, o: 3 },
        { on: 'leg', seg: 'KA', side: -1, t: [.12, .6], w: 4.5, o: 2, soft: true }
      ],
      strain: [{ on: 'torso', side: -1, t: [-.06, .3], depth: 6.5 }],
      pins: [
        { n: 1, at: function () { return [LC.K[0] + 2, LC.K[1] - 4]; }, d: [24, -30] },
        { n: 2, at: function (M, J, q) { return shinPad(LC.K, q.shin, 34, -1); }, d: [20, 12] },
        { n: 3, at: [150, 203], d: [8, -26] },
        { n: 4, at: function (M) { return M.stack.pin(); }, d: [-22, 12] }
      ],
      pose: function (p, mode) {
        var bad = mode === 'bad', a = bad ? mix(84, -14, p) : mix(80, -8, p);
        return { hip: LC.H, torso: bad ? mix(186, 166, p) : 186, head: bad ? -10 : -4, hand: [124, 227], armPole: [90, 200], foot: R.at(LC.K, a, 41), legPole: [160, 140], footDir: a + 95, shin: a };
      },
      build: function (L, el) {
        var M = {}, H = LC.H;
        floor(L, el);
        fr(L, el, [70, 279], [300, 279], 6);
        M.stack = tower(L, el, 'right');
        M.cable = el('polyline', { class: 'cable' }, L.back);
        M.stack.pulley();
        el('circle', { class: 'pulley', cx: 250, cy: 252, r: 5 }, L.back);
        fr(L, el, [124, 279], [124, 241], 7);
        el('rect', { class: 'pad', x: 86, y: 232, width: 76, height: 9, rx: 4.5 }, L.back);
        var b0 = R.pt(H, 186, 2, -17), b1 = R.pt(H, 186, 60, -17);
        padL(L, el, b0, b1, 10);
        fr(L, el, [b0[0] - 4, b0[1] - 4], [b0[0] - 4, 241], 5);
        fr(L, el, [146, 279], [146, 214], 5);
        el('rect', { class: 'pad', x: 134, y: 203, width: 28, height: 12, rx: 6 }, L.mid);
        el('line', { class: 'grip', x1: 125, y1: 221, x2: 125, y2: 234, 'stroke-width': 5 }, L.mid);
        M.lever = el('line', { class: 'lever', 'stroke-width': 5 }, L.back);
        M.roller = el('circle', { class: 'pad', r: 7.5 }, L.mid);
        el('circle', { class: 'axis', cx: LC.K[0], cy: LC.K[1], r: 4.5 }, L.front);
        return M;
      },
      update: function (M, p, q) {
        var K = LC.K, a = q.shin, rc = shinPad(K, a, 34, -1);
        line(M.lever, K, rc); R.circ(M.roller, rc);
        M.stack.lift((80 - a) * R.RAD * 34);
        poly(M.cable, [R.at(K, a + 180, 10), [250, 252], [250, 40], [M.stack.px, 40], [M.stack.px, M.stack.top()]]);
      }
    }
  };

  // ---------- POTISAK ZA PRSA ----------
  var CP = { H: [170, 229], P: [160, 70], r: 127, a0: 11, a1: 28 };
  S['potisak-za-prsa'] = {
    w0: 20, inc: 2.5, step: 5,
    group: 'prsa',
    name: { hr: 'Potisak za prsa', en: 'Chest press' },
    lead: { hr: 'Guraš ručke od sebe. Jača prsa, prednja ramena i triceps.', en: 'Push the handles away from you. Builds chest, shoulders, triceps.' },
    muscles: { hr: 'Prsa, prednja ramena, triceps', en: 'Chest, front shoulders, triceps' },
    label: { hr: 'Animacija: osoba sjedi uz naslon i gura ručke naprijed.', en: 'Animation: a person seated against the pad pushes the handles forward.' },
    setup: [
      { hr: 'Namjesti visinu sjedala. Ručke u visini sredine prsa.', en: 'Adjust the seat height. Handles at mid-chest.' },
      { hr: 'Cijeli dlan, ravna zapešća.', en: 'Full grip, wrists straight.' },
      { hr: 'Leđa i lopatice uz naslon.', en: 'Back flat against the pad.' },
      { hr: 'Utakni klin na željenu težinu.', en: 'Put the pin in your weight.' }
    ],
    steps: [
      { hr: 'Gurni naprijed, uz izdah.', en: 'Push forward, exhale.' },
      { hr: 'Laktove ne zaključavaj.', en: 'Don’t lock your elbows.' },
      { hr: 'Polako natrag, uz udah. Do blagog istezanja prsa.', en: 'Slowly back, inhale. To a light chest stretch.' }
    ],
    watch: [
      { hr: 'Leđa se odvajaju od naslona.', en: 'Back coming off the pad.' },
      { hr: 'Laktovi visoko uz uši. Drži ih malo ispod ramena.', en: 'Elbows flared up high. Keep them below shoulders.' },
      { hr: 'Puštanje ručki da utezi lupnu.', en: 'Letting the plates slam.' }
    ],
    plan: { sets: '3', reps: '10–12', rest: '60–90 s', tip: { hr: 'Leđa ti se odvajaju od naslona? Težina je preteška.', en: 'Back leaving the pad? The weight is too heavy.' } },
    cues: {
      ok: {
        up: { hr: ['Gurni naprijed', 'izdah'], en: ['Push forward', 'exhale'] },
        hold: { hr: ['Laktovi mekani', ''], en: ['Soft elbows', ''] },
        down: { hr: ['Polako natrag', 'udah'], en: ['Slowly back', 'inhale'] },
        rest: { hr: ['Leđa na naslonu', ''], en: ['Back on the pad', ''] }
      },
      bad: {
        up: { hr: ['Ramena idu naprijed', ''], en: ['Shoulders roll forward', ''] },
        hold: { hr: ['Leđa odvojena od naslona', ''], en: ['Back off the pad', ''] },
        down: { hr: ['Ručke padaju natrag', ''], en: ['Handles drop back', ''] },
        rest: { hr: ['Utezi lupaju', ''], en: ['The plates slam', ''] }
      }
    },
    anim: {
      view: '44 14 296 272',
      muscles: [
        { on: 'torso', side: 1, t: [.6, .96], depth: 7 },
        { on: 'arm', seg: 'SE', side: -1, t: [.2, .85], w: 5, o: 2.4, soft: true }
      ],
      strain: [{ on: 'joint', j: 'S', r: 8, layer: 'hlA' }],
      pins: [
        { n: 1, at: [168, 258], d: [26, 8] },
        { n: 2, at: function (M, J, q) { return [q.hand[0], q.hand[1] - 9]; }, d: [16, -18] },
        { n: 3, at: R.pt(CP.H, 182, 40, -23), d: [-24, -14] },
        { n: 4, at: function (M) { return M.stack.pin(); }, d: [10, 20] }
      ],
      pose: function (p, mode) {
        var bad = mode === 'bad', ang = mix(CP.a0, CP.a1, p);
        return { hip: CP.H, torso: bad ? mix(182, 166, p) : 182, head: bad ? -8 : -2, hand: R.at(CP.P, ang, CP.r), armPole: [110, 214], foot: [214, 277], legPole: [236, 170], footDir: 90, ang: ang };
      },
      build: function (L, el) {
        var M = {}, H = CP.H;
        floor(L, el);
        fr(L, el, [54, 279], [236, 279], 6);
        M.stack = tower(L, el, 'left');
        fr(L, el, [100, 30], [172, 30], 7); fr(L, el, [CP.P[0], 30], [CP.P[0], 64], 6);
        M.cable = el('polyline', { class: 'cable' }, L.back);
        M.stack.pulley();
        fr(L, el, [168, 279], [168, 246], 7);
        el('rect', { class: 'pad', x: 140, y: 237, width: 62, height: 9, rx: 4.5 }, L.back);
        var b0 = R.pt(H, 182, 2, -17), b1 = R.pt(H, 182, 66, -17);
        padL(L, el, b0, b1, 10);
        fr(L, el, [b0[0] - 4, b0[1] - 2], [b0[0] - 4, 246], 5);
        M.lever = el('line', { class: 'lever', 'stroke-width': 6 }, L.back);
        el('circle', { class: 'pivot', cx: CP.P[0], cy: CP.P[1], r: 5 }, L.back);
        M.grip = el('line', { class: 'grip', 'stroke-width': 6 }, L.mid);
        return M;
      },
      update: function (M, p, q) {
        var h = q.hand;
        line(M.lever, CP.P, h); line(M.grip, [h[0], h[1] - 8], [h[0], h[1] + 7]);
        M.stack.lift((q.ang - CP.a0) * R.RAD * 70);
        poly(M.cable, [R.at(CP.P, q.ang + 180, 12), [M.stack.px, 40], [M.stack.px, M.stack.top()]]);
      }
    }
  };

  // ---------- VESLANJE NA SAJLI ----------
  var SR = { H: [110, 248], h0: [162, 207], h1: [126, 226], b0: [178, 211], b1: [118, 232], P: [246, 212] };
  S['veslanje-na-sajli'] = {
    w0: 25, inc: 2.5, step: 5,
    group: 'ledja',
    name: { hr: 'Veslanje na sajli', en: 'Seated cable row' },
    lead: { hr: 'Povlačiš ručku prema trbuhu. Jača leđa i popravlja držanje.', en: 'Pull the handle toward your stomach. Builds mid back, helps posture.' },
    muscles: { hr: 'Sredina i širina leđa, biceps', en: 'Mid back, lats, biceps' },
    label: { hr: 'Animacija: osoba sjedi uspravno i povlači ručku sajle prema trbuhu.', en: 'Animation: a person sitting tall pulls the cable handle to the stomach.' },
    setup: [
      { hr: 'Stopala na platformu. Koljena lagano savijena.', en: 'Feet on the platform. Knees slightly bent.' },
      { hr: 'Utakni klin na željenu težinu.', en: 'Put the pin in your weight.' },
      { hr: 'Uhvati ručku, sjedni uspravno.', en: 'Grab the handle, sit tall.' }
    ],
    steps: [
      { hr: 'Prsa gore, ramena natrag.', en: 'Chest up, shoulders back.' },
      { hr: 'Povuci do trbuha, uz izdah. Laktovi idu uz tijelo.', en: 'Pull to your stomach, exhale. Elbows close to your body.' },
      { hr: 'Na trenutak stisni lopatice.', en: 'Squeeze your shoulder blades.' },
      { hr: 'Polako ispruži ruke, uz udah. Tijelo ostaje mirno.', en: 'Arms out slowly, inhale. Keep your body still.' }
    ],
    watch: [
      { hr: 'Ljuljanje tijelom.', en: 'Rocking your body.' },
      { hr: 'Grbljenje leđa pri ispružanju.', en: 'Rounding your back forward.' },
      { hr: 'Vuku samo ruke, ne lopatice.', en: 'Pulling with your arms only.' }
    ],
    plan: { sets: '3', reps: '10–12', rest: '60–90 s', tip: { hr: 'Laktovima guraj nešto iza sebe.', en: 'Push your elbows behind you.' } },
    cues: {
      ok: {
        up: { hr: ['Povuci do trbuha', 'izdah'], en: ['Pull to belly', 'exhale'] },
        hold: { hr: ['Stisni lopatice', ''], en: ['Blades together', ''] },
        down: { hr: ['Polako naprijed', 'udah'], en: ['Slowly forward', 'inhale'] },
        rest: { hr: ['Leđa ravna', ''], en: ['Back straight', ''] }
      },
      bad: {
        up: { hr: ['Zabacivanje unatrag', ''], en: ['Throwing yourself back', ''] },
        hold: { hr: ['Vuče težina tijela', ''], en: ['Body weight does the work', ''] },
        down: { hr: ['Pad naprijed, leđa se grbe', ''], en: ['Falling forward, back rounds', ''] },
        rest: { hr: ['Utezi lupaju', ''], en: ['The plates slam', ''] }
      }
    },
    anim: {
      view: '44 14 296 272',
      muscles: [
        { on: 'torso', side: -1, t: [.5, .96], depth: 7.5 },
        { on: 'arm', seg: 'SE', side: 1, t: [.25, .8], w: 5, o: 2.4, soft: true }
      ],
      strain: [{ on: 'torso', side: -1, t: [-.06, .3], depth: 6.5 }],
      pins: [
        { n: 1, at: [193, 238], d: [18, 22] },
        { n: 2, at: function (M) { return M.stack.pin(); }, d: [-20, 22] },
        { n: 3, at: function (M, J, q) { return [q.hand[0] + 4, q.hand[1] - 8]; }, d: [8, -26] }
      ],
      pose: function (p, mode) {
        var bad = mode === 'bad', h = bad ? R.mixP(SR.b0, SR.b1, p) : R.mixP(SR.h0, SR.h1, p);
        return { hip: SR.H, torso: bad ? mix(160, 208, p) : mix(180, 186, p), head: bad ? mix(10, -10, p) : -4, hand: h, armPole: [60, 240], foot: [184, 244], legPole: [150, 170], footDir: 160, h0: bad ? SR.b0 : SR.h0 };
      },
      build: function (L, el) {
        var M = {};
        floor(L, el);
        fr(L, el, [60, 279], [300, 279], 6);
        M.stack = tower(L, el, 'right');
        M.cable = el('polyline', { class: 'cable' }, L.back);
        M.stack.pulley();
        el('circle', { class: 'pulley', cx: SR.P[0], cy: SR.P[1], r: 5 }, L.back);
        el('rect', { class: 'pad', x: 54, y: 256, width: 120, height: 9, rx: 4.5 }, L.back);
        fr(L, el, [74, 279], [74, 265], 6); fr(L, el, [152, 279], [152, 265], 6);
        padL(L, el, [184, 266], [198, 225], 8);
        fr(L, el, [186, 279], [186, 266], 5);
        M.grip = el('line', { class: 'grip', 'stroke-width': 6 }, L.mid);
        return M;
      },
      update: function (M, p, q) {
        var h = q.hand;
        line(M.grip, [h[0] + 2, h[1] - 6], [h[0] + 2, h[1] + 6]);
        M.stack.lift(Math.hypot(h[0] - q.h0[0], h[1] - q.h0[1]));
        poly(M.cable, [[h[0] + 3, h[1]], SR.P, [SR.P[0], 40], [M.stack.px, 40], [M.stack.px, M.stack.top()]]);
      }
    }
  };

  // ---------- POTISAK ZA RAMENA ----------
  var SPR = { H: [168, 229], P: [112, 150], r: 66.5, a0: 75, a1: 112, b1: 108 };
  S['potisak-za-ramena'] = {
    w0: 15, inc: 2.5, step: 2.5,
    group: 'ramena',
    name: { hr: 'Potisak za ramena', en: 'Shoulder press' },
    lead: { hr: 'Guraš ručke iznad glave. Jača ramena i triceps.', en: 'Press the handles overhead. Builds your shoulders and triceps.' },
    muscles: { hr: 'Ramena, triceps, gornja prsa', en: 'Shoulders, triceps, chest' },
    label: { hr: 'Animacija: osoba sjedi uz naslon i gura ručke iznad glave.', en: 'Animation: a person seated against the pad presses the handles overhead.' },
    setup: [
      { hr: 'Namjesti visinu sjedala. Ručke u visini ramena.', en: 'Adjust the seat height. Handles at shoulder height.' },
      { hr: 'Uhvati ručke, ravna zapešća. Laktovi ispod šaka.', en: 'Grip, wrists straight. Elbows under your hands.' },
      { hr: 'Utakni klin na željenu težinu.', en: 'Put the pin in your weight.' }
    ],
    steps: [
      { hr: 'Cijela leđa uz naslon. Trbuh lagano stegnut.', en: 'Whole back on the pad. Brace your stomach lightly.' },
      { hr: 'Gurni ručke gore, uz izdah.', en: 'Press up, exhale.' },
      { hr: 'Polako do ramena, uz udah.', en: 'Lower to shoulders, inhale.' }
    ],
    watch: [
      { hr: 'Izvijanje donjeg dijela leđa. Križa ostaju na naslonu.', en: 'Arching your lower back. Keep it on the pad.' },
      { hr: 'Zaključavanje laktova na vrhu.', en: 'Locked elbows at the top.' },
      { hr: 'Preduboko kad ramena bole.', en: 'Too deep with sore shoulders.' }
    ],
    plan: { sets: '3', reps: '8–12', rest: '90 s', tip: { hr: 'Ramena su manji mišić. Počni lakše nego na prsima.', en: 'Shoulders are a smaller muscle. Start lighter than on chest press.' } },
    cues: {
      ok: {
        up: { hr: ['Gurni gore', 'izdah'], en: ['Press up', 'exhale'] },
        hold: { hr: ['Laktovi mekani', ''], en: ['Soft elbows', ''] },
        down: { hr: ['Polako dolje', 'udah'], en: ['Slowly down', 'inhale'] },
        rest: { hr: ['Leđa na naslonu', ''], en: ['Back on the pad', ''] }
      },
      bad: {
        up: { hr: ['Izvijanje leđa', ''], en: ['Arching your back', ''] },
        hold: { hr: ['Križa odvojena od naslona', ''], en: ['Lower back off the pad', ''] },
        down: { hr: ['Ručke padaju', ''], en: ['Handles drop', ''] },
        rest: { hr: ['Utezi lupaju', ''], en: ['The plates slam', ''] }
      }
    },
    anim: {
      view: '44 14 296 272',
      muscles: [
        { on: 'joint', j: 'S', r: 7.5, layer: 'hlA' },
        { on: 'arm', seg: 'SE', side: -1, t: [.25, .85], w: 5, o: 2.4, soft: true }
      ],
      strain: [{ on: 'torso', side: -1, t: [-.06, .3], depth: 6.5 }],
      pins: [
        { n: 1, at: [166, 258], d: [26, 8] },
        { n: 2, at: function (M, J, q) { return [q.hand[0] + 5, q.hand[1] - 3]; }, d: [18, -14] },
        { n: 3, at: function (M) { return M.stack.pin(); }, d: [12, 18] }
      ],
      pose: function (p, mode) {
        var bad = mode === 'bad', ang = mix(SPR.a0, bad ? SPR.b1 : SPR.a1, p);
        return { hip: SPR.H, torso: bad ? mix(181, 193, p) : 181, head: -3, hand: R.at(SPR.P, ang, SPR.r), armPole: [196, 236], foot: [212, 277], legPole: [234, 170], footDir: 90, ang: ang };
      },
      build: function (L, el) {
        var M = {}, H = SPR.H;
        floor(L, el);
        fr(L, el, [54, 279], [234, 279], 6);
        M.stack = tower(L, el, 'left');
        M.cable = el('polyline', { class: 'cable' }, L.back);
        M.stack.pulley();
        fr(L, el, [SPR.P[0], 279], [SPR.P[0], SPR.P[1]], 6);
        fr(L, el, [166, 279], [166, 246], 7);
        el('rect', { class: 'pad', x: 138, y: 237, width: 62, height: 9, rx: 4.5 }, L.back);
        var b0 = R.pt(H, 181, 2, -17), b1 = R.pt(H, 181, 68, -17);
        padL(L, el, b0, b1, 10);
        fr(L, el, [b0[0] - 4, b0[1] - 2], [b0[0] - 4, 246], 5);
        M.lever = el('line', { class: 'lever', 'stroke-width': 6 }, L.back);
        el('circle', { class: 'pivot', cx: SPR.P[0], cy: SPR.P[1], r: 5 }, L.back);
        M.grip = el('line', { class: 'grip', 'stroke-width': 6 }, L.mid);
        return M;
      },
      update: function (M, p, q) {
        var h = q.hand;
        line(M.lever, SPR.P, h); line(M.grip, [h[0] - 5, h[1]], [h[0] + 7, h[1]]);
        M.stack.lift((q.ang - SPR.a0) * R.RAD * 60);
        poly(M.cable, [R.at(SPR.P, q.ang + 180, 12), [M.stack.px, 40], [M.stack.px, M.stack.top()]]);
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
