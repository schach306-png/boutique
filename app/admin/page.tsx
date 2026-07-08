'use client';

import React from 'react';
import { useStore } from '@/lib/store/useStore';
import { 
  IndianRupee, ShoppingBag, Scissors, AlertTriangle, 
  Check, X, Eye, TrendingUp, CalendarDays 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboardPage() {
  const orders = useStore((state) => state.orders);
  const bookings = useStore((state) => state.bookings);
  const products = useStore((state) => state.products);
  
  const updateBookingStatus = useStore((state) => state.updateBookingStatus);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);

  // 1. Calculate stats
  const activeOrders = orders.filter(o => o.status !== 'cancelled');
  const revenue = activeOrders.reduce((acc, o) => acc + o.total, 0);
  const lowStockCount = products.filter(p => p.stock <= 5).length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  const handleAcceptBooking = (id: string) => {
    updateBookingStatus(id, 'accepted');
    toast.success(`Booking ${id} accepted! Consultation scheduled.`);
  };

  const handleRejectBooking = (id: string) => {
    updateBookingStatus(id, 'rejected');
    toast.success(`Booking ${id} rejected.`);
  };

  const handleCompleteBooking = (id: string) => {
    updateBookingStatus(id, 'completed');
    toast.success(`Booking ${id} marked completed!`);
  };

  const handleOrderStatusChange = (id: string, status: any) => {
    updateOrderStatus(id, status);
    toast.success(`Order ${id} status updated to ${status}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg">Store Overview</h1>
        <p className="text-xs text-charcoal/50 dark:text-primary-bg/50 mt-1">Real-time statistics and boutique workflow tools</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Revenue */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full">
            <IndianRupee className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-charcoal/40 uppercase font-bold font-sans">Total Revenue</span>
            <h3 className="text-xl font-extrabold font-sans mt-0.5">₹{revenue.toLocaleString()}</h3>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-sky-500/10 text-sky-500 rounded-full">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-charcoal/40 uppercase font-bold font-sans">Orders Placed</span>
            <h3 className="text-xl font-extrabold font-sans mt-0.5">{orders.length} Orders</h3>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-gold/10 text-gold rounded-full">
            <Scissors className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-charcoal/40 uppercase font-bold font-sans">Pending Fits Slots</span>
            <h3 className="text-xl font-extrabold font-sans mt-0.5">{pendingBookings} Bookings</h3>
          </div>
        </div>

        {/* Low Stock alert */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-red-500/10 text-red-500 rounded-full">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-charcoal/40 uppercase font-bold font-sans">Low Stock Alerts</span>
            <h3 className="text-xl font-extrabold font-sans mt-0.5">{lowStockCount} Products</h3>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Bookings Panel */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-maroon/5 pb-2">
            <h3 className="font-serif font-bold text-base text-maroon dark:text-gold flex items-center gap-2">
              <CalendarDays className="h-5 w-5" /> Recent Tailoring Bookings
            </h3>
            <span className="text-[10px] bg-maroon/10 text-maroon font-bold px-2 py-0.5 rounded-full font-sans">
              Live Pipeline
            </span>
          </div>

          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="border-b border-maroon/5 text-charcoal/50">
                    <th className="py-3 font-semibold uppercase">Booking details</th>
                    <th className="py-3 font-semibold uppercase">Date/Time</th>
                    <th className="py-3 font-semibold uppercase">Status</th>
                    <th className="py-3 font-semibold uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-maroon/5">
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id} className="hover:bg-primary-bg/10">
                      <td className="py-3.5 pr-2">
                        <strong className="block text-charcoal dark:text-primary-bg">{b.customerName}</strong>
                        <span className="text-[10px] text-charcoal/40">{b.serviceName}</span>
                      </td>
                      <td className="py-3.5">
                        <span>{b.preferredDate}</span>
                        <span className="block text-[10px] text-charcoal/40">{b.preferredTime} Slot</span>
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${
                          b.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                          b.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                          b.status === 'accepted' ? 'bg-sky-500/10 text-sky-500' :
                          'bg-gold/10 text-gold font-semibold'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right flex gap-1 justify-end">
                        {b.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleAcceptBooking(b.id)}
                              className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white rounded text-emerald-500 transition-colors"
                              title="Accept Fitting"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleRejectBooking(b.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white rounded text-red-500 transition-colors"
                              title="Reject Fitting"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                        {b.status === 'accepted' && (
                          <button 
                            onClick={() => handleCompleteBooking(b.id)}
                            className="bg-emerald-500 text-white font-semibold font-serif text-[9px] uppercase tracking-wider py-1 px-2.5 rounded hover:bg-emerald-600 transition-colors"
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-charcoal/50 py-6 text-center">No bookings registered yet.</p>
          )}
        </div>

        {/* Orders Panel */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-maroon/5 pb-2">
            <h3 className="font-serif font-bold text-base text-maroon dark:text-gold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" /> Recent Orders & Drapes
            </h3>
            <span className="text-[10px] bg-sky-500/10 text-sky-500 font-bold px-2 py-0.5 rounded-full font-sans">
              Garments Stock
            </span>
          </div>

          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="border-b border-maroon/5 text-charcoal/50">
                    <th className="py-3 font-semibold uppercase">Order / Buyer</th>
                    <th className="py-3 font-semibold uppercase">Total</th>
                    <th className="py-3 font-semibold uppercase">Delivery Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-maroon/5">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-primary-bg/10">
                      <td className="py-3.5 pr-2">
                        <strong className="block text-charcoal dark:text-primary-bg">{o.id}</strong>
                        <span className="text-[10px] text-charcoal/40">{o.customerName} ({o.items.length} items)</span>
                      </td>
                      <td className="py-3.5">
                        <strong className="text-maroon dark:text-gold font-bold">₹{o.total}</strong>
                        <span className="block text-[9px] text-charcoal/40 uppercase mt-0.5">{o.paymentMethod}</span>
                      </td>
                      <td className="py-3.5">
                        <select
                          value={o.status}
                          onChange={(e) => handleOrderStatusChange(o.id, e.target.value)}
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
            <p className="text-xs text-charcoal/50 py-6 text-center">No orders registered yet.</p>
          )}
        </div>

      </div>

    </div>
  );
}
