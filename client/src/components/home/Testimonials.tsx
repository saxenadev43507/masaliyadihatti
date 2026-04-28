"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    { name: "Sita Sharma", role: "Home Chef", text: "The aroma of Masaliya's Garam Masala reminds me of my grandmother's kitchen in Lucknow. It is truly authentic and free from any artificial colors.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
    { name: "Rajesh Kumar", role: "Restaurant Owner", text: "We switched to Masaliya for our premium curries and the feedback from customers has been outstanding. You can tell they cold-grind their spices.", rating: 5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" },
    { name: "Anjali Desai", role: "Food Blogger", text: "Their Garam Masala is potent! You only need half a teaspoon compared to regular brands. It is visually richer and the aroma hits you the moment you open the jar.", rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop" }
  ];

  return (
    <section className="py-10 px-4 bg-white text-primary relative overflow-hidden">
      {/* Decorative backdrop elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="text-accent font-bold uppercase tracking-widest text-[9px] mb-2 block font-sans">Wall of Love</span>
          <h3 className="text-xl md:text-2xl font-serif font-black text-primary mb-4 tracking-tight">What Families Say</h3>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-gray-50/50 backdrop-blur-lg border border-gray-100 p-8 rounded-[2.5rem] relative group hover:bg-white hover:shadow-2xl hover:border-accent/20 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-accent/10 group-hover:text-accent/20 transition-colors" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-gray-600 font-serif italic text-base leading-relaxed mb-8 relative z-10">
                "{r.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full border-2 border-accent/20 object-cover" />
                <div>
                  <h4 className="font-black text-primary text-sm">{r.name}</h4>
                  <p className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
