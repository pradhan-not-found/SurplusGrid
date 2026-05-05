import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/* ── Professional inline SVG icons — 1.4px stroke, 16×16 canvas ── */
const IconBolt = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2 L4 9h4.5L6.5 14 L13 7H8.5Z" />
  </svg>
);

const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 1.5 L13.5 4v4c0 3-2.5 5.2-5.5 6C3 13.2.5 11 .5 8V4Z" />
    <polyline points="5.5,8 7.2,9.8 10.5,6.2" />
  </svg>
);

const IconChart = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1.5,11.5 5.5,7 9,9.5 14.5,3.5" />
    <polyline points="11.5,3.5 14.5,3.5 14.5,6.5" />
  </svg>
);

const IconLeaf = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.5 2.5 C13.5 2.5 13 9 8 10.5 C4.5 11.5 2.5 14 2.5 14" />
    <path d="M13.5 2.5 C13.5 2.5 7 2 4.5 6.5 C3 9.5 3.5 12 3.5 12" />
  </svg>
);

const IconNetwork = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8"   cy="8"  r="1.5" />
    <circle cx="2.5" cy="4"  r="1.5" />
    <circle cx="13.5" cy="4"  r="1.5" />
    <circle cx="2.5" cy="12" r="1.5" />
    <circle cx="13.5" cy="12" r="1.5" />
    <line x1="8" y1="6.5" x2="4"  y2="5" />
    <line x1="8" y1="6.5" x2="12" y2="5" />
    <line x1="8" y1="9.5" x2="4"  y2="11" />
    <line x1="8" y1="9.5" x2="12" y2="11" />
  </svg>
);

const TICKER_ITEMS = [
  { Icon: IconBolt,    text: 'Real-time surplus matching',    color: 'text-blue-600',    border: 'border-blue-200',    bg: 'bg-blue-50'    },
  { Icon: IconShield,  text: 'SLDC-compliant reporting',      color: 'text-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50' },
  { Icon: IconChart,   text: '₹4.0/kW average surplus rate', color: 'text-violet-600',  border: 'border-violet-200',  bg: 'bg-violet-50'  },
  { Icon: IconLeaf,    text: '12,400+ tonnes CO₂ offset',    color: 'text-green-600',   border: 'border-green-200',   bg: 'bg-green-50'   },
  { Icon: IconNetwork, text: '450+ industrial operators',     color: 'text-orange-600',  border: 'border-orange-200',  bg: 'bg-orange-50'  },
];

function CyclingBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % TICKER_ITEMS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const item = TICKER_ITEMS[index];

  return (
    <div
      className={`mt-24 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${item.border} ${item.bg} overflow-hidden`}
      style={{ minWidth: 230, justifyContent: 'center' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className={`flex items-center gap-2 text-[12px] font-semibold ${item.color} whitespace-nowrap`}
        >
          <item.Icon />
          {item.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

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
      >
        <CyclingBadge />
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
