"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Leaf, Star } from "lucide-react";

export default function Features() {
  const features = [
    { title: "Fast Delivery", icon: <Truck className="w-8 h-8" />, desc: "Across India safely" },
    { title: "100% Pure", icon: <Leaf className="w-8 h-8" />, desc: "No artificial colors" },
    { title: "Secure Payment", icon: <ShieldCheck className="w-8 h-8" />, desc: "Encrypted checkout" },
    { title: "Premium Quality", icon: <Star className="w-8 h-8" />, desc: "Authentic & checked" }
  ];

  return (
    <section className="py-6 bg-white border-b border-gray-100 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-xl font-serif font-black text-primary uppercase tracking-tighter">
            Why Choose Us
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-4 group"
            >
              <div className="text-4xl mb-4 bg-white w-20 h-20 flex items-center justify-center rounded-full text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm border border-gray-100">
                {f.icon}
              </div>
              <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-1">{f.title}</h4>
              <p className="text-xs text-gray-600 font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
