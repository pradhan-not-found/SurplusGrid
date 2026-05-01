import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, TrendingUp, Eye, EyeOff, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Signin() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState('');
  
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');

  if (user && profile?.onboarding_complete) {
    return <Navigate to={`/dashboard/${profile.role}`} replace />;
  }
  if (user && profile && !profile.onboarding_complete) {
    return <Navigate to="/onboarding" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setErrorMsg('Incorrect email or password.');
      } else {
        setErrorMsg(error.message);
      }
      setLoading(false);
      return;
    }

    if (data.user) {
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (!userProfile?.onboarding_complete) {
        navigate('/onboarding');
      } else {
        navigate(`/dashboard/${userProfile.role}`);
      }
    } else {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setResetSuccess('');
    setResetError('');
    if (!resetEmail) {
      setResetError('Please enter an email address.');
      return;
    }

    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: window.location.origin + '/reset-password'
    });
    setResetLoading(false);

    if (error) {
      setResetError(error.message);
    } else {
      setResetSuccess('Reset link sent. Check your inbox.');
    }
  };

  const toggleResetMode = () => {
    if (!resetMode) {
      setResetEmail(email);
      setResetSuccess('');
      setResetError('');
    }
    setResetMode(!resetMode);
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
              <div className="flex justify-between mb-2 items-end">
                <label className="block text-[13px] font-semibold text-[#09090B] uppercase tracking-wider">Password</label>
                <button 
                  type="button" 
                  onClick={toggleResetMode}
                  className="text-[13px] font-medium text-[#71717A] hover:text-[#09090B] transition-colors"
                >
                  {resetMode ? 'Cancel reset' : 'Forgot?'}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required={!resetMode}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-[46px] px-4 pr-12 bg-white border border-[#E4E4E7] rounded-xl text-[15px] text-[#09090B] placeholder:text-[#A1A1AA] outline-none focus:border-[#09090B] focus:ring-[4px] focus:ring-[#09090B]/5 transition-all"
                  placeholder="••••••••"
                  disabled={resetMode}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#09090B] transition-colors"
                  disabled={resetMode}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {resetMode && (
                <div className="mt-4 p-4 bg-[#F4F4F5] border border-[#E4E4E7] rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-[13px] text-[#71717A] mb-3">Enter your email to receive a password reset link.</p>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    className="w-full h-[40px] px-3 mb-3 bg-white border border-[#E4E4E7] rounded-lg text-[14px] text-[#09090B] placeholder:text-[#A1A1AA] outline-none focus:border-[#09090B]"
                    placeholder="name@company.com"
                  />
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={resetLoading}
                    className="w-full h-[40px] bg-white border border-[#E4E4E7] text-[#09090B] font-medium text-[13px] rounded-lg hover:bg-[#F4F4F5] disabled:opacity-50 flex items-center justify-center transition-all shadow-sm"
                  >
                    {resetLoading ? <Loader2 size={16} className="animate-spin" /> : "Send reset link"}
                  </button>
                  {resetSuccess && (
                    <div className="flex items-center gap-1.5 mt-3 text-[#16A34A]">
                      <CheckCircle2 size={14} />
                      <span className="text-[13px] font-medium">{resetSuccess}</span>
                    </div>
                  )}
                  {resetError && (
                    <div className="flex items-center gap-1.5 mt-3 text-[#EF4444]">
                      <AlertTriangle size={14} />
                      <span className="text-[13px] font-medium">{resetError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 mt-4 text-[#EF4444] bg-[#FEF2F2] p-3 rounded-lg border border-[#FEE2E2]">
                <AlertTriangle size={16} />
                <span className="text-[13px] font-medium">{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || resetMode}
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
