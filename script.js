(function () {
  'use strict';

  function initMobileMenu() {
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');

    if (!navToggle || !navLinks) return;

    function setMenuOpen(open) {
      if (open) {
        navLinks.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
      } else {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }

    function toggleMenu() {
      var isOpen = navLinks.classList.contains('active');
      setMenuOpen(!isOpen);
    }

    // Use click for both mouse and touch (touch devices fire click after touchend)
    navToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    // Close menu when tapping outside (on the overlay or body)
    document.addEventListener('click', function (e) {
      if (!navLinks.classList.contains('active')) return;
      if (navToggle.contains(e.target) || navLinks.contains(e.target)) return;
      setMenuOpen(false);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      var href = anchor.getAttribute('href');
      if (href === '#') return;
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initScrollAnimations() {
    var mobileQuery = window.matchMedia('(max-width: 768px)');
    var animatedSelectors = [
      '.section-header',
      '.package-card',
      '.addons-card',
      '.inclusions-card',
      '.layout-card',
      '.booth-card',
      '.booking-step-card'
    ];

    function runObserver() {
      var elements = [];
      animatedSelectors.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          elements.push(el);
        });
      });
      if (!elements.length) return;

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-in');
            }
          });
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
      );

      elements.forEach(function (el) {
        el.classList.add('scroll-animate');
        observer.observe(el);
      });
    }

    if (mobileQuery.matches) runObserver();
    mobileQuery.addEventListener('change', function () {
      if (mobileQuery.matches && !document.querySelector('.scroll-animate')) runObserver();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMobileMenu();
      initSmoothScroll();
      initScrollAnimations();
    });
  } else {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
  }
})();
