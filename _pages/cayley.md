---
layout: default
title: Cayley's formula — interactive companion
permalink: /cayley/
nav: false
---

{% raw %}
<div id="cayley-app">
<style>
/* Styling mirrors weston-miller.github.io/graph-demos: same variable scheme, same
   font stack, folder tabs over a bordered panel, --panel for neutral fills, and every
   accent derived from --global-theme-color so light/dark follow the site with no
   theme-specific block. */
#cayley-app{
  --ink:var(--global-text-color,#000); --muted:var(--global-text-color-light,#828282);
  --line:var(--global-divider-color,rgba(0,0,0,0.1)); --bg:var(--global-bg-color,#fff);
  --panel:rgba(127,127,127,0.11); --surface:var(--global-card-bg-color,#fff);
  --accent:var(--global-theme-color,#009f06); --accentbg:color-mix(in srgb, var(--accent) 9%, var(--bg));
  --ok:var(--global-theme-color,#009f06); --bad:var(--global-highlight-color,#b71c1c);
  --edge:#8a8a84; --vfill:color-mix(in srgb, var(--accent) 18%, var(--bg)); --radius:6px;
  /* The paper's two figure colours, kept separate from the site accent because they
     carry meaning: \definecolor{darkblue} is really green (#00a838) and is used for
     run-leaves and the walk, \definecolor{darkred} is purple (#9400d3) and marks
     vertex n and the negative skips.  Mixing each toward --ink darkens it on a light
     background and lightens it on a dark one, so no theme-specific block is needed. */
  --green:#00762a; --purple:#6c0099;
  --green:color-mix(in srgb, #00a838 70%, var(--ink));
  --purple:color-mix(in srgb, #9400d3 70%, var(--ink));
  --greenbg:color-mix(in srgb, #00a838 14%, var(--bg));
  --purplebg:color-mix(in srgb, #9400d3 15%, var(--bg));
  --purplefill:color-mix(in srgb, #9400d3 20%, var(--bg));
}
#cayley-app *{box-sizing:border-box;}
#cayley-app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  color:var(--ink); background:var(--bg); line-height:1.55; margin:0;}
#cayley-app .wrap{max-width:100%; margin:0 auto; padding:0.4rem 0 2.5rem;}
#cayley-app h1{font-size:2rem; font-weight:700; margin:.2rem 0 .5rem; line-height:1.2;}
#cayley-app p.lede{color:var(--muted); margin:.2rem 0 1.2rem; font-size:.95rem;}
#cayley-app a{text-decoration:none; color:var(--accent);}
#cayley-app a:hover{text-decoration:underline;}
#cayley-app button{font:inherit; font-size:.9rem; padding:6px 12px; border:1px solid var(--line);
  background:var(--bg); border-radius:var(--radius); cursor:pointer; color:var(--ink);}
#cayley-app button:hover{color:var(--accent); border-color:var(--accent);}
#cayley-app button:active{transform:scale(.98);}
#cayley-app button:disabled{opacity:.5; cursor:default;}
#cayley-app button:disabled:hover{color:var(--ink); border-color:var(--line);}
#cayley-app button.primary{background:var(--accent); border-color:var(--accent); color:#fff; font-weight:600;}
#cayley-app button.primary:hover{color:#fff; opacity:.88;}
#cayley-app label{font-size:.85rem; color:var(--muted);}
#cayley-app input[type=number]{width:54px; font:inherit; padding:5px 6px; border:1px solid var(--line);
  border-radius:var(--radius); color:var(--ink); background:var(--bg);}
#cayley-app input[type=text]{font:inherit; font-size:.85rem; padding:5px 7px; border:1px solid var(--line);
  border-radius:var(--radius); color:var(--ink); background:var(--bg);
  font-family:ui-monospace,Menlo,Consolas,monospace;}
#cayley-app input[type=text].err{border-color:var(--bad);}
/* The two example boxes carry size="34" and size="42", which is an intrinsic
   width of ~300px and ~365px of monospace -- wider than a phone. Nothing was
   holding them back: .toolbar is a flex container, and a flex item defaults to
   min-width:auto, so the label refused to shrink below its content and pushed
   the whole document to 398px in a 375px viewport. Both halves are needed --
   min-width:0 lets the label shrink, max-width:100% makes the input follow. */
#cayley-app input[type=text]{max-width:100%;}
#cayley-app .toolbar > *{min-width:0;}
#cayley-app select{font:inherit; font-size:.85rem; padding:4px 6px; border:1px solid var(--line);
  border-radius:var(--radius); background:var(--bg); color:var(--ink);}
#cayley-app input[type=range]{vertical-align:middle;}
#cayley-app .toolbar{display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px;}
#cayley-app .spacer{flex:1;}
#cayley-app .k{font-size:.78rem; color:var(--muted); margin-bottom:3px;}
#cayley-app .caption{font-size:.82rem; color:var(--muted); margin:.4rem 0;}
#cayley-app .stats{font-size:.83rem; color:var(--muted); margin:.3rem 0;}
#cayley-app .ok{color:var(--ok);}
#cayley-app .bad{color:var(--bad);}
#cayley-app code{font-family:ui-monospace,Menlo,Consolas,monospace; font-size:.85em;
  background:var(--panel); padding:1px 4px; border-radius:4px;}
#cayley-app sub, #cayley-app sup{font-size:.72em;}
#cayley-app .note{font-size:.83rem; border-left:3px solid var(--accent); background:var(--accentbg);
  padding:.5rem .7rem; margin:.6rem 0; border-radius:0 var(--radius) var(--radius) 0;}

/* tabs and panels */
#cayley-app .tabs{display:flex; gap:4px; flex-wrap:wrap; margin:1.3rem 0 0; border-bottom:1px solid var(--line);}
#cayley-app .tab-btn{border:1px solid var(--line); border-bottom:none; border-radius:8px 8px 0 0; padding:7px 13px;
  background:var(--panel); color:var(--muted); position:relative; top:1px;
  transition:background .15s ease, color .15s ease;}
#cayley-app .tab-btn.active{background:var(--bg); color:var(--ink); font-weight:600;
  border-bottom:1px solid var(--bg); border-top:2px solid var(--accent); padding-top:6px;}
#cayley-app .panel{border:1px solid var(--line); border-top:none; border-radius:0 0 10px 10px;
  padding:1rem 1.1rem 1.3rem;}
#cayley-app .panel.hidden{display:none;}
#cayley-app .panel-box{border:1px solid var(--line); border-radius:10px; padding:.9rem 1rem; background:var(--bg);}
#cayley-app .panel .desc{font-size:.86rem; color:var(--muted); margin:0 0 .8rem;}
#cayley-app .head{font-size:.92rem; margin-bottom:.5rem; font-weight:600;}
/* .row and .col are also Bootstrap grid classes, which al-folio loads globally.  My
   rules win on specificity for what they set, but Bootstrap's negative row margins and
   15px column padding are properties I do not set, so neutralise them explicitly. */
#cayley-app .row{display:flex; gap:14px; align-items:flex-start; margin:10px 0 0; flex-wrap:wrap;}
#cayley-app .row .col{flex:1; min-width:260px; padding-left:0; padding-right:0; max-width:none;}
#cayley-app .row.wide .col{flex:1 0 100%;}

/* the drawing, styled like the graph canvas on the demos page */
#cayley-app .canvas{border:1px solid var(--line); border-radius:12px; background:var(--panel);
  padding:.4rem; margin:0 auto;}
#cayley-app .canvas svg{display:block; margin:0 auto; width:100%; height:auto;}
#cayley-app svg text{font-family:inherit;}

/* factorization and sequences */
#cayley-app .fact{line-height:2.1; word-spacing:.15em; font-family:ui-monospace,Menlo,Consolas,monospace;
  font-size:.82rem;}
#cayley-app .refl{padding:.12em .35em; border-radius:4px; background:var(--panel); white-space:nowrap;}
#cayley-app .refl.hl{background:var(--green); color:#fff; font-weight:600;}
#cayley-app .refl.dim{opacity:.35;}
#cayley-app .mono{font-family:ui-monospace,Menlo,Consolas,monospace; font-size:.82rem;}
#cayley-app details{margin:.5rem 0; font-size:.83rem;}
#cayley-app summary{cursor:pointer; color:var(--muted);}
#cayley-app summary:hover{color:var(--accent);}

/* the n x (n-1) subword array, following the tableau cells on the demos page */
#cayley-app .word{overflow-x:auto; padding-bottom:.4rem;}
#cayley-app table.grid{border-collapse:separate; border-spacing:2px; margin:0 auto;}
#cayley-app .cell{display:block; width:100%; font:inherit;
  font-family:ui-monospace,Menlo,Consolas,monospace; font-size:11px; line-height:1.5;
  white-space:nowrap; text-align:center; padding:2px 5px; cursor:pointer;
  border:1px solid var(--global-text-color-light,#9a9a94); border-radius:3px;
  background:var(--surface); color:var(--ink);}
#cayley-app .cell.take{background:var(--greenbg); border-color:var(--green);}
#cayley-app .cell.skipedge{background:var(--surface);}
#cayley-app .cell.skipoth{background:var(--purplebg); border-color:var(--purple);}
#cayley-app .cell:hover{outline:2px solid var(--accent); outline-offset:-2px;}
#cayley-app .swleg{font-size:.8rem; color:var(--muted); margin-top:.5rem; text-align:center;}
#cayley-app .swleg i{display:inline-block; width:.85em; height:.85em; border:1px solid var(--line);
  border-radius:3px; vertical-align:-1px; margin-right:.25em;}

/* walk readout */
#cayley-app .prog{height:5px; background:var(--panel); border-radius:3px; overflow:hidden; margin-bottom:.4rem;}
#cayley-app .prog span{display:block; height:100%; width:0; background:var(--green); transition:width .18s linear;}
#cayley-app .now{font-size:.86rem; min-height:1.5em; color:var(--muted);}
#cayley-app .now .big{font-family:ui-monospace,Menlo,monospace; font-size:1.05rem; font-weight:700; color:var(--green);}
#cayley-app .now .vtx{display:inline-block; min-width:1.7em; text-align:center; border:1.6px solid var(--accent);
  color:var(--accent); background:var(--vfill); border-radius:50%; padding:.05em .25em;
  font-family:ui-monospace,Menlo,monospace; font-size:.85rem; font-weight:700;}

/* gallery */
#cayley-app .gallery{display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:.6rem;}
#cayley-app .gcell{border:1px solid var(--line); border-radius:var(--radius); padding:.3rem;
  cursor:pointer; background:var(--panel);}
#cayley-app .gcell:hover{border-color:var(--accent);}
@media print{
  #cayley-app .toolbar, #cayley-app .tabs{display:none !important;}
  #cayley-app .panel{border:none; padding:0;}
  #cayley-app .panel.hidden{display:none !important;}
}
</style>

<div class="wrap">
  <h1>Cayley's formula &mdash; interactive companion</h1>
  <p class="lede">
    Companion to <em>An elaborate new proof of Cayley's formula</em>. Pick a vertex-labelled tree on
    <em>n</em> vertices. The app draws its cyclic embedding, reads off the cyclic factorization of
    &lambda;<sub>n</sub> by walking clockwise from vertex <em>n</em>, and shows the maximal distinguished
    subword of <b>&lambda;</b><sub>n</sub> corresponding to it.
    Email me if you find any errors or want some specific function added.
  </p>

<div class="tabs" id="tabstrip"></div>

<!-- ============ 1. tree <-> subword, with the factorization between ============ -->
<div class="panel" data-panel="explore">
  <p style="margin-top:0">
    Pick a vertex-labelled tree on <i>n</i> vertices. The app draws its <b>cyclic embedding</b>
    (Definition 4.6), reads off the corresponding <b>cyclic factorization</b> of the translation
    &lambda;<sub>n</sub> &isin; <span style="font-style:italic">S&#771;</span><sub>n</sub> by walking clockwise
    from vertex <i>n</i> along the marked edge (Theorem 4.8), and shows the <b>maximal distinguished
    subword</b> of <b>&lambda;</b><sub>n</sub> = [s<sub>0</sub>, &hellip;, s<sub>n-1</sub>]<sup>n-1</sup>
    that corresponds to it (Theorem 6.1).
  </p>
  <div class="toolbar">
    <label>n = <input type="range" id="ex-n" min="2" max="30" value="6"></label>
    <input type="number" id="ex-nbox" min="2" max="30" value="6" style="width:4.2em">
    <button class="primary" id="ex-rand">random tree</button>
    <button id="ex-ex10">paper's n=10 example</button>
    <button id="ex-link" title="copy a link that reproduces this tree">Copy link</button>
    <span class="desc" id="ex-linkmsg"></span>
  </div>
  <div class="toolbar">
    <label for="ex-pruf">Pr&uuml;fer code
      <input type="text" id="ex-pruf" size="34" class="mono" autocomplete="off" spellcheck="false"></label>
    <span class="desc" id="ex-prufmsg"></span>
  </div>
  <div class="toolbar">
    <label for="ex-edgein">or edges
      <input type="text" id="ex-edgein" size="42" class="mono" autocomplete="off" spellcheck="false"
             placeholder="1-2 2-3 3-4 &hellip;"></label>
    <span class="desc" id="ex-edgemsg"></span>
  </div>
  <div class="toolbar">
    <label>corner labels
      <select id="ex-lab">
        <option value="run">run-leaves</option>
        <option value="step">walk step</option>
        <option value="none">none</option>
      </select></label>
    <button class="primary" id="ex-play">&#9654;&nbsp;play</button>
    <button id="ex-step">step &#9654;&#124;</button>
    <button id="ex-back">&#124;&#9664;</button>
    <button id="ex-reset">show whole walk</button>
    <label>speed <input type="range" id="ex-speed" min="1" max="10" value="5" style="width:80px"></label>
  </div>
  <div class="panel-box" id="ex-nowcard" style="padding:.55rem .8rem;margin-bottom:.6rem">
    <div class="prog"><span id="ex-progbar"></span></div>
    <div id="ex-now" class="now"></div>
  </div>

  <div class="row" id="ex-top">
    <div class="col"><div class="canvas" id="ex-svg"></div>
      <div class="caption">
        <b style="color:var(--purple)">&#9679;</b> vertex <i>n</i>, the root &middot; edges point towards
        <i>n</i> &middot; the walk starts at <i>n</i> along the marked edge, to its smallest neighbour, and
        turns <b>clockwise</b> &middot; the <b style="color:var(--green)">green</b> numerals in the corners
        are the <b>run-leaves</b>.
      </div>
    </div>
    <div class="col panel-box">
      <div class="head">Cyclic factorization r<sup>T</sup></div>
      <div class="fact" id="ex-fact"></div>
      <details open><summary>run-leaves</summary>
        <div class="desc" id="ex-run"></div></details>
      <details><summary>increasing sequence a<sub>0</sub> &lt; &hellip; &lt; a<sub>2n-2</sub> (Prop. 3.4)</summary>
        <div class="mono" id="ex-aseq"></div></details>
      <details><summary>m<sub>1</sub> &lt; &hellip; &lt; m<sub>2n-2</sub> (Prop. 4.4)</summary>
        <div class="mono" id="ex-mseq"></div></details>
    </div>
  </div>

  <div class="panel-box" style="margin-top:1rem">
    <div class="head">Maximal distinguished subword u<sup>T</sup> &isin; SUB<sub>n</sub></div>
    <p style="margin-top:0">
      A subword with exactly 2n&minus;2 <i>skips</i> whose product of <i>takes</i> is the identity
      (Definition 5.1; the equivalence with the usual notion of distinguished is Cor. 5.15). Each skip
      <i>j</i> contributes the reflection u<sub>(j-1)</sub> s<sub>i<sub>j</sub></sub>
      u<sub>(j-1)</sub><sup>&minus;1</sup> of Def. 5.3, shown in its cell. Drawn as the
      <i>n</i> &times; (<i>n</i>&minus;1) array of Definition&nbsp;5.1, whose <b>rows</b> are the <i>n</i>
      consecutive factors of length <i>n</i>&minus;1 and whose <b>columns</b> are those rows vertically
      aligned. <b>Click a cell to toggle it</b> &mdash; as soon as the result is again a maximal
      distinguished subword, the tree and factorization above follow it.
    </p>
    <div class="word" id="sw-word"></div>
    <div class="toolbar" style="margin-bottom:0"><span class="desc" id="sw-status"></span></div>
    <div class="toolbar" style="margin-top:.3rem">
      <button id="sw-rotb" title="rotate the indicator word one step backwards">&#8634;</button>
      <button class="primary" id="sw-rot"
        title="Corollary 5.7: the rotation of a maximal distinguished subword is again one">rotate &#8635;</button>
      <button id="sw-reset">reset grid to this tree</button>
      <span class="desc" id="sw-hint"></span>
    </div>
    <div class="note" id="sw-orbit"></div>
  </div>
</div>

<!-- ================= 4. gallery ================= -->
<div class="panel hidden" data-panel="gallery">
  <p style="margin-top:0">
    Every vertex-labelled tree on <i>n</i> vertices in its cyclic embedding, together with its cyclic
    factorization. The n = 4 page reproduces Figure 3 of the paper. Click a tree to open it in the
    explorer.
  </p>
  <div class="toolbar">
    <label>n = <input type="range" id="ga-n" min="2" max="6" value="4"><b id="ga-nv">4</b></label>
    <label>page <select id="ga-page"></select></label>
    <span class="desc" id="ga-count"></span>
  </div>
  <div class="gallery" id="ga-out"></div>
</div>

<p class="caption" style="margin-top:1.2rem;border-top:1px solid var(--line);padding-top:.6rem">
  Companion to E.&nbsp;Banaian, A.&nbsp;T.&nbsp;N.&nbsp;Hoang, E.&nbsp;Kelley, W.&nbsp;Miller, J.&nbsp;Stack,
  C.&nbsp;Stephen, N.&nbsp;Williams, <i>An elaborate new proof of Cayley's formula</i>,
  Algebraic Combinatorics <b>8</b> (2025), no.&nbsp;4, 971&ndash;995,
  <a href="https://doi.org/10.5802/alco.429">doi:10.5802/alco.429</a>.
</p>
</div><!-- /.wrap -->

<script>
(function(){
"use strict";

/* ============================ affine symmetric group ============================
   w in S~_n is stored as its window W = [w(1),...,w(n)].                        */

const mod = (a,b) => ((a % b) + b) % b;

function idW(n){ const W=[]; for(let i=1;i<=n;i++) W.push(i); return W; }

function applyW(n,W,x){ const i = mod(x-1,n); const k = (x-1-i)/n; return W[i] + k*n; }

function mulW(n,W,V){                     // (WV)(x) = W(V(x))
  const out=[]; for(let i=0;i<n;i++) out.push(applyW(n,W,V[i])); return out;
}

function reflW(n,i,j){                    // ((i,j)) : swaps i+kn <-> j+kn
  const d=j-i, out=[];
  for(let x=1;x<=n;x++){
    if(mod(x-i,n)===0) out.push(x+d);
    else if(mod(x-j,n)===0) out.push(x-d);
    else out.push(x);
  }
  return out;
}

const sW = (n,k) => reflW(n,k,k+1);

function lengthW(n,W){                    // Coxeter length of an affine permutation
  let L=0;
  for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) L += Math.abs(Math.floor((W[j]-W[i])/n));
  return L;
}

function lamW(n){                         // lambda_n : x -> x+n, except 0 mod n -> x-n(n-1)
  const out=[]; for(let x=1;x<=n;x++) out.push(x%n!==0 ? x+n : x-n*(n-1)); return out;
}

const eqW = (A,B) => A.length===B.length && A.every((v,i)=>v===B[i]);

/* ================================== trees ================================== */

function pruferToTree(n, seq){            // seq has length n-2, entries in [1,n]
  if(n===1) return [];
  if(n===2) return [[1,2]];
  const deg = new Array(n+1).fill(1);
  seq.forEach(v => deg[v]++);
  const avail=[]; for(let v=1;v<=n;v++) if(deg[v]===1) avail.push(v);
  avail.sort((a,b)=>a-b);
  const edges=[];
  for(const v of seq){
    const leaf = avail.shift();
    edges.push([Math.min(leaf,v), Math.max(leaf,v)]);
    if(--deg[v]===1){ avail.push(v); avail.sort((a,b)=>a-b); }
  }
  edges.push([Math.min(avail[0],avail[1]), Math.max(avail[0],avail[1])]);
  return edges;
}

function randomTree(n){
  const seq=[]; for(let i=0;i<n-2;i++) seq.push(1+Math.floor(Math.random()*n));
  return { seq, edges: pruferToTree(n,seq) };
}

/* inverse Prüfer, so any tree (from the gallery, or the paper's example) can be
   shown as a code the reader can edit */
function treeToPrufer(n, edges){
  if(n<=2) return [];
  const adj={}; for(let i=1;i<=n;i++) adj[i]=[];
  for(const [a,b] of edges){ adj[a].push(b); adj[b].push(a); }
  const deg={}; for(let i=1;i<=n;i++) deg[i]=adj[i].length;
  const gone=new Set(); const leaves=[];
  for(let i=1;i<=n;i++) if(deg[i]===1) leaves.push(i);
  leaves.sort((a,b)=>a-b);
  const seq=[];
  for(let t=0;t<n-2;t++){
    const leaf=leaves.shift(); gone.add(leaf);
    let p=null; for(const x of adj[leaf]) if(!gone.has(x)) p=x;
    seq.push(p);
    if(--deg[p]===1){ leaves.push(p); leaves.sort((a,b)=>a-b); }
  }
  return seq;
}

/* Definition 4.6: at every vertex i the neighbours increase clockwise, except that
   for i != n the neighbour on the path to n is read as the central label i.
   The marked edge is the edge from n to its smallest neighbour.                */
function cyclicEmbedding(n, edges){
  const adj = {}; for(let i=1;i<=n;i++) adj[i]=[];
  for(const [a,b] of edges){ adj[a].push(b); adj[b].push(a); }
  const parent = {}; parent[n]=null;
  const seen = new Set([n]); const q=[n];
  while(q.length){
    const v=q.shift();
    for(const u of adj[v]) if(!seen.has(u)){ seen.add(u); parent[u]=v; q.push(u); }
  }
  if(seen.size!==n) return null;                       // not connected
  const order={};
  for(let i=1;i<=n;i++){
    const p = parent[i];
    order[i] = adj[i].slice().sort((x,y)=>{
      const kx = (i!==n && x===p) ? i : x;
      const ky = (i!==n && y===p) ? i : y;
      return kx-ky;
    });
  }
  return { order, parent, adj };
}

/* clockwise tour from n, starting along the marked edge */
function walk(n, order){
  const vs=[n, order[n][0]];
  let u=n, v=order[n][0];
  for(let t=0; t<2*(n-1)-1; t++){
    const lst = order[v];
    const w = lst[(lst.indexOf(u)+1) % lst.length];
    vs.push(w); u=v; v=w;
  }
  return vs;
}

/* the sequence of 2n-2 affine reflections r^T, as printed in the paper */
function treeToFact(n, edges, embOverride){
  const emb = embOverride || cyclicEmbedding(n, edges); if(!emb) return null;
  const vs = walk(n, emb.order);
  if(vs.length !== 2*n-1 || vs[vs.length-1] !== n) return null;
  const R=[];
  for(let k=1;k<vs.length;k++){
    const a=vs[k-1], b=vs[k];
    R.push(a<b ? [a,b] : [a-n,b]);
  }
  return { R, vs, emb };
}

/* lift [((i_k,j_k))] to the increasing sequence a_0 < ... < a_{2n-2} of Prop. 3.4 */
function liftA(n, R){
  const a=[0];
  for(const [i,j] of R){
    const k = a[a.length-1] - i;
    if(mod(k,n)!==0) return null;
    a.push(j+k);
  }
  return a;
}

function factProduct(n, R){
  let W = idW(n);
  for(const [i,j] of R) W = mulW(n, W, reflW(n,i,j));
  return W;
}

/* m_j of Prop. 4.4:  (r_1...r_{j-1}) r_j (r_{j-1}...r_1) = ((0, m_j)) */
function mSeq(n, R, a){
  let W = idW(n); const ms=[];
  for(let k=0;k<R.length;k++){
    ms.push(applyW(n, W, a[k+1]));
    W = mulW(n, W, reflW(n, R[k][0], R[k][1]));
  }
  return ms;
}

/* Every reflection ((i,j)) has representatives ((i+kn, j+kn)) and ((j,i)).
   The paper writes r_l = ((v_{l-1}, v_l)) if v_{l-1} < v_l, and ((v̄_{l-1}, v_l))
   otherwise, where v = a mod n in [1,n].  The increasing lift a_0 < ... < a_{2n-2}
   pins this down, so we normalise every factorization to that form before reading
   off edges — reflections obtained by conjugation inside a subword arrive in an
   arbitrary representative. */
function canonical(n, a){
  const Rc=[];
  for(let k=1;k<a.length;k++){
    const x = mod(a[k-1],n) || n, y = mod(a[k],n) || n;
    Rc.push(x<y ? [x,y] : [x-n,y]);
  }
  return Rc;
}

/* full diagnostic pass over a candidate factorization */
function analyse(n, R){
  const res = { R, Rc:R, n, lengthOk:false, liftOk:false, increasing:false,
                product:null, isLambda:false, treelike:false, mIncreasing:false,
                cyclic:false, a:null, ms:null, edges:null, firstBadM:-1 };
  res.lengthOk = (R.length === 2*n-2);
  const a = liftA(n,R); res.a = a; res.liftOk = !!a;
  if(a){
    res.increasing = a.every((v,i)=> i===0 || a[i-1] < v);
  }
  res.product = factProduct(n,R);
  res.isLambda = eqW(res.product, lamW(n));
  res.treelike = res.lengthOk && res.liftOk && res.increasing && res.isLambda;
  if(res.treelike){
    res.Rc = canonical(n,a);
    res.ms = mSeq(n,res.Rc,a);
    res.mIncreasing = res.ms.every((v,i)=> i===0 || res.ms[i-1] < v);
    if(!res.mIncreasing) res.firstBadM = res.ms.findIndex((v,i)=> i>0 && res.ms[i-1]>=v);
    res.cyclic = res.mIncreasing;
    const edges=[];
    for(const [i,j] of res.Rc) if(1<=i && i<j && j<=n) edges.push([i,j]);
    edges.sort((p,q)=> p[0]-q[0] || p[1]-q[1]);
    res.edges = edges;
  }
  return res;
}

/* ================================ subwords ================================ */

function lamWord(n){                        // [0,1,...,n-1] repeated n-1 times
  const w=[]; for(let r=0;r<n-1;r++) for(let k=0;k<n;k++) w.push(k); return w;
}

/* reflections attached to the skips of a subword (1 = take, 0 = skip) */
function subwordToFact(n, word, u){
  let W = idW(n); const R=[];
  for(let p=0;p<word.length;p++){
    const k = word[p];
    if(u[p]) W = mulW(n, W, sW(n,k));
    else{
      const i = applyW(n,W,k), j = applyW(n,W,k+1);
      R.push(i<j ? [i,j] : [j,i]);
    }
  }
  return R;
}

/* Inverse of subwordToFact, in O(n^2): scan the word once, skipping exactly when the
   conjugated reflection u_(p) s_{i_p} u_(p)^{-1} is the next reflection the target
   factorization needs.  This avoids the exponential search, so run-leaves and the
   matching subword are available for any n, not just the enumerable range.
   Checked against the subword table of Figure 1 (n = 10) and, exhaustively, against
   brute-force enumeration for every tree with n <= 7. */
function treeToSubword(n, Rc){
  const word = lamWord(n), m = word.length;
  let W = idW(n);
  const u = new Array(m).fill(1);
  let j = 0;
  for(let p=0;p<m;p++){
    const k = word[p];
    if(j < Rc.length){
      const x = applyW(n,W,k), y = applyW(n,W,k+1);
      const a = Math.min(x,y), b = Math.max(x,y);
      const t = Rc[j], ta = Math.min(t[0],t[1]), tb = Math.max(t[0],t[1]);
      if(mod(a-ta,n)===0 && mod(b-tb,n)===0 && (b-a)===(tb-ta)){ u[p]=0; j++; continue; }
    }
    W = mulW(n, W, sW(n,k));
  }
  return (j===Rc.length) ? u : null;
}

/* Run-leaves, straight from Section 6.2 — needs only the tree and its clockwise walk:
     l_0       = v_1, the smallest neighbour of n
     l_{2n-2}  = (n-1) - v_{2n-3}, v_{2n-3} being the largest neighbour of n
     l_k       = v'_{k+1} - v'_{k-1} mod (n-1), taken in [1, n-1],
   where v'_{k±1} is v_k when v_{k±1} lies on the path from v_k to n, and v_{k±1}
   otherwise — the four cases of Figure 6.  (The equivalent characterisation as runs
   of the subword, l_k = p_{k+1} - p_k over the skip positions, is cross-checked
   against this in the test harness.) */
function paperRunLeaves(n, emb, vs){
  if(n<2) return [];
  const L = vs.length, out = new Array(L);
  out[0]   = vs[1];
  out[L-1] = (n-1) - vs[L-2];
  for(let k=1;k<=L-2;k++){
    const v = vs[k];
    const onPath = w => (v!==n && emb.parent[v]===w);
    const vp = onPath(vs[k-1]) ? v : vs[k-1];
    const vn = onPath(vs[k+1]) ? v : vs[k+1];
    out[k] = mod(vn-vp, n-1) || (n-1);
  }
  return out;
}

/* One descriptor per letter of the word, for the Figure 1 grid.  The reflection at a
   skip is defined for any subword, valid or not, so the grid stays informative while
   it is being edited; when the subword really is maximal distinguished we substitute
   the canonical representatives so the cells read exactly as the paper prints them. */
function subwordCells(n, word, u, Rc){
  let W = idW(n); const cells=[]; let j=0;
  for(let p=0;p<word.length;p++){
    const k = word[p];
    if(u[p]){ cells.push({take:true, letter:k}); W = mulW(n,W,sW(n,k)); }
    else{
      const x = applyW(n,W,k), y = applyW(n,W,k+1);
      let pair = x<y ? [x,y] : [y,x];
      if(Rc && Rc[j]) pair = Rc[j];
      const isEdge = (pair[0]>=1 && pair[0]<pair[1] && pair[1]<=n);
      cells.push({take:false, letter:k, refl:pair, isEdge});
      j++;
    }
  }
  return cells;
}

/* Rotation (§5.1).  rot(u) is the subword whose indicator word is
   [psi_{n(n-1)}, psi_1, ..., psi_{n(n-1)-1}] — one cyclic step of the skip pattern,
   over the same word lambda_n.  Corollary 5.7: the rotation of a maximal distinguished
   subword is again one, so this always lands back in SUB_n and therefore on a tree. */
function rotSubword(u, dir){
  const m=u.length, out=new Array(m);
  for(let i=0;i<m;i++) out[i]=u[mod(i-dir,m)];
  return out;
}

/* Smallest d >= 1 with u shifted by d equal to u: the orbit length under rotation,
   the quantity Remark 5.8 asks about. */
function orbitLength(u){
  const m=u.length;
  for(let d=1;d<m;d++){
    let ok=true;
    for(let i=0;i<m;i++) if(u[i]!==u[mod(i-d,m)]){ ok=false; break; }
    if(ok) return d;
  }
  return m;
}

function subwordProduct(n, word, u){
  let W = idW(n);
  for(let p=0;p<word.length;p++) if(u[p]) W = mulW(n,W,sW(n,word[p]));
  return W;
}

/* ============================== radial layout ==============================
   SVG has y pointing down, so increasing angle = clockwise on screen.
   Children in clockwise cyclic order (starting just after the parent slot)
   receive increasing angles inside a wedge centred on the parent->v direction. */

function layout(n, emb){
  const {order, parent} = emb;
  const size={};                                   // leaf count of each subtree
  (function sz(v,p){
    const kids = order[v].filter(x=>x!==p);
    if(!kids.length){ size[v]=1; return 1; }
    let s=0; for(const c of kids) s += sz(c,v);
    size[v]=s; return s;
  })(n,null);

  const pos={}; pos[n]={x:0,y:0,depth:0};
  const R = 1;
  (function place(v, p, centre, width, depth){
    let kids;
    if(v===n) kids = order[v].slice();
    else{
      const idx = order[v].indexOf(p);
      kids=[]; for(let t=1;t<order[v].length;t++) kids.push(order[v][(idx+t)%order[v].length]);
    }
    if(!kids.length) return;
    const tot = kids.reduce((s,c)=>s+size[c],0);
    let ang = centre - width/2;
    for(const c of kids){
      const w = width * size[c]/tot;
      const th = ang + w/2;
      const r = (depth+1)*R;
      pos[c] = { x: r*Math.cos(th), y: r*Math.sin(th), depth: depth+1, ang: th };
      place(c, v, th, Math.min(w, Math.PI*0.92), depth+1);
      ang += w;
    }
  })(n, null, -Math.PI/2, 2*Math.PI, 0);            // start the root fan at "up"
  return pos;
}

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function renderTree(n, edges, opts){
  opts = opts || {};
  const emb = cyclicEmbedding(n, edges);
  if(!emb) return '<div class="desc">not a tree</div>';
  const pos = layout(n, emb);
  // corner labels stick out past the vertices, so they need room in the margin
  const W = opts.width || 420, H = opts.height || 340,
        pad = opts.pad || (opts.cornerLabels ? 40 : 26);
  let xs=[], ys=[];
  for(const k in pos){ xs.push(pos[k].x); ys.push(pos[k].y); }
  const x0=Math.min(...xs), x1=Math.max(...xs), y0=Math.min(...ys), y1=Math.max(...ys);
  // a path collapses to a single ray, so a degenerate extent must not bound the scale
  const sx = (x1-x0)<1e-9 ? Infinity : (W-2*pad)/(x1-x0);
  const sy = (y1-y0)<1e-9 ? Infinity : (H-2*pad)/(y1-y0);
  const s = Math.min(sx,sy, opts.maxScale || 90);
  const cx = (x0+x1)/2, cy=(y0+y1)/2;
  const P = v => ({ x: W/2 + (pos[v].x-cx)*s, y: H/2 + (pos[v].y-cy)*s });

  /* Size the vertices from the tightest gap the layout actually produced, not from n
     alone — a wide shallow tree squeezes siblings together at any n. */
  let minD = Infinity;
  for(let a=1;a<=n;a++) for(let b=a+1;b<=n;b++){
    const p=P(a), q=P(b); const d=Math.hypot(p.x-q.x, p.y-q.y);
    if(d<minD) minD=d;
  }
  if(!isFinite(minD)) minD = 40;
  const r = opts.r || Math.max(4.5, Math.min(13, minD*0.40));
  const fs = Math.max(6.5, r*0.95);
  const upto = (opts.upto === undefined) ? Infinity : opts.upto;
  const vs = opts.vs || walk(n, emb.order);
  const corner = opts.cornerLabels || null;    // one entry per visit vs[0..2n-2]

  let out = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px;display:block;margin:0 auto">`;
  const uid = 'ca'+(renderTree.seq=(renderTree.seq||0)+1);
  out += `<defs>`
       + `<marker id="${uid}e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--edge)"/></marker>`
       + `</defs>`;

  // Edges, all directed towards n, as the paper draws them.
  for(const [a,b] of edges){
    const child = (emb.parent[a]===b) ? a : b, par = (child===a)? b : a;
    const A = P(child), B = P(par);
    const dx=B.x-A.x, dy=B.y-A.y, L=Math.hypot(dx,dy)||1;
    const ax=A.x+dx/L*r, ay=A.y+dy/L*r, bx=B.x-dx/L*(r+3), by=B.y-dy/L*(r+3);
    out += `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" `
         + `stroke="var(--edge)" stroke-width="1.7" marker-end="url(#${uid}e)"/>`;
  }

  // trail of the walk so far
  if(isFinite(upto)){
    for(let k=1;k<=Math.min(upto, vs.length-1);k++){
      const A=P(vs[k-1]), B=P(vs[k]);
      const cur = (k===upto);
      out += `<line x1="${A.x.toFixed(1)}" y1="${A.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" `
           + `stroke="var(--green)" stroke-width="${cur?4.5:2.8}" opacity="${cur?1:.35}" stroke-linecap="round"/>`;
    }
  }

  /* Corner labels sit in the angular sector swept clockwise from the incoming edge to
     the outgoing edge — the sector the walker actually turns through.  A leaf has
     in = out, so the sector is the full turn and the label lands opposite its edge.
     Vertex n is visited first and last; those two corners split the one sector
     between the last incoming edge and the first outgoing edge, exactly as the
     dashed arrow splits it in Figure 1. */
  if(corner){
    const L = vs.length;
    const ang = (v,u) => Math.atan2(P(u).y-P(v).y, P(u).x-P(v).x);
    for(let k=0;k<L;k++){
      const txt = corner[k];
      if(txt===undefined || txt===null || txt==='') continue;
      if(isFinite(upto) && k>upto) continue;
      const v = vs[k];
      const inN  = (k===0)     ? vs[L-2] : vs[k-1];
      const outN = (k===L-1)   ? vs[1]   : vs[k+1];
      const t0 = ang(v,inN);
      let d = mod(ang(v,outN) - t0, 2*Math.PI);
      if(d < 1e-9) d = 2*Math.PI;
      let th;
      if(k===0)        th = t0 + d*0.75;      // nearer the outgoing edge
      else if(k===L-1) th = t0 + d*0.25;      // nearer the incoming edge
      else             th = t0 + d/2;
      const rad = r + fs*1.15;      // outside the marked-edge arc, which sits at r+4
      const px = P(v).x + rad*Math.cos(th), py = P(v).y + rad*Math.sin(th);
      const hot = (k===upto);
      out += `<line x1="${(P(v).x+(r+1)*Math.cos(th)).toFixed(1)}" y1="${(P(v).y+(r+1)*Math.sin(th)).toFixed(1)}" `
           + `x2="${(P(v).x+(r+fs*0.45)*Math.cos(th)).toFixed(1)}" y2="${(P(v).y+(r+fs*0.45)*Math.sin(th)).toFixed(1)}" `
           + `stroke="var(--green)" stroke-width="1" opacity=".75"/>`;
      out += `<text x="${px.toFixed(1)}" y="${(py+fs*0.35).toFixed(1)}" font-size="${(fs*0.85).toFixed(1)}" `
           + `fill="var(--green)" text-anchor="middle" font-weight="${hot?700:600}" `
           + `opacity="${hot?1:.9}">${txt}</text>`;
    }
  }

  /* The walker, drawn before the vertices so it slides *under* the circle it arrives
     at instead of covering the label.  cx/cy are animated rather than animateMotion,
     so with SMIL disabled it parks at the start of the edge, not at the origin. */
  if(isFinite(upto) && upto>=1 && upto<vs.length){
    const A=P(vs[upto-1]), B=P(vs[upto]);
    const dur = (opts.dur || 0.45).toFixed(2);
    out += `<circle cx="${A.x.toFixed(1)}" cy="${A.y.toFixed(1)}" r="${Math.max(3,r*0.5).toFixed(1)}" fill="var(--green)">`
         + `<animate attributeName="cx" from="${A.x.toFixed(1)}" to="${B.x.toFixed(1)}" dur="${dur}s" fill="freeze"/>`
         + `<animate attributeName="cy" from="${A.y.toFixed(1)}" to="${B.y.toFixed(1)}" dur="${dur}s" fill="freeze"/>`
         + `</circle>`;
  }

  // vertices
  for(let v=1;v<=n;v++){
    const p=P(v);
    const isRoot = (v===n);
    out += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" `
         + `fill="${isRoot?'var(--purplefill)':'var(--vfill)'}" `
         + `stroke="${isRoot?'var(--purple)':'var(--accent)'}" stroke-width="${isRoot?4:2.4}"/>`;
    out += `<text x="${p.x.toFixed(1)}" y="${(p.y+fs*0.36).toFixed(1)}" font-size="${fs}" text-anchor="middle" `
         + `fill="${isRoot?'var(--purple)':'var(--accent)'}" font-weight="700">${v}</text>`;
  }

  out += `</svg>`;
  return out;
}

/* ============================== formatting ============================== */

const bar = x => (x<0 ? '−'+(-x) : ''+x);       // proper minus sign

function reflStr(n,[i,j]){ return `((${bar(i)},${bar(j)}))`; }

function factHTML(n,R,hl,upto){
  return R.map((p,k)=>{
    let cls='refl';
    if(hl===k) cls+=' hl';
    if(upto!==undefined && k>=upto) cls+=' dim';
    return `<span class="${cls}" data-k="${k}">${esc(reflStr(n,p))}</span>`;
  }).join(' ');
}

function windowStr(W){ return '['+W.join(', ')+']'; }

function fmtEdges(edges){ return edges.map(e=>e[0]+'-'+e[1]).join(' '); }

/* ================================== state ================================== */

const S = {
  /* One object, three views.  `edges` is the tree; `u` is the subword grid, which is
     re-derived from the tree on every tree change but can also be edited directly,
     in which case a valid edit writes back into `edges`. */
  ex: { n:6, edges:null, u:null, step:Infinity, timer:null, dirty:false, rot:0 },
  ga: { n:4, page:0 }
};
const $ = id => document.getElementById(id);

/* -------------------------------- tabs -------------------------------- */
const TABS=[['explore','tree ⟷ subword'],['gallery','gallery']];
$('tabstrip').innerHTML = TABS.map(([k,l],i)=>
  `<button class="tab-btn${i===0?' active':''}" data-t="${k}">${l}</button>`).join('');
$('tabstrip').addEventListener('click', e=>{
  const b = e.target.closest('.tab-btn'); if(!b) return;
  document.querySelectorAll('#cayley-app .tab-btn').forEach(x=>x.classList.toggle('active', x===b));
  document.querySelectorAll('#cayley-app [data-panel]').forEach(p=>
    p.classList.toggle('hidden', p.dataset.panel!==b.dataset.t));
});

/* ========================= panel 1 : tree -> fact ========================= */

function exDraw(){
  const n=S.ex.n, edges=S.ex.edges;
  const tf = treeToFact(n, edges);
  const A = analyse(n, tf.R);
  const upto = S.ex.step;
  const total = 2*n-2;
  const mode = $('ex-lab').value;

  // The matching maximal distinguished subword: run-leaves come from it, and unless
  // the grid has been edited out of step it *is* the grid.  Derived here rather than
  // in exSet so that every entry point (slider, Prüfer, edge list, gallery) stays in
  // sync, including when n changes underneath a stale grid.
  const u = treeToSubword(n, A.Rc);
  if(!S.ex.dirty || !S.ex.u || S.ex.u.length !== n*(n-1)){
    S.ex.u = u ? u.slice() : new Array(n*(n-1)).fill(1);
    S.ex.dirty = false;
  }
  // run-leaves straight from Section 6.2, needing only the tree and its walk
  const rl = paperRunLeaves(n, tf.emb, tf.vs);

  let corner = null;
  if(mode==='run') corner = rl;
  else if(mode==='step') corner = tf.vs.map((_,k)=> k===0 ? '' : k);

  const W = n>22 ? 720 : n>14 ? 620 : 460;
  const H = n>22 ? 620 : n>14 ? 520 : 380;
  $('ex-top').classList.toggle('wide', n>14);   // give the drawing full width at large n
  $('ex-svg').innerHTML = renderTree(n, edges, {
    vs: tf.vs, upto, cornerLabels: corner, width: W, height: H,
    dur: 0.9/(+$('ex-speed').value*0.35+0.6)
  });
  $('ex-fact').innerHTML = factHTML(n, tf.R, isFinite(upto)? upto-1 : -1, isFinite(upto)? upto : undefined);

  // "where am I" readout
  const done = isFinite(upto) ? upto : total;
  $('ex-progbar').style.width = (100*done/total).toFixed(1)+'%';
  if(isFinite(upto) && upto>=1){
    const a=tf.vs[upto-1], b=tf.vs[upto];
    $('ex-now').innerHTML =
        `step <b>${upto}</b> of ${total} &nbsp; `
      + `<span class="vtx">${a}</span> <span style="color:var(--green)">&#10230;</span> <span class="vtx">${b}</span>`
      + ` &nbsp; record <span class="big">${esc(reflStr(n,tf.R[upto-1]))}</span>`
      + ` &nbsp;<span class="desc">· run-leaf at this corner: <b style="color:var(--green)">${rl[upto]}</b></span>`;
  } else if(isFinite(upto)){
    $('ex-now').innerHTML = `at the start: vertex <span class="vtx">${n}</span>, about to take the marked edge to `
      + `<span class="vtx">${tf.vs[1]}</span>`
      + ` &nbsp;<span class="desc">· run-leaf here: <b style="color:var(--green)">${rl[0]}</b></span>`;
  } else {
    $('ex-now').innerHTML = `<span class="desc">whole walk shown — ${total} steps, `
      + `${A.cyclic?'<span class="ok">a cyclic factorization of λ<sub>'+n+'</sub></span>'
                   :'<span class="bad">not cyclic</span>'}.</span>`;
  }

  $('ex-run').innerHTML =
      `<div class="mono" style="margin:.3rem 0">${rl.map((v,i)=>
          `<span class="refl${isFinite(upto)&&i===upto?' hl':''}">${v}</span>`).join(' ')}</div>`;

  $('ex-aseq').textContent = A.a.map(bar).join(' < ');
  $('ex-mseq').textContent = A.ms ? A.ms.map(bar).join(' < ') : '—';
  if(document.activeElement !== $('ex-edgein')) $('ex-edgein').value = fmtEdges(edges);
  swDraw();                                     // the grid always follows this render
  syncHash();
}

/* The Prüfer box always shows the code of whatever tree is on screen, so it stays
   meaningful after a random draw, a gallery click, or the paper's example. */
function exSet(n, edges){
  exStop();
  // canonicalise edge order so the edge box and permalink read the same every time
  edges = edges.map(e=>[Math.min(e[0],e[1]), Math.max(e[0],e[1])])
               .sort((a,b)=> a[0]-b[0] || a[1]-b[1]);
  S.ex.n=n; S.ex.edges=edges; S.ex.step=Infinity;
  S.ex.dirty = false;                 // exDraw re-derives the grid from the tree
  S.ex.rot = 0;                       // a new tree starts a fresh orbit walk
  $('ex-n').value=n; $('ex-nbox').value=n;
  $('ex-pruf').value = treeToPrufer(n, edges).join(' ');
  $('ex-pruf').style.borderColor='';
  $('ex-prufmsg').innerHTML = n<=2
    ? 'n ≤ 2: the code is empty (only one tree)'
    : `${n-2} entr${n===3?'y':'ies'} from 1…${n}`;
  $('ex-edgein').style.borderColor=''; $('ex-edgemsg').textContent='';
  exDraw();                                  // exDraw fills the edge box
}
function exRandom(){ const n=+$('ex-n').value; exSet(n, randomTree(n).edges); }

$('ex-n').addEventListener('input', ()=>{ $('ex-nbox').value=$('ex-n').value; exRandom(); });
$('ex-nbox').addEventListener('change', ()=>{
  let v=Math.round(+$('ex-nbox').value);
  if(!Number.isFinite(v)) v=6;
  v=Math.max(2, Math.min(30, v));
  $('ex-nbox').value=v; $('ex-n').value=v; exRandom();
});
$('ex-lab').addEventListener('change', exDraw);
$('ex-speed').addEventListener('input', ()=>{ if(S.ex.timer){ exStop(); exPlay(true); } });
$('ex-rand').addEventListener('click', exRandom);
$('ex-ex10').addEventListener('click', ()=>{
  exSet(10, [[1,3],[1,4],[1,5],[1,8],[2,10],[5,7],[5,10],[6,8],[9,10]]);
});
$('ex-pruf').addEventListener('input', ()=>{
  const n=S.ex.n, box=$('ex-pruf'), msg=$('ex-prufmsg');
  const raw=box.value.trim();
  const seq = raw==='' ? [] : raw.split(/[\s,]+/).map(Number);
  if(seq.some(v=>!Number.isInteger(v))){
    box.style.borderColor='var(--bad)'; msg.innerHTML='<span class="bad">only whole numbers, separated by spaces or commas</span>'; return;
  }
  const outOfRange = seq.filter(v=> v<1 || v>n);
  if(outOfRange.length){
    box.style.borderColor='var(--bad)'; msg.innerHTML=`<span class="bad">${outOfRange.join(', ')} not in 1…${n}</span>`; return;
  }
  if(seq.length !== n-2){
    box.style.borderColor='var(--bad)';
    msg.innerHTML=`<span class="bad">${seq.length} entr${seq.length===1?'y':'ies'}, need exactly ${n-2}</span>`;
    return;
  }
  box.style.borderColor='';
  msg.innerHTML='<span class="ok">✓</span> valid';
  exStop();
  S.ex.edges = pruferToTree(n, seq); S.ex.step=Infinity;
  $('ex-edgein').style.borderColor=''; $('ex-edgemsg').textContent='';
  exDraw();
});

/* Direct edge entry, for a tree you already have in hand. n is inferred from the
   largest label unless the slider is already bigger. */
$('ex-edgein').addEventListener('input', ()=>{
  const box=$('ex-edgein'), msg=$('ex-edgemsg');
  const raw=box.value.trim();
  if(raw===''){ box.style.borderColor=''; msg.textContent=''; return; }
  const nums = raw.match(/\d+/g);
  if(!nums || nums.length%2){ box.style.borderColor='var(--bad)'; msg.innerHTML='<span class="bad">need an even count of vertex labels</span>'; return; }
  const v=nums.map(Number), edges=[];
  for(let k=0;k<v.length;k+=2) edges.push([Math.min(v[k],v[k+1]), Math.max(v[k],v[k+1])]);
  const maxv=Math.max(...v), minv=Math.min(...v);
  const n = maxv;
  if(minv<1){ box.style.borderColor='var(--bad)'; msg.innerHTML='<span class="bad">labels start at 1</span>'; return; }
  if(n>30){ box.style.borderColor='var(--bad)'; msg.innerHTML='<span class="bad">n ≤ 30</span>'; return; }
  if(edges.some(([a,b])=>a===b)){ box.style.borderColor='var(--bad)'; msg.innerHTML='<span class="bad">no loops</span>'; return; }
  if(edges.length !== n-1){
    box.style.borderColor='var(--bad)';
    msg.innerHTML=`<span class="bad">${edges.length} edges on ${n} vertices, a tree needs ${n-1}</span>`; return;
  }
  if(!cyclicEmbedding(n, edges)){
    box.style.borderColor='var(--bad)'; msg.innerHTML='<span class="bad">not connected — that is a forest, not a tree</span>'; return;
  }
  box.style.borderColor=''; msg.innerHTML='<span class="ok">✓</span> valid';
  exStop();
  // canonicalise edge order so the edge box and permalink read the same every time
  edges = edges.map(e=>[Math.min(e[0],e[1]), Math.max(e[0],e[1])])
               .sort((a,b)=> a[0]-b[0] || a[1]-b[1]);
  S.ex.n=n; S.ex.edges=edges; S.ex.step=Infinity;
  $('ex-n').value=n; $('ex-nbox').value=n;
  $('ex-pruf').value=treeToPrufer(n,edges).join(' ');
  $('ex-prufmsg').innerHTML='';
  exDraw();
});
function exStop(){
  if(S.ex.timer){ clearInterval(S.ex.timer); S.ex.timer=null; }
  $('ex-play').innerHTML='&#9654;&nbsp;play';
}
function exPlay(resume){
  const max=2*S.ex.n-2;
  if(!resume || !isFinite(S.ex.step) || S.ex.step>=max) S.ex.step = resume && isFinite(S.ex.step) ? S.ex.step : 0;
  exDraw();
  const ms = 1400/(+$('ex-speed').value*0.35+0.6)/2.2;
  S.ex.timer=setInterval(()=>{
    S.ex.step++;
    if(S.ex.step>max){ exStop(); S.ex.step=Infinity; }
    exDraw();
  }, Math.max(180, ms));
  $('ex-play').innerHTML='&#10073;&#10073;&nbsp;pause';
}
$('ex-reset').addEventListener('click', ()=>{ exStop(); S.ex.step=Infinity; exDraw(); });
$('ex-step').addEventListener('click', ()=>{
  exStop();
  const max=2*S.ex.n-2;
  S.ex.step = !isFinite(S.ex.step) ? 0 : (S.ex.step>=max ? 0 : S.ex.step+1);
  exDraw();
});
$('ex-back').addEventListener('click', ()=>{
  exStop();
  const max=2*S.ex.n-2;
  S.ex.step = !isFinite(S.ex.step) ? max-1 : (S.ex.step<=0 ? max : S.ex.step-1);
  exDraw();
});
$('ex-play').addEventListener('click', ()=>{ if(S.ex.timer) exStop(); else exPlay(true); });

/* ============ the subword grid, and the grid -> tree direction ============ */

function swDraw(){
  const n=S.ex.n, word=lamWord(n), u=S.ex.u;
  const skips = u.reduce((a,x)=>a+(x?0:1),0);
  const prod  = subwordProduct(n, word, u);
  const isId  = eqW(prod, idW(n));
  const okSkips = (skips === 2*n-2);
  const A = (okSkips && isId) ? analyse(n, subwordToFact(n, word, u)) : null;
  const cells = subwordCells(n, word, u, A && A.treelike ? A.Rc : null);

  /* Definition 5.1's n x (n-1) array. */
  const cols = Math.max(1, n-1), rows = Math.ceil(word.length/cols);
  let html='<table class="grid">';
  for(let rI=0;rI<rows;rI++){
    html+='<tr>';
    for(let cI=0;cI<cols;cI++){
      const p = rI*cols + cI;
      if(p >= word.length){ html+='<td style="border:none"></td>'; continue; }
      const c = cells[p];
      const cls = c.take ? 'take' : (c.isEdge ? 'skipedge' : 'skipoth');
      const txt = c.take ? `s<sub>${c.letter}</sub>` : esc(reflStr(n, c.refl));
      const tip = c.take ? `row ${rI+1}, column ${cI+1} (position ${p+1}): take s_${c.letter}`
                         : `row ${rI+1}, column ${cI+1} (position ${p+1}): skip s_${c.letter}, contributing ${reflStr(n,c.refl)}`;
      html += `<td><button class="cell ${cls}" data-p="${p}" title="${tip}">${txt}</button></td>`;
    }
    html+='</tr>';
  }
  html+='</table>'
     + `<div class="swleg">`
     + `<i style="background:var(--greenbg);border-color:var(--green)"></i>take &nbsp;&nbsp;`
     + `<i style="background:var(--surface)"></i>positive skip &mdash; ((a,b)) with 1 &le; a &lt; b &le; n, the ${n-1} tree edges &nbsp;&nbsp;`
     + `<i style="background:var(--purplebg);border-color:var(--purple)"></i>negative skip &mdash; the other ${n-1}`
     + `</div>`;
  $('sw-word').innerHTML = html;

  const tick = ok => ok ? '<span class="ok">✓</span>' : '<span class="bad">✗</span>';
  let st = `${rows} × ${cols} array, ${word.length} = n(n−1) letters &nbsp;&middot;&nbsp; `
         + `skips <b>${skips}</b> of ${2*n-2} ${tick(okSkips)} &nbsp;&middot;&nbsp; `
         + `product of takes <span class="mono">${windowStr(prod)}</span> ${tick(isId)}`;
  if(A) st += ` &nbsp;&middot;&nbsp; cyclic ${tick(A.cyclic)}`;
  $('sw-status').innerHTML = st;

  if(A){
    const L = orbitLength(u);
    $('sw-orbit').innerHTML =
        `<b>Rotation.</b> rot(u) cycles the indicator word by one place; by Corollary 5.7 it is again `
      + `a maximal distinguished subword, so it is again a tree. This subword's orbit has length `
      + `<b>${L}</b> (of a possible ${word.length} = n(n−1))`
      + (L<word.length ? `, so it is <b>${word.length/L}</b>-fold periodic` : '')
      + `; you are <b>${mod(S.ex.rot,L)}</b> step${mod(S.ex.rot,L)===1?'':'s'} along it. `
      + `<span class="desc">Remark 5.8 asks what the orbit structure of SUB<sub>n</sub> under rotation is.</span>`;
  } else $('sw-orbit').innerHTML = '<span class="desc">Rotation needs a valid subword.</span>';

  $('sw-hint').innerHTML = S.ex.dirty
    ? '<span class="bad">not a maximal distinguished subword</span> — the tree above still shows the '
      + 'last valid one. Keep toggling, or reset.'
    : 'in step with the tree above';
}

/* Grid -> tree.  A toggle that lands back inside SUB_n rewrites the tree; anything
   else leaves the tree alone and marks the grid out of step. */
$('sw-word').addEventListener('click', e=>{
  const b = e.target.closest('.cell'); if(!b) return;
  const p = +b.dataset.p, n = S.ex.n, word = lamWord(n);
  S.ex.u[p] = S.ex.u[p] ? 0 : 1;
  const skips = S.ex.u.reduce((a,x)=>a+(x?0:1),0);
  if(skips === 2*n-2 && eqW(subwordProduct(n, word, S.ex.u), idW(n))){
    const A = analyse(n, subwordToFact(n, word, S.ex.u));
    if(A.cyclic){ exSet(n, A.edges); return; }
  }
  S.ex.dirty = true;
  exDraw();
});

$('sw-reset').addEventListener('click', ()=>{ exSet(S.ex.n, S.ex.edges); });

/* =========================== panel 4 : gallery =========================== */

const PAGE=24;
function gaDraw(){
  const n=S.ga.n;
  const total=Math.pow(n,n-2);
  const trees=[];
  if(n===2) trees.push([[1,2]]);
  else{
    const seq=new Array(n-2).fill(1);
    const rec=(i)=>{
      if(i===n-2){ trees.push(pruferToTree(n,seq.slice())); return; }
      for(let v=1;v<=n;v++){ seq[i]=v; rec(i+1); }
    };
    rec(0);
  }
  const pages=Math.ceil(trees.length/PAGE);
  const sel=$('ga-page');
  if(sel.options.length!==pages || +sel.dataset.n!==n){
    sel.innerHTML=''; sel.dataset.n=n;
    for(let p=0;p<pages;p++){ const o=document.createElement('option'); o.value=p; o.textContent=(p+1)+' / '+pages; sel.appendChild(o); }
    sel.value=Math.min(S.ga.page,pages-1);
  }
  S.ga.page=+sel.value;
  $('ga-count').innerHTML = `${trees.length} trees = n<sup>n−2</sup> = ${total} ${trees.length===total?'<span class="ok">✓</span>':'<span class="bad">✗</span>'}`;
  const slice = trees.slice(S.ga.page*PAGE, S.ga.page*PAGE+PAGE);
  $('ga-out').innerHTML = slice.map((e,i)=>{
    const R = treeToFact(n,e).R;
    return `<div class="gcell" data-i="${S.ga.page*PAGE+i}">`
      + renderTree(n, e, { width:150, height:130, r:9, pad:16, maxScale:34 })
      + `<div class="mono" style="font-size:.62em;text-align:center;word-break:break-all;color:var(--muted)">`
      + R.map(p=>esc(reflStr(n,p))).join('') + `</div></div>`;
  }).join('');
  $('ga-out').dataset.trees = JSON.stringify(slice);
}
$('ga-n').addEventListener('input', ()=>{ S.ga.n=+$('ga-n').value; $('ga-nv').textContent=S.ga.n; S.ga.page=0; $('ga-page').dataset.n=-1; gaDraw(); });
$('ga-page').addEventListener('change', gaDraw);
$('ga-out').addEventListener('click', e=>{
  const c=e.target.closest('.gcell'); if(!c) return;
  const slice=JSON.parse($('ga-out').dataset.trees);
  const idx=+c.dataset.i - S.ga.page*PAGE;
  exSet(S.ga.n, slice[idx]);
  document.querySelector('#cayley-app .tab-btn[data-t="explore"]').click();
  const host=document.getElementById('cayley-app');
  if(host.scrollIntoView) host.scrollIntoView({behavior:'smooth', block:'start'});
});

/* ============================== rotation =============================== */

function swRotate(dir){
  const n=S.ex.n;
  const out = rotSubword(S.ex.u, dir);
  const A = analyse(n, subwordToFact(n, lamWord(n), out));
  if(A.cyclic){                       // Cor. 5.7 says this is the only branch taken
    const keep = S.ex.rot + dir;
    exSet(n, A.edges);
    S.ex.rot = mod(keep, orbitLength(out));
    swDraw();
  } else {                            // only reachable from a hand-edited invalid grid
    S.ex.u = out; S.ex.dirty = true; S.ex.rot += dir; exDraw();
  }
}
$('sw-rot').addEventListener('click', ()=> swRotate(1));
$('sw-rotb').addEventListener('click', ()=> swRotate(-1));

/* ============================== permalink ============================== */

function stateHash(){
  const n=S.ex.n, pr=treeToPrufer(n, S.ex.edges);
  return '#n='+n + (pr.length ? '&p='+pr.join(',') : '');
}
function syncHash(){
  try{ history.replaceState(null, '', location.pathname+location.search+stateHash()); }
  catch(e){ /* file:// and sandboxed frames disallow replaceState; harmless */ }
}
function applyHash(){
  const h=(location.hash||'').replace(/^#/,'');
  if(!h) return false;
  const q={};
  h.split('&').forEach(kv=>{ const i=kv.indexOf('='); if(i>0) q[kv.slice(0,i)]=decodeURIComponent(kv.slice(i+1)); });
  const n=Math.round(+q.n);
  if(!Number.isFinite(n) || n<2 || n>30) return false;
  const seq = (q.p||'').split(',').filter(x=>x!=='').map(Number);
  if(seq.length !== n-2 || seq.some(v=>!Number.isInteger(v) || v<1 || v>n)) return false;
  exSet(n, pruferToTree(n, seq));
  return true;
}
$('ex-link').addEventListener('click', ()=>{
  const url = location.origin + location.pathname + location.search + stateHash();
  const say = t => { $('ex-linkmsg').innerHTML = t; setTimeout(()=>{ $('ex-linkmsg').textContent=''; }, 2600); };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(()=> say('<span class="ok">link copied</span>'),
                                            ()=> say('<span class="mono">'+esc(url)+'</span>'));
  } else say('<span class="mono">'+esc(url)+'</span>');
});
window.addEventListener('hashchange', ()=>{ applyHash(); });

/* ================================= boot ================================= */
if(!applyHash()) exRandom();
gaDraw();
})();
</script>
</div>

{% endraw %}
