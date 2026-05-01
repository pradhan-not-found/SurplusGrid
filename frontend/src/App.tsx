import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Onboarding from './pages/auth/Onboarding';

import ProducerOverview from './pages/producer/ProducerOverview';
import ProducerWindows from './pages/producer/ProducerWindows';
import ProducerMatches from './pages/producer/ProducerMatches';
import ProducerSettings from './pages/producer/ProducerSettings';

import ConsumerOverview from './pages/consumer/ConsumerOverview';
import ConsumerAlerts from './pages/consumer/ConsumerAlerts';
import ConsumerSchedule from './pages/consumer/ConsumerSchedule';
import ConsumerSavings from './pages/consumer/ConsumerSavings';
import ConsumerSettings from './pages/consumer/ConsumerSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/producer" element={
          <ProtectedRoute>
            <ProducerOverview />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/producer/windows" element={
          <ProtectedRoute>
            <ProducerWindows />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/producer/matches" element={
          <ProtectedRoute>
            <ProducerMatches />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/producer/settings" element={
          <ProtectedRoute>
            <ProducerSettings />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/consumer" element={
          <ProtectedRoute>
            <ConsumerOverview />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/consumer/alerts" element={
          <ProtectedRoute>
            <ConsumerAlerts />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/consumer/schedule" element={
          <ProtectedRoute>
            <ConsumerSchedule />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/consumer/savings" element={
          <ProtectedRoute>
            <ConsumerSavings />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/consumer/settings" element={
          <ProtectedRoute>
            <ConsumerSettings />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
