import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, TrendingUp, Eye, EyeOff, Loader2, X } from 'lucide-react';

export default function Signin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetBanner, setResetBanner] = useState(false);

  if (user && user.onboardingComplete) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  if (user && !user.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setTimeout(() => {
      const existingUserStr = localStorage.getItem('surplusgrid_user');
      let u;
      if (existingUserStr) {
        try {
          u = JSON.parse(existingUserStr);
        } catch(err) {}
      }
      
      if (u) {
        login(u);
        navigate(u.onboardingComplete ? `/dashboard/${u.role}` : '/onboarding');
      } else {
        const mockUser = {
          id: 'mock-1',
          name: 'Demo User',
          email,
          role: null,
          onboardingComplete: false
        };
        login(mockUser);
        navigate('/onboarding');
      }
    }, 800);
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
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-[14px] text-[#6B7280] hover:text-[#0D1117] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to home
        </Link>
        <div className="w-full max-w-[420px]">
          <div className="text-[18px] font-bold text-[#0D1117] mb-2">SurplusGrid</div>
          <h2 className="text-[26px] font-bold text-[#0D1117] tracking-[-0.02em] mb-1">
            Welcome back
          </h2>
          <p className="text-[14px] text-[#6B7280] mb-8">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-[44px] px-[14px] border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5 items-end">
                <label className="block text-[13px] font-medium text-[#374151]">Password</label>
                <button 
                  type="button" 
                  onClick={() => setResetBanner(true)}
                  className="text-[13px] text-[#2563EB] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-[44px] px-[14px] pr-10 border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#374151]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {resetBanner && (
                <div className="mt-3 flex items-start justify-between bg-[#EFF6FF] border border-[#DBEAFE] rounded-[6px] p-3">
                  <span className="text-[13px] text-[#1D4ED8]">
                    Password reset is coming soon. Contact support@surplusgrid.in
                  </span>
                  <button type="button" onClick={() => setResetBanner(false)} className="text-[#1D4ED8]">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[46px] mt-2 bg-[#2563EB] text-white font-medium text-[15px] rounded-[8px] hover:bg-[#1D4ED8] disabled:opacity-70 disabled:hover:bg-[#2563EB] flex items-center justify-center transition-colors"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign in"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#F3F4F6] text-center">
            <span className="text-[14px] text-[#6B7280]">Don't have an account? </span>
            <Link to="/signup" className="text-[14px] text-[#2563EB] hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
