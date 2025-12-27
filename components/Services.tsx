import React from 'react';
import { TrendingUp, Users, Brain, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: "Consulting",
      description: "We design strategic solutions tailored to your unique goals. From operational efficiency to market expansion, we help you chart the path forward.",
      icon: TrendingUp
    },
    {
      title: "Coaching & Training",
      description: "Transformational sessions designed to accelerate growth. We unlock leadership potential and enhance team dynamics through proven methodologies.",
      icon: Users
    },
    {
      title: "Digital Courses",
      description: "Self-paced programs on key topics like meditation, maintaining focus, and personal productivity. Learn at your own pace, anywhere.",
      icon: Brain
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-acteo/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-acteo font-bold tracking-widest uppercase text-sm mb-4">Comprehensive Solutions</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Our Expertise</h3>
          <p className="text-slate-600 text-lg">
            We combine executive-level strategy with human-centric coaching to elevate every aspect of your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-acteo/30 relative overflow-hidden"
            >
              <div className="w-14 h-14 bg-acteo/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-acteo group-hover:text-white transition-colors">
                <service.icon className="w-7 h-7 text-acteo group-hover:text-white transition-colors" />
              </div>

              <h4 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed mb-8">{service.description}</p>

              <div className="flex items-center text-acteo font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                Learn more <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
             <a 
              href="https://laurentrousseau.youcanbook.me" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-acteo transition-all shadow-lg"
            >
              Start Your Transformation
            </a>
        </div>

      </div>
    </section>
  );
};

export default Services;