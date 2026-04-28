"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function Recipes() {
  const recipes = [
    { title: "Authentic Punjabi Rajma Chawal", time: "45 Mins", type: "Main Course", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Restaurant Style Shahi Paneer", time: "30 Mins", type: "Rich Gravy", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Classic Hyderabadi Dum Biryani", time: "1 Hr 15 Mins", type: "Weekend Special", img: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-[9px] mb-2 block font-sans">Kitchen Inspiration</span>
            <h3 className="text-xl md:text-2xl font-serif font-black text-primary mb-4 tracking-tight">Recipes & Use Cases</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-accent to-accent-hover rounded-full"></div>
          </div>
          <button className="bg-white border border-gray-200 hover:border-accent shadow-sm text-primary hover:bg-gray-50 font-bold uppercase tracking-wider py-3 px-8 rounded transition-all text-sm h-fit">
            Explore All Recipes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((r, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="relative w-full h-72 overflow-hidden">
                <img src={r.img} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  {r.time}
                </div>
                <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-accent shadow-sm">
                  {r.type}
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif font-bold text-primary mb-4 group-hover:text-accent transition-colors leading-tight">
                  {r.title}
                </h4>
                <div className="flex items-center text-accent font-bold text-sm uppercase tracking-wider group-hover:gap-3 gap-2 transition-all">
                  Cook Now 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
