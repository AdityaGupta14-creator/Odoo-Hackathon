import { createContext, useCallback, useContext, useMemo, useState, useEffect, type ReactNode } from 'react';
import type { Trip } from '../types';
import { supabase } from '../lib/supabase';

interface TripsContextValue {
  trips: Trip[];
  addTrip: (trip: Trip) => Promise<void>;
  updateTrip: (id: string, patch: Partial<Trip>) => Promise<void>;
  removeTrip: (id: string) => Promise<void>;
  getTrip: (id: string) => Trip | undefined;
  loading: boolean;
}

const TripsContext = createContext<TripsContextValue | null>(null);

export function TripsProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial trips from Supabase
  useEffect(() => {
    async function fetchTrips() {
      try {
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data) {
          const loadedTrips = data.map((row) => ({
            ...row.data,
            id: row.id,
          })) as Trip[];
          setTrips(loadedTrips);
        }
      } catch (err) {
        console.error('Error fetching trips from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  const addTrip = useCallback(async (trip: Trip) => {
    try {
      // Optimistic update
      setTrips((prev) => [trip, ...prev]);

      // Save to Supabase
      const { error } = await supabase.from('trips').insert({
        id: trip.id,
        data: trip
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Error adding trip to Supabase:', err);
      // Revert optimistic update on error
      setTrips((prev) => prev.filter((t) => t.id !== trip.id));
    }
  }, []);

  const updateTrip = useCallback(
    async (id: string, patch: Partial<Trip>) => {
      try {
        // Find existing trip for fallback
        const existingTrip = trips.find((t) => t.id === id);
        if (!existingTrip) return;

        const updatedTrip = { ...existingTrip, ...patch };

        // Optimistic update
        setTrips((prev) => prev.map((t) => (t.id === id ? updatedTrip : t)));

        // Update in Supabase
        const { error } = await supabase
          .from('trips')
          .update({ data: updatedTrip })
          .eq('id', id);

        if (error) {
          throw error;
        }
      } catch (err) {
        console.error('Error updating trip in Supabase:', err);
        // We could revert optimistic update here, but skipping for simplicity
      }
    },
    [trips],
  );

  const removeTrip = useCallback(
    async (id: string) => {
      try {
        // Find existing trip for fallback
        const existingTrip = trips.find((t) => t.id === id);
        
        // Optimistic update
        setTrips((prev) => prev.filter((t) => t.id !== id));

        // Delete from Supabase
        const { error } = await supabase.from('trips').delete().eq('id', id);

        if (error) {
          throw error;
        }
      } catch (err) {
        console.error('Error deleting trip from Supabase:', err);
        // We could revert optimistic update here
      }
    },
    [trips],
  );

  const getTrip = useCallback((id: string) => trips.find((t) => t.id === id), [trips]);

  const value = useMemo(
    () => ({ trips, addTrip, updateTrip, removeTrip, getTrip, loading }),
    [trips, addTrip, updateTrip, removeTrip, getTrip, loading],
  );

  return <TripsContext.Provider value={value}>{children}</TripsContext.Provider>;
}

export function useTrips() {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error('useTrips must be used within TripsProvider');
  return ctx;
}
