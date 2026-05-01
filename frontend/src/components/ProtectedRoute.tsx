import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#09090B]" size={32} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (profile && !profile.onboarding_complete) {
    return <Navigate to="/onboarding" replace />;
  }

  if (profile && profile.onboarding_complete) {
    const isProducerRoute = location.pathname.startsWith('/dashboard/producer');
    const isConsumerRoute = location.pathname.startsWith('/dashboard/consumer');

    if (profile.role === 'producer' && isConsumerRoute) {
      return <Navigate to="/dashboard/producer" replace />;
    }

    if (profile.role === 'consumer' && isProducerRoute) {
      return <Navigate to="/dashboard/consumer" replace />;
    }
  }

  return children;
}
