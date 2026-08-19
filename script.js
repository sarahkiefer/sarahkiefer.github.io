// Shared chrome behavior. Every page — including the CS 280A project
// pages — now ships the same masthead markup and marks its own nav item
// with aria-current, so this file only handles the mobile menu and the
// footer year.

const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('site-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
