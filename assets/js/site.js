(function () {
  // Menu toggle
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('site-menu');
  if (btn && menu) {
    function setOpen(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(menu.hidden);
    });
    document.addEventListener('click', function (e) {
      if (!menu.hidden && !menu.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });
  }

  // Category filter
  var pills = document.querySelectorAll('.pill');
  var cards = document.querySelectorAll('.post-card');
  var empty = document.querySelector('.empty');
  function filter(cat) {
    var shown = 0;
    pills.forEach(function (p) { p.setAttribute('aria-pressed', String(p.dataset.cat === cat)); });
    cards.forEach(function (c) {
      var show = cat === 'All' || c.dataset.cat === cat;
      c.hidden = !show;
      if (show) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  if (pills.length) {
    pills.forEach(function (p) { p.addEventListener('click', function () { filter(p.dataset.cat); }); });
    var wanted = new URLSearchParams(location.search).get('cat');
    var exists = Array.prototype.some.call(pills, function (p) { return p.dataset.cat === wanted; });
    filter(exists ? wanted : 'All');
  }
})();
