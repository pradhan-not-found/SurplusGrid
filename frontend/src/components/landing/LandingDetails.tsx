import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Factory, Activity, CheckCircle2, ShieldCheck, Zap,
  ArrowRight, Mail, Globe, MessageSquare, Users, Leaf
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function LandingDetails() {
  const [activeTab, setActiveTab] = useState<'producer' | 'consumer'>('producer');

  const producerSteps = [
    { title: 'Report Surplus', desc: 'Connect your forecast APIs or manually enter predicted curtailment windows with precise MW volumes.', icon: <Activity size={22} /> },
    { title: 'Algorithmic Match', desc: 'Our engine instantly finds regional industrial loads capable of absorbing your excess MWs in real time.', icon: <Zap size={22} /> },
    { title: 'Monetize', desc: 'Energy flows. Avoid curtailment completely and realize revenue that would otherwise be lost forever.', icon: <CheckCircle2 size={22} /> },
  ];

  const consumerSteps = [
    { title: 'Define Flexibility', desc: 'Log your heavy machinery schedules and permissible load-shift windows into the platform.', icon: <Factory size={22} /> },
    { title: 'Receive Alerts', desc: 'Get instant push/SMS notifications the moment cheap surplus energy hits your local grid.', icon: <Zap size={22} /> },
    { title: 'Shift & Save', desc: 'Approve the load shift in one tap. Consume 100% clean energy at massive discounts.', icon: <CheckCircle2 size={22} /> },
  ];

  const stats = [
    { value: '1.7 BU', label: 'Curtailment Prevented' },
    { value: '₹4.2 Cr', label: 'Saved This Month' },
    { value: '342', label: 'Active Matches Daily' },
    { value: '40%', label: 'Avg. Cost Reduction' },
  ];

  return (
    <div className="bg-white">

      {/* ── STATS STRIP ── */}
      <section className="border-y border-gray-100 py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-1">{s.value}</p>
              <p className="text-sm text-gray-400 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Platform</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-5 tracking-tight">
              How SurplusGrid Works
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              A unified platform bridging renewable energy curtailment with industrial demand — in real time.
            </p>
          </motion.div>

          {/* Tab toggle */}
          <div className="flex justify-center mb-14">
            <div className="bg-gray-100 p-1 rounded-full flex gap-1">
              <button
                onClick={() => setActiveTab('producer')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'producer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                For Producers
              </button>
              <button
                onClick={() => setActiveTab('consumer')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'consumer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                For Consumers
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {(activeTab === 'producer' ? producerSteps : consumerSteps).map((step, i) => (
                <div key={i} className="group relative p-8 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${activeTab === 'producer' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                    {step.icon}
                  </div>
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">Step 0{i + 1}</p>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
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
                color: "bg-orange-100 text-orange-700",
              },
              {
                quote: "Curtailment is the silent killer of solar ROI. Integrating our telemetry with SurplusGrid means whenever the grid says 'stop', we immediately route that power to industrial buyers.",
                name: "Sarah M.",
                role: "Director of Ops, CleanPowerGen",
                initials: "SM",
                color: "bg-green-100 text-green-700",
              },
            ].map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="bg-white rounded-3xl border border-gray-100 p-10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 text-lg leading-relaxed font-light mb-8">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{t.role}</p>
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
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-400 text-lg">No hidden fees. Pay only for what you match.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            {/* Starter */}
            <motion.div {...fadeUp(0.05)} className="rounded-3xl border border-gray-100 p-8 flex flex-col bg-white">
              <p className="text-sm font-semibold text-gray-400 mb-2">Starter</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">₹5,000<span className="text-base text-gray-400 font-normal">/mo</span></p>
              <p className="text-xs text-gray-400 mb-8">Billed monthly</p>
              <ul className="space-y-3 mb-10 flex-1">
                {['Up to 5MW capacity', 'Basic SMS alerts', 'Email support', 'Dashboard access'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="w-full py-3 text-center rounded-xl border border-gray-200 text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Start Free Trial
              </Link>
            </motion.div>

            {/* Growth — featured */}
            <motion.div {...fadeUp(0.1)} className="rounded-3xl border-2 border-blue-600 p-8 flex flex-col bg-white relative shadow-2xl shadow-blue-100 -mt-4 -mb-4">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <p className="text-sm font-semibold text-blue-600 mb-2 mt-2">Growth</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">₹15,000<span className="text-base text-gray-400 font-normal">/mo</span></p>
              <p className="text-xs text-gray-400 mb-8">Billed monthly</p>
              <ul className="space-y-3 mb-10 flex-1">
                {['Up to 50MW capacity', 'Real-time API access', 'Automated load shifting', 'Priority support', 'Analytics dashboard'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="w-full py-3 text-center rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                Upgrade to Growth
              </Link>
            </motion.div>

            {/* Enterprise */}
            <motion.div {...fadeUp(0.15)} className="rounded-3xl border border-gray-100 p-8 flex flex-col bg-white">
              <p className="text-sm font-semibold text-gray-400 mb-2">Enterprise</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">Custom</p>
              <p className="text-xs text-gray-400 mb-8">Talk to our team</p>
              <ul className="space-y-3 mb-10 flex-1">
                {['Unlimited MW capacity', 'Custom SLDC integration', 'Dedicated account manager', 'SLA guarantees', 'On-prem deployment'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="w-full py-3 text-center rounded-xl border border-gray-200 text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-colors">
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
