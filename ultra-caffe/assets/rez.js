/* =====================================================================
   ULTRA CAFFE · TipTap Signature demo — rezervacije i tlocrt
   Gost: dan → broj osoba → vreme → sto na tlocrtu → podaci → zahtev → status.
   Hostesa: zahtevi za potvrdu (ili automatska potvrda), sala uživo (klizač
   vremena), lista dolazaka, vremenska traka.
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
  sr: { back: 'Meni', guest: 'Rezervacija', staff: 'Sala uživo', guest_s: 'kako vidi gost', staff_s: 'kako vidi hostesa', title: 'Rezervišite sto',
    lead: 'Izaberite termin i sto na tlocrtu. Lokal potvrđuje rezervaciju, a potvrda vam stiže porukom.',
    how: [['Izaberete termin i sto', 'bez poziva i čekanja na vezi'], ['Lokal potvrđuje', 'obično za nekoliko minuta'], ['Stiže vam poruka', 'SMS sa svim detaljima']],
    how_auto: [['Izaberete termin i sto', 'bez poziva i čekanja na vezi'], ['Sto je odmah vaš', 'bez čekanja na potvrdu'], ['Stiže vam poruka', 'SMS sa svim detaljima']],
    s1: 'Kada i koliko vas je?', day: 'Dan', ppl: 'Broj osoba', time: 'Vreme dolaska', today: 'Danas', tomorrow: 'Sutra', few: 'još malo slobodnih stolova', full: 'popunjeno',
    s2: 'Izaberite sto', any_t: 'Izaberi za mene', all: 'Svi', free: 'Slobodan za vas', taken: 'Zauzet ili ne odgovara', yours: 'Vaš sto', s3: 'Vaši podaci', name: 'Ime i prezime', phone: 'Telefon',
    note: 'Napomena (nije obavezno)', occ: 'Povod', confirm: 'Pošalji zahtev za rezervaciju', confirm_auto: 'Rezerviši sto', choose_t: 'Izaberite sto na tlocrtu',
    fnote: 'Lokal potvrđuje rezervaciju, obično za nekoliko minuta. Potvrda stiže porukom na vaš telefon.', fnote_auto: 'Sto se rezerviše odmah, a potvrda stiže porukom na vaš telefon.',
    pend_t: 'Zahtev je poslat', pend_d: 'Lokal sada potvrđuje vašu rezervaciju. Čim potvrdi, stiže vam poruka.',
    ok_t: 'Rezervacija je potvrđena', ok_d: 'Sto je vaš. Ako kasnite više od 15 minuta, pozovite lokal.',
    no_t: 'Lokal ne može da potvrdi', no_d: 'U tom terminu nema slobodnog stola. Izaberite drugo vreme ili pozovite lokal.',
    tr1: 'Zahtev poslat', tr2: 'Lokal potvrđuje', tr2_ok: 'Lokal je potvrdio', tr2_auto: 'Potvrđeno automatski', tr2_no: 'Lokal je odbio', tr3: 'Potvrda porukom', tr3n: 'Obaveštenje porukom', tr3_ok: 'Poslato na', tr3_no: 'Obaveštenje poslato na', wait: 'čeka se…',
    sms: 'Poruka koju ste dobili', remind: 'Dva sata pre dolaska stiže i podsetnik, sa dugmetom za otkazivanje.',
    demo_d: 'U demo verziji vi ste i gost i hostesa: potvrdite ovaj zahtev u „Sali uživo”.', as_host: 'Potvrdi kao hostesa',
    ok_note: 'U demo verziji poruka se ne šalje, a rezervacija ostaje sačuvana samo na ovom uređaju.', pick_other: 'Izaberi drugi termin', to_menu: 'Nazad na meni', another: 'Nova rezervacija',
    my_res: 'Vaše rezervacije', st_pending: 'Čeka potvrdu', st_ok: 'Potvrđeno', st_no: 'Odbijeno',
    table: 'Sto', seats: 'mesta', upto: 'do', persons: 'osobe', persons5: 'osoba', pan: 'Pomerite tlocrt levo-desno', place: 'Lokal', date: 'Datum', at: 'Vreme', guests: 'Gosti',
    staff_lead: 'Ovde hostesa potvrđuje rezervacije i vidi ko sedi za kojim stolom.', scrub_hint: 'Pomerite vreme i pogledajte salu u bilo kom trenutku dana.',
    req_t: 'Zahtevi za potvrdu', req_none: 'Nema zahteva na čekanju. Novi zahtevi stižu ovde čim ih gost pošalje.',
    auto: 'Automatska potvrda', auto_off: 'Isključena: hostesa potvrđuje svaku rezervaciju, a gost dobija poruku posle potvrde.', auto_on: 'Uključena: rezervacije preko menija potvrđuju se same i gost odmah dobija poruku.',
    btn_ok: 'Potvrdi', btn_no: 'Odbij', st_req: 'Čeka potvrdu', leg_req: 'Čeka potvrdu', toast_ok: 'Potvrđeno · gost je dobio poruku', toast_no: 'Odbijeno · gost je dobio poruku', see_guest: 'Pogledaj kako gost vidi',
    dr_note: 'Gost dobija poruku čim potvrdite ili odbijete.', ago_now: 'upravo', ago: 'pre', pend_k: 'čeka potvrdu', via_menu: 'preko menija',
    k_res: 'Rezervacije', k_cov: 'Očekivanih gostiju', k_now: 'Za stolom sada', k_next: 'Sledeći dolazak', k_free: 'slobodnih stolova', none: 'nema', now: 'Sada', play: 'Pusti dan',
    arrivals: 'Dolasci', timeline: 'Raspored stolova', st_booked: 'Rezervisano', st_soon: 'Stiže uskoro', st_seated: 'Za stolom', st_done: 'Završeno', st_noshow: 'Nije došlo', st_mine: 'Vaša',
    source: 'Izvor', phone2: 'Telefon', note2: 'Napomena', occ2: 'Povod', seat_btn: 'Smesti za sto', call_btn: 'Pozovi', close: 'Zatvori', okvir: 'Okvirni raspored — uskladićemo ga sa vašom skicom lokala.',
    leg_free: 'Slobodno', leg_soon: 'Stiže za manje od sat vremena', leg_seat: 'Gosti za stolom', leg_late: 'Kasni ili nije došlo', occs: ['Rođendan', 'Poslovni ručak', 'Godišnjica', 'Proslava', 'Porodični ručak'],
    sms_ok: (l, dl, r, z) => `${l.name}: potvrđujemo vašu rezervaciju za ${dl} u ${hm(r.start)} — ${r.party} ${persons(r.party)}, sto ${r.table} (${z}). Ako kasnite više od 15 min, pozovite ${l.phone}. Za otkazivanje odgovorite OTKAŽI.`,
    sms_no: (l, dl, r) => `${l.name}: nažalost, za ${dl} u ${hm(r.start)} nemamo slobodan sto. Izaberite drugi termin u meniju ili nas pozovite na ${l.phone}.` },
  en: { back: 'Menu', guest: 'Booking', staff: 'Live floor', guest_s: 'what the guest sees', staff_s: 'what the host sees', title: 'Book a table',
    lead: 'Pick a time and your table on the floor plan. The venue confirms the booking and you get a text message.',
    how: [['Pick a time and table', 'no phone calls, no waiting'], ['The venue confirms', 'usually within minutes'], ['You get a text', 'with every detail']],
    how_auto: [['Pick a time and table', 'no phone calls, no waiting'], ['The table is yours', 'no waiting for confirmation'], ['You get a text', 'with every detail']],
    s1: 'When, and how many of you?', day: 'Day', ppl: 'Guests', time: 'Arrival time', today: 'Today', tomorrow: 'Tomorrow', few: 'only a few tables left', full: 'fully booked',
    s2: 'Choose your table', any_t: 'Pick one for me', all: 'All', free: 'Free for you', taken: 'Taken or doesn’t fit', yours: 'Your table', s3: 'Your details', name: 'Full name', phone: 'Phone',
    note: 'Note (optional)', occ: 'Occasion', confirm: 'Send booking request', confirm_auto: 'Book the table', choose_t: 'Pick a table on the plan',
    fnote: 'The venue confirms your booking, usually within minutes. The confirmation comes by text.', fnote_auto: 'The table is booked right away and the confirmation comes by text.',
    pend_t: 'Request sent', pend_d: 'The venue is confirming your booking now. You’ll get a text as soon as it does.',
    ok_t: 'Booking confirmed', ok_d: 'The table is yours. If you’re running more than 15 minutes late, please call.',
    no_t: 'The venue can’t confirm', no_d: 'There’s no free table at that time. Pick another time or call the venue.',
    tr1: 'Request sent', tr2: 'Venue confirms', tr2_ok: 'Confirmed by the venue', tr2_auto: 'Confirmed automatically', tr2_no: 'Declined by the venue', tr3: 'Text confirmation', tr3n: 'Text notice', tr3_ok: 'Sent to', tr3_no: 'Notice sent to', wait: 'waiting…',
    sms: 'The message you received', remind: 'Two hours before you arrive you also get a reminder with a cancel button.',
    demo_d: 'In this demo you are both guest and host: confirm this request on the live floor.', as_host: 'Confirm as the host',
    ok_note: 'In this demo no message is sent; the booking is stored on this device only.', pick_other: 'Pick another time', to_menu: 'Back to the menu', another: 'New booking',
    my_res: 'Your bookings', st_pending: 'Waiting', st_ok: 'Confirmed', st_no: 'Declined',
    table: 'Table', seats: 'seats', upto: 'up to', persons: 'guests', persons5: 'guests', pan: 'Drag the plan sideways', place: 'Venue', date: 'Date', at: 'Time', guests: 'Guests',
    staff_lead: 'This is where the host confirms bookings and sees who sits at which table.', scrub_hint: 'Move the time to see the room at any moment of the day.',
    req_t: 'Requests to confirm', req_none: 'No requests waiting. New ones arrive here as soon as a guest sends them.',
    auto: 'Auto-confirm', auto_off: 'Off: the host confirms every booking and the guest gets a text after that.', auto_on: 'On: bookings from the menu confirm themselves and the guest gets a text right away.',
    btn_ok: 'Confirm', btn_no: 'Decline', st_req: 'Waiting', leg_req: 'Waiting for confirmation', toast_ok: 'Confirmed · the guest got a text', toast_no: 'Declined · the guest got a text', see_guest: 'See what the guest sees',
    dr_note: 'The guest gets a text as soon as you confirm or decline.', ago_now: 'just now', ago: '', pend_k: 'waiting', via_menu: 'via the menu',
    k_res: 'Bookings', k_cov: 'Expected guests', k_now: 'Seated now', k_next: 'Next arrival', k_free: 'tables free', none: 'none', now: 'Now', play: 'Play the day',
    arrivals: 'Arrivals', timeline: 'Table schedule', st_booked: 'Booked', st_soon: 'Arriving soon', st_seated: 'Seated', st_done: 'Finished', st_noshow: 'No-show', st_mine: 'Yours',
    source: 'Source', phone2: 'Phone', note2: 'Note', occ2: 'Occasion', seat_btn: 'Seat guests', call_btn: 'Call', close: 'Close', okvir: 'Approximate layout — we’ll match it to your floor sketch.',
    leg_free: 'Free', leg_soon: 'Arriving within the hour', leg_seat: 'Guests seated', leg_late: 'Late or no-show', occs: ['Birthday', 'Business lunch', 'Anniversary', 'Celebration', 'Family lunch'],
    sms_ok: (l, dl, r, z) => `${l.name}: your booking is confirmed for ${dl} at ${hm(r.start)}, ${r.party} ${persons(r.party)}, table ${r.table} (${z}). Running more than 15 min late? Call ${l.phone}. To cancel, reply CANCEL.`,
    sms_no: (l, dl, r) => `${l.name}: sorry, we have no free table on ${dl} at ${hm(r.start)}. Pick another time in the menu or call us on ${l.phone}.` }
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
  chart: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  spark: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7-5.6-1.9L10.1 9z"/><path d="M19 3v3M17.5 4.5h3"/></svg>',
  msg: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 5.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 3.5V16.5h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z"/></svg>',
  check: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" opacity=".4"/><path d="m8 12.5 2.8 2.8L16.5 9.5"/></svg>',
  tick: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12.5 4 4L18 8"/></svg>',
  cross: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M7 7l10 10M17 7 7 17"/></svg>',
  wait: '<svg class="big" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="28" opacity=".25"/><path class="spin" d="M32 4a28 28 0 0 1 28 28"/><path d="M32 19v14l9 5"/></svg>',
  no: '<svg class="big" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="32" cy="32" r="28" opacity=".35"/><path d="M23 23l18 18M41 23 23 41"/></svg>'
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
    late: ['rgba(201,104,75,.16)', '#D9775A', 2.2, '#F3B29C', 'rgba(201,104,75,.3)'], done: ['rgba(241,234,223,.03)', 'rgba(241,234,223,.16)', 1.2, 'rgba(241,234,223,.4)', 'rgba(241,234,223,.08)'],
    req: ['rgba(230,200,153,.26)', '#F2DDB6', 2.4, '#FFF3DC', 'rgba(230,200,153,.45)']
  }[st] || ['rgba(241,234,223,.05)', 'rgba(241,234,223,.3)', 1.4, '#F1EADF', 'rgba(241,234,223,.12)'];
  const [fill, stroke, sw, txt, chf] = S; let g = '', body = '';
  const dash = st === 'booked' ? ' stroke-dasharray="6 5"' : st === 'req' ? ' stroke-dasharray="4 4"' : '';
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
  const dx = tb.x + (tb.shape === 'rect' ? (tb.w || 150) / 2 - 10 : 24), dot = st === 'soon' ? `<circle cx="${dx}" cy="${tb.y - 24}" r="6" fill="#CFA670" stroke="#0C1A1D" stroke-width="2"/>` :
    st === 'req' ? `<circle class="rq-dot" cx="${dx}" cy="${tb.y - 24}" r="7" fill="#0C1A1D" stroke="#E6C899" stroke-width="2.4"/><circle cx="${dx}" cy="${tb.y - 24}" r="2.4" fill="#E6C899"/>` : '';
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
let S = { date: today, h: null, floor: null, sel: null, openDr: false, playing: false };
let STID = null; // rezervacija čiji se status prikazuje gostu
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

// ---------------------------------------------------------------- potvrde (zajedničko za gosta i hostesu)
const AUTO = () => LS.get('autook', false);
const myAll = () => LS.get('myres', []);
const dOf = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const clock = ts => { const d = new Date(ts); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
const DAYS_SR_A = ['nedelju', 'ponedeljak', 'utorak', 'sredu', 'četvrtak', 'petak', 'subotu'], DAYS_EN_F = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MON_SR_G = ['januara', 'februara', 'marta', 'aprila', 'maja', 'juna', 'jula', 'avgusta', 'septembra', 'oktobra', 'novembra', 'decembra'];
const MON_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dm = d => L === 'en' ? `${d.getDate()} ${MON_EN[d.getMonth()]}` : `${d.getDate()}. ${MON_SR[d.getMonth()]}`;
const longDay = d => L === 'en' ? `${DAYS_EN_F[d.getDay()]}, ${d.getDate()} ${MON_EN[d.getMonth()]}` : `${DAYS_SR_A[d.getDay()]}, ${d.getDate()}. ${MON_SR_G[d.getMonth()]}`;
function dayLbl(d) { const n = Math.round((M.day0(d) - today) / 864e5); return n === 0 ? t('today') : n === 1 ? t('tomorrow') : `${(L === 'en' ? DAYS_EN : DAYS_SR)[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.`; }
function pushEv(e) { try { const ev = JSON.parse(localStorage.getItem('uc_ev') || '[]'); ev.push(Object.assign({ t: Date.now() }, e)); if (ev.length > 400) ev.splice(0, ev.length - 400); localStorage.setItem('uc_ev', JSON.stringify(ev)); } catch (er) { } }
function setMine(id, patch) { const a = myAll(), i = a.findIndex(x => x.id === id); if (i < 0) return null; Object.assign(a[i], patch); LS.set('myres', a); return a[i]; }
function decide(r, v) {
  if (r.mine) setMine(r.id, { st: v, okAt: Date.now(), by: 'host' });
  else { const d = LS.get('resdec', {}); d[r.id] = { v, t: Date.now() }; LS.set('resdec', d); }
  pushEv({ type: v === 'ok' ? 'resok' : 'resno', id: r.table, loc: r.loc || LOC, party: r.party, name: r.name });
}
function pendingList(lc) {
  const out = [];
  for (let i = 0; i < 14; i++) { const d = M.addD(today, i); M.reservations(lc, d).forEach(r => { if (r.st === 'pending') out.push(Object.assign({ day: d }, r)); }); }
  return out.sort((a, b) => a.day - b.day || a.start - b.start);
}
const agoLbl = r => { const m = r.mine ? Math.floor((Date.now() - (r.ts || Date.now())) / 6e4) : r.ago; return m < 1 ? t('ago_now') : L === 'en' ? `${m} min ago` : `${t('ago')} ${m} min`; };
const stLbl = st => t('st_' + (st || 'ok')), stCls = st => (st === 'pending' ? 'req' : st === 'no' ? 'noshow' : 'okp');
function toast(msg, act) {
  let el = $('#toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'rtoast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.innerHTML = `<span>${IC.check}${esc(msg)}</span>${act ? `<button class="btn btn-m btn-s">${esc(act.label)}</button>` : ''}`;
  if (act) $('button', el).onclick = () => { el.classList.remove('on'); act.fn(); };
  requestAnimationFrame(() => el.classList.add('on')); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), act ? 8000 : 4000);
}
function updBadge() {
  const b = $('.mode button[data-m="staff"]'); if (!b) return;
  const n = pendingList(LOC).length; let e = $('.bdg', b);
  if (!n) { if (e) e.remove(); return; }
  if (!e) { e = document.createElement('em'); e.className = 'bdg'; b.appendChild(e); }
  e.textContent = n;
}

// ---------------------------------------------------------------- GOST
function myResHTML() {
  const k0 = M.dkey(today), list = myAll().filter(r => r.date >= k0).sort((a, b) => a.date.localeCompare(b.date) || a.start - b.start).slice(0, 4);
  if (!list.length) return '';
  return `<section class="myres"><h3>${esc(t('my_res'))}</h3><div class="myl">${list.map(r => { const l = U.locs.find(x => x.id === r.loc) || loc(); return `<button data-my="${esc(r.id)}"><span class="d num">${esc(dayLbl(dOf(r.date)))} · ${hm(r.start)}</span><span class="w">${esc(l.short)} · ${t('table')} ${esc(r.table)} · ${r.party} ${persons(r.party)}</span><span class="pill ${stCls(r.st)}">${esc(stLbl(r.st))}</span></button>`; }).join('')}</div></section>`;
}
function renderGuest() {
  STID = null;
  const v = $('#view'), l = loc();
  const av = availability(G.date, G.ppl);
  if (G.time == null || !av.some(a => a.h === G.time && a.n > 0)) { const pref = av.filter(a => a.n > 0); G.time = (pref.find(a => a.h >= 20) || pref.find(a => a.h >= 19) || pref[pref.length - 1] || {}).h ?? null; G.table = null; }
  if (!G.floor || !l.floors.some(f => f.id === G.floor)) G.floor = l.floors[0].id;
  const days = Array.from({ length: 14 }, (_, i) => M.addD(today, i));
  v.innerHTML = `<div class="rh"><div><h1>${esc(t('title'))}</h1><p>${esc(t('lead'))}</p></div><div class="locs" role="group">${U.locs.map(x => `<button data-loc="${x.id}" aria-pressed="${x.id === LOC}">${esc(x.short)}</button>`).join('')}</div></div>
  <ol class="how">${t(AUTO() ? 'how_auto' : 'how').map((h, i) => `<li><i>${i + 1}</i><b>${esc(h[0])}</b><small>${esc(h[1])}</small></li>`).join('')}</ol>
  ${myResHTML()}
  <div class="guest"><div class="colL">
   <section class="step done" id="s1"><h2><i>1</i>${esc(t('s1'))}</h2>
    <div class="lbl">${t('day')}</div><div class="days">${days.map((d, i) => `<button data-d="${i}" aria-pressed="${M.dkey(d) === M.dkey(G.date)}"><b>${i === 0 ? t('today') : i === 1 ? t('tomorrow') : (L === 'en' ? DAYS_EN : DAYS_SR)[d.getDay()]}</b><small>${d.getDate()}.${d.getMonth() + 1}.</small></button>`).join('')}</div>
    <div class="lbl">${t('ppl')}</div><div class="ppl"><button id="pm" aria-label="−">−</button><b class="num" id="pn">${G.ppl}</b><button id="pp" aria-label="+">+</button><span>${persons(G.ppl)}</span></div>
    <div class="lbl">${t('time')}</div><div class="slots">${av.map(a => `<button data-h="${a.h}" aria-pressed="${a.h === G.time}" ${a.n ? '' : 'disabled'} class="${a.n > 0 && a.n <= 2 ? 'few' : ''}">${hm(a.h)}</button>`).join('') || `<span style="color:var(--magla)">${t('full')}</span>`}</div>
    <div class="slotnote"><span><i></i>${t('few')}</span></div></section>
   <section class="step" id="s3">${detailsHTML()}</section>
  </div><div class="colR"><section class="step${G.table ? ' done' : ''}" id="s2"></section></div></div>`;
  $$('.locs button', v).forEach(b => b.onclick = () => { LOC = b.dataset.loc; LS.set('loc', LOC); G.floor = null; G.table = null; renderGuest(); updBadge(); });
  $$('.days button', v).forEach(b => b.onclick = () => { G.date = days[+b.dataset.d]; G.table = null; renderGuest(); });
  $('#pm').onclick = () => { G.ppl = Math.max(1, G.ppl - 1); G.table = null; renderGuest(); }; $('#pp').onclick = () => { G.ppl = Math.min(12, G.ppl + 1); G.table = null; renderGuest(); };
  $$('.slots button', v).forEach(b => b.onclick = () => { G.time = +b.dataset.h; G.table = null; renderGuest(); });
  $$('.myres button', v).forEach(b => b.onclick = () => { showStatus(b.dataset.my); scrollTo({ top: 0 }); });
  renderPlanG(); bindDetails();
}
function guestState(tb, res) {
  if (G.time == null) return 'off';
  if (G.table === tb.id) return 'sel';
  if (G.zone !== 'all' && tb.zone !== G.zone) return 'off';
  return fits(tb, G.ppl) && !busy(res, tb, G.time, G.time + durFor(G.ppl)) ? 'free' : 'off';
}
// najbolji slobodan sto: najmanji koji odgovara, prvo na ovom spratu, terasa poslednja
function pickBest() {
  if (G.time == null) return null;
  const res = M.reservations(LOC, G.date), d = durFor(G.ppl), pref = { sala: 0, prozor: 1, separe: 2, banketi: 2, galerija: 3, lounge: 4, terasa: 6 };
  const all = M.tablesOf(LOC).filter(tb => fits(tb, G.ppl) && !busy(res, tb, G.time, G.time + d));
  all.sort((a, b) => (a.seats - b.seats) || ((a.floor === G.floor ? 0 : 1) - (b.floor === G.floor ? 0 : 1)) || ((pref[a.zone] ?? 5) - (pref[b.zone] ?? 5)));
  return all[0] || null;
}
function renderPlanG() {
  const box = $('#s2'), l = loc(), fl = l.floors.find(f => f.id === G.floor), res = M.reservations(LOC, G.date);
  const zones = [...new Set(fl.tables.map(x => x.zone))];
  const selT = G.table && M.tablesOf(LOC).find(x => x.id === G.table && x.floor === G.floor);
  box.innerHTML = `<h2><i>2</i>${esc(t('s2'))}<button class="anyt" id="anyT" type="button" ${G.time == null ? 'disabled' : ''}>${IC.spark}${esc(t('any_t'))}</button></h2>
   <div class="floors locs" style="width:max-content;max-width:100%">${l.floors.map(f => `<button data-f="${f.id}" aria-pressed="${f.id === G.floor}">${esc(nmF(f))}</button>`).join('')}</div>
   ${zones.length > 1 ? `<div class="zchips"><button class="chip${G.zone === 'all' ? ' on' : ''}" data-z="all">${t('all')}</button>${zones.map(z => `<button class="chip${G.zone === z ? ' on' : ''}" data-z="${z}">${esc(zname(z))}</button>`).join('')}</div>` : ''}
   <div class="planbox"><div class="planscroll">${planSVG(fl, tb => guestState(tb, res))}</div><div class="panhint">${t('pan')}</div></div>
   <div class="legend"><span><i style="border-color:#F1EADF;background:rgba(241,234,223,.08)"></i>${t('free')}</span><span><i style="border-color:rgba(241,234,223,.2)"></i>${t('taken')}</span><span><i style="border-color:#EBCF9F;background:#CFA670"></i>${t('yours')}</span></div>
   <div class="selcard${selT ? ' on' : ''}">${selT ? `<img src="../img/a/${(ZONE_IMG[LOC] || {})[selT.zone] || l.hero}-m.webp" alt=""><div><b>${t('table')} ${esc(selT.id)} · ${esc(zname(selT.zone))}</b><span>${t('upto')} ${selT.seats} ${persons(selT.seats)} · ${hm(G.time)}–${hm(G.time + durFor(G.ppl))}</span></div>` : ''}</div>
   <p class="okvir">${esc(t('okvir'))}</p>`;
  $$('.floors button', box).forEach(b => b.onclick = () => { G.floor = b.dataset.f; G.zone = 'all'; renderPlanG(); });
  $$('.zchips .chip', box).forEach(b => b.onclick = () => { G.zone = b.dataset.z; renderPlanG(); });
  const pick = id => { G.table = id; renderPlanG(); refreshDetails(); if (G.table && innerWidth < 1100) setTimeout(() => $('.selcard').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60); };
  $$('.plan .tb', box).forEach(g => { const go = () => { if (!g.classList.contains('free') && !g.classList.contains('sel')) return; pick(g.dataset.t === G.table ? null : g.dataset.t); };
    g.addEventListener('click', go); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
  $('#anyT', box).onclick = () => { const tb = pickBest(); if (!tb) return; G.floor = tb.floor; G.zone = 'all'; pick(tb.id); };
  const sc = $('.planscroll', box); if (sc.scrollWidth > sc.clientWidth) { const sel = $('.plan .tb.sel', box); if (sel) { const r = sel.getBBox(), k = sc.scrollWidth / fl.w; sc.scrollLeft = Math.max(0, (r.x + r.width / 2) * k - sc.clientWidth / 2); } else sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2; sc.addEventListener('scroll', () => { const h = $('.panhint', box); if (h) h.style.opacity = 0; }, { once: true }); }
  box.classList.toggle('done', !!G.table);
}
function detailsHTML() {
  const l = loc(), d = G.date, auto = AUTO();
  return `<h2><i>3</i>${esc(t('s3'))}</h2>
   <div class="sumline"><span>${esc(l.name)}</span><span><b>${dm(d)}</b></span><span><b>${G.time != null ? hm(G.time) : '—'}</b></span><span><b>${G.ppl}</b> ${persons(G.ppl)}</span><span>${G.table ? `${t('table')} <b>${esc(G.table)}</b>` : `<em style="color:var(--mesing2);font-style:normal">${t('choose_t')}</em>`}</span></div>
   <form class="form" id="gf"><div class="two"><label>${t('name')}<input name="n" required autocomplete="name" placeholder="Ana Petrović"></label><label>${t('phone')}<input name="p" required type="tel" autocomplete="tel" placeholder="06x xxx xxxx"></label></div>
   <label>${t('occ')}<div class="occ">${t('occs').map(o => `<button type="button" class="chip${G.occ === o ? ' on' : ''}" data-o="${esc(o)}" aria-pressed="${G.occ === o}">${esc(o)}</button>`).join('')}</div></label>
   <label>${t('note')}<textarea name="m" maxlength="140"></textarea></label>
   <button class="btn btn-m confirm" type="submit" ${G.table ? '' : 'disabled style="opacity:.45"'}>${esc(t(auto ? 'confirm_auto' : 'confirm'))}</button>
   <p class="fnote">${IC.msg}${esc(t(auto ? 'fnote_auto' : 'fnote'))}</p></form>`;
}
// ponovo iscrtaj korak 3 bez gubljenja onoga što je gost već upisao
function refreshDetails() {
  const f = $('#gf'), keep = f ? { n: f.n.value, p: f.p.value, m: f.m.value } : null;
  $('#s3').innerHTML = detailsHTML(); bindDetails();
  if (keep) { const g = $('#gf'); g.n.value = keep.n; g.p.value = keep.p; g.m.value = keep.m; }
}
function bindDetails() {
  const f = $('#gf'); if (!f) return;
  $$('.occ .chip', f).forEach(b => b.onclick = () => { G.occ = G.occ === b.dataset.o ? '' : b.dataset.o; $$('.occ .chip', f).forEach(x => { x.classList.toggle('on', x.dataset.o === G.occ); x.setAttribute('aria-pressed', x.dataset.o === G.occ); }); });
  f.onsubmit = e => {
    e.preventDefault(); if (!G.table) return;
    const tb = M.tablesOf(LOC).find(x => x.id === G.table && x.floor === G.floor), name = f.n.value.trim() || 'Gost', auto = AUTO(), now = Date.now();
    const r = { id: 'my-' + now, loc: LOC, date: M.dkey(G.date), table: tb.id, floor: tb.floor, zone: tb.zone, start: G.time, end: G.time + durFor(G.ppl), party: G.ppl, name, phone: f.p.value.trim(), occ: G.occ, note: f.m.value.trim(), src: 'Digitalni meni',
      st: auto ? 'ok' : 'pending', ts: now, okAt: auto ? now : null, by: auto ? 'auto' : null };
    const mine = myAll(); mine.push(r); LS.set('myres', mine);
    pushEv({ type: 'res', id: tb.id, loc: LOC, party: G.ppl, st: r.st });
    G.table = null; showStatus(r.id); updBadge();
  };
}
function trackHTML(r) {
  const st = r.st || 'ok', ph = esc(r.phone || '—');
  const step = (cls, ic, b, s) => `<li class="${cls}"><i>${ic}</i><div><b>${esc(b)}</b>${s ? `<small>${s}</small>` : ''}</div></li>`;
  const ok = IC.tick, no = IC.cross;
  return `<ol class="track">${step('done', ok, t('tr1'), r.ts ? clock(r.ts) : '')}${
    st === 'pending' ? step('cur', '', t('tr2'), esc(t('wait'))) : st === 'ok' ? step('done', ok, r.by === 'auto' ? t('tr2_auto') : t('tr2_ok'), r.okAt ? clock(r.okAt) : '') : step('bad', no, t('tr2_no'), r.okAt ? clock(r.okAt) : '')}${
    st === 'pending' ? step('', '', t('tr3'), '') : step('done', ok, t(st === 'no' ? 'tr3n' : 'tr3'), `${esc(t(st === 'no' ? 'tr3_no' : 'tr3_ok'))} <span class="num">${ph}</span>`)}</ol>`;
}
function showStatus(id) {
  const r = myAll().find(x => x.id === id); if (!r) { renderGuest(); return; }
  STID = id;
  const v = $('#view'), l = U.locs.find(x => x.id === r.loc) || loc(), d = dOf(r.date), st = r.st || 'ok', z = zname(r.zone);
  const head = st === 'pending' ? [IC.wait, t('pend_t'), t('pend_d')] : st === 'ok' ? [IC.ok, t('ok_t'), t('ok_d')] : [IC.no, t('no_t'), t('no_d')];
  const sms = st === 'pending' ? '' : `<div class="lbl smsl">${esc(t('sms'))}</div><div class="sms"><div class="sms-h"><span class="av">UC</span><b>${esc(l.name)}</b><small>${r.okAt ? clock(r.okAt) : ''}</small></div><p>${esc(st === 'ok' ? t('sms_ok')(l, longDay(d), r, z) : t('sms_no')(l, longDay(d), r))}</p></div>${st === 'ok' ? `<p class="remind">${esc(t('remind'))}</p>` : ''}`;
  v.innerHTML = `<div class="okv st-${st}">${head[0]}<h2>${esc(head[1])}</h2><p>${esc(head[2])}</p>
   ${trackHTML(r)}
   <div class="okcard"><div><span>${t('place')}</span><b>${esc(l.name)}</b></div><div><span>${t('date')}</span><b>${(L === 'en' ? DAYS_EN : DAYS_SR)[d.getDay()]}, ${dm(d)}</b></div><div><span>${t('at')}</span><b>${hm(r.start)}</b></div><div><span>${t('guests')}</span><b>${r.party} ${persons(r.party)}</b></div><div><span>${t('table')}</span><b>${esc(r.table)} · ${esc(z)}</b></div></div>
   ${sms}
   ${st === 'pending' ? `<div class="demo-act"><p>${esc(t('demo_d'))}</p><button class="btn btn-m" id="asHost">${IC.plan}${esc(t('as_host'))}</button></div>` : ''}
   <div class="acts">${st === 'no' ? `<button class="btn btn-m" id="again2">${esc(t('pick_other'))}</button>` : ''}<a class="btn btn-o" href="../${L === 'en' ? '?lang=en' : ''}">${IC.menu}${esc(t('to_menu'))}</a>${st !== 'no' ? `<button class="btn btn-o" id="again">${esc(t('another'))}</button>` : ''}</div>
   <p class="okvir">${esc(t('ok_note'))}</p></div>`;
  const again = () => { STID = null; G.table = null; if (st === 'no') { G.date = d < today ? today : d; G.ppl = r.party; LOC = r.loc; } renderGuest(); scrollTo({ top: 0 }); };
  const a1 = $('#again'), a2 = $('#again2'); if (a1) a1.onclick = again; if (a2) a2.onclick = again;
  const ah = $('#asHost'); if (ah) ah.onclick = () => { MODE = 'staff'; STID = null; LOC = r.loc; S.date = M.day0(d); S.h = M.dkey(new Date()) === r.date ? null : r.start - .5; S.floor = r.floor; S.sel = r.id; S.openDr = true; render(); scrollTo({ top: 0 }); };
}

// ---------------------------------------------------------------- HOSTESA
let playT = null;
function staffRes() { const res = M.reservations(LOC, S.date); res.forEach(r => { if (!r.mine && r.st !== 'pending' && M.hash('ns' + r.id) % 100 < 6) r.noshow = 1; }); return res; }
function rstat(r, h) { if (r.st === 'pending') return 'req'; if (r.mine && h < r.start) return h > r.start - 1 ? 'soon' : 'booked'; return M.status(r, h); }
function reqHTML() {
  const P = pendingList(LOC), auto = AUTO();
  return `<section class="reqs${P.length ? ' has' : ''}" id="reqs"><div class="rq-h"><h3>${esc(t('req_t'))}${P.length ? `<em class="bdg">${P.length}</em>` : ''}</h3>
    <label class="sw"><input type="checkbox" id="autoOk" ${auto ? 'checked' : ''}><span class="tgl" aria-hidden="true"></span><span>${esc(t('auto'))}</span></label></div>
    <p class="rq-s">${esc(t(auto ? 'auto_on' : 'auto_off'))}</p>
    ${P.length ? `<ul class="rql">${P.map(r => `<li data-r="${esc(r.id)}"><div class="rq-i"><b>${esc(r.name)}${r.mine ? ` <span class="pill mine">${t('st_mine')}</span>` : ''}</b><span><em class="num">${esc(dayLbl(r.day))} · ${hm(r.start)}</em> · ${r.party} ${persons(r.party)} · ${t('table')} ${esc(r.table)} · ${esc(zname(r.zone))}</span><small>${esc(r.src)}${r.occ ? ' · ' + esc(r.occ) : ''}${r.note ? ` · „${esc(r.note)}”` : ''} · ${esc(agoLbl(r))}</small></div><div class="rq-a"><button class="btn btn-m btn-s" data-ok>${esc(t('btn_ok'))}</button><button class="btn btn-o btn-s" data-no>${esc(t('btn_no'))}</button></div></li>`).join('')}</ul>` : `<p class="rq-none">${esc(t('req_none'))}</p>`}</section>`;
}
function decideUI(r, v) {
  decide(r, v); const dr = $('#drawer'); if (dr) dr.classList.remove('on');
  S.sel = v === 'ok' && M.dkey(S.date) === (r.date || M.dkey(r.day || S.date)) ? r.id : null; S.openDr = false;
  renderStaff(); updBadge();
  toast(t(v === 'ok' ? 'toast_ok' : 'toast_no'), r.mine ? { label: t('see_guest'), fn: () => { MODE = 'guest'; render(); showStatus(r.id); scrollTo({ top: 0 }); } } : null);
}
function bindReqs() {
  const box = $('#reqs'); if (!box) return;
  $('#autoOk', box).onchange = e => { LS.set('autook', e.target.checked); $('.rq-s', box).textContent = t(e.target.checked ? 'auto_on' : 'auto_off'); };
  const P = pendingList(LOC);
  $$('.rql li', box).forEach(li => { const r = P.find(x => x.id === li.dataset.r); if (!r) return; $('[data-ok]', li).onclick = () => decideUI(r, 'ok'); $('[data-no]', li).onclick = () => decideUI(r, 'no'); });
}
function renderStaff() {
  const v = $('#view'), l = loc(), wd = (S.date.getDay() + 6) % 7, [o, c] = l.open[wd];
  const now = new Date(), isToday = M.dkey(S.date) === M.dkey(now);
  if (S.h == null) S.h = isToday ? Math.min(c - .25, Math.max(o, now.getHours() + now.getMinutes() / 60)) : 20;
  S.h = Math.min(c - .25, Math.max(o, S.h));
  if (!S.floor || !l.floors.some(f => f.id === S.floor)) S.floor = l.floors[0].id;
  const res = staffRes(), d = S.date;
  v.innerHTML = `<div class="rh"><div><h1>${esc(t('staff'))}</h1><p>${esc(t('staff_lead'))}</p><p class="addr">${esc(l.name)} · ${esc(l.addr)}</p></div><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><div class="locs" role="group">${U.locs.map(x => `<button data-loc="${x.id}" aria-pressed="${x.id === LOC}">${esc(x.short)}</button>`).join('')}</div>
    <div class="dnav"><button id="dp" aria-label="−1">${IC.back}</button><b>${(L === 'en' ? DAYS_EN : DAYS_SR)[d.getDay()]}, ${dm(d)}</b><button id="dn" aria-label="+1">${IC.next}</button></div></div></div>
   ${reqHTML()}
   <div class="kpis" id="kpis"></div>
   <div class="scrub"><button class="rb2" id="play" aria-label="${esc(t('play'))}">${S.playing ? IC.pause : IC.play}</button><output class="num" id="hout">${hm(S.h)}</output><input type="range" id="hr" min="${o * 4}" max="${(c - .25) * 4}" step="1" value="${Math.round(S.h * 4)}" aria-label="Vreme">${isToday ? `<button class="now" id="nowB">${t('now')}</button>` : ''}</div>
   <p class="scrubhint">${esc(t('scrub_hint'))}</p>
   <div class="staffgrid"><div><div class="floors locs" style="width:max-content;max-width:100%;margin-bottom:10px">${l.floors.map(f => `<button data-f="${f.id}" aria-pressed="${f.id === S.floor}">${esc(nmF(f))}</button>`).join('')}</div>
     <div class="planbox"><div class="planscroll" id="splan"></div></div>
     <div class="legend"><span><i style="border-color:#F1EADF;background:rgba(241,234,223,.08)"></i>${t('leg_free')}</span><span><i style="border-color:#F2DDB6;border-style:dashed;background:rgba(230,200,153,.26)"></i>${t('leg_req')}</span><span><i style="border-color:#CFA670;background:rgba(207,166,112,.2)"></i>${t('leg_soon')}</span><span><i style="border-color:#6FB6BD;background:#2D666C"></i>${t('leg_seat')}</span><span><i style="border-color:#D9775A;background:rgba(201,104,75,.16)"></i>${t('leg_late')}</span></div>
     <p class="okvir">${esc(t('okvir'))}</p></div>
    <div><h3 style="font-size:22px;margin:0 0 10px">${t('arrivals')}</h3><ul class="rlist" id="rlist"></ul></div></div>
   <div class="tl" style="margin-top:16px"><h3>${t('timeline')}</h3><div class="tlscroll" id="tls"></div></div>
   <div class="drawer" id="drawer"></div>`;
  $$('.locs button[data-loc]', v).forEach(b => b.onclick = () => { LOC = b.dataset.loc; LS.set('loc', LOC); S.floor = null; S.h = null; S.sel = null; renderStaff(); updBadge(); });
  $('#dp').onclick = () => { S.date = M.addD(S.date, -1); S.h = null; S.sel = null; renderStaff(); }; $('#dn').onclick = () => { S.date = M.addD(S.date, 1); S.h = null; S.sel = null; renderStaff(); };
  $$('.floors button', v).forEach(b => b.onclick = () => { S.floor = b.dataset.f; updStaff(res); });
  $('#hr').oninput = e => { S.h = +e.target.value / 4; updStaff(res); };
  const nb = $('#nowB'); if (nb) nb.onclick = () => { S.h = null; renderStaff(); };
  $('#play').onclick = () => { S.playing = !S.playing; $('#play').innerHTML = S.playing ? IC.pause : IC.play; clearInterval(playT); if (S.playing) { if (S.h >= c - .5) S.h = o; playT = setInterval(() => { S.h += .25; if (S.h >= c - .25) { S.h = c - .25; S.playing = false; clearInterval(playT); $('#play').innerHTML = IC.play; } $('#hr').value = Math.round(S.h * 4); updStaff(res); }, 260); } };
  bindReqs(); updStaff(res); timeline(res, o, c);
  if (S.sel && S.openDr) { S.openDr = false; const r = res.find(x => x.id === S.sel); if (r) setTimeout(() => openDrawer(r, res), 400); }
}
function updStaff(res) {
  const l = loc(), fl = l.floors.find(f => f.id === S.floor), h = S.h;
  $('#hout').textContent = hm(h);
  const byT = {}; res.forEach(r => { (byT[r.floor + '|' + r.table] = byT[r.floor + '|' + r.table] || []).push(r); });
  const stOf = tb => { const rs = byT[fl.id + '|' + tb.id] || []; const cur = rs.find(r => h >= r.start && h < r.end); if (cur) { if (cur.st === 'pending') return 'req'; return cur.noshow ? (h < cur.start + .5 ? 'late' : 'free') : 'seated'; } const nx = rs.find(r => r.start > h); if (nx && nx.st === 'pending') return 'req'; if (nx && nx.start - h <= 1) return 'soon'; if (nx) return 'booked'; return 'free'; };
  $('#splan').innerHTML = planSVG(fl, stOf);
  $$('#splan .tb').forEach(g => g.onclick = () => { const rs = byT[fl.id + '|' + g.dataset.t] || []; const r = rs.find(x => h >= x.start && h < x.end) || rs.find(x => x.start > h) || rs[rs.length - 1]; if (r) openDrawer(r, res); });
  if (S.sel) { const r = res.find(x => x.id === S.sel); if (r && r.floor === fl.id) { const g = $(`#splan .tb[data-t="${CSS.escape(r.table)}"]`); if (g) g.classList.add('pulse'); } }
  // pokazatelji
  const seated = res.filter(r => h >= r.start && h < r.end && !r.noshow && r.st !== 'pending'), allT = M.tablesOf(LOC).filter(x => x.zone !== 'sank');
  const busyT = new Set(seated.map(r => r.floor + '|' + r.table)), next = res.find(r => r.start > h), np = res.filter(r => r.st === 'pending').length;
  $('#kpis').innerHTML = `<div class="kpi"><span>${t('k_res')}</span><b class="num">${res.length}</b><small>${res.filter(r => r.src === 'Digitalni meni').length} ${t('via_menu')}${np ? ` · ${np} ${t('pend_k')}` : ''}</small></div>
    <div class="kpi"><span>${t('k_cov')}</span><b class="num">${res.reduce((a, r) => a + r.party, 0)}</b><small>${t('k_now')}: ${seated.reduce((a, r) => a + r.party, 0)}</small></div>
    <div class="kpi"><span>${t('k_now')}</span><b class="num">${busyT.size}<em style="font:500 15px var(--f-b);font-style:normal;color:var(--magla)"> / ${allT.length}</em></b><small>${allT.length - busyT.size} ${t('k_free')}</small></div>
    <div class="kpi"><span>${t('k_next')}</span><b class="num">${next ? hm(next.start) : '—'}</b><small>${next ? `${esc(next.name)} · ${next.party} ${persons(next.party)} · ${t('table')} ${esc(next.table)}` : t('none')}</small></div>`;
  // lista dolazaka
  const pill = (r, st) => r.st === 'pending' ? `<span class="pill req">${t('st_req')}</span>` : `<span class="pill ${r.mine ? 'mine' : st}">${r.mine ? t('st_mine') : t('st_' + st)}</span>`;
  $('#rlist').innerHTML = res.map(r => { const st = r.noshow && h >= r.start ? 'noshow' : rstat(r, h); return `<li><button data-r="${esc(r.id)}" class="${S.sel === r.id ? 'on' : ''}"><span class="tm num">${hm(r.start)}</span><span><b>${esc(r.name)}${r.occ ? ` · <span style="color:var(--mesing2);font-weight:500">${esc(r.occ)}</span>` : ''}</b><small>${r.party} ${persons(r.party)} · ${t('table')} ${esc(r.table)} · ${esc(zname(r.zone))}</small></span>${pill(r, st)}</button></li>`; }).join('');
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
  const pillH = st === 'req' ? `<span class="pill req">${t('st_req')}</span>${r.mine ? ` <span class="pill mine">${t('st_mine')}</span>` : ''}` : `<span class="pill ${r.mine ? 'mine' : st}">${r.mine ? t('st_mine') : t('st_' + st)}</span>`;
  dr.innerHTML = `<h3>${esc(r.name)}</h3><div class="meta">${hm(r.start)}–${hm(r.end)} · ${r.party} ${persons(r.party)} · ${t('table')} ${esc(r.table)} · ${esc(zname(r.zone))}</div>
    <dl><dt>Status</dt><dd>${pillH}</dd>${r.occ ? `<dt>${t('occ2')}</dt><dd>${esc(r.occ)}</dd>` : ''}${r.note ? `<dt>${t('note2')}</dt><dd>${esc(r.note)}</dd>` : ''}<dt>${t('source')}</dt><dd>${esc(r.src)}</dd><dt>${t('phone2')}</dt><dd class="num">${esc(ph)}</dd></dl>
    <div class="acts">${st === 'req' ? `<button class="btn btn-m btn-s" id="okB">${esc(t('btn_ok'))}</button><button class="btn btn-o btn-s" id="noB">${esc(t('btn_no'))}</button>` : st === 'soon' || st === 'booked' ? `<button class="btn btn-m btn-s" id="seatB">${esc(t('seat_btn'))}</button>` : ''}<button class="btn btn-o btn-s" id="dClose">${esc(t('close'))}</button></div>
    ${st === 'req' ? `<p class="okvir">${esc(t('dr_note'))}</p>` : ''}`;
  dr.classList.add('on');
  $('#dClose').onclick = () => { dr.classList.remove('on'); S.sel = null; updStaff(res); };
  const sb = $('#seatB'); if (sb) sb.onclick = () => { S.h = Math.max(S.h, r.start); $('#hr').value = Math.round(S.h * 4); dr.classList.remove('on'); updStaff(res); };
  const ob = $('#okB'), nb = $('#noB'); if (ob) ob.onclick = () => decideUI(r, 'ok'); if (nb) nb.onclick = () => decideUI(r, 'no');
}

// ---------------------------------------------------------------- ljuska
function render() {
  document.documentElement.lang = L === 'en' ? 'en' : 'sr';
  const n = pendingList(LOC).length;
  $('#app').innerHTML = `<header class="rtop"><a class="back" href="../${L === 'en' ? '?lang=en' : ''}">${IC.back}${esc(t('back'))}</a><img class="lg" src="../img/logo.webp" alt="Ultra Caffe"><div class="sp"></div>
    <div class="lang" role="group"><button data-l="sr" aria-pressed="${L === 'sr'}">SR</button><button data-l="en" aria-pressed="${L === 'en'}">EN</button></div></header>
    <div class="rwrap"><div class="mode" role="tablist"><button role="tab" data-m="guest" aria-selected="${MODE === 'guest'}">${IC.user}<span class="ml"><b>${esc(t('guest'))}</b><small>${esc(t('guest_s'))}</small></span></button><button role="tab" data-m="staff" aria-selected="${MODE === 'staff'}">${IC.plan}<span class="ml"><b>${esc(t('staff'))}</b><small>${esc(t('staff_s'))}</small></span>${n ? `<em class="bdg">${n}</em>` : ''}</button></div><div id="view"></div></div>`;
  $$('.rtop .lang button').forEach(b => b.onclick = () => { L = b.dataset.l; LS.set('lang', L); const keep = STID; render(); if (keep && MODE === 'guest') showStatus(keep); });
  $$('.mode button').forEach(b => b.onclick = () => { MODE = b.dataset.m; clearInterval(playT); S.playing = false; STID = null; render(); });
  if (MODE === 'guest') renderGuest(); else renderStaff();
}
// isti uređaj, druga kartica: osveži status gosta i salu kad hostesa odluči
addEventListener('storage', e => {
  if (!['uc_myres', 'uc_resdec', 'uc_autook'].includes(e.key)) return;
  if (MODE === 'staff') { renderStaff(); updBadge(); } else if (STID) { showStatus(STID); updBadge(); } else updBadge();
});
function demoBadge() {
  const b = document.createElement('button'); b.className = 'demo'; b.innerHTML = '<i></i><span class="sh-t">TipTap demo</span><span class="lg-t">TipTap demo za Ultra Caffe</span>'; document.body.appendChild(b);
  const p = document.createElement('div'); p.className = 'demo-p'; p.innerHTML = `<h4>TipTap demo za Ultra Caffe</h4><p>Tri dela istog sistema. Zahtev za rezervaciju poslat ovde stiže hostesi u „Salu uživo” na potvrdu i vidi se u upravi na ovom uređaju.</p>
   <nav><a href="../">${IC.menu}<span><b>Digitalni meni</b><span>Ono što gost vidi za stolom</span></span></a><a class="cur" href="./">${IC.plan}<span><b>Rezervacije i tlocrt</b><span>Gost šalje zahtev, hostesa potvrđuje</span></span></a><a href="../uprava/">${IC.chart}<span><b>Uprava i analitika</b><span>Promet, gosti, jelovnik, recenzije</span></span></a></nav>
   <footer>Raspored stolova i rezervacije su demo podaci. Napravio TipTap.</footer>`;
  document.body.appendChild(p); b.onclick = e => { e.stopPropagation(); p.classList.toggle('on'); }; document.addEventListener('click', e => { if (!p.contains(e.target)) p.classList.remove('on'); });
}
demoBadge(); render();
})();
