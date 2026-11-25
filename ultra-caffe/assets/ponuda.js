/* =====================================================================
   TipTap · ponuda za mirne sate (zajedničko za meni gosta i upravu)
   Vlasnik u upravi izabere dane, sate, lokal i ponudu; gost je u meniju
   vidi samo u tom terminu. U demou se čuva na ovom uređaju (localStorage),
   u pravom sistemu ista struktura ide u bazu lokala.
   Za novi lokal ne menja se ništa: stavke ponude su id-jevi iz data.js.

   ponuda = { id, sr, en, items: [id…], price, was, days: [0=pon … 6=ned],
              from, to (sati), locs: [lokal…], created }
   ===================================================================== */
(function () {
'use strict';
const KEY = (window.TT_PREFIX || 'uc_') + 'offer';
const WD = { sr: ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'], en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] };
const hourOf = d => d.getHours() + d.getMinutes() / 60;
const wdOf = d => (d.getDay() + 6) % 7;

function get() {
  try { const o = JSON.parse(localStorage.getItem(KEY) || 'null'); return o && Array.isArray(o.items) && o.items.length && Array.isArray(o.days) ? o : null; } catch (e) { return null; }
}
function set(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* privatni režim */ } }
function clear() { try { localStorage.removeItem(KEY); } catch (e) { } }

// da li gost u lokalu `loc` sada vidi ponudu
function live(o, now = new Date(), loc) {
  if (!o) return false;
  if (loc && o.locs && o.locs.length && !o.locs.includes(loc)) return false;
  const h = hourOf(now);
  return o.days.includes(wdOf(now)) && h >= o.from && h < o.to;
}
function minsLeft(o, now = new Date()) { return Math.max(0, Math.round((o.to - hourOf(now)) * 60)); }
// sledeći početak ponude: { days: 0 = danas, 1 = sutra…, h }
function next(o, now = new Date()) {
  if (!o || !o.days.length) return null;
  for (let k = 0; k < 8; k++) { const wd = (wdOf(now) + k) % 7; if (!o.days.includes(wd)) continue; if (k === 0 && hourOf(now) >= o.from) continue; return { days: k, h: o.from, wd }; }
  return null;
}
// [0,1,2,3] → „Pon–Čet”; [0,2,4] → „Pon, Sre, Pet”; svi → „Svaki dan”
function daysLabel(days, lang = 'sr') {
  const W = WD[lang] || WD.sr, d = days.slice().sort((a, b) => a - b);
  if (d.length === 7) return lang === 'en' ? 'Every day' : 'Svaki dan';
  const runs = []; d.forEach(x => { const r = runs[runs.length - 1]; if (r && x === r[1] + 1) r[1] = x; else runs.push([x, x]); });
  return runs.map(([a, b]) => a === b ? W[a] : b === a + 1 ? `${W[a]}, ${W[b]}` : `${W[a]}–${W[b]}`).join(', ');
}
const hh = h => String(Math.floor(h) % 24).padStart(2, '0');
const winLabel = (o, lang = 'sr') => `${daysLabel(o.days, lang)} · ${hh(o.from)}–${hh(o.to)}h`;
// predlog cene: oko 20 % ispod redovne, okrugla cena (…90 ili …50) između 15 i 30 % popusta
function suggestPrice(sum) {
  const goal = sum * .8, base = Math.floor(goal / 100) * 100;
  const ok = [base + 90, base - 10, base + 50].filter(p => p > 0 && p <= sum * .85 && p >= sum * .7).sort((a, b) => Math.abs(a - goal) - Math.abs(b - goal));
  return ok.length ? ok[0] : Math.max(10, Math.round(goal / 10) * 10);
}

const nf = n => Math.round(n).toLocaleString('sr-RS');
const E = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function leftLabel(mins, lang) { const h = Math.floor(mins / 60), m = mins % 60, tx = h ? `${h} h${m ? ` ${m} min` : ''}` : `${m} min`; return lang === 'en' ? `${tx} left` : `još ${tx}`; }
// kartica ponude kako je gost vidi (meni gosta i pregled u upravi)
// x = { lang, parts: [{ name, thumb }], now, preview, add }
function cardHTML(o, x) {
  const en = x.lang === 'en', now = x.now || new Date(), off = o.was > o.price ? Math.round((1 - o.price / o.was) * 100) : 0;
  const top = x.preview ? `${en ? 'Preview' : 'Pregled'} · ${winLabel(o, x.lang)}` : `${en ? 'Today only until' : 'Samo danas do'} ${hh(o.to)}h`;
  return `<section class="offer${x.preview ? ' pv' : ''}" aria-label="${E(en ? 'Offer' : 'Ponuda')}">
   <div class="of-top"><span class="of-live"><i></i>${E(top)}</span>${x.preview ? '' : `<span class="of-left num">${E(leftLabel(minsLeft(o, now), x.lang))}</span>`}</div>
   <div class="of-main"><div class="of-th">${x.parts.map((p, i) => `${i ? '<span class="of-plus" aria-hidden="true">+</span>' : ''}<button type="button" class="of-it" data-oi="${i}" aria-label="${E(p.name)}">${p.thumb}</button>`).join('')}</div>
    <div class="of-tx"><h2>${E(en && o.en ? o.en : o.sr)}</h2><p>${x.parts.map(p => E(p.name)).join(' + ')}</p></div></div>
   <div class="of-buy"><span class="of-pr num">${nf(o.price)}<small>RSD</small></span>${off ? `<s class="num">${nf(o.was)}</s><span class="of-pct num">−${off}%</span>` : ''}<button type="button" class="btn btn-m btn-s of-add">${E(x.add)}</button></div>
  </section>`;
}

window.TT_OFFER = { KEY, WD, get, set, clear, live, minsLeft, next, daysLabel, winLabel, hh, suggestPrice, cardHTML, leftLabel };
})();
