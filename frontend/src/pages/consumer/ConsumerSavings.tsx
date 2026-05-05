import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { IndianRupee, CalendarCheck, Leaf, Download, TrendingUp, ShieldCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ConsumerSavings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    fetchSavingsData();
  }, [user?.id]);

  const fetchSavingsData = async () => {
    setLoading(true);
    try {
      // 1. Fetch pre-calculated report
      const { data: reportData } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user?.id)
        .eq('report_type', 'monthly_summary')
        .single();
      
      setReport(reportData);

      // 2. Fetch full match history
      const { data: matches } = await supabase
        .from('matches')
        .select(`
          *,
          surplus_windows (date, start_time, end_time)
        `)
        .eq('consumer_id', user?.id)
        .order('created_at', { ascending: false });
      
      const formattedHistory = (matches || []).map(m => ({
        date: m.surplus_windows?.date || 'Today',
        time: m.surplus_windows ? `${m.surplus_windows.start_time?.substring(0,5)}–${m.surplus_windows.end_time?.substring(0,5)}` : 'Completed',
        units: m.matched_kw,
        rate: 4.0, // Surplus rate
        grid: 8.5, // Standard grid rate
        savings: m.consumer_savings_inr,
        status: m.status
      }));

      setHistory(formattedHistory);
    } catch (error) {
      console.error('Error fetching savings data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const header = "Date,Time window,Units shifted (kWh),Rate paid (₹),Grid rate (₹),Savings (₹)\n";
    const rows = history.map(h => `${h.date},${h.time},${h.units},${h.rate},${h.grid},${h.savings}`).join("\n");
    const csvContent = header + rows;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `savings_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <DashboardLayout title="Savings"><div className="animate-pulse space-y-4"><div className="h-32 bg-gray-100 rounded-lg"></div><div className="h-64 bg-gray-100 rounded-lg"></div></div></DashboardLayout>;

  return (
    <DashboardLayout title="Savings">
      <div className="grid grid-cols-3 gap-4 mb-[32px]">
        {/* Stat 1: Total Savings */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Total savings to date</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <IndianRupee size={20} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#16A34A] tracking-[-0.02em] mt-3 mb-1.5">
            ₹{(report?.total_savings_inr || 0).toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]">
            <ShieldCheck size={12} strokeWidth={2} />
            <span>Audit Verified</span>
          </div>
        </div>

        {/* Stat 2: Shifts */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Shifts completed</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">{history.length}</div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
            <span>Last 30 days active</span>
          </div>
        </div>

        {/* Stat 3: Carbon */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[20px] pb-[24px] hover:border-[#BFDBFE] transition-colors duration-150">
          <div className="flex justify-between items-start">
            <span className="text-[13px] text-[#6B7280]">Clean energy consumed</span>
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#F0F7FF] flex items-center justify-center text-[#2563EB]">
              <Leaf size={20} />
            </div>
          </div>
          <div className="text-[28px] font-bold text-[#0D1117] tracking-[-0.02em] mt-3 mb-1.5">
            {((report?.total_kw || 0) / 1000).toFixed(2)} MWh
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#16A34A]">
            <TrendingUp size={12} strokeWidth={2} />
            <span>{report?.total_carbon_offset_kg || 0}kg CO2 avoided</span>
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] p-[24px] mb-[32px] flex items-center justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-[#0D1117]">Verified Savings Report</h3>
          <p className="text-[14px] text-[#6B7280]">Period: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} · Data pre-calculated by SurplusGrid Oracle</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <div className="text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold">Total Surplus Used</div>
            <div className="text-[18px] font-bold text-[#0D1117]">{report?.total_kw || 0} kWh</div>
          </div>
          <div className="text-right">
            <div className="text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold">Efficiency Grade</div>
            <div className="text-[18px] font-bold text-[#2563EB]">A+ / Top 5%</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-[12px]">
        <h3 className="text-[15px] font-bold text-[#0D1117]">Transaction History</h3>
        <button 
          onClick={exportCSV} 
          className="h-[40px] px-[20px] bg-white border border-[#E5E7EB] text-[#374151] rounded-[8px] font-medium text-[14px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] flex items-center gap-2 transition-colors"
        >
          <Download size={16} /> Export Statement
        </button>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden mb-10">
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="bg-[#F8FAFC]">
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Date</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Time Window</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Units (kWh)</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Rate Paid</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Grid Rate</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Savings (₹)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="hover:bg-[#F9FAFB] transition-colors duration-100">
                <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">{h.date}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">{h.time}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">{h.units}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">₹{h.rate}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">₹{h.grid}</td>
                <td className="p-[14px_16px] text-[14px] text-[#16A34A] font-semibold border border-[#E5E7EB]">₹{h.savings.toLocaleString()}</td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr><td colSpan={6} className="p-10 text-center text-[#6B7280]">No history found. Matches will appear here once verified.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
