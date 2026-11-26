/* Blue Gym · lokacije (podaci s Google Mapsa, studeni 2026.)
   hours: indeks kao Date.getDay() (0 = nedjelja), [od, do] u satima ili null kad je zatvoreno */
(function () {
  'use strict';
  function maps(name, id) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name + ', Osijek') + '&query_place_id=' + id; }
  function review(id) { return 'https://search.google.com/local/writereview?placeid=' + id; }
  var L = {
    centar: {
      name: 'Blue Gym Centar', short: 'Centar', address: 'Ul. Pavla Pejačevića 22, Osijek', phone: '',
      placeId: 'ChIJexWD16XnXEcRyP5lWoL_wlg',
      hours: { 0: [14, 21], 1: [7, 22], 2: [7, 22], 3: [7, 22], 4: [7, 22], 5: [7, 22], 6: [8, 21] }
    },
    sjenjak: {
      name: 'Blue Gym Sjenjak', short: 'Sjenjak', address: 'Sjenjak 133, Osijek', phone: '+385 31 782 068',
      placeId: 'ChIJ-8LnLI_nXEcRfFj0jjidNCs',
      hours: { 0: null, 1: [8, 22], 2: [8, 22], 3: [8, 22], 4: [8, 22], 5: [8, 22], 6: [8, 21] }
    },
    bosutsko: {
      name: 'Blue Gym Bosutsko', short: 'Bosutsko', address: 'Mercator, Industrijska četvrt, Osijek', phone: '',
      placeId: 'ChIJP_n_KDvnXEcRQYdv6LaEZKQ',
      hours: { 0: [14, 21], 1: [7, 22], 2: [7, 22], 3: [7, 22], 4: [7, 22], 5: [7, 22], 6: [8, 21] }
    }
  };
  Object.keys(L).forEach(function (k) { L[k].id = k; L[k].maps = maps(L[k].name, L[k].placeId); L[k].review = review(L[k].placeId); });
  window.BG = { brand: 'Blue Gym', order: ['centar', 'sjenjak', 'bosutsko'], locations: L, machines: { centar: null, sjenjak: null, bosutsko: null } };
})();
