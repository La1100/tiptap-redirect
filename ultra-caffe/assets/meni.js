/* =====================================================================
   ULTRA CAFFE · TipTap Signature demo — gost (v2)
   Početni ekran sa grupama, pretraga i „Pomozi mi da izaberem”.
   Rastavljanje: tanjir iz kog izlaze sastojci, piće koje se rasprsne na
   sve strane, kolači u čašama po slojevima, presek kupole sa curenjem,
   Popsy na štapićima. Prave boce i limenke. Google recenzije.
   Ilustracije sastojaka: KART (assets/kart.js). Podaci: assets/data.js.
   ===================================================================== */
(function () {
'use strict';
const U = window.UC, K = window.KART;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const f1 = n => Math.round(n * 10) / 10;
const LS = {
  get(k, d) { try { const v = localStorage.getItem('uc_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('uc_' + k, JSON.stringify(v)); } catch (e) { /* privatni režim */ } }
};
const SS = { get(k) { try { return sessionStorage.getItem('uc_' + k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem('uc_' + k, v); } catch (e) { } } };
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const qs = new URLSearchParams(location.search);
let L = qs.get('lang') || LS.get('lang', 'sr'); if (!['sr', 'en'].includes(L)) L = 'sr';
let LOC = qs.get('lokal') || LS.get('loc', 'centar'); if (!U.locs.some(l => l.id === LOC)) LOC = 'centar';
let CART = LS.get('cart', []);
let VIEW = 'home', GRP = null, QRY = '', homeY = 0;

const TX = {
  sr: { menu: 'Jelovnik', drinks: 'Piće', cakes: 'Kolači', torte: 'Torte', open_menu: 'Otvori meni', reserve: 'Rezerviši sto', call: 'Pozovi', skip: 'Preskoči',
    open_until: 'Otvoreno do', closed: 'Zatvoreno', opens: 'otvara se u', split: 'Rastavi jelo', split_d: 'Rastavi piće', split_k: 'Rastavi kolač', cut_k: 'Preseci kolač', join: 'Sastavi', made_of: 'Od čega je napravljeno',
    with_dish: 'Uz jelo', est: 'okvirna procena', side: 'prilog', add: 'Dodaj na listu', added: 'Dodato na listu', list: 'Moja lista', items: 'stavki', item1: 'stavka', items2: 'stavke',
    show_waiter: 'Pokaži konobaru', call_waiter: 'Pozovi konobara', waiter_called: 'Konobar je pozvan za vaš sto', total: 'Ukupno', empty: 'Lista je prazna. Dodajte jelo ili piće i pokažite listu konobaru.',
    list_lead: 'Lista vam pomaže da se dogovorite za stolom. Porudžbinu potvrđuje konobar.', prep: 'Priprema', portion: 'Porcija', energy: 'Energija', minutes: 'min',
    nutrition: 'Nutritivne vrednosti', per_portion: 'po porciji, okvirno', protein: 'Proteini', carbs: 'Ugljeni hidrati', fat: 'Masti', composition: 'Sastav i gramaža',
    allergens: 'Alergeni', al_note: 'Ako imate alergiju, recite konobaru — kuhinja će proveriti svaki sastojak.', no_al: 'Bez glavnih alergena', pair: 'Savršeno uz', pair_d: 'Uz piće preporučujemo',
    sig: 'Preporuka kuće', vege: 'Vegetarijansko', posno: 'Posno', ljuto: 'Ljuto', deljenje: 'Za deljenje', novo: 'Novo', until: 'Poručivanje do', h: 'h',
    torte_t: 'Torte po porudžbini', torte_lead: 'Pored velikih torti pravimo i mini torte od 1 kg, a Popsi su obavezan deo svakog rođendana. Poručite par dana ranije.',
    per_kg: 'za 1 kg', order_cake: 'Poruči tortu', call_shop: 'Pozovi radionicu', flavor: 'Ukus', weight: 'Težina', date: 'Datum preuzimanja', pickup: 'Preuzimanje',
    msg: 'Natpis na torti', name: 'Ime i prezime', phone: 'Telefon', send: 'Pošalji zahtev', sent_t: 'Zahtev je poslat', sent_d: 'Radionica vas zove da potvrdi ukus, dizajn i termin. U demo verziji zahtev se ne šalje.',
    vitrina_lead: 'Kolači iz naše poslastičarnice — svaki možete rastaviti ili preseći.', ml: 'ml', glass: 'u čaši', layers_cap: 'Šta je u čaši',
    hours: 'Radno vreme', contact: 'Kontakt', demo_t: 'TipTap demo za Ultra Caffe', back: 'Nazad', close: 'Zatvori', photo: 'Fotografija',
    footer_note: 'Prikaz digitalnog menija koji je TipTap pripremio za Ultra Caffe. Jelovnik, cene i fotografije su sa vašeg sajta i Instagrama; gramaže, kalorije i alergeni su okvirni i čekaju potvrdu kuhinje.',
    tap_split: 'Dodirnite i pogledajte šta je unutra', tap_cut: 'Dodirnite i presecite', guests_note: 'Pokažite ovaj ekran konobaru', from: 'od',
    search_ph: 'Pretražite meni', jump_l: 'Brzo do dela menija', help: 'Pomozi mi da izaberem', house: 'Preporuka kuće', g_hrana: 'Hrana', g_slatko: 'Slatko', g_pice: 'Piće',
    c_hrana: 'jela', c_pice: 'pića', c_kolaci: 'kolača', c_torte: 'ukusa', results: 'Rezultati', no_res: 'Ništa nije pronađeno. Probajte drugu reč, na primer „pasta” ili „kafa”.',
    all: 'Sve', home: 'Meni', reviews: 'recenzija na Google-u', reviews_s: 'recenzija', on_g: 'na Google-u', rev_t: 'Kako vam je bilo?', rev_lead: 'Vaše mišljenje pomaže drugim gostima, a nama da budemo još bolji.',
    rev_g: 'Ostavi recenziju na Google-u', rev_g_s: 'Javno, za sve goste', rev_m: 'Piši menadžeru', rev_m_s: 'Privatno, samo za nas', rev_read: 'Pročitaj recenzije',
    rev_m_lead: 'Poruku vidi samo menadžer lokala. Ako želite odgovor, ostavite broj telefona.', rev_m_ph: 'Šta je bilo odlično, a šta možemo bolje?', rev_m_send: 'Pošalji menadžeru',
    rev_m_ok: 'Hvala! Menadžer je dobio vašu poruku.', rev_m_demo: 'U demo verziji poruka se ne šalje.', rev_card_t: 'Svidelo vam se?', rev_card_d: 'Ocenite nas na Google-u ili pišite direktno menadžeru.',
    size: 'Zapremina', kind: 'Vrsta', origin: 'Vinarija i poreklo', served: 'Služi se', served_glass: 'u čaši', served_btl: 'u flaši', served_can: 'u limenci', per_glass: 'po čaši',
    mk_start: 'Šanker pravi: {n}', mk_ice: 'Led', mk_muddle: 'Gnječenje nane i šećera', mk_shake: 'Mućkanje sa ledom', mk_strain: 'Ceđenje u čašu', mk_straw: 'Slamčica i ukras', mk_garnish: 'Ukras', mk_done: 'Gotovo! Evo šta je u čaši', mk_skip: 'Preskoči', mk_again: 'Pogledaj kako se pravi',
    tip_s: 'Savet šankera', tip_b: 'Savet bariste', mood_q: 'Šta vam se pije?', mood_n: 'pića', surprise: 'Iznenadi me', moods: { fresh: 'Osvežavajuće', warm: 'Toplo', sweet: 'Slatko', free: 'Bez alkohola', strong: 'Jako', party: 'Za proslavu' },
    st_btn: 'Podeli u story', st_t: 'Story za Instagram', st_share: 'Podeli u story', st_save: 'Sačuvaj sliku', st_note: 'Označite @{ig} u storiju i lokal vas može podeliti.', st_saved: 'Slika je sačuvana. Dodajte je u story.', st_wait: 'Pravimo vašu sliku…',
    strength: 'Jačina', energy_d: 'Energija', glass_l: 'Čaša', lvl: ['Bez alkohola', 'Lagano', 'Blago', 'Srednje', 'Jako', 'Vrlo jako'], alc: 'alk.', lovers: 'Za koga je', profile: 'Profil ukusa',
    pf: ['Slatko', 'Kiselo', 'Gorko', 'Voćno', 'Osvežavajuće'], kc_note: 'Jačina i kalorije su okvirne, po porciji', kc_hot: ', bez dodatog šećera', kc_glass: 'za vino iz boce po čaši od 0,125 l', per_g125: 'po čaši',
    gl: { fildzan: 'Fildžan', mug: 'Staklena šolja', cup: 'Šolja', espresso: 'Espresso šoljica', latte: 'Visoka čaša', teacup: 'Šolja za čaj', jug: 'Bokal', jar: 'Teglica', bowl: 'Činijica', tall: 'Visoka čaša', highball: 'Highball čaša', rocks: 'Niska čaša', martini: 'Čaša za martini', wine: 'Vinska čaša', redwine: 'Čaša za crveno vino', balloon: 'Balon čaša', shot: 'Čašica', cokanj: 'Čokanjče', snifter: 'Čaša za konjak', stem: 'Pivska čaša na nozi', tulip: 'Tulip čaša', krigla: 'Krigla', irish: 'Irish coffee čaša' },
    help_t: 'Pomoći ćemo vam da izaberete', q1: 'Koliko ste gladni?', q2: 'Šta vam se jede?', q3: 'Šta pijete uz to?', pick_t: 'Naš predlog za vas', add_all: 'Dodaj sve na listu', again: 'Ponovo',
    a_light: 'Nešto lagano', a_meal: 'Pravi obrok', a_share: 'Za deljenje', a_meat: 'Meso', a_fish: 'Riba', a_veg: 'Bez mesa', a_any: 'Iznenadite me',
    a_coffee: 'Kafa', a_fresh: 'Nešto osvežavajuće', a_wine: 'Vino ili pivo', a_cocktail: 'Koktel', step: 'Korak', dessert: 'Za kraj', p_dish: 'Jelo', p_drink: 'Piće' },
  en: { menu: 'Food', drinks: 'Drinks', cakes: 'Cakes', torte: 'Cakes to order', open_menu: 'Open the menu', reserve: 'Book a table', call: 'Call', skip: 'Skip',
    open_until: 'Open until', closed: 'Closed', opens: 'opens at', split: 'Take it apart', split_d: 'Take it apart', split_k: 'Take it apart', cut_k: 'Cut it open', join: 'Put it back', made_of: 'What it’s made of',
    with_dish: 'On the side', est: 'estimate', side: 'side', add: 'Add to my list', added: 'Added to your list', list: 'My list', items: 'items', item1: 'item', items2: 'items',
    show_waiter: 'Show the waiter', call_waiter: 'Call the waiter', waiter_called: 'A waiter is on the way to your table', total: 'Total', empty: 'Your list is empty. Add dishes or drinks and show the list to your waiter.',
    list_lead: 'Your list helps the table decide. The waiter confirms the order.', prep: 'Ready in', portion: 'Portion', energy: 'Energy', minutes: 'min',
    nutrition: 'Nutrition', per_portion: 'per portion, estimated', protein: 'Protein', carbs: 'Carbohydrates', fat: 'Fat', composition: 'Ingredients & weights',
    allergens: 'Allergens', al_note: 'If you have an allergy, tell your waiter — the kitchen will check every ingredient.', no_al: 'No major allergens', pair: 'Goes well with', pair_d: 'We suggest with it',
    sig: 'House pick', vege: 'Vegetarian', posno: 'Vegan / fasting', ljuto: 'Spicy', deljenje: 'To share', novo: 'New', until: 'Served until', h: ':00',
    torte_t: 'Cakes to order', torte_lead: 'Besides full-size cakes we make 1 kg mini cakes, and our Popsy cake pops belong at every birthday. Order a few days ahead.',
    per_kg: 'per 1 kg', order_cake: 'Order a cake', call_shop: 'Call the bakery', flavor: 'Flavour', weight: 'Weight', date: 'Pick-up date', pickup: 'Pick-up',
    msg: 'Message on the cake', name: 'Full name', phone: 'Phone', send: 'Send request', sent_t: 'Request sent', sent_d: 'The bakery will call you to confirm flavour, design and time. In this demo nothing is sent.',
    vitrina_lead: 'Cakes from our own pastry kitchen — take any of them apart or cut it open.', ml: 'ml', glass: 'in the glass', layers_cap: 'What’s in the glass',
    hours: 'Opening hours', contact: 'Contact', demo_t: 'TipTap demo for Ultra Caffe', back: 'Back', close: 'Close', photo: 'Photo',
    footer_note: 'A digital menu preview prepared by TipTap for Ultra Caffe. Menu, prices and photos come from your website and Instagram; weights, calories and allergens are estimates awaiting kitchen sign-off.',
    tap_split: 'Tap to see what’s inside', tap_cut: 'Tap to cut it open', guests_note: 'Show this screen to your waiter', from: 'from',
    search_ph: 'Search the menu', jump_l: 'Jump to a part of the menu', help: 'Help me choose', house: 'House picks', g_hrana: 'Food', g_slatko: 'Sweets', g_pice: 'Drinks',
    c_hrana: 'dishes', c_pice: 'drinks', c_kolaci: 'cakes', c_torte: 'flavours', results: 'Results', no_res: 'Nothing found. Try another word, like “pasta” or “coffee”.',
    all: 'All', home: 'Menu', reviews: 'Google reviews', reviews_s: 'reviews', on_g: 'on Google', rev_t: 'How was it?', rev_lead: 'Your opinion helps other guests — and helps us get even better.',
    rev_g: 'Leave a Google review', rev_g_s: 'Public, for every guest', rev_m: 'Message the manager', rev_m_s: 'Private, just for us', rev_read: 'Read reviews',
    rev_m_lead: 'Only the venue manager reads this. Leave a phone number if you’d like a reply.', rev_m_ph: 'What was great, and what could we do better?', rev_m_send: 'Send to the manager',
    rev_m_ok: 'Thank you! The manager has your message.', rev_m_demo: 'In this demo nothing is sent.', rev_card_t: 'Enjoyed it?', rev_card_d: 'Rate us on Google or write straight to the manager.',
    size: 'Size', kind: 'Type', origin: 'Winery & origin', served: 'Served', served_glass: 'by the glass', served_btl: 'in the bottle', served_can: 'in the can', per_glass: 'per glass',
    mk_start: 'The bartender is making: {n}', mk_ice: 'Ice', mk_muddle: 'Muddling mint and sugar', mk_shake: 'Shaking with ice', mk_strain: 'Straining into the glass', mk_straw: 'Straw and garnish', mk_garnish: 'Garnish', mk_done: 'Done! Here’s what’s inside', mk_skip: 'Skip', mk_again: 'Watch how it’s made',
    tip_s: 'Bartender’s tip', tip_b: 'Barista’s tip', mood_q: 'What are you in the mood for?', mood_n: 'drinks', surprise: 'Surprise me', moods: { fresh: 'Refreshing', warm: 'Warming', sweet: 'Sweet', free: 'Alcohol-free', strong: 'Strong', party: 'To celebrate' },
    st_btn: 'Share to story', st_t: 'Instagram story', st_share: 'Share to story', st_save: 'Save image', st_note: 'Tag @{ig} in your story and the venue can repost you.', st_saved: 'Image saved. Add it to your story.', st_wait: 'Making your image…',
    strength: 'Strength', energy_d: 'Energy', glass_l: 'Glass', lvl: ['Alcohol-free', 'Light', 'Mild', 'Medium', 'Strong', 'Very strong'], alc: 'ABV', lovers: 'Who it’s for', profile: 'Taste profile',
    pf: ['Sweet', 'Sour', 'Bitter', 'Fruity', 'Refreshing'], kc_note: 'Strength and calories are approximate, per serving', kc_hot: ', without added sugar', kc_glass: 'for bottled wine per 0.125 l glass', per_g125: 'per glass',
    gl: { fildzan: 'Turkish coffee cup', mug: 'Glass mug', cup: 'Cup', espresso: 'Espresso cup', latte: 'Tall glass', teacup: 'Teacup', jug: 'Jug', jar: 'Small jar', bowl: 'Small bowl', tall: 'Tall glass', highball: 'Highball glass', rocks: 'Rocks glass', martini: 'Martini glass', wine: 'Wine glass', redwine: 'Red wine glass', balloon: 'Balloon glass', shot: 'Shot glass', cokanj: 'Rakija glass', snifter: 'Snifter', stem: 'Stemmed beer glass', tulip: 'Tulip glass', krigla: 'Beer mug', irish: 'Irish coffee glass' },
    help_t: 'Let us help you choose', q1: 'How hungry are you?', q2: 'What are you in the mood for?', q3: 'Something to drink with it?', pick_t: 'Our suggestion for you', add_all: 'Add all to my list', again: 'Start over',
    a_light: 'Something light', a_meal: 'A proper meal', a_share: 'To share', a_meat: 'Meat', a_fish: 'Fish', a_veg: 'No meat', a_any: 'Surprise me',
    a_coffee: 'Coffee', a_fresh: 'Something refreshing', a_wine: 'Wine or beer', a_cocktail: 'A cocktail', step: 'Step', dessert: 'To finish', p_dish: 'Dish', p_drink: 'Drink' }
};
const t = k => (TX[L] && TX[L][k] != null ? TX[L][k] : TX.sr[k] != null ? TX.sr[k] : k);
const nm = o => (L === 'en' && o.en ? o.en : o.sr);
const nf = n => Math.round(n).toLocaleString('sr-RS');
const money = p => `<span class="pr num">${nf(p)}<small>RSD</small></span>`;
const GC = { meso: '#D07A5C', riba: '#E9A07E', sir: '#E6C899', povrce: '#9DBB68', prilog: '#D9AE6A', testo: '#D9AE6A', sos: '#D49A78', slatko: '#E3A9BD', voce: '#D2577A' };
const IC = {
  shaker: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2.5h5l.8 4h-6.6z"/><path d="M8.2 6.5h7.6l-1 14a1.5 1.5 0 0 1-1.5 1.4h-2.6a1.5 1.5 0 0 1-1.5-1.4z"/><path d="M8.6 11h6.8"/></svg>',
  cup: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 9h12v4.5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M16.5 10.5h1.7a2.3 2.3 0 0 1 0 4.6h-1.9M8 2.8c.9 1-.9 2 0 3.2M12 2.8c.9 1-.9 2 0 3.2M3 21h15"/></svg>',
  ig: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>',
  share: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3.5M7.5 8 12 3.5 16.5 8"/><path d="M5 12.5v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>',
  dl: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5V15M7.5 10.5 12 15l4.5-4.5"/><path d="M4.5 19.5h15"/></svg>',
  m_fresh: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6"/><path d="m9.5 4.3 2.5 2.2 2.5-2.2M9.5 19.7l2.5-2.2 2.5 2.2"/></svg>',
  m_warm: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 10h11v3.5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M15.5 11h1.6a2.3 2.3 0 0 1 0 4.6h-1.8M8 3c1 1.1-1 2.2 0 3.4M12 3c1 1.1-1 2.2 0 3.4"/></svg>',
  m_sweet: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="9.5" r="6"/><path d="M7 9.5a3 3 0 0 1 6 0M14.3 13.8 20 21"/></svg>',
  m_free: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19c0-8.2 5.2-13.2 14.5-14-.8 9.3-5.8 14-14.5 14z"/><path d="M5 19 12.5 11.5"/></svg>',
  m_strong: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21.2c-3.9 0-6.4-2.6-6.4-6.1 0-3.6 2.7-5.3 3.7-8.7 1.6 1.2 2.4 2.7 2.6 4.2 1-.9 1.6-2.2 1.6-3.6 2.6 1.9 5 5 5 8.1 0 3.5-2.6 6.1-6.5 6.1z"/></svg>',
  m_party: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3.5 6 10a3 3 0 0 0 2.6 3.7l-.6 6.8M5.5 20.5h5M16 3.5l2 6.5a3 3 0 0 1-2.6 3.7l.6 6.8M13.5 20.5h5"/><path d="M6.7 7.4h3.5M13.8 7.4h3.5"/></svg>',
  dice: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.6" cy="8.6" r="1.1" fill="currentColor" stroke="none"/><circle cx="15.4" cy="8.6" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="8.6" cy="15.4" r="1.1" fill="currentColor" stroke="none"/><circle cx="15.4" cy="15.4" r="1.1" fill="currentColor" stroke="none"/></svg>',
  food: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3v6.5a2 2 0 0 0 2 2v9.5M5 3v5M9 3v5M17.5 3c-1.8 1-2.7 3.4-2.7 6.4h2.7V21"/></svg>',
  sweet: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 12.5h12l-1.6 8H7.6z"/><path d="M5.4 12.5a6.6 5.6 0 0 1 13.2 0"/><path d="M12 4v2.6M9.5 16v2M14.5 16v2"/></svg>',
  drink: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4h15L12 12.5z"/><path d="M12 12.5V20M8 20.5h8M15.5 4l3-2"/></svg>',
  play: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.8v12.4c0 .8.9 1.3 1.6.9l10-6.2c.6-.4.6-1.4 0-1.8l-10-6.2C8.9 4.5 8 5 8 5.8z"/></svg>',
  split: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6.5h16M6 11h12M5 15.5h14M7 20h10"/><path d="M12 2.5v2M12 21.5v.5" opacity=".5"/></svg>',
  knife: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 3.5 4 14l3 3 3.5-3.5"/><path d="m10.5 13.5 9-9"/><path d="m13 17 3 3.5M16 14l4.5 4"/></svg>',
  burst: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>',
  bag: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
  x: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  cal: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  phone: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M6.6 3.5h2.6l1.5 4.2-2 1.4a11 11 0 0 0 6.2 6.2l1.4-2 4.2 1.5v2.6A2.1 2.1 0 0 1 18.4 19.6 15.5 15.5 0 0 1 4.4 5.6 2.1 2.1 0 0 1 6.6 3.5Z"/></svg>',
  bell: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15L6 16.5Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>',
  eye: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  ok: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="28" opacity=".35"/><path d="M20 33l8 8 16-17"/></svg>',
  menu: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5 5h14M5 12h14M5 19h9"/></svg>',
  chart: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  plan: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2.2"/><rect x="13" y="13" width="5" height="5" rx="1.2"/><path d="M3 13h6v8"/></svg>',
  search: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.6 15.6 4.9 4.9"/></svg>',
  spark: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3.5 13.9 9.1 19.5 11 13.9 12.9 12 18.5 10.1 12.9 4.5 11 10.1 9.1Z"/><path d="M18.5 3.5v3M17 5h3M5.5 16.5v3M4 18h3" stroke-linecap="round"/></svg>',
  back: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>',
  arrow: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5.5 15.5 12 9 18.5"/></svg>',
  chat: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17h-7l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5Z"/></svg>',
  ext: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 4.5h6v6M19.5 4.5l-8 8M10 6.5H6a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 6 19.5h10a1.5 1.5 0 0 0 1.5-1.5v-4"/></svg>',
  g: '<svg class="gl" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>'
};
const stars = r => `<span class="stars" style="--p:${Math.round(r / 5 * 100)}%" aria-hidden="true">★★★★★</span>`;
const ALI = {
  gluten: '<path d="M12 21V8M12 8c-2-1-3-3-3-5 2 .5 3 2 3 5Zm0 0c2-1 3-3 3-5-2 .5-3 2-3 5Zm0 4c-2-1-3.5-2.5-3.5-4.5 2 .5 3.5 2 3.5 4.5Zm0 0c2-1 3.5-2.5 3.5-4.5-2 .5-3.5 2-3.5 4.5Zm0 4c-2-1-3.5-2.5-3.5-4.5 2 .5 3.5 2 3.5 4.5Zm0 0c2-1 3.5-2.5 3.5-4.5-2 .5-3.5 2-3.5 4.5Z"/>',
  jaja: '<path d="M12 3.5c3.2 0 6 5.2 6 9.5a6 6 0 0 1-12 0c0-4.3 2.8-9.5 6-9.5Z"/>',
  mleko: '<path d="M9 3h6M9.5 3v3l-2 3v11.5h9V9l-2-3V3M7.5 12.5h9"/>',
  riba: '<path d="M3 12c3-4 9-5 13-1l4-3v8l-4-3c-4 4-10 3-13-1Z"/><circle cx="8" cy="11" r=".8" fill="currentColor"/>',
  orasasti: '<path d="M12 4c4 0 7 3 7 7.5S15.5 20 12 20 5 16 5 11.5 8 4 12 4Z"/><path d="M12 4v16M8 9c2 1 6 1 8 0M8 14c2 1 6 1 8 0"/>',
  kikiriki: '<path d="M9 4.5a4 4 0 0 1 6 3.4c0 1.4-.8 2.1-.8 4.1s.8 2.7.8 4.1a4 4 0 0 1-8 0c0-1.4.8-2.1.8-4.1S7 9.3 7 7.9a3.9 3.9 0 0 1 2-3.4Z"/>',
  soja: '<path d="M6 18c0-7 5-12 12-12-1 7-5 12-12 12Z"/><circle cx="10" cy="14" r="1.4"/><circle cx="13" cy="11" r="1.4"/><circle cx="15.5" cy="8.5" r="1.2"/>',
  celer: '<path d="M8 21c-1-5 0-11 2-17M12 21V4M16 21c1-5 0-11-2-17M7 5c2-1 3 0 3 0M14 4s1-1 3 0"/>',
  senf: '<path d="M8 8h8l-1 12.5H9L8 8ZM9.5 8V5.5h5V8M10.5 3h3"/>',
  susam: '<ellipse cx="9" cy="10" rx="2" ry="3.2" transform="rotate(-25 9 10)"/><ellipse cx="15" cy="9" rx="2" ry="3.2" transform="rotate(20 15 9)"/><ellipse cx="12" cy="16" rx="2" ry="3.2"/>',
  sumpor: '<path d="M8 4h8M9 4v6l-4 9.5h14L15 10V4"/><path d="M7.5 15h9"/>'
};
const alIcon = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ALI[k] || '<circle cx="12" cy="12" r="7"/>'}</svg>`;

// ---------------------------------------------------------------- indeks
const ITEMS = U.items, KOL = U.kolaci;
const DR = U.drinks.map((d, i) => Object.assign(d, { id: 'd' + i, kind: 'drink' }));
const BY = {};
ITEMS.forEach(i => { i.kind = 'dish'; BY[i.id] = i; });
KOL.forEach(i => { i.kind = 'cake'; BY[i.id] = i; });
DR.forEach(d => { BY[d.id] = d; BY['d:' + d.sr] = d; });
const pairOf = s => s.startsWith('d:') ? BY[s] : BY[s.slice(2)];
const locOf = id => U.locs.find(l => l.id === id);
const GRPS = U.groups;
const grpOf = id => GRPS.find(g => g.id === id);
const membersOf = g => g.cats[0] === 'kolaci' ? KOL : g.cats[0] === 'torte' ? U.torte : g.sec === 'pice' ? DR.filter(d => g.cats.includes(d.cat)) : ITEMS.filter(i => g.cats.includes(i.cat));

// ---------------------------------------------------------------- događaji za upravu (isti uređaj)
function hit(type, id) {
  const ev = LS.get('ev', []); ev.push({ t: Date.now(), type, id, loc: LOC }); if (ev.length > 400) ev.splice(0, ev.length - 400); LS.set('ev', ev);
}

// ---------------------------------------------------------------- slike
const img = (k, thumb) => `img/f/${k}${thumb ? '-t' : ''}.webp`;
const photoOf = it => (it.kind === 'drink' ? (it.img ? [it.img] : null) : (it.img && it.img.length ? it.img : null));
const cutSrc = (it, thumb) => `img/c/${it.cut}${thumb ? '-t' : ''}.webp`;
const packSrc = (p, thumb) => `img/p/${p}${thumb ? '-t' : ''}.webp`;
const artInner = (key, seed) => K.top(key, seed).replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
function topArt(key, seed, w = 120, x = 0, y = 0) {
  return K.top(key, seed).replace('<svg viewBox="0 0 120 120"', `<svg x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(w)}" viewBox="0 0 120 120"`);
}
// glavni sastojak u sredini tanjira (naslovna ilustracija kad nema fotografije)
function heroFirst(it, comps) {
  const main = (comps || it.comps || []).filter(c => !c.side);
  const h = main.find(c => c.i === it.hero) || main[0];
  return [h].concat(main.filter(c => c !== h).sort((a, b) => b.g - a.g)).filter(Boolean).slice(0, 6);
}
function plateArt(it, comps) {
  const main = heroFirst(it, comps), n = main.length, cx = 120, cy = 120;
  let s = `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="pl-${it.id}" cx=".42" cy=".36" r=".8"><stop offset="0" stop-color="#fbf7ee"/><stop offset=".7" stop-color="#e9e1d1"/><stop offset="1" stop-color="#cfc4ae"/></radialGradient></defs>`;
  s += `<circle cx="120" cy="126" r="108" fill="#000" opacity=".35"/><circle cx="120" cy="120" r="108" fill="url(#pl-${it.id})"/><circle cx="120" cy="120" r="84" fill="none" stroke="#d6cbb5" stroke-width="1.4"/><circle cx="120" cy="120" r="104" fill="none" stroke="#b9975f" stroke-width="1.2" opacity=".55"/>`;
  const order = main.map((c, i) => i).slice(1).concat([0]); // glavni se crta poslednji, preko ostalih
  order.forEach(i => {
    const c = main[i]; let x, y, w;
    if (i === 0) { w = n > 3 ? 132 : n > 1 ? 144 : 170; x = cx - w / 2 + (n > 1 ? -12 : 0); y = cy - w / 2 + (n > 1 ? -6 : 0); }
    else { const a = -0.35 + (i - 1) / Math.max(1, n - 1) * Math.PI * 1.55; w = Math.max(64, 88 - i * 4); x = cx + Math.cos(a) * 64 - w / 2 + 8; y = cy + Math.sin(a) * 62 - w / 2 + 6; }
    s += topArt(c.a, i, w, x, y);
  });
  return s + '</svg>';
}
function thumbHTML(it) {
  if (it.kind === 'cake') return `<span class="th cut"><img src="${cutSrc(it, 1)}" alt="" loading="lazy"></span>`;
  const ph = photoOf(it);
  if (ph) return `<span class="th"><img src="${img(ph[0], 1)}" alt="" loading="lazy"></span>`;
  return `<span class="th ill"><img src="img/i/${it.id}.webp" alt="" loading="lazy" onerror="this.parentNode.dataset.art='${esc(heroFirst(it)[0] ? heroFirst(it)[0].a : 'fries')}';this.remove()"></span>`;
}
const tagHTML = it => {
  const tg = [];
  if (it.sig) tg.push(`<span class="tag sig">${t('sig')}</span>`);
  (it.tags || []).forEach(x => { if (['vege', 'posno', 'ljuto', 'deljenje', 'novo'].includes(x) && !(x === 'vege' && (it.tags || []).includes('posno'))) tg.push(`<span class="tag ${x}">${t(x)}</span>`); });
  return tg.join('');
};
const descOf = it => (L === 'en' ? it.desc_en || it.desc : it.desc) || '';

// ---------------------------------------------------------------- čaše, šolje i posuđe (viewBox 200×300)
const GLASS = {
  highball: { hw: () => 42, o: 'M52 26V274Q52 284 62 284H138Q148 284 148 274V26', clip: 'M58 30H142V264Q142 270 136 270H64Q58 270 58 264Z', top: 34, bot: 268, fill: .86, straw: [112, 4, 128, 250] },
  tall: { hw: y => 48 - (y - 30) / 240 * 11, o: 'M46 26 58 278Q60 286 70 286H130Q140 286 142 278L154 26', clip: 'M52 30H148L137 270H63Z', top: 34, bot: 270, fill: .88, straw: [118, 2, 126, 252] },
  latte: { hw: () => 31, o: 'M64 26V276Q64 286 74 286H126Q136 286 136 276V26', clip: 'M69 30H131V268Q131 272 127 272H73Q69 272 69 268Z', top: 34, bot: 271, fill: .9 },
  rocks: { hw: y => 56 - (y - 120) / 148 * 6, o: 'M38 116 44 274Q46 284 56 284H144Q154 284 156 274L162 116', clip: 'M44 120H156L150 268H50Z', top: 124, bot: 268, fill: .8 },
  martini: { hw: y => 70 * (160 - y) / 114, o: 'M22 42H178L100 166ZM100 166V270M62 278Q100 266 138 278', clip: 'M30 46H170L100 160Z', top: 48, bot: 158, fill: .86, tri: 1 },
  wine: { hw: y => 39 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 40) / 140, 2))), o: 'M56 34C46 120 62 176 100 182 138 176 154 120 144 34ZM100 182V270M60 278Q100 266 140 278', clip: 'M61 40C53 118 66 170 100 176 134 170 147 118 139 40Z', top: 46, bot: 174, fill: .62 },
  cup: { hw: y => y < 226 ? 60 - (y - 144) / 82 * 7 : 53 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 226) / 26, 2))), o: 'M34 140 42 228Q46 254 100 256 154 254 158 228L166 140ZM164 160Q192 162 188 188 184 212 156 210M30 262Q100 288 170 262', clip: 'M40 144 47 226Q51 248 100 250 149 248 153 226L160 144Z', top: 150, bot: 248, fill: .94 },
  espresso: { hw: y => 38 - (y - 196) / 56 * 7, o: 'M58 192 62 238Q66 256 100 257 134 256 138 238L142 192ZM140 204Q162 204 160 220 158 236 136 234M36 264Q100 284 164 264', clip: 'M62 196 66 237Q70 251 100 252 130 251 134 237L138 196Z', top: 200, bot: 250, fill: .9 },
  fildzan: { hw: y => 30 - (y - 204) / 48 * 7, o: 'M66 200 72 244Q76 256 100 256 124 256 128 244L134 200ZM50 264Q100 278 150 264', clip: 'M70 204 76 242Q80 252 100 252 120 252 124 242L130 204Z', top: 206, bot: 250, fill: .86 },
  mug: { hw: () => 43, o: 'M52 120V262Q52 280 70 280H130Q148 280 148 262V120ZM148 150Q182 150 182 186 182 222 148 222', clip: 'M57 124H143V258Q143 274 128 274H72Q57 274 57 258Z', top: 130, bot: 272, fill: .9 },
  teacup: { hw: y => 64 - (y - 174) / 82 * 12, o: 'M30 170 40 230Q48 260 100 262 152 260 160 230L170 170ZM166 186Q194 188 190 210 186 230 158 228M24 270Q100 292 176 270', clip: 'M36 174 45 228Q52 254 100 256 148 254 155 228L164 174Z', top: 178, bot: 254, fill: .86 },
  jug: { hw: () => 34, o: 'M66 130 60 150Q56 190 62 240Q66 268 100 270 134 268 138 240Q144 190 140 150L134 130ZM66 130Q62 120 52 118M138 160Q166 166 160 200 154 226 138 226', clip: 'M68 136 64 152Q60 190 66 238Q70 262 100 264 130 262 134 238Q140 190 136 152L132 136Z', top: 140, bot: 262, fill: .8 },
  jar: { hw: () => 39, o: 'M62 150Q56 150 56 160V262Q56 276 70 276H130Q144 276 144 262V160Q144 150 138 150ZM64 132H136V150H64Z', clip: 'M61 156H139V260Q139 271 128 271H72Q61 271 61 260Z', top: 160, bot: 270, fill: .62 },
  bowl: { hw: y => 56 - (y - 204) * .42, o: 'M40 200Q44 262 100 264 156 262 160 200ZM34 200H166', clip: 'M44 204Q48 258 100 260 152 258 156 204Z', top: 206, bot: 258, fill: .95 },
  shot: { hw: y => 26 - (y - 200) / 68 * 6, o: 'M70 196 76 270Q77 278 85 278H115Q123 278 124 270L130 196', clip: 'M74 200H126L120 268H80Z', top: 206, bot: 268, fill: .75 },
  pint: { hw: y => 45 - (y - 44) / 230 * 8, o: 'M50 40 58 270Q60 282 72 282H128Q140 282 142 270L150 40', clip: 'M55 44H145L137 268Q136 276 128 276H72Q64 276 63 268Z', top: 50, bot: 274, fill: .92 },
  // točeno pivo: čaša na nozi (Heineken), tulip čaša sa debelim dnom (Moretti), krigla (Krušovice)
  stem: { hw: y => y < 176 ? 41 - (y - 28) / 148 * 13 : Math.max(5, 28 - (y - 176) / 27 * 23), o: 'M55 24C53 80 56 140 70 180C78 200 88 210 94 216V250Q94 258 74 260Q56 262 56 268Q58 276 100 276Q142 276 144 268Q144 262 126 260Q106 258 106 250V216C112 210 122 200 130 180C144 140 147 80 145 24', clip: 'M60 28C58 82 61 138 74 176C82 194 92 202 100 203C108 202 118 194 126 176C139 138 142 82 140 28Z', top: 34, bot: 202, fill: .95, base: 276, beer: 1 },
  tulip: { hw: y => y < 128 ? 40 + (y - 32) / 96 * 6 : Math.max(16, 46 - (y - 128) / 90 * 30), o: 'M60 28C54 60 50 96 54 128C58 160 76 190 80 220C82 238 80 256 76 266Q72 278 80 283Q88 286 100 286Q112 286 120 283Q128 278 124 266C120 256 118 238 120 220C124 190 142 160 146 128C150 96 146 60 140 28', clip: 'M64 32C59 62 56 96 59 127C63 158 80 188 84 218C86 234 86 248 85 258H115C114 248 114 234 116 218C120 188 137 158 141 127C144 96 141 62 136 32Z', top: 38, bot: 258, fill: .95, base: 286, beer: 1 },
  krigla: { hw: () => 46, o: 'M48 44V268Q48 286 66 286H134Q152 286 152 268V44', clip: 'M54 48H146V262Q146 270 138 270H62Q54 270 54 262Z', top: 54, bot: 270, fill: .94, base: 286, beer: 1,
    extra: '<path d="M152 88Q190 88 190 122V206Q190 240 152 240V218Q170 218 170 200V128Q170 110 152 110Z" fill="rgba(241,234,223,.08)" stroke="rgba(241,234,223,.55)" stroke-width="3" stroke-linejoin="round"/><path d="M78 60V256M122 60V256" stroke="#fff" stroke-opacity=".045" stroke-width="9"/><path d="M48 272H152" stroke="rgba(241,234,223,.3)" stroke-width="2"/>' },
  // žestina: čokanjče za rakiju i snifter za konjak i vinjak
  cokanj: { hw: y => y < 170 ? 24 + (y - 124) / 46 * 5 : Math.max(4, 29 - (y - 170) / 36 * 25), o: 'M74 120C70 140 68 160 70 178C72 198 84 210 96 213V268Q80 270 70 273Q68 278 100 278Q132 278 130 273Q120 270 104 268V213C116 210 128 198 130 178C132 160 130 140 126 120', clip: 'M78 124C74 142 73 160 75 177C77 194 87 204 100 205C113 204 123 194 125 177C127 160 126 142 122 124Z', top: 126, bot: 205, fill: .5 },
  irish: { hw: y => y < 200 ? 50 - (y - 44) / 156 * 8 : Math.max(8, 42 - (y - 200) / 28 * 34), o: 'M48 40C46 120 52 190 70 218Q80 232 92 236V262Q74 266 60 270Q58 278 100 278Q142 278 140 270Q126 266 108 262V236Q120 232 130 218C148 190 154 120 152 40', clip: 'M53 44C51 120 57 186 74 212Q86 228 100 229Q114 228 126 212C143 186 149 120 147 44Z', top: 52, bot: 228, fill: .92, base: 278,
    extra: '<path d="M151 76Q190 76 190 112V150Q190 186 146 190V172Q172 168 172 146V116Q172 94 152 94Z" fill="rgba(241,234,223,.08)" stroke="rgba(241,234,223,.55)" stroke-width="3" stroke-linejoin="round"/>' },
  balloon: { hw: y => y < 130 ? 46 + (y - 64) / 66 * 16 : Math.max(4, 62 - (y - 130) / 64 * 58), o: 'M54 60C40 92 36 132 44 158C54 188 80 198 96 200V262Q74 264 56 268Q54 274 100 274Q146 274 144 268Q126 264 104 262V200C120 198 146 188 156 158C164 132 160 92 146 60', clip: 'M58 64C46 94 42 130 49 155C58 182 80 192 100 193C120 192 142 182 151 155C158 130 154 94 142 64Z', top: 70, bot: 193, fill: .74, base: 274 },
  redwine: { hw: y => y < 120 ? 36 + (y - 44) / 76 * 14 : Math.max(4, 50 - (y - 120) / 52 * 46), o: 'M64 40C52 70 48 104 52 128C58 160 80 178 96 182V262Q74 264 58 268Q56 274 100 274Q144 274 142 268Q126 264 104 262V182C120 178 142 160 148 128C152 104 148 70 136 40', clip: 'M68 44C57 72 53 104 57 127C62 154 82 170 100 172C118 170 138 154 143 127C147 104 143 72 132 44Z', top: 50, bot: 172, fill: .42, base: 274 },
  snifter: { hw: y => y < 204 ? 32 + (y - 120) / 84 * 30 : Math.max(6, 62 - (y - 204) / 44 * 56), o: 'M64 118C48 150 34 178 36 204C38 236 64 252 92 254L94 256V276Q70 278 56 281Q56 286 100 286Q144 286 144 281Q130 278 106 276V256L108 254C136 252 162 236 164 204C166 178 152 150 136 118', clip: 'M68 122C53 152 41 178 42 204C44 232 68 246 100 247C132 246 156 232 158 204C159 178 147 152 132 122Z', top: 124, bot: 246, fill: .26 }
};
const VB = { espresso: [24, 168, 156, 110], fildzan: [34, 176, 132, 104], teacup: [14, 146, 186, 150], cup: [22, 118, 174, 176], bowl: [22, 176, 156, 100], jar: [36, 116, 128, 172], jug: [36, 100, 144, 182], shot: [52, 176, 96, 112], mug: [34, 96, 160, 196], rocks: [28, 96, 144, 196], martini: [14, 26, 172, 264], cokanj: [56, 108, 88, 176], snifter: [26, 104, 148, 188], stem: [30, 10, 140, 272], tulip: [30, 16, 140, 278], krigla: [26, 32, 176, 262], irish: [30, 26, 170, 258], balloon: [24, 40, 152, 240], redwine: [36, 22, 128, 258] };
const vbOf = d => VB[d.glass] || [0, 0, 200, 300];
const vbS = d => vbOf(d).join(' ');
const FIZZ = ['soda', 'tonic', 'sprite', 'cola', 'guarana', 'pgf', 'prosecco', 'beer', 'beer_dark'];
function glassGeo(d) {
  const g = GLASS[d.glass] || GLASS.highball, lay = d.layers || [], tot = lay.reduce((a, b) => a + b[1], 0) || 1;
  const H = (g.bot - g.top) * (d.fill || g.fill), minH = 7;
  let hs = lay.map(l => Math.max(minH, H * l[1] / tot)); const k = H / hs.reduce((a, b) => a + b, 0); hs = hs.map(h => h * k);
  let y = g.bot; const geo = hs.map(h => { const r = { y0: y - h, y1: y, h }; y -= h; return r; });
  return { g, geo, lay };
}
let GID = 0;
const BEER = { beer: ['#f5c64f', '#d88f1e', '#b8701a'], beer_dark: ['#7a3a17', '#3d1a0b', '#250e05'] };
function beerArt(id, key, c, r) {
  if (BEER[key]) {
    const [a, b, e] = BEER[key], gid = `${id}b${key}`, my = r.y0 + r.h;
    let q = `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${e}"/></linearGradient></defs><rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h + .6)}" fill="url(#${gid})"/>`;
    q += `<rect x="62" y="${f1(r.y0)}" width="14" height="${f1(r.h)}" fill="#fff" opacity=".1"/>`;
    [86, 104, 117].forEach((x, s) => { for (let k = 0; k < 9; k++) { const y = my - 8 - k * (r.h - 14) / 9 - (s * 7) % 11; if (y > r.y0 + 4) q += `<circle cx="${x + Math.sin(k + s) * 2}" cy="${f1(y)}" r="${f1(.8 + (k % 3) * .45)}" fill="#fff" opacity="${key === 'beer' ? .55 : .3}"/>`; } });
    return q;
  }
  // pena: talasast vrh, sitni mehurići, senka prema pivu
  const y0 = r.y0, y1 = r.y0 + r.h;
  let q = `<path d="M0 ${f1(y1 + .5)}V${f1(y0 + 4)}Q14 ${f1(y0 - 3)} 30 ${f1(y0 + 2)}T60 ${f1(y0 + 1)}T92 ${f1(y0 + 3)}T124 ${f1(y0)}T156 ${f1(y0 + 3)}T200 ${f1(y0 + 2)}V${f1(y1 + .5)}Z" fill="${c}"/>`;
  q += `<rect x="0" y="${f1(y1 - Math.min(5, r.h * .3))}" width="200" height="${f1(Math.min(5, r.h * .3) + .5)}" fill="#000" opacity=".07"/>`;
  [[70, .35], [84, .6], [97, .3], [111, .7], [126, .45], [78, .8], [118, .25]].forEach(([x, f], k) => { q += `<circle cx="${x}" cy="${f1(y0 + 4 + f * (r.h - 7))}" r="${1.4 + (k % 3) * .6}" fill="none" stroke="#000" stroke-opacity=".08"/>`; });
  return q;
}
function dropsArt(geo, lay) {
  const i = lay.findIndex(l => BEER[l[0]]); if (i < 0) return '';
  const r = geo[i]; let q = '';
  [[64, .2], [131, .32], [72, .55], [124, .7], [80, .85], [136, .5], [68, .4], [128, .15]].forEach(([x, f], k) => { const y = r.y0 + 6 + f * (r.h - 12); q += `<ellipse cx="${x}" cy="${f1(y)}" rx="${1.6 + (k % 3) * .5}" ry="${2.2 + (k % 3) * .6}" fill="#fff" opacity=".22"/><circle cx="${f1(x - .5)}" cy="${f1(y - .8)}" r=".7" fill="#fff" opacity=".7"/>`; });
  return q;
}
const CLEAR = ['soda', 'water', 'sprite', 'tonic'];
function layerArt(id, key, c, r) {
  // bistra gazirana tečnost: providna, sa mehurićima (nije bela traka)
  if (CLEAR.includes(key)) return `<rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h + .6)}" fill="#d6eaee" opacity=".2"/><rect x="0" y="${f1(r.y0)}" width="200" height="1.6" fill="#fff" opacity=".35"/>` + (r.h > 10 ? Array.from({ length: 12 }, (_, k) => `<circle cx="${60 + (k * 37) % 84}" cy="${f1(r.y0 + 5 + ((k * 53) % Math.max(8, r.h - 8)))}" r="${1.2 + (k % 3) * .7}" fill="#fff" opacity=".55"/>`).join('') : '') + `<rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h)}" fill="url(#${id}s)"/>`;
  if (['rum', 'vodka', 'gin', 'tequila', 'puskin'].includes(key)) return `<rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h + .6)}" fill="#dcecef" opacity=".26"/><rect x="0" y="${f1(r.y0)}" width="200" height="1.4" fill="#fff" opacity=".3"/><rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h)}" fill="url(#${id}s)"/>`;
  if (key === 'sp_clear') return `<rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h + .6)}" fill="#cfe0e4" opacity=".3"/><rect x="0" y="${f1(r.y0)}" width="200" height="${f1(Math.min(2.4, r.h))}" fill="#fff" opacity=".75"/><rect x="0" y="${f1(r.y0 + 2.4)}" width="200" height="${f1(Math.min(4, r.h))}" fill="#fff" opacity=".12"/>`;
  if (BEER[key] || key === 'beer_foam' || key === 'beer_foam_d') return beerArt(id, key, c, r) + `<rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h)}" fill="url(#${id}s)"/>`;
  let q = `<rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h + .6)}" fill="${c}"/><rect x="0" y="${f1(r.y0)}" width="200" height="${f1(Math.min(3, r.h))}" fill="#fff" opacity=".18"/>`;
  const my = r.y0 + r.h / 2;
  if (key === 'mint') q += [70, 96, 120].map((x, k) => `<ellipse cx="${x}" cy="${f1(my)}" rx="10" ry="5" fill="#3f7f32" transform="rotate(${k * 40 - 30} ${x} ${f1(my)})"/>`).join('');
  if (['whip', 'foam', 'icecream', 'tfoam'].includes(key)) q += Array.from({ length: 8 }, (_, k) => `<circle cx="${44 + k * 16}" cy="${f1(r.y0 + 3)}" r="9" fill="${c}"/>`).join('');
  if (key === 'ice') q += [[78, 0], [106, 6], [130, -3]].map(([x, o]) => `<rect x="${x - 12}" y="${f1(my - 11 + o)}" width="24" height="22" rx="5" fill="#eef8fb" opacity=".75" stroke="#fff" stroke-opacity=".8" transform="rotate(${o * 3} ${x} ${f1(my)})"/>`).join('');
  if (FIZZ.includes(key) && !BEER[key] && r.h > 14) q += Array.from({ length: 9 }, (_, k) => `<circle cx="${64 + (k * 37) % 76}" cy="${f1(r.y0 + 6 + ((k * 53) % Math.max(8, r.h - 10)))}" r="${1.4 + (k % 3) * .7}" fill="#fff" opacity=".45"/>`).join('');
  return q + `<rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h)}" fill="url(#${id}s)"/>`;
}
function glassDefs(id, g) {
  return `<defs><clipPath id="${id}"><path d="${g.clip}"/></clipPath><linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".18" stop-color="#fff" stop-opacity=".05"/><stop offset=".8" stop-color="#000" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient></defs>`;
}
// cela čaša (sličica, pozornica) ili samo jedan sloj (only = indeks) za rasprskavanje
function glassSVG(d, only) {
  const { g, geo, lay } = glassGeo(d); const id = 'gc' + (++GID);
  let s = `<svg viewBox="${vbS(d)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${glassDefs(id, g)}`;
  const one = i => { const l = U.lq[lay[i][0]] || ['', '', '#ccc']; return `<g clip-path="url(#${id})">${layerArt(id, lay[i][0], l[2], geo[i])}</g>`; };
  if (only != null) return s + one(only) + '</svg>';
  const k = d.gk || 1, base = g.base || g.bot + 12;
  if (k !== 1) s += `<g transform="matrix(${k},0,0,${k},${f1(100 * (1 - k))},${f1(base * (1 - k))})">`;
  lay.forEach((_, i) => { s += one(i); });
  if (g.beer) s += `<g clip-path="url(#${id})">${dropsArt(geo, lay)}</g>`;
  if (g.straw) s += `<path d="M${g.straw[0]} ${g.straw[1]}L${g.straw[2]} ${g.straw[3]}" stroke="#CFA670" stroke-width="5" stroke-linecap="round" opacity=".9"/>`;
  s += `<path d="${g.o}" fill="none" stroke="rgba(241,234,223,.55)" stroke-width="3" stroke-linejoin="round"/><path d="${g.clip}" fill="url(#${id}s)" opacity=".5"/>${g.extra || ''}`;
  return s + (k !== 1 ? '</g>' : '') + '</svg>';
}
const glassShell = d => { const g = GLASS[d.glass] || GLASS.highball, id = 'gs' + (++GID); return `<svg viewBox="${vbS(d)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${glassDefs(id, g)}<path d="${g.clip}" fill="url(#${id}s)" opacity=".6"/><path d="${g.o}" fill="none" stroke="rgba(241,234,223,.6)" stroke-width="3" stroke-linejoin="round"/>${g.extra || ''}</svg>`; };
const strawSVG = d => { const g = GLASS[d.glass]; if (!g || !g.straw) return ''; return `<svg viewBox="${vbS(d)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M${g.straw[0]} ${g.straw[1]}L${g.straw[2]} ${g.straw[3]}" stroke="#CFA670" stroke-width="5" stroke-linecap="round" opacity=".9"/></svg>`; };
// sličica pića u redu: flaša, čaša ili fotografija
function drinkLead(d) {
  if (d.img) return `<span class="dl ph"><img src="${img(d.img, 1)}" alt="" loading="lazy"></span>`;
  if (d.pack) return `<span class="dl pk"><img src="${packSrc(d.pack, 1)}" alt="" loading="lazy"></span>`;
  return `<span class="dl gi">${glassSVG(d)}</span>`;
}

// ---------------------------------------------------------------- kostur stranice
const app = $('#app');
document.body.insertAdjacentHTML('afterbegin', K.defs());
function skeleton() {
  app.innerHTML = `
  <header class="top" id="top"><button class="lgb" id="lgb" aria-label="${esc(t('home'))}"><img class="lg" src="img/logo.webp" alt="Ultra Caffe"></button><div class="sp"></div>
    <div class="lang" role="group" aria-label="Jezik"><button data-l="sr">SR</button><button data-l="en">EN</button></div>
    <button class="bag" id="bagBtn" aria-label="${esc(t('list'))}">${IC.bag}<b class="num" id="bagN">0</b></button></header>
  <div class="wrap"><main id="main"></main></div>
  <div class="dock" id="dock"><div class="t"><b id="dockT"></b><small id="dockS"></small></div><button class="btn btn-m btn-s" id="dockBtn">${esc(t('list'))}</button></div>
  <div class="scrim" id="scrim"></div>
  <section class="sheet dish" id="dish" role="dialog" aria-modal="true"></section>
  <section class="sheet cart" id="cart" role="dialog" aria-modal="true"></section>
  <div class="show-w" id="showW"></div>
  <div class="toast" id="toast"></div>`;
  $$('.lang button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  $('#bagBtn').onclick = openCart; $('#dockBtn').onclick = openCart;
  $('#lgb').onclick = () => { if (VIEW !== 'home') goHome(); else scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); };
  $('#scrim').onclick = () => { if ($('#dish').classList.contains('on')) history.back(); else closeCart(); };
  addEventListener('scroll', () => $('#top').classList.toggle('sc', scrollY > 10), { passive: true });
}

// ---------------------------------------------------------------- hero + lokal + Google ocena
function openState(loc, now = new Date()) {
  const wd = (now.getDay() + 6) % 7, h = now.getHours() + now.getMinutes() / 60;
  const [o, c] = loc.open[wd], prev = loc.open[(wd + 6) % 7];
  if (prev[1] > 24 && h < prev[1] - 24) return { open: true, until: prev[1] - 24 };
  if (h >= o && h < c) return { open: true, until: c % 24 };
  return { open: false, at: h < o ? o : loc.open[(wd + 1) % 7][0] };
}
const hh = n => (n === 24 || n === 0 ? '00' : String(n).padStart(2, '0')) + 'h';
const gOf = () => U.google[LOC];
const rate = r => r.toFixed(1).replace('.', L === 'en' ? '.' : ',');
function heroHTML() {
  const loc = locOf(LOC), st = openState(loc), g = gOf();
  return `<section class="hero" id="hero"><div class="ph"><img src="img/a/${loc.hero}.webp" alt="${esc(loc.name)}" fetchpriority="high"></div>
   <div class="in"><button class="gbadge" id="gBadge">${IC.g}<b class="num">${rate(g.r)}</b>${stars(g.r)}<span>${nf(g.n)} ${esc(t('reviews_s'))}<span class="lg-g"> ${esc(t('on_g'))}</span></span></button>
   <h1>${esc(L === 'en' ? U.venue.tagline_en : U.venue.tagline)}</h1>
   <div class="meta"><span class="open${st.open ? '' : ' closed'}"><i></i>${st.open ? `${t('open_until')} ${hh(st.until)}` : `${t('closed')} · ${t('opens')} ${hh(st.at)}`}</span><span>${esc(loc.addr)}</span></div>
   <div class="locsw" role="group" aria-label="Lokal">${U.locs.map(l => `<button data-loc="${l.id}" aria-pressed="${l.id === LOC}">${esc(l.short)}</button>`).join('')}</div>
   <div class="acts"><a class="btn btn-m" href="rezervacije/?lokal=${LOC}${L === 'en' ? '&lang=en' : ''}">${IC.cal}${esc(t('reserve'))}</a><a class="btn btn-o" href="tel:${loc.phone.replace(/\s/g, '')}">${IC.phone}${esc(loc.phone)}</a></div></div></section>`;
}
function bindHero() {
  $$('#hero .locsw button').forEach(b => b.onclick = () => { LOC = b.dataset.loc; LS.set('loc', LOC); const y = scrollY; renderMain(); scrollTo(0, y); hit('loc', LOC); });
  $('#gBadge').onclick = () => openReviews('hero');
}

// ---------------------------------------------------------------- početni ekran
function countLabel(g) { const n = membersOf(g).length; return `${n} ${t(g.cats[0] === 'kolaci' ? 'c_kolaci' : g.cats[0] === 'torte' ? 'c_torte' : g.sec === 'pice' ? 'c_pice' : 'c_hrana')}`; }
function tileImg(g) {
  const [k, v] = g.tile.split(':');
  if (k === 'f') return `<img src="${img(v, 1)}" alt="" loading="lazy">`;
  if (k === 't') return `<img src="img/t/${v}.webp" alt="" loading="lazy">`;
  if (k === 'i') return `<img class="il" src="img/i/${v}.webp" alt="" loading="lazy">`;
  if (k === 'c') return `<img class="cu" src="img/c/${v}-t.webp" alt="" loading="lazy">`;
  return `<span class="pks">${v.split(',').map((p, i) => `<img src="${packSrc(p, 1)}" alt="" loading="lazy" style="--i:${i}">`).join('')}</span>`;
}
function homeHTML() {
  const house = ITEMS.filter(i => i.sig && (photoOf(i) || i.mode === 'board')).concat(['nimfa', 'pistac-lampone', 'tiramisu'].map(id => BY[id]));
  const sec = s => GRPS.filter(g => g.sec === s).map(g => `<button class="tile${g.tile[0] === 'c' || g.tile[0] === 'p' || g.tile[0] === 'i' ? ' art' : ''}" data-g="${g.id}"><span class="ti">${tileImg(g)}</span><span class="tt"><b>${esc(nm(g))}</b><small>${countLabel(g)}</small></span></button>`).join('');
  const g = gOf();
  return heroHTML() + `
  <div class="tools"><label class="srch">${IC.search}<input id="q" type="search" placeholder="${esc(t('search_ph'))}" enterkeyhint="search" autocomplete="off" value="${esc(QRY)}"></label>
    <button class="helpme" id="helpBtn">${IC.spark}<span>${esc(t('help'))}</span></button></div>
  <nav class="jump" id="jump" aria-label="${esc(t('jump_l'))}">${[['g-hrana', 'food', 'g_hrana'], ['g-slatko', 'sweet', 'g_slatko'], ['g-pice', 'drink', 'g_pice']].map(([id, ic, k]) => `<button type="button" data-to="${id}" aria-current="false">${IC[ic]}<span>${esc(t(k))}</span></button>`).join('')}</nav>
  <section class="house"><h2>${esc(t('house'))}</h2><div class="hs">${house.map(it => `<button class="hc" data-id="${it.id}">${it.kind === 'cake' ? `<span class="cu"><img src="${cutSrc(it)}" alt="" loading="lazy"></span>` : photoOf(it) ? `<img src="${img(photoOf(it)[0], 1)}" alt="" loading="lazy">` : `<span class="cu bd"><img src="img/i/${it.id}.webp" alt="" loading="lazy"></span>`}<span class="in"><b>${esc(nm(it))}</b>${it.var ? `<span class="pr num"><small>${t('from')} </small>${nf(Math.min(...it.var.map(v => v.price)))}<small>RSD</small></span>` : money(it.price)}</span></button>`).join('')}</div></section>
  <section class="gsec" id="g-hrana"><h2>${esc(t('g_hrana'))}</h2><div class="tiles">${sec('hrana')}</div></section>
  <section class="gsec" id="g-slatko"><h2>${esc(t('g_slatko'))}</h2><div class="tiles two">${sec('slatko')}</div></section>
  <section class="gsec" id="g-pice"><h2>${esc(t('g_pice'))}</h2>${moodHTML()}<div class="tiles">${sec('pice')}</div></section>
  <section class="revc"><div class="rv-h">${IC.g}<div><b class="num">${rate(g.r)}</b>${stars(g.r)}<small>${nf(g.n)} ${esc(t('reviews'))} · ${esc(locOf(LOC).short)}</small></div></div>
    <h2>${esc(t('rev_card_t'))}</h2><p>${esc(t('rev_card_d'))}</p>${revButtons('home')}</section>`;
}
function revButtons(src) {
  const g = gOf();
  return `<div class="rv-b"><a class="rvo" href="https://search.google.com/local/writereview?placeid=${g.pid}" target="_blank" rel="noopener" data-rv="g" data-src="${src}">${IC.g}<span><b>${esc(t('rev_g'))}</b><small>${esc(t('rev_g_s'))}</small></span>${IC.ext}</a>
    <button class="rvo" data-rv="m" data-src="${src}">${IC.chat}<span><b>${esc(t('rev_m'))}</b><small>${esc(t('rev_m_s'))}</small></span>${IC.arrow}</button></div>`;
}
function bindRev(root) {
  $$('[data-rv]', root).forEach(b => b.onclick = e => { if (b.dataset.rv === 'g') { hit('grev', b.dataset.src); return; } e.preventDefault(); openReviews(b.dataset.src, true); });
}
function renderHome() {
  VIEW = 'home'; GRP = null;
  const m = $('#main'); m.className = 'home'; m.innerHTML = homeHTML() + footHTML();
  bindHero();
  $$('#main .tile').forEach(b => b.onclick = () => openGroup(b.dataset.g));
  $$('#main .hc').forEach(b => b.onclick = () => openItem(b.dataset.id));
  $('#helpBtn').onclick = openHelp;
  $$('#jump button').forEach(b => b.onclick = () => { jumpTo(b.dataset.to); hit('jump', b.dataset.to); });
  bindMood();
  jumpSpy();
  bindRev(m);
  const q = $('#q'); q.oninput = () => { QRY = q.value; if (QRY.trim().length >= 2) showSearch(); else if (VIEW === 'search') { clearSearch(); if (history.state && history.state.q) history.replaceState({}, '', location.pathname + location.search); } };
  q.onkeydown = e => { if (e.key === 'Enter') q.blur(); };
}

// ---------------------------------------------------------------- raspoloženje: koje piće vam treba
const MOODS = ['fresh', 'warm', 'sweet', 'free', 'strong', 'party'];
const MOOD_IC = { fresh: 'm_fresh', warm: 'm_warm', sweet: 'm_sweet', free: 'm_free', strong: 'm_strong', party: 'm_party' };
let MOOD = null, LASTX = null;
const vibeTxt = d => d.vibe ? d.vibe[0].join(' ') : '';
function moodScore(m, d) {
  const c = d.cat, v = vibeTxt(d), p = d.prof || [0, 0, 0, 0, 0], skip = ['sokovi', 'vode', 'energetski', 'dodaci'].includes(c);
  if (skip && m !== 'party') return 0;
  if (m === 'fresh') return ['topli', 'kafe', 'cajevi', 'viski', 'rakije', 'zestoka'].includes(c) ? 0 : p[4] * 2 + ({ osvezavajuci: 5, cedjeni: 3, hladni: 2, kokteli: 1, piva: 1, desertna: 1 }[c] || 0) + (/Osve|Sveže|Citrus|Leto|Letnje|Refresh|Fresh|Summer/.test(v) ? 3 : 0);
  if (m === 'warm') return ({ topli: 6, cajevi: 5, kafe: 3, viski: 1, rakije: 1 }[c] || 0) + (/Toplo|Zimsko|hladne|Warm|Winter/.test(v) ? 4 : 0) + (d.vibe && c === 'kafe' ? 2 : 0) + (/Courvoisier|Rémy|X\.O\.|Šljiva „18”/.test(d.sr) ? 2 : 0);
  if (m === 'sweet') return p[0] * 2 + (/Slatko|Desert|Čokolada|Kremasto|Sweet|Dessert|Chocolate|Creamy/.test(v) ? 4 : 0) + ({ topli: 3, hladni: 3 }[c] || 0) + (/Baileys|čoko|Milk shake|Frape|Sweet honey|Kupinovo|Bermet/.test(d.sr) ? 3 : 0);
  if (m === 'free') return d.str ? 0 : (d.vibe ? 4 : 0) + ({ osvezavajuci: 4, cedjeni: 3, hladni: 2, topli: 1 }[c] || 0) + (c === 'piva' ? 2 : 0);
  if (m === 'strong') return d.str >= 4 ? d.str * 2 + (d.vibe ? 4 : 0) + (c === 'kokteli' ? 1.5 : 0) + (d.abv || 40) / 20 + (/Woodford|Single Barrel|Chivas|Rémy|Šljiva „18”/.test(d.sr) ? 2 : 0) : 0;
  if (m === 'party') return (/Moët|Prosecco|Fresco/.test(d.sr) ? 7 : 0) + (/Za žurku|Za izlazak|Aperitiv|Energično|Party|Night out|Aperitivo|Energetic/.test(v) ? 4 : 0) + (c === 'kokteli' ? 2 : 0) + (/Somersby/.test(d.sr) ? 2 : 0);
  return 0;
}
function moodList(m) {
  const r = DR.map(d => ({ d, s: moodScore(m, d) })).filter(x => x.s >= 4).sort((a, b) => b.s - a.s || a.d.price - b.d.price).map(x => x.d);
  if (m !== 'strong') return r.slice(0, 8);
  // jako: naizmenično koktel pa žestina, da ima od svega
  const k = r.filter(d => d.cat === 'kokteli'), z = r.filter(d => d.cat !== 'kokteli'), o = [];
  while (o.length < 8 && (k.length || z.length)) { if (k.length) o.push(k.shift()); if (z.length && o.length < 8) o.push(z.shift()); }
  return o;
}
function moodCard(d) {
  const art = d.img ? `<img src="${img(d.img, 1)}" alt="" loading="lazy">` : d.pack ? `<img class="pk" src="${packSrc(d.pack)}" alt="" loading="lazy">` : glassSVG(d);
  const sub = d.vibe ? d.vibe[L === 'en' ? 1 : 0][0] : isAlc(d) ? lvlTxt(d) : nm(U.dcats.find(c => c.id === d.cat) || {});
  return `<button class="mc" data-id="${d.id}"><span class="im${d.img ? '' : d.pack ? ' pk' : ' gl'}">${art}</span><span class="tx"><b>${esc(nm(d))}</b><small>${esc(sub)}</small><em>${isAlc(d) ? meter(d.str) : ''}${d.kcal != null ? esc(kcTxt(d)) : ''}</em></span>${money(d.price)}</button>`;
}
function moodHTML() {
  return `<div class="mood" id="mood"><p class="mood-q">${esc(t('mood_q'))}</p><div class="mood-ch">${MOODS.map(m => `<button type="button" data-m="${m}" aria-pressed="${MOOD === m}">${IC[MOOD_IC[m]]}<span>${esc(t('moods')[m])}</span></button>`).join('')}<button type="button" class="mx" id="moodX">${IC.dice}<span>${esc(t('surprise'))}</span></button></div><div class="mood-r" id="moodR"${MOOD ? '' : ' hidden'}>${MOOD ? moodList(MOOD).map(moodCard).join('') : ''}</div></div>`;
}
function bindMood() {
  const box = $('#mood'); if (!box) return;
  const bindCards = () => $$('#moodR .mc').forEach(b => b.onclick = () => openItem(b.dataset.id));
  $$('.mood-ch button[data-m]', box).forEach(b => b.onclick = () => {
    MOOD = MOOD === b.dataset.m ? null : b.dataset.m;
    $$('.mood-ch button[data-m]', box).forEach(x => x.setAttribute('aria-pressed', x.dataset.m === MOOD));
    const r = $('#moodR'); r.hidden = !MOOD; r.innerHTML = MOOD ? moodList(MOOD).map(moodCard).join('') : ''; r.scrollLeft = 0; bindCards();
    if (MOOD) { r.classList.remove('in'); void r.offsetWidth; r.classList.add('in'); hit('mood', MOOD); }
  });
  $('#moodX').onclick = () => {
    const pool = DR.filter(d => (d.vibe || d.cat === 'kokteli') && d.id !== LASTX);
    const d = pool[Math.floor(Math.random() * pool.length)]; LASTX = d.id; hit('mood', 'surprise'); openItem(d.id);
  };
  bindCards();
}

// ---------------------------------------------------------------- Instagram story: slika 1080×1920 za podelu
const loadImg = src => new Promise((res, rej) => { const im = new Image(); im.decoding = 'async'; im.onload = () => res(im); im.onerror = rej; im.src = src; });
function storySrc(it) {
  const ph = photoOf(it);
  if (it.kind === 'drink') {
    if (it.img) return { url: img(it.img), fit: 'cover' };
    if (it.pack) return { url: packSrc(it.pack), fit: 'contain' };
    const sv = glassSVG(it), vb = vbS(it).split(' ').map(Number), k = 1400 / vb[3];
    return { url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sv.replace('<svg ', `<svg width="${Math.round(vb[2] * k)}" height="1400" `)), fit: 'contain' };
  }
  if (it.kind === 'cake') return { url: cutSrc(it), fit: 'contain' };
  if (ph) return { url: img(ph[0]), fit: 'cover' };
  return { url: `img/i/${it.id}.webp`, fit: 'contain' };
}
function rrect(x, X, Y, w, h, r) { if (x.roundRect) return x.roundRect(X, Y, w, h, r); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
function wrapTxt(x, s, maxW) { const w = s.split(' '), out = []; let ln = ''; w.forEach(p => { const tryL = ln ? ln + ' ' + p : p; if (x.measureText(tryL).width > maxW && ln) { out.push(ln); ln = p; } else ln = tryL; }); if (ln) out.push(ln); return out; }
async function storyBlob(it) {
  try { await Promise.all([document.fonts.load('400 100px Gloock'), document.fonts.load('600 34px Rubik'), document.fonts.load('400 34px Rubik')]); } catch (e) { }
  // Instagram prekriva gornjih ~250 i donjih ~300 px storija svojim dugmićima, pa sve važno stoji između
  const W = 1080, H = 1920, PAD = 96, maxW = W - PAD * 2, FOOT = H - 318, NOC = '#0a1416';
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d');
  const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#162b2f'); bg.addColorStop(.6, '#0d1a1c'); bg.addColorStop(1, NOC); x.fillStyle = bg; x.fillRect(0, 0, W, H);
  // tekst: prvo izmeri, crta se posle slike
  const en = L === 'en';
  let desc = it.kind === 'drink' ? (it.opis ? it.opis[en ? 1 : 0] : it.note) : it.kind === 'cake' ? (en ? it.desc_en : it.desc) : descOf(it);
  desc = desc ? desc.split(/(?<=[.!?])\s/)[0] : ''; if (desc) desc = desc[0].toUpperCase() + desc.slice(1);
  x.font = '400 38px Rubik'; const dl = desc ? wrapTxt(x, desc, maxW).slice(0, 3) : [];
  let nf2 = 112; x.font = `400 ${nf2}px Gloock`; let nl = wrapTxt(x, nm(it), maxW); if (nl.length > 2) { nf2 = 88; x.font = `400 ${nf2}px Gloock`; nl = wrapTxt(x, nm(it), maxW).slice(0, 3); }
  const tags = it.kind === 'drink' && it.vibe ? it.vibe[en ? 1 : 0] : it.sig ? [t('sig')] : [];
  const DL = 54, NL = nf2 * 1.04;
  let y = FOOT - 74; const yD = y - (dl.length - 1) * DL; y = yD - (dl.length ? 64 : 10); const yN = y - (nl.length - 1) * NL; y = yN - nf2 * .9 - 26; const yT = y; const top = tags.length ? yT - 64 : yN - nf2;
  // slika
  const src = storySrc(it);
  try {
    const im = await loadImg(src.url), iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height;
    if (src.fit === 'cover') {
      const RH = top + 200, k = Math.max(W / iw, RH / ih), dw = iw * k, dh = ih * k; x.drawImage(im, (W - dw) / 2, (RH - dh) / 2, dw, dh);
      const g = x.createLinearGradient(0, top - 460, 0, top + 170); g.addColorStop(0, 'rgba(10,20,22,0)'); g.addColorStop(.55, 'rgba(10,20,22,.72)'); g.addColorStop(1, NOC); x.fillStyle = g; x.fillRect(0, top - 460, W, 630); x.fillStyle = NOC; x.fillRect(0, top + 168, W, H);
    } else {
      const aT = 310, aB = top - 70, aH = aB - aT, cy = aT + aH / 2;
      const glow = x.createRadialGradient(W / 2, cy + aH * .12, 30, W / 2, cy, aH * .62); glow.addColorStop(0, 'rgba(207,166,112,.30)'); glow.addColorStop(1, 'rgba(207,166,112,0)'); x.fillStyle = glow; x.fillRect(0, aT - 200, W, aH + 400);
      const k = Math.min((W - 220) / iw, aH / ih), dw = iw * k, dh = ih * k;
      x.save(); x.shadowColor = 'rgba(0,0,0,.5)'; x.shadowBlur = 56; x.shadowOffsetY = 30; x.drawImage(im, (W - dw) / 2, aB - dh - (aH - dh) * .35, dw, dh); x.restore();
    }
  } catch (e) { }
  // vrh: blago zatamnjenje, da se Instagramovo ime profila čita i preko svetle fotografije
  const tg = x.createLinearGradient(0, 0, 0, 380); tg.addColorStop(0, 'rgba(10,20,22,.55)'); tg.addColorStop(1, 'rgba(10,20,22,0)'); x.fillStyle = tg; x.fillRect(0, 0, W, 380);
  // tekst
  x.textBaseline = 'alphabetic';
  if (tags.length) { x.font = '600 30px Rubik'; let tx = PAD; tags.forEach(tg2 => { const w = x.measureText(tg2).width + 44; if (tx + w > W - PAD) return; x.fillStyle = 'rgba(207,166,112,.16)'; x.strokeStyle = 'rgba(207,166,112,.6)'; x.lineWidth = 2; x.beginPath(); rrect(x, tx, yT - 40, w, 56, 28); x.fill(); x.stroke(); x.fillStyle = '#E6C899'; x.fillText(tg2, tx + 22, yT - 1); tx += w + 12; }); }
  x.font = `400 ${nf2}px Gloock`; x.fillStyle = '#F1EADF'; nl.forEach((l, i) => x.fillText(l, PAD - 4, yN + i * NL));
  x.font = '400 38px Rubik'; x.fillStyle = 'rgba(241,234,223,.84)'; dl.forEach((l, i) => x.fillText(l, PAD, yD + i * DL));
  x.fillStyle = 'rgba(241,234,223,.16)'; x.fillRect(PAD, FOOT - 62, maxW, 2);
  x.font = '600 34px Rubik'; x.fillStyle = '#CFA670'; x.fillText(`@${U.venue.instagram}`, PAD, FOOT);
  // logo dole desno, uvek na tamnom, nikad preko fotografije
  try { const lg = await loadImg('img/logo.webp'), lh = 66, lw = lg.naturalWidth * lh / lg.naturalHeight; x.drawImage(lg, W - PAD - lw, FOOT - 12 - lh / 2, lw, lh); }
  catch (e) { x.font = '400 32px Rubik'; x.fillStyle = 'rgba(241,234,223,.62)'; const loc = `${U.venue.name}, ${U.venue.city}`; x.fillText(loc, W - PAD - x.measureText(loc).width, FOOT); }
  return new Promise(res => cv.toBlob(b => res(b), 'image/jpeg', .92));
}
async function openStory(it) {
  let el = $('#story'); if (!el) { el = document.createElement('div'); el.id = 'story'; el.className = 'story'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); document.body.appendChild(el); }
  el.innerHTML = `<div class="st-in"><button class="st-x" id="stX" aria-label="${esc(t('close'))}">${IC.x}</button><h3>${esc(t('st_t'))}</h3><div class="st-pv"><span class="st-w">${esc(t('st_wait'))}</span></div><div class="st-a"></div><p class="st-n">${esc(t('st_note').replace('{ig}', U.venue.instagram))}</p></div>`;
  void el.offsetWidth; el.classList.add('on');
  const onKey = e => { if (e.key === 'Escape') { e.preventDefault(); close(); } };
  const close = () => { document.removeEventListener('keydown', onKey); el.classList.remove('on'); setTimeout(() => { if (!el.classList.contains('on')) el.innerHTML = ''; }, 400); const sb = $('#stBtn'); if (sb) sb.focus({ preventScroll: true }); };
  $('#stX').onclick = close; el.onclick = e => { if (e.target === el) close(); }; document.addEventListener('keydown', onKey); $('#stX').focus({ preventScroll: true });
  hit('story', it.id);
  const blob = await storyBlob(it); if (!blob || !el.classList.contains('on')) return;
  const url = URL.createObjectURL(blob), fn = `ultra-caffe-${(it.id || 'meni').replace(/[^a-z0-9-]/gi, '')}.jpg`, file = new File([blob], fn, { type: 'image/jpeg' });
  $('.st-pv', el).innerHTML = `<img src="${url}" alt="${esc(nm(it))}">`;
  const canShare = navigator.canShare && navigator.canShare({ files: [file] });
  $('.st-a', el).innerHTML = `${canShare ? `<button class="btn btn-m" id="stShare">${IC.share}${esc(t('st_share'))}</button>` : ''}<a class="btn ${canShare ? 'btn-o' : 'btn-m'}" id="stSave" href="${url}" download="${fn}">${IC.dl}${esc(t('st_save'))}</a>`;
  const sh = $('#stShare'); if (sh) sh.onclick = async () => { try { await navigator.share({ files: [file] }); } catch (e) { } };
  $('#stSave').onclick = () => setTimeout(() => toastMsg(t('st_saved')), 300);
}
function toastMsg(m) { const el = $('#toast'); if (!el) return; el.innerHTML = `${IC.dl}<span>${esc(m)}</span>`; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 3400); }

// ---------------------------------------------------------------- brzi skok: Hrana · Slatko · Piće
let JMP = 0, JTO = null;
const jumpOff = () => ($('#top') ? $('#top').offsetHeight : 58) + ($('#jump') ? $('#jump').offsetHeight : 0) + 8;
function setJump(id) { $$('#jump button').forEach(b => b.setAttribute('aria-current', b.dataset.to === id ? 'true' : 'false')); }
function jumpTo(id) {
  const el = document.getElementById(id); if (!el) return;
  const y0 = scrollY, y1 = Math.max(0, Math.round(el.getBoundingClientRect().top + scrollY - jumpOff())), d = y1 - y0;
  setJump(id); JTO = id; cancelAnimationFrame(JMP);
  if (reduced || Math.abs(d) < 4) { scrollTo(0, y1); JTO = null; return; }
  const T = Math.min(620, 260 + Math.abs(d) * .1), t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / T), e = 1 - Math.pow(1 - k, 3); scrollTo(0, y0 + d * e); if (k < 1) JMP = requestAnimationFrame(step); else { JTO = null; jumpSpy(); } };
  JMP = requestAnimationFrame(step);
}
function jumpSpy() {
  const j = $('#jump'); if (!j || VIEW !== 'home') return;
  const th = $('#top') ? $('#top').offsetHeight : 58;
  j.classList.toggle('stuck', j.getBoundingClientRect().top <= th + 1);
  if (JTO) return;
  let act = null; const lim = jumpOff() + 30;
  ['g-hrana', 'g-slatko', 'g-pice'].forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= lim) act = id; });
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4 && act) act = 'g-pice';
  setJump(act);
}
let spyR = 0; addEventListener('scroll', () => { if (spyR) return; spyR = requestAnimationFrame(() => { spyR = 0; jumpSpy(); }); }, { passive: true });
addEventListener('wheel', () => { if (JTO) { cancelAnimationFrame(JMP); JTO = null; } }, { passive: true });
addEventListener('touchstart', () => { if (JTO) { cancelAnimationFrame(JMP); JTO = null; } }, { passive: true });

// ---------------------------------------------------------------- grupa (jedna kategorija menija)
function rowHTML(it) {
  return `<li><button class="row" data-id="${it.id}">${thumbHTML(it)}<span class="tx"><b>${esc(nm(it))}</b>${descOf(it) ? `<small>${esc(descOf(it))}</small>` : ''}<span class="tg">${tagHTML(it)}</span></span>${it.var ? `<span class="pr num"><small>${t('from')} </small>${nf(Math.min(...it.var.map(v => v.price)))}<small>RSD</small></span>` : money(it.price)}</button></li>`;
}
// jačina pića: 5 crtica, nivo i okvirni % alkohola
const isAlc = d => d.str > 0;
const ALC_CTX = ['piva', 'kokteli'];
const meter = (n, cls = '') => `<i class="smt${cls}" aria-hidden="true">${[1, 2, 3, 4, 5].map(k => `<s class="${k <= n ? 'on' : ''}"></s>`).join('')}</i>`;
const lvlTxt = d => t('lvl')[d.str || 0];
const abvTxt = d => d.abv ? `≈ ${String(d.abv).replace('.', L === 'en' ? '.' : ',')} %` : '';
const kcTxt = d => d.kcal != null ? `${d.kcal >= 20 ? '≈ ' : ''}${nf(d.kcal)} kcal` : '';
function drinkMeta(d) {
  if (isAlc(d)) return `<em class="dm">${meter(d.str)}${esc(lvlTxt(d))}${d.kcal != null ? ` · ${esc(kcTxt(d))}${d.kper ? ' ' + esc(t('per_g125')) : ''}` : ''}</em>`;
  if (d.vibe) return `<em class="dm">${esc(d.vibe[L === 'en' ? 1 : 0][0])}${d.kcal != null ? ` · ${esc(kcTxt(d))}` : ''}</em>`;
  return '';
}
function drinkRow(d) {
  return `<li><button class="drow" data-id="${d.id}">${drinkLead(d)}<span class="tx"><b>${esc(nm(d))}</b>${d.note ? `<small>${esc(d.note)}</small>` : ''}${drinkMeta(d)}</span>${money(d.price)}</button></li>`;
}
const kcHTML = k => `<button class="kc" data-id="${k.id}"><span class="tg">${(k.tags || []).filter(x => x === 'novo' || x === 'posno').map(x => `<span class="tag ${x}">${t(x)}</span>`).join('')}</span><span class="cu"><img src="${cutSrc(k, 1)}" alt="" loading="lazy"></span><b>${esc(nm(k))}</b>${money(k.price)}${k.unit === 'kg' ? `<small class="pk">${t('per_kg')}</small>` : ''}</button>`;
function groupHTML(g) {
  let h = '', chips = [];
  if (g.cats[0] === 'kolaci') h = `<p class="gv-lead">${esc(t('vitrina_lead'))}</p><div class="vit">${KOL.map(kcHTML).join('')}</div>`;
  else if (g.cats[0] === 'torte') h = `<p class="gv-lead">${esc(t('torte_lead'))}</p><div class="tgal">${U.torte_gal.map(x => `<figure><img src="img/t/${x}.webp" alt="" loading="lazy"></figure>`).join('')}</div>
      <div class="tlist">${U.torte.map(x => `<div><b>${esc(x.sr)}</b>${money(x.price)}<small>${t('per_kg')}</small></div>`).join('')}</div>
      <div class="tcta"><button class="btn btn-m" id="cakeBtn">${IC.cal}${esc(t('order_cake'))}</button><a class="btn btn-o" href="tel:${U.venue.torte_phone.replace(/\s/g, '')}">${IC.phone}${esc(t('call_shop'))} · ${esc(U.venue.torte_phone)}</a></div>`;
  else if (g.sec === 'pice') g.cats.forEach(c => { const cat = U.dcats.find(x => x.id === c), ds = DR.filter(d => d.cat === c); if (!ds.length) return; chips.push([c, nm(cat)]);
      h += `<section class="cat" id="c-${c}"><header class="cat-h"><h2>${esc(nm(cat))}</h2></header><ul class="rows two">${ds.map(drinkRow).join('')}</ul></section>`; });
  else g.cats.forEach(c => { const cat = U.cats.find(x => x.id === c), its = ITEMS.filter(i => i.cat === c); if (!its.length) return; chips.push([c, nm(cat)]);
      const note = L === 'en' ? cat.note_en : cat.note;
      h += `<section class="cat" id="c-${c}"><header class="cat-h">${g.cats.length > 1 ? `<h2>${esc(nm(cat))}</h2>` : ''}${note ? `<p>${esc(note)}</p>` : ''}</header><ul class="rows two">${its.map(rowHTML).join('')}</ul></section>`; });
  return { h, chips };
}
function openGroup(id, push = true) {
  const g = grpOf(id); if (!g) return;
  if (VIEW === 'home') homeY = scrollY;
  VIEW = 'group'; GRP = id;
  if (push) history.pushState({ g: id }, '', '#g=' + id);
  const { h, chips } = groupHTML(g), m = $('#main'); m.className = 'group';
  m.innerHTML = `<div class="gv-h" id="gvh"><button class="rb back" id="gBack" aria-label="${esc(t('back'))}">${IC.back}</button><div class="gv-t"><small>${esc(t('g_' + g.sec))}</small><h1>${esc(nm(g))}</h1></div><span class="cnt num">${membersOf(g).length}</span>
    ${chips.length > 1 ? `<nav class="rail" id="rail">${chips.map(([c, n]) => `<button class="chip" data-c="${c}">${esc(n)}</button>`).join('')}</nav>` : ''}</div>
    <div class="gv">${h}</div>` + footHTML();
  scrollTo(0, 0);
  $('#gBack').onclick = () => history.back();
  $$('#main [data-id]').forEach(b => b.onclick = () => openItem(b.dataset.id));
  $$('#rail .chip').forEach(b => b.onclick = () => { const el = $('#c-' + b.dataset.c); scrollTo({ top: el.getBoundingClientRect().top + scrollY - $('#top').offsetHeight - $('#gvh').offsetHeight + 4, behavior: reduced ? 'auto' : 'smooth' }); });
  const cb = $('#cakeBtn'); if (cb) cb.onclick = openCakeForm;
  lazyArt(); spy(); hit('sec', id);
}
function goHome() { if (history.state && (history.state.g || history.state.q)) history.back(); else { renderHome(); scrollTo(0, 0); } }

// ---------------------------------------------------------------- pretraga
const fold = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'dj');
function showSearch() {
  const q = fold(QRY.trim()); VIEW = 'search';
  const words = q.split(/\s+/).filter(Boolean);
  const hay = it => fold([it.sr, it.en, it.desc, it.desc_en, it.note, (it.comps || []).map(c => c.sr + ' ' + c.en).join(' ')].join(' '));
  const match = it => words.every(w => hay(it).includes(w));
  const fs = ITEMS.filter(match), ks = KOL.filter(match), ds = DR.filter(match);
  let res = $('#res');
  if (!res) { const tl = $('.tools'); tl.insertAdjacentHTML('afterend', '<div id="res" class="res"></div>'); res = $('#res'); $$('#main > section').forEach(s => s.hidden = true); const f = $('#foot'); if (f) f.hidden = true; scrollTo(0, 0); }
  const n = fs.length + ks.length + ds.length;
  res.innerHTML = `<h2>${esc(t('results'))} <small class="num">${n}</small></h2>` + (n ? (fs.length ? `<ul class="rows two">${fs.map(rowHTML).join('')}</ul>` : '') + (ks.length ? `<div class="vit sm">${ks.map(kcHTML).join('')}</div>` : '') + (ds.length ? `<ul class="rows two">${ds.map(drinkRow).join('')}</ul>` : '') : `<p class="empty">${esc(t('no_res'))}</p>`);
  $$('#res [data-id]').forEach(b => b.onclick = () => openItem(b.dataset.id));
  if (!history.state || !history.state.q) history.pushState({ q: 1 }, '', location.pathname + location.search);
  lazyArt();
}

function clearSearch() { VIEW = 'home'; const r = $('#res'); if (r) r.remove(); $$('#main > section').forEach(s => s.hidden = false); const f = $('#foot'); if (f) f.hidden = false; }
function footHTML() {
  return `<footer class="foot" id="foot">${U.locs.map(l => `<div><h3>${esc(l.name)}</h3><div>${esc(l.addr)}, ${esc(l.city)}</div><div><a href="tel:${l.phone.replace(/\s/g, '')}">${esc(l.phone)}</a></div><dl>${l.hours.map(h => `<dt>${esc(h[0])}</dt><dd>${esc(h[1])}</dd>`).join('')}</dl></div>`).join('')}
    <div><h3>Ultra Caffe</h3><div>${esc(U.venue.since_note)}.</div><div>Instagram <a href="https://www.instagram.com/${U.venue.instagram}/" rel="noopener" target="_blank">@${U.venue.instagram}</a></div><p class="tt"><b>${esc(t('demo_t'))}.</b> ${esc(t('footer_note'))}</p></div></footer>`;
}
// lenje ilustracije (rezervna varijanta ako slika nije pripremljena)
let artIO;
function lazyArt() {
  if (artIO) artIO.disconnect();
  artIO = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const el = e.target; el.innerHTML = K.top(el.dataset.art, 1); artIO.unobserve(el); }), { rootMargin: '300px' });
  setTimeout(() => $$('.th[data-art]').forEach(el => artIO.observe(el)), 400);
}
let spyIO;
function spy() {
  if (spyIO) spyIO.disconnect();
  const chips = $$('#rail .chip'); if (!chips.length) return;
  spyIO = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { const id = e.target.id.slice(2); chips.forEach(c => c.classList.toggle('on', c.dataset.c === id)); const on = chips.find(c => c.dataset.c === id); if (on) { const r = $('#rail'); r.scrollTo({ left: on.offsetLeft - r.clientWidth / 2 + on.offsetWidth / 2, behavior: reduced ? 'auto' : 'smooth' }); } } });
  }, { rootMargin: '-38% 0px -58% 0px' });
  $$('#main .cat').forEach(s => spyIO.observe(s));
}
function renderMain() { if (VIEW === 'group' && GRP) openGroup(GRP, false); else { renderHome(); if (VIEW === 'search' || QRY.trim().length >= 2) showSearch(); } }

// ---------------------------------------------------------------- list jela / pića / kolača
let CUR = null, VAR = 0, QTY = 1, XR = null, GAL = 0;
const curComps = it => (it.var ? it.var[VAR].comps : it.comps) || [];
const curNut = it => (it.var ? it.var[VAR].nut : it.nut);
const curAl = it => (it.var ? it.var[VAR].al : it.al) || [];
const curPrice = it => (it.var ? it.var[VAR].price : it.price);
const cnm = c => (L === 'en' ? c.en : c.sr);
function openItem(id, push = true) {
  const it = BY[id]; if (!it) return;
  CUR = it; VAR = 0; QTY = 1; GAL = 0; XR = null;
  const sh = $('#dish'); sh.innerHTML = dishHTML(it); sh.dataset.kind = it.kind; bindDish(it);
  sh.classList.add('on'); $('#scrim').classList.add('on'); document.body.classList.add('lock');
  if (push) history.pushState({ dish: id, g: (history.state || {}).g }, '', '#' + encodeURIComponent(id));
  hit('view', it.id);
  autoSplit(it);
}
// čim se otvori, jelo/piće se samo rastavi (gost ne mora da traži dugme)
let autoT;
function autoSplit(it, wait = 700, make = true) {
  clearTimeout(autoT); if (!canSplit(it)) return;
  autoT = setTimeout(() => {
    if (CUR !== it || !$('#st') || $('#st').classList.contains('open')) return;
    const im = $('#ph img'), go = () => { if (CUR === it && !$('#st').classList.contains('open')) openX(it, make); };
    if (im && !im.complete) { let done = false; const f = () => { if (!done) { done = true; go(); } }; im.addEventListener('load', f, { once: true }); im.addEventListener('error', f, { once: true }); setTimeout(f, 1600); } else go();
  }, reduced ? 50 : wait);
}
function closeItem() { clearTimeout(autoT); MK = 0; const sh = $('#dish'); sh.classList.remove('on'); $('#scrim').classList.remove('on'); document.body.classList.remove('lock'); CUR = null; XR = null; setTimeout(() => { if (!sh.classList.contains('on')) sh.innerHTML = ''; }, 600); }
addEventListener('popstate', e => {
  const s = e.state || {};
  if ($('#dish').classList.contains('on') && !s.dish) { closeItem(); return; }
  if (s.dish) { openItem(s.dish, false); return; }
  if ($('#cart').classList.contains('on')) closeCart();
  if (s.g) { if (VIEW !== 'group' || GRP !== s.g) openGroup(s.g, false); return; }
  if (VIEW === 'search' && !s.q) { QRY = ''; const q = $('#q'); if (q) q.value = ''; clearSearch(); return; }
  if (VIEW !== 'home') { renderHome(); requestAnimationFrame(() => scrollTo(0, homeY)); }
});

function stageHero(it) {
  if (it.kind === 'drink') {
    if (it.pack && it.img && !it.split) return { cls: 'pack hasbg', html: `<img class="pk-bgp" src="${img(it.img)}" alt="">` + packStage(it) };
    const ph = photoOf(it); if (ph) return { cls: '', html: `<img src="${img(ph[0])}" alt="">`, gal: ph };   // njihova fotografija je naslovna
    if (it.pack) return { cls: 'pack', html: packStage(it) };
    return { cls: 'ill glass', html: glassSVG(it) };
  }
  if (it.kind === 'cake') {
    if (it.mode === 'pops') return { cls: 'ill pops', html: popsSVG(it) };
    return { cls: 'cut', html: `<img src="${cutSrc(it)}" alt="">` };
  }
  const ph = photoOf(it);
  if (ph) return { cls: '', html: `<img src="${img(ph[GAL] || ph[0])}" alt="">`, gal: ph };
  if (it.mode === 'pizza' || it.mode === 'stack') return { cls: 'ill', html: '', illus: true };
  if (it.mode === 'board') return { cls: 'ill board', html: boardArt(it, 420, 360) };
  return { cls: 'ill', html: plateArt(it, curComps(it)) };
}
function packStage(d) {
  const glass = d.layers ? `<span class="pk-g v-${d.glass}">${glassSVG(d)}</span>` : '';
  return `<div class="pk-s${glass ? ' wg' : ''}"><span class="pk-b"><img src="${packSrc(d.pack)}" alt="${esc(d.sr)}"></span>${glass}<i class="pk-f"></i></div>`;
}
const canSplit = it => it.kind === 'drink' ? !!it.split : it.kind === 'cake' ? (it.mode !== 'none' && curComps(it).length > 0) : (it.mode && it.mode !== 'none' && curComps(it).length > 0);
function splitLabel(it) { return it.kind === 'drink' ? t('split_d') : it.kind === 'cake' ? (it.mode === 'halves' || it.mode === 'pops' ? t('cut_k') : t('split_k')) : t('split'); }
function dishHTML(it) {
  const hero = stageHero(it), cs = canSplit(it);
  const gal = hero.gal && hero.gal.length > 1 ? `<div class="gal">${hero.gal.map((g, i) => `<button data-g="${i}" aria-pressed="${i === 0}" aria-label="${t('photo')} ${i + 1}"></button>`).join('')}</div>` : '';
  const ico = it.kind === 'drink' ? IC.burst : it.mode === 'halves' || it.mode === 'pops' ? IC.knife : IC.split;
  return `<div class="bar"><button class="rb" id="xClose" aria-label="${esc(t('close'))}">${IC.x}</button></div>
  <div class="scroll"><div class="stage" id="st"><div class="ph ${hero.cls}" id="ph">${hero.html}</div><div class="xr" id="xr"></div>${gal}
    ${cs ? `<button class="split" id="splitBtn" aria-pressed="false">${ico}<span>${esc(splitLabel(it))}</span></button>` : ''}</div>
  <div class="info" id="info">${infoHTML(it)}</div></div>
  <div class="buy"><div class="qty"><button id="qm" aria-label="−">−</button><b class="num" id="qn">1</b><button id="qp" aria-label="+">+</button></div><button class="btn btn-m" id="addBtn">${IC.bag}<span id="addT"></span></button></div>`;
}
function infoHTML(it) {
  const comps = curComps(it), nut = curNut(it), al = curAl(it), pr = curPrice(it);
  const tot = comps.reduce((a, c) => a + c.g, 0);
  let h = `<div class="hd"><div class="tg">${tagHTML(it)}</div><h2>${esc(nm(it))}</h2>`;
  if (it.story) h += `<div class="story">${esc(L === 'en' ? it.story_en || it.story : it.story)}</div>`;
  const d = it.kind === 'drink' ? it.note : (it.kind === 'cake' ? (L === 'en' ? it.desc_en : it.desc) : descOf(it));
  if (it.kind === 'drink' && it.vibe) h += `<div class="vibe">${it.vibe[L === 'en' ? 1 : 0].map(v => `<span>${esc(v)}</span>`).join('')}</div>`;
  if (canMake(it)) h += `<button type="button" class="mk-again" id="mkAgain">${IC.play}<span>${esc(t('mk_again'))}</span></button>`;
  if (d) h += `<div class="desc">${esc(d)}</div>`;
  if (it.kind === 'drink' && it.opis) h += `<p class="opis">${esc(it.opis[L === 'en' ? 1 : 0])}</p>`;
  h += `<div class="prrow">${it.var ? '' : `<div class="bigpr num">${nf(pr)}<small>RSD${it.unit === 'kg' ? ' · ' + t('per_kg') : ''}</small></div>`}<button type="button" class="stbtn" id="stBtn">${IC.ig}<span>${esc(t('st_btn'))}</span></button></div>`;
  h += `</div>`;
  if (it.var) h += `<div class="vars" role="radiogroup">${it.var.map((v, i) => `<button data-v="${i}" aria-pressed="${i === VAR}"><span>${esc(nm(v))}</span>${money(v.price)}</button>`).join('')}</div>`;
  if (it.kind === 'dish' || (it.kind === 'cake' && comps.length)) {
    const cat = U.cats.find(c => c.id === it.cat);
    h += `<div class="facts"><div><span>${t('prep')}</span><b class="num">${it.prep}<small>${t('minutes')}</small></b></div><div><span>${t('portion')}</span><b class="num">${nf(tot)}<small>g</small></b></div><div><span>${t('energy')}</span><b class="num">${nf(nut.kcal)}<small>kcal</small></b></div></div>`;
    if (cat && cat.until) h += `<div class="desc" style="margin-top:-12px">${t('until')} ${cat.until}${t('h')}</div>`;
    const e = nut.p * 4 + nut.c * 4 + nut.f * 9 || 1;
    h += `<div class="card"><h3>${t('nutrition')}<small>${t('per_portion')}</small></h3><div class="kcal"><b class="num">${nf(nut.kcal)}</b><span>kcal</span></div><div class="mac">
      ${[['protein', nut.p, '#9DBB68', 4], ['carbs', nut.c, '#E6C899', 4], ['fat', nut.f, '#D07A5C', 9]].map(([k, g, c, m]) => `<div><span>${t(k)}</span><i style="--w:${Math.round(g * m / e * 100)}%;--c:${c}"></i><b class="num">${g} g</b></div>`).join('')}</div></div>`;
    h += `<div class="card"><h3>${t('composition')}<small class="num">${nf(tot)} g</small></h3><ul class="comp-l">${comps.map((c, i) => `<li><span data-art="${c.a}" data-seed="${i}"></span><span>${esc(cnm(c))}${c.side ? ` <small>· ${t('side')}</small>` : ''}</span><small class="num">${c.g} g · ${c.kcal} kcal</small></li>`).join('')}</ul></div>`;
    h += `<div class="card"><h3>${t('allergens')}</h3>${al.length ? `<div class="als">${al.map(a => `<span class="al">${alIcon(a)}${esc(U.al[a] ? (L === 'en' ? U.al[a][1] : U.al[a][0]) : a)}</span>`).join('')}</div>` : `<div class="desc">${t('no_al')}</div>`}<p class="alnote">${esc(t('al_note'))}</p></div>`;
  }
  if (it.kind === 'drink') {
    const cat = U.dcats.find(c => c.id === it.cat), facts = [];
    if (isAlc(it) || ALC_CTX.includes(it.cat) || it.sr.includes('bezalkoholni')) facts.push([t('strength'), `${meter(it.str, ' big')}<b>${esc(lvlTxt(it))}</b>${it.abv ? `<small class="num">${esc(abvTxt(it))} ${esc(t('alc'))}</small>` : ''}`, 'str']);
    else if (it.size) facts.push([t('size'), esc(it.size)]);
    if (it.kcal != null) facts.push([t('energy_d'), `<b class="num">${it.kcal >= 20 ? '≈ ' : ''}${nf(it.kcal)}<small>kcal</small></b>${it.kper ? `<small>${esc(t('per_g125'))}</small>` : ''}`]);
    if (it.layers && it.glass) facts.push([t('glass_l'), esc(t('gl')[it.glass] || '')]);
    else if (it.pack) facts.push([t('served'), esc(/Red Bull|Energy|Guarana/.test(it.sr) ? t('served_can') : t('served_btl'))]);
    if (facts.length < 3) facts.push([t('kind'), esc(nm(cat))]);
    h += `<div class="facts dk dx">${facts.slice(0, 3).map(([k, v, c]) => `<div${c ? ` class="${c}"` : ''}><span>${esc(k)}</span>${/^<|^<i/.test(v) ? v : `<b>${v}</b>`}</div>`).join('')}</div>`;
    if (it.tip) h += `<div class="tipc">${it.tipb ? IC.cup : IC.shaker}<div><b>${esc(t(it.tipb ? 'tip_b' : 'tip_s'))}</b><p>${esc(it.tip[L === 'en' ? 1 : 0])}</p></div></div>`;
    if (it.prof || it.lovers) h += `<div class="card taste">${it.prof ? `<h3>${t('profile')}</h3><div class="prof">${t('pf').map((n, i) => `<div><span>${esc(n)}</span><s style="--w:${Math.round(it.prof[i] / 3 * 100)}%"></s></div>`).join('')}</div>` : ''}${it.lovers ? `<p class="lov"><b>${t('lovers')}</b>${esc(it.lovers[L === 'en' ? 1 : 0])}</p>` : ''}</div>`;
    if (it.layers && it.layers.length > 1) {
      const tot2 = it.layers.reduce((a, l) => a + l[1], 0);
      h += `<div class="card"><h3>${t('layers_cap')}<small class="num">${nf(tot2)} ml</small></h3><ul class="comp-l">${it.layers.slice().reverse().map(l => { const q = U.lq[l[0]]; return `<li><span class="orb-m" style="--c:${q[2]}">${orbIcon(l[0])}</span><span>${esc(L === 'en' ? q[1] : q[0])}</span><small class="num">${l[1]} ml</small></li>`; }).join('')}</ul></div>`;
    }
    if (it.kcal != null) h += `<p class="kcn">${esc(t('kc_note'))}${['kafe', 'topli', 'cajevi'].includes(it.cat) ? esc(t('kc_hot')) : ''}${it.kper ? `; ${esc(t('kc_glass'))}` : ''}.</p>`;
  }
  const prs = (it.pair || []).map(pairOf).filter(Boolean);
  if (prs.length) h += `<div><h3 style="font-size:22px;margin-bottom:12px">${t(it.kind === 'dish' ? 'pair' : 'pair_d')}</h3><div class="pairs">${prs.map(p => {
    let im; if (p.kind === 'cake') im = `<span class="im cut"><img src="${cutSrc(p, 1)}" alt=""></span>`; else if (p.kind === 'drink') im = `<span class="im dk">${p.img ? `<img src="${img(p.img, 1)}" alt="">` : p.pack ? `<img class="pk" src="${packSrc(p.pack, 1)}" alt="">` : glassSVG(p)}</span>`;
    else im = photoOf(p) ? `<span class="im"><img src="${img(photoOf(p)[0], 1)}" alt=""></span>` : `<span class="im"><img src="img/i/${p.id}.webp" alt=""></span>`;
    return `<button class="pc" data-id="${p.id}">${im}<b>${esc(nm(p))}</b>${money(p.price)}</button>`; }).join('')}</div></div>`;
  return h;
}
function bindDish(it) {
  const sh = $('#dish');
  $('#xClose', sh).onclick = () => history.back();
  const sb = $('#splitBtn', sh); if (sb) sb.onclick = () => toggleX(it);
  $$('.gal button', sh).forEach(b => b.onclick = () => { GAL = +b.dataset.g; const ph = photoOf(it); const im = $('#ph img'); im.style.opacity = 0; setTimeout(() => { im.src = img(ph[GAL]); im.style.opacity = 1; }, 180); $$('.gal button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  $('#qm', sh).onclick = () => { QTY = Math.max(1, QTY - 1); updAdd(it); }; $('#qp', sh).onclick = () => { QTY = Math.min(20, QTY + 1); updAdd(it); };
  $('#addBtn', sh).onclick = () => addToCart(it);
  bindInfo(it); updAdd(it); sizeStage(it);
  if (stageHero(it).illus) prepIll(it);
  if ($('#ph.hasbg')) setTimeout(() => { const p = $('#ph.hasbg'); if (p && CUR === it) p.classList.add('dig'); }, reduced ? 50 : 700);
}
function bindInfo(it) {
  $$('#info .vars button').forEach(b => b.onclick = () => { VAR = +b.dataset.v; const open = $('#st').classList.contains('open'); $('#info').innerHTML = infoHTML(it); bindInfo(it); updAdd(it); if (open) { closeX(true); setTimeout(() => openX(it), 60); } else if (!photoOf(it) && it.mode === 'plate') $('#ph').innerHTML = plateArt(it, curComps(it)); else if (stageHero(it).illus) prepIll(it); });
  $$('#info [data-art]').forEach(el => { el.innerHTML = K.top(el.dataset.art, +el.dataset.seed).replace('<svg ', '<svg width="34" height="34" '); });
  const sb = $('#stBtn'); if (sb) sb.onclick = () => openStory(it);
  const ma = $('#mkAgain'); if (ma) ma.onclick = () => { const sc = $('#dish .scroll'); if (sc) sc.scrollTo({ top: 0, behavior: 'smooth' }); clearTimeout(autoT); closeX(true); setTimeout(() => { if (CUR === it) openX(it, true); }, 120); };
  $$('#info .pc').forEach(b => b.onclick = () => { history.replaceState({ dish: b.dataset.id, g: (history.state || {}).g }, '', '#' + encodeURIComponent(b.dataset.id)); openItem(b.dataset.id, false); hit('pair', b.dataset.id); });
}
function updAdd(it) { $('#qn').textContent = QTY; $('#addT').textContent = `${t('add')} · ${nf(curPrice(it) * QTY)} RSD`; }
const isDesk = () => innerWidth >= 1100;
function sizeStage(it) {
  const st = $('#st'); if (!st || isDesk()) return;
  const W = st.clientWidth || innerWidth; st.style.height = Math.round(Math.min(innerHeight * .66, W * 1.18)) + 'px'; st._h0 = st.offsetHeight;
}

// ---------------------------------------------------------------- RASTAVI: zajedničko
function lab(c, x, y, w, extra) {
  return `<div class="lb" style="left:${f1(x)}px;top:${f1(y)}px;width:${f1(w)}px;--gc:${c.col || GC[c.grp] || '#CFA670'}"><b>${esc(c.name || cnm(c))}</b><small class="num">${extra || `${c.g} g · ${c.kcal} kcal${c.side ? ' · ' + t('side') : ''}`}</small></div>`;
}
function placeLabels(lbs, want, gap = 6) {
  const hs = lbs.map(e => e.offsetHeight || 34), tops = []; let prev = -1e9;
  want.forEach((w, i) => { const tp = Math.max(w - Math.min(hs[i] / 2, 18), prev + gap); tops.push(tp); prev = tp + hs[i]; });
  return { tops, anchors: tops.map((tp, i) => tp + Math.min(hs[i] / 2, 18)), bottom: prev };
}
// oznake desno, poređane po visini; vraća {tops, anchors, bottom} u istom redosledu kao ulaz
function labelsRight(xr, items, wantY, lx, lw, extra) {
  xr.insertAdjacentHTML('beforeend', `<div class="lbtmp">${items.map(c => lab(c, lx, 0, lw, extra && extra(c))).join('')}</div>`);
  const tmp = $$('.lbtmp .lb', xr), ord = wantY.map((y, i) => i).sort((a, b) => wantY[a] - wantY[b]);
  const P = placeLabels(ord.map(i => tmp[i]), ord.map(i => wantY[i]));
  const tops = [], anchors = []; ord.forEach((i, j) => { tops[i] = P.tops[j]; anchors[i] = P.anchors[j]; });
  $('.lbtmp', xr).remove();
  return { tops, anchors, bottom: P.bottom };
}
const leader = (x1, y1, lx, y2) => `<path d="M${f1(x1)} ${f1(y1)}C${f1(lx - 14)} ${f1(y1)} ${f1(lx - 18)} ${f1(y2)} ${f1(lx - 5)} ${f1(y2)}"/><circle cx="${f1(x1)}" cy="${f1(y1)}" r="2.6"/>`;
const totLine = (it, y) => `<div class="xr-tot" style="top:${f1(y)}px">≈ <b class="num">${nf(curNut(it).kcal)} kcal</b> · ${t('est')}</div>`;
function phRect() { const st = $('#st'), ph = $('#ph'), sr = st.getBoundingClientRect(), b = ph.getBoundingClientRect(); const im = $('img', ph), sv = $(':scope > svg', ph);
  let w = b.width, h = b.height, x = b.left - sr.left, y = b.top - sr.top + st.scrollTop;
  const el = im || sv; if (el) { const r = el.getBoundingClientRect(); if (im && im.naturalWidth && getComputedStyle(im).objectFit === 'contain') { const cs = getComputedStyle(im), pl = parseFloat(cs.paddingLeft) || 0, pt = parseFloat(cs.paddingTop) || 0, pr = parseFloat(cs.paddingRight) || 0, pb = parseFloat(cs.paddingBottom) || 0, bw = r.width - pl - pr, bh = r.height - pt - pb; const k = Math.min(bw / im.naturalWidth, bh / im.naturalHeight); w = im.naturalWidth * k; h = im.naturalHeight * k; x = r.left - sr.left + pl + (bw - w) / 2; y = r.top - sr.top + st.scrollTop + pt + (bh - h) / 2; } else { w = r.width; h = r.height; x = r.left - sr.left; y = r.top - sr.top + st.scrollTop; } }
  return { x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
}
function toggleX(it) { const st = $('#st'); if (st.classList.contains('open')) closeX(); else { openX(it); hit('split', it.id); } }
function openX(it, make) {
  const st = $('#st'), xr = $('#xr'), btn = $('#splitBtn');
  if (!st._h0) st._h0 = st.offsetHeight;
  const W = st.clientWidth, comps = curComps(it), pr = phRect();
  let r;
  if (it.kind === 'drink') r = buildOrbs(xr, it, W, pr);
  else if (it.mode === 'bands') r = buildBands(xr, it, comps, W, pr);
  else if (it.mode === 'layers') r = buildLayered(xr, it, comps, W, pr);
  else if (it.mode === 'halves') r = buildHalves(xr, it, comps, W, pr);
  else if (it.mode === 'pops') r = buildPops(xr, it, comps, W, pr);
  else if (it.mode === 'pizza') r = buildPizza(xr, it, comps, W, pr);
  else if (it.mode === 'stack' || it.mode === 'cake') r = buildStack(xr, it, comps, W, pr);
  else if (it.mode === 'plate') r = buildPlate(xr, it, comps, W, pr);
  else if (it.mode === 'board') r = buildBoard(xr, it, comps, W, pr);
  else r = buildKnoll(xr, it, comps, W, pr);
  // njihova fotografija ostaje zatamnjena u pozadini, preko nje naša digitalna verzija
  const keepBg = (it.kind !== 'cake' && photoOf(it)) || (it.kind === 'cake' && (it.mode === 'layers' || it.mode === 'plate'));
  if (keepBg) r.photo = { tf: it.kind === 'cake' ? 'scale(1.18)' : 'scale(1.06)', op: it.kind === 'cake' ? .2 : .2 };
  st.classList.toggle('bgp', !!keepBg);
  XR = r; const ph0 = $('#ph'); ph0.style.height = ph0.offsetHeight + 'px'; xr.style.transform = ''; st.classList.add('open'); st.dataset.m = r.m || ''; btn.setAttribute('aria-pressed', 'true'); $('span', btn).textContent = t('join');
  if (!isDesk()) st.style.height = Math.max(st._h0, r.H) + 'px';
  const ph = $('#ph'); ph.style.transformOrigin = '0 0'; ph.style.transform = r.photo.tf || ''; ph.style.opacity = r.photo.op;
  requestAnimationFrame(() => requestAnimationFrame(() => r.play(make)));
}
function closeX(instant) {
  MK = 0;
  const st = $('#st'), btn = $('#splitBtn'), ph = $('#ph'), xr = $('#xr'); if (!st) return;
  st.classList.remove('open'); st.classList.remove('bgp'); if (btn) { btn.setAttribute('aria-pressed', 'false'); $('span', btn).textContent = CUR ? splitLabel(CUR) : t('split'); }
  if (XR && XR.back) XR.back(instant);
  const d = instant ? 0 : (XR && XR.delay) || 0;
  setTimeout(() => { ph.style.transform = ''; ph.style.opacity = ''; setTimeout(() => { if (!st.classList.contains('open')) { ph.style.transformOrigin = ''; ph.style.height = ''; } }, 820); }, d);
  if (!isDesk()) st.style.height = st._h0 + 'px';
  const keep = XR && XR.keep; XR = null;
  setTimeout(() => { if (!st.classList.contains('open')) { st.dataset.m = ''; if (keep && CUR) prepIll(CUR); else xr.innerHTML = ''; } }, instant ? 0 : 950);
}
// ilustracija bez fotografije: slojevi su već sklopljeni na pozornici
function prepIll(it) {
  const st = $('#st'), xr = $('#xr'), W = st.clientWidth; if (!W) return requestAnimationFrame(() => prepIll(it));
  const pr = { x: 0, y: 0, w: W, h: st.offsetHeight, cx: W / 2, cy: st.offsetHeight * .46 };
  const r = it.mode === 'pizza' ? buildPizza(xr, it, curComps(it), W, pr, true) : buildStack(xr, it, curComps(it), W, pr, true);
  r.still();
  if (it.mode === 'stack' || it.mode === 'cake') { xr.style.transformOrigin = `${f1(W / 2)}px ${f1(pr.cy)}px`; xr.style.transform = `scale(${isDesk() ? 1.25 : 1.34})`; }
}

// ---------- knoll: sastojci složeni u mrežu, izleću iz tanjira (plate za deljenje, doručak)
function buildKnoll(xr, it, comps, W, pr) {
  const n = comps.length, cols = W >= 520 ? 4 : 3, pad = 14, gap = 8, cw = (W - pad * 2 - gap * (cols - 1)) / cols, ch = Math.round(cw * .58 + 72);
  const top0 = 70, phH = Math.min(200, W * .44), gridY = top0 + phH + 50, rows = Math.ceil(n / cols), H = gridY + rows * (ch + gap) + 62;
  const s = Math.min(W * .56 / pr.w, phH / pr.h), cx = W / 2, cy = top0 + phH / 2;
  xr.innerHTML = `<div class="xr-cap" style="top:${f1(gridY - 36)}px">${esc(t('made_of'))}</div>` + comps.map((c, i) => `<div class="kn${c.side ? ' side' : ''}" style="--gc:${GC[c.grp] || '#CFA670'};width:${f1(cw)}px;height:${ch}px"><div class="sp">${K.top(c.a, i)}</div><b>${esc(cnm(c))}</b><small class="num">${c.g} g · ${c.kcal} kcal</small></div>`).join('') + totLine(it, H - 50);
  const cells = $$('.kn', xr), cap = $('.xr-cap', xr), tot = $('.xr-tot', xr);
  const pos = comps.map((c, i) => { const row = Math.floor(i / cols), col = i % cols, inRow = Math.min(cols, n - row * cols), off = (cols - inRow) * (cw + gap) / 2; return [pad + off + col * (cw + gap), gridY + row * (ch + gap)]; });
  const ox = pr.cx - cw / 2, oy = pr.cy - ch / 2;
  cells.forEach((el, i) => { el.style.transition = 'none'; el.style.opacity = 0; el.style.transform = `translate(${f1(ox)}px,${f1(oy)}px) scale(.3) rotate(${(i % 2 ? 1 : -1) * (12 + (i * 23) % 24)}deg)`; });
  const tx = cx - (pr.x + pr.w / 2) * s, ty = cy - (pr.y + pr.h / 2) * s;
  return {
    H, delay: 120, photo: { tf: `translate(${f1(tx)}px,${f1(ty)}px) scale(${s.toFixed(3)})`, op: 1 },
    play() { void xr.offsetWidth; const D = reduced ? 0 : 1;
      cells.forEach((el, i) => { el.style.transition = ''; el.style.transitionDelay = (D ? 160 + i * 55 : 0) + 'ms'; el.style.opacity = 1; el.style.transform = `translate(${f1(pos[i][0])}px,${f1(pos[i][1])}px)`; });
      [cap, tot].forEach(e => { e.style.transitionDelay = (D ? 300 + n * 55 : 0) + 'ms'; e.classList.add('on'); }); },
    back() { cap.classList.remove('on'); tot.classList.remove('on'); cells.forEach((el, i) => { el.style.transitionDelay = (i * 16) + 'ms'; el.style.opacity = 0; el.style.transform = `translate(${f1(ox)}px,${f1(oy)}px) scale(.3)`; }); }
  };
}

// ---------- plate i doručci: daske (ili tanjir) leže na stolu u perspektivi, namirnice padaju na njih, opis gore
const BRD = { 'ultra-plata': { n: 2, kind: 'wood' }, 'dorucak-za-dvoje': { n: 2, kind: 'wood', pan: 1 }, 'meze-plata': { n: 1, kind: 'wood' }, 'plata-sireva': { n: 1, kind: 'wood' },
  'mix-bruskete': { n: 1, kind: 'wood' }, 'mekike': { n: 1, kind: 'wood' }, 'domacinski-dorucak': { n: 1, kind: 'plate' }, 'engleski-dorucak': { n: 1, kind: 'plate' } };
const BOWLA = new Set(['honey', 'jam', 'olives', 'cream', 'kajmak', 'ajvar', 'choc_top', 'caramel', 'beans', 'pelat']);
const COPIES = { ustipak: 4, toast: 3, prosciutto: 2 };
const COMBO = { sopska: ['tomato', 'cucumber', 'feta'] };
let TILT = (+(new URLSearchParams(location.search).get('tilt')) || 64) * Math.PI / 180;
function boardLayout(it, comps, Wpx, Hmax) {
  const B = BRD[it.id] || { n: 1, kind: 'wood' }, main = comps.filter(c => !c.side), n = main.length;
  const plate = B.kind === 'plate', L = plate ? 64 : 100, D = plate ? 64 : 34, ang = plate ? 0 : (B.n > 1 ? -.5 : -.3), P = 230;
  const perp = [-Math.sin(ang), Math.cos(ang)], dir = [Math.cos(ang), Math.sin(ang)];
  const centers = B.n > 1 ? [[-perp[0] * D * .62 - dir[0] * 6, -perp[1] * D * .62 - dir[1] * 6], [perp[0] * D * .62 + dir[0] * 6, perp[1] * D * .62 + dir[1] * 6]] : [[0, 0]];
  const pr3 = (x, y) => { const Y = y * Math.cos(TILT), Z = y * Math.sin(TILT), k = P / (P + Z); return [x * k, -Y * k, k]; };
  const loc = (ci, lx, ly) => { const c = centers[ci]; return [c[0] + lx * dir[0] - ly * perp[0], c[1] + lx * dir[1] - ly * perp[1]]; };
  // raspored: dva reda duž daske (tanjir: krug)
  const cols = Math.ceil(n / 2), slot = [];
  main.forEach((c, i) => {
    if (plate) { if (i === 0) slot.push([0, 0, 1.25, 1]); else { const a = -Math.PI / 2 + (i - 1) / (n - 1) * Math.PI * 2; slot.push([Math.cos(a) * L * .3, Math.sin(a) * L * .3, .95, Math.sin(a) < 0 ? 0 : 1]); } return; }
    const col = Math.floor(i / 2), row = i % 2;
    slot.push([(-.5 + (col + .5 + (row ? .25 : -.1)) / cols) * L * .92, (row ? -.22 : .22) * D, 1, row ? 1 : 0]);
  });
  const gmax = Math.max(...main.map(c => c.g)), unit = plate ? L * .36 : Math.min(L * 1.18 / cols, D * .92);
  const items = [];
  for (let b = 0; b < B.n; b++) main.forEach((c, i) => {
    const sl = slot[i], ly = b === 1 ? -sl[1] : sl[1];
    const [x, y] = loc(b, sl[0], ly), sz = unit * sl[2] * (BOWLA.has(c.a) ? .62 : (.72 + .38 * Math.sqrt(c.g / gmax)));
    items.push({ c, i, b, x, y, sz, back: b === 1 ? !sl[3] : !!sl[3] });
  });
  // granice scene za razmeru
  const corners = []; centers.forEach((c, ci) => { [[-L / 2, -D / 2], [L / 2, -D / 2], [L / 2, D / 2], [-L / 2, D / 2]].forEach(([lx, ly]) => { const p = loc(ci, lx, ly); corners.push(pr3(p[0], p[1])); }); });
  let x0 = Math.min(...corners.map(p => p[0])), x1 = Math.max(...corners.map(p => p[0])), y0 = Math.min(...corners.map(p => p[1])) - 22, y1 = Math.max(...corners.map(p => p[1])) + 8;
  const S = Math.min((Wpx - 20) / (x1 - x0), Hmax / (y1 - y0)), ox = Wpx / 2 - (x0 + x1) / 2 * S, oy = -y0 * S;
  const pt = (x, y) => { const p = pr3(x, y); return [ox + p[0] * S, oy + p[1] * S, p[2]]; };
  const boards = centers.map((c, ci) => ({ ci, poly: [[-L / 2, -D / 2], [L / 2, -D / 2], [L / 2, D / 2], [-L / 2, D / 2]].map(([lx, ly]) => { const p = loc(ci, lx, ly); return pt(p[0], p[1]); }),
    grain: plate ? [] : [-.3, -.1, .12, .32].map(f => [loc(ci, -L * .46, D * f), loc(ci, L * .46, D * f + 1.5)].map(p => pt(p[0], p[1]))),
    circ: plate ? [1, .74].map(r => Array.from({ length: 48 }, (_, k) => { const a = k / 48 * 6.283; const p = loc(ci, Math.cos(a) * L / 2 * r, Math.sin(a) * D / 2 * r); return pt(p[0], p[1]); })) : null }));
  items.forEach(o => { const p = pt(o.x, o.y); o.X = p[0]; o.Y = p[1]; o.w = o.sz * S * p[2]; o.q = Math.max(.5, Math.cos(TILT) * 1.45); o.h = o.w * o.q; });
  items.sort((a, b) => a.Y - b.Y);
  return { B, boards, items, H: (y1 - y0) * S, plate, S };
}
function boardsSVG(Lt, Wpx, id) {
  const poly = ps => ps.map(p => `${f1(p[0])},${f1(p[1])}`).join(' ');
  let s = `<defs><linearGradient id="${id}w" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#a8733f"/><stop offset=".5" stop-color="#8d5b2f"/><stop offset="1" stop-color="#6e4422"/></linearGradient>
    <radialGradient id="${id}p" cx=".45" cy=".4" r=".75"><stop offset="0" stop-color="#fbf7ee"/><stop offset=".75" stop-color="#e6dece"/><stop offset="1" stop-color="#cbbfa8"/></radialGradient></defs>`;
  Lt.boards.forEach(b => {
    if (Lt.plate) { s += `<polygon points="${poly(b.circ[0].map(p => [p[0], p[1] + 8]))}" fill="#000" opacity=".4"/><polygon points="${poly(b.circ[0])}" fill="url(#${id}p)"/><polygon points="${poly(b.circ[1])}" fill="none" stroke="#d3c8b2" stroke-width="1.6"/><polygon points="${poly(b.circ[0])}" fill="none" stroke="#b9975f" stroke-width="1.4" opacity=".6"/>`; return; }
    const [a, bb, c, d] = b.poly, th = 7;
    s += `<polygon points="${poly([a, bb, c, d].map(p => [p[0] + 4, p[1] + th + 10]))}" fill="#000" opacity=".38"/>`;
    // ivica daske okrenuta gostu
    [[a, bb], [bb, c], [c, d], [d, a]].forEach(([p, q]) => { if (q[0] - p[0] > 0 && (p[1] + q[1]) / 2 > (a[1] + c[1]) / 2 - 1) s += `<polygon points="${poly([p, q, [q[0], q[1] + th], [p[0], p[1] + th]])}" fill="#5a361a"/>`; });
    s += `<polygon points="${poly(b.poly)}" fill="url(#${id}w)"/>` + b.grain.map(([p, q]) => `<path d="M${f1(p[0])} ${f1(p[1])}L${f1(q[0])} ${f1(q[1])}" stroke="#5e3a1c" stroke-opacity=".28" stroke-width="1.1"/>`).join('') + `<polygon points="${poly(b.poly)}" fill="none" stroke="#c99a62" stroke-opacity=".5" stroke-width="1"/>`;
  });
  return s;
}
function boardItemSVG(o, pan) {
  const c = o.c, arts = COMBO[c.i] || Array.from({ length: COPIES[c.a] || 1 }, () => c.a), bowl = BOWLA.has(c.a);
  let g = '';
  if (pan) g += `<circle cx="60" cy="60" r="54" fill="#b8bec2"/><circle cx="60" cy="60" r="47" fill="#8e969b"/><rect x="2" y="54" width="10" height="12" rx="3" fill="#c9cfd2"/><rect x="108" y="54" width="10" height="12" rx="3" fill="#c9cfd2"/>`;
  if (bowl) g += `<circle cx="60" cy="62" r="50" fill="#141a1c"/><circle cx="60" cy="60" r="50" fill="#f1ece2"/><circle cx="60" cy="60" r="41" fill="#d8d0c0"/>`;
  const k = pan ? .82 : bowl ? .7 : 1;
  arts.forEach((a, j) => {
    const m = arts.length, dx = m > 1 ? Math.cos(j / m * 6.283 + .4) * 20 : 0, dy = m > 1 ? Math.sin(j / m * 6.283 + .4) * 16 : 0, sc = m > 1 ? k * .66 : k;
    g += `<g transform="translate(${f1(60 + dx - 60 * sc)} ${f1(60 + dy - 60 * sc)}) scale(${f1(sc)})">${artInner(a, o.i * 3 + j)}</g>`;
  });
  return `<svg viewBox="0 0 120 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g}</svg>`;
}
// cela scena kao jedna slika (naslovna i sličica)
function boardArt(it, Wpx = 360, Hpx = 300) {
  const Lt = boardLayout(it, it.comps, Wpx, Hpx - 20), id = 'ba' + (++GID), top = (Hpx - Lt.H) / 2;
  let s = `<svg viewBox="0 0 ${Wpx} ${Hpx}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(0 ${f1(top)})">${boardsSVG(Lt, Wpx, id)}`;
  Lt.items.forEach(o => { s += `<ellipse cx="${f1(o.X + 2)}" cy="${f1(o.Y + o.h * .08)}" rx="${f1(o.w * .42)}" ry="${f1(o.h * .4)}" fill="#000" opacity=".3"/>` + boardItemSVG(o, Lt.B.pan).replace('<svg ', `<svg x="${f1(o.X - o.w / 2)}" y="${f1(o.Y - o.h * .62)}" width="${f1(o.w)}" height="${f1(o.h)}" `); });
  return s + '</g></svg>';
}
function buildBoard(xr, it, comps, W, pr) {
  const main = comps.filter(c => !c.side), n = main.length, two = W >= 520 ? 3 : 2;
  const cw = (W - 24 - (two - 1) * 8) / two, rows = Math.ceil(n / two), top0 = 102, legH = rows * 50 + 6;
  const sceneTop = top0 + legH + 18, Lt = boardLayout(it, comps, W, Math.min(330, W * .82)), id = 'bd' + (++GID);
  const H = sceneTop + Lt.H + 70;
  let h = `<div class="bl-cap" style="top:${f1(top0 - 30)}px">${esc(BRD[it.id] && BRD[it.id].n > 1 ? (L === 'en' ? 'For two — two boards, same portions' : 'Za dve osobe — dve daske, iste porcije') : t('made_of'))}</div>`;
  h += main.map((c, i) => `<div class="blg" style="left:${f1(12 + (i % two) * (cw + 8))}px;top:${f1(top0 + Math.floor(i / two) * 50)}px;width:${f1(cw)}px;--gc:${GC[c.grp] || '#CFA670'}"><i class="num">${i + 1}</i><span><b>${esc(cnm(c))}</b><small class="num">${c.g} g · ${c.kcal} kcal</small></span></div>`).join('');
  h += `<svg class="bsc" width="${W}" height="${f1(Lt.H + 20)}" viewBox="0 0 ${W} ${f1(Lt.H + 20)}" style="top:${f1(sceneTop)}px" aria-hidden="true">${boardsSVG(Lt, W, id)}</svg>`;
  h += Lt.items.map(o => `<div class="bi" style="left:${f1(o.X - o.w / 2)}px;top:${f1(sceneTop + o.Y - o.h * .62)}px;width:${f1(o.w)}px;height:${f1(o.h)}px"><i class="sh"></i>${boardItemSVG(o, Lt.B.pan)}</div>`).join('');
  h += Lt.items.filter(o => o.b === 0).map(o => `<div class="bp num" data-i="${o.i}" style="left:${f1(o.X)}px;top:${f1(sceneTop + o.Y + (o.back ? -o.h * .62 - 4 : o.h * .42 + 8))}px">${o.i + 1}</div>`).join('');
  h += totLine(it, H - 48);
  xr.innerHTML = h;
  const sc = $('.bsc', xr), bis = $$('.bi', xr), bps = $$('.bp', xr), lg = $$('.blg', xr), cap = $('.bl-cap', xr), tot = $('.xr-tot', xr);
  bis.forEach(el => { el.style.transition = 'none'; el.style.opacity = 0; el.style.transform = 'translateY(-46px) scale(1.08)'; });
  const T = [], at = (ms, fn) => T.push(setTimeout(fn, reduced ? 0 : ms));
  const sy = sceneTop + Lt.H / 2, s0 = Math.min(1, (pr.h * .9) / Lt.H);
  return {
    H, m: 'board', delay: 300, photo: { tf: `translate(0,${f1(sy - (pr.y + pr.h / 2))}px) scale(.9)`, op: 0 },
    play() {
      sc.classList.add('on');
      bis.forEach((el, j) => at(380 + j * 55, () => { el.style.transition = ''; el.style.opacity = 1; el.style.transform = 'none'; }));
      const t1 = 380 + bis.length * 55 + 200;
      bps.forEach((el, j) => at(t1 + j * 45, () => el.classList.add('on')));
      lg.forEach((el, j) => { el.style.transitionDelay = (reduced ? 0 : t1 + j * 45) + 'ms'; el.classList.add('on'); });
      cap.style.transitionDelay = (reduced ? 0 : t1) + 'ms'; cap.classList.add('on');
      tot.style.transitionDelay = (reduced ? 0 : t1 + n * 45 + 100) + 'ms'; tot.classList.add('on');
    },
    back() {
      T.forEach(clearTimeout); sc.classList.remove('on'); [...bps, ...lg, cap, tot].forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); });
      bis.forEach(el => { el.style.transition = 'opacity .3s'; el.style.opacity = 0; });
    }
  };
}

// ---------- tanjir: sastojci izlaze iz tanjira, od osnove do preliva na vrhu
const BASE_ART = new Set(['pasta', 'risotto', 'rice', 'mash', 'potato_sp', 'fries', 'greens', 'lettuce', 'soup', 'soup_dark', 'potage', 'tortilla', 'crepe', 'mlinci', 'toast', 'lepinja', 'poppy', 'choc_top', 'cabbage']);
function plateOrder(comps) {
  const main = comps.filter(c => !c.side);
  const isB = c => BASE_ART.has(c.a) || c.grp === 'testo' || c.grp === 'prilog';
  const base = main.filter(isB).sort((a, b) => b.g - a.g)[0] || main.slice().sort((a, b) => b.g - a.g)[0];
  const rank = c => c === base ? 0 : (c.i === 'yolk' || c.grp === 'sos' || c.grp === 'slatko') ? 3 : (c.g <= 6 || ['herbs', 'garlic'].includes(c.a)) ? 5 : (c.grp === 'meso' || c.grp === 'riba') ? 1 : c.grp === 'sir' ? 4 : 2;
  return main.slice().sort((a, b) => rank(a) - rank(b) || b.g - a.g);
}
const ringSVG = '<circle cx="200" cy="200" r="176" fill="rgba(255,214,140,.05)" stroke="rgba(255,214,140,.22)" stroke-width="2.4" stroke-dasharray="5 7"/>';
// posebni diskovi: crni biber (zrnca), žumance (sjajan sos)
function discSpecial(c, i) {
  const R = RNG(31 + i);
  if (c.i === 'black_pepper') { let s = ''; for (let k = 0; k < 90; k++) { const a = R() * 6.283, r = Math.sqrt(R()) * 150; s += `<circle cx="${f1(200 + Math.cos(a) * r)}" cy="${f1(200 + Math.sin(a) * r)}" r="${f1(2.2 + R() * 3.2)}" fill="${R() > .3 ? '#1c1714' : '#4a3a2c'}"/>`; } return s; }
  if (c.i === 'yolk') { let s = ''; for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283 + R() * .5, r = 40 + R() * 80, x = 200 + Math.cos(a) * r, y = 200 + Math.sin(a) * r * .9, w = 34 + R() * 26; s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(w)}" ry="${f1(w * .7)}" fill="#f2a91c"/><ellipse cx="${f1(x - w * .25)}" cy="${f1(y - w * .2)}" rx="${f1(w * .35)}" ry="${f1(w * .18)}" fill="#fff" opacity=".45"/>`; } return `<path d="M120 170C150 120 260 115 290 165S300 270 230 285 100 260 120 170Z" fill="#f6c24a" opacity=".85"/>` + s; }
  return '';
}
function discSVG(c, i, base) {
  const s = base ? 3.3 : 2.6, o = 200 - 60 * s, sp = discSpecial(c, i);
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${base ? '' : ringSVG}${sp || `<g transform="translate(${f1(o)} ${f1(o)}) scale(${s})">${artInner(c.a, i)}</g>`}</svg>`;
}
function plateSVG(id) {
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="pp-${id}" cx=".45" cy=".4" r=".75"><stop offset="0" stop-color="#fbf7ee"/><stop offset=".72" stop-color="#e7dfcf"/><stop offset="1" stop-color="#c9bea8"/></radialGradient></defs>
    <circle cx="200" cy="214" r="196" fill="#000" opacity=".4"/><circle cx="200" cy="200" r="196" fill="url(#pp-${id})"/><circle cx="200" cy="200" r="142" fill="none" stroke="#d3c8b2" stroke-width="2.4"/><circle cx="200" cy="200" r="190" fill="none" stroke="#b9975f" stroke-width="2" opacity=".6"/></svg>`;
}
function buildPlate(xr, it, comps, W, pr) {
  const ls = plateOrder(comps), n = ls.length, sides = comps.filter(c => c.side);
  const D = Math.min(W * .5, 240), x0 = Math.max(10, W * .035), top0 = 78, gap = Math.max(30, Math.min(48, 340 / n)), k = .44;
  const cyE = ls.map((c, i) => top0 + D * k / 2 + (n - 1 - i) * gap);
  const plY = cyE[0] + gap * .95, Dp = D * 1.12;
  const lx = x0 + D + 20, lw = W - lx - 12;
  const LP = labelsRight(xr, ls, cyE, lx, lw);
  const sideY = Math.max(plY + Dp * k / 2 + 26, LP.bottom + 16);
  let H = sideY + (sides.length ? 170 : 0) + 64;
  let h = `<div class="pl" style="width:${f1(Dp)}px;height:${f1(Dp)}px">${plateSVG(it.id)}</div>`;
  h += ls.map((c, i) => `<div class="pz pd${i === 0 ? ' base' : ''}" style="width:${f1(D)}px;height:${f1(D)}px;z-index:${10 + i}">${discSVG(c, i, i === 0)}</div>`).join('');
  h += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${ls.map((c, i) => leader(x0 + D * (i === 0 ? .96 : .82), cyE[i], lx, LP.anchors[i])).join('')}</svg>`;
  h += ls.map((c, i) => lab(c, lx, LP.tops[i], lw)).join('');
  if (sides.length) h += `<div class="sides" style="top:${f1(sideY)}px"><span>${t('with_dish')}</span><div>${sides.map((c, i) => `<div class="sd"><div class="sp">${K.top(c.a, 40 + i)}</div><b>${esc(cnm(c))}</b><small class="num">${c.g} g · ${c.kcal} kcal</small></div>`).join('')}</div></div>`;
  h += totLine(it, H - 48);
  xr.innerHTML = h;
  const plate = $('.pl', xr), els = $$('.pd', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), sd = $('.sides', xr), tot = $('.xr-tot', xr);
  if (sd) { H = sideY + sd.offsetHeight + 72; tot.style.top = (H - 50) + 'px'; }
  const plX = x0 + D / 2 - Dp / 2, plTf = `translate(${f1(plX)}px,${f1(plY - Dp / 2)}px) scale(1,${k})`;
  plate.style.transformOrigin = '50% 50%'; plate.style.transition = 'none'; plate.style.opacity = 0; plate.style.transform = `translate(${f1(pr.cx - Dp / 2)}px,${f1(pr.cy - Dp / 2)}px) scale(${f1(Math.min(pr.w, pr.h) / Dp * .9)},${f1(Math.min(pr.w, pr.h) / Dp * .9 * .7)})`;
  const sit = i => `translate(${f1(x0)}px,${f1(plY - D / 2 - 6 - i * 3)}px) scale(.9,${f1(k * .9)})`;
  els.forEach((el, i) => { el.style.transition = 'none'; el.style.opacity = 0; el.style.transformOrigin = '50% 50%'; el.style.transform = sit(i); });
  // fotografija se spušta i sabija u tanjir
  const s = Dp / Math.max(pr.w, 1), tx = plX + Dp / 2 - (pr.x + pr.w / 2) * s, ty = plY - (pr.y + pr.h / 2) * s * k;
  return {
    H, m: 'plate', delay: 380, photo: { tf: `translate(${f1(tx)}px,${f1(ty)}px) scale(${s.toFixed(3)},${(s * k).toFixed(3)})`, op: 0 },
    play() { void xr.offsetWidth; const Dd = reduced ? 0 : 1;
      plate.style.transition = 'transform .8s var(--ease),opacity .45s'; plate.style.opacity = 1; plate.style.transform = plTf;
      els.forEach((el, i) => { el.style.transition = 'opacity .3s'; el.style.transitionDelay = (Dd ? 260 + i * 40 : 0) + 'ms'; el.style.opacity = 1; });
      setTimeout(() => {
        els.forEach((el, i) => { el.style.transition = ''; el.style.transitionDelay = (Dd ? i * 70 : 0) + 'ms'; el.style.transform = `translate(${f1(x0)}px,${f1(cyE[i] - D / 2)}px) scale(1,${k})`; el.classList.add('ex'); });
        lbs.forEach((el, i) => { el.style.transitionDelay = (Dd ? 300 + i * 70 : 0) + 'ms'; el.classList.add('on'); });
        paths.forEach((p, i) => { p.style.transitionDelay = (Dd ? 340 + Math.floor(i / 2) * 70 : 0) + 'ms'; p.classList.add('on'); });
        if (sd) { sd.style.transitionDelay = (Dd ? 420 + n * 70 : 0) + 'ms'; sd.classList.add('on'); }
        tot.style.transitionDelay = (Dd ? 520 + n * 70 : 0) + 'ms'; tot.classList.add('on');
      }, Dd ? 640 : 30);
    },
    back() {
      lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); });
      if (sd) { sd.style.transitionDelay = '0ms'; sd.classList.remove('on'); } tot.classList.remove('on');
      els.forEach((el, i) => { el.style.transitionDelay = ((n - 1 - i) * 30) + 'ms'; el.style.transform = sit(i); el.classList.remove('ex'); });
      setTimeout(() => { els.forEach(el => { el.style.transition = 'opacity .3s'; el.style.opacity = 0; }); plate.style.opacity = 0; }, 420);
    }
  };
}

// ---------- stack: slojevi (burger, sendvič, baklava)
function buildStack(xr, it, comps, W, pr, ill) {
  const cake = it.mode === 'cake', main = comps.filter(c => !c.side), sides = comps.filter(c => c.side);
  const shape = cake ? 'wedge' : (it.shape || 'round');
  const Wl = Math.min(W * .5, cake ? 300 : 280), s = Wl / 700, x0 = Math.max(12, W * .04), top0 = 78;
  const Ls = main.map((c, i) => { const o = cake ? K.cake(c.a, shape) : K.layer(c.a, { pos: i === 0 ? 'top' : i === main.length - 1 ? 'bottom' : 'mid', shape, seed: i }); return { c, o, h: o.h * s }; });
  const as = [0]; for (let i = 1; i < Ls.length; i++) { const p = Ls[i - 1].o, q = Ls[i].o; as.push(as[i - 1] + (cake ? (p.t || 40) : (p.b - q.c - 6)) * s); }
  const asH = as[as.length - 1] + Ls[Ls.length - 1].h;
  const gp = cake ? 18 : 13, ex = [top0]; for (let i = 1; i < Ls.length; i++) { const p = Ls[i - 1].o, q = Ls[i].o; ex.push(ex[i - 1] + (p.b - (q.top || 0)) * s + gp); }
  const exEnd = ex[ex.length - 1] + Ls[Ls.length - 1].h;
  const ax = ill ? (W - Wl) / 2 : x0, asTop = ill ? Math.max(70, pr.cy - asH / 2) : top0 + Math.max(0, (Math.min(exEnd - top0, 420) - asH) / 2);
  const asY = as.map(y => asTop + y);
  const lx = x0 + Wl + 22, lw = W - lx - 12; const cyL = i => ex[i] + Ls[i].o.c * s;
  const LP = labelsRight(xr, Ls.map(l => l.c), Ls.map((l, i) => cyL(i)), lx, lw);
  const sideY = Math.max(exEnd, LP.bottom + 10) + 22; let H = sideY + (sides.length ? 160 : 0) + 60;
  let h = Ls.map((l, i) => `<div class="ly" style="width:${f1(Wl)}px;left:0;z-index:${60 - i}">${l.o.svg}</div>`).join('');
  h += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${Ls.map((l, i) => leader(x0 + Wl * (cake ? .86 : .9), cyL(i), lx, LP.anchors[i])).join('')}</svg>`;
  h += Ls.map((l, i) => lab(l.c, lx, LP.tops[i], lw)).join('');
  if (sides.length) h += `<div class="sides" style="top:${f1(sideY)}px"><span>${t('with_dish')}</span><div>${sides.map((c, i) => `<div class="sd"><div class="sp">${K.top(c.a, 40 + i)}</div><b>${esc(cnm(c))}</b><small class="num">${c.g} g · ${c.kcal} kcal</small></div>`).join('')}</div></div>`;
  h += totLine(it, H - 48);
  xr.innerHTML = h;
  const lys = $$('.ly', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), sd = $('.sides', xr), tot = $('.xr-tot', xr);
  if (sd) { H = sideY + sd.offsetHeight + 70; tot.style.top = (H - 50) + 'px'; }
  lys.forEach((el, i) => { el.style.transition = 'none'; el.style.opacity = ill ? 1 : 0; el.style.transform = `translate(${f1(ax)}px,${f1(asY[i])}px)`; });
  return {
    H, keep: !!ill, delay: 380, photo: { tf: '', op: ill ? 1 : 0 },
    still() { },
    play() { void xr.offsetWidth; const D = reduced ? 0 : 1;
      lys.forEach(el => { el.style.transition = 'opacity .35s'; el.style.opacity = 1; });
      setTimeout(() => {
        lys.forEach((el, i) => { el.style.transition = ''; el.style.transitionDelay = (D ? i * 45 : 0) + 'ms'; el.style.transform = `translate(${f1(x0)}px,${f1(ex[i])}px)`; });
        lbs.forEach((el, i) => { el.style.transitionDelay = (D ? 260 + i * 55 : 0) + 'ms'; el.classList.add('on'); });
        paths.forEach((p, i) => { p.style.transitionDelay = (D ? 300 + Math.floor(i / 2) * 55 : 0) + 'ms'; p.classList.add('on'); });
        if (sd) { sd.style.transitionDelay = (D ? 420 + lbs.length * 55 : 0) + 'ms'; sd.classList.add('on'); }
        tot.style.transitionDelay = (D ? 500 + lbs.length * 55 : 0) + 'ms'; tot.classList.add('on');
      }, D && !ill ? 420 : 30);
    },
    back(instant) {
      lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); });
      if (sd) { sd.style.transitionDelay = '0ms'; sd.classList.remove('on'); } tot.classList.remove('on');
      lys.forEach((el, i) => { el.style.transitionDelay = (i * 22) + 'ms'; el.style.transform = `translate(${f1(ax)}px,${f1(asY[i])}px)`; });
      if (!ill) setTimeout(() => lys.forEach(el => { el.style.transition = 'opacity .3s'; el.style.opacity = 0; }), instant ? 0 : 430);
    }
  };
}
// ---------- pizza: slojevi odozgo, pa u kosoj perspektivi
function buildPizza(xr, it, comps, W, pr, ill) {
  const ls = K.pizza(comps.map(c => Object.assign({}, c, { k: c.a }))), n = ls.length;
  const D = Math.min(W * .5, 250), x0 = Math.max(12, W * .04), top0 = 80, gap = Math.max(34, Math.min(48, 380 / n)), k = .5;
  const cyE = ls.map((l, i) => top0 + D * k / 2 + (n - 1 - i) * gap), exEnd = cyE[0] + D * k / 2 + 18;
  const lx = x0 + D + 22, lw = W - lx - 12;
  const LP = labelsRight(xr, ls.map(l => l.c), cyE, lx, lw);
  const H = Math.max(exEnd, LP.bottom + 20) + 70;
  let h = ls.map((l, i) => `<div class="pz${i === 0 ? ' base' : ''}" style="width:${f1(D)}px;height:${f1(D)}px;left:0;z-index:${10 + i}">${l.svg}</div>`).join('');
  h += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${ls.map((l, i) => leader(x0 + D * (i === 0 ? .99 : .86), cyE[i], lx, LP.anchors[i])).join('')}</svg>`;
  h += ls.map((l, i) => lab(l.c, lx, LP.tops[i], lw)).join('') + totLine(it, H - 48);
  xr.innerHTML = h;
  const els = $$('.pz', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), tot = $('.xr-tot', xr);
  const sA = ill ? Math.min(W * .76, 360) / D : Math.min(pr.w * .9, pr.h * 1.2) / D;
  const acx = ill ? W / 2 : pr.cx, acy = ill ? Math.max(D * sA / 2 + 60, pr.cy) : pr.cy;
  const asm = `translate(${f1(acx - D / 2)}px,${f1(acy - D / 2)}px) scale(${sA.toFixed(3)},${(sA * (ill ? 1 : .78)).toFixed(3)})`;
  els.forEach(el => { el.style.transition = 'none'; el.style.opacity = ill ? 1 : 0; el.style.transform = asm; el.style.transformOrigin = '50% 50%'; });
  return {
    H, keep: !!ill, delay: 420, photo: { tf: '', op: ill ? 1 : 0 }, still() { },
    play() { void xr.offsetWidth; const Dd = reduced ? 0 : 1;
      els.forEach(el => { el.style.transition = 'opacity .4s'; el.style.opacity = 1; });
      setTimeout(() => {
        els.forEach((el, i) => { el.style.transition = ''; el.style.transitionDelay = (Dd ? (n - 1 - i) * 50 : 0) + 'ms'; el.style.transform = `translate(${f1(x0)}px,${f1(cyE[i] - D / 2)}px) scale(1,${k})`; el.classList.add('ex'); });
        lbs.forEach((el, i) => { el.style.transitionDelay = (Dd ? 320 + (n - 1 - i) * 55 : 0) + 'ms'; el.classList.add('on'); });
        paths.forEach((p, i) => { p.style.transitionDelay = (Dd ? 360 + (n - 1 - Math.floor(i / 2)) * 55 : 0) + 'ms'; p.classList.add('on'); });
        tot.style.transitionDelay = (Dd ? 500 + n * 55 : 0) + 'ms'; tot.classList.add('on');
      }, Dd && !ill ? 480 : 30);
    },
    back(instant) {
      lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); }); tot.classList.remove('on');
      els.forEach((el, i) => { el.style.transitionDelay = (i * 20) + 'ms'; el.style.transform = asm; el.classList.remove('ex'); });
      if (!ill) setTimeout(() => els.forEach(el => { el.style.transition = 'opacity .3s'; el.style.opacity = 0; }), instant ? 0 : 480);
    }
  };
}

// ---------- piće: čaša u sredini, sastojci se rasprsnu na sve strane (kao BHT)
const ORB = { lemon: 'k:lemon', lime: 'k:lemon', oj: 'k:orange', orange: 'k:orange', grapefruit: 'k:orange', mint: 'k:herbs', blueberry: 'k:berries', raspberry: 'k:berries',
  banana: 'k:banana', honey: 'k:honey', carrot: 'k:carrot', whip: 'k:whip', icecream: 'k:ice_cream', plazma: 'k:plazma', choc: 'k:milk_choc', hot_choc: 'k:milk_choc',
  espresso: 'k:coffee_beans', espresso_d: 'k:coffee_beans', nescaffe: 'k:coffee_beans', turkish: 'k:coffee_beans', cocoa: 'g:powder', sugar: 'g:cubes', ice: 'g:ice',
  soda: 'g:bubbles', tonic: 'g:bubbles', sprite: 'g:bubbles', water: 'g:bubbles', pgf: 'g:bubbles', guarana: 'g:bubbles', cola: 'g:bubbles', apple: 'g:apple', ginger: 'g:root',
  cinnamon: 'g:stick', beet: 'g:beet', pineapple: 'g:pineapple', tea: 'g:leaf', icetea: 'g:leaf', milk: 'g:drop', foam: 'g:cloud', soy: 'g:drop', crema: 'g:cloud', tfoam: 'g:cloud',
  grenadine: 'g:drop', syrup: 'g:drop', caramel: 'g:drop', lemon_syrup: 'g:drop', fruit_syrup: 'g:drop', shake: 'g:drop', cedevita: 'g:drop' };
const GLY = {
  bottle: '<path d="M10 3h4v3.2c0 .8 2.5 1.8 2.5 4.6V20a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 20v-9.2C7.5 8 10 7 10 6.2Z"/><path d="M7.5 13h9"/>',
  drop: '<path d="M12 3.5s6 6.4 6 10.8a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5Z"/>', bubbles: '<circle cx="9" cy="15" r="4"/><circle cx="16" cy="9" r="2.6"/><circle cx="15.5" cy="17.5" r="1.6"/><circle cx="9.5" cy="6.5" r="1.4"/>',
  ice: '<rect x="4" y="9" width="9" height="9" rx="2" transform="rotate(-10 8.5 13.5)"/><rect x="11" y="5" width="8.5" height="8.5" rx="2" transform="rotate(12 15 9)"/>',
  cubes: '<rect x="4" y="11" width="7" height="7" rx="1.2"/><rect x="12.5" y="11" width="7" height="7" rx="1.2"/><rect x="8.3" y="4" width="7" height="7" rx="1.2"/>',
  powder: '<path d="M4 18c2-5 5-7 8-7s6 2 8 7Z"/><circle cx="8" cy="8" r=".9" fill="currentColor"/><circle cx="12" cy="6" r=".9" fill="currentColor"/><circle cx="16" cy="8.5" r=".9" fill="currentColor"/>',
  apple: '<path d="M12 7.5c-2-1.6-6-1.2-6.5 3-.4 3.8 2.2 9 5 9 .7 0 1-.4 1.5-.4s.8.4 1.5.4c2.8 0 5.4-5.2 5-9-.5-4.2-4.5-4.6-6.5-3Z"/><path d="M12 7.5c0-2 .8-3.5 2.5-4"/>',
  root: '<path d="M5 15c2-4 6-3 8-6s4-4 6-3-1 4-4 6-4 6-8 6-3-1-2-3Z"/><path d="M9 14l-2-2M13 11l-1-3"/>', stick: '<path d="M5 18 18 5M7 20 20 7"/><path d="M5 18c-1 1 0 3 2 2"/>',
  beet: '<circle cx="12" cy="14" r="5.5"/><path d="M12 8.5c-1-3-3-4.5-5-5M12 8.5c1-3 3-4.5 5-5M12 19.5v2"/>', pineapple: '<ellipse cx="12" cy="15" rx="5" ry="6"/><path d="M9 12l6 6M15 12l-6 6M12 9V4M9.5 5.5 12 9l2.5-3.5"/>',
  leaf: '<path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14Z"/><path d="M5 19 13 11"/>', cloud: '<path d="M7 17.5h10a3.5 3.5 0 0 0 .3-7 5 5 0 0 0-9.6-1A4 4 0 0 0 7 17.5Z"/>'
};
const SPIRIT = new Set(['rum', 'rum_dark', 'vodka', 'gin', 'tequila', 'triple', 'archers', 'curacao', 'absinth', 'puskin', 'amaretto', 'aperol', 'baileys', 'whiskey', 'cranberry', 'prosecco', 'vermouth', 'bwine', 'wine_w', 'wine_r', 'wine_ro', 'beer', 'beer_dark']);
function orbIcon(key) {
  const o = ORB[key] || (SPIRIT.has(key) ? 'g:bottle' : 'g:drop'), [k, v] = o.split(':');
  if (k === 'k') return `<svg viewBox="0 0 120 120" class="ka">${artInner(v, 3)}</svg>`;
  return `<svg viewBox="0 0 24 24" class="gy" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${GLY[v]}</svg>`;
}
const lum = hex => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * .299 + ((n >> 8) & 255) * .587 + (n & 255) * .114) / 255; };
function buildOrbs(xr, it, W, pr) {
  const { geo, lay } = glassGeo(it), n = lay.length, H0 = $('#st')._h0 || $('#st').offsetHeight;
  const H = Math.max(H0, 150 + Math.ceil(n / 2) * 74);
  const vb = vbOf(it), Wg = Math.min(W * .34, 180) * (vb[2] < 200 ? Math.min(1.5, Math.sqrt(200 / vb[2])) : 1), kk = Wg / vb[2], Hg = vb[3] * kk, gx = (W - Wg) / 2, gy = Math.max(canMake(it) ? 112 : 70, H * .5 - Hg * .55);
  const ow = Math.min(132, W * .3), rows = [Math.ceil(n / 2), Math.floor(n / 2)];
  // sastojci odozgo nadole: vrh čaše levo gore, dno dole
  const ord = lay.map((l, i) => n - 1 - i);
  const pos = ord.map((li, j) => { const col = j % 2, row = Math.floor(j / 2), rs = rows[col]; const y = rs <= 1 ? H * .46 : H * (.17 + row * (.66 / (rs - 1))); const x = col ? W - ow / 2 - 8 : ow / 2 + 8; return { x, y, col, li }; });
  let h = `<div class="og" style="left:${f1(gx)}px;top:${f1(gy)}px;width:${f1(Wg)}px;height:${f1(Hg)}px">` +
    lay.map((l, i) => `<div class="og-l">${glassSVG(it, i)}</div>`).join('') + `<div class="og-s">${glassShell(it)}</div><div class="og-g">${strawSVG(it)}</div></div>`;
  h += `<svg class="ol" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${pos.map(p => { const ly = gy + (geo[p.li].y0 + geo[p.li].h / 2 - vb[1]) * kk; const ox = p.col ? p.x + ow / 2 - 23 : p.x - ow / 2 + 23; return `<line x1="${f1(ox)}" y1="${f1(p.y)}" x2="${f1(W / 2 + (p.col ? 1 : -1) * Wg * .3)}" y2="${f1(ly)}"/>`; }).join('')}</svg>`;
  h += pos.map(p => { const l = lay[p.li], q = U.lq[l[0]] || ['', '', '#ccc']; return `<div class="orb${p.col ? ' r' : ''}" style="width:${f1(ow)}px;--c:${q[2]};--ic:${lum(q[2]) > .62 ? '#2b2118' : '#fff'}"><span class="o">${orbIcon(l[0])}</span><span class="t"><b>${esc(L === 'en' ? q[1] : q[0])}</b><i class="num">${l[1]} ml</i></span></div>`; }).join('');
  const tml = lay.reduce((a, l) => a + l[1], 0);
  h += `<div class="xr-tot" style="top:${f1(H - 46)}px"><b class="num">${nf(tml)} ml</b> · ${esc(t('glass'))}</div>`;
  xr.innerHTML = h;
  const og = $('.og', xr), ls = $$('.og-l', xr), sh = $('.og-s', xr), gar = $('.og-g', xr), orbs = $$('.orb', xr), lines = $$('.ol line', xr), tot = $('.xr-tot', xr);
  orbs.forEach(o => { o.style.left = f1(W / 2) + 'px'; o.style.top = f1(gy + Hg * .5) + 'px'; });
  og.style.opacity = photoOf(it) ? 0 : 1;
  return {
    H, m: 'orbs', delay: 260, keep: false, photo: photoOf(it) ? { tf: 'scale(1.06)', op: .14 } : { tf: '', op: 0 },
    play(make) { const D = reduced ? 0 : 1; og.style.opacity = 1;
      const burst = () => setTimeout(() => {
        ls.forEach((g, i) => { g.style.transform = `translateY(${f1(-(i - (n - 1) / 2) * 15 - 6)}px)`; });
        sh.style.opacity = .35; if (gar) gar.style.transform = 'translate(16px,-34px) rotate(16deg)';
        orbs.forEach((o, j) => { const p = pos[j]; o.style.transitionDelay = (D ? j * 55 : 0) + 'ms'; o.style.opacity = 1; o.style.transform = `translate(calc(-50% + ${f1(p.x - W / 2)}px),calc(-50% + ${f1(p.y - gy - Hg * .5)}px)) scale(1)`; });
        lines.forEach(l => l.classList.add('on')); tot.classList.add('on');
      }, D && photoOf(it) && !make ? 260 : 20);
      if (make && canMake(it)) makeScene(it, xr, { W, H, gx, gy, Wg, Hg, kk, vb, geo, lay, ls, gar, og, n, g: GLASS[it.glass] || GLASS.highball }).then(burst);
      else burst();
    },
    back() {
      ls.forEach(g => { g.style.transform = ''; }); sh.style.opacity = ''; if (gar) gar.style.transform = '';
      orbs.forEach(o => { o.style.transitionDelay = '0ms'; o.style.opacity = 0; o.style.transform = ''; }); lines.forEach(l => l.classList.remove('on')); tot.classList.remove('on');
      if (photoOf(it)) setTimeout(() => { og.style.opacity = 0; }, 380);
    }
  };
}

// ---------- ŠANKER: koktel nastaje pred gostom (led, točenje, gnječenje, mućkanje, ukras), pa se pokažu sastojci
const POUR_PACK = { rum: 'bacardi', rum_dark: 'bacardi-negra', vodka: 'smirnoff', gin: 'gin-origin', tequila: 'tequila', cola: 'coca-cola', sprite: 'sprite', guarana: 'guarana', prosecco: 'prosecco-bellussi', cranberry: 'finlandia' };
const JUICE = ['oj', 'orange', 'pineapple', 'blueberry', 'apple', 'grapefruit', 'raspberry', 'carrot', 'beet', 'banana'];
let PD = null;
const packDim = p => { if (!PD) { PD = {}; U.drinks.forEach(d => { if (d.pack && d.pw) PD[d.pack] = [d.pw, d.ph]; }); } return PD[p]; };
const canMake = it => it.kind === 'drink' && it.cat === 'kokteli' && !reduced;
let MK = 0;
const wait = ms => new Promise(r => setTimeout(r, ms));
const anim = (el, kf, o) => el.animate(kf, Object.assign({ fill: 'forwards', easing: 'cubic-bezier(.2,.8,.2,1)' }, o)).finished.catch(() => {});
const bottleSVG = c => `<svg viewBox="0 0 40 120" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h8v24q0 6 8 14q6 6 6 16v54q0 6-6 6H8q-6 0-6-6V58q0-10 6-16q8-8 8-14z" fill="#18292d" stroke="rgba(241,234,223,.55)" stroke-width="1.5"/><path d="M4.5 60h31v50q0 4-4 4h-23q-4 0-4-4z" fill="${c}" opacity=".9"/><rect x="5" y="70" width="30" height="20" rx="2" fill="#F1EADF" opacity=".9"/><rect x="10" y="77" width="20" height="2.4" rx="1" fill="#A9834F"/><rect x="14" y="0" width="12" height="8" rx="2" fill="#CFA670"/><path d="M9 52v52" stroke="#fff" stroke-opacity=".28" stroke-width="2.5" stroke-linecap="round"/></svg>`;
const carafeSVG = c => `<svg viewBox="0 0 50 80" xmlns="http://www.w3.org/2000/svg"><path d="M15 3h20l-3 15q14 9 14 28v22q0 8-8 8H12q-8 0-8-8V46q0-19 14-28z" fill="rgba(241,234,223,.1)" stroke="rgba(241,234,223,.6)" stroke-width="1.5"/><path d="M5.5 38h39v30q0 6-6 6h-27q-6 0-6-6z" fill="${c}" opacity=".9"/><path d="M11 30v38" stroke="#fff" stroke-opacity=".3" stroke-width="2.5" stroke-linecap="round"/></svg>`;
const citrusSVG = ([a, b]) => `<svg viewBox="0 0 60 34" xmlns="http://www.w3.org/2000/svg"><path d="M2 32a28 28 0 0 1 56 0z" fill="${a}"/><path d="M6.5 32a23.5 23.5 0 0 1 47 0z" fill="${b}"/><path d="M30 32V10M30 32 14 17M30 32l16-15M30 32 8 27M30 32l22-5" stroke="${a}" stroke-width="1.6" opacity=".7"/></svg>`;
const wheelSVG = ([a, b]) => `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="19" fill="${a}"/><circle cx="20" cy="20" r="15.5" fill="${b}"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<path d="M20 20L${f1(20 + 15 * Math.cos(k * Math.PI / 4))} ${f1(20 + 15 * Math.sin(k * Math.PI / 4))}" stroke="${a}" stroke-width="1.4" opacity=".75"/>`).join('')}<circle cx="20" cy="20" r="2" fill="${a}"/></svg>`;
const shakerSVG = `<svg viewBox="0 0 50 120" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="mkshg" x1="0" x2="1"><stop offset="0" stop-color="#7d888c"/><stop offset=".32" stop-color="#eef3f4"/><stop offset=".6" stop-color="#b5bfc2"/><stop offset="1" stop-color="#667175"/></linearGradient></defs><rect x="19" y="1" width="12" height="9" rx="3" fill="url(#mkshg)"/><path d="M13 10h24l3 18H10z" fill="url(#mkshg)"/><path d="M8 28h34l-4 84q0 5-5 5H17q-5 0-5-5z" fill="url(#mkshg)"/><path d="M8 28h34" stroke="#59646a" stroke-width="1.4"/></svg>`;
function makeScene(it, xr, c) {
  const tok = ++MK, alive = () => MK === tok && CUR === it && xr.isConnected;
  const { W, H, gx, gy, Wg, Hg, kk, vb, geo, lay, ls, gar, og, n, g } = c;
  const X = x => gx + (x - vb[0]) * kk, Y = y => gy + (y - vb[1]) * kk;
  const cx = X(100), rimY = Y(g.top) - 4, botY = Y(g.bot), inW = Math.max(30, g.hw((g.top + g.bot) / 2) * 2 * kk);
  const pct = y => Math.max(0, Math.min(100, (y - vb[1]) / vb[3] * 100)).toFixed(2);
  const fx = [], add = html => { xr.insertAdjacentHTML('beforeend', html); const el = xr.lastElementChild; fx.push(el); return el; };
  const has = k => lay.some(l => l[0] === k), straw = !!(g.straw && gar);
  ls.forEach((el, i) => { el.style.clipPath = `inset(${pct(geo[i].y1)}% 0 0 0)`; el.style.opacity = 0; });
  if (gar) { gar.style.transition = 'none'; gar.style.opacity = 0; }
  const cap = add(`<div class="mk-cap" style="top:${f1(H - 56)}px"><span class="mk-t"></span><button type="button" class="mk-skip">${esc(t('mk_skip'))}</button></div>`), tt = $('.mk-t', cap);
  const say = s => { tt.style.opacity = 0; setTimeout(() => { tt.textContent = s; tt.style.opacity = 1; }, 110); };
  requestAnimationFrame(() => cap.classList.add('on'));
  let fin = false, ok; const done = new Promise(r => { ok = r; });
  const finish = () => { if (fin) return; fin = true; if (MK === tok) MK = 0;
    [og, ...ls].forEach(el => el.getAnimations().forEach(a => a.cancel())); ls.forEach(el => { el.style.clipPath = ''; el.style.opacity = ''; });
    if (gar) { gar.getAnimations().forEach(a => a.cancel()); gar.style.opacity = ''; gar.style.transition = ''; }
    fx.forEach(el => { if (el === cap) return; el.getAnimations().forEach(a => a.cancel()); el.style.transition = 'opacity .35s'; el.style.opacity = 0; setTimeout(() => el.remove(), 420); });
    cap.style.transition = 'opacity .16s'; cap.classList.remove('on'); setTimeout(() => cap.remove(), 300); setTimeout(ok, 140);
  };
  $('.mk-skip', cap).onclick = e => { e.stopPropagation(); finish(); };
  const st = $('#st'), tap = e => { if (fin || e.target.closest('#splitBtn')) return; finish(); }; st.addEventListener('pointerdown', tap, { once: true });
  const reveal = (i, dur, delay = 0) => ls[i].animate([{ clipPath: `inset(${pct(geo[i].y1)}% 0 0 0)`, opacity: 1 }, { clipPath: `inset(${pct(geo[i].y0 - 10)}% 0 0 0)`, opacity: 1 }], { duration: dur, delay, easing: 'cubic-bezier(.3,.6,.4,1)', fill: 'forwards' });
  // izvor sipanja: prava flaša kad je imamo, inače nacrtana flaša ili bokal
  const source = (k, col) => {
    const p = POUR_PACK[k], dm = p && packDim(p);
    if (dm) { const ar = dm[0] / dm[1], h = Math.min(176, Hg * (ar < .45 ? .74 : .48)); return { html: `<img src="${packSrc(p, 1)}" alt="">`, w: h * ar, h, ang: ar < .45 ? 126 : 112 }; }
    if (JUICE.includes(k)) { const h = Math.min(118, Hg * .5); return { html: carafeSVG(col), w: h * .62, h, ang: 116 }; }
    const h = Math.min(150, Hg * .66); return { html: bottleSVG(col), w: h / 3, h, ang: 126 };
  };
  const pourFrom = async (k, col, N, toY, dur, onPour) => {
    const s = source(k, col), a = s.ang * Math.PI / 180, ox = s.h / 2 * Math.sin(a), oy = -s.h / 2 * Math.cos(a);
    const bx = N.x - ox - s.w / 2, by = N.y - oy - s.h / 2;
    const b = add(`<div class="mk-b" style="left:${f1(bx)}px;top:${f1(by)}px;width:${f1(s.w)}px;height:${f1(s.h)}px">${s.html}</div>`);
    await anim(b, [{ opacity: 0, transform: `translate(-34px,-40px) rotate(${s.ang - 95}deg)` }, { opacity: 1, transform: `rotate(${s.ang}deg)` }], { duration: 200 });
    if (!alive()) return;
    const sh = Math.max(8, toY - N.y), sm = add(`<i class="mk-st" style="left:${f1(N.x)}px;top:${f1(N.y)}px;height:${f1(sh)}px;background:linear-gradient(180deg,${col},${col}cc)"></i>`);
    anim(sm, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 130, easing: 'linear' });
    if (onPour) onPour();
    await wait(dur);
    sm.style.transformOrigin = '50% 100%'; anim(sm, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: 120, easing: 'linear' });
    anim(b, [{ opacity: 1, transform: `rotate(${s.ang}deg)` }, { opacity: 0, transform: `translate(-28px,-44px) rotate(${s.ang - 70}deg)` }], { duration: 210 });
    await wait(60);
  };
  const ice = async li => {
    const s = Math.min(30, Math.max(16, inW * .3)), base = li != null ? Y(geo[li].y1) : botY, xs = [-.22, .17, -.02], ys = [1.04, 1.18, 2.02];
    xs.forEach((dx, j) => { const el = add(`<i class="mk-ice" style="left:${f1(cx + dx * inW - s / 2)}px;top:${f1(base - s * ys[j])}px;width:${f1(s)}px;height:${f1(s)}px"></i>`);
      anim(el, [{ opacity: 0, transform: `translateY(${f1(-(base - rimY) - 70)}px) rotate(${j * 30 - 40}deg)` }, { opacity: 1, transform: `rotate(${j * 9 - 6}deg)` }], { duration: 430, delay: j * 95, easing: 'cubic-bezier(.3,1.35,.55,1)' }); });
    if (li != null) reveal(li, 440, 180);
    await wait(480);
  };
  const squeeze = async (k, i, P) => {
    const col = k === 'lime' ? ['#7fb53c', '#cfe892'] : ['#efc531', '#fbe98a'], w = Math.min(60, Math.max(40, Wg * .44)), h = w * .57;
    const el = add(`<div class="mk-cit" style="left:${f1(cx - w / 2)}px;top:${f1(rimY - h - 30)}px;width:${f1(w)}px;height:${f1(h)}px">${citrusSVG(col)}</div>`);
    await anim(el, [{ opacity: 0, transform: 'translateY(-26px)' }, { opacity: 1, transform: 'none' }], { duration: 180 });
    el.animate([{ transform: 'scale(1,1)' }, { transform: 'scale(1.1,.7)' }, { transform: 'scale(1,1)' }, { transform: 'scale(1.1,.7)' }, { transform: 'scale(1,1)' }], { duration: P * .85 });
    [0, 1, 2].forEach(j => { const d = add(`<i class="mk-drop" style="left:${f1(cx - 3 + (j - 1) * 8)}px;top:${f1(rimY - 30)}px;background:${col[1]}"></i>`);
      anim(d, [{ opacity: 1, transform: 'translateY(0)' }, { opacity: .85, transform: `translateY(${f1(Y(geo[i].y1) - rimY + 22)}px)` }, { opacity: 0, transform: `translateY(${f1(Y(geo[i].y1) - rimY + 26)}px)` }], { duration: 460, delay: 60 + j * 130, easing: 'cubic-bezier(.5,0,1,1)' }); });
    reveal(i, P - 60, 180); await wait(P);
    anim(el, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-22px)' }], { duration: 200 });
  };
  const sprinkle = async (k, i, P) => {
    const leaf = k === 'mint', m = leaf ? 5 : 9;
    for (let j = 0; j < m; j++) { const el = add(`<i class="${leaf ? 'mk-leaf' : 'mk-gr'}" style="left:${f1(cx - inW * .3 + (j * 37 % 60) / 60 * inW * .6)}px;top:${f1(rimY - 34)}px"></i>`);
      anim(el, [{ opacity: 0, transform: `translateY(-10px) rotate(${j * 47}deg)` }, { opacity: 1, offset: .2 }, { opacity: 1, transform: `translateY(${f1(Y(geo[i].y0) - rimY + 30 + (j % 3) * 4)}px) rotate(${j * 47 + 160}deg)` }], { duration: 520, delay: j * 45, easing: 'cubic-bezier(.4,0,.8,1)' }); }
    reveal(i, P - 80, 200); await wait(P);
  };
  const muddle = async () => {
    say(t('mk_muddle'));
    const w = Math.max(9, Wg * .075), h = (botY - rimY) + 76, el = add(`<i class="mk-mud" style="left:${f1(cx - w / 2)}px;top:${f1(botY - h - 4)}px;width:${f1(w)}px;height:${f1(h)}px"></i>`);
    await anim(el, [{ opacity: 0, transform: `translateY(${f1(-h * .5)}px)` }, { opacity: 1, transform: 'translateY(-12px)' }], { duration: 260 });
    await anim(el, [{ transform: 'translateY(-12px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-18px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-18px)' }], { duration: 420, easing: 'ease-in-out' });
    anim(el, [{ opacity: 1, transform: 'translateY(-18px)' }, { opacity: 0, transform: `translateY(${f1(-h * .6)}px)` }], { duration: 240 });
    await wait(150);
  };
  const garnish = async () => {
    const lime = has('lime') ? ['#7fb53c', '#cfe892'] : has('oj') || has('orange') ? ['#ee8b23', '#fbc066'] : has('lemon') ? ['#efc531', '#fbe98a'] : null;
    if (!straw && !lime) return;
    say(t(straw ? 'mk_straw' : 'mk_garnish'));
    if (straw) { gar.style.opacity = 1; anim(gar, [{ opacity: 0, transform: 'translateY(-70px) rotate(-6deg)' }, { opacity: 1, transform: 'none' }], { duration: 440, easing: 'cubic-bezier(.3,1.3,.6,1)' }); }
    if (lime) { const r = Math.min(22, Math.max(14, Wg * .16)), rx = X(100 + g.hw(g.top)) - r * .35;
      const el = add(`<div class="mk-wheel" style="left:${f1(rx - r)}px;top:${f1(rimY - r * .95)}px;width:${f1(r * 2)}px;height:${f1(r * 2)}px">${wheelSVG(lime)}</div>`);
      anim(el, [{ opacity: 0, transform: 'translateY(-40px) rotate(-90deg) scale(.6)' }, { opacity: 1, transform: 'rotate(0) scale(1)' }], { duration: 460, delay: 120, easing: 'cubic-bezier(.3,1.3,.6,1)' }); }
    await wait(480);
  };
  const run = async () => {
    say(t('mk_start').replace('{n}', nm(it)));
    await anim(og, [{ opacity: 0, transform: 'translateY(16px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 300 }); if (!alive()) return;
    await wait(100); if (!alive()) return;
    const shaken = it.glass === 'martini', P = Math.max(280, Math.min(400, 2000 / n)), iceL = lay.findIndex(l => l[0] === 'ice');
    const N0 = { x: cx + inW * .12, y: rimY - 10 };
    if (!shaken && iceL < 0) { say(t('mk_ice')); await ice(); if (!alive()) return; }
    let shk = null, sw = 0, sh2 = 0, sx = 0, sy = 0;
    if (shaken) { sw = Math.min(54, Math.max(40, Wg * .36)); sh2 = sw * 2.4; sx = Math.min(W - sw - 10, X(100 + g.hw(g.top)) + 16); sy = rimY + 16;
      shk = add(`<div class="mk-shk" style="left:${f1(sx)}px;top:${f1(sy)}px;width:${f1(sw)}px;height:${f1(sh2)}px">${shakerSVG}</div>`);
      await anim(shk, [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], { duration: 300 }); }
    const mud = has('mint') ? Math.max(...['sugar', 'mint', 'lemon', 'lime'].map(k => lay.findIndex(l => l[0] === k))) : -1;
    const order = [...lay.keys()].filter(i => lay[i][0] !== 'grenadine').concat([...lay.keys()].filter(i => lay[i][0] === 'grenadine'));
    for (const i of order) {
      if (!alive()) return;
      const k = lay[i][0], q = U.lq[k] || ['', '', '#ccc'];
      if (k === 'ice') { say(t('mk_ice')); await ice(i); continue; }
      say(`${L === 'en' ? q[1] : q[0]} · ${lay[i][1]} ml`);
      if (shaken) await pourFrom(k, q[2], { x: sx + sw / 2, y: sy - 8 }, sy + 12, P * .55);
      else if (k === 'lemon' || k === 'lime') await squeeze(k, i, P);
      else if (k === 'sugar' || k === 'mint') await sprinkle(k, i, P);
      else await pourFrom(k, q[2], N0, Y(geo[i].y1), P - 130, () => reveal(i, P - 40));
      if (!alive()) return;
      if (i === mud) await muddle();
    }
    if (shaken) {
      say(t('mk_shake'));
      await anim(shk, [{ transform: 'rotate(0)' }, { transform: 'translateY(-10px) rotate(-16deg)' }, { transform: 'translateY(4px) rotate(14deg)' }, { transform: 'translateY(-10px) rotate(-16deg)' }, { transform: 'translateY(4px) rotate(14deg)' }, { transform: 'translateY(-6px) rotate(-10deg)' }, { transform: 'rotate(0)' }], { duration: 660, easing: 'ease-in-out' });
      if (!alive()) return;
      say(t('mk_strain'));
      const a = 128 * Math.PI / 180, ox = sh2 / 2 * Math.sin(a), oy = -sh2 / 2 * Math.cos(a), M = { x: cx + inW * .08, y: rimY - 12 };
      const tx = (M.x - ox - sw / 2) - sx, ty = (M.y - oy - sh2 / 2) - sy;
      await anim(shk, [{ transform: 'rotate(0)' }, { transform: `translate(${f1(tx * .5)}px,${f1(ty - 40)}px) rotate(40deg)` }, { transform: `translate(${f1(tx)}px,${f1(ty)}px) rotate(128deg)` }], { duration: 440 });
      if (!alive()) return;
      const sm = add(`<i class="mk-st" style="left:${f1(M.x)}px;top:${f1(M.y)}px;height:${f1(botY - M.y)}px;background:linear-gradient(180deg,${(U.lq[lay[n - 1][0]] || ['', '', '#c33'])[2]},${(U.lq[lay[0][0]] || ['', '', '#c33'])[2]})"></i>`);
      anim(sm, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 140, easing: 'linear' });
      for (let i = 0; i < n; i++) reveal(i, 240, i * 160);
      await wait(n * 160 + 180);
      sm.style.transformOrigin = '50% 100%'; anim(sm, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: 120, easing: 'linear' });
      anim(shk, [{ opacity: 1, transform: `translate(${f1(tx)}px,${f1(ty)}px) rotate(128deg)` }, { opacity: 0, transform: `translate(${f1(tx - 50)}px,${f1(ty - 50)}px) rotate(60deg)` }], { duration: 300 });
      await wait(200);
    }
    if (!alive()) return;
    await garnish(); if (!alive()) return;
    say(t('mk_done')); await wait(460);
  };
  run().then(() => { if (alive()) finish(); });
  return done;
}

// ---------- kolači u čaši i kriške: trake fotografije se razmiču po slojevima
function buildBands(xr, it, comps, W, pr) {
  const x = it.x, b = x.b, nb = b.length - 1, src = cutSrc(it);
  const Wt = Math.min(W * .48, 250, (it.cw / it.ch) * 330), Ht = Wt * it.ch / it.cw, x0 = Math.max(12, W * .045), top0 = 92, gap = Math.max(12, Math.min(22, 120 / nb));
  const lidUp = x.lid ? 34 : 0;
  const yOf = i => top0 + lidUp + b[i] * Ht + i * gap - (x.lid && i === 0 ? lidUp : 0);
  const lx = x0 + Wt + 22, lw = W - lx - 12;
  const bandsL = [], wantY = [];
  for (let i = 0; i < nb; i++) if (x.lab[i] >= 0 && comps[x.lab[i]]) { bandsL.push(i); wantY.push(yOf(i) + (b[i + 1] - b[i]) * Ht / 2); }
  const LC = bandsL.map(i => comps[x.lab[i]]);
  const LP = labelsRight(xr, LC, wantY, lx, lw);
  const H = Math.max(yOf(nb - 1) + (b[nb] - b[nb - 1]) * Ht, LP.bottom) + 96;
  let h = '';
  for (let i = 0; i < nb; i++) h += `<div class="bd${x.lid && i === 0 ? ' lid' : ''}" style="width:${f1(pr.w)}px;height:${f1(pr.h)}px;background-image:url(${src});clip-path:inset(${f1(b[i] * 100 - .4)}% 0 ${f1((1 - b[i + 1]) * 100 - .4)}% 0)"></div>`;
  h += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${bandsL.map((i, j) => leader(x0 + Wt * .9, wantY[j], lx, LP.anchors[j])).join('')}</svg>`;
  h += LC.map((c, j) => lab(c, lx, LP.tops[j], lw)).join('') + totLine(it, H - 50);
  xr.innerHTML = h;
  const els = $$('.bd', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), tot = $('.xr-tot', xr), s = Wt / pr.w;
  const at = `translate(${f1(pr.x)}px,${f1(pr.y)}px)`;
  els.forEach(el => { el.style.transition = 'none'; el.style.transform = at; });
  return {
    H, m: 'bands', delay: 360, photo: { tf: '', op: 0 },
    play() { const D = reduced ? 0 : 1;
      els.forEach((el, i) => { el.style.transition = ''; el.style.transitionDelay = (D ? 80 + i * 60 : 0) + 'ms'; el.style.transform = `translate(${f1(x0)}px,${f1(yOf(i) - b[i] * Ht)}px) scale(${s.toFixed(4)})`; });
      lbs.forEach((el, i) => { el.style.transitionDelay = (D ? 420 + i * 60 : 0) + 'ms'; el.classList.add('on'); });
      paths.forEach((p, i) => { p.style.transitionDelay = (D ? 460 + Math.floor(i / 2) * 60 : 0) + 'ms'; p.classList.add('on'); });
      tot.style.transitionDelay = (D ? 600 + nb * 60 : 0) + 'ms'; tot.classList.add('on');
    },
    back() {
      lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); }); tot.classList.remove('on');
      els.forEach((el, i) => { el.style.transitionDelay = (i * 25) + 'ms'; el.style.transform = at; });
    }
  };
}

// ---------- kolači u čaši i kriške: nacrtana čaša (ili tanjirić) iz koje izlaze slojevi
const PK = { fruit_fill: ['#b3213d', 'berries'], cheese_cream: ['#f4ede0', 'cream'], plazma: ['#c38c52', 'crumb'], puff: ['#e6c48a', 'puff'], cherry_fill: ['#7a1023', 'cherries'],
  vanilla_cream: ['#f5e2a2', 'cream'], cocoa: ['#4b2a17', 'dust'], mascarpone_cream: ['#f3e9d4', 'cream'], ladyfinger: ['#b5743c', 'sponge'], choc_mousse: ['#5a2f1e', 'mousse'],
  brownie: ['#3a2113', 'crumb'], fruit: ['#d9443d', 'fruitmix'], vanilla_mousse: ['#f6e9c4', 'cream'], biscuit_base: ['#c28a4c', 'crumb'], whip: ['#fbf6ec', 'whip'],
  nut_crust: ['#a0703f', 'grain'], milk_choc: ['#7a4a2a', 'glaze'], nougat: ['#ad7746', 'cream'], choc_cream: ['#6a3c22', 'cream'], choc_sponge: ['#4a2a18', 'sponge'],
  dark_choc: ['#2d190f', 'glaze'], apricot: ['#e8982a', 'jam'], caramel: ['#c27b2b', 'glaze'], milk_sponge: ['#f2dca8', 'sponge'], peanut: ['#c8955a', 'cream'], dates: ['#5a3420', 'crumb'] };
const pkOf = c => { const v = PK[c.a] || ['#c9a06a', 'cream']; return { c: v[0], k: v[1] }; };
const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16), f = v => Math.max(0, Math.min(255, Math.round(k >= 0 ? v + (255 - v) * k : v * (1 + k)))); return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(v => f(v).toString(16).padStart(2, '0')).join(''); };
function sideTex(k, c, x, y, w, h, R) {
  let s = ''; const n = Math.max(6, Math.round(w * h / 230));
  if (k === 'sponge') for (let i = 0; i < n; i++) s += `<ellipse cx="${f1(x + R() * w)}" cy="${f1(y + R() * h)}" rx="${f1(1.4 + R() * 3)}" ry="${f1(1 + R() * 2)}" fill="${shade(c, -.38)}" opacity=".55"/>`;
  if (k === 'crumb') for (let i = 0; i < n; i++) s += `<circle cx="${f1(x + R() * w)}" cy="${f1(y + R() * h)}" r="${f1(1.2 + R() * 2.6)}" fill="${R() > .5 ? shade(c, .35) : shade(c, -.35)}" opacity=".7"/>`;
  if (k === 'grain') for (let i = 0; i < n; i++) { const gx = x + R() * w, gy = y + R() * h; s += R() > .2 ? `<ellipse cx="${f1(gx)}" cy="${f1(gy)}" rx="3.4" ry="2" fill="#e3c38c" opacity=".85" transform="rotate(${f1(R() * 180)} ${f1(gx)} ${f1(gy)})"/>` : `<path d="M${f1(gx)} ${f1(gy)}q3 -4 6 0t6 0" stroke="#6b3f1f" stroke-width="2.4" fill="none"/>`; }
  if (k === 'cream' || k === 'mousse' || k === 'whip') for (let i = 0; i < 3; i++) { const yy = y + h * (.25 + i * .25); s += `<path d="M${f1(x)} ${f1(yy)}q${f1(w / 8)} -3 ${f1(w / 4)} 0t${f1(w / 4)} 0t${f1(w / 4)} 0t${f1(w / 4)} 0" stroke="#fff" stroke-opacity="${k === 'mousse' ? .07 : .16}" stroke-width="1.4" fill="none"/>`; }
  if (k === 'mousse') for (let i = 0; i < n * .6; i++) s += `<circle cx="${f1(x + R() * w)}" cy="${f1(y + R() * h)}" r="${f1(.8 + R() * 1.4)}" fill="#fff" opacity=".1"/>`;
  if (k === 'puff') for (let yy = y + 2; yy < y + h; yy += 3.2) s += `<path d="M${f1(x)} ${f1(yy)}q${f1(w / 6)} ${f1(R() * 1.6 - .8)} ${f1(w / 3)} 0t${f1(w / 3)} 0t${f1(w / 3)} 0" stroke="${shade(c, -.28)}" stroke-width=".9" fill="none" opacity=".75"/>`;
  if (k === 'berries' || k === 'cherries') for (let i = 0; i < n * .7; i++) s += `<circle cx="${f1(x + R() * w)}" cy="${f1(y + R() * h)}" r="${f1(2.4 + R() * 3.4)}" fill="${['#5b1a5e', '#9e1235', '#2e1847', '#c0263f'][Math.floor(R() * 4)]}" opacity=".85"/>`;
  if (k === 'fruitmix') for (let i = 0; i < n * .6; i++) s += `<rect x="${f1(x + R() * w - 3)}" y="${f1(y + R() * h - 3)}" width="${f1(5 + R() * 5)}" height="${f1(4 + R() * 4)}" rx="1.5" fill="${['#e2392f', '#79b33c', '#f3a12a', '#3b2a6e', '#f4d35e'][Math.floor(R() * 5)]}" opacity=".9"/>`;
  if (k === 'jam' || k === 'glaze') s += `<rect x="${f1(x)}" y="${f1(y + h * .18)}" width="${f1(w)}" height="${f1(Math.max(1.2, h * .12))}" fill="#fff" opacity=".16"/>`;
  return s;
}
function topTex(k, c, R) {
  let s = ''; const P = () => { const a = R() * 6.283, r = Math.sqrt(R()) * .92; return [100 + Math.cos(a) * 96 * r, 30 + Math.sin(a) * 30 * r]; };
  if (k === 'berries' || k === 'cherries') for (let i = 0; i < 26; i++) { const [x, y] = P(), r = k === 'cherries' ? 7 + R() * 3 : 4 + R() * 4; s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${k === 'cherries' ? '#6d0c1f' : ['#5b1a5e', '#9e1235', '#2e1847', '#c0263f', '#3f2a7a'][Math.floor(R() * 5)]}"/><circle cx="${f1(x - r * .3)}" cy="${f1(y - r * .35)}" r="${f1(r * .3)}" fill="#fff" opacity=".35"/>`; }
  if (k === 'fruitmix') for (let i = 0; i < 16; i++) { const [x, y] = P(), t2 = Math.floor(R() * 4); s += t2 === 0 ? `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="10" ry="5" fill="#e2392f"/><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="5" ry="2.4" fill="#f6a3a0"/>` : t2 === 1 ? `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="10" ry="5" fill="#7cb342"/><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="3" ry="1.5" fill="#f3f0c0"/>` : t2 === 2 ? `<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" fill="#2f2466"/>` : `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="8" ry="4.4" fill="#f4a62a"/>`; }
  if (k === 'dust') for (let i = 0; i < 260; i++) { const [x, y] = P(); s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(.6 + R() * 1.2)}" fill="${R() > .5 ? '#2a170c' : '#6b4127'}" opacity=".8"/>`; }
  if (k === 'crumb' || k === 'grain' || k === 'sponge') for (let i = 0; i < 60; i++) { const [x, y] = P(); s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(1 + R() * 2.4)}" fill="${R() > .5 ? shade(c, .3) : shade(c, -.32)}" opacity=".75"/>`; }
  if (k === 'puff') for (let i = 0; i < 120; i++) { const [x, y] = P(); s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(.7 + R() * 1.3)}" fill="#fff" opacity=".85"/>`; }
  if (k === 'whip') for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283, x = 100 + Math.cos(a) * 66, y = 30 + Math.sin(a) * 19; s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="13" fill="#fffaf0"/><circle cx="${f1(x - 4)}" cy="${f1(y - 4)}" r="4" fill="#fff"/>`; }
  if (k === 'cream' || k === 'mousse') s += `<path d="M40 30q30 -14 60 0t60 0M60 38q20 -8 40 0t40 0" stroke="#fff" stroke-opacity=".22" stroke-width="2" fill="none"/>`;
  if (k === 'jam' || k === 'glaze') s += `<ellipse cx="78" cy="22" rx="40" ry="6" fill="#fff" opacity=".22"/>`;
  return s;
}
// jedan sloj kao 3D disk (round) ili kocka (box); širina 200 jedinica, tU = debljina
function slabSVG(c, i, tU, shape) {
  const st = pkOf(c), col = st.c, id = 'sl' + (++GID), R = RNG(17 + i * 11), ry = 30;
  const defs = `<linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="${shade(col, -.4)}"/><stop offset=".3" stop-color="${col}"/><stop offset=".56" stop-color="${shade(col, .12)}"/><stop offset="1" stop-color="${shade(col, -.45)}"/></linearGradient><radialGradient id="${id}t" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="${shade(col, .22)}"/><stop offset="1" stop-color="${shade(col, -.04)}"/></radialGradient>`;
  if (shape === 'box') {
    const dy = 34, H = dy + tU + 4, fr = `M4 ${dy}H150V${dy + tU}H4Z`, rt = `M150 ${dy}L196 2V${2 + tU}L150 ${dy + tU}Z`, tp = `M4 ${dy}L50 2H196L150 ${dy}Z`;
    return { h: H, svg: `<svg viewBox="0 0 200 ${f1(H)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${defs}<clipPath id="${id}f"><path d="${fr}"/></clipPath><clipPath id="${id}p"><path d="${tp}"/></clipPath></defs>
      <path d="${rt}" fill="${shade(col, -.32)}"/><path d="${fr}" fill="url(#${id}s)"/><g clip-path="url(#${id}f)">${sideTex(st.k, col, 4, dy, 146, tU, R)}</g><path d="${tp}" fill="url(#${id}t)"/><g clip-path="url(#${id}p)" transform="translate(0 0)">${topTex(st.k, col, R).replace(/cy="([\d.]+)"/g, (m, v) => `cy="${f1(+v * 1.1)}"`)}</g><path d="M4 ${dy}H150L196 2" stroke="#fff" stroke-opacity=".3" stroke-width="1.3" fill="none"/></svg>` };
  }
  const H = 2 * ry + tU + 4, side = `M4 ${ry}V${f1(ry + tU)}A96 ${ry} 0 0 0 196 ${f1(ry + tU)}V${ry}A96 ${ry} 0 0 1 4 ${ry}Z`;
  return { h: H, svg: `<svg viewBox="0 0 200 ${f1(H)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${defs}<clipPath id="${id}c"><path d="${side}"/></clipPath><clipPath id="${id}e"><ellipse cx="100" cy="${ry}" rx="96" ry="${ry}"/></clipPath></defs>
    <path d="${side}" fill="url(#${id}s)"/><g clip-path="url(#${id}c)">${sideTex(st.k, col, 4, ry, 192, tU + ry, R)}</g><ellipse cx="100" cy="${ry}" rx="96" ry="${ry}" fill="url(#${id}t)"/><g clip-path="url(#${id}e)">${topTex(st.k, col, R)}</g><path d="M6 ${ry}A94 ${ry - 1} 0 0 0 194 ${ry}" stroke="#fff" stroke-opacity=".32" stroke-width="1.4" fill="none"/></svg>` };
}
const VS = {
  jar: { clip: 'M56 168H144V258Q144 266 136 266H64Q56 266 56 258Z', top: 174, bot: 266, fill: .9, rim: 160, hw: () => 44,
    back: '<ellipse cx="100" cy="280" rx="90" ry="10" fill="rgba(241,234,223,.07)" stroke="rgba(241,234,223,.32)" stroke-width="1.6"/><ellipse cx="100" cy="280" rx="62" ry="6" fill="none" stroke="rgba(241,234,223,.16)"/><path d="M50 160V258Q50 274 66 274H134Q150 274 150 258V160Z" fill="rgba(255,255,255,.045)"/>',
    front: '<path d="M50 160V258Q50 274 66 274H134Q150 274 150 258V160" fill="none" stroke="rgba(241,234,223,.62)" stroke-width="2.6"/><ellipse cx="100" cy="160" rx="50" ry="7" fill="none" stroke="rgba(241,234,223,.55)" stroke-width="2"/><path d="M59 178V250" stroke="#fff" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/><path d="M140 182V232" stroke="#fff" stroke-opacity=".14" stroke-width="2.4" stroke-linecap="round"/><rect x="54" y="266" width="92" height="6" rx="3" fill="rgba(255,255,255,.16)"/>',
    lid: '<path d="M24 276C20 148 44 72 100 64C156 72 180 148 176 276" fill="rgba(255,255,255,.055)" stroke="rgba(241,234,223,.58)" stroke-width="2.4"/><ellipse cx="100" cy="276" rx="76" ry="9" fill="none" stroke="rgba(241,234,223,.4)" stroke-width="1.6"/><path d="M40 238C38 162 56 104 90 86" fill="none" stroke="#fff" stroke-opacity=".32" stroke-width="5" stroke-linecap="round"/><rect x="94" y="50" width="12" height="16" rx="3" fill="rgba(241,234,223,.5)"/><circle cx="100" cy="46" r="10" fill="rgba(241,234,223,.6)"/><circle cx="97" cy="43" r="3" fill="#fff" opacity=".7"/>' },
  coupe: { clip: 'M34 112Q34 186 100 188Q166 186 166 112Z', top: 114, bot: 186, fill: .98, rim: 108, hw: y => 64 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 112) / 76, 2))),
    back: '<path d="M96 196C97 222 97 246 90 262H110C103 246 103 222 104 196Z" fill="rgba(241,234,223,.2)"/><ellipse cx="100" cy="266" rx="48" ry="8" fill="rgba(241,234,223,.1)" stroke="rgba(241,234,223,.45)" stroke-width="1.8"/><path d="M28 108Q28 194 100 196Q172 194 172 108Z" fill="rgba(255,255,255,.045)"/>',
    front: '<path d="M28 108Q28 194 100 196Q172 194 172 108" fill="none" stroke="rgba(241,234,223,.62)" stroke-width="2.6"/><ellipse cx="100" cy="108" rx="72" ry="10" fill="none" stroke="rgba(241,234,223,.55)" stroke-width="2"/><path d="M42 124Q46 168 76 182" stroke="#fff" stroke-opacity=".32" stroke-width="4" fill="none" stroke-linecap="round"/>' },
  tulip: { clip: 'M52 70C50 150 62 196 100 200C138 196 150 150 148 70Z', top: 76, bot: 198, fill: .92, rim: 64, hw: y => y < 120 ? 47 : 47 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 120) / 82, 2))),
    back: '<path d="M96 208C97 228 97 248 90 262H110C103 248 103 228 104 208Z" fill="rgba(241,234,223,.2)"/><ellipse cx="100" cy="266" rx="46" ry="8" fill="rgba(241,234,223,.1)" stroke="rgba(241,234,223,.45)" stroke-width="1.8"/><path d="M46 64C44 154 58 206 100 210C142 206 156 154 154 64Z" fill="rgba(255,255,255,.045)"/>',
    front: '<path d="M46 64C44 154 58 206 100 210C142 206 156 154 154 64" fill="none" stroke="rgba(241,234,223,.62)" stroke-width="2.6"/><ellipse cx="100" cy="64" rx="54" ry="9" fill="none" stroke="rgba(241,234,223,.55)" stroke-width="2"/><path d="M56 84C55 140 62 172 78 190" stroke="#fff" stroke-opacity=".32" stroke-width="4" fill="none" stroke-linecap="round"/>' },
  plate: { rim: 252, back: '<ellipse cx="100" cy="262" rx="98" ry="22" fill="#000" opacity=".35"/><ellipse cx="100" cy="256" rx="98" ry="22" fill="#e9e1d2"/><ellipse cx="100" cy="256" rx="72" ry="15" fill="none" stroke="#cfc3ab" stroke-width="1.6"/><ellipse cx="100" cy="256" rx="94" ry="20" fill="none" stroke="#b9975f" stroke-width="1.2" opacity=".6"/>', front: '' }
};
function vesselGeo(v, comps) {
  const V = VS[v], lay = comps.slice().reverse(), tot = lay.reduce((a, c) => a + c.g, 0) || 1, H = (V.bot - V.top) * V.fill;
  let hs = lay.map(c => Math.max(9, H * c.g / tot)); const k = H / hs.reduce((a, b) => a + b, 0); hs = hs.map(h => h * k);
  let y = V.bot; const geo = hs.map(h => { const r = { y0: y - h, y1: y, h }; y -= h; return r; });
  return { V, lay, geo };
}
function vesselSVG(it, comps, withLid) {
  const v = it.x.v, V = VS[v], id = 'vs' + (++GID);
  if (v === 'plate') return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${V.back}</svg>`;
  const { lay, geo } = vesselGeo(v, comps), R = RNG(5);
  const bands = lay.map((c, j) => { const st = pkOf(c), g = geo[j]; return `<g class="vb" data-j="${j}"><rect x="0" y="${f1(g.y0)}" width="200" height="${f1(g.h + .5)}" fill="${st.c}"/><rect x="0" y="${f1(g.y0)}" width="200" height="${f1(g.h + .5)}" fill="url(#${id}g)"/>${sideTex(st.k, st.c, 30, g.y0, 140, g.h, R)}<rect x="0" y="${f1(g.y0)}" width="200" height="1.4" fill="#fff" opacity=".2"/></g>`; }).join('');
  return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="${id}"><path d="${V.clip}"/></clipPath><linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".6" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient></defs>${V.back}<g clip-path="url(#${id})">${bands}</g>${V.front}</svg>`;
}
function buildLayered(xr, it, comps, W, pr) {
  const v = it.x.v, V = VS[v], glass = v !== 'plate', n = comps.length;
  const Wg = Math.min(W * .44, v === 'plate' ? 220 : 190), kk = Wg / 200, PW = Wg * (glass ? .86 : .8), x0 = Math.max(12, W * .04), gx = x0, px = gx + (Wg - PW) / 2;
  const geo = glass ? vesselGeo(v, comps).geo : null;
  // debljina slojeva prema gramaži
  const tot = comps.reduce((a, c) => a + c.g, 0) || 1, tpx = comps.map(c => Math.max(13, Math.min(54, 150 * c.g / tot)));
  const S = comps.map((c, i) => slabSVG(c, i, tpx[i] * 200 / PW, it.x.sh)), hpx = S.map(s => s.h * PW / 200);
  const top0 = 88, gap = glass ? 16 : 14;
  const yE = []; let y = top0; comps.forEach((c, i) => { yE.push(y); y += hpx[i] + gap; });
  const colEnd = y - gap, rimY = colEnd + (glass ? 40 : 26), gy = rimY - V.rim * kk, Hv = 300 * kk;
  const lx = gx + Wg + 18, lw = W - lx - 12;
  const items = comps.map(c => Object.assign({}, c, { col: pkOf(c).c }));
  const LP = labelsRight(xr, items, yE.map((yy, i) => yy + hpx[i] * .55), lx, lw);
  const H = Math.max(gy + Hv + 30, LP.bottom + 40) + 46;
  let h = `<div class="vx" style="left:${f1(gx)}px;top:${f1(gy)}px;width:${f1(Wg)}px;height:${f1(Hv)}px">${vesselSVG(it, comps)}</div>`;
  if (glass && V.lid && it.x.lid) h += `<div class="vx vlid" style="left:${f1(gx)}px;top:${f1(gy)}px;width:${f1(Wg)}px;height:${f1(Hv)}px"><svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${V.lid}</svg></div>`;
  h += comps.map((c, i) => `<div class="sl" style="width:${f1(PW)}px;z-index:${30 + n - i}">${S[i].svg}</div>`).join('');
  h += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${comps.map((c, i) => leader(px + PW * .93, yE[i] + hpx[i] * .55, lx, LP.anchors[i])).join('')}</svg>`;
  h += items.map((c, i) => lab(c, lx, LP.tops[i], lw)).join('') + totLine(it, H - 50);
  xr.innerHTML = h;
  const vx = $('.vx', xr), lid = $('.vlid', xr), sl = $$('.sl', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), tot2 = $('.xr-tot', xr), bands = $$('.vb', xr);
  // početni položaj slojeva: u čaši (traka) ili složeni na tanjiriću
  const start = comps.map((c, i) => {
    if (glass) { const j = n - 1 - i, g = geo[j], cy = gy + (g.y0 + g.h / 2) * kk, bw = 2 * V.hw(g.y0 + g.h / 2) * kk, sc = Math.max(.2, bw / PW); return `translate(${f1(gx + Wg / 2 - PW / 2)}px,${f1(cy - hpx[i] * sc / 2)}px) scale(${sc.toFixed(3)})`; }
    let yy = rimY - 4; for (let k = n - 1; k > i; k--) yy -= hpx[k] - (it.x.sh === 'box' ? 30 : 56) * PW / 200 * .98; return `translate(${f1(px)}px,${f1(yy - hpx[i])}px)`;
  });
  sl.forEach((el, i) => { el.style.transition = 'none'; el.style.opacity = glass ? 0 : 0; el.style.transform = start[i]; });
  vx.style.opacity = 0; vx.style.transform = 'scale(.94)'; if (lid) { lid.style.opacity = 0; }
  const s = Wg / Math.max(pr.w, 1) * .92, tx = gx + Wg / 2 - (pr.x + pr.w / 2) * s, ty = gy + Hv * .55 - (pr.y + pr.h / 2) * s;
  const T = [];
  const at = (ms, fn) => T.push(setTimeout(fn, reduced ? 0 : ms));
  return {
    H, m: 'layered', delay: 420, photo: { tf: `translate(${f1(tx)}px,${f1(ty)}px) scale(${s.toFixed(3)})`, op: 0 },
    play() {
      vx.style.transition = 'opacity .5s, transform .7s var(--spring)'; vx.style.opacity = 1; vx.style.transform = 'none'; if (lid) { lid.style.transition = 'opacity .5s, transform .9s var(--ease)'; lid.style.opacity = 1; }
      if (!glass) sl.forEach(el => { el.style.transition = 'opacity .45s'; el.style.opacity = 1; });
      if (lid) at(520, () => { lid.style.transform = `translate(${f1(Wg * 1.02)}px,${f1(Hv * .06)}px) rotate(8deg) scale(.7)`; lid.style.opacity = .42; });
      const t0 = lid ? 950 : 560;
      sl.forEach((el, i) => at(t0 + i * 150, () => {
        el.style.transition = 'transform .85s var(--spring), opacity .35s'; el.style.opacity = 1; el.style.transform = `translate(${f1(px)}px,${f1(yE[i])}px)`;
        const b = bands[n - 1 - i]; if (b) b.style.opacity = 0;
      }));
      lbs.forEach((el, i) => { el.style.transitionDelay = (reduced ? 0 : t0 + 260 + i * 150) + 'ms'; el.classList.add('on'); });
      paths.forEach((p, i) => { p.style.transitionDelay = (reduced ? 0 : t0 + 300 + Math.floor(i / 2) * 150) + 'ms'; p.classList.add('on'); });
      tot2.style.transitionDelay = (reduced ? 0 : t0 + 400 + n * 150) + 'ms'; tot2.classList.add('on');
    },
    back() {
      T.forEach(clearTimeout);
      lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); }); tot2.classList.remove('on');
      sl.forEach((el, i) => { el.style.transition = 'transform .6s var(--ease), opacity .45s .15s'; el.style.transform = start[i]; el.style.opacity = glass ? 0 : 1; });
      bands.forEach(b => { b.style.opacity = 1; });
      if (lid) { lid.style.transform = ''; lid.style.opacity = 1; }
      setTimeout(() => { vx.style.opacity = 0; if (lid) lid.style.opacity = 0; if (!glass) sl.forEach(el => { el.style.opacity = 0; }); }, 420);
    }
  };
}

// ---------- kupole: kolač se preseče, desna polovina odlazi, vidi se unutrašnjost i fil curi
const RNG = s => () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
function texture(kind, R, x0, y0, w, h, n) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + R() * w, y = y0 + R() * h;
    if (kind === 'crumb') s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(3 + R() * 7)}" fill="${R() > .5 ? '#fff' : '#000'}" opacity="${f1(.08 + R() * .14)}"/>`;
    else if (kind === 'cubes') s += `<rect x="${f1(x - 16)}" y="${f1(y - 14)}" width="${f1(26 + R() * 12)}" height="${f1(24 + R() * 10)}" rx="7" fill="${R() > .5 ? '#ffc94a' : '#ea7f06'}" stroke="#fff" stroke-opacity=".35" stroke-width="2" transform="rotate(${f1(R() * 60 - 30)} ${f1(x)} ${f1(y)})"/>`;
    else if (kind === 'seeds') s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="4" ry="2.4" fill="#ffe7b0" opacity=".85" transform="rotate(${f1(R() * 180)} ${f1(x)} ${f1(y)})"/>`;
    else if (kind === 'berries') s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(9 + R() * 8)}" fill="${R() > .45 ? '#3d1d6e' : '#5b2c8a'}" opacity=".9"/><circle cx="${f1(x - 3)}" cy="${f1(y - 3)}" r="3" fill="#fff" opacity=".25"/>`;
    else if (kind === 'wafer') s += `<path d="M${f1(x - 18)} ${f1(y)}h36M${f1(x)} ${f1(y - 10)}v20" stroke="#8a5a2a" stroke-width="3" opacity=".35"/>`;
  }
  return s;
}
function faceSVG(it) {
  const x = it.x, Hh = Math.round(1000 * it.ch / it.cw), id = 'cf' + it.cut, R = RNG(77);
  const pts = x.sil.map(p => `${f1(p[0] * 1000)},${f1(p[1] * Hh)}`).join(' ');
  const topY = (x.top || 0) * Hh;
  let g = `<rect x="0" y="0" width="1000" height="${Hh}" fill="${x.fill}"/><rect x="0" y="0" width="1000" height="${Hh}" fill="url(#${id}v)"/>`;
  for (let i = 0; i < 70; i++) g += `<circle cx="${f1(500 + R() * 500)}" cy="${f1(topY + R() * (Hh - topY))}" r="${f1(1.5 + R() * 3.5)}" fill="#fff" opacity="${f1(.12 + R() * .18)}"/>`;
  g += texture('crumb', R, 500, topY, 500, Hh - topY, 26).replace(/opacity="[^"]*"/g, 'opacity=".06"');
  (x.layers || []).forEach(l => { g += `<rect x="0" y="${f1(l[0] * Hh)}" width="1000" height="${f1((l[1] - l[0]) * Hh)}" fill="${l[2]}"/>` + (l[3] ? texture(l[3], R, 500, l[0] * Hh, 500, (l[1] - l[0]) * Hh, 40) : ''); });
  if (x.base) g += `<rect x="0" y="${f1(x.base.y * Hh)}" width="1000" height="${f1(Hh * (1 - x.base.y))}" fill="${x.base.c}"/>` + texture(x.base.tex || 'crumb', R, 500, x.base.y * Hh, 500, Hh * (1 - x.base.y), 60);
  if (x.ins) { const I = x.ins; g += `<ellipse cx="${I.cx * 1000}" cy="${f1(I.cy * Hh)}" rx="${I.rx * 1000}" ry="${f1(I.ry * Hh)}" fill="${I.c}"/>` + (I.tex ? `<g clip-path="url(#${id}i)">${texture(I.tex, R, I.cx * 1000 - I.rx * 1000, I.cy * Hh - I.ry * Hh, I.rx * 2000, I.ry * 2 * Hh, 26)}</g>` : '') + `<ellipse cx="${I.cx * 1000}" cy="${f1(I.cy * Hh)}" rx="${I.rx * 1000}" ry="${f1(I.ry * Hh)}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="5"/>`; }
  g += `<polygon points="${pts}" fill="none" stroke="${x.shell}" stroke-width="${f1(x.sw * 2000)}" stroke-linejoin="round"/>`;
  if (x.shell2) g += `<polygon points="${pts}" fill="none" stroke="${x.shell2}" stroke-width="${f1(x.sw * 1200)}" stroke-linejoin="round" opacity=".55" clip-path="url(#${id}t)"/>`;
  g += `<rect x="500" y="0" width="500" height="${Hh}" fill="url(#${id}g)"/><rect x="497" y="0" width="7" height="${Hh}" fill="#fff" opacity=".35"/>`;
  return `<svg class="cf-face" viewBox="0 0 1000 ${Hh}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>
    <clipPath id="${id}"><polygon points="${pts}"/></clipPath>${x.ins ? `<clipPath id="${id}i"><ellipse cx="${x.ins.cx * 1000}" cy="${f1(x.ins.cy * Hh)}" rx="${x.ins.rx * 1000}" ry="${f1(x.ins.ry * Hh)}"/></clipPath>` : ''}
    <clipPath id="${id}t"><rect x="0" y="0" width="1000" height="${f1(Hh * .45)}"/></clipPath>
    <linearGradient id="${id}v" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
    <linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient></defs>
    <clipPath id="${id}b"><rect x="0" y="${f1(topY)}" width="1000" height="${f1(Hh - topY)}"/></clipPath>
    <g clip-path="url(#${id}b)"><g clip-path="url(#${id})">${g}</g></g></svg>`;
}
function oozeSVG(it) {
  const x = it.x, Hh = Math.round(1000 * it.ch / it.cw), I = x.ins; if (!x.ooze || !I) return '';
  const sx = I.cx * 1000 + I.rx * 1000 * .55, sy = I.cy * Hh + I.ry * Hh * .55, ex = sx + 90, ey = Hh * 1.035;
  const p = `M${f1(sx)} ${f1(sy)}C${f1(sx + 40)} ${f1(sy + 30)} ${f1(sx + 70)} ${f1((sy + ey) / 2)} ${f1(ex - 6)} ${f1(ey - 40)}S${f1(ex + 4)} ${f1(ey - 8)} ${f1(ex)} ${f1(ey)}`;
  const p2 = `M${f1(I.cx * 1000 + 30)} ${f1(sy + 4)}C${f1(I.cx * 1000 + 36)} ${f1(sy + 60)} ${f1(I.cx * 1000 + 30)} ${f1(sy + 110)} ${f1(I.cx * 1000 + 34)} ${f1(Math.min(ey - 30, sy + 170))}`;
  return `<svg class="cf-ooze" viewBox="0 -10 1000 ${Hh + 120}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="top:${f1(-10 / Hh * 100)}%;height:${f1((Hh + 120) / Hh * 100)}%">
    <ellipse class="pud" cx="${f1(ex + 10)}" cy="${f1(ey + 14)}" rx="150" ry="26" fill="${x.ooze}"/><ellipse class="pud" cx="${f1(ex - 20)}" cy="${f1(ey + 8)}" rx="80" ry="10" fill="#fff" opacity=".28"/>
    <path class="drip" d="${p}" pathLength="1" stroke="${x.ooze}" stroke-width="38" stroke-linecap="round" fill="none"/>
    <path class="drip" d="${p}" pathLength="1" stroke="#fff" stroke-opacity=".3" stroke-width="9" stroke-linecap="round" fill="none" transform="translate(-9 -4)"/>
    <path class="drip d2" d="${p2}" pathLength="1" stroke="${x.ooze}" stroke-width="22" stroke-linecap="round" fill="none"/></svg>`;
}
function halvesAnchor(it, role, occ) {
  const x = it.x, top = x.top || 0, I = x.ins, by = x.base ? x.base.y : 1;
  const silTop = xx => { let best = 1; x.sil.forEach(p => { if (Math.abs(p[0] - xx) < .06 && p[1] < best) best = p[1]; }); return best; };
  if (role === 'shell') { const yy = Math.max(top, silTop(.72)); return [.72, yy + x.sw * .6]; }
  if (role === 'top') return x.topxy || [.5, top / 2];
  if (role === 'edge') return x.edge;
  if (role === 'ins' && I) return [I.cx + I.rx * .45, I.cy];
  if (role === 'base') return [.68, (by + .97) / 2];
  if (role[0] === 'L') { const l = x.layers[+role.slice(1)]; return [.7, (l[0] + l[1]) / 2]; }
  const t0 = Math.max(top, silTop(.66)) + x.sw;
  if (I) return occ ? [.66, (I.cy + I.ry + by) / 2] : [.66, (t0 + I.cy - I.ry) / 2];
  return [.66, (t0 + by) / 2];
}
function buildHalves(xr, it, comps, W, pr) {
  const x = it.x, src = cutSrc(it);
  const Wt = Math.min(W * .56, 300, (it.cw / it.ch) * 290), Ht = Wt * it.ch / it.cw, x0 = Math.max(10, W * .035), top0 = 96;
  const lx = x0 + Wt + 20, lw = W - lx - 12;
  const occ = {}, anchors = x.role.map(r => { const o = occ[r] || 0; occ[r] = o + 1; return halvesAnchor(it, r, o); });
  const items = comps.slice(0, x.role.length), wantY = anchors.map(a => top0 + a[1] * Ht);
  const LP = labelsRight(xr, items, wantY, lx, lw);
  const H = Math.max(top0 + Ht * 1.2 + 40, LP.bottom + 30) + 70;
  const tp = f1((x.top || 0) * 100);
  let h = `<div class="cf" style="width:${f1(pr.w)}px;height:${f1(pr.h)}px;--tp:${tp}%"><img class="cf-l" src="${src}" alt=""><div class="cf-in">${faceSVG(it)}</div>${oozeSVG(it)}${x.top ? `<img class="cf-rt" src="${src}" alt="">` : ''}<img class="cf-r" src="${src}" alt=""></div>`;
  h += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${anchors.map((a, i) => leader(x0 + a[0] * Wt, wantY[i], lx, LP.anchors[i])).join('')}</svg>`;
  h += items.map((c, i) => lab(c, lx, LP.tops[i], lw)).join('') + totLine(it, H - 50);
  xr.innerHTML = h;
  const cf = $('.cf', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), tot = $('.xr-tot', xr), s = Wt / pr.w;
  const at = `translate(${f1(pr.x)}px,${f1(pr.y)}px)`;
  cf.style.transition = 'none'; cf.style.transform = at;
  return {
    H, m: 'halves', delay: 520, photo: { tf: '', op: 0 },
    play() { const D = reduced ? 0 : 1;
      cf.style.transition = ''; cf.style.transform = `translate(${f1(x0)}px,${f1(top0)}px) scale(${s.toFixed(4)})`;
      setTimeout(() => { cf.classList.add('cut'); }, D ? 650 : 0);
      setTimeout(() => { cf.classList.add('flow'); }, D ? 1350 : 0);
      lbs.forEach((el, i) => { el.style.transitionDelay = (D ? 1250 + i * 80 : 0) + 'ms'; el.classList.add('on'); });
      paths.forEach((p, i) => { p.style.transitionDelay = (D ? 1290 + Math.floor(i / 2) * 80 : 0) + 'ms'; p.classList.add('on'); });
      tot.style.transitionDelay = (D ? 1600 : 0) + 'ms'; tot.classList.add('on');
    },
    back() {
      lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); }); tot.classList.remove('on');
      cf.classList.remove('flow'); setTimeout(() => cf.classList.remove('cut'), 120); setTimeout(() => { cf.style.transform = at; }, 380);
    }
  };
}

// ---------- Popsy: tri kuglice na štapićima, srednja se preseče
function popsSVG(it) {
  const w = it.cw, h = it.ch, B = it.x.balls, Hs = h + w * .62, id = 'pp' + it.cut;
  const mid = B.slice().sort((a, b) => b[2] - a[2])[0], cx = mid[0] * w, cy = mid[1] * h, r = mid[2] * w * .98;
  const sticks = B.map((b, i) => { const x = b[0] * w, y = b[1] * h + b[2] * w * .5, tx = w * .5 + (b[0] - .5) * w * .38; return `<path d="M${f1(x)} ${f1(y)}L${f1(tx)} ${f1(Hs - 6)}" stroke="url(#${id}st)" stroke-width="${f1(w * .022)}" stroke-linecap="round"/>`; }).join('');
  const R = RNG(9), spr = ['#e84a6b', '#f6c445', '#4fb3e8', '#7cc86a', '#fff', '#f08a3c', '#b16ad6'];
  let sec = `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="#3a1f10"/>`;
  for (let i = 0; i < 70; i++) { const a = R() * 6.283, rr = r * (.86 + R() * .12); sec += `<rect x="${f1(cx + Math.cos(a) * rr - 4)}" y="${f1(cy + Math.sin(a) * rr - 1.5)}" width="8" height="3" rx="1.5" fill="${spr[i % spr.length]}" transform="rotate(${f1(R() * 180)} ${f1(cx + Math.cos(a) * rr)} ${f1(cy + Math.sin(a) * rr)})"/>`; }
  sec += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * .8)}" fill="#8a5a36"/>`;
  for (let i = 0; i < 46; i++) { const a = R() * 6.283, rr = Math.sqrt(R()) * r * .74; sec += `<circle cx="${f1(cx + Math.cos(a) * rr)}" cy="${f1(cy + Math.sin(a) * rr)}" r="${f1(2 + R() * 4)}" fill="${R() > .5 ? '#c8955a' : '#5d3a20'}" opacity=".7"/>`; }
  sec += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * .8)}" fill="none" stroke="#2a150a" stroke-width="3" opacity=".6"/><circle cx="${f1(cx - r * .3)}" cy="${f1(cy - r * .35)}" r="${f1(r * .25)}" fill="#fff" opacity=".06"/>`;
  const half = side => `M${f1(cx)} ${f1(cy - r * 1.04)}A${f1(r * 1.04)} ${f1(r * 1.04)} 0 0 ${side ? 1 : 0} ${f1(cx)} ${f1(cy + r * 1.04)}Z`;
  return `<svg viewBox="0 0 ${w} ${f1(Hs)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-cx="${f1(cx / w)}" data-cy="${f1(cy / Hs)}" data-r="${f1(r / w)}">
    <defs><linearGradient id="${id}st" x1="0" x2="1"><stop offset="0" stop-color="#d9c6a3"/><stop offset=".5" stop-color="#f4ead6"/><stop offset="1" stop-color="#c2ad86"/></linearGradient>
    <clipPath id="${id}l"><path d="${half(0)}"/></clipPath><clipPath id="${id}r"><path d="${half(1)}"/></clipPath>
    <mask id="${id}m"><rect width="${w}" height="${f1(Hs)}" fill="#fff"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 1.03)}" fill="#000"/></mask></defs>
    <g class="pp-st">${sticks}</g><image class="pp-a" href="${cutSrc(it)}" width="${w}" height="${h}"/><image class="pp-m" href="${cutSrc(it)}" width="${w}" height="${h}" mask="url(#${id}m)"/>
    <g class="pp-sec" style="transform-origin:${f1(cx)}px ${f1(cy)}px">${sec}</g>
    <g class="pp-h l" style="transform-origin:${f1(cx)}px ${f1(cy)}px"><image href="${cutSrc(it)}" width="${w}" height="${h}" clip-path="url(#${id}l)"/></g>
    <g class="pp-h r" style="transform-origin:${f1(cx)}px ${f1(cy)}px"><image href="${cutSrc(it)}" width="${w}" height="${h}" clip-path="url(#${id}r)"/></g></svg>`;
}
function buildPops(xr, it, comps, W, pr) {
  const sv = $('#ph > svg'), st = $('#st'), sr = st.getBoundingClientRect(), b = sv.getBoundingClientRect();
  const ox = b.left - sr.left, oy = b.top - sr.top, kx = b.width, ky = b.height;
  const cx = ox + +sv.dataset.cx * kx, cy = oy + +sv.dataset.cy * ky, r = +sv.dataset.r * kx;
  const lx = Math.min(W - 156, cx + r * 1.55), lw = W - lx - 10;
  const anchors = [[cx + r * .93, cy - r * .32], [cx + r * .25, cy + r * .12]];
  const items = comps.slice(0, 2), wantY = [cy - r * 1.25, cy + r * 1.35];
  const LP = labelsRight(xr, items, wantY, lx, lw);
  const H = Math.max(st._h0 || st.offsetHeight, LP.bottom + 90);
  let h = `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${anchors.map((a, i) => leader(a[0], a[1], lx, LP.anchors[i])).join('')}</svg>`;
  h += items.map((c, i) => lab(c, lx, LP.tops[i], lw)).join('') + totLine(it, H - 50);
  xr.innerHTML = h;
  const lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), tot = $('.xr-tot', xr);
  return {
    H, m: 'pops', delay: 200, photo: { tf: '', op: 1 },
    play() { const D = reduced ? 0 : 1; sv.classList.add('cut');
      lbs.forEach((el, i) => { el.style.transitionDelay = (D ? 700 + i * 90 : 0) + 'ms'; el.classList.add('on'); });
      paths.forEach((p, i) => { p.style.transitionDelay = (D ? 740 + Math.floor(i / 2) * 90 : 0) + 'ms'; p.classList.add('on'); });
      tot.style.transitionDelay = (D ? 900 : 0) + 'ms'; tot.classList.add('on'); },
    back() { sv.classList.remove('cut'); lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); }); tot.classList.remove('on'); }
  };
}

// ---------------------------------------------------------------- lista
const cartCount = () => CART.reduce((a, c) => a + c.q, 0);
const cartSum = () => CART.reduce((a, c) => { const it = BY[c.id]; if (!it) return a; const p = it.var ? it.var[c.v || 0].price : it.price; return a + p * c.q; }, 0);
const plural = n => { const m10 = n % 10, m100 = n % 100; if (L === 'en') return n === 1 ? t('item1') : t('items'); return m10 === 1 && m100 !== 11 ? t('item1') : (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) ? t('items2') : t('items'); };
function addToCart(it, quiet) {
  const ex = CART.find(c => c.id === it.id && (c.v || 0) === VAR); if (ex) ex.q += QTY; else CART.push({ id: it.id, v: VAR, q: QTY });
  LS.set('cart', CART); updDock(true); hit('add', it.id);
  if (!quiet) { toast(`${t('added')} · ${nm(it)}`); setTimeout(() => history.back(), 450); }
}
function updDock(bump) {
  const n = cartCount(); $('#bagN').textContent = n; $('#bagN').classList.toggle('on', n > 0);
  $('#dock').classList.toggle('on', n > 0); $('#dockT').textContent = `${n} ${plural(n)} · ${nf(cartSum())} RSD`; $('#dockS').textContent = t('list_lead');
  if (bump) { const b = $('#bagBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
}
function cartThumb(it) {
  if (it.kind === 'cake') return `<img src="${cutSrc(it, 1)}" alt="" style="object-fit:contain">`;
  if (it.kind === 'drink') return it.img ? `<img src="${img(it.img, 1)}" alt="">` : it.pack ? `<img src="${packSrc(it.pack, 1)}" alt="" style="object-fit:contain;padding:3px">` : glassSVG(it);
  return photoOf(it) ? `<img src="${img(photoOf(it)[0], 1)}" alt="">` : `<img src="img/i/${it.id}.webp" alt="">`;
}
function sheetOpen(sh) { sh.classList.add('on'); $('#scrim').classList.add('on'); document.body.classList.add('lock'); }
function openCart() {
  const sh = $('#cart'); sh.className = 'sheet cart';
  const rows = CART.map((c, i) => { const it = BY[c.id]; if (!it) return ''; const p = it.var ? it.var[c.v || 0].price : it.price;
    return `<div class="ci"><span class="th">${cartThumb(it)}</span><span><b>${esc(nm(it))}</b><small>${it.var ? esc(nm(it.var[c.v || 0])) + ' · ' : ''}${nf(p)} RSD</small></span><div class="qty"><button data-m="${i}">−</button><b class="num">${c.q}</b><button data-p="${i}">+</button></div></div>`; }).join('');
  sh.innerHTML = `<div class="bar"><span></span><button class="rb" id="cClose" aria-label="${esc(t('close'))}">${IC.x}</button></div><div class="scroll"><h2>${esc(t('list'))}</h2><p class="lead">${esc(t('list_lead'))}</p>
    ${CART.length ? rows + `<div class="sum"><span>${t('total')}</span><b class="num">${nf(cartSum())} RSD</b></div><div style="display:grid;gap:10px;margin-top:8px"><button class="btn btn-m" id="showBtn">${IC.eye}${esc(t('show_waiter'))}</button><button class="btn btn-o" id="callBtn">${IC.bell}${esc(t('call_waiter'))}</button></div>` : `<p class="empty">${esc(t('empty'))}</p>`}
    <div class="revc in-cart"><h2>${esc(t('rev_card_t'))}</h2><p>${esc(t('rev_card_d'))}</p>${revButtons('cart')}</div></div>`;
  sheetOpen(sh);
  $('#cClose').onclick = closeCart; bindRev(sh);
  $$('[data-m]', sh).forEach(b => b.onclick = () => { const c = CART[+b.dataset.m]; c.q--; if (c.q <= 0) CART.splice(+b.dataset.m, 1); LS.set('cart', CART); updDock(); openCart(); });
  $$('[data-p]', sh).forEach(b => b.onclick = () => { CART[+b.dataset.p].q++; LS.set('cart', CART); updDock(); openCart(); });
  const sb = $('#showBtn'); if (sb) sb.onclick = showWaiter;
  const cb = $('#callBtn'); if (cb) cb.onclick = () => { toast(t('waiter_called')); hit('call', LOC); };
}
function closeCart() { $('#cart').classList.remove('on'); $('#scrim').classList.remove('on'); document.body.classList.remove('lock'); }
function showWaiter() {
  const w = $('#showW');
  w.innerHTML = `<button class="btn btn-o btn-s" id="wBack" style="color:var(--noc);border-color:rgba(11,21,23,.2);margin-bottom:18px">${esc(t('back'))}</button><h2>${esc(t('list'))}</h2><div class="t">${esc(t('guests_note'))} · ${esc(locOf(LOC).short)}</div>
   <ul>${CART.map(c => { const it = BY[c.id]; return it ? `<li><span><b>${c.q}×</b> ${esc(it.sr)}${it.var ? ` <small>(${esc(it.var[c.v || 0].sr)})</small>` : ''}</span><span class="num">${nf((it.var ? it.var[c.v || 0].price : it.price) * c.q)}</span></li>` : ''; }).join('')}</ul>
   <div style="display:flex;justify-content:space-between;font-size:26px"><b style="font-family:var(--f-d);font-weight:400">${t('total')}</b><b class="num">${nf(cartSum())} RSD</b></div>`;
  w.classList.add('on'); $('#wBack').onclick = () => w.classList.remove('on'); hit('show', LOC);
}
let toastT;
function toast(msg) { const el = $('#toast'); el.innerHTML = `${IC.bag}<span>${esc(msg)}</span>`; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 2200); }

// ---------------------------------------------------------------- Google recenzije (bez filtriranja po ocenama)
function openReviews(src, toMgr) {
  const sh = $('#cart'), g = gOf(), loc = locOf(LOC); sh.className = 'sheet cart rev';
  sh.innerHTML = `<div class="bar"><span></span><button class="rb" id="cClose" aria-label="${esc(t('close'))}">${IC.x}</button></div><div class="scroll">
    <div class="rv-sum">${IC.g}<div><b class="num">${rate(g.r)}</b>${stars(g.r)}<small>${nf(g.n)} ${esc(t('reviews'))} · ${esc(loc.name)}</small></div>
      <a class="btn btn-o btn-s" href="https://search.google.com/local/reviews?placeid=${g.pid}" target="_blank" rel="noopener">${esc(t('rev_read'))}${IC.ext}</a></div>
    <h2>${esc(t('rev_t'))}</h2><p class="lead">${esc(t('rev_lead'))}</p>${revButtons(src)}
    <form class="form mgr" id="mgrF" hidden><p class="lead" style="margin:0">${esc(t('rev_m_lead'))}</p><label>${esc(t('rev_m'))}<textarea name="m" maxlength="600" placeholder="${esc(t('rev_m_ph'))}"></textarea></label>
      <div class="two"><label>${t('name')}<input name="n" autocomplete="name"></label><label>${t('phone')}<input name="t" type="tel" autocomplete="tel"></label></div>
      <button class="btn btn-m" type="submit">${IC.chat}${esc(t('rev_m_send'))}</button></form></div>`;
  sheetOpen(sh); $('#cClose').onclick = closeCart;
  $$('[data-rv]', sh).forEach(b => b.onclick = e => { if (b.dataset.rv === 'g') { hit('grev', src); return; } e.preventDefault(); showMgr(); });
  const showMgr = () => { const f = $('#mgrF'); f.hidden = false; $('.rv-b', sh).classList.add('dim'); setTimeout(() => { f.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }); $('textarea', f).focus({ preventScroll: true }); }, 60); };
  $('#mgrF').onsubmit = e => { e.preventDefault(); hit('mgr', src); $('.scroll', sh).innerHTML = `<div class="ok-msg">${IC.ok}<h2>${esc(t('rev_m_ok'))}</h2><p class="lead">${esc(t('rev_m_demo'))}</p><button class="btn btn-o" id="okC">${esc(t('close'))}</button></div>`; $('#okC').onclick = closeCart; };
  if (toMgr) showMgr();
  hit('rev', src);
}

// ---------------------------------------------------------------- Pomozi mi da izaberem
const HELPQ = [['q1', ['light', 'meal', 'share']], ['q2', ['meat', 'fish', 'veg', 'any']], ['q3', ['coffee', 'fresh', 'wine', 'cocktail']]];
function openHelp() {
  const sh = $('#cart'); sh.className = 'sheet cart help'; const A = [];
  const step = i => {
    const [q, opts] = HELPQ[i];
    $('.scroll', sh).innerHTML = `<div class="hp-dots">${HELPQ.map((x, j) => `<i class="${j <= i ? 'on' : ''}"></i>`).join('')}</div><small class="hp-st">${t('step')} ${i + 1} / 3</small><h2>${esc(t(q))}</h2>
      <div class="hp-o">${opts.map(o => `<button data-o="${o}">${esc(t('a_' + o))}${IC.arrow}</button>`).join('')}</div>`;
    $$('.hp-o button', sh).forEach(b => b.onclick = () => { A[i] = b.dataset.o; if (i < 2) step(i + 1); else result(); });
  };
  const result = () => {
    const picks = recommend(A); hit('help', A.join('-'));
    $('.scroll', sh).innerHTML = `<small class="hp-st">${esc(t('help_t'))}</small><h2>${esc(t('pick_t'))}</h2><div class="hp-r">${picks.map(([k, it]) => `<button class="hp-c" data-id="${it.id}"><span class="th">${cartThumb(it)}</span><span><small>${esc(t(k))}</small><b>${esc(nm(it))}</b>${money(curP(it))}</span>${IC.arrow}</button>`).join('')}</div>
      <div class="sum"><span>${t('total')}</span><b class="num">${nf(picks.reduce((a, p) => a + curP(p[1]), 0))} RSD</b></div>
      <div style="display:grid;gap:10px"><button class="btn btn-m" id="hpAdd">${IC.bag}${esc(t('add_all'))}</button><button class="btn btn-o" id="hpAg">${esc(t('again'))}</button></div>`;
    $$('.hp-c', sh).forEach(b => b.onclick = () => { closeCart(); openItem(b.dataset.id); });
    $('#hpAdd').onclick = () => { picks.forEach(([, it]) => { VAR = 0; QTY = 1; addToCart(it, true); }); toast(`${t('added')} · ${picks.length} ${plural(picks.length)}`); closeCart(); };
    $('#hpAg').onclick = () => step(0);
  };
  sh.innerHTML = `<div class="bar"><span></span><button class="rb" id="cClose" aria-label="${esc(t('close'))}">${IC.x}</button></div><div class="scroll"></div>`;
  sheetOpen(sh); $('#cClose').onclick = closeCart; step(0);
}
const curP = it => it.var ? it.var[0].price : it.price;
function recommend([hun, want, drink]) {
  const seed = Math.floor(Date.now() / 6e4); let s = seed; const R = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const meat = it => (it.comps || []).some(c => c.grp === 'meso' && !['yolk', 'egg', 'egg_fried', 'omelette'].includes(c.i)), fish = it => it.cat === 'riba' || (it.comps || []).some(c => c.grp === 'riba');
  let pool = ITEMS.filter(it => {
    if (hun === 'light' && !['salate', 'obrok-salate', 'corbe', 'sendvici', 'predjela', 'slane-palacinke', 'vege'].includes(it.cat)) return false;
    if (hun === 'light' && (it.tags || []).includes('deljenje')) return false;
    if (hun === 'meal' && !['testenine', 'rizoto', 'piletina', 'curetina', 'tradicionalna', 'specijaliteti', 'riba', 'burgeri', 'italijanski', 'pica', 'vege'].includes(it.cat)) return false;
    if (hun === 'share' && !((it.tags || []).includes('deljenje') || it.cat === 'pica')) return false;
    if (want === 'meat' && !meat(it)) return false; if (want === 'fish' && !fish(it)) return false; if (want === 'veg' && !(it.tags || []).includes('vege')) return false;
    return true;
  });
  if (!pool.length) pool = ITEMS.filter(it => it.sig);
  pool.sort((a, b) => ((b.sig ? 3 : 0) + (photoOf(b) ? 2 : 0) + R()) - ((a.sig ? 3 : 0) + (photoOf(a) ? 2 : 0) + R()));
  const dish = pool[0];
  const dn = n => DR.find(d => d.sr === n);
  let dr;
  if (drink === 'coffee') dr = dn(['Cappuccino', 'Latte macchiato', 'Espresso bez mleka'][Math.floor(R() * 3)]);
  else if (drink === 'fresh') dr = dn(['Limunada aromatizovana 0,3', 'Sreća veća 0,3', 'Mojito bezalkoholni 0,3', 'Fruity soda 0,3'][Math.floor(R() * 4)]);
  else if (drink === 'cocktail') dr = dn(['Mojito', 'Aperol spritz', 'Cosmopolitan', 'Mai Tai'][Math.floor(R() * 4)]);
  else dr = fish(dish) || ['piletina', 'curetina', 'testenine', 'rizoto'].includes(dish.cat) ? dn('Chardonnay Kovačević 0,125') : ['burgeri', 'pica'].includes(dish.cat) ? dn('Heineken točeno 0,5') : dn('Kardaš, Vinarija Aleksić 0,187');
  const kp = (dish.pair || []).find(p => p.startsWith('k:'));
  const ds = (kp && BY[kp.slice(2)]) || BY[['nimfa', 'pistac-lampone', 'tiramisu', 'merry-berry'][Math.floor(R() * 4)]];
  return [['p_dish', dish], ['p_drink', dr || DR[0]], ['dessert', ds]];
}

// ---------------------------------------------------------------- torte: zahtev
function openCakeForm() {
  const sh = $('#cart'); sh.className = 'sheet cart'; const d = new Date(); d.setDate(d.getDate() + 3); const min = d.toISOString().slice(0, 10);
  sh.innerHTML = `<div class="bar"><span></span><button class="rb" id="cClose" aria-label="${esc(t('close'))}">${IC.x}</button></div><div class="scroll"><h2>${esc(t('order_cake'))}</h2><p class="lead">${esc(t('torte_lead'))}</p>
   <form class="form" id="cakeF"><label>${t('flavor')}<select name="u">${U.torte.map(x => `<option>${esc(x.sr)} · ${nf(x.price)} RSD/kg</option>`).join('')}</select></label>
   <label>${t('weight')}<div class="kgs">${[1, 1.5, 2, 3, 4].map(k => `<button type="button" data-k="${k}" aria-pressed="${k === 2}">${String(k).replace('.', ',')} kg</button>`).join('')}</div></label>
   <div class="two"><label>${t('date')}<input type="date" name="d" min="${min}" value="${min}"></label><label>${t('pickup')}<select name="p">${U.locs.map(l => `<option>${esc(l.short)}</option>`).join('')}</select></label></div>
   <label>${t('msg')}<input name="m" maxlength="40" placeholder="Srećan rođendan, Ana!"></label>
   <div class="two"><label>${t('name')}<input name="n" autocomplete="name"></label><label>${t('phone')}<input name="t" type="tel" autocomplete="tel"></label></div>
   <button class="btn btn-m" type="submit">${esc(t('send'))}</button></form></div>`;
  sheetOpen(sh); $('#cClose').onclick = closeCart;
  $$('.kgs button', sh).forEach(b => b.onclick = () => $$('.kgs button', sh).forEach(x => x.setAttribute('aria-pressed', x === b)));
  $('#cakeF').onsubmit = e => { e.preventDefault(); hit('torta', LOC); $('.scroll', sh).innerHTML = `<div class="ok-msg">${IC.ok}<h2>${esc(t('sent_t'))}</h2><p class="lead">${esc(t('sent_d'))}</p><button class="btn btn-o" id="okC">${esc(t('close'))}</button></div>`; $('#okC').onclick = closeCart; };
}

// ---------------------------------------------------------------- DEMO oznaka i ulaz
function demoBadge() {
  const b = document.createElement('button'); b.className = 'demo'; b.innerHTML = `<i></i><span class="sh-t">TipTap demo</span><span class="lg-t">${esc(t('demo_t'))}</span>`; document.body.appendChild(b);
  const p = document.createElement('div'); p.className = 'demo-p'; p.innerHTML = `<h4>${esc(t('demo_t'))}</h4><p>Tri dela istog sistema. Sve što gost uradi u meniju vidi se u upravi na ovom uređaju.</p>
   <nav><a class="cur" href="./">${IC.menu}<span><b>Digitalni meni</b><span>Ono što gost vidi za stolom</span></span></a><a href="rezervacije/">${IC.plan}<span><b>Rezervacije i tlocrt</b><span>Gost bira sto, hostesa vodi salu</span></span></a><a href="uprava/">${IC.chart}<span><b>Uprava i analitika</b><span>Promet, gosti, jelovnik, recenzije</span></span></a></nav>
   <footer>Demo podaci osim jelovnika, cena, fotografija i Google ocena (ultracaffe.rs, @ultra_caffe, Google Maps). Napravio TipTap.</footer>`;
  document.body.appendChild(p);
  b.onclick = e => { e.stopPropagation(); p.classList.toggle('on'); };
  document.addEventListener('click', e => { if (!p.contains(e.target)) p.classList.remove('on'); });
}
function intro() {
  if (SS.get('intro') || qs.has('bez-uvoda') || location.hash) return;
  const loc = locOf(LOC), el = document.createElement('div'); el.className = 'ulaz';
  el.innerHTML = `<div class="bg" style="background-image:url(img/a/${loc.hero}.webp)"></div><button class="skip">${esc(t('skip'))}</button><div class="in"><img class="lg" src="img/logo.webp" alt="Ultra Caffe"><h1>${esc(L === 'en' ? U.venue.tagline_en : U.venue.tagline)}</h1><div class="sub">Zrenjanin · ${U.locs.map(l => esc(l.short)).join(' & ')}</div><div class="acts"><button class="btn btn-m" id="goMenu">${esc(t('open_menu'))}</button></div></div>`;
  document.body.appendChild(el); document.body.classList.add('lock');
  const bg = new Image(); bg.onload = () => el.classList.add('go'); bg.src = `img/a/${loc.hero}.webp`; setTimeout(() => el.classList.add('go'), 900);
  const done = () => { SS.set('intro', '1'); el.classList.add('out'); document.body.classList.remove('lock'); setTimeout(() => el.remove(), 800); hit('open', LOC); };
  $('#goMenu', el).onclick = done; $('.skip', el).onclick = done;
}

// ---------------------------------------------------------------- jezik
function setLang(l) { L = l; LS.set('lang', l); document.documentElement.lang = l === 'en' ? 'en' : 'sr'; render(); }
function render() {
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === L));
  $('#bagBtn').setAttribute('aria-label', t('list')); $('#dockBtn').textContent = t('list');
  renderMain(); updDock();
  const d = $('.demo'); if (d) d.innerHTML = `<i></i><span class="sh-t">TipTap demo</span><span class="lg-t">${esc(t('demo_t'))}</span>`;
}

// pomoćne funkcije za pripremu sličica (build/thumbs)
function stackArt(it) {
  const main = (it.comps || []).filter(c => !c.side), shape = it.mode === 'cake' ? 'wedge' : (it.shape || 'round');
  const Ls = main.map((c, i) => it.mode === 'cake' ? K.cake(c.a, shape) : K.layer(c.a, { pos: i === 0 ? 'top' : i === main.length - 1 ? 'bottom' : 'mid', shape, seed: i }));
  const as = [0]; for (let i = 1; i < Ls.length; i++) as.push(as[i - 1] + (it.mode === 'cake' ? (Ls[i - 1].t || 40) : (Ls[i - 1].b - Ls[i].c - 6)));
  const H = as[as.length - 1] + Ls[Ls.length - 1].h;
  return `<svg viewBox="0 -30 700 ${f1(H + 60)}" xmlns="http://www.w3.org/2000/svg">` + Ls.map((o, i) => [o, i]).reverse().map(([o, i]) => o.svg.replace('<svg ', `<svg y="${f1(as[i])}" width="700" height="${f1(o.h)}" `)).join('') + '</svg>';
}
function pizzaArt(it) {
  const ls = K.pizza(curComps(it).map(c => Object.assign({}, c, { k: c.a })));
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">` + ls.map(l => l.svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<circle class="plate"[^>]*\/>/, '')).join('') + '</svg>';
}
window.__uc = { plateArt, glassSVG, stackArt, pizzaArt, boardArt, BY, U };
if (qs.has('render')) return;
skeleton(); demoBadge();
document.documentElement.lang = L === 'en' ? 'en' : 'sr';
const h0 = location.hash.slice(1);
if (h0.startsWith('g=') && grpOf(h0.slice(2))) { history.replaceState({}, '', location.pathname + location.search); render(); openGroup(h0.slice(2)); }
else { render(); intro(); if (h0.length > 1) { const id = decodeURIComponent(h0); if (BY[id]) { history.replaceState({}, '', location.pathname + location.search); openItem(id); } } }
let rzT; addEventListener('resize', () => { if (!CUR) return; const was = $('#st').classList.contains('open'); if (was) closeX(true); sizeStage(CUR); clearTimeout(rzT); if (was) rzT = setTimeout(() => autoSplit(CUR, 0, false), 250); });
})();
