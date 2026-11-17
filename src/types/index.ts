export type ProductCategory = 
  | 'tee-shirts'
  | 'christian-hoodies-uk'
  | 'sweaters'
  | 'christian-bags'
  | 'church-print-services'
  | 'blaze-city-merch'
  | 'christmas'
  | 'gym-sportswear';

export interface ProductColorVariant {
  name: string;
  hex: string;
  images: string[];
  hasSpecificImage?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  availableSizes: string[];
  colors: ProductColorVariant[];
  description: string;
  shortDescription?: string;
  longDescription?: string;
  scriptureReference?: string;
  careInstructions?: string;
  sizeGuideType: 'unisex-hoodie' | 'unisex-tshirt' | 'sweater' | 'tote-bag';
  customSizeNotes?: string;
  featuredImage: string;
  categoryOverview?: string;
  relatedProductIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface CartItem {
  id: string; // product id + size + color
  productId: string;
  name: string;
  slug: string;
  price: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
  design?: string;
  variant?: string;
  personalisedText?: string;
  uploadedArtworkUrl?: string;
}

export interface OrderItemDetails {
  productId: string;
  productName: string;
  design: string;
  variant: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  image?: string;
  personalisedText?: string;
  uploadedArtworkUrl?: string;
}

export interface OrderDeliveryAddress {
  line1: string;
  line2?: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
}

export interface OrderRecord {
  orderNumber: string;
  orderDate: string;
  paymentStatus: string;
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryAddress: OrderDeliveryAddress;
  items: OrderItemDetails[];
  stripePaymentId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  category: string;
  excerpt: string;
  contentHtml?: string;
  docxUrl?: string;
  publishDate: string;
  author: string;
  readingTimeMinutes: number;
  featuredProductIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
}

export interface SiteSettings {
  announcementBanner: string;
  announcementActive: boolean;
  globalMetaTitle: string;
  globalMetaDescription: string;
  contactEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  freeShippingThreshold: number;
}
