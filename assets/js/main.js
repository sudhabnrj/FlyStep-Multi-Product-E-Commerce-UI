/* ----------------------------------------------------
   FlyStep - Sports Shoes E-Commerce Main Javascript File
   Version: 1.0 (Iteration 1)
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenuA11y();
  initSmoothScroll();
});

/**
 * Adds 'scrolled' class to navbar when user scrolls past 50px
 */
function initStickyHeader() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Run on load in case page is refreshed while scrolled down
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/**
 * Enhances mobile burger menu toggle accessibility (ARIA attributes)
 */
function initMobileMenuA11y() {
  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.getElementById('navbarNav');

  if (!toggler || !collapse) return;

  toggler.addEventListener('click', () => {
    const isExpanded = toggler.getAttribute('aria-expanded') === 'true';
    toggler.setAttribute('aria-expanded', !isExpanded);
  });

  // Close menu when clicking links (great for single page feel / responsive menus)
  const navLinks = collapse.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        // Trigger BS collapse close
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) {
          bsCollapse.hide();
          toggler.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

/**
 * Standard smooth scroll config for navigation anchors if any
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
