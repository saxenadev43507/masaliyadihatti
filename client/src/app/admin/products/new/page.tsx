"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, ArrowLeft, ImageIcon, Upload, X, Loader2 } from 'lucide-react';
import { getProductById, createProduct, updateProduct, uploadProductImage } from '@/lib/supabase-admin';

interface ProductForm {
  title: string; brand: string; category: string;
  price: string; rating: number; tags: string[];
  image_url: string; description: string;
}

function ProductFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditing = !!editId;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProductForm>({
    title: '', brand: 'Roopak', category: 'All Products', price: '',
    rating: 4.5, tags: [], image_url: '', description: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loadingProduct, setLoadingProduct] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoadingProduct(true);
      getProductById(Number(editId)).then(product => {
        if (product) {
          setForm({
            title: product.title, brand: product.brand, category: product.category,
            price: product.price, rating: product.rating, tags: product.tags || [],
            image_url: product.image_url || '', description: product.description || ''
          });
        }
      }).catch(() => setError('Product not found')).finally(() => setLoadingProduct(false));
    }
  }, [editId, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (isEditing) {
        await updateProduct(Number(editId), form);
      } else {
        await createProduct(form);
      }
      setSaved(true);
      setTimeout(() => router.push('/admin/products'), 1000);
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} product. ${err}`);
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');
    try {
      const publicUrl = await uploadProductImage(file);
      setForm({ ...form, image_url: publicUrl });
    } catch (err) {
      setError('Failed to upload image. Make sure the "product-images" bucket exists in Supabase Storage.');
      console.error(err);
    }
    setUploading(false);
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

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{isEditing ? 'Update product in database' : 'Create a new product in database'}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-widest text-gray-400">Basic Information</h2>
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
                <option>All Products</option><option>Best Sellers</option><option>New Arrivals</option><option>Combo Packs</option><option>Whole Spices</option><option>Ground Spices</option><option>Blended Masalas</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Price (AUD) *</label>
              <input type="text" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" placeholder="e.g. $6.99 AUD" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Description *</label>
            <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none" placeholder="Short product description" />
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-widest text-gray-400">Product Image</h2>
          
          <div className="flex gap-6">
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all group"
            >
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                  <span className="text-sm text-gray-500 font-medium">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-300 group-hover:text-amber-500 transition-colors" />
                  <span className="text-sm text-gray-500 font-medium">Click to upload image</span>
                  <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
                </div>
              )}
            </div>

            {/* Preview */}
            {form.image_url && (
              <div className="relative w-32 h-32 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0">
                <img src={form.image_url} alt="Preview" className="w-full h-full object-contain" />
                <button type="button" onClick={() => setForm({ ...form, image_url: '' })}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Or paste URL */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Or paste image URL</label>
            <input type="text" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" placeholder="https://..." />
          </div>
        </div>

        {/* Tags & Rating */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-widest text-gray-400">Extra Details</h2>
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
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${saved ? 'bg-green-500 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'} disabled:opacity-50`}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saved!' : saving ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
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
      <ProductFormInner />
    </Suspense>
  );
}
