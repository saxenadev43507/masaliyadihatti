"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { ArrowRight, Leaf, Beef, Crown, Star, Zap, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user, setShowAuthModal } = useAuth();

  useEffect(() => {
    import('@/lib/shopify')
      .then(({ getShopifyProducts }) => {
        getShopifyProducts()
          .then(data => {
            if (data && data.length > 0) {
              const mapped = data.map((p, index) => {
                const tagsLower = p.tags.map(t => t.toLowerCase());
                let cat = "veg"; // default
                if (tagsLower.includes("non-veg") || tagsLower.includes("nonveg") || p.category.toLowerCase().includes("non-veg")) {
                  cat = "nonveg";
                } else if (tagsLower.includes("premium") || p.category.toLowerCase().includes("premium")) {
                  cat = "premium";
                } else if (tagsLower.includes("everyday") || p.category.toLowerCase().includes("everyday")) {
                  cat = "everyday";
                }
                return {
                  id: index + 100, // Safe local numeric ID mapping
                  title: p.title,
                  brand: p.brand,
                  price: p.price,
                  rating: p.rating,
                  tags: p.tags,
                  image: p.image,
                  desc: p.desc,
                  cat: cat,
                  weight: p.weight,
                  variantId: p.variantId
                };
              });
              setProducts(mapped);
            }
          })
          .catch((err) => console.error('[Shopify BestSellers] Error:', err))
          .finally(() => setLoading(false));
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = (() => {
    let list = tab === "all" ? products
      : tab === "bestseller" ? products.filter(p => p.tags.some((t: string) => t.toLowerCase().includes("best")))
      : products.filter(p => p.cat === tab);
    return showAll ? list : list.slice(0, 4);
  })();

  const handleAdd = (p: any) => {
    if (!user) { setShowAuthModal(true); return; }
    addToCart({ id: p.id, title: p.title, brand: p.brand, price: p.price, image: p.image, weight: p.weight || 0.1, variantId: p.variantId });
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
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Spices...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {filtered.length > 0 ? filtered.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <ProductCard
                  title={p.title} brand={p.brand} price={p.price}
                  rating={p.rating} tags={p.tags} productImage={p.image}
                  overlayText={p.desc} onAddToCart={() => handleAdd(p)}
                />
              </Link>
            )) : (
              <div className="col-span-4 text-center py-14 text-primary/35 font-serif italic">
                No products found in this category yet.
              </div>
            )}
          </div>
        )}

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