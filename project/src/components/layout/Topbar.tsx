import { useState } from 'react';
import { Menu, Search, Bell, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [query, setQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 glass border-b border-ink-100">
      <div className="flex items-center gap-3 h-16 px-4 sm:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-xl text-ink-600 hover:bg-ink-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white">
            <Globe size={18} />
          </div>
        </div>

        <div className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, trips..."
              className="w-full h-10 pl-11 pr-4 rounded-xl bg-ink-100 border border-transparent focus:border-ink-200 focus:bg-white focus:outline-none text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 sm:hidden" />

        <div className="flex items-center gap-2">
          <Link
            to="/ai"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 h-10 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors shadow-soft"
          >
            <Sparkles size={16} />
            Ask GlobeGuide
          </Link>
          <button className="relative p-2.5 rounded-xl text-ink-600 hover:bg-ink-100 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-accent-500 ring-2 ring-white" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            AJ
          </div>
        </div>
      </div>
    </header>
  );
}
