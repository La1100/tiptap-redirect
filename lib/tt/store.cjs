/* TipTap — pohrana podataka za jezgru (getJSON / setJSON s etagom, kao Netlify Blobs).
   supabaseStore: tablica public.tt_kv u Supabaseu (EU), preko REST-a — bez dodatnih paketa.
   memoryStore:   u memoriji, za lokalno testiranje.
   setJSON(k, v, c):  c = 'new' → samo ako ključ još ne postoji
                      c = etag  → samo ako se zapis u međuvremenu nije promijenio (inače false)
                      c = null  → upiši uvijek                                              */
'use strict';
const crypto = require('crypto');
const newTag = () => crypto.randomUUID();

function supabaseStore({ url, key, table = 'tt_kv', fetchImpl = fetch }) {
  const base = String(url).replace(/\/$/, '') + '/rest/v1/' + table;
  const H = extra => Object.assign({ apikey: key, Authorization: 'Bearer ' + key, 'content-type': 'application/json', Accept: 'application/json' }, extra || {});
  const eq = s => 'eq.' + encodeURIComponent(s);
  async function call(u, opt) {
    let last;
    for (let i = 0; i < 3; i++) {   // kratki ponovni pokušaj kod mrežne greške ili 5xx
      try {
        const r = await fetchImpl(u, opt);
        if (r.status >= 500) { last = new Error('supabase ' + r.status); await new Promise(z => setTimeout(z, 120 * (i + 1))); continue; }
        if (!r.ok) { const t = await r.text().catch(() => ''); const e = new Error('supabase ' + r.status + ' ' + t.slice(0, 200)); e.status = r.status; throw e; }
        const t = await r.text();
        return t ? JSON.parse(t) : [];
      } catch (e) {
        if (e.status) throw e;
        last = e; await new Promise(z => setTimeout(z, 120 * (i + 1)));
      }
    }
    throw last;
  }
  return {
    async getJSON(k) {
      const rows = await call(`${base}?k=${eq(k)}&select=v,etag`, { headers: H() });
      return rows && rows.length ? { data: rows[0].v, etag: rows[0].etag } : null;
    },
    async setJSON(k, v, c) {
      const tag = newTag(), now = new Date().toISOString();
      if (c === 'new') {
        const rows = await call(base, { method: 'POST', headers: H({ Prefer: 'return=representation,resolution=ignore-duplicates' }), body: JSON.stringify([{ k, v, etag: tag, updated_at: now }]) });
        return !!(rows && rows.length && rows[0].etag === tag);
      }
      if (c) {
        const rows = await call(`${base}?k=${eq(k)}&etag=${eq(c)}`, { method: 'PATCH', headers: H({ Prefer: 'return=representation' }), body: JSON.stringify({ v, etag: tag, updated_at: now }) });
        return !!(rows && rows.length);
      }
      await call(base, { method: 'POST', headers: H({ Prefer: 'return=minimal,resolution=merge-duplicates' }), body: JSON.stringify([{ k, v, etag: tag, updated_at: now }]) });
      return true;
    }
  };
}

function memoryStore() {
  const m = new Map();
  return {
    async getJSON(k) { const x = m.get(k); return x ? { data: JSON.parse(x.t), etag: x.e } : null; },
    async setJSON(k, v, c) {
      const cur = m.get(k);
      if (c === 'new' && cur) return false;
      if (c && c !== 'new' && (!cur || cur.e !== c)) return false;
      m.set(k, { t: JSON.stringify(v), e: newTag() }); return true;
    },
    _map: m
  };
}

module.exports = { supabaseStore, memoryStore };
