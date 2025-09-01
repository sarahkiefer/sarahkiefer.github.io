// Year stamp
const yEl = document.getElementById('year');
if (yEl) yEl.textContent = new Date().getFullYear();

// Hamburger toggle (works even if no inline onclick)
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('nav ul');
if (hamburger && navList) {
  hamburger.addEventListener('click', () => {
    navList.classList.toggle('show');
  });
}

// Active link highlighting across pages (handles /, /index.html, /about.html, /cs280a/*)
(function () {
  const path = location.pathname
    .replace(/\/index\.html$/, '')
    .replace(/\/$/, '');

  let key = 'home';
  if (path.endsWith('/about') || path.endsWith('/about.html')) key = 'about';
  if (path.startsWith('/cs280a')) key = 'cs280a';

  document.querySelectorAll(`a[data-nav="${key}"], nav a`).forEach(a => {
    if (a.getAttribute('href')) {
      const href = a.getAttribute('href')
        .replace(/\/index\.html$/, '')
        .replace(/\/$/, '');
      if ((key === 'home' && (href === '' || href === '')) ||
          (key === 'about' && (href.endsWith('/about') || href.endsWith('about.html'))) ||
          (key === 'cs280a' && href.startsWith('/cs280a'))) {
        a.classList.add('active');
      }
    }
  });
})();
