import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.email.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    // NOTE: This is a placeholder sign-in for local testing only.
    // Replace with real authentication (Firebase Auth, your own backend, etc.)
    const user = {
      uid: `local-${Date.now()}`,
      username: form.username,
      email: form.email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-emerald-800 mb-6 text-center">Sign In</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Your name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
