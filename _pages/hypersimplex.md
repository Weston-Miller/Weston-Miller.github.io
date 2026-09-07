---
layout: default
title: Hypersimplices and lattice polygons — interactive companion
permalink: /hypersimplex/
nav: false
---

{% raw %}
<div id="hs-app">
<style>
/* Variable scheme, font stack and panel chrome mirror /cayley/ and /graph-demos/:
   every accent derives from --global-theme-color so light/dark follow the site
   with no theme-specific block. */
#hs-app{
  --ink:var(--global-text-color,#000); --muted:var(--global-text-color-light,#828282);
  --line:var(--global-divider-color,rgba(0,0,0,0.1)); --bg:var(--global-bg-color,#fff);
  --panel:rgba(127,127,127,0.11); --surface:var(--global-card-bg-color,#fff);
  --accent:var(--global-theme-color,#009f06); --accentbg:color-mix(in srgb, var(--accent) 9%, var(--bg));
  --radius:6px;
  /* Interior points carry the reciprocity story, so they get their own colour
     rather than the site accent; boundary points stay accent-coloured. */
  --int:color-mix(in srgb, #9400d3 70%, var(--ink));
  --intbg:color-mix(in srgb, #9400d3 20%, var(--bg));
  --edge:color-mix(in srgb, var(--ink) 55%, var(--bg));
  --facefill:color-mix(in srgb, var(--ink) 7%, var(--bg));
  --ghost:color-mix(in srgb, var(--ink) 22%, var(--bg));
}
#hs-app *{box-sizing:border-box;}
#hs-app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  color:var(--ink); background:transparent; line-height:1.55; margin:0;}
#hs-app .wrap{max-width:100%; margin:0 auto; padding:0.4rem 0 2.5rem;}
#hs-app h1{font-size:2rem; font-weight:700; margin:.2rem 0 .5rem; line-height:1.2;}
#hs-app p.lede{color:var(--muted); margin:.2rem 0 1.2rem; font-size:.95rem;}
#hs-app a{text-decoration:none; color:var(--accent);}
#hs-app a:hover{text-decoration:underline;}
#hs-app button{font:inherit; font-size:.9rem; padding:6px 12px; border:1px solid var(--line);
  background:var(--bg); border-radius:var(--radius); cursor:pointer; color:var(--ink);}
#hs-app button:hover{color:var(--accent); border-color:var(--accent);}
#hs-app button:active{transform:scale(.98);}
#hs-app button.on{border-color:var(--accent); color:var(--accent); background:var(--accentbg);}
#hs-app button.small{font-size:.82rem; padding:4px 9px;}
#hs-app label{font-size:.85rem; color:var(--muted);}
#hs-app select{font:inherit; font-size:.85rem; padding:4px 6px; border:1px solid var(--line);
  border-radius:var(--radius); background:var(--bg); color:var(--ink);}
#hs-app input[type=range]{vertical-align:middle;}
#hs-app .toolbar{display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px;}
/* A flex item defaults to min-width:auto, which is what pushed /cayley/ past a
   375px viewport; the same guard here. */
#hs-app .toolbar > *{min-width:0;}
#hs-app .toolbar.hidden{display:none;}
#hs-app .panel{border:1px solid var(--line); border-radius:var(--radius); padding:.9rem 1rem;
  background:var(--surface);}
#hs-app .row{display:flex; gap:1rem; align-items:flex-start; flex-wrap:wrap;}
#hs-app .col{flex:1 1 320px; min-width:0;}
#hs-app .col.side{flex:0 1 330px;}
#hs-app .stage{touch-action:none; user-select:none; padding:.4rem;}
#hs-app .stage.turn{cursor:grab;}
#hs-app .stage.turn:active{cursor:grabbing;}
#hs-app .stage.draw{cursor:crosshair;}
#hs-app .stage svg{display:block; margin:0 auto; width:100%; height:auto;}
#hs-app .stage:focus-visible{outline:2px solid var(--accent); outline-offset:3px; border-radius:var(--radius);}
#hs-app .caption{font-size:.82rem; color:var(--muted); margin:.4rem 0;}
#hs-app .head{font-size:.78rem; letter-spacing:.05em; font-weight:600; color:var(--muted);
  margin:0 0 .45rem;}
#hs-app .mono{font-family:ui-monospace,Menlo,Consolas,monospace; font-size:.85rem;}
#hs-app .big{font-family:ui-monospace,Menlo,Consolas,monospace; font-size:1.35rem; font-weight:700;
  color:var(--accent); line-height:1.2;}
#hs-app .swatch{display:inline-block; width:.7em; height:.7em; border-radius:50%; vertical-align:-1px;
  margin-right:.25em;}
#hs-app table.tab{border-collapse:collapse; font-family:ui-monospace,Menlo,Consolas,monospace;
  font-size:.8rem; width:100%;}
#hs-app table.tab th{font-weight:600; color:var(--muted); text-align:right; padding:2px 6px;
  border-bottom:1px solid var(--line); font-family:inherit;}
#hs-app table.tab td{text-align:right; padding:2px 6px; font-variant-numeric:tabular-nums;}
#hs-app table.tab tr.pick{cursor:pointer;}
#hs-app table.tab tr.pick:hover:not(.cur) td{background:var(--panel);}
#hs-app table.tab tr.cur td{background:var(--accentbg); font-weight:700;}
#hs-app .note{font-size:.83rem; border-left:3px solid var(--accent); background:var(--accentbg);
  padding:.5rem .7rem; margin:.6rem 0; border-radius:0 var(--radius) var(--radius) 0;}
#hs-app .note.quiet{border-left-color:var(--int); background:var(--intbg);}
#hs-app .note.warn{border-left-color:var(--muted); background:var(--panel);}
#hs-app hr.sep{border:0; border-top:1px solid var(--line); margin:.85rem 0;}
#hs-app sub, #hs-app sup{font-size:.72em;}
/* two fraction sizes: .frac sits inside a line of prose, .rfrac is the Ehrhart
   series, which wants a real bar between two full-size polynomials */
#hs-app .frac{display:inline-block; vertical-align:-.55em; text-align:center; font-size:.85em;}
#hs-app .frac .num{display:block; border-bottom:1px solid currentColor; padding:0 .18em;}
#hs-app .rfrac{display:inline-block; vertical-align:middle; text-align:center; margin:0 .15em;}
#hs-app .rfrac .num{display:block; border-bottom:1px solid currentColor; padding:0 .35em .1em;}
#hs-app .rfrac .den{display:block; padding:.1em .35em 0;}
@media print{ #hs-app .toolbar{display:none !important;} #hs-app .panel{border:none; padding:0;} }
</style>

<div class="wrap">
  <h1>Hypersimplices, dilated</h1>
  <p class="lede">
    The hypersimplex &Delta;<sub>n,k</sub> = {x &isin; [0,1]<sup>n</sup> : x<sub>1</sub>+&hellip;+x<sub>n</sub> = k}
    has dimension n&minus;1, and &Delta;<sub>n,k</sub> &cong; &Delta;<sub>n,n&minus;k</sub>, so up to
    isomorphism there are exactly three you can draw: a triangle, a tetrahedron and an octahedron.
    Here they are. Dilate any of them and count the lattice points &mdash; or draw a lattice polygon
    of your own and do the same to that.
  </p>

<div class="toolbar">
  <label>shape
    <select id="hs-shape">
      <optgroup label="hypersimplices">
        <option value="h31">&#916;(3,1) &mdash; triangle</option>
        <option value="h41">&#916;(4,1) &mdash; tetrahedron</option>
        <option value="h42" selected>&#916;(4,2) &mdash; octahedron</option>
      </optgroup>
      <optgroup label="draw your own">
        <option value="poly">lattice polygon</option>
      </optgroup>
    </select></label>
  <label>dilation t = <input type="range" id="hs-t" min="1" max="8" value="3" style="width:130px"><b id="hs-tv" class="mono">3</b></label>
  <span style="flex:1"></span>
  <button id="hs-spin" aria-pressed="false">spin</button>
  <button id="hs-reset">reset view</button>
</div>

<div class="toolbar hidden" id="hs-drawbar">
  <span class="caption" style="margin:0">click the grid to add or remove a vertex &mdash; the polygon
    is the convex hull of what you pick</span>
  <span style="flex:1"></span>
  <button class="small" data-preset="triangle">triangle</button>
  <button class="small" data-preset="square">square</button>
  <button class="small" data-preset="hex">hexagon</button>
  <button class="small" data-preset="reeve">a thin one</button>
  <button class="small" id="hs-clear">clear</button>
</div>

<div class="row">
  <div class="col">
    <div class="stage panel" id="hs-stage" tabindex="0" role="img"
         aria-label="A lattice polytope with the lattice points of its dilation."></div>
    <p class="caption" id="hs-legend"></p>
  </div>

  <div class="col side">
    <div class="panel">
      <div class="head" id="hs-counthead">Lattice points</div>
      <div class="big" id="hs-count">&mdash;</div>
      <div class="caption" id="hs-split" style="margin-top:.15rem"></div>
      <div id="hs-num">
        <hr class="sep">
        <div class="head">Counting function <span style="font-weight:400">&mdash; click a row</span></div>
        <table class="tab" id="hs-table"></table>
        <div class="mono" id="hs-ehr" style="margin-top:.6rem; line-height:1.9"></div>
        <hr class="sep">
        <div class="head">Ehrhart series</div>
        <div class="mono" id="hs-series" style="line-height:1.6"></div>
        <div class="caption" id="hs-vol" style="margin-top:.5rem"></div>
      </div>
      <div class="note quiet" id="hs-recip"></div>
    </div>
  </div>
</div>

<div class="note" id="hs-remark"></div>

<p class="caption" style="margin-top:1.2rem;border-top:1px solid var(--line);padding-top:.6rem">
  Companion to <i>Graded Ehrhart theory for hypersimplices</i>,
  <a href="https://arxiv.org/abs/2608.27438">arXiv:2608.27438</a>. The algebraic side of the same paper
  &mdash; matchings, the harmonic algebra, maximal tableaux &mdash; is at
  <a href="/graph-demos/">graph demos</a>.
</p>
</div><!-- /.wrap -->

<script>
(function(){
"use strict";
const $  = id => document.getElementById(id);
const NS = "http://www.w3.org/2000/svg";
const TMAX = 8;              /* rows in the table, and the top of the slider */
const GRID = 6;              /* the drawing board is the lattice points of [0,GRID]^2 */
/* Margin around a 2-D picture.  It has to clear the 30px prompt strip along the
   bottom of the unfinished-polygon state, or the y = 0 row of the grid ends up
   underneath it -- and it must be the same number in the renderer and in the
   click handler, or clicks land on the wrong lattice point. */
const PAD = 40;

/* ============================ exact small rationals ============================
   Ehrhart coefficients here have degree <= 3 and tiny denominators, so machine
   integers are plenty.                                                          */
function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ const r=a%b; a=b; b=r; } return a||1; }
function fr(n,d){ if(d<0){ n=-n; d=-d; } const g=gcd(n,d); return [n/g,d/g]; }
const frAdd = (a,b) => fr(a[0]*b[1]+b[0]*a[1], a[1]*b[1]);
const frMul = (a,b) => fr(a[0]*b[0], a[1]*b[1]);
function frHTML(f){
  if(f[1]===1) return String(f[0]);
  const s = f[0]<0 ? "&minus;" : "";
  return s+'<span class="frac"><span class="num">'+Math.abs(f[0])+'</span>'+f[1]+'</span>';
}
/* c = rational coefficients indexed by power; up=true prints ascending */
function polyHTML(c, v, up){
  const parts=[], idx=[];
  for(let j=0;j<c.length;j++) idx.push(up ? j : c.length-1-j);
  for(const j of idx){
    const f=c[j]; if(f[0]===0) continue;
    const neg=f[0]<0, mag=[Math.abs(f[0]),f[1]];
    let body = (mag[0]===1 && mag[1]===1 && j>0) ? "" : frHTML(mag);
    if(j===1) body += v; else if(j>1) body += v+"<sup>"+j+"</sup>";
    parts.push([neg,body]);
  }
  if(!parts.length) return "0";
  return parts.map((p,i)=> (i===0 ? (p[0]?"&minus;":"") : (p[0]?" &minus; ":" + ")) + p[1]).join("");
}
function factorial(n){ let f=1; for(let i=2;i<=n;i++) f*=i; return f; }
function binom(n,j){ let r=1; for(let i=0;i<j;i++) r = r*(n-i)/(i+1); return Math.round(r); }
/* C(t,j) in the power basis, exactly */
function binomPoly(j){
  let p=[fr(1,1)];
  for(let i=0;i<j;i++){
    const q=new Array(p.length+1).fill(0).map(()=>fr(0,1));
    for(let a=0;a<p.length;a++){
      q[a+1]=frAdd(q[a+1], p[a]);
      q[a]  =frAdd(q[a],   frMul(p[a], fr(-i,1)));
    }
    p=q;
  }
  const f=factorial(j);
  return p.map(c=>frMul(c, fr(1,f)));
}

/* ============================== the shapes ==============================
   Each one answers the same three questions -- what are its lattice points at
   dilation t, what dimension is it, and where does a point sit on screen -- so
   everything downstream (Ehrhart, the panel, the table) is written once.     */

/* --- hypersimplices --- */
function hyperPoints(n,k,t){
  const out=[], x=new Array(n).fill(0), S=k*t;
  (function rec(i, rem){
    if(i===n-1){ if(rem>=0 && rem<=t){ x[i]=rem; out.push(x.slice()); } return; }
    const hi=Math.min(t, rem);
    for(let v=0; v<=hi; v++){ x[i]=v; rec(i+1, rem-v); }
  })(0, S);
  return out;
}
const hyperVerts = (n,k) => {
  const out=[];
  for(let m=0;m<(1<<n);m++){
    const x=[]; let s=0;
    for(let i=0;i<n;i++){ const b=(m>>i)&1; x.push(b); s+=b; }
    if(s===k) out.push(x);
  }
  return out;
};
/* An orthonormal basis of {sum = 0} in R^n: v_j = (1,...,1,-j,0,...,0) with j
   ones.  The picture is therefore an isometry, not a shadow -- Delta(4,2) comes
   out a genuinely regular octahedron rather than a lumpy one. */
function basisFor(n){
  const B=[];
  for(let j=1;j<n;j++){
    const v=new Array(n).fill(0);
    for(let i=0;i<j;i++) v[i]=1;
    v[j]=-j;
    const nn=Math.hypot.apply(null,v);
    B.push(v.map(c=>c/nn));
  }
  return B;
}
const embed = (B,y) => B.map(b => b.reduce((s,c,i)=>s+c*y[i], 0));
/* dividing by t is what keeps every dilation the same size on screen */
const hyperPlace = (B,n,k,x,t) => embed(B, x.map(v => v/t - k/n));

/* --- lattice polygons --- */
function hull(pts){                       /* monotone chain; integer input */
  const P = pts.slice().sort((a,b)=> a[0]-b[0] || a[1]-b[1]);
  if(P.length<3) return P;
  const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
  const lo=[], up=[];
  for(const p of P){ while(lo.length>=2 && cr(lo[lo.length-2],lo[lo.length-1],p)<=0) lo.pop(); lo.push(p); }
  for(let i=P.length-1;i>=0;i--){ const p=P[i];
    while(up.length>=2 && cr(up[up.length-2],up[up.length-1],p)<=0) up.pop(); up.push(p); }
  lo.pop(); up.pop();
  return lo.concat(up);                   /* counter-clockwise */
}
/* q relative to the polygon with integer vertices V scaled by t: 1 inside, 0 on
   the boundary, -1 outside.  All integer arithmetic, so no epsilon anywhere. */
function locate(V,t,q){
  let onEdge=false;
  for(let i=0;i<V.length;i++){
    const a=V[i], b=V[(i+1)%V.length];
    const c=(b[0]-a[0])*(q[1]-t*a[1]) - (b[1]-a[1])*(q[0]-t*a[0]);
    if(c<0) return -1;
    if(c===0) onEdge=true;
  }
  return onEdge ? 0 : 1;
}
function polyPoints(V,t){
  if(V.length<3) return [];
  if(t===0) return [[0,0]];
  let x0=Infinity,x1=-Infinity,y0=Infinity,y1=-Infinity;
  for(const v of V){ x0=Math.min(x0,v[0]); x1=Math.max(x1,v[0]); y0=Math.min(y0,v[1]); y1=Math.max(y1,v[1]); }
  const out=[];
  for(let x=t*x0;x<=t*x1;x++) for(let y=t*y0;y<=t*y1;y++){
    const s=locate(V,t,[x,y]); if(s>=0) out.push([x,y,s]);
  }
  return out;
}
const shoelace2 = V => {                  /* twice the area, an integer */
  let s=0; for(let i=0;i<V.length;i++){ const a=V[i], b=V[(i+1)%V.length]; s += a[0]*b[1]-b[0]*a[1]; }
  return Math.abs(s);
};
const boundaryPts = V => {                /* lattice points on the boundary of P */
  let b=0; for(let i=0;i<V.length;i++){ const a=V[i], c=V[(i+1)%V.length];
    b += gcd(Math.abs(c[0]-a[0]), Math.abs(c[1]-a[1])); }
  return b;
};

/* ================================== the model ==================================
   One object per shape, answering count / interior / dimension, so the Ehrhart
   code and the whole panel are written once for both dimensions.              */
const PRESETS = {
  triangle:[[0,0],[4,0],[1,4]],
  square:  [[1,1],[5,1],[5,5],[1,5]],
  hex:     [[2,0],[4,1],[5,3],[4,5],[2,6],[0,3]],
  reeve:   [[0,0],[6,1],[3,5]]
};
const state = { shape:"h42", T:3, yaw:1.18, pitch:0.56, gens:PRESETS.hex.slice() };

function model(){
  const id=state.shape;
  if(id==="poly"){
    const V=hull(state.gens);
    return { id, kind:"poly", dim:2, V, ok:V.length>=3, sym:"Z<sup>2</sup>",
      count:    t => polyPoints(V,t).length,
      interior: t => polyPoints(V,t).filter(p=>p[2]===1).length };
  }
  const n = (id==="h31") ? 3 : 4;
  const k = (id==="h42") ? 2 : 1;
  return { id, kind:"hyper", dim:n-1, n, k, B:basisFor(n), ok:true, sym:"Z<sup>"+n+"</sup>",
    count:    t => hyperPoints(n,k,t).length,
    interior: t => hyperPoints(n,k,t).filter(x=>x.every(v=>v>0 && v<t)).length };
}

/* i(t) is a polynomial of degree d, so d+1 values determine it; the finite
   differences of i at 0 are its coefficients in the binomial basis, and those
   are integers.  h* comes straight from sum i(t) z^t = h*(z)/(1-z)^(d+1).   */
function ehrhart(M){
  const d=M.dim, vals=[];
  for(let t=0;t<=d;t++) vals.push(M.count(t));
  const bin=[]; let row=vals.slice();
  for(let j=0;j<=d;j++){ bin.push(row[0]); row = row.slice(1).map((x,i)=>x-row[i]); }
  const pow=new Array(d+1).fill(0).map(()=>fr(0,1));
  bin.forEach((cj,j)=>{ const bp=binomPoly(j);
    for(let p=0;p<bp.length;p++) pow[p]=frAdd(pow[p], frMul(fr(cj,1), bp[p])); });
  const hs=[];
  for(let j=0;j<=d;j++){
    let s=0; for(let i=0;i<=j;i++) s += (i%2?-1:1)*binom(d+1,i)*M.count(j-i);
    hs.push(s);
  }
  while(hs.length>1 && hs[hs.length-1]===0) hs.pop();
  return { bin, pow, hs, d, vals, normVol: hs.reduce((a,b)=>a+b,0) };
}
function evalPow(pow, t){
  let acc=fr(0,1), p=1;
  for(let j=0;j<pow.length;j++){ acc=frAdd(acc, frMul(pow[j], fr(p,1))); p*=t; }
  return acc;
}

/* ================================== geometry ================================== */
const sub   = (p,q) => [p[0]-q[0],p[1]-q[1],p[2]-q[2]];
const cross = (u,v) => [u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]];
const dot   = (u,v) => u[0]*v[0]+u[1]*v[1]+u[2]*v[2];
function rotate(p, yaw, pitch){
  const cy=Math.cos(yaw), sy=Math.sin(yaw), cp=Math.cos(pitch), sp=Math.sin(pitch);
  const x1 =  p[0]*cy + p[2]*sy;
  const z1 = -p[0]*sy + p[2]*cy;
  return [x1, p[1]*cp - z1*sp, p[1]*sp + z1*cp];
}
function facetsOf(n,k,V4){
  /* the facets of Delta(n,k) are its slices x_i = 0 and x_i = 1; for n = 4 every
     one that is not a single vertex is a triangle */
  const out=[];
  for(let i=0;i<n;i++) for(let s=0;s<=1;s++){
    const f=[]; V4.forEach((v,idx)=>{ if(v[i]===s) f.push(idx); });
    if(f.length>=3) out.push(f);
  }
  return out;
}
function edgesOf(n,V4){
  /* two 0/1 vectors of the same weight span an edge iff they differ in exactly
     two coordinates */
  const out=[];
  for(let a=0;a<V4.length;a++) for(let b=a+1;b<V4.length;b++){
    let d=0; for(let i=0;i<n;i++) if(V4[a][i]!==V4[b][i]) d++;
    if(d===2) out.push([a,b]);
  }
  return out;
}
function fit(bbox, W, H, m){                 /* uniform scale, y up */
  const S = Math.min((W-2*m)/(bbox[1]-bbox[0]||1), (H-2*m)/(bbox[3]-bbox[2]||1));
  return { S, ox: W/2 - S*(bbox[0]+bbox[1])/2, oy: H/2 + S*(bbox[2]+bbox[3])/2 };
}

/* ================================== rendering ================================== */
const W=430, H=400;
let spinning=false, spinReq=0;
const circle = (x,y,r,fill,o) =>
  '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(2)+'" fill="'+fill+
  (o!==undefined ? '" opacity="'+o : '')+'"/>';

function render3d(M){
  const V4 = hyperVerts(M.n, M.k);
  const V  = V4.map(v => hyperPlace(M.B, M.n, M.k, v, 1));
  const R  = Math.max.apply(null, V.map(p => Math.hypot(p[0],p[1],p[2])));
  const S  = 178/R, cx=W/2, cy=H/2;
  const rv = V.map(p => rotate(p, state.yaw, state.pitch));
  const px = p => (cx + S*p[0]), py = p => (cy - S*p[1]);
  const pt = p => px(p).toFixed(1)+","+py(p).toFixed(1);

  const FS = facetsOf(M.n, M.k, V4), ES = edgesOf(M.n, V4);
  const nrm = f => {
    const a=rv[f[0]], b=rv[f[1]], c=rv[f[2]];
    let n = cross(sub(b,a), sub(c,a));
    const fc = [(a[0]+b[0]+c[0])/3,(a[1]+b[1]+c[1])/3,(a[2]+b[2]+c[2])/3];
    if(dot(n,fc) < 0) n = [-n[0],-n[1],-n[2]];   /* the polytope's centroid is the origin */
    return n;
  };
  const norms = FS.map(nrm), front = norms.map(n => n[2] > 0);

  const back=[], solid=[], dashed=[];
  FS.forEach((f,i)=>{
    if(front[i]) return;
    /* shade the far shell by how squarely each facet turns away, so the solid
       reads as a solid rather than as one flat silhouette */
    const n=norms[i], L=Math.hypot(n[0],n[1],n[2])||1;
    back.push('<polygon points="'+f.map(j=>pt(rv[j])).join(" ")+'" opacity="'+
      (0.45+0.55*Math.abs(n[2])/L).toFixed(2)+'"/>');
  });
  ES.forEach(e=>{
    /* hidden-line removal is exact rather than painterly: an edge is hidden iff
       both incident facets face away, which is valid because P is convex */
    const vis = FS.some((f,i)=> front[i] && f.indexOf(e[0])>=0 && f.indexOf(e[1])>=0);
    (vis?solid:dashed).push('<line x1="'+px(rv[e[0]]).toFixed(1)+'" y1="'+py(rv[e[0]]).toFixed(1)+
      '" x2="'+px(rv[e[1]]).toFixed(1)+'" y2="'+py(rv[e[1]]).toFixed(1)+'"/>');
  });

  const T=state.T;
  let nB=0, nI=0;
  const drawn = hyperPoints(M.n, M.k, T).map(x => {
    const inte = x.every(v=>v>0 && v<T);
    if(inte) nI++; else nB++;
    return { p: rotate(hyperPlace(M.B, M.n, M.k, x, T), state.yaw, state.pitch), inte };
  }).sort((a,b)=> a.p[2]-b.p[2]);
  const base = Math.max(1.4, 3.8 - 0.34*T);
  const dots = drawn.map(d => {
    const z=d.p[2]/R;
    return circle(px(d.p), py(d.p), base*(1+0.16*z), d.inte?"var(--int)":"var(--accent)",
                  (0.3+0.7*(z+1)/2).toFixed(2));
  }).join("");

  return { svg:
    '<g fill="var(--facefill)" stroke="none">'+back.join("")+'</g>'+
    '<g fill="none" stroke="var(--edge)" stroke-width="1.1" opacity=".3" stroke-dasharray="4 4">'+dashed.join("")+'</g>'+
    dots+
    '<g fill="none" stroke="var(--edge)" stroke-width="1.7" stroke-linecap="round">'+solid.join("")+'</g>',
    nB, nI, total:nB+nI };
}

function render2d(M){
  const T=state.T, draw = (M.kind==="poly");
  let world, step, outline=[], ghosts="", picks="";
  if(draw){
    if(!M.ok){
      /* An unfinished polygon still has to show the picks -- otherwise the first
         two clicks look like they did nothing at all.  The prompt sits along the
         bottom on its own strip, clear of the grid: a grid dot landing in a word
         gap reads as a stray comma, and a centred message covers the picks. */
      const F0 = fit([0,GRID,0,GRID], W, H, PAD);
      const seg = (M.V.length === 2)
        ? '<line x1="'+(F0.ox+F0.S*M.V[0][0]).toFixed(1)+'" y1="'+(F0.oy-F0.S*M.V[0][1]).toFixed(1)+
          '" x2="'+(F0.ox+F0.S*M.V[1][0]).toFixed(1)+'" y2="'+(F0.oy-F0.S*M.V[1][1]).toFixed(1)+
          '" stroke="var(--edge)" stroke-width="1.4" stroke-dasharray="5 4" opacity=".6"/>'
        : "";
      const n = state.gens.length;
      const msg = n===0 ? "click three grid points to start a polygon"
                : n===1 ? "one vertex so far \u2014 two more to go"
                : n===2 ? "two vertices so far \u2014 one more, off this line"
                :         "all of these are in a line \u2014 add one off it";
      return { svg: gridGhosts(F0) + seg + rings(state.gens, F0) +
        '<rect x="0" y="'+(H-30)+'" width="'+W+'" height="30" fill="var(--surface)"/>'+
        '<text x="'+(W/2)+'" y="'+(H-11)+'" text-anchor="middle" fill="var(--muted)" '+
        'font-size="13">'+msg+'</text>',
        nB:0, nI:0, total:n, invalid:true };
    }
    world=[0,GRID,0,GRID];
  } else {
    const V=hyperVerts(M.n,M.k).map(v=>hyperPlace(M.B,M.n,M.k,v,1));
    let x0=Infinity,x1=-Infinity,y0=Infinity,y1=-Infinity;
    V.forEach(p=>{ x0=Math.min(x0,p[0]); x1=Math.max(x1,p[0]); y0=Math.min(y0,p[1]); y1=Math.max(y1,p[1]); });
    world=[x0,x1,y0,y1];
  }
  const F = fit(world, W, H, PAD);
  const sx = x => F.ox + F.S*x, sy = y => F.oy - F.S*y;

  if(draw){
    ghosts = gridGhosts(F);
    picks = rings(state.gens, F);
    outline = M.V.map(v => sx(v[0]).toFixed(1)+","+sy(v[1]).toFixed(1));
    step = F.S/T;
  } else {
    outline = hyperVerts(M.n,M.k)
      .map(v=>hyperPlace(M.B,M.n,M.k,v,1))
      .sort((a,b)=>Math.atan2(a[1],a[0])-Math.atan2(b[1],b[0]))
      .map(p => sx(p[0]).toFixed(1)+","+sy(p[1]).toFixed(1));
    step = F.S*Math.SQRT2/T;                 /* nearest lattice step is e_i - e_j */
  }

  let nB=0, nI=0, dots="";
  const r = Math.max(1.0, Math.min(5, 0.14*step));
  const put = (x,y,inte) => {
    if(inte) nI++; else nB++;
    dots += circle(sx(x), sy(y), r, inte?"var(--int)":"var(--accent)");
  };
  if(draw) polyPoints(M.V,T).forEach(q => put(q[0]/T, q[1]/T, q[2]===1));
  else hyperPoints(M.n,M.k,T).forEach(x => {
    const p=hyperPlace(M.B,M.n,M.k,x,T); put(p[0], p[1], x.every(v=>v>0 && v<T));
  });

  return { svg:
    '<polygon points="'+outline.join(" ")+'" fill="var(--facefill)" stroke="var(--edge)" '+
      'stroke-width="1.7" stroke-linejoin="round"/>'+
    ghosts + dots + picks,
    nB, nI, total:nB+nI };
}
function rings(gens, F){
  return gens.map(g => '<circle cx="'+(F.ox+F.S*g[0]).toFixed(1)+'" cy="'+(F.oy-F.S*g[1]).toFixed(1)+
    '" r="6" fill="var(--surface)" fill-opacity=".65" stroke="var(--accent)" stroke-width="1.6"/>').join("");
}
function gridGhosts(F){
  let g="";
  for(let x=0;x<=GRID;x++) for(let y=0;y<=GRID;y++)
    g += circle(F.ox+F.S*x, F.oy-F.S*y, 1.5, "var(--ghost)");
  return '<g>'+g+'</g>';
}

/* =================================== readouts =================================== */
const rfrac = (a,b) => '<span class="rfrac"><span class="num">'+a+'</span><span class="den">'+b+'</span></span>';
const EULERIAN_NOTE = { h31:"A(2,0)", h41:"A(3,0)", h42:"A(3,1)" };
const NAMES = {
  h31:"&Delta;(3,1), the triangle",
  h41:"&Delta;(4,1), the tetrahedron",
  h42:"&Delta;(4,2), the octahedron",
  poly:"your polygon"
};

function readouts(M, counts){
  const T=state.T, poly=(M.kind==="poly");
  const label = poly ? "t&thinsp;P" : "t&thinsp;&Delta;("+M.n+","+M.k+")";
  $("hs-counthead").innerHTML = "Lattice points of " + label;

  $("hs-num").hidden = poly && !M.ok;
  if(poly && !M.ok){
    const n = state.gens.length;
    $("hs-count").innerHTML = "&mdash;";
    $("hs-split").innerHTML = n===0 ? "no vertices picked yet"
      : n + " vertex" + (n===1?"":"es") + " picked, no polygon yet";
    $("hs-recip").innerHTML = "Pick three points that are not collinear and everything here fills in.";
    $("hs-remark").innerHTML = "A lattice polygon is the convex hull of finitely many points of " +
      "Z<sup>2</sup>. Click the grid to build one.";
    $("hs-legend").innerHTML = "Click a grey grid point to place a vertex.";
    return;
  }

  const E = ehrhart(M), d = E.d;
  $("hs-count").innerHTML = counts.total.toLocaleString();
  $("hs-split").innerHTML =
    '<span class="swatch" style="background:var(--accent)"></span>'+counts.nB.toLocaleString()+' on the boundary &middot; '+
    '<span class="swatch" style="background:var(--int)"></span>'+counts.nI.toLocaleString()+' interior';

  let rows='<tr><th>t</th><th>points</th><th>interior</th></tr>';
  for(let t=0;t<=TMAX;t++){
    rows += '<tr data-t="'+t+'" class="'+(t>=1?"pick":"")+(t===T?" cur":"")+'"'+
            (t>=1?' title="show this dilation"':'')+'><td>'+t+'</td><td>'+
            M.count(t).toLocaleString()+'</td><td>'+M.interior(t).toLocaleString()+'</td></tr>';
  }
  $("hs-table").innerHTML = rows;

  const binTerms = E.bin.map((c,j)=> c===0 ? null :
      (j===0 ? String(c) : (c===1?"":c)+'C(t,'+j+')')).filter(Boolean);
  $("hs-ehr").innerHTML =
    'i(t) = ' + polyHTML(E.pow, "t") + '<br>' +
    '<span style="color:var(--muted)">&nbsp;&nbsp;&nbsp;&nbsp;= ' + binTerms.join(" + ") + '</span>';

  const series = E.vals.concat([M.count(d+1)]).map((v,t)=>
      (t===0 ? String(v) : (v===1?"":v.toLocaleString()) + (t===1?"z":"z<sup>"+t+"</sup>"))
    ).join(" + ") + " + &ctdot;";
  $("hs-series").innerHTML =
    '&sum;<sub>t&ge;0</sub> |t&thinsp;'+(poly?"P":"&Delta;")+' &cap; '+M.sym+'| z<sup>t</sup> = ' +
    rfrac(polyHTML(E.hs.map(h=>fr(h,1)), "z", true), '(1 &minus; z)<sup>'+(d+1)+'</sup>') +
    '<br><span style="color:var(--muted)">= ' + series + '</span>';

  const I1 = M.interior(1), b1 = M.count(1) - I1;
  const volTail = poly
    ? 'so P has area ' + frHTML(fr(E.normVol,2)) + '. That is Pick’s theorem: with ' + I1 +
      ' interior point' + (I1===1?"":"s") + ' and ' + b1 + ' on the boundary, area = ' + I1 +
      ' + ' + b1 + '/2 &minus; 1 = ' + frHTML(fr(E.normVol,2)) + '.'
    : 'so vol&thinsp;&Delta;('+M.n+','+M.k+') = ' + frHTML(fr(E.normVol, factorial(d))) +
      ', and ' + E.normVol + ' = ' + EULERIAN_NOTE[M.id] + ', an Eulerian number.';
  $("hs-vol").innerHTML = 'h*(1) = ' + E.normVol + ' is the normalized volume, ' + volTail;

  const rec = evalPow(E.pow, -T), recVal = Math.round(((d%2)?-1:1)*rec[0]/rec[1]);
  $("hs-recip").innerHTML =
    '<b>Reciprocity.</b> (&minus;1)<sup>'+d+'</sup>&thinsp;i(&minus;'+T+') = ' + recVal +
    ', which is exactly the ' + counts.nI.toLocaleString() + ' interior point' +
    (counts.nI===1?"":"s") + ' drawn in purple' + (recVal===counts.nI ? '' : ' &mdash; mismatch!') + '.';

  const remarks = {
    h42: 'The octahedron is the only hypersimplex that is neither a simplex nor too big to draw. ' +
         'The normalized volumes of &Delta;(4,1), &Delta;(4,2), &Delta;(4,3) are 1, 4, 1 &mdash; the ' +
         'Eulerian numbers for S<sub>3</sub> &mdash; and in general vol&thinsp;&Delta;(n,k) = ' +
         'A(n&minus;1,&thinsp;k&minus;1)/(n&minus;1)!. Grading the middle column is what the paper is about.',
    h41: '&Delta;(4,1) is the standard simplex, so it is unimodular: h*(z) = 1 and every dilation just ' +
         'counts monomials. &Delta;(4,3) is the same tetrahedron reflected, which is why it is not in the ' +
         'menu &mdash; &Delta;(n,k) &cong; &Delta;(n,n&minus;k) by x &#8614; 1 &minus; x.',
    h31: 'Up to isomorphism this is the only two-dimensional hypersimplex, and it is the unimodular ' +
         'triangle: h*(z) = 1, i(t) = C(t+2,2). Draw the triangle with vertices (0,0), (1,0), (0,1) in ' +
         'the polygon mode and you get the same numbers.',
    poly:'Every lattice polygon has i(t) = At<sup>2</sup> + (b/2)t + 1 with A its area and b its ' +
         'boundary points, so h* = (1, A + b/2 &minus; 2, A &minus; b/2 + 1) and the last entry is the ' +
         'interior count &mdash; reciprocity and Pick’s theorem are the same statement. Try the thin ' +
         'triangle: area grows but the boundary barely does.'
  };
  $("hs-remark").innerHTML = remarks[M.id];

  const sw = '<span class="swatch" style="background:var(--accent)"></span>boundary points &middot; ' +
             '<span class="swatch" style="background:var(--int)"></span>interior points &middot; ';
  $("hs-legend").innerHTML = sw + (poly
    ? 'click a grey grid point to add or drop a vertex. The polygon keeps its size and the lattice gets ' +
      'finer as t grows, which is the same picture as dilating it.'
    : (M.dim===3
      ? 'the solid is drawn at a fixed size, so dilating shows up as a finer lattice rather than a bigger ' +
        'polytope. Drag to rotate, or focus it and use the arrow keys.'
      : 'the triangle is drawn at a fixed size, so dilating shows up as a finer lattice rather than a ' +
        'bigger polytope.'));
}

function draw(){
  const M = model();
  const out = (M.dim===3) ? render3d(M) : render2d(M);
  $("hs-stage").innerHTML =
    '<svg viewBox="0 0 '+W+' '+H+'" xmlns="'+NS+'" aria-hidden="true">'+out.svg+'</svg>';
  $("hs-stage").className = "stage panel " + (M.dim===3 ? "turn" : (M.kind==="poly" ? "draw" : ""));
  readouts(M, out);
}

/* ===================================== UI ===================================== */
const stage = $("hs-stage");

function syncChrome(){
  const three = (model().dim===3), poly = (state.shape==="poly");
  $("hs-spin").hidden  = !three;
  $("hs-reset").hidden = !three;
  $("hs-drawbar").classList.toggle("hidden", !poly);
  if(!three && spinning) $("hs-spin").click();
}
$("hs-shape").addEventListener("change", e => { state.shape=e.target.value; syncChrome(); draw(); });
$("hs-t").addEventListener("input", e => { setT(+e.target.value); });
function setT(t){
  state.T = Math.max(1, Math.min(TMAX, t));
  $("hs-t").value = state.T;
  $("hs-tv").textContent = state.T;
  draw();
}
/* click a row of the counting function to jump the picture to that dilation */
$("hs-table").addEventListener("click", e => {
  const tr = e.target.closest ? e.target.closest("tr") : null;
  if(!tr || !tr.classList.contains("pick")) return;
  setT(+tr.getAttribute("data-t"));
});

$("hs-reset").addEventListener("click", ()=>{ state.yaw=1.18; state.pitch=0.56; draw(); });
$("hs-clear").addEventListener("click", ()=>{ state.gens=[]; draw(); });
Array.prototype.forEach.call(document.querySelectorAll("#hs-drawbar button[data-preset]"), b => {
  b.addEventListener("click", ()=>{ state.gens = PRESETS[b.getAttribute("data-preset")].slice(); draw(); });
});

/* Spin is opt-in and never starts on its own; under prefers-reduced-motion the
   button says so rather than quietly doing nothing. */
if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  $("hs-spin").title = "you have asked for reduced motion; this will still spin if you want it";
let last=0;
function tick(ts){
  if(!spinning) return;
  if(last) state.yaw += (ts-last)*0.00045;
  last = ts;
  draw();
  spinReq = requestAnimationFrame(tick);
}
$("hs-spin").addEventListener("click", function(){
  spinning = !spinning;
  this.classList.toggle("on", spinning);
  this.setAttribute("aria-pressed", spinning ? "true" : "false");
  this.textContent = spinning ? "stop" : "spin";
  last = 0;
  if(spinning) spinReq = requestAnimationFrame(tick); else cancelAnimationFrame(spinReq);
});

/* drag to turn in 3D; click to edit in polygon mode */
let dragging=false, moved=false, px=0, py=0;
stage.addEventListener("pointerdown", e => {
  moved=false;
  if(model().dim!==3) return;
  dragging=true; px=e.clientX; py=e.clientY;
  stage.setPointerCapture(e.pointerId);
});
stage.addEventListener("pointermove", e => {
  if(!dragging) return;
  moved=true;
  state.yaw   += (e.clientX-px)*0.008;
  state.pitch  = Math.max(-1.45, Math.min(1.45, state.pitch + (e.clientY-py)*0.008));
  px=e.clientX; py=e.clientY;
  draw();
});
["pointerup","pointercancel"].forEach(t => stage.addEventListener(t, e => {
  dragging=false;
  if(stage.hasPointerCapture && stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
}));
stage.addEventListener("click", e => {
  if(state.shape!=="poly" || moved) return;
  const svg = stage.querySelector("svg"); if(!svg) return;
  const box = svg.getBoundingClientRect();
  /* the viewBox is uniformly scaled to the element, so one ratio converts both axes */
  const u = W/box.width;
  const F = fit([0,GRID,0,GRID], W, H, PAD);
  const gx = Math.round(((e.clientX-box.left)*u - F.ox)/F.S);
  const gy = Math.round((F.oy - (e.clientY-box.top)*u)/F.S);
  if(gx<0 || gy<0 || gx>GRID || gy>GRID) return;
  const i = state.gens.findIndex(g => g[0]===gx && g[1]===gy);
  if(i>=0) state.gens.splice(i,1); else state.gens.push([gx,gy]);
  draw();
});
stage.addEventListener("keydown", e => {
  if(model().dim!==3) return;
  const step=0.12, m={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]}[e.key];
  if(!m) return;
  e.preventDefault();
  state.yaw += m[0];
  state.pitch = Math.max(-1.45, Math.min(1.45, state.pitch+m[1]));
  draw();
});

syncChrome();
draw();
})();
</script>
</div>

{% endraw %}
