"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [isFaqOpen, setIsFaqOpen] = useState<number | null>(0);

  const faqs = [
    { q: "Are your spices 100% natural and organic?", a: "Yes, we source directly from traditional farms ensuring zero adulteration and no artificial food colors." },
    { q: "How long is the delivery time?", a: "We dispatch within 24 hours. Delivery takes 2-4 days for metro cities and 4-7 days for the rest of India." },
    { q: "Do you ship internationally?", a: "Currently, we only ship across India, but international shipping is launching soon!" },
    { q: "What is the shelf life of the blended spices?", a: "Our spices are fresh ground and securely packed. They have a shelf life of 12 months if kept in an airtight container." }
  ];

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-accent font-bold uppercase tracking-widest text-[9px] mb-2 block font-sans">Clear Doubts</span>
          <h3 className="text-xl md:text-2xl font-serif font-black text-primary mb-4 tracking-tight">Frequently Asked Questions</h3>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} 
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <button 
                onClick={() => setIsFaqOpen(isFaqOpen === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center bg-white hover:bg-accent/5 transition-colors focus:outline-none"
              >
                <span className="font-bold text-primary pr-8 text-lg">{faq.q}</span>
                <span className={`transform transition-transform duration-300 text-accent ${isFaqOpen === index ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-6 h-6" />
                </span>
              </button>
              {isFaqOpen === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-6 pt-2 text-gray-600 bg-white leading-relaxed font-medium"
                >
                  <p className="border-t border-gray-100 pt-4">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
