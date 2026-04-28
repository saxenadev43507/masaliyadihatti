"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

const slides = [
  {
    brand: "Noori Masale",
    tagline: "Estd. 1928 · Premium Heritage",
    title: "Authentic Flavour,",
    titleAccent: "Since 1928",
    description:
      "From Karhai Gosht to Chicken Changezi — Noori's premium masala blends bring the true taste of traditional Indian cooking straight to your kitchen.",
    cta: "Explore Noori",
    image: "/Banner%20images/noorii.png",
    bgMode: "split",
    bgFrom: "#0a0a0a",
    bgTo: "#1a1a1a",
    accentColor: "#D4AF37",
    textColor: "text-white",
    descColor: "text-white/70",
    badgeBg: "bg-accent/20 border-accent/40 text-accent",
  },
  {
    brand: "Nawaabs Secret",
    tagline: "Indian Street Food · Bold & Royal",
    title: "Street Food,",
    titleAccent: "Royal Style",
    description:
      "Wraps, burgers, and bites packed with bold, fiery flavours of India's streets. Nawaabs brings the street to your plate — vibrant, fresh, and unforgettable.",
    cta: "Discover Nawaabs",
    image: "/Banner%20images/Nawaab%27s%20secret.jpeg",
    bgMode: "fullbleed",
    bgFrom: "#1c120a",
    bgTo: "#2d1b0e",
    accentColor: "#e67e22",
    textColor: "text-white",
    descColor: "text-white/80",
    badgeBg: "bg-orange-500/20 border-orange-500/40 text-orange-400",
    overlay: "from-black via-black/60 to-transparent",
  },
  {
    brand: "Shan e Delhi",
    tagline: "Heritage Flavours · Delhi's Finest",
    title: "The Soul of",
    titleAccent: "Delhi's Kitchen",
    description:
      "Crafted from age-old recipes passed down through Delhi's legendary kitchens — pure, aromatic spices that bring the soul of the capital to every meal.",
    cta: "Explore Shan e Delhi",
    image: "/Banner%20images/Shan%20e%20delhi.jpg",
    bgMode: "fullbleed",
    bgFrom: "#0f1410",
    bgTo: "#1a241c",
    accentColor: "#c0a080",
    textColor: "text-white",
    descColor: "text-white/75",
    badgeBg: "bg-stone-500/20 border-stone-500/40 text-stone-300",
    overlay: "from-[#0f1410] via-[#0f1410]/70 to-transparent",
  },
  {
    brand: "Star Spices",
    tagline: "Best Tastes Blended Together",
    title: "Every Blend,",
    titleAccent: "Perfected",
    description:
      "From Pav Bhaji to Biryani Pulav — Star Spices offers a complete range of laboratory-tested, ISO-certified masalas trusted across the globe.",
    cta: "Shop Star Spices",
    image: "/Banner%20images/starmasale-removebg-preview.png",
    bgMode: "split",
    bgFrom: "#0a121c",
    bgTo: "#121d2b",
    accentColor: "#f1c40f",
    textColor: "text-white",
    descColor: "text-white/70",
    badgeBg: "bg-blue-500/20 border-blue-500/40 text-blue-300",
  },
  {
    brand: "Roopak",
    tagline: "Since 1958 · Premium Quality",
    title: "Trusted for",
    titleAccent: "Generations",
    description:
      "Roopak's iconic masala jars — Rajma, Kala Chat, Punjabi Cholle and more — have been the cornerstone of authentic Indian home cooking since 1958.",
    cta: "Browse Roopak",
    image: "/Banner%20images/roopakk-removebg-preview.png",
    bgMode: "split",
    bgFrom: "#0a1a1a",
    bgTo: "#122626",
    accentColor: "#3498db",
    textColor: "text-white",
    descColor: "text-white/70",
    badgeBg: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300",
  },
];

const SLIDE_DURATION = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  const slide = slides[current];

  return (
    <section 
      className="relative h-[400px] sm:h-[480px] lg:h-[550px] w-full overflow-hidden flex flex-col bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── DYNAMIC BACKGROUND LAYER ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {slide.bgMode === "fullbleed" ? (
            <div className="absolute inset-0">
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt={slide.brand}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
            </div>
          ) : (
            <div 
              className="w-full h-full"
              style={{ background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)` }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      {/* ─── STRICT UNIFORM CONTENT CONTAINER ─── */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* TEXT CONTENT - ABSOLUTELY POSITIONED FOR STABILITY */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-12 w-[85%] sm:w-[60%] lg:w-[45%] z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className={`${slide.textColor} flex flex-col items-start text-left`}
            >
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${slide.badgeBg} text-[9px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm backdrop-blur-md`}>
                <Star className="w-3 h-3 fill-current" />
                {slide.tagline}
              </span>

              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif font-black mb-2 tracking-tight leading-[1.1]">
                {slide.title} <br />
                <span style={{ color: slide.accentColor }} className="italic drop-shadow-md">{slide.titleAccent}</span>
              </h1>

              <p className={`${slide.descColor} text-[10px] sm:text-xs lg:text-sm mb-4 max-w-sm leading-relaxed font-serif italic`}>
                {slide.description}
              </p>

              <button 
                className="group flex items-center gap-2 text-white font-bold text-[10px] lg:text-xs uppercase tracking-widest py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl"
                style={{ backgroundColor: slide.accentColor }}
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* IMAGE CONTENT - FOR SPLIT MODE */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center z-20">
          {slide.bgMode === "split" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${current}`}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div 
                  className="absolute inset-0 w-[400px] h-[400px] blur-[100px] opacity-20 mx-auto"
                  style={{ backgroundColor: slide.accentColor }}
                />
                <img
                  src={slide.image}
                  alt={slide.brand}
                  className="relative z-10 max-h-[450px] w-auto object-contain transition-transform duration-700 hover:scale-105"
                  style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.4))" }}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* ─── ARROW CONTROLS (Positioned Higher) ─── */}
      <div className="absolute bottom-4 right-6 lg:right-12 z-30 flex gap-2">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ─── DOT INDICATORS (Positioned Higher) ─── */}
      <div className="absolute bottom-4 left-6 lg:left-12 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              current === i ? "w-10" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
            style={{ backgroundColor: current === i ? slide.accentColor : undefined }}
          />
        ))}
      </div>
    </section>
  );
}
