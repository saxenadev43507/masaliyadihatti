"use client";

import React, { useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { ArrowRight, Leaf, Beef, Crown, Star, Zap, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

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

const products = [
  { title: "Shahi Garam Masala", brand: "Roopak", price: "$6.99 AUD", rating: 4.8, tags: ["Royal", "Aromatic"], image: shahiGaramMasalaImg.src, desc: "Perfect for Sunday paneer & royal curries", cat: "veg" },
  { title: "Kashmiri Lal Mirch", brand: "Roopak", price: "$5.49 AUD", rating: 4.9, tags: ["Mild", "Rich Colour"], image: kashmiriMirchImg.src, desc: "Vibrant red hue without the heat.", cat: "veg" },
  { title: "Punjabi Chole", brand: "Roopak", price: "$4.99 AUD", rating: 5.0, tags: ["Authentic", "Veg"], image: punjabiCholeImg.src, desc: "The secret to true Old Delhi style chole.", cat: "veg" },
  { title: "Butter Chicken", brand: "Shan-e-Delhi", price: "$5.99 AUD", rating: 4.9, tags: ["Best Seller", "Non-Veg"], image: butterChickenImg.src, desc: "Restaurant-style creamy curry at home.", cat: "nonveg" },
  { title: "Rajma Masala", brand: "Roopak", price: "$4.49 AUD", rating: 4.7, tags: ["Classic", "Veg"], image: rajmaMasalaImg.src, desc: "Traditional North Indian comfort food blend.", cat: "veg" },
  { title: "Mutton Quorma", brand: "Shan-e-Delhi", price: "$7.49 AUD", rating: 4.8, tags: ["Premium", "Rich"], image: muttonQuormaImg.src, desc: "Slow-cooked essence for royal meats.", cat: "nonveg" },
  { title: "Dal Makhani", brand: "Roopak", price: "$5.25 AUD", rating: 4.9, tags: ["Creamy", "Veg"], image: dalMakhaniImg.src, desc: "Authentic buttery richness for black lentils.", cat: "veg" },
  { title: "Chicken Tikka", brand: "Shan-e-Delhi", price: "$6.25 AUD", rating: 4.8, tags: ["Tandoori", "Spicy"], image: chickenTikkaImg.src, desc: "Perfectly balanced charcoal-grilled flavor.", cat: "nonveg" },
  { title: "Shahi Paneer", brand: "Roopak", price: "$5.99 AUD", rating: 4.9, tags: ["Creamy", "Royal"], image: shahiPaneerImg.src, desc: "A velvety blend for your festive paneer.", cat: "premium" },
  { title: "Nihari Masala", brand: "Shan-e-Delhi", price: "$6.99 AUD", rating: 4.9, tags: ["Slow Cook", "Expert"], image: nihariMasalaImg.src, desc: "The legendary breakfast stew spice mix.", cat: "premium" },
  { title: "PAV BHAJI MASALA", brand: "Roopak", price: "$3.99 AUD", rating: 4.8, tags: ["Street Style", "Veg"], image: pavBhajiImg.src, desc: "Bring the streets of Mumbai to your table.", cat: "everyday" },
  { title: "Roghan Josh", brand: "Shan-e-Delhi", price: "$7.25 AUD", rating: 5.0, tags: ["Kashmiri", "Mild"], image: roghanJoshImg.src, desc: "Vibrant red & aromatic mutton specialty.", cat: "premium" },
  { title: "Sambar Masala", brand: "Roopak", price: "$3.99 AUD", rating: 4.7, tags: ["South Indian", "Tangy"], image: sambarMasalaImg.src, desc: "Authentic coastal blend for daily lentils.", cat: "veg" },
  { title: "Seekh Kabab", brand: "Shan-e-Delhi", price: "$6.49 AUD", rating: 4.8, tags: ["Grilled", "Juicy"], image: seekhKababImg.src, desc: "Professional kabab seasoning for perfection.", cat: "nonveg" },
  { title: "Biryani Rice", brand: "Roopak", price: "$5.49 AUD", rating: 4.9, tags: ["Fragrant", "Royal"], image: biryaniRiceImg.src, desc: "Long-grain aroma in every single pinch.", cat: "premium" },
  { title: "Tandoori Chicken", brand: "Shan-e-Delhi", price: "$6.99 AUD", rating: 4.9, tags: ["Oven Style", "Spicy"], image: tandooriChickenImg.src, desc: "Classic red marinade for grilled poultry.", cat: "nonveg" },
  { title: "Fruit Chat Masala", brand: "Shan-e-Delhi", price: "$3.49 AUD", rating: 4.8, tags: ["Tangy", "Zesty"], image: fruitChatImg.src, desc: "The perfect zing for your fruit salads.", cat: "everyday" },
  { title: "Yakhni Biryani", brand: "Shan-e-Delhi", price: "$7.49 AUD", rating: 4.9, tags: ["Kashmiri", "White"], image: yakhniBiryaniImg.src, desc: "Fragrant, mild and royal white biryani.", cat: "premium" },
  { title: "Dahi Bhalla", brand: "Roopak", price: "$3.99 AUD", rating: 4.7, tags: ["Snack Style", "Cool"], image: dahiBhallaImg.src, desc: "The essential cooling mix for summer chats.", cat: "everyday" },
  { title: "Subzi Masala", brand: "Shan-e-Delhi", price: "$4.99 AUD", rating: 4.8, tags: ["Everyday", "Veg"], image: subziMasalaImg.src, desc: "Upgrade your daily vegetables instantly.", cat: "everyday" },
];

const tabs = [
  { key: "all",       label: "All",         Icon: Zap },
  { key: "veg",       label: "Veg",         Icon: Leaf },
  { key: "nonveg",    label: "Non-Veg",     Icon: Beef },
  { key: "premium",   label: "Premium",     Icon: Crown },
  { key: "everyday",  label: "Everyday",    Icon: UtensilsCrossed },
  { key: "bestseller",label: "Best Sellers",Icon: Star },
];

export default function BestSellers() {
  const [tab, setTab] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const { addToCart } = useCart();
  const { user, setShowAuthModal } = useAuth();

  const filtered = (() => {
    let list = tab === "all" ? products
      : tab === "bestseller" ? products.filter(p => p.tags.some(t => t.toLowerCase().includes("best")))
      : products.filter(p => p.cat === tab);
    return showAll ? list : list.slice(0, 4);
  })();

  const handleAdd = (p: typeof products[0], i: number) => {
    if (!user) { setShowAuthModal(true); return; }
    addToCart({ id: i + 1, title: p.title, brand: p.brand, price: p.price, image: p.image });
  };

  return (
    <section className="py-14 px-4 bg-white border-t border-primary/8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-accent font-black uppercase tracking-[0.35em] text-[9px] mb-2 block">Our Signature Collection</span>
          <h3 className="text-xl md:text-2xl font-serif font-black text-primary mb-3">Finest Blends</h3>
          <div className="w-16 h-[3px] bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full mb-5" />
          <p className="text-primary/50 max-w-xl mx-auto text-sm leading-relaxed">
            Stone-ground, 100% pure — spanning every cuisine and every occasion.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {tabs.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => { setTab(key); setShowAll(false); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider border transition-all duration-200 ${
                tab === key
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105"
                  : "bg-background text-primary/60 border-primary/15 hover:border-accent hover:text-accent"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${tab === key ? "text-accent" : ""}`} />
              {label}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filtered.length > 0 ? filtered.map((p, i) => (
            <ProductCard
              key={`${tab}-${i}`}
              title={p.title} brand={p.brand} price={p.price}
              rating={p.rating} tags={p.tags} productImage={p.image}
              overlayText={p.desc} onAddToCart={() => handleAdd(p, i)}
            />
          )) : (
            <div className="col-span-4 text-center py-14 text-primary/35 font-serif italic">
              No products found in this category yet.
            </div>
          )}
        </div>

        {/* View all */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative inline-flex items-center gap-2 px-10 py-4 border-2 border-primary/20 text-primary font-black uppercase tracking-widest text-[11px] rounded-full overflow-hidden hover:text-white transition-colors duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              {showAll ? "View Less" : "View All Products"}
              <ArrowRight className={`w-4 h-4 transition-transform ${showAll ? "-rotate-90" : "group-hover:translate-x-1"}`} />
            </span>
            <div className="absolute inset-0 bg-primary -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}