export interface Service {
  slug: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  numericPrice?: number;
  description: string;
  image: string;
  includes: string[];
  popular?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
}

export interface MembershipTier {
  id: string;
  bbh: string; // e.g. "7 BBH"
  name: string;
  subtitle: string;
  bbhCount: number;
  perSessionCost: string;
  validityMonths: number;
  price: string;
  numericPrice: number;
  discounts: string[];
  popular?: boolean;
}

export interface LocationBranch {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  address: string;
  email: string;
  phone: string;
  headerPhone?: string;
  hours: string;
  mapEmbedUrl?: string;
  mapUrl?: string;
  image: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  note: string;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  serviceName?: string;
  location: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Rejected';
}

export interface FranchiseEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  message?: string;
  createdAt: string;
  status: 'Pending' | 'Contacted';
}

export interface BusinessSettings {
  brandName: string;
  brandFullName: string;
  tagline: string;
  announcement: string;
  heroHeadline: string;
  heroSubtitle: string;
  phone: string;
  headerPhone?: string;
  email: string;
  hours: string;
  address: string;
  logo: string;
  demoNotice: string;
  whatsappUrl?: string;
  mapUrl?: string;
  sourceNotes?: string[];
  sourceClaimStats?: Array<{ label: string; value: string; sourceUrl: string; needsVerification: boolean }>;
}
