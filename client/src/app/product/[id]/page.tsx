"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ShieldCheck, ChevronRight, Minus, Plus, Truck, RotateCcw, Award } from 'lucide-react';
import { allProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = allProducts.find(p => p.id === productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts.filter(p => p.id !== product.id && p.brand === product.brand).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-white pt-16 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-black text-primary mb-4">Product Not Found</h1>
          <Link href="/shop" className="bg-accent text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: product.id, title: product.title, brand: product.brand, price: product.price, image: product.image });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{product.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-accent" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Pure Heritage</span>
                </div>
              </div>
              <img src={product.image} alt={product.title} className="w-full h-[400px] object-contain mix-blend-multiply" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col justify-center">
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2">{product.brand}</span>
            <h1 className="text-3xl md:text-4xl font-serif font-black text-primary mb-4 tracking-tight">{product.title}</h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-400">{product.rating} / 5.0</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">{product.desc}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-black uppercase tracking-tighter bg-accent/10 text-accent px-3 py-1.5 rounded-lg border border-accent/20">{tag}</span>
              ))}
            </div>
            <div className="text-4xl font-black text-primary mb-8">{product.price}</div>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
                <span className="w-12 h-12 flex items-center justify-center font-bold text-lg border-x border-gray-200">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAddToCart} className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg active:scale-[0.98] ${addedToCart ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-accent'}`}>
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-black uppercase tracking-widest">{addedToCart ? 'Added!' : 'Add to Cart'}</span>
              </button>
              <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all"><Heart className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-500"><Truck className="w-4 h-4 text-accent" /><span className="text-xs font-bold">Free Shipping</span></div>
              <div className="flex items-center gap-2 text-gray-500"><RotateCcw className="w-4 h-4 text-accent" /><span className="text-xs font-bold">Easy Returns</span></div>
              <div className="flex items-center gap-2 text-gray-500"><Award className="w-4 h-4 text-accent" /><span className="text-xs font-bold">FSSAI Certified</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">You Might Also Like</span>
            <h2 className="text-3xl font-serif font-black text-primary tracking-tight">Related <span className="text-accent">Products</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <ProductCard title={p.title} brand={p.brand} price={p.price} rating={p.rating} tags={p.tags} productImage={p.image} overlayText={p.desc} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
