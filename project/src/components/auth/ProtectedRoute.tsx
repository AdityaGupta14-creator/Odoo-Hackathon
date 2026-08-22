import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Globe } from 'lucide-react';
import type { ReactNode } from 'react';

// ── Loading Screen ─────────────────────────────────────────────────────────────

function AuthLoadingScreen() {
  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center shadow-soft animate-pulse">
          <Globe size={24} className="text-white" />
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce-dot [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce-dot [animation-delay:160ms]" />
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce-dot [animation-delay:320ms]" />
        </div>
      </div>
    </div>
  );
}

// ── Protected Route ────────────────────────────────────────────────────────────

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Wraps a route so only authenticated users can see it.
 * While auth state is loading, shows a loading screen.
 * Unauthenticated users are redirected to /login with returnTo state.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <AuthLoadingScreen />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// ── Public-Only Route ──────────────────────────────────────────────────────────

interface PublicOnlyRouteProps {
  children: ReactNode;
}

/**
 * Wraps auth pages (login, signup, forgot-password).
 * Redirects already-authenticated users to /dashboard.
 */
export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <AuthLoadingScreen />;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
