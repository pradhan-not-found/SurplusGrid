import { useState, useEffect } from 'react';
import ProducerDashboard from './components/ProducerDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import { Leaf, Factory } from 'lucide-react';
import { SurplusEntry, DemandEntry, Match } from './types';

function App() {
  const [role, setRole] = useState<'producer' | 'consumer'>('producer');
  const [surplusList, setSurplusList] = useState<SurplusEntry[]>([
    {
      id: 'dummy-surplus-1',
      producerId: 'prod-dummy',
      date: new Date().toISOString().split('T')[0],
      startTime: '08:00',
      endTime: '12:00',
      energyKwh: 500,
      status: 'available'
    }
  ]);
  const [demandList, setDemandList] = useState<DemandEntry[]>([
    {
      id: 'dummy-demand-1',
      consumerId: 'cons-dummy',
      date: new Date().toISOString().split('T')[0],
      startTime: '14:00',
      endTime: '18:00',
      energyKwh: 200,
      status: 'pending'
    }
  ]);
  const [matches, setMatches] = useState<Match[]>([]);

  // Simple time overlap check
  const checkOverlap = (s1: string, e1: string, s2: string, e2: string) => {
    return s1 < e2 && s2 < e1;
  };

  // Run matching logic whenever surplus or demand changes
  useEffect(() => {
    const newMatches: Match[] = [];
    const updatedSurplus = [...surplusList];
    const updatedDemand = [...demandList];
    let stateChanged = false;

    updatedSurplus.forEach(surplus => {
      if (surplus.status === 'matched') return;

      updatedDemand.forEach(demand => {
        if (demand.status === 'matched') return;

        // Check if date is same and times overlap
        if (surplus.date === demand.date && checkOverlap(surplus.startTime, surplus.endTime, demand.startTime, demand.endTime)) {
          // Simple match
          const matchedKwh = Math.min(surplus.energyKwh, demand.energyKwh);
          const savings = matchedKwh * 0.15; // mock $0.15 saved per kWh

          newMatches.push({
            id: `match-${Date.now()}-${Math.random()}`,
            surplusId: surplus.id,
            demandId: demand.id,
            matchedKwh,
            savings: Number(savings.toFixed(2))
          });

          surplus.status = 'matched';
          demand.status = 'matched';
          stateChanged = true;
        }
      });
    });

    if (stateChanged) {
      setSurplusList(updatedSurplus);
      setDemandList(updatedDemand);
      setMatches(prev => [...prev, ...newMatches]);
    }
  }, [surplusList, demandList]);

  const addSurplus = (surplus: Omit<SurplusEntry, 'id' | 'status'>) => {
    setSurplusList(prev => [...prev, { ...surplus, id: `surplus-${Date.now()}`, status: 'available' }]);
  };

  const addDemand = (demand: Omit<DemandEntry, 'id' | 'status'>) => {
    setDemandList(prev => [...prev, { ...demand, id: `demand-${Date.now()}`, status: 'pending' }]);
  };

  const availableSurplus = surplusList.filter(s => s.status === 'available');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-primary-500 selection:text-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/30">
                S
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900">
                SurplusGrid
              </span>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setRole('producer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  role === 'producer'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Leaf size={16} />
                Producer
              </button>
              <button
                onClick={() => setRole('consumer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  role === 'consumer'
                    ? 'bg-white text-secondary-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Factory size={16} />
                Consumer
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {role === 'producer' ? (
          <ProducerDashboard 
            surplusList={surplusList} 
            matches={matches} 
            addSurplus={addSurplus}
            consumerDemands={demandList} 
          />
        ) : (
          <ConsumerDashboard 
            consumerDemands={demandList} 
            matches={matches} 
            addDemand={addDemand}
            availableSurplus={availableSurplus} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
