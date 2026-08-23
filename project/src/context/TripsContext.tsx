import { createContext, useCallback, useContext, useMemo, useState, useEffect, type ReactNode } from 'react';
import type { Trip } from '../types';
import { loadTrips, saveTrips } from '../data/storage';
import { supabase } from '../lib/supabase';
import { useToast } from './ToastContext';

interface TripsContextValue {
  trips: Trip[];
  loading: boolean;
  dbStatus: 'connected' | 'local' | 'error';
  addTrip: (trip: Trip) => Promise<void>;
  updateTrip: (id: string, patch: Partial<Trip>) => Promise<void>;
  removeTrip: (id: string) => Promise<void>;
  getTrip: (id: string) => Trip | undefined;
}

const TripsContext = createContext<TripsContextValue | null>(null);

export function TripsProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(() => loadTrips());
<<<<<<< HEAD
  const [loading, setLoading] = useState<boolean>(true);
  const [dbStatus, setDbStatus] = useState<'connected' | 'local' | 'error'>('local');
  const { showToast } = useToast();

  // Initialize and Sync Supabase
=======
  const [loading, setLoading] = useState(true);

  // Fetch initial trips from Supabase if configured, otherwise fallback to localStorage
>>>>>>> 9936ed3 (feat: season-based destination suggestions from CSV databases)
  useEffect(() => {
    async function initSupabase() {
      const client = supabase;

      setLoading(true);
      try {
<<<<<<< HEAD
        const { data, error } = await client
=======
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
>>>>>>> 9936ed3 (feat: season-based destination suggestions from CSV databases)
          .from('trips')
          .select('*')
          .order('created_at', { ascending: false });

<<<<<<< HEAD
        if (error) {
          console.error('Supabase query error:', error);
          setDbStatus('error');
          showToast('Failed to connect to Supabase. Running in local fallback mode.', '⚠️');
          return;
        }

        setDbStatus('connected');
        if (data && data.length > 0) {
          const fetchedTrips = data.map((row: any) => ({
            ...(row.data || row),
            id: row.id || row.data?.id,
          })) as Trip[];
          setTrips(fetchedTrips);
          saveTrips(fetchedTrips);
        } else {
          const localTrips = loadTrips();
          if (localTrips.length > 0) {
            // Seed Supabase with existing local trips
            for (const trip of localTrips) {
              await client.from('trips').insert({
                id: trip.id,
                name: trip.name,
                destination: trip.destination,
                created_at: trip.createdAt,
                data: trip,
              });
            }
          }
        }
      } catch (err) {
        console.error('Failed to initialize Supabase connection:', err);
        setDbStatus('error');
        showToast('Failed to connect to Supabase. Running in local fallback mode.', '⚠️');
=======
        if (error) throw error;
        
        if (data && data.length > 0) {
          const loadedTrips = data.map((row) => ({
            ...row.data,
            id: row.id,
          })) as Trip[];
          setTrips(loadedTrips);
          saveTrips(loadedTrips);
        }
      } catch (err) {
        console.warn('Supabase not available, using local storage:', err);
>>>>>>> 9936ed3 (feat: season-based destination suggestions from CSV databases)
      } finally {
        setLoading(false);
      }
    }

<<<<<<< HEAD
    initSupabase();
  }, [showToast]);

  const addTrip = useCallback(
    async (trip: Trip) => {
      // 1. Update local state & localStorage immediately
      const nextTrips = [trip, ...trips];
      setTrips(nextTrips);
      saveTrips(nextTrips);

      // 2. Sync to Supabase
      const client = supabase;
      if (client && dbStatus === 'connected') {
        try {
          const { error } = await client.from('trips').insert({
            id: trip.id,
            name: trip.name,
            destination: trip.destination,
            created_at: trip.createdAt,
            data: trip,
          });
          if (error) {
            console.error('Failed to sync new trip to Supabase:', error);
            showToast('Trip saved locally, but failed to sync with Supabase.', '⚠️');
          }
        } catch (err) {
          console.error('Failed to write to Supabase:', err);
          showToast('Trip saved locally, but database sync failed.', '⚠️');
        }
      }
    },
    [trips, dbStatus, showToast],
  );

  const updateTrip = useCallback(
    async (id: string, patch: Partial<Trip>) => {
      // 1. Update local state & localStorage immediately
      const nextTrips = trips.map((t) => (t.id === id ? { ...t, ...patch } : t));
      setTrips(nextTrips);
      saveTrips(nextTrips);

      const nextTrip = nextTrips.find((t) => t.id === id);

      // 2. Sync to Supabase
      if (dbStatus === 'connected' && nextTrip) {
        const client = supabase;
        try {
          const { error } = await client
            .from('trips')
            .update({
              name: nextTrip.name,
              destination: nextTrip.destination,
              data: nextTrip,
            })
            .eq('id', id);
          if (error) {
            console.error('Failed to sync updated trip to Supabase:', error);
            showToast('Changes saved locally, but sync failed.', '⚠️');
          }
        } catch (err) {
          console.error('Failed to update Supabase:', err);
          showToast('Changes saved locally, but database update failed.', '⚠️');
        }
=======
  const addTrip = useCallback(async (trip: Trip) => {
    // Optimistic update + local storage
    setTrips((prev) => {
      const next = [trip, ...prev];
      saveTrips(next);
      return next;
    });

    try {
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        await supabase.from('trips').insert({
          id: trip.id,
          data: trip
        });
      }
    } catch (err) {
      console.warn('Could not sync trip addition to Supabase:', err);
    }
  }, []);

  const updateTrip = useCallback(
    async (id: string, patch: Partial<Trip>) => {
      setTrips((prev) => {
        const next = prev.map((t) => (t.id === id ? { ...t, ...patch } : t));
        saveTrips(next);
        return next;
      });

      try {
        if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
          const existingTrip = trips.find((t) => t.id === id);
          if (existingTrip) {
            await supabase
              .from('trips')
              .update({ data: { ...existingTrip, ...patch } })
              .eq('id', id);
          }
        }
      } catch (err) {
        console.warn('Could not sync trip update to Supabase:', err);
>>>>>>> 9936ed3 (feat: season-based destination suggestions from CSV databases)
      }
    },
    [trips, dbStatus, showToast],
  );

  const removeTrip = useCallback(
    async (id: string) => {
<<<<<<< HEAD
      // 1. Update local state & localStorage immediately
      const nextTrips = trips.filter((t) => t.id !== id);
      setTrips(nextTrips);
      saveTrips(nextTrips);

      // 2. Sync to Supabase
      if (dbStatus === 'connected') {
        const client = supabase;
        try {
          const { error } = await client.from('trips').delete().eq('id', id);
          if (error) {
            console.error('Failed to sync deleted trip to Supabase:', error);
            showToast('Trip removed locally, but sync failed.', '⚠️');
          }
        } catch (err) {
          console.error('Failed to delete from Supabase:', err);
          showToast('Trip removed locally, but database delete failed.', '⚠️');
        }
      }
    },
    [trips, dbStatus, showToast],
=======
      setTrips((prev) => {
        const next = prev.filter((t) => t.id !== id);
        saveTrips(next);
        return next;
      });

      try {
        if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
          await supabase.from('trips').delete().eq('id', id);
        }
      } catch (err) {
        console.warn('Could not sync trip deletion to Supabase:', err);
      }
    },
    [],
>>>>>>> 9936ed3 (feat: season-based destination suggestions from CSV databases)
  );

  const getTrip = useCallback((id: string) => trips.find((t) => t.id === id), [trips]);

  const value = useMemo(
    () => ({ trips, loading, dbStatus, addTrip, updateTrip, removeTrip, getTrip }),
    [trips, loading, dbStatus, addTrip, updateTrip, removeTrip, getTrip],
  );

  return <TripsContext.Provider value={value}>{children}</TripsContext.Provider>;
}

export function useTrips() {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error('useTrips must be used within TripsProvider');
  return ctx;
}
