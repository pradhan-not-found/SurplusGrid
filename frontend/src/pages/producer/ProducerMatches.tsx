import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { SlidersHorizontal, ChevronDown, ChevronUp, Download, GitMerge } from 'lucide-react';

export default function ProducerMatches() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const mockMatches = [
    { id: 'M-101', consumer: 'Ramesh Cold Storage', type: 'Cold storage', date: '2026-05-01', time: '11:00–14:00', mw: 1.4, status: 'Active', savings: 4200 },
    { id: 'M-102', consumer: 'Arvind Textiles', type: 'Textile mill', date: '2026-05-01', time: '11:00–14:00', mw: 1.2, status: 'Active', savings: 3600 },
    { id: 'M-103', consumer: 'BlueStar EV Depot', type: 'EV fleet', date: '2026-04-30', time: '09:00–13:00', mw: 1.2, status: 'Completed', savings: 4800 },
    { id: 'M-104', consumer: 'Acme Data', type: 'Data center', date: '2026-04-29', time: '15:00–18:00', mw: 2.0, status: 'Completed', savings: 6000 },
    { id: 'M-105', consumer: 'Zeta Manufacturing', type: 'Other', date: '2026-04-25', time: '10:00–12:00', mw: 0.8, status: 'Expired', savings: 0 },
  ];

  const filtered = statusFilter === 'All' ? mockMatches : mockMatches.filter(m => m.status === statusFilter);

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
              <option>Active</option>
              <option>Completed</option>
              <option>Expired</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Date From</label>
          <input type="date" className="w-[160px] h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Date To</label>
          <input type="date" className="w-[160px] h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" />
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all flex items-center gap-2">
            <SlidersHorizontal size={16} strokeWidth={1.5} /> Apply
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
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase w-10"></th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Match ID</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Consumer</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Facility type</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Date</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Time window</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">MW</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Status</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <React.Fragment key={m.id}>
                <tr 
                  onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                  className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-100 cursor-pointer"
                >
                  <td className="p-[14px_16px] text-[#9CA3AF]">
                    {expandedRow === i ? <ChevronUp size={16} strokeWidth={1.5} /> : <ChevronDown size={16} strokeWidth={1.5} />}
                  </td>
                  <td className="p-[14px_16px] text-[14px] font-bold text-[#2563EB]">{m.id}</td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{m.consumer}</td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{m.type}</td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{m.date}</td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{m.time}</td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{m.mw}</td>
                  <td className="p-[14px_16px] text-[14px]">
                    <span className={`inline-flex px-[10px] py-[3px] rounded-full text-[11px] font-medium border ${
                      m.status === 'Completed' || m.status === 'Active' ? 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]' :
                      m.status === 'Expired' ? 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]' :
                      'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-[14px_16px] text-[14px] text-[#16A34A] font-bold">₹{m.savings}</td>
                </tr>
                {expandedRow === i && (
                  <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
                    <td colSpan={9} className="p-[20px_24px]">
                      <div className="flex justify-between items-center text-[13px]">
                        <div className="text-[#374151] space-y-2">
                          <div><strong className="text-[#0D1117] font-medium w-[80px] inline-block">Contact:</strong> Rajesh K. (+91 9876543210)</div>
                          <div><strong className="text-[#0D1117] font-medium w-[80px] inline-block">Zone:</strong> WRLDC</div>
                          <div><strong className="text-[#0D1117] font-medium w-[80px] inline-block">Confirmed:</strong> {m.date} 08:12 AM</div>
                        </div>
                        <button className="flex items-center gap-1.5 text-[13px] text-[#2563EB] hover:underline font-medium">
                          <Download size={13} strokeWidth={1.5} /> Export row as CSV
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="p-[48px] text-center">
                  <div className="flex flex-col items-center justify-center text-[#6B7280]">
                    <GitMerge size={48} strokeWidth={1} className="text-[#D1D5DB] mb-4" />
                    <h3 className="text-[16px] font-medium text-[#374151] mb-1">No matches yet</h3>
                    <p className="text-[14px] text-[#9CA3AF]">Your first surplus window is being matched. Check back soon.</p>
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
