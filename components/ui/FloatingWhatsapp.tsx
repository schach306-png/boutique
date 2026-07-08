'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsapp() {
  const whatsappNumber = '919876543210'; // Replace with mother's real number later
  const message = encodeURIComponent("Hello Threads & Traditions, I'd like to ask about a custom tailoring / alteration booking!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-emerald-500 p-4 text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 animate-bounce"
      title="Chat with us on WhatsApp"
      style={{ animationDuration: '3s' }}
    >
      <FaWhatsapp className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
      </span>
    </a>
  );
}
