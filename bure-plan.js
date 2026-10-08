/* Bure Bar — crtanje tlocrta (SVG). Koristi ga i stranica za goste i admin. */
(function (g) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a = {}, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };

  function defs(svg) {
    const d = el('defs', {}, svg);
    d.innerHTML = `
      <pattern id="pl-wood" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#3a2716"/><path d="M0 4h18M0 11h18M0 16h18" stroke="#4a331d" stroke-width="2"/></pattern>
      <pattern id="pl-floor" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#1b1714"/><path d="M0 0h40v40" fill="none" stroke="#221d18" stroke-width="2"/></pattern>
      <radialGradient id="pl-glow"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
      <linearGradient id="pl-barrel" x1="0" x2="1"><stop offset="0" stop-color="#5a3a1c"/><stop offset=".5" stop-color="#8a5a2b"/><stop offset="1" stop-color="#5a3a1c"/></linearGradient>`;
  }

  function tableShape(t, grp) {
    const hit = { class: 'pl-hit', fill: 'transparent' };
    if (t.shape === 'round' || t.shape === 'barrel') {
      const r = t.r || 30;
      el('circle', { cx: t.x, cy: t.y, r: r + 26, fill: 'url(#pl-glow)', class: 'pl-halo' }, grp);
      if (t.shape === 'barrel') {
        el('circle', { cx: t.x, cy: t.y, r, class: 'pl-top', fill: 'url(#pl-barrel)' }, grp);
        el('circle', { cx: t.x, cy: t.y, r: r - 6, fill: 'none', stroke: '#2a1a0c', 'stroke-width': 3, opacity: .7 }, grp);
        el('circle', { cx: t.x, cy: t.y, r: r - 14, fill: 'none', stroke: '#2a1a0c', 'stroke-width': 2, opacity: .5 }, grp);
      } else el('circle', { cx: t.x, cy: t.y, r, class: 'pl-top' }, grp);
      el('circle', { cx: t.x, cy: t.y, r, class: 'pl-ring', fill: 'none' }, grp);
      el('circle', { cx: t.x, cy: t.y, r: r + 16, ...hit }, grp);
      return { cx: t.x, cy: t.y, rr: r };
    }
    const w = t.w || 100, h = t.h || 60, x = t.x - w / 2, y = t.y - h / 2;
    el('rect', { x: x - 26, y: y - 26, width: w + 52, height: h + 52, rx: 40, fill: 'url(#pl-glow)', class: 'pl-halo' }, grp);
    if (t.shape === 'booth') {
      el('path', { d: `M${x} ${y + h} V${y + 10} Q${x} ${y} ${x + 10} ${y} H${x + w - 10} Q${x + w} ${y} ${x + w} ${y + 10} V${y + h}`, fill: 'none', stroke: '#6b2f2f', 'stroke-width': 18, 'stroke-linecap': 'round', class: 'pl-sofa' }, grp);
      el('rect', { x: x + 22, y: y + 24, width: w - 44, height: h - 40, rx: 8, class: 'pl-top' }, grp);
      el('rect', { x: x + 22, y: y + 24, width: w - 44, height: h - 40, rx: 8, class: 'pl-ring', fill: 'none' }, grp);
    } else {
      el('rect', { x, y, width: w, height: h, rx: 10, class: 'pl-top' }, grp);
      el('rect', { x, y, width: w, height: h, rx: 10, class: 'pl-ring', fill: 'none' }, grp);
    }
    el('rect', { x: x - 14, y: y - 14, width: w + 28, height: h + 28, rx: 16, ...hit }, grp);
    return { cx: t.x, cy: t.y + (t.shape === 'booth' ? 4 : 0), rr: Math.min(w, h) / 2 };
  }

  /**
   * render(svg, cfg, opts)
   * opts.state(t) → CSS klasa ('free'|'busy'|'nofit'|'sel'|'pending'|'confirmed'|'seated'|'')
   * opts.sub(t)   → mali tekst ispod oznake (npr. "2–4" ili "21:00")
   * opts.onTap(t), opts.editable, opts.onMove(obj, x, y), opts.onSelectObj(obj)
   */
  function render(svg, cfg, opts = {}) {
    const P = cfg.plan || { w: 1000, h: 640, walls: [] };
    svg.innerHTML = '';
    svg.setAttribute('viewBox', `0 0 ${P.w} ${P.h}`);
    svg.classList.add('plan');
    defs(svg);
    el('rect', { x: 0, y: 0, width: P.w, height: P.h, rx: 24, fill: 'url(#pl-floor)' }, svg);
    el('rect', { x: 6, y: 6, width: P.w - 12, height: P.h - 12, rx: 20, fill: 'none', stroke: '#3a3128', 'stroke-width': 6 }, svg);
    (P.walls || []).forEach((w, i) => {
      const gg = el('g', { class: 'pl-wall pl-' + w.type, 'data-wall': i }, svg);
      el('rect', { x: w.x, y: w.y, width: w.w, height: w.h, rx: 10, fill: w.type === 'bar' ? 'url(#pl-wood)' : w.type === 'dj' ? '#2b2335' : w.type === 'door' ? '#2a3a2a' : '#262626', stroke: w.type === 'bar' ? '#c9a24b' : '#4a4038', 'stroke-width': 2 }, gg);
      const vert = w.h > w.w * 1.6;
      const tx = el('text', { x: w.x + w.w / 2, y: w.y + w.h / 2, class: 'pl-wlabel', 'text-anchor': 'middle', 'dominant-baseline': 'central', transform: vert ? `rotate(-90 ${w.x + w.w / 2} ${w.y + w.h / 2})` : '' }, gg);
      tx.textContent = w.label || '';
      if (opts.editable) bindDrag(svg, gg, w, opts, true);
    });
    const byId = {};
    cfg.tables.forEach(t => {
      const cls = (opts.state ? opts.state(t) : 'free') || '';
      const gg = el('g', { class: 'pl-t ' + cls + (t.vip ? ' vip' : ''), 'data-id': t.id, tabindex: opts.onTap ? 0 : -1, role: opts.onTap ? 'button' : 'img', 'aria-label': `${t.id} ${t.min}-${t.max}` }, svg);
      const c = tableShape(t, gg);
      const lb = el('text', { x: c.cx, y: c.cy - 3, class: 'pl-label', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, gg); lb.textContent = t.id;
      const sub = opts.sub ? opts.sub(t) : `${t.min}–${t.max}`;
      if (sub) { const s = el('text', { x: c.cx, y: c.cy + 17, class: 'pl-sub', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, gg); s.textContent = sub; }
      if (t.vip) { const v = el('text', { x: c.cx, y: c.cy - c.rr - 12, class: 'pl-vip', 'text-anchor': 'middle' }, gg); v.textContent = '★ VIP'; }
      if (opts.editable) bindDrag(svg, gg, t, opts, false);
      else if (opts.onTap) {
        gg.addEventListener('click', () => opts.onTap(t));
        gg.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opts.onTap(t); } });
      }
      byId[t.id] = gg;
    });
    return byId;
  }

  function svgPoint(svg, e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }
  function bindDrag(svg, gg, obj, opts, isWall) {
    gg.style.cursor = 'grab'; gg.style.touchAction = 'none';
    let start = null;
    gg.addEventListener('pointerdown', e => {
      e.preventDefault(); gg.setPointerCapture(e.pointerId);
      const p = svgPoint(svg, e); start = { px: p.x, py: p.y, x: obj.x, y: obj.y, moved: false };
      opts.onSelectObj && opts.onSelectObj(obj, isWall);
    });
    gg.addEventListener('pointermove', e => {
      if (!start) return; const p = svgPoint(svg, e);
      const dx = p.x - start.px, dy = p.y - start.py; if (Math.abs(dx) + Math.abs(dy) > 3) start.moved = true;
      const nx = Math.round((start.x + dx) / 10) * 10, ny = Math.round((start.y + dy) / 10) * 10;
      gg.setAttribute('transform', `translate(${nx - start.x} ${ny - start.y})`); start.nx = nx; start.ny = ny;
    });
    const end = () => { if (!start) return; if (start.moved && start.nx != null) { obj.x = start.nx; obj.y = start.ny; opts.onMove && opts.onMove(obj, isWall); } start = null; };
    gg.addEventListener('pointerup', end); gg.addEventListener('pointercancel', end);
  }

  g.BurePlan = { render };
})(window);
