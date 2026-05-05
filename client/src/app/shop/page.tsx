"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  Search,
  X,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { allProducts } from '@/data/products';
import { getProducts, type DBProduct } from '@/lib/supabase-admin';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const categories = ["All Products", "Best Sellers", "New Arrivals", "Combo Packs"];
const brands = ["All Brands", "Roopak", "Shan-e-Delhi"];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || "All Products";
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeBrand, setActiveBrand] = useState("All Brands");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [dbProducts, setDbProducts] = useState<DBProduct[]>([]);
  const { addToCart } = useCart();
  const { user, setShowAuthModal } = useAuth();

  const handleAddToCart = (product: { id: number; title: string; brand: string; price: string; image: string }) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    addToCart(product);
  };
  const [dbLoaded, setDbLoaded] = useState(false);

  // Fetch products from Supabase
  useEffect(() => {
    getProducts()
      .then(data => {
        if (data && data.length > 0) {
          setDbProducts(data);
        }
        setDbLoaded(true);
      })
      .catch(() => setDbLoaded(true));
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Use DB products if available, otherwise static
  const sourceProducts = useMemo(() => {
    if (dbProducts.length > 0) {
      return dbProducts.map(p => ({
        id: p.id!,
        title: p.title,
        brand: p.brand,
        category: p.category,
        price: p.price,
        rating: p.rating,
        tags: p.tags || [],
        image: p.image_url || '',
        desc: p.description || '',
      }));
    }
    return allProducts;
  }, [dbProducts]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...sourceProducts];

    // Category Filter
    if (activeCategory !== "All Products") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Brand Filter
    if (activeBrand !== "All Brands") {
      result = result.filter(p => p.brand === activeBrand);
    }

    // Search Filter
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));
    } else if (sortBy === "Rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, activeBrand, searchQuery, sortBy, sourceProducts]);

  return (
    <main className="min-h-screen bg-white pt-16 pb-10">
      {/* ─── PREMIUM SHOP HEADER ─── */}
      <section className="max-w-7xl mx-auto px-4 mb-10 text-center relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8rem] font-serif font-black text-gray-50 opacity-40 select-none pointer-events-none">
          M
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-2 block">
            The Spice Library
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-black text-primary mb-4 tracking-tight">
            Curated <span className="text-accent">Spice Kits</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-serif italic leading-relaxed">
            "Authentic flavours, traditional recipes, and century-old mastery delivered to your kitchen door."
          </p>
        </motion.div>
      </section>

      {/* ─── INTERACTIVE CATEGORY TABS ─── */}
      <section className="max-w-7xl mx-auto px-4 mb-12 border-b border-gray-100">
        <div className="flex flex-wrap justify-center gap-2 md:gap-8 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat ? "text-accent" : "text-gray-400 hover:text-primary"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* ─── SMART FILTER BAR ─── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-gray-50/50 p-6 rounded-3xl border border-gray-100 backdrop-blur-sm sticky top-24 z-40 shadow-sm">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search collection..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
              {filteredProducts.length} Results
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
            {/* Brand Chips */}
            <div className="flex items-center bg-white border border-gray-200 rounded-2xl p-1 gap-1">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-tighter rounded-xl transition-all ${
                    activeBrand === brand ? "bg-accent text-white shadow-lg" : "text-gray-400 hover:text-primary"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-2xl px-6 py-3 pr-10 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:border-accent transition-all shadow-sm"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none group-hover:text-accent transition-colors" />
            </div>
          </div>
        </div>

        {/* ─── PRODUCT GRID ─── */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard 
                  title={product.title}
                  brand={product.brand}
                  price={product.price}
                  rating={product.rating}
                  tags={product.tags}
                  productImage={product.image}
                  overlayText={product.desc}
                  onAddToCart={() => handleAddToCart({ id: product.id, title: product.title, brand: product.brand, price: product.price, image: product.image })}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-serif font-black text-primary mb-2">No Spices Found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setActiveCategory("All Products"); setActiveBrand("All Brands"); setSearchQuery(""); }}
              className="mt-8 text-accent font-black uppercase tracking-widest text-xs border-b border-accent pb-1"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
