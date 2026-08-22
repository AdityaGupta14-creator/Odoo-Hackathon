import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = 'AIzaSyDw_M0mpUE8upM_Lpt7th2F02Q8xgZR_-o';
const genAI = new GoogleGenerativeAI(apiKey);

const tripPlanSchema = {
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

async function test() {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: tripPlanSchema,
        temperature: 0.7,
      }
    });

    const prompt = `
      You are GlobeGuide AI, an expert travel planner.
      Create a highly personalized, complete trip plan for the following user request.
      
      User Request: "Plan a 3-day family trip to Bangalore under ₹30,000 in January."
      
      Please provide a beautiful and realistic TripPlan JSON object.
    `;

    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log("Raw Response:", responseText);
    JSON.parse(responseText);
    console.log("JSON parsed successfully!");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

test();
