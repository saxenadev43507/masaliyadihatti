"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, MapPin } from 'lucide-react';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const brands = [
  {
    name: "Roopak",
    tagline: "Shan Punjab Di — Since 1958",
    desc: "Born in the bustling lanes of Karol Bagh, Delhi, Roopak has been crafting authentic Punjabi spice blends for over 65 years. Their secret? Cold-grinding technology that preserves every drop of essential oil and aroma.",
    origin: "Karol Bagh, New Delhi",
    since: "1958",
    specialty: "Punjabi Veg Masalas",
    color: "from-red-600 to-orange-500",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    filterBrand: "Roopak",
  },
  {
    name: "Shan-E-Delhi",
    tagline: "Delhi Ki Shan — The Pride of Delhi",
    desc: "Representing the royal culinary traditions of Old Delhi, Shan-E-Delhi brings authentic Mughlai and Dilli-style masalas that transform ordinary meals into extraordinary experiences.",
    origin: "Old Delhi, India",
    since: "1985",
    specialty: "Non-Veg & Mughlai Masalas",
    color: "from-amber-600 to-yellow-500",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    filterBrand: "Shan-e-Delhi",
  },
  {
    name: "Nawab's Secret",
    tagline: "Lucknow Special — Royal Awadhi Heritage",
    desc: "From the Nawabi kitchens of Lucknow, these premium masalas capture the slow-cooked, aromatic essence of Awadhi cuisine. Every blend is a closely guarded recipe passed down through generations.",
    origin: "Lucknow, Uttar Pradesh",
    since: "1972",
    specialty: "Awadhi & Biryani Masalas",
    color: "from-emerald-600 to-teal-500",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    filterBrand: "Nawab Secret",
  },
  {
    name: "Noori",
    tagline: "Taste Since 1928 — Nearly a Century of Flavor",
    desc: "One of India's oldest spice houses, Noori has been the gold standard in Mughlai whole and ground spices for almost a century. Their legacy is built on uncompromising quality and purity.",
    origin: "Delhi, India",
    since: "1928",
    specialty: "Mughlai Whole & Ground Spices",
    color: "from-purple-600 to-indigo-500",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    filterBrand: "Noori",
  },
  {
    name: "Star Masale",
    tagline: "Star of Khari Baoli — Asia's Largest Spice Market",
    desc: "Operating from the heart of Khari Baoli, Asia's largest wholesale spice market, Star Masale sources the finest raw spices and creates time-tested blends trusted by professional chefs.",
    origin: "Khari Baoli, Delhi",
    since: "1990",
    specialty: "Professional-Grade Blends",
    color: "from-blue-600 to-cyan-500",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    filterBrand: "Star Masale",
  },
  {
    name: "360 Degree",
    tagline: "Complete Gujarati Flavor Experience",
    desc: "Specializing in authentic Gujarati cuisine, 360 Degree brings the complete spectrum of flavors from India's western coast — from sweet dhokla masalas to tangy pickle blends.",
    origin: "Gujarat, India",
    since: "2005",
    specialty: "Gujarati Spice Blends",
    color: "from-pink-600 to-rose-500",
    bgLight: "bg-pink-50",
    borderColor: "border-pink-200",
    filterBrand: "360 Degree",
  },
];

export default function BrandsPage() {
  const { addToCart } = useCart();
  const { user, setShowAuthModal } = useAuth();

  const handleAddToCart = (p: { id: number; title: string; brand: string; price: string; image: string }) => {
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
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">Our Heritage Partners</span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-6 tracking-tight">
              Trusted <span className="text-accent">Brands</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              We partner exclusively with India&#39;s most iconic spice houses — brands with decades of heritage, uncompromising quality, and recipes passed down through generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brands List */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        {brands.map((brand, i) => {
          const brandProducts = allProducts.filter(p => p.brand === brand.filterBrand).slice(0, 4);

          return (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`rounded-3xl border ${brand.borderColor} overflow-hidden`}
            >
              {/* Brand Header */}
              <div className={`${brand.bgLight} p-8 md:p-12`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brand.color} flex items-center justify-center text-white shadow-lg`}>
                        <span className="text-lg font-black">{brand.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-serif font-black text-primary">{brand.name}</h2>
                        <p className="text-xs font-bold text-accent uppercase tracking-widest">{brand.tagline}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mt-4">{brand.desc}</p>

                    <div className="flex flex-wrap items-center gap-6 mt-6">
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">{brand.origin}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Award className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">Since {brand.since}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-sm font-medium">{brand.specialty}</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/shop`} className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-lg whitespace-nowrap self-start">
                    Shop {brand.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Brand Products */}
              {brandProducts.length > 0 && (
                <div className="p-8 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Popular from {brand.name}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {brandProducts.map(p => (
                      <Link key={p.id} href={`/product/${p.id}`}>
                        <ProductCard title={p.title} brand={p.brand} price={p.price} rating={p.rating} tags={p.tags} productImage={p.image} overlayText={p.desc} onAddToCart={() => handleAddToCart({ id: p.id, title: p.title, brand: p.brand, price: p.price, image: p.image })} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 text-center border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-primary mb-4">
            Want to become a <span className="text-accent">Brand Partner</span>?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">We&#39;re always looking to partner with authentic Indian spice brands who share our commitment to quality and heritage.</p>
          <Link href="/wholesale" className="inline-flex items-center gap-3 bg-primary hover:bg-accent text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg">
            Wholesale Enquiry <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
