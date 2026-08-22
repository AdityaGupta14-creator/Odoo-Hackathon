import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Calendar, Wallet, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTrips } from '@/context/TripsContext';
import { upcomingTrip } from '@/data/destinations';
import { planTotal } from '@/data/ai';

export function MyTripsPage() {
  const navigate = useNavigate();
  const { trips, loading } = useTrips();
  const allTrips = [upcomingTrip, ...trips.filter((t) => t.id !== upcomingTrip.id)];

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 animate-fade-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 tracking-tight mb-1">My Trips</h1>
          <p className="text-ink-500">{allTrips.length} trips · {trips.length} AI-planned</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/ai')}>
          <Plus size={18} /> New Trip
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {allTrips.map((trip, i) => {
          const total = planTotal(trip);
          return (
            <Card
              key={trip.id}
              hover
              className="overflow-hidden cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => navigate(`/trips/${trip.id}`)}
            >
              <div className="relative h-40 overflow-hidden">
                <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                {trip.id !== 'europe-adventure' && (
                  <Badge tone="brand" className="absolute top-3 left-3 bg-white/90 border-white/40 text-ink-900">
                    <Sparkles size={11} /> AI Planned
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-ink-900 mb-2">{trip.name}</h3>
                <div className="space-y-1.5 text-sm text-ink-500">
                  <div className="flex items-center gap-1.5"><MapPin size={13} /> {trip.destination}</div>
                  <div className="flex items-center gap-1.5"><Calendar size={13} /> {trip.startDate} — {trip.endDate}</div>
                  <div className="flex items-center gap-1.5"><Wallet size={13} /> ₹{(total / 1000).toFixed(1)}K estimated</div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-100">
                  <span className="text-xs font-semibold text-ink-400">{trip.progress}% planned</span>
                  <span className="text-sm font-semibold text-brand-600 flex items-center gap-1">
                    View <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
