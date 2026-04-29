import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import LandingDetails from '../components/landing/LandingDetails';

export default function Landing() {
  return (
    <div className="bg-bg-deep text-text-primary font-body selection:bg-accent-primary selection:text-white min-h-screen">
      <Navbar />
      <Hero />
      <LandingDetails />
    </div>
  );
}
