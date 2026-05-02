import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Sun, Factory, Loader2, ChevronDown, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const COMPANIES = [
  "Tata Power", "Adani Green Energy", "ReNew Power", "Greenko Group",
  "Azure Power", "Hero Future Energies", "Torrent Power", "NTPC Renewable",
  "Sterlite Power", "JSW Energy", "Waaree Energies", "Vikram Solar",
  "Tata Steel", "Vedanta Limited", "Hindustan Zinc", "Hindalco Industries",
  "JSW Steel", "SAIL", "ArcelorMittal Nippon Steel India", "Ultratech Cement",
  "Ambuja Cements", "ACC Limited", "Dalmia Bharat", "Shree Cement",
  "Marico", "ITC Limited", "Britannia Industries", "Amul", "Godrej Industries",
  "Reliance Industries", "HPCL", "BPCL", "Indian Oil Corporation", "GAIL India",
  "Infosys", "Wipro", "HCL Technologies", "TCS", "Tech Mahindra",
  "Amazon India", "Flipkart", "Zomato", "Swiggy", "Ola Electric"
];

const STATES = [
  "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function Onboarding() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'producer' | 'consumer' | null>(null);
  
  const [companyName, setCompanyName] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [gst, setGst] = useState('');
  
  // Producer fields
  const [capacity, setCapacity] = useState('');
  const [connectivity, setConnectivity] = useState('');
  
  // Consumer fields
  const [peakLoad, setPeakLoad] = useState('');
  const [flexibleLoad, setFlexibleLoad] = useState('');
  const [shiftHours, setShiftHours] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Autocomplete state
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      if (profile.role) {
        setRole(profile.role);
        setStep(2);
      }
    }
  }, [profile]);

  if (!user) return <Navigate to="/signup" replace />;
  if (profile?.onboarding_complete) return <Navigate to={`/dashboard/${profile.role}`} replace />;

  const filteredCompanies = search 
    ? COMPANIES.filter(c => c.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
    : COMPANIES.slice(0, 5);

  const handleNext = () => {
    if (step === 1 && !role) return;
    if (step === 2 && (!companyName || !state)) return;
    setStep(s => s + 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const payload = {
        id: user.id,
        email: user.email,
        role: role,
        company_name: companyName,
        state_location: state,
        shiftable_hours: shiftHours,
        capacity_mw: capacity ? parseFloat(capacity) : null,
        grid_connectivity: connectivity || null,
        peak_load_kw: peakLoad ? parseFloat(peakLoad) : null,
        flexible_load_kw: flexibleLoad ? parseFloat(flexibleLoad) : null,
        onboarding_complete: true
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
      
      await refreshProfile();
      navigate(`/dashboard/${role}`);
    } catch (err: any) {
      setErrorMsg('Failed to save profile: ' + err.message);
      setLoading(false);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-white text-[#0D1117] font-body">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <img src="/logo.png" alt="SurplusGrid" className="w-[120px]" />
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-[#6B7280]">Step {step} of 3</span>
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="text-[13px] text-[#EF4444] hover:underline font-medium"
          >
            Sign out
          </button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-[3px] bg-[#E5E7EB]">
        <div 
          className="h-full bg-[#2563EB] transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      <div className="max-w-[560px] mx-auto pt-16 px-6 pb-20">
        
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-[24px] font-bold tracking-[-0.01em] mb-2">How will you use SurplusGrid?</h1>
            <p className="text-[14px] text-[#6B7280] mb-8">Confirm your role before proceeding.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Producer Card */}
              <button 
                onClick={() => setRole('producer')}
                className={`text-left p-[24px] rounded-[12px] border-[1.5px] transition-all duration-150 ${role === 'producer' ? 'border-[#2563EB] bg-[#EFF6FF]' : 'border-[#E5E7EB] bg-white hover:border-[#93C5FD]'}`}
              >
                <div className="w-[56px] h-[56px] rounded-[12px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB] mb-4">
                  <Sun size={28} />
                </div>
                <h3 className="text-[17px] font-bold mb-1">Energy Producer</h3>
                <p className="text-[13px] text-[#6B7280]">Monetize curtailed surplus energy directly.</p>
              </button>

              {/* Consumer Card */}
              <button 
                onClick={() => setRole('consumer')}
                className={`text-left p-[24px] rounded-[12px] border-[1.5px] transition-all duration-150 ${role === 'consumer' ? 'border-[#2563EB] bg-[#EFF6FF]' : 'border-[#E5E7EB] bg-white hover:border-[#93C5FD]'}`}
              >
                <div className="w-[56px] h-[56px] rounded-[12px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB] mb-4">
                  <Factory size={28} />
                </div>
                <h3 className="text-[17px] font-bold mb-1">C&I Consumer</h3>
                <p className="text-[13px] text-[#6B7280]">Shift loads to access cheap, clean energy.</p>
              </button>
            </div>
            
            <div className="mt-10">
              <button 
                onClick={handleNext}
                disabled={!role}
                className="w-full h-[46px] bg-[#2563EB] text-white font-medium text-[15px] rounded-[8px] hover:bg-[#1D4ED8] disabled:opacity-70 disabled:hover:bg-[#2563EB] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-[24px] font-bold tracking-[-0.01em] mb-8">Tell us about your organisation.</h1>
            
            <div className="space-y-6">
              {/* Company Name Autocomplete */}
              <div className="relative">
                <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Company name</label>
                <input 
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setCompanyName(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  placeholder="Start typing..."
                  className="w-full h-[44px] px-[14px] border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow"
                />
                
                {showDropdown && search && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-[#E5E7EB] rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
                    {filteredCompanies.map(c => (
                      <div 
                        key={c}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSearch(c);
                          setCompanyName(c);
                          setShowDropdown(false);
                        }}
                        className="px-[14px] py-[10px] text-[15px] cursor-pointer hover:bg-[#F9FAFB] border-b border-[#F1F5F9] last:border-0"
                      >
                        {c}
                      </div>
                    ))}
                    {!COMPANIES.some(c => c.toLowerCase() === search.toLowerCase()) && (
                      <div 
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setCompanyName(search);
                          setShowDropdown(false);
                        }}
                        className="px-[14px] py-[10px] text-[14px] text-[#2563EB] cursor-pointer hover:bg-[#EFF6FF]"
                      >
                        Add "{search}" as new company
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* State Dropdown */}
              <div>
                <label className="block text-[13px] font-medium text-[#374151] mb-1.5">State / Union Territory</label>
                <div className="relative">
                  <select 
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full h-[44px] px-[14px] border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow appearance-none bg-white"
                  >
                    <option value="" disabled>Select your state</option>
                    {STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Phone Number</label>
                  <input 
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91"
                    className="w-full h-[44px] px-[14px] border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#374151] mb-1.5">GST Number</label>
                  <input 
                    type="text"
                    value={gst}
                    onChange={e => setGst(e.target.value)}
                    placeholder="22AAAAA0000A1Z5"
                    className="w-full h-[44px] px-[14px] border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="w-full h-[46px] border border-[#E5E7EB] bg-white text-[#374151] font-medium text-[15px] rounded-[8px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                disabled={!companyName || !state}
                className="w-full h-[46px] bg-[#2563EB] text-white font-medium text-[15px] rounded-[8px] hover:bg-[#1D4ED8] disabled:opacity-70 disabled:hover:bg-[#2563EB] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && role === 'producer' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-[24px] font-bold tracking-[-0.01em] mb-8">Infrastructure details</h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Total generation capacity (MW)</label>
                <input 
                  type="number" 
                  value={capacity}
                  onChange={e => setCapacity(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full h-[44px] px-[14px] border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-medium text-[#374151] mb-3">Grid connectivity zone</label>
                <div className="space-y-2.5">
                  {['NRLDC', 'WRLDC', 'SRLDC', 'ERLDC', 'NERLDC'].map(zone => (
                    <label key={zone} onClick={() => setConnectivity(zone)} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-[18px] h-[18px] rounded-full border border-[#E5E7EB] flex items-center justify-center bg-white group-hover:border-[#93C5FD] transition-colors ${connectivity === zone ? '!border-[#2563EB]' : ''}`}>
                        {connectivity === zone && <div className="w-[8px] h-[8px] rounded-full bg-[#2563EB]" />}
                      </div>
                      <span className="text-[14px] text-[#374151]">{zone}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 mt-6 text-[#EF4444] bg-[#FEF2F2] p-3 rounded-lg border border-[#FEE2E2]">
                <AlertTriangle size={16} />
                <span className="text-[13px] font-medium">{errorMsg}</span>
              </div>
            )}

            <div className="mt-10 flex gap-4">
              <button 
                onClick={() => setStep(2)}
                className="w-full h-[46px] border border-[#E5E7EB] bg-white text-[#374151] font-medium text-[15px] rounded-[8px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleFinish}
                disabled={!capacity || !connectivity || loading}
                className="w-full h-[46px] bg-[#2563EB] text-white font-medium text-[15px] rounded-[8px] hover:bg-[#1D4ED8] disabled:opacity-70 disabled:hover:bg-[#2563EB] transition-colors flex items-center justify-center"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Complete setup"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && role === 'consumer' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-[24px] font-bold tracking-[-0.01em] mb-8">Load flexibility</h1>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Peak load (kW)</label>
                  <input 
                    type="number" 
                    value={peakLoad}
                    onChange={e => setPeakLoad(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full h-[44px] px-[14px] border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Flexible load (kW)</label>
                  <input 
                    type="number" 
                    value={flexibleLoad}
                    onChange={e => setFlexibleLoad(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full h-[44px] px-[14px] border border-[#E5E7EB] rounded-[8px] text-[15px] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[13px] font-medium text-[#374151] mb-1.5">When can you shift load?</label>
                <p className="text-[12px] text-[#9CA3AF] mb-3">Select the hours you can typically absorb surplus energy.</p>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({length: 24}).map((_, i) => {
                    const hr = `${String(i).padStart(2, '0')}:00`;
                    const isSelected = shiftHours.includes(hr);
                    return (
                      <button
                        key={hr}
                        onClick={() => setShiftHours(prev => isSelected ? prev.filter(h => h !== hr) : [...prev, hr])}
                        className={`py-[6px] rounded-[6px] text-[12px] text-center border transition-colors ${isSelected ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#374151] border-[#E5E7EB] hover:border-[#9CA3AF]'}`}
                      >
                        {hr}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 mt-6 text-[#EF4444] bg-[#FEF2F2] p-3 rounded-lg border border-[#FEE2E2]">
                <AlertTriangle size={16} />
                <span className="text-[13px] font-medium">{errorMsg}</span>
              </div>
            )}

            <div className="mt-10 flex gap-4">
              <button 
                onClick={() => setStep(2)}
                className="w-full h-[46px] border border-[#E5E7EB] bg-white text-[#374151] font-medium text-[15px] rounded-[8px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleFinish}
                disabled={!peakLoad || !flexibleLoad || shiftHours.length === 0 || loading}
                className="w-full h-[46px] bg-[#2563EB] text-white font-medium text-[15px] rounded-[8px] hover:bg-[#1D4ED8] disabled:opacity-70 disabled:hover:bg-[#2563EB] transition-colors flex items-center justify-center"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Complete setup"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
