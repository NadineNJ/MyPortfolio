/**
 * ============================================================
 *  portfolio.js — Main JavaScript for Jemaa Nadine's Portfolio
 * ============================================================
 *
 *  SETUP REQUIRED (EmailJS):
 *  1. Go to https://www.emailjs.com and create a free account
 *  2. Add an Email Service (Gmail recommended) → copy your Service ID
 *  3. Create an Email Template → copy your Template ID
 *     Template variables to use: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 *  4. Go to Account → copy your Public Key
 *  5. Replace the three placeholder strings below:
 *     - YOUR_PUBLIC_KEY
 *     - YOUR_SERVICE_ID
 *     - YOUR_TEMPLATE_ID
 * ============================================================
 */

// ─────────────────────────────────────────────
//  EMAILJS CONFIGURATION
//  Replace these three values with your own from emailjs.com
// ─────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'Z2Jx59EC3_qvr9y9B';   // Account → API Keys
const EMAILJS_SERVICE_ID  = 'service_mc7r1yc';    // Email Services tab
const EMAILJS_TEMPLATE_ID = 'template_9dwmubh';  // Email Templates tab

// Initialize EmailJS with your public key
// This must run before any emailjs.send() call
emailjs.init(EMAILJS_PUBLIC_KEY);


// ─────────────────────────────────────────────
//  CURSOR GLOW
//  Moves a large radial gradient circle to follow the mouse,
//  creating a subtle ambient glow effect on desktop.
// ─────────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  // Position the glow div at the current mouse coordinates
  // The CSS uses transform: translate(-50%, -50%) to center it on the cursor
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});


// ─────────────────────────────────────────────
//  NAVBAR — SCROLL SHRINK
//  Adds a 'scrolled' class to the navbar when the user
//  scrolls past 50px, which reduces its padding via CSS.
// ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ─────────────────────────────────────────────
//  MOBILE NAV TOGGLE
//  Shows/hides the navigation links on small screens
//  when the hamburger button is clicked.
// ─────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  // Toggle the 'open' class which makes the nav visible via CSS
  navLinks.classList.toggle('open');

  // Swap the icon between hamburger (bars) and X (times)
  navToggle.innerHTML = navLinks.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close the mobile nav automatically when any nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});


// ─────────────────────────────────────────────
//  TYPEWRITER EFFECT
//  Cycles through an array of role titles, typing and
//  deleting each one character by character.
// ─────────────────────────────────────────────

// The list of roles to cycle through (also used by the language switcher)
let roles = [
  'Full-Stack Developer',
  'AI / ML Engineer',
  'Angular Developer',
  'Python Developer',
  'Problem Solver'
];

let roleIndex  = 0;      // which role we're currently on
let charIndex  = 0;      // how many characters are currently shown
let isDeleting = false;  // whether we're typing or deleting

const typewriterEl = document.getElementById('typewriter');

/**
 * type()
 * Recursive function that types or deletes one character at a time.
 * Calls itself via setTimeout to create the animation loop.
 */
function type() {
  const current = roles[roleIndex];

  if (isDeleting) {
    // Remove one character from the right
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add one character to the right
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  // Default typing speed
  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    // Finished typing — pause before starting to delete
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Finished deleting — move to next role
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400; // short pause before typing next role
  }

  setTimeout(type, speed);
}

// Start the typewriter after a short initial delay
setTimeout(type, 1500);


// ─────────────────────────────────────────────
//  SCROLL REVEAL
//  Uses IntersectionObserver to animate elements into view
//  as the user scrolls down the page.
//  Elements get a 'reveal' class (invisible + shifted down),
//  then 'visible' is added when they enter the viewport.
// ─────────────────────────────────────────────
const revealElements = document.querySelectorAll(
  '.skill-category, .timeline-card, .project-card, .cert-card, .edu-card, .detail-card, .contact-item, .stat'
);

// Add the initial hidden state to all target elements
revealElements.forEach(el => el.classList.add('reveal'));

/**
 * IntersectionObserver
 * Fires whenever a 'reveal' element enters or exits the viewport.
 * threshold: 0.1 means the callback fires when 10% of the element is visible.
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Stagger the animation: each element delays by 80ms × its position (max 6)
      const index = Array.from(revealElements).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (index % 6));

      // Stop observing once the element has been revealed
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));


// ─────────────────────────────────────────────
//  PROJECT FILTER
//  Filters the project cards by category when the
//  user clicks one of the filter buttons.
// ─────────────────────────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove 'active' from all buttons, then set it on the clicked one
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter; // e.g. 'ai', 'fullstack', 'all'

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        // Show matching cards with a fade-up animation
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        // Hide non-matching cards
        card.classList.add('hidden');
      }
    });
  });
});


// ─────────────────────────────────────────────
//  ACTIVE NAV LINK HIGHLIGHT ON SCROLL
//  Highlights the nav link that corresponds to the
//  section currently visible in the viewport.
// ─────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  // Find which section the user has scrolled into
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // 100px offset for the fixed navbar
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  // Update nav link colors
  navItems.forEach(link => {
    link.style.color = ''; // reset all
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--accent2)'; // highlight active
    }
  });
});


// ─────────────────────────────────────────────
//  CONTACT FORM — EmailJS Backend
//  Sends the form data to your email via EmailJS.
//  No server required — works entirely from the browser.
// ─────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent default browser form submission

  const btn = contactForm.querySelector('button[type="submit"]');

  // Get form field values
  const fromName  = document.getElementById('name').value.trim();
  const fromEmail = document.getElementById('email').value.trim();
  const subject   = document.getElementById('subject').value.trim();
  const country   = document.getElementById('country').value.trim();
  const city      = document.getElementById('city').value.trim();
  const message   = document.getElementById('message').value.trim();

  // Show loading state on the button
  btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled   = true;

  /**
   * emailjs.send()
   * Sends an email using the configured service and template.
   * The second argument is a key-value object that maps to
   * your EmailJS template variables (e.g. {{from_name}}).
   */
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  fromName,
    from_email: fromEmail,
    subject:    subject,
    country:    country || 'Not specified',  // {{country}} in your EmailJS template
    city:       city    || 'Not specified',  // {{city}} in your EmailJS template
    message:    message,
    reply_to:   fromEmail
  })
  .then(() => {
    // Success — show confirmation
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    contactForm.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
      btn.innerHTML        = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      btn.disabled         = false;
    }, 3000);
  })
  .catch((error) => {
    // Failure — show error and re-enable button
    console.error('EmailJS error:', error);
    btn.innerHTML        = '<i class="fas fa-exclamation-circle"></i> Failed — Try Again';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    btn.disabled         = false;

    setTimeout(() => {
      btn.innerHTML        = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
    }, 3000);
  });
});


// ─────────────────────────────────────────────
//  SMOOTH SCROLL
//  Intercepts clicks on anchor links (href="#...") and
//  scrolls smoothly to the target section instead of jumping.
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ─────────────────────────────────────────────
//  LANGUAGE SWITCHER (EN / FR)
//  Toggles all text content between English and French.
//  Elements with data-en and data-fr attributes are updated.
// ─────────────────────────────────────────────
const langToggle = document.getElementById('langToggle');
let currentLang  = 'en'; // default language

// French translations for the typewriter roles
const typewriterRoles = {
  en: ['Full-Stack Developer', 'AI / ML Engineer', 'Angular Developer', 'Python Developer', 'Problem Solver'],
  fr: ['Développeuse Full-Stack', 'Ingénieure IA / ML', 'Développeuse Angular', 'Développeuse Python', 'Résolveure de problèmes']
};

/**
 * applyLanguage(lang)
 * Switches all translatable content on the page to the given language.
 * @param {string} lang - 'en' or 'fr'
 */
function applyLanguage(lang) {
  // Update every element that has a data-en or data-fr attribute
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.innerHTML = text;
  });

  // Toggle the visual state of the language button (highlights active lang)
  langToggle.classList.toggle('fr', lang === 'fr');

  // Swap the typewriter role list to the selected language
  roles.length = 0;
  typewriterRoles[lang].forEach(r => roles.push(r));

  // Update the HTML lang attribute for accessibility / SEO
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';

  // Update contact form placeholders
  const placeholders = {
    en: { name: 'Your Name', email: 'Your Email', subject: 'Subject', country: 'Country (e.g. Tunisia)', city: 'City (e.g. Ben Arous)', message: 'Your Message' },
    fr: { name: 'Votre nom', email: 'Votre email', subject: 'Sujet', country: 'Pays (ex. Tunisie)', city: 'Ville (ex. Ben Arous)', message: 'Votre message' }
  };
  const p = placeholders[lang];
  const nameEl     = document.getElementById('name');
  const emailEl    = document.getElementById('email');
  const subjectEl  = document.getElementById('subject');
  const countryEl  = document.getElementById('country');
  const cityEl     = document.getElementById('city');
  const messageEl  = document.getElementById('message');
  if (nameEl)    nameEl.placeholder    = p.name;
  if (emailEl)   emailEl.placeholder   = p.email;
  if (subjectEl) subjectEl.placeholder = p.subject;
  if (countryEl) countryEl.placeholder = p.country;
  if (cityEl)    cityEl.placeholder    = p.city;
  if (messageEl) messageEl.placeholder = p.message;

  // Update the send button label
  const sendBtn = document.querySelector('#contactForm button[type="submit"]');
  if (sendBtn && !sendBtn.disabled) {
    sendBtn.innerHTML = lang === 'fr'
      ? '<i class="fas fa-paper-plane"></i> Envoyer'
      : '<i class="fas fa-paper-plane"></i> Send Message';
  }
}

// Toggle language on button click
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  applyLanguage(currentLang);
});
