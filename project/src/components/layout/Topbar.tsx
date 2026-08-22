import { useState } from 'react';
import { Menu, Search, Bell, Globe, Sparkles, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrips } from '@/context/TripsContext';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [query, setQuery] = useState('');
  const { dbStatus } = useTrips();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const statusBadge = {
    connected: { tone: 'green' as const, text: 'Supabase Connected' },
    local: { tone: 'amber' as const, text: 'Local Database' },
    error: { tone: 'accent' as const, text: 'Connection Error' },
  }[dbStatus];

  const displayName: string =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0]?.replace(/[._]/g, ' ')?.replace(/\b\w/g, (l: string) => l.toUpperCase()) ||
    'Traveler';

  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url;

  const initials = displayName
    .split(' ')
    .map((p: string) => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

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
          {statusBadge && (
            <Badge tone={statusBadge.tone} className="hidden md:inline-flex items-center gap-1.5 py-1 px-3">
              <span>{statusBadge.text}</span>
            </Badge>
          )}

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

          {/* Avatar / logout */}
          {user ? (
            <div className="flex items-center gap-1.5">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-brand-500/20 cursor-pointer"
                  title={displayName}
                />
              ) : (
                <div
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0 cursor-pointer"
                  title={displayName}
                >
                  {initials}
                </div>
              )}
              <button
                onClick={handleLogout}
                title="Sign out"
                className="hidden sm:flex p-2 rounded-xl text-ink-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 rounded-xl bg-ink-900 text-white text-xs font-semibold hover:bg-ink-800 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
