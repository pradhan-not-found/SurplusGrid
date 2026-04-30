import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

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
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !start || !end || !surplus) return;
    if (start >= end) {
      alert("End time must be after start time");
      return;
    }
    const newWin: Window = {
      id: Date.now(),
      date, start, end, surplus: Number(surplus), matched: 0, status: 'Seeking'
    };
    setWindows([newWin, ...windows]);
    setShowForm(false);
    setDate(''); setStart(''); setEnd(''); setSurplus('');
    setMsg('Window added');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this window?")) {
      setWindows(windows.filter(w => w.id !== id));
    }
  };

  return (
    <DashboardLayout title="Surplus Windows">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-gray-900 text-white px-4 py-2 rounded font-bold"
        >
          {showForm ? 'Cancel' : 'Add surplus window +'}
        </button>
        {msg && <span className="text-green-600 font-bold">{msg}</span>}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200 rounded mb-8 space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Date</label>
              <input type="date" required className="w-full border p-2" value={date} onChange={e=>setDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Start time</label>
              <input type="time" required className="w-full border p-2" value={start} onChange={e=>setStart(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">End time</label>
              <input type="time" required className="w-full border p-2" value={end} onChange={e=>setEnd(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Predicted surplus (kW)</label>
              <input type="number" required className="w-full border p-2" value={surplus} onChange={e=>setSurplus(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Notes</label>
            <textarea className="w-full border p-2" rows={2} />
          </div>
          <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Submit</button>
        </form>
      )}

      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Start</th>
              <th className="p-4 font-bold">End</th>
              <th className="p-4 font-bold">Surplus (kW)</th>
              <th className="p-4 font-bold">Matched (kW)</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {windows.map((w) => (
              <tr key={w.id} className="border-b border-gray-100 last:border-0">
                <td className="p-4">{w.date}</td>
                <td className="p-4">{w.start}</td>
                <td className="p-4">{w.end}</td>
                <td className="p-4">{w.surplus}</td>
                <td className="p-4">{w.matched}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    w.status === 'Matched' ? 'bg-green-100 text-green-800' :
                    w.status === 'Seeking' ? 'bg-yellow-100 text-yellow-800' :
                    w.status === 'Expired' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {w.status}
                  </span>
                </td>
                <td className="p-4">
                  <button onClick={() => handleDelete(w.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
