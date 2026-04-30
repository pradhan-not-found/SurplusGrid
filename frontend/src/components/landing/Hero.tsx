import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative bg-white flex flex-col items-center"
      style={{ minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* ── BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-24 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-300 bg-white text-[11px] font-semibold text-orange-600"
      >
        <Trophy size={12} className="text-yellow-500" />
        <span className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">NASSCOM</span>
        <span className="text-orange-600 font-bold">#1 CleanTech Startup</span>
      </motion.div>

      {/* ── HEADING ── */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="mt-5 text-center font-display font-bold text-blue-600 leading-[1.1] tracking-tight px-4"
        style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.8rem)' }}
      >
        The smarter energy<br />
        grid{' '}
        <span
          className="relative inline-block"
          style={{
            border: '1.5px dashed #94a3b8',
            borderRadius: '4px',
            padding: '0 6px 2px 6px',
            color: '#94a3b8',
          }}
        >
          exchange.
          <span style={{ position:'absolute', top:'-4px', left:'-4px',  width:'6px', height:'6px', background:'#fff', border:'1.5px solid #94a3b8', borderRadius:'1px' }} />
          <span style={{ position:'absolute', top:'-4px', right:'-4px', width:'6px', height:'6px', background:'#fff', border:'1.5px solid #94a3b8', borderRadius:'1px' }} />
          <span style={{ position:'absolute', bottom:'-4px', left:'-4px',  width:'6px', height:'6px', background:'#fff', border:'1.5px solid #94a3b8', borderRadius:'1px' }} />
          <span style={{ position:'absolute', bottom:'-4px', right:'-4px', width:'6px', height:'6px', background:'#fff', border:'1.5px solid #94a3b8', borderRadius:'1px' }} />
        </span>
      </motion.h1>

      {/* ── SUBTITLE ── */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18 }}
        className="mt-4 text-center text-gray-500 leading-relaxed px-6 text-base"
        style={{ maxWidth: '420px' }}
      >
        SurplusGrid connects solar &amp; wind producers with flexible industrial demand
        in real time. Reduce curtailment, cut costs — all in one platform.
      </motion.p>

      {/* ── GLOBE WRAPPER — fade out at bottom ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full flex justify-center mt-10"
      >
        {/* Globe image */}
        <img
          src="/globe.png"
          alt="SurplusGrid Energy Network"
          draggable={false}
          className="select-none w-full"
          style={{
            maxWidth: '820px',
            objectFit: 'contain',
          }}
        />

        {/* ── Professional bottom fade — white gradient over globe ── */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '45%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.92) 70%, #ffffff 100%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

    </section>
  );
}
