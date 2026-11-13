/* TipTap × BHT — API svih lokala: /api/<lokal>/…  i  /api/group/…
   (vercel.json prepisuje te adrese na ovu funkciju s ?__v=<lokal>&__p=<ostatak>).
   Logika je u lib/tt/core.cjs (ista kao u demu), podaci u Supabaseu (tablica tt_kv).
   U Vercelu (Settings → Environment Variables) su samo tajne: SUPABASE_SERVICE_ROLE_KEY i PIN-ovi.
   Adrese koje nisu tajne zadane su ovdje; Vercel varijabla istog imena ih može zamijeniti. */
'use strict';
const TT = require('../lib/tt/core.cjs');
const REPORT = require('../lib/tt/report.cjs');
const { supabaseStore } = require('../lib/tt/store.cjs');

const DEFAULTS = {
  SUPABASE_URL: 'https://lrnqfgfraziwacxehdrk.supabase.co',   // projekt tiptap-bht (EU, Stockholm)
  SITE_URL: 'https://tiptapreviews.com/v'                      // za linkove u porukama gostima
};
let ENV = null;
function liveEnv() {   // Vercel varijable bez slučajnih razmaka / novih redova s kopiranja
  if (ENV) return ENV;
  const e = Object.assign({}, DEFAULTS);
  for (const [k, val] of Object.entries(process.env)) if (typeof val === 'string' && val.trim()) e[k] = val.trim();
  return (ENV = e);
}

let store = null;
function getStore() {
  if (store) return store;
  const env = liveEnv();
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;
  if (!env.SUPABASE_URL || !key) return null;
  return (store = supabaseStore({ url: env.SUPABASE_URL, key }));
}

// adresa gosta/osoblja — zaštita PIN-a zaključava samo adresu s koje se pogađa, ne sve korisnike
function clientIp(req) {
  const h = req.headers || {};
  return String(h['x-real-ip'] || String(h['x-forwarded-for'] || '').split(',')[0] || (req.socket && req.socket.remoteAddress) || '').trim().slice(0, 64);
}

function readBody(req) {
  if (req.body !== undefined) return Promise.resolve(typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {}));
  return new Promise(res => { let d = ''; req.on('data', c => { d += c; if (d.length > 2e5) req.destroy(); }); req.on('end', () => res(d)); req.on('error', () => res('')); });
}

async function handle(req, res, opt = {}) {
  res.setHeader('cache-control', 'no-store');
  const S = opt.store || getStore();
  if (!S) { res.statusCode = 503; res.setHeader('content-type', 'application/json; charset=utf-8'); return res.end(JSON.stringify({ error: 'nodb' })); }
  const u = new URL(req.url, 'https://' + (req.headers.host || 'localhost'));
  const v = u.searchParams.get('__v') || '', p = u.searchParams.get('__p') || '';
  u.searchParams.delete('__v'); u.searchParams.delete('__p');
  if (!/^[a-z]+$/.test(v) || !/^[\w\-/]*$/.test(p)) { res.statusCode = 404; return res.end('{"error":"notfound"}'); }
  const qs = u.searchParams.toString();
  const url = `https://${req.headers.host || 'localhost'}/api/${v}/${p}${qs ? '?' + qs : ''}`;
  const method = req.method === 'POST' ? 'POST' : 'GET';
  const body = method === 'POST' ? await readBody(req) : undefined;
  const headers = { 'content-type': 'application/json' };
  const pin = req.headers['x-admin-pin']; if (pin) headers['x-admin-pin'] = String(pin).slice(0, 40);
  const ip = clientIp(req); if (ip) headers['x-forwarded-for'] = ip;
  const env = opt.env || liveEnv();
  let out;
  try {
    // mjesečni izvještaj i Google ocjene (lib/tt/report.cjs): PIN direktora provjerava ista prijava kao pregled grupe
    if (v === 'group' && (p === 'report' || p === 'google')) {
      const auth = await TT.router.route(new Request(`https://${req.headers.host || 'localhost'}/api/group/login`, { method: 'POST', headers }), { store: S, env });
      let r;
      if (auth.status !== 200) r = Object.assign(await auth.json().catch(() => ({ error: 'auth' })), { status: auth.status });
      else if (p === 'report' && method === 'GET') r = await REPORT.monthReport(S, u.searchParams.get('month') || '', env);
      else if (p === 'google' && method === 'POST') { let b = {}; try { b = JSON.parse(body || '{}'); } catch (e) { } r = await REPORT.setGoogle(S, b); }
      else r = { error: 'notfound', status: 404 };
      res.statusCode = r.error ? (r.status || 400) : 200;
      res.setHeader('content-type', 'application/json; charset=utf-8');
      if (r.error) return res.end(JSON.stringify({ error: r.error }));
      return res.end(JSON.stringify(r));
    }
    out = await TT.router.route(new Request(url, { method, headers, body }), { store: S, env });
  } catch (e) {
    console.error(e);
    res.statusCode = 500; res.setHeader('content-type', 'application/json; charset=utf-8'); return res.end('{"error":"server"}');
  }
  res.statusCode = out.status;
  out.headers.forEach((val, k) => res.setHeader(k, val));
  res.end(await out.text());
}

module.exports = (req, res) => handle(req, res);
module.exports.handle = handle;
