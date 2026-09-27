import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const links = [
  { label: 'Formations', href: '#services' },
  { label: 'Méthode', href: '#courses' },
  { label: 'Équipe', href: '#about' },
  { label: 'Témoignages', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goHome = (event: React.MouseEvent) => {
    event.preventDefault();
    onNavigate('home');
    setIsOpen(false);
    window.setTimeout(() => {
      document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const navClass = `site-nav ${isScrolled || currentPage === 'linkedin' ? 'site-nav-solid' : ''}`;

  return (
    <nav className={navClass}>
      <a href="#intro" className="brand-lockup" onClick={goHome}>
        <img src="/logo-acteo.png" alt="Acteo Management" />
        <span>
          ACTEO
          <small>Management</small>
        </span>
      </a>

      {currentPage === 'home' && (
        <div className="nav-links" aria-label="Navigation principale">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="nav-actions">
        <a href="#contact" className="nav-cta">
          Diagnostic
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </div>

      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {isOpen && currentPage === 'home' && (
        <div className="mobile-menu">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
