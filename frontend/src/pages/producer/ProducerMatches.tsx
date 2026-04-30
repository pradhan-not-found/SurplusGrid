import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

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
      <div className="bg-white p-4 border border-gray-200 rounded mb-6 flex items-center gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 block mb-1">Status</label>
          <select className="border p-2 rounded w-48" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Expired</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 block mb-1">Date From</label>
          <input type="date" className="border p-2 rounded" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 block mb-1">Date To</label>
          <input type="date" className="border p-2 rounded" />
        </div>
        <div className="pt-5 flex gap-2">
          <button className="bg-gray-900 text-white px-4 py-2 rounded font-bold">Apply</button>
          <button onClick={() => setStatusFilter('All')} className="border px-4 py-2 rounded font-bold">Reset</button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold">Match ID</th>
              <th className="p-4 font-bold">Consumer</th>
              <th className="p-4 font-bold">Facility type</th>
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Time window</th>
              <th className="p-4 font-bold">MW</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Savings (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <React.Fragment key={m.id}>
                <tr 
                  onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                  className="border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-4 text-blue-600 font-bold">{m.id}</td>
                  <td className="p-4">{m.consumer}</td>
                  <td className="p-4">{m.type}</td>
                  <td className="p-4">{m.date}</td>
                  <td className="p-4">{m.time}</td>
                  <td className="p-4">{m.mw}</td>
                  <td className="p-4">{m.status}</td>
                  <td className="p-4">₹{m.savings}</td>
                </tr>
                {expandedRow === i && (
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <td colSpan={8} className="p-4">
                      <div className="flex justify-between items-center text-xs">
                        <div>
                          <strong>Contact:</strong> Rajesh K. (+91 9876543210) <br/>
                          <strong>Zone:</strong> WRLDC <br/>
                          <strong>Confirmed:</strong> {m.date} 08:12 AM
                        </div>
                        <button className="text-blue-600 font-bold hover:underline">Export row as CSV</button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
