/* Blue Gym · lokacije (podaci s Google Mapsa, studeni 2026.)
   hours: indeks kao Date.getDay() (0 = nedjelja), [od, do] u satima ili null kad je zatvoreno */
(function () {
  'use strict';
  function maps(name, id) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name + ', Osijek') + '&query_place_id=' + id; }
  function review(id) { return 'https://search.google.com/local/writereview?placeid=' + id; }
  function route(name, id) { return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(name + ', Osijek') + '&destination_place_id=' + id; }
  var L = {
    centar: {
      name: 'Blue Gym Centar', short: 'Centar', address: 'Ul. Pavla Pejačevića 22, Osijek', phone: '', lat: 45.5615649, lng: 18.6728063,
      placeId: 'ChIJexWD16XnXEcRyP5lWoL_wlg',
      hours: { 0: [14, 21], 1: [7, 22], 2: [7, 22], 3: [7, 22], 4: [7, 22], 5: [7, 22], 6: [8, 21] },
      // s Instagrama @bluegymcentar (studeni 2026.)
      instagram: 'bluegymcentar',
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
          note: { hr: 'Nije bitno jesi li početnik ili već treniraš. Bitno je da se pojaviš.', en: 'Beginner or regular, it doesn’t matter. Just show up.' } }
      ],
      prices: [
        { name: { hr: 'Dnevna', en: 'Day pass' }, p: 8 },
        { name: { hr: 'Mjesečna za učenike, studente i umirovljenike', en: 'Monthly for pupils, students and seniors' }, p: 35 },
        { name: { hr: 'Mjesečna', en: 'Monthly' }, p: 40 },
        { id: '3m', name: { hr: 'Tromjesečna', en: '3 months' }, p: 100 },
        { id: '6m', name: { hr: 'Polugodišnja', en: '6 months' }, p: 180 },
        { id: '12m', name: { hr: 'Godišnja', en: 'Yearly' }, p: 310 }
      ],
      promo: {
        title: { hr: 'Black Friday u teretani', en: 'Black Friday at the gym' },
        sub: { hr: 'Popusti na članarine do kraja studenoga.', en: 'Membership discounts until the end of November.' },
        from: '2026-11-06T00:00:00', until: '2026-11-30T23:59:59', prices: { '3m': 85, '6m': 155, '12m': 240 }
      }
    },
    sjenjak: {
      name: 'Blue Gym Sjenjak', short: 'Sjenjak', address: 'Sjenjak 133, Osijek', phone: '+385 31 782 068', lat: 45.551078, lng: 18.6957562,
      placeId: 'ChIJ-8LnLI_nXEcRfFj0jjidNCs',
      hours: { 0: null, 1: [8, 22], 2: [8, 22], 3: [8, 22], 4: [8, 22], 5: [8, 22], 6: [8, 21] }
    },
    bosutsko: {
      name: 'Blue Gym Bosutsko', short: 'Bosutsko', address: 'Kod Mercatora, Industrijska četvrt, Osijek', phone: '', lat: 45.5447856, lng: 18.6779655,
      placeId: 'ChIJP_n_KDvnXEcRQYdv6LaEZKQ',
      hours: { 0: [14, 21], 1: [7, 22], 2: [7, 22], 3: [7, 22], 4: [7, 22], 5: [7, 22], 6: [8, 21] }
    }
  };
  Object.keys(L).forEach(function (k) { L[k].id = k; L[k].maps = maps(L[k].name, L[k].placeId); L[k].review = review(L[k].placeId); L[k].route = route(L[k].name, L[k].placeId); });
  // active: teretane koje su uključene (za sada samo Centar); ostale su spremne za kasnije
  window.BG = { brand: 'Blue Gym', order: ['centar', 'sjenjak', 'bosutsko'], active: ['centar'], locations: L, machines: { centar: null, sjenjak: null, bosutsko: null } };
})();
