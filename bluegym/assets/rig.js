/* Blue Gym · animirane upute za sprave (TipTap)
   Bočni pogled, osoba gleda udesno. Kutovi segmenata: 0 = dolje, 90 = naprijed, 180 = gore.
   Ruke i noge se računaju inverznom kinematikom, pa su šake i stopala uvijek na spravi. */
(function () {
  'use strict';
  var RAD = Math.PI / 180, NS = 'http://www.w3.org/2000/svg';
  var B = { torso: 52, neck: 5, head: 11.5, ua: 29, fa: 26, th: 43, sh: 41 };
  // profil trupa: [udio od kuka do ramena, prednja strana, stražnja strana]
  var TORSO = [[-.12, 6.5, 9], [0, 11, 15], [.24, 10.5, 12], [.46, 10, 10.5], [.72, 13.5, 12.5], [.93, 11, 11.5], [1.03, 7, 8]];
  var FAR = [4.5, -3];

  function dir(a) { return [Math.sin(a * RAD), Math.cos(a * RAD)]; }
  function at(p, a, L) { var d = dir(a); return [p[0] + d[0] * L, p[1] + d[1] * L]; }
  function mix(a, b, t) { return a + (b - a) * t; }
  function mixP(p, q, t) { return [mix(p[0], q[0], t), mix(p[1], q[1], t)]; }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function fx(p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }
  function off(p, o) { return [p[0] + o[0], p[1] + o[1]]; }

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function line(e, a, b) { e.setAttribute('x1', a[0].toFixed(1)); e.setAttribute('y1', a[1].toFixed(1)); e.setAttribute('x2', b[0].toFixed(1)); e.setAttribute('y2', b[1].toFixed(1)); }
  function circ(e, c) { e.setAttribute('cx', c[0].toFixed(1)); e.setAttribute('cy', c[1].toFixed(1)); }

  // dvozglobna inverzna kinematika; pole = točka prema kojoj se savija lakat ili koljeno
  function ik(root, target, a, b, pole) {
    var dx = target[0] - root[0], dy = target[1] - root[1], d = Math.hypot(dx, dy) || .01;
    var max = a + b - .3, min = Math.abs(a - b) + .3;
    if (d > max) { dx *= max / d; dy *= max / d; d = max; }
    if (d < min) d = min;
    var base = Math.atan2(dy, dx);
    var al = Math.acos(Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d))));
    var m1 = [root[0] + a * Math.cos(base + al), root[1] + a * Math.sin(base + al)];
    var m2 = [root[0] + a * Math.cos(base - al), root[1] + a * Math.sin(base - al)];
    var mid = Math.hypot(m1[0] - pole[0], m1[1] - pole[1]) < Math.hypot(m2[0] - pole[0], m2[1] - pole[1]) ? m1 : m2;
    var ex = target[0] - mid[0], ey = target[1] - mid[1], el2 = Math.hypot(ex, ey) || 1;
    return [mid, [mid[0] + ex / el2 * b, mid[1] + ey / el2 * b]];
  }

  // glatka zatvorena krivulja kroz točke (Catmull-Rom)
  function smooth(pts) {
    var n = pts.length, d = 'M' + fx(pts[0]);
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += 'C' + fx([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]) + ' ' +
        fx([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]) + ' ' + fx(p2);
    }
    return d + 'Z';
  }
  function prof(t, k) {
    if (t <= TORSO[0][0]) return TORSO[0][k];
    for (var i = 1; i < TORSO.length; i++) if (t <= TORSO[i][0]) {
      var a = TORSO[i - 1], b = TORSO[i];
      return mix(a[k], b[k], (t - a[0]) / (b[0] - a[0]));
    }
    return TORSO[TORSO.length - 1][k];
  }
  function axis(H, S) {
    var L = Math.hypot(S[0] - H[0], S[1] - H[1]) || 1, u = [(S[0] - H[0]) / L, (S[1] - H[1]) / L];
    return { L: L, u: u, n: [-u[1], u[0]] }; // n pokazuje prema prsima
  }
  function tp(H, F, t, o) { return [H[0] + F.u[0] * t * F.L + F.n[0] * o, H[1] + F.u[1] * t * F.L + F.n[1] * o]; }
  function torsoPath(H, S) {
    var F = axis(H, S), pts = [], i;
    for (i = 0; i < TORSO.length; i++) pts.push(tp(H, F, TORSO[i][0], -TORSO[i][2]));
    pts.push(tp(H, F, 1.12, 0));
    for (i = TORSO.length - 1; i >= 0; i--) pts.push(tp(H, F, TORSO[i][0], TORSO[i][1]));
    pts.push(tp(H, F, -.2, 0));
    return smooth(pts);
  }
  // traka mišića na trupu: side 1 = prsa i trbuh, -1 = leđa
  function torsoBand(H, S, t0, t1, side, depth) {
    var F = axis(H, S), out = [], inn = [], k = side > 0 ? 1 : 2;
    for (var i = 0; i <= 10; i++) {
      var t = mix(t0, t1, i / 10), o = prof(t, k);
      out.push(tp(H, F, t, side * (o - .6)));
      inn.unshift(tp(H, F, t, side * (o - depth)));
    }
    return 'M' + out.concat(inn).map(fx).join('L') + 'Z';
  }
  // traka mišića na udu: side 1 = prednja strana (kvadriceps, biceps), -1 = stražnja
  function limbBand(a, b, side, o, t0, t1) {
    var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, u = [dx / L, dy / L], n = [u[1] * side, -u[0] * side];
    return [[a[0] + u[0] * L * t0 + n[0] * o, a[1] + u[1] * L * t0 + n[1] * o], [a[0] + u[0] * L * t1 + n[0] * o, a[1] + u[1] * L * t1 + n[1] * o]];
  }

  // slog utega: x, dno, širina, broj pločica, koliko ih klin diže
  function stack(g, x, yb, w, n, pin, left) {
    var h = 8, gap = 1.6, G = el('g', {}, g), up = el('g', {}, G), lift = 0;
    for (var i = 0; i < n; i++) {
      var y = yb - (i + 1) * (h + gap) + gap, top = i >= n - pin;
      el('rect', { class: 'plate' + (top ? ' plate-up' : ''), x: x, y: y, width: w, height: h, rx: 1.5 }, top ? up : G);
    }
    var yTop = yb - n * (h + gap) + gap, pinY = yb - (n - pin + 1) * (h + gap) + gap + h / 2;
    el('rect', { class: 'head', x: x + 3, y: yTop - 5, width: w - 6, height: 5, rx: 1.5 }, up);
    el('line', { class: 'rod', x1: x + w / 2, y1: yTop - 2, x2: x + w / 2, y2: pinY }, up);
    var px = left ? x - 11 : x + w + 11;
    el('line', { class: 'pin', x1: left ? x + 2 : x + w - 2, y1: pinY, x2: px, y2: pinY }, up);
    el('circle', { class: 'pin-k', cx: px, cy: pinY, r: 2.8 }, up);
    return {
      lift: function (d) { lift = d; up.setAttribute('transform', 'translate(0,' + (-d).toFixed(1) + ')'); },
      top: function () { return yTop - 5 - lift; },
      pin: function () { return [px, pinY - lift]; }
    };
  }

  function Scene(host, spec, o) {
    var s = this, L = s.L = {}, P = s.P = {};
    o = o || {};
    s.spec = spec; s.mode = 'ok'; s.t = 0; s.on = true; s.ph = null;
    s.onCue = o.onCue || function () {}; s.onProg = o.onProg || function () {};
    s.svg = el('svg', { viewBox: spec.view || '0 0 360 300', class: 'rig', role: 'img', 'aria-label': o.label || '' }, host);
    ['back', 'guide', 'far', 'torso', 'hlT', 'leg', 'hlL', 'mid', 'arm', 'hlA', 'front', 'pins'].forEach(function (k) { L[k] = el('g', { class: 'L-' + k }, s.svg); });
    function cap(g, cls, w) { return el('line', { class: cls, 'stroke-width': w, 'stroke-linecap': 'round' }, g); }
    P.fTh = cap(L.far, 'far', 15); P.fSh = cap(L.far, 'far', 11); P.fFt = cap(L.far, 'far', 6.5);
    P.fUa = cap(L.far, 'far', 10); P.fFa = cap(L.far, 'far', 8.5); P.fHd = el('circle', { class: 'far', r: 4.6 }, L.far);
    P.neck = cap(L.torso, 'body', 9);
    P.torso = el('path', { class: 'body' }, L.torso);
    P.head = el('circle', { class: 'body', r: B.head }, L.torso);
    P.th = cap(L.leg, 'body', 16); P.sh = cap(L.leg, 'body', 12); P.ft = cap(L.leg, 'body', 7);
    P.ua = cap(L.arm, 'body', 11); P.fa = cap(L.arm, 'body', 9.5); P.hd = el('circle', { class: 'body', r: 5 }, L.arm);
    function hls(list, cls) {
      return (list || []).map(function (m) {
        var lay = L[m.layer || (m.on === 'torso' ? 'hlT' : m.on === 'leg' ? 'hlL' : 'hlA')];
        var e = m.on === 'torso' ? el('path', { class: cls }, lay) : m.on === 'joint' ? el('circle', { class: cls, r: m.r || 7 }, lay) : el('line', { class: cls, 'stroke-width': m.w || 6, 'stroke-linecap': 'round' }, lay);
        return { m: m, e: e };
      });
    }
    s.hl = hls(spec.muscles, 'hl');
    s.st = hls(spec.strain, 'strain');
    s.M = spec.build(L, el, s) || {};
    s.pins = (spec.pins || []).map(function (pn) {
      var g = el('g', { class: 'pin-c', 'data-pin': pn.n }, L.pins);
      var ln = el('line', { class: 'pin-l' }, g), dot = el('circle', { class: 'pin-d', r: 2.4 }, g);
      var c = el('circle', { class: 'pin-b', r: 8.5 }, g), tx = el('text', { class: 'pin-t', 'text-anchor': 'middle', dy: '3.6' }, g);
      tx.textContent = pn.n;
      return { pn: pn, g: g, ln: ln, dot: dot, c: c, tx: tx };
    });
    s.draw(0, 'rest');
  }

  Scene.prototype.draw = function (p, ph) {
    var s = this, sp = s.spec, q = sp.pose(p, s.mode), P = s.P;
    var H = q.hip, S = at(H, q.torso, B.torso);
    var hc = at(S, q.torso + (q.head || 0), B.neck + B.head * .82);
    var ak = q.arm || 1, arm = ik(S, q.hand, B.ua * ak, B.fa * ak, q.armPole);
    var lk = q.leg || 1, leg = ik(H, q.foot, B.th * lk, B.sh * lk, q.legPole);
    var E = arm[0], W = arm[1], K = leg[0], A = leg[1];
    var fd = q.footDir == null ? 90 : q.footDir, heel = at(A, fd + 180, 4), toe = at(A, fd, 14);
    var J = { H: H, S: S, E: E, W: W, K: K, A: A, C: hc };
    s.J = J; s.q = q;
    line(P.th, H, K); line(P.sh, K, A); line(P.ft, heel, toe);
    line(P.ua, S, E); line(P.fa, E, W); circ(P.hd, W);
    P.torso.setAttribute('d', torsoPath(H, S));
    line(P.neck, at(S, q.torso, -3), hc); circ(P.head, hc);
    line(P.fTh, off(H, FAR), off(K, FAR)); line(P.fSh, off(K, FAR), off(A, FAR)); line(P.fFt, off(heel, FAR), off(toe, FAR));
    line(P.fUa, off(S, FAR), off(E, FAR)); line(P.fFa, off(E, FAR), off(W, FAR)); circ(P.fHd, off(W, FAR));
    var eff = ph === 'up' ? .35 + .65 * p : ph === 'hold' ? 1 : ph === 'down' ? .35 + .65 * p : .35;
    function paint(list, show) {
      list.forEach(function (h) {
        var m = h.m;
        if (!show) { h.e.style.opacity = 0; return; }
        if (m.on === 'torso') h.e.setAttribute('d', torsoBand(H, S, m.t[0], m.t[1], m.side, m.depth || 7));
        else if (m.on === 'joint') circ(h.e, J[m.j]);
        else {
          var a = J[m.seg[0]], b = J[m.seg[1]], ln = limbBand(a, b, m.side, m.o || 2.5, m.t[0], m.t[1]);
          line(h.e, ln[0], ln[1]);
        }
        h.e.style.opacity = (m.soft ? .55 : 1) * (h.e.classList.contains('strain') ? (s.mode === 'bad' ? .25 + .75 * p : 0) : eff);
      });
    }
    paint(s.hl, true);
    paint(s.st, s.mode === 'bad');
    if (sp.update) sp.update(s.M, p, q, J, s.mode, ph);
    s.pins.forEach(function (o) {
      var a = typeof o.pn.at === 'function' ? o.pn.at(s.M, J, q) : o.pn.at, b = [a[0] + o.pn.d[0], a[1] + o.pn.d[1]];
      line(o.ln, a, b); circ(o.dot, a); circ(o.c, b);
      o.tx.setAttribute('x', b[0].toFixed(1)); o.tx.setAttribute('y', b[1].toFixed(1));
    });
  };

  Scene.prototype.tick = function (dt) {
    var s = this, T = s.spec.tempo[s.mode], tot = T[0] + T[1] + T[2] + T[3], t, ph, p, f;
    s.t = (s.t + dt) % tot; t = s.t;
    if (t < T[0]) { ph = 'up'; f = t / T[0]; p = ease(f); }
    else if ((t -= T[0]) < T[1]) { ph = 'hold'; f = t / T[1]; p = 1; }
    else if ((t -= T[1]) < T[2]) { ph = 'down'; f = t / T[2]; p = 1 - ease(f); }
    else { t -= T[2]; ph = 'rest'; f = T[3] ? t / T[3] : 1; p = 0; }
    s.draw(p, ph);
    if (ph !== s.ph) { s.ph = ph; s.onCue(ph, s.mode); }
    s.onProg(ph, f);
  };
  Scene.prototype.setMode = function (m) { this.mode = m; this.t = 0; this.ph = null; this.tick(0); };
  Scene.prototype.play = function () {
    var s = this;
    if (s.raf) return;
    s.on = true;
    var last = performance.now();
    function loop(now) {
      var dt = Math.min(.05, (now - last) / 1000); last = now;
      s.tick(dt);
      s.raf = requestAnimationFrame(loop);
    }
    s.raf = requestAnimationFrame(loop);
  };
  Scene.prototype.pause = function () { this.on = false; if (this.raf) cancelAnimationFrame(this.raf); this.raf = 0; };
  Scene.prototype.focusPin = function (n) {
    this.pins.forEach(function (o) {
      var on = String(o.pn.n) === String(n);
      o.g.classList.toggle('is-on', on);
    });
  };

  // mirna slika za popis sprava
  function still(host, spec, p, ratio) {
    var s = new Scene(host, spec, {});
    s.svg.classList.add('still');
    s.draw(p == null ? .55 : p, 'hold');
    // izrez oko osobe da se na maloj sličici vidi pokret
    try {
      var bb = null;
      ['far', 'torso', 'leg', 'arm', 'mid'].forEach(function (k) {
        var b = s.L[k].getBBox();
        if (!b.width) return;
        if (!bb) bb = { x0: b.x, y0: b.y, x1: b.x + b.width, y1: b.y + b.height };
        else { bb.x0 = Math.min(bb.x0, b.x); bb.y0 = Math.min(bb.y0, b.y); bb.x1 = Math.max(bb.x1, b.x + b.width); bb.y1 = Math.max(bb.y1, b.y + b.height); }
      });
      if (bb) {
        var r = ratio || 1.25, pad = 14, w = bb.x1 - bb.x0 + pad * 2, h = bb.y1 - bb.y0 + pad * 2, cx = (bb.x0 + bb.x1) / 2, cy = (bb.y0 + bb.y1) / 2;
        if (w / h > r) h = w / r; else w = h * r;
        s.svg.setAttribute('viewBox', [cx - w / 2, cy - h / 2, w, h].map(function (v) { return v.toFixed(1); }).join(' '));
      }
    } catch (e) {}
    return s;
  }

  // točka uz trup ili ud: along po smjeru kuta, side okomito (pozitivno = prema prsima)
  function pt(p, a, along, side) { var d = dir(a); return [p[0] + d[0] * along - d[1] * side, p[1] + d[1] * along + d[0] * side]; }
  window.BGRig = { Scene: Scene, still: still, stack: stack, el: el, line: line, circ: circ, mix: mix, mixP: mixP, at: at, dir: dir, pt: pt, ease: ease, B: B, RAD: RAD };
})();
