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
window.TT_DEMO_ITEMS={"kosnica": {"top": [{"id": "kosnica-burger", "name": "Košnica burger", "price": 1260}, {"id": "pivska-daska-kosnica-za-dvoje", "name": "Pivska daska Košnica za dvoje", "price": 1880}, {"id": "cevapi", "name": "Ćevapi", "price": 740}, {"id": "pica-kosnica", "name": "Pica Košnica", "price": 1130}, {"id": "kosnica-plata", "name": "Košnica plata", "price": 2780}, {"id": "cilito-burger", "name": "Čilito burger", "price": 1090}, {"id": "carska-piletina", "name": "Carska piletina", "price": 1380}, {"id": "zapecena-kolenica", "name": "Zapečena kolenica", "price": 1580}, {"id": "cezar-salata", "name": "Cezar salata", "price": 920}, {"id": "kosnica-palacinka", "name": "Košnica palačinka", "price": 560}, {"id": "tartufo-piletina-pasta", "name": "Tartufo piletina pasta", "price": 1090}, {"id": "smoked-burger", "name": "Smoked burger", "price": 1090}], "bottles": []}};
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
window.KS={"name": "Košnica", "phone": "+381665399999", "phoneTxt": "066 / 53 99 999", "gigPhone": "+381665399999", "gigPhoneTxt": "066/53-99999", "hours": {"0": ["10:00", "00:00"], "1": ["08:00", "00:00"], "2": ["08:00", "00:00"], "3": ["08:00", "00:00"], "4": ["08:00", "01:00"], "5": ["08:00", "02:00"], "6": ["08:00", "02:00"]}, "gigs": [{"wd": 5, "name": "Olja i Aca", "from": "22:00", "to": "02:00"}, {"wd": 6, "name": "Savacium Acoustic", "from": "22:00", "to": "02:00"}], "map": "https://maps.google.com/?cid=16218778338560428660", "review": "https://maps.google.com/?cid=16218778338560428660", "ig": "https://www.instagram.com/kosnicagastropub/", "delivery": "https://www.alideda.rs/kosnica-dostava-sabac", "orders": true, "story": {"sr": ["Košnica je u Šabac donela nešto sasvim novo: moderan ambijent u Karađorđevoj ulici, od jutarnje kafe do kasno u noć.", "Za vas smo pažljivo birali meni za sve uzraste, premijum pića i profesionalnu uslugu. Prostor je opremljen za svaku priliku — od jutarnje kafe i poslovnog ručka do rođendana.", "Petkom i subotom od 22h svira se uživo."], "en": ["Košnica brought something completely new to Šabac: a modern place on Karađorđeva street, from morning coffee until late at night.", "We carefully chose a menu for all ages, premium drinks and professional service. The space is ready for every occasion — from morning coffee and business lunch to birthdays.", "Live music every Friday and Saturday from 10 pm."]}, "coffee": {"sr": "Kafa je važan deo svakog dana. Zato smo izabrali najsavremeniju opremu i, kako volimo da kažemo, najkvalitetniju kafu u gradu.", "en": "Coffee is an important part of every day. That is why we chose state-of-the-art equipment and, as we like to say, the best coffee in town."}, "walk": {"shots": [{"img": "w1", "fx": 50, "fy": 58, "z0": 1.12, "z1": 1.5, "dur": 2600, "flash": true}, {"img": "w2", "fx": 40, "fy": 50, "z0": 1.22, "z1": 1.04, "px0": 3, "px1": -3, "dur": 2200, "cap": ["w1"]}, {"img": "w3", "fx": 50, "fy": 50, "z0": 1.16, "z1": 1.0, "dur": 2300, "cap": ["w3", "w4"]}]}, "img": {"d:healthy-dorucak": ["https://static.alideda.com/wp-content/uploads/2025/10/healthy-dorucak-400x300.jpg"], "d:punjene-przenice": ["https://static.alideda.com/wp-content/uploads/2025/10/punjene-przenice-400x300.jpg"], "d:klub-sendvic": ["https://static.alideda.com/wp-content/uploads/2025/10/klub-sendvic-400x300.jpg"], "d:kosnica-sendvic": ["https://static.alideda.com/wp-content/uploads/2025/10/kosnica-sendvic-400x300.jpg"], "d:klasik-dorucak": ["https://static.alideda.com/wp-content/uploads/2025/10/klasik-dorucak-400x300.jpg"], "d:rolovana-punjena-piletina": ["https://static.alideda.com/wp-content/uploads/2025/10/rolovana-punjena-piletina-400x300.jpg"], "d:carska-piletina": ["https://static.alideda.com/wp-content/uploads/2025/10/carska-piletina-400x300.jpg"], "d:grilovana-piletina": ["https://static.alideda.com/wp-content/uploads/2025/10/grilovana-piletina-400x300.jpg"], "d:rizoto-sa-piletinom": ["https://static.alideda.com/wp-content/uploads/2025/10/rizoto-sa-piletinom-400x300.jpg"], "d:kobasica-sa-sirom": ["https://static.alideda.com/wp-content/uploads/2025/10/kobasica-sa-sirom-400x300.jpg"], "d:zapecena-kolenica": ["https://static.alideda.com/wp-content/uploads/2025/10/zapecena-kolenica-400x300.jpg"], "d:pivska-daska-kosnica-za-dvoje": ["https://static.alideda.com/wp-content/uploads/2025/10/pivska-daska-kosnica-za-dvoje-400x300.jpg"], "d:kosnica-predjelo-plata-za-dvoje": ["https://static.alideda.com/wp-content/uploads/2023/07/kosnica-plata-za-dvoje-400x300.jpg"], "d:selekcija-sireva": ["https://static.alideda.com/wp-content/uploads/2025/10/selekcija-sireva-400x300.jpg"], "d:kosnica-plata": ["https://static.alideda.com/wp-content/uploads/2025/10/kosnica-plata-400x300.jpg"], "d:cevapi": ["https://static.alideda.com/wp-content/uploads/2025/10/cevapi-400x300.jpg"], "d:svinjski-medaljoni": ["https://static.alideda.com/wp-content/uploads/2025/10/svinjski-medaljoni-400x300.jpg"], "d:smudj": ["https://static.alideda.com/wp-content/uploads/2025/10/smudj-400x300.jpg"], "d:pica-kosnica": ["https://static.alideda.com/wp-content/uploads/2025/10/pica-kosnica-400x300.jpg"], "d:kapricoza": ["https://static.alideda.com/wp-content/uploads/2025/10/kapricoza-400x300.jpg"], "d:peperoni-pica": ["https://static.alideda.com/wp-content/uploads/2025/10/peperoni-pica-400x300.jpg"], "d:kvatro-formadji-pica": ["https://static.alideda.com/wp-content/uploads/2025/10/kvatro-formadji-pica-400x300.jpg"], "d:mediteran-pica": ["https://static.alideda.com/wp-content/uploads/2025/10/mediteran-pica-400x300.jpg"], "d:tuna-pica": ["https://static.alideda.com/wp-content/uploads/2025/10/tuna-pica-400x300.jpg"], "d:kvatro-stadjoni-pica": ["https://static.alideda.com/wp-content/uploads/2025/10/kvatro-stadjoni-pica-400x300.jpg"], "d:cezar-salata": ["https://static.alideda.com/wp-content/uploads/2025/10/cezar-salata-400x300.jpg"], "d:grcka-salata": ["https://static.alideda.com/wp-content/uploads/2025/10/grcka-salata-1-400x300.jpg"], "d:tuna-salata": ["https://static.alideda.com/wp-content/uploads/2025/10/tuna-salata-1-400x300.jpg"], "d:karbonara-pasta": ["https://static.alideda.com/wp-content/uploads/2025/10/karbonara-pasta-400x300.jpg"], "d:tartufo-piletina-pasta": ["https://static.alideda.com/wp-content/uploads/2025/10/tartufo-piletina-pasta-400x300.jpg"], "d:kosnica-burger": ["https://static.alideda.com/wp-content/uploads/2025/10/kosnica-burger-400x300.jpg"], "d:ciken-burger": ["https://static.alideda.com/wp-content/uploads/2025/10/ciken-burger-400x300.jpg"], "d:cilito-burger": ["https://static.alideda.com/wp-content/uploads/2025/10/cilito-burger-400x300.jpg"], "d:smoked-burger": ["https://static.alideda.com/wp-content/uploads/2025/10/smoked-burger-400x300.jpg"], "d:panko-piletina": ["https://static.alideda.com/wp-content/uploads/2025/10/panko-piletina-400x300.jpg"], "d:prolecne-rolnice": ["https://static.alideda.com/wp-content/uploads/2025/10/prolecne-rolnice-400x300.jpg"], "d:takitosi": ["https://static.alideda.com/wp-content/uploads/2025/10/takitosi-400x300.jpg"], "d:nacosi": ["https://static.alideda.com/wp-content/uploads/2025/10/nacosi-400x300.jpg"], "d:mini-burger": ["https://static.alideda.com/wp-content/uploads/2025/10/mini-burger-400x300.jpg"], "d:mini-panko-piletina": ["https://static.alideda.com/wp-content/uploads/2025/10/mini-panko-piletina-400x300.jpg"], "d:mini-cevapi": ["https://static.alideda.com/wp-content/uploads/2025/10/mini-cevapi-400x300.jpg"], "d:kinder-kolac": ["https://static.alideda.com/wp-content/uploads/2025/10/kinder-kolac-400x300.jpg"], "d:karamel-badem": ["https://static.alideda.com/wp-content/uploads/2025/10/karamel-badem-400x300.jpg"], "d:cizkejk": ["https://static.alideda.com/wp-content/uploads/2025/10/cizkejk-400x300.jpg"], "d:kosnica-palacinka": ["https://static.alideda.com/wp-content/uploads/2025/10/kosnica-palacinka-400x300.jpg"], "d:kinder-palacinka": ["https://static.alideda.com/wp-content/uploads/2025/10/kinder-palacinka-400x300.jpg"], "c:dorucak": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_6565-scaled.jpg"], "c:kosnica": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_7073-scaled.jpg"], "c:pica": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_6884-scaled.jpg"], "c:salate": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_6654-scaled.jpg"], "c:paste": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_6613-scaled.jpg"], "c:burgeri": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_6759-scaled.jpg"], "c:finger": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_6947-scaled.jpg"], "c:deserti": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_6684-scaled.jpg"], "c:pica-karta": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_6870-scaled.jpg"], "c:piletina": ["https://kosnicagastropub.rs/wp-content/uploads/2025/10/Specijaliteti-od-piletine_2.png"], "c:deca": ["https://kosnicagastropub.rs/wp-content/uploads/2025/10/Deciji-Meni_1.png"], "c:palacinke": ["https://kosnicagastropub.rs/wp-content/uploads/2025/10/Palacinke_slika_1.png"], "c:prilozi": ["https://static.alideda.com/wp-content/uploads/2025/10/grcka-salata-1-400x300.jpg"], "hero": ["https://kosnicagastropub.rs/wp-content/uploads/2023/08/IMG_7640-scaled.jpg"], "story1": ["https://kosnicagastropub.rs/wp-content/uploads/2023/08/IMG_7612-scaled.jpg"], "story2": ["https://kosnicagastropub.rs/wp-content/uploads/2023/08/IMG_7621-scaled.jpg"], "story3": ["https://kosnicagastropub.rs/wp-content/uploads/2023/08/IMG_7627-scaled.jpg"], "w1": ["https://kosnicagastropub.rs/wp-content/uploads/2023/08/IMG_7610-1-scaled.jpg"], "w2": ["https://kosnicagastropub.rs/wp-content/uploads/2023/08/IMG_7614-scaled.jpg"], "w3": ["https://kosnicagastropub.rs/wp-content/uploads/2023/08/IMG_7640-scaled.jpg"], "coffee": ["https://kosnicagastropub.rs/wp-content/uploads/2023/07/IMG_7083-scaled.jpg"]}, "logo": ["https://kosnicagastropub.rs/wp-content/uploads/2023/06/Kosnica.png"]};
window.KS_MENU={"cats": [{"id": "dorucak", "sr": "Doručak", "en": "Breakfast", "note": "Do 12 časova. Dan počinje kafom i dobrim doručkom.", "note_en": "Until noon. The day starts with coffee and a proper breakfast."}, {"id": "piletina", "sr": "Specijaliteti od piletine", "en": "Chicken specialties", "note": "Pileće belo meso, 300 g po porciji.", "note_en": "Chicken breast, 300 g per portion."}, {"id": "kosnica", "sr": "Specijaliteti Košnica", "en": "Košnica specialties", "note": "Plate i daske za društvo, ćevapi, kolenica i smuđ.", "note_en": "Platters and boards to share, ćevapi, pork knuckle and zander."}, {"id": "pica", "sr": "Pica", "en": "Pizza", "note": "Pica od 32 cm.", "note_en": "32 cm pizzas."}, {"id": "salate", "sr": "Obrok salate", "en": "Meal salads", "note": "Salate koje su ceo obrok.", "note_en": "Salads that make a full meal."}, {"id": "paste", "sr": "Paste", "en": "Pasta", "note": "", "note_en": ""}, {"id": "burgeri", "sr": "Burgeri", "en": "Burgers", "note": "100% juneće meso.", "note_en": "100% beef."}, {"id": "finger", "sr": "Finger food", "en": "Finger food", "note": "Za deljenje uz piće.", "note_en": "To share over drinks."}, {"id": "deca", "sr": "Dečiji meni", "en": "Kids' menu", "note": "Manje porcije za najmlađe.", "note_en": "Smaller portions for the little ones."}, {"id": "deserti", "sr": "Deserti", "en": "Desserts", "note": "", "note_en": ""}, {"id": "palacinke", "sr": "Palačinke", "en": "Pancakes", "note": "", "note_en": ""}, {"id": "prilozi", "sr": "Prilozi, salate i sosevi", "en": "Sides, salads & sauces", "note": "Prilozi 200 g.", "note_en": "Sides 200 g."}], "items": [{"id": "healthy-dorucak", "cat": "dorucak", "sr": "Healthy doručak", "en": "Healthy breakfast", "desc": "Granola, grčki jogurt, voće, med.", "desc_en": "Granola, Greek yoghurt, fruit, honey.", "img": "healthy-dorucak", "chips": [["Granola", "Granola", "testo"], ["Grčki jogurt", "Greek yoghurt", "sir"], ["Voće", "Fruit", "voce"], ["Med", "Honey", "slatko"]], "nut": {"kcal": 600, "p": 25, "c": 80, "f": 22}, "al": ["gluten", "mleko"]}, {"id": "punjene-przenice", "cat": "dorucak", "sr": "Punjene prženice", "en": "Stuffed French toast", "desc": "Pečenica, mocarela, pavlaka.", "desc_en": "Cured pork loin, mozzarella, sour cream.", "img": "punjene-przenice", "chips": [["Prženice", "French toast", "testo"], ["Pečenica", "Cured pork loin", "meso"], ["Mocarela", "Mozzarella", "sir"], ["Pavlaka", "Sour cream", "sir"]], "nut": {"kcal": 850, "p": 45, "c": 57, "f": 49}, "al": ["gluten", "mleko", "jaja"]}, {"id": "klub-sendvic", "cat": "dorucak", "sr": "Klub sendvič", "en": "Club sandwich", "desc": "Piletina, slanina, zelena salata, paradajz, cezar sos.", "desc_en": "Chicken, bacon, lettuce, tomato, Caesar sauce.", "img": "klub-sendvic", "chips": [["Tost", "Toast", "testo"], ["Piletina", "Chicken", "meso"], ["Slanina", "Bacon", "meso"], ["Zelena salata", "Lettuce", "povrce"], ["Paradajz", "Tomato", "povrce"], ["Cezar sos", "Caesar sauce", "sos"]], "nut": {"kcal": 770, "p": 54, "c": 62, "f": 32}, "al": ["gluten", "mleko", "jaja"]}, {"id": "kosnica-sendvic", "cat": "dorucak", "sr": "Košnica sendvič", "en": "Košnica sandwich", "desc": "Piletina, pršut, mocarela, kiseli krastavci, zelena salata, bbq sos, cezar sos.", "desc_en": "Chicken, prosciutto, mozzarella, pickles, lettuce, BBQ sauce, Caesar sauce.", "img": "kosnica-sendvic", "sig": true, "chips": [["Piletina", "Chicken", "meso"], ["Pršut", "Prosciutto", "meso"], ["Mocarela", "Mozzarella", "sir"], ["Kiseli krastavci", "Pickles", "povrce"], ["Zelena salata", "Lettuce", "povrce"], ["BBQ sos", "BBQ sauce", "sos"], ["Cezar sos", "Caesar sauce", "sos"]], "nut": {"kcal": 830, "p": 60, "c": 74, "f": 30}, "al": ["gluten", "mleko", "jaja"]}, {"id": "klasik-dorucak", "cat": "dorucak", "sr": "Klasik doručak", "en": "Classic breakfast", "desc": "3 jaja, meso po želji (slanina, šunka ili kobasica), feta sir, paradajz, pomfrit.", "desc_en": "3 eggs, meat of your choice (bacon, ham or sausage), feta, tomato, fries.", "img": "klasik-dorucak", "chips": [["3 jaja", "3 eggs", "meso"], ["Slanina, šunka ili kobasica", "Bacon, ham or sausage", "meso"], ["Feta sir", "Feta", "sir"], ["Paradajz", "Tomato", "povrce"], ["Pomfrit", "Fries", "prilog"]], "nut": {"kcal": 1000, "p": 49, "c": 55, "f": 64}, "al": ["mleko", "jaja"]}, {"id": "rolovana-punjena-piletina", "cat": "piletina", "sr": "Rolovana punjena piletina", "en": "Rolled stuffed chicken", "desc": "Belo meso, mocarela, šunka, pančeta, pomfrit.", "desc_en": "Chicken breast, mozzarella, ham, pancetta, fries.", "price": 1240, "img": "rolovana-punjena-piletina", "size": "300 g", "pair": ["pohovani-luk", "cizkejk"], "chips": [["Belo meso", "Chicken breast", "meso"], ["Mocarela", "Mozzarella", "sir"], ["Šunka", "Ham", "meso"], ["Pančeta", "Pancetta", "meso"], ["Pomfrit", "Fries", "prilog"]], "nut": {"kcal": 1090, "p": 87, "c": 63, "f": 52}, "al": ["mleko"]}, {"id": "carska-piletina", "cat": "piletina", "sr": "Carska piletina", "en": "Imperial chicken", "desc": "Belo meso, mocarela, pršuta, tikvica, šargarepa, šampinjoni, crveni luk, paprika, pirinač, gorgonzola sos.", "desc_en": "Chicken breast, mozzarella, prosciutto, zucchini, carrot, mushrooms, red onion, pepper, rice, gorgonzola sauce.", "price": 1380, "img": "carska-piletina", "size": "300 g", "story": "Najbogatija piletina na meniju: povrće, pršuta i gorgonzola sos na jednom tanjiru.", "story_en": "The richest chicken on the menu: vegetables, prosciutto and gorgonzola sauce on one plate.", "pair": ["grilovano-povrce", "kinder-kolac"], "sig": true, "chips": [["Belo meso", "Chicken breast", "meso"], ["Mocarela", "Mozzarella", "sir"], ["Pršuta", "Prosciutto", "meso"], ["Tikvica", "Zucchini", "povrce"], ["Šargarepa", "Carrot", "povrce"], ["Šampinjoni", "Mushrooms", "povrce"], ["Crveni luk", "Red onion", "povrce"], ["Paprika", "Pepper", "povrce"], ["Pirinač", "Rice", "prilog"], ["Gorgonzola sos", "Gorgonzola sauce", "sos"]], "nut": {"kcal": 840, "p": 85, "c": 51, "f": 30}, "al": ["mleko"]}, {"id": "grilovana-piletina", "cat": "piletina", "sr": "Grilovana piletina", "en": "Grilled chicken", "desc": "Belo meso, pirinač.", "desc_en": "Chicken breast, rice.", "price": 1090, "img": "grilovana-piletina", "size": "300 g", "pair": ["miks-zelenih-salata", "grilovano-povrce"], "chips": [["Belo meso sa roštilja", "Grilled chicken breast", "meso"], ["Pirinač", "Rice", "prilog"]], "nut": {"kcal": 600, "p": 73, "c": 50, "f": 8}, "al": []}, {"id": "rizoto-sa-piletinom", "cat": "piletina", "sr": "Rižoto sa piletinom", "en": "Chicken risotto", "desc": "Belo meso, pirinač, šampinjoni, crni luk, parmezan.", "desc_en": "Chicken breast, rice, mushrooms, onion, parmesan.", "price": 980, "img": "rizoto-sa-piletinom", "size": "300 g", "pair": ["miks-zelenih-salata"], "chips": [["Belo meso", "Chicken breast", "meso"], ["Pirinač", "Rice", "prilog"], ["Šampinjoni", "Mushrooms", "povrce"], ["Crni luk", "Onion", "povrce"], ["Parmezan", "Parmesan", "sir"]], "nut": {"kcal": 670, "p": 56, "c": 58, "f": 22}, "al": ["mleko"]}, {"id": "kobasica-sa-sirom", "cat": "kosnica", "sr": "Kobasica sa sirom", "en": "Cheese sausage", "desc": "Začinjeni krompir, senf.", "desc_en": "Spiced potatoes, mustard.", "price": 1230, "img": "kobasica-sa-sirom", "pair": ["lepinja", "coleslaw-salata"], "chips": [["Kobasica sa sirom", "Cheese sausage", "meso"], ["Začinjeni krompir", "Spiced potatoes", "prilog"], ["Senf", "Mustard", "sos"]], "nut": {"kcal": 1060, "p": 38, "c": 50, "f": 80}, "al": ["senf"]}, {"id": "zapecena-kolenica", "cat": "kosnica", "sr": "Zapečena kolenica", "en": "Roasted pork knuckle", "desc": "Kolenica, začinjeni krompir, sos od rena.", "desc_en": "Pork knuckle, spiced potatoes, horseradish sauce.", "price": 1580, "img": "zapecena-kolenica", "story": "Zapečena kolenica sa začinjenim krompirom i sosom od rena, za veliku glad.", "story_en": "Roasted pork knuckle with spiced potatoes and horseradish sauce, for a big appetite.", "pair": ["coleslaw-salata", "lepinja"], "sig": true, "chips": [["Kolenica", "Pork knuckle", "meso"], ["Začinjeni krompir", "Spiced potatoes", "prilog"], ["Sos od rena", "Horseradish sauce", "sos"]], "nut": {"kcal": 1290, "p": 83, "c": 48, "f": 85}, "al": []}, {"id": "pivska-daska-kosnica-za-dvoje", "cat": "kosnica", "sr": "Pivska daska Košnica za dvoje", "en": "Košnica beer board for two", "desc": "Gurmanski uštipak, kobasice sa sirom, rolovana punjena piletina, panko piletina, pomfrit, sosevi.", "desc_en": "Gourmet uštipak, cheese sausages, rolled stuffed chicken, panko chicken, fries, sauces.", "price": 1880, "img": "pivska-daska-kosnica-za-dvoje", "story": "Daska za dvoje i hladno pivo: od svega po malo, za društvo koje deli sve.", "story_en": "A board for two and a cold beer: a bit of everything, for friends who share it all.", "pair": ["pohovani-luk", "panirana-mocarela"], "sig": true, "chips": [["Gurmanski uštipak", "Gourmet uštipak", "meso"], ["Kobasice sa sirom", "Cheese sausages", "meso"], ["Rolovana punjena piletina", "Rolled stuffed chicken", "meso"], ["Panko piletina", "Panko chicken", "meso"], ["Pomfrit", "Fries", "prilog"], ["Sosevi", "Sauces", "sos"]], "nut": {"kcal": 2790, "p": 115, "c": 192, "f": 173}, "al": ["gluten", "mleko", "jaja"]}, {"id": "kosnica-predjelo-plata-za-dvoje", "cat": "kosnica", "sr": "Košnica predjelo plata za dvoje", "en": "Košnica starter platter for two", "desc": "Pršuta, pečenica, kulen u katu, feta sir, duvan čvarci, gauda, dimljeni sir.", "desc_en": "Prosciutto, cured pork loin, kulen sausage, feta, crackling, gouda, smoked cheese.", "price": 1470, "spice": 1, "img": "kosnica-plata-za-dvoje", "story": "Suhomesnato i sirevi za početak večeri, za dvoje.", "story_en": "Cured meats and cheeses to start the evening, for two.", "pair": ["lepinja"], "sig": true, "chips": [["Pršuta", "Prosciutto", "meso"], ["Pečenica", "Cured pork loin", "meso"], ["Kulen u katu", "Kulen sausage", "meso"], ["Feta sir", "Feta", "sir"], ["Duvan čvarci", "Crackling", "meso"], ["Gauda", "Gouda", "sir"], ["Dimljeni sir", "Smoked cheese", "sir"]], "nut": {"kcal": 1470, "p": 105, "c": 6, "f": 114}, "al": ["mleko"]}, {"id": "selekcija-sireva", "cat": "kosnica", "sr": "Selekcija sireva", "en": "Cheese selection", "desc": "Dimljeni sir, gauda, feta sir, gorgonzola, mocarela, rukola, čeri paradajz, masline.", "desc_en": "Smoked cheese, gouda, feta, gorgonzola, mozzarella, rocket, cherry tomatoes, olives.", "price": 1330, "img": "selekcija-sireva", "pair": ["lepinja"], "chips": [["Dimljeni sir", "Smoked cheese", "sir"], ["Gauda", "Gouda", "sir"], ["Feta sir", "Feta", "sir"], ["Gorgonzola", "Gorgonzola", "sir"], ["Mocarela", "Mozzarella", "sir"], ["Rukola", "Rocket", "povrce"], ["Čeri paradajz", "Cherry tomatoes", "povrce"], ["Masline", "Olives", "povrce"]], "nut": {"kcal": 960, "p": 61, "c": 11, "f": 76}, "al": ["mleko"]}, {"id": "kosnica-plata", "cat": "kosnica", "sr": "Košnica plata", "en": "Košnica platter", "desc": "Svinjski file, ćevapi, belo meso, kobasica, začinjeni krompir, pavlaka, panko piletina.", "desc_en": "Pork fillet, ćevapi, chicken breast, sausage, spiced potatoes, sour cream, panko chicken.", "price": 2780, "img": "kosnica-plata", "story": "Naša najveća plata: roštilj, panko piletina i krompir za celo društvo.", "story_en": "Our biggest platter: grill, panko chicken and potatoes for the whole table.", "pair": ["coleslaw-salata", "lepinja"], "sig": true, "chips": [["Svinjski file", "Pork fillet", "meso"], ["Ćevapi", "Ćevapi", "meso"], ["Belo meso", "Chicken breast", "meso"], ["Kobasica", "Sausage", "meso"], ["Panko piletina", "Panko chicken", "meso"], ["Začinjeni krompir", "Spiced potatoes", "prilog"], ["Pavlaka", "Sour cream", "sir"]], "nut": {"kcal": 2600, "p": 212, "c": 98, "f": 150}, "al": ["gluten", "mleko", "jaja"]}, {"id": "cevapi", "cat": "kosnica", "sr": "Ćevapi", "en": "Ćevapi", "desc": "100% juneće meso, pomfrit, kajmak.", "desc_en": "100% beef, fries, kajmak.", "price": 740, "img": "cevapi", "var": [["200 g", 740], ["400 g", 1210]], "pair": ["lepinja", "coleslaw-salata"], "chips": [["100% juneće meso", "100% beef", "meso"], ["Pomfrit", "Fries", "prilog"], ["Kajmak", "Kajmak", "sir"]], "nut": {"kcal": 1150, "p": 49, "c": 67, "f": 77}, "al": ["gluten", "mleko"]}, {"id": "svinjski-medaljoni", "cat": "kosnica", "sr": "Svinjski medaljoni", "en": "Pork medallions", "desc": "Svinjski file, sos mix pečuraka, pomfrit, slanina.", "desc_en": "Pork fillet, mixed mushroom sauce, fries, bacon.", "price": 1470, "img": "svinjski-medaljoni", "pair": ["grilovano-povrce"], "chips": [["Svinjski file", "Pork fillet", "meso"], ["Sos mix pečuraka", "Mushroom sauce", "sos"], ["Slanina", "Bacon", "meso"], ["Pomfrit", "Fries", "prilog"]], "nut": {"kcal": 1110, "p": 82, "c": 67, "f": 56}, "al": ["mleko"]}, {"id": "smudj", "cat": "kosnica", "sr": "Smuđ", "en": "Zander", "desc": "Rižoto, mix pečuraka, luk, pelat.", "desc_en": "Risotto, mixed mushrooms, onion, tomato.", "price": 1570, "img": "smudj", "size": "300 g", "story": "Riba za one koji žele nešto lakše: smuđ na rižotu sa pečurkama.", "story_en": "Fish for a lighter choice: zander on a mushroom risotto.", "pair": ["miks-zelenih-salata"], "sig": true, "chips": [["Smuđ", "Zander", "riba"], ["Rižoto", "Risotto", "prilog"], ["Mix pečuraka", "Mixed mushrooms", "povrce"], ["Luk", "Onion", "povrce"], ["Pelat", "Tomato", "sos"]], "nut": {"kcal": 610, "p": 77, "c": 42, "f": 13}, "al": ["mleko", "riba"]}, {"id": "pica-kosnica", "cat": "pica", "sr": "Pica Košnica", "en": "Pizza Košnica", "desc": "Pečenica, pršuta, šunka, kulen, mocarela, pečurke.", "desc_en": "Cured pork loin, prosciutto, ham, kulen, mozzarella, mushrooms.", "price": 1130, "spice": 1, "img": "pica-kosnica", "size": "32 cm", "story": "Kućna pica sa četiri vrste suhomesnatog, za ljubitelje mesa.", "story_en": "House pizza with four kinds of cured meat, for meat lovers.", "pair": ["kinder-palacinka"], "sig": true, "chips": [["Pečenica", "Cured pork loin", "meso"], ["Pršuta", "Prosciutto", "meso"], ["Šunka", "Ham", "meso"], ["Kulen", "Kulen", "meso"], ["Mocarela", "Mozzarella", "sir"], ["Pečurke", "Mushrooms", "povrce"]], "nut": {"kcal": 1410, "p": 87, "c": 133, "f": 58}, "al": ["gluten", "mleko"]}, {"id": "kapricoza", "cat": "pica", "sr": "Kaprićoza", "en": "Capricciosa", "desc": "Šunka, mocarela, pečurke, masline, pelat.", "desc_en": "Ham, mozzarella, mushrooms, olives, tomato.", "price": 960, "img": "kapricoza", "size": "32 cm", "chips": [["Šunka", "Ham", "meso"], ["Mocarela", "Mozzarella", "sir"], ["Pečurke", "Mushrooms", "povrce"], ["Masline", "Olives", "povrce"], ["Pelat", "Tomato", "sos"]], "nut": {"kcal": 1140, "p": 64, "c": 135, "f": 38}, "al": ["gluten", "mleko"]}, {"id": "peperoni-pica", "cat": "pica", "sr": "Peperoni pica", "en": "Pepperoni pizza", "desc": "Kulen, mocarela, pelat, feferoni.", "desc_en": "Kulen, mozzarella, tomato, hot peppers.", "price": 1020, "spice": 2, "img": "peperoni-pica", "size": "32 cm", "chips": [["Kulen", "Kulen", "meso"], ["Mocarela", "Mozzarella", "sir"], ["Pelat", "Tomato", "sos"], ["Feferoni", "Hot peppers", "povrce"]], "nut": {"kcal": 1330, "p": 65, "c": 133, "f": 58}, "al": ["gluten", "mleko"]}, {"id": "kvatro-formadji-pica", "cat": "pica", "sr": "Kvatro formađi pica", "en": "Quattro formaggi pizza", "desc": "Mocarela, gorgonzola, dimljeni sir, gauda, masline, pelat.", "desc_en": "Mozzarella, gorgonzola, smoked cheese, gouda, olives, tomato.", "price": 1020, "img": "kvatro-formadji-pica", "size": "32 cm", "chips": [["Mocarela", "Mozzarella", "sir"], ["Gorgonzola", "Gorgonzola", "sir"], ["Dimljeni sir", "Smoked cheese", "sir"], ["Gauda", "Gouda", "sir"], ["Masline", "Olives", "povrce"], ["Pelat", "Tomato", "sos"]], "nut": {"kcal": 1360, "p": 67, "c": 133, "f": 61}, "al": ["gluten", "mleko"]}, {"id": "mediteran-pica", "cat": "pica", "sr": "Mediteran pica", "en": "Mediterranean pizza", "desc": "Mocarela, pršuta, rukola, parmezan, čeri paradajz, pelat.", "desc_en": "Mozzarella, prosciutto, rocket, parmesan, cherry tomatoes, tomato.", "price": 1090, "img": "mediteran-pica", "size": "32 cm", "chips": [["Mocarela", "Mozzarella", "sir"], ["Pršuta", "Prosciutto", "meso"], ["Rukola", "Rocket", "povrce"], ["Parmezan", "Parmesan", "sir"], ["Čeri paradajz", "Cherry tomatoes", "povrce"], ["Pelat", "Tomato", "sos"]], "nut": {"kcal": 1200, "p": 67, "c": 134, "f": 44}, "al": ["gluten", "mleko"]}, {"id": "tuna-pica", "cat": "pica", "sr": "Tuna pica", "en": "Tuna pizza", "desc": "Tuna, biljni sir, tikvice, crveni luk, kukuruz šećerac, čeri paradajz, masline, pelat.", "desc_en": "Tuna, plant-based cheese, zucchini, red onion, sweetcorn, cherry tomatoes, olives, tomato.", "price": 930, "img": "tuna-pica", "size": "32 cm", "chips": [["Tuna", "Tuna", "riba"], ["Biljni sir", "Plant-based cheese", "sir"], ["Tikvice", "Zucchini", "povrce"], ["Crveni luk", "Red onion", "povrce"], ["Kukuruz šećerac", "Sweetcorn", "povrce"], ["Čeri paradajz", "Cherry tomatoes", "povrce"], ["Masline", "Olives", "povrce"]], "nut": {"kcal": 1140, "p": 47, "c": 155, "f": 36}, "al": ["gluten", "riba"]}, {"id": "kvatro-stadjoni-pica", "cat": "pica", "sr": "Kvatro stađoni pica", "en": "Quattro stagioni pizza", "desc": "Mocarela, pršut, kulen, pečenica, pečurke, masline, pelat.", "desc_en": "Mozzarella, prosciutto, kulen, cured pork loin, mushrooms, olives, tomato.", "price": 990, "spice": 1, "img": "kvatro-stadjoni-pica", "size": "32 cm", "chips": [["Mocarela", "Mozzarella", "sir"], ["Pršut", "Prosciutto", "meso"], ["Kulen", "Kulen", "meso"], ["Pečenica", "Cured pork loin", "meso"], ["Pečurke", "Mushrooms", "povrce"], ["Masline", "Olives", "povrce"]], "nut": {"kcal": 1350, "p": 77, "c": 134, "f": 56}, "al": ["gluten", "mleko"]}, {"id": "cezar-salata", "cat": "salate", "sr": "Cezar salata", "en": "Caesar salad", "desc": "Piletina, pančeta, parmezan, čeri paradajz, ajsberg, dresing, krutoni.", "desc_en": "Chicken, pancetta, parmesan, cherry tomatoes, iceberg, dressing, croutons.", "price": 920, "img": "cezar-salata", "chips": [["Piletina", "Chicken", "meso"], ["Pančeta", "Pancetta", "meso"], ["Parmezan", "Parmesan", "sir"], ["Čeri paradajz", "Cherry tomatoes", "povrce"], ["Ajsberg", "Iceberg", "povrce"], ["Dresing", "Dressing", "sos"], ["Krutoni", "Croutons", "testo"]], "nut": {"kcal": 800, "p": 64, "c": 29, "f": 46}, "al": ["gluten", "mleko", "jaja"]}, {"id": "grcka-salata", "cat": "salate", "sr": "Grčka salata", "en": "Greek salad", "desc": "Paradajz, krastavac, paprika, crveni luk, feta sir, masline.", "desc_en": "Tomato, cucumber, pepper, red onion, feta, olives.", "price": 720, "img": "grcka-salata-1", "chips": [["Paradajz", "Tomato", "povrce"], ["Krastavac", "Cucumber", "povrce"], ["Paprika", "Pepper", "povrce"], ["Crveni luk", "Red onion", "povrce"], ["Feta sir", "Feta", "sir"], ["Masline", "Olives", "povrce"]], "nut": {"kcal": 440, "p": 17, "c": 23, "f": 32}, "al": ["mleko"]}, {"id": "tuna-salata", "cat": "salate", "sr": "Tuna salata", "en": "Tuna salad", "desc": "Zelena salata, čeri paradajz, crveni luk, kukuruz, tuna.", "desc_en": "Lettuce, cherry tomatoes, red onion, corn, tuna.", "price": 840, "img": "tuna-salata-1", "chips": [["Zelena salata", "Lettuce", "povrce"], ["Čeri paradajz", "Cherry tomatoes", "povrce"], ["Crveni luk", "Red onion", "povrce"], ["Kukuruz", "Corn", "povrce"], ["Tuna", "Tuna", "riba"]], "nut": {"kcal": 390, "p": 38, "c": 18, "f": 18}, "al": ["riba"]}, {"id": "karbonara-pasta", "cat": "paste", "sr": "Karbonara pasta", "en": "Carbonara", "desc": "Pančeta, jaje, parmezan.", "desc_en": "Pancetta, egg, parmesan.", "price": 960, "img": "karbonara-pasta", "pair": ["miks-zelenih-salata"], "chips": [["Pasta", "Pasta", "testo"], ["Pančeta", "Pancetta", "meso"], ["Jaje", "Egg", "meso"], ["Parmezan", "Parmesan", "sir"]], "nut": {"kcal": 890, "p": 41, "c": 88, "f": 40}, "al": ["gluten", "mleko", "jaja"]}, {"id": "tartufo-piletina-pasta", "cat": "paste", "sr": "Tartufo piletina pasta", "en": "Truffle chicken pasta", "desc": "Piletina, sos tartufata, parmezan, čeri paradajz, indijski orah.", "desc_en": "Chicken, truffle sauce, parmesan, cherry tomatoes, cashews.", "price": 1090, "img": "tartufo-piletina-pasta", "story": "Piletina i tartufata, uz hrskavi indijski orah.", "story_en": "Chicken and truffle sauce, with crunchy cashews.", "pair": ["miks-zelenih-salata"], "sig": true, "chips": [["Pasta", "Pasta", "testo"], ["Piletina", "Chicken", "meso"], ["Sos tartufata", "Truffle sauce", "sos"], ["Parmezan", "Parmesan", "sir"], ["Čeri paradajz", "Cherry tomatoes", "povrce"], ["Indijski orah", "Cashews", "voce"]], "nut": {"kcal": 880, "p": 65, "c": 91, "f": 27}, "al": ["gluten", "mleko", "orasi"]}, {"id": "kosnica-burger", "cat": "burgeri", "sr": "Košnica burger", "en": "Košnica burger", "desc": "100% juneće meso, slanina, pohovana mocarela, čedar sir, paradajz, grilovani luk, bbq sos, zelena salata, čipotle sos.", "desc_en": "100% beef, bacon, breaded mozzarella, cheddar, tomato, grilled onion, BBQ sauce, lettuce, chipotle sauce.", "price": 1260, "spice": 1, "img": "kosnica-burger", "story": "Burger koji nosi naše ime: slanina, pohovana mocarela, čedar i dva sosa na junećem mesu.", "story_en": "The burger that carries our name: bacon, breaded mozzarella, cheddar and two sauces on beef.", "pair": ["pohovani-luk", "cizkejk"], "sig": true, "chips": [["Pecivo", "Bun", "testo"], ["Čipotle sos", "Chipotle sauce", "sos"], ["Zelena salata", "Lettuce", "povrce"], ["Paradajz", "Tomato", "povrce"], ["Grilovani luk", "Grilled onion", "povrce"], ["Čedar sir", "Cheddar", "sir"], ["Pohovana mocarela", "Breaded mozzarella", "sir"], ["Slanina", "Bacon", "meso"], ["100% juneće meso", "100% beef", "meso"], ["BBQ sos", "BBQ sauce", "sos"]], "nut": {"kcal": 1270, "p": 81, "c": 70, "f": 74}, "al": ["gluten", "mleko", "jaja"]}, {"id": "ciken-burger", "cat": "burgeri", "sr": "Čiken burger", "en": "Chicken burger", "desc": "Pileće belo meso, mocarela, coleslaw salata, beli sos, paradajz.", "desc_en": "Chicken breast, mozzarella, coleslaw, white sauce, tomato.", "price": 960, "img": "ciken-burger", "pair": ["pomfrit"], "chips": [["Pecivo", "Bun", "testo"], ["Beli sos", "White sauce", "sos"], ["Coleslaw salata", "Coleslaw", "povrce"], ["Paradajz", "Tomato", "povrce"], ["Mocarela", "Mozzarella", "sir"], ["Pileće belo meso", "Chicken breast", "meso"]], "nut": {"kcal": 770, "p": 65, "c": 52, "f": 32}, "al": ["gluten", "mleko", "jaja"]}, {"id": "cilito-burger", "cat": "burgeri", "sr": "Čilito burger", "en": "Chilito burger", "desc": "100% juneće meso, čedar, čipotle sos, crveni kupus, paradajz, halapenjo.", "desc_en": "100% beef, cheddar, chipotle sauce, red cabbage, tomato, jalapeño.", "price": 1090, "spice": 2, "img": "cilito-burger", "story": "Za one koji vole da peče: halapenjo i čipotle na junećem mesu.", "story_en": "For those who like the heat: jalapeño and chipotle on beef.", "pair": ["pomfrit"], "sig": true, "chips": [["Pecivo", "Bun", "testo"], ["Halapenjo", "Jalapeño", "povrce"], ["Crveni kupus", "Red cabbage", "povrce"], ["Paradajz", "Tomato", "povrce"], ["Čedar", "Cheddar", "sir"], ["100% juneće meso", "100% beef", "meso"], ["Čipotle sos", "Chipotle sauce", "sos"]], "nut": {"kcal": 890, "p": 61, "c": 49, "f": 50}, "al": ["gluten", "mleko", "jaja"]}, {"id": "smoked-burger", "cat": "burgeri", "sr": "Smoked burger", "en": "Smoked burger", "desc": "100% juneće meso, dimljeni sir, burger sos, paradajz, bbq sos, crveni luk, kiseli krastavci, ajsberg.", "desc_en": "100% beef, smoked cheese, burger sauce, tomato, BBQ sauce, red onion, pickles, iceberg.", "price": 1090, "img": "smoked-burger", "pair": ["pohovani-luk"], "chips": [["Pecivo", "Bun", "testo"], ["Burger sos", "Burger sauce", "sos"], ["Ajsberg", "Iceberg", "povrce"], ["Kiseli krastavci", "Pickles", "povrce"], ["Crveni luk", "Red onion", "povrce"], ["Paradajz", "Tomato", "povrce"], ["Dimljeni sir", "Smoked cheese", "sir"], ["100% juneće meso", "100% beef", "meso"], ["BBQ sos", "BBQ sauce", "sos"]], "nut": {"kcal": 930, "p": 63, "c": 57, "f": 50}, "al": ["gluten", "mleko", "jaja"]}, {"id": "panko-piletina", "cat": "finger", "sr": "Panko piletina", "en": "Panko chicken", "desc": "Pileće belo meso, pomfrit, sweet chili sos, kari sos.", "desc_en": "Chicken breast, fries, sweet chilli sauce, curry sauce.", "price": 1080, "spice": 1, "img": "panko-piletina", "chips": [["Pohovano belo meso", "Breaded chicken breast", "meso"], ["Pomfrit", "Fries", "prilog"], ["Sweet chili sos", "Sweet chilli sauce", "sos"], ["Kari sos", "Curry sauce", "sos"]], "nut": {"kcal": 1200, "p": 45, "c": 115, "f": 61}, "al": ["gluten", "jaja"]}, {"id": "prolecne-rolnice", "cat": "finger", "sr": "Prolećne rolnice", "en": "Spring rolls", "desc": "Kupus, šargarepa, luk, pomfrit, sweet chilli sos, vasabi sos.", "desc_en": "Cabbage, carrot, onion, fries, sweet chilli sauce, wasabi sauce.", "price": 490, "spice": 1, "img": "prolecne-rolnice", "chips": [["Rolnice", "Rolls", "testo"], ["Kupus", "Cabbage", "povrce"], ["Šargarepa", "Carrot", "povrce"], ["Luk", "Onion", "povrce"], ["Pomfrit", "Fries", "prilog"], ["Sweet chilli sos", "Sweet chilli sauce", "sos"], ["Vasabi sos", "Wasabi sauce", "sos"]], "nut": {"kcal": 870, "p": 12, "c": 107, "f": 44}, "al": ["gluten", "jaja"]}, {"id": "takitosi", "cat": "finger", "sr": "Takitosi", "en": "Taquitos", "desc": "Pileće belo meso, pomfrit, čipotle sos, kari sos.", "desc_en": "Chicken breast, fries, chipotle sauce, curry sauce.", "price": 960, "spice": 1, "img": "takitosi", "chips": [["Tortilja", "Tortilla", "testo"], ["Pileće belo meso", "Chicken breast", "meso"], ["Pomfrit", "Fries", "prilog"], ["Čipotle sos", "Chipotle sauce", "sos"], ["Kari sos", "Curry sauce", "sos"]], "nut": {"kcal": 1100, "p": 33, "c": 104, "f": 62}, "al": ["gluten", "jaja"]}, {"id": "nacosi", "cat": "finger", "sr": "Naćosi", "en": "Nachos", "desc": "Čips tortilja, topljeni sir.", "desc_en": "Tortilla chips, melted cheese.", "price": 300, "img": "nacosi", "chips": [["Čips tortilja", "Tortilla chips", "testo"], ["Topljeni sir", "Melted cheese", "sir"]], "nut": {"kcal": 570, "p": 12, "c": 54, "f": 35}, "al": ["mleko"]}, {"id": "mini-burger", "cat": "deca", "sr": "Mini burger", "en": "Mini burger", "desc": "100% juneće meso, krastavčići, kečap, zelena salata, kačkavalj.", "desc_en": "100% beef, pickles, ketchup, lettuce, kashkaval cheese.", "price": 590, "img": "mini-burger", "pair": ["kinder-palacinka"], "chips": [["Pecivo", "Bun", "testo"], ["Kečap", "Ketchup", "sos"], ["Zelena salata", "Lettuce", "povrce"], ["Krastavčići", "Pickles", "povrce"], ["Kačkavalj", "Kashkaval", "sir"], ["100% juneće meso", "100% beef", "meso"]], "nut": {"kcal": 510, "p": 37, "c": 35, "f": 24}, "al": ["gluten", "mleko"]}, {"id": "mini-panko-piletina", "cat": "deca", "sr": "Mini panko piletina", "en": "Mini panko chicken", "desc": "Belo meso 150 g, pomfrit, kečap, beli sos.", "desc_en": "Chicken breast 150 g, fries, ketchup, white sauce.", "price": 690, "img": "mini-panko-piletina", "chips": [["Pohovano belo meso", "Breaded chicken", "meso"], ["Pomfrit", "Fries", "prilog"], ["Kečap", "Ketchup", "sos"], ["Beli sos", "White sauce", "sos"]], "nut": {"kcal": 860, "p": 32, "c": 78, "f": 47}, "al": ["gluten", "jaja"]}, {"id": "mini-cevapi", "cat": "deca", "sr": "Mini ćevapi", "en": "Mini ćevapi", "desc": "100% juneće meso 150 g, kečap, pomfrit.", "desc_en": "100% beef 150 g, ketchup, fries.", "price": 640, "img": "mini-cevapi", "chips": [["100% juneće meso", "100% beef", "meso"], ["Pomfrit", "Fries", "prilog"], ["Kečap", "Ketchup", "sos"]], "nut": {"kcal": 790, "p": 36, "c": 57, "f": 47}, "al": []}, {"id": "kinder-kolac", "cat": "deserti", "sr": "Kinder kolač", "en": "Kinder cake", "desc": "Biskvitna korica, nutela, krem od vanile, krem od čokolade, plazma keks, pečeni lešnik, preliv od mlečne čokolade.", "desc_en": "Sponge base, Nutella, vanilla cream, chocolate cream, Plazma biscuit, roasted hazelnut, milk chocolate glaze.", "price": 490, "img": "kinder-kolac", "chips": [["Biskvit", "Sponge", "testo"], ["Nutela", "Nutella", "slatko"], ["Krem od vanile", "Vanilla cream", "slatko"], ["Krem od čokolade", "Chocolate cream", "slatko"], ["Plazma keks", "Plazma biscuit", "testo"], ["Pečeni lešnik", "Roasted hazelnut", "voce"], ["Mlečna čokolada", "Milk chocolate", "slatko"]], "nut": {"kcal": 630, "p": 9, "c": 68, "f": 36}, "al": ["gluten", "mleko", "jaja", "orasi"]}, {"id": "karamel-badem", "cat": "deserti", "sr": "Karamel badem", "en": "Caramel almond", "desc": "Listići badema, seckani badem, krem od vanile, orašasta kora, karamel preliv.", "desc_en": "Almond flakes, chopped almonds, vanilla cream, nut crust, caramel glaze.", "price": 490, "img": "karamel-badem", "chips": [["Badem", "Almonds", "voce"], ["Krem od vanile", "Vanilla cream", "slatko"], ["Orašasta kora", "Nut crust", "testo"], ["Karamel", "Caramel", "slatko"]], "nut": {"kcal": 680, "p": 12, "c": 63, "f": 42}, "al": ["gluten", "mleko", "jaja", "orasi"]}, {"id": "cizkejk", "cat": "deserti", "sr": "Čizkejk", "en": "Cheesecake", "desc": "Kora sa plazma keksom, krem od maskarpone sira i slatke pavlake, preliven sosom od jagode.", "desc_en": "Plazma biscuit base, mascarpone and cream filling, strawberry sauce.", "price": 490, "img": "cizkejk", "chips": [["Plazma keks", "Plazma biscuit", "testo"], ["Maskarpone", "Mascarpone", "sir"], ["Slatka pavlaka", "Cream", "sir"], ["Sos od jagode", "Strawberry sauce", "voce"]], "nut": {"kcal": 510, "p": 9, "c": 42, "f": 35}, "al": ["gluten", "mleko"]}, {"id": "kosnica-palacinka", "cat": "palacinke", "sr": "Košnica palačinka", "en": "Košnica pancake", "desc": "Nadev od crvenog voća, čokoladni kranč, francuski krem, voćni toping, karamel sos, šlag.", "desc_en": "Red fruit filling, chocolate crunch, custard, fruit topping, caramel sauce, whipped cream.", "price": 560, "img": "kosnica-palacinka", "story": "Kućna palačinka: crveno voće, francuski krem i karamel.", "story_en": "House pancake: red fruit, custard and caramel.", "sig": true, "chips": [["Palačinka", "Pancake", "testo"], ["Crveno voće", "Red fruit", "voce"], ["Čokoladni kranč", "Chocolate crunch", "slatko"], ["Francuski krem", "Custard", "slatko"], ["Karamel sos", "Caramel sauce", "slatko"], ["Šlag", "Whipped cream", "slatko"]], "nut": {"kcal": 630, "p": 11, "c": 85, "f": 27}, "al": ["gluten", "mleko", "jaja"]}, {"id": "kinder-palacinka", "cat": "palacinke", "sr": "Kinder palačinka", "en": "Kinder pancake", "desc": "Čokoladni toping, kinder čokolada, francuski krem, karamel sos, šlag.", "desc_en": "Chocolate topping, Kinder chocolate, custard, caramel sauce, whipped cream.", "price": 560, "img": "kinder-palacinka", "chips": [["Palačinka", "Pancake", "testo"], ["Čokoladni toping", "Chocolate topping", "slatko"], ["Kinder čokolada", "Kinder chocolate", "slatko"], ["Francuski krem", "Custard", "slatko"], ["Karamel sos", "Caramel sauce", "slatko"], ["Šlag", "Whipped cream", "slatko"]], "nut": {"kcal": 710, "p": 13, "c": 86, "f": 35}, "al": ["gluten", "mleko", "jaja", "soja"]}, {"id": "coleslaw-salata", "cat": "prilozi", "sr": "Coleslaw salata", "en": "Coleslaw", "desc": "Kupus, šargarepa, crveni luk, majonez, pavlaka.", "desc_en": "Cabbage, carrot, red onion, mayonnaise, sour cream.", "price": 390, "chips": [["Kupus", "Cabbage", "povrce"], ["Šargarepa", "Carrot", "povrce"], ["Crveni luk", "Red onion", "povrce"], ["Majonez", "Mayonnaise", "sos"], ["Pavlaka", "Sour cream", "sir"]], "nut": {"kcal": 300, "p": 2, "c": 20, "f": 24}, "al": ["jaja"]}, {"id": "miks-zelenih-salata", "cat": "prilozi", "sr": "Miks zelenih salata", "en": "Mixed greens", "desc": "Ajsberg, zelena salata, rukola, parmezan, čeri paradajz.", "desc_en": "Iceberg, lettuce, rocket, parmesan, cherry tomatoes.", "price": 390, "chips": [["Ajsberg", "Iceberg", "povrce"], ["Zelena salata", "Lettuce", "povrce"], ["Rukola", "Rocket", "povrce"], ["Parmezan", "Parmesan", "sir"], ["Čeri paradajz", "Cherry tomatoes", "povrce"]], "nut": {"kcal": 140, "p": 8, "c": 8, "f": 10}, "al": ["mleko"]}, {"id": "pomfrit", "cat": "prilozi", "sr": "Pomfrit", "en": "Fries", "desc": "", "desc_en": "", "price": 320, "size": "200 g", "nut": {"kcal": 620, "p": 7, "c": 82, "f": 30}, "al": []}, {"id": "zacinjeni-krompir", "cat": "prilozi", "sr": "Začinjeni krompir", "en": "Spiced potatoes", "desc": "", "desc_en": "", "price": 360, "size": "200 g", "nut": {"kcal": 300, "p": 5, "c": 44, "f": 12}, "al": []}, {"id": "pohovani-luk", "cat": "prilozi", "sr": "Pohovani luk", "en": "Onion rings", "desc": "", "desc_en": "", "price": 330, "size": "200 g", "nut": {"kcal": 660, "p": 8, "c": 66, "f": 40}, "al": ["gluten"]}, {"id": "panirana-mocarela", "cat": "prilozi", "sr": "Panirana mocarela", "en": "Breaded mozzarella", "desc": "", "desc_en": "", "price": 620, "size": "200 g", "nut": {"kcal": 660, "p": 30, "c": 40, "f": 42}, "al": ["gluten", "mleko", "jaja"]}, {"id": "grilovano-povrce", "cat": "prilozi", "sr": "Grilovano povrće", "en": "Grilled vegetables", "desc": "", "desc_en": "", "price": 360, "size": "200 g", "nut": {"kcal": 140, "p": 3, "c": 14, "f": 8}, "al": []}, {"id": "pirinac", "cat": "prilozi", "sr": "Pirinač", "en": "Rice", "desc": "", "desc_en": "", "price": 300, "size": "200 g", "nut": {"kcal": 260, "p": 5, "c": 56, "f": 1}, "al": []}, {"id": "lepinja", "cat": "prilozi", "sr": "Lepinja", "en": "Flatbread", "desc": "", "desc_en": "", "price": 120, "nut": {"kcal": 280, "p": 9, "c": 55, "f": 2}, "al": ["gluten"]}, {"id": "sosevi", "cat": "prilozi", "sr": "Sosevi", "en": "Sauces", "desc": "Beli, kečap, vasabi, čipotle, sweet chili ili kari.", "desc_en": "White, ketchup, wasabi, chipotle, sweet chilli or curry.", "price": 120, "nut": {"kcal": 190, "p": 0, "c": 3, "f": 20}, "al": ["jaja"]}], "al": {"gluten": ["Gluten", "Gluten"], "mleko": ["Mleko", "Milk"], "jaja": ["Jaja", "Eggs"], "riba": ["Riba", "Fish"], "senf": ["Senf", "Mustard"], "orasi": ["Orašasti plodovi", "Tree nuts"], "soja": ["Soja", "Soy"]}, "groups": {"meso": ["Meso", "Meat"], "sir": ["Sir", "Cheese"], "povrce": ["Povrće", "Veg"], "sos": ["Sos", "Sauce"], "testo": ["Testo", "Dough"], "prilog": ["Prilog", "Side"], "riba": ["Riba", "Fish"], "slatko": ["Slatko", "Sweet"], "voce": ["Voće", "Fruit"]}};
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
      ing: 'Sastojci', video: 'VIDEO',
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
      ing: 'Ingredients', video: 'VIDEO',
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
  document.documentElement.lang = L === 'en' ? 'en' : 'sr';

  /* ---------- sto (NFC / QR) ---------- */
  const qs = new URLSearchParams(location.search);
  const tq = (qs.get('sto') || qs.get('stol') || qs.get('table') || '').replace(/[^\w-]/g, '').slice(0, 8);
  if (tq) SS.set('ks_table', tq);
  const TABLE = tq || SS.get('ks_table') || '';

  /* ---------- jelovnik ---------- */
  const ITEMS = M.items, BY = Object.fromEntries(ITEMS.map(x => [x.id, x])), CATS = M.cats;
  let OVR = { soldOut: {}, price: {}, tonight: null };
  const priceOf = (it, i = 0) => { const o = OVR.price && OVR.price[it.id]; if (o && o[i] != null) return o[i]; return it.var ? it.var[i][1] : it.price; };
  const soldOut = it => !!(OVR.soldOut && OVR.soldOut[it.id]);
  const money = v => v == null ? '' : `${Math.round(v)} RSD`;
  const priceTxt = it => { if (it.price == null && !it.var) return ''; if (it.var) return (it.var.length > 1 ? t('from') + ' ' : '') + money(Math.min(...it.var.map((_, i) => priceOf(it, i)))); return money(priceOf(it)); };

  /* ---------- slike: lokalna kopija, pa izvor (Košnica / Alideda) ---------- */
  const srcs = key => { const s = K.img[key]; return !s ? [] : Array.isArray(s) ? s : [s]; };
  const dishSrcs = it => srcs('d:' + it.id);
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
    saveList(); toast(`${t('added')} · ${nm(it)}`); TT.buzz(12);
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
      for (const it of sig) h += `<a href="#/jelo/${it.id}">${pic(dishSrcs(it))}<div class="tx"><b>${esc(nm(it))}</b><span>${esc((L === 'en' ? it.story_en : it.story) || ds(it))}</span><em>${I.split.replace('<svg', '<svg width="16" height="16"')}${t('split_it')}</em></div></a>`;
      h += `</div></section>`;
    }
    const S = K.story[L === 'en' ? 'en' : 'sr'];
    h += `<section class="sec"><h2>${t('story')}</h2><div class="story">${pic(srcs('story1'))}${S.map(p => `<p>${esc(p)}</p>`).join('')}<div class="duo">${pic(srcs('story2'))}${pic(srcs('story3'))}</div>
      <div class="coffee">${pic(srcs('coffee'))}<div><b>${t('coffee_t')}</b><span>${esc(K.coffee[L === 'en' ? 'en' : 'sr'])}</span></div></div></div></section>`;
    h += `<section class="sec"><h2>${t('gigs')}</h2><div class="gigs">${K.gigs.map(g => `<div class="gig"><div class="d">${t('days_s')[g.wd]}<b>${g.from.slice(0, 2)}h</b></div><div><strong>${esc(g.name)}</strong><span>${t('days')[g.wd]} · ${g.from}–${g.to}</span></div></div>`).join('')}</div></section>`;
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
      const im = dishSrcs(it), so = soldOut(it);
      h += `<a class="dish${im.length ? '' : ' nophoto'}${so ? ' sold' : ''}" href="#/jelo/${it.id}">${pic(im)}<span class="tx"><b>${esc(nm(it))}</b>${ds(it) ? `<span class="ds">${esc(ds(it))}</span>` : ''}
        <span class="ft">${so ? `<span class="sx">${t('sold')}</span>` : `<span class="pr">${priceTxt(it)}</span>`}${it.spice ? `<span class="hot" aria-label="${esc(t('spice_l')[it.spice])}">${'🌶'.repeat(it.spice)}</span>` : ''}${it.sig ? `<span class="tag">${t('house_tag')}</span>` : ''}${it.size && !it.var ? `<span class="tag">${esc(it.size)}</span>` : ''}</span></span></a>`;
    }
    h += `</div><div style="height:120px"></div></div>`;
    return { html: h, title: catName(c), solidAt: 170, after: () => { const on = $('.chips .on'); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' }); } };
  }

  let curVar = 0, curQty = 1;
  function dishView(id) {
    const it = BY[id]; if (!it) return catView(CATS[0].id);
    curVar = 0; curQty = 1;
    const im = dishSrcs(it), share = /za-dvoje|plata|daska/.test(it.id);
    const mode = ['burgeri'].includes(it.cat) || /sendvic|mini-burger/.test(it.id) ? 'stack' : 'flow';
    const n = it.nut, RI = { p: 50, c: 260, f: 70 };
    const bar = (k) => `<div class="macro"><span>${t(k)}</span><s><i data-w="${Math.min(100, Math.round(n[k] / RI[k] * 100))}"></i></s><em>${n[k]} g</em></div>`;
    const pairs = (it.pair || []).map(p => BY[p]).filter(Boolean);
    let h = `<div class="dv"><section class="stage" id="stage" data-mode="${mode}">${pic(im, '', true)}<div class="comb-bg"></div><svg class="lines" id="lines"></svg>
      ${(it.chips || []).map((c, i) => `<span class="ing" style="--c:var(--g-${c[2]})" data-i="${i}"><i></i>${esc(L === 'en' ? c[1] : c[0])}</span>`).join('')}
      ${it.chips && it.chips.length ? `<button type="button" class="split" id="splitBtn" aria-pressed="false">${I.split}<span>${t('split')}</span></button>` : ''}</section>
      <div class="wrap dinfo"><h1>${esc(nm(it))}</h1>${it.size ? `<div class="size">${esc(it.size)}${share ? ' · ' + t('share') : ''}</div>` : share ? `<div class="size">${t('share')}</div>` : ''}
      ${(L === 'en' ? it.story_en : it.story) ? `<p class="tale">${esc(L === 'en' ? it.story_en : it.story)}</p>` : ''}
      ${ds(it) ? `<p class="desc">${esc(ds(it))}</p>` : ''}
      ${it.var ? `<div class="vars" role="radiogroup">${it.var.map((v, i) => `<button type="button" role="radio" aria-checked="${i === 0}" class="${i === 0 ? 'on' : ''}" data-v="${i}">${esc(v[0])}<b>${money(priceOf(it, i))}</b></button>`).join('')}</div>`
        : priceOf(it) != null ? `<div class="price1">${money(priceOf(it))}</div>` : ''}
      ${soldOut(it) ? `<p class="fine" style="color:var(--ember);font-weight:800">${t('sold')}</p>` : ''}
      <div class="box"><h3>${t('nut')}<small>${share ? t('per_share') : t('per')}</small></h3>
        <div class="kcal"><b>${n.kcal}</b><span>${t('kcal')}</span></div>${bar('p')}${bar('c')}${bar('f')}<p class="fine">${t('ri')} ${t('est')}</p></div>
      <div class="box"><h3>${t('spice')}</h3><div class="spice">${[1, 2, 3].map(k => I.chili(k <= (it.spice || 0))).join('')}<span>${t('spice_l')[it.spice || 0]}</span></div></div>
      <div class="box"><h3>${t('alg')}</h3><div class="algs${it.al && it.al.length ? '' : ' none'}">${it.al && it.al.length ? it.al.map(a => `<span>${esc(M.al[a][L === 'en' ? 1 : 0])}</span>`).join('') : `<span>${t('alg_none')}</span>`}</div><p class="fine">${t('alg_note')}</p></div>
      ${pairs.length ? `<div class="box"><h3>${t('pair')}</h3><div class="pairs">${pairs.map(p => { const pi = dishSrcs(p); return `<div class="pair${pi.length ? '' : ' nophoto'}">${pic(pi)}<a href="#/jelo/${p.id}"><b>${esc(nm(p))}</b><small>${priceTxt(p)}</small></a><button type="button" class="add" data-add="${p.id}" aria-label="${esc(t('add'))}: ${esc(nm(p))}">${I.plus}</button></div>`; }).join('')}</div></div>` : ''}
      <div style="height:${TABLE ? 190 : 120}px"></div></div>
      ${priceOf(it) != null && !soldOut(it) ? `<div class="dbar" id="dbar"><div class="qty"><button type="button" data-q="-1" aria-label="−">−</button><span id="qn">1</span><button type="button" data-q="1" aria-label="+">+</button></div><button type="button" class="btn" id="addBtn">${I.list}<span>${t('add')} · <span id="addP">${money(priceOf(it))}</span></span></button></div>` : ''}</div>`;
    return {
      html: h, title: nm(it), solidAt: Math.max(200, Math.min(innerHeight * .68, 620) - 90), dish: true,
      after: () => {
        hit('view', { id: it.id, name: it.sr });
        const st = $('#stage'), btn = $('#splitBtn');
        if (btn) { btn.addEventListener('click', () => toggleSplit(st, btn, it, mode)); if (!reduced && !SS.get('ks_split_seen')) setTimeout(() => { if (st.isConnected && !st.classList.contains('open')) { toggleSplit(st, btn, it, mode); SS.set('ks_split_seen', '1'); } }, 1100); }
        $$('.macro i').forEach(x => requestAnimationFrame(() => requestAnimationFrame(() => { x.style.width = x.dataset.w + '%'; })));
        $$('.vars button').forEach(b => b.addEventListener('click', () => { curVar = +b.dataset.v; $$('.vars button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); }); paintAdd(it); }));
        $$('#dbar [data-q]').forEach(b => b.addEventListener('click', () => { curQty = Math.max(1, Math.min(20, curQty + +b.dataset.q)); $('#qn').textContent = curQty; paintAdd(it); }));
        const ab = $('#addBtn'); if (ab) ab.addEventListener('click', () => addToList(it.id, curVar, curQty));
        probeVideo(it, st);
      }
    };
  }
  const paintAdd = it => { const p = $('#addP'); if (p) p.textContent = money(priceOf(it, curVar) * curQty); };

  /* ---------- rastavljanje jela ---------- */
  function toggleSplit(st, btn, it, mode) {
    const open = !st.classList.contains('open');
    const chips = $$('.ing', st), svg = $('#lines', st), W = st.clientWidth, H = st.clientHeight;
    btn.setAttribute('aria-pressed', open); btn.querySelector('span').textContent = open ? t('join') : t('split');
    const ph = $('.ph', st);
    if (!open) {
      st.classList.remove('open', 'tall'); ph.style.transform = ''; ph.style.clipPath = '';
      chips.forEach(c => { c.style.transform = `translate(${W / 2 - c.offsetWidth / 2}px,${H * .45}px) scale(.4)`; c.style.transitionDelay = '0ms'; });
      svg.innerHTML = ''; return;
    }
    const cw = chips.map(c => c.offsetWidth), ch = chips.map(c => c.offsetHeight);
    // start: iz sredine jela (bez animacije), pa razlet
    chips.forEach((c, i) => { c.style.transition = 'none'; c.style.transform = `translate(${W / 2 - cw[i] / 2}px,${H * .42 - ch[i] / 2}px) scale(.3)`; });
    void st.offsetWidth; chips.forEach(c => { c.style.transition = ''; });
    let plate; const pos = [];
    if (mode === 'stack') {
      const pw = Math.min(W * .46, 260), phh = Math.min(H * .74, pw * 1.5), px = Math.max(12, W * .05), py = (H - phh) / 2 - H * .02;
      plate = { x: px, y: py, w: pw, h: phh, r: 26 };
      const colX = px + pw + 30, gap = 6, tot = ch.reduce((a, b) => a + b, 0) + gap * (chips.length - 1);
      let y = Math.max(py, H / 2 - tot / 2 - H * .02);
      chips.forEach((c, i) => { c.style.maxWidth = (W - colX - 10) + 'px'; });
      const cw2 = chips.map(c => c.offsetWidth), ch2 = chips.map(c => c.offsetHeight);
      chips.forEach((c, i) => { pos.push({ x: colX, y, w: cw2[i], h: ch2[i] }); y += ch2[i] + gap; });
    } else {
      const d = Math.min(W * .6, H * .44, 300), cx = W / 2, cy = Math.max(d / 2 + 70, H * .33);
      plate = { x: cx - d / 2, y: cy - d / 2, w: d, h: d, r: d / 2 };
      const maxW = W - 24, gapX = 8, gapY = 8, top0 = cy + d / 2 + 20;
      const rows = []; let row = [], rw = 0;
      chips.forEach((c, i) => { const w = cw[i]; if (row.length && rw + gapX + w > maxW) { rows.push(row); row = []; rw = 0; } rw += (row.length ? gapX : 0) + w; row.push(i); });
      if (row.length) rows.push(row);
      let y = top0; const avail = H - top0 - 16, need = rows.reduce((a, r) => a + Math.max(...r.map(i => ch[i])) + gapY, 0);
      if (need > avail) { y = Math.max(cy + d / 2 - (need - avail), 70); }
      rows.forEach(r => { const w = r.reduce((a, i) => a + cw[i], 0) + gapX * (r.length - 1); let x = (W - w) / 2; const rh = Math.max(...r.map(i => ch[i])); r.forEach(i => { pos[i] = { x, y, w: cw[i], h: ch[i] }; x += cw[i] + gapX; }); y += rh + gapY; });
    }
    // fotografija → tanjir (skaliranje + izrez)
    const sx = plate.w / W, sy = plate.h / H, s = Math.max(sx, sy);
    const tx = plate.x + plate.w / 2 - W / 2, ty = plate.y + plate.h / 2 - H / 2;
    const cutX = (W * s - plate.w) / 2 / s, cutY = (H * s - plate.h) / 2 / s;
    ph.style.clipPath = `inset(${cutY}px ${cutX}px ${cutY}px ${cutX}px round ${plate.r / s}px)`;
    ph.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
    st.classList.add('open'); if (mode === 'stack') st.classList.add('tall');
    chips.forEach((c, i) => { const p = pos[i]; c.style.transitionDelay = (reduced ? 0 : 160 + i * 55) + 'ms'; c.style.transform = `translate(${p.x}px,${p.y}px)`; });
    if (mode === 'stack') {
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const x1 = plate.x + plate.w - 6;
      svg.innerHTML = pos.map((p, i) => { const yy = p.y + p.h / 2, ty2 = plate.y + plate.h * (.12 + .76 * (i / Math.max(1, pos.length - 1))); return `<path d="M${p.x - 4} ${yy} C ${p.x - 18} ${yy}, ${x1 + 14} ${ty2}, ${x1} ${ty2}" style="opacity:0;transition:opacity .4s ${300 + i * 55}ms"/>`; }).join('');
      requestAnimationFrame(() => $$('path', svg).forEach(pth => { pth.style.opacity = 1; }));
    } else svg.innerHTML = '';
  }

  /* ---------- video jela (Higgsfield): video/<id>.mp4 ako postoji ---------- */
  const VCACHE = {};
  function probeVideo(it, st) {
    const url = `video/${it.id}.mp4`;
    const use = () => { const ph = $('.ph', st); if (!ph || $('video', ph)) return; const v = document.createElement('video'); v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.setAttribute('playsinline', ''); v.src = url; v.addEventListener('loadeddata', () => { v.classList.add('ok'); const im = $('img', ph); if (im) im.style.display = 'none'; }); ph.appendChild(v); v.play().catch(() => { }); st.insertAdjacentHTML('beforeend', `<span class="vid-badge">${t('video')}</span>`); };
    if (VCACHE[url] === true) return use(); if (VCACHE[url] === false) return;
    fetch(url, { method: 'HEAD', cache: 'no-cache' }).then(r => { VCACHE[url] = r.ok && /video|octet/.test(r.headers.get('content-type') || 'video'); if (VCACHE[url] && st.isConnected) use(); }).catch(() => { VCACHE[url] = false; });
  }

  function drinksView() {
    const D = window.KS_DRINKS;
    let h = `<section class="cathead">${pic(srcs('c:pica-karta'), '', true)}<div class="in"><h1>${t('drinks')}</h1></div></section><div class="wrap"><nav class="chips">${CATS.map(x => `<a href="#/meni/${x.id}">${esc(catName(x))}</a>`).join('')}<a class="on" href="#/pica">${esc(t('drinks'))}</a></nav>`;
    if (D && D.cats && D.cats.length) {
      for (const c of D.cats) {
        h += `<h2 class="h2" style="margin-top:22px">${esc(L === 'en' ? c.en : c.sr)}</h2><div class="list">`;
        for (const it of D.items.filter(x => x.cat === c.id)) h += `<div class="dish nophoto${soldOut(it) ? ' sold' : ''}"><span class="tx"><b>${esc(L === 'en' && it.en ? it.en : it.sr)}</b>${it.desc ? `<span class="ds">${esc(it.desc)}</span>` : ''}<span class="ft"><span class="pr">${(it.var || [[it.vol || '', it.price]]).map((v, i) => `${v[0] ? esc(v[0]) + ' · ' : ''}${money(priceOf(Object.assign({ var: it.var }, it), i))}`).join('  ·  ')}</span></span></span></div>`;
        h += `</div>`;
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
      h += `<div class="mylist">${LIST.map((x, i) => { const it = BY[x.id]; return `<div class="mli"><span><b>${esc(nm(it))}</b><small>${it.var ? esc(it.var[x.v][0]) + ' · ' : ''}${money(priceOf(it, x.v))}</small></span><div class="qty"><button type="button" data-lq="${i}:-1" aria-label="−">−</button><span>${x.q}</span><button type="button" data-lq="${i}:1" aria-label="+">+</button></div></div>`; }).join('')}</div>
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
    el.innerHTML = `<button type="button" class="x" aria-label="Zatvori">×</button><h2>${t('l_t')}</h2><div class="tb">${TABLE ? t('table').toUpperCase() + ' ' + esc(TABLE) : 'KOŠNICA'}</div>${LIST.map(x => { const it = BY[x.id]; return `<div class="ln"><b>${x.q}×</b><span>${esc(it.sr)}${it.var ? ' · ' + esc(it.var[x.v][0]) : ''}</span></div>`; }).join('')}<div class="ln" style="border:0"><b></b><span>${t('l_total')}: ${money(listTotal())}</span></div>`;
    el.querySelector('.x').addEventListener('click', () => el.remove()); document.body.appendChild(el);
  }

  /* ---------- klikovi ---------- */
  document.addEventListener('click', async e => {
    const hx = e.target.closest('[data-hit]'); if (hx) hit(hx.dataset.hit);
    const add = e.target.closest('[data-add]'); if (add) { e.preventDefault(); addToList(add.dataset.add); return; }
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
      if (k === 'sendOrder') { a.disabled = true; await sendLive('order', { items: LIST.map(x => { const it = BY[x.id]; return { id: x.id, n: it.sr, v: it.var ? it.var[x.v][0] : '', q: x.q, e: priceOf(it, x.v) || 0 }; }) }); LIST = []; saveList(); listSheet(); }
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
    const shots = W.shots.map((s, i) => `<div class="shot" data-i="${i}"><img alt="" referrerpolicy="no-referrer" data-s="${esc(srcs(s.img).join('|'))}" src="${esc(srcs(s.img)[0] || '')}" style="transform-origin:${s.fx}% ${s.fy}%"></div>`).join('');
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
  render();
  walkIn(() => { hit('open'); if (TABLE) hit('table'); });
  TT.api('/menu', { fast: true }).then(r => { OVR = Object.assign({ soldOut: {}, price: {} }, r.menu || {}); render(true); }).catch(() => { });
  TT.onChange(m => { if (m && !m.self && /menu|reset/.test(m.path || '')) TT.api('/menu', { fast: true }).then(r => { OVR = Object.assign({ soldOut: {}, price: {} }, r.menu || {}); render(true); }).catch(() => { }); });
  if (TT.myLive().some(x => ['new', 'ack'].includes(x.status))) TT.watchGuest();
  if (TT.mode === 'live') setInterval(() => { if (document.visibilityState === 'visible') TT.api('/menu', { fast: true }).then(r => { const s = JSON.stringify(r.menu || {}); if (s !== JSON.stringify(OVR)) { OVR = Object.assign({ soldOut: {}, price: {} }, r.menu || {}); if (!sh.classList.contains('on')) render(true); } }).catch(() => { }); }, 60000);
})();
