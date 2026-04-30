import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, Activity, Zap,
  ArrowRight, Mail, Globe, MessageSquare, Users, ShieldCheck, Leaf
} from 'lucide-react';

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
    { title: 'Forecast & Inject', desc: 'Producers upload day-ahead or intra-day generation forecasts. Our system identifies potential curtailment blocks.', icon: <Activity size={24} /> },
    { title: 'Algorithmic Match', desc: 'Consumers post demand profiles. The SurplusGrid engine calculates optimal matches based on volume, location, and price.', icon: <Zap size={24} /> },
    { title: 'Settle & Report', desc: 'Automated contract execution and SLDC compliance reporting. Transparent settlement data available instantly.', icon: <CheckCircle2 size={24} /> },
  ];

  return (
    <div className="bg-white">

      {/* ── STATS STRIP ── */}
      <section className="bg-white border-y border-[#E5E7EB] py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
            {stats.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="text-center py-8 md:py-0">
                <p className="text-[64px] font-bold tracking-[-0.03em] text-[#0D1117] hover:text-[#2563EB] transition-colors duration-200 leading-none mb-2">{s.value}</p>
                <p className="text-[11px] text-[#9CA3AF] tracking-[0.15em] uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-[120px] px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-[32px]">
            <h2 className="text-[48px] font-bold text-[#0D1117] tracking-[-0.02em] mb-4">
              Precision matching in real-time.
            </h2>
            <p className="text-[18px] text-[#6B7280] max-w-[560px] mx-auto">
              Our algorithmic engine connects forecasted surplus with live demand, ensuring grid stability and maximum asset utilization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {steps.map((step, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="bg-white p-[40px] rounded-[16px] border border-[#E5E7EB] hover:border-[#2563EB] transition-colors duration-150 shadow-none">
                <div className="w-[48px] h-[48px] rounded-[10px] bg-[#F0F7FF] text-[#2563EB] flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <p className="text-[12px] text-[#D1D5DB] mb-2 block">0{i + 1}</p>
                <h3 className="text-[22px] font-bold text-[#0D1117] mb-3">{step.title}</h3>
                <p className="text-[15px] leading-[1.7] text-[#6B7280]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#F9FAFB] py-[120px] px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-[64px]">
            <p className="text-[11px] font-bold text-[#2563EB] uppercase tracking-[0.15em] mb-4">Testimonials</p>
            <h2 className="text-[40px] font-bold text-[#0D1117] tracking-[-0.02em]">
              Trusted by industry leaders
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
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
                className="bg-white rounded-[16px] border border-[#E5E7EB] p-[40px] shadow-none"
              >
                <div className="text-[24px] text-[#E5E7EB] font-bold mb-6">"</div>
                <div className="text-[17px] leading-[1.75] text-[#374151]">
                  {t.quote}
                </div>
                <div className="border-t border-[#F3F4F6] my-[24px]"></div>
                <div className="flex items-center gap-4">
                  <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center text-sm font-bold ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#0D1117] leading-tight">{t.name}</p>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5 leading-tight">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="bg-white py-[120px] px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-[64px]">
            <h2 className="text-[48px] font-bold text-[#0D1117] tracking-[-0.02em]">
              Transparent access for every scale.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-stretch">

            {/* Starter */}
            <motion.div {...fadeUp(0.05)} className="rounded-[16px] border border-[#E5E7EB] p-[40px] flex flex-col bg-white shadow-none">
              <p className="text-[20px] font-bold text-[#0D1117] mb-2">Starter</p>
              <p className="text-[14px] text-[#9CA3AF] mb-8">For small C&I consumers.</p>
              <div className="mb-8">
                <span className="text-[48px] font-bold text-[#0D1117] tracking-[-0.02em]">₹5,000</span>
                <span className="text-[20px] text-[#9CA3AF] align-bottom ml-1 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Up to 1MW demand mapping', 'Day-ahead market access', 'Standard reporting'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#374151] leading-[1.8]">
                    <svg className="w-4 h-4 text-[#2563EB] shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block w-full text-center rounded-[10px] p-[14px] border border-[#D1D5DB] bg-white text-[#0D1117] font-medium text-[15px] hover:bg-[#F9FAFB] hover:border-[#9CA3AF] transition-colors">
                Select Starter
              </Link>
            </motion.div>

            {/* Growth — featured */}
            <motion.div {...fadeUp(0.1)} className="rounded-[16px] border-[2px] border-[#2563EB] p-[40px] flex flex-col bg-white relative shadow-none">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#2563EB] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <p className="text-[20px] font-bold text-[#0D1117] mb-2">Growth</p>
              <p className="text-[14px] text-[#9CA3AF] mb-8">For mid-scale producers and industrials.</p>
              <div className="mb-8">
                <span className="text-[48px] font-bold text-[#0D1117] tracking-[-0.02em]">₹15,000</span>
                <span className="text-[20px] text-[#9CA3AF] align-bottom ml-1 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Up to 10MW capacity', 'Intra-day live matching', 'Automated SLDC compliance', 'Priority API access'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#374151] leading-[1.8]">
                    <svg className="w-4 h-4 text-[#2563EB] shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block w-full text-center rounded-[10px] p-[14px] bg-[#2563EB] text-white font-medium text-[15px] hover:bg-[#1D4ED8] transition-colors">
                Start Growth Trial
              </Link>
            </motion.div>

            {/* Enterprise */}
            <motion.div {...fadeUp(0.15)} className="rounded-[16px] border border-[#E5E7EB] p-[40px] flex flex-col bg-white shadow-none">
              <p className="text-[20px] font-bold text-[#0D1117] mb-2">Enterprise</p>
              <p className="text-[14px] text-[#9CA3AF] mb-8">For utility-scale operations.</p>
              <div className="mb-8">
                <span className="text-[48px] font-bold text-[#0D1117] tracking-[-0.02em]">Custom</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Unlimited capacity management', 'Dedicated node infrastructure', 'Custom forecasting models'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#374151] leading-[1.8]">
                    <svg className="w-4 h-4 text-[#2563EB] shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block w-full text-center rounded-[10px] p-[14px] border border-[#D1D5DB] bg-white text-[#0D1117] font-medium text-[15px] hover:bg-[#F9FAFB] hover:border-[#9CA3AF] transition-colors">
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-white mt-[120px] pb-[120px] px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp()}
            className="rounded-[24px] bg-[#0D1117] px-10 py-16 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-[11px] tracking-[0.15em] text-[#60A5FA] uppercase mb-4">Get Started</p>
              <h2 className="text-[40px] font-bold text-white tracking-[-0.02em] mb-4">
                Ready to eliminate curtailment?
              </h2>
              <p className="text-[17px] text-[#94A3B8] max-w-[480px] mx-auto leading-[1.7] mb-10 font-normal">
                Join India's leading renewable energy marketplace. Start matching surplus with demand in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-[16px] justify-center">
                <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-[28px] py-[14px] rounded-[100px] bg-white text-[#0D1117] font-medium text-[15px] hover:bg-[#F1F5F9] transition-colors">
                  Sign up for free <ArrowRight size={16} />
                </Link>
                <Link to="/signin" className="inline-flex items-center justify-center gap-2 px-[28px] py-[14px] rounded-[100px] border border-white/30 text-white font-medium text-[15px] hover:border-white/60 bg-transparent transition-colors">
                  Sign in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#E5E7EB] bg-white">  
        <div className="max-w-[1100px] mx-auto px-6 pt-[64px] pb-[40px]">

          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">

            {/* Brand col */}
            <div className="md:col-span-2">
              <img src="/logo.png" alt="SurplusGrid" className="h-9 w-auto object-contain mb-5" />
              <p className="text-[#9CA3AF] text-[14px] leading-[1.7] max-w-xs">
                India's first real-time B2B renewable energy exchange. Eliminating curtailment, one match at a time.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a href="#" className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#0D1117] hover:border-[#D1D5DB] transition-colors">
                  <MessageSquare size={15} />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#0D1117] hover:border-[#D1D5DB] transition-colors">
                  <Users size={15} />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#0D1117] hover:border-[#D1D5DB] transition-colors">
                  <Globe size={15} />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#0D1117] hover:border-[#D1D5DB] transition-colors">
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
                <p className="text-[11px] font-bold text-[#0D1117] uppercase tracking-[0.15em] mb-5">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[14px] text-[#9CA3AF] hover:text-[#0D1117] transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="border-t border-[#E5E7EB] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[13px] text-[#9CA3AF]">© {new Date().getFullYear()} SurplusGrid Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-1.5 text-[13px] text-[#9CA3AF] font-medium">
                <ShieldCheck size={14} className="text-[#2563EB]" /> POSOCO Compliant
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-[#9CA3AF] font-medium">
                <Activity size={14} className="text-[#2563EB]" /> SLDC Integrated
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-[#9CA3AF] font-medium">
                <Leaf size={14} className="text-[#2563EB]" /> Carbon Verified
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
