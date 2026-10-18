import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Gauge,
  Globe2,
  GraduationCap,
  Mail,
  MessageSquareQuote,
  Target,
  UsersRound,
  X,
} from 'lucide-react';
import Navbar from './components/Navbar';
import Method from './components/Method';
import Footer from './components/Footer';
import LinkedInDashboard from './components/LinkedInDashboard';
import { Page } from './types';

const bookingUrl = 'https://laurentrousseau.youcanbook.me';
const formsEndpoint = 'https://vgdwofduvgawzkhannld.supabase.co/functions/v1/acteo-forms';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const formations = [
  {
    eyebrow: 'Leadership',
    title: 'De manager à leader coach',
    description: 'Poser un cadre clair, responsabiliser, donner du feedback et mettre ses collaborateurs en action.',
    icon: BrainCircuit,
    duration: '1 jour + 1 h de retour d’expérience à J+15',
    nextDate: '20 novembre 2026',
    time: '8h30–12h30 · 13h30–16h30',
  },
  {
    eyebrow: 'Communication',
    title: 'Adapter sa communication à chaque profil',
    description: 'Quatre styles comportementaux pour ajuster son rythme, ses mots et son approche avec plus d’impact.',
    icon: MessageSquareQuote,
    duration: '2 h + 1 h de retour d’expérience à J+15',
    nextDate: '23 octobre 2026',
    time: '9h00–11h00',
  },
  {
    eyebrow: 'Organisation',
    title: 'Faire avancer sans lien hiérarchique',
    description: 'Projet, processus ou organisation matricielle : mobiliser, clarifier les responsabilités et obtenir des engagements.',
    icon: UsersRound,
    duration: '1 jour + 1 h de retour d’expérience à J+15',
    nextDate: '30 octobre 2026',
    time: '8h30–12h30 · 13h30–16h30',
  },
  {
    eyebrow: 'Efficacité',
    title: 'Résoudre durablement les problèmes',
    description: 'Identifier les causes racines, construire les bonnes actions et éviter la récidive avec des outils éprouvés.',
    icon: Gauge,
    duration: '1 jour + 1 h de retour d’expérience à J+15',
    nextDate: '6 novembre 2026',
    time: '8h30–12h30 · 13h30–16h30',
  },
  {
    eyebrow: 'Systèmes de management',
    title: 'ISO 9001 & ISO 14001 – versions 2026',
    description: 'Comprendre, anticiper et traduire les évolutions en actions concrètes pour votre organisation.',
    icon: ClipboardCheck,
    duration: '2 × 2 h + 1 h de retour d’expérience à J+15',
    nextDate: '20 novembre 2026',
    time: '9h00–11h00 · 13h30–15h30',
  },
];

const differences = [
  {
    icon: BriefcaseBusiness,
    title: 'Des managers de terrain',
    text: 'Nous avons dirigé des équipes, des projets, des opérations et des transformations avant de les enseigner.',
  },
  {
    icon: Target,
    title: 'Des situations réelles',
    text: 'Vous travaillez sur vos propres problématiques et repartez avec des actions directement applicables.',
  },
  {
    icon: GraduationCap,
    title: 'Un rendez-vous à J+15',
    text: 'Une heure pour partager les retours d’expérience, lever les blocages et ajuster la mise en œuvre.',
  },
  {
    icon: Globe2,
    title: 'Une vision internationale',
    text: 'France, Europe et international, en français, anglais ou espagnol, en ligne ou en présentiel.',
  },
];

const reviews = [
  {
    quote:
      'We did not touch the software. We focused on another type of touch: the human touch.',
    name: 'Jurjen Julianus',
    role: 'Manager Presales Benelux, CCH Tagetik - Wolters Kluwer',
  },
  {
    quote:
      'His dynamic approach and his capacity to engage all experts in a sales transformation.',
    name: 'Eric Leger',
    role: 'Associate Partner, KPMG',
  },
  {
    quote:
      'Son regard externe, précis et pragmatique m’a permis de prendre du recul, de poser un cadre clair et d’avancer avec méthode.',
    name: 'Fanny Kleniec',
    role: 'Business Developer Director, ex-CCH Tagetik',
  },
  {
    quote:
      'Laurent ne se limite pas à un coaching théorique : il comprend les réalités du terrain.',
    name: 'Badr Chtouki',
    role: 'CEO, Impactera',
  },
];

function App() {
  const getInitialPage = (): Page => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'linkedin' || window.location.hash === '#linkedin-insights') {
        return 'linkedin';
      }
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);
  const [contactStatus, setContactStatus] = useState<FormStatus>('idle');
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<FormStatus>('idle');
  const [courseStep, setCourseStep] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [activeFormation, setActiveFormation] = useState<number | null>(null);
  useEffect(() => {
    if (!newsletterOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNewsletterOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [newsletterOpen]);

  useEffect(() => {
    if (currentPage !== 'home') return;

    const updateCourseProgress = () => {
      const section = document.getElementById('courses');
      if (!section) return;

      const start = section.offsetTop - 120;
      const end = Math.max(start + 1, section.offsetTop + section.offsetHeight - window.innerHeight + 120);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
      const track = section.querySelector<HTMLElement>('.motion-track');
      const maxOffset = Math.max(0, (track?.clientHeight ?? 276) - 48);
      section.style.setProperty('--motion-offset', `${progress * maxOffset}px`);
      setCourseStep(Math.min(3, Math.floor(progress * 4)));
    };

    updateCourseProgress();
    window.addEventListener('scroll', updateCourseProgress, { passive: true });
    window.addEventListener('resize', updateCourseProgress);
    return () => {
      window.removeEventListener('scroll', updateCourseProgress);
      window.removeEventListener('resize', updateCourseProgress);
    };
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 'home' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(
      () => setActiveReview((current) => (current + 1) % reviews.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, [currentPage]);

  const submitForm = async (payload: Record<string, string>) => {
    const response = await fetch(formsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setContactStatus('submitting');

    try {
      await submitForm({
        type: 'contact',
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        service: String(data.get('service') ?? ''),
        message: String(data.get('message') ?? ''),
        website: String(data.get('website') ?? ''),
      });
      form.reset();
      setContactStatus('success');
    } catch {
      setContactStatus('error');
    }
  };

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setNewsletterStatus('submitting');

    try {
      await submitForm({
        type: 'newsletter',
        email: String(data.get('email') ?? ''),
        website: String(data.get('website') ?? ''),
      });
      form.reset();
      setNewsletterStatus('success');
    } catch {
      setNewsletterStatus('error');
    }
  };

  if (currentPage === 'linkedin') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>
          <LinkedInDashboard />
        </main>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main>
        <section id="intro" className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="signal-row">
                Conseil · Coaching · Formation
              </div>
              <h1>Faire grandir ceux qui portent vos projets</h1>
              <p className="hero-lead">
                Des formations-actions en leadership, organisation et efficacité pour transformer
                les acquis en résultats concrets.
              </p>
              <div className="hero-promise">
                <strong>On apprend. On applique. On échange. On progresse.</strong>
                <span>
                  Chaque formation associe apport méthodologique, exemples concrets, mise en
                  pratique et suivi 15 jours plus tard sur vos situations réelles.
                </span>
              </div>
              <div className="hero-actions">
                <a href="#services" className="primary-action">
                  Découvrir les formations
                  <ChevronRight aria-hidden="true" size={18} />
                </a>
                <a href={bookingUrl} target="_blank" rel="noreferrer" className="secondary-action">
                  Réserver un appel de 30 min
                  <ChevronRight aria-hidden="true" size={18} />
                </a>
              </div>
              <div className="hero-signature">
                <strong>Laurent Rousseau &amp; Delphine Bessot</strong>
                <span>France · Espagne · International</span>
              </div>
            </div>
            <figure className="hero-portrait">
              <img src="/acteo-portrait.png" alt="Laurent Rousseau et Delphine Bessot, Acteo Management" />
              <figcaption>Expérience terrain. Regard humain. Résultats mesurables.</figcaption>
            </figure>
          </div>
        </section>

        <section id="difference" className="section-block difference-block">
          <div className="section-heading compact">
            <span className="section-kicker">Pourquoi Acteo</span>
            <h2>Une formation conçue pour être utilisée.</h2>
          </div>
          <div className="difference-grid">
            {differences.map((difference) => (
              <article className="difference-item" key={difference.title}>
                <difference.icon aria-hidden="true" size={23} />
                <h3>{difference.title}</h3>
                <p>{difference.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="section-block services-block">
          <div className="section-heading">
            <span className="section-kicker">Formations</span>
            <h2>Cinq formations pour faire avancer votre organisation.</h2>
          </div>

          <div className="services-grid">
            {formations.map((formation, index) => {
              const isExpanded = activeFormation === index;

              return (
                <article className={`service-card ${isExpanded ? 'is-expanded' : ''}`} key={formation.title}>
                  <button
                    type="button"
                    className="service-summary"
                    aria-expanded={isExpanded}
                    aria-controls={`formation-detail-${index}`}
                    onClick={() => setActiveFormation(isExpanded ? null : index)}
                  >
                    <span className="service-icon">
                      <formation.icon aria-hidden="true" size={22} />
                    </span>
                    <span className="service-summary-copy">
                      <span className="service-eyebrow">{formation.eyebrow}</span>
                      <span className="service-title">{formation.title}</span>
                    </span>
                    <ChevronRight className="service-toggle" aria-hidden="true" size={20} />
                  </button>
                  <div
                    className="service-detail"
                    id={`formation-detail-${index}`}
                    aria-hidden={!isExpanded}
                  >
                    <div className="service-detail-inner">
                      <p>{formation.description}</p>
                      <div className="service-meta">
                        <strong>{formation.duration}</strong>
                        <div className="service-date">
                          <CalendarDays aria-hidden="true" size={17} />
                          <span>
                            <b>Prochaine session</b>
                            {formation.nextDate} · {formation.time}
                          </span>
                        </div>
                      </div>
                      <a href="#contact" className="service-link">
                        Échanger sur cette formation
                        <ArrowUpRight aria-hidden="true" size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="session-note">
            Nous privilégions les petits groupes pour favoriser les échanges et la mise en
            pratique. La session est confirmée à partir de 5 participants. Vous serez informé(e)
            au plus tard 5 jours avant la date prévue.
          </p>
        </section>

        <section id="courses" className="section-block course-band">
          <div className="course-intro">
            <span className="section-kicker">Comment ça marche</span>
            <h2>Quelques heures pour comprendre. 15 jours pour expérimenter.</h2>
            <div className="course-motion" aria-label="Méthode Acteo : comprendre, aligner, décider et ancrer">
              <div className="motion-heading">
                <span>Méthode Acteo</span>
                <strong>De la complexité à l’action</strong>
              </div>
              <div className="motion-flow">
                <span className="motion-track" aria-hidden="true">
                  <i />
                </span>
                {[
                  ['01', 'Comprendre', 'Terrain · enjeux · parties prenantes'],
                  ['02', 'Aligner', 'Vision · rôles · priorités'],
                  ['03', 'Décider', 'Arbitrages · plan · engagement'],
                  ['04', 'Ancrer', 'Rituels · mesure · autonomie'],
                ].map(([number, title, detail], index) => (
                  <div className={`motion-step ${courseStep === index ? 'is-active' : ''}`} key={number}>
                    <b>{number}</b>
                    <div>
                      <strong>{title}</strong>
                      <span>{detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="course-list">
            <div>
              <GraduationCap aria-hidden="true" />
              <span className="course-date">J0</span>
              <h3>Se former</h3>
              <p>Concepts, méthodes, outils et cas pratiques. Préparer son plan d’action.</p>
            </div>
            <div>
              <Target aria-hidden="true" />
              <span className="course-date">J+1 à J+14</span>
              <h3>Mettre en pratique</h3>
              <p>Tester les outils dans sa situation professionnelle réelle.</p>
            </div>
            <div>
              <ClipboardCheck aria-hidden="true" />
              <span className="course-date">J+15</span>
              <h3>Suivre et améliorer</h3>
              <p>Partager, résoudre les difficultés, ajuster et repartir avec la prochaine action.</p>
            </div>
            <p className="course-closing">La formation ne s’arrête pas quand la session se termine.</p>
          </div>
        </section>

        <Method />

        <section id="about" className="section-block about-block">
          <div className="about-visual">
            <img src="/PHOTO-2025-10-20-08-34-27.jpg" alt="Laurent Rousseau et Delphine Bessot" />
          </div>
          <div className="about-copy">
            <span className="section-kicker">Les formateurs</span>
            <h2>Deux parcours de dirigeants et consultants. Une même obsession : l’application terrain.</h2>
            <div className="profile-list">
              <article>
                <h3>Delphine Bessot</h3>
                <strong>Organisation · Management transverse · QSE-RSE</strong>
                <p>
                  25 ans d’expérience en entreprise et en conseil. Auditrice de certification QSE
                  en France et à l’international, COO de start-up, spécialiste des processus et de
                  l’amélioration des organisations.
                </p>
              </article>
              <article>
                <h3>Laurent Rousseau</h3>
                <strong>Vision stratégique · Leadership · Projets complexes</strong>
                <p>
                  20 ans de direction dans l’automobile, ancien Directeur Qualité d’un programme de
                  500 M€, executive coach et formateur. Plus de 10 000 problèmes traités avec les
                  méthodes de résolution de problèmes.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="reviews" className="section-block reviews-block">
          <div className="section-heading compact">
            <span className="section-kicker">Témoignages</span>
            <h2>Des dirigeants parlent d’impact concret</h2>
          </div>
          <div className="reviews-carousel">
            <div className="reviews-viewport" aria-live="polite">
              <div
                className="reviews-track"
                style={{ transform: `translateX(-${activeReview * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <figure className="review-card" key={review.name} aria-hidden={activeReview !== index}>
                    <span className="review-number">0{index + 1}</span>
                    <div className="review-quote">
                      <MessageSquareQuote aria-hidden="true" size={28} />
                      <blockquote>{review.quote}</blockquote>
                    </div>
                    <figcaption>
                      <strong>{review.name}</strong>
                      <span>{review.role}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="review-controls">
              <div className="review-dots" aria-label="Choisir un témoignage">
                {reviews.map((review, index) => (
                  <button
                    type="button"
                    className={activeReview === index ? 'is-active' : ''}
                    onClick={() => setActiveReview(index)}
                    aria-label={`Témoignage de ${review.name}`}
                    aria-pressed={activeReview === index}
                    key={review.name}
                  />
                ))}
              </div>
              <div className="review-arrows">
                <button
                  type="button"
                  onClick={() => setActiveReview((activeReview - 1 + reviews.length) % reviews.length)}
                  aria-label="Témoignage précédent"
                >
                  <ArrowLeft aria-hidden="true" size={19} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReview((activeReview + 1) % reviews.length)}
                  aria-label="Témoignage suivant"
                >
                  <ArrowRight aria-hidden="true" size={19} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="custom-training-band">
          <div>
            <span className="section-kicker">Formation sur mesure</span>
            <h2>Un autre besoin ?</h2>
            <p>
              Négociation, prise de parole, IA, formation de formateurs… Nous concevons la
              formation-action qui vous correspond.
            </p>
          </div>
          <a href="#contact" className="primary-action">
            Nous consulter
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </section>

        <section className="belief-band" aria-label="La promesse Acteo">
          <p>Une formation ne devrait pas se terminer par « Merci, au revoir ».</p>
          <h2>Chez Acteo, la formation se termine quand vous avez commencé à l’utiliser.</h2>
          <span>Formation → application terrain → retour d’expérience à J+15</span>
        </section>

        <section id="contact" className="section-block contact-block">
          <div className="contact-copy">
            <span className="section-kicker">Contact</span>
            <h2>Un besoin, une équipe, un challenge ?</h2>
            <p>
              Décrivez-nous la situation en quelques lignes. Nous revenons vers vous pour identifier
              le format le plus utile : formation existante ou accompagnement sur mesure.
            </p>
            <div className="contact-stat">
              <BarChart3 aria-hidden="true" />
              <span>Une première réponse concrète, sans formulaire à rallonge.</span>
            </div>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <label className="form-honeypot" aria-hidden="true">
              Site web
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
            <label>
              Nom
              <input name="name" type="text" placeholder="Votre nom" required />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="vous@entreprise.com" required />
            </label>
            <label>
              Besoin prioritaire
              <select name="service" defaultValue="Je ne sais pas encore">
                <option>Leadership</option>
                <option>Communication</option>
                <option>Management transversal</option>
                <option>Résolution de problèmes</option>
                <option>ISO 9001 ou ISO 14001</option>
                <option>Formation sur mesure</option>
                <option>Je ne sais pas encore</option>
              </select>
            </label>
            <label>
              Message
              <textarea
                name="message"
                placeholder="Contexte, objectifs, équipe concernée, timing..."
                rows={5}
                required
              />
            </label>
            <button type="submit" disabled={contactStatus === 'submitting'}>
              {contactStatus === 'submitting' ? 'Envoi en cours…' : 'Échanger sur mon besoin'}
              <ArrowUpRight aria-hidden="true" size={18} />
            </button>
            {contactStatus === 'success' && (
              <p className="form-success" role="status">
                Merci. Votre demande a bien été envoyée. Nous revenons vers vous rapidement.
              </p>
            )}
            {contactStatus === 'error' && (
              <p className="form-error" role="alert">
                L’envoi n’a pas abouti. Réessayez ou écrivez-nous à d.bessot@acteomanagement.com.
              </p>
            )}
          </form>
        </section>
      </main>

      <Footer onNavigate={setCurrentPage} />

      {newsletterOpen && (
        <div
          className="newsletter-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setNewsletterOpen(false);
          }}
        >
          <section
            className="newsletter-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
          >
            <button
              type="button"
              className="newsletter-close"
              onClick={() => setNewsletterOpen(false)}
              aria-label="Fermer"
            >
              <X aria-hidden="true" size={20} />
            </button>
            <div className="newsletter-mark">
              <Mail aria-hidden="true" size={22} />
            </div>
            <span className="section-kicker">Le brief Acteo</span>
            <h2 id="newsletter-title">Une idée terrain. Une décision plus claire.</h2>
            <p>
              Chaque mois, un point de vue court sur le leadership, la performance et la
              transformation des organisations. Sans bruit, sans théorie inutile.
            </p>
            {newsletterStatus === 'success' ? (
              <div className="newsletter-success" role="status">
                <CheckCircle2 aria-hidden="true" size={22} />
                <div>
                  <strong>Merci pour votre inscription.</strong>
                  <span>Le prochain brief arrive bientôt dans votre boîte mail.</span>
                </div>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  className="form-honeypot"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <label htmlFor="newsletter-email">Email professionnel</label>
                <div>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    placeholder="vous@entreprise.com"
                    autoComplete="email"
                    required
                    autoFocus
                  />
                  <button type="submit" disabled={newsletterStatus === 'submitting'}>
                    {newsletterStatus === 'submitting' ? 'Inscription…' : 'S’inscrire'}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </button>
                </div>
                <small>Un email par mois. Désinscription en un clic.</small>
                {newsletterStatus === 'error' && (
                  <p className="form-error" role="alert">
                    L’inscription n’a pas abouti. Vérifiez votre adresse et réessayez.
                  </p>
                )}
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
