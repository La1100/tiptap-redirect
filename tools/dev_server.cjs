/* Lokalni poslužitelj za testiranje pravog sustava: statične datoteke iz korijena repozitorija
   + /api/<lokal>/… preko iste funkcije kao na Vercelu (api/tt.js), s podacima u memoriji
   (ili u Supabaseu ako su postavljeni SUPABASE_URL i SUPABASE_SERVICE_ROLE_KEY).
   node tools/dev_server.cjs [port]                                                          */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const { handle } = require('../api/tt.js');
const { memoryStore } = require('../lib/tt/store.cjs');
const ROOT = path.join(__dirname, '..'), PORT = +process.argv[2] || 8850;
const store = process.env.SUPABASE_URL ? undefined : memoryStore();
const env = Object.assign({ SITE_URL: `http://127.0.0.1:${PORT}/v`, ADMIN_PIN_QCLUB: '1111', ADMIN_PIN_KAFANICA: '2222', ADMIN_PIN_BURE: '3333', ADMIN_PIN_BROOKLYN: '4444',
  HOSTESS_PIN_QCLUB: '1000', HOSTESS_PIN_KAFANICA: '2000', HOSTESS_PIN_BURE: '3000', OWNER_PIN: '2580' }, process.env);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  const m = /^\/api\/(qclub|kafanica|bure|brooklyn|group)\/(.*)$/.exec(u.pathname);
  if (m) { u.pathname = '/api/tt'; u.searchParams.set('__v', m[1]); u.searchParams.set('__p', m[2]); req.url = u.pathname + u.search; return handle(req, res, { store, env }); }
  let p = path.join(ROOT, decodeURIComponent(u.pathname));
  if (!p.startsWith(ROOT)) { res.statusCode = 403; return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (e, d) => { if (e) { res.statusCode = 404; return res.end('404'); } res.setHeader('content-type', TYPES[path.extname(p)] || 'application/octet-stream'); res.end(d); });
}).listen(PORT, '127.0.0.1', () => console.log('dev server http://127.0.0.1:' + PORT + ' (' + (store ? 'memorija' : 'Supabase') + ')'));
