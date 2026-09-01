/* Small self-drawing figures for the demos index.
 *
 * Each <div class="demo-mini" data-kind="..."> becomes a picture that draws or
 * animates itself once when scrolled into view, and again on hover. All three
 * are miniatures of the full demos they sit beside:
 *
 *   cycle  a lattice path rotated until it stays above the diagonal
 *   tree   a random labelled tree in its cyclic embedding
 *   graph  a loopless multigraph with one of its 2-factors picked out
 *
 * pruferToTree, cyclicEmbedding and layout are copied verbatim from the Cayley
 * demo (_pages/cayley.md); keep them in step if that page changes.
 */
(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const FAST = 90;
  const SLOW = 460;

  function el(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = list[i];
      list[i] = list[j];
      list[j] = t;
    }
    return list;
  }

  const still = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- shared tree machinery (from the Cayley demo) ---------------- */

  function pruferToTree(n, seq) {
    if (n === 1) return [];
    if (n === 2) return [[1, 2]];
    const deg = new Array(n + 1).fill(1);
    seq.forEach((v) => deg[v]++);
    const avail = [];
    for (let v = 1; v <= n; v++) if (deg[v] === 1) avail.push(v);
    avail.sort((a, b) => a - b);
    const edges = [];
    for (const v of seq) {
      const leaf = avail.shift();
      edges.push([Math.min(leaf, v), Math.max(leaf, v)]);
      if (--deg[v] === 1) {
        avail.push(v);
        avail.sort((a, b) => a - b);
      }
    }
    edges.push([Math.min(avail[0], avail[1]), Math.max(avail[0], avail[1])]);
    return edges;
  }

  function randomTree(n) {
    const seq = [];
    for (let i = 0; i < n - 2; i++) seq.push(1 + Math.floor(Math.random() * n));
    return { seq: seq, edges: pruferToTree(n, seq) };
  }

  function cyclicEmbedding(n, edges) {
    const adj = {};
    for (let i = 1; i <= n; i++) adj[i] = [];
    for (const e of edges) {
      adj[e[0]].push(e[1]);
      adj[e[1]].push(e[0]);
    }
    const parent = { [n]: null };
    const seen = new Set([n]);
    const q = [n];
    while (q.length) {
      const v = q.shift();
      for (const u of adj[v])
        if (!seen.has(u)) {
          seen.add(u);
          parent[u] = v;
          q.push(u);
        }
    }
    if (seen.size !== n) return null;
    const order = {};
    for (let i = 1; i <= n; i++) {
      const p = parent[i];
      order[i] = adj[i].slice().sort((x, y) => {
        const kx = i !== n && x === p ? i : x;
        const ky = i !== n && y === p ? i : y;
        return kx - ky;
      });
    }
    return { order: order, parent: parent, adj: adj };
  }

  function layout(n, emb) {
    const order = emb.order;
    const size = {};
    (function sz(v, p) {
      const kids = order[v].filter((x) => x !== p);
      if (!kids.length) {
        size[v] = 1;
        return 1;
      }
      let s = 0;
      for (const c of kids) s += sz(c, v);
      size[v] = s;
      return s;
    })(n, null);

    const pos = {};
    pos[n] = { x: 0, y: 0, depth: 0 };
    const R = 1;
    (function place(v, p, centre, width, depth) {
      let kids;
      if (v === n) kids = order[v].slice();
      else {
        const idx = order[v].indexOf(p);
        kids = [];
        for (let t = 1; t < order[v].length; t++) kids.push(order[v][(idx + t) % order[v].length]);
      }
      if (!kids.length) return;
      const tot = kids.reduce((s, c) => s + size[c], 0);
      let ang = centre - width / 2;
      for (const c of kids) {
        const w = (width * size[c]) / tot;
        const th = ang + w / 2;
        const r = (depth + 1) * R;
        pos[c] = { x: r * Math.cos(th), y: r * Math.sin(th), depth: depth + 1, ang: th };
        place(c, v, th, Math.min(w, Math.PI * 0.92), depth + 1);
        ang += w;
      }
    })(n, null, -Math.PI / 2, 2 * Math.PI, 0);
    return pos;
  }
  /* ---------------- cycle lemma ---------------- */

  const rot = (w, k) => w.slice(k) + w.slice(0, k);

  // stays weakly above the line b*y = a*x
  function isDyck(w, a, b) {
    let x = 0, y = 0;
    for (const ch of w) {
      if (ch === "N") y++;
      else if (b * y < a * ++x) return false;
    }
    return true;
  }

  function drawPath(svg, word, a, b) {
    const cell = 30, pad = 10;
    const w = cell * b, h = cell * a;
    svg.setAttribute("viewBox", [0, 0, w + 2 * pad, h + 2 * pad].join(" "));
    svg.textContent = "";
    const X = (i) => pad + i * cell;
    const Y = (j) => pad + h - j * cell;

    for (let i = 0; i <= b; i++)
      el("line", { x1: X(i), y1: Y(0), x2: X(i), y2: Y(a),
        stroke: "var(--global-divider-color)", "stroke-width": 1 }, svg);
    for (let j = 0; j <= a; j++)
      el("line", { x1: X(0), y1: Y(j), x2: X(b), y2: Y(j),
        stroke: "var(--global-divider-color)", "stroke-width": 1 }, svg);
    el("line", { x1: X(0), y1: Y(0), x2: X(b), y2: Y(a),
      stroke: "var(--global-text-color)", "stroke-width": 1.5, opacity: 0.45,
      "stroke-dasharray": "4 4" }, svg);

    let d = "M " + X(0) + " " + Y(0), x = 0, y = 0;
    for (const ch of word) {
      if (ch === "N") y++;
      else x++;
      d += " L " + X(x) + " " + Y(y);
    }
    const good = isDyck(word, a, b);
    el("path", { d, fill: "none", "stroke-width": 3, "stroke-linejoin": "round",
      "stroke-linecap": "round",
      stroke: good ? "currentColor" : "var(--global-text-color)",
      opacity: good ? 1 : 0.4 }, svg);
  }

  function cycleMini(host, svg) {
    const a = parseInt(host.dataset.a, 10) || 3;
    const b = parseInt(host.dataset.b, 10) || 5;
    const n = a + b;
    const word = shuffle(new Array(a).fill("N").concat(new Array(b).fill("E"))).join("");

    let target = 0;
    while (target < n && !isDyck(rot(word, target), a, b)) target++;
    if (target >= n) return null;                  // gcd(a,b) > 1: no unique frame

    // Rest state is the answer: a figure that never gets played still shows
    // the Dyck path. Playing from there runs a full loop back to it.
    let frame = target;
    drawPath(svg, rot(word, frame), a, b);

    return function play(done) {
      const extra = ((target - frame) % n + n) % n;
      let left = n + extra;
      (function step() {
        frame = (frame + 1) % n;
        drawPath(svg, rot(word, frame), a, b);
        if (--left <= 0) return done();
        done(setTimeout(step, SLOW - (SLOW - FAST) * Math.min(1, left / n)));
      })();
    };
  }

  /* ---------------- random labelled tree ---------------- */

  function randomTree(n) {
    const seq = [];
    for (let i = 0; i < n - 2; i++) seq.push(1 + Math.floor(Math.random() * n));
    return pruferToTree(n, seq);
  }

  function treeMini(host, svg) {
    const n = parseInt(host.dataset.n, 10) || 6;
    let edges = randomTree(n);
    let emb = cyclicEmbedding(n, edges);
    if (!emb) return null;

    function render() {
      const pos = layout(n, emb);
      const W = 220, H = 150, pad = 20;
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      svg.textContent = "";
      const xs = [], ys = [];
      for (let v = 1; v <= n; v++) { xs.push(pos[v].x); ys.push(pos[v].y); }
      const minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
      const minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
      const scale = Math.min((W - 2 * pad) / Math.max(maxX - minX, 0.001),
                             (H - 2 * pad) / Math.max(maxY - minY, 0.001));
      const ox = (W - (maxX - minX) * scale) / 2 - minX * scale;
      const oy = (H - (maxY - minY) * scale) / 2 - minY * scale;
      const X = (v) => pos[v].x * scale + ox;
      const Y = (v) => pos[v].y * scale + oy;

      let d = "";
      for (const e of edges) d += " M " + X(e[0]) + " " + Y(e[0]) + " L " + X(e[1]) + " " + Y(e[1]);
      el("path", { class: "draw", pathLength: 100, d: d.trim(), fill: "none",
        stroke: "currentColor", "stroke-width": 2.5, "stroke-linecap": "round" }, svg);
      const nodes = el("g", { class: "nodes" }, svg);
      for (let v = 1; v <= n; v++) {
        el("circle", { cx: X(v), cy: Y(v), r: 11, fill: "currentColor" }, nodes);
        el("text", { x: X(v), y: Y(v), "text-anchor": "middle",
          "dominant-baseline": "central", "font-size": 12,
          fill: "var(--global-bg-color)" }, nodes).textContent = v;
      }
    }

    render();
    return function play(done) {
      edges = randomTree(n);
      const next = cyclicEmbedding(n, edges);
      if (next) emb = next;
      render();
      done();
    };
  }

  /* ---------------- multigraph with a 2-factor ---------------- */

  // A random 4-cycle (which is itself a 2-factor) plus one or two extra edges,
  // so the picture always has a 2-factor to pick out.
  function randomMultigraph() {
    const cyc = shuffle([0, 1, 2, 3]);
    const factor = [];
    for (let i = 0; i < 4; i++) factor.push([cyc[i], cyc[(i + 1) % 4]]);
    // One extra edge always doubles an edge of the cycle, so the picture is
    // visibly a multigraph and not just a graph; sometimes one more chord.
    const extra = [factor[Math.floor(Math.random() * 4)].slice()];
    if (Math.random() < 0.6) {
      const pool = [];
      for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) pool.push([i, j]);
      extra.push(shuffle(pool)[0]);
    }
    return { factor: factor, extra: extra };
  }

  function graphMini(host, svg) {
    const W = 220, H = 150;
    const pos = [[45, 35], [175, 35], [175, 115], [45, 115]];
    let g = randomMultigraph();

    function render(highlight) {
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      svg.textContent = "";
      const seen = {};
      function edge(a, b, cls) {
        const key = Math.min(a, b) + "-" + Math.max(a, b);
        const nth = (seen[key] = (seen[key] || 0) + 1);
        const [x1, y1] = pos[a], [x2, y2] = pos[b];
        const bow = nth === 1 ? 0 : 26 * (nth % 2 ? 1 : -1);
        const mx = (x1 + x2) / 2 + (y2 - y1) / 8 * (bow / 26);
        const my = (y1 + y2) / 2 - (x2 - x1) / 8 * (bow / 26);
        const d = bow ? "M " + x1 + " " + y1 + " Q " + mx + " " + my + " " + x2 + " " + y2
                      : "M " + x1 + " " + y1 + " L " + x2 + " " + y2;
        const lit = cls === "factor" && highlight;
        el("path", { class: lit ? "draw factor" : cls, d, fill: "none",
          "stroke-width": cls === "factor" ? 3 : 2,
          stroke: lit ? "currentColor" : "var(--global-text-color)",
          opacity: lit ? 1 : 0.35,
          "stroke-linecap": "round" }, svg);
      }
      for (const e of g.extra) edge(e[0], e[1], "extra");
      for (const e of g.factor) edge(e[0], e[1], "factor");
      const nodes = el("g", { class: "nodes" }, svg);
      for (const p of pos)
        el("circle", { cx: p[0], cy: p[1], r: 8, fill: "currentColor" }, nodes);
    }

    render(true);                                  // rest state: 2-factor already picked out
    return function play(done) {
      g = randomMultigraph();
      render(false);
      done(setTimeout(function () { render(true); done(); }, 700));
    };
  }

  /* ---------------- wiring ---------------- */

  const KINDS = { cycle: cycleMini, tree: treeMini, graph: graphMini };

  function setup(host) {
    const build = KINDS[host.dataset.kind];
    if (!build) return;

    const link = document.createElement("a");
    link.className = "demo-mini-figure";
    link.href = host.dataset.href || "#";
    const svg = el("svg", { role: "img", "aria-label": host.dataset.label || "" });
    link.appendChild(svg);

    const caption = document.createElement("p");
    caption.className = "demo-mini-caption";
    caption.textContent = host.dataset.caption || "";

    host.textContent = "";
    host.appendChild(link);
    if (caption.textContent) host.appendChild(caption);

    const play = build(host, svg);
    if (!play || still()) return;

    let timer = null;
    let running = false;
    function done(next) {
      if (next) { timer = next; return; }
      timer = null;
      running = false;
    }
    function start() {
      if (running) return;
      running = true;
      play(done);
    }

    link.addEventListener("mouseenter", start);

    if (!("IntersectionObserver" in window)) { start(); return; }
    const io = new IntersectionObserver(function (entries) {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.disconnect();
        setTimeout(start, 250);
      }
    }, { threshold: 0.5 });
    io.observe(host);
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".demo-mini"), setup);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
