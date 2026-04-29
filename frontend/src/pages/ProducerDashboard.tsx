import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LogOut, Zap, Activity, Grid2X2, Settings, Bell, CheckCircle2, BatteryWarning, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';

const mockChartData = [
  { time: '00:00', surplus: 0, demand: 10 },
  { time: '04:00', surplus: 0, demand: 8 },
  { time: '08:00', surplus: 12, demand: 15 },
  { time: '11:00', surplus: 45, demand: 20 },
  { time: '14:00', surplus: 50, demand: 22 },
  { time: '17:00', surplus: 10, demand: 30 },
  { time: '20:00', surplus: 0, demand: 25 },
  { time: '23:00', surplus: 0, demand: 15 },
];

export default function ProducerDashboard() {
  const { surplusList, matches, addSurplus, setUserRole } = useAppContext();
  const navigate = useNavigate();
  
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [energy, setEnergy] = useState('');

  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || !energy) return;
    
    addSurplus({
      producerId: 'current-producer',
      date,
      startTime,
      endTime,
      energyKwh: Number(energy)
    });
    
    setDate(''); setStartTime(''); setEndTime(''); setEnergy('');
  };

  const availableSurplus = surplusList.filter(s => s.status === 'available');

  return (
    <div className="min-h-screen bg-gray-50 flex font-body text-gray-900 selection:bg-green-500 selection:text-white">
      {/* Sidebar */}
      <div className="w-[240px] bg-white border-r border-gray-200 flex flex-col fixed h-full z-10 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-gray-900" />
            <span className="font-display font-semibold tracking-tight text-gray-900">SurplusGrid</span>
          </div>
        </div>
        <div className="flex-1 py-6 flex flex-col gap-1 px-4">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Overview</p>
          <button className="flex items-center gap-3 px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium transition-colors">
            <Grid2X2 size={18} className="text-green-600" />
            Dashboard
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <Activity size={18} />
            Predictions
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <CheckCircle2 size={18} />
            Matches
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors mt-auto">
            <Settings size={18} />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white/80 border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <h1 className="font-display font-semibold text-xl text-gray-900">Suntech Solar Farm</h1>
            <div className="px-2.5 py-1 bg-green-50 border border-green-100 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">Grid Synced</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100">
              <Bell size={18} />
            </button>
            <div className="h-5 w-px bg-gray-200"></div>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 flex items-center gap-2 text-sm font-medium">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <Activity size={16} className="text-blue-500" />
                  <p className="text-sm font-medium">Predicted Surplus</p>
                </div>
                <p className="text-3xl font-semibold text-gray-900 tracking-tight">45.2 <span className="text-base font-normal text-gray-500">MW</span></p>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <BatteryWarning size={16} className="text-orange-500" />
                  <p className="text-sm font-medium">Curtailment Avoided</p>
                </div>
                <p className="text-3xl font-semibold text-gray-900 tracking-tight">124 <span className="text-base font-normal text-gray-500">MWh</span></p>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <p className="text-sm font-medium">Revenue Earned</p>
                </div>
                <p className="text-3xl font-semibold text-gray-900 tracking-tight">₹1.2 <span className="text-base font-normal text-gray-500">L</span></p>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <Grid2X2 size={16} className="text-purple-500" />
                  <p className="text-sm font-medium">Active Matches</p>
                </div>
                <p className="text-3xl font-semibold text-gray-900 tracking-tight">{matches.length} <span className="text-base font-normal text-gray-500">Clients</span></p>
              </div>
            </div>

            {/* Main Chart Section */}
            <div className="glass-card p-8 h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display font-semibold text-xl text-gray-900">Surplus Prediction Curve</h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Available Surplus</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Regional Demand</div>
                </div>
              </div>
              <div className="flex-1 w-full text-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSurplus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                    <XAxis dataKey="time" stroke="#9ca3af" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#9ca3af" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#111827'}} itemStyle={{color: '#111827'}} />
                    <Area type="monotone" dataKey="surplus" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorSurplus)" />
                    <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upcoming Windows Table */}
              <div className="lg:col-span-2 glass-card p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display font-semibold text-xl text-gray-900">Predicted Windows</h2>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                    Export CSV
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-sm font-semibold text-gray-500">
                        <th className="pb-4 px-2">Date</th>
                        <th className="pb-4 px-2">Time Window</th>
                        <th className="pb-4 px-2 text-right">Predicted (MW)</th>
                        <th className="pb-4 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium text-gray-900">
                      {availableSurplus.map((item, i) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-2 text-gray-500">{item.date}</td>
                          <td className="py-4 px-2">{item.startTime} - {item.endTime}</td>
                          <td className="py-4 px-2 text-right">{item.energyKwh}</td>
                          <td className="py-4 px-2 text-right">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                              Seeking Match
                            </span>
                          </td>
                        </tr>
                      ))}
                      {availableSurplus.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-gray-500 text-sm">No active surplus windows.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Log Manual Surplus Form (Right Sidebar) */}
              <div className="lg:col-span-1 glass-card p-8 flex flex-col bg-gray-50/50">
                <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">Add Surplus Window</h2>
                <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                    <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Time</label>
                      <input type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">End Time</label>
                      <input type="time" required value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Volume (MW)</label>
                    <input type="number" required min="1" value={energy} onChange={e => setEnergy(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm outline-none transition-all" placeholder="e.g. 45" />
                  </div>
                  <div className="mt-auto pt-8">
                    <button type="submit" className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-medium transition-all shadow-sm">
                      Submit Window
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
