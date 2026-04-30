import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, TrendingUp, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Signup() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user && user.onboardingComplete) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  if (user && !user.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setLoading(true);
    setTimeout(() => {
      login({
        id: `usr-${Date.now()}`,
        name,
        email,
        role: null,
        onboardingComplete: false
      });
      navigate('/onboarding');
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel */}
      <div className="hidden md:flex w-[45%] bg-[#F8FAFC] border-r border-[#E5E7EB] flex-col justify-between p-12">
        <div className="flex-1 flex flex-col justify-center">
          <img src="/logo.png" alt="SurplusGrid" className="w-[140px] mb-8 object-contain" />
          <h1 className="text-[28px] font-bold text-[#0D1117] mb-10 leading-tight tracking-[-0.01em]">
            The smarter energy grid exchange.
          </h1>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[13px] text-[#374151]">
              <ShieldCheck size={14} color="#2563EB" />
              SLDC compliant reporting
            </div>
            <div className="flex items-center gap-3 text-[13px] text-[#374151]">
              <Zap size={14} color="#2563EB" />
              Real-time surplus matching
            </div>
            <div className="flex items-center gap-3 text-[13px] text-[#374151]">
              <TrendingUp size={14} color="#2563EB" />
              Used by 450+ industrial operators
            </div>
          </div>
        </div>
        <div className="text-[11px] text-[#6B7280]">
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
            Create your account
          </h2>
          <p className="text-[14px] text-[#6B7280] mb-8">
            Join the network and start optimising your energy.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Full name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full h-[44px] px-[14px] border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow"
                placeholder="Arjun Kumar"
              />
            </div>
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
              <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Password</label>
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[46px] mt-2 bg-[#2563EB] text-white font-medium text-[15px] rounded-[8px] hover:bg-[#1D4ED8] disabled:opacity-70 disabled:hover:bg-[#2563EB] flex items-center justify-center transition-colors"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Create account"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#F3F4F6] text-center">
            <span className="text-[14px] text-[#6B7280]">Already have an account? </span>
            <Link to="/signin" className="text-[14px] text-[#2563EB] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
