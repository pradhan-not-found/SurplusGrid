import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();

  if (user) {
    if (!user.onboardingComplete) return <Navigate to="/onboarding" />;
    return <Navigate to={user.role === 'producer' ? '/dashboard/producer' : '/dashboard/consumer'} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password required');
      return;
    }
    login(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-body">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-gray-200">
        <h1 className="text-2xl font-display font-bold mb-6 text-center">Sign In</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 p-2 rounded"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 p-2 rounded"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded font-bold">
            Sign in
          </button>
        </form>
        <div className="mt-6 flex flex-col space-y-2 text-center text-sm">
          <Link to="/signup" className="text-gray-500 hover:underline">Don't have an account? Sign up</Link>
          <button className="text-gray-500 hover:underline" onClick={() => alert('Password reset coming soon')}>Forgot password?</button>
        </div>
      </div>
    </div>
  );
}
