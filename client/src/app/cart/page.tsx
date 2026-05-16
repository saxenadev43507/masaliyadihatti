"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, MapPin, Package, Loader2, Weight, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ShippingOption {
  code: string;
  name: string;
  price: number;
  deliveryTime: string;
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, totalWeight } = useCart();

  // Shipping state
  const [postcode, setPostcode] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);

  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const grandTotal = totalPrice + shippingCost;

  const calculateShipping = useCallback(async () => {
    if (!postcode || !/^\d{4}$/.test(postcode)) {
      setShippingError('Please enter a valid 4-digit Australian postcode');
      return;
    }

    setShippingLoading(true);
    setShippingError('');
    setShippingOptions([]);
    setSelectedShipping(null);
    setShippingCalculated(false);

    try {
      const response = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toPostcode: postcode,
          weight: Math.max(totalWeight, 0.1), // minimum 0.1 kg
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setShippingError(data.error || 'Unable to calculate shipping. Please try again.');
        return;
      }

      if (data.services && data.services.length > 0) {
        setShippingOptions(data.services);
        setSelectedShipping(data.services[0]); // Auto-select cheapest
        setShippingCalculated(true);
      } else {
        setShippingError('No shipping services available for this postcode.');
      }
    } catch {
      setShippingError('Network error. Please check your connection and try again.');
    } finally {
      setShippingLoading(false);
    }
  }, [postcode, totalWeight]);

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
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-bold text-gray-500">{item.price}</span>
                      <span className="text-[10px] text-gray-400 font-medium">• {((item.weight || 0.1) * 1000).toFixed(0)}g</span>
                    </div>
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

                {/* Weight indicator */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium flex items-center gap-1.5">
                    <Weight className="w-3.5 h-3.5" />
                    Total Weight
                  </span>
                  <span className="font-bold text-primary">{totalWeight.toFixed(2)} kg</span>
                </div>

                {/* ─── SHIPPING CALCULATOR ─── */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-accent" />
                    <span className="text-sm font-black text-primary uppercase tracking-wider">Delivery Estimate</span>
                  </div>

                  {/* Postcode Input */}
                  <div className="flex gap-2 mb-3">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="Postcode"
                        value={postcode}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setPostcode(val);
                          if (shippingCalculated) {
                            setShippingCalculated(false);
                            setShippingOptions([]);
                            setSelectedShipping(null);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') calculateShipping();
                        }}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-gray-300"
                      />
                    </div>
                    <button
                      onClick={calculateShipping}
                      disabled={shippingLoading || !postcode}
                      className="px-4 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 whitespace-nowrap"
                    >
                      {shippingLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Truck className="w-3.5 h-3.5" />
                      )}
                      {shippingLoading ? 'Checking...' : 'Calculate'}
                    </button>
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {shippingError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3 mb-3">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-red-500 font-medium">{shippingError}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Shipping Options */}
                  <AnimatePresence>
                    {shippingOptions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden space-y-2"
                      >
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                          Shipping to {postcode} • via Australia Post
                        </p>
                        {shippingOptions.map((option) => (
                          <label
                            key={option.code}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              selectedShipping?.code === option.code
                                ? 'bg-accent/5 border-accent/30 ring-1 ring-accent/20'
                                : 'bg-white border-gray-200 hover:border-accent/20'
                            }`}
                          >
                            <input
                              type="radio"
                              name="shipping"
                              checked={selectedShipping?.code === option.code}
                              onChange={() => setSelectedShipping(option)}
                              className="w-3.5 h-3.5 accent-accent"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-primary">{option.name}</span>
                                <span className="text-sm font-black text-primary">${option.price.toFixed(2)}</span>
                              </div>
                              <p className="text-[10px] text-gray-400 font-medium mt-0.5">{option.deliveryTime}</p>
                            </div>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* No shipping selected notice */}
                  {!shippingCalculated && !shippingLoading && (
                    <p className="text-[10px] text-gray-400 font-medium italic">
                      Enter your postcode to see shipping rates from Australia Post
                    </p>
                  )}
                </div>

                {/* Shipping cost line */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="font-bold text-primary">
                    {shippingCalculated && selectedShipping
                      ? `$${shippingCost.toFixed(2)} AUD`
                      : '—'}
                  </span>
                </div>

                {/* Grand Total */}
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold text-primary">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-primary">${grandTotal.toFixed(2)} AUD</span>
                    {!shippingCalculated && (
                      <p className="text-[10px] text-gray-400 font-medium mt-1">+ shipping</p>
                    )}
                  </div>
                </div>
              </div>

              <button
                disabled={!shippingCalculated || !selectedShipping}
                className="w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-accent transition-all duration-300 shadow-lg active:scale-[0.98] mb-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
              >
                <span className="text-sm font-black uppercase tracking-widest">Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {!shippingCalculated && (
                <p className="text-center text-[10px] text-accent font-bold mb-3">
                  Please calculate shipping before checkout
                </p>
              )}

              <div className="flex items-center justify-center gap-4 pt-4 text-gray-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 text-gray-400">
                <Truck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Australia Post Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
