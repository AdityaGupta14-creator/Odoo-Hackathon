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
  const [loading, setLoading] = useState<boolean>(true);
  const [dbStatus, setDbStatus] = useState<'connected' | 'local' | 'error'>('local');
  const { showToast } = useToast();

  // Initialize and Sync Supabase
  useEffect(() => {
    async function initSupabase() {
      const client = supabase;

      setLoading(true);
      try {
        const { data, error } = await client
          .from('trips')
          .select('*')
          .order('created_at', { ascending: false });

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
      } finally {
        setLoading(false);
      }
    }

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
      }
    },
    [trips, dbStatus, showToast],
  );

  const removeTrip = useCallback(
    async (id: string) => {
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
