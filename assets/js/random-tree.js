/* A random labelled tree, redrawn on every page load.
 *
 * pruferToTree, cyclicEmbedding and layout are copied verbatim from the Cayley
 * demo (_pages/cayley.md) so the picture here is the same drawing that demo
 * makes; keep them in step if that page changes.
 */
(function () {
  "use strict";

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

  // n^(n-2), grouped with thin spaces the way a reader would say it.
  function cayleyCount(n) {
    return Math.pow(n, n - 2).toLocaleString("en-US");
  }

  function draw(host, n) {
    const tree = randomTree(n);
    const emb = cyclicEmbedding(n, tree.edges);
    if (!emb) return false;
    const pos = layout(n, emb);

    const W = 320;
    const H = 150;
    const pad = 18;
    const xs = [], ys = [];
    for (let v = 1; v <= n; v++) {
      xs.push(pos[v].x);
      ys.push(pos[v].y);
    }
    const minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
    const minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    const scale = Math.min(
      (W - 2 * pad) / Math.max(maxX - minX, 0.001),
      (H - 2 * pad) / Math.max(maxY - minY, 0.001)
    );
    const ox = (W - (maxX - minX) * scale) / 2 - minX * scale;
    const oy = (H - (maxY - minY) * scale) / 2 - minY * scale;
    const X = (v) => (pos[v].x * scale + ox).toFixed(1);
    const Y = (v) => (pos[v].y * scale + oy).toFixed(1);

    let svg =
      '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="A random labelled tree on ' +
      n + ' vertices">';
    for (const e of tree.edges) {
      svg +=
        '<line x1="' + X(e[0]) + '" y1="' + Y(e[0]) + '" x2="' + X(e[1]) + '" y2="' + Y(e[1]) +
        '" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
    }
    for (let v = 1; v <= n; v++) {
      svg += '<circle cx="' + X(v) + '" cy="' + Y(v) + '" r="11" fill="currentColor"/>';
      svg +=
        '<text x="' + X(v) + '" y="' + Y(v) + '" text-anchor="middle" dominant-baseline="central" ' +
        'font-size="12" fill="var(--global-bg-color)">' + v + "</text>";
    }
    svg += "</svg>";

    host.innerHTML =
      '<a class="random-tree-figure" href="' + (host.dataset.href || "/cayley/") + '">' + svg + "</a>" +
      '<p class="random-tree-caption">One of the ' + cayleyCount(n) + " labelled trees on " + n +
      " vertices, drawn fresh on every visit.</p>";
    return true;
  }

  function init() {
    const host = document.getElementById("random-tree");
    if (!host) return;
    const n = parseInt(host.dataset.n, 10) || 6;
    draw(host, n);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
