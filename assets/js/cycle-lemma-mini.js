/* The cycle lemma, in miniature.
 *
 * A word of a north and b east steps is rotated through all a+b reading
 * frames; when gcd(a,b)=1 exactly one of them stays above the diagonal. The
 * animation decelerates onto that one, so the stop is the theorem. The full
 * interactive version lives on /rational-catalan/.
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

  function shuffledWord(a, b) {
    const cells = new Array(a).fill("N").concat(new Array(b).fill("E"));
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = cells[i];
      cells[i] = cells[j];
      cells[j] = t;
    }
    return cells.join("");
  }

  function draw(svg, word, a, b) {
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

  function setup(host) {
    const a = parseInt(host.dataset.a, 10) || 3;
    const b = parseInt(host.dataset.b, 10) || 5;
    const n = a + b;

    let word = shuffledWord(a, b);
    let target = 0;
    while (!isDyck(rot(word, target), a, b) && target < n) target++;
    if (target >= n) return;                        // gcd(a,b) > 1: no unique frame

    const link = document.createElement("a");
    link.className = "cycle-mini-figure";
    link.href = host.dataset.href || "/rational-catalan/";
    const svg = el("svg", { role: "img",
      "aria-label": "A lattice path being rotated until it stays above the diagonal" });
    link.appendChild(svg);

    const caption = document.createElement("p");
    caption.className = "cycle-mini-caption";
    caption.textContent =
      "Of the " + n + " rotations of this path, exactly one stays above the diagonal.";

    host.textContent = "";
    host.appendChild(link);
    host.appendChild(caption);

    const still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = still ? target : 0;
    let timer = null;
    draw(svg, rot(word, frame), a, b);
    if (still) return;

    function spin() {
      if (timer) return;
      const extra = ((target - frame) % n + n) % n;
      let left = n + extra;
      (function step() {
        frame = (frame + 1) % n;
        draw(svg, rot(word, frame), a, b);
        if (--left <= 0) { timer = null; return; }
        timer = setTimeout(step, SLOW - (SLOW - FAST) * Math.min(1, left / n));
      })();
    }

    link.addEventListener("mouseenter", spin);

    if (!("IntersectionObserver" in window)) { spin(); return; }
    const io = new IntersectionObserver(function (entries) {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.disconnect();
        setTimeout(spin, 250);
      }
    }, { threshold: 0.6 });
    io.observe(host);
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".cycle-mini"), setup);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
