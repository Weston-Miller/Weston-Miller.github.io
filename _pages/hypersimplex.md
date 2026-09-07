---
layout: default
title: The hypersimplex — interactive companion
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
  /* Interior points are the reciprocity story, so they get their own colour rather
     than the site accent; boundary points stay accent-coloured. */
  --int:color-mix(in srgb, #9400d3 70%, var(--ink));
  --intbg:color-mix(in srgb, #9400d3 20%, var(--bg));
  --edge:color-mix(in srgb, var(--ink) 55%, var(--bg));
  --facefill:color-mix(in srgb, var(--ink) 7%, var(--bg));
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
#hs-app button.primary{background:var(--accent); border-color:var(--accent); color:#fff; font-weight:600;}
#hs-app button.primary:hover{color:#fff; opacity:.88;}
#hs-app button.on{border-color:var(--accent); color:var(--accent); background:var(--accentbg);}
#hs-app label{font-size:.85rem; color:var(--muted);}
#hs-app select{font:inherit; font-size:.85rem; padding:4px 6px; border:1px solid var(--line);
  border-radius:var(--radius); background:var(--bg); color:var(--ink);}
#hs-app input[type=range]{vertical-align:middle;}
#hs-app .toolbar{display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px;}
/* A flex item defaults to min-width:auto, which is what pushed /cayley/ past a
   375px viewport; the same guard here. */
#hs-app .toolbar > *{min-width:0;}
#hs-app .panel{border:1px solid var(--line); border-radius:var(--radius); padding:.9rem 1rem;
  background:var(--surface);}
#hs-app .row{display:flex; gap:1rem; align-items:flex-start; flex-wrap:wrap;}
#hs-app .col{flex:1 1 320px; min-width:0;}
#hs-app .col.side{flex:0 1 330px;}
#hs-app .stage{touch-action:none; cursor:grab; user-select:none;}
#hs-app .stage:active{cursor:grabbing;}
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
#hs-app table.tab tr.cur td{background:var(--accentbg); font-weight:700;}
#hs-app .note{font-size:.83rem; border-left:3px solid var(--accent); background:var(--accentbg);
  padding:.5rem .7rem; margin:.6rem 0; border-radius:0 var(--radius) var(--radius) 0;}
#hs-app .note.quiet{border-left-color:var(--int); background:var(--intbg);}
#hs-app hr.sep{border:0; border-top:1px solid var(--line); margin:.85rem 0;}
#hs-app sub, #hs-app sup{font-size:.72em;}
#hs-app .frac{display:inline-block; vertical-align:-.55em; text-align:center; font-size:.85em;}
#hs-app .frac .num{display:block; border-bottom:1px solid currentColor; padding:0 .18em;}
@media print{ #hs-app .toolbar{display:none !important;} #hs-app .panel{border:none; padding:0;} }
</style>

<div class="wrap">
  <h1>The hypersimplex, dilated</h1>
  <p class="lede">
    The hypersimplex &Delta;<sub>4,k</sub> = {x &isin; [0,1]<sup>4</sup> : x<sub>1</sub>+&hellip;+x<sub>4</sub> = k}
    is three-dimensional, so it is the one member of the family you can hold. Drag to turn it. Move the
    dilation slider and count the lattice points: after four values the counting function is a cubic, and
    its leading coefficient is an Eulerian number.
  </p>

<div class="toolbar">
  <label>k =
    <select id="hs-k">
      <option value="1">1 &mdash; tetrahedron</option>
      <option value="2" selected>2 &mdash; octahedron</option>
      <option value="3">3 &mdash; tetrahedron</option>
    </select></label>
  <label>dilation t = <input type="range" id="hs-t" min="1" max="6" value="3" style="width:130px"><b id="hs-tv" class="mono">3</b></label>
  <span style="flex:1"></span>
  <button id="hs-pts" class="on" aria-pressed="true">lattice points</button>
  <button id="hs-spin" aria-pressed="false">spin</button>
  <button id="hs-reset">reset view</button>
</div>

<div class="row">
  <div class="col">
    <div class="stage panel" id="hs-stage" tabindex="0" role="img"
         aria-label="A three-dimensional hypersimplex with its lattice points; drag or use the arrow keys to rotate."></div>
    <p class="caption">
      <span class="swatch" style="background:var(--accent)"></span>boundary points &middot;
      <span class="swatch" style="background:var(--int)"></span>interior points &middot;
      the solid is drawn at a fixed size, so dilating <i>t</i>&thinsp;&Delta;<sub>4,k</sub> shows up as a
      finer lattice rather than a bigger polytope. Drag to rotate, or focus it and use the arrow keys.
    </p>
  </div>

  <div class="col side">
    <div class="panel">
      <div class="head">Lattice points of t&thinsp;&Delta;<sub>4,k</sub></div>
      <div class="big" id="hs-count">&mdash;</div>
      <div class="caption" id="hs-split" style="margin-top:.15rem"></div>
      <hr class="sep">
      <div class="head">Counting function</div>
      <table class="tab" id="hs-table"></table>
      <div class="mono" id="hs-ehr" style="margin-top:.6rem; line-height:1.9"></div>
      <hr class="sep">
      <div class="head">h*-polynomial</div>
      <div class="mono" id="hs-hstar" style="line-height:1.9"></div>
      <div class="caption" id="hs-vol"></div>
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
const N  = 4;                 /* ambient dimension: the one that draws in 3D */
const TMAX = 8;              /* rows in the table */
const TSLIDER = 6;           /* past this the lattice stops being legible on screen */

/* ============================ exact small rationals ============================
   Only ever degree <= 3 Ehrhart coefficients, so machine integers are plenty.   */
function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ const r=a%b; a=b; b=r; } return a||1; }
function fr(n,d){ if(d<0){ n=-n; d=-d; } const g=gcd(n,d); return [n/g,d/g]; }
const frAdd = (a,b) => fr(a[0]*b[1]+b[0]*a[1], a[1]*b[1]);
const frMul = (a,b) => fr(a[0]*b[0], a[1]*b[1]);
function frHTML(f){
  if(f[1]===1) return String(f[0]);
  const s = f[0]<0 ? "&minus;" : "";
  return s+'<span class="frac"><span class="num">'+Math.abs(f[0])+'</span>'+f[1]+'</span>';
}
/* c = [c0,c1,c2,c3] rationals, printed in t descending, with signs joined by the caller */
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

/* ================================ combinatorics ================================ */
function vertices(k){
  const out=[];
  for(let m=0;m<(1<<N);m++){
    const x=[]; let s=0;
    for(let i=0;i<N;i++){ const b=(m>>i)&1; x.push(b); s+=b; }
    if(s===k) out.push(x);
  }
  return out;                                   /* C(4,k) of them */
}
function lattice(k,t){                          /* Z^4 cap t.Delta_{4,k} */
  const out=[], S=k*t;
  for(let a=0;a<=t;a++) for(let b=0;b<=t;b++) for(let c=0;c<=t;c++){
    const d=S-a-b-c; if(d>=0 && d<=t) out.push([a,b,c,d]);
  }
  return out;
}
const onBoundary = (x,t) => x.some(v => v===0 || v===t);
const countPts   = (k,t) => lattice(k,t).length;
const countInt   = (k,t) => lattice(k,t).filter(x=>!onBoundary(x,t)).length;

/* Ehrhart data for a given k, all of it exact.
   i(t) is a cubic, so four values determine it; the finite differences of i at 0
   are its coefficients in the binomial basis and are integers.                  */
const BINOM_POWER = [                            /* C(t,j) in the power basis */
  [fr(1,1), fr(0,1), fr(0,1), fr(0,1)],
  [fr(0,1), fr(1,1), fr(0,1), fr(0,1)],
  [fr(0,1), fr(-1,2), fr(1,2), fr(0,1)],
  [fr(0,1), fr(1,3), fr(-1,2), fr(1,6)]
];
function ehrhart(k){
  const vals=[0,1,2,3].map(t=>countPts(k,t));
  const bin=[]; let row=vals.slice();
  for(let j=0;j<4;j++){ bin.push(row[0]); row = row.slice(1).map((x,i)=>x-row[i]); }
  const pow=[fr(0,1),fr(0,1),fr(0,1),fr(0,1)];
  bin.forEach((cj,j)=>{ for(let p=0;p<4;p++) pow[p]=frAdd(pow[p], frMul(fr(cj,1), BINOM_POWER[j][p])); });
  /* h* from  sum_t i(t) z^t = h*(z)/(1-z)^4 */
  const C4=[1,4,6,4,1], hs=[];
  for(let j=0;j<4;j++){
    let s=0; for(let i=0;i<=j;i++) s += (i%2?-1:1)*C4[i]*countPts(k,j-i);
    hs.push(s);
  }
  while(hs.length>1 && hs[hs.length-1]===0) hs.pop();
  const normVol = hs.reduce((a,b)=>a+b,0);
  return { bin, pow, hs, normVol, vals };
}
function evalPow(pow, t){                        /* rational value of i(t) */
  let acc=fr(0,1), p=1;
  for(let j=0;j<pow.length;j++){ acc=frAdd(acc, frMul(pow[j], fr(p,1))); p*=t; }
  return acc;
}

/* ================================== geometry ==================================
   Delta_{4,k} lives in the affine hyperplane sum(x)=k, so it is 3-dimensional.
   These three vectors are an orthonormal basis of {sum = 0}; the picture is an
   isometry, not a shadow -- Delta_{4,2} comes out as a genuinely regular
   octahedron of circumradius 1.                                                */
const BASIS = [[1,-1,0,0],[1,1,-2,0],[1,1,1,-3]].map(v=>{
  const n=Math.hypot.apply(null,v); return v.map(c=>c/n);
});
const embed = y => BASIS.map(b => b[0]*y[0]+b[1]*y[1]+b[2]*y[2]+b[3]*y[3]);
/* x is a lattice point of t.Delta; dividing by t puts every dilation on one screen size */
const place = (x,t,k) => embed(x.map(v => v/t - k/N));

function facets(k, V){
  /* the facets of Delta_{n,k} are its slices x_i = 0 and x_i = 1; for n = 4 every
     one of them that is not a single vertex is a triangle */
  const out=[];
  for(let i=0;i<N;i++) for(let s=0;s<=1;s++){
    const f=[]; V.forEach((v,idx)=>{ if(v[i]===s) f.push(idx); });
    if(f.length>=3) out.push(f);
  }
  return out;
}
function edges(V){
  /* two 0/1 vectors of the same weight span an edge iff they differ in exactly two
     coordinates */
  const out=[];
  for(let a=0;a<V.length;a++) for(let b=a+1;b<V.length;b++){
    let d=0; for(let i=0;i<N;i++) if(V[a][i]!==V[b][i]) d++;
    if(d===2) out.push([a,b]);
  }
  return out;
}
const sub = (p,q) => [p[0]-q[0],p[1]-q[1],p[2]-q[2]];
const cross = (u,v) => [u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]];
const dot = (u,v) => u[0]*v[0]+u[1]*v[1]+u[2]*v[2];

function rotate(p, yaw, pitch){
  const cy=Math.cos(yaw), sy=Math.sin(yaw), cp=Math.cos(pitch), sp=Math.sin(pitch);
  const x1 =  p[0]*cy + p[2]*sy;
  const z1 = -p[0]*sy + p[2]*cy;
  return [x1, p[1]*cp - z1*sp, p[1]*sp + z1*cp];
}

/* ================================== rendering ================================== */
const W=430, H=400;
/* The default view is deliberately off every symmetry axis: down a 2-fold axis the
   octahedron projects to a bare parallelogram and stops looking like a solid. */
let K=2, T=3, yaw=1.18, pitch=0.56, showPts=true, spinning=false, spinReq=0;

function render(){
  const V4 = vertices(K);
  const V  = V4.map(v => place(v,1,K));
  const R  = Math.max.apply(null, V.map(p => Math.hypot(p[0],p[1],p[2])));
  const S  = 178/R, cx=W/2, cy=H/2;
  const rv = V.map(p => rotate(p,yaw,pitch));
  const sx = p => (cx + S*p[0]).toFixed(1) + "," + (cy - S*p[1]).toFixed(1);

  const FS = facets(K,V4), ES = edges(V4);
  const front = FS.map(f => {
    const a=rv[f[0]], b=rv[f[1]], c=rv[f[2]];
    let n = cross(sub(b,a), sub(c,a));
    const fc = [(a[0]+b[0]+c[0])/3,(a[1]+b[1]+c[1])/3,(a[2]+b[2]+c[2])/3];
    if(dot(n,fc) < 0) n = [-n[0],-n[1],-n[2]];    /* centroid of the polytope is the origin */
    return n[2] > 0;
  });

  const back=[], solid=[], dashed=[];
  FS.forEach((f,i)=>{
    if(front[i]) return;
    /* shade the far shell by how squarely each facet turns away, so the solid reads
       as a solid rather than as one flat silhouette */
    const a=rv[f[0]], b=rv[f[1]], c=rv[f[2]];
    let n = cross(sub(b,a), sub(c,a));
    const L = Math.hypot(n[0],n[1],n[2]) || 1;
    const o = (0.45 + 0.55*Math.abs(n[2])/L).toFixed(2);
    back.push('<polygon points="'+f.map(j=>sx(rv[j])).join(" ")+'" opacity="'+o+'"/>');
  });
  ES.forEach(e=>{
    const vis = FS.some((f,i)=> front[i] && f.indexOf(e[0])>=0 && f.indexOf(e[1])>=0);
    (vis?solid:dashed).push('<line x1="'+sx(rv[e[0]]).split(",")[0]+'" y1="'+sx(rv[e[0]]).split(",")[1]+
      '" x2="'+sx(rv[e[1]]).split(",")[0]+'" y2="'+sx(rv[e[1]]).split(",")[1]+'"/>');
  });

  let dots="", nB=0, nI=0;
  const P = lattice(K,T);
  const drawn = P.map(x => {
    const inte = !onBoundary(x,T);
    if(inte) nI++; else nB++;
    return { p: rotate(place(x,T,K), yaw, pitch), inte: inte };
  }).sort((a,b)=> a.p[2]-b.p[2]);
  if(showPts){
    const base = Math.max(1.5, 3.8 - 0.36*T);
    dots = drawn.map(d => {
      const z = d.p[2]/R;
      const r = (base*(1+0.16*z)).toFixed(2);
      const o = (0.3+0.7*(z+1)/2).toFixed(2);
      return '<circle cx="'+(cx+S*d.p[0]).toFixed(1)+'" cy="'+(cy-S*d.p[1]).toFixed(1)+'" r="'+r+
             '" fill="'+(d.inte?"var(--int)":"var(--accent)")+'" opacity="'+o+'"/>';
    }).join("");
  }

  $("hs-stage").innerHTML =
    '<svg viewBox="0 0 '+W+' '+H+'" xmlns="'+NS+'" aria-hidden="true">'+
      '<g fill="var(--facefill)" stroke="none">'+back.join("")+'</g>'+
      '<g fill="none" stroke="var(--edge)" stroke-width="1.1" opacity=".3" stroke-dasharray="4 4">'+dashed.join("")+'</g>'+
      dots+
      '<g fill="none" stroke="var(--edge)" stroke-width="1.7" stroke-linecap="round">'+solid.join("")+'</g>'+
    '</svg>';
  return { nB: nB, nI: nI, total: nB+nI };
}

/* =================================== readouts =================================== */
function readouts(counts){
  const E = ehrhart(K);
  $("hs-count").innerHTML = counts.total.toLocaleString();
  $("hs-split").innerHTML =
    '<span class="swatch" style="background:var(--accent)"></span>'+counts.nB.toLocaleString()+' on the boundary &middot; '+
    '<span class="swatch" style="background:var(--int)"></span>'+counts.nI.toLocaleString()+' interior';

  let rows='<tr><th>t</th><th>points</th><th>interior</th></tr>';
  for(let t=0;t<=TMAX;t++){
    rows += '<tr'+(t===T?' class="cur"':'')+'><td>'+t+'</td><td>'+countPts(K,t).toLocaleString()+
            '</td><td>'+countInt(K,t).toLocaleString()+'</td></tr>';
  }
  $("hs-table").innerHTML = rows;

  const binTerms = E.bin.map((c,j)=> c===0 ? null :
      (j===0 ? String(c) : (c===1?"":c)+'C(t,'+j+')')
    ).filter(Boolean);
  $("hs-ehr").innerHTML =
    'i(t) = ' + polyHTML(E.pow, "t") + '<br>' +
    '<span style="color:var(--muted)">&nbsp;&nbsp;&nbsp;&nbsp;= ' + binTerms.join(" + ") + '</span>';

  $("hs-hstar").innerHTML = 'h*(z) = ' + polyHTML(E.hs.map(h=>fr(h,1)), "z", true) +
    '<span style="color:var(--muted)">&nbsp;&nbsp;h* = (' + E.hs.join(", ") + ')</span>';
  $("hs-vol").innerHTML =
    'h*(1) = ' + E.normVol + ' is the normalized volume, so vol&thinsp;&Delta;<sub>4,'+K+'</sub> = ' +
    frHTML(fr(E.normVol,6)) + ', and ' + E.normVol + ' = A(3,'+(K-1)+'), the number of permutations of ' +
    '{1,2,3} with ' + (K-1) + ' descent' + (K===2?"":"s") + '.';

  const rec = evalPow(E.pow, -T);
  const recVal = -rec[0]/rec[1];                   /* (-1)^3 i(-t) */
  $("hs-recip").innerHTML =
    '<b>Reciprocity.</b> (&minus;1)<sup>3</sup>&thinsp;i(&minus;' + T + ') = ' + Math.round(recVal) +
    ', which is exactly the ' + counts.nI.toLocaleString() + ' interior point' +
    (counts.nI===1?"":"s") + ' drawn in purple' + (Math.round(recVal)===counts.nI ? '' : ' &mdash; mismatch!') + '.';

  const names = {1:"the standard simplex", 2:"a regular octahedron", 3:"the standard simplex again, reflected"};
  $("hs-remark").innerHTML =
    '&Delta;<sub>4,'+K+'</sub> is ' + names[K] + '. Every other hypersimplex is at least four-dimensional, ' +
    'so this is where the family stops being drawable &mdash; but not where the pattern stops: the normalized ' +
    'volumes of &Delta;<sub>4,1</sub>, &Delta;<sub>4,2</sub>, &Delta;<sub>4,3</sub> are 1, 4, 1, the Eulerian ' +
    'numbers for S<sub>3</sub>, and in general vol&thinsp;&Delta;<sub>n,k</sub> = A(n&minus;1,&thinsp;k&minus;1)/(n&minus;1)!. ' +
    'Grading the count in the middle column is what the paper is about.';
}

function draw(){ readouts(render()); }

/* ===================================== UI ===================================== */
const stage = $("hs-stage");

$("hs-k").addEventListener("change", e => { K = +e.target.value; draw(); });
$("hs-t").addEventListener("input", e => { T = +e.target.value; $("hs-tv").textContent = T; draw(); });
$("hs-pts").addEventListener("click", function(){
  showPts = !showPts;
  this.classList.toggle("on", showPts);
  this.setAttribute("aria-pressed", showPts ? "true" : "false");
  draw();
});
$("hs-reset").addEventListener("click", ()=>{ yaw=1.18; pitch=0.56; draw(); });

/* Spin is opt-in and never starts on its own; under prefers-reduced-motion the
   button says so rather than quietly doing nothing. */
const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduced) $("hs-spin").title = "you have asked for reduced motion; this will still spin if you want it";
let last=0;
function tick(ts){
  if(!spinning) return;
  if(last) yaw += (ts-last)*0.00045;
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

/* drag to turn */
let dragging=false, px=0, py=0;
stage.addEventListener("pointerdown", e => {
  dragging=true; px=e.clientX; py=e.clientY;
  stage.setPointerCapture(e.pointerId);
});
stage.addEventListener("pointermove", e => {
  if(!dragging) return;
  yaw   += (e.clientX-px)*0.008;
  pitch += (e.clientY-py)*0.008;
  pitch = Math.max(-1.45, Math.min(1.45, pitch));
  px=e.clientX; py=e.clientY;
  draw();
});
["pointerup","pointercancel"].forEach(t => stage.addEventListener(t, e => {
  dragging=false;
  if(stage.hasPointerCapture && stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
}));
stage.addEventListener("keydown", e => {
  const step=0.12, m={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]}[e.key];
  if(!m) return;
  e.preventDefault();
  yaw += m[0]; pitch = Math.max(-1.45, Math.min(1.45, pitch+m[1]));
  draw();
});

draw();
})();
</script>
</div>

{% endraw %}
