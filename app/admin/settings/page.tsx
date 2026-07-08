'use client';

import React, { useState } from 'react';
import { Settings, Shield, Globe, HelpCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('Threads & Traditions');
  const [tagline, setTagline] = useState('Expert Tailoring • Elegant Ethnic Wear');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('contact@threadsandtraditions.com');
  const [address, setAddress] = useState('Shop No. 14, Lotus Plaza, Noida');
  const [taxRate, setTaxRate] = useState('5');
  const [shippingLimit, setShippingLimit] = useState('1999');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Boutique global configurations updated successfully!');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg">Boutique Store Settings</h1>
        <p className="text-xs text-charcoal/50 dark:text-primary-bg/50 mt-1">Configure global business contacts, address location, tax rates, and shipping thresholds</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Business details */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-maroon dark:text-gold border-b border-maroon/5 pb-2">
            1. Business Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Brand Store Name</label>
              <input 
                type="text" 
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Brand Tagline</label>
              <input 
                type="text" 
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Store Phone Contact</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Store Email Contact</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Physical Store Address</label>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
            />
          </div>
        </div>

        {/* Financial info */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-maroon dark:text-gold border-b border-maroon/5 pb-2">
            2. Taxes & Delivery Configurations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Store GST Rate (%)</label>
              <input 
                type="number" 
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Free Shipping Limit Threshold (₹)</label>
              <input 
                type="number" 
                value={shippingLimit}
                onChange={(e) => setShippingLimit(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-maroon hover:bg-maroon/90 text-primary-bg py-3 px-8 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md hover:shadow-xl"
          >
            <Save className="h-4 w-4" /> Save Configurations
          </button>
        </div>

      </form>

    </div>
  );
}
