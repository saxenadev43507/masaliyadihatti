"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Flame,
  Settings,
  Wind,
  ShieldCheck,
  LayoutGrid
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    title: "Premium Ingredients",
    desc: "Hand-picked from the most fertile spice belts of India.",
    icon: <Leaf className="w-6 h-6" />,
    pos: "top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2",
    mobileOrder: 1,
  },
  {
    id: 2,
    title: "Perfect Roasting",
    desc: "Slow-roasted at precise temperatures to unlock essential oils.",
    icon: <Flame className="w-6 h-6" />,
    pos: "top-[20%] right-[5%]",
    mobileOrder: 2,
  },
  {
    id: 3,
    title: "Fine Grinding",
    desc: "Traditional stone-grinding that preserves the natural heat.",
    icon: <Settings className="w-6 h-6" />,
    pos: "bottom-[20%] right-[5%]",
    mobileOrder: 3,
  },
  {
    id: 4,
    title: "Rich Aroma",
    desc: "Cold-processed to ensure the scent stays locked until it hits your pan.",
    icon: <Wind className="w-6 h-6" />,
    pos: "bottom-[15%] left-[50%] -translate-x-1/2 translate-y-1/2",
    mobileOrder: 4,
  },
  {
    id: 5,
    title: "Hygienic Packaging",
    desc: "Multi-layer vacuum sealing for farm-fresh flavor.",
    icon: <ShieldCheck className="w-6 h-6" />,
    pos: "bottom-[20%] left-[5%]",
    mobileOrder: 5,
  },
  {
    id: 6,
    title: "Wide Variety",
    desc: "From daily staples to rare royal kitchen blends.",
    icon: <LayoutGrid className="w-6 h-6" />,
    pos: "top-[20%] left-[5%]",
    mobileOrder: 6,
  },
];

// Pre-computed deterministic particle data to avoid hydration mismatch
const particles = [
  { x: 5, y: 12, opacity: 0.3, duration: 14 },
  { x: 15, y: 45, opacity: 0.2, duration: 18 },
  { x: 25, y: 78, opacity: 0.4, duration: 12 },
  { x: 35, y: 23, opacity: 0.15, duration: 16 },
  { x: 45, y: 56, opacity: 0.35, duration: 11 },
  { x: 55, y: 89, opacity: 0.25, duration: 19 },
  { x: 65, y: 34, opacity: 0.45, duration: 13 },
  { x: 75, y: 67, opacity: 0.1, duration: 17 },
  { x: 85, y: 10, opacity: 0.4, duration: 15 },
  { x: 95, y: 43, opacity: 0.3, duration: 10 },
  { x: 10, y: 76, opacity: 0.2, duration: 20 },
  { x: 20, y: 9, opacity: 0.35, duration: 12 },
  { x: 30, y: 52, opacity: 0.15, duration: 16 },
  { x: 40, y: 85, opacity: 0.45, duration: 14 },
  { x: 50, y: 18, opacity: 0.25, duration: 18 },
  { x: 60, y: 61, opacity: 0.3, duration: 11 },
  { x: 70, y: 94, opacity: 0.1, duration: 19 },
  { x: 80, y: 27, opacity: 0.4, duration: 13 },
  { x: 90, y: 50, opacity: 0.2, duration: 17 },
  { x: 98, y: 73, opacity: 0.35, duration: 15 },
];

export default function ProcessStory() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-28 bg-white text-primary relative overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-transparent to-gray-50 opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]"></div>

        {/* Spice Particles Animation - Only render on client to avoid hydration mismatch */}
        {mounted && particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${p.x}%`,
              y: `${p.y}%`,
              opacity: p.opacity
            }}
            animate={{
              y: [null, "-=100px"],
              opacity: [null, 0.8, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1.5 h-1.5 bg-accent/30 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[9px] mb-2 block">
              The Journey of Purity
            </span>
            <h2 className="text-xl md:text-3xl font-serif font-black text-primary mb-4 tracking-tight">
              From Raw Spices to <span className="text-accent">Rich Flavors</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base italic font-serif">
              "Every pinch crafted with tradition, purity & perfection"
            </p>
          </motion.div>
        </div>

        {/* Desktop Circular Layout */}
        <div className="hidden lg:block relative h-[750px] w-full">
          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-20"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-[0_0_80px_rgba(212,175,55,0.1)] group">
              <img
                src="https://images.unsplash.com/photo-1655740005897-f7db91303b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI4fHxtYXNhbGV8ZW58MHx8MHx8fDA%3D"
                alt="Chef Cooking"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10"></div>

              {/* Spinning Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] border border-dashed border-accent/30 rounded-full"
              />
            </div>
          </motion.div>

          {/* Feature Points */}
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className={`absolute ${step.pos} w-[260px] z-30 group cursor-default`}
            >
              <div className="bg-white/80 backdrop-blur-xl border border-gray-100 p-5 rounded-[2rem] group-hover:border-accent/40 group-hover:bg-white group-hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.15)] transition-all duration-500 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                  <h3 className="font-serif font-black text-lg text-primary">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout (Timeline) */}
        <div className="lg:hidden space-y-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex gap-4"
            >
              <div className="w-10 h-10 bg-accent/20 border border-accent/30 rounded-xl flex items-center justify-center text-accent shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-primary mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
