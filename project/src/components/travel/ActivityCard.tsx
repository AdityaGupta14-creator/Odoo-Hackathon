import type { Activity } from '@/types';
import { Star, Clock, Check, Plus } from 'lucide-react';

export function ActivityCard({
  activity,
  selected,
  onToggle,
}: {
  activity: Activity;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-ink-100 shadow-soft hover:shadow-card transition-all duration-300 group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={activity.image}
          alt={activity.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-ink-900 border border-white/40">
          {activity.category}
        </span>
        {selected && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900 text-white text-xs font-bold shadow-soft animate-scale-in">
            <Check size={12} />
            Added
          </span>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-ink-900 mb-2 leading-tight">{activity.name}</h4>
        <div className="flex items-center gap-3 text-sm text-ink-500 mb-4">
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent-500 fill-accent-500" />
            {activity.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {activity.duration}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-ink-900">
            {activity.price === 0 ? 'Free' : `₹${activity.price.toLocaleString('en-IN')}`}
          </span>
          <button
            onClick={onToggle}
            className={`inline-flex items-center gap-1.5 px-3.5 h-9 rounded-xl text-sm font-semibold transition-all ${
              selected
                ? 'bg-brand-50 text-brand-700 border border-brand-300'
                : 'bg-ink-900 text-white hover:bg-ink-800'
            }`}
          >
            {selected ? (
              <>
                <Check size={15} /> Added
              </>
            ) : (
              <>
                <Plus size={15} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
