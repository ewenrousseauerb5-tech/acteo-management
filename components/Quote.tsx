import React from 'react';
import { Quote as QuoteIcon } from 'lucide-react';

const Quote: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
         <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-acteo rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        <QuoteIcon className="w-16 h-16 text-acteo/30 mx-auto mb-8" />
        
        <blockquote className="text-3xl md:text-5xl font-serif italic text-white leading-tight max-w-5xl mx-auto mb-10">
          "Beyond services, we build trusted relationships that drive meaningful change."
        </blockquote>
        
        <div className="w-24 h-1 bg-acteo mx-auto rounded-full"></div>
      </div>
    </section>
  );
};

export default Quote;