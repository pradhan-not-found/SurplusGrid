export interface SurplusEntry {
  id: string;
  producerId: string;
  date: string;
  startTime: string;
  endTime: string;
  energyKwh: number;
  status: 'available' | 'matched';
}

export interface DemandEntry {
  id: string;
  consumerId: string;
  date: string;
  startTime: string;
  endTime: string;
  energyKwh: number;
  status: 'pending' | 'matched';
}

export interface Match {
  id: string;
  surplusId: string;
  demandId: string;
  matchedKwh: number;
  savings: number; // mock calculation
}
