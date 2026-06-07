"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowLeft, ShieldCheck, Star } from 'lucide-react';

export default function RecipeDetailPage() {
  const params = useParams();
  const handle = params.handle as string;

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) return;

    import('@/lib/shopify')
      .then(({ getShopifyRecipeByHandle }) => {
        getShopifyRecipeByHandle(handle)
          .then(data => {
            if (data) {
              setRecipe(data);
            }
            setLoading(false);
          })
          .catch(err => {
            console.error('[Shopify Recipes] Error loading recipe:', err);
            setLoading(false);
          });
      })
      .catch(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-black text-primary mb-4">Recipe Not Found</h1>
          <Link href="/recipes" className="bg-accent text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-accent-hover transition-colors">
            Back to Recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Link */}
        <Link href="/recipes" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-accent transition-colors uppercase tracking-widest mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="mb-8">
          <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">
            {recipe.category.replace('-', ' ')}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-primary mb-4 tracking-tight leading-tight">
            {recipe.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-bold uppercase tracking-wider py-4 border-y border-gray-100">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" /> {recipe.time}</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-accent" /> Serves {recipe.serves}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-accent" /> {recipe.difficulty}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden mb-12 shadow-lg border border-gray-100">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        </div>

        {/* Recipe Content (Ingredients & Steps) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-serif font-black text-primary mb-6">Preparation & Steps</h2>
            <div 
              className="prose prose-stone max-w-none text-gray-600 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: recipe.contentHtml || `<p>${recipe.desc}</p>` }}
            />
          </div>

          {/* Matched Spices sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 sticky top-28">
              <h3 className="text-lg font-serif font-black text-primary mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-accent fill-accent" /> Required Spices
              </h3>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Use the authentic heritage blends for the original taste:
              </p>
              <div className="space-y-3">
                {recipe.spices.map((spiceName: string) => (
                  <div key={spiceName} className="p-3 bg-white border border-gray-100 rounded-xl flex flex-col justify-between hover:border-accent/30 transition-all">
                    <span className="text-xs font-bold text-primary mb-2 block">{spiceName}</span>
                    <Link href="/shop" className="text-[10px] font-black text-accent hover:text-accent-hover uppercase tracking-wider block">
                      Shop Spice &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
