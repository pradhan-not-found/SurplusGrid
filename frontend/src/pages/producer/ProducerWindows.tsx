import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Plus, X, Loader2, Trash2, Zap } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface Window {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  predicted_kw: number;
  status: string;
}

export default function ProducerWindows() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [windows, setWindows] = useState<Window[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [surplus, setSurplus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWindows();
    }
  }, [user]);

  const fetchWindows = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('surplus_windows')
      .select('*')
      .eq('producer_id', user.id)
      .order('date', { ascending: false })
      .order('start_time', { ascending: false });

    if (error) {
      console.error('Error fetching windows:', error);
    } else {
      setWindows(data || []);
    }
    setInitialLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !date || !start || !end || !surplus) return;
    setLoading(true);
    
    const { data, error } = await supabase
      .from('surplus_windows')
      .insert({
        producer_id: user.id,
        date,
        start_time: start,
        end_time: end,
        predicted_kw: Number(surplus),
        notes,
        status: 'seeking'
      })
      .select()
      .single();

    setLoading(false);

    if (error) {
      console.error('Error inserting window:', error);
      alert('Failed to add window: ' + error.message);
      return;
    }

    if (data) {
      setWindows([data, ...windows]);
      setSuccess(true);
      setDate(''); setStart(''); setEnd(''); setSurplus(''); setNotes('');
      
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 2000);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('surplus_windows')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting window:', error);
      alert('Failed to delete window');
    } else {
      setWindows(windows.filter(w => w.id !== id));
    }
  };

  return (
    <DashboardLayout title="Surplus Windows">
      <div className="mb-[24px]">
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="h-[40px] px-[20px] bg-white border border-[#E5E7EB] text-[#374151] rounded-[8px] font-medium text-[14px] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add surplus window
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[#BFDBFE] rounded-[12px] p-[24px] mb-[24px] shadow-[0_4px_24px_rgba(37,99,235,0.05)] animate-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[15px] font-bold text-[#0D1117]">New surplus window</h3>
            <button onClick={() => setShowForm(false)} className="text-[#6B7280] hover:text-[#0D1117]">
              <X size={18} />
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
                    <textarea rows={1} value={notes} onChange={e=>setNotes(e.target.value)} className="w-full min-h-[40px] px-[12px] py-2 bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#0D1117] outline-none focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 transition-shadow resize-y" />
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

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden min-h-[300px]">
        {initialLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="animate-spin text-[#9CA3AF]" size={32} />
          </div>
        ) : (
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Date</th>
                <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Start</th>
                <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">End</th>
                <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Surplus (kW)</th>
                <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Status</th>
                <th className="p-[12px_16px] text-[12px] font-semibold text-[#6B7280] tracking-[0.04em] uppercase border border-[#E5E7EB]">Action</th>
              </tr>
            </thead>
            <tbody>
              {windows.map((w) => (
                <tr key={w.id} className="hover:bg-[#F9FAFB] transition-colors duration-100">
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">{w.date}</td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">{w.start_time.substring(0, 5)}</td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">{w.end_time.substring(0, 5)}</td>
                  <td className="p-[14px_16px] text-[14px] text-[#0D1117] border border-[#E5E7EB]">{w.predicted_kw}</td>
                  <td className="p-[14px_16px] text-[14px] border border-[#E5E7EB]">
                    <span className={`inline-flex px-[10px] py-[3px] rounded-full text-[11px] font-medium border capitalize ${
                      w.status === 'matched' ? 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]' :
                      w.status === 'seeking' ? 'bg-[#FEF9C3] text-[#854D0E] border-[#FEF08A]' :
                      w.status === 'expired' ? 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]' :
                      w.status === 'partial' ? 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]' :
                      'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
                    }`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="p-[14px_16px] border border-[#E5E7EB]">
                    <button onClick={() => handleDelete(w.id)} className="flex items-center gap-1.5 text-[13px] text-[#EF4444] hover:underline">
                      <Trash2 size={13} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {windows.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-[48px] text-center border border-[#E5E7EB]">
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
        )}
      </div>
    </DashboardLayout>
  );
}
