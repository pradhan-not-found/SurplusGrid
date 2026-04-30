import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

export default function ConsumerOverview() {
  const [showBanner, setShowBanner] = useState(true);
  const [alerts, setAlerts] = useState([
    { id: 1, time: 'Tomorrow 11:00–14:00', rateSurplus: 2.1, rateGrid: 6.8, savings: 12400 },
    { id: 2, time: 'May 3 09:00–12:00', rateSurplus: 1.9, rateGrid: 6.8, savings: 9100 },
    { id: 3, time: 'May 4 14:00–17:00', rateSurplus: 2.3, rateGrid: 6.8, savings: 8600 },
  ]);

  const shifts = [
    { date: 'Today', time: '11:00–14:00', load: 1400, rate: 2.1, savings: 12400 },
    { date: 'Yesterday', time: '09:00–12:00', load: 1200, rate: 1.9, savings: 9100 },
    { date: 'Apr 28', time: '14:00–17:00', load: 1000, rate: 2.3, savings: 8600 },
    { date: 'Apr 26', time: '10:00–13:00', load: 1200, rate: 2.0, savings: 10200 },
    { date: 'Apr 25', time: '15:00–18:00', load: 800, rate: 2.5, savings: 6800 },
  ];

  const handleAccept = (id: number) => {
    // move alert to bottom with Accepted status
    const alert = alerts.find(a => a.id === id);
    if (!alert) return;
    setAlerts([...alerts.filter(a => a.id !== id), { ...alert, accepted: true } as any]);
  };

  return (
    <DashboardLayout title="Overview">
      {showBanner && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded flex items-center justify-between mb-8">
          <div>
            <strong className="text-blue-900">Next cheap energy window:</strong> Tomorrow 11:00–14:00 · Estimated savings ₹12,400
            <Link to="/dashboard/consumer/alerts" className="ml-4 text-blue-600 hover:underline">View details</Link>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-blue-900 font-bold px-2">&times;</button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Savings this month</div>
          <div className="text-3xl font-bold font-display">₹38,700</div>
        </div>
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Load shifts completed</div>
          <div className="text-3xl font-bold font-display">7</div>
        </div>
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Clean energy used</div>
          <div className="text-3xl font-bold font-display">14.3 MWh</div>
        </div>
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Carbon offset</div>
          <div className="text-3xl font-bold font-display">1,140 kg CO₂</div>
        </div>
      </div>

      <h2 className="text-lg font-bold font-display mb-4">Pending alerts</h2>
      <div className="bg-white border border-gray-200 rounded mb-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <tbody>
            {alerts.map((a: any) => (
              <tr key={a.id} className={`border-b border-gray-100 last:border-0 ${a.accepted ? 'opacity-50 bg-gray-50' : ''}`}>
                <td className="p-4 font-bold">{a.time}</td>
                <td className="p-4">₹{a.rateSurplus}/unit vs ₹{a.rateGrid}/unit</td>
                <td className="p-4 text-green-600 font-bold">Save ₹{a.savings}</td>
                <td className="p-4 text-right">
                  {a.accepted ? (
                    <span className="text-gray-500 font-bold px-4">Scheduled</span>
                  ) : (
                    <button onClick={() => handleAccept(a.id)} className="bg-gray-900 text-white px-4 py-2 rounded font-bold">Accept shift</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/dashboard/consumer/alerts" className="text-blue-600 hover:underline text-sm font-bold block mb-8">View all alerts</Link>

      <h2 className="text-lg font-bold font-display mb-4">Recent load shifts</h2>
      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Time window</th>
              <th className="p-4 font-bold">Load shifted (kW)</th>
              <th className="p-4 font-bold">Energy rate</th>
              <th className="p-4 font-bold">Savings (₹)</th>
              <th className="p-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="p-4">{s.date}</td>
                <td className="p-4">{s.time}</td>
                <td className="p-4">{s.load}</td>
                <td className="p-4">₹{s.rate}</td>
                <td className="p-4 text-green-600 font-bold">₹{s.savings}</td>
                <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Completed</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
