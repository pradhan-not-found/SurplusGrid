import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, Navigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: LayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  if (!user.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  // Prevent cross-role access
  const isProducerPath = location.pathname.includes('/dashboard/producer');
  const isConsumerPath = location.pathname.includes('/dashboard/consumer');
  if (user.role === 'producer' && isConsumerPath) {
    return <Navigate to="/dashboard/producer" replace />;
  }
  if (user.role === 'consumer' && isProducerPath) {
    return <Navigate to="/dashboard/consumer" replace />;
  }

  const producerLinks = [
    { label: 'Overview', path: '/dashboard/producer' },
    { label: 'Surplus Windows', path: '/dashboard/producer/windows' },
    { label: 'Matches', path: '/dashboard/producer/matches' },
    { label: 'Settings', path: '/dashboard/producer/settings' },
  ];

  const consumerLinks = [
    { label: 'Overview', path: '/dashboard/consumer' },
    { label: 'Energy Alerts', path: '/dashboard/consumer/alerts' },
    { label: 'Load Schedule', path: '/dashboard/consumer/schedule' },
    { label: 'Savings', path: '/dashboard/consumer/savings' },
    { label: 'Settings', path: '/dashboard/consumer/settings' },
  ];

  const links = user.role === 'producer' ? producerLinks : consumerLinks;

  return (
    <div className="flex min-h-screen bg-gray-50 font-body">
      {/* Sidebar */}
      <aside className="w-[220px] bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="font-display font-bold text-xl">SurplusGrid</div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">
            {user.role}
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block p-2 rounded ${isActive ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="text-sm font-bold truncate">{user.name}</div>
          <div className="text-xs text-gray-500 truncate mb-3">{user.email}</div>
          <button 
            onClick={logout}
            className="w-full text-left text-sm text-red-600 hover:text-red-700"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <h1 className="font-display font-bold text-xl">{title}</h1>
          <div className="relative">
            <button className="p-2 border border-gray-200 rounded">
              🔔 <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
          </div>
        </header>
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
