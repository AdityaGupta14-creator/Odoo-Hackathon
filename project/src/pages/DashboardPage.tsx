import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, ArrowRight, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DestinationCard } from '@/components/travel/DestinationCard';
import { destinations, upcomingTrip } from '@/data/destinations';
import { useTrips } from '@/context/TripsContext';
import { useState } from 'react';

const chips = [
  { icon: '🏰', label: 'Winter in Rajasthan', prompt: 'Plan a 4-day Jaipur & Udaipur winter heritage trip under ₹35,000' },
  { icon: '🏔️', label: 'Summer in Ladakh & Manali', prompt: 'Plan a 5-day cool summer getaway to Manali & Leh-Ladakh under ₹45,000' },
  { icon: '🌧️', label: 'Monsoon in Kerala', prompt: 'Plan a relaxing 4-day monsoon trip to Kerala backwaters & Munnar under ₹30,000' },
  { icon: '🌸', label: 'Spring in Kashmir', prompt: 'Plan a romantic 4-day spring trip to Kashmir & Gulmarg' },
  { icon: '🏖️', label: 'Beach in Goa', prompt: 'Plan a 3-day budget Goa beach trip with friends under ₹20,000' },
  { icon: '🪔', label: 'Autumn Cultural Tour', prompt: 'Build a 4-day cultural and festival itinerary for Varanasi & Kolkata' },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { trips } = useTrips();
  const [input, setInput] = useState('');

  const goAI = (prompt?: string) => {
    if (prompt) sessionStorage.setItem('globetrotter.prefill', prompt);
    navigate('/ai');
  };

  const featuredTrip = trips[0] ?? upcomingTrip;

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="animate-fade-up">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 tracking-tight">
          Good morning, Alex 👋
        </h1>
        <p className="text-ink-500 mt-1">Where are we going next?</p>
      </div>

      {/* AI Hero */}
      <Card className="relative overflow-hidden p-6 sm:p-8 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-100/60 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <Badge tone="brand">GlobeGuide AI</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 tracking-tight mb-1.5">
            Tell me about your next trip.
          </h2>
          <p className="text-ink-500 mb-5">
            I'll turn your travel idea into a personalized itinerary.
          </p>

          <div className="flex items-end gap-2 p-2 rounded-2xl bg-white border border-ink-200 shadow-soft focus-within:border-brand-300 focus-within:shadow-card transition-all">
            <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  goAI(input || undefined);
                }
              }}
              placeholder="Try: Plan a 4-day Jaipur winter trip for my family under ₹35,000..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none py-2 max-h-32"
            />
            <Button size="md" variant="primary" onClick={() => goAI(input || undefined)} className="!h-9 shrink-0">
              <Sparkles size={16} /> Plan
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-1">
            {chips.map((c) => (
              <button
                key={c.label}
                onClick={() => goAI(c.prompt)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-ink-50 border border-ink-100 text-sm font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-all whitespace-nowrap shrink-0"
              >
                <span className="text-base leading-none">{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Upcoming Trip */}
      <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-ink-900">Upcoming Trip</h3>
          <button
            onClick={() => navigate('/trips')}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <Card hover className="overflow-hidden">
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <img
              src={featuredTrip.image}
              alt={featuredTrip.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Badge tone="brand" className="bg-white/20 border-white/30 text-white backdrop-blur">
                  <Sparkles size={11} /> AI Planned
                </Badge>
              </div>
              <h3 className="text-2xl font-display font-bold tracking-tight mb-1">{featuredTrip.name}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {featuredTrip.destination}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {featuredTrip.startDate} — {featuredTrip.endDate}
                </span>
              </div>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-3 gap-4 mb-5">
              <Stat label="Destinations" value="3" />
              <Stat label="Estimated" value={`₹${(featuredTrip.budget / 1000).toFixed(0)}K`} />
              <Stat label="Planned" value={`${featuredTrip.progress}%`} />
            </div>
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-500 mb-2">
                <span>Planning progress</span>
                <span className="text-brand-600">{featuredTrip.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
                  style={{ width: `${featuredTrip.progress}%` }}
                />
              </div>
            </div>
            <Button variant="primary" onClick={() => navigate(`/trips/${featuredTrip.id}`)} className="w-full sm:w-auto">
              Continue Planning <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
      </div>

      {/* Destination Inspiration */}
      <div className="animate-fade-up" style={{ animationDelay: '180ms' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-ink-900">Explore popular destinations</h3>
          <button
            onClick={() => navigate('/explore')}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            Explore all <ArrowRight size={14} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
          {destinations.map((d) => (
            <div key={d.id} className="w-56 shrink-0">
              <DestinationCard destination={d} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up" style={{ animationDelay: '240ms' }}>
        <QuickStat icon={<MapPin size={18} />} label="Trips planned" value={`${trips.length + 1}`} />
        <QuickStat icon={<TrendingUp size={18} />} label="Avg budget" value="₹38K" />
        <QuickStat icon={<Calendar size={18} />} label="Upcoming" value="1" />
        <QuickStat icon={<Sparkles size={18} />} label="AI plans" value={`${trips.length}`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-ink-400 font-medium">{label}</p>
      <p className="text-lg font-bold text-ink-900">{value}</p>
    </div>
  );
}

function QuickStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-ink-400 font-medium">{label}</p>
        <p className="text-lg font-bold text-ink-900">{value}</p>
      </div>
    </Card>
  );
}
