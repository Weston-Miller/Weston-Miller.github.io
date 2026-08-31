---
layout: about
title: about
permalink: /
subtitle:

profile:
  align: right
  image: profile2.jpg
  image_circular: false # crops the image to make it circular
  more_info: > 
    <p>Email: w3miller@ucsd.edu</p>
    <p>Office: HSS 4084</p>

news: false # includes a list of news items
selected_papers: true  # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---

I am a third year PhD student in mathematics at the University of California, San Diego.

My advisor is [Brendon Rhoades](https://mathweb.ucsd.edu/~bprhoades/).

My research interests are in algebraic combinatorics. Most of my work has been in graded Ehrhart theory and representation-theoretic aspects of Coxeter–Catalan theory.

When I'm not doing math, I enjoy [reading](https://www.goodreads.com/user/show/109451240-weston), cooking, playing [chess](https://www.chess.com/member/atropos7), and playing piano.

<h2><a href="{{ '/demos/' | relative_url }}" style="color: inherit">demos</a></h2>

Each of my papers has an interactive companion that runs its construction on an example you choose.

<div class="demo-strip">
  <a class="demo-card" href="{{ '/rational-catalan/' | relative_url }}">
    <svg viewBox="0 0 100 60" aria-hidden="true">
      <path d="M5 55 L95 5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity="0.45"/>
      <path d="M5 55 V30 H27.5 V17.5 H50 V12 H72.5 V5 H95" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>
    <span class="demo-title">Rational Catalan numbers</span>
    <span class="demo-note">Coompute traces and Catalan numbers for any complex reflection group.</span>
  </a>

  <a class="demo-card" href="{{ '/cayley/' | relative_url }}">
    <svg viewBox="0 0 100 60" aria-hidden="true">
      <g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M50 8 L22 28 M50 8 L78 28 M22 28 L12 52 M22 28 L36 52 M78 28 L88 52"/>
      </g>
      <g fill="currentColor">
        <circle cx="50" cy="8" r="4"/><circle cx="22" cy="28" r="4"/><circle cx="78" cy="28" r="4"/>
        <circle cx="12" cy="52" r="4"/><circle cx="36" cy="52" r="4"/><circle cx="88" cy="52" r="4"/>
      </g>
    </svg>
    <span class="demo-title">Cayley's formula</span>
    <span class="demo-note">Choose a labelled tree and see its corresponding cyclic embedding, cyclic factorization, and distinguished subword.</span>
  </a>

  <a class="demo-card" href="{{ '/graph-demos/' | relative_url }}">
    <svg viewBox="0 0 100 60" aria-hidden="true">
      <g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M20 15 L80 15 M20 15 L20 45 M80 15 L80 45 M20 45 L80 45 M20 15 L80 45"/>
        <path d="M20 15 Q50 2 80 15"/>
      </g>
      <g fill="currentColor">
        <circle cx="20" cy="15" r="4"/><circle cx="80" cy="15" r="4"/>
        <circle cx="20" cy="45" r="4"/><circle cx="80" cy="45" r="4"/>
      </g>
    </svg>
    <span class="demo-title">Hypersimplex harmonics</span>
    <span class="demo-note">Draw a loopless multigraph and compute its factorization in the harmonic algebra.</span>
  </a>
</div>
