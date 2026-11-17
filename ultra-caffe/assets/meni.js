/* =====================================================================
   ULTRA CAFFE · TipTap Signature demo — gost
   Meni sa „Rastavi jelo” (slojevi, gramaža, kalorije, alergeni), piće sa
   slojevima u čaši, vitrina kolača, torte po porudžbini, lista za konobara.
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
let SEC = 'jela';

const TX = {
  sr: { menu: 'Jelovnik', drinks: 'Piće', cakes: 'Kolači', torte: 'Torte', open_menu: 'Otvori meni', reserve: 'Rezerviši sto', call: 'Pozovi', skip: 'Preskoči',
    open_until: 'Otvoreno do', closed: 'Zatvoreno', opens: 'otvara se u', split: 'Rastavi jelo', split_d: 'Rastavi piće', join: 'Sastavi', made_of: 'Od čega je napravljeno',
    with_dish: 'Uz jelo', est: 'okvirna procena', side: 'prilog', add: 'Dodaj na listu', added: 'Dodato na listu', list: 'Moja lista', items: 'stavki', item1: 'stavka', items2: 'stavke',
    show_waiter: 'Pokaži konobaru', call_waiter: 'Pozovi konobara', waiter_called: 'Konobar je pozvan za vaš sto', total: 'Ukupno', empty: 'Lista je prazna. Dodajte jelo ili piće i pokažite listu konobaru.',
    list_lead: 'Lista vam pomaže da se dogovorite za stolom. Porudžbinu potvrđuje konobar.', prep: 'Priprema', portion: 'Porcija', energy: 'Energija', minutes: 'min',
    nutrition: 'Nutritivne vrednosti', per_portion: 'po porciji, okvirno', protein: 'Proteini', carbs: 'Ugljeni hidrati', fat: 'Masti', composition: 'Sastav i gramaža',
    allergens: 'Alergeni', al_note: 'Ako imate alergiju, recite konobaru — kuhinja će proveriti svaki sastojak.', no_al: 'Bez glavnih alergena', pair: 'Savršeno uz', pair_d: 'Uz piće preporučujemo',
    sig: 'Preporuka kuće', vege: 'Vegetarijansko', posno: 'Posno', ljuto: 'Ljuto', deljenje: 'Za deljenje', novo: 'Novo', until: 'Poručivanje do', h: 'h',
    torte_t: 'Torte po porudžbini', torte_lead: 'Pored velikih torti pravimo i mini torte od 1 kg, a Popsi su obavezan deo svakog rođendana. Poručite par dana ranije.',
    per_kg: 'za 1 kg', order_cake: 'Poruči tortu', call_shop: 'Pozovi radionicu', flavor: 'Ukus', weight: 'Težina', date: 'Datum preuzimanja', pickup: 'Preuzimanje',
    msg: 'Natpis na torti', name: 'Ime i prezime', phone: 'Telefon', send: 'Pošalji zahtev', sent_t: 'Zahtev je poslat', sent_d: 'Radionica vas zove da potvrdi ukus, dizajn i termin. U demo verziji zahtev se ne šalje.',
    vitrina: 'Vitrina', vitrina_lead: 'Kolači iz naše poslastičarnice — svaki možete rastaviti na slojeve.', ml: 'ml', glass: 'čaša', layers_cap: 'Šta je u čaši',
    hours: 'Radno vreme', contact: 'Kontakt', demo_t: 'TipTap demo za Ultra Caffe', demo_b: 'DEMO', back: 'Nazad', close: 'Zatvori', photo: 'Fotografija',
    footer_note: 'Prikaz digitalnog menija koji je TipTap pripremio za Ultra Caffe. Jelovnik, cene i fotografije su sa vašeg sajta i Instagrama; gramaže, kalorije i alergeni su okvirni i čekaju potvrdu kuhinje.',
    tap_split: 'Dodirnite i pogledajte slojeve', tbl: 'Sto', guests_note: 'Pokažite ovaj ekran konobaru', more: 'još', from: 'od' },
  en: { menu: 'Food', drinks: 'Drinks', cakes: 'Cakes', torte: 'Cakes to order', open_menu: 'Open the menu', reserve: 'Book a table', call: 'Call', skip: 'Skip',
    open_until: 'Open until', closed: 'Closed', opens: 'opens at', split: 'Take it apart', split_d: 'Take it apart', join: 'Put it back', made_of: 'What it’s made of',
    with_dish: 'On the side', est: 'estimate', side: 'side', add: 'Add to my list', added: 'Added to your list', list: 'My list', items: 'items', item1: 'item', items2: 'items',
    show_waiter: 'Show the waiter', call_waiter: 'Call the waiter', waiter_called: 'A waiter is on the way to your table', total: 'Total', empty: 'Your list is empty. Add dishes or drinks and show the list to your waiter.',
    list_lead: 'Your list helps the table decide. The waiter confirms the order.', prep: 'Ready in', portion: 'Portion', energy: 'Energy', minutes: 'min',
    nutrition: 'Nutrition', per_portion: 'per portion, estimated', protein: 'Protein', carbs: 'Carbohydrates', fat: 'Fat', composition: 'Ingredients & weights',
    allergens: 'Allergens', al_note: 'If you have an allergy, tell your waiter — the kitchen will check every ingredient.', no_al: 'No major allergens', pair: 'Goes well with', pair_d: 'We suggest with it',
    sig: 'House pick', vege: 'Vegetarian', posno: 'Vegan / fasting', ljuto: 'Spicy', deljenje: 'To share', novo: 'New', until: 'Served until', h: ':00',
    torte_t: 'Cakes to order', torte_lead: 'Besides full-size cakes we make 1 kg mini cakes, and our Popsy cake pops belong at every birthday. Order a few days ahead.',
    per_kg: 'per 1 kg', order_cake: 'Order a cake', call_shop: 'Call the bakery', flavor: 'Flavour', weight: 'Weight', date: 'Pick-up date', pickup: 'Pick-up',
    msg: 'Message on the cake', name: 'Full name', phone: 'Phone', send: 'Send request', sent_t: 'Request sent', sent_d: 'The bakery will call you to confirm flavour, design and time. In this demo nothing is sent.',
    vitrina: 'Pastry case', vitrina_lead: 'Cakes from our own pastry kitchen — take any of them apart, layer by layer.', ml: 'ml', glass: 'glass', layers_cap: 'What’s in the glass',
    hours: 'Opening hours', contact: 'Contact', demo_t: 'TipTap demo for Ultra Caffe', demo_b: 'DEMO', back: 'Back', close: 'Close', photo: 'Photo',
    footer_note: 'A digital menu preview prepared by TipTap for Ultra Caffe. Menu, prices and photos come from your website and Instagram; weights, calories and allergens are estimates awaiting kitchen sign-off.',
    tap_split: 'Tap to see every layer', tbl: 'Table', guests_note: 'Show this screen to your waiter', more: 'more', from: 'from' }
};
const t = k => (TX[L] && TX[L][k] != null ? TX[L][k] : TX.sr[k] != null ? TX.sr[k] : k);
const nm = o => (L === 'en' && o.en ? o.en : o.sr);
const nf = n => Math.round(n).toLocaleString('sr-RS');
const money = p => `<span class="pr num">${nf(p)}<small>RSD</small></span>`;
const GC = { meso: '#D07A5C', riba: '#E9A07E', sir: '#E6C899', povrce: '#9DBB68', prilog: '#D9AE6A', testo: '#D9AE6A', sos: '#D49A78', slatko: '#E3A9BD', voce: '#D2577A' };
const IC = {
  split: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6.5h16M6 11h12M5 15.5h14M7 20h10"/><path d="M12 2.5v2M12 21.5v.5" opacity=".5"/></svg>',
  bag: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
  x: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  cal: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  phone: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M6.6 3.5h2.6l1.5 4.2-2 1.4a11 11 0 0 0 6.2 6.2l1.4-2 4.2 1.5v2.6A2.1 2.1 0 0 1 18.4 19.6 15.5 15.5 0 0 1 4.4 5.6 2.1 2.1 0 0 1 6.6 3.5Z"/></svg>',
  bell: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15L6 16.5Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>',
  eye: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  ok: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="28" opacity=".35"/><path d="M20 33l8 8 16-17"/></svg>',
  menu: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5 5h14M5 12h14M5 19h9"/></svg>',
  chart: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  plan: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2.2"/><rect x="13" y="13" width="5" height="5" rx="1.2"/><path d="M3 13h6v8"/></svg>'
};
// alergeni: jednostavni simboli
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

// ---------------------------------------------------------------- događaji za upravu (isti uređaj)
function hit(type, id) {
  const ev = LS.get('ev', []); ev.push({ t: Date.now(), type, id, loc: LOC }); if (ev.length > 400) ev.splice(0, ev.length - 400); LS.set('ev', ev);
}

// ---------------------------------------------------------------- slike
const img = (k, thumb) => `img/f/${k}${thumb ? '-t' : ''}.webp`;
const photoOf = it => (it.img && it.img.length ? it.img : null);
function topArt(key, seed, w = 120, x = 0, y = 0) {
  return K.top(key, seed).replace('<svg viewBox="0 0 120 120"', `<svg x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(w)}" viewBox="0 0 120 120"`);
}
// ilustrovan tanjir: sastojci odozgo složeni na kremast tanjir (kad nema fotografije)
function plateArt(it, comps) {
  const main = (comps || it.comps).filter(c => !c.side).slice().sort((a, b) => b.g - a.g).slice(0, 6);
  const n = main.length, cx = 120, cy = 120;
  let s = `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="pl-${it.id}" cx=".42" cy=".36" r=".8"><stop offset="0" stop-color="#fbf7ee"/><stop offset=".7" stop-color="#e9e1d1"/><stop offset="1" stop-color="#cfc4ae"/></radialGradient></defs>`;
  s += `<circle cx="120" cy="126" r="108" fill="#000" opacity=".35"/><circle cx="120" cy="120" r="108" fill="url(#pl-${it.id})"/><circle cx="120" cy="120" r="84" fill="none" stroke="#d6cbb5" stroke-width="1.4"/><circle cx="120" cy="120" r="104" fill="none" stroke="#b9975f" stroke-width="1.2" opacity=".55"/>`;
  main.forEach((c, i) => {
    let x, y, w;
    if (i === 0) { w = n > 3 ? 92 : 104; x = cx - w / 2 + (n > 1 ? -14 : 0); y = cy - w / 2 + (n > 1 ? -6 : 0); }
    else { const a = -0.6 + (i - 1) / Math.max(1, n - 1) * Math.PI * 1.55; w = Math.max(52, 70 - i * 3); x = cx + Math.cos(a) * 52 - w / 2 + 8; y = cy + Math.sin(a) * 50 - w / 2 + 4; }
    s += topArt(c.a, i, w, x, y);
  });
  return s + '</svg>';
}
function thumbHTML(it) {
  if (it.kind === 'cake' && it.cut) return `<span class="th cut"><img src="img/k/${it.cut}.webp" alt="" loading="lazy"></span>`;
  const ph = photoOf(it);
  if (ph) return `<span class="th"><img src="${img(ph[0], 1)}" alt="" loading="lazy"></span>`;
  const main = (it.comps || []).filter(c => !c.side).slice().sort((a, b) => b.g - a.g)[0];
  const art = it.mode === 'pizza' ? 'pizza_base' : it.mode === 'stack' ? (it.comps.find(c => /patty|chicken|veg_patty|ham|pecenica/.test(c.a)) || main || {}).a : (main || {}).a;
  return `<span class="th" data-art="${esc(art || 'fries')}" data-seed="${(it.id.length * 7) % 13}"></span>`;
}
const tagHTML = it => {
  const tg = [];
  if (it.sig) tg.push(`<span class="tag sig">${t('sig')}</span>`);
  (it.tags || []).forEach(x => { if (['vege', 'posno', 'ljuto', 'deljenje', 'novo'].includes(x) && !(x === 'vege' && (it.tags || []).includes('posno'))) tg.push(`<span class="tag ${x}">${t(x)}</span>`); });
  return tg.join('');
};
const descOf = it => (L === 'en' ? it.desc_en || it.desc : it.desc) || '';

// ---------------------------------------------------------------- čaša (piće u slojevima)
const GLASS = {
  highball: { hw: () => 42, o: 'M52 26V274Q52 284 62 284H138Q148 284 148 274V26', clip: 'M58 30H142V264Q142 270 136 270H64Q58 270 58 264Z', top: 34, bot: 268, fill: .86, straw: [112, 4, 128, 250] },
  tall: { hw: y => 48 - (y - 30) / 240 * 11, o: 'M46 26 58 278Q60 286 70 286H130Q140 286 142 278L154 26', clip: 'M52 30H148L137 270H63Z', top: 34, bot: 270, fill: .88, straw: [118, 2, 126, 252] },
  latte: { hw: () => 31, o: 'M64 26V276Q64 286 74 286H126Q136 286 136 276V26', clip: 'M69 30H131V268Q131 272 127 272H73Q69 272 69 268Z', top: 34, bot: 271, fill: .9 },
  rocks: { hw: y => 56 - (y - 120) / 148 * 6, o: 'M38 116 44 274Q46 284 56 284H144Q154 284 156 274L162 116', clip: 'M44 120H156L150 268H50Z', top: 124, bot: 268, fill: .8 },
  martini: { hw: y => 70 * (160 - y) / 114, o: 'M22 42H178L100 166ZM100 166V270M62 278Q100 266 138 278', clip: 'M30 46H170L100 160Z', top: 48, bot: 158, fill: .86, tri: 1 },
  wine: { hw: y => 39 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 40) / 140, 2))), o: 'M56 34C46 120 62 176 100 182 138 176 154 120 144 34ZM100 182V270M60 278Q100 266 140 278', clip: 'M61 40C53 118 66 170 100 176 134 170 147 118 139 40Z', top: 46, bot: 174, fill: .62 },
  cup: { hw: y => y < 226 ? 60 - (y - 144) / 82 * 7 : 53 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 226) / 26, 2))), o: 'M34 140 42 228Q46 254 100 256 154 254 158 228L166 140ZM164 160Q192 162 188 188 184 212 156 210M30 262Q100 288 170 262', clip: 'M40 144 47 226Q51 248 100 250 149 248 153 226L160 144Z', top: 150, bot: 248, fill: .94 }
};
function glassGeo(d) {
  const g = GLASS[d.glass] || GLASS.highball, lay = d.layers || [], tot = lay.reduce((a, b) => a + b[1], 0) || 1;
  const H = (g.bot - g.top) * g.fill, minH = 7;
  let hs = lay.map(l => Math.max(minH, H * l[1] / tot)); const k = H / hs.reduce((a, b) => a + b, 0); hs = hs.map(h => h * k);
  let y = g.bot; const geo = hs.map((h, i) => { const r = { y0: y - h, y1: y, h }; y -= h; return r; });
  return { g, geo, lay };
}
function glassSVG(d, only, uid) {
  const { g, geo, lay } = glassGeo(d); const id = 'gc' + (uid || '') + Math.random().toString(36).slice(2, 7);
  let s = `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="${id}"><path d="${g.clip}"/></clipPath><linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".18" stop-color="#fff" stop-opacity=".05"/><stop offset=".8" stop-color="#000" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient></defs>`;
  const drawLayer = i => { const l = U.lq[lay[i][0]] || ['', '', '#ccc'], c = l[2], r = geo[i];
    let q = `<g clip-path="url(#${id})"><rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h + .6)}" fill="${c}"/><rect x="0" y="${f1(r.y0)}" width="200" height="${f1(Math.min(3, r.h))}" fill="#fff" opacity=".18"/>`;
    if (lay[i][0] === 'mint') q += [70, 96, 120].map((x, k) => `<ellipse cx="${x}" cy="${f1(r.y0 + r.h / 2)}" rx="10" ry="5" fill="#3f7f32" transform="rotate(${k * 40 - 30} ${x} ${f1(r.y0 + r.h / 2)})"/>`).join('');
    if (['whip', 'foam', 'icecream'].includes(lay[i][0])) q += Array.from({ length: 7 }, (_, k) => `<circle cx="${50 + k * 17}" cy="${f1(r.y0 + 3)}" r="9" fill="${c}"/>`).join('');
    return q + `<rect x="0" y="${f1(r.y0)}" width="200" height="${f1(r.h)}" fill="url(#${id}s)"/></g>`; };
  if (only != null) {
    const l = U.lq[lay[only][0]] || ['', '', '#ccc'], c = l[2], r = geo[only], hw = y => Math.max(4, g.hw(y)), ry = Math.min(7, hw(r.y0) * .16);
    const a = r.y0 + ry, b = Math.max(a + 2, r.y1 - ry), L0 = 100 - hw(a), R0 = 100 + hw(a), L1 = 100 - hw(b), R1 = 100 + hw(b);
    s += `<path d="M${f1(L0)} ${f1(a)}L${f1(L1)} ${f1(b)}A${f1(hw(b))} ${f1(ry)} 0 0 0 ${f1(R1)} ${f1(b)}L${f1(R0)} ${f1(a)}Z" fill="${c}"/>` +
      `<path d="M${f1(L0)} ${f1(a)}L${f1(L1)} ${f1(b)}A${f1(hw(b))} ${f1(ry)} 0 0 0 ${f1(R1)} ${f1(b)}L${f1(R0)} ${f1(a)}Z" fill="url(#${id}s)"/>` +
      `<ellipse cx="100" cy="${f1(a)}" rx="${f1(hw(a))}" ry="${f1(ry)}" fill="${c}"/><ellipse cx="100" cy="${f1(a)}" rx="${f1(hw(a))}" ry="${f1(ry)}" fill="#fff" opacity=".22"/>` +
      `<ellipse cx="100" cy="${f1(a)}" rx="${f1(hw(a))}" ry="${f1(ry)}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>`;
  }
  else {
    lay.forEach((_, i) => { s += drawLayer(i); });
    if (g.straw && !only) s += `<path d="M${g.straw[0]} ${g.straw[1]}L${g.straw[2]} ${g.straw[3]}" stroke="#CFA670" stroke-width="5" stroke-linecap="round" opacity=".9"/>`;
    s += `<path d="${g.o}" fill="none" stroke="rgba(241,234,223,.55)" stroke-width="3" stroke-linejoin="round"/><path d="${g.clip}" fill="url(#${id}s)" opacity=".5"/>`;
  }
  return s + '</svg>';
}
const glassOutline = d => { const g = GLASS[d.glass] || GLASS.highball; return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${g.o}" fill="none" stroke="rgba(241,234,223,.6)" stroke-width="3" stroke-linejoin="round"/>${g.straw ? `<path d="M${g.straw[0]} ${g.straw[1]}L${g.straw[2]} ${g.straw[3]}" stroke="#CFA670" stroke-width="5" stroke-linecap="round" opacity=".85"/>` : ''}</svg>`; };

// ---------------------------------------------------------------- kostur stranice
const app = $('#app');
document.body.insertAdjacentHTML('afterbegin', K.defs());
function skeleton() {
  app.innerHTML = `
  <header class="top" id="top"><img class="lg" src="img/logo.webp" alt="Ultra Caffe"><div class="sp"></div>
    <div class="lang" role="group" aria-label="Jezik"><button data-l="sr">SR</button><button data-l="en">EN</button></div>
    <button class="bag" id="bagBtn" aria-label="${esc(t('list'))}">${IC.bag}<b class="num" id="bagN">0</b></button></header>
  <div class="wrap">
    <section class="hero" id="hero"></section>
    <div class="secs" id="secs"><div class="seg" role="tablist"></div><nav class="rail" id="rail" aria-label="Kategorije"></nav></div>
    <main id="main"></main>
  </div>
  <div class="dock" id="dock"><div class="t"><b id="dockT"></b><small id="dockS"></small></div><button class="btn btn-m btn-s" id="dockBtn">${esc(t('list'))}</button></div>
  <div class="scrim" id="scrim"></div>
  <section class="sheet dish" id="dish" role="dialog" aria-modal="true"></section>
  <section class="sheet cart" id="cart" role="dialog" aria-modal="true"></section>
  <div class="show-w" id="showW"></div>
  <div class="toast" id="toast"></div>`;
  $$('.lang button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  $('#bagBtn').onclick = openCart; $('#dockBtn').onclick = openCart;
  $('#scrim').onclick = () => { if ($('#dish').classList.contains('on')) history.back(); else closeCart(); };
  addEventListener('scroll', () => $('#top').classList.toggle('sc', scrollY > 10), { passive: true });
}

// ---------------------------------------------------------------- hero + lokal
function openState(loc, now = new Date()) {
  const wd = (now.getDay() + 6) % 7, h = now.getHours() + now.getMinutes() / 60;
  const [o, c] = loc.open[wd], prev = loc.open[(wd + 6) % 7];
  if (prev[1] > 24 && h < prev[1] - 24) return { open: true, until: prev[1] - 24 };
  if (h >= o && h < c) return { open: true, until: c % 24 };
  return { open: false, at: h < o ? o : loc.open[(wd + 1) % 7][0] };
}
const hh = n => (n === 24 || n === 0 ? '00' : String(n).padStart(2, '0')) + 'h';
function renderHero() {
  const loc = locOf(LOC), st = openState(loc);
  $('#hero').innerHTML = `<div class="ph"><img src="img/a/${loc.hero}.webp" alt="${esc(loc.name)}" fetchpriority="high"></div>
   <div class="in"><h1>${esc(L === 'en' ? U.venue.tagline_en : U.venue.tagline)}</h1>
   <div class="meta"><span class="open${st.open ? '' : ' closed'}"><i></i>${st.open ? `${t('open_until')} ${hh(st.until)}` : `${t('closed')} · ${t('opens')} ${hh(st.at)}`}</span><span>${esc(loc.addr)}</span></div>
   <div class="locsw" role="group" aria-label="Lokal">${U.locs.map(l => `<button data-loc="${l.id}" aria-pressed="${l.id === LOC}">${esc(l.short)}</button>`).join('')}</div>
   <div class="acts"><a class="btn btn-m" href="rezervacije/?lokal=${LOC}${L === 'en' ? '&lang=en' : ''}">${IC.cal}${esc(t('reserve'))}</a><a class="btn btn-o" href="tel:${loc.phone.replace(/\s/g, '')}">${IC.phone}${esc(loc.phone)}</a></div></div>`;
  $$('#hero .locsw button').forEach(b => b.onclick = () => { LOC = b.dataset.loc; LS.set('loc', LOC); renderHero(); renderFoot(); hit('loc', LOC); });
}

// ---------------------------------------------------------------- sekcije
const SECS = [['jela', 'menu'], ['pice', 'drinks'], ['kolaci', 'cakes'], ['torte', 'torte']];
function renderSecs() {
  $('#secs .seg').innerHTML = SECS.map(([id, k]) => `<button role="tab" data-s="${id}" aria-selected="${id === SEC}">${esc(t(k))}</button>`).join('');
  $$('#secs .seg button').forEach(b => b.onclick = () => { SEC = b.dataset.s; renderSecs(); renderMain(); const y = $('#secs').getBoundingClientRect().top + scrollY - 58; if (scrollY > y) scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' }); hit('sec', SEC); });
}
function rowHTML(it) {
  const x3 = it.mode && it.mode !== 'none' && (it.comps || []).length;
  return `<li><button class="row" data-id="${it.id}">${thumbHTML(it)}<span class="tx"><b>${esc(nm(it))}</b>${descOf(it) ? `<small>${esc(descOf(it))}</small>` : ''}<span class="tg">${tagHTML(it)}</span></span>${it.var ? `<span class="pr num"><small>${t('from')} </small>${nf(Math.min(...it.var.map(v => v.price)))}<small>RSD</small></span>` : money(it.price)}</button></li>`;
}
function featHTML(it) {
  const ph = photoOf(it);
  return `<button class="fc" data-id="${it.id}"><img src="${img(ph[0])}" alt="" loading="lazy"><span class="tag sig">${t('sig')}</span><span class="xbadge" aria-hidden="true">${IC.split}</span>
   <span class="in"><b>${esc(nm(it))}</b><span class="r"><small>${esc(descOf(it))}</small>${it.var ? `<span class="pr num"><small>${t('from')} </small>${nf(Math.min(...it.var.map(v => v.price)))}<small>RSD</small></span>` : money(it.price)}</span></span></button>`;
}
function drinkRow(d) {
  let lead = '', cls = 'drow';
  if (d.img) { lead = `<img src="${img(d.img, 1)}" alt="" loading="lazy">`; cls += ' ph'; }
  else if (d.layers) { lead = `<span class="gi">${glassSVG(d)}</span>`; cls += ' gl'; }
  return `<li><button class="${cls}" data-id="${d.id}">${lead}<span><b>${esc(nm(d))}</b>${d.note ? `<small>${esc(d.note)}</small>` : ''}</span>${money(d.price)}</button></li>`;
}
function renderMain() {
  const m = $('#main'); let h = '', chips = [];
  if (SEC === 'jela') {
    U.cats.forEach(c => {
      const its = ITEMS.filter(i => i.cat === c.id); if (!its.length) return;
      const feats = its.filter(i => i.sig && photoOf(i)), rest = its.filter(i => !feats.includes(i));
      chips.push([c.id, nm(c)]);
      h += `<section class="cat" id="c-${c.id}"><header class="cat-h">${c.hero ? `<figure><img src="${img(c.hero)}" alt="" loading="lazy"></figure>` : ''}<h2>${esc(nm(c))}</h2>${(L === 'en' ? c.note_en : c.note) ? `<p>${esc(L === 'en' ? c.note_en : c.note)}</p>` : ''}</header>
        ${feats.length ? `<div class="feat">${feats.map(featHTML).join('')}</div>` : ''}<ul class="rows two">${rest.map(rowHTML).join('')}</ul></section>`;
    });
  } else if (SEC === 'pice') {
    U.dcats.forEach(c => {
      const ds = DR.filter(d => d.cat === c.id); if (!ds.length) return; chips.push([c.id, nm(c)]);
      h += `<section class="cat" id="c-${c.id}"><header class="cat-h">${c.hero ? `<figure><img src="${img(c.hero)}" alt="" loading="lazy"></figure>` : ''}<h2>${esc(nm(c))}</h2></header><ul class="rows two">${ds.map(drinkRow).join('')}</ul></section>`;
    });
  } else if (SEC === 'kolaci') {
    h += `<section class="cat" id="c-vitrina"><header class="cat-h"><figure><img src="${img('vitrina-2')}" alt="" loading="lazy"></figure><h2>${esc(t('vitrina'))}</h2><p>${esc(t('vitrina_lead'))}</p></header>
      <div class="vit">${KOL.map(k => `<button class="kc" data-id="${k.id}"><span class="tg">${(k.tags || []).filter(x => x === 'novo' || x === 'posno').map(x => `<span class="tag ${x}">${t(x)}</span>`).join('')}</span><span class="cu"><img src="img/k/${k.cut}.webp" alt="" loading="lazy"></span><b>${esc(nm(k))}</b>${money(k.price)}${k.unit === 'kg' ? `<small style="color:var(--magla);font-size:11.5px">${t('per_kg')}</small>` : ''}</button>`).join('')}</div></section>`;
  } else {
    h += `<section class="cat" id="c-torte"><header class="cat-h"><h2>${esc(t('torte_t'))}</h2><p>${esc(t('torte_lead'))}</p></header>
      <div class="tgal">${U.torte_gal.map(g => `<figure><img src="img/t/${g}.webp" alt="" loading="lazy"></figure>`).join('')}</div>
      <div class="tlist">${U.torte.map(x => `<div><b>${esc(x.sr)}</b>${money(x.price)}<small style="display:block;color:var(--magla);font-size:11.5px">${t('per_kg')}</small></div>`).join('')}</div>
      <div class="tcta"><button class="btn btn-m" id="cakeBtn">${IC.cal}${esc(t('order_cake'))}</button><a class="btn btn-o" href="tel:${U.venue.torte_phone.replace(/\s/g, '')}">${IC.phone}${esc(t('call_shop'))} · ${esc(U.venue.torte_phone)}</a></div></section>`;
  }
  m.innerHTML = h + footHTML();
  $('#rail').innerHTML = chips.map(([id, n]) => `<button class="chip" data-c="${id}">${esc(n)}</button>`).join('');
  $('#rail').style.display = chips.length > 1 ? '' : 'none';
  $$('#rail .chip').forEach(b => b.onclick = () => { const el = $('#c-' + b.dataset.c); scrollTo({ top: el.getBoundingClientRect().top + scrollY - ($('#top').offsetHeight + $('#secs').offsetHeight) + 6, behavior: reduced ? 'auto' : 'smooth' }); });
  $$('#main [data-id]').forEach(b => b.onclick = () => openItem(b.dataset.id));
  const cb = $('#cakeBtn'); if (cb) cb.onclick = openCakeForm;
  lazyArt(); spy();
}
function footHTML() {
  return `<footer class="foot" id="foot">${U.locs.map(l => `<div><h3>${esc(l.name)}</h3><div>${esc(l.addr)}, ${esc(l.city)}</div><div><a href="tel:${l.phone.replace(/\s/g, '')}">${esc(l.phone)}</a></div><dl>${l.hours.map(h => `<dt>${esc(h[0])}</dt><dd>${esc(h[1])}</dd>`).join('')}</dl></div>`).join('')}
    <div><h3>Ultra Caffe</h3><div>${esc(U.venue.since_note)}.</div><div>Instagram <a href="https://www.instagram.com/${U.venue.instagram}/" rel="noopener" target="_blank">@${U.venue.instagram}</a></div><p class="tt"><b>${esc(t('demo_t'))}.</b> ${esc(t('footer_note'))}</p></div></footer>`;
}
const renderFoot = () => { const f = $('#foot'); if (f) f.outerHTML = footHTML(); };
// lenje ilustracije u sličicama
let artIO;
function lazyArt() {
  if (artIO) artIO.disconnect();
  artIO = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const el = e.target; el.innerHTML = K.top(el.dataset.art, +el.dataset.seed || 0); artIO.unobserve(el); }), { rootMargin: '300px' });
  $$('.th[data-art]').forEach(el => artIO.observe(el));
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
  const sh = $('#dish'); sh.innerHTML = dishHTML(it); bindDish(it);
  sh.classList.add('on'); $('#scrim').classList.add('on'); document.body.classList.add('lock');
  if (push) history.pushState({ dish: id }, '', '#' + encodeURIComponent(id));
  hit('view', it.id);
  const s = $('.split', sh); if (s && !SS.get('nudged')) { setTimeout(() => { s.classList.add('nudge'); SS.set('nudged', '1'); setTimeout(() => s.classList.remove('nudge'), 2600); }, 900); }
}
function closeItem() { const sh = $('#dish'); sh.classList.remove('on'); $('#scrim').classList.remove('on'); document.body.classList.remove('lock'); CUR = null; setTimeout(() => { if (!sh.classList.contains('on')) sh.innerHTML = ''; }, 600); }
addEventListener('popstate', e => { if ($('#dish').classList.contains('on')) closeItem(); if (e.state && e.state.dish) openItem(e.state.dish, false); });

function stageHero(it) {
  const ph = it.kind === 'drink' ? (it.img ? [it.img] : null) : photoOf(it);
  if (it.kind === 'cake' && it.cut && !ph) return { cls: 'cut', html: `<img src="img/k/${it.cut}.webp" alt="">`, illus: false };
  if (it.kind === 'cake' && it.cut && ph) return { cls: 'cut', html: `<img src="img/k/${it.cut}.webp" alt="">`, illus: false, extra: ph };
  if (ph) return { cls: '', html: `<img src="${img(ph[GAL] || ph[0])}" alt="">`, gal: ph };
  if (it.kind === 'drink' && it.layers) return { cls: 'ill', html: '', illus: true };
  if (it.mode === 'knoll') return { cls: 'ill', html: plateArt(it, curComps(it)), illus: false };
  if (it.mode === 'pizza') return { cls: 'ill', html: '', illus: true };
  if (it.mode === 'stack' || it.mode === 'cake') return { cls: 'ill', html: '', illus: true };
  return { cls: 'ill', html: plateArt(it, curComps(it)), illus: false };
}
function dishHTML(it) {
  const hero = stageHero(it), canSplit = it.kind === 'drink' ? !!it.layers : (it.mode && it.mode !== 'none' && curComps(it).length);
  const gal = hero.gal && hero.gal.length > 1 ? `<div class="gal">${hero.gal.map((g, i) => `<button data-g="${i}" aria-pressed="${i === 0}" aria-label="${t('photo')} ${i + 1}"></button>`).join('')}</div>` : '';
  return `<div class="bar"><button class="rb" id="xClose" aria-label="${esc(t('close'))}">${IC.x}</button></div>
  <div class="scroll"><div class="stage" id="st"><div class="ph ${hero.cls}" id="ph">${hero.html}</div><div class="xr" id="xr"></div>${gal}
    ${canSplit ? `<button class="split" id="splitBtn" aria-pressed="false">${IC.split}<span>${esc(it.kind === 'drink' ? t('split_d') : t('split'))}</span><em class="hint">${esc(t('tap_split'))}</em></button>` : ''}</div>
  <div class="info" id="info">${infoHTML(it)}</div></div>
  <div class="buy"><div class="qty"><button id="qm" aria-label="−">−</button><b class="num" id="qn">1</b><button id="qp" aria-label="+">+</button></div><button class="btn btn-m" id="addBtn">${IC.bag}<span id="addT"></span></button></div>`;
}
function infoHTML(it) {
  const comps = curComps(it), nut = curNut(it), al = curAl(it), pr = curPrice(it);
  const tot = comps.reduce((a, c) => a + c.g, 0);
  let h = `<div class="hd"><div class="tg">${tagHTML(it)}</div><h2>${esc(nm(it))}</h2>`;
  if (it.story) h += `<div class="story">${esc(L === 'en' ? it.story_en || it.story : it.story)}</div>`;
  const d = it.kind === 'drink' ? it.note : (it.kind === 'cake' ? (L === 'en' ? it.desc_en : it.desc) : descOf(it));
  if (d) h += `<div class="desc">${esc(d)}</div>`;
  if (!it.var) h += `<div class="bigpr num">${nf(pr)}<small>RSD${it.unit === 'kg' ? ' · ' + t('per_kg') : ''}</small></div>`;
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
  if (it.kind === 'drink' && it.layers) {
    const tot2 = it.layers.reduce((a, l) => a + l[1], 0);
    h += `<div class="card"><h3>${t('layers_cap')}<small class="num">${nf(tot2)} ml</small></h3><ul class="comp-l">${it.layers.slice().reverse().map(l => { const q = U.lq[l[0]]; return `<li><svg viewBox="0 0 34 34"><circle cx="17" cy="17" r="11" fill="${q[2]}" stroke="rgba(241,234,223,.35)"/></svg><span>${esc(L === 'en' ? q[1] : q[0])}</span><small class="num">${l[1]} ml</small></li>`; }).join('')}</ul></div>`;
  }
  const prs = (it.pair || []).map(pairOf).filter(Boolean);
  if (prs.length) h += `<div><h3 style="font-size:22px;margin-bottom:12px">${t(it.kind === 'dish' ? 'pair' : 'pair_d')}</h3><div class="pairs">${prs.map(p => {
    let im; if (p.kind === 'cake') im = `<span class="im cut"><img src="img/k/${p.cut}.webp" alt=""></span>`; else if (p.img) im = `<span class="im"><img src="${img(Array.isArray(p.img) ? p.img[0] : p.img, 1)}" alt=""></span>`; else if (p.layers) im = `<span class="im">${glassSVG(p)}</span>`;
    else im = `<span class="im">${K.top(p.cat === 'vina' || p.cat === 'vina-casa' ? 'berries' : p.cat === 'piva' ? 'honey' : 'lemon', 1)}</span>`;
    return `<button class="pc" data-id="${p.id}">${im}<b>${esc(nm(p))}</b>${money(p.price)}</button>`; }).join('')}</div></div>`;
  return h;
}
function bindDish(it) {
  const sh = $('#dish');
  $('#xClose', sh).onclick = () => history.back();
  const sb = $('#splitBtn', sh); if (sb) sb.onclick = () => toggleX(it);
  $$('.vars button', sh).forEach(b => b.onclick = () => { VAR = +b.dataset.v; const open = $('#st').classList.contains('open'); $('#info').innerHTML = infoHTML(it); bindInfo(it); updAdd(it); if (open) { closeX(true); setTimeout(() => openX(it), 50); } else if (it.mode === 'knoll' && !photoOf(it)) $('#ph').innerHTML = plateArt(it, curComps(it)); else if (stageHero(it).illus) prepIll(it); });
  $$('.gal button', sh).forEach(b => b.onclick = () => { GAL = +b.dataset.g; const ph = photoOf(it); const im = $('#ph img'); im.style.opacity = 0; setTimeout(() => { im.src = img(ph[GAL]); im.style.opacity = 1; }, 180); $$('.gal button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  $('#qm', sh).onclick = () => { QTY = Math.max(1, QTY - 1); updAdd(it); }; $('#qp', sh).onclick = () => { QTY = Math.min(20, QTY + 1); updAdd(it); };
  $('#addBtn', sh).onclick = () => addToCart(it);
  bindInfo(it); updAdd(it); sizeStage(it);
  if (stageHero(it).illus) prepIll(it);
}
function bindInfo(it) {
  $$('#info [data-art]').forEach(el => { el.innerHTML = K.top(el.dataset.art, +el.dataset.seed).replace('<svg ', '<svg width="34" height="34" '); });
  $$('#info .pc').forEach(b => b.onclick = () => { history.replaceState({ dish: b.dataset.id }, '', '#' + encodeURIComponent(b.dataset.id)); openItem(b.dataset.id, false); hit('pair', b.dataset.id); });
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
const totLine = (it, y) => `<div class="xr-tot" style="top:${f1(y)}px">≈ <b class="num">${nf(curNut(it).kcal)} kcal</b> · ${t('est')}</div>`;
function phRect() { const st = $('#st'), ph = $('#ph'), sr = st.getBoundingClientRect(), b = ph.getBoundingClientRect(); const im = $('img', ph), sv = $('svg', ph);
  let w = b.width, h = b.height, x = b.left - sr.left, y = b.top - sr.top + st.scrollTop;
  const el = im || sv; if (el) { const r = el.getBoundingClientRect(); if (im && im.naturalWidth && getComputedStyle(im).objectFit === 'contain') { const k = Math.min(r.width / im.naturalWidth, r.height / im.naturalHeight); w = im.naturalWidth * k; h = im.naturalHeight * k; x = r.left - sr.left + (r.width - w) / 2; y = r.top - sr.top + st.scrollTop + (r.height - h) / 2; } else { w = r.width; h = r.height; x = r.left - sr.left; y = r.top - sr.top + st.scrollTop; } }
  return { x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
}
function toggleX(it) { const st = $('#st'); if (st.classList.contains('open')) closeX(); else { openX(it); hit('split', it.id); } }
function openX(it) {
  const st = $('#st'), xr = $('#xr'), btn = $('#splitBtn');
  if (!st._h0) st._h0 = st.offsetHeight;
  const W = st.clientWidth, comps = curComps(it), pr = phRect();
  let r;
  if (it.kind === 'drink') r = buildGlass(xr, it, W, pr);
  else if (it.mode === 'pizza') r = buildPizza(xr, it, comps, W, pr);
  else if (it.mode === 'stack' || it.mode === 'cake') r = buildStack(xr, it, comps, W, pr);
  else r = buildKnoll(xr, it, comps, W, pr);
  XR = r; const ph0 = $('#ph'); ph0.style.height = ph0.offsetHeight + 'px'; xr.style.transform = ''; st.classList.add('open'); btn.setAttribute('aria-pressed', 'true'); $('span', btn).textContent = t('join');
  if (!isDesk()) st.style.height = Math.max(st._h0, r.H) + 'px';
  const ph = $('#ph'); ph.style.transformOrigin = '0 0'; ph.style.transform = r.photo.tf || ''; ph.style.opacity = r.photo.op;
  requestAnimationFrame(() => r.play());
}
function closeX(instant) {
  const st = $('#st'), btn = $('#splitBtn'), ph = $('#ph'), xr = $('#xr'); if (!st) return;
  st.classList.remove('open'); if (btn) { btn.setAttribute('aria-pressed', 'false'); $('span', btn).textContent = CUR && CUR.kind === 'drink' ? t('split_d') : t('split'); }
  if (XR && XR.back) XR.back(instant);
  const d = instant ? 0 : (XR && XR.delay) || 0;
  setTimeout(() => { ph.style.transform = ''; ph.style.opacity = ''; setTimeout(() => { if (!st.classList.contains('open')) { ph.style.transformOrigin = ''; ph.style.height = ''; } }, 820); }, d);
  if (!isDesk()) st.style.height = st._h0 + 'px';
  const keep = XR && XR.keep; XR = null;
  setTimeout(() => { if (!st.classList.contains('open')) { if (keep && CUR) prepIll(CUR); else xr.innerHTML = ''; } }, instant ? 0 : 900);
}
// ilustracija bez fotografije: slojevi su već sklopljeni na pozornici
function prepIll(it) {
  const st = $('#st'), xr = $('#xr'), W = st.clientWidth; if (!W) return requestAnimationFrame(() => prepIll(it));
  const pr = { x: 0, y: 0, w: W, h: st.offsetHeight, cx: W / 2, cy: st.offsetHeight * .46 };
  let r; if (it.kind === 'drink') r = buildGlass(xr, it, W, pr, true); else if (it.mode === 'pizza') r = buildPizza(xr, it, curComps(it), W, pr, true); else r = buildStack(xr, it, curComps(it), W, pr, true);
  r.still();
  if (it.mode === 'stack' || it.mode === 'cake') { xr.style.transformOrigin = `${f1(W / 2)}px ${f1(pr.cy)}px`; xr.style.transform = `scale(${isDesk() ? 1.25 : 1.34})`; }
}

// ---------- knoll: sastojci složeni u mrežu, izleću iz tanjira
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
// ---------- stack: slojevi (burger, sendvič, kolač)
function buildStack(xr, it, comps, W, pr, ill) {
  const cake = it.mode === 'cake', main = comps.filter(c => !c.side), sides = comps.filter(c => c.side);
  const shape = cake ? 'wedge' : (it.shape || 'round');
  const Wl = Math.min(W * .5, cake ? 300 : 280), s = Wl / 700, x0 = Math.max(12, W * .04), top0 = 78;
  const Ls = main.map((c, i) => { const o = cake ? K.cake(c.a, shape) : K.layer(c.a, { pos: i === 0 ? 'top' : i === main.length - 1 ? 'bottom' : 'mid', shape, seed: i }); return { c, o, h: o.h * s }; });
  const as = [0]; for (let i = 1; i < Ls.length; i++) { const p = Ls[i - 1].o, q = Ls[i].o; as.push(as[i - 1] + (cake ? (p.t || 40) : (p.b - q.c - 6)) * s); }
  const asH = as[as.length - 1] + Ls[Ls.length - 1].h;
  const gp = cake ? 18 : 13, ex = [top0]; for (let i = 1; i < Ls.length; i++) { const p = Ls[i - 1].o, q = Ls[i].o; ex.push(ex[i - 1] + (p.b - (q.top || 0)) * s + gp); }
  const exEnd = ex[ex.length - 1] + Ls[Ls.length - 1].h;
  // sklopljeno: centrirano gde je jelo (ili na sredini pozornice za ilustraciju)
  const ax = ill ? (W - Wl) / 2 : x0, asTop = ill ? Math.max(70, pr.cy - asH / 2) : top0 + Math.max(0, (Math.min(exEnd - top0, 420) - asH) / 2);
  const asY = as.map(y => asTop + y);
  const lx = x0 + Wl + 22, lw = W - lx - 12; const cyL = i => ex[i] + Ls[i].o.c * s;
  xr.innerHTML = Ls.map(l => lab(l.c, lx, 0, lw)).join('');
  const LP = placeLabels($$('.lb', xr), Ls.map((l, i) => cyL(i)));
  const sideY = Math.max(exEnd, LP.bottom + 10) + 22; let H = sideY + (sides.length ? 160 : 0) + 60;
  let h = Ls.map((l, i) => `<div class="ly" style="width:${f1(Wl)}px;left:0;z-index:${60 - i}">${l.o.svg}</div>`).join('');
  h += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${Ls.map((l, i) => { const y0 = cyL(i), x1 = x0 + Wl * (cake ? .86 : .9), y1 = LP.anchors[i]; return `<path d="M${f1(x1)} ${f1(y0)}C${f1(lx - 14)} ${f1(y0)} ${f1(lx - 20)} ${f1(y1)} ${f1(lx - 5)} ${f1(y1)}"/><circle cx="${f1(x1)}" cy="${f1(y0)}" r="2.6"/>`; }).join('')}</svg>`;
  h += Ls.map((l, i) => lab(l.c, lx, LP.tops[i], lw)).join('');
  if (sides.length) h += `<div class="sides" style="top:${f1(sideY)}px"><span>${t('with_dish')}</span><div>${sides.map((c, i) => `<div class="sd"><div class="sp">${K.top(c.a, 40 + i)}</div><b>${esc(cnm(c))}</b><small class="num">${c.g} g · ${c.kcal} kcal</small></div>`).join('')}</div></div>`;
  h += totLine(it, H - 48);
  xr.innerHTML = h;
  const lys = $$('.ly', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), sd = $('.sides', xr), tot = $('.xr-tot', xr);
  if (sd) { H = sideY + sd.offsetHeight + 70; tot.style.top = (H - 50) + 'px'; }
  lys.forEach((el, i) => { el.style.transition = 'none'; el.style.opacity = ill ? 1 : 0; el.style.transform = `translate(${f1(ax)}px,${f1(asY[i])}px)`; });
  const sc = Math.min(1, Wl * 1.25 / pr.w);
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
  xr.innerHTML = ls.map(l => lab(l.c, lx, 0, lw)).join('');
  const order = ls.map((l, i) => n - 1 - i), lbsTmp = $$('.lb', xr);
  const LPo = placeLabels(order.map(i => lbsTmp[i]), order.map(i => cyE[i]));
  const ly = [], lt = []; order.forEach((i, j) => { ly[i] = LPo.anchors[j]; lt[i] = LPo.tops[j]; });
  const H = Math.max(exEnd, LPo.bottom + 20) + 70;
  let h = ls.map((l, i) => `<div class="pz${i === 0 ? ' base' : ''}" style="width:${f1(D)}px;height:${f1(D)}px;left:0;z-index:${10 + i}">${l.svg}</div>`).join('');
  h += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${ls.map((l, i) => { const x1 = x0 + D * (i === 0 ? .99 : .86); return `<path d="M${f1(x1)} ${f1(cyE[i])}C${f1(lx - 14)} ${f1(cyE[i])} ${f1(lx - 18)} ${f1(ly[i])} ${f1(lx - 5)} ${f1(ly[i])}"/><circle cx="${f1(x1)}" cy="${f1(cyE[i])}" r="2.6"/>`; }).join('')}</svg>`;
  h += ls.map((l, i) => lab(l.c, lx, lt[i], lw)).join('') + totLine(it, H - 48);
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
// ---------- čaša: tečnosti se odvajaju po slojevima
function buildGlass(xr, it, W, pr, ill) {
  const { g, geo, lay } = glassGeo(it), n = lay.length;
  const Wg = Math.min(W * .4, 210), kk = Wg / 200, Hg = 300 * kk, x0 = Math.max(16, W * .07), gap = Math.max(16, Math.min(30, 220 / n));
  const top0 = 84 + (n - 1) * gap;
  const asX = ill ? (W - Wg) / 2 : x0, asTop = ill ? Math.max(64, pr.cy - Hg / 2) : top0;
  const exY = i => top0 - i * gap;               // gornji slojevi se dižu više
  const cyE = i => exY(i) + (geo[i].y0 + geo[i].h / 2) * kk;
  const lx = x0 + Wg + 26, lw = W - lx - 12;
  const items = lay.map((l, i) => { const q = U.lq[l[0]]; return { name: L === 'en' ? q[1] : q[0], g: l[1], col: q[2] }; });
  xr.innerHTML = items.map(c => lab(c, lx, 0, lw, `${c.g} ml`)).join('');
  const order = items.map((c, i) => n - 1 - i), tmp = $$('.lb', xr);
  const LPo = placeLabels(order.map(i => tmp[i]), order.map(i => cyE(i)));
  const ly = [], lt = []; order.forEach((i, j) => { ly[i] = LPo.anchors[j]; lt[i] = LPo.tops[j]; });
  const H = Math.max(top0 + Hg + 30, LPo.bottom + 30) + 60;
  let h = `<div class="gl-base" style="width:${f1(Wg)}px;left:0;transform:translate(${f1(asX)}px,${f1(asTop)}px)">${glassOutline(it)}</div>`;
  h += lay.map((l, i) => `<div class="gl-l" style="width:${f1(Wg)}px;left:0;z-index:${10 + i}">${glassSVG(it, i, i)}</div>`).join('');
  h += `<svg class="xl" width="${W}" height="${f1(H)}" viewBox="0 0 ${W} ${f1(H)}" aria-hidden="true">${lay.map((l, i) => { const x1 = x0 + Wg * .82; return `<path d="M${f1(x1)} ${f1(cyE(i))}C${f1(lx - 14)} ${f1(cyE(i))} ${f1(lx - 18)} ${f1(ly[i])} ${f1(lx - 5)} ${f1(ly[i])}"/><circle cx="${f1(x1)}" cy="${f1(cyE(i))}" r="2.6"/>`; }).join('')}</svg>`;
  h += items.map((c, i) => lab(c, lx, lt[i], lw, `${c.g} ml`)).join('');
  const tml = lay.reduce((a, l) => a + l[1], 0);
  h += `<div class="xr-tot" style="top:${f1(H - 48)}px"><b class="num">${nf(tml)} ml</b> · ${esc(t('glass'))}</div>`;
  xr.innerHTML = h;
  const base = $('.gl-base', xr), els = $$('.gl-l', xr), lbs = $$('.lb', xr), paths = $$('.xl path, .xl circle', xr), tot = $('.xr-tot', xr);
  els.forEach(el => { el.style.transition = 'none'; el.style.opacity = ill ? 1 : 0; el.style.transform = `translate(${f1(asX)}px,${f1(asTop)}px)`; });
  base.style.opacity = ill ? 1 : 0;
  return {
    H, keep: !!ill, delay: 400, photo: { tf: '', op: ill ? 1 : 0 }, still() { },
    play() { void xr.offsetWidth; const D = reduced ? 0 : 1;
      els.forEach(el => { el.style.transition = 'opacity .35s'; el.style.opacity = 1; }); base.style.opacity = 1;
      setTimeout(() => {
        base.style.transition = 'transform .8s var(--spring), opacity .5s'; base.style.transform = `translate(${f1(x0)}px,${f1(top0)}px)`; base.style.opacity = .22;
        els.forEach((el, i) => { el.style.transition = ''; el.style.transitionDelay = (D ? i * 60 : 0) + 'ms'; el.style.transform = `translate(${f1(x0)}px,${f1(exY(i))}px)`; });
        lbs.forEach((el, i) => { el.style.transitionDelay = (D ? 300 + (n - 1 - i) * 60 : 0) + 'ms'; el.classList.add('on'); });
        paths.forEach((p, i) => { p.style.transitionDelay = (D ? 340 + Math.floor(i / 2) * 60 : 0) + 'ms'; p.classList.add('on'); });
        tot.style.transitionDelay = (D ? 500 + n * 60 : 0) + 'ms'; tot.classList.add('on');
      }, D && !ill ? 420 : 30);
    },
    back(instant) {
      lbs.forEach(el => { el.style.transitionDelay = '0ms'; el.classList.remove('on'); }); paths.forEach(p => { p.style.transitionDelay = '0ms'; p.classList.remove('on'); }); tot.classList.remove('on');
      base.style.transform = `translate(${f1(asX)}px,${f1(asTop)}px)`; base.style.opacity = ill ? 1 : 0;
      els.forEach((el, i) => { el.style.transitionDelay = (i * 20) + 'ms'; el.style.transform = `translate(${f1(asX)}px,${f1(asTop)}px)`; });
      if (!ill) setTimeout(() => els.forEach(el => { el.style.transition = 'opacity .3s'; el.style.opacity = 0; }), instant ? 0 : 450);
    }
  };
}

// ---------------------------------------------------------------- lista
const cartCount = () => CART.reduce((a, c) => a + c.q, 0);
const cartSum = () => CART.reduce((a, c) => { const it = BY[c.id]; if (!it) return a; const p = it.var ? it.var[c.v || 0].price : it.price; return a + p * c.q; }, 0);
const plural = n => { const m10 = n % 10, m100 = n % 100; if (L === 'en') return n === 1 ? t('item1') : t('items'); return m10 === 1 && m100 !== 11 ? t('item1') : (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) ? t('items2') : t('items'); };
function addToCart(it) {
  const ex = CART.find(c => c.id === it.id && (c.v || 0) === VAR); if (ex) ex.q += QTY; else CART.push({ id: it.id, v: VAR, q: QTY });
  LS.set('cart', CART); updDock(true); toast(`${t('added')} · ${nm(it)}`); hit('add', it.id);
  setTimeout(() => history.back(), 450);
}
function updDock(bump) {
  const n = cartCount(); $('#bagN').textContent = n; $('#bagN').classList.toggle('on', n > 0);
  $('#dock').classList.toggle('on', n > 0); $('#dockT').textContent = `${n} ${plural(n)} · ${nf(cartSum())} RSD`; $('#dockS').textContent = t('list_lead');
  if (bump) { const b = $('#bagBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
}
function openCart() {
  const sh = $('#cart');
  const rows = CART.map((c, i) => { const it = BY[c.id]; if (!it) return ''; const p = it.var ? it.var[c.v || 0].price : it.price;
    let th = it.kind === 'cake' ? `<img src="img/k/${it.cut}.webp" alt="" style="object-fit:contain">` : photoOf(it) ? `<img src="${img(photoOf(it)[0], 1)}" alt="">` : it.kind === 'drink' ? (it.img ? `<img src="${img(it.img, 1)}" alt="">` : it.layers ? glassSVG(it) : '') : K.top(((it.comps || [])[0] || {}).a || 'fries', 1);
    return `<div class="ci"><span class="th">${th}</span><span><b>${esc(nm(it))}</b><small>${it.var ? esc(nm(it.var[c.v || 0])) + ' · ' : ''}${nf(p)} RSD</small></span><div class="qty"><button data-m="${i}">−</button><b class="num">${c.q}</b><button data-p="${i}">+</button></div></div>`; }).join('');
  sh.innerHTML = `<div class="bar"><span></span><button class="rb" id="cClose" aria-label="${esc(t('close'))}">${IC.x}</button></div><div class="scroll"><h2>${esc(t('list'))}</h2><p class="lead">${esc(t('list_lead'))}</p>
    ${CART.length ? rows + `<div class="sum"><span>${t('total')}</span><b class="num">${nf(cartSum())} RSD</b></div><div style="display:grid;gap:10px;margin-top:8px"><button class="btn btn-m" id="showBtn">${IC.eye}${esc(t('show_waiter'))}</button><button class="btn btn-o" id="callBtn">${IC.bell}${esc(t('call_waiter'))}</button></div>` : `<p class="empty">${esc(t('empty'))}</p>`}</div>`;
  sh.classList.add('on'); $('#scrim').classList.add('on'); document.body.classList.add('lock');
  $('#cClose').onclick = closeCart;
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

// ---------------------------------------------------------------- torte: zahtev
function openCakeForm() {
  const sh = $('#cart'); const d = new Date(); d.setDate(d.getDate() + 3); const min = d.toISOString().slice(0, 10);
  sh.innerHTML = `<div class="bar"><span></span><button class="rb" id="cClose" aria-label="${esc(t('close'))}">${IC.x}</button></div><div class="scroll"><h2>${esc(t('order_cake'))}</h2><p class="lead">${esc(t('torte_lead'))}</p>
   <form class="form" id="cakeF"><label>${t('flavor')}<select name="u">${U.torte.map(x => `<option>${esc(x.sr)} · ${nf(x.price)} RSD/kg</option>`).join('')}</select></label>
   <label>${t('weight')}<div class="kgs">${[1, 1.5, 2, 3, 4].map(k => `<button type="button" data-k="${k}" aria-pressed="${k === 2}">${String(k).replace('.', ',')} kg</button>`).join('')}</div></label>
   <div class="two"><label>${t('date')}<input type="date" name="d" min="${min}" value="${min}"></label><label>${t('pickup')}<select name="p">${U.locs.map(l => `<option>${esc(l.short)}</option>`).join('')}</select></label></div>
   <label>${t('msg')}<input name="m" maxlength="40" placeholder="Srećan rođendan, Ana!"></label>
   <div class="two"><label>${t('name')}<input name="n" autocomplete="name"></label><label>${t('phone')}<input name="t" type="tel" autocomplete="tel"></label></div>
   <button class="btn btn-m" type="submit">${esc(t('send'))}</button></form></div>`;
  sh.classList.add('on'); $('#scrim').classList.add('on'); document.body.classList.add('lock'); $('#cClose').onclick = closeCart;
  $$('.kgs button', sh).forEach(b => b.onclick = () => $$('.kgs button', sh).forEach(x => x.setAttribute('aria-pressed', x === b)));
  $('#cakeF').onsubmit = e => { e.preventDefault(); hit('torta', LOC); $('.scroll', sh).innerHTML = `<div class="ok-msg">${IC.ok}<h2>${esc(t('sent_t'))}</h2><p class="lead">${esc(t('sent_d'))}</p><button class="btn btn-o" id="okC">${esc(t('close'))}</button></div>`; $('#okC').onclick = closeCart; };
}

// ---------------------------------------------------------------- DEMO oznaka i ulaz
function demoBadge() {
  const b = document.createElement('button'); b.className = 'demo'; b.innerHTML = `<i></i><span class="sh-t">TipTap demo</span><span class="lg-t">${esc(t('demo_t'))}</span>`; document.body.appendChild(b);
  const p = document.createElement('div'); p.className = 'demo-p'; p.innerHTML = `<h4>${esc(t('demo_t'))}</h4><p>Tri dela istog sistema. Sve što gost uradi u meniju vidi se u upravi na ovom uređaju.</p>
   <nav><a class="cur" href="./">${IC.menu}<span><b>Digitalni meni</b><span>Ono što gost vidi za stolom</span></span></a><a href="rezervacije/">${IC.plan}<span><b>Rezervacije i tlocrt</b><span>Gost bira sto, hostesa vodi salu</span></span></a><a href="uprava/">${IC.chart}<span><b>Uprava i analitika</b><span>Promet, gosti, jelovnik, recenzije</span></span></a></nav>
   <footer>Demo podaci osim jelovnika, cena i fotografija (ultracaffe.rs i @ultra_caffe). Napravio TipTap.</footer>`;
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
  renderHero(); renderSecs(); renderMain(); updDock();
  const d = $('.demo'); if (d) d.innerHTML = `<i></i><span class="sh-t">TipTap demo</span><span class="lg-t">${esc(t('demo_t'))}</span>`;
}

skeleton(); demoBadge(); render(); intro();
addEventListener('resize', () => { if (CUR) { if ($('#st').classList.contains('open')) { closeX(true); } sizeStage(CUR); } });
if (location.hash.length > 1) { const id = decodeURIComponent(location.hash.slice(1)); if (BY[id]) { history.replaceState(null, '', location.pathname + location.search); openItem(id); } }
})();
