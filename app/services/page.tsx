'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { 
  Scissors, Calendar, Clock, Phone, User, FileText, 
  CheckCircle, Shield, AlertCircle, Info 
} from 'lucide-react';
import toast from 'react-hot-toast';

function ServicesContent() {
  const searchParams = useSearchParams();
  const preSelectedServiceId = searchParams.get('service') || '';

  const [services, setServices] = useState<any[]>([]);

  // Fetch tailoring services from database
  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  // Categories Filter
  const [activeTab, setActiveTab] = useState<'all' | 'stitching' | 'alteration' | 'finishing'>('all');

  // Booking Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');

  // Confirmation modal state
  const [bookingResult, setBookingResult] = useState<{ id: string; serviceName: string } | null>(null);

  // Sync pre-selected service from url
  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedService(preSelectedServiceId);
      // Scroll to booking form
      const element = document.getElementById('booking-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preSelectedServiceId]);

  // Filtering services
  const filteredServices = services.filter((s) => {
    if (activeTab === 'all') return true;
    return s.category === activeTab;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !selectedService || !preferredDate || !preferredTime) {
      toast.error('Please fill out all required fields');
      return;
    }

    const serviceObj = services.find(s => s.id === selectedService);
    if (!serviceObj) return;

    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName,
        phone,
        serviceId: selectedService,
        preferredDate,
        preferredTime,
        notes
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Booking failed');
        return res.json();
      })
      .then((newBooking) => {
        setBookingResult({
          id: newBooking.id,
          serviceName: serviceObj.name
        });

        toast.success('Appointment booking submitted!');
        
        // Reset Form
        setCustomerName('');
        setPhone('');
        setSelectedService('');
        setPreferredDate('');
        setPreferredTime('');
        setNotes('');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to submit booking. Please try again.');
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-maroon dark:text-gold font-serif text-xs font-bold tracking-widest uppercase">Expert Tailoring Studio</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-primary-bg mt-1">
          Custom Stitching & Fit Alterations
        </h1>
        <p className="text-sm text-charcoal/60 dark:text-primary-bg/60 mt-3 font-sans leading-relaxed">
          From stitching padded designer blouses from fabric to standard alterations, pico, and saree polishing. Schedule a home pickup or drop by the store for a personalized fitting session.
        </p>
      </div>

      {/* Services Tabs */}
      <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 font-serif text-xs uppercase tracking-widest font-bold">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'stitching', label: 'Stitching' },
          { id: 'alteration', label: 'Alterations' },
          { id: 'finishing', label: 'Saree Finishing' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-2.5 rounded-full border transition-all flex-shrink-0 ${
              activeTab === tab.id
                ? 'bg-maroon border-maroon text-primary-bg shadow-sm'
                : 'bg-white dark:bg-[#1A1816] border-maroon/10 text-charcoal dark:text-primary-bg hover:border-maroon'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredServices.map((s) => (
          <div 
            key={s.id}
            className="bg-white dark:bg-[#1A1816] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-maroon/5 flex flex-col justify-between"
          >
            {/* Header info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-maroon/10 text-maroon dark:text-gold text-[10px] font-serif font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {s.category}
                </span>
                <span className="text-xs text-charcoal/40 dark:text-primary-bg/40 font-semibold flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {s.duration}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-charcoal dark:text-primary-bg mb-2">
                {s.name}
              </h3>
              
              <p className="text-xs text-charcoal/60 dark:text-primary-bg/60 leading-relaxed font-sans mb-4">
                {s.description}
              </p>
            </div>

            {/* Price section */}
            <div className="p-6 bg-primary-bg dark:bg-[#12100E] border-t border-maroon/5 flex items-center justify-between mt-auto">
              <div>
                <span className="text-[10px] text-charcoal/40 dark:text-primary-bg/40 block">Starting At</span>
                <span className="font-sans font-extrabold text-maroon dark:text-gold text-lg">₹{s.startingPrice}</span>
              </div>
              
              <button
                onClick={() => {
                  setSelectedService(s.id);
                  // Scroll to booking form
                  const element = document.getElementById('booking-form');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-maroon hover:bg-maroon/90 text-primary-bg text-xs font-serif tracking-widest uppercase py-2.5 px-6 rounded-lg font-bold transition-all shadow-sm"
              >
                Book Fitting
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Flow Form Section */}
      <section 
        id="booking-form" 
        className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 shadow-xl max-w-3xl mx-auto overflow-hidden grid grid-cols-1 md:grid-cols-3"
      >
        
        {/* Info Column */}
        <div className="bg-maroon text-primary-bg p-8 flex flex-col justify-between md:col-span-1 border-r border-maroon/5">
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-xl text-gold">Tailoring Studio Fitting</h3>
            <p className="text-xs text-primary-bg/85 font-sans leading-relaxed">
              Book a free personal sizing consultation. Bring your fabric and sample dress to the store.
            </p>
          </div>

          <div className="space-y-4 mt-8 md:mt-0 font-sans text-xs">
            <div className="flex items-center gap-3">
              <Phone className="h-4.5 w-4.5 text-gold" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4.5 w-4.5 text-gold" />
              <span>Mon - Sun: 10AM - 8PM</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-4.5 w-4.5 text-gold" />
              <span>Perfect Fit Guarantee</span>
            </div>
          </div>

          <div className="text-[10px] text-primary-bg/60 mt-6 border-t border-white/10 pt-4 flex gap-1 items-start">
            <Info className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" />
            <span>* Need alterations? We do measurements check at the counter and deliver in 48 hours.</span>
          </div>
        </div>

        {/* Form Column */}
        <div className="p-8 md:col-span-2">
          <h3 className="font-serif font-bold text-lg text-charcoal dark:text-primary-bg mb-6 border-b border-maroon/5 pb-2">
            Schedule Appointment
          </h3>
          
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Your Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                  <input 
                    type="text" 
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                    placeholder="Enter full name"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                    placeholder="10-digit number"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Select Service *</label>
              <div className="relative">
                <Scissors className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                <select
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                >
                  <option value="">-- Choose tailoring service --</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} (Starts: ₹{s.startingPrice})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Preferred Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                  <input 
                    type="date" 
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Preferred Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                  <select
                    required
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  >
                    <option value="">-- Choose hour slot --</option>
                    <option value="10:00">10:00 AM - 12:00 PM</option>
                    <option value="12:00">12:00 PM - 02:00 PM</option>
                    <option value="14:00">02:00 PM - 04:00 PM</option>
                    <option value="16:00">04:00 PM - 06:00 PM</option>
                    <option value="18:00">06:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Measurements / Custom Notes</label>
              <div className="relative">
                <FileText className="absolute left-3 top-2.5 h-4 w-4 text-charcoal/30" />
                <textarea 
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg pl-9 pr-4 py-2 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg resize-none"
                  placeholder="Describe your design (deep neck, sleeves type, border etc) or physical measurements details..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-3.5 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Scissors className="h-4 w-4" /> Book Sizing Consultation
            </button>

          </form>

        </div>

      </section>

      {/* Booking Confirmation Dialog Overlay */}
      {bookingResult && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1816] w-full max-w-md rounded-xl shadow-2xl border border-maroon/10 p-6 text-center flex flex-col items-center gap-4">
            <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full">
              <CheckCircle className="h-8 w-8" />
            </div>
            
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-primary-bg">Booking Confirmed!</h3>
            
            <div className="bg-primary-bg dark:bg-[#12100E] p-4 rounded-lg w-full border border-maroon/5 space-y-2">
              <p className="text-xs text-charcoal/60">Booking ID: <strong className="text-maroon dark:text-gold text-sm">{bookingResult.id}</strong></p>
              <p className="text-xs font-bold font-serif">{bookingResult.serviceName}</p>
            </div>

            <p className="text-[10px] text-charcoal/60 leading-relaxed font-sans px-4">
              We have scheduled your tailoring fit slots. You can track this booking under your account dashboard using the Booking ID. Please bring your fabric.
            </p>

            <button 
              onClick={() => setBookingResult(null)}
              className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-3 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-maroon/30 border-t-maroon"></div>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
