import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Cpu,
  Gauge,
  GraduationCap,
  Mail,
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  X,
} from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LinkedInDashboard from './components/LinkedInDashboard';
import { Page } from './types';

const bookingUrl = 'https://laurentrousseau.youcanbook.me';

const services = [
  {
    eyebrow: 'Leadership',
    title: 'Executive coaching',
    description: 'Clarifier la posture, les arbitrages et la confiance dans les moments qui comptent.',
    icon: BrainCircuit,
    nextDate: '14 octobre 2026',
    format: 'Paris + distanciel',
  },
  {
    eyebrow: 'Commercial',
    title: 'Impact, questionnement et prise de parole',
    description: 'Transformer les conversations client en decisions, adhesion et mouvement.',
    icon: MessageSquareQuote,
    nextDate: '6 novembre 2026',
    format: 'Vigo + intra-entreprise',
  },
  {
    eyebrow: 'Performance',
    title: 'Processus, qualite et resolution de problemes',
    description: 'Rendre les processus visibles, utiles et pilotables par les equipes.',
    icon: Gauge,
    nextDate: '19 novembre 2026',
    format: 'Classe virtuelle',
  },
  {
    eyebrow: 'RSE',
    title: 'RSE, QSE et transformation durable',
    description: 'Passer des engagements a une feuille de route credible et mesurable.',
    icon: ShieldCheck,
    nextDate: '3 decembre 2026',
    format: 'Lyon + distanciel',
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
      'Son regard externe, precis et pragmatique m a permis de prendre du recul, de poser un cadre clair et d avancer avec methode.',
    name: 'Fanny Kleniec',
    role: 'Business Developer Director, ex-CCH Tagetik',
  },
  {
    quote:
      'Laurent ne se limite pas a un coaching theorique: il comprend les realites du terrain.',
    name: 'Badr Chtouki',
    role: 'CEO, Impactera',
  },
];

const credentials = [
  'Direction et transformation',
  'Coaching de dirigeants',
  'QSE, RSE et projets internationaux',
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
  const [sent, setSent] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [courseStep, setCourseStep] = useState(0);

  useEffect(() => {
    if (currentPage !== 'home') return;
    const timer = window.setTimeout(() => setNewsletterOpen(true), 6500);
    return () => window.clearTimeout(timer);
  }, [currentPage]);

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
      section.style.setProperty('--motion-offset', `${progress * 228}px`);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterSent(true);
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
              <p>
                Conseil, coaching et formation pour decider plus clairement et faire avancer le
                collectif.
              </p>
              <div className="hero-actions">
                <button
                  type="button"
                  className="primary-action"
                  onClick={() => setNewsletterOpen(true)}
                >
                  Recevoir le brief executif
                  <Mail aria-hidden="true" size={18} />
                </button>
                <a href="#contact" className="secondary-action">
                  Demander un diagnostic
                  <ChevronRight aria-hidden="true" size={18} />
                </a>
              </div>
              <a href={bookingUrl} target="_blank" rel="noreferrer" className="hero-booking-link">
                Ou reserver directement un appel de 30 minutes
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
              <div className="hero-signature">
                <strong>Laurent Rousseau &amp; Delphine Bessot</strong>
                <span>France · Espagne · International</span>
              </div>
            </div>
            <figure className="hero-portrait">
              <img src="/acteo-portrait.png" alt="Laurent Rousseau et Delphine Bessot, Acteo Management" />
              <figcaption>Experience terrain. Regard humain. Resultats mesurables.</figcaption>
            </figure>
          </div>
        </section>

        <section id="services" className="section-block services-block">
          <div className="section-heading">
            <span className="section-kicker">Services</span>
            <h2>Quatre expertises. Un meme objectif: faire avancer.</h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon">
                  <service.icon aria-hidden="true" size={24} />
                </div>
                <span>{service.eyebrow}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-date">
                  <CalendarDays aria-hidden="true" size={17} />
                  <div>
                    <strong>Prochaine session</strong>
                    <span>{service.nextDate} · {service.format}</span>
                  </div>
                </div>
                <a href="#contact" className="service-link">
                  En parler
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="courses" className="section-block course-band">
          <div className="course-intro">
            <span className="section-kicker">Cours et formats</span>
            <h2>Des formats courts. Des effets durables.</h2>
            <div className="course-motion" aria-label="Methode Acteo: comprendre, aligner, decider et ancrer">
              <div className="motion-heading">
                <span>Methode Acteo</span>
                <strong>De la complexite a l action</strong>
              </div>
              <div className="motion-flow">
                <span className="motion-track" aria-hidden="true">
                  <i />
                </span>
                {[
                  ['01', 'Comprendre', 'Terrain · enjeux · parties prenantes'],
                  ['02', 'Aligner', 'Vision · roles · priorites'],
                  ['03', 'Decider', 'Arbitrages · plan · engagement'],
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
              <span className="course-date">14 oct. 2026</span>
              <h3>Leader coach</h3>
              <p>Cadre, feedback, regles d equipe, action sous sept jours.</p>
            </div>
            <div>
              <Target aria-hidden="true" />
              <span className="course-date">6 nov. 2026</span>
              <h3>L art du questionnement</h3>
              <p>Faire parler le client avant de proposer, passer du besoin technique a l enjeu.</p>
            </div>
            <div>
              <ClipboardCheck aria-hidden="true" />
              <span className="course-date">19 nov. 2026</span>
              <h3>Audit et processus</h3>
              <p>Audit multi-sites, indicateurs utiles, revue de processus qui decide.</p>
            </div>
            <div>
              <Cpu aria-hidden="true" />
              <span className="course-date">3 dec. 2026</span>
              <h3>Efficacite avec l IA</h3>
              <p>Cas d usage, prompts, automatisation et methodes pour gagner du temps.</p>
            </div>
          </div>
        </section>

        <section id="reviews" className="section-block reviews-block">
          <div className="section-heading compact">
            <span className="section-kicker">Reviews</span>
            <h2>Des dirigeants parlent d impact concret</h2>
          </div>
          <div className="reviews-grid">
            {reviews.slice(0, 3).map((review) => (
              <figure className="review-card" key={review.name}>
                <MessageSquareQuote aria-hidden="true" size={24} />
                <blockquote>{review.quote}</blockquote>
                <figcaption>
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="about" className="section-block about-block">
          <div className="about-visual">
            <img src="/PHOTO-2025-10-20-08-34-51.jpg" alt="Laurent Rousseau et Delphine Bessot" />
          </div>
          <div className="about-copy">
            <span className="section-kicker">A propos</span>
            <h2>Deux regards. Une meme exigence de concret.</h2>
            <p>
              Laurent Rousseau et Delphine Bessot relient experience operationnelle, coaching et
              systemes de management pour transformer sans perdre l humain.
            </p>
            <div className="credential-list">
              {credentials.map((credential) => (
                <div key={credential}>
                  <Sparkles aria-hidden="true" size={18} />
                  <span>{credential}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-block contact-block">
          <div className="contact-copy">
            <span className="section-kicker">Contact</span>
            <h2>Parlons de votre prochain palier</h2>
            <p>
              Quelques lignes suffisent pour commencer. Nous revenons vers vous avec une premiere
              lecture de la situation.
            </p>
            <div className="contact-stat">
              <BarChart3 aria-hidden="true" />
              <span>Reponse orientee action, pas catalogue standard.</span>
            </div>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Nom
              <input name="name" type="text" placeholder="Votre nom" required />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="vous@entreprise.com" required />
            </label>
            <label>
              Service prioritaire
              <select name="service" defaultValue="Executive coaching">
                <option>Executive coaching</option>
                <option>Formation leadership ou commercial</option>
                <option>QSE, RSE ou processus</option>
                <option>Je ne sais pas encore</option>
              </select>
            </label>
            <label>
              Message
              <textarea
                name="message"
                placeholder="Contexte, objectifs, equipe concernee, timing..."
                rows={5}
                required
              />
            </label>
            <button type="submit">
              Envoyer la demande
              <ArrowUpRight aria-hidden="true" size={18} />
            </button>
            {sent && (
              <p className="form-success" role="status">
                Merci. Le formulaire est pret cote interface. Pour une mise en production, il faudra
                connecter ce submit a votre outil email ou CRM.
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
            <h2 id="newsletter-title">Une idee terrain. Une decision plus claire.</h2>
            <p>
              Chaque mois, un point de vue court sur le leadership, la performance et la
              transformation des organisations. Sans bruit, sans theorie inutile.
            </p>
            {newsletterSent ? (
              <div className="newsletter-success" role="status">
                <CheckCircle2 aria-hidden="true" size={22} />
                <div>
                  <strong>Merci pour votre inscription.</strong>
                  <span>Le prochain brief arrive bientot dans votre boite mail.</span>
                </div>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
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
                  <button type="submit">
                    S inscrire
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </button>
                </div>
                <small>Un email par mois. Desinscription en un clic.</small>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
