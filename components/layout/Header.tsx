'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import { 
  Search, ShoppingBag, Heart, User, Menu, X, Sun, Moon, 
  ChevronDown, Scissors, ShoppingCart, LayoutDashboard 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Header({ session }: { session?: Session | null }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const products = useStore((state) => state.products);

  const currentUser = session?.user ?? null;
  const userRole = (currentUser as { role?: string })?.role;

  // Total quantity in cart
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
      toast.success('Dark mode enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
      toast.success('Light mode enabled');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Get matching search suggestions
  const suggestions = searchQuery.trim()
    ? products
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
    : [];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-maroon text-primary-bg text-center py-2 px-4 text-xs font-serif tracking-widest uppercase relative z-50">
        Free Alterations & Saree Finishing on orders above ₹1,999! ✨
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary-bg/90 dark:bg-[#12100E]/90 backdrop-blur-md shadow-md py-3' 
          : 'bg-primary-bg dark:bg-[#12100E] border-b border-maroon/10 py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link 
            href={currentUser ? (userRole === 'admin' ? '/admin' : '/storefront') : '/'} 
            className="flex items-center gap-2 group"
          >
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-maroon dark:text-gold transition-colors">
              Threads & Traditions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-serif">
            <Link 
              href={currentUser ? (userRole === 'admin' ? '/admin' : '/storefront') : '/'} 
              className="text-sm font-medium hover:text-maroon dark:hover:text-gold transition-colors"
            >
              Home
            </Link>
            
            {/* Mega Menu Parent: Shop */}
            <div className="relative group">
              <Link href="/shop" className="text-sm font-medium flex items-center gap-1 hover:text-maroon dark:hover:text-gold transition-colors py-2">
                Shop <ChevronDown className="h-4 w-4" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px] bg-white dark:bg-[#1A1816] rounded-xl shadow-2xl border border-maroon/10 p-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="font-serif font-bold text-maroon dark:text-gold mb-3 text-sm tracking-wider uppercase border-b border-maroon/10 pb-1">Categories</h4>
                  <ul className="space-y-2 text-sm text-charcoal/80 dark:text-primary-bg/85">
                    <li><Link href="/shop?category=suits" className="hover:text-maroon dark:hover:text-gold transition-colors">Indian Suits</Link></li>
                    <li><Link href="/shop?category=sarees" className="hover:text-maroon dark:hover:text-gold transition-colors">Premium Sarees</Link></li>
                    <li><Link href="/shop?category=blouses" className="hover:text-maroon dark:hover:text-gold transition-colors">Designer Blouses</Link></li>
                    <li><Link href="/shop" className="font-semibold text-maroon dark:text-gold hover:underline">View All Collection</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-maroon dark:text-gold mb-3 text-sm tracking-wider uppercase border-b border-maroon/10 pb-1">Tailoring Quick Link</h4>
                  <ul className="space-y-2 text-sm text-charcoal/80 dark:text-primary-bg/85">
                    <li><Link href="/services" className="hover:text-maroon dark:hover:text-gold transition-colors">Blouse Stitching</Link></li>
                    <li><Link href="/services" className="hover:text-maroon dark:hover:text-gold transition-colors">Pico & Fall Finishing</Link></li>
                    <li><Link href="/services" className="hover:text-maroon dark:hover:text-gold transition-colors">Suit Alterations</Link></li>
                    <li><Link href="/services" className="hover:text-maroon dark:hover:text-gold transition-colors">Saree Rolling/Polishing</Link></li>
                  </ul>
                </div>
                <div className="bg-primary-bg dark:bg-[#12100E] p-4 rounded-lg flex flex-col justify-between">
                  <div>
                    <h5 className="font-serif font-bold text-maroon dark:text-gold text-xs uppercase mb-1">Tailoring Studio</h5>
                    <p className="text-xs text-charcoal/70 dark:text-primary-bg/60">Upload designs & schedule personal fittings online.</p>
                  </div>
                  <Link href="/services" className="mt-4 bg-maroon hover:bg-maroon/90 text-primary-bg text-center py-2 px-3 rounded text-xs font-serif tracking-widest uppercase transition-colors">
                    Book Service
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/services" className="text-sm font-medium hover:text-maroon dark:hover:text-gold transition-colors">Tailoring Services</Link>
            <Link href="/about" className="text-sm font-medium hover:text-maroon dark:hover:text-gold transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-maroon dark:hover:text-gold transition-colors">Contact</Link>
          </nav>

          {/* Icon Operations */}
          <div className="flex items-center gap-4 text-charcoal dark:text-primary-bg">
            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:text-maroon dark:hover:text-gold transition-colors rounded-full hover:bg-maroon/5"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Dark Mode */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 hover:text-maroon dark:hover:text-gold transition-colors rounded-full hover:bg-maroon/5"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Wishlist */}
            <Link 
              href="/account?tab=wishlist" 
              className="p-2 hover:text-maroon dark:hover:text-gold transition-colors rounded-full hover:bg-maroon/5 relative"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-maroon text-primary-bg rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="p-2 hover:text-maroon dark:hover:text-gold transition-colors rounded-full hover:bg-maroon/5 relative"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-primary-bg rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Dashboard Check */}
            <div className="relative group">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <Link 
                    href={userRole === 'admin' ? '/admin' : '/account'} 
                    className="p-2 hover:text-maroon dark:hover:text-gold transition-colors rounded-full hover:bg-maroon/5 flex items-center gap-1"
                    aria-label="User Account"
                  >
                    {userRole === 'admin' ? <LayoutDashboard className="h-5 w-5 text-maroon dark:text-gold" /> : <User className="h-5 w-5" />}
                  </Link>
                  {/* Account hover menu */}
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#1A1816] rounded-lg shadow-xl border border-maroon/10 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <p className="px-3 py-1.5 text-xs border-b border-maroon/5 font-semibold font-serif text-maroon dark:text-gold truncate">Hi, {currentUser.name}</p>
                    {userRole === 'admin' ? (
                      <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-maroon/5 rounded transition-colors">
                        <LayoutDashboard className="h-3.5 w-3.5" /> Admin Panel
                      </Link>
                    ) : (
                      <Link href="/account" className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-maroon/5 rounded transition-colors">
                        <User className="h-3.5 w-3.5" /> Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        toast.success('Logged out successfully');
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs hover:bg-red-500/10 text-red-500 rounded transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/account" 
                  className="p-2 hover:text-maroon dark:hover:text-gold transition-colors rounded-full hover:bg-maroon/5"
                  aria-label="Login"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:text-maroon dark:hover:text-gold transition-colors lg:hidden rounded-full"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] z-35 bg-primary-bg dark:bg-[#12100E] border-t border-maroon/10 p-6 flex flex-col justify-between shadow-2xl lg:hidden animate-fade-in">
          <nav className="flex flex-col gap-6 font-serif text-lg">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-maroon dark:hover:text-gold transition-colors border-b border-maroon/5 pb-2">Home</Link>
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-maroon dark:hover:text-gold transition-colors border-b border-maroon/5 pb-2">Shop Ethnic Wear</Link>
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-maroon dark:hover:text-gold transition-colors border-b border-maroon/5 pb-2">Tailoring Services</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-maroon dark:hover:text-gold transition-colors border-b border-maroon/5 pb-2">About Us</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-maroon dark:hover:text-gold transition-colors border-b border-maroon/5 pb-2">Contact</Link>
          </nav>

          <div className="border-t border-maroon/10 pt-6">
            <Link 
              href="/services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-maroon hover:bg-maroon/90 text-primary-bg py-3 rounded-lg font-serif tracking-widest uppercase transition-colors"
            >
              <Scissors className="h-4 w-4" /> Book Tailoring Fit
            </Link>
          </div>
        </div>
      )}

      {/* Search Drawer Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white dark:bg-[#1A1816] w-full max-w-2xl rounded-xl shadow-2xl border border-maroon/10 p-6 animate-slide-up relative">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-charcoal/55 dark:text-primary-bg/50 hover:text-maroon"
            >
              <X className="h-6 w-6" />
            </button>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search premium sarees, designer suits, alteration prices..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-grow border-b-2 border-maroon bg-transparent py-2 text-lg outline-none text-charcoal dark:text-primary-bg"
              />
              <button type="submit" className="bg-maroon hover:bg-maroon/90 text-primary-bg py-2 px-6 rounded-lg font-serif tracking-widest uppercase transition-colors">
                Search
              </button>
            </form>

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-4 border-t border-maroon/5 pt-4">
                <p className="text-xs uppercase font-serif tracking-wider text-charcoal/50 mb-2">Suggestions</p>
                <div className="space-y-2">
                  {suggestions.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        router.push(`/product/${p.id}`);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-maroon/5 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-12 bg-charcoal/10 rounded flex-shrink-0 relative overflow-hidden">
                        {/* We'll use mock placeholder fallback colors/styling since images may be generated/missing */}
                        <div className="w-full h-full bg-maroon/10 flex items-center justify-center font-serif text-[10px] text-maroon font-bold">
                          {p.name.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-charcoal dark:text-primary-bg truncate max-w-md">{p.name}</p>
                        <p className="text-xs text-maroon dark:text-gold font-semibold">₹{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
