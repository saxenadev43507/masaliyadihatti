"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle, Crown, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const switchMode = (newMode: 'signin' | 'signup') => {
    resetForm();
    setMode(newMode);
  };

  const handleClose = () => {
    resetForm();
    setMode('signin');
    setShowAuthModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          setError('Please enter your full name');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        const result = await signUp(email, password, name);
        if (result.error) {
          setError(result.error);
        } else {
          setSuccess('Account created! Check your email to verify, then sign in.');
          setTimeout(() => switchMode('signin'), 3000);
        }
      } else {
        const result = await signIn(email, password);
        if (result.error) {
          setError(result.error);
        }
        // Modal closes automatically via AuthContext onAuthStateChange
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-visible relative pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button - positioned outside the overflow area */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute -top-3 -right-3 z-[10000] w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-br from-primary via-gray-900 to-primary p-8 pb-10 relative overflow-hidden rounded-t-3xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10 text-center">
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/30">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-serif font-black text-white">
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {mode === 'signin'
                  ? 'Sign in to access your spice collection'
                  : 'Join us for the finest spice experience'
                }
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 -mt-4 relative z-10 bg-white rounded-b-3xl">
            {/* Tab Switcher */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error/Success Messages */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm font-medium text-center flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> {success}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (signup only) */}
              {mode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-medium"
                  />
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-medium"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  minLength={6}
                  className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Please wait...</>
                ) : (
                  mode === 'signin' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4">
              {mode === 'signin' ? (
                <>Don&#39;t have an account? <button type="button" onClick={() => switchMode('signup')} className="text-accent font-bold hover:underline">Sign Up</button></>
              ) : (
                <>Already have an account? <button type="button" onClick={() => switchMode('signin')} className="text-accent font-bold hover:underline">Sign In</button></>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
