/* =====================================================================
   ULTRA CAFFE · TipTap Signature demo — rezervacije i tlocrt
   Gost: dan → broj osoba → vreme → sto na tlocrtu → podaci → potvrda.
   Hostesa: sala uživo (klizač vremena), lista dolazaka, vremenska traka.
   ===================================================================== */
(function () {
'use strict';
const U = window.UC, M = window.UCM;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const f1 = n => Math.round(n * 10) / 10;
const LS = { get(k, d) { try { const v = localStorage.getItem('uc_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem('uc_' + k, JSON.stringify(v)); } catch (e) { } } };
const qs = new URLSearchParams(location.search);
let L = qs.get('lang') || LS.get('lang', 'sr'); if (!['sr', 'en'].includes(L)) L = 'sr';
let LOC = qs.get('lokal') || LS.get('loc', 'centar'); if (!U.locs.some(l => l.id === LOC)) LOC = 'centar';
let MODE = qs.get('mod') === 'sala' ? 'staff' : 'guest';
const TX = {
  sr: { back: 'Meni', guest: 'Rezervacija', staff: 'Sala uživo', title: 'Rezervišite sto', lead: 'Izaberite dan, vreme i svoj sto na tlocrtu. Potvrdu šaljemo porukom.',
    s1: 'Kada i koliko vas je?', day: 'Dan', ppl: 'Broj osoba', time: 'Vreme dolaska', today: 'Danas', tomorrow: 'Sutra', few: 'još malo slobodnih stolova', full: 'popunjeno',
    s2: 'Izaberite sto', all: 'Svi', free: 'Slobodan za vas', taken: 'Zauzet ili ne odgovara', yours: 'Vaš sto', s3: 'Vaši podaci', name: 'Ime i prezime', phone: 'Telefon',
    note: 'Napomena (nije obavezno)', occ: 'Povod', confirm: 'Potvrdi rezervaciju', choose_t: 'Izaberite sto na tlocrtu', ok_t: 'Sto je rezervisan', ok_d: 'Poslali smo potvrdu porukom. Ako kasnite više od 15 minuta, pozovite lokal.',
    ok_note: 'U demo verziji poruka se ne šalje, a rezervacija ostaje sačuvana samo na ovom uređaju.', see_staff: 'Pogledaj kako je vidi hostesa', to_menu: 'Nazad na meni', another: 'Nova rezervacija',
    table: 'Sto', seats: 'mesta', upto: 'do', persons: 'osobe', persons5: 'osoba', pan: 'Pomerite tlocrt levo-desno', place: 'Lokal', date: 'Datum', at: 'Vreme', guests: 'Gosti',
    k_res: 'Rezervacije', k_cov: 'Očekivanih gostiju', k_now: 'Za stolom sada', k_next: 'Sledeći dolazak', k_free: 'slobodnih stolova', none: 'nema', now: 'Sada', play: 'Pusti dan',
    arrivals: 'Dolasci', timeline: 'Raspored stolova', st_booked: 'Rezervisano', st_soon: 'Stiže uskoro', st_seated: 'Za stolom', st_done: 'Završeno', st_noshow: 'Nije došlo', st_mine: 'Vaša',
    source: 'Izvor', phone2: 'Telefon', note2: 'Napomena', occ2: 'Povod', seat_btn: 'Smesti za sto', call_btn: 'Pozovi', close: 'Zatvori', okvir: 'Okvirni raspored — uskladićemo ga sa vašom skicom lokala.',
    leg_free: 'Slobodno', leg_soon: 'Stiže za manje od sat vremena', leg_seat: 'Gosti za stolom', leg_late: 'Kasni ili nije došlo', occs: ['Rođendan', 'Poslovni ručak', 'Godišnjica', 'Proslava', 'Porodični ručak'] },
  en: { back: 'Menu', guest: 'Booking', staff: 'Live floor', title: 'Book a table', lead: 'Pick a day, a time and your own table on the floor plan. We confirm by text message.',
    s1: 'When, and how many of you?', day: 'Day', ppl: 'Guests', time: 'Arrival time', today: 'Today', tomorrow: 'Tomorrow', few: 'only a few tables left', full: 'fully booked',
    s2: 'Choose your table', all: 'All', free: 'Free for you', taken: 'Taken or doesn’t fit', yours: 'Your table', s3: 'Your details', name: 'Full name', phone: 'Phone',
    note: 'Note (optional)', occ: 'Occasion', confirm: 'Confirm booking', choose_t: 'Pick a table on the plan', ok_t: 'Your table is booked', ok_d: 'We’ve sent a confirmation by text. If you’re running more than 15 minutes late, please call us.',
    ok_note: 'In this demo no message is sent; the booking is stored on this device only.', see_staff: 'See it the way the host does', to_menu: 'Back to the menu', another: 'New booking',
    table: 'Table', seats: 'seats', upto: 'up to', persons: 'guests', persons5: 'guests', pan: 'Drag the plan sideways', place: 'Venue', date: 'Date', at: 'Time', guests: 'Guests',
    k_res: 'Bookings', k_cov: 'Expected guests', k_now: 'Seated now', k_next: 'Next arrival', k_free: 'tables free', none: 'none', now: 'Now', play: 'Play the day',
    arrivals: 'Arrivals', timeline: 'Table schedule', st_booked: 'Booked', st_soon: 'Arriving soon', st_seated: 'Seated', st_done: 'Finished', st_noshow: 'No-show', st_mine: 'Yours',
    source: 'Source', phone2: 'Phone', note2: 'Note', occ2: 'Occasion', seat_btn: 'Seat guests', call_btn: 'Call', close: 'Close', okvir: 'Approximate layout — we’ll match it to your floor sketch.',
    leg_free: 'Free', leg_soon: 'Arriving within the hour', leg_seat: 'Guests seated', leg_late: 'Late or no-show', occs: ['Birthday', 'Business lunch', 'Anniversary', 'Celebration', 'Family lunch'] }
};
const t = k => (TX[L][k] != null ? TX[L][k] : TX.sr[k]);
const loc = () => U.locs.find(l => l.id === LOC);
const hm = h => { const hh = Math.floor(h) % 24, mm = Math.round((h - Math.floor(h)) * 60); return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`; };
const DAYS_SR = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'], DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MON_SR = ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'];
const persons = n => (L === 'en' ? (n === 1 ? 'guest' : 'guests') : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'osobe' : 'osoba'));
const IC = {
  back: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>',
  next: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 5.5 16 12l-6.5 6.5"/></svg>',
  play: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>', pause: '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="5.5" width="4" height="13" rx="1"/><rect x="13.5" y="5.5" width="4" height="13" rx="1"/></svg>',
  user: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1-3.6 3.6-5.5 7-5.5s6 1.9 7 5.5"/></svg>',
  plan: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2.2"/><rect x="13" y="13" width="5" height="5" rx="1.2"/></svg>',
  ok: '<svg class="big" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="28" opacity=".35"/><path d="M20 33l8 8 16-17"/></svg>',
  menu: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5 5h14M5 12h14M5 19h9"/></svg>',
  chart: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>'
};

// ---------------------------------------------------------------- crtanje tlocrta
const ZONE_IMG = { centar: { sala: 'centar-sala', separe: 'centar-separe', prozor: 'centar-sala-2', sank: 'centar-bar', lounge: 'chesterfield', galerija: 'centar-galerija', terasa: 'centar-terasa' },
  big: { banketi: 'big-separe', sala: 'big-sala', sank: 'big-sala', prozor: 'big-staklo', terasa: 'big-terasa' } };
function chairsFor(t) {
  const out = [], s = t.seats;
  if (t.shape === 'round') { const r = (s <= 2 ? 26 : 34) + 15; for (let i = 0; i < s; i++) { const a = -Math.PI / 2 + i / s * Math.PI * 2 + (s === 2 ? Math.PI / 2 : 0); out.push([t.x + Math.cos(a) * r, t.y + Math.sin(a) * r, a]); } }
  else if (t.shape === 'square') { const d = 46; [[0, -d], [d, 0], [0, d], [-d, 0]].slice(0, s).forEach(([dx, dy]) => out.push([t.x + dx, t.y + dy, Math.atan2(dy, dx)])); }
  else if (t.shape === 'rect') { const w = t.w || 150, per = Math.ceil(s / 2); for (let i = 0; i < per; i++) { const x = t.x - w / 2 + w * (i + .5) / per; out.push([x, t.y - 46, -Math.PI / 2]); if (out.length < s) out.push([x, t.y + 46, Math.PI / 2]); } }
  else if (t.shape === 'high') { out.push([t.x - 30, t.y, Math.PI], [t.x + 30, t.y, 0]); }
  return out;
}
function tableSVG(tb, st) {
  const S = {
    free: ['rgba(241,234,223,.08)', '#F1EADF', 1.8, '#F1EADF', 'rgba(241,234,223,.2)'], off: ['rgba(241,234,223,.025)', 'rgba(241,234,223,.2)', 1.2, 'rgba(241,234,223,.38)', 'rgba(241,234,223,.07)'],
    sel: ['#CFA670', '#EBCF9F', 2.4, '#1a1208', 'rgba(207,166,112,.75)'], booked: ['rgba(241,234,223,.05)', 'rgba(207,166,112,.7)', 1.6, '#E6C899', 'rgba(241,234,223,.12)'],
    soon: ['rgba(207,166,112,.2)', '#CFA670', 2.4, '#F2DDB6', 'rgba(207,166,112,.35)'], seated: ['#2D666C', '#6FB6BD', 2, '#E4F6F7', 'rgba(111,182,189,.55)'],
    late: ['rgba(201,104,75,.16)', '#D9775A', 2.2, '#F3B29C', 'rgba(201,104,75,.3)'], done: ['rgba(241,234,223,.03)', 'rgba(241,234,223,.16)', 1.2, 'rgba(241,234,223,.4)', 'rgba(241,234,223,.08)']
  }[st] || ['rgba(241,234,223,.05)', 'rgba(241,234,223,.3)', 1.4, '#F1EADF', 'rgba(241,234,223,.12)'];
  const [fill, stroke, sw, txt, chf] = S; let g = '', body = '';
  const dash = st === 'booked' ? ' stroke-dasharray="6 5"' : '';
  chairsFor(tb).forEach(([x, y, a]) => { g += `<rect class="ch" x="${f1(x - 10)}" y="${f1(y - 7)}" width="20" height="14" rx="5" fill="${chf}" transform="rotate(${f1(a * 57.3 + 90)} ${f1(x)} ${f1(y)})"/>`; });
  if (tb.shape === 'round') body = `<circle class="bd" cx="${tb.x}" cy="${tb.y}" r="${tb.seats <= 2 ? 26 : 34}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
  else if (tb.shape === 'square') body = `<rect class="bd" x="${tb.x - 32}" y="${tb.y - 32}" width="64" height="64" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
  else if (tb.shape === 'rect') { const w = tb.w || 150; body = `<rect class="bd" x="${tb.x - w / 2}" y="${tb.y - 32}" width="${w}" height="64" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`; }
  else if (tb.shape === 'high') body = `<circle class="bd" cx="${tb.x}" cy="${tb.y}" r="19" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
  else if (tb.shape === 'booth' || tb.shape === 'lounge') {
    const w = tb.w || 150, h = tb.h || 96, rot = tb.rot || 0, bc = st === 'sel' ? '#8a6a3c' : st === 'seated' ? '#1f4d52' : '#1F4148';
    g = `<g transform="rotate(${rot} ${tb.x} ${tb.y})"><path d="M${tb.x - w / 2} ${tb.y + h / 2 - 6}V${tb.y - h / 2 + 14}Q${tb.x - w / 2} ${tb.y - h / 2} ${tb.x - w / 2 + 14} ${tb.y - h / 2}H${tb.x + w / 2 - 14}Q${tb.x + w / 2} ${tb.y - h / 2} ${tb.x + w / 2} ${tb.y - h / 2 + 14}V${tb.y + h / 2 - 6}" fill="none" stroke="${bc}" stroke-width="22" stroke-linecap="round"/>` +
      `<path d="M${tb.x - w / 2} ${tb.y + h / 2 - 6}V${tb.y - h / 2 + 14}Q${tb.x - w / 2} ${tb.y - h / 2} ${tb.x - w / 2 + 14} ${tb.y - h / 2}H${tb.x + w / 2 - 14}Q${tb.x + w / 2} ${tb.y - h / 2} ${tb.x + w / 2} ${tb.y - h / 2 + 14}V${tb.y + h / 2 - 6}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="2" stroke-dasharray="3 9"/></g>`;
    const iw = rot ? h - 46 : w - 46, ih = rot ? w - 56 : h - 44;
    body = tb.shape === 'lounge' ? `<ellipse class="bd" cx="${tb.x}" cy="${tb.y + 6}" rx="${w / 2 - 34}" ry="${h / 2 - 22}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}/>` :
      `<rect class="bd" x="${f1(tb.x - iw / 2)}" y="${f1(tb.y - ih / 2 + (rot ? 0 : 8))}" width="${f1(iw)}" height="${f1(ih)}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
  }
  const ty = tb.shape === 'booth' && !tb.rot ? tb.y + 13 : tb.shape === 'lounge' ? tb.y + 11 : tb.y + 5;
  const dot = st === 'soon' ? `<circle cx="${tb.x + (tb.shape === 'rect' ? (tb.w || 150) / 2 - 10 : 24)}" cy="${tb.y - 24}" r="6" fill="#CFA670" stroke="#0C1A1D" stroke-width="2"/>` : '';
  return `<g class="tb ${st}" data-t="${esc(tb.id)}" tabindex="${st === 'off' || st === 'done' ? -1 : 0}" role="button" aria-label="${esc(t('table'))} ${esc(tb.id)}, ${tb.seats} ${t('seats')}">${g}${body}<text x="${tb.x}" y="${ty}" text-anchor="middle" fill="${txt}">${esc(tb.id)}</text>${dot}</g>`;
}
function fixtureSVG(f) {
  const lab = (x, y, s, rot) => s ? `<text class="lab" x="${x}" y="${y}" text-anchor="middle"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}>${esc(s)}</text>` : '';
  switch (f.t) {
    case 'bar': { const v = f.h > f.w; return `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="14" fill="#173036" stroke="#CFA670" stroke-width="1.6"/><rect x="${f.x + 8}" y="${f.y + 8}" width="${f.w - 16}" height="${f.h - 16}" rx="9" fill="none" stroke="rgba(207,166,112,.25)"/>` + lab(f.x + f.w / 2, f.y + f.h / 2 + 5, f.label, v ? -90 : 0); }
    case 'vitrina': return `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="10" fill="rgba(241,234,223,.05)" stroke="rgba(241,234,223,.35)" stroke-width="1.4"/>` + Array.from({ length: 9 }, (_, i) => `<circle cx="${f.x + 22 + i * ((f.w - 44) / 8)}" cy="${f.y + f.h / 2}" r="8" fill="${['#C9684B', '#E6C899', '#7a4a2c', '#B9476A', '#9DBB68'][i % 5]}" opacity=".55"/>`).join('') + lab(f.x + f.w / 2, f.y - 10, f.label);
    case 'stairs': return `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="6" fill="rgba(241,234,223,.025)" stroke="rgba(241,234,223,.25)"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${f.x + 10} ${f.y + 14 + i * (f.h - 28) / 8}H${f.x + f.w - 10}" stroke="rgba(241,234,223,.18)"/>`).join('') + `<path d="M${f.x + f.w / 2} ${f.y + f.h - 16}V${f.y + 22}m-8 10 8-10 8 10" stroke="rgba(207,166,112,.7)" stroke-width="2" fill="none"/>` + lab(f.x + f.w / 2, f.y + f.h + 22, f.label);
    case 'plant': return `<circle cx="${f.x}" cy="${f.y}" r="${f.r}" fill="#22402a"/>` + Array.from({ length: 7 }, (_, i) => { const a = i / 7 * 6.283; return `<ellipse cx="${f1(f.x + Math.cos(a) * f.r * .45)}" cy="${f1(f.y + Math.sin(a) * f.r * .45)}" rx="${f1(f.r * .5)}" ry="${f1(f.r * .22)}" fill="${i % 2 ? '#3f6b3a' : '#4f7f45'}" transform="rotate(${f1(a * 57.3)} ${f1(f.x + Math.cos(a) * f.r * .45)} ${f1(f.y + Math.sin(a) * f.r * .45)})"/>`; }).join('');
    case 'tree': return `<circle cx="${f.x}" cy="${f.y}" r="${f.r}" fill="#1e3a25" opacity=".9"/>` + Array.from({ length: 11 }, (_, i) => { const a = i / 11 * 6.283; return `<circle cx="${f1(f.x + Math.cos(a) * f.r * .55)}" cy="${f1(f.y + Math.sin(a) * f.r * .55)}" r="${f1(f.r * .36)}" fill="${i % 2 ? '#2f5634' : '#3a6a40'}" opacity=".9"/>`; }).join('');
    case 'column': return `<rect x="${f.x - f.r}" y="${f.y - f.r}" width="${f.r * 2}" height="${f.r * 2}" rx="3" fill="#2a454b" stroke="rgba(241,234,223,.25)"/>`;
    case 'wc': return `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="6" fill="url(#hatch)" stroke="rgba(241,234,223,.2)"/>` + lab(f.x + f.w / 2, f.y + f.h / 2 + 5, f.label);
    case 'greenwall': return `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="6" fill="#26432a"/>` + Array.from({ length: Math.round(f.h / 14) }, (_, i) => `<circle cx="${f.x + 6 + (i % 2) * 12}" cy="${f.y + 8 + i * 14}" r="6" fill="${i % 3 ? '#3f6b3a' : '#5a8a4c'}"/>`).join('') + lab(f.x + f.w + 22, f.y + f.h / 2, f.label, -90);
    case 'sofa': return `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="18" fill="#4a2f22" stroke="#7a5038" stroke-width="1.5"/>` + [1, 2, 3].map(i => `<path d="M${f.x + f.w * i / 4} ${f.y + 12}V${f.y + f.h - 12}" stroke="#2f1d14" stroke-width="2"/>`).join('') + lab(f.x + f.w / 2, f.y - 10, f.label);
    case 'kids': return `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="16" fill="rgba(185,71,106,.1)" stroke="rgba(185,71,106,.45)" stroke-dasharray="6 6"/>` + lab(f.x + f.w / 2, f.y + f.h / 2 + 5, f.label);
    case 'planter': return `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="8" fill="#1f3a26"/>` + Array.from({ length: Math.round(f.w / 24) }, (_, i) => `<circle cx="${f.x + 12 + i * 24}" cy="${f.y + f.h / 2}" r="9" fill="${i % 2 ? '#3a6a40' : '#2f5634'}"/>`).join('');
  }
  return '';
}
function planSVG(fl, stateOf) {
  let s = `<svg class="plan" viewBox="0 0 ${fl.w} ${fl.h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(nmF(fl))}"><defs>
    <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.3" fill="rgba(241,234,223,.07)"/></pattern>
    <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V10" stroke="rgba(241,234,223,.1)" stroke-width="3"/></pattern>
    <pattern id="planks" width="120" height="30" patternUnits="userSpaceOnUse"><rect width="120" height="30" fill="#10211f" opacity="0"/><path d="M0 29.5H120M60 0V30" stroke="rgba(241,234,223,.03)"/></pattern>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect width="${fl.w}" height="${fl.h}" fill="#0C1A1D"/><rect width="${fl.w}" height="${fl.h}" fill="url(#dots)"/>`;
  if (fl.street) { const [x0, y0, x1, y1] = fl.street; s += `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="#091315"/><text class="lab2" x="${fl.w - 60}" y="${y1 - 26}" text-anchor="end">${LOC === 'centar' ? 'Pešačka zona · Kralja Aleksandra I' : 'Parking · BIG Retail Park'}</text>`; }
  if (fl.awning) { const [x0, y0, x1, y1] = fl.awning; s += `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="rgba(207,166,112,.035)" stroke="rgba(207,166,112,.25)" stroke-dasharray="10 8"/><text class="lab2" x="${x1 - 14}" y="${y1 - 12}" text-anchor="end">Tenda</text>`; }
  if (!fl.street) s += `<rect x="40" y="40" width="${fl.w - 80}" height="${fl.h - 80}" fill="url(#planks)"/>`;
  (fl.walls || []).forEach(([x0, y0, x1, y1]) => { s += `<path d="M${x0} ${y0}L${x1} ${y1}" stroke="#E9E1D3" stroke-width="9" stroke-linecap="round" opacity=".82"/>`; });
  (fl.windows || []).forEach(([x0, y0, x1, y1]) => { s += `<path d="M${x0} ${y0 - 4}L${x1} ${y1 - 4}M${x0} ${y0 + 4}L${x1} ${y1 + 4}" stroke="#8FB9BE" stroke-width="2.4" opacity=".85"/><path d="M${x0} ${y0}L${x1} ${y1}" stroke="#8FB9BE" stroke-width="1" opacity=".4"/>`; });
  if (fl.glass) { const [x0, y0, x1] = fl.glass; s += `<path d="M${x0} ${y0 - 4}H${x1}M${x0} ${y0 + 4}H${x1}" stroke="#8FB9BE" stroke-width="2.4" opacity=".85"/><text class="lab2" x="${(x0 + x1) / 2}" y="${y0 - 16}" text-anchor="middle">Staklena fasada · ulaz u lokal</text>`; }
  (fl.doors || []).forEach(([x0, y0, x1]) => { const w = x1 - x0; s += `<path d="M${x0} ${y0}A${w / 2} ${w / 2} 0 0 1 ${x0 + w / 2} ${y0 - w / 2}M${x1} ${y0}A${w / 2} ${w / 2} 0 0 0 ${x1 - w / 2} ${y0 - w / 2}" stroke="rgba(241,234,223,.4)" stroke-width="1.4" fill="none"/><path d="M${x0 + w / 2} ${y0}V${y0 - w / 2}" stroke="rgba(241,234,223,.2)"/><text class="lab" x="${x0 + w / 2}" y="${y0 + 28}" text-anchor="middle">Ulaz</text>`; });
  (fl.rail || []).forEach(([x0, y0, x1, y1]) => { s += `<path d="M${x0} ${y0}L${x1} ${y1}" stroke="#CFA670" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" opacity=".75"/><text class="lab2" x="${(x0 + x1) / 2}" y="${y0 + 30}" text-anchor="middle">Staklena ograda · pogled na salu</text>`; });
  (fl.fixtures || []).forEach(f => { s += fixtureSVG(f); });
  fl.tables.forEach(tb => { s += tableSVG(tb, stateOf(tb)); });
  return s + '</svg>';
}
const nmF = fl => (L === 'en' ? fl.en : fl.sr);
const zname = z => (U.zones[z] ? (L === 'en' ? U.zones[z][1] : U.zones[z][0]) : z);

// ---------------------------------------------------------------- stanje
const today = M.day0();
let G = { date: today, ppl: 2, time: null, floor: null, zone: 'all', table: null, occ: '' };
let S = { date: today, h: null, floor: null, sel: null, playing: false };
const durFor = n => (n >= 6 ? 2.5 : n >= 4 ? 2 : 1.5);
function fits(tb, n) { return tb.zone !== 'sank' && tb.seats >= n && tb.seats <= n + 3 && !(tb.seats >= 6 && n <= 2); } // šank je za goste bez rezervacije
function busy(res, tb, a, b) { return res.some(r => r.table === tb.id && r.start < b && r.end > a); }
function slotsFor(date) {
  const l = loc(), wd = (date.getDay() + 6) % 7, [o, c] = l.open[wd]; const out = [];
  const now = new Date(), isToday = M.dkey(date) === M.dkey(now), nowH = now.getHours() + now.getMinutes() / 60;
  for (let h = o + 1; h <= c - 1.5; h += .5) { if (isToday && h < nowH + .5) continue; out.push(h); }
  return out;
}
function availability(date, ppl) {
  const res = M.reservations(LOC, date), tbs = M.tablesOf(LOC).filter(tb => fits(tb, ppl)), d = durFor(ppl);
  return slotsFor(date).map(h => ({ h, n: tbs.filter(tb => !busy(res, tb, h, h + d)).length }));
}

// ---------------------------------------------------------------- GOST
function renderGuest() {
  const v = $('#view'), l = loc();
  const av = availability(G.date, G.ppl);
  if (G.time == null || !av.some(a => a.h === G.time && a.n > 0)) { const pref = av.filter(a => a.n > 0); G.time = (pref.find(a => a.h >= 20) || pref.find(a => a.h >= 19) || pref[pref.length - 1] || {}).h ?? null; G.table = null; }
  if (!G.floor || !l.floors.some(f => f.id === G.floor)) G.floor = l.floors[0].id;
  const days = Array.from({ length: 14 }, (_, i) => M.addD(today, i));
  v.innerHTML = `<div class="rh"><div><h1>${esc(t('title'))}</h1><p>${esc(t('lead'))}</p></div><div class="locs" role="group">${U.locs.map(x => `<button data-loc="${x.id}" aria-pressed="${x.id === LOC}">${esc(x.short)}</button>`).join('')}</div></div>
  <div class="guest"><div class="colL">
   <section class="step done" id="s1"><h2><i>1</i>${esc(t('s1'))}</h2>
    <div class="lbl">${t('day')}</div><div class="days">${days.map((d, i) => `<button data-d="${i}" aria-pressed="${M.dkey(d) === M.dkey(G.date)}"><b>${i === 0 ? t('today') : i === 1 ? t('tomorrow') : (L === 'en' ? DAYS_EN : DAYS_SR)[d.getDay()]}</b><small>${d.getDate()}.${d.getMonth() + 1}.</small></button>`).join('')}</div>
    <div class="lbl">${t('ppl')}</div><div class="ppl"><button id="pm" aria-label="−">−</button><b class="num" id="pn">${G.ppl}</b><button id="pp" aria-label="+">+</button><span>${persons(G.ppl)}</span></div>
    <div class="lbl">${t('time')}</div><div class="slots">${av.map(a => `<button data-h="${a.h}" aria-pressed="${a.h === G.time}" ${a.n ? '' : 'disabled'} class="${a.n > 0 && a.n <= 2 ? 'few' : ''}">${hm(a.h)}</button>`).join('') || `<span style="color:var(--magla)">${t('full')}</span>`}</div>
    <div class="slotnote"><span><i></i>${t('few')}</span></div></section>
   <section class="step" id="s3">${detailsHTML()}</section>
  </div><div class="colR"><section class="step${G.table ? ' done' : ''}" id="s2"></section></div></div>`;
  $$('.locs button', v).forEach(b => b.onclick = () => { LOC = b.dataset.loc; LS.set('loc', LOC); G.floor = null; G.table = null; renderGuest(); });
  $$('.days button', v).forEach(b => b.onclick = () => { G.date = days[+b.dataset.d]; G.table = null; renderGuest(); });
  $('#pm').onclick = () => { G.ppl = Math.max(1, G.ppl - 1); G.table = null; renderGuest(); }; $('#pp').onclick = () => { G.ppl = Math.min(12, G.ppl + 1); G.table = null; renderGuest(); };
  $$('.slots button', v).forEach(b => b.onclick = () => { G.time = +b.dataset.h; G.table = null; renderGuest(); });
  renderPlanG(); bindDetails();
}
function guestState(tb, res) {
  if (G.time == null) return 'off';
  if (G.table === tb.id) return 'sel';
  if (G.zone !== 'all' && tb.zone !== G.zone) return 'off';
  return fits(tb, G.ppl) && !busy(res, tb, G.time, G.time + durFor(G.ppl)) ? 'free' : 'off';
}
function renderPlanG() {
  const box = $('#s2'), l = loc(), fl = l.floors.find(f => f.id === G.floor), res = M.reservations(LOC, G.date);
  const zones = [...new Set(fl.tables.map(x => x.zone))];
  const selT = G.table && M.tablesOf(LOC).find(x => x.id === G.table && x.floor === G.floor);
  box.innerHTML = `<h2><i>2</i>${esc(t('s2'))}</h2>
   <div class="floors locs" style="width:max-content;max-width:100%">${l.floors.map(f => `<button data-f="${f.id}" aria-pressed="${f.id === G.floor}">${esc(nmF(f))}</button>`).join('')}</div>
   ${zones.length > 1 ? `<div class="zchips"><button class="chip${G.zone === 'all' ? ' on' : ''}" data-z="all">${t('all')}</button>${zones.map(z => `<button class="chip${G.zone === z ? ' on' : ''}" data-z="${z}">${esc(zname(z))}</button>`).join('')}</div>` : ''}
   <div class="planbox"><div class="planscroll">${planSVG(fl, tb => guestState(tb, res))}</div><div class="panhint">${t('pan')}</div></div>
   <div class="legend"><span><i style="border-color:#F1EADF;background:rgba(241,234,223,.08)"></i>${t('free')}</span><span><i style="border-color:rgba(241,234,223,.2)"></i>${t('taken')}</span><span><i style="border-color:#EBCF9F;background:#CFA670"></i>${t('yours')}</span></div>
   <div class="selcard${selT ? ' on' : ''}">${selT ? `<img src="../img/a/${(ZONE_IMG[LOC] || {})[selT.zone] || l.hero}-m.webp" alt=""><div><b>${t('table')} ${esc(selT.id)} · ${esc(zname(selT.zone))}</b><span>${t('upto')} ${selT.seats} ${persons(selT.seats)} · ${hm(G.time)}–${hm(G.time + durFor(G.ppl))}</span></div>` : ''}</div>
   <p class="okvir">${esc(t('okvir'))}</p>`;
  $$('.floors button', box).forEach(b => b.onclick = () => { G.floor = b.dataset.f; G.zone = 'all'; renderPlanG(); });
  $$('.zchips .chip', box).forEach(b => b.onclick = () => { G.zone = b.dataset.z; renderPlanG(); });
  $$('.plan .tb', box).forEach(g => { const go = () => { if (!g.classList.contains('free') && !g.classList.contains('sel')) return; G.table = g.dataset.t === G.table ? null : g.dataset.t; renderPlanG(); $('#s3').innerHTML = detailsHTML(); bindDetails(); if (G.table && innerWidth < 1100) setTimeout(() => $('.selcard').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60); };
    g.addEventListener('click', go); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
  const sc = $('.planscroll', box); if (sc.scrollWidth > sc.clientWidth) { const sel = $('.plan .tb.sel', box); if (sel) { const r = sel.getBBox(), k = sc.scrollWidth / fl.w; sc.scrollLeft = Math.max(0, (r.x + r.width / 2) * k - sc.clientWidth / 2); } else sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2; sc.addEventListener('scroll', () => { const h = $('.panhint', box); if (h) h.style.opacity = 0; }, { once: true }); }
  box.classList.toggle('done', !!G.table);
}
function detailsHTML() {
  const l = loc(), d = G.date;
  return `<h2><i>3</i>${esc(t('s3'))}</h2>
   <div class="sumline"><span>${esc(l.name)}</span><span><b>${d.getDate()}. ${MON_SR[d.getMonth()]}</b></span><span><b>${G.time != null ? hm(G.time) : '—'}</b></span><span><b>${G.ppl}</b> ${persons(G.ppl)}</span><span>${G.table ? `${t('table')} <b>${esc(G.table)}</b>` : `<em style="color:var(--mesing2);font-style:normal">${t('choose_t')}</em>`}</span></div>
   <form class="form" id="gf"><div class="two"><label>${t('name')}<input name="n" required autocomplete="name" placeholder="Ana Petrović"></label><label>${t('phone')}<input name="p" required type="tel" autocomplete="tel" placeholder="06x xxx xxxx"></label></div>
   <label>${t('occ')}<div class="occ">${t('occs').map(o => `<button type="button" class="chip${G.occ === o ? ' on' : ''}" data-o="${esc(o)}" aria-pressed="${G.occ === o}">${esc(o)}</button>`).join('')}</div></label>
   <label>${t('note')}<textarea name="m" maxlength="140"></textarea></label>
   <button class="btn btn-m confirm" type="submit" ${G.table ? '' : 'disabled style="opacity:.45"'}>${esc(t('confirm'))}</button></form>`;
}
function bindDetails() {
  const f = $('#gf'); if (!f) return;
  $$('.occ .chip', f).forEach(b => b.onclick = () => { G.occ = G.occ === b.dataset.o ? '' : b.dataset.o; $$('.occ .chip', f).forEach(x => { x.classList.toggle('on', x.dataset.o === G.occ); x.setAttribute('aria-pressed', x.dataset.o === G.occ); }); });
  f.onsubmit = e => {
    e.preventDefault(); if (!G.table) return;
    const tb = M.tablesOf(LOC).find(x => x.id === G.table && x.floor === G.floor), name = f.n.value.trim() || 'Gost';
    const r = { id: 'my-' + Date.now(), loc: LOC, date: M.dkey(G.date), table: tb.id, floor: tb.floor, zone: tb.zone, start: G.time, end: G.time + durFor(G.ppl), party: G.ppl, name, phone: f.p.value.trim(), occ: G.occ, note: f.m.value.trim(), src: 'Digitalni meni' };
    const mine = LS.get('myres', []); mine.push(r); LS.set('myres', mine);
    try { const ev = JSON.parse(localStorage.getItem('uc_ev') || '[]'); ev.push({ t: Date.now(), type: 'res', id: tb.id, loc: LOC, party: G.ppl }); localStorage.setItem('uc_ev', JSON.stringify(ev)); } catch (er) { }
    showOK(r);
  };
}
function showOK(r) {
  const v = $('#view'), l = loc(), d = G.date;
  v.innerHTML = `<div class="okv">${IC.ok}<h2>${esc(t('ok_t'))}</h2><p>${esc(t('ok_d'))}</p>
   <div class="okcard"><div><span>${t('place')}</span><b>${esc(l.name)}</b></div><div><span>${t('date')}</span><b>${(L === 'en' ? DAYS_EN : DAYS_SR)[d.getDay()]}, ${d.getDate()}. ${MON_SR[d.getMonth()]}</b></div><div><span>${t('at')}</span><b>${hm(r.start)}</b></div><div><span>${t('guests')}</span><b>${r.party} ${persons(r.party)}</b></div><div><span>${t('table')}</span><b>${esc(r.table)} · ${esc(zname(r.zone))}</b></div></div>
   <div class="acts"><button class="btn btn-m" id="toStaff">${IC.plan}${esc(t('see_staff'))}</button><a class="btn btn-o" href="../${L === 'en' ? '?lang=en' : ''}">${IC.menu}${esc(t('to_menu'))}</a><button class="btn btn-o" id="again">${esc(t('another'))}</button></div>
   <p class="okvir">${esc(t('ok_note'))}</p></div>`;
  scrollTo({ top: 0 });
  $('#toStaff').onclick = () => { MODE = 'staff'; S.date = M.day0(G.date); S.h = r.start + .25; S.floor = r.floor; S.sel = r.id; render(); };
  $('#again').onclick = () => { G.table = null; renderGuest(); };
}

// ---------------------------------------------------------------- HOSTESA
let playT = null;
function staffRes() { const res = M.reservations(LOC, S.date); const R = M.rng(M.hash('ns' + LOC + M.dkey(S.date))); res.forEach(r => { if (!r.mine && R() < .06) r.noshow = 1; }); return res; }
function rstat(r, h) { if (r.mine && h < r.start) return h > r.start - 1 ? 'soon' : 'booked'; return M.status(r, h); }
function renderStaff() {
  const v = $('#view'), l = loc(), wd = (S.date.getDay() + 6) % 7, [o, c] = l.open[wd];
  const now = new Date(), isToday = M.dkey(S.date) === M.dkey(now);
  if (S.h == null) S.h = isToday ? Math.min(c - .25, Math.max(o, now.getHours() + now.getMinutes() / 60)) : 20;
  S.h = Math.min(c - .25, Math.max(o, S.h));
  if (!S.floor || !l.floors.some(f => f.id === S.floor)) S.floor = l.floors[0].id;
  const res = staffRes(), d = S.date;
  v.innerHTML = `<div class="rh"><div><h1>${esc(t('staff'))}</h1><p>${esc(l.name)} · ${esc(l.addr)}</p></div><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><div class="locs" role="group">${U.locs.map(x => `<button data-loc="${x.id}" aria-pressed="${x.id === LOC}">${esc(x.short)}</button>`).join('')}</div>
    <div class="dnav"><button id="dp" aria-label="−1">${IC.back}</button><b>${(L === 'en' ? DAYS_EN : DAYS_SR)[d.getDay()]}, ${d.getDate()}. ${MON_SR[d.getMonth()]}</b><button id="dn" aria-label="+1">${IC.next}</button></div></div></div>
   <div class="kpis" id="kpis"></div>
   <div class="scrub"><button class="rb2" id="play" aria-label="${esc(t('play'))}">${S.playing ? IC.pause : IC.play}</button><output class="num" id="hout">${hm(S.h)}</output><input type="range" id="hr" min="${o * 4}" max="${(c - .25) * 4}" step="1" value="${Math.round(S.h * 4)}" aria-label="Vreme">${isToday ? `<button class="now" id="nowB">${t('now')}</button>` : ''}</div>
   <div class="staffgrid"><div><div class="floors locs" style="width:max-content;max-width:100%;margin-bottom:10px">${l.floors.map(f => `<button data-f="${f.id}" aria-pressed="${f.id === S.floor}">${esc(nmF(f))}</button>`).join('')}</div>
     <div class="planbox"><div class="planscroll" id="splan"></div></div>
     <div class="legend"><span><i style="border-color:#F1EADF;background:rgba(241,234,223,.08)"></i>${t('leg_free')}</span><span><i style="border-color:#CFA670;background:rgba(207,166,112,.2)"></i>${t('leg_soon')}</span><span><i style="border-color:#6FB6BD;background:#2D666C"></i>${t('leg_seat')}</span><span><i style="border-color:#D9775A;background:rgba(201,104,75,.16)"></i>${t('leg_late')}</span></div>
     <p class="okvir">${esc(t('okvir'))}</p></div>
    <div><h3 style="font-size:22px;margin:0 0 10px">${t('arrivals')}</h3><ul class="rlist" id="rlist"></ul></div></div>
   <div class="tl" style="margin-top:16px"><h3>${t('timeline')}</h3><div class="tlscroll" id="tls"></div></div>
   <div class="drawer" id="drawer"></div>`;
  $$('.locs button[data-loc]', v).forEach(b => b.onclick = () => { LOC = b.dataset.loc; LS.set('loc', LOC); S.floor = null; S.h = null; S.sel = null; renderStaff(); });
  $('#dp').onclick = () => { S.date = M.addD(S.date, -1); S.h = null; S.sel = null; renderStaff(); }; $('#dn').onclick = () => { S.date = M.addD(S.date, 1); S.h = null; S.sel = null; renderStaff(); };
  $$('.floors button', v).forEach(b => b.onclick = () => { S.floor = b.dataset.f; updStaff(res); });
  $('#hr').oninput = e => { S.h = +e.target.value / 4; updStaff(res); };
  const nb = $('#nowB'); if (nb) nb.onclick = () => { S.h = null; renderStaff(); };
  $('#play').onclick = () => { S.playing = !S.playing; $('#play').innerHTML = S.playing ? IC.pause : IC.play; clearInterval(playT); if (S.playing) { if (S.h >= c - .5) S.h = o; playT = setInterval(() => { S.h += .25; if (S.h >= c - .25) { S.h = c - .25; S.playing = false; clearInterval(playT); $('#play').innerHTML = IC.play; } $('#hr').value = Math.round(S.h * 4); updStaff(res); }, 260); } };
  updStaff(res); timeline(res, o, c);
  if (S.sel) { const r = res.find(x => x.id === S.sel); if (r) setTimeout(() => openDrawer(r, res), 400); }
}
function updStaff(res) {
  const l = loc(), fl = l.floors.find(f => f.id === S.floor), h = S.h;
  $('#hout').textContent = hm(h);
  const byT = {}; res.forEach(r => { (byT[r.floor + '|' + r.table] = byT[r.floor + '|' + r.table] || []).push(r); });
  const stOf = tb => { const rs = byT[fl.id + '|' + tb.id] || []; const cur = rs.find(r => h >= r.start && h < r.end); if (cur) return cur.noshow ? (h < cur.start + .5 ? 'late' : 'free') : 'seated'; const nx = rs.find(r => r.start > h); if (nx && nx.start - h <= 1) return 'soon'; if (nx) return 'booked'; return 'free'; };
  $('#splan').innerHTML = planSVG(fl, stOf);
  $$('#splan .tb').forEach(g => g.onclick = () => { const rs = byT[fl.id + '|' + g.dataset.t] || []; const r = rs.find(x => h >= x.start && h < x.end) || rs.find(x => x.start > h) || rs[rs.length - 1]; if (r) openDrawer(r, res); });
  if (S.sel) { const r = res.find(x => x.id === S.sel); if (r && r.floor === fl.id) { const g = $(`#splan .tb[data-t="${CSS.escape(r.table)}"]`); if (g) g.classList.add('pulse'); } }
  // pokazatelji
  const seated = res.filter(r => h >= r.start && h < r.end && !r.noshow), allT = M.tablesOf(LOC).filter(x => x.zone !== 'sank');
  const busyT = new Set(seated.map(r => r.floor + '|' + r.table)), next = res.find(r => r.start > h);
  $('#kpis').innerHTML = `<div class="kpi"><span>${t('k_res')}</span><b class="num">${res.length}</b><small>${res.filter(r => r.src === 'Digitalni meni').length} preko digitalnog menija</small></div>
    <div class="kpi"><span>${t('k_cov')}</span><b class="num">${res.reduce((a, r) => a + r.party, 0)}</b><small>${t('k_now')}: ${seated.reduce((a, r) => a + r.party, 0)}</small></div>
    <div class="kpi"><span>${t('k_now')}</span><b class="num">${busyT.size}<em style="font:500 15px var(--f-b);font-style:normal;color:var(--magla)"> / ${allT.length}</em></b><small>${allT.length - busyT.size} ${t('k_free')}</small></div>
    <div class="kpi"><span>${t('k_next')}</span><b class="num">${next ? hm(next.start) : '—'}</b><small>${next ? `${esc(next.name)} · ${next.party} ${persons(next.party)} · ${t('table')} ${esc(next.table)}` : t('none')}</small></div>`;
  // lista dolazaka
  $('#rlist').innerHTML = res.map(r => { const st = r.noshow && h >= r.start ? 'noshow' : rstat(r, h); return `<li><button data-r="${esc(r.id)}" class="${S.sel === r.id ? 'on' : ''}"><span class="tm num">${hm(r.start)}</span><span><b>${esc(r.name)}${r.occ ? ` · <span style="color:var(--mesing2);font-weight:500">${esc(r.occ)}</span>` : ''}</b><small>${r.party} ${persons(r.party)} · ${t('table')} ${esc(r.table)} · ${esc(zname(r.zone))}</small></span><span class="pill ${r.mine ? 'mine' : st}">${r.mine ? t('st_mine') : t('st_' + st)}</span></button></li>`; }).join('');
  { const ul = $('#rlist'), nx = res.findIndex(r => r.end > h); if (ul && nx > 0 && !S.listMoved) { const li = ul.children[Math.max(0, nx - 1)]; if (li) ul.scrollTop = li.offsetTop - ul.offsetTop; } }
  $$('#rlist button').forEach(b => b.onclick = () => { const r = res.find(x => x.id === b.dataset.r); S.sel = r.id; if (r.floor !== S.floor) { S.floor = r.floor; $$('.floors button').forEach(x => x.setAttribute('aria-pressed', x.dataset.f === S.floor)); } updStaff(res); openDrawer(r, res); });
  $$('.floors button').forEach(x => x.setAttribute('aria-pressed', x.dataset.f === S.floor));
  const nl = $('#tls .nowline'); if (nl) nl.style.left = (64 + (h - +nl.dataset.o) * 84) + 'px';
  $$('#tls .blk').forEach(el => { const r = res.find(x => x.id === el.dataset.r); if (!r) return; const st = r.noshow && h >= r.start ? 'noshow' : rstat(r, h); el.className = `blk ${st}${r.mine ? ' mine' : ''}`; });
}
function timeline(res, o, c) {
  const PX = 84, W = (c - o) * PX, l = loc();
  let h = `<div class="tlg" style="width:${64 + W + 20}px"><div class="tlhead"><span></span><div class="hrs" style="width:${W}px">${Array.from({ length: c - o + 1 }, (_, i) => `<b style="left:${i * PX}px">${String((o + i) % 24).padStart(2, '0')}</b>`).join('')}</div></div>`;
  l.floors.forEach(fl => fl.tables.filter(x => x.zone !== 'sank').forEach(tb => {
    const rs = res.filter(r => r.floor === fl.id && r.table === tb.id);
    h += `<div class="tlrow"><span>${esc(tb.id)}</span><div class="lane" style="width:${W}px">${rs.map(r => `<div class="blk" data-r="${esc(r.id)}" style="left:${f1((r.start - o) * PX)}px;width:${f1((r.end - r.start) * PX - 4)}px">${esc(r.name)} · ${r.party}</div>`).join('')}</div></div>`;
  }));
  h += `<div class="nowline" data-o="${o}" style="left:${64 + (S.h - o) * PX}px"></div></div>`;
  const box = $('#tls'); box.innerHTML = h;
  $$('.blk', box).forEach(el => el.onclick = () => { const r = res.find(x => x.id === el.dataset.r); S.sel = r.id; S.floor = r.floor; updStaff(res); openDrawer(r, res); });
  box.scrollLeft = Math.max(0, (S.h - o) * PX - box.clientWidth / 2);
  updStaff(res);
}
function openDrawer(r, res) {
  const dr = $('#drawer'), st = r.noshow && S.h >= r.start ? 'noshow' : rstat(r, S.h);
  const ph = r.phone ? r.phone.replace(/(\d{3})\s?(\d{3})\s?(\d+)/, (m, a, b) => `${a} ${b} ••••`) : '—';
  dr.innerHTML = `<h3>${esc(r.name)}</h3><div class="meta">${hm(r.start)}–${hm(r.end)} · ${r.party} ${persons(r.party)} · ${t('table')} ${esc(r.table)} · ${esc(zname(r.zone))}</div>
    <dl><dt>Status</dt><dd><span class="pill ${r.mine ? 'mine' : st}">${r.mine ? t('st_mine') : t('st_' + st)}</span></dd>${r.occ ? `<dt>${t('occ2')}</dt><dd>${esc(r.occ)}</dd>` : ''}${r.note ? `<dt>${t('note2')}</dt><dd>${esc(r.note)}</dd>` : ''}<dt>${t('source')}</dt><dd>${esc(r.src)}</dd><dt>${t('phone2')}</dt><dd class="num">${esc(ph)}</dd></dl>
    <div class="acts">${st === 'soon' || st === 'booked' ? `<button class="btn btn-m btn-s" id="seatB">${esc(t('seat_btn'))}</button>` : ''}<button class="btn btn-o btn-s" id="dClose">${esc(t('close'))}</button></div>`;
  dr.classList.add('on');
  $('#dClose').onclick = () => { dr.classList.remove('on'); S.sel = null; updStaff(res); };
  const sb = $('#seatB'); if (sb) sb.onclick = () => { S.h = Math.max(S.h, r.start); $('#hr').value = Math.round(S.h * 4); dr.classList.remove('on'); updStaff(res); };
}

// ---------------------------------------------------------------- ljuska
function render() {
  document.documentElement.lang = L === 'en' ? 'en' : 'sr';
  $('#app').innerHTML = `<header class="rtop"><a class="back" href="../${L === 'en' ? '?lang=en' : ''}">${IC.back}${esc(t('back'))}</a><img class="lg" src="../img/logo.webp" alt="Ultra Caffe"><div class="sp"></div>
    <div class="lang" role="group"><button data-l="sr" aria-pressed="${L === 'sr'}">SR</button><button data-l="en" aria-pressed="${L === 'en'}">EN</button></div></header>
    <div class="rwrap"><div class="mode" role="tablist"><button role="tab" data-m="guest" aria-selected="${MODE === 'guest'}">${IC.user}${esc(t('guest'))}</button><button role="tab" data-m="staff" aria-selected="${MODE === 'staff'}">${IC.plan}${esc(t('staff'))}</button></div><div id="view"></div></div>`;
  $$('.rtop .lang button').forEach(b => b.onclick = () => { L = b.dataset.l; LS.set('lang', L); render(); });
  $$('.mode button').forEach(b => b.onclick = () => { MODE = b.dataset.m; clearInterval(playT); S.playing = false; render(); });
  if (MODE === 'guest') renderGuest(); else renderStaff();
}
function demoBadge() {
  const b = document.createElement('button'); b.className = 'demo'; b.innerHTML = '<i></i><span class="sh-t">TipTap demo</span><span class="lg-t">TipTap demo za Ultra Caffe</span>'; document.body.appendChild(b);
  const p = document.createElement('div'); p.className = 'demo-p'; p.innerHTML = `<h4>TipTap demo za Ultra Caffe</h4><p>Tri dela istog sistema. Rezervacija napravljena ovde odmah se vidi u „Sali uživo” i u upravi na ovom uređaju.</p>
   <nav><a href="../">${IC.menu}<span><b>Digitalni meni</b><span>Ono što gost vidi za stolom</span></span></a><a class="cur" href="./">${IC.plan}<span><b>Rezervacije i tlocrt</b><span>Gost bira sto, hostesa vodi salu</span></span></a><a href="../uprava/">${IC.chart}<span><b>Uprava i analitika</b><span>Promet, gosti, jelovnik, recenzije</span></span></a></nav>
   <footer>Raspored stolova i rezervacije su demo podaci. Napravio TipTap.</footer>`;
  document.body.appendChild(p); b.onclick = e => { e.stopPropagation(); p.classList.toggle('on'); }; document.addEventListener('click', e => { if (!p.contains(e.target)) p.classList.remove('on'); });
}
demoBadge(); render();
})();
