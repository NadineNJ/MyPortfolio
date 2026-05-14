// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.innerHTML = navLinks.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ===== TYPEWRITER =====
let roles = [
  'Full-Stack Developer',
  'AI / ML Engineer',
  'Angular Developer',
  'Python Developer',
  'Problem Solver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

setTimeout(type, 1500);

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.skill-category, .timeline-card, .project-card, .cert-card, .edu-card, .detail-card, .contact-item, .stat'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (Array.from(revealElements).indexOf(entry.target) % 6));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--accent2)';
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

// ===== SMOOTH SCROLL FOR HERO BUTTONS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== LANGUAGE SWITCHER =====
const langToggle = document.getElementById('langToggle');
let currentLang = 'en';

const typewriterRoles = {
  en: ['Full-Stack Developer', 'AI / ML Engineer', 'Angular Developer', 'Python Developer', 'Problem Solver'],
  fr: ['Développeuse Full-Stack', 'Ingénieure IA / ML', 'Développeuse Angular', 'Développeuse Python', 'Résolveure de problèmes']
};

function applyLanguage(lang) {
  // Update all elements with data-en / data-fr
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.innerHTML = text;
  });

  // Update toggle button appearance
  langToggle.classList.toggle('fr', lang === 'fr');

  // Update typewriter roles
  roles.length = 0;
  typewriterRoles[lang].forEach(r => roles.push(r));

  // Update page lang attribute
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';

  // Update contact form placeholders
  const placeholders = {
    en: { name: 'Your Name', email: 'Your Email', subject: 'Subject', message: 'Your Message' },
    fr: { name: 'Votre nom', email: 'Votre email', subject: 'Sujet', message: 'Votre message' }
  };
  const p = placeholders[lang];
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const subjectEl = document.getElementById('subject');
  const messageEl = document.getElementById('message');
  if (nameEl) nameEl.placeholder = p.name;
  if (emailEl) emailEl.placeholder = p.email;
  if (subjectEl) subjectEl.placeholder = p.subject;
  if (messageEl) messageEl.placeholder = p.message;

  // Update send button
  const sendBtn = document.querySelector('#contactForm button[type="submit"]');
  if (sendBtn && !sendBtn.disabled) {
    sendBtn.innerHTML = lang === 'fr'
      ? '<i class="fas fa-paper-plane"></i> Envoyer'
      : '<i class="fas fa-paper-plane"></i> Send Message';
  }
}

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  applyLanguage(currentLang);
});
