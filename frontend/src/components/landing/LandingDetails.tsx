import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Factory, Activity, CheckCircle2, ShieldCheck, Zap, Sun } from 'lucide-react';

export default function LandingDetails() {
  const [activeTab, setActiveTab] = useState<'producer' | 'consumer'>('producer');

  return (
    <div className="bg-white">
      
      {/* How it works */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-gray-900 mb-6 tracking-tight">How SurplusGrid Works</h2>
          <p className="text-gray-500 font-body text-lg max-w-2xl mx-auto">A unified platform bridging the gap between renewable energy curtailment and industrial energy demand.</p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="bg-gray-50 p-1.5 rounded-full border border-gray-200 flex max-w-md w-full">
            <button 
              onClick={() => setActiveTab('producer')}
              className={`flex-1 py-3 text-sm font-medium transition-all rounded-full ${activeTab === 'producer' ? 'bg-white text-green-700 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
            >
              For Producers
            </button>
            <button 
              onClick={() => setActiveTab('consumer')}
              className={`flex-1 py-3 text-sm font-medium transition-all rounded-full ${activeTab === 'consumer' ? 'bg-white text-blue-700 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
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
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  { title: "Report Surplus", desc: "Connect your forecast APIs or manually enter predicted curtailment windows.", icon: <Activity size={24}/> },
                  { title: "Algorithmic Match", desc: "Our engine instantly finds regional industrial loads capable of absorbing your excess MWs.", icon: <Zap size={24}/> },
                  { title: "Monetize", desc: "Energy flows. Avoid curtailment completely and realize revenue that would be lost.", icon: <CheckCircle2 size={24}/> }
                ].map((step, i) => (
                  <div key={i} className="glass-card p-8 hover:-translate-y-1 transition-transform">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <h3 className="font-display font-semibold text-xl text-gray-900 mb-3">0{i+1}. {step.title}</h3>
                    <p className="font-body text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="cons"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  { title: "Define Flexibility", desc: "Log your heavy machinery schedules and permissible load-shift windows.", icon: <Factory size={24}/> },
                  { title: "Receive Alerts", desc: "Get instant push/SMS notifications when cheap surplus energy hits the local grid.", icon: <Zap size={24}/> },
                  { title: "Shift & Save", desc: "Approve the load shift. Consume 100% clean energy at massive discounts.", icon: <CheckCircle2 size={24}/> }
                ].map((step, i) => (
                  <div key={i} className="glass-card p-8 hover:-translate-y-1 transition-transform">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <h3 className="font-display font-semibold text-xl text-gray-900 mb-3">0{i+1}. {step.title}</h3>
                    <p className="font-body text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gray-50/50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-10 relative">
            <Factory size={120} className="absolute -bottom-6 -right-6 text-gray-50/50 -z-10" />
            <p className="font-body text-xl text-gray-700 mb-8 leading-relaxed font-light">
              "We run blast furnaces that draw 15MW. Being alerted to surplus windows lets us shift our heaviest batches to off-peak grid pricing. SurplusGrid effectively cut our highest utility tier by 30%."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Rajesh K.</p>
                <p className="text-sm text-gray-500">Plant Manager, Tata Steel</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-10 relative">
            <Sun size={120} className="absolute -bottom-6 -right-6 text-gray-50/50 -z-10" />
            <p className="font-body text-xl text-gray-700 mb-8 leading-relaxed font-light">
              "Curtailment is the silent killer of solar ROI. Integrating our telemetry with SurplusGrid means whenever the grid says 'stop', we immediately route that power to industrial buyers."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Sarah M.</p>
                <p className="text-sm text-gray-500">Director of Ops, CleanPowerGen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-b border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-gray-900 mb-4 tracking-tight">Simple, transparent pricing</h2>
          <p className="text-gray-500 text-lg">No hidden fees. Pay only for what you match.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-8 flex flex-col">
            <p className="text-sm font-medium text-gray-500 mb-2">Starter</p>
            <p className="text-4xl font-semibold text-gray-900 mb-6">₹5,000<span className="text-base text-gray-500 font-normal">/mo</span></p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 size={18} className="text-green-500"/> Up to 5MW capacity</li>
              <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 size={18} className="text-green-500"/> Basic alerts</li>
              <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 size={18} className="text-green-500"/> Email support</li>
            </ul>
            <button className="w-full py-3 bg-white border border-gray-200 text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-colors">Start Free Trial</button>
          </div>
          <div className="glass-card p-8 flex flex-col border-green-500 relative shadow-xl scale-105 z-10">
            <div className="absolute top-0 inset-x-0 h-1 bg-green-500 rounded-t-2xl"></div>
            <p className="text-sm font-medium text-green-600 mb-2">Growth</p>
            <p className="text-4xl font-semibold text-gray-900 mb-6">₹15,000<span className="text-base text-gray-500 font-normal">/mo</span></p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 size={18} className="text-green-500"/> Up to 50MW capacity</li>
              <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 size={18} className="text-green-500"/> Real-time API access</li>
              <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 size={18} className="text-green-500"/> Automated load shifting</li>
            </ul>
            <button className="w-full py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors">Upgrade to Growth</button>
          </div>
          <div className="glass-card p-8 flex flex-col">
            <p className="text-sm font-medium text-gray-500 mb-2">Enterprise</p>
            <p className="text-4xl font-semibold text-gray-900 mb-6">Custom</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 size={18} className="text-green-500"/> Unlimited capacity</li>
              <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 size={18} className="text-green-500"/> Custom SLDC integration</li>
              <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 size={18} className="text-green-500"/> Dedicated account manager</li>
            </ul>
            <button className="w-full py-3 bg-white border border-gray-200 text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-colors">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <img src="/logo.png" alt="SurplusGrid" className="h-9 w-auto object-contain" />
            <div className="flex flex-wrap justify-center gap-6">
              <div className="px-4 py-2 border border-gray-200 rounded-full flex items-center gap-2 text-gray-600 text-sm font-medium">
                <ShieldCheck size={16} className="text-green-600"/> POSOCO Compliant
              </div>
              <div className="px-4 py-2 border border-gray-200 rounded-full flex items-center gap-2 text-gray-600 text-sm font-medium">
                <Activity size={16} className="text-green-600"/> SLDC Integrated
              </div>
              <div className="px-4 py-2 border border-gray-200 rounded-full flex items-center gap-2 text-gray-600 text-sm font-medium">
                <Sparkles size={16} className="text-green-600"/> Carbon Verified
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} SurplusGrid Technologies. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 font-medium">
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">API Docs</a>
              <a href="#" className="hover:text-gray-900 transition-colors">System Status</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
