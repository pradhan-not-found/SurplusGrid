import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { ShieldCheck, Zap, TrendingUp, Eye, EyeOff, Loader2, Sun, Factory, ChevronLeft, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Signup() {
  const { user, profile } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<'producer' | 'consumer' | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  if (user && profile?.onboarding_complete) {
    return <Navigate to={`/dashboard/${profile.role}`} replace />;
  }
  if (user && profile && !profile.onboarding_complete) {
    return <Navigate to="/onboarding" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg('All fields are required.');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: selectedRole
        }
      }
    });

    setLoading(false);

    if (error) {
      if (error.status === 429 || error.message.toLowerCase().includes('rate limit')) {
        setErrorMsg('Security rate limit reached. Please wait a few minutes, or disable the signup rate limit in your Supabase Dashboard.');
      } else if (error.message.includes('User already registered')) {
        setErrorMsg('An account with this email exists. Sign in instead.');
      } else {
        setErrorMsg(error.message);
      }
      return;
    }

    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen bg-white items-center justify-center">
        <div className="w-full max-w-[400px] text-center p-8">
          <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              <path d="m16 19 2 2 4-4"/>
            </svg>
          </div>
          <h2 className="text-[26px] font-bold text-[#09090B] tracking-tight mb-3">Check your email</h2>
          <p className="text-[15px] text-[#71717A] mb-2">
            We sent a confirmation link to
          </p>
          <p className="text-[15px] font-semibold text-[#09090B] mb-8">{email}</p>
          <p className="text-[13px] text-[#A1A1AA]">
            Click the link in the email to verify your account. Once confirmed, you'll be taken to onboarding automatically.
          </p>
          <div className="mt-8 pt-6 border-t border-[#F4F4F5]">
            <Link to="/signin" className="text-[14px] font-semibold text-[#09090B] hover:underline decoration-2 underline-offset-4">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" size={16} strokeWidth={2.5} />
          Back to home
        </Link>
        <div className="w-full max-w-[380px]">
          
          {step === 1 ? (
            <div>
              <h2 className="text-[22px] font-bold text-[#09090B] mb-2 font-helvetica">
                Who are you?
              </h2>
              <p className="text-[14px] text-[#6B7280] mb-8 font-helvetica">
                Select your role to get started. This cannot be changed later.
              </p>

              <div className="space-y-4 mb-8">
                <button
                  type="button"
                  onClick={() => setSelectedRole('producer')}
                  className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all ${
                    selectedRole === 'producer' 
                      ? 'border-[#2563EB] bg-[#EFF6FF]' 
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB] bg-white'
                  }`}
                >
                  <div className={`mt-0.5 ${selectedRole === 'producer' ? 'text-[#2563EB]' : 'text-[#6B7280]'}`}>
                    <Sun size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#09090B] text-[15px] mb-1">Energy Producer</div>
                    <div className="text-[13px] text-[#6B7280]">Solar farms, wind farms, rooftop aggregators</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('consumer')}
                  className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all ${
                    selectedRole === 'consumer' 
                      ? 'border-[#2563EB] bg-[#EFF6FF]' 
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB] bg-white'
                  }`}
                >
                  <div className={`mt-0.5 ${selectedRole === 'consumer' ? 'text-[#2563EB]' : 'text-[#6B7280]'}`}>
                    <Factory size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#09090B] text-[15px] mb-1">Energy Consumer</div>
                    <div className="text-[13px] text-[#6B7280]">Cold storage, textile mills, EV fleets, data centers</div>
                  </div>
                </button>
              </div>

              <button
                type="button"
                disabled={!selectedRole}
                onClick={() => setStep(2)}
                className="w-full h-[50px] bg-[#09090B] text-white font-semibold text-[15px] rounded-xl hover:bg-[#27272A] disabled:opacity-50 disabled:hover:bg-[#09090B] flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
              >
                Continue →
              </button>

              <div className="mt-8 text-center">
                <span className="text-[14px] text-[#71717A]">Already have an account? </span>
                <Link to="/signin" className="text-[14px] font-semibold text-[#09090B] hover:underline decoration-2 underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-[#6B7280] hover:text-[#09090B] transition-colors"
              >
                <ChevronLeft size={16} />
                Back
              </button>

              <h2 className="text-[30px] font-bold text-[#09090B] tracking-[-0.03em] mb-6">
                Create your account
              </h2>
              
              <div className="mb-8 flex items-center justify-between bg-[#F4F4F5] px-4 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#71717A]">Signing up as:</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                    selectedRole === 'producer' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#EFF6FF] text-[#2563EB]'
                  }`}>
                    Energy {selectedRole === 'producer' ? 'Producer' : 'Consumer'}
                  </span>
                </div>
                <button onClick={() => setStep(1)} className="text-[13px] font-medium text-[#09090B] hover:underline">
                  Change
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[13px] font-semibold text-[#09090B] mb-2 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full h-[46px] px-4 bg-white border border-[#E4E4E7] rounded-xl text-[15px] text-[#09090B] placeholder:text-[#A1A1AA] outline-none focus:border-[#09090B] focus:ring-[4px] focus:ring-[#09090B]/5 transition-all"
                    placeholder="Arjun Kumar"
                  />
                </div>
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

                <div>
                  <label className="block text-[13px] font-semibold text-[#09090B] mb-2 uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full h-[46px] px-4 pr-12 bg-white border border-[#E4E4E7] rounded-xl text-[15px] text-[#09090B] placeholder:text-[#A1A1AA] outline-none focus:border-[#09090B] focus:ring-[4px] focus:ring-[#09090B]/5 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#09090B] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 mt-4 text-[#EF4444] bg-[#FEF2F2] p-3 rounded-lg border border-[#FEE2E2]">
                    <AlertTriangle size={16} />
                    <span className="text-[13px] font-medium">{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[50px] mt-2 bg-[#09090B] text-white font-semibold text-[15px] rounded-xl hover:bg-[#27272A] disabled:opacity-50 disabled:hover:bg-[#09090B] flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : "Create account"}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
