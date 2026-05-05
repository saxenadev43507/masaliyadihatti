"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Menu, Crown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { checkIsAdmin } from '@/context/AuthContext';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Products', href: '/admin/products', icon: <Package className="w-5 h-5" /> },
  { name: 'Orders', href: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" /> },
  { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Verify admin role from profiles table
        const isAdmin = await checkIsAdmin(session.user.id);
        if (isAdmin) {
          setIsAuthenticated(true);
          setAdminEmail(session.user.email || '');
          localStorage.setItem('masaliya-admin-auth', 'true');
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('masaliya-admin-auth');
        }
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('masaliya-admin-auth');
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [pathname]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('masaliya-admin-auth');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show loading spinner while redirecting unauthenticated users
  if (!isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Masaliya</h1>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-500">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
            return (
              <Link key={link.name} href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-amber-500/20 text-amber-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all mb-1">
            <Crown className="w-5 h-5" /> View Store
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {sidebarLinks.find(l => pathname === l.href || (l.href !== '/admin' && pathname.startsWith(l.href)))?.name || 'Dashboard'}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-400 hidden sm:block">{adminEmail}</span>
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-black">{adminEmail ? adminEmail.charAt(0).toUpperCase() : 'A'}</div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
