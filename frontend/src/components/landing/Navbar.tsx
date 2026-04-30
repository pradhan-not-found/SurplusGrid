import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/90 backdrop-blur-xl border-gray-100 shadow-sm py-3' : 'bg-transparent border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="SurplusGrid" className="h-11 w-auto object-contain" />
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-gray-900 transition-colors">Platform</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Network</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Impact</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-50 transition-all">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
