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
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open details for ${project.title}`);
    let imageHTML = '';
    if (project.image) {
      imageHTML = `<img src="${project.image}" alt="${project.title} image" class="project-image" style="width:100%;max-width:320px;border-radius:1rem;margin-bottom:1rem;box-shadow:0 4px 32px 0 rgba(245,163,199,0.18);object-fit:cover;" />`;
    }
    card.innerHTML = `
      ${imageHTML}
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tags">${project.tags.map(t => `<span class='skill-chip'>${t}</span>`).join(' ')}</div>
    `;
    card.onclick = () => openModal(idx);
    card.onkeypress = e => { if (e.key === 'Enter') openModal(idx); };
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
    desc: "Developed backend services for a social networking platform serving campus organizations, using TypeScript, Node.js, Express.js, PostgreSQL, and Supabase"
  },
  {
    title: "Web Developer (Freelance) - Skin Esthetics by L.E,LLC",
    date: "July 2025- October 2025",
    desc: "Designed, built, and maintained the company website to strengthen online presence and drive higher client engagement"
  },
  {
    title: "Client Care Specialist @ Blossom Care, LLC",
    date: "September 2022 - Still Present",
    desc: "Tracked and validated time-sensitive patient medication data, ensuring full compliance with clinical protocols"
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