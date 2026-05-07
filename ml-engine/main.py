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
    allow_origins=["*"],
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

class EventData(BaseModel):
    kw: float
    zone: str
    weather: str

class GridEventRequest(BaseModel):
    event: str
    data: EventData

class AIYieldResponse(BaseModel):
    ai_corrected_yield: float
    confidence_score: float
    price_recommendation: float
    load_shift_trigger: bool

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

@app.post("/api/v1/predict/yield", response_model=AIYieldResponse)
def predict_yield(request: GridEventRequest):
    kw = request.data.kw
    weather = request.data.weather.lower()
    
    multiplier = 1.0
    confidence = 0.90
    
    if "storm" in weather or "thunder" in weather:
        multiplier = 0.15
        confidence = 0.40
    elif "rain" in weather:
        multiplier = 0.35
        confidence = 0.65
    elif "cloud" in weather or "overcast" in weather:
        multiplier = 0.60
        confidence = 0.75
    elif "clear" in weather or "sunny" in weather:
        multiplier = 0.95
        confidence = 0.95
        
    ai_corrected_yield = round(kw * multiplier, 2)
    price_recommendation = round(3.50 * (1 if multiplier > 0.8 else 0.8), 2)
    load_shift_trigger = multiplier < 0.4
    
    return AIYieldResponse(
        ai_corrected_yield=ai_corrected_yield,
        confidence_score=confidence,
        price_recommendation=price_recommendation,
        load_shift_trigger=load_shift_trigger
    )
