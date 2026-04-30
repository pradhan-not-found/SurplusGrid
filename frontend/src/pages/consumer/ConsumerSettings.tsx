import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';

export default function ConsumerSettings() {
  const { user, updateUser } = useAuth();
  
  const [msg1, setMsg1] = useState('');
  const [msg2, setMsg2] = useState('');
  const [msg3, setMsg3] = useState('');

  const [peakLoad, setPeakLoad] = useState(user?.peakLoadKw?.toString() || '');
  const [flexLoad, setFlexLoad] = useState(user?.flexibleLoadKw?.toString() || '');
  const [shiftHours, setShiftHours] = useState<string[]>(user?.shiftableHours || []);

  const [pushNotify, setPushNotify] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [threshold, setThreshold] = useState('5000');

  const saveDetails = () => {
    setMsg1('Saved'); setTimeout(() => setMsg1(''), 3000);
  };

  const savePrefs = () => {
    if (Number(flexLoad) > Number(peakLoad)) {
      alert("Flexible load cannot exceed peak load");
      return;
    }
    updateUser({ peakLoadKw: Number(peakLoad), flexibleLoadKw: Number(flexLoad), shiftableHours: shiftHours });
    setMsg2('Saved'); setTimeout(() => setMsg2(''), 3000);
  };

  const saveNotify = () => {
    setMsg3('Saved'); setTimeout(() => setMsg3(''), 3000);
  };

  const toggleHour = (hr: string) => {
    setShiftHours(prev => prev.includes(hr) ? prev.filter(h => h !== hr) : [...prev, hr]);
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl space-y-8 pb-8">
        
        {/* Section 1 */}
        <section className="bg-white p-6 border border-gray-200 rounded">
          <h2 className="text-xl font-bold font-display mb-4">Account details</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm font-bold mb-1">Full name</label><input type="text" className="w-full border p-2" defaultValue={user?.name} /></div>
            <div><label className="block text-sm font-bold mb-1">Email</label><input type="email" className="w-full border p-2 bg-gray-100" defaultValue={user?.email} disabled /></div>
            <div><label className="block text-sm font-bold mb-1">Phone</label><input type="tel" className="w-full border p-2" defaultValue={user?.phone} /></div>
            <div><label className="block text-sm font-bold mb-1">Company name</label><input type="text" className="w-full border p-2" defaultValue={user?.companyName} /></div>
            <div><label className="block text-sm font-bold mb-1">Facility type</label><input type="text" className="w-full border p-2" defaultValue={user?.facilityType} /></div>
            <div><label className="block text-sm font-bold mb-1">State</label><input type="text" className="w-full border p-2" defaultValue={user?.state} /></div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={saveDetails} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Save changes</button>
            {msg1 && <span className="text-green-600 font-bold text-sm">{msg1}</span>}
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-6 border border-gray-200 rounded">
          <h2 className="text-xl font-bold font-display mb-4">Flexible load preferences</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm font-bold mb-1">Peak load (kW)</label><input type="number" className="w-full border p-2" value={peakLoad} onChange={e=>setPeakLoad(e.target.value)} /></div>
            <div><label className="block text-sm font-bold mb-1">Flexible load (kW)</label><input type="number" className="w-full border p-2" value={flexLoad} onChange={e=>setFlexLoad(e.target.value)} /></div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Shiftable hours</label>
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
          <div className="flex items-center gap-4">
            <button onClick={savePrefs} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Save preferences</button>
            {msg2 && <span className="text-green-600 font-bold text-sm">{msg2}</span>}
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-6 border border-gray-200 rounded">
          <h2 className="text-xl font-bold font-display mb-4">Notification preferences</h2>
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={pushNotify} onChange={e=>setPushNotify(e.target.checked)} className="w-4 h-4" />
              <span>Push notifications (browser)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={emailAlerts} onChange={e=>setEmailAlerts(e.target.checked)} className="w-4 h-4" />
              <span>Email alerts</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={smsAlerts} onChange={e=>setSmsAlerts(e.target.checked)} className="w-4 h-4" />
              <span>SMS alerts</span>
            </label>
            {smsAlerts && (
              <div className="pl-6 pt-2">
                <input type="tel" className="border p-2 rounded text-sm w-64" defaultValue={user?.phone} placeholder="Phone number" />
              </div>
            )}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <label className="block text-sm font-bold mb-1">Minimum savings threshold to notify (₹)</label>
              <input type="number" className="border p-2 rounded w-64" value={threshold} onChange={e=>setThreshold(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={saveNotify} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Save</button>
            {msg3 && <span className="text-green-600 font-bold text-sm">{msg3}</span>}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
