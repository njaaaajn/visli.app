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
// FAQ: robustes Akkordeon (1 offen) + gleiche Fragehöhe (Desktop)
// =======================
(function () {
  const root = document.getElementById('faq');
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll('.faq-q'));

  function closeAll() {
    buttons.forEach(btn => {
      const id = btn.getAttribute('aria-controls');
      const panel = id ? document.getElementById(id) : null;
      btn.setAttribute('aria-expanded', 'false');
      if (panel) panel.hidden = true;
    });
  }

  function toggle(btn) {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    closeAll();
    if (!expanded) {
      const id = btn.getAttribute('aria-controls');
      const panel = id ? document.getElementById(id) : null;
      btn.setAttribute('aria-expanded', 'true');
      if (panel) panel.hidden = false;
    }
    requestAnimationFrame(equalizeQuestions);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => toggle(btn));
    // Tastatur ist bei <button> ohnehin barrierefrei (Enter/Space) – kein Extra nötig
  });

  // gleiche Höhe der Fragezeilen (nur Desktop)
  function equalizeQuestions() {
    const mqDesktop = window.matchMedia('(min-width: 901px)');
    buttons.forEach(b => b.style.minHeight = ''); // reset
    if (!mqDesktop.matches) return;

    let max = 0;
    buttons.forEach(b => { max = Math.max(max, b.getBoundingClientRect().height); });
    const h = Math.ceil(max);
    buttons.forEach(b => { b.style.minHeight = h + 'px'; });
  }

  window.addEventListener('load', equalizeQuestions);
  window.addEventListener('resize', () => requestAnimationFrame(equalizeQuestions));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalizeQuestions);

  // Startzustand: alles zu
  closeAll();
})();
