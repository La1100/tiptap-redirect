/* TipTap × BHT — mjesečni izvještaj za direktore (/v/grupa/izvjestaj/)
   Podaci: GET /api/group/report?month=YYYY-MM (lib/tt/report.cjs); prijava istim PIN-om kao pregled grupe.
   ?m=YYYY-MM otvara određeni mjesec, ?uredi=1 prikazuje ručni unos Google ocjena. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = TT.esc, VS = window.TT_VENUES || {};
  const q = new URLSearchParams(location.search);
  const EDIT = q.get('uredi') === '1';
  const MO = ['siječanj', 'veljača', 'ožujak', 'travanj', 'svibanj', 'lipanj', 'srpanj', 'kolovoz', 'rujan', 'listopad', 'studeni', 'prosinac'];
  const DS = ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'];
  const DN = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'];
  const TOP = { usluga: 'usluga', pice: 'piće', cekanje: 'čekanje', cistoca: 'čistoća', glazba: 'glazba', racun: 'račun', pohvala: 'pohvala', ostalo: 'ostalo' };
  const pl = (n, one, few, many) => { n = Math.abs(Math.round(n)); const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? one : (a >= 2 && a <= 4 && (b < 12 || b > 14)) ? few : many; };
  const nf = n => Math.round(+n || 0).toLocaleString('hr-HR');
  const f1 = x => (x == null || isNaN(x)) ? '—' : (Math.round(x * 10) / 10).toFixed(1).replace('.', ',').replace('-', '−');
  const mmss = s => s == null ? '—' : Math.floor(s / 60) + ':' + String(Math.round(s % 60)).padStart(2, '0');
  const wd = d => new Date(d + 'T12:00:00Z').getUTCDay();
  const dm = d => `${+d.slice(8)}. ${+d.slice(5, 7)}.`;
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const mName = m => { const [y, mo] = m.split('-').map(Number); return `${cap(MO[mo - 1])} ${y}.`; };
  const sum = (a, f) => a.reduce((x, v) => x + (+f(v) || 0), 0);
  const R = t => { const n = [1, 2, 3, 4, 5].map(i => +t['r' + i] || 0), c = n.reduce((a, b) => a + b, 0); return { n, c, low: n[0] + n[1] + n[2] + n[3], avg: c ? n.reduce((a, x, i) => a + x * (i + 1), 0) / c : null }; };
  const recenzija = n => pl(n, 'recenzija', 'recenzije', 'recenzija');
  const theme = v => ((VS[v.id] || {}).theme) || {};
  const logo = v => { const c = VS[v.id] || {}; return c.logo ? `<svg viewBox="${esc(c.vb || '0 0 220 160')}" aria-hidden="true">${c.logo}</svg>` : ''; };
  let D = null;

  /* zadnje Google očitanje u razdoblju (novije od polaznog stanja 13. 11. 2026.) */
  function gNow(g, end) {
    const h = (g.hist || []).filter(x => x.date > g.base.date && x.date <= end);
    return h.length ? h[h.length - 1] : null;
  }

  /* stupci po danu: petak i subota jače (večeri izlazaka), oznaka samo na najvećem stupcu */
  function bars(days, val, o = {}) {
    const vals = days.map(val), mx = Math.max(0, ...vals), mi = vals.indexOf(mx);
    return `<div class="r-bars${o.sm ? ' sm' : ''}${days.length > 16 ? ' many' : ''}"${o.c ? ` style="--c:${o.c}"` : ''} role="img" aria-label="${esc(o.label || '')}">${days.map((d, i) => {
      const v = vals[i], h = mx ? Math.max(v ? 3 : 0, Math.round(v / mx * 100)) : 0, w = wd(d.date);
      return `<i class="${w === 5 || w === 6 ? 'we' : ''}${v ? '' : ' z'}" title="${DS[w]} ${dm(d.date)}: ${nf(v)} ${esc(o.unit || '')}"><u style="height:${v ? h : 2}%"></u>${i === mi && mx ? `<s style="bottom:${h}%">${nf(v)}</s>` : ''}<em>${+d.date.slice(8)}</em></i>`;
    }).join('')}</div>`;
  }
  function dist(r) {
    const mx = Math.max(1, ...r.n);
    return `<div class="r-dist">${[5, 4, 3, 2, 1].map(i => `<div><span>${'★'.repeat(i)}</span><i style="--p:${Math.round(r.n[i - 1] / mx * 100)}%"></i><b>${nf(r.n[i - 1])}</b></div>`).join('')}</div>`;
  }

  /* ---------- sažetak u rečenicama (samo ono što podaci stvarno pokazuju) ---------- */
  function insights(V, T, r, off, fb) {
    const out = [];
    if (!T.open && !r.c && !off.n) return ['Sustav je tek pokrenut. Prvi podaci stižu čim gosti počnu otvarati cjenik i dodirivati kartice na stolovima.'];
    if (T.open) {
      const days = V[0].days.map((d, i) => ({ date: d.date, n: sum(V, v => v.days[i].open) }));
      const best = days.reduce((a, b) => (b.n > a.n ? b : a), days[0]);
      const vb = V.slice().sort((a, b) => b.total.open - a.total.open)[0];
      out.push(`Otvaranja cjenika: <b>${nf(T.open)}</b>${T.table ? `, od toga dodirom kartice na stolu <b>${nf(T.table)}</b>` : ''}. Najjači dan: ${DN[wd(best.date)]} ${dm(best.date)} (<b>${nf(best.n)}</b>), a najviše otvaranja ima ${esc(vb.name)} (<b>${nf(vb.total.open)}</b>).`);
    }
    if (r.c) out.push(`Ocjene gostiju u cjeniku: <b>${nf(r.c)}</b>, prosjek <b>${f1(r.avg)}</b>. S 5★ upućeno ravno na Google recenziju: <b>${nf(r.n[4])}</b>.`);
    if (r.low) out.push(`Slabije ocjene (1–4★) izravno voditeljima: <b>${nf(r.low)}</b>${fb.rated ? `; poruka s opisom: ${nf(fb.rated)}` : ''}${fb.withPhone ? `; s brojem za povratni poziv: ${nf(fb.withPhone)}` : ''}${fb.done ? `; riješeno: ${nf(fb.done)}` : ''}.`);
    const tp = {}; V.forEach(v => Object.entries(v.feedback.topics || {}).forEach(([k, n]) => { tp[k] = (tp[k] || 0) + n; }));
    const tt = Object.entries(tp).sort((a, b) => b[1] - a[1])[0];
    if (tt && tt[1] > 1) out.push(`Najčešća tema u porukama gostiju: <b>${esc(TOP[tt[0]] || tt[0])}</b> (${nf(tt[1])}).`);
    if (off.n) {
      const ot = {}; V.forEach(v => v.offers.top.forEach(x => { ot[x.name] = (ot[x.name] || 0) + x.n; }));
      const o1 = Object.entries(ot).sort((a, b) => b[1] - a[1])[0];
      out.push(`Ponude za stol: <b>${nf(off.n)}</b> ${pl(off.n, 'obavijest', 'obavijesti', 'obavijesti')} osoblju${off.avg != null ? `, prosječno <b>${mmss(off.avg)}</b> do slanja konobara` : ''}${o1 ? `. Najtraženija: ${esc(o1[0])} (${nf(o1[1])})` : ''}.`);
    }
    const tops = V.flatMap(v => v.top.map(x => ({ ...x, v: v.name }))).sort((a, b) => b.n - a.n);
    if (tops[0]) out.push(`Najgledanije u cjeniku: <b>${esc(tops[0].name)}</b> (${esc(tops[0].v)}, ${nf(tops[0].n)} ${pl(tops[0].n, 'pregled', 'pregleda', 'pregleda')}).`);
    V.forEach(v => { const now = gNow(v.google, D.to), b = v.google.base; if (!now) return; const dc = now.count - b.count;
      out.push(`${esc(v.name)} na Googleu: ${f1(b.rating)} → <b>${f1(now.rating)}</b>, ${dc >= 0 ? '+' : '−'}${nf(Math.abs(dc))} ${recenzija(dc)} od ${dm(b.date)}`); });
    return out;
  }

  function googleSec(V) {
    const cls = x => x > 0 ? 'r-up' : x < 0 ? 'r-down' : 'r-same';
    const rows = V.map(v => {
      const g = v.google, b = g.base, now = gNow(g, D.to);
      const dR = now ? Math.round((now.rating - b.rating) * 10) / 10 : null, dC = now ? now.count - b.count : null;
      return `<tr style="--a:${theme(v).gold2 || ''}"><td><span class="nm">${logo(v)}${esc(v.name)}</span></td>
        <td><b>${f1(b.rating)}</b><small>${nf(b.count)} ${recenzija(b.count)}</small></td>
        <td>${now ? `<b>${f1(now.rating)}</b><small>${nf(now.count)} ${recenzija(now.count)} · ${dm(now.date)}</small>` : '<b class="r-same">—</b><small>čeka prvo očitanje</small>'}</td>
        <td>${now ? `<b class="${cls(dR)}">${dR > 0 ? '+' : ''}${f1(dR)}</b><small class="${cls(dC)}">${dC > 0 ? '+' : dC < 0 ? '−' : ''}${nf(Math.abs(dC))} ${recenzija(dC)}</small>` : '<small>—</small>'}</td>
        ${EDIT ? `<td class="r-noprint"><form class="r-edit" data-gv="${v.id}"><input name="rating" inputmode="decimal" placeholder="${f1(now ? now.rating : b.rating)}" aria-label="Ocjena ${esc(v.name)}"><input name="count" inputmode="numeric" placeholder="${now ? now.count : b.count}" aria-label="Broj recenzija ${esc(v.name)}"><button class="r-btn" type="submit">Spremi</button></form></td>` : ''}</tr>`;
    }).join('');
    const base = V[0] ? V[0].google.base.date : '2026-11-13';
    return `<div class="r-card"><div class="r-gwrap"><table class="r-g"><thead><tr><th>Lokal</th><th>Polazno · ${dm(base)}${base.slice(0, 4)}.</th><th>${D.partial ? 'Zadnje očitanje' : 'Kraj mjeseca'}</th><th>Promjena</th>${EDIT ? '<th class="r-noprint">Novo očitanje</th>' : ''}</tr></thead><tbody>${rows}</tbody></table></div>
      <p class="r-note">Polazno stanje je dan potpisivanja ugovora. ${D.googleAuto ? 'Sustav Google ocjene očitava sam.' : 'Očitanja se upisuju s Google karte.'}</p></div>`;
  }

  function venueCard(v) {
    const th = theme(v), r = R(v.total), fb = v.feedback, o = v.offers;
    const tp = Object.entries(fb.topics || {}).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const now = gNow(v.google, D.to), b = v.google.base;
    const box4 = v.offersOn
      ? `<div class="r-box"><h3>Ponude za stol</h3>${o.n ? `<p><b>${nf(o.n)}</b> <span class="mut">${pl(o.n, 'obavijest', 'obavijesti', 'obavijesti')} osoblju</span></p><p><span class="mut">prosječno do slanja konobara</span> <b>${mmss(o.avgAck)}</b></p>${o.top.length ? `<ul class="r-list" style="margin-top:6px">${o.top.map(x => `<li><span>${esc(x.name)}</span><b>${nf(x.n)}</b></li>`).join('')}</ul>` : ''}` : '<p class="r-empty">Još nema obavijesti za ponude.</p>'}</div>`
      : `<div class="r-box"><h3>Google</h3><p><span class="mut">polazno</span> <b>${f1(b.rating)}</b> <span class="mut">· ${nf(b.count)} ${recenzija(b.count)}</span></p><p>${now ? `<span class="mut">sada</span> <b>${f1(now.rating)}</b> <span class="mut">· ${nf(now.count)} ${recenzija(now.count)}</span>` : '<span class="mut">čeka prvo očitanje</span>'}</p></div>`;
    return `<article class="vc" style="--a:${th.gold2 || '#f2d08c'};--a2:${th.gold || '#d9b25f'};--vb:${th.card || '#15151c'}">
      <div class="hd">${logo(v)}<div class="nm">${esc(v.name)}<small>${v.offersOn ? 'cjenik · ocjene · ponude za stol' : 'cjenik · ocjene'}</small></div></div>
      <div class="nums"><div><b>${nf(v.total.open)}</b><span>otvaranja cjenika</span></div><div><b>${nf(v.total.table)}</b><span>dodira na stolu</span></div><div><b>${f1(r.avg)}</b><span>prosjek · ${nf(r.c)} ${pl(r.c, 'ocjena', 'ocjene', 'ocjena')}</span></div><div><b>${nf(r.n[4])}</b><span>5★ → Google</span></div></div>
      ${bars(v.days, d => d.open, { sm: true, c: th.gold2, unit: 'otvaranja', label: `Otvaranja cjenika po danu: ${v.name}` })}
      <div class="r-two">
        <div class="r-box"><h3>Ocjene gostiju</h3>${r.c ? dist(r) : '<p class="r-empty">Još nema ocjena.</p>'}</div>
        <div class="r-box"><h3>Najgledanije u cjeniku</h3>${v.top.length ? `<ul class="r-list">${v.top.map(x => `<li><span>${esc(x.name)}</span><b>${nf(x.n)}</b></li>`).join('')}</ul>` : '<p class="r-empty">Još nema pregleda.</p>'}</div>
        <div class="r-box"><h3>Slabije ocjene i poruke</h3>${r.low || fb.n ? `<p><b>${nf(r.low)}</b> <span class="mut">${pl(r.low, 'ocjena', 'ocjene', 'ocjena')} 1–4★ voditelju</span></p><p><b>${nf(fb.n)}</b> <span class="mut">${pl(fb.n, 'poruka', 'poruke', 'poruka')}</span> · <b>${nf(fb.withPhone)}</b> <span class="mut">s brojem</span> · <b>${nf(fb.done)}</b> <span class="mut">riješeno</span></p>${tp.length ? `<p class="mut">Teme: ${tp.map(([k, n]) => `${esc(TOP[k] || k)} (${n})`).join(', ')}</p>` : ''}` : '<p class="r-empty">Nijedna slabija ocjena ni poruka.</p>'}</div>
        ${box4}
      </div>
    </article>`;
  }

  function render() {
    const V = D.venues;
    const T = { open: sum(V, v => v.total.open), table: sum(V, v => v.total.table), review: sum(V, v => v.total.review) };
    const r = R(Object.fromEntries([1, 2, 3, 4, 5].map(i => ['r' + i, sum(V, v => v.total['r' + i])])));
    const acked = sum(V, v => v.offers.acked);
    const off = { n: sum(V, v => v.offers.n), avg: acked ? sum(V, v => (v.offers.avgAck || 0) * v.offers.acked) / acked : null };
    const fb = { rated: sum(V, v => v.feedback.rated), withPhone: sum(V, v => v.feedback.withPhone), done: sum(V, v => v.feedback.done), n: sum(V, v => v.feedback.n) };
    const gN = V.map(v => ({ v, now: gNow(v.google, D.to) })).filter(x => x.now);
    const gD = sum(gN, x => x.now.count - x.v.google.base.count);
    const from = D.from, to = D.to;
    $('#h1').textContent = `Izvještaj · ${mName(D.month)}`;
    $('#sub').textContent = `${+from.slice(8)}.–${dm(to)}${to.slice(0, 4)}. · Q Club, Kafanica, Bure Bar i Brooklyn${D.partial ? ' · mjesec je u tijeku' : ''}`;
    document.title = `BHT izvještaj · ${mName(D.month)}`;
    const mo = $('#mo');
    mo.innerHTML = D.months.slice().reverse().map(m => `<option value="${m}"${m === D.month ? ' selected' : ''}>${mName(m)}</option>`).join('');
    const kp = [
      [nf(T.open), 'otvaranja cjenika', `${nf(T.table)} dodirom kartice na stolu`],
      [f1(r.avg), 'prosječna ocjena gostiju', `${nf(r.c)} ${pl(r.c, 'ocjena', 'ocjene', 'ocjena')} u cjeniku`],
      [nf(r.n[4]), 'ocjena 5★ → Google', `Google recenzija otvorena ${nf(T.review)} ${pl(T.review, 'put', 'puta', 'puta')}`],
      [nf(r.low), 'slabijih ocjena → voditelji', `${nf(fb.n)} ${pl(fb.n, 'poruka', 'poruke', 'poruka')} · ${nf(fb.done)} riješeno`],
      [nf(off.n), 'ponuda za stol', off.n ? `prosječno ${mmss(off.avg)} do slanja konobara` : 'Q Club, Kafanica i Bure Bar'],
      [gN.length ? `${gD >= 0 ? '+' : '−'}${nf(Math.abs(gD))}` : '—', 'novih Google recenzija', gN.length ? `od ${dm(V[0].google.base.date)}, ${gN.length} od 4 lokala očitano` : 'čeka prvo očitanje']
    ];
    $('#rep').innerHTML = `
      <div class="kp r-kp">${kp.map(([b, s, e]) => `<div><b>${b}</b><span>${s}</span><em>${e}</em></div>`).join('')}</div>
      <div class="r-sec"><h2>Ukratko</h2></div>
      <div class="r-card"><ul class="r-sum">${insights(V, T, r, off, fb).map(x => `<li>${x}</li>`).join('')}</ul></div>
      <div class="r-sec"><h2>Google recenzije</h2><span>polazno stanje i zadnje očitanje</span></div>
      ${googleSec(V)}
      <div class="r-sec"><h2>Otvaranja cjenika po danu</h2><span>sva četiri lokala zajedno</span></div>
      <div class="r-card">${bars(V[0].days.map((d, i) => ({ date: d.date, n: sum(V, v => v.days[i].open) })), d => d.n, { unit: 'otvaranja', label: 'Otvaranja cjenika po danu, sva četiri lokala' })}
        <div class="r-legend"><span><i></i>petak i subota</span><span><i class="lo"></i>ostali dani</span></div></div>
      <div class="r-sec"><h2>Po lokalima</h2></div>
      <div class="r-vg">${V.map(venueCard).join('')}</div>`;
    const gen = new Date(D.generatedAt);
    $('#foot').innerHTML = `Izvještaj je složen iz podataka sustava za ${+from.slice(8)}.–${dm(to)}${to.slice(0, 4)}. Ocjene i otvaranja bilježe se samo u digitalnom cjeniku; Google recenzije su s Google karte. Pripremio TipTap · tiptapreviews.com · ${gen.toLocaleDateString('hr-HR')} u ${gen.toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}`;
    document.querySelectorAll('form[data-gv]').forEach(f => f.onsubmit = async e => {
      e.preventDefault();
      const b = f.querySelector('button'); b.disabled = true;
      try { await TT.api('/group/google', { root: true, admin: true, body: { venue: f.dataset.gv, rating: f.rating.value, count: f.count.value } }); load(D.month); }
      catch (err) { b.disabled = false; alert('Upišite ocjenu (npr. 4,3) i broj recenzija.'); }
    });
  }

  async function load(m) {
    try {
      D = await TT.api('/group/report' + (m ? '?month=' + encodeURIComponent(m) : ''), { root: true, admin: true });
      render();
    } catch (e) {
      if (e && (e.status === 401 || e.status === 429)) { TT.setPin(null, ''); show(false); $('#le').textContent = e.status === 429 ? 'Previše pogrešnih pokušaja — pokušajte ponovno za 15 minuta.' : 'Upišite PIN direktora.'; return; }
      $('#rep').innerHTML = `<div class="r-load">Izvještaj se nije učitao. Provjerite internet i pokušajte ponovno.</div>`;
    }
  }
  function show(on) { $('#app').hidden = !on; $('#login').hidden = on; }
  $('#lf').onsubmit = async e => {
    e.preventDefault(); const p = $('#pin').value.trim();
    try { await TT.api('/group/login', { root: true, admin: true, pin: p }); TT.setPin(null, p); show(true); load(q.get('m') || ''); }
    catch (err) { $('#le').textContent = err && err.error === 'locked' ? 'Previše pogrešnih pokušaja — pokušajte ponovno za 15 minuta.' : err && err.status === 401 ? 'Pogrešan PIN.' : 'Nema veze sa serverom.'; }
  };
  $('#mo').onchange = e => { const m = e.target.value; try { const u = new URL(location.href); u.searchParams.set('m', m); history.replaceState(null, '', u); } catch (er) { } $('#rep').innerHTML = '<div class="r-load">Učitavam izvještaj…</div>'; load(m); };
  $('#pr').onclick = () => window.print();
  $('#back').onclick = () => { location.href = '/v/grupa/'; };
  if (TT.pin(null)) { show(true); load(q.get('m') || ''); } else show(false);
})();
