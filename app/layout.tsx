import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientProviders from "@/components/layout/ClientProviders";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Threads & Traditions | Tailoring Studio & Premium Indian Wear",
  description: "Experience expert tailoring, custom blouses, pico fall finishing, and premium handpicked sarees & suits. Elegant designs tailored perfectly to fit you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-primary-bg text-charcoal">
        <ClientProviders>
          {children}
        </ClientProviders>
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#7B2233',
            color: '#F8F4EE',
            borderRadius: '8px',
          }
        }} />
      </body>
    </html>
  );
}
