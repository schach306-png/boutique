'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import ProductCard from '@/components/shop/ProductCard';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Grid, FilterX } from 'lucide-react';
import { Product } from '@/lib/data/mockDb';

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  // Read URL parameters
  const urlCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';

  // Fetch products from database
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(urlSearch);
  const [sortBy, setSortBy] = useState<string>('newest');

  // Sync state if URL changes
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSearchQuery(urlSearch);
  }, [urlCategory, urlSearch]);

  // Unique attribute options from products
  const fabrics = ['all', ...Array.from(new Set(products.map(p => p.fabric.split(' ')[0])))];
  const colors = ['all', ...Array.from(new Set(products.map(p => p.color)))];
  const sizes = ['all', 'S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', 'Free Size'];

  // Handle resets
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(10000);
    setSelectedFabric('all');
    setSelectedColor('all');
    setSelectedSize('all');
    setSearchQuery('');
    setSortBy('newest');
    router.push('/shop');
  };

  // Filtering Logic
  const filteredProducts = products.filter((p) => {
    // Category match
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    
    // Price match
    if (p.price > maxPrice) return false;
    
    // Fabric match
    if (selectedFabric !== 'all' && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) return false;
    
    // Color match
    if (selectedColor !== 'all' && p.color.toLowerCase() !== selectedColor.toLowerCase()) return false;
    
    // Size match
    if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) return false;
    
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = p.name.toLowerCase().includes(q);
      const matchesDesc = p.description.toLowerCase().includes(q);
      const matchesFabric = p.fabric.toLowerCase().includes(q);
      if (!matchesName && !matchesDesc && !matchesFabric) return false;
    }
    
    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    
    // default/newest: item index or date representation
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="border-b border-maroon/10 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg">Shop Collection</h1>
          <p className="text-xs text-charcoal/50 dark:text-primary-bg/50 mt-1">
            Displaying {sortedProducts.length} of {products.length} products
          </p>
        </div>
        
        {/* Search Input bar */}
        <div className="w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search within shop..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#1A1816] border border-maroon/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="space-y-6 lg:col-span-1 bg-white dark:bg-[#1A1816] p-6 rounded-xl border border-maroon/5 h-fit shadow-sm">
          
          <div className="flex items-center justify-between border-b border-maroon/10 pb-4">
            <span className="font-serif font-bold text-charcoal dark:text-primary-bg flex items-center gap-2 text-sm uppercase tracking-wider">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </span>
            <button 
              onClick={handleClearFilters}
              className="text-xs text-maroon hover:underline flex items-center gap-1 font-semibold"
            >
              <FilterX className="h-3 w-3" /> Clear All
            </button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-maroon dark:text-gold mb-3">Categories</h3>
            <div className="space-y-2 text-sm text-charcoal/80 dark:text-primary-bg/85">
              {['all', 'suits', 'sarees', 'blouses'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer capitalize">
                  <input 
                    type="radio" 
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-maroon"
                  />
                  <span>{cat === 'all' ? 'All Collection' : cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-maroon dark:text-gold">Max Price</h3>
              <span className="text-xs font-bold font-sans">₹{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-maroon"
            />
            <div className="flex justify-between text-[10px] text-charcoal/40 dark:text-primary-bg/40 mt-1 font-semibold">
              <span>₹500</span>
              <span>₹10,000</span>
            </div>
          </div>

          {/* Fabrics */}
          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-maroon dark:text-gold mb-3">Fabric</h3>
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded p-2 text-xs text-charcoal dark:text-primary-bg focus:border-maroon outline-none capitalize"
            >
              {fabrics.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-maroon dark:text-gold mb-3">Color</h3>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded p-2 text-xs text-charcoal dark:text-primary-bg focus:border-maroon outline-none capitalize"
            >
              {colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-maroon dark:text-gold mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.filter(s => s !== 'all').map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? 'all' : size)}
                  className={`px-3 py-1 rounded border text-xs font-semibold font-sans transition-colors ${
                    selectedSize === size
                      ? 'bg-maroon border-maroon text-primary-bg'
                      : 'bg-primary-bg dark:bg-[#12100E] border-maroon/10 text-charcoal dark:text-primary-bg hover:border-maroon'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sorting / Quick bar */}
          <div className="flex justify-between items-center bg-white dark:bg-[#1A1816] px-6 py-4 rounded-xl border border-maroon/5 shadow-sm">
            <span className="text-xs text-charcoal/50 dark:text-primary-bg/50">
              Found <strong className="text-charcoal dark:text-primary-bg">{sortedProducts.length}</strong> items
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-charcoal/50 dark:text-primary-bg/50 flex items-center gap-1">
                <ArrowUpDown className="h-3.5 w-3.5" /> Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-charcoal dark:text-primary-bg font-semibold focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Grid list */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 shadow-sm flex flex-col items-center gap-4">
              <span className="text-4xl">🤷‍♀️</span>
              <h3 className="font-serif font-bold text-lg text-charcoal dark:text-primary-bg">No products match your filters</h3>
              <p className="text-xs text-charcoal/60 dark:text-primary-bg/60">Try adjusting your filters or search query to find what you want.</p>
              <button 
                onClick={handleClearFilters}
                className="bg-maroon hover:bg-maroon/90 text-primary-bg text-xs font-serif tracking-widest uppercase py-2 px-6 rounded-lg font-bold transition-colors mt-2"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-maroon/30 border-t-maroon"></div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
