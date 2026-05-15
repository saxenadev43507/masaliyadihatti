"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star, ShieldCheck } from "lucide-react";

interface Slide {
  brand: string;
  tagline: string;
  title: string;
  titleAccent: string;
  description: string;
  cta: string;
  image: string;
  bgMode: "split" | "fullbleed";
  bgFrom: string;
  bgTo: string;
  accentColor: string;
  textColor: string;
  descColor: string;
  badgeBg: string;
  overlay?: string;
  imageClass?: string;
  trustBadge?: string;
}

const slides: Slide[] = [
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
    bgFrom: "#1c0505",
    bgTo: "#2d0a0a",
    accentColor: "#D4AF37",
    textColor: "text-white",
    descColor: "text-white/70",
    badgeBg: "bg-accent/20 border-accent/40 text-accent",
    trustBadge: "Over 95 Years of Heritage",
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
    overlay: "from-black via-black/70 to-transparent",
    trustBadge: "Authentic Street Flavours",
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
    accentColor: "#c8a882",
    textColor: "text-white",
    descColor: "text-white/75",
    badgeBg: "bg-stone-500/20 border-stone-500/40 text-stone-300",
    overlay: "from-[#0f1410] via-[#0f1410]/75 to-transparent",
    trustBadge: "Old Delhi's Finest Recipes",
  },
  {
    brand: "Star Spices",
    tagline: "Heritage and Purity Blended Together",
    title: "Every Blend,",
    titleAccent: "Perfected",
    description:
      "A complete range of laboratory-tested, ISO-certified professional blends trusted across the globe.",
    cta: "Shop Star Spices",
    // This is a verified, highly stable Unsplash URL
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80", 
    bgMode: "fullbleed", 
    bgFrom: "#0a121c",
    bgTo: "#121d2b",
    accentColor: "#f1c40f",
    textColor: "text-white",
    descColor: "text-white/80",
    badgeBg: "bg-blue-500/20 border-blue-500/40 text-blue-300",
    overlay: "from-[#0a121c] via-[#0a121c]/80 to-transparent",
    trustBadge: "ISO Certified Quality",
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
    trustBadge: "60+ Years of Trust",
  },
];

const SLIDE_DURATION = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (isHovered) return;
    setProgress(0);
    const tick = 50;
    progressInterval.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + (tick / SLIDE_DURATION) * 100;
      });
    }, tick);
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [next, isHovered, current]);

  const slide = slides[current];

  return (
    <section
      className="relative h-[440px] sm:h-[500px] lg:h-[580px] w-full overflow-hidden flex flex-col bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── DYNAMIC BACKGROUND ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          {slide.bgMode === "fullbleed" ? (
            <div className="absolute inset-0">
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt={slide.brand}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`}
              />
            </div>
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`,
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dot texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ─── CONTENT ─── */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* TEXT */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-12 w-[88%] sm:w-[62%] lg:w-[46%] z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, x: -28, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`${slide.textColor} flex flex-col items-start text-left`}
            >
              {/* Trust signal */}
              {slide.trustBadge && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span
                    className="text-[9px] font-black uppercase tracking-[0.25em]"
                    style={{ color: slide.accentColor }}
                  >
                    {slide.trustBadge}
                  </span>
                </motion.div>
              )}

              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${slide.badgeBg} text-[9px] font-black uppercase tracking-[0.2em] mb-5 shadow-sm backdrop-blur-md`}
              >
                <Star className="w-3 h-3 fill-current" />
                {slide.tagline}
              </motion.span>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-serif font-black mb-3 tracking-tight leading-[1.08]"
              >
                {slide.title} <br />
                <span
                  style={{ color: slide.accentColor }}
                  className="italic drop-shadow-lg"
                >
                  {slide.titleAccent}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className={`${slide.descColor} text-xs sm:text-sm lg:text-[0.92rem] mb-7 max-w-[420px] leading-relaxed font-serif italic`}
              >
                {slide.description}
              </motion.p>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
                className="group flex items-center gap-2.5 text-white font-black text-[11px] lg:text-xs uppercase tracking-widest py-3.5 px-9 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
                style={{
                  backgroundColor: slide.accentColor,
                  boxShadow: `0 12px 36px -8px ${slide.accentColor}60`,
                }}
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* IMAGE (split mode only) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center z-20 overflow-hidden">
          {slide.bgMode === "split" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${current}`}
                initial={{ opacity: 0, scale: 0.92, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <div
                  className="absolute inset-0 w-[420px] h-[420px] blur-[120px] opacity-25 mx-auto"
                  style={{ backgroundColor: slide.accentColor }}
                />
                <img
                  src={slide.image}
                  alt={slide.brand}
                  className={`relative z-10 ${
                    slide.imageClass
                      ? slide.imageClass
                      : "max-h-[480px] w-auto object-contain"
                  }`}
                  style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.45))" }}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* ─── BOTTOM BAR: Dots + Progress + Arrows ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 lg:px-12 pb-5">
        {/* Slide indicators */}
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setProgress(0); }}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
              style={{ width: current === i ? 44 : 14 }}
            >
              <span
                className="absolute inset-0 rounded-full opacity-30"
                style={{ backgroundColor: slide.accentColor }}
              />
              {current === i && (
                <motion.span
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    backgroundColor: slide.accentColor,
                    width: `${progress}%`,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Counter + Arrows */}
        <div className="flex items-center gap-3">
          <span className="text-white/50 text-[10px] font-bold tracking-widest hidden sm:block">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}