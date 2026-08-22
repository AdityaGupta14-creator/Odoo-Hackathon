import React from 'react';
import { Globe, MapPin, Compass, Sparkles } from 'lucide-react';

// Travel image from Unsplash (no API key needed for direct URL)
const TRAVEL_IMAGE = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=85&w=1200';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-ink-50">
      {/* ── Left: Travel Image Panel ───────────────────────────────────────── */}
      <div className="hidden md:flex md:w-[45%] lg:w-1/2 relative flex-col">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TRAVEL_IMAGE})` }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/30 to-ink-950/80" />

        {/* Content over image */}
        <div className="relative z-10 flex flex-col h-full p-10 lg:p-14">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg">
              <Globe size={22} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-white tracking-tight">GlobeTrotter</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Sparkles size={10} className="text-brand-300" />
                <span className="text-[10px] text-brand-300 font-semibold uppercase tracking-widest">AI-Powered Travel</span>
              </div>
            </div>
          </div>

          {/* Center copy */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-brand-300 text-sm font-semibold uppercase tracking-widest mb-4">Plan less. Experience more.</p>
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight mb-6">
              Turn your travel ideas into personalized adventures with GlobeGuide AI.
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-md">
              Create detailed itineraries, manage budgets, and explore the world smarter — all in one place.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { icon: MapPin, label: 'Smart Itineraries' },
                { icon: Compass, label: 'Explore Destinations' },
                { icon: Sparkles, label: 'AI Copilot' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Icon size={13} className="text-brand-300" />
                  <span className="text-white/90 text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/60 text-sm">Your next adventure starts here.</p>
          </div>
        </div>
      </div>

      {/* ── Right: Auth Form Panel ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 sm:px-8 py-10">
        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-2xl bg-brand-600 flex items-center justify-center shadow-soft">
            <Globe size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-ink-900">GlobeTrotter</span>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
