'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { 
  LayoutDashboard, ShoppingBag, Scissors, Truck, Percent, 
  Settings, LogOut, ChevronLeft, ShieldCheck, AlertCircle, Home 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useStore((state) => state.currentUser);
  const logout = useStore((state) => state.logout);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/admin/login');
    }
  }, [currentUser, router]);

  if (!mounted) return null;

  // Authorization Guard
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-primary-bg dark:bg-[#12100E] p-4 text-center">
        <div className="p-4 bg-red-500/10 text-red-500 rounded-full mb-4">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold mb-2">Redirecting...</h2>
        <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 max-w-sm mb-6 leading-relaxed">
          Redirecting to Threads & Traditions Seller Hub Login...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg/40 dark:bg-[#12100E]/40 flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal text-primary-bg dark:bg-[#0A0908] border-r border-maroon/10 flex flex-col justify-between py-6 px-4 md:sticky md:top-0 md:h-screen">
        <div className="space-y-8">
          
          {/* Logo brand */}
          <div className="px-4 border-b border-primary-bg/10 pb-4">
            <h2 className="font-serif text-xl font-bold text-gold">Threads & Traditions</h2>
            <span className="text-[10px] text-primary-bg/50 uppercase tracking-widest block mt-0.5">Admin Studio Panel</span>
          </div>

          {/* Links */}
          <nav className="space-y-1 font-sans text-xs">
            {[
              { href: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
              { href: '/admin/products', label: 'Product Manager', icon: ShoppingBag },
              { href: '/admin/bookings', label: 'Bookings Manager', icon: Scissors },
              { href: '/admin/orders', label: 'Orders Manager', icon: Truck },
              { href: '/admin/coupons', label: 'Coupons Manager', icon: Percent },
              { href: '/admin/settings', label: 'Store Settings', icon: Settings }
            ].map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold transition-colors ${
                    isActive
                      ? 'bg-gold text-charcoal font-bold'
                      : 'hover:bg-primary-bg/5 text-primary-bg/85 hover:text-white'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile details bottom */}
        <div className="border-t border-primary-bg/10 pt-4 px-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gold text-charcoal rounded-full flex items-center justify-center font-bold">
              👑
            </div>
            <div>
              <p className="text-[11px] font-bold">Store Admin</p>
              <p className="text-[9px] text-primary-bg/50">Owner Level Access</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link 
              href="/" 
              className="flex-grow flex items-center justify-center gap-1 bg-primary-bg/10 hover:bg-gold hover:text-charcoal py-2 px-3 rounded text-[10px] font-bold uppercase transition-colors"
            >
              <Home className="h-3.5 w-3.5" /> Store
            </Link>
            
            <button
              onClick={() => {
                logout();
                toast.success('Logged out from admin panel');
                router.push('/');
              }}
              className="flex-grow flex items-center justify-center gap-1 bg-red-500/20 hover:bg-red-500 text-white py-2 px-3 rounded text-[10px] font-bold uppercase transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" /> Exit
            </button>
          </div>
        </div>

      </aside>

      {/* Admin Content details area */}
      <main className="flex-grow p-6 sm:p-10 max-w-7xl">
        {children}
      </main>

    </div>
  );
}
