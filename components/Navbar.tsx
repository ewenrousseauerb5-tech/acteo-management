import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'about';
  onNavigate: (page: 'home' | 'about') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force black text on Navbar if we are on the About page (since it has a white background, not an image hero)
  const isDarkText = isScrolled || currentPage === 'about';

  const handleNavClick = (page: 'home' | 'about', e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const ctaLink = "https://laurentrousseau.youcanbook.me";

  // No internal section links — site exposes only Home and About pages

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || currentPage === 'about' ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick('home', e)}
          className="flex items-center gap-2 group"
        >
          <div className="w-12 h-12 relative overflow-hidden rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100">
             <img 
               src="/logo-acteo.png"
               alt="Acteo Management Logo" 
               className="w-full h-full object-cover"
             />
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors ${isDarkText ? 'text-slate-900' : 'text-white'}`}>
            ACTEO <span className="text-acteo font-light">Management</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={(e) => handleNavClick('home', e)}
            className={`text-sm font-medium transition-colors hover:text-acteo ${
              currentPage === 'home' && !isDarkText ? 'text-white font-bold' : ''
            } ${
              currentPage === 'home' && isDarkText ? 'text-acteo font-bold' : ''
            } ${
              currentPage !== 'home' ? (isDarkText ? 'text-slate-600' : 'text-slate-200') : ''
            }`}
          >
            Home
          </button>
          
          <button
            onClick={(e) => handleNavClick('about', e)}
            className={`text-sm font-medium transition-colors hover:text-acteo ${
              currentPage === 'about' ? 'text-acteo font-bold' : (isDarkText ? 'text-slate-600' : 'text-slate-200')
            }`}
          >
            About Us
          </button>

          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-acteo hover:bg-acteo-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-acteo/30"
          >
            Book Consultation
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none transition-colors ${isDarkText ? 'text-slate-800' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8 text-acteo" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col space-y-4">
          <button
             onClick={(e) => handleNavClick('home', e)}
             className={`text-left text-lg font-medium hover:text-acteo ${currentPage === 'home' ? 'text-acteo' : 'text-slate-800'}`}
          >
            Home
          </button>
          
          <button
             onClick={(e) => handleNavClick('about', e)}
             className={`text-left text-lg font-medium hover:text-acteo ${currentPage === 'about' ? 'text-acteo' : 'text-slate-800'}`}
          >
            About Us
          </button>
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-acteo text-white px-5 py-3 rounded-lg font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Book Consultation
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;