"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative py-10 px-4 overflow-hidden bg-white border-t border-gray-100">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl md:text-3xl font-serif font-black text-primary mb-4 leading-tight">
            Bring Authentic <span className="text-accent">Taste Home</span> Today
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-medium mb-6 max-w-2xl mx-auto leading-relaxed">
            Join thousands of families experiencing the true essence of traditional Indian kitchens. Your first order ships with a free sampler!
          </p>
          <button className="bg-accent hover:bg-accent-hover text-white font-black uppercase tracking-widest py-4 px-10 rounded-xl shadow-xl shadow-accent/20 transition-all duration-300 hover:scale-105 text-sm md:text-base">
            Shop Collection Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
