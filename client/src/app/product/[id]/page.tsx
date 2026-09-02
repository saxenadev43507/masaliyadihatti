"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ShieldCheck, ChevronRight, Minus, Plus, Truck, RotateCcw, Award } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import ProductCard from '@/components/products/ProductCard';

interface MappedProduct {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: string;
  compareAtPrice?: string;
  rating: number;
  tags: string[];
  image: string;
  desc: string;
  weight: number;
  variantId: string;
  handle: string;
  variants: {
    id: string;
    title: string;
    price: string;
    compareAtPrice?: string;
    weight: number;
  }[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const { addToCart } = useCart();
  const { user, setShowAuthModal } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [allProds, setAllProds] = useState<MappedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');

  useEffect(() => {
    import('@/lib/shopify')
      .then(({ getShopifyProducts }) => {
        getShopifyProducts()
          .then(data => {
            if (data && data.length > 0) {
              setAllProds(data.map((p, index) => ({
                id: index + 100, // Safe local numeric ID mapping
                title: p.title,
                brand: p.brand,
                category: p.category,
                price: p.price,
                compareAtPrice: p.compareAtPrice,
                rating: p.rating,
                tags: p.tags || [],
                image: p.image,
                desc: p.desc,
                weight: p.weight,
                variantId: p.variantId,
                handle: p.handle,
                variants: p.variants || []
              })));
            }
          })
          .catch((err) => {
            console.error('[Shopify] Error loading product details:', err);
          })
          .finally(() => setLoading(false));
      })
      .catch(() => setLoading(false));
  }, []);

  const product = useMemo(() => {
    return allProds.find(p => p.id === productId);
  }, [productId, allProds]);

  useEffect(() => {
    if (product) {
      if (product.variants && product.variants.length > 0) {
        setSelectedVariantId(product.variants[0].id);
      } else {
        setSelectedVariantId(product.variantId);
      }
    }
  }, [product]);

  const currentVariant = useMemo(() => {
    if (!product) return null;
    if (product.variants && product.variants.length > 0) {
      return product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
    }
    return {
      id: product.variantId,
      title: 'Default Title',
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      weight: product.weight || 0.1
    };
  }, [product, selectedVariantId]);

  const brandRelated = useMemo(() => {
    if (!product) return [];
    return allProds.filter(p => p.id !== product.id && p.brand.toLowerCase() === product.brand.toLowerCase()).slice(0, 4);
  }, [product, allProds]);

  const otherBrandsRelated = useMemo(() => {
    if (!product) return [];
    
    const currentTitleWords = product.title.toLowerCase()
      .split(/[\s-]+/)
      .filter(w => w.length > 3 && w !== 'masala'); // exclude 'masala' as it is too common in spices

    const scored = allProds
      .filter(p => p.id !== product.id && p.brand.toLowerCase() !== product.brand.toLowerCase())
      .map(p => {
        let score = 0;
        
        // Title keyword overlap
        const pTitleWords = p.title.toLowerCase().split(/[\s-]+/);
        const matchingWords = currentTitleWords.filter(w => pTitleWords.includes(w));
        score += matchingWords.length * 10;
        
        // Tag overlap
        const matchingTags = p.tags.filter(t => product.tags.includes(t));
        score += matchingTags.length * 5;
        
        // Category overlap
        if (p.category === product.category) {
          score += 2;
        }
        
        return { product: p, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
    
    let results = scored.map(item => item.product);
    if (results.length < 4) {
      const remaining = allProds.filter(p => 
        p.id !== product.id && 
        p.brand.toLowerCase() !== product.brand.toLowerCase() &&
        !results.some(r => r.id === p.id)
      );
      results = [...results, ...remaining];
    }
    
    return results.slice(0, 4);
  }, [product, allProds]);

  const handleAddToCart = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!product || !currentVariant) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({ 
        id: product.id, 
        title: product.title, 
        brand: product.brand, 
        price: currentVariant.price, 
        image: product.image, 
        weight: currentVariant.weight,
        variantId: currentVariant.id
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };


  const [activeTab, setActiveTab] = useState<'details' | 'heritage' | 'quality'>('details');

  const brandStory = useMemo(() => {
    if (!product) return "";
    const bName = product.brand.toLowerCase();
    if (bName.includes("roopak")) {
      return "Born in the bustling lanes of Karol Bagh, Delhi, Roopak has been crafting authentic Punjabi spice blends since 1958. Using traditional cold-grinding technology, they preserve every drop of essential oil and natural aroma to deliver pure heritage in every pinch.";
    } else if (bName.includes("shan")) {
      return "Representing the royal culinary traditions of Old Delhi, Shan-E-Delhi brings authentic Mughlai and Dilli-style masalas. Every blend is a legacy recipe, crafted to turn daily meals into grand banquets.";
    } else if (bName.includes("nawab")) {
      return "Directly from the Nawabi kitchens of Lucknow, Nawab's Secret masalas capture the slow-cooked, complex, and intensely aromatic essence of Awadhi cuisine. Truly a royal taste secret passed down through generations.";
    } else if (bName.includes("noori")) {
      return "With a rich heritage dating back to 1928, Noori is a century-old gold standard in Mughlai whole and ground spices. Their blends deliver the exact authentic taste profile of historic Delhi's spice legacy.";
    } else if (bName.includes("star")) {
      return "Sourced from the heart of Khari Baoli, Asia's largest wholesale spice market, Star Masale provides professional-grade, high-potency spice blends trusted by heritage chefs and home cooks alike.";
    } else if (bName.includes("360")) {
      return "Specializing in authentic West Indian and coastal flavors, 360 Degree brings the complete sweet, savory, and tangy spectrum of traditional Gujarati cuisine directly to your kitchen.";
    }
    return "Crafted by India's premier heritage spice houses, this blend is sourced using traditional harvesting techniques and cold-milled to ensure zero adulteration and peak flavor profile.";
  }, [product]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafaf9] pt-16 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">Loading authentic spices...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fafaf9] pt-16 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-black text-primary mb-4">Product Not Found</h1>
          <Link href="/shop" className="bg-accent text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest">Back to Shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafaf9] pt-8 pb-24">
      {/* Decorative Blur Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 mb-10 relative z-10">
        <nav className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-primary truncate">{product.title}</span>
        </nav>
      </div>

      {/* Main Details Section */}
      <div className="max-w-7xl mx-auto px-4 mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Premium Floating Image Stage */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-white rounded-[3rem] p-12 border border-gray-100/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] relative flex items-center justify-center overflow-hidden min-h-[500px]">
              
              {/* Gold Ambient Backdrop Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-white to-primary/5" />
              <div className="absolute w-72 h-72 rounded-full bg-accent/10 blur-[60px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

              <div className="absolute top-8 left-8 z-10">
                <div className="flex items-center gap-1.5 bg-[#0d2e17] px-4 py-2 rounded-full shadow-md border border-accent/25">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">Pure Heritage</span>
                </div>
              </div>

              <motion.img 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                src={product.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80'} 
                alt={product.title} 
                className="relative z-10 w-full h-[400px] object-contain mix-blend-multiply drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </motion.div>

          {/* Right Column: Premium Product Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="flex flex-col">
            
            {/* Brand and Rating Row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-accent uppercase tracking-[0.3em] bg-accent/10 px-3.5 py-1.5 rounded-lg border border-accent/20">
                {product.brand}
              </span>
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-xs font-black text-primary">{product.rating} / 5.0</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl md:text-5xl font-serif font-black text-primary mb-6 tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Price block */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-primary tracking-tight">{currentVariant?.price}</span>
                  {currentVariant?.compareAtPrice && (
                    <span className="text-sm text-red-500 line-through font-bold" style={{ textDecorationColor: 'black' }}>
                      {currentVariant.compareAtPrice}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Availability</span>
                <span className="text-xs font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">In Stock</span>
              </div>
            </div>

            {/* Interactive Tabbed Product Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
              {/* Tab headers */}
              <div className="flex border-b border-gray-100 bg-[#fafaf9]">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === 'details' ? 'border-accent text-primary bg-white' : 'border-transparent text-gray-400 hover:text-primary'}`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('heritage')}
                  className={`flex-1 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === 'heritage' ? 'border-accent text-primary bg-white' : 'border-transparent text-gray-400 hover:text-primary'}`}
                >
                  Heritage Story
                </button>
                <button 
                  onClick={() => setActiveTab('quality')}
                  className={`flex-1 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === 'quality' ? 'border-accent text-primary bg-white' : 'border-transparent text-gray-400 hover:text-primary'}`}
                >
                  Purity Guarantee
                </button>
              </div>

              {/* Tab content */}
              <div className="p-6 min-h-[140px] text-gray-600 text-sm leading-relaxed">
                {activeTab === 'details' && (
                  <p>{product.desc}</p>
                )}
                {activeTab === 'heritage' && (
                  <p>{brandStory}</p>
                )}
                {activeTab === 'quality' && (
                  <div className="space-y-3">
                    <p>All Masaliya Di Hatti products are strictly guaranteed for authentication & high culinary purity standards:</p>
                    <ul className="grid grid-cols-2 gap-2 text-xs font-bold text-primary">
                      <li className="flex items-center gap-1.5 text-accent">✓ 100% Preservative Free</li>
                      <li className="flex items-center gap-1.5 text-accent">✓ Cold-Ground Milled</li>
                      <li className="flex items-center gap-1.5 text-accent">✓ Authentic Recipe Sourced</li>
                      <li className="flex items-center gap-1.5 text-accent">✓ FSSAI Certified Quality</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-black uppercase tracking-tighter bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200/50">{tag}</span>
              ))}
            </div>

            {/* Weight Selection */}
            {product.variants && product.variants.length > 1 ? (
              <div className="mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3">Select Weight Options</span>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => {
                    const isActive = v.id === selectedVariantId;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`px-5 py-3 rounded-xl border text-xs font-black uppercase tracking-wider transition-all duration-200 active:scale-[0.98] ${
                          isActive
                            ? 'bg-[#0d2e17] text-white border-[#0d2e17] shadow-lg shadow-[#0d2e17]/10'
                            : 'bg-white text-primary border-gray-200 hover:border-accent hover:text-accent hover:shadow-sm'
                        }`}
                      >
                        {v.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Selected Weight</span>
                <span className="inline-block bg-accent/10 border border-accent/25 px-4.5 py-1.5 rounded-lg text-xs font-black text-accent uppercase tracking-wider">
                  {currentVariant ? currentVariant.title : `${((product.weight || 0.1) * 1000).toFixed(0)}g`}
                </span>
              </div>
            )}

            {/* Quantity Selector and Add Button */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm h-14">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-primary transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-12 h-full flex items-center justify-center font-black text-lg border-x border-gray-100 text-primary">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-primary transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              
              <button 
                onClick={handleAddToCart} 
                className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg active:scale-[0.98] ${
                  addedToCart 
                    ? 'bg-emerald-600 text-white shadow-emerald-600/10' 
                    : 'bg-[#0d2e17] text-white hover:bg-accent shadow-[#0d2e17]/10'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest text-white">{addedToCart ? 'Added to Cart!' : 'Add to Collection'}</span>
              </button>
              
              <button className="w-14 h-14 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-red-500 hover:shadow-sm transition-all"><Heart className="w-5 h-5" /></button>
            </div>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200/60">
              <div className="flex items-center gap-2.5 text-gray-500">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Truck className="w-4 h-4" /></div>
                <span className="text-[10px] font-black uppercase tracking-wider leading-tight">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-500">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent"><RotateCcw className="w-4 h-4" /></div>
                <span className="text-[10px] font-black uppercase tracking-wider leading-tight">Easy Returns</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-500">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Award className="w-4 h-4" /></div>
                <span className="text-[10px] font-black uppercase tracking-wider leading-tight">FSSAI Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dual Recommendations Sections */}
      <div className="space-y-24">
        
        {/* Same Brand Recommendations */}
        {brandRelated.length > 0 && (
          <section className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">From The Same Spice House</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">More from <span className="text-accent">{product.brand}</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {brandRelated.map(p => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <ProductCard 
                    title={p.title} 
                    brand={p.brand} 
                    price={p.price} 
                    rating={p.rating} 
                    tags={p.tags} 
                    productImage={p.image} 
                    overlayText={p.desc} 
                    onAddToCart={() => { 
                      if (!user) { setShowAuthModal(true); return; } 
                      const mainVariant = p.variants?.[0] || { id: p.variantId, price: p.price, weight: p.weight };
                      addToCart({ 
                        id: p.id, 
                        title: p.title, 
                        brand: p.brand, 
                        price: mainVariant.price, 
                        image: p.image, 
                        weight: mainVariant.weight, 
                        variantId: mainVariant.id 
                      }); 
                    }} 
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other Brands Recommendations */}
        {otherBrandsRelated.length > 0 && (
          <section className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">Explore Heritage Alternatives</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">Similar Blends from <span className="text-accent">Other Brands</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {otherBrandsRelated.map(p => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <ProductCard 
                    title={p.title} 
                    brand={p.brand} 
                    price={p.price} 
                    rating={p.rating} 
                    tags={p.tags} 
                    productImage={p.image} 
                    overlayText={p.desc} 
                    onAddToCart={() => { 
                      if (!user) { setShowAuthModal(true); return; } 
                      const mainVariant = p.variants?.[0] || { id: p.variantId, price: p.price, weight: p.weight };
                      addToCart({ 
                        id: p.id, 
                        title: p.title, 
                        brand: p.brand, 
                        price: mainVariant.price, 
                        image: p.image, 
                        weight: mainVariant.weight, 
                        variantId: mainVariant.id 
                      }); 
                    }} 
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
