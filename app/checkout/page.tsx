'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { CheckCircle2, ChevronRight, CreditCard, Landmark, QrCode, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useStore((state) => state.cart);
  const currentUser = useStore((state) => state.currentUser);
  const placeOrder = useStore((state) => state.placeOrder);
  const clearCart = useStore((state) => state.clearCart);

  // Address states
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('9876543210');
  const [shippingAddress, setShippingAddress] = useState(currentUser?.addresses[0] || '');
  const [billingAddress, setBillingAddress] = useState(currentUser?.addresses[0] || '');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'Card'>('COD');

  // Coupon read from SessionStorage
  const [couponInfo, setCouponInfo] = useState<{ code: string; discount: number } | null>(null);

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
    const savedCoupon = sessionStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      setCouponInfo(JSON.parse(savedCoupon));
    }
  }, [cart, router]);

  // Sync billing if checkbox active
  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress(shippingAddress);
    }
  }, [shippingAddress, sameAsShipping]);

  if (cart.length === 0) return null;

  // Calculate pricing
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discount = couponInfo ? couponInfo.discount : 0;
  const discountedSubtotal = subtotal - discount;
  const gst = Number((discountedSubtotal * 0.05).toFixed(2));
  const shippingCost = discountedSubtotal > 1999 ? 0 : 100;
  const grandTotal = discountedSubtotal + gst + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !phone || !shippingAddress || !billingAddress) {
      toast.error('Please fill out all contact and address fields');
      return;
    }

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      image: item.product.images[0] || '',
      price: item.product.price,
      quantity: item.quantity,
      size: item.size
    }));

    // Place order in store
    const newOrderId = placeOrder({
      customerName,
      email,
      phone,
      shippingAddress,
      billingAddress,
      items: orderItems,
      subtotal,
      tax: gst,
      shipping: shippingCost,
      total: grandTotal,
      paymentMethod
    });

    clearCart();
    sessionStorage.removeItem('appliedCoupon');
    
    toast.success('Order placed successfully! 🎉');
    router.push(`/order-success?orderId=${newOrderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg mb-8">Secure Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Shipping & Payment Fields (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer Contacts */}
          <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-maroon dark:text-gold border-b border-maroon/5 pb-2">
              1. Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Phone Number (For delivery updates)</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
              />
            </div>
          </div>

          {/* Delivery Addresses */}
          <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-maroon dark:text-gold border-b border-maroon/5 pb-2">
              2. Delivery Address
            </h3>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Shipping Address Details</label>
              <textarea 
                required
                rows={3}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg resize-none"
                placeholder="House No, Apartment Block, Street Sector, Landmark, PIN code, City State"
              />
            </div>

            <label className="flex items-center gap-2 text-xs cursor-pointer font-semibold">
              <input 
                type="checkbox" 
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
                className="accent-maroon"
              />
              <span>Billing address is same as shipping</span>
            </label>

            {!sameAsShipping && (
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Billing Address Details</label>
                <textarea 
                  required
                  rows={3}
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg resize-none"
                  placeholder="House No, Street, PIN code, City State"
                />
              </div>
            )}
          </div>

          {/* Payment Selections */}
          <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-maroon dark:text-gold border-b border-maroon/5 pb-2">
              3. Payment Option
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Option COD */}
              <label className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'COD' 
                  ? 'border-maroon bg-maroon/5' 
                  : 'border-maroon/10 hover:border-maroon'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input 
                    type="radio" 
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-maroon"
                  />
                  <div>
                    <span className="text-xs font-bold block">Cash on Delivery</span>
                    <span className="text-[9px] text-charcoal/50">Pay cash/UPI at door</span>
                  </div>
                </div>
                <Smartphone className="h-5 w-5 text-maroon/60" />
              </label>

              {/* Option UPI QR */}
              <label className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'UPI' 
                  ? 'border-maroon bg-maroon/5' 
                  : 'border-maroon/10 hover:border-maroon'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input 
                    type="radio" 
                    name="payment"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="accent-maroon"
                  />
                  <div>
                    <span className="text-xs font-bold block">Scan UPI QR</span>
                    <span className="text-[9px] text-charcoal/50">Instant bank routing</span>
                  </div>
                </div>
                <QrCode className="h-5 w-5 text-maroon/60" />
              </label>

              {/* Option Online Cards */}
              <label className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'Card' 
                  ? 'border-maroon bg-maroon/5' 
                  : 'border-maroon/10 hover:border-maroon'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input 
                    type="radio" 
                    name="payment"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="accent-maroon"
                  />
                  <div>
                    <span className="text-xs font-bold block">Card / NetBanking</span>
                    <span className="text-[9px] text-charcoal/50">Credit, Debit & Net</span>
                  </div>
                </div>
                <CreditCard className="h-5 w-5 text-maroon/60" />
              </label>

            </div>

            {/* UPI QR Display details */}
            {paymentMethod === 'UPI' && (
              <div className="bg-primary-bg dark:bg-[#12100E] border border-maroon/5 rounded-lg p-6 flex flex-col items-center gap-3 animate-fade-in">
                <span className="text-xs font-bold text-center">Scan QR Code below with GPay, PhonePe, or Paytm</span>
                <div className="w-40 h-40 bg-white border-2 border-maroon p-2 rounded-lg flex items-center justify-center shadow-inner relative">
                  {/* Visual simulated QR */}
                  <div className="w-full h-full bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:8px_8px] border-4 border-charcoal/20 flex items-center justify-center font-bold text-maroon text-[10px] text-center font-serif leading-tight">
                    <span>UPI QR CODE<br/>STORE PROTOTYPE</span>
                  </div>
                </div>
                <p className="text-[10px] text-charcoal/60 dark:text-primary-bg/60 text-center font-semibold">
                  Mothers Account: <strong className="text-maroon dark:text-gold">shalini.sharma@okaxis</strong><br/>
                  Amount Payable: <strong className="text-maroon dark:text-gold text-xs">₹{grandTotal}</strong>
                </p>
              </div>
            )}

            {/* Online payment secure sandbox */}
            {paymentMethod === 'Card' && (
              <div className="bg-primary-bg dark:bg-[#12100E] border border-maroon/5 rounded-lg p-6 space-y-3 animate-fade-in">
                <span className="text-xs font-bold block">Demo Card Sandbox</span>
                <div className="grid grid-cols-3 gap-2">
                  <input 
                    type="text" 
                    placeholder="Card Number" 
                    disabled 
                    value="4111 2222 3333 4444"
                    className="col-span-3 bg-white/50 dark:bg-charcoal/50 border border-maroon/5 rounded p-2 text-xs outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Expiry" 
                    disabled 
                    value="12/29"
                    className="col-span-2 bg-white/50 dark:bg-charcoal/50 border border-maroon/5 rounded p-2 text-xs outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="CVV" 
                    disabled 
                    value="***"
                    className="col-span-1 bg-white/50 dark:bg-charcoal/50 border border-maroon/5 rounded p-2 text-xs outline-none"
                  />
                </div>
                <p className="text-[9px] text-charcoal/40 italic">* Payments will bypass automatically during this prototype phase.</p>
              </div>
            )}

          </div>

        </div>

        {/* Checkout Summary Sidebar (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-maroon dark:text-gold border-b border-maroon/5 pb-2">
              Order Review
            </h3>

            <div className="divide-y divide-maroon/5 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="py-3 flex justify-between text-xs gap-3">
                  <div>
                    <p className="font-semibold text-charcoal dark:text-primary-bg truncate max-w-[160px]">{item.product.name}</p>
                    <span className="text-[10px] text-charcoal/40">Size: {item.size} | Qty: {item.quantity}</span>
                  </div>
                  <strong className="text-maroon dark:text-gold">₹{item.product.price * item.quantity}</strong>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div className="border-t border-maroon/5 pt-4 space-y-2 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-charcoal/60 dark:text-primary-bg/60">Cart Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-500">
                  <span>Coupon Discount</span>
                  <span>- ₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-charcoal/60 dark:text-primary-bg/60">Tax (GST 5%)</span>
                <span>₹{gst}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-charcoal/60 dark:text-primary-bg/60">Shipping</span>
                <span>{shippingCost === 0 ? <strong className="text-emerald-500">FREE</strong> : `₹${shippingCost}`}</span>
              </div>

              <div className="border-t border-maroon/5 pt-3 flex justify-between items-baseline">
                <span className="font-serif font-bold text-sm">Grand Total</span>
                <span className="font-sans font-extrabold text-maroon dark:text-gold text-xl">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-4 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2"
            >
              Place Order ₹{grandTotal}
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}
