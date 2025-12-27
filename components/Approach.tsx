import React from 'react';
import { Diamond, Handshake, Target } from 'lucide-react';
import { ApproachItem } from '../types';

const Approach: React.FC = () => {
  const approaches: ApproachItem[] = [
    {
      title: "Exclusivity",
      description: "We don't do 'one size fits all'. We design unique, customized experiences for each client ensuring that our solution fits your exact context.",
      icon: Diamond
    },
    {
      title: "Connection",
      description: "We work with you as true strategic partners. Our relationship is built on trust, transparency, and a deep understanding of your vision.",
      icon: Handshake
    },
    {
      title: "Impact",
      description: "Everything we do is focused on delivering real, measurable results. We focus on outcomes that move the needle for your business.",
      icon: Target
    }
  ];

  return (
    <section id="approach" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
            {/* Content Side */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <div className="max-w-2xl mb-12">
                    <h2 className="text-acteo font-bold tracking-widest uppercase text-sm mb-4">Why Choose Us</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Approach</h3>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        We combine executive-level strategy with human-centric coaching. Our methodology is rooted in the belief that sustainable success comes from aligning business goals with personal values.
                    </p>
                </div>

                <div className="space-y-8">
                    {approaches.map((item, index) => (
                        <div key={index} className="flex gap-4 group">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-acteo group-hover:bg-acteo group-hover:text-white transition-colors duration-300">
                                    <item.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Side - New Visual Addition */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-acteo/10 rounded-full blur-3xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                     <img
                        src="/PHOTO-2025-10-20-08-34-51.jpg"
                        alt="Team collaboration and strategy"
                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <p className="font-bold text-lg">Strategic Alignment</p>
                        <p className="text-acteo-light text-sm">Paris & International</p>
                    </div>
                </div>
            </div>
        </div>
        
        {/* CTA Box */}
        <div className="mt-20 text-center">
            <div className="inline-block bg-slate-900 p-8 rounded-3xl shadow-2xl relative overflow-hidden group w-full max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-acteo opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Ready to take the next step?</h3>
                        <p className="text-slate-400">
                            Transform your business strategy today.
                        </p>
                    </div>
                    <a 
                        href="https://laurentrousseau.youcanbook.me" 
                        target="_blank"
                        rel="noreferrer"
                        className="flex-shrink-0 px-8 py-3 bg-acteo text-white font-bold rounded-full hover:bg-white hover:text-acteo transition-all shadow-[0_0_15px_rgba(95,191,144,0.4)]"
                    >
                        Schedule Your Session
                    </a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;