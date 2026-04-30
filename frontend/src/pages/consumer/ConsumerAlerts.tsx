import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { BellRing, ArrowRight } from 'lucide-react';

export default function ConsumerAlerts() {
  const [activeTab, setActiveTab] = useState('All');

  const [alerts, setAlerts] = useState([
    { id: 1, time: 'Tomorrow 11:00–14:00', rateSurplus: 2.1, rateGrid: 6.8, savings: 12400, producer: 'SolarTech Farm', zone: 'WRLDC', confidence: 'High', status: 'Pending' },
    { id: 2, time: 'May 3 09:00–12:00', rateSurplus: 1.9, rateGrid: 6.8, savings: 9100, producer: 'WindGen India', zone: 'SRLDC', confidence: 'Medium', status: 'Pending' },
    { id: 3, time: 'Apr 28 14:00–17:00', rateSurplus: 2.3, rateGrid: 6.8, savings: 8600, producer: 'SolarTech Farm', zone: 'WRLDC', confidence: 'High', status: 'Accepted' },
    { id: 4, time: 'Apr 20 10:00–13:00', rateSurplus: 2.0, rateGrid: 6.8, savings: 10200, producer: 'GreenPower', zone: 'NLDC', confidence: 'Low', status: 'Expired' },
  ]);

  const filtered = activeTab === 'All' ? alerts : alerts.filter(a => a.status === activeTab);
  const [msg, setMsg] = useState('');

  const accept = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'Accepted' } : a));
    setMsg("Load shift scheduled. We'll remind you 2 hours before.");
    setTimeout(() => setMsg(''), 4000);
  };

  const getBorderColor = (status: string) => {
    if (status === 'Pending') return 'border-l-[#F59E0B]';
    if (status === 'Accepted') return 'border-l-[#16A34A]';
    return 'border-l-[#9CA3AF]';
  };

  return (
    <DashboardLayout title="Energy Alerts">
      <div className="flex gap-6 mb-6 border-b border-[#E5E7EB]">
        {['All', 'Pending', 'Accepted', 'Expired'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`font-medium pb-3 text-[14px] transition-colors relative ${activeTab === tab ? 'text-[#0D1117]' : 'text-[#6B7280] hover:text-[#374151]'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2563EB] rounded-t-full" />}
          </button>
        ))}
      </div>

      {msg && (
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-[8px] p-[16px] text-[#065F46] text-[14px] font-medium mb-[24px]">
          {msg}
        </div>
      )}

      <div className="space-y-[12px]">
        {filtered.map(a => (
          <div key={a.id} className={`bg-white border border-[#E5E7EB] border-l-[3px] rounded-[12px] p-[20px_24px] ${getBorderColor(a.status)}`}>
            {/* Row 1 */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-[16px] font-bold text-[#0D1117]">{a.time}</div>
              <div className="text-[15px] font-bold text-[#166534] bg-[#DCFCE7] px-[14px] py-[4px] rounded-full border border-[#BBF7D0]">
                Save ₹{a.savings}
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-[20px] font-bold text-[#16A34A]">₹{a.rateSurplus}/unit</div>
              <ArrowRight size={14} className="text-[#9CA3AF]" />
              <div className="text-[13px] text-[#6B7280]">vs ₹{a.rateGrid}/unit grid rate</div>
            </div>

            {/* Row 3 */}
            <div className="text-[12px] text-[#9CA3AF] mb-6 flex items-center gap-2">
              <span>{a.producer}</span>
              <span>·</span>
              <span>{a.zone}</span>
              <span>·</span>
              <span className={`font-medium ${a.confidence === 'High' ? 'text-[#16A34A]' : a.confidence === 'Medium' ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>Confidence: {a.confidence}</span>
            </div>
            
            {/* Row 4 */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
              {a.status === 'Pending' && (
                <>
                  <button className="h-[40px] px-[20px] bg-white border border-[#E5E7EB] text-[#374151] rounded-[8px] font-medium text-[14px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-colors">Dismiss</button>
                  <button onClick={() => accept(a.id)} className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all">Accept & schedule load shift</button>
                </>
              )}
              {a.status === 'Accepted' && (
                <div className="flex items-center gap-6">
                  <span className="text-[13px] font-medium text-[#0D1117]">Accepted on Apr 28</span>
                  <button className="h-[40px] px-[20px] bg-white border border-[#FECACA] text-[#DC2626] rounded-[8px] font-medium text-[14px] hover:bg-[#FEF2F2] transition-colors">Cancel shift</button>
                </div>
              )}
              {a.status === 'Expired' && (
                <button disabled className="h-[40px] px-[20px] bg-[#F9FAFB] border border-[#E5E7EB] text-[#9CA3AF] rounded-[8px] font-medium text-[14px] cursor-not-allowed">Expired</button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-[48px] text-center bg-white border border-[#E5E7EB] rounded-[12px]">
            <div className="flex flex-col items-center justify-center">
              <BellRing size={48} strokeWidth={1} className="text-[#D1D5DB] mb-4" />
              <h3 className="text-[16px] font-medium text-[#374151] mb-1">No alerts right now</h3>
              <p className="text-[14px] text-[#9CA3AF]">You'll be notified when cheap clean energy windows open up.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
