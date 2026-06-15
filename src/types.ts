export interface PiercingService {
  id: string;
  name: string;
  category: 'ear' | 'nose' | 'lip' | 'face' | 'body';
  categoryUa: string;
  price: number;
  healingTime: string; // e.g. "2-3 місяці"
  painLevel: 1 | 2 | 3 | 4 | 5; // Pain scale
  description: string;
  jewelryIncluded: boolean;
  recommendedJewelry: string;
  minAge?: string; // e.g. "14+ років"
}

export interface Piercer {
  id: string;
  name: string;
  role: string;
  experience: string; // e.g. "5 років"
  bio: string;
  rating: number;
  specialty: string[];
  imageUrl: string;
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  title: string;
  serviceId: string;
  category: 'ear' | 'nose' | 'lip' | 'face' | 'body';
  piercerId: string;
  healingPhase: string; // e.g. "Свіжий", "Загоєний"
}

export interface SterilizationStep {
  id: number;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  piercerId: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl?: string;
  rating: number; // 1-5
  date: string;
  serviceName: string;
  text: string;
  verified: boolean;
  repliedBy?: string;
  replyText?: string;
}

export interface LocationStep {
  id: number;
  title: string;
  description: string;
  direction: string;
  iconName: string;
}
