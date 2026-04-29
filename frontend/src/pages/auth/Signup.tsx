import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Sparkles, Factory, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const [role, setRole] = useState<'producer' | 'consumer'>('producer');
  const navigate = useNavigate();
  const { setUserRole } = useAppContext();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(role);
    if (role === 'producer') {
      navigate('/producer-dashboard');
    } else {
      navigate('/consumer-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body selection:bg-green-500 selection:text-white">
      {/* Top Navbar Minimal */}
      <div className="h-20 border-b border-gray-200 bg-white flex items-center px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="SurplusGrid" className="h-9 w-auto object-contain" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-xl glass-card p-10 relative overflow-hidden"
        >
          {/* Accent line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
          
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2 tracking-tight">Create an account</h2>
            <p className="text-gray-500 text-sm">Select how you want to use SurplusGrid</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setRole('producer')}
              className={`p-6 rounded-2xl border transition-all text-left flex flex-col ${
                role === 'producer'
                  ? 'bg-white border-green-500 shadow-md ring-1 ring-green-500/20'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${role === 'producer' ? 'bg-green-50 text-green-600' : 'bg-white text-gray-400 shadow-sm border border-gray-100'}`}>
                <Zap size={24} />
              </div>
              <span className={`font-display font-semibold text-lg mb-1 ${role === 'producer' ? 'text-gray-900' : 'text-gray-700'}`}>I am a Producer</span>
              <span className="text-xs text-gray-500 leading-relaxed font-medium">Log surplus windows to grid</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('consumer')}
              className={`p-6 rounded-2xl border transition-all text-left flex flex-col ${
                role === 'consumer'
                  ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${role === 'consumer' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-400 shadow-sm border border-gray-100'}`}>
                <Factory size={24} />
              </div>
              <span className={`font-display font-semibold text-lg mb-1 ${role === 'consumer' ? 'text-gray-900' : 'text-gray-700'}`}>I am a Consumer</span>
              <span className="text-xs text-gray-500 leading-relaxed font-medium">Absorb load from surplus</span>
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Facility Name</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 text-sm outline-none shadow-sm"
                placeholder="e.g. Acme Solar / Acme Steel"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 text-sm outline-none shadow-sm"
                  placeholder="admin@facility.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input 
                  type="password" 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 text-sm outline-none shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-medium transition-colors shadow-md mt-6"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
