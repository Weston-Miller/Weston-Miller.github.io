#!/usr/bin/env node
/* Checks the maths of _pages/ehrhart.md against an independent brute force.
 *
 *   node bin/check_ehrhart.mjs
 *
 * No dependencies and no browser.  The page's script is one IIFE that only touches
 * the DOM through a handful of calls, so it runs here against a stub and every
 * number and every printed formula can be read back and checked.  The brute force
 * below is deliberately written from the definitions rather than lifted from the
 * page: a check that shares an implementation with the thing it checks is not one.
 *
 * The graded polygon search is exercised by running GRADED_WORKER_MAIN -- the exact
 * body that runs in the Worker in a browser -- against a fake postMessage.
 *
 * Exits non-zero on the first failure, with the case that failed.
 *
 * Kept honest by mutation: seeding the page with a wrong reversal, the old doubled
 * superscript, a dropped lattice point, the old t-for-m notation, a shifted degree,
 * a narrowed factor search, a reflection dropped from SYM8, a truncated h* and a
 * wrong rank over one prime are all caught here.  What it does NOT catch is the page
 * skipping its own second-prime confirmation, since the two primes agree whenever the
 * ranks are right -- so the harness runs that comparison itself instead, which is the
 * failure that would actually matter.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGE = join(ROOT, "_pages", "ehrhart.md");

/* ------------------------------- load the page ------------------------------- */

const md = readFileSync(PAGE, "utf8");
const raw = /\{%\s*raw\s*%\}([\s\S]*?)\{%\s*endraw\s*%\}/.exec(md);
if (!raw) fail("no {% raw %} block in " + PAGE);
const script = /<script>\n([\s\S]*?)\n<\/script>/.exec(raw[1]);
if (!script) fail("no <script> in the raw block");

const EXPORTS = [
  "sliceShape", "polyShape", "ehrhart", "evalPow", "polyHTML",
  "downClosed", "downClosedHilb", "hilbertOf", "hilbRank",
  "hullLattice", "hullLocate", "fitPolyDen", "mulSeriesT", "recipPoly",
  "graded", "gradedAt", "recipExact", "GRADED_WORKER_MAIN",
  "CS", "PRESETS", "state", "shape", "draw", "readouts", "planFor", "$",
];
const body = script[1].replace(/\}\)\(\);\s*$/, "return { " + EXPORTS.join(", ") + " };\n})();");
if (body === script[1]) fail("could not find the IIFE tail to hook a return onto");

/* --------------------------------- DOM stub --------------------------------- */
/* Deliberately dumb.  If the page grows a DOM call this does not answer, the harness
   throws with the missing method named, which is a cheap and obvious failure. */

function el(id) {
  const e = {
    id, innerHTML: "", value: "", hidden: false, disabled: false, className: "",
    style: {}, children: [], _attrs: {},
    setAttribute(k, v) { this._attrs[k] = String(v); },
    getAttribute(k) { return k in this._attrs ? this._attrs[k] : null; },
    removeAttribute(k) { delete this._attrs[k]; },
    addEventListener() {}, removeEventListener() {},
    appendChild(c) { this.children.push(c); return c; },
    insertBefore(c) { this.children.push(c); return c; },
    removeChild() {}, remove() {}, focus() {}, click() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 430, height: 400 }; },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    hasPointerCapture() { return false; },
    setPointerCapture() {}, releasePointerCapture() {},
  };
  Object.defineProperty(e, "parentNode", { get: () => e });
  Object.defineProperty(e, "textContent", {
    get() { return String(this.innerHTML).replace(/<[^>]*>/g, ""); },
    set(v) { this.innerHTML = v; },
  });
  return e;
}
const NODES = new Map();
const documentStub = {
  getElementById(id) { if (!NODES.has(id)) NODES.set(id, el(id)); return NODES.get(id); },
  createElement: () => el("new"),
  createElementNS: () => el("new"),
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener() {},
  documentElement: el("html"),
  body: el("body"),
  readyState: "complete",
};
const windowStub = {
  matchMedia: () => ({ matches: false, addEventListener() {} }),
  addEventListener() {},
};

const API = new Function(
  "window", "document", "location", "getComputedStyle",
  "requestAnimationFrame", "cancelAnimationFrame", "URL", "Blob", "Worker", "navigator",
  "return " + body
)(
  windowStub, documentStub, { hash: "", origin: "", pathname: "" },
  () => ({ color: "rgb(0,0,0)", getPropertyValue: () => "" }),
  () => 0, () => {},
  { createObjectURL: () => "blob:stub", revokeObjectURL() {} },
  function Blob() {}, undefined, {}
);

/* ------------------------- brute force, from scratch ------------------------- */

/* |m P n Z^n| and its interior, for the slice {x in [0,1]^n : sum x = p/q}, by
   walking every weak composition -- no shared code with the page. */
function sliceCounts(n, p, q, m) {
  if ((m * p) % q !== 0) return [0, 0];
  const total = (m * p) / q;
  let all = 0, inner = 0;
  const x = new Array(n).fill(0);
  (function rec(i, rem) {
    if (i === n - 1) {
      if (rem >= 0 && rem <= m) {
        x[i] = rem; all++;
        if (x.every((v) => v > 0 && v < m)) inner++;
      }
      return;
    }
    for (let v = 0; v <= Math.min(m, rem); v++) { x[i] = v; rec(i + 1, rem - v); }
  })(0, total);
  return [all, inner];
}

/* Convex hull, and point-in-polygon by half-plane tests, both written here. */
function hull(pts) {
  const s = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (P) => {
    const st = [];
    for (const p of P) {
      while (st.length > 1 && cr(st[st.length - 2], st[st.length - 1], p) <= 0) st.pop();
      st.push(p);
    }
    return st;
  };
  const lo = half(s), up = half([...s].reverse());
  lo.pop(); up.pop();
  return lo.concat(up);
}
function polyCounts(V, m) {
  if (m === 0) return [1, 0];
  const xs = V.map((v) => v[0]), ys = V.map((v) => v[1]);
  let all = 0, inner = 0;
  for (let x = m * Math.min(...xs); x <= m * Math.max(...xs); x++)
    for (let y = m * Math.min(...ys); y <= m * Math.max(...ys); y++) {
      let out = false, edge = false;
      for (let i = 0; i < V.length; i++) {
        const a = V[i], b = V[(i + 1) % V.length];
        const c = (b[0] - a[0]) * (y - m * a[1]) - (b[1] - a[1]) * (x - m * a[0]);
        if (c < 0) { out = true; break; }
        if (c === 0) edge = true;
      }
      if (!out) { all++; if (!edge) inner++; }
    }
  return [all, inner];
}

/* --------------------------------- assertions --------------------------------- */

let checks = 0, ctx = "";
function fail(msg) {
  console.error("\nFAIL" + (ctx ? " [" + ctx + "]" : "") + ": " + msg);
  process.exit(1);
}
const eq = (got, want, what) => {
  checks++;
  if (got !== want) fail(what + "\n  got  " + got + "\n  want " + want);
};
const ok = (cond, what) => { checks++; if (!cond) fail(what); };

const MMAX = 8;
const text = (h) => String(h).replace(/<[^>]*>/g, "").replace(/&minus;/g, "-")
  .replace(/&thinsp;|&nbsp;/g, " ").replace(/&ge;/g, ">=").replace(/&le;/g, "<=");

/* --- 1. the counting function, for every slice and every preset polygon --- */

const SLICES = [];
for (const sh of ["s3", "s4"]) {
  const n = sh === "s3" ? 3 : 4;
  API.CS[sh].forEach((c, i) => SLICES.push({ sh, n, p: c[0], q: c[1], i }));
}
for (const s of SLICES) {
  ctx = `slice ${s.sh} c=${s.p}/${s.q}`;
  const S = API.sliceShape(s.n, s.p, s.q);
  for (let m = 0; m <= MMAX; m++) {
    const [a, b] = sliceCounts(s.n, s.p, s.q, m);
    eq(S.count(m), a, `count at m=${m}`);
    eq(S.interior(m), b, `interior at m=${m}`);
  }
}

const POLYS = Object.entries(API.PRESETS).map(([k, g]) => [k, hull(g)]);
POLYS.push(["unit square", hull([[0, 0], [1, 0], [1, 1], [0, 1]])]);
POLYS.push(["wide triangle", hull([[0, 0], [7, 1], [2, 5]])]);
/* The anti-blocking pentagon reflected in x.  Its points are an order ideal only
   after one of the eight lattice symmetries, so it is what proves the page still
   tries all eight rather than only the translation. */
const ANTI_REFLECTED = hull([[5, 0], [0, 0], [1, 2], [3, 4], [5, 5]]);
POLYS.push(["anti-blocking, reflected", ANTI_REFLECTED]);
for (const [name, V] of POLYS) {
  ctx = "polygon " + name;
  const S = API.polyShape(V, 10);
  for (let m = 0; m <= MMAX; m++) {
    const [a, b] = polyCounts(V, m);
    eq(S.count(m), a, `count at m=${m}`);
    eq(S.interior(m), b, `interior at m=${m}`);
  }
  /* Pick: area = interior + boundary/2 - 1 */
  const E = API.ehrhart(S);
  const [c1, i1] = polyCounts(V, 1);
  eq(E.normVol, 2 * (i1 + (c1 - i1) / 2 - 1), "h*(1) = twice the area (Pick)");
}

/* --- 2. Ehrhart: the fit predicts, reciprocity holds, h*(1) is the volume --- */

for (const s of SLICES) {
  ctx = `slice ${s.sh} c=${s.p}/${s.q}`;
  const S = API.sliceShape(s.n, s.p, s.q), E = API.ehrhart(S), d = E.d, q = S.q;

  /* j(s) = i(qs) is fitted from d+1 values; it must be right past them too. */
  for (let k = d + 1; k <= d + 4; k++) {
    const v = API.evalPow(E.pow, k);
    eq(v[0] / v[1], sliceCounts(s.n, s.p, s.q, q * k)[0], `i(${q * k}) from the fitted polynomial`);
  }
  /* Ehrhart-Macdonald */
  for (let k = 1; k <= d + 2; k++) {
    const r = API.evalPow(E.pow, -k);
    eq(Math.round((d % 2 ? -1 : 1) * r[0] / r[1]), sliceCounts(s.n, s.p, s.q, q * k)[1],
      `(-1)^d i(-${k}) is the interior count at m=${q * k}`);
  }
  eq(E.hs.reduce((a, b) => a + b, 0), E.normVol, "h*(1) is the normalized volume");
  ok(E.hs.length - 1 === E.deg && E.codeg === d + 1 - E.deg, "codegree is d+1-deg h*");
  /* the codegree is the first dilate with an interior point */
  let first = 0;
  for (let k = 1; k <= d + 1 && !first; k++) if (sliceCounts(s.n, s.p, s.q, q * k)[1] > 0) first = k;
  eq(E.codeg, first, "codegree is the first dilate with an interior point");
}

/* --- 3. the printed panel: notation, and no doubled superscripts --- */

for (const s of SLICES) {
  ctx = `printed ${s.sh} c=${s.p}/${s.q}`;
  API.state.shape = s.sh;
  API.state.ci[s.sh] = s.i;
  API.state.M = 3;
  API.draw();
  const series = API.$("eh-series").innerHTML;
  const ehr = API.$("eh-ehr").innerHTML;
  const S = API.sliceShape(s.n, s.p, s.q), E = API.ehrhart(S), d = E.d, q = S.q;

  ok(!/<\/sup><sup>/.test(series), "two adjacent <sup> in the series (t^q^j instead of t^{qj})");
  const exps = [...series.matchAll(/t<sup>(\d+)<\/sup>/g)].map((m) => +m[1]);
  ok(exps.every((e) => e % q === 0), "every exponent of t is a multiple of q, got " + exps);
  ok(!/\bz\b/.test(text(series + ehr)), "a stray z survives in the printed series");
  ok(!/i\(t\)/.test(text(ehr)), "i(t) printed instead of i(m)");

  /* the interior numerator is h* reversed */
  const nums = [...series.matchAll(/<span class="num">([\s\S]*?)<\/span>/g)].map((m) => m[1]);
  eq(nums.length, 2, "both the series and its interior series are printed");
  const coeffs = (h) => {
    const o = {};
    text(h).split("+").forEach((t) => {
      const mm = /^\s*(-?[\d,]*)\s*(?:t(?:\s*(\d+))?)?\s*$/.exec(t.replace(/\s+/g, " "));
      if (!mm) fail("cannot parse the printed numerator term: " + JSON.stringify(t));
      const c = mm[1] === "" || mm[1] === "-" ? (mm[1] === "-" ? -1 : 1) : +mm[1].replace(/,/g, "");
      const e = mm[2] !== undefined ? +mm[2] : (/t/.test(t) ? 1 : 0);
      o[e] = (o[e] || 0) + c;
    });
    return o;
  };
  const A = coeffs(nums[0]), B = coeffs(nums[1]);
  for (let j = 0; j <= d; j++)
    eq(B[q * (d + 1 - j)] || 0, A[q * j] || 0, `interior numerator coefficient ${d + 1 - j} is h*_${j}`);
}

/* --- 4. the graded closed form for the slices --- */

for (const s of SLICES) {
  ctx = `graded ${s.sh} c=${s.p}/${s.q}`;
  const S = API.sliceShape(s.n, s.p, s.q), G = API.graded(S);
  ok(G && G.ok, "the closed form was computed");
  ok(G.recip, "q-reciprocity holds for a cube slice");
  for (let k = 0; k <= 4; k++) {
    const row = API.gradedAt(S, k);
    const sum = row.reduce((a, b) => a + b, 0n);
    eq(sum, BigInt(sliceCounts(s.n, s.p, s.q, k * S.q)[0]), `Hilb collapses to the count at q=1, k=${k}`);
  }
}

/* --- 5. down-closed degrees agree with the Hilbert function --- */

/* These have to be recognised as order ideals at all.  Without the assertion, a
   narrower symmetry search just makes the loop below skip them in silence. */
ctx = "order ideals";
for (const [name, V] of [["anti-blocking", hull(API.PRESETS.anti)],
                         ["unit square translated", hull([[1, 1], [4, 1], [4, 4], [1, 4]])],
                         ["anti-blocking, reflected", ANTI_REFLECTED]])
  for (let m = 1; m <= 2; m++)
    ok(API.downClosed(API.hullLattice(V, m)), name + " is an order ideal at m=" + m);

/* The two-prime confirmation is only ever visible when the primes disagree, so the
   harness runs the comparison itself on the sets that actually need a rank. */
ctx = "rank over two primes";
for (const [name, V] of POLYS) {
  for (let m = 1; m <= 3; m++) {
    const Z = API.hullLattice(V, m);
    if (API.downClosedHilb(Z)) continue;
    eq(API.hilbRank(Z, 999983).join(","), API.hilbRank(Z, 1000003).join(","),
      `the Hilbert function of ${name} at m=${m} is the same over both primes`);
  }
}

for (const [name, V] of POLYS) {
  ctx = "degrees " + name;
  for (let m = 1; m <= 3; m++) {
    const Z = API.hullLattice(V, m), dc = API.downClosed(Z);
    if (!dc) continue;
    const hist = [];
    dc.deg.forEach((e) => { while (hist.length <= e) hist.push(0n); hist[e] += 1n; });
    eq(hist.join(","), dc.h.join(","), `per-point degrees reproduce Hilb at m=${m}`);
    eq(hist.reduce((a, b) => a + b, 0n), BigInt(Z.length), `every point got a degree at m=${m}`);
    /* An order ideal contains the origin of its own frame, and its degrees are an
       unbroken run from there -- both independent of how the degree was computed. */
    eq(Math.min(...dc.deg), 0, `some point has degree 0 at m=${m}`);
    ok(hist.every((c) => c > 0n), `no empty degree between 0 and the top at m=${m}`);
    /* When the polygon already sits in the corner, the degree IS the coordinate sum,
       computed here rather than read back from the page. */
    const minx = Math.min(...Z.map((z) => z[0])), miny = Math.min(...Z.map((z) => z[1]));
    const flat = new Set(Z.map((z) => (z[0] - minx) + "," + (z[1] - miny)));
    const already = [...flat].every((k) => {
      const [i, j] = k.split(",").map(Number);
      return (i === 0 || flat.has((i - 1) + "," + j)) && (j === 0 || flat.has(i + "," + (j - 1)));
    });
    if (already)
      Z.forEach((z, i) => eq(dc.deg[i], (z[0] - minx) + (z[1] - miny),
        `degree is the coordinate sum for a polygon already in the corner, m=${m}`));
  }
}

/* --- 6. the Worker body, run in-process --- */

function runWorker(V, K0, Kmax, Amax, Bmax) {
  let onmessage = null, out = null;
  const src = "return function(postMessage, hullLocate, hullLattice, hilbertOf, hilbRank," +
    " downClosedHilb, fitPolyDen, mulSeriesT, recipPoly, HP1, HP2){ let onmessage;" +
    " (" + API.GRADED_WORKER_MAIN.toString() + ")(); return m => onmessage({data:m}); }";
  const make = new Function(src)();
  const post = (m) => { if (m.type === "done") out = m.out; };
  const send = make(post, API.hullLocate, API.hullLattice, API.hilbertOf, API.hilbRank,
    API.downClosedHilb, API.fitPolyDen, API.mulSeriesT, API.recipPoly, 1000003, 999983);
  send({ V, E: [], Eb: [], K0, Kmax, Amax, Bmax });
  return out;
}

/* conv{(0,0),(3,1),(1,3)} is not a preset; it is here because its denominator is
   (1-t)(1-q^3 t)(1-q^8 t^3) -- the only case with a factor of t-degree above 1, so
   it is what stops the peeling search from being quietly narrowed. */
const WORKER_CASES = [
  ["hex", { recip: true }],
  ["quad", { recip: false }],
  ["triangle", { recip: true }],
  ["anti", { recip: true }],
  [[[0, 0], [3, 1], [1, 3]], { recip: true, maxB: 3 }],
];
for (const [key, want] of WORKER_CASES) {
  ctx = "worker " + (Array.isArray(key) ? JSON.stringify(key) : key);
  const V = hull(Array.isArray(key) ? key : API.PRESETS[key]);
  const out = runWorker(V, 7, 12, 40, 8);
  ok(out, "the worker body returned a result");
  ok(!out.err, "the worker body threw: " + (out && out.err));
  ok(!out.failed, "no denominator was found");
  eq(out.recip, want.recip, "q-reciprocity for " + ctx);
  ok(out.confirmed, "the second prime agreed for " + ctx);
  if (want.maxB)
    eq(Math.max(...out.factors.map((f) => f[1])), want.maxB,
      "the denominator still has a factor of t-degree " + want.maxB);
  /* the fitted denominator must actually reproduce the Hilbert data */
  const N = API.mulSeriesT(out.D, out.E, out.Kver).slice(0, out.D.length);
  eq(N.map((r) => r.join(",")).join(" | "), out.N.map((r) => r.join(",")).join(" | "),
    "D * E is the numerator the panel prints");
}

/* the quadrilateral is here because its q-reciprocity fails; if it ever starts
   holding, that is a finding and not a passing test */
ctx = "the non-reciprocal quadrilateral";
eq(hull(API.PRESETS.quad).length, 4, "still a quadrilateral");
eq(runWorker(hull(API.PRESETS.quad), 7, 12, 40, 8).factors.map((f) => f.join("^")).join(" "),
  "0^1 4^1 4^1", "denominator is still (1-t)(1-q^4 t)^2");

ctx = "";
console.log(`ok — ${checks} checks over ${SLICES.length} slices and ${POLYS.length} polygons`);
