'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { 
  Mail, Lock, User, Sparkles, Scissors, Heart, 
  ShieldCheck, ArrowRight, BookOpen, Star 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function EntranceGatePage() {
  const router = useRouter();
  const currentUser = useStore((state) => state.currentUser);
  const login = useStore((state) => state.login);
  const updateProfile = useStore((state) => state.updateProfile);

  // Tabs: 'signin' | 'register'
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // If already logged in, redirect to storefront homepage
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/storefront');
      }
    }
  }, [currentUser, router]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    if (email.toLowerCase().includes('admin')) {
      login(email, 'admin');
      toast.success('Sign in successful! Entering Supplier Hub...');
      router.push('/admin');
      return;
    }

    login(email, 'customer');
    toast.success('Welcome back! Entering storefront...');
    router.push('/storefront');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill out all fields to register');
      return;
    }

    login(email, 'customer');
    updateProfile(name, email);
    toast.success(`Welcome to Threads & Traditions, ${name}!`);
    router.push('/storefront');
  };

  return (
    <div className="min-h-[90vh] flex flex-col md:flex-row bg-[#F8F4EE] dark:bg-[#12100E] border-b border-maroon/10">
      
      {/* Left Pane: Boutique Legacy & Highlights (Meesho/Flipkart Seller branding but for buyers) */}
      <div className="w-full md:w-1/2 bg-maroon text-primary-bg p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
        
        {/* Background visual motif patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(#C7A35A_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-10 z-0" />
        
        <div className="relative z-10 flex items-center gap-2 mb-8">
          <span className="font-serif text-gold text-2xl sm:text-3xl font-extrabold tracking-tight">Threads & Traditions</span>
          <span className="bg-gold/10 text-gold text-[9px] font-bold font-sans uppercase tracking-widest px-2.5 py-0.5 rounded-full">
            Studio
          </span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <span className="flex items-center gap-1.5 text-gold text-xs font-serif font-bold tracking-widest uppercase">
            <Sparkles className="h-4 w-4" /> Elegance Tailored To Perfection
          </span>
          
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
            Custom Drapes, Heavy Blouses, & Handloom Heritage.
          </h1>
          
          <p className="text-xs sm:text-sm text-primary-bg/85 font-sans leading-relaxed">
            Welcome to your mother's tailor studio. We specialize in custom padded designer blouses, neat pico-fall bindings, salwar kameez alterations, and handpicked premium silk sarees. Log in to explore the store catalog, book alterations pickup, or track payments.
          </p>

          {/* Legacy figures */}
          <div className="grid grid-cols-2 gap-6 pt-4 font-sans text-xs border-t border-white/10">
            <div className="flex gap-3 items-center">
              <span className="text-3xl">🧵</span>
              <div>
                <strong className="block text-white text-sm">15+ Years</strong>
                <span className="text-primary-bg/60">Stitching legacy perfection</span>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <span className="text-3xl">📐</span>
              <div>
                <strong className="block text-white text-sm">5,000+ Fits</strong>
                <span className="text-primary-bg/60">Flawless custom alterations</span>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <span className="text-3xl">💖</span>
              <div>
                <strong className="block text-white text-sm">Fit Guarantee</strong>
                <span className="text-primary-bg/60">Free fitting corrections in 14 days</span>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <span className="text-3xl">🌾</span>
              <div>
                <strong className="block text-white text-sm">Weaver Direct</strong>
                <span className="text-primary-bg/60">Authentic silk sarees stock</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-primary-bg/50 mt-8 md:mt-0 font-sans flex items-center gap-1">
          <ShieldCheck className="h-4.5 w-4.5 text-gold" />
          <span>Secured entry gate. Direct payments integration ready.</span>
        </div>

      </div>

      {/* Right Pane: Login and Access Tabs */}
      <div className="flex-grow flex items-center justify-center p-6 sm:p-12 md:p-16">
        <div className="w-full max-w-md bg-white dark:bg-[#1A1816] rounded-2xl border border-maroon/5 p-8 shadow-xl relative animate-slide-up">
          
          {/* Header tabs selector */}
          <div className="grid grid-cols-2 gap-2 mb-8 border-b border-maroon/5 pb-2 font-serif text-xs uppercase tracking-widest font-bold text-center">
            <button 
              onClick={() => setActiveTab('signin')}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'signin' 
                  ? 'border-maroon text-maroon dark:text-gold dark:border-gold' 
                  : 'border-transparent text-charcoal/40 dark:text-primary-bg/40'
              }`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'register' 
                  ? 'border-maroon text-maroon dark:text-gold dark:border-gold' 
                  : 'border-transparent text-charcoal/40 dark:text-primary-bg/40'
              }`}
            >
              Create Account
            </button>
          </div>

          {activeTab === 'signin' ? (
            /* Sign In form */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block">Your Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block">Password</label>
                  <a href="#" className="text-[10px] text-maroon dark:text-gold hover:underline font-semibold font-sans">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-3.5 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                Enter Boutique Storefront <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            /* Register form */
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block">Your Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                    placeholder="e.g. Shalini Roy"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block">Your Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block">Choose Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                    placeholder="Minimum 6 characters"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-3.5 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                Register & Enter Storefront <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Testimonial / Trust slider info box */}
          <div className="mt-8 border-t border-maroon/5 pt-6 flex gap-3 text-[10px] text-charcoal/60 leading-relaxed font-sans">
            <div className="flex gap-0.5 text-gold flex-shrink-0 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <div>
              <p className="italic">"The tailoring is absolute perfection. My padded blouse fits flawlessly without shoulder slips."</p>
              <strong className="block text-[9px] text-charcoal/40 mt-1">— Anjali S., Noida</strong>
            </div>
          </div>

          {/* Manager link shortcut */}
          <div className="mt-6 border-t border-maroon/5 pt-4 text-center">
            <button
              onClick={() => router.push('/admin/login')}
              className="text-[11px] font-sans font-bold text-maroon dark:text-gold hover:underline"
            >
              Are you a boutique manager? Access Supplier Hub
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
