export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number; // e.g., 20 for 20%
  category: 'suits' | 'sarees' | 'blouses';
  images: string[];
  fabric: string;
  color: string;
  occasion: string;
  sizes: string[];
  description: string;
  washCare: string;
  stock: number;
  featured?: boolean;
  newArrival?: boolean;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TailoringService {
  id: string;
  name: string;
  category: 'stitching' | 'alteration' | 'finishing';
  description: string;
  startingPrice: number;
  duration: string; // e.g., "2-3 Days"
  image?: string;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  billingAddress: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  expiryDate: string;
  minSpend?: number;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Royal Maroon Velvet Anarkali Suit Set',
    price: 3899,
    originalPrice: 4899,
    discount: 20,
    category: 'suits',
    images: ['/images/product_maroon_velvet_1.jpg', '/images/product_maroon_velvet_2.jpg'],
    fabric: 'Velvet & Organza',
    color: 'Maroon',
    occasion: 'Festive Wear',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'An elegant maroon velvet Anarkali suit set with intricate gold zari embroidery on the yoke and cuffs. Comes with a matching organza dupatta featuring scalloped borders and raw silk trousers.',
    washCare: 'Dry Clean Only',
    stock: 8,
    featured: true,
    newArrival: true,
    rating: 4.8,
    reviews: [
      { id: 'r1', userName: 'Anjali Sharma', rating: 5, comment: 'The fabric feels so luxurious! Got compliments all night.', date: '2026-06-15' },
      { id: 'r2', userName: 'Preeti Das', rating: 4, comment: 'Beautiful suit, fits well after a minor waist alteration.', date: '2026-06-20' }
    ]
  },
  {
    id: 'p2',
    name: 'Classic Mustard Silk Banarasi Saree',
    price: 5200,
    originalPrice: 6500,
    discount: 20,
    category: 'sarees',
    images: ['/images/product_mustard_silk_1.jpg', '/images/product_mustard_silk_2.jpg'],
    fabric: 'Banarasi Katan Silk',
    color: 'Mustard Yellow',
    occasion: 'Wedding Wear',
    sizes: ['Free Size'],
    description: 'Handwoven Banarasi silk saree in a brilliant mustard yellow shade, complete with a traditional gold zari border and rich pallu featuring floral motifs. Includes unstitched blouse piece.',
    washCare: 'Dry Clean Only',
    stock: 5,
    featured: true,
    newArrival: false,
    rating: 4.9,
    reviews: [
      { id: 'r3', userName: 'Sunita Roy', rating: 5, comment: 'Authentic silk texture. Highly recommended for family events.', date: '2026-05-10' }
    ]
  },
  {
    id: 'p3',
    name: 'Mint Green Floral Georgette Saree',
    price: 2499,
    originalPrice: 2999,
    discount: 16,
    category: 'sarees',
    images: ['/images/product_mint_green_1.jpg'],
    fabric: 'Georgette',
    color: 'Mint Green',
    occasion: 'Casual Festive',
    sizes: ['Free Size'],
    description: 'A light and breezy mint green georgette saree printed with beautiful pastel watercolor florals. Finished with a delicate gold gota-patti border. Perfect for daytime functions.',
    washCare: 'Gentle Hand Wash',
    stock: 12,
    featured: false,
    newArrival: true,
    rating: 4.5,
    reviews: []
  },
  {
    id: 'p4',
    name: 'Elbow-Length Velvet Blouse with Zardozi Work',
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    category: 'blouses',
    images: ['/images/product_velvet_blouse_1.jpg'],
    fabric: 'Velvet',
    color: 'Deep Red',
    occasion: 'Bridal/Party Wear',
    sizes: ['34', '36', '38', '40'],
    description: 'A heavily embroidered deep red velvet padded blouse. The back features a deep round neckline with handcrafted dori tassels. Front hook-and-eye closure.',
    washCare: 'Dry Clean Only',
    stock: 15,
    featured: true,
    newArrival: true,
    rating: 4.7,
    reviews: [
      { id: 'r4', userName: 'Kriti Verma', rating: 5, comment: 'Stitching and embroidery are absolute perfection.', date: '2026-06-25' }
    ]
  },
  {
    id: 'p5',
    name: 'Earthy Indigo Cotton Suit Set',
    price: 1850,
    originalPrice: 1850,
    category: 'suits',
    images: ['/images/product_indigo_cotton_1.jpg'],
    fabric: '100% Indigo Cotton',
    color: 'Indigo Blue',
    occasion: 'Daily Wear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Everyday comfortable regular fit block-printed indigo straight kurti, paired with off-white cotton palazzo trousers and a lightweight mulmul dupatta.',
    washCare: 'Hand Wash separately in cold water',
    stock: 20,
    featured: false,
    newArrival: false,
    rating: 4.3,
    reviews: [
      { id: 'r5', userName: 'Neha K.', rating: 4, comment: 'Perfect for office wear. Very breathable fabric.', date: '2026-06-02' }
    ]
  },
  {
    id: 'p6',
    name: 'Golden Brocade Sleeveless Saree Blouse',
    price: 999,
    originalPrice: 1299,
    discount: 23,
    category: 'blouses',
    images: ['/images/product_brocade_blouse_1.jpg'],
    fabric: 'Banarasi Brocade Silk',
    color: 'Gold',
    occasion: 'Party Wear',
    sizes: ['32', '34', '36', '38', '40'],
    description: 'A classic sleeveless gold brocade blouse that pairs beautifully with almost any saree. Features a boat neck front and back, with inside margins for size adjustments.',
    washCare: 'Dry Clean Recommended',
    stock: 25,
    featured: false,
    newArrival: false,
    rating: 4.6,
    reviews: []
  }
];

export const INITIAL_SERVICES: TailoringService[] = [
  {
    id: 's1',
    name: 'Blouse Stitching (Plain/Padded)',
    category: 'stitching',
    description: 'Custom tailored saree blouse made exactly to your body measurements. Choose necklines, back designs, sleeve length, and padding choices.',
    startingPrice: 650,
    duration: '4-5 Days'
  },
  {
    id: 's2',
    name: 'Blouse Alteration & Fitting',
    category: 'alteration',
    description: 'Fixing loose or tight blouses, adding/removing sleeves, adding pads, or adjusting shoulders for that flawless fit.',
    startingPrice: 150,
    duration: '1-2 Days'
  },
  {
    id: 's3',
    name: 'Saree Pico & Fall Stitching',
    category: 'finishing',
    description: 'Overlock edging (pico) on both ends of the saree and stitching cotton fallback support on the lower inner hem.',
    startingPrice: 120,
    duration: '1 Day'
  },
  {
    id: 's4',
    name: 'Saree Rolling & Polishing',
    category: 'finishing',
    description: 'Professional rolling and mild starching/polishing for organza, silk, and cotton sarees to restore original shine and drape.',
    startingPrice: 250,
    duration: '2 Days'
  },
  {
    id: 's5',
    name: 'Salwar/Anarkali Suit Stitching',
    category: 'stitching',
    description: 'Stitching of custom salwar kameez, designer kurti, pants, palazzo, or heavy lining Anarkali sets from fabric.',
    startingPrice: 1200,
    duration: '6-7 Days'
  },
  {
    id: 's6',
    name: 'Kurti / Suit Alteration',
    category: 'alteration',
    description: 'Side fitting adjustments, length shortening/lengthening, sleeve adjustments, or neckline modifications.',
    startingPrice: 200,
    duration: '1-2 Days'
  },
  {
    id: 's7',
    name: 'Custom Lehenga Stitching',
    category: 'stitching',
    description: 'High-end lehenga choli stitching with canvas lining, double gher, latkan details, and customized dupatta drapery settings.',
    startingPrice: 2500,
    duration: '8-10 Days'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    customerName: 'Rohini Sen',
    phone: '9876543210',
    serviceId: 's1',
    serviceName: 'Blouse Stitching (Plain/Padded)',
    preferredDate: '2026-07-10',
    preferredTime: '14:00',
    notes: 'Padded blouse, deep back with dori. I will bring the fabric to the store.',
    status: 'pending',
    createdAt: '2026-07-08T10:00:00.000Z'
  },
  {
    id: 'b2',
    customerName: 'Megha Gupta',
    phone: '9123456789',
    serviceId: 's3',
    serviceName: 'Saree Pico & Fall Stitching',
    preferredDate: '2026-07-09',
    preferredTime: '11:00',
    notes: 'Need express 1-day delivery for a wedding on Friday.',
    status: 'accepted',
    createdAt: '2026-07-07T15:30:00.000Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8932',
    customerName: 'Shalini Sharma',
    email: 'shalini@gmail.com',
    phone: '9876543222',
    shippingAddress: 'Flat 405, Block B, Silver Oak Apartments, Sector 45, Noida, UP - 201301',
    billingAddress: 'Flat 405, Block B, Silver Oak Apartments, Sector 45, Noida, UP - 201301',
    items: [
      {
        productId: 'p1',
        productName: 'Royal Maroon Velvet Anarkali Suit Set',
        image: '/images/product_maroon_velvet_1.jpg',
        price: 3899,
        quantity: 1,
        size: 'M'
      }
    ],
    subtotal: 3899,
    tax: 194.95,
    shipping: 100,
    total: 4193.95,
    paymentMethod: 'UPI',
    status: 'pending',
    createdAt: '2026-07-07T12:00:00.000Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountType: 'percentage', value: 10, expiryDate: '2026-12-31', minSpend: 1000 },
  { code: 'FESTIVE500', discountType: 'fixed', value: 500, expiryDate: '2026-09-30', minSpend: 3000 }
];
