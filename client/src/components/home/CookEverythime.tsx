"use client";



import React from "react";

import { motion } from "framer-motion";

import {

  UtensilsCrossed,

  Flame,

  Beef,

  Store,

  Crown,

  Leaf,

} from "lucide-react";



const categories = [

  {

    id: 1,

    title: "Everyday Cooking",

    subtitle: "Daily Dal & Sabzi essentials.",

    tagline: "The Daily",

    icon: <UtensilsCrossed className="w-5 h-5" />,

  },

  {

    id: 2,

    title: "Indian Classics",

    subtitle: "Rajma, Chole & Paneer blends.",

    tagline: "Traditions",

    icon: <Flame className="w-5 h-5" />,

  },

  {

    id: 3,

    title: "Non-Veg Specials",

    subtitle: "Spices for Biryani & Meats.",

    tagline: "The Feast",

    icon: <Beef className="w-5 h-5" />,

  },

  {

    id: 4,

    title: "Street Style",

    subtitle: "Kicks for Chaat & Pav Bhaji.",

    tagline: "The Twist",

    icon: <Store className="w-5 h-5" />,

  },

  {

    id: 5,

    title: "Premium & Mughlai",

    subtitle: "Secrets for Kormas & Kebabs.",

    tagline: "Royal",

    icon: <Crown className="w-5 h-5" />,

  },

  {

    id: 6,

    title: "Healthy & Light",

    subtitle: "Spices for Salads & Detox.",

    tagline: "Wellness",

    icon: <Leaf className="w-5 h-5" />,

  },

];



export default function CookAnything() {

  return (

    <section className="py-8 bg-white">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header Section */}

        <motion.div

          initial={{ opacity: 0, y: 15 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6"

        >

          <div className="max-w-2xl">

            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[8px] mb-1 block">

              Culinary Inspiration

            </span>

            <h2 className="text-xl md:text-2xl font-serif font-black text-primary tracking-tight leading-tight">

              Cook Anything You Love 🍛

            </h2>

            <p className="text-gray-600 mt-2 text-base md:text-lg font-serif italic">

              Explore spices for every recipe & mood

            </p>

          </div>

         

          <div className="hidden lg:flex gap-3 items-center text-gray-500 font-bold text-[10px] uppercase tracking-widest">

            <div className="w-8 h-[1px] bg-gray-200"></div>

            <span>6 Signature Collections</span>

          </div>

        </motion.div>



        {/* Guaranteed 6-Column Grid for Desktop */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">

          {categories.map((cat, idx) => (

            <motion.div

              key={cat.id}

              initial={{ opacity: 0, y: 20 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              transition={{ delay: idx * 0.05, duration: 0.4 }}

              className="relative h-[210px] rounded-[2rem] bg-white border border-gray-100 p-5 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 overflow-hidden"

            >

              <div className="relative z-10">

                <div className="w-9 h-9 rounded-xl bg-accent/10 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 text-accent">

                  {cat.icon}

                </div>

               

                <span className="text-[8px] font-black uppercase tracking-[0.2em] mb-1 block opacity-60 text-accent">

                  {cat.tagline}

                </span>

                <h3 className="text-base font-serif font-black text-primary leading-tight">

                  {cat.title}

                </h3>

              </div>



              <div className="relative z-10">

                <p className="text-gray-600 text-[10px] leading-relaxed font-medium">

                  {cat.subtitle}

                </p>

              </div>



              {/* Hover reveal gradient effect */}

              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

}