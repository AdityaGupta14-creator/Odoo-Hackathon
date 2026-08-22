import type { Trip } from '../types';

const KEY = 'globetrotter.trips.v1';

export function loadTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Trip[];
  } catch {
    return [];
  }
}

export function saveTrips(trips: Trip[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(trips));
  } catch {
    // ignore
  }
}
