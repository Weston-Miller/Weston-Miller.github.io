---
layout: page
permalink: /research/
title: research
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

## selected work

**[Graded Ehrhart theory for hypersimplices](https://arxiv.org/abs/2608.27438)** (with N. Libman).
Ehrhart theory counts lattice points in dilates of a polytope. Reiner and Rhoades conjectured a graded
refinement, where that count is upgraded to a *q*-series coming from orbit harmonics. We prove rationality of this refinement for
hypersimplices by writing down generators for the harmonics ideal, which as
a bonus hands you the Hilbert series and the graded Frobenius characteristic. The combinatorial heart of it
turns out to be a statement about 2-factors of regular multigraphs, and you can
[draw one]({{ '/graph-demos/' | relative_url }}) to see the constructions run.

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

## all papers

<div class="publications">

{% bibliography %}

</div>
