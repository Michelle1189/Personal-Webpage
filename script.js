
// Dark mode functionality
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.querySelector('.theme-toggle i');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.className = 'fas fa-sun';
  } else {
    if (themeToggle) themeToggle.className = 'fas fa-moon';
  }
}

// Initialize theme on page load
initTheme();

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navRight = document.querySelector('.nav-right');
const themeToggle = document.querySelector('.theme-toggle');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navRight.classList.toggle('active');
  });
}

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (isDarkMode) {
      icon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    } else {
      icon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    }
  });
}

// Close mobile menu when clicking a link
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
      navRight.classList.remove('active');
    }
  });
});

// Smooth scroll for landing page arrow
document.addEventListener('DOMContentLoaded', () => {
  const scrollDownArrow = document.querySelector('.scroll-down a');
  if (scrollDownArrow) {
    scrollDownArrow.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = scrollDownArrow.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Handle fixed header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Enhanced reveal animations on scroll using Intersection Observer
  const scrollElements = document.querySelectorAll('.section-header, .skill-category, .timeline-item, .project-card, .skill-tag, .contact-method');
  
  const animateElement = (element, isIntersecting) => {
    if (isIntersecting) {
      element.classList.add('scrolled');
      element.style.opacity = 1;
      element.style.transform = 'translateY(0)';
    }
  };
  
  // Add initial styles for animation
  scrollElements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Use Intersection Observer for better performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      animateElement(entry.target, entry.isIntersecting);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  scrollElements.forEach(el => {
    observer.observe(el);
  });
  
  // Add staggered animation to skill tags
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, index) => {
    tag.style.transitionDelay = `${index * 0.05}s`;
  });
});
