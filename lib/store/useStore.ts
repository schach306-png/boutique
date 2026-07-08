import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Product, TailoringService, Booking, Order, Coupon,
  INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_BOOKINGS, INITIAL_ORDERS, INITIAL_COUPONS 
} from '../data/mockDb';

interface User {
  name: string;
  email: string;
  role: 'admin' | 'customer';
  addresses: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface StoreState {
  // DB State
  products: Product[];
  services: TailoringService[];
  bookings: Booking[];
  orders: Order[];
  coupons: Coupon[];
  
  // User Session
  currentUser: User | null;
  
  // E-commerce state
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  recentlyViewed: string[]; // Product IDs
  
  // Actions
  // Product CRUD
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addReview: (productId: string, userName: string, rating: number, comment: string) => void;
  
  // Tailoring CRUD
  addService: (service: Omit<TailoringService, 'id'>) => void;
  updateService: (id: string, service: Partial<TailoringService>) => void;
  deleteService: (id: string) => void;
  
  // Booking CRUD
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => string;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  
  // Order CRUD
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => string;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  // Coupon CRUD
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  
  // Cart Actions
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  
  // Auth Actions
  login: (email: string, role?: 'admin' | 'customer') => void;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  addAddress: (address: string) => void;
  removeAddress: (index: number) => void;
  
  // Recently Viewed
  addRecentlyViewed: (productId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      services: INITIAL_SERVICES,
      bookings: INITIAL_BOOKINGS,
      orders: INITIAL_ORDERS,
      coupons: INITIAL_COUPONS,
      currentUser: null,
      cart: [],
      wishlist: [],
      recentlyViewed: [],

      // Product CRUD
      addProduct: (p) => set((state) => {
        const newProduct: Product = {
          ...p,
          id: `p-${Date.now()}`,
          rating: 5,
          reviews: []
        };
        return { products: [newProduct, ...state.products] };
      }),
      
      updateProduct: (id, updatedFields) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updatedFields } : p)
      })),
      
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),

      addReview: (productId, userName, rating, comment) => set((state) => {
        const reviewDate = new Date().toISOString().split('T')[0];
        const newReview = { id: `r-${Date.now()}`, userName, rating, comment, date: reviewDate };
        return {
          products: state.products.map(p => {
            if (p.id === productId) {
              const reviews = [newReview, ...p.reviews];
              const avgRating = Number((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1));
              return { ...p, reviews, rating: avgRating };
            }
            return p;
          })
        };
      }),

      // Services CRUD
      addService: (s) => set((state) => {
        const newService: TailoringService = {
          ...s,
          id: `s-${Date.now()}`
        };
        return { services: [...state.services, newService] };
      }),
      
      updateService: (id, updatedFields) => set((state) => ({
        services: state.services.map(s => s.id === id ? { ...s, ...updatedFields } : s)
      })),
      
      deleteService: (id) => set((state) => ({
        services: state.services.filter(s => s.id !== id)
      })),

      // Booking CRUD
      addBooking: (b) => {
        const id = `BKG-${Math.floor(1000 + Math.random() * 9000)}`;
        set((state) => ({
          bookings: [
            {
              ...b,
              id,
              status: 'pending',
              createdAt: new Date().toISOString()
            },
            ...state.bookings
          ]
        }));
        return id;
      },
      
      updateBookingStatus: (id, status) => set((state) => ({
        bookings: state.bookings.map(b => b.id === id ? { ...b, status } : b)
      })),

      // Order CRUD
      placeOrder: (o) => {
        const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        set((state) => ({
          orders: [
            {
              ...o,
              id,
              status: 'pending',
              createdAt: new Date().toISOString()
            },
            ...state.orders
          ]
        }));
        return id;
      },
      
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
      })),

      // Coupons CRUD
      addCoupon: (c) => set((state) => ({
        coupons: [c, ...state.coupons.filter(existing => existing.code !== c.code)]
      })),
      
      deleteCoupon: (code) => set((state) => ({
        coupons: state.coupons.filter(c => c.code !== code)
      })),

      // Cart Actions
      addToCart: (product, size, quantity = 1) => set((state) => {
        const existingItem = state.cart.find(
          item => item.product.id === product.id && item.size === size
        );
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.product.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        return {
          cart: [...state.cart, { product, size, quantity }]
        };
      }),
      
      removeFromCart: (productId, size) => set((state) => ({
        cart: state.cart.filter(item => !(item.product.id === productId && item.size === size))
      })),
      
      updateCartQuantity: (productId, size, quantity) => set((state) => ({
        cart: state.cart.map(item =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      })),
      
      clearCart: () => set({ cart: [] }),

      // Wishlist Actions
      toggleWishlist: (productId) => set((state) => {
        const inWishlist = state.wishlist.includes(productId);
        return {
          wishlist: inWishlist
            ? state.wishlist.filter(id => id !== productId)
            : [...state.wishlist, productId]
        };
      }),

      // Auth Actions
      login: (email, role = 'customer') => set((state) => {
        // If logging in as admin, switch user
        if (email.toLowerCase().includes('admin')) {
          return {
            currentUser: {
              name: 'Owner Admin',
              email: 'admin@threadsandtraditions.com',
              role: 'admin',
              addresses: ['Boutique Address: Shop 14, Lotus Plaza, Noida']
            }
          };
        }
        return {
          currentUser: {
            name: email.split('@')[0],
            email,
            role,
            addresses: ['123 Silk Road, Handloom Sector, Noida']
          }
        };
      }),
      
      logout: () => set({ currentUser: null, cart: [], wishlist: [] }),
      
      updateProfile: (name, email) => set((state) => ({
        currentUser: state.currentUser ? { ...state.currentUser, name, email } : null
      })),
      
      addAddress: (address) => set((state) => ({
        currentUser: state.currentUser 
          ? { ...state.currentUser, addresses: [...state.currentUser.addresses, address] }
          : null
      })),
      
      removeAddress: (index) => set((state) => ({
        currentUser: state.currentUser 
          ? { ...state.currentUser, addresses: state.currentUser.addresses.filter((_, i) => i !== index) }
          : null
      })),

      // Recently Viewed
      addRecentlyViewed: (productId) => set((state) => {
        const filtered = state.recentlyViewed.filter(id => id !== productId);
        return {
          recentlyViewed: [productId, ...filtered].slice(0, 4) // cap at 4 products
        };
      })
    }),
    {
      name: 'threads-traditions-storage', // localstorage key
      partialize: (state) => ({
        products: state.products,
        services: state.services,
        bookings: state.bookings,
        orders: state.orders,
        coupons: state.coupons,
        currentUser: state.currentUser,
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed
      }),
    }
  )
);
