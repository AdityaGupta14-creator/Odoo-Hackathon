import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Plane,
  Compass,
  CalendarDays,
  Wallet,
  Sparkles,
  Settings,
  LogOut,
  Globe,
  LogIn,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const mainNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trips', label: 'My Trips', icon: Plane },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/budget', label: 'Budget', icon: Wallet },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    if (onNavigate) onNavigate();
    navigate('/login', { replace: true });
  };

  // Derive display name and avatar from Supabase user metadata
  const displayName: string =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0]?.replace(/[._]/g, ' ')?.replace(/\b\w/g, (l) => l.toUpperCase()) ||
    'Traveler';

  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url;

  const initials = displayName
    .split(' ')
    .map((p: string) => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col h-full bg-white border-r border-ink-100">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 h-16 shrink-0">
        <div className="w-9 h-9 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-soft">
          <Globe size={20} />
        </div>
        <span className="font-display font-bold text-lg text-ink-900 tracking-tight">GlobeTrotter</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto no-scrollbar">
        <div className="space-y-1">
          {mainNav.map((item) => (
            <NavItem key={item.to} {...item} onClick={onNavigate} />
          ))}
        </div>

        <div className="my-5 px-3">
          <div className="h-px bg-ink-100" />
        </div>

        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider">AI Assistant</p>
        </div>
        <NavLink
          to="/ai"
          onClick={onNavigate}
          className={({ isActive }) =>
            `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isActive
                ? 'bg-brand-600 text-white shadow-soft'
                : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
            }`
          }
        >
          <Sparkles size={18} />
          <span className="flex items-center gap-2">
            GlobeGuide AI
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
          </span>
        </NavLink>
      </nav>

      {/* User footer */}
      <div className="px-3 pb-4 shrink-0">
        <div className="h-px bg-ink-100 mb-3 mx-3" />

        {user ? (
          <>
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-brand-500/20"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {initials}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink-900 truncate">{displayName}</p>
                <p className="text-xs text-ink-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-ink-500 hover:text-ink-900 hover:bg-ink-100 transition-colors">
                <Settings size={16} />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </>
        ) : (
          <NavLink
            to="/login"
            onClick={onNavigate}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors shadow-soft"
          >
            <LogIn size={18} />
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  onClick,
}: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          isActive
            ? 'bg-ink-900 text-white shadow-soft'
            : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}
