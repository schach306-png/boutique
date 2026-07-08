'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Product } from '@/lib/data/mockDb';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  const addToCart = useStore((state) => state.addToCart);

  const isWishlisted = wishlist.includes(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (isWishlisted) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist!');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Free Size';
    addToCart(product, defaultSize, 1);
    toast.success(`Added ${product.name} (Size: ${defaultSize}) to cart!`);
  };

  return (
    <div className="group relative bg-white dark:bg-[#1A1816] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-maroon/5 flex flex-col h-full">
      {/* Product Image Panel */}
      <Link href={`/product/${product.id}`} className="relative block overflow-hidden aspect-[3/4] bg-maroon/5">
        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-maroon text-primary-bg text-[10px] font-serif font-bold tracking-widest px-2.5 py-1 rounded uppercase z-10">
            {product.discount}% OFF
          </span>
        )}

        {/* Category Badge */}
        <span className="absolute bottom-3 left-3 bg-white/90 dark:bg-charcoal/90 text-charcoal dark:text-primary-bg text-[10px] font-sans tracking-wide px-2 py-0.5 rounded shadow z-10">
          {product.category.toUpperCase()}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md z-10 transition-all duration-300 hover:scale-110 ${
            isWishlisted 
              ? 'bg-maroon text-white' 
              : 'bg-white/80 dark:bg-charcoal/80 text-charcoal dark:text-white hover:bg-white'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Image / Fallback block */}
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Real image if available, otherwise stylish abstract banner card */}
          {product.images && product.images[0] && product.images[0].startsWith('/images') ? (
            <div className="w-full h-full bg-maroon/10 flex items-center justify-center font-serif text-lg text-maroon font-bold">
              {/* Using CSS styling since actual image assets are simulated */}
              <div className="text-center p-4">
                <span className="block text-2xl mb-1">👗</span>
                <span className="block text-xs uppercase tracking-wider opacity-80">{product.name.split(' ')[0]} {product.name.split(' ')[1]}</span>
                <span className="block text-[10px] italic font-normal text-charcoal/60 mt-1">{product.fabric}</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-maroon/20 to-gold/20 flex items-center justify-center font-serif text-maroon font-bold text-center p-4">
              <div>
                <span className="text-2xl block mb-2">✨</span>
                <span>{product.name}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
          <Link
            href={`/product/${product.id}`}
            className="p-3 bg-white dark:bg-[#1A1816] text-maroon dark:text-gold rounded-full shadow-lg hover:scale-110 transition-transform"
            title="Quick View"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-maroon text-primary-bg rounded-full shadow-lg hover:scale-110 transition-transform"
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </Link>

      {/* Info Panel */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-xs text-charcoal/70 dark:text-primary-bg/70 font-semibold">{product.rating}</span>
        </div>

        {/* Name */}
        <Link href={`/product/${product.id}`} className="hover:text-maroon dark:hover:text-gold transition-colors flex-grow">
          <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal dark:text-primary-bg line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Fabric detail */}
        <p className="text-xs text-charcoal/50 dark:text-primary-bg/50 mt-1 font-sans italic">{product.fabric}</p>

        {/* Price Tag */}
        <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-maroon/5">
          <span className="font-sans font-bold text-maroon dark:text-gold text-lg">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="font-sans text-xs text-charcoal/40 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
