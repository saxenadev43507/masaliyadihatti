"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit2, Star, MoreVertical, Package } from 'lucide-react';
import { allProducts } from '@/data/products';

interface Product {
  id: number; title: string; brand: string; category: string;
  price: string; rating: number; tags: string[]; image: string; desc: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('masaliya-admin-products');
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        setProducts(allProducts as Product[]);
        localStorage.setItem('masaliya-admin-products', JSON.stringify(allProducts));
      }
    } catch {
      setProducts(allProducts as Product[]);
    }
  }, []);

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('masaliya-admin-products', JSON.stringify(updated));
  };

  const handleDelete = (id: number) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
    setDeleteConfirm(null);
  };

  const handleBulkDelete = () => {
    const updated = products.filter(p => !selectedIds.includes(p.id));
    saveProducts(updated);
    setSelectedIds([]);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    return products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Search & Bulk Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
        </div>
        {selectedIds.length > 0 && (
          <button onClick={handleBulkDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap">
            <Trash2 className="w-4 h-4" /> Delete ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left p-4 w-10">
                  <input type="checkbox" checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll} className="rounded border-gray-300 accent-amber-500" />
                </th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Product</th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Brand</th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Price</th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Rating</th>
                <th className="text-right p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <input type="checkbox" checked={selectedIds.includes(product.id)} onChange={() => toggleSelect(product.id)} className="rounded border-gray-300 accent-amber-500" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                        ) : (
                          <Package className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{product.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{product.brand}</td>
                  <td className="p-4"><span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{product.category}</span></td>
                  <td className="p-4 text-sm font-bold text-gray-900">{product.price}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /><span className="text-sm text-gray-600">{product.rating}</span></div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/new?edit=${product.id}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-all">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      {deleteConfirm === product.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(product.id)} className="text-[10px] font-bold text-red-500 hover:text-red-700 px-2 py-1 bg-red-50 rounded">Yes</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-[10px] font-bold text-gray-500 hover:text-gray-700 px-2 py-1 bg-gray-100 rounded">No</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(product.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-400 font-medium">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
