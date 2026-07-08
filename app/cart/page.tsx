'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Percent, Scissors } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  
  const cart = useStore((state) => state.cart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const coupons = useStore((state) => state.coupons);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; value: number; type: 'percentage' | 'fixed' } | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-4">
        <span className="text-5xl">🛒</span>
        <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-primary-bg">Your Cart is Empty</h2>
        <p className="text-sm text-charcoal/60 dark:text-primary-bg/60 max-w-sm">
          Browse our handpicked ethnic suits, sarees, or check out our premium tailoring services to add items.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link href="/shop" className="bg-maroon text-primary-bg py-3.5 px-8 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow">
            Shop Ethnic Wear
          </Link>
          <Link href="/services" className="bg-white hover:bg-primary-bg text-maroon border border-maroon/20 py-3.5 px-8 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow">
            Book Alterations
          </Link>
        </div>
      </div>
    );
  }

  // Calculate Prices
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  // Coupon deduction
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscount = Number(((subtotal * appliedCoupon.value) / 100).toFixed(2));
    } else {
      couponDiscount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const discountedSubtotal = subtotal - couponDiscount;
  
  // GST calculation (5% for ethnic garments and tailoring finishing)
  const gst = Number((discountedSubtotal * 0.05).toFixed(2));
  
  // Free delivery above ₹1999, else ₹100 shipping
  const shipping = discountedSubtotal > 1999 ? 0 : 100;
  
  const grandTotal = discountedSubtotal + gst + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const matched = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase().trim());
    if (!matched) {
      toast.error('Invalid coupon code!');
      return;
    }

    // Check expiry
    const expiry = new Date(matched.expiryDate);
    if (expiry < new Date()) {
      toast.error('Coupon has expired!');
      return;
    }

    // Check min spend
    if (matched.minSpend && subtotal < matched.minSpend) {
      toast.error(`Minimum purchase of ₹${matched.minSpend} required for this coupon!`);
      return;
    }

    setAppliedCoupon({
      code: matched.code,
      value: matched.value,
      type: matched.discountType
    });
    toast.success(`Coupon "${matched.code}" applied successfully! Discount: ${matched.discountType === 'percentage' ? matched.value + '%' : '₹' + matched.value}`);
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed');
  };

  const handleCheckout = () => {
    // Store coupon states temporarily or pass on checkouts
    // For prototype, we store them in SessionStorage to read at Checkout page
    if (appliedCoupon) {
      sessionStorage.setItem('appliedCoupon', JSON.stringify({
        code: appliedCoupon.code,
        discount: couponDiscount
      }));
    } else {
      sessionStorage.removeItem('appliedCoupon');
    }
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Item list (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          {cart.map((item) => (
            <div 
              key={`${item.product.id}-${item.size}`}
              className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-4 sm:p-6 shadow-sm flex gap-4 sm:gap-6 items-center justify-between"
            >
              {/* Product Info Block */}
              <div className="flex gap-4 items-center">
                <div className="w-16 h-20 sm:w-20 sm:h-24 bg-maroon/10 rounded flex-shrink-0 flex items-center justify-center font-serif text-[10px] text-maroon font-bold p-1 text-center shadow-inner select-none">
                  <div>
                    <span className="text-xl block">👗</span>
                    <span className="truncate block max-w-[70px] uppercase">{item.product.name.substring(0, 8)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-charcoal dark:text-primary-bg line-clamp-2">
                    {item.product.name}
                  </h3>
                  <p className="text-[10px] text-charcoal/50 mt-1 font-sans">
                    Size: <strong className="text-charcoal dark:text-primary-bg">{item.size}</strong> | Fabric: <span className="italic">{item.product.fabric}</span>
                  </p>
                  
                  {/* Price */}
                  <span className="font-sans font-bold text-maroon dark:text-gold text-sm sm:text-base block mt-2">
                    ₹{item.product.price}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                
                {/* Quantity */}
                <div className="flex items-center border border-maroon/10 rounded-lg overflow-hidden bg-primary-bg dark:bg-[#12100E]">
                  <button 
                    onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                    className="px-2.5 py-1 hover:bg-maroon/5 text-charcoal dark:text-primary-bg font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                    className="px-2.5 py-1 hover:bg-maroon/5 text-charcoal dark:text-primary-bg font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => {
                    removeFromCart(item.product.id, item.size);
                    toast.success('Removed product from cart');
                  }}
                  className="text-charcoal/30 hover:text-red-500 p-2 transition-colors rounded-full hover:bg-red-500/5"
                  title="Remove Item"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>

              </div>
            </div>
          ))}

          <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-maroon dark:text-gold hover:underline mt-2">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>

        </div>

        {/* Summary side Card (1 col) */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Coupon input */}
          <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-charcoal/50 mb-3 flex items-center gap-1.5">
              <Percent className="h-4 w-4 text-maroon dark:text-gold" /> Apply Coupon Code
            </h3>
            
            {appliedCoupon ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-emerald-500 font-bold block">Active Coupon</span>
                  <strong className="text-charcoal dark:text-primary-bg">{appliedCoupon.code}</strong>
                </div>
                <button 
                  onClick={handleRemoveCoupon}
                  className="text-red-500 hover:underline font-bold text-[10px] uppercase"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="e.g. WELCOME10" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg uppercase font-bold"
                />
                <button type="submit" className="bg-maroon hover:bg-maroon/90 text-primary-bg px-4 rounded-lg font-serif text-[10px] font-bold tracking-widest uppercase transition-colors">
                  Apply
                </button>
              </form>
            )}
            <p className="text-[9px] text-charcoal/40 mt-1 font-sans">
              * Try coupon: <strong className="text-maroon">WELCOME10</strong> (10% off) or <strong className="text-maroon">FESTIVE500</strong> (₹500 off)
            </p>
          </div>

          {/* Pricing breakdown */}
          <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-maroon dark:text-gold border-b border-maroon/5 pb-2">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-charcoal/60 dark:text-primary-bg/60">Cart Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-500">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <strong>- ₹{couponDiscount}</strong>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-charcoal/60 dark:text-primary-bg/60">Estimated Taxes (GST 5%)</span>
                <strong>₹{gst}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-charcoal/60 dark:text-primary-bg/60">Shipping Delivery Charges</span>
                <strong>{shipping === 0 ? <span className="text-emerald-500">FREE</span> : `₹${shipping}`}</strong>
              </div>
            </div>

            <div className="border-t border-maroon/5 pt-4 flex justify-between items-baseline">
              <span className="font-serif font-bold text-sm">Estimated Total</span>
              <span className="font-sans font-extrabold text-maroon dark:text-gold text-2xl">
                ₹{grandTotal}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-4 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </button>

            {shipping > 0 && (
              <p className="text-[10px] text-charcoal/50 text-center font-sans">
                💡 Add <strong className="text-maroon">₹{(1999 - discountedSubtotal).toFixed(0)}</strong> more to unlock <strong>FREE SHIPPING</strong>!
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
