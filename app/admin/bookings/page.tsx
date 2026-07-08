'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { Scissors, Check, X, CalendarDays, Eye, RefreshCw, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminBookingsPage() {
  const bookings = useStore((state) => state.bookings);
  const updateBookingStatus = useStore((state) => state.updateBookingStatus);

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'completed' | 'rejected'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.status === statusFilter;
  });

  const handleStatusChange = (id: string, status: any) => {
    updateBookingStatus(id, status);
    toast.success(`Booking ${id} updated to ${status}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg">Tailoring Bookings Manager</h1>
          <p className="text-xs text-charcoal/50 dark:text-primary-bg/50 mt-1">Accept, reject, or complete custom tailoring and alteration appointments</p>
        </div>

        {/* Tab filters */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="bg-white dark:bg-[#1A1816] border border-maroon/10 rounded-lg px-4 py-2 text-xs outline-none focus:border-maroon font-bold text-charcoal dark:text-primary-bg"
        >
          <option value="all">All Booking Slots</option>
          <option value="pending">Pending Review</option>
          <option value="accepted">Accepted / Scheduled</option>
          <option value="completed">Completed Fits</option>
          <option value="rejected">Rejected Bookings</option>
        </select>
      </div>

      {/* Bookings List */}
      <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm">
        
        {filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-maroon/5 text-charcoal/50">
                  <th className="py-3 font-semibold uppercase">Booking details</th>
                  <th className="py-3 font-semibold uppercase">Client Contact</th>
                  <th className="py-3 font-semibold uppercase">Date/Time</th>
                  <th className="py-3 font-semibold uppercase">Notes</th>
                  <th className="py-3 font-semibold uppercase">Status</th>
                  <th className="py-3 font-semibold uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-maroon/5">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-primary-bg/10">
                    <td className="py-4 pr-2">
                      <strong className="block text-charcoal dark:text-primary-bg">{b.id}</strong>
                      <span className="text-[10px] text-maroon font-bold uppercase">{b.serviceName}</span>
                    </td>
                    <td className="py-4 pr-2">
                      <strong className="block text-charcoal dark:text-primary-bg">{b.customerName}</strong>
                      <span className="text-[10px] text-charcoal/40">+91 {b.phone}</span>
                    </td>
                    <td className="py-4">
                      <span>{b.preferredDate}</span>
                      <span className="block text-[10px] text-charcoal/40">{b.preferredTime} slot</span>
                    </td>
                    <td className="py-4 max-w-[200px] truncate text-[10px] text-charcoal/60" title={b.notes}>
                      {b.notes || 'No special requirements'}
                    </td>
                    <td className="py-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className="bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded p-1 text-[10px] text-charcoal dark:text-primary-bg outline-none focus:border-maroon font-bold capitalize"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-4 text-right flex gap-1 justify-end">
                      {b.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(b.id, 'accepted')}
                            className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white rounded text-emerald-500 transition-colors"
                            title="Accept"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(b.id, 'rejected')}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white rounded text-red-500 transition-colors"
                            title="Reject"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                      {b.status === 'accepted' && (
                        <button 
                          onClick={() => handleStatusChange(b.id, 'completed')}
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
          <div className="text-center py-12 flex flex-col items-center gap-2">
            <span className="text-3xl">🤷‍♀️</span>
            <h4 className="font-serif font-bold text-sm text-charcoal dark:text-primary-bg">No bookings match status "{statusFilter}"</h4>
          </div>
        )}

      </div>

    </div>
  );
}
