import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Factory, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-bg-deep pt-32 pb-16 flex flex-col items-center overflow-hidden border-b border-border-subtle relative">
      
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col items-start text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-danger/10 border border-danger/20 rounded text-danger text-[11px] font-mono tracking-widest uppercase mb-6">
            <div className="w-2 h-2 rounded-full bg-danger animate-pulse"></div>
            Grid Curtailment Alert Active
          </div>
          
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-display font-extrabold text-text-primary leading-[1.05] tracking-tight mb-6 max-w-2xl">
            India wastes 1.7B units of clean energy every year. <br/>
            <span className="text-accent-primary">We stop that.</span>
          </h1>
          
          <p className="text-[16px] sm:text-[18px] text-text-secondary mb-10 max-w-[600px] font-body leading-relaxed">
            The B2B SaaS platform that matches surplus renewable energy windows with flexible industrial demand in real time. Predict, match, and monetize.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-3.5 rounded text-[14px] font-mono font-bold text-bg-deep bg-accent-primary hover:bg-accent-light transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(29,158,117,0.3)] hover:shadow-[0_0_30px_rgba(29,158,117,0.5)]">
              Schedule Load Shift
              <ArrowRight size={16} />
            </Link>
            <Link to="/signup" className="w-full sm:w-auto px-8 py-3.5 rounded text-[14px] font-mono font-bold text-text-primary bg-bg-surface border border-border-subtle hover:bg-bg-card transition-all flex items-center justify-center gap-2">
              List Energy Surplus
            </Link>
          </div>
        </motion.div>

        {/* Right Animated Match Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="glass-card w-full max-w-md p-6 relative overflow-hidden group">
            {/* Ambient glow behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-primary/5 blur-[80px] -z-10 rounded-full"></div>
            
            <div className="flex justify-between items-start mb-6 border-b border-border-subtle pb-4">
              <div>
                <p className="text-[11px] font-mono text-warning uppercase tracking-widest mb-1">Live Match Found</p>
                <h3 className="font-display text-xl text-text-primary">Surplus Alert: Zone West</h3>
              </div>
              <div className="bg-bg-deep border border-border-subtle px-3 py-1 rounded">
                <span className="font-mono text-accent-primary text-sm font-bold">14:00 - 16:30</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Producer side */}
              <div className="flex items-center gap-4 bg-bg-deep p-3 rounded border border-border-subtle">
                <div className="p-2 bg-accent-primary/10 text-accent-light rounded">
                  <Zap size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-body text-text-secondary">Source</p>
                  <p className="text-[15px] font-medium text-text-primary">Adani Solar Park (TN)</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-bold text-accent-primary">45 MW</p>
                  <p className="text-[11px] font-mono text-text-secondary uppercase">Available</p>
                </div>
              </div>

              {/* Matching indicator */}
              <div className="flex justify-center relative py-2">
                <div className="w-[2px] h-10 bg-gradient-to-b from-accent-primary to-warning"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-surface border border-border-subtle flex items-center justify-center z-10">
                  <ArrowRight size={12} className="text-text-secondary rotate-90" />
                </div>
              </div>

              {/* Consumer side */}
              <div className="flex items-center gap-4 bg-bg-deep p-3 rounded border border-warning/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-warning/5"></div>
                <div className="p-2 bg-warning/10 text-warning rounded relative z-10">
                  <Factory size={20} />
                </div>
                <div className="flex-1 relative z-10">
                  <p className="text-[13px] font-body text-text-secondary">Target Load</p>
                  <p className="text-[15px] font-medium text-text-primary">TCS Data Center (MUM)</p>
                </div>
                <div className="text-right relative z-10">
                  <p className="font-mono text-lg font-bold text-warning">40 MW</p>
                  <p className="text-[11px] font-mono text-text-secondary uppercase">Required</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle flex justify-between items-center">
              <div>
                <p className="text-[12px] font-body text-text-secondary">Projected Savings</p>
                <p className="font-mono text-xl font-bold text-accent-primary">₹ 42,500</p>
              </div>
              <button className="px-4 py-2 bg-accent-primary hover:bg-accent-light text-bg-deep font-mono font-bold text-sm rounded shadow-lg transition-colors flex items-center gap-2">
                <CheckCircle2 size={16} />
                Shift Load
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div className="w-full border-t border-border-subtle bg-bg-surface/50 mt-20 relative z-10">
        <div className="max-w-[90rem] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border-subtle">
            <div className="py-4 md:py-0">
              <p className="font-mono text-4xl lg:text-5xl font-bold text-text-primary mb-2">14.2<span className="text-accent-primary text-2xl lg:text-3xl">GWh</span></p>
              <p className="font-mono text-[12px] text-text-secondary uppercase tracking-widest">Curtailment Avoided</p>
            </div>
            <div className="py-4 md:py-0">
              <p className="font-mono text-4xl lg:text-5xl font-bold text-text-primary mb-2">340<span className="text-accent-primary text-2xl lg:text-3xl">+</span></p>
              <p className="font-mono text-[12px] text-text-secondary uppercase tracking-widest">Industrial Facilities Active</p>
            </div>
            <div className="py-4 md:py-0">
              <p className="font-mono text-4xl lg:text-5xl font-bold text-text-primary mb-2">₹1.8<span className="text-accent-primary text-2xl lg:text-3xl">Cr</span></p>
              <p className="font-mono text-[12px] text-text-secondary uppercase tracking-widest">Client Savings Generated</p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
