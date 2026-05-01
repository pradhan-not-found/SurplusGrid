import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { Eye, Copy, Check, CheckCircle2, Send } from 'lucide-react';

export default function ProducerSettings() {
  const { user, profile } = useAuth();
  
  // States
  const [msg1, setMsg1] = useState('');
  const [msg2, setMsg2] = useState('');
  const [msg3, setMsg3] = useState('');

  const [apiKey, setApiKey] = useState('sk_live_1234567890abcdef');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [webhook, setWebhook] = useState('https://api.myfarm.com/surplus-webhook');

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  // Handlers
  const saveDetails = () => {
    setMsg1('Saved'); setTimeout(() => setMsg1(''), 3000);
  };

  const regenKey = () => {
    setApiKey('sk_live_' + Math.random().toString(36).substring(2, 15));
    alert('Old key is now invalid');
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const saveApi = () => {
    setMsg2('Webhook URL saved'); setTimeout(() => setMsg2(''), 3000);
  };

  const testWebhook = () => {
    setMsg2('POST sent · 200 OK'); setTimeout(() => setMsg2(''), 3000);
  };

  const savePrefs = () => {
    setMsg3('Preferences saved'); setTimeout(() => setMsg3(''), 3000);
  };

  const Toggle = ({ checked, onChange, label, subLabel }: { checked: boolean, onChange: (v:boolean)=>void, label: string, subLabel?: string }) => (
    <label onClick={() => onChange(!checked)} className="flex items-start gap-4 cursor-pointer group">
      <div className={`relative w-[44px] h-[24px] rounded-full transition-colors duration-150 shrink-0 mt-0.5 ${checked ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'}`}>
        <div className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform duration-150 shadow-sm ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`} />
      </div>
      <div>
        <div className="text-[14px] text-[#374151] font-medium">{label}</div>
        {subLabel && <div className="text-[12px] text-[#9CA3AF] mt-1">{subLabel}</div>}
      </div>
    </label>
  );

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-[720px]">
        
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
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Phone</label><input type="tel" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue={''} /></div>
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Company name</label><input type="text" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue={profile?.company_name || ''} /></div>
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">State</label><input type="text" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue={profile?.state_location || ''} /></div>
            <div><label className="block text-[13px] font-medium text-[#374151] mb-[6px]">GST number</label><input type="text" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" defaultValue={''} /></div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={saveDetails} className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all">Save changes</button>
            {msg1 && <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]"><CheckCircle2 size={13} /> {msg1}</div>}
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-[24px] border border-[#E5E7EB] rounded-[12px] mb-[20px] shadow-none">
          <div className="mb-[16px]">
            <h3 className="text-[15px] font-bold text-[#0D1117] mb-1">API integration</h3>
            <p className="text-[13px] text-[#6B7280]">Manage programmatic access to your surplus data.</p>
          </div>
          <div className="h-[1px] bg-[#F1F5F9] mb-[16px]" />
          
          <div className="mb-6">
            <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">API Key</label>
            <div className="flex gap-2">
              <div className="flex-1 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] px-[14px] flex items-center justify-between">
                <span className="font-mono text-[14px] text-[#0D1117]">{showKey ? apiKey : '••••••••••••••••••••••••'}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowKey(!showKey)} className="text-[#6B7280] hover:text-[#0D1117] p-1">
                    <Eye size={16} />
                  </button>
                  <button onClick={copyKey} className="text-[#6B7280] hover:text-[#0D1117] p-1" title={copied ? "Copied!" : "Copy"}>
                    {copied ? <Check size={16} strokeWidth={2} className="text-[#16A34A]" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              <button onClick={regenKey} className="h-[40px] px-[20px] bg-white border border-[#FECACA] text-[#DC2626] rounded-[8px] font-medium text-[14px] hover:bg-[#FEF2F2] transition-colors">
                Regenerate key
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Webhook URL</label>
            <input type="text" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" value={webhook} onChange={e=>setWebhook(e.target.value)} />
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={saveApi} className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all">Save webhook</button>
            <button onClick={testWebhook} className="h-[40px] px-[20px] bg-white border border-[#E5E7EB] text-[#374151] rounded-[8px] font-medium text-[14px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] flex items-center gap-2 transition-colors">
              <Send size={14} /> Test webhook
            </button>
            {msg2 && <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]"><CheckCircle2 size={13} /> {msg2}</div>}
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-[24px] border border-[#E5E7EB] rounded-[12px] mb-[20px] shadow-none">
          <div className="mb-[16px]">
            <h3 className="text-[15px] font-bold text-[#0D1117] mb-1">Notifications</h3>
            <p className="text-[13px] text-[#6B7280]">Control how and when you want to be alerted.</p>
          </div>
          <div className="h-[1px] bg-[#F1F5F9] mb-[16px]" />
          
          <div className="space-y-6 mb-8">
            <Toggle checked={emailAlerts} onChange={setEmailAlerts} label="Email alerts for new matches" subLabel="Receive an email immediately when a surplus window finds a match." />
            <Toggle checked={smsAlerts} onChange={setSmsAlerts} label="SMS alerts for new matches" subLabel="Critical alerts sent straight to your registered mobile number." />
            <Toggle checked={dailyDigest} onChange={setDailyDigest} label="Daily digest email" subLabel="A summary of all grid injection events over the past 24 hours." />
            <Toggle checked={weeklySummary} onChange={setWeeklySummary} label="Weekly summary email" subLabel="Detailed report of curtailment avoided and generated revenue." />
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={savePrefs} className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all">Save preferences</button>
            {msg3 && <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]"><CheckCircle2 size={13} /> {msg3}</div>}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
