/* TipTap × BHT — ocjena posjeta u digitalnom cjeniku (samo produkcija; ubacuje je tools/build_live.py)
   Gost dodirne zvjezdicu u kartici "Vaše mišljenje" ili gumb ⭐ na traci stola:
   • 5 ★   → odmah se otvara Google recenzija lokala. Google ne dopušta unaprijed odabrane zvjezdice
             ni predložen tekst, pa gost tamo samo dodirne zvjezdice i "Objavi".
   • 1–4 ★ → kratka poruka voditelju: tema, opis i broj za povratni poziv (sve neobavezno).
             Stiže u upravu lokala (Poruke) i u pregled grupe za direktore; ako su postavljeni,
             i obavijest na WhatsApp / e-mail. Gumb za Google ostaje vidljiv i ovdje: Googleova pravila
             zabranjuju da se recenzije traže samo od zadovoljnih gostiju
             (support.google.com/contributionpolicy/answer/7400114 → "Rating manipulation").
   Statistika: r1–r5 (koliko je gostiju dalo koju ocjenu) i review (otvaranje Google recenzije). */
(function () {
  'use strict';
  if (window.TTR) return;
  const V = window.TT_CFG || {};
  const TTR = window.TTR = {};
  const KEY = 'ttr_' + (V.venue || 'x');
  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9z"/></svg>';
  const T = {
    hr: {
      hint: 'Dodirnite zvjezdicu — traje 10 sekundi.',
      sheetT: 'Kako vam je kod nas?',
      group: 'Vaša ocjena',
      star: n => n + (n === 1 ? ' zvjezdica' : n < 5 ? ' zvjezdice' : ' zvjezdica'),
      thanks: 'Hvala vam!',
      opened: 'Google recenzija otvorila se u novoj kartici. Tamo dodirnite zvjezdice i „Objavi”.',
      openG: 'Otvorite Google recenziju',
      lowT: 'Hvala na iskrenosti',
      lowS: 'Žao nam je što nije bilo savršeno. Recite voditelju što možemo popraviti, poruka mu stiže odmah.',
      topic: 'Na što se odnosi?',
      topics: [['usluga', 'Usluga'], ['cekanje', 'Čekanje'], ['pice', 'Piće'], ['cistoca', 'Čistoća'], ['glazba', 'Glazba'], ['racun', 'Račun'], ['ostalo', 'Nešto drugo']],
      msg: 'Što se dogodilo? (neobavezno)', msgPh: 'npr. dugo smo čekali piće',
      tel: 'Vaš broj, ako želite da vas voditelj nazove', telPh: '09x xxx xxxx',
      send: 'Pošaljite voditelju', sending: 'Šaljem…',
      or: 'ili', gBtn: 'Ocijenite nas na Googleu',
      sent: 'Hvala! Voditelj je dobio vašu poruku.', sentTel: t => `Može vas nazvati na ${t}.`, sentAnon: 'Poruka je anonimna.',
      cardSent: 'Hvala na poruci. Voditelj ju je već dobio.', alsoG: 'Ocijenite nas i na Googleu',
      err: 'Slanje nije uspjelo. Provjerite internet i pokušajte ponovno.'
    },
    en: {
      hint: 'Tap a star — it takes 10 seconds.',
      sheetT: 'How is your visit?',
      group: 'Your rating',
      star: n => n + (n === 1 ? ' star' : ' stars'),
      thanks: 'Thank you!',
      opened: 'Google reviews opened in a new tab. Tap the stars there and “Post”.',
      openG: 'Open Google reviews',
      lowT: 'Thanks for being honest',
      lowS: 'We’re sorry it wasn’t perfect. Tell the manager what we can fix — the message reaches them right away.',
      topic: 'What is it about?',
      topics: [['usluga', 'Service'], ['cekanje', 'Waiting'], ['pice', 'Drinks'], ['cistoca', 'Cleanliness'], ['glazba', 'Music'], ['racun', 'Bill'], ['ostalo', 'Something else']],
      msg: 'What happened? (optional)', msgPh: 'e.g. we waited a long time for drinks',
      tel: 'Your number, if you’d like the manager to call you', telPh: '+385 9x xxx xxxx',
      send: 'Send to the manager', sending: 'Sending…',
      or: 'or', gBtn: 'Rate us on Google',
      sent: 'Thank you! The manager has your message.', sentTel: t => `They can call you at ${t}.`, sentAnon: 'Your message is anonymous.',
      cardSent: 'Thanks for your message. The manager already has it.', alsoG: 'Rate us on Google too',
      err: 'Sending failed. Check your connection and try again.'
    }
  };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const M = () => window.TTM || null;
  const L = lg => (lg || (M() && M().lang)) === 'en' ? 'en' : 'hr';
  const tx = lg => T[L(lg)];
  const buzz = p => { try { window.TT && TT.buzz && TT.buzz(p); } catch (e) { } };
  const hit = e => { try { window.TTX && TTX.hit && TTX.hit(e); } catch (e2) { } };
  const table = () => { try { return (window.TTX && TTX.table && TTX.table()) || ''; } catch (e) { return ''; } };
  const toast = m => { try { M() && M().toast(m); } catch (e) { } };

  /* stanje u ovoj kartici preglednika: { n: ocjena, sent: poruka poslana, c: već brojene ocjene } */
  const st = (() => { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null') || {}; } catch (e) { return {}; } })();
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { } };
  let gUrl = '';
  const google = () => gUrl || (M() && M().MENU && M().MENU.meta && M().MENU.meta.googleReview) || '';

  function stars(n, live, big, lg) {
    const t = tx(lg);
    const one = i => live
      ? `<button type="button" class="ttr-s${i <= n ? ' on' : ''}" data-rate="${i}" aria-label="${esc(t.star(i))}">${STAR}</button>`
      : `<span class="ttr-s${i <= n ? ' on' : ''}">${STAR}</span>`;
    return `<div class="ttr-stars${big ? ' big' : ''}"${live ? ` role="group" aria-label="${esc(t.group)}"` : ' aria-hidden="true"'}>${[1, 2, 3, 4, 5].map(one).join('')}</div>`;
  }
  /* isti prikaz u kartici i u listu s trake stola */
  function stateHTML(big, lg) {
    const t = tx(lg), n = st.n || 0;
    if (n === 5) return `${stars(5, false, big, lg)}<p class="ttr-hint"><b>${t.thanks}</b> ${t.opened}</p><button type="button" class="${big ? 'tt-big gold' : 'bigbtn gold'}" data-ttr-g>${STAR} ${t.openG}</button>`;
    // poslana poruka: zvjezdice ostaju za dodir (npr. voditelj je riješio problem pa gost promijeni ocjenu)
    if (n && st.sent) return `${stars(n, true, big, lg)}<p class="ttr-hint"><b>${t.cardSent}</b></p><button type="button" class="ttr-link" data-ttr-g>${t.alsoG} ›</button>`;
    return `${stars(n, true, big, lg)}<p class="ttr-hint${big ? ' c' : ''}">${t.hint}</p>`;
  }

  /* kartica "Vaše mišljenje" u cjeniku (renderRate je poziva pri svakom crtanju) */
  TTR.card = (lg, meta) => { if (meta && meta.googleReview) gUrl = meta.googleReview; return `<div id="ttrcard">${stateHTML(false, lg)}</div>`; };
  function paint() {
    const c = document.getElementById('ttrcard'); if (c) c.innerHTML = stateHTML(false);
    const d = document.getElementById('ttrsheet');
    if (d && d.dataset.mode === 'state' && d.classList.contains('on')) { const p = d.querySelector('.tt-pad'); if (p) p.innerHTML = stateHTML(true); }
  }

  /* list (isti izgled kao ostali listovi cjenika) */
  function sheet(title, html, mode) {
    const m = M(); if (!m) return null;
    let d = document.getElementById('ttrsheet');
    if (!d) { d = document.createElement('section'); d.id = 'ttrsheet'; d.className = 'sheet'; d.hidden = true; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); document.body.appendChild(d); }
    d.dataset.mode = mode || '';
    d.innerHTML = `<div class="grab"><h3>${title}</h3><button class="close" data-close aria-label="×">${m.svg(m.UI.x, 24)}</button></div><div class="tt-pad">${html}</div>`;
    if (!(d.classList.contains('on') && !d.hidden)) m.showSheet(d); else d.scrollTop = 0;
    return d;
  }
  TTR.open = () => {
    if (st.n && st.n < 5 && !st.sent) return low(st.n);
    sheet(tx().sheetT, stateHTML(true), 'state');
  };

  function openGoogle() {
    const url = google(); if (!url) return;
    hit({ t: 'review' });
    let w = null;
    try { w = window.open(url, '_blank'); } catch (e) { }
    if (w) { try { w.opener = null; } catch (e) { } } else location.href = url;
  }

  function pick(n) {
    n = Math.max(1, Math.min(5, n | 0));
    buzz(10);
    st.n = n; st.sent = false; st.c = st.c || {};
    if (!st.c[n]) { st.c[n] = 1; hit({ t: 'r' + n }); }
    save();
    if (n === 5) { openGoogle(); paint(); return; }
    paint(); low(n);
  }

  function low(n) {
    const t = tx(); let topic = '';
    const d = sheet(t.lowT, `${stars(n, false, true)}<p class="tt-sub c">${t.lowS}</p>
      <div id="ttrform"><span class="tt-lbl">${t.topic}</span><div class="tt-chips">${t.topics.map(([v, l]) => `<button type="button" class="tt-chip" data-tp="${v}" aria-pressed="false">${esc(l)}</button>`).join('')}</div>
      <label class="tt-lbl" for="ttrm">${t.msg}</label><textarea class="tt-in" id="ttrm" rows="3" maxlength="600" placeholder="${esc(t.msgPh)}"></textarea>
      <label class="tt-lbl" for="ttrp">${t.tel}</label><input class="tt-in" id="ttrp" type="tel" inputmode="tel" autocomplete="tel" maxlength="30" placeholder="${esc(t.telPh)}"></div>
      <div id="ttrbox"><button type="button" class="tt-big gold" id="ttrsend">${t.send}</button></div>
      <div class="ttr-or"><span>${t.or}</span></div>
      <button type="button" class="tt-big" data-ttr-g>${STAR} ${t.gBtn}</button>`, 'low');
    if (!d) return;
    d.querySelectorAll('[data-tp]').forEach(b => b.onclick = () => { topic = topic === b.dataset.tp ? '' : b.dataset.tp; d.querySelectorAll('[data-tp]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.tp === topic))); buzz(6); });
    d.querySelector('#ttrsend').onclick = async e => {
      const btn = e.currentTarget; btn.disabled = true; btn.textContent = t.sending;
      const text = d.querySelector('#ttrm').value.trim(), tel = d.querySelector('#ttrp').value.trim();
      const tl = (T.hr.topics.find(x => x[0] === topic) || [])[1] || '';
      // poruka upravi je uvijek na hrvatskom; bez opisa ide sama ocjena i tema (server traži barem 5 znakova)
      const msg = text.length >= 5 ? text : [`Ocjena ${n}/5`, tl, text].filter(Boolean).join(' · ');
      try {
        await TT.api('/feedback', { body: { topic: topic || 'ostalo', msg, contact: tel, table: table(), lang: L(), stars: n } });
        st.sent = true; save(); paint(); buzz([20, 40, 20]); try { TT.chime('ok'); } catch (er) { }
        const f = d.querySelector('#ttrform'); if (f) f.remove();
        d.querySelector('#ttrbox').innerHTML = `<div class="ttr-ok"><b>✓ ${t.sent}</b><span>${tel ? esc(t.sentTel(tel)) : t.sentAnon}</span></div>`;
      } catch (err) { btn.disabled = false; btn.textContent = t.send; toast(t.err); buzz(30); }
    };
  }

  document.addEventListener('click', e => {
    const s = e.target.closest && e.target.closest('[data-rate]');
    if (s) { e.preventDefault(); pick(+s.dataset.rate); return; }
    const g = e.target.closest && e.target.closest('[data-ttr-g]');
    if (g) { e.preventDefault(); openGoogle(); }
  });

  const css = document.createElement('style');
  css.textContent = `
.ttr-stars{display:flex;gap:6px;margin:2px 0 12px}
.ttr-s{flex:1 1 0;min-width:0;max-width:58px;height:52px;display:grid;place-items:center;border-radius:15px;color:rgba(255,255,255,.2);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);transition:transform .15s,color .2s,background .2s}
.ttr-s svg{width:30px;height:30px;display:block}
.ttr-s.on{color:var(--gold2);background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.18)}
.ttr-s.on svg{filter:drop-shadow(0 0 5px var(--gold2))}
button.ttr-s:active{transform:scale(.88)}
@media (hover:hover){.ttr-stars:hover button.ttr-s{color:var(--gold2)}.ttr-stars button.ttr-s:hover~button.ttr-s{color:rgba(255,255,255,.2)}}
.ttr-stars.big{justify-content:center;gap:8px;margin:10px 0 8px}
.ttr-stars.big .ttr-s{height:60px;max-width:60px}
.ttr-stars.big .ttr-s svg{width:34px;height:34px}
.ttr-hint{margin:0 0 16px;color:var(--muted);font-size:14.5px;line-height:1.5;max-width:46ch}
.ttr-hint b{color:var(--text)}
.ttr-hint.c,.tt-sub.c{text-align:center;margin-left:auto;margin-right:auto}
#ttrcard .bigbtn{margin:0 0 4px}
.ttr-link{display:inline-flex;align-items:center;min-height:44px;margin:-6px 0 6px;color:var(--gold2);font-weight:800;font-size:14.5px}
.ttr-ok{display:flex;flex-direction:column;gap:4px;padding:14px 16px;border-radius:16px;background:rgba(143,209,158,.1);border:1px solid rgba(143,209,158,.35)}
.ttr-ok b{color:var(--ok,#8fd19e);font-size:16px}
.ttr-ok span{color:var(--muted);font-size:14px}
.ttr-or{display:flex;align-items:center;gap:12px;margin:14px 0;color:var(--dim);font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.ttr-or::before,.ttr-or::after{content:"";flex:1;height:1px;background:rgba(255,255,255,.1)}
#ttrsheet textarea.tt-in{min-height:84px;resize:vertical;line-height:1.4}
[data-ttr-g] svg{width:20px;height:20px;flex:none}
.ttbar button[data-tt=rate] .e{color:var(--gold2)}
@media (prefers-reduced-motion:reduce){.ttr-s{transition:none}}`;
  (document.head || document.documentElement).appendChild(css);
})();
