'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { useSession, signOut } from 'next-auth/react';
import ProductCard from '@/components/shop/ProductCard';
import { 
  User, ShoppingBag, Heart, Calendar, MapPin, 
  Settings, LogOut, CheckCircle2, AlertCircle, Trash2, 
  Plus, Key, Mail, Lock, Sparkles 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F8F4EE]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C7A35A]/30 border-t-[#7B2233]"></div>
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';

  const { data: session, status } = useSession();
  const currentUser = session?.user;
  const userRole = (currentUser as any)?.role;
  const userEmail = currentUser?.email;
  const userName = currentUser?.name;

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const wishlistIds = useStore((state) => state.wishlist);

  // Address local state
  const [addresses, setAddresses] = useState<string[]>([
    'Shop 14, Lotus Plaza, Sector 15, Noida, Uttar Pradesh'
  ]);

  // Tab State
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  // Profile Edit
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');

  // Address Add
  const [newAddress, setNewAddress] = useState('');

  // Sync tab from URL
  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Fetch dashboard data
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

    setLoading(true);
    Promise.all([
      fetch('/api/products').then((res) => res.json()),
      fetch('/api/orders').then((res) => res.json()),
      fetch('/api/bookings').then((res) => res.json()),
    ])
      .then(([productsData, ordersData, bookingsData]) => {
        setProducts(productsData || []);
        setOrders(ordersData || []);
        setBookings(bookingsData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [status, router]);

  // Sync profile details when logged in
  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name || '');
      setProfileEmail(currentUser.email || '');
      // Pull addresses if any exist on the user object
      const userAddrs = (currentUser as any).addresses;
      if (userAddrs && userAddrs.length > 0) {
        setAddresses(userAddrs);
      }
    }
  }, [currentUser]);

  // Handle Update Profile (Local confirmation for prototype)
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile details updated (local preview)');
  };

  // Handle Add Address
  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;
    setAddresses([...addresses, newAddress.trim()]);
    toast.success('Address saved successfully');
    setNewAddress('');
  };

  // Get Wishlist Products
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  // Get user specific orders & bookings (filtered by email)
  const userOrders = userRole === 'admin' 
    ? orders 
    : orders.filter(o => o.email === userEmail);

  const userBookings = userRole === 'admin'
    ? bookings
    : bookings.filter(b => b.customerName === userName || b.phone === (currentUser as any).phone);

  if (status === 'loading' || loading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F8F4EE]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C7A35A]/30 border-t-[#7B2233]"></div>
      </div>
    );
  }

  // Redirect to welcome gate if unauthenticated
  if (status === 'unauthenticated' || !currentUser) {
    return null;
  }



  // Dashboard View (Logged In)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Welcome details banner */}
      <div className="bg-maroon text-primary-bg rounded-2xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-gold">Customer Dashboard</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1">Namaste, {currentUser.name}!</h1>
          <p className="text-xs text-primary-bg/75 font-sans mt-0.5">Signed in: {currentUser.email}</p>
        </div>
        
        {userRole === 'admin' && (
          <button 
            onClick={() => router.push('/admin')}
            className="bg-gold hover:bg-gold/90 text-charcoal text-xs font-serif tracking-widest uppercase py-2 px-6 rounded-lg font-bold transition-colors"
          >
            Store Owner Dashboard
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-1 bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-4 shadow-sm h-fit space-y-1">
          {[
            { id: 'profile', label: 'My Profile', icon: User },
            { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: userOrders.length },
            { id: 'bookings', label: 'Tailoring Bookings', icon: Calendar, count: userBookings.length },
            { id: 'wishlist', label: 'My Wishlist', icon: Heart, count: wishlistIds.length },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-semibold font-sans transition-all ${
                  activeTab === tab.id
                    ? 'bg-maroon text-primary-bg font-bold'
                    : 'text-charcoal/70 dark:text-primary-bg/70 hover:bg-maroon/5 hover:text-maroon'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-gold text-charcoal' : 'bg-maroon/10 text-maroon'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={() => {
              signOut({ callbackUrl: '/' });
              toast.success('Logged out successfully');
            }}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-red-500 hover:bg-red-500/5 rounded-lg text-xs font-semibold font-sans transition-all pt-4 border-t border-maroon/5 mt-4"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout Account</span>
          </button>
        </div>

        {/* Right Active Tab Content */}
        <div className="lg:col-span-3 bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 sm:p-8 shadow-sm">
          
          {/* Tab 1: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-base text-maroon dark:text-gold border-b border-maroon/5 pb-2 uppercase tracking-wide">
                Profile Details
              </h3>

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                <div>
                  <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-maroon hover:bg-maroon/90 text-primary-bg py-2.5 px-6 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-base text-maroon dark:text-gold border-b border-maroon/5 pb-2 uppercase tracking-wide">
                My Purchase History
              </h3>

              {userOrders.length > 0 ? (
                <div className="space-y-6">
                  {userOrders.map((o) => (
                    <div key={o.id} className="border border-maroon/10 rounded-xl overflow-hidden shadow-sm">
                      {/* Summary Banner */}
                      <div className="bg-primary-bg dark:bg-[#12100E] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs border-b border-maroon/5 font-sans">
                        <div>
                          <p className="text-[10px] text-charcoal/50">Order Date: {new Date(o.createdAt).toLocaleDateString()}</p>
                          <strong className="text-charcoal dark:text-primary-bg">Order ID: {o.id}</strong>
                        </div>
                        <div className="flex gap-4">
                          <div>
                            <span className="text-[10px] text-charcoal/50 block">Grand Total</span>
                            <strong className="text-maroon dark:text-gold">₹{o.total}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-charcoal/50 block">Status</span>
                            <span className={`font-bold px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wide ${
                              o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                              o.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                              'bg-gold/10 text-gold font-semibold'
                            }`}>
                              {o.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="p-4 divide-y divide-maroon/5">
                        {o.items.map((item: any, idx: number) => (
                          <div key={idx} className="py-3 flex justify-between items-center text-xs gap-3">
                            <div>
                              <p className="font-bold text-charcoal dark:text-primary-bg truncate max-w-sm">{item.productName}</p>
                              <span className="text-[10px] text-charcoal/40">Size: {item.size} | Qty: {item.quantity}</span>
                            </div>
                            <strong>₹{item.price * item.quantity}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-primary-bg dark:bg-[#12100E] rounded-xl border border-maroon/5 flex flex-col items-center gap-2">
                  <span className="text-2xl">📦</span>
                  <h4 className="font-serif font-bold text-sm text-charcoal dark:text-primary-bg">No orders yet</h4>
                  <p className="text-[10px] text-charcoal/40">You haven't purchased anything yet. Browse our premium store catalog.</p>
                  <Link href="/shop" className="bg-maroon text-primary-bg text-[10px] font-serif tracking-widest uppercase py-2 px-4 rounded mt-2">
                    Browse Shop
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Tailoring Bookings */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-base text-maroon dark:text-gold border-b border-maroon/5 pb-2 uppercase tracking-wide">
                Tailoring appointments
              </h3>

              {userBookings.length > 0 ? (
                <div className="space-y-4 font-sans text-xs">
                  {userBookings.map((b) => (
                    <div 
                      key={b.id}
                      className="border border-maroon/10 rounded-xl p-4 sm:p-6 shadow-sm space-y-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] text-charcoal/40 block">Booking ID: {b.id}</span>
                          <h4 className="font-serif font-bold text-sm text-charcoal dark:text-primary-bg mt-0.5">{b.serviceName}</h4>
                        </div>
                        <span className={`font-bold px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wide ${
                          b.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                          b.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                          b.status === 'accepted' ? 'bg-sky-500/10 text-sky-500' :
                          'bg-gold/10 text-gold font-semibold'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-maroon/5 pt-4 text-[10px] text-charcoal/50">
                        <div>
                          <span>Appointment Slot</span>
                          <strong className="block text-charcoal dark:text-primary-bg mt-0.5">{b.preferredDate} at {b.preferredTime}</strong>
                        </div>
                        <div>
                          <span>Customer Phone</span>
                          <strong className="block text-charcoal dark:text-primary-bg mt-0.5">+91 {b.phone}</strong>
                        </div>
                      </div>

                      {b.notes && (
                        <div className="bg-primary-bg dark:bg-[#12100E] p-3 rounded text-[10px]">
                          <span className="text-charcoal/40 font-bold block mb-1">Tailor Note:</span>
                          <p className="italic text-charcoal/70 dark:text-primary-bg/70">{b.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-primary-bg dark:bg-[#12100E] rounded-xl border border-maroon/5 flex flex-col items-center gap-2">
                  <span className="text-2xl">✂️</span>
                  <h4 className="font-serif font-bold text-sm text-charcoal dark:text-primary-bg">No bookings yet</h4>
                  <p className="text-[10px] text-charcoal/40">You don't have any tailoring fit appointments yet.</p>
                  <Link href="/services" className="bg-maroon text-primary-bg text-[10px] font-serif tracking-widest uppercase py-2 px-4 rounded mt-2">
                    Book Tailor Service
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-base text-maroon dark:text-gold border-b border-maroon/5 pb-2 uppercase tracking-wide">
                My Boutique Wishlist
              </h3>

              {wishlistedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlistedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-primary-bg dark:bg-[#12100E] rounded-xl border border-maroon/5 flex flex-col items-center gap-2">
                  <span className="text-2xl">💖</span>
                  <h4 className="font-serif font-bold text-sm text-charcoal dark:text-primary-bg">Wishlist is empty</h4>
                  <p className="text-[10px] text-charcoal/40">Save your favorite Indian suits, sarees, or blouses here!</p>
                  <Link href="/shop" className="bg-maroon text-primary-bg text-[10px] font-serif tracking-widest uppercase py-2 px-4 rounded mt-2">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-base text-maroon dark:text-gold border-b border-maroon/5 pb-2 uppercase tracking-wide">
                Saved Delivery Addresses
              </h3>

              {/* Saved list */}
              <div className="space-y-4">
                {addresses.map((address, idx) => (
                  <div key={idx} className="bg-primary-bg dark:bg-[#12100E] border border-maroon/5 p-4 rounded-xl flex justify-between items-center text-xs">
                    <p className="leading-relaxed font-sans max-w-[80%]">{address}</p>
                    <button
                      onClick={() => {
                        setAddresses(addresses.filter((_, i) => i !== idx));
                        toast.success('Address deleted');
                      }}
                      disabled={addresses.length === 1}
                      className="text-charcoal/30 hover:text-red-500 p-2 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Delete Address"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add form */}
              <form onSubmit={handleAddAddressSubmit} className="pt-4 border-t border-maroon/5 space-y-3">
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Add New Delivery Address</label>
                <textarea
                  required
                  rows={2}
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg resize-none"
                  placeholder="e.g. Flat 12, Sector 15, Noida, Uttar Pradesh"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-maroon hover:bg-maroon/90 text-primary-bg py-2.5 px-6 rounded-lg font-serif text-[10px] font-bold tracking-widest uppercase transition-all shadow"
                >
                  <Plus className="h-4 w-4" /> Add Address
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

