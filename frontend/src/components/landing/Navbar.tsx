import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/30">
            S
          </div>
          <span className="text-xl font-semibold tracking-tight text-gray-900">SurplusGrid</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-green-600 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-green-600 transition-colors">Features</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="hidden md:block text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
            Sign In
          </Link>
          <Link to="/dashboard" className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-all shadow-md shadow-green-500/20 hover:scale-105 active:scale-95">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
