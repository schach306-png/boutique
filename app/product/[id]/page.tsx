'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import ProductCard from '@/components/shop/ProductCard';
import { 
  Star, Heart, ShoppingBag, ArrowLeft, Ruler, CheckCircle, 
  AlertTriangle, Truck, RotateCcw, ShieldCheck, Share2 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const products = useStore((state) => state.products);
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  const addRecentlyViewed = useStore((state) => state.addRecentlyViewed);
  const recentlyViewedIds = useStore((state) => state.recentlyViewed);
  const addReview = useStore((state) => state.addReview);

  // Find product
  const product = products.find(p => p.id === productId);

  // Gallery Active Image
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  
  // Custom Fit & Size states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // Reviews states
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Add to recently viewed on load
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-4">
        <span className="text-4xl">🔎</span>
        <h2 className="font-serif text-2xl font-bold">Product Not Found</h2>
        <p className="text-sm text-charcoal/60">The product you are looking for might have been removed or doesn't exist.</p>
        <Link href="/shop" className="bg-maroon text-primary-bg py-3.5 px-8 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow mt-2">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size first!');
      return;
    }
    const size = selectedSize || 'Free Size';
    addToCart(product, size, quantity);
    toast.success(`Added ${quantity}x ${product.name} (Size: ${size}) to cart!`);
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size first!');
      return;
    }
    const size = selectedSize || 'Free Size';
    addToCart(product, size, quantity);
    router.push('/checkout');
  };

  // Handle Review Submit
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error('Please fill out all review fields');
      return;
    }
    addReview(product.id, reviewName, reviewRating, reviewComment);
    toast.success('Thank you! Your review has been published.');
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
  };

  // Get Related Products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Get Recently Viewed Products
  const recentlyViewedProducts = products
    .filter(p => recentlyViewedIds.includes(p.id) && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back Button */}
      <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal/60 hover:text-maroon transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Left Column: Gallery */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#1A1816] rounded-xl overflow-hidden shadow-sm border border-maroon/5 aspect-[3/4] flex items-center justify-center relative group">
            
            {/* Main display tag / design placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-maroon/10 to-gold/10 flex items-center justify-center font-serif text-3xl font-bold text-maroon text-center p-6">
              <div>
                <span className="text-5xl block mb-4">✨</span>
                <span>{product.name}</span>
                <span className="block text-xs italic font-normal text-charcoal/60 mt-3">{product.fabric} - {product.color}</span>
              </div>
            </div>
            
            <button 
              onClick={handleShare}
              className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-charcoal/80 text-charcoal dark:text-white rounded-full hover:bg-white transition-all shadow"
              title="Share"
            >
              <Share2 className="h-4.5 w-4.5" />
            </button>
          </div>
          
          {/* Thumbnails if multiple images (simulated as placeholder grid buttons for prototype) */}
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImgIndex(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 bg-maroon/5 flex items-center justify-center font-serif text-xs font-bold ${
                  activeImgIndex === i ? 'border-maroon' : 'border-maroon/10'
                }`}
              >
                <span>View {i + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: details */}
        <div className="flex flex-col gap-6">
          
          <div>
            {/* Category tag & stock info */}
            <div className="flex items-center justify-between mb-2">
              <span className="bg-maroon/10 text-maroon dark:text-gold text-[10px] font-serif font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {product.category}
              </span>
              
              <div className="flex items-center gap-1 text-xs">
                {product.stock > 0 ? (
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> In Stock ({product.stock} left)
                  </span>
                ) : (
                  <span className="text-red-500 font-semibold flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" /> Out of Stock
                  </span>
                )}
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-primary-bg tracking-wide">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-2 mt-2 border-b border-maroon/5 pb-4">
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`h-4 w-4 ${idx < Math.round(product.rating) ? 'fill-current' : 'text-charcoal/20'}`} 
                  />
                ))}
              </div>
              <span className="text-xs font-bold">{product.rating} / 5</span>
              <span className="text-charcoal/40 text-xs">|</span>
              <a href="#reviews" className="text-xs text-maroon dark:text-gold hover:underline font-semibold">
                {product.reviews.length} Customer Reviews
              </a>
            </div>
          </div>

          {/* Pricing Tag */}
          <div className="bg-primary-bg dark:bg-[#12100E] p-4 rounded-xl border border-maroon/5 flex items-baseline gap-4">
            <span className="font-sans font-extrabold text-maroon dark:text-gold text-3xl">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="font-sans text-sm text-charcoal/40 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="bg-red-500/10 text-red-500 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded uppercase">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Fabric / Specs Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs font-sans border-b border-maroon/5 pb-4">
            <div>
              <span className="text-charcoal/40 dark:text-primary-bg/40 block">Fabric composition</span>
              <strong className="text-charcoal dark:text-primary-bg">{product.fabric}</strong>
            </div>
            <div>
              <span className="text-charcoal/40 dark:text-primary-bg/40 block">Drape Color</span>
              <strong className="text-charcoal dark:text-primary-bg capitalize">{product.color}</strong>
            </div>
            <div>
              <span className="text-charcoal/40 dark:text-primary-bg/40 block">Occasion suitability</span>
              <strong className="text-charcoal dark:text-primary-bg">{product.occasion}</strong>
            </div>
            <div>
              <span className="text-charcoal/40 dark:text-primary-bg/40 block">Wash Care instructions</span>
              <strong className="text-charcoal dark:text-primary-bg italic">{product.washCare}</strong>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-charcoal/50 mb-1">Product Details</h3>
            <p className="text-sm text-charcoal/80 dark:text-primary-bg/75 leading-relaxed font-sans">
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif font-bold uppercase tracking-wider text-charcoal/50">Select Size</span>
                <button 
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-maroon dark:text-gold font-bold flex items-center gap-1 hover:underline"
                >
                  <Ruler className="h-4 w-4" /> View Size Chart
                </button>
              </div>

              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border text-sm font-bold flex items-center justify-center transition-all ${
                      selectedSize === size
                        ? 'bg-maroon border-maroon text-primary-bg shadow-md scale-105'
                        : 'bg-white dark:bg-[#1A1816] border-maroon/10 text-charcoal dark:text-primary-bg hover:border-maroon'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty Selector & Buttons */}
          <div className="space-y-4 pt-4 border-t border-maroon/5">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-maroon/10 rounded-lg overflow-hidden bg-white dark:bg-[#1A1816]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-maroon/5 text-charcoal dark:text-primary-bg text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-maroon/5 text-charcoal dark:text-primary-bg text-sm font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  toggleWishlist(product.id);
                  if (isWishlisted) {
                    toast.success('Removed from wishlist');
                  } else {
                    toast.success('Added to wishlist!');
                  }
                }}
                className={`p-3 border rounded-lg hover:scale-105 transition-transform ${
                  isWishlisted 
                    ? 'bg-maroon border-maroon text-primary-bg shadow-md' 
                    : 'bg-white dark:bg-[#1A1816] border-maroon/10 text-charcoal dark:text-primary-bg hover:border-maroon'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-grow bg-white dark:bg-[#1A1816] hover:bg-primary-bg dark:hover:bg-[#12100E] border border-maroon text-maroon dark:text-gold dark:border-gold text-center py-4 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="flex-grow bg-maroon hover:bg-maroon/90 text-primary-bg text-center py-4 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Quality indicators */}
          <div className="grid grid-cols-3 gap-4 border-t border-maroon/5 pt-6 text-[10px] text-charcoal/60 dark:text-primary-bg/60 text-center font-semibold">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="h-5 w-5 text-maroon dark:text-gold" />
              <span>Fast Shipping in India</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RotateCcw className="h-5 w-5 text-maroon dark:text-gold" />
              <span>Free Minor Alterations</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-maroon dark:text-gold" />
              <span>100% Quality Fabrics</span>
            </div>
          </div>

        </div>

      </div>

      {/* Product Reviews */}
      <section id="reviews" className="border-t border-maroon/10 pt-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Write Review Column */}
          <div className="lg:col-span-1 bg-white dark:bg-[#1A1816] p-6 rounded-xl border border-maroon/5 shadow-sm h-fit">
            <h3 className="font-serif font-bold text-lg text-charcoal dark:text-primary-bg mb-4 border-b border-maroon/5 pb-2">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none text-charcoal dark:text-primary-bg focus:border-maroon"
                  placeholder="e.g., Anisha Sharma"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Rating</label>
                <div className="flex gap-1 text-gold">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`h-6 w-6 ${star <= reviewRating ? 'fill-current' : 'text-charcoal/20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Review Comments</label>
                <textarea 
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none text-charcoal dark:text-primary-bg focus:border-maroon resize-none"
                  placeholder="Tell us what you liked/disliked, fit sizing details..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-3 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Customer Feedback List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-serif font-bold text-lg text-charcoal dark:text-primary-bg mb-4">
              Customer Feedbacks ({product.reviews.length})
            </h3>

            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((r) => (
                  <div key={r.id} className="border-b border-maroon/5 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-charcoal dark:text-primary-bg">{r.userName}</h4>
                        <div className="flex gap-1 text-gold mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < r.rating ? 'fill-current' : 'text-charcoal/20'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-charcoal/40">{r.date}</span>
                    </div>
                    <p className="text-xs text-charcoal/70 dark:text-primary-bg/70 leading-relaxed font-sans">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 shadow-sm flex flex-col items-center gap-2">
                <span className="text-2xl">📝</span>
                <h4 className="font-serif font-bold text-sm text-charcoal dark:text-primary-bg">No reviews yet</h4>
                <p className="text-[10px] text-charcoal/40">Be the first to review this product and share your thoughts!</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-maroon/10 pt-12 mb-12">
          <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-primary-bg mb-8 text-center sm:text-left">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewedProducts.length > 0 && (
        <section className="border-t border-maroon/10 pt-12">
          <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-primary-bg mb-8 text-center sm:text-left">
            Recently Viewed Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentlyViewedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Chart Popup Modal */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1816] w-full max-w-lg rounded-xl shadow-2xl border border-maroon/10 p-6 relative">
            <h3 className="font-serif font-bold text-lg mb-4 text-maroon dark:text-gold border-b border-maroon/10 pb-2 uppercase tracking-wide">
              Boutique Size Guide
            </h3>
            
            <p className="text-[10px] text-charcoal/50 mb-4 font-sans leading-relaxed">
              * Note: The sizes refer to garment chest measurements in inches. Our custom-stitched items feature 2-inch inside margins so your local tailor can easily expand them if needed.
            </p>

            <table className="w-full text-left border-collapse text-xs font-sans mb-6">
              <thead>
                <tr className="bg-maroon/5 text-maroon dark:text-gold">
                  <th className="p-2.5 font-bold uppercase">Size Code</th>
                  <th className="p-2.5 font-bold uppercase">Bust (in)</th>
                  <th className="p-2.5 font-bold uppercase">Waist (in)</th>
                  <th className="p-2.5 font-bold uppercase">Hip (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-maroon/5">
                <tr>
                  <td className="p-2.5 font-bold">S / 34</td>
                  <td className="p-2.5">34</td>
                  <td className="p-2.5">28</td>
                  <td className="p-2.5">36</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">M / 36</td>
                  <td className="p-2.5">36</td>
                  <td className="p-2.5">30</td>
                  <td className="p-2.5">38</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">L / 38</td>
                  <td className="p-2.5">38</td>
                  <td className="p-2.5">32</td>
                  <td className="p-2.5">40</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">XL / 40</td>
                  <td className="p-2.5">40</td>
                  <td className="p-2.5">34</td>
                  <td className="p-2.5">42</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Free Size</td>
                  <td className="p-2.5">Open Drape</td>
                  <td className="p-2.5">-</td>
                  <td className="p-2.5">-</td>
                </tr>
              </tbody>
            </table>

            <button 
              onClick={() => setIsSizeChartOpen(false)}
              className="w-full bg-maroon hover:bg-maroon/90 text-primary-bg py-2.5 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
