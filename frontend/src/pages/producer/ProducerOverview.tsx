import DashboardLayout from '../../components/DashboardLayout';

export default function ProducerOverview() {
  const surplusWindows = [
    { date: 'Today', time: '11:00–14:00', predicted: 4.2, matched: 3.8, status: 'Matched' },
    { date: 'Today', time: '18:00–20:00', predicted: 2.1, matched: 0.0, status: 'Seeking' },
    { date: 'Tomorrow', time: '09:00–13:00', predicted: 5.7, matched: 5.7, status: 'Matched' },
    { date: 'Tomorrow', time: '15:00–17:00', predicted: 1.8, matched: 0.0, status: 'Seeking' },
    { date: 'May 3', time: '10:00–15:00', predicted: 6.3, matched: 4.1, status: 'Partial' },
  ];

  const activeMatches = [
    { consumer: 'Ramesh Cold Storage', type: 'Cold storage', mw: 1.4, time: '11:00–14:00', duration: '3 hrs' },
    { consumer: 'Arvind Textiles', type: 'Textile mill', mw: 1.2, time: '11:00–14:00', duration: '3 hrs' },
    { consumer: 'BlueStar EV Depot', type: 'EV fleet', mw: 1.2, time: '09:00–13:00', duration: '4 hrs' },
  ];

  return (
    <DashboardLayout title="Overview">
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Today's predicted surplus</div>
          <div className="text-3xl font-bold font-display">4.2 MW</div>
        </div>
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Curtailment avoided (month)</div>
          <div className="text-3xl font-bold font-display">18.6 MWh</div>
        </div>
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Active consumer matches</div>
          <div className="text-3xl font-bold font-display">3</div>
        </div>
        <div className="bg-white p-6 rounded border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Revenue this month</div>
          <div className="text-3xl font-bold font-display">₹41,200</div>
        </div>
      </div>

      <h2 className="text-lg font-bold font-display mb-4">Upcoming surplus windows</h2>
      <div className="bg-white border border-gray-200 rounded mb-8 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Time window</th>
              <th className="p-4 font-bold">Predicted surplus (MW)</th>
              <th className="p-4 font-bold">Matched demand (MW)</th>
              <th className="p-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {surplusWindows.map((w, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="p-4">{w.date}</td>
                <td className="p-4">{w.time}</td>
                <td className="p-4">{w.predicted} MW</td>
                <td className="p-4">{w.matched} MW</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    w.status === 'Matched' ? 'bg-green-100 text-green-800' :
                    w.status === 'Seeking' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {w.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-bold font-display mb-4">Active match cards</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {activeMatches.map((m, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded p-4 min-w-[250px]">
            <div className="font-bold mb-1">{m.consumer}</div>
            <div className="text-xs text-gray-500 mb-3">{m.type}</div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Volume</span>
              <span className="font-bold">{m.mw} MW</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Time</span>
              <span className="font-bold">{m.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Duration</span>
              <span className="font-bold">{m.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
