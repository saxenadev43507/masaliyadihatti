"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const suggestions = [
    "Kashmiri Chilli Powder",
    "Shahi Garam Masala",
    "Premium Saffron",
    "Mixed Pickle"
  ];

  return (
    <div className="relative w-full">
      <div 
        className="flex items-center w-full bg-white border border-gray-200 rounded-full overflow-hidden transition-all duration-300 focus-within:ring-4 focus-within:ring-accent/10 focus-within:border-accent shadow-sm"
      >
        <div className="pl-5 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input 
          type="text" 
          placeholder="Search spices, blends, brands..."
          className="w-full px-4 py-3 text-sm text-gray-700 outline-none placeholder-gray-400 font-medium"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        <button className="bg-accent hover:bg-accent-hover text-white px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300">
          Search
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden z-[110] text-sm"
          >
            <div className="p-4 bg-gray-50/50 border-b border-gray-100">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Popular Searches</span>
            </div>
            <ul className="py-2">
              {suggestions.map((s, i) => (
                <li key={i} className="px-6 py-4 hover:bg-accent/5 cursor-pointer text-gray-700 flex items-center justify-between group transition-colors">
                  <span className="font-medium">{s}</span>
                  <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
