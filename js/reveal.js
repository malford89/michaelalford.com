// Mobile hamburger menu: the toggle button is created here, so users with
// JavaScript disabled keep the plain always-visible nav links.
(function () {
  var nav = document.querySelector('nav');
  var inner = nav && nav.querySelector('.nav-inner');
  var links = nav && nav.querySelector('.nav-links');
  if (!nav || !inner || !links) return;

  nav.classList.add('nav-collapsible');

  var btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  inner.appendChild(btn);

  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });
  links.addEventListener('click', function () { setOpen(false); });
})();

// Scroll-reveal: fades elements up as they enter the viewport.
// The hidden state is applied here (not in the HTML/CSS), so users with
// JavaScript disabled, reduced-motion enabled, or older browsers see the
// page fully visible with no animation.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.section-label, .section-title, .skill-card, .project-card, .case-body > *'
  );
  if (!targets.length) return;

  // Stagger siblings inside grids so rows cascade instead of popping at once.
  var staggered = ['skills-grid', 'projects-grid'];

  targets.forEach(function (el) {
    var parent = el.parentElement;
    if (parent && staggered.some(function (c) { return parent.classList.contains(c); })) {
      var index = Array.prototype.indexOf.call(parent.children, el);
      el.style.setProperty('--reveal-delay', (index % 3) * 60 + 'ms');
    }
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  targets.forEach(function (el) { observer.observe(el); });
})();
