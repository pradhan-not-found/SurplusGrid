import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();

  if (user) {
    if (!user.onboardingComplete) return <Navigate to="/onboarding" />;
    return <Navigate to={user.role === 'producer' ? '/dashboard/producer' : '/dashboard/consumer'} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) {
      setError('All fields are required');
      return;
    }
    if (password.length < 8) {
      setError('Password min 8 chars');
      return;
    }
    if (password !== confirm) {
      setError('Passwords must match');
      return;
    }
    login(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-body">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-gray-200">
        <h1 className="text-2xl font-display font-bold mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Full name</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input type="password" className="w-full border border-gray-300 p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Confirm password</label>
            <input type="password" className="w-full border border-gray-300 p-2 rounded" value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded font-bold">
            Create account
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link to="/signin" className="text-gray-500 hover:underline">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}
