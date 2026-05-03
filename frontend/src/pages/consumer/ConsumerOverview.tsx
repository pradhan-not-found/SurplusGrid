import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { IndianRupee, CalendarCheck, Leaf, Wind, Zap, ArrowRight, X, ArrowUpRight } from 'lucide-react';

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
        <div className="w-full rounded-[10px] p-[16px_20px] bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-between mb-[40px] shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2563EB]" />
          <div className="flex items-center gap-4 pl-2">
            <Zap size={20} className="text-[#09090B]" />
            <div>
              <span className="text-[14px] font-semibold text-[#09090B] mr-2">Next available window:</span>
              <span className="text-[14px] text-[#3F3F46]">Tomorrow 11:00–14:00 · Estimated savings ₹12,400</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/dashboard/consumer/alerts" className="text-[13px] font-semibold text-[#09090B] hover:text-[#3F3F46] flex items-center gap-1.5 transition-colors">
              View details <ArrowRight size={14} />
            </Link>
            <button onClick={() => setShowBanner(false)} className="text-[#A1A1AA] hover:text-[#09090B] transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-5 mb-[40px]">
        {/* Stat 1 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Savings this month</span>
            <IndianRupee size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">₹38.7k</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#71717A] mt-2">
            <div className="flex items-center text-[#10B981] font-medium"><ArrowUpRight size={14} strokeWidth={2} /> 18%</div>
            from last month
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Load shifts completed</span>
            <CalendarCheck size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">7</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#71717A] mt-2">
            On track for monthly goal
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Clean energy used</span>
            <Leaf size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">14.3</span>
            <span className="text-[14px] font-medium text-[#71717A]">MWh</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#71717A] mt-2">
            <div className="flex items-center text-[#10B981] font-medium"><ArrowUpRight size={14} strokeWidth={2} /> 5%</div>
            from last month
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Carbon offset</span>
            <Wind size={16} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">1,140</span>
            <span className="text-[14px] font-medium text-[#71717A]">kg</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#71717A] mt-2">
            CO₂ equivalent avoided
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight">Pending alerts</h3>
        <Link to="/dashboard/consumer/alerts" className="text-[13px] font-semibold text-[#09090B] hover:text-[#3F3F46] transition-colors">View all alerts →</Link>
      </div>
      
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-[40px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Time Window</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Rate Comparison</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Estimated Savings</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a: any) => (
              <tr key={a.id} className={`border-b border-[#F4F4F5] last:border-0 ${a.accepted ? 'bg-[#FAFAFA]' : 'hover:bg-[#FAFAFA]'} transition-colors duration-150`}>
                <td className={`p-[16px_20px] text-[14px] ${a.accepted ? 'text-[#A1A1AA]' : 'font-medium text-[#09090B]'}`}>{a.time}</td>
                <td className={`p-[16px_20px] text-[14px] ${a.accepted ? 'text-[#A1A1AA]' : 'text-[#3F3F46]'}`}>
                  <span className="font-semibold text-[#09090B]">₹{a.rateSurplus}</span>/unit <span className="text-[#A1A1AA] mx-1">vs</span> ₹{a.rateGrid}/unit
                </td>
                <td className={`p-[16px_20px] text-[14px] ${a.accepted ? 'text-[#A1A1AA]' : 'font-semibold text-[#10B981]'}`}>₹{a.savings.toLocaleString()}</td>
                <td className="p-[16px_20px] text-right">
                  {a.accepted ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-medium bg-[#F4F4F5] text-[#71717A]">
                      Scheduled
                    </span>
                  ) : (
                    <button onClick={() => handleAccept(a.id)} className="h-[32px] px-[16px] bg-[#2563EB] text-white rounded-[6px] font-medium text-[13px] hover:bg-[#1D4ED8] transition-colors shadow-sm">
                      Accept shift
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight mb-4">Recent load shifts</h3>
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Date</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Time Window</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Load Shifted</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Rate</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Savings</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s, i) => (
              <tr key={i} className="border-b border-[#F4F4F5] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-150">
                <td className="p-[16px_20px] text-[14px] font-medium text-[#09090B]">{s.date}</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{s.time}</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{s.load} kW</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">₹{s.rate}</td>
                <td className="p-[16px_20px] text-[14px] font-semibold text-[#10B981]">₹{s.savings.toLocaleString()}</td>
                <td className="p-[16px_20px]">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
