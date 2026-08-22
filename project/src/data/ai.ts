import type { TripPlan } from '../types';

interface DestinationTemplate {
  destination: string;
  country: string;
  image: string;
  summary: string;
  conditions: {
    status: 'green' | 'yellow' | 'red';
    statusLabel: string;
    temperature: number;
    humidity: string;
    rainChance: number;
    recommendation: string;
  };
  hotels: {
    name: string;
    image: string;
    rating: number;
    pricePerNight: number;
    location: string;
    tags: string[];
    aiPick?: boolean;
  }[];
  activities: {
    name: string;
    image: string;
    category: string;
    duration: string;
    rating: number;
    price: number;
  }[];
  itinerary: { title: string; items: { time: string; activity: string; category: string; duration: string; cost: number }[] }[];
}

const templates: Record<string, DestinationTemplate> = {
  dubai: {
    destination: 'Dubai',
    country: 'UAE',
    image: 'https://images.pexels.com/photos/19664340/pexels-photo-19664340.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    summary: 'Optimized for your family, budget and preference for relaxed sightseeing.',
    conditions: {
      status: 'yellow',
      statusLabel: 'Some precautions recommended',
      temperature: 31,
      humidity: 'High',
      rainChance: 20,
      recommendation:
        'Outdoor sightseeing is best scheduled in the morning or evening. Consider indoor activities during the hottest part of the day.',
    },
    hotels: [
      {
        name: 'The Marina Hotel',
        image: 'https://images.pexels.com/photos/6434592/pexels-photo-6434592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.7,
        pricePerNight: 6500,
        location: 'Dubai Marina',
        tags: ['Family friendly', 'Great location', 'Near attractions'],
        aiPick: true,
      },
      {
        name: 'Downtown Stay',
        image: 'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.5,
        pricePerNight: 5200,
        location: 'Downtown Dubai',
        tags: ['Near Burj Khalifa', 'Great location'],
      },
      {
        name: 'Palm View Hotel',
        image: 'https://images.pexels.com/photos/6466496/pexels-photo-6466496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.8,
        pricePerNight: 7800,
        location: 'Palm Jumeirah',
        tags: ['Beachfront', 'Luxury stay'],
      },
    ],
    activities: [
      {
        name: 'Burj Khalifa',
        image: 'https://images.pexels.com/photos/5577693/pexels-photo-5577693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Landmark',
        duration: '2-3 hrs',
        rating: 4.9,
        price: 3500,
      },
      {
        name: 'Dubai Mall',
        image: 'https://images.pexels.com/photos/18669645/pexels-photo-18669645.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Shopping',
        duration: '3-4 hrs',
        rating: 4.6,
        price: 0,
      },
      {
        name: 'Desert Safari',
        image: 'https://images.pexels.com/photos/12565188/pexels-photo-12565188.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Adventure',
        duration: '5-6 hrs',
        rating: 4.8,
        price: 4500,
      },
      {
        name: 'Dubai Marina',
        image: 'https://images.pexels.com/photos/28350360/pexels-photo-28350360.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Sightseeing',
        duration: '2 hrs',
        rating: 4.7,
        price: 0,
      },
      {
        name: 'JBR Beach',
        image: 'https://images.pexels.com/photos/28350363/pexels-photo-28350363.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Relaxation',
        duration: '3 hrs',
        rating: 4.5,
        price: 0,
      },
    ],
    itinerary: [
      {
        title: 'Downtown Dubai',
        items: [
          { time: '09:00', activity: 'Breakfast', category: 'Food', duration: '1 hr', cost: 800 },
          { time: '11:00', activity: 'Burj Khalifa', category: 'Landmark', duration: '2-3 hrs', cost: 3500 },
          { time: '13:30', activity: 'Lunch', category: 'Food', duration: '1 hr', cost: 1200 },
          { time: '15:00', activity: 'Dubai Mall', category: 'Shopping', duration: '3-4 hrs', cost: 1000 },
          { time: '19:00', activity: 'Dinner', category: 'Food', duration: '1.5 hrs', cost: 1500 },
        ],
      },
      {
        title: 'Old Dubai',
        items: [
          { time: '09:00', activity: 'Breakfast', category: 'Food', duration: '1 hr', cost: 600 },
          { time: '10:00', activity: 'Al Fahidi Historical District', category: 'Culture', duration: '2 hrs', cost: 500 },
          { time: '13:00', activity: 'Local lunch', category: 'Food', duration: '1 hr', cost: 900 },
          { time: '15:00', activity: 'Dubai Creek', category: 'Sightseeing', duration: '2 hrs', cost: 300 },
          { time: '18:30', activity: 'Sunset', category: 'Relaxation', duration: '1 hr', cost: 0 },
        ],
      },
      {
        title: 'Desert Experience',
        items: [
          { time: 'Morning', activity: 'Relax at hotel', category: 'Relaxation', duration: '3 hrs', cost: 0 },
          { time: '15:00', activity: 'Desert Safari', category: 'Adventure', duration: '5-6 hrs', cost: 4500 },
          { time: '20:00', activity: 'Dinner', category: 'Food', duration: '1.5 hrs', cost: 1300 },
        ],
      },
      {
        title: 'Marina & JBR',
        items: [
          { time: '10:00', activity: 'Dubai Marina', category: 'Sightseeing', duration: '2 hrs', cost: 0 },
          { time: '13:00', activity: 'Lunch', category: 'Food', duration: '1 hr', cost: 1100 },
          { time: '16:00', activity: 'JBR Beach', category: 'Relaxation', duration: '3 hrs', cost: 0 },
          { time: '19:00', activity: 'Dinner', category: 'Food', duration: '1.5 hrs', cost: 1400 },
        ],
      },
    ],
  },
  paris: {
    destination: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/31482953/pexels-photo-31482953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    summary: 'A romantic itinerary blending iconic landmarks, café culture and art.',
    conditions: {
      status: 'green',
      statusLabel: 'Great conditions',
      temperature: 22,
      humidity: 'Moderate',
      rainChance: 30,
      recommendation: 'Pleasant late-summer weather. Light layers for cool evenings and a compact umbrella just in case.',
    },
    hotels: [
      {
        name: 'Le Marais Boutique',
        image: 'https://images.pexels.com/photos/6434592/pexels-photo-6434592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.6,
        pricePerNight: 8200,
        location: 'Le Marais',
        tags: ['Romantic', 'Walkable', 'Cafés nearby'],
        aiPick: true,
      },
      {
        name: 'Seine View Hotel',
        image: 'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.4,
        pricePerNight: 6800,
        location: 'Saint-Germain',
        tags: ['River view', 'Great location'],
      },
      {
        name: 'Montmartre Stay',
        image: 'https://images.pexels.com/photos/6466496/pexels-photo-6466496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.3,
        pricePerNight: 5500,
        location: 'Montmartre',
        tags: ['Artistic vibe', 'Charming'],
      },
    ],
    activities: [
      {
        name: 'Eiffel Tower',
        image: 'https://images.pexels.com/photos/16496484/pexels-photo-16496484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Landmark',
        duration: '2 hrs',
        rating: 4.8,
        price: 2800,
      },
      {
        name: 'Louvre Museum',
        image: 'https://images.pexels.com/photos/38523298/pexels-photo-38523298.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Culture',
        duration: '3-4 hrs',
        rating: 4.9,
        price: 1700,
      },
      {
        name: 'Seine River Cruise',
        image: 'https://images.pexels.com/photos/31482953/pexels-photo-31482953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Sightseeing',
        duration: '1 hr',
        rating: 4.6,
        price: 1500,
      },
      {
        name: 'Montmartre Walk',
        image: 'https://images.pexels.com/photos/16496484/pexels-photo-16496484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Culture',
        duration: '2-3 hrs',
        rating: 4.7,
        price: 0,
      },
      {
        name: 'Champs-Élysées',
        image: 'https://images.pexels.com/photos/38523298/pexels-photo-38523298.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Shopping',
        duration: '2 hrs',
        rating: 4.4,
        price: 0,
      },
    ],
    itinerary: [
      {
        title: 'Iconic Paris',
        items: [
          { time: '09:00', activity: 'Café breakfast', category: 'Food', duration: '1 hr', cost: 1200 },
          { time: '11:00', activity: 'Eiffel Tower', category: 'Landmark', duration: '2 hrs', cost: 2800 },
          { time: '13:30', activity: 'Bistro lunch', category: 'Food', duration: '1 hr', cost: 1800 },
          { time: '15:00', activity: 'Seine River Cruise', category: 'Sightseeing', duration: '1 hr', cost: 1500 },
          { time: '19:00', activity: 'Dinner', category: 'Food', duration: '2 hrs', cost: 2500 },
        ],
      },
      {
        title: 'Art & Culture',
        items: [
          { time: '09:00', activity: 'Breakfast', category: 'Food', duration: '1 hr', cost: 1000 },
          { time: '10:00', activity: 'Louvre Museum', category: 'Culture', duration: '3-4 hrs', cost: 1700 },
          { time: '14:00', activity: 'Tuileries walk', category: 'Relaxation', duration: '1 hr', cost: 0 },
          { time: '15:30', activity: 'Champs-Élysées', category: 'Shopping', duration: '2 hrs', cost: 800 },
          { time: '19:30', activity: 'Dinner', category: 'Food', duration: '2 hrs', cost: 2200 },
        ],
      },
      {
        title: 'Montmartre & Beyond',
        items: [
          { time: '09:30', activity: 'Breakfast', category: 'Food', duration: '1 hr', cost: 1100 },
          { time: '11:00', activity: 'Montmartre Walk', category: 'Culture', duration: '2-3 hrs', cost: 0 },
          { time: '14:00', activity: 'Lunch', category: 'Food', duration: '1 hr', cost: 1600 },
          { time: '16:00', activity: 'Shopping', category: 'Shopping', duration: '2 hrs', cost: 1200 },
          { time: '19:00', activity: 'Farewell dinner', category: 'Food', duration: '2 hrs', cost: 2400 },
        ],
      },
    ],
  },
  goa: {
    destination: 'Goa',
    country: 'India',
    image: 'https://images.pexels.com/photos/28368719/pexels-photo-28368719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    summary: 'A laid-back beach trip with sun, sand, seafood and friends.',
    conditions: {
      status: 'green',
      statusLabel: 'Great conditions',
      temperature: 29,
      humidity: 'High',
      rainChance: 15,
      recommendation: 'Sunny and warm — ideal beach weather. Stay hydrated and use sun protection during midday hours.',
    },
    hotels: [
      {
        name: 'Beachside Resort',
        image: 'https://images.pexels.com/photos/6434592/pexels-photo-6434592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.5,
        pricePerNight: 4200,
        location: 'Baga Beach',
        tags: ['Beachfront', 'Great for friends', 'Nightlife nearby'],
        aiPick: true,
      },
      {
        name: 'Palolem Hideaway',
        image: 'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.4,
        pricePerNight: 3500,
        location: 'Palolem',
        tags: ['Quiet', 'Scenic'],
      },
      {
        name: 'Anjuna Sands',
        image: 'https://images.pexels.com/photos/6466496/pexels-photo-6466496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.2,
        pricePerNight: 2800,
        location: 'Anjuna',
        tags: ['Budget friendly', 'Flea market'],
      },
    ],
    activities: [
      {
        name: 'Baga Beach',
        image: 'https://images.pexels.com/photos/28368719/pexels-photo-28368719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Beach',
        duration: 'Half day',
        rating: 4.5,
        price: 0,
      },
      {
        name: 'Sunset Cruise',
        image: 'https://images.pexels.com/photos/4428274/pexels-photo-4428274.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Sightseeing',
        duration: '2 hrs',
        rating: 4.7,
        price: 1200,
      },
      {
        name: 'Fort Aguada',
        image: 'https://images.pexels.com/photos/5639053/pexels-photo-5639053.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Landmark',
        duration: '1-2 hrs',
        rating: 4.4,
        price: 0,
      },
      {
        name: 'Anjuna Flea Market',
        image: 'https://images.pexels.com/photos/28368719/pexels-photo-28368719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Shopping',
        duration: '2-3 hrs',
        rating: 4.3,
        price: 500,
      },
      {
        name: 'Water Sports',
        image: 'https://images.pexels.com/photos/4428274/pexels-photo-4428274.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Adventure',
        duration: '2 hrs',
        rating: 4.6,
        price: 2500,
      },
    ],
    itinerary: [
      {
        title: 'Arrival & Baga',
        items: [
          { time: '10:00', activity: 'Check in & brunch', category: 'Food', duration: '1.5 hrs', cost: 900 },
          { time: '12:00', activity: 'Baga Beach', category: 'Beach', duration: 'Half day', cost: 0 },
          { time: '17:00', activity: 'Sunset Cruise', category: 'Sightseeing', duration: '2 hrs', cost: 1200 },
          { time: '20:00', activity: 'Beachside dinner', category: 'Food', duration: '2 hrs', cost: 1400 },
        ],
      },
      {
        title: 'Explore North Goa',
        items: [
          { time: '09:00', activity: 'Breakfast', category: 'Food', duration: '1 hr', cost: 600 },
          { time: '10:30', activity: 'Fort Aguada', category: 'Landmark', duration: '1-2 hrs', cost: 0 },
          { time: '13:00', activity: 'Lunch', category: 'Food', duration: '1 hr', cost: 800 },
          { time: '15:00', activity: 'Anjuna Flea Market', category: 'Shopping', duration: '2-3 hrs', cost: 500 },
          { time: '19:00', activity: 'Dinner & nightlife', category: 'Food', duration: '3 hrs', cost: 1500 },
        ],
      },
      {
        title: 'Adventure Day',
        items: [
          { time: '09:30', activity: 'Breakfast', category: 'Food', duration: '1 hr', cost: 600 },
          { time: '11:00', activity: 'Water Sports', category: 'Adventure', duration: '2 hrs', cost: 2500 },
          { time: '13:30', activity: 'Lunch', category: 'Food', duration: '1 hr', cost: 900 },
          { time: '15:30', activity: 'Beach relax', category: 'Beach', duration: '3 hrs', cost: 0 },
          { time: '19:30', activity: 'Farewell dinner', category: 'Food', duration: '2 hrs', cost: 1300 },
        ],
      },
    ],
  },
  tokyo: {
    destination: 'Tokyo',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/15275312/pexels-photo-15275312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    summary: 'A culture-rich journey through neon districts, serene shrines and incredible food.',
    conditions: {
      status: 'green',
      statusLabel: 'Great conditions',
      temperature: 26,
      humidity: 'Moderate',
      rainChance: 25,
      recommendation: 'Comfortable weather for city walking. Evenings cool down nicely — bring a light jacket.',
    },
    hotels: [
      {
        name: 'Shinjuku Central',
        image: 'https://images.pexels.com/photos/6434592/pexels-photo-6434592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.6,
        pricePerNight: 7500,
        location: 'Shinjuku',
        tags: ['Transit hub', 'Great location', 'Food'],
        aiPick: true,
      },
      {
        name: 'Asakusa Heritage',
        image: 'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.4,
        pricePerNight: 6200,
        location: 'Asakusa',
        tags: ['Traditional', 'Temple nearby'],
      },
      {
        name: 'Shibuya Crossing',
        image: 'https://images.pexels.com/photos/6466496/pexels-photo-6466496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.5,
        pricePerNight: 8000,
        location: 'Shibuya',
        tags: ['Nightlife', 'Shopping'],
      },
    ],
    activities: [
      {
        name: 'Senso-ji Temple',
        image: 'https://images.pexels.com/photos/15275312/pexels-photo-15275312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Culture',
        duration: '2 hrs',
        rating: 4.8,
        price: 0,
      },
      {
        name: 'Shibuya Crossing',
        image: 'https://images.pexels.com/photos/31048512/pexels-photo-31048512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Landmark',
        duration: '1 hr',
        rating: 4.7,
        price: 0,
      },
      {
        name: 'Tokyo Skytree',
        image: 'https://images.pexels.com/photos/20378135/pexels-photo-20378135.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Landmark',
        duration: '2 hrs',
        rating: 4.6,
        price: 2100,
      },
      {
        name: 'Tsukiji Food Tour',
        image: 'https://images.pexels.com/photos/15275312/pexels-photo-15275312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Food',
        duration: '3 hrs',
        rating: 4.9,
        price: 3500,
      },
      {
        name: 'Meiji Shrine',
        image: 'https://images.pexels.com/photos/20378135/pexels-photo-20378135.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        category: 'Culture',
        duration: '1-2 hrs',
        rating: 4.7,
        price: 0,
      },
    ],
    itinerary: [
      {
        title: 'Old Tokyo',
        items: [
          { time: '09:00', activity: 'Breakfast', category: 'Food', duration: '1 hr', cost: 1000 },
          { time: '10:30', activity: 'Senso-ji Temple', category: 'Culture', duration: '2 hrs', cost: 0 },
          { time: '13:00', activity: 'Lunch', category: 'Food', duration: '1 hr', cost: 1500 },
          { time: '15:00', activity: 'Tokyo Skytree', category: 'Landmark', duration: '2 hrs', cost: 2100 },
          { time: '19:00', activity: 'Dinner', category: 'Food', duration: '2 hrs', cost: 2000 },
        ],
      },
      {
        title: 'Modern Tokyo',
        items: [
          { time: '09:00', activity: 'Breakfast', category: 'Food', duration: '1 hr', cost: 900 },
          { time: '10:30', activity: 'Meiji Shrine', category: 'Culture', duration: '1-2 hrs', cost: 0 },
          { time: '13:00', activity: 'Lunch', category: 'Food', duration: '1 hr', cost: 1400 },
          { time: '15:00', activity: 'Shibuya Crossing', category: 'Landmark', duration: '1 hr', cost: 0 },
          { time: '19:00', activity: 'Dinner', category: 'Food', duration: '2 hrs', cost: 2200 },
        ],
      },
      {
        title: 'Food & Culture',
        items: [
          { time: '09:00', activity: 'Breakfast', category: 'Food', duration: '1 hr', cost: 1000 },
          { time: '10:30', activity: 'Tsukiji Food Tour', category: 'Food', duration: '3 hrs', cost: 3500 },
          { time: '14:00', activity: 'Free time / shopping', category: 'Shopping', duration: '3 hrs', cost: 1000 },
          { time: '19:00', activity: 'Farewell dinner', category: 'Food', duration: '2 hrs', cost: 2500 },
        ],
      },
    ],
  },
};

const fallback: DestinationTemplate = {
  destination: 'Your Destination',
  country: '',
  image: 'https://images.pexels.com/photos/35428411/pexels-photo-35428411.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  summary: 'A personalized plan tailored to your travel style and budget.',
  conditions: {
    status: 'green',
    statusLabel: 'Great conditions',
    temperature: 25,
    humidity: 'Moderate',
    rainChance: 20,
    recommendation: 'Weather looks pleasant for your travel dates. Pack light layers for the evenings.',
  },
  hotels: templates.dubai.hotels,
  activities: templates.dubai.activities,
  itinerary: templates.dubai.itinerary,
};

function matchDestination(text: string): string {
  const lower = text.toLowerCase();
  for (const key of Object.keys(templates)) {
    if (lower.includes(key)) return key;
  }
  if (lower.includes('paris')) return 'paris';
  return 'dubai';
}

function extractDays(text: string): number {
  const match = text.match(/(\d+)\s*[-]?\s*day/);
  if (match) return parseInt(match[1], 10);
  return 4;
}

function extractBudget(text: string): number {
  const match = text.match(/[₹$]\s*([\d,]+)/) || text.match(/budget[^0-9]*([\d,]+)/i);
  if (match) return parseInt(match[1].replace(/,/g, ''), 10);
  return 60000;
}

function extractTravelers(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('family')) return 'Family';
  if (lower.includes('romantic') || lower.includes('couple') || lower.includes('honeymoon')) return 'Couple';
  if (lower.includes('friend')) return 'Friends';
  if (lower.includes('solo')) return 'Solo';
  return 'Family';
}

function extractInterests(text: string): string[] {
  const interests: string[] = [];
  const lower = text.toLowerCase();
  const map: Record<string, string> = {
    sightsee: 'Sightseeing',
    food: 'Food',
    relax: 'Relaxation',
    adventure: 'Adventure',
    culture: 'Culture',
    shopping: 'Shopping',
    beach: 'Beach',
    nature: 'Nature',
    nightlife: 'Nightlife',
  };
  for (const [key, label] of Object.entries(map)) {
    if (lower.includes(key) && !interests.includes(label)) interests.push(label);
  }
  if (interests.length === 0) interests.push('Sightseeing', 'Food', 'Relaxation');
  return interests.slice(0, 4);
}

export function generatePlan(text: string): TripPlan {
  const key = matchDestination(text);
  const tpl = templates[key] ?? fallback;
  const days = extractDays(text);
  const budget = extractBudget(text);
  const travelers = extractTravelers(text);
  const interests = extractInterests(text);

  const itinerary = tpl.itinerary.slice(0, days).map((d, i) => ({
    day: i + 1,
    title: d.title,
    items: d.items.map((item, j) => ({
      id: `${key}-d${i + 1}-${j}`,
      ...item,
    })),
  }));

  const hotels = tpl.hotels.map((h, i) => ({
    id: `${key}-h${i}`,
    ...h,
  }));

  const activities = tpl.activities.map((a, i) => ({
    id: `${key}-a${i}`,
    ...a,
  }));

  const accommodation = hotels[0].pricePerNight * days;
  const activitiesCost = itinerary.reduce(
    (sum, day) => sum + day.items.reduce((s, item) => s + item.cost, 0),
    0,
  );
  const transportation = Math.round(budget * 0.15);
  const food = itinerary.reduce(
    (sum, day) => sum + day.items.filter((i) => i.category === 'Food').reduce((s, i) => s + i.cost, 0),
    0,
  );

  return {
    destination: tpl.destination,
    country: tpl.country,
    days,
    travelers,
    budget,
    interests,
    conditions: tpl.conditions,
    hotels,
    activities,
    itinerary,
    budgetBreakdown: {
      accommodation,
      transportation,
      food,
      activities: activitiesCost,
    },
    summary: tpl.summary,
  };
}

export function planTotal(plan: TripPlan): number {
  const b = plan.budgetBreakdown;
  return b.accommodation + b.transportation + b.food + b.activities;
}

export function tripNameFor(plan: TripPlan): string {
  const style =
    plan.travelers === 'Family'
      ? 'Family Adventure'
      : plan.travelers === 'Couple'
        ? 'Romantic Escape'
        : plan.travelers === 'Friends'
          ? 'Friends Trip'
          : 'Solo Journey';
  return `${plan.destination} ${style}`;
}

export function slugFor(plan: TripPlan): string {
  return `${plan.destination.toLowerCase()}-${plan.travelers.toLowerCase()}-adventure`
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-');
}
