/* ============================================
   CRONO COMPRESSOR — Main JavaScript
   ============================================ */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item => {
  const content = item.querySelector('div:last-child');
  const icon = item.querySelector('.fa-chevron-down');

  if (item.classList.contains('open')) {
    content.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }

  item.querySelector('div:first-child').addEventListener('click', () => {
    const isOpen = content.style.display === 'block';
    content.style.display = isOpen ? 'none' : 'block';
    if (icon) icon.style.transform = isOpen ? 'rotate(0)' : 'rotate(180deg)';
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
