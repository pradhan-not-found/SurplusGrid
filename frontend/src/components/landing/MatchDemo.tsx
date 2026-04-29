import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, BatteryCharging, Factory } from 'lucide-react';

export default function MatchDemo() {
  return (
    <section className="py-24 bg-[#f8fafc] overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Real-Time Matching</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-light">See how our algorithm instantly connects supply with demand.</p>
        </div>

        {/* Mock Alert Box */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16 bg-white border border-green-200 rounded-2xl p-4 shadow-lg shadow-green-500/10 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 animate-pulse">
            <span className="text-green-600 text-lg">⚡</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Cheap clean energy available 11 AM – 2 PM.</p>
            <p className="text-sm text-green-600 font-medium">Save ₹12,000 this week by shifting your load.</p>
          </div>
        </motion.div>

        {/* Two Columns Demo */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
          
          {/* Producer Block */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 glass-card bg-white/80 p-6 rounded-2xl border border-gray-100 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <BatteryCharging className="text-yellow-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Solar Farm Alpha</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Available</span>
                <span className="font-medium text-gray-900">500 kWh</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time Window</span>
                <span className="font-medium text-gray-900">11:00 - 14:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-green-500">Matching...</span>
              </div>
            </div>
          </motion.div>

          {/* Connection Animation */}
          <div className="hidden md:flex flex-col items-center text-green-500">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRightLeft size={32} strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Consumer Block */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 glass-card bg-white/80 p-6 rounded-2xl border border-gray-100 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Factory className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Steel Works Ltd</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Required Load</span>
                <span className="font-medium text-gray-900">450 kWh</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Flexible Window</span>
                <span className="font-medium text-gray-900">10:00 - 15:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-green-500">Matched!</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
