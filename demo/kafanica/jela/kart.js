
(function () {
  const f = n => Math.round(n * 10) / 10;
  const P = (x, y) => f(x) + ' ' + f(y);
  function rng(seed) { let s = (seed >>> 0) || 1; return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const hash = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  function shade(hex, a) {
    const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const t = a < 0 ? 0 : 255, p = Math.abs(a);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function smooth(pts) { // zatvorena Catmull-Rom kriva
    const n = pts.length; let d = 'M' + P(pts[0][0], pts[0][1]);
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += 'C' + P(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6) + ' ' + P(p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6) + ' ' + P(p2[0], p2[1]);
    }
    return d + 'Z';
  }
  function curve(pts, move = true) { // otvorena kriva
    let d = move ? 'M' + P(pts[0][0], pts[0][1]) : 'L' + P(pts[0][0], pts[0][1]);
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      d += 'C' + P(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6) + ' ' + P(p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6) + ' ' + P(p2[0], p2[1]);
    }
    return d;
  }
  function blob(cx, cy, rx, ry, amp, n, R, rot = 0) {
    const pts = [], c = Math.cos(rot), s = Math.sin(rot);
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, k = 1 + amp * (R() * 2 - 1); const x = Math.cos(a) * rx * k, y = Math.sin(a) * ry * k; pts.push([cx + x * c - y * s, cy + x * s + y * c]); }
    return smooth(pts);
  }
  function band(pts, w0, w1 = w0) { // traka zadate širine duž krive
    const A = [], B = [];
    pts.forEach((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      let dx = b[0] - a[0], dy = b[1] - a[1]; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
      const w = (w0 + (w1 - w0) * i / Math.max(1, pts.length - 1)) / 2;
      A.push([p[0] - dy * w, p[1] + dx * w]); B.push([p[0] + dy * w, p[1] - dx * w]);
    });
    return curve(A) + curve(B.reverse(), false) + 'Z';
  }
  const wave = (x0, y0, x1, y1, n, amp, ph) => { const pts = []; for (let i = 0; i <= n; i++) { const t = i / n; pts.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t + Math.sin(t * Math.PI * 2 * 1.5 + ph) * amp]); } return pts; };
  const inEll = (R, cx, cy, rx, ry) => { const a = R() * Math.PI * 2, r = Math.sqrt(R()); return [cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]; };
  const sh = (d, fill, extra = '') => `<path d="${d}" fill="${fill}"${extra}/><path d="${d}" fill="url(#k-sh)"/>`;
  const circ = (cx, cy, r, fill, extra = '') => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${fill}"${extra}/>`;
  const ell = (cx, cy, rx, ry, fill, extra = '') => `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}"${extra}/>`;
  const dots = (R, n, cx, cy, rx, ry, cols, r0, r1, op = 1) => { let s = ''; for (let i = 0; i < n; i++) { const [x, y] = inEll(R, cx, cy, rx, ry); s += circ(x, y, r0 + R() * (r1 - r0), cols[Math.floor(R() * cols.length)], op < 1 ? ` opacity="${op}"` : ''); } return s; };
  const gloss = (x, y, rx, ry, rot = -30, op = 1) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" transform="rotate(${rot} ${f(x)} ${f(y)})" fill="url(#k-gl)"${op < 1 ? ` opacity="${op}"` : ''}/>`;
  const strands = (R, n, cx, cy, rx, ry, cols, w0, w1, len = 10, curl = 4) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const [x, y] = inEll(R, cx, cy, rx, ry), a = R() * Math.PI * 2, L = len * (.6 + R() * .8), c = (R() - .5) * curl * 2;
      const x1 = x + Math.cos(a) * L, y1 = y + Math.sin(a) * L, mx = (x + x1) / 2 - Math.sin(a) * c, my = (y + y1) / 2 + Math.cos(a) * c;
      s += `<path d="M${P(x, y)}Q${P(mx, my)} ${P(x1, y1)}" stroke="${cols[Math.floor(R() * cols.length)]}" stroke-width="${f(w0 + R() * (w1 - w0))}" fill="none" stroke-linecap="round"/>`;
    }
    return s;
  };
  // tetiva elipse za liniju y = k·x + b (lokalne koordinate) — za tragove roštilja
  function chord(rx, ry, k, b, inset = .12) {
    const A = 1 / (rx * rx) + k * k / (ry * ry), B = 2 * k * b / (ry * ry), C = b * b / (ry * ry) - 1, D = B * B - 4 * A * C;
    if (D <= 0) return null; const s = Math.sqrt(D), x0 = (-B - s) / (2 * A), x1 = (-B + s) / (2 * A), dx = (x1 - x0) * inset;
    return [x0 + dx, k * (x0 + dx) + b, x1 - dx, k * (x1 - dx) + b];
  }
  const grill = (cx, cy, rx, ry, rot, col = '#7c4316', w = 3.4, gap = 9, op = .8) => {
    let s = `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${rot})" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${op}">`;
    for (let b = -ry * 2; b <= ry * 2; b += gap) { const c = chord(rx, ry, .9, b, .14); if (c) s += `<path d="M${P(c[0], c[1])}L${P(c[2], c[3])}"/>`; }
    return s + '</g>';
  };

  /* ========================= SASTOJCI ODOZGO (120×120) ========================= */
  const T = {};
  // ---------- sosevi u crnoj posudici ----------
  function ramekin(col, R, tex = '', o = {}) {
    const r = o.r || 38, cx = o.x || 60, cy = o.y || 60, dk = shade(col, -.22);
    let s = circ(cx, cy + 2, r + 1, '#000', ' opacity=".35"') + circ(cx, cy, r, '#1b1816') + circ(cx, cy, r, 'url(#k-sh)') +
      circ(cx, cy, r - 4, '#2e2926', ' stroke="#4c4540" stroke-width="1.4"') + circ(cx, cy + 1, r - 7, dk) + circ(cx, cy, r - 8, col);
    s += tex;
    s += gloss(cx - r * .3, cy - r * .32, r * .34, r * .16, -32, .9);
    return s;
  }
  const SAUCE = {
    ketchup: ['#bf2516'], bbq: ['#5b2410', 'chunk'], sweet_chili: ['#dc4426', 'flake'], curry: ['#e5ad27'], chipotle: ['#cf5f27', 'speck'],
    wasabi: ['#b9cd78'], white_sauce: ['#f0ebdf', 'herb'], burger_sauce: ['#eea271', 'speck'], caesar: ['#eee3c2', 'speck'], mustard: ['#dfae18'],
    horseradish: ['#f2eee1', 'fiber'], mush_sauce: ['#c4a173', 'mush'], truffle: ['#d6c094', 'truff'], gorg_sauce: ['#eee7d4', 'blue'],
    cheese_sauce: ['#f0ae35'], pelat: ['#bd2f1d', 'chunk'], ajvar: ['#b8341a', 'chunk'], dressing: ['#e2cf7c', 'oil'], mayo: ['#f4ecc9'],
    kajmak: ['#f6eed6', 'swirl'], cream: ['#f8f5ec', 'swirl'], custard: ['#f2cf74', 'swirl'], caramel: ['#bf6f1f', 'swirl'], choc_top: ['#3b1c0f', 'swirl'],
    nutella: ['#4a2513', 'swirl'], strawberry_sauce: ['#c11d34'], fruit_top: ['#c4213a'], cherry_top: ['#7a0f20', 'cherry'], forest_top: ['#56142f', 'berry'],
    fruit_fill: ['#a3152c', 'berry'], vanilla_cream: ['#f5e2a2', 'swirl'], choc_cream: ['#6b391d', 'swirl'], mascarpone_cream: ['#fbf6ea', 'swirl'],
  };
  function sauceTex(kind, col, R) {
    const lt = shade(col, .3), dk = shade(col, -.3);
    switch (kind) {
      case 'chunk': return dots(R, 26, 60, 60, 20, 20, [dk, lt, shade(col, -.15)], .8, 2.2, .85);
      case 'flake': return dots(R, 30, 60, 60, 21, 21, ['#f6c13b', '#8f1a0c', '#ffd977'], .6, 1.5);
      case 'speck': return dots(R, 22, 60, 60, 21, 21, [dk, '#7a2f12'], .4, 1.1, .7);
      case 'herb': return dots(R, 18, 60, 60, 21, 21, ['#6f9a3c', '#4c7a2a'], .5, 1.2, .9);
      case 'fiber': return strands(R, 26, 60, 60, 19, 19, ['#ddd6c2', '#fffdf6'], .5, 1, 5, 2);
      case 'mush': return Array.from({ length: 7 }, () => { const [x, y] = inEll(R, 60, 60, 17, 17); return ell(x, y, 3.4, 2.4, '#7a5636', ` transform="rotate(${f(R() * 180)} ${f(x)} ${f(y)})"`); }).join('');
      case 'truff': return dots(R, 30, 60, 60, 21, 21, ['#3a2a1a', '#5a4630'], .4, 1, .9);
      case 'blue': return dots(R, 16, 60, 60, 20, 20, ['#6f8c80', '#93ab9f'], .6, 1.8, .9);
      case 'oil': return circ(60, 60, 18, shade(col, .15), ' opacity=".7"') + dots(R, 6, 60, 60, 14, 14, ['#8a9a3a'], .7, 1.4, .8);
      case 'swirl': return `<path d="M60 60 m-14 0 a14 14 0 1 1 14 14 a9 9 0 1 1 -9 -9 a5 5 0 1 1 5 5" stroke="${shade(col, kind === 'swirl' && /#f/.test(col) ? -.08 : .18)}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>`;
      case 'cherry': return [[52, 54], [67, 57], [58, 68]].map(([x, y]) => circ(x, y, 6.5, '#8e0f22') + circ(x, y, 6.5, 'url(#k-sh)') + circ(x - 2, y - 2.4, 1.6, '#ffb2b8', ' opacity=".8"')).join('');
      case 'berry': return [[51, 55, '#3c2c6a'], [66, 53, '#b5163a'], [61, 67, '#3c2c6a'], [70, 65, '#b5163a']].map(([x, y, c]) => circ(x, y, 5, c) + circ(x, y, 5, 'url(#k-sh)')).join('');
    }
    return '';
  }
  for (const [k, [col, tex]] of Object.entries(SAUCE)) T[k] = R => ramekin(col, R, sauceTex(tex, col, R));

  // ---------- jaja ----------
  function friedEgg(cx, cy, r, R) {
    const yx = cx + (R() - .5) * r * .3, yy = cy + (R() - .5) * r * .3;
    return `<path d="${blob(cx, cy, r, r * .88, .15, 9, R, R() * 6)}" fill="#e4c793"/><path d="${blob(cx, cy, r * .93, r * .82, .1, 9, R, R() * 6)}" fill="#fdfaf3"/>` +
      circ(yx, yy + 1.2, r * .44, '#f1e0bb') + circ(yx, yy, r * .37, '#f29912') + circ(yx, yy, r * .37, 'url(#k-sh)') + ell(yx - r * .12, yy - r * .13, r * .13, r * .08, '#fff3c4', ' opacity=".9"');
  }
  T.egg_fried = R => friedEgg(37, 44, 25, R) + friedEgg(82, 48, 24, R) + friedEgg(58, 84, 25, R);
  T.egg = R => `<g transform="rotate(-18 44 60)">${sh(`M44 30C58 30 66 50 66 64C66 80 56 90 44 90C32 90 22 80 22 64C22 50 30 30 44 30Z`, '#efd8b4')}</g>` +
    ell(83, 76, 18, 15, '#f8eedc') + circ(83, 74, 11, '#f4a114') + circ(83, 74, 11, 'url(#k-sh)') + ell(80, 70, 3.5, 2.2, '#fff1bf');

  // ---------- meso ----------
  T.bacon = R => [[16, 34, -7], [14, 60, 3], [18, 86, -3]].map(([x, y, a]) => {
    const ph = R() * 6, pts = wave(x, y, x + 88, y + (R() - .5) * 6, 10, 3.2, ph);
    const fat = pts.map(([px, py], i) => [px, py + 1.8 + Math.sin(i * 1.3 + ph) * .8]);
    return `<g transform="rotate(${a} 60 ${y})"><path d="${band(pts, 17)}" fill="#7a2715"/><path d="${band(pts, 15)}" fill="#ad442a"/><path d="${band(fat, 4.2, 3)}" fill="#f2cba7" opacity=".95"/>` +
      `<path d="${band(pts.map(([px, py]) => [px, py - 4.5]), 2.2)}" fill="#d9775a" opacity=".7"/></g>`;
  }).join('');
  T.ham = R => [[44, 50, 30, 0], [76, 72, 28, 1]].map(([x, y, r, fold]) => `<path d="${blob(x, y, r, r * .94, .05, 10, R)}" fill="#f6cdc5"/>` +
    `<path d="${blob(x, y, r - 3.2, (r - 3.2) * .94, .05, 10, R)}" fill="#eb9d97"/>` + dots(R, 5, x, y, r * .6, r * .6, ['#f4b9b2'], 2, 4, .7) +
    (fold ? `<path d="M${P(x - r * .95, y + 4)}A${f(r)} ${f(r * .5)} 0 0 0 ${P(x + r * .95, y + 4)}Z" fill="#d9837d" opacity=".55"/>` : '') + `<path d="${blob(x, y, r, r * .94, .05, 10, R)}" fill="url(#k-sh)" opacity=".7"/>`).join('');
  T.pecenica = R => [[40, 44, -20], [78, 56, 15], [52, 82, 5]].map(([x, y, a]) => { const d = blob(x, y, 25, 16, .06, 10, R, a / 57.3); return `<path d="${d}" fill="#6f3322"/><path d="${blob(x, y, 21.5, 12.8, .06, 10, R, a / 57.3)}" fill="#c98070"/>` +
    dots(R, 6, x, y, 14, 8, ['#e0a294', '#ac5c4b'], 1, 2.4, .8) + `<path d="${d}" fill="url(#k-sh)" opacity=".6"/>`; }).join('');
  T.prosciutto = R => [[18, 40, 100, 34, 0], [16, 64, 102, 70, 1], [22, 88, 96, 86, 2]].map(([x0, y0, x1, y1, i]) => {
    const pts = wave(x0, y0, x1, y1, 8, 6, i * 2.1 + R());
    const fat = pts.map(([x, y]) => [x, y - 6.5]);
    return `<path d="${band(fat, 5, 3)}" fill="#f6e2da"/><path d="${band(pts, 15, 11)}" fill="#cf5d67"/>` + `<path d="${band(pts.map(([x, y]) => [x, y + 2]), 4, 2)}" fill="#a83e4a" opacity=".55"/>` +
      `<path d="${band(pts.map(([x, y]) => [x, y - 2.5]), 2.4, 1.2)}" fill="#ee9aa0" opacity=".8"/>`;
  }).join('');
  T.kulen = R => [[38, 44], [80, 48], [58, 82]].map(([x, y]) => circ(x, y, 21, '#5c1910') + circ(x, y, 19, '#ab2419') + dots(R, 16, x, y, 15, 15, ['#f2d3bd', '#f7e3d2'], .9, 2.2) +
    dots(R, 10, x, y, 15, 15, ['#6e130b'], .8, 1.6) + circ(x, y, 19, 'url(#k-sh)')).join('');
  T.pancetta = R => [[34, 40], [60, 34], [86, 42], [40, 66], [68, 62], [50, 88], [80, 84]].map(([x, y]) => { const a = (R() - .5) * 40; return `<g transform="rotate(${f(a)} ${x} ${y})">` +
    `<rect x="${x - 9}" y="${y - 7}" width="18" height="16" rx="3" fill="#b8605a"/><rect x="${x - 10}" y="${y - 9}" width="18" height="16" rx="3" fill="#e99089"/>` +
    `<rect x="${x - 10}" y="${y - 4}" width="18" height="3" fill="#f8e5dc"/><rect x="${x - 10}" y="${y + 2.5}" width="18" height="2.2" fill="#f8e5dc" opacity=".8"/></g>`; }).join('');
  T.cvarci = R => `<path d="${blob(60, 64, 40, 29, .16, 11, R)}" fill="#a87538"/>` + strands(R, 120, 60, 62, 36, 25, ['#e4c287', '#c9974f', '#8f5b25', '#f2dcab'], .8, 1.8, 9, 5) +
    `<path d="${blob(60, 64, 40, 29, .16, 11, rng(7))}" fill="url(#k-sh)" opacity=".5"/>`;
  function sausagePath(pts, w, R, cheese = false) {
    const d = curve(pts); let s = `<path d="${d}" stroke="#5e2410" stroke-width="${w + 2}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#923a1f" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
    s += `<path d="${curve(pts.map(([x, y]) => [x - 1, y - w * .22]))}" stroke="#c46a43" stroke-width="${f(w * .3)}" fill="none" stroke-linecap="round" opacity=".85"/>`;
    for (let i = 1; i < pts.length - 1; i++) { const [x, y] = pts[i]; s += `<path d="M${P(x - 3, y - w * .42)}L${P(x + 3, y + w * .42)}" stroke="#3a1206" stroke-width="2.6" stroke-linecap="round" opacity=".75"/>`; }
    if (cheese) for (let i = 0; i < pts.length; i += 1) { const [x, y] = pts[i]; s += ell(x + (R() - .5) * 4, y + (R() - .5) * 4, 2.6, 1.6, '#f4c64e'); }
    return s;
  }
  T.sausage = R => sausagePath([[22, 50], [44, 40], [70, 40], [98, 52]], 15, R) + sausagePath([[20, 80], [46, 72], [74, 74], [100, 86]], 15, R);
  T.sausage_cheese = R => { const pts = []; for (let i = 0; i <= 22; i++) { const t = i / 22, a = t * Math.PI * 2.6 + .4, r = 9 + t * 27; pts.push([60 + Math.cos(a) * r, 60 + Math.sin(a) * r * .9]); } return sausagePath(pts, 13, R, true); };
  T.cevapi = R => `<g transform="rotate(-28 60 60)">` + [[30, 0], [44, 1], [58, 2], [72, 3], [86, 4]].map(([y, i]) => { const x = 60 + (i - 2) * 2, a = -4 + i * 2; return `<g transform="rotate(${a} ${x} ${y + 4})">` +
    `<rect x="${x - 21}" y="${y - 3}" width="42" height="14" rx="7" fill="#3f1c0b"/><rect x="${x - 21}" y="${y - 5}" width="42" height="13" rx="6.5" fill="#734022"/>` +
    `<rect x="${x - 17}" y="${y - 3.4}" width="32" height="3.6" rx="1.8" fill="#9c6340" opacity=".8"/>` +
    [-9, 2, 12].map(o => `<path d="M${x + o} ${y - 4}l-3 11" stroke="#2c1206" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>`).join('') + `</g>`; }).join('') + `</g>`;
  T.pork = R => [[40, 46], [80, 50], [60, 84]].map(([x, y]) => circ(x, y + 2, 20, '#3a1a0a') + circ(x, y, 20, '#6d3519') + circ(x, y, 15.5, '#a0603a') + circ(x, y, 10, '#b77a50', ' opacity=".6"') +
    grill(x, y, 15, 15, 20, '#4a200b', 2.6, 7, .7) + circ(x, y, 20, 'url(#k-sh)') + dots(R, 4, x, y, 12, 12, ['#5f8a32'], .8, 1.4)).join('');
  T.knuckle = R => `<g transform="rotate(-30 92 34)"><rect x="80" y="27" width="34" height="13" rx="6.5" fill="#e9ddc4"/><circle cx="114" cy="33.5" r="9" fill="#f4ecd8"/><circle cx="114" cy="33.5" r="9" fill="url(#k-sh)"/></g>` +
    `<path d="${blob(56, 66, 42, 34, .1, 10, R, .3)}" fill="#4a210c"/><path d="${blob(55, 63, 38, 30, .1, 10, R, .3)}" fill="#7a3b1a"/><path d="${blob(52, 58, 24, 18, .2, 8, R, .3)}" fill="#a2582a" opacity=".85"/>` +
    dots(R, 40, 55, 63, 34, 26, ['#3a1806', '#c27a3e', '#5a2a10'], .6, 1.8, .8) + gloss(42, 50, 16, 7, -25) + `<path d="${blob(55, 63, 38, 30, .1, 10, rng(3), .3)}" fill="url(#k-sh)" opacity=".7"/>`;
  T.zander = R => { const d = 'M12 76C26 46 70 30 108 42C104 62 70 88 12 76Z'; return `<path d="${d}" fill="#9aa2a6" transform="translate(0 3)"/><path d="${d}" fill="#f2e5cb"/>` +
    `<path d="M20 72C40 54 72 44 102 45" stroke="#d99b3e" stroke-width="7" fill="none" stroke-linecap="round" opacity=".55"/><path d="M28 74C48 62 72 56 96 52" stroke="#e5b25a" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/>` +
    [36, 52, 68, 84].map(x => `<path d="M${x} ${f(70 - (x - 30) * .42)}q4 6 2 12" stroke="#d8c3a0" stroke-width="1.6" fill="none"/>`).join('') + dots(R, 10, 62, 56, 30, 10, ['#5d8a2c', '#3f6e20'], .7, 1.3) + `<path d="${d}" fill="url(#k-sh)" opacity=".6"/>`; };
  T.tuna = R => Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2 + R(), r = i ? 22 + R() * 6 : 0, x = 60 + Math.cos(a) * r, y = 60 + Math.sin(a) * r * .8, d = blob(x, y, 12 + R() * 4, 9 + R() * 3, .2, 8, R, R() * 3);
    return `<path d="${d}" fill="#d6b49a"/><path d="M${P(x - 7, y - 2)}q7 3 13 -1M${P(x - 5, y + 3)}q6 2 11 0" stroke="#b28c72" stroke-width="1.3" fill="none"/><path d="${d}" fill="url(#k-sh)" opacity=".6"/>`; }).join('');
  T.chicken = R => `<path d="${blob(60, 62, 44, 27, .07, 10, R, -.35)}" fill="#a96a2c"/><path d="${blob(60, 60, 42, 25, .07, 10, R, -.35)}" fill="#e3ad6b"/>` + grill(60, 60, 40, 23, -20, '#7c4316', 3.6, 10, .8) +
    gloss(44, 48, 14, 6, -25, .8) + dots(R, 8, 60, 60, 30, 14, ['#5d8a2c'], .7, 1.2);
  T.chicken_panko = R => [[60, 34, -.1], [56, 60, .12], [62, 86, -.05]].map(([x, y, a]) => { const d = blob(x, y, 40, 11, .16, 10, R, a);
    return `<path d="${d}" fill="#a9621c" transform="translate(0 2)"/><path d="${d}" fill="#d98f2f"/>` + dots(R, 34, x, y, 34, 7, ['#f3c66d', '#efb44f', '#ad661c'], .7, 1.5) + `<path d="${d}" fill="url(#k-sh)" opacity=".55"/>`; }).join('');
  T.chicken_roll = R => [[38, 46], [80, 48], [58, 84]].map(([x, y]) => circ(x, y, 19, '#8e3a32') + circ(x, y, 18, '#bb5a50') + strands(R, 5, x, y, 15, 15, ['#f2d3c6'], 1, 1.6, 7, 2) +
    circ(x, y, 13.5, '#f0e0c3') + `<path d="M${x} ${y}m-1.5 0a1.5 1.5 0 0 1 3 0a4 4 0 0 1 -6.5 2a7 7 0 0 1 10 -5a10 10 0 0 1 -6 13" stroke="#e48d88" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
    circ(x, y, 3, '#f2cc58') + circ(x, y, 19, 'url(#k-sh)', ' opacity=".6"')).join('');
  T.patty = R => circ(60, 62, 40, '#2d1408') + circ(60, 60, 38, '#5a2c14') + dots(R, 60, 60, 60, 33, 33, ['#7a4421', '#3c1b0b', '#8d5430'], .8, 2.4, .8) + grill(60, 60, 36, 36, -15, '#22100a', 4, 11, .6) + circ(60, 60, 38, 'url(#k-sh)');
  T.ustipak = R => [[40, 46], [80, 50], [60, 84]].map(([x, y]) => circ(x, y + 2, 19, '#3a1a0a') + circ(x, y, 19, '#844725') + dots(R, 22, x, y, 15, 15, ['#a8683f', '#5e2e16', '#c4824f'], .7, 1.8) +
    dots(R, 4, x, y, 12, 12, ['#d33a1f', '#5a8a2c'], .8, 1.4) + circ(x, y, 19, 'url(#k-sh)')).join('');

  // ---------- sirevi i mlečno ----------
  T.feta = R => `<path d="M60 30 93 46 60 62 27 46Z" fill="#fdfcf7"/><path d="M27 46 60 62 60 92 27 76Z" fill="#ebe7dc"/><path d="M60 62 93 46 93 76 60 92Z" fill="#dad3c4"/>` +
    dots(R, 18, 60, 46, 20, 9, ['#e4dfd2'], .5, 1.3) + dots(R, 12, 44, 72, 10, 10, ['#d3ccbb'], .5, 1.2) + [[22, 90], [98, 84], [86, 96], [34, 98]].map(([x, y]) => `<path d="${blob(x, y, 5, 4, .3, 6, R)}" fill="#f4f1e8"/>`).join('');
  T.mozz = R => circ(46, 64, 25, '#fbf8ef') + circ(46, 64, 25, 'url(#k-sh)') + gloss(39, 55, 9, 5) + circ(82, 50, 19, '#faf6ec') + circ(82, 50, 19, 'url(#k-sh)') + gloss(77, 43, 7, 4) +
    `<path d="M70 82q8 -4 16 2q-6 8 -16 -2Z" fill="#4f8f2c"/>`;
  T.mozz_fried = R => [[60, 36, -12], [58, 60, 6], [62, 84, -4]].map(([x, y, a], i) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 26}" y="${y - 8}" width="52" height="17" rx="8.5" fill="#a9651d"/>` +
    `<rect x="${x - 26}" y="${y - 10}" width="52" height="17" rx="8.5" fill="#dc9c3a"/>${dots(R, 26, x, y - 2, 22, 6, ['#f4c56a', '#b0701f'], .6, 1.3)}` +
    (i === 1 ? `<ellipse cx="${x + 24}" cy="${y - 1.5}" rx="5" ry="7.5" fill="#fbf3dd"/>` : '') + `</g>`).join('');
  T.cheddar = R => `<g transform="rotate(10 60 60)"><rect x="30" y="31" width="60" height="60" rx="5" fill="#c9700f"/><rect x="28" y="28" width="60" height="60" rx="5" fill="#f39a1f"/>` +
    `<path d="M28 74q8 10 6 18q8 -2 10 -14" fill="#f39a1f"/><rect x="32" y="32" width="52" height="12" rx="4" fill="#ffc35a" opacity=".45"/></g>`;
  T.smoked_cheese = R => [[60, 38, -10], [56, 60, 4], [62, 82, -6]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 30}" y="${y - 11}" width="60" height="22" rx="4" fill="#b06c25"/>` +
    `<rect x="${x - 27}" y="${y - 8}" width="54" height="16" rx="3" fill="#f2dda9"/><rect x="${x - 27}" y="${y - 8}" width="54" height="5" rx="2.5" fill="#fff1c8" opacity=".6"/></g>`).join('');
  T.gouda = R => [[44, 46, -20], [76, 52, 25], [58, 82, 5]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><path d="M${x - 24} ${y + 12}L${x} ${y - 20}L${x + 24} ${y + 12}Z" fill="#f5cd5c"/>` +
    `<path d="M${x - 24} ${y + 12}L${x + 24} ${y + 12}L${x + 24} ${y + 16}L${x - 24} ${y + 16}Z" fill="#d7942c"/>` + ell(x - 6, y + 2, 2.6, 2, '#e3ad3e') + ell(x + 7, y + 6, 2, 1.6, '#e3ad3e') + ell(x, y - 7, 1.6, 1.3, '#e3ad3e') + `</g>`).join('');
  T.gorgonzola = R => `<path d="M18 74 70 30 102 66 50 92Z" fill="#f4efe1"/><path d="M18 74 50 92 50 100 18 82Z" fill="#ddd5c2"/><path d="M50 92 102 66 102 74 50 100Z" fill="#cfc6b1"/>` +
    strands(R, 16, 60, 62, 26, 18, ['#6f8c84', '#8aa59a', '#55716a'], .9, 1.8, 8, 4) + dots(R, 18, 60, 62, 28, 18, ['#7b978d'], .6, 1.4);
  T.parmesan = R => `<path d="M20 70 72 38 98 62 46 92Z" fill="#f0d894"/><path d="M20 70 46 92 46 100 20 78Z" fill="#d9bb6c"/><path d="M46 92 98 62 98 70 46 100Z" fill="#c9a14f"/>` + dots(R, 30, 60, 64, 26, 14, ['#e2c578', '#f8e7b6'], .5, 1.2) +
    [[78, 26, 20], [96, 40, -30], [26, 40, 15]].map(([x, y, a]) => `<path d="M${x - 10} ${y}q10 -9 20 0q-10 5 -20 0Z" fill="#f6e6b4" transform="rotate(${a} ${x} ${y})"/>`).join('');
  T.kackavalj = R => [[58, 40, -8], [60, 62, 5], [56, 84, -4]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 30}" y="${y - 10}" width="60" height="20" rx="3" fill="#d8ae48"/>` +
    `<rect x="${x - 28}" y="${y - 8}" width="56" height="16" rx="2" fill="#f4de8e"/></g>`).join('');
  T.veg_cheese = R => `<path d="${blob(60, 64, 38, 28, .15, 10, R)}" fill="#e8d895"/>` + strands(R, 90, 60, 62, 34, 24, ['#f6ecbd', '#ecdb9a', '#fff7d6'], 1.2, 2.2, 9, 4);
  T.yogurt = R => circ(60, 62, 44, '#000', ' opacity=".35"') + circ(60, 60, 44, '#2b2622') + circ(60, 60, 44, 'url(#k-sh)') + circ(60, 60, 38, '#3a3430', ' stroke="#57504a" stroke-width="1.5"') +
    circ(60, 60, 34, '#f7f4ec') + `<path d="M40 56q20 -14 40 0M44 68q16 -9 32 0" stroke="#e6e0d2" stroke-width="2.4" fill="none" stroke-linecap="round"/>` + gloss(48, 48, 12, 6);

  // ---------- povrće i voće ----------
  T.tomato = R => [[38, 44], [82, 50], [58, 84]].map(([x, y]) => { let s = circ(x, y + 1.5, 20.5, '#8e1a10') + circ(x, y, 20, '#d9301f') + circ(x, y, 17.5, '#ec4a31') + circ(x, y, 7, '#f39079');
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2 + .3, cx = x + Math.cos(a) * 10.5, cy = y + Math.sin(a) * 10.5; s += ell(cx, cy, 5, 3.4, '#f7a283', ` transform="rotate(${f(a * 57.3)} ${f(cx)} ${f(cy)})"`) + circ(cx, cy, 1.1, '#f9d77d'); }
    return s + circ(x, y, 20, 'url(#k-sh)', ' opacity=".6"'); }).join('');
  T.cherry = R => [[40, 46, 0], [76, 42, 1], [80, 78, 0]].map(([x, y, cal]) => circ(x, y, 15, '#c3201a') + circ(x, y, 15, 'url(#k-sh)') + gloss(x - 4, y - 5, 5, 3) +
    (cal ? `<path d="M${x} ${y - 14}l-6 -4m6 4 6 -4m-6 4 -1 -7m1 7 7 1m-7 -1 -7 2" stroke="#3d7a26" stroke-width="2.4" stroke-linecap="round"/>` : '')).join('') +
    circ(44, 84, 15, '#e23f2a') + circ(44, 84, 12, '#f26a4e') + circ(44, 84, 4.5, '#f9a789') + [0, 1, 2].map(i => { const a = i / 3 * 6.28 + .5; return ell(44 + Math.cos(a) * 7, 84 + Math.sin(a) * 7, 3.2, 2, '#fbb99a') + circ(44 + Math.cos(a) * 7, 84 + Math.sin(a) * 7, .9, '#f9d77d'); }).join('');
  function lettuce(cx, cy, rx, ry, R, c1 = '#76b836', c2 = '#b6de76', vein = '#e3f4bf') {
    const pts = []; for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2, k = 1 + .09 * Math.sin(a * 14) + .05 * (R() - .5); pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
    const d = smooth(pts);
    return `<path d="${d}" fill="${shade(c1, -.25)}" transform="translate(0 2)"/><path d="${d}" fill="${c1}"/><path d="${blob(cx, cy, rx * .62, ry * .55, .2, 9, R)}" fill="${c2}" opacity=".65"/>` +
      `<path d="M${P(cx - rx * .85, cy + ry * .1)}L${P(cx + rx * .8, cy - ry * .1)}M${P(cx - rx * .2, cy)}L${P(cx - rx * .45, cy - ry * .7)}M${P(cx + rx * .15, cy)}L${P(cx + rx * .35, cy + ry * .75)}M${P(cx + rx * .35, cy - .05 * ry)}L${P(cx + rx * .55, cy - ry * .65)}" stroke="${vein}" stroke-width="2" fill="none" opacity=".75" stroke-linecap="round"/>`;
  }
  T.lettuce = R => lettuce(60, 60, 46, 36, R);
  T.iceberg = R => [[38, 44, 26, 18], [80, 50, 24, 18], [56, 82, 28, 18]].map(([x, y, rx, ry]) => lettuce(x, y, rx, ry, R, '#a9d36a', '#e4f3bd', '#f6fbe6')).join('');
  T.rucola = R => Array.from({ length: 9 }, (_, i) => { const a = R() * Math.PI * 2, rr = Math.sqrt(R()) * 18, x = 60 + Math.cos(a) * rr, y = 62 + Math.sin(a) * rr * .8, rot = R() * Math.PI;
    const d = blob(x, y, 20, 6.5, .38, 14, R, rot); return `<path d="${d}" fill="#2f7424"/><path d="${blob(x, y, 15, 3.6, .3, 10, R, rot)}" fill="#4f9b34" opacity=".8"/><path d="M${P(x - Math.cos(rot) * 18, y - Math.sin(rot) * 18)}L${P(x + Math.cos(rot) * 16, y + Math.sin(rot) * 16)}" stroke="#8dcb5a" stroke-width="1.3" opacity=".8"/>`; }).join('');
  T.onion = R => [[42, 46, 24], [80, 54, 20], [56, 84, 21]].map(([x, y, r]) => [1, .74, .5].map(k => `<ellipse cx="${x}" cy="${y}" rx="${f(r * k)}" ry="${f(r * k * .9)}" fill="none" stroke="#7d2a6f" stroke-width="4"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="${f(r * k - 2.6)}" ry="${f((r * k - 2.6) * .9)}" fill="none" stroke="#f3e6f0" stroke-width="1.6"/>`).join('')).join('');
  T.onion_grill = R => `<path d="${blob(60, 62, 38, 28, .2, 10, R)}" fill="#7a3e12" opacity=".5"/>` + strands(R, 46, 60, 60, 34, 24, ['#a8621f', '#c98a3a', '#7a3f12', '#e0a85a'], 1.6, 2.8, 16, 7);
  T.red_cabbage = R => `<path d="${blob(60, 62, 38, 28, .2, 10, R)}" fill="#4f1748" opacity=".55"/>` + strands(R, 80, 60, 60, 34, 25, ['#6e2366', '#94418a', '#b467aa', '#e6cde3'], 1.2, 2.4, 14, 6);
  T.cabbage = R => `<path d="${blob(60, 62, 38, 28, .2, 10, R)}" fill="#a5b878" opacity=".45"/>` + strands(R, 80, 60, 60, 34, 25, ['#dfe9b8', '#c3d88a', '#f2f5dc', '#b6cc7a'], 1.3, 2.6, 14, 6);
  T.carrot = R => strands(R, 34, 60, 64, 30, 22, ['#ef8424', '#f59d40', '#e06f15'], 2.4, 3.4, 22, 3) + [[30, 34], [88, 32], [94, 86]].map(([x, y]) => circ(x, y, 9, '#e46f16') + circ(x, y, 7.5, '#f39a3d') + circ(x, y, 3.2, '#f8b765')).join('');
  T.cucumber = R => [[38, 44], [80, 46], [44, 84], [82, 84]].map(([x, y]) => circ(x, y, 17, '#2f5c1e') + circ(x, y, 15, '#cfe6a6') + circ(x, y, 8, '#bad68c') +
    [0, 1, 2, 3, 4, 5].map(i => { const a = i / 6 * 6.28; return ell(x + Math.cos(a) * 5, y + Math.sin(a) * 5, 1.6, 1, '#f1f6d8', ` transform="rotate(${f(a * 57.3)} ${f(x + Math.cos(a) * 5)} ${f(y + Math.sin(a) * 5)})"`); }).join('') + circ(x, y, 17, 'url(#k-sh)', ' opacity=".5"')).join('');
  T.pepper = R => [[26, 34, 96, 44], [20, 58, 100, 62], [24, 84, 94, 80]].map(([x0, y0, x1, y1], i) => { const pts = wave(x0, y0, x1, y1, 6, 5, i + R());
    return `<path d="${band(pts, 13, 9)}" fill="#a3170f"/><path d="${band(pts.map(([x, y]) => [x, y - 1.5]), 10, 7)}" fill="#d92b1d"/><path d="${band(pts.map(([x, y]) => [x, y - 3]), 2.6, 1.4)}" fill="#ff7a5e" opacity=".8"/>`; }).join('');
  T.feferoni = R => [[[18, 44], [50, 30], [84, 34], [104, 46]], [[16, 80], [46, 68], [78, 70], [100, 84]]].map(pts => `<path d="${band(pts, 13, 2)}" fill="#a7a12a"/><path d="${band(pts.map(([x, y]) => [x, y - 1.2]), 10, 1.5)}" fill="#cfc63e"/>` +
    `<path d="${band(pts.map(([x, y]) => [x, y - 3]), 2.4, .8)}" fill="#f2eb92" opacity=".8"/><path d="M${P(pts[0][0] + 2, pts[0][1])}q-8 -2 -10 -9" stroke="#557a24" stroke-width="3.4" fill="none" stroke-linecap="round"/>`).join('');
  T.jalapeno = R => [[38, 40], [64, 34], [88, 48], [40, 70], [66, 64], [52, 92], [82, 82]].map(([x, y]) => circ(x, y, 10.5, '#2e6e1f') + circ(x, y, 8, '#9fca6a') + circ(x, y, 3.8, '#e8f2c8') +
    [0, 1, 2].map(i => circ(x + Math.cos(i * 2.1) * 2.4, y + Math.sin(i * 2.1) * 2.4, 1.1, '#fffbe0')).join('') + circ(x, y, 10.5, 'url(#k-sh)', ' opacity=".5"')).join('');
  T.pickles = R => [[38, 42], [78, 40], [58, 64], [36, 86], [80, 84]].map(([x, y]) => { const pts = []; for (let i = 0; i < 32; i++) { const a = i / 32 * 6.283, k = 1 + .07 * Math.sin(a * 16); pts.push([x + Math.cos(a) * 15 * k, y + Math.sin(a) * 14 * k]); }
    return `<path d="${smooth(pts)}" fill="#557a22"/>` + circ(x, y, 12, '#9cbf52') + circ(x, y, 6.5, '#b9d47a') + [0, 1, 2, 3].map(i => circ(x + Math.cos(i * 1.57 + .4) * 4.2, y + Math.sin(i * 1.57 + .4) * 4.2, 1.3, '#e8f0c4')).join(''); }).join('');
  T.zucchini = R => [[38, 44], [80, 46], [44, 84], [82, 82]].map(([x, y]) => circ(x, y, 17, '#2f5a20') + circ(x, y, 15, '#eef2c6') + circ(x, y, 9, '#e3eab0', ' opacity=".8"') +
    dots(R, 7, x, y, 7, 7, ['#d2dc96'], .7, 1.2) + circ(x, y, 17, 'url(#k-sh)', ' opacity=".45"')).join('');
  function mushSlice(x, y, s, a) {
    return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M-17 2C-17 -12 -8 -17 0 -17C8 -17 17 -12 17 2C17 5 12 5 6 4L5 14C5 17 -5 17 -5 14L-6 4C-12 5 -17 5 -17 2Z" fill="#8c6a48"/>` +
      `<path d="M-14 1C-14 -10 -7 -14 0 -14C7 -14 14 -10 14 1C10 2 6 2 3.5 1.6L3 12C3 14 -3 14 -3 12L-3.5 1.6C-6 2 -10 2 -14 1Z" fill="#efe4cf"/><path d="M-10 -1C-6 -9 6 -9 10 -1" stroke="#d6c4a6" stroke-width="1.2" fill="none"/></g>`;
  }
  T.mushroom = R => mushSlice(40, 44, 1.05, -15) + mushSlice(80, 44, 1, 20) + mushSlice(44, 82, 1, 10) + mushSlice(82, 82, 1.05, -25);
  T.olives = R => [[38, 40], [70, 34], [92, 58], [54, 64], [34, 86], [74, 88]].map(([x, y]) => { const a = R() * 180; return `<g transform="rotate(${f(a)} ${x} ${y})">${ell(x, y, 12.5, 10, '#3b3331', ' stroke="#776a63" stroke-width="1.3"')}${ell(x, y, 12.5, 10, 'url(#k-sh)')}` +
    `${ell(x - 4, y - 4, 4.2, 2.2, '#b9aca4', ' opacity=".85"')}<ellipse cx="${x + 1.5}" cy="${y + .5}" rx="3.4" ry="2.8" fill="#161110" stroke="#5d524c" stroke-width="1"/></g>`; }).join('');
  T.corn = R => `<path d="${blob(60, 64, 34, 24, .15, 9, R)}" fill="#c99412" opacity=".5"/>` + Array.from({ length: 46 }, () => { const [x, y] = inEll(R, 60, 62, 32, 22); const a = R() * 90;
    return `<rect x="${f(x - 3.6)}" y="${f(y - 3.4)}" width="7.2" height="6.8" rx="2.4" fill="#f4c62e" transform="rotate(${f(a)} ${f(x)} ${f(y)})"/><rect x="${f(x - 2.4)}" y="${f(y - 2.6)}" width="3.6" height="2.4" rx="1.2" fill="#fde98f" transform="rotate(${f(a)} ${f(x)} ${f(y)})"/>`; }).join('');
  T.lemon = R => `<g transform="rotate(-20 60 66)"><path d="M18 62A42 42 0 0 0 102 62Z" fill="#e8c21c"/><path d="M22 62A38 38 0 0 0 98 62Z" fill="#fbf3cf"/><path d="M26 62A34 34 0 0 0 94 62Z" fill="#f6df5c"/>` +
    [-60, -30, 0, 30, 60].map(a => `<path d="M60 62L${P(60 + Math.sin(a / 57.3) * 33, 62 + Math.cos(a / 57.3) * 33)}" stroke="#fbf0b6" stroke-width="1.6"/>`).join('') + `<path d="M18 62H102" stroke="#d9b014" stroke-width="2"/></g>`;
  T.berries = R => { let s = ''; [[42, 48], [72, 40], [60, 70], [86, 66], [36, 78]].forEach(([x, y]) => { s += circ(x, y, 10, '#b51d3e') + dots(R, 9, x, y, 7, 7, ['#d8395a', '#8e1230'], 2, 3) + circ(x, y, 10, 'url(#k-sh)', ' opacity=".5"'); });
    [[58, 44], [84, 88], [48, 94], [92, 44]].forEach(([x, y]) => { s += circ(x, y, 7, '#34336d') + circ(x, y, 7, 'url(#k-sh)') + circ(x, y - 2.8, 1.8, '#1d1c40'); });
    [[26, 60], [70, 92], [100, 76]].forEach(([x, y]) => { s += circ(x, y, 5, '#c0132b') + gloss(x - 1.5, y - 1.5, 2, 1.2); }); return s; };
  T.strawberry = R => [[46, 58, -15], [80, 64, 20]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><path d="M${x} ${y + 26}C${x - 26} ${y + 6} ${x - 22} ${y - 18} ${x} ${y - 16}C${x + 22} ${y - 18} ${x + 26} ${y + 6} ${x} ${y + 26}Z" fill="#d81f34"/>` +
    `<path d="M${x} ${y + 26}C${x - 26} ${y + 6} ${x - 22} ${y - 18} ${x} ${y - 16}C${x + 22} ${y - 18} ${x + 26} ${y + 6} ${x} ${y + 26}Z" fill="url(#k-sh)"/>` + dots(R, 16, x, y + 4, 13, 14, ['#f8df8a'], .7, 1.1) +
    `<path d="M${x} ${y - 14}l-10 -6m10 6 10 -6m-10 6 -3 -10m3 10 4 -10" stroke="#3b8a2a" stroke-width="4" stroke-linecap="round"/></g>`).join('');
  T.veg_grill = R => grilledSlice(36, 40, '#2f5a20', '#eef2c6') + grilledSlice(84, 48, '#4a2140', '#e2d3b2') + grilledSlice(48, 86, '#2f5a20', '#eef2c6') +
    `<g transform="rotate(-20 82 84)"><path d="${band([[62, 84], [82, 80], [104, 86]], 12, 9)}" fill="#d22a1c"/>${grill(82, 83, 18, 5, 0, '#4a120a', 2.4, 6, .7)}</g>` +
    `<g transform="rotate(25 60 60)"><path d="${band([[44, 62], [60, 58], [78, 62]], 11, 8)}" fill="#e9b623"/>${grill(60, 60, 14, 4, 0, '#6a4a0a', 2.2, 6, .7)}</g>`;
  function grilledSlice(x, y, rim, flesh) { return circ(x, y, 17, rim) + circ(x, y, 15, flesh) + grill(x, y, 14, 14, -30, '#5a3a1a', 2.6, 7, .75) + circ(x, y, 17, 'url(#k-sh)', ' opacity=".4"'); }

  // ---------- testo i prilozi ----------
  const tri = (x, y, a, crust, crumb, R, spots) => `<g transform="rotate(${a} ${x} ${y})"><path d="M${x - 32} ${y + 28}L${x - 32} ${y - 30}Q${x - 32} ${y - 34} ${x - 28} ${y - 30}L${x + 30} ${y + 26}Q${x + 33} ${y + 30} ${x + 28} ${y + 30}L${x - 30} ${y + 30}Q${x - 32} ${y + 30} ${x - 32} ${y + 28}Z" fill="${crust}"/>` +
    `<path d="M${x - 26} ${y + 24}L${x - 26} ${y - 18}L${x + 18} ${y + 24}Z" fill="${crumb}" stroke="${crumb}" stroke-width="4" stroke-linejoin="round"/>` + spots + `</g>`;
  T.toast = R => tri(46, 52, -6, '#b8742e', '#f3dda9', R, dots(R, 14, 34, 66, 9, 9, ['#e6c486', '#f8e9c2'], .6, 1.4)) + tri(78, 70, 174, '#b8742e', '#f3dda9', R, dots(R, 14, 66, 84, 9, 9, ['#e6c486', '#f8e9c2'], .6, 1.4));
  T.panini = R => `<g transform="rotate(-8 60 60)"><rect x="18" y="38" width="84" height="48" rx="14" fill="#9c5d22"/><rect x="18" y="34" width="84" height="48" rx="14" fill="#dca55a"/>` +
    [30, 46, 62, 78].map(x => `<path d="M${x} 38l14 40" stroke="#6f3c12" stroke-width="4.4" stroke-linecap="round" opacity=".8"/>`).join('') + dots(R, 14, 60, 50, 36, 12, ['#fff4dc'], .5, 1, .6) + `</g>`;
  T.french_toast = R => tri(46, 52, -8, '#9c5a1a', '#e2a446', R, dots(R, 12, 34, 66, 10, 10, ['#b8762a', '#f2c46a'], 1, 2.4, .8)) + tri(78, 70, 172, '#9c5a1a', '#e2a446', R, dots(R, 12, 66, 84, 10, 10, ['#b8762a', '#f2c46a'], 1, 2.4, .8));
  T.tortilla = R => `<path d="M14 66A46 46 0 0 1 106 66Z" fill="#d9b878" transform="translate(0 3)"/><path d="M14 66A46 46 0 0 1 106 66Z" fill="#f1ddb0"/>` + dots(R, 18, 60, 46, 34, 16, ['#c8955a', '#b07c42'], 1, 2.8, .65) +
    `<path d="M14 66H106" stroke="#d9b878" stroke-width="3"/>`;
  T.tortilla_fried = R => [[60, 38, -10], [58, 62, 4], [62, 86, -4]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 34}" y="${y - 7}" width="68" height="16" rx="8" fill="#9c5a1a"/>` +
    `<rect x="${x - 34}" y="${y - 9}" width="68" height="16" rx="8" fill="#d68c34"/>${dots(R, 12, x, y - 2, 28, 4, ['#eab565', '#b8711f'], .9, 2)}<ellipse cx="${x + 32}" cy="${y - 1}" rx="4" ry="7.5" fill="#f2c27a"/>` +
    `<path d="M${x + 32} ${y - 1}m0 -4a3 4 0 1 1 -2 6" stroke="#b8711f" stroke-width="1.2" fill="none"/></g>`).join('');
  T.nachos = R => Array.from({ length: 9 }, (_, i) => { const a = i / 9 * Math.PI * 2 + R(), r = i ? 18 + R() * 12 : 0, x = 60 + Math.cos(a) * r, y = 62 + Math.sin(a) * r * .85, rot = R() * 360;
    return `<g transform="rotate(${f(rot)} ${f(x)} ${f(y)})"><path d="M${P(x - 14, y + 10)}Q${P(x, y - 22)} ${P(x, y - 16)}Q${P(x, y - 22)} ${P(x + 14, y + 10)}Q${P(x, y + 13)} ${P(x - 14, y + 10)}Z" fill="#dc9a28"/>` +
      `<path d="M${P(x - 11, y + 8)}Q${P(x, y - 17)} ${P(x, y - 12)}Q${P(x, y - 17)} ${P(x + 11, y + 8)}Q${P(x, y + 10)} ${P(x - 11, y + 8)}Z" fill="#f2c03e"/>${dots(R, 4, x, y, 6, 6, ['#c4561e'], .5, .9)}</g>`; }).join('');
  T.spring_wrap = R => [[60, 38, -14], [56, 62, 6], [62, 86, -6]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 32}" y="${y - 8}" width="64" height="19" rx="9.5" fill="#b07a32"/>` +
    `<rect x="${x - 32}" y="${y - 10}" width="64" height="19" rx="9.5" fill="#e4b35c"/>` + [-18, -4, 10].map(o => `<path d="M${x + o} ${y - 9}q4 8 0 17" stroke="#c48a3a" stroke-width="1.4" fill="none"/>`).join('') + dots(R, 10, x, y - 2, 28, 5, ['#f2cf86'], .8, 1.6) + `</g>`).join('');
  T.pasta = R => { let s = `<path d="${blob(60, 62, 42, 34, .1, 10, R)}" fill="#c9a24e" opacity=".55"/>`; for (let i = 0; i < 22; i++) { const r = 8 + R() * 30, a0 = R() * 6.28, a1 = a0 + 1.4 + R() * 1.6, pts = [];
    for (let k = 0; k <= 8; k++) { const a = a0 + (a1 - a0) * k / 8, rr = r + Math.sin(k * 1.7 + i) * 3; pts.push([60 + Math.cos(a) * rr, 60 + Math.sin(a) * rr * .85]); }
    s += `<path d="${curve(pts)}" stroke="#b98d3a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="${curve(pts)}" stroke="${R() > .5 ? '#f2d68a' : '#ebca70'}" stroke-width="4.6" fill="none" stroke-linecap="round"/>`; } return s + gloss(46, 46, 14, 6, -30, .6); };
  T.rice = R => `<path d="${blob(60, 64, 40, 31, .08, 10, R)}" fill="#d9d2c0"/><path d="${blob(60, 61, 38, 29, .08, 10, R)}" fill="#f7f3ea"/>` + Array.from({ length: 70 }, () => { const [x, y] = inEll(R, 60, 61, 34, 25);
    return ell(x, y, 2.4, 1.1, R() > .5 ? '#ffffff' : '#e6dfcf', ` transform="rotate(${f(R() * 180)} ${f(x)} ${f(y)})"`); }).join('') + `<path d="${blob(60, 61, 38, 29, .08, 10, rng(5))}" fill="url(#k-sh)" opacity=".6"/>`;
  T.risotto = R => `<path d="${blob(60, 63, 42, 32, .1, 10, R)}" fill="#c8b07a"/><path d="${blob(60, 60, 40, 30, .1, 10, R)}" fill="#ecdcb2"/>` + Array.from({ length: 50 }, () => { const [x, y] = inEll(R, 60, 60, 35, 25);
    return ell(x, y, 2.3, 1.2, '#f7edd0', ` transform="rotate(${f(R() * 180)} ${f(x)} ${f(y)})"`); }).join('') + dots(R, 10, 60, 60, 30, 22, ['#8a6646'], 1.6, 3) + dots(R, 14, 60, 60, 32, 22, ['#5a8a32'], .6, 1.2) + gloss(46, 48, 14, 6, -30, .7);
  T.fries = R => { let s = ''; const L = []; for (let i = 0; i < 16; i++) L.push([60 + (R() - .5) * 34, 62 + (R() - .5) * 26, (R() - .5) * 140, 40 + R() * 16]);
    L.sort((a, b) => a[1] - b[1]).forEach(([x, y, a, h]) => { s += `<g transform="rotate(${f(a)} ${f(x)} ${f(y)})"><rect x="${f(x - 4.4)}" y="${f(y - h / 2 + 1.5)}" width="8.8" height="${f(h)}" rx="2.2" fill="#c8861f"/>` +
      `<rect x="${f(x - 4.4)}" y="${f(y - h / 2)}" width="8.8" height="${f(h)}" rx="2.2" fill="#f5c546"/><rect x="${f(x - 2.8)}" y="${f(y - h / 2 + 3)}" width="2.4" height="${f(h - 8)}" rx="1.2" fill="#fde391" opacity=".9"/>` +
      `<rect x="${f(x - 4.4)}" y="${f(y + h / 2 - 5)}" width="8.8" height="5" rx="2.2" fill="#e3a32f"/></g>`; }); return s; };
  T.potato_sp = R => Array.from({ length: 7 }, (_, i) => { const a = i / 7 * 6.28 + R() * .3, r = i ? 27 : 0, x = 60 + Math.cos(a) * r, y = 62 + Math.sin(a) * r * .78, rot = R() * 360;
    return `<g transform="rotate(${f(rot)} ${f(x)} ${f(y)})"><path d="M${P(x - 24, y + 6)}Q${P(x, y - 20)} ${P(x + 24, y + 6)}Q${P(x, y + 16)} ${P(x - 24, y + 6)}Z" fill="#9a5622"/>` +
      `<path d="M${P(x - 21, y + 4)}Q${P(x, y - 16)} ${P(x + 21, y + 4)}Q${P(x, y + 9)} ${P(x - 21, y + 4)}Z" fill="#e6a548"/><path d="M${P(x - 14, y - 2)}Q${P(x, y - 11)} ${P(x + 14, y - 2)}" stroke="#f7cf7e" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".7"/>${dots(R, 8, x, y - 1, 13, 4, ['#b8501e', '#5a7a2a'], .6, 1.1)}</g>`; }).join('');
  T.onion_rings = R => [[46, 48, 22], [78, 58, 20], [54, 82, 19]].map(([x, y, r]) => `<circle cx="${x}" cy="${y + 2}" r="${r}" fill="none" stroke="#8f5a1e" stroke-width="12"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#dc9c42" stroke-width="11"/>` +
    `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#f3c776" stroke-width="3" stroke-dasharray="2 5" opacity=".9"/>` + `<circle cx="${x}" cy="${y}" r="${r - 6.5}" fill="none" stroke="#f6ead0" stroke-width="1.4" opacity=".7"/>`).join('');
  T.croutons = R => [[36, 42], [60, 36], [86, 46], [44, 64], [72, 62], [34, 86], [60, 86], [86, 80]].map(([x, y]) => { const a = R() * 90;
    return `<g transform="rotate(${f(a)} ${x} ${y})"><rect x="${x - 7}" y="${y - 5}" width="14" height="13" rx="3" fill="#a8702c"/><rect x="${x - 7}" y="${y - 7}" width="14" height="13" rx="3" fill="#e3b45e"/>${dots(R, 3, x, y - 1, 4, 4, ['#c48a3e'], .6, 1.2)}</g>`; }).join('');
  T.lepinja = R => circ(60, 63, 44, '#7a4818') + circ(60, 60, 44, '#c88a42') + `<path d="${blob(60, 56, 34, 32, .06, 9, R)}" fill="#dda35a"/>` + gloss(46, 44, 18, 8, -25, .7) + dots(R, 26, 60, 60, 36, 36, ['#fff6e4'], .5, 1.3, .55);
  T.granola = R => `<path d="${blob(60, 64, 38, 28, .15, 10, R)}" fill="#8f6533" opacity=".5"/>` + Array.from({ length: 34 }, () => { const [x, y] = inEll(R, 60, 62, 33, 23); return `<path d="${blob(x, y, 4 + R() * 3, 3 + R() * 2, .3, 7, R, R() * 3)}" fill="${['#b88947', '#d6ac68', '#9c6c34'][Math.floor(R() * 3)]}"/>`; }).join('') +
    Array.from({ length: 16 }, () => { const [x, y] = inEll(R, 60, 62, 32, 22); return ell(x, y, 3.4, 2, '#efdcae', ` transform="rotate(${f(R() * 180)} ${f(x)} ${f(y)})"`); }).join('') + dots(R, 6, 60, 62, 28, 20, ['#4a2626'], 1.4, 2.2);
  T.bun = R => circ(60, 63, 42, '#7d3d10') + circ(60, 60, 42, '#d68b3a') + circ(60, 60, 42, 'url(#k-sh)') + Array.from({ length: 30 }, () => { const [x, y] = inEll(R, 60, 58, 32, 32); return ell(x, y, 2.6, 1.5, '#fbf1d6', ` transform="rotate(${f(R() * 180)} ${f(x)} ${f(y)})"`); }).join('');

  // ---------- slatko ----------
  T.crepe = R => `<path d="M18 92L18 30A62 62 0 0 1 80 92Z" fill="#c99a52" transform="translate(4 2) rotate(-8 50 60)"/><path d="M18 92L18 30A62 62 0 0 1 80 92Z" fill="#f0cd87" transform="rotate(-8 50 60)"/>` +
    dots(R, 22, 44, 66, 18, 18, ['#c99a52', '#b5803c'], 1, 2.8, .7);
  T.whip = R => { let s = ''; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283, x = 60 + Math.cos(a) * 18, y = 60 + Math.sin(a) * 16; s += `<path d="M60 60Q${P(x + Math.cos(a + 1.2) * 14, y + Math.sin(a + 1.2) * 14)} ${P(x + Math.cos(a) * 14, y + Math.sin(a) * 14)}Q${P(x + Math.cos(a - 1) * 10, y + Math.sin(a - 1) * 10)} 60 60Z" fill="#fffdf7" stroke="#e5ddcc" stroke-width="1.2"/>`; }
    return s + circ(60, 60, 11, '#fffefa') + `<path d="M54 58q6 -8 12 0" stroke="#e5ddcc" stroke-width="1.4" fill="none"/>`; };
  T.milk_choc = R => [[42, 46, -12], [76, 50, 14], [56, 82, -4]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 17}" y="${y - 11}" width="34" height="24" rx="3" fill="#3f1f0e"/>` +
    `<rect x="${x - 17}" y="${y - 13}" width="34" height="24" rx="3" fill="#6d3a1d"/><rect x="${x - 14}" y="${y - 10}" width="28" height="18" rx="2" fill="#7b4424"/><rect x="${x - 17}" y="${y + 9}" width="34" height="3" fill="#f6efdf"/></g>`).join('');
  T.choc_crunch = R => Array.from({ length: 16 }, () => { const [x, y] = inEll(R, 60, 62, 32, 24); return `<path d="${blob(x, y, 5 + R() * 4, 4 + R() * 3, .35, 6, R, R() * 3)}" fill="${['#5a2f17', '#7a4424', '#3b1d10'][Math.floor(R() * 3)]}"/>`; }).join('') + dots(R, 10, 60, 62, 30, 22, ['#c88a5a'], .6, 1.2, .8);
  T.biscuit_base = R => `<path d="${blob(60, 62, 42, 30, .08, 10, R)}" fill="#9c6630"/><path d="${blob(60, 59, 40, 28, .08, 10, R)}" fill="#c98a48"/>` + dots(R, 50, 60, 59, 36, 24, ['#e0a868', '#a86a30', '#f0c088'], .6, 1.8);
  T.sponge = R => `<rect x="20" y="36" width="80" height="52" rx="8" fill="#c9993e"/><rect x="20" y="32" width="80" height="52" rx="8" fill="#f0cd78"/>` + dots(R, 40, 60, 58, 36, 22, ['#dcb35a', '#fbe3a2'], .6, 1.6);
  T.plazma = R => [[42, 44, -10], [78, 50, 12], [58, 82, -3]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 19}" y="${y - 12}" width="38" height="26" rx="3" fill="#a86c2c"/>` +
    `<rect x="${x - 19}" y="${y - 14}" width="38" height="26" rx="3" fill="#dba45e"/>` + [-12, -4, 4, 12].map(dx => [-6, 2].map(dy => circ(x + dx, y + dy - 1, 1.1, '#b8803e')).join('')).join('') + `</g>`).join('');
  T.hazelnut = R => [[40, 44], [64, 38], [86, 50], [46, 70], [72, 66], [56, 90], [84, 84]].map(([x, y]) => circ(x, y + 1, 9.5, '#5a2e10') + circ(x, y, 9.5, '#a8642a') + `<path d="M${x - 7} ${y - 3}a8 6 0 0 1 14 0z" fill="#c98a4a"/>` +
    circ(x, y, 9.5, 'url(#k-sh)')).join('');
  T.almond = R => [[40, 46, -30], [70, 40, 20], [88, 66, -60], [50, 74, 40], [76, 88, 10]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><path d="M${x} ${y - 15}C${x + 10} ${y - 6} ${x + 9} ${y + 9} ${x} ${y + 13}C${x - 9} ${y + 9} ${x - 10} ${y - 6} ${x} ${y - 15}Z" fill="#b87a42"/>` +
    `<path d="M${x - 3} ${y - 8}q2 9 0 16M${x + 3} ${y - 6}q-1 8 0 14" stroke="#9a5f2e" stroke-width="1.1" fill="none"/></g>`).join('') + [[26, 70], [96, 38], [30, 30]].map(([x, y]) => ell(x, y, 8, 3.4, '#efd3a4', ` transform="rotate(${f(R() * 180)} ${x} ${y})"`)).join('');
  T.nut_crust = R => `<path d="${blob(60, 62, 42, 28, .1, 10, R)}" fill="#8f5a24"/><path d="${blob(60, 59, 40, 26, .1, 10, R)}" fill="#c98a40"/>` + dots(R, 30, 60, 59, 34, 20, ['#e8c088', '#a86a30'], 1, 2.6) + dots(R, 30, 60, 59, 36, 22, ['#f2d8a8'], .5, 1);
  T.ice_cream = R => { const d = blob(60, 56, 32, 28, .1, 12, R); return `<path d="${blob(60, 78, 34, 10, .3, 10, R)}" fill="#f1e2bd"/><path d="${d}" fill="#f6e8c6"/><path d="${d}" fill="url(#k-sh)"/>` + gloss(48, 44, 10, 5) + dots(R, 8, 60, 56, 22, 18, ['#e8d4a4'], .8, 1.8); };
  T.breading = R => `<path d="${blob(60, 64, 38, 26, .2, 10, R)}" fill="#b0701f" opacity=".5"/>` + Array.from({ length: 70 }, () => { const [x, y] = inEll(R, 60, 62, 34, 22); return `<path d="${blob(x, y, 2 + R() * 2.4, 1.6 + R() * 1.6, .4, 6, R, R() * 3)}" fill="${['#e0a548', '#c68428', '#f3c66d'][Math.floor(R() * 3)]}"/>`; }).join('');
  T.wafer = R => [[60, 44, -14], [60, 76, 8]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 36}" y="${y - 7}" width="72" height="15" rx="7.5" fill="#b37a32"/><rect x="${x - 36}" y="${y - 8}" width="72" height="14" rx="7" fill="#e6b86b"/>` +
    Array.from({ length: 9 }, (_, i) => `<path d="M${x - 32 + i * 8} ${y - 7}l5 13" stroke="#c48f44" stroke-width="1.6"/>`).join('') + `<ellipse cx="${x + 35}" cy="${y - 1}" rx="3.4" ry="6.5" fill="#f6dfb0"/></g>`).join('');
  T.cashew = R => [[40, 42, 20], [74, 38, -30], [90, 64, 60], [56, 64, 0], [36, 82, -40], [70, 88, 30]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><path d="${band([[x - 10, y - 4], [x - 4, y + 6], [x + 6, y + 6], [x + 10, y - 3]], 9, 7)}" fill="#c9995c"/>` +
    `<path d="${band([[x - 9, y - 5], [x - 4, y + 4], [x + 5, y + 4], [x + 9, y - 4]], 6, 4)}" fill="#efcf96"/></g>`).join('');
  T.honey = R => `<path d="${blob(64, 92, 26, 9, .2, 9, R)}" fill="#e08d1e" opacity=".9"/>${gloss(58, 89, 9, 3, 0)}` +
    `<path d="M24 104L70 46" stroke="#8a5a2a" stroke-width="7" stroke-linecap="round"/><path d="M24 104L70 46" stroke="#cf9a5c" stroke-width="5" stroke-linecap="round"/>` +
    `<g transform="rotate(-52 80 34)">${[-15, -7.5, 0, 7.5, 15].map((o, i) => `<ellipse cx="${80 + o}" cy="34" rx="4" ry="${[10, 13, 14, 13, 10][i]}" fill="${i % 2 ? '#a8723c' : '#d9a868'}"/>`).join('')}</g>` +
    `<path d="M86 40C92 52 84 60 82 74C80 80 76 84 74 86" stroke="#f0a32a" stroke-width="5" fill="none" stroke-linecap="round" opacity=".95"/><circle cx="73" cy="88" r="4" fill="#f2a93b"/>`;
  T.coleslaw = R => circ(60, 62, 44, '#000', ' opacity=".3"') + circ(60, 60, 44, '#ede7da') + circ(60, 60, 44, 'url(#k-sh)') + circ(60, 60, 37, '#f3eed9') +
    strands(R, 60, 60, 60, 30, 28, ['#e6edc6', '#f8f6e6', '#d4e2a0'], 1.6, 2.6, 12, 5) + strands(R, 16, 60, 60, 28, 26, ['#ef8a2a'], 1.6, 2.4, 9, 3) + strands(R, 10, 60, 60, 28, 26, ['#8e3a7a'], 1.4, 2, 9, 3);
  T.mascarpone_cream = R => { const d = blob(60, 60, 36, 30, .12, 11, R); return `<path d="${d}" fill="#f1ead8" transform="translate(0 3)"/><path d="${d}" fill="#fbf6ea"/><path d="M42 56q18 -16 36 0q-16 10 -26 2" stroke="#e8dfcb" stroke-width="2.4" fill="none" stroke-linecap="round"/>` + gloss(46, 46, 10, 5); };
  T.vanilla_cream = R => { const d = blob(60, 60, 36, 30, .12, 11, R); return `<path d="${d}" fill="#e4cc84" transform="translate(0 3)"/><path d="${d}" fill="#f5e2a2"/><path d="M42 56q18 -16 36 0q-16 10 -26 2" stroke="#e8cf82" stroke-width="2.4" fill="none" stroke-linecap="round"/>` + gloss(46, 46, 10, 5) + dots(R, 10, 60, 60, 24, 18, ['#3a2a1a'], .4, .8, .7); };
  T.choc_cream = R => { const d = blob(60, 60, 36, 30, .12, 11, R); return `<path d="${d}" fill="#4a2410" transform="translate(0 3)"/><path d="${d}" fill="#6b391d"/><path d="M42 56q18 -16 36 0q-16 10 -26 2" stroke="#8a5432" stroke-width="2.4" fill="none" stroke-linecap="round"/>` + gloss(46, 46, 10, 5); };

  // ---------- sklopljena jela (za pice i priloge) ----------
  T.pizza_base = R => circ(60, 60, 50, '#b8762e') + circ(60, 60, 44, '#f0d39c') + circ(60, 60, 50, 'url(#k-sh)', ' opacity=".5"');
  T.veg_grill_alias = T.veg_grill;

  const ALIAS = { cherry_top: 'cherry_top', fruit_fill: 'fruit_fill' };
  function top(key, seed) {
    const fn = T[ALIAS[key] || key] || T.ketchup;
    return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${fn(rng(hash(key) + (seed || 0)))}</svg>`;
  }

  /* ========================= SLOJEVI 3/4 (širina 700) ========================= */
  const seeds = (R, cx, cy, rx, ry, n) => { let s = ''; for (let i = 0; i < n; i++) { const [x, y] = inEll(R, cx, cy, rx, ry); s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="8" ry="4.6" transform="rotate(${f(R() * 140 - 70)} ${f(x)} ${f(y)})" fill="#fbf1d6" stroke="#c99a52" stroke-width="1"/>`; } return s; };
  function lettuceRing(cx, cy, rx, ry, amp, n) { let d = ''; for (let i = 0; i <= 180; i++) { const a = i / 180 * Math.PI * 2, r = 1 + amp * Math.sin(a * n) * (0.6 + 0.4 * Math.cos(a * 3)); d += (i ? 'L' : 'M') + f(cx + Math.cos(a) * rx * r) + ' ' + f(cy + Math.sin(a) * ry * r); } return d + 'Z'; }
  // ploča: gornja površina (elipsa ili zaobljeni pravougaonik) + bočna strana debljine t
  function slab(o) {
    const { t = 40, top: c, side: sc = shade(c, -.28), shape = 'round', y = 64, rx = 292, ry = 62, tex = '' } = o;
    if (shape === 'round') {
      return `<path d="M${350 - rx} ${y} L${350 - rx + 4} ${y + t} Q350 ${y + t + ry * 1.9} ${350 + rx - 4} ${y + t} L${350 + rx} ${y} Z" fill="${sc}"/>` +
        `<path d="M${350 - rx} ${y} L${350 - rx + 4} ${y + t} Q350 ${y + t + ry * 1.9} ${350 + rx - 4} ${y + t} L${350 + rx} ${y} Z" fill="url(#k-sl)"/>` +
        ell(350, y, rx, ry, c) + tex;
    }
    // „kvadratna” ploča (sendvič): gornja površina je zaobljeni trapez
    const x0 = 350 - rx, x1 = 350 + rx, yt = y - ry, yb = y + ry, ins = rx * .16, r = 22;
    const topD = `M${x0 + ins + r} ${yt}H${x1 - ins - r}Q${x1 - ins} ${yt} ${x1 - ins + 6} ${yt + 10}L${x1 - 4} ${yb - 12}Q${x1} ${yb} ${x1 - r} ${yb}H${x0 + r}Q${x0} ${yb} ${x0 + 4} ${yb - 12}L${x0 + ins - 6} ${yt + 10}Q${x0 + ins} ${yt} ${x0 + ins + r} ${yt}Z`;
    return `<path d="M${x0 + 2} ${yb - 14}V${yb - 14 + t}Q${x0 + 2} ${yb + t} ${x0 + r} ${yb + t}H${x1 - r}Q${x1 - 2} ${yb + t} ${x1 - 2} ${yb - 14 + t}V${yb - 14}Z" fill="${sc}"/>` +
      `<path d="M${x0 + 2} ${yb - 14}V${yb - 14 + t}Q${x0 + 2} ${yb + t} ${x0 + r} ${yb + t}H${x1 - r}Q${x1 - 2} ${yb + t} ${x1 - 2} ${yb - 14 + t}V${yb - 14}Z" fill="url(#k-sl)"/>` +
      `<path d="${topD}" fill="${c}"/>` + tex;
  }
  const SV3 = (h, body) => ({ h, svg: `<svg viewBox="0 0 700 ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>` });
  // [vrh, centar gornje površine, dno] u jedinicama sloja — za sklapanje (sledeći sloj leži na dnu prethodnog)
  const M3 = { bun_top: [18, 140, 262], bun_bottom: [18, 80, 178], patty: [10, 72, 162], chicken_panko: [14, 78, 168], cheese: [30, 74, 124], cheese_sq: [6, 52, 104],
    mozz_fried: [10, 64, 140], lettuce: [8, 70, 110], tomato: [16, 58, 104], pickles: [20, 48, 84], jalapeno: [24, 44, 66], onion: [8, 44, 70], onion_grill: [14, 52, 90],
    red_cabbage: [14, 52, 90], coleslaw: [8, 54, 96], bacon: [8, 50, 92], prosciutto: [8, 50, 92], slab: [0, 46, 80], chicken: [0, 54, 104], sauce: [0, 38, 72],
    bread_top: [10, 70, 150], bread: [8, 60, 130] };
  const metr = (key, pos, shape) => {
    if (SAUCE3[key]) return M3.sauce;
    if (key === 'bun') return pos === 'top' ? M3.bun_top : M3.bun_bottom;
    if (key === 'panini' || key === 'toast') return pos === 'top' ? M3.bread_top : M3.bread;
    if (['cheddar', 'smoked_cheese', 'kackavalj', 'mozz', 'veg_cheese'].includes(key)) return shape === 'square' ? M3.cheese_sq : M3.cheese;
    if (['ham', 'pecenica'].includes(key)) return M3.slab;
    if (key === 'iceberg') return M3.lettuce;
    return M3[key] || [0, 40, 80];
  };
  function sauceLayer(col, R) {
    let s = ell(350, 40, 250, 46, shade(col, -.2)) + ell(350, 36, 246, 44, col);
    for (let i = 0; i < 7; i++) { const x = 130 + i * 72 + (R() - .5) * 30, h = 18 + R() * 26; s += `<path d="M${f(x - 10)} 66Q${f(x)} ${f(70 + h)} ${f(x + 10)} 66Z" fill="${col}"/>` + circ(x, 66 + h * .82, 6.5, col); }
    return SV3(110, s + `<ellipse cx="290" cy="28" rx="80" ry="10" fill="#fff" opacity=".25"/>`);
  }
  const SAUCE3 = { chipotle: '#cf5f27', bbq: '#5b2410', white_sauce: '#f0ebdf', burger_sauce: '#eea271', caesar: '#eee3c2', ketchup: '#c0261a', mayo: '#f4ecc9',
    sweet_chili: '#dc4426', curry: '#e5ad27', wasabi: '#b9cd78', mustard: '#dfae18', cream: '#f8f5ec' };
  function layer(key, o = {}) { const r = layer0(key, o); const m = metr(key, o.pos || 'mid', o.shape || 'round'); return Object.assign(r, { top: m[0], c: m[1], b: m[2] }); }
  function layer0(key, o = {}) {
    const R = rng(hash(key) + (o.seed || 0)), shape = o.shape || 'round', pos = o.pos || 'mid';
    if (SAUCE3[key]) return sauceLayer(SAUCE3[key], R);
    switch (key) {
      case 'bun': return pos === 'top' ? SV3(300, `<defs></defs><path d="M40 236 C40 70 196 18 350 18 C504 18 660 70 660 236 C560 286 140 286 40 236 Z" fill="url(#k-bun)"/>` +
        `<path d="M40 236 C140 268 560 268 660 236 C640 262 500 290 350 290 C200 290 60 262 40 236 Z" fill="#f2d39c"/><path d="M170 70 C240 40 330 34 400 40" stroke="#fff3d6" stroke-width="16" stroke-linecap="round" opacity=".35" fill="none"/>` +
        seeds(R, 350, 120, 250, 85, 44))
        : SV3(200, `<path d="M58 80 L66 132 Q350 196 634 132 L642 80 Z" fill="url(#k-bbs)"/><ellipse cx="350" cy="80" rx="292" ry="62" fill="url(#k-bbt)"/>`);
      case 'panini': case 'toast': {
        const top = pos === 'top', col = key === 'toast' ? '#f2d8a2' : '#e1ad62', crust = key === 'toast' ? '#c07a32' : '#a8662a';
        if (top) return SV3(170, slab({ shape: 'square', y: 70, t: 46, ry: 56, top: key === 'toast' ? '#d99a4c' : '#d39a50', side: crust }) +
          (key === 'panini' ? [190, 290, 390, 490].map(x => `<path d="M${x} 30l60 76" stroke="#6f3c12" stroke-width="12" stroke-linecap="round" opacity=".75"/>`).join('') : dots(R, 30, 350, 70, 220, 40, ['#c98a3e', '#e8b46a'], 2, 5)));
        return SV3(150, slab({ shape: 'square', y: 60, t: 40, ry: 52, top: col, side: crust }) + dots(R, 40, 350, 60, 230, 38, [shade(col, -.08), shade(col, .1)], 2, 4.5));
      }
      case 'patty': return SV3(180, `<path d="M70 72 L74 124 Q350 182 626 124 L630 72 Z" fill="url(#k-pts)"/><ellipse cx="350" cy="72" rx="282" ry="62" fill="url(#k-ptt)"/>` +
        Array.from({ length: 70 }, () => { const [x, y] = inEll(R, 350, 72, 260, 54); return circ(x, y, R() * 3 + 1.5, R() > .5 ? '#2a1309' : '#9a5a30', ' opacity=".7"'); }).join('') +
        `<path d="M150 64 Q350 34 560 60 M140 86 Q350 58 570 84 M170 106 Q350 84 540 104" stroke="#1e0d05" stroke-width="9" opacity=".6" fill="none" stroke-linecap="round"/>`);
      case 'chicken_panko': return SV3(190, `<path d="${blob(350, 112, 300, 56, .05, 14, R)}" fill="#9c5a18"/><path d="${blob(350, 78, 296, 64, .06, 14, R)}" fill="#dc9432"/>` +
        dots(R, 160, 350, 78, 280, 56, ['#f3c66d', '#efb44f', '#ad661c', '#ffd98e'], 2, 5) + `<ellipse cx="270" cy="56" rx="120" ry="16" fill="#fff" opacity=".15"/>`);
      case 'cheddar': case 'smoked_cheese': case 'kackavalj': case 'mozz': case 'veg_cheese': {
        const c = { cheddar: ['#ffd85a', '#f29b1d', '#e0861a'], smoked_cheese: ['#f6dca2', '#d9a85a', '#b07a35'], kackavalj: ['#fbeaa0', '#f2d374', '#d9b24a'], mozz: ['#fffaf0', '#f3ead6', '#ddd2bb'], veg_cheese: ['#fbf3d0', '#efe2a8', '#d8c98a'] }[key];
        if (shape === 'square') return SV3(120, slab({ shape: 'square', y: 52, t: 12, ry: 46, top: c[0], side: c[2] }) + `<path d="M140 92q10 30 24 22q4 -12 -4 -22Z" fill="${c[1]}"/>`);
        return SV3(170, `<path d="M90 74 L360 30 L630 74 L630 88 L360 132 L90 88 Z" fill="${c[2]}"/><path d="M90 74 L360 30 L630 74 L360 118 Z" fill="${c[1]}"/><path d="M90 74 L360 30 L630 74 L360 118 Z" fill="${c[0]}" opacity=".55"/>` +
          `<path d="M92 80 Q86 136 104 150 Q122 138 118 92 Z M330 116 Q334 162 352 166 Q372 156 368 120 Z M600 84 Q604 126 620 134 Q634 120 628 80 Z" fill="${c[1]}"/><path d="M200 64 L360 40 L520 64" stroke="#fff" stroke-width="6" opacity=".3" fill="none"/>`);
      }
      case 'mozz_fried': return SV3(170, slab({ y: 64, t: 48, rx: 262, ry: 54, top: '#dc9c3a', side: '#a9651d' }) + dots(R, 120, 350, 64, 240, 46, ['#f4c56a', '#b0701f', '#ffdc8a'], 2, 5) +
        `<path d="M560 90q30 10 26 50q-16 6 -20 -40Z" fill="#fbf3dd"/>`);
      case 'lettuce': case 'iceberg': {
        const c = key === 'iceberg' ? ['#e9f6c4', '#bde08a', '#8cc63f'] : ['#d5f08a', '#8cc63f', '#4f8f20'];
        return SV3(140, `<path d="${lettuceRing(350, 74, 318, 62, .085, 13)}" fill="${c[2]}"/><path d="${lettuceRing(350, 68, 312, 58, .085, 13)}" fill="${c[1]}"/><path d="${lettuceRing(350, 64, 250, 44, .06, 9)}" fill="${c[0]}" opacity=".55"/>` +
          `<path d="M350 70 L150 50 M350 70 L560 46 M350 70 L240 100 M350 70 L470 104" stroke="#eaf9c2" stroke-width="3" opacity=".55"/>`);
      }
      case 'tomato': return SV3(120, [[205, 64], [350, 54], [495, 64]].map(([x, y]) => ell(x, y + 9, 122, 38, '#9d1d10') + ell(x, y, 122, 38, '#e2412f') + ell(x, y, 104, 30, '#f2664c') +
        [0, 1, 2, 3, 4].map(k => { const a = k / 5 * Math.PI * 2; return ell(x + Math.cos(a) * 58, y + Math.sin(a) * 15, 26, 9, '#f9a27a', ` transform="rotate(${f(a * 57.3 * .2)} ${x} ${y})"`); }).join('') + ell(x, y, 22, 8, '#ff8d6b')).join(''));
      case 'pickles': return SV3(100, [[170, 50], [290, 44], [410, 52], [530, 46]].map(([x, y]) => ell(x, y + 7, 70, 26, '#3f5e18') + ell(x, y, 70, 26, '#6f9a32') + ell(x, y, 56, 19, '#a6c95c') +
        [0, 1, 2, 3].map(k => ell(x + Math.cos(k * 1.57 + .5) * 22, y + Math.sin(k * 1.57 + .5) * 7, 6, 2.6, '#e2eebd')).join('')).join(''));
      case 'jalapeno': return SV3(90, [[150, 46], [250, 38], [350, 48], [450, 38], [550, 46]].map(([x, y]) => ell(x, y + 6, 46, 18, '#1f4f14') + ell(x, y, 46, 18, '#2e6e1f') + ell(x, y, 34, 12, '#a6cf72') +
        ell(x, y, 15, 5, '#eef5d0')).join(''));
      case 'onion': return SV3(90, [[200, 44, 120], [380, 40, 130], [520, 48, 100]].map(([x, y, r]) => [1, .74, .5].map(k => `<ellipse cx="${x}" cy="${y}" rx="${f(r * k)}" ry="${f(r * k * .26)}" fill="none" stroke="#7d2a6f" stroke-width="12"/>` +
        `<ellipse cx="${x}" cy="${y - 2}" rx="${f(r * k - 6)}" ry="${f((r * k - 6) * .26)}" fill="none" stroke="#f3e6f0" stroke-width="4"/>`).join('')).join(''));
      case 'onion_grill': return SV3(100, `<ellipse cx="350" cy="56" rx="280" ry="40" fill="#5a2a0a" opacity=".55"/>` + strands(R, 140, 350, 50, 270, 36, ['#a8621f', '#c98a3a', '#7a3f12', '#e0a85a'], 5, 9, 70, 22));
      case 'red_cabbage': return SV3(100, `<ellipse cx="350" cy="56" rx="290" ry="40" fill="#4f1748" opacity=".6"/>` + strands(R, 170, 350, 50, 280, 36, ['#6e2366', '#94418a', '#b467aa', '#e6cde3'], 4, 7, 60, 18));
      case 'coleslaw': return SV3(110, `<path d="${lettuceRing(350, 56, 268, 48, .05, 14)}" fill="#efe6c6"/><path d="${lettuceRing(350, 52, 236, 38, .04, 11)}" fill="#f8f1d8"/>` +
        strands(R, 70, 350, 50, 230, 34, ['#e6edc6', '#d4e2a0'], 4, 6, 50, 14) + strands(R, 26, 350, 50, 220, 32, ['#ef8a2a'], 4, 6, 36, 10) + strands(R, 16, 350, 50, 220, 32, ['#8e3a7a'], 3, 5, 34, 10));
      case 'bacon': return SV3(110, [[110, 52, -4], [300, 44, 3], [470, 56, -2]].map(([x, y, a]) => { const pts = wave(x, y, x + 200, y + (R() - .5) * 10, 10, 9, R() * 6);
        return `<g transform="rotate(${a} ${x + 100} ${y})"><path d="${band(pts.map(([px, py]) => [px, py + 10]), 40)}" fill="#5e1c0e"/><path d="${band(pts, 40)}" fill="#ad442a"/>` +
          `<path d="${band(pts.map(([px, py]) => [px, py + 4]), 10, 7)}" fill="#f2cba7"/><path d="${band(pts.map(([px, py]) => [px, py - 11]), 5, 3)}" fill="#d9775a" opacity=".7"/></g>`; }).join(''));
      case 'prosciutto': case 'ham': case 'pecenica': {
        const c = { prosciutto: ['#cf5d67', '#f6e2da', '#a83e4a'], ham: ['#ec9e98', '#f8d4cd', '#c87a74'], pecenica: ['#c98070', '#7a3a26', '#a35a48'] }[key];
        if (key === 'prosciutto') return SV3(110, [0, 1, 2].map(i => { const pts = wave(90 + i * 30, 50 + i * 8, 610 - i * 20, 50 + i * 6, 12, 14, i * 2); return `<path d="${band(pts.map(([x, y]) => [x, y - 16]), 10, 6)}" fill="${c[1]}"/><path d="${band(pts, 34, 26)}" fill="${c[0]}"/><path d="${band(pts.map(([x, y]) => [x, y + 8]), 8, 4)}" fill="${c[2]}" opacity=".6"/>`; }).join(''));
        return SV3(110, slab({ shape, y: 46, t: 16, rx: 286, ry: shape === 'square' ? 40 : 52, top: c[0], side: c[2] }) + (shape === 'round' ? `<ellipse cx="350" cy="46" rx="286" ry="52" fill="none" stroke="${c[1]}" stroke-width="7"/>` : '') +
          dots(R, 18, 350, 46, 200, 30, [shade(c[0], .2)], 4, 9, .7));
      }
      case 'chicken': return SV3(130, slab({ shape, y: 54, t: 24, rx: 280, ry: shape === 'square' ? 44 : 56, top: '#ecc58a', side: '#b67a3a' }) + [200, 300, 400, 500].map(x => `<path d="M${x} 20l70 64" stroke="#8a4a1c" stroke-width="12" stroke-linecap="round" opacity=".6"/>`).join(''));
      // kolači (3/4, kocka/kriška)
      default: return SV3(80, sauceLayer('#cccccc', R).svg);
    }
  }
  /* ---------- kolači: slojevi kriške (karton „klin” ili kocka) ---------- */
  function prism(poly, t, top, side) {
    let s = ''; const n = poly.length;
    for (let i = 0; i < n; i++) { const a = poly[i], b = poly[(i + 1) % n]; const nx = b[1] - a[1], ny = -(b[0] - a[0]); if (ny <= 0) continue;
      const lum = Math.max(-.35, Math.min(.05, -.12 - nx / Math.hypot(nx, ny) * .18)); s += `<path d="M${P(a[0], a[1])}L${P(b[0], b[1])}L${P(b[0], b[1] + t)}L${P(a[0], a[1] + t)}Z" fill="${shade(side, lum)}"/>`; }
    return s + `<path d="M${poly.map(p => P(p[0], p[1])).join('L')}Z" fill="${top}"/>`;
  }
  const WEDGE = [[60, 84], [600, 10], [566, 126]], CUBE = [[350, 10], [620, 64], [350, 118], [80, 64]];
  function cake(key, shape = 'wedge') {
    const R = rng(hash(key)), poly = shape === 'cube' ? CUBE : WEDGE;
    const C = { biscuit_base: [36, '#c98a48', '#9c6630', 'crumb'], mascarpone_cream: [80, '#fbf6ea', '#ece2cc'], strawberry_sauce: [16, '#c41f35', '#9a1426', 'drip'],
      strawberry: [0], caramel: [16, '#c7741f', '#9a5412', 'drip'], vanilla_cream: [60, '#f6e4a8', '#e3cb84'], nut_crust: [40, '#c98a40', '#8f5a24', 'nut'],
      almond: [14, '#e9c48c', '#c49a5c', 'flake'], milk_choc: [14, '#7a4424', '#4f2914', 'drip'], choc_cream: [36, '#6b391d', '#4f2914'], hazelnut: [10, '#c98a4a', '#8a5a2a', 'nut'],
      plazma: [16, '#dba45e', '#b07a3a', 'dots'], nutella: [12, '#4a2513', '#2f170b'], sponge: [34, '#f0cd78', '#c9a24e', 'pore'] }[key] || [24, '#ddd', '#bbb'];
    if (key === 'strawberry') return { h: 130, t: 44, top: 0, c: 60, b: 120, svg: `<svg viewBox="0 0 700 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(250 -4) scale(1.7)">${T.strawberry(R).split('</g>')[0]}</g></g></svg>` };
    const [t, top, side, tex] = C; let s = prism(poly, t, top, side);
    if (tex === 'crumb') s += dots(R, 90, 360, 66, 200, 38, ['#e0a868', '#a86a30', '#f0c088'], 2, 5);
    if (tex === 'pore') s += dots(R, 60, 360, 66, 200, 38, ['#dcb35a', '#fbe3a2'], 2, 5);
    if (tex === 'dots') s += dots(R, 40, 360, 66, 200, 36, ['#b8803e'], 2.5, 3.5);
    if (tex === 'nut') s += dots(R, 40, 360, 66, 200, 38, ['#e8c088', '#a86a30', '#f2d8a8'], 4, 9);
    if (tex === 'flake') s += Array.from({ length: 30 }, () => { const [x, y] = inEll(R, 360, 64, 210, 40); return ell(x, y, 16, 6, '#f2d8a8', ` stroke="#c49a5c" stroke-width="1.5" transform="rotate(${f(R() * 180)} ${f(x)} ${f(y)})"`); }).join('');
    if (tex === 'drip') { const fr = poly.filter((p, i) => { const b = poly[(i + 1) % poly.length]; return b[1] - p[1] !== 0; }); for (let i = 0; i < 7; i++) { const k = R(), a = poly[0], b = poly[poly.length - 1], x = a[0] + (b[0] - a[0]) * k, y = a[1] + (b[1] - a[1]) * k + t - 2, h = 14 + R() * 30; s += `<path d="M${f(x - 9)} ${f(y)}Q${f(x)} ${f(y + h)} ${f(x + 9)} ${f(y)}Z" fill="${top}"/>` + circ(x, y + h * .78, 6, top); } s += gloss(300, 50, 90, 14, -8, .7); }
    const h = 150 + t;
    return { h, t, top: 8, c: 66, b: 126 + t, svg: `<svg viewBox="0 0 700 ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s}</svg>` };
  }

  /* ========================= PICA (400×400, odozgo) ========================= */
  const PZ = {
    ham: (x, y, a, R) => `<path d="${blob(x, y, 15, 11, .25, 6, R, a)}" fill="#e99b95"/><path d="${blob(x, y, 11, 7, .2, 6, R, a)}" fill="#f4b7b0" opacity=".6"/>`,
    pecenica: (x, y, a, R) => `<path d="${blob(x, y, 17, 11, .1, 8, R, a)}" fill="#7a3a26"/><path d="${blob(x, y, 14, 8.5, .1, 8, R, a)}" fill="#c98070"/>`,
    kulen: (x, y, a, R) => circ(x, y, 13, '#5c1910') + circ(x, y, 11.5, '#b02a1c') + dots(R, 7, x, y, 8, 8, ['#f2d3bd'], .8, 1.8),
    prosciutto: (x, y, a, R) => { const pts = wave(x - 22, y, x + 22, y, 6, 5, R() * 6).map(([px, py]) => { const c = Math.cos(a), s = Math.sin(a); return [x + (px - x) * c - (py - y) * s, y + (px - x) * s + (py - y) * c]; }); return `<path d="${band(pts, 15, 10)}" fill="#cf5d67"/><path d="${band(pts.map(([px, py]) => [px, py - 4]), 4, 2)}" fill="#f6e2da" opacity=".9"/>`; },
    mushroom: (x, y, a) => mushSlice(x, y, .72, a * 57.3),
    olives: (x, y) => circ(x, y, 7.5, '#1e1918') + circ(x, y, 3, '#4a403b') + circ(x - 2.5, y - 2.5, 1.6, '#8d8079'),
    feferoni: (x, y, a) => { const c = Math.cos(a), s = Math.sin(a), pts = [[-26, 0], [-8, -4], [10, -2], [26, 4]].map(([px, py]) => [x + px * c - py * s, y + px * s + py * c]); return `<path d="${band(pts, 9, 2)}" fill="#c3bd36"/><path d="${band(pts.map(([px, py]) => [px, py - 2]), 3, 1)}" fill="#efe88a" opacity=".8"/>`; },
    cherry: (x, y) => circ(x, y, 11, '#c62a1c') + circ(x, y, 9, '#ea4b33') + circ(x, y, 3.4, '#f8a184') + gloss(x - 3, y - 4, 3.4, 2),
    rucola: (x, y, a, R) => `<path d="${blob(x, y, 18, 5.5, .38, 14, R, a)}" fill="#2f7424"/><path d="M${P(x - Math.cos(a) * 16, y - Math.sin(a) * 16)}L${P(x + Math.cos(a) * 15, y + Math.sin(a) * 15)}" stroke="#8dcb5a" stroke-width="1.3"/>`,
    parmesan: (x, y, a, R) => `<path d="${blob(x, y, 15, 9, .3, 5, R, a)}" fill="#f4e6b8" stroke="#dcc283" stroke-width="1.2"/>`,
    tuna: (x, y, a, R) => `<path d="${blob(x, y, 10, 7.5, .3, 7, R, a)}" fill="#d9b9a0"/><path d="M${P(x - 5, y)}q5 2 10 0" stroke="#b28c72" stroke-width="1.2" fill="none"/>`,
    zucchini: (x, y) => circ(x, y, 12, '#2f5a20') + circ(x, y, 10.5, '#eef2c6') + circ(x, y, 6, '#e0e8ae'),
    onion: (x, y, a) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="12" ry="10" fill="none" stroke="#7d2a6f" stroke-width="3.4" transform="rotate(${f(a * 57.3)} ${f(x)} ${f(y)})"/>`,
    corn: (x, y, a) => `<rect x="${f(x - 3.4)}" y="${f(y - 3.2)}" width="6.8" height="6.4" rx="2.2" fill="#f4c62e" transform="rotate(${f(a * 57.3)} ${f(x)} ${f(y)})"/>`,
    gorgonzola: (x, y, a, R) => `<path d="${blob(x, y, 9, 7, .3, 6, R, a)}" fill="#f6f1e2"/>` + circ(x + 2, y - 1, 1.6, '#6f8c84'),
    gouda: (x, y, a, R) => `<path d="${blob(x, y, 11, 8, .25, 6, R, a)}" fill="#f7cf5a" opacity=".95"/>`,
    smoked_cheese: (x, y, a, R) => `<path d="${blob(x, y, 11, 8, .25, 6, R, a)}" fill="#e7b874" opacity=".95"/>`,
    pepper: (x, y, a) => { const c = Math.cos(a), s = Math.sin(a), pts = [[-14, 0], [0, -3], [14, 0]].map(([px, py]) => [x + px * c - py * s, y + px * s + py * c]); return `<path d="${band(pts, 6)}" fill="#d92b1d"/>`; },
  };
  const PZ_N = { ham: 16, pecenica: 9, kulen: 12, prosciutto: 9, mushroom: 12, olives: 9, feferoni: 5, cherry: 9, rucola: 14, parmesan: 10, tuna: 18, zucchini: 10, onion: 10, corn: 34, gorgonzola: 16, gouda: 12, smoked_cheese: 12 };
  function cheeseDisc(R, kind) {
    const base = kind === 'veg_cheese' ? ['#f4ecc6', '#e6d9a0'] : ['#f6e3a8', '#e4b867'];
    let s = '';
    for (let i = 0; i < 26; i++) { const [x, y] = inEll(R, 200, 200, 120, 120); s += `<path d="${blob(x, y, 32 + R() * 20, 26 + R() * 16, .25, 9, R, R() * 3)}" fill="${base[0]}"/>`; }
    s += dots(R, 26, 200, 200, 130, 130, [base[1]], 4, 9, .7) + dots(R, 30, 200, 200, 130, 130, ['#fffaf0'], 2, 4, .6);
    return s;
  }
  function pizza(comps) {
    // vraća slojeve odozdo nagore: [{k, sr, en, svg}]
    const R = rng(hash(comps.map(c => c.k).join()));
    const wrap = b => `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${b}</svg>`;
    const out = [];
    for (const c of comps) {
      if (c.k === 'pizza_base') out.push({ c, svg: wrap(circ(200, 206, 192, '#000', ' opacity=".35"') + circ(200, 200, 192, '#a8662a') + circ(200, 198, 186, '#d9964a') +
        Array.from({ length: 26 }, (_, i) => { const a = i / 26 * 6.283 + R() * .2; return ell(200 + Math.cos(a) * 176, 198 + Math.sin(a) * 176, 16, 9, '#f0c27a', ` opacity=".75" transform="rotate(${f(a * 57.3 + 90)} ${f(200 + Math.cos(a) * 176)} ${f(198 + Math.sin(a) * 176)})"`); }).join('') +
        dots(R, 30, 200, 198, 182, 182, ['#7a4520'], 2, 5, .55) + circ(200, 200, 160, '#f1d7a2') + dots(R, 40, 200, 200, 150, 150, ['#e8c588'], 2, 4, .6)) });
      else if (c.k === 'pelat') out.push({ c, svg: wrap(`<path d="${blob(200, 200, 160, 158, .03, 24, R)}" fill="#b52d1a"/>` + dots(R, 50, 200, 200, 140, 140, ['#9a2210', '#d6452c', '#c63a24'], 4, 12, .8)) });
      else if (['mozz', 'veg_cheese'].includes(c.k)) out.push({ c, svg: wrap(cheeseDisc(R, c.k)) });
      else {
        const fn = PZ[c.k]; if (!fn) continue;
        const n = Math.max(3, Math.round((PZ_N[c.k] || 10) * Math.min(1.6, Math.max(.6, c.g / 40))));
        // providna „ploča” sloja da se u rastavljenom prikazu vidi ravan sloja
        let s = `<circle class="plate" cx="200" cy="200" r="168" fill="rgba(255,214,140,.045)" stroke="rgba(255,214,140,.2)" stroke-width="2.4" stroke-dasharray="5 7"/>`;
        for (let i = 0; i < n; i++) { const a = R() * 6.283, r = Math.sqrt(.04 + R() * .96) * 136; s += `<g transform="translate(${f(200 + Math.cos(a) * r)} ${f(200 + Math.sin(a) * r)}) scale(1.25) translate(${f(-200 - Math.cos(a) * r)} ${f(-200 - Math.sin(a) * r)})">` + fn(200 + Math.cos(a) * r, 200 + Math.sin(a) * r, R() * 6.283, R) + '</g>'; }
        if (['gouda', 'smoked_cheese', 'gorgonzola'].includes(c.k)) s = s.replace(/<path/g, '<path opacity=".95"');
        out.push({ c, svg: wrap(s) });
      }
    }
    return out;
  }

  /* ========================= TANJIRI ZA PRILOGE ========================= */
  function platter(R, r = 54) { // tamni tanjir sa radijalnim potezima kao njihovo posuđe
    let s = circ(60, 63, r, '#000', ' opacity=".4"') + circ(60, 60, r, '#2b2622');
    for (let i = 0; i < 140; i++) { const a = R() * 6.283, r0 = r * (.62 + R() * .2), r1 = r * (.9 + R() * .1); s += `<path d="M${P(60 + Math.cos(a) * r0, 60 + Math.sin(a) * r0)}L${P(60 + Math.cos(a) * r1, 60 + Math.sin(a) * r1)}" stroke="${R() > .5 ? '#c8b79a' : '#8f806a'}" stroke-width="${f(.4 + R() * .9)}" opacity="${f(.25 + R() * .45)}"/>`; }
    return s + circ(60, 60, r * .64, '#3a332d') + circ(60, 60, r, 'url(#k-sh)', ' opacity=".5"');
  }
  function plate(key) {
    const R = rng(hash('plate' + key));
    let inner;
    if (key === 'sosevi') inner = `<g transform="translate(16 18) scale(.46)">${T.white_sauce(rng(1))}</g><g transform="translate(50 12) scale(.46)">${T.ketchup(rng(2))}</g><g transform="translate(34 46) scale(.46)">${T.chipotle(rng(3))}</g>`;
    else if (key === 'coleslaw-salata') return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">${platter(R)}<g transform="translate(14 14) scale(.77)">${T.coleslaw(rng(4))}</g></svg>`;
    else {
      const m = { 'miks-zelenih-salata': ['lettuce', 'cherry', 'rucola'], pomfrit: ['fries'], 'zacinjeni-krompir': ['potato_sp'], 'pohovani-luk': ['onion_rings'], 'panirana-mocarela': ['mozz_fried'],
        'grilovano-povrce': ['veg_grill'], pirinac: ['rice'], lepinja: ['lepinja'] }[key] || ['fries'];
      inner = m.map((k, i) => `<g transform="translate(${[16, 30, 22][i]} ${[16, 26, 30][i]}) scale(${[.74, .5, .55][i]})">${T[k](rng(hash(key + k)))}</g>`).join('');
    }
    return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">${platter(R)}${inner}</svg>`;
  }

  /* ========================= DEKORACIJA: medeni štapić ========================= */
  const dipper = () => `<svg viewBox="0 0 60 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="26" y="70" width="8" height="250" rx="4" fill="#c9945a"/><rect x="28" y="70" width="2.6" height="250" fill="#e8bd86" opacity=".7"/>` +
    [0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${[12, 8, 6, 6, 8, 12, 16][i]}" y="${6 + i * 9}" width="${60 - 2 * [12, 8, 6, 6, 8, 12, 16][i]}" height="8" rx="4" fill="${i % 2 ? '#a8723c' : '#d9a868'}"/>`).join('') + `</svg>`;

  const defs = () => `<svg width="0" height="0" style="position:absolute;width:0;height:0" aria-hidden="true" focusable="false"><defs>
    <radialGradient id="k-sh" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></radialGradient>
    <radialGradient id="k-gl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="k-sl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    <radialGradient id="k-bun" cx=".36" cy=".2" r=".85"><stop offset="0" stop-color="#ffd08a"/><stop offset=".35" stop-color="#e79a46"/><stop offset=".75" stop-color="#b9631f"/><stop offset="1" stop-color="#7d3d10"/></radialGradient>
    <linearGradient id="k-bbs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9a557"/><stop offset="1" stop-color="#9a5218"/></linearGradient>
    <radialGradient id="k-bbt" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="#f9e2b6"/><stop offset="1" stop-color="#e5b46c"/></radialGradient>
    <radialGradient id="k-ptt" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#7a4321"/><stop offset=".7" stop-color="#4a2512"/><stop offset="1" stop-color="#2c140a"/></radialGradient>
    <linearGradient id="k-pts" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a2e15"/><stop offset="1" stop-color="#25110a"/></linearGradient>
  </defs></svg>`;

  window.KART = { top, layer, cake, pizza, plate, dipper, defs, keys: () => Object.keys(T) };
})();