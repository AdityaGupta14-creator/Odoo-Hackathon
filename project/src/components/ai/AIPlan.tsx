import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TripPlan } from '@/types';
import { planTotal, tripNameFor, slugFor } from '@/data/ai';
import { useTrips } from '@/context/TripsContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HotelCard } from '@/components/travel/HotelCard';
import { ActivityCard } from '@/components/travel/ActivityCard';
import { ItineraryTimeline } from '@/components/travel/ItineraryTimeline';
import { BudgetDonut, BudgetLegend } from '@/components/travel/BudgetChart';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Heart,
  CloudSun,
  Thermometer,
  Droplets,
  CloudRain,
  Pencil,
  Check,
  PartyPopper,
  ArrowRight,
} from 'lucide-react';

const statusConfig = {
  green: { dot: 'bg-green-500', tone: 'green' as const, label: 'Great conditions' },
  yellow: { dot: 'bg-amber-500', tone: 'amber' as const, label: 'Some precautions recommended' },
  red: { dot: 'bg-rose-500', tone: 'accent' as const, label: 'Caution advised' },
};

export function AIPlan({ plan }: { plan: TripPlan }) {
  const [selectedHotels, setSelectedHotels] = useState<string[]>([plan.hotels[0]?.id].filter(Boolean) as string[]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(plan.activities.slice(0, 3).map((a) => a.id));
  const [success, setSuccess] = useState(false);
  const { addTrip } = useTrips();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const total = planTotal(plan);
  const remaining = plan.budget - total;
  const withinBudget = remaining >= 0;

  const toggleHotel = (id: string) =>
    setSelectedHotels((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]));
  const toggleActivity = (id: string) =>
    setSelectedActivities((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const createTrip = () => {
    const id = slugFor(plan);
    addTrip({
      id,
      name: tripNameFor(plan),
      image: plan.hotels[0]?.image ?? '',
      destination: plan.destination,
      country: plan.country,
      days: plan.days,
      travelers: plan.travelers,
      budget: plan.budget,
      interests: plan.interests,
      conditions: plan.conditions,
      hotels: plan.hotels,
      activities: plan.activities,
      itinerary: plan.itinerary,
      budgetBreakdown: plan.budgetBreakdown,
      summary: plan.summary,
      startDate: '10 Sep 2026',
      endDate: `${10 + plan.days - 1} Sep 2026`,
      createdAt: Date.now(),
      progress: 100,
      selectedHotels,
      selectedActivities,
    });
    setSuccess(true);
    showToast('Your trip is ready!', '🎉');
  };

  if (success) {
    return <SuccessState plan={plan} onView={() => navigate(`/trips/${slugFor(plan)}`)} onEdit={() => navigate(`/trips/${slugFor(plan)}/itinerary`)} />;
  }

  const status = statusConfig[plan.conditions.status];

  return (
    <div className="space-y-5">
      {/* Trip Summary */}
      <Section title="Trip understood" icon="✨" delay={0}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SummaryStat icon={<MapPin size={16} />} label="Destination" value={plan.destination} />
          <SummaryStat icon={<Calendar size={16} />} label="Duration" value={`${plan.days} days`} />
          <SummaryStat icon={<Users size={16} />} label="Travelers" value={plan.travelers} />
          <SummaryStat icon={<Wallet size={16} />} label="Budget" value={`₹${plan.budget.toLocaleString('en-IN')}`} />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {plan.interests.map((i) => (
            <Badge key={i} tone="brand">
              <Heart size={11} /> {i}
            </Badge>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="ghost" size="sm">
            <Pencil size={14} /> Edit preferences
          </Button>
        </div>
      </Section>

      {/* Travel Conditions */}
      <Section title="Travel Conditions" icon="🌦️" delay={60}>
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-2.5 h-2.5 rounded-full ${status.dot}`} />
          <span className="text-sm font-bold text-ink-900">{plan.conditions.statusLabel}</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <ConditionStat icon={<Thermometer size={18} />} label="Temperature" value={`${plan.conditions.temperature}°C`} />
          <ConditionStat icon={<Droplets size={18} />} label="Humidity" value={plan.conditions.humidity} />
          <ConditionStat icon={<CloudRain size={18} />} label="Rain chance" value={`${plan.conditions.rainChance}%`} />
        </div>
        <div className="flex gap-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-100">
          <CloudSun size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-ink-700 leading-relaxed">{plan.conditions.recommendation}</p>
        </div>
        <button className="text-sm font-semibold text-brand-600 hover:text-brand-700 mt-3 flex items-center gap-1">
          View details <ArrowRight size={14} />
        </button>
      </Section>

      {/* Hotels */}
      <Section title="Recommended stays" icon="🏨" subtitle="Selected based on your budget, location and preferences." delay={120}>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {plan.hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              selected={selectedHotels.includes(hotel.id)}
              onToggle={() => toggleHotel(hotel.id)}
            />
          ))}
        </div>
      </Section>

      {/* Activities */}
      <Section title="Things you'll love" icon="✨" delay={180}>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {plan.activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              selected={selectedActivities.includes(activity.id)}
              onToggle={() => toggleActivity(activity.id)}
            />
          ))}
        </div>
      </Section>

      {/* Itinerary */}
      <Section title="Your suggested itinerary" icon="🗺️" delay={240}>
        <ItineraryTimeline days={plan.itinerary} />
      </Section>

      {/* Budget */}
      <Section title="Estimated Trip Cost" icon="💰" delay={300}>
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-4xl font-display font-bold text-ink-900">₹{total.toLocaleString('en-IN')}</span>
          <span className="text-sm text-ink-400">of ₹{plan.budget.toLocaleString('en-IN')} budget</span>
        </div>
        <div className="flex items-center gap-2 mb-5">
          <span className={`w-2.5 h-2.5 rounded-full ${withinBudget ? 'bg-green-500' : 'bg-rose-500'}`} />
          <span className="text-sm font-bold text-ink-900">
            {withinBudget ? 'Within budget' : 'Over budget'} · {withinBudget ? '₹' : '-₹'}
            {Math.abs(remaining).toLocaleString('en-IN')} remaining
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <BudgetDonut breakdown={plan.budgetBreakdown} total={total} />
          <BudgetLegend breakdown={plan.budgetBreakdown} />
        </div>
      </Section>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button size="lg" variant="primary" onClick={createTrip} className="flex-1 text-base">
          <Sparkles size={20} /> Create My Trip
        </Button>
        <Button size="lg" variant="outline">
          Modify Plan
        </Button>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  subtitle,
  delay = 0,
  children,
}: {
  title: string;
  icon: string;
  subtitle?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-white rounded-3xl border border-ink-100 shadow-soft p-5 sm:p-6 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-ink-900 flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {title}
        </h3>
        {subtitle && <p className="text-sm text-ink-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function SummaryStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-ink-50">
      <div className="w-9 h-9 rounded-xl bg-white text-brand-600 flex items-center justify-center shrink-0 shadow-soft">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-ink-400 font-medium">{label}</p>
        <p className="text-sm font-bold text-ink-900 truncate">{value}</p>
      </div>
    </div>
  );
}

function ConditionStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-ink-50 text-center">
      <div className="text-brand-600">{icon}</div>
      <p className="text-sm font-bold text-ink-900">{value}</p>
      <p className="text-xs text-ink-400 font-medium">{label}</p>
    </div>
  );
}

function SuccessState({
  plan,
  onView,
  onEdit,
}: {
  plan: TripPlan;
  onView: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-8 text-center animate-scale-in">
      <div className="w-16 h-16 rounded-3xl bg-brand-100 flex items-center justify-center mx-auto mb-5 animate-pop">
        <PartyPopper size={32} className="text-brand-600" />
      </div>
      <h3 className="text-2xl font-display font-bold text-ink-900 mb-2">Your trip is ready! 🎉</h3>
      <p className="text-ink-500 max-w-sm mx-auto mb-6">
        Your {plan.destination} adventure has been added to GlobeTrotter.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" variant="primary" onClick={onView}>
          <Check size={18} /> View My Trip
        </Button>
        <Button size="lg" variant="outline" onClick={onEdit}>
          <Pencil size={18} /> Edit Itinerary
        </Button>
      </div>
    </div>
  );
}
