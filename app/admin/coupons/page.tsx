'use client';

import React, { useState, useEffect } from 'react';
import { Percent, Trash2, Plus, CalendarDays, Key, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState('');
  const [minSpend, setMinSpend] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const fetchCoupons = () => {
    fetch('/api/coupons')
      .then((res) => res.json())
      .then((data) => {
        // Map database model to template structure
        const mapped = (data || []).map((c: any) => ({
          code: c.code,
          discountType: c.type,
          value: c.discount,
          expiryDate: '2026-12-31',
          minSpend: c.minOrder
        }));
        setCoupons(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !value) {
      toast.error('Please fill out all required fields');
      return;
    }

    fetch('/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code.trim().toUpperCase(),
        type: discountType,
        discount: Number(value),
        minOrder: minSpend ? Number(minSpend) : 0,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        toast.success(`Coupon code "${code.trim().toUpperCase()}" created successfully!`);
        fetchCoupons();
        
        // Reset Form
        setCode('');
        setDiscountType('percentage');
        setValue('');
        setMinSpend('');
        setExpiryDate('');
      })
      .catch(() => toast.error('Failed to create coupon'));
  };

  const handleDeleteClick = (couponCode: string) => {
    if (confirm(`Delete coupon code "${couponCode}"?`)) {
      fetch(`/api/coupons?code=${couponCode}`, { method: 'DELETE' })
        .then((res) => {
          if (!res.ok) throw new Error();
          toast.success('Coupon code deleted from database');
          fetchCoupons();
        })
        .catch(() => toast.error('Failed to delete coupon'));
    }
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
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg">Boutique Coupons Manager</h1>
        <p className="text-xs text-charcoal/50 dark:text-primary-bg/50 mt-1">Create or manage discount coupons for customer checkouts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Column */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm h-fit">
          <h3 className="font-serif font-bold text-base text-maroon dark:text-gold mb-6 border-b border-maroon/5 pb-2 uppercase tracking-wide">
            Create Discount Code
          </h3>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Coupon Code *</label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                <input 
                  type="text" 
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg uppercase font-bold"
                  placeholder="e.g. DIWALI50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Discount Type *</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Cash (₹)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Value *</label>
                <input 
                  type="number" 
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="e.g. 10 or 500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Min Spend (₹)</label>
                <input 
                  type="number" 
                  value={minSpend}
                  onChange={(e) => setMinSpend(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="e.g. 1000"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Expiry Date *</label>
                <input 
                  type="date" 
                  required
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-3.5 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow"
            >
              Generate Coupon
            </button>

          </form>

        </div>

        {/* Coupons List Table Column (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-maroon/5 pb-2">
            <h3 className="font-serif font-bold text-base text-maroon dark:text-gold flex items-center gap-2">
              <Percent className="h-5 w-5" /> Coupon Discount codes
            </h3>
            <span className="text-xs text-charcoal/50">
              Active: <strong>{coupons.length}</strong> codes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-maroon/5 text-charcoal/50">
                  <th className="py-3 font-semibold uppercase">Coupon Code</th>
                  <th className="py-3 font-semibold uppercase">Discount Amount</th>
                  <th className="py-3 font-semibold uppercase">Requirements</th>
                  <th className="py-3 font-semibold uppercase">Expires</th>
                  <th className="py-3 font-semibold uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-maroon/5">
                {coupons.map((c) => (
                  <tr key={c.code} className="hover:bg-primary-bg/10">
                    <td className="py-3.5">
                      <strong className="text-maroon dark:text-gold font-bold uppercase tracking-wider">{c.code}</strong>
                    </td>
                    <td className="py-3.5">
                      <span>{c.discountType === 'percentage' ? `${c.value}% Off` : `₹${c.value} Off`}</span>
                    </td>
                    <td className="py-3.5">
                      <span>{c.minSpend ? `Min spend ₹${c.minSpend}` : 'No minimum spend'}</span>
                    </td>
                    <td className="py-3.5 text-charcoal/60">
                      <span>{new Date(c.expiryDate).toLocaleDateString()}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button 
                        onClick={() => handleDeleteClick(c.code)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white rounded text-red-500 transition-colors"
                        title="Delete Coupon"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
