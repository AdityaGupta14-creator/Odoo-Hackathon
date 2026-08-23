import type { Destination, Trip, ItineraryDay, Hotel, Activity } from '../types';

export const destinations: Destination[] = [
  {
    id: 'jaipur',
    city: 'Jaipur & Udaipur',
    country: 'Rajasthan, India (Winter Season)',
    image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Royal forts, desert safaris, lake palaces and vibrant winter bazaars.',
    tag: 'Culture',
    category: 'Culture',
    rating: 4.9,
    price: 52000,
  },
  {
    id: 'kashmir',
    city: 'Kashmir & Gulmarg',
    country: 'J&K, India (Spring & Peak Winter)',
    image: 'https://images.pexels.com/photos/12304509/pexels-photo-12304509.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Snow-capped peaks, blooming tulip gardens, shikara rides and skiing slopes.',
    tag: 'Romantic',
  },
  {
    id: 'manali',
    city: 'Manali & Leh-Ladakh',
    country: 'Himachal & Ladakh, India (Summer Season)',
    image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'High-altitude mountain passes, crystal lakes, cool valleys and thrilling treks.',
    tag: 'Adventure',
  },
  {
    id: 'kerala',
    city: 'Munnar & Alleppey',
    country: 'Kerala, India (Monsoon & Spring)',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Emerald tea plantations, tranquil backwater houseboats and ayurvedic retreats.',
    tag: 'Relax',
    category: 'Relax',
    rating: 4.7,
    price: 28000,
  },
  {
    id: 'goa',
    city: 'Goa',
    country: 'India (Winter & Post-Monsoon)',
    image: 'https://images.pexels.com/photos/28368719/pexels-photo-28368719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Sun-soaked beaches, Portuguese heritage, water sports and seafood shacks.',
    tag: 'Beach',
  },
  {
    id: 'varanasi',
    city: 'Varanasi & Kolkata',
    country: 'India (Autumn / Festive Season)',
    image: 'https://images.pexels.com/photos/8112574/pexels-photo-8112574.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Spiritual Ganga aarti, historic ghats, autumn Durga Puja and rich heritage.',
    tag: 'Culture',
  },
];

export const exploreDestinations: Destination[] = [
  ...destinations,
  {
    id: 'coorg',
    city: 'Coorg & Ooty',
    country: 'Karnataka & Tamil Nadu, India (Summer & Monsoon)',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Misty hills, aromatic coffee plantations, waterfalls and scenic toy trains.',
    tag: 'Relax',
  },
  {
    id: 'rann-kutch',
    city: 'Rann of Kutch',
    country: 'Gujarat, India (Winter Season)',
    image: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Endless white salt desert, Rann Utsav cultural dance, folk music and starry skies.',
    tag: 'Culture',
  },
  {
    id: 'andaman',
    city: 'Andaman & Nicobar Islands',
    country: 'India (Post-Monsoon & Winter)',
    image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Turquoise waters, coral reef scuba diving, Radhanagar beach and sea walks.',
    tag: 'Beach',
    category: 'Beach',
    rating: 4.4,
    price: 15000,
  },
  {
    id: 'rishikesh',
    city: 'Rishikesh & Auli',
    country: 'Uttarakhand, India (Winter & Spring)',
    image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'River rafting on the Ganges, yoga retreats, snow skiing and Himalayan panoramas.',
    tag: 'Adventure',
  },
];

/**
 * Fetches destinations with seasonal scoring from the CSV databases.
 * Falls back to the hardcoded exploreDestinations on error.
 */
export async function fetchDestinations(): Promise<Destination[]> {
  try {
    const { getSeasonalDestinations } = await import('./seasonData');
    // simulate network latency for loading skeleton UX
    await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 300));
    return getSeasonalDestinations();
  } catch (err) {
    console.error('Failed to load seasonal data, falling back to defaults:', err);
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600));
    return exploreDestinations;
  }
}

export const upcomingTrip: Trip = {
  id: 'royal-rajasthan-heritage',
  name: 'Royal Rajasthan Heritage Journey',
  image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  destination: 'Jaipur → Jodhpur → Udaipur',
  country: 'India (Winter Season)',
  days: 6,
  travelers: '2 travelers',
  budget: 42000,
  interests: ['Heritage', 'Sightseeing', 'Culture', 'Food'],
  startDate: '10 Nov 2026',
  endDate: '16 Nov 2026',
  createdAt: Date.now() - 86400000 * 3,
  progress: 85,
  selectedHotels: [],
  selectedActivities: [],
  summary: 'A royal circuit through Rajasthan during the pleasant winter festival season with palace stays and desert safaris.',
  conditions: {
    status: 'green',
    statusLabel: 'Peak season - ideal weather',
    temperature: 24,
    humidity: 'Low',
    rainChance: 5,
    recommendation: 'Crisp pleasant days and cool evenings. Perfect for fort exploration, shopping and outdoor dining.',
  },
  hotels: [] as Hotel[],
  activities: [] as Activity[],
  itinerary: [] as ItineraryDay[],
  budgetBreakdown: { accommodation: 18000, transportation: 10000, food: 8000, activities: 6000 },
};
