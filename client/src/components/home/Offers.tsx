"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Offers() {
  return (
    <section className="py-12 md:py-20 bg-white px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gray-50 rounded-[2rem] overflow-hidden p-10 flex flex-col justify-center shadow-md hover:shadow-xl transition-all h-72 border border-gray-100 group cursor-pointer"
        >
          <div className="relative z-10 max-w-[75%] sm:max-w-[65%]">
            <span className="text-accent font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-3 block bg-white w-fit px-3 py-1 rounded-full shadow-sm">Limited Time</span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-primary mb-6 leading-tight">Buy 2 Get 1 Free on Premium Masale</h3>
            <button className="text-xs sm:text-sm border-b-2 border-primary font-bold uppercase tracking-wider pb-1 group-hover:pl-2 group-hover:border-accent transition-all">Claim Offer</button>
          </div>
          {/* Visual element representing spices can go on the right via CSS/Absolute */}
          <div className="absolute -right-10 -top-10 w-48 sm:w-64 h-48 sm:h-64 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-colors"></div>
          <img src="https://plus.unsplash.com/premium_photo-1770051027365-ce9d25aa89ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fG1hc2FsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Pickles" className="absolute -right-10 sm:-right-20 bottom-0 w-40 sm:w-64 h-40 sm:h-64 object-cover rounded-full shadow-2xl opacity-80 group-hover:scale-105 transition-transform duration-700" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-primary text-white rounded-[2rem] overflow-hidden p-10 flex flex-col justify-center shadow-md hover:shadow-xl transition-all h-72 border border-gray-800 group cursor-pointer"
        >
          <div className="relative z-10 max-w-[75%] sm:max-w-[65%]">
            <span className="text-accent font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-3 block bg-white/10 w-fit px-3 py-1 rounded-full">Premium Range</span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black mb-6 leading-tight text-accent">100% Pure Saffron Threads</h3>
            <button className="text-xs sm:text-sm border-b-2 border-accent text-accent font-bold uppercase tracking-wider pb-1 group-hover:pl-2 transition-all">Pre-Order Now</button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 sm:w-64 h-48 sm:h-64 bg-red-500/20 rounded-full blur-3xl group-hover:bg-red-500/30 transition-colors"></div>
          <img src="https://images.unsplash.com/photo-1723879683308-0c8542c02ee4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fG1hc2FsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Saffron" className="absolute -right-10 sm:-right-20 top-1/2 -translate-y-1/2 w-40 sm:w-64 h-40 sm:h-64 object-cover rounded-full shadow-2xl opacity-70 group-hover:scale-105 transition-transform duration-700 mix-blend-screen grayscale" />
        </motion.div>

      </div>
    </section>
  );
}
