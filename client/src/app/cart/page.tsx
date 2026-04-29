"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-32 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-3xl font-serif font-black text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven&#39;t added any spices to your cart yet. Explore our collection and find the perfect blends for your kitchen.</p>
          <Link href="/shop" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-accent transition-all duration-300 shadow-lg">
            <ShoppingBag className="w-4 h-4" /> Browse Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-2 block">Your Selection</span>
          <h1 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">
            Shopping <span className="text-accent">Cart</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-accent/20 transition-all"
                >
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em]">{item.brand}</span>
                    <h3 className="text-lg font-bold text-primary truncate">{item.title}</h3>
                    <span className="text-sm font-bold text-gray-500">{item.price}</span>
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50"><Minus className="w-3 h-3" /></button>
                    <span className="w-9 h-9 flex items-center justify-center font-bold text-sm border-x border-gray-200">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="text-right w-24">
                    <span className="text-lg font-black text-primary">
                      ${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="flex justify-between items-center pt-4">
              <Link href="/shop" className="text-sm font-bold text-gray-500 hover:text-accent transition-colors uppercase tracking-widest">&larr; Continue Shopping</Link>
              <button onClick={clearCart} className="text-sm font-bold text-red-400 hover:text-red-500 transition-colors uppercase tracking-widest">Clear Cart</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-28">
              <h3 className="text-lg font-serif font-black text-primary mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-primary">${totalPrice.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="font-bold text-primary">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)} AUD`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-accent font-bold">Add ${(50 - totalPrice).toFixed(2)} more for free shipping!</p>
                )}
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold text-primary">Total</span>
                  <span className="text-2xl font-black text-primary">${grandTotal.toFixed(2)} AUD</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-accent transition-all duration-300 shadow-lg active:scale-[0.98] mb-4">
                <span className="text-sm font-black uppercase tracking-widest">Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-4 pt-4 text-gray-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 text-gray-400">
                <Truck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Free shipping over $50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
