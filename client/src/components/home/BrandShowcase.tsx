"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const brands = [
  {
    name: "Roopak",
    tagline: "Since 1958",
    logo: "/brands/roopak.webp",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&q=80",
    desc: "The gold standard of Delhi's spice heritage.",
    brandColor: "#D97706",
    bgGradient: "from-amber-700 via-orange-600 to-amber-800",
    lightColor: "#FEF3C7",
  },
  {
    name: "Shan-E-Delhi",
    tagline: "Authentic Taste",
    logo: "/brands/shan-e-delhi.jpg",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
    desc: "Capturing the essence of Old Delhi kitchens.",
    brandColor: "#DC2626",
    bgGradient: "from-red-800 via-red-700 to-rose-800",
    lightColor: "#FEE2E2",
  },
  {
    name: "Nawab Secret",
    tagline: "Royal Kitchens",
    logo: "/brands/nawab.webp",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
    desc: "Regal blends passed down through generations.",
    brandColor: "#7C3AED",
    bgGradient: "from-purple-900 via-violet-800 to-purple-900",
    lightColor: "#EDE9FE",
  },
  {
    name: "Noori",
    tagline: "Since 1928",
    logo: "/brands/noori.png",
    image: "https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?w=400&q=80",
    desc: "A century of purity and traditional roasting.",
    brandColor: "#059669",
    bgGradient: "from-emerald-900 via-green-800 to-emerald-900",
    lightColor: "#D1FAE5",
  },
  {
    name: "Star Masala",
    tagline: "Premium Quality",
    logo: "/brands/star.png",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80",
    desc: "Finest exports and high-grade whole spices.",
    brandColor: "#2563EB",
    bgGradient: "from-blue-900 via-blue-800 to-indigo-900",
    lightColor: "#DBEAFE",
  },
];

export default function BrandShowcase() {
  return (
    <section className="py-12 bg-background relative overflow-hidden">
      {/* Decorative gold dot grid */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4">
              Legacy & Tradition
            </span>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-[1px] bg-accent/40" />
              <Sparkles className="w-4 h-4 text-accent" />
              <div className="w-12 h-[1px] bg-accent/40" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-black text-primary mb-3 tracking-tight">
              Trusted Heritage <span className="text-accent italic">Brands</span>
            </h2>
            <p className="text-primary/60 max-w-xl mx-auto text-base font-serif italic">
              "Celebrating a century of purity, tradition, and the soul of Indian kitchens."
            </p>
          </motion.div>
        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full flex flex-col rounded-[1.75rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-white/10">
                {/* Coloured top band */}
                <div
                  className={`bg-gradient-to-br ${brand.bgGradient} p-6 flex flex-col items-center gap-4 relative overflow-hidden`}
                >
                  {/* Shimmer sweep */}
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700" />

                  {/* Logo container - INCREASED FROM w-24 h-24 TO w-28 h-28 */}
                  <div className="w-28 h-28 rounded-2xl bg-white flex items-center justify-center p-3 shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Tagline chip */}
                  <span
                    className="text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full relative z-10"
                    style={{
                      backgroundColor: `${brand.lightColor}25`,
                      color: brand.lightColor,
                      border: `1px solid ${brand.lightColor}40`,
                    }}
                  >
                    {brand.tagline}
                  </span>
                </div>

                {/* Info bottom */}
                <div className="bg-white flex-1 px-5 py-4 flex flex-col gap-2">
                  <h3 className="text-lg font-serif font-black text-primary group-hover:text-accent transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-[12px] text-primary/60 leading-relaxed line-clamp-2 flex-1">
                    {brand.desc}
                  </p>
                  <div
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mt-2 transition-all duration-300 group-hover:gap-3"
                    style={{ color: brand.brandColor }}
                  >
                    View Collection <ArrowRight className="w-3.5 h-3.5" />
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