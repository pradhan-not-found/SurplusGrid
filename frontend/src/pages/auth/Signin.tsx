import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { ShieldCheck, Zap, TrendingUp, Eye, EyeOff, Loader2, AlertTriangle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Signin() {
  const { user, profile, loading: authLoading } = useAuth();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Wait for auth to resolve before redirecting
  if (!authLoading && !loading) {
    if (user) {
      if (profile?.onboarding_complete) {
        return <Navigate to={`/dashboard/${profile.role}`} replace />;
      } else {
        return <Navigate to="/onboarding" replace />;
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // The redirect will be handled by the useEffect/Navigate logic at the top of the component
      // which monitors the 'user' state from AuthContext.
      
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMsg(error.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel */}
      <div className="hidden md:flex w-[45%] border-r border-[#E5E7EB] flex-col justify-between p-12 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url(/wind.png)' }}
        />
        <div className="absolute inset-0 bg-black/5 backdrop-blur-md z-10" />
        
        <div className="flex-1 flex flex-col justify-center relative z-20">
          <div className="p-10 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] max-w-[420px]">
            <img src="/logo.png" alt="SurplusGrid" className="w-[140px] mb-8 object-contain brightness-110" />
            <h1 className="text-[28px] font-bold text-white mb-8 leading-tight tracking-[-0.01em] drop-shadow-sm">
              The smarter energy grid exchange.
            </h1>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[13px] font-medium text-white drop-shadow-sm">
                <ShieldCheck size={16} className="text-white" />
                SLDC compliant reporting
              </div>
              <div className="flex items-center gap-3 text-[13px] font-medium text-white drop-shadow-sm">
                <Zap size={16} className="text-white" />
                Real-time surplus matching
              </div>
              <div className="flex items-center gap-3 text-[13px] font-medium text-white drop-shadow-sm">
                <TrendingUp size={16} className="text-white" />
                Used by 450+ industrial operators
              </div>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-white/80 font-medium relative z-20">
          © {new Date().getFullYear()} SurplusGrid Pvt. Ltd.
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[55%] flex items-center justify-center p-8 bg-white relative">
        <Link to="/" className="absolute top-8 left-10 flex items-center gap-2 text-[13px] font-medium text-[#6B7280] hover:text-[#09090B] transition-colors group">
          <svg className="group-hover:-translate-x-0.5 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to home
        </Link>
        <div className="w-full max-w-[380px]">
          <h2 className="text-[30px] font-bold text-[#09090B] tracking-[-0.03em] mb-2">
            Welcome back
          </h2>
          <p className="text-[15px] text-[#71717A] mb-10 tracking-tight">
            Enter your credentials to access your portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="flex flex-col gap-2 bg-red-50/50 border border-red-200 rounded-lg p-3.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-start justify-between">
                  <span className="text-[13px] text-red-600 leading-snug font-medium">
                    {errorMsg}
                  </span>
                  <button type="button" onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-600 shrink-0 ml-2">
                    <X size={16} />
                  </button>
                </div>
                {errorMsg.toLowerCase().includes('credential') && (
                  <div className="mt-1.5 pt-2 border-t border-red-100/60 text-[11px] text-[#B45309] leading-relaxed font-normal">
                    💡 <strong>Developer Tip:</strong> Supabase requires email verification by default for new signups (e.g. <code>dassatwik123@gmamil.com</code>). To bypass this, please disable <strong>"Confirm email"</strong> in your Supabase Auth dashboard (Authentication &gt; Providers &gt; Email), or run the auto-confirm database trigger located at the bottom of <code>supabase_schema_fix.sql</code>!
                  </div>
                )}
              </div>
            )}
            
            <div>
              <label className="block text-[13px] font-semibold text-[#09090B] mb-2 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-[46px] px-4 bg-white border border-[#E4E4E7] rounded-xl text-[15px] text-[#09090B] placeholder:text-[#A1A1AA] outline-none focus:border-[#09090B] focus:ring-[4px] focus:ring-[#09090B]/5 transition-all"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#09090B] mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-[46px] px-4 pr-12 bg-white border border-[#E4E4E7] rounded-xl text-[15px] text-[#09090B] placeholder:text-[#A1A1AA] outline-none focus:border-[#09090B] focus:ring-[4px] focus:ring-[#09090B]/5 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#09090B] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] mt-4 bg-[#09090B] text-white font-semibold text-[15px] rounded-xl hover:bg-[#27272A] disabled:opacity-50 disabled:hover:bg-[#09090B] flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Sign in to Dashboard"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-[#F4F4F5] text-center">
            <span className="text-[14px] text-[#71717A]">New to SurplusGrid? </span>
            <Link to="/signup" className="text-[14px] font-semibold text-[#09090B] hover:underline decoration-2 underline-offset-4">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
