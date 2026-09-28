/* Tony's Auto Repairs & Sales — site behaviour (vanilla, no dependencies) */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("mobile-nav");
  function setMenu(open) {
    if (!btn || !nav) return;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    nav.hidden = !open;
    document.body.classList.toggle("nav-open", open);
    var label = btn.getAttribute(open ? "data-label-close" : "data-label-open");
    if (label) btn.setAttribute("aria-label", label);
  }
  if (btn && nav) {
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setMenu(false); btn.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth >= 980) setMenu(false); });
  }

  /* ---------- EN | ES toggle: slide the indicator, then go ---------- */
  document.querySelectorAll(".lang-toggle").forEach(function (t) {
    t.querySelectorAll("a[hreflang]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        t.classList.add("is-switching");
        var href = a.href;
        setTimeout(function () { window.location.href = href; }, 300);
      });
    });
  });
  window.addEventListener("pageshow", function () {
    document.querySelectorAll(".lang-toggle.is-switching").forEach(function (t) { t.classList.remove("is-switching"); });
  });

  /* ---------- Reveals, wrenches, stamps ---------- */
  var targets = document.querySelectorAll(".reveal, .svc, .stamp[data-stamp]");
  function show(el) {
    if (el.matches(".stamp[data-stamp]")) el.classList.add("is-stamped");
    else el.classList.add("is-in");
  }
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(show);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.18 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Rolling tire + tread mark, sidewall spin ---------- */
  var roads = Array.prototype.slice.call(document.querySelectorAll(".road"));
  var walls = Array.prototype.slice.call(document.querySelectorAll(".sidewall svg"));
  if (!reduce && (roads.length || walls.length)) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      roads.forEach(function (road) {
        var r = road.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh + 50) return;
        var tire = road.querySelector(".tire");
        if (!tire) return;
        // progress: 0 when the road enters at the bottom, 1 when it is 25% from the top
        var p = (vh - r.top) / (vh * 0.75 + r.height);
        p = Math.max(0, Math.min(1, p));
        var tw = tire.offsetWidth;
        var travel = r.width - tw;
        var x = -tw + p * (travel + tw);
        var deg = (x / (tw / 2)) * (180 / Math.PI);
        tire.style.setProperty("--tx", x.toFixed(1) + "px");
        tire.style.setProperty("--rot", deg.toFixed(1) + "deg");
        var trail = Math.max(0, (x + tw * 0.5) / r.width);
        road.style.setProperty("--p", trail.toFixed(4));
      });
      walls.forEach(function (w) {
        var r = w.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        w.style.setProperty("--spin", ((vh - r.top) * 0.22).toFixed(1) + "deg");
      });
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------- Contact form (Netlify) ---------- */
  var form = document.querySelector("form[data-netlify]");
  if (form) {
    var success = document.getElementById("form-success");
    var statusEl = document.getElementById("form-status");
    var msgs = {
      required: form.getAttribute("data-msg-required") || "This field is required.",
      phone: form.getAttribute("data-msg-phone") || "Please enter a valid phone number.",
      sending: form.getAttribute("data-msg-sending") || "Sending...",
      fail: form.getAttribute("data-msg-fail") || "Something went wrong. Please call the shop."
    };
    var showSuccess = function () {
      form.hidden = true;
      if (success) { success.classList.add("show"); success.setAttribute("tabindex", "-1"); success.focus(); }
    };
    if (/[?&]sent=1/.test(window.location.search)) showSuccess();

    var validate = function (field) {
      var err = document.getElementById(field.id + "-err");
      var msg = "";
      var v = field.value.trim();
      if (field.required && !v) msg = msgs.required;
      else if (field.type === "tel" && v && v.replace(/\D/g, "").length < 10) msg = msgs.phone;
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) { err.textContent = msg; err.classList.toggle("show", !!msg); }
      return !msg;
    };
    form.querySelectorAll("input[required], input[type=tel], select[required], textarea[required]").forEach(function (f) {
      f.addEventListener("blur", function () { if (f.value) validate(f); });
      f.addEventListener("input", function () { if (f.getAttribute("aria-invalid") === "true") validate(f); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, first = null;
      form.querySelectorAll("input[required], input[type=tel], select[required], textarea[required]").forEach(function (f) {
        if (!validate(f)) { ok = false; if (!first) first = f; }
      });
      if (!ok) { first.focus(); return; }
      if (statusEl) statusEl.textContent = msgs.sending;
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch(form.getAttribute("action") || "/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      }).then(function (res) {
        if (!res.ok) throw new Error("status " + res.status);
        if (statusEl) statusEl.textContent = "";
        showSuccess();
      }).catch(function () {
        if (statusEl) statusEl.textContent = msgs.fail;
      });
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
