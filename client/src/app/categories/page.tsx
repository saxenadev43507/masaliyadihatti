"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Wind, Zap, Crown, Utensils, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const spiceTypes = [
  { name: "Whole Spices", slug: "whole", icon: <Flame className="w-6 h-6" />, desc: "Unground seeds, pods, and bark for tempering and slow cooking", color: "from-red-500/10 to-orange-500/10", borderColor: "border-red-200", count: 0 },
  { name: "Ground Spices", slug: "ground", icon: <Wind className="w-6 h-6" />, desc: "Finely milled powders for marinades, curries, and everyday use", color: "from-amber-500/10 to-yellow-500/10", borderColor: "border-amber-200", count: 0 },
  { name: "Blended Masalas", slug: "blended", icon: <Zap className="w-6 h-6" />, desc: "Expertly crafted spice mixes for specific dishes and cuisines", color: "from-emerald-500/10 to-teal-500/10", borderColor: "border-emerald-200", count: 0 },
  { name: "Premium Non-Veg", slug: "nonveg", icon: <Utensils className="w-6 h-6" />, desc: "Signature blends for meat, poultry, and seafood dishes", color: "from-purple-500/10 to-pink-500/10", borderColor: "border-purple-200", count: 0 },
];

const cuisineStyles = [
  { name: "Punjabi Cuisine", desc: "Rich, buttery flavors of North India", image: "🍛" },
  { name: "Mughlai Royal", desc: "Aromatic heritage from the royal kitchens", image: "👑" },
  { name: "Lucknow Awadhi", desc: "Slow-cooked Nawabi delicacies", image: "🏰" },
  { name: "South Indian", desc: "Tangy, coconut-infused coastal flavors", image: "🌴" },
  { name: "Gujarati", desc: "Sweet and savory balanced spice blends", image: "🍯" },
  { name: "Kashmiri", desc: "Mild, vibrant, saffron-infused specialties", image: "🌸" },
];

const specialCollections = [
  { name: "Best Sellers", desc: "Most loved by our customers", href: "/shop?category=Best+Sellers", icon: <Sparkles className="w-5 h-5" /> },
  { name: "New Arrivals", desc: "Latest additions to our collection", href: "/shop?category=New+Arrivals", icon: <Zap className="w-5 h-5" /> },
  { name: "Combo Packs", desc: "Curated spice kits for complete meals", href: "/shop?category=Combo+Packs", icon: <Crown className="w-5 h-5" /> },
  { name: "Premium Churan", desc: "After-food digestive delicacies", href: "/shop", icon: <Flame className="w-5 h-5" /> },
];

export default function CategoriesPage() {
  const bestSellers = useMemo(() => allProducts.filter(p => p.category === "Best Sellers").slice(0, 4), []);
  const { addToCart } = useCart();
  const { user, setShowAuthModal } = useAuth();

  const handleAddToCart = (p: { id: number; title: string; brand: string; price: string; image: string }) => {
    if (!user) { setShowAuthModal(true); return; }
    addToCart(p);
  };

  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 mb-16">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">Explore Our Range</span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-primary mb-6 tracking-tight">
              Spice <span className="text-accent">Categories</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              From whole spices to expertly blended masalas, explore our curated collections of authentic Indian flavors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Spice Types Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">By Type</span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">Spice <span className="text-accent">Types</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spiceTypes.map((type, i) => (
            <motion.div key={type.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i }}>
              <Link href="/shop" className={`group block p-8 rounded-3xl bg-gradient-to-br ${type.color} border ${type.borderColor} hover:shadow-xl hover:scale-[1.02] transition-all duration-500`}>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{type.name}</h3>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{type.desc}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cuisine Styles */}
      <section className="bg-gray-50 py-20 mb-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">By Cuisine</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">Regional <span className="text-accent">Flavors</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuisineStyles.map((style, i) => (
              <motion.div key={style.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 * i }}>
                <Link href="/shop" className="group block p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-500 text-center">
                  <div className="text-5xl mb-4">{style.image}</div>
                  <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors">{style.name}</h3>
                  <p className="text-gray-500 text-sm">{style.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Collections */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">Curated For You</span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">Special <span className="text-accent">Collections</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialCollections.map((col, i) => (
            <motion.div key={col.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i }}>
              <Link href={col.href} className="group flex flex-col items-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-accent/20 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {col.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors">{col.name}</h3>
                <p className="text-gray-500 text-xs text-center">{col.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Best Sellers */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-2 block">Top Picks</span>
            <h2 className="text-3xl font-serif font-black text-primary tracking-tight">Best <span className="text-accent">Sellers</span></h2>
          </div>
          <Link href="/shop?category=Best+Sellers" className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest hover:underline underline-offset-4">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map(p => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <ProductCard title={p.title} brand={p.brand} price={p.price} rating={p.rating} tags={p.tags} productImage={p.image} overlayText={p.desc} onAddToCart={() => handleAddToCart({ id: p.id, title: p.title, brand: p.brand, price: p.price, image: p.image })} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
