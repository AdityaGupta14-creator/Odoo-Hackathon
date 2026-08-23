/**
 * seasonData.ts
 * -----------
 * Parses the three CSV datasets that ship with the project
 * (imported as raw strings via Vite's ?raw query) and builds
 * a rich, season-aware Destination[] for the Explore page.
 */

import type { Destination } from '../types';

// ─── Raw CSV imports (Vite ?raw) ────────────────────────────────
import travelCsv from '../../Expanded_Indian_Travel_Dataset.csv?raw';
import seasonsCsv from '../../seasons_dataset.csv?raw';
import festivalsCsv from '../../festivals_dataset.csv?raw';

// ─── CSV helper ─────────────────────────────────────────────────
function parseCsv(raw: string): Record<string, string>[] {
  const lines = raw.trim().replace(/\r/g, '').split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    // Handle quoted fields that may contain commas
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    values.push(current.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ?? '';
    });
    return obj;
  });
}

// ─── Curated image + description map ────────────────────────────
// We map every unique destination from the CSV to a high-quality
// Pexels photo and a short travel description.
const DEST_META: Record<
  string,
  { image: string; description: string; price: number; rating: number }
> = {
  'Taj Mahal': {
    image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Iconic ivory-white marble mausoleum and a symbol of eternal love.',
    price: 8000,
    rating: 4.9,
  },
  'Jaipur': {
    image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Pink palaces, vibrant bazaars and royal Rajasthani heritage.',
    price: 12000,
    rating: 4.7,
  },
  'Goa': {
    image: 'https://images.pexels.com/photos/28368719/pexels-photo-28368719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Sun-soaked beaches, Portuguese charm and monsoon magic.',
    price: 15000,
    rating: 4.6,
  },
  'Kerala Backwaters': {
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Emerald backwaters, Ayurveda retreats and lush monsoon landscapes.',
    price: 18000,
    rating: 4.8,
  },
  'Varanasi': {
    image: 'https://images.pexels.com/photos/5458388/pexels-photo-5458388.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Ancient ghats, mesmerising Ganga Aarti and spiritual soul of India.',
    price: 9000,
    rating: 4.5,
  },
  'Manali': {
    image: 'https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Snow-capped peaks, pine forests and Himalayan adventure.',
    price: 10000,
    rating: 4.4,
  },
  'Sundarbans': {
    image: 'https://images.pexels.com/photos/2739013/pexels-photo-2739013.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Largest mangrove forest — home to Royal Bengal Tigers.',
    price: 12000,
    rating: 4.3,
  },
  'Amritsar': {
    image: 'https://images.pexels.com/photos/10045779/pexels-photo-10045779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'The Golden Temple, Wagah border and flavours of Punjabi cuisine.',
    price: 8000,
    rating: 4.6,
  },
  'Mahabalipuram': {
    image: 'https://images.pexels.com/photos/10070972/pexels-photo-10070972.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'UNESCO shore temples, rock-cut caves and coastal heritage.',
    price: 7000,
    rating: 4.4,
  },
  'Andaman Islands': {
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Crystal waters, pristine beaches and world-class scuba diving.',
    price: 25000,
    rating: 4.7,
  },
  'Kaziranga National Park': {
    image: 'https://images.pexels.com/photos/16025490/pexels-photo-16025490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Home to the one-horned rhinoceros amidst floodplain grasslands.',
    price: 14000,
    rating: 4.5,
  },
  'Mysore': {
    image: 'https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Opulent Mysore Palace, silk sarees and royal Dasara celebrations.',
    price: 10000,
    rating: 4.5,
  },
  'Jaisalmer': {
    image: 'https://images.pexels.com/photos/3581362/pexels-photo-3581362.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Golden sandstone fort rising from the Thar Desert dunes.',
    price: 11000,
    rating: 4.6,
  },
  'Rishikesh': {
    image: 'https://images.pexels.com/photos/11421340/pexels-photo-11421340.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Yoga capital of the world, white-water rafting and riverside serenity.',
    price: 8000,
    rating: 4.5,
  },
  'Shimla': {
    image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Colonial charm, Mall Road strolls and misty Himalayan vistas.',
    price: 9000,
    rating: 4.3,
  },
  'Udaipur': {
    image: 'https://images.pexels.com/photos/3581353/pexels-photo-3581353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'City of Lakes — romantic palaces floating on serene waters.',
    price: 13000,
    rating: 4.7,
  },
  'Darjeeling': {
    image: 'https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'World-famous tea gardens, the toy train and Kanchenjunga sunrise.',
    price: 11000,
    rating: 4.4,
  },
  'Munnar': {
    image: 'https://images.pexels.com/photos/2893685/pexels-photo-2893685.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Endless rolling tea plantations in the misty Western Ghats.',
    price: 10000,
    rating: 4.6,
  },
  'Ajanta and Ellora Caves': {
    image: 'https://images.pexels.com/photos/5007839/pexels-photo-5007839.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Ancient Buddhist rock-cut caves with extraordinary murals.',
    price: 9000,
    rating: 4.5,
  },
  'Cherrapunji': {
    image: 'https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Wettest place on Earth — living root bridges and thundering waterfalls.',
    price: 13000,
    rating: 4.6,
  },
};

// ─── Category mapping (CSV categories → UI tags) ────────────────
const CATEGORY_MAP: Record<string, string> = {
  Heritage: 'Heritage',
  Beach: 'Beach',
  Nature: 'Nature',
  Adventure: 'Adventure',
  Religious: 'Religious',
};

// ─── Season detection ───────────────────────────────────────────
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export interface SeasonInfo {
  season: string;
  months: string;
  bestDestinations: string[];
  climateTag: string;
  activityTags: string[];
}

export function getCurrentSeason(): SeasonInfo {
  const currentMonth = MONTH_NAMES[new Date().getMonth()]; // e.g. "August"
  const rows = parseCsv(seasonsCsv);

  for (const row of rows) {
    const months = row['months'] || '';
    if (months.includes(currentMonth)) {
      return {
        season: row['season'] || 'Unknown',
        months,
        bestDestinations: (row['best_destinations'] || '')
          .split(',')
          .map((d) => d.trim())
          .filter(Boolean),
        climateTag: row['climate_tag'] || '',
        activityTags: (row['activity_tags'] || '')
          .split(';')
          .map((t) => t.trim())
          .filter(Boolean),
      };
    }
  }

  // fallback
  return {
    season: 'All-Year',
    months: currentMonth,
    bestDestinations: [],
    climateTag: 'pleasant',
    activityTags: ['sightseeing'],
  };
}

// ─── Festival lookup for current month ──────────────────────────
function getFestivalsThisMonth(): Map<string, string[]> {
  const currentMonth = MONTH_NAMES[new Date().getMonth()];
  const rows = parseCsv(festivalsCsv);
  const cityFestivals = new Map<string, string[]>();

  for (const row of rows) {
    const monthField = row['month'] || '';
    // The month field can be like "August", "August/September", "July/August", etc.
    if (!monthField.includes(currentMonth)) continue;
    const festName = row['festival_name'] || '';
    const cities = (row['suggested_cities'] || '')
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    for (const city of cities) {
      const existing = cityFestivals.get(city) || [];
      existing.push(festName);
      cityFestivals.set(city, existing);
    }
  }

  return cityFestivals;
}

// ─── Build season-scored destinations ───────────────────────────

export function getSeasonalDestinations(): Destination[] {
  // 1. Parse travel CSV and deduplicate
  const travelRows = parseCsv(travelCsv);
  const seen = new Set<string>();
  const uniqueRows: Record<string, string>[] = [];
  for (const row of travelRows) {
    const name = row['Destination Name'] || '';
    if (!name || seen.has(name)) continue;
    seen.add(name);
    uniqueRows.push(row);
  }

  // 2. Get current season info
  const season = getCurrentSeason();

  // 3. Get festivals for current month
  const cityFestivals = getFestivalsThisMonth();

  // 4. Build the best-destinations set for matching (fuzzy partial match)
  const bestNames = season.bestDestinations.map((n) => n.toLowerCase());

  // 5. Map each unique destination → Destination
  const destinations: Destination[] = uniqueRows.map((row) => {
    const name = row['Destination Name'] || '';
    const meta = DEST_META[name];
    if (!meta) {
      // Skip destinations we don't have curated metadata for
      return null;
    }

    const csvCategory = row['Category'] || '';
    const uiCategory = CATEGORY_MAP[csvCategory] || csvCategory;
    const state = row['State'] || '';
    const region = row['Region'] || '';
    const attraction = row['Popular Attraction'] || '';

    // Season matching: check if this destination appears in the best_destinations for the current season
    const nameLower = name.toLowerCase();
    const isSeasonMatch = bestNames.some(
      (best) => nameLower.includes(best) || best.includes(nameLower)
    );

    // Score: 80-100 for season match (with small jitter for variety), 20-60 for non-match (based on rating)
    const seasonScore = isSeasonMatch
      ? 80 + Math.round(meta.rating * 4)       // 80–100
      : 10 + Math.round(meta.rating * 10);     // 10–60

    // Festivals
    const festivals: string[] = [];
    // Check by destination name
    if (cityFestivals.has(name)) {
      festivals.push(...cityFestivals.get(name)!);
    }
    // Check by state capital / region approximation
    for (const [city, fests] of cityFestivals.entries()) {
      if (state.toLowerCase().includes(city.toLowerCase()) ||
          city.toLowerCase().includes(name.toLowerCase())) {
        festivals.push(...fests);
      }
    }
    const uniqueFestivals = [...new Set(festivals)];

    const id = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return {
      id,
      city: name,
      country: 'India',
      image: meta.image,
      description: meta.description,
      tag: uiCategory,
      category: uiCategory,
      rating: meta.rating,
      price: meta.price,
      bestSeason: isSeasonMatch ? season.season : undefined,
      seasonMatch: isSeasonMatch,
      seasonScore,
      climateTag: isSeasonMatch ? season.climateTag : undefined,
      activityTags: isSeasonMatch ? season.activityTags : (row['Category'] ? [row['Category'].toLowerCase()] : []),
      festival: uniqueFestivals.length > 0 ? uniqueFestivals.join(', ') : undefined,
      state,
      region,
      attraction,
    } as Destination;
  }).filter(Boolean) as Destination[];

  // 6. Sort: season matches first (by score desc), then rest by score desc
  destinations.sort((a, b) => (b.seasonScore ?? 0) - (a.seasonScore ?? 0));

  return destinations;
}
