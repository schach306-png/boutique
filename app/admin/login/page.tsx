'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { Mail, Lock, ShieldAlert, Award, TrendingUp, Users, Scissors } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const currentUser = useStore((state) => state.currentUser);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const login = useStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in as admin, redirect to admin dashboard
  useEffect(() => {
    if (isAuthenticated && currentUser?.role === 'admin') {
      router.push('/admin');
    }
  }, [isAuthenticated, currentUser, router]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    // Standard admin check: email contains admin or matches specific account
    if (email.toLowerCase().includes('admin')) {
      login(email, 'admin');
      toast.success('Successfully logged into Owner Admin Panel! Opening workspace...');
      router.push('/admin');
    } else {
      toast.error('Invalid Administrator credentials! Try entering an email containing "admin".');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EE] dark:bg-[#12100E] flex flex-col md:flex-row">
      
      {/* Left Pane: Supplier Hub branding */}
      <div className="hidden md:flex md:w-1/2 bg-maroon text-primary-bg p-12 flex-col justify-between relative overflow-hidden">
        
        {/* Decorative pattern overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(#C7A35A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        <div className="relative z-10">
          <span className="font-serif text-gold text-2xl font-extrabold tracking-tight">Threads & Traditions</span>
          <span className="bg-gold/10 text-gold text-[10px] font-bold font-sans uppercase tracking-widest px-3 py-1 rounded-full ml-3">
            Supplier Portal
          </span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight">
            Manage your boutique stitching orders & garment catalog
          </h1>
          <p className="text-sm text-primary-bg/85 font-sans leading-relaxed">
            Similar to Flipkart Seller Hub or Meesho Supplier Panel, our Owner Portal helps you list handloom products, track measurements, process tailors payouts, and view settled balances.
          </p>

          {/* Highlights grid */}
          <div className="grid grid-cols-2 gap-6 pt-4 font-sans text-xs">
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/10 rounded-lg text-gold">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <strong className="block text-white">Interactive Payouts</strong>
                <span className="text-primary-bg/60">Calculate weekly earnings & payouts</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/10 rounded-lg text-gold">
                <Scissors className="h-5 w-5" />
              </div>
              <div>
                <strong className="block text-white">Stitching Pipelines</strong>
                <span className="text-primary-bg/60">Accept, reject & complete fits slots</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/10 rounded-lg text-gold">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <strong className="block text-white">Customer Insights</strong>
                <span className="text-primary-bg/60">Track addresses & purchase logs</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/10 rounded-lg text-gold">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <strong className="block text-white">Inventory Controls</strong>
                <span className="text-primary-bg/60">Update stocks and add catalog items</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-primary-bg/50 font-sans">
          © {new Date().getFullYear()} Threads & Traditions Seller Hub. Designed for local boutique expansions.
        </div>

      </div>

      {/* Right Pane: Login Form */}
      <div className="flex-grow flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md bg-white dark:bg-[#1A1816] rounded-2xl border border-maroon/5 p-8 shadow-xl relative">
          
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-primary-bg">Admin Sign In</h2>
            <p className="text-xs text-charcoal/50 mt-1">Access the boutique catalog and customer booking hubs</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            
            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Admin Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="e.g. admin@threadsandtraditions.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="e.g. admin123"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-3.5 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md"
            >
              Log In to Dashboard
            </button>

          </form>

          {/* Sandbox warning */}
          <div className="mt-6 bg-[#F8F4EE] dark:bg-[#12100E] p-4 rounded-lg flex gap-2.5 items-start text-[10px] text-charcoal/60 leading-relaxed font-sans border border-maroon/5">
            <ShieldAlert className="h-4 w-4 text-maroon flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-maroon block mb-0.5">Admin Testing Bypass</strong>
              <span>Any email containing the word <strong className="text-maroon">"admin"</strong> with any password will successfully authorize and log you into the Seller dashboard.</span>
            </div>
          </div>

          <div className="text-center mt-6">
            <button 
              onClick={() => router.push('/')}
              className="text-xs text-maroon hover:underline font-semibold"
            >
              Back to Storefront View
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
