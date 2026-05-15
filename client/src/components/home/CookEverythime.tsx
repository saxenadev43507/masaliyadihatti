"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  UtensilsCrossed, 
  Flame, 
  Beef, 
  Store, 
  Crown, 
  Leaf,
  ArrowRight,
  Sparkles
} from "lucide-react";

// Standard IDs that have high availability and are relevant to the cuisine
const categories = [
  {
    id: 1,
    title: "Everyday Cooking",
    subtitle: "Daily Dal & Sabzi essentials.",
    tagline: "The Daily",
    icon: <UtensilsCrossed className="w-5 h-5" />,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Indian Classics",
    subtitle: "Rajma, Chole & Paneer blends.",
    tagline: "Traditions",
    icon: <Flame className="w-5 h-5" />,
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Non-Veg Specials",
    subtitle: "Spices for Biryani & Meats.",
    tagline: "The Feast",
    icon: <Beef className="w-5 h-5" />,
    img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Street Style",
    subtitle: "Kicks for Chaat & Pav Bhaji.",
    tagline: "The Twist",
    icon: <Store className="w-5 h-5" />,
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  },
 
  {
    id: 5,
    title: "Healthy & Light",
    subtitle: "Spices for Salads & Detox.",
    tagline: "Wellness",
    icon: <Leaf className="w-5 h-5" />,
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CookAnything() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px bg-accent"></div>
              <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">
                Culinary Inspiration
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight leading-tight mt-2">
              Cook Anything You Love
            </h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg font-serif italic">
              Explore masterfully crafted spice collections for every recipe, occasion, and mood.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm text-gray-500 font-bold text-[10px] uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>5 Signature Collections</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative h-[340px] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={cat.img} 
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:border-accent transition-all duration-500 text-white">
                  {cat.icon}
                </div>
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 block text-accent">
                    {cat.tagline}
                  </span>
                  <h3 className="text-lg font-serif font-black text-white leading-tight mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-white/60 text-[10px] leading-relaxed font-medium mb-4 line-clamp-2">
                    {cat.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-accent text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
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