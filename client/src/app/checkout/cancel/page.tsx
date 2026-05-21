"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-white pt-16 pb-20 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        {/* Cancel icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-gray-100"
        >
          <XCircle className="w-12 h-12 text-gray-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-gray-400 font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">
            Payment Cancelled
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-black text-primary mb-4 tracking-tight">
            Order <span className="text-accent">Not Completed</span>
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            Your payment was cancelled and you have not been charged. Don&#39;t worry — your cart is still saved and ready when you are.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/cart"
            className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-accent transition-all duration-300 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" /> Return to Cart
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-3 border-2 border-primary/20 text-primary px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Shop
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
