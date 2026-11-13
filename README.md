# tiptapreviews.com

| Mapa | Adresa | Što je |
|---|---|---|
| `index.html`, `demo.html` | tiptapreviews.com, /demo | TipTap: glavna stranica i primjer za kupce |
| `api/` | tiptapreviews.com/‹kod› | preusmjeravanje NFC/QR kartica (kodovi su u Google tablici) |
| `demo/` | /demo/ | BHT: Bure Bar, Brooklyn, Q Club, Kafanica, kartice za sastanak, pregled za direktore (puni demo, sa svim dodacima) |
| `v/`, `api/tt.js`, `lib/tt/` | /v/‹lokal›/, /v/grupa/ | BHT: pravi sustav prema ugovorenom paketu (`tools/bht_paket.py`); gradi se s `python3 tools/build_live.py` |
| `lib/tt/report.cjs`, `tools/live/izvjestaj.*` | /v/grupa/izvjestaj/ | BHT: mjesečni izvještaj za direktore (PIN direktora); Google ocjene automatski uz `GOOGLE_PLACES_KEY` u Vercelu, inače ručno s `?uredi=1` |
| `kosnica/` | /kosnica/ | Košnica Gastro Pub, Šabac |
| `osjecki-taxi/` | /osjecki-taxi | Osječki taxi |
| `studio-charm/` | /studio-charm | Studio Charm, Osijek |

`vercel.json` drži čiste adrese, stare adrese (`*.html`, stari Bure) i preusmjeravanje kartica.
