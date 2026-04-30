import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, Activity, Zap,
  ArrowRight, Mail, Globe, ShieldCheck, Leaf
} from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const allTestimonials = [
  { name: 'Rajesh Kumar',     handle: '@rajesh_ops',           gradient: 'from-orange-500 to-amber-400',   quote: 'Just discovered SurplusGrid — their real-time matching algorithm is amazing. Saved 12% on our load this week.' },
  { name: 'Clean Power Dev',  handle: '@cleanpower_dev',       gradient: 'from-emerald-500 to-teal-400',   quote: 'SurplusGrid: A complete energy platform that just works ✨ Eliminating solar curtailment has never been easier.' },
  { name: 'Syskey Energy',    handle: '@energy_syskey',        gradient: 'from-pink-500 to-rose-400',      quote: 'Everything about this is next level: the POSOCO compliance, the instant settlement, dynamic pricing.' },
  { name: 'Murray G.',        handle: '@solar_murray',         gradient: 'from-violet-500 to-purple-500',  quote: 'Literally the coolest B2B exchange in the Indian energy sector —' },
  { name: 'Industrial DIY',   handle: '@industrial_diy',       gradient: 'from-blue-500 to-cyan-400',      quote: "Have you heard of SurplusGrid? They've lovingly put together an incredibly flexible industrial load marketplace. Huge ROI." },
  { name: 'Grid Watch',       handle: '@grid_watch',           gradient: 'from-indigo-500 to-blue-400',    quote: 'SurplusGrid has got to be the most efficient energy matching engine I have seen in a while 🔥' },
  { name: 'Dan Infrastructure',handle: '@dan_infra',           gradient: 'from-cyan-500 to-blue-400',      quote: 'This is genuinely impressive work. The attention to detail in their automated SLDC reporting shows.' },
  { name: 'Emma S.',          handle: '@emma_sustainability',  gradient: 'from-violet-400 to-indigo-500',  quote: "Saw about SurplusGrid and it's just wow, the dashboard is incredibly well designed! Love the overall feel and quality." },
  { name: 'Sarah Renewables', handle: '@sarah_renewables',     gradient: 'from-teal-500 to-emerald-400',   quote: 'The next generation of grid balancing is emerging this year 👀 The flexibility doesn’t exist anywhere else.' },
  { name: 'Priya Mehta',      handle: '@priya_grid',           gradient: 'from-amber-400 to-orange-500',   quote: 'Real-time SLDC compliance out of the box. We switched from manual settlement to SurplusGrid overnight.' },
  { name: 'WindGen Ops',      handle: '@windgen_ops',          gradient: 'from-slate-500 to-gray-600',     quote: 'Curtailment revenue recovery went up 22% in month one. No other platform comes close.' },
  { name: 'EV Fleet Manager', handle: '@evfleet_mgr',          gradient: 'from-rose-500 to-pink-400',      quote: 'Being matched to surplus solar during charging windows cut our overnight energy cost dramatically.' },
];

const row1 = allTestimonials.slice(0, 4);
const row2 = allTestimonials.slice(4, 8);
const row3 = allTestimonials.slice(8, 12);

function TestimonialCard({ t }: { t: typeof allTestimonials[0] }) {
  return (
    <div className="w-[320px] shrink-0 bg-transparent p-5 border border-[#E5E7EB] flex flex-col justify-between" style={{ height: 160 }}>
      <p className="text-[#374151] text-sm leading-relaxed line-clamp-3">{t.quote}</p>
      <div className="flex items-center gap-3 mt-3">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.gradient} shrink-0`} />
        <span className="text-[#6B7280] text-sm">@{t.handle.replace('@', '')}</span>
      </div>
    </div>
  );
}

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
                <p className="text-[64px] font-medium tracking-tighter text-[#0D1117] hover:text-[#2563EB] transition-colors duration-200 leading-none mb-2">{s.value}</p>
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
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter text-[#0D1117] mb-4">
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
                <h3 className="text-[22px] font-medium tracking-tight text-[#0D1117] mb-3">{step.title}</h3>
                <p className="text-[15px] leading-[1.7] text-[#6B7280]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPONENTS / ZEROUI INSPIRED ── */}
      <section className="w-full flex flex-col justify-center items-center py-[80px] px-6">
        <motion.div {...fadeUp()} className="w-full flex flex-col justify-center items-center gap-2 max-w-2xl text-center mb-10">
          <h1 className="text-4xl tracking-tighter font-medium text-[#0D1117]">Components that don't get in the way</h1>
          <span className="text-[16px] text-[#6B7280]">
            Explore our extensive library of pre-designed, customizable components that can be easily integrated into your energy projects, saving you time and effort.
          </span>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="w-full flex flex-col justify-center items-center py-[80px] px-6">
        <div className="w-full flex flex-col justify-center items-center gap-2 max-w-3xl text-center mb-12">
          <motion.h1 {...fadeUp()} className="text-3xl lg:text-4xl tracking-tighter font-medium text-[#374151]">
            See what industry leaders are saying about <span className="text-[#0D1117] font-semibold text-4xl">SurplusGrid</span>
          </motion.h1>
        </div>

        <div className="w-full overflow-hidden relative">
          {/* Fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex flex-col">
            {/* Row 1 — scrolls left */}
            <div className="flex animate-marquee-left" style={{ animationDuration: '40s' }}>
              {[...row1, ...row1, ...row1].map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
            {/* Row 2 — scrolls right */}
            <div className="flex animate-marquee-right" style={{ animationDuration: '45s' }}>
              {[...row2, ...row2, ...row2].map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
            {/* Row 3 — scrolls left */}
            <div className="flex animate-marquee-left" style={{ animationDuration: '35s' }}>
              {[...row3, ...row3, ...row3].map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MEET THE DEVS ── */}
      <section className="w-full flex flex-col justify-center items-center py-[80px] px-6">
        <div className="w-full flex flex-col justify-center items-center gap-2 max-w-2xl text-center mb-12">
          <motion.h1 {...fadeUp()} className="text-3xl tracking-tighter font-medium text-[#374151]">
            Meet the <span className="text-[#0D1117] font-semibold">Devs</span>
          </motion.h1>
          <motion.span {...fadeUp(0.1)} className="text-[16px] text-[#6B7280]">
            Made with ❤️ for devs by devs.
          </motion.span>
        </div>

        <div className="flex flex-wrap justify-center gap-12 max-w-[1100px] mx-auto w-full">
          {[
            {
              name: "Souradeep Pradhan",
              role: "Full Stack Developer",
              img: "/souradeep.png",
              github: "https://github.com/pradhan-not-found/",
              linkedin: "https://www.linkedin.com/in/souradeep-pradhan/",
              website: "https://souradeep.me/"
            },
            {
              name: "Srijit Paul",
              role: "Full Stack Developer",
              img: "/srijit.png",
              github: "https://github.com/SoulSaviour1234",
              linkedin: "https://www.linkedin.com/in/srijit-paul-65593630b",
              website: "#"
            },
            {
              name: "Sattwik Das",
              role: "Full Stack Developer",
              img: "/sattwik.png",
              github: "https://github.com/Sattwik-Das",
              linkedin: "https://www.linkedin.com/in/sattwik-das-337001359",
              website: "#"
            },
            {
              name: "Aniruddha",
              role: "Full Stack Developer",
              img: "/anirudhha.png",
              github: "#",
              linkedin: "#",
              website: "#"
            },
          ].map((dev, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="flex items-center gap-4">
              <img
                src={dev.img}
                alt={dev.name}
                onError={(e) => { e.currentTarget.src = 'https://github.com/shadcn.png' }}
                className="w-20 h-20 rounded-full border border-[#E5E7EB] shrink-0 object-cover bg-[#F9FAFB]"
              />
              <div>
                <h3 className="text-[15px] font-medium text-[#0D1117] tracking-tight mb-0.5">{dev.name}</h3>
                <p className="text-[13px] text-[#6B7280] mb-2">{dev.role}</p>
                <div className="flex items-center gap-3">
                  <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-[#0D1117] transition-colors"><GithubIcon className="w-[15px] h-[15px]" /></a>
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-[#0D1117] transition-colors"><LinkedinIcon className="w-[15px] h-[15px]" /></a>
                  {dev.website !== '#' && (
                    <a href={dev.website} target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-[#0D1117] transition-colors"><Globe size={15} /></a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-white mt-[80px] pb-[120px] px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp()}
            className="rounded-[24px] bg-[#0D1117] px-10 py-16 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-[11px] tracking-[0.15em] text-[#60A5FA] uppercase mb-4">Get Started</p>
              <h2 className="text-4xl font-medium tracking-tighter text-white mb-4">
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
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#0D1117] hover:border-[#D1D5DB] transition-colors">
                  <TwitterIcon className="w-4 h-4" />
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
