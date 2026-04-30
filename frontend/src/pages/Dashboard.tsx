import { useState } from 'react';
import ProducerDashboard from './ProducerDashboard';
import ConsumerDashboard from './ConsumerDashboard';
import { Leaf, Factory, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [role, setRole] = useState<'producer' | 'consumer'>('producer');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-teal-500 selection:text-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/30">
                  S
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-900">
                  SurplusGrid
                </span>
              </div>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setRole('producer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  role === 'producer'
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Leaf size={16} />
                Producer
              </button>
              <button
                onClick={() => setRole('consumer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  role === 'consumer'
                    ? 'bg-white text-fuchsia-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Factory size={16} />
                Consumer
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {role === 'producer' ? <ProducerDashboard /> : <ConsumerDashboard />}
      </main>
    </div>
  );
}
