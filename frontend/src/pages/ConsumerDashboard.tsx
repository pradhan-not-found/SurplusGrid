import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Factory, LogOut, Plus, Activity, Clock, Zap, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-[#f9fafb] flex font-sans text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Factory size={20} className="text-blue-600" />
            <span className="font-semibold text-lg tracking-tight">Consumer</span>
          </div>
        </div>
        <div className="flex-1 py-6 px-4 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            <Activity size={18} />
            Dashboard
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <Plus size={18} />
            Add Demand
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <CheckCircle2 size={18} />
            Matches
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="font-semibold text-xl">Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">Steel Works Ltd</span>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Real-time Alerts */}
            <AnimatePresence>
              {availableSurplus.map(surplus => (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  key={`alert-${surplus.id}`} 
                  className="bg-white border-l-4 border-green-500 p-4 rounded-r-xl shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                      <Zap size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">⚡ Cheap energy available: {surplus.date} ({surplus.startTime} - {surplus.endTime})</h3>
                      <p className="text-sm text-green-600 font-medium">{surplus.energyKwh} kWh available. Shift your load now to save costs!</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 font-medium text-sm rounded-lg transition-colors">
                    View Match Options
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Demand</p>
                  <p className="text-2xl font-bold">{pendingDemand.reduce((acc, d) => acc + d.energyKwh, 0)} <span className="text-base font-normal text-gray-400">kWh</span></p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fulfilled Load</p>
                  <p className="text-2xl font-bold">{matches.reduce((acc, m) => acc + m.matchedKwh, 0)} <span className="text-base font-normal text-gray-400">kWh</span></p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Savings</p>
                  <p className="text-2xl font-bold">₹{matches.reduce((acc, m) => acc + m.savings, 0).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Demand Form */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h2 className="text-lg font-semibold mb-6">Log Flexible Load</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Window</label>
                        <input type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Window</label>
                        <input type="time" required value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Load Needed (kWh)</label>
                      <input type="number" required min="1" value={energy} onChange={e => setEnergy(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="e.g. 400" />
                    </div>
                    <button type="submit" className="w-full mt-2 py-2.5 bg-[#1a1a1a] hover:bg-black text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                      Submit Demand
                    </button>
                  </form>
                </div>
              </div>

              {/* Lists */}
              <div className="lg:col-span-2 space-y-8">
                {/* Matches List */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Successful Matches</h2>
                  {matches.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-6">No matches yet. Submit a demand to match with available surplus!</p>
                  ) : (
                    <div className="space-y-3">
                      {matches.map(match => (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} key={match.id} className="flex items-center justify-between p-4 rounded-xl border border-green-200 bg-green-50 shadow-sm shadow-green-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-200 text-green-700 rounded-lg"><CheckCircle2 size={16} /></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Matched with Solar Farm</p>
                              <p className="text-xs text-gray-600">Load Shifted: {match.matchedKwh} kWh</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-green-700">₹{match.savings} Saved</p>
                            <p className="text-xs text-gray-500">Confirmed</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pending Demand List */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Your Pending Demand</h2>
                  {pendingDemand.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-6">No pending demand windows.</p>
                  ) : (
                    <div className="space-y-3">
                      {pendingDemand.map(item => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Clock size={16} /></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.date}</p>
                              <p className="text-xs text-gray-500">{item.startTime} - {item.endTime}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">{item.energyKwh} kWh</p>
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 text-[10px] font-semibold tracking-wide uppercase">Searching...</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
