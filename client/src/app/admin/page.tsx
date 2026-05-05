"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Package, Users, DollarSign, TrendingUp, ArrowUpRight, Eye, RefreshCw, Loader2, Database } from 'lucide-react';
import Link from 'next/link';
import { getProducts, type DBProduct } from '@/lib/supabase-admin';

export default function AdminDashboard() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const prods = await getProducts();
      setProducts(prods);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate real stats
  const totalProducts = products.length;
  const brands = new Set(products.map(p => p.brand)).size;
  const categories = new Set(products.map(p => p.category)).size;
  const avgRating = products.length > 0
    ? (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)
    : '0.0';

  const stats = [
    { label: "Total Products", value: totalProducts, icon: <Package className="w-5 h-5" />, detail: `${brands} brands`, color: "bg-blue-500" },
    { label: "Categories", value: categories, icon: <TrendingUp className="w-5 h-5" />, detail: "Active categories", color: "bg-green-500" },
    { label: "Avg Rating", value: avgRating, icon: <DollarSign className="w-5 h-5" />, detail: "Across all products", color: "bg-amber-500" },
    { label: "Brands", value: brands, icon: <Users className="w-5 h-5" />, detail: "Partner brands", color: "bg-purple-500" },
  ];

  // Recent products (last 5 added)
  const recentProducts = products.slice(0, 5);

  // Products by brand
  const brandCounts: Record<string, number> = {};
  products.forEach(p => { brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1; });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
            <Database className="w-3 h-3" /> Live data from Supabase
          </p>
        </div>
        <button onClick={fetchData} disabled={loading}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-xs transition-all">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-green-500">
                    <ArrowUpRight className="w-3 h-3" /> Live
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{stat.detail}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Products */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Recent Products</h2>
                <Link href="/admin/products" className="text-xs font-bold text-amber-500 hover:underline">View All</Link>
              </div>
              <div className="divide-y divide-gray-50">
                {recentProducts.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">No products yet. Add your first product!</div>
                ) : (
                  recentProducts.map(product => (
                    <div key={product.id} className="p-4 px-6 hover:bg-gray-50 transition-colors flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {product.image_url ? (
                          <img src={product.image_url} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <Package className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                        <p className="text-xs text-gray-500">{product.brand} · {product.price}</p>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{product.category}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions + Brand Breakdown */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-6 space-y-3">
                  <Link href="/admin/products/new" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-gray-100 transition-all group">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Add New Product</p>
                      <p className="text-xs text-gray-500">Create product in database</p>
                    </div>
                  </Link>
                  <Link href="/admin/products" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-gray-100 transition-all group">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Manage Products</p>
                      <p className="text-xs text-gray-500">Edit, delete, or update products</p>
                    </div>
                  </Link>
                  <Link href="/" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-gray-100 transition-all group" target="_blank">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">View Store</p>
                      <p className="text-xs text-gray-500">See your live storefront</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Brand Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Products by Brand</h2>
                </div>
                <div className="p-6 space-y-3">
                  {Object.entries(brandCounts).sort((a, b) => b[1] - a[1]).map(([brand, count]) => (
                    <div key={brand} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{brand}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(count / totalProducts) * 100}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gray-500 w-6 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
