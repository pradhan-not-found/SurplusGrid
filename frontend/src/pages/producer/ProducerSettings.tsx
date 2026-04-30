import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';

export default function ProducerSettings() {
  const { user } = useAuth();
  const [msg1, setMsg1] = useState('');
  const [msg2, setMsg2] = useState('');
  const [msg3, setMsg3] = useState('');

  const [apiKey, setApiKey] = useState('sk_live_1234567890abcdef');
  const [showKey, setShowKey] = useState(false);
  const [webhook, setWebhook] = useState('https://api.myfarm.com/surplus-webhook');

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  const saveDetails = () => {
    setMsg1('Saved');
    setTimeout(() => setMsg1(''), 3000);
  };

  const regenKey = () => {
    setApiKey('sk_live_' + Math.random().toString(36).substring(2, 15));
    alert('Old key is now invalid');
  };

  const saveApi = () => {
    setMsg2('Webhook URL saved');
    setTimeout(() => setMsg2(''), 3000);
  };

  const testWebhook = () => {
    setMsg2('POST sent · 200 OK');
    setTimeout(() => setMsg2(''), 3000);
  };

  const savePrefs = () => {
    setMsg3('Preferences saved');
    setTimeout(() => setMsg3(''), 3000);
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl space-y-8">
        
        {/* Section 1 */}
        <section className="bg-white p-6 border border-gray-200 rounded">
          <h2 className="text-xl font-bold font-display mb-4">Account details</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold mb-1">Full name</label>
              <input type="text" className="w-full border p-2" defaultValue={user?.name} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              <input type="email" className="w-full border p-2 bg-gray-100" defaultValue={user?.email} disabled />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Phone</label>
              <input type="tel" className="w-full border p-2" defaultValue={user?.phone} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Company name</label>
              <input type="text" className="w-full border p-2" defaultValue={user?.companyName} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">State</label>
              <input type="text" className="w-full border p-2" defaultValue={user?.state} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">GST number</label>
              <input type="text" className="w-full border p-2" defaultValue={user?.gst} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={saveDetails} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Save changes</button>
            {msg1 && <span className="text-green-600 font-bold text-sm">{msg1}</span>}
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-6 border border-gray-200 rounded">
          <h2 className="text-xl font-bold font-display mb-4">API integration</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">API Key</label>
            <div className="flex gap-2">
              <input type="text" className="flex-1 border p-2 bg-gray-50 font-data" value={showKey ? apiKey : '••••••••••••••••'} readOnly />
              <button onClick={() => setShowKey(!showKey)} className="border px-4 py-2 rounded font-bold">Reveal</button>
              <button onClick={regenKey} className="border px-4 py-2 rounded text-red-600 border-red-200 hover:bg-red-50 font-bold">Regenerate key</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Webhook URL</label>
            <input type="text" className="w-full border p-2" value={webhook} onChange={e=>setWebhook(e.target.value)} />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={saveApi} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Save webhook</button>
            <button onClick={testWebhook} className="border px-6 py-2 rounded font-bold">Test webhook</button>
            {msg2 && <span className="text-green-600 font-bold text-sm">{msg2}</span>}
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-6 border border-gray-200 rounded">
          <h2 className="text-xl font-bold font-display mb-4">Notifications</h2>
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={emailAlerts} onChange={e=>setEmailAlerts(e.target.checked)} className="w-4 h-4" />
              <span>Email alerts for new matches</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={smsAlerts} onChange={e=>setSmsAlerts(e.target.checked)} className="w-4 h-4" />
              <span>SMS alerts for new matches</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={dailyDigest} onChange={e=>setDailyDigest(e.target.checked)} className="w-4 h-4" />
              <span>Daily digest email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={weeklySummary} onChange={e=>setWeeklySummary(e.target.checked)} className="w-4 h-4" />
              <span>Weekly summary email</span>
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={savePrefs} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Save preferences</button>
            {msg3 && <span className="text-green-600 font-bold text-sm">{msg3}</span>}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
