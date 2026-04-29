import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Background with slight blur and gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/image.png)' }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm bg-gradient-to-b from-white/60 to-[#f9fafb]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/80 text-green-700 text-sm font-medium mb-6 border border-green-200 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            Live Matching Active
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Stop Wasting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">Renewable Energy</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Match surplus solar & wind power with flexible industrial demand in real-time. Optimize your grid, save costs, and accelerate the transition to clean energy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-white bg-green-500 hover:bg-green-600 transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98]">
              Explore Platform
              <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] shadow-sm">
              <PlayCircle size={18} className="text-gray-400" />
              See Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
