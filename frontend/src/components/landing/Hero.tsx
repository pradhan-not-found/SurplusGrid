import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-0 overflow-hidden min-h-[90vh] flex flex-col bg-white">
      
      {/* Top Text Content */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full flex-grow flex flex-col items-center text-center mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium mb-8 bg-white/50 backdrop-blur-sm shadow-sm">
            <span className="text-green-500"><Leaf size={14} /></span>
            100% Renewable power source
            <span className="ml-2 text-gray-300">✦</span>
          </div>
          
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] tracking-tight leading-[1.1] mb-6">
            Renewable Power For Tomorrow,<br className="hidden md:block" />
            Infinite Clean Solutions
          </h1>
          
          {/* Subheading */}
          <p className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Sustainable energy solutions engineering, analyzing, and executing solar projects for homes, businesses, and large-scale commercial clients.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium text-white bg-[#2d4a3e] hover:bg-[#1f362b] transition-all shadow-md flex items-center justify-center gap-2">
              <Leaf size={16} />
              Explore Options
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
              <PlayCircle size={16} className="text-gray-400" />
              How it works
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements & Image Section */}
      <div className="relative w-full mt-16 max-w-7xl mx-auto flex-grow flex items-end justify-center">
        
        {/* Floating Left Widget */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hidden md:flex absolute left-8 bottom-32 bg-white/80 backdrop-blur-md border border-white p-3 rounded-2xl shadow-xl items-center gap-3 z-20"
        >
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
            <ArrowUpRight size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Efficiency</p>
            <p className="text-sm font-bold text-gray-900">72% increased</p>
          </div>
        </motion.div>

        {/* Floating Right Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="hidden md:flex absolute right-8 bottom-32 bg-white/80 backdrop-blur-md border border-white p-2 rounded-full shadow-xl items-center gap-3 z-20"
        >
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform">
             <PlayCircle size={24} />
          </div>
        </motion.div>

        {/* Main Illustration Image */}
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <img 
            src="/image.png" 
            alt="Renewable Energy Illustration" 
            className="w-full h-auto object-contain object-bottom drop-shadow-2xl mix-blend-multiply"
          />
        </div>
        
        {/* Soft bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
      </div>

      {/* Partners Ticker */}
      <div className="w-full border-t border-gray-100 py-6 bg-white relative z-30">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center overflow-x-auto gap-8 text-sm font-semibold text-gray-300 uppercase tracking-widest no-scrollbar">
          <span>OVO</span>
          <span>Bower</span>
          <span>Umney</span>
          <span>Vestas</span>
          <span>NPE</span>
          <span>Winds</span>
          <span>Concept</span>
          <span>SolarC</span>
          <span>Inverter</span>
          <span>ARC</span>
        </div>
      </div>
    </section>
  );
}
