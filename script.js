// Shared chrome behavior. Loaded by every page that uses the global header.
// Note: cs280a/2-5 inline their own year stamp and never load this file.

// ---------------------------------------------------------------
// Canonical primary nav.
//
// The header markup is duplicated by hand across pages (there is no
// template step), and cs280a/0 and cs280a/1 are project files we do not
// edit. They ship an older three-item nav. Rebuilding the list here keeps
// their navigation in sync without altering those files on disk; with JS
// off they simply fall back to their original links, which all resolve.
// ---------------------------------------------------------------
const NAV_ITEMS = [
  { href: '/',              key: 'home',     label: 'Home' },
  { href: '/about.html',    key: 'about',    label: 'About' },
  { href: '/research.html', key: 'research', label: 'Research' },
  { href: '/cv.html',       key: 'cv',       label: 'CV' },
  { href: '/cs280a/',       key: 'cs280a',   label: 'Projects' },
];

const navList = document.querySelector('nav[aria-label="Primary"] ul');
if (navList) {
  navList.replaceChildren(...NAV_ITEMS.map(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.dataset.nav = item.key;
    a.textContent = item.label;
    li.appendChild(a);
    return li;
  }));
}

// Year stamp
const yEl = document.getElementById('year');
if (yEl) yEl.textContent = new Date().getFullYear();

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
if (hamburger && navList) {
  const toggle = () => navList.classList.toggle('show');
  hamburger.addEventListener('click', toggle);
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
}

// Active link highlighting
(function () {
  // "/about.html" -> "/about", "/" -> "", "/cs280a/3/" -> "/cs280a/3"
  const path = location.pathname
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '');

  let key = 'home';
  if (path.endsWith('/about'))    key = 'about';
  if (path.endsWith('/research')) key = 'research';
  if (path.endsWith('/cv'))       key = 'cv';
  if (path.startsWith('/cs280a')) key = 'cs280a';

  const active = document.querySelector(`nav a[data-nav="${key}"]`);
  if (active) active.classList.add('active');
})();
