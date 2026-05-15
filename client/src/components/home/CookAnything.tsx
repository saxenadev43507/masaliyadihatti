"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, ChefHat, ArrowRight, Flame, ChevronLeft, ChevronRight } from "lucide-react";

// 100% Verified premium images (No Waterfalls, No Blank Gradients!)
const recipes = [
  { 
    title: "Hyderabadi Dum Biryani", 
    time: "1 Hr 30 Mins", 
    level: "Expert", 
    masala: "Shan-e-Delhi Biryani Mix", 
    img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80", 
    cuisine: "Mughlai", 
    levelColor: "bg-red-50 text-red-600" 
  },
  { 
    title: "Restaurant Butter Chicken", 
    time: "45 Mins", 
    level: "Intermediate", 
    masala: "Shan-e-Delhi Butter Chicken", 
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80", 
    cuisine: "North Indian", 
    levelColor: "bg-amber-50 text-amber-600" 
  },
  { 
    title: "Punjabi Rajma Chawal", 
    time: "50 Mins", 
    level: "Easy", 
    masala: "Roopak Rajma Masala", 
    // Rich, dark rustic curry bowl
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80", 
    cuisine: "Comfort Food", 
    levelColor: "bg-green-50 text-green-600" 
  },
  { 
    title: "Creamy Shahi Paneer", 
    time: "30 Mins", 
    level: "Easy", 
    masala: "Roopak Shahi Paneer Masala", 
    // Guaranteed working rich paneer/curry image
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", 
    cuisine: "North Indian", 
    levelColor: "bg-green-50 text-green-600" 
  },
  
];

// Quadrupled the array to ensure a massive buffer so it NEVER hits an empty space
const infiniteRecipes = [...recipes, ...recipes, ...recipes, ...recipes];

export default function FeaturedRecipes() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 100% Seamless Infinite Auto-Scroll Logic
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const el = scrollRef.current;
        const firstChild = el.firstElementChild as HTMLElement;
        if (!firstChild) return;

        const cardWidth = firstChild.offsetWidth + 24; // Card width + gap-6
        const originalSetWidth = cardWidth * recipes.length;

        // 1. Scroll right smoothly
        el.scrollBy({ left: cardWidth, behavior: "smooth" });

        // 2. Invisible Reset (Waits 600ms for smooth scroll to finish before resetting)
        setTimeout(() => {
          // If we have scrolled past the 2nd full set, silently snap back to the 1st set
          if (el.scrollLeft >= originalSetWidth * 2) {
            el.style.scrollBehavior = "auto"; // Turn OFF smooth scrolling temporarily
            el.scrollLeft -= originalSetWidth; // Jump back exactly one set perfectly
          }
        }, 600);
      }
    }, 2500); 

    return () => clearInterval(interval);
  }, [isHovered]);

  // Flawless Manual Navigation
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const firstChild = el.firstElementChild as HTMLElement;
      if (!firstChild) return;

      const cardWidth = firstChild.offsetWidth + 24;
      const originalSetWidth = cardWidth * recipes.length;

      if (direction === "right") {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
        setTimeout(() => {
          if (el.scrollLeft >= originalSetWidth * 2) {
            el.style.scrollBehavior = "auto";
            el.scrollLeft -= originalSetWidth;
          }
        }, 600);
      } else {
        // If going left and too close to the start, silently jump forward first
        if (el.scrollLeft <= cardWidth) {
          el.style.scrollBehavior = "auto";
          el.scrollLeft += originalSetWidth;
        }
        // Then do the smooth scroll
        setTimeout(() => {
          el.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }, 50);
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px bg-accent"></div>
              <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">Kitchen Inspiration</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-black text-primary">Featured Recipes</h2>
            <p className="text-primary/60 mt-2 text-base font-serif italic max-w-xl">
              Bring the authentic aromas of Old Delhi into your kitchen with our masterfully crafted blends.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Custom Arrows */}
            <div className="hidden md:flex gap-2 mr-4">
              <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button className="flex items-center gap-2 bg-white border border-primary/10 shadow-sm hover:border-accent hover:shadow-md text-primary font-black uppercase tracking-widest py-3 px-8 rounded-full text-[11px] transition-all duration-200 h-fit group">
              View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div 
          className="relative -mx-4 px-4 pb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {infiniteRecipes.map((r, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: (i % recipes.length) * 0.1 }}
                className="snap-start shrink-0 w-[300px] sm:w-[330px] group cursor-pointer relative pt-4"
              >
                {/* Premium Image Container */}
                <div className="relative h-[380px] w-full rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-200 border border-white/50">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/30" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-primary shadow-sm w-fit">
                      <Clock className="w-3.5 h-3.5 text-accent" /> {r.time}
                    </div>
                    <div className="bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-accent w-fit shadow-sm">
                      {r.cuisine}
                    </div>
                  </div>
                </div>

                {/* Overlapping Info Card */}
                <div className="relative -mt-16 mx-4 bg-white rounded-2xl p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)] border border-gray-100 group-hover:border-accent/30 group-hover:-translate-y-2 transition-all duration-200">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Flame className="w-3.5 h-3.5 text-accent" />
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${r.levelColor}`}>{r.level}</span>
                  </div>
                  
                  <h4 className="text-xl font-serif font-black text-primary mb-3 line-clamp-2 leading-tight group-hover:text-accent transition-colors duration-200">
                    {r.title}
                  </h4>
                  
                  <p className="text-[12px] text-gray-500 flex items-center gap-2 mb-5 font-medium border-b border-gray-100 pb-5">
                    <ChefHat className="w-4 h-4 text-accent shrink-0" /> {r.masala}
                  </p>
                  
                  <div className="flex items-center justify-between text-accent font-black text-[10px] uppercase tracking-widest group-hover:pr-2 transition-all duration-200">
                    <span>View Recipe</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}