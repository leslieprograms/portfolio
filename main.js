// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');
if (hamburger && navbarMenu) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('open');
  });
  // Close menu when a link is clicked (mobile UX)
  navbarMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
      navbarMenu.classList.remove('open');
    });
  });
}
// ========== NAVBAR ACTIVE LINK & SMOOTH SCROLL ==========
const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach(link => {
  link.addEventListener('click', e => {
    if (link.hash) {
      e.preventDefault();
      document.querySelector(link.hash).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

window.addEventListener('scroll', () => {
  const fromTop = window.scrollY + 80;
  navbarLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// ========== HERO IMAGE MOTION ==========
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
  const resetHeroTilt = () => {
    heroImage.style.transform = 'perspective(760px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  heroImage.addEventListener('mousemove', event => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = heroImage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -24;
    heroImage.style.transform = `perspective(760px) rotateX(${y}deg) rotateY(${x}deg) scale(1.035)`;
  });

  heroImage.addEventListener('mouseleave', resetHeroTilt);
  heroImage.addEventListener('blur', resetHeroTilt);
}

// ========== SKILLS ==========
const skills = [
  'C/C++', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'APIs', 'SQL', 'Git', 'Python', 'MIPS Assembly', 'UI/UX', 'Supabase'
];
function renderSkills() {
  const skillsDiv = document.getElementById('skills');
  skillsDiv.innerHTML = '';
  skills.forEach(skill => {
    const chip = document.createElement('span');
    chip.className = 'skill-chip reveal';
    chip.textContent = skill;
    skillsDiv.appendChild(chip);
  });
}
renderSkills();

// ========== PROJECTS GRID & FILTER ==========
// const filters = ['All', 'Frontend', 'Backend', 'AI'];
// let currentFilter = 'All';
// function renderFilters() {
//   const filtersDiv = document.getElementById('project-filters');
//   filtersDiv.innerHTML = '';
//   filters.forEach(f => {
//     const btn = document.createElement('button');
//     btn.className = 'btn secondary';
//     btn.textContent = f;
//     if (f === currentFilter) btn.classList.add('active');
//     btn.onclick = () => {
//       currentFilter = f;
//       renderFilters();
//       renderProjects();
//     };
//     filtersDiv.appendChild(btn);
//   });
// }
// Commented out filter functionality for now, only showing all projects
function renderProjects() {
  const grid = document.getElementById('project-grid');
  grid.innerHTML = '';
  // Show all projects, no filter
  projects.forEach((project, idx) => {
    let cardContent = '';
    let imageHTML = '';
    if (project.image) {
      imageHTML = `<img src="${project.image}" alt="${project.title} image" class="project-image" style="width:100%;max-width:320px;border-radius:1rem;margin-bottom:1rem;box-shadow:0 4px 32px 0 rgba(245,163,199,0.18);object-fit:cover;" />`;
    }
    cardContent = `
      ${imageHTML}
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tags">${project.tags.map(t => `<span class='skill-chip'>${t}</span>`).join(' ')}</div>
    `;
    let card = document.createElement(project.github && project.github !== '#' ? 'a' : 'div');
    card.className = 'project-card reveal';
    if (project.github && project.github !== '#') {
      card.href = project.github;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.setAttribute('aria-label', `View ${project.title} on GitHub`);
    } else {
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Open details for ${project.title}`);
      card.onclick = () => openModal(idx);
      card.onkeypress = e => { if (e.key === 'Enter') openModal(idx); };
    }
    card.innerHTML = cardContent;
    grid.appendChild(card);
  });
}
// renderFilters();
renderProjects();

// ========== MODAL ==========
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
function openModal(idx) {
  const project = (currentFilter === 'All' ? projects : projects.filter(p => p.type === currentFilter))[idx];
  modalContent.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.details}</p>
    <div class="tags">${project.tags.map(t => `<span class='skill-chip'>${t}</span>`).join(' ')}</div>
    <div class="modal-links">
      ${project.link ? `<a href='${project.link}' target='_blank'>Live</a>` : ''}
      ${project.github ? `<a href='${project.github}' target='_blank'>GitHub</a>` : ''}
    </div>
  `;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
modalClose.onclick = closeModal;
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

// ========== EXPERIENCE TIMELINE ==========
const experience = [
  {
    title: "Software Engineer Intern @ Scholarty",
    date: "September 2025 - January 2026",
    desc: `Engineered full-stack functionalities for a social networking platform, using TypeScript, Node.js, and Express.js,
    integrating RESTful APIs for QR code generation and scanning that reduced user connection time by 30%.<br><br>
    Architected relational schemas in PostgreSQL and Supabase to support complex organizational workflows and ensure platform 
    scalability.`
  },
  {
    title: "Web Developer (Freelance) - Skin Esthetics by L.E,LLC",
    date: "July 2025- October 2025",
    desc: `Developed and maintained the business website to amplify online presence and drive higher client engagement.<br><br>
    Prioritized a responsive interface and optimized site performance, resulting in a 20% improvement in page load speeds across
    all devices.`
  },
  {
    title: "Client Care Specialist @ Blossom Care, LLC",
    date: "September 2022 - Still Present",
    desc: `Audited time-sensitive patient medication records to ensure strict adherence to clinical protocols.<br><br>
    Collaborated with multidisciplinary teams to safeguard reporting accuracy and maintain high standards of data integrity.`
  },
];
function renderTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  experience.forEach(item => {
    const div = document.createElement('div');
    div.className = 'timeline-item reveal';
    div.innerHTML = `
      <div class="timeline-title">${item.title}</div>
      <div class="timeline-date">${item.date}</div>
      <div class="timeline-desc">${item.desc}</div>
    `;
    timeline.appendChild(div);
  });
}
renderTimeline();

// ========== CONTACT FORM (frontend only) ==========
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Not implemented yet');
  contactForm.reset();
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealEls = document.querySelectorAll('.reveal');
const observer = new window.IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ========== FLOATING BLOBS (background) ==========
// Already handled in CSS .background-blobs

// ========== REDUCED MOTION ==========
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('reduced-motion');
}