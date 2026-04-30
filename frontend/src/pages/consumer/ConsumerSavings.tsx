import DashboardLayout from '../../components/DashboardLayout';
import { IndianRupee, CalendarCheck, Leaf, Download, TrendingUp } from 'lucide-react';

export default function ConsumerSavings() {
  const chartData = [
    { month: 'Nov 2025', shortMonth: 'Nov', value: 8200 },
    { month: 'Dec 2025', shortMonth: 'Dec', value: 11400 },
    { month: 'Jan 2026', shortMonth: 'Jan', value: 14700 },
    { month: 'Feb 2026', shortMonth: 'Feb', value: 19200 },
    { month: 'Mar 2026', shortMonth: 'Mar', value: 32800 },
    { month: 'Apr 2026', shortMonth: 'Apr', value: 38700 },
  ];
  const maxVal = Math.max(...chartData.map(d => d.value));

  const history = [
    { date: '2026-04-28', time: '14:00–17:00', units: 3000, rate: 2.3, grid: 6.8, savings: 13500 },
    { date: '2026-04-26', time: '10:00–13:00', units: 3600, rate: 2.0, grid: 6.8, savings: 17280 },
    { date: '2026-04-25', time: '15:00–18:00', units: 2400, rate: 2.5, grid: 6.8, savings: 10320 },
    { date: '2026-04-20', time: '11:00–14:00', units: 4200, rate: 1.8, grid: 6.8, savings: 21000 },
  ];

  const exportCSV = () => {
    const header = "Date,Time window,Units shifted (kWh),Rate paid,Grid rate,Savings (₹)\n";
    const rows = history.map(h => `${h.date},${h.time},${h.units},${h.rate},${h.grid},${h.savings}`).join("\n");
    const csvContent = header + rows;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'savings_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout title="Savings">
      <div className="grid grid-cols-3 gap-4 mb-[32px]">
        {/* Stat 1 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Total savings to date</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <IndianRupee size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#16A34A] tracking-[-0.02em] mt-3 mb-1.5">₹1,24,300</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]">
            <TrendingUp size={12} strokeWidth={2} />
            <span>+18% vs last year</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Shifts completed</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <CalendarCheck size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">31</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
            <span>Active since Nov 2025</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Clean energy consumed</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <Leaf size={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">67.4 MWh</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]">
            <TrendingUp size={12} strokeWidth={2} />
            <span>+12% vs last year</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[24px] mb-[32px] shadow-none">
        <h3 className="text-[15px] font-bold text-[#0D1117] mb-[24px]">Monthly savings</h3>
        <div className="relative h-[240px] flex items-end gap-6 pt-[20px]">
          {/* Faint horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-[28px]">
            <div className="border-t border-[#F1F5F9] w-full" />
            <div className="border-t border-[#F1F5F9] w-full" />
            <div className="border-t border-[#F1F5F9] w-full" />
            <div className="border-t border-[#F1F5F9] w-full" />
            <div className="border-t border-[#E5E7EB] w-full" />
          </div>

          {/* Bars */}
          <div className="relative w-full h-[212px] flex items-end gap-6 z-10 pb-[1px]">
            {chartData.map((d, i) => {
              const heightPct = (d.value / maxVal) * 100;
              return (
                <div key={i} className="flex-1 h-full flex flex-col justify-end group">
                  <div className="relative w-full flex justify-center">
                    {/* Tooltip */}
                    <div className="absolute -top-[40px] opacity-0 group-hover:opacity-100 bg-[#0D1117] text-white text-[12px] px-[10px] py-[6px] rounded-[6px] whitespace-nowrap pointer-events-none transition-opacity z-20">
                      ₹{d.value.toLocaleString()} · {d.month}
                    </div>
                    {/* Value above bar */}
                    <div className="absolute -top-[20px] text-[12px] font-medium text-[#0D1117]">
                      {d.value >= 1000 ? `${(d.value/1000).toFixed(1)}k` : d.value}
                    </div>
                    {/* Bar itself */}
                    <div 
                      className="w-full bg-[#2563EB] group-hover:bg-[#1D4ED8] rounded-t-[6px] min-h-[4px] transition-all duration-300"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* X-axis labels */}
        <div className="flex gap-6 mt-[8px]">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 text-center text-[12px] text-[#6B7280]">{d.shortMonth}</div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-[12px]">
        <h3 className="text-[15px] font-bold text-[#0D1117]">Savings history</h3>
        <button 
          onClick={exportCSV} 
          className="h-[40px] px-[20px] bg-white border border-[#E5E7EB] text-[#374151] rounded-[8px] font-medium text-[14px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] flex items-center gap-2 transition-colors"
        >
          <Download size={16} strokeWidth={1.5} /> Export as CSV
        </button>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Date</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Time window</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Units shifted (kWh)</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Rate paid</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Grid rate</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Savings (₹)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-100">
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{h.date}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{h.time}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{h.units}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">₹{h.rate}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">₹{h.grid}</td>
                <td className="p-[14px_16px] text-[14px] text-[#16A34A] font-bold">₹{h.savings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
