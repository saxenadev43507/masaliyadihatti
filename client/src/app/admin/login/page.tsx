"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Eye, EyeOff, Lock, Mail, Loader2, ShieldAlert } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { checkIsAdmin } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Step 1: Authenticate with Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      // Step 2: Check if user has admin role
      if (!data.user) {
        setError('Authentication failed.');
        setLoading(false);
        return;
      }

      const isAdmin = await checkIsAdmin(data.user.id);

      if (!isAdmin) {
        // Sign them out immediately - they're not admin
        await supabase.auth.signOut();
        setError('Access denied. This account is not authorized as admin.');
        setLoading(false);
        return;
      }

      // Step 3: Grant admin access
      localStorage.setItem('masaliya-admin-auth', 'true');
      router.push('/admin');
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
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
          <p className="text-gray-500 text-sm">Admin access only — regular users cannot login here</p>
        </div>

        <form onSubmit={handleLogin} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl space-y-5">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                placeholder="admin@masaliyadihatti.com"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                placeholder="Enter password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center font-medium flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4" /> {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : 'Sign In as Admin'}
          </button>

          <div className="flex items-center gap-2 justify-center pt-2">
            <ShieldAlert className="w-3 h-3 text-gray-600" />
            <p className="text-center text-gray-600 text-xs">
              Only authorized admin accounts can access this panel
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
