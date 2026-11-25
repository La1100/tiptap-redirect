/* =====================================================================
   ULTRA CAFFE · TipTap Signature demo — uprava: statistika i analitika
   Demo podaci (assets/mock.js) + stvarni događaji iz digitalnog menija
   i rezervacija na ovom uređaju (localStorage uc_ev, uc_myres).
   ===================================================================== */
(function () {
'use strict';
const U = window.UC, M = window.UCM, K = window.KART;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const f1 = n => Math.round(n * 10) / 10;
const nf = n => Math.round(n).toLocaleString('sr-RS');
const rsd = n => n >= 1e6 ? `${(n / 1e6).toFixed(2).replace('.', ',')} mil.` : nf(n);
const pct = (a, b) => (b ? (a - b) / b * 100 : 0);
const C = { centar: '#CFA670', big: '#3F8F99', prev: 'rgba(233,226,214,.55)' };
const SRC = [['Digitalni meni', '#CFA670'], ['Telefon', '#3F8F99'], ['Instagram', '#E39AAE'], ['Uživo', '#E9E2D6']];
const WD = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];
const MON = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];
const qs = new URLSearchParams(location.search);
let LOCS = qs.get('lokal') === 'big' ? ['big'] : qs.get('lokal') === 'centar' ? ['centar'] : ['centar', 'big'];
let P = 7;
const ITEMS = U.items.concat(U.kolaci); const BY = {}; ITEMS.forEach(i => BY[i.id] = i);
const now = new Date(), rawH = now.getHours() + now.getMinutes() / 60, late = rawH < 6;
const today = M.day0(late ? M.addD(now, -1) : now), nowH = late ? rawH + 24 : rawH; // poslovni dan traje do 06h
const IC = {
  home: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>',
  cash: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="6" width="18" height="12" rx="3"/><circle cx="12" cy="12" r="2.6"/></svg>',
  menu: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5 5h14M5 12h14M5 19h9"/></svg>',
  cal: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  star: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/></svg>',
  pin: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  cake: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 20h16M5 20v-7h14v7M5 16c2 1.4 4 1.4 7 0s5-1.4 7 0M12 13V8M12 5.5v.5"/></svg>',
  plan: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2.2"/><rect x="13" y="13" width="5" height="5" rx="1.2"/></svg>',
  chart: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>'
};

// ---------------------------------------------------------------- podaci za izabrani period
const range = (end, n) => Array.from({ length: n }, (_, i) => M.addD(end, i - n + 1));
function daySales(d, cut) { // zbir izabranih lokala; cut = samo sati koji su prošli (danas i isti dan prošle godine)
  let rev = 0, cov = 0, tk = 0; const by = {};
  LOCS.forEach(l => { const s = M.sales(l, d); let r = 0, c = 0, t = 0; s.hours.forEach(h => { const hh = h.h < 6 ? h.h + 24 : h.h; if (cut != null && hh + 1 > cut + .001) return; r += h.rev; c += h.covers; }); t = Math.round(c / 2.1); by[l] = r; rev += r; cov += c; tk += t; });
  return { d, rev, cov, tk, by };
}
const LY = 364; // isti dan u nedelji, godinu dana ranije: poređenje sa istim periodom prošle godine (sezona je ista)
function period(n, offset = 0) { const end = M.addD(today, -offset); return range(end, n).map((d, i) => daySales(d, i === n - 1 && (offset === 0 || offset === LY) ? nowH : null)); }
function resIn(days) { const out = []; days.forEach(x => LOCS.forEach(l => M.reservations(l, x.d).forEach(r => out.push(r)))); return out; }

// ---------------------------------------------------------------- tooltip
const tip = document.createElement('div'); tip.className = 'tip'; document.body.appendChild(tip);
function showTip(e, html) { tip.innerHTML = html; tip.classList.add('on'); const x = Math.min(innerWidth - tip.offsetWidth - 12, e.clientX + 14), y = Math.max(8, e.clientY - tip.offsetHeight - 14); tip.style.left = x + 'px'; tip.style.top = y + 'px'; }
const hideTip = () => tip.classList.remove('on');
function bindTips(root, fn) { $$('[data-tip]', root).forEach(el => { el.addEventListener('pointermove', e => showTip(e, fn(el.dataset.tip))); el.addEventListener('pointerleave', hideTip); }); }

// ---------------------------------------------------------------- grafikoni (SVG)
function niceMax(v) { const p = Math.pow(10, Math.floor(Math.log10(v || 1))), m = v / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p; }
function spark(vals, col) {
  const w = 160, h = 34, mx = Math.max(...vals, 1), mn = Math.min(...vals), k = vals.length > 1 ? w / (vals.length - 1) : w;
  const pts = vals.map((v, i) => [i * k, h - 4 - (v - mn) / ((mx - mn) || 1) * (h - 10)]);
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="M${pts.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L')}" fill="none" stroke="${col}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><circle cx="${f1(pts[pts.length - 1][0])}" cy="${f1(pts[pts.length - 1][1])}" r="2.6" fill="${col}"/></svg>`;
}
function barsDaily(days, W = 760) {
  const H = W < 520 ? 220 : 250, l = 46, r = 8, tp = 12, b = 26, n = days.length, iw = W - l - r, ih = H - tp - b;
  const mx = niceMax(Math.max(...days.map(x => x.rev))), bw = iw / n, gap = Math.max(2, Math.min(6, bw * .22));
  let s = `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Promet po danima"><g class="g">`;
  for (let i = 0; i <= 4; i++) { const y = tp + ih - ih * i / 4; s += `<line x1="${l}" x2="${W - r}" y1="${f1(y)}" y2="${f1(y)}"/><text x="${l - 8}" y="${f1(y + 4)}" text-anchor="end">${rsd(mx * i / 4).replace(' mil.', 'M')}</text>`; }
  s += '</g>';
  days.forEach((x, i) => {
    const x0 = l + i * bw + gap / 2, w = bw - gap; let y = tp + ih;
    LOCS.forEach((loc, k) => { const v = x.by[loc] || 0, hh = v / mx * ih; y -= hh; const top = k === LOCS.length - 1; s += top ? `<path d="M${f1(x0)} ${f1(y + hh)}V${f1(y + Math.min(4, hh))}Q${f1(x0)} ${f1(y)} ${f1(x0 + Math.min(4, w / 2))} ${f1(y)}H${f1(x0 + w - Math.min(4, w / 2))}Q${f1(x0 + w)} ${f1(y)} ${f1(x0 + w)} ${f1(y + Math.min(4, hh))}V${f1(y + hh)}Z" fill="${C[loc]}"/>` : `<rect x="${f1(x0)}" y="${f1(y + 1)}" width="${f1(w)}" height="${f1(Math.max(0, hh - 1))}" fill="${C[loc]}"/>`; });
    if (n <= 31 && ((n <= 14 && (W >= 560 || i % 2 === 0)) || (n > 14 && i % (W >= 560 ? 3 : 5) === 0))) s += `<text x="${f1(x0 + w / 2)}" y="${H - 8}" text-anchor="middle">${n <= 14 && W >= 560 ? WD[(x.d.getDay() + 6) % 7] + ' ' + x.d.getDate() : x.d.getDate() + '.'}</text>`;
    else if (n > 31 && x.d.getDate() === 1) s += `<text x="${f1(x0)}" y="${H - 8}">${MON[x.d.getMonth()]}</text>`;
    s += `<rect class="hit" x="${f1(l + i * bw)}" y="${tp}" width="${f1(bw)}" height="${ih}" data-tip="${i}"/>`;
  });
  return s + '</svg>';
}
function linesHourly(a, b, W = 760) { // a = danas (do sada), b = isti dan prošle godine
  const H = 230, l = 46, r = 10, tp = 12, bt = 26, iw = W - l - r, ih = H - tp - bt, hrs = b.map(x => x.h), n = hrs.length;
  const mx = niceMax(Math.max(...a.map(x => x.rev), ...b.map(x => x.rev), 1)), X = i => l + iw * i / Math.max(1, n - 1), Y = v => tp + ih - v / mx * ih;
  let s = `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Promet po satu"><g class="g">`;
  for (let i = 0; i <= 4; i++) { const y = tp + ih - ih * i / 4; s += `<line x1="${l}" x2="${W - r}" y1="${f1(y)}" y2="${f1(y)}"/><text x="${l - 8}" y="${f1(y + 4)}" text-anchor="end">${nf(mx * i / 4 / 1000)}k</text>`; }
  s += '</g>';
  hrs.forEach((h, i) => { if (i % (W < 420 ? 3 : 2) === 0) s += `<text x="${f1(X(i))}" y="${H - 8}" text-anchor="middle">${String(h).padStart(2, '0')}</text>`; });
  s += `<path d="M${b.map((x, i) => f1(X(i)) + ' ' + f1(Y(x.rev))).join('L')}" fill="none" stroke="${C.prev}" stroke-width="2" stroke-dasharray="5 5"/>`;
  if (a.length) { s += `<path d="M${a.map((x, i) => f1(X(i)) + ' ' + f1(Y(x.rev))).join('L')}L${f1(X(a.length - 1))} ${tp + ih}L${l} ${tp + ih}Z" fill="url(#ag)" opacity=".5"/><path d="M${a.map((x, i) => f1(X(i)) + ' ' + f1(Y(x.rev))).join('L')}" fill="none" stroke="#CFA670" stroke-width="2.4" stroke-linejoin="round"/><circle cx="${f1(X(a.length - 1))}" cy="${f1(Y(a[a.length - 1].rev))}" r="5" fill="#CFA670" stroke="#0F1E21" stroke-width="2"/>`; }
  s += `<defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFA670" stop-opacity=".35"/><stop offset="1" stop-color="#CFA670" stop-opacity="0"/></linearGradient></defs>`;
  hrs.forEach((h, i) => { s += `<rect class="hit" x="${f1(X(i) - iw / n / 2)}" y="${tp}" width="${f1(iw / n)}" height="${ih}" data-tip="${i}"/>`; });
  return s + '</svg>';
}
function heatmap(grid, hours, Wt = 640) {
  const l = 40, cw = Math.max(20, Math.min(44, (Wt - l - 4) / hours.length)), chh = Math.max(24, Math.min(40, cw * 1.05)), tp = 18, W = l + hours.length * cw + 4, H = tp + 7 * chh + 4, mx = Math.max(...grid.flat(), 1);
  let s = `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gosti po danu i satu">`;
  hours.forEach((h, j) => { if (j % 2 === 0) s += `<text x="${l + j * cw + cw / 2}" y="11" text-anchor="middle">${String(h).padStart(2, '0')}</text>`; });
  grid.forEach((row, i) => { s += `<text x="${l - 8}" y="${tp + i * chh + chh / 2 + 4}" text-anchor="end">${WD[i]}</text>`; row.forEach((v, j) => { const a = .05 + .95 * Math.pow(v / mx, 1.15); s += `<rect x="${l + j * cw + 1}" y="${tp + i * chh + 1}" width="${cw - 2}" height="${chh - 2}" rx="4" fill="#CFA670" fill-opacity="${a.toFixed(3)}" data-tip="${i}|${j}"/>`; }); });
  return s + '</svg>';
}
function scatter(rows, W = 760) {
  const H = W < 520 ? 300 : 340, l = 48, r = 14, tp = 14, b = 34, iw = W - l - r, ih = H - tp - b;
  const mxq = niceMax(Math.max(...rows.map(x => x.q))), mxm = niceMax(Math.max(...rows.map(x => x.margin)));
  const medQ = rows.map(x => x.q).sort((a, c) => a - c)[Math.floor(rows.length / 2)], medM = rows.map(x => x.margin).sort((a, c) => a - c)[Math.floor(rows.length / 2)];
  const X = q => l + q / mxq * iw, Y = m => tp + ih - m / mxm * ih;
  let s = `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Inženjering menija"><g class="g">`;
  for (let i = 0; i <= 4; i++) { const y = tp + ih - ih * i / 4, x = l + iw * i / 4; s += `<line x1="${l}" x2="${W - r}" y1="${f1(y)}" y2="${f1(y)}"/><text x="${l - 8}" y="${f1(y + 4)}" text-anchor="end">${nf(mxm * i / 4)}</text><text x="${f1(x)}" y="${H - 14}" text-anchor="middle">${nf(mxq * i / 4)}</text>`; }
  s += `</g><path d="M${f1(X(medQ))} ${tp}V${tp + ih}M${l} ${f1(Y(medM))}H${W - r}" stroke="rgba(241,234,223,.22)" stroke-dasharray="4 5"/>`;
  [['Zvezde', W - r - 8, tp + 14, 'end'], ['Zagonetke', l + 8, tp + 14, 'start'], ['Radni konji', W - r - 8, tp + ih - 8, 'end'], ['Za preispitivanje', l + 8, tp + ih - 8, 'start']].forEach(([t2, x, y, a]) => { s += `<text x="${x}" y="${y}" text-anchor="${a}" style="font:600 12.5px var(--f-b);fill:rgba(241,234,223,.5)">${t2}</text>`; });
  s += `<text x="${l + iw / 2}" y="${H}" text-anchor="middle">Prodato porcija u periodu</text><text x="12" y="${tp + ih / 2}" transform="rotate(-90 12 ${tp + ih / 2})" text-anchor="middle">Zarada po porciji, RSD</text>`;
  rows.forEach((x, i) => { const sig = x.it.sig; s += `<circle cx="${f1(X(x.q))}" cy="${f1(Y(x.margin))}" r="${sig ? 6.5 : 4.5}" fill="${sig ? '#CFA670' : 'rgba(233,226,214,.55)'}" stroke="#0F1E21" stroke-width="2" data-tip="${i}"/>`; });
  const placed = [];
  rows.filter(x => x.it.sig).forEach(x => { const tw = x.it.sr.length * 6.4, cx = X(x.q), cy = Y(x.margin); const cand = [[cx + 9, cy + 4, 'start'], [cx - 9, cy + 4, 'end'], [cx + 9, cy - 10, 'start'], [cx + 9, cy + 17, 'start']];
    for (const [tx, ty, an] of cand) { const x0 = an === 'end' ? tx - tw : tx, bb = [x0 - 2, ty - 11, x0 + tw + 2, ty + 3]; if (bb[2] > W - 4 || bb[0] < l) continue; if (placed.some(p => !(bb[2] < p[0] || bb[0] > p[2] || bb[3] < p[1] || bb[1] > p[3]))) continue; placed.push(bb); s += `<text x="${f1(tx)}" y="${f1(ty)}" text-anchor="${an}" style="font:600 11.5px var(--f-b);fill:#E6C899">${esc(x.it.sr)}</text>`; break; } });
  return { svg: s + '</svg>', medQ, medM };
}
function hbars(rows, col, fmt) { const mx = Math.max(...rows.map(r => r[1]), 1); return `<div class="stars">${rows.map(r => `<div style="grid-template-columns:120px 1fr 64px"><span>${esc(r[0])}</span><i><em style="width:${f1(r[1] / mx * 100)}%;background:${r[2] || col}"></em></i><b class="num" style="text-align:right;font-weight:600">${fmt(r[1])}</b></div>`).join('')}</div>`; }

// ---------------------------------------------------------------- iscrtavanje
function render() {
  const cur = period(P), prev = period(P, LY), sum = (a, k) => a.reduce((x, y) => x + y[k], 0);
  const rev = sum(cur, 'rev'), revP = sum(prev, 'rev'), cov = sum(cur, 'cov'), covP = sum(prev, 'cov'), tk = sum(cur, 'tk'), tkP = sum(prev, 'tk');
  const avg = tk ? rev / tk : 0, avgP = tkP ? revP / tkP : 0;
  const res = resIn(cur), resP = resIn(prev), dig = res.filter(r => r.src === 'Digitalni meni').length;
  const dayN = Math.max(P, 14), daysChart = P >= 14 ? cur : period(14);
  const delta = (a, b, inv) => { const d = pct(a, b), up = d >= 0; return `<span class="dl ${up !== !!inv ? 'up' : 'dn'}">${up ? '▲' : '▼'} ${Math.abs(d).toFixed(1).replace('.', ',')}%<em>&nbsp;u odnosu na prošlu godinu</em></span>`; };
  const lab = { 1: 'danas do sada', 7: 'poslednjih 7 dana', 30: 'poslednjih 30 dana', 90: 'poslednjih 90 dana' }[P];
  // recenzije: prave Google ocene po lokalu (Google Maps, novembar 2026); nove recenzije uz TipTap kartice su procena
  const RV = { centar: [U.google.centar.r, U.google.centar.n], big: [U.google.big.r, U.google.big.n] }; const rvBase = LOCS.reduce((a, l) => a + RV[l][1], 0);
  const newRev = Math.round(cov * .004), newRevP = Math.round(covP * .0014) /* ≈ 1 recenzija na 250 gostiju uz kartice, bez njih ≈ 1 na 700 */, rating = (LOCS.reduce((a, l) => a + RV[l][0] * RV[l][1], 0) / rvBase).toFixed(1);
  // događaji sa ovog uređaja
  let ev = []; try { ev = JSON.parse(localStorage.getItem('uc_ev') || '[]'); } catch (e) { }
  const evC = k => ev.filter(e => e.type === k).length;
  // funnel digitalnog menija (demo + uživo)
  const scans = Math.round(cov * .64) + evC('open'), opened = Math.round(scans * .82) + Math.min(evC('view'), 1), split = Math.round(scans * .46) + Math.min(evC('split'), 1), added = Math.round(scans * .34) + Math.min(evC('add'), 1), shown = Math.round(scans * .19) + Math.min(evC('show'), 1);
  // prodaja jela
  const from = cur[0].d; let sales = []; LOCS.forEach(l => M.itemSales(l, from, P).forEach(x => { const e = sales.find(y => y.id === x.id); if (e) { e.q += x.q; e.rev += x.rev; } else sales.push(Object.assign({}, x)); }));
  sales.sort((a, b) => b.q - a.q);
  const dishes = sales.filter(x => x.it.kind !== 'cake' && x.it.cat !== 'kolaci'), cakes = sales.filter(x => x.it.cat === 'kolaci');
  const top = dishes.slice(0, 10), topMx = top[0] ? top[0].q : 1;
  // heatmap: poslednjih 28 dana
  const hrs = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0]; const grid = Array.from({ length: 7 }, () => hrs.map(() => 0)), cnt = Array.from({ length: 7 }, () => hrs.map(() => 0));
  range(M.addD(today, -1), 28).forEach(d => LOCS.forEach(l => { const s = M.sales(l, d), wd = (d.getDay() + 6) % 7; s.hours.forEach(h => { const j = hrs.indexOf(h.h); if (j >= 0) { grid[wd][j] += h.covers; cnt[wd][j]++; } }); }));
  const avgGrid = grid.map((r, i) => r.map((v, j) => cnt[i][j] ? Math.round(v / cnt[i][j] * LOCS.length) : 0));
  // po satu: danas vs isti dan prošle godine
  const hourOf = (d, onlyNow) => { const map = {}; LOCS.forEach(l => M.sales(l, d).hours.forEach(h => { map[h.h] = (map[h.h] || 0) + h.rev; })); const ordered = Object.keys(map).map(Number).sort((a, b) => (a < 6 ? a + 24 : a) - (b < 6 ? b + 24 : b)); return ordered.map(h => ({ h, rev: map[h] })).filter(x => !onlyNow || ((x.h < 6 ? x.h + 24 : x.h) + 1 <= nowH)); };
  const hb = hourOf(M.addD(today, -LY)), ha = hourOf(today, true), lastW = hb.slice(0, ha.length).reduce((a, x) => a + x.rev, 0), todayRev = ha.reduce((a, x) => a + x.rev, 0);
  // rezervacije: izvori i zone
  const srcN = SRC.map(([k, c]) => [k, res.filter(r => r.src === k).length, c]), srcT = srcN.reduce((a, x) => a + x[1], 0) || 1;
  const zoneN = {}; res.forEach(r => { zoneN[r.zone] = (zoneN[r.zone] || 0) + r.party; });
  // torte (demo): narudžbine za narednih 7 dana
  const RT = M.rng(M.hash('torte' + M.dkey(today))); const torte = range(M.addD(today, 7), 7).map(d => ({ d, n: Math.round(2 + RT() * 6 + ((d.getDay() + 6) % 7 >= 4 ? 4 : 0)) }));
  const tFlav = U.torte.map(x => [x.sr, Math.round(4 + RT() * 22)]).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const locName = LOCS.length === 2 ? 'Oba lokala' : U.locs.find(l => l.id === LOCS[0]).name;
  const thumb = it => it.cut ? `<span class="th cut"><img src="../img/k/${it.cut}.webp" alt=""></span>` : it.img && it.img.length ? `<span class="th"><img src="../img/f/${it.img[0]}-t.webp" alt=""></span>` : `<span class="th">${K.top(((it.comps || []).slice().sort((a, b) => b.g - a.g)[0] || {}).a || 'fries', 1)}</span>`;
  const evName = e => { const it = BY[e.id]; const nm = it ? it.sr : (U.drinks.find((d, i) => 'd' + i === e.id) || {}).sr || e.id; return { view: `Gost je otvorio „${nm}”`, split: `Gost je rastavio „${nm}”`, add: `„${nm}” dodato na listu`, pair: `Gost je otvorio preporuku „${nm}”`, open: 'Novi gost je otvorio meni', show: 'Gost je pokazao listu konobaru', call: 'Gost je pozvao konobara', res: e.st === 'pending' ? `Novi zahtev za rezervaciju (${e.party || 2} ${(e.party || 2) % 10 >= 2 && (e.party || 2) % 10 <= 4 ? 'osobe' : 'osoba'}) preko menija · sto ${e.id} · čeka potvrdu` : `Nova rezervacija za ${e.party || 2} preko menija · sto ${e.id}${e.st === 'ok' ? ' · potvrđena automatski' : ''}`, jump: `Brzi skok u meniju: ${({ 'g-hrana': 'Hrana', 'g-slatko': 'Slatko', 'g-pice': 'Piće' })[e.id] || e.id}`, resok: `Hostesa je potvrdila rezervaciju${e.name ? ' · ' + e.name : ''} · sto ${e.id}`, resno: `Hostesa je odbila zahtev${e.name ? ' · ' + e.name : ''} · sto ${e.id}`, mood: e.id === 'surprise' ? 'Gost je pritisnuo „Iznenadi me” u piću' : `Gost bira piće po raspoloženju: ${({ fresh: 'osvežavajuće', warm: 'toplo', sweet: 'slatko', free: 'bez alkohola', strong: 'jako', party: 'za proslavu' })[e.id] || e.id}`, story: `Gost pravi Instagram story: „${nm}”`, torta: 'Novi zahtev za tortu', grev: 'Gost je otvorio Google recenziju', mgr: 'Gost je poslao poruku menadžeru', rev: null, help: `Gost je tražio predlog (${e.id})`, loc: `Gost je izabrao lokal ${e.id === 'big' ? 'BIG' : 'Centar'}`, sec: null }[e.type]; };
  const feed = ev.slice().reverse().filter(evName).slice(0, 40);

  $('#main').innerHTML = `
  <div class="dh"><div><h1>${rawH >= 6 && rawH < 12 ? 'Dobro jutro' : rawH >= 12 && rawH < 18 ? 'Dobar dan' : 'Dobro veče'}, Ultra Caffe</h1><p>${esc(locName)} · ${lab}<span class="live"><i></i>Uživo</span></p></div>
   <div class="filters"><div class="segm" role="group" aria-label="Lokal">${[['all', 'Oba'], ['centar', 'Centar'], ['big', 'BIG']].map(([k, n]) => `<button data-l="${k}" aria-pressed="${(k === 'all' && LOCS.length === 2) || (LOCS.length === 1 && LOCS[0] === k)}">${n}</button>`).join('')}</div>
   <div class="segm" role="group" aria-label="Period">${[[1, 'Danas'], [7, '7 dana'], [30, '30 dana'], [90, '90 dana']].map(([k, n]) => `<button data-p="${k}" aria-pressed="${P === k}">${n}</button>`).join('')}</div></div></div>

  <section class="sect" id="pregled"><div class="grid">
   ${[['Promet', `${rsd(rev)}<small>RSD</small>`, delta(rev, revP), cur.map(x => x.rev)], ['Gosti', nf(cov), delta(cov, covP), cur.map(x => x.cov)], ['Prosečan račun', `${nf(avg)}<small>RSD</small>`, delta(avg, avgP), cur.map(x => x.tk ? x.rev / x.tk : 0)],
      ['Rezervacije', `${nf(res.length)}`, `<span class="dl up" style="color:var(--krem2)">${Math.round(dig / Math.max(1, res.length) * 100)}% <em>preko digitalnog menija</em></span>`, cur.map((x, i) => resIn([x]).length)]].map(([k, v, d, sp]) => `<div class="panel c3"><div class="kp"><span>${k}</span><b class="num">${v}</b>${d}</div>${P > 1 ? spark(sp, '#CFA670') : ''}</div>`).join('')}
  </div></section>

  <section class="sect" id="prodaja"><h3>Prodaja</h3><div class="grid">
   <div class="panel c8"><div class="ph2"><div><h2>Promet po danima</h2><div class="sub">RSD, ${daysChart.length} dana · pređite preko stubića za detalje</div></div><div class="legend2">${LOCS.map(l => `<span><i style="background:${C[l]}"></i>${l === 'big' ? 'BIG' : 'Centar'}</span>`).join('')}</div></div><div id="cDaily"></div></div>
   <div class="panel c4"><div class="ph2"><div><h2>${late ? 'Juče po satu' : 'Danas po satu'}</h2><div class="sub">${late ? 'juče do zatvaranja' : 'do ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')} · ${rsd(todayRev)} RSD ${lastW ? `(${pct(todayRev, lastW) >= 0 ? '+' : '−'}${Math.abs(pct(todayRev, lastW)).toFixed(0)}% od prošle godine)` : ''}</div></div></div>
     <div class="legend2" style="margin-bottom:8px"><span><i class="ln" style="background:#CFA670;width:16px"></i>${late ? 'Juče' : 'Danas'}</span><span><i class="dash"></i>Isti dan prošle godine</span></div><div id="cHour"></div></div>
   <div class="panel c7"><div class="ph2"><div><h2>Kada dolaze gosti</h2><div class="sub">Prosečan broj gostiju po satu, poslednje 4 nedelje</div></div></div><div id="cHeat" style="overflow-x:auto"></div>
     ${(() => { let best = [0, 0, 0], low = [0, 0, 1e9]; avgGrid.forEach((r, i) => r.forEach((v, j) => { if (v > best[2]) best = [i, j, v]; if (v < low[2] && hrs[j] >= 9 && hrs[j] <= 21) low = [i, j, v]; })); const tot = avgGrid.flat().reduce((a, b) => a + b, 0) || 1, brk = avgGrid.reduce((a, r) => a + r.slice(0, 4).reduce((x, y) => x + y, 0), 0);
       return `<div class="mini" style="margin-top:14px"><div><span>Najjači termin</span><b class="num">${WD[best[0]]} ${String(hrs[best[1]]).padStart(2, '0')}h</b><span>≈ ${best[2]} gostiju na sat</span></div><div><span>Najmirnije</span><b class="num">${WD[low[0]]} ${String(hrs[low[1]]).padStart(2, '0')}h</b><span>≈ ${low[2]} gostiju na sat</span></div><div><span>Doručak 7–11h</span><b class="num">${Math.round(brk / tot * 100)}%</b><span>gostiju u nedelji</span></div></div>`; })()}
     <p class="note">Najjači termini su petak i subota posle 19h. Pre podne radnim danima dominira kafa — dobar trenutak za ponudu doručka uz kafu.</p></div>
   <div class="panel c5"><div class="ph2"><div><h2>Najprodavanija jela</h2><div class="sub">Porcija u periodu · ${lab}</div></div></div>
     <ol class="rank">${top.map((x, i) => `<li><span class="n">${i + 1}</span>${thumb(x.it)}<span class="nm"><b>${esc(x.it.sr)}</b><span class="bar"><i style="width:${f1(x.q / topMx * 100)}%"></i></span></span><span class="v"><b class="num">${nf(x.q)}</b>${rsd(x.rev)} RSD</span></li>`).join('')}</ol></div>
  </div></section>

  <section class="sect" id="jelovnik"><h3>Jelovnik</h3><div class="grid">
   <div class="panel c8"><div class="ph2"><div><h2>Inženjering menija</h2><div class="sub">Svako jelo prema prodaji i zaradi po porciji. Zlatne tačke su preporuke kuće.</div></div></div><div id="cScat"></div>
     <p class="note">Zvezde držite na vrhu menija i u preporukama. Zagonetke imaju dobru zaradu, ali ih gosti retko biraju — njih guramo kroz preporuke u digitalnom meniju i „Savršeno uz”. Zarada je procena (nabavna cena 27–39% od prodajne) dok ne povežemo kasu.</p></div>
   <div class="panel c4"><div class="ph2"><div><h2>Kolači iz vitrine</h2><div class="sub">Komada u periodu</div></div></div>
     <ol class="rank">${cakes.slice(0, 7).map((x, i) => `<li><span class="n">${i + 1}</span>${thumb(x.it)}<span class="nm"><b>${esc(x.it.sr)}</b><span class="bar"><i style="width:${f1(x.q / (cakes[0] || { q: 1 }).q * 100)}%"></i></span></span><span class="v"><b class="num">${nf(x.q)}</b>${rsd(x.rev)} RSD</span></li>`).join('')}</ol></div>
   <div class="panel c6"><div class="ph2"><div><h2>Digitalni meni</h2><div class="sub">Gosti koji su skenirali QR kod na stolu · ${lab}</div></div></div>
     <div class="funnel">${[['Otvorili meni', scans], ['Pogledali bar jedno jelo', opened], ['Rastavili jelo', split], ['Dodali na listu', added], ['Pokazali listu konobaru', shown]].map(([k, v], i) => `<div class="fs"><span>${k}</span><span class="bw"><i style="width:${f1(Math.max(3, v / scans * 100))}%"></i></span><b class="num">${nf(v)}</b><span class="pc">${i ? Math.round(v / scans * 100) + '%' : '100%'}</span></div>`).join('')}</div>
     <p class="note">Gosti koji rastave jelo češće ga i naruče. Najviše se rastavljaju burgeri, porketa i kolači iz vitrine.</p></div>
   <div class="panel c6"><div class="ph2"><div><h2>Uživo sa ovog uređaja</h2><div class="sub">Otvorite <a href="../" style="color:var(--mesing2)">meni</a> ili <a href="../rezervacije/" style="color:var(--mesing2)">rezervacije</a> i vratite se ovde</div></div><button class="btn btn-o btn-s" id="clr">Obriši</button></div>
     <ul class="feed">${feed.length ? feed.map(e => { const d = new Date(e.t); return `<li><span>${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}</span><b style="font-weight:500">${esc(evName(e))}</b></li>`; }).join('') : '<li class="empty" style="display:block;border:0;background:none">Još nema događaja. Otvorite meni na ovom uređaju, rastavite neko jelo i dodajte ga na listu — pojaviće se ovde.</li>'}</ul></div>
  </div></section>

  <section class="sect" id="rezervacije"><h3>Gosti i rezervacije</h3><div class="grid">
   <div class="panel c4"><div class="ph2"><div><h2>Odakle dolaze rezervacije</h2><div class="sub">${nf(res.length)} rezervacija · ${lab}</div></div></div>
     <svg class="ch" viewBox="0 0 400 34" style="margin:4px 0 12px">${(() => { let x = 0; return srcN.map(([k, v, c]) => { const w = v / srcT * 400; const r = `<rect x="${f1(x + 1)}" y="0" width="${f1(Math.max(0, w - 2))}" height="34" rx="6" fill="${c}" data-tip="${k}"/>`; x += w; return r; }).join(''); })()}</svg>
     <div class="legend2" style="display:grid;gap:8px">${srcN.map(([k, v, c]) => `<span style="justify-content:space-between;display:flex"><span><i style="background:${c}"></i>${k}</span><b class="num" style="font-weight:600">${Math.round(v / srcT * 100)}%</b></span>`).join('')}</div></div>
   <div class="panel c4"><div class="ph2"><div><h2>Gosti po zonama</h2><div class="sub">Zbir gostiju sa rezervacijom</div></div></div>${hbars(Object.entries(zoneN).sort((a, b) => b[1] - a[1]).map(([z, v]) => [U.zones[z] ? U.zones[z][0] : z, v]), '#CFA670', nf)}</div>
   <div class="panel c4"><div class="ph2"><div><h2>Pre nego što dođu</h2><div class="sub">Rezervacije u periodu</div></div></div>
     <div class="mini"><div><span>Prosečno osoba</span><b class="num">${(res.reduce((a, r) => a + r.party, 0) / Math.max(1, res.length)).toFixed(1).replace('.', ',')}</b></div><div><span>Proslave</span><b class="num">${res.filter(r => r.occ).length}</b></div><div><span>Nisu došli</span><b class="num">${Math.round(res.length * .055)}</b></div></div>
     <p class="note">Potvrda porukom dan ranije smanjuje broj gostiju koji ne dođu. Proslave dobijaju podsetnik da poruče tortu iz radionice.</p>
     <a class="btn btn-o btn-s" href="../rezervacije/?mod=sala" style="margin-top:6px">${IC.plan}Otvori salu uživo</a></div>
  </div></section>

  <section class="sect" id="recenzije"><h3>Recenzije</h3><div class="grid">
   <div class="panel c4"><div class="kp"><span>Google ocena danas</span><b class="num">${rating.replace('.', ',')}<small>/ 5</small></b><span class="dl">${nf(rvBase)} recenzija na Google mapama</span></div>
     <div class="gloc">${LOCS.map(l => `<a href="https://search.google.com/local/reviews?placeid=${U.google[l].pid}" target="_blank" rel="noopener"><span><i style="background:${C[l]}"></i>${l === 'big' ? 'BIG' : 'Centar'}</span><b class="num">${String(RV[l][0]).replace('.', ',')}</b><small class="num">${nf(RV[l][1])} recenzija</small></a>`).join('')}</div>
     <p class="note">Prave ocene sa Google mapa. Dodirnite lokal da otvorite sve recenzije.</p></div>
   <div class="panel c4"><div class="ph2"><div><h2>TipTap kartice i meni</h2><div class="sub">Procena za ${lab}, uz kartice na stolovima</div></div></div>
     <div class="mini"><div><span>Dodira kartice</span><b class="num">${nf(newRev * 3.4)}</b></div><div><span>Novih recenzija</span><b class="num">${nf(newRev)}</b></div><div><span>Prošle godine, bez kartica</span><b class="num">${nf(newRevP)}</b></div></div>
     <div class="mini" style="margin-top:8px"><div><span>Google recenzija iz menija</span><b class="num">${nf(evC('grev'))}</b></div><div><span>Poruka menadžeru</span><b class="num">${nf(evC('mgr'))}</b></div><div><span>Otvorena ocena</span><b class="num">${nf(evC('rev'))}</b></div></div>
     <p class="note">Gornji red je procena. Donji red broji šta su gosti uradili u meniju na ovom uređaju. Gost uvek bira sam: javna recenzija na Google-u ili privatna poruka menadžeru.</p></div>
   <div class="panel c4"><div class="ph2"><div><h2>O čemu gosti pišu</h2><div class="sub">Teme iz recenzija, bez imena gostiju</div></div></div>
     <div class="topics">${[['Ambijent i uređenje', 'p'], ['Kolači i torte', 'p'], ['Hrana i cene', 'p'], ['Sporija usluga vikendom', 'n'], ['Gorak espresso i cappuccino', 'n']].map(([k, c]) => `<span class="topic ${c}">${c === 'p' ? '▲' : '▼'} ${k}</span>`).join('')}</div>
     <p class="note">Teme iz javnih Google recenzija oba lokala, pregledano u novembru 2026. Kada povežemo profil, teme se osvežavaju same.</p></div>
  </div></section>

  <section class="sect" id="lokali"><h3>Lokali i radionica</h3><div class="grid">
   <div class="panel c6"><div class="ph2"><div><h2>Centar i BIG</h2><div class="sub">${lab}</div></div><div class="legend2"><span><i style="background:${C.centar}"></i>Centar</span><span><i style="background:${C.big}"></i>BIG</span></div></div>
     <div class="cmp">${(() => { const per = {}; ['centar', 'big'].forEach(l => { const s = range(today, P).map(d => M.sales(l, d)); const r = s.reduce((a, x) => a + x.rev, 0), c = s.reduce((a, x) => a + x.covers, 0), t = s.reduce((a, x) => a + x.tickets, 0); per[l] = [r, c, t ? r / t : 0]; });
        return [['Promet', 0, rsd], ['Gosti', 1, nf], ['Prosečan račun', 2, nf]].map(([k, i, fm]) => { const mx = Math.max(per.centar[i], per.big[i]); return `<div class="row2"><span>${k}</span><div class="bars">${['centar', 'big'].map(l => `<div><i style="width:${f1(per[l][i] / mx * 100)}%;background:${C[l]}"></i><span class="num">${fm(per[l][i])}${i !== 1 ? ' RSD' : ''}</span></div>`).join('')}</div></div>`; }).join(''); })()}</div></div>
   <div class="panel c6"><div class="ph2"><div><h2>Torte po porudžbini</h2><div class="sub">Narudžbine za narednih 7 dana · radionica ${esc(U.venue.torte_addr)}</div></div></div>
     <table class="tbl"><thead><tr><th>Dan</th><th class="r">Torti</th><th>Najtraženiji ukusi</th></tr></thead><tbody>${torte.map((x, i) => `<tr><td>${WD[(x.d.getDay() + 6) % 7]} ${x.d.getDate()}. ${MON[x.d.getMonth()]}</td><td class="r">${x.n}</td><td style="color:var(--krem2)">${i < tFlav.length ? esc(tFlav[i][0]) : esc(tFlav[i % tFlav.length][0])}</td></tr>`).join('')}</tbody></table></div>
  </div></section>
  <p class="note" style="margin-top:22px">TipTap demo za Ultra Caffe. Brojevi su primer kako će izgledati vaša uprava — promet i gosti se povezuju sa kasom, rezervacije i digitalni meni rade odmah. Jelovnik i cene su sa ultracaffe.rs.</p>`;

  const draw = () => {
    const w = id => Math.max(280, $(id).clientWidth);
    $('#cDaily').innerHTML = barsDaily(daysChart, w('#cDaily')); $('#cHour').innerHTML = linesHourly(ha, hb, w('#cHour'));
    $('#cHeat').innerHTML = heatmap(avgGrid, hrs, w('#cHeat')); sc = scatter(dishes.slice(0, 70), w('#cScat')); $('#cScat').innerHTML = sc.svg;
    bindTips($('#cDaily'), i => { const x = daysChart[+i]; return `<b>${WD[(x.d.getDay() + 6) % 7]}, ${x.d.getDate()}. ${MON[x.d.getMonth()]}</b>${LOCS.map(l => `<div class="r"><span><i style="background:${C[l]}"></i>${l === 'big' ? 'BIG' : 'Centar'}</span><span class="num">${nf(x.by[l] || 0)}</span></div>`).join('')}<div class="r"><span>Ukupno</span><b class="num" style="display:inline">${nf(x.rev)} RSD</b></div><div class="r"><span>Gosti</span><span class="num">${nf(x.cov)}</span></div>`; });
    bindTips($('#cHour'), i => { const h = hb[+i], a = ha[+i]; return `<b>${String(h.h).padStart(2, '0')}:00–${String((h.h + 1) % 24).padStart(2, '0')}:00</b><div class="r"><span><i style="background:#CFA670"></i>${late ? 'Juče' : 'Danas'}</span><span class="num">${a ? nf(a.rev) : '—'}</span></div><div class="r"><span><i style="background:rgba(233,226,214,.55)"></i>Prošle godine</span><span class="num">${nf(h.rev)}</span></div>`; });
    bindTips($('#cHeat'), k => { const [i, j] = k.split('|').map(Number); return `<b>${WD[i]}, ${String(hrs[j]).padStart(2, '0')}h</b><div class="r"><span>Prosečno gostiju</span><span class="num">${avgGrid[i][j]}</span></div>`; });
    const scRows = dishes.slice(0, 70); bindTips($('#cScat'), i => { const x = scRows[+i]; const q = x.q >= sc.medQ, m = x.margin >= sc.medM; return `<b>${esc(x.it.sr)}</b><div class="r"><span>Prodato</span><span class="num">${nf(x.q)} porcija</span></div><div class="r"><span>Zarada po porciji</span><span class="num">${nf(x.margin)} RSD</span></div><div class="r"><span>Grupa</span><span>${q && m ? 'Zvezda' : q ? 'Radni konj' : m ? 'Zagonetka' : 'Za preispitivanje'}</span></div>`; });
  };
  let sc; draw(); window.__ucDraw = draw;
  // događaji
  $$('[data-l]').forEach(b => b.onclick = () => { LOCS = b.dataset.l === 'all' ? ['centar', 'big'] : [b.dataset.l]; render(); });
  $$('[data-p]').forEach(b => b.onclick = () => { P = +b.dataset.p; render(); });
  const cl = $('#clr'); if (cl) cl.onclick = () => { try { localStorage.removeItem('uc_ev'); } catch (e) { } render(); };
  bindTips($('#rezervacije'), k => { const s = srcN.find(x => x[0] === k); return s ? `<b>${k}</b><div class="r"><span>Rezervacija</span><span class="num">${nf(s[1])}</span></div>` : ''; });
}

// ---------------------------------------------------------------- ljuska
function shell() {
  document.body.classList.add('upr');
  $('#app').innerHTML = `<div class="shell"><aside class="side"><img src="../img/logo.webp" alt="Ultra Caffe">
    ${[['pregled', 'Pregled', IC.home], ['prodaja', 'Prodaja', IC.cash], ['jelovnik', 'Jelovnik', IC.menu], ['rezervacije', 'Gosti i rezervacije', IC.cal], ['recenzije', 'Recenzije', IC.star], ['lokali', 'Lokali i torte', IC.pin]].map(([id, n, ic], i) => `<a href="#${id}" class="${i ? '' : 'on'}">${ic}${n}</a>`).join('')}
    <div class="bt">TipTap demo za Ultra Caffe.<br><a href="../">Digitalni meni</a> · <a href="../rezervacije/">Rezervacije</a></div></aside>
   <div><header class="mtop"><img src="../img/logo.webp" alt="Ultra Caffe"><span class="sp"></span><span class="who"><i>UC</i>Vlasnik</span></header><main class="main" id="main"></main></div></div>`;
  const links = $$('.side a[href^="#"]');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-30% 0px -60% 0px' });
  render(); $$('.sect').forEach(s => io.observe(s));
  addEventListener('storage', e => { if (e.key === 'uc_ev' || e.key === 'uc_myres' || e.key === 'uc_resdec') render(); });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => window.__ucDraw && window.__ucDraw(), 180); });
}
function demoBadge() {
  const b = document.createElement('button'); b.className = 'demo'; b.innerHTML = '<i></i><span class="sh-t">TipTap demo</span><span class="lg-t">TipTap demo za Ultra Caffe</span>'; document.body.appendChild(b);
  const p = document.createElement('div'); p.className = 'demo-p'; p.innerHTML = `<h4>TipTap demo za Ultra Caffe</h4><p>Tri dela istog sistema. Ono što gost uradi u meniju i rezervacijama na ovom uređaju pojavljuje se ovde u delu „Uživo”.</p>
   <nav><a href="../">${IC.menu}<span><b>Digitalni meni</b><span>Ono što gost vidi za stolom</span></span></a><a href="../rezervacije/">${IC.plan}<span><b>Rezervacije i tlocrt</b><span>Gost bira sto, hostesa vodi salu</span></span></a><a class="cur" href="./">${IC.chart}<span><b>Uprava i analitika</b><span>Promet, gosti, jelovnik, recenzije</span></span></a></nav>
   <footer>Promet, gosti i rezervacije su demo podaci. Google ocene su prave. Napravio TipTap.</footer>`;
  document.body.appendChild(p); b.onclick = e => { e.stopPropagation(); p.classList.toggle('on'); }; document.addEventListener('click', e => { if (!p.contains(e.target)) p.classList.remove('on'); });
}
demoBadge(); shell();
})();
