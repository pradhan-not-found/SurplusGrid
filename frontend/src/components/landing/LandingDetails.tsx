import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Factory, Activity, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function LandingDetails() {
  const [activeTab, setActiveTab] = useState<'producer' | 'consumer'>('producer');

  return (
    <div className="bg-bg-deep border-t border-border-subtle">
      
      {/* How it works */}
      <section className="py-24 px-6 max-w-[90rem] mx-auto border-b border-border-subtle">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">Core Operating Loop</h2>
          <p className="text-text-secondary font-mono text-sm max-w-2xl mx-auto uppercase tracking-widest">Select your operating mode</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-bg-surface p-1 rounded border border-border-subtle flex max-w-md w-full">
            <button 
              onClick={() => setActiveTab('producer')}
              className={`flex-1 py-3 text-sm font-mono uppercase tracking-widest transition-all rounded ${activeTab === 'producer' ? 'bg-bg-card text-accent-primary shadow-lg border border-border-subtle' : 'text-text-secondary hover:text-text-primary'}`}
            >
              For Producers
            </button>
            <button 
              onClick={() => setActiveTab('consumer')}
              className={`flex-1 py-3 text-sm font-mono uppercase tracking-widest transition-all rounded ${activeTab === 'consumer' ? 'bg-bg-card text-warning shadow-lg border border-border-subtle' : 'text-text-secondary hover:text-text-primary'}`}
            >
              For Consumers
            </button>
          </div>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === 'producer' ? (
              <motion.div 
                key="prod"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  { title: "Report Surplus", desc: "API integration or manual entry of predicted curtailment windows.", icon: <Activity size={24}/> },
                  { title: "Algorithmic Match", desc: "Engine finds regional industrial loads capable of absorbing your MWs.", icon: <Zap size={24}/> },
                  { title: "Monetize", desc: "Energy flows. Avoid curtailment completely and realize revenue.", icon: <CheckCircle2 size={24}/> }
                ].map((step, i) => (
                  <div key={i} className="glass-card p-8 border-t-2 border-t-accent-primary hover:border-t-accent-light transition-all">
                    <div className="w-12 h-12 bg-accent-primary/10 text-accent-primary rounded flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <h3 className="font-display text-xl text-text-primary mb-3">0{i+1}. {step.title}</h3>
                    <p className="font-body text-text-secondary text-sm">{step.desc}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="cons"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  { title: "Define Flexibility", desc: "Log your heavy machinery schedules and permissible shift windows.", icon: <Factory size={24}/> },
                  { title: "Receive Alerts", desc: "Instant push/SMS when cheap surplus energy hits the grid.", icon: <Zap size={24}/> },
                  { title: "Shift & Save", desc: "Approve load shift. Consume clean energy at massive discounts.", icon: <CheckCircle2 size={24}/> }
                ].map((step, i) => (
                  <div key={i} className="glass-card p-8 border-t-2 border-t-warning hover:border-t-warning/80 transition-all">
                    <div className="w-12 h-12 bg-warning/10 text-warning rounded flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <h3 className="font-display text-xl text-text-primary mb-3">0{i+1}. {step.title}</h3>
                    <p className="font-body text-text-secondary text-sm">{step.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-bg-surface border-b border-border-subtle">
        <div className="max-w-[90rem] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-10 bg-bg-deep border-l-4 border-l-warning relative">
            <Factory size={48} className="absolute top-10 right-10 text-white/5" />
            <p className="font-body text-lg text-text-primary mb-8 leading-relaxed">
              "We run blast furnaces that draw 15MW. Being alerted to surplus windows lets us shift our heaviest batches to off-peak grid pricing. SurplusGrid effectively cut our highest utility tier by 30%."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-bg-card rounded border border-border-subtle"></div>
              <div>
                <p className="font-mono text-sm font-bold text-text-primary">Rajesh K.</p>
                <p className="font-mono text-[11px] text-text-secondary uppercase">Plant Manager, Tata Steel</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-10 bg-bg-deep border-l-4 border-l-accent-primary relative">
            <Leaf size={48} className="absolute top-10 right-10 text-white/5" />
            <p className="font-body text-lg text-text-primary mb-8 leading-relaxed">
              "Curtailment is the silent killer of solar ROI. Integrating our telemetry with SurplusGrid means whenever the grid says 'stop', we immediately route that power to industrial buyers."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-bg-card rounded border border-border-subtle"></div>
              <div>
                <p className="font-mono text-sm font-bold text-text-primary">Sarah M.</p>
                <p className="font-mono text-[11px] text-text-secondary uppercase">Director of Ops, CleanPowerGen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-[90rem] mx-auto border-b border-border-subtle">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">Enterprise Licensing</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-8 flex flex-col">
            <p className="font-mono text-sm uppercase tracking-widest text-text-secondary mb-2">Starter</p>
            <p className="font-mono text-4xl font-bold text-text-primary mb-6">₹5,000<span className="text-sm text-text-secondary font-normal">/mo</span></p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm font-body text-text-secondary"><CheckCircle2 size={16} className="text-accent-primary"/> Up to 5MW capacity</li>
              <li className="flex items-center gap-3 text-sm font-body text-text-secondary"><CheckCircle2 size={16} className="text-accent-primary"/> Basic alerts</li>
              <li className="flex items-center gap-3 text-sm font-body text-text-secondary"><CheckCircle2 size={16} className="text-accent-primary"/> Email support</li>
            </ul>
            <button className="w-full py-3 bg-bg-surface border border-border-subtle text-text-primary font-mono text-sm rounded hover:bg-bg-card transition-colors">Start Free Trial</button>
          </div>
          <div className="glass-card p-8 flex flex-col border-accent-primary/50 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-accent-primary"></div>
            <p className="font-mono text-sm uppercase tracking-widest text-accent-primary mb-2">Growth</p>
            <p className="font-mono text-4xl font-bold text-text-primary mb-6">₹15,000<span className="text-sm text-text-secondary font-normal">/mo</span></p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm font-body text-text-secondary"><CheckCircle2 size={16} className="text-accent-primary"/> Up to 50MW capacity</li>
              <li className="flex items-center gap-3 text-sm font-body text-text-secondary"><CheckCircle2 size={16} className="text-accent-primary"/> Real-time API access</li>
              <li className="flex items-center gap-3 text-sm font-body text-text-secondary"><CheckCircle2 size={16} className="text-accent-primary"/> Automated load shifting</li>
            </ul>
            <button className="w-full py-3 bg-accent-primary text-bg-deep font-bold font-mono text-sm rounded hover:bg-accent-light transition-colors">Upgrade to Growth</button>
          </div>
          <div className="glass-card p-8 flex flex-col">
            <p className="font-mono text-sm uppercase tracking-widest text-text-secondary mb-2">Enterprise</p>
            <p className="font-mono text-4xl font-bold text-text-primary mb-6">Custom</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm font-body text-text-secondary"><CheckCircle2 size={16} className="text-accent-primary"/> Unlimited capacity</li>
              <li className="flex items-center gap-3 text-sm font-body text-text-secondary"><CheckCircle2 size={16} className="text-accent-primary"/> Custom SLDC integration</li>
              <li className="flex items-center gap-3 text-sm font-body text-text-secondary"><CheckCircle2 size={16} className="text-accent-primary"/> Dedicated account manager</li>
            </ul>
            <button className="w-full py-3 bg-bg-surface border border-border-subtle text-text-primary font-mono text-sm rounded hover:bg-bg-card transition-colors">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-deep pt-16 pb-8 border-t border-border-subtle">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="flex items-center gap-2">
              <Leaf size={20} className="text-accent-primary" />
              <span className="text-xl font-display font-bold tracking-tight text-text-primary">SurplusGrid</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="px-4 py-2 border border-border-subtle rounded flex items-center gap-2 text-text-secondary font-mono text-xs uppercase tracking-widest">
                <ShieldCheck size={14} className="text-accent-primary"/> POSOCO Compliant
              </div>
              <div className="px-4 py-2 border border-border-subtle rounded flex items-center gap-2 text-text-secondary font-mono text-xs uppercase tracking-widest">
                <Activity size={14} className="text-accent-primary"/> SLDC Integrated
              </div>
              <div className="px-4 py-2 border border-border-subtle rounded flex items-center gap-2 text-text-secondary font-mono text-xs uppercase tracking-widest">
                <Leaf size={14} className="text-accent-primary"/> Carbon Verified
              </div>
            </div>
          </div>
          <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-text-secondary">
            <p>© {new Date().getFullYear()} SurplusGrid Technologies. Grid Infrastructure SaaS.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-accent-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-accent-primary transition-colors">API Docs</a>
              <a href="#" className="hover:text-accent-primary transition-colors">System Status</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
