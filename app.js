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


function open(){ mobileNav.removeAttribute('hidden'); toggle.setAttribute('aria-expanded','true'); }
function close(){ mobileNav.setAttribute('hidden',''); toggle.setAttribute('aria-expanded','false'); }


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
