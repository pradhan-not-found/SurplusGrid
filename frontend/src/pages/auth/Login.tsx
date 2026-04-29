import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Sparkles, Factory, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [role, setRole] = useState<'producer' | 'consumer'>('producer');
  const navigate = useNavigate();
  const { setUserRole } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
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
          className="w-full max-w-md glass-card p-10 relative overflow-hidden"
        >
          {/* Accent line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
          
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 text-sm">Sign in to your account</p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setRole('producer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                role === 'producer'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Zap size={16} className={role === 'producer' ? 'text-green-500' : ''} />
              Producer
            </button>
            <button
              type="button"
              onClick={() => setRole('consumer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                role === 'consumer'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Factory size={16} className={role === 'consumer' ? 'text-blue-500' : ''} />
              Consumer
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 text-sm outline-none shadow-sm"
                placeholder="user@company.com"
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
            
            <button 
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-medium transition-colors shadow-md mt-6"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
