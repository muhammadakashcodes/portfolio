/* Projects page filters. Without JavaScript the bar stays hidden and every project is shown. */
(function () {
  var bar = document.querySelector("[data-filter-bar]");
  var items = Array.prototype.slice.call(
    document.querySelectorAll("[data-project]"),
  );
  var status = document.querySelector("[data-filter-status]");
  var empty = document.querySelector("[data-filter-empty]");
  if (!bar || !items.length) return;

  var buttons = Array.prototype.slice.call(
    bar.querySelectorAll("[data-filter]"),
  );

  function apply(filter, label) {
    var shown = 0;
    items.forEach(function (li) {
      var cats = (li.getAttribute("data-category") || "").split(" ");
      var match = filter === "all" || cats.indexOf(filter) !== -1;
      li.hidden = !match;
      if (match) shown++;
    });

    buttons.forEach(function (b) {
      b.setAttribute(
        "aria-pressed",
        String(b.getAttribute("data-filter") === filter),
      );
    });

    if (empty) empty.hidden = shown !== 0;

    if (status) {
      var noun = shown === 1 ? "project" : "projects";
      status.textContent =
        filter === "all"
          ? "Showing all " + shown + " " + noun
          : "Showing " + shown + " " + noun + " in " + label;
    }
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.getAttribute("data-filter"), b.textContent.trim());
    });
  });

  apply("all", "All");
})();
