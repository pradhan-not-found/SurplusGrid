import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { IndianRupee, CalendarCheck, Leaf, Wind, Zap, ArrowRight, X } from 'lucide-react';

export default function ConsumerOverview() {
  const [showBanner, setShowBanner] = useState(true);
  const [alerts, setAlerts] = useState([
    { id: 1, time: 'Tomorrow 11:00–14:00', rateSurplus: 2.1, rateGrid: 6.8, savings: 12400 },
    { id: 2, time: 'May 3 09:00–12:00', rateSurplus: 1.9, rateGrid: 6.8, savings: 9100 },
    { id: 3, time: 'May 4 14:00–17:00', rateSurplus: 2.3, rateGrid: 6.8, savings: 8600 },
  ]);

  const shifts = [
    { date: 'Today', time: '11:00–14:00', load: 1400, rate: 2.1, savings: 12400 },
    { date: 'Yesterday', time: '09:00–12:00', load: 1200, rate: 1.9, savings: 9100 },
    { date: 'Apr 28', time: '14:00–17:00', load: 1000, rate: 2.3, savings: 8600 },
    { date: 'Apr 26', time: '10:00–13:00', load: 1200, rate: 2.0, savings: 10200 },
    { date: 'Apr 25', time: '15:00–18:00', load: 800, rate: 2.5, savings: 6800 },
  ];

  const handleAccept = (id: number) => {
    const alert = alerts.find(a => a.id === id);
    if (!alert) return;
    setAlerts([...alerts.filter(a => a.id !== id), { ...alert, accepted: true } as any]);
  };

  return (
    <DashboardLayout title="Overview">
      {showBanner && (
        <div className="w-full rounded-[10px] p-[14px_20px] bg-[#EFF6FF] border border-[#BFDBFE] border-l-[3px] border-l-[#2563EB] flex items-center justify-between mb-[32px]">
          <div className="flex items-center gap-3">
            <Zap size={16} strokeWidth={1.5} color="#2563EB" />
            <div>
              <span className="text-[14px] font-medium text-[#1E40AF] mr-2">Next window:</span>
              <span className="text-[14px] text-[#1E40AF]">Tomorrow 11:00–14:00 · Estimated savings ₹12,400</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard/consumer/alerts" className="text-[14px] font-medium text-[#2563EB] hover:underline flex items-center gap-1">
              View details <ArrowRight size={14} />
            </Link>
            <button onClick={() => setShowBanner(false)} className="text-[#60A5FA] hover:text-[#1D4ED8]">
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-[32px]">
        {/* Stat 1 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Savings this month</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <IndianRupee size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">₹38,700</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]">
            <span>+18% vs last month</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Load shifts completed</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <CalendarCheck size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">7</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
            <span>On track for goal</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Clean energy used</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <Leaf size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">14.3 MWh</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]">
            <span>+5% vs last month</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Carbon offset</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <Wind size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">1,140 kg</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
            <span>CO₂ equivalent</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-[12px]">
        <h3 className="text-[15px] font-bold text-[#0D1117]">Pending alerts</h3>
        <Link to="/dashboard/consumer/alerts" className="text-[13px] font-medium text-[#2563EB] hover:underline">View all alerts</Link>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden mb-[32px]">
        <table className="w-full text-left border-collapse">
          <tbody>
            {alerts.map((a: any) => (
              <tr key={a.id} className={`border-b border-[#F1F5F9] last:border-0 ${a.accepted ? 'bg-[#F9FAFB]' : 'hover:bg-[#F9FAFB]'} transition-colors duration-100`}>
                <td className={`p-[14px_16px] text-[14px] ${a.accepted ? 'text-[#9CA3AF]' : 'font-bold text-[#0D1117]'}`}>{a.time}</td>
                <td className={`p-[14px_16px] text-[14px] ${a.accepted ? 'text-[#9CA3AF]' : 'text-[#374151]'}`}>₹{a.rateSurplus}/unit vs ₹{a.rateGrid}/unit</td>
                <td className={`p-[14px_16px] text-[14px] font-bold ${a.accepted ? 'text-[#9CA3AF]' : 'text-[#16A34A]'}`}>Save ₹{a.savings}</td>
                <td className="p-[14px_16px] text-right">
                  {a.accepted ? (
                    <span className="inline-flex px-[10px] py-[3px] rounded-full text-[11px] font-medium border bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]">Scheduled</span>
                  ) : (
                    <button onClick={() => handleAccept(a.id)} className="h-[32px] px-[16px] bg-[#2563EB] text-white rounded-[6px] font-medium text-[13px] hover:bg-[#1D4ED8] transition-colors">Accept shift</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-[15px] font-bold text-[#0D1117] mb-[12px]">Recent load shifts</h3>
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Date</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Time window</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Load shifted (kW)</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Energy rate</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Savings (₹)</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s, i) => (
              <tr key={i} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-100">
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{s.date}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{s.time}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{s.load}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">₹{s.rate}</td>
                <td className="p-[14px_16px] text-[14px] font-bold text-[#16A34A]">₹{s.savings}</td>
                <td className="p-[14px_16px]">
                  <span className="inline-flex px-[10px] py-[3px] rounded-full text-[11px] font-medium border bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]">Completed</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
