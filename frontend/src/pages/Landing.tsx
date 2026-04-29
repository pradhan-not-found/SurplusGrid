import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import MatchDemo from '../components/landing/MatchDemo';
import Footer from '../components/landing/Footer';

export default function Landing() {
  return (
    <div className="bg-[#f9fafb] text-[#111827] font-sans selection:bg-green-500 selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <MatchDemo />
      <Footer />
    </div>
  );
}
