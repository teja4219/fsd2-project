'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('nav-open', !open);
  });
  document.querySelectorAll('form[data-confirm]').forEach(form => form.addEventListener('submit', event => {
    if (!window.confirm(form.dataset.confirm || 'Are you sure?')) event.preventDefault();
  }));
  document.querySelectorAll('input[type="file"]').forEach(input => input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (file && file.size > 5 * 1024 * 1024) { window.alert('PDF files must be 5 MB or smaller.'); input.value = ''; }
    if (file && file.type !== 'application/pdf') { window.alert('Please choose a PDF file.'); input.value = ''; }
  }));
});
