import type { Destination } from '@/types';
import { MapPin } from 'lucide-react';

export function DestinationCard({ destination, className = '' }: { destination: Destination; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-white border border-ink-100 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.city}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
        {destination.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-ink-900 border border-white/40">
            {destination.tag}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/80 mb-0.5">
            <MapPin size={13} />
            {destination.country}
          </div>
          <h3 className="text-xl font-display font-bold tracking-tight">{destination.city}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-ink-500 leading-relaxed line-clamp-2">{destination.description}</p>
      </div>
    </div>
  );
}
