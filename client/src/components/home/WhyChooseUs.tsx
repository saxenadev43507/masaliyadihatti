"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    { our: "100% Pure & Natural Spices", other: "Mixed with Fillers & Starches" },
    { our: "Zero Artificial Colors/Flavors", other: "Contains Synthetic Dyes" },
    { our: "Cold Ground to Retain Essential Oils", other: "High-Heat Grinding (Loss of Aroma)" },
    { our: "Traditional Century-Old Recipes", other: "Mass-Produced Industrial Flavor" },
    { our: "Direct Sourcing from Farmers", other: "Multiple Middlemen & Long Shelf Delays" }
  ];

  return (
    <section className="py-10 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-2 block font-sans">Why We Stand Out</span>
          <h3 className="text-xl md:text-2xl font-serif font-black text-primary mb-4">The Masaliya Difference</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden md:grid md:grid-cols-2 relative">
          
          {/* Vertical Divider for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 z-10"></div>
          <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md z-20 font-bold text-gray-500 italic">
            VS
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 bg-white"
          >
            <h4 className="text-2xl font-bold font-serif text-gray-600 mb-8 border-b border-gray-200 pb-4">Other Brands</h4>
            <ul className="space-y-6">
              {points.map((p, i) => (
                <li key={i} className="flex gap-4 items-start text-gray-600">
                  <XCircle className="w-6 h-6 text-red-300 shrink-0" />
                  <span className="font-medium text-sm md:text-base leading-tight pt-0.5">{p.other}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 bg-white border-4 border-accent/20 relative"
          >
            <h4 className="text-2xl font-bold font-serif text-primary mb-8 border-b border-gray-100 pb-4 flex items-center gap-3">
              Masaliya 
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-[9px] uppercase font-sans tracking-widest rounded border border-accent/20">The Gold Standard</span>
            </h4>
            <ul className="space-y-6">
              {points.map((p, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                  <span className="font-bold text-primary text-sm md:text-base leading-tight pt-0.5">{p.our}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
