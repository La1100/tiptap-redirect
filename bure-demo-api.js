/* DEMO: backend rezervacija radi u pregledniku. Podaci ostaju samo na ovom uređaju. */
(function(){'use strict';
window.BURE_DEMO=true;
const crypto={randomBytes(n){const a=new Uint8Array(n);self.crypto.getRandomValues(a);a.toString=function(){return Array.from(this,b=>b.toString(16).padStart(2,'0')).join('')};return a}};
const C=(()=>{/* =====================================================================
   BURE BAR — REZERVACIJE: poslovna logika (bez ovisnosti o Netlifyju)
   Vrijeme: sve u Europe/Zagreb. Termini su minute od ponoći "poslovnog
   dana" — može biti > 1440 (npr. 00:30 iza ponoći = 1470).
   ===================================================================== */


const TZ = 'Europe/Zagreb';

/* ---------- ZADANA KONFIGURACIJA (mijenja se u adminu → Postavke) ---------- */
const DEFAULT_CONFIG = {
  venue: 'Bure Bar',
  phone: '+385 91 605 2339',
  // Tlocrt: platno 1000 × 640 jedinica. OKVIRNI raspored — prilagodi u adminu (Uredi tlocrt).
  plan: {
    w: 1000, h: 640,
    walls: [
      { type: 'bar', x: 40, y: 40, w: 90, h: 400, label: 'ŠANK' },
      { type: 'dj', x: 420, y: 30, w: 160, h: 60, label: 'DJ' },
      { type: 'door', x: 440, y: 610, w: 120, h: 30, label: 'ULAZ' },
      { type: 'wc', x: 880, y: 560, w: 100, h: 60, label: 'WC' }
    ]
  },
  zones: [
    { id: 'sank', name: { hr: 'Uz šank', en: 'By the bar' } },
    { id: 'bacve', name: { hr: 'Bačve', en: 'Barrel tables' } },
    { id: 'sala', name: { hr: 'Sala', en: 'Main room' } },
    { id: 'separe', name: { hr: 'Separei', en: 'Booths' } }
  ],
  tables: [
    { id: 'S1', zone: 'sank', shape: 'round', x: 170, y: 80, r: 26, min: 1, max: 2 },
    { id: 'S2', zone: 'sank', shape: 'round', x: 170, y: 170, r: 26, min: 1, max: 2 },
    { id: 'S3', zone: 'sank', shape: 'round', x: 170, y: 260, r: 26, min: 1, max: 2 },
    { id: 'S4', zone: 'sank', shape: 'round', x: 170, y: 350, r: 26, min: 1, max: 2 },
    { id: 'B1', zone: 'bacve', shape: 'barrel', x: 300, y: 160, r: 34, min: 2, max: 4 },
    { id: 'B2', zone: 'bacve', shape: 'barrel', x: 300, y: 290, r: 34, min: 2, max: 4 },
    { id: 'B3', zone: 'bacve', shape: 'barrel', x: 300, y: 420, r: 34, min: 2, max: 4 },
    { id: 'B4', zone: 'bacve', shape: 'barrel', x: 420, y: 520, r: 34, min: 2, max: 4 },
    { id: 'T1', zone: 'sala', shape: 'rect', x: 430, y: 160, w: 100, h: 64, min: 2, max: 4 },
    { id: 'T2', zone: 'sala', shape: 'rect', x: 580, y: 160, w: 100, h: 64, min: 2, max: 4 },
    { id: 'T3', zone: 'sala', shape: 'rect', x: 430, y: 290, w: 100, h: 64, min: 2, max: 4 },
    { id: 'T4', zone: 'sala', shape: 'rect', x: 580, y: 290, w: 100, h: 64, min: 2, max: 4 },
    { id: 'T5', zone: 'sala', shape: 'rect', x: 505, y: 420, w: 150, h: 70, min: 4, max: 8 },
    { id: 'V1', zone: 'separe', shape: 'booth', x: 760, y: 90, w: 180, h: 110, min: 4, max: 8, vip: true },
    { id: 'V2', zone: 'separe', shape: 'booth', x: 760, y: 240, w: 180, h: 110, min: 4, max: 8, vip: true },
    { id: 'V3', zone: 'separe', shape: 'booth', x: 760, y: 390, w: 180, h: 110, min: 6, max: 12, vip: true }
  ],
  // Kada se primaju rezervacije (zadnji termin dolaska) po danu u tjednu. null = ne primamo.
  // 0 = nedjelja … 6 = subota. "to" smije biti iza ponoći, npr. "00:30".
  hours: {
    0: null,
    1: { from: '18:00', to: '22:00' },
    2: { from: '18:00', to: '22:00' },
    3: { from: '18:00', to: '22:00' },
    4: { from: '18:00', to: '23:00' },
    5: { from: '18:00', to: '23:30' },
    6: { from: '18:00', to: '23:30' }
  },
  slotMinutes: 30,        // korak termina
  durationMinutes: 150,   // koliko dugo je stol "zauzet" jednom rezervacijom
  leadMinutes: 60,        // najkasnije koliko minuta unaprijed gost može rezervirati online
  daysAhead: 30,          // koliko dana unaprijed
  maxParty: 16,
  holdMinutes: 15,        // koliko se stol drži ako gost kasni (informativno)
  closedDates: [],        // npr. ["2026-12-24"]
  autoConfirm: false,     // false = svaki zahtjev čeka potvrdu osoblja
  rules: {
    hr: 'Za separee petkom i subotom moguća je minimalna potrošnja — osoblje će te obavijestiti pri potvrdi.',
    en: 'Booths on Fridays and Saturdays may have a minimum spend — staff will let you know when confirming.'
  }
};

/* ---------- vrijeme ---------- */
function zagrebNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date()).map(x => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, min: (+p.hour) * 60 + (+p.minute) };
}
const toMin = s => { const [h, m] = String(s).split(':').map(Number); return h * 60 + m; };
const fmt = m => { const x = ((m % 1440) + 1440) % 1440; return String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0'); };
const weekday = d => new Date(d + 'T12:00:00Z').getUTCDay();
const addDays = (d, n) => { const t = new Date(d + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
const isDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d + 'T12:00:00Z'));

/** Svi termini dolaska za dan (minute od ponoći poslovnog dana). */
function slotsFor(cfg, date) {
  if ((cfg.closedDates || []).includes(date)) return [];
  const h = cfg.hours[weekday(date)];
  if (!h) return [];
  const from = toMin(h.from); let to = toMin(h.to);
  if (to < from) to += 1440;               // iza ponoći
  const out = [];
  for (let m = from; m <= to; m += cfg.slotMinutes) out.push(m);
  return out;
}

const ACTIVE = new Set(['pending', 'confirmed', 'seated']);
const overlaps = (a0, a1, b0, b1) => a0 < b1 && b0 < a1;

/** Je li stol slobodan u [start, start+duration). */
function tableFree(cfg, list, tableId, start, ignoreId) {
  const end = start + cfg.durationMinutes;
  return !list.some(r => r.tableId === tableId && ACTIVE.has(r.status) && r.id !== ignoreId && overlaps(start, end, r.start, r.end));
}
const fits = (t, party) => party >= (t.min || 1) && party <= t.max;

/** Najbolji slobodan stol za broj osoba (najmanji višak mjesta, ne-VIP prvo). */
function bestTable(cfg, list, party, start) {
  return cfg.tables.filter(t => fits(t, party) && tableFree(cfg, list, t.id, start))
    .sort((a, b) => (a.max - b.max) || ((a.vip ? 1 : 0) - (b.vip ? 1 : 0)))[0] || null;
}

/* ---------- validacija ---------- */
function cleanPhone(p) {
  let s = String(p || '').replace(/[^\d+]/g, '');
  if (s.startsWith('00')) s = '+' + s.slice(2);
  if (s.startsWith('0')) s = '+385' + s.slice(1);   // hrvatski lokalni zapis
  if (!s.startsWith('+')) s = '+' + s;
  return /^\+\d{8,15}$/.test(s) ? s : null;
}
const str = (v, n) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);
const token = (n = 16) => crypto.randomBytes(n).toString('hex');
function shortCode() { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s = ''; const b = crypto.randomBytes(6); for (const x of b) s += A[x % A.length]; return s; }
function safeEqual(a, b) { return String(a) === String(b); }

/* ---------- pohrana ----------
   store: { getJSON(key) → {data, etag}|null, setJSON(key, val, etag|null|'new') → boolean } */
const dayKey = d => `res/${d}`;
async function readDay(store, date) { const r = await store.getJSON(dayKey(date)); return { list: r?.data || [], etag: r?.etag || null }; }
/** Atomarna izmjena liste rezervacija za dan (optimistic concurrency, 5 pokušaja). */
async function mutateDay(store, date, fn) {
  for (let i = 0; i < 5; i++) {
    const { list, etag } = await readDay(store, date);
    const res = await fn(list);
    if (res && res.error) return res;
    const ok = await store.setJSON(dayKey(date), list, etag ?? 'new');
    if (ok) return res;
    await new Promise(r => setTimeout(r, 40 + Math.random() * 80));
  }
  return { error: 'busy', status: 503 };
}
async function getConfig(store) {
  const r = await store.getJSON('config');
  return r?.data ? { ...DEFAULT_CONFIG, ...r.data } : structuredClone(DEFAULT_CONFIG);
}
/** Kratki indeks id → datum (za gostov link i admin). */
async function setIndex(store, id, date) { await store.setJSON(`idx/${id}`, { date }, null); }
async function findDate(store, id) { const r = await store.getJSON(`idx/${id}`); return r?.data?.date || null; }

/* ---------- javni podaci ---------- */
function publicConfig(cfg) {
  const { venue, phone, plan, zones, tables, hours, slotMinutes, durationMinutes, leadMinutes, daysAhead, maxParty, holdMinutes, closedDates, rules, autoConfirm } = cfg;
  return { venue, phone, plan, zones, tables, hours, slotMinutes, durationMinutes, leadMinutes, daysAhead, maxParty, holdMinutes, closedDates, rules, autoConfirm };
}
async function availability(store, date) {
  const cfg = await getConfig(store);
  const { list } = await readDay(store, date);
  const now = zagrebNow();
  let slots = slotsFor(cfg, date);
  if (date === now.date) slots = slots.filter(m => m >= now.min + cfg.leadMinutes);
  const busy = list.filter(r => ACTIVE.has(r.status)).map(r => ({ t: r.tableId, s: r.start, e: r.end }));
  return { date, slots, busy, config: publicConfig(cfg), today: now.date };
}

/* ---------- akcije gosta ---------- */
async function createReservation(store, body, { admin = false } = {}) {
  const cfg = await getConfig(store);
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
    const slots = slotsFor(cfg, date);
    if (!slots.includes(start)) return { error: 'time', status: 400 };
    if (date === now.date && start < now.min + cfg.leadMinutes) return { error: 'time', status: 400 };
  } else if (!(start >= 0 && start < 2880)) return { error: 'time', status: 400 };

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
    const r = {
      id: token(8), code: shortCode(), key: token(16),
      date, start, end: start + cfg.durationMinutes, party, tableId: table.id,
      name, phone: phone || phoneRaw, email, note: str(body.note, 400), occasion: str(body.occasion, 30),
      lang: body.lang === 'en' ? 'en' : 'hr',
      status: admin ? (body.status === 'pending' ? 'pending' : 'confirmed') : (cfg.autoConfirm ? 'confirmed' : 'pending'),
      source: admin ? str(body.source || 'staff', 20) : 'web',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), history: []
    };
    list.push(r);
    return { ok: true, reservation: r, table };
  });
  if (res.ok) await setIndex(store, res.reservation.id, date);
  return res;
}
async function getReservation(store, id, key) {
  const date = await findDate(store, str(id, 40));
  if (!date) return { error: 'notfound', status: 404 };
  const { list } = await readDay(store, date);
  const r = list.find(x => x.id === id);
  if (!r || !safeEqual(r.key, key || '')) return { error: 'notfound', status: 404 };
  const cfg = await getConfig(store);
  return { ok: true, reservation: guestView(r), table: cfg.tables.find(t => t.id === r.tableId) || null, config: publicConfig(cfg) };
}
async function cancelByGuest(store, id, key) {
  const date = await findDate(store, str(id, 40));
  if (!date) return { error: 'notfound', status: 404 };
  return mutateDay(store, date, list => {
    const r = list.find(x => x.id === id);
    if (!r || !safeEqual(r.key, key || '')) return { error: 'notfound', status: 404 };
    if (!['pending', 'confirmed'].includes(r.status)) return { error: 'state', status: 409 };
    r.status = 'cancelled'; r.updatedAt = new Date().toISOString(); r.history.push({ at: r.updatedAt, by: 'guest', to: 'cancelled' });
    return { ok: true, reservation: r };
  });
}
const guestView = r => ({ id: r.id, code: r.code, date: r.date, start: r.start, end: r.end, party: r.party, tableId: r.tableId, name: r.name, status: r.status, note: r.note, occasion: r.occasion, lang: r.lang });

/* ---------- admin ---------- */
async function adminDay(store, date) {
  const cfg = await getConfig(store);
  const { list } = await readDay(store, date);
  return { ok: true, date, list: list.sort((a, b) => a.start - b.start), config: cfg, slots: slotsFor(cfg, date) };
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
    r.updatedAt = new Date().toISOString();
    r.history.push({ at: r.updatedAt, by: 'staff', from: before, to: r.status });
    return { ok: true, reservation: r, changedStatus: before !== r.status };
  });
  if (res.ok && moved && isDate(moved)) {
    // premjesti na drugi datum: obriši ovdje, dodaj tamo
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
  const keys = ['venue', 'phone', 'plan', 'zones', 'tables', 'hours', 'slotMinutes', 'durationMinutes', 'leadMinutes', 'daysAhead', 'maxParty', 'holdMinutes', 'closedDates', 'autoConfirm', 'rules'];
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
  // pretraga po imenu/telefonu/kodu u sljedećih 30 dana (+7 unatrag)
  const out = []; const s = String(q || '').toLowerCase().trim(); if (s.length < 2) return { ok: true, list: [] };
  for (let i = -7; i <= 30; i++) {
    const d = addDays(from, i); const { list } = await readDay(store, d);
    for (const r of list) if ([r.name, r.phone, r.code, r.email].some(x => String(x || '').toLowerCase().includes(s))) out.push(r);
  }
  return { ok: true, list: out };
}
async function adminUpcoming(store, from, days = 14) {
  const out = [];
  for (let i = 0; i < days; i++) { const d = addDays(from, i); const { list } = await readDay(store, d); out.push({ date: d, pending: list.filter(r => r.status === 'pending').length, total: list.filter(r => ACTIVE.has(r.status)).length, guests: list.filter(r => ACTIVE.has(r.status)).reduce((a, r) => a + r.party, 0) }); }
  return { ok: true, days: out };
}

/* ---------- tekstovi poruka ---------- */
const DAYS = { hr: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'], en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] };
function humanDate(date, lang = 'hr') { const [y, m, d] = date.split('-'); return `${DAYS[lang][weekday(date)]}, ${+d}.${+m}.${lang === 'hr' ? '' : ' ' + y}`.trim(); }
function guestMessage(r, cfg, site, kind) {
  const L = r.lang === 'en' ? 'en' : 'hr';
  const link = `${site}/rezervacije/?r=${r.id}&k=${r.key}`;
  const when = `${humanDate(r.date, L)} ${fmt(r.start)}`;
  if (kind === 'confirmed') return L === 'hr'
    ? `Pozdrav ${r.name}! 🍻 Tvoja rezervacija u ${cfg.venue} je POTVRĐENA.\n📅 ${when}\n👥 ${r.party} os. · stol ${r.tableId}\nStol držimo ${cfg.holdMinutes} min. Promjene/otkaz: ${link}\nVidimo se!`
    : `Hi ${r.name}! 🍻 Your reservation at ${cfg.venue} is CONFIRMED.\n📅 ${when}\n👥 ${r.party} ppl · table ${r.tableId}\nWe hold the table for ${cfg.holdMinutes} min. Changes/cancel: ${link}\nSee you!`;
  if (kind === 'declined') return L === 'hr'
    ? `Pozdrav ${r.name}, nažalost za ${when} nemamo slobodan stol za ${r.party} os. Javi se na ${cfg.phone} pa ćemo naći drugi termin. ${cfg.venue}`
    : `Hi ${r.name}, unfortunately we have no table for ${r.party} on ${when}. Call ${cfg.phone} and we'll find another time. ${cfg.venue}`;
  return '';
}
function staffMessage(r, cfg, site) {
  return `🆕 Nova rezervacija ${cfg.venue}\n📅 ${humanDate(r.date)} ${fmt(r.start)}\n👥 ${r.party} os. · stol ${r.tableId}\n👤 ${r.name} · ${r.phone}${r.occasion ? `\n🎉 ${r.occasion}` : ''}${r.note ? `\n📝 ${r.note}` : ''}\nKod: ${r.code}\nPotvrdi: ${site}/admin/#${r.date}`;
}
const waLink = (phone, text) => `https://wa.me/${String(phone).replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;

return {TZ, DEFAULT_CONFIG, zagrebNow, toMin, fmt, weekday, addDays, isDate, slotsFor, overlaps, tableFree, fits, bestTable, cleanPhone, token, shortCode, safeEqual, getConfig, publicConfig, availability, createReservation, getReservation, cancelByGuest, guestView, adminDay, adminUpdate, adminSaveConfig, adminSearch, adminUpcoming, humanDate, guestMessage, staffMessage, waLink};})();
/* HTTP router za /api/* — neovisan o Netlifyju (lokalno se testira s mock pohranom). */


const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const fail = r => json({ error: r.error }, r.status || 400);

/* ---------- obavijesti ----------
   ENV (Netlify → Site configuration → Environment variables):
   ADMIN_PIN          PIN za admin stranicu (obavezno)
   SITE_URL           npr. https://bure-bar.netlify.app (za linkove u porukama)
   RESEND_API_KEY     (neobavezno) e-mail preko resend.com
   MAIL_FROM          npr. "Bure Bar <rezervacije@tvoja-domena.hr>"
   NOTIFY_EMAIL       e-mail(ovi) osoblja, odvojeni zarezom
   CALLMEBOT          (neobavezno) WhatsApp osoblju preko callmebot.com: "+38591xxxxxxx:APIKEY,+38598yyyyyyy:APIKEY2"
*/
async function sendEmail(env, to, subject, text) {
  if (!env.RESEND_API_KEY || !to) return false;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.MAIL_FROM || 'Bure Bar <onboarding@resend.dev>', to: String(to).split(',').map(s => s.trim()).filter(Boolean), subject, text })
    });
    return r.ok;
  } catch { return false; }
}
async function sendWhatsAppStaff(env, text) {
  if (!env.CALLMEBOT) return false;
  const jobs = env.CALLMEBOT.split(',').map(s => s.trim()).filter(Boolean).map(pair => {
    const i = pair.lastIndexOf(':'); const phone = pair.slice(0, i).replace(/[^\d+]/g, ''), key = pair.slice(i + 1);
    return fetch(`https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(key)}`).then(r => r.ok).catch(() => false);
  });
  return (await Promise.all(jobs)).some(Boolean);
}
async function notifyStaff(env, r, cfg, site) {
  const text = C.staffMessage(r, cfg, site);
  await Promise.all([
    sendWhatsAppStaff(env, text),
    sendEmail(env, env.NOTIFY_EMAIL, `Nova rezervacija: ${C.humanDate(r.date)} ${C.fmt(r.start)} · ${r.party} os. · ${r.name}`, text)
  ]);
}

function isAdmin(req, env) {
  const pin = req.headers.get('x-admin-pin') || '';
  return !!env.ADMIN_PIN && C.safeEqual(pin, env.ADMIN_PIN);
}

async function route(req, { store, env, waitUntil }) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/(\.netlify\/functions\/api|api)/, '') || '/';
  const site = (env.SITE_URL || url.origin).replace(/\/$/, '');
  const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
  const later = p => (waitUntil ? waitUntil(p) : p);

  try {
    /* ----- javno ----- */
    if (path === '/availability' && req.method === 'GET') {
      const date = url.searchParams.get('date') || C.zagrebNow().date;
      if (!C.isDate(date)) return json({ error: 'date' }, 400);
      return json(await C.availability(store, date));
    }
    if (path === '/reserve' && req.method === 'POST') {
      const r = await C.createReservation(store, body);
      if (r.error) return fail(r);
      const cfg = await C.getConfig(store);
      await later(notifyStaff(env, r.reservation, cfg, site));
      if (r.reservation.status === 'confirmed' && r.reservation.email)
        await later(sendEmail(env, r.reservation.email, `${cfg.venue} — rezervacija ${r.reservation.code}`, C.guestMessage(r.reservation, cfg, site, 'confirmed')));
      return json({ ok: true, reservation: { ...C.guestView(r.reservation), key: r.reservation.key }, table: r.table });
    }
    if (path === '/reservation' && req.method === 'GET') {
      const r = await C.getReservation(store, url.searchParams.get('id'), url.searchParams.get('k'));
      return r.error ? fail(r) : json(r);
    }
    if (path === '/cancel' && req.method === 'POST') {
      const r = await C.cancelByGuest(store, body.id, body.k);
      if (r.error) return fail(r);
      const cfg = await C.getConfig(store); const x = r.reservation;
      const text = `❌ Gost je OTKAZAO: ${C.humanDate(x.date)} ${C.fmt(x.start)} · ${x.party} os. · ${x.name} · stol ${x.tableId}`;
      await later(Promise.all([sendWhatsAppStaff(env, text), sendEmail(env, env.NOTIFY_EMAIL, 'Otkazana rezervacija ' + x.code, text)]));
      return json({ ok: true, reservation: C.guestView(x) });
    }

    /* ----- admin ----- */
    if (path.startsWith('/admin')) {
      if (!env.ADMIN_PIN) return json({ error: 'nopin' }, 500);
      if (!isAdmin(req, env)) { await new Promise(r => setTimeout(r, 600)); return json({ error: 'auth' }, 401); }
      const a = path.slice(6);
      if (a === '/login') return json({ ok: true });
      if (a === '/day') { const d = url.searchParams.get('date'); if (!C.isDate(d)) return json({ error: 'date' }, 400); return json(await C.adminDay(store, d)); }
      if (a === '/upcoming') return json(await C.adminUpcoming(store, C.zagrebNow().date, 14));
      if (a === '/search') return json(await C.adminSearch(store, url.searchParams.get('q'), C.zagrebNow().date));
      if (a === '/create' && req.method === 'POST') { const r = await C.createReservation(store, body, { admin: true }); return r.error ? fail(r) : json(r); }
      if (a === '/update' && req.method === 'POST') {
        const r = await C.adminUpdate(store, body);
        if (r.error) return fail(r);
        const cfg = await C.getConfig(store); const x = r.reservation;
        let wa = null;
        if (r.changedStatus && (x.status === 'confirmed' || x.status === 'declined')) {
          const msg = C.guestMessage(x, cfg, site, x.status);
          if (x.phone) wa = C.waLink(x.phone, msg);
          if (x.email && body.notify !== false) await later(sendEmail(env, x.email, `${cfg.venue} — ${x.status === 'confirmed' ? (x.lang === 'en' ? 'reservation confirmed' : 'rezervacija potvrđena') : (x.lang === 'en' ? 'reservation' : 'rezervacija')} ${x.code}`, msg));
        }
        return json({ ok: true, reservation: x, wa });
      }
      if (a === '/config' && req.method === 'GET') return json({ ok: true, config: await C.getConfig(store), env: { email: !!env.RESEND_API_KEY && !!env.NOTIFY_EMAIL, whatsapp: !!env.CALLMEBOT } });
      if (a === '/config' && req.method === 'POST') { const r = await C.adminSaveConfig(store, body.config || {}); return r.error ? fail(r) : json(r); }
      if (a === '/test-notify' && req.method === 'POST') {
        const text = `✅ Test obavijesti — ${new Date().toLocaleString('hr-HR', { timeZone: C.TZ })}`;
        const [w, e] = await Promise.all([sendWhatsAppStaff(env, text), sendEmail(env, env.NOTIFY_EMAIL, 'Test obavijesti rezervacija', text)]);
        return json({ ok: true, whatsapp: w, email: e });
      }
    }
    return json({ error: 'notfound' }, 404);
  } catch (e) {
    console.error(e);
    return json({ error: 'server' }, 500);
  }
}

const P='bure_demo2:',mem={};
const rd=k=>{try{return localStorage.getItem(P+k)}catch(e){return mem[k]??null}};
const wr=(k,v)=>{try{localStorage.setItem(P+k,v)}catch(e){mem[k]=v}};
const hash=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return String(h)+':'+s.length};
const store={
  async getJSON(k){const t=rd(k);return t==null?null:{data:JSON.parse(t),etag:hash(t)}},
  async setJSON(k,v,cond){const t=rd(k);if(cond==='new'&&t!=null)return false;if(cond&&cond!=='new'&&(t==null||hash(t)!==cond))return false;wr(k,JSON.stringify(v));return true}
};
const base=location.href.replace(/[?#].*$/,'').replace(/(rezervacije|admin)\/[^/]*$/,'').replace(/[^/]*$/,'').replace(/\/$/,'');
const env={ADMIN_PIN:'1234',SITE_URL:base};
let seeded=null;
async function seed(){
  if(rd('seeded'))return;wr('seeded','1');
  const now=C.zagrebNow(),d=now.date,d1=C.addDays(d,1);let fri=d;for(let i=0;i<7;i++){if(C.weekday(C.addDays(d,i))===5){fri=C.addDays(d,i);break}}
  const S=[[d,1140,4,'T1','Ana Kovač','+385911234567','confirmed','rodjendan','Primjer rezervacije'],[d,1200,6,'V1','Luka Babić','+385981112223','pending','','Primjer — čeka potvrdu'],[d,1260,2,'B2','Petra Jurić','+385957778889','confirmed','',''],
    [d1,1230,8,'T5','Ivan Novak','+385913334445','pending','posao','Primjer'],[fri,1260,10,'V3','Marko Perić','+385924445556','confirmed','momacka','Primjer — momačka']];
  for(const [date,start,party,tableId,name,phone,status,occasion,note] of S)
    await C.createReservation(store,{date,start,party,tableId,name,phone,status,occasion,note,source:status==='pending'?'web':'telefon'},{admin:true});
}
const real=window.fetch.bind(window);
window.fetch=async function(input,init){
  const u=typeof input==='string'?input:(input&&input.url)||'';
  const isApi=u.startsWith('/api/');const isForm=u==='/'&&init&&init.method==='POST';
  if(!isApi&&!isForm)return real(input,init);
  await new Promise(r=>setTimeout(r,180));
  if(isForm)return new Response('ok',{status:200});
  seeded=seeded||seed();await seeded;
  return route(new Request('https://demo.burebar'+u,init),{store,env});
};
})();
