document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initFadeInAnimations();
  initMobileMenu();
  initSmoothScroll();
});
/**
 * Fade-in animations on scroll
 */
function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}
/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!menuBtn || !mobileMenu) return;
  menuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = menuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  // Close menu when clicking a link
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      const spans = menuBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}
/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}