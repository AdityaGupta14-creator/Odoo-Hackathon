import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Trip } from '../types';
import { loadTrips, saveTrips } from '../data/storage';

interface TripsContextValue {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, patch: Partial<Trip>) => void;
  removeTrip: (id: string) => void;
  getTrip: (id: string) => Trip | undefined;
}

const TripsContext = createContext<TripsContextValue | null>(null);

export function TripsProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(() => loadTrips());

  const persist = useCallback((next: Trip[]) => {
    setTrips(next);
    saveTrips(next);
  }, []);

  const addTrip = useCallback((trip: Trip) => persist([trip, ...trips]), [trips, persist]);

  const updateTrip = useCallback(
    (id: string, patch: Partial<Trip>) => {
      persist(trips.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    },
    [trips, persist],
  );

  const removeTrip = useCallback(
    (id: string) => {
      persist(trips.filter((t) => t.id !== id));
    },
    [trips, persist],
  );

  const getTrip = useCallback((id: string) => trips.find((t) => t.id === id), [trips]);

  const value = useMemo(
    () => ({ trips, addTrip, updateTrip, removeTrip, getTrip }),
    [trips, addTrip, updateTrip, removeTrip, getTrip],
  );

  return <TripsContext.Provider value={value}>{children}</TripsContext.Provider>;
}

export function useTrips() {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error('useTrips must be used within TripsProvider');
  return ctx;
}
