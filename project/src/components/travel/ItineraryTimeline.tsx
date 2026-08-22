import type { ItineraryDay as DayType, ItineraryItem } from '@/types';
import { Pencil, Trash2, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const categoryColors: Record<string, string> = {
  Food: 'bg-accent-100 text-accent-700',
  Landmark: 'bg-brand-100 text-brand-700',
  Culture: 'bg-amber-100 text-amber-700',
  Sightseeing: 'bg-sky-100 text-sky-700',
  Shopping: 'bg-violet-100 text-violet-700',
  Adventure: 'bg-rose-100 text-rose-700',
  Relaxation: 'bg-green-100 text-green-700',
  Beach: 'bg-cyan-100 text-cyan-700',
};

function catClass(category: string) {
  return categoryColors[category] ?? 'bg-ink-100 text-ink-600';
}

export function ItineraryTimeline({
  days,
  editable = false,
  onEditItem,
  onDeleteItem,
  onAddActivity,
}: {
  days: DayType[];
  editable?: boolean;
  onEditItem?: (day: DayType, item: ItineraryItem) => void;
  onDeleteItem?: (day: DayType, item: ItineraryItem) => void;
  onAddActivity?: (day: DayType) => void;
}) {
  return (
    <div className="space-y-6">
      {days.map((day) => (
        <ItineraryDay
          key={day.day}
          day={day}
          editable={editable}
          onEditItem={onEditItem}
          onDeleteItem={onDeleteItem}
          onAddActivity={onAddActivity}
        />
      ))}
    </div>
  );
}

function ItineraryDay({
  day,
  editable,
  onEditItem,
  onDeleteItem,
  onAddActivity,
}: {
  day: DayType;
  editable: boolean;
  onEditItem?: (day: DayType, item: ItineraryItem) => void;
  onDeleteItem?: (day: DayType, item: ItineraryItem) => void;
  onAddActivity?: (day: DayType) => void;
}) {
  return (
    <div className="relative pl-2">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-ink-900 text-white font-display font-bold text-lg shrink-0">
          {day.day}
        </div>
        <div>
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Day {day.day}</p>
          <h3 className="text-lg font-bold text-ink-900">{day.title}</h3>
        </div>
      </div>

      <div className="relative ml-6 pl-6 border-l-2 border-ink-100 space-y-3 pb-2">
        {day.items.map((item) => (
          <div
            key={item.id}
            className="relative group bg-white rounded-2xl border border-ink-100 shadow-soft p-3.5 hover:shadow-card transition-all"
          >
            <div className="absolute -left-[31px] top-5 w-3 h-3 rounded-full bg-brand-500 ring-4 ring-ink-50" />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">{item.time}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${catClass(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <h4 className="font-semibold text-ink-900 text-sm leading-snug">{item.activity}</h4>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-ink-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {item.duration}
                  </span>
                  <span className="font-semibold text-ink-600">
                    {item.cost === 0 ? 'Free' : `₹${item.cost.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>
              {editable && (
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEditItem?.(day, item)}
                    className="p-1.5 rounded-lg text-ink-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                    aria-label="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDeleteItem?.(day, item)}
                    className="p-1.5 rounded-lg text-ink-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {editable && onAddActivity && (
          <button
            onClick={() => onAddActivity(day)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border-2 border-dashed border-ink-200 text-ink-400 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50/50 transition-all text-sm font-semibold"
          >
            <Plus size={16} />
            Add Activity
          </button>
        )}
      </div>
    </div>
  );
}

export function ItineraryAddActivityButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="primary" onClick={onClick}>
      <Plus size={18} />
      Add Activity
    </Button>
  );
}
