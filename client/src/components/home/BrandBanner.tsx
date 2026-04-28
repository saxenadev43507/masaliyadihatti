"use client";

import React from "react";
import { motion } from "framer-motion";

const brands = [
  {
    id: 1,
    name: "Roopak",
    tagline: "Since 1958",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80",
    color: "from-amber-900/80"
  },
  {
    id: 2,
    name: "Shan-E-Delhi",
    tagline: "Authentic Taste",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
    color: "from-red-900/80"
  },
  {
    id: 3,
    name: "Nawab Secret",
    tagline: "Royal Kitchens",
    image: "https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?w=800&q=80",
    color: "from-purple-900/80"
  },
  {
    id: 4,
    name: "Noori",
    tagline: "Since 1928",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=80",
    color: "from-emerald-900/80"
  },
  {
    id: 5,
    name: "Star Masala",
    tagline: "Premium Quality",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
    color: "from-orange-900/80"
  },
];

// Duplicate the brands to create a seamless infinite loop
const infiniteBrands = [...brands, ...brands, ...brands];

export default function BrandBanner() {
  return (
    <section className="py-12 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-4">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-800">Our Heritage Partners</h3>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-amber-100 to-transparent"></div>
        </div>
      </div>

      <div className="relative flex">
        <motion.div 
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {infiniteBrands.map((brand, idx) => (
            <div 
              key={`${brand.id}-${idx}`}
              className="relative w-[320px] h-[180px] rounded-[2rem] overflow-hidden group cursor-pointer shrink-0 shadow-xl shadow-black/5"
            >
              {/* Background Image */}
              <img 
                src={brand.image} 
                alt={brand.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${brand.color} via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90`}></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-amber-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500">
                  {brand.tagline}
                </span>
                <h4 className="text-xl font-serif font-black text-white leading-tight">
                  {brand.name}
                </h4>
              </div>

              {/* Glass Glint Effect */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
