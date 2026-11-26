/* Navigation: mobile menu, scrolled state, current-section marker.
   Without JavaScript the links simply stay visible (see components.css). */
(function () {
  var header = document.querySelector("[data-site-header]");
  if (!header) return;

  var toggle = header.querySelector(".nav-toggle");
  var panel = header.querySelector("[data-nav-panel]");
  var desktop = window.matchMedia("(min-width: 768px)");

  /* ----- Mobile menu ----- */
  function setOpen(open, returnFocus) {
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    if (open) {
      var first = panel.querySelector("a, button");
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true", false);
    });

    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false, true);
      }
    });

    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false, false);
    });

    document.addEventListener("click", function (e) {
      if (
        toggle.getAttribute("aria-expanded") === "true" &&
        !header.contains(e.target)
      ) {
        setOpen(false, false);
      }
    });

    var onBreakpoint = function (e) {
      if (e.matches) setOpen(false, false);
    };
    if (desktop.addEventListener)
      desktop.addEventListener("change", onBreakpoint);
    else desktop.addListener(onBreakpoint);
  }

  /* ----- Solid background after scrolling ----- */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Mark the section in view with aria-current="true" ----- */
  var links = Array.prototype.slice.call(
    header.querySelectorAll('.nav-link[href^="#"]'),
  );
  var targets = links
    .map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if (targets.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            if (a.getAttribute("href") === "#" + entry.target.id)
              a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach(function (t) {
      observer.observe(t);
    });
  }
})();
