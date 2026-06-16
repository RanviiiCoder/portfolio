document.addEventListener('DOMContentLoaded', () => {

  // --- Dynamic Year ---
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // --- Header Scrolled Class ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation Menu ---
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggleBtn.classList.toggle('open');
      navToggleBtn.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggleBtn.classList.remove('open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Scrollspy: Highlight Active Nav Link ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 200; // Offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Projects Filtering Logic ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
          // Simple visual trigger
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // --- Contact Form Submission Simulation ---
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formSubmitBtn && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous status
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      // Check validation
      if (!contactForm.checkValidity()) {
        return;
      }

      // Add loading state
      formSubmitBtn.classList.add('loading');
      formSubmitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        formSubmitBtn.classList.remove('loading');
        formSubmitBtn.disabled = false;
        
        formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
        formStatus.classList.add('success');
        
        // Reset form
        contactForm.reset();
      }, 1500);
    });
  }

  // --- Native Scroll Animations Fallback (IntersectionObserver) ---
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translate(0, 0)';
          observer.unobserve(entry.target); // Stop observing after reveal
        }
      });
    }, observerOptions);

    // Collect elements that need revealing
    const targets = document.querySelectorAll(
      '.scroll-reveal, .edu-card, .stat-card, .skills-category-card, .project-card, .cert-card, .timeline-item'
    );

    targets.forEach(target => {
      // Set initial styles for fallback transition
      target.style.opacity = '0';
      if (target.classList.contains('timeline-item')) {
        target.style.transform = 'translateX(-40px)';
      } else {
        target.style.transform = 'translateY(40px)';
      }
      target.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      revealObserver.observe(target);
    });
  }
});
