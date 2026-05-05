# 🏛️ SurplusGrid: The Ultimate AI Implementation Guide
## Official Technical Handover for Aniruddha (AI Implementation Lead)

Welcome to the project, Aniruddha! The **SurplusGrid Infrastructure** is 100% complete. We have a reactive, event-driven backend. Your task is to build the **Predictive Intelligence Layer.** 

This guide provides the exact technical context you need to integrate your models into our production-ready environment.

---

## 🛠️ 1. The Technical Stack Context
*   **Backend:** Node.js (TypeScript) on Port `5001`.
*   **Database:** Supabase (PostgreSQL) with Real-time Webhooks.
*   **Architecture:** Event-Driven. Logic is triggered by database changes (Webhooks) or background tasks (Cron).

---

## 🏗️ 2. What is ALREADY IMPLEMENTED (The Plumbing)
You do NOT need to build these. Use them as your data sources and triggers:

1.  **Reactive Webhook Pipeline:** The backend listens for every `INSERT` on the `surplus_windows` and `consumer_needs` tables.
2.  **Spatio-Temporal Matcher:** A deterministic engine that finds overlapping time windows and regional zones.
3.  **Live Weather Service:** Real-time fetching of meteorological data (Temp, Sky, Condition, Humidity) for Maharashtra.
4.  **Atomic Deductor:** A logic layer that prevents double-booking by subtracting energy in real-time.
5.  **Audit Logs:** Automated tracking of matches, savings, and carbon offsets.

---

## 🧠 3. Your Implementation Roadmap (The Brain)

### 🔹 Feature 1: Predictive Yield Correction (Solar/Wind AI)
*   **What it is:** Moving from "User-Entered" predictions to "AI-Verified" yields.
*   **Data Source:** `WeatherService.ts` (Current Satellite conditions).
*   **Integration Hook:** `backend/src/services/weatherService.ts`.
*   **The Logic:** Your model should take the user's `predicted_kw` and the current `weather_status` and output an **"AI Verification Score."**

### 🔹 Feature 2: Dynamic Pricing Arbitrage Model
*   **What it is:** Adjusting the "Surplus Price" based on grid scarcity.
*   **Data Source:** `GridPriceService.ts` and regional supply/demand density.
*   **Integration Hook:** `backend/src/services/gridPriceService.ts`.
*   **The Logic:** If supply in `Zone A` is high, the AI should suggest a price that is 10% lower than the grid to ensure a 100% sale rate.

### 🔹 Feature 3: Consumer Load Forecasting
*   **What it is:** Predicting when a consumer will need energy based on historical behavior.
*   **Data Source:** `consumer_needs` table history.
*   **The Logic:** Use a time-series model to auto-populate the "Consumer Needs" calendar for the next 7 days.

### 🔹 Feature 4: High-Confidence Match Ranking
*   **What it is:** A "Reliability Badge" for every match.
*   **Data Source:** Match history + Weather Stability.
*   **The Logic:** Add a `confidence_score` (e.g., 0.95) to the `matches` table.

---

## 📊 4. Data Acquisition (SQL Training Registry)
Aniruddha, use these exact SQL queries to pull your training data from the Supabase SQL Editor:

*   **Supply History:** `SELECT producer_id, date, start_time, end_time, predicted_kw FROM surplus_windows;`
*   **Demand History:** `SELECT consumer_id, date, start_time, end_time, load_kw FROM consumer_needs;`
*   **Trade Success (Labels):** `SELECT * FROM matches WHERE status = 'accepted';`

---

## 🔌 5. How to Plug Your Models In (The API Contract)
We expect your AI service (Python/Flask/FastAPI) to communicate with our Node.js backend using this JSON structure:

**Backend sends you:**
```json
{
  "event": "NEW_WINDOW_ADDED",
  "data": { "kw": 100, "zone": "MAH-01", "weather": "Cloudy" }
}
```

**Your AI returns to us:**
```json
{
  "ai_corrected_yield": 84.5,
  "confidence_score": 0.92,
  "price_recommendation": 2.10,
  "load_shift_trigger": true
}
```

---

## 🏁 6. Final Goal
Aniruddha, your implementation will move SurplusGrid from a **"Marketplace"** to a **"Smart Ecosystem."** The infrastructure is ready and waiting for your intelligence layer.

**Good luck, Lead. The grid is yours.** 🚀🧠🥇
