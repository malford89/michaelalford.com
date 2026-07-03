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
      el.style.setProperty('--reveal-delay', (index % 3) * 90 + 'ms');
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
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();
