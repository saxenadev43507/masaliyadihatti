"use client";

import React, { useState } from 'react';
import { Package, Eye, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const mockOrders = [
  { id: "ORD-001", customer: "John Smith", email: "john@example.com", items: 3, total: "$24.47", status: "delivered", date: "2026-04-28" },
  { id: "ORD-002", customer: "Sarah Wilson", email: "sarah@example.com", items: 1, total: "$6.99", status: "shipped", date: "2026-04-28" },
  { id: "ORD-003", customer: "Mike Chen", email: "mike@example.com", items: 5, total: "$35.95", status: "processing", date: "2026-04-27" },
  { id: "ORD-004", customer: "Emily Davis", email: "emily@example.com", items: 2, total: "$12.48", status: "pending", date: "2026-04-27" },
  { id: "ORD-005", customer: "Raj Patel", email: "raj@example.com", items: 4, total: "$28.96", status: "delivered", date: "2026-04-26" },
  { id: "ORD-006", customer: "Lisa Wang", email: "lisa@example.com", items: 1, total: "$7.49", status: "cancelled", date: "2026-04-25" },
];

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  pending: { icon: <Clock className="w-3 h-3" />, color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" },
  processing: { icon: <Package className="w-3 h-3" />, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  shipped: { icon: <Truck className="w-3 h-3" />, color: "text-purple-600", bg: "bg-purple-50 border-purple-200" },
  delivered: { icon: <CheckCircle className="w-3 h-3" />, color: "text-green-600", bg: "bg-green-50 border-green-200" },
  cancelled: { icon: <XCircle className="w-3 h-3" />, color: "text-red-600", bg: "bg-red-50 border-red-200" },
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? mockOrders : mockOrders.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === s ? 'bg-amber-500 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-amber-300'}`}>
            {s === "all" ? "All Orders" : s}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer</th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Items</th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Total</th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(order => {
                const config = statusConfig[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-bold text-gray-900">{order.id}</td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{order.items} items</td>
                    <td className="p-4 text-sm font-bold text-gray-900">{order.total}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config.bg} ${config.color}`}>
                        {config.icon} {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{order.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center"><p className="text-gray-400 font-medium">No orders found</p></div>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
        <p className="text-amber-700 text-sm font-medium">Orders shown are mock data for demonstration. Connect your payment gateway to see real orders.</p>
      </div>
    </div>
  );
}
