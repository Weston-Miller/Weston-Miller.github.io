---
layout: page
permalink: /demos/
title: demos
description: Interactive companions to my papers. Each one runs the paper's construction on an example you choose.
nav: true
nav_order: 3
---

<div class="demo-entry">
  <div class="demo-mini" data-kind="cycle" data-a="3" data-b="5"
       data-href="{{ '/rational-catalan/' | relative_url }}"
       data-label="A lattice path rotated until it stays above the diagonal"
       data-caption="Of the 8 rotations of this path, exactly one stays above the diagonal."></div>
  <div class="demo-entry-body">
    <h2><a href="{{ '/rational-catalan/' | relative_url }}">Rational Catalan numbers</a></h2>
    <p>Companion to <em>Rational Catalan numbers for complex reflection groups</em> (<a href="https://doi.org/10.1016/j.jalgebra.2025.01.027">J. Algebra, 2025</a>).
      Choose a complex reflection group and parameter. The app computes the canonical symmetrizing trace on the Hecke algebra at a power of a Coxeter element and computes the corresponding rational Catalan number. There are also examples in type <em>A</em> showing how this counts rational Dyck paths.</p>
  </div>
</div>

<div class="demo-entry">
  <div class="demo-mini" data-kind="tree" data-n="6"
       data-href="{{ '/cayley/' | relative_url }}"
       data-label="A random labelled tree on six vertices"
       data-caption="One of the 1,296 labelled trees on 6 vertices, in its cyclic embedding."></div>
  <div class="demo-entry-body">
    <h2><a href="{{ '/cayley/' | relative_url }}">Cayley's formula</a></h2>
    <p>Companion to <em>An elaborate new proof of Cayley's formula</em> (<a href="https://doi.org/10.5802/alco.429">Algebraic Combinatorics, 2025</a>).
      Pick a vertex-labelled tree on <em>n</em> vertices and see it three ways at once: as a cyclic embedding, as the
      cyclic factorization read off by walking clockwise from vertex <em>n</em>, and as the corresponding maximal
      distinguished subword.</p>
  </div>
</div>

<div class="demo-entry">
  <div class="demo-mini" data-kind="graph"
       data-href="{{ '/graph-demos/' | relative_url }}"
       data-label="A loopless multigraph with one of its 2-factors highlighted"
       data-caption="A loopless multigraph, with one of its 2-factors picked out."></div>
  <div class="demo-entry-body">
    <h2><a href="{{ '/graph-demos/' | relative_url }}">Hypersimplex harmonics</a></h2>
    <p>Companion to <em>Graded Ehrhart theory for hypersimplices</em> (<a href="https://arxiv.org/abs/2608.27438">arXiv, 2026</a>).
      Draw a loopless multigraph. The app writes it as a polynomial of matchings in the harmonic algebra or as a linear combination of maximal tableaux.
      The app can also compute the rational form of the <em>q</em>-Ehrhart series for any slice of the cube.</p>
  </div>
</div>

<script src="{{ '/assets/js/demo-minis.js' | relative_url }}"></script>
