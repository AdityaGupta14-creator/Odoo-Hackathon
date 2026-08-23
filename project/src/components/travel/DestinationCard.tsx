import type { Destination } from '@/types';
import { MapPin, Star, CloudRain, Sun, Snowflake, Leaf, PartyPopper } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

/* Season → icon + colour mapping */
const SEASON_STYLE: Record<string, { icon: typeof CloudRain; color: string; bg: string }> = {
  Monsoon:              { icon: CloudRain, color: 'text-sky-600',    bg: 'bg-sky-50 border-sky-200' },
  Summer:               { icon: Sun,       color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-200' },
  Winter:               { icon: Snowflake, color: 'text-blue-600',   bg: 'bg-blue-50 border-blue-200' },
  'Peak Winter':        { icon: Snowflake, color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-300' },
  Spring:               { icon: Leaf,      color: 'text-emerald-600',bg: 'bg-emerald-50 border-emerald-200' },
  'Post-Monsoon/Autumn':{ icon: Leaf,      color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
};

export function DestinationCard({ destination, className = '' }: DestinationCardProps) {
  const hasExtended = destination.rating != null || destination.price != null;
  const seasonInfo = destination.bestSeason ? SEASON_STYLE[destination.bestSeason] : null;
  const SeasonIcon = seasonInfo?.icon ?? Sun;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-white border border-ink-100 shadow-soft transition-all duration-300 hover:shadow-lift hover:-translate-y-1.5 ${className}`}
    >
      {/* Image section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.city}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Subtle gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category tag — top right */}
        {(destination.category || destination.tag) && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider text-ink-800 border border-white/50 shadow-sm">
            {destination.category || destination.tag}
          </span>
        )}

        {/* Seasonal badge — top left */}
        {destination.seasonMatch && seasonInfo && (
          <span
            className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-sm text-[11px] font-bold shadow-sm ${seasonInfo.bg} ${seasonInfo.color}`}
          >
            <SeasonIcon size={12} />
            Best in {destination.bestSeason}
          </span>
        )}
      </div>

      {/* Content section */}
      <div className="p-4 pb-4.5">
        {/* City + Country + State */}
        <h3 className="text-lg font-display font-bold text-ink-900 tracking-tight leading-snug">
          {destination.city}
        </h3>
        <div className="flex items-center gap-1 mt-0.5 text-xs font-medium text-ink-400">
          <MapPin size={12} className="shrink-0" />
          {destination.state ? `${destination.state}, ${destination.country}` : destination.country}
        </div>

        {/* Description */}
        <p className="mt-2 text-[13px] text-ink-500 leading-relaxed line-clamp-2">
          {destination.description}
        </p>

        {/* Activity tags */}
        {destination.activityTags && destination.activityTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {destination.activityTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-ink-50 text-[10px] font-semibold text-ink-500 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Festival info */}
        {destination.festival && (
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-purple-600 font-medium">
            <PartyPopper size={12} className="shrink-0 text-purple-500" />
            <span className="line-clamp-1">{destination.festival}</span>
          </div>
        )}

        {/* Rating + Price footer (only when extended data exists) */}
        {hasExtended && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-100">
            {destination.rating != null && (
              <div className="flex items-center gap-1">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-ink-800">{destination.rating.toFixed(1)}</span>
              </div>
            )}
            {destination.price != null && (
              <div className="text-right">
                <span className="text-sm font-bold text-brand-600">
                  ₹{destination.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-ink-400 ml-0.5">/person</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for DestinationCard — shows shimmer while loading.
 */
export function DestinationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white border border-ink-100 shadow-soft">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] bg-ink-100 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/5 bg-ink-100 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
        <div className="h-3 w-2/5 bg-ink-100 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-full bg-ink-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <div className="h-3 w-4/5 bg-ink-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-ink-100">
          <div className="h-4 w-14 bg-ink-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <div className="h-4 w-20 bg-ink-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
