import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, ShieldCheck, Activity, Leaf, Zap,
  ArrowRight, Mail, Globe, MessageSquare, Users
} from 'lucide-react';

const ForecastIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mb-8">
    <rect width="48" height="48" rx="16" fill="url(#paint0_linear)" />
    <path d="M14 30L22 20L28 24L34 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="34" cy="16" r="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2" />
    <rect x="13" y="34" width="2" height="6" rx="1" fill="white" fillOpacity="0.6" />
    <rect x="21" y="24" width="2" height="16" rx="1" fill="white" fillOpacity="0.8" />
    <rect x="27" y="28" width="2" height="12" rx="1" fill="white" fillOpacity="0.7" />
    <rect x="33" y="20" width="2" height="20" rx="1" fill="white" />
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
  </svg>
);

const MatchIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mb-8">
    <rect width="48" height="48" rx="16" fill="url(#paint1_linear)" />
    <circle cx="18" cy="24" r="8" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
    <circle cx="30" cy="24" r="8" stroke="white" strokeWidth="2" strokeOpacity="0.9" />
    <path d="M24 20L22 24H26L24 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="paint1_linear" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#D946EF" />
      </linearGradient>
    </defs>
  </svg>
);

const SettleIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mb-8">
    <rect width="48" height="48" rx="16" fill="url(#paint2_linear)" />
    <rect x="16" y="12" width="16" height="24" rx="2" stroke="white" strokeWidth="2" strokeOpacity="0.8" />
    <path d="M20 18H28M20 22H26M20 28H23" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M28 26L30 28L34 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="paint2_linear" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 text-gray-200">
    <path d="M16 10H8C6.89543 10 6 10.8954 6 12V20C6 21.1046 6.89543 22 8 22H11C11 26.4183 7.41828 30 3 30V34C9.62742 34 15 28.6274 15 22V10C15 10 16 10 16 10ZM35 10H27C25.8954 10 25 10.8954 25 12V20C25 21.1046 25.8954 22 27 22H30C30 26.4183 26.4183 30 22 30V34C28.6274 34 34 28.6274 34 22V10C34 10 35 10 35 10Z" fill="currentColor"/>
  </svg>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function LandingDetails() {
  const stats = [
    { value: '1.2M+', label: 'Curtailed Energy Saved (kWh)' },
    { value: '450+', label: 'Businesses Matched' },
    { value: '850', label: 'MW Diverted Daily' },
  ];

  const steps = [
    { title: 'Forecast & Inject', desc: 'Producers upload day-ahead or intra-day generation forecasts. Our system identifies potential curtailment blocks.', icon: <ForecastIcon /> },
    { title: 'Algorithmic Match', desc: 'Consumers post demand profiles. The SurplusGrid engine calculates optimal matches based on volume, location, and price.', icon: <MatchIcon /> },
    { title: 'Settle & Report', desc: 'Automated contract execution and SLDC compliance reporting. Transparent settlement data available instantly.', icon: <SettleIcon /> },
  ];

  return (
    <div className="bg-white">

      {/* ── STATS STRIP ── */}
      <section className="border-y border-gray-100 py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)} className="text-center">
              <p className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-2">{s.value}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-5 tracking-tight">
              Precision matching in real-time.
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              Our algorithmic engine connects forecasted surplus with live demand, ensuring grid stability and maximum asset utilization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="group relative p-10 rounded-[2rem] border border-gray-100 bg-white hover:border-transparent hover:shadow-[0_20px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden text-left">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  {step.icon}
                  <p className="font-data text-xs font-bold text-gray-300 uppercase tracking-widest mb-3">0{i + 1}</p>
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm font-body">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">
              Trusted by industry leaders
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "We run blast furnaces that draw 15MW. Being alerted to surplus windows lets us shift our heaviest batches to off-peak pricing. SurplusGrid cut our highest utility tier by 30%.",
                name: "Rajesh K.",
                role: "Plant Manager, Tata Steel",
                initials: "RK",
                color: "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
              },
              {
                quote: "Curtailment is the silent killer of solar ROI. Integrating our telemetry with SurplusGrid means whenever the grid says 'stop', we immediately route that power to industrial buyers.",
                name: "Sarah M.",
                role: "Director of Ops, CleanPowerGen",
                initials: "SM",
                color: "bg-gradient-to-br from-green-400 to-green-600 text-white",
              },
            ].map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="bg-white rounded-[2rem] border border-gray-100 p-12 hover:shadow-[0_20px_80px_-15px_rgba(0,0,0,0.06)] transition-all duration-500"
              >
                <QuoteIcon />
                <blockquote className="text-gray-700 text-xl leading-relaxed font-body mb-10">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-5 pt-8 border-t border-gray-100">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold font-display text-gray-900 text-lg">{t.name}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
              Transparent access for every scale.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            {/* Starter */}
            <motion.div {...fadeUp(0.05)} className="rounded-3xl border border-gray-100 p-8 flex flex-col bg-white">
              <p className="text-xl font-bold text-gray-900 mb-1">Starter</p>
              <p className="text-sm text-gray-500 mb-6">For small C&I consumers.</p>
              <p className="text-4xl font-bold text-gray-900 mb-8">₹5,000<span className="text-base text-gray-400 font-normal"> /mo</span></p>
              <ul className="space-y-4 mb-10 flex-1">
                {['Up to 1MW demand mapping', 'Day-ahead market access', 'Standard reporting'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="w-full py-3.5 text-center rounded-xl border border-gray-200 text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Select Starter
              </Link>
            </motion.div>

            {/* Growth — featured */}
            <motion.div {...fadeUp(0.1)} className="rounded-3xl border-2 border-blue-600 p-8 flex flex-col bg-white relative shadow-2xl shadow-blue-100 -mt-4 -mb-4">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <p className="text-xl font-bold text-gray-900 mb-1 mt-2">Growth</p>
              <p className="text-sm text-gray-500 mb-6">For mid-scale producers and industrials.</p>
              <p className="text-4xl font-bold text-gray-900 mb-8">₹15,000<span className="text-base text-gray-400 font-normal"> /mo</span></p>
              <ul className="space-y-4 mb-10 flex-1">
                {['Up to 10MW capacity', 'Intra-day live matching', 'Automated SLDC compliance', 'Priority API access'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="w-full py-3.5 text-center rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                Start Growth Trial
              </Link>
            </motion.div>

            {/* Enterprise */}
            <motion.div {...fadeUp(0.15)} className="rounded-3xl border border-gray-100 p-8 flex flex-col bg-white">
              <p className="text-xl font-bold text-gray-900 mb-1">Enterprise</p>
              <p className="text-sm text-gray-500 mb-6">For utility-scale operations.</p>
              <p className="text-3xl font-bold text-gray-900 mb-8 py-1">Custom Quoted</p>
              <ul className="space-y-4 mb-10 flex-1">
                {['Unlimited capacity management', 'Dedicated node infrastructure', 'Custom forecasting models'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="w-full py-3.5 text-center rounded-xl border border-gray-200 text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()}
            className="rounded-3xl bg-gray-900 px-10 py-16 text-center relative overflow-hidden"
          >
            {/* Subtle gradient blobs inside banner */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-500/15 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Get Started</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight">
                Ready to eliminate curtailment?
              </h2>
              <p className="text-gray-400 text-base mb-10 max-w-lg mx-auto leading-relaxed">
                Join India's leading renewable energy marketplace. Start matching surplus with demand in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Sign up for free <ArrowRight size={15} />
                </Link>
                <Link to="/login" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gray-700 text-gray-300 text-sm font-semibold hover:border-gray-500 transition-colors">
                  Sign in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 bg-white">  
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">

          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">

            {/* Brand col */}
            <div className="md:col-span-2">
              <img src="/logo.png" alt="SurplusGrid" className="h-9 w-auto object-contain mb-5" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                India's first real-time B2B renewable energy exchange. Eliminating curtailment, one match at a time.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a href="#" className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all">
                  <MessageSquare size={15} />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all">
                  <Users size={15} />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all">
                  <Globe size={15} />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all">
                  <Mail size={15} />
                </a>
              </div>
            </div>

            {/* Link cols */}
            {[
              { heading: 'Product', links: ['Platform', 'Pricing', 'API Docs', 'Changelog', 'System Status'] },
              { heading: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
              { heading: 'Legal', links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'SLDC Compliance'] },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} SurplusGrid Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <ShieldCheck size={13} className="text-green-500" /> POSOCO Compliant
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Activity size={13} className="text-blue-500" /> SLDC Integrated
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Leaf size={13} className="text-green-500" /> Carbon Verified
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
