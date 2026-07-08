'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsapp from '../ui/FloatingWhatsapp';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useStore((state) => state.currentUser);
  
  const isNoHeaderFooterRoute = pathname === '/' || pathname?.startsWith('/admin');

  useEffect(() => {
    setMounted(true);
    
    // Check local storage for dark mode
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Customer Route Guard: Redirect unauthenticated customers back to gate
  useEffect(() => {
    if (mounted && !currentUser && !isNoHeaderFooterRoute) {
      router.push('/');
    }
  }, [currentUser, pathname, mounted, isNoHeaderFooterRoute, router]);

  if (!mounted) {
    // Elegant loading screen
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F8F4EE]">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#C7A35A]/30 border-t-[#7B2233]"></div>
          <div className="absolute font-serif text-lg font-bold text-[#7B2233]">T&T</div>
        </div>
        <p className="mt-4 font-serif text-sm italic text-[#7B2233]/70 animate-pulse">
          Crafting perfection...
        </p>
      </div>
    );
  }

  if (isNoHeaderFooterRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
