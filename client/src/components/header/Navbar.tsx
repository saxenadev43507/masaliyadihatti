"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  Menu,
  PhoneCall,
  Mail,
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

  const userInitial =
    user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    'U';
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
      <div style={{ height: 'var(--navbar-height)' }} className="w-full" />

      <header
        className={`fixed top-0 left-0 w-full z-[100] transform-gpu backface-visibility-hidden transition-all duration-500 ease-in-out ${
          isScrolled ? 'shadow-2xl shadow-primary/10' : ''
        }`}
      >
        {/* ── TOP INFO BAR ── */}
        <div
          className={`bg-primary text-white border-b border-white/10 transition-all duration-500 ease-in-out overflow-hidden transform-gpu ${
            isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 h-10 w-full flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-4 text-white/70">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3 text-accent" />
                <span className="hidden xs:inline">+61 400 000 000</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-accent" />
                admin@masaliyadihatti.com.au
              </span>
            </div>

            <div className="flex-1 text-center whitespace-nowrap overflow-hidden hidden lg:block text-accent/90">
              <span className="inline-block animate-marquee px-4">
                🚀 Free Delivery for Orders above $99 across Australia &nbsp;|&nbsp;
                🌿 100% Pure Premium Indian Spices &nbsp;|&nbsp; ✨ Luxury Of
                Spices Since 1928 &nbsp;|&nbsp; 📦 Fast Dispatch — Order Before
                3pm for Same Day Shipping
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/wholesale"
                className="text-white/70 hover:text-accent transition-colors hidden sm:inline-block"
              >
                Wholesale Enquiry
              </Link>
              <Link
                href="/wholesale"
                className="text-white/70 hover:text-accent transition-colors sm:hidden"
              >
                Wholesale
              </Link>
            </div>
          </div>
        </div>

        {/* ── MAIN LOGO + SEARCH + ICONS ROW ── */}
        <div
          className={`bg-background border-b border-primary/10 transition-all duration-500 ease-in-out transform-gpu ${
            isScrolled ? 'py-3' : 'py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center gap-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex flex-col group">
                  <h1
                    className={`font-serif font-black text-primary leading-none transition-all duration-500 ${
                      isScrolled ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
                    }`}
                  >
                    Masaliya Di Hatti
                  </h1>
                  {!isScrolled && (
                    <span className="text-[9px] uppercase tracking-[0.45em] text-accent font-bold mt-1">
                      Luxury Of Spices
                    </span>
                  )}
                </Link>
              </div>

              {/* Search bar (desktop) */}
              <div className="hidden lg:block flex-1 max-w-2xl">
                <SearchBar />
              </div>

              {/* Icons */}
              <div className="flex items-center gap-5">
                {user ? (
                  <Link
                    href="/account"
                    className="hidden sm:flex items-center gap-2 group transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
                      {userInitial}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-primary/50 font-bold uppercase tracking-wider">
                        Welcome
                      </span>
                      <span className="text-sm font-bold text-primary truncate max-w-[100px]">
                        {userName}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="hidden sm:flex items-center gap-2 group transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <User className="w-5 h-5 text-primary/70 group-hover:text-accent" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-primary/50 font-bold uppercase tracking-wider">
                        Sign In
                      </span>
                      <span className="text-sm font-bold text-primary">My Account</span>
                    </div>
                  </button>
                )}

                <Link href="/cart" className="relative group flex items-center gap-2" title="Cart">
                  <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <ShoppingBag className="w-5 h-5 text-primary/70 group-hover:text-accent" />
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {totalItems}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 text-primary"
                >
                  <Menu className="w-7 h-7" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── MEGA MENU BAR (desktop only) ── */}
        <div
          className={`hidden lg:block bg-primary transition-all duration-500 ease-in-out transform-gpu ${
            isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-14 opacity-100 overflow-visible'
          }`}
        >
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
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .backface-visibility-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </>
  );
}