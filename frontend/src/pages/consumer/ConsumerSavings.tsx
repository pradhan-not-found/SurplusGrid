import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function ConsumerSavings() {
  const chartData = [
    { month: 'Nov', value: 8200 },
    { month: 'Dec', value: 11400 },
    { month: 'Jan', value: 14700 },
    { month: 'Feb', value: 19200 },
    { month: 'Mar', value: 32800 },
    { month: 'Apr', value: 38700 },
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
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total savings to date</div>
          <div className="text-3xl font-bold font-display text-green-600">₹1,24,300</div>
        </div>
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Shifts completed</div>
          <div className="text-3xl font-bold font-display">31</div>
        </div>
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Clean energy consumed</div>
          <div className="text-3xl font-bold font-display">67.4 MWh</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded mb-8">
        <h2 className="text-lg font-bold font-display mb-6">Monthly savings</h2>
        <div className="flex items-end h-64 gap-4">
          {chartData.map(d => {
            const heightPct = (d.value / maxVal) * 100;
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full group">
                <div className="text-xs font-bold text-gray-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">₹{d.value}</div>
                <div className="w-full bg-green-500 rounded-t" style={{ height: `${heightPct}%` }}></div>
                <div className="mt-2 text-sm font-bold text-gray-500">{d.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold font-display">Savings history</h2>
        <button onClick={exportCSV} className="bg-gray-900 text-white px-4 py-2 rounded font-bold text-sm">Export as CSV</button>
      </div>
      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Time window</th>
              <th className="p-4 font-bold">Units shifted (kWh)</th>
              <th className="p-4 font-bold">Rate paid</th>
              <th className="p-4 font-bold">Grid rate</th>
              <th className="p-4 font-bold">Savings (₹)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="p-4">{h.date}</td>
                <td className="p-4">{h.time}</td>
                <td className="p-4">{h.units}</td>
                <td className="p-4">₹{h.rate}</td>
                <td className="p-4">₹{h.grid}</td>
                <td className="p-4 text-green-600 font-bold">₹{h.savings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
