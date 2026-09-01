---
layout: page
permalink: /research/
title: research
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

## selected work

**[An elaborate new proof of Cayley's formula](https://doi.org/10.5802/alco.429)** (with E. Banaian,
A. T. N. Hoang, E. Kelley, J. Stack, C. Stephen, and N. Williams).
Cayley's formula says there are *n*<sup>*n*&minus;2</sup> labelled trees on *n* vertices, and it has a dozen
proofs that fit on a postcard. Ours goes through Deodhar components of a braid variety built from an affine
Kac&ndash;Moody group of type *A*<sub>*n*&minus;1</sub>, Opdam's trace formula in the affine Hecke algebra, and
an identity of Haglund. The bijection is completely explicit, though,
so you can [watch it run]({{ '/cayley/' | relative_url }}) on a tree you pick yourself.

**[Rational Catalan numbers for complex reflection groups](https://doi.org/10.1016/j.jalgebra.2025.01.027)**.
Galashin, Lam, Trinh, and Williams proved the enumeration of noncrossing Catalan objects for finite Coxeter
groups uniformly, by evaluating the canonical symmetrizing trace on the Hecke algebra at a power of a Coxeter
element. This paper runs the same machine on the spetsial complex reflection groups &mdash; the ones that behave
as though they were Weyl groups of a group that does not exist &mdash; and rational Catalan numbers come back
out the other end. There is [a demo]({{ '/rational-catalan/' | relative_url }}) that computes this trace explicitly.

**[Graded Ehrhart theory for hypersimplices](https://arxiv.org/abs/2608.27438)** (with N. Libman).
Ehrhart theory counts lattice points in dilates of a polytope. Reiner and Rhoades conjectured a graded
refinement, where that count is upgraded to a *q*-series coming from orbit harmonics. We prove rationality of this refinement for
hypersimplices by writing down generators for the harmonics ideal, which as
a bonus hands you the Hilbert series and the graded Frobenius characteristic. The combinatorial heart of it
turns out to be a statement about 2-factors of regular multigraphs, and you can
[draw one]({{ '/graph-demos/' | relative_url }}) to see the constructions run.

## all papers

<div class="publications">

{% bibliography %}

</div>

## coauthors

<figure class="coauthor-graph">
<svg viewBox="0 0 620 340" role="img" aria-label="Coauthor graph: the seven authors of the Cayley paper form a complete graph, with Nathaniel Libman attached to Miller">
  <g stroke="currentColor" stroke-width="1.6" opacity="0.4">
    <line x1="250.0" y1="170.0" x2="352.2" y2="229.0"/>
    <line x1="250.0" y1="170.0" x2="250.0" y2="288.0"/>
    <line x1="250.0" y1="170.0" x2="147.8" y2="229.0"/>
    <line x1="250.0" y1="170.0" x2="147.8" y2="111.0"/>
    <line x1="250.0" y1="170.0" x2="250.0" y2="52.0"/>
    <line x1="250.0" y1="170.0" x2="352.2" y2="111.0"/>
    <line x1="352.2" y1="229.0" x2="250.0" y2="288.0"/>
    <line x1="352.2" y1="229.0" x2="147.8" y2="229.0"/>
    <line x1="352.2" y1="229.0" x2="147.8" y2="111.0"/>
    <line x1="352.2" y1="229.0" x2="250.0" y2="52.0"/>
    <line x1="352.2" y1="229.0" x2="352.2" y2="111.0"/>
    <line x1="250.0" y1="288.0" x2="147.8" y2="229.0"/>
    <line x1="250.0" y1="288.0" x2="147.8" y2="111.0"/>
    <line x1="250.0" y1="288.0" x2="250.0" y2="52.0"/>
    <line x1="250.0" y1="288.0" x2="352.2" y2="111.0"/>
    <line x1="147.8" y1="229.0" x2="147.8" y2="111.0"/>
    <line x1="147.8" y1="229.0" x2="250.0" y2="52.0"/>
    <line x1="147.8" y1="229.0" x2="352.2" y2="111.0"/>
    <line x1="147.8" y1="111.0" x2="250.0" y2="52.0"/>
    <line x1="147.8" y1="111.0" x2="352.2" y2="111.0"/>
    <line x1="250.0" y1="52.0" x2="352.2" y2="111.0"/>
    <line x1="250.0" y1="170.0" x2="468.0" y2="170.0"/>
  </g>
  <g fill="currentColor">
    <circle cx="250.0" cy="170.0" r="8"/>
    <circle cx="352.2" cy="229.0" r="6"/>
    <circle cx="250.0" cy="288.0" r="6"/>
    <circle cx="147.8" cy="229.0" r="6"/>
    <circle cx="147.8" cy="111.0" r="6"/>
    <circle cx="250.0" cy="52.0" r="6"/>
    <circle cx="352.2" cy="111.0" r="6"/>
    <circle cx="468.0" cy="170.0" r="6"/>
  </g>
  <g fill="var(--global-text-color)" font-size="14">
    <text x="250.0" y="194.0" text-anchor="middle" font-weight="600">Miller</text>
    <text x="365.2" y="234.0" text-anchor="start">Banaian</text>
    <text x="250.0" y="310.0" text-anchor="middle">Hoang</text>
    <text x="134.8" y="234.0" text-anchor="end">Kelley</text>
    <text x="134.8" y="116.0" text-anchor="end">Stack</text>
    <text x="250.0" y="38.0" text-anchor="middle">Stephen</text>
    <text x="365.2" y="116.0" text-anchor="start">Williams</text>
    <text x="480.0" y="174.0" text-anchor="start">Libman</text>
  </g>
</svg>
  <figcaption>Everyone I have written a paper with. The clique is the seven authors of
  the Cayley paper; Nathaniel Libman and I wrote the hypersimplices paper. Rational
  Catalan numbers is the one I wrote alone, which is why it contributes no edges.</figcaption>
</figure>
