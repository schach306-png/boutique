'use client';

import React from 'react';
import Link from 'next/link';
import { Scissors, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-maroon dark:text-gold font-serif text-xs font-bold tracking-widest uppercase">Our Story</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-primary-bg mt-1">
          Threads & Traditions Boutique
        </h1>
        <p className="text-sm text-charcoal/60 dark:text-primary-bg/60 mt-3 font-sans leading-relaxed">
          Crafting heritage patterns, custom shapes, and perfect fits. A legacy built on needlework precision.
        </p>
      </div>

      {/* Narrative grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Left narrative */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-primary-bg">
            How We Started
          </h2>
          <p className="text-sm text-charcoal/80 dark:text-primary-bg/75 leading-relaxed font-sans">
            It began over 15 years ago in a small home studio room, with a single manual sewing machine and a dedication to perfect blouse drapings. My mother started this tailoring store to help local women get clothes that actually fit them exactly the way they wanted.
          </p>
          <p className="text-sm text-charcoal/80 dark:text-primary-bg/75 leading-relaxed font-sans">
            Over the years, our small alteration workshop grew into a trusted community boutique. Whether it is adjusting standard sizes, adding custom border lines (pico falls), or designing heavy brocade wedding wear blouses, we treat every stitch as a piece of art.
          </p>
          <p className="text-sm text-charcoal/80 dark:text-primary-bg/75 leading-relaxed font-sans font-semibold text-maroon dark:text-gold">
            Today, we are expanding our studio to bring you handpicked premium silk sarees, cotton salwar suits, and designer fabrics direct to your doorstep.
          </p>
        </div>

        {/* Right mockup visual */}
        <div className="bg-gradient-to-br from-maroon/20 to-gold/20 aspect-video lg:aspect-[4/3] rounded-xl flex items-center justify-center border border-maroon/5 relative overflow-hidden group shadow-lg">
          <div className="absolute inset-0 bg-[#7B2233]/10 dark:bg-black/40 z-0" />
          <div className="z-10 text-center p-6 text-maroon dark:text-gold flex flex-col items-center">
            <span className="text-5xl mb-4">🧵</span>
            <span className="font-serif font-bold text-lg">Boutique Stitching Desk</span>
            <span className="text-xs mt-1 text-charcoal/60">Lotus Plaza Workshop, Noida</span>
          </div>
        </div>
      </div>

      {/* Mother/Tailor profile */}
      <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-8 md:p-12 mb-16 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="w-40 h-40 bg-maroon/10 rounded-full border-4 border-gold/50 flex items-center justify-center font-serif text-4xl text-maroon select-none shadow-md">
            👩‍🎨
          </div>
          <h3 className="font-serif font-bold text-lg text-charcoal dark:text-primary-bg mt-4">Mrs. Shalini Sharma</h3>
          <span className="text-xs text-charcoal/40 uppercase tracking-widest font-semibold mt-1">Founder & Head Tailor</span>
        </div>

        <div className="md:col-span-2 space-y-4">
          <span className="text-maroon dark:text-gold text-xs font-serif font-bold tracking-widest uppercase">Creative Director</span>
          <h3 className="font-serif text-xl font-bold text-charcoal dark:text-primary-bg">"Crafting custom designs with passion"</h3>
          <p className="text-sm text-charcoal/70 dark:text-primary-bg/70 leading-relaxed font-sans">
            "A garment is not just fabric stitched together. It represents your personality, comfort, and style. When I sew a saree fall or design a heavy neckline blouse, I ensure the lines are clean, the hooks are secure, and the chest shape fits beautifully. We want every customer to walk out of our store feeling confident and elegant."
          </p>
          <div className="flex gap-4 pt-2 font-sans text-xs">
            <span className="flex items-center gap-1 font-semibold text-charcoal/60 dark:text-primary-bg/60">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 15+ Yrs Experience
            </span>
            <span className="flex items-center gap-1 font-semibold text-charcoal/60 dark:text-primary-bg/60">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 5,000+ Fits Stitched
            </span>
          </div>
        </div>
      </div>

      {/* Core values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 border-r border-maroon/5 last:border-r-0 md:border-b-0 border-b pb-8 md:pb-6">
          <Scissors className="h-8 w-8 text-maroon dark:text-gold mx-auto mb-4" />
          <h4 className="font-serif font-bold text-lg mb-2">Exact Measurement Fitting</h4>
          <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 leading-relaxed">
            We follow deep measurement patterns for bust, armholes, neck depths, and shoulder slopes to avoid standard fitting issues.
          </p>
        </div>

        <div className="text-center p-6 border-r border-maroon/5 last:border-r-0 md:border-b-0 border-b pb-8 md:pb-6">
          <Award className="h-8 w-8 text-maroon dark:text-gold mx-auto mb-4" />
          <h4 className="font-serif font-bold text-lg mb-2">Authentic Handloom Source</h4>
          <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 leading-relaxed">
            Our ethnic suits and sarees are directly sourced from traditional weavers in Banaras, Lucknow, and Bengal.
          </p>
        </div>

        <div className="text-center p-6">
          <Heart className="h-8 w-8 text-maroon dark:text-gold mx-auto mb-4" />
          <h4 className="font-serif font-bold text-lg mb-2">Fits & Alterations Gurantee</h4>
          <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 leading-relaxed">
            Unsatisfied with the sleeve or armhole fit? Bring it back within 14 days and we will do fits adjustments for free.
          </p>
        </div>
      </div>

      <div className="text-center mt-16 bg-maroon/5 dark:bg-charcoal/10 rounded-xl p-8 max-w-xl mx-auto border border-maroon/5">
        <h4 className="font-serif font-bold text-base text-charcoal dark:text-primary-bg mb-2">Need a Custom Outfit?</h4>
        <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 mb-4 leading-relaxed">Schedule a chat or fitting appointment online. Bring your favorite fabrics or browse our ethnic catalog.</p>
        <Link href="/services" className="bg-maroon hover:bg-maroon/90 text-primary-bg py-2.5 px-6 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow inline-block">
          Book Service Fitting
        </Link>
      </div>

    </div>
  );
}
