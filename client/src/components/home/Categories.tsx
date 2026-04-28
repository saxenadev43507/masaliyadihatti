"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Categories() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-2 font-sans">Our Collections</span>
            <h3 className="text-xl md:text-2xl font-serif font-black text-primary mb-4 tracking-tight">Shop by Category</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-hover rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-xl font-medium">Explore our diverse collection of 100% pure spices, tailored for every culinary need and tradition.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          {/* Left Large Card - Blended Spices */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative lg:col-span-5 h-[450px] lg:h-full rounded-3xl overflow-hidden shadow-xl cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Blended Spices"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/50 z-10"></div>

            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 transition-transform duration-500 group-hover:-translate-y-4">
              <span className="text-accent uppercase tracking-widest text-xs font-bold mb-2">Signature Blends</span>
              <h4 className="text-white text-3xl md:text-4xl font-serif font-extrabold mb-3 drop-shadow-lg">Blended Spices</h4>
              <p className="text-gray-200 text-sm md:text-base mb-6 max-w-sm drop-shadow-md opacity-90">Discover the perfect harmony of stone-ground spices crafted for authentic Indian curries.</p>

              <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <span className="inline-flex items-center gap-2 text-white font-bold tracking-wider uppercase text-sm border-b border-accent pb-1 hover:text-accent transition-colors">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Container */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full">
            {/* Right Top - Whole Spices */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative h-[250px] lg:h-[288px] rounded-3xl overflow-hidden shadow-xl cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Whole Spices"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/40 z-10"></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 transition-transform duration-500 group-hover:-translate-y-3">
                <span className="text-accent uppercase tracking-widest text-xs font-bold mb-2">Raw & Pure</span>
                <h4 className="text-white text-2xl md:text-3xl font-serif font-extrabold mb-2 drop-shadow-lg">Whole Spices</h4>
                <p className="text-gray-200 text-sm mb-4 max-w-md drop-shadow-md opacity-90">Premium raw spices directly from the source, preserving natural essential oils.</p>

                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <span className="inline-flex items-center gap-2 text-white font-bold tracking-wider uppercase text-sm border-b border-transparent hover:border-accent pb-1 hover:text-accent transition-colors">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Bottom Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              {/* Bottom Left - Pickles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group relative h-[250px] lg:h-full rounded-3xl overflow-hidden shadow-xl cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1591465001609-ded6360ecaab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFzYWxlfGVufDB8fDB8fHww"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt="Pickles"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-black/30 to-transparent transition-all duration-500 group-hover:from-primary group-hover:via-black/50 z-10"></div>

                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 transition-transform duration-500 group-hover:-translate-y-3">
                  <h4 className="text-white text-xl md:text-2xl font-serif font-extrabold mb-2 drop-shadow-lg">Premium Masale</h4>
                  <p className="text-gray-200 text-xs mb-4 drop-shadow-md opacity-90">Traditional authentic recipes preserved to perfection.</p>

                  <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <span className="inline-flex items-center gap-2 text-white font-bold tracking-wider uppercase text-xs hover:text-accent transition-colors">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Right - Premium Range */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group relative h-[250px] lg:h-full rounded-3xl overflow-hidden shadow-xl cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt="Premium Range"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/50 z-10"></div>

                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 transition-transform duration-500 group-hover:-translate-y-3">
                  <h4 className="text-accent text-xl md:text-2xl font-serif font-extrabold mb-2 drop-shadow-lg">Premium Range</h4>
                  <p className="text-gray-200 text-xs mb-4 drop-shadow-md opacity-90">Exclusive exotic flavors & pure saffron threads.</p>

                  <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <span className="inline-flex items-center gap-2 text-accent font-bold tracking-wider uppercase text-xs hover:text-white transition-colors">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
