// Shared chrome behavior. Every page — including the CS 280A project
// pages — ships the same masthead markup and marks its own nav item
// with aria-current, so no JavaScript is needed for the active state.

(() => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('site-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Collapse long passages (the thesis abstract) behind a See more button.
  // The collapsing happens here rather than in the markup so that with
  // JavaScript off the reader still gets the full text and no dead button.
  document.querySelectorAll('[data-collapsible]').forEach(region => {
    const button = document.querySelector(`[data-collapse-toggle][aria-controls="${region.id}"]`);
    if (!button) return;

    region.classList.add('is-collapsed');
    button.hidden = false;

    button.addEventListener('click', () => {
      const collapsed = region.classList.toggle('is-collapsed');
      button.setAttribute('aria-expanded', String(!collapsed));
      button.textContent = collapsed ? 'See more' : 'See less';
      // Re-collapsing from far down the text would otherwise strand the reader.
      if (collapsed) {
        const top = region.getBoundingClientRect().top;
        if (top < 0) region.scrollIntoView({ block: 'start' });
      }
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
