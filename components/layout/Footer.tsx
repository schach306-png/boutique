'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Compass } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-primary-bg dark:bg-[#0A0908] pt-16 pb-8 border-t border-maroon/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Col */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-2xl font-bold tracking-tight text-gold">Threads & Traditions</h3>
          <p className="text-sm text-primary-bg/70 leading-relaxed font-sans">
            Your neighborhood tailoring studio & premium ethnic wear boutique. Delivering perfect fits and handpicked style collections for every celebration.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-bg/10 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-bg/10 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-bg/10 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
              <FaFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Shop */}
        <div>
          <h4 className="font-serif font-bold text-gold text-sm tracking-wider uppercase mb-6 pb-2 border-b border-primary-bg/10">Shop Collection</h4>
          <ul className="space-y-3 text-sm text-primary-bg/75 font-sans">
            <li><Link href="/shop?category=suits" className="hover:text-gold transition-colors">Designer Suits & Kurtis</Link></li>
            <li><Link href="/shop?category=sarees" className="hover:text-gold transition-colors">Banarasi & Silk Sarees</Link></li>
            <li><Link href="/shop?category=blouses" className="hover:text-gold transition-colors">Embroidered Blouses</Link></li>
            <li><Link href="/shop" className="hover:text-gold transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Tailoring Services */}
        <div>
          <h4 className="font-serif font-bold text-gold text-sm tracking-wider uppercase mb-6 pb-2 border-b border-primary-bg/10">Tailoring Services</h4>
          <ul className="space-y-3 text-sm text-primary-bg/75 font-sans">
            <li><Link href="/services" className="hover:text-gold transition-colors">Designer Blouse Stitching</Link></li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Pico & Fall Finishing</Link></li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Lehenga Fitting & Customization</Link></li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Saree Rolling & Polish</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-serif font-bold text-gold text-sm tracking-wider uppercase mb-6 pb-2 border-b border-primary-bg/10">Store Location</h4>
          <ul className="space-y-4 text-sm text-primary-bg/75 font-sans">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 text-gold flex-shrink-0" />
              <span>Shop No. 14, Ground Floor, Lotus Plaza, Sector 45, Noida - 201301</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 text-gold flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 text-gold flex-shrink-0" />
              <span>contact@threadsandtraditions.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-primary-bg/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-primary-bg/50">
        <p>© {currentYear} Threads & Traditions Tailoring Studio. All rights reserved.</p>
        <div className="flex gap-6 font-sans">
          <Link href="/about" className="hover:text-gold transition-colors">Our Story</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Store Directions</Link>
          <Link href="/admin" className="hover:text-gold transition-colors font-bold text-gold/80">Owner Dashboard (Admin)</Link>
        </div>
      </div>
    </footer>
  );
}
