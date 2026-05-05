# SurplusGrid ⚡
### Decentralized Energy Trading & Grid Optimization Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Blockchain](https://img.shields.io/badge/Ethereum-PoA-3C3C3D?logo=ethereum)](https://ethereum.org/)

**SurplusGrid** is a high-fidelity energy marketplace designed to facilitate the trading of surplus renewable energy between Producers and Consumers. By leveraging a decentralized architecture and a precision-engineered design system, it optimizes grid usage, reduces energy costs, and promotes sustainability through carbon offset tracking.

---

## 🌟 Key Features

### 🏢 Dual-Sided Marketplace
- **Producer Dashboard:** Seamlessly list surplus energy availability with precise time windows and power (MW) metrics.
- **Consumer Dashboard:** Log flexible load requirements and automatically match with available green energy sources.

### 🧠 Intelligent Matching Engine
- Real-time overlap detection between production windows and consumption demands.
- Automatic cost-saving calculations based on grid-vs-surplus pricing.
- Automated scheduling of load-shifting events.

### 📊 Professional Analytics
- **Cost Comparison:** High-density charts comparing standard grid costs against SurplusGrid savings.
- **Weekly Heatmaps:** Visual representation of shifted loads and energy consumption patterns.
- **Sustainability Metrics:** Automated tracking of clean energy consumed and Carbon (tCO₂) offset.

### ⛓️ Enterprise Infrastructure (Development)
- **Private Blockchain:** Secured by an Ethereum-based private network using the **Clique (Proof of Authority)** consensus mechanism.
- **ZeroUI Design System:** An "Industrial Precision" aesthetic designed for high-stakes monitoring and trading environments.
- **Secure Networking:** Cross-node connectivity managed via **Tailscale** for robust peer-to-peer communication.

---

## 🎨 Design Philosophy: "Industrial Precision"

The UI/UX is built on the **ZeroUI Design System**, prioritizing data density and technical clarity:
- **Technical Brutalism:** Sharp structural lines and monochromatic palettes with **Warm Bone** highlights.
- **Low-Light Optimized:** A dark-mode-first approach to reduce eye strain in monitoring environments.
- **Typography:** Uses **Space Grotesk** for technical labels and **Inter** (with tabular figures) for precise numerical data.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 8 |
| **Styling** | Tailwind CSS 4, Framer Motion (Animations) |
| **Data Viz** | Recharts, Lucide Icons |
| **State** | React Context API |
| **Blockchain** | Ethereum (Clique PoA), Geth |
| **Network** | Tailscale |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/surplus-grid.git
   cd surplus-grid
   ```

2. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Run Dev Server:**
   ```bash
   npm run dev
   ```

### Project Structure
```text
.
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # App & Auth state management
│   │   ├── pages/        # Dashboard & Landing layouts
│   │   └── types/        # TypeScript interfaces
│   └── public/           # Static assets (logos, etc.)
└── design.md             # Design system specifications
```

---

## 👥 Team Responsibilities & Roadmap

Here is a simple breakdown of what each team member has done, what needs to be done next, and what overachieved features we should remove to keep the MVP focused.

### 🗄️ Database (DB) Role
* **What is done:** Created the basic tables (users, matches, surplus windows) in Supabase with real-time updates.
* **What needs to be done (Deep Dive):** 
  * **Migrate to TimescaleDB:** Right now, energy data is sitting in standard relational tables. You need to spin up a TimescaleDB instance specifically designed to handle high-frequency time-series energy data (e.g., tracking kilowatt output every 5 minutes). 
  * **Build Data Pipelines:** You must create ETL (Extract, Transform, Load) scripts that continuously pull historical POSOCO grid data and format it into tables so the AI team can easily query it for training their models.
  * **Automate Backups:** Ensure scheduled database backups are running so no transaction records are lost.
* **What was overachieved (Needs to be removed):** Remove the "Blockchain Hash" columns. Blockchain is outside the scope of the core MVP and adds unnecessary complexity right now.

### 💻 Frontend Role
* **What is done:** Built the dashboard screens for Producers and Consumers, including real-time charts and match alerts.
* **What needs to be done (Deep Dive):** 
  * **Dynamic API Integration:** Currently, the predictive charts on the dashboard use static/mock data. You need to rewrite the fetching logic to pull live forecasts directly from the AI team's new FastAPI microservice.
  * **Mobile-First Optimization:** Factory floor managers (Consumers) will not be sitting at desktop computers. You need to meticulously test and optimize the Consumer Dashboard (`ConsumerAlerts.tsx`, `ConsumerSchedule.tsx`) so the tables and buttons render flawlessly on mobile phone screens.
  * **Error Handling:** Add robust loading states and fallback UIs in case the external weather or grid APIs go down.
* **What was overachieved (Needs to be removed):** Remove the glowing "Blockchain Verified" badges and the "IoT Triggered" statuses. Keep the UI focused strictly on demand matching.

### 🤖 AI (Machine Learning) Role
* **What is done:** Nothing yet. The app currently uses a simple rule-based system for the Week 3 MVP.
* **What needs to be done (Deep Dive):** 
  * **Build the Prediction Server:** Set up a lightweight Python server using **FastAPI**.
  * **Develop the Model:** Create a time-series forecasting model using Facebook Prophet or LSTM. The model needs to predict exactly how much surplus energy a specific solar farm will generate **6 hours into the future**.
  * **Ingest Weather APIs:** Your model must automatically fetch live weather data (like solar irradiance, cloud cover, and temperature) from OpenWeather or similar APIs, and combine that with historical POSOCO grid data to make accurate predictions.
* **What was overachieved (Needs to be removed):** None. Just focus on building the prediction model.

### ⚙️ Backend Role
* **What is done:** Built the Node.js server that matches buyers and sellers using rule-based scheduling.
* **What needs to be done (Deep Dive):** 
  * **Real SMS Integration:** Ditch the mock UI notifications. You need to create an account with **Twilio**, get API keys, and write a backend controller that physically sends an SMS to the Consumer's phone number the second a match is accepted in the database.
  * **Live Grid Data Polling:** You need to write cron jobs or background workers that continuously fetch live grid frequency and pricing data from State Load Dispatch Centers (SLDC) APIs to determine exactly when the grid is overloaded.
  * **Push Notifications:** Integrate Firebase Admin SDK to push real-time alerts directly to the user's browser or device.
* **What was overachieved (Needs to be removed):** Remove the simulated Smart Contract / Oracle execution logs from the backend. Stick to standard database matching.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
*Built for the future of renewable energy grid management.*
