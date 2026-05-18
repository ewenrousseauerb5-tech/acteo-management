import React from 'react';
import { Linkedin, Mail, MapPin } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleNavClick = (page: Page, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 relative overflow-hidden rounded bg-white flex items-center justify-center">
                    <img 
                    src="/logo-acteo.png"
                    alt="Acteo Logo" 
                    className="w-full h-full object-cover"
                    />
                </div>
                <span className="font-bold text-2xl tracking-tight">ACTEO <span className="text-acteo font-light">Management</span></span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              Empowering businesses with tailored solutions in consulting, coaching, and training. We build success on personalized strategies and authentic connections.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/acteo-management/posts/?feedView=all" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-acteo transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:d.bessot@acteomanagement.com" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-acteo transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-acteo">Navigation</h4>
            <ul className="space-y-3">
              <li><button onClick={(e) => handleNavClick('home', e)} className="text-slate-400 hover:text-white transition-colors">Home</button></li>
              <li><button onClick={(e) => handleNavClick('about', e)} className="text-slate-400 hover:text-white transition-colors">About Us</button></li>
              <li><a href="https://laurentrousseau.youcanbook.me" className="text-slate-400 hover:text-white transition-colors">Book a Session</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-acteo">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-acteo mt-1 flex-shrink-0" />
                <span>Available for international consulting and remote coaching sessions.</span>
              </li>
              <li>
                 <a 
                    href="https://laurentrousseau.youcanbook.me" 
                    className="inline-block mt-2 text-sm text-acteo font-bold border-b border-acteo hover:text-white hover:border-white transition-colors"
                >
                    Schedule Direct Meeting
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Acteo Management. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
