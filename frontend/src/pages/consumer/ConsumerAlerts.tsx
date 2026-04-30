import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function ConsumerAlerts() {
  const [activeTab, setActiveTab] = useState('All');

  const [alerts, setAlerts] = useState([
    { id: 1, time: 'Tomorrow 11:00–14:00', rateSurplus: 2.1, rateGrid: 6.8, savings: 12400, producer: 'SolarTech Farm', zone: 'WRLDC', confidence: 'High', status: 'Pending' },
    { id: 2, time: 'May 3 09:00–12:00', rateSurplus: 1.9, rateGrid: 6.8, savings: 9100, producer: 'WindGen India', zone: 'SRLDC', confidence: 'Medium', status: 'Pending' },
    { id: 3, time: 'Apr 28 14:00–17:00', rateSurplus: 2.3, rateGrid: 6.8, savings: 8600, producer: 'SolarTech Farm', zone: 'WRLDC', confidence: 'High', status: 'Accepted' },
    { id: 4, time: 'Apr 20 10:00–13:00', rateSurplus: 2.0, rateGrid: 6.8, savings: 10200, producer: 'GreenPower', zone: 'NLDC', confidence: 'Low', status: 'Expired' },
  ]);

  const filtered = activeTab === 'All' ? alerts : alerts.filter(a => a.status === activeTab);
  const [msg, setMsg] = useState('');

  const accept = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'Accepted' } : a));
    setMsg("Load shift scheduled. We'll remind you 2 hours before.");
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <DashboardLayout title="Energy Alerts">
      <div className="flex gap-4 mb-6 border-b border-gray-200 pb-2">
        {['All', 'Pending', 'Accepted', 'Expired'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`font-bold pb-2 ${activeTab === tab ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {msg && <div className="bg-green-50 text-green-800 p-4 rounded mb-6 font-bold">{msg}</div>}

      <div className="space-y-4">
        {filtered.map(a => (
          <div key={a.id} className={`bg-white p-6 border rounded ${a.status === 'Expired' ? 'border-gray-200 opacity-60' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-display font-bold">{a.time}</h3>
                <div className="text-sm text-gray-500 mt-1">{a.producer} · {a.zone}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">Save ₹{a.savings}</div>
                <div className="text-sm">
                  Surplus: <strong>₹{a.rateSurplus}</strong> <span className="text-gray-400 mx-2">vs</span> Grid: <strong>₹{a.rateGrid}</strong>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                a.confidence === 'High' ? 'bg-green-100 text-green-800' :
                a.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Confidence: {a.confidence}
              </span>

              <div className="flex items-center gap-4">
                {a.status === 'Pending' && (
                  <>
                    <button className="text-gray-500 font-bold hover:underline">Dismiss</button>
                    <button onClick={() => accept(a.id)} className="bg-gray-900 text-white px-6 py-2 rounded font-bold">Accept & schedule load shift</button>
                  </>
                )}
                {a.status === 'Accepted' && (
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-900">Accepted on Apr 28</span>
                    <button className="text-red-600 font-bold hover:underline">Cancel</button>
                  </div>
                )}
                {a.status === 'Expired' && (
                  <button disabled className="bg-gray-100 text-gray-400 px-6 py-2 rounded font-bold">Expired</button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-500 p-4">No alerts found for this filter.</p>}
      </div>
    </DashboardLayout>
  );
}
