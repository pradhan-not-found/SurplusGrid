import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-bg-deep/90 backdrop-blur-md border-border-subtle shadow-sm py-3' : 'bg-transparent border-transparent py-5'}`}>
      <div className="max-w-[90rem] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent-primary/20 flex items-center justify-center border border-accent-primary/30">
            <Leaf size={16} className="text-accent-primary" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-text-primary">SurplusGrid</span>
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-10 text-[13px] font-mono text-text-secondary uppercase tracking-widest">
          <a href="#" className="hover:text-accent-primary transition-colors">Platform</a>
          <a href="#" className="hover:text-accent-primary transition-colors">Network</a>
          <a href="#" className="hover:text-accent-primary transition-colors">Pricing</a>
          <a href="#" className="hover:text-accent-primary transition-colors">Impact</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="px-5 py-2.5 rounded text-[13px] font-mono font-medium text-text-primary border border-border-subtle hover:bg-bg-surface transition-all">
            I'm a Producer
          </Link>
          <Link to="/signup" className="px-5 py-2.5 rounded text-[13px] font-mono font-bold text-bg-deep bg-accent-primary hover:bg-accent-light transition-all shadow-[0_0_15px_rgba(29,158,117,0.3)]">
            I'm a Consumer
          </Link>
        </div>
      </div>
    </nav>
  );
}
