import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white pt-32 flex flex-col items-center overflow-hidden">
      
      {/* Top Text Content */}
      <div className="max-w-[90rem] mx-auto px-6 w-full flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-gray-400 text-[11px] font-medium tracking-widest uppercase mb-6 border border-gray-100 rounded-full">
            <Sparkles size={12} className="text-gray-300" />
            100% Renewable power source
            <Sparkles size={12} className="text-gray-300" />
          </div>
          
          {/* Heading */}
          <h1 
            className="text-[40px] sm:text-[56px] lg:text-[72px] font-light text-[#1a1a1a] leading-[1.05] tracking-[-0.02em] mb-6 max-w-4xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Renewable Power For Tomorrow,<br className="hidden md:block" />
            Infinite Clean Solutions
          </h1>
          
          {/* Subheading */}
          <p className="text-[15px] sm:text-[17px] text-gray-500 mb-10 max-w-[650px] mx-auto font-light leading-relaxed">
            Sustainable energy solutions engineering, analyzing, and executing solar projects for homes, businesses, and large-scale commercial clients.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto px-6 py-2.5 rounded-full text-[14px] font-medium text-white bg-[#1e362d] hover:bg-[#152720] transition-all flex items-center justify-center gap-2">
              <ArrowUpRight size={16} className="text-green-400" />
              Explore Platform
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-6 py-2.5 rounded-full text-[14px] font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 transition-all flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                <PlayCircle size={14} className="text-gray-600" />
              </div>
              Login
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main Image Section (Standard Flow) */}
      <div className="relative w-full max-w-[100rem] mx-auto mt-12 flex justify-center items-end">
        
        {/* Floating Left Widget */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hidden lg:flex absolute left-[10%] bottom-[20%] bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl border border-gray-100 items-center gap-3 z-20"
        >
          <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-[#1e362d]">
            <ArrowUpRight size={16} strokeWidth={2.5} />
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
          className="hidden lg:flex absolute right-[10%] bottom-[20%] z-20 group cursor-pointer"
        >
          <div className="w-14 h-14 bg-[#111] rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform duration-300">
             <PlayCircle size={26} strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* The Exact Image */}
        <img 
          src="/image.png" 
          alt="Renewable Energy Landscape" 
          className="w-full max-w-[85%] object-contain"
        />
      </div>

      {/* Partners Ticker */}
      <div className="w-full border-t border-gray-100 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 py-6 flex justify-between items-center overflow-x-auto gap-12 text-[12px] font-semibold text-gray-400 uppercase tracking-[0.2em] no-scrollbar">
          <span className="flex-shrink-0 cursor-default">OVO</span>
          <span className="flex-shrink-0 cursor-default">Bower</span>
          <span className="flex-shrink-0 cursor-default">Umney</span>
          <span className="flex-shrink-0 cursor-default">Vestas</span>
          <span className="flex-shrink-0 cursor-default">NPE</span>
          <span className="flex-shrink-0 cursor-default">Winds</span>
          <span className="flex-shrink-0 cursor-default">Concept</span>
          <span className="flex-shrink-0 cursor-default">SolarC</span>
          <span className="flex-shrink-0 cursor-default">Inverter</span>
          <span className="flex-shrink-0 cursor-default">ARC</span>
        </div>
      </div>
      
    </section>
  );
}
