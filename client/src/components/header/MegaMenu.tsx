"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Flame,
  Wind,
  Zap,
  Crown,
  Utensils,
  Truck,
  ArrowRight,
  Clock,
  Package,
  Gift,
  Star,
  MapPin,
  Sparkles,
} from "lucide-react";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop", hasMegaMenu: true, type: "shop" },
  { name: "Categories", href: "/categories", hasMegaMenu: true, type: "categories" },
  { name: "Brands", href: "/brands", hasMegaMenu: true, type: "brands" },
  { name: "Bundles", href: "/bundles", hasMegaMenu: true, type: "bundles" },
  { name: "Recipes", href: "/recipes", hasMegaMenu: true, type: "recipes" },
  { name: "Wholesale", href: "/wholesale", hasMegaMenu: true, type: "wholesale" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const categoryData = {
  types: [
    { name: "Pure Spices", icon: <Wind className="w-4 h-4" />, href: "/shop?category=All+Products", color: "from-emerald-500 to-teal-400" },
    { name: "Blended Masalas", icon: <Zap className="w-4 h-4" />, href: "/shop?category=All+Products", color: "from-amber-500 to-orange-400" },
    { name: "Whole Spices", icon: <Flame className="w-4 h-4" />, href: "/shop?category=All+Products", color: "from-red-500 to-rose-400" },
    { name: "Herbs & Seasoning", icon: <Crown className="w-4 h-4" />, href: "/shop?category=All+Products", color: "from-green-500 to-emerald-400" },
    { name: "Recipes", icon: <Utensils className="w-4 h-4" />, href: "/recipes", color: "from-blue-500 to-cyan-400" },
  ],
  styles: [
    { name: "North Indian", icon: <Utensils className="w-4 h-4" />, href: "/shop?category=Best+Sellers", color: "from-orange-500 to-amber-400" },
    { name: "South Indian Specials", icon: <Utensils className="w-4 h-4" />, href: "/shop?category=All+Products", color: "from-yellow-500 to-lime-400" },
    { name: "Mughlai Cuisine", icon: <Utensils className="w-4 h-4" />, href: "/shop?category=New+Arrivals", color: "from-purple-500 to-fuchsia-400" },
    { name: "Coastal Flavors", icon: <Utensils className="w-4 h-4" />, href: "/shop?category=All+Products", color: "from-cyan-500 to-blue-400" },
  ],
  special: [
    { name: "Gift Boxes", icon: <Gift className="w-4 h-4" />, href: "/bundles", color: "from-pink-500 to-rose-400" },
    { name: "Bundle Deals", icon: <Package className="w-4 h-4" />, href: "/bundles", color: "from-indigo-500 to-blue-400" },
    { name: "Organic Collection", icon: <Leaf className="w-4 h-4" />, href: "/shop?category=All+Products", color: "from-teal-500 to-emerald-400" },
    { name: "Limited Editions", icon: <Sparkles className="w-4 h-4" />, href: "/shop?category=New+Arrivals", color: "from-amber-400 to-yellow-300" },
  ],
};

// Extracted Leaf icon for the organic collection
function Leaf(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export default function MegaMenu() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const renderMegaMenu = (type: string) => {
    switch (type) {
      case "shop":
        return (
          <div className="grid grid-cols-12 gap-8 p-8">
            {/* Left Col: Shop Collections styled as premium buttons */}
            <div className="col-span-4 space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/40">
                Shop Collections
              </h3>
              <div className="grid gap-3">
                {[
                  { label: "All Products", href: "/shop", icon: <Package className="w-4 h-4" />, color: "from-emerald-500 to-teal-400" },
                  { label: "Best Sellers", href: "/shop?category=Best+Sellers", icon: <Star className="w-4 h-4" />, color: "from-amber-500 to-orange-400" },
                  { label: "New Arrivals", href: "/shop?category=New+Arrivals", icon: <Sparkles className="w-4 h-4" />, color: "from-blue-500 to-cyan-400" },
                  { label: "Combo Packs", href: "/shop?category=Combo+Packs", icon: <Gift className="w-4 h-4" />, color: "from-purple-500 to-pink-400" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group relative rounded-xl overflow-hidden border border-primary/8 hover:border-accent/30 bg-white p-3 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <span className="text-[14px] font-bold text-primary group-hover:text-accent transition-colors">{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto text-primary/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            {/* Right Col: Featured Product Card */}
            <div className="col-span-8 bg-white rounded-2xl p-8 flex items-center justify-between relative overflow-hidden group border border-primary/10 shadow-lg hover:shadow-xl transition-all">
               {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-colors" />
              
              <div className="relative z-10 max-w-[260px]">
                <span className="bg-gradient-to-r from-accent to-accent-hover text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 inline-block shadow-sm">
                  Featured Pack
                </span>
                <h4 className="text-2xl font-serif font-black text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
                  The Royal Mughal Blend
                </h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed font-medium">
                  Hand-roasted spices used in the kitchens of the Nawabs. A perfect balance of aroma and heat.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-accent font-black text-[11px] uppercase tracking-widest group/btn hover:text-primary transition-colors"
                >
                  Shop Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="relative z-10 w-48 h-48 bg-gray-50 rounded-2xl shadow-xl flex items-center justify-center p-2 rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 border border-white">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400"
                  alt="Spices"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        );

      case "categories":
        return (
          <div className="grid grid-cols-3 gap-8 p-8">
            {[
              { title: "Spice Types", items: categoryData.types },
              { title: "Cooking Styles", items: categoryData.styles },
              { title: "Special Collections", items: categoryData.special },
            ].map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/40 mb-5">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group relative bg-white rounded-xl overflow-hidden border border-primary/8 hover:border-accent/30 p-2.5 flex items-center gap-3 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color || "from-gray-200 to-gray-100"} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <span className="text-[13px] font-bold text-primary group-hover:text-accent transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "brands": {
        // Keeps your exact updated design!
        const brands = [
          { name: "Roopak", desc: "Since 1958", origin: "Karol Bagh, Delhi", specialty: "Punjabi Veg Masalas", color: "from-red-600 to-orange-500" },
          { name: "Shan-E-Delhi", desc: "Heritage Recipes", origin: "Old Delhi", specialty: "Mughlai Non-Veg", color: "from-amber-600 to-yellow-500" },
          { name: "Nawab's Secret", desc: "Royal Kitchens", origin: "Lucknow", specialty: "Awadhi Masalas", color: "from-emerald-600 to-teal-500" },
          { name: "Noori", desc: "Since 1928", origin: "Delhi", specialty: "Mughlai Whole Spices", color: "from-purple-600 to-indigo-500" },
          { name: "Star Masale", desc: "Premium Quality", origin: "Khari Baoli", specialty: "Professional Blends", color: "from-blue-600 to-cyan-500" },
        ];
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/40">
                Our Heritage Partners
              </h3>
              <Link href="/brands" className="flex items-center gap-1.5 text-accent font-bold text-[11px] uppercase tracking-widest hover:underline underline-offset-4">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {brands.map((brand) => (
                <Link
                  key={brand.name}
                  href="/brands"
                  className="group relative rounded-2xl overflow-hidden border border-primary/8 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-white"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${brand.color}`} />
                  <div className="p-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${brand.color} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-base font-black">{brand.name.charAt(0)}</span>
                    </div>
                    <h4 className="font-bold text-primary text-[13px] mb-0.5 group-hover:text-accent transition-colors">{brand.name}</h4>
                    <p className="text-[9px] text-primary/40 uppercase tracking-widest font-bold mb-2">{brand.desc}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-primary/50">
                        <MapPin className="w-3 h-3 text-accent/60" />
                        <span>{brand.origin}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-primary/50">
                        <Star className="w-3 h-3 text-accent/60 fill-accent/60" />
                        <span>{brand.specialty}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      }

      case "bundles":
        return (
          <div className="grid grid-cols-3 gap-6 p-8">
            <div className="col-span-2 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/40 mb-4">
                Bundle Deals
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Starter Bundle", desc: "5 Essential Masalas · Save $8", badge: "Popular", color: "from-blue-500 to-cyan-400", href: "/bundles?bundle=starter" },
                  { name: "Biryani Bundle", desc: "Complete Biryani Kit · Save $12", badge: "Chef Pick", color: "from-amber-500 to-orange-400", href: "/bundles?bundle=biryani" },
                  { name: "Non-Veg Bundle", desc: "8 Non-Veg Masalas · Save $15", badge: "Best Value", color: "from-red-500 to-rose-400", href: "/bundles?bundle=nonveg" },
                  { name: "Gift Bundle", desc: "Premium Gift Box · 10 Spices", badge: "Gift", color: "from-purple-500 to-pink-400", href: "/bundles?bundle=gift" },
                ].map((b, i) => (
                  <Link
                    key={i}
                    href={b.href}
                    className="group relative rounded-2xl overflow-hidden border border-primary/8 hover:border-accent/30 bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${b.color}`} />
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-primary text-[15px] group-hover:text-accent transition-colors">
                          {b.name}
                        </h4>
                        <span className="text-[9px] font-black uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 px-2.5 py-1 rounded-md">
                          {b.badge}
                        </span>
                      </div>
                      <span className="text-[12px] font-medium text-gray-500 flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-accent" /> {b.desc}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* Build your own feature card */}
            <div className="relative bg-white border border-primary/10 rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-lg group hover:shadow-xl transition-all">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-[50px]" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 border border-accent/20">
                   <Gift className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-serif font-black text-2xl mb-2 text-primary">Build Your Own</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Mix & match your favourite heritage spices — save up to 25% on custom bundles.
                </p>
              </div>
              <Link
                href="/bundles"
                className="relative z-10 mt-6 bg-gradient-to-r from-accent to-accent-hover text-white text-[11px] font-black uppercase tracking-widest py-3 px-4 rounded-xl text-center shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                Start Customizing
              </Link>
            </div>
          </div>
        );

      case "recipes":
        return (
          <div className="grid grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/40 mb-4">
                Browse Recipes
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: "Quick Weeknight Meals", time: "Under 30 Mins", icon: <Clock className="w-4 h-4" />, color: "from-emerald-500 to-teal-400", href: "/recipes?category=quick" },
                  { name: "North Indian Classics", time: "Traditional", icon: <Utensils className="w-4 h-4" />, color: "from-amber-500 to-orange-400", href: "/recipes?category=north-indian" },
                  { name: "Biryani & Rice", time: "Weekend Special", icon: <Flame className="w-4 h-4" />, color: "from-red-500 to-rose-400", href: "/recipes?category=biryani" },
                  { name: "Grills & Kebabs", time: "BBQ Favourites", icon: <Zap className="w-4 h-4" />, color: "from-purple-500 to-pink-400", href: "/recipes?category=grills" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="group relative rounded-xl overflow-hidden border border-primary/8 hover:border-accent/30 bg-white p-3 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-primary group-hover:text-accent transition-colors">{item.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                        {item.time}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-primary/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            {/* Featured Recipe Card */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-primary/10 group cursor-pointer hover:shadow-2xl transition-all duration-500">
              <div className="h-[200px] w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80"
                  alt="Featured recipe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="bg-accent/90 backdrop-blur-sm text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-[0.2em] mb-2 inline-block shadow-sm">
                    Recipe of the Week
                  </span>
                  <h4 className="text-2xl font-serif font-black text-white leading-tight">
                    Authentic Dum Biryani
                  </h4>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between bg-white">
                <p className="text-gray-500 text-[12px] font-medium flex items-center gap-2">
                   <Clock className="w-3.5 h-3.5 text-accent" /> 1 Hr 30 Mins Prep
                </p>
                <Link
                  href="/recipes"
                  className="inline-flex items-center gap-1.5 text-accent font-black text-[10px] uppercase tracking-widest group-hover:pr-2 transition-all"
                >
                  Cook Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        );

      case "wholesale":
        return (
          <div className="p-8">
             <div className="relative bg-white rounded-3xl border border-primary/10 shadow-xl overflow-hidden group">
               {/* Background pattern */}
               <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/10 rounded-full blur-[60px]" />
               
               <div className="relative z-10 flex items-center justify-between p-10">
                 <div className="flex-1 space-y-4 max-w-lg">
                   <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-lg text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                     <Crown className="w-3.5 h-3.5" /> Premium B2B Network
                   </div>
                   <h3 className="text-3xl font-serif font-black text-primary leading-tight">
                     Partner with Masaliya Di Hatti
                   </h3>
                   <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
                     Join our network of 500+ distributors and bring the authentic taste of Indian heritage to your restaurant, store, or region.
                   </p>
                   <div className="flex items-center gap-8 pt-2">
                     <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center"><Truck className="w-4 h-4 text-accent" /></div>
                       <span className="text-[13px] font-bold text-primary">Global Shipping</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center"><Star className="w-4 h-4 text-accent" /></div>
                       <span className="text-[13px] font-bold text-primary">Volume Discounts</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="shrink-0 pl-10 border-l border-gray-100">
                   <Link
                     href="/wholesale"
                     className="bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[12px] hover:bg-accent transition-all duration-300 shadow-xl hover:shadow-accent/30 hover:-translate-y-1 block text-center"
                   >
                     Become a Partner
                   </Link>
                 </div>
               </div>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <nav className="flex items-center gap-7 lg:gap-8">
      {menuItems.map((item) => (
        <div
          key={item.name}
          onMouseEnter={() => item.hasMegaMenu && setActiveTab(item.type!)}
          onMouseLeave={() => setActiveTab(null)}
          className="relative h-14 flex items-center"
        >
          <Link
            href={item.href}
            className={`flex items-center gap-1.5 text-[14px] font-semibold transition-colors group relative ${
              activeTab === item.type
                ? "text-accent"
                : "text-white/90 hover:text-accent"
            }`}
          >
            {item.name}
            {item.hasMegaMenu && (
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  activeTab === item.type ? "rotate-180 text-accent" : ""
                }`}
              />
            )}
            <div
              className={`absolute -bottom-[21px] left-0 h-0.5 bg-accent transition-all duration-300 ${
                activeTab === item.type ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <AnimatePresence>
            {activeTab === item.type && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                // Extended width to 850px to accommodate the new beautiful cards!
                className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary/10 overflow-hidden z-50 mt-1"
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