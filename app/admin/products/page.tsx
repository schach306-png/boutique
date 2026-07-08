'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { Plus, Trash2, Edit2, ShoppingBag, Ruler, CheckCircle2, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { Product } from '@/lib/data/mockDb';

export default function AdminProductsPage() {
  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState<'suits' | 'sarees' | 'blouses'>('suits');
  const [fabric, setFabric] = useState('');
  const [color, setColor] = useState('');
  const [occasion, setOccasion] = useState('');
  const [sizes, setSizes] = useState<string[]>(['M']);
  const [description, setDescription] = useState('');
  const [washCare, setWashCare] = useState('');
  const [stock, setStock] = useState('');

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', 'Free Size'];

  const handleSizeToggle = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !fabric || !color || !description || !stock) {
      toast.error('Please fill out all required fields');
      return;
    }

    const priceNum = Number(price);
    const origPriceNum = originalPrice ? Number(originalPrice) : undefined;
    const discountNum = origPriceNum && origPriceNum > priceNum 
      ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) 
      : undefined;

    const productFields = {
      name,
      price: priceNum,
      originalPrice: origPriceNum,
      discount: discountNum,
      category,
      fabric,
      color,
      occasion,
      sizes,
      description,
      washCare: washCare || 'Dry Clean Recommended',
      stock: Number(stock),
      featured: true,
      newArrival: true,
      images: ['/images/product_placeholder.jpg'] // default mockup tag in list
    };

    if (isEditing && editingId) {
      updateProduct(editingId, productFields);
      toast.success('Product updated successfully! 👗');
      setIsEditing(false);
      setEditingId(null);
    } else {
      addProduct(productFields);
      toast.success('New product added to catalog stock! 👗');
    }

    // Reset Form fields
    setName('');
    setPrice('');
    setOriginalPrice('');
    setCategory('suits');
    setFabric('');
    setColor('');
    setOccasion('');
    setSizes(['M']);
    setDescription('');
    setWashCare('');
    setStock('');
  };

  const handleStartEdit = (p: Product) => {
    setIsEditing(true);
    setEditingId(p.id);

    setName(p.name);
    setPrice(String(p.price));
    setOriginalPrice(p.originalPrice ? String(p.originalPrice) : '');
    setCategory(p.category);
    setFabric(p.fabric);
    setColor(p.color);
    setOccasion(p.occasion);
    setSizes(p.sizes);
    setDescription(p.description);
    setWashCare(p.washCare);
    setStock(String(p.stock));
    
    // Scroll to form
    const element = document.getElementById('product-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    
    setName('');
    setPrice('');
    setOriginalPrice('');
    setCategory('suits');
    setFabric('');
    setColor('');
    setOccasion('');
    setSizes(['M']);
    setDescription('');
    setWashCare('');
    setStock('');
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to delete this product from store catalog?')) {
      deleteProduct(id);
      toast.success('Product deleted from inventory');
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-primary-bg">Product Catalog Manager</h1>
        <p className="text-xs text-charcoal/50 dark:text-primary-bg/50 mt-1">Add, update, or remove Indian suits, sarees, and designer blouses in catalog</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Forms area (1 col) */}
        <div 
          id="product-form"
          className="bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm h-fit lg:col-span-1"
        >
          <h3 className="font-serif font-bold text-base text-maroon dark:text-gold mb-6 border-b border-maroon/5 pb-2 uppercase tracking-wide">
            {isEditing ? 'Edit Product Item' : 'Add New Product'}
          </h3>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Product Name *</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                placeholder="e.g. Peach Net Salwar Suit"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Promo Price (₹) *</label>
                <input 
                  type="number" 
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="e.g. 1850"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Original Price (₹)</label>
                <input 
                  type="number" 
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="e.g. 2500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Category *</label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg capitalize"
                >
                  <option value="suits">Suits</option>
                  <option value="sarees">Sarees</option>
                  <option value="blouses">Blouses</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Stock Level *</label>
                <input 
                  type="number" 
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="e.g. 15"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Fabric *</label>
                <input 
                  type="text" 
                  required
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="Silk"
                />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Color *</label>
                <input 
                  type="text" 
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="Blue"
                />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Occasion</label>
                <input 
                  type="text" 
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                  placeholder="Daily"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Available Sizes</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-2 py-1 rounded text-[10px] font-sans font-bold border transition-colors ${
                      sizes.includes(size)
                        ? 'bg-maroon border-maroon text-primary-bg'
                        : 'bg-primary-bg dark:bg-[#12100E] border-maroon/10 text-charcoal dark:text-primary-bg'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Description *</label>
              <textarea 
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg resize-none"
                placeholder="Product drape length details..."
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-serif font-bold tracking-wider text-charcoal/50 block mb-1">Wash Care Instructions</label>
              <input 
                type="text" 
                value={washCare}
                onChange={(e) => setWashCare(e.target.value)}
                className="w-full bg-primary-bg dark:bg-[#12100E] border border-maroon/10 rounded-lg p-2.5 text-xs outline-none focus:border-maroon text-charcoal dark:text-primary-bg"
                placeholder="e.g. Dry Clean Only"
              />
            </div>

            <div className="flex gap-4 pt-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-1/2 bg-white dark:bg-[#1A1816] hover:bg-primary-bg text-charcoal border border-maroon/10 py-3 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all"
                >
                  Cancel
                </button>
              )}
              
              <button
                type="submit"
                className={`bg-maroon hover:bg-maroon/90 text-primary-bg py-3 rounded-lg font-serif tracking-widest uppercase text-xs font-bold transition-all shadow-md ${
                  isEditing ? 'w-1/2' : 'w-full'
                }`}
              >
                {isEditing ? 'Save Changes' : 'Add to Stock'}
              </button>
            </div>

          </form>

        </div>

        {/* Product Catalog List (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A1816] rounded-xl border border-maroon/5 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-maroon/5 pb-2">
            <h3 className="font-serif font-bold text-base text-maroon dark:text-gold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" /> Stock Inventory List
            </h3>
            <span className="text-xs text-charcoal/50">
              Total: <strong>{products.length}</strong> items
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-maroon/5 text-charcoal/50">
                  <th className="py-3 font-semibold uppercase">Product details</th>
                  <th className="py-3 font-semibold uppercase">Category</th>
                  <th className="py-3 font-semibold uppercase">Price</th>
                  <th className="py-3 font-semibold uppercase">Stock</th>
                  <th className="py-3 font-semibold uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-maroon/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-primary-bg/10">
                    <td className="py-3.5 pr-2">
                      <strong className="block text-charcoal dark:text-primary-bg line-clamp-1">{p.name}</strong>
                      <span className="text-[10px] text-charcoal/40 italic">{p.fabric} | {p.color}</span>
                    </td>
                    <td className="py-3.5 capitalize">
                      <span className="bg-maroon/5 text-maroon font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <strong className="text-maroon dark:text-gold">₹{p.price}</strong>
                      {p.originalPrice && (
                        <span className="block line-through text-[9px] text-charcoal/40">₹{p.originalPrice}</span>
                      )}
                    </td>
                    <td className="py-3.5">
                      {p.stock <= 5 ? (
                        <span className="text-red-500 font-bold flex items-center gap-0.5" title="Low stock warning!">
                          <ShieldAlert className="h-3.5 w-3.5" /> {p.stock} units
                        </span>
                      ) : (
                        <span className="text-emerald-500 font-semibold">{p.stock} units</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right flex gap-1 justify-end">
                      <button 
                        onClick={() => handleStartEdit(p)}
                        className="p-1.5 bg-maroon/5 hover:bg-maroon hover:text-primary-bg rounded text-maroon transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(p.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white rounded text-red-500 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
