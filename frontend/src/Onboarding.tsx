import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'producer' | 'consumer' | null>(null);

  // Step 2
  const [company, setCompany] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [gst, setGst] = useState('');

  // Step 3 Producer
  const [farmName, setFarmName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [connType, setConnType] = useState('LT');
  const [sldcZone, setSldcZone] = useState('NLDC');
  const [reportPref, setReportPref] = useState('Manual');

  // Step 3 Consumer
  const [facilityName, setFacilityName] = useState('');
  const [facilityType, setFacilityType] = useState('Cold storage');
  const [peakLoad, setPeakLoad] = useState('');
  const [flexLoad, setFlexLoad] = useState('');
  const [shiftHours, setShiftHours] = useState<string[]>([]);

  if (!user) return <Navigate to="/signin" />;
  if (user.onboardingComplete) return <Navigate to={user.role === 'producer' ? '/dashboard/producer' : '/dashboard/consumer'} />;

  const handleNext2 = () => {
    if (!company || !state || !phone) return alert('Fill required fields');
    setStep(3);
  };

  const completeProducer = () => {
    if (!farmName || !capacity) return alert('Fill required fields');
    updateUser({
      role: 'producer',
      onboardingComplete: true,
      companyName: company, state, phone, gst,
      farmName, capacityKw: Number(capacity), connectionType: connType, sldcZone, reportingPref: reportPref
    });
    navigate('/dashboard/producer');
  };

  const completeConsumer = () => {
    if (!facilityName || !peakLoad || !flexLoad) return alert('Fill required fields');
    if (Number(flexLoad) > Number(peakLoad)) return alert('Flexible load cannot exceed peak load');
    updateUser({
      role: 'consumer',
      onboardingComplete: true,
      companyName: company, state, phone, gst,
      facilityName, facilityType, peakLoadKw: Number(peakLoad), flexibleLoadKw: Number(flexLoad), shiftableHours: shiftHours
    });
    navigate('/dashboard/consumer');
  };

  const toggleHour = (hr: string) => {
    setShiftHours(prev => prev.includes(hr) ? prev.filter(h => h !== hr) : [...prev, hr]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl p-8">
        <div className="mb-6 text-sm text-gray-500 font-bold uppercase tracking-widest text-center">
          Step {step} of 3
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-display font-bold mb-6 text-center">Choose your role</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div 
                className={`p-6 border rounded cursor-pointer ${role === 'producer' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setRole('producer')}
              >
                <div className="font-bold text-lg mb-2">I produce renewable energy</div>
                <div className="text-sm text-gray-600">Solar farms, wind installations, rooftop aggregators</div>
              </div>
              <div 
                className={`p-6 border rounded cursor-pointer ${role === 'consumer' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setRole('consumer')}
              >
                <div className="font-bold text-lg mb-2">I consume energy at scale</div>
                <div className="text-sm text-gray-600">Cold storage, textile mills, EV fleets, data centers</div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button disabled={!role} onClick={() => setStep(2)} className="bg-gray-900 text-white px-6 py-2 rounded font-bold disabled:opacity-50">Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Company details</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-bold mb-1">Company name *</label><input type="text" className="w-full border p-2" value={company} onChange={e=>setCompany(e.target.value)} /></div>
              <div><label className="block text-sm font-bold mb-1">State / UT *</label><select className="w-full border p-2" value={state} onChange={e=>setState(e.target.value)}><option value="">Select state...</option><option value="MH">Maharashtra</option><option value="GJ">Gujarat</option><option value="KA">Karnataka</option><option value="DL">Delhi</option></select></div>
              <div><label className="block text-sm font-bold mb-1">Contact phone *</label><input type="tel" className="w-full border p-2" value={phone} onChange={e=>setPhone(e.target.value)} /></div>
              <div><label className="block text-sm font-bold mb-1">GST number</label><input type="text" className="w-full border p-2" value={gst} onChange={e=>setGst(e.target.value)} /></div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="border px-6 py-2 rounded font-bold">Back</button>
              <button onClick={handleNext2} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Next</button>
            </div>
          </div>
        )}

        {step === 3 && role === 'producer' && (
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Producer setup</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-bold mb-1">Farm / installation name *</label><input type="text" className="w-full border p-2" value={farmName} onChange={e=>setFarmName(e.target.value)} /></div>
              <div><label className="block text-sm font-bold mb-1">Installed capacity (kW) *</label><input type="number" className="w-full border p-2" value={capacity} onChange={e=>setCapacity(e.target.value)} /></div>
              <div><label className="block text-sm font-bold mb-1">Grid connection</label><select className="w-full border p-2" value={connType} onChange={e=>setConnType(e.target.value)}><option>LT</option><option>HT</option><option>EHT</option></select></div>
              <div><label className="block text-sm font-bold mb-1">SLDC zone</label><select className="w-full border p-2" value={sldcZone} onChange={e=>setSldcZone(e.target.value)}><option>NLDC</option><option>SRLDC</option><option>WRLDC</option><option>ERLDC</option><option>NERLDC</option></select></div>
              <div><label className="block text-sm font-bold mb-1">Reporting pref</label>
                <div className="space-x-4">
                  <label><input type="radio" checked={reportPref==='Manual'} onChange={()=>setReportPref('Manual')} /> Manual entry</label>
                  <label><input type="radio" checked={reportPref==='API'} onChange={()=>setReportPref('API')} /> API integration</label>
                  <label><input type="radio" checked={reportPref==='Auto'} onChange={()=>setReportPref('Auto')} /> Auto SLDC pull</label>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="border px-6 py-2 rounded font-bold">Back</button>
              <button onClick={completeProducer} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Complete setup</button>
            </div>
          </div>
        )}

        {step === 3 && role === 'consumer' && (
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Consumer setup</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-bold mb-1">Facility name *</label><input type="text" className="w-full border p-2" value={facilityName} onChange={e=>setFacilityName(e.target.value)} /></div>
              <div><label className="block text-sm font-bold mb-1">Facility type</label><select className="w-full border p-2" value={facilityType} onChange={e=>setFacilityType(e.target.value)}><option>Cold storage</option><option>Textile mill</option><option>EV fleet depot</option><option>Data center</option><option>Other</option></select></div>
              <div><label className="block text-sm font-bold mb-1">Peak load (kW) *</label><input type="number" className="w-full border p-2" value={peakLoad} onChange={e=>setPeakLoad(e.target.value)} /></div>
              <div><label className="block text-sm font-bold mb-1">Flexible load (kW) *</label><input type="number" className="w-full border p-2" value={flexLoad} onChange={e=>setFlexLoad(e.target.value)} /></div>
              <div><label className="block text-sm font-bold mb-2">Shiftable hours</label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {Array.from({length:24}).map((_,i) => {
                    const hr = `${String(i).padStart(2,'0')}:00`;
                    return (
                      <label key={i} className="flex items-center space-x-1 text-xs border p-1 rounded">
                        <input type="checkbox" checked={shiftHours.includes(hr)} onChange={() => toggleHour(hr)} />
                        <span>{hr}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="border px-6 py-2 rounded font-bold">Back</button>
              <button onClick={completeConsumer} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Complete setup</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
