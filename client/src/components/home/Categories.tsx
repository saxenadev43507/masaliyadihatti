"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Categories() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-9 gap-3">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center">
            <span className="text-accent font-black uppercase tracking-widest text-[10px] mb-2">Our Collections</span>
            <h3 className="text-xl md:text-2xl font-serif font-black text-primary mb-3">Shop by Category</h3>
            <div className="w-14 h-[3px] bg-gradient-to-r from-accent to-accent-hover rounded-full mb-4" />
            <p className="text-primary/50 max-w-lg font-medium text-sm">
              Explore our diverse collection of 100% pure spices, tailored for every culinary need.
            </p>
          </motion.div>
        </div>

        {/* Main 2-row grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          {/* Left large — Blended Spices */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="group relative lg:col-span-5 h-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg cursor-pointer">
            <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Blended Spices" />
            {/* Changed from primary to black */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 transition-transform duration-400 group-hover:-translate-y-3">
              <span className="text-accent uppercase tracking-widest text-[9px] font-black mb-1.5">Signature Blends</span>
              <h4 className="text-white text-3xl font-serif font-extrabold mb-2 drop-shadow-lg">Blended Spices</h4>
              <p className="text-white/70 text-sm mb-5 max-w-xs">Stone-ground spices crafted for authentic Indian curries.</p>
              <span className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-accent pb-0.5 w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Whole Spices */}
            <motion.div initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }}
              className="group relative h-[240px] lg:h-[255px] rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <img src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Whole Spices" />
              {/* Changed from primary to black */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <div className="absolute inset-0 p-7 flex flex-col justify-end z-20 group-hover:-translate-y-2 transition-transform duration-400">
                <span className="text-accent uppercase tracking-widest text-[9px] font-black mb-1">Raw & Pure</span>
                <h4 className="text-white text-2xl font-serif font-extrabold mb-1.5">Whole Spices</h4>
                <p className="text-white/65 text-xs mb-4">Premium raw spices preserving natural essential oils.</p>
                <span className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-accent/60 pb-0.5 w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>

            {/* Bottom row — 2 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
              {/* Premium Masale */}
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2 }}
                className="group relative h-[220px] lg:h-full rounded-2xl overflow-hidden shadow-lg cursor-pointer">
                <img src="https://images.unsplash.com/photo-1591465001609-ded6360ecaab?w=600&auto=format&fit=crop&q=60"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Masale" />
                {/* Changed from primary to black */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end z-20 group-hover:-translate-y-2 transition-transform duration-400">
                  <h4 className="text-white text-xl font-serif font-extrabold mb-1">Premium Masale</h4>
                  <p className="text-white/60 text-[11px] mb-3">Traditional authentic recipes.</p>
                  <span className="inline-flex items-center gap-1.5 text-accent text-[11px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>

              {/* Recipes */}
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.28 }}
                className="group relative h-[220px] lg:h-full rounded-2xl overflow-hidden shadow-lg cursor-pointer">
                <img src="https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Recipes" />
                {/* Changed from primary to black */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end z-20 group-hover:-translate-y-2 transition-transform duration-400">
                  <h4 className="text-accent text-xl font-serif font-extrabold mb-1">Recipes</h4>
                  <p className="text-white/60 text-[11px] mb-3">Cook with our premium masale.</p>
                  <span className="inline-flex items-center gap-1.5 text-accent text-[11px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    View Recipes <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bundle deal banner */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
          className="group relative h-[130px] rounded-2xl overflow-hidden cursor-pointer border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
          {/* Changed from primary gradient to a sleek dark slate/gray gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800" />
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1200&q=60" className="w-full h-full object-cover mix-blend-luminosity" alt="" />
          </div>
          <div className="relative z-10 h-full flex items-center justify-between px-8 md:px-12">
            <div>
              <span className="text-accent text-[9px] font-black uppercase tracking-[0.4em] mb-1.5 block">New</span>
              <h4 className="text-white text-xl md:text-2xl font-serif font-black">Bundle Deals — Mix & Save Up to 25%</h4>
              <p className="text-white/50 text-xs mt-0.5">Starter kits, biryani packs, non-veg bundles & custom gift boxes.</p>
            </div>
            <span className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-black text-[11px] uppercase tracking-widest px-6 py-3 rounded-xl transition-colors shrink-0">
              Shop Bundles <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}