/* global VLA */
(() => {
  "use strict";
  if (!window.VLA) {
    document.body.insertAdjacentHTML("afterbegin", "<p style='padding:1rem;color:#9d2c2c'>No se pudo cargar el contenido de práctica.</p>");
    return;
  }

  const {
    ITEMS, PATTERNS, METHOD_STEPS, WHY_OPENER_ES,
    EMAIL_PROMPTS, EMAIL_COACH_TIPS_ES, EMAIL_WORD_TARGET, EMAIL_WORD_OVER,
    drawPublicSet, presentItem, itemsFromIds, estimateBand, gradeEmail, wordCount, capFirst,
  } = VLA;

  const TARGET = 420;
  const EMAIL_LIMIT = 420;
  const TREND_KEY = "vla-escritura-bas-trend";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function clock(s) {
    const a = Math.abs(Math.round(s));
    return `${s < 0 ? "-" : ""}${Math.floor(a / 60)}:${String(a % 60).padStart(2, "0")}`;
  }

  function modeFromUrl() {
    const q = new URLSearchParams(location.search);
    return q.get("modo") === "examen" ? "exam" : "practice";
  }

  function setMode(mode, restart) {
    const url = new URL(location.href);
    url.searchParams.set("modo", mode === "exam" ? "examen" : "practica");
    history.replaceState({}, "", url);
    if (restart) startBas();
    else renderModeButtons();
  }

  function patternInfo(id) {
    return PATTERNS.find((p) => p.id === id);
  }

  function loadTrend() {
    try {
      const raw = localStorage.getItem(TREND_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveTrend(trend) {
    try { localStorage.setItem(TREND_KEY, JSON.stringify(trend)); } catch { /* quota */ }
  }

  /* ---------- static sections ---------- */
  function renderStatic() {
    $$("[data-word-target]").forEach((el) => { el.textContent = String(EMAIL_WORD_TARGET); });
    const why = $("#why-openers");
    why.innerHTML = `
      <div class="card sm" style="display:flex;flex-direction:column;gap:.5rem">
        ${WHY_OPENER_ES.map((t) => `<p>${esc(t)}</p>`).join("")}
      </div>
      <div class="grid-3" style="margin-top:.75rem">
        ${METHOD_STEPS.map((s) => `<div class="card"><h3>${esc(s.titleEs)}</h3><p class="sm" style="margin-top:.25rem">${esc(s.bodyEs)}</p></div>`).join("")}
      </div>
      <div class="grid-2 lg-2" style="margin-top:.75rem">
        ${PATTERNS.map((p) => `
          <div class="card">
            <div id="o-${esc(p.id)}" style="scroll-margin-top:6rem"></div>
            <div class="row" style="align-items:center">
              <h3>${esc(p.titleEs)}</h3>
              ${p.weak ? `<span class="badge bad">Prioridad</span>` : ""}
            </div>
            <p class="sm" style="margin-top:.25rem">${esc(p.opener.ruleEs)}</p>
            <ul class="plain" style="list-style:none;padding-left:0;margin-top:.5rem;display:flex;flex-direction:column;gap:.5rem">
              ${p.opener.examples.map((ex) => `
                <li class="example">
                  <p><span class="good">✓ </span><strong lang="en">${esc(ex.good)}</strong></p>
                  <p><span class="bad">✗ </span><span lang="en" class="strike">${esc(ex.bad)}</span></p>
                  <p class="why">${esc(ex.whyEs)}</p>
                </li>`).join("")}
            </ul>
            <a class="fine underline" href="#p-${esc(p.id)}" style="display:inline-block;margin-top:.5rem;font-weight:600">Ver la tarjeta completa →</a>
          </div>`).join("")}
      </div>`;

    const cards = $("#grammar-cards");
    cards.innerHTML = PATTERNS.map((p) => {
      const n = ITEMS.filter((i) => i.pattern === p.id).length;
      return `
        <div class="card">
          <div id="p-${esc(p.id)}" style="scroll-margin-top:6rem"></div>
          <div class="row" style="align-items:center">
            <h3>${esc(p.titleEs)}</h3>
            <span class="badge">${esc(p.name)}</span>
            ${p.weak ? `<span class="badge bad">Prioridad</span>` : ""}
            <span class="badge plain">${n} ítems</span>
          </div>
          <p class="sm" style="margin-top:.5rem">${esc(p.explainEs)}</p>
          <p class="formula" lang="en">${esc(p.formula)}</p>
          <p class="label-caps">Ejemplos</p>
          <ul class="plain sm" lang="en">${p.examples.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
          <p class="label-caps">Errores típicos de hispanohablantes</p>
          <ul class="plain sm">${p.mistakesEs.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
          <p class="label-caps">Palabras señal</p>
          <div class="chips">${p.signals.map((s) => `<span class="badge">${esc(s)}</span>`).join("")}</div>
          <p class="sm" style="margin-top:.75rem"><strong>Distractor típico:</strong> ${esc(p.distractorEs)}</p>
          <a class="fine underline" href="#o-${esc(p.id)}" style="display:inline-block;margin-top:.5rem;font-weight:600">Cómo empezar esta oración →</a>
        </div>`;
    }).join("");

    $("#credits").textContent =
      `${ITEMS.length} oraciones originales de Build a Sentence y ${EMAIL_PROMPTS.length} consignas originales de Write an Email. Contenido de Vancouver Language Academy; no es material de ETS ni de otras plataformas.`;
  }

  function renderModeButtons() {
    const mode = modeFromUrl();
    const box = $("#bas-mode-btns");
    box.innerHTML = `
      <button type="button" class="btn sm ${mode === "practice" ? "blue" : "outline"}" data-set-mode="practice">Práctica con pistas</button>
      <button type="button" class="btn sm ${mode === "exam" ? "" : "outline"}" data-set-mode="exam">Modo examen</button>`;
    $$("[data-set-mode]", box).forEach((b) => {
      b.addEventListener("click", () => setMode(b.getAttribute("data-set-mode"), true));
    });
  }

  /* ---------- Build a Sentence ---------- */
  const bas = {
    items: [],
    states: [],
    current: 0,
    selectedSlot: null,
    startedAt: 0,
    now: 0,
    phase: "loading",
    retryRound: false,
    finalSeconds: 0,
    summary: null,
    timer: null,
  };

  function wordsOf(state, item) {
    return state.filled.map((f) => (f === null ? null : item.bank[f]));
  }
  function isCorrect(state, item) {
    return wordsOf(state, item).every((w, i) => w === item.answer[i]);
  }
  function renderSentence(segments, words) {
    const raw = segments.map((s) => (s.kind === "fixed" ? s.text : words[s.index] ?? "___")).join("");
    return raw.replace(/\s+/g, " ").trim().replace(/(^|[.!?]\s+)([a-z])/g, (_m, p, c) => p + c.toUpperCase());
  }
  function lockForExam(state, item) {
    if (state.firstAnswer) return state;
    const ok = isCorrect(state, item);
    return { ...state, firstCorrect: ok, firstAnswer: wordsOf(state, item).map((w) => w ?? ""), checked: true };
  }

  function startBas(ids) {
    if (bas.timer) { clearInterval(bas.timer); bas.timer = null; }
    bas.phase = "loading";
    renderBas();
    const source = ids && ids.length ? itemsFromIds(ids) : drawPublicSet();
    bas.items = source.map(presentItem);
    bas.states = bas.items.map((i) => ({ filled: i.answer.map(() => null), checked: false, firstCorrect: null, firstAnswer: null, tries: 0 }));
    bas.current = 0;
    bas.selectedSlot = null;
    bas.startedAt = Date.now();
    bas.now = Date.now();
    bas.retryRound = !!(ids && ids.length);
    bas.finalSeconds = 0;
    bas.summary = null;
    bas.phase = "run";
    bas.timer = setInterval(() => { if (bas.phase === "run") { bas.now = Date.now(); const t = $("[data-testid=bas-timer]"); if (t) updateBasTimer(t); } }, 500);
    renderBas();
  }

  function updateBasTimer(el) {
    const elapsed = (bas.now - bas.startedAt) / 1000;
    const left = TARGET - elapsed;
    el.textContent = clock(left);
    const box = el.closest(".timer");
    if (box) {
      box.classList.toggle("warn", left < 60 && left >= 0);
      box.classList.toggle("over", left < 0);
      const lab = box.querySelector(".l");
      if (lab) lab.textContent = left < 0 ? "tiempo extra" : "restante (≈7:00 por 10)";
    }
  }

  function updateState(fn) {
    bas.states = bas.states.map((s, i) => (i === bas.current ? fn(s) : s));
  }

  function place(chip, slot) {
    const st = bas.states[bas.current];
    if (!st || st.checked) return;
    updateState((s) => {
      const filled = s.filled.map((f) => (f === chip ? null : f));
      const target = slot !== undefined
        ? slot
        : (bas.selectedSlot !== null && filled[bas.selectedSlot] === null ? bas.selectedSlot : filled.indexOf(null));
      if (target < 0) return s;
      filled[target] = chip;
      return { ...s, filled };
    });
    bas.selectedSlot = null;
    renderBas();
  }

  function clearSlot(slot) {
    const st = bas.states[bas.current];
    if (!st || st.checked) return;
    if (st.filled[slot] === null) {
      bas.selectedSlot = slot;
      renderBas();
      return;
    }
    updateState((s) => ({ ...s, filled: s.filled.map((f, i) => (i === slot ? null : f)) }));
    renderBas();
  }

  function checkItem() {
    const item = bas.items[bas.current];
    const st = bas.states[bas.current];
    if (!item || !st) return;
    const ok = isCorrect(st, item);
    updateState((s) => ({
      ...s,
      checked: true,
      tries: s.tries + 1,
      firstCorrect: s.firstCorrect ?? ok,
      firstAnswer: s.firstAnswer ?? wordsOf(s, item),
    }));
    renderBas();
  }

  function retryItem() {
    updateState((s) => ({ ...s, checked: false, filled: s.filled.map(() => null) }));
    bas.selectedSlot = null;
    renderBas();
  }

  function nextItem() {
    const exam = modeFromUrl() === "exam";
    if (exam) {
      bas.states = bas.states.map((s, i) => (i === bas.current ? lockForExam(s, bas.items[i]) : s));
    }
    bas.selectedSlot = null;
    if (bas.current < bas.items.length - 1) bas.current += 1;
    renderBas();
  }

  function finishBas() {
    bas.states = bas.states.map((s, i) => lockForExam(s, bas.items[i]));
    const seconds = (Date.now() - bas.startedAt) / 1000;
    bas.finalSeconds = seconds;
    if (bas.timer) { clearInterval(bas.timer); bas.timer = null; }
    if (bas.retryRound) {
      bas.phase = "done";
      renderBas();
      return;
    }
    const mode = modeFromUrl();
    const graded = bas.items.map((it, i) => ({
      item: { difficulty: it.difficulty },
      correct: !!bas.states[i].firstCorrect,
      itemId: it.id,
      pattern: it.pattern,
    }));
    const score = graded.filter((g) => g.correct).length;
    const band = estimateBand(graded, seconds);
    const saved = { score, total: bas.items.length, band, seconds: Math.round(seconds), results: graded.map((g) => ({ itemId: g.itemId, pattern: g.pattern, correct: g.correct })) };
    let trend = loadTrend();
    const entry = { id: `local-${Date.now()}`, mode, score, total: bas.items.length, seconds: Math.round(seconds), band, created_at: new Date().toISOString() };
    trend = [...trend, entry].slice(-8);
    saveTrend(trend);
    const statsMap = new Map();
    for (const g of graded) {
      const s = statsMap.get(g.pattern) ?? { pattern: g.pattern, total: 0, correct: 0 };
      s.total += 1; if (g.correct) s.correct += 1;
      statsMap.set(g.pattern, s);
    }
    bas.summary = { saved, trend, stats: [...statsMap.values()] };
    bas.phase = "done";
    renderBas();
  }

  function renderBas() {
    const root = $("#bas-root");
    const exam = modeFromUrl() === "exam";
    renderModeButtons();

    if (bas.phase === "loading") {
      root.innerHTML = `<p class="sm muted">Cargando set…</p>`;
      return;
    }
    if (bas.phase === "error") {
      root.innerHTML = `<p class="sm" style="color:var(--bad)">No se pudo cargar el set. Recarga la página.</p>`;
      return;
    }

    if (bas.phase === "done") {
      const results = bas.items.map((it, i) => ({ it, ok: !!bas.states[i].firstCorrect, ans: bas.states[i].firstAnswer ?? [] }));
      const score = results.filter((r) => r.ok).length;
      const byPattern = new Map();
      for (const r of results) {
        const p = byPattern.get(r.it.pattern) ?? { total: 0, correct: 0 };
        p.total += 1; if (r.ok) p.correct += 1;
        byPattern.set(r.it.pattern, p);
      }
      const review = [...byPattern.entries()].filter(([, v]) => v.correct < v.total).map(([k]) => k);
      const wrongIds = results.filter((r) => !r.ok).map((r) => r.it.id);
      const trend = bas.summary?.trend ?? loadTrend();
      const band = bas.retryRound ? null : (bas.summary?.saved.band ?? estimateBand(results.map((r) => ({ item: { difficulty: r.it.difficulty }, correct: r.ok })), bas.finalSeconds));

      root.innerHTML = `
        <div data-testid="bas-summary" style="display:flex;flex-direction:column;gap:1rem">
          <section class="card">
            <p class="kicker">${bas.retryRound ? "Repaso de falladas (no cuenta en estadísticas)" : exam ? "Resultado · modo examen" : "Resultado · práctica"}</p>
            <div class="stat-row">
              <div><p class="score-xl tabular" data-testid="bas-score">${score}/${bas.items.length}</p><p class="fine muted">aciertos al primer intento</p></div>
              <div><p class="score-lg tabular">${esc(clock(bas.finalSeconds))}</p><p class="fine muted">tiempo usado (meta ≈ 7:00)</p></div>
              ${band != null ? `<div><p class="score-lg tabular" data-testid="bas-band">${band.toFixed(1)}</p><p class="fine muted">banda Writing estimada (1–6) · referencia, no oficial</p></div>` : ""}
            </div>
          </section>
          <section class="card">
            <h3>Acierto por estructura</h3>
            <table class="stats"><tbody>
              ${[...byPattern.entries()].map(([k, v]) => `
                <tr>
                  <td>${esc(patternInfo(k)?.titleEs ?? k)}</td>
                  <td class="bar"><div class="bar-track"><div class="bar-fill ${v.correct === v.total ? "full" : ""}" style="width:${(100 * v.correct) / v.total}%"></div></div></td>
                  <td class="num tabular">${v.correct}/${v.total}</td>
                </tr>`).join("")}
            </tbody></table>
          </section>
          ${review.length ? `
          <section class="card" style="border-color:rgba(157,44,44,.4)">
            <h3>Estructuras para repasar</h3>
            <ul class="plain sm">
              ${review.map((k) => `<li><strong>${esc(patternInfo(k)?.titleEs ?? k)}</strong> · <a class="underline" href="#p-${esc(k)}">tarjeta</a> · <a class="underline" href="#o-${esc(k)}">cómo empezar la oración</a></li>`).join("")}
            </ul>
          </section>` : ""}
          <section class="card">
            <h3>Revisión ítem por ítem</h3>
            <ol class="review sm" style="margin-top:.5rem">
              ${results.map((r, i) => `
                <li class="${r.ok ? "ok" : "no"}" data-testid="bas-review-row">
                  <p><strong>${i + 1}. ${r.ok ? "✓" : "✗"}</strong> <span lang="en">${esc(r.it.sentence)}</span></p>
                  ${!r.ok ? `<p class="fine muted">Tu respuesta: <span lang="en">${esc(renderSentence(r.it.segments, r.ans.map((w) => w || null)))}</span></p>` : ""}
                  ${!r.ok ? `<p class="fine">${esc(r.it.explainEs)} <a class="underline" href="#o-${esc(r.it.pattern)}">Tip de inicio</a></p>` : ""}
                </li>`).join("")}
            </ol>
          </section>
          <section class="card">
            <h3>Tendencia (últimos sets)</h3>
            ${trend.length ? `
              <div class="trend" data-testid="bas-trend">
                ${trend.map((t) => `
                  <div class="col">
                    <div class="track"><div class="fill ${t.mode === "exam" ? "exam" : ""}" style="height:${(100 * t.score) / Math.max(1, t.total)}%"></div></div>
                    <span class="tabular">${t.score}/${t.total}</span>
                    <span>${Number(t.band).toFixed(1)}</span>
                  </div>`).join("")}
              </div>` : `<p class="sm muted">Aún no hay sets en este navegador. El resultado no se guarda en una cuenta.</p>`}
            <p class="fine muted" style="margin-top:.5rem">Azul = práctica · azul oscuro = modo examen. Debajo: aciertos y banda estimada. Se guarda solo en este navegador.</p>
          </section>
          <div class="actions">
            ${wrongIds.length ? `<button type="button" class="btn gold" data-action="retry-wrong" data-testid="bas-retry-wrong">Repetir las falladas (${wrongIds.length})</button>` : ""}
            <button type="button" class="btn blue" data-action="new-set" data-testid="bas-new-set">Nuevo set de 10</button>
            <a class="btn outline" href="#inicio">Volver a la guía</a>
          </div>
        </div>`;
      const retry = $("[data-action=retry-wrong]", root);
      if (retry) retry.addEventListener("click", () => startBas(wrongIds));
      const neu = $("[data-action=new-set]", root);
      if (neu) neu.addEventListener("click", () => startBas());
      return;
    }

    const item = bas.items[bas.current];
    const st = bas.states[bas.current];
    if (!item || !st) { root.innerHTML = ""; return; }
    const filledWords = wordsOf(st, item);
    const used = new Set(st.filled.filter((f) => f !== null));
    const complete = st.filled.every((f) => f !== null);
    const ok = st.checked && isCorrect(st, item);
    const p = patternInfo(item.pattern);
    const elapsed = (bas.now - bas.startedAt) / 1000;
    const left = TARGET - elapsed;

    root.innerHTML = `
      <div data-testid="bas-sim" data-item="${esc(item.id)}" style="display:flex;flex-direction:column;gap:1rem">
        <div class="row between" style="align-items:center">
          <div>
            <p class="kicker">Build a Sentence · ${exam ? "modo examen" : "práctica con pistas"}${bas.retryRound ? " · repaso" : ""}</p>
            <h3 style="font-size:1.5rem;margin-top:.15rem">Ítem ${bas.current + 1} de ${bas.items.length}</h3>
          </div>
          <div class="timer ${left < 0 ? "over" : left < 60 ? "warn" : ""}">
            <p class="t tabular" data-testid="bas-timer">${esc(clock(left))}</p>
            <p class="l">${left < 0 ? "tiempo extra" : "restante (≈7:00 por 10)"}</p>
          </div>
        </div>
        <div class="progress">
          ${bas.items.map((_, i) => {
            let cls = "";
            if (i === bas.current) cls = "on";
            else if (bas.states[i].checked) cls = exam ? "exam-done" : (bas.states[i].firstCorrect ? "ok" : "no");
            return `<span class="${cls}"></span>`;
          }).join("")}
        </div>
        <section class="card">
          <p class="fine" style="font-weight:600;color:var(--muted)">Make an appropriate sentence.</p>
          <p class="prompt-bubble" lang="en">${esc(item.prompt)}</p>
          <div class="template" lang="en" data-testid="bas-template"></div>
          <div class="bank" data-testid="bas-bank"></div>
          ${!exam && !st.checked ? `<details class="hint"><summary>Pista de inicio</summary><p style="margin-top:.25rem">${esc(p?.opener.ruleEs ?? "")}</p></details>` : ""}
          ${!exam && st.checked ? `
            <div class="feedback ${ok ? "ok" : "no"}" data-testid="bas-feedback">
              <p><strong>${ok ? "✓ ¡Correcto!" : "✗ No es correcto."}</strong> <span lang="en">${esc(item.sentence)}</span></p>
              <p style="margin-top:.25rem">${esc(item.explainEs)}</p>
              ${item.distractor ? `<p class="fine" style="margin-top:.25rem">Ficha que sobraba (distractor): <strong lang="en">${esc(item.distractor)}</strong></p>` : ""}
              <p class="fine" style="margin-top:.25rem"><strong>Tip de inicio · ${esc(p?.titleEs ?? "")}:</strong> ${esc(p?.opener.ruleEs ?? "")}</p>
              <p class="fine" style="margin-top:.25rem"><a class="underline" href="#p-${esc(item.pattern)}">Ver tarjeta</a> · <a class="underline" href="#o-${esc(item.pattern)}">Cómo empezar esta oración</a></p>
            </div>` : ""}
        </section>
        <div class="actions" data-bas-actions></div>
      </div>`;

    const template = $("[data-testid=bas-template]", root);
    item.segments.forEach((seg, i) => {
      if (seg.kind === "fixed") {
        const span = document.createElement("span");
        span.style.whiteSpace = "pre-wrap";
        span.textContent = seg.text.trim();
        template.appendChild(span);
        return;
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-testid", "bas-slot");
      const word = filledWords[seg.index];
      const prev = item.segments[i - 1];
      const cap = !!(i === 0 || (prev && prev.kind === "fixed" && /[.!?]\s*$/.test(prev.text ?? "")));
      const shown = word ? (cap ? capFirst(word) : word) : "\u00a0";
      btn.textContent = shown;
      let cls = "slot";
      if (word) cls += " filled";
      if (bas.selectedSlot === seg.index) cls += " selected";
      if (st.checked) cls += word === item.answer[seg.index] ? " right" : " wrong";
      btn.className = cls;
      btn.addEventListener("click", () => clearSlot(seg.index));
      btn.addEventListener("dragover", (e) => e.preventDefault());
      btn.addEventListener("drop", (e) => {
        e.preventDefault();
        const c = Number(e.dataTransfer.getData("text/plain"));
        if (!Number.isNaN(c)) place(c, seg.index);
      });
      template.appendChild(btn);
    });

    const bank = $("[data-testid=bas-bank]", root);
    item.bank.forEach((chip, ci) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.setAttribute("data-testid", "bas-chip");
      btn.setAttribute("data-chip", chip);
      btn.lang = "en";
      btn.textContent = chip;
      btn.disabled = used.has(ci) || st.checked;
      btn.draggable = !used.has(ci) && !st.checked;
      btn.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", String(ci)));
      btn.addEventListener("click", () => place(ci));
      bank.appendChild(btn);
    });

    const actions = $("[data-bas-actions]", root);
    if (!exam && !st.checked) {
      const b = document.createElement("button");
      b.className = "btn blue";
      b.type = "button";
      b.setAttribute("data-testid", "bas-check");
      b.textContent = "Comprobar";
      b.disabled = !complete;
      b.addEventListener("click", checkItem);
      actions.appendChild(b);
    }
    if (!exam && st.checked && !ok) {
      const b = document.createElement("button");
      b.className = "btn gold";
      b.type = "button";
      b.setAttribute("data-testid", "bas-retry-item");
      b.textContent = "Reintentar";
      b.addEventListener("click", retryItem);
      actions.appendChild(b);
    }
    if ((exam || st.checked) && bas.current < bas.items.length - 1) {
      const b = document.createElement("button");
      b.className = "btn";
      b.type = "button";
      b.setAttribute("data-testid", "bas-next");
      b.textContent = "Siguiente";
      b.addEventListener("click", nextItem);
      actions.appendChild(b);
    }
    if ((exam || st.checked) && bas.current === bas.items.length - 1) {
      const b = document.createElement("button");
      b.className = "btn";
      b.type = "button";
      b.setAttribute("data-testid", "bas-finish");
      b.textContent = "Terminar y ver resultado";
      b.addEventListener("click", finishBas);
      actions.appendChild(b);
    }
    const clear = document.createElement("button");
    clear.className = "btn outline";
    clear.type = "button";
    clear.textContent = "Borrar";
    clear.addEventListener("click", () => {
      updateState((s) => (s.checked ? s : { ...s, filled: s.filled.map(() => null) }));
      bas.selectedSlot = null;
      renderBas();
    });
    actions.appendChild(clear);
  }

  /* ---------- Write an Email ---------- */
  const email = {
    id: EMAIL_PROMPTS[0]?.id ?? "",
    text: "",
    grade: null,
    showModel: false,
    startedAt: null,
    elapsed: 0,
    timer: null,
  };

  function promptOf() {
    return EMAIL_PROMPTS.find((p) => p.id === email.id) ?? EMAIL_PROMPTS[0];
  }

  function beginEmailTimer() {
    if (email.startedAt == null) {
      email.startedAt = Date.now();
      if (email.timer) clearInterval(email.timer);
      email.timer = setInterval(() => {
        if (email.startedAt && !email.grade) {
          const el = $("[data-email-timer]");
          if (el) el.textContent = `Tiempo: ${clock((Date.now() - email.startedAt) / 1000)} · meta ${clock(EMAIL_LIMIT)}`;
        }
      }, 500);
    }
  }

  function changePrompt(next) {
    email.id = next;
    email.text = "";
    email.grade = null;
    email.showModel = false;
    email.startedAt = null;
    email.elapsed = 0;
    if (email.timer) { clearInterval(email.timer); email.timer = null; }
    renderEmail();
  }

  function submitEmail() {
    const prompt = promptOf();
    if (!prompt) return;
    email.elapsed = email.startedAt ? (Date.now() - email.startedAt) / 1000 : 0;
    email.grade = gradeEmail(prompt, email.text);
    email.showModel = false;
    if (email.timer) { clearInterval(email.timer); email.timer = null; }
    renderEmail();
    const fb = $("[data-testid=wae-feedback]");
    if (fb) fb.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderEmail() {
    const root = $("#email-root");
    const prompt = promptOf();
    if (!prompt) { root.innerHTML = ""; return; }
    const words = wordCount(email.text);
    const flag = words < EMAIL_WORD_TARGET ? "under" : words > EMAIL_WORD_OVER ? "over" : "ok";
    const wordLabel = flag === "under" ? " · debajo de la meta" : flag === "over" ? " · por encima del rango" : " · en el rango";
    const g = email.grade;

    root.innerHTML = `
      <div data-testid="wae-sim" style="display:flex;flex-direction:column;gap:1rem">
        <div class="row between">
          <div>
            <p class="kicker">Writing · Task 2 · Write an Email</p>
            <h2>Simulador de Write an Email</h2>
            <p class="sm muted" style="margin-top:.25rem;max-width:42rem">7 minutos. Meta de entrenamiento: ${EMAIL_WORD_TARGET} palabras. Elige una consigna original, escribe el correo y recibe la rúbrica de inmediato.</p>
          </div>
          ${email.startedAt && !g ? `<p class="sm muted tabular" data-email-timer>Tiempo: ${esc(clock((Date.now() - email.startedAt) / 1000))} · meta ${clock(EMAIL_LIMIT)}</p>` : ""}
          ${g ? `<p class="sm muted tabular">Tiempo usado: ${esc(clock(email.elapsed))}</p>` : ""}
        </div>
        <label class="block">Consigna
          <select class="prompt" data-testid="wae-prompt-select">
            ${EMAIL_PROMPTS.map((p) => `<option value="${esc(p.id)}" ${p.id === prompt.id ? "selected" : ""}>${esc(p.titleEs)}</option>`).join("")}
          </select>
        </label>
        <div class="grid-2">
          <div class="card">
            <p class="label-caps" style="margin-top:0">Situación</p>
            <p class="sm" lang="en">${esc(prompt.scenario)}</p>
            <p class="sm" style="margin-top:.5rem;font-weight:600;color:var(--navy-900)" lang="en">${esc(prompt.instruction)}</p>
            <ul class="plain sm" lang="en">${prompt.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
            <p class="fine muted" style="margin-top:.5rem">To: <span lang="en">${esc(prompt.to)}</span> · Subject: <span lang="en">${esc(prompt.subject)}</span></p>
            <p class="fine muted">${esc(prompt.scenarioEs)}</p>
            <details class="openers" style="margin-top:.75rem;border-radius:.5rem;background:var(--foam-100);padding:.75rem;font-size:.9rem">
              <summary>Aperturas sugeridas · cómo y por qué empezar</summary>
              <ul class="plain" style="list-style:none;padding-left:0;margin-top:.5rem;display:flex;flex-direction:column;gap:.5rem">
                ${prompt.openings.map((o) => `<li><p lang="en" style="font-weight:600;color:var(--navy-900)">${esc(o.en)}</p><p class="muted">${esc(o.whyEs)}</p></li>`).join("")}
              </ul>
            </details>
          </div>
          <div class="card">
            <div class="row between" style="margin-bottom:.5rem;align-items:center">
              <label class="block" for="wae-body">Tu correo</label>
              <p class="wordcount tabular ${flag}" data-testid="wae-wordcount">${words}/${EMAIL_WORD_TARGET} palabras${wordLabel}</p>
            </div>
            <textarea id="wae-body" class="body" data-testid="wae-textarea" lang="en" placeholder="Dear …,"></textarea>
            <div class="actions" style="margin-top:.75rem">
              <button type="button" class="btn blue" data-testid="wae-submit">Enviar y ver rúbrica</button>
              <button type="button" class="btn outline" data-action="clear-email">Borrar</button>
            </div>
          </div>
        </div>
        ${g ? `
          <div style="display:flex;flex-direction:column;gap:1rem" data-testid="wae-feedback">
            <div class="card">
              <p class="kicker">Resultado inmediato</p>
              <div class="stat-row">
                <div>
                  <p class="score-xl tabular" data-testid="wae-score">${g.score.toFixed(1)}/5</p>
                  <p class="fine muted">${esc(g.scoreLabelEs)}</p>
                </div>
                <div>
                  <p class="score-lg tabular ${flag === "ok" ? "wordcount ok" : flag === "under" ? "wordcount under" : "wordcount over"}">${g.words}</p>
                  <p class="fine muted">palabras · meta ${g.wordTarget}${g.wordFlag === "under" ? " · corto" : g.wordFlag === "over" ? " · largo" : ""}</p>
                </div>
              </div>
              <p class="sm" style="margin-top:.75rem">${esc(g.explanationEs)}</p>
            </div>
            <div class="card">
              <h3>Desglose de la rúbrica</h3>
              ${g.checks.map((c) => `
                <div class="check ${c.ok ? "ok" : "no"}" data-testid="wae-check" data-check="${esc(c.id)}">
                  <p style="font-weight:600">${c.ok ? "✓" : "✗"} ${esc(c.labelEs)}</p>
                  <p class="muted" style="margin-top:.25rem">${esc(c.detailEs)}</p>
                </div>`).join("")}
              <p class="label-caps">Viñetas de la consigna</p>
              <ul class="plain sm">
                ${g.bullets.map((b) => `<li>${b.ok ? "✓" : "✗"} ${esc(b.labelEs)}</li>`).join("")}
              </ul>
            </div>
            <div class="card">
              <h3>Tarjetas de apoyo</h3>
              <ul class="plain sm">${g.tipsEs.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
            </div>
            <div class="card">
              <div class="row between" style="align-items:center">
                <h3>Modelo de respuesta</h3>
                <button type="button" class="btn outline sm" data-testid="wae-model">${email.showModel ? "Ocultar modelo" : "Mostrar modelo"}</button>
              </div>
              ${email.showModel ? `<pre class="model" lang="en">${esc(prompt.modelAnswer)}</pre><p class="sm muted" style="margin-top:.5rem">${esc(prompt.modelWhyEs)}</p>` : `<p class="sm muted" style="margin-top:.5rem">Revísalo después de escribir el tuyo. No es la única respuesta correcta.</p>`}
            </div>
          </div>` : ""}
        <div class="card">
          <h3>Cómo escribir el correo</h3>
          <div class="grid-2 md-2" style="margin-top:.75rem">
            ${EMAIL_COACH_TIPS_ES.map((t) => `<div class="tip-card"><p style="font-weight:600;color:var(--navy-900)">${esc(t.titleEs)}</p><p class="sm" style="margin-top:.25rem">${esc(t.bodyEs)}</p></div>`).join("")}
          </div>
        </div>
      </div>`;

    const sel = $("[data-testid=wae-prompt-select]", root);
    sel.addEventListener("change", () => changePrompt(sel.value));
    const ta = $("[data-testid=wae-textarea]", root);
    ta.value = email.text;
    ta.addEventListener("input", () => {
      beginEmailTimer();
      email.text = ta.value;
      email.grade = null;
      const w = wordCount(email.text);
      const f = w < EMAIL_WORD_TARGET ? "under" : w > EMAIL_WORD_OVER ? "over" : "ok";
      const lab = f === "under" ? " · debajo de la meta" : f === "over" ? " · por encima del rango" : " · en el rango";
      const wc = $("[data-testid=wae-wordcount]", root);
      if (wc) {
        wc.className = `wordcount tabular ${f}`;
        wc.textContent = `${w}/${EMAIL_WORD_TARGET} palabras${lab}`;
      }
    });
    $("[data-testid=wae-submit]", root).addEventListener("click", submitEmail);
    $("[data-action=clear-email]", root).addEventListener("click", () => {
      email.text = "";
      email.grade = null;
      email.showModel = false;
      email.startedAt = null;
      email.elapsed = 0;
      if (email.timer) { clearInterval(email.timer); email.timer = null; }
      renderEmail();
    });
    const modelBtn = $("[data-testid=wae-model]", root);
    if (modelBtn) modelBtn.addEventListener("click", () => { email.showModel = !email.showModel; renderEmail(); });
  }

  /* ---------- boot ---------- */
  renderStatic();
  renderModeButtons();
  startBas();
  renderEmail();
})();
