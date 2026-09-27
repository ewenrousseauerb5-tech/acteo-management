import React from 'react';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleHome = (event: React.MouseEvent) => {
    event.preventDefault();
    onNavigate('home');
    window.setTimeout(() => {
      document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a href="#intro" onClick={handleHome} className="brand-lockup footer-logo">
          <img src="/logo-acteo.png" alt="Acteo Management" />
          <span>
            ACTEO
            <small>Management</small>
          </span>
        </a>
        <p>
          Des formations-actions pour transformer les acquis en résultats concrets, sur le terrain.
        </p>
      </div>

      <div className="footer-grid">
        <div>
          <h3>Contact</h3>
          <a href="mailto:d.bessot@acteomanagement.com">
            <Mail aria-hidden="true" size={16} />
            d.bessot@acteomanagement.com
          </a>
          <a href="tel:+34606951926">
            <Phone aria-hidden="true" size={16} />
            +34 606 951 926
          </a>
          <span>
            <MapPin aria-hidden="true" size={16} />
            Vigo, Paris, international
          </span>
        </div>

        <div>
          <h3>Liens</h3>
          <a href="#services">Formations</a>
          <a href="#courses">Méthode Acteo</a>
          <a href="#reviews">Témoignages</a>
          <a href="#contact">Échanger sur mon besoin</a>
          <a href="https://www.linkedin.com/company/acteo-management/posts/?feedView=all" target="_blank" rel="noreferrer">
            <Linkedin aria-hidden="true" size={16} />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Acteo Management Iberica S.L</span>
        <span>Formation-action, coaching, QSE/RSE</span>
      </div>
    </footer>
  );
};

export default Footer;
