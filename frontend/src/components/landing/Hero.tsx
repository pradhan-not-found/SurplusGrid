import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-0 overflow-hidden flex flex-col bg-white">
      
      {/* Top Text Content */}
      <div className="max-w-[90rem] mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-gray-500 text-[11px] font-medium tracking-wide uppercase mb-6">
            <Sparkles size={12} className="text-gray-400" />
            100% Renewable power source
            <Sparkles size={12} className="text-gray-400" />
          </div>
          
          {/* Heading */}
          <h1 
            className="text-[40px] sm:text-[56px] lg:text-[72px] font-light text-[#111] leading-[1.05] tracking-[-0.02em] mb-6 max-w-4xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Renewable Power For Tomorrow,<br className="hidden md:block" />
            Infinite Clean Solutions
          </h1>
          
          {/* Subheading */}
          <p className="text-[15px] sm:text-base text-gray-500 mb-8 max-w-[600px] mx-auto font-light leading-relaxed">
            Sustainable energy solutions engineering, analyzing, and executing solar projects for homes, businesses, and large-scale commercial clients.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto px-6 py-2.5 rounded-full text-[14px] font-medium text-white bg-[#223B2F] hover:bg-[#15251d] transition-all flex items-center justify-center gap-2">
              <ArrowUpRight size={16} className="text-green-300" />
              Explore Options
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto px-6 py-2.5 rounded-full text-[14px] font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                <PlayCircle size={14} className="text-gray-600" />
              </div>
              How it works
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main Illustration & Floating Elements */}
      <div className="relative w-full mt-10 max-w-[100rem] mx-auto flex items-end justify-center min-h-[400px] md:min-h-[500px]">
        
        {/* Floating Left Widget */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hidden md:flex absolute left-12 lg:left-32 bottom-24 bg-white/90 backdrop-blur-md px-3 py-2.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] items-center gap-3 z-20"
        >
          <div className="w-8 h-8 bg-[#f4f7f6] rounded-md flex items-center justify-center text-[#223B2F]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Efficiency</p>
            <p className="text-[13px] font-semibold text-gray-900">72% increased</p>
          </div>
        </motion.div>

        {/* Floating Right Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="hidden md:flex absolute right-12 lg:right-32 bottom-24 z-20 group cursor-pointer"
        >
          <div className="w-14 h-14 bg-[#111] rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300">
             <PlayCircle size={24} strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Image Section */}
        <div className="relative z-10 w-full max-w-[90%] md:max-w-[85%] mx-auto pb-8">
          <img 
            src="/image.png" 
            alt="Renewable Energy Landscape" 
            className="w-full h-auto object-contain drop-shadow-xl"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
          />
        </div>
      </div>

      {/* Partners Ticker */}
      <div className="w-full border-t border-gray-100 bg-white relative z-30 overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 py-6 flex justify-between items-center overflow-x-auto gap-12 text-[12px] font-semibold text-gray-400 uppercase tracking-[0.2em] no-scrollbar">
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">OVO</span>
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">Bower</span>
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">Umney</span>
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">Vestas</span>
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">NPE</span>
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">Winds</span>
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">Concept</span>
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">SolarC</span>
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">Inverter</span>
          <span className="flex-shrink-0 hover:text-gray-600 transition-colors cursor-default">ARC</span>
        </div>
      </div>
    </section>
  );
}
