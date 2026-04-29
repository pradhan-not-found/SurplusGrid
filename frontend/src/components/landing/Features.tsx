import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Factory, Zap, BarChart3, CloudLightning, ShieldCheck } from 'lucide-react';

export default function Features() {
  const coreSteps = [
    {
      icon: <Sun className="w-6 h-6 text-yellow-500" />,
      title: "Producers Add Surplus",
      description: "Solar and wind farms forecast and log excess capacity."
    },
    {
      icon: <Factory className="w-6 h-6 text-blue-500" />,
      title: "Businesses Add Flexible Load",
      description: "Industries schedule heavy power usage for flexible windows."
    },
    {
      icon: <Zap className="w-6 h-6 text-green-500" />,
      title: "We Match & Save Cost",
      description: "Our engine pairs supply and demand in real-time."
    }
  ];

  const benefits = [
    { icon: <BarChart3 />, text: "Reduce energy cost" },
    { icon: <CloudLightning />, text: "Avoid renewable waste" },
    { icon: <Zap />, text: "No hardware needed" },
    { icon: <ShieldCheck />, text: "Instant alerts" }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* How It Works Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">How It Works</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-light">A seamless marketplace connecting clean energy producers with industrial consumers.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-y-1/2 z-0"></div>
            
            {coreSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10 glass-card bg-white/80 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div id="features" className="pt-16 border-t border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Why SurplusGrid?</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-green-500 mb-4">
                  {React.cloneElement(benefit.icon, { size: 32, strokeWidth: 1.5 })}
                </div>
                <p className="font-medium text-gray-800">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
