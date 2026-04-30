export interface User {
  id: string;
  name: string;
  email: string;
  role: 'producer' | 'consumer' | null;
  onboardingComplete: boolean;
  // Extra fields for onboarding
  companyName?: string;
  state?: string;
  phone?: string;
  gst?: string;
  // Producer
  farmName?: string;
  capacityKw?: number;
  connectionType?: string;
  sldcZone?: string;
  reportingPref?: string;
  // Consumer
  facilityName?: string;
  facilityType?: string;
  peakLoadKw?: number;
  flexibleLoadKw?: number;
  shiftableHours?: string[];
}
