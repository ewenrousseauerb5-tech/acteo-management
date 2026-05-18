import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  BarChart3,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  MessageCircle,
  MousePointerClick,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface PostMetric {
  id: number;
  title: string;
  date: string;
  family: string;
  image: string;
  impressions: number;
  interactions: number;
  rate: number;
  ctr: number;
  reactions: number;
  comments: number;
  shares: number;
  why: string;
}

interface FamilyMetric {
  label: string;
  posts: number;
  totalImpressions: number;
  avgRate: number;
  insight: string;
}

const topReach: PostMetric[] = [
  {
    id: 7,
    title: "ISO 45001 / L'Usine Nouvelle",
    date: '11 avril',
    family: 'Preuve sociale presse',
    image: 'Delphine + article visible',
    impressions: 2548,
    interactions: 201,
    rate: 7.89,
    ctr: 4.79,
    reactions: 70,
    comments: 6,
    shares: 3,
    why: 'Presse reconnue, visage identifiable, audit concret.',
  },
  {
    id: 20,
    title: 'Certification ISO 27001 Delphine',
    date: '26 janvier',
    family: 'Autorite technique',
    image: 'Portrait Delphine',
    impressions: 1713,
    interactions: 201,
    rate: 11.73,
    ctr: 7.12,
    reactions: 55,
    comments: 24,
    shares: 0,
    why: 'Certification personnelle, cybersecurite, forte credibilite.',
  },
  {
    id: 13,
    title: '300 abonnes',
    date: '10 mars',
    family: 'Communaute',
    image: 'Laurent + Delphine',
    impressions: 1603,
    interactions: 127,
    rate: 7.92,
    ctr: 4.68,
    reactions: 49,
    comments: 1,
    shares: 2,
    why: 'Duo fondateur, gratitude, message simple et humain.',
  },
  {
    id: 3,
    title: 'Sport / sante au travail',
    date: '2 mai',
    family: 'Humain lifestyle',
    image: 'Entrainement gym',
    impressions: 1017,
    interactions: 78,
    rate: 7.67,
    ctr: 6.49,
    reactions: 12,
    comments: 0,
    shares: 0,
    why: 'Sujet accessible, photo humaine, lien performance durable.',
  },
  {
    id: 16,
    title: 'Canada / bienveillance',
    date: '23 fevrier',
    family: 'Voyage + management',
    image: 'Delphine aux chutes',
    impressions: 659,
    interactions: 55,
    rate: 8.35,
    ctr: 4.86,
    reactions: 22,
    comments: 1,
    shares: 0,
    why: 'Voyage, personne visible, valeur de management universelle.',
  },
];

const topIntensity: PostMetric[] = [
  {
    id: 1,
    title: 'ISO 14001 carrousel',
    date: '12 mai',
    family: 'Carrousel technique',
    image: 'Carrousel ISO',
    impressions: 104,
    interactions: 64,
    rate: 61.54,
    ctr: 55.77,
    reactions: 6,
    comments: 0,
    shares: 0,
    why: 'Petit public, mais audience tres qualifiee et fort clic.',
  },
  {
    id: 8,
    title: 'Prise de parole / Ines',
    date: 'date a completer',
    family: 'Storytelling transformation',
    image: 'Laurent en conference',
    impressions: 187,
    interactions: 65,
    rate: 34.76,
    ctr: 28.34,
    reactions: 11,
    comments: 0,
    shares: 1,
    why: 'Tension personnelle, avant/apres, resultat de carriere.',
  },
  {
    id: 9,
    title: 'Prendre de la hauteur',
    date: '31 mars',
    family: 'Positionnement',
    image: 'Delphine en montgolfiere',
    impressions: 249,
    interactions: 40,
    rate: 16.06,
    ctr: 12.05,
    reactions: 10,
    comments: 0,
    shares: 0,
    why: 'Metaphore texte-image tres claire.',
  },
  {
    id: 19,
    title: 'FFBB / conference RSE',
    date: '4 fevrier',
    family: 'Evenement externe',
    image: 'Delphine en conference',
    impressions: 426,
    interactions: 61,
    rate: 14.32,
    ctr: 9.62,
    reactions: 17,
    comments: 3,
    shares: 0,
    why: 'Evenement, scene, organisme externe, commentaires.',
  },
  {
    id: 11,
    title: 'Audit international',
    date: '16 mars',
    family: 'Terrain international',
    image: 'Delphine au Canada',
    impressions: 190,
    interactions: 24,
    rate: 12.63,
    ctr: 7.37,
    reactions: 9,
    comments: 1,
    shares: 0,
    why: 'Mission terrain, contexte international, adaptabilite.',
  },
];

const families: FamilyMetric[] = [
  {
    label: 'Preuve sociale externe',
    posts: 3,
    totalImpressions: 3436,
    avgRate: 11.4,
    insight: 'Presse, FFBB, AFNOR et certifications tirent la confiance vers le haut.',
  },
  {
    label: 'Autorite technique ISO',
    posts: 3,
    totalImpressions: 2374,
    avgRate: 27.8,
    insight: 'Tres fort quand la norme est incarnee par une personne ou un resultat.',
  },
  {
    label: 'Humain et communaute',
    posts: 5,
    totalImpressions: 4231,
    avgRate: 8.7,
    insight: 'Ouvre l’audience et rend ACTEO plus memorisable.',
  },
  {
    label: 'Storytelling qualifiant',
    posts: 3,
    totalImpressions: 685,
    avgRate: 20.2,
    insight: 'Moins de portee, mais clics et attention tres eleves.',
  },
  {
    label: 'Sales B2B generique',
    posts: 4,
    totalImpressions: 647,
    avgRate: 8.9,
    insight: 'Doit etre rattache a une scene, un client ou une preuve pour decoller.',
  },
  {
    label: 'Offre directe',
    posts: 2,
    totalImpressions: 291,
    avgRate: 9,
    insight: 'Faible portee. Vendre par demonstration fonctionne mieux.',
  },
];

const visualPatterns = [
  {
    title: 'Photos reelles + preuve visible',
    score: 'Meilleur reach',
    detail: "Article, conference, certification ou mission visible dans l'image.",
  },
  {
    title: 'Personnes identifiables',
    score: 'Meilleure memorisation',
    detail: 'Delphine, Laurent ou le duo fondateur rendent la page plus humaine.',
  },
  {
    title: 'Metaphore tres lisible',
    score: 'Bon clic',
    detail: 'La montgolfiere a bien porte le message “prendre de la hauteur”.',
  },
  {
    title: 'IA / selfie / mise en scene',
    score: 'Plus faible',
    detail: 'Moins de contexte, moins de preuve, moins de portee observee.',
  },
];

const formulas = [
  {
    title: 'Autorite technique',
    formula: 'Norme ou risque + personne certifiee + enjeu concret + consequence business',
    example: 'ISO 27001 + Delphine + cyberattaques + confiance et continuite.',
  },
  {
    title: 'Preuve sociale',
    formula: 'Tiers reconnu + photo preuve + ce que cela change pour les clients',
    example: "L'Usine Nouvelle + article visible + audit a blanc comme levier de maturite.",
  },
  {
    title: 'Story client',
    formula: 'Situation difficile + travail mene + bascule observable + question finale',
    example: 'Ines avant la scene, repetition, prise de confiance, trajectoire acceleree.',
  },
  {
    title: 'Terrain humain',
    formula: 'Photo reelle + observation de mission + apprentissage managerial',
    example: 'Canada, bienveillance, culture d’entreprise, performance durable.',
  },
];

const avoid = [
  'Offre directe sans preuve ni histoire',
  'Concept RSE abstrait sans terrain',
  'Sales B2B generique sans scene client',
  'Image IA quand une photo reelle existe',
];

const formatNumber = (value: number) => value.toLocaleString('fr-FR');
const formatPercent = (value: number) => `${value.toFixed(2).replace('.', ',')} %`;
const DASHBOARD_PASSWORD = 'insights';
const DASHBOARD_SESSION_KEY = 'acteo-linkedin-dashboard-access';

const Stat: React.FC<{ icon: React.ElementType; label: string; value: string; note: string }> = ({ icon: Icon, label, value, note }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
    <div className="flex items-center justify-between mb-5">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <Icon className="w-5 h-5 text-acteo" />
    </div>
    <div className="text-3xl font-bold text-slate-950">{value}</div>
    <p className="text-sm text-slate-500 mt-2">{note}</p>
  </div>
);

const PostRow: React.FC<{ post: PostMetric; max: number; rank: number; metric: 'impressions' | 'rate' }> = ({ post, max, rank, metric }) => {
  const value = metric === 'impressions' ? post.impressions : post.rate;
  const width = Math.max(7, (value / max) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[36px_1.4fr_1fr_150px] gap-4 items-center py-4 border-b border-slate-200 last:border-b-0">
      <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">{rank}</div>
      <div>
        <h4 className="font-bold text-slate-950">{post.title}</h4>
        <p className="text-sm text-slate-500">{post.date} · {post.family} · {post.image}</p>
        <p className="text-sm text-slate-600 mt-1">{post.why}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <span className="block text-slate-400">Impr.</span>
          <strong>{formatNumber(post.impressions)}</strong>
        </div>
        <div>
          <span className="block text-slate-400">Taux</span>
          <strong>{formatPercent(post.rate)}</strong>
        </div>
        <div>
          <span className="block text-slate-400">Clics</span>
          <strong>{post.ctr.toFixed(1).replace('.', ',')} %</strong>
        </div>
      </div>
      <div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-acteo rounded-full" style={{ width: `${width}%` }}></div>
        </div>
        <div className="flex gap-3 text-xs text-slate-500 mt-2">
          <span>{post.reactions} reactions</span>
          <span>{post.comments} com.</span>
          <span>{post.shares} part.</span>
        </div>
      </div>
    </div>
  );
};

const LinkedInDashboard: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(DASHBOARD_SESSION_KEY) === 'granted';
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      window.sessionStorage.setItem(DASHBOARD_SESSION_KEY, 'granted');
      setIsUnlocked(true);
      setError('');
      return;
    }
    setError('Contraseña incorrecta.');
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-24 flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-md bg-white text-slate-950 rounded-lg p-8 shadow-xl border border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acteo/10 text-acteo text-xs font-bold uppercase tracking-wider mb-6">
              <BarChart3 className="w-4 h-4" />
              Acceso interno
            </div>
            <h1 className="text-3xl font-bold mb-3">LinkedIn Insights</h1>
            <p className="text-slate-600 mb-6">
              Este dashboard no aparece en la web publica. Introduce la contraseña del equipo para verlo.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="linkedin-password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Contraseña
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
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const maxReach = Math.max(...topReach.map((post) => post.impressions));
  const maxRate = Math.max(...topIntensity.map((post) => post.rate));
  const maxFamily = Math.max(...families.map((family) => family.totalImpressions));

  return (
    <div className="bg-slate-50 min-h-screen pt-24">
      <section className="bg-slate-950 text-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acteo/15 text-acteo text-xs font-bold uppercase tracking-wider mb-6">
              <BarChart3 className="w-4 h-4" />
              LinkedIn Insights · 20 posts
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Lo que realmente hace funcionar los posts de ACTEO
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
              La combinacion ganadora es clara: autoridad demostrable, persona visible y una historia concreta. Cuando falta una de esas piezas, el alcance y la calidad de interaccion caen.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Stat icon={Eye} label="Posts analizados" value="20" note="Enero a mayo 2026" />
          <Stat icon={Trophy} label="Post con mas alcance" value="2 548" note="ISO 45001 + prensa" />
          <Stat icon={MousePointerClick} label="Mayor CTR" value="55,77 %" note="Carrousel ISO 14001" />
          <Stat icon={MessageCircle} label="Mas comentarios" value="24" note="ISO 27001 Delphine" />
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-acteo" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">Top por alcance</h2>
                  <p className="text-sm text-slate-500">Los posts que mas distribuyo LinkedIn.</p>
                </div>
              </div>
              {topReach.map((post, index) => (
                <PostRow key={post.id} post={post} max={maxReach} rank={index + 1} metric="impressions" />
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <MousePointerClick className="w-6 h-6 text-acteo" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">Top por intensidad</h2>
                  <p className="text-sm text-slate-500">Tasa de interaccion y clics, no solo volumen.</p>
                </div>
              </div>
              {topIntensity.map((post, index) => (
                <PostRow key={post.id} post={post} max={maxRate} rank={index + 1} metric="rate" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Familias de contenido</h2>
              <p className="text-slate-600 mt-2">Agrupacion editorial para decidir que publicar mas y que reducir.</p>
            </div>
            <div className="text-sm text-slate-500">Ordenado por impresiones totales</div>
          </div>

          <div className="space-y-4">
            {families.map((family) => (
              <div key={family.label} className="grid grid-cols-1 lg:grid-cols-[260px_1fr_130px] gap-4 items-center border border-slate-200 rounded-lg p-4">
                <div>
                  <h3 className="font-bold text-slate-950">{family.label}</h3>
                  <p className="text-sm text-slate-500">{family.posts} posts · tasa media {formatPercent(family.avgRate)}</p>
                </div>
                <div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full" style={{ width: `${Math.max(6, (family.totalImpressions / maxFamily) * 100)}%` }}></div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{family.insight}</p>
                </div>
                <div className="lg:text-right">
                  <div className="text-2xl font-bold text-slate-950">{formatNumber(family.totalImpressions)}</div>
                  <div className="text-xs text-slate-500">impresiones</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-6 h-6 text-acteo" />
              <h2 className="text-3xl font-bold text-slate-950">Lo visual importa</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visualPatterns.map((pattern) => (
                <div key={pattern.title} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-acteo mb-3">{pattern.score}</div>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">{pattern.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{pattern.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 text-white rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-acteo" />
              <h2 className="text-3xl font-bold">Formula ganadora</h2>
            </div>
            <div className="text-2xl md:text-3xl font-bold leading-snug mb-6">
              Situacion real + persona visible + prueba de expertise + aprendizaje claro + pregunta final
            </div>
            <p className="text-slate-300 leading-relaxed">
              El contenido debe vender por demostracion. Cuando ACTEO muestra una prueba real de competencia, la venta queda implicita y la audiencia responde mejor.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <ClipboardCheck className="w-6 h-6 text-acteo" />
            <h2 className="text-3xl font-bold text-slate-950">Formulas reutilizables</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {formulas.map((item) => (
              <div key={item.title} className="border border-slate-200 rounded-lg p-5">
                <h3 className="font-bold text-slate-950 mb-3">{item.title}</h3>
                <p className="text-sm font-semibold text-acteo leading-relaxed mb-4">{item.formula}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-acteo" />
              <h2 className="text-2xl font-bold text-slate-950">Cadencia recomendada</h2>
            </div>
            <div className="space-y-4 text-slate-700">
              <p><strong>1 post experto por semana:</strong> ISO, audit, cyber, risques, RSE structuree.</p>
              <p><strong>1 post terrain por semana:</strong> mission, conference, formation, voyage, coulisses.</p>
              <p><strong>1 storytelling cada dos semanas:</strong> transformation client, prise de parole, leadership.</p>
              <p><strong>1 preuve sociale al mes:</strong> presse, certification, evenement, partenaire, milestone.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-slate-950">Reducir o reformular</h2>
            </div>
            <div className="space-y-3">
              {avoid.map((item) => (
                <div key={item} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-2 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinkedInDashboard;
