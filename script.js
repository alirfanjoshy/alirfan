const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.toggle-label');
const navToggle = document.querySelector('.nav-toggle');
const drawer = document.querySelector('.drawer');
const drawerClose = document.querySelector('.drawer-close');
const drawerLinks = drawer?.querySelectorAll('a');
const yearEl = document.getElementById('year');

const THEME_KEY = 'al-theme';

function setTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  const isLight = theme === 'light';
  themeToggle?.setAttribute('aria-pressed', String(isLight));
  if (themeLabel) themeLabel.textContent = isLight ? 'Light' : 'Dark';
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') {
    setTheme(stored);
    return;
  }
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(prefersLight ? 'light' : 'dark');
}

initTheme();

themeToggle?.addEventListener('click', () => {
  const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (localStorage.getItem(THEME_KEY)) return;
  setTheme(e.matches ? 'light' : 'dark');
});

/* drawer */

function setDrawer(open) {
  if (!drawer) return;
  drawer.classList.toggle('open', open);
  navToggle?.setAttribute('aria-expanded', String(open));
  drawer.setAttribute('aria-hidden', String(!open));
  body.style.overflow = open ? 'hidden' : '';
}

navToggle?.addEventListener('click', () => {
  const isOpen = drawer.classList.contains('open');
  setDrawer(!isOpen);
});

drawerClose?.addEventListener('click', () => setDrawer(false));
drawerLinks?.forEach((a) => a.addEventListener('click', () => setDrawer(false)));

/* footer year */

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* scroll reveal */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.card, .stack-grid span, .quote-box, .contact-card, .social-strip a').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});
