/* TipTap × BHT — API svih lokala: /api/<lokal>/…  i  /api/group/…
   (vercel.json prepisuje te adrese na ovu funkciju s ?__v=<lokal>&__p=<ostatak>).
   Logika je u lib/tt/core.cjs (ista kao u demu), podaci u Supabaseu (tablica tt_kv). */
'use strict';
const TT = require('../lib/tt/core.cjs');
const { supabaseStore } = require('../lib/tt/store.cjs');

let store = null;
function getStore() {
  if (store) return store;
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return (store = supabaseStore({ url, key }));
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
  const env = opt.env || process.env;
  let out;
  try {
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
