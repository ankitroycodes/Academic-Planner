/* ============================================================
   UI MOTION — sliding active indicators for nav + tab groups
   Progressive enhancement layer: attaches a positioned "pill" to
   groups of buttons (.nav-links, .tabs-row, .tabs-row-sub) and
   glides it to whichever one is active. Reacts on click (not just
   after the app's own state update) so the motion feels instant,
   then re-syncs on a MutationObserver in case the active class
   changes for other reasons (route restore, keyboard nav, etc).
   Does not replace or interfere with any existing click handlers —
   it only reads .active state and moves a decorative element.
   ============================================================ */
(function () {
  var placeFns = [];

  function attachIndicator(container) {
    if (!container || container.__motionAttached) return;
    container.__motionAttached = true;

    var pill = document.createElement('div');
    pill.className = 'slide-indicator';
    container.appendChild(pill);
    container.classList.add('js-indicator');

    function place(btn, animate) {
      if (!btn) { pill.classList.remove('is-visible'); return; }
      var cRect = container.getBoundingClientRect();
      var bRect = btn.getBoundingClientRect();
      var x = bRect.left - cRect.left;
      var y = bRect.top - cRect.top;
      if (!animate) pill.style.transition = 'none';
      pill.style.width = bRect.width + 'px';
      pill.style.height = bRect.height + 'px';
      pill.style.borderRadius = getComputedStyle(btn).borderRadius;
      pill.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      pill.classList.add('is-visible');
      if (!animate) {
        // force reflow then restore transition so future moves animate
        void pill.offsetWidth;
        pill.style.transition = '';
      }
    }

    function currentActive() {
      return container.querySelector(':scope > button.active, :scope > .nav-link.active, :scope > .tab-btn.active');
    }

    // instant placement on load — deferred one frame so layout has
    // definitely settled (flex sizing etc. can shift button rects on
    // the very first paint)
    requestAnimationFrame(function () { place(currentActive(), false); });

    // the page loads Google Fonts with display=swap, so button text
    // renders in a fallback font first and swaps to the real webfont
    // once it downloads — which changes button widths *after* the
    // placement above already measured them. Re-place (no animation)
    // once fonts are actually ready so the pill catches up to the
    // final size instead of staying sized for the fallback font.
    var resync = function () { place(currentActive(), false); };
    placeFns.push(resync);

    // click reacts immediately, ahead of whatever async state change follows
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn || !container.contains(btn)) return;
      // small delay lets the app's own click handler run first and
      // settle the DOM (labels/counts can change on click), but stays
      // well under perceptible lag
      requestAnimationFrame(function () { place(currentActive(), true); });
    });

    // keep in sync if active state changes without a direct click here
    // (e.g. programmatic navigation, filter reset)
    // Throttled to at most one placement per animation frame — without
    // this, the callback fires synchronously for every batch of class
    // mutations, and place() forces a synchronous layout read
    // (getBoundingClientRect). Pages that toggle several classes in
    // quick succession (or across many containers at once, e.g. a full
    // re-render) would otherwise stack up many forced-layout passes
    // before the browser ever gets to paint.
    var moScheduled = false;
    var mo = new MutationObserver(function (records) {
      // ignore mutations the pill caused on itself (is-visible toggling)
      var relevant = records.some(function (r) { return r.target !== pill; });
      if (!relevant || moScheduled) return;
      moScheduled = true;
      requestAnimationFrame(function () {
        moScheduled = false;
        place(currentActive(), true);
      });
    });
    mo.observe(container, { attributes: true, attributeFilter: ['class'], subtree: true });

    // reposition on resize/layout shifts
    window.addEventListener('resize', function () {
      place(currentActive(), false);
    });
  }

  function attachAll() {
    var found = document.querySelectorAll('.nav-links, .tabs-row, .tabs-row-sub, .breadcrumb-bar');
    found.forEach(attachIndicator);
    if (found.length && window.console) {
      console.log('[ui-motion] attached sliding indicators to', found.length, 'container(s)');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachAll);
  } else {
    attachAll();
  }

  // Once webfonts finish loading/swapping, re-measure every attached
  // pill so it snaps to the final (post-swap) button size. Falls back
  // to a fixed delay in browsers without the Font Loading API.
  if (window.document && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      placeFns.forEach(function (fn) { fn(); });
    });
  } else {
    setTimeout(function () { placeFns.forEach(function (fn) { fn(); }); }, 500);
  }

  // the app shell is hidden behind onboarding until setup completes,
  // and tab rows (like project year filters) can be re-rendered into
  // the DOM after initial load — watch for that and attach lazily.
  //
  // Throttled to one document-wide scan per animation frame. Without
  // this, every single childList mutation anywhere in <body> (and a
  // full renderAll()-style re-render can produce dozens of them in one
  // synchronous burst — innerHTML rewrites, enhanceSelect() wrapping
  // <select>s, etc.) triggers its own querySelectorAll pass over the
  // whole document. That storm of synchronous scans is what was
  // freezing the tab on load.
  var bodyScanScheduled = false;
  var bodyObserver = new MutationObserver(function () {
    if (bodyScanScheduled) return;
    bodyScanScheduled = true;
    requestAnimationFrame(function () {
      bodyScanScheduled = false;
      document.querySelectorAll('.nav-links, .tabs-row, .tabs-row-sub, .breadcrumb-bar').forEach(attachIndicator);
    });
  });
  bodyObserver.observe(document.body, { childList: true, subtree: true });
})();
