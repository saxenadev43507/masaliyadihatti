"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const brands = [
  {
    name: "Roopak",
    tagline: "Since 1958",
    logo: "/brands/roopak.webp",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&q=80",
    desc: "The gold standard of Delhi's spice heritage."
  },
  {
    name: "Shan-E-Delhi",
    tagline: "Authentic Taste",
    logo: "/brands/shan-e-delhi.jpg",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
    desc: "Capturing the essence of Old Delhi kitchens."
  },
  {
    name: "Nawab Secret",
    tagline: "Royal Kitchens",
    logo: "/brands/nawab.webp",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
    desc: "Regal blends passed down through generations."
  },
  {
    name: "Noori",
    tagline: "Since 1928",
    logo: "/brands/noori.png",
    image: "https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?w=400&q=80",
    desc: "A century of purity and traditional roasting."
  },
  {
    name: "Star Masala",
    tagline: "Premium Quality",
    logo: "/brands/star.png",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80",
    desc: "Finest exports and high-grade whole spices."
  },
];

export default function BrandShowcase() {
  return (
    <section className="py-10 bg-[#fafafa] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4">
              Legacy & Tradition
            </span>
            
            {/* Heritage Ornament */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-accent/30"></div>
              <div className="w-2 h-2 rotate-45 border border-accent"></div>
              <div className="w-12 h-[1px] bg-accent/30"></div>
            </div>

            <h2 className="text-xl md:text-2xl font-serif font-black text-primary mb-4 tracking-tight">
              Trusted Heritage <span className="text-accent italic">Brands</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg font-serif italic">
              "Celebrating a century of purity, tradition, and the soul of Indian kitchens."
            </p>
          </motion.div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-[1.5rem] p-3 shadow-sm border border-gray-100 transition-all duration-700 group-hover:shadow-[0_40px_80px_-15px_rgba(212,175,55,0.15)] group-hover:-translate-y-2 group-hover:border-accent/30 h-full flex flex-col relative overflow-hidden">
                
                {/* Logo & Image Container */}
                <div className="aspect-[3/2] rounded-[1rem] overflow-hidden mb-4 relative bg-gray-50 flex items-center justify-center p-3">
                  {/* Background Spice Texture */}
                  <img 
                    src={brand.image} 
                    alt="Spices" 
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.08] group-hover:opacity-20 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Brand Logo - Museum Plinth Effect */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4 bg-white/60 group-hover:bg-white rounded-xl shadow-sm border border-white transition-all duration-500">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Since Badge - Elegant Corner Style */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent py-4 px-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">{brand.tagline}</span>
                  </div>
                </div>

                {/* Brand Info */}
                <div className="text-center px-1 flex-grow flex flex-col">
                  <h3 className="text-xl font-serif font-black text-primary mb-1.5 group-hover:text-accent transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 mb-4 group-hover:text-gray-700 transition-colors">
                    {brand.desc}
                  </p>
                  
                  <div className="mt-auto pt-3 border-t border-gray-50 flex justify-center">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent transition-all duration-300 group-hover:gap-4">
                      Exhibition <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
