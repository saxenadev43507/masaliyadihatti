"use client";

import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';
import Link from 'next/link';

const recentActivity = [
  { action: "New order placed", detail: "Shahi Garam Masala x2", time: "2 min ago", type: "order" },
  { action: "Product updated", detail: "Butter Chicken Masala price changed", time: "15 min ago", type: "product" },
  { action: "New order placed", detail: "Punjabi Chole + Dal Makhani", time: "1 hour ago", type: "order" },
  { action: "Low stock alert", detail: "Kashmiri Lal Mirch - 3 remaining", time: "2 hours ago", type: "alert" },
  { action: "New wholesale enquiry", detail: "From Melbourne Spice Co.", time: "5 hours ago", type: "enquiry" },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<unknown[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('masaliya-admin-products');
      if (saved) setProducts(JSON.parse(saved));
    } catch { /* empty */ }
  }, []);

  const stats = [
    { label: "Total Products", value: products.length || 20, icon: <Package className="w-5 h-5" />, change: "+3", trend: "up", color: "bg-blue-500" },
    { label: "Total Orders", value: 156, icon: <ShoppingCart className="w-5 h-5" />, change: "+12", trend: "up", color: "bg-green-500" },
    { label: "Revenue (AUD)", value: "$4,285", icon: <DollarSign className="w-5 h-5" />, change: "+8.2%", trend: "up", color: "bg-amber-500" },
    { label: "Visitors Today", value: 342, icon: <Eye className="w-5 h-5" />, change: "-2.1%", trend: "down", color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here&#39;s what&#39;s happening with your store.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((item, i) => (
              <div key={i} className="p-4 px-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap ml-4">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <Link href="/admin/products/new" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-gray-100 transition-all group">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Add New Product</p>
                <p className="text-xs text-gray-500">Create a new product listing</p>
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
            <Link href="/admin/orders" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:border-green-200 border border-gray-100 transition-all group">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">View Orders</p>
                <p className="text-xs text-gray-500">Manage customer orders</p>
              </div>
            </Link>
            <Link href="/" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-gray-100 transition-all group">
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
      </div>
    </div>
  );
}
