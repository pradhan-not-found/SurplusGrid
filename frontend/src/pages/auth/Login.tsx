import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Leaf, Factory, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-bg-deep flex flex-col font-body selection:bg-accent-primary selection:text-white">
      {/* Top Navbar Minimal */}
      <div className="h-20 border-b border-border-subtle flex items-center px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent-primary/20 flex items-center justify-center border border-accent-primary/30">
            <Leaf size={16} className="text-accent-primary" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-text-primary">SurplusGrid</span>
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
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-primary to-warning"></div>
          
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Platform Access</h2>
            <p className="text-text-secondary font-mono text-xs uppercase tracking-widest">Authenticate to Terminal</p>
          </div>

          <div className="flex bg-bg-deep p-1 rounded border border-border-subtle mb-8">
            <button
              type="button"
              onClick={() => setRole('producer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-xs font-mono uppercase tracking-widest transition-all ${
                role === 'producer'
                  ? 'bg-bg-surface text-accent-primary border border-border-subtle shadow-md'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Zap size={14} />
              Producer
            </button>
            <button
              type="button"
              onClick={() => setRole('consumer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-xs font-mono uppercase tracking-widest transition-all ${
                role === 'consumer'
                  ? 'bg-bg-surface text-warning border border-border-subtle shadow-md'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Factory size={14} />
              Consumer
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono text-text-secondary uppercase tracking-widest mb-1.5">Authorized Email</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-3 rounded bg-bg-deep border border-border-subtle focus:ring-1 focus:ring-accent-primary focus:border-accent-primary transition-colors text-text-primary text-sm font-mono"
                placeholder="user@company.com"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-secondary uppercase tracking-widest mb-1.5">Terminal Password</label>
              <input 
                type="password" 
                required 
                className="w-full px-4 py-3 rounded bg-bg-deep border border-border-subtle focus:ring-1 focus:ring-accent-primary focus:border-accent-primary transition-colors text-text-primary text-sm font-mono tracking-widest"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full py-3.5 px-4 bg-accent-primary hover:bg-accent-light text-bg-deep rounded text-sm font-mono font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(29,158,117,0.2)] mt-6"
            >
              Initialize Session
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-subtle text-center">
            <p className="text-xs font-mono text-text-secondary">
              Grid unregistered?{' '}
              <Link to="/signup" className="font-bold text-accent-primary hover:text-accent-light transition-colors uppercase">
                Request Access
              </Link>
            </p>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-[10px] font-mono text-text-secondary uppercase tracking-widest flex items-center gap-4">
          <span>SurplusGrid Secure Terminal</span>
          <span className="w-1 h-1 bg-accent-primary rounded-full"></span>
          <span>v2.0.4</span>
        </div>
      </div>
    </div>
  );
}
