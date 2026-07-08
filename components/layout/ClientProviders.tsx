'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SessionProvider, useSession } from 'next-auth/react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsapp from '../ui/FloatingWhatsapp';

function LayoutInner({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const isNoHeaderFooterRoute = pathname === '/' || pathname?.startsWith('/admin');

  useEffect(() => {
    setMounted(true);
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) document.documentElement.classList.add('dark');
  }, []);

  // Route guard: if not logged in and on a storefront page, redirect to gate
  useEffect(() => {
    if (!mounted) return;
    if (status === 'loading') return;
    if (!isNoHeaderFooterRoute && status === 'unauthenticated') {
      router.push('/');
    }
  }, [mounted, status, isNoHeaderFooterRoute, router]);

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F8F4EE]">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#C7A35A]/30 border-t-[#7B2233]"></div>
          <div className="absolute font-serif text-lg font-bold text-[#7B2233]">T&T</div>
        </div>
        <p className="mt-4 font-serif text-sm italic text-[#7B2233]/70 animate-pulse">Crafting perfection...</p>
      </div>
    );
  }

  if (isNoHeaderFooterRoute) return <>{children}</>;

  // Show loading spinner while NextAuth session is resolving
  if (status === 'loading') {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F8F4EE]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C7A35A]/30 border-t-[#7B2233]"></div>
      </div>
    );
  }

  return (
    <>
      <Header session={session} />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LayoutInner>{children}</LayoutInner>
    </SessionProvider>
  );
}
