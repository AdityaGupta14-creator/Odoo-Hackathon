import { Calendar } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTrips } from '@/context/TripsContext';
import { upcomingTrip } from '@/data/destinations';

const monthDays = 31;
const firstDayOffset = 2; // Sep 1 2026 is a Tuesday (index 2)

export function CalendarPage() {
  const { trips } = useTrips();
  const allTrips = [upcomingTrip, ...trips];

  // Map day numbers to trips
  const tripDays = new Set<number>();
  allTrips.forEach((t) => {
    const start = 10;
    for (let i = 0; i < t.days; i++) tripDays.add(start + i);
  });

  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOffset + 1;
    return day >= 1 && day <= monthDays ? day : null;
  });

  return (
    <div className="space-y-6">
      <div className="animate-fade-up">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 tracking-tight mb-1">Calendar</h1>
        <p className="text-ink-500">September 2026</p>
      </div>

      <Card className="p-5 sm:p-6 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <div className="grid grid-cols-7 gap-1.5 mb-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-center text-xs font-bold text-ink-400 uppercase py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((day, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all ${
                day === null
                  ? 'text-ink-200'
                  : tripDays.has(day)
                    ? 'bg-brand-600 text-white shadow-soft'
                    : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
              }`}
            >
              {day ?? ''}
              {day && tripDays.has(day) && (
                <span className="w-1 h-1 rounded-full bg-white/70 mt-0.5" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming events */}
      <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
        <h3 className="text-lg font-bold text-ink-900 mb-4">Upcoming trips</h3>
        <div className="space-y-3">
          {allTrips.slice(0, 3).map((t) => (
            <Card key={t.id} className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs font-bold leading-none">SEP</span>
                <span className="text-lg font-bold leading-none">10</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-ink-900 truncate">{t.name}</h4>
                <p className="text-sm text-ink-400 truncate">{t.destination} · {t.days} days</p>
              </div>
              <Badge tone="brand">
                <Calendar size={11} /> {t.startDate}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
