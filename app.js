/* =========================================
FILE: /app.js
Small interactions (mobile menu, esc-close, active nav)
========================================= */
// Year in footer (if present)
(function(){
const y = document.getElementById('y');
if(y){ y.textContent = new Date().getFullYear(); }
})();


// Mobile menu toggle
(function(){
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
if(!toggle || !mobileNav) return;


function open(){ mobileNav.removeAttribute('hidden'); toggle.setAttribute('aria-expanded','true'); document.body.classList.add('nav-open'); }
function close(){ mobileNav.setAttribute('hidden',''); toggle.setAttribute('aria-expanded','false'); document.body.classList.remove('nav-open'); }


toggle.addEventListener('click', ()=>{
const isHidden = mobileNav.hasAttribute('hidden');
isHidden ? open() : close();
});


// Close on ESC
document.addEventListener('keydown', (e)=>{
if(e.key==='Escape' && !mobileNav.hasAttribute('hidden')){ close(); toggle.focus(); }
});


// Close when clicking a link
mobileNav.addEventListener('click', (e)=>{
const t = e.target;
if(t && t.tagName === 'A'){ close(); }
});
})();


// Mark active nav link based on pathname
(function(){
const path = location.pathname.replace(/index\.html$/,'');
document.querySelectorAll('nav[aria-label="Hauptnavigation"] a, nav[aria-label="Footer Navigation"] a').forEach(a=>{
const href = a.getAttribute('href');
const normalized = href.replace(/index\.html$/,'');
if(normalized === path){ a.setAttribute('aria-current','page'); }
});
})();

// =======================
// FAQ: Desktop – Single Open + gleiche Summary-Höhe
// =======================
(function () {
  const container = document.querySelector('.grid-3');
  if (!container) return;

  const mqDesktop = window.matchMedia('(min-width: 901px)');

  // 1) Nur-eins-offen: via Klick auf <summary> (zuverlässiger als 'toggle')
  document.addEventListener('click', (ev) => {
    const summary = ev.target.closest('details.card > summary');
    if (!summary) return;

    const d = summary.parentElement; // <details>
    if (mqDesktop.matches) {
      container.querySelectorAll('details.card[open]').forEach(other => {
        if (other !== d) other.removeAttribute('open');
      });
    }

    // Höhe nach Klick neu berechnen (nachdem der Browser getoggelt hat)
    setTimeout(equalizeFAQ, 0);
  });

  // 2) Summary-Höhen angleichen (nur Desktop)
  function equalizeFAQ() {
    const summaries = Array.from(container.querySelectorAll('details.card > summary'));
    // zurücksetzen
    summaries.forEach(s => s.style.minHeight = '');

    if (!mqDesktop.matches || !summaries.length) return;

    let max = 0;
    summaries.forEach(s => {
      const h = s.getBoundingClientRect().height;
      if (h > max) max = h;
    });
    const minH = Math.ceil(max) + 'px';
    summaries.forEach(s => s.style.minHeight = minH);
  }

  // Initial + bei Resizes/Schriftladen
  window.addEventListener('load', equalizeFAQ);
  window.addEventListener('resize', () => requestAnimationFrame(equalizeFAQ));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalizeFAQ);
})();
