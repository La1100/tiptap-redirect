window.TT_CFG={"mode": "demo", "venue": "kosnica", "slug": "kosnica", "name": "Košnica", "address": "Karađorđeva 14, Šabac", "phone": "+381 66 53 99 999", "features": {"reservations": true, "preorder": false, "tableMode": true, "bill": true, "orders": true, "songs": false}, "page": "menu", "ev": {"hr": "Svirka uživo od 22h", "en": "Live music from 10 pm", "from": "22:00"}};
(function () {
"use strict";
const __m = {};
__m["venues"] = (function () {
/* =====================================================================
   TIPTAP SIGNATURE — Košnica Gastro Pub (Šabac): zadane postavke
   Sve se kasnije menja u upravi (Podešavanja) — ovo su samo početne vrednosti.
   Raspored stolova je OKVIRAN (platno 1000 × 640) dok ne dobijemo skicu lokala.
   Ključ jezika 'hr' = lokalni jezik (ovde srpski, latinica); 'en' = engleski.
   ===================================================================== */

const H = (from, to) => ({ from, to });

const KOSNICA = {
  venue: 'Košnica',
  forms: { loc: 'u Košnici', gen: 'iz Košnice' },
  phone: '+381 66 53 99 999',
  plan: {
    w: 1000, h: 640,
    walls: [
      { type: 'bar', x: 40, y: 34, w: 360, h: 70, label: 'ŠANK' },
      { type: 'stage', x: 760, y: 30, w: 200, h: 84, label: 'SVIRKA' },
      { type: 'door', x: 430, y: 610, w: 140, h: 26, label: 'ULAZ' },
      { type: 'wc', x: 34, y: 540, w: 104, h: 76, label: 'WC' }
    ]
  },
  zones: [
    { id: 'sala', name: { hr: 'Sala', en: 'Main room' } },
    { id: 'separe', name: { hr: 'Separei', en: 'Booths' } },
    { id: 'sank', name: { hr: 'Uz šank', en: 'By the bar' } },
    { id: 'svirka', name: { hr: 'Uz svirku', en: 'By the music' } }
  ],
  tables: [
    { id: 'B1', zone: 'sank', shape: 'high', x: 90, y: 160, r: 20, min: 1, max: 3 },
    { id: 'B2', zone: 'sank', shape: 'high', x: 200, y: 160, r: 20, min: 1, max: 3 },
    { id: 'B3', zone: 'sank', shape: 'high', x: 310, y: 160, r: 20, min: 1, max: 3 },
    { id: 'M1', zone: 'svirka', shape: 'round', x: 700, y: 190, r: 30, min: 2, max: 4 },
    { id: 'M2', zone: 'svirka', shape: 'round', x: 840, y: 190, r: 30, min: 2, max: 4 },
    { id: '1', zone: 'sala', shape: 'rect', x: 260, y: 290, w: 96, h: 60, min: 2, max: 4 },
    { id: '2', zone: 'sala', shape: 'rect', x: 420, y: 290, w: 96, h: 60, min: 2, max: 4 },
    { id: '3', zone: 'sala', shape: 'rect', x: 580, y: 290, w: 96, h: 60, min: 2, max: 4 },
    { id: '4', zone: 'sala', shape: 'rect', x: 260, y: 420, w: 96, h: 60, min: 2, max: 4 },
    { id: '5', zone: 'sala', shape: 'rect', x: 420, y: 420, w: 96, h: 60, min: 2, max: 4 },
    { id: '6', zone: 'sala', shape: 'rect', x: 580, y: 420, w: 96, h: 60, min: 2, max: 4 },
    { id: '7', zone: 'sala', shape: 'long', x: 300, y: 540, w: 200, h: 60, min: 4, max: 8 },
    { id: 'S1', zone: 'separe', shape: 'booth', x: 900, y: 320, w: 140, h: 96, rot: 90, min: 4, max: 6 },
    { id: 'S2', zone: 'separe', shape: 'booth', x: 900, y: 480, w: 140, h: 96, rot: 90, min: 4, max: 6 },
    { id: 'S3', zone: 'separe', shape: 'booth', x: 740, y: 560, w: 150, h: 90, rot: 180, min: 4, max: 8, vip: true }
  ],
  // termini za rezervacije (lokal radi pon–sre 08–00, čet 08–01, pet–sub 08–02, ned 10–00)
  hours: { 0: H('12:00', '22:00'), 1: H('12:00', '22:00'), 2: H('12:00', '22:00'), 3: H('12:00', '22:00'), 4: H('12:00', '22:30'), 5: H('12:00', '23:00'), 6: H('12:00', '23:00') },
  slotMinutes: 30,
  durationMinutes: 150,
  leadMinutes: 60,
  daysAhead: 30,
  maxParty: 20,
  holdMinutes: 20,
  closedDates: [],
  autoConfirm: false,
  rules: {
    hr: 'Petkom i subotom od 22h svirka uživo — stolovi uz svirku se najbrže popune.',
    en: 'Live music on Fridays and Saturdays from 10 pm — tables by the music fill up first.'
  },
  features: { reservations: true, preorder: false, tableMode: true, bill: true, orders: true, songs: false }
};

/** id → zadane postavke. */
const VENUES = { kosnica: KOSNICA };
const VENUE_IDS = Object.keys(VENUES);
const isVenue = v => Object.prototype.hasOwnProperty.call(VENUES, v);

return { VENUES, VENUE_IDS, isVenue };
})();
__m["core"] = (function () {
/* =====================================================================
   TIPTAP SIGNATURE (Košnica) — poslovna logika (radi i na serveru i u pregledniku)
   Rezervacije · stol uživo (konobar, račun, narudžba, pjesma) ·
   anonimne poruke · upravljanje cjenikom · statistika · pregled grupe.
   Vrijeme: Europe/Zagreb. Termini su minute od ponoći "poslovnog dana"
   (može biti > 1440, npr. 00:30 iza ponoći = 1470).
   Pohrana: store = { getJSON(key) → {data, etag}|null,
                      setJSON(key, val, etag|null|'new') → boolean }
   ===================================================================== */
const { VENUES, VENUE_IDS, isVenue } = __m["venues"];

const TZ = 'Europe/Zagreb';

/* ---------- vrijeme (sat se može zamijeniti — demo prezentacija) ---------- */
let clockFn = null;
function setClock(fn) { clockFn = fn; }
function zagrebNow() {
  if (clockFn) return clockFn();
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date()).map(x => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, min: (+p.hour) * 60 + (+p.minute) };
}
/** Poslovni dan: do 06:00 ujutro još traje jučerašnja večer. */
function bizNow() { const n = zagrebNow(); return n.min < 360 ? { date: addDays(n.date, -1), min: n.min + 1440 } : n; }
const toMin = s => { const [h, m] = String(s).split(':').map(Number); return h * 60 + m; };
const fmt = m => { const x = ((m % 1440) + 1440) % 1440; return String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0'); };
const weekday = d => new Date(d + 'T12:00:00Z').getUTCDay();
const addDays = (d, n) => { const t = new Date(d + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
const isDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d + 'T12:00:00Z'));
const isoNow = () => new Date().toISOString();

/* ---------- nasumični id-jevi (Web Crypto: Node 19+ i svi preglednici) ---------- */
function rbytes(n) { const a = new Uint8Array(n); globalThis.crypto.getRandomValues(a); return a; }
const token = (n = 16) => Array.from(rbytes(n), b => b.toString(16).padStart(2, '0')).join('');
function shortCode() { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s = ''; for (const x of rbytes(6)) s += A[x % A.length]; return s; }
function safeEqual(a, b) {
  a = String(a ?? ''); b = String(b ?? '');
  let d = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return d === 0;
}
const str = (v, n) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);
const num = (v, lo, hi) => { const x = Number(v); return Number.isFinite(x) && x >= lo && x <= hi ? x : null; };
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------- pohrana po lokalu ---------- */
function scoped(store, venue) {
  const p = `v/${venue}/`;
  return { venue, getJSON: k => store.getJSON(p + k), setJSON: (k, v, c) => store.setJSON(p + k, v, c) };
}
/** Atomarna izmjena dokumenta (optimistic concurrency, 6 pokušaja). fn(doc) mijenja doc ili vraća {error}. */
async function mutate(store, key, empty, fn) {
  for (let i = 0; i < 6; i++) {
    const r = await store.getJSON(key);
    const doc = r?.data ?? (typeof empty === 'function' ? empty() : structuredClone(empty));
    const res = await fn(doc);
    if (res && res.error) return res;
    if (res && res.noop) return res;
    const ok = await store.setJSON(key, doc, r?.etag ?? 'new');
    if (ok) return res || { ok: true };
    await wait(30 + Math.random() * 90);
  }
  return { error: 'busy', status: 503 };
}
async function read(store, key, empty) { const r = await store.getJSON(key); return r?.data ?? structuredClone(empty); }

/* =====================================================================
   POSTAVKE LOKALA
   ===================================================================== */
async function getConfig(store) {
  const def = VENUES[store.venue];
  const r = await store.getJSON('config');
  return r?.data ? { ...structuredClone(def), ...r.data, forms: def.forms, features: { ...def.features, ...(r.data.features || {}) } } : structuredClone(def);
}
function publicConfig(cfg) {
  const { venue, forms, phone, plan, zones, tables, hours, slotMinutes, durationMinutes, leadMinutes, daysAhead, maxParty, holdMinutes, closedDates, rules, autoConfirm, features } = cfg;
  return { venue, forms, phone, plan, zones, tables, hours, slotMinutes, durationMinutes, leadMinutes, daysAhead, maxParty, holdMinutes, closedDates, rules, autoConfirm, features };
}

/* =====================================================================
   REZERVACIJE
   ===================================================================== */
function slotsFor(cfg, date) {
  if ((cfg.closedDates || []).includes(date)) return [];
  const h = cfg.hours[weekday(date)];
  if (!h) return [];
  const from = toMin(h.from); let to = toMin(h.to);
  if (to < from) to += 1440;
  const out = [];
  for (let m = from; m <= to; m += cfg.slotMinutes) out.push(m);
  return out;
}
const ACTIVE = new Set(['pending', 'confirmed', 'seated']);
const overlaps = (a0, a1, b0, b1) => a0 < b1 && b0 < a1;
function tableFree(cfg, list, tableId, start, ignoreId) {
  const end = start + cfg.durationMinutes;
  return !list.some(r => r.tableId === tableId && ACTIVE.has(r.status) && r.id !== ignoreId && overlaps(start, end, r.start, r.end));
}
const fits = (t, party) => party >= (t.min || 1) && party <= t.max;
function bestTable(cfg, list, party, start) {
  return cfg.tables.filter(t => fits(t, party) && tableFree(cfg, list, t.id, start))
    .sort((a, b) => (a.max - b.max) || ((a.vip ? 1 : 0) - (b.vip ? 1 : 0)))[0] || null;
}
function cleanPhone(p) {
  let s = String(p || '').replace(/[^\d+]/g, '');
  if (s.startsWith('00')) s = '+' + s.slice(2);
  if (s.startsWith('0')) s = '+381' + s.slice(1);
  if (!s.startsWith('+')) s = '+' + s;
  return /^\+\d{8,15}$/.test(s) ? s : null;
}
const dayKey = d => `res/${d}`;
async function readDay(store, date) { const r = await store.getJSON(dayKey(date)); return { list: r?.data || [], etag: r?.etag || null }; }
const mutateDay = (store, date, fn) => mutate(store, dayKey(date), [], fn);
async function setIndex(store, id, date) { await store.setJSON(`idx/${id}`, { date }, null); }
async function findDate(store, id) { const r = await store.getJSON(`idx/${id}`); return r?.data?.date || null; }

/** Narudžba boca uz rezervaciju: [{id, name, vol, eur, qty}] (cijene iz cjenika; potvrđuje osoblje). */
function cleanPreorder(list) {
  if (!Array.isArray(list)) return [];
  return list.slice(0, 8).map(x => ({ id: str(x.id, 80), name: str(x.name, 80), vol: str(x.vol, 16), eur: num(x.eur, 0, 1000000) ?? 0, qty: Math.floor(num(x.qty, 1, 10) ?? 1) }))
    .filter(x => x.name);
}
const preorderTotal = r => (r.preorder || []).reduce((a, x) => a + x.eur * x.qty, 0);

async function availability(store, date) {
  const cfg = await getConfig(store);
  const { list } = await readDay(store, date);
  const now = zagrebNow();
  let slots = slotsFor(cfg, date);
  if (date === now.date) slots = slots.filter(m => m >= now.min + cfg.leadMinutes);
  const busy = list.filter(r => ACTIVE.has(r.status)).map(r => ({ t: r.tableId, s: r.start, e: r.end }));
  return { date, slots, busy, config: publicConfig(cfg), today: now.date };
}
async function createReservation(store, body, { admin = false } = {}) {
  const cfg = await getConfig(store);
  if (!admin && cfg.features?.reservations === false) return { error: 'off', status: 403 };
  if (body.hp) return { error: 'spam', status: 400 };
  const date = str(body.date, 10);
  if (!isDate(date)) return { error: 'date', status: 400 };
  const now = zagrebNow();
  const party = Math.floor(Number(body.party));
  if (!(party >= 1 && party <= (admin ? 60 : cfg.maxParty))) return { error: 'party', status: 400 };
  const start = Math.floor(Number(body.start));
  const name = str(body.name, 80);
  const phoneRaw = str(body.phone, 30);
  const phone = cleanPhone(phoneRaw);
  const email = str(body.email, 120);
  if (!name || name.length < 2) return { error: 'name', status: 400 };
  if (!admin && !phone) return { error: 'phone', status: 400 };
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'email', status: 400 };
  if (!admin) {
    if (!body.consent) return { error: 'consent', status: 400 };
    const last = addDays(now.date, cfg.daysAhead);
    if (date < now.date || date > last) return { error: 'date', status: 400 };
    if (!slotsFor(cfg, date).includes(start)) return { error: 'time', status: 400 };
    if (date === now.date && start < now.min + cfg.leadMinutes) return { error: 'time', status: 400 };
  } else if (!(start >= 0 && start < 2880)) return { error: 'time', status: 400 };
  const preorder = cfg.features?.preorder ? cleanPreorder(body.preorder) : [];

  const res = await mutateDay(store, date, list => {
    let table = null;
    if (body.tableId && body.tableId !== 'any') {
      table = cfg.tables.find(t => t.id === body.tableId);
      if (!table) return { error: 'table', status: 400 };
      if (!admin && !fits(table, party)) return { error: 'fit', status: 409 };
      if (!tableFree(cfg, list, table.id, start)) return { error: 'taken', status: 409 };
    } else {
      table = bestTable(cfg, list, party, start);
      if (!table) return { error: 'full', status: 409 };
    }
    const at = isoNow();
    const r = {
      id: token(8), code: shortCode(), key: token(16),
      date, start, end: start + cfg.durationMinutes, party, tableId: table.id,
      name, phone: phone || phoneRaw, email, note: str(body.note, 400), occasion: str(body.occasion, 30),
      preorder, sparkler: !!(preorder.length && body.sparkler),
      lang: body.lang === 'en' ? 'en' : 'hr',
      status: admin ? (['pending', 'confirmed', 'seated', 'done', 'noshow'].includes(body.status) ? body.status : 'confirmed') : (cfg.autoConfirm ? 'confirmed' : 'pending'),
      source: admin ? str(body.source || 'staff', 20) : 'web',
      createdAt: body._at && admin ? str(body._at, 30) : at, updatedAt: at, history: []
    };
    list.push(r);
    return { ok: true, reservation: r, table };
  });
  if (res.ok) await setIndex(store, res.reservation.id, date);
  return res;
}
const guestView = r => ({ id: r.id, code: r.code, date: r.date, start: r.start, end: r.end, party: r.party, tableId: r.tableId, name: r.name, status: r.status, note: r.note, occasion: r.occasion, lang: r.lang, preorder: r.preorder || [], sparkler: !!r.sparkler });
async function getReservation(store, id, key, site = '') {
  const date = await findDate(store, str(id, 40));
  if (!date) return { error: 'notfound', status: 404 };
  const { list } = await readDay(store, date);
  const r = list.find(x => x.id === id);
  if (!r || !safeEqual(r.key, key || '')) return { error: 'notfound', status: 404 };
  const cfg = await getConfig(store);
  const notice = (r.status === 'confirmed' || r.status === 'declined') ? guestMessage(r, cfg, site, r.status) : '';
  return { ok: true, reservation: guestView(r), table: cfg.tables.find(t => t.id === r.tableId) || null, config: publicConfig(cfg), notice };
}
async function cancelByGuest(store, id, key) {
  const date = await findDate(store, str(id, 40));
  if (!date) return { error: 'notfound', status: 404 };
  return mutateDay(store, date, list => {
    const r = list.find(x => x.id === id);
    if (!r || !safeEqual(r.key, key || '')) return { error: 'notfound', status: 404 };
    if (!['pending', 'confirmed'].includes(r.status)) return { error: 'state', status: 409 };
    r.status = 'cancelled'; r.updatedAt = isoNow(); r.history.push({ at: r.updatedAt, by: 'guest', to: 'cancelled' });
    return { ok: true, reservation: r };
  });
}

/* ---------- admin: rezervacije ---------- */
/** Koji dan admin otvara: tekuća večer, a ako je lokal danas zatvoren i nema rezervacija — prvi sljedeći radni dan. */
async function defaultDay(store) {
  const cfg = await getConfig(store); const b = bizNow();
  for (let i = 0; i < 8; i++) {
    const d = addDays(b.date, i);
    if (slotsFor(cfg, d).length) return d;
    const { list } = await readDay(store, d);
    if (list.some(r => ACTIVE.has(r.status))) return d;
  }
  return b.date;
}
async function adminDay(store, date) {
  const cfg = await getConfig(store);
  const { list } = await readDay(store, date);
  return { ok: true, date, list: list.sort((a, b) => a.start - b.start), config: cfg, slots: slotsFor(cfg, date), now: zagrebNow(), biz: bizNow() };
}
async function adminUpdate(store, body) {
  const cfg = await getConfig(store);
  const id = str(body.id, 40);
  const date = await findDate(store, id);
  if (!date) return { error: 'notfound', status: 404 };
  const STAT = ['pending', 'confirmed', 'declined', 'cancelled', 'seated', 'done', 'noshow'];
  let moved = null;
  const res = await mutateDay(store, date, list => {
    const r = list.find(x => x.id === id);
    if (!r) return { error: 'notfound', status: 404 };
    const before = r.status;
    if (body.status) { if (!STAT.includes(body.status)) return { error: 'status', status: 400 }; r.status = body.status; }
    if (body.tableId && body.tableId !== r.tableId) {
      if (!cfg.tables.find(t => t.id === body.tableId)) return { error: 'table', status: 400 };
      if (ACTIVE.has(r.status) && !tableFree(cfg, list, body.tableId, r.start, r.id)) return { error: 'taken', status: 409 };
      r.tableId = body.tableId;
    }
    if (body.start != null && Number(body.start) !== r.start) {
      const s = Math.floor(Number(body.start)); if (!(s >= 0 && s < 2880)) return { error: 'time', status: 400 };
      if (ACTIVE.has(r.status) && !tableFree(cfg, list, r.tableId, s, r.id)) return { error: 'taken', status: 409 };
      r.start = s; r.end = s + cfg.durationMinutes;
    }
    if (body.party != null) { const p = Math.floor(Number(body.party)); if (p >= 1 && p <= 60) r.party = p; }
    if (body.staffNote != null) r.staffNote = str(body.staffNote, 400);
    if (body.date && body.date !== date) moved = str(body.date, 10);
    r.updatedAt = isoNow();
    r.history.push({ at: r.updatedAt, by: 'staff', from: before, to: r.status });
    return { ok: true, reservation: r, changedStatus: before !== r.status };
  });
  if (res.ok && moved && isDate(moved)) {
    const r = res.reservation;
    const add = await mutateDay(store, moved, list => {
      if (ACTIVE.has(r.status) && !tableFree(cfg, list, r.tableId, r.start, r.id)) return { error: 'taken', status: 409 };
      list.push({ ...r, date: moved }); return { ok: true };
    });
    if (add.error) return add;
    await mutateDay(store, date, list => { const i = list.findIndex(x => x.id === r.id); if (i >= 0) list.splice(i, 1); return { ok: true }; });
    await setIndex(store, r.id, moved);
    res.reservation = { ...r, date: moved };
  }
  return res;
}
async function adminSaveConfig(store, cfgIn) {
  const cur = await getConfig(store);
  const next = { ...cur };
  const keys = ['venue', 'phone', 'plan', 'zones', 'tables', 'hours', 'slotMinutes', 'durationMinutes', 'leadMinutes', 'daysAhead', 'maxParty', 'holdMinutes', 'closedDates', 'autoConfirm', 'rules', 'features'];
  for (const k of keys) if (cfgIn[k] !== undefined) next[k] = cfgIn[k];
  if (!Array.isArray(next.tables) || !next.tables.length) return { error: 'tables', status: 400 };
  const ids = new Set();
  for (const t of next.tables) {
    t.id = str(t.id, 8); if (!t.id || ids.has(t.id)) return { error: 'tableid', status: 400 }; ids.add(t.id);
    t.min = Math.max(1, Math.floor(+t.min || 1)); t.max = Math.max(t.min, Math.floor(+t.max || t.min));
  }
  for (const k of ['slotMinutes', 'durationMinutes', 'leadMinutes', 'daysAhead', 'maxParty', 'holdMinutes']) next[k] = Math.max(0, Math.floor(+next[k] || 0));
  if (next.slotMinutes < 10) next.slotMinutes = 10;
  await store.setJSON('config', next, null);
  return { ok: true, config: next };
}
async function adminSearch(store, q, from) {
  const out = []; const s = String(q || '').toLowerCase().trim(); if (s.length < 2) return { ok: true, list: [] };
  for (let i = -7; i <= 30; i++) {
    const d = addDays(from, i); const { list } = await readDay(store, d);
    for (const r of list) if ([r.name, r.phone, r.code, r.email].some(x => String(x || '').toLowerCase().includes(s))) out.push(r);
  }
  return { ok: true, list: out };
}
async function adminUpcoming(store, from, days = 14) {
  const out = [];
  for (let i = 0; i < days; i++) {
    const d = addDays(from, i); const { list } = await readDay(store, d); const act = list.filter(r => ACTIVE.has(r.status));
    out.push({ date: d, pending: list.filter(r => r.status === 'pending').length, total: act.length, guests: act.reduce((a, r) => a + r.party, 0) });
  }
  return { ok: true, days: out };
}

/* =====================================================================
   STOL UŽIVO: poziv konobara, račun, narudžba s mobitela, pjesma po želji
   ===================================================================== */
const LIVE_KINDS = ['call', 'bill', 'order', 'song'];
const liveKey = d => `live/${d}`;
const OPEN = new Set(['new', 'ack']);
async function liveCreate(store, body) {
  const cfg = await getConfig(store);
  const kind = str(body.kind, 10);
  if (!LIVE_KINDS.includes(kind)) return { error: 'kind', status: 400 };
  if (kind === 'song' && !cfg.features?.songs) return { error: 'kind', status: 400 };
  if (kind === 'order' && cfg.features?.orders === false) return { error: 'kind', status: 400 };
  if (kind === 'bill' && cfg.features?.bill === false) return { error: 'kind', status: 400 };
  if (!cfg.features?.tableMode) return { error: 'off', status: 403 };
  const table = str(body.table, 8).replace(/[^\w-]/g, '');
  if (!table && kind !== 'song') return { error: 'table', status: 400 };
  const b = bizNow();
  const item = { id: token(6), k: token(10), kind, table, status: 'new', createdAt: isoNow(), lang: body.lang === 'en' ? 'en' : 'hr' };
  if (kind === 'bill') item.pay = ['card', 'cash'].includes(body.pay) ? body.pay : '';
  if (kind === 'order') {
    const items = Array.isArray(body.items) ? body.items.slice(0, 25).map(x => ({ id: str(x.id, 80), n: str(x.n, 80), v: str(x.v, 24), q: Math.floor(num(x.q, 1, 20) ?? 1), e: num(x.e, 0, 1000000) ?? 0 })).filter(x => x.n) : [];
    if (!items.length) return { error: 'items', status: 400 };
    item.items = items; item.total = Math.round(items.reduce((a, x) => a + x.q * x.e, 0) * 100) / 100;
  }
  if (kind === 'song') {
    item.song = { title: str(body.title, 80), artist: str(body.artist, 60), ded: str(body.ded, 120) };
    if (item.song.title.length < 2) return { error: 'title', status: 400 };
  }
  item.note = str(body.note, 200);
  return mutate(store, liveKey(b.date), [], list => {
    const open = list.filter(x => OPEN.has(x.status) && x.table === table);
    if ((kind === 'call' || kind === 'bill') && table) {
      const dup = open.find(x => x.kind === kind && Date.now() - Date.parse(x.createdAt) < 20 * 60e3);
      if (dup) {
        // isti stol već čeka konobara: novi razlog (npr. "Kombo: Silver Goose") dopiše se postojećem pozivu
        if (item.note && !(dup.note || '').includes(item.note)) { dup.note = str((dup.note ? dup.note + ' · ' : '') + item.note, 200); dup.updatedAt = isoNow(); return { ok: true, dup: true, id: dup.id, k: dup.k, item: dup }; }
        return { ok: true, noop: true, dup: true, id: dup.id, k: dup.k, item: dup };
      }
    }
    if (open.length >= 12) return { error: 'limit', status: 429 };
    if (kind === 'song' && list.filter(x => x.kind === 'song' && x.status === 'new' && x.table === table).length >= 3) return { error: 'limit', status: 429 };
    list.push(item);
    if (list.length > 600) list.splice(0, list.length - 600);
    return { ok: true, id: item.id, k: item.k, item };
  });
}
async function liveStatus(store, id, k) {
  const b = bizNow();
  for (const d of [b.date, addDays(b.date, -1)]) {
    const list = await read(store, liveKey(d), []);
    const x = list.find(i => i.id === id);
    if (x && safeEqual(x.k, k || '')) return { ok: true, status: x.status, kind: x.kind, ackAt: x.ackAt || null, doneAt: x.doneAt || null };
  }
  return { error: 'notfound', status: 404 };
}
async function adminLive(store, date) {
  const d = isDate(date) ? date : bizNow().date;
  const list = await read(store, liveKey(d), []);
  return { ok: true, date: d, list, now: isoNow() };
}
async function adminLiveUpdate(store, body) {
  const id = str(body.id, 20), st = str(body.status, 10);
  if (!['new', 'ack', 'done', 'skip'].includes(st)) return { error: 'status', status: 400 };
  const b = bizNow();
  for (const d of [isDate(body.date) ? body.date : b.date, addDays(b.date, -1)]) {
    const r = await mutate(store, liveKey(d), [], list => {
      const x = list.find(i => i.id === id);
      if (!x) return { error: 'notfound', status: 404 };
      x.status = st; const at = isoNow();
      if (st === 'ack' && !x.ackAt) x.ackAt = at;
      if ((st === 'done' || st === 'skip') && !x.doneAt) { x.doneAt = at; if (!x.ackAt) x.ackAt = at; }
      if (body.by) x.by = str(body.by, 30);
      return { ok: true, item: x };
    });
    if (r.error !== 'notfound') return r;
  }
  return { error: 'notfound', status: 404 };
}

/* =====================================================================
   ANONIMNE PORUKE UPRAVI
   ===================================================================== */
const fbKey = d => `fb/${d.slice(0, 7)}`;
const TOPICS = ['hrana', 'usluga', 'pice', 'cekanje', 'cistoca', 'glazba', 'racun', 'pohvala', 'ostalo'];
async function feedbackCreate(store, body) {
  if (body.hp || body['bot-field']) return { ok: true };
  const msg = str(body.msg ?? body.poruka, 1500);
  if (msg.length < 5) return { error: 'short', status: 400 };
  const topic = TOPICS.includes(body.topic ?? body.tema) ? (body.topic ?? body.tema) : 'ostalo';
  const n = zagrebNow();
  const item = { id: token(6), topic, msg, when: str(body.when ?? body.kada, 80), contact: str(body.contact ?? body.kontakt, 120), table: str(body.table, 8), lang: body.lang === 'en' ? 'en' : 'hr', createdAt: body._at ? str(body._at, 30) : isoNow(), read: false, done: false };
  return mutate(store, fbKey(n.date), [], list => { if (list.length >= 1500) return { error: 'limit', status: 429 }; list.push(item); return { ok: true, id: item.id }; });
}
async function adminFeedback(store, months = 3) {
  const n = zagrebNow(); const out = []; let d = n.date;
  for (let i = 0; i < months; i++) {
    out.push(...(await read(store, fbKey(d), [])));
    d = addDays(d.slice(0, 7) + '-01', -1);
  }
  out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return { ok: true, list: out, unread: out.filter(x => !x.read).length };
}
async function adminFeedbackUpdate(store, body) {
  const id = str(body.id, 20); const n = zagrebNow(); let d = n.date;
  for (let i = 0; i < 3; i++) {
    const r = await mutate(store, fbKey(d), [], list => {
      const x = list.find(i => i.id === id); if (!x) return { error: 'notfound', status: 404 };
      if (body.read != null) x.read = !!body.read;
      if (body.done != null) x.done = !!body.done;
      return { ok: true, item: x };
    });
    if (r.error !== 'notfound') return r;
    d = addDays(d.slice(0, 7) + '-01', -1);
  }
  return { error: 'notfound', status: 404 };
}
async function adminFeedbackReadAll(store) {
  const n = zagrebNow();
  await mutate(store, fbKey(n.date), [], list => { list.forEach(x => { x.read = true; }); return { ok: true }; });
  return { ok: true };
}

/* =====================================================================
   CJENIK: rasprodano, cijene, vrijeme akcije (mijenja se u adminu)
   ===================================================================== */
const EMPTY_MENU = { soldOut: {}, price: {}, promo: null, updatedAt: null };
async function getMenu(store) { return { ok: true, menu: await read(store, 'menu', EMPTY_MENU) }; }
async function adminSaveMenu(store, body) {
  const m = body.menu || {};
  const out = { soldOut: {}, price: {}, promo: null, updatedAt: isoNow() };
  for (const [id, v] of Object.entries(m.soldOut || {}).slice(0, 600)) if (v) out.soldOut[str(id, 80)] = 1;
  for (const [id, v] of Object.entries(m.price || {}).slice(0, 600)) {
    const pv = {}; for (const [i, e] of Object.entries(v || {})) { const x = num(e, 0, 1000000); if (x != null && /^\d{1,2}$/.test(i)) pv[i] = Math.round(x * 100) / 100; }
    if (Object.keys(pv).length) out.price[str(id, 80)] = pv;
  }
  if (m.promo) {
    const p = m.promo, okT = s => /^\d{2}:\d{2}$/.test(s);
    if (p.off) out.promo = { off: true };
    else if (Array.isArray(p.days) && okT(p.from) && okT(p.to)) out.promo = { days: p.days.map(Number).filter(x => x >= 0 && x <= 6).slice(0, 7), from: p.from, to: p.to };
  }
  if (m.tonight && typeof m.tonight === 'object') {   // "Večeras nastupa" (bend, pjevačica, DJ) / Bure: "uTvrđiranje petkom" (tema, piće dobrodošlice, DJ) — gost vidi u cjeniku
    const txt = str(m.tonight.txt, 90).trim(), from = /^\d{2}:\d{2}$/.test(m.tonight.from || '') ? m.tonight.from : '', welcome = str(m.tonight.welcome, 60).trim(), dj = str(m.tonight.dj, 70).trim();
    if (txt || welcome || dj || (from && m.tonight.fort)) out.tonight = Object.assign({ txt, from }, welcome ? { welcome } : {}, dj ? { dj } : {}, m.tonight.fort ? { fort: 1 } : {});
  }
  await store.setJSON('menu', out, null);
  return { ok: true, menu: out };
}

/* =====================================================================
   STATISTIKA (otvaranja menija, pregledi pića, klikovi na recenziju…)
   Podijeljeno u 8 komada da se istovremeni upisi ne sudaraju.
   ===================================================================== */
const SHARDS = 8;
const stKey = (d, s) => `st/${d}/${s}`;
const EMPTY_ST = { open: 0, review: 0, book: 0, table: 0, view: {}, names: {} };
async function statsHit(store, body) {
  const ev = Array.isArray(body.ev) ? body.ev.slice(0, 40) : [];
  if (!ev.length) return { ok: true };
  const date = isDate(body.date) && body.date >= addDays(zagrebNow().date, -30) ? body.date : bizNow().date;
  const s = Math.floor(Math.random() * SHARDS);
  return mutate(store, stKey(date, s), EMPTY_ST, doc => {
    for (const e of ev) {
      const t = str(e.t, 10), n = Math.max(1, Math.min(500, Math.floor(+e.n || 1)));
      if (t === 'view') { const id = str(e.id, 80); if (!id) continue; doc.view[id] = (doc.view[id] || 0) + n; if (e.name) doc.names[id] = str(e.name, 80); }
      else if (['open', 'review', 'book', 'table'].includes(t)) doc[t] = (doc[t] || 0) + n;
    }
    return { ok: true };
  });
}
async function statsDay(store, date) {
  const out = structuredClone(EMPTY_ST);
  for (let s = 0; s < SHARDS; s++) {
    const r = await store.getJSON(stKey(date, s)); if (!r?.data) continue; const d = r.data;
    for (const k of ['open', 'review', 'book', 'table']) out[k] += d[k] || 0;
    for (const [id, n] of Object.entries(d.view || {})) out.view[id] = (out.view[id] || 0) + n;
    Object.assign(out.names, d.names || {});
  }
  return out;
}
async function adminStats(store, days = 14) {
  const b = bizNow(); const series = []; const tot = structuredClone(EMPTY_ST);
  for (let i = days - 1; i >= 0; i--) {
    const d = addDays(b.date, -i); const s = await statsDay(store, d);
    series.push({ date: d, open: s.open, review: s.review, book: s.book, table: s.table });
    for (const k of ['open', 'review', 'book', 'table']) tot[k] += s[k];
    for (const [id, n] of Object.entries(s.view)) tot.view[id] = (tot.view[id] || 0) + n;
    Object.assign(tot.names, s.names);
  }
  const top = Object.entries(tot.view).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([id, n]) => ({ id, n, name: tot.names[id] || id }));
  return { ok: true, days: series, total: { open: tot.open, review: tot.review, book: tot.book, table: tot.table }, top };
}

/* =====================================================================
   PREGLED GRUPE (vlasnik): svi lokali na jednom ekranu
   ===================================================================== */
async function venueSummary(store) {
  const cfg = await getConfig(store); const b = bizNow();
  const day = await defaultDay(store);
  const { list } = await readDay(store, day);
  const act = list.filter(r => ACTIVE.has(r.status));
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = addDays(b.date, i); const L = (await readDay(store, d)).list.filter(r => ACTIVE.has(r.status));
    week.push({ date: d, res: L.length, guests: L.reduce((a, r) => a + r.party, 0), pre: L.reduce((a, r) => a + preorderTotal(r), 0) });
  }
  const live = await read(store, liveKey(b.date), []);
  const acked = live.filter(x => x.ackAt).map(x => (Date.parse(x.ackAt) - Date.parse(x.createdAt)) / 1000).filter(s => s >= 0 && s < 7200);
  const fb = await adminFeedback(store, 2);
  const st = await adminStats(store, 7);
  return {
    id: store.venue, name: cfg.venue, day, features: cfg.features || {},
    tonight: { res: act.length, guests: act.reduce((a, r) => a + r.party, 0), pending: list.filter(r => r.status === 'pending').length, seated: list.filter(r => r.status === 'seated').length, pre: act.reduce((a, r) => a + preorderTotal(r), 0), tables: cfg.tables.length },
    week,
    live: { open: live.filter(x => OPEN.has(x.status) && x.kind !== 'song').length, songQueue: live.filter(x => x.kind === 'song' && x.status === 'new').length, today: live.length, orders: live.filter(x => x.kind === 'order').length, orderEur: live.filter(x => x.kind === 'order' && x.status !== 'skip').reduce((a, x) => a + (x.total || 0), 0), songs: live.filter(x => x.kind === 'song').length, calls: live.filter(x => x.kind === 'call').length, bills: live.filter(x => x.kind === 'bill').length, avgAck: acked.length ? Math.round(acked.reduce((a, s) => a + s, 0) / acked.length) : null, slowAck: acked.length ? Math.round(Math.max(...acked)) : null, recent: live.slice(-6).reverse() },
    feedback: { unread: fb.unread, total: fb.list.length, recent: fb.list.slice(0, 3) },
    stats: { ...st.total, top: st.top.slice(0, 5), days: st.days }
  };
}
async function groupSummary(rootStore) {
  const out = [];
  for (const v of VENUE_IDS) out.push(await venueSummary(scoped(rootStore, v)));
  return { ok: true, now: zagrebNow(), biz: bizNow(), venues: out };
}

/* =====================================================================
   TEKSTOVI PORUKA (WhatsApp / e-mail)
   ===================================================================== */
const DAYS = { hr: ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'], en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] };
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function humanDate(date, lang = 'hr') { const [, m, d] = date.split('-'); return lang === 'en' ? `${DAYS.en[weekday(date)]}, ${+d} ${MONTHS_EN[+m - 1]}` : `${DAYS.hr[weekday(date)]}, ${+d}.${+m}.`; }
const formsOf = cfg => cfg.forms || { loc: 'u ' + cfg.venue, gen: 'iz ' + cfg.venue };
const eur = (v, L) => new Intl.NumberFormat(L === 'en' ? 'en-GB' : 'sr-Latn-RS', { style: 'currency', currency: 'RSD', maximumFractionDigits: 0 }).format(v);
function guestMessage(r, cfg, site, kind) {
  const L = r.lang === 'en' ? 'en' : 'hr';
  const link = `${site}/rezervacije/?r=${r.id}&k=${r.key}`;
  const when = `${humanDate(r.date, L)} ${fmt(r.start)}`;
  const pre = (r.preorder || []).length ? (L === 'hr'
    ? `\n🍾 Uz stol: ${r.preorder.map(x => `${x.qty > 1 ? x.qty + '× ' : ''}${x.name}${x.vol ? ' ' + x.vol : ''}`).join(', ')}${r.sparkler ? ' ✨ s prskalicom' : ''}`
    : `\n🍾 At your table: ${r.preorder.map(x => `${x.qty > 1 ? x.qty + '× ' : ''}${x.name}${x.vol ? ' ' + x.vol : ''}`).join(', ')}${r.sparkler ? ' ✨ with a sparkler' : ''}`) : '';
  const F = formsOf(cfg);
  if (kind === 'confirmed') return L === 'hr'
    ? `Pozdrav ${F.gen}! Rezervacija na ime ${r.name} je POTVRĐENA ✅\n📅 ${when}\n👥 ${r.party} os. · sto ${r.tableId}${pre}\nSto čuvamo ${cfg.holdMinutes} min. Izmene ili otkazivanje: ${link}\nVidimo se!`
    : `Hi from ${cfg.venue}! The reservation for ${r.name} is CONFIRMED ✅\n📅 ${when}\n👥 ${r.party} guests · table ${r.tableId}${pre}\nWe hold the table for ${cfg.holdMinutes} min. Changes or cancellation: ${link}\nSee you!`;
  if (kind === 'declined') return L === 'hr'
    ? `Pozdrav ${F.gen}. Nažalost, za ${when} nemamo slobodan sto za ${r.party} os. (rezervacija na ime ${r.name}). Pozovite nas na ${cfg.phone} pa ćemo naći drugi termin.`
    : `Hi from ${cfg.venue}. Unfortunately we have no table for ${r.party} on ${when} (reservation for ${r.name}). Call us at ${cfg.phone} and we'll find another time.`;
  return '';
}
function staffMessage(r, cfg, site, path = '') {
  const pre = (r.preorder || []).length ? `\n🍾 ${r.preorder.map(x => `${x.qty}× ${x.name} ${x.vol}`).join(', ')} (${eur(preorderTotal(r))})${r.sparkler ? ' ✨' : ''}` : '';
  return `🆕 Nova rezervacija ${cfg.venue}\n📅 ${humanDate(r.date)} ${fmt(r.start)}\n👥 ${r.party} os. · sto ${r.tableId}\n👤 ${r.name} · ${r.phone}${r.occasion ? `\n🎉 ${r.occasion}` : ''}${r.note ? `\n📝 ${r.note}` : ''}${pre}\nKod: ${r.code}\nPotvrdi: ${site}${path}/uprava/#${r.date}`;
}
/** Kratka obavijest za WhatsApp (vanjski servis): bez imena, broja i napomene gosta. */
function staffAlert(r, cfg, site, path = '') {
  return `🆕 Nova rezervacija ${cfg.venue}\n📅 ${humanDate(r.date)} ${fmt(r.start)}\n👥 ${r.party} os. · sto ${r.tableId}${(r.preorder || []).length ? '\n🍾 + boca uz sto' : ''}\nKod: ${r.code}\nPotvrdi: ${site}${path}/uprava/#${r.date}`;
}
const waLink = (phone, text) => `https://wa.me/${String(phone).replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;

return { VENUES, VENUE_IDS, isVenue, TZ, setClock, zagrebNow, bizNow, toMin, fmt, weekday, addDays, isDate, token, shortCode, safeEqual, scoped, getConfig, publicConfig, slotsFor, ACTIVE, overlaps, tableFree, fits, bestTable, cleanPhone, preorderTotal, availability, createReservation, guestView, getReservation, cancelByGuest, defaultDay, adminDay, adminUpdate, adminSaveConfig, adminSearch, adminUpcoming, liveCreate, liveStatus, adminLive, adminLiveUpdate, feedbackCreate, adminFeedback, adminFeedbackUpdate, adminFeedbackReadAll, getMenu, adminSaveMenu, statsHit, adminStats, venueSummary, groupSummary, humanDate, guestMessage, staffMessage, staffAlert, waLink };
})();
__m["router"] = (function () {
/* =====================================================================
   TIPTAP SIGNATURE (Košnica) — HTTP router za /api/<lokal>/…  i  /api/group/…
   Isti kod radi na Netlifyju (Functions + Blobs) i u pregledniku (demo).
   ---------------------------------------------------------------------
   ENV (Netlify → Site configuration → Environment variables):
   ADMIN_PIN_KOSNICA  PIN uprave lokala (ili ADMIN_PIN)
   OWNER_PIN          PIN vlasnika (ulaz u upravu)
   SITE_URL           npr. https://tiptapreviews.com (za linkove u porukama)
   RESEND_API_KEY     (neobavezno) e-mail preko resend.com
   MAIL_FROM          npr. "TipTap <rezervacije@tvoja-domena.hr>"
   NOTIFY_EMAIL[_LOKAL]   e-mail(ovi) osoblja, odvojeni zarezom
   CALLMEBOT[_LOKAL]      (neobavezno) WhatsApp osoblju: "+38591xxxxxxx:APIKEY,…"
   ===================================================================== */
const C = __m["core"];
const PATHS = { kosnica: '' };
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const fail = r => json({ error: r.error }, r.status || 400);
const envFor = (env, name, v) => env[`${name}_${String(v).toUpperCase()}`] || env[name] || '';

async function sendEmail(env, to, subject, text) {
  if (!env.RESEND_API_KEY || !to) return false;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.MAIL_FROM || 'TipTap <onboarding@resend.dev>', to: String(to).split(',').map(s => s.trim()).filter(Boolean), subject, text })
    });
    return r.ok;
  } catch { return false; }
}
async function sendWhatsAppStaff(env, v, text) {
  const conf = envFor(env, 'CALLMEBOT', v);
  if (!conf) return false;
  const jobs = conf.split(',').map(s => s.trim()).filter(Boolean).map(pair => {
    const i = pair.lastIndexOf(':'); const phone = pair.slice(0, i).replace(/[^\d+]/g, ''), key = pair.slice(i + 1);
    return fetch(`https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(key)}`).then(r => r.ok).catch(() => false);
  });
  return (await Promise.all(jobs)).some(Boolean);
}

function pinOk(req, env, v) {
  const pin = req.headers.get('x-admin-pin') || '';
  if (!pin) return false;
  const own = env.OWNER_PIN, staff = v ? envFor(env, 'ADMIN_PIN', v) : '';
  return (!!own && C.safeEqual(pin, own)) || (!!staff && C.safeEqual(pin, staff));
}

async function route(req, { store, env = {}, waitUntil } = {}) {
  const url = new URL(req.url);
  const parts = url.pathname.replace(/^\/(\.netlify\/functions\/api|api)/, '').split('/').filter(Boolean);
  const site = (env.SITE_URL || url.origin).replace(/\/$/, '');
  const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
  const later = p => (waitUntil ? waitUntil(p) : p);
  const q = k => url.searchParams.get(k);

  try {
    /* ----- vlasnik: pregled svih lokala ----- */
    if (parts[0] === 'group') {
      if (!env.OWNER_PIN) return json({ error: 'nopin' }, 500);
      if (!pinOk(req, env, null)) { await new Promise(r => setTimeout(r, 500)); return json({ error: 'auth' }, 401); }
      if (parts[1] === 'login') return json({ ok: true });
      if (parts[1] === 'summary') return json(await C.groupSummary(store));
      return json({ error: 'notfound' }, 404);
    }

    const v = parts[0];
    if (!C.isVenue(v)) return json({ error: 'venue' }, 404);
    const S = C.scoped(store, v);
    const path = '/' + parts.slice(1).join('/');
    const vpath = env.SITE_URL ? (PATHS[v] || '') : '';

    /* ----- javno: gosti ----- */
    if (path === '/availability' && req.method === 'GET') {
      const date = q('date') || C.zagrebNow().date;
      if (!C.isDate(date)) return json({ error: 'date' }, 400);
      return json(await C.availability(S, date));
    }
    if (path === '/reserve' && req.method === 'POST') {
      const r = await C.createReservation(S, body);
      if (r.error) return fail(r);
      const cfg = await C.getConfig(S); const x = r.reservation;
      await later(Promise.all([
        sendWhatsAppStaff(env, v, C.staffAlert(x, cfg, site, vpath)),
        sendEmail(env, envFor(env, 'NOTIFY_EMAIL', v), `Nova rezervacija: ${C.humanDate(x.date)} ${C.fmt(x.start)} · ${x.party} os. · ${x.name}`, C.staffMessage(x, cfg, site, vpath))
      ]));
      if (x.status === 'confirmed' && x.email) await later(sendEmail(env, x.email, `${cfg.venue} — rezervacija ${x.code}`, C.guestMessage(x, cfg, site + vpath, 'confirmed')));
      return json({ ok: true, reservation: { ...C.guestView(x), key: x.key }, table: r.table });
    }
    if (path === '/reservation' && req.method === 'GET') {
      const r = await C.getReservation(S, q('id'), q('k'), site + vpath);
      return r.error ? fail(r) : json(r);
    }
    if (path === '/cancel' && req.method === 'POST') {
      const r = await C.cancelByGuest(S, body.id, body.k);
      if (r.error) return fail(r);
      const cfg = await C.getConfig(S); const x = r.reservation;
      const alert = `❌ Otkazana rezervacija ${cfg.venue}: ${C.humanDate(x.date)} ${C.fmt(x.start)} · ${x.party} os. · stol ${x.tableId} · kod ${x.code}`;
      await later(Promise.all([sendWhatsAppStaff(env, v, alert), sendEmail(env, envFor(env, 'NOTIFY_EMAIL', v), 'Otkazana rezervacija ' + x.code, alert + ` · ${x.name}`)]));
      return json({ ok: true, reservation: C.guestView(x) });
    }
    if (path === '/menu' && req.method === 'GET') return json(await C.getMenu(S));
    if (path === '/live' && req.method === 'POST') { const r = await C.liveCreate(S, body); return r.error ? fail(r) : json({ ok: true, id: r.id, k: r.k, dup: !!r.dup }); }
    if (path === '/live/status' && req.method === 'GET') { const r = await C.liveStatus(S, q('id'), q('k')); return r.error ? fail(r) : json(r); }
    if (path === '/feedback' && req.method === 'POST') {
      const r = await C.feedbackCreate(S, body);
      if (r.error) return fail(r);
      const to = envFor(env, 'FEEDBACK_EMAIL', v) || envFor(env, 'NOTIFY_EMAIL', v);
      if (to && r.id) await later(sendEmail(env, to, `Anonimna poruka (${v})`, `${body.topic || body.tema || ''}\n\n${body.msg || body.poruka || ''}\n\n${body.when || body.kada || ''} ${body.contact || body.kontakt || ''}`));
      return json({ ok: true });
    }
    if (path === '/hit' && req.method === 'POST') { const r = await C.statsHit(S, body); return r.error ? fail(r) : json({ ok: true }); }

    /* ----- admin (osoblje lokala ili vlasnik) ----- */
    if (parts[1] === 'admin') {
      if (!envFor(env, 'ADMIN_PIN', v) && !env.OWNER_PIN) return json({ error: 'nopin' }, 500);
      if (!pinOk(req, env, v)) { await new Promise(r => setTimeout(r, 500)); return json({ error: 'auth' }, 401); }
      const a = '/' + parts.slice(2).join('/');
      if (a === '/login') return json({ ok: true, owner: !!env.OWNER_PIN && C.safeEqual(req.headers.get('x-admin-pin'), env.OWNER_PIN) });
      if (a === '/day') { const d = q('date') || await C.defaultDay(S); if (!C.isDate(d)) return json({ error: 'date' }, 400); return json(await C.adminDay(S, d)); }
      if (a === '/upcoming') return json(await C.adminUpcoming(S, C.bizNow().date, 14));
      if (a === '/search') return json(await C.adminSearch(S, q('q'), C.zagrebNow().date));
      if (a === '/create' && req.method === 'POST') { const r = await C.createReservation(S, body, { admin: true }); return r.error ? fail(r) : json(r); }
      if (a === '/update' && req.method === 'POST') {
        const r = await C.adminUpdate(S, body);
        if (r.error) return fail(r);
        const cfg = await C.getConfig(S); const x = r.reservation;
        let wa = null, msg = '';
        if (r.changedStatus && (x.status === 'confirmed' || x.status === 'declined')) {
          msg = C.guestMessage(x, cfg, site + vpath, x.status);
          if (x.phone) wa = C.waLink(x.phone, msg);
          if (x.email && body.notify !== false) await later(sendEmail(env, x.email, `${cfg.venue} — ${x.status === 'confirmed' ? (x.lang === 'en' ? 'reservation confirmed' : 'rezervacija potvrđena') : (x.lang === 'en' ? 'reservation' : 'rezervacija')} ${x.code}`, msg));
        }
        return json({ ok: true, reservation: x, wa, msg });
      }
      if (a === '/config' && req.method === 'GET') return json({ ok: true, config: await C.getConfig(S), env: { email: !!env.RESEND_API_KEY && !!envFor(env, 'NOTIFY_EMAIL', v), whatsapp: !!envFor(env, 'CALLMEBOT', v), demo: !!env.DEMO } });
      if (a === '/config' && req.method === 'POST') { const r = await C.adminSaveConfig(S, body.config || {}); return r.error ? fail(r) : json(r); }
      if (a === '/test-notify' && req.method === 'POST') {
        const text = `✅ Test obavijesti (${v}) — ${new Date().toLocaleString('hr-HR', { timeZone: C.TZ })}`;
        const [w, e] = await Promise.all([sendWhatsAppStaff(env, v, text), sendEmail(env, envFor(env, 'NOTIFY_EMAIL', v), 'Test obavijesti', text)]);
        return json({ ok: true, whatsapp: w, email: e });
      }
      if (a === '/live' && req.method === 'GET') return json(await C.adminLive(S, q('date')));
      if (a === '/live/update' && req.method === 'POST') { const r = await C.adminLiveUpdate(S, body); return r.error ? fail(r) : json(r); }
      if (a === '/feedback' && req.method === 'GET') return json(await C.adminFeedback(S, 3));
      if (a === '/feedback/update' && req.method === 'POST') { const r = await C.adminFeedbackUpdate(S, body); return r.error ? fail(r) : json(r); }
      if (a === '/feedback/readall' && req.method === 'POST') return json(await C.adminFeedbackReadAll(S));
      if (a === '/menu' && req.method === 'GET') return json(await C.getMenu(S));
      if (a === '/menu' && req.method === 'POST') { const r = await C.adminSaveMenu(S, body); return r.error ? fail(r) : json(r); }
      if (a === '/stats' && req.method === 'GET') return json(await C.adminStats(S, Math.min(60, Math.max(1, +q('days') || 14))));
      if (a === '/summary' && req.method === 'GET') return json(await C.venueSummary(S));
    }
    return json({ error: 'notfound' }, 404);
  } catch (e) {
    console.error(e);
    return json({ error: 'server' }, 500);
  }
}

return { route };
})();
window.TTCore = { core: __m["core"], router: __m["router"] };
})();
window.TT_DEMO_ITEMS={"kosnica": {"top": [{"id": "kosnica-burger", "name": "Košnica burger", "price": 1260}, {"id": "pivska-daska-kosnica-za-dvoje", "name": "Pivska daska Košnica za dvoje", "price": 1880}, {"id": "cevapi", "name": "Ćevapi", "price": 740}, {"id": "pica-kosnica", "name": "Pica Košnica", "price": 1130}, {"id": "kosnica-plata", "name": "Košnica plata", "price": 2780}, {"id": "cilito-burger", "name": "Chilito burger", "price": 1090}, {"id": "carska-piletina", "name": "Carska piletina", "price": 1380}, {"id": "zapecena-kolenica", "name": "Zapečena kolenica", "price": 1580}, {"id": "cezar-salata", "name": "Cezar salata", "price": 920}, {"id": "kosnica-palacinka", "name": "Košnica palačinka", "price": 560}, {"id": "tartufo-piletina-pasta", "name": "Tartufo piletina", "price": 1090}, {"id": "smoked-burger", "name": "Smoked burger", "price": 1090}], "bottles": []}};
/* =====================================================================
   TIPTAP SIGNATURE (Košnica) — klijent (zajednički za meni, rezervacije i upravu)
   • TT.api(): živi način → /api/… na Netlifyju; demo način → isti
     backend radi u pregledniku (localStorage), bez servera.
   • Demo sat (?t=pet-22:40) za prezentaciju.
   • Obavijesti u stilu mobitela (WhatsApp) + zvučni signal.
   ===================================================================== */
(function () {
  'use strict';
  const CFG = window.TT_CFG || {};
  const TT = window.TT = window.TT || {};
  TT.cfg = CFG; TT.mode = CFG.mode || 'demo'; TT.venue = CFG.venue || null;
  const VPATH = { kosnica: '' };
  TT.paths = VPATH;

  /* ---------- sitnice ---------- */
  TT.esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  TT.fmt = m => { const x = ((m % 1440) + 1440) % 1440; return String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0'); };
  TT.toMin = s => { const [h, m] = String(s).split(':').map(Number); return h * 60 + m; };
  TT.addDays = (d, n) => { const t = new Date(d + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
  TT.wd = d => new Date(d + 'T12:00:00Z').getUTCDay();
  TT.money = (v, lang) => Math.round(v || 0) + '\u00a0RSD';
  TT.buzz = p => { try { const u = navigator.userActivation; if (navigator.vibrate && (!u || u.hasBeenActive)) navigator.vibrate(p); } catch (e) { } };
  const ls = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } } };
  TT.ls = ls;
  /** Korijen paketa (gdje su mape q-club/, kafanica/ …) — iz adrese stranice. */
  TT.root = (() => { const u = location.href.split(/[?#]/)[0]; const m = /^(.*?\/)(?:rezervacije|uprava)\//.exec(u); return m ? m[1] : u.replace(/[^/]*$/, ''); })();
  TT.url = (venue, sub) => { const u = TT.root + (VPATH[venue] ? VPATH[venue] + '/' : '') + (sub || ''); return location.protocol === 'file:' && /\/$/.test(u) ? u + 'index.html' : u; };
  /* otvoreno s diska (file://): mape se ne otvaraju same — dodaj index.html relativnim linkovima */
  if (location.protocol === 'file:') document.addEventListener('click', e => { const a = e.target.closest && e.target.closest('a[href]'); if (!a) return; const h = a.getAttribute('href'); if (h && !/^[a-z]+:|^#/i.test(h) && /\/(\?|#|$)/.test(h)) a.setAttribute('href', h.replace(/\/(\?|#|$)/, '/index.html$1')); }, true);

  /* ---------- vrijeme: stvarno (Zagreb) ili demo sat ---------- */
  const realNow = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Belgrade', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map(x => [x.type, x.value])); return { date: `${p.year}-${p.month}-${p.day}`, min: +p.hour * 60 + +p.minute }; };
  TT.realNow = realNow;
  const WDS = ['ned', 'pon', 'uto', 'sre', 'cet', 'pet', 'sub'];
  TT.clock = (() => {
    let q; try { q = new URLSearchParams(location.search); } catch (e) { return null; }
    const t = q.get('t');
    if (t === 'off') { try { sessionStorage.removeItem('ks_clock'); } catch (e) { } return null; }
    const m = t && /^(pon|uto|sri|sre|cet|čet|pet|sub|ned)-?(\d{1,2})(?:[:.h](\d{2}))?$/i.exec(t);
    if (m) {
      const wd = WDS.indexOf(m[1].toLowerCase().replace('č', 'c').replace('sri', 'sre')), min = (+m[2]) * 60 + (+(m[3] || 0));
      const t0 = +q.get('t0') || Date.now(); const today = realNow().date;
      let d = today; for (let i = 0; i < 7; i++) { const x = TT.addDays(today, i); if (TT.wd(x) === wd) { d = x; break; } }
      const c = { d, min, t0 }; try { sessionStorage.setItem('ks_clock', JSON.stringify(c)); } catch (e) { }
      return c;
    }
    try { const s = JSON.parse(sessionStorage.getItem('ks_clock') || 'null'); if (s && s.d) return s; } catch (e) { }
    return null;
  })();
  TT.now = () => {
    if (!TT.clock) return realNow();
    const m = TT.clock.min + Math.floor((Date.now() - TT.clock.t0) / 60000);
    return { date: TT.addDays(TT.clock.d, Math.floor(m / 1440)), min: ((m % 1440) + 1440) % 1440 };
  };
  TT.biz = () => { const n = TT.now(); return n.min < 360 ? { date: TT.addDays(n.date, -1), min: n.min + 1440 } : n; };
  /** Sekunde od ponoći (za odbrojavanje akcije u sekundama). */
  TT.nowSec = () => {
    if (!TT.clock) { const d = new Date(); const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Belgrade', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(d).map(x => [x.type, x.value])); return +p.hour * 3600 + +p.minute * 60 + +p.second; }
    const s = TT.clock.min * 60 + Math.floor((Date.now() - TT.clock.t0) / 1000); return ((s % 86400) + 86400) % 86400;
  };
  /** Dodaj demo sat linkovima unutar paketa (da prezentacija ostane u istom "vremenu"). */
  TT.pres = (() => { try { return new URLSearchParams(location.search).get('pres') === '1'; } catch (e) { return false; } })();
  TT.keepClock = href => {
    if (!href || /^(tel:|mailto:|#)/.test(href) || (/^https?:/.test(href) && !href.startsWith(TT.root)) || (!TT.clock && !TT.pres)) return href;
    const t = [TT.clock ? `t=${WDS[TT.wd(TT.clock.d)]}-${TT.fmt(TT.clock.min)}&t0=${TT.clock.t0}` : '', TT.pres ? 'pres=1' : ''].filter(Boolean).join('&');
    return href.includes('?') ? href.replace('?', '?' + t + '&') : href.replace(/(#.*)?$/, '?' + t + '$1');
  };

  /* ---------- PIN (admin) ---------- */
  TT.pin = v => ls.get('ks_pin_' + (v || 'group'), '') || '';   // i u demu: voditelj/direktor se prijavljuje PIN-om
  TT.setPin = (v, p) => { if (p) ls.set('ks_pin_' + (v || 'group'), p); else try { localStorage.removeItem('ks_pin_' + (v || 'group')); } catch (e) { } };

  /* ---------- demo backend (u pregledniku) ---------- */
  const P = 'ttk1:', mem = new Map();
  const rd = k => { try { return localStorage.getItem(P + k); } catch (e) { return mem.has(k) ? mem.get(k) : null; } };
  const wr = (k, v) => { try { localStorage.setItem(P + k, v); } catch (e) { mem.set(k, v); } };
  const hash = s => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h + ':' + s.length; };
  const STORE = {
    async getJSON(k) { const t = rd(k); return t == null ? null : { data: JSON.parse(t), etag: hash(t) }; },
    async setJSON(k, v, c) { const t = rd(k); if (c === 'new' && t != null) return false; if (c && c !== 'new' && (t == null || hash(t) !== c)) return false; wr(k, JSON.stringify(v)); return true; }
  };
  TT.store = STORE;
  /** Demo PIN-ovi (u pravom sistemu postavljaju se na serveru). */
  const ENV = { ADMIN_PIN_KOSNICA: '1111', OWNER_PIN: '2580', DEMO: true, SITE_URL: TT.root.replace(/\/$/, '') };
  let ready = null;
  function demoReady() {
    if (ready) return ready;
    if (!window.TTCore) return (ready = Promise.reject({ error: 'nodemo' }));
    if (TT.clock) TTCore.core.setClock(() => TT.now());
    ready = (async () => { if (TT.seed) await TT.seed(STORE, TTCore.core, false); })();
    return ready;
  }
  TT.demoReady = demoReady;
  TT.resetDemo = async () => {
    if (TT.clearGuestLocal) TT.clearGuestLocal(true);   // i odjava voditelja/direktora
    else try { const ks = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && (k.startsWith(P) || k.startsWith('ks_my'))) ks.push(k); } ks.forEach(k => localStorage.removeItem(k)); } catch (e) { }
    mem.clear(); ready = null; await demoReady(); bcast({ venue: '*', path: '/reset' });
  };

  /* ---------- obavijesti među karticama/okvirima (demo) ---------- */
  const subs = [];
  let lastBc = 0;
  let bc = null; try { bc = new BroadcastChannel('ttk1'); bc.onmessage = e => { lastBc = Date.now(); fire(e.data); }; } catch (e) { bc = null; }
  // rezerva (npr. stranice otvorene s diska): promjena u localStorage iz drugog prozora/okvira
  let stT = null;
  addEventListener('storage', e => { if (!e.key || !e.key.startsWith(P + 'v/')) return; clearTimeout(stT); stT = setTimeout(() => { if (Date.now() - lastBc > 400) fire({ venue: e.key.slice(P.length + 2).split('/')[0], path: '?' }); }, 250); });
  function fire(msg) { subs.forEach(fn => { try { fn(msg || {}); } catch (e) { console.error(e); } }); }
  function bcast(msg) { try { bc && bc.postMessage(msg); } catch (e) { } }
  /** Pretplata na promjene podataka (demo: odmah; živo: stranica sama osvježava). */
  TT.onChange = fn => subs.push(fn);

  /* ---------- API ---------- */
  let demoAfter = null;   // demo vodič (dolje) — savjet nakon radnje gosta/osoblja
  TT.api = async function (path, opt = {}) {
    const method = opt.method || (opt.body ? 'POST' : 'GET'), venue = opt.venue || TT.venue;
    const p = opt.root ? path : '/' + venue + path;
    const headers = { 'content-type': 'application/json' };
    if (opt.admin) headers['x-admin-pin'] = opt.pin != null ? opt.pin : TT.pin(opt.root ? null : venue);
    const body = opt.body ? JSON.stringify(opt.body) : undefined;
    if (TT.mode === 'live') {
      let r; try { r = await fetch('/api' + p, { method, headers, body, cache: 'no-store' }); } catch (e) { throw { error: 'net' }; }
      const j = await r.json().catch(() => ({ error: 'server' }));
      if (!r.ok) throw Object.assign(j, { status: r.status });
      return j;
    }
    await demoReady();
    if (!opt.fast) await new Promise(r => setTimeout(r, 90 + Math.random() * 120));
    const res = await TTCore.router.route(new Request('https://demo.tiptap/api' + p, { method, headers, body }), { store: STORE, env: ENV });
    const j = await res.json();
    if (!res.ok) throw Object.assign(j, { status: res.status });
    if (method !== 'GET' && !opt.quiet) { const m = { venue, path, at: Date.now() }; bcast(m); setTimeout(() => fire(Object.assign({ self: true }, m)), 0); }
    if (demoAfter && method !== 'GET') { try { demoAfter(path, opt.body || {}, j, venue); } catch (e) { } }
    return j;
  };

  /* ---------- zvuk ---------- */
  let AC = null;
  TT.chime = (kind) => {
    // u prezentaciji zvuk pušta glavna stranica (preglednik dopušta zvuk tek nakon dodira, a dodir u okviru vrijedi i za nju)
    try { if (window.top !== window && window.top.TT && window.top.TT.chime && window.top.TT !== TT) { window.top.TT.chime(kind); return; } } catch (e) { }
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      const notes = kind === 'wa' ? [[880, 0], [1320, .12]] : kind === 'bell' ? [[1046, 0], [1318, .14], [1568, .28]] : kind === 'ok' ? [[660, 0], [990, .1]] : [[784, 0], [1046, .13]];
      notes.forEach(([f, t]) => {
        const o = AC.createOscillator(), g = AC.createGain(); o.type = 'sine'; o.frequency.value = f;
        const t0 = AC.currentTime + t; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
        o.connect(g).connect(AC.destination); o.start(t0); o.stop(t0 + 0.55);
      });
    } catch (e) { }
  };
  // preglednici puštaju zvuk tek nakon prvog dodira
  addEventListener('pointerdown', () => { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); } catch (e) { } }, { once: true, capture: true });

  /* ---------- obavijest u stilu mobitela ---------- */
  const NCSS = `.tt-note{position:fixed;left:50%;top:max(10px,env(safe-area-inset-top));z-index:1000;width:min(94vw,420px);transform:translate(-50%,-140%);transition:transform .5s cubic-bezier(.2,.9,.25,1.15);font-family:-apple-system,"SF Pro Text",system-ui,Roboto,sans-serif;cursor:pointer}
.tt-note.on{transform:translate(-50%,0)}
.tt-note .in{background:rgba(245,245,247,.92);color:#111;border-radius:22px;padding:11px 14px 12px;box-shadow:0 18px 40px -12px rgba(0,0,0,.55),0 0 0 1px rgba(0,0,0,.06);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px)}
.tt-note .hd{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#555;letter-spacing:.01em;text-transform:uppercase;font-weight:600}
.tt-note .hd .ic{width:22px;height:22px;border-radius:6px;display:grid;place-items:center;flex:none}
.tt-note .hd .ic svg{width:15px;height:15px}
.tt-note .hd .tm{margin-left:auto;text-transform:none;font-weight:500;color:#777}
.tt-note .tt{font-weight:700;font-size:15px;margin:6px 0 2px;color:#000}
.tt-note .tx{font-size:14.5px;line-height:1.33;white-space:pre-line;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;color:#1c1c1e}
.tt-note.open .tx{-webkit-line-clamp:40}
@media (prefers-color-scheme:dark){.tt-note .in{background:rgba(44,44,46,.92);color:#fff}.tt-note .tt{color:#fff}.tt-note .tx{color:#f2f2f7}.tt-note .hd,.tt-note .hd .tm{color:#aeaeb2}}`;
  let nstyle = false, ntimer = null;
  const WA = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/></svg>';
  TT.notify = ({ app = 'WhatsApp', title = '', text = '', color = '#25d366', icon, sound = 'wa', ms = 9000 } = {}) => {
    if (!nstyle) { const s = document.createElement('style'); s.textContent = NCSS; document.head.appendChild(s); nstyle = true; }
    let el = document.getElementById('tt-note');
    if (!el) { el = document.createElement('div'); el.id = 'tt-note'; el.className = 'tt-note'; el.setAttribute('role', 'status'); el.addEventListener('click', () => { if (el.classList.contains('open')) { el.classList.remove('on', 'open'); } else el.classList.add('open'); }); document.body.appendChild(el); }
    el.classList.remove('on', 'open');
    el.innerHTML = `<div class="in"><div class="hd"><span class="ic" style="background:${color}">${icon || WA}</span>${TT.esc(app)}<span class="tm">${document.documentElement.lang === 'en' ? 'now' : 'sada'}</span></div><div class="tt">${TT.esc(title)}</div><div class="tx">${TT.esc(text)}</div></div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('on')));
    if (sound) TT.chime(sound); TT.buzz([30, 60, 30]);
    clearTimeout(ntimer); ntimer = setTimeout(() => { if (!el.classList.contains('open')) el.classList.remove('on'); }, ms);
  };

  /* ---------- gost: moje rezervacije i zahtjevi (obavijest kad osoblje odgovori) ---------- */
  TT.myRes = () => ls.get('ks_myres', []);
  TT.addMyRes = r => { const L = TT.myRes().filter(x => x.id !== r.id); L.push(r); ls.set('ks_myres', L.slice(-12)); };
  TT.myLive = () => ls.get('ks_mylive', []);
  TT.addMyLive = x => { const L = TT.myLive().filter(i => i.id !== x.id); L.push(x); ls.set('ks_mylive', L.slice(-20)); };
  let watching = false, wbusy = false;
  async function checkGuest() {
    if (wbusy) return; wbusy = true;
    try {
      const today = TT.now().date;
      const L = TT.myRes(); const evR = [];
      for (const r of L) {
        if (r.status !== 'pending' || r.date < TT.addDays(today, -1)) continue;
        try {
          const d = await TT.api(`/reservation?id=${encodeURIComponent(r.id)}&k=${encodeURIComponent(r.k)}`, { venue: r.v, fast: true });
          if (d.reservation.status !== r.status) { r.status = d.reservation.status; evR.push({ r, d }); }
        } catch (e) { if (e && e.error === 'notfound') { r.status = 'gone'; evR.push(null); } }
      }
      if (evR.length) {   // prvo spremi, pa javi stranici (da čita svježe stanje)
        const cur = TT.myRes(); L.forEach(r => { const i = cur.findIndex(c => c.id === r.id); if (i >= 0) cur[i].status = r.status; }); ls.set('ks_myres', cur);
        evR.filter(Boolean).forEach(({ r, d }) => {
          if (d.notice) TT.notify({ app: 'WhatsApp', title: d.config.venue, text: d.notice });
          document.dispatchEvent(new CustomEvent('tt:res', { detail: { id: r.id, v: r.v, data: d } }));
        });
      }
      const LL = TT.myLive(); const evL = [];
      for (const x of LL) {
        if (!['new', 'ack'].includes(x.status) || Date.now() - x.at > 6 * 3600e3) continue;
        try {
          const s = await TT.api(`/live/status?id=${encodeURIComponent(x.id)}&k=${encodeURIComponent(x.k)}`, { venue: x.v, fast: true });
          if (s.status !== x.status) { const was = x.status; x.status = s.status; if (s.status === 'done' || s.status === 'skip') x.doneAt = Date.now(); evL.push({ item: x, was }); }
        } catch (e) { if (e && e.error === 'notfound') { x.status = 'gone'; evL.push(null); } }
      }
      if (evL.length) {
        const cur = TT.myLive(); LL.forEach(x => { const i = cur.findIndex(c => c.id === x.id); if (i >= 0) { cur[i].status = x.status; if (x.doneAt) cur[i].doneAt = x.doneAt; } }); ls.set('ks_mylive', cur);
        evL.filter(Boolean).forEach(d => document.dispatchEvent(new CustomEvent('tt:live', { detail: d })));
      }
    } finally { wbusy = false; }
  }
  TT.checkGuest = checkGuest;

  /* ---------- DEMO vodič: gost ↔ uprava ↔ vlasnik na istom mobitelu (samo demo način) ----------
     • gumb DEMO (gore) otvara izbornik: gost za stolom, rezervacija, uprava, vlasnik, ostali lokali
     • nakon radnje gosta (poziv, narudžba, rezervacija…) kratki savjet "Pogledajte kao osoblje ›"
     • nakon radnje osoblja (preuzimam, sviramo, cjenik…) savjet "Pogledajte kao gost ›" */
  const DEMO_UI = TT.mode === 'demo' && !TT.pres;
  const VNAME = { kosnica: 'Košnica' };
  const VORD = ['kosnica'];
  const dT = v => (TT.DEMO_T || {})[v] || 'pet-21:10';
  const dTab = v => (TT.DEMO_TABLE || {})[v] || '5';
  /** Link unutar demoa. Isti lokal (ili vlasnik) → isti demo sat; drugi lokal → vrijeme njegove priče. */
  TT.demoHref = (v, view, o = {}) => {
    const tv = view === 'owner' ? null : v;
    let u = view === 'owner' ? TT.url(v, 'uprava/') : view === 'rez' ? TT.url(tv, 'rezervacije/') : view === 'admin' ? TT.url(tv, 'uprava/') : TT.url(tv, '') + '?sto=' + encodeURIComponent(o.table || dTab(tv)) + '&intro=0';
    if (o.q) u += (u.includes('?') ? '&' : '?') + o.q;
    if (TT.clock && (tv === null || tv === TT.venue)) u = TT.keepClock(u);
    else if (tv) u += (u.includes('?') ? '&' : '?') + 't=' + dT(tv);
    return u + (o.hash ? '#' + o.hash : '');
  };
  if (DEMO_UI) {
    const FONT = 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';
    const DCSS = `.ttd-pill{position:fixed;top:0;left:50%;z-index:950;transform:translate(-50%,-110%);transition:transform .45s cubic-bezier(.2,.9,.3,1.2);display:flex;align-items:center;gap:5px;height:20px;padding:env(safe-area-inset-top,0px) 9px 0 10px;box-sizing:content-box;border:0;border-radius:0 0 10px 10px;background:linear-gradient(180deg,#ffd978,#f0b63a);color:#1a1205;font:800 9.5px/1 ${FONT};letter-spacing:.13em;box-shadow:0 6px 16px -4px rgba(0,0,0,.6);cursor:pointer;-webkit-tap-highlight-color:transparent}
.ttd-pill.on{transform:translate(-50%,0)}
.ttd-pill.r{left:auto;right:14px;transform:translateY(-110%)}
.ttd-pill.r.on{transform:none}
body.ttd-pad{padding-top:14px}
.ttd-pill i{width:6px;height:6px;border-radius:50%;background:#1a1205;animation:ttdp 1.6s infinite}
@keyframes ttdp{0%,100%{opacity:.85}50%{opacity:.2}}
.ttd-pill svg{width:10px;height:10px}
.demoTag,#demo.demo-badge{display:none!important}
.ttd-tip{position:fixed;top:calc(env(safe-area-inset-top,0px) + 30px);left:50%;z-index:949;transform:translate(-50%,-6px);opacity:0;transition:opacity .35s,transform .35s;width:max-content;max-width:min(86vw,300px);padding:9px 13px;border-radius:12px;background:#1b1a22;color:#fff;font:600 13px/1.35 ${FONT};text-align:center;box-shadow:0 12px 30px -8px rgba(0,0,0,.75);border:1px solid rgba(255,217,120,.45);pointer-events:none}
.ttd-tip.on{opacity:1;transform:translate(-50%,0)}
.ttd-tip.r{left:auto;right:8px;transform:translateY(-6px)}
.ttd-tip.r.on{transform:none}
.ttd-tip.r::before{left:auto;right:34px;transform:rotate(45deg)}
.ttd-tip::before{content:"";position:absolute;top:-6px;left:50%;width:10px;height:10px;background:#1b1a22;border-left:1px solid rgba(255,217,120,.45);border-top:1px solid rgba(255,217,120,.45);transform:translateX(-50%) rotate(45deg)}
.ttd-ov{position:fixed;inset:0;z-index:960;background:rgba(0,0,0,.6);opacity:0;pointer-events:none;transition:opacity .3s}
.ttd-ov.on{opacity:1;pointer-events:auto}
.ttd-sh{position:fixed;left:0;right:0;bottom:0;z-index:961;max-width:520px;margin:0 auto;max-height:90vh;max-height:90dvh;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;transform:translateY(105%);transition:transform .42s cubic-bezier(.2,.9,.25,1);background:#16151c;color:#f4f2ee;border-radius:24px 24px 0 0;padding:8px 16px calc(16px + env(safe-area-inset-bottom,0px));box-shadow:0 -20px 60px -10px rgba(0,0,0,.75);border:1px solid rgba(255,255,255,.08);border-bottom:0;font:500 15px/1.35 ${FONT};text-align:left;box-sizing:border-box}
.ttd-sh.on{transform:none}
.ttd-sh *{box-sizing:border-box}
.ttd-grab{width:40px;height:5px;border-radius:3px;background:rgba(255,255,255,.2);margin:4px auto 12px}
.ttd-hd{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.ttd-hd small{display:block;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#f2c872}
.ttd-hd b{display:block;font-size:23px;font-weight:800;margin-top:3px;letter-spacing:-.01em}
.ttd-x{width:38px;height:38px;flex:none;border-radius:12px;border:0;background:rgba(255,255,255,.08);color:#fff;font:400 24px/1 ${FONT};cursor:pointer}
.ttd-lead{margin:6px 0 14px;color:#b9b5c4;font-size:14px}
.ttd-it{display:flex;align-items:center;gap:12px;padding:12px 12px 12px 12px;margin:0 0 8px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);color:inherit!important;text-decoration:none!important}
.ttd-it .ic{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;font-size:21px;background:rgba(242,200,114,.13);flex:none}
.ttd-it .t{flex:1;min-width:0}
.ttd-it b{display:block;font-size:16px;font-weight:750;color:#f6f4f0}
.ttd-it small{display:block;color:#a9a5b4;font-size:13px;margin-top:2px}
.ttd-it em{flex:none;font-style:normal;font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1a1205;background:#f2c872;border-radius:999px;padding:5px 8px;white-space:nowrap}
.ttd-it.on{border-color:rgba(242,200,114,.6);background:rgba(242,200,114,.08)}
.ttd-it .go{flex:none;color:#8d899a;font-size:24px;line-height:1}
.ttd-sub{margin:16px 2px 8px;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#8d899a}
.ttd-vs{display:flex;flex-wrap:wrap;gap:8px}
.ttd-vs a{flex:1 1 30%;text-align:center;padding:12px 8px;border-radius:13px;background:rgba(255,255,255,.06);color:#f4f2ee!important;text-decoration:none!important;font-weight:750;font-size:14px;border:1px solid rgba(255,255,255,.08);white-space:nowrap}
.ttd-vrow{padding:12px;margin:0 0 8px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07)}
.ttd-vrow b{display:block;font-size:16px;margin:0 0 9px}
.ttd-vrow span{display:flex;gap:6px}
.ttd-vrow a{flex:1;text-align:center;padding:10px 4px;border-radius:11px;background:rgba(255,255,255,.07);color:#f4f2ee!important;text-decoration:none!important;font-weight:700;font-size:13.5px;white-space:nowrap}
.ttd-reset{display:block;width:100%;margin:14px 0 2px;padding:13px;border-radius:13px;border:1px dashed rgba(255,255,255,.2);background:none;color:#b9b5c4;font:600 14px/1.2 ${FONT};cursor:pointer}
.ttd-nudge{position:fixed;top:calc(env(safe-area-inset-top,0px) + 26px);left:50%;z-index:940;width:min(94vw,420px);transform:translate(-50%,-14px);opacity:0;pointer-events:none;transition:opacity .4s,transform .4s cubic-bezier(.2,.9,.3,1.1);display:grid;grid-template-columns:1fr auto;align-items:start;gap:9px 6px;padding:12px 10px 12px 14px;border-radius:16px;background:rgba(22,21,28,.97);border:1px solid rgba(242,200,114,.5);box-shadow:0 18px 44px -10px rgba(0,0,0,.8);color:#fff;font:600 13.5px/1.35 ${FONT};text-align:left;box-sizing:border-box}
.ttd-nudge.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}
.ttd-nudge .tx{grid-column:1;grid-row:1;min-width:0;padding-top:1px}
.ttd-nudge .tx small{display:block;font-size:9.5px;font-weight:800;letter-spacing:.18em;color:#f2c872;margin-bottom:3px}
.ttd-nudge a{grid-column:1/-1;grid-row:2;text-align:center;padding:11px 12px;margin-right:4px;border-radius:12px;background:linear-gradient(180deg,#ffd978,#f0b63a);color:#1a1205!important;font-weight:800;font-size:13px;text-decoration:none!important;white-space:nowrap}
.ttd-nudge button{grid-column:2;grid-row:1;width:30px;height:30px;margin-top:-4px;border:0;background:none;color:#8d899a;font:400 20px/1 ${FONT};cursor:pointer;padding:0}
@media (prefers-reduced-motion:reduce){.ttd-pill,.ttd-sh,.ttd-nudge,.ttd-tip{transition:none}.ttd-pill i{animation:none}}`;
    let css = false;
    const addCss = () => { if (css) return; css = true; const s = document.createElement('style'); s.textContent = DCSS; document.head.appendChild(s); };
    const onBody = fn => { if (document.body) fn(); else addEventListener('DOMContentLoaded', fn); };
    const here = () => ({ menu: 'menu', rez: 'rez', admin: 'admin' }[CFG.page] || 'menu');
    const NOREZ = {};
    const VIEWS = v => [
      ['menu', '🍽️', 'Gost za stolom', 'Meni, rastavljanje jela, konobar i račun jednim dodirom'],
      ['rez', '📅', 'Rezervacija stola', 'Gost bira sto na rasporedu i dobija potvrdu'],
      ['admin', '🔐', 'Uprava (osoblje)', 'Pozivi, porudžbine, rezervacije, cene i statistika · PIN']];
    const viewFor = (x, k) => k === 'rez' && NOREZ[x] ? 'menu' : k;
    function sheetHTML() {
      const v = TT.venue, cur = here();
      let h = `<div class="ttd-grab"></div><div class="ttd-hd"><div><small>TipTap Signature · demo</small><b>${TT.esc(VNAME[v] || CFG.name || '')}</b></div><button type="button" class="ttd-x" data-ttd-close aria-label="Zatvori">×</button></div>
<p class="ttd-lead">Sve radi na ovom telefonu. Probajte kao gost, pa pogledajte kako isto vidi osoblje.</p>`;
      if (v) {
        h += VIEWS(v).map(([k, ic, t, s]) => k === cur
          ? `<a class="ttd-it on" href="#" data-ttd-close><span class="ic">${ic}</span><span class="t"><b>${t}</b><small>${s}</small></span><em>Ovde ste</em></a>`
          : `<a class="ttd-it" href="${TT.esc(TT.demoHref(v, k))}"><span class="ic">${ic}</span><span class="t"><b>${t}</b><small>${s}</small></span><span class="go">›</span></a>`).join('');
      } else {
        h += `<a class="ttd-it on" href="#" data-ttd-close><span class="ic">👑</span><span class="t"><b>Direktor · BHT</b><small>Sva 4 lokala na jednom ekranu</small></span><em>Ovdje ste</em></a><div class="ttd-sub">Lokali</div>`;
        h += VORD.map(x => `<div class="ttd-vrow"><b>${VNAME[x]}</b><span><a href="${TT.esc(TT.demoHref(x, 'menu'))}">Gost</a>${NOREZ[x] ? '' : `<a href="${TT.esc(TT.demoHref(x, 'rez'))}">Rezervacija</a>`}<a href="${TT.esc(TT.demoHref(x, 'admin'))}">Voditelj</a></span></div>`).join('');
      }
      return h + `<button type="button" class="ttd-reset" data-ttd-reset>↺ Vrati demo na početak</button>`;
    }
    let ov = null, sh = null, tipEl = null;
    function hideTip() { if (!tipEl) return; const t = tipEl; tipEl = null; t.classList.remove('on'); setTimeout(() => t.remove(), 400); }
    function closeSheet() { if (ov) ov.classList.remove('on'); if (sh) sh.classList.remove('on'); }
    function openSheet(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      addCss(); hideTip();
      if (!ov) {
        ov = document.createElement('div'); ov.className = 'ttd-ov'; ov.addEventListener('click', closeSheet); document.body.appendChild(ov);
        sh = document.createElement('section'); sh.className = 'ttd-sh'; sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-modal', 'true'); sh.setAttribute('aria-label', 'TipTap demo'); document.body.appendChild(sh);
        sh.addEventListener('click', ev => {
          if (ev.target.closest('[data-ttd-close]')) { ev.preventDefault(); closeSheet(); return; }
          const r = ev.target.closest('[data-ttd-reset]'); if (!r) return;
          ev.preventDefault();
          if (!r.dataset.a) { r.dataset.a = '1'; r.textContent = 'Dodirnite još jednom za potvrdu'; setTimeout(() => { if (r.isConnected) { delete r.dataset.a; r.textContent = '↺ Vrati demo na početak'; } }, 3500); return; }
          r.textContent = 'Vraćam podatke…'; TT.resetDemo().then(() => location.reload(), () => location.reload());
        });
      }
      sh.innerHTML = sheetHTML(); sh.scrollTop = 0;
      requestAnimationFrame(() => { ov.classList.add('on'); sh.classList.add('on'); });
      TT.buzz(8);
    }
    TT.demoSheet = openSheet;
    addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
    addEventListener('pageshow', e => { if (e.persisted) closeSheet(); });
    function maybeTip(anchorBottom) {
      let seen = null; try { seen = sessionStorage.getItem('ksd_tip'); } catch (e) { }
      if (seen) return; try { sessionStorage.setItem('ksd_tip', '1'); } catch (e) { }
      setTimeout(() => {
        if (sh && sh.classList.contains('on')) return;
        tipEl = document.createElement('div'); tipEl.className = 'ttd-tip' + (['admin', 'grupa'].includes(CFG.page) ? ' r' : ''); tipEl.textContent = 'Dodirnite DEMO: pogled osoblja i rezervacije';
        if (anchorBottom) tipEl.style.top = anchorBottom + 10 + 'px';
        document.body.appendChild(tipEl); requestAnimationFrame(() => requestAnimationFrame(() => tipEl && tipEl.classList.add('on')));
        setTimeout(hideTip, 6500);
      }, 900);
    }
    onBody(() => {
      addCss();
      {
        const side = ['admin', 'grupa'].includes(CFG.page);   // voditelj/direktor: gore desno (lijevo su logo i naziv)
        if (CFG.page === 'menu') document.body.classList.add('ttd-pad');
        const b = document.createElement('button'); b.type = 'button'; b.className = 'ttd-pill' + (side ? ' r' : ''); b.setAttribute('aria-label', 'Demo: gost, rezervacija, osoblje');
        b.innerHTML = '<i></i>DEMO<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4.5 6 7.5 9 4.5"/></svg>';
        b.addEventListener('click', openSheet); document.body.appendChild(b);
        let n = 0; const iv = setInterval(() => { n++; if (!document.getElementById('intro') || n > 40) { clearInterval(iv); b.classList.add('on'); maybeTip(); } }, 250);
      }
    });
    let nEl = null, nT = null;
    TT.demoNudge = ({ text, cta, href, ms = 12000 }) => {
      addCss();
      if (!nEl) { nEl = document.createElement('div'); nEl.className = 'ttd-nudge'; nEl.setAttribute('role', 'status'); document.body.appendChild(nEl); nEl.addEventListener('click', e => { if (e.target.closest('[data-x]')) nEl.classList.remove('on'); }); }
      nEl.innerHTML = `<div class="tx"><small>DEMO</small>${TT.esc(text)}</div>${href ? `<a href="${TT.esc(href)}">${TT.esc(cta || 'Pogledajte')} ›</a>` : ''}<button type="button" data-x aria-label="Zatvori">×</button>`;
      nEl.classList.remove('on'); requestAnimationFrame(() => requestAnimationFrame(() => nEl.classList.add('on')));
      clearTimeout(nT); nT = setTimeout(() => { if (nEl) nEl.classList.remove('on'); }, ms);
    };
    let lastMenuNudge = 0;
    demoAfter = (path, b, res, v) => {
      const page = CFG.page; let n = null;
      if (page === 'menu' || page === 'rez') {
        if (path === '/live') {
          const T = b.table || dTab(v), k = b.kind;
          n = k === 'order' ? { text: `🧾 Porudžbina sa stola ${T} je upravo stigla osoblju.`, cta: 'Pogledajte kao osoblje', href: TT.demoHref(v, 'admin', { hash: 'live' }) }
            : k === 'bill' ? { text: `🧾 Osoblje zna da sto ${T} traži račun i kako plaća.`, cta: 'Pogledajte kao osoblje', href: TT.demoHref(v, 'admin', { hash: 'live' }) }
            : { text: `🔔 Osoblje je upravo dobilo poziv sa stola ${T}.`, cta: 'Pogledajte kao osoblje', href: TT.demoHref(v, 'admin', { hash: 'live' }) };
        } else if (path === '/reserve' && res && (res.reservation || res).id) {
          const rr = res.reservation || res;
          n = { text: '📅 Lokal je upravo dobio Vašu rezervaciju.', cta: 'Potvrdite kao osoblje', href: TT.demoHref(v, 'admin', { hash: `list/${rr.date}/${encodeURIComponent(rr.id)}` }), ms: 16000 };
        } else if (path === '/feedback') {
          n = { text: '✉️ Poruka je stigla upravi — potpuno anonimno.', cta: 'Pogledajte kao uprava', href: TT.demoHref(v, 'admin', { hash: 'msgs' }) };
        }
      } else if (page === 'admin') {
        if (path === '/admin/live/update' && res && res.item) {
          const it = res.item, mine = TT.myLive().find(x => x.id === it.id);
          if (mine && ['ack', 'done'].includes(it.status)) n = { text: it.kind === 'song' ? (it.status === 'ack' ? '📱 Gost na mobitelu vidi da bend svira njegovu pjesmu.' : '📱 Gost vidi da je pjesma odsvirana.') : it.status === 'ack' ? '📱 Gost je dobio obaveštenje: osoblje je preuzelo zahtev.' : '📱 Gost vidi da je zahtev rešen.', cta: 'Pogledajte kao gost', href: TT.demoHref(v, 'menu', { table: it.table }) };
        } else if (path === '/admin/menu' && Date.now() - lastMenuNudge > 15000) {
          lastMenuNudge = Date.now();
          n = { text: '📱 Promena je odmah vidljiva svim gostima u meniju.', cta: 'Pogledajte kao gost', href: TT.demoHref(v, 'menu') };
        }
      }
      if (n) setTimeout(() => TT.demoNudge(n), 600);
    };
  }
  TT.watchGuest = () => {
    if (watching) return; watching = true;
    TT.onChange(m => { if (!m.self) checkGuest(); });
    if (TT.mode === 'live') setInterval(() => { if (document.visibilityState === 'visible' && (TT.myRes().some(r => r.status === 'pending') || TT.myLive().some(x => ['new', 'ack'].includes(x.status)))) checkGuest(); }, 8000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkGuest(); });
    setTimeout(checkGuest, 600);
  };
})();
/* =====================================================================
   TIPTAP SIGNATURE (Košnica) — DEMO podaci (samo za prezentaciju, sve izmišljeno)
   Pri prvom otvaranju (ili nakon 2 h mirovanja / "Vrati demo na početak") puni
   lokalnu bazu: rezervacije, pozive sa stolova, porudžbine, poruke, statistiku.
   Brojevi telefona su namerno nepostojeći (+381 6x 000 0xxx).
   ===================================================================== */
(function () {
  'use strict';
  const TT = window.TT; if (!TT) return;
  const VERSION = 'k3';
  const STORY = { kosnica: ['M1', 'S3'] };          // slobodni na demo dan (za rezervaciju uživo)
  TT.DEMO_TABLE = { kosnica: '5' };                // "gostov sto" u prezentaciji
  TT.DEMO_T = { kosnica: 'pet-21:10' };            // petak uveče, svirka od 22h

  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const F = ['Ana', 'Jelena', 'Milica', 'Marija', 'Jovana', 'Teodora', 'Sara', 'Mina', 'Katarina', 'Nevena', 'Ivana', 'Tamara', 'Dragana', 'Maja', 'Sanja', 'Tijana', 'Nataša', 'Aleksandra', 'Danijela', 'Vesna'];
  const M = ['Marko', 'Nikola', 'Stefan', 'Lazar', 'Luka', 'Milan', 'Aleksandar', 'Nemanja', 'Filip', 'Uroš', 'Dušan', 'Vuk', 'Miloš', 'Petar', 'Bojan', 'Dejan', 'Ognjen', 'Igor', 'Zoran', 'Vladimir'];
  const SUR = ['Jovanović', 'Petrović', 'Nikolić', 'Marković', 'Đorđević', 'Stojanović', 'Ilić', 'Stanković', 'Pavlović', 'Milošević', 'Popović', 'Živković', 'Todorović', 'Janković', 'Kostić', 'Ristić', 'Lukić', 'Simić', 'Mitrović', 'Obradović', 'Savić', 'Tomić', 'Pantić', 'Lazić', 'Ćirić'];
  const OCC_NOTES = {
    rodjendan: ['Slavimo 30. rođendan 🎉', 'Torta u ponoć — donosimo je sami 🎂', 'Iznenađenje za slavljenicu, molimo diskretno 🤫'],
    proslava: ['Proslava godišnjice braka ❤️', 'Slavimo diplomu 🎓', 'Proslava novog posla 🥂'],
    posao: ['Poslovni ručak — treba nam račun na firmu', 'Dolazimo sa poslovnim partnerima iz Beograda'],
    utakmica: ['Gledamo utakmicu ⚽ — sto sa pogledom na TV', 'Dolazimo pre početka utakmice']
  };
  const NOTES = ['Što bliže svirci, molim', 'Bićemo 10 minuta kasnije', 'Treba nam dečija stolica', 'Prvi put kod vas 🙂', 'Jedna osoba je vegetarijanac', 'Dolazimo posle posla'];
  const OCC = ['', '', '', 'rodjendan', 'proslava', 'posao', 'utakmica'];
  const SRC = ['web', 'web', 'web', 'web', 'telefon', 'telefon', 'instagram', 'uživo'];
  const FB = [
    ['hrana', 'Košnica burger je bio odličan, ali pomfrit je stigao hladan.', 4, true],
    ['glazba', 'Olja i Aca su bili sjajni u petak, cela ekipa oduševljena! 🎤', 6, true],
    ['cekanje', 'Na palačinke smo čekali skoro 30 minuta, a lokal nije bio pun.', 2, false],
    ['usluga', 'Konobarica kod šanka je bila jako ljubazna, svaka čast.', 1, false],
    ['cistoca', 'U toaletu nije bilo papira oko 23h.', 9, true]
  ];
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
  const iso = (msAgo) => new Date(Date.now() - msAgo).toISOString();

  async function seedVenue(store, C, v, R, items) {
    const S = C.scoped(store, v); const cfg = await C.getConfig(S);
    const [wd, hm] = (TT.DEMO_T[v] || 'pet-21:10').split('-'); const WDS = ['ned', 'pon', 'uto', 'sre', 'cet', 'pet', 'sub'];
    const real = TT.realNow(); let demoDate = real.date;
    for (let i = 0; i < 7; i++) { const x = TT.addDays(real.date, i); if (TT.wd(x) === WDS.indexOf(wd)) { demoDate = x; break; } }
    const demoMin = TT.toMin(hm);
    let ph = 100;
    const phone = () => `+381 6${1 + Math.floor(R() * 5)} 000 ${String(++ph).padStart(4, '0')}`;
    const person = () => `${pick(R, R() < .5 ? F : M)} ${pick(R, SUR)}`;

    /* --- rezervacije: od prekjuče do +12 dana --- */
    const dates = new Set(); for (let i = -2; i <= 12; i++) dates.add(TT.addDays(real.date, i)); dates.add(demoDate);
    for (const date of [...dates].sort()) {
      const slots = C.slotsFor(cfg, date); if (!slots.length) continue;
      const w = TT.wd(date), weekend = w === 5 || w === 6;
      const dens = weekend ? (date === demoDate ? .7 : .55) : (w === 4 ? .35 : .22);
      const isDemo = date === demoDate, isPast = date < real.date && !isDemo, isNext = date === TT.addDays(demoDate, 1);
      const keep = t => !((isDemo || isNext) && (STORY[v] || []).includes(t.id)) && !(isDemo && t.id === TT.DEMO_TABLE[v]);
      const tables = cfg.tables.filter(keep).sort(() => R() - .5).slice(0, Math.round(cfg.tables.length * dens));
      if (isDemo) {
        const t = cfg.tables.find(x => x.id === TT.DEMO_TABLE[v]);
        const early = slots.filter(m => m <= demoMin - 15); const start = early.length ? early[early.length - 1] : slots[0];
        if (t) await C.createReservation(S, { date, start, party: Math.max(t.min || 1, Math.min(t.max, 4)), tableId: t.id, name: person(), phone: phone(), status: 'seated', source: 'web', _at: iso(2 * 864e5) }, { admin: true });
      }
      let pend = 0;
      for (const t of tables) {
        const party = Math.max(t.min || 1, Math.min(t.max, Math.round((t.min || 1) + R() * (t.max - (t.min || 1)))));
        const evening = slots.filter(m => m >= 18 * 60), pool = weekend && evening.length ? evening : slots;
        const start = pick(R, pool);
        let status = 'confirmed';
        if (isPast) status = R() < .9 ? 'done' : 'noshow';
        else if (isDemo) status = start + 20 <= demoMin ? 'seated' : (pend < 2 && R() < .4 ? (pend++, 'pending') : 'confirmed');
        else if (date <= TT.addDays(real.date, 6) && R() < .25) status = 'pending';
        const occasion = pick(R, OCC);
        const note = occasion ? (R() < .55 ? pick(R, OCC_NOTES[occasion] || ['']) : '') : (R() < .3 ? pick(R, NOTES) : '');
        await C.createReservation(S, { date, start, party, tableId: t.id, name: person(), phone: phone(), status, source: status === 'pending' ? 'web' : pick(R, SRC), occasion, note, _at: iso((1 + R() * 9) * 864e5) }, { admin: true });
      }
    }

    /* --- sto uživo: večerašnji rešeni pozivi, računi i porudžbine (za statistiku i prosek reakcije) --- */
    const dayList = ((await S.getJSON(`res/${demoDate}`)) || {}).data || [];
    const seated = dayList.filter(r => r.status === 'seated' && r.tableId !== TT.DEMO_TABLE[v]).map(r => r.tableId);
    const pool = seated.length ? seated : cfg.tables.map(t => t.id).filter(id => id !== TT.DEMO_TABLE[v] && !(STORY[v] || []).includes(id));
    const mk = (kind, minsAgo, status, extra) => {
      const m = minsAgo + R() * 4;
      const it = Object.assign({ id: C.token(6), k: C.token(10), kind, table: pick(R, pool), status, createdAt: iso(m * 60e3), lang: 'hr' }, extra || {});
      if (status !== 'new') it.ackAt = iso((m - .5 - R() * 1.6) * 60e3);
      if (status === 'done' || status === 'skip') it.doneAt = iso((m - 3 - R() * 3) * 60e3);
      return it;
    };
    const top = (items && items.top) || [];
    const order = (n) => { const its = []; for (let i = 0; i < n; i++) { const x = pick(R, top.slice(0, 12)); if (x && !its.find(y => y.id === x.id)) its.push({ id: x.id, n: x.name, v: '', q: R() < .25 ? 2 : 1, e: x.price || 0 }); } return { items: its, total: its.reduce((a, x) => a + x.q * x.e, 0) }; };
    const REASONS = ['Želim da poručim', 'Još jedno piće', '', 'Imam pitanje', 'Želim da poručim', 'Još jedno piće'];
    const live = [];
    [96, 81, 66, 52, 40, 29, 18, 9].forEach((m, i) => {
      const kind = i % 4 === 1 ? 'bill' : i % 4 === 3 && top.length ? 'order' : 'call';
      const ex = kind === 'bill' ? { pay: R() < .65 ? 'card' : 'cash' } : kind === 'order' ? order(2 + Math.floor(R() * 3)) : (REASONS[i % REASONS.length] ? { note: REASONS[i % REASONS.length] } : {});
      live.push(mk(kind, m, 'done', ex));
    });
    live.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
    for (const d of new Set([demoDate, TT.biz().date, (() => { const n = TT.realNow(); return n.min < 360 ? TT.addDays(n.date, -1) : n.date; })()])) await S.setJSON(`live/${d}`, live.map(x => Object.assign({}, x, { id: C.token(6) })), null);

    /* --- anonimne poruke --- */
    const fbByMonth = {};
    for (const [topic, msg, daysAgo, read] of FB) {
      const at = new Date(Date.now() - daysAgo * 864e5 - R() * 5 * 3600e3); const ym = at.toISOString().slice(0, 7);
      (fbByMonth[ym] = fbByMonth[ym] || []).push({ id: C.token(6), topic, msg, when: '', contact: '', table: R() < .5 ? pick(R, pool) : '', lang: 'hr', createdAt: at.toISOString(), read, done: read && R() < .6 });
    }
    for (const [ym, list] of Object.entries(fbByMonth)) await S.setJSON(`fb/${ym}`, list, null);

    /* --- statistika: 15 dana unazad --- */
    const base = [140, 95, 100, 105, 130, 230, 260];
    const sd = new Set(); for (let i = 0; i <= 15; i++) { sd.add(TT.addDays(real.date, -i)); sd.add(TT.addDays(demoDate, -i)); }
    for (const date of sd) {
      const w = TT.wd(date); let open = Math.round(base[w] * (.75 + R() * .5));
      if (date === demoDate) open = Math.round(open * .6);
      const view = {}, names = {};
      top.forEach((x, i) => { const n = Math.round(open * (1.2 / (i + 1.5)) * (.7 + R() * .6)); if (n > 0) { view[x.id] = n; names[x.id] = x.name; } });
      await S.setJSON(`st/${date}/0`, { open, review: Math.round(open * (.04 + R() * .03)), book: Math.round(open * (.02 + R() * .04)), table: Math.round(open * (.3 + R() * .15)), view, names }, null);
    }
  }

  /** Lokalni podaci gosta na ovom uređaju (moja lista…) — brišu se uz demo podatke. */
  TT.clearGuestLocal = (pins) => {
    try {
      const ks = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && (k.startsWith('ttk1:') || k.startsWith('ks_my') || (pins && k.startsWith('ks_pin_')) || k === 'ks_guest' || k === 'ks_list')) ks.push(k); }
      ks.forEach(k => localStorage.removeItem(k));
    } catch (e) { }
  };
  TT.seed = async function (store, C, force) {
    let meta = null; try { meta = JSON.parse(localStorage.getItem('ttk1:seed') || 'null'); } catch (e) { }
    let last = 0; try { last = +localStorage.getItem('ttk1:last') || 0; } catch (e) { }
    const stale = meta && Date.now() - Math.max(meta.at, last) > 2 * 3600e3;
    if (meta && meta.v === VERSION && !force && !stale) return;
    TT.clearGuestLocal();
    const items = window.TT_DEMO_ITEMS || {};
    const keep = TT.clock;
    C.setClock(null);
    try { for (const v of C.VENUE_IDS) await seedVenue(store, C, v, rng(1207), items[v]); }
    finally { if (keep) C.setClock(() => TT.now()); }
    try { localStorage.setItem('ttk1:seed', JSON.stringify({ v: VERSION, at: Date.now() })); } catch (e) { }
  };
  TT.onChange(m => { if (m.self) try { localStorage.setItem('ttk1:last', String(Date.now())); } catch (e) { } });
})();
window.KS={"name": "Košnica", "phone": "+381665399999", "phoneTxt": "066 / 53 99 999", "gigPhone": "+381665399999", "gigPhoneTxt": "066/53-99999", "hours": {"0": ["10:00", "00:00"], "1": ["08:00", "00:00"], "2": ["08:00", "00:00"], "3": ["08:00", "00:00"], "4": ["08:00", "01:00"], "5": ["08:00", "02:00"], "6": ["08:00", "02:00"]}, "gigs": [{"wd": 5, "name": "Olja i Aca", "from": "22:00", "to": "02:00", "img": "g:petak"}, {"wd": 6, "name": "Savacium Acoustic", "from": "22:00", "to": "02:00", "img": "g:subota"}], "map": "https://maps.google.com/?cid=16218778338560428660", "review": "https://maps.google.com/?cid=16218778338560428660", "ig": "https://www.instagram.com/kosnicagastropub/", "delivery": "https://www.alideda.rs/kosnica-dostava-sabac", "orders": true, "story": {"sr": ["Košnica je u Šabac donela nešto sasvim novo: moderan ambijent u Karađorđevoj ulici, od jutarnje kafe do kasno u noć.", "Za vas smo pažljivo birali meni za sve uzraste, premijum pića i profesionalnu uslugu. Prostor je opremljen za svaku priliku — od jutarnje kafe i poslovnog ručka do rođendana.", "Petkom i subotom od 22h svira se uživo."], "en": ["Košnica brought something completely new to Šabac: a modern place on Karađorđeva street, from morning coffee until late at night.", "We carefully chose a menu for all ages, premium drinks and professional service. The space is ready for every occasion — from morning coffee and business lunch to birthdays.", "Live music every Friday and Saturday from 10 pm."]}, "coffee": {"sr": "Kafa je važan deo svakog dana. Zato smo izabrali najsavremeniju opremu i, kako volimo da kažemo, najkvalitetniju kafu u gradu.", "en": "Coffee is an important part of every day. That is why we chose state-of-the-art equipment and, as we like to say, the best coffee in town."}, "walk": {"shots": [{"img": "w1", "fx": 63, "fy": 38, "z0": 1.06, "z1": 1.42, "dur": 2600, "flash": true}, {"img": "w2", "fx": 14, "fy": 60, "z0": 1.25, "z1": 1.06, "px0": 3, "px1": -2, "dur": 2300, "cap": ["w1", "w2"]}, {"img": "w3", "fx": 50, "fy": 40, "z0": 1.22, "z1": 1.0, "dur": 2400, "cap": ["w3", "w4"]}]}, "img": {"d:klasik-dorucak": ["img/jela/klasik-dorucak.webp"], "d:klasik-dorucak-2": ["img/jela/klasik-dorucak-2.webp"], "d:klasik-dorucak-3": ["img/jela/klasik-dorucak-3.webp"], "d:kosnica-dorucak": ["img/jela/kosnica-dorucak.webp"], "d:punjene-przenice": ["img/jela/punjene-przenice.webp"], "d:healthy-dorucak": ["img/jela/healthy-dorucak.webp"], "d:kosnica-sendvic": ["img/jela/kosnica-sendvic.webp"], "d:klub-sendvic": ["img/jela/klub-sendvic.webp"], "d:quesadilla": ["img/jela/quesadilla.webp"], "d:rolovana-punjena-piletina": ["img/jela/rolovana-punjena-piletina.webp"], "d:carska-piletina": ["img/jela/carska-piletina.webp"], "d:grilovana-piletina": ["img/jela/grilovana-piletina.webp"], "d:rizoto-sa-piletinom": ["img/jela/rizoto-sa-piletinom.webp"], "d:kobasica-sa-sirom": ["img/jela/kobasica-sa-sirom.webp"], "d:zapecena-kolenica": ["img/jela/zapecena-kolenica.webp"], "d:pivska-daska-kosnica-za-dvoje": ["img/jela/pivska-daska-kosnica-za-dvoje.webp"], "d:zakuska-kosnica": ["img/jela/zakuska-kosnica.webp"], "d:selekcija-sireva": ["img/jela/selekcija-sireva.webp"], "d:kosnica-plata": ["img/jela/kosnica-plata.webp"], "d:cevapi": ["img/jela/cevapi.webp"], "d:svinjski-medaljoni": ["img/jela/svinjski-medaljoni.webp"], "d:smudj": ["img/jela/smudj.webp"], "d:pica-kosnica": ["img/jela/pica-kosnica.webp"], "d:kapricoza": ["img/jela/kapricoza.webp"], "d:peperoni-pica": ["img/jela/peperoni-pica.webp"], "d:kvatro-formadji-pica": ["img/jela/kvatro-formadji-pica.webp"], "d:mediteran-pica": ["img/jela/mediteran-pica.webp"], "d:tuna-pica": ["img/jela/tuna-pica.webp"], "d:kvatro-stadjoni-pica": ["img/jela/kvatro-stadjoni-pica.webp"], "d:cezar-salata": ["img/jela/cezar-salata.webp"], "d:grcka-salata": ["img/jela/grcka-salata.webp"], "d:tuna-salata": ["img/jela/tuna-salata.webp"], "d:karbonara-pasta": ["img/jela/karbonara-pasta.webp"], "d:tartufo-piletina-pasta": ["img/jela/tartufo-piletina-pasta.webp"], "d:kosnica-burger": ["img/jela/kosnica-burger.webp"], "d:ciken-burger": ["img/jela/ciken-burger.webp"], "d:cilito-burger": ["img/jela/cilito-burger.webp"], "d:smoked-burger": ["img/jela/smoked-burger.webp"], "d:panko-piletina": ["img/jela/panko-piletina.webp"], "d:prolecne-rolnice": ["img/jela/prolecne-rolnice.webp"], "d:takitosi": ["img/jela/takitosi.webp"], "d:nacosi": ["img/jela/nacosi.webp"], "d:panko-tortilja": ["img/jela/panko-tortilja.webp"], "d:mini-burger": ["img/jela/mini-burger.webp"], "d:mini-panko-piletina": ["img/jela/mini-panko-piletina.webp"], "d:mini-cevapi": ["img/jela/mini-cevapi.webp"], "d:cizkejk": ["img/jela/cizkejk.webp"], "d:karamel-badem": ["img/jela/karamel-badem.webp"], "d:kinder-kolac": ["img/jela/kinder-kolac.webp"], "d:pohovani-sladoled": ["img/jela/pohovani-sladoled.webp"], "d:pohovani-sladoled-2": ["img/jela/pohovani-sladoled-2.webp"], "d:pohovani-sladoled-3": ["img/jela/pohovani-sladoled-3.webp"], "d:kinder-palacinka": ["img/jela/kinder-palacinka.webp"], "d:kosnica-palacinka": ["img/jela/kosnica-palacinka.webp"], "c:dorucak": ["img/kat/dorucak.jpg"], "c:piletina": ["img/kat/piletina.jpg"], "c:kosnica": ["img/kat/kosnica.jpg"], "c:pica": ["img/kat/pica.jpg"], "c:salate": ["img/kat/salate.jpg"], "c:paste": ["img/kat/paste.jpg"], "c:burgeri": ["img/kat/burgeri.jpg"], "c:finger": ["img/kat/finger.jpg"], "c:deca": ["img/kat/deca.jpg"], "c:deserti": ["img/kat/deserti.jpg"], "c:palacinke": ["img/kat/palacinke.jpg"], "c:prilozi": ["img/kat/prilozi.jpg"], "c:pica-karta": ["img/kat/pica-karta.jpg"], "w1": ["img/ambijent/w1.jpg"], "w2": ["img/ambijent/w2.jpg"], "w3": ["img/ambijent/w3.jpg"], "story1": ["img/ambijent/story1.jpg"], "story2": ["img/ambijent/story2.jpg"], "story3": ["img/ambijent/story3.jpg"], "coffee": ["img/ambijent/coffee.jpg"], "bar": ["img/ambijent/bar.jpg"], "hero": ["img/ambijent/w3.jpg"], "g:petak": ["img/svirke/petak.jpg"], "g:subota": ["img/svirke/subota.jpg"]}, "logo": ["img/logo.png", "https://kosnicagastropub.rs/wp-content/uploads/2023/06/Kosnica.png"]};
window.KS_MENU={"cats": [{"id": "dorucak", "sr": "Doručak", "en": "Breakfast", "note": "Dan počinje kafom i dobrim doručkom.", "note_en": "The day starts with coffee and a proper breakfast."}, {"id": "piletina", "sr": "Specijaliteti od piletine", "en": "Chicken specialties", "note": "Pileće belo meso, 300 g po porciji.", "note_en": "Chicken breast, 300 g per portion."}, {"id": "kosnica", "sr": "Specijaliteti Košnica", "en": "Košnica specialties", "note": "Plate i daske za društvo, ćevapi, kolenica i smuđ.", "note_en": "Platters and boards to share, ćevapi, pork knuckle and zander."}, {"id": "pica", "sr": "Pica", "en": "Pizza", "note": "Pice od 32 cm.", "note_en": "32 cm pizzas."}, {"id": "salate", "sr": "Obrok salate", "en": "Meal salads", "note": "Salate koje su ceo obrok.", "note_en": "Salads that make a full meal."}, {"id": "paste", "sr": "Paste", "en": "Pasta", "note": "", "note_en": ""}, {"id": "burgeri", "sr": "Burgeri", "en": "Burgers", "note": "100% juneće meso, uz pomfrit i kolutiće luka.", "note_en": "100% beef, with French fries and onion rings."}, {"id": "finger", "sr": "Finger food", "en": "Finger food", "note": "Za deljenje uz piće.", "note_en": "To share over drinks."}, {"id": "deca", "sr": "Dečiji meni", "en": "Kids' menu", "note": "Manje porcije za najmlađe.", "note_en": "Smaller portions for the little ones."}, {"id": "deserti", "sr": "Deserti", "en": "Desserts", "note": "", "note_en": ""}, {"id": "palacinke", "sr": "Palačinke", "en": "Pancakes", "note": "", "note_en": ""}, {"id": "prilozi", "sr": "Prilozi, salate i sosevi", "en": "Sides, salads & sauces", "note": "Prilozi 200 g.", "note_en": "Sides 200 g."}], "items": [{"id": "klasik-dorucak", "cat": "dorucak", "sr": "Klasik doručak", "en": "Classic breakfast", "desc": "Jaja (3 kom.), pomfrit, feta sir, paradajz i po izboru slanina, šunka ili kobasica.", "desc_en": "3 eggs, French fries, feta cheese, tomato and your choice of bacon, ham or sausage.", "pair": ["punjene-przenice"], "mode": "knoll", "img": "klasik-dorucak", "comps": [{"a": "egg_fried", "k": "egg_fried", "sr": "Jaja (3 kom.)", "en": "3 eggs", "g": 150, "kcal": 294, "grp": "meso"}, {"a": "bacon", "k": "bacon", "sr": "Slanina", "en": "Bacon", "g": 50, "kcal": 270, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 110, "kcal": 343, "grp": "testo"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 40, "kcal": 106, "grp": "sir"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 60, "kcal": 11, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}], "nut": {"kcal": 1050, "p": 49, "c": 57, "f": 69}, "al": ["mleko", "jaja"], "var": [["Slanina", 610], ["Šunka", 610], ["Kobasica", 610]], "var_en": ["Bacon", "Ham", "Sausage"], "vimg": ["klasik-dorucak", "klasik-dorucak-2", "klasik-dorucak-3"], "vc": [{"comps": [{"a": "egg_fried", "k": "egg_fried", "sr": "Jaja (3 kom.)", "en": "3 eggs", "g": 150, "kcal": 294, "grp": "meso"}, {"a": "bacon", "k": "bacon", "sr": "Slanina", "en": "Bacon", "g": 50, "kcal": 270, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 110, "kcal": 343, "grp": "testo"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 40, "kcal": 106, "grp": "sir"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 60, "kcal": 11, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}], "nut": {"kcal": 1050, "p": 49, "c": 57, "f": 69}, "al": ["mleko", "jaja"]}, {"comps": [{"a": "egg_fried", "k": "egg_fried", "sr": "Jaja (3 kom.)", "en": "3 eggs", "g": 150, "kcal": 294, "grp": "meso"}, {"a": "ham", "k": "ham", "sr": "Šunka", "en": "Ham", "g": 70, "kcal": 102, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 110, "kcal": 343, "grp": "testo"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 40, "kcal": 106, "grp": "sir"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 60, "kcal": 11, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}], "nut": {"kcal": 880, "p": 45, "c": 57, "f": 52}, "al": ["mleko", "jaja"]}, {"comps": [{"a": "egg_fried", "k": "egg_fried", "sr": "Jaja (3 kom.)", "en": "3 eggs", "g": 150, "kcal": 294, "grp": "meso"}, {"a": "sausage", "k": "sausage", "sr": "Kobasica", "en": "Sausage", "g": 90, "kcal": 270, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 110, "kcal": 343, "grp": "testo"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 40, "kcal": 106, "grp": "sir"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 60, "kcal": 11, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}], "nut": {"kcal": 1050, "p": 42, "c": 58, "f": 72}, "al": ["mleko", "jaja"]}]}, {"id": "kosnica-dorucak", "cat": "dorucak", "sr": "Košnica doručak", "en": "Košnica breakfast", "desc": "Jaja (3 kom.), pomfrit, ajvar, duvan čvarci, feta, paradajz, slanina, kobasica.", "desc_en": "3 eggs, French fries, ajvar (pepper spread), pork cracklings, feta cheese, tomato, bacon, sausage.", "price": 720, "story": "Doručak kuće: jaja, kobasica, slanina, duvan čvarci i ajvar — sve što volimo na jednom tanjiru.", "story_en": "The house breakfast: eggs, sausage, bacon, pork cracklings and ajvar — everything we love on one plate.", "sig": true, "mode": "knoll", "img": "kosnica-dorucak", "comps": [{"a": "egg_fried", "k": "egg_fried", "sr": "Jaja (3 kom.)", "en": "3 eggs", "g": 150, "kcal": 294, "grp": "meso"}, {"a": "sausage", "k": "sausage", "sr": "Kobasica", "en": "Sausage", "g": 80, "kcal": 240, "grp": "meso"}, {"a": "bacon", "k": "bacon", "sr": "Slanina", "en": "Bacon", "g": 40, "kcal": 216, "grp": "meso"}, {"a": "cvarci", "k": "cvarci", "sr": "Duvan čvarci", "en": "Pork cracklings", "g": 25, "kcal": 150, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 100, "kcal": 312, "grp": "testo"}, {"a": "ajvar", "k": "ajvar", "sr": "Ajvar", "en": "Ajvar", "g": 30, "kcal": 27, "grp": "sos"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 35, "kcal": 92, "grp": "sir"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 50, "kcal": 9, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 15, "kcal": 2, "grp": "povrce"}], "nut": {"kcal": 1340, "p": 62, "c": 51, "f": 98}, "al": ["mleko", "jaja"]}, {"id": "punjene-przenice", "cat": "dorucak", "sr": "Punjene prženice", "en": "Stuffed French toast", "desc": "Pečenica, mozzarella, pavlaka.", "desc_en": "Smoked pork loin, mozzarella, sour cream.", "mode": "knoll", "img": "punjene-przenice", "comps": [{"a": "french_toast", "k": "french_toast", "sr": "Prženice", "en": "French toast", "g": 170, "kcal": 476, "grp": "testo"}, {"a": "pecenica", "k": "pecenica", "sr": "Pečenica", "en": "Smoked pork loin", "g": 50, "kcal": 80, "grp": "meso"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 50, "kcal": 140, "grp": "sir"}, {"a": "cream", "k": "cream", "sr": "Pavlaka", "en": "Sour cream", "g": 40, "kcal": 80, "grp": "sir"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 80, "kcal": 250, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 1050, "p": 43, "c": 92, "f": 57}, "al": ["gluten", "mleko", "jaja"], "var": [["Cela porcija", 610], ["Pola porcije", 390]], "var_en": ["Full portion", "Half portion"], "vc": [{"comps": [{"a": "french_toast", "k": "french_toast", "sr": "Prženice", "en": "French toast", "g": 170, "kcal": 476, "grp": "testo"}, {"a": "pecenica", "k": "pecenica", "sr": "Pečenica", "en": "Smoked pork loin", "g": 50, "kcal": 80, "grp": "meso"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 50, "kcal": 140, "grp": "sir"}, {"a": "cream", "k": "cream", "sr": "Pavlaka", "en": "Sour cream", "g": 40, "kcal": 80, "grp": "sir"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 80, "kcal": 250, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 1050, "p": 43, "c": 92, "f": 57}, "al": ["gluten", "mleko", "jaja"]}, {"comps": [{"a": "french_toast", "k": "french_toast", "sr": "Prženice", "en": "French toast", "g": 100, "kcal": 280, "grp": "testo"}, {"a": "pecenica", "k": "pecenica", "sr": "Pečenica", "en": "Smoked pork loin", "g": 30, "kcal": 48, "grp": "meso"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 30, "kcal": 84, "grp": "sir"}, {"a": "cream", "k": "cream", "sr": "Pavlaka", "en": "Sour cream", "g": 25, "kcal": 50, "grp": "sir"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 50, "kcal": 156, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 10, "kcal": 11, "grp": "sos", "side": 1}], "nut": {"kcal": 630, "p": 26, "c": 55, "f": 34}, "al": ["gluten", "mleko", "jaja"]}]}, {"id": "healthy-dorucak", "cat": "dorucak", "sr": "Healthy doručak", "en": "Healthy breakfast", "desc": "Granola, grčki jogurt, voće, med.", "desc_en": "Granola, Greek yogurt, fruit, honey.", "price": 590, "mode": "knoll", "img": "healthy-dorucak", "comps": [{"a": "yogurt", "k": "yogurt", "sr": "Grčki jogurt", "en": "Greek yogurt", "g": 200, "kcal": 194, "grp": "sir"}, {"a": "granola", "k": "granola", "sr": "Granola", "en": "Granola", "g": 50, "kcal": 235, "grp": "testo"}, {"a": "berries", "k": "berries", "sr": "Šumsko voće", "en": "Berries", "g": 80, "kcal": 40, "grp": "voce"}, {"a": "honey", "k": "honey", "sr": "Med", "en": "Honey", "g": 20, "kcal": 61, "grp": "slatko"}], "nut": {"kcal": 530, "p": 24, "c": 66, "f": 20}, "al": ["gluten", "mleko"]}, {"id": "kosnica-sendvic", "cat": "dorucak", "sr": "Košnica sendvič", "en": "Košnica sandwich", "desc": "Piletina, pršut, mozzarella, kiseli krastavčići, zelena salata, BBQ sos, cezar sos.", "desc_en": "Chicken, prosciutto, mozzarella, pickles, lettuce, BBQ sauce, Caesar dressing.", "story": "Topli sendvič kuće sa piletinom, pršutom i dva sosa — probušen našim medenim štapićem.", "story_en": "Our warm house sandwich with chicken, prosciutto and two sauces — pinned with our honey dipper.", "sig": true, "mode": "stack", "img": "kosnica-sendvic", "deco": ["dipper"], "comps": [{"a": "panini", "k": "panini", "sr": "Pecivo (gornje)", "en": "Bread (top)", "g": 70, "kcal": 189, "grp": "testo"}, {"a": "caesar", "k": "caesar", "sr": "Cezar sos", "en": "Caesar dressing", "g": 20, "kcal": 90, "grp": "sos"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "pickles", "k": "pickles", "sr": "Kiseli krastavčići", "en": "Pickles", "g": 20, "kcal": 2, "grp": "povrce"}, {"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 30, "kcal": 75, "grp": "meso"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 40, "kcal": 112, "grp": "sir"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 100, "kcal": 165, "grp": "meso"}, {"a": "bbq", "k": "bbq", "sr": "BBQ sos", "en": "BBQ sauce", "g": 20, "kcal": 34, "grp": "sos"}, {"a": "panini", "k": "panini", "sr": "Pecivo (donje)", "en": "Bread (bottom)", "g": 60, "kcal": 162, "grp": "testo"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 100, "kcal": 312, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 1170, "p": 64, "c": 122, "f": 46}, "al": ["gluten", "mleko", "jaja"], "var": [["Cela porcija", 820], ["Pola porcije", 510]], "var_en": ["Full portion", "Half portion"], "vc": [{"comps": [{"a": "panini", "k": "panini", "sr": "Pecivo (gornje)", "en": "Bread (top)", "g": 70, "kcal": 189, "grp": "testo"}, {"a": "caesar", "k": "caesar", "sr": "Cezar sos", "en": "Caesar dressing", "g": 20, "kcal": 90, "grp": "sos"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "pickles", "k": "pickles", "sr": "Kiseli krastavčići", "en": "Pickles", "g": 20, "kcal": 2, "grp": "povrce"}, {"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 30, "kcal": 75, "grp": "meso"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 40, "kcal": 112, "grp": "sir"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 100, "kcal": 165, "grp": "meso"}, {"a": "bbq", "k": "bbq", "sr": "BBQ sos", "en": "BBQ sauce", "g": 20, "kcal": 34, "grp": "sos"}, {"a": "panini", "k": "panini", "sr": "Pecivo (donje)", "en": "Bread (bottom)", "g": 60, "kcal": 162, "grp": "testo"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 100, "kcal": 312, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 1170, "p": 64, "c": 122, "f": 46}, "al": ["gluten", "mleko", "jaja"]}, {"comps": [{"a": "panini", "k": "panini", "sr": "Pecivo (gornje)", "en": "Bread (top)", "g": 40, "kcal": 108, "grp": "testo"}, {"a": "caesar", "k": "caesar", "sr": "Cezar sos", "en": "Caesar dressing", "g": 10, "kcal": 45, "grp": "sos"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 10, "kcal": 1, "grp": "povrce"}, {"a": "pickles", "k": "pickles", "sr": "Kiseli krastavčići", "en": "Pickles", "g": 10, "kcal": 1, "grp": "povrce"}, {"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 20, "kcal": 50, "grp": "meso"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 25, "kcal": 70, "grp": "sir"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 60, "kcal": 99, "grp": "meso"}, {"a": "bbq", "k": "bbq", "sr": "BBQ sos", "en": "BBQ sauce", "g": 10, "kcal": 17, "grp": "sos"}, {"a": "panini", "k": "panini", "sr": "Pecivo (donje)", "en": "Bread (bottom)", "g": 35, "kcal": 94, "grp": "testo"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 60, "kcal": 187, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 10, "kcal": 11, "grp": "sos", "side": 1}], "nut": {"kcal": 680, "p": 39, "c": 70, "f": 27}, "al": ["gluten", "mleko", "jaja"]}]}, {"id": "klub-sendvic", "cat": "dorucak", "sr": "Club sendvič", "en": "Club sandwich", "desc": "Piletina, slanina, zelena salata, paradajz, cezar sos.", "desc_en": "Chicken, bacon, lettuce, tomato, Caesar dressing.", "mode": "stack", "img": "klub-sendvic", "comps": [{"a": "toast", "k": "toast", "sr": "Tost", "en": "Toast", "g": 40, "kcal": 106, "grp": "testo"}, {"a": "caesar", "k": "caesar", "sr": "Cezar sos", "en": "Caesar dressing", "g": 12, "kcal": 54, "grp": "sos"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 10, "kcal": 1, "grp": "povrce"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 40, "kcal": 7, "grp": "povrce"}, {"a": "bacon", "k": "bacon", "sr": "Slanina", "en": "Bacon", "g": 30, "kcal": 162, "grp": "meso"}, {"a": "toast", "k": "toast", "sr": "Tost", "en": "Toast", "g": 40, "kcal": 106, "grp": "testo"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 90, "kcal": 148, "grp": "meso"}, {"a": "caesar", "k": "caesar", "sr": "Cezar sos", "en": "Caesar dressing", "g": 13, "kcal": 58, "grp": "sos"}, {"a": "toast", "k": "toast", "sr": "Tost", "en": "Toast", "g": 40, "kcal": 106, "grp": "testo"}, {"a": "potato_sp", "k": "potato_sp", "sr": "Začinjeni krompir", "en": "Seasoned potatoes", "g": 100, "kcal": 160, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 930, "p": 53, "c": 90, "f": 38}, "al": ["gluten", "mleko", "jaja"], "var": [["Cela porcija", 680], ["Pola porcije", 410]], "var_en": ["Full portion", "Half portion"], "vc": [{"comps": [{"a": "toast", "k": "toast", "sr": "Tost", "en": "Toast", "g": 40, "kcal": 106, "grp": "testo"}, {"a": "caesar", "k": "caesar", "sr": "Cezar sos", "en": "Caesar dressing", "g": 12, "kcal": 54, "grp": "sos"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 10, "kcal": 1, "grp": "povrce"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 40, "kcal": 7, "grp": "povrce"}, {"a": "bacon", "k": "bacon", "sr": "Slanina", "en": "Bacon", "g": 30, "kcal": 162, "grp": "meso"}, {"a": "toast", "k": "toast", "sr": "Tost", "en": "Toast", "g": 40, "kcal": 106, "grp": "testo"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 90, "kcal": 148, "grp": "meso"}, {"a": "caesar", "k": "caesar", "sr": "Cezar sos", "en": "Caesar dressing", "g": 13, "kcal": 58, "grp": "sos"}, {"a": "toast", "k": "toast", "sr": "Tost", "en": "Toast", "g": 40, "kcal": 106, "grp": "testo"}, {"a": "potato_sp", "k": "potato_sp", "sr": "Začinjeni krompir", "en": "Seasoned potatoes", "g": 100, "kcal": 160, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 930, "p": 53, "c": 90, "f": 38}, "al": ["gluten", "mleko", "jaja"]}, {"comps": [{"a": "toast", "k": "toast", "sr": "Tost", "en": "Toast", "g": 25, "kcal": 66, "grp": "testo"}, {"a": "caesar", "k": "caesar", "sr": "Cezar sos", "en": "Caesar dressing", "g": 5, "kcal": 22, "grp": "sos"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 5, "kcal": 1, "grp": "povrce"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 25, "kcal": 4, "grp": "povrce"}, {"a": "bacon", "k": "bacon", "sr": "Slanina", "en": "Bacon", "g": 20, "kcal": 108, "grp": "meso"}, {"a": "toast", "k": "toast", "sr": "Tost", "en": "Toast", "g": 25, "kcal": 66, "grp": "testo"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 55, "kcal": 91, "grp": "meso"}, {"a": "caesar", "k": "caesar", "sr": "Cezar sos", "en": "Caesar dressing", "g": 10, "kcal": 45, "grp": "sos"}, {"a": "toast", "k": "toast", "sr": "Tost", "en": "Toast", "g": 25, "kcal": 66, "grp": "testo"}, {"a": "potato_sp", "k": "potato_sp", "sr": "Začinjeni krompir", "en": "Seasoned potatoes", "g": 60, "kcal": 96, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 10, "kcal": 11, "grp": "sos", "side": 1}], "nut": {"kcal": 580, "p": 33, "c": 55, "f": 24}, "al": ["gluten", "mleko", "jaja"]}]}, {"id": "quesadilla", "cat": "dorucak", "sr": "Quesadilla", "en": "Quesadilla", "desc": "Tortilja, pečenica, šunka, pečurke, pomfrit, pavlaka, mozzarella.", "desc_en": "Tortilla, smoked pork loin, ham, mushrooms, French fries, sour cream, mozzarella.", "price": 620, "mode": "knoll", "img": "quesadilla", "comps": [{"a": "tortilla", "k": "tortilla", "sr": "Tortilja", "en": "Tortilla", "g": 90, "kcal": 279, "grp": "testo"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 50, "kcal": 140, "grp": "sir"}, {"a": "pecenica", "k": "pecenica", "sr": "Pečenica", "en": "Smoked pork loin", "g": 40, "kcal": 64, "grp": "meso"}, {"a": "ham", "k": "ham", "sr": "Šunka", "en": "Ham", "g": 40, "kcal": 58, "grp": "meso"}, {"a": "mushroom", "k": "mushroom", "sr": "Šampinjoni", "en": "Mushrooms", "g": 40, "kcal": 9, "grp": "povrce"}, {"a": "cream", "k": "cream", "sr": "Pavlaka", "en": "Sour cream", "g": 40, "kcal": 80, "grp": "sir"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 100, "kcal": 312, "grp": "testo"}, {"a": "ketchup", "k": "ketchup", "sr": "Crveni sos", "en": "Red sauce", "g": 20, "kcal": 22, "grp": "sos"}], "nut": {"kcal": 960, "p": 42, "c": 98, "f": 45}, "al": ["gluten", "mleko"]}, {"id": "rolovana-punjena-piletina", "cat": "piletina", "sr": "Rolovana punjena piletina", "en": "Rolled stuffed chicken", "desc": "Belo meso (300 g), mozzarella, šunka, pančeta, pomfrit.", "desc_en": "Chicken breast (300 g), mozzarella, ham, pancetta, French fries.", "price": 1240, "size": "300 g", "pair": ["coleslaw-salata", "cizkejk"], "mode": "knoll", "img": "rolovana-punjena-piletina", "comps": [{"a": "chicken_roll", "k": "chicken_roll", "sr": "Rolovano belo meso", "en": "Rolled chicken breast", "g": 220, "kcal": 506, "grp": "meso"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 40, "kcal": 112, "grp": "sir"}, {"a": "ham", "k": "ham", "sr": "Šunka", "en": "Ham", "g": 30, "kcal": 44, "grp": "meso"}, {"a": "pancetta", "k": "pancetta", "sr": "Pančeta", "en": "Pancetta", "g": 30, "kcal": 135, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 180, "kcal": 562, "grp": "testo"}, {"a": "red_cabbage", "k": "red_cabbage", "sr": "Crveni kupus", "en": "Red cabbage", "g": 20, "kcal": 6, "grp": "povrce"}], "nut": {"kcal": 1360, "p": 79, "c": 81, "f": 81}, "al": ["mleko"]}, {"id": "carska-piletina", "cat": "piletina", "sr": "Carska piletina", "en": "Imperial chicken", "desc": "Belo meso (300 g), mozzarella, pršut, tikvica, šargarepa, šampinjoni, crveni luk, paprika, pirinač, gorgonzola sos.", "desc_en": "Chicken breast (300 g), mozzarella, prosciutto, zucchini, carrot, mushrooms, red onion, bell pepper, rice, gorgonzola sauce.", "price": 1380, "size": "300 g", "story": "Najbogatija piletina na meniju: grilovano povrće, pršut i gorgonzola sos na jednom tanjiru.", "story_en": "The richest chicken on the menu: grilled vegetables, prosciutto and gorgonzola sauce on one plate.", "pair": ["miks-zelenih-salata", "kinder-kolac"], "sig": true, "mode": "knoll", "img": "carska-piletina", "comps": [{"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 220, "kcal": 363, "grp": "meso"}, {"a": "gorg_sauce", "k": "gorg_sauce", "sr": "Gorgonzola sos", "en": "Gorgonzola sauce", "g": 70, "kcal": 154, "grp": "sos"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 30, "kcal": 84, "grp": "sir"}, {"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 25, "kcal": 62, "grp": "meso"}, {"a": "rice", "k": "rice", "sr": "Pirinač", "en": "Rice", "g": 150, "kcal": 195, "grp": "testo"}, {"a": "pepper", "k": "pepper", "sr": "Paprika", "en": "Bell pepper", "g": 40, "kcal": 12, "grp": "povrce"}, {"a": "zucchini", "k": "zucchini", "sr": "Tikvica", "en": "Zucchini", "g": 40, "kcal": 7, "grp": "povrce"}, {"a": "carrot", "k": "carrot", "sr": "Šargarepa", "en": "Carrot", "g": 30, "kcal": 12, "grp": "povrce"}, {"a": "mushroom", "k": "mushroom", "sr": "Šampinjoni", "en": "Mushrooms", "g": 40, "kcal": 9, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 20, "kcal": 8, "grp": "povrce"}], "nut": {"kcal": 910, "p": 92, "c": 55, "f": 33}, "al": ["mleko"]}, {"id": "grilovana-piletina", "cat": "piletina", "sr": "Grilovana piletina", "en": "Grilled chicken", "desc": "Belo meso (300 g), pirinač.", "desc_en": "Chicken breast (300 g), rice.", "price": 1090, "size": "300 g", "pair": ["miks-zelenih-salata", "grilovano-povrce"], "mode": "knoll", "img": "grilovana-piletina", "comps": [{"a": "chicken", "k": "chicken", "sr": "Belo meso sa roštilja", "en": "Grilled chicken breast", "g": 250, "kcal": 412, "grp": "meso"}, {"a": "rice", "k": "rice", "sr": "Pirinač", "en": "Rice", "g": 180, "kcal": 234, "grp": "testo"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 30, "kcal": 4, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 30, "kcal": 5, "grp": "povrce"}, {"a": "red_cabbage", "k": "red_cabbage", "sr": "Crveni kupus", "en": "Red cabbage", "g": 10, "kcal": 3, "grp": "povrce"}], "nut": {"kcal": 660, "p": 83, "c": 53, "f": 10}, "al": []}, {"id": "rizoto-sa-piletinom", "cat": "piletina", "sr": "Rižoto sa piletinom", "en": "Chicken risotto", "desc": "Belo meso, pirinač, šampinjoni, crni luk, parmezan.", "desc_en": "Chicken breast, rice, mushrooms, onion, parmesan.", "price": 980, "pair": ["miks-zelenih-salata"], "mode": "knoll", "img": "rizoto-sa-piletinom", "comps": [{"a": "risotto", "k": "risotto", "sr": "Pirinač (rižoto)", "en": "Rice (risotto)", "g": 230, "kcal": 391, "grp": "testo"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 120, "kcal": 198, "grp": "meso"}, {"a": "mushroom", "k": "mushroom", "sr": "Šampinjoni", "en": "Mushrooms", "g": 50, "kcal": 11, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Crni luk", "en": "Onion", "g": 20, "kcal": 8, "grp": "povrce"}, {"a": "parmesan", "k": "parmesan", "sr": "Parmezan", "en": "Parmesan", "g": 20, "kcal": 86, "grp": "sir"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 25, "kcal": 4, "grp": "povrce"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 5, "kcal": 1, "grp": "povrce"}], "nut": {"kcal": 700, "p": 56, "c": 63, "f": 24}, "al": ["mleko"]}, {"id": "kobasica-sa-sirom", "cat": "kosnica", "sr": "Kobasica sa sirom", "en": "Sausage with cheese", "desc": "Začinjeni krompir, senf.", "desc_en": "Seasoned potatoes, mustard.", "price": 1230, "size": "300 g", "pair": ["lepinja", "coleslaw-salata"], "mode": "knoll", "img": "kobasica-sa-sirom", "comps": [{"a": "sausage_cheese", "k": "sausage_cheese", "sr": "Kobasica sa sirom", "en": "Cheese sausage", "g": 300, "kcal": 900, "grp": "meso"}, {"a": "potato_sp", "k": "potato_sp", "sr": "Začinjeni krompir", "en": "Seasoned potatoes", "g": 200, "kcal": 320, "grp": "testo"}, {"a": "mustard", "k": "mustard", "sr": "Senf", "en": "Mustard", "g": 25, "kcal": 16, "grp": "sos"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}], "nut": {"kcal": 1260, "p": 45, "c": 59, "f": 92}, "al": ["mleko", "senf"]}, {"id": "zapecena-kolenica", "cat": "kosnica", "sr": "Zapečena kolenica", "en": "Baked pork knuckle", "desc": "Kolenica, zapečeni krompir, sos od rena.", "desc_en": "Pork knuckle, seasoned potatoes, horseradish sauce.", "price": 1580, "story": "Kolenica se peče dok meso ne krene samo da se odvaja od kosti — uz zapečeni krompir i sos od rena.", "story_en": "Pork knuckle roasted until the meat falls off the bone — with baked potatoes and horseradish sauce.", "pair": ["coleslaw-salata", "lepinja"], "sig": true, "mode": "knoll", "img": "zapecena-kolenica", "comps": [{"a": "knuckle", "k": "knuckle", "sr": "Kolenica", "en": "Pork knuckle", "g": 380, "kcal": 988, "grp": "meso"}, {"a": "potato_sp", "k": "potato_sp", "sr": "Zapečeni krompir", "en": "Baked potatoes", "g": 250, "kcal": 400, "grp": "testo"}, {"a": "horseradish", "k": "horseradish", "sr": "Sos od rena", "en": "Horseradish sauce", "g": 40, "kcal": 80, "grp": "sos"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 5, "kcal": 1, "grp": "povrce"}], "nut": {"kcal": 1490, "p": 91, "c": 67, "f": 95}, "al": ["mleko"]}, {"id": "pivska-daska-kosnica-za-dvoje", "cat": "kosnica", "sr": "Pivska daska Košnica za dvoje", "en": "Košnica beer platter for two", "desc": "Gurmanski uštipak, kobasice sa sirom, rolovana punjena piletina, panko piletina, pomfrit, sosevi.", "desc_en": "Gourmet sausage patty, cheese sausages, rolled stuffed chicken, panko chicken, French fries, sauces.", "price": 1880, "story": "Daska za dvoje i hladno pivo: od svega po malo, za društvo koje sve deli.", "story_en": "A board for two and a cold beer: a bit of everything, for friends who share it all.", "pair": ["pohovani-luk", "panirana-mocarela"], "sig": true, "mode": "knoll", "img": "pivska-daska-kosnica-za-dvoje", "share": 1, "comps": [{"a": "ustipak", "k": "ustipak", "sr": "Gurmanski uštipak", "en": "Gourmet sausage patty", "g": 160, "kcal": 528, "grp": "testo"}, {"a": "sausage_cheese", "k": "sausage_cheese", "sr": "Kobasice sa sirom", "en": "Cheese sausages", "g": 180, "kcal": 540, "grp": "meso"}, {"a": "chicken_roll", "k": "chicken_roll", "sr": "Rolovana punjena piletina", "en": "Rolled stuffed chicken", "g": 160, "kcal": 368, "grp": "meso"}, {"a": "chicken_panko", "k": "chicken_panko", "sr": "Panko piletina", "en": "Panko chicken", "g": 160, "kcal": 416, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 200, "kcal": 624, "grp": "testo"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 30, "kcal": 12, "grp": "povrce"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 30, "kcal": 34, "grp": "sos"}, {"a": "mustard", "k": "mustard", "sr": "Senf", "en": "Mustard", "g": 20, "kcal": 13, "grp": "sos"}, {"a": "white_sauce", "k": "white_sauce", "sr": "Beli sos", "en": "White sauce", "g": 30, "kcal": 75, "grp": "sos"}], "nut": {"kcal": 2610, "p": 117, "c": 166, "f": 162}, "al": ["gluten", "mleko", "jaja", "senf"]}, {"id": "zakuska-kosnica", "cat": "kosnica", "sr": "Zakuska Košnica", "en": "Košnica appetizer platter", "desc": "Pršut, pečenica, kulen u katu, feta, duvan čvarci, ajvar, gauda, dimljeni sir (400 g).", "desc_en": "Prosciutto, smoked pork loin, kulen, feta, pork cracklings, ajvar, gouda, smoked cheese (400 g).", "spice": 1, "story": "Suvo meso i sirevi za početak večeri — da se čeka društvo uz čašu vina.", "story_en": "Cured meats and cheeses to start the evening — something to share while friends arrive.", "pair": ["lepinja"], "sig": true, "mode": "knoll", "img": "zakuska-kosnica", "share": 1, "comps": [{"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 70, "kcal": 175, "grp": "meso"}, {"a": "pecenica", "k": "pecenica", "sr": "Pečenica", "en": "Smoked pork loin", "g": 60, "kcal": 96, "grp": "meso"}, {"a": "kulen", "k": "kulen", "sr": "Kulen u katu", "en": "Kulen", "g": 60, "kcal": 270, "grp": "meso"}, {"a": "gouda", "k": "gouda", "sr": "Gauda", "en": "Gouda", "g": 50, "kcal": 178, "grp": "sir"}, {"a": "smoked_cheese", "k": "smoked_cheese", "sr": "Dimljeni sir", "en": "Smoked cheese", "g": 50, "kcal": 165, "grp": "sir"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 50, "kcal": 132, "grp": "sir"}, {"a": "cvarci", "k": "cvarci", "sr": "Duvan čvarci", "en": "Pork cracklings", "g": 40, "kcal": 240, "grp": "meso"}, {"a": "ajvar", "k": "ajvar", "sr": "Ajvar", "en": "Ajvar", "g": 40, "kcal": 36, "grp": "sos"}], "nut": {"kcal": 1290, "p": 91, "c": 8, "f": 99}, "al": ["mleko"], "var": [["Cela (400 g)", 1470], ["Pola porcije", 870]], "var_en": ["Full (400 g)", "Half portion"], "vc": [{"comps": [{"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 70, "kcal": 175, "grp": "meso"}, {"a": "pecenica", "k": "pecenica", "sr": "Pečenica", "en": "Smoked pork loin", "g": 60, "kcal": 96, "grp": "meso"}, {"a": "kulen", "k": "kulen", "sr": "Kulen u katu", "en": "Kulen", "g": 60, "kcal": 270, "grp": "meso"}, {"a": "gouda", "k": "gouda", "sr": "Gauda", "en": "Gouda", "g": 50, "kcal": 178, "grp": "sir"}, {"a": "smoked_cheese", "k": "smoked_cheese", "sr": "Dimljeni sir", "en": "Smoked cheese", "g": 50, "kcal": 165, "grp": "sir"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 50, "kcal": 132, "grp": "sir"}, {"a": "cvarci", "k": "cvarci", "sr": "Duvan čvarci", "en": "Pork cracklings", "g": 40, "kcal": 240, "grp": "meso"}, {"a": "ajvar", "k": "ajvar", "sr": "Ajvar", "en": "Ajvar", "g": 40, "kcal": 36, "grp": "sos"}], "nut": {"kcal": 1290, "p": 91, "c": 8, "f": 99}, "al": ["mleko"]}, {"comps": [{"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 40, "kcal": 100, "grp": "meso"}, {"a": "pecenica", "k": "pecenica", "sr": "Pečenica", "en": "Smoked pork loin", "g": 35, "kcal": 56, "grp": "meso"}, {"a": "kulen", "k": "kulen", "sr": "Kulen u katu", "en": "Kulen", "g": 35, "kcal": 158, "grp": "meso"}, {"a": "gouda", "k": "gouda", "sr": "Gauda", "en": "Gouda", "g": 30, "kcal": 107, "grp": "sir"}, {"a": "smoked_cheese", "k": "smoked_cheese", "sr": "Dimljeni sir", "en": "Smoked cheese", "g": 30, "kcal": 99, "grp": "sir"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 30, "kcal": 79, "grp": "sir"}, {"a": "cvarci", "k": "cvarci", "sr": "Duvan čvarci", "en": "Pork cracklings", "g": 20, "kcal": 120, "grp": "meso"}, {"a": "ajvar", "k": "ajvar", "sr": "Ajvar", "en": "Ajvar", "g": 20, "kcal": 18, "grp": "sos"}], "nut": {"kcal": 740, "p": 52, "c": 4, "f": 56}, "al": ["mleko"]}]}, {"id": "selekcija-sireva", "cat": "kosnica", "sr": "Selekcija sireva", "en": "Cheese selection", "desc": "Dimljeni sir, gauda, feta, gorgonzola, mozzarella, rukola, cherry paradajz, masline.", "desc_en": "Smoked cheese, gouda, feta, gorgonzola, mozzarella, arugula, cherry tomatoes, olives.", "pair": ["lepinja"], "mode": "knoll", "img": "selekcija-sireva", "share": 1, "comps": [{"a": "smoked_cheese", "k": "smoked_cheese", "sr": "Dimljeni sir", "en": "Smoked cheese", "g": 80, "kcal": 264, "grp": "sir"}, {"a": "gouda", "k": "gouda", "sr": "Gauda", "en": "Gouda", "g": 80, "kcal": 285, "grp": "sir"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 60, "kcal": 158, "grp": "sir"}, {"a": "gorgonzola", "k": "gorgonzola", "sr": "Gorgonzola", "en": "Gorgonzola", "g": 50, "kcal": 175, "grp": "sir"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 60, "kcal": 168, "grp": "sir"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 15, "kcal": 4, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 30, "kcal": 4, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 50, "kcal": 9, "grp": "povrce"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 25, "kcal": 29, "grp": "povrce"}], "nut": {"kcal": 1100, "p": 70, "c": 12, "f": 86}, "al": ["mleko"], "var": [["Cela porcija", 1330], ["Pola porcije", 750]], "var_en": ["Full portion", "Half portion"], "vc": [{"comps": [{"a": "smoked_cheese", "k": "smoked_cheese", "sr": "Dimljeni sir", "en": "Smoked cheese", "g": 80, "kcal": 264, "grp": "sir"}, {"a": "gouda", "k": "gouda", "sr": "Gauda", "en": "Gouda", "g": 80, "kcal": 285, "grp": "sir"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 60, "kcal": 158, "grp": "sir"}, {"a": "gorgonzola", "k": "gorgonzola", "sr": "Gorgonzola", "en": "Gorgonzola", "g": 50, "kcal": 175, "grp": "sir"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 60, "kcal": 168, "grp": "sir"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 15, "kcal": 4, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 30, "kcal": 4, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 50, "kcal": 9, "grp": "povrce"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 25, "kcal": 29, "grp": "povrce"}], "nut": {"kcal": 1100, "p": 70, "c": 12, "f": 86}, "al": ["mleko"]}, {"comps": [{"a": "smoked_cheese", "k": "smoked_cheese", "sr": "Dimljeni sir", "en": "Smoked cheese", "g": 45, "kcal": 148, "grp": "sir"}, {"a": "gouda", "k": "gouda", "sr": "Gauda", "en": "Gouda", "g": 45, "kcal": 160, "grp": "sir"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 35, "kcal": 92, "grp": "sir"}, {"a": "gorgonzola", "k": "gorgonzola", "sr": "Gorgonzola", "en": "Gorgonzola", "g": 30, "kcal": 105, "grp": "sir"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 35, "kcal": 98, "grp": "sir"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 10, "kcal": 2, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 30, "kcal": 5, "grp": "povrce"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 15, "kcal": 17, "grp": "povrce"}], "nut": {"kcal": 630, "p": 40, "c": 7, "f": 49}, "al": ["mleko"]}]}, {"id": "kosnica-plata", "cat": "kosnica", "sr": "Košnica plata", "en": "Košnica meat platter", "desc": "Svinjski file, ćevapi, belo meso, kobasica, začinjeni krompir, panko piletina.", "desc_en": "Pork fillet, ćevapi, chicken breast, sausage, seasoned potatoes, panko chicken.", "price": 2780, "size": "900 g", "story": "Naša najveća plata: roštilj, panko piletina i krompir za celo društvo.", "story_en": "Our biggest platter: grilled meats, panko chicken and potatoes for the whole table.", "pair": ["coleslaw-salata", "lepinja"], "sig": true, "mode": "knoll", "img": "kosnica-plata", "share": 1, "comps": [{"a": "pork", "k": "pork", "sr": "Svinjski file", "en": "Pork fillet", "g": 150, "kcal": 248, "grp": "meso"}, {"a": "cevapi", "k": "cevapi", "sr": "Ćevapi", "en": "Ćevapi", "g": 150, "kcal": 390, "grp": "meso"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 130, "kcal": 214, "grp": "meso"}, {"a": "sausage", "k": "sausage", "sr": "Kobasica", "en": "Sausage", "g": 120, "kcal": 360, "grp": "meso"}, {"a": "chicken_panko", "k": "chicken_panko", "sr": "Panko piletina", "en": "Panko chicken", "g": 100, "kcal": 260, "grp": "meso"}, {"a": "potato_sp", "k": "potato_sp", "sr": "Začinjeni krompir", "en": "Seasoned potatoes", "g": 250, "kcal": 400, "grp": "testo"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 30, "kcal": 34, "grp": "sos"}, {"a": "mustard", "k": "mustard", "sr": "Senf", "en": "Mustard", "g": 20, "kcal": 13, "grp": "sos"}, {"a": "cream", "k": "cream", "sr": "Pavlaka", "en": "Sour cream", "g": 30, "kcal": 60, "grp": "sir"}], "nut": {"kcal": 1980, "p": 157, "c": 88, "f": 110}, "al": ["gluten", "mleko", "jaja", "senf"]}, {"id": "cevapi", "cat": "kosnica", "sr": "Ćevapi", "en": "Ćevapi", "desc": "100% juneće meso, pomfrit, kajmak.", "desc_en": "100% beef, French fries, kajmak.", "pair": ["lepinja", "coleslaw-salata"], "mode": "knoll", "img": "cevapi", "comps": [{"a": "cevapi", "k": "cevapi", "sr": "100% juneće meso", "en": "100% beef", "g": 200, "kcal": 520, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 150, "kcal": 468, "grp": "testo"}, {"a": "kajmak", "k": "kajmak", "sr": "Kajmak", "en": "Kajmak", "g": 40, "kcal": 160, "grp": "sir"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 20, "kcal": 8, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 20, "kcal": 3, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 15, "kcal": 3, "grp": "povrce"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 25, "kcal": 28, "grp": "sos"}], "nut": {"kcal": 1190, "p": 50, "c": 76, "f": 77}, "al": ["mleko"], "var": [["200 g", 740], ["400 g", 1210]], "var_en": ["200 g", "400 g"], "vc": [{"comps": [{"a": "cevapi", "k": "cevapi", "sr": "100% juneće meso", "en": "100% beef", "g": 200, "kcal": 520, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 150, "kcal": 468, "grp": "testo"}, {"a": "kajmak", "k": "kajmak", "sr": "Kajmak", "en": "Kajmak", "g": 40, "kcal": 160, "grp": "sir"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 20, "kcal": 8, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 20, "kcal": 3, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 15, "kcal": 3, "grp": "povrce"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 25, "kcal": 28, "grp": "sos"}], "nut": {"kcal": 1190, "p": 50, "c": 76, "f": 77}, "al": ["mleko"]}, {"comps": [{"a": "cevapi", "k": "cevapi", "sr": "100% juneće meso", "en": "100% beef", "g": 400, "kcal": 1040, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 200, "kcal": 624, "grp": "testo"}, {"a": "kajmak", "k": "kajmak", "sr": "Kajmak", "en": "Kajmak", "g": 60, "kcal": 240, "grp": "sir"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 20, "kcal": 8, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 20, "kcal": 3, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 15, "kcal": 3, "grp": "povrce"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 25, "kcal": 28, "grp": "sos"}], "nut": {"kcal": 1950, "p": 94, "c": 101, "f": 131}, "al": ["mleko"]}]}, {"id": "svinjski-medaljoni", "cat": "kosnica", "sr": "Svinjski medaljoni", "en": "Pork medallions", "desc": "Svinjski file, sos mix pečuraka, pomfrit, slanina.", "desc_en": "Pork fillet, mushroom sauce, French fries, bacon.", "price": 1470, "pair": ["grilovano-povrce"], "mode": "knoll", "img": "svinjski-medaljoni", "comps": [{"a": "pork", "k": "pork", "sr": "Svinjski file", "en": "Pork fillet", "g": 220, "kcal": 363, "grp": "meso"}, {"a": "bacon", "k": "bacon", "sr": "Slanina", "en": "Bacon", "g": 40, "kcal": 216, "grp": "meso"}, {"a": "mush_sauce", "k": "mush_sauce", "sr": "Sos mix pečuraka", "en": "Mushroom sauce", "g": 120, "kcal": 144, "grp": "sos"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 150, "kcal": 468, "grp": "testo"}, {"a": "red_cabbage", "k": "red_cabbage", "sr": "Crveni kupus", "en": "Red cabbage", "g": 15, "kcal": 5, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 20, "kcal": 4, "grp": "povrce"}], "nut": {"kcal": 1200, "p": 86, "c": 70, "f": 62}, "al": ["mleko"]}, {"id": "smudj", "cat": "kosnica", "sr": "Smuđ", "en": "Zander", "desc": "Rižoto, mix pečuraka, luk, pelat.", "desc_en": "Risotto with mixed mushrooms, onion, tomato.", "price": 1570, "size": "300 g", "story": "Za lakšu večeru: smuđ na rižotu sa pečurkama i kriškom limuna.", "story_en": "For a lighter dinner: zander on a mushroom risotto with a wedge of lemon.", "pair": ["miks-zelenih-salata"], "sig": true, "mode": "knoll", "img": "smudj", "comps": [{"a": "zander", "k": "zander", "sr": "Smuđ (300 g)", "en": "Zander (300 g)", "g": 300, "kcal": 330, "grp": "riba"}, {"a": "risotto", "k": "risotto", "sr": "Rižoto", "en": "Risotto", "g": 160, "kcal": 272, "grp": "testo"}, {"a": "mushroom", "k": "mushroom", "sr": "Mix pečuraka", "en": "Mixed mushrooms", "g": 50, "kcal": 11, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Luk", "en": "Onion", "g": 20, "kcal": 8, "grp": "povrce"}, {"a": "pelat", "k": "pelat", "sr": "Pelat", "en": "Tomato sauce", "g": 40, "kcal": 12, "grp": "sos"}, {"a": "lemon", "k": "lemon", "sr": "Limun", "en": "Lemon", "g": 25, "kcal": 7, "grp": "voce"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 10, "kcal": 12, "grp": "povrce"}, {"a": "red_cabbage", "k": "red_cabbage", "sr": "Crveni kupus", "en": "Red cabbage", "g": 15, "kcal": 5, "grp": "povrce"}], "nut": {"kcal": 660, "p": 78, "c": 49, "f": 15}, "al": ["mleko", "riba"]}, {"id": "pica-kosnica", "cat": "pica", "sr": "Pica Košnica", "en": "Košnica pizza", "desc": "Pečenica, pršut, šunka, kulen, mozzarella, pečurke.", "desc_en": "Smoked pork loin, prosciutto, ham, kulen, mozzarella, mushrooms.", "price": 1130, "spice": 1, "size": "32 cm", "story": "Kućna pica sa četiri vrste suhomesnatog, za ljubitelje mesa.", "story_en": "The house pizza with four kinds of cured meat, for meat lovers.", "pair": ["kinder-palacinka"], "sig": true, "mode": "pizza", "img": "pica-kosnica", "comps": [{"a": "pizza_base", "k": "pizza_base", "sr": "Testo", "en": "Dough", "g": 250, "kcal": 650, "grp": "testo"}, {"a": "pelat", "k": "pelat", "sr": "Pelat", "en": "Tomato sauce", "g": 60, "kcal": 18, "grp": "sos"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 120, "kcal": 336, "grp": "sir"}, {"a": "ham", "k": "ham", "sr": "Šunka", "en": "Ham", "g": 35, "kcal": 51, "grp": "meso"}, {"a": "pecenica", "k": "pecenica", "sr": "Pečenica", "en": "Smoked pork loin", "g": 35, "kcal": 56, "grp": "meso"}, {"a": "kulen", "k": "kulen", "sr": "Kulen", "en": "Kulen", "g": 35, "kcal": 158, "grp": "meso"}, {"a": "mushroom", "k": "mushroom", "sr": "Šampinjoni", "en": "Mushrooms", "g": 40, "kcal": 9, "grp": "povrce"}, {"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 35, "kcal": 88, "grp": "meso"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 10, "kcal": 12, "grp": "povrce"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 5, "kcal": 1, "grp": "povrce"}], "nut": {"kcal": 1380, "p": 83, "c": 134, "f": 56}, "al": ["gluten", "mleko"]}, {"id": "kapricoza", "cat": "pica", "sr": "Capricciosa", "en": "Capricciosa", "desc": "Šunka, mozzarella, pečurke, masline, pelat.", "desc_en": "Ham, mozzarella, mushrooms, olives, tomato sauce.", "price": 960, "size": "32 cm", "mode": "pizza", "img": "kapricoza", "comps": [{"a": "pizza_base", "k": "pizza_base", "sr": "Testo", "en": "Dough", "g": 250, "kcal": 650, "grp": "testo"}, {"a": "pelat", "k": "pelat", "sr": "Pelat", "en": "Tomato sauce", "g": 70, "kcal": 21, "grp": "sos"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 120, "kcal": 336, "grp": "sir"}, {"a": "ham", "k": "ham", "sr": "Šunka", "en": "Ham", "g": 70, "kcal": 102, "grp": "meso"}, {"a": "mushroom", "k": "mushroom", "sr": "Šampinjoni", "en": "Mushrooms", "g": 50, "kcal": 11, "grp": "povrce"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 15, "kcal": 17, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 20, "kcal": 4, "grp": "povrce"}], "nut": {"kcal": 1140, "p": 64, "c": 135, "f": 38}, "al": ["gluten", "mleko"]}, {"id": "peperoni-pica", "cat": "pica", "sr": "Pepperoni", "en": "Pepperoni", "desc": "Kulen, mozzarella, pelat, feferoni.", "desc_en": "Kulen (spicy sausage), mozzarella, tomato sauce, hot peppers.", "price": 1020, "spice": 2, "size": "32 cm", "mode": "pizza", "img": "peperoni-pica", "comps": [{"a": "pizza_base", "k": "pizza_base", "sr": "Testo", "en": "Dough", "g": 250, "kcal": 650, "grp": "testo"}, {"a": "pelat", "k": "pelat", "sr": "Pelat", "en": "Tomato sauce", "g": 70, "kcal": 21, "grp": "sos"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 120, "kcal": 336, "grp": "sir"}, {"a": "kulen", "k": "kulen", "sr": "Kulen", "en": "Kulen", "g": 70, "kcal": 315, "grp": "meso"}, {"a": "feferoni", "k": "feferoni", "sr": "Feferoni", "en": "Hot peppers", "g": 25, "kcal": 8, "grp": "povrce"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 10, "kcal": 12, "grp": "povrce"}], "nut": {"kcal": 1340, "p": 65, "c": 134, "f": 60}, "al": ["gluten", "mleko"]}, {"id": "kvatro-formadji-pica", "cat": "pica", "sr": "Quattro Formaggi", "en": "Quattro Formaggi", "desc": "Mozzarella, gorgonzola, dimljeni sir, gauda, masline, pelat.", "desc_en": "Mozzarella, gorgonzola, smoked cheese, gouda, olives, tomato sauce.", "price": 1020, "size": "32 cm", "mode": "pizza", "img": "kvatro-formadji-pica", "comps": [{"a": "pizza_base", "k": "pizza_base", "sr": "Testo", "en": "Dough", "g": 250, "kcal": 650, "grp": "testo"}, {"a": "pelat", "k": "pelat", "sr": "Pelat", "en": "Tomato sauce", "g": 60, "kcal": 18, "grp": "sos"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 90, "kcal": 252, "grp": "sir"}, {"a": "gouda", "k": "gouda", "sr": "Gauda", "en": "Gouda", "g": 40, "kcal": 142, "grp": "sir"}, {"a": "smoked_cheese", "k": "smoked_cheese", "sr": "Dimljeni sir", "en": "Smoked cheese", "g": 40, "kcal": 132, "grp": "sir"}, {"a": "gorgonzola", "k": "gorgonzola", "sr": "Gorgonzola", "en": "Gorgonzola", "g": 40, "kcal": 140, "grp": "sir"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 15, "kcal": 17, "grp": "povrce"}], "nut": {"kcal": 1350, "p": 67, "c": 132, "f": 61}, "al": ["gluten", "mleko"]}, {"id": "mediteran-pica", "cat": "pica", "sr": "Mediteran", "en": "Mediterranean", "desc": "Mozzarella, pršut, rukola, parmezan, cherry paradajz, pelat.", "desc_en": "Mozzarella, prosciutto, arugula, parmesan, cherry tomatoes, tomato sauce.", "price": 1090, "size": "32 cm", "mode": "pizza", "img": "mediteran-pica", "comps": [{"a": "pizza_base", "k": "pizza_base", "sr": "Testo", "en": "Dough", "g": 250, "kcal": 650, "grp": "testo"}, {"a": "pelat", "k": "pelat", "sr": "Pelat", "en": "Tomato sauce", "g": 60, "kcal": 18, "grp": "sos"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 110, "kcal": 308, "grp": "sir"}, {"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 60, "kcal": 150, "grp": "meso"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 40, "kcal": 7, "grp": "povrce"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 15, "kcal": 4, "grp": "povrce"}, {"a": "parmesan", "k": "parmesan", "sr": "Parmezan", "en": "Parmesan", "g": 15, "kcal": 65, "grp": "sir"}], "nut": {"kcal": 1200, "p": 67, "c": 133, "f": 44}, "al": ["gluten", "mleko"]}, {"id": "tuna-pica", "cat": "pica", "sr": "Tuna", "en": "Tuna", "desc": "Tuna, biljni sir, tikvice, crveni luk, šećerac, cherry paradajz, masline, pelat.", "desc_en": "Tuna, plant-based cheese, zucchini, red onion, sweetcorn, cherry tomatoes, olives, tomato sauce.", "price": 930, "size": "32 cm", "mode": "pizza", "img": "tuna-pica", "comps": [{"a": "pizza_base", "k": "pizza_base", "sr": "Testo", "en": "Dough", "g": 250, "kcal": 650, "grp": "testo"}, {"a": "pelat", "k": "pelat", "sr": "Pelat", "en": "Tomato sauce", "g": 60, "kcal": 18, "grp": "sos"}, {"a": "veg_cheese", "k": "veg_cheese", "sr": "Biljni sir", "en": "Plant-based cheese", "g": 90, "kcal": 270, "grp": "sir"}, {"a": "tuna", "k": "tuna", "sr": "Tuna", "en": "Tuna", "g": 80, "kcal": 158, "grp": "riba"}, {"a": "zucchini", "k": "zucchini", "sr": "Tikvica", "en": "Zucchini", "g": 40, "kcal": 7, "grp": "povrce"}, {"a": "corn", "k": "corn", "sr": "Kukuruz šećerac", "en": "Sweetcorn", "g": 30, "kcal": 26, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 20, "kcal": 8, "grp": "povrce"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 30, "kcal": 5, "grp": "povrce"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 15, "kcal": 17, "grp": "povrce"}], "nut": {"kcal": 1160, "p": 47, "c": 157, "f": 38}, "al": ["gluten", "riba"]}, {"id": "kvatro-stadjoni-pica", "cat": "pica", "sr": "Quattro stagioni", "en": "Quattro stagioni", "desc": "Mozzarella, pršut, kulen, pečenica, pečurke, masline, pelat.", "desc_en": "Mozzarella, prosciutto, kulen, smoked pork loin, mushrooms, olives, tomato sauce.", "price": 990, "spice": 1, "size": "32 cm", "mode": "pizza", "img": "kvatro-stadjoni-pica", "comps": [{"a": "pizza_base", "k": "pizza_base", "sr": "Testo", "en": "Dough", "g": 250, "kcal": 650, "grp": "testo"}, {"a": "pelat", "k": "pelat", "sr": "Pelat", "en": "Tomato sauce", "g": 60, "kcal": 18, "grp": "sos"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 110, "kcal": 308, "grp": "sir"}, {"a": "pecenica", "k": "pecenica", "sr": "Pečenica", "en": "Smoked pork loin", "g": 35, "kcal": 56, "grp": "meso"}, {"a": "kulen", "k": "kulen", "sr": "Kulen", "en": "Kulen", "g": 35, "kcal": 158, "grp": "meso"}, {"a": "prosciutto", "k": "prosciutto", "sr": "Pršut", "en": "Prosciutto", "g": 35, "kcal": 88, "grp": "meso"}, {"a": "mushroom", "k": "mushroom", "sr": "Šampinjoni", "en": "Mushrooms", "g": 40, "kcal": 9, "grp": "povrce"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 15, "kcal": 17, "grp": "povrce"}], "nut": {"kcal": 1300, "p": 73, "c": 133, "f": 52}, "al": ["gluten", "mleko"]}, {"id": "cezar-salata", "cat": "salate", "sr": "Cezar salata", "en": "Caesar salad", "desc": "Piletina, pančeta, parmezan, cherry paradajz, iceberg, dresing, krutoni.", "desc_en": "Chicken, pancetta, parmesan, cherry tomatoes, iceberg, dressing, croutons.", "price": 920, "mode": "knoll", "img": "cezar-salata", "comps": [{"a": "iceberg", "k": "iceberg", "sr": "Iceberg", "en": "Iceberg", "g": 120, "kcal": 17, "grp": "povrce"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 140, "kcal": 231, "grp": "meso"}, {"a": "pancetta", "k": "pancetta", "sr": "Pančeta", "en": "Pancetta", "g": 35, "kcal": 158, "grp": "meso"}, {"a": "parmesan", "k": "parmesan", "sr": "Parmezan", "en": "Parmesan", "g": 20, "kcal": 86, "grp": "sir"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 40, "kcal": 7, "grp": "povrce"}, {"a": "caesar", "k": "caesar", "sr": "Dresing", "en": "Dressing", "g": 40, "kcal": 180, "grp": "sos"}, {"a": "croutons", "k": "croutons", "sr": "Krutoni", "en": "Croutons", "g": 30, "kcal": 123, "grp": "testo"}], "nut": {"kcal": 800, "p": 62, "c": 28, "f": 48}, "al": ["gluten", "mleko", "jaja"]}, {"id": "grcka-salata", "cat": "salate", "sr": "Grčka salata", "en": "Greek salad", "desc": "Paradajz, krastavac, paprika, crveni luk, feta, masline.", "desc_en": "Tomato, cucumber, bell pepper, red onion, feta cheese, olives.", "mode": "knoll", "img": "grcka-salata", "comps": [{"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 150, "kcal": 27, "grp": "povrce"}, {"a": "cucumber", "k": "cucumber", "sr": "Krastavac", "en": "Cucumber", "g": 100, "kcal": 15, "grp": "povrce"}, {"a": "pepper", "k": "pepper", "sr": "Paprika", "en": "Bell pepper", "g": 50, "kcal": 16, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 30, "kcal": 12, "grp": "povrce"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 100, "kcal": 264, "grp": "sir"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 30, "kcal": 34, "grp": "povrce"}, {"a": "dressing", "k": "dressing", "sr": "Maslinovo ulje", "en": "Olive oil", "g": 10, "kcal": 45, "grp": "sos"}], "nut": {"kcal": 410, "p": 17, "c": 21, "f": 30}, "al": ["mleko"], "var": [["Cela porcija", 720], ["Pola porcije", 410]], "var_en": ["Full portion", "Half portion"], "vc": [{"comps": [{"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 150, "kcal": 27, "grp": "povrce"}, {"a": "cucumber", "k": "cucumber", "sr": "Krastavac", "en": "Cucumber", "g": 100, "kcal": 15, "grp": "povrce"}, {"a": "pepper", "k": "pepper", "sr": "Paprika", "en": "Bell pepper", "g": 50, "kcal": 16, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 30, "kcal": 12, "grp": "povrce"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 100, "kcal": 264, "grp": "sir"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 30, "kcal": 34, "grp": "povrce"}, {"a": "dressing", "k": "dressing", "sr": "Maslinovo ulje", "en": "Olive oil", "g": 10, "kcal": 45, "grp": "sos"}], "nut": {"kcal": 410, "p": 17, "c": 21, "f": 30}, "al": ["mleko"]}, {"comps": [{"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 80, "kcal": 14, "grp": "povrce"}, {"a": "cucumber", "k": "cucumber", "sr": "Krastavac", "en": "Cucumber", "g": 55, "kcal": 8, "grp": "povrce"}, {"a": "pepper", "k": "pepper", "sr": "Paprika", "en": "Bell pepper", "g": 30, "kcal": 9, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 15, "kcal": 6, "grp": "povrce"}, {"a": "feta", "k": "feta", "sr": "Feta sir", "en": "Feta", "g": 55, "kcal": 145, "grp": "sir"}, {"a": "olives", "k": "olives", "sr": "Masline", "en": "Olives", "g": 15, "kcal": 17, "grp": "povrce"}, {"a": "dressing", "k": "dressing", "sr": "Maslinovo ulje", "en": "Olive oil", "g": 5, "kcal": 22, "grp": "sos"}], "nut": {"kcal": 220, "p": 9, "c": 11, "f": 16}, "al": ["mleko"]}]}, {"id": "tuna-salata", "cat": "salate", "sr": "Tuna salata", "en": "Tuna salad", "desc": "Zelena salata, cherry paradajz, crveni luk, kukuruz, tuna.", "desc_en": "Lettuce, cherry tomatoes, red onion, corn, tuna.", "price": 840, "mode": "knoll", "img": "tuna-salata", "comps": [{"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 120, "kcal": 17, "grp": "povrce"}, {"a": "tuna", "k": "tuna", "sr": "Tuna", "en": "Tuna", "g": 120, "kcal": 238, "grp": "riba"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 60, "kcal": 11, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 25, "kcal": 10, "grp": "povrce"}, {"a": "corn", "k": "corn", "sr": "Kukuruz", "en": "Corn", "g": 40, "kcal": 34, "grp": "povrce"}, {"a": "dressing", "k": "dressing", "sr": "Dresing", "en": "Dressing", "g": 10, "kcal": 45, "grp": "sos"}], "nut": {"kcal": 350, "p": 38, "c": 16, "f": 15}, "al": ["riba"]}, {"id": "karbonara-pasta", "cat": "paste", "sr": "Carbonara", "en": "Carbonara", "desc": "Pančeta, jaje, parmezan.", "desc_en": "Pancetta, egg, parmesan.", "price": 960, "pair": ["miks-zelenih-salata"], "mode": "knoll", "img": "karbonara-pasta", "comps": [{"a": "pasta", "k": "pasta", "sr": "Pasta", "en": "Pasta", "g": 280, "kcal": 442, "grp": "testo"}, {"a": "pancetta", "k": "pancetta", "sr": "Pančeta", "en": "Pancetta", "g": 60, "kcal": 270, "grp": "meso"}, {"a": "egg", "k": "egg", "sr": "Jaje", "en": "Egg", "g": 50, "kcal": 72, "grp": "meso"}, {"a": "parmesan", "k": "parmesan", "sr": "Parmezan", "en": "Parmesan", "g": 25, "kcal": 108, "grp": "sir"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 20, "kcal": 4, "grp": "povrce"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 5, "kcal": 1, "grp": "povrce"}], "nut": {"kcal": 900, "p": 41, "c": 89, "f": 40}, "al": ["gluten", "mleko", "jaja"]}, {"id": "tartufo-piletina-pasta", "cat": "paste", "sr": "Tartufo piletina", "en": "Truffle chicken", "desc": "Piletina, sos tartufata, parmezan, cherry paradajz, indijski orah.", "desc_en": "Chicken, truffle sauce, parmesan, cherry tomatoes, cashew nuts.", "price": 1090, "story": "Piletina u sosu od tartufata, uz hrskavi indijski orah.", "story_en": "Chicken in truffle sauce, with crunchy cashews.", "pair": ["miks-zelenih-salata"], "sig": true, "mode": "knoll", "img": "tartufo-piletina-pasta", "comps": [{"a": "pasta", "k": "pasta", "sr": "Pasta", "en": "Pasta", "g": 260, "kcal": 411, "grp": "testo"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 120, "kcal": 198, "grp": "meso"}, {"a": "truffle", "k": "truffle", "sr": "Sos tartufata", "en": "Truffle sauce", "g": 70, "kcal": 105, "grp": "sos"}, {"a": "parmesan", "k": "parmesan", "sr": "Parmezan", "en": "Parmesan", "g": 20, "kcal": 86, "grp": "sir"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 30, "kcal": 5, "grp": "povrce"}, {"a": "cashew", "k": "cashew", "sr": "Indijski orah", "en": "Cashews", "g": 15, "kcal": 83, "grp": "voce"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 5, "kcal": 1, "grp": "povrce"}], "nut": {"kcal": 890, "p": 65, "c": 91, "f": 28}, "al": ["gluten", "mleko", "orasi"]}, {"id": "kosnica-burger", "cat": "burgeri", "sr": "Košnica burger", "en": "Košnica burger", "desc": "Juneće meso 100%, slanina, cheddar sir, pohovana mozzarella, paradajz, grilovani luk, BBQ sos, zelena salata, chipotle sos.", "desc_en": "100% beef, bacon, cheddar, breaded mozzarella, tomato, grilled onion, BBQ sauce, lettuce, chipotle sauce.", "price": 1260, "spice": 1, "story": "Burger koji nosi naše ime: slanina, pohovana mozzarella, cheddar i dva sosa na junećem mesu.", "story_en": "The burger that carries our name: bacon, breaded mozzarella, cheddar and two sauces on 100% beef.", "pair": ["pohovani-luk", "cizkejk"], "sig": true, "mode": "stack", "img": "kosnica-burger", "deco": ["dipper"], "comps": [{"a": "bun", "k": "bun", "sr": "Pecivo (gornje)", "en": "Bun (top)", "g": 50, "kcal": 135, "grp": "testo"}, {"a": "chipotle", "k": "chipotle", "sr": "Chipotle sos", "en": "Chipotle sauce", "g": 20, "kcal": 66, "grp": "sos"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 30, "kcal": 5, "grp": "povrce"}, {"a": "onion_grill", "k": "onion_grill", "sr": "Grilovani luk", "en": "Grilled onion", "g": 30, "kcal": 18, "grp": "povrce"}, {"a": "mozz_fried", "k": "mozz_fried", "sr": "Pohovana mozzarella", "en": "Breaded mozzarella", "g": 50, "kcal": 165, "grp": "sir"}, {"a": "cheddar", "k": "cheddar", "sr": "Cheddar sir", "en": "Cheddar", "g": 20, "kcal": 81, "grp": "sir"}, {"a": "bacon", "k": "bacon", "sr": "Slanina", "en": "Bacon", "g": 30, "kcal": 162, "grp": "meso"}, {"a": "patty", "k": "patty", "sr": "100% juneće meso", "en": "100% beef", "g": 180, "kcal": 450, "grp": "meso"}, {"a": "bbq", "k": "bbq", "sr": "BBQ sos", "en": "BBQ sauce", "g": 20, "kcal": 34, "grp": "sos"}, {"a": "bun", "k": "bun", "sr": "Pecivo (donje)", "en": "Bun (bottom)", "g": 40, "kcal": 108, "grp": "testo"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 100, "kcal": 312, "grp": "testo", "side": 1}, {"a": "onion_rings", "k": "onion_rings", "sr": "Kolutići luka", "en": "Onion rings", "g": 40, "kcal": 132, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 1690, "p": 85, "c": 127, "f": 94}, "al": ["gluten", "mleko", "jaja"]}, {"id": "ciken-burger", "cat": "burgeri", "sr": "Chicken burger", "en": "Chicken burger", "desc": "Belo meso, mozzarella, coleslaw salata, beli sos, paradajz.", "desc_en": "Chicken fillet, mozzarella, coleslaw, white sauce, tomato.", "price": 960, "pair": ["coleslaw-salata"], "mode": "stack", "img": "ciken-burger", "deco": ["dipper"], "comps": [{"a": "bun", "k": "bun", "sr": "Pecivo (gornje)", "en": "Bun (top)", "g": 50, "kcal": 135, "grp": "testo"}, {"a": "white_sauce", "k": "white_sauce", "sr": "Beli sos", "en": "White sauce", "g": 25, "kcal": 62, "grp": "sos"}, {"a": "coleslaw", "k": "coleslaw", "sr": "Coleslaw salata", "en": "Coleslaw", "g": 50, "kcal": 75, "grp": "povrce"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 30, "kcal": 5, "grp": "povrce"}, {"a": "mozz", "k": "mozz", "sr": "Mozzarella", "en": "Mozzarella", "g": 30, "kcal": 84, "grp": "sir"}, {"a": "chicken_panko", "k": "chicken_panko", "sr": "Pohovano belo meso", "en": "Crispy chicken fillet", "g": 150, "kcal": 390, "grp": "meso"}, {"a": "bun", "k": "bun", "sr": "Pecivo (donje)", "en": "Bun (bottom)", "g": 40, "kcal": 108, "grp": "testo"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 100, "kcal": 312, "grp": "testo", "side": 1}, {"a": "onion_rings", "k": "onion_rings", "sr": "Kolutići luka", "en": "Onion rings", "g": 40, "kcal": 132, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 1330, "p": 48, "c": 133, "f": 67}, "al": ["gluten", "mleko", "jaja"]}, {"id": "cilito-burger", "cat": "burgeri", "sr": "Chilito burger", "en": "Chilito burger", "desc": "Juneće meso 100%, cheddar sir, chipotle sos, crveni kupus, paradajz, jalapeño.", "desc_en": "100% beef, cheddar, chipotle sauce, red cabbage, tomato, jalapeño.", "price": 1090, "spice": 2, "story": "Za one koji vole da peče: jalapeño i chipotle na junećem mesu.", "story_en": "For those who like the heat: jalapeño and chipotle on beef.", "pair": ["pohovani-luk"], "sig": true, "mode": "stack", "img": "cilito-burger", "deco": ["dipper"], "comps": [{"a": "bun", "k": "bun", "sr": "Pecivo (gornje)", "en": "Bun (top)", "g": 50, "kcal": 135, "grp": "testo"}, {"a": "jalapeno", "k": "jalapeno", "sr": "Jalapeño", "en": "Jalapeño", "g": 15, "kcal": 4, "grp": "povrce"}, {"a": "red_cabbage", "k": "red_cabbage", "sr": "Crveni kupus", "en": "Red cabbage", "g": 30, "kcal": 9, "grp": "povrce"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 30, "kcal": 5, "grp": "povrce"}, {"a": "cheddar", "k": "cheddar", "sr": "Cheddar sir", "en": "Cheddar", "g": 25, "kcal": 101, "grp": "sir"}, {"a": "patty", "k": "patty", "sr": "100% juneće meso", "en": "100% beef", "g": 180, "kcal": 450, "grp": "meso"}, {"a": "chipotle", "k": "chipotle", "sr": "Chipotle sos", "en": "Chipotle sauce", "g": 25, "kcal": 82, "grp": "sos"}, {"a": "bun", "k": "bun", "sr": "Pecivo (donje)", "en": "Bun (bottom)", "g": 40, "kcal": 108, "grp": "testo"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 100, "kcal": 312, "grp": "testo", "side": 1}, {"a": "onion_rings", "k": "onion_rings", "sr": "Kolutići luka", "en": "Onion rings", "g": 40, "kcal": 132, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 1360, "p": 67, "c": 109, "f": 73}, "al": ["gluten", "mleko", "jaja"]}, {"id": "smoked-burger", "cat": "burgeri", "sr": "Smoked burger", "en": "Smoked burger", "desc": "Juneće meso 100%, dimljeni sir, burger sos, paradajz, BBQ sos, crveni luk, kiseli krastavčići, iceberg.", "desc_en": "100% beef, smoked cheese, burger sauce, tomato, BBQ sauce, red onion, pickles, iceberg.", "price": 1090, "pair": ["pohovani-luk"], "mode": "stack", "img": "smoked-burger", "deco": ["dipper"], "comps": [{"a": "bun", "k": "bun", "sr": "Pecivo (gornje)", "en": "Bun (top)", "g": 50, "kcal": 135, "grp": "testo"}, {"a": "burger_sauce", "k": "burger_sauce", "sr": "Burger sos", "en": "Burger sauce", "g": 20, "kcal": 70, "grp": "sos"}, {"a": "iceberg", "k": "iceberg", "sr": "Iceberg", "en": "Iceberg", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "pickles", "k": "pickles", "sr": "Kiseli krastavčići", "en": "Pickles", "g": 20, "kcal": 2, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 15, "kcal": 6, "grp": "povrce"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 30, "kcal": 5, "grp": "povrce"}, {"a": "smoked_cheese", "k": "smoked_cheese", "sr": "Dimljeni sir", "en": "Smoked cheese", "g": 30, "kcal": 99, "grp": "sir"}, {"a": "patty", "k": "patty", "sr": "100% juneće meso", "en": "100% beef", "g": 180, "kcal": 450, "grp": "meso"}, {"a": "bbq", "k": "bbq", "sr": "BBQ sos", "en": "BBQ sauce", "g": 20, "kcal": 34, "grp": "sos"}, {"a": "bun", "k": "bun", "sr": "Pecivo (donje)", "en": "Bun (bottom)", "g": 40, "kcal": 108, "grp": "testo"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 100, "kcal": 312, "grp": "testo", "side": 1}, {"a": "onion_rings", "k": "onion_rings", "sr": "Kolutići luka", "en": "Onion rings", "g": 40, "kcal": 132, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos", "side": 1}], "nut": {"kcal": 1380, "p": 68, "c": 116, "f": 71}, "al": ["gluten", "mleko", "jaja"]}, {"id": "panko-piletina", "cat": "finger", "sr": "Panko piletina", "en": "Panko chicken", "desc": "Belo meso, pomfrit, sweet chili, kari sos.", "desc_en": "Chicken breast, French fries, sweet chili sauce, curry sauce.", "price": 1080, "spice": 1, "mode": "knoll", "img": "panko-piletina", "comps": [{"a": "chicken_panko", "k": "chicken_panko", "sr": "Panko belo meso", "en": "Panko chicken breast", "g": 220, "kcal": 572, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 150, "kcal": 468, "grp": "testo"}, {"a": "sweet_chili", "k": "sweet_chili", "sr": "Sweet chili sos", "en": "Sweet chili sauce", "g": 30, "kcal": 66, "grp": "sos"}, {"a": "curry", "k": "curry", "sr": "Kari sos", "en": "Curry sauce", "g": 30, "kcal": 90, "grp": "sos"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 5, "kcal": 1, "grp": "povrce"}], "nut": {"kcal": 1220, "p": 46, "c": 121, "f": 61}, "al": ["gluten", "jaja"]}, {"id": "prolecne-rolnice", "cat": "finger", "sr": "Prolećne rolnice", "en": "Spring rolls", "desc": "Kupus, šargarepa, luk, pomfrit, sweet chili, wasabi sos.", "desc_en": "Cabbage, carrot, onion, French fries, sweet chili sauce, wasabi sauce.", "price": 490, "spice": 1, "mode": "knoll", "img": "prolecne-rolnice", "comps": [{"a": "spring_wrap", "k": "spring_wrap", "sr": "Kora za rolnice", "en": "Spring roll wrapper", "g": 60, "kcal": 240, "grp": "testo"}, {"a": "cabbage", "k": "cabbage", "sr": "Kupus", "en": "Cabbage", "g": 50, "kcal": 12, "grp": "povrce"}, {"a": "carrot", "k": "carrot", "sr": "Šargarepa", "en": "Carrot", "g": 30, "kcal": 12, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Luk", "en": "Onion", "g": 20, "kcal": 8, "grp": "povrce"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 100, "kcal": 312, "grp": "testo"}, {"a": "sweet_chili", "k": "sweet_chili", "sr": "Sweet chili sos", "en": "Sweet chili sauce", "g": 30, "kcal": 66, "grp": "sos"}, {"a": "wasabi", "k": "wasabi", "sr": "Wasabi sos", "en": "Wasabi sauce", "g": 25, "kcal": 88, "grp": "sos"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 5, "kcal": 1, "grp": "povrce"}], "nut": {"kcal": 740, "p": 9, "c": 100, "f": 34}, "al": ["gluten", "jaja"]}, {"id": "takitosi", "cat": "finger", "sr": "Takitosi", "en": "Taquitos", "desc": "Belo meso, pomfrit, chipotle, kari sos.", "desc_en": "Chicken breast, French fries, chipotle sauce, curry sauce.", "price": 960, "spice": 1, "mode": "knoll", "img": "takitosi", "comps": [{"a": "tortilla_fried", "k": "tortilla_fried", "sr": "Tortilja (hrskava)", "en": "Crispy tortilla", "g": 90, "kcal": 360, "grp": "testo"}, {"a": "chicken", "k": "chicken", "sr": "Pileće belo meso", "en": "Chicken breast", "g": 110, "kcal": 182, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 120, "kcal": 374, "grp": "testo"}, {"a": "chipotle", "k": "chipotle", "sr": "Chipotle sos", "en": "Chipotle sauce", "g": 25, "kcal": 82, "grp": "sos"}, {"a": "curry", "k": "curry", "sr": "Kari sos", "en": "Curry sauce", "g": 25, "kcal": 75, "grp": "sos"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}], "nut": {"kcal": 1100, "p": 46, "c": 105, "f": 53}, "al": ["gluten", "jaja"]}, {"id": "nacosi", "cat": "finger", "sr": "Naćosi", "en": "Nachos", "desc": "Čips tortilja, topljeni sir.", "desc_en": "Corn chips, melted cheese.", "price": 300, "mode": "knoll", "img": "nacosi", "comps": [{"a": "nachos", "k": "nachos", "sr": "Čips tortilja", "en": "Corn chips", "g": 80, "kcal": 392, "grp": "testo"}, {"a": "cheese_sauce", "k": "cheese_sauce", "sr": "Topljeni sir", "en": "Melted cheese", "g": 60, "kcal": 180, "grp": "sos"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 5, "kcal": 1, "grp": "povrce"}], "nut": {"kcal": 570, "p": 12, "c": 54, "f": 35}, "al": ["mleko"]}, {"id": "panko-tortilja", "cat": "finger", "sr": "Panko pileća tortilja", "en": "Panko chicken wrap", "desc": "Belo meso, wasabi sos, iceberg salata, sweet chili, šargarepa, kiseli krastavac, paradajz.", "desc_en": "Chicken breast, wasabi sauce, iceberg, sweet chili, carrot, pickles, tomato.", "price": 870, "spice": 1, "mode": "knoll", "img": "panko-tortilja", "comps": [{"a": "tortilla", "k": "tortilla", "sr": "Tortilja", "en": "Tortilla", "g": 80, "kcal": 248, "grp": "testo"}, {"a": "chicken_panko", "k": "chicken_panko", "sr": "Panko belo meso", "en": "Panko chicken", "g": 150, "kcal": 390, "grp": "meso"}, {"a": "iceberg", "k": "iceberg", "sr": "Iceberg", "en": "Iceberg", "g": 30, "kcal": 4, "grp": "povrce"}, {"a": "carrot", "k": "carrot", "sr": "Šargarepa", "en": "Carrot", "g": 25, "kcal": 10, "grp": "povrce"}, {"a": "pickles", "k": "pickles", "sr": "Kiseli krastavac", "en": "Pickles", "g": 20, "kcal": 2, "grp": "povrce"}, {"a": "tomato", "k": "tomato", "sr": "Paradajz", "en": "Tomato", "g": 30, "kcal": 5, "grp": "povrce"}, {"a": "wasabi", "k": "wasabi", "sr": "Wasabi sos", "en": "Wasabi sauce", "g": 20, "kcal": 70, "grp": "sos"}, {"a": "sweet_chili", "k": "sweet_chili", "sr": "Sweet chili sos", "en": "Sweet chili sauce", "g": 20, "kcal": 44, "grp": "sos"}], "nut": {"kcal": 770, "p": 35, "c": 82, "f": 35}, "al": ["gluten", "jaja"]}, {"id": "mini-burger", "cat": "deca", "sr": "Mini burger", "en": "Mini burger", "desc": "100% juneće meso, krastavčići, kečap, zelena salata, kačkavalj.", "desc_en": "100% beef, pickles, ketchup, lettuce, yellow cheese.", "price": 590, "pair": ["kinder-palacinka"], "mode": "stack", "img": "mini-burger", "comps": [{"a": "bun", "k": "bun", "sr": "Pecivo (gornje)", "en": "Bun (top)", "g": 40, "kcal": 108, "grp": "testo"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 15, "kcal": 17, "grp": "sos"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 10, "kcal": 1, "grp": "povrce"}, {"a": "pickles", "k": "pickles", "sr": "Krastavčići", "en": "Pickles", "g": 15, "kcal": 2, "grp": "povrce"}, {"a": "kackavalj", "k": "kackavalj", "sr": "Kačkavalj", "en": "Kashkaval cheese", "g": 20, "kcal": 70, "grp": "sir"}, {"a": "patty", "k": "patty", "sr": "100% juneće meso", "en": "100% beef", "g": 100, "kcal": 250, "grp": "meso"}, {"a": "bun", "k": "bun", "sr": "Pecivo (donje)", "en": "Bun (bottom)", "g": 30, "kcal": 81, "grp": "testo"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 80, "kcal": 250, "grp": "testo", "side": 1}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 15, "kcal": 17, "grp": "sos", "side": 1}], "nut": {"kcal": 800, "p": 41, "c": 75, "f": 37}, "al": ["gluten", "mleko"]}, {"id": "mini-panko-piletina", "cat": "deca", "sr": "Mini panko", "en": "Mini panko", "desc": "Belo meso (150 g), pomfrit, kečap, beli sos.", "desc_en": "Chicken breast (150 g), French fries, ketchup, white sauce.", "price": 690, "pair": ["kinder-palacinka"], "mode": "knoll", "img": "mini-panko-piletina", "comps": [{"a": "chicken_panko", "k": "chicken_panko", "sr": "Panko belo meso", "en": "Panko chicken", "g": 150, "kcal": 390, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 120, "kcal": 374, "grp": "testo"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}, {"a": "white_sauce", "k": "white_sauce", "sr": "Beli sos", "en": "White sauce", "g": 20, "kcal": 50, "grp": "sos"}], "nut": {"kcal": 840, "p": 32, "c": 78, "f": 44}, "al": ["gluten", "mleko", "jaja"]}, {"id": "mini-cevapi", "cat": "deca", "sr": "Mini ćevapi", "en": "Mini ćevapi", "desc": "100% juneće meso (150 g), kečap, pomfrit.", "desc_en": "100% beef (150 g), ketchup, French fries.", "price": 640, "pair": ["kinder-palacinka"], "mode": "knoll", "img": "mini-cevapi", "comps": [{"a": "cevapi", "k": "cevapi", "sr": "100% juneće meso", "en": "100% beef", "g": 150, "kcal": 390, "grp": "meso"}, {"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 120, "kcal": 374, "grp": "testo"}, {"a": "ketchup", "k": "ketchup", "sr": "Kečap", "en": "Ketchup", "g": 20, "kcal": 22, "grp": "sos"}], "nut": {"kcal": 790, "p": 36, "c": 57, "f": 47}, "al": []}, {"id": "cizkejk", "cat": "deserti", "sr": "Cheesecake", "en": "Cheesecake", "desc": "Kora sa plazma keksom, krem od mascarpone sira i slatke pavlake, preliven sosom od jagode.", "desc_en": "Plazma biscuit crust, mascarpone and sweet cream filling, topped with strawberry sauce.", "price": 490, "mode": "cake", "img": "cizkejk", "comps": [{"a": "strawberry", "k": "strawberry", "sr": "Jagoda", "en": "Strawberry", "g": 12, "kcal": 4, "grp": "voce"}, {"a": "strawberry_sauce", "k": "strawberry_sauce", "sr": "Sos od jagode", "en": "Strawberry sauce", "g": 25, "kcal": 32, "grp": "slatko"}, {"a": "mascarpone_cream", "k": "mascarpone_cream", "sr": "Krem od mascarponea i pavlake", "en": "Mascarpone & cream filling", "g": 90, "kcal": 315, "grp": "sir"}, {"a": "biscuit_base", "k": "biscuit_base", "sr": "Kora sa plazma keksom", "en": "Plazma biscuit crust", "g": 40, "kcal": 192, "grp": "testo"}], "nut": {"kcal": 540, "p": 6, "c": 46, "f": 38}, "al": ["gluten", "mleko"]}, {"id": "karamel-badem", "cat": "deserti", "sr": "Karamel badem", "en": "Caramel almond", "desc": "Listići badema, seckani badem, krem od vanile, orašasta kora, karamel preliv.", "desc_en": "Almond flakes, chopped almonds, vanilla cream, nut crust, caramel topping.", "price": 490, "mode": "cake", "img": "karamel-badem", "comps": [{"a": "caramel", "k": "caramel", "sr": "Karamel preliv", "en": "Caramel topping", "g": 25, "kcal": 95, "grp": "slatko"}, {"a": "vanilla_cream", "k": "vanilla_cream", "sr": "Krem od vanile", "en": "Vanilla cream", "g": 60, "kcal": 120, "grp": "slatko"}, {"a": "nut_crust", "k": "nut_crust", "sr": "Orašasta kora", "en": "Nut crust", "g": 50, "kcal": 240, "grp": "testo"}, {"a": "almond", "k": "almond", "sr": "Listići i seckani badem", "en": "Almond flakes", "g": 30, "kcal": 172, "grp": "voce"}], "nut": {"kcal": 630, "p": 14, "c": 65, "f": 36}, "al": ["gluten", "mleko", "jaja", "orasi"]}, {"id": "kinder-kolac", "cat": "deserti", "sr": "Kinder kolač", "en": "Kinder dessert", "desc": "Biskvitna korica, nutella, krem od vanile, krem od čokolade, plazma keks, pečeni lešnik, preliv od mlečne čokolade.", "desc_en": "Sponge base, Nutella, vanilla cream, chocolate cream, Plazma biscuits, roasted hazelnuts, milk chocolate topping.", "price": 490, "mode": "cake", "img": "kinder-kolac", "comps": [{"a": "milk_choc", "k": "milk_choc", "sr": "Preliv od mlečne čokolade", "en": "Milk chocolate topping", "g": 20, "kcal": 107, "grp": "slatko"}, {"a": "choc_cream", "k": "choc_cream", "sr": "Krem od čokolade", "en": "Chocolate cream", "g": 40, "kcal": 120, "grp": "slatko"}, {"a": "vanilla_cream", "k": "vanilla_cream", "sr": "Krem od vanile", "en": "Vanilla cream", "g": 40, "kcal": 80, "grp": "slatko"}, {"a": "hazelnut", "k": "hazelnut", "sr": "Pečeni lešnik", "en": "Roasted hazelnuts", "g": 10, "kcal": 65, "grp": "voce"}, {"a": "plazma", "k": "plazma", "sr": "Plazma keks", "en": "Plazma biscuits", "g": 15, "kcal": 66, "grp": "testo"}, {"a": "nutella", "k": "nutella", "sr": "Nutella", "en": "Nutella", "g": 20, "kcal": 108, "grp": "slatko"}, {"a": "sponge", "k": "sponge", "sr": "Biskvitna korica", "en": "Sponge base", "g": 30, "kcal": 90, "grp": "testo"}], "nut": {"kcal": 640, "p": 11, "c": 72, "f": 34}, "al": ["gluten", "mleko", "jaja", "orasi", "soja"]}, {"id": "pohovani-sladoled", "cat": "deserti", "sr": "Pohovani sladoled", "en": "Fried ice cream", "desc": "Preliv po izboru: karamela, višnja sa plodovima ili šumsko voće sa plodovima.", "desc_en": "Choice of topping: caramel, sour cherry or forest fruit sauce.", "mode": "knoll", "img": "pohovani-sladoled", "comps": [{"a": "ice_cream", "k": "ice_cream", "sr": "Sladoled", "en": "Ice cream", "g": 100, "kcal": 207, "grp": "slatko"}, {"a": "breading", "k": "breading", "sr": "Hrskava pohovana kora", "en": "Crispy coating", "g": 40, "kcal": 180, "grp": "testo"}, {"a": "caramel", "k": "caramel", "sr": "Preliv od karamele", "en": "Caramel sauce", "g": 35, "kcal": 133, "grp": "slatko"}, {"a": "whip", "k": "whip", "sr": "Šlag", "en": "Whipped cream", "g": 20, "kcal": 52, "grp": "slatko"}, {"a": "wafer", "k": "wafer", "sr": "Rolat vafel", "en": "Wafer roll", "g": 6, "kcal": 29, "grp": "testo"}, {"a": "choc_top", "k": "choc_top", "sr": "Čokoladne mrvice", "en": "Chocolate crumbs", "g": 8, "kcal": 28, "grp": "slatko"}], "nut": {"kcal": 630, "p": 8, "c": 84, "f": 29}, "al": ["gluten", "mleko", "jaja", "soja"], "var": [["Karamel", 590], ["Višnja", 590], ["Šumsko voće", 590]], "var_en": ["Caramel", "Sour cherry", "Forest fruit"], "vimg": ["pohovani-sladoled", "pohovani-sladoled-2", "pohovani-sladoled-3"], "vc": [{"comps": [{"a": "ice_cream", "k": "ice_cream", "sr": "Sladoled", "en": "Ice cream", "g": 100, "kcal": 207, "grp": "slatko"}, {"a": "breading", "k": "breading", "sr": "Hrskava pohovana kora", "en": "Crispy coating", "g": 40, "kcal": 180, "grp": "testo"}, {"a": "caramel", "k": "caramel", "sr": "Preliv od karamele", "en": "Caramel sauce", "g": 35, "kcal": 133, "grp": "slatko"}, {"a": "whip", "k": "whip", "sr": "Šlag", "en": "Whipped cream", "g": 20, "kcal": 52, "grp": "slatko"}, {"a": "wafer", "k": "wafer", "sr": "Rolat vafel", "en": "Wafer roll", "g": 6, "kcal": 29, "grp": "testo"}, {"a": "choc_top", "k": "choc_top", "sr": "Čokoladne mrvice", "en": "Chocolate crumbs", "g": 8, "kcal": 28, "grp": "slatko"}], "nut": {"kcal": 630, "p": 8, "c": 84, "f": 29}, "al": ["gluten", "mleko", "jaja", "soja"]}, {"comps": [{"a": "ice_cream", "k": "ice_cream", "sr": "Sladoled", "en": "Ice cream", "g": 100, "kcal": 207, "grp": "slatko"}, {"a": "breading", "k": "breading", "sr": "Hrskava pohovana kora", "en": "Crispy coating", "g": 40, "kcal": 180, "grp": "testo"}, {"a": "cherry_top", "k": "cherry_top", "sr": "Višnja sa plodovima", "en": "Sour cherry sauce", "g": 40, "kcal": 60, "grp": "voce"}, {"a": "whip", "k": "whip", "sr": "Šlag", "en": "Whipped cream", "g": 20, "kcal": 52, "grp": "slatko"}, {"a": "wafer", "k": "wafer", "sr": "Rolat vafel", "en": "Wafer roll", "g": 6, "kcal": 29, "grp": "testo"}, {"a": "choc_top", "k": "choc_top", "sr": "Čokoladne mrvice", "en": "Chocolate crumbs", "g": 8, "kcal": 28, "grp": "slatko"}], "nut": {"kcal": 560, "p": 8, "c": 74, "f": 26}, "al": ["gluten", "mleko", "jaja", "soja"]}, {"comps": [{"a": "ice_cream", "k": "ice_cream", "sr": "Sladoled", "en": "Ice cream", "g": 100, "kcal": 207, "grp": "slatko"}, {"a": "breading", "k": "breading", "sr": "Hrskava pohovana kora", "en": "Crispy coating", "g": 40, "kcal": 180, "grp": "testo"}, {"a": "forest_top", "k": "forest_top", "sr": "Šumsko voće sa plodovima", "en": "Forest fruit sauce", "g": 40, "kcal": 60, "grp": "voce"}, {"a": "whip", "k": "whip", "sr": "Šlag", "en": "Whipped cream", "g": 20, "kcal": 52, "grp": "slatko"}, {"a": "wafer", "k": "wafer", "sr": "Rolat vafel", "en": "Wafer roll", "g": 6, "kcal": 29, "grp": "testo"}, {"a": "choc_top", "k": "choc_top", "sr": "Čokoladne mrvice", "en": "Chocolate crumbs", "g": 8, "kcal": 28, "grp": "slatko"}], "nut": {"kcal": 560, "p": 8, "c": 74, "f": 26}, "al": ["gluten", "mleko", "jaja", "soja"]}]}, {"id": "kinder-palacinka", "cat": "palacinke", "sr": "Kinder palačinka", "en": "Kinder pancake", "desc": "Čokoladni toping, kinder čokolada, francuski krem, karamel sos, šlag.", "desc_en": "Chocolate topping, Kinder chocolate, French cream, caramel sauce, whipped cream.", "price": 560, "mode": "knoll", "img": "kinder-palacinka", "comps": [{"a": "crepe", "k": "crepe", "sr": "Palačinka", "en": "Crêpe", "g": 120, "kcal": 270, "grp": "testo"}, {"a": "custard", "k": "custard", "sr": "Francuski krem", "en": "French cream", "g": 50, "kcal": 75, "grp": "slatko"}, {"a": "milk_choc", "k": "milk_choc", "sr": "Kinder čokolada", "en": "Kinder chocolate", "g": 25, "kcal": 134, "grp": "slatko"}, {"a": "choc_top", "k": "choc_top", "sr": "Čokoladni toping", "en": "Chocolate topping", "g": 25, "kcal": 88, "grp": "slatko"}, {"a": "caramel", "k": "caramel", "sr": "Karamel sos", "en": "Caramel sauce", "g": 15, "kcal": 57, "grp": "slatko"}, {"a": "whip", "k": "whip", "sr": "Šlag", "en": "Whipped cream", "g": 30, "kcal": 78, "grp": "slatko"}], "nut": {"kcal": 700, "p": 12, "c": 87, "f": 34}, "al": ["gluten", "mleko", "jaja", "soja"]}, {"id": "kosnica-palacinka", "cat": "palacinke", "sr": "Košnica palačinka", "en": "Košnica pancake", "desc": "Nadev od crvenog voća, čokoladni kranč, francuski krem, voćni toping, karamel sos, šlag.", "desc_en": "Red fruit filling, chocolate crunch, French cream, fruit topping, caramel sauce, whipped cream.", "price": 560, "story": "Palačinka kuće: crveno voće, francuski krem i karamel.", "story_en": "The house pancake: red fruit, French cream and caramel.", "sig": true, "mode": "knoll", "img": "kosnica-palacinka", "comps": [{"a": "crepe", "k": "crepe", "sr": "Palačinka", "en": "Crêpe", "g": 120, "kcal": 270, "grp": "testo"}, {"a": "fruit_fill", "k": "fruit_fill", "sr": "Nadev od crvenog voća", "en": "Red fruit filling", "g": 50, "kcal": 75, "grp": "voce"}, {"a": "custard", "k": "custard", "sr": "Francuski krem", "en": "French cream", "g": 50, "kcal": 75, "grp": "slatko"}, {"a": "choc_crunch", "k": "choc_crunch", "sr": "Čokoladni kranč", "en": "Chocolate crunch", "g": 15, "kcal": 78, "grp": "slatko"}, {"a": "fruit_top", "k": "fruit_top", "sr": "Voćni toping", "en": "Fruit topping", "g": 20, "kcal": 30, "grp": "voce"}, {"a": "caramel", "k": "caramel", "sr": "Karamel sos", "en": "Caramel sauce", "g": 15, "kcal": 57, "grp": "slatko"}, {"a": "whip", "k": "whip", "sr": "Šlag", "en": "Whipped cream", "g": 30, "kcal": 78, "grp": "slatko"}], "nut": {"kcal": 660, "p": 11, "c": 93, "f": 27}, "al": ["gluten", "mleko", "jaja"]}, {"id": "coleslaw-salata", "cat": "prilozi", "sr": "Coleslaw salata", "en": "Coleslaw", "desc": "Kupus, šargarepa, crveni luk, majonez, pavlaka.", "desc_en": "Cabbage, carrot, red onion, mayonnaise, sour cream.", "price": 390, "mode": "knoll", "comps": [{"a": "cabbage", "k": "cabbage", "sr": "Kupus", "en": "Cabbage", "g": 120, "kcal": 30, "grp": "povrce"}, {"a": "carrot", "k": "carrot", "sr": "Šargarepa", "en": "Carrot", "g": 40, "kcal": 16, "grp": "povrce"}, {"a": "onion", "k": "onion", "sr": "Crveni luk", "en": "Red onion", "g": 15, "kcal": 6, "grp": "povrce"}, {"a": "mayo", "k": "mayo", "sr": "Majonez", "en": "Mayonnaise", "g": 15, "kcal": 102, "grp": "sos"}, {"a": "cream", "k": "cream", "sr": "Pavlaka", "en": "Sour cream", "g": 15, "kcal": 30, "grp": "sir"}], "nut": {"kcal": 180, "p": 3, "c": 13, "f": 14}, "al": ["mleko", "jaja"]}, {"id": "miks-zelenih-salata", "cat": "prilozi", "sr": "Miks zelenih salata", "en": "Mixed greens", "desc": "Iceberg, zelena salata, rukola, parmezan, cherry paradajz.", "desc_en": "Iceberg, lettuce, arugula, parmesan, cherry tomatoes.", "price": 390, "mode": "knoll", "comps": [{"a": "iceberg", "k": "iceberg", "sr": "Iceberg", "en": "Iceberg", "g": 70, "kcal": 10, "grp": "povrce"}, {"a": "lettuce", "k": "lettuce", "sr": "Zelena salata", "en": "Lettuce", "g": 50, "kcal": 7, "grp": "povrce"}, {"a": "rucola", "k": "rucola", "sr": "Rukola", "en": "Arugula", "g": 30, "kcal": 8, "grp": "povrce"}, {"a": "parmesan", "k": "parmesan", "sr": "Parmezan", "en": "Parmesan", "g": 15, "kcal": 65, "grp": "sir"}, {"a": "cherry", "k": "cherry", "sr": "Cherry paradajz", "en": "Cherry tomatoes", "g": 60, "kcal": 11, "grp": "povrce"}, {"a": "dressing", "k": "dressing", "sr": "Dresing", "en": "Dressing", "g": 10, "kcal": 45, "grp": "sos"}], "nut": {"kcal": 140, "p": 8, "c": 8, "f": 10}, "al": ["mleko"]}, {"id": "pomfrit", "cat": "prilozi", "sr": "Pomfrit", "en": "French fries", "price": 320, "size": "200 g", "mode": "knoll", "comps": [{"a": "fries", "k": "fries", "sr": "Pomfrit", "en": "French fries", "g": 200, "kcal": 624, "grp": "testo"}], "nut": {"kcal": 620, "p": 7, "c": 82, "f": 30}, "al": []}, {"id": "zacinjeni-krompir", "cat": "prilozi", "sr": "Začinjeni krompir", "en": "Seasoned potatoes", "price": 360, "size": "200 g", "mode": "knoll", "comps": [{"a": "potato_sp", "k": "potato_sp", "sr": "Začinjeni krompir", "en": "Seasoned potatoes", "g": 200, "kcal": 320, "grp": "testo"}], "nut": {"kcal": 320, "p": 5, "c": 46, "f": 13}, "al": []}, {"id": "pohovani-luk", "cat": "prilozi", "sr": "Pohovani luk", "en": "Onion rings", "price": 330, "size": "200 g", "mode": "knoll", "comps": [{"a": "onion_rings", "k": "onion_rings", "sr": "Kolutići luka", "en": "Onion rings", "g": 200, "kcal": 660, "grp": "testo"}], "nut": {"kcal": 660, "p": 8, "c": 66, "f": 40}, "al": ["gluten"]}, {"id": "panirana-mocarela", "cat": "prilozi", "sr": "Panirana mozzarella", "en": "Breaded mozzarella", "price": 620, "size": "200 g", "mode": "knoll", "comps": [{"a": "mozz_fried", "k": "mozz_fried", "sr": "Panirana mozzarella", "en": "Breaded mozzarella", "g": 200, "kcal": 660, "grp": "sir"}], "nut": {"kcal": 660, "p": 30, "c": 40, "f": 42}, "al": ["gluten", "mleko", "jaja"]}, {"id": "grilovano-povrce", "cat": "prilozi", "sr": "Grilovano povrće", "en": "Grilled vegetables", "price": 360, "size": "200 g", "mode": "knoll", "comps": [{"a": "veg_grill", "k": "veg_grill", "sr": "Grilovano povrće", "en": "Grilled vegetables", "g": 200, "kcal": 140, "grp": "povrce"}], "nut": {"kcal": 140, "p": 3, "c": 14, "f": 8}, "al": []}, {"id": "pirinac", "cat": "prilozi", "sr": "Pirinač", "en": "Rice", "price": 300, "size": "200 g", "mode": "knoll", "comps": [{"a": "rice", "k": "rice", "sr": "Pirinač", "en": "Rice", "g": 200, "kcal": 260, "grp": "testo"}], "nut": {"kcal": 260, "p": 5, "c": 56, "f": 1}, "al": []}, {"id": "lepinja", "cat": "prilozi", "sr": "Lepinja", "en": "Flatbread", "price": 120, "mode": "knoll", "comps": [{"a": "lepinja", "k": "lepinja", "sr": "Lepinja", "en": "Flatbread", "g": 100, "kcal": 275, "grp": "testo"}], "nut": {"kcal": 280, "p": 9, "c": 55, "f": 2}, "al": ["gluten"]}, {"id": "sosevi", "cat": "prilozi", "sr": "Sosevi", "en": "Sauces", "desc": "Beli, kečap, wasabi, chipotle, sweet chili ili kari.", "desc_en": "White, ketchup, wasabi, chipotle, sweet chili or curry.", "price": 120, "mode": "knoll", "comps": [{"a": "white_sauce", "k": "white_sauce", "sr": "Sos po izboru", "en": "Sauce of your choice", "g": 50, "kcal": 125, "grp": "sos"}], "nut": {"kcal": 120, "p": 1, "c": 3, "f": 12}, "al": ["mleko", "jaja"]}], "al": {"gluten": ["Gluten", "Gluten"], "mleko": ["Mleko", "Milk"], "jaja": ["Jaja", "Eggs"], "riba": ["Riba", "Fish"], "senf": ["Senf", "Mustard"], "orasi": ["Orašasti plodovi", "Tree nuts"], "soja": ["Soja", "Soy"]}, "groups": {"meso": ["Meso", "Meat"], "riba": ["Riba", "Fish"], "sir": ["Sir i mlečno", "Cheese & dairy"], "povrce": ["Povrće", "Veg"], "testo": ["Testo i prilog", "Bread & sides"], "sos": ["Sos", "Sauce"], "slatko": ["Slatko", "Sweet"], "voce": ["Voće i orasi", "Fruit & nuts"]}};
window.KS_DRINKS={"cats": [{"id": "topli", "sr": "Topli napici", "en": "Hot drinks"}, {"id": "cajevi", "sr": "Čajevi", "en": "Teas", "note": "Uz sve čajeve ide kriška limuna i med.", "note_en": "All teas are served with a slice of lemon and honey."}, {"id": "ledeni", "sr": "Ledeni čajevi", "en": "Iced teas"}, {"id": "cedjeni", "sr": "Sveže ceđeni napici", "en": "Freshly squeezed"}, {"id": "gazirani", "sr": "Gazirani sokovi", "en": "Soft drinks"}, {"id": "negazirani", "sr": "Negazirani sokovi", "en": "Juices"}, {"id": "cedevita", "sr": "Cedevita", "en": "Cedevita"}, {"id": "energetska", "sr": "Energetska pića", "en": "Energy drinks"}, {"id": "vode", "sr": "Vode", "en": "Water"}, {"id": "tocena", "sr": "Piva točena", "en": "Draft beer"}, {"id": "flasa", "sr": "Piva flašica", "en": "Bottled beer"}, {"id": "cider", "sr": "Cider", "en": "Cider"}, {"id": "rakije", "sr": "Rakije", "en": "Rakija", "note": "Tradicionalna srpska voćna rakija, 0,03 l.", "note_en": "Traditional Serbian fruit brandy, 0.03 l."}, {"id": "aperitivi", "sr": "Aperitivi i likeri", "en": "Aperitifs & liqueurs"}, {"id": "zestina", "sr": "Žestina", "en": "Spirits", "note": "Sve 0,03 l.", "note_en": "All 0.03 l."}, {"id": "vina", "sr": "Vina", "en": "Wines"}], "items": [{"id": "p-domaca-kafa", "cat": "topli", "sr": "Domaća kafa", "en": "Turkish coffee", "price": 170}, {"id": "p-nes-kafa", "cat": "topli", "sr": "Nes kafa", "en": "Instant coffee", "price": 220}, {"id": "p-espresso", "cat": "topli", "sr": "Espresso", "price": 200}, {"id": "p-espresso-sa-mlekom", "cat": "topli", "sr": "Espresso sa mlekom", "en": "Espresso with milk", "price": 220}, {"id": "p-espresso-sa-sojinim-mlekom", "cat": "topli", "sr": "Espresso sa sojinim mlekom", "en": "Espresso with soy milk", "price": 250}, {"id": "p-cappuccino", "cat": "topli", "sr": "Cappuccino", "price": 240}, {"id": "p-cafe-latte", "cat": "topli", "sr": "Cafe Latte", "en": "Café latte", "price": 250}, {"id": "p-macchiato", "cat": "topli", "sr": "Macchiato", "price": 220}, {"id": "p-americano-kafa", "cat": "topli", "sr": "Americano kafa", "en": "Americano", "price": 200}, {"id": "p-caj", "cat": "cajevi", "sr": "Čaj", "en": "Tea", "desc": "Kamilica, nana, zeleni čaj, crni čaj, šumsko voće, jabuka-cimet.", "desc_en": "Chamomile, mint, green tea, black tea, forest fruit, apple cinnamon.", "price": 230}, {"id": "p-borovnica", "cat": "ledeni", "sr": "Borovnica", "en": "Blueberry", "desc": "Sirup borovnica, čaj hibiskus, sveža nana, limun.", "desc_en": "Blueberry syrup, hibiscus tea, fresh mint, lemon.", "price": 370}, {"id": "p-nana", "cat": "ledeni", "sr": "Nana", "en": "Mint", "desc": "Sirup od nane, čaj od nane, sveža nana, limun.", "desc_en": "Mint syrup, mint tea, fresh mint, lemon.", "price": 370}, {"id": "p-zova", "cat": "ledeni", "sr": "Zova", "en": "Elderflower", "desc": "Sirup od zove, čaj od nane, sveža nana, limun.", "desc_en": "Elderflower syrup, mint tea, fresh mint, lemon.", "price": 370}, {"id": "p-limunada", "cat": "cedjeni", "sr": "Limunada", "en": "Lemonade", "price": 280, "vol": "0,3 l"}, {"id": "p-pomorandza", "cat": "cedjeni", "sr": "Pomorandža", "en": "Orange juice", "price": 350, "vol": "0,2 l"}, {"id": "p-vocni-mix", "cat": "cedjeni", "sr": "Voćni mix", "en": "Fruit mix", "desc": "Limun, pomorandža, grejpfrut.", "desc_en": "Lemon, orange, grapefruit.", "price": 430, "vol": "0,3 l"}, {"id": "p-energy-mix", "cat": "cedjeni", "sr": "Energy Mix", "desc": "Cvekla, šargarepa, jabuka, pomorandža.", "desc_en": "Beetroot, carrot, apple, orange.", "price": 430, "vol": "0,3 l"}, {"id": "p-kosnica-mix", "cat": "cedjeni", "sr": "Košnica Mix", "desc": "Cvekla, šargarepa, jabuka, pomorandža, đumbir, cimet.", "desc_en": "Beetroot, carrot, apple, orange, ginger, cinnamon.", "price": 430, "vol": "0,3 l"}, {"id": "p-grejp", "cat": "cedjeni", "sr": "Grejp", "en": "Grapefruit juice", "price": 350, "vol": "0,2 l"}, {"id": "p-proteinski-sejk-cokolada", "cat": "cedjeni", "sr": "Proteinski šejk čokolada", "en": "Protein shake – chocolate", "price": 350, "vol": "0,3 l"}, {"id": "p-proteinski-sejk-vanila", "cat": "cedjeni", "sr": "Proteinski šejk vanila", "en": "Protein shake – vanilla", "price": 350, "vol": "0,3 l"}, {"id": "p-coca-cola", "cat": "gazirani", "sr": "Coca-Cola", "price": 270, "vol": "0,25 l"}, {"id": "p-coca-cola-zero", "cat": "gazirani", "sr": "Coca-Cola Zero", "price": 270, "vol": "0,25 l"}, {"id": "p-fanta", "cat": "gazirani", "sr": "Fanta", "price": 270, "vol": "0,25 l"}, {"id": "p-schweppes-bitter-lemon", "cat": "gazirani", "sr": "Schweppes Bitter Lemon", "price": 280, "vol": "0,25 l"}, {"id": "p-schweppes-tonic", "cat": "gazirani", "sr": "Schweppes Tonic", "price": 280, "vol": "0,25 l"}, {"id": "p-sprite", "cat": "gazirani", "sr": "Sprite", "price": 270, "vol": "0,25 l"}, {"id": "p-orangina", "cat": "gazirani", "sr": "Orangina", "price": 300, "vol": "0,25 l"}, {"id": "p-cockta", "cat": "gazirani", "sr": "Cockta", "price": 270, "vol": "0,25 l"}, {"id": "p-next-jabuka", "cat": "negazirani", "sr": "Next jabuka", "en": "Next apple", "price": 270, "vol": "0,2 l"}, {"id": "p-next-borovnica", "cat": "negazirani", "sr": "Next borovnica", "en": "Next blueberry", "price": 270, "vol": "0,2 l"}, {"id": "p-next-breskva", "cat": "negazirani", "sr": "Next breskva", "en": "Next peach", "price": 270, "vol": "0,2 l"}, {"id": "p-next-jagoda", "cat": "negazirani", "sr": "Next jagoda", "en": "Next strawberry", "price": 270, "vol": "0,2 l"}, {"id": "p-next-pomorandza", "cat": "negazirani", "sr": "Next pomorandža", "en": "Next orange", "price": 270, "vol": "0,2 l"}, {"id": "p-fuzetea", "cat": "negazirani", "sr": "Fuzetea", "price": 270, "vol": "0,25 l"}, {"id": "p-cedevita", "cat": "cedevita", "sr": "Cedevita", "desc": "Limun, pomorandža, zova-limun, limeta, ananas-mango.", "desc_en": "Lemon, orange, elderflower-lemon, lime, pineapple-mango.", "price": 260, "vol": "0,2 l"}, {"id": "p-red-bull", "cat": "energetska", "sr": "Red Bull", "price": 410, "vol": "0,25 l"}, {"id": "p-ultra-energy", "cat": "energetska", "sr": "Ultra Energy", "price": 280, "vol": "0,25 l"}, {"id": "p-rosa", "cat": "vode", "sr": "Rosa", "en": "Rosa still water", "var": [["0,33 l", 200], ["0,75 l", 370]]}, {"id": "p-rosa-gazirana", "cat": "vode", "sr": "Rosa gazirana", "en": "Rosa sparkling water", "var": [["0,33 l", 200], ["0,75 l", 370]]}, {"id": "p-romerquelle-limunska-trava", "cat": "vode", "sr": "Römerquelle limunska trava", "en": "Römerquelle lemongrass", "price": 290, "vol": "0,33 l"}, {"id": "p-tocena-heineken", "cat": "tocena", "sr": "Heineken", "var": [["0,25 l", 260], ["0,5 l", 390]]}, {"id": "p-tocena-birra-moretti", "cat": "tocena", "sr": "Birra Moretti", "var": [["0,25 l", 230], ["0,5 l", 360]]}, {"id": "p-tocena-krusovice", "cat": "tocena", "sr": "Krušovice", "var": [["0,33 l", 270], ["0,5 l", 390]]}, {"id": "p-tocena-zajecarsko-svetlo", "cat": "tocena", "sr": "Zaječarsko svetlo", "en": "Zaječarsko lager", "var": [["0,33 l", 240], ["0,5 l", 330]]}, {"id": "p-flasa-heineken", "cat": "flasa", "sr": "Heineken", "price": 350, "vol": "0,25 l"}, {"id": "p-flasa-heineken-0-0", "cat": "flasa", "sr": "Heineken 0.0%", "en": "Heineken 0.0% (non-alcoholic)", "price": 380, "vol": "0,25 l"}, {"id": "p-flasa-lasko", "cat": "flasa", "sr": "Laško", "price": 290, "vol": "0,33 l"}, {"id": "p-flasa-heineken-silver", "cat": "flasa", "sr": "Heineken Silver", "price": 330, "vol": "0,25 l"}, {"id": "p-flasa-zajecarsko-svetlo", "cat": "flasa", "sr": "Zaječarsko svetlo", "en": "Zaječarsko lager", "price": 290, "vol": "0,33 l"}, {"id": "p-flasa-krusovice-tamno", "cat": "flasa", "sr": "Krušovice tamno", "en": "Krušovice dark", "price": 310, "vol": "0,33 l"}, {"id": "p-flasa-birra-moretti", "cat": "flasa", "sr": "Birra Moretti", "price": 310, "vol": "0,33 l"}, {"id": "p-flasa-sol", "cat": "flasa", "sr": "Sol", "price": 450, "vol": "0,33 l"}, {"id": "p-flasa-kapuziner", "cat": "flasa", "sr": "Kapuziner", "price": 620, "vol": "0,5 l"}, {"id": "p-flasa-amstel", "cat": "flasa", "sr": "Amstel", "price": 350, "vol": "0,33 l"}, {"id": "p-somersby-jabuka", "cat": "cider", "sr": "Somersby jabuka", "en": "Somersby apple", "price": 360, "vol": "0,33 l"}, {"id": "p-somersby-kruska", "cat": "cider", "sr": "Somersby kruška", "en": "Somersby pear", "price": 360, "vol": "0,33 l"}, {"id": "p-somersby-borovnica", "cat": "cider", "sr": "Somersby borovnica", "en": "Somersby blueberry", "price": 360, "vol": "0,33 l"}, {"id": "p-somersby-mango", "cat": "cider", "sr": "Somersby mango", "price": 360, "vol": "0,33 l"}, {"id": "p-momirovic-sljiva", "cat": "rakije", "sr": "Šljiva", "en": "Plum", "sub": "Momirović Svileuva", "sub_en": "Momirović Svileuva", "price": 260, "vol": "0,03 l"}, {"id": "p-momirovic-dunja", "cat": "rakije", "sr": "Dunja", "en": "Quince", "sub": "Momirović Svileuva", "sub_en": "Momirović Svileuva", "price": 260, "vol": "0,03 l"}, {"id": "p-momirovic-kajsija", "cat": "rakije", "sr": "Kajsija", "en": "Apricot", "sub": "Momirović Svileuva", "sub_en": "Momirović Svileuva", "price": 260, "vol": "0,03 l"}, {"id": "p-momirovic-viljamovka", "cat": "rakije", "sr": "Viljamovka", "en": "Williams pear", "sub": "Momirović Svileuva", "sub_en": "Momirović Svileuva", "price": 260, "vol": "0,03 l"}, {"id": "p-momirovic-medovaca", "cat": "rakije", "sr": "Medovača", "en": "Honey", "sub": "Momirović Svileuva", "sub_en": "Momirović Svileuva", "price": 260, "vol": "0,03 l"}, {"id": "p-momirovic-malina", "cat": "rakije", "sr": "Malina", "en": "Raspberry", "sub": "Momirović Svileuva", "sub_en": "Momirović Svileuva", "price": 260, "vol": "0,03 l"}, {"id": "p-sacera-sljiva", "cat": "rakije", "sr": "Šljiva", "en": "Plum", "sub": "Sacera", "sub_en": "Sacera", "price": 290, "vol": "0,03 l"}, {"id": "p-sacera-dunja", "cat": "rakije", "sr": "Dunja", "en": "Quince", "sub": "Sacera", "sub_en": "Sacera", "price": 290, "vol": "0,03 l"}, {"id": "p-sacera-viljamovka", "cat": "rakije", "sr": "Viljamovka", "en": "Williams pear", "sub": "Sacera", "sub_en": "Sacera", "price": 290, "vol": "0,03 l"}, {"id": "p-sacera-kajsija", "cat": "rakije", "sr": "Kajsija", "en": "Apricot", "sub": "Sacera", "sub_en": "Sacera", "price": 290, "vol": "0,03 l"}, {"id": "p-sokolova-sljiva", "cat": "rakije", "sr": "Šljiva", "en": "Plum", "sub": "Sokolova", "sub_en": "Sokolova", "price": 450, "vol": "0,03 l"}, {"id": "p-tikves-lozova", "cat": "rakije", "sr": "Lozova", "en": "Grape", "sub": "Tikveš", "sub_en": "Tikveš", "price": 280, "vol": "0,03 l"}, {"id": "p-mb-impex-meduska", "cat": "rakije", "sr": "Meduška", "en": "Meduška (honey rakija)", "sub": "MB Impex", "sub_en": "MB Impex", "price": 260, "vol": "0,03 l"}, {"id": "p-vermut", "cat": "aperitivi", "sr": "Vermut", "en": "Vermouth", "price": 260, "vol": "0,03 l"}, {"id": "p-jagermeister", "cat": "aperitivi", "sr": "Jägermeister", "price": 310, "vol": "0,03 l"}, {"id": "p-gorki-list", "cat": "aperitivi", "sr": "Gorki list", "en": "Gorki List (bitter herbal liqueur)", "price": 270, "vol": "0,05 l"}, {"id": "p-baileys", "cat": "aperitivi", "sr": "Baileys", "price": 330, "vol": "0,03 l"}, {"id": "p-martini-bianco", "cat": "aperitivi", "sr": "Martini Bianco", "price": 290, "vol": "0,05 l"}, {"id": "p-martini-rosso", "cat": "aperitivi", "sr": "Martini Rosso", "price": 290, "vol": "0,05 l"}, {"id": "p-martini-fiero", "cat": "aperitivi", "sr": "Martini Fiero", "price": 290, "vol": "0,05 l"}, {"id": "p-aperol-spritz", "cat": "aperitivi", "sr": "Aperol Spritz", "price": 560, "vol": "0,15 l"}, {"id": "p-campari", "cat": "aperitivi", "sr": "Campari", "price": 310, "vol": "0,03 l"}, {"id": "p-hennessy-v-s", "cat": "zestina", "sr": "Hennessy V.S.", "sub": "Konjak", "sub_en": "Cognac", "price": 490, "vol": "0,03 l"}, {"id": "p-johnnie-walker-red-label", "cat": "zestina", "sr": "Johnnie Walker Red Label", "sub": "Viski", "sub_en": "Whisky", "price": 310, "vol": "0,03 l"}, {"id": "p-johnnie-walker-black-label", "cat": "zestina", "sr": "Johnnie Walker Black Label", "sub": "Viski", "sub_en": "Whisky", "price": 470, "vol": "0,03 l"}, {"id": "p-jack-daniel-s", "cat": "zestina", "sr": "Jack Daniel's", "sub": "Viski", "sub_en": "Whisky", "price": 380, "vol": "0,03 l"}, {"id": "p-jack-daniel-s-honey", "cat": "zestina", "sr": "Jack Daniel's Honey", "sub": "Viski", "sub_en": "Whisky", "price": 380, "vol": "0,03 l"}, {"id": "p-gentleman-jack", "cat": "zestina", "sr": "Gentleman Jack", "sub": "Viski", "sub_en": "Whisky", "price": 520, "vol": "0,03 l"}, {"id": "p-chivas-regal", "cat": "zestina", "sr": "Chivas Regal", "sub": "Viski", "sub_en": "Whisky", "price": 460, "vol": "0,03 l"}, {"id": "p-jameson", "cat": "zestina", "sr": "Jameson", "sub": "Viski", "sub_en": "Whisky", "price": 360, "vol": "0,03 l"}, {"id": "p-tullamore-d-e-w", "cat": "zestina", "sr": "Tullamore D.E.W.", "sub": "Viski", "sub_en": "Whisky", "price": 470, "vol": "0,03 l"}, {"id": "p-monkey-shoulder", "cat": "zestina", "sr": "Monkey Shoulder", "sub": "Viski", "sub_en": "Whisky", "price": 470, "vol": "0,03 l"}, {"id": "p-glenfiddich-12", "cat": "zestina", "sr": "Glenfiddich 12", "sub": "Viski", "sub_en": "Whisky", "price": 520, "vol": "0,03 l"}, {"id": "p-smirnoff-red", "cat": "zestina", "sr": "Smirnoff Red", "sub": "Vodka", "sub_en": "Vodka", "price": 310, "vol": "0,03 l"}, {"id": "p-belvedere", "cat": "zestina", "sr": "Belvedere", "sub": "Vodka", "sub_en": "Vodka", "price": 520, "vol": "0,03 l"}, {"id": "p-beefeater", "cat": "zestina", "sr": "Beefeater", "sub": "Džin", "sub_en": "Gin", "price": 320, "vol": "0,03 l"}, {"id": "p-hendrick-s", "cat": "zestina", "sr": "Hendrick's", "sub": "Džin", "sub_en": "Gin", "price": 420, "vol": "0,03 l"}, {"id": "p-olmeca-silver", "cat": "zestina", "sr": "Olmeca Silver", "sub": "Tekila", "sub_en": "Tequila", "price": 330, "vol": "0,03 l"}, {"id": "p-olmeca-gold", "cat": "zestina", "sr": "Olmeca Gold", "sub": "Tekila", "sub_en": "Tequila", "price": 330, "vol": "0,03 l"}, {"id": "p-vinjak-5-v-s-o-p", "cat": "zestina", "sr": "Vinjak 5 V.S.O.P.", "sub": "Vinjak", "sub_en": "Brandy", "price": 310, "vol": "0,03 l"}, {"id": "p-old-pascas-white", "cat": "zestina", "sr": "Old Pascas White", "sub": "Rum", "sub_en": "Rum", "price": 340, "vol": "0,03 l"}, {"id": "p-old-pascas-dark", "cat": "zestina", "sr": "Old Pascas Dark", "sub": "Rum", "sub_en": "Rum", "price": 340, "vol": "0,03 l"}, {"id": "p-bela-voda", "cat": "vina", "sr": "Bela Voda", "sub": "Bela vina", "sub_en": "White wines", "price": 6100, "vol": "0,75 l"}, {"id": "p-benvenuti-malvazija", "cat": "vina", "sr": "Benvenuti Malvazija", "en": "Benvenuti Malvasia", "sub": "Bela vina", "sub_en": "White wines", "price": 3700, "vol": "0,75 l"}, {"id": "p-tamjanika-spasic", "cat": "vina", "sr": "Tamjanika Spasić", "sub": "Bela vina", "sub_en": "White wines", "price": 2700, "vol": "0,75 l"}, {"id": "p-zilavka-nuic", "cat": "vina", "sr": "Žilavka Nuić", "sub": "Bela vina", "sub_en": "White wines", "price": 2600, "vol": "0,75 l"}, {"id": "p-3-passo", "cat": "vina", "sr": "3 Passo", "sub": "Bela vina", "sub_en": "White wines", "price": 3200, "vol": "0,75 l"}, {"id": "p-chardonnay-radovanovic", "cat": "vina", "sr": "Chardonnay Radovanović", "sub": "Bela vina", "sub_en": "White wines", "price": 2900, "vol": "0,75 l"}, {"id": "p-rose-radovanovic", "cat": "vina", "sr": "Rose Radovanović", "en": "Radovanović Rosé", "sub": "Rose vina", "sub_en": "Rosé wines", "price": 2600, "vol": "0,75 l"}, {"id": "p-rose-let-s-go-nuic", "cat": "vina", "sr": "Rose Let's Go Nuić", "en": "Nuić Let's Go Rosé", "sub": "Rose vina", "sub_en": "Rosé wines", "price": 2600, "vol": "0,75 l"}, {"id": "p-bela-voda-crveno", "cat": "vina", "sr": "Bela Voda crveno", "en": "Bela Voda red", "sub": "Crvena vina", "sub_en": "Red wines", "price": 6100, "vol": "0,75 l"}, {"id": "p-kremen-matalj", "cat": "vina", "sr": "Kremen Matalj", "sub": "Crvena vina", "sub_en": "Red wines", "price": 3600, "vol": "0,75 l"}, {"id": "p-trianon-erdevik", "cat": "vina", "sr": "Trianon Erdevik", "sub": "Crvena vina", "sub_en": "Red wines", "price": 3400, "vol": "0,75 l"}, {"id": "p-merlot-nuic", "cat": "vina", "sr": "Merlot Nuić", "en": "Nuić Merlot", "sub": "Crvena vina", "sub_en": "Red wines", "price": 2600, "vol": "0,75 l"}, {"id": "p-filigram-merlot", "cat": "vina", "sr": "Filigram Merlot", "sub": "Crvena vina", "sub_en": "Red wines", "price": 3300, "vol": "0,75 l"}, {"id": "p-kupinovo-vino", "cat": "vina", "sr": "Kupinovo vino", "en": "Blackberry wine", "sub": "Crvena vina", "sub_en": "Red wines", "price": 410, "vol": "0,187 l"}, {"id": "p-moet-brut", "cat": "vina", "sr": "Moët Brut", "sub": "Penušava vina", "sub_en": "Sparkling wines", "price": 15000}, {"id": "p-moscato-d-asti", "cat": "vina", "sr": "Moscato d'Asti", "sub": "Penušava vina", "sub_en": "Sparkling wines", "price": 2500}, {"id": "p-cava-brut-don-roman", "cat": "vina", "sr": "Cava Brut Don Román", "sub": "Penušava vina", "sub_en": "Sparkling wines", "price": 2700}, {"id": "p-kovacevic-belo-rose-crveno", "cat": "vina", "sr": "Kovačević belo / rose / crveno", "en": "Kovačević white / rosé / red", "sub": "Vina kuće na čašu i bokal", "sub_en": "House wine by the glass and carafe", "var": [["0,15 l", 330], ["0,5 l", 950]]}]};
/* Košnica · ilustracije sastojaka za „Rastavi jelo” (inline SVG, bez spoljnih fajlova)
   KART.top(key)        — sastojak odozgo (viewBox 120×120) za uredan raspored (knoll)
   KART.layer(key, o)   — sloj u 3/4 pogledu (širina 700) za burgere, sendviče i kolače
   KART.pizza(comps)    — slojevi pice odozgo (400×400): testo, pelat, sir, dodaci
   KART.plate(key)      — ilustrovan tanjir za priloge (glavna slika kad nema fotografije)
   KART.defs()          — zajednički gradijenti (ubaciti jednom u dokument) */
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
/* =====================================================================
   KOŠNICA · TipTap Signature — gost
   Walk-in ulaz · priča · meni sa rastavljanjem jela · pića · svirke ·
   sto uživo (konobar, račun, porudžbina) · anonimna poruka · recenzija
   Podaci: window.KS (lokal, slike) · window.KS_MENU (jelovnik) · TT (tt.js)
   ===================================================================== */
(function () {
  'use strict';
  const K = window.KS, M = window.KS_MENU, TT = window.TT;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = TT.esc;
  const app = $('#app'), top = $('#top'), dock = $('#dock');
  const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } } };
  const SS = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { } } };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- jezik ---------- */
  let L = LS.get('ks_lang', null) || (qs0().get('lang') === 'en' ? 'en' : 'sr');
  function qs0() { try { return new URLSearchParams(location.search); } catch (e) { return new URLSearchParams(); } }
  const T = {
    sr: {
      tagline: 'Mesto hedonizma u srcu Šapca.', open: 'Otvoreno do', closed: 'Zatvoreno · otvaramo u', table: 'Sto', welcome: 'Dobro došli',
      q_food: 'Meni', q_drinks: 'Pića', q_book: 'Rezerviši sto', q_review: 'Oceni nas',
      tonight: 'VEČERAS', weekend: 'OVOG VIKENDA', live: 'Svirka uživo', book_table: 'Rezerviši sto', call: 'Pozovi',
      menu: 'Meni', menu_lead: 'Dodirnite kategoriju.', drinks: 'Karta pića', house: 'Preporuka kuće', split_it: 'Rastavi jelo ›',
      story: 'Naša priča', gigs: 'Svirke', contact: 'Kontakt i radno vreme', say: 'Vaše mišljenje',
      coffee_t: 'Kvalitet koji se pamti', review_t: 'Ocenite nas na Google-u', review_s: 'Dva klika — puno nam znači.',
      fb_t: 'Nešto nije bilo kako treba?', fb_s: 'Javite upravi anonimno, pre nego što odete.',
      addr: 'Karađorđeva 14, Šabac', map: 'Otvori mapu', phone: 'Pozovite nas', ig: 'Instagram', delivery: 'Dostava na kućnu adresu', delivery_s: 'Poručite preko Alidede',
      days: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'], days_s: ['NED', 'PON', 'UTO', 'SRE', 'ČET', 'PET', 'SUB'],
      split: 'Rastavi jelo', join: 'Sastavi', per: 'Okvirno po porciji', per_share: 'Okvirno za celu porciju (za deljenje)',
      nut: 'Nutritivne vrednosti', kcal: 'kcal', p: 'Proteini', c: 'Ugljeni hidrati', f: 'Masti', ri: 'Traka pokazuje udeo dnevnog unosa odrasle osobe.',
      est: 'Procena iz sastojaka. Tačne vrednosti potvrđuje kuhinja.', spice: 'Ljutina', spice_l: ['Nije ljuto', 'Blago ljuto', 'Ljuto', 'Vrlo ljuto'],
      alg: 'Alergeni', alg_none: 'Bez glavnih alergena u sastojcima', alg_note: 'Ako imate alergiju, recite konobaru — proverićemo sastav u kuhinji.',
      pair: 'Uz ovo preporučujemo', add: 'Dodaj na listu', added: 'Dodato na listu', sold: 'Trenutno nema', house_tag: 'PREPORUKA',
      ing: 'Sastojci', video: 'VIDEO', made_of: 'Od čega je napravljeno', side: 'uz jelo', with_dish: 'Uz jelo', est_s: 'procena',
      drinks_lead: 'Dodirnite cenu da dodate piće na listu.',
      dock_waiter: 'Konobar', dock_bill: 'Račun', dock_list: 'Moja lista', dock_menu: 'Meni', dock_book: 'Rezervacija', dock_drinks: 'Pića',
      w_t: 'Pozovite konobara', w_lead: 'Konobar dobija poziv sa stola {t} odmah na telefon.', w_why: ['Želim da poručim', 'Još jedno piće', 'Imam pitanje', 'Nešto drugo'], w_send: 'Pozovi konobara',
      w_wait: 'Konobar je pozvan', w_ack: 'Konobar je video poziv i dolazi', w_done: 'Hvala — konobar je stigao',
      b_t: 'Račun, molim', b_lead: 'Kako plaćate? Konobar dolazi sa računom za sto {t}.', b_card: 'Kartica', b_cash: 'Gotovina', b_send: 'Zatraži račun',
      b_wait: 'Račun je zatražen', b_ack: 'Konobar je video i donosi račun',
      l_t: 'Moja lista', l_lead: 'Sastavite porudžbinu, pa je pošaljite konobaru ili mu je pokažite.', l_empty: 'Lista je prazna. Dodajte jela iz menija.',
      l_total: 'Ukupno', l_send: 'Pošalji konobaru', l_show: 'Pokaži konobaru', l_clear: 'Obriši listu', l_notable: 'Za slanje porudžbine prislonite telefon na karticu na stolu.',
      o_wait: 'Porudžbina je poslata', o_ack: 'Konobar je video porudžbinu i dolazi da je potvrdi', o_done: 'Porudžbina je potvrđena',
      f_t: 'Anonimna poruka upravi', f_lead: 'Ne pitamo ime ni broj. Poruku čita samo uprava.', f_ph: 'Šta se desilo? Kada? (npr. čekali smo 20 min na piće)',
      f_topics: { hrana: 'Hrana', usluga: 'Usluga', pice: 'Piće', cekanje: 'Čekanje', cistoca: 'Čistoća', glazba: 'Muzika', racun: 'Račun', pohvala: 'Pohvala', ostalo: 'Ostalo' },
      f_send: 'Pošalji anonimno', f_ok: 'Hvala! Uprava je dobila poruku.', err: 'Nije uspelo. Pokušajte ponovo.', short: 'Napišite bar nekoliko reči.',
      skip: 'PRESKOČI', w1: 'Dobro došli u Košnicu', w2: 'Karađorđeva 14 · Šabac', w3: 'Mesto hedonizma', w4: 'u srcu Šapca.',
      soon_t: 'Karta pića', soon_s: 'Kompletna karta pića sa cenama stiže ovde. Do tada vas rado uslužuje konobar.',
      back: 'Nazad', from: 'od', share: 'za deljenje', ago: 'pre', min: 'min'
    },
    en: {
      tagline: 'A place of pleasure in the heart of Šabac.', open: 'Open until', closed: 'Closed · opens at', table: 'Table', welcome: 'Welcome',
      q_food: 'Menu', q_drinks: 'Drinks', q_book: 'Book a table', q_review: 'Rate us',
      tonight: 'TONIGHT', weekend: 'THIS WEEKEND', live: 'Live music', book_table: 'Book a table', call: 'Call',
      menu: 'Menu', menu_lead: 'Tap a category.', drinks: 'Drinks', house: 'House favourites', split_it: 'Take it apart ›',
      story: 'Our story', gigs: 'Live music', contact: 'Contact & opening hours', say: 'Your opinion',
      coffee_t: 'Quality you remember', review_t: 'Rate us on Google', review_s: 'Two taps — it means a lot to us.',
      fb_t: 'Something not right?', fb_s: 'Tell the management anonymously, before you leave.',
      addr: 'Karađorđeva 14, Šabac', map: 'Open map', phone: 'Call us', ig: 'Instagram', delivery: 'Home delivery', delivery_s: 'Order via Alideda',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], days_s: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      split: 'Take it apart', join: 'Put back', per: 'Approx. per portion', per_share: 'Approx. for the whole sharing portion',
      nut: 'Nutrition', kcal: 'kcal', p: 'Protein', c: 'Carbs', f: 'Fat', ri: 'Bars show the share of an adult daily intake.',
      est: 'Estimated from ingredients. Exact values are confirmed by the kitchen.', spice: 'Spiciness', spice_l: ['Not spicy', 'Mild', 'Spicy', 'Very spicy'],
      alg: 'Allergens', alg_none: 'No major allergens in the ingredients', alg_note: 'If you have an allergy, tell your waiter — we will check with the kitchen.',
      pair: 'Goes well with', add: 'Add to my list', added: 'Added to your list', sold: 'Not available now', house_tag: 'HOUSE PICK',
      ing: 'Ingredients', video: 'VIDEO', made_of: 'What it is made of', side: 'on the side', with_dish: 'On the side', est_s: 'estimate',
      drinks_lead: 'Tap a price to add a drink to your list.',
      dock_waiter: 'Waiter', dock_bill: 'Bill', dock_list: 'My list', dock_menu: 'Menu', dock_book: 'Book', dock_drinks: 'Drinks',
      w_t: 'Call the waiter', w_lead: 'Your waiter gets the call from table {t} on their phone right away.', w_why: ['I want to order', 'Another drink', 'A question', 'Something else'], w_send: 'Call the waiter',
      w_wait: 'Waiter called', w_ack: 'The waiter saw your call and is coming', w_done: 'Thanks — the waiter is here',
      b_t: 'The bill, please', b_lead: 'How will you pay? The waiter brings the bill to table {t}.', b_card: 'Card', b_cash: 'Cash', b_send: 'Ask for the bill',
      b_wait: 'Bill requested', b_ack: 'The waiter saw it and is bringing the bill',
      l_t: 'My list', l_lead: 'Build your order, then send it to the waiter or show it.', l_empty: 'Your list is empty. Add dishes from the menu.',
      l_total: 'Total', l_send: 'Send to the waiter', l_show: 'Show the waiter', l_clear: 'Clear list', l_notable: 'To send an order, tap your phone on the card on your table.',
      o_wait: 'Order sent', o_ack: 'The waiter saw your order and is coming to confirm it', o_done: 'Order confirmed',
      f_t: 'Anonymous message to the management', f_lead: 'We never ask for your name or number. Only the management reads it.', f_ph: 'What happened? When? (e.g. we waited 20 min for drinks)',
      f_topics: { hrana: 'Food', usluga: 'Service', pice: 'Drinks', cekanje: 'Waiting', cistoca: 'Cleanliness', glazba: 'Music', racun: 'Bill', pohvala: 'Praise', ostalo: 'Other' },
      f_send: 'Send anonymously', f_ok: 'Thank you! The management got your message.', err: 'That did not work. Please try again.', short: 'Please write a few words.',
      skip: 'SKIP', w1: 'Welcome to Košnica', w2: 'Karađorđeva 14 · Šabac', w3: 'A place of pleasure', w4: 'in the heart of Šabac.',
      soon_t: 'Drinks list', soon_s: 'The full drinks list with prices is coming here. Until then, your waiter will happily help.',
      back: 'Back', from: 'from', share: 'to share', ago: '', min: 'min'
    }
  };
  const t = (k, o) => { let s = (T[L] && T[L][k] != null) ? T[L][k] : T.sr[k]; if (o && typeof s === 'string') for (const [a, b] of Object.entries(o)) s = s.replace('{' + a + '}', b); return s; };
  const nm = it => (L === 'en' && it.en) ? it.en : it.sr;
  const ds = it => (L === 'en' && it.desc_en) ? it.desc_en : it.desc;
  const catName = c => L === 'en' ? c.en : c.sr;
  const lnm = it => nm(it) + (it.sub && it.cat === 'rakije' ? ' · ' + it.sub : '');
  document.documentElement.lang = L === 'en' ? 'en' : 'sr';

  /* ---------- sto (NFC / QR) ---------- */
  const qs = new URLSearchParams(location.search);
  const tq = (qs.get('sto') || qs.get('stol') || qs.get('table') || '').replace(/[^\w-]/g, '').slice(0, 8);
  if (tq) SS.set('ks_table', tq);
  const TABLE = tq || SS.get('ks_table') || '';

  /* ---------- jelovnik ---------- */
  const ITEMS = M.items, DRINKS = (window.KS_DRINKS && window.KS_DRINKS.items) || [], BY = Object.fromEntries([...ITEMS, ...DRINKS].map(x => [x.id, x])), CATS = M.cats;
  let OVR = { soldOut: {}, price: {}, tonight: null };
  const priceOf = (it, i = 0) => { const o = OVR.price && OVR.price[it.id]; if (o && o[i] != null) return o[i]; return it.var ? it.var[i][1] : it.price; };
  const soldOut = it => !!(OVR.soldOut && OVR.soldOut[it.id]);
  const money = v => v == null ? '' : `${Math.round(v)} RSD`;
  const priceTxt = it => { if (it.price == null && !it.var) return ''; if (it.var) return (it.var.length > 1 ? t('from') + ' ' : '') + money(Math.min(...it.var.map((_, i) => priceOf(it, i)))); return money(priceOf(it)); };

  /* ---------- slike: lokalna kopija, pa izvor (Košnica / Alideda) ---------- */
  const srcs = key => { const s = K.img[key]; return !s ? [] : Array.isArray(s) ? s : [s]; };
  const dishSrcs = (it, v) => (v != null && it.vimg && it.vimg[v] && srcs('d:' + it.vimg[v]).length ? srcs('d:' + it.vimg[v]) : srcs('d:' + (it.img || it.id)));
  function dishPic(it, cls = '', eager) {
    const list = dishSrcs(it, 0);
    return list.length ? pic(list, 'cut ' + cls, eager) : `<div class="ph art ${cls}">${KART.plate(it.id)}</div>`;
  }
  function pic(list, cls = '', eager) {
    if (!list.length) return `<div class="ph noimg ${cls}"></div>`;
    return `<div class="ph ${cls}"><img alt="" ${eager ? '' : 'loading="lazy"'} decoding="async" referrerpolicy="no-referrer" data-s="${esc(list.join('|'))}" src="${esc(list[0])}"></div>`;
  }
  function wireImgs(root) {
    $$('img[data-s]', root).forEach(img => {
      if (img.dataset.w) return; img.dataset.w = 1;
      const list = img.dataset.s.split('|'); let i = 0;
      const ok = () => img.classList.add('ok');
      img.addEventListener('load', ok); if (img.complete && img.naturalWidth) ok();
      img.addEventListener('error', () => { i++; if (i < list.length) img.src = list[i]; else img.parentElement.classList.add('noimg'); });
    });
  }

  /* ---------- ikone ---------- */
  const I = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16M5 11a7 7 0 0 1 14 0M3 15h18M6 15l1 4h10l1-4"/></svg>',
    glass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10l-1 8a4 4 0 0 1-8 0zM12 15v6M8 21h8M7.4 7h9.2"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 17h12l-1.6-2.3V10a4.4 4.4 0 0 0-8.8 0v4.7z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    bill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="18" r="1.2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>',
    bike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l3.5-7H15l3 7M9.5 10 8 7H5.5M15 10l-1.5-3H16"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    msg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h4"/></svg>',
    cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9v.01M18 15v.01"/></svg>',
    split: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M6 11.5h12M4 16h16"/><path d="M9 3.5 12 1l3 2.5M9 20.5l3 2.5 3-2.5"/></svg>',
    chili: on => `<svg viewBox="0 0 32 32" class="${on ? '' : 'off'}"><path d="M20 7c2-4 6-4 7-2" stroke="#4d9a35" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M20 8c8 3 5 14-3 19-6 4-13 2-12-1 8-2 10-9 12-15 .6-2 1.6-3.2 3-3z" fill="#e5533a"/><path d="M18 12c-1 5-4 10-8 12" stroke="#ff9a80" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/></svg>`,
    hex: '<svg viewBox="0 0 30 34" fill="none"><path d="M15 1.5 28 9v16l-13 7.5L2 25V9z" stroke="currentColor" stroke-width="2"/><path d="M15 9.5 21.5 13v8L15 24.5 8.5 21v-8z" fill="currentColor" opacity=".9"/></svg>'
  };

  /* ---------- statistika (otvaranje, pregledi jela, recenzija, rezervacija) ---------- */
  let HQ = [], HT = null;
  const hit = (tp, o) => { HQ.push(Object.assign({ t: tp }, o || {})); clearTimeout(HT); HT = setTimeout(() => { const ev = HQ.splice(0); TT.api('/hit', { body: { ev }, quiet: true, fast: true }).catch(() => { }); }, 1500); };

  /* ---------- vreme, radno vreme, svirke ---------- */
  const toMin = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  function openState() {
    const n = TT.now(), wd = TT.wd(n.date), H = K.hours;
    const y = H[(wd + 6) % 7]; if (y) { const a = toMin(y[0]), b = toMin(y[1]); if (b <= a && n.min < b) return { open: true, until: y[1] }; }
    const h = H[wd]; if (h) { const a = toMin(h[0]); let b = toMin(h[1]); if (b <= a) b += 1440; if (n.min >= a && n.min < b) return { open: true, until: h[1] }; if (n.min < a) return { open: false, at: h[0] }; }
    const nx = H[(wd + 1) % 7]; return { open: false, at: nx ? nx[0] : '' };
  }
  function gigNow() {
    const b = TT.biz(), wd = TT.wd(b.date);
    const today = K.gigs.find(g => g.wd === wd);
    if (today && b.min < toMin(today.to) + 1440) return { g: today, tonight: true };
    for (let i = 1; i < 7; i++) { const g = K.gigs.find(x => x.wd === (wd + i) % 7); if (g) return { g, tonight: false }; }
    return null;
  }

  /* ---------- moja lista ---------- */
  let LIST = LS.get('ks_list', []).filter(x => BY[x.id]);
  const saveList = () => { LS.set('ks_list', LIST); paintDock(); };
  const listCount = () => LIST.reduce((a, x) => a + x.q, 0);
  const listTotal = () => LIST.reduce((a, x) => a + x.q * (priceOf(BY[x.id], x.v) || 0), 0);
  function addToList(id, v = 0, q = 1) {
    const it = BY[id]; if (!it || soldOut(it)) return;
    const x = LIST.find(y => y.id === id && y.v === v); if (x) x.q = Math.min(20, x.q + q); else LIST.push({ id, v, q });
    saveList(); toast(`${t('added')} · ${lnm(it)}`); TT.buzz(12);
    const b = $('#dock [data-a=list]'); if (b && b.animate && !reduced) b.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'cubic-bezier(.2,1.4,.3,1)' });
  }

  /* ---------- toast ---------- */
  let toEl = null, toT = null;
  function toast(msg, ms = 2400) {
    if (!toEl) { toEl = document.createElement('div'); toEl.className = 'toast'; toEl.setAttribute('role', 'status'); document.body.appendChild(toEl); }
    toEl.textContent = msg; toEl.classList.remove('on'); requestAnimationFrame(() => requestAnimationFrame(() => toEl.classList.add('on')));
    clearTimeout(toT); toT = setTimeout(() => toEl.classList.remove('on'), ms);
  }

  /* =====================================================================
     VIEWS
     ===================================================================== */
  const catImg = c => srcs('c:' + c);
  function home() {
    const os = openState(), gn = gigNow();
    const tonightTxt = OVR.tonight && OVR.tonight.txt ? OVR.tonight.txt : null;
    const sig = ITEMS.filter(x => x.sig && !soldOut(x));
    const now = TT.now(), wd = TT.wd(now.date);
    let h = `<section class="hero">${pic(srcs('hero'), '', true)}<div class="in">
      ${K.logo && K.logo.length ? `<img class="logo" alt="Košnica" src="${esc(K.logo[0])}" data-s="${esc(K.logo.join('|'))}" referrerpolicy="no-referrer">` : ''}
      <h1>Košnica</h1><p class="sub">${esc(t('tagline'))}</p>
      <div class="meta"><span class="pill${os.open ? '' : ' off'}"><i></i>${os.open ? `${t('open')} ${os.until}` : `${t('closed')} ${os.at}`}</span>${TABLE ? `<span class="pill hn">${t('table')} ${esc(TABLE)} · ${t('welcome')}</span>` : ''}</div>
    </div></section>
    <div class="wrap">
      <nav class="quick">
        <a href="#/meni">${I.menu}${t('q_food')}</a><a href="#/pica">${I.glass}${t('q_drinks')}</a>
        <a href="${esc(rezUrl())}" data-hit="book">${I.cal}${t('q_book')}</a><a href="${esc(K.review)}" target="_blank" rel="noopener" data-hit="review">${I.star}${t('q_review')}</a>
      </nav>`;
    if (gn || tonightTxt) {
      const g = gn && gn.g;
      h += `<section class="sec"><div class="tonight"><small>${gn && gn.tonight || tonightTxt ? t('tonight') : t('weekend')}</small>
        <b>${esc(tonightTxt || (g ? g.name : ''))}</b><span>${g ? `${t('days')[g.wd]} · ${g.from}–${g.to} · ${t('live')}` : ''}</span>
        <div class="row"><a class="btn sm" href="${esc(rezUrl())}" data-hit="book">${I.cal}${t('book_table')}</a><a class="btn sm gh" href="tel:${esc(K.gigPhone)}">${I.phone}${esc(K.gigPhoneTxt)}</a></div></div></section>`;
    }
    h += `<section class="sec" id="meni"><h2>${t('menu')}</h2><p class="lead">${t('menu_lead')}</p><div class="comb">`;
    const RIM = '<svg class="rim" viewBox="0 0 100 115.47" preserveAspectRatio="none" aria-hidden="true"><path d="M50 1.2 98.8 29.4v56.7L50 114.3 1.2 86.1V29.4z"/></svg>';
    for (const c of CATS) h += `<a href="#/meni/${c.id}" aria-label="${esc(catName(c))}"><div class="hex">${pic(catImg(c.id), '')}</div>${RIM}<span class="lb">${esc(catName(c))}</span></a>`;
    h += `<a href="#/pica" class="drink" aria-label="${esc(t('drinks'))}"><div class="hex">${pic(srcs('c:pica-karta'), '')}</div>${RIM}<span class="lb">${esc(t('drinks'))}</span></a></div></section>`;
    if (sig.length) {
      h += `<section class="sec"><h2>${t('house')}</h2><div class="rail">`;
      for (const it of sig) h += `<a href="#/jelo/${it.id}">${dishPic(it)}<div class="tx"><b>${esc(nm(it))}</b><span>${esc((L === 'en' ? it.story_en : it.story) || ds(it))}</span><em>${I.split.replace('<svg', '<svg width="16" height="16"')}${t('split_it')}</em></div></a>`;
      h += `</div></section>`;
    }
    const S = K.story[L === 'en' ? 'en' : 'sr'];
    h += `<section class="sec"><h2>${t('story')}</h2><div class="story">${pic(srcs('story1'))}${S.map(p => `<p>${esc(p)}</p>`).join('')}<div class="duo">${pic(srcs('story2'))}${pic(srcs('story3'))}</div>
      <div class="coffee">${pic(srcs('coffee'))}<div><b>${t('coffee_t')}</b><span>${esc(K.coffee[L === 'en' ? 'en' : 'sr'])}</span></div></div></div></section>`;
    h += `<section class="sec"><h2>${t('gigs')}</h2><div class="gigs">${K.gigs.map(g => `<div class="gig${g.img ? ' poster' : ''}">${g.img ? pic(srcs(g.img), 'pst') : ''}<div class="d">${t('days_s')[g.wd]}<b>${g.from.slice(0, 2)}h</b></div><div><strong>${esc(g.name)}</strong><span>${t('days')[g.wd]} · ${g.from}–${g.to}</span></div></div>`).join('')}</div></section>`;
    h += `<section class="sec"><h2>${t('contact')}</h2><div class="info">
      <a href="${esc(K.map)}" target="_blank" rel="noopener">${I.pin}<span><b>${t('addr')}</b><small>${t('map')}</small></span><span class="go">›</span></a>
      <a href="tel:${esc(K.phone)}">${I.phone}<span><b>${esc(K.phoneTxt)}</b><small>${t('phone')}</small></span><span class="go">›</span></a>
      <div class="r">${I.clock}<table class="hours">${[1, 2, 3, 4, 5, 6, 0].map(d => `<tr${d === wd ? ' class="now"' : ''}><td>${t('days')[d]}</td><td>${K.hours[d] ? K.hours[d][0] + ' – ' + K.hours[d][1] : '—'}</td></tr>`).join('')}</table></div>
      <a href="${esc(K.ig)}" target="_blank" rel="noopener">${I.ig}<span><b>@kosnicagastropub</b><small>${t('ig')}</small></span><span class="go">›</span></a>
      <a href="${esc(K.delivery)}" target="_blank" rel="noopener">${I.bike}<span><b>${t('delivery')}</b><small>${t('delivery_s')}</small></span><span class="go">›</span></a></div></section>`;
    h += `<section class="sec"><h2>${t('say')}</h2><div class="say">
      <a href="${esc(K.review)}" target="_blank" rel="noopener" data-hit="review"><span class="ic">${I.star}</span><span><b>${t('review_t')}</b><small>${t('review_s')}</small></span></a>
      <button type="button" data-a="fb"><span class="ic">${I.msg}</span><span><b>${t('fb_t')}</b><small>${t('fb_s')}</small></span></button></div></section>
      <footer class="foot">Košnica Gastro Pub · ${t('addr')}<br><b>TipTap Signature</b></footer></div>`;
    return { html: h, title: 'Košnica', solidAt: 280 };
  }

  function catView(cid) {
    const c = CATS.find(x => x.id === cid) || CATS[0];
    const its = ITEMS.filter(x => x.cat === c.id);
    let h = `<section class="cathead">${pic(catImg(c.id), '', true)}<div class="in"><h1>${esc(catName(c))}</h1>${(L === 'en' ? c.note_en : c.note) ? `<p>${esc(L === 'en' ? c.note_en : c.note)}</p>` : ''}</div></section>
      <div class="wrap"><nav class="chips" aria-label="${esc(t('menu'))}">${CATS.map(x => `<a href="#/meni/${x.id}"${x.id === c.id ? ' class="on" aria-current="true"' : ''}>${esc(catName(x))}</a>`).join('')}<a href="#/pica">${esc(t('drinks'))}</a></nav><div class="list">`;
    for (const it of its) {
      const so = soldOut(it);
      h += `<a class="dish${so ? ' sold' : ''}" href="#/jelo/${it.id}">${dishPic(it)}<span class="tx"><b>${esc(nm(it))}</b>${ds(it) ? `<span class="ds">${esc(ds(it))}</span>` : ''}
        <span class="ft">${so ? `<span class="sx">${t('sold')}</span>` : `<span class="pr">${priceTxt(it)}</span>`}${it.spice ? `<span class="hot" aria-label="${esc(t('spice_l')[it.spice])}">${'🌶'.repeat(it.spice)}</span>` : ''}${it.sig ? `<span class="tag">${t('house_tag')}</span>` : ''}${it.size && !it.var ? `<span class="tag">${esc(it.size)}</span>` : ''}</span></span></a>`;
    }
    h += `</div><div style="height:120px"></div></div>`;
    return { html: h, title: catName(c), solidAt: 170, after: () => { const on = $('.chips .on'); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' }); } };
  }

  let curVar = 0, curQty = 1, XR = null;
  const curComps = it => it.vc ? it.vc[curVar].comps : (it.comps || []);
  const curNut = it => it.vc ? it.vc[curVar].nut : it.nut;
  const curAl = it => it.vc ? it.vc[curVar].al : it.al;
  const cnm = c => L === 'en' ? c.en : c.sr;
  const nf = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const GC = { meso: '#d0683e', riba: '#8fbad3', sir: '#f2d489', povrce: '#93c46a', testo: '#d9b98a', sos: '#f2a93b', slatko: '#ec9cb4', voce: '#df5d6e' };
  const varName = (it, i) => L === 'en' && it.var_en ? it.var_en[i] : it.var[i][0];

  function nutBoxes(it) {
    const n = curNut(it), al = curAl(it) || [], share = !!it.share, RI = { p: 50, c: 260, f: 70 };
    const bar = k => `<div class="macro"><span>${t(k)}</span><s><i data-w="${Math.min(100, Math.round(n[k] / RI[k] * 100))}"></i></s><em>${n[k]} g</em></div>`;
    return `<div class="box"><h3>${t('nut')}<small>${share ? t('per_share') : t('per')}</small></h3>
        <div class="kcal"><b>${nf(n.kcal)}</b><span>${t('kcal')}</span></div>${bar('p')}${bar('c')}${bar('f')}<p class="fine">${t('ri')} ${t('est')}</p></div>
      <div class="box"><h3>${t('spice')}</h3><div class="spice">${[1, 2, 3].map(k => I.chili(k <= (it.spice || 0))).join('')}<span>${t('spice_l')[it.spice || 0]}</span></div></div>
      <div class="box"><h3>${t('alg')}</h3><div class="algs${al.length ? '' : ' none'}">${al.length ? al.map(a => `<span>${esc(M.al[a][L === 'en' ? 1 : 0])}</span>`).join('') : `<span>${t('alg_none')}</span>`}</div><p class="fine">${t('alg_note')}</p></div>`;
  }
  const growBars = root => $$('.macro i', root).forEach(x => requestAnimationFrame(() => requestAnimationFrame(() => { x.style.width = x.dataset.w + '%'; })));

  function dishView(id) {
    const it = BY[id]; if (!it || !it.comps) return catView(CATS[0].id);
    curVar = 0; curQty = 1; XR = null;
    const share = !!it.share, pairs = (it.pair || []).map(p => BY[p]).filter(Boolean), canSplit = curComps(it).length > 1;
    let h = `<div class="dv"><section class="stage" id="stage" data-mode="${it.mode}"><div class="glow"></div>${dishPic(it, '', true)}<div class="xr" id="xr"></div>
      ${canSplit ? `<button type="button" class="split" id="splitBtn" aria-pressed="false" aria-controls="xr">${I.split}<span>${t('split')}</span></button>` : ''}</section>
      <div class="wrap dinfo"><h1>${esc(nm(it))}</h1>${it.size ? `<div class="size">${esc(it.size)}${share ? ' · ' + t('share') : ''}</div>` : share ? `<div class="size">${t('share')}</div>` : ''}
      ${(L === 'en' ? it.story_en : it.story) ? `<p class="tale">${esc(L === 'en' ? it.story_en : it.story)}</p>` : ''}
      ${ds(it) ? `<p class="desc">${esc(ds(it))}</p>` : ''}
      ${it.var ? `<div class="vars" role="radiogroup" aria-label="${esc(nm(it))}">${it.var.map((v, i) => `<button type="button" role="radio" aria-checked="${i === 0}" class="${i === 0 ? 'on' : ''}" data-v="${i}">${esc(varName(it, i))}<b>${money(priceOf(it, i))}</b></button>`).join('')}</div>`
        : priceOf(it) != null ? `<div class="price1">${money(priceOf(it))}</div>` : ''}
      ${soldOut(it) ? `<p class="fine" style="color:var(--ember);font-weight:800">${t('sold')}</p>` : ''}
      <div id="nutbox">${nutBoxes(it)}</div>
      ${pairs.length ? `<div class="box"><h3>${t('pair')}</h3><div class="pairs">${pairs.map(p => `<div class="pair">${dishPic(p)}<a href="#/jelo/${p.id}"><b>${esc(nm(p))}</b><small>${priceTxt(p)}</small></a><button type="button" class="add" data-add="${p.id}" aria-label="${esc(t('add'))}: ${esc(nm(p))}">${I.plus}</button></div>`).join('')}</div></div>` : ''}
      <div style="height:${TABLE ? 190 : 120}px"></div></div>
      ${(priceOf(it) != null || it.var) && !soldOut(it) ? `<div class="dbar" id="dbar"><div class="qty"><button type="button" data-q="-1" aria-label="−">−</button><span id="qn">1</span><button type="button" data-q="1" aria-label="+">+</button></div><button type="button" class="btn" id="addBtn">${I.list}<span>${t('add')} · <span id="addP">${money(priceOf(it))}</span></span></button></div>` : ''}</div>`;
    return {
      html: h, title: nm(it), solidAt: Math.max(200, Math.min(innerHeight * .66, 600) - 90), dish: true,
      after: () => {
        hit('view', { id: it.id, name: it.sr });
        const st = $('#stage'), btn = $('#splitBtn');
        if (btn) {
          btn.addEventListener('click', () => toggleXR(st, btn, it));
          if (!reduced && !SS.get('ks_split_seen')) setTimeout(() => { if (st.isConnected && !st.classList.contains('open') && imgReady(st)) { toggleXR(st, btn, it); SS.set('ks_split_seen', '1'); } }, 1500);
        }
        growBars(app);
        $$('.vars button').forEach(b => b.addEventListener('click', () => {
          if (curVar === +b.dataset.v) return;
          curVar = +b.dataset.v; $$('.vars button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); });
          paintAdd(it); const nb = $('#nutbox'); nb.innerHTML = nutBoxes(it); growBars(nb);
          if (it.vimg) swapPhoto(st, it);
          if (st.classList.contains('open')) openXR(st, it, true);
        }));
        $$('#dbar [data-q]').forEach(b => b.addEventListener('click', () => { curQty = Math.max(1, Math.min(20, curQty + +b.dataset.q)); $('#qn').textContent = curQty; paintAdd(it); }));
        const ab = $('#addBtn'); if (ab) ab.addEventListener('click', () => addToList(it.id, curVar, curQty));
        probeVideo(it, st);
      }
    };
  }
  const paintAdd = it => { const p = $('#addP'); if (p) p.textContent = money(priceOf(it, curVar) * curQty); };
  const imgReady = st => { const im = $('.ph img', st); return !im || (im.complete && im.naturalWidth > 0); };
  function swapPhoto(st, it) {
    const ph = $('.ph', st), im = ph && $('img', ph), list = dishSrcs(it, curVar); if (!im || !list.length || im.getAttribute('src') === list[0]) return;
    const nu = new Image(); nu.onload = () => { im.style.opacity = 0; setTimeout(() => { im.src = list[0]; im.style.opacity = ''; }, 220); }; nu.src = list[0];
  }

  /* =====================================================================
     RASTAVI JELO — ilustracije sastojaka iz web/art.js (KART)
     knoll: sastojci se slože u uredan raspored · stack: slojevi burgera/sendviča/kolača
     pizza: slojevi pice (testo, pelat, sir, dodaci)
     ===================================================================== */
  function imgRect(st) { // stvarni pravougaonik jela (object-fit: contain), u koordinatama pozornice
    const ph = $('.ph', st), sr = st.getBoundingClientRect(), b = ph.getBoundingClientRect();
    const el = $('video.ok', ph) || $('img', ph) || $('svg', ph); let nw = 1, nh = 1;
    if (el && el.tagName === 'IMG' && el.naturalWidth) { nw = el.naturalWidth; nh = el.naturalHeight; } else if (el && el.tagName === 'VIDEO') { nw = el.videoWidth || 9; nh = el.videoHeight || 16; }
    const k = Math.min(b.width / nw, b.height / nh), w = nw * k, h = nh * k;
    return { x: b.left - sr.left + (b.width - w) / 2, y: b.top - sr.top + (b.height - h) / 2, w, h, bx: b.left - sr.left, by: b.top - sr.top };
  }
  // pomeri fotografiju tako da centar jela dođe u (cx, cy) uz razmeru s
  const moveTo = (pr, cx, cy, s) => ({ tx: cx - pr.bx - s * (pr.x + pr.w / 2 - pr.bx), ty: cy - pr.by - s * (pr.y + pr.h / 2 - pr.by), s });
  const totLine = (it, y) => `<div class="xr-tot" style="top:${y}px">≈ ${nf(curNut(it).kcal)} kcal · ${t('est_s')}</div>`;
  function placeLabels(lbs, want, gap = 7) { // want = željeni centri; vraća vrhove i tačke vezivanja
    const hs = lbs.map(e => e.offsetHeight || 34), tops = []; let prev = -1e9;
    want.forEach((w, i) => { const tp = Math.max(w - Math.min(hs[i] / 2, 18), prev + gap); tops.push(tp); prev = tp + hs[i]; });
    return { tops, anchors: tops.map((tp, i) => tp + Math.min(hs[i] / 2, 18)), bottom: prev };
  }
  const lab = (c, x, y, w) => `<div class="lb" style="left:${f1(x)}px;top:${f1(y)}px;width:${f1(w)}px;--gc:${GC[c.grp] || '#f2a93b'}"><b>${esc(cnm(c))}</b><small>${c.g} g · ${c.kcal} kcal${c.side ? ' · ' + t('side') : ''}</small></div>`;
  const f1 = n => Math.round(n * 10) / 10;
  const D_ = () => reduced ? 0 : 1;

  function toggleXR(st, btn, it) {
    const open = !st.classList.contains('open');
    btn.setAttribute('aria-pressed', open); btn.querySelector('span').textContent = open ? t('join') : t('split');
    if (open) { openXR(st, it); hit('split', { id: it.id }); } else closeXR(st);
  }
  function openXR(st, it, instant) {
    const xr = $('#xr', st), ph = $('.ph', st), W = st.clientWidth;
    if (!st._h0) st._h0 = st.offsetHeight;
    ph.style.transition = 'none'; ph.style.transform = ''; ph.style.opacity = ''; void ph.offsetWidth; ph.style.transition = '';
    const pr = imgRect(st), comps = curComps(it);
    const B = it.mode === 'pizza' ? buildPizza : (it.mode === 'stack' || it.mode === 'cake') ? buildStack : null;
    let r;
    if (B) { r = B(xr, it, comps, W, pr, 124); if (r.H < st._h0 - 30) r = B(xr, it, comps, W, pr, 124 + (st._h0 - r.H) / 2); }
    else r = buildKnoll(xr, it, comps, W, pr);
    XR = r; st.classList.add('open');
    st.style.height = Math.max(st._h0, r.H) + 'px';
    ph.style.transformOrigin = '0 0'; ph.style.transform = `translate(${f1(r.photo.tx)}px,${f1(r.photo.ty)}px) scale(${r.photo.s.toFixed(3)})`; ph.style.opacity = r.photo.op;
    requestAnimationFrame(() => r.play(instant));
  }
  function closeXR(st) {
    const ph = $('.ph', st), xr = $('#xr', st);
    st.classList.remove('open'); if (XR && XR.back) XR.back();
    setTimeout(() => { ph.style.transform = ''; ph.style.opacity = ''; }, XR && XR.delay ? XR.delay : 0);
    st.style.height = st._h0 + 'px';
    setTimeout(() => { if (!st.classList.contains('open')) { xr.innerHTML = ''; st.style.height = ''; } }, 900);
  }

  /* ---------- knoll: uredan raspored sastojaka ---------- */
  function buildKnoll(xr, it, comps, W, pr) {
    const n = comps.length, cols = W >= 440 ? 4 : 3, pad = 14, gap = 8, cw = (W - pad * 2 - gap * (cols - 1)) / cols, ch = Math.round(cw * .62 + 64);
    const top0 = 76, phH = Math.min(168, W * .4), gridY = top0 + phH + 22, rows = Math.ceil(n / cols), H = gridY + rows * (ch + gap) + 70;
    const s = Math.min(W * .62 / pr.w, phH / pr.h), cx = W / 2, cy = top0 + phH / 2;
    xr.innerHTML = `<div class="xr-cap" style="top:${f1(gridY - 30)}px">${t('made_of')}</div>` + comps.map((c, i) => `<div class="kn" style="--gc:${GC[c.grp] || '#f2a93b'};width:${f1(cw)}px;height:${ch}px"><div class="sp">${KART.top(c.a, i)}</div><b>${esc(cnm(c))}</b><small>${c.g} g · ${c.kcal} kcal</small>${c.side ? `<em>${t('side')}</em>` : ''}</div>`).join('') + totLine(it, H - 56);
    const cells = $$('.kn', xr), cap = $('.xr-cap', xr), tot = $('.xr-tot', xr);
    const pos = comps.map((c, i) => { const row = Math.floor(i / cols), col = i % cols, inRow = Math.min(cols, n - row * cols), off = (cols - inRow) * (cw + gap) / 2; return [pad + off + col * (cw + gap), gridY + row * (ch + gap)]; });
    const ox = pr.x + pr.w / 2 - cw / 2, oy = pr.y + pr.h / 2 - ch / 2;   // iz centra jela na fotografiji
    cells.forEach((el, i) => { el.style.transition = 'none'; el.style.opacity = 0; el.style.transform = `translate(${f1(ox)}px,${f1(oy)}px) scale(.28) rotate(${(i % 2 ? 1 : -1) * (14 + (i * 23) % 26)}deg)`; });
    return {
      H, photo: Object.assign(moveTo(pr, cx, cy, s), { op: 1 }), delay: 120,
      play(instant) {
        void xr.offsetWidth; const D = instant ? 0 : D_();
        cells.forEach((el, i) => { el.style.transition = ''; el.style.transitionDelay = (D ? 180 + i * 55 : 0) + 'ms'; el.style.opacity = 1; el.style.transform = `translate(${f1(pos[i][0])}px,${f1(pos[i][1])}px)`; });
        [cap, tot].forEach(e => { e.style.transitionDelay = (D ? 300 + n * 55 : 0) + 'ms'; e.classList.add('on'); });
      },
      back() { cap.classList.remove('on'); tot.classList.remove('on'); cells.forEach((el, i) => { el.style.transitionDelay = (i * 18) + 'ms'; el.style.opacity = 0; el.style.transform = `translate(${f1(ox)}px,${f1(oy)}px) scale(.28)`; }); }
    };
  }

  /* ---------- stack: slojevi (burger, sendvič, kolač) ---------- */
  function buildStack(xr, it, comps, W, pr, top0 = 124) {
    const cake = it.mode === 'cake', main = comps.filter(c => !c.side), sides = comps.filter(c => c.side);
    const shape = cake ? (it.id === 'karamel-badem' ? 'cube' : 'wedge') : (/sendvic/.test(it.id) ? 'square' : 'round');
    const Wl = Math.min(W * (cake ? .52 : .5), cake ? 270 : 250), s = Wl / 700, x0 = 14;
    const Ls = main.map((c, i) => { const o = cake ? KART.cake(c.a, shape) : KART.layer(c.a, { pos: i === 0 ? 'top' : i === main.length - 1 ? 'bottom' : 'mid', shape, seed: i }); return { c, o, h: o.h * s }; });
    // sklopljeno: svaki sledeći sloj leži na dnu prethodnog
    const as = [0]; for (let i = 1; i < Ls.length; i++) { const p = Ls[i - 1].o, q = Ls[i].o; as.push(as[i - 1] + (cake ? (p.t || 40) : (p.b - q.c - 6)) * s); }
    const asH = as[as.length - 1] + Ls[Ls.length - 1].h;
    // rastavljeno: bez preklapanja, sa razmakom
    const gp = cake ? 16 : 12, ex = [top0]; for (let i = 1; i < Ls.length; i++) { const p = Ls[i - 1].o, q = Ls[i].o; ex.push(ex[i - 1] + (p.b - (q.top || 0)) * s + gp); }
    const exEnd = ex[ex.length - 1] + Ls[Ls.length - 1].h;
    const asTop = top0 + Math.max(0, (Math.min(exEnd - top0, 420) - asH) / 2); const asY = as.map(y => asTop + y);
    // natpisi desno, poravnati sa centrom gornje površine sloja
    const lx = x0 + Wl + 26, lw = W - lx - 10; const cyL = (i, base) => base[i] + Ls[i].o.c * s;
    xr.innerHTML = Ls.map(l => lab(l.c, lx, 0, lw)).join('');
    const LP = placeLabels($$('.lb', xr), Ls.map((l, i) => cyL(i, ex)));
    const sideY = Math.max(exEnd, LP.bottom + 10) + 16; let H = sideY + (sides.length ? 150 : 0) + 64;
    let hh = Ls.map((l, i) => `<div class="ly" style="width:${f1(Wl)}px;left:${x0}px;z-index:${60 - i}">${l.o.svg}</div>`).join('');
    hh += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${Ls.map((l, i) => { const y0 = cyL(i, ex), x1 = x0 + Wl * (cake ? .86 : .9), y1 = LP.anchors[i]; return `<path d="M${f1(x1)} ${f1(y0)}C${f1(lx - 16)} ${f1(y0)} ${f1(lx - 22)} ${f1(y1)} ${f1(lx - 6)} ${f1(y1)}"/><circle cx="${f1(x1)}" cy="${f1(y0)}" r="2.6"/>`; }).join('')}</svg>`;
    hh += Ls.map((l, i) => lab(l.c, lx, LP.tops[i], lw)).join('');
    if (sides.length) hh += `<div class="sides" style="top:${f1(sideY)}px"><span>${t('with_dish')}</span><div>${sides.map((c, i) => `<div class="sd"><div class="sp">${KART.top(c.a, 40 + i)}</div><b>${esc(cnm(c))}</b><small>${c.g} g · ${c.kcal} kcal</small></div>`).join('')}</div></div>`;
    const dipH = Wl * .44;
    if ((it.deco || []).includes('dipper')) hh += `<div class="dip" style="left:${f1(x0 + Wl * .5 - dipH * .09)}px;width:${f1(dipH * .19)}px;height:${f1(dipH)}px">${KART.dipper()}</div>`;
    hh += totLine(it, H - 56);
    xr.innerHTML = hh;
    const lys = $$('.ly', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), sd = $('.sides', xr), dip = $('.dip', xr), tot = $('.xr-tot', xr);
    if (sd) { H = sideY + sd.offsetHeight + 70; tot.style.top = (H - 52) + 'px'; }
    lys.forEach((el, i) => { el.style.transition = 'none'; el.style.opacity = 0; el.style.transform = `translateY(${f1(asY[i])}px)`; });
    if (dip) { dip.style.transition = 'none'; dip.style.opacity = 0; dip.style.transform = `translateY(${f1(asY[0] + Ls[0].h * .55 - dipH)}px)`; }
    const cxA = x0 + Wl / 2, cyA = asTop + asH / 2, sc = Math.min(1, Wl * 1.25 / pr.w);
    return {
      H, photo: Object.assign(moveTo(pr, cxA, cyA, sc), { op: 0 }), delay: 380,
      play(instant) {
        void xr.offsetWidth; const D = instant ? 0 : D_();
        lys.forEach(el => { el.style.transition = 'opacity .35s'; el.style.opacity = 1; });
        if (dip) { dip.style.transition = 'opacity .35s'; dip.style.opacity = 1; }
        setTimeout(() => {
          lys.forEach((el, i) => { el.style.transition = ''; el.style.transitionDelay = (D ? i * 45 : 0) + 'ms'; el.style.transform = `translateY(${f1(ex[i])}px)`; });
          if (dip) { dip.style.transition = ''; dip.style.transform = `translateY(${f1(ex[0] - dipH * .9)}px)`; dip.style.opacity = 0; }
          lbs.forEach((el, i) => { el.style.transitionDelay = (D ? 260 + i * 55 : 0) + 'ms'; el.classList.add('on'); });
          paths.forEach((p, i) => { p.style.transitionDelay = (D ? 300 + Math.floor(i / 2) * 55 : 0) + 'ms'; p.classList.add('on'); });
          if (sd) { sd.style.transitionDelay = (D ? 420 + lbs.length * 55 : 0) + 'ms'; sd.classList.add('on'); }
          tot.style.transitionDelay = (D ? 500 + lbs.length * 55 : 0) + 'ms'; tot.classList.add('on');
        }, D ? 480 : 0);
      },
      back() {
        lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); });
        if (sd) { sd.style.transitionDelay = '0ms'; sd.classList.remove('on'); } tot.classList.remove('on');
        lys.forEach((el, i) => { el.style.transitionDelay = (i * 25) + 'ms'; el.style.transform = `translateY(${f1(asY[i])}px)`; });
        if (dip) { dip.style.transform = `translateY(${f1(asY[0] + Ls[0].h * .55 - dipH)}px)`; dip.style.opacity = 1; }
        setTimeout(() => { lys.forEach(el => { el.style.transition = 'opacity .3s'; el.style.opacity = 0; }); if (dip) dip.style.opacity = 0; }, 420);
      }
    };
  }

  /* ---------- pizza: slojevi odozgo pa u kosoj perspektivi ---------- */
  function buildPizza(xr, it, comps, W, pr, top0 = 124) {
    const ls = KART.pizza(comps), n = ls.length, D = Math.min(W * .54, 236), x0 = 12, gap = Math.max(38, Math.min(50, 400 / n)), k = .5;
    const cyE = ls.map((l, i) => top0 + D * k / 2 + (n - 1 - i) * gap);          // najviši dodatak na vrhu
    const exEnd = cyE[0] + D * k / 2 + 18;
    const lx = x0 + D + 24, lw = W - lx - 10;
    xr.innerHTML = ls.map(l => lab(l.c, lx, 0, lw)).join('');
    const order = ls.map((l, i) => n - 1 - i);                 // natpisi odozgo: najviši sloj prvi
    const LPo = placeLabels(order.map(i => $$('.lb', xr)[i]), order.map(i => cyE[i]));
    const ly = [], lt = []; order.forEach((i, j) => { ly[i] = LPo.anchors[j]; lt[i] = LPo.tops[j]; });
    const H = Math.max(exEnd, LPo.bottom + 20) + 76;
    const pcx = pr.x + pr.w / 2, pcy = pr.y + pr.h / 2, sA = Math.min(pr.w * .92, pr.h * 1.25) / D;   // sklopljena pica preko fotografije
    let hh = ls.map((l, i) => `<div class="pz${i === 0 ? ' base' : ''}" style="width:${f1(D)}px;height:${f1(D)}px;left:${x0}px;z-index:${10 + i}">${l.svg}</div>`).join('');
    hh += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${ls.map((l, i) => { const x1 = x0 + D * (i === 0 ? .99 : .86); return `<path d="M${f1(x1)} ${f1(cyE[i])}C${f1(lx - 16)} ${f1(cyE[i])} ${f1(lx - 20)} ${f1(ly[i])} ${f1(lx - 6)} ${f1(ly[i])}"/><circle cx="${f1(x1)}" cy="${f1(cyE[i])}" r="2.6"/>`; }).join('')}</svg>`;
    hh += ls.map((l, i) => lab(l.c, lx, lt[i], lw)).join('') + totLine(it, H - 56);
    xr.innerHTML = hh;
    const els = $$('.pz', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), tot = $('.xr-tot', xr);
    const asm = `translate(${f1(pcx - x0 - D / 2)}px,${f1(pcy - D / 2)}px) scale(${sA.toFixed(3)},${(sA * .78).toFixed(3)})`;
    els.forEach(el => { el.style.transition = 'none'; el.style.opacity = 0; el.style.transform = asm; });
    return {
      H, photo: { tx: 0, ty: 0, s: 1, op: 0 }, delay: 420,
      play(instant) {
        void xr.offsetWidth; const Dd = instant ? 0 : D_();
        els.forEach(el => { el.style.transition = 'opacity .4s'; el.style.opacity = 1; });
        setTimeout(() => {
          els.forEach((el, i) => { el.style.transition = ''; el.style.transitionDelay = (Dd ? (n - 1 - i) * 50 : 0) + 'ms'; el.style.transform = `translate(0px,${f1(cyE[i] - D / 2)}px) scale(1,${k})`; el.classList.add('ex'); });
          lbs.forEach((el, i) => { el.style.transitionDelay = (Dd ? 320 + (n - 1 - i) * 55 : 0) + 'ms'; el.classList.add('on'); });
          paths.forEach((p, i) => { p.style.transitionDelay = (Dd ? 360 + (n - 1 - Math.floor(i / 2)) * 55 : 0) + 'ms'; p.classList.add('on'); });
          tot.style.transitionDelay = (Dd ? 500 + n * 55 : 0) + 'ms'; tot.classList.add('on');
        }, Dd ? 520 : 0);
      },
      back() {
        lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); }); tot.classList.remove('on');
        els.forEach((el, i) => { el.style.transitionDelay = (i * 20) + 'ms'; el.style.transform = asm; el.classList.remove('ex'); });
        setTimeout(() => els.forEach(el => { el.style.transition = 'opacity .3s'; el.style.opacity = 0; }), 480);
      }
    };
  }

  /* ---------- video jela (Higgsfield): video/<id>.mp4 ako postoji ---------- */
  const VCACHE = {};
  function probeVideo(it, st) {
    const url = `video/${it.id}.mp4`;
    const use = () => { const ph = $('.ph', st); if (!ph || $('video', ph)) return; const v = document.createElement('video'); v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.setAttribute('playsinline', ''); v.src = url; v.addEventListener('loadeddata', () => { v.classList.add('ok'); ph.classList.add('vid'); const im = $('img', ph); if (im) im.style.display = 'none'; }); ph.appendChild(v); v.play().catch(() => { }); st.insertAdjacentHTML('beforeend', `<span class="vid-badge">${t('video')}</span>`); };
    if (VCACHE[url] === true) return use(); if (VCACHE[url] === false) return;
    fetch(url, { method: 'HEAD', cache: 'no-cache' }).then(r => { VCACHE[url] = r.ok && /video|octet/.test(r.headers.get('content-type') || 'video'); if (VCACHE[url] && st.isConnected) use(); }).catch(() => { VCACHE[url] = false; });
  }

  /* ---------- karta pića ---------- */
  function drinksView() {
    const D = window.KS_DRINKS;
    let h = `<section class="cathead">${pic(srcs('c:pica-karta'), '', true)}<div class="in"><h1>${t('drinks')}</h1><p>${t('drinks_lead')}</p></div></section><div class="wrap"><nav class="chips" aria-label="${esc(t('menu'))}">${CATS.map(x => `<a href="#/meni/${x.id}">${esc(catName(x))}</a>`).join('')}<a class="on" aria-current="true" href="#/pica">${esc(t('drinks'))}</a></nav>`;
    if (D && D.cats && D.cats.length) {
      h += `<nav class="dj" aria-label="${esc(t('drinks'))}">${D.cats.map(c => `<a href="#/pica" data-jump="dc-${c.id}">${esc(L === 'en' ? c.en : c.sr)}</a>`).join('')}</nav>`;
      for (const c of D.cats) {
        const its = D.items.filter(x => x.cat === c.id); if (!its.length) continue;
        h += `<section class="dcat" id="dc-${c.id}"><h2 class="h2">${esc(L === 'en' ? c.en : c.sr)}</h2>${(L === 'en' ? c.note_en : c.note) ? `<p class="dnote">${esc(L === 'en' ? c.note_en : c.note)}</p>` : ''}<div class="dl">`;
        let sub = null;
        for (const it of its) {
          if ((it.sub || null) !== sub) { sub = it.sub || null; if (sub) h += `<h3 class="dsub">${esc(L === 'en' ? it.sub_en || sub : sub)}</h3>`; }
          const so = soldOut(it), vs = it.var ? it.var.map((v, i) => [v[0], i]) : [[it.vol || '', 0]];
          h += `<div class="drk${so ? ' sold' : ''}"><div class="nm"><b>${esc(L === 'en' && it.en ? it.en : it.sr)}</b>${it.desc ? `<small>${esc(L === 'en' ? it.desc_en || it.desc : it.desc)}</small>` : ''}</div>
            <div class="pv">${so ? `<span class="sx">${t('sold')}</span>` : vs.map(([vol, i]) => `<button type="button" class="pb" data-addv="${it.id}:${i}" aria-label="${esc(t('add'))}: ${esc(it.sr)} ${esc(vol)}">${vol ? `<i>${esc(vol)}</i>` : ''}<b>${money(priceOf(it, i))}</b><span>${I.plus}</span></button>`).join('')}</div></div>`;
        }
        h += `</div></section>`;
      }
    } else h += `<div class="soon" style="margin-top:18px"><b>${t('soon_t')}</b>${t('soon_s')}</div>`;
    h += `<div style="height:120px"></div></div>`;
    return { html: h, title: t('drinks'), solidAt: 170 };
  }

  /* =====================================================================
     RENDER / ROUTER
     ===================================================================== */
  let solidAt = 280, cur = '';
  function render(keepScroll) {
    const r = (location.hash || '#/').slice(1).split('/').filter(Boolean);
    let v;
    if (r[0] === 'meni' && r[1]) v = catView(r[1]);
    else if (r[0] === 'meni') { v = home(); setTimeout(() => { const m = $('#meni'); if (m) m.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); }, 60); }
    else if (r[0] === 'jelo') v = dishView(r[1]);
    else if (r[0] === 'pica') v = drinksView();
    else v = home();
    app.innerHTML = v.html; wireImgs(app); solidAt = v.solidAt;
    const sub = r.length > 0 && !(r[0] === 'meni' && !r[1]);
    top.innerHTML = `${sub ? `<a class="ib" href="${r[0] === 'jelo' && BY[r[1]] ? '#/meni/' + BY[r[1]].cat : '#/'}" aria-label="${t('back')}">${I.back}</a><span class="tt">${esc(v.title)}</span>`
      : `<span class="mark"><span class="hx" style="color:var(--honey)">${I.hex}</span><span class="tt">${esc(v.title)}</span></span>`}
      ${TABLE ? `<span class="tbl">${t('table')} ${esc(TABLE)}</span>` : ''}<button type="button" class="lang" data-a="lang" aria-label="Jezik / Language">${L === 'en' ? 'SR' : 'EN'}</button>`;
    if (!keepScroll && cur !== location.hash) window.scrollTo(0, 0);
    cur = location.hash; onScroll(); paintDock(); if (v.after) v.after();
    document.body.classList.toggle('on-dish', !!v.dish); document.body.classList.toggle('on-table', !!TABLE);
  }
  function onScroll() { top.classList.toggle('solid', scrollY > solidAt); }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('hashchange', () => render());
  const rezUrl = () => TT.keepClock(TT.url('kosnica', 'rezervacije/'));

  /* ---------- donja traka ---------- */
  function liveOpen(kind) { return TT.myLive().filter(x => x.kind === kind && ['new', 'ack'].includes(x.status) && Date.now() - x.at < 2 * 3600e3).pop(); }
  function paintDock() {
    const n = listCount();
    const dishPage = /^#\/jelo\//.test(location.hash);
    if (TABLE) {
      const w = liveOpen('call'), b = liveOpen('bill');
      dock.style.gridTemplateColumns = 'auto 1fr 1fr 1fr';
      dock.innerHTML = `<div class="tno">${t('table').toUpperCase()}<b>${esc(TABLE)}</b></div>
        <button type="button" data-a="waiter" class="${w ? 'live' : ''}">${I.bell}${w ? (w.status === 'ack' ? '✓ ' : '') + t('dock_waiter') : t('dock_waiter')}</button>
        <button type="button" data-a="bill" class="${b ? 'live' : ''}">${I.bill}${t('dock_bill')}</button>
        <button type="button" data-a="list">${I.list}${t('dock_list')}${n ? `<span class="cnt">${n}</span>` : ''}</button>`;
    } else {
      dock.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
      dock.innerHTML = `<a href="#/meni">${I.menu}${t('dock_menu')}</a><a href="#/pica">${I.glass}${t('dock_drinks')}</a><a href="${esc(rezUrl())}" data-hit="book">${I.cal}${t('dock_book')}</a>
        <button type="button" data-a="list">${I.list}${t('dock_list')}${n ? `<span class="cnt">${n}</span>` : ''}</button>`;
    }
    dock.classList.toggle('hide', dishPage && !TABLE);
    document.body.style.setProperty('--dock', '1');
  }

  /* ---------- listovi (sheet) ---------- */
  const ov = $('#ov'), sh = $('#sheet');
  let shKind = null;
  function openSheet(kind, html) { shKind = kind; sh.innerHTML = `<div class="grab"></div><button type="button" class="x" data-a="close" aria-label="Zatvori">×</button>${html}`; wireImgs(sh); ov.classList.add('on'); sh.classList.add('on'); document.body.classList.add('lock'); }
  function closeSheet() { ov.classList.remove('on'); sh.classList.remove('on'); document.body.classList.remove('lock'); shKind = null; clearInterval(stT); }
  ov.addEventListener('click', closeSheet);
  let stT = null;
  const since = at => { const s = Math.max(0, Math.floor((Date.now() - at) / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  function statusBox(x, kind) {
    const ok = x.status === 'ack' || x.status === 'done';
    const msg = kind === 'call' ? (x.status === 'done' ? t('w_done') : ok ? t('w_ack') : t('w_wait')) : kind === 'bill' ? (ok ? t('b_ack') : t('b_wait')) : (x.status === 'done' ? t('o_done') : ok ? t('o_ack') : t('o_wait'));
    return `<div class="stat${ok ? ' ok' : ''}"><span class="dot"></span><span><b>${esc(msg)}</b><small>${t('table')} ${esc(x.table || TABLE)}</small></span><span class="tm" data-at="${x.at}">${since(x.at)}</span></div>`;
  }
  function tick() { $$('.stat .tm', sh).forEach(e => { e.textContent = since(+e.dataset.at); }); }
  async function sendLive(kind, body) {
    const r = await TT.api('/live', { body: Object.assign({ kind, table: TABLE, lang: L === 'en' ? 'en' : 'hr' }, body) });
    TT.addMyLive({ id: r.id, k: r.k, v: 'kosnica', kind, table: TABLE, at: Date.now(), status: 'new' });
    TT.watchGuest(); return r;
  }
  function waiterSheet() {
    const w = liveOpen('call');
    let h = `<h2>${t('w_t')}</h2><p class="lead">${t('w_lead', { t: esc(TABLE) })}</p>`;
    if (w) h += statusBox(w, 'call');
    else h += `<div class="opts" role="radiogroup">${t('w_why').map((s, i) => `<button type="button" data-why="${i}"${i === 0 ? ' class="on"' : ''}>${esc(s)}</button>`).join('')}</div><button type="button" class="btn full" data-a="sendWaiter">${I.bell}${t('w_send')}</button>`;
    openSheet('waiter', h); clearInterval(stT); stT = setInterval(tick, 1000);
  }
  function billSheet() {
    const b = liveOpen('bill');
    let h = `<h2>${t('b_t')}</h2><p class="lead">${t('b_lead', { t: esc(TABLE) })}</p>`;
    if (b) h += statusBox(b, 'bill');
    else h += `<div class="pay"><button type="button" data-pay="card" class="on">${I.card}${t('b_card')}</button><button type="button" data-pay="cash">${I.cash}${t('b_cash')}</button></div><button type="button" class="btn full" data-a="sendBill">${I.bill}${t('b_send')}</button>`;
    openSheet('bill', h); clearInterval(stT); stT = setInterval(tick, 1000);
  }
  function listSheet() {
    const o = liveOpen('order');
    let h = `<h2>${t('l_t')}</h2><p class="lead">${t('l_lead')}</p>`;
    if (o) h += statusBox(o, 'order');
    if (!LIST.length) h += `<div class="empty">${t('l_empty')}</div>`;
    else {
      h += `<div class="mylist">${LIST.map((x, i) => { const it = BY[x.id]; return `<div class="mli"><span><b>${esc(lnm(it))}</b><small>${it.var ? esc(it.var[x.v][0]) + ' · ' : it.vol ? esc(it.vol) + ' · ' : ''}${money(priceOf(it, x.v))}</small></span><div class="qty"><button type="button" data-lq="${i}:-1" aria-label="−">−</button><span>${x.q}</span><button type="button" data-lq="${i}:1" aria-label="+">+</button></div></div>`; }).join('')}</div>
        <div class="tot"><span>${t('l_total')}</span><b>${money(listTotal())}</b></div>`;
      if (TABLE && K.orders) h += `<button type="button" class="btn full" data-a="sendOrder">${I.bell}${t('l_send')}</button><div style="height:8px"></div>`;
      h += `<button type="button" class="btn full gh" data-a="showList">${t('l_show')}</button>${!TABLE ? `<p class="fine" style="text-align:center">${t('l_notable')}</p>` : ''}<div style="height:8px"></div><button type="button" class="btn full gh sm" data-a="clearList">${t('l_clear')}</button>`;
    }
    openSheet('list', h); clearInterval(stT); stT = setInterval(tick, 1000);
  }
  function fbSheet() {
    const topics = t('f_topics');
    openSheet('fb', `<h2>${t('f_t')}</h2><p class="lead">${t('f_lead')}</p><div class="opts">${Object.entries(topics).map(([k, v], i) => `<button type="button" data-topic="${k}"${i === 0 ? ' class="on"' : ''}>${esc(v)}</button>`).join('')}</div>
      <label class="sr" for="fbm">${t('f_t')}</label><textarea id="fbm" maxlength="1500" placeholder="${esc(t('f_ph'))}"></textarea><div style="height:12px"></div><button type="button" class="btn full" data-a="sendFb">${t('f_send')}</button>`);
  }
  function showList() {
    const el = document.createElement('div'); el.className = 'show';
    el.innerHTML = `<button type="button" class="x" aria-label="Zatvori">×</button><h2>${t('l_t')}</h2><div class="tb">${TABLE ? t('table').toUpperCase() + ' ' + esc(TABLE) : 'KOŠNICA'}</div>${LIST.map(x => { const it = BY[x.id]; return `<div class="ln"><b>${x.q}×</b><span>${esc(it.sr + (it.sub && it.cat === 'rakije' ? ' · ' + it.sub : ''))}${it.var ? ' · ' + esc(it.var[x.v][0]) : it.vol ? ' · ' + esc(it.vol) : ''}</span></div>`; }).join('')}<div class="ln" style="border:0"><b></b><span>${t('l_total')}: ${money(listTotal())}</span></div>`;
    el.querySelector('.x').addEventListener('click', () => el.remove()); document.body.appendChild(el);
  }

  /* ---------- klikovi ---------- */
  document.addEventListener('click', async e => {
    const hx = e.target.closest('[data-hit]'); if (hx) hit(hx.dataset.hit);
    const add = e.target.closest('[data-add]'); if (add) { e.preventDefault(); addToList(add.dataset.add); return; }
    const addv = e.target.closest('[data-addv]'); if (addv) { e.preventDefault(); const [id, v] = addv.dataset.addv.split(':'); addToList(id, +v || 0); return; }
    const jump = e.target.closest('[data-jump]'); if (jump) { e.preventDefault(); const el = document.getElementById(jump.dataset.jump); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 124, behavior: reduced ? 'auto' : 'smooth' }); return; }
    const why = e.target.closest('[data-why],[data-pay],[data-topic]');
    if (why) { $$(why.dataset.why != null ? '[data-why]' : why.dataset.pay ? '[data-pay]' : '[data-topic]', sh).forEach(b => b.classList.toggle('on', b === why)); return; }
    const lq = e.target.closest('[data-lq]');
    if (lq) { const [i, d] = lq.dataset.lq.split(':').map(Number); LIST[i].q += d; if (LIST[i].q <= 0) LIST.splice(i, 1); saveList(); listSheet(); return; }
    const a = e.target.closest('[data-a]'); if (!a) return;
    const k = a.dataset.a;
    if (k === 'close') return closeSheet();
    if (k === 'lang') { L = L === 'en' ? 'sr' : 'en'; LS.set('ks_lang', L); document.documentElement.lang = L === 'en' ? 'en' : 'sr'; render(true); return; }
    if (k === 'waiter') return waiterSheet();
    if (k === 'bill') return billSheet();
    if (k === 'list') return listSheet();
    if (k === 'fb') return fbSheet();
    if (k === 'showList') return showList();
    if (k === 'clearList') { LIST = []; saveList(); listSheet(); return; }
    try {
      if (k === 'sendWaiter') { a.disabled = true; const i = +($('[data-why].on', sh) || {}).dataset?.why || 0; await sendLive('call', { note: T.sr.w_why[i] || '' }); waiterSheet(); paintDock(); }
      if (k === 'sendBill') { a.disabled = true; const p = ($('[data-pay].on', sh) || {}).dataset?.pay || 'card'; await sendLive('bill', { pay: p }); billSheet(); paintDock(); }
      if (k === 'sendOrder') { a.disabled = true; await sendLive('order', { items: LIST.map(x => { const it = BY[x.id]; return { id: x.id, n: it.sr + (it.sub && it.cat === 'rakije' ? ' · ' + it.sub : ''), v: it.var ? it.var[x.v][0] : it.vol || '', q: x.q, e: priceOf(it, x.v) || 0 }; }) }); LIST = []; saveList(); listSheet(); }
      if (k === 'sendFb') {
        const msg = ($('#fbm') || {}).value || ''; if (msg.trim().length < 5) { toast(t('short')); return; }
        a.disabled = true; await TT.api('/feedback', { body: { topic: ($('[data-topic].on', sh) || {}).dataset?.topic || 'ostalo', msg, table: TABLE, lang: L === 'en' ? 'en' : 'hr' } });
        closeSheet(); toast(t('f_ok'), 3200);
      }
    } catch (err) { a.disabled = false; toast(t('err')); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeSheet(); const s = $('.show'); if (s) s.remove(); } });
  document.addEventListener('tt:live', e => {
    const d = e.detail; if (!d || !d.item) return;
    const x = d.item; const msg = x.kind === 'call' ? (x.status === 'ack' ? t('w_ack') : x.status === 'done' ? t('w_done') : '') : x.kind === 'bill' ? (x.status === 'ack' ? t('b_ack') : '') : (x.status === 'ack' ? t('o_ack') : x.status === 'done' ? t('o_done') : '');
    if (msg) { TT.notify({ app: 'Košnica', title: `${t('table')} ${x.table || TABLE}`, text: msg, color: '#f2a93b', icon: I.hex.replace('currentColor', '#1a1204').replace('currentColor', '#1a1204'), sound: 'ok', ms: 6000 }); }
    paintDock(); if (shKind === 'waiter') waiterSheet(); else if (shKind === 'bill') billSheet(); else if (shKind === 'list') listSheet();
  });

  /* =====================================================================
     WALK-IN: saće se otvara → ulaz → šank → sala → početna
     (ako postoji video/ulaz.mp4 — npr. iz Higgsfielda — pušta se on)
     ===================================================================== */
  function walkIn(done) {
    if (qs.get('intro') === '0' || (SS.get('ks_walk') && qs.get('intro') !== '1') || reduced) return done();
    SS.set('ks_walk', '1');
    const W = K.walk, el = document.createElement('div'); el.id = 'intro'; el.setAttribute('aria-hidden', 'true');
    const shots = W.shots.map((s, i) => `<div class="shot" data-i="${i}"><img alt="" referrerpolicy="no-referrer" data-s="${esc(srcs(s.img).join('|'))}" src="${esc(srcs(s.img)[0] || '')}" style="transform-origin:${s.fx}% ${s.fy}%;object-position:${s.ox != null ? s.ox : s.fx}% ${s.oy != null ? s.oy : s.fy}%"></div>`).join('');
    // saće preko cele slike
    const vw = innerWidth, vh = innerHeight, R = Math.max(34, Math.min(vw, vh) / 7.5), hw = Math.sqrt(3) * R;
    let cells = '';
    for (let row = -1, y = -R; y < vh + R; row++, y += R * 1.5) for (let x = (row % 2 ? hw / 2 : 0) - hw; x < vw + hw; x += hw) {
      const d = Math.hypot(x - vw / 2, y - vh / 2);
      cells += `<path data-d="${d.toFixed(0)}" d="M${x} ${y - R}L${x + hw / 2} ${y - R / 2}L${x + hw / 2} ${y + R / 2}L${x} ${y + R}L${x - hw / 2} ${y + R / 2}L${x - hw / 2} ${y - R / 2}Z"/>`;
    }
    el.innerHTML = `${shots}<div class="leak"></div><div class="flash"></div><div class="grade"></div><svg class="comb" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="none">${cells}</svg>
      <div class="brand"><div class="lg${K.logo && K.logo.length ? '' : ' noimg'}">${K.logo && K.logo.length ? `<img alt="" referrerpolicy="no-referrer" data-s="${esc(K.logo.join('|'))}" src="${esc(K.logo[0])}">` : ''}<span class="hxf">${I.hex}</span><b class="wm">KOŠNICA</b></div></div>
      <div class="cap" id="cap"><b></b><span></span></div><button type="button" class="skip">${t('skip')}</button><div class="bar"><i></i></div>`;
    document.body.appendChild(el); document.body.classList.add('lock'); wireImgs(el);
    const imgs = $$('.shot img', el); imgs.forEach(im => im.addEventListener('error', () => { }));
    let ended = false; const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    function finish() {
      if (ended) return; ended = true; timers.forEach(clearTimeout);
      el.classList.add('out'); document.body.classList.remove('lock'); done();
      setTimeout(() => el.remove(), 900);
    }
    el.addEventListener('click', finish);
    const anim = (node, kf, o) => node && node.animate ? node.animate(kf, Object.assign({ fill: 'forwards', easing: 'cubic-bezier(.45,.05,.25,1)' }, o)) : null;
    const cap = $('#cap', el), capB = $('b', cap), capS = $('span', cap);
    const setCap = (b, s) => { cap.classList.remove('on'); setTimeout(() => { capB.textContent = b; capS.textContent = s || ''; cap.classList.add('on'); }, 260); };
    const total = W.shots.reduce((a, s) => a + s.dur, 0) + 1300;
    function play() {
      anim($('.bar i', el), [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: total, easing: 'linear' });
      const lg = $('.brand .lg', el);
      anim(lg, [{ opacity: 0, transform: 'scale(.86)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 700 });
      // kadrovi
      let t0 = 900;
      W.shots.forEach((s, i) => {
        const sh = $$('.shot', el)[i], im = $('img', sh);
        at(i === 0 ? 0 : t0 - 500, () => { sh.classList.add('on'); anim(sh, [{ opacity: i === 0 ? 1 : 0 }, { opacity: 1 }], { duration: i === 0 ? 1 : 800 }); });
        anim(im, [{ transform: `scale(${s.z0}) translate(${s.px0 || 0}%,${s.py0 || 0}%)` }, { transform: `scale(${s.z1}) translate(${s.px1 || 0}%,${s.py1 || 0}%)` }], { duration: s.dur + 900, delay: Math.max(0, t0 - 600), easing: 'cubic-bezier(.3,.1,.3,1)' });
        if (s.flash) at(t0 + s.dur - 650, () => { const f = $('.flash', el); f.style.setProperty('--fx', s.fx + '%'); f.style.setProperty('--fy', s.fy + '%'); anim(f, [{ opacity: 0 }, { opacity: 1, offset: .45 }, { opacity: 0 }], { duration: 1300, easing: 'ease-in-out' }); });
        if (s.cap) at(t0 + 300, () => setCap(t(s.cap[0]), s.cap[1] ? t(s.cap[1]) : ''));
        if (i === 0) at(t0 - 100, () => { anim($('.leak', el), [{ opacity: 0 }, { opacity: .8 }, { opacity: .25 }], { duration: 3200 }); });
        t0 += s.dur;
      });
      // saće se otvara od sredine
      at(950, () => { anim(lg, [{ opacity: 1 }, { opacity: 0, transform: 'scale(1.08)' }], { duration: 600 }); $$('.comb path', el).forEach(p => { anim(p, [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }], { duration: 650, delay: +p.dataset.d * .9, easing: 'cubic-bezier(.6,0,.3,1)' }); }); });
      at(total - 200, finish);
    }
    // video ulaza (ako postoji)
    fetch('video/ulaz.mp4', { method: 'HEAD', cache: 'no-cache' }).then(r => {
      if (!r.ok || ended) return Promise.reject();
      const v = document.createElement('video'); v.muted = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.src = 'video/ulaz.mp4'; v.style.opacity = 0;
      el.insertBefore(v, el.firstChild); timers.forEach(clearTimeout); timers.length = 0;
      $$('.shot', el).forEach(s => s.remove());
      v.addEventListener('loadeddata', () => { v.style.transition = 'opacity .6s'; v.style.opacity = 1; v.play().catch(finish); at(1200, () => setCap(t('w1'), t('w4'))); anim($('.bar i', el), [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: (v.duration || 8) * 1000, easing: 'linear' }); $$('.comb path', el).forEach(p => anim(p, [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }], { duration: 650, delay: 300 + +p.dataset.d * .9 })); anim($('.brand .lg', el), [{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: 200 }); });
      v.addEventListener('ended', finish); at(15000, finish);
    }).catch(() => {
      if (ended) return;
      // pričekaj prvi kadar (najviše 1,6 s), pa kreni
      const first = imgs[0]; let go = false; const start = () => { if (go || ended) return; go = true; play(); };
      if (first && first.complete && first.naturalWidth) start(); else { if (first) first.addEventListener('load', start, { once: true }); setTimeout(start, 1600); }
    });
  }

  /* =====================================================================
     START
     ===================================================================== */
  document.body.insertAdjacentHTML('afterbegin', KART.defs());
  render();
  walkIn(() => { hit('open'); if (TABLE) hit('table'); });
  TT.api('/menu', { fast: true }).then(r => { OVR = Object.assign({ soldOut: {}, price: {} }, r.menu || {}); render(true); }).catch(() => { });
  TT.onChange(m => { if (m && !m.self && /menu|reset/.test(m.path || '')) TT.api('/menu', { fast: true }).then(r => { OVR = Object.assign({ soldOut: {}, price: {} }, r.menu || {}); render(true); }).catch(() => { }); });
  if (TT.myLive().some(x => ['new', 'ack'].includes(x.status))) TT.watchGuest();
  if (TT.mode === 'live') setInterval(() => { if (document.visibilityState === 'visible') TT.api('/menu', { fast: true }).then(r => { const s = JSON.stringify(r.menu || {}); if (s !== JSON.stringify(OVR)) { OVR = Object.assign({ soldOut: {}, price: {} }, r.menu || {}); if (!sh.classList.contains('on')) render(true); } }).catch(() => { }); }, 60000);
})();
