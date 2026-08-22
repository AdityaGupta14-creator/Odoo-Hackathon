import { GoogleGenerativeAI, Schema, SchemaType } from '@google/generative-ai';
import type { TripPlan } from '../types';

import festivalsCsv from '../../festivals_dataset.csv?raw';
import bangaloreCsv from '../../bangalore.csv?raw';
import seasonsCsv from '../../seasons_dataset.csv?raw';
import travelCsv from '../../Expanded_Indian_Travel_Dataset.csv?raw';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');

const tripPlanSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    destination: { type: SchemaType.STRING },
    country: { type: SchemaType.STRING },
    days: { type: SchemaType.INTEGER },
    travelers: { type: SchemaType.STRING },
    budget: { type: SchemaType.INTEGER },
    interests: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    conditions: {
      type: SchemaType.OBJECT,
      properties: {
        status: { type: SchemaType.STRING, description: "Can be 'green', 'yellow', or 'red'" },
        statusLabel: { type: SchemaType.STRING },
        temperature: { type: SchemaType.INTEGER },
        humidity: { type: SchemaType.STRING },
        rainChance: { type: SchemaType.INTEGER },
        recommendation: { type: SchemaType.STRING }
      },
      required: ['status', 'statusLabel', 'temperature', 'humidity', 'rainChance', 'recommendation']
    },
    hotels: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING },
          name: { type: SchemaType.STRING },
          image: { type: SchemaType.STRING },
          rating: { type: SchemaType.NUMBER },
          pricePerNight: { type: SchemaType.INTEGER },
          location: { type: SchemaType.STRING },
          tags: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          aiPick: { type: SchemaType.BOOLEAN }
        },
        required: ['id', 'name', 'image', 'rating', 'pricePerNight', 'location', 'tags']
      }
    },
    activities: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING },
          name: { type: SchemaType.STRING },
          image: { type: SchemaType.STRING },
          category: { type: SchemaType.STRING },
          duration: { type: SchemaType.STRING },
          rating: { type: SchemaType.NUMBER },
          price: { type: SchemaType.INTEGER }
        },
        required: ['id', 'name', 'image', 'category', 'duration', 'rating', 'price']
      }
    },
    itinerary: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          day: { type: SchemaType.INTEGER },
          title: { type: SchemaType.STRING },
          items: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                id: { type: SchemaType.STRING },
                time: { type: SchemaType.STRING },
                activity: { type: SchemaType.STRING },
                category: { type: SchemaType.STRING },
                duration: { type: SchemaType.STRING },
                cost: { type: SchemaType.INTEGER }
              },
              required: ['id', 'time', 'activity', 'category', 'duration', 'cost']
            }
          }
        },
        required: ['day', 'title', 'items']
      }
    },
    budgetBreakdown: {
      type: SchemaType.OBJECT,
      properties: {
        accommodation: { type: SchemaType.INTEGER },
        transportation: { type: SchemaType.INTEGER },
        food: { type: SchemaType.INTEGER },
        activities: { type: SchemaType.INTEGER }
      },
      required: ['accommodation', 'transportation', 'food', 'activities']
    },
    summary: { type: SchemaType.STRING }
  },
  required: ['destination', 'country', 'days', 'travelers', 'budget', 'interests', 'conditions', 'hotels', 'activities', 'itinerary', 'budgetBreakdown', 'summary']
};

export async function generatePlan(text: string): Promise<TripPlan> {
  if (!apiKey) {
    throw new Error('Gemini API Key is missing. Please set VITE_GEMINI_API_KEY in your .env file.');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: tripPlanSchema,
      temperature: 0.7,
    }
  });

  const prompt = `
    You are GlobeGuide AI, an expert Indian travel planner and itinerary specialist.
    Create a highly personalized, complete trip plan for the following user request.
    
    PRIMARY GUIDELINES:
    1. Focus on Indian destinations matching the appropriate Indian season (Winter, Spring, Summer, Monsoon, Post-Monsoon/Autumn, Peak Winter) from the seasons dataset.
    2. Incorporate matching regional festivals and cultural events from the festivals dataset when relevant to the travel dates/months.
    3. Ensure all prices and budget breakdowns are realistically denominated in Indian Rupees (₹).
    4. Provide top recommendations for stays/hotels, authentic local activities, weather/travel conditions, day-by-day itinerary, and transparent budget allocation.
    
    User Request: "${text}"

    Context (Datasets):
    --- Indian Seasons Dataset ---
    ${seasonsCsv}
    
    --- Indian Festivals Dataset ---
    ${festivalsCsv}
    
    --- Bangalore & Karnataka Locations ---
    ${bangaloreCsv.substring(0, 2500)}
    
    --- Expanded Indian Travel Dataset ---
    ${travelCsv.substring(0, 3000)}

    Please provide a beautiful and realistic TripPlan JSON object. Use realistic Pexels or Unsplash image URLs (like https://images.pexels.com/photos/...) for hotels and activities.
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const plan: TripPlan = JSON.parse(responseText);
  
  return plan;
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
