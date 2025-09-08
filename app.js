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
// FAQ: Desktop-Akkordeon + gleiche Höhe
// =======================
(function () {
  const container = document.querySelector('.grid-3');
  if (!container) return;

  const mqDesktop = window.matchMedia('(min-width: 901px)');

  // Nur-eins-offen-Logik (nur Desktop)
  const onToggle = (e) => {
    const d = e.target;
    if (!(d instanceof HTMLDetailsElement)) return;
    if (!mqDesktop.matches) return;         // nur auf Desktop
    if (!d.open) return;                    // nur wenn eines geöffnet wird
    container.querySelectorAll('details.card[open]').forEach(other => {
      if (other !== d) other.open = false;
    });
    equalize(); // nach dem Umschalten Höhen neu berechnen
  };

  // Summary-Höhen angleichen (nur Desktop)
  const equalize = () => {
    const cards = Array.from(container.querySelectorAll('details.card'));
    const summaries = cards.map(c => c.querySelector('summary')).filter(Boolean);
    // zurücksetzen
    summaries.forEach(s => { s.style.minHeight = ''; });
    if (!mqDesktop.matches) return;
    // max. Höhe messen (nach Fonts laden etc.)
    let max = 0;
    summaries.forEach(s => {
      const h = s.getBoundingClientRect().height;
      if (h > max) max = h;
    });
    summaries.forEach(s => { s.style.minHeight = Math.ceil(max) + 'px'; });
  };

  // Events
  container.addEventListener('toggle', onToggle, true);
  window.addEventListener('resize', equalize);
  window.addEventListener('load', equalize);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(equalize);
  } else {
    // Fallback, falls document.fonts nicht verfügbar ist
    setTimeout(equalize, 100);
  }
})();

