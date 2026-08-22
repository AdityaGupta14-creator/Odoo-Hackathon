export interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  description: string;
  tag?: string;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  rating: number;
  pricePerNight: number;
  location: string;
  tags: string[];
  aiPick?: boolean;
}

export interface Activity {
  id: string;
  name: string;
  image: string;
  category: string;
  duration: string;
  rating: number;
  price: number;
}

export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  category: string;
  duration: string;
  cost: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  items: ItineraryItem[];
}

export interface TravelConditions {
  status: 'green' | 'yellow' | 'red';
  statusLabel: string;
  temperature: number;
  humidity: string;
  rainChance: number;
  recommendation: string;
}

export interface BudgetBreakdown {
  accommodation: number;
  transportation: number;
  food: number;
  activities: number;
}

export interface TripPlan {
  destination: string;
  country: string;
  days: number;
  travelers: string;
  budget: number;
  interests: string[];
  conditions: TravelConditions;
  hotels: Hotel[];
  activities: Activity[];
  itinerary: ItineraryDay[];
  budgetBreakdown: BudgetBreakdown;
  summary: string;
}

export interface Trip extends TripPlan {
  id: string;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  createdAt: number;
  progress: number;
  selectedHotels: string[];
  selectedActivities: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  plan?: TripPlan;
}
