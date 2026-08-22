import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, Sparkles, ArrowRight, Share2, Wallet, ListChecks, Plane } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTrips } from '@/context/TripsContext';
import { upcomingTrip } from '@/data/destinations';
import { planTotal } from '@/data/ai';
import { ItineraryTimeline } from '@/components/travel/ItineraryTimeline';
import { ShareModal } from '@/components/travel/ShareModal';
import { useState } from 'react';

export function TripOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip } = useTrips();
  const [shareOpen, setShareOpen] = useState(false);

  const trip = (id && getTrip(id)) || upcomingTrip;
  const total = planTotal(trip);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-4xl h-72 sm:h-80 animate-fade-up">
        <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
          <Badge tone="brand" className="bg-white/20 border-white/30 text-white backdrop-blur mb-3">
            <Sparkles size={11} /> AI Planned
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-2">{trip.name}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {trip.destination}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {trip.startDate} — {trip.endDate}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <StatCard icon={<Clock size={18} />} label="Duration" value={`${trip.days} Days`} />
        <StatCard icon={<ListChecks size={18} />} label="Activities" value={`${trip.activities.length || trip.itinerary.reduce((s, d) => s + d.items.length, 0)}`} />
        <StatCard icon={<Wallet size={18} />} label="Estimated" value={`₹${(total / 1000).toFixed(1)}K`} />
      </div>

      {/* AI Summary */}
      <Card className="p-5 sm:p-6 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <h3 className="font-bold text-ink-900">AI Summary</h3>
        </div>
        <p className="text-ink-600 leading-relaxed">{trip.summary}</p>
      </Card>

      {/* Itinerary Preview */}
      <div className="animate-fade-up" style={{ animationDelay: '180ms' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-ink-900">Itinerary Preview</h3>
          <button onClick={() => navigate(`/trips/${trip.id}/itinerary`)} className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            View Full <ArrowRight size={14} />
          </button>
        </div>
        <Card className="p-5 sm:p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {trip.itinerary.map((day) => (
              <div key={day.day} className="p-4 rounded-2xl bg-ink-50 border border-ink-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-ink-900 text-white text-xs font-bold flex items-center justify-center">{day.day}</span>
                  <span className="text-xs font-semibold text-ink-400">Day {day.day}</span>
                </div>
                <p className="font-bold text-ink-900 text-sm">{day.title}</p>
                <p className="text-xs text-ink-400 mt-1">{day.items.length} activities</p>
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={() => navigate(`/trips/${trip.id}/itinerary`)} className="w-full mt-4">
            View Full Itinerary <ArrowRight size={16} />
          </Button>
        </Card>
      </div>

      {/* Budget Preview */}
      <div className="animate-fade-up" style={{ animationDelay: '240ms' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-ink-900">Budget Preview</h3>
          <button onClick={() => navigate(`/trips/${trip.id}/budget`)} className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            View Budget <ArrowRight size={14} />
          </button>
        </div>
        <Card className="p-5 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <BudgetItem label="Transportation" value={`₹${(trip.budgetBreakdown.transportation / 1000).toFixed(0)}K`} icon="🚕" />
            <BudgetItem label="Accommodation" value={`₹${(trip.budgetBreakdown.accommodation / 1000).toFixed(0)}K`} icon="🏨" />
            <BudgetItem label="Food" value={`₹${(trip.budgetBreakdown.food / 1000).toFixed(0)}K`} icon="🍽️" />
            <BudgetItem label="Activities" value={`₹${(trip.budgetBreakdown.activities / 1000).toFixed(1)}K`} icon="🎟️" />
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-ink-900 text-white">
            <span className="font-semibold">Total Estimated</span>
            <span className="text-2xl font-display font-bold">₹{(total / 1000).toFixed(1)}K</span>
          </div>
          <Button variant="outline" onClick={() => navigate(`/trips/${trip.id}/budget`)} className="w-full mt-4">
            View Budget <ArrowRight size={16} />
          </Button>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <Button variant="primary" size="lg" onClick={() => setShareOpen(true)} className="flex-1">
          <Share2 size={18} /> Share Trip
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate('/ai')} className="flex-1">
          <Sparkles size={18} /> Ask GlobeGuide
        </Button>
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} trip={trip} />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-ink-400 font-medium">{label}</p>
        <p className="text-lg font-bold text-ink-900">{value}</p>
      </div>
    </Card>
  );
}

function BudgetItem({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="p-3 rounded-2xl bg-ink-50 text-center">
      <span className="text-xl block mb-1">{icon}</span>
      <p className="text-xs text-ink-400 font-medium">{label}</p>
      <p className="text-sm font-bold text-ink-900">{value}</p>
    </div>
  );
}
