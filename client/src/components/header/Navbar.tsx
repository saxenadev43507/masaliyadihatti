"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  ShoppingBag, 
  Menu, 
  PhoneCall,
  Clock
} from 'lucide-react';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, setShowAuthModal } = useAuth();

  const userInitial = user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';
  const userName = user?.user_metadata?.full_name || 'My Account';

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 100) {
        setIsScrolled(true);
      } else if (currentScroll < 20) {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div style={{ height: "var(--navbar-height)" }} className="w-full bg-white" />

      <header className={`fixed top-0 left-0 w-full z-[100] transform-gpu backface-visibility-hidden transition-all duration-500 ease-in-out ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className={`bg-white text-accent border-b border-gray-50 transition-all duration-500 ease-in-out overflow-hidden transform-gpu ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
          <div className="max-w-7xl mx-auto px-4 h-10 w-full flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-4 text-gray-500">
              <span className="flex items-center gap-1.5"><PhoneCall className="w-3 h-3 text-accent" /> <span className="hidden xs:inline">+91 11-23456789</span></span>
              <span className="hidden md:flex items-center gap-1.5"><Clock className="w-3 h-3 text-accent" /> 10:00 AM - 8:00 PM</span>
            </div>
            
            <div className="flex-1 text-center whitespace-nowrap overflow-hidden hidden lg:block text-accent">
              <span className="inline-block animate-marquee px-4">
                🚀 Delivery in 2–3 days in Delhi NCR | 🌍 PAN India Shipping Available | ✨ Premium Spices Since 1928
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/wholesale" className="hover:text-primary transition-colors hidden sm:inline-block">Wholesale Enquiry</Link>
              <Link href="/wholesale" className="hover:text-primary transition-colors sm:hidden">Wholesale</Link>
            </div>
          </div>
        </div>

        <div className={`bg-white border-b border-gray-100 transition-all duration-500 ease-in-out transform-gpu ${isScrolled ? 'py-3' : 'py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center gap-8">
              <div className="flex-shrink-0">
                <Link href="/" className="flex flex-col group">
                  <h1 className={`font-serif font-black text-primary leading-none transition-all duration-500 ${isScrolled ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl'}`}>
                    Masaliya
                  </h1>
                  {!isScrolled && (
                    <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mt-1">Since 1928</span>
                  )}
                </Link>
              </div>

              <div className="hidden lg:block flex-1 max-w-2xl">
                <SearchBar />
              </div>

              <div className="flex items-center gap-6">
                {user ? (
                  <Link href="/account" className="hidden sm:flex items-center gap-2 group transition-colors">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
                      {userInitial}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Welcome</span>
                      <span className="text-sm font-bold text-gray-800 truncate max-w-[100px]">{userName}</span>
                    </div>
                  </Link>
                ) : (
                  <button onClick={() => setShowAuthModal(true)} className="hidden sm:flex items-center gap-2 group transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <User className="w-5 h-5 text-gray-700 group-hover:text-accent" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Sign In</span>
                      <span className="text-sm font-bold text-gray-800">My Account</span>
                    </div>
                  </button>
                )}

                <Link href="/cart" className="relative group flex items-center gap-2" title="Cart">
                   <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-accent" />
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {totalItems}
                    </span>
                  </div>
                </Link>

                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 text-gray-800"
                >
                  <Menu className="w-7 h-7" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`hidden lg:block bg-white border-b border-gray-100 transition-all duration-500 ease-in-out transform-gpu ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-14 opacity-100 overflow-visible'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-14">
              <MegaMenu />
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .backface-visibility-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </>
  );
}
