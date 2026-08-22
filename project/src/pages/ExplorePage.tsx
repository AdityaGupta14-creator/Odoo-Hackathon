import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { DestinationCard } from '@/components/travel/DestinationCard';
import { exploreDestinations } from '@/data/destinations';

export function ExplorePage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const tags = ['All', 'Culture', 'Romantic', 'Adventure', 'Relax', 'Beach', 'Family'];

  const filtered = exploreDestinations.filter((d) => {
    const matchesQuery =
      d.city.toLowerCase().includes(query.toLowerCase()) ||
      d.country.toLowerCase().includes(query.toLowerCase());
    const matchesTag = filter === 'All' || d.tag === filter;
    return matchesQuery && matchesTag;
  });

  return (
    <div className="space-y-6">
      <div className="animate-fade-up">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 tracking-tight mb-1">
          Explore India by Seasons
        </h1>
        <p className="text-ink-500">Discover incredible destinations handpicked for every season and festival across India.</p>
      </div>

      {/* Search + filters */}
      <div className="space-y-3 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white border border-ink-200 focus:border-brand-400 focus:outline-none text-sm font-medium text-ink-900 placeholder:text-ink-400 shadow-soft transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <SlidersHorizontal size={16} className="text-ink-400 shrink-0" />
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                filter === t
                  ? 'bg-ink-900 text-white'
                  : 'bg-white border border-ink-200 text-ink-600 hover:border-ink-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
        {filtered.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-ink-400">No destinations found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
