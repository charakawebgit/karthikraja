/* ============================================================
   NAVBAR SCROLL EFFECT
   ============================================================ */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
(function () {
  const burger = document.getElementById('nav-burger');
  const menu   = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  const mobileLinks = menu.querySelectorAll('.mobile-link');

  const openMenu = () => {
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ============================================================
   SCROLL-DRIVEN ANIMATION FALLBACK (IntersectionObserver)
   ============================================================ */
(function () {
  // Only run fallback if native scroll-driven animations are NOT supported
  if (CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) return;

  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  // Pre-hide items for the JS fallback
  items.forEach(el => el.classList.add('is-hidden'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-hidden');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(el => observer.observe(el));
})();

/* ============================================================
   STAGGERED CARD REVEAL DELAY
   ============================================================ */
(function () {
  // Add stagger delay to sibling reveal items
  const grids = document.querySelectorAll('.stats-grid, .skills-grid, .projects-list, .timeline, .contact-links');
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.reveal-item, .contact-item');
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 80}ms`;
    });
  });
})();

/* ============================================================
   ACTIVE NAV LINK HIGHLIGHTING (scrollspy)
   ============================================================ */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.style.color = isActive ? 'var(--clr-text)' : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   HERO TITLE STAGGER ANIMATION
   ============================================================ */
(function () {
  const lines = document.querySelectorAll('.hero-line');
  if (!lines.length) return;

  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.translate = '0 30px';
    line.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1), translate 0.8s cubic-bezier(0.16,1,0.3,1)`;
    line.style.transitionDelay = `${200 + i * 120}ms`;
  });

  // Trigger after a short paint delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      lines.forEach(line => {
        line.style.opacity = '1';
        line.style.translate = '0 0';
      });
    });
  });

  // Also animate hero badge, desc, and actions
  const animateEls = document.querySelectorAll('.hero-badge, .hero-desc, .hero-actions, .hero-tags, .scroll-cue');
  animateEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.translate = '0 20px';
    el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1), translate 0.7s cubic-bezier(0.16,1,0.3,1)`;
    el.style.transitionDelay = `${600 + i * 100}ms`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.translate = '0 0';
      });
    });
  });

  // Hero visual card
  const card = document.querySelector('.visual-card');
  if (card) {
    card.style.opacity = '0';
    card.style.translate = '30px 0';
    card.style.transition = 'opacity 1s cubic-bezier(0.16,1,0.3,1), translate 1s cubic-bezier(0.16,1,0.3,1)';
    card.style.transitionDelay = '400ms';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.translate = '0 0';
      });
    });
  }
})();
