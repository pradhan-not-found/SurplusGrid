import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LogOut, Zap, Activity, Grid2X2, Settings, Bell, CheckCircle2, AlertTriangle, BatteryWarning } from 'lucide-react';
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
            Predictive Model
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-card rounded text-sm font-mono transition-colors">
            <CheckCircle2 size={16} />
            Match Ledger
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-card rounded text-sm font-mono transition-colors mt-auto">
            <Settings size={16} />
            Facility Config
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-bg-deep border-b border-border-subtle flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h1 className="font-display font-semibold text-lg">Good morning, Suntech Solar Farm</h1>
            <div className="px-2.5 py-1 bg-accent-primary/10 border border-accent-primary/20 rounded flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse"></div>
              <span className="text-[10px] font-mono text-accent-primary uppercase tracking-widest">Grid Sync Active</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-text-secondary hover:text-text-primary transition-colors p-2 rounded hover:bg-bg-surface">
              <Bell size={16} />
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
                  <p className="text-[11px] font-mono uppercase tracking-widest">Predicted Surplus</p>
                </div>
                <p className="font-mono text-3xl font-bold text-text-primary">45.2 <span className="text-sm font-normal text-text-secondary">MW</span></p>
              </div>
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-text-secondary mb-3">
                  <BatteryWarning size={14} />
                  <p className="text-[11px] font-mono uppercase tracking-widest">Curtailment Avoided</p>
                </div>
                <p className="font-mono text-3xl font-bold text-accent-primary">124 <span className="text-sm font-normal text-text-secondary">MWh</span></p>
              </div>
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-text-secondary mb-3">
                  <CheckCircle2 size={14} />
                  <p className="text-[11px] font-mono uppercase tracking-widest">Revenue Earned</p>
                </div>
                <p className="font-mono text-3xl font-bold text-text-primary">₹1.2 <span className="text-sm font-normal text-text-secondary">L</span></p>
              </div>
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-text-secondary mb-3">
                  <Grid2X2 size={14} />
                  <p className="text-[11px] font-mono uppercase tracking-widest">Active Matches</p>
                </div>
                <p className="font-mono text-3xl font-bold text-warning">{matches.length} <span className="text-sm font-normal text-text-secondary">Clients</span></p>
              </div>
            </div>

            {/* Main Chart Section */}
            <div className="glass-card p-6 h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display font-semibold text-lg">24-Hour Surplus Prediction Curve</h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-text-secondary uppercase"><div className="w-2 h-2 bg-accent-primary rounded-full"></div> Available Surplus</div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-text-secondary uppercase"><div className="w-2 h-2 bg-warning rounded-full"></div> Regional Demand</div>
                </div>
              </div>
              <div className="flex-1 w-full font-mono text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSurplus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-accent-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-accent-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                    <XAxis dataKey="time" stroke="var(--color-text-secondary)" tick={{fill: 'var(--color-text-secondary)'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="var(--color-text-secondary)" tick={{fill: 'var(--color-text-secondary)'}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-primary)'}} itemStyle={{color: 'var(--color-text-primary)'}} />
                    <Area type="monotone" dataKey="surplus" stroke="var(--color-accent-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorSurplus)" />
                    <Line type="monotone" dataKey="demand" stroke="var(--color-warning)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Windows Table */}
              <div className="lg:col-span-2 glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display font-semibold text-lg">Predicted Surplus Windows</h2>
                  <button className="px-3 py-1.5 border border-border-subtle rounded text-[11px] font-mono uppercase text-text-secondary hover:text-text-primary hover:bg-bg-surface transition-colors">
                    Export CSV
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle text-[11px] font-mono uppercase text-text-secondary">
                        <th className="pb-3 px-2 font-normal">Date</th>
                        <th className="pb-3 px-2 font-normal">Time Window (IST)</th>
                        <th className="pb-3 px-2 font-normal text-right">Predicted (MW)</th>
                        <th className="pb-3 px-2 font-normal text-right">Matched</th>
                        <th className="pb-3 px-2 font-normal text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-sm">
                      {availableSurplus.map((item, i) => (
                        <tr key={item.id} className={`border-b border-border-subtle/50 ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
                          <td className="py-4 px-2">{item.date}</td>
                          <td className="py-4 px-2 text-warning">{item.startTime} - {item.endTime}</td>
                          <td className="py-4 px-2 text-right">{item.energyKwh}</td>
                          <td className="py-4 px-2 text-right text-text-secondary">0</td>
                          <td className="py-4 px-2 text-right">
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-warning/10 text-warning text-[10px] uppercase tracking-widest border border-warning/20">
                              Seeking
                            </span>
                          </td>
                        </tr>
                      ))}
                      {availableSurplus.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-text-secondary font-mono text-xs">No active surplus windows currently logged.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Log Manual Surplus Form (Right Sidebar) */}
              <div className="lg:col-span-1 glass-card p-6 flex flex-col">
                <h2 className="font-display font-semibold text-lg mb-6">Manual Window Override</h2>
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
                    <label className="block text-[11px] font-mono uppercase text-text-secondary mb-1">Energy Volume (MW)</label>
                    <input type="number" required min="1" value={energy} onChange={e => setEnergy(e.target.value)} className="w-full px-3 py-2.5 rounded bg-bg-deep border border-border-subtle focus:border-accent-primary text-sm font-mono outline-none transition-colors" placeholder="0.0" />
                  </div>
                  <div className="mt-auto pt-6">
                    <button type="submit" className="w-full py-3 bg-bg-surface border border-border-subtle hover:bg-bg-card hover:border-accent-primary text-text-primary rounded text-xs font-mono font-bold uppercase tracking-widest transition-all">
                      Inject to Ledger
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
