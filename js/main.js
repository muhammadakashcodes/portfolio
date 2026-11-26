/* Scroll reveal: elements with .reveal fade up once, the first time they enter the view.
   If IntersectionObserver is missing, everything is simply shown.
   Reduced-motion users never see the movement (handled in CSS). */
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();
