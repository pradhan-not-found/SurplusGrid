import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Factory, LogOut, Activity, Grid2X2, Settings, Bell, CheckCircle2, Zap, BarChart2, CalendarDays } from 'lucide-react';
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
    <div className="min-h-screen bg-bg-deep flex font-body text-text-primary selection:bg-accent-primary selection:text-white">
      {/* Sidebar */}
      <div className="w-[220px] bg-bg-surface border-r border-border-subtle flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-accent-primary" />
            <span className="font-display font-bold tracking-tight text-text-primary">SurplusGrid</span>
          </div>
        </div>
        <div className="flex-1 py-6 flex flex-col gap-1 px-3">
          <p className="px-3 text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">Terminal Menu</p>
          <button className="flex items-center gap-3 px-3 py-2.5 bg-bg-card border border-border-subtle text-accent-primary rounded text-sm font-mono transition-colors">
            <Grid2X2 size={16} />
            Command Center
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-card rounded text-sm font-mono transition-colors">
            <Activity size={16} />
            Active Alerts
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-card rounded text-sm font-mono transition-colors">
            <BarChart2 size={16} />
            Cost Analytics
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-card rounded text-sm font-mono transition-colors mt-auto">
            <Settings size={16} />
            Load Config
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-bg-deep border-b border-border-subtle flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h1 className="font-display font-semibold text-lg">TCS Data Center (MUM)</h1>
            {availableSurplus.length > 0 && (
              <div className="px-3 py-1 bg-warning/10 border border-warning/30 rounded flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-warning rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono text-warning uppercase tracking-widest">Next cheap energy window: {availableSurplus[0].date} {availableSurplus[0].startTime}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-text-secondary hover:text-text-primary transition-colors p-2 rounded hover:bg-bg-surface relative">
              <Bell size={16} />
              {availableSurplus.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-warning rounded-full"></span>
              )}
            </button>
            <div className="h-4 w-px bg-border-subtle"></div>
            <button onClick={handleLogout} className="text-text-secondary hover:text-danger transition-colors p-2 rounded hover:bg-danger/10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
              <LogOut size={14} /> Terminate
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-text-secondary mb-3">
                  <Activity size={14} />
                  <p className="text-[11px] font-mono uppercase tracking-widest">This Month's Savings</p>
                </div>
                <p className="font-mono text-3xl font-bold text-accent-primary">₹{matches.reduce((acc, m) => acc + m.savings, 0).toLocaleString()}</p>
              </div>
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-text-secondary mb-3">
                  <CheckCircle2 size={14} />
                  <p className="text-[11px] font-mono uppercase tracking-widest">Load Shifts Completed</p>
                </div>
                <p className="font-mono text-3xl font-bold text-text-primary">{matches.length} <span className="text-sm font-normal text-text-secondary">Events</span></p>
              </div>
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-text-secondary mb-3">
                  <Zap size={14} />
                  <p className="text-[11px] font-mono uppercase tracking-widest">Clean Energy Consumed</p>
                </div>
                <p className="font-mono text-3xl font-bold text-text-primary">{matches.reduce((acc, m) => acc + m.matchedKwh, 0)} <span className="text-sm font-normal text-text-secondary">MWh</span></p>
              </div>
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-text-secondary mb-3">
                  <Factory size={14} />
                  <p className="text-[11px] font-mono uppercase tracking-widest">Carbon Offset</p>
                </div>
                <p className="font-mono text-3xl font-bold text-accent-primary">{(matches.reduce((acc, m) => acc + m.matchedKwh, 0) * 0.85).toFixed(1)} <span className="text-sm font-normal text-text-secondary">tCO₂</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Live Alerts & Form */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                
                {/* Active Alerts */}
                <div className="glass-card p-6 border-warning/30 relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 inset-x-0 h-1 bg-warning"></div>
                  <h2 className="font-display font-semibold text-lg mb-4 text-warning flex items-center gap-2"><Bell size={18}/> Active Surplus Alerts</h2>
                  
                  {availableSurplus.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-8 text-center border border-dashed border-border-subtle rounded">
                      <p className="text-text-secondary font-mono text-xs">No active surplus alerts.</p>
                      <p className="text-text-secondary font-mono text-[10px] uppercase mt-2">Grid is operating at peak.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 flex-1 overflow-y-auto">
                      {availableSurplus.map(surplus => (
                        <div key={surplus.id} className="bg-bg-deep border border-warning/20 p-4 rounded hover:border-warning/50 transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-mono text-sm font-bold text-text-primary">{surplus.date}</p>
                              <p className="font-mono text-xs text-text-secondary uppercase">{surplus.startTime} - {surplus.endTime} IST</p>
                            </div>
                            <span className="font-mono text-sm font-bold text-accent-primary">{surplus.energyKwh} MW</span>
                          </div>
                          <div className="flex justify-between items-center bg-bg-surface p-2 rounded mb-4">
                            <span className="font-mono text-[10px] text-text-secondary uppercase">Est. Savings</span>
                            <span className="font-mono text-xs font-bold text-accent-light">₹{(surplus.energyKwh * 150).toLocaleString()}</span>
                          </div>
                          <button className="w-full py-2 bg-warning/10 hover:bg-warning/20 text-warning border border-warning/30 rounded text-xs font-mono uppercase tracking-widest font-bold transition-colors">
                            Accept & Schedule Shift
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Manual Load Form */}
                <div className="glass-card p-6 flex flex-col flex-1">
                  <h2 className="font-display font-semibold text-lg mb-6">Log Flexible Load</h2>
                  <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">Date</label>
                      <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2.5 rounded bg-bg-deep border border-border-subtle focus:border-accent-primary text-sm font-mono outline-none transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">Start (IST)</label>
                        <input type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-3 py-2.5 rounded bg-bg-deep border border-border-subtle focus:border-accent-primary text-sm font-mono outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">End (IST)</label>
                        <input type="time" required value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full px-3 py-2.5 rounded bg-bg-deep border border-border-subtle focus:border-accent-primary text-sm font-mono outline-none transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">Load Required (MW)</label>
                      <input type="number" required min="1" value={energy} onChange={e => setEnergy(e.target.value)} className="w-full px-3 py-2.5 rounded bg-bg-deep border border-border-subtle focus:border-accent-primary text-sm font-mono outline-none transition-colors" placeholder="0.0" />
                    </div>
                    <div className="mt-auto pt-6">
                      <button type="submit" className="w-full py-3 bg-bg-surface border border-border-subtle hover:bg-bg-card hover:border-accent-primary text-text-primary rounded text-xs font-mono font-bold uppercase tracking-widest transition-all">
                        Log Demand
                      </button>
                    </div>
                  </form>
                </div>

              </div>

              {/* Right Column: Charts & Heatmap */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* Cost Comparison Chart */}
                <div className="glass-card p-6 h-[350px] flex flex-col">
                  <h2 className="font-display font-semibold text-lg mb-6">Cost Comparison: Grid vs SurplusGrid</h2>
                  <div className="flex-1 w-full font-mono text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockCostData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                        <XAxis dataKey="month" stroke="var(--color-text-secondary)" tick={{fill: 'var(--color-text-secondary)'}} axisLine={false} tickLine={false} />
                        <YAxis stroke="var(--color-text-secondary)" tick={{fill: 'var(--color-text-secondary)'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-primary)'}} 
                          itemStyle={{color: 'var(--color-text-primary)'}} 
                          formatter={(value) => `₹${Number(value).toLocaleString()}`}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        <Bar dataKey="grid" name="Peak Grid Cost" fill="var(--color-danger)" radius={[2, 2, 0, 0]} barSize={30} />
                        <Bar dataKey="surplus" name="SurplusGrid Cost" fill="var(--color-accent-primary)" radius={[2, 2, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Heatmap / Load schedule placeholder */}
                <div className="glass-card p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display font-semibold text-lg flex items-center gap-2"><CalendarDays size={18}/> Weekly Load Heatmap</h2>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary uppercase"><div className="w-2 h-2 bg-accent-primary rounded-full"></div> Shifted Load</div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary uppercase"><div className="w-2 h-2 bg-border-subtle rounded-full"></div> Normal Load</div>
                    </div>
                  </div>
                  <div className="flex-1 border border-border-subtle rounded bg-bg-deep p-4 grid grid-cols-7 gap-2">
                    {/* Simulated Heatmap Blocks */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="flex flex-col gap-1">
                        <div className="text-center font-mono text-[10px] text-text-secondary mb-2 uppercase">{day}</div>
                        {Array.from({ length: 12 }).map((_, i) => {
                          const isShifted = (day === 'Wed' && i > 4 && i < 8) || (day === 'Fri' && i > 2 && i < 5);
                          return (
                            <div key={i} className={`h-6 rounded ${isShifted ? 'bg-accent-primary' : 'bg-bg-surface'} border border-border-subtle/50`}></div>
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
