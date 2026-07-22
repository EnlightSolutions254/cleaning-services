export interface Service {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'specialized' | 'outdoor';
  description: string;
  longDescription: string;
  priceStartingKsh: number;
  priceUnit: string;
  iconName: string;
  features: string[];
  popular?: boolean;
  slug: string;
  imageUrl: string;
  estimatedTime: string;
}

export interface LocationArea {
  id: string;
  townName: string;
  subCounty: string;
  description: string;
  keyEstates: string[];
  popularServices: string[];
  deliveryTime: string;
  featuredLandmarks: string[];
  slug: string;
}

export interface BookingRequest {
  id: string;
  referenceCode: string;
  customerName: string;
  phone: string;
  email: string;
  locationTown: string;
  estateLandmark: string;
  serviceId: string;
  serviceTitle: string;
  propertyType: string;
  propertySize: string;
  addOns: string[];
  preferredDate: string;
  preferredTime: string;
  totalEstimatedKsh: number;
  paymentMethod: 'mpesa_stk' | 'mpesa_paybill' | 'cash_after';
  mpesaPhone?: string;
  mpesaReceiptNumber?: string;
  paymentStatus: 'pending' | 'paid_deposit' | 'paid_full';
  specialInstructions?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'completed' | 'cancelled';
}

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  location: string;
  details: string;
  estimatedKsh: number;
  createdAt: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  estate: string;
  rating: number;
  reviewText: string;
  date: string;
  verified: boolean;
  serviceName: string;
  avatarUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Cleaning Tips' | 'Home Care' | 'Office Hygiene' | 'Move In Guides' | 'Post Construction' | 'Nakuru Living' | 'Pest Control';
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  authorRole: string;
  publishDate: string;
  imageUrl: string;
  tags: string[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  location: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  durationHours: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking & Pricing' | 'M-Pesa Payments' | 'Safety & Staff' | 'Service Areas';
}

export interface IndustrySolution {
  id: string;
  title: string;
  description: string;
  iconName: string;
  keyBenefits: string[];
  recommendedFrequency: string;
  typicalClientsInNakuru: string[];
  imageUrl: string;
}

export interface PriceCalculatorInput {
  serviceType: string;
  bedrooms: number;
  bathrooms: number;
  sofaSeats: number;
  carpetSqft: number;
  isPostConstruction: boolean;
  needFumigation: boolean;
  needWaterTank: boolean;
  locationTown: string;
  urgency: 'standard' | 'express_sameday';
}
