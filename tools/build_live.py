#!/usr/bin/env python3
"""TipTap × BHT — pravi sustav iz provjerenog dema.

Demo (demo/…) je izvor istine: sve stranice i zajednička jezgra (lokali, rezervacije,
osoblje, cjenik, statistika, HTTP router) već su testirane. Ova skripta iz njih radi:

  lib/tt/core.cjs   jezgra + router za server (Vercel funkcija api/tt.js)
  v/<lokal>/…       stranice u načinu rada "live" (podaci na serveru, bez demo vodiča)

Pokretanje (iz korijena repozitorija):  python3 tools/build_live.py
Svaka zamjena provjerava da se tekst nalazi točno onoliko puta koliko očekujemo,
pa se promjena u demu ne može tiho izgubiti.
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEMO = os.path.join(ROOT, 'demo')
OUT = os.path.join(ROOT, 'v')
VENUE_DIRS = ['q-club', 'kafanica', 'bure-bar', 'brooklyn', 'grupa']
CORE_START = '(function () {\n"use strict";\nconst __m = {};'
CORE_END = 'window.TTCore = { core: __m["core"], router: __m["router"] };\n})();'

# produkcijske razlike od dema (dogovor s BHT-om, 30. 10. 2026)
CORE_FIXES = [
    # Kafanica: bez naručivanja pjesama (bend ostaje u "Večeras nastupa")
    ("features: { reservations: true, preorder: false, tableMode: true, bill: false, orders: false, songs: true, hostess: ['rez', 'coat'] }",
     "features: { reservations: true, preorder: false, tableMode: true, bill: false, orders: false, songs: false, hostess: ['rez', 'coat'] }", 1),
    # jamstvo karticom 29 € uključuje se kad lokali otvore Stripe; do tada voditelj potvrđuje
    # rezervaciju i jednim dodirom šalje gostu WhatsApp poruku sa svim podacima
    ("  policy: { guarantee: { eur: 29, hours: 12 }, terms: true },   // jamstvo karticom: ništa se ne naplaćuje; besplatan otkaz do 12 h prije dolaska, inače 29 €",
     "  policy: { terms: true },   // jamstvo karticom (29 €) uključuje se kad lokal otvori Stripe", 2),
    ("    guarantee: { eur: 29, hours: 12 },   // jamstvo karticom: ništa se ne naplaćuje; besplatan otkaz do 12 h prije dolaska, inače 29 €",
     "    // jamstvo karticom (29 €) uključuje se kad lokal otvori Stripe", 1),
]


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


def live_page(path, rel):
    s = open(path, encoding='utf-8').read()
    if 'window.TT_CFG={"mode": "demo", ' in s:
        s = rep(s, 'window.TT_CFG={"mode": "demo", ', 'window.TT_CFG={"mode": "live", ', 1, rel + ' mode')
    elif 'window.TT_CFG={' in s:
        head = s[s.find('window.TT_CFG={'):s.find('window.TT_CFG={') + 400]
        if '"mode":' in head:
            sys.exit(f'GREŠKA: {rel} ima nepoznat "mode" u TT_CFG')
        s = rep(s, 'window.TT_CFG={', 'window.TT_CFG={"mode": "live", ', 1, rel + ' mode')
    if CORE_START in s:
        a, b = core_from(s, rel)
        core = s[a:b]
        for old, new, n in CORE_FIXES:
            core = rep(core, old, new, n, rel + ' core')
        s = s[:a] + core + s[b:]
    if rel.startswith('kafanica/') and '"songs": true' in s:
        s = rep(s, '"songs": true', '"songs": false', 1, rel + ' songs')
    return s


def build_pages():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    n = 0
    for d in VENUE_DIRS:
        for dp, _, fs in os.walk(os.path.join(DEMO, d)):
            for f in fs:
                src = os.path.join(dp, f)
                rel = os.path.relpath(src, DEMO)
                dst = os.path.join(OUT, rel)
                if f == 'index.html' and os.path.getsize(src) == 0:
                    continue   # prazni preusmjerni stubovi iz dema (npr. brooklyn/rezervacije)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                if f.endswith('.html'):
                    open(dst, 'w', encoding='utf-8').write(live_page(src, rel)); n += 1
                else:
                    shutil.copy2(src, dst)
    shutil.copytree(os.path.join(DEMO, 'hi'), os.path.join(OUT, 'hi'))
    print('v/:', n, 'stranica')


if __name__ == '__main__':
    build_core()
    build_pages()
