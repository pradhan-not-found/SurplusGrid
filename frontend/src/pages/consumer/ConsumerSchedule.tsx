import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function ConsumerSchedule() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // mock states: null (empty), 'flex' (flexible window), 'sched' (scheduled shift), 'live' (active shift)
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
      // open popover or just alert for wireframe
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
    if (window.confirm("Cancel this scheduled shift?")) {
      setUpcoming(upcoming.filter(s => s.id !== id));
    }
  };

  return (
    <DashboardLayout title="Load Schedule">
      <div className="flex justify-between items-center mb-4">
        <button className="border px-4 py-2 rounded font-bold">&lt; Previous week</button>
        <h2 className="font-bold text-lg">May 1 – May 7, 2026</h2>
        <button className="border px-4 py-2 rounded font-bold">Next week &gt;</button>
      </div>

      <div className="bg-white border border-gray-200 rounded p-4 mb-4 overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-8 border-b">
            <div className="p-2 font-bold text-gray-500 text-xs">Time</div>
            {days.map(d => <div key={d} className="p-2 font-bold text-center border-l">{d}</div>)}
          </div>
          <div className="h-[400px] overflow-y-auto">
            {Array.from({length: 24}).map((_, h) => (
              <div key={h} className="grid grid-cols-8 border-b border-gray-100">
                <div className="p-2 text-xs text-gray-500 font-data border-r">{String(h).padStart(2, '0')}:00</div>
                {days.map(d => {
                  const key = `${d}-${h}`;
                  const state = grid[key];
                  const bg = state === 'flex' ? 'bg-blue-100' : state === 'sched' ? 'bg-green-500 text-white' : state === 'live' ? 'bg-red-500 text-white' : 'hover:bg-gray-50';
                  return (
                    <div 
                      key={d} 
                      onClick={() => toggleCell(d, h)}
                      className={`border-r border-gray-100 cursor-pointer ${bg}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-6 mb-8 text-sm">
        <div className="flex items-center gap-2"><div className="w-4 h-4 border"></div> Empty</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-100"></div> Flexible window</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500"></div> Scheduled shift</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500"></div> Active shift</div>
      </div>

      <h2 className="text-lg font-bold font-display mb-4">Upcoming scheduled shifts</h2>
      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Time window</th>
              <th className="p-4 font-bold">Load (kW)</th>
              <th className="p-4 font-bold">Producer</th>
              <th className="p-4 font-bold">Rate</th>
              <th className="p-4 font-bold">Savings</th>
              <th className="p-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map(s => (
              <tr key={s.id} className="border-b border-gray-100 last:border-0">
                <td className="p-4">{s.date}</td>
                <td className="p-4">{s.time}</td>
                <td className="p-4">{s.load}</td>
                <td className="p-4">{s.producer}</td>
                <td className="p-4">₹{s.rate}</td>
                <td className="p-4 text-green-600 font-bold">₹{s.savings}</td>
                <td className="p-4"><button onClick={() => handleCancel(s.id)} className="text-red-600 hover:underline">Cancel</button></td>
              </tr>
            ))}
            {upcoming.length === 0 && <tr><td colSpan={7} className="p-4 text-gray-500">No scheduled shifts</td></tr>}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
