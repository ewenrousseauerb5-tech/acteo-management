import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.92)), url('/acteo1.png')"
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center md:text-left">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acteo/10 border border-acteo/20 text-acteo text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            Business Consulting & Services
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
            Empowering Business <br/>
            With <span className="text-transparent bg-clip-text bg-gradient-to-r from-acteo to-acteo-light">Tailored Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed">
            We design strategic solutions, transformational coaching, and digital courses to accelerate your personal and professional growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://laurentrousseau.youcanbook.me" 
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-acteo hover:bg-acteo-dark text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(95,191,144,0.3)] hover:shadow-[0_0_30px_rgba(95,191,144,0.5)] flex items-center justify-center gap-2"
            >
              Schedule a Session
              <ChevronRight className="w-5 h-5" />
            </a>
            <a 
              href="#overview" 
              className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white rounded-full font-semibold text-lg transition-all flex items-center justify-center"
            >
              Explore Our Approach
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-acteo rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;