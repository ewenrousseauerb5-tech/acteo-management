const trainers = [
  { name: 'Delphine Bessot', src: '/delphine-bessot.jpg' },
  { name: 'Laurent Rousseau', src: '/laurent-rousseau.jpg' },
];
function showPortraits() {
  const visual = document.querySelector('#about .about-visual');
  if (!visual) return false;
  visual.classList.add('trainer-portraits');
  visual.replaceChildren(...trainers.map(({ name, src }) => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = src;
    image.alt = name;
    image.width = 1122;
    image.height = 1402;
    image.loading = 'lazy';
    const caption = document.createElement('figcaption');
    caption.textContent = name;
    figure.append(image, caption);
    return figure;
  }));
  return true;
}
if (!showPortraits()) {
  const observer = new MutationObserver(() => {
    if (showPortraits()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
