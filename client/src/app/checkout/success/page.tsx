"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight, Package, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  // Clear cart on successful payment (only once)
  useEffect(() => {
    if (sessionId && !cleared) {
      clearCart();
      setCleared(true);
    }
  }, [sessionId, cleared, clearCart]);

  return (
    <main className="min-h-screen bg-white pt-16 pb-20 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-28 h-28 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-green-100"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}
          >
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          </motion.div>
        </motion.div>

        {/* Confetti sparkles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 mb-6"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">
            Order Confirmed
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-black text-primary mb-4 tracking-tight">
            Thank You for Your <span className="text-accent">Order!</span>
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            Your payment was successful. We&#39;re preparing your authentic spices with love and care. You&#39;ll receive a confirmation email shortly.
          </p>
        </motion.div>

        {/* Order details card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-8 text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-accent" />
            <h3 className="text-sm font-black text-primary uppercase tracking-widest">What Happens Next</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-black text-accent">1</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-primary">Order confirmation email</span> sent to your inbox
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-black text-accent">2</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-primary">We pack your spices</span> with premium care (1-2 business days)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-black text-accent">3</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-primary">Australia Post delivers</span> your order with tracking
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-accent transition-all duration-300 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-3 border-2 border-primary/20 text-primary px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
          >
            My Orders <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Session ID for reference */}
        {sessionId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-[10px] text-gray-300 mt-8 font-mono"
          >
            Reference: {sessionId.slice(0, 20)}...
          </motion.p>
        )}
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
