import React, { useState } from 'react';
import type { DemandEntry, Match, SurplusEntry } from '../types';
import { Factory, Calendar, Clock, Zap, AlertCircle } from 'lucide-react';

interface ConsumerDashboardProps {
  consumerDemands: DemandEntry[];
  matches: Match[];
  addDemand: (demand: Omit<DemandEntry, 'id' | 'status'>) => void;
  availableSurplus: SurplusEntry[];
}

export default function ConsumerDashboard({ consumerDemands, matches, addDemand, availableSurplus }: ConsumerDashboardProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [energy, setEnergy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || !energy) return;
    
    addDemand({
      consumerId: 'cons-1',
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
      
      {/* Alert Section */}
      {availableSurplus.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl shadow-sm animate-pulse">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Cheap Energy Available!</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Producers have registered surplus energy. Check your flexible window to match and save!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="glass-card rounded-2xl p-6 md:col-span-1 border-secondary-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Factory className="text-secondary-500" />
            Request Energy
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
                  className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-secondary-500 focus:ring-secondary-500 sm:text-sm bg-white/50 py-2 border outline-none"
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
                    className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-secondary-500 focus:ring-secondary-500 sm:text-sm bg-white/50 py-2 border outline-none"
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
                    className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-secondary-500 focus:ring-secondary-500 sm:text-sm bg-white/50 py-2 border outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Load Required (kWh)</label>
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
                  className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-secondary-500 focus:ring-secondary-500 sm:text-sm bg-white/50 py-2 border outline-none"
                  placeholder="e.g. 300"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-all transform hover:scale-[1.02]"
            >
              Submit Demand
            </button>
          </form>
        </div>

        {/* Dashboard Stats & Lists */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="text-gray-500" />
              Your Flexible Load Windows
            </h3>
            {consumerDemands.length === 0 ? (
              <p className="text-gray-500 italic">No demands logged yet.</p>
            ) : (
              <div className="space-y-3">
                {consumerDemands.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-semibold text-gray-900">{item.energyKwh} kWh Needed</p>
                      <p className="text-sm text-gray-500">{item.date} | {item.startTime} - {item.endTime}</p>
                    </div>
                    <div>
                      {item.status === 'matched' ? (
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                           Matched
                         </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                           Pending Match
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
              <Zap className="text-yellow-500" />
              Energy Matches & Savings
            </h3>
            {matches.length === 0 ? (
              <p className="text-gray-500 italic">No matches generated yet.</p>
            ) : (
              <div className="space-y-3">
                {matches.map((match) => {
                  const demand = consumerDemands.find(d => d.id === match.demandId);
                  return (
                    <div key={match.id} className="p-4 bg-gradient-to-r from-secondary-50 to-pink-50 rounded-xl shadow-sm border border-secondary-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-secondary-900">Energy Match Secured!</p>
                          <p className="text-sm text-secondary-800 mt-1">
                            Receiving {match.matchedKwh} kWh on {demand?.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-secondary-600 font-medium uppercase tracking-wider">Estimated Savings</p>
                          <p className="text-xl font-black text-secondary-600">${match.savings}</p>
                        </div>
                      </div>
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
