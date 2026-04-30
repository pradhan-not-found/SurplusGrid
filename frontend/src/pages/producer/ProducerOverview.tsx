import DashboardLayout from '../../components/DashboardLayout';
import { Zap, ShieldCheck, IndianRupee, GitMerge, ArrowUpRight } from 'lucide-react';

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
      <div className="grid grid-cols-4 gap-5 mb-[40px]">
        
        {/* Stat 1 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Predicted surplus</span>
            <Zap size={16} strokeWidth={1.5} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">4.2</span>
            <span className="text-[14px] font-medium text-[#71717A]">MW</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#71717A] mt-2">
            <div className="flex items-center text-[#10B981] font-medium"><ArrowUpRight size={14} strokeWidth={2} /> 12%</div>
            from last month
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Curtailment avoided</span>
            <ShieldCheck size={16} strokeWidth={1.5} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">18.6</span>
            <span className="text-[14px] font-medium text-[#71717A]">MWh</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#71717A] mt-2">
            <div className="flex items-center text-[#10B981] font-medium"><ArrowUpRight size={14} strokeWidth={2} /> 8%</div>
            from last month
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Revenue</span>
            <IndianRupee size={16} strokeWidth={1.5} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">₹41.2k</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#71717A] mt-2">
            <div className="flex items-center text-[#10B981] font-medium"><ArrowUpRight size={14} strokeWidth={2} /> 24%</div>
            from last month
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[#71717A]">Active matches</span>
            <GitMerge size={16} strokeWidth={1.5} className="text-[#A1A1AA]" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[28px] font-bold text-[#09090B] tracking-tight">3</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#71717A] mt-2">
            Consistent with last week
          </div>
        </div>

      </div>

      <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight mb-4">Upcoming surplus windows</h3>
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-[40px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Date</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Time Window</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Predicted Surplus</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Matched Demand</th>
              <th className="p-[14px_20px] text-[12px] font-medium text-[#71717A] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {surplusWindows.map((w, i) => (
              <tr key={i} className="border-b border-[#F4F4F5] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-150">
                <td className="p-[16px_20px] text-[14px] text-[#09090B] font-medium">{w.date}</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{w.time}</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{w.predicted} MW</td>
                <td className="p-[16px_20px] text-[14px] text-[#3F3F46]">{w.matched} MW</td>
                <td className="p-[16px_20px] text-[14px]">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium border ${
                    w.status === 'Matched' ? 'bg-[#ECFDF5] text-[#065F46] border-[#D1FAE5]' :
                    w.status === 'Seeking' ? 'bg-[#FFFBEB] text-[#92400E] border-[#FEF3C7]' :
                    w.status === 'Partial' ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE]' :
                    'bg-[#F4F4F5] text-[#3F3F46] border-[#E4E4E7]'
                  }`}>
                    {w.status === 'Matched' && <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-1.5" />}
                    {w.status === 'Seeking' && <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mr-1.5" />}
                    {w.status === 'Partial' && <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mr-1.5" />}
                    {w.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-[16px] font-bold text-[#09090B] tracking-tight mb-4">Active match cards</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {activeMatches.map((m, i) => (
          <div key={i} className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm p-5 min-w-[280px] hover:border-[#D4D4D8] transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[15px] font-bold text-[#09090B] tracking-tight">{m.consumer}</div>
              <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#71717A]">Type</span>
                <span className="font-medium text-[#09090B]">{m.type}</span>
              </div>
              <div className="h-[1px] w-full bg-[#F4F4F5]" />
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#71717A]">Volume</span>
                <span className="font-medium text-[#09090B]">{m.mw} MW</span>
              </div>
              <div className="h-[1px] w-full bg-[#F4F4F5]" />
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#71717A]">Time</span>
                <span className="font-medium text-[#09090B]">{m.time}</span>
              </div>
              <div className="h-[1px] w-full bg-[#F4F4F5]" />
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#71717A]">Duration</span>
                <span className="font-medium text-[#09090B]">{m.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
