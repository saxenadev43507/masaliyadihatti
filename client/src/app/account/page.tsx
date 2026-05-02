"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Shield, ShoppingBag, LogOut, Crown, MapPin, Clock, Settings, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { user, isLoading, signOut, setShowAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      setShowAuthModal(true);
      router.push('/');
    }
  }, [isLoading, user, setShowAuthModal, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white pt-16 pb-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) return null;

  const userName = user.user_metadata?.full_name || 'Spice Enthusiast';
  const userEmail = user.email || '';
  const userInitial = userName.charAt(0).toUpperCase();
  const joinDate = new Date(user.created_at).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const menuItems = [
    { icon: <ShoppingBag className="w-5 h-5" />, label: "Order History", desc: "View your past orders", href: "#", color: "bg-blue-500" },
    { icon: <MapPin className="w-5 h-5" />, label: "Saved Addresses", desc: "Manage delivery addresses", href: "#", color: "bg-green-500" },
    { icon: <Shield className="w-5 h-5" />, label: "Privacy & Security", desc: "Manage your account security", href: "#", color: "bg-purple-500" },
    { icon: <Settings className="w-5 h-5" />, label: "Preferences", desc: "Notifications & display settings", href: "#", color: "bg-amber-500" },
  ];

  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      {/* Profile Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-gray-900 to-primary py-16 mb-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-accent rounded-full blur-[150px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-accent/30">
              {userInitial}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-serif font-black text-white mb-1">{userName}</h1>
              <p className="text-gray-400 text-sm font-medium flex items-center gap-2 justify-center sm:justify-start">
                <Mail className="w-3.5 h-3.5" /> {userEmail}
              </p>
              <p className="text-gray-500 text-xs mt-2 flex items-center gap-2 justify-center sm:justify-start">
                <Clock className="w-3 h-3" /> Member since {joinDate}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">Premium Member</h3>
                <p className="text-sm text-gray-500">Enjoy exclusive deals and early access</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">0 Orders</h3>
                <p className="text-sm text-gray-500">Start shopping to see your orders here</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-10">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Account Settings</h2>
          {menuItems.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 * i }}>
              <Link href={item.href} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg hover:border-accent/20 transition-all duration-300 group">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">{item.label}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Logout */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-500 font-bold text-sm uppercase tracking-widest hover:bg-red-100 transition-all"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </motion.div>

        {/* Admin Link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="text-center mt-6">
          <Link href="/admin/login" className="text-xs text-gray-400 hover:text-accent font-bold uppercase tracking-widest transition-colors">
            Admin Dashboard →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
