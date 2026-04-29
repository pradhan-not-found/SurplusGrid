import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Factory, LogOut, Activity, Grid2X2, Settings, Bell, CheckCircle2, Zap, BarChart2, CalendarDays, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockCostData = [
  { month: 'Jan', grid: 85000, surplus: 62000 },
  { month: 'Feb', grid: 92000, surplus: 65000 },
  { month: 'Mar', grid: 88000, surplus: 58000 },
  { month: 'Apr', grid: 95000, surplus: 61000 },
];

export default function ConsumerDashboard() {
  const { demandList, surplusList, matches, addDemand, setUserRole } = useAppContext();
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
    
    addDemand({
      consumerId: 'current-consumer',
      date,
      startTime,
      endTime,
      energyKwh: Number(energy)
    });
    
    setDate(''); setStartTime(''); setEndTime(''); setEnergy('');
  };

  const pendingDemand = demandList.filter(d => d.status === 'pending');
  const availableSurplus = surplusList.filter(s => s.status === 'available');

  return (
    <div className="min-h-screen bg-gray-50 flex font-body text-gray-900 selection:bg-blue-500 selection:text-white">
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
            <Grid2X2 size={18} className="text-blue-600" />
            Dashboard
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <Activity size={18} />
            Alerts
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <BarChart2 size={18} />
            Analytics
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
            <h1 className="font-display font-semibold text-xl text-gray-900">TCS Data Center (MUM)</h1>
            {availableSurplus.length > 0 && (
              <div className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-amber-700">Next window: {availableSurplus[0].date} {availableSurplus[0].startTime}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={18} />
              {availableSurplus.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border border-white"></span>
              )}
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
                  <Activity size={16} className="text-green-500" />
                  <p className="text-sm font-medium">Monthly Savings</p>
                </div>
                <p className="text-3xl font-semibold text-gray-900 tracking-tight">₹{matches.reduce((acc, m) => acc + m.savings, 0).toLocaleString()}</p>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  <p className="text-sm font-medium">Load Shifts</p>
                </div>
                <p className="text-3xl font-semibold text-gray-900 tracking-tight">{matches.length} <span className="text-base font-normal text-gray-500">Events</span></p>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <Zap size={16} className="text-amber-500" />
                  <p className="text-sm font-medium">Clean Energy Consumed</p>
                </div>
                <p className="text-3xl font-semibold text-gray-900 tracking-tight">{matches.reduce((acc, m) => acc + m.matchedKwh, 0)} <span className="text-base font-normal text-gray-500">MWh</span></p>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <Factory size={16} className="text-purple-500" />
                  <p className="text-sm font-medium">Carbon Offset</p>
                </div>
                <p className="text-3xl font-semibold text-gray-900 tracking-tight">{(matches.reduce((acc, m) => acc + m.matchedKwh, 0) * 0.85).toFixed(1)} <span className="text-base font-normal text-gray-500">tCO₂</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Live Alerts & Form */}
              <div className="lg:col-span-1 flex flex-col gap-8">
                
                {/* Active Alerts */}
                <div className="glass-card p-6 relative overflow-hidden flex flex-col shadow-lg border-amber-200">
                  <div className="absolute top-0 inset-x-0 h-1 bg-amber-400"></div>
                  <h2 className="font-display font-semibold text-lg mb-4 text-gray-900 flex items-center gap-2"><Bell size={20} className="text-amber-500"/> Active Alerts</h2>
                  
                  {availableSurplus.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <p className="text-gray-500 text-sm font-medium">No active alerts.</p>
                      <p className="text-gray-400 text-xs mt-1">Grid is operating at peak.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                      {availableSurplus.map(surplus => (
                        <div key={surplus.id} className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-semibold text-gray-900">{surplus.date}</p>
                              <p className="text-xs text-gray-500 font-medium">{surplus.startTime} - {surplus.endTime} IST</p>
                            </div>
                            <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-sm">{surplus.energyKwh} MW</span>
                          </div>
                          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-5">
                            <span className="text-xs text-gray-500 font-medium">Est. Savings</span>
                            <span className="text-sm font-bold text-green-600">₹{(surplus.energyKwh * 150).toLocaleString()}</span>
                          </div>
                          <button className="w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-medium transition-colors">
                            Accept & Schedule
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Manual Load Form */}
                <div className="glass-card p-8 flex flex-col flex-1 bg-gray-50/50">
                  <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">Log Flexible Load</h2>
                  <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                      <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Time</label>
                        <input type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">End Time</label>
                        <input type="time" required value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Load Required (MW)</label>
                      <input type="number" required min="1" value={energy} onChange={e => setEnergy(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none transition-all" placeholder="e.g. 15" />
                    </div>
                    <div className="mt-auto pt-8">
                      <button type="submit" className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 rounded-xl text-sm font-medium transition-all shadow-sm">
                        Log Demand
                      </button>
                    </div>
                  </form>
                </div>

              </div>

              {/* Right Column: Charts & Heatmap */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                
                {/* Cost Comparison Chart */}
                <div className="glass-card p-8 h-[350px] flex flex-col">
                  <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">Cost Comparison</h2>
                  <div className="flex-1 w-full text-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockCostData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                        <XAxis dataKey="month" stroke="#9ca3af" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                        <YAxis stroke="#9ca3af" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#111827'}} 
                          itemStyle={{color: '#111827'}} 
                          formatter={(value) => `₹${Number(value).toLocaleString()}`}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        <Bar dataKey="grid" name="Peak Grid Cost" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                        <Bar dataKey="surplus" name="SurplusGrid Cost" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Heatmap / Load schedule placeholder */}
                <div className="glass-card p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display font-semibold text-xl text-gray-900 flex items-center gap-2"><CalendarDays size={20} className="text-blue-500"/> Weekly Heatmap</h2>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Shifted Load</div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500"><div className="w-3 h-3 bg-gray-200 rounded-full"></div> Normal Load</div>
                    </div>
                  </div>
                  <div className="flex-1 border border-gray-100 rounded-2xl bg-gray-50/50 p-6 grid grid-cols-7 gap-3">
                    {/* Simulated Heatmap Blocks */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="flex flex-col gap-1.5">
                        <div className="text-center font-medium text-xs text-gray-500 mb-3">{day}</div>
                        {Array.from({ length: 12 }).map((_, i) => {
                          const isShifted = (day === 'Wed' && i > 4 && i < 8) || (day === 'Fri' && i > 2 && i < 5);
                          return (
                            <div key={i} className={`h-8 rounded-md ${isShifted ? 'bg-green-500 shadow-sm' : 'bg-gray-200'} transition-colors hover:opacity-80`}></div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
