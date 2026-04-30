import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Plus, X, Loader2, Trash2 } from 'lucide-react';

interface Window {
  id: number;
  date: string;
  start: string;
  end: string;
  surplus: number;
  matched: number;
  status: string;
}

export default function ProducerWindows() {
  const [showForm, setShowForm] = useState(false);
  const [windows, setWindows] = useState<Window[]>([
    { id: 1, date: '2026-05-01', start: '11:00', end: '14:00', surplus: 4200, matched: 3800, status: 'Matched' },
    { id: 2, date: '2026-05-01', start: '18:00', end: '20:00', surplus: 2100, matched: 0, status: 'Seeking' },
    { id: 3, date: '2026-04-29', start: '08:00', end: '10:00', surplus: 1000, matched: 0, status: 'Expired' },
    { id: 4, date: '2026-04-28', start: '12:00', end: '15:00', surplus: 3000, matched: 0, status: 'Curtailed' },
  ]);

  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [surplus, setSurplus] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !start || !end || !surplus) return;
    setLoading(true);
    
    setTimeout(() => {
      const newWin: Window = {
        id: Date.now(),
        date, start, end, surplus: Number(surplus), matched: 0, status: 'Seeking'
      };
      setWindows([newWin, ...windows]);
      setLoading(false);
      setSuccess(true);
      setDate(''); setStart(''); setEnd(''); setSurplus('');
      
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 2000);
    }, 600);
  };

  const handleDelete = (id: number) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  return (
    <DashboardLayout title="Surplus Windows">
      <div className="mb-[24px]">
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="h-[40px] px-[20px] bg-white border border-[#E5E7EB] text-[#374151] rounded-[8px] font-medium text-[14px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] flex items-center gap-2 transition-colors"
        >
          <Plus size={16} strokeWidth={1.5} />
          Add surplus window
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[#BFDBFE] rounded-[12px] p-[24px] mb-[24px] shadow-[0_4px_24px_rgba(37,99,235,0.05)] animate-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[15px] font-bold text-[#0D1117]">New surplus window</h3>
            <button onClick={() => setShowForm(false)} className="text-[#6B7280] hover:text-[#0D1117]">
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {success ? (
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-[8px] p-[16px] text-[#065F46] text-[14px] font-medium flex items-center gap-2">
              Surplus window added successfully. Seeking matches.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Date</label>
                    <input type="date" required value={date} onChange={e=>setDate(e.target.value)} className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Start time</label>
                      <input type="time" required value={start} onChange={e=>setStart(e.target.value)} className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">End time</label>
                      <input type="time" required value={end} onChange={e=>setEnd(e.target.value)} className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Predicted surplus (kW)</label>
                    <input type="number" required value={surplus} onChange={e=>setSurplus(e.target.value)} placeholder="e.g. 5000" className="w-full h-[40px] px-[12px] bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#374151] mb-[6px]">Notes (optional)</label>
                    <textarea rows={1} className="w-full min-h-[40px] px-[12px] py-2 bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow resize-y" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" disabled={loading} className="h-[40px] px-[20px] bg-[#2563EB] text-white rounded-[8px] font-medium text-[14px] hover:bg-[#1D4ED8] active:scale-98 transition-all flex items-center justify-center min-w-[120px]">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : 'Add window'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Date</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Start</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">End</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Surplus (kW)</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Matched (kW)</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Status</th>
              <th className="p-[12px_16px] text-[12px] font-medium text-[#6B7280] tracking-[0.04em] uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {windows.map((w) => (
              <tr key={w.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F9FAFB] transition-colors duration-100">
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{w.date}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{w.start}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{w.end}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{w.surplus}</td>
                <td className="p-[14px_16px] text-[14px] text-[#0D1117]">{w.matched}</td>
                <td className="p-[14px_16px] text-[14px]">
                  <span className={`inline-flex px-[10px] py-[3px] rounded-full text-[11px] font-medium border ${
                    w.status === 'Matched' ? 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]' :
                    w.status === 'Seeking' ? 'bg-[#FEF9C3] text-[#854D0E] border-[#FEF08A]' :
                    w.status === 'Expired' ? 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]' :
                    'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]' // Curtailed
                  }`}>
                    {w.status}
                  </span>
                </td>
                <td className="p-[14px_16px]">
                  <button onClick={() => handleDelete(w.id)} className="flex items-center gap-1.5 text-[13px] text-[#EF4444] hover:underline">
                    <Trash2 size={13} strokeWidth={1.5} /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {windows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-[48px] text-center">
                  <div className="flex flex-col items-center justify-center text-[#6B7280]">
                    <Zap size={48} strokeWidth={1} className="text-[#D1D5DB] mb-4" />
                    <h3 className="text-[16px] font-medium text-[#374151] mb-1">No surplus windows</h3>
                    <p className="text-[14px] text-[#9CA3AF]">Add your first forecasted surplus block to start matching.</p>
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
