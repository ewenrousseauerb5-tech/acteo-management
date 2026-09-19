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
    description:
      'Pour dirigeants, managers promus et responsables sous pression qui doivent arbitrer vite sans perdre leur posture, leur energie ou leur clarte.',
    icon: BrainCircuit,
    points: ['Seances de 90 minutes', 'Posture, decision, confiance', 'Support entre les sessions'],
    nextDate: '14 octobre 2026',
    format: 'Paris + distanciel',
  },
  {
    eyebrow: 'Commercial',
    title: 'Impact, questionnement et prise de parole',
    description:
      'Des formats courts pour transformer les interactions client: ecoute active, questions ouvertes, reformulation, pitch et histoire qui reste.',
    icon: MessageSquareQuote,
    points: ['Comites et soutenances', 'Vente consultative', 'Formats equipes 8 a 12 personnes'],
    nextDate: '6 novembre 2026',
    format: 'Vigo + intra-entreprise',
  },
  {
    eyebrow: 'Performance',
    title: 'Processus, qualite et resolution de problemes',
    description:
      'Une approche terrain pour cartographier les flux reels, nommer les pilotes, traiter les non-conformites et piloter les couts de non-qualite.',
    icon: Gauge,
    points: ['ISO 9001 et ISO 14001', '8D, AMDEC, Ishikawa', 'Tableaux de bord utiles'],
    nextDate: '19 novembre 2026',
    format: 'Classe virtuelle',
  },
  {
    eyebrow: 'RSE',
    title: 'RSE, QSE et transformation durable',
    description:
      'Diagnostic, feuille de route, formation, indicateurs et preparation aux labels ou certifications pour ancrer la responsabilite dans les pratiques.',
    icon: ShieldCheck,
    points: ['Label Engage RSE AFNOR', 'ISO 26000 et QSE', 'Communication parties prenantes'],
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
  'Audits QSE et RSE pour des groupes industriels, BTP, ingenierie et projets internationaux.',
  'Accompagnement Label Engage RSE, Responsible Steel, ISO 9001, ISO 14001 et ISO 45001.',
  'Experience operationnelle en direction projet, qualite, mobilite electrique, evenementiel et transformation commerciale.',
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
                <span className="signal-dot" />
                Conseil, coaching et formation pour leaders en mouvement
              </div>
              <h1>Faire grandir ceux qui portent vos projets</h1>
              <p>
                Acteo Management aide les dirigeants, managers et equipes projet a transformer
                les enjeux complexes en decisions claires, pratiques durables et performance
                mesurable.
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
            </div>

            <div className="hero-panel" aria-label="Acteo operating model">
              <div className="panel-topline">
                <img src="/logo-acteo.png" alt="Acteo Management" />
                <span>Executive operating system</span>
              </div>
              <div className="metric-grid">
                <div>
                  <strong>4</strong>
                  <span>offres prioritaires</span>
                </div>
                <div>
                  <strong>ISO</strong>
                  <span>QSE, RSE, processus</span>
                </div>
                <div>
                  <strong>90'</strong>
                  <span>sessions coaching</span>
                </div>
                <div>
                  <strong>10k+</strong>
                  <span>problemes resolus</span>
                </div>
              </div>
              <div className="system-lines">
                <span style={{ width: '88%' }} />
                <span style={{ width: '64%' }} />
                <span style={{ width: '74%' }} />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section-block services-block">
          <div className="section-heading">
            <span className="section-kicker">Services</span>
            <h2>Quatre leviers pour faire progresser la strategie et les personnes</h2>
            <p>
              Les offres croisent conseil, coaching et formation. Elles partent du terrain,
              structurent les pratiques et donnent aux equipes des outils utilisables des le
              lendemain.
            </p>
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
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 aria-hidden="true" size={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="courses" className="section-block course-band">
          <div>
            <span className="section-kicker">Cours et formats</span>
            <h2>Des modules courts, intensifs et directement actionnables</h2>
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
            {reviews.map((review) => (
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
            <img src="/PHOTO-2025-10-20-08-34-27.jpg" alt="Acteo Management workshop" />
          </div>
          <div className="about-copy">
            <span className="section-kicker">A propos</span>
            <h2>Une equipe hybride: direction, terrain, systemes de management et coaching</h2>
            <p>
              Laurent Rousseau et Delphine Bessot combinent experience operationnelle, formation,
              coaching de dirigeants, projets internationaux et expertise QSE/RSE. Leur difference
              tient dans le passage constant entre posture humaine et execution mesurable.
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
              Decrivez votre contexte, vos enjeux et le public concerne. Acteo peut proposer un
              diagnostic court, un parcours coaching ou un module de formation adapte.
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
