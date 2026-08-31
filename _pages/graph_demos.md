---
layout: default
title: Interactive graph demos
permalink: /graph-demos/
nav: false
---

{% raw %}
<style>
#gd{--ink:var(--global-text-color,#000); --muted:var(--global-text-color-light,#828282);
         --line:var(--global-divider-color,rgba(0,0,0,0.1)); --bg:var(--global-bg-color,#fff);
         --panel:rgba(127,127,127,0.11); --surface:var(--global-card-bg-color,#fff);
         --accent:var(--global-theme-color,#009f06); --accentbg:rgba(0,159,6,0.08);
         --ok:var(--global-theme-color,#009f06); --bad:var(--global-highlight-color,#b71c1c);
         --green:var(--global-theme-color,#009f06); --greenbg:rgba(0,159,6,0.10);
         --blue:var(--global-theme-color,#009f06); --bluebg:rgba(0,159,6,0.08);
         --edge:#8a8a84; --vfill:color-mix(in srgb, var(--accent) 18%, var(--bg)); --radius:6px;}
#gd *{box-sizing:border-box;}
#gd{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
        color:var(--ink); background:var(--bg); line-height:1.55; margin:0;}
#gd .wrap{max-width:900px; margin:0 auto; padding:1.5rem 1.25rem 4rem;}
#gd h1{font-size:2rem; font-weight:700; margin:.2rem 0 .5rem; line-height:1.2;}
#gd p.lede{color:var(--muted); margin:.2rem 0 1.2rem; font-size:.95rem;}
#gd a{text-decoration:none;}
#gd a:hover{text-decoration:underline;}
#gd button{font:inherit; font-size:.9rem; padding:6px 12px; border:1px solid var(--line);
          background:var(--bg); border-radius:var(--radius); cursor:pointer; color:var(--ink);}
#gd button:hover{color:var(--accent); border-color:var(--accent);}
#gd button:active{transform:scale(.98);}
#gd button:disabled{opacity:.5; cursor:default;}
#gd button:disabled:hover{color:var(--ink); border-color:var(--line);}
#gd button.primary{background:var(--accent); border-color:var(--accent); color:#fff; font-weight:600;}
#gd button.primary:hover{color:#fff; opacity:.88;}
#gd button.stop{border-color:var(--bad); color:var(--bad);}
#gd button.stop:hover{border-color:var(--bad); color:var(--bad); opacity:.8;}
#gd label{font-size:.85rem; color:var(--muted);}
#gd input[type=number]{width:54px; font:inherit; padding:5px 6px; border:1px solid var(--line); border-radius:var(--radius); color:var(--ink); background:var(--bg);}
#gd input[type=number].touched{border-color:var(--accent);}
#gd .toolbar{display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px;}
#gd .spacer{flex:1;}
#gd svg#cv{width:100%; max-width:560px; aspect-ratio:3/2; height:auto; border:1px solid var(--line); border-radius:12px;
          background:var(--panel); touch-action:none; cursor:crosshair; display:block; margin:0 auto;}
#gd svg#cv .edge{fill:none; stroke:var(--edge); stroke-width:1.7;}
#gd svg#cv .edge.cut{stroke-width:4; stroke-dasharray:7 4;}
#gd svg#cv .edge.nest{stroke:var(--bad); stroke-width:2.6;}
#gd svg#cv .baseline{stroke:var(--line); stroke-width:1.5;}
#gd svg#cv .deflab{fill:var(--muted); font-weight:400;}
#gd svg#cv .mlabbg{fill:var(--bg); stroke:var(--line); stroke-width:1;}
#gd svg#cv .mlab{fill:var(--muted); font-weight:600;}
#gd svg#cv .vtx{fill:var(--bg); fill:var(--vfill); stroke:var(--accent); stroke-width:2.4;}
#gd svg#cv .vtx.sel{stroke-width:4;}
#gd svg#cv text{fill:var(--accent); font-family:inherit; font-weight:700;}
#gd #spares{display:flex; gap:7px; align-items:center; justify-content:center; flex-wrap:wrap;
          margin:.5rem auto 0; max-width:560px; font-size:.8rem; color:var(--muted);}
#gd #spares .sp{display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px;
          border:1.4px dashed var(--muted); border-radius:50%; opacity:.75;}
#gd #structbox{max-width:560px; margin:.55rem auto 0; font-size:.83rem;}
#gd #structbox summary{cursor:pointer; color:var(--muted);}
#gd #structbox summary:hover{color:var(--accent);}
#gd #structout{margin-top:.5rem;}
#gd table.st{border-collapse:collapse; font-size:.8rem; width:100%;}
#gd table.st td, #gd table.st th{border:1px solid var(--line); padding:3px 8px; text-align:left; font-weight:400;}
#gd table.st th{color:var(--muted); background:var(--panel); font-size:.76rem;}
#gd table.st td.sw{width:10px; padding:0;}
#gd #enginebar{text-align:center; margin-top:4px;}
#gd #enginebar button{font-size:.75rem; padding:2px 9px; color:var(--muted);}
#gd .listctl{display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin:.5rem 0 .2rem; font-size:.82rem;}
#gd .listctl select, #gd .listctl input{font:inherit; font-size:.82rem; padding:3px 6px;
          border:1px solid var(--line); border-radius:var(--radius); background:var(--bg); color:var(--ink);}
#gd .listctl input{width:120px;}
#gd .stats{font-size:.8rem; color:var(--muted); margin:.3rem 0;}
#gd .row{display:flex; gap:14px; align-items:flex-start; margin-top:10px; flex-wrap:wrap;}
#gd .row .col{flex:1; min-width:200px;}
#gd .k{font-size:.78rem; color:var(--muted); margin-bottom:3px;}
#gd textarea#edges{width:100%; min-height:62px; resize:vertical; font-family:ui-monospace,Menlo,Consolas,monospace;
          font-size:.8rem; padding:6px 8px; border:1px solid var(--line); border-radius:var(--radius);
          background:var(--bg); color:var(--ink); line-height:1.5;}
#gd textarea#edges.err{border-color:var(--bad);}
#gd #edgeerr{font-size:.78rem; color:var(--bad); min-height:1em;}
#gd #stats{font-size:.83rem; color:var(--muted); line-height:1.6;}
#gd #valid{font-size:.83rem; margin-top:2px;}
#gd .ok{color:var(--ok);}
#gd .bad{color:var(--bad);}
#gd .tabs{display:flex; gap:4px; flex-wrap:wrap; margin:1.3rem 0 0; border-bottom:1px solid var(--line);}
#gd .tab-btn{border:1px solid var(--line); border-bottom:none; border-radius:8px 8px 0 0; padding:7px 13px;
            background:var(--panel); color:var(--muted); position:relative; top:1px;}
#gd .tab-btn.active{background:var(--bg); color:var(--ink); font-weight:600; border-bottom:1px solid var(--bg); border-top:2px solid var(--accent); padding-top:6px;}
#gd .panel{border:1px solid var(--line); border-top:none; border-radius:0 0 10px 10px; padding:1rem 1.1rem 1.3rem;}
#gd .panel.hidden{display:none;}
#gd .panel .desc{font-size:.86rem; color:var(--muted); margin:0 0 .8rem;}
#gd .run{padding:8px 16px;}
#gd .runbar{display:flex; gap:8px; align-items:center; flex-wrap:wrap;}
#gd .elapsed{font-size:.82rem; color:var(--muted); font-variant-numeric:tabular-nums;}
#gd .tabout{margin-top:1rem;}
#gd .tabout.stale{opacity:.45;}
#gd #engine{font-size:.8rem; color:var(--muted); margin-top:12px; text-align:center;}
#gd .head{font-size:.92rem; margin-bottom:.5rem;}
#gd .tgrid{display:inline-flex; gap:2px; vertical-align:middle; margin:0 2px;}
#gd .tcol{display:flex; flex-direction:column; gap:2px;}
#gd .tcell{width:21px; height:21px; border:1px solid var(--global-text-color-light,#9a9a94); background:var(--surface); border-radius:3px;
          display:flex; align-items:center; justify-content:center; font-size:11px;
          font-family:ui-monospace,Menlo,monospace;}
#gd .one{display:flex; align-items:center; justify-content:center; width:21px; height:42px;
          font-size:13px; color:var(--muted); font-family:ui-monospace,Menlo,monospace;}
#gd .badge{display:inline-block; font-size:.78rem; padding:2px 8px; border-radius:20px; margin-right:6px;}
#gd .badge.g{background:var(--green); color:#fff;}
#gd .badge.r{background:var(--bad); color:#fff;}
#gd .badge.b{background:var(--bluebg); color:var(--blue); border:1px solid var(--blue);}
#gd .badge.n{background:var(--panel); color:var(--muted);}
#gd .caption{font-size:.82rem; color:var(--muted); margin:.4rem 0;}
#gd .note{font-size:.83rem; border-left:3px solid var(--accent); background:var(--accentbg);
          padding:.5rem .7rem; margin:.6rem 0; border-radius:0 var(--radius) var(--radius) 0;}
#gd .note.warn{border-left-color:var(--bad); background:rgba(183,28,28,0.07);}
#gd code{font-family:ui-monospace,Menlo,Consolas,monospace; font-size:.85em; background:var(--panel); padding:1px 4px; border-radius:4px;}
#gd sub, #gd sup{font-size:.72em;}
#gd a{color:var(--accent);}
#gd .tab-btn{transition:background .15s ease, color .15s ease;}
#gd #out-ehrhart mjx-container{max-width:100%; overflow-x:auto; overflow-y:hidden;}
#gd #out-ehrhart mjx-container[display="true"]{margin:.7rem 0;}
#gd .toolbar button{transition:background .12s ease;}
#gd .lmn{display:inline-flex; align-items:center; gap:7px; flex:0 0 auto; white-space:nowrap;}
#gd .blist{max-height:440px; overflow:auto; border:1px solid var(--line); border-radius:var(--radius); background:var(--panel); margin-top:.3rem;}
#gd .brow{display:flex; align-items:center; gap:12px; padding:5px 12px; flex-wrap:wrap;}
#gd .brow:nth-child(odd){background:var(--bg);}
#gd .bc{min-width:36px; text-align:right; color:var(--muted); font-family:ui-monospace,Menlo,monospace; font-size:.82rem;}
#gd .prod{color:var(--muted); margin:0 2px;}
#gd .listfoot{margin-top:.55rem; display:flex; align-items:center; gap:10px; flex-wrap:wrap;}
#gd .showmore{font-size:.85rem;}
#gd .etbl{max-height:470px; overflow:auto; margin-top:.2rem;}
#gd .etbl table{border-collapse:collapse; font-size:.9rem; width:100%;}
#gd .etbl td{border:1px solid var(--line); padding:5px 12px; vertical-align:middle;}
#gd .etbl td.lab{color:var(--muted); background:var(--panel); font-size:.82rem; white-space:nowrap;}
#gd .etbl td.kcol{text-align:center; color:var(--muted); white-space:nowrap; width:1%;}
#gd .wrap{ max-width:100%; padding:0.4rem 0 2.5rem; }
@media print{
  #gd .toolbar, #gd .runbar, #gd .listctl, #gd .listfoot, #gd #enginebar, #gd #engine,
  #gd .tabs, #gd #edgeerr{ display:none !important; }
  #gd .panel.hidden{ display:none !important; }
  #gd .panel{ border:none; padding:0; }
  #gd .blist, #gd .etbl, #gd ol.terms{ max-height:none !important; overflow:visible !important; }
  #gd textarea#edges{ border:none; resize:none; }
  #gd #structbox{ display:block; }
  #gd a{ color:inherit; }
}
</style>

<div id="gd">
<div class="wrap">
  <h1>Hypersimplex harmonics — interactive demos</h1>
  <p class="lede">
    Companion to <em>Graded Ehrhart Theory for Hypersimplices</em>. Draw a loopless multigraph
    <em>G</em> below. Each tab runs a different construction from the paper on it. Click empty
    space to add a vertex, click two vertices to connect (click a pair again for a parallel edge);
    switch the mode button to delete. You can also type the edge list directly.
    Email me if you find any errors or want some specific function added.
  </p>

  <div class="toolbar">
    <button id="mode">Mode: add / connect</button>
    <button id="undo" title="⌘Z / Ctrl+Z">Undo</button>
    <button id="redo" title="⌘⇧Z / Ctrl+Y">Redo</button>
    <button id="clear">Clear</button>
    <button id="example">Load example</button>
    <button id="random">Random for ℓ,m,n</button>
    <button id="fit" title="set ℓ, m, n to the smallest values that make the drawn graph valid">Fit ℓ,m,n</button>
    <button id="permalink" title="copy a link that reproduces this graph and these parameters">Copy link</button>
    <button id="layout" title="line layout puts the vertices in label order with every edge an arc above them, so nested (crossing-free-violating) pairs are visible">Layout: free</button>
    <button id="estyle" title="draw parallel edges as fanned arcs, or as one edge with a multiplicity label">Edges: arcs</button>
    <button id="overlay" title="colour vertices by block and print the deficit m - deg(v) above each">Blocks: off</button>
    <span class="spacer"></span>
    <span class="lmn">
      <label>&#8467;</label><input id="lval" type="number" min="1" value="4">
      <label>m</label><input id="mval" type="number" min="1" value="3">
      <label>n</label><input id="nval" type="number" min="1" value="8">
    </span>
  </div>
  <svg id="cv" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet"
       role="application" aria-label="graph drawing canvas; use the edge list box below for keyboard editing"></svg>
  <div id="spares"></div>
  <details id="structbox">
    <summary>blocks, cut-edges and deficits</summary>
    <div id="structout"></div>
  </details>
  <div class="row">
    <div class="col">
      <div class="k">edges — editable; e.g. <code>(1,3),(2,4),(3,4)x2</code> or <code>1-3 2-4 3-4 3-4</code></div>
      <textarea id="edges" spellcheck="false" aria-label="edge list"></textarea>
      <div id="edgeerr"></div>
    </div>
    <div class="col" style="max-width:240px"><div id="stats"></div><div id="valid"></div></div>
  </div>

  <div class="tabs">
    <button class="tab-btn active" data-tab="factor">Factor</button>
    <button class="tab-btn" data-tab="basis">Maximal basis</button>
    <button class="tab-btn" data-tab="ehrhart">Ehrhart series</button>
  </div>

  <div class="panel" id="panel-factor">
    <p class="desc">Express &delta;<sub>G</sub> as an exact integer combination of products of
      <em>m</em> degree-1 (matching) tableaux, verify the identity, and report the structures that
      obstruct writing &delta;<sub>G</sub> as a <em>single</em> such product.</p>
    <div class="runbar">
      <button class="run primary" data-run="factor">Run factorization</button>
      <button class="stop" data-stop="factor" hidden>Stop</button>
      <span class="elapsed" data-el="factor"></span>
    </div>
    <div class="tabout" id="out-factor" aria-live="polite"></div>
  </div>
  <div class="panel hidden" id="panel-basis">
    <p class="desc">Reduce &delta;<sub>G</sub> onto the maximal-tableau basis
      S<sub>max</sub>(&#8467;,m,n) of V<sub>m&Delta;&#8467;</sub>, giving its unique coordinate vector.</p>
    <div class="runbar">
      <button class="run primary" data-run="basis">Reduce to basis</button>
      <button class="stop" data-stop="basis" hidden>Stop</button>
      <span class="elapsed" data-el="basis"></span>
    </div>
    <div class="tabout" id="out-basis" aria-live="polite"></div>
  </div>
  <div class="panel hidden" id="panel-ehrhart">
    <p class="desc">The graded <em>q</em>-Ehrhart series of the cube slice
      P<sub>&#8467;,m,n</sub> in closed rational form, its interior series, and an exact
      <em>q</em>-reciprocity check. Uses &#8467;, m and n; taking m = 1 gives the hypersimplex
      &Delta;<sub>&#8467;,n</sub>.</p>
    <div class="runbar">
      <button class="run primary" data-run="ehrhart">Compute series</button>
      <button class="stop" data-stop="ehrhart" hidden>Stop</button>
      <span class="elapsed" data-el="ehrhart"></span>
    </div>
    <div class="tabout" id="out-ehrhart" aria-live="polite"></div>
  </div>

  <div id="engine">math engine: loads in the background</div>
  <div id="enginebar"><button id="resetengine">reset engine</button></div>
</div>

<script type="text/x-python" id="straighten-src">
"""
Exact straightening of  delta_G = prod_{(i,j) in G, i<j}(x_i - x_j)  via the quadratic relation
        (a-c)(b-d) = (a-b)(c-d) + (a-d)(b-c)     for a<b<c<d,
i.e. the 'crossing' pair (a,d),(b,c) is rewritten
        delta_{(a,d)(b,c)}  =  delta_{(a,c)(b,d)}  -  delta_{(a,b)(c,d)} .
Repeatedly uncrossing reduces delta_G to a combination of NON-CROSSING (two-row semistandard)
tableaux.  Everything is exact integer arithmetic -- no linear system, no conditioning.

NOTE: the non-crossing tableaux SPAN but are not linearly independent, so the output of
straighten() is a representation, not a normal form.  For a genuine normal form use the
maximal-tableau basis (see demos.maximal_basis).
"""
from collections import defaultdict

def _canon(cols): return tuple(sorted(cols))

def _violation(cols):
    # cols is sorted by (a,b); non-crossing <=> bottoms weakly increasing.  Return the first
    # adjacent descent (i,i+1): there a_i<a_{i+1} and b_i>b_{i+1}, a genuine crossing.  O(d).
    for i in range(len(cols) - 1):
        if cols[i][1] > cols[i + 1][1]:
            return (i, i + 1)
    return None

_STRAIGHTEN_CACHE = {}
_CACHE_CAP = 4000
def _cache_put(key, val):
    if len(_STRAIGHTEN_CACHE) >= _CACHE_CAP:      # cheap bound: drop ~half, keep it O(1) amortised
        for k in list(_STRAIGHTEN_CACHE)[:_CACHE_CAP // 2]:
            del _STRAIGHTEN_CACHE[k]
    _STRAIGHTEN_CACHE[key] = val

def straighten(G_edges, max_steps=10**7):
    G = _canon((min(i, j), max(i, j)) for i, j in G_edges)
    return _straighten_core(G, max_steps)
def _straighten_core(G, max_steps=10**7):
    """Straighten an already-canonical sorted tuple of (a,b) columns (a<b).  Callers that already
       hold such a tuple skip the per-edge min/max + full re-sort in straighten()."""
    cached = _STRAIGHTEN_CACHE.get(G)
    if cached is not None:
        return dict(cached), 0
    combo = defaultdict(int); combo[G] = 1
    stack = [G]                                # worklist of tableaux that may still cross
    steps = 0
    while stack:
        T = stack.pop()
        c = combo.get(T, 0)
        if c == 0: continue
        v = _violation(T)
        if v is None: continue                 # already non-crossing
        i, j = v                               # j == i+1 (adjacent descent)
        del combo[T]
        p, q = T[i]; r, s = T[j]
        rest = T[:i] + T[i+2:]                  # tuple splice (both crossing cols are adjacent)
        T1 = _canon(rest + ((p, s), (r, q)))   #  + (a-c)(b-d)
        T2 = _canon(rest + ((p, r), (s, q)))   #  - (a-b)(c-d)
        combo[T1] += c; combo[T2] -= c
        stack.append(T1); stack.append(T2)
        steps += 1
        if steps > max_steps: raise RuntimeError("did not terminate")
    res = {T: c for T, c in combo.items() if c != 0}
    _cache_put(G, res)
    return dict(res), steps

def reset_caches():
    _STRAIGHTEN_CACHE.clear()

# ---- exact monomial expansion: an INDEPENDENT check that does not reuse the straightening code ----
def expand(cols, n, cap=400000):
    """Expand prod (x_a - x_b) into the monomial basis exactly.  Returns {exponent tuple: int},
       or None if the intermediate size exceeds `cap` (caller should fall back)."""
    poly = {(0,) * n: 1}
    for (a, b) in cols:
        ia, ib = a - 1, b - 1
        nxt = defaultdict(int)
        for ev, c in poly.items():
            u = list(ev); u[ia] += 1; nxt[tuple(u)] += c
            u = list(ev); u[ib] += 1; nxt[tuple(u)] -= c
        poly = {k: v for k, v in nxt.items() if v}
        if len(poly) > cap: return None
    return poly

def expand_sum(terms, n, cap=400000):
    """terms: iterable of (coeff, cols).  Exact monomial expansion of the whole sum, or None."""
    total = defaultdict(int)
    for c, cols in terms:
        p = expand(cols, n, cap)
        if p is None: return None
        for ev, cc in p.items(): total[ev] += c * cc
        if len(total) > cap: return None
    return {k: v for k, v in total.items() if v}

# ---- probabilistic fallback (fresh seed every call, so repeated runs give new evidence) ----
def _dval(cols, pt):
    v = 1
    for (a, b) in cols: v *= (pt[a-1] - pt[b-1])
    return v
def verify_points(lhs_cols, terms, n, trials=12):
    import random
    rng = random.Random()                       # fresh entropy: not a fixed seed
    for _ in range(trials):
        pt = rng.sample(range(1, 8*n), n)
        if _dval(lhs_cols, pt) != sum(c * _dval(cols, pt) for c, cols in terms): return False
    return True

def verify(lhs_cols, terms, n, cap=400000, trials=12):
    """Returns (ok, mode) with mode in {'exact','points'}.  Tries the exact monomial identity
       first; falls back to random integer points when the expansion would be too large."""
    L = expand(lhs_cols, n, cap)
    if L is not None:
        R = expand_sum(terms, n, cap)
        if R is not None: return (L == R), 'exact'
    return verify_points(lhs_cols, terms, n, trials), 'points'

if __name__ == "__main__":
    tests = [
        ([(1,2),(2,3),(3,4),(1,4)], 4, "4-cycle"),
        ([(1,2),(2,3),(1,3)], 5, "triangle"),
        ([(1,3),(2,4)], 4, "already standard {(1,3),(2,4)}"),
        ([(1,4),(2,3)], 4, "crossing {(1,4),(2,3)}"),
    ]
    for e, n, name in tests:
        res, st = straighten(e)
        ok, mode = verify(e, [(c, list(T)) for T, c in res.items()], n)
        print(f"{name:28s}: {len(res)} std tableaux, {st} steps, verified={ok} ({mode})")
        for T, c in sorted(res.items()):
            print(f"     {c:+d} * {list(T)}")
        print()

</script>
<script type="text/x-python" id="factor-src">
"""
Factor delta_G (G in G(l,m,n)) into products of degree-1 (dilate-1) standard tableaux, using the
paper's constructive proof plus the linear and quadratic relations.  Exact, output-sensitive.

  m=1  : straighten the matching -> standard degree-1 tableaux.
  m=2  : if bipartite (no odd cycle) proper 2-edge-color -> product of two matchings.  Else break
         an odd cycle with the linear relation  (x_a-x_b) = (x_a-x_w) - (x_b-x_w)  for a spare
         vertex w (one exists because l <= n/2); recurse.
  m>=3 : split the edges T = A(deg<=2) . B(deg<=m-2); recurse on B.
"""
from collections import defaultdict
from straighten import straighten, _canon

# counters for what the construction actually had to do, so the UI can describe the real run
# instead of guessing from global graph properties
STATS = {"odd_breaks": 0, "quad_merges": 0, "raises": 0, "spares": []}
def reset_stats():
    STATS["odd_breaks"] = 0; STATS["quad_merges"] = 0; STATS["raises"] = 0; STATS["spares"] = []

def _canon_edge(u, v):           # (x_u - x_v) as (edge, sign)
    return ((u, v), 1) if u < v else ((v, u), -1)

def two_color(edges):
    """proper 2-edge-coloring of a degree<=2 graph; returns (M0,M1) or raises on odd cycle."""
    adj = defaultdict(list)
    for idx, (a, b) in enumerate(edges):
        adj[a].append(idx); adj[b].append(idx)
    color = [-1]*len(edges)
    for start in range(len(edges)):
        if color[start] != -1: continue
        color[start] = 0; stack = [start]
        while stack:
            ei = stack.pop()
            for v in edges[ei]:
                for ej in adj[v]:
                    if ej == ei: continue
                    if color[ej] == -1:
                        color[ej] = 1-color[ei]; stack.append(ej)
                    elif color[ej] == color[ei]:
                        raise ValueError("odd cycle")
    return ([edges[i] for i in range(len(edges)) if color[i] == 0],
            [edges[i] for i in range(len(edges)) if color[i] == 1])

def _odd_cycle(edges):
    deg = defaultdict(int); adj = defaultdict(list)
    for idx, (a, b) in enumerate(edges):
        deg[a] += 1; deg[b] += 1; adj[a].append(idx); adj[b].append(idx)
    seen = [False]*len(edges)
    for s in range(len(edges)):
        if seen[s]: continue
        comp = []; verts = set(); stack = [s]; seen[s] = True
        while stack:
            ei = stack.pop(); comp.append(ei)
            for v in edges[ei]:
                verts.add(v)
                for ej in adj[v]:
                    if not seen[ej]: seen[ej] = True; stack.append(ej)
        if len(comp) % 2 == 1 and all(deg[v] == 2 for v in verts):
            return [edges[i] for i in comp]
    return None

def _odd_cycles(edges):
    deg = defaultdict(int); adj = defaultdict(list)
    for idx,(a,b) in enumerate(edges): deg[a]+=1; deg[b]+=1; adj[a].append(idx); adj[b].append(idx)
    seen=[False]*len(edges); cycles=[]
    for s in range(len(edges)):
        if seen[s]: continue
        comp=[]; verts=set(); stack=[s]; seen[s]=True
        while stack:
            ei=stack.pop(); comp.append(ei)
            for v in edges[ei]:
                verts.add(v)
                for ej in adj[v]:
                    if not seen[ej]: seen[ej]=True; stack.append(ej)
        if len(comp)%2==1 and all(deg[v]==2 for v in verts):
            cycles.append([edges[i] for i in comp])
    return cycles

def _spare(H, cycle_verts, n):
    deg = defaultdict(int)
    for a,b in H: deg[a]+=1; deg[b]+=1
    for v in range(1,n+1):                       # prefer isolated vertex not in the cycle
        if v not in cycle_verts and deg[v]==0: return v
    for v in range(1,n+1):                       # else any degree<=1 vertex not in the cycle
        if v not in cycle_verts and deg[v]<=1: return v
    raise RuntimeError(
        "no spare vertex is available in 1..n to break an odd cycle. Raise n (the odd-cycle "
        "argument needs a vertex outside the cycle, which is guaranteed when l <= n/2).")

def _quad_rewrite(e1, e2):
    """(x_p-x_q)(x_r-x_s) with 4 distinct verts -> the other two pairings.  Returns [(coeff,[eA,eB]),...]."""
    w,x,y,z = sorted(set(e1)|set(e2))
    nested=[(w,z),(x,y)]; cross=[(w,y),(x,z)]; side=[(w,x),(y,z)]
    key=lambda cols: frozenset(frozenset(c) for c in cols)
    cur=key([tuple(e1),tuple(e2)])
    if cur==key(nested): return [(1,cross),(-1,side)]   # nested = cross - side
    if cur==key(side):   return [(1,cross),(-1,nested)] # side   = cross - nested
    return [(1,side),(1,nested)]                        # cross  = side + nested

def factor_deg2(A, l, n):
    """A: degree<=2 edges. Returns {(M0_std,M1_std): coeff}.  Stays within vertices 1..n."""
    result = defaultdict(int)
    stack = [(tuple(A), 1)]
    while stack:
        H, c = stack.pop()
        ocs = _odd_cycles(list(H))
        if len(ocs) >= 2:
            e1 = ocs[0][0]; e2 = ocs[1][0]          # merge two odd cycles (odd+odd -> even)
            rest = list(H); rest.remove(e1); rest.remove(e2)
            STATS["quad_merges"] += 1
            for coef, pair in _quad_rewrite(e1, e2):
                stack.append((tuple(rest + [tuple(sorted(pair[0])), tuple(sorted(pair[1]))]), c*coef))
        elif len(ocs) == 1:
            cyc = ocs[0]; cv = set(v for e in cyc for v in e)
            a,b = cyc[0]; w = _spare(list(H), cv, n)
            STATS["odd_breaks"] += 1
            if w not in STATS["spares"]: STATS["spares"].append(w)
            e_aw,s_aw=_canon_edge(a,w); e_bw,s_bw=_canon_edge(b,w)
            rest=list(H); rest.remove((a,b))
            stack.append((tuple(rest+[e_aw]), c*s_aw))
            stack.append((tuple(rest+[e_bw]), -c*s_bw))
        else:
            M0,M1 = two_color(list(H))
            s0=straighten(M0)[0]; s1=straighten(M1)[0]
            for T0,aa in s0.items():
                for T1,bb in s1.items():
                    result[tuple(sorted((T0,T1)))] += c*aa*bb
    return {k:v for k,v in result.items() if v!=0}

# ================= m >= 3 : split T = A(deg<=2) . B(deg<=m-2), recurse =================
def _extract_AB(T, l, m):
    """assign edges to A (deg<=2, <=2l edges) or B (deg<=m-2, <=(m-2)l edges). Return (A,B) or None.
       Lower-bound pruning: each v needs at least deg(v)-(m-2) of its edges in A, so a B-assignment
       that puts that out of reach is pruned at once -> failure is detected fast (no 2^E blow-up)."""
    edges = list(T)
    deg = defaultdict(int)
    for a, b in edges: deg[a] += 1; deg[b] += 1
    lo = {v: max(0, deg[v] - (m-2)) for v in deg}    # min # of v's edges that must be in A
    rem = dict(deg)                                  # v's still-undecided incident edges
    A = []; B = []; dA = defaultdict(int); dB = defaultdict(int)
    order = sorted(range(len(edges)),
                   key=lambda e: -(deg[edges[e][0]] + deg[edges[e][1]]))  # tight vertices first
    def bt(k):
        if k == len(edges): return True
        a, b = edges[order[k]]
        rem[a] -= 1; rem[b] -= 1
        # try A
        if dA[a] < 2 and dA[b] < 2 and len(A) < 2*l:
            A.append((a, b)); dA[a] += 1; dA[b] += 1
            if bt(k+1): rem[a] += 1; rem[b] += 1; return True
            A.pop(); dA[a] -= 1; dA[b] -= 1
        # try B, but only if both endpoints can still reach their A lower bound
        if (dB[a] < m-2 and dB[b] < m-2 and len(B) < (m-2)*l
                and dA[a] + rem[a] >= lo[a] and dA[b] + rem[b] >= lo[b]):
            B.append((a, b)); dB[a] += 1; dB[b] += 1
            if bt(k+1): rem[a] += 1; rem[b] += 1; return True
            B.pop(); dB[a] -= 1; dB[b] -= 1
        rem[a] += 1; rem[b] += 1
        return False
    return (A, B) if bt(0) else None

def _deg(edges):
    d = defaultdict(int)
    for a, b in edges: d[a] += 1; d[b] += 1
    return d

def _W(T):
    return sum(a + b for a, b in T)                          # total endpoint sum; raise increases it

def _find_raise(T, m, n):
    """T non-crossing but unsplittable => it is not maximal.  Find an edge (a,b) whose bottom can
       be raised: smallest c with b < c <= n and deg_T(c) < m (room for c).  Return
       (edge_index, c), else None if T is maximal."""
    d = _deg(T)
    for i, (a, b) in enumerate(T):
        for c in range(b + 1, n + 1):                        # smallest raise -> compact output
            if d[c] < m:                                     # a<b<c so c!=a; multigraph edges ok
                return (i, c)
    return None

class Unsplittable(Exception):
    """A maximal tableau that admits no A.B split: delta_G is genuinely not a product of this
       shape for these parameters."""
    def __init__(self, T): self.T = T; Exception.__init__(self, str(list(T)))

def maximalize(G, l, m, n):
    """Reduce delta_G to a combination of SPLITTABLE (maximal) non-crossing tableaux, using the
       linear relation  delta_{(a,b)+H} = delta_{(a,c)+H} - delta_{(b,c)+H}  to raise non-maximal
       tableaux.  Worklist collects like terms; raises strictly increase W and straightening
       preserves W, so the state graph is acyclic (terminates, bounded by #reachable tableaux)."""
    import heapq
    expr = defaultdict(int)
    heap = []
    for t, c in straighten(G)[0].items():
        expr[t] += c
        heapq.heappush(heap, (_W(t), t))
    final = defaultdict(int)
    seen = set()
    while heap:
        _, T = heapq.heappop(heap)                           # lowest W first (O(log) not O(|expr|))
        if T in seen:
            continue
        seen.add(T)
        c = expr.pop(T, 0)
        if c == 0:
            continue
        if _extract_AB(T, l, m) is not None:                 # maximal enough to split
            final[T] += c
            continue
        r = _find_raise(T, m, n)
        if r is None:
            raise Unsplittable(T)
        i, cc = r
        STATS["raises"] += 1
        a, b = T[i]
        rest = [T[k] for k in range(len(T)) if k != i]
        for coeff, ne in ((c, (a, cc)), (-c, (b, cc))):      # + (a,c)H   - (b,c)H
            for t2, c2 in straighten(rest + [tuple(sorted(ne))])[0].items():
                if t2 not in seen:                           # children have strictly larger W
                    if t2 not in expr:
                        heapq.heappush(heap, (_W(t2), t2))
                    expr[t2] += coeff * c2
                elif coeff * c2:
                    # W strictly increases on a raise and is preserved by straightening, so this
                    # branch is unreachable; guard against a silent drop if that ever changes.
                    raise RuntimeError("internal: contribution to an already-finalised tableau")
    return {k: v for k, v in final.items() if v != 0}

_MEMO = {}
_MEMO_CAP = 2000
def reset_caches():
    _MEMO.clear()

def factor_deg1(T, l, m, n):
    """Return dict { (tab_1,...,tab_m) : coeff } expressing delta_T as a sum of products of m
       standard degree-1 tableaux.  m>=3: reduce to maximal tableaux, split each."""
    T = _canon((min(i, j), max(i, j)) for i, j in T)
    if m == 1:
        return {(M,): c for M, c in straighten(list(T))[0].items()}
    if m == 2:
        return {tuple(sorted(k)): v for k, v in factor_deg2(list(T), l, n).items()}
    key = (T, l, m, n)
    if key in _MEMO:
        return _MEMO[key]
    out = defaultdict(int)
    for Tmax, cT in maximalize(list(T), l, m, n).items():
        A, B = _extract_AB(Tmax, l, m)                       # guaranteed to succeed
        fa = factor_deg2(A, l, n)                            # {(M0,M1): c}
        fb = factor_deg1(B, l, m-2, n)                       # {(m-2)-tuple: c}
        for (M0, M1), ca in fa.items():
            for tb, cb in fb.items():
                out[tuple(sorted((M0, M1) + tb))] += cT*ca*cb
    res = {k: v for k, v in out.items() if v != 0}
    if len(_MEMO) >= _MEMO_CAP:
        for k in list(_MEMO)[:_MEMO_CAP // 2]: del _MEMO[k]
    _MEMO[key] = res
    return res

def express_deg1(G_edges, l, m, n):
    """Full pipeline: straighten G, then factor each tableau to degree-1 products."""
    reset_stats()
    res = factor_deg1(list((min(i, j), max(i, j)) for i, j in G_edges), l, m, n)
    return res

</script>
<script type="text/x-python" id="demos-src">
"""Supporting routines for the interactive demo tabs.  Pure-Python (no sympy), reuses
   straighten.py / factor.py.  Every function returns a JSON string for the browser."""
import json
from collections import defaultdict
from math import comb
import time, heapq, bisect
import straighten as _st
from straighten import (straighten, _straighten_core, _canon, _violation, _dval,
                        expand, expand_sum, verify, verify_points)
import factor as _fa
from factor import express_deg1, _extract_AB, maximalize, _W, _deg, Unsplittable

def reset_caches():
    _st.reset_caches(); _fa.reset_caches(); _CBIN.clear()
    return json.dumps({"ok": True})

def _lhat(l, n):
    return min(l, -(-n // 2))            # min(l, ceil(n/2))

# ==================================================================== factor
def factor_report(edges, l, m, n):
    try:
        E = [(min(a, b), max(a, b)) for a, b in edges]
        t0 = time.time()
        try:
            r = express_deg1(E, l, m, n)
        except Unsplittable as ex:
            return json.dumps({"ok": False, "verdict": "obstructed",
                               "tableau": [list(c) for c in ex.T],
                               "error": _obstruction_message(E, l, m, n, ex.T)})
        dt = time.time() - t0
        ok, mode = verify(E, [(c, [e for tab in prod for e in tab]) for prod, c in r.items()], n)
        terms = [{"c": c, "tabs": [[list(e) for e in tab] for tab in prod]}
                 for prod, c in sorted(r.items())]
        info = _structure(E, l, m, n, len(r))
        return json.dumps({"ok": True, "verdict": "factored", "verified": bool(ok),
                           "mode": mode, "count": len(r), "time": dt, "terms": terms,
                           "structure": info})
    except Exception as ex:
        msg = str(ex)
        if "did not terminate" in msg:
            msg = ("This graph is too dense for the in-browser engine: its straightened form is "
                   "exponentially large. Try fewer edges or a smaller n.")
        return json.dumps({"ok": False, "verdict": "error", "error": msg})

def _obstruction_message(E, l, m, n, T):
    lh = _lhat(l, n); thresh = (2*lh + 3) / 3.0
    parts = ["The reduction reached a maximal tableau that admits no split into a degree-2 part "
             "and a degree-(m\u22122) part, so \u03b4_G is not a combination of products of this "
             "shape for these parameters."]
    if m % 2 == 1 and m < thresh:
        parts.append("This is expected here: m = %d is odd and below the threshold "
                     "(2\u2113\u0302+3)/3 = %.2f, where \u2113\u0302 = min(\u2113, \u2308n/2\u2309) = %d "
                     "\u2014 the regime in which G(\u2113,m,n) = G(\u2113,2,n)\u00b7G(\u2113,m\u22122,n) "
                     "can fail." % (m, thresh, lh))
    else:
        parts.append("This is unexpected for m = %d with \u2113\u0302 = %d (threshold %.2f) \u2014 "
                     "please report this input." % (m, lh, thresh))
    return " ".join(parts)

def _structure(E, l, m, n, nprod):
    lh = _lhat(l, n); thresh = (2*lh + 3) / 3.0
    colorable, why, nodes = _edge_colorable(E, m)
    st = _fa.STATS
    return {"nprod": nprod, "colorable": colorable, "why": why, "nodes": nodes,
            "strict": bool(m % 2 == 1 and m < thresh), "lhat": lh,
            "threshold": round(thresh, 2), "odd_m": bool(m % 2),
            "odd_breaks": st["odd_breaks"], "quad_merges": st["quad_merges"],
            "raises": st["raises"], "spares": sorted(st["spares"])}

# ==================================================================== Ehrhart
_CBIN = {}
def _c(d, m, n):
    """#{weak compositions of d into n parts, each at most m}, by inclusion-exclusion:
         c(d,m,n) = sum_j (-1)^j C(n,j) C(d - j(m+1) + n - 1, n - 1).
       O(d/(m+1)) per coefficient and no array is built, so large n stays cheap -- the old
       route convolved the whole (1+q+...+q^m)^n array even when only d <= k*l was needed."""
    if d < 0 or m < 0 or n <= 0: return 0
    key = (d, m, n)
    hit = _CBIN.get(key)
    if hit is not None: return hit
    tot = 0
    step = m + 1
    for j in range(d // step + 1):
        if j > n: break
        tot += (-1)**j * comb(n, j) * comb(d - j*step + n - 1, n - 1)
    if len(_CBIN) > 300000: _CBIN.clear()
    _CBIN[key] = tot
    return tot
def _delta(d, m, n): return _c(d, m, n) - _c(d-1, m, n)

def _qadd(a, b):
    L = max(len(a), len(b)); r = [0]*L
    for i, x in enumerate(a): r[i] += x
    for i, y in enumerate(b): r[i] += y
    return r
def _qmul(a, b):
    if not a or not b: return []
    r = [0]*(len(a)+len(b)-1)
    for i, x in enumerate(a):
        if x:
            for j, y in enumerate(b): r[i+j] += x*y
    return r

def _den_factors(l, n, M):
    """Multiset of exponents a, one per denominator factor (1 - q^a t):
       (1 - q^l t)^{n-1} * prod_{j=0}^{ceil(l/M)-1} (1 - q^{jM} t)."""
    r = -(-l // M)
    return [l]*(n-1) + [j*M for j in range(r)]

def _den_tlist(l, n, M):
    D = [[1]]
    for a in _den_factors(l, n, M):
        new = [[] for _ in range(len(D)+1)]
        for k in range(len(D)):
            new[k] = _qadd(new[k], D[k])
            new[k+1] = _qadd(new[k+1], [0]*a + [-x for x in D[k]])
        D = new
    return D

def _series_tlist(l, n, K, M, interior=False):
    """Coefficient of t^k, as a q-polynomial, of the defining series:
       E    = sum_k sum_{d<=k*l}   delta(d, k*M,   n) q^d t^k
       Ebar = sum_k sum_{d<=k*l-n} delta(d, k*M-2, n) q^d t^k"""
    A = []
    for k in range(K+1):
        top = (k*l - n) if interior else (k*l)
        mm = (k*M - 2) if interior else (k*M)
        A.append([_delta(d, mm, n) for d in range(0, top+1)] if top >= 0 else [])
    return A

def _num_tlist(l, n, M, interior=False, margin=6):
    """Numerator of the closed form, as a list (indexed by power of t) of q-polynomials.
       `margin` extra coefficients past the denominator degree are checked to vanish; if they do
       not, the numerator degree exceeds the predicted bound and we refuse to guess."""
    D = _den_tlist(l, n, M); degD = len(D)-1; K = degD+margin
    A = _series_tlist(l, n, K, M, interior=interior)
    def prod_coeff(k):
        acc = []
        for j in range(len(D)):
            i = k-j
            if 0 <= i <= K: acc = _qadd(acc, _qmul(D[j], A[i]))
        return acc
    num = [prod_coeff(k) for k in range(degD+1)]
    for k in range(degD+1, K+1):
        if any(x != 0 for x in prod_coeff(k)):
            raise ValueError(
                "the numerator degree exceeded the predicted denominator degree by more than the "
                "safety margin, so the closed form was not computed. Please report this input.")
    return num

def _texp(e): return '' if e == 1 else ('^{%d}' % e)     # q^e / t^e in LaTeX (caller: e>=1)
def _qp_tex(qp):
    terms = [(c, e) for e, c in enumerate(qp) if c]
    if not terms: return '0'
    out = ''
    for i, (c, e) in enumerate(terms):
        mono = '' if (abs(c) == 1 and e > 0) else str(abs(c))
        if e > 0: mono += 'q' + _texp(e)
        out += (('-' if c < 0 else '') + mono) if i == 0 else ((' - ' if c < 0 else ' + ') + mono)
    return out

def _qshift(p, a): return [0]*a + list(p)
def _divide_factor(N, a):
    """Divide numerator N (tlist) by (1 - q^a t); return the quotient tlist, or None if it does
       not divide evenly.  Synthetic division: c_k = b_k - q^a b_{k-1}, so b_k = c_k + q^a b_{k-1}."""
    d = len(N) - 1
    if d < 0: return None
    if d == 0: return [] if not any(N[0]) else None
    Q = []; prev = []
    for k in range(d):                                # b_0 .. b_{d-1}
        ck = N[k] if k < len(N) else []
        bk = _qadd(ck, _qshift(prev, a))
        Q.append(bk); prev = bk
    cd = N[d] if d < len(N) else []                   # remainder: c_d + q^a b_{d-1} must vanish
    if any(x != 0 for x in _qadd(cd, _qshift(Q[-1], a))): return None
    while len(Q) > 1 and not any(Q[-1]): Q.pop()
    return Q

def _reduce_denominator(numE, numB, l, n, M):
    """Cancel any denominator factor (1 - q^a t) dividing BOTH numerators (keeping a shared
       denominator).  The predicted reduction is the exponent n-1 -> n-2 exactly when n >= 3 and
       2l = nM; anything else is reported so it can be looked at."""
    factors = _den_factors(l, n, M)
    changed = True
    while changed:
        changed = False
        for idx, a in enumerate(factors):
            qE = _divide_factor(numE, a); qB = _divide_factor(numB, a)
            if qE is not None and qB is not None:
                numE, numB = qE, qB; factors.pop(idx); changed = True; break
    return numE, numB, factors

def _den_tex_factors(factors):
    from collections import Counter
    cnt = Counter(factors); out = ''
    for a in sorted(cnt):
        base = '(1-t)' if a == 0 else '(1-q' + _texp(a) + 't)'
        out += base + (('^{%d}' % cnt[a]) if cnt[a] > 1 else '')
    return out

def _coeff(num, k, e):
    if k < 0 or k >= len(num): return 0
    row = num[k]
    return row[e] if 0 <= e < len(row) else 0

def _recip_exact(numE, numB, n, factors):
    """Exact check of  q^{n-1} Ebar(t,q) = (-1)^n E(1/t,1/q).
       With D = prod (1 - q^a t) over `factors` (F factors, total q-degree S) one has
       D(1/t,1/q) = (-1)^F q^{-S} t^{-F} D(t,q), so the identity is equivalent to the finite
       coefficient identity  Nbar_{k, e-(n-1)} = (-1)^{n+F} N_{F-k, S-e}  for all k, e."""
    F = len(factors); S = sum(factors); sgn = (-1)**((n+F) % 2)
    emaxE = max([len(r) for r in numE if r] + [0])
    emaxB = max([len(r) for r in numB if r] + [0])
    kmax = max(len(numE), len(numB), F) + 1
    emax = max(emaxE + n, emaxB + n, S + n) + 2
    for k in range(kmax + 1):
        for e in range(emax + 1):
            if _coeff(numB, k, e - (n-1)) != sgn * _coeff(numE, F - k, S - e):
                return False
    return True

def ehrhart_report(l, m, n):
    try:
        t0 = time.time()
        lmax = (n*m) // 2
        if l < 1 or n < 1 or m < 1:
            return json.dumps({"ok": False, "error": "need l, m, n >= 1."})
        if l > lmax:
            alt = n*m - l
            if alt >= 1:
                return json.dumps({"ok": False, "error":
                    "l = %d exceeds l_max = floor(n*m/2) = %d. The slices P(l,m,n) and P(nm-l,m,n) "
                    "are affinely equivalent, so use l = %d instead." % (l, lmax, alt)})
            if alt == 0:
                return json.dumps({"ok": False, "error":
                    "l = nm = %d: the slice is the single point (m,...,m)." % (n*m)})
            return json.dumps({"ok": False, "error":
                "l = %d exceeds nm = %d, so the slice of the cube is empty." % (l, n*m)})
        numE = _num_tlist(l, n, m, False)
        numB = _num_tlist(l, n, m, True)
        factors = _den_factors(l, n, m)
        rec_ok = _recip_exact(numE, numB, n, factors)
        latt = [_c(l*k, k*m, n) for k in range(min(6, 2*l+2))]   # |L(k * P(l,m,n))|
        rE, rB, rfac = _reduce_denominator(numE, numB, l, n, m)
        reduced = len(rfac) < len(factors)
        half = (n >= 3 and 2*l == n*m)
        # the only predicted reduction is the exponent n-1 -> n-2 when n >= 3 and 2l = nm
        predicted = (len(factors) - len(rfac)) == (1 if half else 0)
        degN = max(len(rE), len(rB))
        rows = []                                                # per t-power: [k, coeff E, coeff Ebar]
        for k in range(degN):
            ce = _qp_tex(rE[k]) if k < len(rE) and any(rE[k]) else ""
            cb = _qp_tex(rB[k]) if k < len(rB) and any(rB[k]) else ""
            if ce or cb: rows.append([k, ce, cb])
        nonneg = all(c >= 0 for row in rE for c in row)
        nu = len(rfac); simplex = (l <= m)
        return json.dumps({"ok": True, "l": l, "m": m, "n": n,
            "den_tex": _den_tex_factors(rfac), "den_full_tex": _den_tex_factors(factors),
            "reduced": bool(reduced), "predicted": bool(predicted), "half": bool(half),
            "rows": rows, "time": time.time() - t0, "recip": bool(rec_ok), "lattice": latt,
            "nonneg": bool(nonneg), "nu": nu, "dim": n-1, "simplex": bool(simplex)})
    except Exception as ex:
        return json.dumps({"ok": False, "error": str(ex)})

# ==================================================================== edge colourability
def _chromatic_index_bounds(edges, m):
    """Decide chi'(G) <= m cheaply where possible.  Returns (verdict, reason) with verdict in
       {True, False, None}; None means 'search needed'.  delta_G is a SINGLE product of m
       degree-1 tableaux exactly when chi'(G) <= m, and deciding that in general is NP-hard,
       so it is worth settling the easy cases without any search."""
    if not edges: return True, "G has no edges"
    deg = defaultdict(int); mult = defaultdict(int)
    for a, b in edges:
        deg[a] += 1; deg[b] += 1; mult[(min(a,b), max(a,b))] += 1
    D = max(deg.values()); mu = max(mult.values())
    if D > m:
        return False, "a vertex has degree %d > m = %d, and chi' >= max degree" % (D, m)

    # density bound: chi'(G) >= ceil(|E(H)| / floor(|V(H)|/2)) for every subgraph H
    verts = sorted(deg)
    def density_fail(S):
        S = set(S)
        if len(S) < 2: return None
        k = len(S) // 2
        e = sum(1 for a, b in edges if a in S and b in S)
        need = -(-e // k)                                    # ceil(e/k)
        return (need, e, len(S)) if need > m else None

    cand = [verts]
    adj = defaultdict(set)
    for a, b in edges: adj[a].add(b); adj[b].add(a)
    seen = set()
    for v in verts:                                          # connected components
        if v in seen: continue
        comp = {v}; stack = [v]; seen.add(v)
        while stack:
            u = stack.pop()
            for w in adj[u]:
                if w not in seen: seen.add(w); comp.add(w); stack.append(w)
        cand.append(sorted(comp))
    if len(verts) <= 13:                                     # small odd subsets give the sharp bounds
        from itertools import combinations
        for r in (3, 5):
            if len(verts) >= r:
                cand.extend(combinations(verts, r))
    for S in cand:
        hit = density_fail(S)
        if hit:
            need, e, sz = hit
            return False, ("%d vertices carry %d edges, and %d edges need at least "
                           "ceil(%d/%d) = %d colours" % (sz, e, e, e, sz//2, need))

    if D + mu <= m:
        return True, ("max degree %d plus max edge multiplicity %d is at most m = %d "
                      "(Vizing's bound for multigraphs)" % (D, mu, m))
    col = {}; bip = True
    for sv in verts:
        if sv in col: continue
        col[sv] = 0; st = [sv]
        while st and bip:
            u = st.pop()
            for w in adj[u]:
                if w not in col: col[w] = 1-col[u]; st.append(w)
                elif col[w] == col[u]: bip = False; break
        if not bip: break
    if bip:
        return True, "G is bipartite with max degree %d <= m = %d (Koenig's theorem)" % (D, m)
    return None, None

def _edge_colorable(edges, m, node_cap=400000):
    """(verdict, reason, nodes).  Cheap bounds first; exact backtracking only if they fail."""
    v, why = _chromatic_index_bounds(edges, m)
    if v is not None: return v, why, 0
    E = list(edges); nE = len(E)
    vtoE = defaultdict(list)
    for i, (a, b) in enumerate(E): vtoE[a].append(i); vtoE[b].append(i)
    order = sorted(range(nE), key=lambda i: -(len(vtoE[E[i][0]]) + len(vtoE[E[i][1]])))
    color = [-1]*nE; nodes = [0]
    def bt(k):
        if k == nE: return True
        nodes[0] += 1
        if nodes[0] > node_cap: raise TimeoutError
        ei = order[k]; a, b = E[ei]; used = set()
        for ej in vtoE[a]:
            if color[ej] >= 0: used.add(color[ej])
        for ej in vtoE[b]:
            if color[ej] >= 0: used.add(color[ej])
        for cc in range(m):
            if cc not in used:
                color[ei] = cc
                if bt(k+1): return True
                color[ei] = -1
        return False
    try:
        ok = bt(0)
        return ok, ("an explicit %d-edge-colouring was found" % m) if ok else \
                   ("an exhaustive search of %d states found no %d-edge-colouring" % (nodes[0], m)), nodes[0]
    except TimeoutError:
        return None, ("the search hit its budget of %d states without deciding" % node_cap), nodes[0]

# ==================================================================== A.B split
def split_view(edges, l, m, n):
    try:
        E = [(min(a, b), max(a, b)) for a, b in edges]
        if m < 3:
            return json.dumps({"ok": False, "error": "the A.B split applies when m >= 3."})
        M = maximalize(list(E), l, m, n)
        key = _canon(E)
        chosen = key if key in M else next(iter(M))
        A, B = _extract_AB(chosen, l, m)
        used = sorted({v for e in chosen for v in e})
        return json.dumps({"ok": True, "maximal": [list(e) for e in chosen],
            "A": [list(e) for e in A], "B": [list(e) for e in B],
            "same_as_drawn": chosen == key, "nmax": len(M), "verts": used})
    except Unsplittable as ex:
        return json.dumps({"ok": False, "error": _obstruction_message(edges, l, m, n, ex.T)})
    except Exception as ex:
        return json.dumps({"ok": False, "error": str(ex)})

# ==================================================================== maximal basis
def _raise_to_max(T, m, n):
    """Greedy-maximal raise.  Scan edges RIGHT-TO-LEFT (greedy fills b_d first, then b_{d-1}, ...);
       raise the first raisable edge's bottom to the largest legal v.  This order visits ~6x fewer
       intermediate tableaux than left-to-right.  None <=> T is already maximal."""
    d = _deg(T)
    for k in range(len(T)-1, -1, -1):
        a, b = T[k]
        upper = T[k+1][1] if k+1 < len(T) else n
        for v in range(upper, b, -1):             # largest legal v, early return
            if v != a and d[v] < m: return (k, v)
    return None

def maximal_basis(G, l, m, n):
    """Express delta_G in the maximal-tableau basis S_max(l,m,n): raise EVERY tableau all the way
       to greedy-maximal (not merely splittable), via the linear relation.  Since S_max is a basis,
       the result is the unique coordinate vector -- a genuine normal form."""
    expr = defaultdict(int); heap = []
    for t, c in straighten(G)[0].items():
        expr[t] += c; heapq.heappush(heap, (_W(t), t))
    final = defaultdict(int); seen = set()
    while heap:
        _, T = heapq.heappop(heap)
        if T in seen: continue
        seen.add(T); c = expr.pop(T, 0)
        if c == 0: continue
        r = _raise_to_max(T, m, n)
        if r is None:
            final[T] += c; continue
        k, v = r; a, b = T[k]
        rest = [T[i] for i in range(len(T)) if i != k]      # still sorted; a<v and b<v are canonical
        for coeff, ne in ((c, (a, v)), (-c, (b, v))):
            child = list(rest); bisect.insort(child, ne)     # O(d) insert, no re-canonicalization
            for t2, c2 in _straighten_core(tuple(child))[0].items():
                if t2 not in seen:
                    if t2 not in expr: heapq.heappush(heap, (_W(t2), t2))
                    expr[t2] += coeff * c2
                elif coeff * c2:
                    raise RuntimeError("internal: contribution to an already-finalised tableau")
    return {kk: vv for kk, vv in final.items() if vv != 0}

def basis_view(edges, l, m, n):
    try:
        E = [(min(a, b), max(a, b)) for a, b in edges]
        t0 = time.time()
        M = maximal_basis(list(E), l, m, n)
        ok, mode = verify(E, [(c, list(T)) for T, c in M.items()], n)
        maximal_ok = all(_raise_to_max(T, m, n) is None for T in M)
        dt = time.time() - t0
        tabs = [{"c": c, "tab": [list(e) for e in T]} for T, c in sorted(M.items())]
        d = len(E)
        return json.dumps({"ok": True, "tabs": tabs, "count": len(M), "edges": d, "time": dt,
            "graded_dim": _delta(d, m, n), "verified": bool(ok and maximal_ok), "mode": mode,
            "maximal_ok": bool(maximal_ok)})
    except Exception as ex:
        return json.dumps({"ok": False, "error": str(ex)})

</script>

<script>
(function(){
  "use strict";
  const PY_BASE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
  const svg = document.getElementById('cv'), R = 16, VB = {w:600, h:400};
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function ellipse(k, shrink){               // k vertices evenly on an ellipse
    const cx=VB.w/2, cy=VB.h/2, rx=VB.w*0.40*(shrink||1), ry=VB.h*0.40*(shrink||1), out=[];
    for(let i=0;i<k;i++){ const a=-Math.PI/2 + 2*Math.PI*i/k; out.push([cx+rx*Math.cos(a), cy+ry*Math.sin(a)]); }
    return out;
  }

  let V = [], E = [], sel = -1, del = false, hist = [], future = [];
  let touched = false;                       // has the user typed into l/m/n since the last reset?
  let layout = 'free';                       // 'free' | 'line'
  let edgeStyle = 'arcs';                    // 'arcs' | 'labels'
  let overlay = 'none';                      // 'none' | 'blocks'
  const MAXV = 60, MAXN = 400;

  // ============================================================ engine (worker, main-thread fallback)
  const SRC = () => ({
    'straighten.py': $('straighten-src').textContent,
    'factor.py':     $('factor-src').textContent,
    'demos.py':      $('demos-src').textContent
  });
  const WORKER_BODY = `
    let py, booted;
    async function boot(base, srcs){
      importScripts(base + "pyodide.js");
      py = await loadPyodide({indexURL: base});
      for (const [name, text] of Object.entries(srcs)) py.FS.writeFile('/home/pyodide/'+name, text);
      py.runPython("import sys\\nsys.path.insert(0,'/home/pyodide')\\nimport json, demos");
    }
    self.onmessage = async ev => {
      const {id, kind, base, srcs, code} = ev.data;
      try{
        if(kind === 'boot'){ booted = boot(base, srcs); await booted; return self.postMessage({id, ok:true}); }
        await booted;
        self.postMessage({id, ok:true, result: py.runPython(code)});
      }catch(e){ self.postMessage({id, ok:false, error: String((e && e.message) || e)}); }
    };`;

  let mode = 'idle', worker = null, seq = 0, mainPy = null, pending = new Map();

  function setEngine(text, bad){
    $('engine').innerHTML = bad ? '<span class="bad">'+esc(text)+'</span>' : esc(text);
  }

  function startWorker(){
    if(worker) return worker;
    try{
      const url = URL.createObjectURL(new Blob([WORKER_BODY], {type:'text/javascript'}));
      worker = new Worker(url);
      worker.onmessage = ev => {
        const p = pending.get(ev.data.id);
        if(!p) return;
        pending.delete(ev.data.id);
        ev.data.ok ? p.res(ev.data.result) : p.rej(new Error(ev.data.error));
      };
      worker.onerror = () => {
        setEngine('background thread unavailable; falling back to the main thread', true);
        pending.forEach(p=>p.rej(new Error('background thread failed')));
        pending.clear(); worker = null; mode = 'main';
      };
      worker.postMessage({id: ++seq, kind:'boot', base: PY_BASE, srcs: SRC()});
      const bootId = seq;
      new Promise((res,rej)=>pending.set(bootId,{res,rej}))
        .then(()=>{ mode='worker'; setEngine('math engine ready (background thread)'); })
        .catch(e=>{ setEngine('engine failed to load: '+(e.message||e), true); worker=null; mode='main'; });
      return worker;
    }catch(e){ worker = null; mode = 'main'; return null; }
  }

  // ---- main-thread fallback (used only if Worker/Blob is unavailable) ----
  function loadScript(src){
    return new Promise((res, rej)=>{ const s=document.createElement('script'); s.src=src; s.async=true;
      s.onload=()=>res(); s.onerror=()=>rej(new Error('could not load the math engine from '+src+' (network / ad-blocker?)'));
      document.head.appendChild(s); });
  }
  let mainPromise = null;
  function loadMain(){
    if(mainPromise) return mainPromise;
    setEngine('loading math engine…');
    mainPromise = (async ()=>{
      if(typeof loadPyodide === 'undefined') await loadScript(PY_BASE+'pyodide.js');
      const py = await loadPyodide({indexURL: PY_BASE});
      const srcs = SRC();
      for(const k in srcs) py.FS.writeFile('/home/pyodide/'+k, srcs[k]);
      py.runPython("import sys\nsys.path.insert(0,'/home/pyodide')\nimport json, demos");
      setEngine('math engine ready'); mainPy = py; return py;
    })();
    mainPromise.catch(err=>{ setEngine((err && err.message) || err, true); mainPromise=null; });
    return mainPromise;
  }

  const nextPaint = () => new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));

  async function runPy(code){
    if(worker || mode === 'idle'){
      startWorker();
      if(worker){
        const id = ++seq;
        const p = new Promise((res,rej)=>pending.set(id,{res,rej}));
        worker.postMessage({id, kind:'run', code});
        return JSON.parse(await p);
      }
    }
    const py = await loadMain();
    await nextPaint();                 // let "computing…" paint before the main thread blocks
    return JSON.parse(py.runPython(code));
  }

  function stopEngine(){
    if(worker){
      worker.terminate(); worker = null;
      pending.forEach(p=>p.rej(new Error('stopped')));
      pending.clear();
      mode = 'idle';
      setEngine('engine stopped \u2014 it will restart on the next run');
    } else {
      setEngine('this browser is running the engine on the main thread, so a run in progress '
                + 'cannot be interrupted \u2014 reload the page to stop it', true);
    }
  }

  // prefetch quietly once the page is idle
  (window.requestIdleCallback || (f=>setTimeout(f,1500)))(()=>{ if(mode==='idle') startWorker(); });

  // ============================================================ drawing
  function push(){ hist.push(JSON.stringify([V,E])); if(hist.length>300) hist.shift(); future.length=0; }
  function labelEdges(){ return E.map(e=>[Math.min(e[0],e[1])+1, Math.max(e[0],e[1])+1]); }
  function deg(){ const d=V.map(_=>0); E.forEach(e=>{d[e[0]]++; d[e[1]]++;}); return d; }
  function nval(){ return Math.max(1, parseInt($('nval').value)||1); }

  function pos(ev){                        // map a pointer event to viewBox coords via the SVG's own CTM
    const p=ev.touches?ev.touches[0]:ev;
    const ctm=svg.getScreenCTM();
    if(ctm){ const pt=svg.createSVGPoint(); pt.x=p.clientX; pt.y=p.clientY;
             const s=pt.matrixTransform(ctm.inverse()); return [s.x,s.y]; }
    const r=svg.getBoundingClientRect();     // fallback
    return [ (p.clientX-r.left)/r.width*VB.w, (p.clientY-r.top)/r.height*VB.h ]; }

  function hitScale(){                       // viewBox units per CSS pixel, so hit areas stay ~finger-sized
    const r=svg.getBoundingClientRect();
    return r.width ? VB.w/r.width : 1;
  }

  // ---- effective vertex positions -------------------------------------------------
  // In "line" layout the vertices sit in label order along a horizontal line and every edge is
  // an arc above it.  That makes the nonnesting condition defining S(l,m,n) visible: a nested
  // pair of arcs -- edges (a,d) and (b,c) with a < b < c < d -- is exactly the forbidden pattern.
  const LINE_Y = VB.h*0.74;
  function linePositions(){
    const k=V.length; if(!k) return [];
    const pad=Math.min(60, VB.w/(k+2)), span=VB.w-2*pad;
    return Array.from({length:k}, (_,i)=> [pad + (k===1?span/2:span*i/(k-1)), LINE_Y]);
  }
  function P(){ return layout==='line' ? linePositions() : V; }

  function nearV(x,y){
    const Q=P(), tol=Math.max(R*1.6, 20*hitScale()); let b=-1,bd=tol*tol;
    Q.forEach((v,i)=>{const dx=v[0]-x,dy=v[1]-y,dd=dx*dx+dy*dy; if(dd<bd){bd=dd;b=i;}}); return b; }

  // One geometry function shared by rendering and hit-testing, so parallel arcs can be told apart.
  // collapse=true returns a single entry per vertex pair (multiplicity-label mode), carrying the
  // indices of the edges it stands for.
  function arcGeom(collapse){
    const Q=P(), seen={}, out=[];
    E.forEach((e,i)=>{
      const lo=Math.min(e[0],e[1]), hi=Math.max(e[0],e[1]), key=lo+'-'+hi;
      if(collapse && seen[key]!==undefined){
        const g=out[seen[key]]; g.count++; g.idxs.push(i); return;
      }
      const tot=E.filter(f=>Math.min(f[0],f[1])===lo&&Math.max(f[0],f[1])===hi).length;
      const idx=collapse ? 0 : (seen[key]=(seen[key]===undefined?0:seen[key]+1));
      if(collapse) seen[key]=out.length;
      const a=Q[lo], b=Q[hi];
      let cx, cy;
      if(layout==='line'){                    // arcs above the line, taller for wider spans
        const span=Math.abs(hi-lo);
        const h=Math.min(LINE_Y-26, 26 + span*26 + idx*17);
        cx=(a[0]+b[0])/2; cy=LINE_Y-2*h;
      } else {
        const off=collapse ? 0 : (idx-(tot-1)/2)*15;
        const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
        const dx=b[0]-a[0], dy=b[1]-a[1], L=Math.hypot(dx,dy)||1;
        cx=mx+(-dy/L)*off*1.4; cy=my+(dx/L)*off*1.4;
      }
      out.push({a, b, c:[cx,cy], mid:[(a[0]+2*cx+b[0])/4, (a[1]+2*cy+b[1])/4],
                count:1, idxs:[i]});
    });
    return out;
  }
  function nearE(x,y){
    const collapse = edgeStyle==='labels';
    const G=arcGeom(collapse), tol=Math.max(16, 14*hitScale()); let b=-1, bd=tol*tol;
    G.forEach((g,i)=>{ const dd=(g.mid[0]-x)**2+(g.mid[1]-y)**2; if(dd<bd){bd=dd;b=i;} });
    if(b<0) return -1;
    // in collapsed mode a click removes one edge of the bundle (they are interchangeable)
    return collapse ? G[b].idxs[G[b].idxs.length-1] : b;
  }

  // ---- pointer handling: click to add/connect, drag to reposition -------------------
  let drag=null;
  function down(ev){
    ev.preventDefault();
    const [x,y]=pos(ev), vi=nearV(x,y);
    if(!del && vi>=0 && layout==='free'){ drag={i:vi, x0:x, y0:y, moved:false, ox:V[vi][0], oy:V[vi][1]}; return; }
    drag={i:-1, x0:x, y0:y, moved:false};
  }
  function move(ev){
    if(!drag || drag.i<0) return;
    const [x,y]=pos(ev);
    if(!drag.moved && Math.hypot(x-drag.x0, y-drag.y0) < 6*hitScale()) return;
    if(!drag.moved){ push(); drag.moved=true; }
    ev.preventDefault();
    V[drag.i]=[Math.max(R, Math.min(VB.w-R, drag.ox + x-drag.x0)),
               Math.max(R, Math.min(VB.h-R, drag.oy + y-drag.y0))];
    draw();
  }
  function up(ev){
    if(!drag) return;
    const d=drag; drag=null;
    if(d.moved){ changed(); return; }         // it was a drag, not a click
    const [x,y]=pos(ev.changedTouches?{touches:ev.changedTouches}:ev);
    tapAt(x,y);
  }
  function tapAt(x,y){
    const vi=nearV(x,y);
    if(del){
      if(vi>=0){ push(); E=E.filter(e=>e[0]!==vi&&e[1]!==vi).map(e=>[e[0]-(e[0]>vi?1:0),e[1]-(e[1]>vi?1:0)]); V.splice(vi,1); sel=-1; }
      else{ const ei=nearE(x,y); if(ei>=0){ push(); E.splice(ei,1);} }
      changed(); return;
    }
    if(vi>=0){ if(sel<0) sel=vi; else if(sel!==vi){ push(); E.push([sel,vi]); sel=-1; } else sel=-1; }
    else {
      if(V.length>=MAXV){ flash('at most '+MAXV+' vertices can be drawn'); return; }
      push();
      // in line layout the click position is ignored: the vertex takes the next label slot
      V.push(layout==='line' ? [VB.w/2, LINE_Y] : [x,y]);
      sel=-1;
    }
    changed();
  }
  svg.addEventListener('mousedown', down);
  svg.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
  svg.addEventListener('touchstart', down, {passive:false});
  svg.addEventListener('touchmove', move, {passive:false});
  window.addEventListener('touchend', up);

  document.addEventListener('keydown', e=>{
    const t=e.target && e.target.tagName;
    if(t==='INPUT'||t==='TEXTAREA') return;
    const meta=e.metaKey||e.ctrlKey;
    if(meta && e.key.toLowerCase()==='z'){ e.preventDefault(); (e.shiftKey?doRedo:doUndo)(); }
    else if(meta && e.key.toLowerCase()==='y'){ e.preventDefault(); doRedo(); }
    else if(e.key==='Escape'){ sel=-1; draw(); }
    else if(e.key==='Delete'||e.key==='Backspace'){
      if(sel>=0){ e.preventDefault(); push();
        E=E.filter(x=>x[0]!==sel&&x[1]!==sel).map(x=>[x[0]-(x[0]>sel?1:0),x[1]-(x[1]>sel?1:0)]);
        V.splice(sel,1); sel=-1; changed(); }
    }
  });

  function doUndo(){ if(hist.length){ future.push(JSON.stringify([V,E])); [V,E]=JSON.parse(hist.pop()); sel=-1; changed(true); } }
  function doRedo(){ if(future.length){ hist.push(JSON.stringify([V,E])); [V,E]=JSON.parse(future.pop()); sel=-1; changed(true); } }
  $('undo').onclick = doUndo;
  $('redo').onclick = doRedo;
  $('mode').onclick=()=>{ del=!del; sel=-1;
    $('mode').textContent=del?'Mode: delete':'Mode: add / connect';
    $('mode').setAttribute('aria-pressed', del?'true':'false');
    svg.style.cursor=del?'not-allowed':'crosshair'; draw(); };

  $('clear').onclick=()=>{ push(); V=[]; E=[]; sel=-1; touched=false; clearOuts(); changed(); };
  $('example').onclick=()=>{ push();
    V=ellipse(7);
    E=[[0,1],[0,1],[0,2],[1,2],[2,3],[3,4],[4,5],[4,6],[5,6],[5,6]];
    sel=-1; setLMN(4,3,8); touched=false; clearOuts(); changed(); };
  $('random').onclick=()=>{ push();
    const l=Math.max(1,parseInt($('lval').value)||1), m=Math.max(1,parseInt($('mval').value)||1);
    const n=Math.max(2*l, parseInt($('nval').value)||2*l);
    V=ellipse(n);
    E=[]; const dg=new Array(n).fill(0), cap=l*m;
    const target=Math.min(cap, Math.max(n-1, Math.floor(cap*(0.55+Math.random()*0.45))));
    let tries=0;
    while(E.length<target && tries<4000){ tries++;
      const a=Math.floor(Math.random()*n), b=Math.floor(Math.random()*n);
      if(a!==b && dg[a]<m && dg[b]<m){ E.push([a,b]); dg[a]++; dg[b]++; } }
    sel=-1; setLMN(l,m,n); clearOuts(); changed(); };
  $('fit').onclick=()=>{ fitLMN(); touched=false; changed(); };
  $('layout').onclick=()=>{ layout = layout==='free' ? 'line' : 'free';
    $('layout').textContent='Layout: '+layout; sel=-1; changed(); };
  $('estyle').onclick=()=>{ edgeStyle = edgeStyle==='arcs' ? 'labels' : 'arcs';
    $('estyle').textContent='Edges: '+edgeStyle; draw(); syncHash(); };
  $('overlay').onclick=()=>{ overlay = overlay==='none' ? 'blocks' : 'none';
    $('overlay').textContent='Blocks: '+(overlay==='blocks'?'on':'off');
    if(overlay==='blocks') $('structbox').open=true;
    draw(); syncHash(); };
  $('resetengine').onclick=async()=>{
    try{ if(worker || mode!=='idle') await runPy('demos.reset_caches()'); }catch(e){}
    stopEngine(); flash('engine caches cleared');
  };
  let flashTimer;
  function flash(msg){
    clearTimeout(flashTimer);
    const el=$('edgeerr'); el.textContent=msg;
    flashTimer=setTimeout(()=>{ if(el.textContent===msg) el.textContent=''; }, 2500);
  }
  $('permalink').onclick=async()=>{
    syncHash(true);
    try{ await navigator.clipboard.writeText(location.href); $('permalink').textContent='Copied ✓';
         setTimeout(()=>$('permalink').textContent='Copy link', 1400); }
    catch(e){ $('permalink').textContent='Copy from the URL bar'; setTimeout(()=>$('permalink').textContent='Copy link', 2200); }
  };

  function setLMN(l,m,n){ $('lval').value=l; $('mval').value=m; $('nval').value=n;
    ['lval','mval','nval'].forEach(id=>$(id).classList.remove('touched')); }
  function fitLMN(){
    const d=deg(), md=d.length?Math.max(...d):0;
    const m=Math.max(md,1);
    const l=Math.max(Math.ceil(E.length/m),1);
    const n=Math.max(V.length, 2*l, 1);
    setLMN(l,m,n);
  }
  function autoGrow(){                       // gentle: only while the user hasn't set values by hand
    if(touched) return;
    const d=deg(), md=d.length?Math.max(...d):0;
    const m=Math.max(parseInt($('mval').value)||1, md, 1);
    const l=Math.max(parseInt($('lval').value)||1, Math.ceil(E.length/Math.max(m,1)), 1);
    const n=Math.max(parseInt($('nval').value)||1, V.length, 2*l);
    $('mval').value=m; $('lval').value=l; $('nval').value=n;
  }

  function clearOuts(){ ['factor','basis','ehrhart'].forEach(t=>{
    const o=$('out-'+t); o.innerHTML=''; o.classList.remove('stale'); delete o.dataset.stale; }); }
  function markStale(which){
    which.forEach(t=>{
      const o=$('out-'+t);
      if(o.innerHTML.trim() && !o.dataset.stale){
        o.dataset.stale='1'; o.classList.add('stale');
        o.insertAdjacentHTML('afterbegin',
          '<div class="head bad">&#8635; the graph or parameters changed since this was computed — re-run to update</div>');
      }
    });
  }
  function freshen(t){ const o=$('out-'+t); o.classList.remove('stale'); delete o.dataset.stale; }

  // ============================================================ structure of G
  // Cut-edges, blocks (the components of G minus its cut-edges), the bridge forest on those
  // blocks, and the vertex deficits def(v) = m - deg(v).  All of it is cheap, so it is recomputed
  // on every edit and shown live rather than waiting for a run.
  function analyze(){
    const k=V.length, m=+$('mval').value;
    const deg=new Array(k).fill(0);
    E.forEach(([a,b])=>{deg[a]++; deg[b]++;});
    const adj=Array.from({length:k},()=>[]);
    E.forEach(([a,b],i)=>{ adj[a].push([b,i]); adj[b].push([a,i]); });

    // iterative Tarjan for cut-edges
    const disc=new Array(k).fill(-1), low=new Array(k).fill(0), bridge=new Array(E.length).fill(false);
    let timer=0;
    for(let root=0; root<k; root++){
      if(disc[root]>=0) continue;
      disc[root]=low[root]=timer++;
      const st=[[root,-1,0]];
      while(st.length){
        const f=st[st.length-1];
        if(f[2] < adj[f[0]].length){
          const [w,eid]=adj[f[0]][f[2]++];
          if(eid===f[1]) continue;
          if(disc[w]<0){ disc[w]=low[w]=timer++; st.push([w,eid,0]); }
          else low[f[0]]=Math.min(low[f[0]], disc[w]);
        } else {
          st.pop();
          if(st.length){
            const g=st[st.length-1];
            low[g[0]]=Math.min(low[g[0]], low[f[0]]);
            if(low[f[0]] > disc[g[0]]) bridge[f[1]]=true;
          }
        }
      }
    }

    // blocks = components of G with the cut-edges removed
    const block=new Array(k).fill(-1); let nb=0;
    const badj=Array.from({length:k},()=>[]);
    E.forEach(([a,b],i)=>{ if(!bridge[i]){ badj[a].push(b); badj[b].push(a); } });
    for(let v=0; v<k; v++){
      if(block[v]>=0) continue;
      block[v]=nb; const st=[v];
      while(st.length){ const u=st.pop(); for(const w of badj[u]) if(block[w]<0){ block[w]=nb; st.push(w); } }
      nb++;
    }
    const blocks=Array.from({length:nb},(_,i)=>({id:i, verts:[], edges:0, deficit:0, tdeg:0}));
    for(let v=0; v<k; v++){ blocks[block[v]].verts.push(v); blocks[block[v]].deficit += m-deg[v]; }
    E.forEach(([a,b],i)=>{ if(!bridge[i]) blocks[block[a]].edges++; });
    E.forEach(([a,b],i)=>{ if(bridge[i]){ blocks[block[a]].tdeg++; blocks[block[b]].tdeg++; } });
    blocks.forEach(B=>{ B.leaf = B.tdeg===1;
      B.kind = B.deficit===0 ? 'full' : (B.deficit===1 ? 'almost full' : ''); });

    // connected components of G, and their total deficits
    const comp=new Array(k).fill(-1); let nc=0;
    for(let v=0; v<k; v++){
      if(comp[v]>=0) continue;
      comp[v]=nc; const st=[v];
      while(st.length){ const u=st.pop(); for(const [w] of adj[u]) if(comp[w]<0){ comp[w]=nc; st.push(w); } }
      nc++;
    }
    const compDef=new Array(nc).fill(0);
    for(let v=0; v<k; v++) compDef[comp[v]] += m-deg[v];

    // bipartite?
    const col=new Array(k).fill(-1); let bip=true;
    for(let v=0; v<k && bip; v++){
      if(col[v]>=0) continue;
      col[v]=0; const st=[v];
      while(st.length && bip){ const u=st.pop();
        for(const [w] of adj[u]){ if(col[w]<0){ col[w]=1-col[u]; st.push(w); } else if(col[w]===col[u]) bip=false; } }
    }

    // nesting pairs: edges (a,d) and (b,c) with a<b<c<d (labels are 0-based here)
    const nest=new Array(E.length).fill(false); const nestPairs=[];
    const S=E.map(e=>[Math.min(e[0],e[1]), Math.max(e[0],e[1])]);
    for(let i=0;i<S.length;i++) for(let j=0;j<S.length;j++){
      if(i===j) continue;
      const [a,d]=S[i], [b,c]=S[j];
      if(a<b && b<c && c<d){ nest[i]=nest[j]=true; if(nestPairs.length<8) nestPairs.push([i,j]); }
    }

    const bridges=[]; bridge.forEach((x,i)=>{ if(x) bridges.push(i); });
    return {deg, bridge, bridges, block, blocks, comp, nc, compDef, bip, nest, nestPairs,
            FL: blocks.filter(B=>B.leaf && B.deficit===0).length,
            AFL: blocks.filter(B=>B.leaf && B.deficit===1).length};
  }
  let A = null;                                 // latest analysis, refreshed by changed()

  // ============================================================ rendering
  const BLOCKHUE = i => `hsl(${(i*67)%360} 55% 45%)`;
  function edgeArcs(){
    const collapse = edgeStyle==='labels';
    const G=arcGeom(collapse); let s='';
    G.forEach(g=>{
      const cls=['edge'];
      if(A && g.idxs.some(i=>A.bridge[i])) cls.push('cut');
      if(layout==='line' && A && g.idxs.some(i=>A.nest[i])) cls.push('nest');
      s+=`<path class="${cls.join(' ')}" d="M${g.a[0]},${g.a[1]} Q${g.c[0]},${g.c[1]} ${g.b[0]},${g.b[1]}"/>`;
    });
    if(collapse) G.forEach(g=>{
      if(g.count>1)
        s+=`<rect class="mlabbg" x="${g.mid[0]-11}" y="${g.mid[1]-9}" width="22" height="18" rx="4"/>`
          +`<text class="mlab" x="${g.mid[0]}" y="${g.mid[1]+4}" text-anchor="middle" font-size="11">&times;${g.count}</text>`;
    });
    return s;
  }
  function vertexDots(){
    const Q=P(); let s='';
    if(layout==='line') s+=`<line class="baseline" x1="20" y1="${LINE_Y}" x2="${VB.w-20}" y2="${LINE_Y}"/>`;
    Q.forEach((v,i)=>{
      const tint = (overlay==='blocks' && A && A.blocks.length>1) ? ` style="stroke:${BLOCKHUE(A.block[i])}"` : '';
      s+=`<circle class="vtx${i===sel?' sel':''}"${tint} cx="${v[0]}" cy="${v[1]}" r="${R}"/>`
        +`<text x="${v[0]}" y="${v[1]+4}" text-anchor="middle" font-size="12">${i+1}</text>`;
      if(overlay==='blocks' && A){
        const d=A.deg[i], m=+$('mval').value;
        s+=`<text class="deflab" x="${v[0]}" y="${v[1]-R-5}" text-anchor="middle" font-size="10">${m-d}</text>`;
      }
    });
    return s;
  }
  function drawSpares(){                      // vertices that n counts but nobody drew
    const n=nval(), k=n-V.length, box=$('spares');
    if(k<=0){ box.innerHTML=''; return; }
    const dots = k<=16
      ? Array.from({length:k}, (_,i)=>`<span class="sp">${V.length+i+1}</span>`).join('')
      : `<span class="sp">${V.length+1}</span><span>\u2026</span><span class="sp">${n}</span>`;
    box.innerHTML = dots +
      `<span>${k} spare ${k===1?'vertex':'vertices'} \u2014 counted by n, unused by G, and available to the constructions</span>`;
  }
  function draw(){ svg.innerHTML = edgeArcs() + vertexDots(); drawSpares(); }

  // ============================================================ edge-list text box
  let edgeBoxDirty = false;
  function serializeEdges(){
    const c=new Map();
    labelEdges().forEach(([a,b])=>{ const k=a+','+b; c.set(k,(c.get(k)||0)+1); });
    return [...c].map(([k,v])=>'('+k+')'+(v>1?'x'+v:'')).join(', ');
  }
  // Scans for pairs anywhere in the text, so "(1,3),(2,4),(3,4)x2" and "1-3 2-4 3-4 3-4" both work.
  function parseEdgeText(text, n){
    const out=[], errs=[];
    const re=/\(?\s*(\d+)\s*[,\-\u2013\s]\s*(\d+)\s*\)?(?:\s*[x\u00d7*]\s*(\d+))?/g;
    const junk = s => s.replace(/[,;()\[\]\s]/g,'');
    let last=0, mm;
    while((mm=re.exec(text))!==null){
      const gap=text.slice(last, mm.index);
      if(junk(gap)) errs.push('ignored "'+gap.trim()+'"');
      last=re.lastIndex;
      const a=+mm[1], b=+mm[2], k=mm[3]?+mm[3]:1;
      if(a===b){ errs.push('loop at '+a+' \u2014 G must be loopless'); continue; }
      if(a<1||b<1||a>n||b>n){ errs.push('vertex '+((a<1||a>n)?a:b)+' is outside 1\u2026'+n); continue; }
      if(k<1||k>999){ errs.push('bad multiplicity in "'+mm[0].trim()+'"'); continue; }
      for(let i=0;i<k;i++) out.push([Math.min(a,b)-1, Math.max(a,b)-1]);
    }
    const tail=text.slice(last);
    if(junk(tail)) errs.push('ignored "'+tail.trim()+'"');
    return {edges: out, errors: errs};
  }
  $('edges').addEventListener('input', ()=>{
    edgeBoxDirty = true;
    const {edges, errors} = parseEdgeText($('edges').value, 999);
    $('edgeerr').textContent = errors.join('; ');
    $('edges').classList.toggle('err', errors.length>0);
    if(errors.length){ edgeBoxDirty=false; return; }
    if(JSON.stringify(edges)!==JSON.stringify(E)){
      const need = edges.reduce((mx,e)=>Math.max(mx, e[0]+1, e[1]+1), 0);
      push();
      if(need > V.length){ const ring=ellipse(Math.max(need, V.length));
        for(let i=V.length;i<need;i++) V.push(ring[i]); }
      E = edges; sel=-1;
      changed();
    }
    edgeBoxDirty = false;
  });

  // ============================================================ structure panel
  function renderStructure(){
    const box=$('structout'), m=+$('mval').value;
    if(!V.length){ box.innerHTML='<p class="caption">draw a graph to see its block structure</p>'; return; }
    const nb=A.blocks.length, cuts=A.bridges.length;
    let h=`<p class="caption">${A.nc} connected component${A.nc===1?'':'s'} &middot; `
      + `${nb} block${nb===1?'':'s'} &middot; ${cuts} cut-edge${cuts===1?'':'s'} &middot; `
      + `${A.FL} full leaf-block${A.FL===1?'':'s'}, ${A.AFL} almost-full &middot; `
      + `${A.bip?'bipartite':'not bipartite'}`
      + (layout==='line' ? (A.nestPairs.length
            ? ` &middot; <span class="bad">${A.nestPairs.length>=8?'8+':A.nestPairs.length} nesting pair${A.nestPairs.length===1?'':'s'} — G is not in S(&#8467;,m,n)</span>`
            : ' &middot; <span class="ok">nonnesting: G is in S(&#8467;,m,n)</span>') : '')
      + `</p>`;
    h+='<table class="st"><tr><th></th><th>block</th><th>vertices</th><th>edges</th>'
      +'<th>deficit &Sigma;(m&minus;deg)</th><th>in bridge forest</th></tr>';
    A.blocks.forEach(B=>{
      h+=`<tr><td class="sw" style="background:${BLOCKHUE(B.id)}"></td>`
        +`<td>B${B.id+1}</td><td>${B.verts.map(v=>v+1).join(', ')}</td><td>${B.edges}</td>`
        +`<td>${B.deficit}${B.kind?' <span class="badge n">'+B.kind+'</span>':''}</td>`
        +`<td>degree ${B.tdeg}${B.leaf?' &mdash; leaf':''}</td></tr>`;
    });
    h+='</table>';
    if(A.nc>1) h+=`<p class="caption">total deficit per component: ${A.compDef.join(', ')}</p>`;
    h+=`<p class="caption">A block is a connected component of G once every cut-edge is removed; the `
      +`cut-edges join the blocks into the bridge forest. Deficit 0 is <em>full</em>, deficit 1 is `
      +`<em>almost full</em>. Cut-edges are drawn dashed.</p>`;
    box.innerHTML=h;
  }

  // ============================================================ validation + state
  function validate(){
    const d=deg(), md=d.length?Math.max(...d):0;
    const l=+$('lval').value, m=+$('mval').value, n=nval();
    const lhat=Math.min(l, Math.ceil(n/2)), lmaxG=Math.floor(n/2), lmaxE=Math.floor(n*m/2);
    if(n>MAXN){ $('nval').value=MAXN; flash('n is capped at '+MAXN+' here'); return validate(); }
    $('stats').innerHTML=`vertices drawn: ${V.length} &nbsp;(n = ${n})<br>edges: ${E.length} / &#8467;m = ${l*m}`
      +`<br>max degree: ${md} / m = ${m}<br>&#8467;&#770; = min(&#8467;, &lceil;n/2&rceil;) = ${lhat}`;
    let msg='', ok = md<=m && E.length<=l*m && l<=lmaxG && V.length>0;
    if(ok) msg=`<span class="ok">&#10003; valid in G(${l}, ${m}, ${n})</span>`;
    else if(V.length===0) msg='<span class="bad">&#9650; draw a graph</span>';
    else if(md>m) msg=`<span class="bad">&#9650; a vertex has degree ${md} &gt; m = ${m}</span>`;
    else if(E.length>l*m) msg=`<span class="bad">&#9650; ${E.length} edges &gt; &#8467;m = ${l*m}</span>`;
    else msg=`<span class="bad">&#9650; the graph constructions need &#8467; &le; &lfloor;n/2&rfloor; = ${lmaxG}</span>`
        +` <button id="swapl" style="padding:2px 8px;font-size:.8rem">use &#8467; = n&minus;&#8467; = ${n-l}</button>`;
    $('valid').innerHTML = msg;
    const sw=$('swapl'); if(sw) sw.onclick=()=>{ $('lval').value=Math.max(1,n-l); touched=true; changed(); };
    document.querySelectorAll('.run').forEach(b=>{
      b.disabled = (b.dataset.run==='ehrhart') ? !(l>=1&&m>=1&&n>=1&&l<=lmaxE) : !ok;
    });
  }

  function changed(skipHash){
    autoGrow();
    A = analyze();
    draw(); validate(); renderStructure();
    if(!edgeBoxDirty) $('edges').value = serializeEdges();
    markStale(['factor','basis']);
    if(!skipHash) syncHash();
  }

  ['lval','mval','nval'].forEach(id=>$(id).addEventListener('input', ()=>{
    touched=true; $(id).classList.add('touched');
    A = analyze();
    draw(); validate(); renderStructure(); syncHash();
    markStale(['factor','basis','ehrhart']);
  }));

  // ============================================================ permalink
  function activeTab(){ return document.querySelector('.tab-btn.active').dataset.tab; }
  function packState(){
    const flags=(layout==='line'?'L':'')+(edgeStyle==='labels'?'M':'')+(overlay==='blocks'?'B':'');
    return 'l'+$('lval').value+'m'+$('mval').value+'n'+nval()
      +'t'+activeTab()[0]
      +'v'+V.map(p=>Math.round(p[0])+'.'+Math.round(p[1])).join('_')
      +'e'+E.map(e=>e[0]+'.'+e[1]).join('_')
      +(flags?'x'+flags:'');
  }
  let hashTimer;
  function syncHash(now){
    clearTimeout(hashTimer);
    const write=()=>{ try{ history.replaceState(null,'','#'+packState()); }catch(e){} };
    now ? write() : (hashTimer=setTimeout(write, 250));
  }
  function unpackState(h){
    const mm=/^#?l(\d+)m(\d+)n(\d+)t(\w)v([^ex]*)e([^x]*)(?:x(\w*))?$/.exec(h||'');
    if(!mm) return false;
    const [,l,mv,n,t,vs,es,flags]=mm;
    setLMN(+l,+mv,+n); touched=true;
    V = vs ? vs.split('_').filter(Boolean).map(s=>s.split('.').map(Number)) : [];
    E = es ? es.split('_').filter(Boolean).map(s=>s.split('.').map(Number)) : [];
    const f=flags||'';
    layout    = f.indexOf('L')>=0 ? 'line'   : 'free';
    edgeStyle = f.indexOf('M')>=0 ? 'labels' : 'arcs';
    overlay   = f.indexOf('B')>=0 ? 'blocks' : 'none';
    $('layout').textContent='Layout: '+layout;
    $('estyle').textContent='Edges: '+edgeStyle;
    $('overlay').textContent='Blocks: '+(overlay==='blocks'?'on':'off');
    if(overlay==='blocks') $('structbox').open=true;
    const tab={f:'factor',b:'basis',e:'ehrhart'}[t];
    if(tab) showTab(tab);
    sel=-1; A=analyze(); draw(); validate(); renderStructure(); $('edges').value=serializeEdges();
    return true;
  }

  // ============================================================ tabs
  function showTab(name){
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===name));
    document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));
    $('panel-'+name).classList.remove('hidden');
  }
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.onclick=()=>{ showTab(btn.dataset.tab); syncHash(true); };
  });

  // ============================================================ run plumbing
  function runner(name, build, render, precheck){
    const btn=document.querySelector('[data-run='+name+']');
    const stop=document.querySelector('[data-stop='+name+']');
    const el=document.querySelector('[data-el='+name+']');
    let timer=null;
    stop.onclick=()=>{ stopEngine(); };
    let override=false;
    btn.onclick=async()=>{
      const o=$('out-'+name); freshen(name);
      const warn = precheck && !override ? precheck() : null;
      if(warn){
        o.innerHTML=`<div class="note warn">${warn} <button class="goanyway">Run anyway</button></div>`;
        o.querySelector('.goanyway').onclick=()=>{ override=true; btn.click(); override=false; };
        return;
      }
      o.innerHTML='<div class="head">computing…</div>';
      btn.disabled=true; stop.hidden=false;
      const t0=performance.now();
      timer=setInterval(()=>{ el.textContent=((performance.now()-t0)/1000).toFixed(1)+' s'; }, 100);
      try{
        const res=await runPy(build());
        await render(o, res);
      }catch(e){
        const msg=(e && e.message) || String(e);
        o.innerHTML = msg==='stopped'
          ? '<div class="head bad">stopped</div>'
          : '<div class="head bad">Error: '+esc(msg)+'</div>';
      }finally{
        clearInterval(timer); stop.hidden=true; btn.disabled=false; validate();
        el.textContent=((performance.now()-t0)/1000).toFixed(1)+' s';
      }
    };
  }
  const LMN = () => [+$('lval').value, +$('mval').value, nval()];
  const edgeArg = () => JSON.stringify(JSON.stringify(labelEdges()));

  // ============================================================ render helpers
  function tableauHTML(cols){
    // a factor with no columns is the empty product, i.e. the constant 1 -- show it, don't
    // render an invisible gap (sorting puts these first, so they are easy to miss)
    if(!cols.length) return '<span class="tgrid"><span class="one" title="empty tableau: the empty product is 1">1</span></span>';
    let h='<span class="tgrid">';
    cols.forEach(c=>{ h+=`<span class="tcol"><span class="tcell">${c[0]}</span><span class="tcell">${c[1]}</span></span>`; });
    return h+'</span>';
  }
  function coeffHTML(c){
    const sg=c>0?'+':'&minus;', mg=Math.abs(c)===1?'':Math.abs(c);
    return `<span class="bc">${sg}${mg?' '+mg:''}</span>`;
  }
  // items: [{c: integer coefficient, cols: [[a,b],...] over all factors, html: rendered row body}]
  function renderList(o, items, opts){
    opts = opts || {};
    const ctl=document.createElement('div'); ctl.className='listctl';
    ctl.innerHTML =
      `<label>sort <select class="lsort">
         <option value="given">as computed</option>
         <option value="absdesc">|coefficient| &darr;</option>
         <option value="absasc">|coefficient| &uarr;</option>
         <option value="signed">coefficient &uarr;</option>
       </select></label>
       <label>contains column <input class="lfilt" placeholder="e.g. 3,4"></label>
       <label>|c| &ge; <input class="lmin" type="number" min="0" step="1" style="width:64px"></label>
       <button class="lclear">reset</button>`;
    const stats=document.createElement('div'); stats.className='stats';
    const list=document.createElement('div'); list.className='blist';
    const foot=document.createElement('div'); foot.className='listfoot';
    o.appendChild(ctl); o.appendChild(stats); o.appendChild(list); o.appendChild(foot);

    const chunk=opts.chunk||150;
    let shown=0, view=items;

    function describe(v){
      if(!v.length) return 'no terms match';
      const abs=v.map(x=>Math.abs(x.c));
      const mx=Math.max(...abs), sum=abs.reduce((a,b)=>a+b,0);
      const pos=v.filter(x=>x.c>0).length, neg=v.length-pos;
      let t=`${v.length} term${v.length===1?'':'s'}`;
      if(v.length!==items.length) t+=` of ${items.length}`;
      t+=` &middot; max |c| = ${mx} &middot; &Sigma;|c| = ${sum} &middot; ${pos} positive, ${neg} negative`;
      if(opts.dim) t+=` &middot; support ${items.length}/${opts.dim} = ${(100*items.length/opts.dim).toFixed(1)}% of the graded piece`;
      return t;
    }
    function apply(){
      const so=ctl.querySelector('.lsort').value;
      const f=ctl.querySelector('.lfilt').value.trim();
      const mn=parseInt(ctl.querySelector('.lmin').value);
      view=items;
      if(f){
        const g=/^\s*(\d+)\s*[,\-\s]\s*(\d+)\s*$/.exec(f);
        if(g){ const a=Math.min(+g[1],+g[2]), b=Math.max(+g[1],+g[2]);
          view=view.filter(x=>x.cols.some(c=>c[0]===a&&c[1]===b)); }
        else { const v=parseInt(f); if(!isNaN(v)) view=view.filter(x=>x.cols.some(c=>c[0]===v||c[1]===v)); }
      }
      if(!isNaN(mn)) view=view.filter(x=>Math.abs(x.c)>=mn);
      if(so==='absdesc') view=[...view].sort((a,b)=>Math.abs(b.c)-Math.abs(a.c));
      else if(so==='absasc') view=[...view].sort((a,b)=>Math.abs(a.c)-Math.abs(b.c));
      else if(so==='signed') view=[...view].sort((a,b)=>a.c-b.c);
      stats.innerHTML=describe(view);
      list.innerHTML=''; shown=0; step();
    }
    function step(){
      list.insertAdjacentHTML('beforeend', view.slice(shown, shown+chunk).map(x=>x.html).join(''));
      shown=Math.min(shown+chunk, view.length);
      if(shown>=view.length){
        foot.innerHTML = view.length>chunk ? `<span class="caption">showing all ${view.length}</span>` : '';
      } else {
        foot.innerHTML=`<button class="showmore">Show ${Math.min(chunk, view.length-shown)} more</button>`
          +`<span class="caption">showing ${shown} of ${view.length}</span>`;
        foot.querySelector('.showmore').onclick=step;
      }
    }
    ctl.querySelector('.lsort').onchange=apply;
    ctl.querySelector('.lfilt').oninput=apply;
    ctl.querySelector('.lmin').oninput=apply;
    ctl.querySelector('.lclear').onclick=()=>{
      ctl.querySelector('.lsort').value='given';
      ctl.querySelector('.lfilt').value=''; ctl.querySelector('.lmin').value=''; apply(); };
    apply();
  }
  function verifyBadge(res){
    if(!res.verified) return '<span class="badge r">check FAILED</span>';
    return res.mode==='exact'
      ? '<span class="badge g">verified exactly</span>'
      : '<span class="badge b">consistent at 12 random points</span>';
  }

  // ============================================================ FACTOR
  runner('factor',
    ()=>{ const [l,m,n]=LMN(); return `demos.factor_report(json.loads(${edgeArg()}), ${l}, ${m}, ${n})`; },
    (o,res)=>{
      if(!res.ok){
        const kind = res.verdict==='obstructed' ? 'No such factorization exists' : 'Could not compute';
        let h=`<div class="head bad">${kind}</div><div class="note warn">${esc(res.error)}</div>`;
        if(res.tableau) h+=`<p class="caption">the obstructing maximal tableau:</p>`+tableauHTML(res.tableau);
        o.innerHTML=h; return;
      }
      const [l,m,n]=LMN();
      let h=`<div class="head">&delta;<sub>G</sub> = sum of <strong>${res.count}</strong> product${res.count===1?'':'s'} of ${m} degree-1 tableau${m===1?'':'x'} `
        + verifyBadge(res)
        +`<span style="color:var(--muted)">(${res.time<0.001?'<0.001':res.time.toFixed(3)} s)</span></div>`;
      const st=res.structure;
      if(st){
        let note;
        if(st.colorable===true){
          note = `No obstruction: &chi;&prime;(G) &le; m, because ${st.why}. So &delta;<sub>G</sub> is a <em>single</em> product of m matchings.`;
          if(st.nprod>1) note += ` It still expands to ${st.nprod} terms above, because those matchings are not individually non-crossing.`;
        } else if(st.colorable===null){
          note = `Undecided: ${st.why}. &chi;&prime;(G) &le; m could not be settled, so it is not known whether &delta;<sub>G</sub> is a single product of m matchings.`;
        } else {
          note = `Obstructed: &chi;&prime;(G) &gt; m, because ${st.why}. So &delta;<sub>G</sub> is not a single product of m matchings.`;
        }
        // what the construction actually had to do, rather than what the graph merely looks like
        const did=[];
        if(st.odd_breaks) did.push(`the linear relation was used ${st.odd_breaks} time${st.odd_breaks===1?'':'s'} to break an odd cycle in a degree-&le;2 part`
          + (st.spares && st.spares.length
              ? ` (spare vert${st.spares.length===1?'ex ':'ices '}${st.spares.join(', ')})` : ''));
        if(st.quad_merges) did.push(`${st.quad_merges} quadratic rewrite${st.quad_merges===1?'':'s'} merged two odd cycles`);
        if(st.raises) did.push(`${st.raises} tableau raise${st.raises===1?' was':'s were'} needed to reach a splittable form`);
        if(A && A.bridges.length) did.push(`G has ${A.bridges.length} cut-edge${A.bridges.length===1?'':'s'} (dashed on the canvas), so its bridge forest is nontrivial`);
        if(st.strict) did.push(`m = ${m} is odd and below the threshold (2&#8467;&#770;+3)/3 = ${st.threshold} with &#8467;&#770; = ${st.lhat}, the regime where the degree-2 &middot; degree-(m&minus;2) split can fail`);
        if(did.length) note += `<br><br>What the construction did: ${did.join('; ')}.`;
        h+=`<div class="note">${note}</div>`;
      }
      o.innerHTML=h;
      renderList(o, res.terms.map(t=>({
        c: t.c,
        cols: [].concat(...t.tabs),
        html: `<div class="brow">${coeffHTML(t.c)}`
              + t.tabs.map(tab=>tableauHTML(tab)).join('<span class="prod">&middot;</span>') + '</div>'
      })));
    });

  // ============================================================ MAXIMAL BASIS
  runner('basis',
    ()=>{ const [l,m,n]=LMN(); return `demos.basis_view(json.loads(${edgeArg()}), ${l}, ${m}, ${n})`; },
    (o,res)=>{
      if(!res.ok){ o.innerHTML=`<div class="head bad">${esc(res.error)}</div>`; return; }
      const [l,m,n]=LMN();
      let h=`<div class="head">&delta;<sub>G</sub> reduces onto <strong>${res.count}</strong> of the ${res.graded_dim} degree-${res.edges} element${res.graded_dim===1?'':'s'} of S<sub>max</sub>(${l},${m},${n}) `
        + verifyBadge(res)
        +`<span style="color:var(--muted)">(${res.time<0.001?'<0.001':res.time.toFixed(3)} s)</span></div>`;
      h+=`<p class="caption">&delta;<sub>G</sub> has degree d = ${res.edges} (one per edge); the degree-d graded piece of `
        +`V<sub>m&Delta;&#8467;</sub> is ${res.graded_dim}-dimensional, so this is the unique coordinate vector of &delta;<sub>G</sub> in that basis.`
        +(res.maximal_ok?'':' <span class="bad">Warning: some output tableaux are not maximal.</span>')+`</p>`;
      o.innerHTML=h;
      renderList(o, res.tabs.map(t=>({
        c: t.c, cols: t.tab,
        html: `<div class="brow">${coeffHTML(t.c)}${tableauHTML(t.tab)}</div>`
      })), {dim: res.graded_dim});
    });

  // ============================================================ EHRHART
  let mjPromise=null;
  function loadMathJax(){
    if(mjPromise) return mjPromise;
    window.MathJax={ tex:{displayMath:[['\\[','\\]']], inlineMath:[['\\(','\\)'],['$','$']]}, options:{enableMenu:false} };
    mjPromise=loadScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js')
      .catch(()=>{ mjPromise=null; throw new Error('typesetting unavailable'); });
    return mjPromise;
  }
  async function typeset(o){                 // never let a CDN hiccup discard a computed result
    try{
      await loadMathJax();
      if(window.MathJax && MathJax.typesetPromise) await MathJax.typesetPromise([o]);
    }catch(e){
      o.insertAdjacentHTML('beforeend',
        '<p class="caption">(math typesetting could not be loaded, so the formulas above are shown as LaTeX source)</p>');
    }
  }
  function ehrhartCost(){                      // rough work estimate; calibrated on real runs
    const [l,m,n]=LMN();
    const degD=(n-1)+Math.ceil(l/m), K=degD+6;
    return {secs: K*K*l*n*2.5e-6, degD};
  }
  runner('ehrhart',
    ()=>{ const [l,m,n]=LMN(); return `demos.ehrhart_report(${l}, ${m}, ${n})`; },
    async (o,res)=>{
      if(!res.ok){ o.innerHTML=`<div class="head bad">${esc(res.error)}</div>`; return; }
      const nm = res.m===1 ? `&Delta;<sub>${res.l},${res.n}</sub>` : `P<sub>${res.l},${res.m},${res.n}</sub>`;
      let h=`<div class="head">${nm} &sub; &#8477;<sup>${res.n}</sup>, dimension ${res.dim}</div>`;
      const denNote = res.reduced
        ? 'sharing the <strong>reduced</strong> denominator — the exponent n&minus;1 improves to n&minus;2 because n &ge; 3 and 2&#8467; = nm'
        : 'sharing the predicted denominator';
      h+=`<p style="font-size:.88rem;margin:.1rem 0 .7rem">Closed rational form \\(E=N(t,q)/D\\), interior `
        +`\\(\\overline{E}=\\overline{N}(t,q)/D\\), ${denNote}, `
        +`\\(D(t,q)=${res.den_tex}\\). Numerators, coefficient of each power of \\(t\\):</p>`;
      if(!res.predicted){
        h+=`<div class="note warn">The denominator reduced by more than predicted `
          +`(full form \\(${res.den_full_tex}\\)). That is worth a closer look — please report this input.</div>`;
      }
      h+='<div class="etbl"><table><tr><td class="lab">power of t</td><td class="lab">numerator of E</td><td class="lab">numerator of interior E&#772;</td></tr>';
      res.rows.forEach(r=>{ const tp = r[0]===0?'1':(r[0]===1?'t':'t^{'+r[0]+'}');
        h+=`<tr><td class="kcol">\\(${tp}\\)</td><td>${r[1]?'\\('+r[1]+'\\)':'—'}</td><td>${r[2]?'\\('+r[2]+'\\)':'—'}</td></tr>`; });
      h+='</table></div>';
      h+=`<p class="caption"><span class="badge ${res.recip?'g':'r'}">q-reciprocity ${res.recip?'holds (checked exactly)':'FAILS'}</span>`
        +`<span class="badge ${res.nonneg?'g':'n'}">numerator ${res.nonneg?'has nonnegative coefficients':'has negative coefficients'}</span>`
        +`<span class="badge n">&nu; = ${res.nu}, d+1 = ${res.dim+1}</span></p>`;
      h+=`<p class="caption">lattice points |L(k&middot;${res.m===1?'&Delta;':'P'})| for k = 0,1,2,… : ${res.lattice.join(', ')}, …`
        +` <span style="color:var(--muted)">(${res.time<0.001?'<0.001':res.time.toFixed(3)} s)</span></p>`;
      o.innerHTML=h;
      await typeset(o);
    },
    ()=>{ const c=ehrhartCost();
      return c.secs > 8
        ? `These parameters give a denominator of degree ${c.degD}; the computation should take `
          + `roughly ${c.secs<60?Math.round(c.secs)+' seconds':(c.secs/60).toFixed(1)+' minutes'}. `
          + `You can stop it once it starts.`
        : null; });

  // ============================================================ boot
  if(!unpackState(location.hash)) changed();
  window.addEventListener('hashchange', ()=>{ unpackState(location.hash); });
})();
</script>
</div>
{% endraw %}
