'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, Truck, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-UNKNOWN';

  useEffect(() => {
    // Premium celebration confetti burst
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#7B2233', '#C7A35A', '#F8F4EE']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7B2233', '#C7A35A', '#F8F4EE']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-6">
      
      {/* Visual Success */}
      <div className="h-20 w-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow">
        <CheckCircle2 className="h-10 w-10" />
      </div>

      <div className="space-y-2 animate-fade-in">
        <span className="text-maroon dark:text-gold font-serif text-xs font-bold tracking-widest uppercase">Thank You for Your Order</span>
        <h1 className="font-serif text-3xl font-extrabold text-charcoal dark:text-primary-bg">
          Order Placed Successfully!
        </h1>
        <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 font-sans px-4">
          Your order has been registered in our boutique system. A notification has been sent with your invoice.
        </p>
      </div>

      {/* Details Box */}
      <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 w-full shadow-sm space-y-4 font-sans text-xs">
        <div className="flex justify-between items-center border-b border-maroon/5 pb-3">
          <span className="text-charcoal/50">Order Number</span>
          <strong className="text-maroon dark:text-gold text-sm uppercase tracking-wider">{orderId}</strong>
        </div>
        
        <div className="flex gap-4 text-left">
          <Truck className="h-5 w-5 text-maroon dark:text-gold flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-charcoal dark:text-primary-bg">Estimated Delivery</h4>
            <p className="text-[10px] text-charcoal/50 mt-0.5">3-5 Business Days (Expedited packing)</p>
          </div>
        </div>

        <div className="flex gap-4 text-left">
          <Calendar className="h-5 w-5 text-maroon dark:text-gold flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-charcoal dark:text-primary-bg">Fits & Alterations</h4>
            <p className="text-[10px] text-charcoal/50 mt-0.5">Includes free alterations within 14 days of receipt.</p>
          </div>
        </div>
      </div>

      {/* Navigation redirects */}
      <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
        <Link 
          href="/account?tab=orders" 
          className="flex-grow bg-white dark:bg-[#1A1816] hover:bg-primary-bg dark:hover:bg-[#12100E] border border-maroon text-maroon dark:text-gold dark:border-gold text-center py-3 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-sm"
        >
          Track My Order
        </Link>
        
        <Link 
          href="/shop" 
          className="flex-grow bg-maroon hover:bg-maroon/90 text-primary-bg text-center py-3 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
        >
          <ShoppingBag className="h-4 w-4" /> Continue Shopping
        </Link>
      </div>

    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-maroon/30 border-t-maroon"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
