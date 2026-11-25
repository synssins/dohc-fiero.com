// Day/night switch. Until one is clicked the page follows the system setting; a click is stored.
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll('.theme button');
  function current() {
    return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');
  }
  function paint() {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.value === current()); });
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      root.dataset.theme = b.value;
      try { localStorage.setItem('theme', b.value); } catch (e) {}
      paint();
    });
  });
  paint();

  // Pinout pages: a table row and its connector cavity highlight each other.
  function link(el, other) {
    if (!other) return;
    ['mouseenter', 'focusin'].forEach(function (ev) { el.addEventListener(ev, function () { other.classList.add('hot'); }); });
    ['mouseleave', 'focusout'].forEach(function (ev) { el.addEventListener(ev, function () { other.classList.remove('hot'); }); });
  }
  document.querySelectorAll('.face a').forEach(function (cav) {
    var row = document.getElementById(cav.hash.slice(1));
    link(cav, row);
    if (row) link(row, cav);
  });
})();
