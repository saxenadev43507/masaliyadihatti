"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, ArrowLeft, ImageIcon } from 'lucide-react';
import { allProducts } from '@/data/products';

interface Product {
  id: number; title: string; brand: string; category: string;
  price: string; rating: number; tags: string[]; image: string; desc: string;
}

function NewProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditing = !!editId;

  const [form, setForm] = useState<Omit<Product, 'id'>>({
    title: '', brand: 'Roopak', category: 'All Products', price: '',
    rating: 4.5, tags: [], image: '', desc: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isEditing) {
      try {
        const saved = localStorage.getItem('masaliya-admin-products');
        const products: Product[] = saved ? JSON.parse(saved) : allProducts;
        const product = products.find(p => p.id === Number(editId));
        if (product) {
          setForm({ title: product.title, brand: product.brand, category: product.category, price: product.price, rating: product.rating, tags: product.tags, image: product.image, desc: product.desc });
        }
      } catch { /* empty */ }
    }
  }, [editId, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const savedData = localStorage.getItem('masaliya-admin-products');
      let products: Product[] = savedData ? JSON.parse(savedData) : [...allProducts] as Product[];

      if (isEditing) {
        products = products.map(p => p.id === Number(editId) ? { ...p, ...form } : p);
      } else {
        const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
        products.push({ id: maxId + 1, ...form });
      }

      localStorage.setItem('masaliya-admin-products', JSON.stringify(products));
      setSaved(true);
      setTimeout(() => router.push('/admin/products'), 1000);
    } catch { /* empty */ }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter(t => t !== tag) });
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{isEditing ? 'Update product details' : 'Create a new product listing'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Product Title *</label>
            <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" placeholder="e.g. Shahi Garam Masala" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Brand *</label>
            <select value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all appearance-none cursor-pointer">
              <option>Roopak</option><option>Shan-e-Delhi</option><option>Nawab Secret</option><option>Noori</option><option>Star Masale</option><option>360 Degree</option><option>Auric</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Category *</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all appearance-none cursor-pointer">
              <option>All Products</option><option>Best Sellers</option><option>New Arrivals</option><option>Combo Packs</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Price (AUD) *</label>
            <input type="text" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" placeholder="e.g. $6.99 AUD" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Rating (0-5)</label>
            <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Tags</label>
            <div className="flex gap-2">
              <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" placeholder="Add tag + Enter" />
              <button type="button" onClick={addTag} className="px-4 py-3 bg-gray-200 rounded-xl text-sm font-bold hover:bg-gray-300 transition-colors">Add</button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-md flex items-center gap-1">
                    {tag} <button type="button" onClick={() => removeTag(tag)} className="text-amber-500 hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Image URL</label>
          <div className="flex gap-4">
            <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" placeholder="https://..." />
            {form.image && (
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={form.image} alt="Preview" className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Description *</label>
          <textarea required rows={3} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none" placeholder="Short product description" />
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <button type="submit" className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${saved ? 'bg-green-500 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'}`}>
            <Save className="w-4 h-4" /> {saved ? 'Saved!' : isEditing ? 'Update Product' : 'Create Product'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-8 py-3 rounded-xl font-bold text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <NewProductForm />
    </Suspense>
  );
}
