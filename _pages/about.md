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
    <p>Email: <a href="mailto:w3miller@ucsd.edu">w3miller@ucsd.edu</a></p>
    <p>Office: HSS 4084</p>

news: false # includes a list of news items
selected_papers: true  # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---

I am a third year PhD student in mathematics at the University of California, San Diego. Today is day <span id="phd-day">{% assign phd_start = "2024-09-23" | date: "%s" | plus: 0 %}{% assign phd_now = "now" | date: "%s" | plus: 0 %}{{ phd_now | minus: phd_start | divided_by: 86400 | floor }}</span> of my PhD.

My advisor is [Brendon Rhoades](https://mathweb.ucsd.edu/~bprhoades/).

My research interests are in algebraic combinatorics. Most of my work has been in graded Ehrhart theory and representation-theoretic aspects of Coxeter–Catalan theory.

When I'm not doing math, I cook, play [chess](https://www.chess.com/member/atropos7){% assign bullet = site.data.chess.bullet_record %}{% if bullet.games %} ({{ bullet.games_pretty }} games of bullet and counting){% endif %}, and play piano. {% assign reading = site.data.reading.books %}{% if reading != blank %}{% assign today = "now" | date: "%s" | plus: 0 %}I am currently reading {% for book in reading %}{% unless forloop.first %}{% if forloop.last %}{% if forloop.length > 2 %},{% endif %} and {% else %}, {% endif %}{% endunless %}[*{{ book.title }}*]({{ book.link }}){% if book.started != '' %}{% assign shelved = book.started | date: "%s" | plus: 0 %}{% assign book_days = today | minus: shelved | divided_by: 86400 | floor | plus: 1 %} (<span class="reading-day" data-started="{{ book.started }}">for {{ book_days }} day{% unless book_days == 1 %}s{% endunless %}</span>){% endif %}{% endfor %}, according to [Goodreads](https://www.goodreads.com/user/show/109451240-weston).{% else %}I keep a [reading list](https://www.goodreads.com/user/show/109451240-weston) on Goodreads.{% endif %}

<script>
  (function () {
    var el = document.getElementById('phd-day');
    if (!el) return;
    var days = Math.floor((Date.now() - Date.UTC(2024, 8, 23)) / 86400000);
    if (days > 0) el.textContent = days;
  })();
  (function () {
    // Same idea for each book: the build-time number is right when the page is
    // built, this keeps it right on the days in between.
    Array.prototype.forEach.call(document.querySelectorAll('.reading-day'), function (el) {
      var parts = (el.getAttribute('data-started') || '').split('-');
      if (parts.length !== 3) return;
      var start = Date.UTC(+parts[0], +parts[1] - 1, +parts[2]);
      var days = Math.floor((Date.now() - start) / 86400000) + 1;
      if (days > 0) el.textContent = 'for ' + days + (days === 1 ? ' day' : ' days');
    });
  })();
</script>

<div class="demos-section">
<h2><a href="{{ '/demos/' | relative_url }}" style="color: inherit">demos</a></h2>

<p>Each of my papers has an interactive companion that runs its construction on an example you choose.</p>

<div class="demo-strip">
  <a class="demo-card" href="{{ '/graph-demos/' | relative_url }}">
    <svg viewBox="0 0 100 60" aria-hidden="true">
      <g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round">
        <path class="draw" pathLength="100" d="M20 15 L80 15 M20 15 L20 45 M80 15 L80 45 M20 45 L80 45 M20 15 L80 45"/>
        <path class="draw" pathLength="100" d="M20 15 Q50 2 80 15"/>
      </g>
      <g class="nodes" fill="currentColor">
        <circle cx="20" cy="15" r="4"/><circle cx="80" cy="15" r="4"/>
        <circle cx="20" cy="45" r="4"/><circle cx="80" cy="45" r="4"/>
      </g>
    </svg>
    <span class="demo-title">Hypersimplex harmonics</span>
    <span class="demo-note">Draw a loopless multigraph and compute its factorization in the harmonic algebra.</span>
  </a>

  <a class="demo-card" href="{{ '/cayley/' | relative_url }}">
    <svg viewBox="0 0 100 60" aria-hidden="true">
      <g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round">
        <path class="draw" pathLength="100" d="M50 8 L22 28 M50 8 L78 28 M22 28 L12 52 M22 28 L36 52 M78 28 L88 52"/>
      </g>
      <g class="nodes" fill="currentColor">
        <circle cx="50" cy="8" r="4"/><circle cx="22" cy="28" r="4"/><circle cx="78" cy="28" r="4"/>
        <circle cx="12" cy="52" r="4"/><circle cx="36" cy="52" r="4"/><circle cx="88" cy="52" r="4"/>
      </g>
    </svg>
    <span class="demo-title">Cayley's formula</span>
    <span class="demo-note">Choose a labelled tree and see its corresponding cyclic embedding, cyclic factorization, and distinguished subword.</span>
  </a>

  <a class="demo-card" href="{{ '/rational-catalan/' | relative_url }}">
    <svg viewBox="0 0 100 60" aria-hidden="true">
      <path d="M5 55 L95 5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity="0.45"/>
      <path class="draw" pathLength="100" d="M5 55 V30 H27.5 V17.5 H50 V12 H72.5 V5 H95" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>
    <span class="demo-title">Rational Catalan numbers</span>
    <span class="demo-note">Compute traces and Catalan numbers for any complex reflection group.</span>
  </a>
</div>
</div>
