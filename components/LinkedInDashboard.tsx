import React, { useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Lock,
  Sparkles,
  Trophy,
} from 'lucide-react';

const DASHBOARD_PASSWORD = 'insights';
const DASHBOARD_SESSION_KEY = 'acteo-linkedin-dashboard-access';

const winningRules = [
  {
    title: 'Montrer une preuve réelle',
    detail: 'Certification, article, événement, conférence, formation, audit ou mission visible.',
    evidence: "L'Usine Nouvelle : 2 548 impressions. ISO 27001 Delphine : 24 commentaires.",
  },
  {
    title: 'Mettre une personne au centre',
    detail: "Delphine, Laurent ou le duo doivent apparaître comme preuve humaine de l'expertise.",
    evidence: '300 abonnés : 1 603 impressions. Sport/équilibre : 1 017 impressions.',
  },
  {
    title: 'Raconter une situation concrète',
    detail: 'Une scène, un client, une tension, une transformation ou une observation terrain.',
    evidence: 'Prise de parole/Inès : 34,76 % de taux d’interaction.',
  },
  {
    title: 'Vendre par démonstration',
    detail: "L'offre doit être implicite dans le cas, la preuve ou l'apprentissage.",
    evidence: 'Les posts d’offre directe sont restés à 191 et 100 impressions.',
  },
];

const postFormulas = [
  {
    name: "Post d'autorité",
    structure: 'Norme/risque + personne certifiée + problème actuel + impact business + question',
    example: 'ISO 27001 + Delphine + cyberattaques + confiance + “Sommes-nous prêts ?”',
  },
  {
    name: 'Post de preuve sociale',
    structure: 'Tiers reconnu + photo preuve + lecture ACTEO + utilité pour le client',
    example: "L'Usine Nouvelle + article visible + audit à blanc + maturité d'organisation",
  },
  {
    name: 'Post terrain',
    structure: 'Photo réelle + lieu/mission + observation + principe de management',
    example: 'Canada + audit sous la neige + adaptabilité + exigence terrain',
  },
  {
    name: 'Post transformation',
    structure: 'Avant douloureux + travail réalisé + changement observable + question finale',
    example: 'Inès bloquée en public speaking + répétition + confiance + trajectoire',
  },
];

const doMore = [
  'Certifications ISO, audit, cyber, risques et RSE structurée.',
  'Photos réelles de mission, conférence, formation, voyage ou coulisses.',
  'Posts avec tiers externes : presse, AFNOR, FFBB, clients, partenaires.',
  'Histoires de transformation avec un avant/après clair.',
  'Messages humains de communauté : équipe, jalons, remerciements, sport.',
];

const doLess = [
  'Offres directes type “il reste des places” sans preuve préalable.',
  'Sales B2B générique sans client, scène ni résultat visible.',
  'RSE/environnement trop conceptuel sans norme, événement ou terrain.',
  'Image IA, selfie simple ou photo trop mise en scène si une vraie photo existe.',
  'Posts longs qui expliquent une idée mais ne montrent rien de concret.',
];

const examples = [
  {
    post: "ISO 45001 / L'Usine Nouvelle",
    worked: 'Presse + Delphine + article visible + audit concret',
    lesson: 'Chaque preuve externe doit devenir un post.',
  },
  {
    post: 'ISO 27001 Delphine',
    worked: 'Certification personnelle + sujet chaud + expertise claire',
    lesson: 'Les crédentials fonctionnent quand ils sont incarnés.',
  },
  {
    post: '300 abonnés',
    worked: 'Duo fondateur + gratitude + message simple',
    lesson: 'Les posts humains nourrissent portée et confiance.',
  },
  {
    post: 'Prise de parole / Inès',
    worked: 'Histoire de transformation très concrète',
    lesson: 'Répéter ce format avec une image forte.',
  },
  {
    post: 'Offres directes',
    worked: 'Portée faible',
    lesson: 'Transformer les offres en cas, diagnostics ou apprentissages.',
  },
];

const cadence = [
  { rhythm: 'Chaque semaine', action: '1 post d’autorité : ISO, audit, cyber, risques, RSE structurée.' },
  { rhythm: 'Chaque semaine', action: '1 post terrain : mission, formation, conférence, voyage, coulisses.' },
  { rhythm: 'Toutes les 2 semaines', action: '1 histoire de transformation : client, leadership, prise de parole, clarté.' },
  { rhythm: 'Chaque mois', action: '1 preuve sociale forte : presse, certification, événement, partenaire, jalon.' },
];

const dayRecommendations = [
  {
    day: 'Mardi',
    role: 'Jour à tester en priorité',
    reason: 'Bon créneau pour posts experts et carrousels techniques. Vos données montrent un très fort taux sur le carrousel ISO 14001.',
  },
  {
    day: 'Mercredi',
    role: 'Jour B2B le plus naturel',
    reason: 'Bon compromis pour événements, RSE structurée et contenus pédagogiques. Les benchmarks LinkedIn placent souvent mardi-jeudi en tête.',
  },
  {
    day: 'Jeudi',
    role: 'Jour de répétition',
    reason: 'À utiliser pour posts terrain, management et storytelling. Bon jour pour comparer avec mardi/mercredi.',
  },
  {
    day: 'Lundi',
    role: 'À garder pour annonces fortes',
    reason: 'Chez ACTEO, les annonces de certification et d’autorité ont bien performé le lundi. À réserver aux posts solides.',
  },
  {
    day: 'Samedi',
    role: 'Uniquement si preuve très forte',
    reason: "Le post L'Usine Nouvelle a très bien marché un samedi, mais c'est surtout la preuve sociale qui a porté la performance.",
  },
];

const AccessGate: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      window.sessionStorage.setItem(DASHBOARD_SESSION_KEY, 'granted');
      window.scrollTo(0, 0);
      onUnlock();
      return;
    }
    setError('Mot de passe incorrect.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 flex items-center">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-md bg-white text-slate-950 rounded-lg p-8 shadow-xl border border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acteo/10 text-acteo text-xs font-bold uppercase tracking-wider mb-6">
            <Lock className="w-4 h-4" />
            Accès interne
          </div>
          <h1 className="text-3xl font-bold mb-3">LinkedIn Playbook</h1>
          <p className="text-slate-600 mb-6">
            Ce contenu n’apparaît pas sur le site public. Entrez le mot de passe de l’équipe pour y accéder.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="linkedin-password" className="block text-sm font-semibold text-slate-700 mb-2">
                Mot de passe
              </label>
              <input
                id="linkedin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-acteo focus:ring-2 focus:ring-acteo/20"
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-acteo hover:bg-acteo-dark text-white font-bold rounded-lg px-4 py-3 transition-colors"
            >
              Entrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const SectionTitle: React.FC<{ icon: React.ElementType; title: string; subtitle?: string }> = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="w-10 h-10 rounded-lg bg-acteo/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-acteo" />
    </div>
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-950">{title}</h2>
      {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const LinkedInDashboard: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(DASHBOARD_SESSION_KEY) === 'granted';
  });

  if (!isUnlocked) {
    return <AccessGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24">
      <section className="bg-slate-950 text-white py-14">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acteo/15 text-acteo text-xs font-bold uppercase tracking-wider mb-5">
              <BarChart3 className="w-4 h-4" />
              LinkedIn Playbook · ACTEO
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Que publier pour que les posts fonctionnent
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              La règle est simple : publier moins d’idées isolées et plus de preuves réelles. Les meilleurs posts montrent une autorité, des personnes et des situations concrètes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle icon={Sparkles} title="La règle d’or" subtitle="À vérifier avant d’écrire ou de publier." />
          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
            <div className="text-2xl md:text-4xl font-bold text-slate-950 leading-tight">
              Preuve réelle + personne visible + apprentissage actionnable
            </div>
            <p className="text-slate-600 mt-4 max-w-3xl">
              Si le post ne contient pas au moins deux de ces trois éléments, il faut le reformuler avant publication.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle icon={Trophy} title="À répéter" subtitle="Les patterns qui ont déjà prouvé leur efficacité." />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {winningRules.map((rule) => (
              <div key={rule.title} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950 mb-3">{rule.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{rule.detail}</p>
                <p className="text-sm font-semibold text-acteo leading-relaxed">{rule.evidence}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <SectionTitle icon={CheckCircle2} title="Faire davantage" />
            <div className="space-y-3">
              {doMore.map((item) => (
                <div key={item} className="flex gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <CheckCircle2 className="w-5 h-5 text-acteo flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle icon={AlertTriangle} title="Faire moins" />
            <div className="space-y-3">
              {doLess.map((item) => (
                <div key={item} className="flex gap-3 bg-amber-50 border border-amber-100 rounded-lg p-4">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle icon={ClipboardCheck} title="Formules prêtes à utiliser" subtitle="Quatre modèles pour transformer une idée en post publiable." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postFormulas.map((formula) => (
              <div key={formula.name} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950 mb-3">{formula.name}</h3>
                <p className="text-acteo font-semibold leading-relaxed mb-4">{formula.structure}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{formula.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle icon={Camera} title="Règle pour les images" subtitle="Choisir l’image comme preuve, pas comme décoration." />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4">
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-950 mb-2">Meilleure option</h3>
              <p className="text-slate-600">Personne réelle en contexte professionnel : conférence, audit, formation, client, article ou terrain.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-950 mb-2">Option acceptable</h3>
              <p className="text-slate-600">Carrousel technique ou visuel métaphorique seulement s’il renforce exactement l’idée du post.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-950 mb-2">À éviter</h3>
              <p className="text-slate-600">Image IA, selfie simple ou photo mise en scène quand une vraie preuve visuelle existe.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle icon={CalendarDays} title="Quand publier ?" subtitle="Croiser les données ACTEO avec les benchmarks LinkedIn B2B." />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {dayRecommendations.map((item) => (
              <div key={item.day} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <div className="text-acteo text-sm font-bold uppercase tracking-wider mb-2">{item.role}</div>
                <h3 className="text-xl font-bold text-slate-950 mb-3">{item.day}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.reason}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-slate-950 text-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Recommandation opérationnelle</h3>
            <p className="text-slate-200 leading-relaxed">
              Tester en priorité mardi, mercredi et jeudi entre 9h et 12h. Garder le lundi pour les annonces d’autorité fortes. Ne publier le samedi que si le post contient une preuve sociale exceptionnelle.
            </p>
            <p className="text-xs text-slate-400 mt-4">
              Benchmarks consultés : Sprout Social 2026, Buffer 2025, Hootsuite. Le meilleur horaire reste à valider avec les données propres d’ACTEO.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8">
          <div>
            <SectionTitle icon={BarChart3} title="Exemples qui justifient les règles" subtitle="Uniquement les apprentissages utiles pour décider les prochains posts." />
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              {examples.map((example) => (
                <div key={example.post} className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr] gap-3 p-5 border-b border-slate-200 last:border-b-0">
                  <h3 className="font-bold text-slate-950">{example.post}</h3>
                  <p className="text-sm text-slate-600">{example.worked}</p>
                  <p className="text-sm font-semibold text-acteo">{example.lesson}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle icon={ClipboardCheck} title="Cadence" />
            <div className="bg-slate-950 text-white rounded-lg p-6">
              <div className="space-y-5">
                {cadence.map((item) => (
                  <div key={`${item.rhythm}-${item.action}`} className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                    <div className="text-acteo text-sm font-bold uppercase tracking-wider mb-1">{item.rhythm}</div>
                    <p className="text-slate-200 leading-relaxed">{item.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinkedInDashboard;
