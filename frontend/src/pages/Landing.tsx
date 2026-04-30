import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import LandingDetails from '../components/landing/LandingDetails';

export default function Landing() {
  return (
    <div className="bg-white text-gray-900 font-body min-h-screen selection:bg-green-500 selection:text-white">
      <Navbar />
      <Hero />
      <LandingDetails />
    </div>
  );
}
