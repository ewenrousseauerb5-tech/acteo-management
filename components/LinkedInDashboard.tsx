import React, { useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
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
    title: 'Mostrar una prueba real',
    detail: 'Certificacion, articulo, evento, conferencia, formacion, auditoria o mision visible.',
    evidence: "L'Usine Nouvelle: 2 548 impresiones. ISO 27001 Delphine: 24 comentarios.",
  },
  {
    title: 'Poner una persona en el centro',
    detail: 'Delphine, Laurent o ambos deben aparecer como prueba humana de la experiencia.',
    evidence: '300 abonnes: 1 603 impresiones. Sport/equilibre: 1 017 impresiones.',
  },
  {
    title: 'Contar una situacion concreta',
    detail: 'Una escena, un cliente, una tension, una transformacion o una observacion de terreno.',
    evidence: 'Prise de parole/Ines: 34,76 % de tasa de interaccion.',
  },
  {
    title: 'Vender por demostracion',
    detail: 'La oferta debe quedar implicita en el caso, la prueba o el aprendizaje.',
    evidence: 'Los posts de oferta directa quedaron en 191 y 100 impresiones.',
  },
];

const postFormulas = [
  {
    name: 'Post de autoridad',
    structure: 'Norma/riesgo + persona certificada + problema actual + impacto business + pregunta',
    example: 'ISO 27001 + Delphine + cyberattaques + confiance + “Sommes-nous prets ?”',
  },
  {
    name: 'Post de prueba social',
    structure: 'Tercero reconocido + foto prueba + lectura ACTEO + utilidad para el cliente',
    example: "L'Usine Nouvelle + articulo visible + audit a blanc + maturite d'organisation",
  },
  {
    name: 'Post de terreno',
    structure: 'Foto real + lugar/mision + observacion + principio de management',
    example: 'Canada + audit sous la neige + adaptabilite + exigence terrain',
  },
  {
    name: 'Post de transformacion',
    structure: 'Antes doloroso + trabajo realizado + cambio observable + pregunta final',
    example: 'Ines bloqueada en public speaking + repetition + confiance + trajectoire',
  },
];

const doMore = [
  'Certificaciones ISO, audit, cyber, risques y RSE estructurada.',
  'Fotos reales de mission, conference, formation, voyage o coulisses.',
  'Posts con entidades externas: presse, AFNOR, FFBB, clients, partenaires.',
  'Historias de transformacion con antes/despues claro.',
  'Mensajes humanos de comunidad: equipo, hitos, agradecimientos, deporte.',
];

const doLess = [
  'Ofertas directas tipo “me quedan plazas” sin prueba previa.',
  'Sales B2B generico sin cliente, escena ni resultado visible.',
  'RSE/environnement demasiado conceptual sin norma, evento o terreno.',
  'Imagen IA, selfie simple o foto escenificada si hay una foto real disponible.',
  'Posts largos que explican una idea pero no muestran nada concreto.',
];

const examples = [
  {
    post: "ISO 45001 / L'Usine Nouvelle",
    worked: 'Prensa + Delphine + articulo visible + audit concreto',
    lesson: 'Cada prueba externa debe convertirse en post.',
  },
  {
    post: 'ISO 27001 Delphine',
    worked: 'Certificacion personal + tema caliente + expertise claro',
    lesson: 'Las credenciales funcionan cuando estan encarnadas.',
  },
  {
    post: '300 abonnes',
    worked: 'Duo fundador + gratitud + mensaje simple',
    lesson: 'Los posts humanos alimentan alcance y confianza.',
  },
  {
    post: 'Prise de parole / Ines',
    worked: 'Historia de transformacion muy concreta',
    lesson: 'Repetir este formato, dandole una imagen fuerte.',
  },
  {
    post: 'Offres directes',
    worked: 'Rindieron bajo en alcance',
    lesson: 'Transformar ofertas en casos, diagnosticos o aprendizajes.',
  },
];

const cadence = [
  { rhythm: 'Cada semana', action: '1 post de autoridad: ISO, audit, cyber, risques, RSE structuree.' },
  { rhythm: 'Cada semana', action: '1 post de terreno: mission, formation, conference, voyage, coulisses.' },
  { rhythm: 'Cada 2 semanas', action: '1 historia de transformacion: cliente, liderazgo, prise de parole, claridad.' },
  { rhythm: 'Cada mes', action: '1 prueba social fuerte: presse, certification, evenement, partenaire, hito.' },
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
    setError('Contraseña incorrecta.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 flex items-center">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-md bg-white text-slate-950 rounded-lg p-8 shadow-xl border border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acteo/10 text-acteo text-xs font-bold uppercase tracking-wider mb-6">
            <Lock className="w-4 h-4" />
            Acceso interno
          </div>
          <h1 className="text-3xl font-bold mb-3">LinkedIn Playbook</h1>
          <p className="text-slate-600 mb-6">
            Este contenido no aparece en la web publica. Introduce la contraseña del equipo para verlo.
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
              Qué publicar para que los posts funcionen
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              La regla es simple: publicar menos ideas sueltas y mas pruebas reales. Los mejores posts muestran autoridad, personas y situaciones concretas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle icon={Sparkles} title="La regla de oro" subtitle="Usar esta formula antes de escribir cualquier post." />
          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
            <div className="text-2xl md:text-4xl font-bold text-slate-950 leading-tight">
              Prueba real + persona visible + aprendizaje accionable
            </div>
            <p className="text-slate-600 mt-4 max-w-3xl">
              Si el post no tiene al menos dos de estas tres piezas, reformularlo antes de publicar.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionTitle icon={Trophy} title="Qué repetir" subtitle="Los patrones que ya han demostrado funcionar." />
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
            <SectionTitle icon={CheckCircle2} title="Hacer más" />
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
            <SectionTitle icon={AlertTriangle} title="Hacer menos" />
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
          <SectionTitle icon={ClipboardCheck} title="Fórmulas listas para usar" subtitle="Cuatro plantillas para convertir ideas en posts publicables." />
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
          <SectionTitle icon={Camera} title="Regla para las imágenes" subtitle="Elegir la imagen como prueba, no como decoración." />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4">
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-950 mb-2">Mejor opcion</h3>
              <p className="text-slate-600">Persona real en contexto profesional: conferencia, auditoria, formacion, cliente, articulo o terreno.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-950 mb-2">Opcion aceptable</h3>
              <p className="text-slate-600">Carrusel tecnico o visual metaforico solo si refuerza exactamente la idea del post.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-950 mb-2">Evitar</h3>
              <p className="text-slate-600">Imagen IA, selfie simple o foto escenificada cuando haya una prueba real disponible.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8">
          <div>
            <SectionTitle icon={BarChart3} title="Ejemplos que justifican las reglas" subtitle="Solo los aprendizajes utiles para decidir proximos posts." />
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
            <SectionTitle icon={ClipboardCheck} title="Cadencia" />
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
