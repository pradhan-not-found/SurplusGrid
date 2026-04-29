import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Leaf, Factory, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-[#f9fafb] flex font-sans selection:bg-green-500 selection:text-white">
      {/* Left Form Section */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <Sparkles size={20} className="text-gray-400" />
            <span className="text-xl font-medium tracking-tight text-[#1a1a1a]">SurplusGrid</span>
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Create an account</h2>
            <p className="text-gray-500 mb-8 font-light">Join the clean energy transition today.</p>

            <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setRole('producer')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  role === 'producer'
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Leaf size={16} />
                Producer
              </button>
              <button
                type="button"
                onClick={() => setRole('consumer')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  role === 'consumer'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Factory size={16} />
                Consumer
              </button>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white text-sm"
                  placeholder="e.g. Acme Solar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input 
                  type="password" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white text-sm"
                  placeholder="••••••••"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-3.5 px-4 bg-[#1a1a1a] hover:bg-black text-white rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg mt-6"
              >
                Get Started
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#1e362d] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#152720] to-[#223B2F] opacity-90"></div>
        <img 
          src="/image.png" 
          alt="Clean Energy" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 scale-105"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-20">
          <h3 className="text-3xl font-light text-white mb-4 leading-tight">
            Stop wasting power.<br/>Start matching it.
          </h3>
          <p className="text-green-100/80 max-w-md font-light leading-relaxed">
            The simplest way to connect industrial flexible demand with clean energy surplus windows in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
