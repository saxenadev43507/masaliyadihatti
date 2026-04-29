"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('masaliya-admin-auth', 'true');
      router.push('/admin');
    } else {
      setError('Invalid password. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Masaliya Admin</h1>
          <p className="text-gray-500 text-sm">Enter your password to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="mb-6">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Admin Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                placeholder="Enter password"
                autoFocus
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
            Sign In
          </button>

          <p className="text-center text-gray-600 text-xs mt-6">Default password: admin123</p>
        </form>
      </div>
    </div>
  );
}
