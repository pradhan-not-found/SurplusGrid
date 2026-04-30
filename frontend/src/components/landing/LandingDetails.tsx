import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, Activity, Zap,
  ArrowRight, Mail, Globe, ShieldCheck, Leaf, ArrowUpRight
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

// -- SHOWCASE COMPONENTS --
function MiniCard({ title, sub, value, badge, color }: { title: string, sub: string, value: string, badge: string, color: string }) {
  return (
    <div className="bg-white p-5 border border-[#E5E7EB] w-52 mb-4 rounded-[12px] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-[#6B7280]">{title}</span>
        <span className="text-[10px] px-2 py-0.5 bg-zinc-100 text-[#374151] rounded-full">{badge}</span>
      </div>
      <p className="text-xl font-semibold text-[#0D1117] mb-1">{value}</p>
      <p className="text-[11px] text-[#9CA3AF]">{sub}</p>
      <div className="mt-4 h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
        <div className={`h-full w-2/3 bg-gradient-to-r ${color}`} />
      </div>
    </div>
  );
}

function MiniAlertCard() {
  return (
    <div className="bg-white p-4 border border-[#E5E7EB] w-52 mb-4 rounded-[12px] shadow-sm space-y-2">
      <div className="flex items-center gap-2 p-2 bg-rose-50 border border-rose-100 rounded-lg">
        <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
          <Zap size={12} className="text-rose-600" />
        </div>
        <span className="text-[11px] text-rose-700 font-medium">Grid Frequency Drop</span>
      </div>
      <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded-lg">
        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <Activity size={12} className="text-blue-600" />
        </div>
        <span className="text-[11px] text-blue-700 font-medium">New match available</span>
      </div>
    </div>
  );
}

function MiniSettleCard() {
  return (
    <div className="bg-white p-4 border border-[#E5E7EB] w-52 mb-4 rounded-[12px] shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-[#0D1117] uppercase tracking-wider">Settlement</span>
        <span className="text-[10px] text-emerald-600 font-medium">Cleared</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 size={16} className="text-emerald-500" />
        <span className="text-xs text-[#374151]">Block #8924</span>
      </div>
      <button className="w-full py-1.5 bg-[#0D1117] text-white text-[10px] font-medium rounded-lg">View Receipt</button>
    </div>
  );
}

function MiniStatusCard() {
  return (
    <div className="bg-white p-5 border border-[#E5E7EB] w-52 mb-4 rounded-[12px] shadow-sm">
      <p className="text-xs text-[#6B7280] mb-3">System Status</p>
      <div className="flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-[10px] font-medium">WRLDC Sync</span>
        <span className="px-2 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-[10px] font-medium">Matcher Active</span>
        <span className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-[10px] font-medium">API Delayed</span>
      </div>
    </div>
  );
}

function EnergyMarqueeCol({ children, cards, reverse = false, speed = 25 }: { children?: React.ReactNode; cards?: React.ReactNode[], reverse?: boolean; speed?: number }) {
  const content = cards || children;
  return (
    <div className="flex flex-col overflow-hidden h-[600px] relative">
      <div
        className={`flex flex-col ${reverse ? "animate-marquee-down" : "animate-marquee-up"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {content}
        {content}
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

      {/* ── COMPONENT SHOWCASE ── */}
      <section className="w-full flex flex-col justify-center items-center py-[80px]">
        <motion.div {...fadeUp()} className="w-full flex flex-col justify-center items-center gap-2 max-w-2xl text-center mb-12 px-6">
          <h1 className="text-4xl tracking-tighter font-medium text-[#0D1117]">Components that don't get in the way.</h1>
          <span className="text-[16px] text-[#6B7280]">
            Every panel, alert, and match card is built for operators — not dashboards for dashboards' sake.
          </span>
        </motion.div>

        {/* Vertical marquee grid */}
        <div className="w-full overflow-hidden relative max-w-[100vw]" style={{ height: 600 }}>
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
          <div className="flex w-full justify-center md:gap-4 overflow-hidden px-4 md:px-0">
            {/* Col 1 — up */}
            <EnergyMarqueeCol speed={30} reverse={false} cards={[
              <MiniCard key="c1" title="Solar Output" sub="Live MW" value="42.3 MW" badge="+8%" color="from-amber-400 to-orange-400" />,
              <MiniCard key="c2" title="Match Found" sub="SolarTech → BlastFurnace" value="3.8 MW" badge="Live" color="from-emerald-400 to-teal-500" />,
              <MiniCard key="c3" title="Surplus Window" sub="Tomorrow 11:00–14:00" value="₹2.1/unit" badge="Pending" color="from-blue-400 to-indigo-500" />,
              <MiniAlertCard key="a1" />,
              <MiniSettleCard key="s1" />,
            ]} />
            {/* Col 2 — down */}
            <div className="hidden sm:block">
            <EnergyMarqueeCol speed={35} reverse={true} cards={[
              <MiniCard key="c4" title="Wind Output" sub="WRLDC Zone" value="18.6 MW" badge="Active" color="from-cyan-400 to-blue-500" />,
              <MiniCard key="c5" title="Curtailment Saved" sub="This month" value="1.2M kWh" badge="↑12%" color="from-violet-400 to-purple-500" />,
              <MiniCard key="c6" title="Revenue" sub="April 2026" value="₹41.2k" badge="+24%" color="from-rose-400 to-pink-500" />,
              <MiniStatusCard key="st1" />,
              <MiniCard key="c7" title="SLDC Report" sub="Auto-generated" value="Compliant" badge="✓" color="from-emerald-500 to-green-400" />,
            ]} />
            </div>
            {/* Col 3 — up */}
            <div className="hidden md:block">
            <EnergyMarqueeCol speed={27} reverse={false} cards={[
              <MiniCard key="c8" title="Load Shifted" sub="Apr 2026" value="67.4 MWh" badge="↑5%" color="from-teal-400 to-emerald-500" />,
              <MiniCard key="c9" title="Carbon Offset" sub="CO₂ equivalent" value="1,140 kg" badge="Verified" color="from-green-400 to-teal-400" />,
              <MiniCard key="c10" title="Active Matches" sub="Right now" value="3" badge="Live" color="from-blue-500 to-cyan-400" />,
              <MiniCard key="c11" title="Savings" sub="This month" value="₹38.7k" badge="+18%" color="from-amber-500 to-orange-400" />,
              <MiniAlertCard key="a2" />,
            ]} />
            </div>
            {/* Col 4 — down */}
            <div className="hidden lg:block">
            <EnergyMarqueeCol speed={29} reverse={true} cards={[
              <MiniCard key="c12" title="EV Fleet" sub="Charging window" value="11:00–14:00" badge="Matched" color="from-indigo-400 to-violet-500" />,
              <MiniCard key="c13" title="Demand Profile" sub="BlueSteel Industries" value="15 MW" badge="Seeking" color="from-pink-400 to-rose-500" />,
              <MiniSettleCard key="s2" />,
              <MiniCard key="c14" title="Intra-day Bid" sub="Day-ahead market" value="₹1.9/unit" badge="Open" color="from-sky-400 to-blue-500" />,
              <MiniStatusCard key="st2" />,
            ]} />
            </div>
          </div>
        </div>
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
      <footer className="w-full bg-white mt-[40px]">
        <div className="border-t border-[#E5E7EB] overflow-hidden">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#E5E7EB]">
            {/* Left - Tagline */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#E5E7EB]">
              <div className="flex -space-x-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-zinc-200 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-zinc-300 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-zinc-400 border-2 border-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-zinc-800 tracking-tighter">
                Components that
                <br />
                don't <span className="italic text-[#2563EB]">get in the way.</span>
              </h2>
            </div>

            {/* Right - Links */}
            <div className="p-8 md:p-12 flex items-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 w-full">
                {[
                  { label: "Components", href: "#" },
                  { label: "Blocks", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Documentation", href: "#" },
                  { label: "Showcase", href: "#" },
                  { label: "Privacy Policy", href: "#" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center justify-between py-2 text-zinc-600 hover:text-zinc-900 transition-colors border-b border-[#E5E7EB] group"
                  >
                    <span className="text-sm">{link.label}</span>
                    <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative p-8 md:p-12 min-h-[300px] flex flex-col justify-between">
            {/* Large Brand Name */}
            <div className="flex-1 flex items-center justify-center pointer-events-none select-none">
               <img src="/logo.png" alt="SurplusGrid" className="max-w-[90%] md:max-w-[70%] lg:max-w-[50%] h-auto object-contain opacity-90 grayscale contrast-125" />
            </div>

            {/* Social Icons */}
            <div className="absolute top-8 right-8 flex items-center gap-3">
              <a href="#" target="_blank" className="p-2 rounded-full border border-[#E5E7EB] text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" className="p-2 rounded-full border border-[#E5E7EB] text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" className="p-2 rounded-full border border-[#E5E7EB] text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Copyright */}
            <div className="absolute bottom-8 right-8 text-right text-xs text-zinc-500 uppercase tracking-wider">
              <p>All rights reserved.</p>
              <p>&copy; {new Date().getFullYear()} SurplusGrid.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
