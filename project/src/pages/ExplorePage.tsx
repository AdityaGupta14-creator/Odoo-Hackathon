import { useEffect, useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, Compass, CloudRain, Sun, Snowflake, Leaf, Sparkles } from 'lucide-react';
import { DestinationCard, DestinationCardSkeleton } from '@/components/travel/DestinationCard';
import { fetchDestinations } from '@/data/destinations';
import { getCurrentSeason } from '@/data/seasonData';
import type { Destination } from '@/types';

/* ---------- Categories from the database ---------- */
const CATEGORIES = ['All', 'Heritage', 'Nature', 'Beach', 'Adventure', 'Religious'] as const;

/* ---------- Season icon + gradient lookup ---------- */
const SEASON_BANNER: Record<string, {
  icon: typeof CloudRain;
  gradient: string;
  accent: string;
  blurb: string;
}> = {
  Monsoon: {
    icon: CloudRain,
    gradient: 'from-sky-500 via-cyan-500 to-teal-500',
    accent: 'text-sky-100',
    blurb: 'Lush green landscapes, dramatic waterfalls and cool retreats — the best time for nature lovers.',
  },
  Summer: {
    icon: Sun,
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    accent: 'text-amber-100',
    blurb: 'Escape to the hills! Cool mountain retreats and adventure sports await.',
  },
  Winter: {
    icon: Snowflake,
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    accent: 'text-blue-100',
    blurb: 'Perfect weather for heritage walks, desert safaris and cultural festivals.',
  },
  'Peak Winter': {
    icon: Snowflake,
    gradient: 'from-blue-600 via-indigo-600 to-violet-600',
    accent: 'text-blue-100',
    blurb: 'Snow-covered peaks and skiing adventures in the Himalayas.',
  },
  Spring: {
    icon: Leaf,
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    accent: 'text-emerald-100',
    blurb: 'Blooming valleys, pleasant hill stations and flower festivals.',
  },
  'Post-Monsoon/Autumn': {
    icon: Leaf,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    accent: 'text-orange-100',
    blurb: 'Clear skies, festive vibes and pristine beaches after the rains.',
  },
};

export function ExplorePage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const seasonInfo = useMemo(() => getCurrentSeason(), []);
  const banner = SEASON_BANNER[seasonInfo.season];
  const BannerIcon = banner?.icon ?? Sparkles;

  // Fetch destinations from database
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchDestinations()
      .then((data) => {
        if (!cancelled) {
          setDestinations(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load destinations:', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesQuery =
        d.city.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase()) ||
        (d.state ?? '').toLowerCase().includes(query.toLowerCase());
      const matchesTag = filter === 'All' || d.category === filter || d.tag === filter;
      return matchesQuery && matchesTag;
    });
  }, [destinations, query, filter]);

  // Split into season-matched and rest for the display
  const seasonMatched = useMemo(() => filtered.filter((d) => d.seasonMatch), [filtered]);
  const otherDestinations = useMemo(() => filtered.filter((d) => !d.seasonMatch), [filtered]);

  return (
    <div className="space-y-6">
      {/* Season Banner */}
      {banner && (
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${banner.gradient} p-6 sm:p-8 text-white shadow-lg animate-fade-up`}
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-sm" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-sm" />

          <div className="relative z-10 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BannerIcon size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-bold uppercase tracking-widest ${banner.accent} mb-1`}>
                Best for this season
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight">
                {seasonInfo.season} Season
              </h2>
              <p className="mt-1.5 text-sm text-white/80 leading-relaxed max-w-lg">
                {banner.blurb}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {seasonInfo.activityTags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-semibold text-white/90 border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="animate-fade-up" style={{ animationDelay: '40ms' }}>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 tracking-tight mb-1">
          Explore India by Seasons
        </h1>
        <p className="text-ink-500">
          Discover incredible destinations handpicked for every season and festival across India.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="space-y-3 animate-fade-up" style={{ animationDelay: '60ms' }}>
        {/* Search bar */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, states..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white border border-ink-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none text-sm font-medium text-ink-900 placeholder:text-ink-400 shadow-soft transition-all"
          />
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <SlidersHorizontal size={16} className="text-ink-400 shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                filter === cat
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                  : 'bg-white border border-ink-200 text-ink-600 hover:border-ink-300 hover:bg-ink-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid — skeleton / loaded / empty */}
      {loading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-up"
          style={{ animationDelay: '120ms' }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <DestinationCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-8">
          {/* Season-matched section */}
          {seasonMatched.length > 0 && (
            <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-brand-600" />
                <h2 className="text-lg font-display font-bold text-ink-900">
                  Recommended for {seasonInfo.season}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                  {seasonMatched.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {seasonMatched.map((d, i) => (
                  <div
                    key={d.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${120 + i * 50}ms` }}
                  >
                    <DestinationCard destination={d} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other destinations */}
          {otherDestinations.length > 0 && (
            <div className="animate-fade-up" style={{ animationDelay: `${120 + seasonMatched.length * 50 + 60}ms` }}>
              {seasonMatched.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Compass size={18} className="text-ink-400" />
                  <h2 className="text-lg font-display font-bold text-ink-900">
                    Other Destinations
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-ink-100 text-xs font-bold text-ink-500">
                    {otherDestinations.length}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherDestinations.map((d, i) => (
                  <div
                    key={d.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${140 + i * 50}ms` }}
                  >
                    <DestinationCard destination={d} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 animate-fade-up">
          <div className="w-20 h-20 rounded-full bg-ink-100 flex items-center justify-center mb-5">
            <Compass size={32} className="text-ink-300" />
          </div>
          <h3 className="text-lg font-display font-bold text-ink-800 mb-1">
            No destinations found
          </h3>
          <p className="text-sm text-ink-400 max-w-xs text-center leading-relaxed">
            We couldn't find anything matching
            {query && <> "<span className="font-semibold text-ink-600">{query}</span>"</>}
            {filter !== 'All' && (
              <>
                {query ? ' in' : ' for'} the <span className="font-semibold text-ink-600">{filter}</span> category
              </>
            )}
            . Try a different search or filter.
          </p>
          <button
            onClick={() => {
              setQuery('');
              setFilter('All');
            }}
            className="mt-5 px-5 py-2.5 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors shadow-md shadow-brand-600/25"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Result count footer */}
      {!loading && filtered.length > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-ink-400 pt-2 animate-fade-in">
          <MapPin size={12} />
          <span>
            Showing <span className="font-bold text-ink-600">{filtered.length}</span>{' '}
            destination{filtered.length !== 1 ? 's' : ''}
            {filter !== 'All' && (
              <>
                {' '}in <span className="font-semibold text-ink-600">{filter}</span>
              </>
            )}
            {seasonMatched.length > 0 && (
              <>
                {' '}· <span className="font-semibold text-brand-600">{seasonMatched.length} best for {seasonInfo.season}</span>
              </>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
