import React from 'react';
import { Award, Heart, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-white">
      {/* Header Section */}
      <div className="container mx-auto px-6 lg:px-12 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Meet the <span className="text-acteo">Partners</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Driving transformation through experience, empathy, and executive excellence.
        </p>
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Section - Founders */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-acteo rounded-2xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-slate-900 rounded-2xl -rotate-2 opacity-10 group-hover:-rotate-3 transition-transform duration-500"></div>
            
            {/* The Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
               <img 
                src="./founders.jpg" 
                alt="Laurent Trousseau and Partner" 
                className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-8 text-white">
                <p className="font-bold text-xl">Laurent Trousseau & Co-Founder</p>
                <p className="text-acteo text-sm font-medium uppercase tracking-wider">Executive Partners</p>
              </div>
            </div>
          </div>

          {/* Bio/Content Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              More than consultants. <br/>
              We are <span className="text-decoration-line-through text-slate-400">advisors</span> <span className="text-acteo">allies</span>.
            </h2>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                At Acteo Management, we believe that true leadership isn't just about strategy—it's about the people behind it. With decades of combined experience in executive management and personal development, we bridge the gap between corporate performance and human potential.
              </p>
              <p>
                Our journey began with a simple realization: businesses thrive when their leaders are balanced, focused, and authentically connected to their purpose.
              </p>
              <p>
                Whether we are facilitating a workshop in a corporate boardroom or guiding a one-on-one coaching session, our energy is dedicated to your growth.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 border-t border-slate-100 pt-10">
              <div className="text-center md:text-left">
                <Award className="w-8 h-8 text-acteo mb-3 mx-auto md:mx-0" />
                <h4 className="font-bold text-slate-900">Excellence</h4>
                <p className="text-sm text-slate-500">High standards in every interaction.</p>
              </div>
              <div className="text-center md:text-left">
                <Heart className="w-8 h-8 text-acteo mb-3 mx-auto md:mx-0" />
                <h4 className="font-bold text-slate-900">Empathy</h4>
                <p className="text-sm text-slate-500">Understanding the human element.</p>
              </div>
              <div className="text-center md:text-left">
                <Lightbulb className="w-8 h-8 text-acteo mb-3 mx-auto md:mx-0" />
                <h4 className="font-bold text-slate-900">Vision</h4>
                <p className="text-sm text-slate-500">Strategic foresight for the future.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;