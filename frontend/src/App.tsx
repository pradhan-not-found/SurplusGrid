import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          <Route path="/dashboard/producer" element={<ProducerOverview />} />
          <Route path="/dashboard/producer/windows" element={<ProducerWindows />} />
          <Route path="/dashboard/producer/matches" element={<ProducerMatches />} />
          <Route path="/dashboard/producer/settings" element={<ProducerSettings />} />

          <Route path="/dashboard/consumer" element={<ConsumerOverview />} />
          <Route path="/dashboard/consumer/alerts" element={<ConsumerAlerts />} />
          <Route path="/dashboard/consumer/schedule" element={<ConsumerSchedule />} />
          <Route path="/dashboard/consumer/savings" element={<ConsumerSavings />} />
          <Route path="/dashboard/consumer/settings" element={<ConsumerSettings />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
