import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-[95vh] flex flex-col justify-center">
      
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{ backgroundImage: 'url(/image.png)' }}
      >
        {/* Professional Overlay: Soft fade to white at the bottom, slight darkening on top for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white backdrop-blur-[2px]"></div>
      </div>

      {/* Top Text Content */}
      <div className="max-w-[90rem] mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-gray-100 text-gray-600 text-[11px] font-semibold tracking-wide uppercase mb-8">
            <Sparkles size={14} className="text-green-500" />
            100% Renewable power source
            <Sparkles size={14} className="text-green-500" />
          </div>
          
          {/* Heading */}
          <h1 
            className="text-[44px] sm:text-[60px] lg:text-[80px] font-light text-[#0a0a0a] leading-[1.05] tracking-[-0.03em] mb-6 max-w-5xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Renewable Power For Tomorrow,<br className="hidden md:block" />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#223B2F] to-[#4ade80]">Infinite Clean Solutions</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-[16px] sm:text-[18px] text-gray-600 mb-10 max-w-[650px] mx-auto font-light leading-relaxed">
            Sustainable energy solutions engineering, analyzing, and executing solar projects for homes, businesses, and large-scale commercial clients. Join the grid of the future.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-3.5 rounded-full text-[15px] font-medium text-white bg-[#1a1a1a] hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
              <ArrowUpRight size={18} className="text-green-400" />
              Explore Options
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-3.5 rounded-full text-[15px] font-medium text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <PlayCircle size={14} className="text-gray-900" />
              </div>
              How it works
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements (Overlaying the background) */}
      <div className="relative w-full max-w-[100rem] mx-auto hidden lg:block">
        {/* Floating Left Widget */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute -top-32 left-16 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl border border-white/50 items-center gap-4 flex z-20"
        >
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Grid Efficiency</p>
            <p className="text-[15px] font-bold text-gray-900">72% Increased</p>
          </div>
        </motion.div>

        {/* Floating Right Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute -top-10 right-16 z-20 group cursor-pointer"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-xl border border-gray-100 group-hover:scale-110 transition-transform duration-300">
             <PlayCircle size={28} strokeWidth={1.5} className="text-green-600" />
          </div>
        </motion.div>
      </div>

      {/* Partners Ticker - moved outside of the main flex to anchor at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full border-t border-gray-200/50 bg-white/50 backdrop-blur-md z-30">
        <div className="max-w-[90rem] mx-auto px-6 py-5 flex justify-between items-center overflow-x-auto gap-12 text-[13px] font-bold text-gray-500 uppercase tracking-[0.25em] no-scrollbar">
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">OVO</span>
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">Bower</span>
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">Umney</span>
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">Vestas</span>
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">NPE</span>
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">Winds</span>
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">Concept</span>
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">SolarC</span>
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">Inverter</span>
          <span className="flex-shrink-0 hover:text-gray-900 transition-colors cursor-default">ARC</span>
        </div>
      </div>
    </section>
  );
}
