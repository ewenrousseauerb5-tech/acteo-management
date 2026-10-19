const steps = [
  ['Comprendre', 'Concepts · méthodes · situations réelles', 'J0', 'Acquérir les concepts, les méthodes et les outils à partir de vos situations réelles.'],
  ['Appliquer', 'Outils · expérimentation terrain', 'J+1 à J+13', 'Expérimenter les outils sur le terrain et mettre votre plan d’action en pratique.'],
  ['Ancrer', 'Réunion de suivi à J+14', 'J+14 · Réunion de suivi', 'Une réunion à 14 jours pour partager vos retours d’expérience, lever les blocages et consolider les acquis.'],
  ['Optimiser', 'Retours · ajustements · progrès', 'Après J+14', 'Ajuster vos pratiques à partir des retours terrain et poursuivre les progrès dans la durée.'],
];
function updateOriginalMethod() {
  const course = document.getElementById('courses');
  if (!course || course.dataset.methodRefined) return;
  const timeline = course.querySelector('.course-motion');
  const list = course.querySelector('.course-list');
  if (!timeline || !list) return;
  course.dataset.methodRefined = 'true';
  timeline.setAttribute('aria-label', 'Méthode Acteo : comprendre, appliquer, ancrer à J+14 et optimiser');
  timeline.querySelectorAll('.motion-step').forEach((node, index) => {
    if (!steps[index]) return;
    node.querySelector('strong').textContent = steps[index][0];
    node.querySelector('div span').textContent = steps[index][1];
  });
  const iconTemplates = [...list.querySelectorAll(':scope > div > svg')].map(icon => icon.cloneNode(true));
  const cards = steps.map(([title, , date, description], index) => {
    const card = document.createElement('div');
    const icon = iconTemplates[index] || iconTemplates[iconTemplates.length - 1];
    if (icon) card.append(icon.cloneNode(true));
    const label = document.createElement('span'); label.className = 'course-date'; label.textContent = date;
    const heading = document.createElement('h3'); heading.textContent = title;
    const text = document.createElement('p'); text.textContent = description;
    card.append(label, heading, text);
    return card;
  });
  const closing = document.createElement('p');
  closing.className = 'course-closing';
  closing.textContent = 'Comprendre → Appliquer → Ancrer → Optimiser';
  list.replaceChildren(...cards, closing);
}
function normalizePublishedCopy() {
  const root = document.querySelector('main');
  if (!root) return;
  const normalize = text => text.replaceAll('J+15', 'J+14').replaceAll('15 jours', '14 jours').replaceAll('J+1 à J+14', 'J+1 à J+13').replaceAll('versions 2026', 'Version 2026');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const text = normalize(node.nodeValue);
    if (text !== node.nodeValue) node.nodeValue = text;
  }
  root.querySelectorAll('[aria-label]').forEach(node => {
    const current = node.getAttribute('aria-label');
    const next = normalize(current);
    if (next !== current) node.setAttribute('aria-label', next);
  });
}
function reconcileCopy() {
  updateOriginalMethod();
  normalizePublishedCopy();
}
reconcileCopy();
new MutationObserver(reconcileCopy).observe(document.documentElement, { childList: true, subtree: true });
