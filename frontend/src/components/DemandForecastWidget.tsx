import React, { useState, useEffect } from 'react';

// 1. Tell TypeScript what the Python data looks like
interface ForecastData {
  timestamp: string;
  predicted_load_kw: number;
  lower_confidence_kw: number;
  upper_confidence_kw: number;
}

export function DemandForecastWidget() {
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 2. The function that talks to your FastAPI server
    const fetchForecast = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/forecast/demand', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            consumer_id: 'mock-consumer-123', // We'll make this dynamic later
            hours_ahead: 24,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setForecast(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []); // The empty array ensures this only runs once when the component loads

  // 3. Loading and Error states
  if (loading) return <div className="p-4 text-sm text-[#6B7280]">Loading AI Forecast...</div>;
  if (error) return <div className="p-4 text-sm text-red-500">Error: {error}</div>;

  // 4. Render the UI
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
      <h3 className="font-bold text-[15px] text-[#0D1117] mb-4">AI Demand Forecast</h3>
      
      <div className="space-y-3">
        {/* We'll just map the first 5 hours for a clean list view */}
        {forecast.slice(0, 5).map((data, index) => {
          // Format the crazy timestamp into a clean time like "14:00"
          const timeString = new Date(data.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          });

          return (
            <div key={index} className="flex justify-between items-center border-b border-[#F1F5F9] pb-2 last:border-0">
              <span className="text-[13px] text-[#6B7280]">{timeString}</span>
              <span className="text-[14px] font-medium text-[#0D1117]">
                {data.predicted_load_kw.toFixed(1)} kW
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
