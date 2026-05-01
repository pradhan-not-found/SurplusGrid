import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { CheckCircle2 } from 'lucide-react';

import { supabase } from '../../lib/supabase';

export default function ConsumerSettings() {
  const { user, profile } = useAuth();
  
  const [msg1, setMsg1] = useState('');
  const [msg2, setMsg2] = useState('');
  const [msg3, setMsg3] = useState('');

  const [peakLoad, setPeakLoad] = useState('');
  const [flexLoad, setFlexLoad] = useState('');
  const [shiftHours, setShiftHours] = useState<string[]>(profile?.shiftable_hours || []);

  const [pushNotify, setPushNotify] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [threshold, setThreshold] = useState('5000');

  const saveDetails = () => {
    setMsg1('Saved'); setTimeout(() => setMsg1(''), 3000);
  };

  const savePrefs = async () => {
    if (Number(flexLoad) > Number(peakLoad)) {
      alert("Flexible load cannot exceed peak load");
      return;
    }
    try {
      if (user) {
        await supabase.from('profiles').update({ shiftable_hours: shiftHours } as any).eq('id', user.id);
      }
      setMsg2('Saved'); setTimeout(() => setMsg2(''), 3000);
    } catch (err) {
      alert('Failed to update preferences');
    }
  };

  const saveNotify = () => {
    setMsg3('Saved'); setTimeout(() => setMsg3(''), 3000);
  };

  const toggleHour = (hr: string) => {
    setShiftHours(prev => prev.includes(hr) ? prev.filter(h => h !== hr) : [...prev, hr]);
  };

  const Toggle = ({ checked, onChange, label, subLabel }: { checked: boolean, onChange: (v:boolean)=>void, label: string, subLabel?: string }) => (
    <label className="flex items-start gap-4 cursor-pointer group">
      <div className={`relative w-[44px] h-[24px] rounded-full transition-colors duration-150 shrink-0 mt-0.5 ${checked ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'}`}>
        <div className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform duration-150 shadow-sm ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`} />
      </div>
      <div>
        <div className="text-[14px] text-[#374151] font-medium">{label}</div>
        {subLabel && <div className="text-[12px] text-[#9CA3AF] mt-1">{subLabel}</div>}
      </div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="hidden" />
    </label>
  );

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-[720px] pb-[40px]">
        
        {/* Section 1 */}
        <section className="bg-white p-[24px] border border-[#E5E7EB] rounded-[12px] mb-[20px] shadow-none">
          <div className="mb-[16px]">
            <h3 className="text-[15px] font-bold text-[#0D1117] mb-1">Account details</h3>
            <p className="text-[13px] text-[#6B7280]">Update your personal and company information.</p>
          </div>
          <div className="h-[1px] bg-[#F1F5F9] mb-[16px]" />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Full name</label><input type="text" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue={profile?.full_name || ''} /></div>
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Email</label><input type="email" className="w-full h-[40px] px-[12px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#9CA3AF] outline-none" defaultValue={user?.email || ''} disabled /></div>
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Phone</label><input type="tel" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue="" /></div>
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Company name</label><input type="text" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue={profile?.company_name || ''} /></div>
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Facility type</label><input type="text" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue="" /></div>
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">State</label><input type="text" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue={profile?.state_location || ''} /></div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={saveDetails} className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all">Save changes</button>
            {msg1 && <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]"><CheckCircle2 size={13} /> {msg1}</div>}
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-[24px] border border-[#E5E7EB] rounded-[12px] mb-[20px] shadow-none">
          <div className="mb-[16px]">
            <h3 className="text-[15px] font-bold text-[#0D1117] mb-1">Flexible load preferences</h3>
            <p className="text-[13px] text-[#6B7280]">Update your load capacity and shiftable hours.</p>
          </div>
          <div className="h-[1px] bg-[#F1F5F9] mb-[16px]" />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Peak load (kW)</label><input type="number" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" value={peakLoad} onChange={e=>setPeakLoad(e.target.value)} /></div>
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Flexible load (kW)</label><input type="number" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" value={flexLoad} onChange={e=>setFlexLoad(e.target.value)} /></div>
          </div>
          <div className="mb-8">
            <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Shiftable hours</label>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({length:24}).map((_,i) => {
                const hr = `${String(i).padStart(2,'0')}:00`;
                const isSelected = shiftHours.includes(hr);
                return (
                  <button
                    key={hr}
                    onClick={() => toggleHour(hr)}
                    className={`py-[6px] rounded-[6px] text-[12px] text-center border transition-colors ${isSelected ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#374151] border-[#E5E7EB] hover:border-[#9CA3AF]'}`}
                  >
                    {hr}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={savePrefs} className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all">Save preferences</button>
            {msg2 && <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]"><CheckCircle2 size={13} /> {msg2}</div>}
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-[24px] border border-[#E5E7EB] rounded-[12px] mb-[20px] shadow-none">
          <div className="mb-[16px]">
            <h3 className="text-[15px] font-bold text-[#0D1117] mb-1">Notification preferences</h3>
            <p className="text-[13px] text-[#6B7280]">Control how and when you want to be alerted.</p>
          </div>
          <div className="h-[1px] bg-[#F1F5F9] mb-[16px]" />
          
          <div className="space-y-6 mb-8">
            <Toggle checked={pushNotify} onChange={setPushNotify} label="Push notifications (browser)" subLabel="Receive real-time alerts even when the app is in the background." />
            <Toggle checked={emailAlerts} onChange={setEmailAlerts} label="Email alerts" subLabel="Receive an email immediately when a surplus window finds a match." />
            <Toggle checked={smsAlerts} onChange={setSmsAlerts} label="SMS alerts" subLabel="Critical alerts sent straight to your registered mobile number." />
            
            {smsAlerts && (
              <div className="pl-[60px] pt-2 animate-in slide-in-from-top-2 duration-200">
                <input type="tel" className="w-[260px] h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue="" placeholder="Phone number" />
              </div>
            )}
            
            <div className="pt-4 mt-4 border-t border-[#F1F5F9]">
              <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Minimum savings threshold to notify (₹)</label>
              <input type="number" className="w-[260px] h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" value={threshold} onChange={e=>setThreshold(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={saveNotify} className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all">Save</button>
            {msg3 && <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]"><CheckCircle2 size={13} /> {msg3}</div>}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
