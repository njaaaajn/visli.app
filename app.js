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
// FAQ: immer nur 1 offen + Summary-Höhe angleichen
// =======================
(function () {
  // Wenn du das FAQ gezielt scopen willst, gib dem Container ein ID (#faq-list)
  // und nimm stattdessen: const container = document.querySelector('#faq-list');
  const container = document.querySelector('.grid-3');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('details.card'));

  // Alle geschlossen starten (falls Browser-State/Caching sie offen ließ)
  items.forEach(d => { d.open = false; });

  // Beim Öffnen eines Elements alle anderen schließen (ohne MediaQuery)
  items.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
      requestAnimationFrame(equalizeFAQ);
    });
  });

  // Summary-Höhen angleichen (nur auf „echtem“ Desktop sinnvoll)
  function equalizeFAQ() {
    const summaries = items.map(i => i.querySelector('summary')).filter(Boolean);
    summaries.forEach(s => s.style.minHeight = ''); // Reset
    if (!window.matchMedia('(min-width: 901px)').matches) return;
    let max = 0;
    summaries.forEach(s => { max = Math.max(max, s.getBoundingClientRect().height); });
    summaries.forEach(s => { s.style.minHeight = Math.ceil(max) + 'px'; });
  }

  window.addEventListener('load', equalizeFAQ);
  window.addEventListener('resize', () => requestAnimationFrame(equalizeFAQ));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalizeFAQ);
})();
