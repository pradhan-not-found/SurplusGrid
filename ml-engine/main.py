from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime, timedelta
import math

app = FastAPI(title="SurplusGrid ML Engine")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ForecastRequest(BaseModel):
    consumer_id: str
    hours_ahead: int = 24

class ForecastResponse(BaseModel):
    timestamp: str
    predicted_load_kw: float
    lower_confidence_kw: float
    upper_confidence_kw: float

@app.get("/")
def health_check():
    return {"status": "online", "message": "SurplusGrid ML Engine is running."}

@app.post("/api/v1/forecast/demand", response_model=List[ForecastResponse])
def forecast_demand(request: ForecastRequest):
    forecasts = []
    # Start forecasting from the current hour
    now = datetime.utcnow().replace(minute=0, second=0, microsecond=0)
    
    for i in range(request.hours_ahead):
        future_time = now + timedelta(hours=i)
        hour = future_time.hour
        
        # Simulate realistic daily energy load curve (higher during day, lower at night)
        # Using a sine wave scaled between 300kW and 800kW
        # Peak around hour 14 (2 PM), trough around hour 2 (2 AM)
        amplitude = (800 - 300) / 2
        baseline = 300 + amplitude
        
        predicted = baseline + amplitude * math.sin((hour - 8) * math.pi / 12.0)
        
        forecasts.append(
            ForecastResponse(
                timestamp=future_time.isoformat() + "Z",
                predicted_load_kw=round(predicted, 2),
                lower_confidence_kw=round(predicted * 0.9, 2),
                upper_confidence_kw=round(predicted * 1.1, 2)
            )
        )
        
    return forecasts
