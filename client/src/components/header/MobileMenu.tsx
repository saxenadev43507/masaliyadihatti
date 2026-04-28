"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';

export default function MobileMenu({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const menuStruct = {
    Home: [],
    Shop: ["All Products", "Best Sellers", "New Arrivals"],
    Categories: ["Whole Spices", "Ground Spices", "Blended Masala", "Premium Range"],
    Brands: ["Roopak", "Shan-E-Delhi", "Nawab Secret", "Noori"],
    Wholesale: ["Bulk Orders", "Distributor Enquiry"],
    Recipes: []
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-50 lg:hidden overflow-y-auto flex flex-col border-r border-gray-100 shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
              <h2 className="text-2xl font-serif font-extrabold text-primary">Masaliya</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 p-2 rounded-full hover:bg-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="px-5 py-4 border-b border-gray-100">
               <div className="relative group">
                 <SearchBar />
               </div>
            </div>

            <div className="flex-1 py-4">
              <ul className="space-y-1 px-3">
                {Object.entries(menuStruct).map(([key, items], i) => (
                  <li key={i} className="mb-1">
                    {items.length === 0 ? (
                      <Link href="/" className="block py-3 px-4 text-gray-800 font-bold tracking-wider hover:bg-accent/5 hover:text-accent rounded-lg transition-colors" onClick={() => setIsOpen(false)}>{key}</Link>
                    ) : (
                      <>
                        <button 
                          onClick={() => toggleSection(key)} 
                          className="w-full text-left py-3 px-4 text-gray-800 font-bold tracking-wider hover:bg-accent/5 hover:text-accent rounded-lg transition-colors flex justify-between items-center"
                        >
                          {key}
                          <svg className={`w-4 h-4 transition-transform ${openSection === key ? 'rotate-180 text-accent' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <AnimatePresence>
                          {openSection === key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-gray-50 rounded-lg mx-2 mt-1"
                            >
                              <ul className="py-2 px-6">
                                {items.map((sub, j) => (
                                  <li key={j}>
                                    <Link href="#" className="block py-2 text-gray-600 font-medium hover:text-accent" onClick={() => setIsOpen(false)}>{sub}</Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <Link href="/login" className="block w-full bg-primary hover:bg-accent text-white font-bold uppercase tracking-widest py-3 text-center rounded-lg shadow disabled transition-colors">
                Login / Register
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
