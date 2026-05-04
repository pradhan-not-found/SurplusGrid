import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { SlidersHorizontal, ChevronDown, ChevronUp, Download, GitMerge, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ProducerMatches() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMatches();

      // Realtime listener for new matches
      const channel = supabase
        .channel('realtime-producer-matches')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'matches' },
          () => {
            console.log('⚡ New match detected! Refreshing list...');
            fetchMatches();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user?.id]);

  const fetchMatches = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          consumer:consumer_id(full_name, company_name),
          surplus_windows(date, start_time, end_time)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMatches(data || []);
    } catch (err) {
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = statusFilter === 'All' ? matches : matches.filter(m => m.status.toLowerCase() === statusFilter.toLowerCase());

  if (loading) {
    return (
      <DashboardLayout title="Matches">
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="animate-spin text-[#2563EB]" size={32} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Matches">
      <div className="bg-white p-[24px] border border-[#E5E7EB] rounded-[12px] mb-[24px] flex items-end gap-4 shadow-none">
        <div>
          <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Status</label>
          <div className="relative">
            <select 
              value={statusFilter} 
              onChange={e=>setStatusFilter(e.target.value)}
              className="w-[180px] h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 appearance-none transition-shadow"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Accepted</option>
              <option>Completed</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all flex items-center gap-2">
            <SlidersHorizontal size={16} /> Apply
          </button>
          <button 
            onClick={() => setStatusFilter('All')} 
            className="h-[40px] px-[20px] bg-white border border-[#E5E7EB] text-[#374151] rounded-[8px] font-medium text-[14px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="bg-[#F8FAFC]">
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB] w-10"></th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Consumer</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Date</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Time window</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">kW Matched</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Status</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Revenue (₹)</th>
              <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Impact (CO₂ kg)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <React.Fragment key={m.id}>
                <tr 
                  onClick={() => setExpandedRow(expandedRow === m.id ? null : m.id)}
                  className="hover:bg-[#F9FAFB] transition-colors duration-100 cursor-pointer"
                >
                  <td className="p-[14px_16px] text-[#9CA3AF] border border-[#E5E7EB]">
                    {expandedRow === m.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">
                    {m.consumer?.company_name || m.consumer?.full_name || 'Anonymous Consumer'}
                  </td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">
                    {m.surplus_windows?.date}
                  </td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">
                    {m.surplus_windows?.start_time?.substring(0, 5)}–{m.surplus_windows?.end_time?.substring(0, 5)}
                  </td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">{m.matched_kw}</td>
                  <td className="p-[14px_16px] text-[14px] border border-[#E5E7EB]">
                    <span className={`inline-flex px-[10px] py-[3px] rounded-full text-[11px] font-medium border capitalize ${
                      m.status === 'accepted' || m.status === 'completed' ? 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]' :
                      m.status === 'pending' ? 'bg-[#FEF9C3] text-[#854D0E] border-[#FEF08A]' :
                      'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-[14px_16px] text-[14px] text-[#16A34A] font-semibold border border-[#E5E7EB]">
                    ₹{(m.producer_revenue_inr || 0).toLocaleString()}
                  </td>
                  <td className="p-[14px_16px] text-[14px] text-[#2563EB] font-medium border border-[#E5E7EB]">
                    {m.carbon_offset_kg?.toFixed(1) || 0} kg
                  </td>
                </tr>
                {expandedRow === m.id && (
                  <tr className="bg-[#F8FAFC]">
                    <td colSpan={7} className="p-[20px_24px] border border-[#E5E7EB]">
                      <div className="flex justify-between items-center text-[13px]">
                        <div className="text-[#374151] space-y-2">
                          <div><strong className="text-[#0D1117] font-medium w-[80px] inline-block">Match ID:</strong> {m.id}</div>
                          <div><strong className="text-[#0D1117] font-medium w-[80px] inline-block">Consumer ID:</strong> {m.consumer_id}</div>
                          <div><strong className="text-[#0D1117] font-medium w-[80px] inline-block">Confirmed:</strong> {new Date(m.created_at).toLocaleString()}</div>
                        </div>
                        <button className="flex items-center gap-1.5 text-[13px] text-[#2563EB] hover:underline font-medium">
                          <Download size={13} /> Export row as CSV
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-[48px] text-center border border-[#E5E7EB]">
                  <div className="flex flex-col items-center justify-center text-[#6B7280]">
                    <GitMerge size={48} strokeWidth={1} className="text-[#D1D5DB] mb-4" />
                    <h3 className="text-[16px] font-medium text-[#374151] mb-1">No matches yet</h3>
                    <p className="text-[14px] text-[#9CA3AF]">Matches will appear here as soon as a consumer claims your surplus energy.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

