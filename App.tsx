import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Services from './components/Services';
import Quote from './components/Quote';
import Approach from './components/Approach';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  // Simple state routing: 'home' | 'about'
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');

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
        ) : (
          <About />
        )}
      </main>
      
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;