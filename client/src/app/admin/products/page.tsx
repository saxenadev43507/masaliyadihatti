"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit2, Star, Package, RefreshCw, Loader2, Database } from 'lucide-react';
import { getProducts, deleteProduct, deleteProducts, type DBProduct } from '@/lib/supabase-admin';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Check your Supabase connection.');
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    }
    setDeleting(false);
  };

  const handleBulkDelete = async () => {
    setDeleting(true);
    try {
      await deleteProducts(selectedIds);
      setProducts(prev => prev.filter(p => !selectedIds.includes(p.id!)));
      setSelectedIds([]);
    } catch (err) {
      setError('Failed to delete products');
      console.error(err);
    }
    setDeleting(false);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id!));
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

  const handleSeed = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        await fetchProducts();
      }
    } catch (err) {
      setError('Failed to seed products');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
            <Database className="w-3 h-3" />
            {products.length} products in database
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchProducts} disabled={loading}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold text-sm transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <Link href="/admin/products/new" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm">
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">{error}</div>
      )}

      {/* Empty state with seed button */}
      {!loading && products.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No products in database</h3>
          <p className="text-gray-500 text-sm mb-6">Seed your database with your existing product catalog or add products manually.</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={handleSeed} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm">
              <Database className="w-4 h-4" /> Seed Products from Catalog
            </button>
            <Link href="/admin/products/new" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold text-sm transition-all">
              <Plus className="w-4 h-4" /> Add Manually
            </Link>
          </div>
        </div>
      )}

      {/* Search & Bulk Actions */}
      {products.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
            </div>
            {selectedIds.length > 0 && (
              <button onClick={handleBulkDelete} disabled={deleting}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap disabled:opacity-50">
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete ({selectedIds.length})
              </button>
            )}
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
              </div>
            ) : (
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
                          <input type="checkbox" checked={selectedIds.includes(product.id!)} onChange={() => toggleSelect(product.id!)} className="rounded border-gray-300 accent-amber-500" />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {product.image_url ? (
                                <img src={product.image_url} alt={product.title} className="w-full h-full object-contain" />
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
                                <button onClick={() => handleDelete(product.id!)} disabled={deleting} className="text-[10px] font-bold text-red-500 hover:text-red-700 px-2 py-1 bg-red-50 rounded">
                                  {deleting ? '...' : 'Yes'}
                                </button>
                                <button onClick={() => setDeleteConfirm(null)} className="text-[10px] font-bold text-gray-500 hover:text-gray-700 px-2 py-1 bg-gray-100 rounded">No</button>
                              </div>
                            ) : (
                              <button onClick={() => setDeleteConfirm(product.id!)}
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
            )}
            {!loading && filteredProducts.length === 0 && products.length > 0 && (
              <div className="p-12 text-center"><p className="text-gray-400 font-medium">No products match your search</p></div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
