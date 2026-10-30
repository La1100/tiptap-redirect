/* GENERIRANO skriptom tools/build_live.py iz demo/bure-bar/admin — ne uređivati ručno.
   Jezgra TipTap sustava (lokali, rezervacije, stol uživo, garderoba, cjenik, statistika)
   i HTTP router za /api/<lokal>/… — isti kod koji radi u demu. */
'use strict';
const window = {};
(function () {
"use strict";
const __m = {};
__m["venues"] = (function () {
/* =====================================================================
   TIPTAP SUITE — lokali grupe i njihove zadane postavke
   Svaki lokal ima svoj tlocrt, zone, termine i pravila. Sve se kasnije
   mijenja u adminu (Postavke) — ovo su samo početne vrijednosti.
   Tlocrti su OKVIRNI (platno 1000 × 640) dok ne dobijemo skicu lokala.
   ===================================================================== */

const H = (from, to) => ({ from, to });

/* ---------- Q CLUB (klub, Tvrđa) ---------- */
const QCLUB = {
  venue: 'Q Club',
  forms: { loc: 'u Q Clubu', gen: 'iz Q Cluba' },
  phone: '+385 95 391 7530',
  /* pravi raspored (slike iz sustava rezervacija, 20. 10.): PRIZEMLJE (stolovi 1–29) i KAT (31–50, VIP);
     na katu pušiona sa stolovima 12 i 37 — ne rezervira se. Etaže su trake jednog tlocrta (prebacuju se gumbom). */
  plan: {
    w: 1440, h: 1540, rotateMobile: true,
    floors: [{ id: 'p', name: 'Prizemlje', en: 'Ground floor', y: 0, h: 660 }, { id: 'k', name: 'Kat', en: 'Upstairs', y: 690, h: 850 }],
    walls: [
      // prizemlje
      { type: 'door', x: 40, y: 98, w: 100, h: 56, label: 'ULAZ' },
      { type: 'dj', x: 396, y: 36, w: 160, h: 80, label: 'DJ' },
      { type: 'bar', x: 556, y: 36, w: 530, h: 80, label: 'VELIKI ŠANK', stools: 0 },
      { type: 'bar', x: 28, y: 516, w: 130, h: 114, label: 'MALI ŠANK', stools: 0 },
      { type: 'wall', x: 574, y: 274, w: 100, h: 336, label: 'STUBE' },
      // kat
      { type: 'bar', x: 20, y: 746, w: 80, h: 760, label: 'ŠANK', stools: 0 },
      { type: 'wall', x: 736, y: 746, w: 534, h: 122, label: 'GALERIJA' },
      { type: 'wall', x: 1270, y: 868, w: 114, h: 638, label: 'GALERIJA' },
      { type: 'area', x: 1270, y: 734, w: 162, h: 134, label: 'VIP', labelPos: 'bottom' },
      { type: 'wall', x: 636, y: 1302, w: 100, h: 176, label: '' },
      { type: 'wall', x: 736, y: 1176, w: 100, h: 302, label: 'STUBE' },
      { type: 'area', x: 852, y: 1282, w: 404, h: 222, label: 'PUŠIONA', labelPos: 'bottom' }
    ]
  },
  zones: [
    { id: 'prizemlje', name: { hr: 'Prizemlje', en: 'Ground floor' }, short: 'Prizemlje' },
    { id: 'kat', name: { hr: 'Kat', en: 'Upstairs' }, short: 'Kat' },
    { id: 'vip', name: { hr: 'VIP lounge', en: 'VIP lounge' }, short: 'VIP', img: 'vip',
      // VIP doživljaj (prijedlog — lokal mijenja po želji): gost ga vidi u rezervaciji, konobar VIP-a dobije podsjetnik za doček
      show: {
        where: { hr: 'u Q Clubu', en: 'at Q Club' },
        tag: { hr: 'Lounge na katu samo za vašu ekipu', en: 'An upstairs lounge just for your crew' },
        one: { hr: 'Jedini VIP lounge u Q Clubu', en: 'The only VIP lounge in Q Club' },
        perks: [
          { i: '🎆', hr: 'Boca stiže uz prskalice — ako želite', en: 'Your bottle arrives with sparklers — if you like' },
          { i: '🎤', hr: 'DJ najavljuje vaše ime — ako želite', en: 'The DJ calls out your name — if you like' },
          { i: '🧊', hr: 'Stol vas čeka spreman — boca u svjetlećoj kibli s ledom, Red Bull i čaše', en: 'Your table is ready when you arrive — the bottle in a glowing ice bucket, Red Bull and glasses' },
          { i: '🚪', hr: 'Bez čekanja — konobar VIP-a vas dočeka i odvede gore', en: 'No waiting — the VIP waiter meets you and takes you upstairs' },
          { i: '🤵', hr: 'Vaš konobar cijelu noć — jedan dodir na mobitelu', en: 'Your own waiter all night — one tap on your phone' }
        ],
        choose: { spark: true, dj: true, shots: [] },
        prep: { min: 15, hr: 'boca u svjetlećoj kibli s ledom, Red Bull, čaše, kartica s imenom', en: 'the bottle in a glowing ice bucket, Red Bull, glasses, a name card' },
        staff: { hr: 'VIP doček', en: 'VIP welcome' },
        always: { hr: 'stol spreman prije dolaska (boca u svjetlećoj kibli s ledom, Red Bull i čaše), ulaz bez čekanja i vaš konobar cijelu noć', en: 'your table ready before you arrive (the bottle in a glowing ice bucket, Red Bull and glasses), no queue and your own waiter all night' }
      } },
    { id: 'pusiona', name: { hr: 'Pušiona', en: 'Smoking room' }, short: 'Pušiona' }
  ],
  tables: [
    // prizemlje
    ...[['27', 296, 116], ['25', 454, 154], ['24', 532, 154], ['1', 118, 352], ['9', 254, 590], ['17', 1068, 570]].map(([id, x, y]) => ({ id, floor: 'p', zone: 'prizemlje', shape: 'rect', x, y, w: 42, h: 42, seats: [1, 1, 1, 1], min: 1, max: 4 })),
    { id: '26', floor: 'p', zone: 'prizemlje', shape: 'rect', x: 354, y: 66, w: 44, h: 60, seats: [0, 0, 2, 2], min: 2, max: 4 },
    ...[['23', 114], ['22', 212], ['21', 312], ['20', 412]].map(([id, y]) => ({ id, floor: 'p', zone: 'prizemlje', shape: 'rect', x: 1276, y, w: 60, h: 40, seats: [2, 2, 0, 0], min: 2, max: 4 })),
    ...[['2', 256, 362], ['3', 316, 362], ['10', 732, 362], ['11', 832, 362], ['7', 396, 580], ['6', 474, 580], ['14', 732, 580], ['15', 832, 580], ['16', 930, 580], ['18', 1186, 580], ['19', 1286, 580]]
      .map(([id, x, y]) => ({ id, floor: 'p', zone: 'prizemlje', shape: 'rect', x, y, w: 40, h: 60, seats: [0, 0, 2, 2], min: 2, max: 4 })),
    ...[['29', 968, 362], ['13', 1108, 342]].map(([id, x, y]) => ({ id, floor: 'p', zone: 'prizemlje', shape: 'rect', x, y, w: 40, h: 54, seats: [0, 0, 2, 2], min: 2, max: 4 })),
    ...[['4', 504, 412], ['5', 504, 490], ['8', 326, 530]].map(([id, x, y]) => ({ id, floor: 'p', zone: 'prizemlje', shape: 'rect', x, y, w: 60, h: 38, seats: [2, 2, 0, 0], min: 2, max: 4 })),
    // kat
    ...[['47', 254], ['48', 382], ['49', 508], ['50', 636]].map(([id, x]) => ({ id, floor: 'k', zone: 'kat', shape: 'rect', x, y: 778, w: 48, h: 70, seats: [0, 0, 2, 2], min: 2, max: 4 })),
    ...[['44', 254, 920], ['45', 382, 920], ['46', 508, 920], ['46B', 636, 920], ['35', 584, 1070], ['34', 736, 1070], ['36', 508, 1172], ['33', 940, 1146]]
      .map(([id, x, y]) => ({ id, floor: 'k', zone: 'kat', shape: 'rect', x, y, w: 44, h: 44, seats: [1, 1, 1, 1], min: 1, max: 4 })),
    ...[['38', 266, 1070], ['39', 242, 1274], ['32', 522, 1274]].map(([id, x, y]) => ({ id, floor: 'k', zone: 'kat', shape: 'rect', x, y, w: 72, h: 42, seats: [2, 2, 0, 0], min: 2, max: 4 })),
    ...[['31', 430, 1056], ['43', 230, 1438], ['42', 330, 1438], ['41', 430, 1438], ['40', 532, 1438]].map(([id, x, y]) => ({ id, floor: 'k', zone: 'kat', shape: 'rect', x, y, w: 44, h: 68, seats: [0, 0, 2, 2], min: 2, max: 4 })),
    { id: 'VIP', floor: 'k', zone: 'vip', shape: 'lounge', x: 1352, y: 800, w: 150, h: 92, min: 6, max: 14, vip: true },
    ...[['37', 914, 1400], ['12', 1144, 1400]].map(([id, x, y]) => ({ id, floor: 'k', zone: 'pusiona', shape: 'rect', x, y, w: 44, h: 44, seats: [1, 1, 1, 1], min: 1, max: 4, noRes: true }))
  ],
  hours: { 0: null, 1: null, 2: null, 3: null, 4: H('22:00', '01:00'), 5: H('22:00', '01:00'), 6: H('22:00', '01:00') },
  slotMinutes: 30,
  durationMinutes: 420,
  leadMinutes: 60,
  daysAhead: 30,
  maxParty: 16,
  holdMinutes: 60,
  closedDates: [],
  autoConfirm: false,
  policy: { terms: true },   // jamstvo karticom (29 €) uključuje se kad lokal otvori Stripe
  rules: {
    hr: 'VIP i stolovi na katu rezerviraju se uz narudžbu boce — možete je odabrati već sada, a plaća se u klubu. Pušiona na katu (stolovi 12 i 37) ne rezervira se.',
    en: 'VIP and upstairs tables are booked with a bottle order — choose it now and pay at the club. The upstairs smoking room (tables 12 and 37) cannot be booked.'
  },
  features: { reservations: true, preorder: true, sparkler: true, tableMode: true, bill: false, orders: false, songs: false, preorderZones: ['vip', 'kat'], hostess: ['rez', 'coat'], door: 'waiter' }
};

/* ---------- KAFANICA (živa glazba, Tvrđa) ---------- */
const KAFANICA = {
  venue: 'Kafanica',
  forms: { loc: 'u Kafanici', gen: 'iz Kafanice' },
  phone: '+385 91 605 2339',
  /* pravi raspored (slika iz sustava rezervacija, 20. 10.): stolovi 1–35, šank u sredini;
     pušiona (19, 27, 28) — ne rezervira se */
  plan: {
    w: 1340, h: 1150,
    walls: [
      { type: 'bar', x: 440, y: 434, w: 470, h: 186, label: 'ŠANK', stools: 0 },
      { type: 'area', x: 566, y: 996, w: 360, h: 132, label: 'PUŠIONA', labelPos: 'bottom' },
      { type: 'area', x: 1006, y: 496, w: 124, h: 124, label: 'PUŠIONA', labelPos: 'bottom' }
    ]
  },
  zones: [
    { id: 'sala', name: { hr: 'Sala', en: 'Main room' }, short: 'Sala' },
    { id: 'vip', name: { hr: 'VIP stol', en: 'VIP table' }, short: 'VIP', img: 'vip',
      // VIP doživljaj (prijedlog — lokal mijenja po želji): bend pozdravlja goste, rakija i plata na drvenoj dasci
      show: {
        where: { hr: 'u Kafanici', en: 'at Kafanica' },
        tag: { hr: 'Vaše društvo u središtu večeri — bend svira za vas', en: 'Your party at the heart of the night — the band plays for you' },
        one: { hr: 'Samo jedan takav stol u Kafanici', en: 'The only table like it in Kafanica' },
        act: { hr: 'bend', en: 'the band' },
        perks: [
          { i: '🎻', hr: 'Bend vas pozdravlja s bine i svira pjesmu za vaš stol — ako želite', en: 'The band greets you from the stage and plays a song for your table — if you like' },
          { i: '🥃', hr: 'Rakija dobrodošlice za cijeli stol — šljiva, travarica, dunja ili medica', en: 'A welcome round of rakija for the whole table — plum, herbal, quince or honey' },
          { i: '🧀', hr: 'Hladna plata na drvenoj dasci čeka na stolu — čvarci, pršut, kulen, kobasica, sirevi, masline, kiseli krastavci, feferoni i lepinjice', en: 'A cold platter on a wooden board waiting at your table — pork cracklings, prosciutto, kulen, sausage, cheeses, olives, pickles, hot peppers and flatbread' },
          { i: '🔥', hr: 'Topla plata s roštilja za cijelo društvo — po želji', en: 'A hot grill platter for the whole party — on request' },
          { i: '🎆', hr: 'Boca uz prskalice — ako želite', en: 'Your bottle with sparklers — if you like' },
          { i: '🚪', hr: 'Bez čekanja — hostesa vas dočeka imenom', en: 'No waiting — the host greets you by name' },
          { i: '🤵', hr: 'Vaš konobar cijelu večer — jedan dodir na mobitelu', en: 'Your own waiter all evening — one tap on your phone' }
        ],
        choose: { spark: true, dj: true, shots: [
          { id: 'Badel Šljivovica', hr: 'Šljiva', en: 'Plum brandy' },
          { id: 'Badel Travarica', hr: 'Travarica', en: 'Herbal brandy' },
          { id: 'Gazdina Dunja', hr: 'Dunja', en: 'Quince brandy' },
          { id: 'Badel Medica', hr: 'Medica', en: 'Honey brandy' }
        ] },
        prep: { min: 15, hr: 'hladna plata na drvenoj dasci, čašice za rakiju, kartica s imenom', en: 'the cold platter on a wooden board, rakija glasses, a name card' },
        staff: { hr: 'VIP doček', en: 'VIP welcome' },
        always: { hr: 'stol spreman prije dolaska s hladnom platom na drvenoj dasci, ulaz bez čekanja i vaš konobar cijelu večer', en: 'your table ready before you arrive with a cold platter on a wooden board, no queue and your own waiter all evening' }
      } },
    { id: 'pusiona', name: { hr: 'Pušiona', en: 'Smoking room' }, short: 'Pušiona' }
  ],
  tables: [
    ...[['11', 154, 84]].map(([id, x, y]) => ({ id, zone: 'sala', shape: 'round', x, y, r: 28, cross: true, min: 2, max: 4 })),
    ...[['1', 328], ['2', 518], ['3', 706], ['4', 894], ['5', 1082]].map(([id, x]) => ({ id, zone: 'sala', shape: 'rect', x, y: 84, w: 92, h: 60, seats: [2, 2, 0, 0], min: 2, max: 4 })),
    ...[['6', 196], ['7', 352], ['8', 508], ['9', 664], ['10', 822]].map(([id, y]) => ({ id, zone: 'sala', shape: 'rect', x: 1256, y, w: 60, h: 92, seats: [0, 0, 2, 2], min: 2, max: 4 })),
    ...[['12', 282], ['13', 440], ['14', 596], ['15', 754], ['16', 912], ['17', 1068]].map(([id, x]) => ({ id, zone: 'sala', shape: 'round', x, y: 242, r: 28, cross: true, min: 2, max: 4 })),
    ...[['18', 400], ['20', 712]].map(([id, y]) => ({ id, zone: 'sala', shape: 'round', x: 1068, y, r: 28, cross: true, min: 2, max: 4 })),
    { id: '19', zone: 'pusiona', shape: 'round', x: 1068, y: 556, r: 28, cross: true, min: 1, max: 4, noRes: true },
    { id: '33', zone: 'sala', shape: 'rect', x: 94, y: 336, w: 60, h: 124, seats: [0, 0, 3, 3], min: 2, max: 6 },
    { id: '34', zone: 'sala', shape: 'long', x: 282, y: 446, w: 60, h: 216, seats: [0, 0, 4, 4], min: 4, max: 8 },
    { id: '26', zone: 'sala', shape: 'rect', x: 282, y: 666, w: 60, h: 92, seats: [0, 0, 2, 2], min: 2, max: 4 },
    ...[['25', 282], ['24', 472], ['23', 628], ['22', 784], ['21', 942]].map(([id, x]) => ({ id, zone: 'sala', shape: 'round', x, y: 806, r: 28, cross: true, min: 2, max: 4 })),
    ...[['32', 190], ['31', 314], ['30', 440]].map(([id, x]) => ({ id, zone: 'sala', shape: 'rect', x, y: 932, w: 60, h: 60, seats: [1, 1, 0, 0], min: 1, max: 2 })),
    { id: '29', zone: 'sala', shape: 'round', x: 754, y: 932, r: 28, cross: true, min: 2, max: 4 },
    { id: '35', zone: 'vip', shape: 'long', x: 1068, y: 964, w: 252, h: 64, seats: [5, 5, 1, 1], min: 6, max: 12, vip: true },
    ...[['28', 644], ['27', 832]].map(([id, x]) => ({ id, zone: 'pusiona', shape: 'rect', x, y: 1058, w: 92, h: 60, seats: [2, 2, 0, 0], min: 1, max: 4, noRes: true }))
  ],
  hours: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: H('19:00', '23:00'), 6: H('19:00', '23:00') },
  slotMinutes: 30,
  durationMinutes: 240,
  leadMinutes: 60,
  daysAhead: 30,
  maxParty: 16,
  holdMinutes: 30,
  closedDates: [],
  autoConfirm: false,
  policy: { terms: true },   // jamstvo karticom (29 €) uključuje se kad lokal otvori Stripe
  rules: {
    hr: 'Petkom i subotom svira živa glazba. Stolovi u pušioni (19, 27 i 28) ne rezerviraju se — slobodni su za goste bez rezervacije.',
    en: 'Live music on Fridays and Saturdays. Tables in the smoking room (19, 27 and 28) cannot be booked — they are kept for walk-in guests.'
  },
  features: { reservations: true, preorder: false, tableMode: true, bill: false, orders: false, songs: false, hostess: ['rez', 'coat'] }
};

/* ---------- BROOKLYN (caffe bar, šetalište uz Dravu) ---------- */
const BROOKLYN = {
  venue: 'Brooklyn',
  forms: { loc: 'u Brooklynu', gen: 'iz Brooklyna' },
  phone: '+385 91 727 7963',
  plan: {
    w: 1000, h: 640,
    walls: [
      { type: 'area', x: 24, y: 24, w: 604, h: 268, label: 'UNUTRA', labelPos: 'bottom' },
      { type: 'area', x: 652, y: 24, w: 324, h: 268, label: 'LOUNGE' },
      { type: 'bar', x: 48, y: 46, w: 300, h: 60, label: 'ŠANK' },
      { type: 'door', x: 430, y: 280, w: 130, h: 26, label: 'ULAZ' },
      { type: 'deck', x: 24, y: 318, w: 952, h: 232, label: 'TERASA' },
      { type: 'river', x: 0, y: 566, w: 1000, h: 74, label: 'DRAVA' }
    ]
  },
  zones: [
    { id: 'terasa', name: { hr: 'Terasa uz Dravu', en: 'Riverside terrace' } },
    { id: 'unutra', name: { hr: 'Unutra', en: 'Inside' } },
    { id: 'lounge', name: { hr: 'Lounge', en: 'Lounge' } }
  ],
  tables: [
    { id: 'U1', zone: 'unutra', shape: 'round', x: 108, y: 206, r: 26, min: 1, max: 4 },
    { id: 'U2', zone: 'unutra', shape: 'round', x: 236, y: 206, r: 26, min: 1, max: 4 },
    { id: 'U3', zone: 'unutra', shape: 'rect', x: 408, y: 112, w: 96, h: 58, min: 2, max: 4 },
    { id: 'U4', zone: 'unutra', shape: 'round', x: 532, y: 196, r: 26, min: 1, max: 4 },
    { id: 'L1', zone: 'lounge', shape: 'lounge', x: 736, y: 104, w: 140, h: 96, min: 3, max: 6 },
    { id: 'L2', zone: 'lounge', shape: 'lounge', x: 894, y: 104, w: 140, h: 96, min: 3, max: 6 },
    { id: 'L3', zone: 'lounge', shape: 'lounge', x: 814, y: 232, w: 164, h: 88, rot: 180, min: 4, max: 8, vip: true },
    { id: 'T1', zone: 'terasa', shape: 'round', x: 104, y: 386, r: 26, min: 1, max: 4 },
    { id: 'T2', zone: 'terasa', shape: 'round', x: 268, y: 386, r: 26, min: 1, max: 4 },
    { id: 'T3', zone: 'terasa', shape: 'round', x: 432, y: 386, r: 26, min: 1, max: 4 },
    { id: 'T4', zone: 'terasa', shape: 'round', x: 596, y: 386, r: 26, min: 1, max: 4 },
    { id: 'T5', zone: 'terasa', shape: 'round', x: 760, y: 386, r: 26, min: 1, max: 4 },
    { id: 'T6', zone: 'terasa', shape: 'round', x: 186, y: 494, r: 26, min: 1, max: 4 },
    { id: 'T7', zone: 'terasa', shape: 'round', x: 350, y: 494, r: 26, min: 1, max: 4 },
    { id: 'T8', zone: 'terasa', shape: 'round', x: 514, y: 494, r: 26, min: 1, max: 4 },
    { id: 'T9', zone: 'terasa', shape: 'round', x: 678, y: 494, r: 26, min: 1, max: 4 },
    { id: 'T10', zone: 'terasa', shape: 'rect', x: 900, y: 440, w: 70, h: 150, min: 4, max: 8 }
  ],
  hours: { 0: H('09:00', '21:00'), 1: H('08:00', '22:00'), 2: H('08:00', '22:00'), 3: H('08:00', '22:00'), 4: H('08:00', '22:00'), 5: H('08:00', '22:00'), 6: H('09:00', '22:00') },
  slotMinutes: 30,
  durationMinutes: 120,
  leadMinutes: 30,
  daysAhead: 30,
  maxParty: 12,
  holdMinutes: 15,
  closedDates: [],
  autoConfirm: false,
  rules: {
    hr: 'Terasa uz Dravu radi dok vrijeme dopušta — ako pada kiša, smjestit ćemo vas unutra.',
    en: 'The riverside terrace is open weather permitting — if it rains, we will seat you inside.'
  },
  features: { reservations: false, preorder: false, tableMode: true, bill: true, orders: false, songs: false }
};

/* ---------- BURE BAR (pivnica) — pravi raspored stolova lokala (papir od voditelja, 20. 10. 2026.) ----------
   Kategorije kao u dosadašnjem sustavu (Eventlin): Classic 1–23, Silver 24–30, VIP 31.
   Minimalna potrošnja po stolu, naknada za nedolazak po osobi, otkazivanje do 10:00 na dan rezervacije. */
const sq = (id, x, y) => ({ id, zone: 'classic', shape: 'rect', x, y, w: 50, h: 50, seats: [1, 1, 1, 1], min: 1, max: 4 });
const rd = (id, x, y) => ({ id, zone: 'classic', shape: 'round', x, y, r: 24, cross: true, min: 1, max: 4 });
const six = (id, x, y, w = 72) => ({ id, zone: 'silver', shape: 'rect', x, y, w, h: 54, seats: [2, 2, 1, 1], min: 1, max: 6 });
const BURE = {
  venue: 'Bure Bar',
  forms: { loc: 'u Bure Baru', gen: 'iz Bure Bara' },
  phone: '+385 91 605 2339',
  plan: {
    w: 1300, h: 850, rotateMobile: true,
    walls: [
      { type: 'door', x: 15, y: 398, w: 146, h: 138, label: 'ULAZ' },
      { type: 'bar', x: 362, y: 372, w: 656, h: 188, label: 'ŠANK', stools: 0 },
      { type: 'dj', x: 1150, y: 80, w: 76, h: 132, label: 'DJ' }
    ]
  },
  zones: [
    { id: 'classic', name: { hr: 'Classic stolovi', en: 'Classic tables' }, short: 'Classic', minSpend: 60, img: 'classic',
      desc: { hr: 'Stolovi za 4 osobe uz zidove i šank — od 1 do 23.', en: 'Tables for 4 along the walls and the bar — 1 to 23.' } },
    { id: 'silver', name: { hr: 'Silver stolovi', en: 'Silver tables' }, short: 'Silver', minSpend: 100, img: 'silver',
      desc: { hr: 'Stolovi za 6 osoba, bačve i veliki okrugli stol — od 24 do 30.', en: 'Tables for 6, barrels and the big round table — 24 to 30.' } },
    { id: 'vip', name: { hr: 'VIP stol', en: 'VIP table' }, short: 'VIP', minSpend: 250, img: 'vip',
      // VIP doživljaj (prijedlog — lokal mijenja po želji): gost ga vidi u rezervaciji, osoblje dobije podsjetnik za doček
      show: {
        where: { hr: 'u Buretu', en: 'at Bure Bar' },
        tag: { hr: 'Vaša ekipa u središtu večeri', en: 'Your crew at the centre of the night' },
        one: { hr: 'Samo jedan takav stol u Buretu', en: 'The only table like it in the bar' },
        perks: [
          { i: '🎆', hr: 'Boca uz prskalice — ako želite', en: 'Your bottle with sparklers — if you like' },
          { i: '🎤', hr: 'DJ najavljuje vaše ime — ako želite', en: 'The DJ calls out your name — if you like' },
          { i: '🥃', hr: 'Rakija dobrodošlice za cijeli stol — šljiva, travarica, višnja, medica ili viljamovka', en: 'A welcome round for the whole table — plum, herbal, sour cherry, honey or pear brandy' },
          { i: '🧊', hr: 'Stol vas čeka spreman — boca u kibli s ledom, led i limun sa strane, slamke', en: 'Your table is ready when you arrive — the bottle on ice, extra ice and lemon on the side, straws' },
          { i: '🥂', hr: 'Uz premium boce kristalne čaše', en: 'Crystal glasses with premium bottles' },
          { i: '🎧', hr: 'Stol odmah uz DJ-a — najbolje mjesto u Buretu', en: 'Right next to the DJ — the best spot in the bar' },
          { i: '🚪', hr: 'Ulaz bez čekanja — hostesa vas dočeka imenom', en: 'Skip the queue — the host greets you by name' },
          { i: '🤵', hr: 'Vaš konobar cijelu večer — jedan dodir na mobitelu', en: 'Your own waiter all night — one tap on your phone' }
        ],
        // gost bira: prskalice, najavu DJ-a (i tekst najave) i rakiju dobrodošlice za cijeli stol (Badel, iz cjenika Bure Bara)
        choose: { spark: true, dj: true, shots: [
          { id: 'Badel Šljivovica', hr: 'Šljiva', en: 'Plum brandy' },
          { id: 'Badel Travarica', hr: 'Travarica', en: 'Herbal brandy' },
          { id: 'Badel Višnjevac', hr: 'Višnja', en: 'Sour cherry' },
          { id: 'Badel Medica', hr: 'Medica', en: 'Honey brandy' },
          { id: 'Badel Williams', hr: 'Viljamovka', en: 'Pear brandy' }
        ] },
        // premium boce (šampanjci, Grey Goose, Hendrick's…) stižu uz kristalne čaše
        crystal: ['moet-brut', 'moet-rose', 'moet-ice', 'dom-perignon', 'armand-de-brignac', 'grey-goose', 'grey-goose-altius', 'old-pilots-vodka', 'botanist', 'hendricks', 'old-pilots-gin', 'gentleman-jack', 'jd-single-barrel', 'jw-black', 'chivas-12', 'hennessy-vs'],
        // osoblje: stol se postavi prije dolaska (prepMin minuta ranije)
        prep: { min: 15, hr: 'kible s ledom, led i limun sa strane, slamke, kartica s imenom', en: 'ice buckets, extra ice and lemon on the side, straws, a name card' },
        staff: { hr: 'VIP doček', en: 'VIP welcome' },
        always: { hr: 'stol spreman prije dolaska (kible s ledom, led i limun sa strane, slamke), stol uz DJ-a, ulaz bez čekanja i vaš konobar cijelu večer', en: 'your table ready before you arrive (ice buckets, extra ice and lemon on the side, straws), the table by the DJ, no queue and your own waiter all night' }
      },
      desc: { hr: 'Dugi stol za do 16 osoba, odmah uz DJ-a — stol 31.', en: 'The long table for up to 16 guests, right by the DJ — table 31.' } }
  ],
  tables: [
    rd('1', 208, 618), rd('2', 205, 757),
    sq('3', 357, 752), sq('4', 432, 752), sq('5', 557, 752), sq('6', 630, 752), sq('7', 755, 752),
    sq('8', 826, 752), sq('9', 950, 752), sq('10', 1025, 752), sq('11', 1147, 752), sq('12', 1220, 752),
    rd('13', 1093, 559), rd('14', 868, 104), rd('15', 748, 104), rd('16', 628, 104), rd('17', 436, 104),
    rd('18', 238, 262), rd('19', 188, 345),
    sq('20', 165, 75), sq('21', 165, 155), sq('22', 68, 75), sq('23', 68, 155),
    six('24', 78, 290, 74),
    { id: '25', zone: 'silver', shape: 'round', x: 472, y: 225, r: 36, min: 1, max: 6 },
    six('26', 651, 213, 96),
    six('27', 1200, 505), six('28', 1203, 613), six('29', 70, 620), six('30', 68, 758),
    { id: '31', zone: 'vip', shape: 'long', x: 880, y: 212, w: 218, h: 52, seats: [7, 7, 1, 1], min: 1, max: 16, vip: true }
  ],
  hours: { 0: null, 1: null, 2: null, 3: null, 4: H('20:00', '22:00'), 5: H('20:00', '22:00'), 6: H('20:00', '22:00') },
  slotMinutes: 15,
  durationMinutes: 300,          // stol je gostov cijelu večer (dolazak 20:00–22:00)
  leadMinutes: 30,
  daysAhead: 30,
  maxParty: 16,
  holdMinutes: 15,
  closedDates: [],
  autoConfirm: false,
  policy: {
    age: 21,
    dress: { hr: 'Elegant', en: 'Elegant' },
    // jamstvo karticom (29 €) uključuje se kad lokal otvori Stripe
    terms: true
  },
  rules: {
    hr: 'Minimalna potrošnja vrijedi po stolu.',
    en: 'The minimum spend applies per table.'
  },
  // boca uz rezervaciju samo za VIP stol (čeka goste u kibli s ledom)
  features: { reservations: true, preorder: true, preorderZones: ['vip'], preorderOnly: true, tableMode: true, bill: false, orders: false, songs: false, hostess: ['rez'] }
};

/** id → zadane postavke. Redoslijed = redoslijed u nadzornoj ploči vlasnika. */
const VENUES = { qclub: QCLUB, kafanica: KAFANICA, bure: BURE, brooklyn: BROOKLYN };
const VENUE_IDS = Object.keys(VENUES);
const isVenue = v => Object.prototype.hasOwnProperty.call(VENUES, v);

return { VENUES, VENUE_IDS, isVenue };
})();
__m["core"] = (function () {
/* =====================================================================
   TIPTAP SUITE — poslovna logika (radi i na serveru i u pregledniku)
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
/** Kod rezervacije: 4 znamenke (1000–9999) — gost ga lako zapamti i kaže hostesi i kad mu se isprazni mobitel.
    Bez kodova s istim znamenkama (npr. 7777) i bez okruglih tisuća. Jedinstven u danu rezervacije i susjednim danima. */
function shortCode(taken = new Set()) {
  for (let i = 0; i < 200; i++) {
    const b = rbytes(2), n = 1000 + ((b[0] << 8) | b[1]) % 9000, c = String(n);
    if (/^(\d)\1{3}$/.test(c) || /000$/.test(c) || taken.has(c)) continue;
    return c;
  }
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s = ''; for (const x of rbytes(6)) s += A[x % A.length]; return s;   // (praktički nemoguće) sve zauzeto
}
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
  const { venue, forms, phone, plan, zones, tables, hours, slotMinutes, durationMinutes, leadMinutes, daysAhead, maxParty, holdMinutes, closedDates, rules, autoConfirm, features, policy } = cfg;
  return { venue, forms, phone, plan, zones, tables, hours, slotMinutes, durationMinutes, leadMinutes, daysAhead, maxParty, holdMinutes, closedDates, rules, autoConfirm, features, policy: policy || null };
}
/** Kategorija stola (zona s minimalnom potrošnjom i naknadom za nedolazak — npr. Bure Bar: Classic / Silver / VIP). */
function catOf(cfg, tableId) {
  const t = (cfg.tables || []).find(x => x.id === tableId); if (!t) return null;
  const z = (cfg.zones || []).find(x => x.id === t.zone); if (!z) return null;
  return { id: z.id, name: z.name, short: z.short || '', minSpend: +z.minSpend || 0, noShow: +z.noShow || 0 };
}
/** Do kada gost smije sam otkazati (npr. "10:00" na dan rezervacije); null = uvijek. */
function cancelDeadline(cfg, date) { const u = cfg.policy && cfg.policy.cancelUntil; return u && /^\d{2}:\d{2}$/.test(u) ? { date, min: toMin(u) } : null; }
function pastDeadline(cfg, date) {
  const d = cancelDeadline(cfg, date); if (!d) return false;
  const n = zagrebNow(); return n.date > d.date || (n.date === d.date && n.min >= d.min);
}

/* ---------- jamstvo rezervacije karticom ----------
   Pri rezervaciji gost potvrdi karticu (Apple Pay · Google Pay · kartica) — ništa se ne naplaćuje.
   Do roka (12 h prije dolaska) otkazuje besplatno. Od roka je iznos blokiran na kartici;
   hostesa skenira ulaznicu → blokada se ukida. Ne dođe → voditelj potvrdi naplatu (ili oprosti). */
function guarCfg(cfg) { const g = cfg && cfg.policy && cfg.policy.guarantee; return g && +g.eur > 0 ? { eur: +g.eur, hours: +g.hours > 0 ? +g.hours : 12 } : null; }
/** Do kada gost otkazuje besplatno: { date, min } (min 0–1439) — npr. dolazak u 21:00 → 09:00 istog dana. */
function guarDeadline(r) { const h = (r.guar && r.guar.hours) || 12, m = r.start - h * 60, d = Math.floor(m / 1440); return { date: addDays(r.date, d), min: m - d * 1440 }; }
const reached = (dl, n) => n.date > dl.date || (n.date === dl.date && n.min >= dl.min);
const GUAR_FINAL = new Set(['released', 'charged', 'waived', 'free']);
/** Stanje jamstva — card: kartica spremljena, ništa blokirano · held: iznos blokiran (prošao rok za besplatni otkaz)
    · late: prošlo vrijeme dolaska i zadržavanja stola, gost nije stigao · released: stigli, blokada ukinuta
    · charged: naplaćeno (nedolazak ili kasni otkaz) · waived: voditelj nije naplatio · free: otkazano na vrijeme. */
function guarState(r, cfg, now = zagrebNow()) {
  const g = r && r.guar; if (!g) return null;
  if (GUAR_FINAL.has(g.state)) return g.state;
  if (r.status === 'seated' || r.status === 'done') return 'released';
  if (r.status === 'cancelled' || r.status === 'declined') return 'free';
  if (!reached(guarDeadline(r), now)) return 'card';
  return lateBy(r, now) > ((cfg && cfg.holdMinutes) || 15) ? 'late' : 'held';
}
/** Rezervacija s izračunatim stanjem jamstva (za osoblje). */
const withGuar = (r, cfg, now) => (r && r.guar ? { ...r, gs: guarState(r, cfg, now) } : r);
const CARD_BRANDS = ['visa', 'mc', 'amex', 'apple', 'google'];

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
function bestTable(cfg, list, party, start, zone) {
  return cfg.tables.filter(t => !t.noRes && (!zone || t.zone === zone) && fits(t, party) && tableFree(cfg, list, t.id, start))
    .sort((a, b) => (a.max - b.max) || ((a.vip ? 1 : 0) - (b.vip ? 1 : 0)))[0] || null;
}
function cleanPhone(p) {
  let s = String(p || '').replace(/[^\d+]/g, '');
  if (s.startsWith('00')) s = '+' + s.slice(2);
  if (s.startsWith('0')) s = '+385' + s.slice(1);
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
  return list.slice(0, 8).map(x => ({ id: str(x.id, 80), name: str(x.name, 80), vol: str(x.vol, 16), eur: num(x.eur, 0, 10000) ?? 0, qty: Math.floor(num(x.qty, 1, 10) ?? 1) }))
    .filter(x => x.name);
}
const preorderTotal = r => (r.preorder || []).reduce((a, x) => a + x.eur * x.qty, 0);

/* =====================================================================
   POZNATI GOST: profil po broju mobitela — posjete, nedolasci, omiljena boca, rođendan, napomena osoblja.
   Uz svaku rezervaciju sprema se kratka snimka profila (r.guest), pa popis večeri ne treba dodatna čitanja.
   ===================================================================== */
const guestKey = phone => { const d = String(phone || '').replace(/\D/g, ''); return d.length >= 8 ? `guest/${d}` : null; };
const GP0 = () => ({ name: '', visits: 0, noShows: 0, cancels: 0, bookings: 0, first: '', last: '', bottles: {}, occ: [], hist: [], note: '', spend: 0 });
async function guestGet(store, phone) { const k = guestKey(phone); if (!k) return null; const r = await store.getJSON(k); return r?.data || null; }
/** Sažetak profila za osoblje (snimka uz rezervaciju). */
function guestSnap(g) {
  if (!g) return { visits: 0, noShows: 0 };
  const fav = Object.entries(g.bottles || {}).sort((a, b) => b[1] - a[1])[0];
  const bday = (g.occ || []).filter(o => o.t === 'rodjendan').map(o => o.d).sort().pop() || '';
  return { visits: g.visits || 0, noShows: g.noShows || 0, cancels: g.cancels || 0, last: g.last || '', fav: fav ? fav[0] : '', favN: fav ? fav[1] : 0, bday, note: g.note || '', spend: Math.round(g.spend || 0) };
}
async function guestBump(store, r, fn) {
  const k = guestKey(r.phone); if (!k) return null;
  return mutate(store, k, GP0, g => { if (r.name) g.name = r.name; fn(g); return { ok: true }; });
}
const visitBump = r => g => {
  g.visits = (g.visits || 0) + 1;
  if (!g.first || r.date < g.first) g.first = r.date;
  if (!g.last || r.date > g.last) g.last = r.date;
  g.bottles = g.bottles || {}; for (const x of r.preorder || []) g.bottles[x.name] = (g.bottles[x.name] || 0) + (x.qty || 1);
  g.spend = (g.spend || 0) + preorderTotal(r);
  g.hist = [{ d: r.date, t: r.tableId, p: r.party, b: (r.preorder || []).map(x => x.name).join(', ') }, ...(g.hist || []).filter(h => h.d !== r.date)].slice(0, 8);
};
/** VIP doček (zona s "show"): gost bira prskalice, najavu DJ-a i rakiju za rundu dobrodošlice. */
function vipOf(cfg, tableId) { const t = (cfg.tables || []).find(x => x.id === tableId); const z = t && (cfg.zones || []).find(x => x.id === t.zone); return z && z.show ? z.show : null; }
/** Rakije dobrodošlice: { id: 'Badel Šljivovica', hr: 'Šljiva', en: 'Plum brandy' } (ili samo naziv). */
const shotsOf = sh => ((sh && sh.choose && sh.choose.shots) || []).map(s => typeof s === 'string' ? { id: s, hr: s, en: s } : s);
const shotOf = (sh, id) => (id ? shotsOf(sh).find(s => s.id === id) || null : null);
/** Premium boca uz rezervaciju (šampanjac, Grey Goose…) → kristalne čaše; vraća prvu takvu bocu. */
const crystalOf = (sh, pre) => { const L = (sh && sh.crystal) || []; return (pre || []).find(x => L.includes(String(x.id || '').split('@')[0])) || null; };
function cleanVip(sh, v) {
  if (!sh || !sh.choose || !v || typeof v !== 'object') return null;
  const c = sh.choose, dj = !!(v.dj && c.dj);
  return { spark: !!(v.spark && c.spark), dj, djName: dj ? str(v.djName, 60) : '', shot: shotOf(sh, v.shot) ? v.shot : '' };
}
function vipLine(v, sh, L = 'hr', pre = []) {
  const hr = L !== 'en', a = [];
  if (v && v.spark) a.push(hr ? 'boca uz prskalice' : 'your bottle with sparklers');
  if (v && v.dj) a.push(sh && sh.act ? (v.djName ? (hr ? `${sh.act.hr} pozdravlja „${v.djName}”` : `${sh.act.en} greets “${v.djName}”`) : (hr ? `${sh.act.hr} vas pozdravlja s bine` : `${sh.act.en} greets you from the stage`)) : v.djName ? (hr ? `DJ najavljuje „${v.djName}”` : `the DJ calls out “${v.djName}”`) : (hr ? 'DJ najavljuje vaše ime' : 'the DJ calls out your name'));
  const sh1 = shotOf(sh, v && v.shot);
  if (sh1) a.push(hr ? `rakija dobrodošlice za cijeli stol: ${sh1.hr.toLowerCase()}` : `a welcome round of ${sh1.en.toLowerCase()} for the table`);
  else if (shotsOf(sh).length) a.push(hr ? 'rakija dobrodošlice za cijeli stol' : 'a welcome round for the whole table');
  const cr = crystalOf(sh, pre); if (cr) a.push(hr ? `kristalne čaše uz ${cr.name}` : `crystal glasses with your ${cr.name}`);
  const al = sh && sh.always ? (sh.always[L] || sh.always.hr) : '';
  return (hr ? 'Vaš VIP doček: ' : 'Your VIP welcome: ') + [...a, al].filter(Boolean).join(', ') + '.';
}
/** Kapara (npr. VIP stol): iznos iz zone stola; 0 = bez kapare. */
function depositOf(cfg, tableId) {
  const t = (cfg.tables || []).find(x => x.id === tableId); const z = t && (cfg.zones || []).find(x => x.id === t.zone);
  return z && +z.deposit > 0 ? +z.deposit : 0;
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
async function createReservation(store, body, { admin = false, pay = false } = {}) {
  const cfg = await getConfig(store);
  // jamstvo karticom (samo za rezervacije gostiju i samo kad je plaćanje uključeno)
  const gc = !admin && pay ? guarCfg(cfg) : null;
  let card = null;
  if (gc) {
    const c = body.card || {};
    card = { brand: CARD_BRANDS.includes(c.brand) ? c.brand : '', last4: /^\d{4}$/.test(String(c.last4 || '')) ? String(c.last4) : '' };
    if (!card.brand || !card.last4) return { error: 'card', status: 402 };
  }
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
    if (cfg.policy && cfg.policy.terms && !body.terms) return { error: 'terms', status: 400 };
    const last = addDays(now.date, cfg.daysAhead);
    if (date < now.date || date > last) return { error: 'date', status: 400 };
    if (!slotsFor(cfg, date).includes(start)) return { error: 'time', status: 400 };
    if (date === now.date && start < now.min + cfg.leadMinutes) return { error: 'time', status: 400 };
  } else if (!(start >= 0 && start < 2880)) return { error: 'time', status: 400 };
  const preorder = cfg.features?.preorder ? cleanPreorder(body.preorder) : [];
  // kodovi susjednih dana (hostesa traži kod danas, sutra i jučer) — da se kod ne ponovi
  const near = new Set();
  for (const d of [addDays(date, -1), addDays(date, 1)]) for (const x of (await readDay(store, d)).list) if (x.code) near.add(String(x.code));
  const gp = phone ? await guestGet(store, phone) : null;   // poznati gost: kako ga osoblje vidi u trenutku rezervacije

  const res = await mutateDay(store, date, list => {
    let table = null;
    if (body.tableId && body.tableId !== 'any') {
      table = cfg.tables.find(t => t.id === body.tableId);
      if (!table) return { error: 'table', status: 400 };
      if (!admin && table.noRes) return { error: 'nores', status: 409 };   // npr. pušiona — samo bez rezervacije
      if (!admin && !fits(table, party)) return { error: 'fit', status: 409 };
      if (!tableFree(cfg, list, table.id, start)) return { error: 'taken', status: 409 };
    } else {
      const zone = str(body.zone, 20); 
      table = bestTable(cfg, list, party, start, (cfg.zones || []).some(z => z.id === zone) ? zone : null);
      if (!table) return { error: 'full', status: 409 };
    }
    const at = isoNow();
    const cat = catOf(cfg, table.id), dep = depositOf(cfg, table.id), depPaid = !!(admin && body._deposit === 'paid'), vip = cleanVip(vipOf(cfg, table.id), body.vip);
    const pre = cfg.features?.preorderOnly && !(cfg.features.preorderZones || []).includes(table.zone) ? [] : preorder;   // npr. Bure: boca samo uz VIP stol
    // rezervacija zajamčena karticom potvrđuje se odmah — gost odmah dobiva potvrdu, voditelj obavijest
    const st0 = admin ? (['pending', 'confirmed', 'seated', 'done', 'noshow'].includes(body.status) ? body.status : 'confirmed') : (cfg.autoConfirm || gc ? 'confirmed' : 'pending');
    const r = {
      id: token(8), code: shortCode(new Set([...near, ...list.map(x => String(x.code || ''))])), key: token(16),
      date, start, end: start + cfg.durationMinutes, party, tableId: table.id,
      name, phone: phone || phoneRaw, email, note: str(body.note, 400), occasion: str(body.occasion, 30),
      preorder: pre, sparkler: !!(pre.length && body.sparkler),
      ...(cat && (cat.minSpend || cat.noShow) ? { cat: cat.id, minSpend: cat.minSpend, noShowFee: cat.noShow } : {}),
      lang: body.lang === 'en' ? 'en' : 'hr',
      status: st0,
      guest: guestSnap(gp),
      ...(dep ? { deposit: { eur: dep, paid: depPaid, ...(depPaid ? { paidAt: at, by: 'staff' } : {}) } } : {}),
      ...(gc ? { guar: { eur: gc.eur, hours: gc.hours, card, at, state: 'card' } } : {}),
      ...(admin && body._guar && guarCfg(cfg) ? { guar: { eur: guarCfg(cfg).eur, hours: guarCfg(cfg).hours, card: body._guar.card || { brand: 'visa', last4: '4242' }, at, state: body._guar.state || 'card', ...(body._guar.state === 'released' ? { releasedAt: at, by: 'hostesa' } : body._guar.state === 'charged' ? { chargedAt: at, reason: body._guar.reason || 'noshow' } : {}) } } : {}),
      ...(vip ? { vip } : {}),
      ...(st0 === 'seated' || st0 === 'done' ? { gv: 1 } : st0 === 'noshow' ? { gn: 1 } : {}),
      ...(admin && body._arrive ? { arrive: str(body._arrive, 30) } : {}),
      ...(admin && body._lateMin != null && body.status === 'seated' ? { lateMin: Math.round(Number(body._lateMin)) || 0, checkedBy: 'hostesa', ...(['qr', 'code'].includes(body._via) ? { via: body._via } : {}) } : {}),
      source: admin ? str(body.source || 'staff', 20) : 'web',
      bookedAt: now,   // lokalno (Zagreb) vrijeme rezervacije — za raspored poruka gostu
      createdAt: body._at && admin ? str(body._at, 30) : at, updatedAt: at, history: []
    };
    list.push(r);
    return { ok: true, reservation: r, table };
  });
  if (res.ok) {
    await setIndex(store, res.reservation.id, date);
    const r = res.reservation;
    await guestBump(store, r, g => {
      g.bookings = (g.bookings || 0) + 1;
      if (r.occasion) g.occ = [...(g.occ || []), { t: r.occasion, d: r.date }].slice(-12);
      if (r.gv) visitBump(r)(g);
      if (r.gn) g.noShows = (g.noShows || 0) + 1;
    });
  }
  return res;
}
const guestView = (r, cfg) => ({ id: r.id, code: r.code, date: r.date, start: r.start, end: r.end, party: r.party, tableId: r.tableId, name: r.name, status: r.status, note: r.note, occasion: r.occasion, lang: r.lang, preorder: r.preorder || [], sparkler: !!r.sparkler, cat: r.cat || null, minSpend: r.minSpend || 0, noShowFee: r.noShowFee || 0, arrive: !!r.arrive, reminded: !!r.remindedAt, deposit: r.deposit ? { eur: r.deposit.eur, paid: !!r.deposit.paid } : null, back: !!(r.guest && r.guest.visits > 0), vip: r.vip || null,
  guar: r.guar ? { eur: r.guar.eur, hours: r.guar.hours, card: r.guar.card, state: guarState(r, cfg), dl: guarDeadline(r), reason: r.guar.reason || '', releasedAt: r.guar.releasedAt || '', chargedAt: r.guar.chargedAt || '' } : null });
async function getReservation(store, id, key, site = '') {
  const date = await findDate(store, str(id, 40));
  if (!date) return { error: 'notfound', status: 404 };
  const { list } = await readDay(store, date);
  const r = list.find(x => x.id === id);
  if (!r || !safeEqual(r.key, key || '')) return { error: 'notfound', status: 404 };
  const cfg = await getConfig(store);
  const notice = (r.status === 'confirmed' || r.status === 'declined') ? guestMessage(r, cfg, site, r.status) : '';
  const msgs = r.guar && r.status === 'confirmed' ? guestTimeline(r, cfg, site) : null;
  return { ok: true, reservation: guestView(r, cfg), table: cfg.tables.find(t => t.id === r.tableId) || null, config: publicConfig(cfg), notice, msgs };
}
/** Gost otkazuje. Sa jamstvom: do roka besplatno; nakon roka samo uz pristanak na naknadu (fee: true). */
async function cancelByGuest(store, id, key, fee = false) {
  const date = await findDate(store, str(id, 40));
  if (!date) return { error: 'notfound', status: 404 };
  const cfg = await getConfig(store);
  return mutateDay(store, date, list => {
    const r = list.find(x => x.id === id);
    if (!r || !safeEqual(r.key, key || '')) return { error: 'notfound', status: 404 };
    if (!['pending', 'confirmed'].includes(r.status)) return { error: 'state', status: 409 };
    const at = isoNow();
    if (r.guar && !GUAR_FINAL.has(r.guar.state)) {
      const late = reached(guarDeadline(r), zagrebNow());
      if (late && !fee) return { error: 'late', status: 409, fee: r.guar.eur };
      Object.assign(r.guar, late ? { state: 'charged', reason: 'late-cancel', chargedAt: at } : { state: 'free', freedAt: at });
    } else if (r.status === 'confirmed' && pastDeadline(cfg, r.date)) return { error: 'late', status: 409 };
    r.status = 'cancelled'; r.updatedAt = at; r.history.push({ at, by: 'guest', to: 'cancelled' });
    return { ok: true, reservation: r };
  }).then(async res => { if (res.ok) await guestBump(store, res.reservation, g => { g.cancels = (g.cancels || 0) + 1; }); return res; });
}

/** Gost jednim dodirom potvrđuje dolazak (link iz podsjetnika). */
async function confirmArrival(store, id, key) {
  const date = await findDate(store, str(id, 40));
  if (!date) return { error: 'notfound', status: 404 };
  return mutateDay(store, date, list => {
    const r = list.find(x => x.id === id);
    if (!r || !safeEqual(r.key, key || '')) return { error: 'notfound', status: 404 };
    if (r.status !== 'confirmed') return { error: 'state', status: 409 };
    if (!r.arrive) { r.arrive = isoNow(); r.updatedAt = r.arrive; r.history.push({ at: r.arrive, by: 'guest', to: 'arrive' }); }
    return { ok: true, reservation: r };
  });
}
/** Osoblje šalje podsjetnik (WhatsApp) — bilježimo kad je poslan. */
async function adminRemind(store, id) {
  const date = await findDate(store, str(id, 40));
  if (!date) return { error: 'notfound', status: 404 };
  return mutateDay(store, date, list => {
    const r = list.find(x => x.id === id);
    if (!r) return { error: 'notfound', status: 404 };
    if (r.status !== 'confirmed') return { error: 'state', status: 409 };
    r.remindedAt = isoNow(); r.updatedAt = r.remindedAt; r.history.push({ at: r.remindedAt, by: 'staff', to: 'remind' });
    return { ok: true, reservation: r };
  });
}

/* ---------- ulaz (hostesa): pretraga i uvođenje gostiju ---------- */
/** Koliko minuta je prošlo od dogovorenog dolaska (negativno = rano). */
function lateBy(r, now = zagrebNow()) {
  const P = d => { const [y, m, dd] = d.split('-').map(Number); return Date.UTC(y, m - 1, dd); };
  return Math.round((P(now.date) - P(r.date)) / 864e5) * 1440 + now.min - r.start;
}
async function findRes(store, id) {
  id = str(id, 40); const date = await findDate(store, id);
  if (!date) return { error: 'notfound', status: 404 };
  const { list } = await readDay(store, date);
  const r = list.find(x => x.id === id);
  return r ? { ok: true, reservation: withGuar(r, await getConfig(store)) } : { error: 'notfound', status: 404 };
}
async function findCode(store, code) {
  const c = str(code, 16).toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (c.length < 4) return { error: 'code', status: 400 };
  const b = bizNow();
  for (const d of [b.date, addDays(b.date, 1), addDays(b.date, -1)]) {
    const { list } = await readDay(store, d);
    const r = list.find(x => String(x.code || '').toUpperCase() === c);
    if (r) return { ok: true, reservation: withGuar(r, await getConfig(store)) };
  }
  return { error: 'notfound', status: 404 };
}
async function checkIn(store, body, by = 'hostesa') {
  const cfg = await getConfig(store);
  const id = str(body.id, 40); const date = await findDate(store, id);
  if (!date) return { error: 'notfound', status: 404 };
  return mutateDay(store, date, list => {
    const r = list.find(x => x.id === id);
    if (!r) return { error: 'notfound', status: 404 };
    if (!['confirmed', 'pending', 'noshow'].includes(r.status)) return { error: 'state', status: 409 };
    if (body.tableId && body.tableId !== r.tableId) {
      if (!cfg.tables.find(t => t.id === body.tableId)) return { error: 'table', status: 400 };
      if (!tableFree(cfg, list, body.tableId, r.start, r.id)) return { error: 'taken', status: 409 };
      r.tableId = str(body.tableId, 12);
      const c = catOf(cfg, r.tableId);
      if (c && (c.minSpend || c.noShow)) Object.assign(r, { cat: c.id, minSpend: c.minSpend, noShowFee: c.noShow }); else { delete r.cat; delete r.minSpend; delete r.noShowFee; }
    }
    if (body.party != null) { const p = Math.floor(Number(body.party)); if (p >= 1 && p <= 60) r.party = p; }
    const before = r.status;
    r.status = 'seated'; r.arrivedAt = isoNow(); r.lateMin = lateBy(r); r.checkedBy = str(by, 20); r.updatedAt = r.arrivedAt;
    if (body.via === 'qr' || body.via === 'code') r.via = body.via; else delete r.via;   // skenirana ulaznica / kod s ulaznice / pronađeni na popisu
    r.history.push({ at: r.arrivedAt, by: r.checkedBy, from: before, to: 'seated' });
    // gost je stigao → blokada jamstva se ukida (ako je bilo naplaćeno, voditelj vraća ručno)
    if (r.guar && !GUAR_FINAL.has(r.guar.state)) Object.assign(r.guar, { state: 'released', releasedAt: r.arrivedAt, by: r.checkedBy });
    const gv = !r.gv, undoNs = gv && !!r.gn; r.gv = 1; if (undoNs) r.gn = 0;
    return { ok: true, reservation: r, gv, undoNs };
  }).then(async res => {
    if (res.ok && res.gv) await guestBump(store, res.reservation, g => { visitBump(res.reservation)(g); if (res.undoNs) g.noShows = Math.max(0, (g.noShows || 0) - 1); });
    if (res.ok) res.reservation = withGuar(res.reservation, cfg);
    return res;
  });
}

/* ---------- poznati gost: profil i napomena osoblja ---------- */
async function adminGuest(store, id) {
  const f = await findRes(store, id); if (f.error) return f;
  const g = await guestGet(store, f.reservation.phone);
  return { ok: true, guest: g ? { ...guestSnap(g), name: g.name, bookings: g.bookings || 0, first: g.first || '', hist: g.hist || [], bottles: g.bottles || {}, occ: g.occ || [] } : null };
}
async function adminGuestNote(store, body) {
  const f = await findRes(store, body.id); if (f.error) return f;
  const r0 = f.reservation, note = str(body.note, 300);
  if (!guestKey(r0.phone)) return { error: 'phone', status: 400 };
  await guestBump(store, r0, g => { g.note = note; });
  const date = await findDate(store, r0.id);
  return mutateDay(store, date, list => { const r = list.find(x => x.id === r0.id); if (r) r.guest = { ...(r.guest || {}), note }; return { ok: true, reservation: r }; });
}
/* ---------- kapara: gost plaća (demo odmah), osoblje može označiti ručno ---------- */
async function payDeposit(store, id, key) {
  const date = await findDate(store, str(id, 40)); if (!date) return { error: 'notfound', status: 404 };
  return mutateDay(store, date, list => {
    const r = list.find(x => x.id === id);
    if (!r || !safeEqual(r.key, key || '')) return { error: 'notfound', status: 404 };
    if (!r.deposit) return { error: 'nodeposit', status: 400 };
    if (['cancelled', 'declined'].includes(r.status)) return { error: 'state', status: 409 };
    if (!r.deposit.paid) { r.deposit.paid = true; r.deposit.paidAt = isoNow(); r.deposit.by = 'guest'; r.updatedAt = r.deposit.paidAt; r.history.push({ at: r.updatedAt, by: 'guest', to: 'deposit' }); }
    return { ok: true, reservation: r };
  });
}
async function adminDeposit(store, body) {
  const id = str(body.id, 40); const date = await findDate(store, id); if (!date) return { error: 'notfound', status: 404 };
  return mutateDay(store, date, list => {
    const r = list.find(x => x.id === id); if (!r) return { error: 'notfound', status: 404 };
    if (!r.deposit) return { error: 'nodeposit', status: 400 };
    r.deposit.paid = body.paid !== false; r.deposit.paidAt = r.deposit.paid ? isoNow() : null; r.deposit.by = 'staff';
    r.updatedAt = isoNow(); r.history.push({ at: r.updatedAt, by: 'staff', to: r.deposit.paid ? 'deposit' : 'deposit-undo' });
    return { ok: true, reservation: r };
  });
}

/* =====================================================================
   GARDEROBA (hostesa): broj na mobitelu gosta umjesto papirića
   ===================================================================== */
/* 'kaput' ostaje samo radi starijih zapisa — novi unos koristi "Jakna / kaput". */
const COAT_KINDS = { jakna: ['Jakna / kaput', 'Jacket / coat', '🧥'], kaput: ['Kaput', 'Coat', '🧥'], torba: ['Torba', 'Bag', '👜'], ruksak: ['Ruksak', 'Backpack', '🎒'], vrecica: ['Vrećica', 'Shopping bag', '🛍️'], kisobran: ['Kišobran', 'Umbrella', '☂️'], kapa: ['Kapa / šal', 'Hat / scarf', '🧣'], kaciga: ['Kaciga', 'Helmet', '⛑️'], ostalo: ['Ostalo', 'Other', '📦'] };
const COAT_MAX = 400;
const coatKey = d => `coat/${d}`;
const coatNow = () => { const b = bizNow(); return { date: b.date, min: b.min }; };
const coatPublic = (x, cfg) => ({ id: x.id, no: x.no, items: x.items, desc: x.desc, name: x.name, status: x.status, atMin: x.atMin, outMin: x.outMin ?? null, ph: !!x.ph, venue: cfg ? cfg.venue : '' });
const coatLite = x => { const { photo, ...rest } = x; return rest; };
async function coatList(store) {
  const n = coatNow(); const list = await read(store, coatKey(n.date), []);
  const used = new Set(list.filter(x => x.status === 'in').map(x => x.no)); let next = null;
  for (let i = 1; i <= COAT_MAX; i++) if (!used.has(i)) { next = i; break; }
  return { ok: true, date: n.date, now: n, list: list.map(coatLite), next, max: COAT_MAX };
}
async function coatNew(store, body, by = 'hostesa') {
  const items = (Array.isArray(body.items) ? body.items : []).map(x => ({ t: COAT_KINDS[x && x.t] ? x.t : 'ostalo', n: Math.max(1, Math.min(9, Math.floor(+(x && x.n) || 1))) })).slice(0, 8);
  if (!items.length) return { error: 'items', status: 400 };
  const photo = typeof body.photo === 'string' && /^data:image\/(jpeg|webp|png);base64,[A-Za-z0-9+/=]+$/.test(body.photo) && body.photo.length < 200000 ? body.photo : '';
  const n = coatNow();
  const res = await mutate(store, coatKey(n.date), [], list => {
    const used = new Set(list.filter(x => x.status === 'in').map(x => x.no));
    let no = Math.floor(+body.no) || 0;
    if (no) { if (no < 1 || no > COAT_MAX) return { error: 'no', status: 400 }; if (used.has(no)) return { error: 'taken', status: 409 }; }
    else { for (let i = 1; i <= COAT_MAX; i++) if (!used.has(i)) { no = i; break; } if (!no) return { error: 'full', status: 409 }; }
    const it = { id: token(8), k: token(12), no, items, desc: str(body.desc, 80), name: str(body.name, 40), table: str(body.table, 12), ph: !!photo, status: 'in', at: isoNow(), atMin: Number.isFinite(+body._min) ? Math.round(+body._min) : n.min, by: str(by, 20) };
    if (body._status === 'out') Object.assign(it, { status: 'out', outMin: Math.round(+body._outMin || n.min) });
    list.push(it); return { ok: true, ticket: it };
  });
  if (res.ok && photo) await store.setJSON(`coatp/${res.ticket.id}`, { photo }, null);
  return res;
}
async function coatFindRaw(store, pred) {
  const n = coatNow();
  for (const d of [n.date, addDays(n.date, -1)]) { const list = await read(store, coatKey(d), []); const x = list.filter(pred).sort((a, b) => (a.status === 'in' ? 0 : 1) - (b.status === 'in' ? 0 : 1))[0]; if (x) return { x, date: d }; }
  return null;
}
async function coatFind(store, q) {
  const no = Math.floor(+q.no) || 0, id = str(q.id, 40), k = str(q.k, 40);
  const f = await coatFindRaw(store, x => (id ? x.id === id && (!k || safeEqual(x.k, k)) : x.no === no));
  return f ? { ok: true, ticket: coatLite(f.x), date: f.date } : { error: 'notfound', status: 404 };
}
async function coatOut(store, body, by = 'hostesa') {
  const id = str(body.id, 40); const n = coatNow();
  for (const d of [n.date, addDays(n.date, -1)]) {
    const r = await mutate(store, coatKey(d), [], list => {
      const x = list.find(y => y.id === id); if (!x) return { noop: true, miss: true };
      if (x.status !== 'in') return { error: 'state', status: 409 };
      x.status = 'out'; x.outMin = n.min + (d < n.date ? 1440 : 0); x.outAt = isoNow(); x.outBy = str(by, 20);
      return { ok: true, ticket: coatLite(x) };
    });
    if (!(r && r.miss)) return r;
  }
  return { error: 'notfound', status: 404 };
}
async function coatPhoto(store, id) { const r = await store.getJSON(`coatp/${str(id, 40)}`); return { ok: true, photo: (r && r.data && r.data.photo) || '' }; }
async function coatGuest(store, id, k) {
  const f = await coatFindRaw(store, x => x.id === str(id, 40) && safeEqual(x.k, str(k, 40)));
  if (!f) return { error: 'notfound', status: 404 };
  const cfg = await getConfig(store);
  return { ok: true, ticket: coatPublic(f.x, cfg), date: f.date, kinds: COAT_KINDS };
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
  const now = zagrebNow();
  return { ok: true, date, list: list.sort((a, b) => a.start - b.start).map(r => withGuar(r, cfg, now)), config: cfg, slots: slotsFor(cfg, date), now, biz: bizNow() };
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
    if (r.status === 'seated' && before !== 'seated' && before !== 'done') { r.arrivedAt = isoNow(); r.lateMin = lateBy(r); r.checkedBy = 'voditelj'; delete r.via; }   // voditelj ih je uveo ručno
    // jamstvo: voditelj potvrđuje naplatu za nedolazak (ili ne naplaćuje); ručni status također vodi jamstvo
    if (r.guar && !GUAR_FINAL.has(r.guar.state)) {
      const at = isoNow();
      if (body.guar === 'charge') { Object.assign(r.guar, { state: 'charged', reason: 'noshow', chargedAt: at }); r.status = 'noshow'; }
      else if (body.guar === 'waive') { Object.assign(r.guar, { state: 'waived', waivedAt: at }); r.status = 'noshow'; }
      else if (r.status === 'seated' || r.status === 'done') Object.assign(r.guar, { state: 'released', releasedAt: at, by: 'voditelj' });
      else if (r.status === 'cancelled' || r.status === 'declined') Object.assign(r.guar, { state: 'free', freedAt: at });
    }
    if (body.tableId && body.tableId !== r.tableId) {
      if (!cfg.tables.find(t => t.id === body.tableId)) return { error: 'table', status: 400 };
      if (ACTIVE.has(r.status) && !tableFree(cfg, list, body.tableId, r.start, r.id)) return { error: 'taken', status: 409 };
      r.tableId = body.tableId;
      const c = catOf(cfg, r.tableId);
      if (c && (c.minSpend || c.noShow)) Object.assign(r, { cat: c.id, minSpend: c.minSpend, noShowFee: c.noShow }); else { delete r.cat; delete r.minSpend; delete r.noShowFee; }
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
    let gv = false, gn = false, undoNs = false;
    if (before !== r.status) {
      if ((r.status === 'seated' || r.status === 'done') && !r.gv) { r.gv = 1; gv = true; if (r.gn) { r.gn = 0; undoNs = true; } }
      else if (r.status === 'noshow' && !r.gn && !r.gv) { r.gn = 1; gn = true; }
    }
    return { ok: true, reservation: r, changedStatus: before !== r.status, gv, gn, undoNs };
  });
  if (res.ok && (res.gv || res.gn)) await guestBump(store, res.reservation, g => { if (res.gv) visitBump(res.reservation)(g); if (res.undoNs) g.noShows = Math.max(0, (g.noShows || 0) - 1); if (res.gn) g.noShows = (g.noShows || 0) + 1; });
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
  if (res.ok) res.reservation = withGuar(res.reservation, cfg);
  return res;
}
async function adminSaveConfig(store, cfgIn) {
  const cur = await getConfig(store);
  const next = { ...cur };
  const keys = ['venue', 'phone', 'plan', 'zones', 'tables', 'hours', 'slotMinutes', 'durationMinutes', 'leadMinutes', 'daysAhead', 'maxParty', 'holdMinutes', 'closedDates', 'autoConfirm', 'rules', 'features', 'policy'];
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
    // nw: kad je stigla zadnja rezervacija gosta s weba — voditelj dobiva obavijest i za zajamčene (odmah potvrđene) rezervacije
    const nw = list.filter(r => r.source === 'web').reduce((m, r) => (r.createdAt > m ? r.createdAt : m), '');
    out.push({ date: d, pending: list.filter(r => r.status === 'pending').length, total: act.length, guests: act.reduce((a, r) => a + r.party, 0), nw });
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
    const items = Array.isArray(body.items) ? body.items.slice(0, 25).map(x => ({ id: str(x.id, 80), n: str(x.n, 80), v: str(x.v, 24), q: Math.floor(num(x.q, 1, 20) ?? 1), e: num(x.e, 0, 10000) ?? 0 })).filter(x => x.n) : [];
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
const TOPICS = ['usluga', 'pice', 'cekanje', 'cistoca', 'glazba', 'racun', 'pohvala', 'ostalo'];
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
    const pv = {}; for (const [i, e] of Object.entries(v || {})) { const x = num(e, 0, 10000); if (x != null && /^\d{1,2}$/.test(i)) pv[i] = Math.round(x * 100) / 100; }
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
    tonight: { res: act.length, guests: act.reduce((a, r) => a + r.party, 0), pending: list.filter(r => r.status === 'pending').length, seated: list.filter(r => r.status === 'seated').length, pre: act.reduce((a, r) => a + preorderTotal(r), 0), preOver: act.reduce((a, r) => a + Math.max(0, preorderTotal(r) - (r.minSpend || 0)), 0), tables: cfg.tables.length, booked: new Set(act.map(r => r.tableId)).size, minSpend: act.reduce((a, r) => a + (r.minSpend || 0), 0), arrived: act.filter(r => r.status === 'seated').length, regulars: act.filter(r => r.guest && r.guest.visits >= 2).length, deposits: act.filter(r => r.deposit && r.deposit.paid).reduce((a, r) => a + (r.deposit.eur || 0), 0), late: day === b.date ? act.filter(r => r.status !== 'seated' && lateBy(r) > 5).length : 0,
      guar: act.filter(r => r.guar).length, guarCharged: list.filter(r => r.guar && r.guar.state === 'charged').reduce((a, r) => a + (r.guar.eur || 0), 0), guarLate: list.filter(r => guarState(r, cfg) === 'late').length },
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
const DAYS = { hr: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'], en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] };
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function humanDate(date, lang = 'hr') { const [, m, d] = date.split('-'); return lang === 'en' ? `${DAYS.en[weekday(date)]}, ${+d} ${MONTHS_EN[+m - 1]}` : `${DAYS.hr[weekday(date)]}, ${+d}.${+m}.`; }
const formsOf = cfg => cfg.forms || { loc: 'u ' + cfg.venue, gen: 'iz ' + cfg.venue };
const eur = (v, L) => new Intl.NumberFormat(L === 'en' ? 'en-IE' : 'hr-HR', { style: 'currency', currency: 'EUR', minimumFractionDigits: Number.isInteger(+v) ? 0 : 2, maximumFractionDigits: 2 }).format(v);
const CARD_NAME = { visa: 'Visa', mc: 'Mastercard', amex: 'Amex', apple: 'Apple Pay', google: 'Google Pay' };
const cardLabel = c => (c ? `${CARD_NAME[c.brand] || 'Kartica'} •••• ${c.last4}` : '');
/** Trenutak pomaknut za delta minuta: { date, min } (min 0–1439). */
function shiftDM(date, min, delta) { const m = min + delta, d = Math.floor(m / 1440); return { date: addDays(date, d), min: m - d * 1440 }; }
function dlText(r, L) {
  const dl = guarDeadline(r), same = dl.date === r.date;
  return L === 'hr' ? (same ? `do ${fmt(dl.min)} na dan dolaska` : `do ${humanDate(dl.date, L)} u ${fmt(dl.min)}`) : (same ? `until ${fmt(dl.min)} on the day` : `until ${humanDate(dl.date, L)} at ${fmt(dl.min)}`);
}
function guarMsg(r, L, cfg) {
  const v = eur(r.guar.eur, L), c = cardLabel(r.guar.card), h = r.guar.hours || 12, W = !!(cfg && cfg.features && cfg.features.door === 'waiter');
  // rezervirano kad je rok za besplatni otkaz već prošao (npr. danas za večeras): blokada odmah
  if (r.bookedAt && reached(guarDeadline(r), r.bookedAt)) return L === 'hr'
    ? `💳 Jamstvo ${v} · ${c}\nDo dolaska je manje od ${h} sati, pa je ${v} odmah blokirano na kartici — ništa nije naplaćeno. Čim ${W ? 'konobar' : 'hostesa'} skenira vašu ulaznicu, blokada se ukida. Ako otkažete ili ne dođete, naplaćuje se ${v}.`
    : `💳 ${v} guarantee · ${c}\nYour arrival is less than ${h} hours away, so ${v} is held on your card now — nothing has been charged. It's released as soon as ${W ? 'a waiter' : 'the host'} scans your ticket. If you cancel or don't show up, ${v} is charged.`;
  return L === 'hr'
    ? `💳 Jamstvo ${v} · ${c} — ništa nije naplaćeno.\nBesplatno otkazivanje ${dlText(r, L)}. Od tada je ${v} blokirano na kartici, a čim ${W ? 'konobar' : 'hostesa'} skenira vašu ulaznicu, blokada se ukida.`
    : `💳 ${v} guarantee · ${c} — nothing has been charged.\nFree cancellation ${dlText(r, L)}. After that ${v} is held on your card and released as soon as ${W ? 'a waiter' : 'the host'} scans your ticket.`;
}
/** WhatsApp poruke koje gost dobiva: potvrda odmah, podsjetnik dan prije, „vidimo se” 2 h prije (bez gnjavaže — najviše 3). */
function guestTimeline(r, cfg, site, now = zagrebNow()) {
  const abs = dm => Date.parse(dm.date + 'T00:00:00Z') / 6e4 + dm.min;   // minute za usporedbu
  const booked = r.bookedAt || null;
  const rem = shiftDM(r.date, r.start, -24 * 60), soon = shiftDM(r.date, r.start, -120);
  const out = [{ kind: 'confirmed', at: booked, sent: true, text: guestMessage(r, cfg, site, 'confirmed') }];
  // podsjetnik i „vidimo se” samo ako ima smisla (rezervacija nije napravljena tik prije)
  if (!booked || abs(rem) > abs(booked) + 60) out.push({ kind: 'remind', at: rem, sent: abs(now) >= abs(rem), text: guestMessage(r, cfg, site, 'remind', rem) });
  if (!booked || abs(soon) > abs(booked) + 30) out.push({ kind: 'soon', at: soon, sent: abs(now) >= abs(soon), text: guestMessage(r, cfg, site, 'soon') });
  return out;
}
/** „sutra u 21:00” / „danas u 09:00” / „petak, 23.10. u 21:00” — u odnosu na trenutak slanja poruke. */
function rel(date, min, asOf, L) {
  const d = (min >= 1440 ? addDays(date, 1) : date), t = fmt(min), base = asOf.date;
  const w = d === base ? (L === 'hr' ? (min >= 17 * 60 ? 'večeras' : 'danas') : (min >= 17 * 60 ? 'tonight' : 'today')) : d === addDays(base, 1) ? (L === 'hr' ? 'sutra' : 'tomorrow') : humanDate(d, L);
  return L === 'hr' ? `${w} u ${t}` : `${w} at ${t}`;
}
function guestMessage(r, cfg, site, kind, asOf = null) {
  const L = r.lang === 'en' ? 'en' : 'hr';
  const link = `${site}/rezervacije/?r=${r.id}&k=${r.key}`;
  const when = `${humanDate(r.date, L)} ${fmt(r.start)}`;
  const pre = (r.preorder || []).length ? (L === 'hr'
    ? `\n🍾 Uz stol: ${r.preorder.map(x => `${x.qty > 1 ? x.qty + '× ' : ''}${x.name}${x.vol ? ' ' + x.vol : ''}`).join(', ')}${r.sparkler ? ' ✨ s prskalicom' : ''}`
    : `\n🍾 At your table: ${r.preorder.map(x => `${x.qty > 1 ? x.qty + '× ' : ''}${x.name}${x.vol ? ' ' + x.vol : ''}`).join(', ')}${r.sparkler ? ' ✨ with a sparkler' : ''}`) : '';
  const F = formsOf(cfg);
  const zn = r.cat ? ((cfg.zones || []).find(z => z.id === r.cat) || {}) : {};
  const catTxt = r.minSpend ? (L === 'hr' ? ` (${zn.short || r.cat})\n💶 Minimalna potrošnja ${eur(r.minSpend, L)} po stolu` : ` (${zn.short || r.cat})\n💶 Minimum spend ${eur(r.minSpend, L)} per table`) : '';
  const dl = cancelDeadline(cfg, r.date);
  const rules = dl ? (L === 'hr' ? `\nOtkazivanje najkasnije do ${fmt(dl.min)} na dan rezervacije${r.noShowFee ? ` — inače naknada za nedolazak ${eur(r.noShowFee, L)} po osobi` : ''}.` : `\nCancel by ${fmt(dl.min)} on the day at the latest${r.noShowFee ? ` — otherwise a no-show fee of ${eur(r.noShowFee, L)} per person applies` : ''}.`) : '';
  const pol = cfg.policy && (cfg.policy.age || cfg.policy.dress) ? (L === 'hr' ? `\n${cfg.policy.age ? `🔞 ${cfg.policy.age}+` : ''}${cfg.policy.age && cfg.policy.dress ? ' · ' : ''}${cfg.policy.dress ? `👔 Dress code: ${cfg.policy.dress.hr || cfg.policy.dress}` : ''}` : `\n${cfg.policy.age ? `🔞 ${cfg.policy.age}+` : ''}${cfg.policy.age && cfg.policy.dress ? ' · ' : ''}${cfg.policy.dress ? `👔 Dress code: ${cfg.policy.dress.en || cfg.policy.dress}` : ''}`) : '';
  const depT = r.deposit ? (L === 'hr' ? (r.deposit.paid ? `\n💳 Kapara ${eur(r.deposit.eur, L)} je plaćena i odbija se od računa.` : `\n💳 Za ovaj stol potrebna je kapara ${eur(r.deposit.eur, L)} — uplata na linku ispod.`) : (r.deposit.paid ? `\n💳 Your ${eur(r.deposit.eur, L)} deposit is paid and comes off the bill.` : `\n💳 This table needs a ${eur(r.deposit.eur, L)} deposit — pay via the link below.`)) : '';
  const back = r.guest && r.guest.visits > 0;
  const vsh = vipOf(cfg, r.tableId), vipM = vsh ? `\n👑 ${vipLine(r.vip, vsh, L, r.preorder)}` : '';
  const WT = !!(cfg.features && cfg.features.door === 'waiter');
  // garderoba: gost zna unaprijed kako ide (QR na mobitel, bez papirića) — manje zastoja i pitanja na garderobi
  const coatM = ((cfg.features || {}).hostess || []).includes('coat') ? (L === 'hr'
    ? '\n🧥 Garderoba: kad predate jaknu, mobitelom skenirajte QR kod koji vam pokaže hostesa — broj vam ostaje na mobitelu, papirić ne treba. Pri odlasku samo pokažite broj. Ključeve, novčanik i mobitel ne ostavljajte u džepovima.'
    : '\n🧥 Cloakroom: when you hand in your jacket, scan the QR code the attendant shows you — your number stays on your phone, no paper ticket. On the way out just show your number. Please don\'t leave keys, wallet or phone in your pockets.') : '';
  if (r.guar && kind === 'confirmed') return L === 'hr'
    ? `Pozdrav ${F.gen}! Rezervacija na ime ${r.name} je POTVRĐENA ✅\n📅 ${when}\n👥 ${r.party} os. · stol ${r.tableId}${catTxt}${pre}${vipM}${pol}\n${guarMsg(r, L, cfg)}${coatM}\n🎟️ Vaša ulaznica s QR kodom (${WT ? 'pokažite je bilo kojem konobaru' : 'pokažite je na ulazu'}), promjene i otkaz: ${link}\nStol držimo ${cfg.holdMinutes} min. ${back ? 'Drago nam je što se vraćate — vidimo se! 🙌' : 'Vidimo se!'}`
    : `Hi from ${cfg.venue}! The reservation for ${r.name} is CONFIRMED ✅\n📅 ${when}\n👥 ${r.party} guests · table ${r.tableId}${catTxt}${pre}${vipM}${pol}\n${guarMsg(r, L, cfg)}${coatM}\n🎟️ Your ticket with a QR code (${WT ? 'show it to any waiter' : 'show it at the door'}), changes or cancellation: ${link}\nWe hold the table for ${cfg.holdMinutes} min. ${back ? 'Great to have you back — see you! 🙌' : 'See you!'}`;
  if (r.guar && kind === 'remind') {
    // šalje se dan prije (24 h prije dolaska) — riječi „sutra/danas” računamo od trenutka slanja
    const sendAt = asOf || bizNow(), free = !reached(guarDeadline(r), asOf || zagrebNow());
    const whenR = rel(r.date, r.start, sendAt, L), dl = guarDeadline(r), dlR = rel(dl.date, dl.min, sendAt, L);
    return L === 'hr'
      ? `Pozdrav ${F.gen}! 👋 Podsjetnik: ${whenR} čeka Vas stol ${r.tableId}.\n👥 ${r.party} os. · na ime ${r.name}\n👉 Dolazite? Potvrdite jednim dodirom: ${link}&a=1\n${free ? `Ne stižete? Otkažite besplatno do ${dlR}: ${link}` : `Ne stižete? Javite nam na ${cfg.phone}.`}`
      : `Hi from ${cfg.venue}! 👋 Reminder: table ${r.tableId} is waiting for you ${whenR}.\n👥 ${r.party} guests · for ${r.name}\n👉 Coming? Confirm with one tap: ${link}&a=1\n${free ? `Can't make it? Cancel free of charge by ${dlR}: ${link}` : `Can't make it? Let us know at ${cfg.phone}.`}`;
  }
  if (kind === 'soon') return L === 'hr'
    ? `Vidimo se u ${fmt(r.start)}! 🥂 Stol ${r.tableId} je spreman.\n🎟️ ${cfg.features && cfg.features.door === 'waiter' ? 'Pokažite QR ulaznicu bilo kojem konobaru — konobar vašeg rajona odvest će vas do stola' : 'Na ulazu pokažite QR ulaznicu — hostesa vas odmah vodi do stola'}${r.guar ? `, a blokada ${eur(r.guar.eur, L)} se tada ukida` : ''}: ${link}${coatM}\nKasnite? Stol držimo ${cfg.holdMinutes} min — javite nam na ${cfg.phone}.`
    : `See you at ${fmt(r.start)}! 🥂 Table ${r.tableId} is ready.\n🎟️ ${cfg.features && cfg.features.door === 'waiter' ? 'Show your QR ticket to any waiter — the waiter for your section takes you to your table' : 'Show your QR ticket at the door — the host takes you straight to your table'}${r.guar ? ` and the ${eur(r.guar.eur, L)} hold is released` : ''}: ${link}${coatM}\nRunning late? We hold the table for ${cfg.holdMinutes} min — call us at ${cfg.phone}.`;
  if (kind === 'confirmed') return L === 'hr'
    ? `Pozdrav ${F.gen}! Rezervacija na ime ${r.name} je POTVRĐENA ✅\n📅 ${when}\n👥 ${r.party} os. · stol ${r.tableId}${catTxt}${pre}${depT}${vipM}${pol}\nStol držimo ${cfg.holdMinutes} min.${rules}${coatM}\n🔢 Kod rezervacije: ${r.code} (dovoljno je reći ga na ulazu)\n🎟️ Vaša ulaznica s QR kodom, promjene i otkaz: ${link}\n${back ? 'Drago nam je što se vraćate — vidimo se! 🙌' : 'Vidimo se!'}`
    : `Hi from ${cfg.venue}! The reservation for ${r.name} is CONFIRMED ✅\n📅 ${when}\n👥 ${r.party} guests · table ${r.tableId}${catTxt}${pre}${depT}${vipM}${pol}\nWe hold the table for ${cfg.holdMinutes} min.${rules}${coatM}\n🔢 Reservation code: ${r.code} (just say it at the door)\n🎟️ Your ticket with a QR code, changes or cancellation: ${link}\n${back ? 'Great to have you back — see you! 🙌' : 'See you!'}`;
  if (kind === 'remind') {
    const today = r.date === bizNow().date;
    const whenR = today ? (L === 'hr' ? `večeras u ${fmt(r.start)}` : `tonight at ${fmt(r.start)}`) : (L === 'hr' ? `${humanDate(r.date, L)} u ${fmt(r.start)}` : `${humanDate(r.date, L)} at ${fmt(r.start)}`);
    const catR = r.minSpend ? (L === 'hr' ? ` (${zn.short || r.cat}, min. potrošnja ${eur(r.minSpend, L)})` : ` (${zn.short || r.cat}, min. spend ${eur(r.minSpend, L)})`) : '';
    const out = dl && !pastDeadline(cfg, r.date)
      ? (L === 'hr' ? `Ne stižete? Otkažite na istom linku do ${fmt(dl.min)}${r.noShowFee ? ' — bez naknade' : ''}.` : `Can't make it? Cancel via the same link by ${fmt(dl.min)}${r.noShowFee ? ' — free of charge' : ''}.`)
      : (L === 'hr' ? `Ne stižete? Javite nam na ${cfg.phone} da stol damo drugima.` : `Can't make it? Let us know at ${cfg.phone} so we can give the table to someone else.`);
    return L === 'hr'
      ? `Pozdrav ${F.gen}! 👋 Podsjetnik: ${whenR} čeka Vas stol ${r.tableId}${catR}.\n👥 ${r.party} os. · na ime ${r.name}\n👉 Potvrdite dolazak jednim dodirom: ${link}&a=1\n${out}`
      : `Hi from ${cfg.venue}! 👋 Reminder: table ${r.tableId}${catR} is waiting for you ${whenR}.\n👥 ${r.party} guests · for ${r.name}\n👉 Confirm you're coming with one tap: ${link}&a=1\n${out}`;
  }
  if (kind === 'declined') return L === 'hr'
    ? `Pozdrav ${F.gen}. Nažalost, za ${when} nemamo slobodan stol za ${r.party} os. (rezervacija na ime ${r.name}). Nazovite nas na ${cfg.phone} pa ćemo naći drugi termin.`
    : `Hi from ${cfg.venue}. Unfortunately we have no table for ${r.party} on ${when} (reservation for ${r.name}). Call us at ${cfg.phone} and we'll find another time.`;
  return '';
}
function staffMessage(r, cfg, site, path = '') {
  const pre = (r.preorder || []).length ? `\n🍾 ${r.preorder.map(x => `${x.qty}× ${x.name} ${x.vol}`).join(', ')} (${eur(preorderTotal(r))})${r.sparkler ? ' ✨' : ''}` : '';
  return `🆕 Nova rezervacija ${cfg.venue}\n📅 ${humanDate(r.date)} ${fmt(r.start)}\n👥 ${r.party} os. · stol ${r.tableId}${r.minSpend ? ` · min. ${eur(r.minSpend)}` : ''}\n👤 ${r.name} · ${r.phone}${r.occasion ? `\n🎉 ${r.occasion}` : ''}${r.note ? `\n📝 ${r.note}` : ''}${pre}\nKod: ${r.code}\nPotvrdi: ${site}${path}/admin/#${r.date}`;
}
/** Kratka obavijest za WhatsApp (vanjski servis): bez imena, broja i napomene gosta. */
function staffAlert(r, cfg, site, path = '') {
  return `🆕 Nova rezervacija ${cfg.venue}\n📅 ${humanDate(r.date)} ${fmt(r.start)}\n👥 ${r.party} os. · stol ${r.tableId}${(r.preorder || []).length ? '\n🍾 + boca uz stol' : ''}\nKod: ${r.code}\nPotvrdi: ${site}${path}/admin/#${r.date}`;
}
const waLink = (phone, text) => `https://wa.me/${String(phone).replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;

return { VENUES, VENUE_IDS, isVenue, TZ, setClock, zagrebNow, bizNow, toMin, fmt, weekday, addDays, isDate, token, shortCode, safeEqual, scoped, getConfig, publicConfig, catOf, cancelDeadline, pastDeadline, guarCfg, guarDeadline, GUAR_FINAL, guarState, withGuar, slotsFor, ACTIVE, overlaps, tableFree, fits, bestTable, cleanPhone, preorderTotal, guestKey, guestGet, guestSnap, vipOf, shotsOf, shotOf, crystalOf, vipLine, depositOf, availability, createReservation, guestView, getReservation, cancelByGuest, confirmArrival, adminRemind, lateBy, findRes, findCode, checkIn, adminGuest, adminGuestNote, payDeposit, adminDeposit, COAT_KINDS, coatList, coatNew, coatFind, coatOut, coatPhoto, coatGuest, defaultDay, adminDay, adminUpdate, adminSaveConfig, adminSearch, adminUpcoming, liveCreate, liveStatus, adminLive, adminLiveUpdate, feedbackCreate, adminFeedback, adminFeedbackUpdate, adminFeedbackReadAll, getMenu, adminSaveMenu, statsHit, adminStats, venueSummary, groupSummary, humanDate, cardLabel, shiftDM, guestTimeline, guestMessage, staffMessage, staffAlert, waLink };
})();
__m["router"] = (function () {
/* =====================================================================
   TIPTAP SUITE — HTTP router za /api/<lokal>/…  i  /api/group/…
   Isti kod radi na Netlifyju (Functions + Blobs) i u pregledniku (demo).
   ---------------------------------------------------------------------
   ENV (Netlify → Site configuration → Environment variables):
   ADMIN_PIN_QCLUB, ADMIN_PIN_KAFANICA, ADMIN_PIN_BURE, ADMIN_PIN_BROOKLYN
                      PIN osoblja po lokalu (ili zajednički ADMIN_PIN)
   OWNER_PIN          PIN vlasnika: pregled grupe + ulaz u admin svih lokala
   HOSTESS_PIN_QCLUB, HOSTESS_PIN_KAFANICA, HOSTESS_PIN_BURE
                      (neobavezno) šifra hostese na ulazu: samo dolasci, tlocrt i uvođenje gostiju
   SITE_URL           npr. https://tiptapreviews.com (za linkove u porukama)
   RESEND_API_KEY     (neobavezno) e-mail preko resend.com
   MAIL_FROM          npr. "TipTap <rezervacije@tvoja-domena.hr>"
   NOTIFY_EMAIL[_LOKAL]   e-mail(ovi) osoblja, odvojeni zarezom
   CALLMEBOT[_LOKAL]      (neobavezno) WhatsApp osoblju: "+38591xxxxxxx:APIKEY,…"
   ===================================================================== */
const C = __m["core"];
const PATHS = { qclub: '/q-club', kafanica: '/kafanica', bure: '/bure-bar', brooklyn: '/brooklyn' };
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const fail = r => json({ error: r.error, ...(r.fee ? { fee: r.fee } : {}) }, r.status || 400);
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

/** Tko je prijavljen: vlasnik, voditelj lokala ili hostesa na ulazu (HOSTESS_PIN_<LOKAL>). */
function pinRole(req, env, v) {
  const pin = req.headers.get('x-admin-pin') || '';
  if (!pin) return null;
  if (env.OWNER_PIN && C.safeEqual(pin, env.OWNER_PIN)) return 'owner';
  const staff = v ? envFor(env, 'ADMIN_PIN', v) : '';
  if (staff && C.safeEqual(pin, staff)) return 'admin';
  const host = v ? envFor(env, 'HOSTESS_PIN', v) : '';
  if (host && C.safeEqual(pin, host)) return 'host';
  return null;
}
function pinOk(req, env, v) { const r = pinRole(req, env, v); return r === 'owner' || r === 'admin'; }
/* Zaštita PIN-a (samo živi rad): 20 pogrešnih PIN-ova s iste adrese → 15 minuta stanke za tu adresu.
   Pogađanje 4-znamenkastog PIN-a tako traje danima umjesto minuta. U demu (env.DEMO) se ne koristi. */
const LOCK_N = 20, LOCK_MS = 15 * 60e3;
const ipKey = req => 'sec/pin/' + (String(req.headers.get('x-nf-client-connection-ip') || (req.headers.get('x-forwarded-for') || '').split(',')[0] || '').trim().replace(/[^0-9a-fA-F.]/g, '_').slice(0, 45) || 'x');
async function pinLocked(store, env, req) {
  if (env.DEMO) return false;
  try { const r = await store.getJSON(ipKey(req)); const d = r && r.data; return !!(d && d.n >= LOCK_N && Date.now() - d.t < LOCK_MS); } catch { return false; }
}
async function pinFailed(store, env, req) {
  if (env.DEMO || !req.headers.get('x-admin-pin')) return;   // prazan PIN nije pokušaj pogađanja
  try { const k = ipKey(req), r = await store.getJSON(k); let d = r && r.data; if (!d || Date.now() - d.t > LOCK_MS) d = { n: 0, t: 0 }; d.n++; d.t = Date.now(); await store.setJSON(k, d, null); } catch { }
}
/** Hostesa vidi samo ono što treba na ulazu. */
/** Jamstvo karticom: u demu uvijek; u pravom radu tek kad je spojen pružatelj plaćanja (Stripe). */
const payOn = env => !!(env.DEMO || env.PAY_DEMO || env.STRIPE_SECRET_KEY);
const HOST_OK = new Set(['/login', '/day', '/res', '/code', '/checkin', '/coat', '/coat/new', '/coat/out', '/coat/find', '/coat/photo']);

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
      if (await pinLocked(store, env, req)) return json({ error: 'locked' }, 429);
      if (!pinOk(req, env, null)) { await pinFailed(store, env, req); await new Promise(r => setTimeout(r, 500)); return json({ error: 'auth' }, 401); }
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
      return json({ ...(await C.availability(S, date)), pay: payOn(env) });
    }
    if (path === '/reserve' && req.method === 'POST') {
      const r = await C.createReservation(S, body, { pay: payOn(env) });
      if (r.error) return fail(r);
      const cfg = await C.getConfig(S); const x = r.reservation;
      await later(Promise.all([
        sendWhatsAppStaff(env, v, C.staffAlert(x, cfg, site, vpath)),
        sendEmail(env, envFor(env, 'NOTIFY_EMAIL', v), `Nova rezervacija: ${C.humanDate(x.date)} ${C.fmt(x.start)} · ${x.party} os. · ${x.name}`, C.staffMessage(x, cfg, site, vpath))
      ]));
      if (x.status === 'confirmed' && x.email) await later(sendEmail(env, x.email, `${cfg.venue} — rezervacija ${x.code}`, C.guestMessage(x, cfg, site + vpath, 'confirmed')));
      return json({ ok: true, reservation: { ...C.guestView(x, cfg), key: x.key }, table: r.table, msgs: x.guar && x.status === 'confirmed' ? C.guestTimeline(x, cfg, site + vpath) : null });
    }
    if (path === '/reservation' && req.method === 'GET') {
      const r = await C.getReservation(S, q('id'), q('k'), site + vpath);
      return r.error ? fail(r) : json(r);
    }
    if (path === '/cancel' && req.method === 'POST') {
      const r = await C.cancelByGuest(S, body.id, body.k, body.fee === true);
      if (r.error) return fail(r);
      const cfg = await C.getConfig(S); const x = r.reservation;
      const alert = `❌ Otkazana rezervacija ${cfg.venue}: ${C.humanDate(x.date)} ${C.fmt(x.start)} · ${x.party} os. · stol ${x.tableId} · kod ${x.code}${x.guar ? (x.guar.state === 'charged' ? ` · kasni otkaz: naplaćeno ${x.guar.eur} €` : ' · besplatno (na vrijeme)') : ''}`;
      await later(Promise.all([sendWhatsAppStaff(env, v, alert), sendEmail(env, envFor(env, 'NOTIFY_EMAIL', v), 'Otkazana rezervacija ' + x.code, alert + ` · ${x.name}`)]));
      return json({ ok: true, reservation: C.guestView(x, cfg) });
    }
    if (path === '/coat' && req.method === 'GET') { const r = await C.coatGuest(S, q('g'), q('k')); return r.error ? fail(r) : json(r); }
    if (path === '/deposit' && req.method === 'POST') {
      // kapara: u demu se plaća odmah; u pravom radu ide preko pružatelja plaćanja (dok nije spojen, osoblje označi uplatu ručno)
      if (!env.DEMO && !env.PAY_DEMO) return json({ error: 'nopay' }, 501);
      const r = await C.payDeposit(S, body.id, body.k);
      return r.error ? fail(r) : json({ ok: true, reservation: C.guestView(r.reservation) });
    }
    if (path === '/arrive' && req.method === 'POST') {
      const r = await C.confirmArrival(S, body.id, body.k);
      return r.error ? fail(r) : json({ ok: true, reservation: C.guestView(r.reservation, await C.getConfig(S)) });
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
      if (await pinLocked(store, env, req)) return json({ error: 'locked' }, 429);
      const role = pinRole(req, env, v);
      if (!role) { await pinFailed(store, env, req); await new Promise(r => setTimeout(r, 500)); return json({ error: 'auth' }, 401); }
      const a = '/' + parts.slice(2).join('/');
      if (role === 'host' && !HOST_OK.has(a)) return json({ error: 'role' }, 403);
      if (a === '/login') return json({ ok: true, owner: role === 'owner', role });
      if (a === '/res' && req.method === 'GET') { const r = await C.findRes(S, q('id')); return r.error ? fail(r) : json({ ...r, now: C.zagrebNow(), biz: C.bizNow() }); }
      if (a === '/code' && req.method === 'GET') { const r = await C.findCode(S, q('code')); return r.error ? fail(r) : json({ ...r, now: C.zagrebNow(), biz: C.bizNow() }); }
      if (a === '/coat' && req.method === 'GET') return json(await C.coatList(S));
      if (a === '/coat/new' && req.method === 'POST') { const r = await C.coatNew(S, body, role === 'host' ? 'hostesa' : 'voditelj'); return r.error ? fail(r) : json(r); }
      if (a === '/coat/out' && req.method === 'POST') { const r = await C.coatOut(S, body, role === 'host' ? 'hostesa' : 'voditelj'); return r.error ? fail(r) : json(r); }
      if (a === '/coat/find' && req.method === 'GET') { const r = await C.coatFind(S, { no: q('no'), id: q('id'), k: q('k') }); return r.error ? fail(r) : json(r); }
      if (a === '/coat/photo' && req.method === 'GET') return json(await C.coatPhoto(S, q('id')));
      if (a === '/guest' && req.method === 'GET') { const r = await C.adminGuest(S, q('id')); return r.error ? fail(r) : json(r); }
      if (a === '/guest/note' && req.method === 'POST') { const r = await C.adminGuestNote(S, body); return r.error ? fail(r) : json(r); }
      if (a === '/deposit' && req.method === 'POST') { const r = await C.adminDeposit(S, body); return r.error ? fail(r) : json(r); }
      // ulaz (aplikacija hostese) uvijek bilježi "hostesa" — i kad je na njoj prijavljen voditelj
      if (a === '/checkin' && req.method === 'POST') { const r = await C.checkIn(S, body, role === 'host' || body.from === 'door' ? 'hostesa' : 'voditelj'); return r.error ? fail(r) : json(r); }
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
      if (a === '/remind' && req.method === 'POST') {
        const r = await C.adminRemind(S, body.id);
        if (r.error) return fail(r);
        const cfg = await C.getConfig(S); const x = r.reservation;
        const msg = C.guestMessage(x, cfg, site + vpath, 'remind');
        return json({ ok: true, reservation: x, msg, wa: x.phone ? C.waLink(x.phone, msg) : null });
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
module.exports = window.TTCore;
