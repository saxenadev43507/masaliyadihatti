"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <section className="py-10 px-4 bg-white relative overflow-hidden">
      {/* Decorative backdrop */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Traditional Spice Grinding" 
            className="absolute inset-0 w-full h-full object-cover grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-6">
            <div className="shrink-0 w-20 h-20 bg-primary rounded-full flex flex-col items-center justify-center text-white border-2 border-accent/50 shadow-lg">
              <span className="font-serif font-bold text-2xl leading-none text-accent">1928</span>
              <span className="text-[9px] uppercase tracking-widest font-bold opacity-80 text-accent">Since</span>
            </div>
            <p className="text-white font-serif italic text-lg leading-snug drop-shadow-md">
              "Passed down through 4 generations of Master Blenders."
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:pl-8"
        >
          <span className="text-accent font-bold uppercase tracking-widest text-[9px] mb-3 block font-sans flex items-center gap-3">
            <div className="w-8 h-px bg-accent"></div>
            Our Heritage
          </span>
          <h2 className="text-xl md:text-2xl font-serif font-black text-primary mb-6 leading-tight">
            Preserving the Royalty of Indian Kitchens
          </h2>
          
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-serif">
            <p>
              In the narrow, aromatic lanes of Old Delhi, our great-grandfather began a journey with a single stone grinder. His secret wasn’t just in the sourcing, but in the precise roasting and cold-grinding techniques that kept the essential oils alive.
            </p>
            <p>
              Today, Masaliya brings that exact unadulterated passion to your modern kitchen. We don’t make commercial powders; we craft flavor memories. No artificial colors, no fillers—just 100% pure, robust magic that turns a simple meal into an occasion.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border-2 border-white shadow-md grayscale" alt="Founder" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border-2 border-white shadow-md grayscale" alt="Master Blender" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Crafted by Ranjit</p>
              <p className="text-xs text-gray-500">Over 90 years of mastery.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
