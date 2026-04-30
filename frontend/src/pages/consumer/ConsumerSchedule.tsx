import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Trash2 } from 'lucide-react';

export default function ConsumerSchedule() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const [grid, setGrid] = useState<Record<string, string>>({
    'Mon-11': 'sched', 'Mon-12': 'sched', 'Mon-13': 'sched',
    'Tue-09': 'flex', 'Tue-10': 'flex',
    'Wed-14': 'live', 'Wed-15': 'live',
    'Thu-11': 'flex', 'Thu-12': 'flex',
  });

  const toggleCell = (day: string, hour: number) => {
    const key = `${day}-${hour}`;
    const current = grid[key];
    if (current === 'sched' || current === 'live') {
      alert(`Shift from SolarTech Farm\nRate: ₹2.1/unit\nSavings: ₹12,400\n[Cancel Shift]`);
    } else {
      setGrid(prev => ({
        ...prev,
        [key]: current === 'flex' ? '' : 'flex'
      }));
    }
  };

  const [upcoming, setUpcoming] = useState([
    { id: 1, date: 'Tomorrow', time: '11:00–14:00', load: 1400, producer: 'SolarTech Farm', rate: 2.1, savings: 12400 },
    { id: 2, date: 'May 3', time: '09:00–12:00', load: 1200, producer: 'WindGen India', rate: 1.9, savings: 9100 },
  ]);

  const handleCancel = (id: number) => {
    setUpcoming(upcoming.filter(s => s.id !== id));
  };

  return (
    <DashboardLayout title="Load Schedule">
      <div className="flex justify-between items-center mb-[24px]">
        <button className="h-[40px] px-[16px] bg-white border border-[#E5E7EB] text-[#374151] rounded-[8px] font-medium text-[14px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-colors">&lt; Previous week</button>
        <h2 className="text-[16px] font-bold text-[#0D1117]">May 1 – May 7, 2026</h2>
        <button className="h-[40px] px-[16px] bg-white border border-[#E5E7EB] text-[#374151] rounded-[8px] font-medium text-[14px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-colors">Next week &gt;</button>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] mb-[24px] overflow-x-auto shadow-none">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-8 border-b border-[#E5E7EB]">
            <div className="p-2 font-medium text-[#9CA3AF] text-[11px] uppercase tracking-[0.04em]">Time</div>
            {days.map(d => <div key={d} className="p-2 font-medium text-[13px] text-[#374151] text-center border-l border-[#F1F5F9]">{d}</div>)}
          </div>
          <div className="h-[400px] overflow-y-auto">
            {Array.from({length: 24}).map((_, h) => (
              <div key={h} className="grid grid-cols-8 border-b border-[#F1F5F9] last:border-0">
                <div className="p-2 text-[12px] text-[#9CA3AF] border-r border-[#F1F5F9]">{String(h).padStart(2, '0')}:00</div>
                {days.map(d => {
                  const key = `${d}-${h}`;
                  const state = grid[key];
                  const bg = state === 'flex' ? 'bg-[#DBEAFE]' : state === 'sched' ? 'bg-[#16A34A] text-white' : state === 'live' ? 'bg-[#EF4444] text-white' : 'hover:bg-[#F9FAFB]';
                  return (
                    <div 
                      key={d} 
                      onClick={() => toggleCell(d, h)}
                      className={`border-r border-[#F1F5F9] cursor-pointer transition-colors ${bg}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-6 mb-[48px] text-[13px] text-[#6B7280]">
        <div className="flex items-center gap-2"><div className="w-4 h-4 border border-[#E5E7EB] rounded-[4px] bg-[#F9FAFB]"></div> Empty</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#DBEAFE] rounded-[4px]"></div> Flexible window</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#16A34A] rounded-[4px]"></div> Scheduled shift</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#EF4444] rounded-[4px]"></div> Active shift</div>
      </div>

      <h3 className="text-[15px] font-bold text-[#0D1117] mb-[12px]">Upcoming scheduled shifts</h3>
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Date</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Time window</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Load (kW)</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Producer</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Rate</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Savings</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map(s => (
              <tr key={s.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-100">
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{s.date}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{s.time}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{s.load}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{s.producer}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">₹{s.rate}</td>
                <td className="p-[14px_16px] text-[14px] font-bold text-[#16A34A]">₹{s.savings}</td>
                <td className="p-[14px_16px]">
                  <button onClick={() => handleCancel(s.id)} className="flex items-center gap-1.5 text-[13px] text-[#EF4444] hover:underline">
                    <Trash2 size={13} /> Cancel
                  </button>
                </td>
              </tr>
            ))}
            {upcoming.length === 0 && (
              <tr>
                <td colSpan={7} className="p-[48px] text-center text-[14px] text-[#6B7280]">
                  No scheduled shifts
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
