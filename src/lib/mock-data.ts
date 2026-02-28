export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'watches' | 'leather' | 'accessories' | 'jewelry';
  image: string;
  stock: number;
  featured: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  status: 'active' | 'inactive';
  joinedAt: string;
}

const productImages = [
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
];

export const products: Product[] = [
  { id: '1', name: 'Chronograph Elite', description: 'Swiss-made automatic chronograph with sapphire crystal', price: 2499, category: 'watches', image: productImages[0], stock: 12, featured: true, createdAt: '2025-12-01' },
  { id: '2', name: 'Heritage Diver', description: 'Water-resistant to 300m with ceramic bezel', price: 1899, category: 'watches', image: productImages[1], stock: 8, featured: true, createdAt: '2025-11-15' },
  { id: '3', name: 'Milano Briefcase', description: 'Full-grain Italian leather with brass hardware', price: 890, category: 'leather', image: productImages[2], stock: 15, featured: true, createdAt: '2025-10-20' },
  { id: '4', name: 'Voyager Duffle', description: 'Hand-stitched travel bag in vegetable-tanned leather', price: 1250, category: 'leather', image: productImages[3], stock: 6, featured: false, createdAt: '2025-09-10' },
  { id: '5', name: 'Onyx Cufflinks', description: 'Sterling silver cufflinks with black onyx stones', price: 320, category: 'accessories', image: productImages[4], stock: 25, featured: false, createdAt: '2025-12-05' },
  { id: '6', name: 'Gold Chain Necklace', description: '18K gold-plated Cuban link chain', price: 450, category: 'jewelry', image: productImages[5], stock: 20, featured: true, createdAt: '2025-11-01' },
  { id: '7', name: 'Signet Ring', description: 'Hand-engraved sterling silver signet ring', price: 280, category: 'jewelry', image: productImages[6], stock: 30, featured: false, createdAt: '2025-10-15' },
  { id: '8', name: 'Aviator Sunglasses', description: 'Titanium frame with polarized lenses', price: 395, category: 'accessories', image: productImages[7], stock: 18, featured: true, createdAt: '2025-08-20' },
  { id: '9', name: 'Dress Watch Slim', description: 'Ultra-thin automatic movement, rose gold case', price: 3200, category: 'watches', image: productImages[8], stock: 5, featured: true, createdAt: '2025-12-10' },
  { id: '10', name: 'Leather Card Holder', description: 'Minimalist card holder in saffiano leather', price: 145, category: 'leather', image: productImages[9], stock: 40, featured: false, createdAt: '2025-07-15' },
  { id: '11', name: 'Silk Pocket Square', description: 'Hand-rolled Italian silk in paisley print', price: 85, category: 'accessories', image: productImages[10], stock: 50, featured: false, createdAt: '2025-06-01' },
  { id: '12', name: 'Diamond Stud Earrings', description: '0.5ct lab-grown diamonds in platinum setting', price: 1800, category: 'jewelry', image: productImages[11], stock: 10, featured: true, createdAt: '2025-11-25' },
];

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'James Wilson', email: 'james@example.com', items: [{ productId: '1', quantity: 1, price: 2499 }], total: 2499, status: 'completed', date: '2026-02-15' },
  { id: 'ORD-002', customer: 'Sarah Chen', email: 'sarah@example.com', items: [{ productId: '3', quantity: 1, price: 890 }, { productId: '5', quantity: 2, price: 320 }], total: 1530, status: 'pending', date: '2026-02-20' },
  { id: 'ORD-003', customer: 'Omar Hassan', email: 'omar@example.com', items: [{ productId: '6', quantity: 1, price: 450 }], total: 450, status: 'completed', date: '2026-02-22' },
  { id: 'ORD-004', customer: 'Emily Taylor', email: 'emily@example.com', items: [{ productId: '9', quantity: 1, price: 3200 }], total: 3200, status: 'pending', date: '2026-02-25' },
  { id: 'ORD-005', customer: 'Michael Brown', email: 'michael@example.com', items: [{ productId: '2', quantity: 1, price: 1899 }], total: 1899, status: 'cancelled', date: '2026-02-10' },
  { id: 'ORD-006', customer: 'Aisha Khan', email: 'aisha@example.com', items: [{ productId: '12', quantity: 1, price: 1800 }], total: 1800, status: 'completed', date: '2026-02-18' },
];

export const users: User[] = [
  { id: 'USR-001', name: 'Admin User', email: 'admin@luxe.com', role: 'admin', status: 'active', joinedAt: '2025-01-01' },
  { id: 'USR-002', name: 'James Wilson', email: 'james@example.com', role: 'customer', status: 'active', joinedAt: '2025-06-15' },
  { id: 'USR-003', name: 'Sarah Chen', email: 'sarah@example.com', role: 'customer', status: 'active', joinedAt: '2025-08-20' },
  { id: 'USR-004', name: 'Omar Hassan', email: 'omar@example.com', role: 'customer', status: 'active', joinedAt: '2025-09-10' },
  { id: 'USR-005', name: 'Emily Taylor', email: 'emily@example.com', role: 'customer', status: 'inactive', joinedAt: '2025-03-05' },
  { id: 'USR-006', name: 'Michael Brown', email: 'michael@example.com', role: 'customer', status: 'active', joinedAt: '2025-11-01' },
];

// Mock API with 1s latency
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProducts: async (params?: { category?: string; search?: string; sort?: string; page?: number; pageSize?: number }) => {
    await delay();
    let filtered = [...products];
    if (params?.category && params.category !== 'all') {
      filtered = filtered.filter(p => p.category === params.category);
    }
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    if (params?.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (params?.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (params?.sort === 'newest') filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 6;
    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    return { products: paginated, total, totalPages: Math.ceil(total / pageSize), page };
  },

  getFeaturedProducts: async () => {
    await delay();
    return products.filter(p => p.featured);
  },

  getProduct: async (id: string) => {
    await delay();
    return products.find(p => p.id === id) || null;
  },

  getOrders: async () => {
    await delay();
    return orders;
  },

  getUsers: async () => {
    await delay();
    return users;
  },

  getDashboardStats: async () => {
    await delay();
    return {
      totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0),
      totalOrders: orders.length,
      totalProducts: products.length,
      totalUsers: users.length,
    };
  },
};
