"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  title: string;
  brand: string;
  price: string;
  rating: number;
  tags: string[];
  productImage: string;
  overlayText: string;
  onAddToCart?: () => void;
}

export default function ProductCard({
  title,
  brand,
  price,
  rating,
  tags,
  productImage,
  overlayText,
  onAddToCart,
}: ProductCardProps) {
  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      className="relative w-full h-[460px] bg-white rounded-[2.5rem] p-6 flex flex-col group cursor-pointer transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)] border border-gray-100 hover:border-accent/30"
    >
      {/* Quality Badge */}
      <div className="absolute top-6 left-6 z-30">
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
          <ShieldCheck className="w-3 h-3 text-accent" />
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Pure Heritage</span>
        </div>
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white shadow-sm border border-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all">
        <Heart className="w-4 h-4" />
      </button>

      {/* Product Image Stage */}
      <div className="relative flex-grow flex items-center justify-center mb-6 pt-8 bg-gray-50 rounded-[1.5rem] overflow-hidden shadow-inner">
        <motion.div
          variants={{
            initial: { y: 0, rotate: 0 },
            hover: { y: -15, rotate: -2, scale: 1.05 }
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative z-10 w-full h-full flex items-center justify-center p-4"
        >
          <img 
            src={productImage} 
            alt={title} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500"
          />
        </motion.div>
      </div>

      {/* Information Area */}
      <div className="relative z-20 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">
              {brand}
            </span>
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-accent text-accent" />
              <span className="text-[10px] font-bold text-gray-400">{rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-serif font-black text-primary leading-tight group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            {price}
          </span>
          <div className="flex gap-1">
            {tags.slice(0, 1).map((tag, i) => (
              <span key={i} className="text-[8px] font-black uppercase tracking-tighter bg-accent/10 text-accent px-2 py-1 rounded-md border border-accent/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Action Bar (Slide up) */}
      <motion.div 
        variants={{
          initial: { opacity: 0, y: 10 },
          hover: { opacity: 1, y: 0 }
        }}
        className="absolute inset-x-6 bottom-6 z-40"
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart?.();
          }}
          className="w-full bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:bg-accent transition-all duration-300 transform active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="text-xs font-black uppercase tracking-widest text-white">Add to Collection</span>
        </button>
      </motion.div>

      {/* Storytelling Tooltip (On Hover) */}
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.9 },
          hover: { opacity: 1, scale: 1 }
        }}
        className="absolute inset-x-6 top-[40%] z-50 pointer-events-none"
      >
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-xl text-center">
          <p className="text-[11px] font-serif italic text-primary font-bold leading-relaxed">
            &quot;{overlayText}&quot;
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
