/* =====================================================================
   ULTRA CAFFE · demo podaci (rezervacije, promet, recenzije)
   Sve je izmišljeno i deterministično (isti dan = isti podaci), osim
   jelovnika i cena koji dolaze iz data.js.
   ===================================================================== */
(function () {
'use strict';
const U = window.UC;
function rng(seed) { let s = (seed >>> 0) || 1; return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const hash = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const dkey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const day0 = (d = new Date()) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const addD = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

const FIRST = ['Marko', 'Jelena', 'Nikola', 'Milica', 'Stefan', 'Ana', 'Luka', 'Teodora', 'Nemanja', 'Jovana', 'Miloš', 'Marija', 'Vuk', 'Katarina', 'Dušan', 'Ivana', 'Aleksandar', 'Sara', 'Filip', 'Nina', 'Uroš', 'Tamara', 'Vladimir', 'Dragana', 'Ognjen', 'Sanja', 'Bojan', 'Maja', 'Petar', 'Kristina', 'Igor', 'Snežana', 'Đorđe', 'Andrea', 'Mihajlo', 'Vesna'];
const LAST = 'ABČĆDĐFGIJKLMNOPRSŠTVZŽ';
const OCC = [['', 70], ['Rođendan', 9], ['Poslovni ručak', 7], ['Godišnjica', 4], ['Proslava', 5], ['Prvi sastanak', 2], ['Porodični ručak', 3]];
const NOTES = ['', '', '', '', 'Sto uz prozor ako može', 'Dolaze sa bebom, treba stolica', 'Bez glutena za jednu osobu', 'Torta je naručena u radionici', 'Kasnimo 10 min', 'Tiši deo sale', 'Alergija na orašaste plodove'];
const pick = (R, arr) => arr[Math.floor(R() * arr.length)];
const wpick = (R, arr) => { const tot = arr.reduce((a, b) => a + b[1], 0); let x = R() * tot; for (const a of arr) { x -= a[1]; if (x <= 0) return a[0]; } return arr[0][0]; };

// potražnja po satu (0–24) za kafić-restoran u centru grada
const DEMAND = { 7: .25, 8: .5, 9: .62, 10: .66, 11: .6, 12: .62, 13: .78, 14: .74, 15: .55, 16: .5, 17: .58, 18: .72, 19: .9, 20: 1, 21: .96, 22: .8, 23: .56, 0: .3 };
const WDAY = [.86, .88, .92, .97, 1.18, 1.3, 1.02]; // pon..ned

function tablesOf(loc) { const L = U.locs.find(l => l.id === loc); const out = []; L.floors.forEach(f => f.tables.forEach(t => out.push(Object.assign({ floor: f.id }, t)))); return out; }

// rezervacije za lokal i dan; RES_RATE = koliko često se sto rezerviše (većina gostiju dolazi bez rezervacije)
const RES_RATE = .4;
const RESP = { 7: .02, 8: .03, 9: .05, 10: .06, 11: .08, 12: .2, 13: .3, 14: .26, 15: .12, 16: .1, 17: .18, 18: .42, 19: .85, 20: 1, 21: .78, 22: .38, 23: .1, 0: .02 }; // rezervacije su uglavnom za ručak i veče
function reservations(loc, date) {
  const d = day0(date), key = dkey(d), R = rng(hash(loc + key)), wd = (d.getDay() + 6) % 7, L = U.locs.find(l => l.id === loc);
  const [o, c] = L.open[wd]; const tbs = tablesOf(loc).filter(t => t.zone !== 'sank');
  const out = []; let n = 0;
  tbs.forEach(t => {
    let tm = o + 1 + R() * 2.5; // prvi termin
    const isTer = t.zone === 'terasa', month = d.getMonth(), terOK = !isTer || (month >= 3 && month <= 9) || R() < .15;
    if (!terOK) return;
    while (tm < c - 1.4) {
      const hr = Math.floor(tm) % 24, p = (RESP[hr] || .02) * WDAY[wd] * (t.zone === 'separe' || t.zone === 'banketi' ? 1.15 : 1) * RES_RATE;
      if (R() < p) {
        const dur = t.seats >= 6 ? 2.5 : t.seats >= 4 ? 2 : 1.5, start = Math.round(tm * 2) / 2;
        if (start + dur > c + .5) break;
        const party = Math.max(t.min || 1, Math.min(t.seats, Math.round(t.seats * (.55 + R() * .5))));
        out.push({ id: `${loc}-${key}-${++n}`, loc, table: t.id, floor: t.floor, zone: t.zone, start, end: start + dur, party,
          name: `${pick(R, FIRST)} ${LAST[Math.floor(R() * LAST.length)]}.`, phone: `06${Math.floor(R() * 5) + 0} ${String(Math.floor(R() * 900) + 100)} ${String(Math.floor(R() * 9000) + 1000)}`,
          occ: wpick(R, OCC), note: pick(R, NOTES), src: wpick(R, [['Digitalni meni', 46], ['Telefon', 30], ['Instagram', 14], ['Uživo', 10]]) });
        tm = start + dur + .5 + R() * 1.5;
      } else tm += .5 + R() * 1.2;
    }
  });
  // zahtevi koji čekaju potvrdu hostese: po dva danas (samo budući termini) i sutra; odluke hostese sa ovog uređaja
  const dd = Math.round((d - day0()) / 864e5), now = new Date(), nowH = now.getHours() + now.getMinutes() / 60, RP = rng(hash('p' + loc + key));
  let dec = {}; try { dec = JSON.parse(localStorage.getItem('uc_resdec') || '{}'); } catch (e) { }
  let np = 0;
  out.forEach(r => {
    const x = RP(), y = RP(); r.st = 'ok';
    if ((dd === 0 || dd === 1) && np < 2 && x < .3 && (r.src === 'Digitalni meni' || r.src === 'Instagram') && (dd > 0 || r.start > nowH + .75)) { r.st = 'pending'; r.ago = 2 + Math.floor(y * 38); np++; }
    const v = dec[r.id] && dec[r.id].v; if (v) { r.st = v; r.by = 'host'; }
  });
  const kept = out.filter(r => r.st !== 'no');
  // lične rezervacije napravljene na ovom uređaju (demo); odbijene se ne vide u sali
  try { const mine = JSON.parse(localStorage.getItem('uc_myres') || '[]'); mine.filter(m => m.loc === loc && m.date === key && m.st !== 'no').forEach(m => kept.push(Object.assign({ mine: 1 }, m, { st: m.st || 'ok' }))); } catch (e) { }
  return kept.sort((a, b) => a.start - b.start);
}
// status rezervacije u trenutku h (sati od ponoći, decimalno), za danas
function status(r, h, R) {
  if (h >= r.end) return r.noshow ? 'noshow' : 'done';
  if (h >= r.start) return r.noshow ? 'noshow' : 'seated';
  if (r.start - h <= 1) return 'soon';
  return 'booked';
}
// ---------------------------------------------------------------- veličina lokala
// Za novi lokal menja se samo ovaj blok (ako vlasnik da okvirne brojke, upišu se ovde):
//   peak  = gostiju na sat u najjačem terminu (petak i subota uveče)
//   spend = prosečna potrošnja po gostu u glavnom delu dana, RSD (jutro je jeftinije, kasno uveče nešto manje)
// Ultra Caffe: Centar 185 mesta (≈ 360 gostiju dnevno), BIG 118 mesta (≈ 270 gostiju dnevno),
// prosečno ≈ 1.000 RSD po gostu i ≈ 2.100 RSD po računu.
const SIZE = { centar: { peak: 32, spend: 1200 }, big: { peak: 24, spend: 1100 } };
const GROWTH = { guests: .045, prices: .05 }; // rast godišnje (gosti, cene); uprava poredi sa istim periodom prošle godine
// promet po satu za lokal i dan (demo)
function sales(loc, date) {
  const d = day0(date), key = dkey(d), R = rng(hash('s' + loc + key)), wd = (d.getDay() + 6) % 7, L = U.locs.find(l => l.id === loc), S = SIZE[loc] || { peak: 25, spend: 1000 };
  const [o, c] = L.open[wd], month = d.getMonth(), season = [.9, .88, .94, 1, 1.06, 1.1, 1.08, 1.04, 1.06, 1.02, .97, 1.12][month];
  const yrs = (d - new Date(2026, 0, 1)) / 864e5 / 365, price = 1 + yrs * GROWTH.prices;
  const trend = (1 + yrs * GROWTH.guests) * (.94 + rng(hash('dan' + key))() * .12); // dan ima svoj karakter (vreme, događaji)
  const hours = []; let rev = 0, cov = 0, tickets = 0;
  for (let h = o; h < c; h++) {
    const hr = h % 24, base = (DEMAND[hr] || .25) * WDAY[wd] * season * trend * S.peak * (.86 + R() * .28);
    const covers = Math.round(base), avg = S.spend * price * ((hr >= 7 && hr < 11) ? .48 : (hr >= 21 || hr < 2) ? .82 : 1) * (.92 + R() * .16);
    const r = Math.round(covers * avg); hours.push({ h: hr, covers, rev: r }); rev += r; cov += covers; tickets += Math.round(covers / (1.8 + R() * .7));
  }
  return { date: key, wd, rev, covers: cov, tickets, hours };
}
// prodaja jela za period (raspodela po popularnosti)
function itemSales(loc, from, days) {
  const all = U.items.concat(U.kolaci.filter(k => k.price < 1000)), R = rng(hash('i' + loc + dkey(from) + days));
  const w = all.map(it => { let x = .4 + R() * .9; if (it.sig) x *= 2.4; if (it.img && it.img.length) x *= 1.25; if (['burgeri', 'pica', 'dorucak'].includes(it.cat)) x *= 1.5; if (it.cat === 'kolaci') x *= 1.35; if (it.cat === 'salate') x *= .7; if (loc === 'big' && ['pica', 'burgeri', 'slatke-palacinke'].includes(it.cat)) x *= 1.3; return x; });
  const tw = w.reduce((a, b) => a + b, 0); let covers = 0; for (let i = 0; i < days; i++) covers += sales(loc, addD(from, i)).covers;
  const portions = covers * 0.92;
  return all.map((it, i) => { const q = Math.round(portions * w[i] / tw); const cost = it.price * (.27 + (hash(it.id) % 13) / 100); return { id: it.id, it, q, rev: q * it.price, margin: it.price - cost }; }).sort((a, b) => b.q - a.q);
}
window.UCM = { rng, hash, dkey, day0, addD, reservations, status, sales, itemSales, tablesOf, DEMAND, SIZE };
})();
