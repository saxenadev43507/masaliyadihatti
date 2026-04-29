"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Leaf, Heart, Shield, Crown, Clock, MapPin, Star } from 'lucide-react';

const timeline = [
  { year: "1928", title: "The Beginning", desc: "Founded in the bustling spice markets of Old Delhi, our journey started with a single shop and an unwavering commitment to purity." },
  { year: "1965", title: "Growing Legacy", desc: "Expanded our range to over 50 hand-crafted spice blends, earning the trust of generations of families." },
  { year: "1998", title: "Modern Innovation", desc: "Adopted state-of-the-art cold-grinding technology while preserving traditional recipes and processes." },
  { year: "2020", title: "Going Global", desc: "Launched Masaliya Di Hatti to bring authentic Indian spices to homes across Australia and beyond." },
  { year: "2024", title: "Premium Heritage", desc: "Partnered with iconic brands like Roopak, Shan-E-Delhi, Nawab Secret, and Noori to offer the finest collections." },
];

const values = [
  { icon: <Shield className="w-7 h-7" />, title: "Authenticity", desc: "Every spice is sourced directly from heritage farms and traditional growers across India." },
  { icon: <Leaf className="w-7 h-7" />, title: "Purity", desc: "No artificial colors, no fillers, no preservatives — just pure, unadulterated spices." },
  { icon: <Crown className="w-7 h-7" />, title: "Heritage", desc: "Recipes passed down through generations of master spice blenders since 1928." },
  { icon: <Award className="w-7 h-7" />, title: "Quality", desc: "FSSAI certified with rigorous quality checks at every stage of production." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24 mb-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-accent rounded-full blur-[200px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.8 }}>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">Our Heritage</span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-primary mb-6 tracking-tight">
              About <span className="text-accent">Masaliya</span>
            </h1>
            <p className="text-gray-500 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
              For nearly a century, we have been the custodians of India&apos;s finest spice traditions. From the narrow lanes of Old Delhi&apos;s Khari Baoli — the largest spice market in Asia — to your kitchen in Australia, we bring you the luxury of authentic flavors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">Since 1928</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-primary mb-6 tracking-tight">
              A Legacy of <span className="text-accent">Pure Flavors</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Masaliya Di Hatti — which translates to &quot;The Spice Shop&quot; — was born from a deep reverence for India&apos;s culinary heritage. Our founders believed that the soul of every great dish lies in the quality and authenticity of its spices.
              </p>
              <p>
                Today, we partner with legendary spice houses like <strong className="text-primary">Roopak</strong> (Since 1958), <strong className="text-primary">Shan-E-Delhi</strong>, <strong className="text-primary">Nawab&apos;s Secret</strong>, and <strong className="text-primary">Noori</strong> (Since 1928) to bring their century-old recipes to the Australian market.
              </p>
              <p>
                Every spice in our collection is carefully sourced, traditionally cold-ground to preserve essential oils and aroma, and securely packed to deliver the truest royal flavors right to your meals.
              </p>
            </div>
          </motion.div>

          {/* Heritage Image Placeholder */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-3xl p-10 border border-accent/10">
              <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <Crown className="w-16 h-16 text-accent mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-serif font-black text-primary/30">Masaliya</h3>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent/50 mt-1">Since 1928</p>
                </div>
              </div>
              {/* Decorative badge */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-2xl flex flex-col items-center justify-center text-white shadow-xl rotate-6">
                <span className="text-2xl font-black">96+</span>
                <span className="text-[8px] font-bold uppercase tracking-wider">Years</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20 mb-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">
              Our <span className="text-accent">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-accent mx-auto mb-5 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 mb-24">
        <div className="text-center mb-14">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">Our Journey</span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">
            Heritage <span className="text-accent">Timeline</span>
          </h2>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px" />
          
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Content */}
              <div className={`flex-1 ml-20 md:ml-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <span className="text-accent font-black text-2xl font-serif">{item.year}</span>
                <h3 className="text-lg font-bold text-primary mt-1 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-md z-10 mt-2" />
              {/* Spacer for opposite side */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10">
            <Star className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-4">
              Experience the <span className="text-accent">Luxury of Spices</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Explore our curated collections and discover why families across Australia trust Masaliya Di Hatti for their authentic spice needs.
            </p>
            <a href="/shop" className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl">
              Shop Now
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
