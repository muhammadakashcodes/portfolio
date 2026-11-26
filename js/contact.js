/* Contact form: validation, accessible error messages, sending to a form service.
   Without JavaScript the form still posts normally to its action URL. */
(function () {
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var submitBtn = form.querySelector('[type="submit"]');
  var sendLabel = submitBtn.textContent;
  var busy = false;

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var fields = [
    {
      id: "f-name",
      message: "Enter your name.",
      ok: function (v) {
        return v.trim().length > 0;
      },
    },
    {
      id: "f-email",
      message: "Enter a full email address, like name@example.com.",
      ok: function (v) {
        return EMAIL.test(v.trim());
      },
    },
    {
      id: "f-msg",
      message: "Write a message of at least 10 characters.",
      ok: function (v) {
        return v.trim().length >= 10;
      },
    },
  ];

  fields.forEach(function (f) {
    f.el = document.getElementById(f.id);
    f.baseDescribedBy = f.el.getAttribute("aria-describedby") || "";
    f.errId = f.id + "-err";
    f.el.addEventListener("input", function () {
      clearError(f);
    });
  });

  function setStatus(text, state) {
    status.textContent = text;
    if (state) status.setAttribute("data-state", state);
    else status.removeAttribute("data-state");
  }

  function setError(f) {
    var err = document.getElementById(f.errId);
    if (!err) {
      err = document.createElement("p");
      err.className = "field-error";
      err.id = f.errId;
      f.el.insertAdjacentElement("afterend", err);
    }
    err.textContent = f.message;
    f.el.setAttribute("aria-invalid", "true");
    f.el.setAttribute(
      "aria-describedby",
      (f.errId + " " + f.baseDescribedBy).trim(),
    );
  }

  function clearError(f) {
    var err = document.getElementById(f.errId);
    if (err) err.remove();
    f.el.removeAttribute("aria-invalid");
    if (f.baseDescribedBy)
      f.el.setAttribute("aria-describedby", f.baseDescribedBy);
    else f.el.removeAttribute("aria-describedby");
  }

  function showFallback(prefix) {
    var email = form.getAttribute("data-fallback-email");
    status.textContent = prefix + " Please email me directly at ";
    var a = document.createElement("a");
    a.href = "mailto:" + email;
    a.textContent = email;
    status.appendChild(a);
    status.appendChild(document.createTextNode("."));
    status.setAttribute("data-state", "error");
  }

  function setBusy(on) {
    busy = on;
    form.setAttribute("aria-busy", String(on));
    submitBtn.setAttribute("aria-disabled", String(on));
    submitBtn.textContent = on ? "Sending…" : sendLabel;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return;
    setStatus("", null);

    var firstBad = null,
      bad = 0;
    fields.forEach(function (f) {
      if (f.ok(f.el.value)) {
        clearError(f);
        return;
      }
      setError(f);
      bad++;
      if (!firstBad) firstBad = f.el;
    });
    if (bad) {
      setStatus(
        bad === 1
          ? "Please fix the highlighted field."
          : "Please fix the " + bad + " highlighted fields.",
        "error",
      );
      firstBad.focus();
      return;
    }

    var thanks =
      "Thanks, your message was sent. I will reply as soon as I can.";

    /* Honeypot: a person never fills this. Pretend success, send nothing. */
    var trap = form.elements["_gotcha"];
    if (trap && trap.value) {
      form.reset();
      setStatus(thanks, "success");
      return;
    }

    var endpoint = form.getAttribute("action");
    if (!endpoint || endpoint === "#" || /YOUR_FORM_ID/.test(endpoint)) {
      showFallback("The contact form is not connected yet.");
      return;
    }

    setBusy(true);
    var controller = "AbortController" in window ? new AbortController() : null;
    var timer = controller
      ? setTimeout(function () {
          controller.abort();
        }, 15000)
      : null;

    fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
      signal: controller ? controller.signal : undefined,
    })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status " + res.status);
        form.reset();
        setStatus(thanks, "success");
      })
      .catch(function () {
        showFallback("Sorry, your message could not be sent.");
      })
      .then(function () {
        if (timer) clearTimeout(timer);
        setBusy(false);
      });
  });
})();
