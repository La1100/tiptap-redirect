# Košnica · TipTap Signature — upute

## Što je unutra

| Stranica | Adresa | Tko koristi |
|---|---|---|
| **Gost** — walk-in, priča, meni s rastavljanjem jela, pića, svirke, konobar, račun, moja lista, anonimna poruka, Google recenzija | `/` | gosti (NFC kartica / QR) |
| **Sto** — isto, plus *Konobar · Račun · Moja lista* s brojem stola | `/?sto=5` | naljepnica na svakom stolu |
| **Rezervacije** — gost bira dan, vreme i sto na rasporedu | `/rezervacije/` | gosti |
| **Uprava** — pozivi sa stolova uživo, porudžbine, rezervacije, cenovnik (cene i „nema”), „Večeras nastupa”, poruke, statistika, stolovi i QR | `/uprava/` | osoblje i vlasnik (PIN) |

## Demo (GitHub Pages ili bilo koji statični hosting)

Mapa `demo/` radi sama u pregledniku — sve se pamti na tom telefonu (za prezentaciju vlasniku).

- **PIN uprave u demu: `1111`** (vlasnik: `2580`). Ne upisuj ih na javne stranice.
- Gumb **DEMO** na vrhu: prebacivanje gost ↔ rezervacija ↔ uprava i *Vrati demo na početak*.
- Za prezentaciju „petak uveče”: `/?sto=5&t=pet-21:10`.

## Živi sistem (Netlify)

Mapa `live/` — Netlify (Git ili `npx netlify-cli deploy --prod`). Pozivi konobara i porudžbine idu u stvarnom vremenu s telefona gosta na telefon osoblja.

Environment variables:

| Varijabla | Primer | Napomena |
|---|---|---|
| `ADMIN_PIN_KOSNICA` | `4821` | PIN osoblja |
| `OWNER_PIN` | `7351` | PIN vlasnika |
| `SITE_URL` | `https://kosnica.tiptapreviews.com` | za linkove u porukama |
| `NOTIFY_EMAIL_KOSNICA` | `sef@...` | (neobavezno) e-mail za nove rezervacije |
| `CALLMEBOT_KOSNICA` | `+38166...:APIKEY` | (neobavezno) WhatsApp obaveštenje osoblju |

## NFC / QR za stolove

Link stola: `https://…/?sto=5` (oznake kao na rasporedu u upravi). U upravi → *Podešavanja → Stolovi* ima ispis QR naljepnica za sve stolove. Raspored stolova je **okviran** dok ne dobijemo skicu lokala — menja se u upravi (*Raspored*).

## Fotografije i videi

- Fotografije: `img/jela/<id>.jpg`, `img/kat/<kategorija>.jpg`, `img/ambijent/*.jpg`, `img/logo.png`. Dok lokalne kopije ne postoje, slike se učitavaju s njihovog sajta / Alidede.
- Higgsfield videi: `video/ulaz.mp4` (walk-in) i `video/<id-jela>.mp4` — pojave se sami, bez izmena koda. Promptovi i imena datoteka: **HIGGSFIELD.md**.

## Što treba potvrditi s Košnicom prije puštanja uživo

1. **Nutritivne vrednosti** su procena iz sastojaka (gramaže su pretpostavke) — kuhinja ih treba potvrditi ili ispraviti.
2. **Alergeni** su izvedeni iz navedenih sastojaka — kuhinja mora potvrditi (posebno sosevi, pecivo, kobasice).
3. **Ljutina** (0–3 čilija) — procena.
4. **Doručak** (9 stavki) i **karta pića** — cene iz njihovih PDF-ova (stižu kad pošalješ PDF-ove).
5. **Priča lokala** — predlog teksta iz njihovog sajta; vlasnik može dopuniti (od kada rade, ko kuva, odakle namirnice…).
6. **Google recenzija** — sada otvara njihovo mesto na Google mapama; za direktan prozor „Napiši recenziju” treba link iz njihovog Google Business profila.
7. **Pizza 50 cm i pola porcije plata** postoje samo na Alidedi; u meniju lokala su cene iz njihovog PDF-a (32 cm, cela porcija).
