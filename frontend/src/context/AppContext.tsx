import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SurplusEntry, DemandEntry, Match } from '../types';

interface AppContextType {
  surplusList: SurplusEntry[];
  demandList: DemandEntry[];
  matches: Match[];
  addSurplus: (surplus: Omit<SurplusEntry, 'id' | 'status'>) => void;
  addDemand: (demand: Omit<DemandEntry, 'id' | 'status'>) => void;
  userRole: 'producer' | 'consumer' | null;
  setUserRole: (role: 'producer' | 'consumer' | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<'producer' | 'consumer' | null>(null);
  
  const [surplusList, setSurplusList] = useState<SurplusEntry[]>([
    {
      id: 'mock-surplus-1',
      producerId: 'prod-1',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '14:00',
      energyKwh: 1000,
      status: 'available'
    }
  ]);

  const [demandList, setDemandList] = useState<DemandEntry[]>([
    {
      id: 'mock-demand-1',
      consumerId: 'cons-1',
      date: new Date().toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '15:00',
      energyKwh: 400,
      status: 'pending'
    }
  ]);

  const [matches, setMatches] = useState<Match[]>([]);

  // Matching logic
  const checkOverlap = (s1: string, e1: string, s2: string, e2: string) => s1 < e2 && s2 < e1;

  useEffect(() => {
    let stateChanged = false;
    const updatedSurplus = [...surplusList];
    const updatedDemand = [...demandList];
    const newMatches: Match[] = [];

    updatedSurplus.forEach(surplus => {
      if (surplus.status === 'matched') return;

      updatedDemand.forEach(demand => {
        if (demand.status === 'matched') return;

        if (surplus.date === demand.date && checkOverlap(surplus.startTime, surplus.endTime, demand.startTime, demand.endTime)) {
          const matchedKwh = Math.min(surplus.energyKwh, demand.energyKwh);
          const savings = matchedKwh * 0.15; // mock $0.15 or ₹12/kWh saved

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

  return (
    <AppContext.Provider value={{ surplusList, demandList, matches, addSurplus, addDemand, userRole, setUserRole }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
