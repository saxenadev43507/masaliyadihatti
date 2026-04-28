"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Flame, 
  Wind, 
  Zap, 
  Crown, 
  Utensils, 
  Truck,
  ArrowRight
} from 'lucide-react';

const menuItems = [
  { name: 'Home', href: '/' },
  { 
    name: 'Shop', 
    href: '/shop',
    hasMegaMenu: true,
    type: 'shop'
  },
  { 
    name: 'Categories', 
    href: '/categories',
    hasMegaMenu: true,
    type: 'categories'
  },
  { 
    name: 'Brands', 
    href: '/brands',
    hasMegaMenu: true,
    type: 'brands'
  },
  { 
    name: 'Wholesale', 
    href: '/wholesale',
    hasMegaMenu: true,
    type: 'wholesale'
  },
  { name: 'Recipes', href: '/recipes' },
];

const categoryData = {
  types: [
    { name: 'Pure Spices', icon: <Wind className="w-4 h-4" /> },
    { name: 'Blended Masalas', icon: <Zap className="w-4 h-4" /> },
    { name: 'Whole Spices', icon: <Flame className="w-4 h-4" /> },
    { name: 'Herbs & Seasoning', icon: <Crown className="w-4 h-4" /> },
  ],
  styles: [
    { name: 'North Indian', icon: <Utensils className="w-4 h-4" /> },
    { name: 'South Indian Specials', icon: <Utensils className="w-4 h-4" /> },
    { name: 'Mughlai Cuisine', icon: <Utensils className="w-4 h-4" /> },
    { name: 'Coastal Flavors', icon: <Utensils className="w-4 h-4" /> },
  ],
  special: [
    { name: 'Gift Boxes', icon: <Crown className="w-4 h-4" /> },
    { name: 'Organic Collection', icon: <Crown className="w-4 h-4" /> },
    { name: 'Limited Editions', icon: <Crown className="w-4 h-4" /> },
    { name: 'Chef Choice', icon: <Crown className="w-4 h-4" /> },
  ]
};

export default function MegaMenu() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const renderMegaMenu = (type: string) => {
    switch (type) {
      case 'shop':
        return (
          <div className="grid grid-cols-12 gap-8 p-8">
            <div className="col-span-4 space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Shop Collections</h3>
              <div className="space-y-3">
                {['All Products', 'Best Sellers', 'New Arrivals', 'Combo Packs'].map((item) => (
                  <Link 
                    key={item} 
                    href={`/shop?category=${encodeURIComponent(item)}`} 
                    className="block text-[15px] font-medium text-gray-700 hover:text-accent hover:translate-x-1 transition-all"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-span-8 bg-gray-50 rounded-xl p-8 flex items-center justify-between relative overflow-hidden group border border-gray-100">
              <div className="relative z-10 max-w-[240px]">
                <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Featured Pack</span>
                <h4 className="text-xl font-bold text-gray-900 mb-2">The Royal Mughal Blend</h4>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">Hand-roasted spices used in the kitchens of the Nawabs.</p>
                <Link href="/shop" className="inline-flex items-center gap-2 text-accent font-semibold text-sm group/btn hover:underline underline-offset-4">
                  Shop Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="relative z-10 w-40 h-40 bg-white rounded-xl shadow-lg flex items-center justify-center p-2 rotate-2 group-hover:rotate-0 transition-transform duration-500">
                 <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300" alt="Spices" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="grid grid-cols-3 gap-8 p-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                Spice Types
              </h3>
              <div className="space-y-2">
                {categoryData.types.map((item) => (
                  <Link key={item.name} href="#" className="flex items-center gap-3 text-gray-700 hover:text-accent font-medium py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors group">
                    <span className="text-gray-400 group-hover:text-accent transition-colors">{item.icon}</span>
                    <span className="text-[14px]">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                Cooking Styles
              </h3>
              <div className="space-y-2">
                {categoryData.styles.map((item) => (
                  <Link key={item.name} href="#" className="flex items-center gap-3 text-gray-700 hover:text-accent font-medium py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors group">
                    <span className="text-gray-400 group-hover:text-accent transition-colors">{item.icon}</span>
                    <span className="text-[14px]">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                Special Collections
              </h3>
              <div className="space-y-2">
                {categoryData.special.map((item) => (
                  <Link key={item.name} href="#" className="flex items-center gap-3 text-gray-700 hover:text-accent font-medium py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors group">
                    <span className="text-gray-400 group-hover:text-accent transition-colors">{item.icon}</span>
                    <span className="text-[14px]">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      case 'brands':
        const brands = [
          { name: "Royal Saffron", desc: "Premium Grade" },
          { name: "Nawab Blends", desc: "Heritage Recipes" },
          { name: "Spice Route", desc: "Authentic Whole" },
          { name: "Coastal Naturals", desc: "Organic Certified" },
          { name: "Masaliya Classic", desc: "Since 1928" }
        ];
        return (
          <div className="p-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8 text-center">Our Trusted Heritage Partners</h3>
            <div className="grid grid-cols-5 gap-4">
              {brands.map((brand, i) => (
                <div key={i} className="group h-28 bg-gray-50 rounded-xl flex flex-col items-center justify-center p-4 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-accent/20 hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="font-bold text-gray-800 text-[14px] text-center mb-1 group-hover:text-accent transition-colors">{brand.name}</span>
                  <span className="text-[10px] text-gray-500 text-center uppercase tracking-widest">{brand.desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'wholesale':
        return (
          <div className="flex items-center gap-10 p-8 bg-gray-50">
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Partner with Masaliya</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">Join our network of 500+ distributors worldwide and bring the authentic taste of Indian heritage to your region.</p>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-accent" />
                  <span className="text-[13px] font-semibold text-gray-700">Global Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-accent" />
                  <span className="text-[13px] font-semibold text-gray-700">Priority Support</span>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <Link href="#" className="bg-primary text-white px-8 py-3.5 rounded-xl font-medium text-[14px] hover:bg-accent transition-colors shadow-sm block">
                Become a Distributor
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="flex items-center gap-8 lg:gap-10">
      {menuItems.map((item) => (
        <div 
          key={item.name}
          onMouseEnter={() => item.hasMegaMenu && setActiveTab(item.type!)}
          onMouseLeave={() => setActiveTab(null)}
          className="relative h-14 flex items-center"
        >
          <Link 
            href={item.href}
            className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors group relative ${
              activeTab === item.type ? 'text-accent' : 'text-gray-700 hover:text-accent'
            }`}
          >
            {item.name}
            {item.hasMegaMenu && (
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeTab === item.type ? 'rotate-180 text-accent' : 'text-gray-400 group-hover:text-accent'}`} />
            )}
            <div className={`absolute -bottom-[21px] left-0 h-0.5 bg-accent transition-all duration-300 ${
              activeTab === item.type ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>

          <AnimatePresence>
            {activeTab === item.type && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[750px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 mt-1"
              >
                {renderMegaMenu(item.type!)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}
