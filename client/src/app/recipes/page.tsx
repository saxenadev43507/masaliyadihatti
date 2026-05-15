"use client";

import React, { useMemo, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Flame, Utensils, ArrowRight, Users, Zap, Star, BookOpen } from 'lucide-react';

const recipeCategories = [
  { name: "Quick Weeknight Meals", slug: "quick", time: "Under 30 Mins", count: 12, icon: <Clock className="w-6 h-6" />, color: "from-amber-500 to-orange-500", bgLight: "bg-gradient-to-br from-amber-50 to-orange-50", borderColor: "border-amber-200" },
  { name: "North Indian Classics", slug: "north-indian", time: "Traditional", count: 18, icon: <Utensils className="w-6 h-6" />, color: "from-red-500 to-rose-500", bgLight: "bg-gradient-to-br from-red-50 to-rose-50", borderColor: "border-red-200" },
  { name: "Biryani & Rice", slug: "biryani", time: "Weekend Special", count: 8, icon: <Flame className="w-6 h-6" />, color: "from-emerald-500 to-teal-500", bgLight: "bg-gradient-to-br from-emerald-50 to-teal-50", borderColor: "border-emerald-200" },
  { name: "Grills & Kebabs", slug: "grills", time: "BBQ Favourites", count: 10, icon: <Zap className="w-6 h-6" />, color: "from-purple-500 to-indigo-500", bgLight: "bg-gradient-to-br from-purple-50 to-indigo-50", borderColor: "border-purple-200" },
  { name: "Street Food", slug: "street", time: "Snack Time", count: 14, icon: <Star className="w-6 h-6" />, color: "from-pink-500 to-fuchsia-500", bgLight: "bg-gradient-to-br from-pink-50 to-fuchsia-50", borderColor: "border-pink-200" },
  { name: "South Indian", slug: "south-indian", time: "Coastal Flavors", count: 9, icon: <BookOpen className="w-6 h-6" />, color: "from-blue-500 to-cyan-500", bgLight: "bg-gradient-to-br from-blue-50 to-cyan-50", borderColor: "border-blue-200" },
];

const allRecipes = [
  { title: "Dum Biryani", slug: "biryani", category: "biryani", time: "90 min", serves: "4-6", difficulty: "Intermediate", desc: "A royal recipe slow-cooked with layers of aromatic rice and tender meat, sealed with dough for the perfect dum.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80", spices: ["Yakhni Biryani Masala", "Shahi Garam Masala"] },
  { title: "Butter Chicken", slug: "north-indian", category: "north-indian", time: "45 min", serves: "4", difficulty: "Easy", desc: "Creamy, rich, and mildly spiced — the iconic Delhi-style butter chicken that melts in your mouth.", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80", spices: ["Butter Chicken Masala", "Kashmiri Lal Mirch"] },
  { title: "Seekh Kabab", slug: "grills", category: "grills", time: "35 min", serves: "4", difficulty: "Easy", desc: "Juicy, perfectly spiced minced meat skewers grilled to smoky perfection.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80", spices: ["Seekh Kabab Masala", "Shahi Garam Masala"] },
  { title: "Punjabi Chole", slug: "north-indian", category: "north-indian", time: "40 min", serves: "4", difficulty: "Easy", desc: "Authentic Old Delhi style chickpea curry — rich, tangy, and packed with traditional spices.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", spices: ["Punjabi Chole Masala", "Shahi Garam Masala"] },
  { title: "Roghan Josh", slug: "north-indian", category: "north-indian", time: "60 min", serves: "4", difficulty: "Intermediate", desc: "A Kashmiri masterpiece — aromatic, vibrant red lamb curry with delicate spicing.", image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600&q=80", spices: ["Roghan Josh Masala", "Kashmiri Lal Mirch"] },
  { title: "Pav Bhaji", slug: "street", category: "street", time: "30 min", serves: "4", difficulty: "Easy", desc: "Mumbai's most famous street food — a spicy mashed vegetable curry served with buttery pav.", image: "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=600&q=80", spices: ["PAV BHAJI MASALA"] },
  { title: "Chicken Tikka", slug: "grills", category: "grills", time: "40 min", serves: "4", difficulty: "Easy", desc: "Perfectly balanced charcoal-grilled chicken with smoky tandoori spices.", image: "https://images.unsplash.com/photo-1610057099443-fde6c99db9e1?w=600&q=80", spices: ["Chicken Tikka Masala"] },
  { title: "Tandoori Chicken", slug: "grills", category: "grills", time: "50 min", serves: "4", difficulty: "Easy", desc: "Classic red marinade grilled chicken — crispy outside, juicy inside.", image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&q=80", spices: ["Tandoori Chicken Masala"] },
  { title: "Dal Makhani", slug: "north-indian", category: "north-indian", time: "50 min", serves: "4", difficulty: "Easy", desc: "Slow-simmered black lentils in a buttery, creamy tomato gravy — the ultimate comfort food.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80", spices: ["Dal Makhani Masala", "Shahi Garam Masala"] },
  { title: "Egg Curry", slug: "quick", category: "quick", time: "25 min", serves: "4", difficulty: "Easy", desc: "Quick and flavorful egg curry perfect for busy weeknights.", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80", spices: ["Subzi Masala", "Shahi Garam Masala"] },
  { title: "Aloo Gobi", slug: "quick", category: "quick", time: "25 min", serves: "4", difficulty: "Easy", desc: "Classic potato-cauliflower dry curry with aromatic spices — ready in minutes.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80", spices: ["Subzi Masala"] },
  { title: "Sambar", slug: "south-indian", category: "south-indian", time: "35 min", serves: "4", difficulty: "Easy", desc: "Authentic South Indian lentil stew with vegetables and tangy tamarind.", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80", spices: ["Sambar Masala"] },
  { title: "Fruit Chaat", slug: "street", category: "street", time: "10 min", serves: "4", difficulty: "Easy", desc: "Tangy, zesty fruit salad sprinkled with chaat masala — the perfect refreshing snack.", image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=600&q=80", spices: ["Fruit Chat Masala"] },
  { title: "Mutton Quorma", slug: "north-indian", category: "north-indian", time: "90 min", serves: "4-6", difficulty: "Advanced", desc: "Slow-cooked royal mutton in a rich, aromatic cashew and yogurt gravy.", image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80", spices: ["Mutton Quorma Masala"] },
  { title: "Veg Biryani", slug: "biryani", category: "biryani", time: "60 min", serves: "4", difficulty: "Intermediate", desc: "Fragrant layered vegetable biryani with saffron and aromatic spices.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80", spices: ["Biryani Rice Masala", "Shahi Garam Masala"] },
  { title: "Dahi Bhalla", slug: "street", category: "street", time: "20 min", serves: "4", difficulty: "Easy", desc: "Soft lentil dumplings in creamy yogurt topped with tangy chutneys and spices.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", spices: ["Dahi Bhalla Masala"] },
];

function RecipesContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const recipesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCategory !== 'all' && recipesRef.current) {
      setTimeout(() => {
        recipesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [activeCategory]);

  const filteredRecipes = useMemo(() => {
    if (activeCategory === 'all') return allRecipes;
    return allRecipes.filter(r => r.category === activeCategory);
  }, [activeCategory]);

  const activeCategoryData = recipeCategories.find(c => c.slug === activeCategory);

  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-gray-900 to-primary py-24 mb-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">Cook Like a Master</span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-6 tracking-tight">
              {activeCategoryData ? <>{activeCategoryData.name}</> : <>Spice <span className="text-accent">Recipes</span></>}
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              {activeCategoryData
                ? `Browse our collection of ${activeCategoryData.name.toLowerCase()} recipes — each paired with the exact spice blends you need.`
                : "Authentic Indian recipes perfected over generations — each paired with the exact spice blends you need."
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 mb-12 border-b border-gray-100">
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 overflow-x-auto no-scrollbar pb-1">
          <Link href="/recipes" className={`relative px-6 py-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeCategory === 'all' ? 'text-accent' : 'text-gray-400 hover:text-primary'}`}>
            All Recipes
            {activeCategory === 'all' && <motion.div layoutId="recipeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full" />}
          </Link>
          {recipeCategories.map((cat) => (
            <Link key={cat.slug} href={`/recipes?category=${cat.slug}`} className={`relative px-6 py-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeCategory === cat.slug ? 'text-accent' : 'text-gray-400 hover:text-primary'}`}>
              {cat.name}
              {activeCategory === cat.slug && <motion.div layoutId="recipeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full" />}
            </Link>
          ))}
        </div>
      </section>

      {/* Recipe Categories Grid (only show when 'all') */}
      {activeCategory === 'all' && (
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="text-center mb-14">
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">Browse By Style</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">Recipe <span className="text-accent">Categories</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipeCategories.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 * i }}>
                <Link href={`/recipes?category=${cat.slug}`} className={`group block p-8 rounded-3xl ${cat.bgLight} border ${cat.borderColor} hover:shadow-xl hover:scale-[1.02] transition-all duration-500`}>
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg`}>{cat.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">{cat.name}</h3>
                      <p className="text-gray-500 text-sm">{cat.time} · {cat.count} recipes</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all mt-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Recipes Grid */}
      <section ref={recipesRef} className="max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center mb-14">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">
            {activeCategoryData ? activeCategoryData.time : "Try These First"}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">
            {activeCategoryData ? <>{activeCategoryData.name} <span className="text-accent">Recipes</span></> : <>Featured <span className="text-accent">Recipes</span></>}
          </h2>
          <p className="text-gray-400 mt-3 text-sm">{filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe, i) => (
            <motion.div key={recipe.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 * i }}
              className="group rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-accent/20 transition-all duration-500 bg-white">
              <div className="relative h-56 overflow-hidden">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <Link href={`/recipes?category=${recipe.category}`} className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-accent hover:text-white transition-colors">
                    {recipeCategories.find(c => c.slug === recipe.category)?.name || recipe.category}
                  </Link>
                  <span className="bg-accent text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">{recipe.difficulty}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-black text-primary mb-2 group-hover:text-accent transition-colors">{recipe.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{recipe.desc}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.time}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {recipe.serves}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recipe.spices.map(s => (
                    <span key={s} className="text-[10px] font-bold bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="py-32 text-center">
            <h3 className="text-2xl font-serif font-black text-primary mb-2">No Recipes Found</h3>
            <p className="text-gray-400 mb-6">No recipes in this category yet.</p>
            <Link href="/recipes" className="text-accent font-black uppercase tracking-widest text-xs border-b border-accent pb-1">View All Recipes</Link>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary via-gray-900 to-primary rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10">
            <Utensils className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-2xl md:text-4xl font-serif font-black text-white mb-4">Get the Right <span className="text-accent">Spices</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">Every recipe is only as good as its spices. Shop our curated collections to make every dish authentic.</p>
            <Link href="/shop" className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg">
              Shop Spices <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default function RecipesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
      <RecipesContent />
    </Suspense>
  );
}
