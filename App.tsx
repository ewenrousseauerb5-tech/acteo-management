import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Services from './components/Services';
import Quote from './components/Quote';
import Approach from './components/Approach';
import About from './components/About';
import LinkedInDashboard from './components/LinkedInDashboard';
import Footer from './components/Footer';
import { Page } from './types';

function App() {
  const getInitialPage = (): Page => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'linkedin' || window.location.hash === '#linkedin-insights') {
        return 'linkedin';
      }
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero />
            <Overview />
            <Services />
            <Quote />
            <Approach />
          </>
        ) : currentPage === 'about' ? (
          <About />
        ) : (
          <LinkedInDashboard />
        )}
      </main>
      
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
