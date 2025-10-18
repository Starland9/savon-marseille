import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  id: number;
  name: string;
  description: string;
  category: number;
  category_name: string;
  weight: string;
  price: string;
  wholesale_price: string;
  stock: number;
  image: string | null;
  ingredients: string;
  is_active: boolean;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
  reviews: Review[];
  average_rating: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  product: number;
  user_name: string;
  user_email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface Order {
  id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  order_type: 'retail' | 'wholesale';
  notes?: string;
  items: OrderItem[];
}

export interface Service {
  id: number;
  name: string;
  description: string;
  service_type: string;
  category: number;
  category_name: string;
  shop: number;
  shop_name: string;
  price: string;
  duration_minutes: number;
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  reviews: ServiceReview[];
  average_rating: number;
}

export interface ServiceReview {
  id: number;
  service: number;
  user_name: string;
  user_email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ServiceBooking {
  id?: number;
  service: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  booking_date: string;
  booking_time: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Shop {
  id: number;
  owner: number;
  owner_username: string;
  name: string;
  description: string;
  logo: string | null;
  banner: string | null;
  phone: string;
  email: string;
  address: string;
  city: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  product_count: number;
  service_count: number;
}

export const productsAPI = {
  getAll: (params?: any) => api.get<{ results: Product[] }>('/products/products/', { params }),
  getById: (id: number) => api.get<Product>(`/products/products/${id}/`),
  getFeatured: () => api.get<Product[]>('/products/products/featured/'),
};

export const categoriesAPI = {
  getAll: () => api.get<{ results: Category[] }>('/products/categories/'),
  getById: (id: number) => api.get<Category>(`/products/categories/${id}/`),
};

export const ordersAPI = {
  create: (order: Order) => api.post('/orders/orders/', order),
  getById: (id: number) => api.get(`/orders/orders/${id}/`),
  cancel: (id: number) => api.post(`/orders/orders/${id}/cancel/`),
};

export const reviewsAPI = {
  getByProduct: (productId: number) => api.get<Review[]>('/products/reviews/', { params: { product: productId } }),
  create: (review: Omit<Review, 'id' | 'created_at'>) => api.post('/products/reviews/', review),
};

export const servicesAPI = {
  getAll: (params?: any) => api.get<{ results: Service[] }>('/products/services/', { params }),
  getById: (id: number) => api.get<Service>(`/products/services/${id}/`),
  getFeatured: () => api.get<Service[]>('/products/services/featured/'),
};

export const serviceReviewsAPI = {
  getByService: (serviceId: number) => api.get<ServiceReview[]>('/products/service-reviews/', { params: { service: serviceId } }),
  create: (review: Omit<ServiceReview, 'id' | 'created_at'>) => api.post('/products/service-reviews/', review),
};

export const bookingsAPI = {
  create: (booking: ServiceBooking) => api.post('/orders/bookings/', booking),
  getById: (id: number) => api.get(`/orders/bookings/${id}/`),
  cancel: (id: number) => api.post(`/orders/bookings/${id}/cancel/`),
  confirm: (id: number) => api.post(`/orders/bookings/${id}/confirm/`),
};

export const shopsAPI = {
  getAll: (params?: any) => api.get<{ results: Shop[] }>('/users/shops/', { params }),
  getById: (id: number) => api.get<Shop>(`/users/shops/${id}/`),
  create: (shop: Partial<Shop>) => api.post('/users/shops/', shop),
  update: (id: number, shop: Partial<Shop>) => api.put(`/users/shops/${id}/`, shop),
  getMyShops: () => api.get<Shop[]>('/users/shops/my_shops/'),
};

export default api;
