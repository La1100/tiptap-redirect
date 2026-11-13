/* TipTap × BHT — mjesečni izvještaj za direktore i Google ocjene lokala.
   GET  /api/group/report?month=YYYY-MM   izvještaj (PIN direktora, ista zaštita kao pregled grupe)
   POST /api/group/google                 ručno očitanje Google ocjene { venue, rating, count, date? }

   Podaci su iz iste baze kao ostatak sustava (lib/tt/core.cjs):
     v/<lokal>/st/<dan>/<0–7>   statistika cjenika: otvaranja, dodiri na stolu, ocjene r1–r5, Google, pregledi pića
     v/<lokal>/live/<dan>       ponude sa stolova (obavijest voditelju) i vrijeme do "Konobar ide"
     v/<lokal>/fb/<mjesec>      ocjene 1–4 ★ i poruke gostiju
     v/<lokal>/google           očitanja Google ocjene: automatski (GOOGLE_PLACES_KEY, Places API) ili ručno
   Polazno stanje na Googleu je dan potpisivanja ugovora (13. 11. 2026.). */
'use strict';
const TT = require('./core.cjs');
const C = TT.core;

const START = '2026-11';                 // prvi mjesec u sustavu
const BASE_DATE = '2026-11-13';
const BASELINE = {                       // Google Maps, 13. 11. 2026.
  qclub: { rating: 3.3, count: 191 }, kafanica: { rating: 4.2, count: 309 },
  bure: { rating: 4.2, count: 404 }, brooklyn: { rating: 4.3, count: 1425 }
};
const PLACES = {                         // isti place_id kao u linku za Google recenziju u cjeniku
  qclub: 'ChIJlZzV77vnXEcRh_R-XFf2EVg', kafanica: 'ChIJN5jo34DnXEcRsG7i1Ptmfnc',
  bure: 'ChIJWxbJXXfnXEcRnTXRUhZlR9s', brooklyn: 'ChIJBflU3KbnXEcRuQGecAM-oPs'
};
const K = ['open', 'table', 'review', 'r1', 'r2', 'r3', 'r4', 'r5'];

const lastDay = m => { const [y, mo] = m.split('-').map(Number); return `${m}-${String(new Date(Date.UTC(y, mo, 0)).getUTCDate()).padStart(2, '0')}`; };
const nextMonth = m => { const [y, mo] = m.split('-').map(Number); return mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, '0')}`; };
function monthsUntil(cur) { const out = []; for (let m = START; m <= cur && out.length < 120; m = nextMonth(m)) out.push(m); return out; }

/* ---------- Google ocjena ---------- */
function addSnap(hist, x) {
  const out = hist.filter(h => h.date !== x.date);
  out.push(x); out.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  return out.slice(-400);
}
async function fetchPlace(key, id) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4000);
  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`, { headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount' }, signal: ctl.signal });
    if (!r.ok) return null;
    const j = await r.json();
    return typeof j.rating === 'number' ? { rating: Math.round(j.rating * 10) / 10, count: Math.max(0, j.userRatingCount | 0) } : null;
  } catch { return null; } finally { clearTimeout(t); }
}
async function google(store, v, env) {
  const key = `v/${v}/google`;
  const r = await store.getJSON(key);
  let hist = (r && r.data && Array.isArray(r.data.hist)) ? r.data.hist : [];
  if (env.GOOGLE_PLACES_KEY && PLACES[v]) {            // automatski, najviše jednom u 12 sati
    const last = hist.filter(h => h.src === 'auto').slice(-1)[0];
    if (!last || Date.now() - Date.parse(last.at || 0) > 12 * 3600e3) {
      const g = await fetchPlace(env.GOOGLE_PLACES_KEY, PLACES[v]);
      if (g) {
        hist = addSnap(hist, { date: C.zagrebNow().date, rating: g.rating, count: g.count, src: 'auto', at: new Date().toISOString() });
        await store.setJSON(key, { hist }, r ? r.etag : 'new').catch(() => false);
      }
    }
  }
  return { base: { date: BASE_DATE, ...BASELINE[v] }, hist: hist.map(({ date, rating, count, src }) => ({ date, rating, count, src })) };
}
async function setGoogle(store, body) {
  const v = String(body.venue || '');
  if (!C.isVenue(v)) return { error: 'venue', status: 400 };
  const rating = Number(String(body.rating).replace(',', '.')), count = Math.floor(Number(body.count));
  if (!(rating >= 1 && rating <= 5) || !(count >= 0 && count < 1e6)) return { error: 'value', status: 400 };
  const date = C.isDate(body.date) ? body.date : C.zagrebNow().date;
  const key = `v/${v}/google`;
  for (let i = 0; i < 5; i++) {
    const r = await store.getJSON(key);
    const hist = addSnap((r && r.data && r.data.hist) || [], { date, rating: Math.round(rating * 10) / 10, count, src: 'rucno', at: new Date().toISOString() });
    if (await store.setJSON(key, { hist }, r ? r.etag : 'new')) return { ok: true };
  }
  return { error: 'busy', status: 503 };
}

/* ---------- jedan lokal u mjesecu ---------- */
async function venueMonth(store, v, month, days, env) {
  const cfg = await C.getConfig(C.scoped(store, v));
  const [st, live, fb, g] = await Promise.all([
    store.list(`v/${v}/st/${month}-*`), store.list(`v/${v}/live/${month}-*`), store.getJSON(`v/${v}/fb/${month}`), google(store, v, env)
  ]);
  const byDay = Object.fromEntries(days.map(d => [d, Object.fromEntries(K.map(k => [k, 0]))]));
  const view = {}, names = {};
  for (const { k, v: doc } of st) {
    const x = byDay[k.split('/')[3]]; if (!x || !doc) continue;
    for (const key of K) x[key] += +doc[key] || 0;
    for (const [id, n] of Object.entries(doc.view || {})) view[id] = (view[id] || 0) + (+n || 0);
    Object.assign(names, doc.names || {});
  }
  const total = Object.fromEntries(K.map(k => [k, days.reduce((a, d) => a + byDay[d][k], 0)]));
  const top = Object.entries(view).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, n]) => ({ name: names[id] || id, n }));

  // ponude sa stolova: koliko ih je bilo i koliko je prošlo do "Konobar ide"
  const calls = live.flatMap(r => (Array.isArray(r.v) ? r.v : [])).filter(x => x && x.kind === 'call');
  const acks = calls.filter(x => x.ackAt).map(x => (Date.parse(x.ackAt) - Date.parse(x.createdAt)) / 1000).filter(s => s >= 0 && s < 7200).sort((a, b) => a - b);
  const offerN = {};
  calls.forEach(x => { const n = String(x.note || '').split(' · ')[0].trim() || 'Ponuda za stol'; offerN[n] = (offerN[n] || 0) + 1; });

  // ocjene 1–4 ★ i poruke gostiju (bez teksta i kontakata — izvještaj ide direktorima kao sažetak)
  const list = (fb && Array.isArray(fb.data)) ? fb.data : [];
  const rated = list.filter(x => x.stars);
  const topics = {}; list.forEach(x => { topics[x.topic || 'ostalo'] = (topics[x.topic || 'ostalo'] || 0) + 1; });

  return {
    id: v, name: cfg.venue, offersOn: !!(cfg.features && cfg.features.tableMode),
    days: days.map(d => ({ date: d, ...byDay[d] })), total, top,
    offers: {
      n: calls.length, acked: acks.length, done: calls.filter(x => x.status === 'done').length,
      avgAck: acks.length ? Math.round(acks.reduce((a, s) => a + s, 0) / acks.length) : null,
      medAck: acks.length ? Math.round(acks[Math.floor((acks.length - 1) / 2)]) : null,
      top: Object.entries(offerN).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name, n]) => ({ name, n }))
    },
    feedback: {
      n: list.length, rated: rated.length, withPhone: list.filter(x => x.contact).length, done: list.filter(x => x.done).length,
      topics, stars: [1, 2, 3, 4].map(s => rated.filter(x => x.stars === s).length)
    },
    google: g
  };
}

async function monthReport(store, month, env = {}) {
  if (typeof store.list !== 'function') return { error: 'nolist', status: 501 };
  const biz = C.bizNow(), cur = biz.date.slice(0, 7);
  if (!/^\d{4}-\d{2}$/.test(month || '') || month < START || month > cur) month = cur < START ? START : cur;
  const end = month === cur ? biz.date : lastDay(month);
  const days = [];
  for (let d = `${month}-01`; d <= end && days.length < 31; d = C.addDays(d, 1)) days.push(d);
  const venues = await Promise.all(C.VENUE_IDS.map(v => venueMonth(store, v, month, days, env)));
  return { ok: true, month, from: days[0] || `${month}-01`, to: end, partial: month === cur, months: monthsUntil(cur < START ? START : cur), now: C.zagrebNow(), generatedAt: new Date().toISOString(), googleAuto: !!env.GOOGLE_PLACES_KEY, venues };
}

module.exports = { monthReport, setGoogle, BASELINE, BASE_DATE, PLACES };
