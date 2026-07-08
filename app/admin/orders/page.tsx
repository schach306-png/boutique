'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Check, X, Eye, IndianRupee, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchOrders = () => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.status === statusFilter;
  });

  const handleStatusChange = (id: string, status: any) => {
    fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        toast.success(`Order status updated to ${status}`);
        fetchOrders();
      })
      .catch(() => toast.error('Failed to update order status'));
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C7A35A]/30 border-t-[#7B2233]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg">Store Orders Manager</h1>
          <p className="text-xs text-charcoal/50 dark:text-primary-bg/50 mt-1">Manage delivery pipeline, pack orders, or update tracking status</p>
        </div>

        {/* Tab filters */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white dark:bg-[#1A1816] border border-maroon/10 rounded-lg px-4 py-2 text-xs outline-none focus:border-maroon font-bold text-charcoal dark:text-primary-bg"
        >
          <option value="all">All Store Orders</option>
          <option value="pending">Pending Pack</option>
          <option value="packed">Packed / Ready</option>
          <option value="shipped">Shipped Out</option>
          <option value="delivered">Delivered Buyers</option>
          <option value="cancelled">Cancelled Orders</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm">
        
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-maroon/5 text-charcoal/50">
                  <th className="py-3 font-semibold uppercase">Order ID</th>
                  <th className="py-3 font-semibold uppercase">Buyer / Date</th>
                  <th className="py-3 font-semibold uppercase">Items</th>
                  <th className="py-3 font-semibold uppercase">Total Paid</th>
                  <th className="py-3 font-semibold uppercase">Payment</th>
                  <th className="py-3 font-semibold uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-maroon/5">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-primary-bg/10">
                    <td className="py-4 pr-2">
                      <strong className="block text-charcoal dark:text-primary-bg">{o.id}</strong>
                    </td>
                    <td className="py-4 pr-2">
                      <strong className="block text-charcoal dark:text-primary-bg">{o.customerName}</strong>
                      <span className="text-[10px] text-charcoal/40">{new Date(o.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="py-4 max-w-[200px] truncate">
                      {o.items.map((item: any, idx: number) => (
                        <span key={idx} className="block text-[10px] text-charcoal/70 truncate">
                          {item.productName} ({item.size}) x{item.quantity}
                        </span>
                      ))}
                    </td>
                    <td className="py-4">
                      <strong className="text-maroon dark:text-gold">₹{o.total}</strong>
                      <span className="block text-[9px] text-charcoal/40">Sub: ₹{o.subtotal}</span>
                    </td>
                    <td className="py-4">
                      <span className="bg-maroon/5 text-maroon font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                        {o.paymentMethod}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded p-1 text-[10px] text-charcoal dark:text-primary-bg outline-none focus:border-maroon font-bold capitalize"
                      >
                        <option value="pending">Pending</option>
                        <option value="packed">Packed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 flex flex-col items-center gap-2">
            <span className="text-3xl">🤷‍♀️</span>
            <h4 className="font-serif font-bold text-sm text-charcoal dark:text-primary-bg">No orders match filter "{statusFilter}"</h4>
          </div>
        )}

      </div>

    </div>
  );
}
