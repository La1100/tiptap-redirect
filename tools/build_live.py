#!/usr/bin/env python3
"""TipTap × BHT — pravi sustav iz provjerenog dema.

Demo (demo/…) je izvor istine: sve stranice i zajednička jezgra (lokali, rezervacije,
osoblje, cjenik, statistika, HTTP router) već su testirane. Ova skripta iz njih radi:

  lib/tt/core.cjs   jezgra + router za server (Vercel funkcija api/tt.js)
  v/<lokal>/…       stranice u načinu rada "live" (podaci na serveru, bez demo vodiča)

Pokretanje (iz korijena repozitorija):  python3 tools/build_live.py
Svaka zamjena provjerava da se tekst nalazi točno onoliko puta koliko očekujemo,
pa se promjena u demu ne može tiho izgubiti.

Ugovoreni paket (bez rezervacija, hostese i garderobe; poziv voditelju; ocjena 5 ★ → Google,
1–4 ★ → voditelj) opisan je u tools/bht_paket.py. Demo ostaje pun, za prezentaciju dodataka.
"""
import json, os, re, shutil, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bht_paket as PAKET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEMO = os.path.join(ROOT, 'demo')
OUT = os.path.join(ROOT, 'v')
VENUE_DIRS = ['q-club', 'kafanica', 'bure-bar', 'brooklyn', 'grupa']
CORE_START = '(function () {\n"use strict";\nconst __m = {};'
CORE_END = 'window.TTCore = { core: __m["core"], router: __m["router"] };\n})();'

# produkcijske razlike od dema (dogovor s BHT-om, 30. 10. 2026; paket 13. 11. 2026. u bht_paket.py)
CORE_FIXES = [
    # jamstvo karticom 29 € uključuje se kad lokali otvore Stripe; do tada voditelj potvrđuje
    # rezervaciju i jednim dodirom šalje gostu WhatsApp poruku sa svim podacima
    ("  policy: { guarantee: { eur: 29, hours: 12 }, terms: true },   // jamstvo karticom: ništa se ne naplaćuje; besplatan otkaz do 12 h prije dolaska, inače 29 €",
     "  policy: { terms: true },   // jamstvo karticom (29 €) uključuje se kad lokal otvori Stripe", 2),
    ("    guarantee: { eur: 29, hours: 12 },   // jamstvo karticom: ništa se ne naplaćuje; besplatan otkaz do 12 h prije dolaska, inače 29 €",
     "    // jamstvo karticom (29 €) uključuje se kad lokal otvori Stripe", 1),
] + PAKET.CORE


# Gumb "Pošalji na WhatsApp" u adminu: na računalu ide izravno na WhatsApp Web
# (wa.me na računalu bez aplikacije nudi samo instalaciju); mobitel i tablet ostaju na aplikaciji.
WA_DESKTOP = r'''<script>/* WhatsApp na računalu → WhatsApp Web */
(function () {
  var ua = navigator.userAgent || '';
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua))) return;
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="https://wa.me/"]') : null;
    var m = a && /^https:\/\/wa\.me\/(\d+)(?:\?(.*))?$/.exec(a.getAttribute('href') || '');
    if (!m) return;
    var text = new URLSearchParams(m[2] || '').get('text') || '';
    a.setAttribute('href', 'https://web.whatsapp.com/send?phone=' + m[1] + '&text=' + encodeURIComponent(text));
  }, true);
})();
</script>
'''


def rep(s, old, new, n, what):
    c = s.count(old)
    if c != n:
        sys.exit(f'GREŠKA [{what}]: očekivano {n}, nađeno {c} :: {old[:90]!r}')
    return s.replace(old, new)


def core_from(html, what):
    a = html.find(CORE_START)
    b = html.find(CORE_END, a)
    if a < 0 or b < 0:
        sys.exit(f'GREŠKA: nema jezgre u {what}')
    return a, b + len(CORE_END)


def build_core():
    src = open(os.path.join(DEMO, 'bure-bar', 'admin', 'index.html'), encoding='utf-8').read()
    a, b = core_from(src, 'bure-bar/admin')
    code = src[a:b]
    for old, new, n in CORE_FIXES:
        code = rep(code, old, new, n, 'core')
    out = ("/* GENERIRANO skriptom tools/build_live.py iz demo/bure-bar/admin — ne uređivati ručno.\n"
           "   Jezgra TipTap sustava (lokali, rezervacije, stol uživo, garderoba, cjenik, statistika)\n"
           "   i HTTP router za /api/<lokal>/… — isti kod koji radi u demu. */\n"
           "'use strict';\nconst window = {};\n" + code + "\nmodule.exports = window.TTCore;\n")
    p = os.path.join(ROOT, 'lib', 'tt', 'core.cjs')
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w', encoding='utf-8').write(out)
    print('lib/tt/core.cjs', len(out) // 1024, 'KB')


def live_cfg(s, rel):
    """window.TT_CFG: način rada "live" i mogućnosti iz ugovorenog paketa (bht_paket.FEATURES)."""
    key = 'window.TT_CFG='
    if s.count(key + '{') != 1:
        sys.exit(f'GREŠKA: {rel} treba imati točno jedan window.TT_CFG')
    i = s.find(key + '{') + len(key)
    cfg, end = json.JSONDecoder().raw_decode(s, i)
    if cfg.get('mode', 'demo') != 'demo':
        sys.exit(f'GREŠKA: {rel} ima nepoznat "mode" u TT_CFG')
    cfg = {'mode': 'live', **{k: v for k, v in cfg.items() if k != 'mode'}}
    if cfg.get('venue') in PAKET.FEATURES:
        cfg['features'] = PAKET.FEATURES[cfg['venue']]
    return s[:i] + json.dumps(cfg, ensure_ascii=False) + s[end:]


def fixes(s, lst, rel, slug):
    for old, new, n in lst:
        k = n.get(slug, 0) if isinstance(n, dict) else n
        s = rep(s, old, new, k, rel) if k else s
    return s


def live_page(path, rel):
    s = open(path, encoding='utf-8').read()
    if 'window.TT_CFG={' in s:
        s = live_cfg(s, rel)
    if CORE_START in s:
        a, b = core_from(s, rel)
        core = s[a:b]
        for old, new, n in CORE_FIXES:
            core = rep(core, old, new, n, rel + ' core')
        s = s[:a] + core + s[b:]
    parts = rel.split(os.sep)
    slug = parts[0]
    if parts == [slug, 'index.html'] and slug != 'grupa':        # cjenik gosta
        s = fixes(s, PAKET.GUEST, rel, slug)
        s = rep(s, PAKET.GUEST_ANCHOR, PAKET.guest_script(), 1, rel + ' ocjena')
    elif parts == [slug, 'admin', 'index.html']:                  # uprava lokala
        s = fixes(s, PAKET.ADMIN, rel, slug)
    elif parts == ['grupa', 'index.html']:                         # pregled za direktore
        s = fixes(s, PAKET.GRUPA, rel, slug)
    if 'class="btn wa block"' in s:
        s = rep(s, '</body>', WA_DESKTOP + '</body>', 1, rel + ' whatsapp')
    return s


def build_pages():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    n = st = 0
    for d in VENUE_DIRS:
        for dp, _, fs in os.walk(os.path.join(DEMO, d)):
            for f in fs:
                src = os.path.join(dp, f)
                rel = os.path.relpath(src, DEMO)
                dst = os.path.join(OUT, rel)
                if f == 'index.html' and os.path.getsize(src) == 0:
                    continue   # prazni preusmjerni stubovi iz dema (npr. brooklyn/rezervacije)
                sub = rel.split(os.sep)[1] if rel.count(os.sep) >= 2 else ''
                if sub in PAKET.STUBS:   # rezervacije, hostesa, garderoba: nisu u paketu → preusmjeravanje
                    if f == 'index.html':
                        os.makedirs(os.path.dirname(dst), exist_ok=True)
                        open(dst, 'w', encoding='utf-8').write(PAKET.stub(PAKET.STUBS[sub])); st += 1
                    continue
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                if f.endswith('.html'):
                    open(dst, 'w', encoding='utf-8').write(live_page(src, rel)); n += 1
                else:
                    shutil.copy2(src, dst)
    shutil.copytree(os.path.join(DEMO, 'hi'), os.path.join(OUT, 'hi'))
    print('v/:', n, 'stranica,', st, 'preusmjeravanja (nije u paketu)')


if __name__ == '__main__':
    build_core()
    build_pages()
