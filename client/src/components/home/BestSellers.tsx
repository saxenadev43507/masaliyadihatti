"use client";

import React from "react";
import ProductCard from "@/components/products/ProductCard";
import { ArrowRight } from "lucide-react";

// Importing 20 products from Roopak and Shan-e-Delhi
import shahiGaramMasalaImg from "@/components/products/Roopak veg/Shahi Garam Masala.jpg";
import kashmiriMirchImg from "@/components/products/Roopak veg/Red Chilli Kashmiri Powder.jpg";
import punjabiCholeImg from "@/components/products/Roopak veg/Punjabi Chole Masala.jpg";
import rajmaMasalaImg from "@/components/products/Roopak veg/Rajma Masala.jpg";
import pavBhajiImg from "@/components/products/Roopak veg/PAV BHAJI MASALA.jpg";
import dalMakhaniImg from "@/components/products/Roopak veg/Dal Makhani Masala.jpg";
import shahiPaneerImg from "@/components/products/Roopak veg/Shahi Paneer Masala.jpg";
import sambarMasalaImg from "@/components/products/Roopak veg/Sambar Masala Powder.jpg";
import biryaniRiceImg from "@/components/products/Roopak veg/Biryani Rice Masala.jpg";
import dahiBhallaImg from "@/components/products/Roopak veg/DAHI BHALLA MASALA.jpg";

import butterChickenImg from "@/components/products/Shan e delhi Pics/butter-chicken-image.jpg";
import chickenTikkaImg from "@/components/products/Shan e delhi Pics/chicken-tikka-image.jpg";
import muttonQuormaImg from "@/components/products/Shan e delhi Pics/mutton-quorma-masala.jpg";
import nihariMasalaImg from "@/components/products/Shan e delhi Pics/nihari-masala.jpg";
import roghanJoshImg from "@/components/products/Shan e delhi Pics/roghan-josh-image.jpg";
import seekhKababImg from "@/components/products/Shan e delhi Pics/seekh-kabab-image.jpg";
import tandooriChickenImg from "@/components/products/Shan e delhi Pics/tandoori-chicken-masala.jpg";
import yakhniBiryaniImg from "@/components/products/Shan e delhi Pics/Yakhni-Biryani-Masala.jpg";
import fruitChatImg from "@/components/products/Shan e delhi Pics/Fruit Chat Masala.jpg";
import subziMasalaImg from "@/components/products/Shan e delhi Pics/SubziMasala.jpg";

import { useState } from "react";

const products = [
  { title: "Shahi Garam Masala", brand: "Roopak", price: "$6.99 AUD", rating: 4.8, tags: ["Royal", "Aromatic"], image: shahiGaramMasalaImg.src, desc: "Perfect for Sunday paneer & royal curries" },
  { title: "Kashmiri Lal Mirch", brand: "Roopak", price: "$5.49 AUD", rating: 4.9, tags: ["Mild", "Rich Color"], image: kashmiriMirchImg.src, desc: "Vibrant red hue without the heat." },
  { title: "Punjabi Chole", brand: "Roopak", price: "$4.99 AUD", rating: 5.0, tags: ["Authentic", "Veg"], image: punjabiCholeImg.src, desc: "The secret to true Old Delhi style chole." },
  { title: "Butter Chicken", brand: "Shan-e-Delhi", price: "$5.99 AUD", rating: 4.9, tags: ["Best Seller", "Non-Veg"], image: butterChickenImg.src, desc: "Restaurant-style creamy curry at home." },
  { title: "Rajma Masala", brand: "Roopak", price: "$4.49 AUD", rating: 4.7, tags: ["Classic", "Veg"], image: rajmaMasalaImg.src, desc: "Traditional North Indian comfort food blend." },
  { title: "Mutton Quorma", brand: "Shan-e-Delhi", price: "$7.49 AUD", rating: 4.8, tags: ["Premium", "Rich"], image: muttonQuormaImg.src, desc: "Slow-cooked essence for royal meats." },
  { title: "Dal Makhani", brand: "Roopak", price: "$5.25 AUD", rating: 4.9, tags: ["Creamy", "Veg"], image: dalMakhaniImg.src, desc: "Authentic buttery richness for black lentils." },
  { title: "Chicken Tikka", brand: "Shan-e-Delhi", price: "$6.25 AUD", rating: 4.8, tags: ["Tandoori", "Spicy"], image: chickenTikkaImg.src, desc: "Perfectly balanced charcoal-grilled flavor." },
  { title: "Shahi Paneer", brand: "Roopak", price: "$5.99 AUD", rating: 4.9, tags: ["Creamy", "Royal"], image: shahiPaneerImg.src, desc: "A velvety blend for your festive paneer." },
  { title: "Nihari Masala", brand: "Shan-e-Delhi", price: "$6.99 AUD", rating: 4.9, tags: ["Slow Cook", "Expert"], image: nihariMasalaImg.src, desc: "The legendary breakfast stew spice mix." },
  { title: "PAV BHAJI MASALA", brand: "Roopak", price: "$3.99 AUD", rating: 4.8, tags: ["Street Style", "Veg"], image: pavBhajiImg.src, desc: "Bring the streets of Mumbai to your table." },
  { title: "Roghan Josh", brand: "Shan-e-Delhi", price: "$7.25 AUD", rating: 5.0, tags: ["Kashmiri", "Mild"], image: roghanJoshImg.src, desc: "Vibrant red & aromatic mutton specialty." },
  { title: "Sambar Masala", brand: "Roopak", price: "$3.99 AUD", rating: 4.7, tags: ["South Indian", "Tangy"], image: sambarMasalaImg.src, desc: "Authentic coastal blend for daily lentils." },
  { title: "Seekh Kabab", brand: "Shan-e-Delhi", price: "$6.49 AUD", rating: 4.8, tags: ["Grilled", "Juicy"], image: seekhKababImg.src, desc: "Professional kabab seasoning for perfection." },
  { title: "Biryani Rice", brand: "Roopak", price: "$5.49 AUD", rating: 4.9, tags: ["Fragrant", "Royal"], image: biryaniRiceImg.src, desc: "Long-grain aroma in every single pinch." },
  { title: "Tandoori Chicken", brand: "Shan-e-Delhi", price: "$6.99 AUD", rating: 4.9, tags: ["Oven Style", "Spicy"], image: tandooriChickenImg.src, desc: "Classic red marinade for grilled poultry." },
  { title: "Fruit Chat Masala", brand: "Shan-e-Delhi", price: "$3.49 AUD", rating: 4.8, tags: ["Tangy", "Zesty"], image: fruitChatImg.src, desc: "The perfect zing for your fruit salads." },
  { title: "Yakhni Biryani", brand: "Shan-e-Delhi", price: "$7.49 AUD", rating: 4.9, tags: ["Kashmiri", "White"], image: yakhniBiryaniImg.src, desc: "Fragrant, mild and royal white biryani." },
  { title: "Dahi Bhalla", brand: "Roopak", price: "$3.99 AUD", rating: 4.7, tags: ["Snack Style", "Cool"], image: dahiBhallaImg.src, desc: "The essential cooling mix for summer chats." },
  { title: "Subzi Masala", brand: "Shan-e-Delhi", price: "$4.99 AUD", rating: 4.8, tags: ["Everyday", "Veg"], image: subziMasalaImg.src, desc: "Upgrade your daily vegetables instantly." },
];

export default function BestSellers() {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="py-10 px-4 bg-white border-t border-gray-100">
      <div className="max-width-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[9px] mb-2 block">Our Signature Collection</span>
          <h3 className="text-xl md:text-2xl font-serif font-black text-primary mb-4">Finest Blends</h3>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed font-medium">Experience the authentic culinary heritage with our perfectly stone-ground, 100% pure premium spices.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product, idx) => (
            <ProductCard 
              key={idx}
              title={product.title}
              brand={product.brand}
              price={product.price}
              rating={product.rating}
              tags={product.tags}
              productImage={product.image}
              overlayText={product.desc}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group relative px-12 py-5 bg-white border-2 border-primary/20 text-primary font-black uppercase tracking-widest text-xs rounded-full overflow-hidden transition-all hover:border-primary hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              {showAll ? 'View Less' : 'View All Products'} 
              <ArrowRight className={`w-4 h-4 transition-transform ${showAll ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
