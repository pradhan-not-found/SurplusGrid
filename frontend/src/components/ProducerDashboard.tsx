import React, { useState } from 'react';
import { SurplusEntry, Match, DemandEntry } from '../types';
import { Plus, Zap, Clock, Calendar, CheckCircle } from 'lucide-react';

interface ProducerDashboardProps {
  surplusList: SurplusEntry[];
  matches: Match[];
  addSurplus: (surplus: Omit<SurplusEntry, 'id' | 'status'>) => void;
  consumerDemands: DemandEntry[];
}

export default function ProducerDashboard({ surplusList, matches, addSurplus, consumerDemands }: ProducerDashboardProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [energy, setEnergy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || !energy) return;
    
    addSurplus({
      producerId: 'prod-1',
      date,
      startTime,
      endTime,
      energyKwh: Number(energy)
    });
    
    setDate('');
    setStartTime('');
    setEndTime('');
    setEnergy('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="glass-card rounded-2xl p-6 md:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Plus className="text-primary-500" />
            Add Surplus Energy
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white/50 py-2 border outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white/50 py-2 border outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white/50 py-2 border outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surplus Energy (kWh)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Zap size={16} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  required
                  min="1"
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value)}
                  className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white/50 py-2 border outline-none"
                  placeholder="e.g. 500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:scale-[1.02]"
            >
              Submit Surplus
            </button>
          </form>
        </div>

        {/* Dashboard Stats & Lists */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="text-yellow-500" />
              Your Active Surpluses
            </h3>
            {surplusList.length === 0 ? (
              <p className="text-gray-500 italic">No surpluses logged yet.</p>
            ) : (
              <div className="space-y-3">
                {surplusList.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-semibold text-gray-900">{item.energyKwh} kWh Available</p>
                      <p className="text-sm text-gray-500">{item.date} | {item.startTime} - {item.endTime}</p>
                    </div>
                    <div>
                      {item.status === 'matched' ? (
                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                           <CheckCircle size={14} />
                           Matched
                         </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                           Available
                         </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              Matched Consumers
            </h3>
            {matches.length === 0 ? (
              <p className="text-gray-500 italic">No matches found yet.</p>
            ) : (
              <div className="space-y-3">
                {matches.map((match) => {
                  const surplus = surplusList.find(s => s.id === match.surplusId);
                  const demand = consumerDemands.find(d => d.id === match.demandId);
                  return (
                    <div key={match.id} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-100">
                      <p className="font-bold text-green-800">Match Successful!</p>
                      <p className="text-sm text-green-700 mt-1">
                        Supplying {match.matchedKwh} kWh on {surplus?.date} ({surplus?.startTime} - {surplus?.endTime})
                      </p>
                      <p className="text-xs text-green-600 mt-2 font-medium">Estimated savings generated: ${match.savings}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
