'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import ProductCard from '@/components/shop/ProductCard';
import { 
  Scissors, Heart, CheckCircle2, Shield, Gem, IndianRupee, 
  ChevronRight, Star, Clock, Sparkles 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function HomePage() {
  const products = useStore((state) => state.products);
  const services = useStore((state) => state.services);
  
  // Featured products (from state)
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  // Tailoring services to showcase
  const displayServices = services.slice(0, 4);

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    toast.success('Thank you for subscribing to our newsletter! 💖');
    setNewsletterEmail('');
  };

  const testimonials = [
    {
      name: 'Radhika Sen',
      role: 'Regular Alteration Customer',
      rating: 5,
      comment: 'My blouses are stitched to absolute perfection. The matching pico work is neat. Threads & Traditions has saved me so much hassle!',
      date: 'June 2026'
    },
    {
      name: 'Sunita Mishra',
      role: 'Saree Collector',
      rating: 5,
      comment: 'The Banarasi sarees they have added are gorgeous. I bought one for a family wedding, and got the blouse custom stitched there itself. Top-notch service!',
      date: 'May 2026'
    },
    {
      name: 'Deepika Rao',
      role: 'Bride-to-be',
      rating: 5,
      comment: 'Excellent Kurti fitting. They did alterations for my wedding trousseau suits, and everything fit like a glove. Highly professional tailors.',
      date: 'July 2026'
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center bg-maroon/5 dark:bg-charcoal/10 overflow-hidden">
        {/* Background Image/Pattern */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_banner.jpg" 
            alt="Premium Indian ethnic wear banner" 
            className="w-full h-full object-cover object-center opacity-90 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-bg via-primary-bg/70 to-transparent dark:from-[#12100E] dark:via-[#12100E]/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16">
          <div className="max-w-xl flex flex-col gap-6 animate-slide-up">
            <span className="flex items-center gap-1.5 text-maroon dark:text-gold text-xs font-serif font-bold tracking-widest uppercase">
              <Sparkles className="h-4 w-4" /> Established Tailoring Studio
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal dark:text-primary-bg leading-tight">
              Tailoring That Fits Perfectly. <br />
              <span className="text-maroon dark:text-gold">Ethnic Wear</span> You'll Love.
            </h1>
            <p className="text-base sm:text-lg text-charcoal/80 dark:text-primary-bg/75 leading-relaxed font-sans">
              From premium custom blouse stitching and saree pico-fall finishing to beautifully handpicked designer suits and silk sarees, we bring elegance and precision to your wardrobe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link 
                href="/services" 
                className="bg-maroon hover:bg-maroon/90 text-primary-bg text-center py-3.5 px-8 rounded-lg font-serif tracking-widest uppercase text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Scissors className="h-4 w-4" /> Book Tailoring Fit
              </Link>
              <Link 
                href="/shop" 
                className="bg-white/80 hover:bg-white text-maroon border border-maroon/20 hover:border-maroon text-center py-3.5 px-8 rounded-lg font-serif tracking-widest uppercase text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 dark:bg-[#1A1816] dark:text-gold dark:border-gold/20"
              >
                Explore Collection <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US */}
      <section className="py-16 bg-white dark:bg-[#1A1816] border-y border-maroon/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg mb-2">Our Quality Standard</h2>
            <p className="text-sm text-charcoal/60 dark:text-primary-bg/60">Crafting premium designs with ultimate precision for over a decade</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-primary-bg dark:bg-[#12100E] rounded-xl border border-maroon/5">
              <div className="p-4 bg-maroon/10 dark:bg-gold/10 text-maroon dark:text-gold rounded-full mb-4">
                <Scissors className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-charcoal dark:text-primary-bg">Expert Tailoring</h3>
              <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 leading-relaxed font-sans">
                Handcrafted blouse layouts, precise linings, and designer neck patterns customized to your shape.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-primary-bg dark:bg-[#12100E] rounded-xl border border-maroon/5">
              <div className="p-4 bg-maroon/10 dark:bg-gold/10 text-maroon dark:text-gold rounded-full mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-charcoal dark:text-primary-bg">Perfect Fit Guarantee</h3>
              <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 leading-relaxed font-sans">
                Complimentary minor alterations within 14 days of pickup to ensure your outfit fits flawlessly.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-primary-bg dark:bg-[#12100E] rounded-xl border border-maroon/5">
              <div className="p-4 bg-maroon/10 dark:bg-gold/10 text-maroon dark:text-gold rounded-full mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-charcoal dark:text-primary-bg">Quality Finishing</h3>
              <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 leading-relaxed font-sans">
                Durable cotton falls, neat overlocked pico hems, and delicate stitching threads that last.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-primary-bg dark:bg-[#12100E] rounded-xl border border-maroon/5">
              <div className="p-4 bg-maroon/10 dark:bg-gold/10 text-maroon dark:text-gold rounded-full mb-4">
                <IndianRupee className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-charcoal dark:text-primary-bg">Transparent Pricing</h3>
              <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 leading-relaxed font-sans">
                No hidden costs. Alterations starting at just ₹120. Exact quotes shared before we start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES */}
      <section className="py-16 bg-primary-bg dark:bg-[#12100E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg">Featured Departments</h2>
              <p className="text-sm text-charcoal/60 dark:text-primary-bg/60">Explore tailor services and premium handpicked ethnic wear</p>
            </div>
            <Link href="/shop" className="text-sm text-maroon dark:text-gold font-bold font-serif hover:underline flex items-center gap-1">
              View Shop Catalog <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dept 1: Suits */}
            <Link href="/shop?category=suits" className="group relative h-80 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-maroon/80 group-hover:bg-maroon/90 z-10 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <span className="font-serif text-gold text-2xl font-bold group-hover:-translate-y-1 transition-transform">Indian Suits</span>
                <span className="text-xs text-primary-bg/85 font-sans mt-2">Salwars, Anarkalis & Palazzo sets</span>
              </div>
              <div className="w-full h-full flex items-center justify-center font-serif text-primary-bg/10 text-9xl absolute select-none">
                👗
              </div>
            </Link>

            {/* Dept 2: Sarees */}
            <Link href="/shop?category=sarees" className="group relative h-80 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-charcoal/80 group-hover:bg-charcoal/90 z-10 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <span className="font-serif text-gold text-2xl font-bold group-hover:-translate-y-1 transition-transform">Premium Sarees</span>
                <span className="text-xs text-primary-bg/85 font-sans mt-2">Banarasi, Silk, Georgette drapings</span>
              </div>
              <div className="w-full h-full flex items-center justify-center font-serif text-primary-bg/10 text-9xl absolute select-none">
                🧣
              </div>
            </Link>

            {/* Dept 3: Blouses */}
            <Link href="/shop?category=blouses" className="group relative h-80 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gold/80 group-hover:bg-gold/90 z-10 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <span className="font-serif text-maroon text-2xl font-bold group-hover:-translate-y-1 transition-transform">Designer Blouses</span>
                <span className="text-xs text-maroon/80 font-sans mt-2">Readymade, Zardozi & Brocades</span>
              </div>
              <div className="w-full h-full flex items-center justify-center font-serif text-maroon/10 text-9xl absolute select-none">
                👚
              </div>
            </Link>

            {/* Dept 4: Tailoring */}
            <Link href="/services" className="group relative h-80 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-maroon/80 group-hover:bg-maroon/90 z-10 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <span className="font-serif text-gold text-2xl font-bold group-hover:-translate-y-1 transition-transform">Tailoring Fitting</span>
                <span className="text-xs text-primary-bg/85 font-sans mt-2">Stitching, Pico Falls & Alteration bookings</span>
              </div>
              <div className="w-full h-full flex items-center justify-center font-serif text-primary-bg/10 text-9xl absolute select-none">
                ✂️
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (ETHNIC STOCK) */}
      <section className="py-16 bg-white dark:bg-[#1A1816] border-t border-maroon/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-maroon dark:text-gold font-serif text-xs font-bold tracking-widest uppercase">Handpicked Threads</span>
            <h2 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg mt-1">Our Premium Collection</h2>
            <p className="text-sm text-charcoal/60 dark:text-primary-bg/60 mt-1">Exclusive products ready in stock with custom fitting choices</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/shop" 
              className="inline-block bg-maroon hover:bg-maroon/90 text-primary-bg py-3 px-8 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TAILORING SERVICES (MOTHERS CORE SERVICES) */}
      <section className="py-16 bg-primary-bg dark:bg-[#12100E] border-y border-maroon/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-maroon dark:text-gold font-serif text-xs font-bold tracking-widest uppercase">Expert Alteration & Stitching</span>
              <h2 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg mt-1">Tailoring Studio Services</h2>
            </div>
            <Link href="/services" className="text-sm text-maroon dark:text-gold font-bold font-serif hover:underline flex items-center gap-0.5">
              View All Services <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((s) => (
              <div 
                key={s.id}
                className="bg-white dark:bg-[#1A1816] rounded-xl p-6 border border-maroon/5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 text-maroon dark:text-gold">
                    <Scissors className="h-5 w-5" />
                    <span className="text-xs uppercase font-sans font-semibold tracking-wider text-charcoal/50 dark:text-primary-bg/50">
                      {s.category}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-charcoal dark:text-primary-bg mb-2">{s.name}</h3>
                  <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 leading-relaxed font-sans mb-4 line-clamp-3">
                    {s.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-maroon/5 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] text-charcoal/40 dark:text-primary-bg/40 block">Starting Price</span>
                    <span className="font-sans font-bold text-maroon dark:text-gold text-base">₹{s.startingPrice}</span>
                  </div>
                  <Link 
                    href={`/services?service=${s.id}`}
                    className="bg-maroon hover:bg-maroon/90 text-primary-bg text-[10px] font-serif tracking-widest uppercase py-2 px-4 rounded transition-colors"
                  >
                    Book Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-16 bg-white dark:bg-[#1A1816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-maroon dark:text-gold font-serif text-xs font-bold tracking-widest uppercase">Happy Fits</span>
            <h2 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg mt-1">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-primary-bg dark:bg-[#12100E] p-8 rounded-xl border border-maroon/5 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm italic text-charcoal/80 dark:text-primary-bg/75 leading-relaxed font-sans mb-6">
                    "{t.comment}"
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-maroon/5">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-charcoal dark:text-primary-bg">{t.name}</h4>
                    <span className="text-[10px] text-charcoal/40 dark:text-primary-bg/40">{t.role}</span>
                  </div>
                  <span className="text-[10px] text-charcoal/40">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM GALLERY */}
      <section className="py-16 bg-primary-bg dark:bg-[#12100E] border-t border-maroon/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-primary-bg">Studio Highlights</h2>
            <p className="text-sm text-charcoal/50 dark:text-primary-bg/50">Follow our creative designs on Instagram @ThreadsAndTraditions</p>
          </div>

          {/* Insta layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-square bg-maroon/10 rounded-lg overflow-hidden relative group cursor-pointer shadow-sm">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-primary-bg text-xs font-serif z-10">
                  <span>View Post</span>
                </div>
                <div className="w-full h-full bg-gradient-to-br from-gold/30 to-maroon/30 flex items-center justify-center font-serif text-3xl">
                  {item === 1 ? '✨' : item === 2 ? '🧵' : item === 3 ? '📐' : '👗'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER */}
      <section className="bg-maroon text-primary-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <h2 className="font-serif text-3xl font-extrabold tracking-tight">Join Our Boutique Circle</h2>
          <p className="text-sm text-primary-bg/75 max-w-lg mx-auto font-sans leading-relaxed">
            Subscribe to receive styling updates on new saree arrivals, custom tailoring design guides, and exclusive festive coupon discounts.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full mt-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-grow bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-sm text-primary-bg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold outline-none"
            />
            <button type="submit" className="bg-gold hover:bg-gold/90 text-charcoal py-3 px-8 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
