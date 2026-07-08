'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail, Lock, ShieldAlert, Award, TrendingUp, Users, Scissors } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error('Invalid administrator credentials');
      return;
    }

    // Check role
    const res = await fetch('/api/auth/session');
    const session = await res.json();
    if (session?.user?.role !== 'admin') {
      toast.error('This account does not have admin access');
      return;
    }

    toast.success('Welcome back! Loading Supplier Hub...');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#F8F4EE] dark:bg-[#12100E] flex flex-col md:flex-row">
      
      {/* Left Pane: Supplier Hub branding */}
      <div className="hidden md:flex md:w-1/2 bg-maroon text-primary-bg p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C7A35A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        <div className="relative z-10">
          <h1 className="font-serif text-3xl font-extrabold text-gold">Threads & Traditions</h1>
          <span className="text-[10px] text-primary-bg/60 uppercase tracking-widest">Supplier Hub · Owner Access</span>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <ShieldAlert className="h-10 w-10 text-gold mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-2">Welcome back, Store Owner</h2>
            <p className="text-sm text-primary-bg/75 leading-relaxed">
              Access your live sales dashboard, manage bookings, update product inventory, create custom coupons, and track bank settlements.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans">
            <div className="bg-primary-bg/10 rounded-lg p-4">
              <TrendingUp className="h-5 w-5 text-gold mb-2" />
              <strong className="block text-white">Live Analytics</strong>
              <span className="text-primary-bg/60">Sales & revenue tracking</span>
            </div>
            <div className="bg-primary-bg/10 rounded-lg p-4">
              <Users className="h-5 w-5 text-gold mb-2" />
              <strong className="block text-white">Bookings Pipeline</strong>
              <span className="text-primary-bg/60">Accept or reject fittings</span>
            </div>
            <div className="bg-primary-bg/10 rounded-lg p-4">
              <Award className="h-5 w-5 text-gold mb-2" />
              <strong className="block text-white">Coupon Manager</strong>
              <span className="text-primary-bg/60">Create festive discounts</span>
            </div>
            <div className="bg-primary-bg/10 rounded-lg p-4">
              <Scissors className="h-5 w-5 text-gold mb-2" />
              <strong className="block text-white">Inventory Control</strong>
              <span className="text-primary-bg/60">Add & edit ethnic stock</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-primary-bg/40 font-sans">
          Protected admin portal · Threads & Traditions © 2026
        </div>
      </div>

      {/* Right Pane: Login form */}
      <div className="flex-grow flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-sm bg-white dark:bg-[#1A1816] rounded-2xl border border-maroon/5 p-8 shadow-xl">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-primary-bg">Supplier Hub Login</h2>
            <p className="text-xs text-charcoal/50 dark:text-primary-bg/50 mt-1">Enter your admin credentials below</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="admin@threadsandtraditions.com" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="Admin password" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-maroon hover:bg-maroon/90 disabled:opacity-60 text-primary-bg py-3.5 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md"
            >
              {loading ? 'Verifying...' : 'Enter Supplier Hub'}
            </button>
          </form>

          <div className="mt-6 border-t border-maroon/5 pt-4">
            <p className="text-[10px] text-charcoal/50 text-center font-sans">
              Default: <span className="font-bold text-maroon dark:text-gold">admin@threadsandtraditions.com</span> / <span className="font-bold">admin123</span>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button onClick={() => router.push('/')} className="text-[11px] text-charcoal/40 hover:text-maroon dark:hover:text-gold transition-colors font-sans">
              ← Back to Customer Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
