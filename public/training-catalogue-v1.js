const catalogueUrl = new URL('./programmes-formations.json', import.meta.url);
const svg = (name) => {
  const paths = {
    leadership: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    communication: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
    organisation: '<rect x="8" y="2" width="8" height="6" rx="1"/><rect x="2" y="16" width="7" height="6" rx="1"/><rect x="15" y="16" width="7" height="6" rx="1"/><path d="M12 8v4M5.5 16v-4h13v4"/>',
    efficacite: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    iso: '<rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/>',
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
  };
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '1.6');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = paths[name] || paths.clock;
  return icon;
};
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function section(title, ...children) {
  const node = el('section', 'programme-section');
  node.append(el('h3', '', title), ...children);
  return node;
}
let dialog;
let previousOverflow;
let trigger;
function closeProgramme() { dialog?.close(); }
function contact(course, company) {
  closeProgramme();
  const form = document.querySelector('#contact form');
  const select = form?.querySelector('select[name="service"]');
  const subjects = ['Leadership', 'Communication', 'Management transversal', 'Résolution de problèmes', 'ISO 9001 ou ISO 14001'];
  if (select) {
    select.value = company ? 'Formation sur mesure' : subjects[['leadership', 'communication', 'organisation', 'efficacite', 'iso'].indexOf(course.id)];
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }
  const message = form?.querySelector('textarea[name="message"]');
  if (message && !message.value) {
    message.value = company
      ? `Bonjour, je souhaite organiser la formation « ${course.title} » dans mon entreprise.`
      : `Bonjour, je souhaite m’inscrire à la formation « ${course.title} », session du ${course.session}.`;
    message.dispatchEvent(new Event('input', { bubbles: true }));
  }
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => form?.querySelector('input[name="name"]')?.focus({ preventScroll: true }), 350);
}
function action(label, className, callback) {
  const button = el('button', className, label);
  button.type = 'button';
  button.addEventListener('click', callback);
  return button;
}
function openProgramme(course, opener) {
  if (!dialog) {
    dialog = el('dialog', 'formation-dialog');
    dialog.setAttribute('aria-labelledby', 'formation-dialog-title');
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeProgramme();
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow || '';
      trigger?.focus({ preventScroll: true });
    });
    document.body.append(dialog);
  }
  trigger = opener;
  dialog.replaceChildren();
  dialog.dataset.course = course.id;
  const close = action('', 'programme-close', closeProgramme);
  close.setAttribute('aria-label', 'Fermer le programme');
  close.append(svg('close'));
  const cover = el('header', 'programme-cover');
  const title = el('h2', '', course.title);
  title.id = 'formation-dialog-title';
  const badges = el('div', 'programme-badges');
  badges.append(el('span', '', course.duration), el('span', '', course.format));
  cover.append(el('p', 'programme-category', course.category), title, el('p', 'programme-intro', course.intro), badges);
  const coverCTA = action('Je m’inscris', 'programme-primary', () => contact(course, false));
  coverCTA.append(svg('arrow'));
  cover.append(coverCTA);
  const body = el('div', 'programme-body');
  body.append(section('Pour qui', el('p', '', course.audience)));
  const objectives = el('ul', 'programme-objectives');
  course.objectives.forEach(text => objectives.append(el('li', '', text)));
  body.append(section('À l’issue de la formation, vous saurez…', objectives));
  if (course.method) body.append(section('La méthode SORAVV', el('p', '', course.method.replace('La méthode SORAVV : ', ''))));
  const timeline = el('ol', 'programme-timeline');
  course.schedule.forEach(row => {
    const item = el('li', row.title.startsWith('Module ') ? 'programme-module' : '');
    const copy = el('div');
    copy.append(el('h4', '', row.title));
    if (row.description) copy.append(el('p', '', row.description));
    item.append(el('span', 'programme-time', row.time), copy);
    timeline.append(item);
  });
  const programme = section('Le programme, étape par étape', timeline);
  if (course.programmeNote) programme.append(el('p', 'programme-note', course.programmeNote));
  body.append(programme);
  const followup = section('Le suivi à J+15', el('p', '', course.followUp));
  followup.classList.add('programme-followup');
  followup.append(el('p', 'programme-note', '1 heure en visioconférence' + (course.followUpDate ? ` · ${course.followUpDate}` : '')));
  body.append(followup, section('Ce que vous emportez', el('p', '', course.takeaways)));
  const info = el('dl', 'programme-practical');
  [['Prochaine session', course.session], ['Horaires', course.hours], ['Format', course.format], ['Groupe', course.group], ['Langues', course.languages], ['Tarif', course.price]].forEach(([key, value]) => {
    const pair = el('div'); pair.append(el('dt', '', key), el('dd', '', value)); info.append(pair);
  });
  const practical = section('Informations pratiques', info);
  if (course.moduleNote) practical.append(el('p', 'programme-note', course.moduleNote));
  body.append(practical);
  const trainer = el('div', 'programme-trainer');
  const portrait = el('img');
  portrait.src = course.trainerPhoto; portrait.alt = course.trainerName; portrait.loading = 'lazy';
  const bio = el('div'); bio.append(el('h4', '', course.trainerName), el('p', '', course.trainer.replace(/^(?:Votre formateur|Votre formatrice|Vos formateurs) : /, '')));
  trainer.append(portrait, bio);
  body.append(section(course.id === 'iso' ? 'Votre formatrice' : course.id === 'organisation' ? 'Vos formateurs' : 'Votre formateur', trainer));
  const footer = el('footer', 'programme-footer');
  footer.append(action('Je m’inscris', 'programme-primary', () => contact(course, false)), action('Organiser cette formation dans mon entreprise', 'programme-secondary', () => contact(course, true)));
  dialog.append(close, cover, body, footer);
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  dialog.showModal();
  dialog.scrollTop = 0;
  close.focus({ preventScroll: true });
}
function mountCatalogue(courses) {
  document.querySelectorAll('.services-grid:not([data-programmes-ready])').forEach(grid => {
    grid.dataset.programmesReady = 'true';
    grid.classList.add('programme-grid');
    grid.replaceChildren(...courses.map((course, index) => {
      const card = el('article', 'programme-card');
      card.dataset.course = course.id;
      const top = el('div', 'programme-card-top');
      const icon = el('span', 'programme-card-icon'); icon.append(svg(course.id));
      top.append(icon, el('span', 'programme-card-number', String(index + 1).padStart(2, '0')));
      const title = el('h3', '', course.title);
      const duration = el('p', 'programme-duration'); duration.append(svg('clock'), document.createTextNode(course.duration));
      const button = action('Voir le programme', 'programme-card-button', () => openProgramme(course, button));
      button.setAttribute('aria-label', `Voir le programme : ${course.title}`);
      button.setAttribute('aria-haspopup', 'dialog');
      button.append(svg('arrow'));
      card.append(top, el('p', 'programme-category', course.category), title, el('p', 'programme-teaser', course.teaser), duration, button);
      return card;
    }));
    grid.removeAttribute('aria-busy');
  });
}
fetch(catalogueUrl).then(response => {
  if (!response.ok) throw new Error('Programme unavailable');
  return response.json();
}).then(courses => {
  mountCatalogue(courses);
  new MutationObserver(() => mountCatalogue(courses)).observe(document.documentElement, { childList: true, subtree: true });
}).catch(() => {
  document.querySelectorAll('.programme-loading').forEach(node => {
    node.textContent = 'Les programmes sont momentanément indisponibles. Contactez-nous pour les recevoir.';
  });
});
