import type { Hotel } from '@/types';
import { Star, MapPin, Check, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HotelCard({
  hotel,
  selected,
  onToggle,
}: {
  hotel: Hotel;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-ink-100 shadow-soft hover:shadow-card transition-all duration-300 group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {hotel.aiPick && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-600 text-white text-xs font-bold shadow-soft">
            <Sparkles size={12} />
            AI Pick
          </span>
        )}
        {selected && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900 text-white text-xs font-bold shadow-soft animate-scale-in">
            <Check size={12} />
            Added
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-bold text-ink-900 leading-tight">{hotel.name}</h4>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={14} className="text-accent-500 fill-accent-500" />
            <span className="text-sm font-bold text-ink-900">{hotel.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-ink-400 mb-3">
          <MapPin size={13} />
          {hotel.location}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-ink-100 text-xs font-medium text-ink-600">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-ink-900">₹{hotel.pricePerNight.toLocaleString('en-IN')}</span>
            <span className="text-sm text-ink-400"> / night</span>
          </div>
          <Button
            size="sm"
            variant={selected ? 'outline' : 'primary'}
            onClick={onToggle}
            className={selected ? 'text-brand-700 border-brand-300 bg-brand-50' : ''}
          >
            {selected ? (
              <>
                <Check size={15} /> Added
              </>
            ) : (
              <>
                <Plus size={15} /> Add to Trip
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
