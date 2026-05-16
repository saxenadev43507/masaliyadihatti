"use client";

import React, { useMemo, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, Gift, Sparkles, ArrowRight, Star, Crown, Flame, ShoppingCart, CheckCircle2, Zap } from 'lucide-react';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const bundleDeals = [
  {
    name: "Starter Essentials", slug: "starter", badge: "Most Popular",
    desc: "Perfect for beginners — 5 must-have masalas for everyday Indian cooking.",
    savings: "$8", originalPrice: "$32.99", bundlePrice: "$24.99",
    items: ["Shahi Garam Masala", "Kashmiri Lal Mirch", "Dal Makhani", "Sambar Masala", "Subzi Masala"],
    color: "from-amber-500 to-orange-500", bgLight: "bg-gradient-to-br from-amber-50 to-orange-50", borderColor: "border-amber-200",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    name: "Biryani Master Kit", slug: "biryani", badge: "Chef's Pick",
    desc: "Everything you need to make restaurant-quality biryani at home.",
    savings: "$12", originalPrice: "$45.99", bundlePrice: "$33.99",
    items: ["Yakhni Biryani", "Biryani Rice", "Shahi Garam Masala", "Kashmiri Lal Mirch"],
    color: "from-emerald-500 to-teal-500", bgLight: "bg-gradient-to-br from-emerald-50 to-teal-50", borderColor: "border-emerald-200",
    icon: <Crown className="w-6 h-6" />,
  },
  {
    name: "Non-Veg Lovers", slug: "nonveg", badge: "Best Value",
    desc: "8 premium masalas curated for meat, chicken, and seafood lovers.",
    savings: "$15", originalPrice: "$58.99", bundlePrice: "$43.99",
    items: ["Butter Chicken", "Chicken Tikka", "Mutton Quorma", "Nihari Masala", "Roghan Josh", "Seekh Kabab", "Tandoori Chicken"],
    color: "from-red-500 to-rose-500", bgLight: "bg-gradient-to-br from-red-50 to-rose-50", borderColor: "border-red-200",
    icon: <Flame className="w-6 h-6" />,
  },
  {
    name: "Premium Gift Box", slug: "gift", badge: "Luxury Gift",
    desc: "A luxurious gift box featuring 10 premium spices — perfect for any occasion.",
    savings: "$20", originalPrice: "$79.99", bundlePrice: "$59.99",
    items: ["Shahi Garam Masala", "Butter Chicken", "Roghan Josh", "Dal Makhani", "Biryani Rice", "Tandoori Chicken"],
    color: "from-purple-500 to-indigo-500", bgLight: "bg-gradient-to-br from-purple-50 to-indigo-50", borderColor: "border-purple-200",
    icon: <Gift className="w-6 h-6" />,
  },
  {
    name: "Vegetarian Delight", slug: "veg", badge: "Pure Veg",
    desc: "Complete vegetarian cooking collection with 6 essential blends.",
    savings: "$10", originalPrice: "$38.99", bundlePrice: "$28.99",
    items: ["Punjabi Chole", "Rajma Masala", "PAV BHAJI MASALA", "Dal Makhani", "Shahi Paneer", "Sambar Masala"],
    color: "from-green-500 to-lime-500", bgLight: "bg-gradient-to-br from-green-50 to-lime-50", borderColor: "border-green-200",
    icon: <Package className="w-6 h-6" />,
  },
  {
    name: "Street Food Special", slug: "street", badge: "Fun Pack",
    desc: "Recreate India's famous street food flavors with these iconic blends.",
    savings: "$7", originalPrice: "$28.99", bundlePrice: "$21.99",
    items: ["PAV BHAJI MASALA", "Fruit Chat Masala", "Dahi Bhalla", "Punjabi Chole"],
    color: "from-pink-500 to-fuchsia-500", bgLight: "bg-gradient-to-br from-pink-50 to-fuchsia-50", borderColor: "border-pink-200",
    icon: <Zap className="w-6 h-6" />,
  },
];

const whyBundle = [
  { title: "Save Up to 25%", desc: "Bundles are always cheaper than buying individually", icon: <Star className="w-5 h-5" /> },
  { title: "Curated by Chefs", desc: "Each bundle is designed for specific cuisines", icon: <Crown className="w-5 h-5" /> },
  { title: "Free Shipping", desc: "All bundles over $30 ship free across Australia", icon: <Package className="w-5 h-5" /> },
  { title: "Gift Ready", desc: "Premium packaging makes every bundle a perfect gift", icon: <Gift className="w-5 h-5" /> },
];

function BundlesContent() {
  const searchParams = useSearchParams();
  const activeBundle = searchParams.get('bundle') || 'all';
  const bundleRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { user, setShowAuthModal } = useAuth();
  const featuredProducts = useMemo(() => allProducts.slice(0, 4), []);

  useEffect(() => {
    if (activeBundle !== 'all' && bundleRef.current) {
      setTimeout(() => {
        bundleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [activeBundle]);

  const filteredBundles = useMemo(() => {
    if (activeBundle === 'all') return bundleDeals;
    return bundleDeals.filter(b => b.slug === activeBundle);
  }, [activeBundle]);

  const handleAddToCart = (p: { id: number; title: string; brand: string; price: string; image: string; weight?: number }) => {
    if (!user) { setShowAuthModal(true); return; }
    addToCart(p);
  };

  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-gray-900 to-primary py-24 mb-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">Save More, Spice More</span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-6 tracking-tight">
              Spice <span className="text-accent">Bundles</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Expertly curated spice collections — save up to 25% compared to individual purchases.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bundle Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 mb-12 border-b border-gray-100">
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 overflow-x-auto no-scrollbar pb-1">
          <Link href="/bundles" className={`relative px-6 py-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeBundle === 'all' ? 'text-accent' : 'text-gray-400 hover:text-primary'}`}>
            All Bundles
            {activeBundle === 'all' && <motion.div layoutId="bundleTab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full" />}
          </Link>
          {bundleDeals.map((b) => (
            <Link key={b.slug} href={`/bundles?bundle=${b.slug}`} className={`relative px-6 py-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeBundle === b.slug ? 'text-accent' : 'text-gray-400 hover:text-primary'}`}>
              {b.name}
              {activeBundle === b.slug && <motion.div layoutId="bundleTab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full" />}
            </Link>
          ))}
        </div>
      </section>

      {/* Why Bundles (only show when all) */}
      {activeBundle === 'all' && (
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBundle.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i }}
                className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">{item.icon}</div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Bundle Cards */}
      <section ref={bundleRef} className="max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center mb-14">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">
            {activeBundle === 'all' ? 'Choose Your Bundle' : 'Bundle Details'}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">
            {activeBundle === 'all' ? <>Curated <span className="text-accent">Collections</span></> : <>{filteredBundles[0]?.name} <span className="text-accent">Bundle</span></>}
          </h2>
        </div>
        <div className="space-y-8">
          {filteredBundles.map((bundle, i) => (
            <motion.div key={bundle.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 * i }}
              className={`rounded-3xl border ${bundle.borderColor} overflow-hidden hover:shadow-2xl transition-all duration-500`}>
              <div className={`${bundle.bgLight} p-8 md:p-10`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bundle.color} flex items-center justify-center text-white shadow-lg`}>{bundle.icon}</div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-2xl md:text-3xl font-serif font-black text-primary">{bundle.name}</h3>
                          <span className="bg-accent text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">{bundle.badge}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{bundle.desc}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-6">
                      {bundle.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-64 flex flex-col items-center lg:items-end gap-4">
                    <div className="text-center lg:text-right">
                      <div className="text-sm text-gray-400 line-through font-medium">{bundle.originalPrice} AUD</div>
                      <div className="text-4xl font-black text-primary">{bundle.bundlePrice}</div>
                      <div className="text-sm font-bold text-accent">Save {bundle.savings}</div>
                    </div>
                    <button onClick={() => { if (!user) { setShowAuthModal(true); return; } const mp = allProducts.find(p => bundle.items.includes(p.title)); if (mp) addToCart({ id: mp.id, title: bundle.name + " Bundle", brand: "Masaliya", price: bundle.bundlePrice + " AUD", image: mp.image, weight: bundle.items.length * 0.1 }); }}
                      className="flex items-center gap-3 bg-primary hover:bg-accent text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
                      <ShoppingCart className="w-4 h-4" /> Add Bundle
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Bundle CTA */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary via-gray-900 to-primary rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10">
            <Gift className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-2xl md:text-4xl font-serif font-black text-white mb-4">Build Your <span className="text-accent">Own Bundle</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">Mix & match your favourite spices — create your perfect collection and save up to 25%.</p>
            <Link href="/shop" className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg">
              Start Building <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-2 block">Popular Picks</span>
            <h2 className="text-3xl font-serif font-black text-primary tracking-tight">Also in <span className="text-accent">Demand</span></h2>
          </div>
          <Link href="/shop" className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest hover:underline underline-offset-4">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(p => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <ProductCard title={p.title} brand={p.brand} price={p.price} rating={p.rating} tags={p.tags} productImage={p.image} overlayText={p.desc} onAddToCart={() => handleAddToCart({ id: p.id, title: p.title, brand: p.brand, price: p.price, image: p.image, weight: p.weight })} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function BundlesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
      <BundlesContent />
    </Suspense>
  );
}
