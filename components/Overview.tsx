import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Overview: React.FC = () => {
  const points = [
    "Personalized strategies tailored to your specific needs.",
    "High-value training that delivers measurable skills.",
    "A commitment to professionalism and authenticity.",
  ];

  return (
    <section id="overview" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image/Visual Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-acteo/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-900/5 rounded-full blur-2xl"></div>
            <img
              src="/PHOTO-2025-10-20-08-34-27.jpg"
              alt="Strategic Meeting"
              className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
            />
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
              <p className="text-acteo font-bold text-4xl mb-1">100%</p>
              <p className="text-slate-600 text-sm font-medium uppercase tracking-wide">Commitment to Impact</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-acteo font-bold tracking-widest uppercase text-sm mb-4">Who We Are</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Success is built on strategy, authenticity, and action.
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              At Acteo Management, we believe that true growth happens when potential meets preparation. We empower businesses and leaders with the tools they need to navigate complexity and achieve sustainable success.
            </p>

            <div className="space-y-4">
              {points.map((point, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-acteo flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium text-lg">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;