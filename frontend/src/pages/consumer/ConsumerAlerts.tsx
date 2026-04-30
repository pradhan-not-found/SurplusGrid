import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { BellRing, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    setMsg("Load shift scheduled successfully.");
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <DashboardLayout title="Energy Alerts">
      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-[#E5E7EB]">
        {['All', 'Pending', 'Accepted', 'Expired'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`font-medium pb-3 text-[13px] transition-colors relative ${activeTab === tab ? 'text-[#09090B]' : 'text-[#71717A] hover:text-[#3F3F46]'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#09090B]" />}
          </button>
        ))}
      </div>

      {msg && (
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[6px] p-[12px_16px] text-[#0F172A] text-[13px] font-medium mb-[24px] flex items-center gap-2 shadow-sm">
          <CheckCircle2 size={16} className="text-[#10B981]" />
          {msg}
        </div>
      )}

      <div className="space-y-[16px]">
        {filtered.map(a => (
          <div key={a.id} className="bg-white border border-[#E5E7EB] rounded-[8px] p-5 shadow-sm hover:border-[#D4D4D8] transition-colors">
            {/* Header Row */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-[15px] font-semibold text-[#09090B] tracking-tight">{a.time}</h3>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                    a.status === 'Pending' ? 'bg-[#FFFBEB] text-[#92400E] border-[#FEF3C7]' :
                    a.status === 'Accepted' ? 'bg-[#ECFDF5] text-[#065F46] border-[#D1FAE5]' :
                    'bg-[#F4F4F5] text-[#3F3F46] border-[#E4E4E7]'
                  }`}>
                    {a.status}
                  </span>
                </div>
                <div className="text-[13px] text-[#71717A] flex items-center gap-2">
                  <span>{a.producer}</span>
                  <span className="text-[#D4D4D8]">•</span>
                  <span>{a.zone}</span>
                  <span className="text-[#D4D4D8]">•</span>
                  <span>Match Confidence: <span className="font-medium text-[#3F3F46]">{a.confidence}</span></span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-[#71717A] mb-0.5 uppercase tracking-wider font-medium">Est. Savings</div>
                <div className="text-[18px] font-bold text-[#10B981] tracking-tight">₹{a.savings.toLocaleString()}</div>
              </div>
            </div>
            
            {/* Data Grid */}
            <div className="bg-[#FAFAFA] border border-[#F4F4F5] rounded-[6px] p-4 flex items-center justify-between mb-5">
              <div>
                <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider font-semibold mb-1">Surplus Rate</div>
                <div className="text-[15px] font-medium text-[#09090B]">₹{a.rateSurplus}/unit</div>
              </div>
              <ArrowRight size={16} className="text-[#D4D4D8]" />
              <div>
                <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider font-semibold mb-1">Grid Rate</div>
                <div className="text-[15px] font-medium text-[#71717A]">₹{a.rateGrid}/unit</div>
              </div>
              <div className="h-8 w-[1px] bg-[#E4E4E7] mx-4" />
              <div className="flex-1">
                <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider font-semibold mb-1">Action Required</div>
                <div className="text-[13px] text-[#3F3F46]">Shift load to this window to secure pricing.</div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              {a.status === 'Pending' && (
                <>
                  <button className="h-[36px] px-[16px] bg-white border border-[#E5E7EB] text-[#3F3F46] rounded-[6px] font-medium text-[13px] hover:bg-[#FAFAFA] hover:border-[#D4D4D8] transition-colors shadow-sm">
                    Dismiss
                  </button>
                  <button onClick={() => accept(a.id)} className="h-[36px] px-[16px] bg-[#09090B] text-white rounded-[6px] font-medium text-[13px] hover:bg-[#27272A] active:scale-98 transition-all shadow-sm">
                    Accept & schedule
                  </button>
                </>
              )}
              {a.status === 'Accepted' && (
                <div className="flex items-center gap-4">
                  <span className="text-[12px] font-medium text-[#71717A]">Scheduled for Apr 28</span>
                  <button className="h-[36px] px-[16px] bg-white border border-[#E5E7EB] text-[#EF4444] rounded-[6px] font-medium text-[13px] hover:bg-[#FEF2F2] hover:border-[#FCA5A5] transition-colors shadow-sm">
                    Cancel shift
                  </button>
                </div>
              )}
              {a.status === 'Expired' && (
                <button disabled className="h-[36px] px-[16px] bg-[#F4F4F5] border border-[#E4E4E7] text-[#A1A1AA] rounded-[6px] font-medium text-[13px] cursor-not-allowed">
                  Window closed
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-[60px] text-center bg-white border border-[#E5E7EB] rounded-[8px] shadow-sm">
            <div className="flex flex-col items-center justify-center">
              <BellRing size={32} className="text-[#D4D4D8] mb-4" />
              <h3 className="text-[14px] font-semibold text-[#09090B] mb-1">No alerts found</h3>
              <p className="text-[13px] text-[#71717A]">You're all caught up on energy windows.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
