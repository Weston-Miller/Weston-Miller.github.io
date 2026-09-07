---
layout: default
title: Ehrhart theory — interactive companion
permalink: /ehrhart/
nav: false
---

{% raw %}
<div id="eh-app">
<style>
/* Variable scheme, font stack and panel chrome mirror /cayley/ and /graph-demos/:
   every accent derives from --global-theme-color so light/dark follow the site
   with no theme-specific block. */
#eh-app{
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
#eh-app *{box-sizing:border-box;}
#eh-app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  color:var(--ink); background:transparent; line-height:1.55; margin:0;}
#eh-app .wrap{max-width:100%; margin:0 auto; padding:0.4rem 0 2.5rem;}
#eh-app h1{font-size:2rem; font-weight:700; margin:.2rem 0 .5rem; line-height:1.2;}
#eh-app p.lede{color:var(--muted); margin:.2rem 0 1.2rem; font-size:.95rem;}
#eh-app a{text-decoration:none; color:var(--accent);}
#eh-app a:hover{text-decoration:underline;}
#eh-app button{font:inherit; font-size:.9rem; padding:6px 12px; border:1px solid var(--line);
  background:var(--bg); border-radius:var(--radius); cursor:pointer; color:var(--ink);}
#eh-app button:hover{color:var(--accent); border-color:var(--accent);}
#eh-app button:active{transform:scale(.98);}
#eh-app button:disabled{opacity:.45; cursor:default;}
#eh-app button:disabled:hover{color:var(--ink); border-color:var(--line);}
#eh-app button.on{border-color:var(--accent); color:var(--accent); background:var(--accentbg);}
#eh-app button.small{font-size:.82rem; padding:4px 9px;}
#eh-app label{font-size:.85rem; color:var(--muted);}
#eh-app select{font:inherit; font-size:.85rem; padding:4px 6px; border:1px solid var(--line);
  border-radius:var(--radius); background:var(--bg); color:var(--ink); max-width:100%;}
#eh-app input[type=range]{vertical-align:middle;}
#eh-app .toolbar{display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px;}
/* A flex item defaults to min-width:auto, which is what pushed /cayley/ past a
   375px viewport; the same guard here. */
#eh-app .toolbar > *{min-width:0;}
#eh-app .toolbar.hidden{display:none;}
#eh-app .panel{border:1px solid var(--line); border-radius:var(--radius); padding:.9rem 1rem;
  background:var(--surface);}
#eh-app .row{display:flex; gap:1rem; align-items:flex-start; flex-wrap:wrap;}
#eh-app .col{flex:1 1 320px; min-width:0;}
#eh-app .col.side{flex:0 1 330px;}
#eh-app .stage{touch-action:none; user-select:none; padding:.4rem;}
#eh-app .stage.turn{cursor:grab;}
#eh-app .stage.turn:active{cursor:grabbing;}
#eh-app .stage.draw{cursor:crosshair;}
#eh-app .stage svg{display:block; margin:0 auto; width:100%; height:auto;}
#eh-app .stage:focus-visible{outline:2px solid var(--accent); outline-offset:3px; border-radius:var(--radius);}
#eh-app .caption{font-size:.82rem; color:var(--muted); margin:.4rem 0;}
#eh-app .head{font-size:.78rem; letter-spacing:.05em; font-weight:600; color:var(--muted);
  margin:0 0 .45rem;}
#eh-app .mono{font-family:ui-monospace,Menlo,Consolas,monospace; font-size:.85rem;}
#eh-app .big{font-family:ui-monospace,Menlo,Consolas,monospace; font-size:1.35rem; font-weight:700;
  color:var(--accent); line-height:1.2;}
#eh-app .swatch{display:inline-block; width:.7em; height:.7em; border-radius:50%; vertical-align:-1px;
  margin-right:.25em;}
#eh-app table.tab{border-collapse:collapse; font-family:ui-monospace,Menlo,Consolas,monospace;
  font-size:.8rem; width:100%;}
#eh-app table.tab th{font-weight:600; color:var(--muted); text-align:right; padding:2px 6px;
  border-bottom:1px solid var(--line); font-family:inherit;}
#eh-app table.tab td{text-align:right; padding:2px 6px; font-variant-numeric:tabular-nums;}
#eh-app table.tab tr.pick{cursor:pointer;}
#eh-app table.tab tr.pick:hover:not(.cur) td{background:var(--panel);}
#eh-app table.tab tr.cur td{background:var(--accentbg); font-weight:700;}
#eh-app table.tab tr.zero td{color:var(--muted);}
#eh-app .note{font-size:.83rem; border-left:3px solid var(--accent); background:var(--accentbg);
  padding:.5rem .7rem; margin:.6rem 0; border-radius:0 var(--radius) var(--radius) 0;}
#eh-app .note.quiet{border-left-color:var(--int); background:var(--intbg);}
#eh-app .note.plain{border-left-color:var(--muted); background:var(--panel);}
#eh-app hr.sep{border:0; border-top:1px solid var(--line); margin:.85rem 0;}
#eh-app sub, #eh-app sup{font-size:.72em;}
/* two fraction sizes: .frac sits inside a line of prose, .rfrac is the Ehrhart
   series, which wants a real bar between two full-size polynomials */
#eh-app .frac{display:inline-block; vertical-align:-.55em; text-align:center; font-size:.85em;}
#eh-app .frac .num{display:block; border-bottom:1px solid currentColor; padding:0 .18em;}
#eh-app .rfrac{display:inline-block; vertical-align:middle; text-align:center; margin:0 .15em;}
#eh-app .rfrac .num{display:block; border-bottom:1px solid currentColor; padding:0 .35em .1em;}
#eh-app .rfrac .den{display:block; padding:.1em .35em 0;}
#eh-app .msg{font-size:.82rem; color:var(--accent); margin-left:.2rem;}
#eh-app table.wide{border-collapse:collapse; font-family:ui-monospace,Menlo,Consolas,monospace;
  font-size:.8rem; width:100%; margin-top:.3rem;}
#eh-app table.wide th{font-weight:600; color:var(--muted); text-align:left; padding:3px 8px;
  border-bottom:1px solid var(--line); font-family:inherit; white-space:nowrap;}
#eh-app table.wide th:first-child, #eh-app table.wide td:first-child{text-align:right; width:2.5em;}
#eh-app table.wide th:nth-child(2), #eh-app table.wide td:nth-child(2){width:46%;}
#eh-app table.wide td{padding:3px 8px; vertical-align:top;}
#eh-app table.wide tr:nth-child(even) td{background:var(--panel);}
#eh-app .scroll{overflow-x:auto;}
#eh-app .ok{color:var(--accent); font-weight:600;}
#eh-app .bad{color:var(--global-highlight-color,#b71c1c); font-weight:600;}
@media print{ #eh-app .toolbar{display:none !important;} #eh-app .panel{border:none; padding:0;} }
</style>

<div class="wrap">
  <h1>Ehrhart theory, by hand</h1>
  <p class="lede">
    Dilate a polytope, count the lattice points, and a polynomial appears. Here are the slices of the
    cube that are small enough to draw &mdash; the hypersimplices among them, and the rational slices in
    between, whose counts are quasi-polynomials &mdash; together with a blank grid for a lattice polygon
    of your own.
  </p>

<div class="toolbar">
  <label>shape
    <select id="eh-shape">
      <optgroup label="slices of the cube">
        <option value="s3">x&#8321;+x&#8322;+x&#8323; = c in [0,1]&sup3; &mdash; 2-dimensional</option>
        <option value="s4" selected>x&#8321;+&hellip;+x&#8324; = c in [0,1]&#8308; &mdash; 3-dimensional</option>
      </optgroup>
      <optgroup label="and one more">
        <option value="poly">lattice polygon &mdash; draw your own</option>
      </optgroup>
    </select></label>
  <label id="eh-clab">c = <input type="range" id="eh-c" min="0" max="7" value="6" style="width:120px"><b id="eh-cv" class="mono"></b></label>
  <label>dilation t = <input type="range" id="eh-t" min="1" max="8" value="2" style="width:120px"><b id="eh-tv" class="mono">2</b></label>
</div>

<div class="toolbar">
  <b class="mono" id="eh-name" style="font-size:.9rem"></b>
  <span style="flex:1"></span>
  <button id="eh-spin" aria-pressed="false">spin</button>
  <button id="eh-reset">reset view</button>
  <button id="eh-link" title="copy a link that reproduces exactly this picture">copy link</button>
  <button id="eh-svg" title="download the current figure as an SVG">save SVG</button>
  <span class="msg" id="eh-msg"></span>
</div>

<div class="toolbar hidden" id="eh-drawbar">
  <label>grid <input type="range" id="eh-grid" min="3" max="10" value="6" style="width:90px"><b id="eh-gridv" class="mono">6</b></label>
  <button class="small" data-preset="triangle">triangle</button>
  <button class="small" data-preset="square">square</button>
  <button class="small" data-preset="hex">hexagon</button>
  <button class="small" id="eh-undo">undo</button>
  <button class="small" id="eh-clear">clear</button>
</div>

<div class="row">
  <div class="col">
    <div class="stage panel" id="eh-stage" tabindex="0" role="img"
         aria-label="A lattice polytope with the lattice points of its dilation."></div>
    <p class="caption" id="eh-legend"></p>
  </div>

  <div class="col side">
    <div class="panel">
      <div class="head" id="eh-counthead">Lattice points</div>
      <div class="big" id="eh-count">&mdash;</div>
      <div class="caption" id="eh-split" style="margin-top:.15rem"></div>
      <div id="eh-num">
        <hr class="sep">
        <div class="head">Counting function <span style="font-weight:400">&mdash; click a row</span></div>
        <table class="tab" id="eh-table"></table>
        <div class="mono" id="eh-ehr" style="margin-top:.6rem; line-height:1.9"></div>
        <hr class="sep">
        <div class="head">Ehrhart series</div>
        <div class="mono" id="eh-series" style="line-height:1.6"></div>
        <div class="caption" id="eh-vol" style="margin-top:.5rem"></div>
        <div class="note plain" id="eh-gor"></div>
      </div>
      <div class="note quiet" id="eh-recip"></div>
    </div>
  </div>
</div>

<div class="panel" id="eh-graded" style="margin-top:1rem"></div>

<div class="note" id="eh-remark"></div>

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
const TMAX = 8;              /* rows in the table, and the top of the dilation slider */
/* Margin around a 2-D picture.  It has to clear the 30px prompt strip along the
   bottom of the unfinished-polygon state, or the y = 0 row of the grid ends up
   underneath it -- and it must be the same number in the renderer and in the
   click handler, or clicks land on the wrong lattice point. */
const PAD = 40;
const W = 430, H = 400;

/* ============================ exact small rationals ============================ */
function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ const r=a%b; a=b; b=r; } return a||1; }
function fr(n,d){ if(d<0){ n=-n; d=-d; } const g=gcd(n,d); return [n/g,d/g]; }
const frAdd = (a,b) => fr(a[0]*b[1]+b[0]*a[1], a[1]*b[1]);
const frMul = (a,b) => fr(a[0]*b[0], a[1]*b[1]);
function frHTML(f){
  if(f[1]===1) return String(f[0]);
  const s = f[0]<0 ? "&minus;" : "";
  return s+'<span class="frac"><span class="num">'+Math.abs(f[0])+'</span>'+f[1]+'</span>';
}
const frText = f => f[1]===1 ? String(f[0]) : f[0]+"/"+f[1];
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
function binomPoly(j){                      /* C(s,j) in the power basis, exactly */
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

/* ================================ linear algebra ================================ */
const sub3   = (p,q) => [p[0]-q[0],p[1]-q[1],p[2]-q[2]];
const cross3 = (u,v) => [u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]];
const dot3   = (u,v) => u[0]*v[0]+u[1]*v[1]+u[2]*v[2];
const norm3  = u => Math.hypot(u[0],u[1],u[2]);
function rotate(p, yaw, pitch){
  const cy=Math.cos(yaw), sy=Math.sin(yaw), cp=Math.cos(pitch), sp=Math.sin(pitch);
  const x1 =  p[0]*cy + p[2]*sy;
  const z1 = -p[0]*sy + p[2]*cy;
  return [x1, p[1]*cp - z1*sp, p[1]*sp + z1*cp];
}
/* An orthonormal basis of {sum = 0} in R^n: v_j = (1,...,1,-j,0,...,0) with j ones.
   The picture is therefore an isometry, not a shadow -- the slice at c = 2 of the
   4-cube comes out a genuinely regular octahedron rather than a lumpy one. */
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

/* Facets of a 3-dimensional convex body from its vertices alone: take every
   triple, keep the planes with all the other vertices on one side, dedupe by the
   set of vertices lying on the plane.  V is at most 12 here, so the cubic loop is
   nothing, and it runs once per shape rather than once per frame.  Doing it this
   way means slices, polygons and anything added later share one path
   instead of each carrying its own combinatorics. */
function facets3(P){
  const n=P.length, out=[], seen={}, eps=1e-7;
  for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) for(let k=j+1;k<n;k++){
    let nrm = cross3(sub3(P[j],P[i]), sub3(P[k],P[i]));
    const L = norm3(nrm); if(L<eps) continue;
    nrm = nrm.map(c=>c/L);
    const d = dot3(nrm,P[i]);
    let pos=0, neg=0; const on=[];
    for(let m=0;m<n;m++){
      const v = dot3(nrm,P[m]) - d;
      if(v>eps) pos++; else if(v<-eps) neg++; else on.push(m);
    }
    if(pos && neg) continue;
    if(on.length<3) continue;
    const key = on.join(",");
    if(seen[key]) continue;
    seen[key]=1;
    const outward = pos ? nrm.map(c=>-c) : nrm;      /* centroid is the origin */
    out.push({ idx: cyclic(P, on, outward), n: outward });
  }
  return out;
}
function cyclic(P, idx, nrm){                        /* order a facet counter-clockwise seen from outside */
  const c=[0,0,0];
  idx.forEach(i=>{ c[0]+=P[i][0]/idx.length; c[1]+=P[i][1]/idx.length; c[2]+=P[i][2]/idx.length; });
  let u = sub3(P[idx[0]], c); const lu=norm3(u)||1; u=u.map(x=>x/lu);
  const v = cross3(nrm, u);
  return idx.slice().sort((a,b)=>{
    const A=sub3(P[a],c), B=sub3(P[b],c);
    return Math.atan2(dot3(A,v),dot3(A,u)) - Math.atan2(dot3(B,v),dot3(B,u));
  });
}
function edgesFromFacets(FS){
  const seen={}, out=[];
  FS.forEach(f=>{ const I=f.idx;
    for(let a=0;a<I.length;a++){
      const p=I[a], q=I[(a+1)%I.length], key = p<q ? p+"-"+q : q+"-"+p;
      if(!seen[key]){ seen[key]=1; out.push([Math.min(p,q),Math.max(p,q)]); }
    }
  });
  return out;
}
function hull2(pts){                                 /* monotone chain, counter-clockwise */
  const P = pts.slice().sort((a,b)=> a[0]-b[0] || a[1]-b[1]);
  if(P.length<3) return P;
  const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
  const lo=[], up=[];
  for(const p of P){ while(lo.length>=2 && cr(lo[lo.length-2],lo[lo.length-1],p)<=0) lo.pop(); lo.push(p); }
  for(let i=P.length-1;i>=0;i--){ const p=P[i];
    while(up.length>=2 && cr(up[up.length-2],up[up.length-1],p)<=0) up.pop(); up.push(p); }
  lo.pop(); up.pop();
  return lo.concat(up);
}

/* =================================== the shapes ===================================
   Every shape answers the same questions -- which lattice points does t P contain,
   which of them are interior, what dimension is it, and what is its denominator --
   so the Ehrhart code, the panel and both renderers are written once.            */
function memo(S){
  const c={}, i={};
  S.count    = t => (t in c) ? c[t] : (c[t] = S.lattice(t).length);
  S.interior = t => (t in i) ? i[t] : (i[t] = S.lattice(t).filter(x=>S.isInt(x,t)).length);
  return S;
}
const NAME3 = { "4,4":"tetrahedron", "6,8":"octahedron", "12,8":"truncated tetrahedron",
                "8,6":"cube", "5,5":"square pyramid" };
const NAME2 = { "3":"triangle", "4":"quadrilateral", "5":"pentagon", "6":"hexagon",
                "7":"heptagon", "8":"octagon" };

/* --- slices of the cube: {x in [0,1]^n : sum x = p/q} --- */
function sliceShape(n, p, q){
  const B = basisFor(n), m = Math.floor(p/q), fN = p - m*q;   /* c = m + fN/q */
  const cen = p/(q*n);
  const verts = [];
  (function subsets(start, S){
    if(S.length===m){
      const base = new Array(n).fill(0); S.forEach(j=>base[j]=1);
      if(fN===0) verts.push(base);
      else for(let i=0;i<n;i++) if(base[i]===0){ const v=base.slice(); v[i]=fN/q; verts.push(v); }
      return;
    }
    for(let j=start;j<n;j++){ S.push(j); subsets(j+1,S); S.pop(); }
  })(0,[]);

  const placeD = (x,t) => embed(B, x.map(v => v/t - cen));
  const S = {
    id:"s"+n, kind:"slice", n, p, q, dim:n-1, cNum:p, cDen:q,
    vertsD: verts.map(v => embed(B, v.map(x => x - cen))),
    placeD,
    isInt: (x,t) => x.every(v => v>0 && v<t),
    lattice(t){
      if((t*p) % q !== 0) return [];                 /* t P misses the lattice entirely */
      const total = t*p/q, out=[], x=new Array(n).fill(0);
      (function rec(i, rem){
        if(i===n-1){ if(rem>=0 && rem<=t){ x[i]=rem; out.push(x.slice()); } return; }
        const hi=Math.min(t, rem);
        for(let v=0; v<=hi; v++){ x[i]=v; rec(i+1, rem-v); }
      })(0, total);
      return out;
    }
  };
  return memo(S);
}

/* --- a lattice polygon the reader draws --- */
function polyShape(gens, grid){
  const V = hull2(gens);
  const ok = V.length>=3;
  /* q is in t P iff every edge cross product is >= 0; a zero means the boundary.
     All integer arithmetic, so the boundary/interior split is never a rounding call. */
  const locate = (t,qx,qy) => {
    let onEdge=false;
    for(let i=0;i<V.length;i++){
      const a=V[i], b=V[(i+1)%V.length];
      const c=(b[0]-a[0])*(qy-t*a[1]) - (b[1]-a[1])*(qx-t*a[0]);
      if(c<0) return -1;
      if(c===0) onEdge=true;
    }
    return onEdge ? 0 : 1;
  };
  const S = {
    id:"poly", kind:"poly", dim:2, q:1, ok, V, grid,
    vertsD: V.map(v => [v[0], v[1]]),
    placeD: (x,t) => [x[0]/t, x[1]/t],
    isInt: (x,t) => locate(t,x[0],x[1])===1,
    lattice(t){
      if(!ok) return [];
      if(t===0) return [[0,0]];
      let x0=Infinity,x1=-Infinity,y0=Infinity,y1=-Infinity;
      for(const v of V){ x0=Math.min(x0,v[0]); x1=Math.max(x1,v[0]); y0=Math.min(y0,v[1]); y1=Math.max(y1,v[1]); }
      const out=[];
      for(let x=t*x0;x<=t*x1;x++) for(let y=t*y0;y<=t*y1;y++) if(locate(t,x,y)>=0) out.push([x,y]);
      return out;
    }
  };
  return memo(S);
}

function shapeName(S){
  if(S.kind==="poly")  return S.ok ? (NAME2[S.V.length] || S.V.length+"-gon") : "no polygon yet";
  const nv = S.vertsD.length;
  let nm;
  if(S.dim===2) nm = (NAME2[nv] || nv+"-gon");
  else { const F = geom(S).FS.length; nm = NAME3[nv+","+F] || (nv+" vertices, "+F+" facets"); }
  if(S.q===1) nm += " &mdash; the hypersimplex &Delta;(" + S.n + "," + S.p + ")";
  else if(S.dim===2 && nv===6 && 2*S.cNum===S.n*S.cDen) nm = "regular hexagon";
  return nm;
}

/* geometry and Ehrhart data are both cached on the shape: a drag redraws the
   picture 60 times a second and neither of these depends on the viewing angle */
function geom(S){
  if(S._g) return S._g;
  if(S.dim===3){
    const FS = facets3(S.vertsD);
    S._g = { FS, ES: edgesFromFacets(FS), R: Math.max.apply(null, S.vertsD.map(norm3)) };
  } else {
    const idx = S.vertsD.map((p,i)=>i);
    if(S.kind!=="poly"){                          /* hull2 already returns a cycle */
      const V=S.vertsD, k=V.length, c=[0,0];
      V.forEach(p=>{ c[0]+=p[0]/k; c[1]+=p[1]/k; });
      idx.sort((a,b)=> Math.atan2(V[a][1]-c[1],V[a][0]-c[0]) - Math.atan2(V[b][1]-c[1],V[b][0]-c[0]));
    }
    S._g = { outline: idx };
  }
  return S._g;
}

/* i(t) counts lattice points of t P.  For a lattice polytope it is a polynomial of
   degree d.  For a rational one with denominator q it is a quasi-polynomial of
   period q, and here only the constituent t = 0 mod q is nonzero -- t P misses the
   lattice altogether otherwise -- so everything reduces to the lattice polytope qP
   and j(s) = i(qs).  d+1 values determine j; its finite differences at 0 are its
   coefficients in the binomial basis and are integers.                          */
function ehrhart(S){
  if(S._e) return S._e;
  const d=S.dim, q=S.q, vals=[];
  for(let s=0;s<=d;s++) vals.push(S.count(q*s));
  const bin=[]; let row=vals.slice();
  for(let j=0;j<=d;j++){ bin.push(row[0]); row = row.slice(1).map((x,i)=>x-row[i]); }
  const pow=new Array(d+1).fill(0).map(()=>fr(0,1));
  bin.forEach((cj,j)=>{ const bp=binomPoly(j);
    for(let k=0;k<bp.length;k++) pow[k]=frAdd(pow[k], frMul(fr(cj,1), bp[k])); });
  const hs=[];
  for(let j=0;j<=d;j++){
    let s=0; for(let i=0;i<=j;i++) s += (i%2?-1:1)*binom(d+1,i)*S.count(q*(j-i));
    hs.push(s);
  }
  while(hs.length>1 && hs[hs.length-1]===0) hs.pop();
  const deg=hs.length-1;
  S._e = { bin, pow, hs, d, q, vals, deg, codeg:d+1-deg,
           normVol: hs.reduce((a,b)=>a+b,0),
           pal: hs.every((v,i)=>v===hs[deg-i]) };
  return S._e;
}
function evalPow(pow, t){
  let acc=fr(0,1), p=1;
  for(let j=0;j<pow.length;j++){ acc=frAdd(acc, frMul(pow[j], fr(p,1))); p*=t; }
  return acc;
}

/* ============================ graded Ehrhart series ============================
   Ported from the demos-src block of /graph-demos/, which computes the graded
   q-Ehrhart series of the cube slice P(l,m,n) = {x in [0,m]^n : sum x = l} in
   closed rational form.  Every slice in this page's menu IS one of those: the
   slice of the unit cube at c = p/den, scaled by den, is exactly P(p, den, n),
   and its k-th dilate is this page's t = k*den.  So there is no linear algebra
   to do -- the q-coefficient at z^k is a difference of two counts of bounded
   weak compositions, which telescopes to the ordinary lattice point count at
   q = 1.  BigInt throughout, because the numerator coefficients are alternating
   sums and nothing here is hot enough to care.                                */
const _CB = new Map();
function bi(n,k){                                  /* binomial, BigInt */
  if(k<0 || n<0 || k>n) return 0n;
  let r=1n; const K=BigInt(k), N=BigInt(n);
  for(let i=0n;i<K;i++) r = r*(N-i)/(i+1n);
  return r;
}
function comps(d,m,n){        /* #{weak compositions of d into n parts, each <= m} */
  if(d<0 || m<0 || n<=0) return 0n;
  const key = d+","+m+","+n, hit=_CB.get(key);
  if(hit!==undefined) return hit;
  let tot=0n; const step=m+1;
  for(let j=0;j*step<=d;j++){ if(j>n) break;
    tot += (j%2?-1n:1n) * bi(n,j) * bi(d-j*step+n-1, n-1); }
  if(_CB.size>200000) _CB.clear();
  _CB.set(key,tot); return tot;
}
const qdelta = (d,m,n) => comps(d,m,n) - comps(d-1,m,n);
const qadd = (a,b) => { const L=Math.max(a.length,b.length), r=new Array(L).fill(0n);
  for(let i=0;i<a.length;i++) r[i]+=a[i];
  for(let i=0;i<b.length;i++) r[i]+=b[i]; return r; };
const qmul = (a,b) => { if(!a.length||!b.length) return [];
  const r=new Array(a.length+b.length-1).fill(0n);
  for(let i=0;i<a.length;i++) if(a[i]) for(let j=0;j<b.length;j++) r[i+j]+=a[i]*b[j];
  return r; };
const qshift = (p,a) => new Array(a).fill(0n).concat(p);
const qzero  = p => !p.some(x => x!==0n);
const qz     = qzero;
const qtrim  = a => { const r=a.slice(); while(r.length>1 && r[r.length-1]===0n) r.pop(); return r; };

/* (1 - q^l z)^{n-1} * prod_{j=0}^{ceil(l/m)-1} (1 - q^{jm} z) */
function denFactors(l,n,m){
  const r = Math.ceil(l/m), f = new Array(n-1).fill(l);
  for(let j=0;j<r;j++) f.push(j*m);
  return f;
}
function denZlist(l,n,m){
  let D=[[1n]];
  for(const a of denFactors(l,n,m)){
    const nw = new Array(D.length+1).fill(0).map(()=>[]);
    for(let k=0;k<D.length;k++){
      nw[k]   = qadd(nw[k],   D[k]);
      nw[k+1] = qadd(nw[k+1], qshift(D[k].map(x=>-x), a));
    }
    D=nw;
  }
  return D;
}
/* E    = sum_k sum_{d<=k l}     delta(d, k m,     n) q^d z^k
   Ebar = sum_k sum_{d<=k l - n} delta(d, k m - 2, n) q^d z^k   */
function seriesZlist(l,n,K,m,interior){
  const A=[];
  for(let k=0;k<=K;k++){
    const top = interior ? k*l-n : k*l, mm = interior ? k*m-2 : k*m, row=[];
    if(top>=0) for(let d=0;d<=top;d++) row.push(qdelta(d,mm,n));
    A.push(row);
  }
  return A;
}
function numZlist(l,n,m,interior,margin){
  margin = margin===undefined ? 6 : margin;
  const D=denZlist(l,n,m), degD=D.length-1, K=degD+margin, A=seriesZlist(l,n,K,m,interior);
  const coeff = k => { let acc=[];
    for(let j=0;j<D.length;j++){ const i=k-j; if(i>=0 && i<=K) acc=qadd(acc,qmul(D[j],A[i])); }
    return acc; };
  const num=[]; for(let k=0;k<=degD;k++) num.push(coeff(k));
  for(let k=degD+1;k<=K;k++) if(!qzero(coeff(k)))
    throw new Error("the numerator degree exceeded the predicted denominator degree by more than " +
                    "the safety margin, so the closed form was not computed");
  return num;
}
/* synthetic division by (1 - q^a z): b_k = c_k + q^a b_{k-1} */
function divideFactor(N,a){
  const d=N.length-1;
  if(d<0) return null;
  if(d===0) return qzero(N[0]) ? [] : null;
  const Q=[]; let prev=[];
  for(let k=0;k<d;k++){ const bk=qadd(N[k]||[], qshift(prev,a)); Q.push(bk); prev=bk; }
  if(!qzero(qadd(N[d]||[], qshift(Q[Q.length-1],a)))) return null;
  while(Q.length>1 && qzero(Q[Q.length-1])) Q.pop();
  return Q;
}
function reduceDen(nE,nB,l,n,m){
  const f=denFactors(l,n,m);
  let changed=true;
  while(changed){ changed=false;
    for(let i=0;i<f.length;i++){
      const qE=divideFactor(nE,f[i]), qB=divideFactor(nB,f[i]);
      if(qE && qB){ nE=qE; nB=qB; f.splice(i,1); changed=true; break; }
    }
  }
  return { nE, nB, f };
}
/* Exact check of q^{n-1} Ebar(z,q) = (-1)^n E(1/z,1/q).  With D = prod (1 - q^a z)
   over F factors of total q-degree S, D(1/z,1/q) = (-1)^F q^{-S} z^{-F} D(z,q), so
   the identity is the finite coefficient identity below. */
function recipExact(nE,nB,n,f){
  const F=f.length, S=f.reduce((a,b)=>a+b,0), sgn=((n+F)%2)?-1n:1n;
  const co=(N,k,e)=>(k<0||k>=N.length||e<0||e>=N[k].length)?0n:N[k][e];
  const emax = Math.max.apply(null, nE.map(r=>r.length).concat(nB.map(r=>r.length), [S])) + n + 2;
  const kmax = Math.max(nE.length, nB.length, F) + 1;
  for(let k=0;k<=kmax;k++) for(let e=0;e<=emax;e++)
    if(co(nB,k,e-(n-1)) !== sgn*co(nE,F-k,S-e)) return false;
  return true;
}
function graded(S){
  if(S._gr!==undefined) return S._gr;
  if(S.kind!=="slice"){ S._gr=null; return null; }
  const l=S.p, m=S.q, n=S.n;
  try{
    const nE=numZlist(l,n,m,false), nB=numZlist(l,n,m,true), full=denFactors(l,n,m);
    const red=reduceDen(nE,nB,l,n,m);
    S._gr = { ok:true, l, m, n, full, nE:red.nE, nB:red.nB, f:red.f,
              reduced: red.f.length < full.length,
              half: (n>=3 && 2*l===n*m),
              recip: recipExact(red.nE, red.nB, n, red.f),
              nonneg: red.nE.every(r=>r.every(c=>c>=0n)) };
  }catch(err){ S._gr = { ok:false, error: err.message }; }
  return S._gr;
}
/* Hilbert series of the k-th dilate, straight from the coefficient formula */
const gradedAt = (S,k) => { const row=[];
  for(let d=0; d<=k*S.p; d++) row.push(qdelta(d, k*S.q, S.n));
  return row; };

/* ===================== graded data for a polygon you draw =====================
   A cube slice has a closed form; a general lattice polygon does not, and its graded
   pieces have to come out of the orbit-harmonics ideal one dilate at a time.  Three
   things make that affordable here:

     1. If the lattice points are an order ideal of N^2 -- P anti-blocking, possibly
        after one of the eight lattice symmetries -- the Hilbert function is just the
        point count by coordinate sum.  No linear algebra at all, at any size.
     2. Otherwise it is a rank computation over F_p.  The basis is never re-reduced:
        new rows leave a block already zero at every earlier pivot, so reducing
        against it is a forward substitution and each basis row is written once.
        Modular reduction is deferred CHUNK updates at a time -- entries stay under
        CHUNK*p^2 < 2^53, so the float64 arithmetic is exact integer arithmetic.
     3. The denominator is found by searching (deg_q, deg_z) smallest-first.  The
        smallest model that fits is the one that needs the fewest dilations: in every
        case tried, four to seven dilations sufficed where a fixed large deg_q needed
        fourteen.  That is what brings the whole thing inside a browser.

   Two primes are run and the answer is refused if they disagree: a single prime can
   only undercount a rank, which would move a unit of Hilbert function to a later
   degree while the total still came out right.                                    */
const HP1 = 1000003, HP2 = 999983, HPF = 1000003, HCHUNK = 256;
const SYM8 = [[1,0,0,1],[-1,0,0,1],[1,0,0,-1],[-1,0,0,-1],[0,1,1,0],[0,-1,1,0],[0,1,-1,0],[0,-1,-1,0]];

function downClosedHilb(Z){
  if(!Z.length) return [];
  for(const [a,b,c,d] of SYM8){
    let mnx=Infinity, mny=Infinity;
    const W = Z.map(q=>{ const u=a*q[0]+b*q[1], v=c*q[0]+d*q[1];
      if(u<mnx) mnx=u; if(v<mny) mny=v; return [u,v]; });
    const S = new Set();
    for(const q of W) S.add((q[0]-mnx)+","+(q[1]-mny));
    let ok=true;
    for(const key of S){
      const pr=key.split(","), i=+pr[0], j=+pr[1];
      if((i>0 && !S.has((i-1)+","+j)) || (j>0 && !S.has(i+","+(j-1)))){ ok=false; break; }
    }
    if(!ok) continue;
    const h=[];
    for(const key of S){ const pr=key.split(","), e=(+pr[0])+(+pr[1]);
      while(h.length<=e) h.push(0n); h[e]+=1n; }
    return h;
  }
  return null;
}
function hilbRank(Z, p){
  const N=Z.length; if(!N) return [];
  const x=new Float64Array(N), y=new Float64Array(N);
  for(let i=0;i<N;i++){ x[i]=((Z[i][0]%p)+p)%p; y[i]=((Z[i][1]%p)+p)%p; }
  const xp=[new Float64Array(N).fill(1)], yp=[new Float64Array(N).fill(1)];
  const R=[], piv=[], lead=[], hilb=[];
  const red = v => { for(let t=0;t<N;t++){ let m=v[t]%p; if(m<0) m+=p; v[t]=m; } };
  let k=0;
  while(piv.length<N){
    while(xp.length<=k){
      const a=xp[xp.length-1], na=new Float64Array(N);
      for(let t=0;t<N;t++) na[t]=(a[t]*x[t])%p; xp.push(na);
      const b=yp[yp.length-1], nb=new Float64Array(N);
      for(let t=0;t<N;t++) nb[t]=(b[t]*y[t])%p; yp.push(nb);
    }
    let added=0;
    for(let i=0;i<=k;i++){
      const j=k-i;
      let skip=false;
      for(let l=0;l<lead.length;l++) if(lead[l][0]<=i && lead[l][1]<=j){ skip=true; break; }
      if(skip) continue;
      const v=new Float64Array(N), A=xp[i], Bp=yp[j];
      for(let t=0;t<N;t++) v[t]=(A[t]*Bp[t])%p;
      let acc=0;
      for(let r=0;r<piv.length;r++){
        let c=v[piv[r]]%p; if(c<0) c+=p;
        if(c){ const row=R[r]; for(let t=0;t<N;t++) v[t]-=c*row[t]; }
        if(++acc>=HCHUNK){ red(v); acc=0; }
      }
      red(v);
      let pv=-1; for(let t=0;t<N;t++) if(v[t]!==0){ pv=t; break; }
      if(pv<0){ lead.push([i,j]); continue; }
      let inv=1, base=v[pv], e=p-2;
      while(e){ if(e&1) inv=(inv*base)%p; base=(base*base)%p; e>>=1; }
      for(let t=0;t<N;t++) v[t]=(v[t]*inv)%p;
      R.push(v); piv.push(pv); added++;
      if(piv.length>=N) break;
    }
    hilb.push(added); k++;
    if(k > 8*Math.sqrt(N)+60) throw new Error("runaway");
  }
  while(hilb.length && hilb[hilb.length-1]===0) hilb.pop();
  return hilb.map(v=>BigInt(v));
}
/* One prime while searching, the second only to confirm an answer.  A single prime
   can only UNDERcount a rank, which would move a unit of Hilbert function to a later
   degree while the total still came out right -- so one prime is not trustworthy on
   its own, but it is trustworthy enough to explore with, and confirming at the end
   costs the second pass only when there is something to confirm. */
function hilbertOf(Z, p){
  const fast = downClosedHilb(Z);
  if(fast) return fast;
  return hilbRank(Z, p || HP1);
}
function confirmSeries(S, Kver){
  for(let k=0;k<=Kver;k++){
    const Z=S.lattice(k);
    if(downClosedHilb(Z)) continue;
    const Zi=Z.filter(pt=>S.isInt(pt,k));
    if(hilbRank(Z,HP2).join(",") !== hilbertOf(Z,HP1).join(",")) return false;
    if(Zi.length && hilbRank(Zi,HP2).join(",") !== hilbertOf(Zi,HP1).join(",")) return false;
  }
  return true;
}

/* ---- the denominator, found by a smallest-first search over (deg_q, deg_z) ----
   Finding it is LINEAR, not a search over multisets of (a,b): solve for
   D(q,z) = sum d_{a,b} q^a z^b with d_{0,0} = 1 killing the tail of both D*E and
   D*Ebar.  Solve mod a prime, lift by centred residues, then verify the lift EXACTLY
   over the integers, so a wrong lift cannot survive.                             */
const seriesAt = (S,k,e) => (k<0 || k>=S.length || e<0 || e>=S[k].length) ? 0n : S[k][e];
function solveModP(rows, nun, p){
  const M = rows, piv=[]; let r=0;
  for(let c=0;c<nun && r<M.length;c++){
    let sel=-1;
    for(let i=r;i<M.length;i++) if(M[i][c]%p!==0){ sel=i; break; }
    if(sel<0) continue;
    const tmp=M[r]; M[r]=M[sel]; M[sel]=tmp;
    let inv=1, base=M[r][c]%p, e=p-2;
    while(e){ if(e&1) inv=(inv*base)%p; base=(base*base)%p; e>>=1; }
    for(let j=c;j<=nun;j++) M[r][j]=(M[r][j]*inv)%p;
    for(let i=0;i<M.length;i++){
      if(i===r) continue;
      const f=M[i][c]%p;
      if(f){ for(let j=c;j<=nun;j++){ let v=(M[i][j]-f*M[r][j])%p; if(v<0) v+=p; M[i][j]=v; } }
    }
    piv.push(c); r++;
  }
  for(let i=r;i<M.length;i++) if(M[i][nun]%p!==0) return null;      /* inconsistent */
  const x=new Array(nun).fill(0);
  piv.forEach((c,i)=>{ x[c]=M[i][nun]%p; });
  return x;
}
function mulSeriesZ(D,S,K){
  const out=[];
  for(let k=0;k<=K;k++){
    let acc=[];
    for(let b=0;b<D.length;b++) if(k-b>=0 && k-b<S.length) acc=qadd(acc, qmul(D[b], S[k-b]));
    out.push(qtrim(acc));
  }
  return out;
}
const tailClean = (D,S,K,deg) => { const P_=mulSeriesZ(D,S,K);
  for(let k=deg+1;k<=K;k++) if(!qz(P_[k])) return false; return true; };
function divFac(D,a,b){                       /* exact division by (1 - q^a z^b) */
  const dd=D.length-1, dq=dd-b;
  if(dq<0) return null;
  const Q=[];
  for(let k=0;k<=dq;k++) Q.push(qtrim(qadd(D[k]||[], k-b>=0 ? qshift(Q[k-b],a) : [])));
  for(let k=dq+1;k<=dd;k++)
    if(!qz(qadd(D[k]||[], (k-b>=0 && k-b<=dq) ? qshift(Q[k-b],a) : []))) return null;
  while(Q.length>1 && qz(Q[Q.length-1])) Q.pop();
  return Q;
}
function peelFactors(D,A,Bmax){
  const f=[]; let cur=D.map(r=>r.slice()), guard=0;
  while(cur.length>1 && guard++<40){
    let hit=null;
    for(let b=1;b<=Bmax && !hit;b++) for(let a=0;a<=A;a++){
      const q=divFac(cur,a,b); if(q){ hit=[a,b,q]; break; } }
    if(!hit) return {f, rest:cur};
    f.push([hit[0],hit[1]]); cur=hit[2];
  }
  return {f, rest:cur};
}
function recipPoly(N,Nb,d,fac){
  const F=fac.length, Sq=fac.reduce((s,q)=>s+q[0],0), Bt=fac.reduce((s,q)=>s+q[1],0);
  const sgn=((d+1+F)%2)?-1n:1n;
  const co=(X,k,e)=>(k<0||k>=X.length||e<0||e>=X[k].length)?0n:X[k][e];
  let em=Sq; N.concat(Nb).forEach(r=>{ if(r.length>em) em=r.length; });
  em += d+2;
  for(let k=0;k<=Math.max(N.length,Nb.length,Bt)+1;k++) for(let e=0;e<=em;e++)
    if(co(Nb,k,e-d) !== sgn*co(N,Bt-k,Sq-e)) return false;
  return true;
}
/* The q-degree of Hilb_k grows linearly, and its rate is exactly max(a_i/b_i) over
   the denominator's factors -- measured, not assumed: for the page's own hexagon the
   observed 20/3 is the 20/3 of its (1 - q^20 z^3) factor.  So a term q^a z^b of D can
   only appear with a <= alpha*b, which is what keeps a large deg q affordable: the
   unknowns grow like alpha*B^2/2 instead of (alpha*B)*B. */
function fitPolyDen(E, Eb, Kfit, Kver, Amax, Bmax){
  let alpha = 1;
  for(let k=1;k<E.length;k++) if(E[k].length>1) alpha = Math.max(alpha, (E[k].length-1)/k);
  const cands=[];
  for(let B=3;B<=Bmax;B++){
    const A = Math.min(Amax, Math.ceil(alpha*B)+2);
    const cols=[];
    for(let b=0;b<=B;b++){
      const hi = Math.min(A, Math.ceil(alpha*b)+2);
      for(let a=0;a<=hi;a++) cols.push([a,b]);
    }
    cands.push([cols.length, A, B, cols]);
  }
  cands.sort((u,v)=>u[0]-v[0]);
  for(const [,A,B,cols] of cands){
    if(B>=Kfit) continue;
    const nun=cols.length, pos={};
    cols.forEach((ab,i)=>{ pos[ab[0]+","+ab[1]]=i; });
    const idx=(a,b)=>{ const v=pos[a+","+b]; return v===undefined ? -1 : v; };
    const rows=[];
    for(const S of [E,Eb]){
      let em=0; S.forEach(r=>{ if(r.length>em) em=r.length; }); em+=A+1;
      for(let k=B+1;k<=Kfit;k++) for(let e=0;e<=em;e++){
        const row=new Float64Array(nun+1); let any=false;
        for(let c=0;c<cols.length;c++){
          const a=cols[c][0], b=cols[c][1], v=Number(seriesAt(S,k-b,e-a));
          if(v){ if(a===0&&b===0){ let t=(row[nun]-v)%HPF; if(t<0) t+=HPF; row[nun]=t; }
                 else { row[c]=((v%HPF)+HPF)%HPF; any=true; } }
        }
        if(any || row[nun]) rows.push(row);
      }
    }
    if(!rows.length) continue;
    const x=solveModP(rows,nun,HPF);
    if(!x) continue;
    const cen=v=>{ v=((v%HPF)+HPF)%HPF; return BigInt(v>HPF/2 ? v-HPF : v); };
    const D=[];
    for(let b=0;b<=B;b++){
      const row=[];
      for(let a=0;a<=A;a++){ const c=idx(a,b);
        row.push((a===0&&b===0) ? 1n : (c<0 ? 0n : cen(x[c]))); }
      D.push(qtrim(row));
    }
    while(D.length>1 && qz(D[D.length-1])) D.pop();
    const deg=D.length-1;
    if(!tailClean(D,E,Kver,deg) || !tailClean(D,Eb,Kver,deg)) continue;
    const pl=peelFactors(D,A,Bmax);
    if(pl.rest.length>1 || pl.rest[0].length!==1 || pl.rest[0][0]!==1n) continue;
    return { D, factors:pl.f, A, B };
  }
  return null;
}
/* The whole pipeline for one drawn polygon, cached on the shape.  The Hilbert data is
   the expensive part, so it is computed once and then fitted at increasing Kfit -- the
   smallest model that fits needs the fewest dilations, and stopping at the first one
   that also survives verification is what keeps this inside a browser. */
/* How far to go.  The Hilbert data is the whole cost and it grows like N^3, so the
   number of dilations is chosen from the polygon's own size against a time budget --
   measured at 4.4e-10 ms per N^3 in this kernel.  A polygon whose lattice points are
   an order ideal costs nothing at any size, so it simply gets more dilations. */
/* 1e-6 ms per N^3 per pass, calibrated against this kernel in a browser; the whole
   job is four passes -- the polytope and its interior, each over two primes.  The
   budget is generous because the work is opt-in and runs one dilation per tick, so
   the page stays responsive whatever it costs. */
const RANK_MS_PER_N3 = 1.0e-6, RANK_BUDGET_MS = 30000;
const cost = (S,k) => { let s=0;
  for(let j=0;j<=k;j++){ const n=S.count(j); s += 4*RANK_MS_PER_N3*n*n*n; }
  return s; };
/* Start shallow and go deeper only if the fit fails.  Most polygons are settled by
   seven dilations; the ones that are not need a denominator of higher z-degree, which
   needs more dilations to pin down, and the extra cost is paid only by them. */
function planFor(S){
  if(!S.ok) return { Kmax:0, K0:0, dc:false, est:0, ok:false };
  if(downClosedHilb(S.lattice(1)))
    return { Kmax:14, K0:14, dc:true, est:0, ok:true, top:S.count(14) };
  let Kmax=0;
  for(let k=6;k<=13;k++){ if(cost(S,k) > RANK_BUDGET_MS) break; Kmax=k; }
  const K0 = Math.min(Kmax, 7);
  return { Kmax, K0, dc:false, est:cost(S,Kmax), ok:Kmax>=6, top:S.count(Kmax||6) };
}
function gradedPolygon(S, Kver){
  const E=[], Eb=[];
  for(let k=0;k<=Kver;k++){
    const Z=S.lattice(k);
    E.push(hilbertOf(Z));
    Eb.push(hilbertOf(Z.filter(pt=>S.isInt(pt,k))));
  }
  for(let Kfit=4; Kfit<=Kver-2; Kfit++){
    const fit = fitPolyDen(E, Eb, Kfit, Kver, 40, 6);
    if(!fit) continue;
    const N=mulSeriesZ(fit.D,E,Kver).slice(0,fit.D.length);
    const Nb=mulSeriesZ(fit.D,Eb,Kver).slice(0,fit.D.length);
    const confirmed = confirmSeries(S, Kver);
    return { E, Eb, D:fit.D, factors:fit.factors, N, Nb, Kfit, Kver, confirmed,
             recip: recipPoly(N,Nb,2,fit.factors) };
  }
  return { E, Eb, Kver, fail:"no denominator with deg&thinsp;z &le; 6 is consistent with the first "+
                       (Kver-2)+" dilations" };
}

/* ================================== rendering ================================== */
const circle = (x,y,r,fill,o) =>
  '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(2)+'" fill="'+fill+
  (o!==undefined ? '" opacity="'+o : '')+'"/>';

function render3d(S){
  const g=geom(S), T=state.T, sc=178/g.R, cx=W/2, cy=H/2;
  const rv = S.vertsD.map(p => rotate(p, state.yaw, state.pitch));
  const rn = g.FS.map(f => rotate(f.n, state.yaw, state.pitch));   /* rotation is orthogonal */
  const px = p => cx+sc*p[0], py = p => cy-sc*p[1];
  const pt = p => px(p).toFixed(1)+","+py(p).toFixed(1);
  const front = rn.map(n => n[2] > 0);

  const back=[], solid=[], dashed=[];
  g.FS.forEach((f,i)=>{
    if(front[i]) return;
    /* shade the far shell by how squarely each facet turns away, so the solid
       reads as a solid rather than as one flat silhouette */
    back.push('<polygon points="'+f.idx.map(j=>pt(rv[j])).join(" ")+'" opacity="'+
      (0.45+0.55*Math.abs(rn[i][2])).toFixed(2)+'"/>');
  });
  g.ES.forEach(e=>{
    /* hidden-line removal is exact rather than painterly: an edge is hidden iff
       both incident facets face away, which is valid because P is convex */
    const vis = g.FS.some((f,i)=> front[i] && f.idx.indexOf(e[0])>=0 && f.idx.indexOf(e[1])>=0);
    (vis?solid:dashed).push('<line x1="'+px(rv[e[0]]).toFixed(1)+'" y1="'+py(rv[e[0]]).toFixed(1)+
      '" x2="'+px(rv[e[1]]).toFixed(1)+'" y2="'+py(rv[e[1]]).toFixed(1)+'"/>');
  });

  let nB=0, nI=0;
  const drawn = S.lattice(T).map(x => {
    const inte = S.isInt(x,T);
    if(inte) nI++; else nB++;
    return { p: rotate(S.placeD(x,T), state.yaw, state.pitch), inte };
  }).sort((a,b)=> a.p[2]-b.p[2]);
  const base = Math.max(1.4, 3.8 - 0.34*T);
  const dots = drawn.map(d => {
    const z = d.p[2]/g.R;
    return circle(px(d.p), py(d.p), base*(1+0.16*z), d.inte?"var(--int)":"var(--accent)",
                  (0.3+0.7*(z+1)/2).toFixed(2));
  }).join("");

  return { svg:
    '<g fill="var(--facefill)" stroke="none">'+back.join("")+'</g>'+
    '<g fill="none" stroke="var(--edge)" stroke-width="1.1" opacity=".3" stroke-dasharray="4 4">'+dashed.join("")+'</g>'+
    dots +
    '<g fill="none" stroke="var(--edge)" stroke-width="1.7" stroke-linecap="round">'+solid.join("")+'</g>',
    nB, nI, total:nB+nI };
}

function rings(gens, F){
  return gens.map(g => '<circle cx="'+(F.ox+F.S*g[0]).toFixed(1)+'" cy="'+(F.oy-F.S*g[1]).toFixed(1)+
    '" r="6" fill="var(--surface)" fill-opacity=".65" stroke="var(--accent)" stroke-width="1.6"/>').join("");
}
function gridGhosts(F, grid){
  let g="";
  for(let x=0;x<=grid;x++) for(let y=0;y<=grid;y++) g += circle(F.ox+F.S*x, F.oy-F.S*y, 1.5, "var(--ghost)");
  return "<g>"+g+"</g>";
}
function fit(bbox, m){
  const s = Math.min((W-2*m)/(bbox[1]-bbox[0]||1), (H-2*m)/(bbox[3]-bbox[2]||1));
  return { S:s, ox: W/2 - s*(bbox[0]+bbox[1])/2, oy: H/2 + s*(bbox[2]+bbox[3])/2 };
}
const gridFit = grid => fit([0,grid,0,grid], PAD);

function render2d(S){
  const T=state.T, poly=(S.kind==="poly");
  if(poly && !S.ok){
    /* An unfinished polygon still has to show the picks -- otherwise the first two
       clicks look like they did nothing.  The prompt sits along the bottom on its
       own strip: a grid dot in a word gap reads as a stray comma, and a centred
       message covers the picks. */
    const F0 = gridFit(S.grid), P = hull2(state.gens);
    const seg = (P.length===2)
      ? '<line x1="'+(F0.ox+F0.S*P[0][0]).toFixed(1)+'" y1="'+(F0.oy-F0.S*P[0][1]).toFixed(1)+
        '" x2="'+(F0.ox+F0.S*P[1][0]).toFixed(1)+'" y2="'+(F0.oy-F0.S*P[1][1]).toFixed(1)+
        '" stroke="var(--edge)" stroke-width="1.4" stroke-dasharray="5 4" opacity=".6"/>' : "";
    const n = state.gens.length;
    const msg = n===0 ? "click three grid points to start a polygon"
              : n===1 ? "one vertex so far — two more to go"
              : n===2 ? "two vertices so far — one more, off this line"
              :         "all of these are in a line — add one off it";
    return { svg: gridGhosts(F0,S.grid) + seg + rings(state.gens,F0) + cursorMark(F0) +
      '<rect x="0" y="'+(H-30)+'" width="'+W+'" height="30" fill="var(--surface)"/>'+
      '<text x="'+(W/2)+'" y="'+(H-11)+'" text-anchor="middle" fill="var(--muted)" font-size="13">'+msg+'</text>',
      nB:0, nI:0, total:0, invalid:true };
  }

  const g = geom(S);
  let F, step, ghosts="", picks="";
  if(poly){
    F = gridFit(S.grid);
    ghosts = gridGhosts(F,S.grid); picks = rings(state.gens,F) + cursorMark(F);
    step = F.S/T;
  } else {
    let x0=Infinity,x1=-Infinity,y0=Infinity,y1=-Infinity;
    S.vertsD.forEach(p=>{ x0=Math.min(x0,p[0]); x1=Math.max(x1,p[0]); y0=Math.min(y0,p[1]); y1=Math.max(y1,p[1]); });
    F = fit([x0,x1,y0,y1], PAD);
    step = F.S*Math.SQRT2/T;                        /* nearest lattice step is e_i - e_j */
  }
  const sx = x => F.ox + F.S*x, sy = y => F.oy - F.S*y;
  const outline = g.outline.map(i => sx(S.vertsD[i][0]).toFixed(1)+","+sy(S.vertsD[i][1]).toFixed(1));

  let nB=0, nI=0, dots="";
  const r = Math.max(1.0, Math.min(5, 0.14*step));
  S.lattice(T).forEach(x => {
    const p = S.placeD(x,T), inte = S.isInt(x,T);
    if(inte) nI++; else nB++;
    dots += circle(sx(p[0]), sy(p[1]), r, inte?"var(--int)":"var(--accent)");
  });

  return { svg:
    '<polygon points="'+outline.join(" ")+'" fill="var(--facefill)" stroke="var(--edge)" '+
      'stroke-width="1.7" stroke-linejoin="round"/>'+
    ghosts + dots + picks,
    nB, nI, total:nB+nI };
}
/* the keyboard cursor for the drawing grid, drawn only while the stage has focus */
function cursorMark(F){
  if(state.shape!=="poly" || !state.kb) return "";
  const x=F.ox+F.S*state.cur[0], y=F.oy-F.S*state.cur[1];
  return '<rect x="'+(x-8).toFixed(1)+'" y="'+(y-8).toFixed(1)+'" width="16" height="16" rx="3" '+
         'fill="none" stroke="var(--int)" stroke-width="1.6" stroke-dasharray="3 3"/>';
}

/* =================================== readouts =================================== */
const rfrac = (a,b) => '<span class="rfrac"><span class="num">'+a+'</span><span class="den">'+b+'</span></span>';
const zpow  = k => k===0 ? "" : (k===1 ? "z" : "z<sup>"+k+"</sup>");

function readouts(S, counts){
  const T=state.T, poly=(S.kind==="poly"), q=S.q;
  $("eh-name").innerHTML = shapeName(S);
  $("eh-counthead").innerHTML = "Lattice points of t&thinsp;P";

  if(poly && !S.ok){
    const n = state.gens.length;
    $("eh-num").hidden = true;
    $("eh-count").innerHTML = "&mdash;";
    $("eh-split").innerHTML = n===0 ? "no vertices picked yet"
      : n + " vertex" + (n===1?"":"es") + " picked, no polygon yet";
    $("eh-recip").innerHTML = "Pick three points that are not collinear and everything here fills in.";
    $("eh-remark").innerHTML = "A lattice polygon is the convex hull of finitely many points of " +
      "Z<sup>2</sup>. Click the grid, or focus the picture and use the arrow keys and Enter.";
    $("eh-legend").innerHTML = "Click a grey grid point to place a vertex.";
    gradedReadout(S);
    return;
  }
  $("eh-num").hidden = false;

  const E = ehrhart(S), d = E.d;
  $("eh-count").innerHTML = counts.total.toLocaleString();
  $("eh-split").innerHTML = counts.total===0
    ? "t&thinsp;P has no lattice points at all &mdash; " + q + " does not divide " + T
    : '<span class="swatch" style="background:var(--accent)"></span>'+counts.nB.toLocaleString()+' on the boundary &middot; '+
      '<span class="swatch" style="background:var(--int)"></span>'+counts.nI.toLocaleString()+' interior';

  let rows='<tr><th>t</th><th>points</th><th>interior</th></tr>';
  for(let t=0;t<=TMAX;t++){
    const c=S.count(t);
    rows += '<tr data-t="'+t+'" class="'+(t>=1?"pick ":"")+(c===0&&t>0?"zero ":"")+(t===T?"cur":"")+'"'+
            (t>=1?' title="show this dilation"':'')+'><td>'+t+'</td><td>'+c.toLocaleString()+
            '</td><td>'+S.interior(t).toLocaleString()+'</td></tr>';
  }
  $("eh-table").innerHTML = rows;

  const v = q===1 ? "t" : "s";
  const binTerms = E.bin.map((c,j)=> c===0 ? null :
      (j===0 ? String(c) : (c===1?"":c)+"C("+v+","+j+")")).filter(Boolean);
  $("eh-ehr").innerHTML =
    (q===1 ? "" : 'i(t) = 0 unless '+q+' | t, and<br>') +
    'i(' + (q===1?"t":q+"s") + ') = ' + polyHTML(E.pow, v) + '<br>' +
    '<span style="color:var(--muted)">&nbsp;&nbsp;&nbsp;&nbsp;= ' + binTerms.join(" + ") + '</span>';

  const terms=[];
  for(let s=0;s<=d+1;s++){
    const val=S.count(q*s), k=q*s;
    terms.push(s===0 ? String(val) : (val===1?"":val.toLocaleString())+zpow(k));
  }
  $("eh-series").innerHTML =
    '&sum;<sub>t&ge;0</sub> |t&thinsp;P &cap; Z<sup>'+(S.n||S.dim)+'</sup>| z<sup>t</sup> = ' +
    rfrac(polyHTML(E.hs.map(h=>fr(h,1)), q===1?"z":"z<sup>"+q+"</sup>", true),
          '(1 &minus; '+(q===1?"z":"z<sup>"+q+"</sup>")+')<sup>'+(d+1)+'</sup>') +
    '<br><span style="color:var(--muted)">= ' + terms.join(" + ") + ' + &ctdot;</span>';

  /* volume.  For q > 1 the h*-vector belongs to the lattice polytope qP, so the
     volume of P itself is that normalized volume over q^d d!. */
  const scale = factorial(d) * Math.pow(q,d);
  let volTail;
  if(poly){
    const I1=S.interior(1), b1=S.count(1)-I1;
    volTail = 'so P has area ' + frHTML(fr(E.normVol,2)) + '. That is Pick’s theorem: with ' + I1 +
      ' interior point' + (I1===1?"":"s") + ' and ' + b1 + ' on the boundary, area = ' + I1 + ' + ' +
      b1 + '/2 &minus; 1 = ' + frHTML(fr(E.normVol,2)) + '.';
  } else if(q===1){
    volTail = 'so vol P = ' + frHTML(fr(E.normVol, scale)) + ', and ' + E.normVol + ' = A(' +
      (S.n-1) + ',' + (S.p-1) + '), an Eulerian number.';
  } else {
    volTail = 'for the lattice polytope ' + q + 'P, so vol P = ' + frHTML(fr(E.normVol, scale)) + '.';
  }
  $("eh-vol").innerHTML = 'h*(1) = ' + E.normVol + ' is the normalized volume, ' + volTail;

  /* codegree, and Gorenstein when h* is palindromic.  Both are checked against the
     interior column rather than asserted. */
  let firstInt=0;
  for(let s=1;s<=d+1;s++) if(S.interior(q*s)>0){ firstInt=q*s; break; }
  $("eh-gor").innerHTML =
    'deg h* = ' + E.deg + ', so the codegree is ' + (d+1) + ' &minus; ' + E.deg + ' = ' + E.codeg +
    ' and the first dilate with an interior point is t = ' + (E.codeg*q) +
    (firstInt===E.codeg*q ? ' &mdash; which is what the interior column says.'
                          : ' &mdash; but the column says ' + firstInt + '!') +
    (E.pal ? ' h* is palindromic, so ' + (q===1?"P":q+"P") + ' is <b>Gorenstein</b>.'
           : ' h* is not palindromic, so it is not Gorenstein.');

  const s0 = (T%q===0 && T>0) ? T/q : Math.max(1, Math.floor(T/q));
  const rec = evalPow(E.pow, -s0), recVal = Math.round(((d%2)?-1:1)*rec[0]/rec[1]);
  const obs = S.interior(q*s0);
  $("eh-recip").innerHTML =
    '<b>Reciprocity.</b> (&minus;1)<sup>'+d+'</sup>&thinsp;i(&minus;'+(q===1?s0:q+"&middot;"+s0)+') = ' + recVal +
    ', which is exactly the ' + obs.toLocaleString() + ' interior point' + (obs===1?"":"s") +
    ' at t = ' + (q*s0) + (recVal===obs ? '.' : ' &mdash; mismatch!');

  gradedReadout(S);
  $("eh-remark").innerHTML = remark(S,E);
  $("eh-legend").innerHTML =
    '<span class="swatch" style="background:var(--accent)"></span>boundary points &middot; ' +
    '<span class="swatch" style="background:var(--int)"></span>interior points &middot; ' +
    (poly ? 'click a grey grid point to add or drop a vertex, or focus the picture and use the arrow ' +
            'keys and Enter. The polygon keeps its size and the lattice gets finer as t grows, which ' +
            'is the same picture as dilating it.'
          : (S.dim===3 ? 'the solid is drawn at a fixed size, so dilating shows up as a finer lattice ' +
                         'rather than a bigger polytope. Drag to rotate, or focus it and use the arrow keys.'
                       : 'the polygon is drawn at a fixed size, so dilating shows up as a finer lattice.'));
}

function qpHTML(poly, v){                    /* a polynomial with BigInt coefficients */
  v = v || "q";
  const terms=[];
  poly.forEach((c,e)=>{
    if(c===0n) return;
    const neg = c<0n, a = neg ? -c : c;
    let mono = (a===1n && e>0) ? "" : a.toString();
    if(e===1) mono += v; else if(e>1) mono += v+"<sup>"+e+"</sup>";
    terms.push([neg,mono]);
  });
  if(!terms.length) return "0";
  return terms.map((t,i)=> (i===0 ? (t[0]?"&minus;":"") : (t[0]?" &minus; ":" + ")) + t[1]).join("");
}
function denHTML(f){
  const cnt={};
  f.forEach(a=>{ cnt[a]=(cnt[a]||0)+1; });
  return Object.keys(cnt).map(Number).sort((a,b)=>a-b).map(a=>{
    const base = a===0 ? "(1 &minus; z)" : "(1 &minus; q"+(a===1?"":"<sup>"+a+"</sup>")+"z)";
    return base + (cnt[a]>1 ? "<sup>"+cnt[a]+"</sup>" : "");
  }).join("");
}
function gradedReadout(S){
  const box = $("eh-graded");
  if(S.kind!=="slice"){ gradedPolyReadout(S, box); return; }
  const G = graded(S), den = S.q, T = state.T;
  const Pn = 'P(' + S.p + ',' + S.q + ',' + S.n + ')';
  let h = '<div class="head">Graded Ehrhart series</div>' +
    '<p class="caption" style="margin:0 0 .5rem">Orbit harmonics grades the lattice points of the ' +
    'k-th dilate of ' + Pn + ' = {x &isin; [0,' + S.q + ']<sup>' + S.n + '</sup> : &sum;x = ' + S.p +
    '}' + (den===1 ? '' : ', which is ' + den + 'P') + ', giving a q-analogue of the count that ' +
    'collapses to the middle column at q = 1' +
    (den===1 ? '' : '. Here z<sup>k</sup> is the dilate t = ' + den + 'k') + '.</p>';

  if(T % den === 0){
    const k = T/den, row = gradedAt(S,k);
    const sum = row.reduce((a,b)=>a+b, 0n), want = BigInt(S.count(T));
    h += '<div class="mono" style="line-height:1.8">Hilb(' + (k===1?"":k+"&thinsp;") + Pn + '; q) = ' + qpHTML(row) +
         '<br><span style="color:var(--muted)">&nbsp;&nbsp;at q = 1: ' + sum.toString() +
         (sum===want ? ' <span class="ok">= i(' + T + ')</span>' : ' <span class="bad">&ne; i(' + T + ')</span>') +
         '</span></div>';
  } else {
    h += '<div class="caption">t = ' + T + ' is not a multiple of ' + den +
         ', so this dilate has no lattice points and nothing to grade.</div>';
  }

  if(!G.ok){
    h += '<div class="note plain" style="margin-bottom:0">' + G.error + '.</div>';
    box.innerHTML = h;
    return;
  }
  h += '<hr class="sep"><div class="mono" style="line-height:1.7">E(q,z) = ' +
       rfrac('N(q,z)', denHTML(G.f)) + '&nbsp;&nbsp;&nbsp;&nbsp;' +
       '<span style="color:var(--muted)">interior:</span>&nbsp;' +
       '&#274;(q,z) = ' + rfrac('N&#772;(q,z)', denHTML(G.f)) + '</div>';
  if(G.reduced)
    h += '<div class="caption">Predicted denominator ' + denHTML(G.full) + '; one factor cancels ' +
         'against both numerators' + (G.half ? ', which is the reduction predicted when n &ge; 3 and 2&#8467; = nm'
                                             : ' &mdash; and that reduction was <b>not</b> predicted') + '.</div>';
  const rows = Math.max(G.nE.length, G.nB.length);
  let t = '<table class="wide"><tr><th>z<sup>k</sup></th><th>N(q,z)</th><th>N&#772;(q,z)</th></tr>';
  for(let k=0;k<rows;k++){
    const a = (k<G.nE.length && !qzero(G.nE[k])) ? qpHTML(G.nE[k]) : "";
    const b = (k<G.nB.length && !qzero(G.nB[k])) ? qpHTML(G.nB[k]) : "";
    if(a || b) t += '<tr><td>'+k+'</td><td>'+(a||"0")+'</td><td>'+(b||"0")+'</td></tr>';
  }
  h += '<div class="scroll">' + t + '</table></div>';
  /* At q = 1 the graded fraction has to become the h*-fraction printed above.  The
     reduced denominator has F factors and (1-z)^{d+1} is what the ungraded series
     wants, so N(1,z) must be h*(z) times (1-z)^{F-d-1}. */
  const E1 = ehrhart(S), F = G.f.length, extra = F - (S.dim+1);
  let want = E1.hs.map(BigInt);
  for(let i=0;i<extra;i++) want = qadd(want.concat([0n]), qshift(want.map(x=>-x),1));
  const got = G.nE.map(r => r.reduce((a,b)=>a+b, 0n));
  while(got.length>1 && got[got.length-1]===0n) got.pop();
  while(want.length>1 && want[want.length-1]===0n) want.pop();
  const q1ok = got.length===want.length && got.every((v,i)=>v===want[i]);
  h += '<div class="caption">At q = 1: N(1,z) = ' + qpHTML(got,"z") + ' = h*(z)' +
       (extra>0 ? '(1 &minus; z)' + (extra>1 ? '<sup>'+extra+'</sup>' : '') : '') +
       (q1ok ? ' <span class="ok">&check;</span>, so the fraction above is what this one becomes.'
             : ' <span class="bad">&mdash; mismatch</span>.') + '</div>';
  h += '<div class="note quiet" style="margin-bottom:0"><b>q-reciprocity.</b> ' +
       'q<sup>' + (S.n-1) + '</sup>&#274;(z,q) = (&minus;1)<sup>' + S.n + '</sup>E(1/z,1/q) ' +
       (G.recip ? '<span class="ok">holds exactly</span>' : '<span class="bad">FAILS</span>') +
       ', checked coefficient by coefficient on the numerators rather than numerically.' +
       (G.nonneg ? ' Every coefficient of N is non-negative.' : ' N has a negative coefficient.') +
       '</div>';
  box.innerHTML = h;
}

/* ---- denominator of the form prod (1 - q^a z^b), as HTML ---- */
function den2HTML(fac){
  const cnt={};
  fac.forEach(([a,b])=>{ const k=a+","+b; cnt[k]=(cnt[k]||0)+1; });
  return Object.keys(cnt).sort((u,v)=>{
      const A=u.split(",").map(Number), B=v.split(",").map(Number);
      return A[1]-B[1] || A[0]-B[0];
    }).map(k=>{
      const pr=k.split(",").map(Number), a=pr[0], b=pr[1];
      const qq = a===0 ? "" : (a===1 ? "q" : "q<sup>"+a+"</sup>");
      const zz = b===1 ? "z" : "z<sup>"+b+"</sup>";
      return "(1 &minus; "+qq+zz+")" + (cnt[k]>1 ? "<sup>"+cnt[k]+"</sup>" : "");
    }).join("");
}
const NOW_CAP = 900;      /* points we will grade without being asked */

function gradedPolyReadout(S, box){
  let h = '<div class="head">Graded Ehrhart series</div>';
  if(!S.ok){
    box.innerHTML = h + '<p class="caption" style="margin:0">Draw a polygon and this fills in.</p>';
    return;
  }
  const T = state.T, Z = S.lattice(T), fast = downClosedHilb(Z);
  h += '<p class="caption" style="margin:0 0 .5rem">A slice of the cube has a closed formula for ' +
       'this; a polygon does not, so the graded pieces come from the orbit-harmonics ideal, one ' +
       'dilate at a time. ' +
       (fast ? 'The lattice points of this one are an order ideal &mdash; P is anti-blocking, up to a ' +
               'lattice symmetry &mdash; and then the Hilbert function is just the point count by ' +
               'coordinate sum, so it costs nothing at any size.'
             : 'This one is not anti-blocking, so each dilate needs a rank computation over a finite ' +
               'field. Two primes are run and the answer refused if they disagree.') + '</p>';

  if(fast || Z.length <= NOW_CAP){
    let row=null;
    try { row = fast || hilbertOf(Z); } catch(err){ row = null; }
    if(row){
      const sum = row.reduce((a,b)=>a+b, 0n), want = BigInt(S.count(T));
      h += '<div class="mono" style="line-height:1.8">Hilb(' + (T===1?"":T+"&thinsp;") + 'P; q) = ' +
           qpHTML(row) + '<br><span style="color:var(--muted)">&nbsp;&nbsp;at q = 1: ' + sum.toString() +
           (sum===want ? ' <span class="ok">= i(' + T + ')</span>'
                       : ' <span class="bad">&ne; i(' + T + ')</span>') + '</span></div>';
    }
  } else {
    h += '<div class="caption">' + Z.length.toLocaleString() + ' points at t = ' + T +
         ' &mdash; past the point where grading a single dilate is quick. Lower t, or draw a smaller polygon.</div>';
  }

  h += '<hr class="sep">';
  const G = S._gp, plan = planFor(S);
  if(!G && !plan.ok){
    h += '<div class="note plain" style="margin-bottom:0">This polygon is too big to grade here: ' +
         'even seven dilations would need ' + S.count(6).toLocaleString() + ' points at the top, and ' +
         'the rank computation grows like the cube of that. The numbers are still reachable offline ' +
         '&mdash; the same method with numpy behind it handles this size in seconds. Shrink the ' +
         'polygon, or move it into the standard position if it happens to be anti-blocking.</div>';
  } else if(!G){
    h += '<button id="eh-gp-run">find the closed rational form</button>' +
         '<span class="caption" style="margin-left:.6rem">starts at ' + (plan.K0+1) + ' dilations' +
         (plan.dc ? ' &mdash; instant here, the lattice points are an order ideal'
                  : ' and goes deeper only if it has to, up to ' + (plan.Kmax+1) + ' and ' +
                    plan.top.toLocaleString() + ' points; ' +
                    (plan.est<2000 ? 'a second or two at worst' :
                     'about ' + Math.round(plan.est/1000) + ' seconds at worst') +
                    ', one dilation at a time') + '.</span>';
  } else if(G.err){
    h += '<div class="note plain" style="margin-bottom:0">' + G.err + '</div>';
  } else if(G.fail){
    h += '<div class="note plain" style="margin-bottom:0">' + G.fail + '. That is a budget, not a ' +
         'verdict &mdash; a bigger search or more dilations may still find one.</div>';
  } else {
    const d2 = den2HTML(G.factors);
    h += '<div class="mono" style="line-height:1.7">E(q,z) = ' + rfrac('N(q,z)', d2) +
         '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--muted)">interior:</span>&nbsp; &#274;(q,z) = ' +
         rfrac('N&#772;(q,z)', d2) + '</div>';
    let t='<table class="wide"><tr><th>z<sup>k</sup></th><th>N(q,z)</th><th>N&#772;(q,z)</th></tr>';
    for(let k=0;k<Math.max(G.N.length,G.Nb.length);k++){
      const a=(k<G.N.length && !qz(G.N[k])) ? qpHTML(G.N[k]) : "";
      const b=(k<G.Nb.length && !qz(G.Nb[k])) ? qpHTML(G.Nb[k]) : "";
      if(a||b) t += '<tr><td>'+k+'</td><td>'+(a||"0")+'</td><td>'+(b||"0")+'</td></tr>';
    }
    h += '<div class="scroll">' + t + '</table></div>';
    h += '<div class="caption">Denominator <b>found by fitting</b>, not derived: it is the smallest ' +
         '(deg&thinsp;q, deg&thinsp;z) consistent with the first ' + G.Kfit + ' dilations, and it was ' +
         'then checked against ' + (G.Kver-G.Kfit) + ' further one' +
         ((G.Kver-G.Kfit)===1 ? '' : 's') + ' it had not seen. ' +
         (G.confirmed ? 'Every Hilbert function behind it was recomputed over a second prime and agreed.'
                      : '<span class="bad">The second prime disagreed &mdash; do not trust this.</span>') +
         '</div>';
    h += '<div class="note quiet" style="margin-bottom:0"><b>q-reciprocity.</b> ' +
         'q<sup>2</sup>&#274;(z,q) = &minus;E(1/z,1/q) ' +
         (G.recip ? '<span class="ok">holds exactly</span>, checked coefficient by coefficient on the numerators.'
                  : '<span class="bad">FAILS</span> &mdash; the series is rational but not reciprocal. ' +
                    'Worth reproducing in Macaulay2 before trusting it.') + '</div>';
  }
  box.innerHTML = h;
}
/* One dilation per tick.  The individual ranks are bounded by the plan, so the page
   keeps painting and can say how far along it is instead of locking up. */
$("eh-graded").addEventListener("click", e => {
  if(!e.target || e.target.id !== "eh-gp-run") return;
  const S = shape(), plan = planFor(S);
  const bar = document.createElement("div");
  bar.className = "caption"; bar.id = "eh-gp-prog"; bar.style.marginTop = ".4rem";
  e.target.disabled = true; e.target.textContent = "computing…";
  e.target.parentNode.insertBefore(bar, e.target.nextSibling);
  const E=[], Eb=[];
  let k=0, target=plan.K0;
  const say = t => { bar.innerHTML = t; };
  const finish = out => { S._gp = out; draw(); };
  const step = () => {
    try {
      if(k <= target){
        const Z = S.lattice(k);
        E.push(hilbertOf(Z));
        Eb.push(hilbertOf(Z.filter(pt => S.isInt(pt,k))));
        k++;
        say("dilation " + k + " of " + (target+1) + "…");
        setTimeout(step, 0);
        return;
      }
      say("fitting the denominator…");
      setTimeout(()=>{
        let out = null;
        for(let Kfit=4; Kfit<=target-1; Kfit++){
          const fit = fitPolyDen(E, Eb, Kfit, target, 40, 8);
          if(!fit) continue;
          const N=mulSeriesZ(fit.D,E,target).slice(0,fit.D.length);
          const Nb=mulSeriesZ(fit.D,Eb,target).slice(0,fit.D.length);
          out = { E, Eb, D:fit.D, factors:fit.factors, N, Nb, Kfit, Kver:target,
                  recip: recipPoly(N,Nb,2,fit.factors) };
          break;
        }
        if(!out){
          if(target < plan.Kmax){                 /* go deeper, keeping what we have */
            target = Math.min(plan.Kmax, target+2);
            say("no fit yet &mdash; going out to " + (target+1) + " dilations…");
            setTimeout(step, 0);
            return;
          }
          finish({ E, Eb, Kver:target,
                   fail:"no denominator with deg&thinsp;z &le; 8 is consistent with the first "+
                        (target-1)+" dilations, which is as far as this polygon's size allows here" });
          return;
        }
        say("confirming over a second prime…");
        setTimeout(()=>{
          try { out.confirmed = confirmSeries(S, target); }
          catch(err){ out.confirmed = false; }
          finish(out);
        }, 0);
      }, 0);
    } catch(err){ finish({ err: err.message }); }
  };
  setTimeout(step, 0);
});

function remark(S,E){
  if(S.kind==="poly")
    return 'Every lattice polygon has i(t) = At<sup>2</sup> + (b/2)t + 1 with A its area and b its ' +
      'boundary points, so h* = (1, A + b/2 &minus; 2, A &minus; b/2 + 1) and the last entry is the ' +
      'interior count &mdash; reciprocity and Pick’s theorem are the same statement. h* = (1, k, 1) ' +
      'means exactly one interior point, so hunting for a palindromic h* here is hunting for the ' +
      'sixteen reflexive polygons.';
  const cube = "[0,1]<sup>"+S.n+"</sup>";
  const here = S.q===1
    ? 'c is an integer, so this slice is a lattice polytope &mdash; the hypersimplex &Delta;(' +
      S.n + ',' + S.p + '). Move c off an integer and the vertices pick up a denominator, ' +
      't&thinsp;P starts missing the lattice, and i(t) becomes a quasi-polynomial.'
    : 'Its vertices have denominator ' + S.q + ', so t&thinsp;P meets the lattice only when ' + S.q +
      ' divides t, and i(t) is a quasi-polynomial of period ' + S.q + ' whose other constituents ' +
      'all vanish. Everything here is therefore the Ehrhart data of the lattice polytope ' + S.q +
      'P. At an integer c the slice is a hypersimplex instead.';
  return 'This is the slice of the cube ' + cube + ' at x<sub>1</sub>+&hellip;+x<sub>' + S.n +
    '</sub> = ' + frText([S.cNum,S.cDen]) + '. ' + here + ' Slicing at c and at ' + S.n +
    '&nbsp;&minus;&nbsp;c gives the same polytope reflected, so only c &le; ' +
    frText(fr(S.n,2)) + ' is offered. Grading these counts is what the paper is about.';
}

/* ============================== state and plumbing ============================== */
/* c runs only up to n/2: slicing at c and at n-c gives the same polytope reflected,
   so the other half would list every shape twice. */
const CS = {
  s3: [[1,3],[1,2],[2,3],[1,1],[4,3],[3,2]],
  s4: [[1,3],[1,2],[2,3],[1,1],[4,3],[3,2],[5,3],[2,1]]
};
const PRESETS = {
  triangle:[[0,0],[4,0],[1,4]],
  square:  [[1,1],[5,1],[5,5],[1,5]],
  hex:     [[2,0],[4,1],[5,3],[4,5],[2,6],[0,3]]
};
const state = { shape:"s4", ci:{s3:5, s4:7}, T:2, yaw:1.18, pitch:0.56,
                gens:PRESETS.hex.slice(), grid:6, cur:[0,0], kb:false, undo:[] };

let cache = { sig:null, S:null };
function signature(){
  if(state.shape==="poly")  return "poly|"+state.grid+"|"+state.gens.map(g=>g.join(".")).join(",");
  const c = CS[state.shape][state.ci[state.shape]];
  return state.shape+"|"+c[0]+"/"+c[1];
}
function shape(){
  const s = signature();
  if(cache.sig !== s){
    cache.sig = s;
    if(state.shape==="poly")       cache.S = polyShape(state.gens, state.grid);
    else { const c = CS[state.shape][state.ci[state.shape]];
           cache.S = sliceShape(+state.shape.slice(1), c[0], c[1]); }
  }
  return cache.S;
}
function draw(full){
  const S = shape();
  const out = (S.dim===3) ? render3d(S) : render2d(S);
  $("eh-stage").innerHTML =
    '<svg viewBox="0 0 '+W+' '+H+'" xmlns="'+NS+'" aria-hidden="true">'+out.svg+'</svg>';
  $("eh-stage").className = "stage panel " + (S.dim===3 ? "turn" : (S.kind==="poly" ? "draw" : ""));
  if(full !== false) readouts(S, out);
}
const push = () => { state.undo.push(state.gens.map(g=>g.slice())); if(state.undo.length>50) state.undo.shift();
                     $("eh-undo").disabled = false; };

/* ===================================== UI ===================================== */
const stage = $("eh-stage");
function syncChrome(){
  const S3 = state.shape==="s3", S4 = state.shape==="s4";
  const three = (state.shape==="s4");
  const poly  = state.shape==="poly";
  $("eh-clab").hidden = !(S3||S4);
  $("eh-spin").hidden = !three;
  $("eh-reset").hidden = !three;
  $("eh-drawbar").classList.toggle("hidden", !poly);
  $("eh-undo").disabled = !state.undo.length;
  if(S3||S4){
    const list = CS[state.shape], i = Math.min(state.ci[state.shape], list.length-1);
    state.ci[state.shape] = i;
    $("eh-c").max = list.length-1; $("eh-c").value = i;
    $("eh-cv").innerHTML = frText(list[i]);
  }
  if(!three && spinning) $("eh-spin").click();
}
const VIEW = () => (shape().view || [1.18, 0.56]);
$("eh-shape").addEventListener("change", e => {
  state.shape = e.target.value;
  const v = VIEW(); state.yaw = v[0]; state.pitch = v[1];
  syncChrome(); draw();
});
$("eh-c").addEventListener("input", e => { state.ci[state.shape]=+e.target.value; syncChrome(); draw(); });
$("eh-t").addEventListener("input", e => setT(+e.target.value));
function setT(t){
  state.T = Math.max(1, Math.min(TMAX, t));
  $("eh-t").value = state.T; $("eh-tv").textContent = state.T;
  draw();
}
$("eh-table").addEventListener("click", e => {          /* click a row to jump the picture */
  const tr = e.target.closest ? e.target.closest("tr") : null;
  if(tr && tr.classList.contains("pick")) setT(+tr.getAttribute("data-t"));
});
$("eh-reset").addEventListener("click", ()=>{ const v=VIEW(); state.yaw=v[0]; state.pitch=v[1]; draw(); });
$("eh-grid").addEventListener("input", e => {
  push();
  state.grid = +e.target.value;
  $("eh-gridv").textContent = state.grid;
  state.gens = state.gens.filter(g => g[0]<=state.grid && g[1]<=state.grid);
  state.cur = [Math.min(state.cur[0],state.grid), Math.min(state.cur[1],state.grid)];
  draw();
});
$("eh-clear").addEventListener("click", ()=>{ push(); state.gens=[]; draw(); });
$("eh-undo").addEventListener("click", ()=>{
  if(!state.undo.length) return;
  state.gens = state.undo.pop();
  $("eh-undo").disabled = !state.undo.length;
  draw();
});
Array.prototype.forEach.call(document.querySelectorAll("#eh-drawbar button[data-preset]"), b => {
  b.addEventListener("click", ()=>{ push();
    state.gens = PRESETS[b.getAttribute("data-preset")].slice().filter(g=>g[0]<=state.grid && g[1]<=state.grid);
    draw(); });
});

/* Spin is opt-in and never starts on its own; under prefers-reduced-motion the
   button says so rather than quietly doing nothing. */
let spinning=false, spinReq=0, last=0;
if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  $("eh-spin").title = "you have asked for reduced motion; this will still spin if you want it";
function tick(ts){
  if(!spinning) return;
  if(last) state.yaw += (ts-last)*0.00045;
  last = ts; draw(false);
  spinReq = requestAnimationFrame(tick);
}
$("eh-spin").addEventListener("click", function(){
  spinning = !spinning;
  this.classList.toggle("on", spinning);
  this.setAttribute("aria-pressed", spinning?"true":"false");
  this.textContent = spinning ? "stop" : "spin";
  last = 0;
  if(spinning) spinReq = requestAnimationFrame(tick); else cancelAnimationFrame(spinReq);
});

/* drag to turn in 3D; click to edit in polygon mode */
let dragging=false, moved=false, lx=0, ly=0;
stage.addEventListener("pointerdown", e => {
  moved=false;
  if(shape().dim!==3) return;
  dragging=true; lx=e.clientX; ly=e.clientY; stage.setPointerCapture(e.pointerId);
});
stage.addEventListener("pointermove", e => {
  if(!dragging) return;
  moved=true;
  state.yaw += (e.clientX-lx)*0.008;
  state.pitch = Math.max(-1.45, Math.min(1.45, state.pitch + (e.clientY-ly)*0.008));
  lx=e.clientX; ly=e.clientY;
  draw(false);
});
["pointerup","pointercancel"].forEach(t => stage.addEventListener(t, e => {
  if(dragging && moved) draw();
  dragging=false;
  if(stage.hasPointerCapture && stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
}));
function toggleAt(gx,gy){
  if(gx<0 || gy<0 || gx>state.grid || gy>state.grid) return;
  push();
  const i = state.gens.findIndex(g => g[0]===gx && g[1]===gy);
  if(i>=0) state.gens.splice(i,1); else state.gens.push([gx,gy]);
  draw();
}
stage.addEventListener("click", e => {
  if(state.shape!=="poly" || moved) return;
  const svg = stage.querySelector("svg"); if(!svg) return;
  const box = svg.getBoundingClientRect(), u = W/box.width, F = gridFit(state.grid);
  state.cur = [Math.round(((e.clientX-box.left)*u - F.ox)/F.S),
               Math.round((F.oy - (e.clientY-box.top)*u)/F.S)];
  toggleAt(state.cur[0], state.cur[1]);
});
stage.addEventListener("focus", ()=>{ state.kb=true;  if(state.shape==="poly") draw(false); });
stage.addEventListener("blur",  ()=>{ state.kb=false; if(state.shape==="poly") draw(false); });
stage.addEventListener("keydown", e => {
  const S=shape();
  if(S.dim===3){
    const st=0.12, m={ArrowLeft:[-st,0],ArrowRight:[st,0],ArrowUp:[0,-st],ArrowDown:[0,st]}[e.key];
    if(!m) return;
    e.preventDefault();
    state.yaw += m[0]; state.pitch = Math.max(-1.45, Math.min(1.45, state.pitch+m[1]));
    draw(false);
    return;
  }
  if(state.shape!=="poly") return;
  const m = {ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[e.key];
  if(m){
    e.preventDefault(); state.kb=true;
    state.cur = [Math.max(0,Math.min(state.grid,state.cur[0]+m[0])),
                 Math.max(0,Math.min(state.grid,state.cur[1]+m[1]))];
    draw(false);
  } else if(e.key==="Enter" || e.key===" "){
    e.preventDefault(); state.kb=true; toggleAt(state.cur[0], state.cur[1]);
  }
});

/* ============================== link and SVG export ============================== */
function say(t){ $("eh-msg").innerHTML = t; setTimeout(()=>{ $("eh-msg").textContent=""; }, 2600); }
function stateHash(){
  const p = ["sh="+state.shape, "t="+state.T];
  if(state.shape==="poly"){
    p.push("n="+state.grid);
    p.push("g="+state.gens.map(g=>g[0]+"."+g[1]).join("-"));
  } else p.push("c="+state.ci[state.shape]);
  return "#"+p.join("&");
}
function applyHash(){
  const h = (location.hash||"").replace(/^#/,"");
  if(!h) return false;
  const q={};
  h.split("&").forEach(kv=>{ const i=kv.indexOf("="); if(i>0) q[kv.slice(0,i)]=decodeURIComponent(kv.slice(i+1)); });
  if(!/^(s3|s4|poly)$/.test(q.sh||"")) return false;
  state.shape = q.sh;
  const t = Math.round(+q.t);
  if(Number.isFinite(t) && t>=1 && t<=TMAX) state.T = t;
  if(q.sh==="poly"){
    const n = Math.round(+q.n);
    if(Number.isFinite(n) && n>=3 && n<=10) state.grid = n;
    const g = (q.g||"").split("-").filter(Boolean).map(s=>s.split(".").map(Number));
    if(g.every(p => p.length===2 && p.every(v=>Number.isInteger(v) && v>=0 && v<=state.grid)))
      state.gens = g;
  } else {
    const c = Math.round(+q.c);
    if(Number.isFinite(c) && c>=0 && c<CS[q.sh].length) state.ci[q.sh] = c;
  }
  return true;
}
$("eh-link").addEventListener("click", ()=>{
  const url = location.origin + location.pathname + stateHash();
  if(location.hash !== stateHash()) history.replaceState(null,"",stateHash());
  if(navigator.clipboard && navigator.clipboard.writeText)
    navigator.clipboard.writeText(url).then(()=>say("link copied"), ()=>say(url));
  else say(url);
});
window.addEventListener("hashchange", ()=>{ if(applyHash()){ syncUI(); draw(); } });

/* An exported figure has to carry real colours: an unregistered custom property
   computes to its token stream, so reading --int gives back the color-mix() text
   rather than a colour.  Setting it on a probe and reading the computed `color`
   is what resolves it. */
function resolvedVars(names){
  const probe = document.createElement("span");
  probe.setAttribute("style","display:none");
  $("eh-app").appendChild(probe);
  const out={};
  names.forEach(n=>{ probe.style.color = "var("+n+")"; out[n]=getComputedStyle(probe).color; });
  probe.parentNode.removeChild(probe);
  return out;
}
$("eh-svg").addEventListener("click", ()=>{
  const src = stage.querySelector("svg");
  if(!src) return;
  const names = ["--accent","--int","--edge","--facefill","--ghost","--surface","--muted","--bg"];
  const c = resolvedVars(names);
  let s = src.outerHTML;
  names.forEach(n => { s = s.split("var("+n+")").join(c[n]); });
  s = s.replace('<svg ', '<svg width="'+W+'" height="'+H+'" ')
       .replace('>', '><rect width="100%" height="100%" fill="'+c["--bg"]+'"/>');
  s = '<?xml version="1.0" encoding="UTF-8"?>\n' + s;
  const name = (state.shape==="poly" ? "polygon"
              : "slice-"+state.shape.slice(1)+"-c"+frText(CS[state.shape][state.ci[state.shape]]).replace("/","-"))
              + "-t" + state.T + ".svg";
  const url = URL.createObjectURL(new Blob([s], {type:"image/svg+xml"}));
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 4000);
  say("saved " + name);
});

/* ==================================== boot ==================================== */
function syncUI(){
  $("eh-shape").value = state.shape;
  $("eh-t").value = state.T; $("eh-tv").textContent = state.T;
  $("eh-grid").value = state.grid; $("eh-gridv").textContent = state.grid;
  syncChrome();
}
applyHash();
syncUI();
{ const v = VIEW(); state.yaw = v[0]; state.pitch = v[1]; }
draw();
})();
</script>
</div>

{% endraw %}
