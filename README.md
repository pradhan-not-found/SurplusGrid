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
