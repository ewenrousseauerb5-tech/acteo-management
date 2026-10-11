import React, { useEffect, useRef, useState } from 'react';
import './Method.css';

const steps = [
  { title: 'On comprend', description: 'Terrain · enjeux · parties prenantes' },
  { title: 'On décide', description: 'Arbitrages · plan · engagement' },
  { title: 'On applique', description: 'Mise en pratique · actions · accompagnement' },
  { title: 'On progresse', description: 'Rituels · mesure · autonomie' },
];

const Method: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    const updateFromScroll = () => {
      frame = 0;
      const list = listRef.current;
      if (!list) return;

      const bounds = list.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.55;
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;

      let closestStep = 0;
      let closestDistance = Infinity;
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - readingLine);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestStep = index;
        }
      });
      setActiveStep(closestStep);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateFromScroll);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <section className="acteo-method" id="method" lang="fr" aria-labelledby="method-heading">
      <div className="acteo-method__container">
        <header className="acteo-method__header">
          <p className="acteo-method__eyebrow">Méthode Acteo</p>
          <h2 id="method-heading">De la complexité à l’action</h2>
        </header>

        <div className="acteo-method__timeline">
          <div className="acteo-method__rail" aria-hidden="true">
            <span
              className="acteo-method__indicator"
              style={{ top: `${(activeStep + 0.5) * 25}%` }}
            />
          </div>
          <ol className="acteo-method__steps" ref={listRef}>
            {steps.map((step, index) => (
              <li key={step.title}>
                <button
                  type="button"
                  className={`acteo-method__step${activeStep === index ? ' is-active' : ''}`}
                  ref={(element) => { rowRefs.current[index] = element; }}
                  aria-pressed={activeStep === index}
                  onPointerEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="acteo-method__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="acteo-method__content">
                    <span className="acteo-method__title">{step.title}</span>
                    <span className="acteo-method__description">{step.description}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Method;
