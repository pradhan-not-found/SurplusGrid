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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-[90rem] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Leaf size={20} className="text-[#1a1a1a]" />
          <span className="text-lg font-medium tracking-tight text-[#1a1a1a]">SurplusGrid</span>
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-10 text-[13px] font-medium text-gray-500 uppercase tracking-wide">
          <a href="#" className="hover:text-black transition-colors text-black">Home</a>
          <a href="#" className="hover:text-black transition-colors">Solutions</a>
          <a href="#" className="hover:text-black transition-colors">Company</a>
          <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
          <a href="#" className="hover:text-black transition-colors">Our project</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link to="/login" className="hidden md:block text-[13px] font-medium text-gray-700 hover:text-black transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="px-6 py-2.5 rounded-full text-[13px] font-medium text-white bg-[#1a1a1a] hover:bg-black transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
