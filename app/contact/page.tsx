'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Compass } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error('Please fill out all fields');
      return;
    }
    toast.success('Your message has been sent successfully! We will get back to you in 24 hours. 💌');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-maroon dark:text-gold font-serif text-xs font-bold tracking-widest uppercase">Get in Touch</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-primary-bg mt-1">
          Visit Our Tailoring Studio
        </h1>
        <p className="text-sm text-charcoal/60 dark:text-primary-bg/60 mt-3 font-sans leading-relaxed">
          Have an inquiry about a wedding blouse stitching or need to alter a suit? Drop us a message, chat on WhatsApp, or visit our store in Noida.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        
        {/* Contact details Card */}
        <div className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-8 shadow-sm flex flex-col justify-between h-full">
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-lg text-maroon dark:text-gold border-b border-maroon/5 pb-2 uppercase tracking-wide">
              Boutique Contacts
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-maroon dark:text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-serif font-bold tracking-wider text-charcoal/50">Store Address</h4>
                  <p className="text-xs font-semibold leading-relaxed mt-1">
                    Shop No. 14, Ground Floor, Lotus Plaza, Sector 45, Noida, UP - 201301
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="h-5 w-5 text-maroon dark:text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-serif font-bold tracking-wider text-charcoal/50">Call / WhatsApp</h4>
                  <p className="text-xs font-semibold mt-1">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="h-5 w-5 text-maroon dark:text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-serif font-bold tracking-wider text-charcoal/50">Email Support</h4>
                  <p className="text-xs font-semibold mt-1">contact@threadsandtraditions.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="h-5 w-5 text-maroon dark:text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase font-serif font-bold tracking-wider text-charcoal/50">Working Hours</h4>
                  <p className="text-xs font-semibold mt-1">Mon - Sun: 10:00 AM - 08:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-maroon/5">
            <a 
              href="https://wa.me/919876543210" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow"
            >
              <FaWhatsapp className="h-4.5 w-4.5" /> Chat on WhatsApp
            </a>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-8 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-charcoal dark:text-primary-bg mb-6 border-b border-maroon/5 pb-2">
            Send Us a Message
          </h3>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="e.g., Anjali Sen"
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
                  placeholder="e.g., anjali@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Subject</label>
              <input 
                type="text" 
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                placeholder="e.g., Blouse Stitching Inquiry / Bulk Alteration Quote"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Message</label>
              <textarea 
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg resize-none"
                placeholder="Tell us what you need..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-3.5 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </div>

      </div>

      {/* Map visual card placeholder */}
      <section className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm overflow-hidden">
        <h3 className="font-serif font-bold text-base mb-4 text-charcoal dark:text-primary-bg flex items-center gap-2">
          <Compass className="h-5 w-5 text-maroon dark:text-gold" /> Store Location Map Directions
        </h3>
        
        <div className="bg-gradient-to-br from-maroon/5 to-gold/5 h-80 rounded-lg border border-maroon/5 flex items-center justify-center relative group">
          <div className="absolute inset-0 bg-[#7B2233]/5 dark:bg-black/40" />
          <div className="z-10 text-center p-6 text-maroon dark:text-gold">
            <span className="text-4xl block mb-2">📍</span>
            <span className="font-serif font-bold text-lg">Threads & Traditions Tailor Shop</span>
            <span className="text-xs block mt-1 text-charcoal/70">Lotus Plaza, Ground Floor, Sector 45, Noida</span>
            <span className="text-[10px] text-charcoal/40 mt-1 block italic">(Coordinates: 28.5583° N, 77.3458° E)</span>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 bg-maroon hover:bg-maroon/90 text-primary-bg text-xs font-serif tracking-widest uppercase py-2 px-6 rounded shadow inline-block transition-colors"
            >
              Get Driving Directions
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
