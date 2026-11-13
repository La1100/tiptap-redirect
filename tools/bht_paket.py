"""TipTap × BHT — što je ugovoreno (13. 11. 2026.) i kako se to vidi na pravom sustavu.

Paket za sva četiri lokala (Q Club, Kafanica, Bure Bar, Brooklyn):
  • digitalni cjenik, statistika, poruke gostiju, pregled za direktore
  • ocjena posjeta u cjeniku: 5 ★ vodi ravno na Google recenziju, 1–4 ★ ide voditelju
  • poziv voditelju sa stola (umjesto poziva konobaru) — Q Club, Kafanica, Bure Bar
  • Brooklyn: bez ikakvog poziva sa stola (voditelj većinom nije u lokalu)
Nisu uzeli (ostaje u demu za kasnije): rezervacije, hostesu na ulazu, garderobu.

tools/build_live.py uvozi ove popise. Svaka zamjena ima očekivani broj pojavljivanja,
pa se promjena u demu ne može tiho izgubiti.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# mogućnosti po lokalu (isto u jezgri na serveru i u window.TT_CFG svake stranice)
FEATURES = {
    'qclub':    {'reservations': False, 'preorder': False, 'tableMode': True,  'bill': False, 'orders': False, 'songs': False},
    'kafanica': {'reservations': False, 'preorder': False, 'tableMode': True,  'bill': False, 'orders': False, 'songs': False},
    'bure':     {'reservations': False, 'preorder': False, 'tableMode': True,  'bill': False, 'orders': False, 'songs': False},
    'brooklyn': {'reservations': False, 'preorder': False, 'tableMode': False, 'bill': False, 'orders': False, 'songs': False},
}
PKG = "features: { reservations: false, preorder: false, tableMode: true, bill: false, orders: false, songs: false }   // paket BHT 13. 11. 2026.: bez rezervacija, hostese i garderobe; poziv ide voditelju"
PKG_BROOKLYN = "features: { reservations: false, preorder: false, tableMode: false, bill: false, orders: false, songs: false }   // paket BHT 13. 11. 2026.: bez rezervacija i bez poziva sa stola"

# podstranice koje paket ne uključuje → kratko preusmjeravanje (stari linkovi ne vode u prazno)
STUBS = {'rezervacije': '../', 'garderoba': '../', 'hostesa': '../admin/'}


def stub(to):
    return ('<!doctype html><html lang="hr"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow">'
            f'<meta http-equiv="refresh" content="0; url={to}"><title>…</title>'
            f'<script>location.replace("{to}"+location.search)</script></head><body></body></html>\n')


# ---------------------------------------------------------------- jezgra (server + ugrađena u stranice)
CORE = [
    ("features: { reservations: true, preorder: true, sparkler: true, tableMode: true, bill: false, orders: false, songs: false, preorderZones: ['vip', 'kat'], hostess: ['rez', 'coat'], door: 'waiter' }", PKG, 1),
    ("features: { reservations: true, preorder: false, tableMode: true, bill: false, orders: false, songs: true, hostess: ['rez', 'coat'] }", PKG, 1),
    ("features: { reservations: true, preorder: true, preorderZones: ['vip'], preorderOnly: true, tableMode: true, bill: false, orders: false, songs: false, hostess: ['rez'] }", PKG, 1),
    ("features: { reservations: false, preorder: false, tableMode: true, bill: true, orders: false, songs: false }", PKG_BROOKLYN, 1),
    # spremljene postavke iz uprave ne mogu uključiti ono što paket nema; voditelj smije samo uključiti/isključiti stol uživo
    ("  return r?.data ? { ...structuredClone(def), ...r.data, forms: def.forms, features: { ...def.features, ...(r.data.features || {}) } } : structuredClone(def);",
     "  // paket određuje mogućnosti; iz Postavki vrijedi samo prekidač \"stol uživo\" (i to samo gdje ga paket ima)\n"
     "  const sf = (r?.data && r.data.features) || {};\n"
     "  const features = { ...def.features, ...(def.features.tableMode && typeof sf.tableMode === 'boolean' ? { tableMode: sf.tableMode } : {}) };\n"
     "  return r?.data ? { ...structuredClone(def), ...r.data, forms: def.forms, features } : structuredClone(def);", 1),
    # ocjena iz cjenika sprema se uz poruku
    ("  const item = { id: token(6), topic, msg, when: str(body.when ?? body.kada, 80), contact: str(body.contact ?? body.kontakt, 120), table: str(body.table, 8), lang: body.lang === 'en' ? 'en' : 'hr', createdAt: body._at ? str(body._at, 30) : isoNow(), read: false, done: false };",
     "  const item = { id: token(6), topic, msg, when: str(body.when ?? body.kada, 80), contact: str(body.contact ?? body.kontakt, 120), table: str(body.table, 8), lang: body.lang === 'en' ? 'en' : 'hr', createdAt: body._at ? str(body._at, 30) : isoNow(), read: false, done: false };\n"
     "  const stars = num(body.stars, 1, 5); if (stars) item.stars = Math.round(stars);   // ocjena posjeta iz cjenika (1–4 ★)", 1),
    # statistika: koliko gostiju je dalo koju ocjenu (r1–r5)
    ("const EMPTY_ST = { open: 0, review: 0, book: 0, table: 0, view: {}, names: {} };",
     "const ST_KEYS = ['open', 'review', 'book', 'table', 'r1', 'r2', 'r3', 'r4', 'r5'];\n"
     "const EMPTY_ST = { open: 0, review: 0, book: 0, table: 0, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, view: {}, names: {} };", 1),
    ("else if (['open', 'review', 'book', 'table'].includes(t)) doc[t] = (doc[t] || 0) + n;", "else if (ST_KEYS.includes(t)) doc[t] = (doc[t] || 0) + n;", 1),
    ("    for (const k of ['open', 'review', 'book', 'table']) out[k] += d[k] || 0;", "    for (const k of ST_KEYS) out[k] += d[k] || 0;", 1),
    ("    series.push({ date: d, open: s.open, review: s.review, book: s.book, table: s.table });",
     "    series.push({ date: d, open: s.open, review: s.review, book: s.book, table: s.table, r1: s.r1, r2: s.r2, r3: s.r3, r4: s.r4, r5: s.r5 });", 1),
    ("    for (const k of ['open', 'review', 'book', 'table']) tot[k] += s[k];", "    for (const k of ST_KEYS) tot[k] += s[k] || 0;", 1),
    ("total: { open: tot.open, review: tot.review, book: tot.book, table: tot.table }",
     "total: { open: tot.open, review: tot.review, book: tot.book, table: tot.table, r1: tot.r1, r2: tot.r2, r3: tot.r3, r4: tot.r4, r5: tot.r5 }", 1),
    # slabija ocjena: e-mail i WhatsApp voditelju (ako su postavljeni); WhatsApp bez teksta i broja gosta
    (r"""      const to = envFor(env, 'FEEDBACK_EMAIL', v) || envFor(env, 'NOTIFY_EMAIL', v);
      if (to && r.id) await later(sendEmail(env, to, `Anonimna poruka (${v})`, `${body.topic || body.tema || ''}\n\n${body.msg || body.poruka || ''}\n\n${body.when || body.kada || ''} ${body.contact || body.kontakt || ''}`));""",
     r"""      const stars = Math.round(+body.stars) >= 1 && Math.round(+body.stars) <= 5 ? Math.round(+body.stars) : 0;
      const cfg = await C.getConfig(S), tbl = String(body.table || '').replace(/[^\w-]/g, '').slice(0, 8);
      const head = stars ? `${'★'.repeat(stars)}${'☆'.repeat(5 - stars)} Ocjena ${stars}/5 · ${cfg.venue}` : `Poruka gosta · ${cfg.venue}`;
      const open = `${site}${vpath}/admin/#msgs`;
      const to = envFor(env, 'FEEDBACK_EMAIL', v) || envFor(env, 'NOTIFY_EMAIL', v);
      if (to && r.id) await later(sendEmail(env, to, head, `${head}${tbl ? ' · stol ' + tbl : ''}\nTema: ${body.topic || body.tema || ''}\n\n${body.msg || body.poruka || ''}\n\n${body.when || body.kada || ''} ${body.contact || body.kontakt || ''}\n\nOtvori: ${open}`));
      // WhatsApp ide preko vanjskog servisa: bez teksta poruke i bez broja gosta — voditelj sve vidi u upravi
      if (r.id && stars && stars < 5) await later(sendWhatsAppStaff(env, v, `${head}${tbl ? ' · stol ' + tbl : ''}${body.contact || body.kontakt ? '\n📞 Gost je ostavio broj — nazovite ga' : ''}\nOtvori: ${open}`));""", 1),
]

# ---------------------------------------------------------------- cjenik gosta (lokal/index.html)
# vrijednost n: broj pojavljivanja; dict → po lokalu (slug mape)
GUEST = [
    # poziv ide voditelju, ne konobaru
    ("table: 'Stol', waiter: 'Konobar', bill: 'Račun'", "table: 'Stol', waiter: 'Voditelj', bill: 'Račun'", 1),
    ("callT: 'Poziv konobaru', callS: t => `Stol ${t} · konobar dobiva obavijest odmah.`, reason: 'Razlog (neobavezno)', reasons: ['Želimo naručiti', 'Još jednu rundu', 'Imamo pitanje', 'Čaše / led / pepeljara'], callBtn: '🔔 Pozovite konobara',",
     "callT: 'Pozovite voditelja', callS: t => `Stol ${t} · voditelj lokala dobiva obavijest odmah.`, reason: 'Razlog (neobavezno)', reasons: ['Imamo pitanje', 'Nešto nije u redu', 'Slavimo nešto 🎉', 'Želimo bocu za stol 🍾'], callBtn: '🔔 Pozovite voditelja',", 1),
    ("st: { call: ['🔔 Konobar je pozvan', '👍 Konobar je vidio — dolazi', '✓ Riješeno'],",
     "st: { call: ['🔔 Voditelj je pozvan', '👍 Voditelj je vidio — dolazi', '✓ Riješeno'],", 1),
    ("table: 'Table', waiter: 'Waiter', bill: 'Bill'", "table: 'Table', waiter: 'Manager', bill: 'Bill'", 1),
    ("callT: 'Call the waiter', callS: t => `Table ${t} · the waiter is notified instantly.`, reason: 'Reason (optional)', reasons: ['We’d like to order', 'Another round', 'We have a question', 'Glasses / ice / ashtray'], callBtn: '🔔 Call the waiter',",
     "callT: 'Call the manager', callS: t => `Table ${t} · the manager is notified instantly.`, reason: 'Reason (optional)', reasons: ['We have a question', 'Something is wrong', 'We’re celebrating 🎉', 'A bottle for our table 🍾'], callBtn: '🔔 Call the manager',", 1),
    ("st: { call: ['🔔 Waiter called', '👍 The waiter saw it — on the way', '✓ Done'],",
     "st: { call: ['🔔 Manager called', '👍 The manager saw it — on the way', '✓ Done'],", 1),
    # traka stola: poziv samo gdje ga paket ima (ne Brooklyn) + ⭐ ocjena za sve
    ("  const BILL = !!(V.features && V.features.bill);",
     "  const BILL = !!(V.features && V.features.bill);\n  const CALL = !!(V.features && V.features.tableMode);   // paket BHT: poziv voditelju (Brooklyn bez poziva)", 1),
    ("      <button data-tt=\"call\"><span class=\"e\">🔔</span>${tx('waiter')}</button>${BILL ? `<button data-tt=\"bill\"><span class=\"e\">🧾</span>${tx('bill')}</button>` : ''}",
     "      ${CALL ? `<button data-tt=\"call\"><span class=\"e\">🔔</span>${tx('waiter')}</button>` : ''}${BILL ? `<button data-tt=\"bill\"><span class=\"e\">🧾</span>${tx('bill')}</button>` : ''}<button data-tt=\"rate\"><span class=\"e\">⭐</span>${M && M.lang === 'en' ? 'Rate us' : 'Ocjena'}</button>", 1),
    ("const k = b.dataset.tt; if (k === 'call') callSheet(); else if (k === 'bill') billSheet();",
     "const k = b.dataset.tt; if (k === 'rate') { if (window.TTR) TTR.open(); } else if (k === 'call') callSheet(); else if (k === 'bill') billSheet();", 1),
    # poziv voditelju: uz razlog i kratka poruka
    ("<button class=\"tt-big gold\" id=\"ttgo\">${tx('callBtn')}</button>`);",
     "<label class=\"tt-lbl\" for=\"ttcn\">${M.lang === 'en' ? 'Message (optional)' : 'Poruka (neobavezno)'}</label><input class=\"tt-in\" id=\"ttcn\" maxlength=\"120\" autocomplete=\"off\" placeholder=\"${M.lang === 'en' ? 'e.g. birthday, we need a bigger table' : 'npr. rođendan, trebamo veći stol'}\"><button class=\"tt-big gold\" id=\"ttgo\">${tx('callBtn')}</button>`);", 1),
    ("d.querySelector('#ttgo').onclick = e => send({ kind: 'call', note: reason }, e.currentTarget);",
     "d.querySelector('#ttgo').onclick = e => { const tn = ((d.querySelector('#ttcn') || {}).value || '').trim(); send({ kind: 'call', note: [reason, tn].filter(Boolean).join(': ') }, e.currentTarget); };", 1),
    # nema poziva konobara iz popisa, kombo ponude ni jela iz kuhinje — naručuje se kod konobara
    ("    if (TABLE) setTimeout(() => {   // izvorni popis (\"Pokažite konobaru\") + poziv konobara sa stola",
     "    if (TABLE && false) setTimeout(() => {   // paket BHT: bez poziva konobara iz popisa (popis se pokaže konobaru)", 1),
    ("const btn = t ? `<button class=\"tt-big gold\" data-kcall", "const btn = t && false ? `<button class=\"tt-big gold\" data-kcall", {'q-club': 1, 'kafanica': 1, 'bure-bar': 1}),   # Brooklyn nema kombo
    ("    window.TTF_call = callSheet;   // jela iz kuhinje: \"Pozovite konobara\" s razlogom",
     "    window.TTF_call = null;   // paket BHT: jela se naručuju kod konobara", {'kafanica': 1}),
    # Bure Bar: kartica rezervacije se skriva kao u ostalim lokalima
    ("function renderBook(){const m=MENU.meta;\n $('#bookc').innerHTML=",
     "function renderBook(){const m=MENU.meta;if(m.booking===false){$('#bookc').hidden=true;return;}\n $('#bookc').innerHTML=", {'bure-bar': 1}),
    # kartica "Vaše mišljenje": zvjezdice umjesto jednog gumba za Google
    ("  <div class=\"stars\" aria-hidden=\"true\">${svg(UI.starF,22).repeat(5)}</div><p>${t('rateText')}</p>\n  <a class=\"bigbtn gold\" href=\"${esc(m.googleReview)}\" target=\"_blank\" rel=\"noopener\">${svg(UI.star,20)} ${t('rateBtn')}</a>",
     "  ${window.TTR?TTR.card(lang,m):`<div class=\"stars\" aria-hidden=\"true\">${svg(UI.starF,22).repeat(5)}</div><p>${t('rateText')}</p>\n  <a class=\"bigbtn gold\" href=\"${esc(m.googleReview)}\" target=\"_blank\" rel=\"noopener\">${svg(UI.star,20)} ${t('rateBtn')}</a>`}", 1),
]
GUEST_ANCHOR = "</script>\n<script>\n(function(){\n'use strict';\n/* ================= helpers ================= */"


def guest_script():
    js = open(os.path.join(HERE, 'live', 'ocjena.js'), encoding='utf-8').read()
    return '</script>\n<script>\n' + js + '</script>\n<script>\n(function(){\n\'use strict\';\n/* ================= helpers ================= */'


# ---------------------------------------------------------------- uprava lokala (lokal/admin/index.html)
ADMIN_RATE_CARD = r"""function rateCard(T){const n=[1,2,3,4,5].map(i=>T['r'+i]||0),tot=n.reduce((a,b)=>a+b,0);
 if(!tot)return `<div class="card"><h2 style="font-size:18px">⭐ Ocjene gostiju</h2><p class="small" style="margin:0">Još nema ocjena. Gost ocjenjuje u cjeniku: 5 zvjezdica odmah otvara Google recenziju, slabija ocjena stiže vama u Poruke.</p></div>`;
 const avg=n.reduce((a,c,i)=>a+c*(i+1),0)/tot,mx=Math.max(1,...n),lo=tot-n[4];
 return `<div class="card"><h2 style="font-size:18px">⭐ Ocjene gostiju</h2><p class="small" style="margin:0 0 10px">Gost ocjenjuje u cjeniku: 5 zvjezdica odmah otvara Google recenziju, slabija ocjena stiže vama u Poruke.</p><div class="kpis"><div class="stat gold"><b>${avg.toFixed(1).replace('.',',')}</b><span>prosjek · ${tot} ${pl(tot,'ocjena','ocjene','ocjena')}</span></div><div class="stat"><b>${n[4]}</b><span>${pl(n[4],'ocjena','ocjene','ocjena')} 5★ → Google</span></div><div class="stat"><b>${lo}</b><span>${pl(lo,'ocjena','ocjene','ocjena')} 1–4★ → Poruke</span></div><div class="stat"><b>${T.review}</b><span>${pl(T.review,'otvaranje','otvaranja','otvaranja')} Google recenzije</span></div></div><div class="bars">${[5,4,3,2,1].map(i=>`<div class="b"><div><span>${'★'.repeat(i)}</span><i style="width:${Math.round(n[i-1]/mx*100)}%"></i></div><b>${n[i-1]}</b></div>`).join('')}</div></div>`}
async function renderStats(){"""

ADMIN = [
    ("const KIND={call:['🔔','Zove konobara'],", "const KIND={call:['🔔','Zove voditelja'],", 1),
    ("const REZ=(V.features||{}).reservations!==false,BILL=!!(V.features||{}).bill;",
     "const REZ=(V.features||{}).reservations!==false,BILL=!!(V.features||{}).bill,LIVE=!!(V.features||{}).tableMode;", 1),
    ("function MOB(){return REZ?[['list','Večer'],['plan','Tlocrt'],['+',''],['live','Uživo'],['more','Više']]:[['live','Uživo'],['menu','Cjenik'],['msgs','Poruke'],['more','Više']]}",
     "function MOB(){return REZ?[['list','Večer'],['plan','Tlocrt'],['+',''],['live','Uživo'],['more','Više']]:LIVE?[['live','Uživo'],['menu','Cjenik'],['msgs','Poruke'],['more','Više']]:[['msgs','Poruke'],['menu','Cjenik'],['stats','Statistika'],['more','Više']]}", 1),
    ("function NAV(){return [...(REZ?[['list','Večer'],['plan','Tlocrt']]:[]),['live','Uživo'],",
     "function NAV(){return [...(REZ?[['list','Večer'],['plan','Tlocrt']]:[]),...(LIVE?[['live','Uživo']]:[]),", 1),
    ("const tab=h[0]||(REZ?'list':'live');", "const tab=h[0]||(REZ?'list':LIVE?'live':'msgs');", 1),
    ("setTab(NAV().some(([k])=>k===tab)?tab:(REZ?'list':'live'));", "setTab(NAV().some(([k])=>k===tab)?tab:(REZ?'list':LIVE?'live':'msgs'));", 1),
    ("<p class=\"psub\">Gosti zovu konobara${BILL?' i traže račun':''} izravno s mobitela (NFC naljepnica / QR na stolu). Sve stiže ovdje u sekundi, a vidi se i koliko brzo osoblje reagira.</p>",
     "<p class=\"psub\">Gosti s mobitela (NFC naljepnica / QR na stolu) zovu voditelja: pitanje, problem, proslava ili boca za stol. Sve stiže ovdje u sekundi, a vidi se i koliko brzo reagirate.</p>", 1),
    ("Kad gost dodirne „Pozovite konobara”${BILL?' ili „Račun”':''} — pojavit će se ovdje, uz zvučni signal.",
     "Kad gost dodirne „Pozovite voditelja” — pojavit će se ovdje, uz zvučni signal.", 1),
    ("['call','🔔 Konobar']", "['call','🔔 Voditelj']", 1),
    ("Gost prisloni mobitel i otvara se cjenik s brojem stola — iz njega jednim dodirom zove konobara${BILL?' ili traži račun':''}.</p>",
     "Gost prisloni mobitel i otvara se cjenik s brojem stola — iz njega jednim dodirom ${LIVE?'zove voditelja ili ':''}ocjenjuje posjet.</p>", 1),
    ("<div class=\"setrow\"><span>Stol uživo<br><span class=\"small\">Gumbi u cjeniku kad gost dodirne naljepnicu na stolu</span></span><input type=\"checkbox\" class=\"tog\" id=\"fTable\" ${EC.features&&EC.features.tableMode?'checked':''}></div>",
     "${LIVE?`<div class=\"setrow\"><span>Poziv voditelju sa stola<br><span class=\"small\">Gumb „Voditelj” u cjeniku kad gost dodirne naljepnicu na stolu</span></span><input type=\"checkbox\" class=\"tog\" id=\"fTable\" ${EC.features&&EC.features.tableMode?'checked':''}></div>`:''}", 1),
    ("{tableMode:$('#fTable').checked}", "{tableMode:$('#fTable')?$('#fTable').checked:!!(EC.features&&EC.features.tableMode)}", 1),
    ("<p class=\"small\">Nova rezervacija stiže osoblju na WhatsApp i e-mail. Postavlja se na serveru (upute u README).</p>",
     "<p class=\"small\">Ocjena ispod 5 zvjezdica i poruka gosta stižu voditelju na WhatsApp i e-mail. Postavlja se na serveru (upute u README).</p>", 1),
    # poruke: zvjezdice, poziv gostu jednim dodirom
    ("Anonimne poruke iz digitalnog cjenika. Problem saznate isti dan — prije nego završi kao loša Google recenzija.",
     "Ocjene ispod 5 zvjezdica i poruke gostiju iz digitalnog cjenika. Ako je gost ostavio broj, nazovite ga isti dan i riješite problem dok je još svjež.", 1),
    ("<div class=\"top\"><span class=\"tp\">${esc(TOP[x.topic]||x.topic)}</span>",
     "<div class=\"top\">${x.stars?`<span class=\"tp\" style=\"color:var(--gold2,#f2c872)\">${'★'.repeat(x.stars)}<span style=\"opacity:.25\">${'★'.repeat(5-x.stars)}</span>&nbsp;${x.stars}/5</span>`:''}<span class=\"tp\">${esc(TOP[x.topic]||x.topic)}</span>", 1),
    ("x.contact&&'Kontakt: '+esc(x.contact)",
     "x.contact&&(/^\\+?[\\d\\s\\/-]{6,}$/.test(x.contact.trim())?`<a href=\"tel:${esc(x.contact.replace(/[^\\d+]/g,''))}\" style=\"color:var(--gold2);font-weight:800;text-decoration:none\">📞 Nazovite ${esc(x.contact)}</a>`:'Kontakt: '+esc(x.contact))", 1),
    ("Kad gost pošalje anonimnu poruku iz cjenika, pojavit će se ovdje.", "Kad gost da ocjenu ispod 5 zvjezdica ili pošalje poruku iz cjenika, pojavit će se ovdje.", 1),
    ("toast('✉️ Nova anonimna poruka upravi')", "toast(d.list.some(x=>!S.seenFb.includes(x.id)&&x.stars)?'⭐ Nova ocjena gosta — pogledajte Poruke':'✉️ Nova poruka gosta')", 1),
    ("setInterval(()=>{if(document.visibilityState==='visible')loadFb()},30000);", "setInterval(()=>{if(document.visibilityState==='visible')loadFb()},15000);", 1),
    # statistika: ocjene gostiju
    ("async function renderStats(){", ADMIN_RATE_CARD, 1),
    ("<div class=\"card\"><h2 style=\"font-size:18px\">Otvaranja cjenika po danu</h2>", "${rateCard(T)}<div class=\"card\"><h2 style=\"font-size:18px\">Otvaranja cjenika po danu</h2>", 1),
]

# ---------------------------------------------------------------- pregled za direktore (grupa/index.html)
GRUPA_HELPERS = r"""let D=null;
/* paket BHT: bez rezervacija — na vrhu cjenik, ocjene i pozivi; ocjene su zbroj zadnjih 7 dana */
const RT=v=>{const s=v.stats||{},n=[1,2,3,4,5].map(i=>s['r'+i]||0),t=n.reduce((a,b)=>a+b,0);return {n,t,avg:t?n.reduce((a,c,i)=>a+c*(i+1),0)/t:null}};
const f1=x=>x==null?'—':x.toFixed(1).replace('.',',');
function KP2(V,sum,openNow,U_){const R=V.map(RT),T=R.reduce((a,r)=>a+r.t,0),S5=R.reduce((a,r)=>a+r.n[4],0),A=T?R.reduce((a,r)=>a+r.n.reduce((x,c,i)=>x+c*(i+1),0),0)/T:null;
 return [[sum(v=>v.stats.open||0),'otvaranja cjenika · 7 dana'],[sum(v=>v.stats.table||0),'dodira NFC/QR na stolu · 7 dana'],[f1(A),`prosječna ocjena · ${T} ${pl(T,'ocjena','ocjene','ocjena')}`],[S5,`${pl(S5,'ocjena','ocjene','ocjena')} 5★ → Google`],[openNow,pl(openNow,'stol zove','stola zovu','stolova zove')+' sada',openNow>0],[U_,pl(U_,'nepročitana poruka','nepročitane poruke','nepročitanih poruka'),U_>0]]}
function NUMS2(v){const r=RT(v);return `<div><b>${f1(r.avg)}</b><span>prosječna ocjena</span></div><div><b>${r.t}</b><span>${pl(r.t,'ocjena','ocjene','ocjena')} · 7 dana</span></div><div><b>${r.n[4]}</b><span>5★ → Google</span></div><div><b>${v.stats.open||0}</b><span>otvaranja · 7 dana</span></div>`}
"""

GRUPA = [
    ("const KIND={call:['🔔','zove konobara'],", "const KIND={call:['🔔','zove voditelja'],", 1),
    ("let D=null;\n", GRUPA_HELPERS, 1),
    ("$('#kp').innerHTML=[[R_,", "$('#kp').innerHTML=(!V.some(REZ)?KP2(V,sum,openNow,U_):[[R_,", 1),
    ("pročitanih poruka'),U_>0]]\n    .map(([b,s,h])=>", "pročitanih poruka'),U_>0]])\n    .map(([b,s,h])=>", 1),
    ("<div class=\"nums\">${REZ(v)?`", "<div class=\"nums\">${!REZ(v)&&!(v.features||{}).tableMode?NUMS2(v):`${REZ(v)?`", 1),
    ("<span>reakcija osoblja</span></div></div>", "<span>reakcija osoblja</span></div>`}</div>", 1),
    ("<span class=\"chipx\">✉️ <b>${v.feedback.unread}</b>",
     "${RT(v).t?`<span class=\"chipx\">⭐ <b>${f1(RT(v).avg)}</b> · ${RT(v).t} ${pl(RT(v).t,'ocjena','ocjene','ocjena')} · 7 dana</span>`:''}<span class=\"chipx\">✉️ <b>${v.feedback.unread}</b>", 1),
    ("· ${esc(TOP[f.topic]||f.topic)} ·", "· ${f.stars?`<span style=\"color:var(--gold2,#f2c872)\">${'★'.repeat(f.stars)}<span style=\"opacity:.28\">${'★'.repeat(5-f.stars)}</span></span> ${f.stars}/5 · `:''}${esc(TOP[f.topic]||f.topic)} ·", 1),
    ("'bez rezervacija · '+dayLbl", "dayLbl", 1),
    ("[['📖 Digitalni cjenik','cijene, rasprodano i akcije mijenja voditelj sam'],['📅 Rezervacije s tlocrtom','gost bira stol i jamči karticom — hostesa skenira ulaznicu, voditelj odmah zna tko je stigao'],['🔔 Poziv konobara','gost zove konobara jednim dodirom — vidi se brzina reakcije'],['⭐ Recenzije i poruke','Google recenzije + anonimne poruke voditelju i direktorima'],['🔐 Voditelji i direktori','voditelj vidi svoj lokal, direktori sve — svatko svojim PIN-om']]",
     "[['📖 Digitalni cjenik','cijene, rasprodano i akcije mijenja voditelj sam'],['⭐ Ocjene i Google recenzije','gost ocjenjuje u cjeniku: 5★ vodi ravno na Google, slabija ocjena stiže voditelju i direktorima'],['🔔 Poziv voditelju','gost jednim dodirom javlja voditelju (Q Club, Kafanica, Bure Bar) — vidi se brzina reakcije'],['📊 Statistika','otvaranja cjenika, dodiri na stolovima, najgledanija pića i ocjene po lokalu'],['🔐 Voditelji i direktori','voditelj vidi svoj lokal, direktori sve — svatko svojim PIN-om']]", 1),
    ("Rezervacije, gosti, pozivi sa stolova i poruke gostiju iz sva četiri lokala — na jednom ekranu.",
     "Cjenik, ocjene gostiju, pozivi voditeljima i poruke iz sva četiri lokala — na jednom ekranu.", 1),
]
