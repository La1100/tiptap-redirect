/* Blue Gym · lokacije (podaci s Google Mapsa, studeni 2026.)
   hours: indeks kao Date.getDay() (0 = nedjelja), [od, do] u satima ili null kad je zatvoreno */
(function () {
  'use strict';
  function maps(name, id) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name + ', Osijek') + '&query_place_id=' + id; }
  function review(id) { return 'https://search.google.com/local/writereview?placeid=' + id; }
  function route(name, id) { return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(name + ', Osijek') + '&destination_place_id=' + id; }
  var L = {
    centar: {
      // telefon s MultiSport popisa partnera (Benefit Systems)
      name: 'Blue Gym Centar', short: 'Centar', address: 'Ul. Pavla Pejačevića 22, Osijek', phone: '+385 31 379 008', lat: 45.5615649, lng: 18.6728063,
      placeId: 'ChIJexWD16XnXEcRyP5lWoL_wlg',
      hours: { 0: [14, 21], 1: [7, 22], 2: [7, 22], 3: [7, 22], 4: [7, 22], 5: [7, 22], 6: [8, 21] },
      // kartica u popisu teretana: fotografija s Instagrama, natpis sa zida dvorane
      cover: '/bluegym/assets/img/centar-kartica.jpg', tone: '#2E2C25',
      tag: { hr: 'Najveća teretana u regiji', en: 'The largest gym in the region' },
      feats: [{ hr: '2.500 m²', en: '2,500 m²' }, { hr: 'Grupni treninzi', en: 'Group classes' }, 'MultiSport'],
      // s Instagrama @bluegymcentar (studeni 2026.)
      instagram: 'bluegymcentar', facebook: 'bluegymcentar',
      logo: '/bluegym/assets/img/logo.jpg',
      hero: '/bluegym/assets/img/dvorana.jpg',
      tagline: { hr: 'Tvoj prostor za napredak.', en: 'Your space to make progress.' },
      motto: 'Stronger than excuses.',
      facts: [
        { b: '2.500 m²', s: { hr: 'prostora i opreme', en: 'of space and equipment' } },
        { b: '3× tjedno', s: { hr: 'grupni treninzi', en: 'group classes' } }
      ],
      classes: [
        { name: { hr: 'Funkcionalni trening', en: 'Functional training' }, coach: 'Dino', days: [1, 3, 5], from: 19, to: 20,
          note: { hr: 'Početnik ili ne, bitno je da dođeš.', en: 'Beginner or regular, just show up.' } }
      ],
      prices: [
        { name: { hr: 'Dnevna', en: 'Day pass' }, p: 8 },
        { name: { hr: 'Mjesečna povlaštena', en: 'Monthly, concession' }, note: { hr: 'Učenici, studenti, umirovljenici', en: 'Pupils, students, seniors' }, p: 35 },
        { name: { hr: 'Mjesečna', en: 'Monthly' }, p: 40 },
        { id: '3m', name: { hr: 'Tromjesečna', en: '3 months' }, p: 100 },
        { id: '6m', name: { hr: 'Polugodišnja', en: '6 months' }, p: 180 },
        { id: '12m', name: { hr: 'Godišnja', en: 'Yearly' }, p: 310 }
      ],
      promo: {
        title: { hr: 'Black Friday u teretani', en: 'Black Friday at the gym' },
        sub: { hr: 'Popusti do kraja studenoga.', en: 'Discounts until 30 November.' },
        from: '2026-11-06T00:00:00', until: '2026-11-30T23:59:59', prices: { '3m': 85, '6m': 155, '12m': 240 }
      }
    },
    sjenjak: {
      name: 'Blue Gym Sjenjak', short: 'Sjenjak', address: 'Sjenjak 133, Osijek', phone: '+385 31 782 068', lat: 45.551078, lng: 18.6957562,
      placeId: 'ChIJ-8LnLI_nXEcRfFj0jjidNCs', facebook: 'bluegymsjenjak',
      hours: { 0: null, 1: [8, 22], 2: [8, 22], 3: [8, 22], 4: [8, 22], 5: [8, 22], 6: [8, 21] },
      // Instagram @bluegymsjenjak trenutno nije dostupan: kartica bez fotografije dok je ne dobijemo; opis s Facebooka
      cover: null,
      tag: { hr: 'Tvoj kvartovski gym', en: 'Your neighbourhood gym' },
      feats: ['Fitness', 'CrossFit', 'Protein bar']
    },
    bosutsko: {
      // adresa i telefon s njihove Facebook stranice
      name: 'Blue Gym Bosutsko', short: 'Bosutsko', address: 'Gacka ulica 10, Mercator, Osijek', phone: '+385 31 218 398', lat: 45.5447856, lng: 18.6779655,
      placeId: 'ChIJP_n_KDvnXEcRQYdv6LaEZKQ', instagram: 'bluegymbosutsko', facebook: 'bluegymbosutsko',
      hours: { 0: [14, 21], 1: [7, 22], 2: [7, 22], 3: [7, 22], 4: [7, 22], 5: [7, 22], 6: [8, 21] },
      // s Instagrama @bluegymbosutsko: dvorana za grupne treninge, bio i objava za Black Friday
      cover: '/bluegym/assets/img/bosutsko.jpg', tone: '#545047',
      tag: { hr: 'Fitness i grupni treninzi', en: 'Fitness and group classes' },
      feats: ['Protein bar', 'MultiSport', 'PassSport']
    }
  };
  Object.keys(L).forEach(function (k) { L[k].id = k; L[k].maps = maps(L[k].name, L[k].placeId); L[k].review = review(L[k].placeId); L[k].route = route(L[k].name, L[k].placeId); });
  // active: teretane koje su uključene (za sada samo Centar); ostale su spremne za kasnije
  window.BG = { brand: 'Blue Gym', order: ['centar', 'sjenjak', 'bosutsko'], active: ['centar'], locations: L, machines: { centar: null, sjenjak: null, bosutsko: null } };
})();
