import DashboardLayout from '../../components/DashboardLayout';
import { Zap, ShieldCheck, IndianRupee, GitMerge, TrendingUp } from 'lucide-react';

export default function ProducerOverview() {
  const surplusWindows = [
    { date: 'Today', time: '11:00–14:00', predicted: 4.2, matched: 3.8, status: 'Matched' },
    { date: 'Today', time: '18:00–20:00', predicted: 2.1, matched: 0.0, status: 'Seeking' },
    { date: 'Tomorrow', time: '09:00–13:00', predicted: 5.7, matched: 5.7, status: 'Matched' },
    { date: 'Tomorrow', time: '15:00–17:00', predicted: 1.8, matched: 0.0, status: 'Seeking' },
    { date: 'May 3', time: '10:00–15:00', predicted: 6.3, matched: 4.1, status: 'Partial' },
  ];

  const activeMatches = [
    { consumer: 'Ramesh Cold Storage', type: 'Cold storage', mw: 1.4, time: '11:00–14:00', duration: '3 hrs' },
    { consumer: 'Arvind Textiles', type: 'Textile mill', mw: 1.2, time: '11:00–14:00', duration: '3 hrs' },
    { consumer: 'BlueStar EV Depot', type: 'EV fleet', mw: 1.2, time: '09:00–13:00', duration: '4 hrs' },
  ];

  return (
    <DashboardLayout title="Overview">
      <div className="grid grid-cols-4 gap-4 mb-[32px]">
        
        {/* Stat 1 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Predicted surplus (MW)</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <Zap size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">4.2</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]">
            <TrendingUp size={12} strokeWidth={2} />
            <span>+12% vs last month</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Curtailment avoided</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <ShieldCheck size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">18.6 MWh</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]">
            <TrendingUp size={12} strokeWidth={2} />
            <span>+8% vs last month</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Revenue (Month)</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <IndianRupee size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">₹41,200</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]">
            <TrendingUp size={12} strokeWidth={2} />
            <span>+24% vs last month</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Active matches</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <GitMerge size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">3</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
            <span>Same as last week</span>
          </div>
        </div>

      </div>

      <h3 className="text-[15px] font-bold text-[#0D1117] mb-[12px]">Upcoming surplus windows</h3>
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden mb-[32px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Date</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Time window</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Predicted surplus</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Matched demand</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {surplusWindows.map((w, i) => (
              <tr key={i} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-100">
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{w.date}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{w.time}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{w.predicted} MW</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{w.matched} MW</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">
                  <span className={`inline-flex px-[10px] py-[3px] rounded-full text-[11px] font-medium border ${
                    w.status === 'Matched' ? 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]' :
                    w.status === 'Seeking' ? 'bg-[#FEF9C3] text-[#854D0E] border-[#FEF08A]' :
                    w.status === 'Partial' ? 'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]' :
                    'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]'
                  }`}>
                    {w.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-[15px] font-bold text-[#0D1117] mb-[12px]">Active match cards</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {activeMatches.map((m, i) => (
          <div key={i} className="bg-white border border-[#E5E7EB] rounded-[12px] p-5 min-w-[250px] hover:border-[#BFDBFE] transition-colors duration-150">
            <div className="text-[15px] font-bold text-[#0D1117] mb-1">{m.consumer}</div>
            <div className="text-[13px] text-[#6B7280] mb-4">{m.type}</div>
            <div className="flex justify-between items-center text-[14px] mb-2">
              <span className="text-[#6B7280]">Volume</span>
              <span className="font-bold text-[#0D1117]">{m.mw} MW</span>
            </div>
            <div className="flex justify-between items-center text-[14px] mb-2">
              <span className="text-[#6B7280]">Time</span>
              <span className="font-bold text-[#0D1117]">{m.time}</span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-[#6B7280]">Duration</span>
              <span className="font-bold text-[#0D1117]">{m.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
