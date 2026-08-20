export type CuisineCategory = 
  | 'ALL'
  | 'TANDOOR'
  | 'BIRYANI'
  | 'INDIAN'
  | 'CHINESE'
  | 'CONTINENTAL'
  | 'SIZZLERS'
  | 'PASTA'
  | 'DESSERTS'
  | 'BEVERAGES';

export type GalleryCategory = 'ALL' | 'FOOD' | 'INTERIORS' | 'ROOFTOP' | 'PEOPLE' | 'EVENINGS';

export interface MenuItem {
  id: string;
  name: string;
  category: CuisineCategory;
  subcategory?: string;
  description: string;
  price: number;
  isVeg: boolean;
  isChefSpecial?: boolean;
  isSignature?: boolean;
  spiciness?: 'mild' | 'medium' | 'spicy';
  image: string;
  pairingNotes?: string;
  portion?: string;
  tags?: string[];
}

export interface SignatureDish {
  id: string;
  name: string;
  tag: string;
  description: string;
  detailedProfile: string;
  price: number;
  image: string;
  pairingNotes: string;
  preparationTime: string;
  isVeg: boolean;
  flavorNotes: string[];
}

export interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  image: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'FOOD' | 'INTERIORS' | 'ROOFTOP' | 'PEOPLE' | 'EVENINGS';
  image: string;
  caption: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  review: string;
  occasionTag: string;
  dishMentioned?: string;
  verified: boolean;
}

export interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  capacity: string;
  image: string;
  perks: string[];
  recommendedSeating: string;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Rooftop Terrace' | 'AC Family Dining' | 'Poolside / Balcony' | 'Bar Lounge';
  occasion: 'Casual Dining' | 'Date Night' | 'Family Gathering' | 'Birthday Celebration' | 'Anniversary' | 'Corporate Dinner';
  specialRequests: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ReservationRecord {
  id?: string;
  reservationCode: string;
  fullName: string;
  contactNumber: string;
  email?: string;
  guestCount: number | string;
  date: string;
  timeSlot: string;
  seatingArea: string;
  diningOccasion: string;
  specialRequests?: string;
  status: ReservationStatus;
  tableAssigned?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MustTryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isVeg: boolean;
}
